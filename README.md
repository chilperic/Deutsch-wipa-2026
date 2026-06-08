# Deutsch Trainer

Deutsch Trainer is a browser-based learning app for German vocabulary, workplace language, and B1/B2 grammar practice. It is designed for active recall: the learner sees a prompt, answers, receives feedback, and repeats weak items until the material becomes usable.

The project is based on the learning needs of B1/B2 German learners, especially learners preparing for professional communication in Germany. It includes vocabulary, article and plural training, workplace sentence banks, prepositional verbs, reflexive verbs, connectors, sentence order, negation, cases, adjective endings, strong verbs, separable verbs, tense practice, Konjunktiv II, and other grammar modules.

## Features

- Vocabulary practice with article and plural feedback
- Beruf & Büro sentence bank for workplace German
- Grammar modules for B1/B2 transition
- Active recall modes instead of passive reading
- Weak-item review
- Learner profile and local progress tracking
- Multiple themes and layout modes
- Mobile-friendly interface
- No backend required
- Static deployment through GitHub Pages

## Project structure

```text
Deutsch-wipa-2026/
├── index.html
├── README.md
├── LICENSE
├── project_manifest.json
├── vokabular/
│   ├── kapitel1.json
│   ├── kapitel2.json
│   ├── kapitel3.json
│   └── kapitel4.json
├── grammatik/
│   ├── adjektivdeklination.json
│   ├── artikel_plural.json
│   ├── beruf_buero.json
│   ├── genus_regeln.json
│   ├── infinitiv_mit_zu.json
│   ├── kasusergaenzungen.json
│   ├── konjunktiv_II.json
│   ├── konnektoren_nebensaetze.json
│   ├── n_deklination.json
│   ├── negation.json
│   ├── perfekt.json
│   ├── plusquamperfekt.json
│   ├── praepositionen.json
│   ├── praepositionalverben.json
│   ├── pronomen.json
│   ├── reflexive_verben.json
│   ├── satzordnung_tekamolo.json
│   ├── starke_verben.json
│   └── trennbare_verben.json
├── docs/
└── dev/
```

File names may evolve as the app develops. The important principle is simple: vocabulary belongs in `vokabular/`, grammar and sentence-training content belongs in `grammatik/`, documentation belongs in `docs/`, and development checks belong in `dev/`.

## Learning modules

### Vocabulary

The vocabulary modules train:

- article recognition: `der`, `die`, `das`
- plural forms
- meaning recall
- chapter-based vocabulary
- wrong-answer correction

### Grammar

The grammar modules cover:

- noun gender and article patterns
- article and plural practice
- prepositional verbs
- verbs with Akkusativ, Dativ, and double objects
- strong verbs
- separable verbs
- reflexive verbs
- negation with `nicht` and `kein`
- connectors and subordinate clauses
- TeKaMoLo and sentence order
- adjective declension
- pronouns
- Perfekt and Plusquamperfekt
- Infinitiv mit `zu`
- Konjunktiv II
- workplace and office communication

### Workplace German

The workplace material focuses on practical communication:

- introducing yourself
- talking about work experience
- job search and applications
- first days at a new job
- workplace routines
- giving and accepting tasks
- asking about urgency
- customer requests
- complaints and responses
- accidents and help requests
- professional qualifications
- working conditions

## Running locally

No installation is required.

Open:

```text
index.html
```

in a browser.

For a cleaner local test, run a small local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploying to GitHub Pages

Replace the contents of your repository with this project, then run:

```bash
git status
git add .
git commit -m "Update Deutsch Trainer content and UI"
git push
```

If GitHub Pages is enabled, the app should update automatically after the push.

## Development checks

The `dev/` folder may contain validation scripts. Run them before committing when Node.js is available:

```bash
node --check dev/script_check.js
node dev/quality_check.js
```

The checks are not a substitute for manual testing. At minimum, test the following in the browser:

1. Open the app.
2. Enter a learner name.
3. Change the theme.
4. Select a module.
5. Start a session.
6. Answer one item correctly and one item incorrectly.
7. Confirm that feedback appears.
8. Confirm that you can move to the next item.
9. Open the tracker.
10. Refresh the page and confirm that progress remains.

## Content principles

The app should not reveal the answer before the learner responds. A good item should have:

- a clear prompt
- one expected answer or a small controlled answer set
- useful feedback
- a short explanation when the answer is wrong
- enough context to learn the grammar pattern
- no unnecessary UI noise

For nouns, include article and plural whenever possible. For verbs, include the required case or preposition. For connectors, include word-order feedback. For workplace phrases, include realistic professional contexts.

## Adding new content

Add new JSON content to the relevant folder.

Use `vokabular/` for chapter vocabulary:

```text
vokabular/kapitel5.json
```

Use `grammatik/` for grammar or workplace modules:

```text
grammatik/new_module.json
```

A useful content item should normally contain:

```json
{
  "id": "unique-id",
  "module": "module-name",
  "type": "active-recall",
  "prompt": "Question shown to the learner",
  "answer": "Expected answer",
  "choices": ["option 1", "option 2", "option 3", "option 4"],
  "explanation": "Short explanation after the answer",
  "tags": ["B1", "B2", "grammar-topic"]
}
```

The exact schema can be extended, but keep it consistent. Do not create a new schema for every module unless the learning interaction really requires it.

## Contribution guidelines

This project is open for further development. Useful contributions include:

- more B1/B2 grammar items
- better feedback explanations
- better mobile layout
- accessibility improvements
- additional themes
- better progress analytics
- cleaner JSON schemas
- tests for content quality
- bug fixes
- documentation improvements

Before contributing, check that the app still works in a browser and that the learning flow does not expose the answer too early.

## License

This project is released under the MIT License. You are free to use, modify, copy, merge, publish, distribute, sublicense, and build on it, provided that the license notice is included.

See [`LICENSE`](LICENSE) for details.


## Communication modules

The communication section is now active and includes:

```text
- Entschuldigung & Reaktion
- Reklamation / technische Probleme
- Bewerbung / Arbeit
```

These modules train practical B1/B2 communication: apologies, polite reactions, complaints, customer-service answers, job interview phrases, workplace questions, and self-presentation.
