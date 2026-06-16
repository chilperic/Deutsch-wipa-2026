const APP_VERSION = '2026.06.16-v19.2.0-vocabulary-250';
const APP_BUILD = 'v19.2.0-vocabulary-250';
const $ = id => document.getElementById(id);

const LANGS = [['de','Deutsch'],['en','English'],['fr','Français']];
const APPEARANCES = [['system','System'],['light','Light'],['dark','Dark']];
const COLORS = [['teal','Teal'],['forest','Forest'],['ocean','Ocean'],['sunset','Sunset'],['lavender','Lavender'],['rose','Rose'],['sand','Sand'],['graphite','Graphite'],['midnight','Midnight'],['highcontrast','High contrast']];

const I18N = {
  de: {
    learnRoute:'Lernen', conjugatorRoute:'Konjugator', mistakesRoute:'Fehlerbank', resourcesRoute:'Ressourcen',
    brandSub:'B1 → B2 · verifizierter Kerntrainer', pathLabel:'Lernpfad', pathQuestion:'Was willst du trainieren?',
    profile:'Profil', namePlaceholder:'Dein Name', localSave:'Fortschritt wird lokal gespeichert.', design:'Design', color:'Farbe', backup:'Backup', export:'Export', import:'Import',
    module:'Modul', session:'Sitzung', answers:'Antworten', mistakes:'Fehler', topic:'Thema', options:'Optionen',
    ready:'Bereit?', startText:'Starte die Sitzung.', start:'Sitzung starten', check:'Prüfen', next:'Weiter', repeat:'Nochmal versuchen',
    practice:'Üben', solution:'Lösung', review:'Wiederholen', rule:'Regel', example:'Beispiel', translate:'Übersetzen', speak:'Vorlesen', previous:'Vorherige Frage', skip:'Überspringen',
    noItems:'Keine geprüften Items in diesem Modul.', correct:'Richtig.', wrong:'Noch nicht korrekt.', answerPlaceholder:'Antwort eingeben…',
    item:'Item', items:'Items', verified:'geprüft', completion:'Sitzung abgeschlossen',
    mistakesTitle:'Fehlerbank', mistakesEmpty:'Noch keine Fehler. Fehler werden erst nach einer falschen Antwort gespeichert.', clearMistakes:'Fehler löschen',
    resourcesTitle:'Ressourcen', resourcesDesc:'Externe Referenzen für selbstständiges Prüfen. Nicht blind vertrauen: immer mit Beispielen vergleichen.',
    conjugatorTitle:'Konjugator eingeschränkt', conjugatorDesc:'Der alte große Konjugator ist in v19 deaktiviert, bis die Verbtabellen validiert sind.',
    learnFeedback:'Lies die Regel, dann prüfe aktiv. Lösung ansehen zählt nicht als Übung.',
    supportLangNote:'Zielsprache ist Deutsch. Die Interface-/Hilfssprache ist nur Unterstützung.'
  },
  en: {
    learnRoute:'Learn', conjugatorRoute:'Conjugator', mistakesRoute:'Mistakes', resourcesRoute:'Resources',
    brandSub:'B1 → B2 · verified core trainer', pathLabel:'Learning path', pathQuestion:'What do you want to train?',
    profile:'Profile', namePlaceholder:'Your name', localSave:'Progress is saved locally.', design:'Design', color:'Color', backup:'Backup', export:'Export', import:'Import',
    module:'Module', session:'Session', answers:'answers', mistakes:'mistakes', topic:'Topic', options:'Options',
    ready:'Ready?', startText:'Start the session.', start:'Start session', check:'Check', next:'Next', repeat:'Try again',
    practice:'Practice', solution:'Solution', review:'Review', rule:'Rule', example:'Example', translate:'Translate', speak:'Read aloud', previous:'Previous question', skip:'Skip',
    noItems:'No verified items in this module.', correct:'Correct.', wrong:'Not correct yet.', answerPlaceholder:'Enter answer…',
    item:'item', items:'items', verified:'verified', completion:'Session complete',
    mistakesTitle:'Mistake bank', mistakesEmpty:'No mistakes yet. Mistakes are saved only after a wrong answer.', clearMistakes:'Clear mistakes',
    resourcesTitle:'Resources', resourcesDesc:'External references for independent checking. Do not trust blindly: compare examples.',
    conjugatorTitle:'Conjugator restricted', conjugatorDesc:'The old large conjugator is disabled in v19 until verb tables are validated.',
    learnFeedback:'Read the rule, then test yourself. Viewing the solution is not practice.',
    supportLangNote:'German is the target language. Interface/support language is only assistance.'
  },
  fr: {
    learnRoute:'Apprendre', conjugatorRoute:'Conjugueur', mistakesRoute:'Erreurs', resourcesRoute:'Ressources',
    brandSub:'B1 → B2 · entraîneur central vérifié', pathLabel:'Parcours', pathQuestion:'Que veux-tu travailler ?',
    profile:'Profil', namePlaceholder:'Ton nom', localSave:'La progression est enregistrée localement.', design:'Design', color:'Couleur', backup:'Sauvegarde', export:'Exporter', import:'Importer',
    module:'Module', session:'Session', answers:'réponses', mistakes:'erreurs', topic:'Thème', options:'Options',
    ready:'Prêt ?', startText:'Commence la session.', start:'Commencer', check:'Vérifier', next:'Suivant', repeat:'Réessayer',
    practice:'S’entraîner', solution:'Solution', review:'Réviser', rule:'Règle', example:'Exemple', translate:'Traduire', speak:'Lire', previous:'Question précédente', skip:'Passer',
    noItems:'Aucun item vérifié dans ce module.', correct:'Correct.', wrong:'Pas encore correct.', answerPlaceholder:'Saisir la réponse…',
    item:'item', items:'items', verified:'vérifiés', completion:'Session terminée',
    mistakesTitle:'Banque d’erreurs', mistakesEmpty:'Pas encore d’erreurs. Elles sont enregistrées après une mauvaise réponse.', clearMistakes:'Effacer les erreurs',
    resourcesTitle:'Ressources', resourcesDesc:'Références externes pour vérifier soi-même. Ne pas faire confiance aveuglément : comparer les exemples.',
    conjugatorTitle:'Conjugueur limité', conjugatorDesc:'L’ancien grand conjugueur est désactivé en v19 jusqu’à validation des tableaux verbaux.',
    learnFeedback:'Lis la règle, puis teste-toi activement. Voir la solution ne compte pas comme exercice.',
    supportLangNote:'La langue cible est l’allemand. La langue d’interface n’est qu’une aide.'
  }
};

