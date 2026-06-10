const CACHE = 'deutsch-wipa-2026-v14-localization-audit';
const SHELL = ['./','./index.html','./styles.css','./app.js','./data-manifest.json','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./data/conjugator_verbs.json'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Strip cache-busting query params for cache matching
  const cleanReq = url.search ? new Request(url.pathname, { headers: event.request.headers }) : event.request;
  const isJson = url.pathname.endsWith('.json');
  if (isJson) {
    // Stale-while-revalidate: serve cached immediately, update in background
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(url.pathname).then(cached => {
          const fresh = fetch(event.request).then(res => {
            if (res.ok) cache.put(url.pathname, res.clone());
            return res;
          }).catch(() => cached);
          return cached || fresh;
        })
      )
    );
    return;
  }
  // Shell: cache-first
  event.respondWith(
    caches.match(event.request).then(c => c || fetch(event.request).then(res => {
      if (res.ok) caches.open(CACHE).then(cache => cache.put(event.request, res.clone()));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
