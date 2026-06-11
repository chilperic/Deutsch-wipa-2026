# v18.2.1 Cache + Deklination hotfix

Fixes two runtime issues reported after v18.2:

1. Browser/PWA cache could keep showing an older build. The service worker now uses a new cache key and network-first strategy for `index.html`, `app.js`, `styles.css`, `data-manifest.json`, and all JSON data files. App data fetches also append the build version and use `cache: no-store`.
2. The quick Deklination route pointed to `declension`, but `PATHS` did not define that path. v18.2.1 adds a proper `Deklination` path matching Adjektivdeklination, Artikel/Nomen, and Kasus material.

If a browser still shows the previous build once, unregister the old service worker or clear site data once; after this build, future updates should be much less sticky.
