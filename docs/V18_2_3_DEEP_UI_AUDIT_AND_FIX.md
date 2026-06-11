# v18.2.3 Deep UI Audit and Fix

## Independent audit verdict
The v18.2.2 backend is usable, but the interface had accumulated controls from older versions. The main defects were not content defects: they were navigation, duplicate settings, mobile crowding, and resource discoverability.

## Confirmed defects

1. **Resources were hidden**
   - The resource links existed only inside the right learning panel.
   - On mobile this panel drops below the exercise, making resources effectively invisible.

2. **Bottom-fixed main navigation crowded the phone interface**
   - `Lernen / Konjugator / Fehlerbank` was fixed near the bottom on mobile/tablet.
   - It competed with the fixed exercise action buttons and visually covered the module-selection area.

3. **Theme/color controls were duplicated**
   - Topbar, sidebar profile card, and mobile control panel all exposed appearance/color controls.
   - This created redundant UI and unnecessary decision load.

4. **Quick-start panel added noise on phones**
   - Useful on desktop, but too large on phone once direct module selection exists.

5. **Version clarity was weak**
   - The HTML title still said `v16`, reinforcing the impression that the browser was showing an older version.

## Implemented changes

- Added a top-level `Ressourcen` route and a dedicated resources view.
- Removed resources from the exercise side panel to reduce study-screen clutter.
- Removed theme/color controls from the topbar and mobile control panel.
- Kept appearance/color settings only in the sidebar profile/settings card.
- Removed fixed-bottom behavior for the main route tabs on mobile/tablet.
- Kept the mobile control panel focused on only: Thema, Modul, Optionen.
- Hid quick-start on narrow screens.
- Updated build metadata and title to v18.2.3.
- Added guard checks so these regressions are detected by `npm run check`.

## Non-changes

- No learning content was added, removed, or regenerated.
- No grammar/vocabulary data was modified.
- The 160-item module structure from v18.2 remains intact.
- Renamed the secondary mode chip from `Lernen` to `Lösung` to avoid confusion with the top-level `Lernen` route.
