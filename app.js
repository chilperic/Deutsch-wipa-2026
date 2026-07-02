const APP_VERSION = '2026.07.02-v25.0.0-functional-responsive-trainer';
const APP_BUILD = 'v25.0.0-functional-responsive-trainer';
const $ = id => document.getElementById(id);

const LANGS = [['de','Deutsch'],['en','English'],['fr','Français']];
const APPEARANCES = [['system','System'],['light','Light'],['dark','Dark']];
const COLORS = [['teal','Teal'],['forest','Forest'],['ocean','Ocean'],['sunset','Sunset'],['lavender','Lavender'],['rose','Rose'],['sand','Sand'],['graphite','Graphite'],['midnight','Midnight'],['highcontrast','High contrast']];

const SKILL_KEYS = ['vocabulary','article_plural','prepositions','connectors','word_order','register','grammar','production','beruf'];
const SESSION_TEMPLATES = {
  b1_beruf: {
    id:'b1_beruf', level:'B1', length:10,
    title:{de:'B1 Beruf · 10 Minuten',en:'B1 work · 10 minutes',fr:'B1 travail · 10 minutes'},
    goal:{de:'Wortschatz, Artikel/Plural, Präpositionen und höfliche Standardsätze.',en:'Vocabulary, articles/plurals, prepositions and polite workplace sentences.',fr:'Vocabulaire, articles/pluriels, prépositions et phrases professionnelles polies.'},
    quota:['vocabulary','article/plural','preposition','production','vocabulary','article/plural','word order','preposition','production','review']
  },
  b2_beruf: {
    id:'b2_beruf', level:'B2', length:12,
    title:{de:'B2 Beruf · Produktion',en:'B2 work · production',fr:'B2 travail · production'},
    goal:{de:'Satzbau, Register, indirekte Fragen, Redemittel und längere Antworten.',en:'Word order, register, indirect questions, phrases and longer answers.',fr:'Ordre des mots, registre, questions indirectes, expressions et réponses plus longues.'},
    quota:['production','word order','grammar','production','preposition','connectors','review','production','grammar','register','vocabulary','review']
  },
  application: {
    id:'application', level:'B1/B2', length:10,
    title:{de:'Bewerbung & HR',en:'Applications & HR',fr:'Candidature & RH'},
    goal:{de:'Bewerbung, Lebenslauf, Rückmeldung, Vorstellungsgespräch.',en:'Applications, CVs, feedback and interviews.',fr:'Candidature, CV, retour et entretien.'},
    quota:['production','vocabulary','register','word order','production','preposition','review','production','grammar','vocabulary'],
    include:['bewerbung','lebenslauf','vorstellung','rückmeldung','stelle','interview','hr']
  },
  complaint: {
    id:'complaint', level:'B1/B2', length:10,
    title:{de:'Reklamation & Problem melden',en:'Complaints & problem reports',fr:'Réclamation & signalement'},
    goal:{de:'Sachlich reklamieren, Problem beschreiben, Lösung verlangen.',en:'Complain factually, describe problems, request solutions.',fr:'Réclamer factuellement, décrire le problème, demander une solution.'},
    quota:['production','vocabulary','preposition','production','register','word order','review','production','grammar','vocabulary'],
    include:['reklamation','problem','fehler','technisch','gerät','lösung','defekt']
  },
  bureaucracy: {
    id:'bureaucracy', level:'B1/B2', length:10,
    title:{de:'Amt, Jobcenter, Ausländerbehörde',en:'Authorities, job center, immigration office',fr:'Administration, Jobcenter, étrangers'},
    goal:{de:'Termine, Unterlagen, Fristen und höfliche Nachfragen.',en:'Appointments, documents, deadlines and polite follow-ups.',fr:'Rendez-vous, documents, délais et demandes polies.'},
    quota:['production','vocabulary','article/plural','preposition','production','review','word order','register','grammar','production'],
    include:['termin','unterlagen','frist','bescheid','amt','jobcenter','ausländerbehörde','antrag']
  }
};

