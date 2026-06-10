# Deutsch-WiPA 2026 — Modern Grammar App

Grammar-first B1/B2 German trainer focused on **Konjugation**, **Satzbau**, **Fälle**, **Präpositionen**, **Artikel/Nomen**, **Adjektive**, **Konnektoren** and workplace vocabulary inspired by the Linie-Beruf learning philosophy.

## Current build

This version applies the full modern-UX and audit-correction pass:

- Modern learning-card UI, no dashboard-like clutter.
- Learner-facing paths instead of raw internal folders.
- Writing, reading and speaking removed from active navigation.
- Real conjugator section with verb tables and direct practice launch.
- 1,077 verified conjugator verbs with corrected regular, irregular, separable and non-separable forms.
- Dynamic conjugation practice generated on demand, with tense and session-length filters.
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
- `dw_lang`, `dw_appearance`, and `dw_color` for interface preferences

There is no cloud sync. Use the in-app **Backup → Export / Import** controls to transfer progress between devices.


## Appearance and color

The UI separates visual mode from color:

- **Appearance**: System, Light, Dark
- **Color**: Teal, Forest, Ocean, Sunset, Lavender, Rose, Sand, Graphite, Midnight, High contrast

These settings are saved locally as `dw_appearance` and `dw_color` and are included in exported progress backups.


## v12 verification note

This build keeps only the relevant audit fixes from the v11 audit: workplace-collocation translation shadowing, ambiguous adverb prompts, declension/cases path overlap, manifest count drift, local progress export/import, and mobile navigation. Older audit items about removed reading/writing/speaking modules are intentionally ignored.
