const APP_VERSION = '2026.06.15-v18.2.5-stable-i18n-repair';
const $ = id => document.getElementById(id);
// vfetch: cache-busting for version forcing BUT allows SW to intercept
// Using 'default' cache mode so the SW stale-while-revalidate strategy works
const APP_BUILD = 'v18.2.5-stable-i18n-repair';
const vfetch = path => {
  const sep = String(path).includes('?') ? '&' : '?';
  return fetch(`${path}${sep}v=${encodeURIComponent(APP_BUILD)}`, { cache: 'no-store' });
};

const SRS_KEY = 'dw_modern_srs';
const state = {
  manifest: null, modules: [], route: 'learn', path: 'conjugation', moduleId: 'all',
  index: 0, started: false, checked: false, selectedChoice: '', mode: 'practice',
  stats: load('dw_modern_stats', {}), moduleStats: load('dw_modern_module_stats', {}),
  mistakes: load('dw_modern_mistakes', []), srs: load(SRS_KEY, {}),
  profile: load('dw_modern_profile', {name:''}),
  lang: localStorage.dw_lang || 'de', appearance: localStorage.dw_appearance || 'system', color: localStorage.dw_color || 'teal',
  conjugator: null, localeLexicon: null, curatedVerbs: null, verb: null, tense: 'Präsens',
  tenseFilter: 'Präsens', sessionLimit: 50, dynamicVerb: '', showAllVerbs: false,
  sessionComplete: false, reviewEmptyReason: '', poolKey: '', poolItems: [], verbListMode: 'starter',
  // Memoised generateConjugatorPractice output: invalidated when verb/tense/mode changes
  _conjGenKey: '', _conjGenItems: [],
  sequencedSessions: load('dw_modern_sequenced_sessions', {})
};

// v11 migration: theme/dark-light is separate from accent color.
// Older builds stored both ideas in dw_theme. Preserve useful choices without mixing concepts.
(function migrateDesign(){
  const legacy = localStorage.dw_theme || '';
  if(!localStorage.dw_appearance){
    if(legacy === 'dark' || legacy === 'graphite' || legacy === 'midnight') state.appearance = 'dark';
    else if(legacy === 'light') state.appearance = 'light';
  }
  if(!localStorage.dw_color){
    const legacyColors = ['parchment','forest','ocean','sunset','lavender','rose','sand','graphite','midnight','highcontrast'];
    if(legacyColors.includes(legacy)) state.color = legacy === 'parchment' ? 'teal' : legacy;
  }
  localStorage.dw_appearance = state.appearance;
  localStorage.dw_color = state.color;
})();

const LANGS = [['de','Deutsch'],['en','English'],['fr','Français'],['es','Español'],['ar','العربية'],['fa','فارسی'],['uk','Українська'],['ru','Русский'],['pl','Polski'],['tr','Türkçe']];

const APPEARANCES = [
  ['system','System'],
  ['light','Light'],
  ['dark','Dark']
];
const COLORS = [
  ['teal','Teal'],
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
  {id:'business_email',icon:'✉️',title:'Corporate Emails',sub:'Sequenced formal e-mails, references, attachments, polite deadlines',match:['email','formelle','angebot','anhang','redemittel'],cats:['workplace']},
  {id:'complaints',icon:'⚖️',title:'Reklamation & Konflikt',sub:'Mängelrüge, invoice dispute, deadlines, objective register',match:['reklamation','rechnung','dispute','invoice','maengel','mängel'],cats:['workplace']},
  {id:'negotiation',icon:'🤝',title:'Verhandlung & Diplomatie',sub:'Konjunktiv II, softening, alternatives, confirmation requests',match:['konjunktiv','negotiation','verhandlung','liefertermin'],cats:['workplace']},
  {id:'grammar_core',icon:'🧠',title:'Grammar Core',sub:'Kasus, nicht/kein, Konnektoren, TeKaMoLo, Satzmuster',match:['kasus','nicht','kein','konnektor','tekamolo','adjektiv','variable','satzmuster']},
  {id:'declension',icon:'🧬',title:'Deklination',sub:'Adjektivdeklination, Artikel, Nomen und Kasusendungen',ids:['v17_adjektivdeklination','v18_artikel_nomen','v17_kasus']},
  {id:'artikel_nomen',icon:'📚',title:'Artikel & Nomen',sub:'Genus, Plural, Nominalisierung, Kasusartikel',ids:['v18_artikel_nomen']},
  {id:'adverbien',icon:'🕒',title:'Adverbien',sub:'Zeit, Ort, Häufigkeit, Modalität, Satzlogik',ids:['v18_adverbien']},
  {id:'conjugation',icon:'⚙️',title:'Konjugation',sub:'Large verb backend, filtered practice, modal verbs',ids:['v17_modalverben_business'],cats:['conjugation','konjugator'],match:['modal','modalverb','verbformen','konjugator','curated_verbs']},
  {id:'prepositions',icon:'📍',title:'Präpositionalverben',sub:'verbs + fixed preposition + case',match:['praeposition','präposition','prep']},
  {id:'workplace',icon:'💼',title:'Wortschatz Beruf',sub:'lexicon-key vocabulary, collocations, office/business terms',cats:['vocabulary','workplace']},
  {id:'wortschatz_b1b2',icon:'🗂️',title:'Wortschatz-Ergänzung B1/B2',sub:'zusätzlicher WiPa-Wortschatz aus Büro, Bewerbung, Finanzen, IT, Logistik',ids:['v18_wortschatz_ergaenzung_b1b2','v17_beruf_wortschatz']},
  {id:'syntax',icon:'🧩',title:'Satzbau',sub:'word order, TeKaMoLo, connectors, negation',match:['tekamolo','konnektor','satz','nicht','kein','variable']}
];

const PATH_I18N={
  business_email:{en:['Corporate emails','Sequenced formal emails, references, attachments, polite deadlines'],fr:['E-mails professionnels','E-mails formels séquencés, références, pièces jointes, délais polis'],es:['Correos corporativos','Correos formales secuenciados, referencias, adjuntos y plazos corteses'],de:['Corporate Emails','Sequenzierte formelle E-Mails, Referenzen, Anhänge, höfliche Fristen']},
  complaints:{en:['Complaints & conflict','Defects, invoice disputes, deadlines, objective register'],fr:['Réclamation & conflit','Défauts, litiges de facture, délais, registre objectif'],es:['Reclamación y conflicto','Defectos, disputa de factura, plazos y registro objetivo'],de:['Reklamation & Konflikt','Mängelrüge, Rechnungskonflikt, Fristen, sachliches Register']},
  negotiation:{en:['Negotiation & diplomacy','Konjunktiv II, softening, alternatives, confirmation requests'],fr:['Négociation & diplomatie','Konjunktiv II, atténuation, alternatives, demandes de confirmation'],es:['Negociación y diplomacia','Konjunktiv II, suavización, alternativas y confirmación'],de:['Verhandlung & Diplomatie','Konjunktiv II, Abschwächung, Alternativen, Rückfragen']},
  grammar_core:{en:['Grammar core','Cases, nicht/kein, connectors, TeKaMoLo, sentence patterns'],fr:['Noyau grammatical','Cas, nicht/kein, connecteurs, TeKaMoLo, modèles de phrase'],es:['Gramática central','Casos, nicht/kein, conectores, TeKaMoLo y patrones de frase'],de:['Grammar Core','Kasus, nicht/kein, Konnektoren, TeKaMoLo, Satzmuster']},
  declension:{en:['Declension','Adjective declension, articles, nouns and case endings'],fr:['Déclinaison','Déclinaison des adjectifs, articles, noms et terminaisons'],es:['Declinación','Declinación de adjetivos, artículos, nombres y casos'],de:['Deklination','Adjektivdeklination, Artikel, Nomen und Kasusendungen']},
  artikel_nomen:{en:['Articles & nouns','Gender, plural, nominalisation, case articles'],fr:['Articles et noms','Genre, pluriel, nominalisation et articles de cas'],es:['Artículos y nombres','Género, plural, nominalización y artículos de caso'],de:['Artikel & Nomen','Genus, Plural, Nominalisierung, Kasusartikel']},
  adverbien:{en:['Adverbs','Time, place, frequency, modality, sentence logic'],fr:['Adverbes','Temps, lieu, fréquence, modalité, logique de phrase'],es:['Adverbios','Tiempo, lugar, frecuencia, modalidad y lógica de frase'],de:['Adverbien','Zeit, Ort, Häufigkeit, Modalität, Satzlogik']},
  conjugation:{en:['Conjugation','Large verb backend, filtered practice, modal verbs'],fr:['Conjugaison','Grande base de verbes, pratique filtrée, verbes modaux'],es:['Conjugación','Base amplia de verbos, práctica filtrada, verbos modales'],de:['Konjugation','Große Verbbasis, gefiltertes Training, Modalverben']},
  prepositions:{en:['Prepositional verbs','Verbs with fixed preposition and case'],fr:['Verbes prépositionnels','Verbes avec préposition fixe et cas'],es:['Verbos preposicionales','Verbos con preposición fija y caso'],de:['Präpositionalverben','Verben mit fester Präposition und Kasus']},
  workplace:{en:['Workplace vocabulary','Vocabulary, collocations, office and business terms'],fr:['Vocabulaire professionnel','Vocabulaire, collocations, termes de bureau et d’entreprise'],es:['Vocabulario laboral','Vocabulario, colocaciones y términos de oficina/empresa'],de:['Wortschatz Beruf','Wortschatz, Kollokationen, Büro- und Geschäftssprache']},
  wortschatz_b1b2:{en:['B1/B2 vocabulary extension','Additional WiPa vocabulary from office, applications, finance, IT and logistics'],fr:['Extension vocabulaire B1/B2','Vocabulaire WiPa supplémentaire : bureau, candidature, finances, IT, logistique'],es:['Extensión de vocabulario B1/B2','Vocabulario WiPa adicional: oficina, solicitud, finanzas, IT, logística'],de:['Wortschatz-Ergänzung B1/B2','Zusätzlicher WiPa-Wortschatz aus Büro, Bewerbung, Finanzen, IT, Logistik']},
  syntax:{en:['Sentence structure','Word order, TeKaMoLo, connectors, negation'],fr:['Structure de phrase','Ordre des mots, TeKaMoLo, connecteurs, négation'],es:['Estructura de frase','Orden de palabras, TeKaMoLo, conectores, negación'],de:['Satzbau','Wortstellung, TeKaMoLo, Konnektoren, Negation']}
};
function pathText(id,part){
  const p=PATHS.find(x=>x.id===id)||{};
  const pair=PATH_I18N[id]?.[state.lang]||PATH_I18N[id]?.en||PATH_I18N[id]?.de;
  return pair ? pair[part==='sub'?1:0] : (part==='sub' ? (p.sub||'') : (p.title||id));
}
function localizeStaticUI(){
  const set=(sel,text)=>{const el=document.querySelector(sel); if(el)el.textContent=text;};
  set('[data-route="learn"]',tr('learnRoute')); set('[data-route="conjugator"]',tr('conjugatorRoute')); set('[data-route="mistakes"]',tr('mistakesRoute')); set('[data-route="resources"]',tr('resourcesRoute'));
  set('.brand-subtitle',tr('brandSub')); set('.sidebar-head .eyebrow',tr('sidebarPath')); set('.sidebar-head h3',tr('sidebarQuestion'));
  set('label[for="profileName"]',tr('profile')); set('label[for="sidebarAppearanceSelect"]',tr('design')); set('label[for="sidebarColorSelect"]',tr('color')); set('.backup-details summary',tr('backup'));
  set('label[for="moduleSelect"]',tr('module')); set('label[for="tenseFilter"]',tr('tense')); set('label[for="sessionLimit"]',tr('sessionLength'));
  set('label[for="mobilePathSelect"] span',tr('topic')); set('label[for="mobileModuleSelect"] span',tr('module')); set('#mobileOpenSidebar',tr('options'));
  const setTitle=(id,text)=>{const el=$(id); if(el){el.title=text; el.setAttribute('aria-label',text);}};
  setTitle('prevButton',tr('previousQuestion')); setTitle('skipButton',tr('skipExercise')); setTitle('speakButton',tr('speak')); setTitle('translateButton',tr('translate'));
  const eyes=document.querySelectorAll('.learn-panel .panel-block .eyebrow'); if(eyes[0])eyes[0].textContent=tr('rule'); if(eyes[1])eyes[1].textContent=tr('exampleLabel');
  set('#conjugatorLink .eyebrow',tr('conjugator')); set('#modePractice',tr('practice')); set('#modeLearn',tr('learn')); set('#modeReview',tr('review')); set('#clearMistakes',tr('clearMistakes'));
  const r=document.querySelector('#resourcesView .hero-card div'); if(r){const e=r.querySelector('.eyebrow'); const h=r.querySelector('h2'); const p=r.querySelector('p'); if(e)e.textContent=tr('resourcesRoute'); if(h)h.textContent=tr('resourcesTitle'); if(p)p.textContent=tr('resourcesDesc');}
  const status=$('profileSaveStatus'); if(status && !(state.profile?.name)) status.textContent=tr('progressLocal');
}


