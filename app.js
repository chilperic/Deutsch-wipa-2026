// ═══════════════════════════════════════════════════════════════════════
//  Deutsch-WiPA 2026  —  app.js
//  Single-file SPA for B1/B2 German workplace vocabulary & grammar.
// ═══════════════════════════════════════════════════════════════════════

// ── Language config ─────────────────────────────────────────────────────
const LANGS = [
  ['de','Deutsch','ltr'],['en','English','ltr'],['fr','Français','ltr'],['es','Español','ltr'],
  ['it','Italiano','ltr'],['pt','Português','ltr'],['uk','Українська','ltr'],['ru','Русский','ltr'],
  ['pl','Polski','ltr'],['tr','Türkçe','ltr'],['ar','العربية','rtl'],['fa','فارسی','rtl'],
  ['zh','中文','ltr'],['ja','日本語','ltr'],['ko','한국어','ltr'],['th','ไทย','ltr']
];
const CODE_TO_NAME = {
  de:'German',en:'English',fr:'French',es:'Spanish',it:'Italian',pt:'Portuguese',
  ar:'Arabic',fa:'Persian',uk:'Ukrainian',ru:'Russian',pl:'Polish',tr:'Turkish',
  zh:'Chinese',ja:'Japanese',ko:'Korean',th:'Thai'
};

// ── i18n strings ─────────────────────────────────────────────────────────
const BASE_EN = {
  subtitle:'B1/B2 Beruf trainer',learnerName:'Your name',
  vocabulary:'Vocabulary',grammar:'Grammar',conjugation:'Verb forms',
  communication:'Communication',integration:'Everyday & integration',
  exam:'Exam training',training:'Exercise types',writing:'Writing',
  reading:'Reading',speaking:'Speaking',
  learnMode:'Learn',practiceMode:'Practice',challengeMode:'Challenge',mistakeMode:'Mistakes',
  start:'Start',check:'Check',next:'Next',prev:'Back',
  correctMsg:'Correct!',incorrectMsg:'Incorrect.',submittedMsg:'Self-check.',
  correctAnswer:'Correct answer',yourAnswer:'Your answer',
  why:'Explanation',rule:'Rule',example:'Example',
  addedMistake:'Added to mistake bank.',noMistakes:'No mistakes yet.',
  loading:'Loading…',writeAnswer:'Your answer…',writeLongAnswer:'Write your text here…',
  chooseAnswer:'Choose an answer.',
  translation:'Translation',explanation:'Explanation',
  modeLearnIntro:'Study the card. Press Start to begin.',
  allTypes:'All types',checklist:'Checklist',
  selfCheck:'Compare with model. Open tasks are not auto-graded.',
  itemType:'Type',wordCount:'words',noItems:'No items match this filter.',
  globalStat:'All time',streakMsg:'in a row',install:'Install',
  clearMistakes:'Clear all',speakBtn:'Speak',
  hintTitle:'Hint',mistakeTitle:'Mistake bank',
};

const T = {
  en: BASE_EN,
  de: { ...BASE_EN,
    subtitle:'B1/B2 Berufstrainer',learnerName:'Dein Name',
    vocabulary:'Wortschatz',grammar:'Grammatik',conjugation:'Verbformen',
    communication:'Kommunikation',integration:'Alltag & Integration',
    exam:'Prüfungsvorbereitung',training:'Übungstypen',
    writing:'Schreiben',reading:'Lesen',speaking:'Sprechen',
    learnMode:'Lernen',practiceMode:'Üben',challengeMode:'Challenge',mistakeMode:'Fehler',
    start:'Start',check:'Prüfen',next:'Weiter',prev:'Zurück',
    correctMsg:'Richtig!',incorrectMsg:'Falsch.',submittedMsg:'Selbstkontrolle.',
    correctAnswer:'Richtige Antwort',yourAnswer:'Deine Antwort',
    why:'Erklärung',rule:'Regel',example:'Beispiel',
    addedMistake:'In Fehlerbank gespeichert.',noMistakes:'Noch keine Fehler.',
    loading:'Wird geladen…',writeAnswer:'Deine Antwort…',writeLongAnswer:'Schreibe deinen Text hier…',
    chooseAnswer:'Wähle eine Antwort.',
    translation:'Übersetzung',explanation:'Erklärung',
    modeLearnIntro:'Schau dir die Karte an. Drücke Start um zu beginnen.',
    allTypes:'Alle Typen',checklist:'Checkliste',
    selfCheck:'Vergleiche mit der Musterlösung. Offene Aufgaben werden nicht automatisch bewertet.',
    itemType:'Typ',wordCount:'Wörter',noItems:'Keine Einträge für diesen Filter.',
    globalStat:'Gesamt',streakMsg:'in Folge',install:'Installieren',
    clearMistakes:'Alle löschen',speakBtn:'Aussprechen',
    hintTitle:'Hinweis',mistakeTitle:'Fehlerbank',
  },
  fr: { ...BASE_EN,
    vocabulary:'Vocabulaire',grammar:'Grammaire',conjugation:'Conjugaison',
    communication:'Communication',integration:'Vie quotidienne',exam:'Examen',
    writing:'Écriture',reading:'Lecture',speaking:'Expression orale',
    learnMode:'Apprendre',practiceMode:'Pratiquer',challengeMode:'Défi',mistakeMode:'Erreurs',
    start:'Commencer',check:'Vérifier',next:'Suivant',prev:'Précédent',
    correctMsg:'Correct !',incorrectMsg:'Incorrect.',submittedMsg:'Auto-évaluation.',
    correctAnswer:'Réponse correcte',yourAnswer:'Ta réponse',
    why:'Explication',noMistakes:'Pas encore d\'erreurs.',loading:'Chargement…',
    writeAnswer:'Ta réponse…',writeLongAnswer:'Écris ton texte ici…',
    translation:'Traduction',explanation:'Explication',
    modeLearnIntro:'Étudie la carte. Appuie sur Commencer.',
    allTypes:'Tous les types',itemType:'Type',noItems:'Aucun élément.',
    clearMistakes:'Tout effacer',install:'Installer',
  },
  es: { ...BASE_EN,
    vocabulary:'Vocabulario',grammar:'Gramática',conjugation:'Conjugación',
    communication:'Comunicación',integration:'Vida cotidiana',exam:'Examen',
    writing:'Escritura',reading:'Lectura',speaking:'Expresión oral',
    learnMode:'Aprender',practiceMode:'Practicar',challengeMode:'Reto',mistakeMode:'Errores',
    start:'Empezar',check:'Comprobar',next:'Siguiente',prev:'Anterior',
    correctMsg:'¡Correcto!',incorrectMsg:'Incorrecto.',submittedMsg:'Autoevaluación.',
    correctAnswer:'Respuesta correcta',yourAnswer:'Tu respuesta',
    why:'Explicación',noMistakes:'Sin errores aún.',loading:'Cargando…',
    writeAnswer:'Tu respuesta…',writeLongAnswer:'Escribe tu texto aquí…',
    translation:'Traducción',explanation:'Explicación',
    modeLearnIntro:'Estudia la tarjeta. Pulsa Empezar.',
    allTypes:'Todos los tipos',itemType:'Tipo',noItems:'Sin elementos.',
    clearMistakes:'Borrar todo',install:'Instalar',
  },
  ar: { ...BASE_EN,
    vocabulary:'المفردات',grammar:'القواعد',conjugation:'تصريف الأفعال',
    communication:'التواصل',integration:'الحياة اليومية',exam:'الامتحان',
    writing:'الكتابة',reading:'القراءة',speaking:'التحدث',
    learnMode:'تعلّم',practiceMode:'تدريب',challengeMode:'تحدي',mistakeMode:'أخطاء',
    start:'ابدأ',check:'تحقق',next:'التالي',prev:'السابق',
    correctMsg:'صحيح!',incorrectMsg:'خطأ.',submittedMsg:'مراجعة ذاتية.',
    correctAnswer:'الإجابة الصحيحة',yourAnswer:'إجابتك',
    why:'الشرح',noMistakes:'لا أخطاء بعد.',loading:'جارٍ التحميل…',
    writeAnswer:'إجابتك…',writeLongAnswer:'اكتب نصك هنا…',
    translation:'الترجمة',explanation:'الشرح',
    modeLearnIntro:'ادرس البطاقة ثم اضغط ابدأ.',
    allTypes:'كل الأنواع',itemType:'النوع',noItems:'لا توجد عناصر.',
    clearMistakes:'حذف الكل',install:'تثبيت',
  },
  fa: { ...BASE_EN,
    vocabulary:'واژگان',grammar:'دستور زبان',conjugation:'صرف فعل',
    communication:'ارتباط',integration:'زندگی روزمره',exam:'آزمون',
    writing:'نوشتن',reading:'خواندن',speaking:'مکالمه',
    learnMode:'یادگیری',practiceMode:'تمرین',challengeMode:'چالش',mistakeMode:'اشتباه‌ها',
    start:'شروع',check:'بررسی',next:'بعدی',prev:'قبلی',
    correctMsg:'درست!',incorrectMsg:'نادرست.',submittedMsg:'بررسی شخصی.',
    correctAnswer:'پاسخ درست',yourAnswer:'پاسخ شما',
    why:'توضیح',noMistakes:'هنوز اشتباهی نیست.',loading:'بارگذاری…',
    writeAnswer:'پاسخ شما…',writeLongAnswer:'متن خود را بنویسید…',
    translation:'ترجمه',explanation:'توضیح',
    modeLearnIntro:'کارت را مطالعه کنید، سپس شروع را بزنید.',
    allTypes:'همه انواع',itemType:'نوع',noItems:'موردی یافت نشد.',
    clearMistakes:'پاک کردن همه',install:'نصب',
  },
  uk: { ...BASE_EN,
    vocabulary:'Словник',grammar:'Граматика',conjugation:'Відмінювання',
    communication:'Спілкування',integration:'Повсякденне життя',exam:'Іспит',
    writing:'Письмо',reading:'Читання',speaking:'Мовлення',
    learnMode:'Вивчати',practiceMode:'Практика',challengeMode:'Виклик',mistakeMode:'Помилки',
    start:'Старт',check:'Перевірити',next:'Далі',prev:'Назад',
    correctMsg:'Правильно!',incorrectMsg:'Неправильно.',submittedMsg:'Самоперевірка.',
    correctAnswer:'Правильна відповідь',yourAnswer:'Ваша відповідь',
    why:'Пояснення',noMistakes:'Помилок ще немає.',loading:'Завантаження…',
    writeAnswer:'Ваша відповідь…',writeLongAnswer:'Напишіть тут свій текст…',
    translation:'Переклад',explanation:'Пояснення',
    modeLearnIntro:'Вивчіть картку. Натисніть Старт.',
    allTypes:'Усі типи',itemType:'Тип',noItems:'Немає елементів.',
    clearMistakes:'Видалити все',install:'Встановити',
  },
};

