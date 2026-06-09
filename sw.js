const CACHE = 'deutsch-wipa-2026-audit-corrected-v2';
const CORE = [
  './', './index.html', './styles.css', './app.js', './data-manifest.json', './manifest.webmanifest', './assets/icon.svg', './assets/icon-192.png', './assets/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isData = url.pathname.endsWith('.json');
  if (isData) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(event.request).then(cached => {
      const fresh = fetch(event.request).then(response => { cache.put(event.request, response.clone()); return response; }).catch(() => cached);
      return cached || fresh;
    })));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {}); return response;
  }).catch(() => caches.match('./index.html'))));
});
