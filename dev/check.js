const fs = require('fs');
function fail(msg){ console.error('CHECK FAILED:', msg); process.exit(1); }
function read(p){ return fs.readFileSync(p, 'utf8'); }
function json(p){ return JSON.parse(read(p)); }
const pkg = json('package.json');
const manifest = json('data-manifest.json');
const project = json('project_manifest.json');
const html = read('index.html');
const app = read('app.js');
const sw = read('sw.js');
const VERSION = '28.1.0';
if(pkg.version !== VERSION) fail(`package.json version must be ${VERSION}`);
if(manifest.version !== VERSION) fail(`data-manifest.json version must be ${VERSION}`);
if(project.version !== VERSION) fail(`project_manifest.json version must be ${VERSION}`);
['styles.css?v=28.1.0','app.js?v=28.1.0','profileName','lastSessionSummary','Fehlerbank','Konjugator','Ressourcen'].forEach(t=>{ if(!html.includes(t)) fail(`index.html missing ${t}`); });
['APP_VERSION = \'28.1.0\'','DEUTSCH_WIPA_BUILD','CONTENT_LANG_KEYS','function contentLangKey','function itemKey','function getSrs','unregisterServiceWorkers','MISTAKES_KEY','LAST_SESSION_KEY'].forEach(t=>{ if(!app.includes(t)) fail(`app.js missing ${t}`); });
['buildBadge','Deployment-konsistent','data-build="','v28.0.0','0 Items','20 Items','40 Items','80 Items','fällige Items','nicht Teil der Bewertung'].forEach(t=>{ if(html.includes(t)) fail(`learner-facing noise remains in index.html: ${t}`); });
if(app.includes('serviceWorker.register')) fail('app.js must not register a service worker');
if(!sw.includes('unregister') || /addEventListener\(['"]fetch/.test(sw)) fail('sw.js must unregister itself and must not intercept fetch');
if(!Array.isArray(manifest.modules) || manifest.modules.length < 40) fail('Manifest modules missing or too few');
let total = 0;
let activeTotal = 0;
let rawDuplicateIds = 0;
const rawIds = new Map();
const namespaced = new Set();
for(const mod of manifest.modules){
  if(!fs.existsSync(mod.path)) fail(`Missing module file ${mod.path}`);
  if(mod.category === 'konjugator') continue;
  const data = json(mod.path);
  let arr = data.items || data.words || data.vocabulary_entries || data.vocabulary || data.questions || [];
  total += Array.isArray(arr) ? arr.length : 0;
  if(data.exercise_pool) arr = data.exercise_pool.flatMap(x => x.cases || []);
  if(mod.category !== 'practice') activeTotal += arr.length;
  if(mod.category === 'practice') continue;
  arr.forEach((it, i) => {
    const id = it.id || `${mod.id}_${i}`;
    if(rawIds.has(id)) rawDuplicateIds++;
    rawIds.set(id, mod.id);
    const key = `${mod.id}::${id}`;
    if(namespaced.has(key)) fail(`Duplicate namespaced key ${key}`);
    namespaced.add(key);
  });
}
const verbs = json('data/conjugator_verbs.json');
if(!verbs.verbs || Object.keys(verbs.verbs).length < 1000) fail('Internal conjugator verb bank is missing or too small');
if(total < 5000) fail(`Too few manifest items: ${total}`);
if(activeTotal < 5000) fail(`Too few active content items: ${activeTotal}`);
if(!app.includes('contentLangKey()')) fail('Language-code mapping not used by content lookup');
console.log(`OK v28.1: ${manifest.modules.length} modules, ${total} manifest items (${activeTotal} active content items), ${Object.keys(verbs.verbs).length} verbs, ${rawDuplicateIds} raw duplicate IDs safely namespaced, learner-facing build noise removed.`);
