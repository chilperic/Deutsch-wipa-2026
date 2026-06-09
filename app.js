// ── Language config ────────────────────────────────────────────────────────────
const LANGS = [
  ['de','Deutsch','ltr'], ['en','English','ltr'], ['fr','Français','ltr'], ['es','Español','ltr'],
  ['it','Italiano','ltr'], ['pt','Português','ltr'], ['uk','Українська','ltr'], ['ru','Русский','ltr'],
  ['pl','Polski','ltr'], ['tr','Türkçe','ltr'], ['ar','العربية','rtl'], ['fa','فارسی','rtl'],
  ['zh','中文','ltr'], ['ja','日本語','ltr'], ['ko','한국어','ltr'], ['th','ไทย','ltr']
];
const CODE_TO_NAME = {
  de:'German', en:'English', fr:'French', es:'Spanish', it:'Italian',
  pt:'Portuguese', ar:'Arabic', fa:'Persian', uk:'Ukrainian', ru:'Russian',
  pl:'Polish', tr:'Turkish', zh:'Chinese', ja:'Japanese', ko:'Korean', th:'Thai'
};

// ── i18n strings ────────────────────────────────────────────────────────────────
const BASE_EN = {
  subtitle:'B1/B2 Beruf trainer', learnerName:'Learner name',
  learningPath:'Learning path', module:'Module', progress:'Progress',
  answered:'Answered', correct:'Correct', mistakes:'Mistakes',
  restartModule:'Restart module', exercise:'Exercise',
  learnMode:'Learn', practiceMode:'Practice', challengeMode:'Challenge',
  mistakeReview:'Mistakes', install:'Install',
  previous:'Previous', start:'Start', check:'Check', next:'Next',
  helper:'Helper', mistakeBank:'Mistake bank', clearMistakes:'Clear mistakes',
  vocabulary:'Vocabulary', grammar:'Grammar', conjugation:'Verb forms',
  communication:'Communication', integration:'Everyday & integration',
  exam:'Exam training', training:'Exercise types',
  writing:'Writing', reading:'Reading', speaking:'Speaking',
  correctMsg:'Correct.', incorrectMsg:'Incorrect.', submittedMsg:'Submitted for self-check.',
  correctAnswer:'Model / correct answer', yourAnswer:'Your answer',
  why:'Why?', rule:'Rule', example:'Example',
  addedMistake:'Added to mistake bank.', noMistakes:'No mistakes yet.',
  loading:'Loading content…', writeAnswer:'Write your answer…',
  writeLongAnswer:'Write your text here…', chooseAnswer:'Choose an answer.',
  translation:'Translation', explanation:'Explanation', commonMistake:'Common mistake',
  modeLearnIntro:'Read the card, then press Start when ready.',
  allTypes:'All exercise types', checklist:'Checklist',
  selfCheck:'Compare your answer with the model. The app cannot fully grade open writing/speaking yet.',
  itemType:'Exercise type', wordCount:'words', noItemsInModule:'No items match this filter.'
};

