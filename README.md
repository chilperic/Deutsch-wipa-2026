# Deutsch-WiPA v19.1 Expanded Core

Deutsch-WiPA v19.1 is a reduced but expanded B1/B2 German trainer. It keeps the v19 safety principle: no generated filler, no unchecked legacy modules, and no fake multilingual claims.

Active curriculum:

1. Vocabulary
2. Articles and plurals
3. Prepositional verbs
4. Connectors and subordinate clauses
5. Dative vs accusative
6. Modal verbs
7. Separable verbs
8. Adjective endings
9. Negation: `nicht` vs `kein`
10. Main-clause word order

The target language is German. The support/interface language is limited to German, English, and French. Other languages remain disabled until their content can be verified.

## Why the app is smaller than v18

The old v18 build contained duplicated items, invalid gap-fill exercises, incorrect plural forms, taxonomy pollution, and incomplete localization. Those defects could mislead learners. v19 prioritizes verified learning value over apparent size.

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
- unsafe/quarantined path exposure
- unexpected module exposure
- duplicate prompt-answer pairs
- gap-fill items without `___`
- multiple-choice items missing the correct answer
- article/plural items without article or plural article
- missing examples and diagnostic feedback in German, English, and French
- suspicious English copied into French localizations
- known incorrect German strings from the v18 audit

Current validated result:

```text
10 modules, 204 verified items, 43 app functions
```

## License

MIT. Free to use, inspect, adapt, and improve.
