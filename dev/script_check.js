'use strict';
window.VOKABULAR_BUILD = 'answer-leak-audited-2026-05-29';

const LANGS = ['English','Spanish','French','Japanese','German','Korean','Italian','Chinese','Portuguese','Persian','Arabic','Thai'];

const UI_TEXT = {
  English: {
    subtitle:'Vocabulary · Grammar · Active Recall', nav_dashboard:'Dashboard', nav_modules:'Modules', nav_progress:'Progress', nav_stats:'Statistics', nav_weak:'Weak points', nav_review:'Review', nav_notes:'Notes', nav_settings:'Settings',
    streak:'days in a row', feature_modules:'10+ learning modules', feature_modules_sub:'Grammar and vocabulary training', feature_recall:'Active Recall', feature_recall_sub:'Spaced repetition for retention', feature_tracking:'Progress tracking', feature_tracking_sub:'Accuracy and mastery over time', feature_adaptive:'Adaptive training', feature_adaptive_sub:'Focus sessions for weak points',
    available_modules:'Available modules', quiz_language:'Quiz language', chapter_set:'Chapter / Set', practice_mode:'Practice mode', items_per_session:'Items per session', tracker:'Tracker', start:'Start practising', weak_review:'Weak review',
    all_items:'All items', all_chapters:'All chapters', all:'All', active:'Active', planned:'Planned', not_loaded:'not loaded yet', items:'items', coming_soon:'coming soon',
    progress_details:'Progress details', items_loaded:'items loaded', average_accuracy:'average accuracy', weak_items:'weak items', due_today:'due today', loaded:'loaded', weak:'weak', accuracy:'accuracy',
    admin_tools:'Admin tools', loaded_modules:'Loaded modules', data_quality:'Data quality', resources:'Grammar & dictionaries', close:'Close', back:'Back', skip:'Skip', exit:'Exit', correct:'Correct', wrong:'Wrong', expected:'Expected', continue:'Continue', check:'Check',
    learn_pattern:'Learn the pattern', learn_item:'Learn the item', grammar_practice:'Grammar practice', choose_article:'Choose the article', choose_meaning:'Choose the meaning', plural:'Plural', active_recall:'Active recall', sentence_gap:'Sentence gap', preposition_gap:'Preposition gap', case_recall:'Case recall',
    full_cycle:'Full cycle', article_only:'Article only', meaning_only:'Meaning only', plural_only:'Plural only', sentence_gaps:'Sentence gaps', full_grammar_cycle:'Full grammar cycle', preposition_gaps:'Preposition gaps', full_module_cycle:'Full module cycle', practice_prompt:'Practice prompt',
    no_files:'No learning files are loaded yet.', expected_files:'Expected', same_session:'Same session', review_weak:'Review weak', correct_sum:'correct', points:'points', best_streak:'best streak'
  },
  German: {
    subtitle:'Vokabular · Grammatik · Active Recall', nav_dashboard:'Dashboard', nav_modules:'Module', nav_progress:'Fortschritt', nav_stats:'Statistiken', nav_weak:'Schwächen', nav_review:'Wiederholung', nav_notes:'Notizen', nav_settings:'Einstellungen',
    streak:'Tage in Folge', feature_modules:'10+ Lernmodule', feature_modules_sub:'Grammatik und Wortschatz', feature_recall:'Active Recall', feature_recall_sub:'Wiederholung für langfristiges Behalten', feature_tracking:'Fortschritts-Tracking', feature_tracking_sub:'Genauigkeit und Meisterung im Blick', feature_adaptive:'Adaptives Training', feature_adaptive_sub:'Training für deine Schwächen',
    available_modules:'Verfügbare Module', quiz_language:'Quizsprache', chapter_set:'Kapitel / Set', practice_mode:'Übungsmodus', items_per_session:'Items pro Sitzung', tracker:'Tracker', start:'Übung starten', weak_review:'Schwächen üben',
    all_items:'Alle Items', all_chapters:'Alle Kapitel', all:'Alle', active:'Aktiv', planned:'Geplant', not_loaded:'noch nicht geladen', items:'Items', coming_soon:'kommt bald',
    progress_details:'Fortschrittsdetails', items_loaded:'Items geladen', average_accuracy:'durchschnittliche Genauigkeit', weak_items:'schwache Items', due_today:'heute fällig', loaded:'geladen', weak:'schwach', accuracy:'Genauigkeit',
    admin_tools:'Admin-Werkzeuge', loaded_modules:'Geladene Module', data_quality:'Datenqualität', resources:'Grammatik & Wörterbücher', close:'Schließen', back:'Zurück', skip:'Überspringen', exit:'Beenden', correct:'Richtig', wrong:'Falsch', expected:'Erwartet', continue:'Weiter', check:'Prüfen',
    learn_pattern:'Muster lernen', learn_item:'Item lernen', grammar_practice:'Grammatikübung', choose_article:'Artikel wählen', choose_meaning:'Bedeutung wählen', plural:'Plural', active_recall:'Aktive Erinnerung', sentence_gap:'Satzlücke', preposition_gap:'Präpositionslücke', case_recall:'Kasus erinnern',
    full_cycle:'Vollständiger Zyklus', article_only:'Nur Artikel', meaning_only:'Nur Bedeutung', plural_only:'Nur Plural', sentence_gaps:'Satzlücken', full_grammar_cycle:'Vollständiger Grammatikzyklus', preposition_gaps:'Präpositionslücken', full_module_cycle:'Vollständiger Modulzyklus', practice_prompt:'Prompt üben',
    no_files:'Noch keine Lern-Dateien geladen.', expected_files:'Erwartet', same_session:'Gleiche Sitzung', review_weak:'Schwächen wiederholen', correct_sum:'richtig', points:'Punkte', best_streak:'beste Serie'
  },
  French: {subtitle:'Vocabulaire · Grammaire · Rappel actif', available_modules:'Modules disponibles', quiz_language:'Langue du quiz', chapter_set:'Chapitre / série', practice_mode:'Mode d’entraînement', items_per_session:'Items par session', tracker:'Suivi', start:'Commencer', weak_review:'Réviser les faiblesses', all_items:'Tous les items', all_chapters:'Tous les chapitres', active:'Actif', planned:'Prévu', not_loaded:'pas encore chargé', items:'items', progress_details:'Détails du progrès', items_loaded:'items chargés', average_accuracy:'précision moyenne', weak_items:'items faibles', due_today:'à revoir aujourd’hui', resources:'Grammaire & dictionnaires', correct:'Correct', wrong:'Faux', expected:'Attendu', continue:'Continuer', check:'Vérifier', full_grammar_cycle:'Cycle grammatical complet', full_module_cycle:'Cycle complet du module', practice_prompt:'Exercice ciblé', meaning_only:'Sens seul'},
  Spanish: {subtitle:'Vocabulario · Gramática · Recuerdo activo', available_modules:'Módulos disponibles', quiz_language:'Idioma del quiz', chapter_set:'Capítulo / conjunto', practice_mode:'Modo de práctica', items_per_session:'Items por sesión', tracker:'Seguimiento', start:'Empezar', weak_review:'Repasar débiles', all_items:'Todos los items', all_chapters:'Todos los capítulos', active:'Activo', planned:'Planeado', not_loaded:'no cargado', items:'items', progress_details:'Detalles del progreso', items_loaded:'items cargados', average_accuracy:'precisión media', weak_items:'items débiles', due_today:'para hoy', resources:'Gramática & diccionarios', correct:'Correcto', wrong:'Incorrecto', expected:'Esperado', continue:'Continuar', check:'Comprobar', full_grammar_cycle:'Ciclo gramatical completo', full_module_cycle:'Ciclo completo del módulo', practice_prompt:'Práctica dirigida', meaning_only:'Solo significado'},
  Italian: {subtitle:'Vocabolario · Grammatica · Richiamo attivo', available_modules:'Moduli disponibili', quiz_language:'Lingua del quiz', chapter_set:'Capitolo / set', practice_mode:'Modalità pratica', items_per_session:'Elementi per sessione', tracker:'Tracker', start:'Inizia pratica', weak_review:'Ripasso errori', active:'Attivo', planned:'Pianificato', not_loaded:'non caricato', items:'elementi'},
  Portuguese: {subtitle:'Vocabulário · Gramática · Recordação ativa', available_modules:'Módulos disponíveis', quiz_language:'Idioma do quiz', chapter_set:'Capítulo / conjunto', practice_mode:'Modo de prática', items_per_session:'Itens por sessão', tracker:'Progresso', start:'Começar prática', weak_review:'Rever fracos', active:'Ativo', planned:'Planejado', not_loaded:'não carregado', items:'itens'},
  Chinese: {subtitle:'词汇 · 语法 · 主动回忆', available_modules:'可用模块', quiz_language:'测验语言', chapter_set:'章节 / 集合', practice_mode:'练习模式', items_per_session:'每次项目数', tracker:'进度', start:'开始练习', weak_review:'复习薄弱项', active:'可用', planned:'计划中', not_loaded:'未加载', items:'项'},
  Japanese: {subtitle:'語彙 · 文法 · アクティブリコール', available_modules:'利用可能なモジュール', quiz_language:'クイズ言語', chapter_set:'章 / セット', practice_mode:'練習モード', items_per_session:'1回の項目数', tracker:'進捗', start:'練習開始', weak_review:'弱点復習', active:'有効', planned:'予定', not_loaded:'未読込', items:'項目'},
  Korean: {subtitle:'어휘 · 문법 · 능동 회상', available_modules:'사용 가능한 모듈', quiz_language:'퀴즈 언어', chapter_set:'장 / 세트', practice_mode:'연습 모드', items_per_session:'세션당 항목', tracker:'진도', start:'연습 시작', weak_review:'약점 복습', active:'활성', planned:'예정', not_loaded:'로드 안 됨', items:'항목'},
  Arabic: {subtitle:'مفردات · قواعد · استرجاع نشط', available_modules:'الوحدات المتاحة', quiz_language:'لغة الاختبار', chapter_set:'الفصل / المجموعة', practice_mode:'نمط التدريب', items_per_session:'عناصر في الجلسة', tracker:'المتابعة', start:'ابدأ التدريب', weak_review:'مراجعة الضعف', active:'نشط', planned:'مخطط', not_loaded:'غير محمل', items:'عناصر'},
  Persian: {subtitle:'واژگان · دستور · یادآوری فعال', available_modules:'ماژول‌های موجود', quiz_language:'زبان آزمون', chapter_set:'فصل / مجموعه', practice_mode:'حالت تمرین', items_per_session:'آیتم در هر جلسه', tracker:'پیگیری', start:'شروع تمرین', weak_review:'مرور ضعف‌ها', active:'فعال', planned:'برنامه‌ریزی‌شده', not_loaded:'بارگذاری نشده', items:'آیتم'},
  Thai: {subtitle:'คำศัพท์ · ไวยากรณ์ · Active Recall', available_modules:'โมดูลที่ใช้ได้', quiz_language:'ภาษาแบบทดสอบ', chapter_set:'บท / ชุด', practice_mode:'โหมดฝึก', items_per_session:'จำนวนต่อรอบ', tracker:'ติดตามผล', start:'เริ่มฝึก', weak_review:'ทบทวนจุดอ่อน', active:'ใช้งานได้', planned:'วางแผน', not_loaded:'ยังไม่โหลด', items:'รายการ'}
};
function ui(key){
  const lang = USER.lang || 'English';
  return (UI_TEXT[lang] && UI_TEXT[lang][key]) || UI_TEXT.English[key] || key;
}
function uiModeLabel(mode){
  const map = {full:'full_cycle', article:'article_only', meaning:'meaning_only', plural:'plural_only', active:'active_recall', sentence:'sentence_gaps', prep_full:'full_grammar_cycle', prep_gap:'preposition_gaps', prep_case:'case_recall', prep_meaning:'meaning_only', grammar_full:'full_module_cycle', grammar_prompt:'practice_prompt', grammar_meaning:'meaning_only'};
  return ui(map[mode]) || MODE_LABELS[mode] || mode;
}
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = ui(key);
  });
  document.documentElement.lang = ({German:'de',French:'fr',Spanish:'es',Italian:'it',Portuguese:'pt',Chinese:'zh',Japanese:'ja',Korean:'ko',Arabic:'ar',Persian:'fa',Thai:'th'}[USER.lang] || 'en');
  document.documentElement.dir = (USER.lang === 'Arabic' || USER.lang === 'Persian') ? 'rtl' : 'ltr';
}

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
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  starke_verben: {
    id:'starke_verben',
    n:4,
    title:'Starke Verben',
    subtitle:'irregular · forms · meaning · conjugation',
    icon:'ϟ',
    status:'planned',
    countLabel:'planned',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  trennbare_verben: {
    id:'trennbare_verben',
    n:5,
    title:'Trennbare Verben',
    subtitle:'separable · prefixes · meaning in context',
    icon:'⇄',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  praepositionen: {
    id:'praepositionen',
    n:6,
    title:'Präpositionen',
    subtitle:'prepositions · cases · usage examples',
    icon:'⌖',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  nomen_artikel_plural: {
    id:'nomen_artikel_plural',
    n:7,
    title:'Nomen · Artikel · Plural',
    subtitle:'gender · articles · plurals · endings',
    icon:'A',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  adjektivdeklination: {
    id:'adjektivdeklination',
    n:8,
    title:'Adjektivdeklination',
    subtitle:'declension · strong · weak · mixed',
    icon:'Aa',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  pronomen: {
    id:'pronomen',
    n:9,
    title:'Pronomen',
    subtitle:'personal · reflexive · possessive · demonstrative',
    icon:'○',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  },
  konnektoren_nebensaetze: {
    id:'konnektoren_nebensaetze',
    n:10,
    title:'Konnektoren / Nebensätze',
    subtitle:'subordinating · conjunctions · clause patterns',
    icon:'∞',
    status:'planned',
    countLabel:'coming soon',
    engines:['grammar_full','grammar_prompt','grammar_meaning'],
    defaultMode:'grammar_full'
  }
};
const ACTIVE_MODULE_IDS = ['vocab','prepverbs','kasusergaenzungen','starke_verben','trennbare_verben','praepositionen','nomen_artikel_plural','adjektivdeklination','pronomen','konnektoren_nebensaetze'];
const MODE_LABELS = {
  full:'Full cycle', article:'Article only', meaning:'Meaning only', plural:'Plural only', active:'Active recall', sentence:'Sentence gaps',
  prep_full:'Full grammar cycle', prep_gap:'Preposition gaps', prep_case:'Case recall', prep_meaning:'Meaning only', grammar_full:'Full module cycle', grammar_prompt:'Practice prompt', grammar_meaning:'Meaning only'
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
  ['kasusergaenzungen','starke_verben','trennbare_verben','praepositionen','nomen_artikel_plural','adjektivdeklination','pronomen','konnektoren_nebensaetze'].forEach(id=>{
    DB.modules[id] = DB.modules[id] || {items:[],sets:['all']};
  });
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
  await loadGenericGrammarModules();
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

async function loadGenericGrammarModules(){
  const files = {
    kasusergaenzungen:'kasusergaenzungen.json',
    starke_verben:'starke_verben.json',
    trennbare_verben:'trennbare_verben.json',
    praepositionen:'praepositionen.json',
    nomen_artikel_plural:'nomen_artikel_plural.json',
    adjektivdeklination:'adjektivdeklination.json',
    pronomen:'pronomen.json',
    konnektoren_nebensaetze:'konnektoren_nebensaetze.json'
  };
  for(const [id, file] of Object.entries(files)){
    const url = `grammatik/${file}`;
    try{
      const r = await fetch(url,{cache:'no-store'});
      if(!r.ok){ DB.modules[id] = {items:[],sets:['all']}; continue; }
      const j = await r.json();
      DB.modules[id] = {items:(j.items||[]).map(x=>normalizeGenericGrammar(x,id)),sets:['all']};
    } catch(e){
      console.warn('Could not load',url,e);
      DB.modules[id] = {items:[],sets:['all']};
    }
  }
}
function normalizeGenericGrammar(x,moduleId){
  return {
    ...x,
    module: moduleId,
    set: 'all',
    id: x.id || `${moduleId}_${Math.random().toString(36).slice(2)}`,
    word: x.display || x.prompt || x.answer,
    data: {
      translations: x.meaning || {},
      grammar: {type:x.type || 'grammar_item', case:x.case || '', answer:x.answer || ''},
      example_de: x.example?.de || '',
      example_translated: x.example || {},
      grammar_clarification: {English:`${x.display || x.prompt}: ${x.case || 'grammar pattern'}`, German:`${x.display || x.prompt}: ${x.case || 'Grammatikmuster'}`}
    }
  };
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
    const countText = active ? (count ? count + ' items' : 'not loaded yet') : (count ? count + ' items' : 'not loaded yet');
    return `<div class="module-card ${USER.module===m.id?'on':''} ${active?'is-active':'is-planned'}" data-module="${active?m.id:''}" ${active?'':'aria-disabled="true"'}>
      <div class="mod-top">
        <span class="mod-number">${m.n}</span>
        <span class="mod-status ${active?'active':'planned'}">${ui('active')}</span>
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
  applyI18n();
}
function renderSetSelect(){
  const sel=$('set-select');
  if(USER.module==='vocab'){
    sel.disabled=false;
    const sets=DB.modules.vocab.sets||[];
    sel.innerHTML = `<option value="all">${ui('all_chapters')}</option>` + sets.map(s=>`<option value="${h(s)}" ${USER.set===s?'selected':''}>Kapitel ${h(s)}</option>`).join('');
    if(!sets.includes(USER.set) && USER.set!=='all') USER.set='all';
  } else {
    sel.disabled=true;
    sel.innerHTML = `<option value="all">${ui('all_items')}</option>`;
    USER.set='all';
  }
}
function renderModeSelect(){
  const modes=MODULES[USER.module]?.engines || [];
  if(!modes.includes(USER.mode)) USER.mode=MODULES[USER.module].defaultMode;
  $('mode-select').innerHTML = modes.map(m=>`<option value="${h(m)}" ${USER.mode===m?'selected':''}>${h(uiModeLabel(m))}</option>`).join('');
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

function auditQuestionLeak(item, qType){
  const fakeQ = {type:qType};
  const expected = qType === 'article' ? [artOf(item)||''] :
                   qType === 'plural' ? pluralAnswers(item) :
                   qType === 'prep_gap' ? [item.preposition||''] :
                   qType === 'prep_case' ? [item.case||''] :
                   qType === 'grammar_prompt' ? [item.answer||''] : [];
  const visible = [
    displayArticleForQuestion(item,fakeQ).text,
    displayMainForQuestion(item,fakeQ),
    displaySubForQuestion(item,fakeQ)
  ].join(' | ');
  return expected.filter(Boolean).some(ans => norm(ans) && norm(visible).includes(norm(ans)));
}
function runLeakAudit(){
  const leaks = [];
  (DB.modules.vocab?.items||[]).forEach(it=>{
    if(artOf(it) && auditQuestionLeak(it,'article')) leaks.push({module:'vocab',id:it.id,type:'article'});
    if((it.data?.grammar?.plural || it.data?.grammar?.plural_hint) && auditQuestionLeak(it,'plural')) leaks.push({module:'vocab',id:it.id,type:'plural'});
  });
  (DB.modules.prepverbs?.items||[]).forEach(it=>{
    if(auditQuestionLeak(it,'prep_gap')) leaks.push({module:'prepverbs',id:it.id,type:'prep_gap'});
  });
  Object.entries(DB.modules||{}).forEach(([mid,mod])=>{
    if(mid==='vocab'||mid==='prepverbs') return;
    (mod.items||[]).forEach(it=>{
      if(auditQuestionLeak(it,'grammar_prompt')) leaks.push({module:mid,id:it.id,type:'grammar_prompt'});
    });
  });
  return leaks;
}

function renderAdmin(){
  $('admin-modules').innerHTML=Object.values(MODULES).map(m=>`${h(m.title)}: ${ACTIVE_MODULE_IDS.includes(m.id) ? ((DB.modules[m.id]?.items||[]).length + ' items') : 'planned'}`).join('<br>');
  const v=DB.modules.vocab.items||[];
  const nouns=v.filter(artOf);
  const missingPlural=nouns.filter(x=>!x.data?.grammar?.plural).length;
  const leaks = runLeakAudit();
  $('admin-quality').innerHTML=`Vocabulary items: ${v.length}<br>Nouns: ${nouns.length}<br>Nouns missing full plural: ${missingPlural}<br>Prep verbs: ${DB.modules.prepverbs.items.length}<br>Answer-leak audit: ${leaks.length} issue(s)`;
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
  if(USER.module!=='vocab' && USER.module!=='prepverbs' && USER.mode==='grammar_full'){
    return items.flatMap(item=>[
      {item,qType:'grammar_learn'},
      {item,qType:'meaning'},
      {item,qType:'grammar_prompt'}
    ]);
  }
  return items.map(item=>({item,qType:null}));
}
function restartSession(){ if(Q?.originalItems) startSession(Q.originalItems); }
function startWeakReview(){ const arr=weakItems(); if(!arr.length){alert('No weak items yet.'); return;} startSession(arr); }
function nextQuestion(){ if(Q.i>=Q.queue.length) return finishSession(); const entry=Q.queue[Q.i]; Q.cur=entry.item||entry; Q.question=makeQuestion(Q.cur, entry.qType); renderQuestion(); }
function makeQuestion(item, forcedType=null){ if(forcedType) return {type:forcedType}; if(USER.module==='prepverbs') return prepEngine(item); if(USER.module!=='vocab') return genericGrammarEngine(item); return vocabEngine(item); }
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

function genericGrammarEngine(item){
  if(USER.mode==='grammar_prompt'||USER.mode==='grammar_full') return {type:'grammar_prompt'};
  if(USER.mode==='grammar_meaning') return {type:'meaning'};
  return {type:'grammar_prompt'};
}

function renderQuestion(){
  const it=Q.cur, q=Q.question;
  $('b-module').textContent=MODULES[USER.module].title;
  $('b-ok').textContent=`${Q.ok} ✓`; $('b-err').textContent=`${Q.err} ✗`; $('b-pts').textContent=`${Q.pts} pts`; $('b-left').textContent=`${Q.queue.length-Q.i} left`;
  const safeMain = displayMainForQuestion(it,q);
  const safeSub = displaySubForQuestion(it,q);
  const art = displayArticleForQuestion(it,q);
  let out=`<div class="word"><div class="word-art ${art.css}">${h(art.text)}</div><div class="word-main">${h(safeMain)}</div><div class="word-sub">${h(safeSub)}</div></div>`;
  if(q.type==='article') out+=articleView();
  if(q.type==='meaning') out+=meaningView(it);
  if(q.type==='plural') out+=typeView(ui('plural'), 'Type the full plural or source hint');
  if(q.type==='active') out+=typeView(ui('active_recall'), 'Type the German word/expression');
  if(q.type==='sentence') out+=sentenceView(it);
  if(q.type==='prep_learn') out+=prepLearnView(it);
  if(q.type==='grammar_learn') out+=genericLearnView(it);
  if(q.type==='prep_gap') out+=prepGapView(it);
  if(q.type==='prep_case') out+=typeView(ui('case_recall'), `${h(it.lemma || baseOf(it))} ${h(it.preposition)} + ?`);
  if(q.type==='grammar_prompt') out+=genericPromptView(it);
  $('qcard').innerHTML=out;
  const inp=$('answer-input'); if(inp) setTimeout(()=>inp.focus(),0);
}
function displayArticleForQuestion(it,q){
  if(q.type==='article') return {text:'?', css:'none'};
  if(q.type==='plural') return {text:'', css:'none'};
  const a = artOf(it);
  return {text:a || '', css:a || 'none'};
}
function displayMainForQuestion(it,q){
  if(it.module==='prepverbs'){
    if(q.type==='prep_gap') return it.lemma || 'Präpositionalverb';
    if(q.type==='prep_case') return it.lemma || 'Präpositionalverb';
    if(q.type==='meaning') return it.display || it.lemma || baseOf(it);
    if(q.type==='prep_learn') return it.lemma || baseOf(it);
  }
  if(it.module && it.module!=='vocab'){
    if(q.type==='grammar_prompt') return modulePublicTitle(it.module);
    if(q.type==='grammar_learn') return modulePublicTitle(it.module);
    if(q.type==='meaning') return it.display || modulePublicTitle(it.module);
    return modulePublicTitle(it.module);
  }
  if(q.type==='article') return baseOf(it);
  if(q.type==='plural') return singularWithoutArticle(it);
  if(q.type==='active') return trOf(it);
  if(q.type==='sentence') return modulePublicTitle('vocab');
  return baseOf(it);
}
function singularWithoutArticle(it){
  const g = it.data?.grammar || {};
  return g.base || baseOf(it);
}
function modulePublicTitle(id){
  return (MODULES[id] && MODULES[id].title) || 'Grammar module';
}
function displaySubForQuestion(it,q){
  if(it.module==='prepverbs'){
    if(q.type==='prep_gap') return 'fill the missing preposition';
    if(q.type==='prep_case') return 'recall the grammatical case';
    if(q.type==='prep_learn') return 'learn the pattern first';
    return 'prepositional verb';
  }
  if(it.module && it.module!=='vocab'){
    if(q.type==='grammar_prompt') return it.case || 'answer without seeing the pattern';
    if(q.type==='grammar_learn') return 'learn first, then practise';
    return it.case || it.type || 'grammar practice';
  }
  return it.notes || it.display || '';
}
function articleView(){ return `<div class="phase">${h(ui('choose_article'))}</div><div class="artgrid">${['der','die','das','—'].map(a=>`<button class="artbtn ${a}" data-answer="${h(a)}">${h(a)}</button>`).join('')}</div>`; }
function meaningView(it){
  const correct=trOf(it);
  const others=shuffle(moduleItems().filter(x=>x.id!==it.id).map(trOf).filter(x=>x && x!==correct)).slice(0,3);
  return `<div class="phase">${h(ui('choose_meaning'))}</div><div class="opts">${shuffle([correct,...others]).map((o,i)=>`<button class="opt" data-answer="${h(o)}"><span>${String.fromCharCode(65+i)}</span><b>${h(o)}</b></button>`).join('')}</div>`;
}
function typeView(title,hint){ return `<div class="phase">${h(title)}</div><p class="note" style="text-align:center;margin-bottom:10px">${h(hint)}</p><input class="type-input" id="answer-input"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">${h(ui('check'))}</button></div>`; }
function sentenceView(it){
  const ex=it.data?.example_de || `Das Lernwort ist ${baseOf(it)}.`;
  const answer=baseOf(it);
  Q.sentenceAnswer=answer;
  const sentence=ex.includes(answer) ? ex.replace(answer,'___') : ex + ' ___';
  return `<div class="phase">${h(ui('sentence_gap'))}</div><div class="gap-sentence">${h(sentence).replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">${h(ui('check'))}</button></div>`;
}
function prepGapView(it){ return `<div class="phase">${h(ui('preposition_gap'))}</div><div class="gap-sentence">${h(it.gap?.sentence||'').replace('___','<span class="gap-blank">___</span>')}</div><input class="type-input" id="answer-input" placeholder="preposition"><div class="row g8" style="justify-content:center;margin-top:10px"><button class="btn btn-gold" id="btn-check" type="button">${h(ui('check'))}</button></div>`; }
function prepLearnView(it){
  const ex = it.example?.de || it.data?.example_de || '';
  const meaning = trOf(it);
  return `<div class="phase">${h(ui('learn_pattern'))}</div>
    <div class="learn-card">
      <div class="learn-pattern">${h(it.display || ((it.lemma||baseOf(it)) + ' ' + it.preposition + ' + ' + it.case))}</div>
      <div class="learn-meta">Meaning: ${h(meaning)}<br>Preposition: <b>${h(it.preposition)}</b> · Case: <b>${h(it.case)}</b></div>
      ${ex ? `<div class="learn-example">${h(ex)}</div>` : ''}
    </div>
    <div class="row g8" style="justify-content:center;margin-top:14px">
      <button class="btn btn-gold" id="btn-learn-continue" type="button">${h(ui('continue'))}</button>
    </div>`;
}


function genericLearnView(it){
  const ex = it.example?.de || it.data?.example_de || '';
  const meaning = trOf(it);
  return `<div class="phase">${h(ui('learn_item'))}</div>
    <div class="learn-card">
      <div class="learn-pattern">${h(it.display || baseOf(it))}</div>
      <div class="learn-meta">Meaning: ${h(meaning)}${it.case ? `<br>Focus: <b>${h(it.case)}</b>` : ''}</div>
      ${ex ? `<div class="learn-example">${h(ex)}</div>` : ''}
    </div>
    <div class="row g8" style="justify-content:center;margin-top:14px">
      <button class="btn btn-gold" id="btn-learn-continue" type="button">${h(ui('continue'))}</button>
    </div>`;
}
function genericPromptView(it){
  return `<div class="phase">${h(ui('grammar_practice'))}</div>
    <div class="gap-sentence">${h(it.prompt || it.display || '').replace('___','<span class="gap-blank">___</span>')}</div>
    <input class="type-input" id="answer-input" placeholder="type your answer">
    <div class="row g8" style="justify-content:center;margin-top:10px">
      <button class="btn btn-gold" id="btn-check" type="button">${h(ui('check'))}</button>
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
  if(t==='grammar_learn') return ['continue'];
  if(t==='grammar_prompt') return [it.answer];
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
  if(type==='grammar_prompt') return `Pattern practice: expected “${h(exp)}”. ${it.case ? 'Focus: '+h(it.case)+'.' : ''}`;
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