const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
function readJson(p){return JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));}
function fail(msg){console.error('FAIL:', msg); process.exitCode = 1;}
function ok(msg){console.log('OK:', msg);}

try {
  const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const manifest = readJson('data-manifest.json');
  const verbs = readJson('data/conjugator_verbs.json').verbs || {};
  const curated = readJson('data/curated_verbs.json');

  if(!app.includes("2026.06.11-v17-reliable-tutor-middle-db")) fail('APP_VERSION is not v17'); else ok('APP_VERSION v17');
  if(!html.includes('quickStartPanel')) fail('quick start panel missing'); else ok('quick start panel present');
  if(!/function\s+renderQuickStart\s*\(/.test(app)) fail('renderQuickStart not defined'); else ok('quick start renderer defined');
  if(!curated.starter || curated.starter.length < 20) fail('starter verb set too small'); else ok(`starter verbs: ${curated.starter.length}`);
  if(!curated.top300 || curated.top300.length < 250) fail('curated verb set below 250'); else ok(`curated verbs: ${curated.top300.length}`);
  const missing = [...curated.starter, ...curated.top300].filter(v => !verbs[v]);
  if(missing.length) fail('curated verbs missing from conjugator: '+missing.slice(0,20).join(', ')); else ok('curated verbs exist in conjugator');
  for(const v of ['antworten','arbeiten','bekommen','teilnehmen','vorbereiten','abgeben']){
    if(!verbs[v]) fail(`${v} missing`);
  }
  if(verbs.antworten?.part !== 'geantwortet' || /\btworte|angetwort/.test(JSON.stringify(verbs.antworten))) fail('antworten regression'); else ok('antworten valid');
  for(const v of ['teilnehmen','vorbereiten','abgeben']){
    const k = verbs[v]?.konj2?.[0] || '';
    if(!k.includes(v)) fail(`${v} Konjunktiv II does not keep infinitive: ${k}`);
  }
  ok('separable Konjunktiv II valid for core verbs');
  const modules = manifest.modules || [];
  if(modules.length < 15 || modules.length > 25) fail('module count outside v17 middle-db target'); else ok(`v17 middle-db modules: ${modules.length}`);
  const quarantined = manifest.quarantine || [];
  for(const bad of ['grammatik/production_adverbien_intensiv.json','grammatik/konnektoren_engine.json','grammatik/reklamation_technische_probleme.json']){
    if(modules.some(m=>m.path===bad)) fail('quarantined unsafe module still loaded: '+bad);
    if(!quarantined.includes(bad)) fail('quarantine list missing: '+bad);
  }
  ok('unsafe generated modules excluded from default manifest');
  const allFiles = modules.map(m => m.path).filter(Boolean);
  const missingFiles = allFiles.filter(p => !fs.existsSync(path.join(root,p)));
  if(missingFiles.length) fail('manifest missing files: '+missingFiles.join(', ')); else ok('manifest files present');
  const raw = JSON.stringify(readJson('data/locales/wipa_lexicon.json'));
  for(const lang of ['en','fr','es','pl','tr','uk','ru','ar','fa']){
    if(!raw.includes(`"${lang}"`)) fail(`locale lexicon missing ${lang}`);
  }
  ok('regional locale layer present');
  if(process.exitCode) process.exit(process.exitCode);
  console.log('OK: v17 reliable-tutor audit passed');
} catch (e) {
  console.error(e);
  process.exit(1);
}
