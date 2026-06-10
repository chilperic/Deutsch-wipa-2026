const $ = id => document.getElementById(id);

const SRS_KEY = 'dw_modern_srs';
const state = {
  manifest: null,
  modules: [],
  items: [],
  route: 'learn',
  path: 'conjugation',
  moduleId: 'all',
  index: 0,
  started: false,
  checked: false,
  selectedChoice: '',
  mode: 'practice',
  stats: load('dw_modern_stats', {}),
  moduleStats: load('dw_modern_module_stats', {}),
  mistakes: load('dw_modern_mistakes', []),
  srs: load(SRS_KEY, {}),
  lang: localStorage.dw_lang || 'de',
  theme: localStorage.dw_theme || 'light',
  conjugator: null,
  verb: null,
  tense: 'Präsens',
  sessionComplete: false,
  reviewEmptyReason: '',
  poolKey: '',
  poolItems: []
};

const LANGS = [
  ['de', 'Deutsch'], ['en', 'English'], ['fr', 'Français'], ['es', 'Español'],
  ['ar', 'العربية'], ['fa', 'فارسی'], ['uk', 'Українська'], ['ru', 'Русский'],
  ['pl', 'Polski'], ['tr', 'Türkçe']
];

const PATHS = [
  { id: 'conjugation', icon: '⚙️', title: 'Konjugation', sub: 'Verbtabellen, Modalverben, Infinitiv', cats: ['conjugation', 'konjugator'], match: ['modal', 'modalverb', 'infinitiv', 'infinitiv_zu'] },
  { id: 'syntax', icon: '🧩', title: 'Satzbau', sub: 'Verbposition, TeKaMoLo, Passiversatz', match: ['tekamolo', 'negation', 'nebensatz', 'satzordnung', 'satzvariation', 'passiv', 'passiversatz', 'final', 'modal_es'] },
  { id: 'cases', icon: '🎯', title: 'Fälle', sub: 'Akkusativ, Dativ, n-Deklination', match: ['kasus', 'n_deklination', 'n-deklination', 'pronomen'] },
  { id: 'prepositions', icon: '📍', title: 'Präpositionen', sub: 'lokal, temporal, Verben + Präposition', match: ['praeposition', 'präposition'] },
  { id: 'nouns', icon: '📚', title: 'Artikel & Nomen', sub: 'Genus, Plural, Nominalisierung', match: ['nomen', 'artikel', 'plural', 'genus'] },
  { id: 'adjectives', icon: '✨', title: 'Adjektive', sub: 'stark, schwach, gemischt', match: ['adjektiv'] },
  { id: 'connectors', icon: '🔗', title: 'Konnektoren', sub: 'temporal, kausal, konzessiv', match: ['konnektor', 'konnektoren', 'temporal', 'kausal', 'konzessiv', 'zweiteilige'] },
  { id: 'workplace', icon: '💼', title: 'Wortschatz Beruf', sub: 'Linie-Beruf Kapitel & Büro', cats: ['vocabulary', 'workplace'] }
];

