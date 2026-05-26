# Deutsch WIPA 2026 · Lernwortschatz App

A browser-based German vocabulary app for practising the **Lernwortschatz** from the course.

The app helps learners practise vocabulary by chapter through:

- article recognition
- meaning recognition
- plural recall
- grammar-pattern recall
- sentence-gap practice
- active recall
- spaced repetition
- weak-word review
- progress tracking

The app runs completely in the browser. No account, backend, database, API key, or installation is required.

---

## Live app

If deployed with GitHub Pages, the app will be available at a URL like:

```text
https://YOUR-USERNAME.github.io/Deutsch-wipa-2026/
```

Replace `YOUR-USERNAME` with the GitHub account name.

---

## Project structure

The clean deployment structure is:

```text
Deutsch-wipa-2026/
├── index.html
├── README.md
└── data/
    ├── kapitel1.json
    ├── kapitel2.json
    ├── kapitel3.json
    └── kapitel4.json
```

Optional maintainer files can be stored separately:

```text
Deutsch-wipa-2026/
├── docs/
│   └── plural_QA_report.json
└── dev/
    └── script_check.js
```

Only `index.html` and the `data/` folder are required for the app to run.

---

## Required files

### `index.html`

The full app is contained in one file:

```text
index.html
```

It includes:

- HTML structure
- CSS styling
- JavaScript app logic
- chapter loading
- quiz engine
- spaced repetition logic
- tracker
- interface language selector
- dark/light/system theme
- grammar and dictionary resource links
- local browser progress storage

### `data/kapitelN.json`

Each chapter file stores the vocabulary data.

Expected naming pattern:

```text
data/kapitel1.json
data/kapitel2.json
data/kapitel3.json
data/kapitel4.json
...
```

The app automatically looks for:

```text
data/kapitel1.json
data/kapitel2.json
...
data/kapitel20.json
```

Missing files are ignored.

Use lowercase filenames exactly like this:

```text
kapitel1.json
kapitel2.json
kapitel3.json
```

Do not use:

```text
Kapitel 1.json
chapter1.json
kapitel_1.json
```

---

## Vocabulary data format

Each chapter file should contain a `words` array.

Example word entry:

```json
{
  "id": "k1_001",
  "word": "die Messe, -n",
  "notes": "Kapitel 1 · Gabrielas Seite",
  "status": "done",
  "data": {
    "translations": {
      "English": "trade fair, exhibition",
      "Spanish": "feria, exposición",
      "French": "foire, salon",
      "Japanese": "見本市、展示会",
      "German": "die Messe, -n",
      "Korean": "무역 박람회, 전시회",
      "Italian": "fiera, esposizione",
      "Chinese": "展会，展览",
      "Portuguese": "feira, exposição",
      "Persian": "نمایشگاه تجاری، نمایشگاه",
      "Arabic": "معرض تجاري، معرض",
      "Thai": "งานแสดงสินค้า, นิทรรศการ"
    },
    "grammar": {
      "type": "noun",
      "article": "die",
      "base": "Messe",
      "plural_hint": "-n",
      "plural": "die Messen"
    },
    "explanation": {
      "English": "This item belongs to Kapitel 1.",
      "German": "Dieses Wort gehört zu Kapitel 1.",
      "French": "Ce mot appartient au chapitre 1.",
      "Spanish": "Esta palabra pertenece al capítulo 1."
    },
    "grammar_clarification": {
      "English": "Noun. Learn it with article and plural: die Messe → die Messen.",
      "German": "Nomen. Lerne es mit Artikel und Plural: die Messe → die Messen."
    },
    "example_de": "Die Messe findet nächste Woche statt.",
    "example_translated": {
      "English": "The trade fair takes place next week.",
      "German": "Die Messe findet nächste Woche statt."
    },
    "usage_note": {
      "English": "Use this item in short oral and written recall exercises.",
      "German": "Übe dieses Wort mündlich und schriftlich in kurzen Wiederholungen."
    }
  }
}
```

---

## Supported vocabulary languages

The vocabulary data supports these languages:

```text
English
Spanish
French
Japanese
German
Korean
Italian
Chinese
Portuguese
Persian
Arabic
Thai
```

The **quiz language** controls which translation language is used for answers.

The **interface language** controls the app buttons, labels, and dashboard text.

---

## Main features

### Chapter-based practice

Learners can select a specific Kapitel or practise all loaded chapters.

### Multi-step quiz flow

The app tests German vocabulary through several stages:

```text
1. Article
2. Meaning
3. Plural
4. Grammar pattern
5. Active recall
```

For example:

