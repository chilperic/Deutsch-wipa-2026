# v18.2.5 Deep Audit and Stable Repair

## Diagnosis

The v18.2.4 i18n patch was unsafe. It appended replacement implementations for core renderer functions instead of modifying the existing architecture in place. JavaScript accepted the file because later function declarations override earlier ones, but the result was not the same app anymore.

Confirmed regression classes:

1. Duplicate renderer declarations existed in v18.2.4:
   - `renderAll`
   - `renderPath`
   - `renderModuleSelect`
   - `renderExercise`
   - `renderInput`
   - `renderVerbList`
   - `renderVerbDetail`
   - `checkAnswer`
   - `genericHintFor`
   - `label`

2. Static checks were insufficient. `node --check` only validates syntax. It does not detect semantic replacement of working functions.

3. The user-visible placeholder state was consistent with a broken or stale frontend path: HTML loaded, but the real training render pipeline was not reliably controlling the view.

4. The previous patch overreached. It tried to solve all i18n defects by replacing render functions. That is the wrong architecture for this app.

## Repair strategy

v18.2.5 is built from the last stable v18.2.3 base, not from the broken v18.2.4 file.

The fix is intentionally conservative:

- Restore single source of truth for all core render functions.
- Keep localization additive only.
- Do not duplicate or override render functions.
- Preserve German as the learning target language.
- Use the selected language only for support/interface text.
- Keep the service-worker kill switch to reduce stale-cache failures.

## Applied changes

- Version bumped to `v18.2.5-stable-i18n-repair`.
- Added localized path labels through `PATH_I18N` and `pathText()`.
- Added `localizeStaticUI()` for static shell labels.
- Added translated keys for navigation, sidebar, controls, placeholders, resource hero text, and conjugator metadata.
- Updated render calls to use localized path labels without replacing render functions.
- Added duplicate-function guard to `dev/check.js`.
- Updated cache-busting strings in `index.html`.
- Preserved content modules and all v18.2.3 routing logic.

## Validation

Passed:

```bash
node --check app.js
npm run check
```

Additional guard:

- duplicate function declarations in `app.js` now fail the audit.

## Remaining limitation

The app shell is now safer and more localized, but the exercise data itself still contains German-first and English/German explanations. Full multilingual explanations require dataset-level fields, not another render-layer patch.
