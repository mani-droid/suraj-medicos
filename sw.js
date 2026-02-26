// This is the Service Worker that makes the PWA installable
self.addEventListener('install', (e) => {
  console.log('[Suraj Medicos] Service Worker Installed');
});

self.addEventListener('fetch', (e) => {
  // Satisfies the PWA requirement for a fetch handler
});
