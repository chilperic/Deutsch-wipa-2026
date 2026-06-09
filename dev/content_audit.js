/**
 * /dev/content_audit.js
 * Detects cross-file duplicate instructional strings and low-density placeholder content.
 * Run: node dev/content_audit.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const TARGET_DIRS = ['grammatik','vokabular','writing','reading','speaking','training'];
const seen = new Map();
let duplicateCount = 0;
let placeholderCount = 0;
function walk(dir){
  if(!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>{
    const p=path.join(dir,d.name);
    return d.isDirectory()?walk(p):(d.name.endsWith('.json')?[p]:[]);
  });
}
function strings(x,out=[]){
  if(typeof x==='string') out.push(x.trim());
  else if(Array.isArray(x)) x.forEach(v=>strings(v,out));
  else if(x && typeof x==='object') Object.values(x).forEach(v=>strings(v,out));
  return out;
}
for(const dir of TARGET_DIRS){
  for(const file of walk(path.join(ROOT,dir))){
    let data; try{data=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){console.error(`[INVALID JSON] ${file}`); process.exitCode=1; continue;}
    for(const s of strings(data)){
      if(s.length < 40) continue;
      if(/write a (formal )?email about a problem|stellen sie ihr unternehmen vor|workplace sentence bank/i.test(s)){
        console.warn(`[PLACEHOLDER-LIKE] ${path.relative(ROOT,file)} :: ${s.slice(0,100)}`); placeholderCount++;
      }
      const key=s.toLowerCase().replace(/\s+/g,' ');
      if(seen.has(key) && seen.get(key)!==file){
        console.warn(`[DUPLICATE] ${path.relative(ROOT,seen.get(key))} <=> ${path.relative(ROOT,file)} :: ${s.slice(0,120)}`); duplicateCount++;
      } else seen.set(key,file);
    }
  }
}
console.log(`Audit complete. duplicates=${duplicateCount}, placeholder_like=${placeholderCount}`);
if(duplicateCount>50 || placeholderCount>30){process.exit(1);} // tolerant for legacy modules, strict for severe regressions
