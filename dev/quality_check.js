
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const must = ['book-complete-content-2026-06-08','window.APP_DATA','Sentence logic','Konnektoren','Negation','TeKaMoLo','temporal → kausal → modal → lokal','appearanceSelect','flavorSelect','viewSelect'];
const missing = must.filter(x => !html.includes(x));
if (missing.length) { console.error('missing', missing); process.exit(1); }
const m = html.match(/window\.APP_DATA = (.*);\nconst \$ =/s);
if (!m) { console.error('APP_DATA parse marker missing'); process.exit(1); }
const data = JSON.parse(m[1]);
if (data.connectors.length < 80) throw new Error('too few connectors');
if (data.negation.length < 80) throw new Error('too few negation');
if (data.tekamolo.length < 60) throw new Error('too few tekamolo');
const needed = ['beruf','nomen_artikel_plural','genus_rules','n_deklination','adjektive_als_nomen','praepositionalverben','starke_verben','trennbare_verben','perfekt','plusquamperfekt','infinitiv_zu','reflexive','konjunktiv2','pronomen','praepositionen','adjektivdeklination','kasusergaenzungen','konnektoren_nebensaetze'];
for (const key of needed) {
  if (!data.generic[key] || data.generic[key].length < 60) throw new Error('too few items in '+key);
}

console.log('quality check passed');