const T = {
  en: BASE_EN,
  de: { ...BASE_EN,
    subtitle:'B1/B2 Berufstrainer', learnerName:'Name', learningPath:'Lernweg',
    module:'Modul', progress:'Fortschritt', answered:'Beantwortet', correct:'Richtig',
    mistakes:'Fehler', restartModule:'Modul neu starten', exercise:'Übung',
    learnMode:'Lernen', practiceMode:'Üben', challengeMode:'Challenge',
    mistakeReview:'Fehler', install:'Installieren',
    previous:'Zurück', start:'Start', check:'Prüfen', next:'Weiter',
    helper:'Hilfe', mistakeBank:'Fehlerbank', clearMistakes:'Fehler löschen',
    vocabulary:'Wortschatz', grammar:'Grammatik', conjugation:'Verbformen',
    communication:'Kommunikation', integration:'Alltag & Integration',
    exam:'Prüfungsvorbereitung', training:'Übungstypen',
    writing:'Schreiben', reading:'Lesen', speaking:'Sprechen',
    correctMsg:'Richtig.', incorrectMsg:'Falsch.',
    submittedMsg:'Zur Selbstkontrolle eingereicht.',
    correctAnswer:'Musterlösung / richtige Antwort', yourAnswer:'Deine Antwort',
    why:'Warum?', rule:'Regel', example:'Beispiel',
    addedMistake:'Zur Fehlerbank hinzugefügt.', noMistakes:'Noch keine Fehler.',
    loading:'Inhalte werden geladen…', writeAnswer:'Antwort schreiben…',
    writeLongAnswer:'Schreibe deinen Text hier…', chooseAnswer:'Antwort wählen.',
    translation:'Übersetzung', explanation:'Erklärung', commonMistake:'Typischer Fehler',
    modeLearnIntro:'Lies die Karte. Drücke danach Start.',
    allTypes:'Alle Übungstypen', checklist:'Checkliste',
    selfCheck:'Vergleiche deine Antwort mit der Musterlösung. Offene Aufgaben werden nicht vollständig automatisch bewertet.',
    itemType:'Übungstyp', wordCount:'Wörter', noItemsInModule:'Keine Einträge für diesen Filter.'
  },
  fr: { ...BASE_EN,
    subtitle:'Allemand B1/B2 professionnel', learnerName:'Nom', learningPath:'Parcours',
    module:'Module', progress:'Progrès', answered:'Répondu', correct:'Correct',
    mistakes:'Erreurs', restartModule:'Recommencer', exercise:'Exercice',
    learnMode:'Apprendre', practiceMode:'Pratiquer', challengeMode:'Défi',
    mistakeReview:'Erreurs', install:'Installer',
    previous:'Précédent', start:'Commencer', check:'Vérifier', next:'Suivant',
    helper:'Aide', mistakeBank:'Banque d\'erreurs', clearMistakes:'Effacer',
    vocabulary:'Vocabulaire', grammar:'Grammaire', conjugation:'Formes verbales',
    communication:'Communication', integration:'Vie quotidienne & intégration',
    exam:'Entraînement examen', training:'Types d\'exercices',
    writing:'Écriture', reading:'Lecture', speaking:'Expression orale',
    correctMsg:'Correct.', incorrectMsg:'Incorrect.',
    submittedMsg:'Envoyé pour auto-évaluation.',
    correctAnswer:'Réponse modèle / correcte', yourAnswer:'Ta réponse',
    why:'Pourquoi ?', rule:'Règle', example:'Exemple',
    addedMistake:'Ajouté à la banque d\'erreurs.', noMistakes:'Pas encore d\'erreurs.',
    loading:'Chargement…', writeAnswer:'Écris ta réponse…',
    writeLongAnswer:'Écris ton texte ici…', chooseAnswer:'Choisis une réponse.',
    translation:'Traduction', explanation:'Explication', commonMistake:'Erreur courante',
    modeLearnIntro:'Lis la carte, puis appuie sur Commencer.',
    allTypes:'Tous les types', checklist:'Liste de contrôle',
    selfCheck:'Compare ta réponse avec le modèle. L\'app ne peut pas encore corriger automatiquement les productions libres.',
    itemType:'Type d\'exercice', wordCount:'mots', noItemsInModule:'Aucun élément pour ce filtre.'
  },
  es: { ...BASE_EN,
    subtitle:'Entrenador B1/B2 profesional', learnerName:'Nombre', learningPath:'Ruta',
    module:'Módulo', progress:'Progreso', answered:'Respondidas', correct:'Correctas',
    mistakes:'Errores', restartModule:'Reiniciar', exercise:'Ejercicio',
    learnMode:'Aprender', practiceMode:'Practicar', challengeMode:'Reto',
    mistakeReview:'Errores', install:'Instalar',
    previous:'Anterior', start:'Empezar', check:'Comprobar', next:'Siguiente',
    helper:'Ayuda', mistakeBank:'Banco de errores', clearMistakes:'Borrar',
    vocabulary:'Vocabulario', grammar:'Gramática', conjugation:'Formas verbales',
    communication:'Comunicación', integration:'Vida cotidiana e integración',
    exam:'Entrenamiento examen', training:'Tipos de ejercicio',
    writing:'Escritura', reading:'Lectura', speaking:'Hablar',
    correctMsg:'Correcto.', incorrectMsg:'Incorrecto.',
    submittedMsg:'Enviado para autoevaluación.',
    correctAnswer:'Modelo / respuesta correcta', yourAnswer:'Tu respuesta',
    why:'¿Por qué?', rule:'Regla', example:'Ejemplo',
    addedMistake:'Añadido al banco de errores.', noMistakes:'Aún sin errores.',
    loading:'Cargando…', writeAnswer:'Escribe tu respuesta…',
    writeLongAnswer:'Escribe tu texto aquí…', chooseAnswer:'Elige una respuesta.',
    translation:'Traducción', explanation:'Explicación', commonMistake:'Error frecuente',
    modeLearnIntro:'Lee la tarjeta y pulsa Empezar cuando estés listo.',
    allTypes:'Todos los tipos', checklist:'Lista de verificación',
    selfCheck:'Compara tu respuesta con el modelo. La app no puede corregir completamente las producciones libres.',
    itemType:'Tipo de ejercicio', wordCount:'palabras', noItemsInModule:'No hay elementos para este filtro.'
  },
  ar: { ...BASE_EN,
    subtitle:'مدرب ألمانية B1/B2 للعمل', learnerName:'اسم المتعلم',
    learningPath:'مسار التعلم', module:'الوحدة', progress:'التقدم',
    answered:'تمت الإجابة', correct:'صحيح', mistakes:'أخطاء',
    restartModule:'إعادة الوحدة', exercise:'تمرين',
    learnMode:'تعلّم', practiceMode:'تدريب', challengeMode:'تحدي',
    mistakeReview:'الأخطاء', install:'تثبيت',
    previous:'السابق', start:'ابدأ', check:'تحقق', next:'التالي',
    helper:'مساعدة', mistakeBank:'بنك الأخطاء', clearMistakes:'مسح الأخطاء',
    vocabulary:'المفردات', grammar:'القواعد', conjugation:'تصريف الأفعال',
    communication:'التواصل', integration:'الحياة اليومية والاندماج',
    exam:'التدريب على الامتحان', training:'أنواع التمارين',
    writing:'الكتابة', reading:'القراءة', speaking:'التحدث',
    correctMsg:'صحيح.', incorrectMsg:'خطأ.',
    submittedMsg:'تم الإرسال للمراجعة الذاتية.',
    correctAnswer:'النموذج / الإجابة الصحيحة', yourAnswer:'إجابتك',
    why:'لماذا؟', rule:'القاعدة', example:'مثال',
    addedMistake:'أضيف إلى بنك الأخطاء.', noMistakes:'لا أخطاء حتى الآن.',
    loading:'جارٍ التحميل…', writeAnswer:'اكتب إجابتك…',
    writeLongAnswer:'اكتب نصك هنا…', chooseAnswer:'اختر إجابة.',
    translation:'الترجمة', explanation:'الشرح', commonMistake:'خطأ شائع',
    modeLearnIntro:'اقرأ البطاقة ثم اضغط ابدأ عندما تكون مستعداً.',
    allTypes:'كل أنواع التمارين', checklist:'قائمة التحقق',
    selfCheck:'قارن إجابتك مع النموذج. لا يمكن للتطبيق تصحيح الإنتاج الحر بالكامل.',
    itemType:'نوع التمرين', wordCount:'كلمة', noItemsInModule:'لا توجد عناصر لهذا الفلتر.'
  },
  fa: { ...BASE_EN,
    subtitle:'تمرین آلمانی B1/B2 برای کار', learnerName:'نام زبان‌آموز',
    learningPath:'مسیر یادگیری', module:'بخش', progress:'پیشرفت',
    answered:'پاسخ داده‌شده', correct:'درست', mistakes:'اشتباه‌ها',
    restartModule:'شروع دوباره', exercise:'تمرین',
    learnMode:'یادگیری', practiceMode:'تمرین', challengeMode:'چالش',
    mistakeReview:'اشتباه‌ها', install:'نصب',
    previous:'قبلی', start:'شروع', check:'بررسی', next:'بعدی',
    helper:'کمک', mistakeBank:'بانک اشتباه‌ها', clearMistakes:'پاک کردن',
    vocabulary:'واژگان', grammar:'گرامر', conjugation:'صرف فعل',
    communication:'ارتباط', integration:'زندگی روزمره و ادغام',
    exam:'آمادگی آزمون', training:'نوع تمرین‌ها',
    writing:'نوشتن', reading:'خواندن', speaking:'گفتار',
    correctMsg:'درست.', incorrectMsg:'نادرست.',
    submittedMsg:'برای خودارزیابی ثبت شد.',
    correctAnswer:'نمونه / پاسخ درست', yourAnswer:'پاسخ شما',
    why:'چرا؟', rule:'قاعده', example:'مثال',
    addedMistake:'به بانک اشتباه‌ها اضافه شد.', noMistakes:'هنوز اشتباهی نیست.',
    loading:'در حال بارگذاری…', writeAnswer:'پاسخ را بنویسید…',
    writeLongAnswer:'متن خود را اینجا بنویسید…', chooseAnswer:'یک پاسخ انتخاب کنید.',
    translation:'ترجمه', explanation:'توضیح', commonMistake:'اشتباه رایج',
    modeLearnIntro:'کارت را بخوانید، سپس شروع را فشار دهید.',
    allTypes:'همه نوع تمرین‌ها', checklist:'فهرست بررسی',
    selfCheck:'پاسخ خود را با نمونه مقایسه کنید. برنامه نمی‌تواند تولید آزاد را کاملاً ارزیابی کند.',
    itemType:'نوع تمرین', wordCount:'کلمه', noItemsInModule:'هیچ موردی برای این فیلتر وجود ندارد.'
  },
  uk: { ...BASE_EN,
    subtitle:'Тренажер німецької B1/B2 для роботи', learnerName:'Ім\'я',
    learningPath:'Навчальний шлях', module:'Модуль', progress:'Прогрес',
    answered:'Відповіді', correct:'Правильно', mistakes:'Помилки',
    restartModule:'Почати знову', exercise:'Вправа',
    learnMode:'Вивчати', practiceMode:'Практика', challengeMode:'Виклик',
    mistakeReview:'Помилки', install:'Встановити',
    previous:'Назад', start:'Старт', check:'Перевірити', next:'Далі',
    helper:'Допомога', mistakeBank:'Банк помилок', clearMistakes:'Очистити',
    vocabulary:'Словник', grammar:'Граматика', conjugation:'Форми дієслів',
    communication:'Комунікація', integration:'Щоденне життя та інтеграція',
    exam:'Підготовка до іспиту', training:'Типи вправ',
    writing:'Письмо', reading:'Читання', speaking:'Говоріння',
    correctMsg:'Правильно.', incorrectMsg:'Неправильно.',
    submittedMsg:'Надіслано для самоперевірки.',
    correctAnswer:'Модель / правильна відповідь', yourAnswer:'Ваша відповідь',
    why:'Чому?', rule:'Правило', example:'Приклад',
    addedMistake:'Додано до банку помилок.', noMistakes:'Ще немає помилок.',
    loading:'Завантаження…', writeAnswer:'Напишіть відповідь…',
    writeLongAnswer:'Напишіть свій текст тут…', chooseAnswer:'Оберіть відповідь.',
    translation:'Переклад', explanation:'Пояснення', commonMistake:'Типова помилка',
    modeLearnIntro:'Прочитайте картку, потім натисніть Старт.',
    allTypes:'Усі типи', checklist:'Контрольний список',
    selfCheck:'Порівняйте вашу відповідь із зразком. Відкриті завдання не перевіряються автоматично.',
    itemType:'Тип вправи', wordCount:'слів', noItemsInModule:'Немає елементів для цього фільтра.'
  }
};
// Languages without translations yet: interface stays in English.
// Listed here so they appear in the selector without false promise.
for (const code of ['it','pt','ru','pl','tr','zh','ja','ko','th']) T[code] = BASE_EN;

