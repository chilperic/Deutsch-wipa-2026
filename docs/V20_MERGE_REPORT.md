# Deutsch-WiPA v20 Merge Report

## Goal

Unify the previous builds into one optimized version without repeating the main failure pattern: adding large amounts of content while weakening correctness.

## Source hierarchy

1. **v19 core reset**: used as the app foundation.
2. **v10 theme-visible**: used as a filtered content source.
3. Older dashboard/profile/theme builds: treated as historical references only, because their useful ideas were already represented in v10/v19.

## Merge result

The active app now contains 14 modules and 752 items.

| Area | Items |
|---|---:|
| Vocabulary | 239 |
| Articles & plurals | 132 |
| Prepositions | 32 |
| Connectors | 28 |
| Grammar training | 167 |
| Communication | 154 |

## Main corrections

### 1. Localization cleaned

Older builds exposed many UI languages while content used mismatched labels such as `French` instead of `fr`. v20 keeps only German, English, and French active.

### 2. Risky generated material quarantined

The raw conjugator and generated adverb/deklination banks are not active. They need separate linguistic validation before reuse.

### 3. Content deduplicated

The 120-prepositional-verb source collapsed to fewer unique learning patterns after duplicate prompt-answer pairs were removed. This is intentional: repetition is not content depth.

### 4. Learning loop simplified

The learner sees a protocol instead of a control dashboard:

1. Vocabulary
2. Prepositions
3. Connectors
4. Communication

The full module selector still exists for deeper training.

## Known limitations

- `active_recall` items use exact matching. This is acceptable for model-answer drills but not ideal for open production. Future versions should add self-scoring or fuzzy correction.
- French support is functional but not equivalent to a full native-speaker review.
- The old conjugator remains disabled.

## Recommended v21 direction

The next development step should not be another content dump. It should be a better correction engine:

- fuzzy answer matching,
- alternative acceptable answers,
- typo tolerance,
- self-scoring for open sentence production,
- mistake categorization by grammar problem,
- daily protocol with spaced repetition scheduling.
