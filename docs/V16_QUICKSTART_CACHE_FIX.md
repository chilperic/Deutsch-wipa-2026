# v16 Quick-start and cache fix

Applied fixes from the v15 audit:

- Added the missing `renderQuickStart()` implementation.
- Added quick-start CSS for the onboarding tiles.
- Added full quick-start i18n coverage through `QUICKSTART_I18N_PATCH`.
- Corrected English `curated` label to `Curated verbs`.
- Updated service worker to precache the manifest modules and cache query-versioned JSON by pathname.
- Moved resources rendering out of the hot `renderAll()` path.
- Strengthened audit checks so the build requires an actual `function renderQuickStart(...)` definition, not merely a call-site string.

Known remaining content gap:

- Kapitel 1–4 still need direct Ukrainian, Russian, Polish, and Turkish vocabulary translations. External translation links and the lexicon fallback remain available.
