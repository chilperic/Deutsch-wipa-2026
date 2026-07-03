# Deutsch-WiPA 2026 · v27 Learning Platform Core

A browser-based B1/B2 Beruf learning trainer with restored internal content depth, internal verb conjugation, profile storage, latest-session resume, Fehlerbank, spaced repetition, and responsive desktop/mobile layout.

## Core features

- 56 loaded learning modules from the restored content architecture.
- 5,048 manifest items.
- 1,077 internal conjugator verbs.
- User profile/name saved locally in the browser.
- Latest session saved and resumable.
- Fehlerbank with grouped mistake types and retry sessions.
- Export/import of profile, progress, SRS and mistakes.
- Internal verb tables and practice; external resources are optional only.
- Smartphone-friendly sidebar drawer and bottom navigation behavior.

## Local test

```bash
deactivate 2>/dev/null || true
hash -r

cd ~/Downloads
rm -rf deutsch-wipa-2026-v27-learning-platform-core
unzip -o deutsch-wipa-2026-v27-learning-platform-core.zip
cd deutsch-wipa-2026-v27-learning-platform-core

node --check app.js && \
node dev/check.js && \
python3 -m json.tool data-manifest.json >/dev/null && \
python3 -m json.tool data/conjugator_verbs.json >/dev/null && \
npm run check && \
python3 dev/no_cache_server.py 8000
```

Open:

```text
http://localhost:8000/?v=27.0.0
```

## Design rule

This version restores function first. Do not strip modules, verb training, review, profile, session resume, or Fehlerbank for the sake of visual minimalism.
