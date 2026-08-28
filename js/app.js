// ============================================================
//  FORMACIÓN VIAL EXTREME — MAIN APP CONTROLLER (v2.0)
//  Mobile-First: 5 screens, 5 random questions per round
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── SCREEN MANAGEMENT ───────────────────────────────────
  const screens = {
    login:     document.getElementById('screen-login'),
    roulette:  document.getElementById('screen-roulette'),
    questions: document.getElementById('screen-questions'),
    results:   document.getElementById('screen-results'),
    stats:     document.getElementById('screen-stats')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screens[name]) {
      screens[name].classList.add('active');
      screens[name].scrollTop = 0;
    }
    // Redraw roulette after screen is shown so canvas gets correct dimensions
    if (name === 'roulette' && typeof roulette !== 'undefined') {
      requestAnimationFrame(() => {
        roulette.setupCanvas();
        roulette.draw();
      });
      // Check if current player already played their single turn
      updateRouletteLockState();
    }
  }

  // ── SESSION STATE ────────────────────────────────────────
  let playerName  = localStorage.getItem('vex_player_name')  || '';
  let playerEmail = localStorage.getItem('vex_player_email') || '';
  let sessionScore   = 0;
  let sessionStreak  = 0;
  let sessionRounds  = 0;
  let sessionCorrect = 0;
  let leaderboard      = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
  let loginsHistory    = JSON.parse(localStorage.getItem('vex_logins_history') || '[]');
  let responsesHistory = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
  let completedPlayers = JSON.parse(localStorage.getItem('vex_completed_players') || '[]');

  function hasPlayerCompleted(email) {
    if (!email) return false;
    return completedPlayers.includes(email.toLowerCase().trim());
  }

  function markPlayerCompleted(email) {
    if (!email) return;
    const clean = email.toLowerCase().trim();
    if (!completedPlayers.includes(clean)) {
      completedPlayers.push(clean);
      localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
    }
  }

  // ── ROUND STATE ──────────────────────────────────────────
  let activeRound = null;          // { category, questions[], index, correctCount, times[], perQ[] }
  let questionStartTime = 0;
  let timerInterval = null;
  let isAnswered = false;
  let autoAdvTimer = null;

  // ── DOM REFS ─────────────────────────────────────────────
  const inputNombre = document.getElementById('input-nombre');
  const inputEmail  = document.getElementById('input-email');
  const btnIngresar = document.getElementById('btn-ingresar');

  const headerPlayerName = document.getElementById('header-player-name');
  const btnChangePlayer  = document.getElementById('btn-change-player');

  const statScore   = document.getElementById('stat-score');
  const statStreak  = document.getElementById('stat-streak');
  const statRounds  = document.getElementById('stat-rounds');
  const statCorrect = document.getElementById('stat-correct');

  const btnSpin    = document.getElementById('btn-spin');
  const spinCanvas = document.getElementById('roulette-canvas');

  const qCategoryChip = document.getElementById('q-category-chip');
  const qCurrent      = document.getElementById('q-current');
  const progressFill  = document.getElementById('progress-fill');
  const qTimer        = document.getElementById('q-timer');
  const qText         = document.getElementById('q-text');
  const qImageBlock   = document.getElementById('q-image-block');
  const qOptions      = document.getElementById('q-options');
  const qFeedback     = document.getElementById('q-feedback');
  const fbTitle       = document.getElementById('fb-title');
  const fbExplanation = document.getElementById('fb-explanation');
  const fbTimeTag     = document.getElementById('fb-time-tag');
  const btnNext       = document.getElementById('btn-next');
  const btnNextLabel  = document.getElementById('btn-next-label');

  const resultsWrapper = document.getElementById('results-wrapper');
  const statsContent   = document.getElementById('stats-content');

  const btnBackFromStats = document.getElementById('btn-back-from-stats');

  // ── CATEGORY MAP (matches questions.js CATEGORIES) ───────
  const CAT_MAP = {
    bicicleta:      { id: 'bicicleta',      name: 'Bicicleta',     icon: '🚲', color: '#059669' },
    peatones:       { id: 'peatones',       name: 'Peatones',      icon: '🚶', color: '#0284C7' },
    auto:           { id: 'auto',           name: 'Auto',           icon: '🚗', color: '#D97706' },
    colectivo:      { id: 'colectivo',      name: 'Colectivo',     icon: '🚌', color: '#7C3AED' },
    senales:        { id: 'senales',        name: 'Señales',        icon: '🚸', color: '#DC2626' },
    micromovilidad: { id: 'micromovilidad', name: 'Micromovilidad', icon: '🛴', color: '#0891B2' },
    moto:           { id: 'moto',           name: 'Moto',           icon: '🏍️', color: '#BE185D' }
  };

  // ── ROULETTE (declared early to avoid TDZ in showScreen) ──
  let roulette = null;

  // ── INITIAL STATE ────────────────────────────────────────
  if (playerName) {
    updateHeaderDisplay();
    updateStatsBar();
  } else {
    showScreen('login');
    setTimeout(() => inputNombre.focus(), 400);
  }

  // ── ROULETTE INIT ─────────────────────────────────────────
  roulette = new RouletteWheel('roulette-canvas', {
    onSpinEnd: (category) => {
      // map category from roulette into full CAT_MAP info
      const catInfo = CAT_MAP[category.id] || category;
      startRound(catInfo);
    }
  });

  // Show roulette screen or stats if already completed
  if (playerName) {
    if (hasPlayerCompleted(playerEmail)) {
      renderStatsScreen();
      showScreen('stats');
    } else {
      showScreen('roulette');
    }
  }

  // ── LOGIN ─────────────────────────────────────────────────
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function performLogin() {
    const name  = inputNombre.value.trim();
    const email = inputEmail.value.trim();

    if (!name) {
      shakeInput(inputNombre, 'Por favor ingresá tu nombre.');
      return;
    }
    if (!email) {
      shakeInput(inputEmail, 'Por favor ingresá tu email.');
      return;
    }
    if (!validateEmail(email)) {
      shakeInput(inputEmail, 'El email no es válido.');
      return;
    }

    playerName  = name;
    playerEmail = email;
    localStorage.setItem('vex_player_name',  playerName);
    localStorage.setItem('vex_player_email', playerEmail);

    // Record login entry
    const timestamp = new Date().toLocaleString('es-AR');
    const loginPayload = { name: playerName, email: playerEmail, timestamp };
    loginsHistory.push(loginPayload);
    localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory));

    // Send to local server log endpoint if running locally
    fetch('/api/log-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    }).catch(() => {});

    updateHeaderDisplay();
    updateStatsBar();

    // Trigger audio init on first user gesture
    if (typeof audioSystem !== 'undefined') audioSystem.init();

    // Check if player has already completed their single turn
    if (hasPlayerCompleted(playerEmail)) {
      alert(`Hola ${playerName}, ya realizaste tu giro anteriormente. Te redirigimos al Ranking de posiciones.`);
      renderStatsScreen();
      showScreen('stats');
    } else {
      showScreen('roulette');
    }
  }

  function shakeInput(input, msg) {
    input.style.borderColor = '#FF3B3B';
    input.style.animation = 'screenIn 0.1s ease';
    input.focus();
    setTimeout(() => { input.style.borderColor = ''; input.style.animation = ''; }, 1200);
    // brief inline error
    const existErr = input.parentElement.querySelector('.field-error');
    if (existErr) existErr.remove();
    const err = document.createElement('p');
    err.className = 'field-error';
    err.style.cssText = 'font-size:11px;color:#FF7070;margin-top:5px;font-weight:600;';
    err.textContent = msg;
    input.parentElement.appendChild(err);
    setTimeout(() => err.remove(), 2500);
  }

  btnIngresar.addEventListener('click', performLogin);
  inputNombre.addEventListener('keypress', e => { if (e.key === 'Enter') inputEmail.focus(); });
  inputEmail.addEventListener('keypress',  e => { if (e.key === 'Enter') performLogin(); });

  // ── HEADER / PLAYER DISPLAY ──────────────────────────────
  function updateHeaderDisplay() {
    if (headerPlayerName) headerPlayerName.textContent = playerName || 'Jugador';
  }

  function updateStatsBar() {
    if (statScore)   statScore.textContent   = sessionScore;
    if (statStreak)  statStreak.textContent  = sessionStreak;
    if (statRounds)  statRounds.textContent  = sessionRounds;
    if (statCorrect) statCorrect.textContent = sessionCorrect;
  }

  // ── CHANGE PLAYER ────────────────────────────────────────
  if (btnChangePlayer) {
    btnChangePlayer.addEventListener('click', () => {
      inputNombre.value = playerName;
      inputEmail.value  = playerEmail;
      showScreen('login');
      setTimeout(() => inputNombre.focus(), 300);
    });
    btnChangePlayer.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') btnChangePlayer.click();
    });
  }

  // ── SPIN BUTTON ──────────────────────────────────────────
  // ── SPIN BUTTON & ROULETTE LOCK ─────────────────────────
  function updateRouletteLockState() {
    if (!btnSpin) return;
    const isCompleted = hasPlayerCompleted(playerEmail);
    const titleBlock = document.querySelector('.roulette-title-block');
    let existNotice = document.getElementById('roulette-lock-notice');

    if (isCompleted) {
      btnSpin.disabled = true;
      btnSpin.innerHTML = '🔒 GIRO YA UTILIZADO';
      btnSpin.style.opacity = '0.6';
      btnSpin.style.animation = 'none';

      if (!existNotice && titleBlock) {
        const notice = document.createElement('div');
        notice.id = 'roulette-lock-notice';
        notice.style.cssText = 'background:rgba(255,208,0,0.1);border:1px solid var(--border-gold);color:var(--brand-gold);padding:12px 16px;border-radius:14px;font-size:13px;font-weight:700;margin-top:12px;text-align:center;line-height:1.4;';
        notice.innerHTML = `
          ⚠️ Ya completaste tu participación.<br>
          <button id="btn-new-player-notice" style="margin-top:8px;padding:8px 14px;border:none;border-radius:8px;background:var(--brand-cyan);color:#000;font-family:var(--font-display);font-weight:900;font-size:12px;text-transform:uppercase;cursor:pointer;">
            👤 Registrar Nuevo Participante
          </button>
        `;
        titleBlock.appendChild(notice);
        document.getElementById('btn-new-player-notice')?.addEventListener('click', logoutAndNewPlayer);
      }
    } else {
      btnSpin.disabled = false;
      btnSpin.innerHTML = '🎯 ¡GIRAR!';
      btnSpin.style.opacity = '1';
      if (existNotice) existNotice.remove();
    }
  }

  function logoutAndNewPlayer() {
    playerName  = '';
    playerEmail = '';
    localStorage.removeItem('vex_player_name');
    localStorage.removeItem('vex_player_email');
    if (inputNombre) inputNombre.value = '';
    if (inputEmail)  inputEmail.value = '';
    showScreen('login');
    setTimeout(() => inputNombre?.focus(), 300);
  }

  if (btnSpin) {
    btnSpin.addEventListener('click', () => {
      if (hasPlayerCompleted(playerEmail)) {
        alert('Ya realizaste tu giro. Registrá a otra persona para volver a jugar.');
        return;
      }
      if (!roulette.isSpinning) {
        btnSpin.disabled = true;
        roulette.spin();
      }
    });
  }

  // Tap canvas to spin
  if (spinCanvas) {
    spinCanvas.addEventListener('click', () => {
      if (!roulette.isSpinning) {
        btnSpin.disabled = true;
        roulette.spin();
      }
    });
  }

  // ── BOTTOM NAV ───────────────────────────────────────────
  document.getElementById('nav-ruleta')?.addEventListener('click', () => showScreen('roulette'));
  document.getElementById('nav-ranking')?.addEventListener('click', () => {
    renderStatsScreen();
    showScreen('stats');
  });
  document.getElementById('nav-ruleta-from-stats')?.addEventListener('click', () => showScreen('roulette'));
  document.getElementById('nav-ranking-from-stats')?.addEventListener('click', () => {
    renderStatsScreen();
    showScreen('stats');
  });
  if (btnBackFromStats) {
    btnBackFromStats.addEventListener('click', () => showScreen('roulette'));
  }

  // ── ROUND START ───────────────────────────────────────────
  function startRound(catInfo) {
    // Pick 5 random questions from this category
    const pool = QUESTIONS.filter(q => q.category === catInfo.id);
    let selected = [];

    if (pool.length >= 5) {
      selected = shuffle([...pool]).slice(0, 5);
    } else {
      // Fill with questions from other categories if not enough
      selected = shuffle([...pool]);
      const others = shuffle(QUESTIONS.filter(q => q.category !== catInfo.id));
      for (let i = 0; selected.length < 5 && i < others.length; i++) {
        selected.push(others[i]);
      }
    }

    activeRound = {
      category:     catInfo,
      questions:    selected,
      index:        0,
      correctCount: 0,
      times:        [],
      perQ:         []   // { correct: bool, time: number } per question
    };

    showScreen('questions');
    renderQuestion();
  }

  // ── QUESTION RENDERER ─────────────────────────────────────
  function renderQuestion() {
    if (!activeRound) return;
    clearTimeout(autoAdvTimer);
    clearInterval(timerInterval);

    const { category, questions, index } = activeRound;
    const q = questions[index];
    const qNum = index + 1;

    isAnswered = false;

    // Header
    qCategoryChip.className = `category-chip cat-${category.id}`;
    qCategoryChip.innerHTML = `${category.icon} ${category.name}`;
    qCurrent.textContent = qNum;

    // Progress bar
    const pct = ((qNum - 1) / 5) * 100;
    progressFill.style.width = `${pct}%`;
    document.querySelector('.progress-bar-wrap')?.setAttribute('aria-valuenow', qNum - 1);

    // Timer
    qTimer.textContent = '0.0s';
    qTimer.style.color = '';
    questionStartTime = performance.now();

    timerInterval = setInterval(() => {
      if (!isAnswered) {
        const elapsed = (performance.now() - questionStartTime) / 1000;
        qTimer.textContent = `${elapsed.toFixed(1)}s`;
        // Color timer red if over 10s
        if (elapsed > 10) qTimer.style.color = '#FF3B3B';
      }
    }, 100);

    // Question text
    qText.textContent = q.question;

    // Image
    qImageBlock.style.display = 'none';
    qImageBlock.innerHTML = '';
    if (q.imageSrc) {
      const img = document.createElement('img');
      img.src = q.imageSrc;
      img.alt = 'Señal de tránsito';
      img.loading = 'eager';
      qImageBlock.appendChild(img);
      qImageBlock.style.display = 'flex';
    } else if (q.imageSvg) {
      qImageBlock.innerHTML = q.imageSvg;
      qImageBlock.style.display = 'flex';
    }

    // Options
    qOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `Opción ${String.fromCharCode(65+idx)}: ${opt}`);
      btn.dataset.index = idx;

      const letter = document.createElement('span');
      letter.className = 'opt-letter';
      letter.textContent = String.fromCharCode(65 + idx);

      const text = document.createElement('span');
      text.className = 'opt-text';
      // Strip leading "A. " / "A) " prefix if present for cleaner display
      text.textContent = opt.replace(/^[A-Ca-c][.)]\s*/, '');

      btn.appendChild(letter);
      btn.appendChild(text);
      btn.addEventListener('click', () => handleAnswer(idx, q));
      qOptions.appendChild(btn);
    });

    // Hide feedback & next button
    qFeedback.classList.remove('show', 'correct-fb', 'wrong-fb');
    btnNext.classList.remove('show');
  }

  // ── ANSWER HANDLER ────────────────────────────────────────
  function handleAnswer(selectedIdx, q) {
    if (isAnswered) return;
    isAnswered = true;

    clearInterval(timerInterval);
    const finalTime = parseFloat(((performance.now() - questionStartTime) / 1000).toFixed(2));
    const isCorrect = selectedIdx === q.correctAnswer;

    activeRound.times.push(finalTime);
    activeRound.perQ.push({ correct: isCorrect, time: finalTime });

    // Update stats
    const pointsGained = isCorrect ? (100 + Math.max(0, Math.round((10 - finalTime) * 8))) : 0;

    // Log answer to history
    const timestamp = new Date().toLocaleString('es-AR');
    const responsePayload = {
      timestamp,
      name: playerName,
      email: playerEmail,
      category: activeRound.category.name,
      questionId: q.id,
      question: q.question,
      selectedAnswer: q.options[selectedIdx] || '',
      correctAnswer: q.options[q.correctAnswer] || '',
      isCorrect: isCorrect ? 'CORRECTO' : 'INCORRECTO',
      timeSeconds: finalTime,
      pointsGained
    };
    responsesHistory.push(responsePayload);
    localStorage.setItem('vex_responses_history', JSON.stringify(responsesHistory));

    // Send to local server log endpoint if available
    fetch('/api/log-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responsePayload)
    }).catch(() => {});

    if (isCorrect) {
      activeRound.correctCount++;
      sessionStreak++;
      sessionCorrect++;
      sessionScore += pointsGained;

      saveToLeaderboard(pointsGained, activeRound.category.name, finalTime);

      if (typeof audioSystem !== 'undefined') audioSystem.playCorrect();
    } else {
      sessionStreak = 0;
      if (typeof audioSystem !== 'undefined') audioSystem.playWrong();
    }

    updateStatsBar();

    // Style options
    const optBtns = qOptions.querySelectorAll('.option-btn');
    optBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
      } else {
        btn.classList.add('dimmed');
      }
    });

    // Feedback box
    qFeedback.classList.add('show');
    if (isCorrect) {
      qFeedback.classList.add('correct-fb');
      fbTitle.innerHTML = `✅ ¡Correcto!`;
    } else {
      qFeedback.classList.add('wrong-fb');
      fbTitle.innerHTML = `❌ Respuesta incorrecta`;
    }
    fbExplanation.textContent = q.explanation;
    fbTimeTag.textContent = `⏱ ${finalTime}s ${isCorrect ? `(+${100 + Math.max(0, Math.round((10-finalTime)*8))} pts)` : ''}`;

    // Next button label
    const nextNum = activeRound.index + 2;
    if (nextNum <= 5) {
      btnNextLabel.textContent = `Pregunta (${nextNum}/5)`;
    } else {
      btnNextLabel.textContent = 'Ver Resultados 🏆';
    }
    btnNext.classList.add('show');

    // Scroll into view so user sees feedback
    setTimeout(() => {
      qFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);

    // Auto-advance after 2.5s
    autoAdvTimer = setTimeout(() => advance(), 2600);
  }

  // ── ADVANCE ───────────────────────────────────────────────
  function advance() {
    clearTimeout(autoAdvTimer);
    if (!activeRound) return;

    activeRound.index++;
    if (activeRound.index < activeRound.questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  // Next button click
  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    advance();
  });

  // ── RESULTS SCREEN ────────────────────────────────────────
  function showResults() {
    if (!activeRound) return;

    sessionRounds++;
    updateStatsBar();

    // Mark current player as completed (1 spin per registered user)
    markPlayerCompleted(playerEmail);
    updateRouletteLockState();

    const { category, correctCount, times } = activeRound;
    const total = 5;
    const avgTime = times.length > 0
      ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)
      : '0.00';
    const pct = Math.round((correctCount / total) * 100);

    let emoji = '💪';
    let title = 'Seguí practicando';
    let titleColor = '#A8BCCF';
    if (pct === 100) { emoji = '🏆'; title = '¡Perfecto!';      titleColor = '#FFD000'; }
    else if (pct >= 80) { emoji = '🎉'; title = '¡Excelente!'; titleColor = '#00E58A'; }
    else if (pct >= 60) { emoji = '👍'; title = '¡Muy bien!';   titleColor = '#00D4F5'; }
    else if (pct >= 40) { emoji = '😅'; title = 'Buen intento'; titleColor = '#FFD000'; }

    if (pct >= 80 && typeof audioSystem !== 'undefined') audioSystem.playFanfare();
    if (pct === 100) launchConfetti();

    // Score ring colors
    const ringColor = pct === 100 ? '#FFD000' : pct >= 60 ? '#00E58A' : pct >= 40 ? '#00D4F5' : '#FF3B3B';
    const ringBg = '#192640';
    const circumference = 2 * Math.PI * 54;
    const dashArray = circumference;
    const dashOffset = circumference - (pct / 100) * circumference;

    // Build per-question breakdown rows
    const breakdownRows = activeRound.questions.map((q, i) => {
      const isQ_correct = (activeRound.correctCount > 0); // we'll need to store per-q results
      return '';
    }).join('');

    // Store per-question results in round (rebuild from what we have)
    // (we stored times[] and correctCount — build row from that)
    const qResults = activeRound.questions.map((q, i) => ({
      num: i + 1,
      time: times[i] !== undefined ? times[i] : null
    }));

    resultsWrapper.innerHTML = `
      <div class="results-hero">
        <span class="results-emoji">${emoji}</span>
        <h2 class="result-title" style="color:${titleColor}">${title}</h2>
        <p class="result-subtitle">${playerName}, completaste las 5 preguntas</p>
        <div class="result-category-chip cat-${category.id}">
          ${category.icon} ${category.name}
        </div>
      </div>

      <!-- Score Ring -->
      <div class="score-ring-wrap" aria-label="Puntuación ${correctCount} de 5">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54"
            fill="none"
            stroke="${ringBg}"
            stroke-width="14"/>
          <circle cx="70" cy="70" r="54"
            fill="none"
            stroke="${ringColor}"
            stroke-width="14"
            stroke-linecap="round"
            stroke-dasharray="${dashArray.toFixed(2)}"
            stroke-dashoffset="${dashOffset.toFixed(2)}"
            style="transition: stroke-dashoffset 1s ease;"/>
        </svg>
        <div class="score-ring-text">
          <span class="score-num" style="color:${ringColor}">${correctCount}</span>
          <span class="score-denom">de ${total}</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="sc-icon">✅</div>
          <div class="sc-label">Respuestas Correctas</div>
          <div class="sc-value" style="color:${ringColor}">${correctCount}/${total}</div>
        </div>
        <div class="stat-card">
          <div class="sc-icon">📊</div>
          <div class="sc-label">Precisión</div>
          <div class="sc-value" style="color:${titleColor}">${pct}%</div>
        </div>
        <div class="stat-card">
          <div class="sc-icon">⏱</div>
          <div class="sc-label">Tiempo Promedio</div>
          <div class="sc-value" style="color:#00D4F5">${avgTime}s</div>
        </div>
        <div class="stat-card">
          <div class="sc-icon">⭐</div>
          <div class="sc-label">Puntos Sesión</div>
          <div class="sc-value" style="color:#FFD000">${sessionScore}</div>
        </div>
      </div>

      <!-- Per-question breakdown -->
      <div class="question-breakdown">
        <div class="breakdown-header">Detalle por pregunta</div>
        ${activeRound.questions.map((q, i) => {
          const pq = activeRound.perQ[i];
          const icon = pq ? (pq.correct ? '✅' : '❌') : '—';
          const tStr = pq ? pq.time + 's' : '--';
          const shortQ = q.question.length > 52 ? q.question.substring(0, 52) + '…' : q.question;
          return `
            <div class="breakdown-item">
              <div class="breakdown-q-num">${i+1}</div>
              <div class="breakdown-result">${icon}</div>
              <div style="flex:1;font-size:12px;color:var(--text-secondary);line-height:1.3;">${shortQ}</div>
              <div class="breakdown-time" style="color:${pq&&pq.correct?'var(--brand-green)':'var(--brand-cyan)'}">${tStr}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="results-actions">
        <button class="btn-play-again" id="btn-see-ranking-results" style="background:linear-gradient(135deg,var(--brand-gold),#FFAA00);">
          🏆 Ver Ranking General
        </button>
        <button class="btn-secondary" id="btn-new-player-results" style="background:var(--bg-surface);border-color:var(--brand-cyan);color:var(--brand-cyan);font-weight:900;">
          👤 Registrar Nuevo Participante
        </button>
      </div>
    `;

    // Animate ring after render
    setTimeout(() => {
      const ringEl = resultsWrapper.querySelector('circle:last-child');
      if (ringEl) ringEl.style.strokeDashoffset = dashOffset;
    }, 100);

    document.getElementById('btn-see-ranking-results')?.addEventListener('click', () => {
      renderStatsScreen();
      showScreen('stats');
    });
    document.getElementById('btn-new-player-results')?.addEventListener('click', logoutAndNewPlayer);

    showScreen('results');
  }

  // ── LEADERBOARD ───────────────────────────────────────────
  function saveToLeaderboard(points, catName, time) {
    leaderboard.push({
      name:     playerName,
      email:    playerEmail,
      score:    points,
      category: catName,
      time:     time,
      date:     new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })
    });
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
    leaderboard = leaderboard.slice(0, 30);
    localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
  }

  // ── STATS SCREEN ──────────────────────────────────────────
  function renderStatsScreen() {
    if (!statsContent) return;

    const rankBadge = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;

    statsContent.innerHTML = `
      <!-- Current Player Card -->
      <div style="background:var(--bg-card);border:1px solid var(--border-gold);border-radius:16px;padding:16px;margin-bottom:20px;display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;background:var(--brand-gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">👤</div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);letter-spacing:1px;">Participante</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:20px;color:var(--brand-gold);">${playerName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${playerEmail}</div>
        </div>
        <button onclick="document.getElementById('input-nombre').value='';document.getElementById('input-email').value='';localStorage.removeItem('vex_player_name');localStorage.removeItem('vex_player_email');window.location.reload();"
          style="margin-left:auto;padding:8px 14px;border:1px solid rgba(255,59,59,0.4);border-radius:10px;background:rgba(255,59,59,0.08);color:#FF7070;font-size:11px;font-weight:700;cursor:pointer;">
          Cambiar
        </button>
      </div>

      <!-- Session Stats -->
      <p class="page-section-title">📊 Sesión Actual</p>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        <div class="stat-card"><div class="sc-label">Puntos Totales</div><div class="sc-value" style="color:var(--brand-gold)">${sessionScore}</div></div>
        <div class="stat-card"><div class="sc-label">Rondas Jugadas</div><div class="sc-value" style="color:var(--brand-cyan)">${sessionRounds}</div></div>
        <div class="stat-card"><div class="sc-label">Resp. Correctas</div><div class="sc-value" style="color:var(--brand-green)">${sessionCorrect}</div></div>
        <div class="stat-card"><div class="sc-label">Racha Máx.</div><div class="sc-value" style="color:#EC4899">${sessionStreak}</div></div>
      </div>

      <!-- Leaderboard -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p class="page-section-title" style="margin-bottom:0">🏆 Top 10 Participantes</p>
        <button id="btn-clear-ranking" style="font-size:11px;color:var(--text-muted);background:none;border:none;cursor:pointer;text-decoration:underline;">Reiniciar</button>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:16px;overflow:hidden;margin-bottom:24px;">
        ${leaderboard.length === 0 ? `
          <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">
            Aún no hay registros. ¡Jugá una ronda para aparecer aquí!
          </div>
        ` : `
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Participante</th>
                <th>Categoría</th>
                <th style="text-align:right">Pts</th>
                <th style="text-align:right">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              ${leaderboard.slice(0, 10).map((e, i) => {
                const isMe = e.name.toLowerCase() === playerName.toLowerCase();
                return `
                  <tr class="${isMe ? 'is-current' : ''}">
                    <td style="font-family:var(--font-display);font-weight:800;font-size:17px;color:${i===0?'#FFD000':i===1?'#C0C0C0':i===2?'#CD7F32':'var(--text-muted)'}">
                      ${rankBadge(i)}
                    </td>
                    <td style="font-weight:${isMe?'800':'500'};color:${isMe?'var(--brand-gold)':'var(--text-primary)'}">
                      ${e.name}${isMe?' <span style="font-size:9px;background:var(--brand-gold);color:#000;padding:2px 5px;border-radius:4px;font-weight:900;margin-left:4px;">TÚ</span>':''}
                    </td>
                    <td style="font-size:12px;color:var(--text-secondary)">${e.category}</td>
                    <td style="text-align:right;font-family:var(--font-display);font-weight:800;font-size:16px;color:var(--brand-gold)">${e.score}</td>
                    <td style="text-align:right;font-family:var(--font-display);font-weight:700;font-size:14px;color:var(--brand-cyan)">${e.time}s</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>

      <!-- Export to Excel / CSV Section -->
      <p class="page-section-title">📥 Reportes y Descargas Excel (CSV)</p>
      <div style="background:var(--bg-card);border:1px solid var(--border-gold);border-radius:16px;padding:16px;margin-bottom:24px;display:flex;flex-direction:column;gap:10px;">
        <p style="font-size:12px;color:var(--text-secondary);line-height:1.4;">
          Descargá todos los datos registrados (participantes y respuestas) formateados para abrir directamente en Microsoft Excel.
        </p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button id="btn-export-logins" style="padding:12px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--brand-gold),#FFAA00);color:#000;font-family:var(--font-display);font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
            📄 Descargar Ingresos de Personas (.csv)
          </button>
          <button id="btn-export-responses" style="padding:12px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--brand-cyan),#0099B8);color:#000;font-family:var(--font-display);font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
            📝 Descargar Detalle de Respuestas (.csv)
          </button>
        </div>
      </div>

      <p style="text-align:center;font-size:11px;color:var(--text-muted);line-height:1.6;">
        Gerencia de Educación y Convivencia Vial<br>
        Dirección General de Seguridad Vial
      </p>
    `;

    document.getElementById('btn-clear-ranking')?.addEventListener('click', () => {
      if (confirm('¿Reiniciar el ranking y borrar datos locales?')) {
        leaderboard = [];
        loginsHistory = [];
        responsesHistory = [];
        completedPlayers = [];
        localStorage.removeItem('vex_leaderboard');
        localStorage.removeItem('vex_logins_history');
        localStorage.removeItem('vex_responses_history');
        localStorage.removeItem('vex_completed_players');
        renderStatsScreen();
      }
    });

    document.getElementById('btn-export-logins')?.addEventListener('click', exportLoginsCSV);
    document.getElementById('btn-export-responses')?.addEventListener('click', exportResponsesCSV);
  }

  // ── CSV EXPORT HELPERS ──────────────────────────────────────
  function downloadCSV(filename, csvContent) {
    // Add UTF-8 BOM so Excel opens special characters and accents correctly
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportLoginsCSV() {
    if (loginsHistory.length === 0) {
      alert('Aún no hay registros de ingresos.');
      return;
    }
    let csv = '"Fecha y Hora";"Nombre";"Email"\r\n';
    loginsHistory.forEach(item => {
      csv += `"${item.timestamp}";"${item.name}";"${item.email}"\r\n`;
    });
    downloadCSV(`Registros_Ingresos_${new Date().toISOString().slice(0,10)}.csv`, csv);
  }

  function exportResponsesCSV() {
    if (responsesHistory.length === 0) {
      alert('Aún no hay respuestas registradas.');
      return;
    }
    let csv = '"Fecha y Hora";"Nombre";"Email";"Categoría";"Pregunta";"Respuesta Elegida";"Respuesta Correcta";"Resultado";"Tiempo (s)";"Puntos"\r\n';
    responsesHistory.forEach(item => {
      const qClean = (item.question || '').replace(/"/g, '""');
      const aClean = (item.selectedAnswer || '').replace(/"/g, '""');
      const cClean = (item.correctAnswer || '').replace(/"/g, '""');
      csv += `"${item.timestamp}";"${item.name}";"${item.email}";"${item.category}";"${qClean}";"${aClean}";"${cClean}";"${item.isCorrect}";"${item.timeSeconds}";"${item.pointsGained}"\r\n`;
    });
    downloadCSV(`Detalle_Respuestas_${new Date().toISOString().slice(0,10)}.csv`, csv);
  }

  // ── CONFETTI ──────────────────────────────────────────────
  function launchConfetti() {
    const colors = ['#FFD000', '#00E58A', '#00D4F5', '#FF3B3B', '#BE185D'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 40}vh;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        animation-delay: ${Math.random() * 0.6}s;
        animation-duration: ${0.8 + Math.random() * 0.8}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }
  }

  // ── UTILITY ───────────────────────────────────────────────
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

});
