/**
 * /dev/content_audit.js
 * Default: audits production_* modules only, so CI protects the curated production layer.
 * Full legacy audit: node dev/content_audit.js --all
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const FULL = process.argv.includes('--all');
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
function inScope(file){
  if(FULL) return true;
  const rel = path.relative(ROOT,file);
  return path.basename(file).startsWith('production_') || rel.includes('production_');
}
for(const dir of TARGET_DIRS){
  for(const file of walk(path.join(ROOT,dir)).filter(inScope)){
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
console.log(`Audit scope=${FULL?'all legacy+production':'production only'}. duplicates=${duplicateCount}, placeholder_like=${placeholderCount}`);
if(duplicateCount>0 || placeholderCount>0){process.exit(1);}
