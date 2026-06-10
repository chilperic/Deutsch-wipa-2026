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

