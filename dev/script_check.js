'use strict';
window.VOKABULAR_BUILD = 'new-architecture-runtime-fix-2026-05-29';

const LANGS = ['English','Spanish','French','Japanese','German','Korean','Italian','Chinese','Portuguese','Persian','Arabic','Thai'];
const MODULES = {
  vocab: {
    id:'vocab', title:'Kapitel vocabulary', subtitle:'articles · meanings · plurals · active recall',
    path:'vokabular/kapitel{n}.json', maxFiles:20,
    engines:['full','article','meaning','plural','active','sentence'],
    defaultMode:'full'
  },
  prepverbs: {
    id:'prepverbs', title:'Präpositionalverben', subtitle:'preposition · case · gap sentence · active pattern',
    path:'grammatik/praepositionalverben.json',
    engines:['prep_full','prep_gap','prep_case','prep_meaning'],
    defaultMode:'prep_full'
  }
};
const MODE_LABELS = {
  full:'Full cycle', article:'Article only', meaning:'Meaning only', plural:'Plural only', active:'Active recall', sentence:'Sentence gaps',
  prep_full:'Full grammar cycle', prep_gap:'Preposition gaps', prep_case:'Case recall', prep_meaning:'Meaning only'
};
const STORE = 'dwipa_arch_v1';
const PROG = 'dwipa_arch_progress_v1';

let DB = load(STORE,{modules:{vocab:{items:[],sets:[]},prepverbs:{items:[],sets:['all']}}});
let P = load(PROG,{progress:{},history:[]});
let USER = load('dwipa_arch_user_v1',{module:'vocab',set:'all',mode:'full',lang:'English',size:'10',audience:'student'});
let Q = null;

function load(k,f){try{return JSON.parse(localStorage.getItem(k))||structuredClone(f)}catch{return structuredClone(f)}}
function save(){localStorage.setItem(STORE,JSON.stringify(DB));localStorage.setItem(PROG,JSON.stringify(P));localStorage.setItem('dwipa_arch_user_v1',JSON.stringify(USER))}
function h(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function norm(s){return String(s??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9\u0600-\u06ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\u0e00-\u0e7f]+/g,' ').trim()}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function showScreen(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('on'));document.getElementById(id).classList.add('on'); if(id==='tracker')renderTracker()}
function setTheme(t){localStorage.setItem('dwipa_theme',t);applyTheme()}function applyTheme(){let t=localStorage.getItem('dwipa_theme')||'dark';if(t==='system')t=matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.body.classList.toggle('theme-light',t==='light')}
function applyAudience(a){
  USER.audience = a || USER.audience || 'student';
  document.body.classList.toggle('admin', USER.audience === 'admin');
  document.body.classList.toggle('student', USER.audience !== 'admin');
}
function setAudience(a){
  USER.audience = a || 'student';
  applyAudience(USER.audience);
  save();
  renderMenu();
}
function artOf(w){return String(w.word||w.display||'').match(/^(der|die|das)\s+/i)?.[1]?.toLowerCase()||null}
function baseOf(w){return String(w.word||w.display||w.lemma||'').replace(/^(der|die|das)\s+/i,'').split(',')[0].trim()}
function chapOf(w){return String(w.chapter||w.chapter_id||w.set||w.notes||'').match(/kapitel\s*(\d+)|kapitel(\d+)|^(\d+)$/i)?.slice(1).find(Boolean)||'?'}

function progressKey(item){return `${USER.module}:${item.id}`}
function srs(item){const k=progressKey(item);return P.progress[k]||(P.progress[k]={box:0,correct:0,wrong:0,due:0,seen:0,tracks:{}})}
function record(item,ok,track='general'){const r=srs(item);r.seen++; if(ok){r.correct++;r.box=Math.min(7,r.box+1)}else{r.wrong++;r.box=0} r.tracks[track]=r.tracks[track]||{c:0,w:0}; ok?r.tracks[track].c++:r.tracks[track].w++; r.due=Date.now()+[0,1,3,7,14,30,60,120][r.box]*86400000; save()}
function trOf(item){const t=item.data?.translations||item.meaning||{};return t[USER.lang]||t.English||t.German||Object.values(t).find(Boolean)||'—'}
function moduleItems(){return DB.modules[USER.module]?.items||[]}
function filteredItems(){let arr=moduleItems(); if(USER.module==='vocab' && USER.set!=='all')arr=arr.filter(x=>chapOf(x)===USER.set); return arr}
function dueItems(){return filteredItems().filter(x=>srs(x).due<=Date.now())}
function weakItems(){return filteredItems().filter(x=>srs(x).wrong>srs(x).correct)}

