const CACHE = 'deutsch-wipa-v16-professional-core';
const SHELL = ['./','./index.html','./styles.css','./app.js','./data-manifest.json','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./data/conjugator_verbs.json','./data/curated_verbs.json','./data/locales/wipa_lexicon.json'];

function cacheKey(req){
  const url = new URL(req.url || req, self.location.origin);
  return new Request(url.origin + url.pathname, { headers: req.headers || {} });
}
async function precacheModules(cache){
  try{
    const res = await fetch('./data-manifest.json');
    if(!res.ok) return;
    const manifest = await res.clone().json();
    await cache.put(cacheKey(new Request(new URL('./data-manifest.json', self.location).href)), res);
    const urls = (manifest.modules || []).map(m => m.path).filter(Boolean).map(p => new URL(p, self.location).href);
    await Promise.allSettled(urls.map(async url => {
      const r = await fetch(url);
      if(r.ok) await cache.put(cacheKey(new Request(url)), r.clone());
    }));
  }catch(e){/* offline-first install should not fail because dynamic module cache failed */}
}
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(async c => { await c.addAll(SHELL); await precacheModules(c); }).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isJson = url.pathname.endsWith('.json');
  if (isJson) {
    event.respondWith(caches.open(CACHE).then(cache =>
      cache.match(cacheKey(event.request)).then(cached => {
        const fresh = fetch(event.request).then(res => {
          if (res.ok) cache.put(cacheKey(event.request), res.clone());
          return res;
        }).catch(() => cached);
        return cached || fresh;
      })
    ));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(c => c || fetch(event.request).then(res => {
      if (res.ok) caches.open(CACHE).then(cache => cache.put(event.request, res.clone()));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