const T = {
 de:{start:'Sitzung starten',check:'Prüfen',next:'Weiter',skip:'Überspringen',restart:'Neu starten',correct:'Richtig',wrong:'Noch nicht',answer:'Richtige Antwort',why:'Warum?',empty:'In diesem Thema gibt es für diese Auswahl keine Items.',ready:'Starte die Sitzung.',complete:'Sitzung abgeschlossen',noSrs:'Noch keine fälligen Wiederholungen. Beantworte zuerst einige Übungen.',allModules:'Alle Module',dueToday:'fällig heute',item:'Item',items:'Items',yourAnswer:'Deine Antwort',retryMistake:'Nochmal üben',sessionStats:'Sitzung',verbConjTable:'Tabelle anzeigen',progressLocal:'Fortschritt lokal im Browser gespeichert',profileSaved:'Profil gespeichert',exportProgress:'Export',importProgress:'Import',answered:'Antworten',mistakes:'Fehler',noMistakes:'Keine Fehler gespeichert',translate:'Übersetzung',translation:'Übersetzung',resources:'Ressourcen',externalTranslation:'Extern übersetzen',noStoredTranslation:'Keine gespeicherte Übersetzung für diese Karte.',resourceFriend:'Dreizunge · App von Raim',resourceConjugator:'Verbformen & Konjugation',resourceDictionary:'Wörterbuch',resourceGrammar:'Grammatik',resourceListening:'Hören & Deutsch lernen',onboardingTitle:'Heute gezielt trainieren',onboardingText:'Wähle einen verlässlichen Tutor-Pfad. Kurze Sitzungen, direkte Korrektur, Wiederholung später, Ressourcen über den eigenen Tab.',quickConj:'Verbformen',quickDecl:'Deklination',quickPrep:'Präpositionen',quickReview:'Wiederholen',starter:'Starter',curated:'Kuratierte Verben',allVerbs:'Alle Verben'},
 en:{start:'Start session',check:'Check',next:'Next',skip:'Skip',restart:'Restart',correct:'Correct',wrong:'Not yet',answer:'Correct answer',why:'Why?',empty:'No items for this selection.',ready:'Start the session.',complete:'Session complete',noSrs:'No due reviews yet. Answer a few exercises first.',allModules:'All modules',dueToday:'due today',item:'item',items:'items',yourAnswer:'Your answer',retryMistake:'Practice again',sessionStats:'Session',verbConjTable:'Show table',progressLocal:'Progress saved locally in this browser',profileSaved:'Profile saved',exportProgress:'Export',importProgress:'Import',answered:'answers',mistakes:'mistakes',noMistakes:'No mistakes saved',translate:'Translate',translation:'Translation',resources:'Resources',externalTranslation:'Translate externally',noStoredTranslation:'No stored translation for this card.',resourceFriend:'Dreizunge · Raim’s app',resourceConjugator:'Verb forms & conjugation',resourceDictionary:'Dictionary',resourceGrammar:'Grammar',resourceListening:'Listening & German learning',onboardingTitle:'Train with a clear focus today',onboardingText:'Choose one reliable tutor path. Short sessions, direct correction, later review, resources available in their own tab.',quickConj:'Verb forms',quickDecl:'Declension',quickPrep:'Prepositions',quickReview:'Review',starter:'Starter',curated:'Curated verbs',allVerbs:'All verbs'},
 fr:{start:'Commencer',check:'Vérifier',next:'Suivant',skip:'Passer',restart:'Recommencer',correct:'Correct',wrong:'Pas encore',answer:'Bonne réponse',why:'Pourquoi ?',empty:'Aucun item pour cette sélection.',ready:'Commence la session.',complete:'Session terminée',noSrs:"Aucune révision prévue. Réponds d'abord à quelques exercices.",allModules:'Tous les modules',dueToday:"à réviser aujourd'hui",item:'item',items:'items',yourAnswer:'Ta réponse',retryMistake:'Réessayer',sessionStats:'Session',verbConjTable:'Voir tableau',answered:'réponses',mistakes:'erreurs',noMistakes:'Aucune erreur enregistrée',translate:'Traduire',translation:'Traduction',resources:'Ressources',externalTranslation:'Traduire avec un outil externe',noStoredTranslation:'Aucune traduction enregistrée pour cette carte.',resourceFriend:'Dreizunge · application de Raim',resourceConjugator:'Formes verbales et conjugaison',resourceDictionary:'Dictionnaire',resourceGrammar:'Grammaire',resourceListening:'Écoute et allemand'},
 es:{start:'Empezar',check:'Comprobar',next:'Siguiente',skip:'Omitir',restart:'Reiniciar',correct:'Correcto',wrong:'Todavía no',answer:'Respuesta correcta',why:'¿Por qué?',empty:'No hay elementos para esta selección.',ready:'Empieza la sesión.',complete:'Sesión completada',noSrs:'Aún no hay repasos pendientes. Responde primero algunos ejercicios.',allModules:'Todos los módulos',dueToday:'para repasar hoy',item:'ítem',items:'ítems',yourAnswer:'Tu respuesta',retryMistake:'Practicar de nuevo',sessionStats:'Sesión',verbConjTable:'Ver tabla',answered:'respuestas',mistakes:'errores',noMistakes:'No hay errores guardados',translate:'Traducir',translation:'Traducción',resources:'Recursos',externalTranslation:'Traducir externamente',noStoredTranslation:'No hay traducción guardada para esta tarjeta.',resourceFriend:'Dreizunge · app de Raim',resourceConjugator:'Formas verbales y conjugación',resourceDictionary:'Diccionario',resourceGrammar:'Gramática',resourceListening:'Escucha y alemán'},
 ar:{start:'ابدأ الجلسة',check:'تحقق',next:'التالي',skip:'تخطي',restart:'إعادة البدء',correct:'صحيح',wrong:'ليس بعد',answer:'الإجابة الصحيحة',why:'لماذا؟',empty:'لا توجد عناصر لهذا الاختيار.',ready:'ابدأ الجلسة.',complete:'اكتملت الجلسة',noSrs:'لا توجد مراجعات مستحقة بعد. أجب عن بعض التمارين أولاً.',allModules:'كل الوحدات',dueToday:'مستحق اليوم',item:'عنصر',items:'عناصر',yourAnswer:'إجابتك',retryMistake:'تدرب مجدداً',sessionStats:'جلسة',verbConjTable:'عرض الجدول',answered:'إجابات',mistakes:'أخطاء',noMistakes:'لا توجد أخطاء محفوظة',translate:'ترجمة',translation:'الترجمة',resources:'موارد',externalTranslation:'ترجمة خارجية',noStoredTranslation:'لا توجد ترجمة محفوظة لهذه البطاقة.',resourceFriend:'Dreizunge · تطبيق Raim',resourceConjugator:'تصريف الأفعال',resourceDictionary:'قاموس',resourceGrammar:'قواعد',resourceListening:'الاستماع وتعلّم الألمانية'},
 fa:{start:'شروع جلسه',check:'بررسی',next:'بعدی',skip:'رد کردن',restart:'شروع دوباره',correct:'درست',wrong:'هنوز نه',answer:'پاسخ درست',why:'چرا؟',empty:'برای این انتخاب موردی وجود ندارد.',ready:'جلسه را شروع کن.',complete:'جلسه کامل شد',noSrs:'هنوز مرور زمان‌بندی‌شده‌ای وجود ندارد. اول چند تمرین را پاسخ بده.',allModules:'همهٔ بخش‌ها',dueToday:'موعد امروز',item:'مورد',items:'مورد',yourAnswer:'پاسخ تو',retryMistake:'دوباره تمرین کن',sessionStats:'جلسه',verbConjTable:'نمایش جدول',answered:'پاسخ‌ها',mistakes:'اشتباه‌ها',noMistakes:'اشتباهی ذخیره نشده است',translate:'ترجمه',translation:'ترجمه',resources:'منابع',externalTranslation:'ترجمه بیرونی',noStoredTranslation:'برای این کارت ترجمه ذخیره‌شده وجود ندارد.',resourceFriend:'Dreizunge · برنامه Raim',resourceConjugator:'صرف فعل‌ها',resourceDictionary:'فرهنگ لغت',resourceGrammar:'گرامر',resourceListening:'شنیدن و یادگیری آلمانی'},
 uk:{start:'Почати',check:'Перевірити',next:'Далі',skip:'Пропустити',restart:'Почати знову',correct:'Правильно',wrong:'Ще ні',answer:'Правильна відповідь',why:'Чому?',empty:'Немає завдань для цього вибору.',ready:'Почни сесію.',complete:'Сесію завершено',noSrs:'Поки немає повторень. Спочатку виконай кілька вправ.',allModules:'Усі модулі',dueToday:'на сьогодні',item:'завдання',items:'завдання',yourAnswer:'Твоя відповідь',retryMistake:'Тренуватися знову',sessionStats:'Сесія',verbConjTable:'Показати таблицю',answered:'відповіді',translate:'Переклад',translation:'Переклад',resources:'Ресурси',externalTranslation:'Перекласти зовнішньо',noStoredTranslation:'Для цієї картки немає збереженого перекладу.',resourceFriend:'Dreizunge · застосунок Raim',resourceConjugator:'Форми дієслів і відмінювання',resourceDictionary:'Словник',resourceGrammar:'Граматика',resourceListening:'Аудіювання та німецька'},
 ru:{start:'Начать',check:'Проверить',next:'Далее',skip:'Пропустить',restart:'Начать заново',correct:'Правильно',wrong:'Еще нет',answer:'Правильный ответ',why:'Почему?',empty:'Нет заданий для этого выбора.',ready:'Начни сессию.',complete:'Сессия завершена',noSrs:'Пока нет повторений. Сначала ответь на несколько упражнений.',allModules:'Все модули',dueToday:'на сегодня',item:'задание',items:'задания',yourAnswer:'Твой ответ',retryMistake:'Тренироваться снова',sessionStats:'Сессия',verbConjTable:'Показать таблицу',answered:'ответов',mistakes:'ошибок',noMistakes:'Ошибок не сохранено',translate:'Перевод',translation:'Перевод',resources:'Ресурсы',externalTranslation:'Перевести внешне',noStoredTranslation:'Для этой карточки нет сохраненного перевода.',resourceFriend:'Dreizunge · приложение Raim',resourceConjugator:'Формы глаголов и спряжение',resourceDictionary:'Словарь',resourceGrammar:'Грамматика',resourceListening:'Аудирование и немецкий'},
 pl:{start:'Rozpocznij',check:'Sprawdź',next:'Dalej',skip:'Pomiń',restart:'Zacznij od nowa',correct:'Poprawnie',wrong:'Jeszcze nie',answer:'Poprawna odpowiedź',why:'Dlaczego?',empty:'Brak zadań dla tego wyboru.',ready:'Rozpocznij sesję.',complete:'Sesja zakończona',noSrs:'Brak powtórek. Najpierw rozwiąż kilka ćwiczeń.',allModules:'Wszystkie moduły',dueToday:'na dziś',item:'zadanie',items:'zadania',yourAnswer:'Twoja odpowiedź',retryMistake:'Ćwicz ponownie',sessionStats:'Sesja',verbConjTable:'Pokaż tabelę',answered:'odpowiedzi',mistakes:'błędów',noMistakes:'Brak zapisanych błędów',translate:'Tłumaczenie',translation:'Tłumaczenie',resources:'Zasoby',externalTranslation:'Przetłumacz zewnętrznie',noStoredTranslation:'Brak zapisanych tłumaczeń dla tej karty.',resourceFriend:'Dreizunge · aplikacja Raima',resourceConjugator:'Formy czasowników i koniugacja',resourceDictionary:'Słownik',resourceGrammar:'Gramatyka',resourceListening:'Słuchanie i niemiecki'},
 tr:{start:'Oturumu başlat',check:'Kontrol et',next:'Sonraki',skip:'Geç',restart:'Yeniden başlat',correct:'Doğru',wrong:'Henüz değil',answer:'Doğru cevap',why:'Neden?',empty:'Bu seçim için öğe yok.',ready:'Oturumu başlat.',complete:'Oturum tamamlandı',noSrs:'Henüz tekrar yok. Önce birkaç alıştırma çöz.',allModules:'Tüm modüller',dueToday:'bugün tekrar',item:'öğe',items:'öğe',yourAnswer:'Cevabın',retryMistake:'Tekrar pratik yap',sessionStats:'Oturum',verbConjTable:'Tabloyu göster',answered:'cevap',mistakes:'hata',noMistakes:'Kayıtlı hata yok',translate:'Çeviri',translation:'Çeviri',resources:'Kaynaklar',externalTranslation:'Harici çeviri',noStoredTranslation:'Bu kart için kayıtlı çeviri yok.',resourceFriend:'Dreizunge · Raim’in uygulaması',resourceConjugator:'Fiil biçimleri ve çekim',resourceDictionary:'Sözlük',resourceGrammar:'Dilbilgisi',resourceListening:'Dinleme ve Almanca öğrenme'}
};

