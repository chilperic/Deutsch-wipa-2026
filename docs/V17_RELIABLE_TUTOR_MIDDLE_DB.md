# v17 Reliable Tutor Middle DB — Content Notes

## Goal

A middle-sized database: not tiny, not bulk-generated. The default app loads curated or spot-checked modules only.

## Quarantined by default

The following v16 files remain present but are not loaded by `data-manifest.json` because audits found repetition, generated nonsense, or grammar risks:

- `grammatik/production_adverbien_intensiv.json`
- `grammatik/konnektoren_engine.json`
- `grammatik/reklamation_technische_probleme.json`
- `grammatik/praepositionalverben.json`
- `grammatik/kasusergaenzungen.json`
- `grammatik/pronomen.json`
- `grammatik/material_b2_zweiteilige_konnektoren.json`
- `vokabular/production_workplace_collocations.json`

## v17 module rule

Every new item should have:

- `level`
- one grammar/communication target
- realistic workplace or learner-life context
- English orientation when useful
- clear explanation
- no nonsensical collocation
- no repeated frame more than twice unless it is deliberate SRS, not static padding

## Known limitation

This is a first reliable-tutor cut, not a complete 600-item final database. The safest next step is expanding the v17 modules to 40–60 items each with the same standard.