const state = {
  data:null, route:'learn', path:'vocabulary', moduleId:'vocab_core', index:0, started:false, checked:false, selectedChoice:'', mode:'practice',
  stats:load('dw_v19_stats',{answered:0,correct:0}), mistakes:load('dw_v19_mistakes',[]), profile:load('dw_v19_profile',{name:''}),
  lang: ['de','en','fr'].includes(localStorage.dw_v19_lang) ? localStorage.dw_v19_lang : 'de',
  appearance: localStorage.dw_appearance || 'system', color: localStorage.dw_color || 'teal',
  pool:[]
};

function load(k,f){try{return JSON.parse(localStorage.getItem(k)) ?? f}catch{return f}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function t(k){return I18N[state.lang]?.[k] || I18N.en[k] || k}
function L(obj){ if(obj == null) return ''; if(typeof obj === 'string') return obj; return obj[state.lang] || obj.en || obj.de || Object.values(obj)[0] || ''; }
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function norm(s=''){return String(s).trim().toLowerCase().normalize('NFC').replace(/[„“”]/g,'"').replace(/[.!?;,。؟]+$/g,'').replace(/\s+/g,' ')}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

async function init(){
  applyDesign(false);
  await clearOldCachesAndServiceWorkers();
  state.data = await fetchCoreData();
  bind();
  renderStaticText();
  renderLangs();
  renderDesignControls();
  selectPath('vocabulary');
  route('learn');
  renderAll();
}

async function fetchCoreData(){
  const res = await fetch(`data/core_v19.json?v=${encodeURIComponent(APP_BUILD)}`, {cache:'no-store'});
  if(!res.ok) throw new Error('Cannot load verified core data.');
  const data = await res.json();
  const problems = validateData(data);
  if(problems.length){
    console.error('Blocking content validation failed:', problems);
    throw new Error(`Content validation failed: ${problems[0]}`);
  }
  return data;
}

async function clearOldCachesAndServiceWorkers(){
  try{
    if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister().catch(()=>{})));
    }
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k).catch(()=>{})));
    }
  }catch(e){console.warn('Cache cleanup skipped',e)}
}

