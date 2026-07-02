# Changelog

## v25.0.0 · Functional Responsive Trainer

### Restored

- Returned to the v22 functional trainer baseline after the v23/v24 UI overcorrection.
- Preserved adaptive sessions, learner model, module access, review, progress, profile, backup/import, themes, colors, resources and exercise controls.

### Improved

- Rebuilt layout as a responsive desktop/tablet/mobile grid instead of float-based dashboard layout.
- Added mobile drawer behavior for the functional sidebar.
- Added bottom mobile navigation without removing desktop functionality.
- Reworked quick-start panel to be compact and useful rather than decorative.
- Improved exercise-card spacing, answer controls, feedback blocks, resources and review cards.
- Removed decorative grid background and excessive empty canvas.
- Replaced algorithmic learner-facing wording with simpler training language.
- Replaced disabled conjugator placeholder with external verb-checking support.
- Replaced VHS resource with Mein Deutschbuch.
- Added no-cache local server on port 8000.

### Validation

- `npm run check` passes.
- Static JS syntax checks pass.
- JSON files validate.
- HTTP loading of v25 assets/data verified with the no-cache server.
