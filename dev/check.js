#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
let bad = 0;
for (const file of fs.readdirSync(root, {recursive:true}).filter(f => f.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(path.join(root,file),'utf8')); }
  catch(e) { console.error('Invalid JSON:', file, e.message); bad++; }
}
for (const f of ['app.js','sw.js']) {
  try { new Function(fs.readFileSync(path.join(root,f),'utf8')); }
  catch(e) { console.error('Invalid JS:', f, e.message); bad++; }
}
console.log(bad ? `FAILED: ${bad} issue(s)` : 'OK: JSON and JS syntax valid');
process.exit(bad ? 1 : 0);
