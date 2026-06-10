# Deutsch-WiPA 2026 v8 — Profile, Progress, and Mobile Navigation Audit

## Audit findings

### 1. User name
Previous state: no user-name/profile field existed. The app saved language/theme/progress, but not the learner name.

Fix: added a profile card in the sidebar with a name input. The value is stored in `localStorage` under:

- `dw_modern_profile`

Example structure:

```json
{"name":"Tristan"}
```

### 2. Progress persistence
Progress is local-only. It is stored in the browser on the current device, not in a server database.

Current localStorage keys:

- `dw_modern_profile` — learner name/profile
- `dw_modern_stats` — path/session accuracy counters
- `dw_modern_module_stats` — module-level accuracy counters
- `dw_modern_mistakes` — saved wrong answers
- `dw_modern_srs` — spaced repetition scheduling
- `dw_lang` — interface language
- `dw_theme` — light/dark theme

This means progress survives refreshes and browser reopening on the same device/browser profile. It does not automatically sync between phone and computer.

### 3. Backup and transfer
Previous state: no visible export/import existed, so users had no obvious way to move progress to another device.

Fix: added a Backup section with:

- Export: downloads a JSON file containing profile, stats, mistakes, SRS, language, and theme.
- Import: restores the JSON file on another browser/device.

### 4. Phone navigation
Previous state: mobile navigation depended too much on the hidden sidebar drawer. The route tabs and action buttons were both near the bottom, while module/path selection required opening the drawer.

Fixes:

- Added a mobile quick-control panel above the exercise card.
- Added direct mobile selects for:
  - Thema
  - Modul
- Added an Options button to open the full sidebar only when needed.
- Kept the full sidebar for detailed desktop/tablet use.
- Improved mobile spacing around bottom action buttons and navigation tabs.

### 5. Remaining limitation
Progress is not cloud-synced. A real account system would require a backend or third-party authentication/storage. For the current GitHub Pages/static PWA architecture, localStorage plus export/import is the appropriate lightweight solution.

## Validation

- JavaScript parse: OK
- JSON validity: OK
- Active modules: 56
- Manifest items: 5048
- Verbs: 1077
- `antworten`: verified fixed
- `arbeiten`: verified fixed
- `bekommen`: verified fixed
