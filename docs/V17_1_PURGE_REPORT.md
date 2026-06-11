# v17.1 Purge Report

## Decision

v17 was conceptually correct but still contained a split-brain repository: curated files were active through the manifest, while contaminated legacy files remained beside them. This build removes that conflict.

## Removed from active database directories

Legacy grammar modules with known repetition, nonsense generation, or duplicate topic coverage were deleted from `/grammatik`. Legacy vocabulary files `kapitel1–4`, `kapitel3_foto_ergaenzung`, and old workplace collocation files were deleted from `/vokabular`.

## Remaining active content

- `v17_*_curated.json` modules
- `production_konjugator_drills.json`
- `production_modalverben_praesens.json`
- `production_modalverben_praeteritum.json`
- `v17_beruf_wortschatz_curated.json`
- `data/conjugator_verbs.json` and `data/curated_verbs.json`

## Not solved yet

The UI is still largely monolithic. This build fixes the database source-of-truth problem first. A later UI refactor should introduce thematic tracks and progressive feedback.