// Late-bound translation extensions. Keep this additive: do not override core render functions.
const EXTRA_T={
  de:{ready_q:'Bereit?',no_items:'Keine Items',review_empty:'Review leer',practice:'Üben',learn:'Lernen',review:'Wiederholen',learnRoute:'Lernen',conjugatorRoute:'Konjugator',mistakesRoute:'Fehlerbank',resourcesRoute:'Ressourcen',brandSub:'B1 → B2 · Grammatik & Beruf',sidebarPath:'Lernpfad',sidebarQuestion:'Was willst du trainieren?',profile:'Profil',design:'Design',color:'Farbe',backup:'Backup',module:'Modul',tense:'Zeitform',sessionLength:'Sitzungslänge',topic:'Thema',options:'Optionen',previousQuestion:'Vorherige Frage',skipExercise:'Übung überspringen',speak:'Vorlesen',rule:'Regel',exampleLabel:'Beispiel',conjugator:'Konjugator',clearMistakes:'Fehlerbank leeren',resourcesTitle:'Externe Ressourcen',resourcesDesc:'Direkte Links zu Wörterbüchern, Konjugatoren, Grammatik und Hörmaterial.',answerPlaceholder:'Antwort eingeben…',verbTraining:'Verbtraining',exercise:'Übung',completedItems:'abgeschlossen',hits:'Treffer',verbsAvailable:'Verben verfügbar',allCount:'Alle',curatedSelection:'Kuratierte Auswahl',shown:'angezeigt',starterList:'Starterliste',available:'verfügbar',auxVerb:'Hilfsverb',participle:'Partizip II',practiceVerb:'Übe',inTense:'im'},
  en:{ready_q:'Ready?',no_items:'No items',review_empty:'Review empty',practice:'Practice',learn:'Learn',review:'Review',learnRoute:'Learn',conjugatorRoute:'Conjugator',mistakesRoute:'Mistakes',resourcesRoute:'Resources',brandSub:'B1 → B2 · Grammar & workplace German',sidebarPath:'Learning path',sidebarQuestion:'What do you want to train?',profile:'Profile',design:'Design',color:'Color',backup:'Backup',module:'Module',tense:'Tense',sessionLength:'Session length',topic:'Topic',options:'Options',previousQuestion:'Previous question',skipExercise:'Skip exercise',speak:'Read aloud',rule:'Rule',exampleLabel:'Example',conjugator:'Conjugator',clearMistakes:'Clear mistakes',resourcesTitle:'External resources',resourcesDesc:'Direct links to dictionaries, conjugators, grammar, and listening material.',answerPlaceholder:'Enter your answer…',verbTraining:'Verb training',exercise:'Exercise',completedItems:'completed',hits:'hits',verbsAvailable:'verbs available',allCount:'All',curatedSelection:'Curated selection',shown:'shown',starterList:'Starter list',available:'available',auxVerb:'Auxiliary',participle:'Past participle',practiceVerb:'Practise',inTense:'in'},
  fr:{ready_q:'Prêt ?',no_items:'Aucun item',review_empty:'Révision vide',practice:'Pratiquer',learn:'Apprendre',review:'Réviser',learnRoute:'Apprendre',conjugatorRoute:'Conjugateur',mistakesRoute:'Erreurs',resourcesRoute:'Ressources',brandSub:'B1 → B2 · Grammaire & allemand professionnel',sidebarPath:'Parcours',sidebarQuestion:'Que veux-tu travailler ?',profile:'Profil',design:'Design',color:'Couleur',backup:'Sauvegarde',module:'Module',tense:'Temps',sessionLength:'Durée de session',topic:'Thème',options:'Options',previousQuestion:'Question précédente',skipExercise:'Passer l’exercice',speak:'Lire à voix haute',rule:'Règle',exampleLabel:'Exemple',conjugator:'Conjugateur',clearMistakes:'Effacer les erreurs',resourcesTitle:'Ressources externes',resourcesDesc:'Liens directs vers dictionnaires, conjugueurs, grammaire et écoute.',answerPlaceholder:'Écris ta réponse…',verbTraining:'Entraînement verbal',exercise:'Exercice',completedItems:'terminés',hits:'résultats',verbsAvailable:'verbes disponibles',allCount:'Tous',curatedSelection:'Sélection organisée',shown:'affichés',starterList:'Liste de départ',available:'disponibles',auxVerb:'Auxiliaire',participle:'Participe II',practiceVerb:'Travaille',inTense:'au'},
  es:{ready_q:'¿Listo?',no_items:'Sin ítems',review_empty:'Repaso vacío',practice:'Practicar',learn:'Aprender',review:'Repasar',learnRoute:'Aprender',conjugatorRoute:'Conjugador',mistakesRoute:'Errores',resourcesRoute:'Recursos',brandSub:'B1 → B2 · Gramática y alemán laboral',sidebarPath:'Ruta de aprendizaje',sidebarQuestion:'¿Qué quieres practicar?',profile:'Perfil',design:'Diseño',color:'Color',backup:'Copia de seguridad',module:'Módulo',tense:'Tiempo verbal',sessionLength:'Duración de sesión',topic:'Tema',options:'Opciones',previousQuestion:'Pregunta anterior',skipExercise:'Omitir ejercicio',speak:'Leer en voz alta',rule:'Regla',exampleLabel:'Ejemplo',conjugator:'Conjugador',clearMistakes:'Borrar errores',resourcesTitle:'Recursos externos',resourcesDesc:'Enlaces directos a diccionarios, conjugadores, gramática y escucha.',answerPlaceholder:'Escribe tu respuesta…',verbTraining:'Práctica de verbos',exercise:'Ejercicio',completedItems:'completados',hits:'resultados',verbsAvailable:'verbos disponibles',allCount:'Todos',curatedSelection:'Selección curada',shown:'mostrados',starterList:'Lista inicial',available:'disponibles',auxVerb:'Auxiliar',participle:'Participio II',practiceVerb:'Practica',inTense:'en'},
  ar:{ready_q:'جاهز؟',no_items:'لا توجد عناصر',review_empty:'المراجعة فارغة',practice:'تدرّب',learn:'تعلّم',review:'راجع',learnRoute:'تعلّم',conjugatorRoute:'مصرّف الأفعال',mistakesRoute:'الأخطاء',resourcesRoute:'الموارد',brandSub:'B1 → B2 · القواعد والألمانية المهنية',sidebarPath:'مسار التعلّم',sidebarQuestion:'ماذا تريد أن تتدرّب؟',profile:'الملف',design:'التصميم',color:'اللون',backup:'نسخ احتياطي',module:'الوحدة',tense:'الزمن',sessionLength:'طول الجلسة',topic:'الموضوع',options:'خيارات',previousQuestion:'السؤال السابق',skipExercise:'تخطي التمرين',speak:'قراءة صوتية',rule:'القاعدة',exampleLabel:'مثال',conjugator:'مصرّف الأفعال',clearMistakes:'مسح الأخطاء',resourcesTitle:'موارد خارجية',resourcesDesc:'روابط مباشرة إلى القواميس والتصريف والقواعد والاستماع.',answerPlaceholder:'اكتب إجابتك…',verbTraining:'تدريب الأفعال',exercise:'تمرين',completedItems:'مكتملة',hits:'نتائج',verbsAvailable:'أفعال متاحة',allCount:'كل',curatedSelection:'اختيار منظم',shown:'معروضة',starterList:'قائمة البداية',available:'متاحة',auxVerb:'الفعل المساعد',participle:'Partizip II',practiceVerb:'تدرّب على',inTense:'في'},
  fa:{ready_q:'آماده‌ای؟',no_items:'موردی نیست',review_empty:'مرور خالی است',practice:'تمرین',learn:'یادگیری',review:'مرور',learnRoute:'یادگیری',conjugatorRoute:'صرف فعل',mistakesRoute:'اشتباه‌ها',resourcesRoute:'منابع',brandSub:'B1 → B2 · گرامر و آلمانی کاری',sidebarPath:'مسیر یادگیری',sidebarQuestion:'چه چیزی را تمرین می‌کنی؟',profile:'پروفایل',design:'طراحی',color:'رنگ',backup:'پشتیبان',module:'بخش',tense:'زمان',sessionLength:'طول جلسه',topic:'موضوع',options:'گزینه‌ها',previousQuestion:'پرسش قبلی',skipExercise:'رد کردن تمرین',speak:'خواندن صوتی',rule:'قاعده',exampleLabel:'مثال',conjugator:'صرف فعل',clearMistakes:'پاک کردن اشتباه‌ها',resourcesTitle:'منابع بیرونی',resourcesDesc:'پیوندهای مستقیم به فرهنگ لغت، صرف فعل، گرامر و شنیدار.',answerPlaceholder:'پاسخت را بنویس…',verbTraining:'تمرین فعل',exercise:'تمرین',completedItems:'کامل شد',hits:'نتیجه',verbsAvailable:'فعل موجود',allCount:'همه',curatedSelection:'گزینش‌شده',shown:'نمایش داده شد',starterList:'فهرست آغازین',available:'موجود',auxVerb:'فعل کمکی',participle:'Partizip II',practiceVerb:'تمرین کن',inTense:'در'},
  uk:{ready_q:'Готово?',no_items:'Немає завдань',review_empty:'Повторення порожнє',practice:'Практика',learn:'Навчання',review:'Повторення',learnRoute:'Навчання',conjugatorRoute:'Дієвідмінювання',mistakesRoute:'Помилки',resourcesRoute:'Ресурси',brandSub:'B1 → B2 · Граматика й робоча німецька',sidebarPath:'Навчальний шлях',sidebarQuestion:'Що тренувати?',profile:'Профіль',design:'Дизайн',color:'Колір',backup:'Резервна копія',module:'Модуль',tense:'Час',sessionLength:'Довжина сесії',topic:'Тема',options:'Опції',previousQuestion:'Попереднє питання',skipExercise:'Пропустити вправу',speak:'Прочитати вголос',rule:'Правило',exampleLabel:'Приклад',conjugator:'Дієвідмінювання',clearMistakes:'Очистити помилки',resourcesTitle:'Зовнішні ресурси',resourcesDesc:'Прямі посилання на словники, дієвідмінювання, граматику та аудіювання.',answerPlaceholder:'Введи відповідь…',verbTraining:'Тренування дієслів',exercise:'Вправа',completedItems:'завершено',hits:'результатів',verbsAvailable:'дієслів доступно',allCount:'Усі',curatedSelection:'Добірка',shown:'показано',starterList:'Стартовий список',available:'доступно',auxVerb:'Допоміжне дієслово',participle:'Partizip II',practiceVerb:'Тренуй',inTense:'у'},
  ru:{ready_q:'Готово?',no_items:'Нет заданий',review_empty:'Повторение пустое',practice:'Практика',learn:'Учить',review:'Повторять',learnRoute:'Учить',conjugatorRoute:'Спряжение',mistakesRoute:'Ошибки',resourcesRoute:'Ресурсы',brandSub:'B1 → B2 · Грамматика и рабочий немецкий',sidebarPath:'Учебный путь',sidebarQuestion:'Что тренировать?',profile:'Профиль',design:'Дизайн',color:'Цвет',backup:'Резервная копия',module:'Модуль',tense:'Время',sessionLength:'Длина сессии',topic:'Тема',options:'Опции',previousQuestion:'Предыдущий вопрос',skipExercise:'Пропустить упражнение',speak:'Прочитать вслух',rule:'Правило',exampleLabel:'Пример',conjugator:'Спряжение',clearMistakes:'Очистить ошибки',resourcesTitle:'Внешние ресурсы',resourcesDesc:'Прямые ссылки на словари, спряжение, грамматику и аудирование.',answerPlaceholder:'Введите ответ…',verbTraining:'Тренировка глаголов',exercise:'Упражнение',completedItems:'завершено',hits:'результатов',verbsAvailable:'глаголов доступно',allCount:'Все',curatedSelection:'Подборка',shown:'показано',starterList:'Стартовый список',available:'доступно',auxVerb:'Вспомогательный глагол',participle:'Partizip II',practiceVerb:'Тренируй',inTense:'в'},
  pl:{ready_q:'Gotowe?',no_items:'Brak zadań',review_empty:'Powtórka pusta',practice:'Ćwicz',learn:'Ucz się',review:'Powtórz',learnRoute:'Nauka',conjugatorRoute:'Koniugator',mistakesRoute:'Błędy',resourcesRoute:'Zasoby',brandSub:'B1 → B2 · Gramatyka i niemiecki w pracy',sidebarPath:'Ścieżka nauki',sidebarQuestion:'Co chcesz ćwiczyć?',profile:'Profil',design:'Wygląd',color:'Kolor',backup:'Kopia zapasowa',module:'Moduł',tense:'Czas',sessionLength:'Długość sesji',topic:'Temat',options:'Opcje',previousQuestion:'Poprzednie pytanie',skipExercise:'Pomiń ćwiczenie',speak:'Przeczytaj na głos',rule:'Reguła',exampleLabel:'Przykład',conjugator:'Koniugator',clearMistakes:'Wyczyść błędy',resourcesTitle:'Zewnętrzne zasoby',resourcesDesc:'Bezpośrednie linki do słowników, koniugatorów, gramatyki i słuchania.',answerPlaceholder:'Wpisz odpowiedź…',verbTraining:'Trening czasowników',exercise:'Ćwiczenie',completedItems:'ukończone',hits:'wyników',verbsAvailable:'czasowników dostępnych',allCount:'Wszystkie',curatedSelection:'Wybrana lista',shown:'pokazano',starterList:'Lista startowa',available:'dostępne',auxVerb:'Czasownik posiłkowy',participle:'Partizip II',practiceVerb:'Ćwicz',inTense:'w'},
  tr:{ready_q:'Hazır mı?',no_items:'Öğe yok',review_empty:'Tekrar boş',practice:'Pratik',learn:'Öğren',review:'Tekrar',learnRoute:'Öğren',conjugatorRoute:'Fiil çekimi',mistakesRoute:'Hatalar',resourcesRoute:'Kaynaklar',brandSub:'B1 → B2 · Dilbilgisi ve iş Almancası',sidebarPath:'Öğrenme yolu',sidebarQuestion:'Neyi çalışmak istiyorsun?',profile:'Profil',design:'Tasarım',color:'Renk',backup:'Yedekleme',module:'Modül',tense:'Zaman',sessionLength:'Oturum uzunluğu',topic:'Konu',options:'Seçenekler',previousQuestion:'Önceki soru',skipExercise:'Alıştırmayı geç',speak:'Sesli oku',rule:'Kural',exampleLabel:'Örnek',conjugator:'Fiil çekimi',clearMistakes:'Hataları temizle',resourcesTitle:'Dış kaynaklar',resourcesDesc:'Sözlükler, fiil çekimi, dilbilgisi ve dinleme için doğrudan bağlantılar.',answerPlaceholder:'Cevabını yaz…',verbTraining:'Fiil çalışması',exercise:'Alıştırma',completedItems:'tamamlandı',hits:'sonuç',verbsAvailable:'fiil mevcut',allCount:'Tümü',curatedSelection:'Seçilmiş liste',shown:'gösterildi',starterList:'Başlangıç listesi',available:'mevcut',auxVerb:'Yardımcı fiil',participle:'Partizip II',practiceVerb:'Çalış',inTense:'zamanında'}
};
for(const k in EXTRA_T)Object.assign(T[k]||(T[k]={}),EXTRA_T[k]);

