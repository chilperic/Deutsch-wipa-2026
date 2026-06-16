const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
let failures = [];
function fail(msg){ failures.push(msg); }
function readJson(p){ return JSON.parse(fs.readFileSync(path.join(root,p),'utf8')); }

const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
const data = readJson('data/core_v19.json');

// 1. Basic file/version gates
if(!html.includes('app.js?v=19.2.0')) fail('index.html must reference app.js?v=19.2.0');
if(!html.includes('styles.css?v=19.2.0')) fail('index.html must reference styles.css?v=19.2.0');
if(!app.includes('v19.2.0-vocabulary-250')) fail('app.js build string missing v19.2.0-vocabulary-250');

// 2. No duplicate top-level function declarations
const fnMatches = [...app.matchAll(/^function\s+([A-Za-z0-9_$]+)\s*\(/gm)].map(m=>m[1]);
const seenFns = new Set();
for(const name of fnMatches){ if(seenFns.has(name)) fail(`duplicate function declaration: ${name}`); seenFns.add(name); }

// 3. V19 must not expose quarantined modules in data/core_v19.json
const bannedPathIds = new Set(['business_email','complaints','negotiation','workplace','wortschatz_b1b2','adverbien','declension','grammar_core','syntax','conjugation']);
for(const p of data.paths || []) if(bannedPathIds.has(p.id)) fail(`unsafe/quarantined path exposed: ${p.id}`);
const allowedModuleIds = new Set(['vocab_core','article_plural','prep_verbs','connectors','cases_core','modal_verbs','separable_verbs','adjective_endings','negation_core','word_order_core']);
for(const m of data.modules || []) if(!allowedModuleIds.has(m.id)) fail(`unexpected module exposed in v19 core: ${m.id}`);

// 4. Data schema and content gates
const moduleIds = new Set((data.modules || []).map(m=>m.id));
const itemIds = new Set();
const pairs = new Set();
for(const p of data.paths || []){
  if(!p.id || !p.title || !p.sub || !Array.isArray(p.modules)) fail(`invalid path shell: ${JSON.stringify(p)}`);
  for(const mid of p.modules) if(!moduleIds.has(mid)) fail(`path ${p.id} references missing module ${mid}`);
}
for(const m of data.modules || []){
  if(!m.id || !m.path || !m.title || !m.description || !Array.isArray(m.items)) fail(`invalid module shell: ${m.id || 'unknown'}`);
  if(m.items.length < 8) fail(`module ${m.id} has too few verified items (${m.items.length})`);
  for(const item of m.items){
    if(!item.id) fail(`${m.id}: item without id`);
    if(itemIds.has(item.id)) fail(`duplicate item id ${item.id}`);
    itemIds.add(item.id);
    const pair = `${item.type}|${item.prompt || item.german || item.singular}|${typeof item.answer === 'object' ? item.answer.en : item.answer}`;
    if(pairs.has(pair)) fail(`duplicate prompt-answer pair in ${item.id}`);
    pairs.add(pair);
    if(!item.type) fail(`${item.id}: missing type`);
    if(!item.example_de) fail(`${item.id}: missing German example`);
    if(!item.example || !item.example.en || !item.example.fr) fail(`${item.id}: missing EN/FR example translation`);
    if(!item.feedback || !item.feedback.de || !item.feedback.en || !item.feedback.fr) fail(`${item.id}: missing diagnostic feedback in DE/EN/FR`);
    if(item.type === 'gap_fill'){
      if(!String(item.prompt || '').includes('___')) fail(`${item.id}: gap_fill without ___`);
      if(!item.answer) fail(`${item.id}: gap_fill missing answer`);
      if(String(item.prompt).includes(item.answer) && !String(item.prompt).includes('___')) fail(`${item.id}: answer leakage`);
    }
    if(item.type === 'multiple_choice'){
      if(!Array.isArray(item.choices) || item.choices.length < 3) fail(`${item.id}: multiple_choice needs at least three choices`);
      if(!item.choices.includes(item.answer)) fail(`${item.id}: multiple_choice choices missing answer`);
    }
    if(item.type === 'vocabulary_choice'){
      if(!item.plural || !/^die\s/.test(item.plural)) fail(`${item.id}: vocabulary noun must include a plural starting with die`);
      for(const lang of data.supportLanguages || []){
        if(!item.answer || !item.answer[lang]) fail(`${item.id}: missing ${lang} answer`);
        if(!Array.isArray(item.choices?.[lang])) fail(`${item.id}: missing ${lang} choices`);
        else if(!item.choices[lang].includes(item.answer[lang])) fail(`${item.id}: ${lang} choices missing answer`);
      }
      if(item.answer?.fr && item.answer.fr === item.answer.en && !['qualification', 'bonus', 'service', 'message', 'invitation', 'confirmation', 'solution', 'phase', 'document', 'programme', 'archive', 'signature', 'attestation', 'original', 'permission', 'machine', 'cause', 'plan', 'communication', 'conversation', 'description', 'question', 'danger', 'condition', 'exception'].includes(item.answer.en)) fail(`${item.id}: suspicious copied EN→FR answer`);
    }
    if(item.type === 'article_plural'){
      if(!/^(der|die|das)\s/.test(item.singular || '')) fail(`${item.id}: singular must include der/die/das`);
      if(!/^die\s/.test(item.answer || '')) fail(`${item.id}: plural answer must start with die`);
    }
  }
}

// 5. Wortschatz expansion gate: at least 250 vocabulary nouns with plurals.
const vocabModule = (data.modules || []).find(m => m.id === 'vocab_core');
if(!vocabModule) fail('missing vocab_core module');
else {
  const vocabItems = vocabModule.items || [];
  if(vocabItems.length < 250) fail(`vocab_core must contain at least 250 items, found ${vocabItems.length}`);
  for(const item of vocabItems){
    if(item.type !== 'vocabulary_choice') fail(`${item.id}: vocab_core may contain only vocabulary_choice items`);
    if(!item.plural || !/^die\s/.test(item.plural)) fail(`${item.id}: missing valid plural in vocab_core`);
  }
}

// 6. Known harmful strings must not exist in verified core data.
const dataText = JSON.stringify(data);
const bannedStrings = ['Schulabschlusse','Fremdworter','Arbeitsplatze','Auftragsbucher','Knopfe','Stande','Kinderarzte','Großhandelskaufmanner','weiterer rechtlichen Prüfung'];
for(const s of bannedStrings) if(dataText.includes(s)) fail(`known incorrect German still present: ${s}`);

if(failures.length){
  console.error('Deutsch-WiPA v19 checks failed:');
  for(const f of failures) console.error(' - ' + f);
  process.exit(1);
}
console.log(`Deutsch-WiPA v19 checks passed: ${data.modules.length} modules, ${itemIds.size} verified items, ${fnMatches.length} app functions.`);