const I18N = {
  de: {
    learnRoute:'Training', conjugatorRoute:'Verben', mistakesRoute:'Wiederholen', resourcesRoute:'Ressourcen',
    brandSub:'B1 → B2 · adaptiver Beruf-Trainer', pathLabel:'Lernpfad', pathQuestion:'Was ist heute fällig?',
    profile:'Profil', namePlaceholder:'Dein Name', localSave:'Fortschritt wird lokal gespeichert.', design:'Design', color:'Farbe', backup:'Backup', export:'Export', import:'Import',
    module:'Modul', session:'Trainer', answers:'Antworten', mistakes:'Fehler', topic:'Thema', options:'Optionen',
    ready:'Bereit?', startText:'Starte eine aktive Sitzung. Erst erinnern, dann prüfen.', start:'Training starten', check:'Prüfen', next:'Weiter', repeat:'Nochmal versuchen', hint:'Hinweis', why:'Warum diese Übung?',
    practice:'Aktiv', solution:'Lernhilfe', review:'Fällig', rule:'Diagnose', example:'Modell', translate:'Übersetzen', speak:'Vorlesen', previous:'Vorherige Frage', skip:'Überspringen',
    noItems:'Keine qualitätsgeprüften Items in diesem Modul.', correct:'Richtig.', almost:'Fast richtig.', wrong:'Noch nicht korrekt.', answerPlaceholder:'Antwort eingeben…',
    item:'Übung', items:'Übungen', verified:'geprüft', completion:'Sitzung abgeschlossen',
    mistakesTitle:'Review', mistakesEmpty:'Noch keine fälligen Wiederholungen. Fehler und schwierige Items erscheinen hier automatisch.', clearMistakes:'Review leeren',
    resourcesTitle:'Ressourcen', resourcesDesc:'Nützliche Seiten zum Prüfen von Grammatik, Wörtern, Beispielen und Verbformen.',
    conjugatorTitle:'Verben prüfen', conjugatorDesc:'Nutze externe Verbtabellen und trainiere danach die passenden Übungen im Trainer.',
    learnFeedback:'Regel lesen, Antwort selbst produzieren, danach vergleichen. Lösung ansehen zählt nicht als Übung.',
    supportLangNote:'Zielsprache ist Deutsch. Englisch/Französisch sind nur Stützen.',
    smartTitle:'Heute trainieren', smartSubtitle:'Eine kurze, abwechslungsreiche Sitzung mit Wiederholung, Wortschatz, Grammatik und Schreiben.', smartStart:'Training starten', due:'fällig', weakness:'Schwerpunkt', exact:'exakt', fuzzy:'nah genug', partial:'teilweise', score:'Treffer', noDue:'nichts fällig',
    learnerModel:'Fortschritt', weakest:'Fokus', sessionPlan:'Ablauf', template:'Format', diagnosis:'Diagnose', nextFocus:'Nächster Fokus'
  },
  en: {
    learnRoute:'Training', conjugatorRoute:'Conjugator', mistakesRoute:'Wiederholen', resourcesRoute:'Resources',
    brandSub:'B1 → B2 · adaptive work trainer', pathLabel:'Learning path', pathQuestion:'What is due today?',
    profile:'Profile', namePlaceholder:'Your name', localSave:'Progress is saved locally.', design:'Design', color:'Color', backup:'Backup', export:'Export', import:'Import',
    module:'Module', session:'Trainer', answers:'answers', mistakes:'mistakes', topic:'Topic', options:'Options',
    ready:'Ready?', startText:'Start an active session. Recall first, check second.', start:'Start training', check:'Check', next:'Next', repeat:'Try again', hint:'Hint', why:'Why this exercise?',
    practice:'Active', solution:'Guided', review:'Due', rule:'Diagnosis', example:'Model', translate:'Translate', speak:'Read aloud', previous:'Previous question', skip:'Skip',
    noItems:'No quality-gated items in this module.', correct:'Correct.', almost:'Almost correct.', wrong:'Not correct yet.', answerPlaceholder:'Enter answer…',
    item:'exercise', items:'exercises', verified:'checked', completion:'Session complete',
    mistakesTitle:'Review', mistakesEmpty:'No due reviews yet. Wrong and difficult items will appear here automatically.', clearMistakes:'Clear review',
    resourcesTitle:'Resources', resourcesDesc:'External references for independent checking. Do not trust blindly: compare examples.',
    conjugatorTitle:'Check verbs', conjugatorDesc:'Use external verb tables, then practise the related exercises in the trainer.',
    learnFeedback:'Read the rule, produce your own answer, then compare. Looking at the solution is not practice.',
    supportLangNote:'German is the target language. English/French are support only.',
    smartTitle:'Train today', smartSubtitle:'A short mixed session with review, vocabulary, grammar and writing.', smartStart:'Start training', due:'due', weakness:'focus', exact:'exact', fuzzy:'close enough', partial:'partial', score:'score', noDue:'nothing due',
    learnerModel:'Progress', weakest:'Focus', sessionPlan:'Plan', template:'Format', diagnosis:'Diagnosis', nextFocus:'Next focus'
  },
  fr: {
    learnRoute:'Training', conjugatorRoute:'Conjugueur', mistakesRoute:'Révision', resourcesRoute:'Ressources',
    brandSub:'B1 → B2 · trainer professionnel adaptatif', pathLabel:'Parcours', pathQuestion:'Qu’est-ce qui est dû aujourd’hui ?',
    profile:'Profil', namePlaceholder:'Ton nom', localSave:'La progression est enregistrée localement.', design:'Design', color:'Couleur', backup:'Sauvegarde', export:'Exporter', import:'Importer',
    module:'Module', session:'Trainer', answers:'réponses', mistakes:'erreurs', topic:'Thème', options:'Options',
    ready:'Prêt ?', startText:'Commence une séance active. Rappel d’abord, vérification ensuite.', start:'Commencer', check:'Vérifier', next:'Suivant', repeat:'Réessayer', hint:'Indice', why:'Pourquoi cet exercice ?',
    practice:'Actif', solution:'Guidé', review:'À revoir', rule:'Diagnostic', example:'Modèle', translate:'Traduire', speak:'Lire', previous:'Question précédente', skip:'Passer',
    noItems:'Aucun item contrôlé dans ce module.', correct:'Correct.', almost:'Presque correct.', wrong:'Pas encore correct.', answerPlaceholder:'Saisir la réponse…',
    item:'exercice', items:'exercices', verified:'vérifié', completion:'Session terminée',
    mistakesTitle:'Révision', mistakesEmpty:'Aucune révision due. Les erreurs et items difficiles apparaissent ici automatiquement.', clearMistakes:'Effacer',
    resourcesTitle:'Ressources', resourcesDesc:'Références externes pour vérifier soi-même. Ne pas faire confiance aveuglément : comparer les exemples.',
    conjugatorTitle:'Vérifier les verbes', conjugatorDesc:'Utilise des tableaux externes, puis entraîne les exercices correspondants.',
    learnFeedback:'Lis la règle, produis ta réponse, puis compare. Voir la solution ne compte pas comme exercice.',
    supportLangNote:'La langue cible est l’allemand. Anglais/français seulement comme aide.',
    smartTitle:'S’entraîner aujourd’hui', smartSubtitle:'Séance randomisée adaptative : révisions dues, faiblesses, nouveauté et production.', smartStart:'Démarrer adaptatif', due:'dû', weakness:'focus', exact:'exact', fuzzy:'assez proche', partial:'partiel', score:'score', noDue:'rien dû',
    learnerModel:'Modèle apprenant', weakest:'Compétences faibles', sessionPlan:'Plan de séance', template:'Format', diagnosis:'Diagnostic', nextFocus:'Prochain focus'
  }
};

function defaultLearner(){
  const skills={};
  for(const k of SKILL_KEYS) skills[k]={attempts:0,correct:0,partial:0,score:0.5,lastSeen:null};
  return {version:APP_BUILD,skills,recentItems:[],recentTypes:[],sessions:[]};
}

const state = {
  data:null, itemMap:new Map(), route:'learn', path:'trainer', moduleId:'scenario_trainer_b1_b2', index:0, started:false, checked:false, selectedChoice:'', mode:'practice', hintLevel:0, trainerMode:'module', pool:[], lastEval:null, sessionLog:[], sessionMeta:null, sessionSummary:null,
  stats:load('dw_v25_stats', load('dw_v21_stats',{answered:0,correct:0,partial:0,sessions:0})),
  mistakes:load('dw_v25_mistakes', load('dw_v21_mistakes',[])),
  reviews:load('dw_v25_reviews', load('dw_v21_reviews',{})),
  learner:load('dw_v25_learner', defaultLearner()),
  profile:load('dw_v25_profile', load('dw_v21_profile',{name:''})),
  lang: ['de','en','fr'].includes(localStorage.dw_v25_lang || localStorage.dw_v21_lang) ? (localStorage.dw_v25_lang || localStorage.dw_v21_lang) : 'de',
  appearance: localStorage.dw_appearance || 'system', color: localStorage.dw_color || 'teal'
};

