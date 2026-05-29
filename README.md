# Deutsch WIPA 2026 · Lerntrainer

This is my browser-based German learning app for practising course vocabulary and grammar.

Live GitHub Pages URL, once deployed:

```text
https://chilperic.github.io/Deutsch-wipa-2026/
```

## Structure

```text
Deutsch-wipa-2026_structured/
├── index.html
├── README.md
├── project_manifest.json
├── vokabular/
│   ├── README.md
│   ├── kapitel1.json
│   ├── kapitel2.json
│   ├── kapitel3.json
│   └── kapitel4.json
├── grammatik/
│   ├── README.md
│   ├── praepositionalverben.json
│   ├── kasusergaenzungen.json
│   ├── starke_verben.json
│   ├── trennbare_verben.json
│   ├── praepositionen.json
│   ├── nomen_artikel_plural.json
│   ├── adjektivdeklination.json
│   ├── pronomen.json
│   └── konnektoren_nebensaetze.json
├── docs/
│   └── plural_QA_report.json
└── dev/
    └── script_check.js
```

## Active modules

### Kapitel vocabulary

Loaded from:

```text
vokabular/kapitel1.json
vokabular/kapitel2.json
vokabular/kapitel3.json
vokabular/kapitel4.json
```

Practice types include:

```text
article
meaning
plural
active recall
sentence gaps
```

### Präpositionalverben

Loaded from:

```text
grammatik/praepositionalverben.json
```

Full grammar cycle:

```text
1. Learn the pattern
2. Meaning
3. Preposition gap
4. Case recall
```

Example:

```text
Learn:
sich bewerben um + Akkusativ

Then practise:
Ich bewerbe mich ___ eine Stelle.
Answer: um
```

The gap question does not show the full pattern before the learner answers.

## Running locally

```bash
cd Deutsch-wipa-2026_structured
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages

Upload the contents of `Deutsch-wipa-2026_structured/` to the root of the GitHub repository.

The repository root should contain:

```text
index.html
README.md
vokabular/
grammatik/
docs/
dev/
project_manifest.json
```

Then enable GitHub Pages:

```text
Settings → Pages → Deploy from branch → main → /root
```

## Build check

In the browser console:

```js
window.VOKABULAR_BUILD
```

Expected:

```text
final-clean-module-overview-2026-05-29
```

For JavaScript syntax:

```bash
node --check dev/script_check.js
```


## Interface note

The top screen now shows compact module chips instead of explanatory filler text.

Active:

```text
Kapitel
Präpositionalverben
```

Planned:

```text
Kasusergänzungen
Starke Verben
Trennbare Verben
Präpositionen
Artikel & Plural
Adjektivdeklination
Pronomen
Konnektoren
```


## Dashboard interface

This build implements the dashboard-style interface:

```text
- Sidebar navigation
- Feature row
- 10 visible learning modules
- Active/planned module badges
- Central practice controls
- Stats strip
```

Build marker:

```text
dashboard-interface-structured-2026-05-29
```


## All modules active

This build makes every planned module selectable with starter practice data.

Active modules:

```text
Kapitel vocabulary
Präpositionalverben
Kasusergänzungen
Starke Verben
Trennbare Verben
Präpositionen
Nomen · Artikel · Plural
Adjektivdeklination
Pronomen
Konnektoren / Nebensätze
```

Non-vocabulary modules use a generic grammar cycle:

```text
1. Learn the pattern
2. Meaning
3. Prompt practice
```

Build marker:

```text
all-modules-active-dashboard-2026-05-29
```
