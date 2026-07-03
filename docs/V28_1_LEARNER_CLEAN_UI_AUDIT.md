# Deutsch-WiPA v28.1 Learner-Clean UI Audit

## Purpose

v28 fixed deployment consistency, but exposed release metadata to learners. v28.1 keeps the deployment safeguards hidden and removes learner-facing technical noise.

## Removed from learner interface

- Visible version badge such as `v28.0.0`.
- Visible deployment wording such as `Deployment-konsistent`.
- Build/debug badge CSS.
- `data-build` marker on the visible body element.
- Resource labels such as `optional` and `nicht Teil der Bewertung`.
- German learner-facing `Items` wording, replaced by `Übungen`.

## Preserved

- Hidden `window.DEUTSCH_WIPA_BUILD` self-test in JavaScript.
- No-cache local server.
- Service-worker unregister/cleanup logic.
- v28 language-code mapping.
- Namespaced progress/SRS/Fehlerbank keys.
- User profile, latest-session resume, Fehlerbank, export/import.
- Rich content base: 56 modules, 5048 manifest items, 1077 internal verbs.

## Validation

`npm run check` validates both functionality and the absence of common learner-facing noise tokens in `index.html`.
