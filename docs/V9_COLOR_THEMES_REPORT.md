# V9 Color Themes Report

Added a full visual theme system instead of a light/dark toggle.

Themes included:
- Parchment
- Forest
- Ocean
- Sunset
- Lavender
- Rose
- Sand
- Graphite
- Midnight
- High contrast

Implementation details:
- `themeSelect` replaces the old one-click theme toggle.
- Theme choice persists in `localStorage.dw_theme`.
- Export/import already carries the stored theme.
- CSS variables control all colors, shadows, surfaces, accents, and background blobs.
- Service worker cache version bumped to avoid stale CSS/app.js.