function validateData(data){
  const issues=[]; const seen=new Set();
  if(!data || !Array.isArray(data.paths) || !Array.isArray(data.modules)) issues.push('Missing paths/modules arrays.');
  const moduleIds = new Set((data.modules||[]).map(m=>m.id));
  for(const p of data.paths||[]) for(const mid of p.modules||[]) if(!moduleIds.has(mid)) issues.push(`Path ${p.id} references missing module ${mid}.`);
  for(const m of data.modules||[]){
    if(!m.id || !m.path || !Array.isArray(m.items)) issues.push(`Invalid module shell ${m.id||'unknown'}.`);
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
  $('languageSelect').onchange=e=>{state.lang=e.target.value;localStorage.dw_v19_lang=state.lang;renderAll();};
  document.querySelectorAll('#sidebarAppearanceSelect').forEach(el=>el.onchange=e=>setAppearance(e.target.value));
  document.querySelectorAll('#sidebarColorSelect').forEach(el=>el.onchange=e=>setColor(e.target.value));
  document.querySelectorAll('.top-tab').forEach(b=>b.onclick=()=>route(b.dataset.route));
  $('profileName').value = state.profile.name || '';
  $('profileName').oninput=e=>{state.profile.name=e.target.value;save('dw_v19_profile',state.profile);$('profileSaveStatus').textContent=t('localSave')};
  $('moduleSelect').onchange=e=>{state.moduleId=e.target.value;resetSession();renderAll();};
  $('mobilePathSelect').onchange=e=>selectPath(e.target.value);
  $('mobileModuleSelect').onchange=e=>{state.moduleId=e.target.value;resetSession();renderAll();};
  $('primaryAction').onclick=primary;
  $('secondaryAction').onclick=next;
  $('prevButton').onclick=prev;
  $('skipButton').onclick=next;
  $('translateButton').onclick=toggleTranslation;
  $('speakButton').onclick=speakCurrent;
  $('modePractice').onclick=()=>setMode('practice');
  $('modeLearn').onclick=()=>setMode('learn');
  $('modeReview').onclick=()=>setMode('review');
  $('clearMistakes').onclick=()=>{state.mistakes=[];save('dw_v19_mistakes',state.mistakes);renderMistakes();renderStats();};
  $('verbPracticeButton').onclick=()=>selectPath('prepositions');
  $('mobileMenu')?.addEventListener('click',()=>document.body.classList.toggle('drawer-open'));
  $('mobileOpenSidebar')?.addEventListener('click',()=>document.body.classList.add('drawer-open'));
  $('backdrop')?.addEventListener('click',()=>document.body.classList.remove('drawer-open'));
  $('exportProgress').onclick=exportProgress;
  $('importProgress').onchange=importProgress;
}

function renderStaticText(){
  document.documentElement.lang = state.lang;
  document.documentElement.dir = 'ltr';
  document.querySelector('.brand-subtitle').textContent = t('brandSub');
  const tabs = {learn:t('learnRoute'),conjugator:t('conjugatorRoute'),mistakes:t('mistakesRoute'),resources:t('resourcesRoute')};
  document.querySelectorAll('.top-tab').forEach(b=>b.textContent=tabs[b.dataset.route]||b.dataset.route);
  const head = document.querySelector('.sidebar-head');
  if(head){head.querySelector('.eyebrow').textContent=t('pathLabel'); head.querySelector('h3').textContent=t('pathQuestion');}
  document.querySelector('label[for="profileName"]').textContent=t('profile');
  $('profileName').placeholder=t('namePlaceholder');
  $('profileSaveStatus').textContent=t('localSave');
  document.querySelector('label[for="sidebarAppearanceSelect"]').textContent=t('design');
  document.querySelector('label[for="sidebarColorSelect"]').textContent=t('color');
  document.querySelector('.backup-details summary').textContent=t('backup');
  $('exportProgress').textContent=t('export');
  document.querySelector('label[for="importProgress"]').textContent=t('import');
  document.querySelector('label[for="moduleSelect"]').textContent=t('module');
  document.querySelector('.mobile-control-panel label:first-child span').textContent=t('topic');
  document.querySelector('.mobile-control-panel label:nth-child(2) span').textContent=t('module');
  $('mobileOpenSidebar').textContent=t('options');
  $('progressLabel').textContent=t('session');
  $('prevButton').title=t('previous'); $('prevButton').setAttribute('aria-label',t('previous'));
  $('skipButton').title=t('skip'); $('skipButton').setAttribute('aria-label',t('skip'));
  $('speakButton').title=t('speak'); $('speakButton').setAttribute('aria-label',t('speak'));
  $('translateButton').title=t('translate'); $('translateButton').setAttribute('aria-label',t('translate'));
  document.querySelectorAll('.learn-panel .eyebrow')[0].textContent=t('rule');
  document.querySelectorAll('.learn-panel .eyebrow')[1].textContent=t('example');
  $('modePractice').textContent=t('practice'); $('modeLearn').textContent=t('solution'); $('modeReview').textContent=t('review');
  $('clearMistakes').textContent=t('clearMistakes');
}

function renderLangs(){ $('languageSelect').innerHTML = LANGS.map(([c,n])=>`<option value="${c}" ${c===state.lang?'selected':''}>${n}</option>`).join(''); }
function renderDesignControls(){
  $('sidebarAppearanceSelect').innerHTML = APPEARANCES.map(([c,n])=>`<option value="${c}" ${c===state.appearance?'selected':''}>${n}</option>`).join('');
  $('sidebarColorSelect').innerHTML = COLORS.map(([c,n])=>`<option value="${c}" ${c===state.color?'selected':''}>${n}</option>`).join('');
}
function resolvedAppearance(){return state.appearance==='system' ? (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light') : state.appearance}
function applyDesign(){document.documentElement.dataset.appearance=resolvedAppearance();document.documentElement.dataset.color=state.color;document.documentElement.dataset.theme=resolvedAppearance();}
function setAppearance(v){state.appearance=v;localStorage.dw_appearance=v;applyDesign();renderDesignControls();}
function setColor(v){state.color=v;localStorage.dw_color=v;applyDesign();renderDesignControls();}

function route(r){state.route=r;document.querySelectorAll('.top-tab').forEach(b=>b.classList.toggle('active',b.dataset.route===r));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));$(r+'View')?.classList.add('active-view');renderAll();}
function selectPath(id){state.path=id; const p=state.data.paths.find(x=>x.id===id)||state.data.paths[0]; state.moduleId=p.modules[0]; resetSession(); renderAll();}
function resetSession(){state.index=0;state.started=false;state.checked=false;state.selectedChoice='';state.pool=[];$('translationBox')?.classList.add('hidden');$('feedbackBox')?.classList.add('hidden');}
function currentModule(){return state.data.modules.find(m=>m.id===state.moduleId) || state.data.modules[0];}
function currentPool(){
  if(state.mode==='review') return state.mistakes.map(x=>x.item).filter(Boolean);
  return currentModule().items;
}
function current(){const pool=currentPool(); return pool[state.index % Math.max(pool.length,1)];}

function renderAll(){
  if(!state.data) return;
  renderStaticText(); renderLangs(); renderPaths(); renderModuleSelect(); renderExercise(); renderStats(); renderMistakes(); renderResources(); renderConjugatorNotice();
}
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
  $('moduleSelect').innerHTML = opts; $('mobileModuleSelect').innerHTML = opts;
  $('conjugationControls').classList.add('hidden');
}

