import json, pathlib, re, sys
root = pathlib.Path(__file__).resolve().parents[1]
errors = []
html = (root/"index.html").read_text(encoding="utf-8")
required = [
    "fixed-counts-and-choice-flow-2026-05-30",
    "window.EMBEDDED_DATA",
    "currentCount < embItems.length",
    "currentVocabCount < embVocabItems.length",
    "choiceCorrect",
    "next…"
]
for r in required:
    if r not in html:
        errors.append(f"index.html missing {r}")
# Ensure content files are present and non-empty.
for fn, minimum in {
    "praepositionalverben.json": 100,
    "kasusergaenzungen.json": 60,
    "starke_verben.json": 60,
    "trennbare_verben.json": 60,
    "praepositionen.json": 60,
    "nomen_artikel_plural.json": 60,
    "adjektivdeklination.json": 60,
    "pronomen.json": 60,
    "konnektoren_nebensaetze.json": 60
}.items():
    p = root/"grammatik"/fn
    if not p.exists():
        errors.append(f"missing {fn}")
        continue
    data = json.loads(p.read_text(encoding="utf-8"))
    if len(data.get("items", [])) < minimum:
        errors.append(f"{fn}: too few items")
for i in range(1,5):
    p = root/"vokabular"/f"kapitel{i}.json"
    if not p.exists():
        errors.append(f"missing kapitel{i}.json")
    else:
        data = json.loads(p.read_text(encoding="utf-8"))
        if len(data.get("words", [])) < 10:
            errors.append(f"kapitel{i}.json: suspiciously few words")
print(json.dumps({"passed": not errors, "errors": errors}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
