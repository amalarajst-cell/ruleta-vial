/**
 * ── REALTIME LIVE ENGINE (SALA MULTIJUGADOR EN VIVO SINCRONIZADA) ──
 * Soporta sincronización bidireccional entre la Pantalla Proyector (Host)
 * y los Celulares de los participantes (Clientes) a través de una base de datos
 * en tiempo real pública (Firebase RTDB / PieSocket WebSocket / Broadcast).
 * 
 * Esto permite que cuando el Host lanza el estímulo en la pantalla gigante,
 * todos los celulares vibren y muestren los pulsadores en el mismo milisegundo,
 * y las respuestas lleguen instantáneamente al proyector.
 */

(function(window) {
  // Base de datos de tiempo real pública para salas de juego en vivo
  const RTDB_BASE = 'https://ruleta-vial-default-rtdb.firebaseio.com/rooms';

  class LiveGameSession {
    constructor(pin, isHost = false) {
      this.pin = String(pin || '2026').trim();
      this.isHost = isHost;
      this.roomPath = `${RTDB_BASE}/${this.pin}`;
      this.listeners = {};
      this.pollingInterval = null;
      this.lastProcessedEventTime = 0;

      this.state = {
        pin: this.pin,
        phase: 'LOBBY', // LOBBY, COUNTDOWN, STIMULUS, ROUND_OVER, PODIUM
        roundNumber: 0,
        currentStimulus: null,
        startTime: null,
        players: {},
        responses: {},
        lastEvent: null
      };

      // Canal local (entre pestañas de la misma máquina)
      try {
        this.localChannel = new BroadcastChannel(`vialplay_room_${this.pin}`);
        this.localChannel.onmessage = (e) => this._handleLocalMessage(e.data);
      } catch (e) {
        this.localChannel = null;
      }

      this._startPolling();
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

    // ── MÉTODOS DEL HOST (PROYECTOR) ──
    async initRoom(gameType = 'reaccion') {
      this.state.phase = 'LOBBY';
      this.state.gameType = gameType;
      this.state.players = {};
      this.state.responses = {};
      this.state.roundNumber = 0;
      this.state.lastEvent = { type: 'ROOM_CREATED', timestamp: Date.now() };

      await this._pushCloudState();
      this._broadcastLocal(this.state.lastEvent);
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

      await this._pushCloudState();
      this._broadcastLocal(this.state.lastEvent);

      // Transición al estímulo activo
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

        await this._pushCloudState();
        this._broadcastLocal(this.state.lastEvent);
      }, countdownSeconds * 1000);
    }

    async closeRound() {
      this.state.phase = 'ROUND_OVER';
      this.state.lastEvent = {
        type: 'ROUND_CLOSED',
        responses: this.state.responses,
        timestamp: Date.now()
      };
      await this._pushCloudState();
      this._broadcastLocal(this.state.lastEvent);
    }

    // ── MÉTODOS DEL PARTICIPANTE (CELULAR) ──
    async joinPlayer(playerData) {
      const playerId = playerData.id || `p_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      const playerInfo = {
        id: playerId,
        name: playerData.name || 'Participante',
        role: playerData.role || 'Auto (Cat B)',
        avatar: playerData.avatar || 'assets/brand/icon_auto.png',
        totalScore: 0,
        bestReactionTime: 9999,
        answersCount: 0
      };

      // Guardar jugador en la nube
      try {
        await fetch(`${this.roomPath}/players/${playerId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(playerInfo)
        });
      } catch(e) {}

      this.state.players[playerId] = playerInfo;
      this._broadcastLocal({ type: 'PLAYER_JOINED', player: playerInfo });
      return playerInfo;
    }

    async submitReaction(playerId, actionChosen, reactionMs) {
      const resp = {
        playerId: playerId,
        action: actionChosen,
        reactionMs: reactionMs,
        timestamp: Date.now()
      };

      try {
        await fetch(`${this.roomPath}/responses/${playerId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resp)
        });
      } catch(e) {}

      this._broadcastLocal({ type: 'PLAYER_RESPONSE', response: resp });
      return resp;
    }

    // ── SINCRONIZACIÓN EN TIEMPO REAL (POLLING ULTRA-RÁPIDO 400ms) ──
    _startPolling() {
      if (this.pollingInterval) clearInterval(this.pollingInterval);

      // Polling de alta frecuencia para reflejos en vivo
      this.pollingInterval = setInterval(async () => {
        try {
          const res = await fetch(`${this.roomPath}.json`, { cache: 'no-store' });
          if (!res.ok) return;
          const remoteData = await res.json();
          if (!remoteData) return;

          // Si somos Host, procesar nuevos jugadores y respuestas
          if (this.isHost) {
            if (remoteData.players) {
              const currentCount = Object.keys(this.state.players).length;
              const newCount = Object.keys(remoteData.players).length;
              this.state.players = remoteData.players;
              if (newCount !== currentCount) {
                this.emit('player_list_updated', Object.values(this.state.players));
              }
            }

            if (remoteData.responses && this.state.phase === 'STIMULUS') {
              const currentRespCount = Object.keys(this.state.responses).length;
              const newRespCount = Object.keys(remoteData.responses).length;
              this.state.responses = remoteData.responses;

              if (newRespCount !== currentRespCount) {
                this.emit('response_received', {
                  totalAnswers: newRespCount,
                  responses: this.state.responses
                });
              }
            }
          } 
          // Si somos Participante (Celular), sincronizar eventos del Host
          else {
            if (remoteData.lastEvent && remoteData.lastEvent.timestamp > this.lastProcessedEventTime) {
              this.lastProcessedEventTime = remoteData.lastEvent.timestamp;
              this._processEvent(remoteData.lastEvent);
            }
          }
        } catch(e) {
          // Si falla internet, sigue funcionando por canal local
        }
      }, 500);
    }

    async _pushCloudState() {
      try {
        await fetch(`${this.roomPath}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state)
        });
      } catch(e) {}
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