function renderExercise(){
  const module = currentModule(); const pool = currentPool(); const item = current();
  const path = state.data.paths.find(p=>p.id===module.path);
  $('currentPathLabel').textContent = L(path?.title)||'';
  $('moduleTitle').textContent = L(module.title);
  $('moduleDescription').textContent = L(module.description);
  $('moduleCount').textContent = `${pool.length} ${pool.length===1?t('item'):t('items')} · ${t('verified')}`;
  $('levelBadge').textContent = module.level || 'B1/B2';
  $('exercisePill').textContent = t('practice');
  $('itemIndex').textContent = pool.length ? `${state.index+1} / ${pool.length}` : '—';
  $('cardProgressBar').style.width = pool.length ? `${Math.round((state.index)/pool.length*100)}%` : '0%';
  $('choiceZone').innerHTML=''; $('answerZone').innerHTML=''; $('translationBox').classList.add('hidden');
  if(!pool.length || !item){
    $('questionTitle').textContent = t('noItems'); $('questionText').textContent=''; $('ruleBox').textContent=t('supportLangNote'); $('exampleBox').textContent='—'; $('primaryAction').textContent=t('start'); return;
  }
  if(!state.started){
    $('questionTitle').textContent=t('ready'); $('questionText').textContent=t('startText'); $('ruleBox').textContent=t('supportLangNote'); $('exampleBox').textContent='—'; $('primaryAction').textContent=t('start'); $('secondaryAction').classList.add('hidden'); $('feedbackBox').classList.add('hidden'); return;
  }
  $('questionTitle').textContent = questionTitle(item);
  $('questionText').innerHTML = questionText(item);
  $('ruleBox').textContent = L(item.feedback) || t('learnFeedback');
  $('exampleBox').textContent = item.example_de || '—';
  renderInput(item);
  $('primaryAction').textContent = state.mode==='learn' ? t('next') : (state.checked ? t('repeat') : t('check'));
  $('secondaryAction').textContent = t('next');
  $('secondaryAction').classList.toggle('hidden', !state.checked);
  if(state.mode==='learn') showSolution(item);
}
function questionTitle(item){
  const map={vocabulary_choice:'Deutsch → Bedeutung', article_plural:'Plural bilden', gap_fill:'Lücke ergänzen', multiple_choice:'Satzstruktur prüfen'};
  return map[item.type] || t('practice');
}
function questionText(item){
  if(item.type==='vocabulary_choice') return `<strong>${esc(item.german)}</strong>${item.plural ? `<span class="vocab-meta">Plural: ${esc(item.plural)}</span>` : ''}`;
  if(item.type==='article_plural') return `Schreibe den Plural mit Artikel:<br><strong>${esc(item.singular)}</strong>`;
  if(item.type==='gap_fill') return esc(item.prompt).replace('___','<mark>___</mark>');
  if(item.type==='multiple_choice') return esc(item.prompt);
  return esc(item.prompt||item.german||'');
}
function renderInput(item){
  if(item.type==='vocabulary_choice'){
    const choices = shuffle(item.choices[state.lang] || item.choices.en);
    $('choiceZone').innerHTML = choices.map(c=>`<button class="choice ${state.selectedChoice===c?'selected':''}" data-choice="${esc(c)}">${esc(c)}</button>`).join('');
    $('choiceZone').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.selectedChoice=b.dataset.choice;renderExercise();});
  }else if(item.type==='multiple_choice'){
    $('choiceZone').innerHTML = item.choices.map(c=>`<button class="choice ${state.selectedChoice===c?'selected':''}" data-choice="${esc(c)}">${esc(c)}</button>`).join('');
    $('choiceZone').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.selectedChoice=b.dataset.choice;renderExercise();});
  }else{
    $('answerZone').innerHTML = `<input id="answerInput" class="answer-input input" type="text" autocomplete="off" placeholder="${esc(t('answerPlaceholder'))}">`;
    $('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter')primary();});
    setTimeout(()=>$('answerInput')?.focus(),0);
  }
}
function primary(){
  if(!state.started){state.started=true;state.checked=false;renderExercise();return;}
  if(state.mode==='learn'){next();return;}
  if(state.checked){state.checked=false;renderExercise();return;}
  checkAnswer();
}
function checkAnswer(){
  const item=current(); if(!item)return;
  let given='', expected='', ok=false;
  if(item.type==='vocabulary_choice'){
    given=state.selectedChoice; expected=item.answer[state.lang] || item.answer.en; ok=given===expected;
  }else if(item.type==='multiple_choice'){
    given=state.selectedChoice; expected=item.answer; ok=given===expected;
  }else{
    given=$('answerInput')?.value || ''; expected=item.answer; const acceptable=item.acceptable||[item.answer]; ok=acceptable.map(norm).includes(norm(given));
  }
  state.checked=true; state.stats.answered += 1; if(ok)state.stats.correct += 1;
  if(!ok){ state.mistakes.unshift({ts:new Date().toISOString(),module:state.moduleId,item,given,expected}); state.mistakes=state.mistakes.slice(0,80); save('dw_v19_mistakes',state.mistakes); }
  save('dw_v19_stats',state.stats);
  const box=$('feedbackBox'); box.className = `feedback ${ok?'good':'bad'}`;
  box.innerHTML = `<strong>${ok?t('correct'):t('wrong')}</strong><br>${esc(L(item.feedback))}<br><span class="muted">${esc(t('solution'))}: ${esc(expected)}${item.plural ? ` · Plural: ${esc(item.plural)}` : ''}</span>`;
  showSolution(item);
  renderStats(); renderMistakes();
}
function showSolution(item){
  if(item.type==='vocabulary_choice' || item.type==='multiple_choice'){
    const expected = item.type==='vocabulary_choice' ? (item.answer[state.lang] || item.answer.en) : item.answer;
    $('choiceZone').querySelectorAll('button').forEach(b=>{b.classList.toggle('correct', b.dataset.choice===expected);});
  }else if($('answerInput')){
    $('answerInput').value = item.answer;
  }
}
function next(){
  const pool=currentPool(); if(!pool.length)return;
  state.index = (state.index + 1) % pool.length; state.checked=false; state.selectedChoice=''; $('feedbackBox').classList.add('hidden'); $('translationBox').classList.add('hidden'); renderExercise();
}
function prev(){const pool=currentPool(); if(!pool.length)return; state.index=(state.index-1+pool.length)%pool.length;state.checked=false;state.selectedChoice='';renderExercise();}
function setMode(m){state.mode=m;resetSession();document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active'));({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m] && $(({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m])).classList.add('active'));renderExercise();}
function toggleTranslation(){const item=current(); if(!item)return; const box=$('translationBox'); box.classList.toggle('hidden'); box.innerHTML = `<strong>${esc(t('example'))}</strong><br>${esc(L(item.example))}`;}
function speakCurrent(){const item=current(); const text=item?.example_de || item?.prompt?.replace('___', item.answer) || item?.german || ''; if(!text || !speechSynthesis)return; const u=new SpeechSynthesisUtterance(text); u.lang='de-DE'; speechSynthesis.cancel(); speechSynthesis.speak(u);}

function renderStats(){
  const pct = state.stats.answered ? Math.round(100*state.stats.correct/state.stats.answered) : 0;
  $('todayScore').textContent = pct+'%'; $('meterBar').style.width=pct+'%'; $('meterWrap').setAttribute('aria-valuenow',pct);
  $('answeredCount').textContent = `${state.stats.answered} ${t('answers')}`; $('mistakeCount').textContent = `${state.mistakes.length} ${t('mistakes')}`;
}
function renderMistakes(){
  if(state.route!=='mistakes') return;
  $('mistakeList').innerHTML = state.mistakes.length ? state.mistakes.map(m=>`<article class="mistake-item"><strong>${esc(questionTitle(m.item))}</strong><p>${questionText(m.item)}</p><p><b>${esc(t('wrong'))}</b> ${esc(m.given||'—')} · <b>${esc(t('solution'))}</b> ${esc(m.expected||m.item.answer||'')}</p><p>${esc(L(m.item.feedback))}</p></article>`).join('') : `<p>${esc(t('mistakesEmpty'))}</p>`;
}
function renderResources(){
  if(state.route!=='resources') return;
  const resources=[
    ['DW Learn German','https://learngerman.dw.com/'],
    ['Duden Wörterbuch','https://www.duden.de/'],
    ['LEO Wörterbuch','https://dict.leo.org/englisch-deutsch/'],
    ['Verbformen.de','https://www.verbformen.de/']
  ];
  $('resourceList').innerHTML = `<h2>${esc(t('resourcesTitle'))}</h2><p>${esc(t('resourcesDesc'))}</p>` + resources.map(([n,u])=>`<a class="resource-card" href="${u}" target="_blank" rel="noopener"><strong>${esc(n)}</strong><span>${esc(u)}</span></a>`).join('');
}
function renderConjugatorNotice(){
  if(state.route!=='conjugator') return;
  $('verbMeta').textContent='v19 Core';
  $('verbList').innerHTML=`<p>${esc(t('conjugatorDesc'))}</p>`;
  $('tenseTabs').innerHTML=''; $('tenseTable').innerHTML=''; $('verbPractice').innerHTML=`<strong>${esc(t('conjugatorTitle'))}</strong><p>${esc(t('conjugatorDesc'))}</p>`;
}
function exportProgress(){
  const blob = new Blob([JSON.stringify({version:APP_BUILD,stats:state.stats,mistakes:state.mistakes,profile:state.profile},null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='deutsch-wipa-v19-progress.json'; a.click(); URL.revokeObjectURL(a.href);
}
function importProgress(e){
  const file=e.target.files?.[0]; if(!file)return; const r=new FileReader(); r.onload=()=>{try{const x=JSON.parse(r.result); if(x.stats)state.stats=x.stats;if(x.mistakes)state.mistakes=x.mistakes;if(x.profile)state.profile=x.profile; save('dw_v19_stats',state.stats);save('dw_v19_mistakes',state.mistakes);save('dw_v19_profile',state.profile);renderAll();}catch{alert('Invalid backup file.')}}; r.readAsText(file);
}

window.addEventListener('DOMContentLoaded',()=>init().catch(err=>{console.error(err);document.body.innerHTML=`<main style="max-width:760px;margin:4rem auto;font-family:system-ui"><h1>Deutsch-WiPA v19 failed safely</h1><p>${esc(err.message)}</p><p>The app refused to start because verified content validation failed.</p></main>`;}));
