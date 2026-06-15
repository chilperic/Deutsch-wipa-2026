# Deutsch-WiPA v19 Core Reset Report

## Decision

v18 was treated as contaminated. The repair strategy was not to patch every visible symptom, but to remove unsafe content paths and rebuild a smaller verified learning core.

## Removed from active app

- business email simulations
- complaint simulations
- negotiation simulations
- invoice-dispute simulations
- fake 160-item generated modules
- old workplace vocabulary bundles
- unverified multilingual localization fields
- old large conjugator practice flow

These were removed from the shipped active files, not merely hidden from the menu.

## Active modules

| Module | Items | Purpose |
|---|---:|---|
| Vocabulary | 20 | German workplace words with EN/FR support, examples, and diagnostic feedback |
| Articles & plurals | 16 | Hand-checked noun gender and plural recall |
| Prepositional verbs | 12 | Real gap-fill items with verb + preposition + case feedback |
| Connectors & word order | 8 | Multiple-choice sentence-structure discrimination |

Total active verified items: 56.

## Pedagogical changes

- Quantity was reduced to avoid fake progress.
- Every item has a German example.
- Every item has diagnostic feedback in DE/EN/FR.
- Gap-fill exercises must contain a visible blank.
- Multiple-choice exercises must include the correct answer.
- Article/plural exercises must include an article in the singular and plural.
- The app distinguishes target language from support/interface language.

## Known limitation

This is not a complete German course. It is a safe core trainer. Expansion should be done module by module, with validation gates and manual linguistic review.

## Validation command

```bash
npm run check
```

Current result:

```text
Deutsch-WiPA v19 checks passed: 4 modules, 56 verified items, 43 app functions.
```