function tr(k){return T[state.lang]?.[k]??T.en[k]??T.de[k]??k}
function load(k,fallback){try{return JSON.parse(localStorage.getItem(k))??fallback}catch{return fallback}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}
function norm(s=''){return String(s).trim().toLowerCase().replace(/[„""]/g,'"').replace(/[.!?。؟،,;:]+$/g,'').replace(/\s+/g,' ')}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function safeHtml(s=''){return esc(stringify(s)).replace(/&lt;br\s*\/?&gt;/gi,'<br>')}
function stringify(v){if(v==null)return''; if(typeof v==='string'||typeof v==='number'||typeof v==='boolean')return String(v); if(Array.isArray(v))return v.map(stringify).filter(Boolean).join('; '); if(typeof v==='object'){const preferred=['German','Deutsch','English','article','base','plural','pattern','type','collocation','example']; return preferred.map(k=>v[k]).filter(Boolean).map(stringify).join('; ')||Object.values(v).map(stringify).filter(Boolean).join('; ')} return String(v)}
function stripHtml(s=''){const d=document.createElement('div');d.innerHTML=safeHtml(s);return d.textContent||d.innerText||''}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

async function clearOldCachesAndServiceWorkers(){
  try{
    if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister().catch(()=>{})));
    }
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>/^deutsch-wipa/i.test(k)||/wipa/i.test(k)).map(k=>caches.delete(k).catch(()=>{})));
    }
  }catch(e){console.warn('Cache cleanup skipped',e)}
}
async function init(){
  applyDesign(false);
  updateDirection();renderLangs();renderDesignControls();bind();
  await clearOldCachesAndServiceWorkers();
  await loadLocaleLexicon();await loadData();await loadConjugator();
  renderPath();selectPath('grammar_core');
  route('learn');renderAll();
}
function updateDirection(){document.documentElement.dir=['ar','fa'].includes(state.lang)?'rtl':'ltr'}
function renderLangs(){$('languageSelect').innerHTML=LANGS.map(([c,n])=>`<option value="${c}" ${c===state.lang?'selected':''}>${n}</option>`).join('')}
function renderDesignControls(){
  const appearanceOptions=APPEARANCES.map(([c,n])=>`<option value="${c}">${n}</option>`).join('');
  const colorOptions=COLORS.map(([c,n])=>`<option value="${c}">${n}</option>`).join('');
  document.querySelectorAll('#appearanceSelect,.appearance-select-control').forEach(el=>{ if(!el)return; if(!el.dataset.populated){el.innerHTML=appearanceOptions;el.dataset.populated='1';} el.value=state.appearance; });
  document.querySelectorAll('#colorSelect,.color-select-control').forEach(el=>{ if(!el)return; if(!el.dataset.populated){el.innerHTML=colorOptions;el.dataset.populated='1';} el.value=state.color; });
}
function systemPrefersDark(){return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches}
function resolvedAppearance(){return state.appearance==='system' ? (systemPrefersDark()?'dark':'light') : state.appearance}
function applyDesign(rerender=true){
  const resolved=resolvedAppearance();
  document.documentElement.dataset.appearance=resolved;
  document.documentElement.dataset.color=state.color || 'teal';
  document.documentElement.dataset.theme=resolved; // legacy CSS compatibility only
  document.documentElement.style.colorScheme=resolved==='dark'?'dark':'light';
  updateThemeMeta();
  if(rerender)renderDesignControls();
}
function setAppearance(value){state.appearance=value||'system';localStorage.dw_appearance=state.appearance;applyDesign(true)}
function setColor(value){state.color=value||'teal';localStorage.dw_color=state.color;applyDesign(true)}
function updateThemeMeta(){
  const light={teal:'#f6efe3',forest:'#eaf4ea',ocean:'#e8f4fb',sunset:'#fff0e4',lavender:'#f2edff',rose:'#fff0f5',sand:'#fbf2dc',graphite:'#f4f4f5',midnight:'#eef2ff',highcontrast:'#ffffff'};
  const dark={teal:'#111827',forest:'#0d1f17',ocean:'#081827',sunset:'#20120d',lavender:'#161128',rose:'#24111b',sand:'#211908',graphite:'#111827',midnight:'#07111f',highcontrast:'#000000'};
  const table=resolvedAppearance()==='dark'?dark:light;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',table[state.color]||table.teal);
}
if(window.matchMedia){
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.appearance==='system')applyDesign(true)});
}


function bind(){
  $('languageSelect').onchange=e=>{state.lang=e.target.value;localStorage.dw_lang=state.lang;updateDirection();renderAll()};
  document.querySelectorAll('#appearanceSelect,.appearance-select-control').forEach(el=>{el.onchange=e=>setAppearance(e.target.value)});
  document.querySelectorAll('#colorSelect,.color-select-control').forEach(el=>{el.onchange=e=>setColor(e.target.value)});
  bindProfileControls();
  document.querySelectorAll('.top-tab').forEach(b=>b.onclick=()=>route(b.dataset.route));
  $('mobileMenu')?.addEventListener('click',()=>toggleDrawer(true));$('backdrop')?.addEventListener('click',()=>toggleDrawer(false));
  $('primaryAction').onclick=primary;$('secondaryAction').onclick=next;$('prevButton').onclick=prev;
  $('skipButton').onclick=skipItem;
  $('speakButton').onclick=()=>{const item=current();if(!item)return;speak(item.germanSpeak||item.example||item.prompt||item.answer||'')};
  $('translateButton')?.addEventListener('click',toggleTranslation);
  $('modePractice').onclick=()=>setMode('practice');$('modeLearn').onclick=()=>setMode('learn');$('modeReview').onclick=()=>setMode('review');
  $('clearMistakes')&&($('clearMistakes').onclick=()=>{state.mistakes=[];save('dw_modern_mistakes',state.mistakes);renderMistakes();renderStats()});
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
    if(e.key==='Escape'){if($('sidebar')?.classList.contains('open'))toggleDrawer(false);else skipItem();}
  });
}