// ── Exercise type registry ───────────────────────────────────────────────────
// Groups used to build <optgroup> in the type selector.
const EXERCISE_TYPE_GROUPS = [
  { label: 'Vocabulary', types: [
    ['flashcard','Flashcard'], ['article_trainer','Article trainer'],
    ['plural_trainer','Plural trainer'], ['translation_into_german','Translation → German'],
    ['translation_from_german','Translation from German']
  ]},
  { label: 'Grammar', types: [
    ['gap_fill','Gap fill'], ['multiple_choice','Multiple choice'],
    ['case_trainer','Case trainer'], ['verb_conjugation','Verb conjugation'],
    ['perfekt_builder','Perfekt builder'], ['connector_selection','Connector selection'],
    ['word_order','Word order'], ['sentence_correction','Sentence correction']
  ]},
  { label: 'Communication', types: [
    ['mini_dialogue_completion','Mini-dialogue'], ['formal_email_writing','Formal email'],
    ['semi_formal_message','Semi-formal message'], ['opinion_text','Opinion text'],
    ['report_summary','Report / summary'], ['application_writing','Application writing'],
    ['speaking_prompt','Speaking prompt'], ['reading_comprehension','Reading comprehension']
  ]},
  { label: 'Review', types: [
    ['mistake_review','Mistake review']
  ]}
];
// Flat list for lookups
const EXERCISE_TYPES = [['all','allTypes'], ...EXERCISE_TYPE_GROUPS.flatMap(g => g.types)];
// Open-ended types: graded on word count, not string match
const OPEN_TYPES = new Set([
  'formal_email_writing','semi_formal_message','opinion_text',
  'report_summary','application_writing','speaking_prompt'
]);
// Sentence types: allow subject-pronoun omission in grading
const SENTENCE_TYPES = new Set([
  'verb_conjugation','perfekt_builder','word_order',
  'sentence_correction','translation_into_german','gap_fill'
]);

const CATEGORIES = ['vocabulary','grammar','conjugation','communication','training','writing','reading','speaking'];

// ── Utilities ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const tr = key => (T[state.lang] && T[state.lang][key]) || BASE_EN[key] || key;

function escapeHtml(s = '') {
  return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function normalizeAnswer(s = '') {
  return String(s).trim().toLowerCase()
    .replace(/[„""]/g, '"')
    .replace(/[.!?。؟،,;:]+$/g, '')
    .replace(/\s+/g, ' ');
}

// Tolerant comparison: allows subject-pronoun omission for sentence types.
function answersMatch(user, item) {
  const u = normalizeAnswer(user);
  const c = normalizeAnswer(item.answer || '');
  if (u === c) return true;
  // For sentence-type exercises, accept if user typed the sentence without
  // the leading subject pronoun (e.g. "würde gerne arbeiten" for "Ich würde gerne arbeiten").
  if (SENTENCE_TYPES.has(item.exerciseType)) {
    const cWords = c.split(' ');
    if (cWords.length > 1) {
      // Drop first word of correct answer and compare
      if (cWords.slice(1).join(' ') === u) return true;
    }
    // Also allow if answer contains a parenthetical article prefix that user omitted
    // e.g. answer "die Messen", user "Messen"
    const withoutArticle = c.replace(/^(der|die|das|den|dem|des)\s+/i, '');
    if (withoutArticle !== c && withoutArticle === u) return true;
  }
  return false;
}

function isRTL() { return (LANGS.find(l => l[0] === state.lang)?.[2]) === 'rtl'; }

function localized(v) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[CODE_TO_NAME[state.lang]] || v[state.lang] || v.German || v.English || Object.values(v)[0] || '';
}

