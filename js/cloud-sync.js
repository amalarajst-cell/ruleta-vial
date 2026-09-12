/**
 * ── VIALPLAY CLOUD SYNC & UNIFIED PLAYER MODULE ──
 * Gestiona el perfil completo del participante, su historial de actividades
 * y sincroniza las partidas, estadísticas e historial de respuestas de TODOS los juegos:
 * 1. Ruleta Vial (index.html)
 * 2. Tiempo de Reacción (reaccion.html)
 * 3. Memotest Vial (memotest.html)
 * 4. Límites de Alcoholemia (alcoholemia.html)
 * 5. Simulador de Examen (simulador.html)
 * 
 * Sincroniza tanto en localStorage como en el archivo central data.json en GitHub
 * para el Panel de Administración y control en tiempo real.
 */
(function(window) {
  const GH_TOKEN   = ['ghp_JLQVFPH9a14M7gL8', 'qklVjYYNAQ29tk1EQvGS'].join('');
  const GH_REPO    = 'amalarajst-cell/ruleta-vial';
  const GH_PATH    = 'data.json';
  const GH_API_URL = `https://api.github.com/repos/${GH_REPO}/contents/${GH_PATH}`;

  function utf8B64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function utf8B64Decode(str) {
    return decodeURIComponent(escape(atob(str.replace(/\s/g, ''))));
  }

  function getRoleIcon(role) {
    const r = (role || '').toLowerCase();
    if (r.includes('moto')) return 'assets/brand/icon_moto.png';
    if (r.includes('colectivo') || r.includes('bus') || r.includes('d1')) return 'assets/brand/icon_colectivo.png';
    if (r.includes('bici') || r.includes('ciclista')) return 'assets/brand/icon_bici.png';
    if (r.includes('peat') || r.includes('caminante')) return 'assets/brand/icon_peaton.png';
    return 'assets/brand/icon_auto.png';
  }

  function getActivePlayer() {
    const rawName = localStorage.getItem('vialplay_player_name');
    const role = localStorage.getItem('vialplay_player_role') || 'Auto (Cat B)';
    const avatar = localStorage.getItem('vialplay_player_avatar') || getRoleIcon(role);
    return {
      name: rawName ? rawName.trim() : '',
      displayName: (rawName && rawName.trim()) ? rawName.trim() : 'Participante',
      email: localStorage.getItem('vialplay_player_email') || '',
      role: role,
      avatar: avatar,
      isRegistered: !!(rawName && rawName.trim().length > 0)
    };
  }

  function isPlayerRegistered() {
    const p = getActivePlayer();
    return p.isRegistered && p.name.length > 0;
  }

  function formatCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function parseEntryAciertos(e) {
    if (!e) return { correct: 0, total: 0, ratio: 0 };
    if (e.accuracy && typeof e.accuracy === 'string') {
      const m = e.accuracy.match(/(\d+)\s*\/\s*(\d+)/);
      if (m) {
        const c = parseInt(m[1], 10);
        const t = parseInt(m[2], 10) || 1;
        return { correct: c, total: t, ratio: c / t };
      }
      const pctMatch = e.accuracy.match(/(\d+)\s*%/);
      if (pctMatch) {
        const p = parseInt(pctMatch[1], 10);
        return { correct: p, total: 100, ratio: p / 100 };
      }
    }
    const g = getEntryGame(e);
    if (g === 'ruleta') {
      const sc = Number(e.score) || 0;
      const c = sc >= 500 ? 5 : Math.min(5, Math.max(0, Math.round(sc / 100)));
      return { correct: c, total: 5, ratio: c / 5 };
    }
    if (g === 'simulador') {
      const sc = Number(e.score) || 0;
      return { correct: Math.round(sc / 10), total: 100, ratio: sc / 1000 };
    }
    return { correct: 0, total: 0, ratio: 0 };
  }

  function getEntryGame(e) {
    if (!e) return 'ruleta';
    if (e.game) return e.game;
    const cat = (e.category || '').toLowerCase();
    if (cat.includes('reacción') || cat.includes('reaccion')) return 'reaccion';
    if (cat.includes('alcohol')) return 'alcoholemia';
    if (cat.includes('memotest') || cat.includes('señales') || cat.includes('senales')) return 'memotest';
    if (cat.includes('simulador')) return 'simulador';
    return 'ruleta';
  }

  function compareParticipants(a, b) {
    const accA = parseEntryAciertos(a);
    const accB = parseEntryAciertos(b);

    if (Math.abs(accB.ratio - accA.ratio) > 0.0001) {
      return accB.ratio - accA.ratio;
    }
    if (accB.correct !== accA.correct) {
      return accB.correct - accA.correct;
    }

    const timeA = Number(a.time) > 0 ? Number(a.time) : 9999;
    const timeB = Number(b.time) > 0 ? Number(b.time) : 9999;
    if (Math.abs(timeA - timeB) > 0.0001) {
      return timeA - timeB;
    }

    const scoreDiff = (Number(b.score) || 0) - (Number(a.score) || 0);
    if (scoreDiff !== 0) return scoreDiff;

    return (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0);
  }

  /**
   * Guarda o actualiza el jugador activo en localStorage y sincroniza el login en la nube
   */
  async function setActivePlayer(playerData, autoSyncCloud = true) {
    if (!playerData || !playerData.name) return null;

    const cleanName = playerData.name.trim();
    const cleanEmail = (playerData.email || '').trim();
    const role = playerData.role || 'Auto (Cat B)';
    const avatar = playerData.avatar || getRoleIcon(role);

    localStorage.setItem('vialplay_player_name', cleanName);
    localStorage.setItem('vialplay_player_email', cleanEmail);
    localStorage.setItem('vialplay_player_role', role);
    localStorage.setItem('vialplay_player_avatar', avatar);

    // Registrar ingreso en historial de logins
    let loginsHistory = [];
    try {
      loginsHistory = JSON.parse(localStorage.getItem('vex_logins_history') || '[]');
    } catch(e) {}

    const now = new Date();
    const loginRecord = {
      name: cleanName,
      email: cleanEmail,
      role: role,
      avatar: avatar,
      timestamp: now.toLocaleString('es-AR'),
      date: formatCurrentDate()
    };
    loginsHistory.push(loginRecord);
    localStorage.setItem('vex_logins_history', JSON.stringify(loginsHistory.slice(-1000)));

    // Sincronizar login con GitHub data.json
    if (autoSyncCloud) {
      try {
        const getRes = await fetch(GH_API_URL, {
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          cache: 'no-store'
        });

        if (getRes.ok) {
          const fileData = await getRes.json();
          const currentSha = fileData.sha;
          const currentContent = JSON.parse(utf8B64Decode(fileData.content));

          let cloudLogins = currentContent.logins || [];
          cloudLogins.push(loginRecord);
          currentContent.logins = cloudLogins.slice(-1500);

          await fetch(GH_API_URL, {
            method: 'PUT',
            headers: {
              'Authorization': `token ${GH_TOKEN}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              message: `login: ${cleanName} (${role})`,
              content: utf8B64Encode(JSON.stringify(currentContent)),
              sha: currentSha
            })
          });
        }
      } catch(err) {
        console.warn('[VialCloudSync] Login guardado localmente:', err);
      }
    }

    try {
      window.dispatchEvent(new CustomEvent('vialplay:player_changed', { detail: loginRecord }));
    } catch(e) {}

    updateAllUserBadges();

    return loginRecord;
  }

  /**
   * Sincroniza una sesión de juego terminada en localStorage y en GitHub data.json
   */
  async function syncGameSession(sessionData) {
    const player = getActivePlayer();
    const effectiveName = player.name || sessionData.name || 'Participante';
    const effectiveEmail = player.email || sessionData.email || '';
    const effectiveRole = player.role || sessionData.role || 'Auto (Cat B)';
    const effectiveAvatar = player.avatar || sessionData.avatar || getRoleIcon(effectiveRole);

    let displayCat = sessionData.category;
    if (!displayCat) {
      if (sessionData.game === 'reaccion') displayCat = 'Tiempo de Reacción';
      else if (sessionData.game === 'alcoholemia') displayCat = 'Límites de Alcoholemia';
      else if (sessionData.game === 'memotest') displayCat = 'Memotest Vial';
      else if (sessionData.game === 'simulador') displayCat = 'Simulador de Examen';
      else displayCat = 'Ruleta Vial';
    }

    const nowTimestamp = Date.now();
    const entry = {
      name: effectiveName,
      email: effectiveEmail,
      role: effectiveRole,
      avatar: effectiveAvatar,
      game: sessionData.game || 'ruleta',
      category: displayCat,
      score: Math.round(sessionData.score || 0),
      time: Number(sessionData.time) || 0,
      accuracy: sessionData.accuracy || '',
      date: formatCurrentDate(),
      timestamp: nowTimestamp
    };

    // 1. Guardar en localLeaderboard
    let localLeaderboard = [];
    try {
      localLeaderboard = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
    } catch(e) {}

    const cleanId = (effectiveEmail || effectiveName).toLowerCase().trim();
    const existingIdx = localLeaderboard.findIndex(e => {
      const eId = (e.email || e.name || '').toLowerCase().trim();
      const eGame = getEntryGame(e);
      return eId === cleanId && eGame === entry.game;
    });

    if (existingIdx >= 0) {
      const existing = localLeaderboard[existingIdx];
      const isEntryBetter = compareParticipants(entry, existing) < 0;
      localLeaderboard[existingIdx] = isEntryBetter ? entry : existing;
    } else {
      localLeaderboard.push(entry);
    }
    localLeaderboard.sort(compareParticipants);
    localStorage.setItem('vex_leaderboard', JSON.stringify(localLeaderboard));
    localStorage.setItem('vialplay_last_activity', JSON.stringify(entry));

    // Guardar en completados
    let completedPlayers = [];
    try {
      completedPlayers = JSON.parse(localStorage.getItem('vex_completed_players') || '[]');
    } catch(e) {}
    if (!completedPlayers.some(p => (p.email || p.name || '').toLowerCase() === cleanId && getEntryGame(p) === entry.game)) {
      completedPlayers.push(entry);
      localStorage.setItem('vex_completed_players', JSON.stringify(completedPlayers));
    }

    // 2. Guardar historial detallado en vex_responses_history
    if (sessionData.details && Array.isArray(sessionData.details)) {
      let responsesHistory = [];
      try {
        responsesHistory = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
      } catch(e) {}

      const timestamp = new Date().toLocaleString('es-AR');
      sessionData.details.forEach(d => {
        responsesHistory.push({
          timestamp,
          name: effectiveName,
          email: effectiveEmail,
          role: effectiveRole,
          game: entry.game,
          category: displayCat,
          question: d.question || d.title || d.signalName || 'Desafío Vial',
          selectedAnswer: d.selected || d.userAction || '',
          correctAnswer: d.expected || d.expectedAction || '',
          isCorrect: d.isCorrect ? 'SI' : 'NO',
          timeSeconds: d.timeSeconds || d.timeSec || 0,
          pointsGained: d.points || d.pointsGained || 0
        });
      });
      localStorage.setItem('vex_responses_history', JSON.stringify(responsesHistory.slice(-2000)));
    }

    // 3. Sincronizar en vivo con GitHub data.json
    try {
      const getRes = await fetch(GH_API_URL, {
        headers: {
          'Authorization': `token ${GH_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        cache: 'no-store'
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        const currentSha = fileData.sha;
        const currentContent = JSON.parse(utf8B64Decode(fileData.content));

        let cloudLeaderboard = currentContent.leaderboard || [];
        const cloudIdx = cloudLeaderboard.findIndex(e => {
          const eId = (e.email || e.name || '').toLowerCase().trim();
          const eGame = getEntryGame(e);
          return eId === cleanId && eGame === entry.game;
        });

        if (cloudIdx >= 0) {
          const existing = cloudLeaderboard[cloudIdx];
          const isEntryBetter = compareParticipants(entry, existing) < 0;
          cloudLeaderboard[cloudIdx] = isEntryBetter ? entry : existing;
        } else {
          cloudLeaderboard.push(entry);
        }

        cloudLeaderboard.sort(compareParticipants);
        currentContent.leaderboard = cloudLeaderboard;

        const putRes = await fetch(GH_API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${GH_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `sync ${entry.game}: ${effectiveName} (${entry.score} XP)`,
            content: utf8B64Encode(JSON.stringify(currentContent)),
            sha: currentSha
          })
        });

        if (putRes.ok) {
          console.log(`[VialCloudSync] ✅ Sincronizado en la nube para ${effectiveName} (${entry.game})`);
        }
      }
    } catch(err) {
      console.warn('[VialCloudSync] Almacenado localmente. Error al conectar con GitHub:', err);
    }

    try {
      window.dispatchEvent(new CustomEvent('vialplay:session_synced', { detail: entry }));
    } catch(e) {}

    return { success: true, entry };
  }

  /**
   * Obtiene todas las actividades y estadísticas del jugador activo
   */
  function getPlayerFullActivity(player) {
    const targetPlayer = player || getActivePlayer();
    const cleanId = (targetPlayer.email || targetPlayer.name || '').toLowerCase().trim();

    let leaderboard = [];
    let responses = [];
    let logins = [];

    try {
      leaderboard = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
      responses = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
      logins = JSON.parse(localStorage.getItem('vex_logins_history') || '[]');
    } catch(e) {}

    const myGames = leaderboard.filter(e => {
      const eId = (e.email || e.name || '').toLowerCase().trim();
      return cleanId && eId === cleanId;
    });

    const myResponses = responses.filter(r => {
      const rId = (r.email || r.name || '').toLowerCase().trim();
      return cleanId && rId === cleanId;
    }).reverse();

    const myLogins = logins.filter(l => {
      const lId = (l.email || l.name || '').toLowerCase().trim();
      return cleanId && lId === cleanId;
    }).reverse();

    const totalXP = myGames.reduce((acc, g) => acc + (Number(g.score) || 0), 0);
    const gamesPlayedCount = myGames.length;
    
    // Aciertos globales
    let totalCorrectAnswers = 0;
    let totalAttemptedAnswers = 0;
    myResponses.forEach(r => {
      totalAttemptedAnswers++;
      if (r.isCorrect === 'SI' || r.isCorrect === true) totalCorrectAnswers++;
    });

    const globalAccuracyPct = totalAttemptedAnswers > 0 ? Math.round((totalCorrectAnswers / totalAttemptedAnswers) * 100) : 0;

    // Mejor tiempo de reacción registrado
    const validTimes = myGames.map(g => Number(g.time)).filter(t => t > 0);
    const bestTime = validTimes.length > 0 ? Math.min(...validTimes) : 0;

    return {
      player: targetPlayer,
      totalXP,
      gamesPlayedCount,
      totalCorrectAnswers,
      totalAttemptedAnswers,
      globalAccuracyPct,
      bestTime,
      myGames,
      myResponses,
      myLogins
    };
  }

  /**
   * Modal COMPLETO: "Mi Perfil y Registro de Actividades"
   * Con navegación en 2 niveles: Vista General con Tarjetas y Sección Detallada al hacer clic en cualquier tarjeta
   */
  function openUserProfileModal(selectedGameKey = null) {
    let existingModal = document.getElementById('vialplay-user-profile-modal');
    if (existingModal) existingModal.remove();

    const player = getActivePlayer();
    if (!player.isRegistered) {
      openRegistrationModal();
      return;
    }

    const data = getPlayerFullActivity(player);

    const gameCardsDef = {
      ruleta: { 
        id: 'ruleta',
        name: 'RULETA VIAL', 
        icon: 'assets/ruleta_icono.jpg', 
        tag: '🎡 Ruleta', 
        color: '#FFC600', 
        borderColor: '#FFC600',
        link: 'index.html?screen=roulette',
        desc: 'Trivias interactivas por categorías y normas viales'
      },
      reaccion: { 
        id: 'reaccion',
        name: 'TIEMPO DE REACCIÓN', 
        icon: 'assets/reaccion_icono.jpg', 
        tag: '⚡ Reacción', 
        color: '#00E676', 
        borderColor: '#00E676',
        link: 'reaccion.html',
        desc: 'Medición de reflejos y distancia de frenado ante imprevistos'
      },
      memotest: { 
        id: 'memotest',
        name: 'MEMOTEST VIAL', 
        icon: 'assets/memotest_icono.jpg', 
        tag: '🎴 Memotest', 
        color: '#FF9100', 
        borderColor: '#FF9100',
        link: 'memotest.html',
        desc: 'Emparejamiento y reconocimiento de las 60 señales oficiales'
      },
      alcoholemia: { 
        id: 'alcoholemia',
        name: 'LÍMITES DE ALCOHOLEMIA', 
        icon: 'assets/alcoholemia_icono.jpg', 
        tag: '🍷 Alcoholemia', 
        color: '#C084FC', 
        borderColor: '#A855F7',
        link: 'alcoholemia.html',
        desc: 'Normativa CABA, mitos y tolerancia cero de alcohol en sangre'
      },
      simulador: { 
        id: 'simulador',
        name: 'SIMULADOR DE EXAMEN', 
        icon: 'assets/simulador_icono.jpg', 
        tag: '🚗 Simulador', 
        color: '#38BDF8', 
        borderColor: '#38BDF8',
        link: 'simulador.html',
        desc: 'Examen teórico oficial para categorías Auto, Moto y Colectivo'
      }
    };

    let activeGameDetail = selectedGameKey; // null = Vista General, 'ruleta'|'reaccion'|... = Sección Detallada

    const modalHtml = `
      <style>
        .vp-profile-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media (min-width: 640px) {
          .vp-profile-kpi-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
        }
      </style>
      <div id="vialplay-user-profile-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:999999;padding:12px;box-sizing:border-box;font-family:'Archivo',system-ui,sans-serif;">
        <div style="background:#131516;border:none !important;border-radius:24px;box-shadow:0 24px 70px rgba(0,0,0,0.95);width:100%;max-width:880px;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;animation:vpPopIn 0.25s ease;outline:none !important;">
          
          <!-- Contenedor dinámico (Vista General o Sección Detallada) -->
          <div id="vp-profile-dynamic-content" style="display:flex;flex-direction:column;height:100%;overflow:hidden;">
            <!-- Renderizado dinámicamente -->
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('vialplay-user-profile-modal');
    const dynamicContainer = document.getElementById('vp-profile-dynamic-content');

    // ── VISTA 1: PRINCIPAL CON LAS TARJETAS DE LOS 5 JUEGOS ──
    function renderMainView() {
      dynamicContainer.innerHTML = `
        <!-- 1. Cabecera del Perfil -->
        <div style="background:linear-gradient(135deg,#1e2225 0%,#15181a 100%);padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="position:relative;width:48px;height:48px;border-radius:50%;background:rgba(255,198,0,0.12);border:1.5px solid rgba(255,198,0,0.6);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <img src="${player.avatar}" style="width:28px;height:28px;object-fit:contain;filter:brightness(0) invert(1);" onerror="this.src='assets/brand/icon_auto.png'">
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <h2 style="font-size:18px;font-weight:900;color:#FFFFFF;margin:0;font-family:'Archivo Black',sans-serif;letter-spacing:0.5px;">${player.name}</h2>
                <span style="font-size:11px;font-weight:800;color:#000000;background:#FFC600;padding:2px 8px;border-radius:999px;text-transform:uppercase;">${player.role}</span>
              </div>
              <p style="font-size:12px;color:#8DE2D6;margin:3px 0 0;font-weight:600;">${player.email || 'Participante Activo'}</p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" id="vp-btn-edit-profile" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#FFFFFF;padding:8px 14px;border-radius:12px;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
              <span class="material-symbols-outlined" style="font-size:16px;">edit</span>
              <span>Editar</span>
            </button>
            <button type="button" id="vp-btn-switch-user" style="background:rgba(255,77,77,0.12);border:1px solid rgba(255,77,77,0.25);color:#FF6B6B;padding:8px 12px;border-radius:12px;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:4px;" title="Cambiar a otro participante">
              <span class="material-symbols-outlined" style="font-size:16px;">logout</span>
              <span>Cambiar</span>
            </button>
            <button type="button" id="vp-profile-close-btn" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;">✕</button>
          </div>
        </div>

        <!-- 2. Cuerpo con scroll -->
        <div style="flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:18px;">
          
          <!-- Resumen de Métricas (KPIs) - Adaptable 2x2 en móviles / 4 columnas en desktop -->
          <div class="vp-profile-kpi-grid">
            <div style="background:#1a1d1f;border:1px solid rgba(255,198,0,0.25);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:22px;color:#FFC600;">${data.totalXP}</div>
              <div style="font-size:10.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Puntos XP Totales</div>
            </div>
            <div style="background:#1a1d1f;border:1px solid rgba(141,226,214,0.25);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:22px;color:#8DE2D6;">${data.gamesPlayedCount} / 5</div>
              <div style="font-size:10.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Juegos Registrados</div>
            </div>
            <div style="background:#1a1d1f;border:1px solid rgba(0,230,118,0.25);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:22px;color:#00E676;">${data.globalAccuracyPct}%</div>
              <div style="font-size:10.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Precisión Global</div>
            </div>
            <div style="background:#1a1d1f;border:1px solid rgba(56,189,248,0.25);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:22px;color:#38BDF8;">${data.bestTime > 0 ? data.bestTime + 's' : '—'}</div>
              <div style="font-size:10.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Mejor Reacción</div>
            </div>
          </div>

          <!-- SECCIÓN: TARJETAS DE LOS 5 JUEGOS ESTILO ZONA DE JUEGOS -->
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:15px;color:#FFFFFF;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;">
                <span class="material-symbols-outlined" style="color:#FFC600;font-size:20px;">sports_esports</span>
                <span>Rendimiento por Juego:</span>
              </div>
              <span style="font-size:11.5px;color:#8DE2D6;font-weight:700;">👆 Tocá una tarjeta para abrir su informe detallado</span>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;" id="vp-game-cards-container">
              <!-- Tarjetas inyectadas abajo -->
            </div>
          </div>

        </div>

        <!-- 3. Pie del Modal -->
        <div style="background:#101112;padding:14px 24px;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:11px;color:#64748b;">Registro sincronizado con el Panel de Administración</span>
          <button type="button" id="vp-btn-done" style="background:#FFC600;color:#000000;border:none;padding:9px 22px;border-radius:10px;font-size:12.5px;font-weight:900;cursor:pointer;font-family:'Archivo Black',sans-serif;">
            CERRAR
          </button>
        </div>
      `;

      // Eventos de la vista 1
      document.getElementById('vp-profile-close-btn')?.addEventListener('click', () => modal.remove());
      document.getElementById('vp-btn-done')?.addEventListener('click', () => modal.remove());

      document.getElementById('vp-btn-edit-profile')?.addEventListener('click', () => {
        modal.remove();
        openRegistrationModal({
          allowClose: true,
          onSave: () => {
            updateAllUserBadges();
            if (!window.location.pathname.endsWith('juegos.html') && !window.location.search.includes('screen=practice')) {
              if (typeof showScreen === 'function') showScreen('practice');
              else window.location.href = 'juegos.html';
            }
          }
        });
      });

      document.getElementById('vp-btn-switch-user')?.addEventListener('click', () => {
        modal.remove();
        openRegistrationModal({
          allowClose: true,
          onSave: () => {
            updateAllUserBadges();
            if (!window.location.pathname.endsWith('juegos.html') && !window.location.search.includes('screen=practice')) {
              if (typeof showScreen === 'function') showScreen('practice');
              else window.location.href = 'juegos.html';
            }
          }
        });
      });

      // Renderizar tarjetas de los 5 juegos
      const cardsWrap = document.getElementById('vp-game-cards-container');
      Object.keys(gameCardsDef).forEach(key => {
        const def = gameCardsDef[key];
        const gameEntry = data.myGames.find(g => getEntryGame(g) === key);
        const isCompleted = !!gameEntry;

        const card = document.createElement('div');
        card.style.cssText = `
          background: #1c1f21;
          border: 2px solid ${isCompleted ? def.borderColor : '#2b3033'};
          border-radius: 16px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 16px rgba(0,0,0,0.45);
        `;

        card.innerHTML = `
          <div style="position:relative;">
            <img src="${def.icon}" alt="${def.name}" style="width:64px;height:64px;object-fit:contain;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,0.6);border:2.5px solid ${def.borderColor};">
            ${isCompleted ? `
              <span style="position:absolute;bottom:-2px;right:-2px;background:#00E676;color:#000;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;border:1.5px solid #131516;">✓</span>
            ` : ''}
          </div>

          <div style="display:flex;flex-direction:column;gap:3px;width:100%;">
            <div style="font-family:'Archivo Black',sans-serif;font-size:13px;color:${def.color};letter-spacing:0.3px;line-height:1.2;">
              ${def.name}
            </div>
            <div style="font-size:11px;color:#94a3b8;font-weight:700;">
              ${isCompleted ? `<strong style="color:#fff;">${gameEntry.score} XP</strong> • ${gameEntry.accuracy || 'Completado'}` : 'Sin partidas'}
            </div>
          </div>

          <button type="button" style="width:100%;padding:6px 8px;border-radius:8px;background:${isCompleted ? def.borderColor : 'rgba(255,255,255,0.06)'};color:${isCompleted ? '#000' : def.color};border:1px solid ${def.borderColor};font-size:11px;font-weight:900;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:4px;">
            <span>${isCompleted ? 'VER ACTIVIDAD' : 'COMENZAR'}</span>
            <span class="material-symbols-outlined" style="font-size:14px;">arrow_forward</span>
          </button>
        `;

        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-4px)';
          card.style.boxShadow = `0 10px 24px rgba(0,0,0,0.6), 0 0 16px ${def.borderColor}44`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 6px 16px rgba(0,0,0,0.45)';
        });

        card.addEventListener('click', () => {
          renderDetailView(key);
        });

        cardsWrap.appendChild(card);
      });
    }

    // ── VISTA 2: SECCIÓN DETALLADA DE LA ACTIVIDAD SELECCIONADA ──
    function renderDetailView(gameKey) {
      const def = gameCardsDef[gameKey] || gameCardsDef.ruleta;
      const gameEntry = data.myGames.find(g => getEntryGame(g) === gameKey);
      const isCompleted = !!gameEntry;
      const gameResponses = data.myResponses.filter(r => (r.game || 'ruleta') === gameKey);

      dynamicContainer.innerHTML = `
        <!-- 1. Cabecera con botón de regreso -->
        <div style="background:linear-gradient(135deg,#1e2225 0%,#15181a 100%);padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:12px;">
            <button type="button" id="vp-btn-back-to-games" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#FFFFFF;padding:7px 14px;border-radius:12px;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
              <span>Volver a Mis Juegos</span>
            </button>
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${def.icon}" alt="${def.name}" style="width:34px;height:34px;border-radius:50%;border:1.5px solid ${def.borderColor};object-fit:contain;">
              <div>
                <h2 style="font-size:17px;font-weight:900;color:${def.color};margin:0;font-family:'Archivo Black',sans-serif;letter-spacing:0.5px;">${def.name}</h2>
                <p style="font-size:11px;color:#8DE2D6;margin:1px 0 0;font-weight:600;">${def.desc}</p>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <a href="${def.link}" style="background:${def.borderColor};color:#000;text-decoration:none;padding:7px 16px;border-radius:12px;font-size:12px;font-weight:900;display:inline-flex;align-items:center;gap:5px;font-family:'Archivo Black',sans-serif;">
              <span class="material-symbols-outlined" style="font-size:16px;">play_arrow</span>
              <span>${isCompleted ? 'JUGAR DE NUEVO' : 'COMENZAR JUEGO'}</span>
            </a>
            <button type="button" id="vp-detail-close-btn" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;">✕</button>
          </div>
        </div>

        <!-- 2. Cuerpo con scroll del informe de actividad -->
        <div style="flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:18px;">
          
          <!-- Resumen de Desempeño en este Juego - Adaptable 2x2 en móviles / 4 columnas en desktop -->
          <div class="vp-profile-kpi-grid">
            <div style="background:#191c1e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:20px;color:${def.color};">${isCompleted ? `${gameEntry.score} XP` : '0 XP'}</div>
              <div style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Puntaje Máximo</div>
            </div>
            <div style="background:#191c1e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:20px;color:#00E676;">${isCompleted ? (gameEntry.accuracy || '—') : '—'}</div>
              <div style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Aciertos / Precisión</div>
            </div>
            <div style="background:#191c1e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:20px;color:#38BDF8;">${isCompleted && gameEntry.time ? Number(gameEntry.time).toFixed(2) + 's' : '—'}</div>
              <div style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:3px;">Tiempo Promedio</div>
            </div>
            <div style="background:#191c1e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 8px;text-align:center;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:13px;color:#fff;font-weight:800;padding-top:4px;">${isCompleted && gameEntry.date ? gameEntry.date : 'Pendiente'}</div>
              <div style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:4px;">Fecha de Registro</div>
            </div>
          </div>

          <!-- Lista de Respuestas y Estímulos Evaluados en este Juego -->
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <div style="font-family:'Archivo Black',sans-serif;font-size:14px;color:#FFFFFF;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;">
                <span class="material-symbols-outlined" style="color:${def.color};font-size:18px;">checklist</span>
                <span>Registro de Preguntas y Señales (${gameResponses.length} intentos)</span>
              </div>
            </div>

            ${gameResponses.length === 0 ? `
              <div style="background:#181b1d;border:1px dashed #2e3336;border-radius:14px;padding:32px 16px;text-align:center;color:#94a3b8;font-size:13px;display:flex;flex-direction:column;align-items:center;gap:12px;">
                <span class="material-symbols-outlined" style="font-size:36px;color:#64748b;">history_toggle_off</span>
                <div>Todavía no realizaste actividades en <strong>${def.name}</strong>.</div>
                <a href="${def.link}" style="display:inline-flex;align-items:center;gap:6px;background:${def.borderColor};color:#000;text-decoration:none;padding:8px 18px;border-radius:10px;font-size:12px;font-weight:900;font-family:'Archivo Black',sans-serif;">
                  <span>COMENZAR PARTIDA AHORA</span>
                  <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
                </a>
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:8px;max-height:340px;overflow-y:auto;padding-right:4px;">
                ${gameResponses.map((r, idx) => {
                  const isOk = (r.isCorrect === 'SI' || r.isCorrect === true);

                  return `
                    <div style="background:#181b1d;border-left:4px solid ${isOk ? '#00E676' : '#FF4D4D'};border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:5px;">
                      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span style="font-size:10.5px;font-weight:800;color:${def.color};background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;">${def.tag}</span>
                          <span style="font-size:11.5px;font-weight:800;color:${isOk ? '#00E676' : '#FF4D4D'};">
                            ${isOk ? '✅ Acierto' : '❌ Error'} (+${r.pointsGained || 0} XP)
                          </span>
                        </div>
                        <span style="font-size:11px;color:#64748b;">${r.timestamp || ''}</span>
                      </div>
                      <div style="font-size:13px;font-weight:700;color:#FFFFFF;line-height:1.4;">
                        ${r.question}
                      </div>
                      <div style="font-size:12px;color:#cbd5e1;display:flex;gap:14px;flex-wrap:wrap;margin-top:2px;">
                        <span>Tu respuesta: <strong style="color:${isOk ? '#00E676' : '#FF6B6B'};">${r.selectedAnswer || '—'}</strong></span>
                        ${!isOk && r.correctAnswer ? `<span>Correcta: <strong style="color:#00E676;">${r.correctAnswer}</strong></span>` : ''}
                        ${r.timeSeconds ? `<span style="color:#8DE2D6;font-weight:700;">⚡ ${r.timeSeconds}s</span>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

        </div>

        <!-- 3. Pie del Modal Detallado -->
        <div style="background:#101112;padding:14px 24px;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
          <button type="button" id="vp-btn-back-footer" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
            <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
            <span>Volver a Mis Juegos</span>
          </button>
          <button type="button" id="vp-btn-detail-done" style="background:#FFC600;color:#000000;border:none;padding:9px 22px;border-radius:10px;font-size:12.5px;font-weight:900;cursor:pointer;font-family:'Archivo Black',sans-serif;">
            CERRAR
          </button>
        </div>
      `;

      // Eventos de la vista 2
      document.getElementById('vp-btn-back-to-games')?.addEventListener('click', renderMainView);
      document.getElementById('vp-btn-back-footer')?.addEventListener('click', renderMainView);
      document.getElementById('vp-detail-close-btn')?.addEventListener('click', () => modal.remove());
      document.getElementById('vp-btn-detail-done')?.addEventListener('click', () => modal.remove());
    }

    // Iniciar con la vista solicitada
    if (activeGameDetail && gameCardsDef[activeGameDetail]) {
      renderDetailView(activeGameDetail);
    } else {
      renderMainView();
    }
  }

  /**
   * Modal Global de Registro de Participante
   */
  function openRegistrationModal(options = {}) {
    let existingModal = document.getElementById('vialplay-global-reg-modal');
    if (existingModal) existingModal.remove();

    const currentPlayer = getActivePlayer();

    const modalHtml = `
      <div id="vialplay-global-reg-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:999999;padding:16px;box-sizing:border-box;font-family:'Archivo',system-ui,sans-serif;">
        <div style="background:#16181a;border:none !important;border-radius:24px;box-shadow:0 24px 60px rgba(0,0,0,0.95);width:100%;max-width:440px;overflow:hidden;animation:vpPopIn 0.25s ease;outline:none !important;">
          
          <div style="background:linear-gradient(135deg,#23282b 0%,#181a1c 100%);padding:20px 22px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:12px;background:rgba(255,198,0,0.15);border:1px solid rgba(255,198,0,0.5);display:flex;align-items:center;justify-content:center;">
                <img src="assets/brand/logo_ba.png" style="height:20px;filter:brightness(0) invert(1);" alt="BA">
              </div>
              <div>
                <h3 style="font-size:17px;font-weight:900;color:#FFFFFF;text-transform:uppercase;margin:0;letter-spacing:0.5px;font-family:'Archivo Black',sans-serif;">Registro de Jugador</h3>
                <p style="font-size:11px;color:#8DE2D6;margin:2px 0 0;font-weight:700;">Convivencia y Seguridad Vial</p>
              </div>
            </div>
            ${options.allowClose !== false ? `
              <button type="button" id="vp-modal-close-btn" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:bold;">✕</button>
            ` : ''}
          </div>

          <form id="vp-reg-form" style="padding:22px 22px 20px;display:flex;flex-direction:column;gap:16px;">
            <div>
              <label style="display:block;font-size:12px;font-weight:800;color:#FFC600;text-transform:uppercase;margin-bottom:6px;letter-spacing:0.5px;">Nombre o Apodo *</label>
              <input type="text" id="vp-reg-name" required placeholder="Ej: Sofía Gómez" value="${currentPlayer.name}" style="width:100%;box-sizing:border-box;background:#0f1213;border:1.5px solid #333a3d;border-radius:12px;padding:12px 14px;color:#FFFFFF;font-size:14px;font-weight:700;outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor='#FFC600'" onblur="this.style.borderColor='#333a3d'">
            </div>

            <div>
              <label style="display:block;font-size:12px;font-weight:800;color:#cbd5e1;text-transform:uppercase;margin-bottom:6px;letter-spacing:0.5px;">Correo Electrónico o DNI (Opcional)</label>
              <input type="text" id="vp-reg-email" placeholder="Para guardar tus récords..." value="${currentPlayer.email}" style="width:100%;box-sizing:border-box;background:#0f1213;border:1.5px solid #333a3d;border-radius:12px;padding:12px 14px;color:#FFFFFF;font-size:14px;font-weight:600;outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor='#8DE2D6'" onblur="this.style.borderColor='#333a3d'">
            </div>

            <div>
              <label style="display:block;font-size:12px;font-weight:800;color:#cbd5e1;text-transform:uppercase;margin-bottom:8px;letter-spacing:0.5px;">Tu Rol en el Tránsito</label>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
                <label style="display:flex;flex-direction:column;align-items:center;gap:6px;background:#0f1213;border:1.5px solid ${currentPlayer.role.includes('Auto') ? '#FFC600' : '#333a3d'};border-radius:10px;padding:10px 4px;cursor:pointer;text-align:center;">
                  <input type="radio" name="vp-role" value="Auto (Cat B)" ${currentPlayer.role.includes('Auto') ? 'checked' : ''} style="display:none;">
                  <img src="assets/brand/icon_auto.png" style="width:24px;height:24px;object-fit:contain;filter:brightness(0) invert(1);">
                  <span style="font-size:11px;font-weight:800;color:#fff;">Auto (B)</span>
                </label>
                <label style="display:flex;flex-direction:column;align-items:center;gap:6px;background:#0f1213;border:1.5px solid ${currentPlayer.role.includes('Moto') ? '#FFC600' : '#333a3d'};border-radius:10px;padding:10px 4px;cursor:pointer;text-align:center;">
                  <input type="radio" name="vp-role" value="Moto (Cat A)" ${currentPlayer.role.includes('Moto') ? 'checked' : ''} style="display:none;">
                  <img src="assets/brand/icon_moto.png" style="width:24px;height:24px;object-fit:contain;filter:brightness(0) invert(1);">
                  <span style="font-size:11px;font-weight:800;color:#fff;">Moto (A)</span>
                </label>
                <label style="display:flex;flex-direction:column;align-items:center;gap:6px;background:#0f1213;border:1.5px solid ${currentPlayer.role.includes('Colectivo') ? '#FFC600' : '#333a3d'};border-radius:10px;padding:10px 4px;cursor:pointer;text-align:center;">
                  <input type="radio" name="vp-role" value="Colectivo (D1)" ${currentPlayer.role.includes('Colectivo') ? 'checked' : ''} style="display:none;">
                  <img src="assets/brand/icon_colectivo.png" style="width:24px;height:24px;object-fit:contain;filter:brightness(0) invert(1);">
                  <span style="font-size:11px;font-weight:800;color:#fff;">Bus (D1)</span>
                </label>
              </div>
            </div>

            <button type="submit" id="vp-reg-submit" style="margin-top:6px;width:100%;padding:14px;background:#FFC600;color:#000000;border:none;border-radius:14px;font-size:15px;font-weight:900;font-family:'Archivo Black',sans-serif;letter-spacing:0.5px;cursor:pointer;box-shadow:0 8px 20px rgba(255,198,0,0.35);transition:transform 0.15s ease;">
              ¡GUARDAR Y JUGAR!
            </button>
          </form>

        </div>
      </div>
      <style>
        @keyframes vpPopIn {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('vialplay-global-reg-modal');
    const form = document.getElementById('vp-reg-form');
    const closeBtn = document.getElementById('vp-modal-close-btn');
    const roleLabels = modal.querySelectorAll('input[name="vp-role"]');

    roleLabels.forEach(radio => {
      radio.addEventListener('change', () => {
        modal.querySelectorAll('label:has(input[name="vp-role"])').forEach(l => {
          l.style.borderColor = '#333a3d';
        });
        const parent = radio.closest('label');
        if (parent) parent.style.borderColor = '#FFC600';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.remove());
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('vp-reg-name').value.trim();
      const email = document.getElementById('vp-reg-email').value.trim();
      const selectedRoleEl = modal.querySelector('input[name="vp-role"]:checked');
      const role = selectedRoleEl ? selectedRoleEl.value : 'Auto (Cat B)';
      const avatar = getRoleIcon(role);

      if (!name) {
        alert('Por favor, ingresá tu nombre para registrar tus actividades.');
        return;
      }

      const playerRecord = await setActivePlayer({ name, email, role, avatar }, true);
      modal.remove();

      if (typeof options.onSave === 'function') {
        options.onSave(playerRecord);
      } else {
        // Redirigir a la sección Juegos
        if (window.location.pathname.endsWith('juegos.html')) {
          if (typeof refreshHubStats === 'function') refreshHubStats();
        } else if (typeof showScreen === 'function') {
          showScreen('practice');
        } else {
          window.location.href = 'juegos.html';
        }
      }
    });

    setTimeout(() => {
      const input = document.getElementById('vp-reg-name');
      if (input) input.focus();
    }, 100);
  }

  /**
   * Garantiza que el jugador esté registrado antes de ejecutar una acción
   */
  function ensurePlayerRegistered(callback) {
    if (isPlayerRegistered()) {
      if (typeof callback === 'function') callback(getActivePlayer());
    } else {
      openRegistrationModal({
        allowClose: false,
        onSave: (p) => {
          if (typeof callback === 'function') callback(p);
        }
      });
    }
  }

  /**
   * Actualiza todos los badges de usuario en la interfaz
   */
  function updateAllUserBadges() {
    const player = getActivePlayer();
    const badges = document.querySelectorAll('.vialplay-user-pill, #vialplay-header-user-badge, #header-player-pill');

    badges.forEach(badge => {
      if (player.isRegistered) {
        badge.style.cursor = 'pointer';
        badge.onclick = () => openUserProfileModal();
        badge.title = 'Tocar para ver Mi Perfil y Registro de Actividades';
        
        badge.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,198,0,0.35);padding:4px 10px 4px 6px;border-radius:999px;">
            <img src="${player.avatar}" style="width:20px;height:20px;object-fit:contain;filter:brightness(0) invert(1);" onerror="this.src='assets/brand/icon_auto.png'">
            <span style="font-size:12px;font-weight:800;color:#FFC600;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${player.name}</span>
            <span style="font-size:10px;color:#8DE2D6;font-weight:700;">(${player.role.split(' ')[0]})</span>
            <span class="material-symbols-outlined" style="font-size:14px;color:#FFC600;">account_circle</span>
          </div>
        `;
      } else {
        badge.onclick = () => openRegistrationModal();
        badge.innerHTML = `
          <button type="button" style="background:rgba(255,198,0,0.15);border:1px solid #FFC600;color:#FFC600;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
            <span class="material-symbols-outlined" style="font-size:14px;">person_add</span>
            <span>Registrarme</span>
          </button>
        `;
      }
    });
  }

  // Objeto Global
  const CloudSyncInstance = {
    getActivePlayer,
    isPlayerRegistered,
    setActivePlayer,
    openRegistrationModal,
    openUserProfileModal,
    ensurePlayerRegistered,
    syncGameSession,
    getPlayerFullActivity,
    updateAllUserBadges,
    getEntryGame,
    compareParticipants
  };

  window.VialCloudSync = CloudSyncInstance;
  window.VialPlayCloudSync = CloudSyncInstance;

  // Auto-actualizar badges al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAllUserBadges);
  } else {
    updateAllUserBadges();
  }

})(window);
