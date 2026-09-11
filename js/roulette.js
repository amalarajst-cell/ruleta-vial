// ============================================================
//  VIALPLAY — ROULETTE ENGINE (Stitch Edition)
//  Canvas-based high-DPI roulette wheel with stitch theme
// ============================================================
class RouletteWheel {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    
    // Standard General Categories
    this.defaultCategories = [
      { id: 'bicicleta',      label: 'BICICLETA',   color: '#059669', darkColor: '#037050', name: 'Bicicleta' },
      { id: 'peatones',       label: 'PEATONES',     color: '#0284C7', darkColor: '#0164A0', name: 'Peatones' },
      { id: 'auto',           label: 'AUTO',          color: '#D97706', darkColor: '#B05E04', name: 'Auto' },
      { id: 'colectivo',      label: 'COLECTIVO',    color: '#7C3AED', darkColor: '#5E24CC', name: 'Colectivo' },
      { id: 'senales',        label: 'SEÑALES',       color: '#DC2626', darkColor: '#B01010', name: 'Señales' },
      { id: 'micromovilidad', label: 'MICROMOV.',    color: '#0891B2', darkColor: '#066E8E', name: 'Micromovilidad' },
      { id: 'moto',           label: 'MOTO',          color: '#BE185D', darkColor: '#961047', name: 'Moto' }
    ];

    // 🚌 Dedicated Colectivo / Transporte de Pasajeros Categories
    this.colectivoCategories = [
      { id: 'prioridad',  label: 'PRIORIDAD',  color: '#D97706', darkColor: '#B05E04', name: 'Prioridades de Paso' },
      { id: 'senales',    label: 'SEÑALES',    color: '#DC2626', darkColor: '#B01010', name: 'Señales y Demarcación' },
      { id: 'velocidad',  label: 'VELOCIDAD',  color: '#0284C7', darkColor: '#0164A0', name: 'Límites de Velocidad' },
      { id: 'metrobus',   label: 'METROBÚS',   color: '#059669', darkColor: '#037050', name: 'Carriles y Metrobús' },
      { id: 'seguridad',  label: 'SEGURIDAD',  color: '#7C3AED', darkColor: '#5E24CC', name: 'Puntos Ciegos y Seguridad' },
      { id: 'pasajeros',  label: 'PASAJEROS',  color: '#0891B2', darkColor: '#066E8E', name: 'Transporte de Pasajeros' },
      { id: 'normativa',  label: 'NORMATIVA',  color: '#BE185D', darkColor: '#961047', name: 'Normativa y Licencia D1' }
    ];

    // 🏍️ Dedicated Motociclista Categories (Formación Vial Extreme - Clase A)
    this.motoCategories = [
      { id: 'casco',      label: 'CASCO & EQUIPO',  color: '#BE185D', darkColor: '#961047', name: 'Casco & Indumentaria', icon: '🪖' },
      { id: 'frenado',    label: 'FRENADO',         color: '#DC2626', darkColor: '#B01010', name: 'Técnicas de Frenado', icon: '🛑' },
      { id: 'espejos',    label: 'PUNTOS CIEGOS',   color: '#0284C7', darkColor: '#0164A0', name: 'Puntos Ciegos y Espejos', icon: '👁️' },
      { id: 'pasajeros',  label: 'ACOMPAÑANTE',     color: '#D97706', darkColor: '#B05E04', name: 'Pasajeros y Carga', icon: '👥' },
      { id: 'clima',      label: 'CLIMA & CALZADA', color: '#059669', darkColor: '#037050', name: 'Calzada Mojada y Clima', icon: '🌧️' },
      { id: 'velocidad',  label: 'VELOCIDADES',     color: '#7C3AED', darkColor: '#5E24CC', name: 'Velocidades y Vías', icon: '⚡' },
      { id: 'normativa',  label: 'VTV & LEYES',     color: '#0891B2', darkColor: '#066E8E', name: 'Documentación, VTV y Leyes', icon: '📋' }
    ];

    // 🚗 Dedicated Auto / Particular (Clase B) Categories
    this.autoCategories = [
      { id: 'prioridad',       label: 'PRIORIDADES',  color: '#D97706', darkColor: '#B05E04', name: 'Prioridades de Paso', icon: '🔶' },
      { id: 'senales',         label: 'SEÑALES',      color: '#DC2626', darkColor: '#B01010', name: 'Señales y Demarcación', icon: '🛑' },
      { id: 'velocidad',       label: 'VELOCIDADES',  color: '#0284C7', darkColor: '#0164A0', name: 'Límites de Velocidad', icon: '⚡' },
      { id: 'seguridad',       label: 'SEGURIDAD',    color: '#059669', darkColor: '#037050', name: 'Elementos de Seguridad', icon: '🛡️' },
      { id: 'clima',           label: 'CLIMA & VÍA',  color: '#7C3AED', darkColor: '#5E24CC', name: 'Situaciones Adversas', icon: '🌧️' },
      { id: 'estacionamiento', label: 'ESTACIONAM.',  color: '#0891B2', darkColor: '#066E8E', name: 'Estacionamiento y Detención', icon: '🅿️' },
      { id: 'normativa',       label: 'LEYES & DOC.', color: '#BE185D', darkColor: '#961047', name: 'Normativa y Documentación', icon: '📋' }
    ];

