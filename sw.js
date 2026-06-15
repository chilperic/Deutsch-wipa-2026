const CACHE = 'deutsch-wipa-v16-quickstart-fix';
const SHELL = ['./','./index.html','./styles.css','./app.js','./data-manifest.json','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./data/conjugator_verbs.json','./data/curated_verbs.json','./data/locales/wipa_lexicon.json'];

self.addEventListener('install', e => e.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  await cache.addAll(SHELL);
  try {
    const res = await fetch('./data-manifest.json');
    if (res.ok) {
      const manifest = await res.json();
      const paths = (manifest.modules || []).map(m => './' + m.path).filter(Boolean);
      // Cache modules opportunistically; ignore individual failures
      await Promise.allSettled(paths.map(p => cache.add(p)));
    }
  } catch (_) { /* offline-first install OK to skip */ }
  await self.skipWaiting();
})()));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
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
