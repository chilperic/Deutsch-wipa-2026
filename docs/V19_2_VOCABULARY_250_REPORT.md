# Deutsch-WiPA v19.2 Vocabulary Expansion Report

## Scope

v19.2 expands only the verified Wortschatz module. No quarantined v18 modules were reintroduced.

## Result

- Active modules: 10
- Wortschatz items: 260
- Total verified items: 424
- Support languages: German UI, English support, French support
- Every Wortschatz item contains:
  - German noun with article
  - plural form with `die`
  - English meaning
  - French meaning
  - German example
  - English/French example orientation
  - diagnostic feedback with article and plural

## Validation gates added

- `vocab_core` must contain at least 250 items.
- Every vocabulary item must be `vocabulary_choice`.
- Every vocabulary item must include a plural beginning with `die`.
- Existing gates remain active: no duplicate ids, no duplicate prompt-answer pairs, valid choices, EN/FR examples, diagnostic feedback, and banned wrong plural strings.

## Deliberate exclusions

The old v18 vocabulary dump was not imported because it contained copied localizations, wrong plurals, and taxonomy pollution. This is a controlled expansion of the safe v19 core.
