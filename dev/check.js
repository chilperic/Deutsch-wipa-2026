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
if (drills.length < 300) {
  console.error(`Too few starter conjugator drills: ${drills.length}`);
  process.exit(1);
}
let corrupt=[];
for (const [verb, v] of Object.entries(conj.verbs || {})) {
  const blob = JSON.stringify(v);
  if (/tworte an|twortest an|twortet an|angetwortt|gearbeitt|gewartt|berichtt|bedeutt|gebiett|gebittt/.test(blob)) corrupt.push(verb);
  if (v.meaning === `to ${verb}`) corrupt.push(verb);
}
if (corrupt.length) {
  console.error('Corrupt verb entries:', [...new Set(corrupt)].slice(0, 30).join(', '));
  process.exit(1);
}
const allJsonText = walk('.').filter(x => x.endsWith('.json') && !x.startsWith('docs/')).map(f => fs.readFileSync(f, 'utf8')).join('\n');
if (/\[object Object\]/.test(allJsonText)) {
  console.error('Found [object Object] literal in JSON data.');
  process.exit(1);
}
console.log(`OK: JSON valid, app.js parses, active modules reachable, ${verbCount} verbs, ${drills.length} starter drills, dynamic practice enabled.`);


const verbs = conj.verbs || {};
function assert2(cond,msg){ if(!cond){ console.error('FAIL:',msg); process.exit(1); } }
assert2(verbs.antworten.type === 'regular verb', 'antworten must be regular, not separable');
assert2(verbs.antworten.part === 'geantwortet', 'antworten Partizip II must be geantwortet');
assert2(verbs.antworten.zu === 'zu antworten', 'antworten zu-form must be zu antworten');
assert2(JSON.stringify(verbs.antworten.present) === JSON.stringify(['antworte','antwortest','antwortet','antworten','antwortet','antworten']), 'antworten present forms are wrong');
for (const bad of ['tworte an','twortest an','twortet an','angetwort','anzutwort','gearbeitt','gewartt','berichtt','bedeutt','vorgebereitet','aufgebereitet']) {
  assert2(!JSON.stringify(verbs).includes(bad), 'bad form still present: '+bad);
}
const falseSep = Object.entries(verbs).filter(([k,v]) => v.type === 'separable verb' && /^(be|emp|ent|er|ge|miss|ver|zer)/.test(k));
assert2(falseSep.length === 0, 'false separable verbs with inseparable prefixes: '+falseSep.slice(0,10).map(x=>x[0]).join(', '));
console.log('OK: separable verb audit passed');
