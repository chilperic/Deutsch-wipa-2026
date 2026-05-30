
import json, re, pathlib, sys
root = pathlib.Path(__file__).resolve().parents[1]
errors = []
warnings = []
min_counts = {
 "kasusergaenzungen.json": 60,
 "starke_verben.json": 60,
 "trennbare_verben.json": 60,
 "praepositionen.json": 60,
 "nomen_artikel_plural.json": 60,
 "adjektivdeklination.json": 60,
 "pronomen.json": 60,
 "konnektoren_nebensaetze.json": 60,
 "praepositionalverben.json": 100
}
bad_patterns = [
 r"\bguterr\b", r"\bgutenn\b", r"\bgutess\b",
 r"\bHeute ich\b", r"\bHeute wir\b", r"\bHeute er\b", r"\bHeute sie\b",
 r"\bOft ich\b", r"\bMorgen ich\b",
 r"habe/bin ist gegangen", r"habe/bin ist gekommen"
]
for fn, minimum in min_counts.items():
    path = root/"grammatik"/fn
    if not path.exists():
        errors.append(f"Missing {fn}")
        continue
    data = json.loads(path.read_text(encoding="utf-8"))
    items = data.get("items", [])
    if len(items) < minimum:
        errors.append(f"{fn}: only {len(items)} items, expected >= {minimum}")
    ids = [x.get("id") for x in items]
    if len(ids) != len(set(ids)):
        errors.append(f"{fn}: duplicate ids")
    for x in items:
        for field in ["id","display","meaning"]:
            if field not in x or not x[field]:
                errors.append(f"{fn}: item missing {field}: {x.get('id')}")
        txt = json.dumps(x, ensure_ascii=False)
        for pat in bad_patterns:
            if re.search(pat, txt):
                errors.append(f"{fn}: bad pattern {pat} in {x.get('id')}")
        if fn == "starke_verben.json" and "Partizip II?" in x.get("prompt",""):
            ans = x.get("answer","")
            if ans.startswith(("ist ","hat ","bin ","habe ")):
                errors.append(f"{fn}: Partizip II answer contains auxiliary in {x.get('id')}: {ans}")
print(json.dumps({"errors": errors, "warnings": warnings, "passed": not errors}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