function typeLabel(type) {
  const rec = EXERCISE_TYPES.find(x => x[0] === type);
  return rec ? (tr(rec[1]) || rec[1]) : type.replaceAll('_', ' ');
}

// Fisher-Yates shuffle (returns a new array)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── App state ───────────────────────────────────────────────────────────────
const state = {
  lang:          localStorage.getItem('dw_lang')          || 'en',
  theme:         localStorage.getItem('dw_theme')         || 'auto',
  category:      localStorage.getItem('dw_category')      || 'vocabulary',
  moduleId:      localStorage.getItem('dw_module')        || '',
  mode:          localStorage.getItem('dw_mode')          || 'practice',
  exerciseType:  localStorage.getItem('dw_exercise_type') || 'all',
  manifest:      null,
  modules:       [],
  // currentItems: the base item list for the selected module (unshuffled)
  currentItems:  [],
  // pool: the active working list (may be shuffled, filtered, or from mistake bank)
  pool:          [],
  index:         0,
  started:       false,
  checked:       false,
  selectedChoice:'',
  stats:         JSON.parse(localStorage.getItem('dw_stats')    || '{}'),
  mistakes:      JSON.parse(localStorage.getItem('dw_mistakes') || '[]'),
  globalStats:   JSON.parse(localStorage.getItem('dw_global')   || '{"answered":0,"correct":0}'),
  deferredPrompt:null
};