T.it = { ...BASE_EN,
  subtitle:'Trainer B1/B2 per il tedesco professionale',learnerName:'Il tuo nome',
  vocabulary:'Lessico',grammar:'Grammatica',conjugation:'Forme verbali',communication:'Comunicazione',integration:'Vita quotidiana e integrazione',exam:'Preparazione esame',training:'Tipi di esercizio',writing:'Scrittura',reading:'Lettura',speaking:'Parlato',
  learnMode:'Studiare',practiceMode:'Esercitarsi',challengeMode:'Sfida',mistakeMode:'Errori',start:'Inizia',check:'Controlla',next:'Avanti',prev:'Indietro',
  correctMsg:'Corretto!',incorrectMsg:'Non corretto.',submittedMsg:'Autovalutazione.',correctAnswer:'Risposta corretta',yourAnswer:'La tua risposta',why:'Spiegazione',rule:'Regola',example:'Esempio',
  addedMistake:'Aggiunto alla banca degli errori.',noMistakes:'Nessun errore.',loading:'Caricamento…',writeAnswer:'La tua risposta…',writeLongAnswer:'Scrivi qui il tuo testo…',chooseAnswer:'Scegli una risposta.',
  translation:'Traduzione',explanation:'Spiegazione',modeLearnIntro:'Studia la scheda. Premi Inizia.',allTypes:'Tutti i tipi',checklist:'Lista di controllo',selfCheck:'Confronta con il modello. I compiti aperti non sono valutati automaticamente.',itemType:'Tipo',wordCount:'parole',noItems:'Nessun elemento per questo filtro.',globalStat:'Totale',streakMsg:'di fila',install:'Installa',clearMistakes:'Cancella tutto',speakBtn:'Ascolta',hintTitle:'Suggerimento',mistakeTitle:'Banca degli errori'
};
T.pt = { ...BASE_EN,
  subtitle:'Treinador B1/B2 de alemão profissional',learnerName:'O seu nome',
  vocabulary:'Vocabulário',grammar:'Gramática',conjugation:'Formas verbais',communication:'Comunicação',integration:'Vida diária e integração',exam:'Preparação para exame',training:'Tipos de exercício',writing:'Escrita',reading:'Leitura',speaking:'Fala',
  learnMode:'Aprender',practiceMode:'Praticar',challengeMode:'Desafio',mistakeMode:'Erros',start:'Começar',check:'Verificar',next:'Seguinte',prev:'Anterior',
  correctMsg:'Correto!',incorrectMsg:'Incorreto.',submittedMsg:'Autoavaliação.',correctAnswer:'Resposta correta',yourAnswer:'A sua resposta',why:'Explicação',rule:'Regra',example:'Exemplo',
  addedMistake:'Adicionado ao banco de erros.',noMistakes:'Ainda sem erros.',loading:'A carregar…',writeAnswer:'A sua resposta…',writeLongAnswer:'Escreva o seu texto aqui…',chooseAnswer:'Escolha uma resposta.',
  translation:'Tradução',explanation:'Explicação',modeLearnIntro:'Estude o cartão. Prima Começar.',allTypes:'Todos os tipos',checklist:'Lista de verificação',selfCheck:'Compare com o modelo. Tarefas abertas não são corrigidas automaticamente.',itemType:'Tipo',wordCount:'palavras',noItems:'Nenhum item para este filtro.',globalStat:'Total',streakMsg:'seguidas',install:'Instalar',clearMistakes:'Apagar tudo',speakBtn:'Ouvir',hintTitle:'Dica',mistakeTitle:'Banco de erros'
};
T.ru = { ...BASE_EN,
  subtitle:'Тренажёр немецкого для работы B1/B2',learnerName:'Ваше имя',
  vocabulary:'Словарь',grammar:'Грамматика',conjugation:'Формы глаголов',communication:'Коммуникация',integration:'Повседневная жизнь и интеграция',exam:'Подготовка к экзамену',training:'Типы упражнений',writing:'Письмо',reading:'Чтение',speaking:'Говорение',
  learnMode:'Учить',practiceMode:'Практика',challengeMode:'Вызов',mistakeMode:'Ошибки',start:'Старт',check:'Проверить',next:'Далее',prev:'Назад',
  correctMsg:'Правильно!',incorrectMsg:'Неправильно.',submittedMsg:'Самопроверка.',correctAnswer:'Правильный ответ',yourAnswer:'Ваш ответ',why:'Пояснение',rule:'Правило',example:'Пример',
  addedMistake:'Добавлено в банк ошибок.',noMistakes:'Ошибок пока нет.',loading:'Загрузка…',writeAnswer:'Ваш ответ…',writeLongAnswer:'Напишите текст здесь…',chooseAnswer:'Выберите ответ.',
  translation:'Перевод',explanation:'Пояснение',modeLearnIntro:'Изучите карточку. Нажмите Старт.',allTypes:'Все типы',checklist:'Контрольный список',selfCheck:'Сравните с образцом. Открытые задания не проверяются автоматически.',itemType:'Тип',wordCount:'слов',noItems:'Нет элементов для этого фильтра.',globalStat:'Всего',streakMsg:'подряд',install:'Установить',clearMistakes:'Очистить всё',speakBtn:'Озвучить',hintTitle:'Подсказка',mistakeTitle:'Банк ошибок'
};
T.pl = { ...BASE_EN,
  subtitle:'Trener niemieckiego zawodowego B1/B2',learnerName:'Twoje imię',
  vocabulary:'Słownictwo',grammar:'Gramatyka',conjugation:'Formy czasownika',communication:'Komunikacja',integration:'Życie codzienne i integracja',exam:'Przygotowanie do egzaminu',training:'Typy ćwiczeń',writing:'Pisanie',reading:'Czytanie',speaking:'Mówienie',
  learnMode:'Nauka',practiceMode:'Ćwiczenie',challengeMode:'Wyzwanie',mistakeMode:'Błędy',start:'Start',check:'Sprawdź',next:'Dalej',prev:'Wstecz',
  correctMsg:'Poprawnie!',incorrectMsg:'Niepoprawnie.',submittedMsg:'Samoocena.',correctAnswer:'Poprawna odpowiedź',yourAnswer:'Twoja odpowiedź',why:'Wyjaśnienie',rule:'Reguła',example:'Przykład',
  addedMistake:'Dodano do banku błędów.',noMistakes:'Brak błędów.',loading:'Ładowanie…',writeAnswer:'Twoja odpowiedź…',writeLongAnswer:'Napisz tekst tutaj…',chooseAnswer:'Wybierz odpowiedź.',
  translation:'Tłumaczenie',explanation:'Wyjaśnienie',modeLearnIntro:'Przestudiuj kartę. Naciśnij Start.',allTypes:'Wszystkie typy',checklist:'Lista kontrolna',selfCheck:'Porównaj z modelem. Zadania otwarte nie są oceniane automatycznie.',itemType:'Typ',wordCount:'słów',noItems:'Brak elementów dla tego filtra.',globalStat:'Razem',streakMsg:'z rzędu',install:'Zainstaluj',clearMistakes:'Wyczyść wszystko',speakBtn:'Odtwórz',hintTitle:'Wskazówka',mistakeTitle:'Bank błędów'
};
T.tr = { ...BASE_EN,
  subtitle:'B1/B2 mesleki Almanca eğitmeni',learnerName:'Adınız',
  vocabulary:'Kelime bilgisi',grammar:'Dil bilgisi',conjugation:'Fiil biçimleri',communication:'İletişim',integration:'Günlük yaşam ve uyum',exam:'Sınav hazırlığı',training:'Alıştırma türleri',writing:'Yazma',reading:'Okuma',speaking:'Konuşma',
  learnMode:'Öğren',practiceMode:'Pratik',challengeMode:'Meydan okuma',mistakeMode:'Hatalar',start:'Başlat',check:'Kontrol et',next:'İleri',prev:'Geri',
  correctMsg:'Doğru!',incorrectMsg:'Yanlış.',submittedMsg:'Öz kontrol.',correctAnswer:'Doğru cevap',yourAnswer:'Cevabınız',why:'Açıklama',rule:'Kural',example:'Örnek',
  addedMistake:'Hata bankasına eklendi.',noMistakes:'Henüz hata yok.',loading:'Yükleniyor…',writeAnswer:'Cevabınız…',writeLongAnswer:'Metninizi buraya yazın…',chooseAnswer:'Bir cevap seçin.',
  translation:'Çeviri',explanation:'Açıklama',modeLearnIntro:'Kartı çalışın. Başlat’a basın.',allTypes:'Tüm türler',checklist:'Kontrol listesi',selfCheck:'Modelle karşılaştırın. Açık görevler otomatik değerlendirilmez.',itemType:'Tür',wordCount:'kelime',noItems:'Bu filtrede öğe yok.',globalStat:'Toplam',streakMsg:'üst üste',install:'Yükle',clearMistakes:'Tümünü sil',speakBtn:'Seslendir',hintTitle:'İpucu',mistakeTitle:'Hata bankası'
};
T.zh = { ...BASE_EN,
  subtitle:'B1/B2 职场德语训练器',learnerName:'你的名字',vocabulary:'词汇',grammar:'语法',conjugation:'动词形式',communication:'沟通',integration:'日常生活与融入',exam:'考试准备',training:'练习类型',writing:'写作',reading:'阅读',speaking:'口语',learnMode:'学习',practiceMode:'练习',challengeMode:'挑战',mistakeMode:'错题',start:'开始',check:'检查',next:'下一题',prev:'上一题',correctMsg:'正确！',incorrectMsg:'不正确。',submittedMsg:'自我检查。',correctAnswer:'正确答案',yourAnswer:'你的答案',why:'解释',rule:'规则',example:'例句',addedMistake:'已加入错题本。',noMistakes:'还没有错题。',loading:'加载中…',writeAnswer:'你的答案…',writeLongAnswer:'在这里写文本…',chooseAnswer:'选择一个答案。',translation:'翻译',explanation:'解释',modeLearnIntro:'学习卡片，然后点击开始。',allTypes:'所有类型',checklist:'检查清单',selfCheck:'与范例比较。开放题不会自动评分。',itemType:'类型',wordCount:'词',noItems:'此筛选无项目。',globalStat:'总计',streakMsg:'连续',install:'安装',clearMistakes:'全部清除',speakBtn:'朗读',hintTitle:'提示',mistakeTitle:'错题本'};
