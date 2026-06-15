# Changelog

## v19.1.0 Expanded Core

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
- Updated version/cache strings to `v19.1.0-expanded-core`.
- Kept support/interface languages limited to DE/EN/FR.

## v19.0.0 Core Reset

- Removed unsafe v18 generated modules from the shipped app.
- Rebuilt the app around four verified modules only.
- Added `data/core_v19.json` as the only active learning dataset.
- Replaced broad taxonomy routing with explicit path-to-module routing.
- Added blocking validation in `dev/check.js`.
- Disabled the old large conjugator until verb tables are validated.
- Preserved local progress export/import.
