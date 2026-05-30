
import json, re, pathlib, sys
root = pathlib.Path(__file__).resolve().parents[1]
errors = []
warnings = []
min_counts = {
 "praepositionalverben.json": 100,
 "kasusergaenzungen.json": 60,
 "starke_verben.json": 60,
 "trennbare_verben.json": 60,
 "praepositionen.json": 60,
 "nomen_artikel_plural.json": 60,
 "adjektivdeklination.json": 60,
 "pronomen.json": 60,
 "konnektoren_nebensaetze.json": 60
}
bad_patterns = [
 r"\bguterr\b", r"\bgutenn\b", r"\bgutess\b",
 r"\bHeute ich\b", r"\bHeute wir\b", r"\bHeute er\b", r"\bHeute sie\b",
 r"habe/bin ist gegangen", r"habe/bin ist gekommen",
 r"die Kinderarzte", r"die Hausarzte", r"die Umsatze", r"die Einkaufskorbe"
]
for fn, minimum in min_counts.items():
    p = root/"grammatik"/fn
    if not p.exists():
        errors.append(f"Missing {fn}")
        continue
    data = json.loads(p.read_text(encoding="utf-8"))
    items = data.get("items", [])
    if len(items) < minimum:
        errors.append(f"{fn}: {len(items)} < {minimum}")
    ids = [x.get("id") for x in items]
    if len(ids) != len(set(ids)):
        errors.append(f"{fn}: duplicate ids")
    txt = json.dumps(data, ensure_ascii=False)
    for pat in bad_patterns:
        if re.search(pat, txt):
            errors.append(f"{fn}: bad pattern {pat}")
    if fn == "starke_verben.json":
        for x in items:
            if "Partizip II?" in x.get("prompt","") and str(x.get("answer","")).split()[0] in {"ist","hat","bin","habe"}:
                errors.append(f"{fn}: auxiliary in Partizip II answer {x.get('id')}")
# vocabulary translation and plural checks
for p in sorted((root/"vokabular").glob("kapitel*.json")):
    data = json.loads(p.read_text(encoding="utf-8"))
    txt = json.dumps(data, ensure_ascii=False)
    for pat in bad_patterns:
        if re.search(pat, txt):
            errors.append(f"{p.name}: bad pattern {pat}")
    for w in data.get("words", []):
        tr = (w.get("data",{}).get("translations") or w.get("meaning") or {})
        en = tr.get("English")
        for lang, val in tr.items():
            if lang not in ("English","German") and en and isinstance(val,str) and val.strip() == en.strip():
                review = w.get("translation_review", {})
                if not review.get("needs_human_review"):
                    errors.append(f"{p.name}: untranslated {lang} not flagged in {w.get('id')}")
html = (root/"index.html").read_text(encoding="utf-8")
required = ["window.EMBEDDED_DATA", "ux-content-repair-final-2026-05-30", "exportProgress", "translationCoverageWarning", "aria-label"]
for r in required:
    if r not in html:
        errors.append(f"index.html missing {r}")
if "viewPhone" in html or "Phone</button><button id=\"viewDesktop\"" in html:
    errors.append("phone/computer debug toggle still visible")
print(json.dumps({"passed": not errors, "errors": errors, "warnings": warnings}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
