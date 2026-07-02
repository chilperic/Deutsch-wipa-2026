# Deutsch-WiPA 2026 v25 · Functional Responsive Trainer

Deutsch-WiPA is a browser-based B1/B2 German-for-work trainer. v25 deliberately returns to the stronger functional baseline from v22, while repairing the UI problems introduced by the over-minimal v23/v24 shells.

## What v25 is

A practical learning trainer for Beruf, Bewerbung, Reklamation, Amt/Jobcenter, grammar, vocabulary, articles/plurals, prepositions, connectors, writing and review.

## Design decision

v25 does **not** remove features to look clean. It keeps the working trainer surface and reorganizes it:

- adaptive training templates remain visible;
- module/path access remains visible;
- review/mistake bank remains visible;
- profile, theme, color, backup/import remain available;
- resources remain available;
- the disabled internal conjugator placeholder is replaced by useful external verb checking links.

## Local test

```bash
deactivate 2>/dev/null || true
hash -r

cd ~/Downloads

rm -rf deutsch-wipa-2026-v25-functional-responsive-trainer
unzip -o deutsch-wipa-2026-v25-functional-responsive-trainer.zip

cd deutsch-wipa-2026-v25-functional-responsive-trainer

node --check app.js && \
node --check sw.js && \
node --check dev/check.js && \
python3 -m json.tool data/core_v25.json >/dev/null && \
python3 -m json.tool data/session_templates.json >/dev/null && \
python3 -m json.tool data/mistake_taxonomy.json >/dev/null && \
python3 -m json.tool data/quarantine_manifest.json >/dev/null && \
npm run check && \
python3 dev/no_cache_server.py 8000
```

Open:

```text
http://localhost:8000/?v=25.0.0
```

## Validation target

```text
16 modules
830 checked learning items
200 production items
28 adaptive Beruf micro-simulations
adaptive scheduler + learner model retained
```

## Browser target

Chrome / Chromium, Firefox, Edge, Safari, Android Chrome, iOS Safari.

The app is static HTML/CSS/JS and does not require a backend.
