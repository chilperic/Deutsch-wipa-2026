# Deutsch-WiPA 2026 v18.2.4

Hotfix: disables stale service-worker caching and fixes exact routing for Deklination / Artikel & Nomen / Adverbien / Konjugation.

Run:

```bash
npm run check
npm run start
```

If an older build still appears once, open DevTools → Application/Storage → Clear site data, then hard-refresh. This build also unregisters old service workers automatically.

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


## v18.1 content-complete correction

This build fixes the v18 underpopulation problem. Empty tracks were removed by adding real expanded modules for Artikel & Nomen, Adverbien, and Wortschatz-Ergänzung B1/B2. Core grammar modules were expanded to practical middle-size ranges instead of 10–30 item placeholders.


## v18.2 context + 160-item expansion

This build expands the core tutor modules to 160 contextualized items each and integrates Kapitel 1–4 vocabulary as a lexicon-backed B1/B2 vocabulary track. Generic placeholder examples such as “Das Lernwort heute ist …” were not used as final learning examples; chapter items now include source chapter, context domain, and a German sentence usable in class/workplace practice.

Expanded to 160 items: Modalverben, Präpositionalverben, Konnektoren, nicht/kein, Kasus, TeKaMoLo, Adjektivdeklination, Artikel & Nomen, Adverbien, Berufs- und Bürowortschatz. Kapitel vocabulary contains all imported chapter words from Kapitel 1–4 plus Foto-Ergänzung.
