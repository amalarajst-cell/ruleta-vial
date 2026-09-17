// Service Worker básico para permitir funcionamiento PWA e instalación en pantalla de inicio
const CACHE_NAME = 'ruleta-vial-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Estrategia Network First con fallback a cache si no hay conexión
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
