# Deutsch WIPA 2026 · Stable Boot

This build fixes the empty dashboard by removing the unstable localStorage learning-database cache.

The app now:
- loads embedded learning data directly into memory on every page load,
- stores only learner progress and settings,
- does not call missing background fetch functions,
- reports runtime errors visibly in the status line.

Build marker:

```text
stable-boot-no-localstorage-db-2026-05-30
```


## Profile and theme update

Added:

```text
- Learner name field
- Personalized greeting
- Local progress summary
- Sessions / correct / wrong / best streak
- Reset progress button
- More themes:
  Midnight, Paper, Forest, Berry, Graphite, Ocean, Sand, Violet, Mint, Rose, High Contrast
```

Build marker:

```text
stable-boot-profile-themes-2026-05-30
```
