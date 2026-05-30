# Deutsch WIPA 2026 · UX and Content Repair Build

This build implements the critique-driven corrections.

## Main fixes

```text
- Removed the Phone/Computer debug toggle from production UI.
- Kept automatic responsive phone layout via CSS.
- Added four color themes: Midnight, Paper, Forest, Berry.
- Improved dropdown contrast and touch targets.
- Added SRS progress export/import.
- Added embedded fallback data so modules should not show 0 items.
- Added translation coverage warnings.
- Flagged placeholder translations where non-English values equal English.
- Fixed obvious umlaut plural errors.
- Replaced detectable placeholder example sentences.
- Added ARIA labels and ✓/✗ feedback signs.
- Added a 3-column grid breakpoint for mid-width laptops.
```

## Checks

```bash
node --check dev/script_check.js
python3 dev/quality_check.py
```

## Build marker

```text
ux-content-repair-final-2026-05-30
```

## Counts

```json
{
  "kapitel1.json": 81,
  "kapitel2.json": 93,
  "kapitel3.json": 76,
  "kapitel4.json": 67,
  "adjektivdeklination.json": 90,
  "kasusergaenzungen.json": 90,
  "konnektoren_nebensaetze.json": 90,
  "nomen_artikel_plural.json": 72,
  "praepositionalverben.json": 141,
  "praepositionen.json": 84,
  "pronomen.json": 86,
  "starke_verben.json": 100,
  "trennbare_verben.json": 90
}
```

## Known limitation

The app now flags weak translation coverage, but flagged entries still need proper human translation. A validator can catch placeholders; it cannot produce guaranteed high-quality Korean, Thai, Arabic, Persian, Chinese, etc. translations automatically.