T.ja = { ...BASE_EN,
  subtitle:'B1/B2 職場ドイツ語トレーナー',learnerName:'名前',vocabulary:'語彙',grammar:'文法',conjugation:'動詞形',communication:'コミュニケーション',integration:'日常生活と統合',exam:'試験対策',training:'練習タイプ',writing:'作文',reading:'読解',speaking:'会話',learnMode:'学習',practiceMode:'練習',challengeMode:'チャレンジ',mistakeMode:'間違い',start:'開始',check:'確認',next:'次へ',prev:'戻る',correctMsg:'正解！',incorrectMsg:'不正解。',submittedMsg:'自己確認。',correctAnswer:'正解',yourAnswer:'あなたの答え',why:'説明',rule:'ルール',example:'例',addedMistake:'間違いリストに追加しました。',noMistakes:'まだ間違いはありません。',loading:'読み込み中…',writeAnswer:'答えを入力…',writeLongAnswer:'ここに文章を書いてください…',chooseAnswer:'答えを選択してください。',translation:'翻訳',explanation:'説明',modeLearnIntro:'カードを学習してから開始を押してください。',allTypes:'すべてのタイプ',checklist:'チェックリスト',selfCheck:'模範解答と比較してください。自由記述は自動採点されません。',itemType:'タイプ',wordCount:'語',noItems:'この条件に合う項目はありません。',globalStat:'合計',streakMsg:'連続',install:'インストール',clearMistakes:'すべて削除',speakBtn:'読み上げ',hintTitle:'ヒント',mistakeTitle:'間違いリスト'};
T.ko = { ...BASE_EN,
  subtitle:'B1/B2 직장 독일어 트레이너',learnerName:'이름',vocabulary:'어휘',grammar:'문법',conjugation:'동사 형태',communication:'의사소통',integration:'일상생활과 통합',exam:'시험 준비',training:'연습 유형',writing:'쓰기',reading:'읽기',speaking:'말하기',learnMode:'학습',practiceMode:'연습',challengeMode:'도전',mistakeMode:'오답',start:'시작',check:'확인',next:'다음',prev:'이전',correctMsg:'정답!',incorrectMsg:'오답.',submittedMsg:'자가 점검.',correctAnswer:'정답',yourAnswer:'내 답',why:'설명',rule:'규칙',example:'예문',addedMistake:'오답 노트에 추가됨.',noMistakes:'아직 오답이 없습니다.',loading:'불러오는 중…',writeAnswer:'답을 입력하세요…',writeLongAnswer:'여기에 글을 쓰세요…',chooseAnswer:'답을 선택하세요.',translation:'번역',explanation:'설명',modeLearnIntro:'카드를 학습한 뒤 시작을 누르세요.',allTypes:'모든 유형',checklist:'체크리스트',selfCheck:'모범 답안과 비교하세요. 서술형은 자동 채점되지 않습니다.',itemType:'유형',wordCount:'단어',noItems:'이 필터에 해당 항목이 없습니다.',globalStat:'전체',streakMsg:'연속',install:'설치',clearMistakes:'모두 지우기',speakBtn:'듣기',hintTitle:'힌트',mistakeTitle:'오답 노트'};
