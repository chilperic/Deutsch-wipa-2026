# Deutsch-WiPA 2026 v17.2 — Reliable Tutor Secured

## Main changes

- Removed the remaining flat legacy drills from the active filesystem:
  - `data/conjugator_verbs.json`
  - `grammatik/production_konjugator_drills.json`
  - `grammatik/production_modalverben_praesens.json`
  - `grammatik/production_modalverben_praeteritum.json`
- Merged the large verb backend into `data/curated_verbs.json`.
- Updated `app.js` so the conjugator loads only `data/curated_verbs.json`.
- Added `grammatik/v17_modalverben_business_curated.json` for context-aware modal verb practice.
- Strengthened curated modules:
  - `v17_nicht_kein_curated.json`: diplomatic/professional negation and lexical prefix negation.
  - `v17_kasus_curated.json`: dative/genitive valency in business contexts.
  - `v17_konnektoren_curated.json`: formal connectors and `je ... desto`.
- Converted `vokabular/v17_beruf_wortschatz_curated.json` into a lexical-key skeleton.
- Moved learner-language equivalents into `data/locales/wipa_lexicon.json`.
- Added a stronger `npm run check` gate against split-brain regressions.

## Policy

The app can still expose many verbs, but raw verb inventory is not the curriculum. Practice uses curated starter/top lists and dynamic generation from the single verb source.

## Remaining limitation

The UI is still mostly v16/v17 monolithic architecture. The next high-value step is thematic tracks and progressive feedback, not more database expansion.