    this.mode = 'default';
    this.categories = this.defaultCategories;
    this.centerText = { top: 'VIAL', bottom: 'PLAY' };

    this.numSegments = this.categories.length;
    this.segmentAngle = (2 * Math.PI) / this.numSegments;
    this.currentAngle = -Math.PI / 2; // Start so first segment is at top pointer
    this.isSpinning = false;
    this.onSpinEnd = options.onSpinEnd || null;
    this.lastTickSegment = -1;

    this.setupCanvas();
    requestAnimationFrame(() => {
      this.setupCanvas();
      this.draw();
    });

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.setupCanvas();
        this.draw();
      }, 50);
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'colectivo') {
      this.categories = this.colectivoCategories;
      this.centerText = { top: 'BUS', bottom: 'D1' };
    } else if (mode === 'moto') {
      this.categories = this.motoCategories;
      this.centerText = { top: 'MOTO', bottom: 'CLASE A' };
    } else if (mode === 'auto') {
      this.categories = this.autoCategories;
      this.centerText = { top: 'AUTO', bottom: 'CLASE B' };
    } else {
      this.categories = this.defaultCategories;
      this.centerText = { top: 'VIAL', bottom: 'PLAY' };
    }
    this.numSegments = this.categories.length;
    this.segmentAngle = (2 * Math.PI) / this.numSegments;
    this.draw();
  }

  setupCanvas() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const wrap = this.canvas.parentElement;
    const size = wrap ? Math.min(wrap.clientWidth, wrap.clientHeight, 360) : 340;
    const safeSize = Math.max(size, 80);

    this.size = safeSize;
    this.canvas.style.width  = `${safeSize}px`;
    this.canvas.style.height = `${safeSize}px`;
    this.canvas.width  = Math.round(safeSize * dpr);
    this.canvas.height = Math.round(safeSize * dpr);

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    const padding = safeSize * 0.055;
    this.radius  = Math.max(1, safeSize / 2 - padding);
    this.centerX = safeSize / 2;
    this.centerY = safeSize / 2;
  }

  draw() {
    const ctx = this.ctx;
    const { centerX, centerY, radius, size } = this;

    if (!radius || radius <= 5 || !size) return;

    ctx.clearRect(0, 0, size, size);

    // ── Outer Ambient Aura Glow ──────────────────────────
    ctx.save();
    const glowGrad = ctx.createRadialGradient(centerX, centerY, radius - 8, centerX, centerY, radius + 16);
    glowGrad.addColorStop(0, 'rgba(141, 226, 214, 0.45)');
    glowGrad.addColorStop(0.6, 'rgba(255, 198, 0, 0.25)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 16, 0, 2 * Math.PI);
    ctx.fillStyle = glowGrad;
    ctx.fill();
    ctx.restore();

    // ── Deep Bezel Base ──────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#153244';
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#FFC600';
    ctx.stroke();
    ctx.restore();

    // ── Segments ─────────────────────────────────────────
    for (let i = 0; i < this.numSegments; i++) {
      this._drawSegment(i);
    }

    // ── Decorative Outer Pins ─────────────────────────────
    this._drawPins();

    // ── Center Dynamic Hub ────────────────────────────────
    this._drawHub();

    // ── Pointer Arrow at Top ──────────────────────────────
    this._drawPointer();
  }

  _drawSegment(i) {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const cat = this.categories[i];
    const startAngle = this.currentAngle + i * this.segmentAngle;
    const endAngle   = startAngle + this.segmentAngle;
    const midAngle   = (startAngle + endAngle) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    const r0 = Math.max(0.1, radius * 0.15);
    const grad = ctx.createRadialGradient(centerX, centerY, r0, centerX, centerY, radius);
    grad.addColorStop(0.25, cat.color);
    grad.addColorStop(1,    cat.darkColor);
    ctx.fillStyle = grad;
    ctx.fill();

    // Segment divider lines with clean styling
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(18, 20, 20, 0.85)';
    ctx.stroke();
    ctx.restore();

    // ── Segment Text (SIN ICONOS, FORMATO CONDENSADO Y ADAPTABLE) ──
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(midAngle);

    let norm = (midAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const flipped = norm > Math.PI * 0.5 && norm < Math.PI * 1.5;
    if (flipped) ctx.rotate(Math.PI);

    const hubR = Math.max(22, radius * 0.20);
    const maxTextLength = (radius - 10) - (hubR + 8);
    const midR = hubR + (radius - 10 - hubR) * 0.52;
    const textR = flipped ? -midR : midR;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Auto-scale font size to ensure every word fits with margins
    let fontSize = Math.max(12, Math.round(radius * 0.125));
    ctx.font = `900 ${fontSize}px 'Barlow Condensed', 'Archivo', system-ui, sans-serif`;
    let measured = ctx.measureText(cat.label).width;
    while (measured > maxTextLength && fontSize > 8.5) {
      fontSize -= 0.5;
      ctx.font = `900 ${fontSize}px 'Barlow Condensed', 'Archivo', system-ui, sans-serif`;
      measured = ctx.measureText(cat.label).width;
    }
    
    // Label with drop outline for high readability
    ctx.lineWidth = Math.max(3, fontSize * 0.26);
    ctx.strokeStyle = 'rgba(12, 16, 20, 0.95)';
    ctx.lineJoin = 'round';
    ctx.strokeText(cat.label, textR, 0);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(cat.label, textR, 0);

    ctx.restore();
  }

  _drawPins() {
    const ctx = this.ctx;
    const { centerX, centerY, radius, numSegments, currentAngle } = this;
    const pinCount = numSegments * 2;

    for (let i = 0; i < pinCount; i++) {
      const angle = currentAngle + (i * 2 * Math.PI) / pinCount;
      const px = centerX + (radius - 5) * Math.cos(angle);
      const py = centerY + (radius - 5) * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(px, py, 3.2, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFC600';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#121414';
      ctx.stroke();
    }
  }

  _drawHub() {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const hubR = Math.max(22, radius * 0.20);

    // Outer Hub Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR, 0, 2 * Math.PI);
    ctx.fillStyle = '#0C0F0F';
    ctx.fill();
    ctx.restore();

    // Hub Outer Bezel
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8DE2D6';
    ctx.stroke();

    // Inner Jewel
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR * 0.78, 0, 2 * Math.PI);
    ctx.fillStyle = '#153244';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFC600';
    ctx.stroke();

    // VialPlay text in center
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.max(8.5, hubR * 0.38)}px 'Archivo Black', 'Archivo', sans-serif`;
    const topText = this.centerText?.top || 'VIAL';
    const bottomText = this.centerText?.bottom || 'PLAY';
    ctx.fillStyle = '#8DE2D6';
    ctx.fillText(topText, centerX, centerY - hubR * 0.16);
    ctx.fillStyle = '#FFC600';
    ctx.fillText(bottomText, centerX, centerY + hubR * 0.22);
  }

  _drawPointer() {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const tipY = centerY - radius - 5;
    const baseHalf = 15;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX - baseHalf, tipY - 14);
    ctx.lineTo(centerX + baseHalf, tipY - 14);
    ctx.lineTo(centerX, tipY + 16);
    ctx.closePath();

    ctx.fillStyle = '#FFC600';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fill();

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#121414';
    ctx.stroke();

    // Pointer mini indicator pip
    ctx.beginPath();
    ctx.arc(centerX, tipY - 5, 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#153244';
    ctx.fill();

    ctx.restore();
  }

  spin(forcedIndex = null) {
    if (this.isSpinning) return;
    this.isSpinning = true;

    if (typeof audioSystem !== 'undefined') audioSystem.playSpinStart();

    const targetIndex = (forcedIndex !== null && forcedIndex !== undefined)
      ? forcedIndex
      : Math.floor(Math.random() * this.numSegments);

    const pointerAngle   = -Math.PI / 2;
    const fullRotations  = 6 + Math.floor(Math.random() * 3);
    const sliceCenter    = (targetIndex + 0.5) * this.segmentAngle;
    const targetFinal    = pointerAngle - sliceCenter - (this.currentAngle % (2 * Math.PI)) + (fullRotations * 2 * Math.PI);

    const startAngle     = this.currentAngle;
    const totalRotation  = targetFinal;
    const spinDuration   = 4600;
    const startTime      = performance.now();

    const animate = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Quartic ease-out deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      this.currentAngle = startAngle + totalRotation * ease;

      // Tick sound on segment boundary
      const pointerNorm = ((pointerAngle - this.currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const seg = Math.floor(pointerNorm / this.segmentAngle) % this.numSegments;
      if (seg !== this.lastTickSegment) {
        this.lastTickSegment = seg;
        if (typeof audioSystem !== 'undefined') audioSystem.playTick();
      }

      this.draw();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        const selected = this.categories[targetIndex];
        if (this.onSpinEnd) this.onSpinEnd(selected);
      }
    };

    requestAnimationFrame(animate);
  }
}
