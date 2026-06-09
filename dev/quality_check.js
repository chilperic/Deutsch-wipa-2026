
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const must = [
  'communication-modules-complete-2026-06-08',
  'Entschuldigung & Reaktion',
  'Reklamation / technische Probleme',
  'Bewerbung / Arbeit',
  'APP_DATA.generic.apology?.length',
  'APP_DATA.generic.complaints?.length',
  'APP_DATA.generic.bewerbung?.length'
];
const missing = must.filter(x => !html.includes(x));
if (missing.length) {
  console.error('missing', missing);
  process.exit(1);
}
const m = html.match(/window\.APP_DATA\s*=\s*(\{.*?\});\nconst \$/s);
if (!m) throw new Error('APP_DATA not found');
const data = JSON.parse(m[1]);
if ((data.generic.apology || []).length < 70) throw new Error('apology too small');
if ((data.generic.complaints || []).length < 80) throw new Error('complaints too small');
if ((data.generic.bewerbung || []).length < 80) throw new Error('bewerbung too small');
console.log('quality check passed');
