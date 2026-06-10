
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
function fail(msg){ console.error('FAIL:', msg); process.exitCode = 1; }
function ok(msg){ console.log('OK:', msg); }
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
const css = fs.readFileSync(path.join(root,'styles.css'),'utf8');
const sw = fs.readFileSync(path.join(root,'sw.js'),'utf8');
if(!/function\s+renderQuickStart\s*\(/.test(app)) fail('renderQuickStart function missing'); else ok('renderQuickStart defined');
if(!/const\s+APP_VERSION\s*=\s*'2026\.06\.10-v16-professional-core'/.test(app)) fail('APP_VERSION not v16'); else ok('APP_VERSION v16');
if(!css.includes('.qs-tiles') || !css.includes('.qs-tile')) fail('quick-start CSS missing'); else ok('quick-start CSS present');
for(const lang of ['fr','es','ar','fa','uk','ru','pl','tr']){
  const block = new RegExp(`${lang}:\\{([\\s\\S]*?)\\n\\s*${lang==='tr'?'\\}':'[a-z]{2}:\\{'}`);
}
const required = ['onboardingTitle','onboardingText','quickConj','quickDecl','quickPrep','quickReview','starter','curated','allVerbs'];
const patchPresent = app.includes('QUICKSTART_I18N_PATCH');
if(!patchPresent) fail('translation patch missing'); else ok('quick-start i18n patch present');
for(const key of required) if(!app.includes(key)) fail('missing translation key '+key);
if(!sw.includes('precacheModules') || !sw.includes('data/curated_verbs.json') || !sw.includes('data/locales/wipa_lexicon.json')) fail('service worker dynamic precache incomplete'); else ok('service worker precaches core dynamic data');
if(/renderAll\(\)\{[^}]*renderResources\(/.test(app)) fail('renderResources remains in hot renderAll path'); else ok('renderResources not in renderAll hot path');
if(process.exitCode) process.exit(process.exitCode);
console.log('OK: v16 audit passed');