async function reloadAll(){
  const status = document.getElementById('load-status');
  status.textContent='Loading learning files…';
  await loadVocabFiles(); await loadPrepVerbFile();
  save(); renderMenu();
  const total = Object.values(DB.modules).reduce((a,m)=>a+(m.items||[]).length,0);
  status.textContent = total
    ? `Loaded ${total} learning items. Current module: ${moduleItems().length} items.`
    : 'No files loaded. Check that vokabular/ and grammatik/ folders are uploaded at the repository root.';
}
async function loadVocabFiles(){
  const items=[], sets=[], failed=[];
  for(let i=1;i<=MODULES.vocab.maxFiles;i++){
    const url=`vokabular/kapitel${i}.json`;
    try{const r=await fetch(url,{cache:'no-store'}); if(!r.ok)continue; const j=await r.json(); const ws=(j.words||[]).map(w=>normalizeVocab(w,i)); items.push(...ws); sets.push(String(i));}
    catch(e){failed.push(url); console.warn('Failed vocab file',url,e)}
  }
  if(items.length){DB.modules.vocab={items,sets:[...new Set(sets)]}}
}
async function loadPrepVerbFile(){
  const url=MODULES.prepverbs.path;
  try{const r=await fetch(url,{cache:'no-store'}); if(!r.ok)return; const j=await r.json(); DB.modules.prepverbs={items:(j.items||[]).map(normalizePrepVerb),sets:['all']};}
  catch(e){console.warn('Failed grammar module',url,e)}
}
function normalizeVocab(w,chapter){w.module='vocab';w.set=String(chapter);w.chapter=String(chapter);return w}
function normalizePrepVerb(x){return {...x,module:'prepverbs',set:'all',word:x.display||x.lemma,id:x.id||crypto.randomUUID(),data:{translations:x.meaning||{},grammar:{type:'prepositional_verb',pattern:`${x.preposition} + ${x.case}`,preposition:x.preposition,case:x.case},example_de:x.example?.de||x.gap?.sentence?.replace('___',x.preposition)||'',example_translated:x.example||{},grammar_clarification:{English:`${x.display}: use ${x.preposition} + ${x.case}.`,German:`${x.display}: mit ${x.preposition} + ${x.case}.`}}}}

function renderMenu(){
  applyTheme(); applyAudience(USER.audience);
  document.getElementById('module-cards').innerHTML=Object.values(MODULES).map(m=>{
    const count = (DB.modules[m.id]?.items||[]).length;
    const disabled = count === 0 ? 'style="opacity:.55"' : '';
    return `<div class="module-card ${USER.module===m.id?'on':''}" ${disabled} onclick="setModule('${m.id}')">
      <b>${h(m.title)}</b>
      <p class="tiny">${h(m.subtitle)}</p>
      <p class="tiny count">${count ? count + ' items ready' : 'not loaded yet'}</p>
    </div>`;
  }).join('');
  const langSel = document.getElementById('quiz-lang');
  if (langSel) langSel.innerHTML=LANGS.map(l=>`<option value="${l}" ${USER.lang===l?'selected':''}>${l}</option>`).join('');
  renderSetSelect(); renderModeSelect(); renderSizePills(); renderStats(); renderAdmin(); renderEmptyState();
}
function setModule(id){USER.module=id;USER.mode=MODULES[id].defaultMode;USER.set='all';save();renderMenu()}
function renderSetSelect(){const sel=document.getElementById('set-select');if(USER.module==='vocab'){sel.disabled=false;sel.innerHTML=`<option value="all">All chapters</option>`+(DB.modules.vocab.sets||[]).map(s=>`<option value="${s}" ${USER.set===s?'selected':''}>Kapitel ${s}</option>`).join('')}else{sel.disabled=true;sel.innerHTML=`<option value="all">All items</option>`}}
function renderModeSelect(){const sel=document.getElementById('mode-select');sel.innerHTML=MODULES[USER.module].engines.map(m=>`<option value="${m}" ${USER.mode===m?'selected':''}>${MODE_LABELS[m]}</option>`).join('')}
function renderStats(){const arr=filteredItems();const prog=arr.map(srs);const attempts=prog.reduce((a,r)=>a+r.correct+r.wrong,0),correct=prog.reduce((a,r)=>a+r.correct,0);document.getElementById('st-items').textContent=arr.length;document.getElementById('st-due').textContent=dueItems().length;document.getElementById('st-weak').textContent=weakItems().length;document.getElementById('st-acc').textContent=attempts?Math.round(correct/attempts*100)+'%':'—'}
function renderEmptyState(){
  const el = document.getElementById('empty-state');
  if (!el) return;
  const total = Object.values(DB.modules).reduce((a,m)=>a+(m.items||[]).length,0);
  el.classList.toggle('on', total === 0);
  const status = document.getElementById('load-status');
  if (status && total === 0) status.textContent = 'No learning files loaded yet. Check folder names or use Admin → Reload files.';
}

