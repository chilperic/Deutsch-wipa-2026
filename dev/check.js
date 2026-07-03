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

const html = fs.readFileSync('index.html','utf8');
for (const token of ['profileName','resumeSessionButton','lastSessionSummary','exportProgressButton','importProgressInput','mistakeSummary']) {
  if (!html.includes(token)) fail(`Missing v27 UI element ${token}`);
}
for (const token of ['PROFILE_KEY','LAST_SESSION_KEY','saveLastSession','restoreLastSession','exportProgress','importProgress','mistake-retry-all']) {
  if (!app.includes(token)) fail(`Missing v27 learning-platform function/token ${token}`);
}
if (!html.includes('styles.css?v=27.0.0') || !html.includes('app.js?v=27.0.0')) fail('v27 cache-busting version not applied');

console.log(`OK: ${mods.length} modules, ${total} manifest items, ${Object.keys(verbs).length} verbs; v27 profile/resume/Fehlerbank UI present.`);
