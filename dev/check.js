const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
let failures = [];
function fail(msg){ failures.push(msg); }
function readJson(p){ return JSON.parse(fs.readFileSync(path.join(root,p),'utf8')); }
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
const data = readJson('data/core_v25.json');
const quarantine = readJson('data/quarantine_manifest.json');
const templates = readJson('data/session_templates.json');
const taxonomy = readJson('data/mistake_taxonomy.json');
if(!html.includes('app.js?v=25.0.0')) fail('index.html must reference app.js?v=25.0.0');
if(!html.includes('styles.css?v=25.0.0')) fail('index.html must reference styles.css?v=25.0.0');
if(!html.includes('whyAction')) fail('index.html must expose the Why this exercise control');
if(!app.includes('v25.0.0-functional-responsive-trainer')) fail('app.js build string missing v25.0.0-functional-responsive-trainer');
if(!app.includes('core_v25.json')) fail('app.js must load data/core_v25.json');
for(const old of ['dw_v20_']) if(app.includes(old)) fail(`old localStorage key still present: ${old}`);
for(const required of ['SESSION_TEMPLATES','buildAdaptiveSession','scoreCandidate','weightedChoice','skillKeysForItem','updateLearnerModel','inferErrorTags','showWhy','buildSessionSummary','finishAdaptiveSession']) {
  if(!app.includes(required)) fail(`missing v25 adaptive-engine symbol: ${required}`);
}
const fnMatches = [...app.matchAll(/^function\s+([A-Za-z0-9_$]+)\s*\(/gm)].map(m=>m[1]);
const seenFns = new Set();
for(const name of fnMatches){ if(seenFns.has(name)) fail(`duplicate function declaration: ${name}`); seenFns.add(name); }
if(!Array.isArray(data.paths) || !Array.isArray(data.modules)) fail('data must contain paths/modules arrays');
if(data.version !== 'v25.0.0-functional-responsive-trainer') fail('data version must be v25.0.0-functional-responsive-trainer');
if(!Array.isArray(data.supportLanguages) || data.supportLanguages.join(',') !== 'en,fr') fail('supportLanguages must be exactly en,fr');
if(!data.paths.some(p=>p.id==='trainer')) fail('v25 must expose trainer path');
if(!data.modules.some(m=>m.id==='scenario_trainer_b1_b2')) fail('v25 must include scenario trainer module');
if(!data.modules.some(m=>m.id==='v22_beruf_micro_simulations')) fail('v25 must include adaptive micro-simulations module');
if(!templates.templates || !templates.templates.b1_beruf || !templates.templates.b2_beruf) fail('session_templates must define B1 and B2 Beruf templates');
if(!taxonomy.error_types || !taxonomy.error_types.register_politeness || !taxonomy.error_types.verb_position) fail('mistake taxonomy missing core diagnostic types');
const moduleIds = new Set((data.modules || []).map(m=>m.id));
const itemIds = new Set();
const pairs = new Set();
let itemCount = 0, productionCount = 0, v22Count = 0;
const allowedTypes = new Set(['vocabulary_choice','article_plural','gap_fill','multiple_choice','active_recall']);
for(const p of data.paths || []){
  if(!p.id || !p.title || !p.sub || !Array.isArray(p.modules)) fail(`invalid path shell: ${JSON.stringify(p)}`);
  for(const mid of p.modules) if(!moduleIds.has(mid)) fail(`path ${p.id} references missing module ${mid}`);
}
for(const m of data.modules || []){
  if(!m.id || !m.path || !m.title || !m.description || !Array.isArray(m.items)) fail(`invalid module shell: ${m.id || 'unknown'}`);
  if(m.items.length < 6) fail(`module ${m.id} has too few items (${m.items.length})`);
  itemCount += m.items.length;
  for(const item of m.items){
    if(item.type==='active_recall') productionCount++;
    if((item.tags||[]).includes('v22')) v22Count++;
    if(!item.id) fail(`${m.id}: item without id`);
    if(itemIds.has(item.id)) fail(`duplicate item id ${item.id}`);
    itemIds.add(item.id);
    if(!allowedTypes.has(item.type)) fail(`${item.id}: unsupported type ${item.type}`);
    const answerKey = typeof item.answer === 'object' ? item.answer.en : item.answer;
    const pair = `${item.type}|${item.prompt || item.german || item.singular}|${answerKey}`;
    if(pairs.has(pair)) fail(`duplicate prompt-answer pair in ${item.id}`);
    pairs.add(pair);
    if(!item.example_de) fail(`${item.id}: missing German example`);
    if(!item.example || !item.example.en || !item.example.fr) fail(`${item.id}: missing EN/FR example support`);
    if(!item.feedback || !item.feedback.de || !item.feedback.en || !item.feedback.fr) fail(`${item.id}: missing diagnostic feedback in DE/EN/FR`);
    if(item.type === 'gap_fill'){
      if(!String(item.prompt || '').includes('___')) fail(`${item.id}: gap_fill without ___`);
      if(!item.answer) fail(`${item.id}: gap_fill missing answer`);
    }
    if(item.type === 'multiple_choice'){
      if(!Array.isArray(item.choices) || item.choices.length < 3) fail(`${item.id}: multiple_choice needs at least three choices`);
      if(!item.choices.includes(item.answer)) fail(`${item.id}: multiple_choice choices missing answer`);
    }
    if(item.type === 'vocabulary_choice'){
      for(const lang of data.supportLanguages || []){
        if(!item.answer || !item.answer[lang]) fail(`${item.id}: missing ${lang} answer`);
        if(!Array.isArray(item.choices?.[lang]) || item.choices[lang].length < 4) fail(`${item.id}: missing ${lang} choices`);
        else if(!item.choices[lang].includes(item.answer[lang])) fail(`${item.id}: ${lang} choices missing answer`);
      }
    }
    if(item.type === 'article_plural'){
      if(!/^(der|die|das)\s/.test(item.singular || '')) fail(`${item.id}: singular must include der/die/das`);
      if(!/^die\s/.test(item.answer || '')) fail(`${item.id}: plural answer must start with die`);
    }
  }
}
if(itemCount < 820) fail(`v25 should expose at least 820 checked items; found ${itemCount}`);
if(productionCount < 195) fail(`v25 should expose at least 195 active production items; found ${productionCount}`);
if(v22Count < 28) fail(`v25 should preserve at least 28 adaptive items; found ${v22Count}`);
const dataText = JSON.stringify(data);
const bannedStrings = ['Schulabschlusse','Fremdworter','Arbeitsplatze','Auftragsbucher','Knopfe','Stande','Kinderarzte','Großhandelskaufmanner','weiterer rechtlichen Prüfung','ruft die Sachbearbeiterin an morgen'];
for(const s of bannedStrings) if(dataText.includes(s)) fail(`known incorrect German still present: ${s}`);
if(!quarantine.excluded_files || quarantine.excluded_files.length < 3) fail('quarantine manifest must document excluded risky files');
if(failures.length){ console.error('Deutsch-WiPA v25 checks failed:'); for(const f of failures) console.error(' - ' + f); process.exit(1); }
console.log(`Deutsch-WiPA v25 checks passed: ${data.modules.length} modules, ${itemCount} quality-gated items, ${productionCount} production items, ${v22Count} adaptive items, ${fnMatches.length} app functions.`);
