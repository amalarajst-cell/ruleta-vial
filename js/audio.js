// ============================================================
//  VIALPLAY / RULETA VIAL — WEB AUDIO SYNTHESIZER
//  Procedural real-time sound synthesis (Zero MP3 dependencies)
// ============================================================
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    const saved = localStorage.getItem('vialplay_sound_enabled');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  // Safe Haptic Feedback API wrapper (vibración física táctil en smartphones)
  vibrate(pattern) {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch (e) {}
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('vialplay_sound_enabled', this.enabled ? 'true' : 'false');
    return this.enabled;
  }

  playTick() {
    // Suave vibración táctil física al pasar cada segmento de la ruleta (30ms)
    this.vibrate([30]);
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playSpinStart() {
    // Vibración suave de inicio de giro (30ms)
    this.vibrate([30]);
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playCorrect() {
    // Golpe doble de vibración positiva al acertar [50ms, 50ms silencio, 50ms]
    this.vibrate([50, 50, 50]);
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.2, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.28);
      });
    } catch (e) {}
  }

  playWrong() {
    // Temblor de error al fallar [150ms]
    this.vibrate([150]);
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playIncorrect() {
    this.playWrong();
  }

  playGameOver() {
    this.playWrong();
  }

  playWheelWin() {
    this.vibrate([40, 60, 120]);
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Arpeggio triunfal brillante: Do5, Mi5, Sol5, Do6, Mi6 con armónicos
      const notes = [
        { f: 523.25, t: 0.00, d: 0.35, g: 0.18, type: 'triangle' },
        { f: 659.25, t: 0.06, d: 0.35, g: 0.20, type: 'triangle' },
        { f: 783.99, t: 0.12, d: 0.40, g: 0.22, type: 'triangle' },
        { f: 1046.50, t: 0.18, d: 0.65, g: 0.26, type: 'triangle' },
        { f: 1318.51, t: 0.24, d: 0.70, g: 0.15, type: 'sine' }
      ];

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = n.type;
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(n.g, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
    } catch (e) {}
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.14 },
        { f: 659.25, d: 0.14 },
        { f: 783.99, d: 0.14 },
        { f: 1046.5, d: 0.38 }
      ];

      let time = now;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(item.f, time);

        gain.gain.setValueAtTime(0.14, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + item.d);

        time += item.d * 0.85;
      });
    } catch (e) {}
  }
}

const audioSystem = new SoundSystem();
window.audioSystem = audioSystem;
window.sound = audioSystem;
