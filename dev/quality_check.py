import json, pathlib, re, sys
root = pathlib.Path(__file__).resolve().parents[1]
html = (root/"index.html").read_text(encoding="utf-8")
errors = []

required_strings = [
    "runtime-fallback-fixed-2026-05-30",
    "window.EMBEDDED_DATA",
    "function useEmbeddedFallback()",
    "currentVocabCount < embVocabItems.length",
    "currentCount < embItems.length",
    "Initialization failed:",
    "Ready ·"
]
for s in required_strings:
    if s not in html:
        errors.append(f"missing required string: {s}")

# The previous broken build had calls but no declaration.
if not re.search(r"function\s+useEmbeddedFallback\s*\(\)\s*\{", html):
    errors.append("useEmbeddedFallback declaration missing")

# No empty-first initialization.
if "(async()=>{ensure();render();await loadAll()})();" in html:
    errors.append("empty-first initialization still present")

# Basic count checks.
checks = {
    "vokabular/kapitel1.json": 10,
    "vokabular/kapitel2.json": 10,
    "vokabular/kapitel3.json": 10,
    "vokabular/kapitel4.json": 10,
    "grammatik/praepositionalverben.json": 100,
    "grammatik/starke_verben.json": 60,
    "grammatik/trennbare_verben.json": 60
}
for rel, min_count in checks.items():
    p = root/rel
    if not p.exists():
        errors.append(f"missing {rel}")
        continue
    data = json.loads(p.read_text(encoding="utf-8"))
    arr = data.get("words") or data.get("items") or []
    if len(arr) < min_count:
        errors.append(f"{rel}: only {len(arr)} items")

print(json.dumps({"passed": not errors, "errors": errors}, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
