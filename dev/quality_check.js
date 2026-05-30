const fs=require('fs');
const html=fs.readFileSync('../index.html','utf8');
const required=[
'stable-boot-no-localstorage-db-2026-05-30',
'window.EMBEDDED_DATA',
'function useEmbeddedFallback()',
'Do not persist the full learning database',
'function save(){localStorage.setItem(PROG',
'Runtime error:'
];
let missing=required.filter(x=>!html.includes(x));
if(missing.length){console.error('Missing:', missing); process.exit(1);}
console.log('QA passed');
