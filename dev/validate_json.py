#!/usr/bin/env python3
import json, pathlib, sys
root = pathlib.Path(__file__).resolve().parents[1]
failed = False
for path in list((root/'grammatik').glob('*.json')) + list((root/'vokabular').glob('*.json')) + [root/'data-manifest.json']:
    try:
        with path.open(encoding='utf-8') as f:
            json.load(f)
    except Exception as exc:
        print(f'JSON ERROR: {path.relative_to(root)}: {exc}')
        failed = True
if failed:
    sys.exit(1)
print('JSON OK')
