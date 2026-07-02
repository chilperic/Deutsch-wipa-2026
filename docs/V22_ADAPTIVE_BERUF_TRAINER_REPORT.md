# v22 Adaptive Beruf Trainer Report

## Strategic change

v22 implements the competitive direction against vhs-Lernportal Beruf: not a linear course clone, but an adaptive B1/B2 Beruf trainer.

## Implemented system

### Learner model

Tracks local skill estimates for:

- vocabulary
- articles/plurals
- prepositions
- connectors
- word order
- register
- grammar
- production
- Beruf competence

Each answer updates skill scores using a simple moving estimate.

### Scheduler

The scheduler uses controlled unpredictability:

- due review boost
- weak-skill boost
- scenario-fit boost
- novelty boost
- anti-recent-item penalty
- anti-same-type penalty
- template quota

The learner cannot predict the next item, but every item has a visible reason.

### Session templates

- B1 Beruf
- B2 Beruf
- Bewerbung & HR
- Reklamation & Problem melden
- Amt, Jobcenter, Ausländerbehörde

### Feedback

Feedback now includes:

- exact/partial/fuzzy score
- model answer
- error tags
- scheduler explanation through “Why this exercise?”
- session-end diagnosis

## Remaining weakness

The production scoring is still heuristic. A correct alternative can still be under-scored if it differs strongly from the model answer. For v23, add structured rubrics per production item: required phrases, optional phrases, register markers, verb-position constraints, and forbidden direct forms.
