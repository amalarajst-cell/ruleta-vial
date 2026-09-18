// Service Worker Ruleta Vial PWA
const CACHE_NAME = 'ruleta-vial-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Manejador de fetch transparente: permite navegación online y cumple el estándar de instalación PWA
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
