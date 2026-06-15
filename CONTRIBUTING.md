# Contributing

Add content only to `data/core_v19.json` unless a new validated dataset is introduced.

Before committing, run:

```bash
npm run check
```

A new item must include:

- stable `id`
- valid `type`
- German prompt or term
- correct answer
- German example
- EN and FR example translation
- diagnostic feedback in DE/EN/FR

Do not add generated bulk content without manual review. Do not inflate item counts by repeating prompt-answer pairs.
