const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const required = [
  'learning-loop-ux-repair-2026-05-30',
  'id="quickReview"',
  'data-view="phone"',
  'function applyView',
  'mobileStart',
  'function findItemByKey',
  'function teachFeedback',
  'feedbackTeach',
  'renderProfile'
];
const missing = required.filter(x => !html.includes(x));
if (missing.length) {
  console.error('Missing:', missing);
  process.exit(1);
}
console.log('quality check passed');
