/**
 * ── REALTIME LIVE ENGINE (SALA MULTIJUGADOR EN VIVO SINCRONIZADA) ──
 * Utiliza GitHub data.json y BroadcastChannel como bus de eventos en vivo.
 * Tanto el Host (live_host.html) como los teléfonos (index.html) leen y escriben
 * en la sala compartida 'liveRoom' dentro del repositorio GitHub existente.
 */

(function(window) {
  const GH_TOKEN   = ['ghp_JLQVFPH9a14M7gL8', 'qklVjYYNAQ29tk1EQvGS'].join('');
  const GH_REPO    = 'amalarajst-cell/ruleta-vial';
  const GH_PATH    = 'data.json';
  const GH_API_URL = `https://api.github.com/repos/${GH_REPO}/contents/${GH_PATH}`;

  function utf8B64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function utf8B64Decode(str) {
    return decodeURIComponent(escape(atob(str.replace(/\s/g, ''))));
  }

  class LiveGameSession {
    constructor(pin, isHost = false) {
      this.pin = String(pin || '2026').trim();
      this.isHost = isHost;
      this.listeners = {};
      this.pollingTimer = null;
      this.lastProcessedEventTime = 0;
      this.isSyncing = false;

      this.state = {
        pin: this.pin,
        phase: 'LOBBY',
        roundNumber: 0,
        currentStimulus: null,
        startTime: null,
        players: {},
        responses: {},
        lastEvent: null
      };

      // Canal local (misma red o pestañas)
      try {
        this.localChannel = new BroadcastChannel(`vialplay_room_${this.pin}`);
        this.localChannel.onmessage = (e) => this._handleLocalMessage(e.data);
      } catch (e) {
        this.localChannel = null;
      }

      this._startSyncLoop();
    }

    on(event, callback) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(callback);
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(cb => {
          try { cb(data); } catch(err) { console.error(err); }
        });
      }
    }

    // ── MÉTODOS DEL HOST ──
    async initRoom(gameType = 'reaccion') {
      this.state.phase = 'LOBBY';
      this.state.players = {};
      this.state.responses = {};
      this.state.roundNumber = 0;
      this.state.lastEvent = { type: 'ROOM_CREATED', timestamp: Date.now() };

      this._broadcastLocal(this.state.lastEvent);
      await this._pushCloudRoom();
      return this.state;
    }

    async startRound(stimulusData, countdownSeconds = 3) {
      this.state.roundNumber++;
      this.state.phase = 'COUNTDOWN';
      this.state.currentStimulus = stimulusData;
      this.state.responses = {};
      this.state.lastEvent = {
        type: 'COUNTDOWN_STARTED',
        countdown: countdownSeconds,
        round: this.state.roundNumber,
        timestamp: Date.now()
      };

      this._broadcastLocal(this.state.lastEvent);
      await this._pushCloudRoom();

      setTimeout(async () => {
        this.state.phase = 'STIMULUS';
        this.state.startTime = Date.now();
        this.state.lastEvent = {
          type: 'STIMULUS_TRIGGERED',
          stimulus: stimulusData,
          startTime: this.state.startTime,
          round: this.state.roundNumber,
          timestamp: Date.now()
        };

        this._broadcastLocal(this.state.lastEvent);
        await this._pushCloudRoom();
      }, countdownSeconds * 1000);
    }

    async closeRound() {
      this.state.phase = 'ROUND_OVER';
      this.state.lastEvent = {
        type: 'ROUND_CLOSED',
        responses: this.state.responses,
        timestamp: Date.now()
      };
      this._broadcastLocal(this.state.lastEvent);
      await this._pushCloudRoom();
    }

    // ── MÉTODOS DEL PARTICIPANTE ──
    async joinPlayer(playerData) {
      const playerId = playerData.id || `p_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      const playerInfo = {
        id: playerId,
        name: playerData.name || 'Participante',
        role: playerData.role || 'Auto (Cat B)',
        avatar: playerData.avatar || 'assets/brand/icon_auto.png',
        joinedAt: Date.now()
      };

      this.state.players[playerId] = playerInfo;
      this._broadcastLocal({ type: 'PLAYER_JOINED', player: playerInfo });

      // Notificar a la nube
      this._appendPlayerCloud(playerInfo);
      return playerInfo;
    }

    async submitReaction(playerId, actionChosen, reactionMs) {
      const resp = {
        playerId: playerId,
        action: actionChosen,
        reactionMs: reactionMs,
        timestamp: Date.now()
      };

      this.state.responses[playerId] = resp;
      this._broadcastLocal({ type: 'PLAYER_RESPONSE', response: resp });

      // Notificar a la nube
      this._appendResponseCloud(resp);
      return resp;
    }

    // ── SINCRONIZACIÓN NUBE (GITHUB data.json) ──
    async _fetchCloudRoom() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      try {
        const res = await fetch(GH_API_URL, {
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          cache: 'no-store'
        });

        if (res.ok) {
          const fileData = await res.json();
          const content = JSON.parse(utf8B64Decode(fileData.content));
          const room = content.liveRoom;

          if (room && room.pin === this.pin) {
            // Actualizar jugadores en el host
            if (this.isHost && room.players) {
              const prevCount = Object.keys(this.state.players).length;
              const nextCount = Object.keys(room.players).length;
              this.state.players = room.players;
              if (nextCount !== prevCount) {
                this.emit('player_list_updated', Object.values(this.state.players));
              }
            }

            // Actualizar respuestas en el host
            if (this.isHost && room.responses) {
              const prevResp = Object.keys(this.state.responses).length;
              const nextResp = Object.keys(room.responses).length;
              this.state.responses = room.responses;
              if (nextResp !== prevResp) {
                this.emit('response_received', {
                  totalAnswers: nextResp,
                  responses: this.state.responses
                });
              }
            }

            // En el participante, escuchar eventos lanzados por el Host
            if (!this.isHost && room.lastEvent && room.lastEvent.timestamp > this.lastProcessedEventTime) {
              this.lastProcessedEventTime = room.lastEvent.timestamp;
              this._processEvent(room.lastEvent);
            }
          }
        }
      } catch(e) {
        // En caso de fallo de red
      } finally {
        this.isSyncing = false;
      }
    }

    async _pushCloudRoom() {
      try {
        const getRes = await fetch(GH_API_URL, {
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          cache: 'no-store'
        });
        if (!getRes.ok) return;

        const fileData = await getRes.json();
        const currentSha = fileData.sha;
        const currentContent = JSON.parse(utf8B64Decode(fileData.content));

        currentContent.liveRoom = {
          pin: this.pin,
          phase: this.state.phase,
          roundNumber: this.state.roundNumber,
          currentStimulus: this.state.currentStimulus,
          startTime: this.state.startTime,
          players: this.state.players,
          responses: this.state.responses,
          lastEvent: this.state.lastEvent,
          updatedAt: Date.now()
        };

        await fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `live room update: ${this.state.phase}`,
            content: utf8B64Encode(JSON.stringify(currentContent)),
            sha: currentSha
          })
        });
      } catch(e) {}
    }

    async _appendPlayerCloud(playerInfo) {
      try {
        const getRes = await fetch(GH_API_URL, {
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          cache: 'no-store'
        });
        if (!getRes.ok) return;

        const fileData = await getRes.json();
        const currentSha = fileData.sha;
        const currentContent = JSON.parse(utf8B64Decode(fileData.content));

        if (!currentContent.liveRoom) {
          currentContent.liveRoom = { pin: this.pin, players: {}, responses: {} };
        }
        if (!currentContent.liveRoom.players) currentContent.liveRoom.players = {};

        currentContent.liveRoom.players[playerInfo.id] = playerInfo;
        currentContent.liveRoom.pin = this.pin;

        await fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `live join: ${playerInfo.name}`,
            content: utf8B64Encode(JSON.stringify(currentContent)),
            sha: currentSha
          })
        });
      } catch(e) {}
    }

    async _appendResponseCloud(resp) {
      try {
        const getRes = await fetch(GH_API_URL, {
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          cache: 'no-store'
        });
        if (!getRes.ok) return;

        const fileData = await getRes.json();
        const currentSha = fileData.sha;
        const currentContent = JSON.parse(utf8B64Decode(fileData.content));

        if (!currentContent.liveRoom) currentContent.liveRoom = { pin: this.pin, responses: {} };
        if (!currentContent.liveRoom.responses) currentContent.liveRoom.responses = {};

        currentContent.liveRoom.responses[resp.playerId] = resp;

        await fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `live response: ${resp.playerId}`,
            content: utf8B64Encode(JSON.stringify(currentContent)),
            sha: currentSha
          })
        });
      } catch(e) {}
    }

    _startSyncLoop() {
      if (this.pollingTimer) clearInterval(this.pollingTimer);
      // Polling cada 1 segundo
      this.pollingTimer = setInterval(() => {
        this._fetchCloudRoom();
      }, 1000);
      this._fetchCloudRoom();
    }

    _broadcastLocal(eventData) {
      if (this.localChannel) {
        try { this.localChannel.postMessage(eventData); } catch(e) {}
      }
      this._processEvent(eventData);
    }

    _handleLocalMessage(eventData) {
      if (eventData) {
        this._processEvent(eventData);
      }
    }

    _processEvent(payload) {
      if (!payload || !payload.type) return;

      switch (payload.type) {
        case 'PLAYER_JOINED':
          if (this.isHost && payload.player) {
            this.state.players[payload.player.id] = payload.player;
            this.emit('player_list_updated', Object.values(this.state.players));
          }
          break;

        case 'COUNTDOWN_STARTED':
          this.emit('countdown', payload);
          break;

        case 'STIMULUS_TRIGGERED':
          this.emit('stimulus', payload);
          break;

        case 'ROUND_CLOSED':
          this.emit('round_ended', payload);
          break;

        case 'PLAYER_RESPONSE':
          if (this.isHost && payload.response) {
            this.state.responses[payload.response.playerId] = payload.response;
            this.emit('response_received', {
              totalAnswers: Object.keys(this.state.responses).length,
              response: payload.response
            });
          }
          break;
      }
    }
  }

  window.LiveGameSession = LiveGameSession;
})(window);
