#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const dirs = ['grammatik','vokabular','training'];
let invalid = 0, brokenChoices = 0, duplicateCount = 0;
const seen = new Map();
function walkFiles(dir) {
  const p = path.join(root, dir);
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter(f => f.endsWith('.json')).map(f => path.join(p,f));
}
function scanObj(x, file) {
  if (Array.isArray(x)) return x.forEach(v => scanObj(v,file));
  if (!x || typeof x !== 'object') return;
  const typ = x.exerciseType || x.type;
  const choiceTypes = new Set(['choice','multiple_choice','connector_selection','article_trainer','communication_choice','classify','case_trainer']);
  if (choiceTypes.has(typ) && (!Array.isArray(x.choices) || x.choices.length < 2)) {
    // raw items with type:choice may be intentionally converted to gap_fill; classify must have choices
    if (typ === 'classify' || typ === 'multiple_choice' || typ === 'connector_selection') {
      console.error(`[BROKEN CHOICE] ${file} :: ${x.id || '(no id)'} (${typ})`); brokenChoices++;
    }
  }
  for (const [k,v] of Object.entries(x)) scanObj(v,file);
}
for (const file of dirs.flatMap(walkFiles)) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file,'utf8')); }
  catch(e) { console.error(`[INVALID JSON] ${file}: ${e.message}`); invalid++; continue; }
  scanObj(data, path.relative(root,file));
  const strings = JSON.stringify(data).match(/"([^"\\]|\\.)*"/g) || [];
  for (const raw of strings) {
    const clean = raw.slice(1,-1).trim();
    if (clean.length < 45) continue;
    if (/^https?:/.test(clean)) continue;
    if (seen.has(clean) && seen.get(clean) !== file) duplicateCount++;
    else seen.set(clean,file);
  }
}
console.log(JSON.stringify({ invalid, brokenChoices, duplicateLongStrings: duplicateCount }, null, 2));
if (invalid || brokenChoices) process.exit(1);