T.th = { ...BASE_EN,
  subtitle:'แบบฝึกภาษาเยอรมันสายอาชีพ B1/B2',learnerName:'ชื่อของคุณ',vocabulary:'คำศัพท์',grammar:'ไวยากรณ์',conjugation:'รูปกริยา',communication:'การสื่อสาร',integration:'ชีวิตประจำวันและการปรับตัว',exam:'เตรียมสอบ',training:'ประเภทแบบฝึก',writing:'การเขียน',reading:'การอ่าน',speaking:'การพูด',learnMode:'เรียนรู้',practiceMode:'ฝึก',challengeMode:'ท้าทาย',mistakeMode:'ข้อผิดพลาด',start:'เริ่ม',check:'ตรวจ',next:'ถัดไป',prev:'ก่อนหน้า',correctMsg:'ถูกต้อง!',incorrectMsg:'ไม่ถูกต้อง',submittedMsg:'ตรวจด้วยตนเอง',correctAnswer:'คำตอบที่ถูกต้อง',yourAnswer:'คำตอบของคุณ',why:'คำอธิบาย',rule:'กฎ',example:'ตัวอย่าง',addedMistake:'เพิ่มในคลังข้อผิดพลาดแล้ว',noMistakes:'ยังไม่มีข้อผิดพลาด',loading:'กำลังโหลด…',writeAnswer:'คำตอบของคุณ…',writeLongAnswer:'เขียนข้อความที่นี่…',chooseAnswer:'เลือกคำตอบ',translation:'คำแปล',explanation:'คำอธิบาย',modeLearnIntro:'ศึกษาแฟลชการ์ด แล้วกดเริ่ม',allTypes:'ทุกประเภท',checklist:'รายการตรวจสอบ',selfCheck:'เปรียบเทียบกับคำตอบตัวอย่าง งานเปิดจะไม่ถูกตรวจอัตโนมัติ',itemType:'ประเภท',wordCount:'คำ',noItems:'ไม่มีรายการตามตัวกรองนี้',globalStat:'ทั้งหมด',streakMsg:'ติดต่อกัน',install:'ติดตั้ง',clearMistakes:'ลบทั้งหมด',speakBtn:'ฟังเสียง',hintTitle:'คำใบ้',mistakeTitle:'คลังข้อผิดพลาด'};


// ── Category metadata (icon, accent colour, i18n key) ────────────────────
const CATEGORIES = [
  { id:'vocabulary',   icon:'📚', color:'var(--cat-vocab)' },
  { id:'grammar',      icon:'⚙️',  color:'var(--cat-gram)' },
  { id:'conjugation',  icon:'🔄', color:'var(--cat-conj)' },
  { id:'communication',icon:'💬', color:'var(--cat-comm)' },
  { id:'training',     icon:'🎯', color:'var(--cat-train)' },
  { id:'writing',      icon:'✍️',  color:'var(--cat-write)' },
  { id:'reading',      icon:'📖', color:'var(--cat-read)' },
  { id:'speaking',     icon:'🎤', color:'var(--cat-speak)' },
];

// Exercise types that accept free text (graded on word count)
const OPEN_TYPES = new Set([
  'formal_email_writing','semi_formal_message','opinion_text',
  'report_summary','application_writing','speaking_prompt'
]);
// Exercise types where subject-pronoun omission is tolerated
const SENTENCE_TYPES = new Set([
  'verb_conjugation','perfekt_builder','word_order','sentence_correction',
  'translation_into_german','gap_fill','active_recall','correction',
  'contrast','contrast_v2','consequence_v2','addition','result_subordinate'
]);
// Exercise types that use multiple-choice UI
const CHOICE_TYPES = new Set([
  'multiple_choice','connector_selection','article_trainer',
  'communication_choice','classify','case_trainer'
]);

// ── Utilities ────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const tr = key => (T[state.lang]?.[key]) || BASE_EN[key] || key;
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function normalizeStr(s = '') {
  return String(s).trim().toLowerCase()
    .replace(/[„""«»]/g, '"')
    .replace(/[.!?。؟،,;:]+$/g, '')
    .replace(/\s+/g, ' ');
}

// Accepts: exact match, leading-article stripped, subject-pronoun stripped,
// and for vocab translation items: base form without ", -n" plural hint.
function answersMatch(user, item) {
  const u = normalizeStr(user);
  const c = normalizeStr(item.answer || '');
  if (!u) return false;
  if (u === c) return true;

  // Accept answer without the ", -n" / ", -e" plural hint suffix
  // e.g. correct = "die Messe, -n", user = "die Messe" or "Messe"
  const cNoPlural = c.replace(/,\s*-?\S+$/, '').trim();
  if (u === cNoPlural) return true;

  // Accept without leading article
  const cNoArticle = c.replace(/^(der|die|das|den|dem|des)\s+/i, '');
  const cNoPluralNoArticle = cNoPlural.replace(/^(der|die|das|den|dem|des)\s+/i, '');
  if (u === cNoArticle || u === cNoPluralNoArticle) return true;

  // For sentence types: accept without leading subject pronoun
  if (SENTENCE_TYPES.has(item.exerciseType)) {
    const cWords = c.split(' ');
    if (cWords.length > 1 && cWords.slice(1).join(' ') === u) return true;
    // Also accept if user just typed the key word/phrase inside a longer answer
    // e.g. correct "keine" user "keine Zeit" — don't do this, too permissive
  }
  return false;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function srsRecord(item) {
  return item?.id ? state.srs[item.id] : null;
}
function isDue(item) {
  const r = srsRecord(item);
  return !r || !r.nextDue || r.nextDue <= Date.now();
}
function updateSRS(item, ok) {
  if (!item?.id) return;
  const old = state.srs[item.id] || { box:0, intervalDays:0, attempts:0, correct:0 };
  const nextBox = ok ? Math.min(5, (old.box || 0) + 1) : 0;
  const intervals = [0, 1, 3, 7, 14, 30];
  const days = intervals[nextBox] || 30;
  state.srs[item.id] = {
    box: nextBox,
    intervalDays: days,
    attempts: (old.attempts || 0) + 1,
    correct: (old.correct || 0) + (ok ? 1 : 0),
    last: Date.now(),
    nextDue: Date.now() + days * 24 * 60 * 60 * 1000
  };
  localStorage.setItem('dw_srs', JSON.stringify(state.srs));
}

function isRTL() { return LANGS.find(l => l[0] === state.lang)?.[2] === 'rtl'; }
function localize(v) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  const name = CODE_TO_NAME[state.lang];
  return v[name] || v[state.lang] || v.German || v.English || Object.values(v)[0] || '';
}
function getTranslation(t = {}) {
  const name = CODE_TO_NAME[state.lang];
  return t[name] || t[state.lang] || t.English || t.French || t.German || '';
}

// Type label for badges
const TYPE_LABELS = {
  flashcard:'Flashcard', article_trainer:'Artikel', plural_trainer:'Plural',
  translation_into_german:'→ Deutsch', translation_from_german:'→ Übersetzen',
  gap_fill:'Lücke', multiple_choice:'Multiple choice', connector_selection:'Konnektor',
  case_trainer:'Kasus', verb_conjugation:'Verb', perfekt_builder:'Perfekt',
  word_order:'Wortstellung', sentence_correction:'Korrektur',
  formal_email_writing:'Formal E-Mail', semi_formal_message:'Halbformell',
  opinion_text:'Meinung', report_summary:'Bericht', application_writing:'Bewerbung',
  speaking_prompt:'Sprechen', reading_comprehension:'Leseverstehen',
  active_recall:'Recall', communication_choice:'Kommunikation',
  classify:'Klassifizieren', contrast:'Kontrast', contrast_v2:'Kontrast',
  consequence_v2:'Folge', addition:'Ergänzung', result_subordinate:'Ergebnis',
  kein_declension:'Kein', nicht_position:'Nicht', temporal_subordinate:'Temporal',
  correction:'Korrektur', mistake_review:'Fehlerwiederholung',
};
function typeLabel(type) { return TYPE_LABELS[type] || String(type).replaceAll('_',' '); }

// ── App state ────────────────────────────────────────────────────────────
const state = {
  lang:         localStorage.getItem('dw_lang')         || 'de',
  theme:        localStorage.getItem('dw_theme')        || 'auto',
  category:     localStorage.getItem('dw_category')     || 'vocabulary',
  moduleId:     localStorage.getItem('dw_module')       || '',
  mode:         localStorage.getItem('dw_mode')         || 'practice',
  exType:       localStorage.getItem('dw_extype')       || 'all',
  manifest:     null,
  modules:      [],
  currentItems: [],
  pool:         [],
  index:        0,
  started:      false,
  checked:      false,
  selectedChoice: '',
  streak:       0,
  stats:        JSON.parse(localStorage.getItem('dw_stats')   || '{}'),
  mistakes:     JSON.parse(localStorage.getItem('dw_mistakes')|| '[]'),
  globalStats:  JSON.parse(localStorage.getItem('dw_global')  || '{"answered":0,"correct":0}'),
  srs:          JSON.parse(localStorage.getItem('dw_srs')     || '{}'),
  deferredPrompt: null,
};

