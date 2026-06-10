const fs=require('fs');const path=require('path');
function read(p){return JSON.parse(fs.readFileSync(p,'utf8'))}
let ok=true;
const root=process.cwd();
const verbs=read(path.join(root,'data/conjugator_verbs.json')).verbs;
for(const v of ['vorbereiten','teilnehmen','abgeben']){
 const k=verbs[v]?.konj2?.[0];
 if(k!==`würde ${v}`){console.error('Bad separable Konjunktiv II',v,k);ok=false;}
}
if(verbs.antworten?.part!=='geantwortet'||verbs.antworten?.present?.[0]!=='antworte'){console.error('antworten regression');ok=false;}
const lex=read(path.join(root,'data/locales/wipa_lexicon.json')).entries;
for(const w of ['abteilung','kündigung','engpass','abschreibung']){
 if(!lex[w]||!lex[w].localizations?.pl||!lex[w].localizations?.tr||!lex[w].localizations?.uk||!lex[w].localizations?.es){console.error('Missing locale entry',w);ok=false;}
}
const work=read(path.join(root,'vokabular/production_workplace_collocations.json')).words;
const missing=work.filter(w=>!w.data?.translations?.Polish||!w.data?.translations?.Turkish||!w.data?.translations?.Ukrainian||!w.data?.translations?.Spanish);
if(missing.length){console.error('Workplace localization gaps',missing.length);ok=false;}
const manifest=read(path.join(root,'data-manifest.json'));
for(const m of manifest.modules){if(!fs.existsSync(path.join(root,m.path))){console.error('Missing module',m.path);ok=false;}}
console.log(ok?'OK: v14 localization/separable audit passed':'FAILED');process.exit(ok?0:1);
