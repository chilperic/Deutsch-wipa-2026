// Deutsch-WiPA v28: service worker intentionally disabled during active development.
// This file removes older caches and unregisters itself so GitHub Pages cannot serve stale app shells.
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => /dwipa|deutsch-wipa/i.test(k)).map(k => caches.delete(k)));
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