function bindProfileControls(){
  const name=$('profileName');
  if(name){
    name.value=state.profile?.name||'';
    let _pTimer=null;
    name.oninput=()=>{
      clearTimeout(_pTimer);
      _pTimer=setTimeout(()=>{
        state.profile={...state.profile,name:name.value.trim()};
        save('dw_modern_profile',state.profile);
        const status=$('profileSaveStatus');
        if(status)status.textContent=name.value.trim()?`${tr('profileSaved')}: ${name.value.trim()}`:tr('progressLocal');
      },300);
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
    profile:state.profile,lang:state.lang,appearance:state.appearance,color:state.color,
    stats:state.stats,moduleStats:state.moduleStats,mistakes:state.mistakes,srs:state.srs
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  const safeName=(state.profile?.name||'user').replace(/[^a-z0-9_-]+/gi,'_');
  a.href=URL.createObjectURL(blob);const exportDate=new Date().toISOString().slice(0,10);a.download=`deutsch-wipa-progress-${safeName}-${exportDate}.json`;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importProgress(e){
  const file=e.target.files&&e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data||typeof data!=='object'||(!data.stats&&!data.srs&&!data.profile))throw new Error('shape');
      const hasExisting=Object.keys(state.stats||{}).length||Object.keys(state.srs||{}).length||(state.mistakes||[]).length;
      if(hasExisting && !confirm('Vorhandenen Fortschritt überschreiben?')){e.target.value='';return;}
      state.profile=data.profile||state.profile||{name:''};
      state.stats=data.stats||{};state.moduleStats=data.moduleStats||{};state.mistakes=data.mistakes||[];state.srs=data.srs||{};
      if(data.lang)state.lang=data.lang;if(data.appearance)state.appearance=data.appearance;if(data.color)state.color=data.color;else if(data.theme)state.color=data.theme;
      save('dw_modern_profile',state.profile);save('dw_modern_stats',state.stats);save('dw_modern_module_stats',state.moduleStats);save('dw_modern_mistakes',state.mistakes);save(SRS_KEY,state.srs);
      localStorage.dw_lang=state.lang;localStorage.dw_appearance=state.appearance;localStorage.dw_color=state.color;
      applyDesign(false);updateDirection();renderLangs();renderDesignControls();renderAll();
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


async function loadLocaleLexicon(){
  try{
    state.localeLexicon=await vfetch('data/locales/wipa_lexicon.json').then(r=>r.json());
  }catch(e){
    console.warn('Locale lexicon unavailable', e);
    state.localeLexicon={entries:{}};
  }
}
function localeCode(){
  const map={de:'de',en:'en',fr:'fr',es:'es',ar:'ar',fa:'fa',uk:'uk',ru:'ru',pl:'pl',tr:'tr'};
  return map[state.lang]||'en';
}
function cleanLexicalKey(s=''){
  return norm(stripHtml(String(s||'')))
    .replace(/^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)\s+/,'')
    .replace(/,.*$/,'')
    .trim();
}
function lookupLexicon(term){
  if(!state.localeLexicon||!state.localeLexicon.entries)return null;
  const raw=String(term||'').trim();
  if(!raw)return null;
  const direct=Object.values(state.localeLexicon.entries).find(e=>e&&e.lexical_key===raw);
  if(direct)return direct;
  const k=cleanLexicalKey(raw);
  if(!k)return null;
  return state.localeLexicon.entries[k]||null;
}
function localizedTerm(term){
  const entry=lookupLexicon(term);
  if(!entry)return '';
  const lang=localeCode();
  const loc=entry.localizations?.[lang]||entry.localizations?.en;
  if(!loc)return '';
  const note=loc.context_note?` — ${loc.context_note}`:'';
  return `${loc.equivalent||''}${note}`.trim();
}
function displayVerbMeaning(v){
  const m=String(v?.meaning||'').trim();
  if(!m||/meaning to be added/i.test(m))return '';
  if(/^[a-zäöüß]+- \+ [a-zäöüß]+$/i.test(m))return '';
  return m;
}

async function loadData(){
  state.manifest=await vfetch('data-manifest.json').then(r=>r.json());
  const res=await Promise.allSettled(state.manifest.modules.map(async m=>{
    if(m.category==='practice')return null;
    const raw=await vfetch(m.path).then(r=>r.json());
    return{...m,raw,items:normalizeModule(raw,m)};
  }));
  state.modules=res.filter(r=>r.status==='fulfilled'&&r.value).map(r=>r.value);
}
function normalizeModule(raw,meta){
  if(meta.category==='konjugator')return[];
  if(raw.module_type==='sequenced_business_artifact')return [normalizeSequencedArtifact(raw,meta)];
  if(raw.module_type==='variable_template_module')return expandVariableTemplates(raw,meta);
  let arr=raw.items||raw.words||raw.vocabulary_entries||raw.vocabulary||raw.questions||[];
  if(raw.exercise_pool)arr=raw.exercise_pool.flatMap(x=>x.cases||[]);
  return arr.map((it,i)=>normalizeItem(it,meta,i)).filter(Boolean)
}

function expandVariableTemplates(raw,meta){
  const items=[];
  for(const tpl of raw.templates||[]){
    const slots=tpl.slots||{};
    const keys=Object.keys(slots);
    const total=Number(tpl.count||Math.max(1,keys.reduce((a,k)=>a*(slots[k]?.length||1),1)));
    for(let i=0;i<total;i++){
      const values={};
      keys.forEach((k,idx)=>{const arr=slots[k]||['']; values[k]=arr[(i+idx)%arr.length];});
      const fill=s=>String(s||'').replace(/\{([^}]+)\}/g,(_,k)=>values[k]??`{${k}}`);
      const answer=values[tpl.answer_slot]||'';
      items.push({
        id:`${tpl.id}_${i+1}`,
        moduleId:meta.id,moduleTitle:meta.title,category:meta.category,
        exerciseType:tpl.exerciseType||'gap_fill',
        prompt:fill(tpl.prompt_template||tpl.template),answer,
        choices:shuffle([answer,...Object.values(slots[tpl.answer_slot]||[]).filter(x=>x!==answer)]).slice(0,4),
        explanation:tpl.explanation||`Dynamic template from ${meta.title}.`,
        example:fill(tpl.template),translation:tpl.translation||'',raw:{...tpl,generatedValues:values},
        tags:['dynamic_template',tpl.skill].filter(Boolean),level:tpl.level||raw.cefr_level||'B2',germanSpeak:fill(tpl.template)
      });
    }
  }
  return items;
}
function normalizeSequencedArtifact(raw,meta){
  const steps=[...(raw.steps||[])].sort((a,b)=>(a.chronology_index||0)-(b.chronology_index||0));
  return {
    id:raw.scenario?.id||raw.module_id||meta.id,
    moduleId:meta.id,moduleTitle:meta.title,category:meta.category,
    exerciseType:'sequenced_business_artifact',
    prompt:raw.scenario?.situation||raw.title||meta.title,
    answer:'Sequenz abschließen',choices:[],
    explanation:`${raw.business_track||'Wirtschaftsdeutsch'} · ${raw.scenario?.tone_target||'formal'}.`,
    example:raw.artifact_assembly?.final_output_template?.join('\n')||'',
    translation:raw.scenario?.situation||'',
    level:raw.cefr_level||raw.level||'B2/C1',tags:['sequenced_artifact',raw.artifact_type||'business_artifact'],
    raw,steps,germanSpeak:raw.scenario?.situation||meta.title
  };
}
function pickLang(obj){if(!obj)return''; if(typeof obj!=='object')return stringify(obj); return obj.German||obj.Deutsch||obj[state.lang]||obj.English||Object.values(obj).find(Boolean)||''}
function germanDisplay(d){const g=d.grammar||{};const trans=d.translations||{};const raw=d.word||d.term||d.german||d.display||d.title||d.prompt||pickLang(trans);if(raw&&raw!=='undefined')return stringify(raw);if(g.article&&g.base)return`${g.article} ${g.base}${g.plural?`, ${String(g.plural).replace(/^die\s+/,'')}`:''}`; if(g.base)return stringify(g.base);return''}
function translationOf(d,it=null){const t=d.translations||{};const tp=(it&&it.translations)||{};const loc=localizedTerm(d.lexical_key)||localizedTerm(germanDisplay(d));return loc||t[state.lang]||t.English||tp[state.lang]||tp.English||d.english_equivalent||d.meaning||d.translation||d.answer||''}
function normalizeAnswerValue(v){return stringify(v).replace(/^undefined$/,'').trim()}
function normalizeItem(it,meta,i){
  const d=(it&&it.data)||it; if(!d||typeof d!=='object')return null;
  const isVocab=meta.category==='vocabulary'||meta.path.includes('vokabular');
  let prompt=normalizeAnswerValue(d.prompt||d.display||d.title||'');
  let answer=normalizeAnswerValue(d.answer||d.solution||d.correct||d.english_equivalent||d.meaning||d.translation||d.translations?.English||d.correct_adjective_inflection||d.correct_noun_inflection||'');
  let type=d.exerciseType||d.type||inferType(prompt,d,meta);
  const de=germanDisplay(d);
  if(isVocab){
    const trans=normalizeAnswerValue(translationOf(d,it));
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
  const translation=normalizeAnswerValue(translationOf(d,it));
  const example=normalizeAnswerValue(d.example||d.example_de||d.example_sentence||d.essential_collocations?.[0]?.example||d.collocations?.[0]?.example||'');
  const choices=d.choices||d.options||makeChoices(answer,type,d);
  if(!prompt||prompt==='undefined')prompt=`${meta.title} · Item ${i+1}`;
  if(!answer||answer==='undefined')answer=prompt;
  return{id:d.id||`${meta.id}_${i}`,moduleId:meta.id,moduleTitle:meta.title,category:meta.category,exerciseType:type,prompt,answer,choices,explanation,example,translation,raw:d,tags:d.tags||[],level:d.level||d.cefr||rawLevel(meta),germanSpeak:de||example||prompt};
}
function rawLevel(m){return(m.title||'').includes('B2')?'B2':'B1/B2'}
function inferType(prompt,d,meta){const p=String(prompt||'');const hay=`${p} ${meta.title} ${meta.id}`;if(d.choices||d.options||d.type==='classify')return'multiple_choice';if(p.includes('___'))return'gap_fill';if(/korrig|correct/i.test(p))return'sentence_correction';if(/conjug|Präsens|Präteritum|Perfekt|Modalverben|Konjugator/i.test(hay))return'verb_conjugation';return'flashcard'}
function richExplanation(d,meta,isVocab=false){const ex=d.explanation;if(typeof ex==='string'&&!ex.includes('Focus on meaning'))return ex;if(d.grammar_clarification)return stringify(d.grammar_clarification);if(d.grammar?.pattern)return stringify(d.grammar.pattern);if(d.essential_collocations?.length)return d.essential_collocations.map(c=>`${stringify(c.collocation)} — ${stringify(c.example)}`).join('<br>');if(d.collocations?.length)return d.collocations.map(c=>`${stringify(c.collocation||c)}${c.example?' — '+stringify(c.example):''}`).join('<br>');if(isVocab){const g=d.grammar||{};const pieces=[];if(g.article&&g.base)pieces.push(`Artikel: ${g.article}. Wort: ${g.base}.`);if(g.plural)pieces.push(`Plural: ${g.plural}.`);const entry=lookupLexicon(d.lexical_key)||lookupLexicon(germanDisplay(d));const trans=translationOf(d) || translationOf(d, meta?.raw || null);if(trans)pieces.push(`Bedeutung: ${trans}.`);const def=entry?.german_reference?.context_definition;if(def)pieces.push(`Kontext: ${def}.`);return pieces.join(' ')||`Wortschatz aus ${meta.title}.`}if(ex&&typeof ex==='object')return pickLang(ex);return`Thema: ${meta.title}. Achte auf Form, Position und Kontext.`}
function makeChoices(answer,type,context={}){const ans=String(answer||'').trim();if(!ans)return[];if(type==='article_trainer')return shuffle(['der','die','das']);if(type==='connector_selection'||/konnektor|connector/i.test(String(context.tags||context.category||'')+' '+String(context.prompt||''))){const pool=['und','aber','oder','sondern','weil','obwohl','trotzdem','deshalb','damit','bevor'];return[...new Set([ans,...pool.filter(x=>x!==ans)])].slice(0,4)}if(type==='multiple_choice'){const valid=context.choices||context.options;return valid&&valid.length?valid:[]}return[]}

function renderPath(){
  const pathOptions=PATHS.map(p=>`<option value="${p.id}">${esc(pathText(p.id,'title'))}</option>`).join('');
  if($('mobilePathSelect')){$('mobilePathSelect').innerHTML=pathOptions;$('mobilePathSelect').value=state.path;}
  $('pathNav').innerHTML=PATHS.map(p=>{const count=modulesForPath(p.id).reduce((a,m)=>a+m.items.length,0);return`<button class="path-btn" data-path="${p.id}"><span class="path-icon">${p.icon}</span><span><span class="path-title">${esc(pathText(p.id,'title'))}</span><span class="path-sub">${esc(pathText(p.id,'sub'))}</span></span><span class="path-count">${count}</span></button>`}).join('');
  document.querySelectorAll('.path-btn').forEach(b=>b.onclick=()=>{selectPath(b.dataset.path);toggleDrawer(false)})
}
function modulesForPath(id){
  const p=PATHS.find(x=>x.id===id);if(!p)return[];
  return state.modules.filter(m=>{
    const hay=`${m.id} ${m.title} ${m.path}`.toLowerCase();
    if(p.exclude&&p.exclude.some(s=>hay.includes(s)))return false;
    const byId=Array.isArray(p.ids)&&p.ids.includes(m.id);
    const byCat=Array.isArray(p.cats)&&p.cats.includes(m.category);
    const byMatch=Array.isArray(p.match)&&p.match.some(s=>hay.includes(String(s).toLowerCase()));
    return byId||byCat||byMatch;
  });
}
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
  if(state.path==='conjugation')html=`<option value="dynamic_conjugator">${tr('verbTraining')}</option>`+html;
  html+=mods.map(m=>`<option value="${esc(m.id)}">${esc(m.title)} (${m.items.length})</option>`).join('');
  $('moduleSelect').innerHTML=html;$('moduleSelect').value=state.moduleId;
  if($('mobileModuleSelect')){$('mobileModuleSelect').innerHTML=html;$('mobileModuleSelect').value=state.moduleId;}
}
function itemsForCurrentPath(){if(state.path==='conjugation'&&state.moduleId==='dynamic_conjugator')return generateConjugatorPractice();const mods=modulesForPath(state.path).filter(m=>state.moduleId==='all'||m.id===state.moduleId);return mods.flatMap(m=>m.items)}
function resetSession(){state.index=0;state.started=false;state.checked=false;state.selectedChoice='';state.sessionComplete=false;state.poolKey='';state.poolItems=[];state._skipped=new Set()}

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
          explanation:`${verb} (${v.type}): ${tense}. Hilfsverb: ${v.aux}. Partizip II: ${v.part}. ${v.zu}. Bedeutung: ${displayVerbMeaning(v)||'—'}.`,
          tags:['dynamic_conjugator',verb,tense],level:'A1-B2',
          translation:displayVerbMeaning(v)||'',germanSpeak:ans,_verb:verb,_tense:tense
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


function renderQuickStart(){
  const box=$('quickStartPanel'); if(!box) return;
  const tiles=[
    {key:'quickConj',path:'conjugation',mod:'dynamic_conjugator',mode:'practice',icon:'⚙️'},
    {key:'quickDecl',path:'declension',mod:'all',mode:'practice',icon:'🧬'},
    {key:'quickPrep',path:'prepositions',mod:'all',mode:'practice',icon:'📍'},
    {key:'quickReview',path:state.path,mod:state.moduleId,mode:'review',icon:'🔁'}
  ];
  const due=dueCount();
  box.innerHTML=`<div class="qs-head"><div class="eyebrow">${esc(tr('onboardingTitle'))}</div><p>${esc(tr('onboardingText'))}</p></div>
    <div class="qs-tiles">${tiles.map(t=>`<button class="qs-tile${t.mode==='review'&&due?' qs-tile--accent':''}" data-path="${esc(t.path)}" data-mod="${esc(t.mod)}" data-mode="${esc(t.mode)}"><span class="qs-icon" aria-hidden="true">${t.icon}</span><span class="qs-label">${esc(tr(t.key))}</span>${t.mode==='review'?`<span class="qs-meta">${due} ${esc(tr('dueToday'))}</span>`:''}</button>`).join('')}</div>`;
  box.querySelectorAll('.qs-tile').forEach(b=>b.onclick=()=>{
    const path=b.dataset.path, mod=b.dataset.mod, mode=b.dataset.mode;
    selectPath(path);
    state.moduleId=mod;
    if(path==='conjugation'&&mod==='dynamic_conjugator'){state.dynamicVerb='';state._conjGenKey='';}
    setMode(mode);
    renderModuleSelect();
    syncMobileControls();
    renderExercise();
  });
}

function renderAll(){renderPath();renderModuleSelect();renderDesignControls();syncMobileControls();renderQuickStart();renderExercise();renderStats();renderMistakes();renderConjugator();renderResources();localizeStaticUI()}

function renderResources(){
  const box=$('resourceList'); if(!box)return;
  const links=[
    [tr('resourceFriend'),'https://raim.github.io/dreizunge/#'],
    ['DW Learn German','https://learngerman.dw.com/'],
    [tr('resourceConjugator'),'https://www.verbformen.de/'],
    [tr('resourceDictionary'),'https://dict.leo.org/german-english/'],
    [tr('resourceGrammar'),'https://deutsch.lingolia.com/en/'],
    ['Duden','https://www.duden.de/'],
    ['Reverso Konjugator','https://conjugator.reverso.net/conjugation-german.html'],
    ['Goethe Übungen','https://www.goethe.de/en/spr/ueb.html']
  ];
  box.innerHTML=links.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join('');
}
function route(r){state.route=r;document.querySelectorAll('.top-tab').forEach(b=>b.classList.toggle('active',b.dataset.route===r));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));const view=$(`${r}View`);if(view)view.classList.add('active-view');if(r==='mistakes')renderMistakes();if(r==='conjugator')renderConjugator();if(r==='resources')renderResources();toggleDrawer(false)}
function setMode(m){state.mode=m;resetSession();document.querySelectorAll('.mode-chip').forEach(b=>b.classList.remove('active'));$({practice:'modePractice',learn:'modeLearn',review:'modeReview'}[m]).classList.add('active');renderExercise();renderStats()}

