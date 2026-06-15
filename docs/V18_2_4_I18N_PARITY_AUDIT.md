# v18.2.4 i18n parity audit and fix

## Diagnosis
The language selector was functional but incomplete. It changed the subset of UI strings routed through `tr()`, while several visible regions stayed hard-coded in German or English:

- top navigation labels
- sidebar labels and controls
- mobile quick controls
- path cards and hero metadata
- exercise placeholders and completion text
- progressive feedback labels
- exercise-type labels beyond German/English
- resources page heading and description
- conjugator list metadata and verb detail labels

The learning content design is correct: German remains the target language. The selected language should be treated as the support/interface language, not as a replacement for German exercise prompts.

## Fixes applied
- Added a parity translation patch for all currently exposed interface languages: DE, EN, FR, ES, AR, FA, UK, RU, PL, TR.
- Added localized static UI synchronization through `localizeStaticUI()`.
- Localized path titles/subtitles without changing the underlying data taxonomy.
- Replaced active hard-coded UI labels in the exercise shell, feedback shell, resources view, and conjugator shell.
- Added non-English exercise-type labels.
- Preserved the multilingual lexicon lookup for vocabulary translations.
- Bumped cache/version metadata to `v18.2.4-i18n-parity`.

## Remaining limitation
The grammar explanations and many raw exercise prompts are still authored in German/English inside the dataset files. That is acceptable for German learning, but full support-language explanations would require adding structured localized explanation fields to the data files, not just UI patching.

## Verification
- `node --check app.js` passed.
- `npm run check` passed.