// ── Initialisation ──────────────────────────────────────────────────────────
async function init() {
  setupLanguageSelect();
  setupExerciseTypeSelect();
  setupEvents();
  applyTheme();
  applyLanguage();
  $('questionText').textContent = tr('loading');

  state.manifest = await fetch('data-manifest.json').then(r => r.json());

  // Parallel fetch of all 55 modules instead of sequential await-in-loop
  await loadAllModules();

  renderCategories();

  // Resolve the saved module (or pick first available)
  const first =
    state.modules.find(m => m.id === state.moduleId && m.category === state.category) ||
    state.modules.find(m => m.category === state.category) ||
    state.modules[0];
  if (first) { state.category = first.category; state.moduleId = first.id; }
  selectModule(state.moduleId, false);

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── Parallel module loading ─────────────────────────────────────────────────
async function loadAllModules() {
  const results = await Promise.allSettled(
    state.manifest.modules.map(async meta => {
      const data = await fetch(meta.path).then(r => r.json());
      const items = normalizeModule(data, meta);
      return { ...meta, raw: data, items, count: items.length };
    })
  );
  state.modules = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  results
    .filter(r => r.status === 'rejected')
    .forEach(r => console.warn('Module load failed:', r.reason));
}

// ── Module normalisation ────────────────────────────────────────────────────
function normalizeModule(data, meta) {
  // Handle vocabulary_entries format
  if (data.vocabulary_entries && !data.words) {
    data.words = data.vocabulary_entries.map((e, idx) => ({
      id: e.id || `${meta.id}_${idx}`,
      word: `${e.term}${e.plural ? ', ' + e.plural : ''}`,
      level: e.cefr || data.level || 'B1/B2',
      tags: ['collocation', e.corporate_context || meta.title],
      translations: { English: e.english_equivalent || '' },
      data: {
        grammar: {
          article: (e.term || '').split(' ')[0],
          base:    (e.term || '').replace(/^(der|die|das)\s+/, ''),
          plural:  e.plural || ''
        },
        example_de:   e.essential_collocations?.[0]?.example || '',
        explanation:  `${e.corporate_context || ''}. ${e.essential_collocations?.map(c => c.collocation).join(' · ') || ''}`,
        collocations: e.essential_collocations || []
      }
    }));
  }

  const arr = data.items || data.words || [];
  const out = [];
  arr.forEach((it, idx) => {
    if (data.words) {
      out.push(...normalizeVocabItem(it, idx, data, meta));
    } else {
      out.push(normalizeStandardItem(it, idx, data, meta));
    }
  });
  // Filter out items with no prompt or no answer/openEnded flag
  return out.filter(x => x && x.prompt && String(x.answer || x.openEnded).length);
}

function normalizeStandardItem(it, idx, data, meta) {
  const exType = it.exerciseType || inferExerciseType(it, meta);
  const checklist = [...(it.checklist || [])];
  if (it.required_structural_components?.length)
    checklist.push(...it.required_structural_components.map(x => `Structure: ${x}`));
  if (it.mandatory_vocabulary_tokens?.length)
    checklist.push(`Mandatory vocabulary: ${it.mandatory_vocabulary_tokens.join(', ')}`);
  if (it.evaluation_hints?.minimum_word_count)
    checklist.push(`Minimum words: ${it.evaluation_hints.minimum_word_count}`);

  return {
    id:           it.id || `${meta.id}_${idx}`,
    module:       meta.title,
    category:     meta.category,
    kind:         it.type || exType,
    exerciseType: exType,
    prompt:       it.prompt || it.display || it.question || it.prompt_instruction || '',
    answer:       it.answer || it.model_answer || '',
    display:      it.display || it.category || '',
    choices:      it.choices || [],
    explanation:  it.explanation || it.example || it.meaning || it.prompt_instruction || '',
    example:      it.example || '',
    level:        it.level || it.cefr_level || data.level || 'B1/B2',
    tags:         it.tags || [],
    openEnded:    !!it.openEnded || OPEN_TYPES.has(exType),
    minWords:     it.evaluation_hints?.minimum_word_count || (OPEN_TYPES.has(exType) ? 25 : 0),
    checklist,
    passage:      it.passage || '',
    raw:          it
  };
}

function normalizeVocabItem(it, idx, data, meta) {
  const d    = it.data || {};
  const translations = d.translations || it.translations || {};
  const name = it.word || it.display || it.answer || '';
  const grammar  = d.grammar || {};
  const article  = grammar.article || extractArticle(name);
  const base     = grammar.base || name.replace(/^(der|die|das)\s+/, '').split(',')[0].trim();
  const plural   = grammar.plural || extractPlural(name, article, base);

  // Prefer collocations over the generic boilerplate explanation text
  const collocationText = d.collocations?.length
    ? d.collocations.map(c => c.collocation + (c.example ? ` — ${c.example}` : '')).join('; ')
    : '';
  const explanation = collocationText || localized(d.explanation || it.explanation || d.grammar_clarification || '');
  const example  = d.example_de || it.example_de || d.example || it.example || '';
  const trans    = getTranslation(translations);

  const common = {
    module: meta.title, category: meta.category,
    level: it.level || data.level || 'B1/B2',
    tags: it.tags || [data.chapter || meta.title],
    translations, example, explanation, raw: it
  };
  const id = it.id || `${meta.id}_${idx}`;
  const items = [];

  items.push({
    ...common, id: `${id}_flash`, kind: 'vocab', exerciseType: 'flashcard',
    prompt: `Flashcard: ${name}`, answer: trans || name, display: name,
    openEnded: false, minWords: 0, choices: [], checklist: [], passage: ''
  });
  if (trans) items.push({
    ...common, id: `${id}_into_de`, kind: 'vocab', exerciseType: 'translation_into_german',
    prompt: `${trans} → Deutsch`, answer: name, display: name,
    openEnded: false, minWords: 0, choices: [], checklist: [], passage: ''
  });
  if (trans) items.push({
    ...common, id: `${id}_from_de`, kind: 'vocab', exerciseType: 'translation_from_german',
    prompt: `German → ${CODE_TO_NAME[state.lang] || 'translation'}: ${name}`,
    answer: trans, display: name,
    openEnded: false, minWords: 0, choices: [], checklist: [], passage: ''
  });
  if (article) items.push({
    ...common, id: `${id}_article`, kind: 'vocab', exerciseType: 'article_trainer',
    prompt: `Artikel: ___ ${base}`, answer: article, display: name,
    choices: ['der','die','das'],
    explanation: localized(d.grammar_clarification) || `Learn this noun as: ${article} ${base}.`,
    openEnded: false, minWords: 0, checklist: [], passage: ''
  });
  if (plural) {
    // Strip any leading "die " so user answer "Messen" matches stored answer "Messen"
    const pluralAnswer = plural.replace(/^die\s+/i, '').trim();
    items.push({
      ...common, id: `${id}_plural`, kind: 'vocab', exerciseType: 'plural_trainer',
      prompt: `Plural: ${article ? article + ' ' : ''}${base} → die ___`,
      answer: pluralAnswer, display: name,
      explanation: localized(d.grammar_clarification) || `Plural: die ${pluralAnswer}.`,
      openEnded: false, minWords: 0, choices: [], checklist: [], passage: ''
    });
  }
  return items;
}

function extractArticle(s) {
  const m = String(s).match(/^(der|die|das)\s+/i);
  return m ? m[1].toLowerCase() : '';
}
function extractPlural(name, article, base) {
  const m = String(name).match(/,\s*([^,]+)$/);
  if (!m) return '';
  const hint = m[1].trim();
  if (hint.startsWith('-')) return base + hint.slice(1);
  return hint.replace(/^die\s+/i, '');
}

// Fixed: the two branches previously both returned 'gap_fill'.
function inferExerciseType(it, meta) {
  const t  = (it.type || '');
  const s  = ((meta.id || '') + ' ' + (meta.title || '') + ' ' + (it.module || '') + ' ' + (it.prompt || '')).toLowerCase();
  if (t.includes('choice') || (it.choices && it.choices.length))
    return s.includes('konnektor') ? 'connector_selection' : 'multiple_choice';
  if (s.includes('artikel') || s.includes('genus'))       return 'article_trainer';
  if (s.includes('plural'))                               return 'plural_trainer';
  if (s.includes('kasus') || s.includes('dativ') || s.includes('akkusativ')) return 'case_trainer';
  if (s.includes('perfekt'))                              return 'perfekt_builder';
  if (s.includes('verb') || s.includes('konjunktiv') || s.includes('reflexiv') || s.includes('trennbar'))
                                                          return 'verb_conjugation';
  if (s.includes('konnektor'))                            return 'connector_selection';
  if (s.includes('tekamolo') || s.includes('satzordnung') || s.includes('word order'))
                                                          return 'word_order';
  if (s.includes('translate into german'))                return 'translation_into_german';
  if (s.includes('translate'))                            return 'translation_from_german';
  // FIX: non-gap items default to flashcard, not gap_fill
  return String(it.prompt || '').includes('___') ? 'gap_fill' : 'flashcard';
}

function getTranslation(translations = {}) {
  const name = CODE_TO_NAME[state.lang];
  return translations[name] || translations[state.lang] ||
         translations.English || translations.French ||
         translations.Arabic  || translations.Persian ||
         translations.German  || '';
}

// ── Setup functions ─────────────────────────────────────────────────────────
function setupLanguageSelect() {
  $('languageSelect').innerHTML = LANGS.map(([code, label]) =>
    `<option value="${code}">${label}</option>`
  ).join('');
  $('languageSelect').value = state.lang;
}

function setupExerciseTypeSelect() {
  // Build grouped <optgroup> options
  const allOpt = `<option value="all">${tr('allTypes')}</option>`;
  const groups = EXERCISE_TYPE_GROUPS.map(g =>
    `<optgroup label="${escapeHtml(g.label)}">${
      g.types.map(([val, label]) => `<option value="${val}">${escapeHtml(label)}</option>`).join('')
    }</optgroup>`
  ).join('');
  $('exerciseTypeSelect').innerHTML = allOpt + groups;
  $('exerciseTypeSelect').value = state.exerciseType;
}

function setupEvents() {
  $('languageSelect').addEventListener('change', e => {
    state.lang = e.target.value;
    localStorage.setItem('dw_lang', state.lang);
    applyLanguage();
    renderAll();
  });
  $('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : state.theme === 'light' ? 'auto' : 'dark';
    localStorage.setItem('dw_theme', state.theme);
    applyTheme();
  });

  $('learnerName').value = localStorage.getItem('dw_name') || '';
  $('learnerName').addEventListener('input', e => localStorage.setItem('dw_name', e.target.value));

  $('moduleSelect').addEventListener('change', e => selectModule(e.target.value, true));

  $('modeSelect').value = state.mode;
  $('modeSelect').addEventListener('change', e => {
    state.mode = e.target.value;
    localStorage.setItem('dw_mode', state.mode);
    resetRun();
    buildPool();
    renderExercise();
  });

  $('exerciseTypeSelect').addEventListener('change', e => {
    state.exerciseType = e.target.value;
    localStorage.setItem('dw_exercise_type', state.exerciseType);
    resetRun();
    buildPool();
    renderExercise();
  });

  $('startButton').addEventListener('click', startSession);
  $('checkButton').addEventListener('click', checkAnswer);
  $('nextButton').addEventListener('click', nextItem);
  $('prevButton').addEventListener('click', prevItem);

  // Enter in text input triggers Check (if available), or Next (if already checked)
  $('answerInput').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (!$('checkButton').disabled) checkAnswer();
    else if (!$('nextButton').disabled) nextItem();
  });

  // Global keyboard shortcuts: ← / → for Prev / Next; Enter to check/next
  document.addEventListener('keydown', e => {
    // Skip if focus is inside a text input / textarea
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key === 'ArrowRight' && !$('nextButton').disabled)  nextItem();
    if (e.key === 'ArrowLeft'  && !$('prevButton').disabled)  prevItem();
    if (e.key === 'Enter'      && !$('checkButton').disabled) checkAnswer();
    if (e.key === 'Enter'      && !$('nextButton').disabled && $('checkButton').disabled) nextItem();
  });

  $('resetModule').addEventListener('click', () => {
    delete state.stats[statKey()];
    saveStats();
    resetRun();
    buildPool();
    renderAll();
  });
  $('clearMistakes').addEventListener('click', () => {
    state.mistakes = [];
    saveMistakes();
    renderMistakes();
    renderStats();
    if (state.mode === 'mistakes') { buildPool(); renderExercise(); }
  });

  // Event delegation for category nav (avoids re-adding listeners on every renderCategories)
  $('categoryNav').addEventListener('click', e => {
    const btn = e.target.closest('.cat-button');
    if (!btn) return;
    state.category = btn.dataset.cat;
    localStorage.setItem('dw_category', state.category);
    const first = state.modules.find(m => m.category === state.category);
    if (first) selectModule(first.id, true);
    renderCategories();
    toggleDrawer(false);
  });

  $('menuToggle').addEventListener('click', () => toggleDrawer(true));
  $('mobileDrawerBackdrop').addEventListener('click', () => toggleDrawer(false));

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    state.deferredPrompt = e;
    $('installButton').classList.remove('hidden');
  });
  $('installButton').addEventListener('click', async () => {
    if (state.deferredPrompt) {
      state.deferredPrompt.prompt();
      state.deferredPrompt = null;
      $('installButton').classList.add('hidden');
    }
  });
}

