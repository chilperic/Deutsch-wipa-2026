# Deutsch-WiPA 2026 · v28.1 Learner-Clean UI

v28.1 keeps the v28 deployment consistency fixes but removes learner-facing build/debug noise from the interface.

## What v28.1 fixes

- Hidden `window.DEUTSCH_WIPA_BUILD` self-test for online verification without displaying release metadata to learners.
- Service worker disabled and self-unregistering to prevent stale GitHub Pages shells.
- Internal version strings synchronized to `28.1.0`.
- Language-code mapping fixed: UI codes such as `fr`, `ar`, `fa` now map to content keys such as `French`, `Arabic`, `Persian`.
- SRS and Fehlerbank keys are namespaced by module, e.g. `grammatik_beruf::beruf_001`, avoiding collisions between modules.
- Profile, local progress, latest session, Fehlerbank, export/import, and the internal 1,077-verb conjugator are preserved.

## Local test

```bash
deactivate 2>/dev/null || true
hash -r

cd ~/Downloads

rm -rf deutsch-wipa-2026-v28.1-learner-clean-ui
unzip -o deutsch-wipa-2026-v28.1-learner-clean-ui.zip

cd deutsch-wipa-2026-v28.1-learner-clean-ui

node --check app.js && \
node dev/check.js && \
python3 -m json.tool data-manifest.json >/dev/null && \
python3 -m json.tool data/conjugator_verbs.json >/dev/null && \
npm run check && \
python3 dev/no_cache_server.py 8000
```

Open:

```text
http://localhost:8000/?v=28.1.0
```

## Online deployment check

After pushing to GitHub Pages, verify that the deployed HTML is not stale:

```bash
curl -L https://chilperic.github.io/Deutsch-wipa-2026/ | grep -E "v28.1.0|DEUTSCH_WIPA_BUILD|profileName|lastSessionSummary|Fehlerbank"
```

Expected: matching lines. If not, GitHub Pages is still serving the wrong artifact or a stale shell.
