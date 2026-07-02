# Deutsch-WiPA v25 Functional Responsive Trainer Report

## Problem fixed

v23/v24 simplified too aggressively. The result looked cleaner in theory but behaved like a decorative shell: useful controls were hidden or removed, pages looked like placeholders, and the app no longer felt like a serious trainer.

## v25 principle

Keep the functional density of v19/v22, but organize it better.

## Main decisions

1. Preserve the full adaptive trainer engine from v22.
2. Preserve visible access to modules, review, profile, progress, design, backup/import and resources.
3. Replace the float layout with a robust CSS grid.
4. Make the sidebar a real mobile drawer instead of forcing desktop controls into mobile width.
5. Add bottom navigation on phones.
6. Remove disabled QA language from the conjugator page.
7. Replace VHS with Mein Deutschbuch in resources.
8. Remove technical learner-facing copy such as scheduler weights.

## Remaining risk

No real cross-browser manual QA was completed inside this package. Before deployment, test at minimum:

- Chrome desktop
- Firefox desktop
- Android Chrome
- iOS Safari or Safari responsive mode
- widths: 390 px, 768 px, 1366 px

## Next version direction

Do not redesign again from scratch. Improve v25 incrementally:

- make production rubrics more structured;
- add teacher-validated B1/B2 scenario packs;
- add listening/shadowing;
- add exam-style writing/speaking simulations.