// ── Pool management ─────────────────────────────────────────────────────────
// buildPool() constructs state.pool from state.currentItems and state.mode.
// Called whenever module, mode, or exerciseType changes.
function buildPool() {
  let base;
  if (state.mode === 'mistakes') {
    base = state.mistakes.map(m => m.item).filter(Boolean);
  } else if (state.mode === 'challenge') {
    // Challenge: draw from ALL modules, shuffled
    base = state.modules.flatMap(m => m.items);
  } else {
    base = state.currentItems;
  }

  // Apply exercise-type filter
  const filtered = state.exerciseType === 'all'
    ? base
    : base.filter(i => i.exerciseType === state.exerciseType);

  // Practice / Challenge: shuffle; Learn: sequential
  state.pool = (state.mode === 'practice' || state.mode === 'challenge')
    ? shuffle(filtered)
    : filtered;

  // Keep index in bounds
  if (state.index >= state.pool.length) state.index = 0;
}

function currentItem() {
  return state.pool[state.index] || state.pool[0] || null;
}

// ── Module selection ────────────────────────────────────────────────────────
function selectModule(id, persist) {
  // Resolve the id to an actual module; fallback to first module
  const mod = state.modules.find(m => m.id === id) || state.modules[0];
  if (!mod) return;
  // Use the resolved id (not the raw argument, which may be stale)
  state.moduleId   = mod.id;
  state.category   = mod.category;
  state.currentItems = mod.items;
  resetRun();
  buildPool();
  if (persist) {
    localStorage.setItem('dw_module',   state.moduleId);
    localStorage.setItem('dw_category', state.category);
  }
  renderAll();
}

function resetRun() {
  state.index         = 0;
  state.started       = false;
  state.checked       = false;
  state.selectedChoice = '';
}

// ── Rendering ───────────────────────────────────────────────────────────────
function renderAll() {
  renderCategories();
  renderModuleSelect();
  renderExercise();
  renderStats();
  renderMistakes();
}

function renderCategories() {
  $('categoryNav').innerHTML = CATEGORIES.map(cat => {
    const count = state.modules.filter(m => m.category === cat).length;
    return `<button class="cat-button ${cat === state.category ? 'active' : ''}" data-cat="${cat}">
      ${tr(cat)} <span class="minor">${count}</span>
    </button>`;
  }).join('');
  // Note: click is handled by event delegation on #categoryNav (set up once in setupEvents)
}

function renderModuleSelect() {
  const mods = state.modules.filter(m => m.category === state.category);
  $('moduleSelect').innerHTML = mods.map(m =>
    `<option value="${m.id}">${escapeHtml(m.title)} · ${m.count}</option>`
  ).join('');
  $('moduleSelect').value = state.moduleId;
}

function renderExercise() {
  const mod  = state.modules.find(m => m.id === state.moduleId);
  const pool = state.pool;
  if (state.index >= pool.length) state.index = 0;
  const item = currentItem();

  $('currentPath').textContent   = `${tr(state.category)} · ${mod ? mod.title : ''}`;
  $('exercise-title').textContent = state.mode === 'mistakes'
    ? tr('mistakeReview')
    : (mod ? mod.title : tr('exercise'));
  $('moduleCount').textContent = mod
    ? `${pool.length} / ${mod.count} items · ${tr(state.category)} · ${typeLabel(state.exerciseType)}`
    : '';
  $('itemIndex').textContent = pool.length ? `${state.index + 1} / ${pool.length}` : '0 / 0';
  $('itemLevel').textContent  = item?.level || 'B1/B2';

  // Clear previous state
  $('feedbackBox').className  = 'feedback-box hidden';
  $('feedbackBox').innerHTML  = '';
  $('learnBlock').classList.add('hidden');
  $('choiceList').classList.add('hidden');
  $('choiceList').innerHTML   = '';
  $('answerInput').value      = '';
  $('answerTextArea').value   = '';
  $('answerInput').classList.add('hidden');
  $('answerTextArea').classList.add('hidden');

  // Empty-state handling with context-appropriate message
  if (!item) {
    if (state.mode === 'mistakes') {
      $('questionText').textContent = tr('noMistakes');
    } else if (state.exerciseType !== 'all') {
      $('questionText').textContent = tr('noItemsInModule');
    } else {
      $('questionText').textContent = tr('loading');
    }
    updateButtons();
    return;
  }

  if (!state.started) {
    $('questionText').textContent = tr('modeLearnIntro');
    renderLearnBlock(item);
  } else if (state.mode === 'learn' || item.exerciseType === 'flashcard') {
    $('questionText').textContent = item.prompt;
    renderLearnBlock(item);
  } else {
    $('questionText').textContent = item.prompt;
    renderInputFor(item);
  }

  renderHint(item);
  updateButtons();
}

