# v17 Build Report
## Loaded modules
- Konjugator · große Verbdatenbank — 1077 items — `data/conjugator_verbs.json` — curated-backend
- Konjugation · geprüfte Drills (repariert) — 1152 items — `grammatik/production_konjugator_drills.json` — curated
- v17 · Präpositionalverben — 40 items — `grammatik/v17_praepositionalverben_curated.json` — curated
- v17 · Konnektoren & Wortstellung — 26 items — `grammatik/v17_konnektoren_curated.json` — curated
- v17 · nicht / kein — 25 items — `grammatik/v17_nicht_kein_curated.json` — curated
- v17 · Kasus Akkusativ/Dativ — 20 items — `grammatik/v17_kasus_curated.json` — curated
- v17 · TeKaMoLo — 16 items — `grammatik/v17_tekamolo_curated.json` — curated
- v17 · Reklamation / technische Probleme — 17 items — `grammatik/v17_reklamation_curated.json` — curated
- v17 · E-Mail & formelle Redemittel — 12 items — `grammatik/v17_email_redemittel_curated.json` — curated
- v17 · Konjunktiv II — 10 items — `grammatik/v17_konjunktiv2_curated.json` — curated
- v17 · Adjektivdeklination — 10 items — `grammatik/v17_adjektivdeklination_curated.json` — curated
- Modalverben Präsens · systematisch — 77 items — `grammatik/production_modalverben_praesens.json` — spot-checked
- Modalverben Präteritum · systematisch — 60 items — `grammatik/production_modalverben_praeteritum.json` — spot-checked
- zu-Infinitiv & brauchen zu — 19 items — `grammatik/material_zu_infinitiv_brauchen.json` — spot-checked
- Temporale Nebensätze — 10 items — `grammatik/material_temporale_nebensaetze.json` — spot-checked
- B2 · nicht & TeKaMoLo — 7 items — `grammatik/material_b2_nicht_tekamolo.json` — spot-checked
- Redemittel · Bitte um Information — 6 items — `grammatik/material_redemittel_bitte_um_information.json` — spot-checked
- Wortschatz-Ergänzung B1/B2 — 45 items — `vokabular/material_b1b2_ergaenzung.json` — spot-checked

## Quarantined modules
- `grammatik/production_adverbien_intensiv.json`
- `grammatik/konnektoren_engine.json`
- `grammatik/reklamation_technische_probleme.json`
- `grammatik/praepositionalverben.json`
- `grammatik/kasusergaenzungen.json`
- `grammatik/pronomen.json`
- `grammatik/material_b2_zweiteilige_konnektoren.json`
- `vokabular/production_workplace_collocations.json`

## Critical repairs
- Repaired known separable-verb Konjunktiv II strings in `production_konjugator_drills.json`.
- Replaced default loading of unsafe connector/reklamation/adverb/prepositional-verb modules with curated v17 modules.