function targetLang(){return state.lang==='de'?'en':state.lang}
function textForTranslation(item){return item?.example||item?.prompt||item?.germanSpeak||item?.answer||''}
function translationLinks(text){
  const tl=encodeURIComponent(targetLang());
  const q=encodeURIComponent(stripHtml(text));
  return [
    ['Google Translate',`https://translate.google.com/?sl=de&tl=${tl}&text=${q}&op=translate`],
    ['DeepL',`https://www.deepl.com/translator#de/${tl}/${q}`]
  ];
}
function toggleTranslation(){
  const item=current(); if(!item)return;
  const box=$('translationBox');
  if(!box.classList.contains('hidden')){box.classList.add('hidden');box.innerHTML='';return;}
  const source=textForTranslation(item);
  const stored=(item.translation && norm(item.translation)!==norm(source) ? item.translation : '') || localizedTerm(item.prompt) || localizedTerm(item.germanSpeak) || localizedTerm(item.raw?.word||item.raw?.term||'');
  const links=translationLinks(source).map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join(' · ');
  box.innerHTML=`<div class="translation-head"><strong>${tr('translation')}</strong><span>${esc(state.lang.toUpperCase())}</span></div>
    <div class="translation-source"><b>DE:</b> ${safeHtml(source||'—')}</div>
    <div class="translation-target">${stored?`<b>${esc(targetLang().toUpperCase())}:</b> ${safeHtml(stored)}`:esc(tr('noStoredTranslation'))}</div>
    <div class="translation-links">${tr('externalTranslation')}: ${links}</div>`;
  box.classList.remove('hidden');
}


