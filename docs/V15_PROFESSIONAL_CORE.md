# Deutsch-WiPA 2026 v15 · Professional Core

This release consolidates the app after the v14 localization audit. It does not add broad feature bloat; it makes the product more coherent.

## Main changes

- Added a learner-facing quick-start panel for focused sessions.
- Added a curated verb layer: starter verbs and a larger curated list loaded from `data/curated_verbs.json`.
- Added verb-list modes in the conjugator: Starter, curated verbs, all verbs.
- Kept the grammar-first product direction: conjugation, sentence structure, cases, declension, adverbs, prepositions, workplace vocabulary.
- Added v15 release audit: `npm run audit:v15`.
- Updated release metadata, service-worker cache version, manifest, and documentation.

## Design principle

The app should not expose internal module names as the primary learning experience. Learners should start from clear goals:

- Verb forms
- Declension
- Prepositions
- Review

## Release gate

Run before deploying:

```bash
npm run check
npm run audit
```

The v15 audit checks:

- v15 app version
- quick-start panel present
- curated verb data present
- core verb forms still valid
- separable Konjunktiv II regression checks
- manifest file integrity
- locale lexicon coverage for high-priority languages
