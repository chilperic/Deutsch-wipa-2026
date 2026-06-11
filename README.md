# Deutsch-WiPA 2026 — v17 Reliable Tutor Middle DB

This build is a content-quality reset of v16. The app shell is preserved, but the default database is now smaller, curated, and tutor-oriented.

## What changed

- Unsafe generated modules are no longer loaded by `data-manifest.json`.
- New v17 curated modules were added for: Präpositionalverben, Konnektoren, nicht/kein, Kasus, TeKaMoLo, Reklamation, E-Mail-Redemittel, Konjunktiv II, and Adjektivdeklination.
- The large conjugator backend remains available.
- Known separable-verb Konjunktiv II errors in `production_konjugator_drills.json` were repaired: e.g. `ich würde bereite vor` → `ich würde vorbereiten`.
- v16 generated files remain in the repository for audit/reference, but many are quarantined and excluded from default loading.

## Tutor standard

Each new v17 item should test one main thing, use realistic German, include an explanation, and avoid fake workplace phrases.

## Run

```bash
npm run check
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Development rule

Do not add bulk generated German directly to the manifest. Add it first as `status: needs_review` or keep it outside the default manifest until hand-checked.