function renderSizePills(){
  document.querySelectorAll('#size-pills .pill').forEach(p => p.classList.toggle('on', p.dataset.n === USER.size));
}
function renderAdmin(){document.getElementById('admin-modules').innerHTML=Object.values(MODULES).map(m=>`${m.title}: ${(DB.modules[m.id]?.items||[]).length} items`).join('<br>'); const v=DB.modules.vocab.items; const nouns=v.filter(artOf); const missingPlural=nouns.filter(x=>!x.data?.grammar?.plural).length; document.getElementById('admin-quality').innerHTML=`Vocabulary items: ${v.length}<br>Nouns: ${nouns.length}<br>Nouns missing full plural: ${missingPlural}<br>Prep verbs: ${DB.modules.prepverbs.items.length}`}
document.getElementById('quiz-lang').onchange=e=>{USER.lang=e.target.value;save();renderMenu()}
document.getElementById('set-select').onchange=e=>{USER.set=e.target.value;save();renderMenu()}
document.getElementById('mode-select').onchange=e=>{USER.mode=e.target.value;save()}
document.getElementById('size-pills').onclick=e=>{const p=e.target.closest('.pill');if(!p)return;USER.size=p.dataset.n;document.querySelectorAll('.pill').forEach(x=>x.classList.toggle('on',x===p));save()}