// ── Init ─────────────────────────────────────────────────────────────────
async function init() {
  setupLanguageSelect();
  setupModeTabEvents();
  setupExerciseTypeSelect();
  setupMainEvents();
  applyTheme();
  applyLanguage();
  $('questionText').textContent = tr('loading');

  state.manifest = await fetch('data-manifest.json').then(r => r.json());
  await loadAllModules();
  renderCategories();

  const first =
    state.modules.find(m => m.id === state.moduleId && m.category === state.category) ||
    state.modules.find(m => m.category === state.category) ||
    state.modules[0];
  if (first) { state.category = first.category; state.moduleId = first.id; }
  selectModule(state.moduleId, false);

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── Module loading (parallel) ────────────────────────────────────────────
async function loadAllModules() {
  const results = await Promise.allSettled(
    state.manifest.modules.map(async meta => {
      const data = await fetch(meta.path).then(r => r.json());
      const items = normalizeModule(data, meta);
      return { ...meta, raw: data, items, count: items.length };
    })
  );
  state.modules = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  results.filter(r => r.status === 'rejected').forEach(r => console.warn('Module load failed:', r.reason));
}

// ── Module normalisation ─────────────────────────────────────────────────
function normalizeModule(data, meta) {
  if (data.vocabulary_entries && !data.words) {
    data.words = data.vocabulary_entries.map((e, idx) => ({
      id: e.id || `${meta.id}_${idx}`,
      word: `${e.term}${e.plural ? ', ' + e.plural : ''}`,
      level: e.cefr || data.level || 'B1/B2',
      tags: [e.corporate_context || meta.title],
      translations: { English: e.english_equivalent || '' },
      data: {
        grammar: {
          article: (e.term||'').split(' ')[0], base: (e.term||'').replace(/^(der|die|das)\s+/,''),
          plural: e.plural || ''
        },
        example_de: e.essential_collocations?.[0]?.example || '',
        explanation: e.corporate_context || '',
        collocations: e.essential_collocations || []
      }
    }));
  }
  const arr = data.items || data.words || [];
  const out = [];
  arr.forEach((it, idx) => {
    if (data.words) out.push(...normalizeVocabItem(it, idx, data, meta));
    else            out.push(normalizeStandardItem(it, idx, data, meta));
  });
  return out.filter(x => x && x.prompt && (x.answer || x.openEnded || (x.choices && x.choices.length)));
}

function normalizeStandardItem(it, idx, data, meta) {
  // Resolve exercise type — handles all the exotic types in the data
  const rawType = it.exerciseType || it.type || '';
  const exType  = resolveExerciseType(rawType, it, meta);
  const isOpen  = !!it.openEnded || OPEN_TYPES.has(exType);

  const checklist = [...(it.checklist || [])];
  if (it.required_structural_components?.length)
    checklist.push(...it.required_structural_components.map(x => 'Struktur: ' + x));
  if (it.mandatory_vocabulary_tokens?.length)
    checklist.push('Pflicht-Vokabular: ' + it.mandatory_vocabulary_tokens.join(', '));
  if (it.evaluation_hints?.minimum_word_count)
    checklist.push('Mindestwörter: ' + it.evaluation_hints.minimum_word_count);

  return {
    id:           it.id || `${meta.id}_${idx}`,
    module:       meta.title,
    category:     meta.category,
    exerciseType: exType,
    prompt:       it.prompt || it.display || it.question || it.prompt_instruction || '',
    answer:       it.answer || it.model_answer || '',
    display:      it.display || '',
    choices:      it.choices || [],
    explanation:  localize(it.explanation) || it.example || it.meaning || '',
    example:      it.example || '',
    level:        it.level || it.cefr_level || data.level || 'B1/B2',
    tags:         it.tags || [],
    openEnded:    isOpen,
    minWords:     it.evaluation_hints?.minimum_word_count || (isOpen ? 25 : 0),
    checklist,
    passage:      it.passage || '',
    raw:          it,
  };
}

// Resolve the many exotic type strings in the JSON data to the canonical set
function resolveExerciseType(raw, it, meta) {
  if (OPEN_TYPES.has(raw))  return raw;
  // Exact known types
  const known = new Set([
    'flashcard','article_trainer','plural_trainer','translation_into_german','translation_from_german',
    'gap_fill','multiple_choice','connector_selection','case_trainer','verb_conjugation',
    'perfekt_builder','word_order','sentence_correction','formal_email_writing','semi_formal_message',
    'opinion_text','report_summary','application_writing','speaking_prompt','reading_comprehension',
    'active_recall','communication_choice','classify','contrast','contrast_v2','consequence_v2',
    'addition','result_subordinate','kein_declension','nicht_position','temporal_subordinate',
    'correction','mistake_review'
  ]);
  if (known.has(raw)) return raw;

  // Infer from type field aliases
  if (raw === 'choice')          return (it.choices?.length) ? 'multiple_choice' : 'gap_fill';
  if (raw === 'order')           return 'word_order';
  if (raw === 'contrast')        return 'contrast';
  if (raw === 'active_recall')   return 'active_recall';

  // Infer from choices
  if (it.choices?.length) {
    const s = ((meta.id||'')+' '+(it.prompt||'')).toLowerCase();
    if (s.includes('konnektor') || s.includes('connector')) return 'connector_selection';
    if (s.includes('klassifi') || s.includes('classify'))   return 'classify';
    if (s.includes('artikel'))                              return 'article_trainer';
    return 'multiple_choice';
  }

  // Infer from prompt content
  const s = ((meta.id||'')+' '+(meta.title||'')+' '+(it.prompt||'')).toLowerCase();
  if (s.includes('artikel') || s.includes('genus'))         return 'article_trainer';
  if (s.includes('plural'))                                 return 'plural_trainer';
  if (s.includes('kasus') || s.includes('dativ') || s.includes('akkusativ')) return 'case_trainer';
  if (s.includes('perfekt'))                                return 'perfekt_builder';
  if (s.includes('konnektor') || s.includes('connector'))   return 'connector_selection';
  if (s.includes('tekamolo') || s.includes('wortordnung') || s.includes('word order')) return 'word_order';
  if (s.includes('translate into german') || s.includes('→ deutsch')) return 'translation_into_german';
  if (s.includes('translate') || s.includes('übersetz'))    return 'translation_from_german';
  if (s.includes('verb') || s.includes('konjunktiv') || s.includes('reflexiv')) return 'verb_conjugation';
  if (s.includes('nicht'))                                  return 'nicht_position';
  if (s.includes('kein'))                                   return 'kein_declension';
  if (String(it.prompt||'').includes('___'))                return 'gap_fill';
  return 'active_recall';
}

function normalizeVocabItem(it, idx, data, meta) {
  const d     = it.data || {};
  const trans = d.translations || it.translations || {};
  const name  = it.word || it.display || '';
  const g     = d.grammar || {};
  const article = g.article || extractArticle(name);
  const base    = g.base || name.replace(/^(der|die|das)\s+/i,'').split(',')[0].trim();
  const plural  = g.plural || extractPlural(name, article, base);

  // Use collocations as explanation when they exist; skip the boilerplate
  const colls = d.collocations || [];
  const explanation = colls.length
    ? colls.map(c => c.collocation + (c.example ? ' — ' + c.example : '')).join('; ')
    : localize(d.grammar_clarification || d.explanation || it.explanation || '');
  const example  = d.example_de || it.example_de || '';
  const tText    = getTranslation(trans);

  const common = {
    module: meta.title, category: meta.category,
    level: it.level || data.level || 'B1/B2',
    tags: it.tags || [data.chapter || meta.title],
    translations: trans, example, explanation,
    openEnded: false, minWords: 0, choices: [], checklist: [], passage: '',
    collocations: colls, raw: it,
    article, base, plural,
  };
  const id = it.id || `${meta.id}_${idx}`;
  const items = [];

  // Flashcard — shows full word with article + plural hint
  items.push({ ...common, id:`${id}_flash`, exerciseType:'flashcard',
    prompt: name, answer: tText || name, display: name });

  // Translation → German
  if (tText) items.push({ ...common, id:`${id}_into_de`, exerciseType:'translation_into_german',
    // Answer is ONLY "article base" (e.g. "die Messe"), NOT "die Messe, -n"
    // This prevents false-incorrect when user types "die Messe"
    prompt: tText + ' → Deutsch',
    answer: article ? `${article} ${base}` : base,
    display: name });

  // Translation from German
  if (tText) items.push({ ...common, id:`${id}_from_de`, exerciseType:'translation_from_german',
    prompt: name + ' → ' + (CODE_TO_NAME[state.lang] || 'Übersetzung'),
    answer: tText, display: name });

  // Article trainer (multiple-choice der/die/das)
  if (article) items.push({ ...common, id:`${id}_art`, exerciseType:'article_trainer',
    prompt: '___ ' + base,
    answer: article, display: name,
    choices: ['der','die','das'],
    explanation: localize(d.grammar_clarification) || `Nomen mit Artikel merken: ${article} ${base}` });

  // Plural trainer
  if (plural) {
    const pluralAns = plural.replace(/^die\s+/i,'').trim();
    items.push({ ...common, id:`${id}_pl`, exerciseType:'plural_trainer',
      prompt: (article ? article + ' ' : '') + base + ' → die ___',
      answer: pluralAns, display: name,
      explanation: localize(d.grammar_clarification) || `Plural: die ${pluralAns}` });
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
  if (!hint || hint === '-') return base;
  if (hint.startsWith('-')) return base + hint.slice(1);
  return hint.replace(/^die\s+/i,'');
}

// ── Pool management ──────────────────────────────────────────────────────
function buildPool() {
  let base;
  if (state.mode === 'mistakes') {
    base = state.mistakes.map(m => m.item).filter(Boolean);
  } else if (state.mode === 'challenge') {
    base = state.modules.flatMap(m => m.items);
  } else {
    base = state.currentItems;
  }
  let filtered = state.exType === 'all' ? base : base.filter(i => i.exerciseType === state.exType);
  if (state.mode === 'practice') {
    const due = filtered.filter(isDue);
    // Use due items when there are enough; otherwise keep the module usable.
    if (due.length >= Math.min(3, filtered.length)) filtered = due;
  }
  state.pool = (state.mode === 'practice' || state.mode === 'challenge') ? shuffle(filtered) : filtered;
  if (state.index >= state.pool.length) state.index = 0;
}

function currentItem() { return state.pool[state.index] || null; }

// ── Select module ────────────────────────────────────────────────────────
function selectModule(id, persist) {
  const mod = state.modules.find(m => m.id === id) || state.modules[0];
  if (!mod) return;
  state.moduleId    = mod.id;
  state.category    = mod.category;
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
  state.index = 0; state.started = false; state.checked = false; state.selectedChoice = '';
}

// ── Setup functions ──────────────────────────────────────────────────────
function setupLanguageSelect() {
  $('languageSelect').innerHTML = LANGS.map(([c,l]) => `<option value="${c}">${l}</option>`).join('');
  $('languageSelect').value = state.lang;
}

function setupExerciseTypeSelect() {
  // Collect all exercise types actually present in loaded modules
  const present = new Set(state.modules.flatMap(m => m.items.map(i => i.exerciseType)));
  const types   = [['all', tr('allTypes')], ...Object.entries(TYPE_LABELS)
    .filter(([k]) => present.has(k))
    .map(([k,v]) => [k, v])];

  $('exerciseTypeSelect').innerHTML = types.map(([v,l]) =>
    `<option value="${v}">${esc(l)}</option>`).join('');
  $('exerciseTypeSelect').value = state.exType;
}

function setupModeTabEvents() {
  document.querySelectorAll('.mode-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.mode = btn.dataset.mode;
      localStorage.setItem('dw_mode', state.mode);
      document.querySelectorAll('.mode-tab').forEach(b => b.classList.toggle('active', b === btn));
      resetRun();
      buildPool();
      renderExercise();
    });
  });
  // Activate the saved mode tab
  document.querySelectorAll('.mode-tab').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === state.mode));
}

