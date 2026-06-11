const CACHE = 'deutsch-wipa-v18-2-1-cache-declension-hotfix';
const SHELL = ['./','./index.html','./styles.css','./app.js','./data-manifest.json','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./data/curated_verbs.json','./data/locales/wipa_lexicon.json'];

self.addEventListener('install', e => e.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  await Promise.allSettled(SHELL.map(p => cache.add(p)));
  try {
    const res = await fetch('./data-manifest.json', { cache: 'no-store' });
    if (res.ok) {
      const manifest = await res.json();
      const paths = (manifest.modules || []).map(m => './' + m.path).filter(Boolean);
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
  const isCore = url.pathname.endsWith('/app.js') || url.pathname.endsWith('/styles.css') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js');
  if (isJson || isCore) {
    // Network-first for changing app/data files. Fall back to cache only when offline.
    event.respondWith(fetch(event.request, { cache: 'no-store' }).then(res => {
      if (res.ok) caches.open(CACHE).then(cache => cache.put(event.request, res.clone()));
      return res;
    }).catch(() => caches.match(event.request).then(c => c || caches.match(url.pathname))));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(c => c || fetch(event.request).then(res => {
      if (res.ok) caches.open(CACHE).then(cache => cache.put(event.request, res.clone()));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
