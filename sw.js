// Service Worker — Ruleta Vial PWA v8
const CACHE_NAME = 'ruleta-vial-v8';

// Archivos esenciales para cachear en la instalación (Offline completo)
const CORE_FILES = [
  './',
  './index.html',
  './juegos.html',
  './prioridad.html',
  './peligros.html',
  './crucigrama.html',
  './reaccion.html',
  './alcoholemia.html',
  './memotest.html',
  './simulador.html',
  './manifest.json',
  './css/styles.css',
  './js/cloud-sync.js',
  './js/app.js',
  './js/audio.js',
  './js/roulette.js',
  './js/questions.js',
  './js/auto_questions.js',
  './js/moto_questions.js',
  './js/colectivo_questions.js',
  './js/senales-data.js',
  './js/realtime-live.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/logo.png',
  './assets/brand/logo_ba.png',
  './assets/brand/icon_auto.png',
  './assets/brand/icon_moto.png',
  './assets/brand/icon_colectivo.png',
  './assets/brand/icon_bici.png',
  './assets/brand/icon_peaton.png',
  './assets/ruleta_icono.jpg',
  './assets/reaccion_icono.jpg',
  './assets/memotest_icono.jpg',
  './assets/alcoholemia_icono.jpg',
  './assets/simulador_icono.jpg',
  './assets/peligros_icono.jpg',
  './assets/crucigrama_icono.jpg',
  './assets/prioridad_icono.jpg'
];

// Instalar: cachear archivos esenciales con tolerancia a fallos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(CORE_FILES);
      } catch (err) {
        console.warn('PWA: cache.addAll fallo parcial, cacheando uno a uno:', err);
        for (const file of CORE_FILES) {
          try {
            await cache.add(file);
          } catch (e) {
            console.warn('PWA: no se pudo cachear:', file);
          }
        }
      }
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activar: limpiar cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: Network-first con fallback a caché
self.addEventListener('fetch', (event) => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cachear respuestas exitosas de archivos del sitio
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si no hay red, buscar en caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Si es una página HTML, devolver index.html como fallback
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
