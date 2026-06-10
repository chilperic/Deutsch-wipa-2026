const APP_VERSION = '2026.06.10-v10-theme-visible';
const $ = id => document.getElementById(id);
// vfetch: cache-busting for version forcing BUT allows SW to intercept
// Using 'default' cache mode so the SW stale-while-revalidate strategy works
const vfetch = path => fetch(path + (path.includes('?') ? '&' : '?') + 'v=' + APP_VERSION);

const SRS_KEY = 'dw_modern_srs';
const state = {
  manifest: null, modules: [], route: 'learn', path: 'conjugation', moduleId: 'all',
  index: 0, started: false, checked: false, selectedChoice: '', mode: 'practice',
  stats: load('dw_modern_stats', {}), moduleStats: load('dw_modern_module_stats', {}),
  mistakes: load('dw_modern_mistakes', []), srs: load(SRS_KEY, {}),
  profile: load('dw_modern_profile', {name:''}),
  lang: localStorage.dw_lang || 'de', theme: localStorage.dw_theme || 'parchment',
  conjugator: null, verb: null, tense: 'Präsens',
  tenseFilter: 'Präsens', sessionLimit: 20, dynamicVerb: '', showAllVerbs: false,
  sessionComplete: false, reviewEmptyReason: '', poolKey: '', poolItems: [],
  // Memoised generateConjugatorPractice output: invalidated when verb/tense/mode changes
  _conjGenKey: '', _conjGenItems: []
};

if(state.theme==='light')state.theme='parchment';
if(state.theme==='dark')state.theme='graphite';
localStorage.dw_theme=state.theme;

const LANGS = [['de','Deutsch'],['en','English'],['fr','Français'],['es','Español'],['ar','العربية'],['fa','فارسی'],['uk','Українська'],['ru','Русский'],['pl','Polski'],['tr','Türkçe']];

const THEMES = [
  ['parchment','Parchment'],
  ['forest','Forest'],
  ['ocean','Ocean'],
  ['sunset','Sunset'],
  ['lavender','Lavender'],
  ['rose','Rose'],
  ['sand','Sand'],
  ['graphite','Graphite'],
  ['midnight','Midnight'],
  ['highcontrast','High contrast']
];
const PATHS = [
  {id:'conjugation',icon:'⚙️',title:'Konjugation',sub:'Verbformen, Modalverben, Infinitiv',cats:['conjugation','konjugator'],match:['modal','modalverb','infinitiv','verbformen','starke_verben','trennbare','reflexive','perfekt','plusquamperfekt','konjugator']},
  {id:'syntax',icon:'🧩',title:'Satzbau',sub:'Verbposition, TeKaMoLo, nicht, Passiversatz',match:['tekamolo','negation','nebensatz','satzordnung','satzvariation','passiv','passiversatz','final','modal_es','temporale']},
  {id:'cases',icon:'🎯',title:'Fälle',sub:'Akkusativ, Dativ, n-Deklination, Pronomen',match:['kasus','n_deklination','n-deklination','pronomen']},
  {id:'declension',icon:'🧬',title:'Deklination',sub:'Artikel, Adjektivendungen, Nomen, Pronomen',match:['deklination','adjektivdeklination','adjektive_als_nomen','n_deklination','kasus','pronomen']},
  {id:'adverbs',icon:'🧭',title:'Adverbien',sub:'Zeit, Ort, Häufigkeit, Modalität, Satzlogik',match:['adverb','adverbien']},
  {id:'prepositions',icon:'📍',title:'Präpositionen',sub:'lokal, temporal, Verben + Präposition',match:['praeposition','präposition']},
  {id:'nouns',icon:'📚',title:'Artikel & Nomen',sub:'Genus, Plural, Nominalisierung',match:['nomen','artikel','plural','genus']},
  {id:'adjectives',icon:'✨',title:'Adjektive',sub:'stark, schwach, gemischt',match:['adjektiv']},
  {id:'connectors',icon:'🔗',title:'Konnektoren',sub:'temporal, kausal, konzessiv, zweiteilig',match:['konnektor','konnektoren','temporal','kausal','konzessiv','zweiteilige']},
  {id:'workplace',icon:'💼',title:'Wortschatz Beruf',sub:'Linie-Beruf Kapitel, Büro, Kollokationen',cats:['vocabulary','workplace']}
];

