# Deutsch-WiPA 2026

Deutsch-WiPA 2026 is a static B1/B2 German trainer focused on work, everyday life, integration, and exam preparation. The content philosophy follows a **Linie 1 Beruf B1/B2** direction: practical German first, grammar in context, active recall, workplace communication, and real-life German in Germany.

## Current build

This is the feature-complete merged build based on the previous content-rich version, not the small prototype shell. It keeps the existing JSON content and adds the missing training engine, writing/speaking/reading modules, exercise-type filtering, and a stronger visual identity.

### Included content

- `vokabular/kapitel1.json`
- `vokabular/kapitel2.json`
- `vokabular/kapitel3.json`
- `vokabular/kapitel4.json`
- `vokabular/beruf_buero.json`
- `vokabular/kapitel3_foto_ergaenzung.json`
- 25 grammar / communication / verb-form modules
- 2,300+ source items plus generated vocabulary exercise variants
- `training/exercise_types_complete.json` with ready-to-use examples for the requested exercise types
- `writing/writing_training.json` with formal email, semi-formal message, opinion text, report/summary, and application writing tasks
- `reading/reading_training.json` with short B1/B2 comprehension tasks
- `speaking/speaking_prompts.json` with job, authority, doctor, and workplace prompts

### Main features

- Responsive layout for phone, tablet, laptop, and desktop
- Browser support across Android, iOS, Windows, macOS, and Linux
- PWA-ready: manifest and service worker included
- Multilingual interface
- Arabic and Persian RTL support
- Vocabulary, grammar, conjugation, and communication navigation
- Progress tracker in sidebar
- Mistake bank
- Start / Check / Previous / Next flow
- Wrong-answer correction with explanation
- Learning, practice, challenge, and mistake-review modes
- Exercise-type selector: flashcard, gap fill, multiple choice, article trainer, plural trainer, case trainer, verb conjugation, Perfekt builder, connector selection, word order, sentence correction, translation into German, translation from German, mini-dialogue, writing, speaking, reading, and mistake review
- Open writing/speaking tasks with model answers and checklists
- Improved SVG logo and mobile app icon
- MIT license
- GitHub Pages ready

## Run locally

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Do not open `index.html` directly with `file://`; browsers restrict `fetch()` for local JSON files. Use a local server.

## Validate

```bash
npm run check
```

This checks JavaScript syntax and JSON validity.

## Deploy on GitHub Pages

1. Create a GitHub repository.
2. Copy these files into the repository.
3. Commit and push.
4. In GitHub: Settings → Pages → Deploy from branch → `main` → root.

## Suggested commit

```bash
git init
git add .
git commit -m "Build Deutsch-WiPA B1/B2 PWA"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Content note

Some vocabulary modules include multilingual translations from the previous dataset. For languages not present in the original content, the app falls back to German or English while keeping the full interface in the selected language. Arabic and Persian layout is right-to-left.

## License

MIT. Free to use, modify, and extend.


## Material expansion: B1.1 / B1.2 / B2.1

This build adds curated practice modules derived from the uploaded course material topics:

- B1.1: zu-Infinitiv, sentence correction, basic formal requests.
- B1.2: brauchen ... zu, temporale Nebensätze, Plusquamperfekt sequencing.
- B2.1: Position von nicht, TeKaMoLo, zweiteilige Konnektoren, Passiversatzformen, finale/modale Sätze, placeholder/correlate `es`, and Redemittel for information requests.
- Additional ready-to-use writing, reading, speaking, and vocabulary expansion modules.

The app keeps the Linie-style workplace/integration philosophy while using the added material as coverage reinforcement.


## Production audit fix layer

This build includes a production-quality layer added after a structural content audit:

- tokenized TeKaMoLo syntax engine
- business-focused adjective declension and n-declension modules
- narrative Plusquamperfekt tasks with temporal anchors
- abstract workplace prepositions
- high-density workplace collocation vocabulary
- writing tasks with mandatory vocabulary, structural checklists, and minimum word counts
- workplace reading documents and speaking role-plays
- `dev/content_audit.js` for duplication/placeholder checks

Legacy modules are retained for breadth, but production modules are listed first in `data-manifest.json`.