function setupMainEvents() {
  $('languageSelect').addEventListener('change', e => {
    state.lang = e.target.value; localStorage.setItem('dw_lang', state.lang);
    applyLanguage(); renderAll();
  });
  $('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : state.theme === 'light' ? 'auto' : 'dark';
    localStorage.setItem('dw_theme', state.theme); applyTheme();
  });
  $('learnerName').value = localStorage.getItem('dw_name') || '';
  $('learnerName').addEventListener('input', e => {
    localStorage.setItem('dw_name', e.target.value);
    updateAvatar();
  });
  updateAvatar();

  $('moduleSelect').addEventListener('change', e => selectModule(e.target.value, true));
  $('exerciseTypeSelect').addEventListener('change', e => {
    state.exType = e.target.value; localStorage.setItem('dw_extype', state.exType);
    resetRun(); buildPool(); renderExercise();
  });

  $('categoryNav').addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    state.category = btn.dataset.cat; localStorage.setItem('dw_category', state.category);
    const first = state.modules.find(m => m.category === state.category);
    if (first) selectModule(first.id, true);
    renderCategories(); closeSidebar();
  });

  $('startButton').addEventListener('click', startSession);
  $('checkButton').addEventListener('click', checkAnswer);
  $('nextButton').addEventListener('click', nextItem);
  $('prevButton').addEventListener('click', prevItem);

  // Enter in text inputs: check if available, else next
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' && e.key === 'Enter' && !$('checkButton').disabled) { checkAnswer(); return; }
    if (tag === 'INPUT' && e.key === 'Enter' && !$('nextButton').disabled)  { nextItem(); return; }
    // Global shortcuts (not in text field)
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key === 'ArrowRight' && !$('nextButton').disabled)  nextItem();
    if (e.key === 'ArrowLeft'  && !$('prevButton').disabled)  prevItem();
    if (e.key === 'Enter'      && !$('startButton').disabled) startSession();
    if (e.key === 'Enter'      && !$('checkButton').disabled) checkAnswer();
    if ((e.key === 'Enter' || e.key === ' ') && !$('nextButton').disabled && $('checkButton').disabled) nextItem();
  });

  $('resetModule').addEventListener('click', () => {
    delete state.stats[statKey()]; saveStats(); resetRun(); buildPool(); renderAll();
  });
  $('clearMistakes').addEventListener('click', () => {
    state.mistakes = []; saveMistakes(); renderMistakeBank(); renderStats();
    if (state.mode === 'mistakes') { buildPool(); renderExercise(); }
  });
  $('menuToggle').addEventListener('click', () => toggleSidebar());
  $('drawerBackdrop').addEventListener('click', () => closeSidebar());

  // Real-time word count for textareas
  $('answerTextAreaGlobal')?.addEventListener('input', updateWordCountHint);

  $('speakBtn').addEventListener('click', () => {
    const item = currentItem();
    if (!item) return;
    const text = item.display || item.prompt || item.answer || '';
    speak(text);
  });

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); state.deferredPrompt = e;
    $('installButton').classList.remove('hidden');
  });
  $('installButton').addEventListener('click', async () => {
    if (state.deferredPrompt) { state.deferredPrompt.prompt(); state.deferredPrompt = null; $('installButton').classList.add('hidden'); }
  });
}

function updateAvatar() {
  const name = ($('learnerName').value || '').trim();
  $('learnerAvatar').textContent = name ? name[0].toUpperCase() : '?';
}

// ── Render all ───────────────────────────────────────────────────────────
function renderAll() {
  renderCategories();
  renderModuleSelect();
  renderExercise();
  renderStats();
  renderMistakeBank();
}

function renderCategories() {
  $('categoryNav').innerHTML = CATEGORIES.map(cat => {
    const count = state.modules.filter(m => m.category === cat.id).length;
    const active = cat.id === state.category;
    return `<button class="cat-btn${active?' active':''}" data-cat="${cat.id}"
      style="--cat-color:${cat.color}">
      <span class="cat-icon">${cat.icon}</span>
      <span>${tr(cat.id)}</span>
      <span class="cat-count">${count}</span>
    </button>`;
  }).join('');
}

function renderModuleSelect() {
  const mods = state.modules.filter(m => m.category === state.category);
  $('moduleSelect').innerHTML = mods.map(m =>
    `<option value="${m.id}">${esc(m.title)} · ${m.count}</option>`).join('');
  $('moduleSelect').value = state.moduleId;
  // Update module meta
  const mod = state.modules.find(m => m.id === state.moduleId);
  $('moduleCount').textContent = mod
    ? `${state.pool.length} / ${mod.count} Items`
    : '';
}