const T = {
  de: {
    start: 'Sitzung starten', check: 'Prüfen', next: 'Weiter', restart: 'Neu starten',
    correct: 'Richtig', wrong: 'Noch nicht', answer: 'Richtige Antwort', why: 'Warum?',
    empty: 'In diesem Thema gibt es für diese Auswahl keine Items.', ready: 'Starte die Sitzung.',
    complete: 'Sitzung abgeschlossen', noSrs: 'Noch keine fälligen Wiederholungen. Beantworte zuerst einige Übungen.',
    allModules: 'Alle Module', dueToday: 'fällig heute', item: 'Item', items: 'Items', yourAnswer: 'Deine Antwort'
  },
  en: {
    start: 'Start session', check: 'Check', next: 'Next', restart: 'Restart',
    correct: 'Correct', wrong: 'Not yet', answer: 'Correct answer', why: 'Why?',
    empty: 'No items for this selection.', ready: 'Start the session.',
    complete: 'Session complete', noSrs: 'No due reviews yet. Answer a few exercises first.',
    allModules: 'All modules', dueToday: 'due today', item: 'item', items: 'items', yourAnswer: 'Your answer'
  },
  fr: {
    start: 'Commencer', check: 'Vérifier', next: 'Suivant', restart: 'Recommencer',
    correct: 'Correct', wrong: 'Pas encore', answer: 'Bonne réponse', why: 'Pourquoi ?',
    empty: 'Aucun item pour cette sélection.', ready: 'Commence la session.',
    complete: 'Session terminée', noSrs: 'Aucune révision prévue. Réponds d’abord à quelques exercices.',
    allModules: 'Tous les modules', dueToday: 'à réviser aujourd’hui', item: 'item', items: 'items', yourAnswer: 'Ta réponse'
  },
  es: {
    start: 'Empezar', check: 'Comprobar', next: 'Siguiente', restart: 'Reiniciar',
    correct: 'Correcto', wrong: 'Todavía no', answer: 'Respuesta correcta', why: '¿Por qué?',
    empty: 'No hay elementos para esta selección.', ready: 'Empieza la sesión.',
    complete: 'Sesión completada', noSrs: 'Aún no hay repasos pendientes. Responde primero algunos ejercicios.',
    allModules: 'Todos los módulos', dueToday: 'para repasar hoy', item: 'ítem', items: 'ítems', yourAnswer: 'Tu respuesta'
  },
  ar: {
    start: 'ابدأ الجلسة', check: 'تحقق', next: 'التالي', restart: 'إعادة البدء',
    correct: 'صحيح', wrong: 'ليس بعد', answer: 'الإجابة الصحيحة', why: 'لماذا؟',
    empty: 'لا توجد عناصر لهذا الاختيار.', ready: 'ابدأ الجلسة.',
    complete: 'اكتملت الجلسة', noSrs: 'لا توجد مراجعات مستحقة بعد. أجب عن بعض التمارين أولاً.',
    allModules: 'كل الوحدات', dueToday: 'مستحق اليوم', item: 'عنصر', items: 'عناصر', yourAnswer: 'إجابتك'
  },
  fa: {
    start: 'شروع جلسه', check: 'بررسی', next: 'بعدی', restart: 'شروع دوباره',
    correct: 'درست', wrong: 'هنوز نه', answer: 'پاسخ درست', why: 'چرا؟',
    empty: 'برای این انتخاب موردی وجود ندارد.', ready: 'جلسه را شروع کن.',
    complete: 'جلسه کامل شد', noSrs: 'هنوز مرور زمان‌بندی‌شده‌ای وجود ندارد. اول چند تمرین را پاسخ بده.',
    allModules: 'همهٔ بخش‌ها', dueToday: 'موعد امروز', item: 'مورد', items: 'مورد', yourAnswer: 'پاسخ تو'
  },
  uk: {
    start: 'Почати', check: 'Перевірити', next: 'Далі', restart: 'Почати знову',
    correct: 'Правильно', wrong: 'Ще ні', answer: 'Правильна відповідь', why: 'Чому?',
    empty: 'Немає завдань для цього вибору.', ready: 'Почни сесію.',
    complete: 'Сесію завершено', noSrs: 'Поки немає повторень. Спочатку виконай кілька вправ.',
    allModules: 'Усі модулі', dueToday: 'на сьогодні', item: 'завдання', items: 'завдання', yourAnswer: 'Твоя відповідь'
  },
  ru: {
    start: 'Начать', check: 'Проверить', next: 'Далее', restart: 'Начать заново',
    correct: 'Правильно', wrong: 'Еще нет', answer: 'Правильный ответ', why: 'Почему?',
    empty: 'Нет заданий для этого выбора.', ready: 'Начни сессию.',
    complete: 'Сессия завершена', noSrs: 'Пока нет повторений. Сначала ответь на несколько упражнений.',
    allModules: 'Все модули', dueToday: 'на сегодня', item: 'задание', items: 'задания', yourAnswer: 'Твой ответ'
  },
  pl: {
    start: 'Rozpocznij', check: 'Sprawdź', next: 'Dalej', restart: 'Zacznij od nowa',
    correct: 'Poprawnie', wrong: 'Jeszcze nie', answer: 'Poprawna odpowiedź', why: 'Dlaczego?',
    empty: 'Brak zadań dla tego wyboru.', ready: 'Rozpocznij sesję.',
    complete: 'Sesja zakończona', noSrs: 'Brak powtórek. Najpierw rozwiąż kilka ćwiczeń.',
    allModules: 'Wszystkie moduły', dueToday: 'na dziś', item: 'zadanie', items: 'zadania', yourAnswer: 'Twoja odpowiedź'
  },
  tr: {
    start: 'Oturumu başlat', check: 'Kontrol et', next: 'Sonraki', restart: 'Yeniden başlat',
    correct: 'Doğru', wrong: 'Henüz değil', answer: 'Doğru cevap', why: 'Neden?',
    empty: 'Bu seçim için öğe yok.', ready: 'Oturumu başlat.',
    complete: 'Oturum tamamlandı', noSrs: 'Henüz tekrar yok. Önce birkaç alıştırma çöz.',
    allModules: 'Tüm modüller', dueToday: 'bugün tekrar', item: 'öğe', items: 'öğe', yourAnswer: 'Cevabın'
  }
};

