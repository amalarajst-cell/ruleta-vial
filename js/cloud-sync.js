/**
 * ── VIALPLAY CLOUD SYNC MODULE ──
 * Sincroniza las partidas y estadísticas de todos los juegos (Ruleta Vial, Tiempo de Reacción, Límites de Alcoholemia)
 * tanto en localStorage como en el archivo central data.json en GitHub para el Panel de Administración.
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

  function getActivePlayer() {
    return {
      name: localStorage.getItem('vialplay_player_name') || 'Participante',
      email: localStorage.getItem('vialplay_player_email') || '',
      role: localStorage.getItem('vialplay_player_role') || 'Auto (Cat B)',
      avatar: localStorage.getItem('vialplay_player_avatar') || 'assets/brand/icon_auto.png'
    };
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
    }
    const g = e.game || (e.category === 'Tiempo de Reacción' ? 'reaccion' : (e.category === 'Límites de Alcoholemia' ? 'alcoholemia' : 'ruleta'));
    if (g === 'ruleta') {
      const sc = Number(e.score) || 0;
      const c = sc >= 500 ? 5 : Math.min(5, Math.max(0, Math.round(sc / 100)));
      return { correct: c, total: 5, ratio: c / 5 };
    }
    return { correct: 0, total: 0, ratio: 0 };
  }

  function compareParticipants(a, b) {
    const accA = parseEntryAciertos(a);
    const accB = parseEntryAciertos(b);

    // 1° Mayor cantidad / porcentaje de aciertos
    if (Math.abs(accB.ratio - accA.ratio) > 0.0001) {
      return accB.ratio - accA.ratio;
    }
    if (accB.correct !== accA.correct) {
      return accB.correct - accA.correct;
    }

    // 2° Menor tiempo de reacción (menor tiempo = mejor reflejo)
    const timeA = Number(a.time) > 0 ? Number(a.time) : 9999;
    const timeB = Number(b.time) > 0 ? Number(b.time) : 9999;
    if (Math.abs(timeA - timeB) > 0.0001) {
      return timeA - timeB;
    }

    // 3° Desempate: mayor puntaje XP y luego más reciente
    const scoreDiff = (Number(b.score) || 0) - (Number(a.score) || 0);
    if (scoreDiff !== 0) return scoreDiff;

    return (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0);
  }

  async function syncGameSession(sessionData) {
    const player = getActivePlayer();

    // Determinar categoría legible
    let displayCat = sessionData.category;
    if (!displayCat) {
      if (sessionData.game === 'reaccion') displayCat = 'Tiempo de Reacción';
      else if (sessionData.game === 'alcoholemia') displayCat = 'Límites de Alcoholemia';
      else if (sessionData.game === 'memotest') displayCat = 'Memotest Vial';
      else displayCat = 'Ruleta Vial';
    }

    const nowTimestamp = Date.now();
    const entry = {
      name: player.name,
      email: player.email,
      role: player.role,
      avatar: player.avatar,
      game: sessionData.game,
      category: displayCat,
      score: Math.round(sessionData.score || 0),
      time: Number(sessionData.time) || 0,
      accuracy: sessionData.accuracy || '',
      date: formatCurrentDate(),
      timestamp: nowTimestamp
    };

    // 1. Guardar en localStorage
    let localLeaderboard = [];
    try {
      localLeaderboard = JSON.parse(localStorage.getItem('vex_leaderboard') || '[]');
    } catch(e) {}

    const cleanId = (player.email || player.name).toLowerCase().trim();
    const existingIdx = localLeaderboard.findIndex(e => {
      const eId = (e.email || e.name || '').toLowerCase().trim();
      const eGame = e.game || (e.category === 'Tiempo de Reacción' ? 'reaccion' : (e.category === 'Límites de Alcoholemia' ? 'alcoholemia' : 'ruleta'));
      return eId === cleanId && eGame === sessionData.game;
    });

    if (existingIdx >= 0) {
      const existing = localLeaderboard[existingIdx];
      const isEntryBetter = compareParticipants(entry, existing) < 0;
      localLeaderboard[existingIdx] = isEntryBetter ? entry : existing;
    } else {
      localLeaderboard.push(entry);
    }
    // Ordenar localLeaderboard: 1° Más aciertos, 2° Menor tiempo de reacción
    localLeaderboard.sort(compareParticipants);
    localStorage.setItem('vex_leaderboard', JSON.stringify(localLeaderboard));
    localStorage.setItem('vialplay_last_activity', JSON.stringify(entry));

    // Guardar historial de respuestas/estímulos en vex_responses_history
    if (sessionData.details && Array.isArray(sessionData.details)) {
      let responsesHistory = [];
      try {
        responsesHistory = JSON.parse(localStorage.getItem('vex_responses_history') || '[]');
      } catch(e) {}

      const timestamp = new Date().toLocaleString('es-AR');
      sessionData.details.forEach(d => {
        responsesHistory.push({
          timestamp,
          name: player.name,
          email: player.email,
          game: sessionData.game,
          category: displayCat,
          question: d.question || d.title || '',
          selectedAnswer: d.selected || '',
          correctAnswer: d.expected || '',
          isCorrect: d.isCorrect ? 'SI' : 'NO',
          timeSeconds: d.timeSeconds || 0,
          pointsGained: d.points || 0
        });
      });
      localStorage.setItem('vex_responses_history', JSON.stringify(responsesHistory.slice(-1000)));
    }

    // 2. Sincronizar en vivo con GitHub data.json
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
          const eGame = e.game || (e.category === 'Tiempo de Reacción' ? 'reaccion' : (e.category === 'Límites de Alcoholemia' ? 'alcoholemia' : 'ruleta'));
          return eId === cleanId && eGame === sessionData.game;
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
            message: `sync ${sessionData.game} result: ${player.name}`,
            content: utf8B64Encode(JSON.stringify(currentContent)),
            sha: currentSha
          })
        });

        if (putRes.ok) {
          console.log(`[VialCloudSync] ✅ Sincronizado en la nube para ${player.name} (${sessionData.game})`);
        }
      }
    } catch(err) {
      console.warn('[VialCloudSync] Almacenado localmente. Error de conexión con GitHub:', err);
    }

    try {
      window.dispatchEvent(new CustomEvent('vialplay:session_synced', { detail: entry }));
    } catch(e) {}

    return { success: true, entry };
  }

  window.VialCloudSync = {
    getActivePlayer,
    syncGameSession
  };
})(window);