function load(k,f){try{return JSON.parse(localStorage.getItem(k)) ?? f}catch{return f}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function t(k){return I18N[state.lang]?.[k] || I18N.en[k] || k}
function L(obj){ if(obj == null) return ''; if(typeof obj === 'string') return obj; return obj[state.lang] || obj.en || obj.de || Object.values(obj)[0] || ''; }
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function norm(s=''){return String(s).trim().toLowerCase().normalize('NFC').replace(/[„“”]/g,'"').replace(/[.!?;,。؟]+$/g,'').replace(/\s+/g,' ')}
function tokenize(s=''){return norm(s).replace(/[.,!?;:()"“”„]/g,' ').split(/\s+/).filter(Boolean)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function todayKey(){return new Date().toISOString().slice(0,10)}
function dueDate(days){const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10)}
function isDue(r){return !r?.nextDue || r.nextDue <= todayKey()}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function seededShuffle(arr, seed=todayKey()){let x=[...arr], h=2166136261; for(const ch of seed) h=(h^ch.charCodeAt(0))*16777619>>>0; for(let i=x.length-1;i>0;i--){h=(h*1664525+1013904223)>>>0; const j=h%(i+1); [x[i],x[j]]=[x[j],x[i]];} return x}

async function init(){
  applyDesign(false);
  await clearOldCachesAndServiceWorkers();
  state.data = await fetchCoreData();
  state.data.modules.forEach(m => (m.items||[]).forEach(it => state.itemMap.set(it.id, {...it, moduleId:m.id, path:m.path, moduleTitle:L(m.title)})));
  ensureLearnerModel();
  bind(); renderStaticText(); renderLangs(); renderDesignControls(); selectPath('trainer'); route('learn'); renderAll();
}

async function fetchCoreData(){
  const res = await fetch(`data/core_v25.json?v=${encodeURIComponent(APP_BUILD)}`, {cache:'no-store'});
  if(!res.ok) throw new Error('Die Lerninhalte konnten nicht geladen werden. Prüfe, ob data/core_v25.json vorhanden ist.');
  const data = await res.json();
  const problems = validateData(data);
  if(problems.length){ console.error('Blocking content validation failed:', problems); throw new Error(`Content validation failed: ${problems[0]}`); }
  return data;
}
async function clearOldCachesAndServiceWorkers(){
  try{ if('serviceWorker' in navigator){ const regs=await navigator.serviceWorker.getRegistrations(); await Promise.all(regs.map(r=>r.unregister().catch(()=>{}))); }
    if('caches' in window){ const keys=await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k).catch(()=>{}))); }
  }catch(e){console.warn('Cache cleanup skipped',e)}
}
function validateData(data){
  const issues=[]; const seen=new Set();
  if(!data || !Array.isArray(data.paths) || !Array.isArray(data.modules)) issues.push('Missing paths/modules arrays.');
  if(!Array.isArray(data.supportLanguages) || data.supportLanguages.join(',') !== 'en,fr') issues.push('supportLanguages must be en,fr.');
  const moduleIds = new Set((data.modules||[]).map(m=>m.id));
  for(const p of data.paths||[]) for(const mid of p.modules||[]) if(!moduleIds.has(mid)) issues.push(`Path ${p.id} references missing module ${mid}.`);
  for(const m of data.modules||[]){
    if(!m.id || !m.path || !Array.isArray(m.items)) issues.push(`Invalid module shell ${m.id||'unknown'}.`);
    if((m.items||[]).length < 6) issues.push(`Module ${m.id} has too few items.`);
    for(const item of m.items||[]){
      if(!item.id) issues.push(`${m.id}: item without id.`);
      if(seen.has(item.id)) issues.push(`Duplicate item id ${item.id}.`); seen.add(item.id);
      const key = `${item.type}|${item.prompt||item.german||item.singular}|${item.answer?.en||item.answer||''}`;
      if(seen.has(`pair:${key}`)) issues.push(`Duplicate learning pair ${item.id}.`); seen.add(`pair:${key}`);
      if(!item.example_de) issues.push(`${item.id}: missing German example.`);
      if(!item.feedback || !item.feedback.de) issues.push(`${item.id}: missing diagnostic German feedback.`);
      if(item.type === 'gap_fill'){
        if(!String(item.prompt||'').includes('___')) issues.push(`${item.id}: gap_fill without ___.`);
        if(!item.answer) issues.push(`${item.id}: gap_fill missing answer.`);
      }
      if(item.type === 'multiple_choice'){
        if(!Array.isArray(item.choices) || !item.choices.includes(item.answer)) issues.push(`${item.id}: multiple_choice must include answer.`);
      }
      if(item.type === 'vocabulary_choice'){
        for(const lang of data.supportLanguages||[]){
          if(!item.answer?.[lang]) issues.push(`${item.id}: missing ${lang} answer.`);
          if(!Array.isArray(item.choices?.[lang]) || !item.choices[lang].includes(item.answer[lang])) issues.push(`${item.id}: ${lang} choices must include answer.`);
        }
      }
      if(item.type === 'article_plural'){
        if(!/^(der|die|das)\s/.test(item.singular||'')) issues.push(`${item.id}: singular must include article.`);
        if(!/^die\s/.test(item.answer||'')) issues.push(`${item.id}: plural answer must start with die.`);
      }
    }
  }
  return issues;
}

