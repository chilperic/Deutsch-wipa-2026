const fs = require('fs');
const path = require('path');
function fail(msg){ console.error('FAIL:', msg); process.exitCode = 1; }
function readJson(p){ try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ fail(`Invalid JSON ${p}: ${e.message}`); return null; } }
const manifest = readJson('data-manifest.json');
const mods = manifest.modules || [];
let total = 0;
for (const m of mods){
  if (!fs.existsSync(m.path)) fail(`Missing module file ${m.path}`);
  const data = readJson(m.path);
  if (!data) continue;
  const arr = data.items || data.words || data.vocabulary_entries || data.vocabulary || data.questions || [];
  if (m.id.includes('adverbien') && arr.length < 500) fail('Adverbien module below 500 items');
  if (m.id.includes('deklination_intensiv') && arr.length < 500) fail('Deklination module below 500 items');
  total += Array.isArray(arr) ? arr.length : 0;
}
const app = fs.readFileSync('app.js','utf8');
if (!app.includes("id:'adverbs'")) fail('Adverbien path missing in app.js');
if (!app.includes("id:'declension'")) fail('Deklination path missing in app.js');
const verbs = readJson('data/conjugator_verbs.json').verbs;
if (!verbs.antworten || verbs.antworten.part !== 'geantwortet' || /\btwort/.test((verbs.antworten.present||[]).join(' ')+' '+(verbs.antworten.part||'')+' '+(verbs.antworten.zu||''))) fail('antworten is still corrupted');
if (verbs.arbeiten.part !== 'gearbeitet') fail('arbeiten participle wrong');
if (verbs.bekommen.part !== 'bekommen') fail('bekommen participle wrong');
console.log(`OK: ${mods.length} modules, ${total} manifest items, ${Object.keys(verbs).length} verbs.`);
