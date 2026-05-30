# Deutsch WIPA 2026 · Quality Redesign Build

This build is a learner-only German training app with corrected grammar data and a redesigned interface.

## Main corrections

```text
- Admin/developer UI removed.
- New color system and layout.
- Answer leakage reduced: recall screens hide the target answer.
- Corrected adjective declension examples.
- Corrected strong-verb Partizip II answers.
- Corrected V2 word order in generated Kasusergänzungen examples.
- Added skill-level progress keys.
- Added dev/quality_check.py for quality control.
```

## Module counts

```json
{
  "praepositionalverben.json": 141,
  "kasusergaenzungen.json": 90,
  "starke_verben.json": 100,
  "trennbare_verben.json": 90,
  "praepositionen.json": 84,
  "nomen_artikel_plural.json": 72,
  "adjektivdeklination.json": 90,
  "pronomen.json": 86,
  "konnektoren_nebensaetze.json": 90
}
```

## Run locally

```bash
cd Deutsch-wipa-2026_structured
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Checks

```bash
node --check dev/script_check.js
python3 dev/quality_check.py
```

Expected build marker:

```js
window.VOKABULAR_BUILD
```

```text
quality-redesign-reviewed-2026-05-29
```


## Responsive embedded review build

This build addresses the deployed screenshot issue where modules displayed `0 items`.

Changes:

```text
- Phone / Computer view selector
- Four themes: Midnight, Paper, Forest, Berry
- Improved dropdown contrast and touch size
- Mobile bottom action bar
- Embedded data fallback inside index.html
```

The embedded fallback means the app can still show learning items even if GitHub Pages fails to fetch the JSON files from `vokabular/` or `grammatik/`.

Build marker:

```text
responsive-embedded-review-2026-05-30
```
