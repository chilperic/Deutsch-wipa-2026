# Deutsch-WiPA v28 Deployment Consistency Report

v28 corrects the inconsistencies found in the online v27 audit.

## Implemented repairs

1. Unified version string: `28.0.0` in package, index, data manifest, project manifest, cache-busting URLs, visible build badge, and JavaScript build object.
2. Added `window.DEUTSCH_WIPA_BUILD` for fast online verification.
3. Disabled and self-unregistered the service worker to prevent stale app shells during active development.
4. Fixed UI-code to content-language mapping.
5. Namespaced SRS and Fehlerbank records by module to avoid collisions from duplicate raw item IDs.
6. Added migration logic from legacy v27 localStorage keys.
7. Strengthened `dev/check.js` to detect version drift, service-worker registration, missing self-test tokens, missing user-profile/resume UI, too few modules/items, too few verbs, and duplicate namespaced item keys.

## Preserved functionality

- Rich content base: 56 modules, more than 5,000 manifest items.
- Internal 1,077-verb conjugator.
- User profile/name.
- Latest session resume.
- Fehlerbank.
- SRS and progress tracking.
- Export/import.
- Responsive shell from the content-restored line.