function tr(k) { return T[state.lang]?.[k] ?? T.en[k] ?? T.de[k] ?? k; }
function load(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function norm(s = '') { return String(s).trim().toLowerCase().replace(/[„“”]/g, '"').replace(/[.!?。؟،,;:]+$/g, '').replace(/\s+/g, ' '); }
function esc(s = '') { return String(s).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function safeHtml(s = '') { return esc(s).replace(/&lt;br\s*\/?&gt;/gi, '<br>'); }
function stripHtml(s = '') { const d = document.createElement('div'); d.innerHTML = safeHtml(s); return d.textContent || d.innerText || ''; }
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

async function init() {
  document.documentElement.dataset.theme = state.theme;
  updateDirection();
  renderLangs();
  bind();
  await loadData();
  await loadConjugator();
  renderPath();
  selectPath('conjugation');
  route('learn');
  renderAll();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
}

function updateDirection() {
  document.documentElement.dir = ['ar', 'fa'].includes(state.lang) ? 'rtl' : 'ltr';
}

function renderLangs() {
  $('languageSelect').innerHTML = LANGS.map(([c, n]) => `<option value="${c}" ${c === state.lang ? 'selected' : ''}>${n}</option>`).join('');
}

function bind() {
  $('languageSelect').onchange = e => { state.lang = e.target.value; localStorage.dw_lang = state.lang; updateDirection(); renderAll(); };
  $('themeButton').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.dw_theme = state.theme; document.documentElement.dataset.theme = state.theme; };
  document.querySelectorAll('.top-tab').forEach(b => b.onclick = () => route(b.dataset.route));
  $('mobileMenu').onclick = () => toggleDrawer(true);
  $('backdrop').onclick = () => toggleDrawer(false);
  $('primaryAction').onclick = primary;
  $('secondaryAction').onclick = next;
  $('prevButton').onclick = prev;
  $('speakButton').onclick = () => {
    const item = current();
    if (!item) return;
    speak(item.example || item.prompt || item.answer || '');
  };
  $('modePractice').onclick = () => setMode('practice');
  $('modeLearn').onclick = () => setMode('learn');
  $('modeReview').onclick = () => setMode('review');
  $('clearMistakes').onclick = () => { state.mistakes = []; save('dw_modern_mistakes', state.mistakes); renderMistakes(); renderStats(); };
  $('verbSearch').oninput = renderVerbList;
  $('moduleSelect').onchange = e => { state.moduleId = e.target.value; resetSession(); renderExercise(); };
  $('verbPracticeButton').onclick = launchVerbPractice;
  document.addEventListener('keydown', e => {
    if (state.route !== 'learn') return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (e.key === 'Enter' && !e.shiftKey && tag !== 'textarea' && tag !== 'select') {
      if (!state.started || !state.checked) primary(); else next();
    }
    if (e.key === 'ArrowRight' && !$('secondaryAction').classList.contains('hidden')) next();
    if (e.key === 'ArrowLeft') prev();
  });
}

function toggleDrawer(open) {
  $('sidebar').classList.toggle('open', open);
  $('backdrop').classList.toggle('hidden', !open);
  document.querySelector('.main').toggleAttribute('inert', open);
}

async function loadData() {
  state.manifest = await fetch('data-manifest.json').then(r => r.json());
  const res = await Promise.allSettled(state.manifest.modules.map(async m => {
    if (m.category === 'practice') return null;
    const raw = await fetch(m.path).then(r => r.json());
    return { ...m, raw, items: normalizeModule(raw, m) };
  }));
  state.modules = res.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
}

function normalizeModule(raw, meta) {
  if (meta.category === 'konjugator') return [];
  let arr = raw.items || raw.words || raw.vocabulary_entries || raw.vocabulary || raw.questions || [];
  if (raw.exercise_pool) arr = raw.exercise_pool.flatMap(x => x.cases || []);
  return arr.map((it, i) => normalizeItem(it, meta, i)).filter(Boolean);
}

function normalizeItem(it, meta, i) {
  const d = it.data || it;
  const isVocab = meta.category === 'vocabulary' || meta.path.includes('vokabular');
  const term = d.word || d.term || d.german || d.title || d.prompt;
  let answer = d.answer || d.solution || d.correct || d.english_equivalent || d.meaning || d.translations?.English || d.translation || d.correct_adjective_inflection || d.correct_noun_inflection || '';
  let prompt = d.prompt || d.display || term || '';
  let type = d.exerciseType || d.type || inferType(prompt, d, meta);

  if (prompt.includes('___') && (type === 'perfekt_builder' || type === 'choice')) type = 'gap_fill';
  if (d.type === 'classify') type = 'multiple_choice';
  if (d.type === 'choice' && !d.choices && !d.options && !String(prompt).includes('___')) type = inferType(prompt, d, meta);

  if (isVocab) {
    const de = d.word || d.term || d.german || term;
    const trans = d.translations?.English || d.english_equivalent || d.meaning || answer || '';
    if (type === 'translation_into_german') prompt = `Übersetze ins Deutsche: ${trans}`;
    else if (type === 'translation_from_german') prompt = `Übersetze: ${de}`;
    else prompt = `${de}`;
    if (type === 'gap_fill') type = 'flashcard';
  }

  const explanation = richExplanation(d, meta);
  const example = d.example || d.example_de || d.example_sentence || d.essential_collocations?.[0]?.example || d.collocations?.[0]?.example || '';
  const choices = d.choices || d.options || makeChoices(answer, type, d);
  return {
    id: d.id || `${meta.id}_${i}`,
    moduleId: meta.id,
    moduleTitle: meta.title,
    category: meta.category,
    exerciseType: type,
    prompt,
    answer,
    choices,
    explanation,
    example,
    raw: d,
    tags: d.tags || [],
    level: d.level || d.cefr || rawLevel(meta)
  };
}

function rawLevel(m) { return (m.title || '').includes('B2') ? 'B2' : 'B1/B2'; }

function inferType(prompt, d, meta) {
  const p = String(prompt || '');
  const hay = `${p} ${meta.title} ${meta.id}`;
  if (d.choices || d.options || d.type === 'classify') return 'multiple_choice';
  if (p.includes('___')) return 'gap_fill';
  if (/korrig|correct/i.test(p)) return 'sentence_correction';
  if (/conjug|Präsens|Präteritum|Perfekt|Modalverben/i.test(hay)) return 'verb_conjugation';
  return 'flashcard';
}

function richExplanation(d, meta) {
  if (d.explanation && typeof d.explanation === 'string' && !d.explanation.includes('Focus on meaning')) return d.explanation;
  if (d.grammar_clarification) return d.grammar_clarification;
  if (d.grammar?.pattern) return d.grammar.pattern;
  if (d.essential_collocations?.length) return d.essential_collocations.map(c => `${c.collocation} — ${c.example}`).join('<br>');
  if (d.collocations?.length) return d.collocations.map(c => `${c.collocation || c} ${c.example ? '— ' + c.example : ''}`).join('<br>');
  return `Thema: ${meta.title}. Achte auf Form, Position und Kontext.`;
}

function makeChoices(answer, type, context = {}) {
  const ans = String(answer || '').trim();
  if (!ans) return [];
  if (type === 'article_trainer') return shuffle(['der', 'die', 'das']);
  if (type === 'connector_selection' || /konnektor|connector/i.test(String(context.tags || context.category || '') + ' ' + String(context.prompt || ''))) {
    const pool = ['und', 'aber', 'oder', 'sondern', 'weil', 'obwohl', 'trotzdem', 'deshalb', 'damit', 'bevor'];
    return [...new Set([ans, ...pool.filter(x => x !== ans)])].slice(0, 4);
  }
  if (type === 'multiple_choice') {
    const valid = context.choices || context.options;
    return valid && valid.length ? valid : [];
  }
  return [];
}

function renderPath() {
  $('pathNav').innerHTML = PATHS.map(p => {
    const count = modulesForPath(p.id).reduce((a, m) => a + m.items.length, 0);
    return `<button class="path-btn" data-path="${p.id}"><span class="path-icon">${p.icon}</span><span><span class="path-title">${esc(p.title)}</span><span class="path-sub">${esc(p.sub)}</span></span><span class="path-count">${count}</span></button>`;
  }).join('');
  document.querySelectorAll('.path-btn').forEach(b => b.onclick = () => { selectPath(b.dataset.path); toggleDrawer(false); });
}

function modulesForPath(id) {
  const p = PATHS.find(x => x.id === id);
  if (!p) return [];
  return state.modules.filter(m => {
    const hay = `${m.id} ${m.title} ${m.path}`.toLowerCase();
    return (p.cats && p.cats.includes(m.category)) || (p.match && p.match.some(s => hay.includes(s)));
  });
}

function selectPath(id) {
  state.path = id;
  state.moduleId = 'all';
  resetSession();
  document.querySelectorAll('.path-btn').forEach(b => b.classList.toggle('active', b.dataset.path === id));
  renderModuleSelect();
  renderAll();
}

function renderModuleSelect() {
  const mods = modulesForPath(state.path);
  $('moduleSelect').innerHTML = `<option value="all">${tr('allModules')}</option>` + mods.map(m => `<option value="${esc(m.id)}">${esc(m.title)} (${m.items.length})</option>`).join('');
  $('moduleSelect').value = state.moduleId;
}

function itemsForCurrentPath() {
  const mods = modulesForPath(state.path).filter(m => state.moduleId === 'all' || m.id === state.moduleId);
  return mods.flatMap(m => m.items);
}

function resetSession() {
  state.index = 0;
  state.started = false;
  state.checked = false;
  state.selectedChoice = '';
  state.sessionComplete = false;
  state.poolKey = '';
  state.poolItems = [];
}

function baseFilteredItems() {
  state.reviewEmptyReason = '';
  let items = itemsForCurrentPath();
  if (state.mode === 'review') {
    const dueIds = Object.entries(state.srs)
      .filter(([_, v]) => v && typeof v.due === 'number' && v.due <= Date.now())
      .map(([id]) => id);
    items = items.filter(x => state.srs[x.id] && dueIds.includes(x.id));
    if (!items.length) {
      state.reviewEmptyReason = 'noSrs';
      const mistakeIds = new Set(state.mistakes.map(m => m.id));
      items = itemsForCurrentPath().filter(x => mistakeIds.has(x.id));
    }
  }
  return items;
}

function filteredItems() {
  const base = baseFilteredItems();
  const key = `${state.path}:${state.moduleId}:${state.mode}:${base.map(x => x.id).join('|')}`;
  if (state.poolKey !== key) {
    state.poolKey = key;
    state.poolItems = state.mode === 'practice' ? shuffle(base) : base;
    if (state.index >= state.poolItems.length) state.index = 0;
  }
  return state.poolItems;
}

function current() { return filteredItems()[state.index]; }

function renderAll() {
  renderPath();
  renderModuleSelect();
  renderExercise();
  renderStats();
  renderMistakes();
  renderConjugator();
}

function route(r) {
  state.route = r;
  document.querySelectorAll('.top-tab').forEach(b => b.classList.toggle('active', b.dataset.route === r));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  $(`${r}View`).classList.add('active-view');
  if (r === 'mistakes') renderMistakes();
  if (r === 'conjugator') renderConjugator();
}

function setMode(m) {
  state.mode = m;
  resetSession();
  document.querySelectorAll('.mode-chip').forEach(b => b.classList.remove('active'));
  $({ practice: 'modePractice', learn: 'modeLearn', review: 'modeReview' }[m]).classList.add('active');
  renderExercise();
  renderStats();
}

function renderExercise() {
  const p = PATHS.find(x => x.id === state.path);
  const items = filteredItems();
  const item = items[state.index];
  $('currentPathLabel').textContent = p?.title || 'Lernen';
  $('moduleTitle').textContent = p?.title || 'Deutsch trainieren';
  $('moduleDescription').textContent = p?.sub || '';
  $('moduleCount').textContent = `${items.length} ${items.length === 1 ? tr('item') : tr('items')}`;
  $('levelBadge').textContent = item?.level || 'B1/B2';
  $('exercisePill').textContent = item ? label(item.exerciseType) : 'Übung';
  $('itemIndex').textContent = items.length ? `${Math.min(state.index + 1, items.length)} / ${items.length}` : '—';
  $('feedbackBox').className = 'feedback hidden';
  $('choiceZone').innerHTML = '';
  $('answerZone').innerHTML = '';
  $('secondaryAction').classList.add('hidden');

  if (!item) {
    $('questionTitle').textContent = state.mode === 'review' && state.reviewEmptyReason === 'noSrs' ? 'Review leer' : 'Keine Items';
    $('questionText').textContent = state.mode === 'review' && state.reviewEmptyReason === 'noSrs' ? tr('noSrs') : tr('empty');
    $('primaryAction').textContent = tr('start');
    $('ruleBox').innerHTML = '—';
    $('exampleBox').innerHTML = '—';
    return;
  }

  $('ruleBox').innerHTML = safeHtml(item.explanation || '—');
  $('exampleBox').innerHTML = safeHtml(item.example || item.prompt || item.answer || '—');

  if (state.sessionComplete) {
    $('questionTitle').textContent = tr('complete');
    $('questionText').textContent = `✓ Alle ${items.length} ${items.length === 1 ? tr('item') : tr('items')} abgeschlossen.`;
    $('primaryAction').textContent = tr('restart');
    state.started = false;
    return;
  }

  if (!state.started) {
    $('questionTitle').textContent = 'Bereit?';
    $('questionText').textContent = tr('ready');
    $('primaryAction').textContent = tr('start');
    return;
  }

  $('questionTitle').textContent = item.moduleTitle || 'Übung';
  $('questionText').textContent = item.prompt;
  renderInput(item);
  $('primaryAction').textContent = state.mode === 'learn' ? tr('next') : tr('check');
}

function renderInput(item) {
  if (state.mode === 'learn' || item.exerciseType === 'flashcard') {
    $('answerZone').innerHTML = `<div class="learn-answer"><strong>${tr('answer')}:</strong><br>${esc(item.answer || '—')}</div>`;
    $('primaryAction').textContent = tr('next');
    state.checked = true;
    return;
  }
  if (item.choices && item.choices.length) {
    $('choiceZone').innerHTML = shuffle(item.choices).map(c => `<button class="choice-btn" data-choice="${esc(c)}">${esc(c)}</button>`).join('');
    document.querySelectorAll('.choice-btn').forEach(b => b.onclick = () => {
      state.selectedChoice = b.dataset.choice;
      document.querySelectorAll('.choice-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    });
  } else {
    $('answerZone').innerHTML = `<input id="answerInput" class="answer-input" autocomplete="off" placeholder="Antwort eingeben…">`;
    setTimeout(() => $('answerInput')?.focus(), 30);
  }
}

function primary() {
  if (state.sessionComplete) {
    resetSession();
    renderExercise();
    return;
  }
  if (!state.started) {
    state.started = true;
    state.checked = false;
    renderExercise();
    return;
  }
  const item = current();
  if (!item) return;
  if (state.mode === 'learn') { next(); return; }
  checkAnswer(item);
}

function answersMatch(user, correct, item) {
  const u = norm(user);
  const c = norm(correct);
  if (u === c) return true;
  if (!u || !c) return false;
  if (c.includes('___')) return false;

  const pronounOptional = new Set(['verb_conjugation', 'sentence_correction', 'word_order', 'translation_into_german', 'active_recall', 'gap_fill', 'correction', 'perfekt_builder']);
  const cWords = c.split(' ');
  const uWords = u.split(' ');
  if (pronounOptional.has(item.exerciseType) && cWords.length > 1 && cWords.slice(1).join(' ') === uWords.join(' ')) return true;

  // Accept the full sentence when the official answer is only the missing gap.
  if (item.prompt && item.prompt.includes('___')) {
    const filled = norm(item.prompt.replace('___', correct));
    if (u === filled) return true;
  }
  return false;
}

function checkAnswer(item) {
  const user = state.selectedChoice || $('answerInput')?.value || '';
  const ok = answersMatch(user, item.answer, item);
  state.checked = true;
  $('feedbackBox').className = `feedback ${ok ? 'ok' : 'bad'}`;
  $('feedbackBox').innerHTML = ok
    ? `<strong>${tr('correct')}.</strong><br>${safeHtml(item.example || item.answer)}`
    : `<strong>${tr('wrong')}.</strong><br><b>${tr('answer')}:</b> ${esc(item.answer)}<br><b>${tr('why')}</b> ${safeHtml(item.explanation || '')}`;
  $('secondaryAction').textContent = tr('next');
  $('secondaryAction').classList.remove('hidden');
  updateStats(ok, item);
  if (!ok) addMistake(item, user);
  scheduleSrs(item, ok);
  renderStats();
}

function statKey(item) { return `${state.path}:${state.moduleId || 'all'}:${item?.moduleId || 'unknown'}`; }
function updateStats(ok, item) {
  const pathKey = state.path;
  const p = state.stats[pathKey] || { a: 0, c: 0 };
  p.a++; if (ok) p.c++; state.stats[pathKey] = p; save('dw_modern_stats', state.stats);
  const mkey = statKey(item);
  const m = state.moduleStats[mkey] || { a: 0, c: 0 };
  m.a++; if (ok) m.c++; state.moduleStats[mkey] = m; save('dw_modern_module_stats', state.moduleStats);
}

function scheduleSrs(item, ok) {
  const cur = state.srs[item.id] || { box: 0 };
  const box = ok ? Math.min(5, (cur.box || 0) + 1) : 1;
  const days = [0, 1, 3, 7, 14, 30][box];
  state.srs[item.id] = { box, due: Date.now() + days * 86400000, seen: true };
  save(SRS_KEY, state.srs);
}

function addMistake(item, user) {
  state.mistakes = [{ id: item.id, when: Date.now(), user, item }, ...state.mistakes.filter(m => m.id !== item.id)].slice(0, 120);
  save('dw_modern_mistakes', state.mistakes);
}

function next() {
  const items = filteredItems();
  if (!items.length) return;
  const nextIdx = state.index + 1;
  if (nextIdx >= items.length) {
    state.sessionComplete = true;
    state.index = 0;
    state.started = false;
    state.checked = false;
    state.selectedChoice = '';
    renderExercise();
    return;
  }
  state.index = nextIdx;
  state.started = true;
  state.checked = false;
  state.selectedChoice = '';
  renderExercise();
}

function prev() {
  const items = filteredItems();
  if (!items.length) return;
  state.sessionComplete = false;
  state.index = Math.max(0, state.index - 1);
  state.started = true;
  state.checked = false;
  state.selectedChoice = '';
  renderExercise();
}

function dueCount() {
  return Object.values(state.srs).filter(v => v && typeof v.due === 'number' && v.due <= Date.now()).length;
}

function renderStats() {
  const s = state.stats[state.path] || { a: 0, c: 0 };
  const pct = s.a ? Math.round(100 * s.c / s.a) : 0;
  $('todayScore').textContent = pct + '%';
  $('meterBar').style.width = pct + '%';
  $('answeredCount').textContent = `${s.a} Antworten`;
  $('mistakeCount').textContent = `${state.mistakes.length} Fehler · ${dueCount()} ${tr('dueToday')}`;
}

function renderMistakes() {
  if (!$('mistakeList')) return;
  if (!state.mistakes.length) {
    $('mistakeList').innerHTML = `<p class="muted">Keine Fehler gespeichert. ${dueCount()} ${tr('dueToday')}.</p>`;
    return;
  }
  $('mistakeList').innerHTML = state.mistakes.map(m => `<div class="mistake-item"><strong>${esc(m.item.prompt)}</strong><br><span>${tr('yourAnswer')}: ${esc(m.user || '—')}</span><br><span>${tr('answer')}: ${esc(m.item.answer || '—')}</span><p>${safeHtml(m.item.explanation || '')}</p></div>`).join('');
}

function label(x) {
  return ({
    verb_conjugation: 'Konjugation', gap_fill: 'Lücke', multiple_choice: 'Auswahl', sentence_correction: 'Korrektur',
    flashcard: 'Karte', translation_into_german: 'Übersetzen', active_recall: 'Aktiv erinnern', perfekt_builder: 'Perfekt',
    connector_selection: 'Konnektor', article_trainer: 'Artikel', plural_trainer: 'Plural', case_trainer: 'Kasus'
  })[x] || x || 'Übung';
}

function speak(text) {
  if (!text || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(stripHtml(text));
  utterance.lang = 'de-DE';
  utterance.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

async function loadConjugator() {
  try {
    state.conjugator = await fetch('data/conjugator_verbs.json').then(r => r.json());
    state.verb = Object.keys(state.conjugator.verbs)[0];
  } catch (e) { console.warn('Could not load conjugator', e); }
}

function renderConjugator() {
  if (!state.conjugator || state.route !== 'conjugator') return;
  renderVerbList();
  renderVerbDetail();
}

function renderVerbList() {
  if (!state.conjugator) return;
  const q = norm($('verbSearch')?.value || '');
  const verbs = Object.keys(state.conjugator.verbs).filter(v => norm(v).includes(q));
  $('verbList').innerHTML = verbs.map(v => `<button class="verb-btn ${v === state.verb ? 'active' : ''}" data-verb="${esc(v)}"><strong>${esc(v)}</strong><br><small>${esc(state.conjugator.verbs[v].meaning)}</small></button>`).join('');
  document.querySelectorAll('.verb-btn').forEach(b => b.onclick = () => { state.verb = b.dataset.verb; state.tense = 'Präsens'; renderVerbList(); renderVerbDetail(); });
}

function renderVerbDetail() {
  const v = state.conjugator.verbs[state.verb];
  if (!v) return;
  const keys = { 'Präsens': 'present', 'Präteritum': 'preterite', 'Perfekt': 'perfect', 'Plusquamperfekt': 'plusquam', 'Futur I': 'futur1', 'Konjunktiv II': 'konj2', 'Imperativ': 'imperative' };
  $('verbMeta').innerHTML = `<div class="eyebrow">${esc(v.type)}</div><h2>${esc(state.verb)}</h2><div class="verb-chips"><span>Hilfsverb: ${esc(v.aux)}</span><span>Partizip II: ${esc(v.part)}</span><span>${esc(v.zu)}</span></div><p>${esc(v.example)}</p>`;
  $('tenseTabs').innerHTML = Object.keys(keys).map(t => `<button class="tense-tab ${t === state.tense ? 'active' : ''}" data-tense="${t}">${t}</button>`).join('');
  document.querySelectorAll('.tense-tab').forEach(b => b.onclick = () => { state.tense = b.dataset.tense; renderVerbDetail(); });
  const forms = v[keys[state.tense]] || [];
  const pronouns = state.tense === 'Imperativ' ? ['du', 'ihr', 'Sie'] : state.conjugator.pronouns;
  $('tenseTable').innerHTML = forms.map((f, i) => `<div class="tense-row"><strong>${esc(pronouns[i] || '')}</strong><span>${esc(f)}</span></div>`).join('');
  $('verbPractice').innerHTML = `<strong>Übungsidee:</strong> Schreibe drei eigene Sätze mit <b>${esc(state.verb)}</b>: Präsens, Präteritum und Perfekt. Danach starte gezielte Übungen.`;
}

function launchVerbPractice() {
  route('learn');
  selectPath('conjugation');
  const mod = modulesForPath('conjugation').find(m => m.id.includes('konjugator_drills'));
  if (mod) state.moduleId = mod.id;
  renderModuleSelect();
  state.mode = 'practice';
  setMode('practice');
  const all = filteredItems();
  const idx = all.findIndex(it => norm(it.prompt + ' ' + it.answer + ' ' + it.example).includes(norm(state.verb)) || norm(it.tags.join(' ')).includes(norm(state.verb)));
  if (idx >= 0) state.index = idx;
  state.started = true;
  renderExercise();
}

init();
