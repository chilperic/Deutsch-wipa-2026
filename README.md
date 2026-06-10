# Deutsch-WiPA 2026 — Modern Grammar App

Grammar-first B1/B2 German trainer focused on **Konjugation**, **Satzbau**, **Fälle**, **Präpositionen**, **Artikel/Nomen**, **Adjektive**, **Konnektoren** and workplace vocabulary inspired by the Linie-Beruf learning philosophy.

## Current build

This version applies the full modern-UX and audit-correction pass:

- Modern learning-card UI, no dashboard-like clutter.
- Learner-facing paths instead of raw internal folders.
- Writing, reading and speaking removed from active navigation.
- Real conjugator section with verb tables and direct practice launch.
- 40 conjugator verbs, including B2 workplace verbs such as `beauftragen`, `vereinbaren`, `beantragen`, `genehmigen`, `einreichen`, `durchführen`, `entscheiden`, `anbieten`.
- 1,500+ conjugation drills across Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I and Konjunktiv II.
- Modal verb modules with Präsens, Präteritum, Perfekt and Doppelinfinitiv.
- Spaced-review logic that only reviews items the learner has actually answered.
- Practice mode uses stable per-session randomization.
- German speech button reads the German prompt/example, not the English translation.
- XSS-safe rendering for explanations and mistake-bank content.
- Module selector for targeted practice.
- Session-complete state and item index.
- Responsive phone/tablet/desktop PWA.

## Run locally

```bash
npm run check
npm run start
```

Open:

```text
http://localhost:8080
```

Do not open `index.html` directly with `file://`, because the app loads JSON modules with `fetch()`.

## GitHub Pages

Push the repository and enable GitHub Pages from the `main` branch root. The PWA manifest uses `start_url: "."` and the service worker uses stale-while-revalidate for JSON content.

## Validation

```bash
npm run check
```

Checks:

- JSON validity
- `app.js` parse validity


## Progress storage

Deutsch-WiPA is a static PWA. User progress is saved locally in the browser with `localStorage`:

- `dw_modern_profile` for the learner name
- `dw_modern_stats` and `dw_modern_module_stats` for progress
- `dw_modern_mistakes` for the mistake bank
- `dw_modern_srs` for spaced repetition
- `dw_lang` and `dw_theme` for interface preferences

There is no cloud sync. Use the in-app **Backup → Export / Import** controls to transfer progress between devices.


## Visual themes

The app includes ten readable themes: Parchment, Forest, Ocean, Sunset, Lavender, Rose, Sand, Graphite, Midnight, and High contrast. The selected theme is saved locally in `localStorage.dw_theme` and included in progress export/import.

## Appearance and color

The UI separates visual mode from color:

- **Appearance**: System, Light, Dark
- **Color**: Teal, Forest, Ocean, Sunset, Lavender, Rose, Sand, Graphite, Midnight, High contrast

These settings are saved locally as `dw_appearance` and `dw_color` and are included in exported progress backups.
