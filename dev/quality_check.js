const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const required = [
  'stable-boot-profile-themes-2026-05-30',
  'id="learnerName"',
  'function renderProfile()',
  'saveLearnerName',
  'resetProgress',
  'theme-graphite',
  'theme-ocean',
  'theme-sand',
  'theme-violet',
  'theme-mint',
  'theme-rose',
  'theme-highcontrast',
  'best:Q.best'
];
const missing = required.filter(x => !html.includes(x));
if (missing.length) {
  console.error('Missing:', missing);
  process.exit(1);
}
console.log('quality check passed');