function bind(){
  $('languageSelect').onchange=e=>{state.lang=e.target.value;localStorage.dw_v25_lang=state.lang;renderAll();};
  $('sidebarAppearanceSelect').onchange=e=>setAppearance(e.target.value);
  $('sidebarColorSelect').onchange=e=>setColor(e.target.value);
  document.querySelectorAll('.top-tab').forEach(b=>b.onclick=()=>route(b.dataset.route));
  $('profileName').value = state.profile.name || '';
  $('profileName').oninput=e=>{state.profile.name=e.target.value;save('dw_v25_profile',state.profile);$('profileSaveStatus').textContent=t('localSave')};
  $('moduleSelect').onchange=e=>{state.trainerMode='module';state.moduleId=e.target.value;resetSession();renderAll();};
  $('mobilePathSelect').onchange=e=>selectPath(e.target.value);
  $('mobileModuleSelect').onchange=e=>{state.trainerMode='module';state.moduleId=e.target.value;resetSession();renderAll();};
  $('primaryAction').onclick=primary; $('secondaryAction').onclick=next; $('hintAction').onclick=showHint; $('whyAction').onclick=showWhy;
  $('prevButton').onclick=prev; $('skipButton').onclick=next; $('translateButton').onclick=toggleTranslation; $('speakButton').onclick=speakCurrent;
  $('modePractice').onclick=()=>setMode('practice'); $('modeLearn').onclick=()=>setMode('learn'); $('modeReview').onclick=()=>setMode('review');
  $('clearMistakes').onclick=()=>{state.mistakes=[];state.reviews={};state.learner=defaultLearner();save('dw_v25_mistakes',state.mistakes);save('dw_v25_reviews',state.reviews);save('dw_v25_learner',state.learner);renderMistakes();renderStats();renderQuickStart();};
  $('verbPracticeButton').onclick=()=>selectPath('prepositions'); if($('verbSearch')) $('verbSearch').oninput=()=>renderConjugatorNotice();
  $('mobileMenu')?.addEventListener('click',()=>document.body.classList.toggle('drawer-open'));
  $('mobileOpenSidebar')?.addEventListener('click',()=>document.body.classList.add('drawer-open'));
  $('backdrop')?.addEventListener('click',()=>document.body.classList.remove('drawer-open'));
  $('exportProgress').onclick=exportProgress; $('importProgress').onchange=importProgress;
}
function renderStaticText(){
  document.documentElement.lang = state.lang; document.documentElement.dir = 'ltr';
  document.querySelector('.brand-subtitle').textContent = t('brandSub');
  const tabs = {learn:t('learnRoute'),conjugator:t('conjugatorRoute'),mistakes:t('mistakesRoute'),resources:t('resourcesRoute')};
  document.querySelectorAll('.top-tab').forEach(b=>b.textContent=tabs[b.dataset.route]||b.dataset.route);
  const head = document.querySelector('.sidebar-head'); if(head){head.querySelector('.eyebrow').textContent=t('pathLabel'); head.querySelector('h3').textContent=t('pathQuestion');}
  document.querySelector('label[for="profileName"]').textContent=t('profile'); $('profileName').placeholder=t('namePlaceholder'); $('profileSaveStatus').textContent=t('localSave');
  document.querySelector('label[for="sidebarAppearanceSelect"]').textContent=t('design'); document.querySelector('label[for="sidebarColorSelect"]').textContent=t('color');
  document.querySelector('.backup-details summary').textContent=t('backup'); $('exportProgress').textContent=t('export'); document.querySelector('label[for="importProgress"]').textContent=t('import');
  document.querySelector('label[for="moduleSelect"]').textContent=t('module'); document.querySelector('.mobile-control-panel label:first-child span').textContent=t('topic'); document.querySelector('.mobile-control-panel label:nth-child(2) span').textContent=t('module'); $('mobileOpenSidebar').textContent=t('options');
  $('progressLabel').textContent=t('session'); $('prevButton').title=t('previous'); $('prevButton').setAttribute('aria-label',t('previous')); $('skipButton').title=t('skip'); $('skipButton').setAttribute('aria-label',t('skip')); $('speakButton').title=t('speak'); $('speakButton').setAttribute('aria-label',t('speak')); $('translateButton').title=t('translate'); $('translateButton').setAttribute('aria-label',t('translate'));
  document.querySelectorAll('.learn-panel .eyebrow')[0].textContent=t('rule'); document.querySelectorAll('.learn-panel .eyebrow')[1].textContent=t('example');
  $('modePractice').textContent=t('practice'); $('modeLearn').textContent=t('solution'); $('modeReview').textContent=t('review'); $('clearMistakes').textContent=t('clearMistakes'); $('hintAction').textContent=t('hint'); $('whyAction').textContent=t('why');
}
function renderLangs(){ $('languageSelect').innerHTML = LANGS.map(([c,n])=>`<option value="${c}" ${c===state.lang?'selected':''}>${n}</option>`).join(''); }
function renderDesignControls(){ $('sidebarAppearanceSelect').innerHTML = APPEARANCES.map(([c,n])=>`<option value="${c}" ${c===state.appearance?'selected':''}>${n}</option>`).join(''); $('sidebarColorSelect').innerHTML = COLORS.map(([c,n])=>`<option value="${c}" ${c===state.color?'selected':''}>${n}</option>`).join(''); }
function resolvedAppearance(){return state.appearance==='system' ? (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light') : state.appearance}
function applyDesign(){document.documentElement.dataset.appearance=resolvedAppearance();document.documentElement.dataset.color=state.color;document.documentElement.dataset.theme=resolvedAppearance();}
function setAppearance(v){state.appearance=v;localStorage.dw_appearance=v;applyDesign();renderDesignControls();}
function setColor(v){state.color=v;localStorage.dw_color=v;applyDesign();renderDesignControls();}

function route(r){state.route=r;document.querySelectorAll('.top-tab').forEach(b=>b.classList.toggle('active',b.dataset.route===r));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));$(r+'View')?.classList.add('active-view');renderAll();}
function selectPath(id){state.path=id; const p=state.data.paths.find(x=>x.id===id)||state.data.paths[0]; state.moduleId=p.modules[0]; state.trainerMode='module'; resetSession(); renderAll();}
function resetSession(){state.index=0;state.started=false;state.checked=false;state.selectedChoice='';state.hintLevel=0;state.lastEval=null;state.pool=[];state.sessionLog=[];state.sessionMeta=null;state.sessionSummary=null;$('translationBox')?.classList.add('hidden');$('feedbackBox')?.classList.add('hidden');$('hintAction')?.classList.add('hidden');$('whyAction')?.classList.add('hidden');}
function currentModule(){return state.data.modules.find(m=>m.id===state.moduleId) || state.data.modules[0];}
function allItems(){return state.data.modules.flatMap(m => (m.items||[]).map(it => ({...it,moduleId:m.id,path:m.path,moduleTitle:L(m.title)})));}
function dueItems(){return Object.values(state.reviews).filter(isDue).map(r=>state.itemMap.get(r.itemId)).filter(Boolean)}
function currentPool(){ if(state.mode==='review') return dueItems(); if(state.pool.length) return state.pool; return currentModule().items; }
function current(){const pool=currentPool(); return pool[state.index % Math.max(pool.length,1)];}
function categorise(item){ if(!item) return 'vocabulary'; if(item.type==='article_plural') return 'article/plural'; if(item.path==='prepositions') return 'preposition'; if(item.path==='connectors') return 'word order'; if(item.type==='active_recall') return (isRegisterItem(item)?'register':'production'); if(item.path==='grammar') return 'grammar'; if(item.type==='vocabulary_choice') return 'vocabulary'; return item.path || item.type; }
function skillKeysForItem(item){ const cat=categorise(item); const keys=[]; if(cat==='vocabulary') keys.push('vocabulary','beruf'); if(cat==='article/plural') keys.push('article_plural'); if(cat==='preposition') keys.push('prepositions','grammar'); if(cat==='word order') keys.push('connectors','word_order'); if(cat==='grammar') keys.push('grammar'); if(cat==='register') keys.push('register','production','beruf'); if(cat==='production') keys.push('production','beruf'); if(!keys.length) keys.push('beruf'); return [...new Set(keys)]; }
function isRegisterItem(item){ const text=((item.prompt||'')+' '+(item.answer||'')+' '+JSON.stringify(item.feedback||{})).toLowerCase(); return /höflich|formell|bitte|könnten|würde|sie\b|e-mail|bewerbung|termin|rückmeldung|entschuldigung/.test(text); }
function ensureLearnerModel(){ if(!state.learner || !state.learner.skills) state.learner=defaultLearner(); for(const k of SKILL_KEYS) state.learner.skills[k] ||= {attempts:0,correct:0,partial:0,score:0.5,lastSeen:null}; state.learner.recentItems ||= []; state.learner.recentTypes ||= []; state.learner.sessions ||= []; save('dw_v25_learner',state.learner); }
function skillScore(k){return state.learner.skills?.[k]?.score ?? 0.5}
function weakestSkills(n=3){ return SKILL_KEYS.map(k=>[k,skillScore(k)]).sort((a,b)=>a[1]-b[1]).slice(0,n); }
function weakness(){ const weak = weakestSkills(1)[0]?.[0]; const map={article_plural:'article/plural',prepositions:'preposition',word_order:'word order',connectors:'word order',register:'register',production:'production',grammar:'grammar',vocabulary:'vocabulary',beruf:'production'}; return map[weak] || 'production'; }
function templateForCategory(template, category){ return template.quota.filter(x=>x===category).length; }
function itemMatchesTemplate(item, template){ if(!template.include?.length) return true; const text=((item.prompt||'')+' '+(item.german||'')+' '+(item.answer?.de||item.answer?.en||item.answer||'')+' '+(item.example_de||'')+' '+(item.tags||[]).join(' ')).toLowerCase(); return template.include.some(s=>text.includes(s)); }
function scoreCandidate(item, context){
  const review=state.reviews[item.id]||{}; const cat=categorise(item); const skills=skillKeysForItem(item); const recent=new Set((state.learner.recentItems||[]).slice(0,14));
  let score=1 + Math.random()*0.9;
  if(isDue(review)) score += review.itemId ? 5 : 0;
  score += (review.wrongCount||0) * 1.35;
  score += (review.status==='learning'||review.status==='relearn') ? 2.25 : 0;
  score += skills.reduce((s,k)=>s+(1-skillScore(k))*2.8,0)/Math.max(skills.length,1);
  if(cat===context.targetCategory) score += 4.8;
  if(context.template.level==='B2' && (cat==='production'||cat==='register'||cat==='word order'||cat==='grammar')) score += 1.1;
  if(itemMatchesTemplate(item, context.template)) score += 1.3; else if(context.template.include?.length) score -= 2.1;
  if(!review.itemId) score += 0.45;
  if(recent.has(item.id)) score -= 9;
  if(context.typeHistory.slice(-2).every(x=>x===item.type)) score -= 5;
  if(context.catHistory.slice(-2).every(x=>x===cat)) score -= 4;
  return Math.max(0.05, score);
}
function weightedChoice(candidates, context){
  const scored=candidates.map(item=>({item,score:scoreCandidate(item,context)})).sort((a,b)=>b.score-a.score);
  const filtered=scored.filter(x=>x.score>0.2).slice(0,18);
  const total=filtered.reduce((s,x)=>s+x.score,0);
  let r=Math.random()*total;
  for(const x of filtered){ r-=x.score; if(r<=0) return x; }
  return filtered[0] || scored[0];
}
function candidatesForSlot(items, category, template, chosen){
  const chosenIds=new Set(chosen.map(x=>x.id));
  let candidates = items.filter(it=>!chosenIds.has(it.id));
  if(category==='review'){
    const dueSet=new Set(dueItems().map(x=>x.id));
    candidates = candidates.filter(it=>dueSet.has(it.id));
    if(!candidates.length) candidates = items.filter(it=>!chosenIds.has(it.id));
  } else {
    const exact = candidates.filter(it=>categorise(it)===category && itemMatchesTemplate(it,template));
    const relaxed = candidates.filter(it=>categorise(it)===category);
    candidates = exact.length ? exact : (relaxed.length ? relaxed : candidates.filter(it=>itemMatchesTemplate(it,template)));
  }
  return candidates.length ? candidates : items.filter(it=>!chosenIds.has(it.id));
}
function buildAdaptiveSession(templateId='b1_beruf'){
  const template = SESSION_TEMPLATES[templateId] || SESSION_TEMPLATES.b1_beruf;
  const items = allItems(); const chosen=[]; const decisions=[]; const typeHistory=[]; const catHistory=[];
  const plan = [...template.quota];
  while(plan.length < template.length) plan.push(weakness());
  for(let i=0;i<template.length;i++){
    const targetCategory=plan[i] || weakness();
    const context={template,targetCategory,typeHistory,catHistory};
    const scored=weightedChoice(candidatesForSlot(items,targetCategory,template,chosen), context);
    if(!scored?.item) continue;
    const item=scored.item; chosen.push(item); typeHistory.push(item.type); catHistory.push(categorise(item));
    decisions.push({itemId:item.id,slot:i+1,targetCategory,category:categorise(item),score:scored.score,reason:reasonForItem(item,targetCategory,template,scored.score)});
  }
  return {items:chosen,decisions,template};
}
function reasonForItem(item,targetCategory,template,score){
  const review=state.reviews[item.id]||{};
  const skills=skillKeysForItem(item).map(skillLabel).join(' + ');
  const parts=[];
  if(review.itemId && isDue(review)) parts.push('Diese Übung ist zur Wiederholung fällig.');
  if(categorise(item)===targetCategory) parts.push(`Sie trainiert ${categoryLabel(targetCategory)}.`);
  if(itemMatchesTemplate(item,template)) parts.push(`Sie passt zum Format „${L(template.title)}“.`);
  if(skills) parts.push(`Fokus: ${skills}.`);
  return parts.join(' ');
}
function buildSmartSession(){ return buildAdaptiveSession('b1_beruf').items; }
function startSmartSession(){ startAdaptiveSession('b1_beruf'); }
function startAdaptiveSession(templateId='b1_beruf'){
  const built=buildAdaptiveSession(templateId); state.mode='practice'; state.trainerMode='adaptive'; state.pool=built.items; state.sessionMeta={templateId,template:built.template,decisions:built.decisions,startedAt:new Date().toISOString()}; state.sessionLog=[]; state.sessionSummary=null; state.index=0; state.started=true; state.checked=false; state.hintLevel=0; state.selectedChoice=''; state.stats.sessions += 1; save('dw_v25_stats',state.stats); document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active')); $('modePractice').classList.add('active'); renderAll(); }
function startDueReview(){ state.mode='review'; state.trainerMode='review'; state.pool=[]; state.index=0; state.started=true; state.checked=false; state.sessionSummary=null; document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active')); $('modeReview').classList.add('active'); renderAll(); }
function renderAll(){ if(!state.data) return; renderStaticText(); renderLangs(); renderPaths(); renderModuleSelect(); renderQuickStart(); renderExercise(); renderStats(); renderMistakes(); renderResources(); renderConjugatorNotice(); updateHeroCollapse(); }
function renderPaths(){
  $('pathNav').innerHTML = state.data.paths.map(p=>`<button class="path-chip ${p.id===state.path?'active':''}" data-path="${p.id}"><strong>${esc(L(p.title))}</strong><span>${esc(L(p.sub))}</span></button>`).join('');
  $('pathNav').querySelectorAll('button').forEach(b=>b.onclick=()=>selectPath(b.dataset.path));
  $('mobilePathSelect').innerHTML = state.data.paths.map(p=>`<option value="${p.id}" ${p.id===state.path?'selected':''}>${esc(L(p.title))}</option>`).join('');
}
function renderModuleSelect(){
  const path = state.data.paths.find(p=>p.id===state.path) || state.data.paths[0];
  const modules = state.data.modules.filter(m=>path.modules.includes(m.id));
  if(!modules.some(m=>m.id===state.moduleId)) state.moduleId = modules[0]?.id;
  const opts = modules.map(m=>`<option value="${m.id}" ${m.id===state.moduleId?'selected':''}>${esc(L(m.title))}</option>`).join('');
  $('moduleSelect').innerHTML = opts; $('mobileModuleSelect').innerHTML = opts; $('conjugationControls').classList.add('hidden');
}
function skillLabel(k){
  const map={vocabulary:'Wortschatz',article_plural:'Artikel/Plural',prepositions:'Präpositionen',connectors:'Konnektoren',word_order:'Satzbau',register:'Stil',grammar:'Grammatik',production:'Schreiben/Sprechen',beruf:'Beruf'};
  return map[k] || k;
}
function categoryLabel(k){
  const map={'vocabulary':'Wortschatz','article/plural':'Artikel/Plural','preposition':'Präpositionen','word order':'Satzbau','register':'höflicher Stil','production':'Schreiben/Sprechen','grammar':'Grammatik'};
  return map[k] || skillLabel(k);
}
function renderQuickStart(){
  const panel=$('quickStartPanel'); if(!panel || state.route!=='learn') return;
  const due=dueItems().length, weak=weakness();
  const weakList=weakestSkills(3).map(([k,v])=>`${skillLabel(k)} ${Math.round(v*100)}%`).join(' · ');
  const total=allItems().length, prod=allItems().filter(x=>x.type==='active_recall').length;
  const buttons=Object.values(SESSION_TEMPLATES).map(tm=>`<button class="template-card" data-template="${tm.id}" type="button"><span>${esc(tm.level)}</span><strong>${esc(L(tm.title))}</strong><small>${esc(L(tm.goal))}</small></button>`).join('');
  panel.innerHTML = `<div class="trainer-head"><div class="eyebrow">${esc(t('smartTitle'))}</div><h2>${esc(t('smartStart'))}</h2><p>${esc(t('smartSubtitle'))}</p><div class="trainer-metrics"><span>${due ? due + ' ' + esc(t('due')) : esc(t('noDue'))}</span><span>${esc(t('weakness'))}: ${esc(categoryLabel(weak))}</span><span>${prod} Schreib-/Sprechübungen</span><span>${total} Übungen</span></div><div class="learner-strip"><strong>${esc(t('learnerModel'))}</strong><span>${esc(t('weakest'))}: ${esc(weakList)}</span></div></div><div class="trainer-actions"><div class="template-grid">${buttons}</div><button id="dueStart" class="ghost" type="button">${due?due+' '+t('due')+' wiederholen':t('noDue')}</button><div class="qs-tiles">${quickTile('trainer','B1/B2','Situationen')} ${quickTile('vocabulary','Wort','Wortschatz')} ${quickTile('articles','der/die/das','Plural')} ${quickTile('communication','Sätze','Produktion')}</div></div>`;
  panel.querySelectorAll('[data-template]').forEach(b=>b.onclick=()=>startAdaptiveSession(b.dataset.template));
  $('dueStart').onclick=startDueReview;
  panel.querySelectorAll('[data-path]').forEach(b=>b.onclick=()=>selectPath(b.dataset.path));
}
function quickTile(id,k,label){const active=state.path===id?'active':''; return `<button class="quick-card ${active}" data-path="${id}" type="button"><span>${esc(k)}</span><strong>${esc(label)}</strong></button>`}
function renderExercise(){
  $('primaryAction').onclick=primary;
  const module = currentModule(); const pool = currentPool(); const item = current();
  const path = state.data.paths.find(p=>p.id===module.path) || state.data.paths.find(p=>p.id===state.path);
  $('currentPathLabel').textContent = state.trainerMode==='adaptive' ? 'Adaptive Session' : (state.trainerMode==='smart' ? 'Smart Session' : (L(path?.title)||''));
  $('moduleTitle').textContent = state.trainerMode==='adaptive' ? L(state.sessionMeta?.template?.title) : (state.trainerMode==='smart' ? t('smartStart') : L(module.title));
  $('moduleDescription').textContent = state.trainerMode==='adaptive' ? L(state.sessionMeta?.template?.goal) : (state.trainerMode==='smart' ? t('smartSubtitle') : L(module.description));
  $('moduleCount').textContent = `${pool.length} ${pool.length===1?t('item'):t('items')} · ${t('verified')}`; $('levelBadge').textContent = state.sessionMeta?.template?.level || module.level || 'B1/B2'; $('exercisePill').textContent = state.mode==='review'?t('review'):t('practice');
  $('itemIndex').textContent = pool.length ? `${Math.min(state.index+1,pool.length)} / ${pool.length}` : '—'; $('cardProgressBar').style.width = pool.length ? `${Math.round((state.index)/pool.length*100)}%` : '0%';
  $('choiceZone').innerHTML=''; $('answerZone').innerHTML=''; $('translationBox').classList.add('hidden'); $('hintAction').classList.add('hidden'); $('whyAction').classList.add('hidden');
  if(state.sessionSummary){ renderCompletion(); return; }
  if(!pool.length || !item){ $('questionTitle').textContent = state.mode==='review' ? t('noDue') : t('noItems'); $('questionText').textContent=''; $('ruleBox').textContent=t('supportLangNote'); $('exampleBox').textContent='—'; $('primaryAction').textContent=t('start'); $('secondaryAction').classList.add('hidden'); return; }
  if(!state.started){ $('questionTitle').textContent=t('ready'); $('questionText').textContent=t('startText'); $('ruleBox').textContent=t('supportLangNote'); $('exampleBox').textContent='—'; $('primaryAction').textContent=t('start'); $('secondaryAction').classList.add('hidden'); $('feedbackBox').classList.add('hidden'); return; }
  $('questionTitle').textContent = questionTitle(item); $('questionText').innerHTML = questionText(item); $('ruleBox').textContent = L(item.feedback) || t('learnFeedback'); $('exampleBox').textContent = state.mode==='learn' ? hintFor(item,1) : '—';
  renderInput(item);
  $('primaryAction').textContent = state.checked ? t('repeat') : t('check'); $('secondaryAction').textContent = t('next'); $('secondaryAction').classList.toggle('hidden', !state.checked); $('hintAction').classList.toggle('hidden', state.checked || state.mode==='review'); $('whyAction').classList.toggle('hidden', state.trainerMode!=='adaptive');
}
function renderCompletion(){
  const s=state.sessionSummary; const pct=Math.round(s.meanScore*100); const rows=s.skills.map(([k,v])=>`<li><span>${esc(k)}</span><b>${Math.round(v*100)}%</b></li>`).join('');
  $('questionTitle').textContent=t('completion');
  $('questionText').innerHTML = `<div class="completion-card"><h3>${esc(t('diagnosis'))}: ${pct}%</h3><p>${s.correct}/${s.total} correct · ${s.partial} partial · ${s.wrong} wrong</p><ul class="skill-summary">${rows}</ul><p><b>${esc(t('nextFocus'))}:</b> ${esc(s.nextFocus.join(' · '))}</p></div>`;
  $('ruleBox').textContent = `${t('sessionPlan')}: ${s.categories.join(' → ')}`;
  $('exampleBox').textContent = s.recommendation;
  $('primaryAction').textContent=t('smartStart'); $('secondaryAction').classList.add('hidden'); $('hintAction').classList.add('hidden'); $('whyAction').classList.add('hidden'); $('feedbackBox').classList.add('hidden');
}
function questionTitle(item){ const map={vocabulary_choice:'Deutsch → Bedeutung', article_plural:'Plural bilden', gap_fill:'Lücke ergänzen', multiple_choice:'Auswahl prüfen', active_recall:'Aktiv produzieren'}; return map[item.type] || t('practice'); }
function questionText(item){ if(item.type==='vocabulary_choice') return `<strong>${esc(item.german)}</strong>`; if(item.type==='article_plural') return `Schreibe den Plural mit Artikel:<br><strong>${esc(item.singular)}</strong>`; if(item.type==='gap_fill') return esc(item.prompt).replace('___','<mark>___</mark>'); if(item.type==='multiple_choice') return esc(item.prompt); return esc(item.prompt||item.german||''); }
function renderInput(item){
  if(item.type==='vocabulary_choice'){ const choices = shuffle(item.choices[state.lang] || item.choices.en); $('choiceZone').innerHTML = choices.map(c=>`<button class="choice ${state.selectedChoice===c?'selected':''}" data-choice="${esc(c)}">${esc(c)}</button>`).join(''); $('choiceZone').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.selectedChoice=b.dataset.choice;renderExercise();}); }
  else if(item.type==='multiple_choice'){ $('choiceZone').innerHTML = item.choices.map(c=>`<button class="choice ${state.selectedChoice===c?'selected':''}" data-choice="${esc(c)}">${esc(c)}</button>`).join(''); $('choiceZone').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.selectedChoice=b.dataset.choice;renderExercise();}); }
  else{ $('answerZone').innerHTML = `<input id="answerInput" class="answer-input input" type="text" autocomplete="off" placeholder="${esc(t('answerPlaceholder'))}">`; $('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter')primary();}); setTimeout(()=>$('answerInput')?.focus(),0); }
}
function primary(){ if(state.sessionSummary){startAdaptiveSession(state.sessionMeta?.templateId || 'b1_beruf');return;} if(!state.started){state.started=true;state.checked=false;if(state.trainerMode==='module')state.stats.sessions+=1;save('dw_v25_stats',state.stats);renderExercise();return;} if(state.checked){state.checked=false;renderExercise();return;} checkAnswer(); }
function levenshtein(a,b){ const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0)); for(let i=0;i<=m;i++)dp[i][0]=i; for(let j=0;j<=n;j++)dp[0][j]=j; for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return dp[m][n]; }
function similarity(a,b){ a=norm(a); b=norm(b); const max=Math.max(a.length,b.length,1); return 1 - levenshtein(a,b)/max; }
function keyTokens(s){ const stop=new Set('ich du er sie es wir ihr der die das den dem des ein eine einen einem einer und oder aber denn weil dass ob zu im in am an auf für mit von bitte sie mir mich dir sich ist bin sind war kann können könnte könnten würde wäre habe hat haben werde werden nicht noch schon heute morgen gestern sehr'.toLowerCase().split(/\s+/)); return tokenize(s).filter(x=>!stop.has(x)); }
function inferErrorTags(item,given,ev){
  const tags=[]; const cat=categorise(item); const text=norm(given);
  if(cat==='vocabulary') tags.push('meaning');
  if(cat==='article/plural') tags.push('article_plural');
  if(cat==='preposition') tags.push('preposition_case');
  if(cat==='word order') tags.push('verb_position');
  if(cat==='grammar') tags.push('grammar_form');
  if((cat==='register'||isRegisterItem(item)) && !/bitte|könnt|würde|sie|ihnen|entschuldig/.test(text)) tags.push('register_politeness');
  if(item.type==='active_recall' && keyTokens(given).length < Math.min(4,keyTokens(String(ev.expected||'')).length)) tags.push('too_short');
  if(!tags.length) tags.push(ev.partial?'partial_meaning':'unclear');
  return [...new Set(tags)];
}
function evaluateAnswer(item,given){
  let expected=item.answer, ok=false, partial=false, score=0, label=t('exact'), detail='';
  if(item.type==='vocabulary_choice'){ expected=item.answer[state.lang] || item.answer.en; ok=given===expected; score=ok?1:0; }
  else if(item.type==='multiple_choice'){ expected=item.answer; ok=given===expected; score=ok?1:0; }
  else{
    const acceptable=item.acceptable||[item.answer]; ok=acceptable.map(norm).includes(norm(given));
    if(ok){score=1;} else if(item.type==='active_recall'){
      const sims=acceptable.map(a=>similarity(given,a)); const sim=Math.max(...sims);
      const target=keyTokens(expected); const got=new Set(keyTokens(given)); const overlap=target.length?target.filter(x=>got.has(x)).length/target.length:0;
      const lengthRatio=Math.min(1, keyTokens(given).length/Math.max(keyTokens(expected).length,1));
      score=Math.max(sim, overlap*0.92, lengthRatio*0.55); ok=score>=0.88; partial=!ok && score>=0.62; label=ok?t('fuzzy'):(partial?t('partial'):'low'); detail=`${t('score')}: ${Math.round(score*100)}% · key words: ${target.filter(x=>got.has(x)).length}/${target.length}`;
    } else { score=acceptable.map(a=>similarity(given,a)).reduce((a,b)=>Math.max(a,b),0); partial=!ok && score>=0.78; label=partial?t('partial'):'low'; detail=`${t('score')}: ${Math.round(score*100)}%`; }
  }
  const errorTags = ok ? [] : inferErrorTags(item,given,{expected,partial});
  return {ok, partial, score, label, detail, expected, errorTags};
}
function checkAnswer(){
  const item=current(); if(!item)return; let given='';
  if(item.type==='vocabulary_choice' || item.type==='multiple_choice') given=state.selectedChoice; else given=$('answerInput')?.value || '';
  const ev=evaluateAnswer(item,given); state.lastEval=ev; state.checked=true; state.stats.answered += 1; if(ev.ok)state.stats.correct += 1; else if(ev.partial)state.stats.partial += 1;
  updateReview(item, ev.ok, ev.partial); updateLearnerModel(item, ev); logSessionAttempt(item,given,ev);
  if(!ev.ok){ state.mistakes.unshift({ts:new Date().toISOString(),module:state.moduleId,item,given,expected:ev.expected,partial:ev.partial,score:ev.score,errorTags:ev.errorTags}); state.mistakes=state.mistakes.slice(0,160); save('dw_v25_mistakes',state.mistakes); }
  save('dw_v25_stats',state.stats);
  const box=$('feedbackBox'); box.className = `feedback ${ev.ok?'ok':(ev.partial?'almost':'bad')}`;
  const head=ev.ok?t('correct'):(ev.partial?t('almost'):t('wrong'));
  const tags=ev.errorTags?.length?`<div class="feedback-diagnosis"><b>${esc(t('diagnosis'))}:</b> ${ev.errorTags.map(esc).join(' · ')}</div>`:'';
  box.innerHTML = `<strong>${esc(head)}</strong> <span class="feedback-score">${esc(ev.label)} ${Math.round(ev.score*100)}%</span><br>${esc(L(item.feedback))}${ev.detail?`<div class="feedback-diagnosis">${esc(ev.detail)}</div>`:''}${tags}<div class="solution-line"><b>${esc(t('solution'))}:</b> ${esc(ev.expected)}</div>`;
  revealChoiceSolution(item, ev.expected); renderStats(); renderMistakes(); renderQuickStart();
}
function updateLearnerModel(item, ev){
  ensureLearnerModel(); const value=ev.ok?1:(ev.partial?0.55:0); const now=new Date().toISOString();
  for(const k of skillKeysForItem(item)){
    const s=state.learner.skills[k]; s.attempts=(s.attempts||0)+1; s.correct=(s.correct||0)+(ev.ok?1:0); s.partial=(s.partial||0)+(ev.partial?1:0); s.score=clamp((s.score ?? 0.5)*0.72 + value*0.28, 0, 1); s.lastSeen=now;
  }
  state.learner.recentItems=[item.id, ...(state.learner.recentItems||[]).filter(x=>x!==item.id)].slice(0,40);
  state.learner.recentTypes=[item.type, ...(state.learner.recentTypes||[])].slice(0,20);
  save('dw_v25_learner',state.learner);
}
function logSessionAttempt(item,given,ev){
  if(state.trainerMode!=='adaptive') return;
  const decision=state.sessionMeta?.decisions?.[state.index] || {};
  state.sessionLog[state.index]={itemId:item.id,type:item.type,category:categorise(item),skills:skillKeysForItem(item),given,ok:ev.ok,partial:ev.partial,score:ev.score,errorTags:ev.errorTags||[],reason:decision.reason||''};
}
function updateReview(item, ok, partial){
  const old=state.reviews[item.id] || {itemId:item.id,wrongCount:0,correctCount:0,status:'new'};
  if(ok){ old.correctCount=(old.correctCount||0)+1; const days=[1,3,7,21,45][Math.min(old.correctCount-1,4)]; old.nextDue=dueDate(days); old.status=old.correctCount>=4?'mastered':'review'; }
  else { old.wrongCount=(old.wrongCount||0)+1; if(partial) old.correctCount=Math.max(0,(old.correctCount||0)); else old.correctCount=0; old.nextDue=dueDate(partial?1:0); old.status=partial?'learning':'relearn'; }
  old.lastSeen=new Date().toISOString(); old.category=categorise(item); state.reviews[item.id]=old; save('dw_v25_reviews',state.reviews);
}
function revealChoiceSolution(item, expected){ if(item.type==='vocabulary_choice' || item.type==='multiple_choice') $('choiceZone').querySelectorAll('button').forEach(b=>{b.classList.toggle('correct', b.dataset.choice===expected);}); }
function hintFor(item,level){ const raw=(typeof item.answer==='object' ? (item.answer[state.lang]||item.answer.en) : item.answer) || ''; const ans=String(raw); if(level<=1) return L(item.feedback) || t('learnFeedback'); if(level===2){ const first=ans.split(/\s+/)[0] || ''; return `Start: ${first} …`; } return ans.replace(/[A-Za-zÄÖÜäöüß]{3,}/g, w=>w[0]+'…'); }
function showHint(){ const item=current(); if(!item)return; state.hintLevel=Math.min(3,state.hintLevel+1); const box=$('feedbackBox'); box.className='feedback hint'; box.innerHTML=`<strong>${esc(t('hint'))} ${state.hintLevel}/3</strong><br>${esc(hintFor(item,state.hintLevel))}`; }
function showWhy(){ const item=current(); if(!item)return; const decision=state.sessionMeta?.decisions?.[state.index]; const box=$('feedbackBox'); box.className='feedback hint'; box.innerHTML=`<strong>${esc(t('why'))}</strong><br>${esc(decision?.reason || reasonForItem(item,categorise(item),state.sessionMeta?.template || SESSION_TEMPLATES.b1_beruf,1))}`; }
function buildSessionSummary(){
  const total=state.sessionLog.filter(Boolean).length || 1; const correct=state.sessionLog.filter(x=>x?.ok).length; const partial=state.sessionLog.filter(x=>x?.partial).length; const wrong=total-correct-partial;
  const meanScore=state.sessionLog.filter(Boolean).reduce((s,x)=>s+(x.score||0),0)/total; const cats=state.sessionLog.filter(Boolean).map(x=>x.category);
  const nextFocus=weakestSkills(3).map(([k])=>k); const skillRows=weakestSkills(5);
  const recommendation = `Repeat ${nextFocus[0]} before adding new material. Next session should include production plus one review slot.`;
  return {total,correct,partial,wrong,meanScore,categories:cats,skills:skillRows,nextFocus,recommendation};
}
function finishAdaptiveSession(){
  state.sessionSummary=buildSessionSummary(); state.started=false; state.checked=false; state.selectedChoice='';
  state.learner.sessions.unshift({ts:new Date().toISOString(),templateId:state.sessionMeta?.templateId,total:state.sessionSummary.total,score:state.sessionSummary.meanScore,nextFocus:state.sessionSummary.nextFocus});
  state.learner.sessions=state.learner.sessions.slice(0,25); save('dw_v25_learner',state.learner); renderExercise(); renderStats();
}
function next(){ const pool=currentPool(); if(!pool.length)return; if(state.trainerMode==='adaptive' && state.checked && state.index >= pool.length-1){ finishAdaptiveSession(); return; } state.index = (state.index + 1) % pool.length; state.checked=false; state.selectedChoice='';state.hintLevel=0;state.lastEval=null; $('feedbackBox').classList.add('hidden'); $('translationBox').classList.add('hidden'); renderExercise(); }
function prev(){const pool=currentPool(); if(!pool.length)return;state.index=(state.index-1+pool.length)%pool.length;state.checked=false;state.selectedChoice='';state.hintLevel=0;renderExercise();}
function setMode(m){state.mode=m;state.trainerMode=m==='review'?'review':'module';resetSession();document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active'));({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m] && $(({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m])).classList.add('active'));renderExercise();}
function toggleTranslation(){const item=current(); if(!item)return; const box=$('translationBox'); box.classList.toggle('hidden'); box.innerHTML = `<strong>${esc(t('example'))}</strong><br>${esc(L(item.example))}<hr><strong>Deutsch</strong><br>${esc(item.example_de||item.answer||'')}`;}
function speakCurrent(){const item=current(); const text=item?.example_de || item?.prompt?.replace('___', item.answer) || item?.german || ''; if(!text || !speechSynthesis)return; const u=new SpeechSynthesisUtterance(text); u.lang='de-DE'; speechSynthesis.cancel(); speechSynthesis.speak(u);}
function renderStats(){ const pct = state.stats.answered ? Math.round(100*state.stats.correct/state.stats.answered) : 0; $('todayScore').textContent = pct+'%'; $('meterBar').style.width=pct+'%'; $('meterWrap').setAttribute('aria-valuenow',pct); $('answeredCount').textContent = `${state.stats.answered} ${t('answers')}`; $('mistakeCount').textContent = `${dueItems().length} ${t('due')}`; }
function renderMistakes(){
  if(state.route!=='mistakes') return; const due=dueItems(); const recent=state.mistakes.slice(0,40);
  const dueHtml=due.length?`<section class="review-block"><h3>Due review</h3>${due.map(it=>mistakeCard({item:it,expected:it.answer,given:'',score:0},true)).join('')}</section>`:'';
  const recentHtml=recent.length?`<section class="review-block"><h3>Recent errors</h3>${recent.map(m=>mistakeCard(m,false)).join('')}</section>`:'';
  $('mistakeList').innerHTML = dueHtml || recentHtml ? dueHtml + recentHtml : `<p>${esc(t('mistakesEmpty'))}</p>`;
  $('mistakeList').querySelectorAll('[data-review-item]').forEach(b=>b.onclick=()=>{const it=state.itemMap.get(b.dataset.reviewItem); if(!it)return; state.mode='practice'; state.trainerMode='adaptive'; state.pool=[it]; state.index=0; state.started=true; route('learn');});
}
function mistakeCard(m,due){ const it=m.item; const r=state.reviews[it.id]||{}; const tags=(m.errorTags||[]).join(' · '); return `<article class="mistake-item"><strong>${esc(questionTitle(it))}</strong><p>${questionText(it)}</p><p><b>${esc(t('solution'))}</b> ${esc(m.expected||it.answer||'')} · <span>${esc(r.status||'new')}</span> · <span>${esc(categorise(it))}</span></p>${m.given?`<p><b>${esc(t('wrong'))}</b> ${esc(m.given)} · ${Math.round((m.score||0)*100)}% ${tags?'· '+esc(tags):''}</p>`:''}<button class="ghost small mistake-retry" data-review-item="${esc(it.id)}" type="button">Trainieren</button></article>`; }
function renderResources(){
  if(state.route!=='resources') return;
  const resources=[
    ['Mein Deutschbuch','https://mein-deutschbuch.de/startseite.html'],
    ['DW Learn German','https://learngerman.dw.com/'],
    ['Goethe Übungen','https://www.goethe.de/en/spr/ueb.html'],
    ['Duden Wörterbuch','https://www.duden.de/'],
    ['LEO Wörterbuch','https://dict.leo.org/englisch-deutsch/'],
    ['Verbformen.de','https://www.verbformen.de/']
  ];
  $('resourceList').innerHTML = `<h2>${esc(t('resourcesTitle'))}</h2><p>${esc(t('resourcesDesc'))}</p>` + resources.map(([n,u])=>`<a class="resource-card" href="${u}" target="_blank" rel="noopener"><strong>${esc(n)}</strong><span>${esc(u)}</span></a>`).join('');
}
function renderConjugatorNotice(){
  if(state.route!=='conjugator') return;
  const q=($('verbSearch')?.value || '').trim();
  const query=q || 'sein';
  const verbformen=`https://www.verbformen.de/?w=${encodeURIComponent(query)}`;
  const duden=`https://www.duden.de/suchen/dudenonline/${encodeURIComponent(query)}`;
  $('verbMeta').innerHTML=`<span class="pill">Verbprüfung</span><span class="pill muted-pill">extern + Training</span>`;
  $('verbList').innerHTML=`<div class="verb-tool-copy"><strong>${esc(t('conjugatorTitle'))}</strong><p>${esc(t('conjugatorDesc'))}</p><p class="muted-note">Tipp: Verb extern prüfen, dann im Trainer Satzbau, Präpositionen und Produktion üben.</p></div>`;
  $('tenseTabs').innerHTML=`<a class="tense-tab active" href="${verbformen}" target="_blank" rel="noopener">Verbformen.de öffnen</a><a class="tense-tab" href="${duden}" target="_blank" rel="noopener">Duden suchen</a>`;
  $('tenseTable').innerHTML=`<div class="external-tool-box"><h3>${esc(query)}</h3><p>Suche das Verb extern und trainiere danach die Anwendung im Kontext. Keine unvalidierte Tabelle wird intern angezeigt.</p></div>`;
  $('verbPractice').innerHTML=`<strong>Direkt weitertrainieren</strong><p>Öffne ein passendes Modul: Präpositionen, Satzbau oder Produktion.</p>`;
  $('verbPracticeButton').textContent='Im Trainer üben';
}
function updateHeroCollapse(){ $('heroCard')?.classList.toggle('collapsed', state.started && state.route==='learn'); }
function exportProgress(){ const blob = new Blob([JSON.stringify({version:APP_BUILD,stats:state.stats,mistakes:state.mistakes,reviews:state.reviews,learner:state.learner,profile:state.profile},null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='deutsch-wipa-v25-progress.json'; a.click(); URL.revokeObjectURL(a.href); }
function importProgress(e){ const file=e.target.files?.[0]; if(!file)return; const r=new FileReader(); r.onload=()=>{try{const x=JSON.parse(r.result); if(x.stats)state.stats=x.stats;if(x.mistakes)state.mistakes=x.mistakes;if(x.reviews)state.reviews=x.reviews;if(x.learner)state.learner=x.learner;if(x.profile)state.profile=x.profile; ensureLearnerModel(); save('dw_v25_stats',state.stats);save('dw_v25_mistakes',state.mistakes);save('dw_v25_reviews',state.reviews);save('dw_v25_learner',state.learner);save('dw_v25_profile',state.profile);renderAll();}catch{alert('Invalid backup file.')}}; r.readAsText(file); }
window.addEventListener('DOMContentLoaded',()=>init().catch(err=>{console.error(err);document.body.innerHTML=`<main style="max-width:760px;margin:4rem auto;font-family:system-ui"><h1>Deutsch-WiPA konnte nicht starten</h1><p>${esc(err.message)}</p><p>Prüfe die Konsole und die lokalen Dateien. Meist fehlt eine Datendatei oder der Browser nutzt einen alten Cache.</p></main>`;}));
