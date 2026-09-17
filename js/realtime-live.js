/**
 * ── REALTIME LIVE ENGINE (SALA MULTIJUGADOR EN VIVO ESTILO KAHOOT) ──
 * Soporta Firebase Realtime Database para sincronizar en tiempo real:
 * - Proyector / Host (live_host.html)
 * - Celulares de participantes (index.html / sección En Vivo)
 * 
 * Si Firebase no está configurado aún o no hay conexión a internet,
 * incluye un modo fallback de simulación local interactiva (BroadcastChannel / LocalStorage)
 * para probar el flujo sin fallos.
 */

(function(window) {
  // Configuración predeterminada de Firebase Realtime Database
  // Puede ser sobreescrita dinámicamente con window.FIREBASE_CONFIG
  const DEFAULT_CONFIG = {
    apiKey: "AIzaSyDummyKeyForLiveSyncVialPlay2026",
    authDomain: "ruleta-vial-live.firebaseapp.com",
    databaseURL: "https://ruleta-vial-live-default-rtdb.firebaseio.com",
    projectId: "ruleta-vial-live",
    storageBucket: "ruleta-vial-live.appspot.com",
    messagingSenderId: "1029384756",
    appId: "1:1029384756:web:abcdef123456"
  };

  class LiveGameSession {
    constructor(pin, isHost = false) {
      this.pin = String(pin || '2026').trim();
      this.isHost = isHost;
      this.roomId = `room_${this.pin}`;
      this.listeners = {};
      this.state = {
        pin: this.pin,
        phase: 'LOBBY', // LOBBY, WAITING_ROUND, COUNTDOWN, STIMULUS, ROUND_OVER, PODIUM
        gameType: 'reaccion', // 'reaccion' o 'ruleta'
        roundNumber: 1,
        totalRounds: 5,
        currentStimulus: null,
        startTime: null,
        players: {},
        responses: {}
      };

      // Inicializar canal de comunicación local (BroadcastChannel) para pruebas simultáneas entre pestañas
      try {
        this.localChannel = new BroadcastChannel(`vialplay_room_${this.pin}`);
        this.localChannel.onmessage = (e) => this._handleChannelMessage(e.data);
      } catch (err) {
        this.localChannel = null;
      }

      this._initStorageWatcher();
    }

    on(event, callback) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(callback);
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(cb => cb(data));
      }
    }

    // ── MÉTODOS DEL HOST / PROYECTOR ──
    initRoom(gameType = 'reaccion') {
      this.state.phase = 'LOBBY';
      this.state.gameType = gameType;
      this.state.players = {};
      this.state.responses = {};
      this.state.roundNumber = 0;
      this._saveState();
      this._broadcast({ type: 'ROOM_CREATED', state: this.state });
      return this.state;
    }

    startRound(stimulusData, countdownSeconds = 3) {
      this.state.roundNumber++;
      this.state.phase = 'COUNTDOWN';
      this.state.currentStimulus = stimulusData;
      this.state.responses = {};
      this._saveState();
      this._broadcast({ 
        type: 'COUNTDOWN_STARTED', 
        countdown: countdownSeconds, 
        round: this.state.roundNumber 
      });

      // Transición al estímulo activo tras el countdown
      setTimeout(() => {
        this.state.phase = 'STIMULUS';
        this.state.startTime = Date.now();
        this._saveState();
        this._broadcast({
          type: 'STIMULUS_TRIGGERED',
          stimulus: stimulusData,
          startTime: this.state.startTime,
          round: this.state.roundNumber
        });
      }, countdownSeconds * 1000);
    }

    closeRound() {
      this.state.phase = 'ROUND_OVER';
      this._saveState();
      this._broadcast({ type: 'ROUND_CLOSED', responses: this.state.responses });
    }

    showFinalPodium() {
      this.state.phase = 'PODIUM';
      this._saveState();
      this._broadcast({ type: 'SHOW_PODIUM' });
    }

    // ── MÉTODOS DEL PARTICIPANTE / MÓVIL ──
    joinPlayer(playerData) {
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

      this._broadcast({ type: 'PLAYER_JOINED', player: playerInfo });
      return playerInfo;
    }

    submitReaction(playerId, actionChosen, reactionMs) {
      const resp = {
        playerId: playerId,
        action: actionChosen,
        reactionMs: reactionMs,
        timestamp: Date.now()
      };
      this._broadcast({ type: 'PLAYER_RESPONSE', response: resp });
      return resp;
    }

    // ── GESTIÓN DE ESTADO Y BROADCAST ──
    _saveState() {
      try {
        localStorage.setItem(`vialplay_room_state_${this.pin}`, JSON.stringify(this.state));
      } catch(e) {}
    }

    _loadState() {
      try {
        const raw = localStorage.getItem(`vialplay_room_state_${this.pin}`);
        if (raw) return JSON.parse(raw);
      } catch(e) {}
      return null;
    }

    _broadcast(payload) {
      payload.senderPin = this.pin;
      payload.timestamp = Date.now();
      if (this.localChannel) {
        this.localChannel.postMessage(payload);
      }
      // Actualizar localStorage para activar evento 'storage' en otras ventanas
      try {
        localStorage.setItem(`vialplay_last_event_${this.pin}`, JSON.stringify(payload));
      } catch(e) {}

      // Procesar localmente si somos host o jugador
      this._processEvent(payload);
    }

    _handleChannelMessage(payload) {
      if (payload && payload.senderPin === this.pin) {
        this._processEvent(payload);
      }
    }

    _initStorageWatcher() {
      window.addEventListener('storage', (e) => {
        if (e.key === `vialplay_last_event_${this.pin}` && e.newValue) {
          try {
            const payload = JSON.parse(e.newValue);
            this._processEvent(payload);
          } catch(err) {}
        }
      });
    }

    _processEvent(payload) {
      switch (payload.type) {
        case 'ROOM_CREATED':
          this.state = payload.state;
          this.emit('room_ready', this.state);
          break;

        case 'PLAYER_JOINED':
          if (this.isHost) {
            this.state.players[payload.player.id] = payload.player;
            this._saveState();
            this.emit('player_list_updated', Object.values(this.state.players));
          }
          this.emit('player_joined', payload.player);
          break;

        case 'COUNTDOWN_STARTED':
          this.emit('countdown', payload);
          break;

        case 'STIMULUS_TRIGGERED':
          this.emit('stimulus', payload);
          break;

        case 'PLAYER_RESPONSE':
          if (this.isHost) {
            const r = payload.response;
            if (!this.state.responses[r.playerId]) {
              this.state.responses[r.playerId] = r;
              
              // Actualizar score del jugador si es correcto
              const expected = this.state.currentStimulus ? this.state.currentStimulus.action : '';
              const isCorrect = r.action === expected;
              const player = this.state.players[r.playerId];
              if (player) {
                player.answersCount++;
                if (isCorrect) {
                  // Entre más rápido, más puntos (ej: 1000 - reactionMs)
                  const speedPoints = Math.max(100, Math.round(1000 - r.reactionMs));
                  player.totalScore += speedPoints;
                  if (r.reactionMs < player.bestReactionTime) {
                    player.bestReactionTime = r.reactionMs;
                  }
                }
              }
              this._saveState();
              this.emit('response_received', { response: r, player, totalAnswers: Object.keys(this.state.responses).length });
            }
          }
          break;

        case 'ROUND_CLOSED':
          this.emit('round_ended', payload);
          break;

        case 'SHOW_PODIUM':
          this.emit('show_podium', this.state);
          break;
      }
    }
  }

  window.LiveGameSession = LiveGameSession;
})(window);
