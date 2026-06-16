# Changelog

## v19.2.0 Vocabulary 250

- Expanded `vocab_core` to 260 verified workplace/office nouns.
- Added plural forms to every vocabulary item.
- Displayed vocabulary plurals directly in the exercise card and answer feedback.
- Added validation gates requiring at least 250 vocabulary items and a valid plural for every vocabulary noun.
- Kept all quarantined v18 content disabled.

## v19.2.0 Expanded Core

- Expanded the verified curriculum from 4 modules / 56 items to 10 modules / 204 items.
- Added six new validated modules:
  - Dative vs accusative
  - Modal verbs at work
  - Separable verbs
  - Adjective endings
  - `nicht` vs `kein`
  - Main-clause word order
- Expanded the existing vocabulary, article/plural, prepositional-verb, and connector modules.
- Kept the v19 safety rule: no legacy v18 generated modules were reactivated.
- Updated `dev/check.js` to whitelist only the verified v19.1 modules.
- Updated version/cache strings to `v19.2.0-vocabulary-250`.
- Kept support/interface languages limited to DE/EN/FR.

## v19.0.0 Core Reset

- Removed unsafe v18 generated modules from the shipped app.
- Rebuilt the app around four verified modules only.
- Added `data/core_v19.json` as the only active learning dataset.
- Replaced broad taxonomy routing with explicit path-to-module routing.
- Added blocking validation in `dev/check.js`.
- Disabled the old large conjugator until verb tables are validated.
- Preserved local progress export/import.
