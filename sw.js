// Service worker for Deutsch-WiPA 2026
// Strategy:
//   - Shell files (HTML, CSS, JS, icon, manifest): cache-first
//   - Data files (.json): stale-while-revalidate (updates visible on next load)
const CACHE = 'deutsch-wipa-2026-v2-20260609-updated';
const SHELL = [
  './', './index.html', './styles.css', './app.js',
  './manifest.webmanifest', './assets/icon.svg', './assets/icon-192.png', './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isData = url.pathname.endsWith('.json');

  if (isData) {
    // Stale-while-revalidate: serve cached version immediately,
    // update cache in background so next load gets fresh content.
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => null);
          // Return cached if available; otherwise wait for network
          return cached || fetchPromise;
        })
      )
    );
  } else {
    // Shell: cache-first, fallback to network, then offline page
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(response => {
          if (response.ok) {
            caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        }).catch(() => caches.match('./index.html'))
      )
    );
  }
});
