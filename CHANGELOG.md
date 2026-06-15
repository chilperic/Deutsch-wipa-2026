# Changelog

## v18.2.4 — i18n parity audit and fix

- Connected the language selector to static navigation, sidebar labels, quick controls, exercise chrome, path cards, feedback stages, resources view, and conjugator chrome.
- Added non-English parity keys for French, Spanish, Arabic, Persian, Ukrainian, Russian, Polish, and Turkish.
- Preserved German as the learning target language while using the selected language as the support/interface language.
- Added localized placeholders and feedback-stage labels so language switching no longer appears English/German-only.


## v16.0.0 · Quick-Start Fix & Robustness

- Fixed: `renderQuickStart` was called but undefined (blocked every render after first paint).
- Quick-start panel now shipped with tiles, accent for due reviews, and CSS.
- Service worker precaches data-manifest modules + curated/lexicon JSON at install (real offline-first).
- Dropped `?v=` cache-buster on JSON; SW cache name handles invalidation.
- Removed dead `cleanReq` line in sw.js.
- Capitalisation now enforced for noun/article/plural trainers (with friendly hint).
- Import: schema validation + overwrite confirm.
- Skip: detect end-of-pass and finish session instead of looping forever.
- Profile name save debounced (300 ms).
- Speak debounced (250 ms) to stop word truncation on double-tap.
- Mistake retry buttons use event delegation.
- Design selects no longer wipe their value on every render.
- Escape key closes the drawer first, then falls back to skip.
- Hard-coded German strings ('Bereit?', 'Keine Items', 'Review leer') now translated.
- Exercise type pill (`label()`) localized to EN.
- EN translation pack fix: 'Curated verbs' instead of 'Kuratierte Verben'.
- Stricter audit: checks for function *definition*, not just substring.
- `dev/check.js` runs `node --check app.js` to catch parse errors before deploy.

# Changelog

## v15.0.0 · Professional Core

- Added quick-start learning panel.
- Added curated verb dataset and conjugator display modes.
- Added v15 audit gate.
- Updated PWA metadata and cache version.
- Consolidated product direction around grammar-first B1/B2 workplace German.

## v14.0.0 · Localization Audit

- Added centralized workplace lexicon.
- Fixed separable Konjunktiv II for core verbs.
- Added localization support for key DACH workforce languages.
