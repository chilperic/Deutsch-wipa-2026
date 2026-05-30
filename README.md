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


## Grammar flow improvement

Grammar modules now use a clearer cycle:

```text
Study card → Focus recall → Prompt practice
```

Example:

```text
Study:
gratulieren + Dativ

Focus recall:
gratulieren + ?

Prompt practice:
Im Kurs gratuliere ich ___ Kollegin.
```

Build marker:

```text
stable-grammar-flow-improved-2026-05-30
```


## Learning-loop UX repair

Implemented after review:

```text
- Mobile bottom buttons now work via event delegation.
- Profile/progress card is rendered on page load.
- Phone / Computer / Auto selector is implemented.
- Quick-start choices added:
  Continue review
  Learn new items
  Grammar training
  Vocabulary
- Tracker now uses readable labels instead of internal IDs.
- Wrong-answer feedback gives teaching explanation.
- Module cards distinguish selected module.
- Fake placeholder vocabulary examples replaced where detected.
- “habe/bin ...” examples repaired where detected.
```

Build marker:

```text
learning-loop-ux-repair-2026-05-30
```
