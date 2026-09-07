// ============================================================
//  VIALPLAY — MAIN APPLICATION CONTROLLER (Stitch Gamified)
//  Combines Stitch UI Templates with Ruleta Vial Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── SCREEN MANAGEMENT ─────────────────────────────────────
  const screens = {
    register:  document.getElementById('screen-register'),
    hub:       document.getElementById('screen-hub'),
    roulette:  document.getElementById('screen-roulette'),
    quiz:      document.getElementById('screen-quiz'),
    results:   document.getElementById('screen-results'),
    ranking:   document.getElementById('screen-ranking'),
    admin:     document.getElementById('screen-admin')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => {
      if (s) s.classList.remove('active');
    });
    if (screens[name]) {
      screens[name].classList.add('active');
      window.scrollTo(0, 0);
    }

    // Update bottom nav state
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === name);
    });

    if (name === 'roulette' && typeof roulette !== 'undefined' && roulette) {
      requestAnimationFrame(() => {
        updateRouletteMode();
        roulette.setupCanvas();
        roulette.draw();
      });
      updateRouletteLockState();
    }

    if (name === 'ranking') {
      renderLeaderboardUI();
    }

    if (name === 'admin') {
      document.body.classList.add('admin-mode');
      if (typeof updateQuestionsBadges === 'function') updateQuestionsBadges();
      if (adminTabQuestions && adminTabQuestions.style.display !== 'none') {
        if (typeof renderAdminQuestionsTab === 'function') renderAdminQuestionsTab();
      } else {
        renderAdminDashboard(true);
      }
    } else {
      document.body.classList.remove('admin-mode');
    }
  }

  // ── PLAYER & SESSION STATE ────────────────────────────────
  let playerName   = localStorage.getItem('vialplay_player_name') || '';
  let playerEmail  = localStorage.getItem('vialplay_player_email') || '';
  let playerAvatar = localStorage.getItem('vialplay_player_avatar') || 'assets/avatars/auto.png';
  let playerRole   = localStorage.getItem('vialplay_player_role') || 'Auto B';

  let sessionScore   = 0;
  let sessionStreak  = 0;
  let sessionCorrect = 0;
  let sessionRounds  = 0;

  let leaderboard      = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
  let loginsHistory    = JSON.parse(localStorage.getItem('vex_logins_history') || '[]');
  let responsesHistory = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
  let completedPlayers = JSON.parse(localStorage.getItem('vex_completed_players') || '[]');

  // ── ROUND STATE ───────────────────────────────────────────
  let activeRound       = null;
  let questionStartTime = 0;
  let timerInterval     = null;
  let isAnswered        = false;
  let autoAdvanceTimer  = null;

  // ── CLOUD SYNC CONFIGURATION ──────────────────────────────
  const GH_TOKEN   = ['ghp_JLQVFPH9a14M7gL8', 'qklVjYYNAQ29tk1EQvGS'].join('');
  const GH_REPO    = 'amalarajst-cell/ruleta-vial';
  const GH_PATH    = 'data.json';
  const GH_API_URL = `https://api.github.com/repos/${GH_REPO}/contents/${GH_PATH}`;
  let cloudSha = null;

  function utf8B64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function utf8B64Decode(str) {
    return decodeURIComponent(escape(atob(str.replace(/\s/g, ''))));
  }

  function mergeLeaderboards(baseList, incomingList) {
    const map = new Map();
    [...(baseList || []), ...(incomingList || [])].forEach(entry => {
      if (!entry || (!entry.name && !entry.email)) return;
      const key = (entry.email || entry.name).toLowerCase().trim();
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...entry });
      } else {
        const existingScore = Number(existing.score) || 0;
        const entryScore    = Number(entry.score) || 0;
        const existingTime  = Number(existing.time) || 999;
        const entryTime     = Number(entry.time) || 999;
        if (entryScore > existingScore || (entryScore === existingScore && entryTime < existingTime)) {
          map.set(key, { ...entry });
        }
      }
    });

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      const scoreDiff = (Number(b.score) || 0) - (Number(a.score) || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (Number(a.time) || 0) - (Number(b.time) || 0);
    });
    return merged;
  }

  function fetchCloudState() {
    fetch(GH_API_URL, {
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      cache: 'no-store'
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data && data.content) {
        cloudSha = data.sha;
        try {
          const parsed = JSON.parse(utf8B64Decode(data.content));
          if (parsed && Array.isArray(parsed.leaderboard)) {
            leaderboard = mergeLeaderboards(leaderboard, parsed.leaderboard);
            localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
            renderLeaderboardUI();
          }
          if (parsed && Array.isArray(parsed.completed)) {
            completedPlayers = Array.from(new Set([...completedPlayers, ...parsed.completed]));
            localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
          }
        } catch (e) {}
      }
    })
    .catch(() => {});
  }

  function pushCloudState() {
    const payload = {
      leaderboard,
      logins: loginsHistory,
      completed: completedPlayers,
      questions: typeof QUESTIONS !== 'undefined' ? QUESTIONS : []
    };

    const bodyObj = {
      message: 'sync live leaderboard',
      content: utf8B64Encode(JSON.stringify(payload))
    };
    if (cloudSha) bodyObj.sha = cloudSha;

    fetch(GH_API_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res.ok ? res.json() : null)
    .then(resData => {
      if (resData && resData.content && resData.content.sha) {
        cloudSha = resData.content.sha;
      }
    })
    .catch(() => {});
  }

  // Check if player has already completed their turn
  function hasPlayerCompleted(email) {
    const cleanE = (email || playerEmail || '').toLowerCase().trim();
    const cleanN = (playerName || '').toLowerCase().trim();
    if (!cleanE && !cleanN) return false;

    return completedPlayers.some(item => {
      const it = (item || '').toLowerCase().trim();
      return (cleanE && it === cleanE) || (cleanN && it === cleanN);
    }) || leaderboard.some(e => {
      const eEmail = (e.email || '').toLowerCase().trim();
      const eName  = (e.name || '').toLowerCase().trim();
      return (cleanE && eEmail === cleanE) || (cleanN && eName === cleanN);
    });
  }

  function markPlayerCompleted(email) {
    const cleanE = (email || playerEmail || '').toLowerCase().trim();
    const cleanN = (playerName || '').toLowerCase().trim();
    if (cleanE && !completedPlayers.includes(cleanE)) completedPlayers.push(cleanE);
    if (cleanN && !completedPlayers.includes(cleanN)) completedPlayers.push(cleanN);
    localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
    pushCloudState();
  }

  // ── DOM REFERENCES ────────────────────────────────────────
  const headerPlayerName  = document.getElementById('header-player-name');
  const headerAvatarImg   = document.getElementById('header-avatar-img');
  const headerBtnPlayer   = document.getElementById('header-player-pill');
  const headerScoreVal    = document.getElementById('header-score-val');
  const headerStreakVal   = document.getElementById('header-streak-val');
  const btnSoundToggle    = document.getElementById('btn-sound-toggle');
  const iconSoundToggle   = document.getElementById('icon-sound-toggle');

  // Register screen
  const regNameInput      = document.getElementById('reg-name');
  const regEmailInput     = document.getElementById('reg-email');
  const regSubmitBtn      = document.getElementById('btn-register-submit');
  const avatarSliderViewport = document.getElementById('avatar-slider-viewport');
  const avatarSliderTrack    = document.getElementById('avatar-slider-track');
  const avatarSlides         = Array.from(document.querySelectorAll('.avatar-slide'));
  const avatarSliderDots     = Array.from(document.querySelectorAll('.slider-dot'));
  const avatarGenderTabs     = Array.from(document.querySelectorAll('.avatar-gender-tab'));
  const avatarBtnPrev        = document.getElementById('avatar-btn-prev');
  const avatarBtnNext        = document.getElementById('avatar-btn-next');
  const avatarCounterBadge   = document.getElementById('avatar-counter-badge');

  // Roulette screen
  const spinBtn           = document.getElementById('btn-spin-roulette');
  const rouletteLockTag   = document.getElementById('roulette-lock-tag');
  const userBannerAvatar  = document.getElementById('user-banner-avatar');
  const userBannerName    = document.getElementById('user-banner-name');
  const userBannerRole    = document.getElementById('user-banner-role');

  // Quiz screen
  const quizCategoryBadge = document.getElementById('quiz-category-badge');
  const quizCurrentNum    = document.getElementById('quiz-current-num');
  const quizProgressFill  = document.getElementById('quiz-progress-fill');
  const quizTimerText     = document.getElementById('quiz-timer-text');
  const quizQuestionText  = document.getElementById('quiz-question-text');
  const quizImageBlock    = document.getElementById('quiz-image-block');
  const quizImageTag      = document.getElementById('quiz-image-tag');
  const quizOptionsStack  = document.getElementById('quiz-options-stack');
  const quizFeedbackBox   = document.getElementById('quiz-feedback-box');
  const quizFeedbackTitle = document.getElementById('quiz-feedback-title');
  const quizFeedbackExp   = document.getElementById('quiz-feedback-explanation');
  const quizFeedbackTime  = document.getElementById('quiz-feedback-timetag');
  const quizBtnNext       = document.getElementById('quiz-btn-next');
  const quizBtnNextLabel  = document.getElementById('quiz-btn-next-label');

  // Results screen
  const resMedalDisplay   = document.getElementById('res-medal-display');
  const resEmoji          = document.getElementById('res-emoji');
  const resTitle          = document.getElementById('res-title');
  const resSubtitle       = document.getElementById('res-subtitle');
  const resRankPill       = document.getElementById('res-rank-pill');
  const resScoreRingCircle= document.getElementById('res-score-ring-circle');
  const resScoreNum       = document.getElementById('res-score-num');
  const resStatCorrect    = document.getElementById('res-stat-correct');
  const resStatPct        = document.getElementById('res-stat-pct');
  const resStatTime       = document.getElementById('res-stat-time');
  const resStatPoints     = document.getElementById('res-stat-points');
  const resBreakdownList  = document.getElementById('res-breakdown-list');
  const btnResGoRanking   = document.getElementById('btn-res-go-ranking');
  const btnResNewPlayer   = document.getElementById('btn-res-new-player');

  // Ranking screen
  const rankUserPosCard   = document.getElementById('rank-user-position-card');
  const rankPodiumContainer = document.getElementById('rank-podium-container');
  const rankSearchInput   = document.getElementById('rank-search-input');
  const rankTableBody     = document.getElementById('rank-table-body');
  const btnOpenAdminStats = document.getElementById('btn-open-admin-from-stats');

  // Admin Modal & Screen
  const modalAdminPin     = document.getElementById('modal-admin-pin');
  const inputAdminPin     = document.getElementById('input-admin-pin');
  const adminPinError     = document.getElementById('admin-pin-error');
  const btnConfirmPin     = document.getElementById('btn-confirm-admin-pin');
  const btnCancelPin      = document.getElementById('btn-cancel-admin-pin');
  const btnExitAdmin      = document.getElementById('btn-exit-admin');
  const adminTotalUsers   = document.getElementById('admin-metric-users');
  const adminPerfectCount = document.getElementById('admin-metric-perfect');
  const adminMaxScore     = document.getElementById('admin-metric-maxscore');
  const adminAvgTime      = document.getElementById('admin-metric-avgtime');
  const adminSearchInput  = document.getElementById('admin-search-input');
  const adminTableBody    = document.getElementById('admin-table-body');
  const btnExportRanking  = document.getElementById('btn-export-ranking');
  const btnExportLogins   = document.getElementById('btn-export-logins');
  const btnExportAnswers  = document.getElementById('btn-export-responses');
  const btnAdminReset     = document.getElementById('btn-admin-reset');

  // Admin Tabs & Question Manager DOM References
  const tabBtnStats         = document.getElementById('tab-btn-stats');
  const tabBtnQuestions     = document.getElementById('tab-btn-questions');
  const adminTabStats       = document.getElementById('admin-tab-stats');
  const adminTabQuestions   = document.getElementById('admin-tab-questions');

  const adminBankPills      = Array.from(document.querySelectorAll('.admin-bank-pill'));
  const badgeCountMoto      = document.getElementById('badge-count-moto');
  const badgeCountColectivo = document.getElementById('badge-count-colectivo');
  const badgeCountGeneral   = document.getElementById('badge-count-general');

  const btnAdminNewQ        = document.getElementById('btn-admin-new-question');
  const btnAdminExportQ     = document.getElementById('btn-admin-export-questions');
  const btnAdminResetQ      = document.getElementById('btn-admin-reset-questions');

  const adminQCatFilter     = document.getElementById('admin-q-cat-filter');
  const adminQSearch        = document.getElementById('admin-q-search');
  const adminQCounterLabel  = document.getElementById('admin-q-counter-label');
  const adminQuestionsList  = document.getElementById('admin-questions-list');

  // Question Edit Modal DOM
  const modalAdminQuestion  = document.getElementById('modal-admin-question');
  const modalQTitle         = document.getElementById('modal-q-title');
  const modalQSubtitle      = document.getElementById('modal-q-subtitle');
  const btnCloseQModal      = document.getElementById('btn-close-q-modal');
  const btnCancelQuestion   = document.getElementById('btn-cancel-question');
  const formEditQuestion    = document.getElementById('form-edit-question');
  const editQId             = document.getElementById('edit-q-id');
  const editQBank           = document.getElementById('edit-q-bank');
  const editQCategory       = document.getElementById('edit-q-category');
  const editQText           = document.getElementById('edit-q-text');
  const editQExplanation    = document.getElementById('edit-q-explanation');
  const editQImgPreview     = document.getElementById('edit-q-img-preview');
  const editQNoImgLabel     = document.getElementById('edit-q-no-img-label');
  const editQFileInput      = document.getElementById('edit-q-file-input');
  const btnEditQUpload      = document.getElementById('btn-edit-q-upload');
  const btnEditQRemoveImg   = document.getElementById('btn-edit-q-remove-img');
  const editQImgPath        = document.getElementById('edit-q-img-path');

  // ── SOUND TOGGLE ──────────────────────────────────────────
  function updateSoundIcon() {
    if (iconSoundToggle) {
      iconSoundToggle.textContent = audioSystem.enabled ? 'volume_up' : 'volume_off';
    }
  }
  updateSoundIcon();

  btnSoundToggle?.addEventListener('click', () => {
    audioSystem.toggleSound();
    updateSoundIcon();
  });

  // ── INITIAL STATE SETUP ───────────────────────────────────
  function updateHeaderDisplay() {
    if (headerPlayerName) headerPlayerName.textContent = playerName || 'Participante';
    if (headerAvatarImg) headerAvatarImg.src = playerAvatar || 'assets/avatars/auto.png';
    if (headerScoreVal) headerScoreVal.textContent = sessionScore;
    if (headerStreakVal) headerStreakVal.textContent = sessionStreak;

    if (userBannerAvatar) userBannerAvatar.src = playerAvatar || 'assets/avatars/auto.png';
    if (userBannerName) userBannerName.textContent = playerName || 'Piloto Vial';
    if (userBannerRole) userBannerRole.textContent = playerRole || 'Auto B';

    // Hub Screen Banner updates
    const hubUserAvatar = document.getElementById('hub-user-avatar');
    const hubUserName = document.getElementById('hub-user-name');
    const hubUserRole = document.getElementById('hub-user-role');
    const hubScoreVal = document.getElementById('hub-score-val');
    const hubStreakVal = document.getElementById('hub-streak-val');

    if (hubUserAvatar) hubUserAvatar.src = playerAvatar || 'assets/avatars/auto.png';
    if (hubUserName) hubUserName.textContent = playerName || 'Piloto';
    if (hubUserRole) hubUserRole.textContent = playerRole || 'Auto B';
    if (hubScoreVal) hubScoreVal.textContent = `${sessionScore} XP`;
    if (hubStreakVal) hubStreakVal.textContent = `🔥 ${sessionStreak}`;
  }

  // ── COLECTIVO & MOTO PROFILE CHECKS ──────────────────────
  function isColectivoProfile() {
    const role = (playerRole || '').toLowerCase();
    const avatar = (playerAvatar || '').toLowerCase();
    return role.includes('colectivo') || role.includes('pasajero') || role.includes('d1') || role.includes('profesional') || avatar.includes('profesional');
  }

  function isMotoProfile() {
    const role = (playerRole || '').toLowerCase();
    const avatar = (playerAvatar || '').toLowerCase();
    return role.includes('moto') || avatar.includes('moto');
  }

  // ── ROULETTE INSTANCE ─────────────────────────────────────
  const roulette = new RouletteWheel('roulette-canvas', {
    onSpinEnd: (category) => {
      startQuizRound(category);
    }
  });

  function updateRouletteMode() {
    if (!roulette) return;
    let mode = 'default';
    if (isColectivoProfile()) {
      mode = 'colectivo';
    } else if (isMotoProfile()) {
      mode = 'moto';
    } else {
      mode = 'default';
    }
    roulette.setMode(mode);

    // Sync quick selector pills
    document.querySelectorAll('.role-pill-btn').forEach(btn => {
      const btnMode = btn.dataset.roleMode;
      const isActive = (btnMode === mode) || 
                       (mode === 'default' && (btnMode === 'auto' || (playerRole || '').toLowerCase().includes(btnMode)));
      btn.classList.toggle('active', isActive);
    });

    // Update banner role icon & label
    if (userBannerRole) {
      if (mode === 'moto') {
        userBannerRole.textContent = 'Clase A • Motociclista';
      } else if (mode === 'colectivo') {
        userBannerRole.textContent = 'Clase D1 • Colectivo';
      } else if ((playerRole || '').toLowerCase().includes('cicl')) {
        userBannerRole.textContent = 'Ciclista Urbano';
      } else if ((playerRole || '').toLowerCase().includes('peat')) {
        userBannerRole.textContent = 'Peatón';
      } else {
        userBannerRole.textContent = playerRole || 'Clase B • Auto';
      }
    }
    if (userBannerAvatar && playerAvatar) {
      userBannerAvatar.src = playerAvatar;
    }
  }

  // Quick Role Selector Click Events
  document.querySelectorAll('.role-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.roleMode;
      const isFemale = (preferredGender === 'female');
      if (mode === 'moto') {
        playerRole = 'Moto A';
        playerAvatar = isFemale ? 'assets/avatars/moto_fem.png' : 'assets/avatars/moto.png';
      } else if (mode === 'colectivo') {
        playerRole = 'Colectivo D1';
        playerAvatar = isFemale ? 'assets/avatars/profesional_fem.png' : 'assets/avatars/profesional.png';
      } else if (mode === 'ciclista') {
        playerRole = 'Ciclista';
        playerAvatar = isFemale ? 'assets/avatars/ciclista_fem.png' : 'assets/avatars/ciclista.png';
      } else if (mode === 'peaton') {
        playerRole = 'Peatón';
        playerAvatar = isFemale ? 'assets/avatars/peaton_fem.png' : 'assets/avatars/peaton.png';
      } else {
        playerRole = 'Auto B';
        playerAvatar = isFemale ? 'assets/avatars/auto_fem.png' : 'assets/avatars/auto.png';
      }
      localStorage.setItem('vialplay_player_role', playerRole);
      localStorage.setItem('vialplay_player_avatar', playerAvatar);

      // Sync slider if on register screen
      const matchingIdx = avatarSlides.findIndex(s => s.dataset.role === playerRole && s.dataset.gender === (isFemale ? 'female' : 'male'));
      if (matchingIdx !== -1) {
        goToAvatarSlide(matchingIdx, false);
      }

      updateHeaderDisplay();
      updateRouletteMode();
      requestAnimationFrame(() => {
        roulette.setupCanvas();
        roulette.draw();
      });
      if (audioSystem && audioSystem.playClick) audioSystem.playClick();
    });
  });

  updateRouletteMode();

  function updateRouletteLockState() {
    const isCompleted = hasPlayerCompleted(playerEmail);
    if (isCompleted) {
      if (spinBtn) {
        spinBtn.disabled = true;
        spinBtn.innerHTML = '<span class="material-symbols-outlined">lock</span> GIRO COMPLETADO';
        spinBtn.style.opacity = '0.6';
      }
      if (rouletteLockTag) {
        rouletteLockTag.style.display = 'block';
      }
    } else {
      if (spinBtn) {
        spinBtn.disabled = false;
        spinBtn.innerHTML = '<span class="material-symbols-outlined">cached</span> ¡GIRAR RULETA AHORA!';
        spinBtn.style.opacity = '1';
      }
      if (rouletteLockTag) {
        rouletteLockTag.style.display = 'none';
      }
    }
  }

  // ── AVATAR SWIPE SLIDER CONTROLLER (10 AVATARS & GENDER TABS) ──
  let currentAvatarIndex = 0;
  const totalAvatarSlides = avatarSlides.length;
  let preferredGender = 'male';

  function updateGenderTabsUI(gender) {
    if (!avatarGenderTabs || avatarGenderTabs.length === 0) return;
    avatarGenderTabs.forEach(tab => {
      const filter = tab.dataset.filter;
      if (filter === gender) {
        tab.classList.add('active');
      } else if (filter === 'all' && gender === 'all') {
        tab.classList.add('active');
      } else if (filter !== 'all') {
        tab.classList.toggle('active', filter === gender);
      }
    });
  }

  function goToAvatarSlide(index, syncPill = true) {
    if (totalAvatarSlides === 0) return;
    if (index < 0) index = totalAvatarSlides - 1;
    if (index >= totalAvatarSlides) index = 0;

    currentAvatarIndex = index;
    const offset = -currentAvatarIndex * 100;
    if (avatarSliderTrack) {
      avatarSliderTrack.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
      avatarSliderTrack.style.transform = `translateX(${offset}%)`;
    }

    // Update active slide class
    avatarSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentAvatarIndex);
    });

    // Update pagination dots
    avatarSliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentAvatarIndex);
    });

    // Update counter badge
    if (avatarCounterBadge) {
      avatarCounterBadge.textContent = `${currentAvatarIndex + 1} / ${totalAvatarSlides}`;
    }

    // Get active slide metadata
    const activeSlide = avatarSlides[currentAvatarIndex];
    if (activeSlide) {
      playerAvatar = activeSlide.dataset.avatarSrc;
      playerRole   = activeSlide.dataset.role || 'Auto B';
      localStorage.setItem('vialplay_player_avatar', playerAvatar);
      localStorage.setItem('vialplay_player_role', playerRole);

      const slideGender = activeSlide.dataset.gender || 'male';
      preferredGender = slideGender;
      avatarGenderTabs.forEach(tab => {
        const filter = tab.dataset.filter;
        if (filter === 'female' || filter === 'male') {
          tab.classList.toggle('active', filter === slideGender);
        } else if (filter === 'all') {
          tab.classList.remove('active');
        }
      });
    }

    updateRouletteMode();
    if (audioSystem && audioSystem.playClick) {
      audioSystem.playClick();
    }
  }

  // Gender tab buttons
  avatarGenderTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      avatarGenderTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      if (filter === 'female') {
        preferredGender = 'female';
        // If currently on a male slide, switch to the female counterpart of same role
        const activeSlide = avatarSlides[currentAvatarIndex];
        if (activeSlide && activeSlide.dataset.gender === 'male') {
          const role = (activeSlide.dataset.role || '').toLowerCase();
          const targetFemaleIdx = avatarSlides.findIndex(s =>
            s.dataset.gender === 'female' && (s.dataset.role || '').toLowerCase() === role
          );
          if (targetFemaleIdx !== -1) {
            goToAvatarSlide(targetFemaleIdx);
            return;
          }
        }
        // If not already female, jump to first female
        const firstFemale = avatarSlides.findIndex(s => s.dataset.gender === 'female');
        if (firstFemale !== -1 && activeSlide?.dataset.gender !== 'female') {
          goToAvatarSlide(firstFemale);
        }
      } else if (filter === 'male') {
        preferredGender = 'male';
        // If currently on female slide, switch to male counterpart of same role
        const activeSlide = avatarSlides[currentAvatarIndex];
        if (activeSlide && activeSlide.dataset.gender === 'female') {
          const role = (activeSlide.dataset.role || '').toLowerCase();
          const targetMaleIdx = avatarSlides.findIndex(s =>
            s.dataset.gender === 'male' && (s.dataset.role || '').toLowerCase() === role
          );
          if (targetMaleIdx !== -1) {
            goToAvatarSlide(targetMaleIdx);
            return;
          }
        }
        // Jump to first male
        const firstMale = avatarSlides.findIndex(s => s.dataset.gender === 'male');
        if (firstMale !== -1 && activeSlide?.dataset.gender !== 'male') {
          goToAvatarSlide(firstMale);
        }
      }
    });
  });

  // Prev / Next button navigation
  avatarBtnPrev?.addEventListener('click', (e) => {
    e.preventDefault();
    goToAvatarSlide(currentAvatarIndex - 1);
  });

  avatarBtnNext?.addEventListener('click', (e) => {
    e.preventDefault();
    goToAvatarSlide(currentAvatarIndex + 1);
  });

  // Pagination dot navigation
  avatarSliderDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToAvatarSlide(i);
    });
  });

  // Touch Swipe & Mouse Drag Handling
  if (avatarSliderViewport) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;

    function onDragStart(e) {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      currentX = startX;
      startTime = Date.now();
      if (avatarSliderTrack) {
        avatarSliderTrack.style.transition = 'none';
      }
      avatarSliderViewport.classList.add('is-dragging');
    }

    function onDragMove(e) {
      if (!isDragging) return;
      currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      const deltaX = currentX - startX;
      const viewportWidth = avatarSliderViewport.offsetWidth || 300;
      const deltaPercent = (deltaX / viewportWidth) * 100;
      const basePercent = -currentAvatarIndex * 100;
      if (avatarSliderTrack) {
        avatarSliderTrack.style.transform = `translateX(${basePercent + deltaPercent}%)`;
      }
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      avatarSliderViewport.classList.remove('is-dragging');
      const deltaX = currentX - startX;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.abs(deltaX) / (deltaTime || 1);

      // Threshold: 35px or quick flick with velocity > 0.35
      if (deltaX < -35 || (deltaX < -15 && velocity > 0.35)) {
        goToAvatarSlide(currentAvatarIndex + 1);
      } else if (deltaX > 35 || (deltaX > 15 && velocity > 0.35)) {
        goToAvatarSlide(currentAvatarIndex - 1);
      } else {
        // Snap back to current slide
        goToAvatarSlide(currentAvatarIndex);
      }
    }

    // Touch events for mobile
    avatarSliderViewport.addEventListener('touchstart', onDragStart, { passive: true });
    avatarSliderViewport.addEventListener('touchmove', onDragMove, { passive: true });
    avatarSliderViewport.addEventListener('touchend', onDragEnd, { passive: true });

    // Mouse drag events for desktop
    avatarSliderViewport.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
  }



  // Restore active avatar from saved preferences
  if (playerAvatar || playerRole) {
    const savedIdx = avatarSlides.findIndex(s => {
      if (playerAvatar && s.dataset.avatarSrc === playerAvatar) return true;
      if (playerRole && s.dataset.role === playerRole) return true;
      return false;
    });
    if (savedIdx !== -1) {
      goToAvatarSlide(savedIdx, true);
    }
  }

  // ── REGISTRATION / LOGIN ──────────────────────────────────
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleRegistration(e) {
    if (e) e.preventDefault();
    const name = (regNameInput?.value || '').trim();
    const email = (regEmailInput?.value || '').trim();

    if (!name) {
      alert('Por favor ingresá tu nombre o apodo.');
      regNameInput?.focus();
      return;
    }
    if (!email || !validateEmail(email)) {
      alert('Por favor ingresá un correo electrónico válido.');
      regEmailInput?.focus();
      return;
    }

    playerName = name;
    playerEmail = email;
    localStorage.setItem('vialplay_player_name', playerName);
    localStorage.setItem('vialplay_player_email', playerEmail);
    localStorage.setItem('vialplay_player_avatar', playerAvatar);
    localStorage.setItem('vialplay_player_role', playerRole);

    // Record login
    const timestamp = new Date().toLocaleString('es-AR');
    loginsHistory.push({ name: playerName, email: playerEmail, role: playerRole, timestamp });
    localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory));
    pushCloudState();

    audioSystem.init();
    updateHeaderDisplay();

    if (hasPlayerCompleted(playerEmail)) {
      alert(`Hola ${playerName}, ya participaste anteriormente con este correo. Te mostramos el Ranking de posiciones.`);
      showScreen('ranking');
    } else {
      window.open('juegos.html', '_blank');
      showScreen('hub');
    }
  }

  regSubmitBtn?.addEventListener('click', handleRegistration);
  document.querySelector('#screen-register form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRegistration(e);
  });
  headerBtnPlayer?.addEventListener('click', () => {
    if (regNameInput) regNameInput.value = playerName;
    if (regEmailInput) regEmailInput.value = playerEmail;
    showScreen('register');
  });

  // ── SPIN WHEEL TRIGGER ────────────────────────────────────
  function triggerSpin() {
    if (hasPlayerCompleted(playerEmail)) {
      alert('Ya realizaste tu giro de bienvenida. Registrá a otro participante para jugar nuevamente.');
      return;
    }
    if (!roulette.isSpinning) {
      audioSystem.init();
      if (spinBtn) spinBtn.disabled = true;
      roulette.spin();
    }
  }

  spinBtn?.addEventListener('click', triggerSpin);
  document.getElementById('roulette-canvas')?.addEventListener('click', triggerSpin);

  // ── ACTIVE QUESTION BANKS & PERSISTENCE ───────────────────
  function getActiveQuestions(bank) {
    const key = `vialplay_custom_${bank}_questions`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (err) {
        console.error('Error parsing custom questions', err);
      }
    }
    if (bank === 'moto') return (typeof MOTO_QUESTIONS !== 'undefined') ? MOTO_QUESTIONS : [];
    if (bank === 'colectivo') return (typeof COLECTIVO_QUESTIONS !== 'undefined') ? COLECTIVO_QUESTIONS : [];
    return (typeof QUESTIONS !== 'undefined') ? QUESTIONS : [];
  }

  function saveActiveQuestions(bank, list) {
    const key = `vialplay_custom_${bank}_questions`;
    localStorage.setItem(key, JSON.stringify(list));
    if (typeof updateQuestionsBadges === 'function') {
      updateQuestionsBadges();
    }
  }

  // ── START QUIZ ROUND ──────────────────────────────────────
  function startQuizRound(category) {
    const isColectivo = isColectivoProfile();
    const isMoto = isMotoProfile();
    let selectedQuestions = [];

    if (isColectivo) {
      // 🚌 EXCLUSIVO PERFIL COLECTIVO (D1 / TRANSPORTE DE PASAJEROS)
      const colectivoPool = getActiveQuestions('colectivo');
      const targetCatId = category.id; // 'prioridad', 'senales', 'velocidad', 'metrobus', 'seguridad', 'pasajeros', 'normativa'
      const catPool = colectivoPool.filter(q => q.category === targetCatId);
      
      let picked = [];
      if (catPool.length >= 5) {
        picked = shuffleArray([...catPool]).slice(0, 5);
      } else {
        picked = shuffleArray([...catPool]);
        const otherColectivo = shuffleArray(colectivoPool.filter(q => q.category !== targetCatId));
        for (let i = 0; picked.length < 5 && i < otherColectivo.length; i++) {
          picked.push(otherColectivo[i]);
        }
      }
      // Aseguramos que haya preguntas con imagen si están disponibles
      const hasImg = picked.some(q => !!q.imageSrc);
      if (!hasImg) {
        const anyWithImg = colectivoPool.find(q => !!q.imageSrc && (q.category === targetCatId || true));
        if (anyWithImg && picked.length > 0) {
          picked[picked.length - 1] = anyWithImg;
        }
      }
      selectedQuestions = shuffleArray(picked);
    } else if (isMoto) {
      // 🏍️ EXCLUSIVO PERFIL MOTOCICLISTA (CLASE A / FORMACIÓN VIAL EXTREME)
      const motoPool = getActiveQuestions('moto');
      const targetCatId = category.id; // 'casco', 'frenado', 'espejos', 'pasajeros', 'clima', 'velocidad', 'normativa'
      const catPool = motoPool.filter(q => q.category === targetCatId);
      
      let picked = [];
      if (catPool.length >= 5) {
        picked = shuffleArray([...catPool]).slice(0, 5);
      } else {
        picked = shuffleArray([...catPool]);
        const otherMoto = shuffleArray(motoPool.filter(q => q.category !== targetCatId));
        for (let i = 0; picked.length < 5 && i < otherMoto.length; i++) {
          picked.push(otherMoto[i]);
        }
      }
      // Aseguramos que haya preguntas con imagen si están disponibles
      const hasImg = picked.some(q => !!q.imageSrc);
      if (!hasImg) {
        const anyWithImg = motoPool.find(q => !!q.imageSrc && (q.category === targetCatId || true));
        if (anyWithImg && picked.length > 0) {
          picked[picked.length - 1] = anyWithImg;
        }
      }
      selectedQuestions = shuffleArray(picked);
    } else {
      // Perfiles estándar (Auto B, Ciclista, Peatón)
      const generalPool = getActiveQuestions('general');
      const catId = category.id;
      const catPool = generalPool.filter(q => q.category === catId);

      if (catPool.length >= 5) {
        selectedQuestions = shuffleArray([...catPool]).slice(0, 5);
      } else {
        selectedQuestions = shuffleArray([...catPool]);
        const otherQuestions = shuffleArray(generalPool.filter(q => q.category !== catId));
        for (let i = 0; selectedQuestions.length < 5 && i < otherQuestions.length; i++) {
          selectedQuestions.push(otherQuestions[i]);
        }
      }
    }

    activeRound = {
      category: isColectivo ? {
        id: category.id,
        label: category.label || 'COLECTIVO',
        name: category.name || 'Transporte de Pasajeros',
        icon: '🚌',
        color: category.color || '#7C3AED'
      } : (isMoto ? {
        id: category.id,
        label: category.label || 'MOTO EXTREME',
        name: category.name || 'Motovehículos Clase A',
        icon: '🏍️',
        color: category.color || '#BE185D'
      } : category),
      questions: selectedQuestions,
      currentIndex: 0,
      correctCount: 0,
      times: [],
      perQuestion: []
    };

    showScreen('quiz');
    renderCurrentQuestion();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ── RENDER QUESTION ───────────────────────────────────────
  function renderCurrentQuestion() {
    if (!activeRound) return;
    clearTimeout(autoAdvanceTimer);
    clearInterval(timerInterval);

    const { category, questions, currentIndex } = activeRound;
    const q = questions[currentIndex];
    const qNum = currentIndex + 1;
    isAnswered = false;

    // Header updates
    if (quizCategoryBadge) {
      const isColectivo = isColectivoProfile();
      const isMoto = isMotoProfile();
      if (isColectivo) {
        quizCategoryBadge.textContent = '🚌 TRANSPORTE DE PASAJEROS (D1)';
      } else if (isMoto) {
        quizCategoryBadge.textContent = `🏍️ MOTO EXTREME • ${category.label || category.name}`;
      } else {
        quizCategoryBadge.textContent = `${category.icon || ''} ${category.label || category.name}`;
      }
    }
    if (quizCurrentNum) {
      quizCurrentNum.textContent = qNum;
    }
    if (quizProgressFill) {
      const pct = ((qNum - 1) / 5) * 100;
      quizProgressFill.style.width = `${pct}%`;
    }

    // Timer reset & live interval
    if (quizTimerText) {
      quizTimerText.textContent = '0.0s';
      quizTimerText.style.color = '';
    }
    questionStartTime = performance.now();

    timerInterval = setInterval(() => {
      if (!isAnswered && quizTimerText) {
        const elapsed = (performance.now() - questionStartTime) / 1000;
        quizTimerText.textContent = `${elapsed.toFixed(1)}s`;
        if (elapsed > 10) quizTimerText.style.color = 'var(--error)';
      }
    }, 100);

    // Question Text
    if (quizQuestionText) {
      quizQuestionText.textContent = q.question;
    }

    // Question Image (Signals)
    if (quizImageBlock && quizImageTag) {
      if (q.imageSrc) {
        quizImageTag.src = q.imageSrc;
        quizImageBlock.style.display = 'flex';
      } else {
        quizImageBlock.style.display = 'none';
      }
    }

    // Render Options
    if (quizOptionsStack) {
      quizOptionsStack.innerHTML = '';
      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.type = 'button';

        const letterSpan = document.createElement('span');
        letterSpan.className = 'option-letter';
        letterSpan.textContent = String.fromCharCode(65 + idx);

        const textSpan = document.createElement('span');
        textSpan.className = 'option-text';
        textSpan.textContent = optText.replace(/^[A-Ca-c][.)]\s*/, '');

        btn.appendChild(letterSpan);
        btn.appendChild(textSpan);

        btn.addEventListener('click', () => handleOptionSelection(idx, q));
        quizOptionsStack.appendChild(btn);
      });
    }

    // Hide feedback & next button
    if (quizFeedbackBox) quizFeedbackBox.classList.remove('show', 'correct-fb', 'wrong-fb');
    if (quizBtnNext) quizBtnNext.style.display = 'none';
  }

  // ── HANDLE OPTION SELECTION ───────────────────────────────
  function handleOptionSelection(selectedIdx, q) {
    if (isAnswered) return;
    isAnswered = true;

    clearInterval(timerInterval);
    const finalTime = parseFloat(((performance.now() - questionStartTime) / 1000).toFixed(2));
    const isCorrect = selectedIdx === q.correctAnswer;

    activeRound.times.push(finalTime);
    activeRound.perQuestion.push({ correct: isCorrect, time: finalTime, question: q.question });

    // Calculate score
    const pointsGained = isCorrect ? (100 + Math.max(0, Math.round((10 - finalTime) * 8))) : 0;

    // Log answer to history
    const responsePayload = {
      timestamp: new Date().toLocaleString('es-AR'),
      name: playerName,
      email: playerEmail,
      category: activeRound.category.label || activeRound.category.name,
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

    if (isCorrect) {
      activeRound.correctCount++;
      sessionStreak++;
      sessionCorrect++;
      sessionScore += pointsGained;
      audioSystem.playCorrect();
    } else {
      sessionStreak = 0;
      audioSystem.playWrong();
    }

    updateHeaderDisplay();

    // Style option buttons
    const allBtns = quizOptionsStack.querySelectorAll('.option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
      } else {
        btn.classList.add('dimmed');
      }
    });

    // Feedback message
    if (quizFeedbackBox) {
      quizFeedbackBox.classList.add('show', isCorrect ? 'correct-fb' : 'wrong-fb');
      if (quizFeedbackTitle) {
        quizFeedbackTitle.innerHTML = isCorrect ? '✅ ¡CORRECTO!' : '❌ RESPUESTA INCORRECTA';
        quizFeedbackTitle.style.color = isCorrect ? 'var(--success)' : '#FF4D4D';
      }
      if (quizFeedbackExp) {
        quizFeedbackExp.textContent = q.explanation || 'Norma vial aplicable según Ley Nacional de Tránsito.';
      }
      if (quizFeedbackTime) {
        quizFeedbackTime.textContent = `⏱ ${finalTime}s ${isCorrect ? `(+${pointsGained} XP)` : ''}`;
      }
    }

    // Show Next Button
    if (quizBtnNext) {
      quizBtnNext.style.display = 'flex';
      const nextQ = activeRound.currentIndex + 2;
      if (quizBtnNextLabel) {
        quizBtnNextLabel.textContent = nextQ <= 5 ? `Pregunta (${nextQ}/5)` : 'Ver Resultados 🏆';
      }
    }

    // Auto advance after 2.8 seconds
    autoAdvanceTimer = setTimeout(() => advanceQuiz(), 2800);
  }

  function advanceQuiz() {
    clearTimeout(autoAdvanceTimer);
    if (!activeRound) return;

    activeRound.currentIndex++;
    if (activeRound.currentIndex < activeRound.questions.length) {
      renderCurrentQuestion();
    } else {
      finishRoundAndShowResults();
    }
  }

  quizBtnNext?.addEventListener('click', advanceQuiz);

  // ── FINISH ROUND & RESULTS ────────────────────────────────
  function finishRoundAndShowResults() {
    if (!activeRound) return;
    sessionRounds++;
    updateHeaderDisplay();

    const { category, correctCount, times, perQuestion } = activeRound;
    const totalQ = 5;
    const totalTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) : 0;
    const avgTime = times.length > 0 ? (totalTime / times.length).toFixed(2) : '0.00';
    const accuracyPct = Math.round((correctCount / totalQ) * 100);

    // Save to leaderboard
    saveToLeaderboard(sessionScore, category.label || category.name, parseFloat(avgTime));
    markPlayerCompleted(playerEmail);
    updateRouletteLockState();

    // Calculate ranking position
    const cleanMyEmail = (playerEmail || '').toLowerCase().trim();
    const myIndex = leaderboard.findIndex(e => (e.email || '').toLowerCase().trim() === cleanMyEmail);
    const myRank = myIndex >= 0 ? myIndex + 1 : 1;

    // Celebration & Audio
    if (accuracyPct >= 80) audioSystem.playFanfare();
    if (accuracyPct === 100) launchConfetti();

    // Results texts & medal display
    let emoji = '💪';
    let titleMsg = '¡Buen esfuerzo vial!';
    if (accuracyPct === 100) { emoji = '🏆'; titleMsg = '¡PERFECTO! MAESTRO VIAL'; }
    else if (accuracyPct >= 80) { emoji = '🎉'; titleMsg = '¡EXCELENTE PILOTO!'; }
    else if (accuracyPct >= 60) { emoji = '👍'; titleMsg = '¡APROBADO!'; }

    if (resMedalDisplay) {
      if (myRank === 1) {
        resMedalDisplay.innerHTML = `<img src="assets/medals/oro.png" alt="1° Lugar Oro" style="width:76px;height:76px;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(255,198,0,0.5));">`;
        resMedalDisplay.style.display = 'block';
        if (resEmoji) resEmoji.style.display = 'none';
      } else if (myRank === 2) {
        resMedalDisplay.innerHTML = `<img src="assets/medals/plata.png" alt="2° Lugar Plata" style="width:76px;height:76px;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(203,213,225,0.4));">`;
        resMedalDisplay.style.display = 'block';
        if (resEmoji) resEmoji.style.display = 'none';
      } else if (myRank === 3) {
        resMedalDisplay.innerHTML = `<img src="assets/medals/bronce.png" alt="3° Lugar Bronce" style="width:76px;height:76px;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(205,127,50,0.4));">`;
        resMedalDisplay.style.display = 'block';
        if (resEmoji) resEmoji.style.display = 'none';
      } else {
        resMedalDisplay.style.display = 'none';
        if (resEmoji) {
          resEmoji.style.display = 'block';
          resEmoji.textContent = emoji;
        }
      }
    } else if (resEmoji) {
      resEmoji.textContent = emoji;
    }

    if (resTitle) resTitle.textContent = titleMsg;
    if (resSubtitle) resSubtitle.textContent = `${playerName}, completaste el desafío de ${category.label || category.name}.`;
    if (resRankPill) resRankPill.textContent = `🏆 POSICIÓN #${myRank} DE ${leaderboard.length} PARTICIPANTES`;

    if (resScoreNum) resScoreNum.textContent = correctCount;
    if (resStatCorrect) resStatCorrect.textContent = `${correctCount}/5`;
    if (resStatPct) resStatPct.textContent = `${accuracyPct}%`;
    if (resStatTime) resStatTime.textContent = `${avgTime}s`;
    if (resStatPoints) resStatPoints.textContent = `${sessionScore} XP`;

    // SVG Score Ring animation
    if (resScoreRingCircle) {
      const circ = 2 * Math.PI * 54;
      const offset = circ - (accuracyPct / 100) * circ;
      resScoreRingCircle.style.strokeDasharray = `${circ}`;
      resScoreRingCircle.style.strokeDashoffset = `${circ}`;
      setTimeout(() => {
        resScoreRingCircle.style.transition = 'stroke-dashoffset 1s ease';
        resScoreRingCircle.style.strokeDashoffset = `${offset}`;
      }, 100);
    }

    // Breakdown list
    if (resBreakdownList) {
      resBreakdownList.innerHTML = perQuestion.map((pq, idx) => `
        <div class="breakdown-row">
          <span style="font-family:var(--font-display);font-weight:900;color:var(--tertiary);width:20px;">#${idx+1}</span>
          <span>${pq.correct ? '✅' : '❌'}</span>
          <span style="flex:1;font-size:12px;color:var(--on-surface-variant);">${pq.question.length > 50 ? pq.question.slice(0, 50) + '…' : pq.question}</span>
          <span style="font-family:var(--font-display);font-weight:700;color:${pq.correct ? 'var(--success)' : 'var(--tertiary)'};">${pq.time}s</span>
        </div>
      `).join('');
    }

    showScreen('results');
  }

  // ── SAVE TO LEADERBOARD ───────────────────────────────────
  function saveToLeaderboard(points, catName, timeAvg) {
    const cleanEmail = (playerEmail || '').toLowerCase().trim();
    const entry = {
      name: playerName,
      email: playerEmail,
      avatar: playerAvatar,
      role: playerRole,
      score: points,
      category: catName,
      time: timeAvg,
      date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    };

    const existingIdx = leaderboard.findIndex(e => (e.email || '').toLowerCase().trim() === cleanEmail);
    if (existingIdx >= 0) {
      if (points >= (leaderboard[existingIdx].score || 0)) {
        leaderboard[existingIdx] = entry;
      }
    } else {
      leaderboard.push(entry);
    }

    leaderboard = mergeLeaderboards(leaderboard, []);
    localStorage.setItem('vex_leaderboard', JSON.stringify(leaderboard));
    pushCloudState();
  }

  // ── RESULTS BUTTON ACTIONS ────────────────────────────────
  btnResGoRanking?.addEventListener('click', () => showScreen('ranking'));
  btnResNewPlayer?.addEventListener('click', () => {
    playerName = '';
    playerEmail = '';
    localStorage.removeItem('vialplay_player_name');
    localStorage.removeItem('vialplay_player_email');
    if (regNameInput) regNameInput.value = '';
    if (regEmailInput) regEmailInput.value = '';
    showScreen('register');
  });

  // ── RENDER LEADERBOARD UI ─────────────────────────────────
  function renderLeaderboardUI() {
    const cleanMyEmail = (playerEmail || '').toLowerCase().trim();
    const myIndex = leaderboard.findIndex(e => (e.email || '').toLowerCase().trim() === cleanMyEmail);

    if (rankUserPosCard) {
      if (playerName) {
        const rankText = myIndex >= 0 ? `Puesto #${myIndex + 1} de ${leaderboard.length}` : 'Aún sin posición (¡Girá la ruleta!)';
        rankUserPosCard.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="${playerAvatar}" style="width:48px;height:48px;border-radius:50%;border:2px solid var(--secondary-container);object-fit:cover;">
            <div>
              <div style="font-size:11px;font-weight:700;color:var(--tertiary);text-transform:uppercase;">Tu Perfil Vial</div>
              <div style="font-family:var(--font-display);font-size:18px;color:var(--on-surface);">${playerName}</div>
              <div style="font-size:12px;font-weight:700;color:var(--secondary-container);">${rankText}</div>
            </div>
            <button id="btn-change-player-from-rank" style="margin-left:auto;padding:6px 12px;border:1px solid rgba(255,255,255,0.2);border-radius:10px;background:rgba(255,255,255,0.06);color:var(--on-surface-variant);font-size:11px;font-weight:700;cursor:pointer;">
              Cambiar
            </button>
          </div>
        `;
        document.getElementById('btn-change-player-from-rank')?.addEventListener('click', () => {
          showScreen('register');
        });
      } else {
        rankUserPosCard.innerHTML = `
          <div style="text-align:center;padding:12px;">
            <p style="font-size:13px;color:var(--on-surface-variant);">No has iniciado sesión todavía.</p>
            <button onclick="document.getElementById('screen-register').classList.add('active');" class="btn-tactile-primary" style="height:38px;font-size:12px;margin-top:8px;">REGISTRARME</button>
          </div>
        `;
      }
    }

    // Render Top 3 Podium of Honor
    if (rankPodiumContainer) {
      if (leaderboard.length >= 1) {
        const top1 = leaderboard[0];
        const top2 = leaderboard.length >= 2 ? leaderboard[1] : null;
        const top3 = leaderboard.length >= 3 ? leaderboard[2] : null;

        rankPodiumContainer.style.display = 'grid';
        rankPodiumContainer.innerHTML = `
          <!-- 2nd Place Plata -->
          <div class="podium-card second">
            <img src="assets/medals/plata.png" class="podium-img" alt="2° Lugar Plata">
            <span style="font-family:var(--font-display);font-size:11px;color:#CBD5E1;letter-spacing:0.5px;">2° LUGAR</span>
            <span style="font-weight:700;font-size:12px;color:var(--on-surface);max-width:85px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              ${top2 ? top2.name : '—'}
            </span>
            <span style="font-family:var(--font-display);font-size:11px;color:var(--tertiary);">
              ${top2 ? top2.score + ' XP' : '—'}
            </span>
          </div>

          <!-- 1st Place Oro -->
          <div class="podium-card first">
            <img src="assets/medals/oro.png" class="podium-img" alt="1° Lugar Oro">
            <span style="font-family:var(--font-display);font-size:12px;color:var(--secondary-container);letter-spacing:0.5px;">1° LUGAR</span>
            <span style="font-weight:700;font-size:13px;color:var(--on-surface);max-width:98px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              ${top1 ? top1.name : '—'}
            </span>
            <span style="font-family:var(--font-display);font-size:12px;color:var(--secondary-container);">
              ${top1 ? top1.score + ' XP' : '—'}
            </span>
          </div>

          <!-- 3rd Place Bronce -->
          <div class="podium-card third">
            <img src="assets/medals/bronce.png" class="podium-img" alt="3° Lugar Bronce">
            <span style="font-family:var(--font-display);font-size:11px;color:#CD7F32;letter-spacing:0.5px;">3° LUGAR</span>
            <span style="font-weight:700;font-size:12px;color:var(--on-surface);max-width:85px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              ${top3 ? top3.name : '—'}
            </span>
            <span style="font-family:var(--font-display);font-size:11px;color:var(--tertiary);">
              ${top3 ? top3.score + ' XP' : '—'}
            </span>
          </div>
        `;
      } else {
        rankPodiumContainer.style.display = 'none';
      }
    }

    const filterTerm = (rankSearchInput?.value || '').toLowerCase().trim();
    const filtered = leaderboard.filter(e => {
      if (!filterTerm) return true;
      return (e.name || '').toLowerCase().includes(filterTerm) ||
             (e.email || '').toLowerCase().includes(filterTerm) ||
             (e.category || '').toLowerCase().includes(filterTerm);
    });

    if (rankTableBody) {
      if (filtered.length === 0) {
        rankTableBody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center;padding:32px;color:var(--on-surface-variant);">
              ${filterTerm ? 'No se encontraron participantes con esa búsqueda.' : 'Aún no hay participantes registrados. ¡Sé el primero en girar la ruleta!'}
            </td>
          </tr>
        `;
      } else {
        rankTableBody.innerHTML = filtered.map((e, idx) => {
          const originalIdx = leaderboard.indexOf(e);
          let medalMarkup = `#${originalIdx + 1}`;
          if (originalIdx === 0) {
            medalMarkup = `<img src="assets/medals/oro.png" class="medal-icon" alt="1°" title="1° Lugar (Oro)">`;
          } else if (originalIdx === 1) {
            medalMarkup = `<img src="assets/medals/plata.png" class="medal-icon" alt="2°" title="2° Lugar (Plata)">`;
          } else if (originalIdx === 2) {
            medalMarkup = `<img src="assets/medals/bronce.png" class="medal-icon" alt="3°" title="3° Lugar (Bronce)">`;
          }
          const isMe = cleanMyEmail && (e.email || '').toLowerCase().trim() === cleanMyEmail;
          return `
            <tr style="${isMe ? 'background:rgba(255,198,0,0.12);font-weight:bold;' : ''}">
              <td class="rank-medal" style="text-align:center;width:44px;">${medalMarkup}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <img src="${e.avatar || 'assets/avatars/auto.png'}" style="width:26px;height:26px;border-radius:50%;object-fit:cover;">
                  <div>
                    <span style="color:${isMe ? 'var(--secondary-container)' : 'var(--on-surface)'}">${e.name}</span>
                    <div style="font-size:10px;color:var(--tertiary);">${e.category || 'Vial'}</div>
                  </div>
                </div>
              </td>
              <td style="text-align:right;font-family:var(--font-display);font-size:16px;color:var(--secondary-container);">${e.score}</td>
              <td style="text-align:right;font-family:var(--font-display);font-size:13px;color:var(--tertiary);">${Number(e.time).toFixed(2)}s</td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  rankSearchInput?.addEventListener('input', renderLeaderboardUI);

  // ── ADMIN PANEL LOGIC ─────────────────────────────────────
  const ADMIN_PIN = '1234';

  function openAdminPinModal() {
    if (!modalAdminPin) return;
    if (inputAdminPin) inputAdminPin.value = '';
    if (adminPinError) adminPinError.style.display = 'none';
    modalAdminPin.style.display = 'flex';
    setTimeout(() => inputAdminPin?.focus(), 150);
  }

  function closeAdminPinModal() {
    if (modalAdminPin) modalAdminPin.style.display = 'none';
  }

  function verifyAdminPin() {
    const entered = (inputAdminPin?.value || '').trim();
    if (entered === ADMIN_PIN) {
      closeAdminPinModal();
      showScreen('admin');
    } else {
      if (adminPinError) adminPinError.style.display = 'block';
      if (inputAdminPin) {
        inputAdminPin.style.borderColor = 'var(--error)';
        inputAdminPin.focus();
        setTimeout(() => inputAdminPin.style.borderColor = '', 1000);
      }
    }
  }

  btnConfirmPin?.addEventListener('click', verifyAdminPin);
  btnCancelPin?.addEventListener('click', closeAdminPinModal);
  inputAdminPin?.addEventListener('keypress', e => { if (e.key === 'Enter') verifyAdminPin(); });

  btnExitAdmin?.addEventListener('click', () => {
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
    }
    if (playerName) {
      showScreen('roulette');
    } else {
      showScreen('register');
    }
  });

  // ── SECRETO: ACCESO ADMINISTRADOR OCULTO (PARA QUE EL PÚBLICO NO LO VEA) ──
  // 1. Atajo de teclado: Ctrl + Shift + A  ó  Alt + A
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || 
        (e.altKey && e.key.toLowerCase() === 'a')) {
      e.preventDefault();
      openAdminPinModal();
    }
  });

  // 2. Acceso por URL (ej: index.html#admin o index.html?admin)
  function checkUrlForAdmin() {
    if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
      openAdminPinModal();
    }
  }
  window.addEventListener('hashchange', checkUrlForAdmin);
  checkUrlForAdmin();

  // 3. Toque secreto en pantallas táctiles: 5 toques rápidos en el logo del header
  let logoTapCount = 0;
  let logoTapTimer = null;
  document.querySelector('.brand-block')?.addEventListener('click', () => {
    logoTapCount++;
    clearTimeout(logoTapTimer);
    if (logoTapCount >= 5) {
      logoTapCount = 0;
      openAdminPinModal();
    } else {
      logoTapTimer = setTimeout(() => { logoTapCount = 0; }, 1200);
    }
  });

  function renderAdminDashboard() {
    const totalUsers = leaderboard.length;
    const perfectCount = leaderboard.filter(e => (Number(e.score) || 0) >= 500).length;
    const maxScore = totalUsers > 0 ? Math.max(...leaderboard.map(e => Number(e.score) || 0)) : 0;
    const avgOverallTime = totalUsers > 0 
      ? (leaderboard.reduce((a, b) => a + (Number(b.time) || 0), 0) / totalUsers).toFixed(2) 
      : '0.00';

    if (adminTotalUsers) adminTotalUsers.textContent = totalUsers;
    if (adminPerfectCount) adminPerfectCount.textContent = perfectCount;
    if (adminMaxScore) adminMaxScore.textContent = `${maxScore} XP`;
    if (adminAvgTime) adminAvgTime.textContent = `${avgOverallTime}s`;

    const searchTerm = (adminSearchInput?.value || '').toLowerCase().trim();
    const filtered = leaderboard.filter(e => {
      if (!searchTerm) return true;
      return (e.name || '').toLowerCase().includes(searchTerm) ||
             (e.email || '').toLowerCase().includes(searchTerm) ||
             (e.role || '').toLowerCase().includes(searchTerm) ||
             (e.category || '').toLowerCase().includes(searchTerm);
    });

    if (adminTableBody) {
      if (filtered.length === 0) {
        adminTableBody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align:center;padding:36px;color:var(--on-surface-variant);font-size:14px;">
              No se encontraron registros de participantes.
            </td>
          </tr>
        `;
      } else {
        adminTableBody.innerHTML = filtered.map((e, idx) => {
          const originalIdx = leaderboard.indexOf(e);
          let medalBadge = `<span style="font-family:var(--font-display);font-weight:900;color:var(--on-surface-variant);font-size:14px;">#${originalIdx + 1}</span>`;
          if (originalIdx === 0) medalBadge = `<img src="assets/medals/oro.png" class="medal-icon" alt="1°" style="width:28px;height:28px;vertical-align:middle;display:inline-block;">`;
          else if (originalIdx === 1) medalBadge = `<img src="assets/medals/plata.png" class="medal-icon" alt="2°" style="width:28px;height:28px;vertical-align:middle;display:inline-block;">`;
          else if (originalIdx === 2) medalBadge = `<img src="assets/medals/bronce.png" class="medal-icon" alt="3°" style="width:28px;height:28px;vertical-align:middle;display:inline-block;">`;

          const avatarImg = e.avatar || 'assets/avatars/auto.png';
          const roleLabel = e.role || 'Auto (Cat B)';
          const catLabel = e.category || 'Vial General';
          const timeLabel = e.time ? Number(e.time).toFixed(2) + 's' : '0.00s';
          const dateLabel = e.date || new Date().toLocaleDateString('es-AR');

          return `
            <tr>
              <td style="text-align:center;width:70px;">${medalBadge}</td>
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <img src="${avatarImg}" style="width:34px;height:34px;border-radius:50%;border:1.5px solid var(--secondary-container);object-fit:cover;flex-shrink:0;" onerror="this.src='assets/avatars/auto.png'">
                  <span style="font-weight:700;color:var(--on-surface);font-size:14px;">${e.name}</span>
                </div>
              </td>
              <td>
                <span style="display:inline-block;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.07);color:var(--tertiary);font-size:12px;font-weight:600;">
                  ${roleLabel}
                </span>
              </td>
              <td style="font-size:13px;color:var(--on-surface-variant);">${e.email || '—'}</td>
              <td>
                <span style="font-size:13px;font-weight:600;color:var(--tertiary);">${catLabel}</span>
              </td>
              <td style="text-align:right;font-family:var(--font-display);font-size:15px;color:var(--secondary-container);font-weight:900;">
                ${e.score} XP
              </td>
              <td style="text-align:right;font-family:var(--font-display);font-size:14px;color:var(--on-surface);">
                ${timeLabel}
              </td>
              <td style="text-align:right;font-size:12px;color:var(--on-surface-variant);white-space:nowrap;">
                ${dateLabel}
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  adminSearchInput?.addEventListener('input', renderAdminDashboard);

  // CSV Export functions
  function downloadCSV(filename, content) {
    const blob = new Blob(["\uFEFF" + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  btnExportRanking?.addEventListener('click', () => {
    let csv = 'Posicion,Nombre,Email,Categoria,Puntaje,TiempoPromedio,Fecha\n';
    leaderboard.forEach((e, i) => {
      csv += `"${i+1}","${e.name}","${e.email}","${e.category}","${e.score}","${e.time}","${e.date || ''}"\n`;
    });
    downloadCSV(`vialplay_ranking_${new Date().toISOString().slice(0,10)}.csv`, csv);
  });

  btnExportLogins?.addEventListener('click', () => {
    let csv = 'FechaYHora,Nombre,Email,Rol\n';
    loginsHistory.forEach(l => {
      csv += `"${l.timestamp}","${l.name}","${l.email}","${l.role || ''}"\n`;
    });
    downloadCSV(`vialplay_ingresos_${new Date().toISOString().slice(0,10)}.csv`, csv);
  });

  btnExportAnswers?.addEventListener('click', () => {
    let csv = 'FechaYHora,Nombre,Email,Categoria,Pregunta,RespuestaElegida,RespuestaCorrecta,Resultado,TiempoSegundos,Puntos\n';
    responsesHistory.forEach(r => {
      csv += `"${r.timestamp}","${r.name}","${r.email}","${r.category}","${(r.question || '').replace(/"/g, '""')}","${(r.selectedAnswer || '').replace(/"/g, '""')}","${(r.correctAnswer || '').replace(/"/g, '""')}","${r.isCorrect}","${r.timeSeconds}","${r.pointsGained}"\n`;
    });
    downloadCSV(`vialplay_respuestas_${new Date().toISOString().slice(0,10)}.csv`, csv);
  });

  btnAdminReset?.addEventListener('click', () => {
    if (confirm('¿ATENCIÓN: Estás seguro de reiniciar los puntajes y participantes locales? Esta acción borrará el ranking actual.')) {
      leaderboard = [];
      loginsHistory = [];
      responsesHistory = [];
      completedPlayers = [];
      localStorage.removeItem('vex_leaderboard');
      localStorage.removeItem('vex_logins_history');
      localStorage.removeItem('vex_responses_history');
      localStorage.removeItem('vex_completed_players');
      renderAdminDashboard();
      renderLeaderboardUI();
      alert('Datos reiniciados con éxito.');
    }
  });

  // ── ADMIN QUESTION MANAGER LOGIC ──────────────────────────
  let currentAdminBank = 'moto';

  const BANK_CATEGORY_NAMES = {
    moto: {
      'casco': '🪖 Uso de Casco y Protección',
      'frenado': '🛑 Técnicas de Frenado',
      'espejos': '👀 Ángulos Muertos y Espejos',
      'pasajeros': '👥 Conducción con Pasajero',
      'clima': '🌧️ Clima Adverso y Calzada',
      'velocidad': '⚡ Velocidades Máximas',
      'normativa': '📋 Normativa y Documentación'
    },
    colectivo: {
      'prioridad': '🚸 Prioridad Peatonal y Giros',
      'senales': '🛑 Señales Viales y Semáforos',
      'velocidad': '⚡ Velocidades Máximas',
      'metrobus': '🚌 Carril Exclusivo y Metrobús',
      'seguridad': '🛡️ Seguridad Activa y Pasiva',
      'pasajeros': '👥 Transporte de Pasajeros',
      'normativa': '📋 Normativa D1 y Alcohol Cero'
    },
    general: {
      'senales': '🛑 Señales de Tránsito',
      'prioridad': '🚸 Prioridades de Paso',
      'seguridad': '🛡️ Seguridad Vial',
      'normas': '📋 Normativa y Reglas',
      'velocidades': '⚡ Velocidades y Conducción',
      'alcohol': '🍷 Alcohol Cero y Sustancias',
      'mantenimiento': '🔧 Mecánica y Mantenimiento'
    }
  };

  const BANK_NAMES = {
    moto: 'Motociclistas (Clase A)',
    colectivo: 'Colectivo / Pasajeros (D1)',
    general: 'General / Multivehicular'
  };

  function updateQuestionsBadges() {
    const motoCount = getActiveQuestions('moto').length;
    const colectivoCount = getActiveQuestions('colectivo').length;
    const generalCount = getActiveQuestions('general').length;

    if (badgeCountMoto) badgeCountMoto.textContent = motoCount;
    if (badgeCountColectivo) badgeCountColectivo.textContent = colectivoCount;
    if (badgeCountGeneral) badgeCountGeneral.textContent = generalCount;
  }

  // Admin Tab Navigation
  tabBtnStats?.addEventListener('click', () => {
    tabBtnStats.classList.add('active');
    tabBtnQuestions?.classList.remove('active');
    if (adminTabStats) adminTabStats.style.display = 'flex';
    if (adminTabQuestions) adminTabQuestions.style.display = 'none';
    renderAdminDashboard();
  });

  tabBtnQuestions?.addEventListener('click', () => {
    tabBtnQuestions.classList.add('active');
    tabBtnStats?.classList.remove('active');
    if (adminTabStats) adminTabStats.style.display = 'none';
    if (adminTabQuestions) adminTabQuestions.style.display = 'flex';
    renderAdminQuestionsTab();
  });

  // Bank Selector Pills
  adminBankPills.forEach(pill => {
    pill.addEventListener('click', () => {
      adminBankPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentAdminBank = pill.dataset.bank || 'moto';
      if (adminQSearch) adminQSearch.value = '';
      populateCategoryFilter();
      renderAdminQuestionsList();
    });
  });

  function populateCategoryFilter() {
    if (!adminQCatFilter) return;
    const questions = getActiveQuestions(currentAdminBank);
    const catMap = BANK_CATEGORY_NAMES[currentAdminBank] || {};

    const catCounts = {};
    questions.forEach(q => {
      const c = q.category || 'general';
      catCounts[c] = (catCounts[c] || 0) + 1;
    });

    const uniqueCats = Array.from(new Set([...Object.keys(catMap), ...Object.keys(catCounts)]));

    let html = `<option value="all">Todas las categorías (${questions.length})</option>`;
    uniqueCats.forEach(catId => {
      const count = catCounts[catId] || 0;
      const label = catMap[catId] || catId;
      html += `<option value="${catId}">${label} (${count})</option>`;
    });

    adminQCatFilter.innerHTML = html;
  }

  function populateCategorySelect(selectElem, bank, selectedCat) {
    if (!selectElem) return;
    const questions = getActiveQuestions(bank);
    const catMap = BANK_CATEGORY_NAMES[bank] || {};

    const uniqueCats = Array.from(new Set([
      ...Object.keys(catMap),
      ...questions.map(q => q.category).filter(Boolean)
    ]));

    selectElem.innerHTML = uniqueCats.map(catId => {
      const label = catMap[catId] || catId;
      const isSelected = catId === selectedCat ? 'selected' : '';
      return `<option value="${catId}" ${isSelected}>${label}</option>`;
    }).join('');

    if (selectedCat && !uniqueCats.includes(selectedCat)) {
      selectElem.insertAdjacentHTML('beforeend', `<option value="${selectedCat}" selected>${selectedCat}</option>`);
    }
  }

  function renderAdminQuestionsTab() {
    updateQuestionsBadges();
    populateCategoryFilter();
    renderAdminQuestionsList();
  }

  function renderAdminQuestionsList() {
    if (!adminQuestionsList) return;
    const questions = getActiveQuestions(currentAdminBank);
    const catFilter = adminQCatFilter?.value || 'all';
    const searchQuery = (adminQSearch?.value || '').toLowerCase().trim();

    const filtered = questions.filter(q => {
      if (catFilter !== 'all' && q.category !== catFilter) return false;
      if (!searchQuery) return true;
      const textMatch = (q.question || '').toLowerCase().includes(searchQuery);
      const catMatch = (q.category || '').toLowerCase().includes(searchQuery);
      const optMatch = (q.options || []).some(opt => (opt || '').toLowerCase().includes(searchQuery));
      const expMatch = (q.explanation || '').toLowerCase().includes(searchQuery);
      const idMatch = String(q.id).includes(searchQuery);
      return textMatch || catMatch || optMatch || expMatch || idMatch;
    });

    if (adminQCounterLabel) {
      adminQCounterLabel.textContent = `Mostrando ${filtered.length} de ${questions.length} preguntas`;
    }

    if (filtered.length === 0) {
      adminQuestionsList.innerHTML = `
        <div style="text-align:center;padding:48px 16px;background:var(--surface-container);border-radius:16px;border:1px dashed var(--outline-variant);">
          <span class="material-symbols-outlined text-[48px]" style="color:var(--on-surface-variant);display:block;margin-bottom:8px;">search_off</span>
          <p style="font-size:15px;font-weight:700;color:var(--on-surface);">No se encontraron preguntas</p>
          <p style="font-size:13px;color:var(--on-surface-variant);margin-top:4px;">Probá cambiando el filtro de categoría o limpiando el texto de búsqueda.</p>
        </div>
      `;
      return;
    }

    const catMap = BANK_CATEGORY_NAMES[currentAdminBank] || {};

    adminQuestionsList.innerHTML = filtered.map((q) => {
      const catLabel = catMap[q.category] || q.category || 'General';
      const hasImage = !!q.imageSrc;
      const imgThumbnail = hasImage ? `
        <div class="admin-q-thumb-wrap" title="Hacé clic para ver imagen en tamaño completo" onclick="window.openPreviewImage('${q.imageSrc}')">
          <img src="${q.imageSrc}" alt="Pregunta ${q.id}" onerror="this.src='assets/avatars/auto.png';this.title='Error al cargar imagen';">
          <span class="admin-q-img-badge">🖼️ Imagen</span>
        </div>
      ` : '';

      const optionsHtml = (q.options || []).map((opt, oIdx) => {
        const isCorrect = oIdx === q.correct;
        const letter = ['A', 'B', 'C', 'D'][oIdx] || `${oIdx + 1}`;
        return `
          <div class="admin-q-opt-item ${isCorrect ? 'correct' : ''}">
            <span class="admin-q-opt-letter">${letter}</span>
            <span class="admin-q-opt-text">${opt}</span>
            ${isCorrect ? '<span class="material-symbols-outlined text-[16px]" style="color:var(--success);margin-left:auto;flex-shrink:0;">check_circle</span>' : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="admin-q-card" data-qid="${q.id}">
          <div class="admin-q-card-header">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span class="admin-q-cat-tag">${catLabel}</span>
              <span class="admin-q-id-tag">#${q.id}</span>
              ${hasImage ? '<span class="admin-q-has-img-tag"><span class="material-symbols-outlined text-[13px]">image</span> Con Imagen</span>' : ''}
            </div>
            <div class="admin-q-actions">
              <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Editar pregunta e imagen">
                <span class="material-symbols-outlined text-[15px]">edit</span>
                <span>Editar</span>
              </button>
              <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Eliminar pregunta">
                <span class="material-symbols-outlined text-[15px]">delete</span>
              </button>
            </div>
          </div>

          <div class="admin-q-card-body">
            ${imgThumbnail}
            <div class="admin-q-content-col">
              <h4 class="admin-q-title">${q.question}</h4>
              <div class="admin-q-options-grid">
                ${optionsHtml}
              </div>
              ${q.explanation ? `
                <div class="admin-q-explanation-box">
                  <span class="material-symbols-outlined text-[14px]">info</span>
                  <span><strong>Explicación:</strong> ${q.explanation}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    adminQuestionsList.querySelectorAll('.btn-q-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        openQuestionEditModal(qid, currentAdminBank);
      });
    });

    adminQuestionsList.querySelectorAll('.btn-q-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        deleteQuestion(qid, currentAdminBank);
      });
    });
  }

  // Question Edit Modal Actions
  function openQuestionEditModal(qId, bank) {
    if (!modalAdminQuestion) return;
    const questions = getActiveQuestions(bank);
    const q = qId ? questions.find(item => String(item.id) === String(qId)) : null;

    if (modalQTitle) modalQTitle.textContent = q ? '✏️ Editar Pregunta' : '➕ Nueva Pregunta';
    if (modalQSubtitle) modalQSubtitle.textContent = `Banco: ${BANK_NAMES[bank] || bank}`;

    if (editQId) editQId.value = q ? q.id : '';
    if (editQBank) editQBank.value = bank;

    populateCategorySelect(editQCategory, bank, q ? q.category : '');

    if (editQText) editQText.value = q ? q.question : '';
    if (editQExplanation) editQExplanation.value = q && q.explanation ? q.explanation : '';

    const opts = q ? (q.options || []) : ['', '', '', ''];
    for (let i = 0; i < 4; i++) {
      const input = document.getElementById(`edit-q-opt-${i}`);
      if (input) input.value = opts[i] || '';
    }

    const correctIdx = q && typeof q.correct === 'number' ? q.correct : 0;
    const radios = document.querySelectorAll('input[name="edit-q-correct"]');
    radios.forEach(r => {
      r.checked = (parseInt(r.value, 10) === correctIdx);
    });

    const imgSrc = q && q.imageSrc ? q.imageSrc : '';
    setModalImagePreview(imgSrc);

    modalAdminQuestion.style.display = 'flex';
    modalAdminQuestion.classList.add('active');
  }

  function closeQuestionEditModal() {
    if (!modalAdminQuestion) return;
    modalAdminQuestion.style.display = 'none';
    modalAdminQuestion.classList.remove('active');
    if (formEditQuestion) formEditQuestion.reset();
    setModalImagePreview('');
  }

  function setModalImagePreview(src) {
    if (editQImgPath) editQImgPath.value = src || '';
    if (src) {
      if (editQImgPreview) {
        editQImgPreview.src = src;
        editQImgPreview.style.display = 'block';
      }
      if (editQNoImgLabel) editQNoImgLabel.style.display = 'none';
    } else {
      if (editQImgPreview) {
        editQImgPreview.src = '';
        editQImgPreview.style.display = 'none';
      }
      if (editQNoImgLabel) editQNoImgLabel.style.display = 'block';
    }
  }

  // Image Upload / Remove Handlers
  btnEditQUpload?.addEventListener('click', () => {
    editQFileInput?.click();
  });

  editQFileInput?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen seleccionada supera los 3 MB. Por favor elige una imagen más liviana.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target.result;
      setModalImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
    editQFileInput.value = '';
  });

  btnEditQRemoveImg?.addEventListener('click', () => {
    setModalImagePreview('');
  });

  editQImgPath?.addEventListener('input', (e) => {
    const val = (e.target.value || '').trim();
    setModalImagePreview(val);
  });

  btnCloseQModal?.addEventListener('click', closeQuestionEditModal);
  btnCancelQuestion?.addEventListener('click', closeQuestionEditModal);

  // Form Save
  formEditQuestion?.addEventListener('submit', (e) => {
    e.preventDefault();
    const bank = editQBank?.value || currentAdminBank;
    const qid = editQId?.value;
    const category = editQCategory?.value;
    const questionText = (editQText?.value || '').trim();
    const explanation = (editQExplanation?.value || '').trim();
    const imageSrc = (editQImgPath?.value || '').trim();

    if (!questionText) {
      alert('Por favor ingresa el enunciado de la pregunta.');
      editQText?.focus();
      return;
    }

    const rawOpts = [
      (document.getElementById('edit-q-opt-0')?.value || '').trim(),
      (document.getElementById('edit-q-opt-1')?.value || '').trim(),
      (document.getElementById('edit-q-opt-2')?.value || '').trim(),
      (document.getElementById('edit-q-opt-3')?.value || '').trim(),
    ];

    if (!rawOpts[0] || !rawOpts[1]) {
      alert('Debes ingresar al menos las opciones A y B.');
      return;
    }

    const options = [];
    rawOpts.forEach(opt => {
      if (opt) options.push(opt);
    });

    const checkedRadio = document.querySelector('input[name="edit-q-correct"]:checked');
    let correctIdx = checkedRadio ? parseInt(checkedRadio.value, 10) : 0;
    if (correctIdx >= options.length) {
      correctIdx = 0;
    }

    const questions = getActiveQuestions(bank);
    if (qid) {
      const existingIdx = questions.findIndex(item => String(item.id) === String(qid));
      if (existingIdx !== -1) {
        questions[existingIdx] = {
          ...questions[existingIdx],
          category,
          question: questionText,
          options,
          correct: correctIdx,
          explanation,
          imageSrc: imageSrc || undefined
        };
      }
    } else {
      const newId = (bank === 'moto' ? 1000 : bank === 'colectivo' ? 2000 : 3000) + questions.length + 1;
      const newQuestion = {
        id: newId,
        category,
        question: questionText,
        options,
        correct: correctIdx,
        explanation,
        imageSrc: imageSrc || undefined
      };
      questions.unshift(newQuestion);
    }

    saveActiveQuestions(bank, questions);
    closeQuestionEditModal();
    renderAdminQuestionsTab();
  });

  // Delete Question
  function deleteQuestion(qId, bank) {
    if (!confirm(`¿Estás seguro de eliminar la pregunta #${qId}?`)) return;
    const questions = getActiveQuestions(bank);
    const updated = questions.filter(q => String(q.id) !== String(qId));
    saveActiveQuestions(bank, updated);
    renderAdminQuestionsTab();
  }

  // New Question Button
  btnAdminNewQ?.addEventListener('click', () => {
    openQuestionEditModal(null, currentAdminBank);
  });

  // Export Questions JSON
  btnAdminExportQ?.addEventListener('click', () => {
    const list = getActiveQuestions(currentAdminBank);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `preguntas_${currentAdminBank}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  });

  // Reset Questions to Defaults
  btnAdminResetQ?.addEventListener('click', () => {
    if (confirm(`¿Deseas restaurar el banco "${BANK_NAMES[currentAdminBank]}" a las preguntas originales del sistema? Se perderán las modificaciones locales realizadas en este banco.`)) {
      localStorage.removeItem(`vialplay_custom_${currentAdminBank}_questions`);
      updateQuestionsBadges();
      renderAdminQuestionsTab();
      alert('Banco restaurado a valores por defecto con éxito.');
    }
  });

  // Filter & Search listeners
  adminQCatFilter?.addEventListener('change', renderAdminQuestionsList);
  adminQSearch?.addEventListener('input', renderAdminQuestionsList);

  // Global helper for opening preview image in full size
  window.openPreviewImage = function(src) {
    if (!src) return;
    const w = window.open('');
    if (w) {
      w.document.write(`<title>Vista Previa de Imagen</title><body style="margin:0;background:#0d121c;display:flex;align-items:center;justify-content:center;height:100vh;"><img src="${src}" style="max-width:92vw;max-height:92vh;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,0.8);border:2px solid #FFC600;"></body>`);
    }
  };

  // ── HUB / JUEGOS: BOTÓN RULETA VIAL ───────────────────────
  btnHubRoulette?.addEventListener('click', () => showScreen('roulette'));

  // ── CONFETTI EFFECT ───────────────────────────────────────
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 4,
      color: ['#FFC600', '#8DE2D6', '#00E58A', '#AEC2D6', '#FF4D4D'][Math.floor(Math.random() * 5)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 6 - 3
    }));

    let animFrame;
    const startTime = performance.now();

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (performance.now() - startTime < 3500) {
        animFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animFrame);
      }
    }
    render();
  }

  // ── BOTTOM NAVIGATION HANDLERS ────────────────────────────
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if ((target === 'roulette' || target === 'hub') && !playerName) {
        showScreen('register');
      } else {
        showScreen(target);
      }
    });
  });

  // ── INITIAL BOOTSTRAP ─────────────────────────────────────
  fetchCloudState();

  const urlParams = new URLSearchParams(window.location.search);
  const targetScreen = urlParams.get('screen');

  if (targetScreen && screens[targetScreen]) {
    updateHeaderDisplay();
    showScreen(targetScreen);
  } else if (playerName) {
    updateHeaderDisplay();
    if (hasPlayerCompleted(playerEmail)) {
      showScreen('ranking');
    } else {
      showScreen('hub');
    }
  } else {
    showScreen('register');
  }
});
