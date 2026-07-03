// Deutsch-WiPA cache cleanup for reliable updates.
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
