// v25: service worker intentionally disabled during active content/UI development.
// This prevents stale learning data and old shells from surviving local or GitHub Pages deployments.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if (self.registration) await self.registration.unregister();
    const clients = await self.clients.matchAll({type: 'window'});
    for (const client of clients) client.navigate(client.url);
  })());
});