function sessionKeyFor(item){return `seq:${item.moduleId}:${item.id}`}
function getSequencedSession(item){
  const key=sessionKeyFor(item);
  if(!state.sequencedSessions[key]){
    state.sequencedSessions[key]={currentStepIndex:0,userOutputs:{},failures:{},completed:false,failedRules:[]};
    save('dw_modern_sequenced_sessions',state.sequencedSessions);
  }
  return state.sequencedSessions[key];
}
function saveSequencedSession(item,session){state.sequencedSessions[sessionKeyFor(item)]=session;save('dw_modern_sequenced_sessions',state.sequencedSessions)}
function currentSequencedStep(item){const s=getSequencedSession(item);return item.steps[Math.min(s.currentStepIndex,item.steps.length-1)]}
function resetSequencedSession(item){delete state.sequencedSessions[sessionKeyFor(item)];save('dw_modern_sequenced_sessions',state.sequencedSessions)}
function renderSequencedArtifact(item){
  const session=getSequencedSession(item);
  const raw=item.raw||{};
  const step=currentSequencedStep(item);
  $('levelBadge').textContent=item.level||'B2/C1';
  $('exercisePill').textContent='Sequenz';
  $('itemIndex').textContent=session.completed?`${item.steps.length} / ${item.steps.length}`:`${Math.min(session.currentStepIndex+1,item.steps.length)} / ${item.steps.length}`;
  $('cardProgressBar').style.width=(item.steps.length?Math.round((session.currentStepIndex/item.steps.length)*100):0)+'%';
  $('ruleBox').innerHTML=safeHtml(step?.rule?.concept||item.explanation||'—');
  $('exampleBox').innerHTML=safeHtml((raw.scenario?.tone_target?`Ton: ${raw.scenario.tone_target}. `:'')+(raw.business_track||''));
  $('questionTitle').textContent=raw.artifact_type==='formal_complaint_email'?'Reklamation als Geschäftsartefakt':item.moduleTitle;
  $('choiceZone').innerHTML='';$('answerZone').innerHTML='';$('feedbackBox').className='feedback hidden';$('translationBox').className='translation-box hidden';$('translationBox').innerHTML='';
  if(session.completed){renderAssembledArtifact(item,session);return;}
  $('questionText').innerHTML=renderScenarioHeader(item,session,step);
  renderSequencedInput(step);
  $('primaryAction').textContent='Prüfen';
  $('secondaryAction').classList.add('hidden');
}
function renderScenarioHeader(item,session,step){
  const s=item.raw?.scenario||{};
  const anchors=(s.chronology_anchors||[]).map(a=>`<span class="chrono-pill ${a.index===step?.chronology_index?'active':''}">${esc(a.event)}: ${esc(a.data)}</span>`).join('');
  return `<div class="scenario-card"><div class="scenario-meta"><span>${esc(item.raw?.business_track||'Wirtschaftsdeutsch')}</span><span>${esc(s.tone_target||'formal')}</span></div><p>${esc(s.situation||item.prompt)}</p><div class="chronology-row">${anchors}</div></div><h3 class="step-title">${esc(step?.section||'Step')} · ${esc(step?.skill||'')}</h3><p>${safeHtml(step?.prompt||'')}</p>${step?.text_template?`<p class="template-line">${safeHtml(step.text_template)}</p>`:''}`;
}
function renderSequencedInput(step){
  if(!step)return;
  if(step.exercise_type==='choice_register'){
    $('choiceZone').innerHTML=(step.choices||[]).map(c=>`<button class="choice-btn" data-choice="${esc(c.id)}"><span class="choice-id">${esc(c.id.toUpperCase())}</span>${esc(c.text)}</button>`).join('');
    document.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>{state.selectedChoice=b.dataset.choice;document.querySelectorAll('.choice-btn').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});
  } else if(step.exercise_type==='syntax_ordering'){
    const tokens=shuffle(step.tokens||[]);
    $('choiceZone').innerHTML=`<div class="token-bank">${tokens.map(t=>`<button class="token-btn" data-token="${esc(t)}">${esc(t)}</button>`).join('')}</div><div id="sequenceAnswer" class="sequence-answer" aria-label="Antwortsequenz"></div><button type="button" id="clearSequence" class="secondary-action small-inline">Zurücksetzen</button>`;
    document.querySelectorAll('.token-btn').forEach(b=>b.onclick=()=>{const span=document.createElement('button');span.type='button';span.className='seq-token';span.dataset.token=b.dataset.token;span.textContent=b.dataset.token;span.onclick=()=>{span.remove();b.disabled=false};$('sequenceAnswer').appendChild(span);b.disabled=true});
    $('clearSequence').onclick=()=>{document.querySelectorAll('.token-btn').forEach(b=>b.disabled=false);$('sequenceAnswer').innerHTML=''};
  } else {
    const placeholder=step.exercise_type==='production_controlled'?'Formuliere den Satz…':'Antwort eingeben…';
    $('answerZone').innerHTML=`<textarea id="answerInput" class="answer-input long-answer" autocomplete="off" placeholder="${placeholder}"></textarea>`;
    setTimeout(()=>$('answerInput')?.focus(),30);
  }
}
function readSequencedAnswer(step){
  if(step.exercise_type==='choice_register')return state.selectedChoice||'';
  if(step.exercise_type==='syntax_ordering')return Array.from(document.querySelectorAll('#sequenceAnswer .seq-token')).map(x=>x.dataset.token||x.textContent);
  return $('answerInput')?.value||'';
}
function normalizeGerman(s){return norm(String(s||'')).replace(/[.,;:!?]/g,'').replace(/\s+/g,' ').trim()}
function arraysEqual(a,b){return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((x,i)=>String(x).trim()===String(b[i]).trim())}
function detectOrderingError(step,userTokens){const joined=userTokens.join(' ');for(const item of step.distractor_analysis||[]){const pattern=(item.pattern||[]).join(' ');if(pattern&&joined.includes(pattern))return{diagnosis:item.diagnosis,highlightTokens:item.pattern}}return null}
function detectForbiddenPattern(step,userText){const u=normalizeGerman(userText);for(const item of step.forbidden_patterns||[]){if(u.includes(normalizeGerman(item.pattern)))return{diagnosis:item.diagnosis,highlightTokens:[item.pattern]}}return null}
function matchesControlledProduction(step,userText){const u=normalizeGerman(userText);if((step.forbidden_patterns||[]).some(p=>u.includes(normalizeGerman(p.pattern))))return false;const mandatory=step.mandatory_tokens||[];if(mandatory.length&&mandatory.some(t=>!u.includes(normalizeGerman(t))))return false;const patterns=step.accepted_patterns||step.target_phrases||[];if(patterns.length)return patterns.some(p=>u.includes(normalizeGerman(p)));return !!u}
function resolveStepOutput(step,userAnswer){
  if(step.exercise_type==='choice_register'){const c=(step.choices||[]).find(x=>x.id===userAnswer)||{};return c.text||step.progressive_feedback?.resolved_model||''}
  if(step.exercise_type==='syntax_ordering')return Array.isArray(userAnswer)?userAnswer.join(' '):String(userAnswer||'');
  if(step.exercise_type==='gap_fill_syntax')return step.text_template?step.text_template.replace('___',String(userAnswer||'')):String(userAnswer||'');
  return String(userAnswer||step.progressive_feedback?.resolved_model||'');
}
function evaluateSequencedStep(step,userAnswer,session){
  let correct=false, detectedError=null;
  if(step.exercise_type==='choice_register'){
    correct=userAnswer===step.best_choice;const choice=(step.choices||[]).find(c=>c.id===userAnswer);if(!correct&&choice)detectedError={diagnosis:choice.diagnosis};
  } else if(step.exercise_type==='gap_fill_syntax'){
    correct=(step.accepted_answers||[]).map(normalizeGerman).includes(normalizeGerman(userAnswer));
  } else if(step.exercise_type==='syntax_ordering'){
    correct=arraysEqual(userAnswer,step.correct_sequence);if(!correct)detectedError=detectOrderingError(step,userAnswer);
  } else if(step.exercise_type==='production_controlled'){
    correct=matchesControlledProduction(step,userAnswer);if(!correct)detectedError=detectForbiddenPattern(step,userAnswer);
  }
  if(correct)return{status:'correct',stage:0,stepId:step.step_id,ruleId:step.rule?.id,message:'Richtig.',resolvedModel:resolveStepOutput(step,userAnswer),reviewTags:[step.rule?.id,step.skill].filter(Boolean)};
  const f=session.failures||{};const stage=Math.min((f[step.step_id]||0)+1,3);f[step.step_id]=stage;session.failures=f;
  const pf=step.progressive_feedback||{};
  return{status:stage>=3?'resolved':'incorrect',stage,stepId:step.step_id,ruleId:step.rule?.id,message:stage===1?pf.first_failure:stage===2?pf.second_failure:'Modelllösung angezeigt.',diagnosis:detectedError?.diagnosis||step.rule?.concept||'',highlightTokens:detectedError?.highlightTokens||[],resolvedModel:stage>=3?pf.resolved_model:null,reviewTags:[step.rule?.id,step.skill].filter(Boolean)};
}
function renderProgressiveFeedback(result,step){
  const box=$('feedbackBox');box.className=`feedback ${result.status==='correct'?'ok':'bad'} feedback-stage-${result.stage||0}`;
  const title=result.status==='correct'?'✓ Richtig':(result.stage===1?'Noch nicht · Struktur prüfen':result.stage===2?'Regelhinweis':'Modelllösung');
  const highlights=(result.highlightTokens||[]).length?`<div class="feedback-highlights"><b>Prüfe:</b> ${(result.highlightTokens||[]).map(esc).join(' · ')}</div>`:'';
  const rule=(result.stage>=2&&step.rule?.concept)?`<aside class="rule-hint">${esc(step.rule.concept)}</aside>`:'';
  const model=result.resolvedModel?`<div class="resolved-model">${esc(result.resolvedModel)}</div>`:'';
  box.innerHTML=`<h3>${esc(title)}</h3><p>${safeHtml(result.message||'')}</p>${result.diagnosis?`<p class="feedback-diagnosis">${safeHtml(result.diagnosis)}</p>`:''}${highlights}${rule}${model}`;
  box.classList.remove('hidden');
}
function checkSequencedAnswer(item){
  const session=getSequencedSession(item);const step=currentSequencedStep(item);const userAnswer=readSequencedAnswer(step);const result=evaluateSequencedStep(step,userAnswer,session);
  renderProgressiveFeedback(result,step);saveSequencedSession(item,session);
  if(result.status==='correct'||result.status==='resolved'){
    session.userOutputs[step.section]=result.resolvedModel||resolveStepOutput(step,userAnswer);
    session.currentStepIndex+=1;session.failedRules=[...(session.failedRules||[]),...(result.status==='resolved'?[step.rule?.id]:[])].filter(Boolean);
    if(session.currentStepIndex>=item.steps.length)session.completed=true;
    saveSequencedSession(item,session);
    $('secondaryAction').textContent=session.completed?'Artefakt anzeigen':'Nächster Schritt';
    $('secondaryAction').classList.remove('hidden');
    $('secondaryAction').onclick=()=>{state.selectedChoice='';renderExercise()};
    updateStats(result.status==='correct',item);if(result.status!=='correct')addMistake(item,result.resolvedModel||'resolved');scheduleSrs(item,result.status==='correct');renderStats();
  }
}
function renderAssembledArtifact(item,session){
  const raw=item.raw||{};const lines=(raw.artifact_assembly?.final_output_template||[]).map(line=>line.replace(/\{([^}]+)\}/g,(_,k)=>session.userOutputs[k]||`[${k}]`));
  $('questionText').innerHTML=`<div class="artifact-preview din-letter"><h3>Fertige Reklamation</h3><pre>${esc(lines.join('\n'))}</pre></div>`;
  $('choiceZone').innerHTML='';$('answerZone').innerHTML='';$('feedbackBox').className='feedback ok';$('feedbackBox').innerHTML='<strong>Sequenz abgeschlossen.</strong> Die Antworten wurden zu einem Geschäftsartefakt zusammengesetzt.';
  $('primaryAction').textContent='Sequenz neu starten';$('secondaryAction').classList.add('hidden');
}

