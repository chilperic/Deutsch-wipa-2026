# Deutsch-WiPA 2026 — v18 Final Reliable Tutor

This build is the consolidated reliable-tutor app.

## What is included

- secured curated database only; contaminated legacy engines remain deleted
- one large verb backend in `data/curated_verbs.json`
- localized vocabulary through `data/locales/wipa_lexicon.json`
- thematic tracks: Corporate Emails, Reklamation & Konflikt, Verhandlung & Diplomatie, Grammar Core, Präpositionalverben, Wortschatz Beruf, Konjugation
- sequenced business artifacts:
  - B2B Reklamation / Mängelrüge
  - formal follow-up email
  - Konjunktiv-II negotiation email
  - invoice-dispute decision simulation
- safe variable templates with validated slots only
- progressive feedback for sequenced and ordinary curated exercises
- DIN-style final artifact preview for assembled business emails

## Run

```bash
npm run check
npm start
```

Then open `http://localhost:8080`.

## Design rule

No raw generated German enters the default tutor path. Dynamic variation is allowed only through validated slots with grammatical and semantic constraints.
