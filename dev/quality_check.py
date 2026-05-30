import json, pathlib, re, sys
root = pathlib.Path(__file__).resolve().parents[1]
html = (root/"index.html").read_text(encoding="utf-8")
errors = []
required = [
    "instant-embedded-stable-2026-05-30",
    "window.EMBEDDED_DATA",
    "useEmbeddedFallback();",
    "Preparing learning content",
    "Background refresh failed",
    "choiceCorrect",
    "next…"
]
for r in required:
    if r not in html:
        errors.append(f"missing {r}")
# Must not have old empty-first init.
if "(async()=>{ensure();render();await loadAll()})();" in html:
    errors.append("still renders empty dashboard before loadAll")
# Data files must be present.
checks = {
    "vokabular/kapitel1.json": 10,
    "vokabular/kapitel2.json": 10,
    "vokabular/kapitel3.json": 10,
    "vokabular/kapitel4.json": 10,
    "grammatik/praepositionalverben.json": 100,
    "grammatik/starke_verben.json": 60
}
for rel, minimum in checks.items():
    p = root/rel
    if not p.exists():
        errors.append(f"missing {rel}")
        continue
    data = json.loads(p.read_text(encoding="utf-8"))
    arr = data.get("words") or data.get("items") or []
    if len(arr) < minimum:
        errors.append(f"{rel}: only {len(arr)}")
print(json.dumps({"passed": not errors, "errors": errors}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