// ── Exercise render ──────────────────────────────────────────────────────
function renderExercise() {
  const mod  = state.modules.find(m => m.id === state.moduleId);
  const pool = state.pool;
  if (state.index >= pool.length) state.index = 0;
  const item = currentItem();

  // Path label
  const cat = CATEGORIES.find(c => c.id === state.category);
  $('currentPath').textContent = (cat ? cat.icon + ' ' : '') + tr(state.category) + (mod ? ' · ' + mod.title : '');

  // Progress bar + index
  const pct = pool.length ? (state.index / pool.length) * 100 : 0;
  $('progressBar').style.width = pct + '%';
  $('itemIndex').textContent = pool.length ? `${state.index + 1} / ${pool.length}` : '0 / 0';
  $('typeBadge').textContent = item ? typeLabel(item.exerciseType) : '—';

  // Clear state
  $('passageBlock').classList.add('hidden');
  $('feedbackBox').classList.add('hidden');
  $('feedbackBox').innerHTML = '';
  $('learnBlock').classList.add('hidden');
  $('inputArea').innerHTML = '';
  $('speakBtn').classList.add('hidden');

  // Empty states
  if (!item) {
    const msg = state.mode === 'mistakes' ? tr('noMistakes')
      : state.exType !== 'all' ? tr('noItems')
      : tr('loading');
    $('questionText').textContent = msg;
    $('hintBox').innerHTML = '';
    updateButtons();
    return;
  }

  // Passage for reading
  if (item.passage) {
    $('passageBlock').innerHTML = item.passage.split('\n').filter(Boolean)
      .map(p => `<p>${esc(p)}</p>`).join('');
    $('passageBlock').classList.remove('hidden');
  }

  // Question text — highlight blanks
  $('questionText').innerHTML = esc(item.prompt)
    .replace(/___/g, '<span class="blank">___</span>');

  // Speak button for vocab items
  if (item.display || item.exerciseType === 'flashcard') {
    $('speakBtn').classList.remove('hidden');
  }

  // Content depends on state
  if (!state.started) {
    renderLearnBlock(item);
  } else if (state.mode === 'learn' || item.exerciseType === 'flashcard') {
    renderLearnBlock(item);
  } else {
    renderInput(item);
  }

  renderHint(item);
  updateButtons();
}

function renderInput(item) {
  const ia = $('inputArea');

  if (item.choices && item.choices.length && CHOICE_TYPES.has(item.exerciseType)) {
    // Multiple choice / connector / article / classify
    const cols = item.choices.length <= 2 ? 1 : item.choices.length <= 4 ? 2 : 1;
    ia.innerHTML = `<div class="choices-grid" style="grid-template-columns:repeat(${cols},1fr)">
      ${item.choices.map(c =>
        `<button class="choice-btn${c===state.selectedChoice?' selected':''}" data-c="${esc(c)}">${esc(c)}</button>`
      ).join('')}
    </div>`;
    ia.querySelectorAll('.choice-btn').forEach(b =>
      b.addEventListener('click', () => {
        state.selectedChoice = b.dataset.c;
        ia.querySelectorAll('.choice-btn').forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
      })
    );
  } else if (item.openEnded) {
    const minW = item.minWords || 25;
    ia.innerHTML = `
      <textarea id="answerTA" class="answer-textarea" rows="7" placeholder="${tr('writeLongAnswer')}" spellcheck="true"></textarea>
      <div class="word-count-hint" id="wcHint">0 / ${minW} ${tr('wordCount')}</div>
      ${item.checklist?.length ? renderChecklistHTML(item.checklist) : ''}
    `;
    const ta = ia.querySelector('#answerTA');
    const wc = ia.querySelector('#wcHint');
    ta.addEventListener('input', () => {
      const n = ta.value.trim().split(/\s+/).filter(Boolean).length;
      wc.textContent = `${n} / ${minW} ${tr('wordCount')}`;
      wc.className = 'word-count-hint' + (n >= minW ? ' met' : n > 0 ? ' under' : '');
    });
    setTimeout(() => ta.focus(), 50);
  } else {
    ia.innerHTML = `<input id="answerIn" class="answer-input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${tr('writeAnswer')}"/>`;
    const inp = ia.querySelector('#answerIn');
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !$('checkButton').disabled) checkAnswer();
      else if (e.key === 'Enter' && !$('nextButton').disabled) nextItem();
    });
    setTimeout(() => inp.focus(), 50);
  }
}

function renderChecklistHTML(items) {
  return `<div class="checklist">${items.map(c =>
    `<label class="check-item"><input type="checkbox"> ${esc(c)}</label>`).join('')}</div>`;
}

function renderLearnBlock(item) {
  const trans = item.translations ? getTranslation(item.translations) : '';
  const exp   = item.explanation || '';
  let html = '';

  if (item.exerciseType === 'flashcard' || item.exerciseType === 'translation_into_german') {
    // Vocab flashcard: show the word prominently
    const articleClass = item.article === 'der' ? 'article-der' : item.article === 'die' ? 'article-die' : 'article-das';
    html += `<div class="learn-word">${
      item.article ? `<span class="article-pill ${articleClass}">${item.article}</span>` : ''
    }${esc(item.base || item.display || item.answer)}</div>`;
    if (item.plural) html += `<div class="learn-row"><strong>Plural</strong><span>die ${esc(item.plural)}</span></div>`;
    if (trans)       html += `<div class="learn-translation">${esc(trans)}</div>`;
    if (item.example && !item.example.includes('Das Lernwort'))  // skip boilerplate
      html += `<div class="learn-row"><strong>${tr('example')}</strong><span>${esc(item.example)}</span></div>`;
    if (item.collocations?.length) {
      html += `<div class="learn-row"><strong>Kollokationen</strong><div class="collocation-list">${
        item.collocations.map(c => `<span class="collocation-chip">${esc(c.collocation)}</span>`).join('')
      }</div></div>`;
    }
    if (exp && !exp.includes('This item belongs') && !exp.includes('Focus on meaning'))
      html += `<div class="learn-row"><strong>${tr('explanation')}</strong><span>${esc(exp)}</span></div>`;
  } else {
    // Grammar / other: show the prompt + answer + explanation
    if (item.answer)
      html += `<div class="learn-word" style="font-size:1.3rem">${esc(item.answer)}</div>`;
    if (trans)
      html += `<div class="learn-translation">${esc(trans)}</div>`;
    if (item.example)
      html += `<div class="learn-row"><strong>${tr('example')}</strong><span>${esc(item.example)}</span></div>`;
    if (exp)
      html += `<div class="learn-row"><strong>${tr('explanation')}</strong><span>${esc(exp)}</span></div>`;
    if (item.checklist?.length)
      html += renderChecklistHTML(item.checklist);
  }

  $('learnBlock').innerHTML = html;
  $('learnBlock').classList.remove('hidden');
}

function renderHint(item) {
  const exp  = item.explanation || '';
  const tags = (item.tags || []).join(' · ');
  let html = '';
  html += `<p class="hint-rule">${esc(tags || item.module || 'B1/B2')}</p>`;
  if (exp && !exp.includes('This item belongs') && !exp.includes('Focus on meaning'))
    html += `<p>${esc(exp)}</p>`;
  if (item.example && !item.example.includes('Das Lernwort'))
    html += `<p><strong>${tr('example')}:</strong> ${esc(item.example)}</p>`;
  if (item.collocations?.length)
    html += `<p>${item.collocations.slice(0,3).map(c => esc(c.collocation)).join(' · ')}</p>`;
  $('hintBox').innerHTML = html || `<p class="hint-rule">${esc(typeLabel(item.exerciseType))}</p>`;
}

function updateButtons() {
  const pool = state.pool, has = pool.length > 0, item = currentItem();
  const passive = state.mode === 'learn' || item?.exerciseType === 'flashcard';
  $('startButton').disabled = state.started || !has;
  $('checkButton').disabled = !state.started || state.checked || passive || !has;
  $('nextButton').disabled  = !state.started || (!state.checked && !passive) || state.index >= pool.length - 1;
  $('prevButton').disabled  = !has || state.index <= 0;
}

// ── Session logic ────────────────────────────────────────────────────────
function startSession() {
  state.started = true; state.checked = false; state.selectedChoice = '';
  renderExercise();
}

function getUserAnswer(item) {
  const ia = $('inputArea');
  if (item.choices?.length && CHOICE_TYPES.has(item.exerciseType)) return state.selectedChoice;
  if (item.openEnded) return ia.querySelector('#answerTA')?.value || '';
  return ia.querySelector('#answerIn')?.value || '';
}

function checkAnswer() {
  const item = currentItem();
  if (!item) return;
  const user = getUserAnswer(item);

  let ok;
  if (item.openEnded) {
    const wc = normalizeStr(user).split(/\s+/).filter(Boolean).length;
    ok = wc >= (item.minWords || 25);
  } else {
    ok = answersMatch(user, item);
  }

  state.checked = true;
  updateStat(ok);
  updateSRS(item, ok);

  // Streak
  if (ok) { state.streak++; } else { state.streak = 0; }
  renderStreak();

  // Visual feedback on choice buttons
  if (item.choices?.length && CHOICE_TYPES.has(item.exerciseType)) {
    $('inputArea').querySelectorAll('.choice-btn').forEach(b => {
      if (b.dataset.c === item.answer) b.classList.add('correct-reveal');
      else if (b.dataset.c === user && !ok) b.classList.add('wrong-reveal');
      b.disabled = true;
    });
  } else {
    // Colour the text input
    const inp = $('inputArea').querySelector('#answerIn');
    if (inp) inp.classList.add(ok ? 'ok' : 'err');
  }

  showFeedback(item, user, ok);
  if (!ok && !item.openEnded) addMistake(item, user);

  renderStats();
  renderMistakeBank();
  updateButtons();
}

