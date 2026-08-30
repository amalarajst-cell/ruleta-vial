// ============================================================
//  FORMACIÓN VIAL EXTREME — ROULETTE ENGINE (Mobile-First)
//  Canvas-based roulette with real signal images on segments
// ============================================================
class RouletteWheel {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.categories = [
      { id: 'bicicleta',      label: 'BICICLETA',   icon: '🚲', color: '#059669', darkColor: '#037050' },
      { id: 'peatones',       label: 'PEATONES',     icon: '🚶', color: '#0284C7', darkColor: '#0164A0' },
      { id: 'auto',           label: 'AUTO',          icon: '🚗', color: '#D97706', darkColor: '#B05E04' },
      { id: 'colectivo',      label: 'COLECTIVO',    icon: '🚌', color: '#7C3AED', darkColor: '#5E24CC' },
      { id: 'senales',        label: 'SEÑALES',       icon: '🚸', color: '#DC2626', darkColor: '#B01010' },
      { id: 'micromovilidad', label: 'MICROMOV.',    icon: '🛴', color: '#0891B2', darkColor: '#066E8E' },
      { id: 'moto',           label: 'MOTO',          icon: '🏍️', color: '#BE185D', darkColor: '#961047' }
    ];

    this.numSegments = this.categories.length;
    this.segmentAngle = (2 * Math.PI) / this.numSegments;
    this.currentAngle = -Math.PI / 2; // Start so first segment is at top (pointing to pointer)
    this.isSpinning = false;
    this.onSpinEnd = options.onSpinEnd || null;
    this.lastTickSegment = -1;

    this.setupCanvas();
    // Defer initial draw to ensure layout is complete
    requestAnimationFrame(() => {
      this.setupCanvas();
      this.draw();
    });

    window.addEventListener('resize', () => {
      // Small delay to ensure new layout dimensions are applied
      setTimeout(() => {
        this.setupCanvas();
        this.draw();
      }, 50);
    });
  }

  setupCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
    const wrap = this.canvas.parentElement;
    const size = wrap ? Math.min(wrap.clientWidth, wrap.clientHeight, 340) : 300;
    const safeSize = Math.max(size, 50); // ensure minimum size

    this.size = safeSize;
    this.canvas.style.width  = `${safeSize}px`;
    this.canvas.style.height = `${safeSize}px`;
    this.canvas.width  = Math.round(safeSize * dpr);
    this.canvas.height = Math.round(safeSize * dpr);

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    const padding = safeSize * 0.06;
    this.radius  = Math.max(1, safeSize / 2 - padding);
    this.centerX = safeSize / 2;
    this.centerY = safeSize / 2;
  }

  draw() {
    const ctx = this.ctx;
    const { centerX, centerY, radius, size } = this;

    // Safety guard — don't draw if canvas not yet sized properly
    if (!radius || radius <= 5 || !size) return;

    ctx.clearRect(0, 0, size, size);

    // ── Outer Glow Ring ──────────────────────────────────
    ctx.save();
    const glowGrad = ctx.createRadialGradient(centerX, centerY, radius - 4, centerX, centerY, radius + 14);
    glowGrad.addColorStop(0, 'rgba(255, 208, 0, 0.5)');
    glowGrad.addColorStop(1, 'rgba(255, 208, 0, 0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 14, 0, 2 * Math.PI);
    ctx.fillStyle = glowGrad;
    ctx.fill();
    ctx.restore();

    // ── Background Ring ───────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A1525';
    ctx.fill();
    ctx.restore();

    // ── Bezel ─────────────────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFD000';
    ctx.stroke();
    ctx.restore();

    // ── Draw each segment ─────────────────────────────────
    for (let i = 0; i < this.numSegments; i++) {
      this._drawSegment(i);
    }

    // ── Decorative outer pins ─────────────────────────────
    this._drawPins();

    // ── Center Hub ────────────────────────────────────────
    this._drawHub();

    // ── Pointer Arrow ─────────────────────────────────────
    this._drawPointer();
  }

  _drawSegment(i) {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const cat = this.categories[i];
    const startAngle = this.currentAngle + i * this.segmentAngle;
    const endAngle   = startAngle + this.segmentAngle;
    const midAngle   = (startAngle + endAngle) / 2;

    // Fill segment with radial gradient
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    // Safe gradient values
    const r0 = Math.max(0.1, radius * 0.1);
    const grad = ctx.createRadialGradient(centerX, centerY, r0, centerX, centerY, radius);
    grad.addColorStop(0.3, cat.color);
    grad.addColorStop(1,   cat.darkColor);
    ctx.fillStyle = grad;
    ctx.fill();

    // Segment border
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.stroke();
    ctx.restore();

    // ── Text (always upright & perfectly centered) ───────
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(midAngle);

    // Check if text would be upside-down and flip if needed
    let norm = (midAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const flipped = norm > Math.PI * 0.5 && norm < Math.PI * 1.5;
    if (flipped) ctx.rotate(Math.PI);

    const textR = flipped ? -(radius * 0.58) : radius * 0.58;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = Math.max(11, Math.round(radius * 0.125));

    // Label — crisp stroke for maximum contrast & legibility
    ctx.font = `900 ${fontSize}px 'Barlow Condensed', 'Inter', system-ui, sans-serif`;
    ctx.lineWidth = Math.max(3.5, fontSize * 0.3);
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.lineJoin = 'round';
    ctx.strokeText(cat.label, textR, 0);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(cat.label, textR, 0);

    ctx.restore();
  }

  _drawPins() {
    const ctx = this.ctx;
    const { centerX, centerY, radius, numSegments, currentAngle, segmentAngle } = this;
    const pinCount = numSegments * 2;

    for (let i = 0; i < pinCount; i++) {
      const angle = currentAngle + (i * 2 * Math.PI) / pinCount;
      const px = centerX + (radius - 5) * Math.cos(angle);
      const py = centerY + (radius - 5) * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFD000';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000';
      ctx.stroke();
    }
  }

  _drawHub() {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const hubR = Math.max(16, radius * 0.13);

    // Hub shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A1525';
    ctx.fill();
    ctx.restore();

    // Hub outer gold border
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFD000';
    ctx.stroke();

    // Hub inner metallic gold jewel
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubR * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFD000';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.stroke();
  }

  _drawPointer() {
    const ctx = this.ctx;
    const { centerX, centerY, radius } = this;
    const tipY = centerY - radius - 6;
    const baseHalf = 14;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX - baseHalf, tipY - 10);
    ctx.lineTo(centerX + baseHalf, tipY - 10);
    ctx.lineTo(centerX, tipY + 18);
    ctx.closePath();

    ctx.fillStyle = '#FFD000';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
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
    const spinDuration   = 4800;
    const startTime      = performance.now();

    const animate = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Cubic ease-out for natural deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      this.currentAngle = startAngle + totalRotation * ease;

      // Tick sound on segment change
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
