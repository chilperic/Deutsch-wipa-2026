# Contributing

The priority is learning quality, not item count.

## Rules for new items

Every item must include:

- stable `id`
- `type`: `vocabulary_choice`, `article_plural`, `gap_fill`, `multiple_choice`, or `active_recall`
- German example in `example_de`
- English and French support in `example`
- diagnostic feedback in German, English, and French
- realistic B1/B2 Beruf context

Avoid generic sentences such as “X ist wichtig.” Use realistic workplace or bureaucracy situations.

## Scheduler compatibility

New items should carry meaningful tags, for example:

- `bewerbung`
- `unterlagen`
- `amt`
- `reklamation`
- `technisch`
- `register`
- `word_order`
- `preposition`

The adaptive scheduler uses item type, path, tags, review state, learner skill score, and recent history.

## Validation

Run:

```bash
npm run check
```

Do not deploy if validation fails.