function renderExercise(){
  const p=PATHS.find(x=>x.id===state.path);
  const items=filteredItems();
  const item=items[state.index];
  $('currentPathLabel').textContent=pathText(state.path,'title')||tr('learnRoute');
  $('moduleTitle').textContent=pathText(state.path,'title')||'Deutsch trainieren';
  $('moduleDescription').textContent=pathText(state.path,'sub')||'';
  $('moduleCount').textContent=`${items.length} ${items.length===1?tr('item'):tr('items')}`;
  $('levelBadge').textContent=item?.level||'B1/B2';
  $('exercisePill').textContent=item?label(item.exerciseType):tr('exercise');
  $('itemIndex').textContent=items.length?`${Math.min(state.index+1,items.length)} / ${items.length}`:'—';
  // Progress bar
  const pct=items.length?Math.round((state.index/items.length)*100):0;
  $('cardProgressBar').style.width=pct+'%';
  if($('meterWrap'))$('meterWrap').setAttribute('aria-valuenow',pct);

  $('feedbackBox').className='feedback hidden';
  $('translationBox').className='translation-box hidden';$('translationBox').innerHTML='';
  $('choiceZone').innerHTML='';$('answerZone').innerHTML='';
  $('secondaryAction').classList.add('hidden');
  $('conjugatorLink').classList.add('hidden');

  // Hero collapse: collapse once session is active
  const hero=$('heroCard');
  if(state.started&&item)hero.classList.add('collapsed');
  else hero.classList.remove('collapsed');

  if(!item){
    $('questionTitle').textContent=state.mode==='review'&&state.reviewEmptyReason==='noSrs'?tr('review_empty'):tr('no_items');
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
      <p>${items.length} ${items.length===1?tr('item'):tr('items')} ${tr('completedItems')}.</p>
    </div>`;
    // Single-click restart — primary button directly restarts
    $('primaryAction').textContent=tr('restart');
    state.started=false;
    return;
  }
  if(!state.started){
    $('questionTitle').textContent=tr('ready_q');
    $('questionText').textContent=tr('ready');
    $('primaryAction').textContent=tr('start');
    return;
  }
  if(item.exerciseType==='sequenced_business_artifact'){renderSequencedArtifact(item);return;}
  $('questionTitle').textContent=item.moduleTitle||tr('exercise');
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
    $('answerZone').innerHTML=`<input id="answerInput" class="answer-input" autocomplete="off" placeholder="${esc(tr('answerPlaceholder'))}">`;
    setTimeout(()=>$('answerInput')?.focus(),30);
  }
}

function primary(){
  if(state.sessionComplete){resetSession();renderExercise();return}
  if(!state.started){state.started=true;state.checked=false;renderExercise();return}
  const item=current();if(!item)return;
  if(item.exerciseType==='sequenced_business_artifact'){
    const session=getSequencedSession(item);
    if(session.completed){resetSequencedSession(item);state.selectedChoice='';renderExercise();return;}
    checkSequencedAnswer(item);return;
  }
  if(state.mode==='learn'){next();return}
  checkAnswer(item);
}

function answersMatch(user,correct,item){
  const u=norm(user),c=norm(correct);
  // Strict capitalisation for nouns/articles/plurals
  if(['article_trainer','plural_trainer','case_trainer'].includes(item?.exerciseType)){
    if(String(user).trim()===String(correct).trim())return true;
    if(u===c)return 'case_mismatch';
    return false;
  }
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


function feedbackKey(item){return `dw_fail:${item.moduleId}:${item.id}`}
function getGenericFailureStage(item){const k=feedbackKey(item);const n=Math.min(Number(localStorage.getItem(k)||0)+1,3);localStorage.setItem(k,String(n));return n}
function resetGenericFailureStage(item){localStorage.removeItem(feedbackKey(item))}
function genericHintFor(item,stage,user){
  const raw=item.raw||{};
  const base=raw.feedback||raw.progressive_feedback||{};
  const rule=item.explanation||raw.rule?.concept||'';
  if(stage===1)return base.first_failure||base.firstFailure||'Noch nicht. Prüfe Form, Kasus, Wortstellung oder Register.';
  if(stage===2)return base.second_failure||base.secondFailure||rule||'Nutze die Regel im rechten Panel und vergleiche die Struktur mit dem Beispiel.';
  return base.resolved_model||base.resolvedModel||`Modell: ${item.answer}`;
}
function checkAnswer(item){
  const user=state.selectedChoice||$('answerInput')?.value||'';
  const matchResult=answersMatch(user,item.answer,item);
  const ok=matchResult===true;
  const nearMiss=matchResult==='case_mismatch';
  let stage=0;
  if(ok){
    resetGenericFailureStage(item);
    state.checked=true;
  }else{
    stage=getGenericFailureStage(item);
    state.checked=stage>=3;
  }

  // Visual feedback on choice buttons. Do not reveal the correct answer before stage 3.
  if(item.choices&&item.choices.length){
    document.querySelectorAll('.choice-btn').forEach(b=>{
      b.disabled=ok || stage>=3;
      b.classList.remove('correct-reveal','wrong-reveal');
      if(ok && b.dataset.choice===item.answer)b.classList.add('correct-reveal');
      if(!ok && b.dataset.choice===user)b.classList.add('wrong-reveal');
      if(!ok && stage>=3 && b.dataset.choice===item.answer)b.classList.add('correct-reveal');
    });
  }

  // Progressive feedback content. First two failures are hints; third failure resolves.
  let fbHtml='';
  if(ok){
    fbHtml=`<span class="feedback-correct-mark">✓</span><strong>${tr('correct')}.</strong><br>${safeHtml(item.example||item.answer)}<br>${safeHtml(item.explanation||'')}`;
  }else{
    const hint=genericHintFor(item,stage,user);
    const title=stage===1?'Noch nicht · gezielter Hinweis':stage===2?'Regelhinweis':'Modelllösung';
    const answerLine=stage>=3?`<br><b>${tr('answer')}:</b> ${esc(item.answer)}`:'';
    fbHtml=`<span class="feedback-wrong-mark">${stage>=3?'✗':'?'}</span><strong>${nearMiss?'Fast richtig: Groß-/Kleinschreibung prüfen.':title}</strong><br>${safeHtml(hint)}${answerLine}<br><b>${tr('why')}</b> ${safeHtml(item.explanation||'')}`;
  }

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

  $('feedbackBox').className=`feedback ${ok?'ok':'bad'} feedback-stage-${stage}`;
  $('feedbackBox').innerHTML=fbHtml;

  if(ok || stage>=3){
    $('secondaryAction').textContent=tr('next');
    $('secondaryAction').classList.remove('hidden');
    updateStats(ok,item);
    if(!ok)addMistake(item,user);
    scheduleSrs(item,ok);
    renderStats();
  }else{
    $('secondaryAction').classList.add('hidden');
    $('primaryAction').textContent=tr('check');
  }
}

// Skip item: moves to next without marking right or wrong
function skipItem(){
  if(!state.started||state.checked)return;
  const items=filteredItems();
  if(!items.length)return;
  state._skipped=state._skipped||new Set();
  const cur=state.poolItems[state.index];
  if(cur)state._skipped.add(cur.id);
  if(state._skipped.size>=state.poolItems.length){state.sessionComplete=true;state.started=false;state._skipped=new Set();renderExercise();return;}
  const skipped=state.poolItems.splice(state.index,1)[0];
  state.poolItems.push(skipped);
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
  $('answeredCount').textContent=`${s.a} ${tr('answered')}`;
  $('mistakeCount').textContent=`${state.mistakes.length} ${tr('mistakes')} · ${dueCount()} ${tr('dueToday')}`;
  if($('progressLabel'))$('progressLabel').textContent=tr('sessionStats');
}
function renderMistakes(){
  if(!$('mistakeList'))return;
  if(!state.mistakes.length){$('mistakeList').innerHTML=`<p class="muted">${tr('noMistakes')}. ${dueCount()} ${tr('dueToday')}.</p>`;return}
  $('mistakeList').innerHTML=state.mistakes.map((m,idx)=>`<div class="mistake-item">
    <strong>${esc(m.item.prompt)}</strong><br>
    <span>${tr('yourAnswer')}: ${esc(m.user||'—')}</span><br>
    <span>${tr('answer')}: ${esc(m.item.answer||'—')}</span>
    <p>${safeHtml(m.item.explanation||'')}</p>
    <button class="mistake-retry" data-idx="${idx}">${tr('retryMistake')} →</button>
  </div>`).join('');
  $('mistakeList').onclick=ev=>{const b=ev.target.closest('.mistake-retry');if(!b)return;const m=state.mistakes[Number(b.dataset.idx)];if(!m)return;route('learn');selectPath(state.path);state.poolItems=[m.item];state.poolKey='retry:'+m.id;state.index=0;state.started=true;state.checked=false;state.selectedChoice='';renderExercise();};
}

const LABELS={de:{verb_conjugation:'Konjugation',gap_fill:'Lücke',multiple_choice:'Auswahl',sentence_correction:'Korrektur',flashcard:'Karte',translation_into_german:'Übersetzen',active_recall:'Aktiv erinnern',perfekt_builder:'Perfekt',connector_selection:'Konnektor',article_trainer:'Artikel',plural_trainer:'Plural',case_trainer:'Kasus',sequenced_business_artifact:'Sequenz',gap_fill_syntax:'Lücke',choice_register:'Register',syntax_ordering:'Satzbau',production_controlled:'Produktion'},en:{verb_conjugation:'Conjugation',gap_fill:'Gap',multiple_choice:'Choice',sentence_correction:'Correction',flashcard:'Card',translation_into_german:'Translate',active_recall:'Recall',perfekt_builder:'Perfekt',connector_selection:'Connector',article_trainer:'Article',plural_trainer:'Plural',case_trainer:'Case',sequenced_business_artifact:'Sequence',gap_fill_syntax:'Gap',choice_register:'Register',syntax_ordering:'Word order',production_controlled:'Production'}};
Object.assign(LABELS,{fr:{verb_conjugation:'Conjugaison',gap_fill:'Trou',multiple_choice:'Choix',sentence_correction:'Correction',flashcard:'Carte',translation_into_german:'Traduction',active_recall:'Rappel actif',perfekt_builder:'Perfekt',connector_selection:'Connecteur',article_trainer:'Article',plural_trainer:'Pluriel',case_trainer:'Cas',sequenced_business_artifact:'Séquence',gap_fill_syntax:'Trou',choice_register:'Registre',syntax_ordering:'Ordre des mots',production_controlled:'Production'},es:{verb_conjugation:'Conjugación',gap_fill:'Hueco',multiple_choice:'Opción',sentence_correction:'Corrección',flashcard:'Tarjeta',translation_into_german:'Traducción',active_recall:'Recuerdo activo',perfekt_builder:'Perfekt',connector_selection:'Conector',article_trainer:'Artículo',plural_trainer:'Plural',case_trainer:'Caso',sequenced_business_artifact:'Secuencia',gap_fill_syntax:'Hueco',choice_register:'Registro',syntax_ordering:'Orden de palabras',production_controlled:'Producción'}});
function label(x){const pack=LABELS[state.lang]||LABELS.en;return pack[x]||LABELS.en[x]||LABELS.de[x]||x||tr('exercise')}
let _lastSpeak=0;
function speak(text){if(!text||!('speechSynthesis'in window))return;const now=Date.now();if(now-_lastSpeak<250)return;_lastSpeak=now;const u=new SpeechSynthesisUtterance(stripHtml(text));u.lang='de-DE';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}

async function loadConjugator(){
  try{
    const verbPack=await vfetch('data/curated_verbs.json').then(r=>r.json());
    state.curatedVerbs=verbPack;
    state.conjugator={pronouns:verbPack.pronouns||['ich','du','er/sie/es','wir','ihr','sie/Sie'],verbs:verbPack.verbs||{}};
    state.verb=Object.keys(state.conjugator.verbs)[0];
  }catch(e){console.warn('Could not load conjugator',e)}
}
function renderConjugator(){if(!state.conjugator||state.route!=='conjugator')return;renderVerbList();renderVerbDetail()}
function renderVerbList(){
  if(!state.conjugator)return;
  const q=norm($('verbSearch')?.value||'');
  const defaultStarter=['sein','haben','werden','können','müssen','dürfen','sollen','wollen','mögen','arbeiten','antworten','beantworten','bekommen','bedeuten','berichten','vergleichen','machen','gehen','kommen','fahren','schreiben','sprechen','nehmen','geben','finden'];
  const starter=(state.curatedVerbs?.starter||defaultStarter).filter(v=>state.conjugator.verbs[v]);
  const top300=(state.curatedVerbs?.top300||starter).filter(v=>state.conjugator.verbs[v]);
  const all=Object.keys(state.conjugator.verbs).sort((a,b)=>a.localeCompare(b,'de'));
  let verbs,meta='';
  if(q){
    verbs=all.filter(v=>norm(v).includes(q));
    meta=`${verbs.length} ${tr('hits')} · ${all.length} ${tr('verbsAvailable')}`;
  }else if(state.verbListMode==='all'){
    verbs=all; meta=`${tr('allCount')} ${all.length} ${tr('verbsAvailable')}`;
  }else if(state.verbListMode==='curated'){
    verbs=top300; meta=`${tr('curatedSelection')} · ${verbs.length} ${tr('shown')} · ${all.length} ${tr('available')}`;
  }else{
    verbs=starter; meta=`${tr('starterList')} · ${verbs.length} ${tr('shown')} · ${all.length} ${tr('available')}`;
  }
  const modeControls=!q?`<div class="verb-list-modes">
    <button class="link-button ${state.verbListMode==='starter'?'active':''}" data-vmode="starter">${tr('starter')}</button>
    <button class="link-button ${state.verbListMode==='curated'?'active':''}" data-vmode="curated">${tr('curated')}</button>
    <button class="link-button ${state.verbListMode==='all'?'active':''}" data-vmode="all">${tr('allVerbs')}</button>
  </div>`:'';
  $('verbList').innerHTML=`<div class="verb-list-meta"><span>${esc(meta)}</span></div>${modeControls}`+verbs.map(v=>`<button class="verb-btn ${v===state.verb?'active':''}" data-verb="${esc(v)}"><strong>${esc(v)}</strong><br><small>${esc(displayVerbMeaning(state.conjugator.verbs[v])||'')}</small></button>`).join('');
  document.querySelectorAll('[data-vmode]').forEach(b=>b.onclick=()=>{state.verbListMode=b.dataset.vmode;renderVerbList()});
  document.querySelectorAll('.verb-btn').forEach(b=>b.onclick=()=>{state.verb=b.dataset.verb;state.tense='Präsens';renderVerbList();renderVerbDetail()});
}
function renderVerbDetail(){
  const v=state.conjugator.verbs[state.verb];if(!v)return;
  const keys={'Präsens':'present','Präteritum':'preterite','Perfekt':'perfect','Plusquamperfekt':'plusquam','Futur I':'futur1','Konjunktiv II':'konj2','Imperativ':'imperative'};
  $('verbMeta').innerHTML=`<div class="eyebrow">${esc(v.type)}</div><h2>${esc(state.verb)}</h2><div class="verb-chips"><span>${tr('auxVerb')}: ${esc(v.aux)}</span><span>${tr('participle')}: ${esc(v.part)}</span><span>${esc(v.zu)}</span><span>${esc(displayVerbMeaning(v)||'')}</span></div><p>${esc(v.example)}</p>`;
  $('tenseTabs').innerHTML=Object.keys(keys).map(t=>`<button class="tense-tab ${t===state.tense?'active':''}" data-tense="${t}" role="tab" aria-selected="${t===state.tense}">${t}</button>`).join('');
  document.querySelectorAll('.tense-tab').forEach(b=>b.onclick=()=>{state.tense=b.dataset.tense;renderVerbDetail()});
  const forms=v[keys[state.tense]]||[];
  const pronouns=state.tense==='Imperativ'?['du','ihr','Sie']:state.conjugator.pronouns;
  $('tenseTable').innerHTML=forms.map((f,i)=>`<div class="tense-row"><strong>${esc(pronouns[i]||'')}</strong><span>${esc(f)}</span></div>`).join('');
  $('verbPractice').innerHTML=`${tr('practiceVerb')} <b>${esc(state.verb)}</b> ${tr('inTense')} ${esc(state.tense)}.`;
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
