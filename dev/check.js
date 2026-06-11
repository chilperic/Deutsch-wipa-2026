const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const mustNotExist=[
  'data/conjugator_verbs.json',
  'grammatik/production_konjugator_drills.json',
  'grammatik/production_modalverben_praesens.json',
  'grammatik/production_modalverben_praeteritum.json',
  'vokabular/kapitel1.json','vokabular/kapitel2.json','vokabular/kapitel3.json','vokabular/kapitel4.json','vokabular/kapitel3_foto_ergaenzung.json',
  'grammatik/reklamation_technische_probleme.json','grammatik/v17_reklamation_curated.json','grammatik/v17_email_redemittel_curated.json','grammatik/v17_konjunktiv2_curated.json','grammatik/konnektoren_engine.json','grammatik/praepositionalverben.json','grammatik/tekamolo_engine.json'
];
function fail(msg){console.error('FAIL:',msg);process.exit(1)}
for(const rel of mustNotExist){if(fs.existsSync(path.join(root,rel)))fail(`banned legacy file exists: ${rel}`)}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data-manifest.json'),'utf8'));
const paths=manifest.modules.map(m=>m.path);
for(const rel of mustNotExist){if(paths.includes(rel))fail(`manifest references banned file: ${rel}`)}
for(const m of manifest.modules){const fp=path.join(root,m.path);if(!fs.existsSync(fp))fail(`manifest path missing: ${m.path}`);const raw=JSON.parse(fs.readFileSync(fp,'utf8'));if(raw.module_type==='sequenced_business_artifact'){if(!Array.isArray(raw.steps)||raw.steps.length<5)fail(`sequenced module too small: ${m.id}`);for(const s of raw.steps){if(!s.step_id||!s.exercise_type||!s.progressive_feedback||!s.rule)fail(`bad sequenced step in ${m.id}`)}} else if(raw.module_type==='variable_template_module'){if(!Array.isArray(raw.templates)||raw.templates.length<1)fail(`variable module empty: ${m.id}`);for(const t of raw.templates){if(!t.template||!t.slots||!t.answer_slot)fail(`bad variable template in ${m.id}`)}} else if(raw.items && raw.items.length!==m.count)fail(`count mismatch ${m.id}: manifest ${m.count}, actual ${raw.items.length}`)}
const verbs=JSON.parse(fs.readFileSync(path.join(root,'data/curated_verbs.json'),'utf8'));
if(!verbs.verbs||Object.keys(verbs.verbs).length<1000)fail('curated_verbs does not contain large verb backend');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
if(/conjugator_verbs\.json/.test(app))fail('app.js still references conjugator_verbs.json');
new Function(app);
const vocab=JSON.parse(fs.readFileSync(path.join(root,'vokabular/v17_beruf_wortschatz_curated.json'),'utf8'));
for(const it of vocab.items){if(!it.lexical_key)fail(`vocab item missing lexical_key: ${it.id}`);for(const fld of ['answer','translation','explanation','meaning','english_equivalent']){if(Object.prototype.hasOwnProperty.call(it,fld))fail(`vocab skeleton contains hardcoded ${fld}: ${it.id}`)}}
const lex=JSON.parse(fs.readFileSync(path.join(root,'data/locales/wipa_lexicon.json'),'utf8'));
const keys=new Set(Object.values(lex.entries).map(e=>e.lexical_key));
for(const it of vocab.items){if(!keys.has(it.lexical_key))fail(`lexicon missing lexical_key: ${it.lexical_key}`)}
console.log('OK: v18 final reliable tutor audit passed');