```text
Messe → die
die Messe → trade fair / exhibition
die Messe → die Messen
```

### Sentence-gap mode

The app includes grammar-in-context practice, for example:

```text
Ich bewerbe mich ___ eine Stelle.
Correct: um
```

This is useful for German prepositions and case patterns.

### Mistake diagnosis

When the learner makes a mistake, the app gives a short explanation, for example:

```text
Article mistake: you need the gender with the noun.
Plural mistake: learn the noun with article and plural.
Grammar-pattern mistake: memorize the preposition/case with the expression.
```

### Spaced repetition

Progress is stored in the browser using `localStorage`.

The app tracks:

- correct attempts
- wrong attempts
- weak words
- due words
- review boxes
- session history
- accuracy

### Theme selection

The app supports:

```text
Dark
Light
System
```

`System` follows the browser or operating system theme.

### Student/Admin mode

Student mode hides technical tools from normal learners.

Admin mode shows maintenance tools such as:

- reload chapters
- replace from files
- import JSON
- export JSON
- data quality dashboard

---

## Grammar and dictionary resources

The app includes links to German learning resources:

- Duden
- DWDS
- Verbformen
- LEO
- Linguee
- Wiktionary
- Mein Deutschbuch
- Deutschplus
- Schubert Verlag
- Deutsche Welle
- Grammis
- EasyDeutsch
- Anki
- Goethe practice
- VHS Lernportal

These links are optional. The app works without them, but they help learners check grammar, plural forms, and usage.

---

## Running locally

Opening `index.html` directly by double-clicking may block chapter loading in some browsers because of local file security rules.

Recommended local test:

```bash
cd Deutsch-wipa-2026
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## Deploying with GitHub Pages

1. Push the repository to GitHub.
2. Go to repository settings.
3. Open **Pages**.
4. Set:

```text
Source: Deploy from branch
Branch: main
Folder: /root
```

5. Save.

The app will be available at:

```text
https://YOUR-USERNAME.github.io/Deutsch-wipa-2026/
```

---

## Updating vocabulary

To update or add a chapter:

1. Create or edit a JSON file:

```text
data/kapitel5.json
```

2. Commit and push the file.
3. Open the app.
4. In Admin mode, click:

```text
Reload chapters
```

or:

```text
Replace from files
```

Use **Replace from files** when you want the browser to discard old cached vocabulary and reload the current files from GitHub.

---

## Maintainer files

### `plural_QA_report.json`

This file is optional and should not be shown to normal users.

Recommended location:

```text
docs/plural_QA_report.json
```

It lists nouns whose plural could not be safely derived automatically and may need manual review.

### `script_check.js`

This file is optional and only useful for development.

Recommended location:

```text
dev/script_check.js
```

It can be checked with:

```bash
node --check dev/script_check.js
```

Do not worry if this file is absent from the public app. It is not required.

---

## Troubleshooting

### The app shows a blank screen

Open the browser console and check:

```js
window.VOKABULAR_BUILD
```

If the value is old or missing, the browser may be using a cached version.

Try:

```text
Ctrl + Shift + R
```

or clear site data in the browser developer tools.

### New JSON files are not loading

Check the file path and name:

```text
data/kapitel1.json
data/kapitel2.json
```

The app will not automatically load incorrectly named files like:

```text
Kapitel 1.json
kapitel_1.json
chapter1.json
```

### Progress looks outdated after changing data files

Use Admin mode:

```text
Replace from files
```

This reloads the chapter files and avoids stale local browser data.

### Plural answers are not accepted

The app accepts umlaut keyboard alternatives:

```text
ä = ae
ö = oe
ü = ue
ß = ss
```

Examples:

```text
Verträge = Vertraege
Rucksäcke = Rucksaecke
Mütter = Muetter
```

For best results, every noun should contain:

```json
"plural": "die Verträge"
```

inside its `grammar` object.

---

## Current status

The current app supports:

```text
Kapitel 1
Kapitel 2
Kapitel 3
Kapitel 4
```

More chapters can be added by placing new files in the `data/` folder.

---

## Notes for learners

This app is a learning aid. It does not replace grammar study.

For German, always learn nouns with:

```text
article + singular + plural
```

Example:

```text
der Vertrag → die Verträge
die Prüfung → die Prüfungen
das Praktikum → die Praktika
```

For verbs and expressions, learn the grammar pattern:

```text
sich bewerben um + Akkusativ
sich vorbereiten auf + Akkusativ
sich kümmern um + Akkusativ
sich auskennen mit + Dativ
```

Recognition is not enough. Use active recall.