const T = {
 de:{start:'Sitzung starten',check:'Prüfen',next:'Weiter',skip:'Überspringen',restart:'Neu starten',correct:'Richtig',wrong:'Noch nicht',answer:'Richtige Antwort',why:'Warum?',empty:'In diesem Thema gibt es für diese Auswahl keine Items.',ready:'Starte die Sitzung.',complete:'Sitzung abgeschlossen',noSrs:'Noch keine fälligen Wiederholungen. Beantworte zuerst einige Übungen.',allModules:'Alle Module',dueToday:'fällig heute',item:'Item',items:'Items',yourAnswer:'Deine Antwort',retryMistake:'Nochmal üben',sessionStats:'Sitzung',verbConjTable:'Tabelle anzeigen',progressLocal:'Fortschritt lokal im Browser gespeichert',profileSaved:'Profil gespeichert',exportProgress:'Export',importProgress:'Import'},
 en:{start:'Start session',check:'Check',next:'Next',skip:'Skip',restart:'Restart',correct:'Correct',wrong:'Not yet',answer:'Correct answer',why:'Why?',empty:'No items for this selection.',ready:'Start the session.',complete:'Session complete',noSrs:'No due reviews yet. Answer a few exercises first.',allModules:'All modules',dueToday:'due today',item:'item',items:'items',yourAnswer:'Your answer',retryMistake:'Practice again',sessionStats:'Session',verbConjTable:'Show table',progressLocal:'Progress saved locally in this browser',profileSaved:'Profile saved',exportProgress:'Export',importProgress:'Import'},
 fr:{start:'Commencer',check:'Vérifier',next:'Suivant',skip:'Passer',restart:'Recommencer',correct:'Correct',wrong:'Pas encore',answer:'Bonne réponse',why:'Pourquoi ?',empty:'Aucun item pour cette sélection.',ready:'Commence la session.',complete:'Session terminée',noSrs:"Aucune révision prévue. Réponds d'abord à quelques exercices.",allModules:'Tous les modules',dueToday:"à réviser aujourd'hui",item:'item',items:'items',yourAnswer:'Ta réponse',retryMistake:'Réessayer',sessionStats:'Session',verbConjTable:'Voir tableau'},
 es:{start:'Empezar',check:'Comprobar',next:'Siguiente',skip:'Omitir',restart:'Reiniciar',correct:'Correcto',wrong:'Todavía no',answer:'Respuesta correcta',why:'¿Por qué?',empty:'No hay elementos para esta selección.',ready:'Empieza la sesión.',complete:'Sesión completada',noSrs:'Aún no hay repasos pendientes. Responde primero algunos ejercicios.',allModules:'Todos los módulos',dueToday:'para repasar hoy',item:'ítem',items:'ítems',yourAnswer:'Tu respuesta',retryMistake:'Practicar de nuevo',sessionStats:'Sesión',verbConjTable:'Ver tabla'},
 ar:{start:'ابدأ الجلسة',check:'تحقق',next:'التالي',skip:'تخطي',restart:'إعادة البدء',correct:'صحيح',wrong:'ليس بعد',answer:'الإجابة الصحيحة',why:'لماذا؟',empty:'لا توجد عناصر لهذا الاختيار.',ready:'ابدأ الجلسة.',complete:'اكتملت الجلسة',noSrs:'لا توجد مراجعات مستحقة بعد. أجب عن بعض التمارين أولاً.',allModules:'كل الوحدات',dueToday:'مستحق اليوم',item:'عنصر',items:'عناصر',yourAnswer:'إجابتك',retryMistake:'تدرب مجدداً',sessionStats:'جلسة',verbConjTable:'عرض الجدول'},
 fa:{start:'شروع جلسه',check:'بررسی',next:'بعدی',skip:'رد کردن',restart:'شروع دوباره',correct:'درست',wrong:'هنوز نه',answer:'پاسخ درست',why:'چرا؟',empty:'برای این انتخاب موردی وجود ندارد.',ready:'جلسه را شروع کن.',complete:'جلسه کامل شد',noSrs:'هنوز مرور زمان‌بندی‌شده‌ای وجود ندارد. اول چند تمرین را پاسخ بده.',allModules:'همهٔ بخش‌ها',dueToday:'موعد امروز',item:'مورد',items:'مورد',yourAnswer:'پاسخ تو',retryMistake:'دوباره تمرین کن',sessionStats:'جلسه',verbConjTable:'نمایش جدول'},
 uk:{start:'Почати',check:'Перевірити',next:'Далі',skip:'Пропустити',restart:'Почати знову',correct:'Правильно',wrong:'Ще ні',answer:'Правильна відповідь',why:'Чому?',empty:'Немає завдань для цього вибору.',ready:'Почни сесію.',complete:'Сесію завершено',noSrs:'Поки немає повторень. Спочатку виконай кілька вправ.',allModules:'Усі модулі',dueToday:'на сьогодні',item:'завдання',items:'завдання',yourAnswer:'Твоя відповідь',retryMistake:'Тренуватися знову',sessionStats:'Сесія',verbConjTable:'Показати таблицю'},
 ru:{start:'Начать',check:'Проверить',next:'Далее',skip:'Пропустить',restart:'Начать заново',correct:'Правильно',wrong:'Еще нет',answer:'Правильный ответ',why:'Почему?',empty:'Нет заданий для этого выбора.',ready:'Начни сессию.',complete:'Сессия завершена',noSrs:'Пока нет повторений. Сначала ответь на несколько упражнений.',allModules:'Все модули',dueToday:'на сегодня',item:'задание',items:'задания',yourAnswer:'Твой ответ',retryMistake:'Тренироваться снова',sessionStats:'Сессия',verbConjTable:'Показать таблицу'},
 pl:{start:'Rozpocznij',check:'Sprawdź',next:'Dalej',skip:'Pomiń',restart:'Zacznij od nowa',correct:'Poprawnie',wrong:'Jeszcze nie',answer:'Poprawna odpowiedź',why:'Dlaczego?',empty:'Brak zadań dla tego wyboru.',ready:'Rozpocznij sesję.',complete:'Sesja zakończona',noSrs:'Brak powtórek. Najpierw rozwiąż kilka ćwiczeń.',allModules:'Wszystkie moduły',dueToday:'na dziś',item:'zadanie',items:'zadania',yourAnswer:'Twoja odpowiedź',retryMistake:'Ćwicz ponownie',sessionStats:'Sesja',verbConjTable:'Pokaż tabelę'},
 tr:{start:'Oturumu başlat',check:'Kontrol et',next:'Sonraki',skip:'Geç',restart:'Yeniden başlat',correct:'Doğru',wrong:'Henüz değil',answer:'Doğru cevap',why:'Neden?',empty:'Bu seçim için öğe yok.',ready:'Oturumu başlat.',complete:'Oturum tamamlandı',noSrs:'Henüz tekrar yok. Önce birkaç alıştırma çöz.',allModules:'Tüm modüller',dueToday:'bugün tekrar',item:'öğe',items:'öğe',yourAnswer:'Cevabın',retryMistake:'Tekrar pratik yap',sessionStats:'Oturum',verbConjTable:'Tabloyu göster'}
};
function tr(k){return T[state.lang]?.[k]??T.en[k]??T.de[k]??k}
function load(k,fallback){try{return JSON.parse(localStorage.getItem(k))??fallback}catch{return fallback}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function norm(s=''){return String(s).trim().toLowerCase().replace(/[„""]/g,'"').replace(/[.!?。؟،,;:]+$/g,'').replace(/\s+/g,' ')}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function safeHtml(s=''){return esc(stringify(s)).replace(/&lt;br\s*\/?&gt;/gi,'<br>')}
function stringify(v){if(v==null)return''; if(typeof v==='string'||typeof v==='number'||typeof v==='boolean')return String(v); if(Array.isArray(v))return v.map(stringify).filter(Boolean).join('; '); if(typeof v==='object'){const preferred=['German','Deutsch','English','article','base','plural','pattern','type','collocation','example']; return preferred.map(k=>v[k]).filter(Boolean).map(stringify).join('; ')||Object.values(v).map(stringify).filter(Boolean).join('; ')} return String(v)}
function stripHtml(s=''){const d=document.createElement('div');d.innerHTML=safeHtml(s);return d.textContent||d.innerText||''}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

async function init(){
  document.documentElement.dataset.theme=state.theme;updateThemeMeta();
  updateDirection();renderLangs();renderThemes();bind();
  await loadData();await loadConjugator();
  renderPath();selectPath('conjugation');
  route('learn');renderAll();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
function updateDirection(){document.documentElement.dir=['ar','fa'].includes(state.lang)?'rtl':'ltr'}
function renderLangs(){$('languageSelect').innerHTML=LANGS.map(([c,n])=>`<option value="${c}" ${c===state.lang?'selected':''}>${n}</option>`).join('')}
function renderThemes(){
  const options=THEMES.map(([c,n])=>`<option value="${c}" ${c===state.theme?'selected':''}>${n}</option>`).join('');
  document.querySelectorAll('#themeSelect,.theme-select-control').forEach(el=>{ el.innerHTML=options; el.value=state.theme; });
}
function applyTheme(value){
  state.theme=value||'parchment';
  localStorage.dw_theme=state.theme;
  document.documentElement.dataset.theme=state.theme;
  updateThemeMeta();
  renderThemes();
}
function updateThemeMeta(){const colors={parchment:'#f6efe3',forest:'#eaf4ea',ocean:'#e8f4fb',sunset:'#fff0e4',lavender:'#f2edff',rose:'#fff0f5',sand:'#fbf2dc',graphite:'#111827',midnight:'#07111f',highcontrast:'#ffffff'};document.querySelector('meta[name="theme-color"]')?.setAttribute('content',colors[state.theme]||colors.parchment)}

function bind(){
  $('languageSelect').onchange=e=>{state.lang=e.target.value;localStorage.dw_lang=state.lang;updateDirection();renderAll()};
  document.querySelectorAll('#themeSelect,.theme-select-control').forEach(el=>{el.onchange=e=>applyTheme(e.target.value)});
  bindProfileControls();
  document.querySelectorAll('.top-tab').forEach(b=>b.onclick=()=>route(b.dataset.route));
  $('mobileMenu').onclick=()=>toggleDrawer(true);$('backdrop').onclick=()=>toggleDrawer(false);
  $('primaryAction').onclick=primary;$('secondaryAction').onclick=next;$('prevButton').onclick=prev;
  $('skipButton').onclick=skipItem;
  $('speakButton').onclick=()=>{const item=current();if(!item)return;speak(item.germanSpeak||item.example||item.prompt||item.answer||'')};
  $('modePractice').onclick=()=>setMode('practice');$('modeLearn').onclick=()=>setMode('learn');$('modeReview').onclick=()=>setMode('review');
  $('clearMistakes').onclick=()=>{state.mistakes=[];save('dw_modern_mistakes',state.mistakes);renderMistakes();renderStats()};
  let vsTimer=null;$('verbSearch').oninput=()=>{clearTimeout(vsTimer);vsTimer=setTimeout(renderVerbList,120)};
  $('moduleSelect').onchange=e=>{state.moduleId=e.target.value;state.dynamicVerb='';resetSession();syncMobileControls();renderExercise()};
  if($('mobilePathSelect'))$('mobilePathSelect').onchange=e=>selectPath(e.target.value);
  if($('mobileModuleSelect'))$('mobileModuleSelect').onchange=e=>{state.moduleId=e.target.value;state.dynamicVerb='';resetSession();renderModuleSelect();renderExercise()};
  if($('mobileOpenSidebar'))$('mobileOpenSidebar').onclick=()=>toggleDrawer(true);
  $('tenseFilter').onchange=e=>{state.tenseFilter=e.target.value;state._conjGenKey='';resetSession();renderExercise()};
  $('sessionLimit').onchange=e=>{state.sessionLimit=e.target.value==='all'?'all':Number(e.target.value);resetSession();renderExercise()};
  $('verbPracticeButton').onclick=launchVerbPractice;
  $('openConjugator').onclick=()=>{
    const item=current();
    if(!item)return;
    const m=item.prompt.match(/\/ (\S+) \//);
    if(m){state.verb=m[1];state.tense=item.prompt.split(' / ')[2]?.trim()||'Präsens';}
    route('conjugator');
  };
  document.addEventListener('keydown',e=>{
    if(state.route!=='learn')return;
    const tag=(e.target.tagName||'').toLowerCase();
    if(e.key==='Enter'&&tag==='input'&&!$('primaryAction').disabled){e.preventDefault();primary()}
    if(e.key==='ArrowRight'&&!$('secondaryAction').classList.contains('hidden'))next();
    if(e.key==='ArrowLeft')prev();
    if(e.key==='Escape')skipItem();
  });
}

function bindProfileControls(){
  const name=$('profileName');
  if(name){
    name.value=state.profile?.name||'';
    name.oninput=()=>{
      state.profile={...state.profile,name:name.value.trim()};
      save('dw_modern_profile',state.profile);
      const status=$('profileSaveStatus');
      if(status)status.textContent=name.value.trim()?`${tr('profileSaved')}: ${name.value.trim()}`:tr('progressLocal');
    };
  }
  const status=$('profileSaveStatus');
  if(status)status.textContent=(state.profile?.name)?`${tr('profileSaved')}: ${state.profile.name}`:tr('progressLocal');
  const exportBtn=$('exportProgress');
  if(exportBtn)exportBtn.onclick=exportProgress;
  const importInput=$('importProgress');
  if(importInput)importInput.onchange=importProgress;
}
function exportProgress(){
  const payload={
    app:'Deutsch-WiPA 2026',version:APP_VERSION,exportedAt:new Date().toISOString(),
    profile:state.profile,lang:state.lang,theme:state.theme,
    stats:state.stats,moduleStats:state.moduleStats,mistakes:state.mistakes,srs:state.srs
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  const safeName=(state.profile?.name||'user').replace(/[^a-z0-9_-]+/gi,'_');
  a.href=URL.createObjectURL(blob);a.download=`deutsch-wipa-progress-${safeName}.json`;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importProgress(e){
  const file=e.target.files&&e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      state.profile=data.profile||state.profile||{name:''};
      state.stats=data.stats||{};state.moduleStats=data.moduleStats||{};state.mistakes=data.mistakes||[];state.srs=data.srs||{};
      if(data.lang)state.lang=data.lang;if(data.theme)state.theme=data.theme;
      save('dw_modern_profile',state.profile);save('dw_modern_stats',state.stats);save('dw_modern_module_stats',state.moduleStats);save('dw_modern_mistakes',state.mistakes);save(SRS_KEY,state.srs);
      localStorage.dw_lang=state.lang;localStorage.dw_theme=state.theme;
      document.documentElement.dataset.theme=state.theme;updateThemeMeta();updateDirection();renderLangs();renderThemes();bindProfileControls();renderAll();
    }catch(err){alert('Import fehlgeschlagen: ungültige JSON-Datei.');}
    e.target.value='';
  };
  reader.readAsText(file);
}
function syncMobileControls(){
  const path=$('mobilePathSelect');if(path)path.value=state.path;
  const mod=$('mobileModuleSelect');if(mod)mod.value=state.moduleId;
}
function toggleDrawer(open){$('sidebar').classList.toggle('open',open);$('backdrop').classList.toggle('hidden',!open);document.querySelector('.main').toggleAttribute('inert',open)}

async function loadData(){
  state.manifest=await vfetch('data-manifest.json').then(r=>r.json());
  const res=await Promise.allSettled(state.manifest.modules.map(async m=>{
    if(m.category==='practice')return null;
    const raw=await vfetch(m.path).then(r=>r.json());
    return{...m,raw,items:normalizeModule(raw,m)};
  }));
  state.modules=res.filter(r=>r.status==='fulfilled'&&r.value).map(r=>r.value);
}
function normalizeModule(raw,meta){if(meta.category==='konjugator')return[];let arr=raw.items||raw.words||raw.vocabulary_entries||raw.vocabulary||raw.questions||[];if(raw.exercise_pool)arr=raw.exercise_pool.flatMap(x=>x.cases||[]);return arr.map((it,i)=>normalizeItem(it,meta,i)).filter(Boolean)}
function pickLang(obj){if(!obj)return''; if(typeof obj!=='object')return stringify(obj); return obj.German||obj.Deutsch||obj[state.lang]||obj.English||Object.values(obj).find(Boolean)||''}
function germanDisplay(d){const g=d.grammar||{};const trans=d.translations||{};const raw=d.word||d.term||d.german||d.display||d.title||d.prompt||pickLang(trans);if(raw&&raw!=='undefined')return stringify(raw);if(g.article&&g.base)return`${g.article} ${g.base}${g.plural?`, ${String(g.plural).replace(/^die\s+/,'')}`:''}`; if(g.base)return stringify(g.base);return''}
function translationOf(d){const t=d.translations||{};return t[state.lang]||t.English||d.english_equivalent||d.meaning||d.translation||d.answer||''}
function normalizeAnswerValue(v){return stringify(v).replace(/^undefined$/,'').trim()}
function normalizeItem(it,meta,i){
  const d=(it&&it.data)||it; if(!d||typeof d!=='object')return null;
  const isVocab=meta.category==='vocabulary'||meta.path.includes('vokabular');
  let prompt=normalizeAnswerValue(d.prompt||d.display||d.title||'');
  let answer=normalizeAnswerValue(d.answer||d.solution||d.correct||d.english_equivalent||d.meaning||d.translation||d.translations?.English||d.correct_adjective_inflection||d.correct_noun_inflection||'');
  let type=d.exerciseType||d.type||inferType(prompt,d,meta);
  const de=germanDisplay(d);
  if(isVocab){
    const trans=normalizeAnswerValue(translationOf(d));
    const grammar=d.grammar||{};
    if(!answer)answer=trans||de;
    if(!prompt||prompt==='undefined')prompt=de||trans||`Vokabel ${i+1}`;
    if(type==='translation_into_german'){prompt=`Übersetze ins Deutsche: ${trans}`;answer=de||grammar.base||answer;}
    else if(type==='translation_from_german'){prompt=`Übersetze: ${de}`;answer=trans||answer;}
    else if(type==='article_trainer'){prompt=`Welcher Artikel? ${grammar.base||de.replace(/^(der|die|das)\s+/,'')}`;answer=grammar.article||String(de).split(' ')[0]||answer;}
    else if(type==='plural_trainer'){prompt=`Plural: ${de}`;answer=grammar.plural||answer;}
    else{type='flashcard';prompt=de||prompt;answer=trans||answer||de;}
  }
  if(prompt.includes('___')&&(type==='perfekt_builder'||type==='choice'))type='gap_fill';
  if(d.type==='classify')type='multiple_choice';
  if(d.type==='choice'&&!d.choices&&!d.options&&!String(prompt).includes('___'))type=inferType(prompt,d,meta);
  const explanation=richExplanation(d,meta,isVocab);
  const example=normalizeAnswerValue(d.example||d.example_de||d.example_sentence||d.essential_collocations?.[0]?.example||d.collocations?.[0]?.example||'');
  const choices=d.choices||d.options||makeChoices(answer,type,d);
  if(!prompt||prompt==='undefined')prompt=`${meta.title} · Item ${i+1}`;
  if(!answer||answer==='undefined')answer=prompt;
  return{id:d.id||`${meta.id}_${i}`,moduleId:meta.id,moduleTitle:meta.title,category:meta.category,exerciseType:type,prompt,answer,choices,explanation,example,raw:d,tags:d.tags||[],level:d.level||d.cefr||rawLevel(meta),germanSpeak:de||example||prompt};
}
function rawLevel(m){return(m.title||'').includes('B2')?'B2':'B1/B2'}
function inferType(prompt,d,meta){const p=String(prompt||'');const hay=`${p} ${meta.title} ${meta.id}`;if(d.choices||d.options||d.type==='classify')return'multiple_choice';if(p.includes('___'))return'gap_fill';if(/korrig|correct/i.test(p))return'sentence_correction';if(/conjug|Präsens|Präteritum|Perfekt|Modalverben|Konjugator/i.test(hay))return'verb_conjugation';return'flashcard'}
function richExplanation(d,meta,isVocab=false){const ex=d.explanation;if(typeof ex==='string'&&!ex.includes('Focus on meaning'))return ex;if(d.grammar_clarification)return stringify(d.grammar_clarification);if(d.grammar?.pattern)return stringify(d.grammar.pattern);if(d.essential_collocations?.length)return d.essential_collocations.map(c=>`${stringify(c.collocation)} — ${stringify(c.example)}`).join('<br>');if(d.collocations?.length)return d.collocations.map(c=>`${stringify(c.collocation||c)}${c.example?' — '+stringify(c.example):''}`).join('<br>');if(isVocab){const g=d.grammar||{};const pieces=[];if(g.article&&g.base)pieces.push(`Artikel: ${g.article}. Wort: ${g.base}.`);if(g.plural)pieces.push(`Plural: ${g.plural}.`);const trans=translationOf(d);if(trans)pieces.push(`Bedeutung: ${trans}.`);return pieces.join(' ')||`Wortschatz aus ${meta.title}.`}if(ex&&typeof ex==='object')return pickLang(ex);return`Thema: ${meta.title}. Achte auf Form, Position und Kontext.`}
function makeChoices(answer,type,context={}){const ans=String(answer||'').trim();if(!ans)return[];if(type==='article_trainer')return shuffle(['der','die','das']);if(type==='connector_selection'||/konnektor|connector/i.test(String(context.tags||context.category||'')+' '+String(context.prompt||''))){const pool=['und','aber','oder','sondern','weil','obwohl','trotzdem','deshalb','damit','bevor'];return[...new Set([ans,...pool.filter(x=>x!==ans)])].slice(0,4)}if(type==='multiple_choice'){const valid=context.choices||context.options;return valid&&valid.length?valid:[]}return[]}

function renderPath(){
  const pathOptions=PATHS.map(p=>`<option value="${p.id}">${esc(p.title)}</option>`).join('');
  if($('mobilePathSelect')){$('mobilePathSelect').innerHTML=pathOptions;$('mobilePathSelect').value=state.path;}
  $('pathNav').innerHTML=PATHS.map(p=>{const count=modulesForPath(p.id).reduce((a,m)=>a+m.items.length,0);return`<button class="path-btn" data-path="${p.id}"><span class="path-icon">${p.icon}</span><span><span class="path-title">${esc(p.title)}</span><span class="path-sub">${esc(p.sub)}</span></span><span class="path-count">${count}</span></button>`}).join('');
  document.querySelectorAll('.path-btn').forEach(b=>b.onclick=()=>{selectPath(b.dataset.path);toggleDrawer(false)})
}
function modulesForPath(id){const p=PATHS.find(x=>x.id===id);if(!p)return[];return state.modules.filter(m=>{const hay=`${m.id} ${m.title} ${m.path}`.toLowerCase();return(p.cats&&p.cats.includes(m.category))||(p.match&&p.match.some(s=>hay.includes(s)))})}
function selectPath(id){
  state.path=id;
  state.moduleId=id==='conjugation'?'dynamic_conjugator':'all';
  state.dynamicVerb='';
  state._conjGenKey=''; // invalidate memo
  resetSession();
  document.querySelectorAll('.path-btn').forEach(b=>b.classList.toggle('active',b.dataset.path===id));
  // Show/hide conjugation-specific controls
  const isConj=id==='conjugation';
  $('conjugationControls').classList.toggle('hidden',!isConj);
  renderModuleSelect();renderAll();
}
function renderModuleSelect(){
  const mods=modulesForPath(state.path);
  let html=`<option value="all">${tr('allModules')}</option>`;
  if(state.path==='conjugation')html=`<option value="dynamic_conjugator">Verbtraining</option>`+html;
  html+=mods.map(m=>`<option value="${esc(m.id)}">${esc(m.title)} (${m.items.length})</option>`).join('');
  $('moduleSelect').innerHTML=html;$('moduleSelect').value=state.moduleId;
  if($('mobileModuleSelect')){$('mobileModuleSelect').innerHTML=html;$('mobileModuleSelect').value=state.moduleId;}
}
function itemsForCurrentPath(){if(state.path==='conjugation'&&state.moduleId==='dynamic_conjugator')return generateConjugatorPractice();const mods=modulesForPath(state.path).filter(m=>state.moduleId==='all'||m.id===state.moduleId);return mods.flatMap(m=>m.items)}
function resetSession(){state.index=0;state.started=false;state.checked=false;state.selectedChoice='';state.sessionComplete=false;state.poolKey='';state.poolItems=[]}

// Memoised dynamic conjugation generator — only rebuilds when verb/tense/mode actually changes
function generateConjugatorPractice(){
  if(!state.conjugator)return[];
  const memoKey=`${state.tenseFilter}:${state.dynamicVerb}:${state.mode}`;
  if(state._conjGenKey===memoKey)return state._conjGenItems;

  const tenseMap={'Präsens':'present','Präteritum':'preterite','Perfekt':'perfect','Plusquamperfekt':'plusquam','Futur I':'futur1','Konjunktiv II':'konj2','Imperativ':'imperative'};
  const selected=state.tenseFilter==='all'?Object.keys(tenseMap):[state.tenseFilter];
  const starter=['sein','haben','werden','können','müssen','dürfen','sollen','wollen','mögen',
    'arbeiten','antworten','beantworten','bekommen','bedeuten','berichten','vergleichen',
    'machen','gehen','kommen','fahren','schreiben','sprechen','nehmen','geben','finden'];
  const verbNames=state.dynamicVerb?[state.dynamicVerb]:(state.mode==='learn'?starter:Object.keys(state.conjugator.verbs));
  const out=[];
  for(const verb of verbNames){
    const v=state.conjugator.verbs[verb];if(!v)continue;
    for(const tense of selected){
      const key=tenseMap[tense];
      const forms=v[key]||[];
      const pronouns=tense==='Imperativ'?['du','ihr','Sie']:state.conjugator.pronouns;
      for(let i=0;i<Math.min(forms.length,pronouns.length);i++){
        const pr=pronouns[i];
        const ans=`${pr} ${forms[i]}`;
        out.push({
          id:`dyn_${verb}_${key}_${i}`.replace(/\s+/g,'_'),
          moduleId:'dynamic_conjugator',moduleTitle:'Verbtraining',
          category:'conjugation',exerciseType:'verb_conjugation',
          prompt:`Konjugiere: ${pr} / ${verb} / ${tense}`,
          answer:ans,example:ans+'.',
          // Show full paradigm in explanation, not just Partizip
          explanation:`${verb} (${v.type}): ${tense}. Hilfsverb: ${v.aux}. Partizip II: ${v.part}. ${v.zu}. Bedeutung: ${v.meaning||'—'}.`,
          tags:['dynamic_conjugator',verb,tense],level:'A1-B2',
          germanSpeak:ans,_verb:verb,_tense:tense
        });
      }
    }
  }
  state._conjGenKey=memoKey;
  state._conjGenItems=out;
  return out;
}

function current(){return filteredItems()[state.index]}
function filteredItems(){
  const base=baseFilteredItems();
  const key=`${state.path}:${state.moduleId}:${state.mode}:${state.tenseFilter}:${state.sessionLimit}:${state.dynamicVerb}:${base.length}:${base[0]?.id||''}:${base.at(-1)?.id||''}`;
  if(state.poolKey!==key){
    state.poolKey=key;
    let pool=state.mode==='practice'?shuffle(base):base;
    if(state.mode==='practice'&&state.sessionLimit!=='all')pool=pool.slice(0,Number(state.sessionLimit)||20);
    state.poolItems=pool;
    if(state.index>=state.poolItems.length)state.index=0;
  }
  return state.poolItems;
}
function baseFilteredItems(){
  state.reviewEmptyReason='';
  let items=itemsForCurrentPath();
  if(state.mode==='review'){
    const dueIds=Object.entries(state.srs).filter(([_,v])=>v&&typeof v.due==='number'&&v.due<=Date.now()).map(([id])=>id);
    items=items.filter(x=>state.srs[x.id]&&dueIds.includes(x.id));
    if(!items.length){state.reviewEmptyReason='noSrs';const mistakeIds=new Set(state.mistakes.map(m=>m.id));items=itemsForCurrentPath().filter(x=>mistakeIds.has(x.id))}
  }
  return items;
}

function renderAll(){renderPath();renderModuleSelect();renderThemes();bindProfileControls();syncMobileControls();renderExercise();renderStats();renderMistakes();renderConjugator()}
function route(r){state.route=r;document.querySelectorAll('.top-tab').forEach(b=>b.classList.toggle('active',b.dataset.route===r));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));$(`${r}View`).classList.add('active-view');if(r==='mistakes')renderMistakes();if(r==='conjugator')renderConjugator()}
function setMode(m){state.mode=m;resetSession();document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active'));$({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m]).classList.add('active');renderExercise();renderStats()}

function renderExercise(){
  const p=PATHS.find(x=>x.id===state.path);
  const items=filteredItems();
  const item=items[state.index];
  $('currentPathLabel').textContent=p?.title||'Lernen';
  $('moduleTitle').textContent=p?.title||'Deutsch trainieren';
  $('moduleDescription').textContent=p?.sub||'';
  $('moduleCount').textContent=`${items.length} ${items.length===1?tr('item'):tr('items')}`;
  $('levelBadge').textContent=item?.level||'B1/B2';
  $('exercisePill').textContent=item?label(item.exerciseType):'Übung';
  $('itemIndex').textContent=items.length?`${Math.min(state.index+1,items.length)} / ${items.length}`:'—';
  // Progress bar
  const pct=items.length?Math.round((state.index/items.length)*100):0;
  $('cardProgressBar').style.width=pct+'%';
  if($('meterWrap'))$('meterWrap').setAttribute('aria-valuenow',pct);

  $('feedbackBox').className='feedback hidden';
  $('choiceZone').innerHTML='';$('answerZone').innerHTML='';
  $('secondaryAction').classList.add('hidden');
  $('conjugatorLink').classList.add('hidden');

  // Hero collapse: collapse once session is active
  const hero=$('heroCard');
  if(state.started&&item)hero.classList.add('collapsed');
  else hero.classList.remove('collapsed');

  if(!item){
    $('questionTitle').textContent=state.mode==='review'&&state.reviewEmptyReason==='noSrs'?'Review leer':'Keine Items';
    $('questionText').textContent=state.mode==='review'&&state.reviewEmptyReason==='noSrs'?tr('noSrs'):tr('empty');
    $('primaryAction').textContent=tr('start');
    $('ruleBox').innerHTML='—';$('exampleBox').innerHTML='—';
    return;
  }

  // Rule / example panel
  $('ruleBox').innerHTML=safeHtml(item.explanation||'—');
  $('exampleBox').innerHTML=safeHtml(item.example||item.answer||'—');

  if(state.sessionComplete){
    $('questionTitle').textContent=tr('complete');
    $('questionText').innerHTML=`<div class="session-complete-card">
      <div class="complete-icon">✓</div>
      <h3>${tr('complete')}</h3>
      <p>${items.length} ${items.length===1?tr('item'):tr('items')} abgeschlossen.</p>
    </div>`;
    // Single-click restart — primary button directly restarts
    $('primaryAction').textContent=tr('restart');
    state.started=false;
    return;
  }
  if(!state.started){
    $('questionTitle').textContent='Bereit?';
    $('questionText').textContent=tr('ready');
    $('primaryAction').textContent=tr('start');
    return;
  }
  $('questionTitle').textContent=item.moduleTitle||'Übung';
  $('questionText').textContent=item.prompt;
  renderInput(item);
  $('primaryAction').textContent=state.mode==='learn'?tr('next'):tr('check');
}

function renderInput(item){
  if(state.mode==='learn'||item.exerciseType==='flashcard'){
    $('answerZone').innerHTML=`<div class="learn-answer"><strong>${tr('answer')}:</strong><br>${esc(item.answer||'—')}</div>`;
    $('primaryAction').textContent=tr('next');
    state.checked=true;return;
  }
  if(item.choices&&item.choices.length){
    $('choiceZone').innerHTML=shuffle(item.choices).map(c=>`<button class="choice-btn" data-choice="${esc(c)}">${esc(c)}</button>`).join('');
    document.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>{
      state.selectedChoice=b.dataset.choice;
      document.querySelectorAll('.choice-btn').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
    });
  } else {
    $('answerZone').innerHTML=`<input id="answerInput" class="answer-input" autocomplete="off" placeholder="Antwort eingeben…">`;
    setTimeout(()=>$('answerInput')?.focus(),30);
  }
}

function primary(){
  if(state.sessionComplete){resetSession();renderExercise();return}
  if(!state.started){state.started=true;state.checked=false;renderExercise();return}
  const item=current();if(!item)return;
  if(state.mode==='learn'){next();return}
  checkAnswer(item);
}

function answersMatch(user,correct,item){
  const u=norm(user),c=norm(correct);
  if(u===c)return true;if(!u||!c)return false;
  const pronounOptional=new Set(['verb_conjugation','sentence_correction','word_order','translation_into_german','active_recall','gap_fill','correction','perfekt_builder']);
  const cw=c.split(' '),uw=u.split(' ');
  if(pronounOptional.has(item.exerciseType)&&cw.length>1&&cw.slice(1).join(' ')===uw.join(' '))return true;
  // Also accept: answer without leading article (for vocab)
  const noArticle=c.replace(/^(der|die|das|den|dem|des)\s+/,'');
  if(noArticle!==c&&u===noArticle)return true;
  // Gap fill: accept full sentence
  if(item.prompt&&item.prompt.includes('___')){const filled=norm(item.prompt.replace('___',correct));if(u===filled)return true}
  return false;
}

function checkAnswer(item){
  const user=state.selectedChoice||$('answerInput')?.value||'';
  const ok=answersMatch(user,item.answer,item);
  state.checked=true;

  // Visual feedback on choice buttons
  if(item.choices&&item.choices.length){
    document.querySelectorAll('.choice-btn').forEach(b=>{
      b.disabled=true;
      if(b.dataset.choice===item.answer)b.classList.add('correct-reveal');
      else if(b.dataset.choice===user&&!ok)b.classList.add('wrong-reveal');
    });
  }

  // Feedback content
  let fbHtml=ok
    ?`<span class="feedback-correct-mark">✓</span><strong>${tr('correct')}.</strong><br>${safeHtml(item.example||item.answer)}`
    :`<span class="feedback-wrong-mark">✗</span><strong>${tr('wrong')}.</strong><br><b>${tr('answer')}:</b> ${esc(item.answer)}<br><b>${tr('why')}</b> ${safeHtml(item.explanation||'')}`;

  // Deep-link to conjugator for verb_conjugation items
  if(item.exerciseType==='verb_conjugation'){
    const verbMatch=item.prompt.match(/\/ (\S+) \//);
    if(verbMatch){
      $('conjugatorLink').classList.remove('hidden');
      const verb=verbMatch[1];
      $('openConjugator').textContent=`${verb} ${tr('verbConjTable')} →`;
      $('openConjugator').onclick=()=>{
        state.verb=verb;
        const tm=item.prompt.split(' / ')[2]?.trim();
        if(tm)state.tense=tm;
        route('conjugator');
      };
    }
  }

  $('feedbackBox').className=`feedback ${ok?'ok':'bad'}`;
  $('feedbackBox').innerHTML=fbHtml;
  $('secondaryAction').textContent=tr('next');
  $('secondaryAction').classList.remove('hidden');
  updateStats(ok,item);
  if(!ok)addMistake(item,user);
  scheduleSrs(item,ok);
  renderStats();
}

// Skip item: moves to next without marking right or wrong
function skipItem(){
  if(!state.started||state.checked)return;
  const items=filteredItems();
  if(!items.length)return;
  // Move skipped item to end of pool so it returns later
  const skipped=state.poolItems.splice(state.index,1)[0];
  state.poolItems.push(skipped);
  // Don't advance index (next item shifted into current position)
  if(state.index>=state.poolItems.length)state.index=0;
  state.checked=false;state.selectedChoice='';
  renderExercise();
}

function statKey(item){return`${state.path}:${state.moduleId||'all'}:${item?.moduleId||'unknown'}`}
function updateStats(ok,item){
  const pathKey=state.path;const p=state.stats[pathKey]||{a:0,c:0};p.a++;if(ok)p.c++;state.stats[pathKey]=p;save('dw_modern_stats',state.stats);
  const mkey=statKey(item);const m=state.moduleStats[mkey]||{a:0,c:0};m.a++;if(ok)m.c++;state.moduleStats[mkey]=m;save('dw_modern_module_stats',state.moduleStats);
}
function scheduleSrs(item,ok){const cur=state.srs[item.id]||{box:0};const box=ok?Math.min(5,(cur.box||0)+1):1;const days=[0,1,3,7,14,30][box];state.srs[item.id]={box,due:Date.now()+days*86400000,seen:true};save(SRS_KEY,state.srs)}
function addMistake(item,user){state.mistakes=[{id:item.id,when:Date.now(),user,item},...state.mistakes.filter(m=>m.id!==item.id)].slice(0,120);save('dw_modern_mistakes',state.mistakes)}

function next(){
  const items=filteredItems();if(!items.length)return;
  const nextIdx=state.index+1;
  if(nextIdx>=items.length){state.sessionComplete=true;state.index=0;state.started=false;state.checked=false;state.selectedChoice='';renderExercise();return}
  state.index=nextIdx;state.started=true;state.checked=false;state.selectedChoice='';renderExercise();
}
function prev(){
  const items=filteredItems();if(!items.length)return;
  state.sessionComplete=false;state.index=Math.max(0,state.index-1);state.started=true;state.checked=false;state.selectedChoice='';renderExercise();
}
function dueCount(){return Object.values(state.srs).filter(v=>v&&typeof v.due==='number'&&v.due<=Date.now()).length}

function renderStats(){
  const s=state.stats[state.path]||{a:0,c:0};
  const pct=s.a?Math.round(100*s.c/s.a):0;
  $('todayScore').textContent=pct+'%';
  $('meterBar').style.width=pct+'%';
  if($('meterWrap'))$('meterWrap').setAttribute('aria-valuenow',pct);
  $('answeredCount').textContent=`${s.a} Antworten`;
  $('mistakeCount').textContent=`${state.mistakes.length} Fehler · ${dueCount()} ${tr('dueToday')}`;
  if($('progressLabel'))$('progressLabel').textContent=tr('sessionStats');
}
function renderMistakes(){
  if(!$('mistakeList'))return;
  if(!state.mistakes.length){$('mistakeList').innerHTML=`<p class="muted">Keine Fehler gespeichert. ${dueCount()} ${tr('dueToday')}.</p>`;return}
  $('mistakeList').innerHTML=state.mistakes.map((m,idx)=>`<div class="mistake-item">
    <strong>${esc(m.item.prompt)}</strong><br>
    <span>${tr('yourAnswer')}: ${esc(m.user||'—')}</span><br>
    <span>${tr('answer')}: ${esc(m.item.answer||'—')}</span>
    <p>${safeHtml(m.item.explanation||'')}</p>
    <button class="mistake-retry" data-idx="${idx}">${tr('retryMistake')} →</button>
  </div>`).join('');
  document.querySelectorAll('.mistake-retry').forEach(b=>b.onclick=()=>{
    const m=state.mistakes[Number(b.dataset.idx)];if(!m)return;
    // Launch a single-item practice session
    route('learn');selectPath(state.path);
    state.poolItems=[m.item];state.poolKey='retry:'+m.id;
    state.index=0;state.started=true;state.checked=false;state.selectedChoice='';
    renderExercise();
  });
}

function label(x){return({verb_conjugation:'Konjugation',gap_fill:'Lücke',multiple_choice:'Auswahl',sentence_correction:'Korrektur',flashcard:'Karte',translation_into_german:'Übersetzen',active_recall:'Aktiv erinnern',perfekt_builder:'Perfekt',connector_selection:'Konnektor',article_trainer:'Artikel',plural_trainer:'Plural',case_trainer:'Kasus'})[x]||x||'Übung'}
function speak(text){if(!text||!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(stripHtml(text));u.lang='de-DE';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}

async function loadConjugator(){try{state.conjugator=await vfetch('data/conjugator_verbs.json').then(r=>r.json());state.verb=Object.keys(state.conjugator.verbs)[0]}catch(e){console.warn('Could not load conjugator',e)}}
function renderConjugator(){if(!state.conjugator||state.route!=='conjugator')return;renderVerbList();renderVerbDetail()}
function renderVerbList(){
  if(!state.conjugator)return;
  const q=norm($('verbSearch')?.value||'');
  const starter=['sein','haben','werden','können','müssen','dürfen','sollen','wollen','mögen','arbeiten','antworten','beantworten','bekommen','bedeuten','berichten','vergleichen','machen','gehen','kommen','fahren','schreiben','sprechen','nehmen','geben','finden'];
  const all=Object.keys(state.conjugator.verbs).sort((a,b)=>a.localeCompare(b,'de'));
  let verbs;
  let meta='';
  if(q){
    verbs=all.filter(v=>norm(v).includes(q));
    meta=`${verbs.length} Treffer · ${all.length} Verben verfügbar`;
  }else if(state.showAllVerbs){
    verbs=all;
    meta=`Alle ${all.length} Verben`;
  }else{
    verbs=starter.filter(v=>state.conjugator.verbs[v]);
    meta=`Starterliste · ${verbs.length} angezeigt · ${all.length} verfügbar`;
  }
  const toggle=!q?`<button class="link-button" id="toggleVerbList">${state.showAllVerbs?'Starter anzeigen':'Alle anzeigen'}</button>`:'';
  $('verbList').innerHTML=`<div class="verb-list-meta"><span>${esc(meta)}</span>${toggle}</div>`+verbs.map(v=>`<button class="verb-btn ${v===state.verb?'active':''}" data-verb="${esc(v)}"><strong>${esc(v)}</strong><br><small>${esc(state.conjugator.verbs[v].meaning||'')}</small></button>`).join('');
  const toggleBtn=$('toggleVerbList');
  if(toggleBtn)toggleBtn.onclick=()=>{state.showAllVerbs=!state.showAllVerbs;renderVerbList()};
  document.querySelectorAll('.verb-btn').forEach(b=>b.onclick=()=>{state.verb=b.dataset.verb;state.tense='Präsens';renderVerbList();renderVerbDetail()});
}
function renderVerbDetail(){
  const v=state.conjugator.verbs[state.verb];if(!v)return;
  const keys={'Präsens':'present','Präteritum':'preterite','Perfekt':'perfect','Plusquamperfekt':'plusquam','Futur I':'futur1','Konjunktiv II':'konj2','Imperativ':'imperative'};
  $('verbMeta').innerHTML=`<div class="eyebrow">${esc(v.type)}</div><h2>${esc(state.verb)}</h2><div class="verb-chips"><span>Hilfsverb: ${esc(v.aux)}</span><span>Partizip II: ${esc(v.part)}</span><span>${esc(v.zu)}</span><span>${esc(v.meaning||'')}</span></div><p>${esc(v.example)}</p>`;
  $('tenseTabs').innerHTML=Object.keys(keys).map(t=>`<button class="tense-tab ${t===state.tense?'active':''}" data-tense="${t}" role="tab" aria-selected="${t===state.tense}">${t}</button>`).join('');
  document.querySelectorAll('.tense-tab').forEach(b=>b.onclick=()=>{state.tense=b.dataset.tense;renderVerbDetail()});
  const forms=v[keys[state.tense]]||[];
  const pronouns=state.tense==='Imperativ'?['du','ihr','Sie']:state.conjugator.pronouns;
  $('tenseTable').innerHTML=forms.map((f,i)=>`<div class="tense-row"><strong>${esc(pronouns[i]||'')}</strong><span>${esc(f)}</span></div>`).join('');
  $('verbPractice').innerHTML=`Übe <b>${esc(state.verb)}</b> im ${esc(state.tense)}.`;
}
function launchVerbPractice(){
  route('learn');selectPath('conjugation');
  state.moduleId='dynamic_conjugator';
  state.dynamicVerb=state.verb;
  state.tenseFilter=state.tense||'Präsens';
  state._conjGenKey=''; // force regeneration with new verb/tense
  renderModuleSelect();
  $('tenseFilter').value=state.tenseFilter;
  state.mode='practice';
  setMode('practice');
  state.started=true;
  renderExercise();
}

init();
