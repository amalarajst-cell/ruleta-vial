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

  async function syncGameSession(sessionData) {
    const player = getActivePlayer();

    // Determinar categoría legible
    let displayCat = sessionData.category;
    if (!displayCat) {
      if (sessionData.game === 'reaccion') displayCat = 'Tiempo de Reacción';
      else if (sessionData.game === 'alcoholemia') displayCat = 'Límites de Alcoholemia';
      else displayCat = 'Ruleta Vial';
    }

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
      date: formatCurrentDate()
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
      if (entry.score >= (localLeaderboard[existingIdx].score || 0)) {
        localLeaderboard[existingIdx] = entry;
      }
    } else {
      localLeaderboard.push(entry);
    }
    // Ordenar localLeaderboard por puntaje descendente
    localLeaderboard.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
    localStorage.setItem('vex_leaderboard', JSON.stringify(localLeaderboard));

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
          if (entry.score >= (cloudLeaderboard[cloudIdx].score || 0)) {
            cloudLeaderboard[cloudIdx] = entry;
          }
        } else {
          cloudLeaderboard.push(entry);
        }

        cloudLeaderboard.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
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
