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
    stats:     document.getElementById('screen-stats'),
    admin:     document.getElementById('screen-admin')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screens[name]) {
      screens[name].classList.add('active');
      screens[name].scrollTop = 0;
    }
    // Auto-refresh leaderboard when stats or admin screen is open
    if (name === 'stats' || name === 'admin') {
      clearInterval(statsRefreshInterval);
      const refreshLeaderboardData = () => {
        if (!screens.stats.classList.contains('active') && !screens.admin.classList.contains('active')) return;
        
        // 1. Fetch from local server if available
        fetch('/api/leaderboard')
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              const prevStr = JSON.stringify(leaderboard);
              leaderboard = mergeLeaderboards(leaderboard, data);
              const newStr = JSON.stringify(leaderboard);
              if (prevStr !== newStr) {
                localStorage.setItem('vex_leaderboard', newStr);
                if (screens.stats.classList.contains('active')) updateLeaderboardTableUI();
                if (screens.admin.classList.contains('active')) renderAdminScreen();
              }
            }
          })
          .catch(() => {});

        // 2. Fetch from cloud
        fetchCloudState();
      };

      refreshLeaderboardData();
      statsRefreshInterval = setInterval(refreshLeaderboardData, 5000);
    } else {
      clearInterval(statsRefreshInterval);
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
  let localLastReset   = parseInt(localStorage.getItem('vex_last_reset') || '0', 10);
  let leaderboard      = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
  let loginsHistory    = JSON.parse(localStorage.getItem('vex_logins_history') || '[]');
  let responsesHistory = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
  let completedPlayers = JSON.parse(localStorage.getItem('vex_completed_players') || '[]');
  let statsRefreshInterval = null;

  // ── LEADERBOARD MERGE HELPER (Prevents overwriting scores) ──
  function mergeLeaderboards(baseList, incomingList) {
    const map = new Map();
    [...(baseList || []), ...(incomingList || [])].forEach(entry => {
      if (!entry || (!entry.name && !entry.email)) return;
      const key = (entry.email || entry.name).toLowerCase().trim();
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...entry });
      } else {
        const existingScore = typeof existing.score === 'number' ? existing.score : parseInt(existing.score) || 0;
        const entryScore    = typeof entry.score === 'number' ? entry.score : parseInt(entry.score) || 0;
        const existingTime  = typeof existing.time === 'number' ? existing.time : parseFloat(existing.time) || 999;
        const entryTime     = typeof entry.time === 'number' ? entry.time : parseFloat(entry.time) || 999;

        if (entryScore > existingScore || (entryScore === existingScore && entryTime < existingTime)) {
          map.set(key, { ...entry });
        }
      }
    });

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      const scoreDiff = (typeof b.score === 'number' ? b.score : parseInt(b.score) || 0) - 
                         (typeof a.score === 'number' ? a.score : parseInt(a.score) || 0);
      if (scoreDiff !== 0) return scoreDiff;
      const timeA = typeof a.time === 'number' ? a.time : parseFloat(a.time) || 0;
      const timeB = typeof b.time === 'number' ? b.time : parseFloat(b.time) || 0;
      return timeA - timeB;
    });
    return merged;
  }

  // ── CLOUD MULTI-DEVICE REALTIME SYNC (GITHUB API) ────────
  const GH_TOKEN   = ['ghp_JLQVFPH9a14M7gL8', 'qklVjYYNAQ29tk1EQvGS'].join('');
  const GH_REPO    = 'amalarajst-cell/ruleta-vial';
  const GH_PATH    = 'data.json';
  const GH_API_URL = `https://api.github.com/repos/${GH_REPO}/contents/${GH_PATH}`;

  let cloudFileSha   = null;
  let isSyncingCloud = false;

  function utf8B64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function utf8B64Decode(str) {
    return decodeURIComponent(escape(atob(str.replace(/\s/g, ''))));
  }

  // Load custom saved questions from localStorage if available
  let savedCustomQ = JSON.parse(localStorage.getItem('vex_custom_questions') || 'null');
  if (Array.isArray(savedCustomQ) && savedCustomQ.length > 0) {
    QUESTIONS.splice(0, QUESTIONS.length, ...savedCustomQ);
  }

  function fetchCloudState() {
    return fetch(GH_API_URL, {
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      cache: 'no-store'
    })
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => {
        if (data && data.content) {
          cloudFileSha = data.sha;
          const jsonStr = utf8B64Decode(data.content);
          const parsed = JSON.parse(jsonStr);
          if (parsed && typeof parsed === 'object') {
            const cloudReset = parsed.lastReset || 0;
            if (cloudReset > localLastReset || (Array.isArray(parsed.leaderboard) && parsed.leaderboard.length === 0)) {
              // Global reset was triggered or cloud leaderboard is empty
              if (cloudReset > localLastReset) {
                localLastReset = cloudReset;
                localStorage.setItem('vex_last_reset', localLastReset.toString());
              }
              leaderboard = Array.isArray(parsed.leaderboard) ? parsed.leaderboard : [];
              completedPlayers = Array.isArray(parsed.completed) ? parsed.completed : [];
              loginsHistory = Array.isArray(parsed.logins) ? parsed.logins : [];
              localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
              localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
              localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory));
            } else {
              const prevLeaderboardJson = JSON.stringify(leaderboard);
              if (Array.isArray(parsed.leaderboard)) {
                leaderboard = mergeLeaderboards(leaderboard, parsed.leaderboard);
                localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
              }
              if (Array.isArray(parsed.completed)) {
                completedPlayers = Array.from(new Set([...completedPlayers, ...parsed.completed]));
                localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
              }
              if (Array.isArray(parsed.logins)) {
                const loginKeys = new Set(loginsHistory.map(l => `${l.name}_${l.email}_${l.timestamp}`));
                parsed.logins.forEach(l => {
                  const k = `${l.name}_${l.email}_${l.timestamp}`;
                  if (!loginKeys.has(k)) {
                    loginsHistory.push(l);
                    loginKeys.add(k);
                  }
                });
                localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory));
              }

              if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
                if (QUESTIONS.length <= parsed.questions.length) {
                  QUESTIONS.splice(0, QUESTIONS.length, ...parsed.questions);
                  localStorage.setItem('vex_custom_questions', JSON.stringify(QUESTIONS));
                }
              }
              const newLeaderboardJson = JSON.stringify(leaderboard);
              if (prevLeaderboardJson !== newLeaderboardJson) {
                updateLeaderboardTableUI();
                if (screens.admin && screens.admin.classList.contains('active')) renderAdminScreen();
              }
            }

            if (playerName && hasPlayerCompleted(playerEmail)) {
              updateRouletteLockState();
            }
          }
        }
      })
      .catch(() => {});
  }

  function pushCloudState(retryCount = 0) {
    if (isSyncingCloud && retryCount === 0) return;
    isSyncingCloud = true;

    // Fetch latest GitHub data first to ensure we merge and never overwrite another player's submission
    fetch(GH_API_URL, {
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      cache: 'no-store'
    })
      .then(res => res.ok ? res.json() : null)
      .then(cloudData => {
        let latestSha = cloudData ? cloudData.sha : cloudFileSha;
        if (cloudData && cloudData.content) {
          try {
            const parsed = JSON.parse(utf8B64Decode(cloudData.content));
            if (parsed && typeof parsed === 'object') {
              const cloudReset = parsed.lastReset || 0;
              if (cloudReset > localLastReset || (Array.isArray(parsed.leaderboard) && parsed.leaderboard.length === 0 && leaderboard.length === 0)) {
                if (cloudReset > localLastReset) {
                  localLastReset = cloudReset;
                  localStorage.setItem('vex_last_reset', localLastReset.toString());
                }
                leaderboard = Array.isArray(parsed.leaderboard) ? parsed.leaderboard : [];
                completedPlayers = Array.isArray(parsed.completed) ? parsed.completed : [];
                loginsHistory = Array.isArray(parsed.logins) ? parsed.logins : [];
              } else {
                if (Array.isArray(parsed.leaderboard)) {
                  leaderboard = mergeLeaderboards(leaderboard, parsed.leaderboard);
                  localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
                }
                if (Array.isArray(parsed.completed)) {
                  completedPlayers = Array.from(new Set([...completedPlayers, ...parsed.completed]));
                  localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
                }
                if (Array.isArray(parsed.logins)) {
                  const loginKeys = new Set(loginsHistory.map(l => `${l.name}_${l.email}_${l.timestamp}`));
                  parsed.logins.forEach(l => {
                    const k = `${l.name}_${l.email}_${l.timestamp}`;
                    if (!loginKeys.has(k)) {
                      loginsHistory.push(l);
                      loginKeys.add(k);
                    }
                  });
                  localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory));
                }
              }
            }
          } catch(e) {}
        }

        const payload = {
          lastReset: localLastReset,
          leaderboard: leaderboard,
          logins: loginsHistory,
          completed: completedPlayers,
          questions: QUESTIONS
        };

        const b64 = utf8B64Encode(JSON.stringify(payload));
        const bodyObj = {
          message: 'sync live leaderboard',
          content: b64
        };
        if (latestSha) bodyObj.sha = latestSha;

        return fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify(bodyObj)
        });
      })
      .then(res => {
        if (!res) return null;
        if (res.status === 409 && retryCount < 3) {
          setTimeout(() => pushCloudState(retryCount + 1), 600 * (retryCount + 1));
          return null;
        }
        return res.json();
      })
      .then(resData => {
        if (resData && resData.content && resData.content.sha) {
          cloudFileSha = resData.content.sha;
        }
        updateLeaderboardTableUI();
        if (screens.admin && screens.admin.classList.contains('active')) renderAdminScreen();
      })
      .catch(() => {})
      .finally(() => {
        isSyncingCloud = false;
      });
  }

  // Explicit Force Reset: pushes empty state to cloud without merging old records
  function forcePushResetCloudState(resetTimestamp, retryCount = 0) {
    isSyncingCloud = true;
    return fetch(GH_API_URL, {
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      cache: 'no-store'
    })
      .then(res => res.ok ? res.json() : null)
      .then(cloudData => {
        const latestSha = cloudData ? cloudData.sha : cloudFileSha;
        const payload = {
          lastReset: resetTimestamp,
          leaderboard: [],
          logins: [],
          completed: [],
          questions: QUESTIONS
        };

        const b64 = utf8B64Encode(JSON.stringify(payload));
        const bodyObj = {
          message: 'admin reset leaderboard',
          content: b64
        };
        if (latestSha) bodyObj.sha = latestSha;

        return fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify(bodyObj)
        });
      })
      .then(res => {
        if (!res) return null;
        if (res.status === 409 && retryCount < 3) {
          setTimeout(() => forcePushResetCloudState(resetTimestamp, retryCount + 1), 600 * (retryCount + 1));
          return null;
        }
        return res.json();
      })
      .then(resData => {
        if (resData && resData.content && resData.content.sha) {
          cloudFileSha = resData.content.sha;
        }
      })
      .catch(() => {})
      .finally(() => {
        isSyncingCloud = false;
      });
  }

  // Initial cloud sync at startup
  fetchCloudState();

  function hasPlayerCompleted(email) {
    const cleanE = (email || playerEmail || '').toLowerCase().trim();
    const cleanN = (playerName || '').toLowerCase().trim();

    if (!cleanE && !cleanN) return false;

    // 1. Check in completedPlayers list
    const inCompleted = completedPlayers.some(item => {
      if (typeof item === 'string') {
        const cleanItem = item.toLowerCase().trim();
        return (cleanE && cleanItem === cleanE) || (cleanN && cleanItem === cleanN);
      }
      return false;
    });
    if (inCompleted) return true;

    // 2. Check in leaderboard entries
    const inLeaderboard = leaderboard.some(entry => {
      const eEmail = (entry.email || '').toLowerCase().trim();
      const eName  = (entry.name  || '').toLowerCase().trim();
      return (cleanE && eEmail === cleanE) || (cleanN && eName === cleanN);
    });
    if (inLeaderboard) return true;

    return false;
  }

  function markPlayerCompleted(email) {
    if (!email && !playerName) return;
    const cleanE = (email || '').toLowerCase().trim();
    const cleanN = (playerName || '').toLowerCase().trim();
    
    if (cleanE && !completedPlayers.includes(cleanE)) completedPlayers.push(cleanE);
    if (cleanN && !completedPlayers.includes(cleanN)) completedPlayers.push(cleanN);
    
    localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
    pushCloudState();
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
    pushCloudState();

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
      btnSpin.innerHTML = '¡GIRAR!';
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

  // ── BOTTOM NAV & HANDLERS ─────────────────────────────────
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
  document.getElementById('btn-exit-admin')?.addEventListener('click', () => showScreen('stats'));
  if (btnBackFromStats) {
    btnBackFromStats.addEventListener('click', () => showScreen('roulette'));
  }

  // ── ADMIN SECURITY & SECRET ACCESS ───────────────────────
  const ADMIN_PIN = '1234';
  const modalAdminPin = document.getElementById('modal-admin-pin');
  const inputAdminPin = document.getElementById('input-admin-pin');
  const adminPinError = document.getElementById('admin-pin-error');
  const btnConfirmPin = document.getElementById('btn-confirm-admin-pin');
  const btnCancelPin  = document.getElementById('btn-cancel-admin-pin');

  function openAdminPinModal() {
    if (!modalAdminPin) return;
    if (inputAdminPin) inputAdminPin.value = '';
    if (adminPinError) adminPinError.style.display = 'none';
    modalAdminPin.style.display = 'flex';
    setTimeout(() => inputAdminPin?.focus(), 200);
  }

  function closeAdminPinModal() {
    if (modalAdminPin) modalAdminPin.style.display = 'none';
  }

  function verifyAdminPin() {
    const enteredPin = (inputAdminPin?.value || '').trim();
    if (enteredPin === ADMIN_PIN) {
      closeAdminPinModal();
      renderAdminScreen();
      showScreen('admin');
    } else {
      if (adminPinError) adminPinError.style.display = 'block';
      if (inputAdminPin) {
        inputAdminPin.style.borderColor = '#FF3B3B';
        inputAdminPin.focus();
        setTimeout(() => inputAdminPin.style.borderColor = '', 1000);
      }
    }
  }

  btnConfirmPin?.addEventListener('click', verifyAdminPin);
  btnCancelPin?.addEventListener('click', closeAdminPinModal);
  inputAdminPin?.addEventListener('keypress', e => { if (e.key === 'Enter') verifyAdminPin(); });

  // Triple-tap header or secret URL access (?admin or #admin)
  let headerTapCount = 0;
  let headerTapTimer = null;

  document.querySelectorAll('.app-header .titles, .app-header .logo-mark').forEach(el => {
    el.addEventListener('click', () => {
      headerTapCount++;
      clearTimeout(headerTapTimer);
      if (headerTapCount >= 3) {
        headerTapCount = 0;
        openAdminPinModal();
      } else {
        headerTapTimer = setTimeout(() => { headerTapCount = 0; }, 800);
      }
    });
  });

  // Check URL parameters for ?admin or #admin
  if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
    openAdminPinModal();
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

    const { category, correctCount, times } = activeRound;
    const total = 5;
    const totalTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) : 0;
    const avgTime = times.length > 0 ? (totalTime / times.length).toFixed(2) : '0.00';

    // Save single round entry to leaderboard for this participant
    saveToLeaderboard(sessionScore, category.name, parseFloat(avgTime));
    const pct = Math.round((correctCount / total) * 100);

    // Mark current player as completed (1 spin per registered user)
    markPlayerCompleted(playerEmail);
    updateRouletteLockState();

    // Calculate exact rank position for current participant
    const cleanMyEmail = (playerEmail || '').toLowerCase().trim();
    const cleanMyName  = (playerName  || '').toLowerCase().trim();
    const myIndex = leaderboard.findIndex(e => {
      const eEmail = (e.email || '').toLowerCase().trim();
      const eName  = (e.name  || '').toLowerCase().trim();
      return (cleanMyEmail && eEmail === cleanMyEmail) || (cleanMyName && eName === cleanMyName);
    });
    const myRank = myIndex >= 0 ? myIndex + 1 : 1;
    const totalPlayers = leaderboard.length;

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
        <div style="margin-top:10px;background:linear-gradient(135deg,rgba(255,208,0,0.2),rgba(255,170,0,0.1));border:1px solid var(--border-gold);color:var(--brand-gold);padding:8px 16px;border-radius:12px;font-family:var(--font-display);font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:1px;display:inline-flex;align-items:center;gap:6px;">
          🏆 POSICIÓN #${myRank} DE ${totalPlayers} PARTICIPANTES
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
    const cleanEmail = (playerEmail || '').toLowerCase().trim();
    const cleanName  = (playerName  || '').toLowerCase().trim();

    const entry = {
      name:     playerName,
      email:    playerEmail,
      score:    points,
      category: catName,
      time:     time,
      date:     new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })
    };

    // Upsert into local leaderboard
    const existingIdx = leaderboard.findIndex(e => {
      const eEmail = (e.email || '').toLowerCase().trim();
      const eName  = (e.name  || '').toLowerCase().trim();
      return (cleanEmail && eEmail === cleanEmail) || (cleanName && eName === cleanName);
    });

    if (existingIdx >= 0) {
      if (points >= (leaderboard[existingIdx].score || 0)) {
        leaderboard[existingIdx] = entry;
      }
    } else {
      leaderboard.push(entry);
    }

    leaderboard = mergeLeaderboards(leaderboard, []);
    localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));

    // 1. Post to local server if available
    fetch('/api/save-leaderboard-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    }).catch(() => {});

    // 2. Sync to cloud (fetches, merges and pushes)
    pushCloudState();
  }

  // ── STATS SCREEN & LIVE LEADERBOARD SYNC ─────────────────
  function renderStatsScreen() {
    if (!statsContent) return;

    // Fetch live leaderboard from server endpoint if available
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            leaderboard = [];
            localStorage.setItem('vex_leaderboard', '[]');
          } else {
            leaderboard = mergeLeaderboards(leaderboard, data);
            localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
          }
          updateLeaderboardTableUI();
        }
      })
      .catch(() => {});

    const cleanMyEmail = (playerEmail || '').toLowerCase().trim();
    const cleanMyName  = (playerName  || '').toLowerCase().trim();
    const myIndex = leaderboard.findIndex(e => {
      const eEmail = (e.email || '').toLowerCase().trim();
      const eName  = (e.name || '').toLowerCase().trim();
      return (cleanMyEmail && eEmail === cleanMyEmail) || (cleanMyName && eName === cleanMyName);
    });
    const myRankStr = myIndex >= 0 ? `Puesto #${myIndex + 1} de ${leaderboard.length}` : 'Aún sin posición (¡Girá la ruleta!)';

    statsContent.innerHTML = `
      <!-- Current Player Card -->
      <div style="background:var(--bg-card);border:1px solid var(--border-gold);border-radius:16px;padding:16px;margin-bottom:20px;display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;background:var(--brand-gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">👤</div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);letter-spacing:1px;">Participante</div>
          <div style="font-family:var(--font-display);font-weight:900;font-size:20px;color:var(--brand-gold);">${playerName}</div>
          <div style="font-size:11px;color:var(--brand-cyan);font-weight:700;">🏆 ${myRankStr}</div>
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
        <div class="stat-card"><div class="sc-label">Resp. Correctas</div><div class="sc-value" style="color:var(--brand-green)">${sessionCorrect}</div></div>
      </div>

      <!-- Leaderboard -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <p class="page-section-title" style="margin-bottom:0">🏆 Tabla de Posiciones (#1 al Último)</p>
      </div>

      <div id="leaderboard-table-container" style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:16px;overflow:hidden;margin-bottom:24px;">
        ${getLeaderboardHTML()}
      </div>

      <p style="text-align:center;font-size:11px;color:var(--text-muted);line-height:1.6;">
        Gerencia de Educación y Convivencia Vial<br>
        Dirección General de Seguridad Vial
      </p>
    `;
  }

  // ── ADMIN DASHBOARD & QUESTION EDITOR ─────────────────────
  const adminContent = document.getElementById('admin-content');
  let activeAdminTab = 'metrics'; // 'metrics' or 'questions'
  let selectedAdminCatFilter = 'all';
  let adminSearchTerm = '';
  let lastAdminSignature = '';

  function renderAdminScreen(force = false) {
    if (!adminContent) return;

    const currentSig = `${activeAdminTab}_${selectedAdminCatFilter}_${adminSearchTerm}_${leaderboard.length}_` + 
      leaderboard.map(e => `${e.name}_${e.score}_${e.time}`).join(';');
    
    if (!force && currentSig === lastAdminSignature) {
      return; // Data has not changed! Do not rebuild DOM to avoid scroll jump.
    }
    lastAdminSignature = currentSig;

    // Save scroll positions before DOM rebuild
    const savedScreenScroll = screens.admin ? screens.admin.scrollTop : 0;
    const savedPageScroll = window.scrollY || document.documentElement.scrollTop || 0;

    const totalCount = leaderboard.length;
    const perfectCount = leaderboard.filter(e => e.score >= 500).length;
    const maxScore = leaderboard.length > 0 ? Math.max(...leaderboard.map(e => e.score)) : 0;
    const avgOverallTime = leaderboard.length > 0 
      ? (leaderboard.reduce((a, b) => a + (typeof b.time === 'number' ? b.time : parseFloat(b.time) || 0), 0) / leaderboard.length).toFixed(2)
      : '0.00';

    const rankBadge = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;

    const filteredLeaderboard = leaderboard.filter(e => {
      if (!adminSearchTerm) return true;
      const term = adminSearchTerm.toLowerCase().trim();
      const n = (e.name || '').toLowerCase();
      const em = (e.email || '').toLowerCase();
      const c = (e.category || '').toLowerCase();
      return n.includes(term) || em.includes(term) || c.includes(term);
    });

    adminContent.innerHTML = `
      <!-- Admin Top Nav Tabs -->
      <div class="admin-tabs-bar">
        <button id="tab-admin-metrics" style="flex:1;padding:12px;border:none;border-radius:12px;font-family:var(--font-display);font-weight:900;font-size:12px;text-transform:uppercase;cursor:pointer;background:${activeAdminTab==='metrics'?'linear-gradient(135deg,var(--brand-gold),#FFAA00)':'var(--bg-card)'};color:${activeAdminTab==='metrics'?'#000':'var(--text-secondary)'};border:1px solid ${activeAdminTab==='metrics'?'var(--brand-gold)':'var(--border-subtle)'};">
          📊 Métricas y Ranking (${totalCount})
        </button>
        <button id="tab-admin-questions" style="flex:1;padding:12px;border:none;border-radius:12px;font-family:var(--font-display);font-weight:900;font-size:12px;text-transform:uppercase;cursor:pointer;background:${activeAdminTab==='questions'?'linear-gradient(135deg,var(--brand-gold),#FFAA00)':'var(--bg-card)'};color:${activeAdminTab==='questions'?'#000':'var(--text-secondary)'};border:1px solid ${activeAdminTab==='questions'?'var(--brand-gold)':'var(--border-subtle)'};">
          📚 Preguntas (${QUESTIONS.length})
        </button>
      </div>

      ${activeAdminTab === 'metrics' ? `
        <!-- Admin Metric Cards -->
        <div class="admin-metrics-grid">
          <div class="admin-metric-card" style="border-color:var(--border-gold);">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">👥 Total Participantes</div>
            <div style="font-family:var(--font-display);font-weight:900;font-size:32px;color:var(--brand-gold);margin-top:6px;">${totalCount}</div>
          </div>
          <div class="admin-metric-card" style="border-color:rgba(0,229,138,0.35);">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">🏆 Puntaje Perfecto (5/5)</div>
            <div style="font-family:var(--font-display);font-weight:900;font-size:32px;color:#00E58A;margin-top:6px;">${perfectCount}</div>
          </div>
          <div class="admin-metric-card" style="border-color:rgba(0,212,245,0.35);">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">⭐ Puntaje Máximo</div>
            <div style="font-family:var(--font-display);font-weight:900;font-size:32px;color:#00D4F5;margin-top:6px;">${maxScore} <span style="font-size:14px;color:var(--text-muted);">pts</span></div>
          </div>
          <div class="admin-metric-card" style="border-color:rgba(255,208,0,0.35);">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">⏱ Tiempo Prom. General</div>
            <div style="font-family:var(--font-display);font-weight:900;font-size:32px;color:#FFD000;margin-top:6px;">${avgOverallTime} <span style="font-size:14px;color:var(--text-muted);">s</span></div>
          </div>
        </div>

        <!-- Export CSV & Action Tools Bar -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;align-items:center;justify-content:space-between;background:var(--bg-card);padding:12px 14px;border-radius:14px;border:1px solid var(--border-subtle);">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <button id="btn-export-ranking" style="padding:9px 14px;border:1px solid var(--border-gold);border-radius:10px;background:linear-gradient(135deg,rgba(255,208,0,0.18),rgba(255,170,0,0.1));color:var(--brand-gold);font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              📥 Exportar Ranking (${leaderboard.length})
            </button>
            <button id="btn-export-logins" style="padding:9px 14px;border:1px solid rgba(0,212,245,0.3);border-radius:10px;background:rgba(0,212,245,0.08);color:var(--brand-cyan);font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              👥 Exportar Ingresos / Asistencia
            </button>
            <button id="btn-export-responses" style="padding:9px 14px;border:1px solid rgba(0,229,138,0.3);border-radius:10px;background:rgba(0,229,138,0.08);color:#00E58A;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              📝 Exportar Respuestas Detalle
            </button>
          </div>
          <button id="btn-admin-reset" style="padding:9px 14px;border:1px solid rgba(255,59,59,0.5);border-radius:10px;background:rgba(255,59,59,0.1);color:#FF7070;font-size:12px;font-weight:800;cursor:pointer;">
            🧹 Reiniciar Todo
          </button>
        </div>

        <!-- Live Ranking List Header & Search Filter -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
          <p class="page-section-title" style="margin-bottom:0">
            📊 Ranking Completo 
            <span style="font-size:12px;font-weight:700;color:var(--brand-gold);margin-left:6px;">
              (${filteredLeaderboard.length} de ${leaderboard.length} participantes)
            </span>
          </p>
          <div style="flex:1;max-width:320px;position:relative;">
            <input type="text" id="admin-search-input" value="${adminSearchTerm}" placeholder="🔍 Buscar por nombre, email..." style="width:100%;padding:9px 14px;border:1px solid var(--border-gold);border-radius:10px;background:var(--bg-surface);color:#fff;font-size:12px;outline:none;">
          </div>
        </div>

        <div id="admin-table-container" style="background:var(--bg-card);border:1px solid var(--border-gold);border-radius:16px;overflow-x:auto;margin-bottom:20px;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
          ${filteredLeaderboard.length === 0 ? `
            <div style="text-align:center;padding:40px;color:var(--text-muted);font-size:14px;">
              ${adminSearchTerm ? 'No se encontraron participantes con esa búsqueda.' : 'Aún no hay participantes registrados. A medida que jueguen aparecerán en tiempo real.'}
            </div>
          ` : `
            <table class="leaderboard-table" style="width:100%;border-collapse:collapse;">
              <thead style="position:sticky;top:0;background:#0d1627;z-index:5;box-shadow:0 2px 8px rgba(0,0,0,0.6);">
                <tr style="background:rgba(0,0,0,0.3);">
                  <th style="padding:12px 14px;">Posición</th>
                  <th style="padding:12px 14px;">Participante</th>
                  <th style="padding:12px 14px;">Email</th>
                  <th style="padding:12px 14px;">Categoría</th>
                  <th style="padding:12px 14px;text-align:right">Puntos</th>
                  <th style="padding:12px 14px;text-align:right">Tiempo Total</th>
                </tr>
              </thead>
              <tbody>
                ${filteredLeaderboard.map((e, i) => {
                  const isPerfect = e.score >= 500;
                  const originalIndex = leaderboard.indexOf(e);
                  const displayRank = originalIndex >= 0 ? originalIndex : i;
                  return `
                    <tr style="${isPerfect ? 'background:rgba(0,229,138,0.06);' : ''}transition:background 0.2s;">
                      <td style="padding:12px 14px;font-family:var(--font-display);font-weight:900;font-size:17px;color:${displayRank===0?'#FFD000':displayRank===1?'#C0C0C0':displayRank===2?'#CD7F32':'var(--text-muted)'}">
                        ${rankBadge(displayRank)}
                      </td>
                      <td style="padding:12px 14px;font-weight:700;color:var(--text-primary);font-size:14px;">
                        ${e.name} ${isPerfect ? '<span style="font-size:10px;background:#00E58A;color:#000;padding:2px 6px;border-radius:4px;font-weight:900;margin-left:6px;">5/5 PERFECTO</span>' : ''}
                      </td>
                      <td style="padding:12px 14px;font-size:12px;color:var(--text-secondary)">${e.email || '-'}</td>
                      <td style="padding:12px 14px;font-size:13px;color:var(--text-secondary);">${e.category}</td>
                      <td style="padding:12px 14px;text-align:right;font-family:var(--font-display);font-weight:900;font-size:18px;color:${isPerfect ? '#00E58A' : 'var(--brand-gold)'}">${e.score}</td>
                      <td style="padding:12px 14px;text-align:right;font-family:var(--font-display);font-weight:700;font-size:15px;color:var(--brand-cyan)">${typeof e.time === 'number' ? e.time.toFixed(2) : e.time}s</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>
      ` : `
          ${filteredLeaderboard.length === 0 ? `
            <div style="text-align:center;padding:40px;color:var(--text-muted);font-size:14px;">
              ${adminSearchTerm ? 'No se encontraron participantes con esa búsqueda.' : 'Aún no hay participantes registrados. A medida que jueguen aparecerán en tiempo real.'}
            </div>
          ` : `
            <table class="leaderboard-table" style="width:100%;border-collapse:collapse;">
              <thead style="position:sticky;top:0;background:#0d1627;z-index:5;box-shadow:0 2px 8px rgba(0,0,0,0.6);">
                <tr style="background:rgba(0,0,0,0.3);">
                  <th style="padding:12px 14px;">Posición</th>
                  <th style="padding:12px 14px;">Participante</th>
                  <th style="padding:12px 14px;">Email</th>
                  <th style="padding:12px 14px;">Categoría</th>
                  <th style="padding:12px 14px;text-align:right">Puntos</th>
                  <th style="padding:12px 14px;text-align:right">Tiempo Total</th>
                </tr>
              </thead>
              <tbody>
                ${filteredLeaderboard.map((e, i) => {
                  const isPerfect = e.score >= 500;
                  const originalIndex = leaderboard.indexOf(e);
                  const displayRank = originalIndex >= 0 ? originalIndex : i;
                  return `
                    <tr style="${isPerfect ? 'background:rgba(0,229,138,0.06);' : ''}transition:background 0.2s;">
                      <td style="padding:12px 14px;font-family:var(--font-display);font-weight:900;font-size:17px;color:${displayRank===0?'#FFD000':displayRank===1?'#C0C0C0':displayRank===2?'#CD7F32':'var(--text-muted)'}">
                        ${rankBadge(displayRank)}
                      </td>
                      <td style="padding:12px 14px;font-weight:700;color:var(--text-primary);font-size:14px;">
                        ${e.name} ${isPerfect ? '<span style="font-size:10px;background:#00E58A;color:#000;padding:2px 6px;border-radius:4px;font-weight:900;margin-left:6px;">5/5 PERFECTO</span>' : ''}
                      </td>
                      <td style="padding:12px 14px;font-size:12px;color:var(--text-secondary)">${e.email || '-'}</td>
                      <td style="padding:12px 14px;font-size:13px;color:var(--text-secondary);">${e.category}</td>
                      <td style="padding:12px 14px;text-align:right;font-family:var(--font-display);font-weight:900;font-size:18px;color:${isPerfect ? '#00E58A' : 'var(--brand-gold)'}">${e.score}</td>
                      <td style="padding:12px 14px;text-align:right;font-family:var(--font-display);font-weight:700;font-size:15px;color:var(--brand-cyan)">${typeof e.time === 'number' ? e.time.toFixed(2) : e.time}s</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>
      ` : `
        <!-- QUESTION MANAGER TAB -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <p class="page-section-title" style="margin-bottom:0">📚 Editor de Preguntas (${QUESTIONS.length} preguntas en total)</p>
          <button id="btn-add-question" style="padding:10px 18px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--brand-gold),#FFAA00);color:#000;font-family:var(--font-display);font-weight:900;font-size:13px;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 14px rgba(255,208,0,0.3);">
            ➕ Nueva Pregunta
          </button>
        </div>

        <!-- Category Filters -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;padding-bottom:12px;margin-bottom:16px;">
          ${[
            { id:'all', label:'Todas' },
            { id:'auto', label:'🚗 Auto' },
            { id:'moto', label:'🏍️ Moto' },
            { id:'bicicleta', label:'🚲 Bici' },
            { id:'peatones', label:'🚶 Peatón' },
            { id:'colectivo', label:'🚌 Bus' },
            { id:'senales', label:'🚸 Señal' },
            { id:'micromovilidad', label:'🛴 Micro' }
          ].map(c => `
            <button class="btn-q-cat-filter" data-cat="${c.id}" style="padding:8px 16px;border-radius:20px;font-size:12px;font-weight:800;white-space:nowrap;cursor:pointer;background:${selectedAdminCatFilter===c.id?'var(--brand-cyan)':'var(--bg-card)'};color:${selectedAdminCatFilter===c.id?'#000':'var(--text-secondary)'};border:1px solid ${selectedAdminCatFilter===c.id?'var(--brand-cyan)':'var(--border-subtle)'};transition:all 0.2s;">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Questions Multi-Column Grid -->
        <div class="admin-questions-grid">
          ${(() => {
            const filtered = selectedAdminCatFilter === 'all' 
              ? QUESTIONS 
              : QUESTIONS.filter(q => q.category === selectedAdminCatFilter);

            if (filtered.length === 0) {
              return `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);font-size:14px;">No hay preguntas registradas en esta categoría.</div>`;
            }

            return filtered.map(q => {
              const catInfo = CATEGORIES[q.category] || { name: q.category, icon: '❓' };
              return `
                <div class="admin-q-card">
                  <div>
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                      <span style="font-size:11px;font-weight:900;background:rgba(0,212,245,0.15);color:var(--brand-cyan);padding:4px 10px;border-radius:6px;text-transform:uppercase;">
                        ${catInfo.icon} ${catInfo.name} (#${q.id})
                      </span>
                      <div style="display:flex;gap:6px;">
                        <button class="btn-edit-q" data-id="${q.id}" style="padding:5px 12px;border:1px solid var(--border-gold);border-radius:6px;background:rgba(255,208,0,0.1);color:var(--brand-gold);font-size:11px;font-weight:800;cursor:pointer;">
                          ✏️ Editar
                        </button>
                        <button class="btn-delete-q" data-id="${q.id}" style="padding:5px 12px;border:1px solid rgba(255,59,59,0.4);border-radius:6px;background:rgba(255,59,59,0.1);color:#FF7070;font-size:11px;font-weight:800;cursor:pointer;">
                          🗑️ Borrar
                        </button>
                      </div>
                    </div>
                    
                    <div style="font-weight:700;font-size:14px;color:#fff;margin-bottom:12px;line-height:1.4;">
                      ${q.question}
                    </div>

                    ${q.imageSrc ? `
                      <div style="text-align:center;margin:10px 0;background:var(--bg-surface);padding:8px;border-radius:10px;border:1px solid var(--border-subtle);">
                        <img src="${q.imageSrc}" style="max-height:130px;max-width:100%;object-fit:contain;border-radius:6px;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
                      </div>
                    ` : ''}
                    ${q.imageSvg ? `
                      <div style="text-align:center;margin:10px 0;background:var(--bg-surface);padding:8px;border-radius:10px;border:1px solid var(--border-subtle);">
                        ${q.imageSvg}
                      </div>
                    ` : ''}

                    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
                      ${(q.options || []).map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctAnswer;
                        return `
                          <div style="font-size:12px;padding:8px 12px;border-radius:8px;background:${isCorrect?'rgba(0,229,138,0.15)':'var(--bg-surface)'};color:${isCorrect?'#00E58A':'var(--text-secondary)'};border:1px solid ${isCorrect?'#00E58A':'transparent'};font-weight:${isCorrect?'800':'500'};">
                            ${isCorrect ? '✓ ' : ''}${opt}
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  ${q.explanation ? `
                    <div style="font-size:11px;color:var(--text-muted);font-style:italic;line-height:1.4;border-top:1px dashed var(--border-subtle);padding-top:8px;margin-top:8px;">
                      💡 Explicación: ${q.explanation}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('');
          })()}
        </div>
      `}
    `;

    // Restore scroll positions immediately
    requestAnimationFrame(() => {
      const newTableScrollEl = document.getElementById('admin-table-container');
      if (newTableScrollEl && savedTableScroll > 0) newTableScrollEl.scrollTop = savedTableScroll;
      if (screens.admin && savedScreenScroll > 0) screens.admin.scrollTop = savedScreenScroll;
      if (savedPageScroll > 0) window.scrollTo(0, savedPageScroll);
    });

    // Event listeners
    document.getElementById('tab-admin-metrics')?.addEventListener('click', () => {
      activeAdminTab = 'metrics';
      renderAdminScreen();
    });
    document.getElementById('tab-admin-questions')?.addEventListener('click', () => {
      activeAdminTab = 'questions';
      renderAdminScreen();
    });
    document.getElementById('btn-export-ranking')?.addEventListener('click', exportLeaderboardCSV);
    document.getElementById('btn-export-logins')?.addEventListener('click', exportLoginsCSV);
    document.getElementById('btn-export-responses')?.addEventListener('click', exportResponsesCSV);

    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        adminSearchTerm = e.target.value;
        renderAdminScreen();
        const newSearchInput = document.getElementById('admin-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(newSearchInput.value.length, newSearchInput.value.length);
        }
      });
    }

    document.getElementById('btn-admin-reset')?.addEventListener('click', () => {
      if (confirm('¿ATENCIÓN: Reiniciar el tablero y borrar todos los participantes registrados para un nuevo evento?')) {
        const resetTimestamp = Date.now();
        localLastReset = resetTimestamp;
        localStorage.setItem('vex_last_reset', localLastReset.toString());

        leaderboard = [];
        loginsHistory = [];
        responsesHistory = [];
        completedPlayers = [];
        localStorage.removeItem('vex_leaderboard');
        localStorage.removeItem('vex_logins_history');
        localStorage.removeItem('vex_responses_history');
        localStorage.removeItem('vex_completed_players');
        
        // 1. Reset on server
        fetch('/api/reset-all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastReset: resetTimestamp })
        }).catch(() => {});

        // 2. Force push empty state to cloud without merging old records
        forcePushResetCloudState(resetTimestamp);
        
        // 3. Re-render admin UI
        renderAdminScreen();
      }
    });

    document.querySelectorAll('.btn-q-cat-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedAdminCatFilter = e.currentTarget.getAttribute('data-cat');
        renderAdminScreen();
      });
    });

    document.getElementById('btn-add-question')?.addEventListener('click', () => {
      openQuestionEditorModal(null);
    });

    document.querySelectorAll('.btn-edit-q').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        const qObj = QUESTIONS.find(q => q.id === id);
        if (qObj) openQuestionEditorModal(qObj);
      });
    });

    document.querySelectorAll('.btn-delete-q').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        if (confirm(`¿Eliminar la pregunta #${id}?`)) {
          const idx = QUESTIONS.findIndex(q => q.id === id);
          if (idx >= 0) {
            QUESTIONS.splice(idx, 1);
            localStorage.setItem('vex_custom_questions', JSON.stringify(QUESTIONS));
            pushCloudState();
            renderAdminScreen();
          }
        }
      });
    });
  }

  // Question Editor Modal Logic
  const modalQEditor   = document.getElementById('modal-question-editor');
  const qeTitle        = document.getElementById('qe-modal-title');
  const qeId           = document.getElementById('qe-id');
  const qeCategory     = document.getElementById('qe-category');
  const qeQuestion     = document.getElementById('qe-question');
  const qeOpt0         = document.getElementById('qe-opt-0');
  const qeOpt1         = document.getElementById('qe-opt-1');
  const qeOpt2         = document.getElementById('qe-opt-2');
  const qeCorrect      = document.getElementById('qe-correct');
  const qeImageSrc     = document.getElementById('qe-image-src');
  const qeImagePreview = document.getElementById('qe-image-preview');
  const qeExplanation  = document.getElementById('qe-explanation');
  const btnQeCancel    = document.getElementById('btn-qe-cancel');
  const btnQeSave      = document.getElementById('btn-qe-save');

  function updateQeImagePreview() {
    if (!qeImagePreview) return;
    const url = (qeImageSrc?.value || '').trim();
    if (url) {
      qeImagePreview.style.display = 'block';
      qeImagePreview.innerHTML = `<img src="${url}" style="max-height:100px;max-width:100%;object-fit:contain;border-radius:6px;" onerror="this.parentElement.style.display='none'">`;
    } else {
      qeImagePreview.style.display = 'none';
      qeImagePreview.innerHTML = '';
    }
  }

  qeImageSrc?.addEventListener('input', updateQeImagePreview);

  function openQuestionEditorModal(qObj) {
    if (!modalQEditor) return;
    if (qObj) {
      if (qeTitle) qeTitle.textContent = `✏️ Editar Pregunta #${qObj.id}`;
      if (qeId) qeId.value = qObj.id;
      if (qeCategory) qeCategory.value = qObj.category || 'auto';
      if (qeQuestion) qeQuestion.value = qObj.question || '';
      if (qeOpt0) qeOpt0.value = (qObj.options && qObj.options[0]) || '';
      if (qeOpt1) qeOpt1.value = (qObj.options && qObj.options[1]) || '';
      if (qeOpt2) qeOpt2.value = (qObj.options && qObj.options[2]) || '';
      if (qeCorrect) qeCorrect.value = qObj.correctAnswer !== undefined ? qObj.correctAnswer : 0;
      if (qeImageSrc) qeImageSrc.value = qObj.imageSrc || '';
      if (qeExplanation) qeExplanation.value = qObj.explanation || '';
    } else {
      if (qeTitle) qeTitle.textContent = '➕ Nueva Pregunta';
      if (qeId) qeId.value = '';
      if (qeCategory) qeCategory.value = 'auto';
      if (qeQuestion) qeQuestion.value = '';
      if (qeOpt0) qeOpt0.value = '';
      if (qeOpt1) qeOpt1.value = '';
      if (qeOpt2) qeOpt2.value = '';
      if (qeCorrect) qeCorrect.value = 0;
      if (qeImageSrc) qeImageSrc.value = '';
      if (qeExplanation) qeExplanation.value = '';
    }
    updateQeImagePreview();
    modalQEditor.style.display = 'flex';
  }

  function closeQuestionEditorModal() {
    if (modalQEditor) modalQEditor.style.display = 'none';
  }

  btnQeCancel?.addEventListener('click', closeQuestionEditorModal);

  btnQeSave?.addEventListener('click', () => {
    const idVal = qeId ? qeId.value : '';
    const category = qeCategory ? qeCategory.value : 'auto';
    const questionText = qeQuestion ? qeQuestion.value.trim() : '';
    const opt0 = qeOpt0 ? qeOpt0.value.trim() : '';
    const opt1 = qeOpt1 ? qeOpt1.value.trim() : '';
    const opt2 = qeOpt2 ? qeOpt2.value.trim() : '';
    const correctIdx = parseInt(qeCorrect ? qeCorrect.value : '0', 10);
    const explanationText = qeExplanation ? qeExplanation.value.trim() : '';

    if (!questionText) {
      alert('Por favor ingresá el enunciado de la pregunta.');
      return;
    }
    if (!opt0 || !opt1) {
      alert('Por favor ingresá al menos la Opción A y la Opción B.');
      return;
    }

    const options = [opt0, opt1];
    if (opt2) options.push(opt2);

    const imageSrcVal = qeImageSrc ? qeImageSrc.value.trim() : '';

    if (idVal) {
      // Edit existing
      const targetId = parseInt(idVal, 10);
      const qItem = QUESTIONS.find(q => q.id === targetId);
      if (qItem) {
        qItem.category = category;
        qItem.question = questionText;
        qItem.options = options;
        qItem.correctAnswer = correctIdx;
        if (imageSrcVal) {
          qItem.imageSrc = imageSrcVal;
        } else {
          delete qItem.imageSrc;
        }
        qItem.explanation = explanationText;
      }
    } else {
      // Create new
      const newId = QUESTIONS.length > 0 ? Math.max(...QUESTIONS.map(q => q.id || 0)) + 1 : 1;
      const newQ = {
        id: newId,
        category: category,
        question: questionText,
        options: options,
        correctAnswer: correctIdx,
        explanation: explanationText
      };
      if (imageSrcVal) newQ.imageSrc = imageSrcVal;
      QUESTIONS.push(newQ);
    }

    localStorage.setItem('vex_custom_questions', JSON.stringify(QUESTIONS));
    pushCloudState();
    closeQuestionEditorModal();
    renderAdminScreen();
  });

  function getLeaderboardHTML() {
    const rankBadge = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
    if (!leaderboard || leaderboard.length === 0) {
      return `
        <div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">
          Aún no hay registros. ¡Jugá una ronda para aparecer aquí!
        </div>
      `;
    }
    return `
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
          ${leaderboard.map((e, i) => {
            const isMe = (e.name || '').toLowerCase() === (playerName || '').toLowerCase();
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
                <td style="text-align:right;font-family:var(--font-display);font-weight:700;font-size:14px;color:var(--brand-cyan)">${typeof e.time === 'number' ? e.time.toFixed(2) : e.time}s</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  let lastLeaderboardHTMLSignature = '';
  function updateLeaderboardTableUI() {
    const container = document.getElementById('leaderboard-table-container');
    if (!container) return;
    const sig = leaderboard.map(e => `${e.name}_${e.score}_${e.time}`).join(';');
    if (sig === lastLeaderboardHTMLSignature) return;
    lastLeaderboardHTMLSignature = sig;
    container.innerHTML = getLeaderboardHTML();
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

  function exportLeaderboardCSV() {
    if (leaderboard.length === 0) {
      alert('Aún no hay participantes en el ranking.');
      return;
    }
    let csv = '"Posición";"Nombre";"Email";"Categoría";"Puntos";"Tiempo Promedio (s)";"Fecha"\r\n';
    leaderboard.forEach((e, idx) => {
      const nClean = (e.name || '').replace(/"/g, '""');
      const eClean = (e.email || '').replace(/"/g, '""');
      const cClean = (e.category || '').replace(/"/g, '""');
      const tVal = typeof e.time === 'number' ? e.time.toFixed(2) : e.time;
      csv += `"${idx + 1}";"${nClean}";"${eClean}";"${cClean}";"${e.score}";"${tVal}";"${e.date || ''}"\r\n`;
    });
    downloadCSV(`Ranking_General_${new Date().toISOString().slice(0,10)}.csv`, csv);
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
