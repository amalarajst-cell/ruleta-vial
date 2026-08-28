// Main Application Controller - Instant Mobile & Auto-Advance Optimized
document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let currentMode = 'roulette'; // 'roulette' | 'stats'
  let score = 0;
  let streak = 0;
  
  // Current Active Player Session
  let currentPlayer = localStorage.getItem('vial_current_player') || '';
  let currentPlayerEmail = localStorage.getItem('vial_current_player_email') || '';
  let bestTime = currentPlayer ? parseFloat(localStorage.getItem(`vial_best_time_${currentPlayer}`) || '999') : 999;
  let history = JSON.parse(localStorage.getItem('vial_history') || '[]');
  let leaderboard = JSON.parse(localStorage.getItem('vial_leaderboard') || '[]');

  // 5-Question Round State
  let activeRound = null;
  let autoAdvanceTimeout = null;

  // DOM Elements
  const loginOverlay = document.getElementById('login-overlay');
  const loginInput = document.getElementById('login-player-input');
  const loginEmailInput = document.getElementById('login-email-input');
  const startSessionBtn = document.getElementById('btn-start-session');
  const activePlayerDisplay = document.getElementById('active-player-name');
  const changeUserBtn = document.getElementById('btn-change-user');

  const wheelContainer = document.getElementById('roulette-view');
  const statsContainer = document.getElementById('stats-view');

  const questionModal = document.getElementById('question-modal');
  const spinBtn = document.getElementById('btn-spin');
  const soundToggleBtn = document.getElementById('btn-sound');
  
  // Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab');

  // Active question state & Live timer
  let currentQuestion = null;
  let isAnswered = false;
  let questionStartTime = 0;
  let liveTimerInterval = null;
  let elapsedSeconds = 0;

  // Initialize Login State
  if (currentPlayer) {
    loginOverlay.classList.add('hidden');
    activePlayerDisplay.textContent = currentPlayer;
  } else {
    loginOverlay.classList.remove('hidden');
    setTimeout(() => loginInput.focus(), 300);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Handle Login Event
  function performLogin() {
    const val = loginInput.value.trim();
    const emailVal = loginEmailInput.value.trim();
    
    if (val.length === 0) {
      alert('Por favor ingresa tu nombre para poder participar en el ranking.');
      loginInput.focus();
      return;
    }
    
    if (emailVal.length === 0) {
      alert('Por favor ingresa tu correo electrónico.');
      loginEmailInput.focus();
      return;
    }
    
    if (!validateEmail(emailVal)) {
      alert('Por favor ingresa un correo electrónico válido.');
      loginEmailInput.focus();
      return;
    }
    
    // If player changed, reset current session stats
    if (currentPlayer.toLowerCase() !== val.toLowerCase()) {
      score = 0;
      streak = 0;
    }
    
    currentPlayer = val;
    currentPlayerEmail = emailVal;
    bestTime = parseFloat(localStorage.getItem(`vial_best_time_${currentPlayer}`) || '999');
    
    localStorage.setItem('vial_current_player', currentPlayer);
    localStorage.setItem('vial_current_player_email', currentPlayerEmail);
    activePlayerDisplay.textContent = currentPlayer;
    loginOverlay.classList.add('hidden');
    audioSystem.init();
    updateHeaderStats();
  }

  startSessionBtn?.addEventListener('click', performLogin);
  loginInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performLogin();
    }
  });
  loginEmailInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performLogin();
    }
  });

  changeUserBtn?.addEventListener('click', () => {
    loginInput.value = currentPlayer;
    loginEmailInput.value = currentPlayerEmail;
    loginOverlay.classList.remove('hidden');
    loginInput.focus();
  });

  // Initialize Roulette Engine
  const roulette = new RouletteWheel('roulette-canvas', {
    onSpinEnd: (category) => {
      start5QuestionRound(category);
    }
  });

  // Setup Event Listeners
  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      if (!currentPlayer) {
        loginOverlay.classList.remove('hidden');
        return;
      }
      if (!roulette.isSpinning) {
        roulette.spin();
      }
    });
  }

  // Permite girar haciendo clic directo en el canvas de la ruleta
  if (roulette.canvas) {
    roulette.canvas.addEventListener('click', () => {
      if (!currentPlayer) {
        loginOverlay.classList.remove('hidden');
        return;
      }
      if (!roulette.isSpinning) {
        roulette.spin();
      }
    });
  }

  // Sound toggle button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = audioSystem.toggleSound();
      soundToggleBtn.innerHTML = isEnabled 
        ? '🔊 <span class="hidden sm:inline">Sonido ON</span>' 
        : '🔇 <span class="hidden sm:inline">Sonido OFF</span>';
      soundToggleBtn.classList.toggle('opacity-60', !isEnabled);
    });
  }

  // Tab switching
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMode = tab.dataset.mode;
      switchMode(targetMode);
    });
  });

  // Global Close Modal Listener
  document.getElementById('btn-close-modal')?.addEventListener('click', () => {
    closeQuestionModal();
  });

  // Initialize stats UI
  updateHeaderStats();

  // Mode Switcher Function
  function switchMode(mode) {
    currentMode = mode;
    navTabs.forEach(t => {
      if (t.dataset.mode === mode) {
        t.classList.add('bg-amber-400', 'text-slate-900', 'shadow-md', 'font-extrabold');
        t.classList.remove('text-slate-300', 'hover:bg-slate-800');
      } else {
        t.classList.remove('bg-amber-400', 'text-slate-900', 'shadow-md', 'font-extrabold');
        t.classList.add('text-slate-300', 'hover:bg-slate-800');
      }
    });

    wheelContainer.classList.add('hidden');
    statsContainer.classList.add('hidden');

    if (mode === 'roulette') {
      wheelContainer.classList.remove('hidden');
    } else if (mode === 'stats') {
      statsContainer.classList.remove('hidden');
      renderStatsView();
    }
  }

  // Generate a pool of 5 questions for a category
  function start5QuestionRound(category) {
    const catId = category.id;
    const available = QUESTIONS.filter(q => q.category === catId);

    let roundQList = [];
    if (available.length >= 5) {
      roundQList = [...available].sort(() => Math.random() - 0.5).slice(0, 5);
    } else {
      // First, include all available questions of the requested category
      roundQList = [...available].sort(() => Math.random() - 0.5);
      
      // Get all other questions in the game to fill the remaining slots without repeating
      const otherQuestions = QUESTIONS.filter(q => q.category !== catId);
      const shuffledOthers = [...otherQuestions].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < shuffledOthers.length && roundQList.length < 5; i++) {
        roundQList.push(shuffledOthers[i]);
      }
    }

    activeRound = {
      category: category,
      questions: roundQList,
      currentIndex: 0,
      correctCount: 0,
      roundTimes: []
    };

    showQuestionInRound();
  }

  // Go to next question safely
  function advanceToNextQuestion() {
    clearTimeout(autoAdvanceTimeout);
    if (!activeRound) return;

    activeRound.currentIndex++;
    if (activeRound.currentIndex < activeRound.questions.length) {
      showQuestionInRound();
    } else {
      showRoundSummary();
    }
  }

  // Show current question in the round
  function showQuestionInRound() {
    clearTimeout(autoAdvanceTimeout);

    if (!activeRound || activeRound.currentIndex >= activeRound.questions.length) {
      showRoundSummary();
      return;
    }

    currentQuestion = activeRound.questions[activeRound.currentIndex];
    const catInfo = activeRound.category;
    const questionNum = activeRound.currentIndex + 1; // 1 to 5

    isAnswered = false;
    questionStartTime = performance.now();
    elapsedSeconds = 0;

    const modalBody = document.getElementById('modal-card-content');

    modalBody.innerHTML = `
      <!-- Header Badge & Timer -->
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold uppercase text-white" style="background-color: ${catInfo.color}">
            <span>${catInfo.icon}</span> ${catInfo.name}
          </span>
          <span class="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-extrabold text-xs border border-amber-400/30">
            ${questionNum} / 5
          </span>
        </div>
        
        <!-- Live Stopwatch -->
        <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full border border-amber-400/40">
          <span class="text-amber-400 font-bold text-xs animate-pulse">⏱ TIEMPO:</span>
          <span id="live-question-timer" class="font-mono text-amber-400 font-extrabold text-sm">0.0s</span>
        </div>
      </div>

      <h3 class="text-base md:text-lg font-extrabold text-slate-100 mb-3 leading-snug">
        ${currentQuestion.question}
      </h3>

      ${currentQuestion.imageSvg ? `<div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 mb-3 flex justify-center">${currentQuestion.imageSvg}</div>` : ''}
      ${currentQuestion.imageSrc ? `<div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 mb-3 flex justify-center"><img src="${currentQuestion.imageSrc}" class="w-32 h-32 object-contain filter drop-shadow-lg" alt="Señal de tránsito"></div>` : ''}

      <!-- Options -->
      <div class="space-y-2.5 mb-3" id="modal-options-container">
        ${currentQuestion.options.map((opt, idx) => `
          <button data-index="${idx}" class="option-btn w-full text-left p-3.5 rounded-xl border-2 border-slate-700 bg-slate-800/90 hover:bg-slate-700 hover:border-amber-400 transition-all font-medium text-slate-200 flex items-start gap-2.5 cursor-pointer text-sm sm:text-base active:scale-[0.98]">
            <span class="w-6 h-6 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-slate-300">
              ${String.fromCharCode(65 + idx)}
            </span>
            <span class="flex-1 leading-snug">${opt.replace(/^[A-C]\.\s*/, '')}</span>
          </button>
        `).join('')}
      </div>

      <!-- Explanation Box & Auto Progress Indicator -->
      <div id="explanation-box" class="hidden p-3.5 rounded-xl border mb-3 animate-fade-in text-xs sm:text-sm">
        <div class="font-bold flex items-center justify-between mb-1 text-sm" id="explanation-title-row">
          <span id="explanation-title"></span>
          <span id="explanation-time-tag" class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/30"></span>
        </div>
        <p class="text-slate-300 leading-relaxed" id="explanation-text">${currentQuestion.explanation}</p>
      </div>

      <!-- Next Action Button & Progress Bar -->
      <div id="next-action-container" class="hidden space-y-2 pt-1">
        <button id="btn-next-question" class="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2">
          <span>${questionNum < 5 ? `Siguiente Pregunta (${questionNum + 1}/5)` : 'Ver Resumen de la Ronda 🏆'}</span>
          <span>→</span>
        </button>
      </div>
    `;

    // Start Live Stopwatch
    clearInterval(liveTimerInterval);
    const timerElem = document.getElementById('live-question-timer');
    liveTimerInterval = setInterval(() => {
      if (!isAnswered) {
        elapsedSeconds = (performance.now() - questionStartTime) / 1000;
        if (timerElem) {
          timerElem.textContent = `${elapsedSeconds.toFixed(1)}s`;
        }
      }
    }, 100);

    // Option Buttons Click Handler
    const optionBtns = modalBody.querySelectorAll('.option-btn');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAnswered) return;
        isAnswered = true;
        clearInterval(liveTimerInterval);

        const selectedIdx = parseInt(btn.dataset.index);
        const finalTime = parseFloat(((performance.now() - questionStartTime) / 1000).toFixed(2));
        const isCorrect = selectedIdx === currentQuestion.correctAnswer;
        
        activeRound.roundTimes.push(finalTime);
        let questionScore = 0;

        if (isCorrect) {
          activeRound.correctCount++;
          audioSystem.playCorrect();
          const speedBonus = Math.max(0, Math.round((8 - finalTime) * 10));
          questionScore = 100 + speedBonus;
          score += questionScore;
          streak += 1;

          if (finalTime < bestTime) {
            bestTime = finalTime;
            localStorage.setItem(`vial_best_time_${currentPlayer}`, bestTime.toString());
          }

          saveToLeaderboard(currentPlayer, finalTime, questionScore, catInfo.name);
        } else {
          audioSystem.playWrong();
          streak = 0;
        }

        history.push({
          player: currentPlayer,
          email: currentPlayerEmail,
          questionId: currentQuestion.id,
          category: currentQuestion.category,
          isCorrect: isCorrect,
          timeSeconds: finalTime,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('vial_history', JSON.stringify(history));

        updateHeaderStats();

        // Highlight options immediately
        optionBtns.forEach((b, idx) => {
          b.disabled = true;
          b.classList.remove('cursor-pointer', 'active:scale-[0.98]', 'hover:border-amber-400', 'hover:bg-slate-700');
          if (idx === currentQuestion.correctAnswer) {
            b.classList.remove('border-slate-700', 'bg-slate-800/90');
            b.classList.add('border-emerald-500', 'bg-emerald-500/20', 'text-emerald-200', 'ring-2', 'ring-emerald-500');
          } else if (idx === selectedIdx && !isCorrect) {
            b.classList.remove('border-slate-700', 'bg-slate-800/90');
            b.classList.add('border-red-500', 'bg-red-500/20', 'text-red-200');
          } else {
            b.classList.add('opacity-40');
          }
        });

        // Show Explanation Box & Next Button
        const expBox = document.getElementById('explanation-box');
        const expTitle = document.getElementById('explanation-title');
        const expTimeTag = document.getElementById('explanation-time-tag');
        const nextContainer = document.getElementById('next-action-container');
        const nextBtn = document.getElementById('btn-next-question');

        expBox.classList.remove('hidden');

        if (expTimeTag) {
          expTimeTag.textContent = `⏱ Tiempo: ${finalTime}s ${isCorrect ? `(+${questionScore} pts)` : ''}`;
        }

        if (isCorrect) {
          expBox.classList.add('bg-emerald-950/60', 'border-emerald-500/50');
          expTitle.className = "font-extrabold flex items-center gap-2 text-sm sm:text-base text-emerald-400";
          expTitle.innerHTML = "¡Excelente! Respuesta Correcta 🎯";
        } else {
          expBox.classList.add('bg-red-950/60', 'border-red-500/50');
          expTitle.className = "font-extrabold flex items-center gap-2 text-sm sm:text-base text-red-400";
          expTitle.innerHTML = "Respuesta Incorrecta ❌";
        }

        nextContainer.classList.remove('hidden');

        // Next button manual click handler
        nextBtn.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          advanceToNextQuestion();
        };

        // Automatic advance after 1.5 seconds so user doesn't even need to click
        autoAdvanceTimeout = setTimeout(() => {
          advanceToNextQuestion();
        }, 1600);
      });
    });

    questionModal.classList.remove('hidden');
    questionModal.classList.add('flex');
  }

  // Summary when 5 questions are complete
  function showRoundSummary() {
    clearTimeout(autoAdvanceTimeout);
    if (!activeRound) return;
    
    const cat = activeRound.category;
    const correct = activeRound.correctCount;
    const avgTime = activeRound.roundTimes.length > 0 
      ? (activeRound.roundTimes.reduce((a, b) => a + b, 0) / activeRound.roundTimes.length).toFixed(2)
      : '0.00';

    if (correct >= 4) {
      audioSystem.playFanfare();
    }

    const modalBody = document.getElementById('modal-card-content');
    modalBody.innerHTML = `
      <div class="text-center py-4 space-y-5 animate-fade-in">
        <div class="text-5xl">${correct >= 4 ? '🎉' : correct >= 2 ? '👍' : '💪'}</div>
        
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase text-white" style="background-color: ${cat.color}">
            <span>${cat.icon}</span> ${cat.name}
          </span>
          <h2 class="text-2xl md:text-3xl font-black text-white mt-2">
            ¡Ronda de 5 Preguntas Completada!
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
            <span class="block text-xs text-slate-400 font-extrabold uppercase">Aciertos</span>
            <span class="text-3xl font-black ${correct >= 3 ? 'text-emerald-400' : 'text-amber-400'}">${correct} / 5</span>
          </div>
          <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
            <span class="block text-xs text-slate-400 font-extrabold uppercase">Tiempo Promedio</span>
            <span class="text-3xl font-black text-cyan-400 font-mono">${avgTime}s</span>
          </div>
        </div>

        <button id="btn-finish-round" class="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg shadow-xl cursor-pointer">
          🎯 Volver a Girar Ruleta
        </button>
      </div>
    `;

    document.getElementById('btn-finish-round')?.addEventListener('click', () => {
      closeQuestionModal();
    });
  }

  function closeQuestionModal() {
    clearTimeout(autoAdvanceTimeout);
    clearInterval(liveTimerInterval);
    activeRound = null;
    questionModal.classList.add('hidden');
    questionModal.classList.remove('flex');
  }

  function updateHeaderStats() {
    document.getElementById('stat-score').textContent = score;
    document.getElementById('stat-streak').textContent = streak;
    document.getElementById('stat-best-time').textContent = bestTime < 900 ? `${bestTime.toFixed(2)}s` : '--s';
  }

  function saveToLeaderboard(name, time, points, categoryName) {
    leaderboard.push({
      name: name || 'Participante',
      email: currentPlayerEmail || '',
      time: time,
      score: points,
      category: categoryName,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    leaderboard.sort((a, b) => a.time - b.time);
    leaderboard = leaderboard.slice(0, 25);
    localStorage.setItem('vial_leaderboard', JSON.stringify(leaderboard));
  }

  // --- STATS & LEADERBOARD VIEW LOGIC ---
  function renderStatsView() {
    const playerHistory = history.filter(h => h.player.toLowerCase() === currentPlayer.toLowerCase());
    const totalAnswered = playerHistory.length;
    const totalCorrect = playerHistory.filter(h => h.isCorrect).length;
    const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    statsContainer.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8">
        
        <!-- Active Player Card -->
        <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">👤</span>
            <div>
              <span class="text-xs text-slate-400 font-bold uppercase block">Participante Actual</span>
              <span class="text-lg font-black text-amber-400">${currentPlayer || 'Sin identificar'}</span>
              ${currentPlayerEmail ? `<span class="text-xs text-slate-400 block">${currentPlayerEmail}</span>` : ''}
            </div>
          </div>
          <button id="btn-stats-change-player" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase shadow">
            Registrar Nuevo Participante
          </button>
        </div>

        <!-- Leaderboard Table: Who was the fastest? -->
        <div class="bg-slate-800/90 border border-amber-400/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🏆</span>
              <div>
                <h3 class="font-black text-xl text-white">Tabla de Posiciones: Los Más Rápidos</h3>
                <p class="text-xs text-slate-400">Ranking ordenado por el menor tiempo de respuesta correcta en segundos</p>
              </div>
            </div>
            <button id="btn-clear-leaderboard" class="text-xs text-red-400 hover:underline">Reiniciar Tabla</button>
          </div>

          ${leaderboard.length === 0 ? `
            <div class="text-center py-8 text-slate-400 text-sm">
              Aún no hay registros de velocidad. ¡Ingresa con tu nombre, gira la ruleta y responde para encabezar la lista! 🚀
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="border-b border-slate-700 text-slate-400 text-xs uppercase font-extrabold">
                    <th class="pb-3 px-3"># Posición</th>
                    <th class="pb-3 px-3">Participante</th>
                    <th class="pb-3 px-3">Categoría</th>
                    <th class="pb-3 px-3 text-right">Tiempo de Respuesta</th>
                    <th class="pb-3 px-3 text-right">Puntos</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700/60 font-medium">
                  ${leaderboard.map((item, idx) => {
                    const badge = idx === 0 ? '🥇 1º' : idx === 1 ? '🥈 2º' : idx === 2 ? '🥉 3º' : `#${idx + 1}`;
                    const isCurrent = item.name.toLowerCase() === currentPlayer.toLowerCase();
                    return `
                      <tr class="${isCurrent ? 'bg-amber-400/10 font-bold' : 'hover:bg-slate-700/40'} transition-colors">
                        <td class="py-3 px-3 font-black ${idx === 0 ? 'text-amber-400 text-base' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-400'}">${badge}</td>
                        <td class="py-3 px-3 font-extrabold ${isCurrent ? 'text-amber-300' : 'text-slate-100'}">${item.name} ${isCurrent ? '<span class="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black ml-1">TÚ</span>' : ''}</td>
                        <td class="py-3 px-3 text-xs text-slate-400">${item.category}</td>
                        <td class="py-3 px-3 text-right font-mono font-black text-cyan-400 text-base">${item.time.toFixed(2)}s</td>
                        <td class="py-3 px-3 text-right font-bold text-amber-400">+${item.score}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Stat Cards Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-800/90 border border-slate-700 p-4 rounded-xl text-center">
            <span class="text-xs text-slate-400 uppercase font-extrabold">Respuestas Totales</span>
            <span class="block text-3xl font-black text-white mt-1">${totalAnswered}</span>
          </div>
          <div class="bg-slate-800/90 border border-slate-700 p-4 rounded-xl text-center">
            <span class="text-xs text-slate-400 uppercase font-extrabold">Precisión Global</span>
            <span class="block text-3xl font-black text-amber-400 mt-1">${accuracy}%</span>
          </div>
          <div class="bg-slate-800/90 border border-slate-700 p-4 rounded-xl text-center">
            <span class="text-xs text-slate-400 uppercase font-extrabold">Racha Actual</span>
            <span class="block text-3xl font-black text-emerald-400 mt-1">${streak}⚡</span>
          </div>
          <div class="bg-slate-800/90 border border-slate-700 p-4 rounded-xl text-center">
            <span class="text-xs text-slate-400 uppercase font-extrabold">Mejor Marca Rápida</span>
            <span class="block text-3xl font-black text-cyan-400 mt-1">${bestTime < 900 ? `${bestTime.toFixed(2)}s` : '--'}</span>
          </div>
        </div>

      </div>
    `;

    document.getElementById('btn-stats-change-player')?.addEventListener('click', () => {
      loginInput.value = '';
      loginOverlay.classList.remove('hidden');
      loginInput.focus();
    });

    document.getElementById('btn-clear-leaderboard')?.addEventListener('click', () => {
      if (confirm('¿Deseas reiniciar la tabla de posiciones del ranking?')) {
        leaderboard = [];
        localStorage.removeItem('vial_leaderboard');
        renderStatsView();
      }
    });
  }
});
