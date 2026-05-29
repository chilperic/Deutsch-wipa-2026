'use strict';
window.VOKABULAR_BUILD = 'dashboard-interface-structured-2026-05-29';

const LANGS = ['English','Spanish','French','Japanese','German','Korean','Italian','Chinese','Portuguese','Persian','Arabic','Thai'];
const MODULES = {
  vocab: {
    id:'vocab',
    n:1,
    title:'Kapitel vocabulary',
    subtitle:'articles · meanings · plurals · active recall',
    icon:'📖',
    status:'active',
    countLabel:null,
    engines:['full','article','meaning','plural','active','sentence'],
    defaultMode:'full'
  },
  prepverbs: {
    id:'prepverbs',
    n:2,
    title:'Präpositionalverben',
    subtitle:'preposition · case · gap sentence · active pattern',
    icon:'↻',
    status:'active',
    countLabel:null,
    engines:['prep_full','prep_gap','prep_case','prep_meaning'],
    defaultMode:'prep_full'
  },
  kasusergaenzungen: {
    id:'kasusergaenzungen',
    n:3,
    title:'Kasusergänzungen',
    subtitle:'verb · case · preposition complements',
    icon:'▤',
    status:'planned',
    countLabel:'planned',
    engines:[],
    defaultMode:''
  },
  starke_verben: {
    id:'starke_verben',
    n:4,
    title:'Starke Verben',
    subtitle:'irregular · forms · meaning · conjugation',
    icon:'ϟ',
    status:'planned',
    countLabel:'planned',
    engines:[],
    defaultMode:''
  },
  trennbare_verben: {
    id:'trennbare_verben',
    n:5,
    title:'Trennbare Verben',
    subtitle:'separable · prefixes · meaning in context',
    icon:'⇄',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  },
  praepositionen: {
    id:'praepositionen',
    n:6,
    title:'Präpositionen',
    subtitle:'prepositions · cases · usage examples',
    icon:'⌖',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  },
  nomen_artikel_plural: {
    id:'nomen_artikel_plural',
    n:7,
    title:'Nomen · Artikel · Plural',
    subtitle:'gender · articles · plurals · endings',
    icon:'A',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  },
  adjektivdeklination: {
    id:'adjektivdeklination',
    n:8,
    title:'Adjektivdeklination',
    subtitle:'declension · strong · weak · mixed',
    icon:'Aa',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  },
  pronomen: {
    id:'pronomen',
    n:9,
    title:'Pronomen',
    subtitle:'personal · reflexive · possessive · demonstrative',
    icon:'○',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  },
  konnektoren_nebensaetze: {
    id:'konnektoren_nebensaetze',
    n:10,
    title:'Konnektoren / Nebensätze',
    subtitle:'subordinating · conjunctions · clause patterns',
    icon:'∞',
    status:'planned',
    countLabel:'coming soon',
    engines:[],
    defaultMode:''
  }
};
const ACTIVE_MODULE_IDS = ['vocab','prepverbs'];
const MODE_LABELS = {
  full:'Full cycle', article:'Article only', meaning:'Meaning only', plural:'Plural only', active:'Active recall', sentence:'Sentence gaps',
  prep_full:'Full grammar cycle', prep_gap:'Preposition gaps', prep_case:'Case recall', prep_meaning:'Meaning only'
};
const DEFAULT_DB = {modules:{vocab:{items:[],sets:[]},prepverbs:{items:[],sets:['all']}}};
const DEFAULT_USER = {module:'vocab',set:'all',mode:'full',lang:'English',size:'10',audience:'student'};
const STORE = 'dwipa_complete_arch_db_v1';
const PROG = 'dwipa_complete_arch_progress_v1';
const USERKEY = 'dwipa_complete_arch_user_v1';

let DB = safeLoad(STORE, DEFAULT_DB);
let P = safeLoad(PROG, {progress:{},history:[]});
let USER = safeLoad(USERKEY, DEFAULT_USER);
let Q = null;

