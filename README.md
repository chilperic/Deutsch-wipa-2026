# Deutsch-WiPA v19 Core

Deutsch-WiPA v19 Core is a deliberately reduced B1/B2 German trainer.

This version removes the unsafe v18 generated content and keeps only a small verified core:

1. Vocabulary
2. Articles and plurals
3. Prepositional verbs
4. Connectors and word order

The target language is German. The support/interface language is limited to German, English, and French. Other languages were removed until their content can be verified.

## Why v19 is smaller

The previous build contained duplicated items, incorrect plural forms, invalid gap-fill exercises, taxonomy pollution, and incomplete localization. Those defects could mislead learners. v19 prioritizes correctness over quantity.

## Run locally

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Validate

```bash
npm run check
```

The check blocks:

- duplicate function declarations
- unsafe/quarantined module exposure
- duplicate prompt-answer pairs
- gap-fill items without `___`
- multiple-choice items missing the correct answer
- article/plural items without article or plural article
- missing examples and diagnostic feedback
- known incorrect German strings from the v18 audit

## License

MIT. Free to use, inspect, adapt, and improve.