function startSession(items=null){
  let pool=items||filteredItems(); if(!pool.length){alert('No items loaded for this module. Check the folder structure or switch to Admin mode and click Reload files.');renderEmptyState();return}
  if(USER.mode==='due') pool=dueItems(); if(USER.mode==='weak')pool=weakItems();
  if(!pool.length){alert('No items for this mode.');return}
  const n=USER.size==='all'?pool.length:Math.min(Number(USER.size||10),pool.length);
  const queue=shuffle(pool).slice(0,n);
  Q={queue,original:[...queue],i:0,ok:0,err:0,pts:0,weak:[],streak:0,best:0,cur:null,question:null};
  showScreen('quiz'); nextQuestion();
}
function restartSession(){if(Q?.original)startSession(Q.original)}
function startWeakReview(){const arr=weakItems(); if(!arr.length){alert('No weak items yet.');return} startSession(arr)}
function nextQuestion(){if(Q.i>=Q.queue.length)return finishSession(); Q.cur=Q.queue[Q.i]; Q.question=makeQuestion(Q.cur); renderQuestion()}
function makeQuestion(item){
  if(USER.module==='prepverbs') return prepEngine(item);
  return vocabEngine(item);
}
function vocabEngine(item){
  const mode=USER.mode;
  const candidates=[];
  if((mode==='full'||mode==='article') && artOf(item)) candidates.push({type:'article'});
  if(mode==='full'||mode==='meaning') candidates.push({type:'meaning'});
  if((mode==='full'||mode==='plural') && (item.data?.grammar?.plural||item.data?.grammar?.plural_hint)) candidates.push({type:'plural'});
  if(mode==='full'||mode==='active') candidates.push({type:'active'});
  if(mode==='sentence') candidates.push({type:'sentence'});
  return candidates.length?candidates[0]:{type:'meaning'};
}
function prepEngine(item){
  const mode=USER.mode;
  if(mode==='prep_gap'||mode==='prep_full') return {type:'prep_gap'};
  if(mode==='prep_case') return {type:'prep_case'};
  if(mode==='prep_meaning') return {type:'meaning'};
  return {type:'prep_gap'};
}
function renderQuestion(){
  const it=Q.cur, q=Q.question;
  document.getElementById('b-module').textContent=MODULES[USER.module].title;
  document.getElementById('b-ok').textContent=`${Q.ok} ✓`;document.getElementById('b-err').textContent=`${Q.err} ✗`;document.getElementById('b-pts').textContent=`${Q.pts} pts`;document.getElementById('b-left').textContent=`${Q.queue.length-Q.i} left`;
  let html=`<div class="word"><div class="word-art ${artOf(it)||'none'}">${artOf(it)||''}</div><div class="word-main">${h(baseOf(it))}</div><div class="word-sub">${h(it.notes||it.display||'')}</div></div>`;
  if(q.type==='article') html+=articleView(it);
  if(q.type==='meaning') html+=meaningView(it);
  if(q.type==='plural') html+=typeView('Plural', pluralAnswers(it)[0]||'', 'Type the full plural or source hint');
  if(q.type==='active') html+=typeView('Active recall', activeAnswers(it)[0]||baseOf(it), 'Type the German word/expression');
  if(q.type==='sentence') html+=sentenceView(it);
  if(q.type==='prep_gap') html+=prepGapView(it);
  if(q.type==='prep_case') html+=typeView('Case recall', it.case, `${h(it.display)} + ?`);
  document.getElementById('qcard').innerHTML=html;
  const inp=document.getElementById('answer-input'); if(inp)setTimeout(()=>inp.focus(),0);
}
function articleView(it){return `<div class="phase">Choose the article</div><div class="artgrid">${['der','die','das','—'].map(a=>`<button class="artbtn ${a}" onclick="answer('${a}')">${a}</button>`).join('')}</div>`}
function meaningView(it){const correct=trOf(it); const opts=shuffle([correct,...shuffle(moduleItems().filter(x=>x.id!==it.id).map(trOf).filter(x=>x&&x!==correct)).slice(0,3)]); return `<div class="phase">Choose the meaning</div><div class="opts">${opts.map((o,i)=>`<button class="opt" onclick="answer('${h(o).replaceAll("'","&#39;")}')"><span>${String.fromCharCode(65+i)}</span><b>${h(o)}</b></button>`).join('')}</div>`}
function typeView(title, expected, hint){return `<div class="phase">${h(title)}</div><p class="note" style="text-align:center;margin-bottom:10px">${h(hint)}</p><input class="type-input" id="answer-input" onkeydown="if(event.key==='Enter')answer(this.value)"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" onclick="answer(document.getElementById('answer-input').value)">Check</button></div>`}
function sentenceView(it){const ex=it.data?.example_de||`Das Lernwort ist ${baseOf(it)}.`; const answer=baseOf(it); const sentence=ex.replace(baseOf(it), '___'); Q.sentenceAnswer=answer; return `<div class="phase">Sentence gap</div><div class="gap-sentence">${h(sentence).replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input" onkeydown="if(event.key==='Enter')answer(this.value)">`}
function prepGapView(it){return `<div class="phase">Preposition gap</div><div class="gap-sentence">${h(it.gap?.sentence||'').replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input" placeholder="preposition" onkeydown="if(event.key==='Enter')answer(this.value)"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" onclick="answer(document.getElementById('answer-input').value)">Check</button></div>`}
function pluralAnswers(it){const g=it.data?.grammar||{}; return [g.plural,g.plural_hint, derivePlural(it)].filter(Boolean)}
function derivePlural(it){const g=it.data?.grammar||{},b=g.base||baseOf(it),h=String(g.plural_hint||''); if(!h)return ''; if(h==='-'||h==='—')return `die ${b}`; if(!h.startsWith('-'))return h.match(/^(die|der|das)\s/)?h:`die ${h}`; let suf=h.slice(1); if(suf.startsWith('¨')){suf=suf.slice(1);return `die ${umlaut(b)}${suf}`} return `die ${b}${suf}`}
function umlaut(s){const map={a:'ä',o:'ö',u:'ü',A:'Ä',O:'Ö',U:'Ü'}; for(let i=s.length-1;i>=0;i--){if(map[s[i]])return s.slice(0,i)+map[s[i]]+s.slice(i+1)} return s}
function activeAnswers(it){return [it.word, baseOf(it)].filter(Boolean)}
function expectedAnswers(){const it=Q.cur,q=Q.question; if(q.type==='article')return [artOf(it)||'—']; if(q.type==='meaning')return [trOf(it)]; if(q.type==='plural')return pluralAnswers(it); if(q.type==='active')return activeAnswers(it); if(q.type==='sentence')return [Q.sentenceAnswer]; if(q.type==='prep_gap')return [it.preposition]; if(q.type==='prep_case')return [it.case,it.case==='Akkusativ'?'Akk':'Dat']; return []}
function answer(value){const exp=expectedAnswers(); const ok=exp.some(x=>norm(x)===norm(value)); const inp=document.getElementById('answer-input'); if(inp)inp.classList.add(ok?'ok':'err'); if(ok){Q.ok++;Q.pts+=pointsFor(Q.question.type);Q.streak++;Q.best=Math.max(Q.best,Q.streak)}else{Q.err++;Q.weak.push(Q.cur);Q.streak=0} record(Q.cur,ok,Q.question.type); showFeedback(ok,value,exp); if(ok)setTimeout(()=>{Q.i++; nextQuestion()},500)}
function pointsFor(t){return {article:1,meaning:2,plural:3,active:3,sentence:3,prep_gap:3,prep_case:2}[t]||1}
function showFeedback(ok,value,exp){const box=document.getElementById('qcard'); box.insertAdjacentHTML('beforeend',`<div class="feedback ${ok?'ok':'err'}">${ok?'Correct':'Wrong'} · Expected: ${h(exp[0]||'—')}</div>`); if(!ok)box.insertAdjacentHTML('beforeend',`<div class="diagnosis">${diagnose(Q.question.type,Q.cur,exp[0],value)}</div><div class="row g8" style="justify-content:center;margin-top:12px"><button class="btn btn-gold" onclick="Q.i++;nextQuestion()">Continue</button></div>`)}
function diagnose(type,it,exp,got){if(type==='plural')return `Plural: learn the full form with article. ${h(it.word||baseOf(it))} → ${h(exp)}.`; if(type==='prep_gap')return `${h(it.display)} requires “${h(it.preposition)} + ${h(it.case)}”.`; if(type==='prep_case')return `Case recall: ${h(it.display)} uses ${h(it.case)}.`; if(type==='article')return `Article mistake: German nouns need gender. Correct: ${h(exp)}.`; return `Active recall needs exact production. Your answer: ${h(got||'—')}.`}
function skipQuestion(){Q.err++;Q.weak.push(Q.cur);record(Q.cur,false,Q.question?.type||'skip');Q.i++;nextQuestion()}
function finishSession(){const total=Q.ok+Q.err,pct=total?Math.round(Q.ok/total*100):0;P.history.push({date:new Date().toLocaleString(),module:USER.module,set:USER.set,mode:USER.mode,ok:Q.ok,err:Q.err,pts:Q.pts,pct});save();document.getElementById('sum-score').textContent=pct+'%';document.getElementById('sum-sub').textContent=`${MODULES[USER.module].title} · ${MODE_LABELS[USER.mode]}`;document.getElementById('sum-ok').textContent=Q.ok;document.getElementById('sum-err').textContent=Q.err;document.getElementById('sum-pts').textContent=Q.pts;document.getElementById('sum-best').textContent=Q.best;document.getElementById('sum-weak').innerHTML=Q.weak.length?`<div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Meaning</th></tr></thead><tbody>${[...new Map(Q.weak.map(x=>[x.id,x])).values()].map(x=>`<tr><td>${h(x.word||x.display)}</td><td>${h(trOf(x))}</td></tr>`).join('')}</tbody></table></div>`:'';showScreen('summary');renderMenu()}
function exitQuiz(){showScreen('menu');renderMenu()}
function speakCurrent(){if(!Q?.cur||!speechSynthesis)return;const u=new SpeechSynthesisUtterance(baseOf(Q.cur));u.lang='de-DE';speechSynthesis.cancel();speechSynthesis.speak(u)}
function renderTracker(){const rows=Object.entries(P.progress).map(([k,r])=>({k,r}));document.getElementById('tracker-content').innerHTML=`<div class="tbl-wrap"><table><thead><tr><th>Module:item</th><th>Correct</th><th>Wrong</th><th>Box</th><th>Due</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${h(x.k)}</td><td>${x.r.correct}</td><td>${x.r.wrong}</td><td>${x.r.box}</td><td>${x.r.due<=Date.now()?'now':'later'}</td></tr>`).join('')}</tbody></table></div>`}
function openResources(){renderResources();showScreen('resources')}
function renderResources(){const resources=[['Duden','https://www.duden.de/'],['DWDS','https://www.dwds.de/'],['Verbformen','https://www.verbformen.de/'],['Mein Deutschbuch','https://mein-deutschbuch.de/grammatik.html'],['Schubert Verlag','https://www.schubert-verlag.de/aufgaben/'],['DW Learn German','https://learngerman.dw.com/']];document.getElementById('resource-grid').innerHTML=resources.map(([n,u])=>`<div class="module-card"><b>${n}</b><p class="tiny"><a target="_blank" href="${u}">${u}</a></p></div>`).join('')}

(async function init(){
  try {
    applyTheme();
    applyAudience(USER.audience);
    await loadVocabFiles();
    await loadPrepVerbFile();
    save();
    renderMenu();
  } catch (err) {
    console.error('App initialization failed:', err);
    const status = document.getElementById('load-status');
    if (status) status.textContent = 'Initialization error: ' + (err && err.message ? err.message : err);
  }
})();