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

  if(!app.includes("2026.06.10-v15-professional-core")) fail('APP_VERSION is not v15'); else ok('APP_VERSION v15');
  if(!html.includes('quickStartPanel')) fail('quick start panel missing'); else ok('quick start panel present');
  if(!app.includes('renderQuickStart')) fail('renderQuickStart missing'); else ok('quick start renderer present');
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
  if(modules.length < 50) fail('module count unexpectedly low'); else ok(`modules: ${modules.length}`);
  const allFiles = modules.map(m => m.path).filter(Boolean);
  const missingFiles = allFiles.filter(p => !fs.existsSync(path.join(root,p)));
  if(missingFiles.length) fail('manifest missing files: '+missingFiles.join(', ')); else ok('manifest files present');
  const raw = JSON.stringify(readJson('data/locales/wipa_lexicon.json'));
  for(const lang of ['en','fr','es','pl','tr','uk','ru','ar','fa']){
    if(!raw.includes(`"${lang}"`)) fail(`locale lexicon missing ${lang}`);
  }
  ok('regional locale layer present');
  if(process.exitCode) process.exit(process.exitCode);
  console.log('OK: v15 professional-core audit passed');
} catch (e) {
  console.error(e);
  process.exit(1);
}
