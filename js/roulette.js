// Canvas Roulette Wheel Engine - Legibility & Simple Clean Icons
class RouletteWheel {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.categories = [
      { id: 'bicicleta', label: 'BICICLETA', icon: '🚲', color: '#059669' },
      { id: 'peatones', label: 'PEATONES', icon: '🚶', color: '#0284C7' },
      { id: 'todos', label: 'TODOS', icon: '🚗', color: '#D97706' },
      { id: 'escolares', label: 'ESCOLARES', icon: '🚸', color: '#DC2626' },
      { id: 'buses', label: 'BUSES', icon: '🚌', color: '#7C3AED' }
    ];

    this.numSegments = this.categories.length;
    this.segmentAngle = (2 * Math.PI) / this.numSegments;
    this.currentAngle = 0;
    this.isSpinning = false;
    this.onSpinEnd = options.onSpinEnd || null;

    this.lastTickSegment = -1;

    this.setupCanvas();
    this.draw();

    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.draw();
    });
  }

  setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const parentWidth = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : 440;
    const size = Math.min(parentWidth - 16, 480);

    this.width = size;
    this.height = size;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.radius = (size / 2) - 16;
    this.centerX = size / 2;
    this.centerY = size / 2;
  }

  draw() {
    const ctx = this.ctx;
    const centerX = this.centerX;
    const centerY = this.centerY;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.width, this.height);

    // Outer Glowing Border Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#0F172A';
    ctx.shadowColor = '#FFC72C';
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();

    // Outer Bezel Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFC72C';
    ctx.stroke();
    ctx.restore();

    // Draw Segments
    for (let i = 0; i < this.numSegments; i++) {
      const cat = this.categories[i];
      const startAngle = this.currentAngle + i * this.segmentAngle;
      const endAngle = startAngle + this.segmentAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Radial Gradient
      const grad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, radius);
      grad.addColorStop(0, cat.color);
      grad.addColorStop(1, this.adjustBrightness(cat.color, -18));
      ctx.fillStyle = grad;
      ctx.fill();

      // Divider Lines
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();

      // --- TEXT & ICON PLACEMENT (NO CLIPPING, ALWAYS UPRIGHT & FULLY VISIBLE) ---
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Calculate middle angle of current segment
      let midAngle = (startAngle + endAngle) / 2;
      ctx.rotate(midAngle);

      // Normalize angle to check if text would be upside down
      let normAngle = (midAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const isUpsideDown = normAngle > Math.PI / 2 && normAngle < (3 * Math.PI) / 2;

      if (isUpsideDown) {
        ctx.rotate(Math.PI);
      }

      // Position text centered in middle of slice (proportional to radius)
      const textRadius = isUpsideDown ? -this.radius * 0.5 : this.radius * 0.5;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw Simple Icon (proportional font and offset)
      const iconSize = Math.max(16, Math.round(26 * (this.radius / 224)));
      ctx.font = `${iconSize}px system-ui, sans-serif`;
      ctx.fillText(cat.icon, textRadius, -Math.round(14 * (this.radius / 224)));

      // Draw Label with Heavy Stroke & High-Vis White Fill (proportional font, stroke, and offset)
      const fontSize = Math.max(10, Math.round(15 * (this.radius / 224)));
      ctx.font = `900 ${fontSize}px "Inter", system-ui, -apple-system, sans-serif`;
      
      ctx.lineWidth = Math.max(3, Math.round(5 * (this.radius / 224)));
      ctx.strokeStyle = '#000000';
      ctx.lineJoin = 'round';
      ctx.strokeText(cat.label, textRadius, Math.round(14 * (this.radius / 224)));

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(cat.label, textRadius, Math.round(14 * (this.radius / 224)));

      ctx.restore();
      ctx.restore();
    }

    // Outer Decorative Pins
    for (let i = 0; i < this.numSegments * 3; i++) {
      const pinAngle = this.currentAngle + (i * Math.PI * 2) / (this.numSegments * 3);
      const px = centerX + (radius - 7) * Math.cos(pinAngle);
      const py = centerY + (radius - 7) * Math.sin(pinAngle);

      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFC72C';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }

    // Small Center Hub (Compact Hub)
    const hubRadius = Math.max(18, Math.round(30 * (this.radius / 224)));
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0F172A';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.lineWidth = Math.max(2, Math.round(3 * (this.radius / 224)));
    ctx.strokeStyle = '#FFC72C';
    ctx.stroke();

    // Center Hub Icon & Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.max(11, Math.round(16 * (this.radius / 224)))}px system-ui`;
    ctx.fillStyle = '#FFC72C';
    ctx.fillText('🎯', centerX, centerY - Math.round(6 * (this.radius / 224)));
    
    ctx.font = `900 ${Math.max(6, Math.round(8 * (this.radius / 224)))}px "Inter", system-ui`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('GIRAR', centerX, centerY + Math.round(10 * (this.radius / 224)));
    ctx.restore();

    // Pointer Needle
    this.drawPointer();
  }

  drawPointer() {
    const ctx = this.ctx;
    const centerX = this.centerX;
    const topY = this.centerY - this.radius - 12;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX - 16, topY - 8);
    ctx.lineTo(centerX + 16, topY - 8);
    ctx.lineTo(centerX, topY + 20);
    ctx.closePath();

    ctx.fillStyle = '#FFC72C';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fill();

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0F172A';
    ctx.stroke();
    ctx.restore();
  }

  spin(forcedCategoryIndex = null) {
    if (this.isSpinning) return;
    this.isSpinning = true;

    audioSystem.playSpinStart();

    let targetIndex = forcedCategoryIndex;
    if (targetIndex === null || targetIndex === undefined) {
      targetIndex = Math.floor(Math.random() * this.numSegments);
    }

    const pointerAngle = -Math.PI / 2;
    const fullRotations = 5 + Math.floor(Math.random() * 3);
    const sliceCenterOffset = (targetIndex + 0.5) * this.segmentAngle;
    const targetFinalAngle = pointerAngle - sliceCenterOffset + (fullRotations * Math.PI * 2);

    const startAngle = this.currentAngle;
    const totalRotation = targetFinalAngle - (startAngle % (Math.PI * 2));
    const spinDuration = 4500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      this.currentAngle = startAngle + totalRotation * easeOut;

      const normalizedAngle = (this.currentAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const currentSegmentUnderPointer = Math.floor(
        ((pointerAngle - normalizedAngle + Math.PI * 2 * 10) % (Math.PI * 2)) / this.segmentAngle
      );

      if (currentSegmentUnderPointer !== this.lastTickSegment) {
        this.lastTickSegment = currentSegmentUnderPointer;
        audioSystem.playTick();
      }

      this.draw();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        const selectedCat = this.categories[targetIndex];

        if (this.onSpinEnd) {
          this.onSpinEnd(selectedCat);
        }
      }
    };

    requestAnimationFrame(animate);
  }

  adjustBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}
