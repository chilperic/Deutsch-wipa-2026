# v17.3 Sequenced Reklamation + Progressive Feedback

This build adds the first sequenced business artifact module. The Reklamation module is no longer a random flashcard pool. It is a five-step B2B complaint scenario with chronology, register selection, syntax feedback, controlled production, and final artifact assembly.

## Added
- `grammatik/v17_reklamation_sequenced.json`
- `module_type: sequenced_business_artifact` support in `app.js`
- Progressive feedback stages: first failure, rule hint, resolved model
- Syntax-ordering token UI
- Controlled production with mandatory and forbidden patterns
- Final formal complaint email assembly

## Removed
- `grammatik/v17_reklamation_curated.json` to avoid same-topic split brain

## Limitation
This is a pilot implementation. The rest of the modules still use the standard item renderer. Do not convert additional modules until this pilot is manually tested in browser.