function showFeedback(item, user, ok) {
  const exp  = item.explanation || '';
  const open = item.openEnded;
  const box  = $('feedbackBox');

  let html = `<div class="feedback-head">`;
  html += ok ? '✓ ' + tr('correctMsg') : open ? '📝 ' + tr('submittedMsg') : '✗ ' + tr('incorrectMsg');
  html += `</div>`;

  // Correct answer
  html += `<div class="feedback-row"><strong>${tr('correctAnswer')}</strong>
    <span class="val ${ok?'correct':'wrong'}">${esc(item.answer || '—').replace(/\n/g,'<br>')}</span></div>`;

  // User answer
  if (user && !ok) html += `<div class="feedback-row"><strong>${tr('yourAnswer')}</strong>
    <span class="val wrong">${esc(user).replace(/\n/g,'<br>')}</span></div>`;

  // Word count bar for open-ended
  if (open) {
    const wc   = normalizeStr(user).split(/\s+/).filter(Boolean).length;
    const minW = item.minWords || 25;
    const fillPct = Math.min(100, Math.round(wc / minW * 100));
    html += `<div class="wc-bar"><span style="font-size:12px;color:var(--muted)">${wc}/${minW} ${tr('wordCount')}</span>
      <div class="wc-track"><div class="wc-fill" style="width:${fillPct}%;background:${ok?'var(--ok)':'var(--err)'}"></div></div></div>`;
    html += `<p style="font-size:12px;color:var(--muted);margin-top:8px">${tr('selfCheck')}</p>`;
    // Checklist for open tasks
    if (item.checklist?.length) html += renderChecklistHTML(item.checklist);
  }

  // Explanation
  if (exp && !exp.includes('This item belongs') && !exp.includes('Focus on meaning'))
    html += `<div class="feedback-row"><strong>${tr('why')}</strong><span>${esc(exp)}</span></div>`;

  const srs = srsRecord(item);
  if (srs && !open) html += `<p style="font-size:12px;color:var(--muted);margin-top:6px">SRS: Box ${srs.box} · next review ${new Date(srs.nextDue).toLocaleDateString()}</p>`;
  if (!ok && !open)
    html += `<p style="font-size:12px;color:var(--muted);margin-top:6px">${tr('addedMistake')}</p>`;

  box.className = 'feedback ' + (open ? 'neutral' : ok ? 'ok' : 'err');
  box.innerHTML = html;
  box.classList.remove('hidden');
  // Scroll feedback into view
  setTimeout(() => box.scrollIntoView({ behavior:'smooth', block:'nearest' }), 80);
}

function nextItem() {
  if (state.index < state.pool.length - 1) {
    state.index++; state.checked = false; state.selectedChoice = '';
    renderExercise();
  }
}
function prevItem() {
  if (state.index > 0) {
    state.index--; state.checked = false; state.selectedChoice = '';
    renderExercise();
  }
}

// ── Stats ────────────────────────────────────────────────────────────────
function statKey() { return `${state.moduleId}:${state.mode}:${state.exType}`; }

function updateStat(ok) {
  const k = statKey();
  state.stats[k] = state.stats[k] || { answered:0, correct:0 };
  state.stats[k].answered++;
  if (ok) state.stats[k].correct++;
  state.globalStats.answered++;
  if (ok) state.globalStats.correct++;
  saveStats();
}
function saveStats() {
  localStorage.setItem('dw_stats',  JSON.stringify(state.stats));
  localStorage.setItem('dw_global', JSON.stringify(state.globalStats));
}
function addMistake(item, user) {
  const ex = state.mistakes.find(m => m.item?.id === item.id);
  if (ex) { ex.count++; ex.userAnswer = user; ex.last = Date.now(); }
  else state.mistakes.unshift({ item, userAnswer: user, count:1, last: Date.now() });
  state.mistakes = state.mistakes.slice(0, 300);
  saveMistakes();
}
function saveMistakes() { localStorage.setItem('dw_mistakes', JSON.stringify(state.mistakes)); }

function renderStats() {
  const s   = state.stats[statKey()] || { answered:0, correct:0 };
  const pct = s.answered ? Math.round(100 * s.correct / s.answered) : 0;
  $('statAnswered').textContent = s.answered;
  $('statCorrect').textContent  = s.correct;
  $('statMistakes').textContent = state.mistakes.length;
  $('progressPercent').textContent = pct + '%';

  // SVG ring: circumference 163.36, offset = circ * (1 - pct/100)
  const circ = 163.36;
  $('ringArc').setAttribute('stroke-dashoffset', (circ * (1 - pct / 100)).toFixed(2));

  // Global stats
  const g = state.globalStats;
  $('globalStats').textContent = g.answered
    ? `${tr('globalStat')}: ${g.answered} · ${g.answered ? Math.round(100*g.correct/g.answered) : 0}%`
    : '';
}

function renderMistakeBank() {
  const mb = $('mistakeBadge');
  if (state.mistakes.length) {
    mb.textContent = state.mistakes.length;
    mb.classList.remove('hidden');
  } else {
    mb.classList.add('hidden');
  }

  if (!state.mistakes.length) {
    $('mistakeList').innerHTML = `<p style="font-size:12px;color:var(--muted)">${tr('noMistakes')}</p>`;
    return;
  }
  $('mistakeList').innerHTML = state.mistakes.slice(0, 12).map(m =>
    `<div class="mistake-item">
      <strong>${esc(m.item?.display || m.item?.prompt || '?')}</strong>
      <div class="mi-ans">${esc(m.item?.answer || '—')}</div>
      <div class="mi-meta">${typeLabel(m.item?.exerciseType||'')} · ×${m.count}</div>
    </div>`).join('');
}

function renderStreak() {
  const bar = $('streakBar');
  if (state.streak >= 3) {
    $('streakCount').textContent = state.streak;
    bar.classList.remove('hidden');
  } else {
    bar.classList.add('hidden');
  }
}

// ── Theme & language ─────────────────────────────────────────────────────
function applyTheme() {
  const dark = state.theme === 'dark' || (state.theme === 'auto' && matchMedia('(prefers-color-scheme:dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir  = isRTL() ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRTL());
  // Update mode tab labels
  document.querySelector('[data-mode="learn"]').textContent   = tr('learnMode');
  document.querySelector('[data-mode="practice"]').textContent = tr('practiceMode');
  document.querySelector('[data-mode="challenge"]').textContent= tr('challengeMode');
  document.querySelector('[data-mode="mistakes"]').textContent = tr('mistakeMode');
  // Update action buttons
  $('startButton').querySelector('span').textContent  = tr('start');
  $('checkButton').querySelector('span').textContent  = tr('check');
  $('nextButton').querySelector('span').textContent   = tr('next');
  $('prevButton').querySelector('span').textContent   = tr('prev');
  setupExerciseTypeSelect();
}

// ── Sidebar ──────────────────────────────────────────────────────────────
function toggleSidebar() {
  const open = $('sidebar').classList.toggle('open');
  $('drawerBackdrop').classList.toggle('hidden', !open);
  document.querySelector('.main').toggleAttribute('inert', open);
  document.querySelector('.helper').toggleAttribute('inert', open);
}
function closeSidebar() {
  $('sidebar').classList.remove('open');
  $('drawerBackdrop').classList.add('hidden');
  document.querySelector('.main').removeAttribute('inert');
  document.querySelector('.helper').removeAttribute('inert');
}

// ── Speech synthesis ─────────────────────────────────────────────────────
function speak(text, lang = 'de-DE') {
  if (!window.speechSynthesis || !text) return;
  $('speakBtn').classList.add('speaking');
  const utt = new SpeechSynthesisUtterance(String(text).replace(/,\s*-?\S+$/, ''));
  utt.lang = lang; utt.rate = 0.88;
  utt.onend = () => $('speakBtn').classList.remove('speaking');
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}

// ── Bootstrap ────────────────────────────────────────────────────────────
init().catch(err => {
  console.error(err);
  $('questionText').textContent = 'Could not load content. See console.';
});
