
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
function readJson(p){ return JSON.parse(fs.readFileSync(path.join(root,p),'utf8')); }
function walk(dir){ return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>{ const p=path.join(dir,d.name); return d.isDirectory()?walk(p):[p]; }); }
let ok = true;
for (const f of walk(root).filter(x=>x.endsWith('.json'))) { try { JSON.parse(fs.readFileSync(f,'utf8')); } catch(e){ console.error('Bad JSON', f, e.message); ok=false; } }
const manifest = readJson('data-manifest.json');
for (const m of manifest.modules) if (!fs.existsSync(path.join(root,m.path))) { console.error('Missing module', m.path); ok=false; }
const coll = readJson('vokabular/production_workplace_collocations.json').words || [];
const badColl = coll.filter(w => !(w.data && w.data.translations && (w.data.translations.English || w.data.translations.en)));
if (badColl.length) { console.error('Workplace collocation translation shadowing remains', badColl.length); ok=false; }
const adv = readJson('grammatik/production_adverbien_intensiv.json').items || [];
const byPrompt = new Map();
for (const it of adv) if (it.exerciseType === 'gap_fill') { const set = byPrompt.get(it.prompt) || new Set(); set.add(it.answer); byPrompt.set(it.prompt,set); }
const amb = [...byPrompt.entries()].filter(([_,s])=>s.size>1);
if (amb.length) { console.error('Ambiguous adverb gap prompts remain', amb.length); ok=false; }
const englishLabels = new Set(['frequency','local','connector_adverb']);
const badLabels = adv.filter(it => englishLabels.has(it.answer));
if (badLabels.length) { console.error('English meta-label answers remain', badLabels.length); ok=false; }
const verbs = readJson('data/conjugator_verbs.json').verbs || {};
for (const [v,d] of Object.entries({antworten:['geantwortet','antworte'], arbeiten:['gearbeitet','arbeite'], bekommen:['bekommen','bekomme']})) {
  if (!verbs[v]) { console.error('Missing verb', v); ok=false; continue; }
  if (verbs[v].part !== d[0] || !String(verbs[v].present?.[0]||'').includes(d[1])) { console.error('Bad verb core form', v, verbs[v]); ok=false; }
}
console.log(ok ? 'OK: v12 verification passed' : 'FAILED');
process.exit(ok ? 0 : 1);
