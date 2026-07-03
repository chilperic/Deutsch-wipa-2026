# Deutsch-WiPA v27 Learning Platform Core

## Purpose

v27 repairs the direction after the v23-v25 over-minimal redesigns. It keeps the content-rich v7/v8/v26 architecture and adds platform-level learner features without removing the internal modules.

## Implemented

- Restored/kept 56 modules, 5,048 manifest items, and 1,077 internal conjugator verbs.
- Reintroduced profile/name storage from the v8 direction.
- Added latest-session storage and a visible resume card.
- Added export/import for profile, progress, SRS, mistakes, and the last session.
- Strengthened the Fehlerbank with grouped mistake types, mistake counts, dates, single retry, and full Fehlerbank retry session.
- Preserved the internal Konjugator; verbs are trained internally, external resources remain optional.
- Kept responsive desktop/mobile shell with sidebar drawer and bottom mobile navigation.
- Added v27 validation checks for profile, resume, export/import, and Fehlerbank UI tokens.

## Do not regress

Do not remove the profile card, latest-session resume, internal conjugator, Fehlerbank retry flow, module/path selector, SRS, or export/import merely to simplify the interface.

## Validation

```text
OK: 56 modules, 5048 manifest items, 1077 verbs; v27 profile/resume/Fehlerbank UI present.
```
