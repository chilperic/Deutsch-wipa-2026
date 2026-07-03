# Deutsch-WiPA 2026 v26 · Functional Responsive Trainer

This release restores the rich v7/v22 learning surface instead of the reduced v24/v25 shell. The app is meant to be a B1/B2 Beruf German trainer with visible functionality: modules, grammar practice, internal verb conjugation, mistake review, spaced repetition, and workplace vocabulary.

## Why v26 exists

The previous reduced builds looked cleaner but felt empty. v26 uses the content-rich v7 app as the base and repairs responsiveness without removing learning tools.

## Included learning areas

- Internal Konjugator with 1077 verbs
- 56 module entries in the manifest
- Kapitel vocabulary 1–4
- Beruf & Büro vocabulary
- Präpositionalverben
- Starke Verben and trennbare Verben
- Modalverben and tense drills
- Perfekt, Plusquamperfekt, Konjunktiv II
- Pronomen, Kasus, Präpositionen, Nomen/Artikel/Plural
- Satzbau, TeKaMoLo, Negation, Konnektoren
- Bewerbung, Reklamation, Entschuldigung, workplace communication
- Fehlerbank and SRS-style local progress

## Local test

```bash
node --check app.js && \
node dev/check.js && \
python3 -m json.tool data-manifest.json >/dev/null && \
python3 -m json.tool data/conjugator_verbs.json >/dev/null && \
npm run check && \
python3 dev/no_cache_server.py 8000
```

Open:

```text
http://localhost:8000/?v=26.0.0
```

## Browser targets

Target: Chrome/Chromium, Firefox, Edge, Safari, Android Chrome, iOS Safari. The interface avoids hover-only controls and keeps tap targets large enough for smartphone use.

## External resources

The app does **not** outsource verb learning. Verb training is internal. External links are only optional reference aids. The visible resource list uses Mein Deutschbuch as the main grammar reference.
