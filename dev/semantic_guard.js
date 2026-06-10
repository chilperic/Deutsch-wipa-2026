const fs=require('fs');const path=require('path');
const root=path.join(__dirname,'..');
const dirs=['grammatik','vokabular'];
const seen=new Map();let dup=0,placeholder=0;
function walk(d){if(!fs.existsSync(d))return[];return fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>{const p=path.join(d,x.name);return x.isDirectory()?walk(p):[p];});}
function strings(o,out=[]){if(typeof o==='string')out.push(o);else if(Array.isArray(o))o.forEach(x=>strings(x,out));else if(o&&typeof o==='object')Object.values(o).forEach(x=>strings(x,out));return out;}
for(const dir of dirs){for(const f of walk(path.join(root,dir)).filter(x=>x.endsWith('.json'))){let data;try{data=JSON.parse(fs.readFileSync(f,'utf8'));}catch(e){continue;}for(const s of strings(data)){const clean=s.trim().replace(/\s+/g,' ');if(clean.length<45)continue;if(/meaning to be added|to [a-zäöüß]+$/i.test(clean)){console.warn('[PLACEHOLDER]',path.relative(root,f),clean);placeholder++;}const norm=clean.toLowerCase();if(seen.has(norm)&&seen.get(norm)!==f){console.warn('[DUPLICATE]',clean,'\n ',path.relative(root,seen.get(norm)),'\n ',path.relative(root,f));dup++;}else seen.set(norm,f);}}}
// Duplicates in legacy textbook-like examples are warnings only. Placeholders fail.
if(placeholder){console.error(`Semantic guard failed: ${placeholder} placeholder strings.`);process.exit(1);}console.log(`OK: semantic guard completed (${dup} duplicate warnings, 0 placeholders).`);
