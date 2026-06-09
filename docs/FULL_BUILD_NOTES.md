# Full build notes

## What changed from v2

- Removed the embedded `.git/` folder from the distributable ZIP.
- Replaced the huge single-file interface with a maintainable static PWA structure.
- Preserved the existing grammar and vocabulary JSON data.
- Added `data-manifest.json` so the app can load modules explicitly on GitHub Pages.
- Added responsive layouts for phone/tablet/desktop.
- Added multilingual UI labels, including Arabic, Persian, Ukrainian, Russian, Polish, and Turkish.
- Added RTL handling for Arabic and Persian.
- Added a clearer exercise flow: Start → Check → correction/explanation → Next.
- Added Previous navigation.
- Added mistake-bank storage in `localStorage`.
- Added Kapitel 3 photo-based supplementary vocabulary and a core verb-forms module.
- Added service worker and PWA manifest.

## Known limitation

The user interface is multilingual. The content translation coverage depends on the existing JSON data. When a selected language has no item-level translation, the app falls back to German or English.
