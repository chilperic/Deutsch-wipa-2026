# Deutsch-WiPA v19.1 Expanded Core Report

## Decision

This release expands v19 without reactivating the polluted v18 modules. The app remains content-first and validation-gated.

## Active scope

- Paths: 9
- Modules: 10
- Verified items: 204
- Support/interface languages: German, English, French
- Target language: German

## Added modules

1. `cases_core`: dative vs accusative with verb-governed case decisions.
2. `modal_verbs`: müssen, können, dürfen, sollen, wollen, werden, würde in workplace sentences.
3. `separable_verbs`: separable prefix placement in main clauses.
4. `adjective_endings`: common B1/B2 adjective-ending patterns.
5. `negation_core`: nicht/kein contrast.
6. `word_order_core`: verb position 2, time/place order, polite questions and requests.

## Expanded modules

- `vocab_core`
- `article_plural`
- `prep_verbs`
- `connectors`

## Validation gates passed

```bash
node --check app.js
npm run check
```

Result:

```text
Deutsch-WiPA v19 checks passed: 10 modules, 204 verified items, 43 app functions.
```

## What remains intentionally disabled

- The old large conjugator
- Business simulations
- Complaint/negotiation/email sequence modules
- Unsupported interface languages beyond DE/EN/FR
- Any generated 160-item legacy modules

## Reason

The old modules had too many content and UX defects. They should not be reintroduced by renaming or broad category routing. Each future module must pass the same blocking validation and manual content review before shipping.
