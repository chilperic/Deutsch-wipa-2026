# Deutsch WIPA 2026 · Complete Module Architecture

This build uses a clean module architecture.

Required folders:

```text
index.html
vokabular/
  kapitel1.json
  kapitel2.json
  kapitel3.json
  kapitel4.json
grammatik/
  praepositionalverben.json
```

The main screen is learner-first:

```text
1. Choose what you want to practise
2. Choose language / chapter / mode
3. Start practising
```

Progress details are hidden under the collapsible **Progress details** section.

Build marker:

```js
window.VOKABULAR_BUILD
```

Expected:

```text
complete-module-architecture-2026-05-29
```


## Beautiful UI build

This version keeps the complete module architecture and redesigns only the interface layer.

Build marker:

```js
window.VOKABULAR_BUILD
```

Expected:

```text
complete-architecture-beautiful-ui-2026-05-29
```

## Verb module learning flow

The prepositional verb module no longer shows the full pattern during the gap question.

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
