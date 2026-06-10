const fs = require('fs');
const path = require('path');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
function readJson(f) { return JSON.parse(fs.readFileSync(f, 'utf8')); }

for (const f of walk('.').filter(x => x.endsWith('.json'))) {
  try { readJson(f); }
  catch (e) { console.error('Invalid JSON', f, e.message); process.exit(1); }
}
new Function(fs.readFileSync('app.js', 'utf8').replace(/^import .*$/mg, ''));

const manifest = readJson('data-manifest.json');
const paths = [
  { cats: ['conjugation', 'konjugator'], match: ['modal','modalverb','infinitiv','verbformen','starke_verben','trennbare','reflexive','perfekt','plusquamperfekt','konjugator'] },
  { match: ['tekamolo','negation','nebensatz','satzordnung','satzvariation','passiv','passiversatz','final','modal_es','temporale'] },
  { match: ['kasus','n_deklination','n-deklination','pronomen'] },
  { match: ['praeposition','präposition'] },
  { match: ['nomen','artikel','plural','genus'] },
  { match: ['adjektiv'] },
  { match: ['konnektor','konnektoren','temporal','kausal','konzessiv','zweiteilige'] },
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

const conj = readJson('data/conjugator_verbs.json');
const verbCount = Object.keys(conj.verbs || {}).length;
if (verbCount < 1000) {
  console.error(`Conjugator has only ${verbCount} verbs; expected at least 1000.`);
  process.exit(1);
}
const drills = readJson('grammatik/production_konjugator_drills.json').items || [];
if (drills.length < 5000) {
  console.error(`Too few conjugator drills: ${drills.length}`);
  process.exit(1);
}
const allJsonText = walk('.').filter(x => x.endsWith('.json') && !x.startsWith('docs/')).map(f => fs.readFileSync(f, 'utf8')).join('\n');
if (/\[object Object\]/.test(allJsonText)) {
  console.error('Found [object Object] literal in JSON data.');
  process.exit(1);
}
console.log(`OK: JSON valid, app.js parses, active modules reachable, ${verbCount} verbs, ${drills.length} drills.`);
