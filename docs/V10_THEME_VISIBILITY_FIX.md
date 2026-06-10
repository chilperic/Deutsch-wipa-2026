# V10 Theme Visibility Fix

Problem: V9 added theme support, but the selector could be hard to discover, especially on phones, because it lived only in the top action area.

Fixes:
- Added a visible Farbe selector in the sidebar profile card.
- Added a Farbe selector to the mobile quick navigation panel.
- Kept the topbar selector on desktop.
- All theme selectors are synchronized through one applyTheme() function.
- Theme still saves to localStorage key dw_theme and is included in export/import.
- Updated APP_VERSION and service-worker cache identifier.