function safeClone(x){ return JSON.parse(JSON.stringify(x)); }
function safeLoad(k,f){ try{ const raw=localStorage.getItem(k); if(!raw) return safeClone(f); return Object.assign(safeClone(f), JSON.parse(raw)); } catch(e){ console.warn('Bad storage',k,e); return safeClone(f); } }
function save(){ localStorage.setItem(STORE,JSON.stringify(DB)); localStorage.setItem(PROG,JSON.stringify(P)); localStorage.setItem(USERKEY,JSON.stringify(USER)); }
function $(id){ return document.getElementById(id); }
function h(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function norm(s){return String(s ?? '').toLowerCase().replaceAll('ä','ae').replaceAll('ö','oe').replaceAll('ü','ue').replaceAll('ß','ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u0600-\u06ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\u0e00-\u0e7f]+/g,' ').trim()}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function showScreen(id){ document.querySelectorAll('.screen').forEach(x=>x.classList.remove('on')); $(id).classList.add('on'); if(id==='tracker') renderTracker(); }
function setTheme(t){ localStorage.setItem('dwipa_theme',t); applyTheme(); }
function applyTheme(){ let t=localStorage.getItem('dwipa_theme')||'dark'; if(t==='system') t=matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'; document.body.classList.toggle('theme-light',t==='light'); }
function applyAudience(){ document.body.classList.toggle('admin', USER.audience==='admin'); document.body.classList.toggle('student', USER.audience!=='admin'); }
function setAudience(a){ USER.audience=a; applyAudience(); save(); renderMenu(); }

function ensureShape(){
  DB.modules = DB.modules || {};
  DB.modules.vocab = DB.modules.vocab || {items:[],sets:[]};
  DB.modules.prepverbs = DB.modules.prepverbs || {items:[],sets:['all']};
  P.progress = P.progress || {};
  P.history = P.history || [];
  if(!ACTIVE_MODULE_IDS.includes(USER.module)) USER.module='vocab';
  if(!MODULES[USER.module].engines.includes(USER.mode)) USER.mode=MODULES[USER.module].defaultMode;
  if(!LANGS.includes(USER.lang)) USER.lang='English';
  if(!USER.size) USER.size='10';
}

function artOf(w){ return String(w.word||w.display||'').match(/^(der|die|das)\s+/i)?.[1]?.toLowerCase() || null; }
function baseOf(w){ return String(w.word||w.display||w.lemma||'').replace(/^(der|die|das)\s+/i,'').split(',')[0].trim(); }
function chapOf(w){ return String(w.chapter||w.set||w.notes||'').match(/kapitel\s*(\d+)|kapitel(\d+)|^(\d+)$/i)?.slice(1).find(Boolean) || '?'; }
function trOf(item){ const t=item.data?.translations || item.meaning || {}; return t[USER.lang] || t.English || t.German || Object.values(t).find(Boolean) || '—'; }
function progressKey(item){ return `${item.module || USER.module}:${item.id}`; }
function srs(item){ const k=progressKey(item); return P.progress[k] || (P.progress[k]={box:0,correct:0,wrong:0,due:0,seen:0,tracks:{}}); }
function record(item,ok,track='general'){ const r=srs(item); r.seen++; if(ok){r.correct++;r.box=Math.min(7,r.box+1)}else{r.wrong++;r.box=0} r.tracks[track]=r.tracks[track]||{c:0,w:0}; ok?r.tracks[track].c++:r.tracks[track].w++; r.due=Date.now()+[0,1,3,7,14,30,60,120][r.box]*86400000; save(); }

function moduleItems(){ return DB.modules[USER.module]?.items || []; }
function filteredItems(){ let arr=moduleItems(); if(USER.module==='vocab' && USER.set!=='all') arr=arr.filter(x=>chapOf(x)===USER.set); return arr; }
function dueItems(){ return filteredItems().filter(x=>srs(x).due<=Date.now()); }
function weakItems(){ return filteredItems().filter(x=>srs(x).wrong>srs(x).correct); }

async function reloadAll(){
  $('load-status').textContent='Loading learning files…';
  await loadVocabFiles();
  await loadPrepVerbFile();
  save();
  renderMenu();
  const total = Object.values(DB.modules).reduce((a,m)=>a+(m.items||[]).length,0);
  $('load-status').textContent = total ? `Loaded ${total} learning items.` : 'No files loaded. Check vokabular/ and grammatik/ folders.';
}
async function loadVocabFiles(){
  const items=[], sets=[];
  for(let i=1;i<=20;i++){
    const url=`vokabular/kapitel${i}.json`;
    try{
      const r=await fetch(url,{cache:'no-store'});
      if(!r.ok) continue;
      const j=await r.json();
      (j.words||[]).forEach(w=>items.push(normalizeVocab(w,i)));
      sets.push(String(i));
    } catch(e){ console.warn('Could not load',url,e); }
  }
  DB.modules.vocab = {items,sets:[...new Set(sets)]};
}
async function loadPrepVerbFile(){
  const url='grammatik/praepositionalverben.json';
  try{
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok){ DB.modules.prepverbs={items:[],sets:['all']}; return; }
    const j=await r.json();
    DB.modules.prepverbs={items:(j.items||[]).map(normalizePrepVerb),sets:['all']};
  } catch(e){ console.warn('Could not load',url,e); DB.modules.prepverbs={items:[],sets:['all']}; }
}
function normalizeVocab(w,chapter){ return {...w,module:'vocab',set:String(chapter),chapter:String(chapter),id:w.id || `k${chapter}_${Math.random().toString(36).slice(2)}`}; }
function normalizePrepVerb(x){
  return {
    ...x,
    module:'prepverbs',
    set:'all',
    id:x.id || `pv_${Math.random().toString(36).slice(2)}`,
    word:x.display || x.lemma,
    data:{
      translations:x.meaning || {},
      grammar:{type:'prepositional_verb',pattern:`${x.preposition} + ${x.case}`,preposition:x.preposition,case:x.case},
      example_de:x.example?.de || (x.gap?.sentence||'').replace('___',x.preposition),
      example_translated:x.example || {},
      grammar_clarification:{English:`${x.display}: use ${x.preposition} + ${x.case}.`,German:`${x.display}: mit ${x.preposition} + ${x.case}.`}
    }
  };
}

function renderMenu(){
  ensureShape();
  applyTheme();
  applyAudience();

  $('module-cards').innerHTML=Object.values(MODULES).map(m=>{
    const active = ACTIVE_MODULE_IDS.includes(m.id);
    const count=(DB.modules[m.id]?.items||[]).length;
    const countText = active ? (count ? count + ' items' : 'not loaded yet') : (m.countLabel || 'coming soon');
    return `<div class="module-card ${USER.module===m.id?'on':''} ${active?'is-active':'is-planned'}" data-module="${active?m.id:''}" ${active?'':'aria-disabled="true"'}>
      <div class="mod-top">
        <span class="mod-number">${m.n}</span>
        <span class="mod-status ${active?'active':'planned'}">${active?'Active':'Planned'}</span>
      </div>
      <div class="mod-icon">${h(m.icon)}</div>
      <b>${h(m.title)}</b>
      <p class="tiny">${h(m.subtitle)}</p>
      <p class="tiny count">${h(countText)}</p>
    </div>`;
  }).join('');

  $('quiz-lang').innerHTML = LANGS.map(l=>`<option value="${h(l)}" ${USER.lang===l?'selected':''}>${h(l)}</option>`).join('');
  renderSetSelect();
  renderModeSelect();
  renderSizePills();
  renderStats();
  renderAdmin();
  renderEmptyState();
}
function renderSetSelect(){
  const sel=$('set-select');
  if(USER.module==='vocab'){
    sel.disabled=false;
    const sets=DB.modules.vocab.sets||[];
    sel.innerHTML = `<option value="all">All chapters</option>` + sets.map(s=>`<option value="${h(s)}" ${USER.set===s?'selected':''}>Kapitel ${h(s)}</option>`).join('');
    if(!sets.includes(USER.set) && USER.set!=='all') USER.set='all';
  } else {
    sel.disabled=true;
    sel.innerHTML = `<option value="all">All items</option>`;
    USER.set='all';
  }
}
function renderModeSelect(){
  const modes=MODULES[USER.module]?.engines || [];
  if(!modes.includes(USER.mode)) USER.mode=MODULES[USER.module].defaultMode;
  $('mode-select').innerHTML = modes.map(m=>`<option value="${h(m)}" ${USER.mode===m?'selected':''}>${h(MODE_LABELS[m]||m)}</option>`).join('');
}
function renderSizePills(){ document.querySelectorAll('#size-pills .pill').forEach(p=>p.classList.toggle('on',p.dataset.n===USER.size)); }
function renderStats(){
  const arr=filteredItems();
  const prog=arr.map(srs);
  const attempts=prog.reduce((a,r)=>a+r.correct+r.wrong,0);
  const correct=prog.reduce((a,r)=>a+r.correct,0);
  $('st-items').textContent=arr.length;
  $('st-due').textContent=dueItems().length;
  $('st-weak').textContent=weakItems().length;
  $('st-acc').textContent=attempts?Math.round(correct/attempts*100)+'%':'—';
  if($('st-items-duplicate')) $('st-items-duplicate').textContent=arr.length;
  if($('st-weak-duplicate')) $('st-weak-duplicate').textContent=weakItems().length;
  if($('st-acc-duplicate')) $('st-acc-duplicate').textContent=attempts?Math.round(correct/attempts*100)+'%':'—';
}
function renderEmptyState(){
  const total=Object.values(DB.modules).reduce((a,m)=>a+(m.items||[]).length,0);
  $('empty-state').classList.toggle('on', total===0);
  if(total===0) $('load-status').textContent='No learning files loaded yet. Check folder names or use Admin → Reload files.';
}
function renderAdmin(){
  $('admin-modules').innerHTML=Object.values(MODULES).map(m=>`${h(m.title)}: ${ACTIVE_MODULE_IDS.includes(m.id) ? ((DB.modules[m.id]?.items||[]).length + ' items') : 'planned'}`).join('<br>');
  const v=DB.modules.vocab.items||[];
  const nouns=v.filter(artOf);
  const missingPlural=nouns.filter(x=>!x.data?.grammar?.plural).length;
  $('admin-quality').innerHTML=`Vocabulary items: ${v.length}<br>Nouns: ${nouns.length}<br>Nouns missing full plural: ${missingPlural}<br>Prep verbs: ${DB.modules.prepverbs.items.length}`;
}

function setModule(id){ if(!ACTIVE_MODULE_IDS.includes(id)) return; USER.module=id; USER.mode=MODULES[id].defaultMode; USER.set='all'; save(); renderMenu(); }
function startSession(items=null){
  let pool=items || filteredItems();
  if(USER.mode==='due') pool=dueItems();
  if(USER.mode==='weak') pool=weakItems();
  if(!pool.length){ alert('No items loaded for this module. Check the folder structure or use Admin → Reload files.'); renderEmptyState(); return; }
  const n=USER.size==='all'?pool.length:Math.min(Number(USER.size||10),pool.length);
  const selected=shuffle(pool).slice(0,n);
  const queue=buildSessionQueue(selected);
  Q={queue,originalItems:[...selected],i:0,ok:0,err:0,pts:0,weak:[],streak:0,best:0,cur:null,question:null};
  showScreen('quiz');
  nextQuestion();
}
function buildSessionQueue(items){
  if(USER.module==='prepverbs' && USER.mode==='prep_full'){
    return items.flatMap(item=>[
      {item,qType:'prep_learn'},
      {item,qType:'meaning'},
      {item,qType:'prep_gap'},
      {item,qType:'prep_case'}
    ]);
  }
  return items.map(item=>({item,qType:null}));
}
function restartSession(){ if(Q?.originalItems) startSession(Q.originalItems); }
function startWeakReview(){ const arr=weakItems(); if(!arr.length){alert('No weak items yet.'); return;} startSession(arr); }
function nextQuestion(){ if(Q.i>=Q.queue.length) return finishSession(); const entry=Q.queue[Q.i]; Q.cur=entry.item||entry; Q.question=makeQuestion(Q.cur, entry.qType); renderQuestion(); }
function makeQuestion(item, forcedType=null){ if(forcedType) return {type:forcedType}; return USER.module==='prepverbs' ? prepEngine(item) : vocabEngine(item); }
function vocabEngine(item){
  const mode=USER.mode, c=[];
  if((mode==='full'||mode==='article') && artOf(item)) c.push({type:'article'});
  if(mode==='full'||mode==='meaning') c.push({type:'meaning'});
  if((mode==='full'||mode==='plural') && (item.data?.grammar?.plural || item.data?.grammar?.plural_hint)) c.push({type:'plural'});
  if(mode==='full'||mode==='active') c.push({type:'active'});
  if(mode==='sentence') c.push({type:'sentence'});
  return c[0] || {type:'meaning'};
}
function prepEngine(item){
  if(USER.mode==='prep_full') return {type:'prep_learn'};
  if(USER.mode==='prep_gap') return {type:'prep_gap'};
  if(USER.mode==='prep_case') return {type:'prep_case'};
  if(USER.mode==='prep_meaning') return {type:'meaning'};
  return {type:'prep_learn'};
}
function renderQuestion(){
  const it=Q.cur, q=Q.question;
  $('b-module').textContent=MODULES[USER.module].title;
  $('b-ok').textContent=`${Q.ok} ✓`; $('b-err').textContent=`${Q.err} ✗`; $('b-pts').textContent=`${Q.pts} pts`; $('b-left').textContent=`${Q.queue.length-Q.i} left`;
  const safeMain = displayMainForQuestion(it,q);
  const safeSub = displaySubForQuestion(it,q);
  let out=`<div class="word"><div class="word-art ${artOf(it)||'none'}">${artOf(it)||''}</div><div class="word-main">${h(safeMain)}</div><div class="word-sub">${h(safeSub)}</div></div>`;
  if(q.type==='article') out+=articleView();
  if(q.type==='meaning') out+=meaningView(it);
  if(q.type==='plural') out+=typeView('Plural', 'Type the full plural or source hint');
  if(q.type==='active') out+=typeView('Active recall', 'Type the German word/expression');
  if(q.type==='sentence') out+=sentenceView(it);
  if(q.type==='prep_learn') out+=prepLearnView(it);
  if(q.type==='prep_gap') out+=prepGapView(it);
  if(q.type==='prep_case') out+=typeView('Case recall', `${h(it.lemma || baseOf(it))} ${h(it.preposition)} + ?`);
  $('qcard').innerHTML=out;
  const inp=$('answer-input'); if(inp) setTimeout(()=>inp.focus(),0);
}
function displayMainForQuestion(it,q){
  if(it.module==='prepverbs'){
    if(q.type==='prep_gap') return it.lemma || baseOf(it);
    if(q.type==='prep_case') return it.lemma || baseOf(it);
    if(q.type==='meaning') return it.display || it.lemma || baseOf(it);
    if(q.type==='prep_learn') return it.lemma || baseOf(it);
  }
  return baseOf(it);
}
function displaySubForQuestion(it,q){
  if(it.module==='prepverbs'){
    if(q.type==='prep_gap') return 'fill the missing preposition';
    if(q.type==='prep_case') return 'recall the grammatical case';
    if(q.type==='prep_learn') return 'learn the pattern first';
    return 'prepositional verb';
  }
  return it.notes || it.display || '';
}
function articleView(){ return `<div class="phase">Choose the article</div><div class="artgrid">${['der','die','das','—'].map(a=>`<button class="artbtn ${a}" data-answer="${h(a)}">${h(a)}</button>`).join('')}</div>`; }
function meaningView(it){
  const correct=trOf(it);
  const others=shuffle(moduleItems().filter(x=>x.id!==it.id).map(trOf).filter(x=>x && x!==correct)).slice(0,3);
  return `<div class="phase">Choose the meaning</div><div class="opts">${shuffle([correct,...others]).map((o,i)=>`<button class="opt" data-answer="${h(o)}"><span>${String.fromCharCode(65+i)}</span><b>${h(o)}</b></button>`).join('')}</div>`;
}
function typeView(title,hint){ return `<div class="phase">${h(title)}</div><p class="note" style="text-align:center;margin-bottom:10px">${h(hint)}</p><input class="type-input" id="answer-input"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">Check</button></div>`; }
function sentenceView(it){
  const ex=it.data?.example_de || `Das Lernwort ist ${baseOf(it)}.`;
  const answer=baseOf(it);
  Q.sentenceAnswer=answer;
  const sentence=ex.includes(answer) ? ex.replace(answer,'___') : ex + ' ___';
  return `<div class="phase">Sentence gap</div><div class="gap-sentence">${h(sentence).replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">Check</button></div>`;
}
function prepGapView(it){ return `<div class="phase">Preposition gap</div><div class="gap-sentence">${h(it.gap?.sentence||'').replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input" placeholder="preposition"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">Check</button></div>`; }
function prepLearnView(it){
  const ex = it.example?.de || it.data?.example_de || '';
  const meaning = trOf(it);
  return `<div class="phase">Learn the pattern</div>
    <div class="learn-card">
      <div class="learn-pattern">${h(it.display || ((it.lemma||baseOf(it)) + ' ' + it.preposition + ' + ' + it.case))}</div>
      <div class="learn-meta">Meaning: ${h(meaning)}<br>Preposition: <b>${h(it.preposition)}</b> · Case: <b>${h(it.case)}</b></div>
      ${ex ? `<div class="learn-example">${h(ex)}</div>` : ''}
    </div>
    <div class="row g8" style="justify-content:center;margin-top:14px">
      <button class="btn btn-gold" id="btn-learn-continue" type="button">Continue to practice</button>
    </div>`;
}

function pluralAnswers(it){ const g=it.data?.grammar||{}; return [g.plural,g.plural_hint,derivePlural(it)].filter(Boolean); }
function derivePlural(it){
  const g=it.data?.grammar||{}, b=g.base||baseOf(it), ph=String(g.plural_hint||'');
  if(!ph) return ''; if(ph==='-'||ph==='—') return `die ${b}`; if(!ph.startsWith('-')) return /^(die|der|das)\s/.test(ph)?ph:`die ${ph}`;
  let suffix=ph.slice(1); if(suffix.startsWith('¨')) return `die ${umlaut(b)}${suffix.slice(1)}`; return `die ${b}${suffix}`;
}
function umlaut(s){ const map={a:'ä',o:'ö',u:'ü',A:'Ä',O:'Ö',U:'Ü'}; for(let i=s.length-1;i>=0;i--){ if(map[s[i]]) return s.slice(0,i)+map[s[i]]+s.slice(i+1); } return s; }
function activeAnswers(it){ return [it.word, baseOf(it)].filter(Boolean); }
function expectedAnswers(){
  const it=Q.cur, t=Q.question.type;
  if(t==='article') return [artOf(it)||'—'];
  if(t==='meaning') return [trOf(it)];
  if(t==='plural') return pluralAnswers(it);
  if(t==='active') return activeAnswers(it);
  if(t==='sentence') return [Q.sentenceAnswer];
  if(t==='prep_learn') return ['continue'];
  if(t==='prep_gap') return [it.preposition];
  if(t==='prep_case') return [it.case, it.case==='Akkusativ'?'Akk':'Dat'];
  return [];
}
function answer(value){
  const exp=expectedAnswers();
  const ok=exp.some(x=>norm(x)===norm(value));
  const inp=$('answer-input'); if(inp) inp.classList.add(ok?'ok':'err');
  if(ok){ Q.ok++; Q.pts+=pointsFor(Q.question.type); Q.streak++; Q.best=Math.max(Q.best,Q.streak); }
  else { Q.err++; Q.weak.push(Q.cur); Q.streak=0; }
  record(Q.cur,ok,Q.question.type);
  showFeedback(ok,value,exp);
  if(ok) setTimeout(()=>{ Q.i++; nextQuestion(); },500);
}
function pointsFor(t){ return {article:1,meaning:2,plural:3,active:3,sentence:3,prep_gap:3,prep_case:2}[t]||1; }
function showFeedback(ok,value,exp){
  const box=$('qcard');
  box.insertAdjacentHTML('beforeend',`<div class="feedback ${ok?'ok':'err'}">${ok?'Correct':'Wrong'} · Expected: ${h(exp[0]||'—')}</div>`);
  if(!ok) box.insertAdjacentHTML('beforeend',`<div class="diagnosis">${diagnose(Q.question.type,Q.cur,exp[0],value)}</div><div class="row g8" style="justify-content:center;margin-top:12px"><button class="btn btn-gold" id="btn-continue" type="button">Continue</button></div>`);
}
function diagnose(type,it,exp,got){
  if(type==='plural') return `Plural: learn the full form with article. ${h(it.word||baseOf(it))} → ${h(exp)}.`;
  if(type==='prep_gap') return `${h(it.display)} requires “${h(it.preposition)} + ${h(it.case)}”.`;
  if(type==='prep_case') return `Case recall: ${h(it.display)} uses ${h(it.case)}.`;
  if(type==='article') return `Article mistake: German nouns need gender. Correct: ${h(exp)}.`;
  return `Active recall needs production. Your answer: ${h(got||'—')}.`;
}
function skipQuestion(){ if(!Q) return; Q.err++; Q.weak.push(Q.cur); record(Q.cur,false,Q.question?.type||'skip'); Q.i++; nextQuestion(); }
function continueAfterWrong(){ Q.i++; nextQuestion(); }
function finishSession(){
  const total=Q.ok+Q.err, pct=total?Math.round(Q.ok/total*100):0;
  P.history.push({date:new Date().toLocaleString(),module:USER.module,set:USER.set,mode:USER.mode,ok:Q.ok,err:Q.err,pts:Q.pts,pct});
  save();
  $('sum-score').textContent=pct+'%'; $('sum-sub').textContent=`${MODULES[USER.module].title} · ${MODE_LABELS[USER.mode]}`;
  $('sum-ok').textContent=Q.ok; $('sum-err').textContent=Q.err; $('sum-pts').textContent=Q.pts; $('sum-best').textContent=Q.best;
  $('sum-weak').innerHTML=Q.weak.length?`<div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Meaning</th></tr></thead><tbody>${[...new Map(Q.weak.map(x=>[x.id,x])).values()].map(x=>`<tr><td>${h(x.word||x.display)}</td><td>${h(trOf(x))}</td></tr>`).join('')}</tbody></table></div>`:'';
  showScreen('summary'); renderMenu();
}
function exitQuiz(){ showScreen('menu'); renderMenu(); }
function speakCurrent(){ if(!Q?.cur || !window.speechSynthesis) return; const u=new SpeechSynthesisUtterance(baseOf(Q.cur)); u.lang='de-DE'; speechSynthesis.cancel(); speechSynthesis.speak(u); }
function renderTracker(){
  const rows=Object.entries(P.progress).map(([k,r])=>({k,r}));
  $('tracker-content').innerHTML = `<div class="tbl-wrap"><table><thead><tr><th>Module:item</th><th>Correct</th><th>Wrong</th><th>Box</th><th>Due</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${h(x.k)}</td><td>${x.r.correct}</td><td>${x.r.wrong}</td><td>${x.r.box}</td><td>${x.r.due<=Date.now()?'now':'later'}</td></tr>`).join('')}</tbody></table></div>`;
}
function openResources(){ renderResources(); showScreen('resources'); }
function renderResources(){
  const resources=[['Duden','https://www.duden.de/'],['DWDS','https://www.dwds.de/'],['Verbformen','https://www.verbformen.de/'],['Mein Deutschbuch','https://mein-deutschbuch.de/grammatik.html'],['Schubert Verlag','https://www.schubert-verlag.de/aufgaben/'],['DW Learn German','https://learngerman.dw.com/']];
  $('resource-grid').innerHTML=resources.map(([n,u])=>`<div class="module-card"><b>${h(n)}</b><p class="tiny"><a target="_blank" href="${h(u)}">${h(u)}</a></p></div>`).join('');
}

function bindEvents(){
  $('btn-dark').addEventListener('click',()=>setTheme('dark'));
  $('btn-light').addEventListener('click',()=>setTheme('light'));
  $('btn-system').addEventListener('click',()=>setTheme('system'));
  $('btn-student').addEventListener('click',()=>setAudience('student'));
  $('btn-admin').addEventListener('click',()=>setAudience('admin'));
  $('btn-resources').addEventListener('click',openResources);
  $('btn-start').addEventListener('click',()=>startSession());
  $('btn-weak').addEventListener('click',startWeakReview);
  $('btn-tracker').addEventListener('click',()=>showScreen('tracker'));
  const sideTracker=$('side-tracker'); if(sideTracker) sideTracker.addEventListener('click',()=>showScreen('tracker'));
  const sideDashboard=$('side-dashboard'); if(sideDashboard) sideDashboard.addEventListener('click',()=>showScreen('menu'));
  const sideModules=$('side-modules'); if(sideModules) sideModules.addEventListener('click',()=>showScreen('menu'));
  const sideSettings=$('side-settings'); if(sideSettings) sideSettings.addEventListener('click',()=>setAudience(USER.audience==='admin'?'student':'admin'));
  $('btn-reload').addEventListener('click',reloadAll);
  $('btn-speak').addEventListener('click',speakCurrent);
  $('btn-skip').addEventListener('click',skipQuestion);
  $('btn-exit').addEventListener('click',exitQuiz);
  $('sum-review').addEventListener('click',startWeakReview);
  $('sum-repeat').addEventListener('click',restartSession);
  $('sum-menu').addEventListener('click',()=>showScreen('menu'));
  $('tracker-back').addEventListener('click',()=>showScreen('menu'));
  $('resources-close').addEventListener('click',()=>showScreen('menu'));
  $('quiz-lang').addEventListener('change',e=>{USER.lang=e.target.value;save();renderMenu();});
  $('set-select').addEventListener('change',e=>{USER.set=e.target.value;save();renderMenu();});
  $('mode-select').addEventListener('change',e=>{USER.mode=e.target.value;save();renderMenu();});
  $('module-cards').addEventListener('click',e=>{const c=e.target.closest('[data-module]'); if(c) setModule(c.dataset.module);});
  $('size-pills').addEventListener('click',e=>{const p=e.target.closest('.pill'); if(!p)return; USER.size=p.dataset.n; save(); renderMenu();});
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-answer]');
    if(a) answer(a.dataset.answer);
    if(e.target.id==='btn-check') answer($('answer-input')?.value||'');
    if(e.target.id==='btn-continue') continueAfterWrong();
    if(e.target.id==='btn-learn-continue') continueAfterWrong();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter' && $('answer-input')) answer($('answer-input').value);
  });
}

async function init(){
  try{
    ensureShape();
    bindEvents();
    applyTheme();
    applyAudience();
    renderMenu(); // immediate: fills dropdowns even before fetch finishes
    await reloadAll();
  } catch(err){
    console.error('Initialization failed',err);
    $('load-status').textContent='Initialization error: '+(err?.message||err);
    renderMenu();
  }
}
document.addEventListener('DOMContentLoaded',init);