const fs = require('fs');
const path = require('path');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

for (const f of walk('.').filter(x => x.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { console.error('Invalid JSON', f, e.message); process.exit(1); }
}

new Function(fs.readFileSync('app.js', 'utf8').replace(/^import .*$/mg, ''));

const manifest = JSON.parse(fs.readFileSync('data-manifest.json', 'utf8'));
const paths = [
  { cats: ['conjugation', 'konjugator'], match: ['modal', 'modalverb', 'infinitiv', 'infinitiv_zu'] },
  { match: ['tekamolo', 'negation', 'nebensatz', 'satzordnung', 'satzvariation', 'passiv', 'passiversatz', 'final', 'modal_es'] },
  { match: ['kasus', 'n_deklination', 'n-deklination', 'pronomen'] },
  { match: ['praeposition', 'präposition'] },
  { match: ['nomen', 'artikel', 'plural', 'genus'] },
  { match: ['adjektiv'] },
  { match: ['konnektor', 'konnektoren', 'temporal', 'kausal', 'konzessiv', 'zweiteilige'] },
  { cats: ['vocabulary', 'workplace'] }
];
const visible = new Set();
for (const p of paths) {
  for (const m of manifest.modules) {
    const hay = `${m.id} ${m.title} ${m.path}`.toLowerCase();
    if ((p.cats && p.cats.includes(m.category)) || (p.match && p.match.some(s => hay.includes(s)))) visible.add(m.id);
  }
}
const invisible = manifest.modules.filter(m => !visible.has(m.id) && m.category !== 'practice');
if (invisible.length) {
  console.error('Unexpected invisible active modules:', invisible.map(m => m.id).join(', '));
  process.exit(1);
}

console.log('OK: JSON valid, app.js parses, active modules are reachable.');