function renderInputFor(item) {
  if (item.choices && item.choices.length) {
    $('choiceList').classList.remove('hidden');
    $('choiceList').innerHTML = item.choices.map(c =>
      `<button class="choice-button ${c === state.selectedChoice ? 'selected' : ''}" data-choice="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    ).join('');
    $('choiceList').querySelectorAll('.choice-button').forEach(b => {
      b.addEventListener('click', () => {
        state.selectedChoice = b.dataset.choice;
        $('choiceList').querySelectorAll('.choice-button').forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
      });
    });
  } else if (item.openEnded) {
    $('answerTextArea').classList.remove('hidden');
    $('answerTextArea').placeholder = tr('writeLongAnswer');
    setTimeout(() => $('answerTextArea').focus(), 50);
  } else {
    $('answerInput').classList.remove('hidden');
    $('answerInput').placeholder = tr('writeAnswer');
    setTimeout(() => $('answerInput').focus(), 50);
  }
}

function renderLearnBlock(item) {
  const trans = item.translations ? getTranslation(item.translations) : '';
  const exp   = localized(item.explanation);
  const parts = [];

  parts.push(`<p><span class="type-badge">${escapeHtml(typeLabel(item.exerciseType))}</span></p>`);
  if (item.display)
    parts.push(`<p><strong>Deutsch:</strong> ${escapeHtml(item.display)}</p>`);
  if (trans)
    parts.push(`<p><strong>${tr('translation')}:</strong> ${escapeHtml(trans)}</p>`);
  if (item.example)
    parts.push(`<p><strong>${tr('example')}:</strong> ${escapeHtml(item.example)}</p>`);
  if (item.raw?.data?.collocations?.length)
    parts.push(`<p><strong>Collocations:</strong> ${item.raw.data.collocations.map(c => escapeHtml(c.collocation)).join(' · ')}</p>`);
  if (exp)
    parts.push(`<p><strong>${tr('explanation')}:</strong> ${escapeHtml(exp)}</p>`);
  // Checklist as interactive checkboxes for speaking/writing items
  if (item.checklist?.length) {
    const isOpenTask = item.openEnded;
    if (isOpenTask) {
      const checks = item.checklist.map(c =>
        `<label class="checklist-item"><input type="checkbox"> ${escapeHtml(c)}</label>`
      ).join('');
      parts.push(`<div class="checklist-block"><strong>${tr('checklist')}:</strong>${checks}</div>`);
    } else {
      parts.push(`<p><strong>${tr('checklist')}:</strong> ${item.checklist.map(escapeHtml).join(' · ')}</p>`);
    }
  }
  if (item.answer)
    parts.push(`<p><strong>${tr('correctAnswer')}:</strong><br>${escapeHtml(item.answer).replaceAll('\n', '<br>')}</p>`);

  $('learnBlock').innerHTML = parts.join('');
  $('learnBlock').classList.remove('hidden');
}

function renderHint(item) {
  const tags = (item.tags || []).join(' · ');
  const exp  = localized(item.explanation);
  let html   = `<p><span class="type-badge">${escapeHtml(typeLabel(item.exerciseType))}</span></p>`;
  html += `<p><strong>${tr('rule')}:</strong> ${escapeHtml(tags || item.module || 'B1/B2')}</p>`;
  if (exp)   html += `<p>${escapeHtml(exp)}</p>`;
  if (item.example)
    html += `<p><strong>${tr('example')}:</strong> ${escapeHtml(item.example)}</p>`;
  if (item.raw?.data?.collocations?.length)
    html += `<p><strong>Collocations:</strong> ${item.raw.data.collocations.map(c => escapeHtml(c.collocation)).join(' · ')}</p>`;
  if (item.checklist?.length)
    html += `<p><strong>${tr('checklist')}:</strong> ${item.checklist.map(escapeHtml).join(' · ')}</p>`;
  $('hintBox').innerHTML = html;
}

function updateButtons() {
  const pool = state.pool;
  const has  = pool.length > 0;
  const item = currentItem();
  const isPassive = state.mode === 'learn' || item?.exerciseType === 'flashcard';
  $('startButton').disabled = state.started || !has;
  $('checkButton').disabled = !state.started || state.checked || isPassive || !has;
  $('nextButton').disabled  = !state.started || (!state.checked && !isPassive) || state.index >= pool.length - 1;
  $('prevButton').disabled  = !has || state.index <= 0;
}

// ── Session logic ───────────────────────────────────────────────────────────
function startSession() {
  state.started       = true;
  state.checked       = false;
  state.selectedChoice = '';
  renderExercise();
}

function getUserAnswer(item) {
  if (item.choices && item.choices.length) return state.selectedChoice;
  if (item.openEnded)                      return $('answerTextArea').value;
  return $('answerInput').value;
}

function checkAnswer() {
  const item = currentItem();
  if (!item) return;
  const user = getUserAnswer(item);

  let ok;
  if (item.openEnded) {
    // Grade open-ended by word count against minimum (default 25 words)
    const wordCount = normalizeAnswer(user).split(/\s+/).filter(Boolean).length;
    const minWords  = item.minWords || 25;
    ok = wordCount >= minWords;
  } else {
    // Tolerant string match (handles subject-pronoun omission)
    ok = answersMatch(user, item);
  }

  state.checked = true;
  updateStat(ok);
  showFeedback(item, user, ok);

  // Only add to mistake bank for genuine wrong answers; NOT for open-ended submissions
  if (!ok && !item.openEnded) addMistake(item, user);

  renderStats();
  renderMistakes();
  updateButtons();
}

function showFeedback(item, user, ok) {
  const exp  = localized(item.explanation);
  const open = item.openEnded;

  let html = `<div class="feedback-title">${open ? tr('submittedMsg') : (ok ? tr('correctMsg') : tr('incorrectMsg'))}</div>`;
  html += `<p><strong>${tr('correctAnswer')}:</strong><br>${escapeHtml(item.answer || '—').replaceAll('\n', '<br>')}</p>`;
  if (user) html += `<p><strong>${tr('yourAnswer')}:</strong><br>${escapeHtml(user).replaceAll('\n', '<br>')}</p>`;
  if (open) {
    // Show word count feedback
    const wc = normalizeAnswer(user).split(/\s+/).filter(Boolean).length;
    const minW = item.minWords || 25;
    html += `<p><em>${wc} ${tr('wordCount')} / ${minW} ${tr('wordCount')} minimum</em></p>`;
    html += `<p>${tr('selfCheck')}</p>`;
  }
  if (exp)  html += `<p><strong>${tr('why')}</strong> ${escapeHtml(exp)}</p>`;
  if (item.checklist?.length) {
    const isOpenTask = item.openEnded;
    if (isOpenTask) {
      const checks = item.checklist.map(c =>
        `<label class="checklist-item"><input type="checkbox"> ${escapeHtml(c)}</label>`
      ).join('');
      html += `<div class="checklist-block"><strong>${tr('checklist')}:</strong>${checks}</div>`;
    } else {
      html += `<p><strong>${tr('checklist')}:</strong> ${item.checklist.map(escapeHtml).join(' · ')}</p>`;
    }
  }
  if (item.example) html += `<p><strong>${tr('example')}:</strong> ${escapeHtml(item.example)}</p>`;
  if (!open && !ok) html += `<p>${tr('addedMistake')}</p>`;

  $('feedbackBox').className = `feedback-box ${ok ? 'ok' : 'bad'}`;
  $('feedbackBox').innerHTML = html;
  $('feedbackBox').classList.remove('hidden');
}

function nextItem() {
  if (state.index < state.pool.length - 1) {
    state.index++;
    state.checked       = false;
    state.selectedChoice = '';
    renderExercise();
  }
}

function prevItem() {
  if (state.index > 0) {
    state.index--;
    state.checked       = false;
    state.selectedChoice = '';
    renderExercise();
  }
}

// ── Stats persistence ───────────────────────────────────────────────────────
function statKey() { return `${state.moduleId}:${state.mode}:${state.exerciseType}`; }

function updateStat(ok) {
  const k = statKey();
  state.stats[k] = state.stats[k] || { answered: 0, correct: 0 };
  state.stats[k].answered++;
  if (ok) state.stats[k].correct++;
  // Also update global stats
  state.globalStats.answered++;
  if (ok) state.globalStats.correct++;
  saveStats();
}

function saveStats() {
  localStorage.setItem('dw_stats',  JSON.stringify(state.stats));
  localStorage.setItem('dw_global', JSON.stringify(state.globalStats));
}

function addMistake(item, user) {
  const existing = state.mistakes.find(m => m.item.id === item.id);
  if (existing) {
    existing.count++;
    existing.userAnswer = user;
    existing.last = Date.now();
  } else {
    state.mistakes.unshift({ item, userAnswer: user, count: 1, last: Date.now() });
  }
  state.mistakes = state.mistakes.slice(0, 300);
  saveMistakes();
}

function saveMistakes() { localStorage.setItem('dw_mistakes', JSON.stringify(state.mistakes)); }

function renderStats() {
  const s   = state.stats[statKey()] || { answered: 0, correct: 0 };
  const pct = s.answered ? Math.round(100 * s.correct / s.answered) : 0;
  $('statAnswered').textContent = s.answered;
  $('statCorrect').textContent  = s.correct;
  $('statMistakes').textContent = state.mistakes.length;
  $('progressPercent').textContent = `${pct}%`;
  document.querySelector('.progress-ring').style.setProperty('--p', `${pct * 3.6}deg`);

  // Global stats line
  const g = state.globalStats;
  const gPct = g.answered ? Math.round(100 * g.correct / g.answered) : 0;
  $('globalStats').textContent = g.answered
    ? `All time: ${g.answered} answered · ${gPct}% correct`
    : '';
}

function renderMistakes() {
  if (!state.mistakes.length) {
    $('mistakeList').innerHTML = `<div class="minor">${tr('noMistakes')}</div>`;
    return;
  }
  $('mistakeList').innerHTML = state.mistakes.slice(0, 14).map(m =>
    `<div class="mistake-item">
      <strong>${escapeHtml(m.item.display || m.item.prompt)}</strong>
      <div>${tr('correctAnswer')}: ${escapeHtml(m.item.answer || '—')}</div>
      <div>${tr('itemType')}: ${escapeHtml(typeLabel(m.item.exerciseType))}</div>
      <div>${tr('mistakes')}: ${m.count}</div>
    </div>`
  ).join('');
}

// ── Theme & language ────────────────────────────────────────────────────────
function applyTheme() {
  const dark = state.theme === 'dark' ||
    (state.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('themeToggle').textContent = state.theme === 'auto' ? '◐' : (dark ? '☾' : '☼');
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir  = isRTL() ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRTL());
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = tr(el.dataset.i18n);
  });
  $('answerInput').placeholder    = tr('writeAnswer');
  $('answerTextArea').placeholder = tr('writeLongAnswer');
  setupExerciseTypeSelect();
}

function toggleDrawer(open) {
  $('sidebar').classList.toggle('open', open);
  $('mobileDrawerBackdrop').classList.toggle('hidden', !open);
  // Prevent keyboard focus escaping into covered content on mobile
  const main = document.querySelector('.main-panel');
  const bar  = document.querySelector('.bottom-actions');
  if (main) main.toggleAttribute('inert', open);
  if (bar)  bar.toggleAttribute('inert', open);
}

// ── Speech synthesis ─────────────────────────────────────────────────────────
// Speaks the given text in German (de-DE). Called from learn block and feedback.
function speak(text, lang = 'de-DE') {
  if (!window.speechSynthesis || !text) return;
  const utt  = new SpeechSynthesisUtterance(String(text));
  utt.lang   = lang;
  utt.rate   = 0.9;
  speechSynthesis.cancel(); // stop any ongoing utterance
  speechSynthesis.speak(utt);
}

// ── Bootstrap ───────────────────────────────────────────────────────────────
init().catch(err => {
  console.error(err);
  $('questionText').textContent = 'Could not load the app content. Check the console for details.';
});
