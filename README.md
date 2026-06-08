# Deutsch-wipa-2026

Deutsch Trainer app for vocabulary, B1/B2 grammar, and active recall.

Build marker:

```text
themed-grouped-learning-2026-06-08
```

## How to deploy

Replace the contents of your local `Deutsch-wipa-2026/` repository folder with the contents of this folder, then run:

```bash
git status
git add .
git commit -m "Upgrade grouped learning UI and grammar engines"
git push
```

If GitHub Pages is enabled for the repository, the app will update after the push.

## Main files

```text
Deutsch-wipa-2026/
├── index.html
├── README.md
├── project_manifest.json
├── .nojekyll
├── vokabular/
├── grammatik/
├── docs/
└── dev/
```

## Implemented

```text
- Grouped themes:
  Appearance: System / Light / Dark
  Flavor: Classic / Ocean / Forest / Sand / Violet / Rose / High Contrast

- Grouped modules:
  Vocabulary
  Nouns
  Verbs
  Sentence logic
  Forms
  Communication

- Active learning engines:
  Konnektoren
  Negation
  Satzordnung / TeKaMoLo

- Local learner profile and progress tracking
- Weak-item review
- Mobile bottom navigation
- Phone / Computer / Auto layout selector
```

## Build check

Open the app, then in the browser console run:

```js
window.VOKABULAR_BUILD
```

Expected:

```text
themed-grouped-learning-2026-06-08
```
