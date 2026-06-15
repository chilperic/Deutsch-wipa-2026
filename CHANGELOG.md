# Changelog

## v19.0.0 Core Reset

- Removed unsafe v18 generated modules from the shipped app.
- Rebuilt the app around four verified modules only.
- Limited support/interface languages to DE/EN/FR until further content validation.
- Added `data/core_v19.json` as the only active learning dataset.
- Replaced broad taxonomy routing with explicit path-to-module routing.
- Added blocking validation in `dev/check.js`.
- Disabled the old large conjugator until verb tables are validated.
- Preserved local progress export/import.
- Updated cache/version strings to `v19.0.0-core-reset`.
