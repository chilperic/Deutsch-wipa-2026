# Deutsch-WiPA 2026 v14 — Relevant audit applied

## Applied

- Fixed separable-verb Konjunktiv II: `ich würde vorbereiten`, `ich würde teilnehmen`, `ich würde abgeben` instead of split present forms.
- Added `data/locales/wipa_lexicon.json` as a centralized localization layer for high-priority workplace vocabulary.
- Added Polish, Turkish, Ukrainian, Spanish, French, Arabic, Persian and Russian equivalents for the production workplace collocations.
- `translationOf()` now consults the locale lexicon before falling back to item-level translations or English.
- Translation helper now uses the locale pack when stored item translation is missing.
- Generated placeholder verb meanings are hidden in the conjugator UI instead of being presented as real definitions.
- Curated meanings added for high-priority B1/B2 workplace/separable verbs.
- Added audit scripts for separable verbs, localization coverage, duplicate prompts and path reachability.

## Not applied deliberately

- Full relational database migration across every JSON module. Too risky for the current static app. v14 adds the localization layer without breaking existing content.
- Deleting legacy Kapitel files. They still provide useful Linie-style vocabulary and should be curated gradually, not purged in one pass.
