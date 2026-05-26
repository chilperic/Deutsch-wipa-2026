'use strict';
window.VOKABULAR_BUILD = 'no-fragile-ui-dict-2026-05-26';

// ════════════════════════════════════════════════════════
//  APPEARANCE THEME
// ════════════════════════════════════════════════════════
function getStoredTheme() {
  try { return localStorage.getItem('vok_theme') || 'dark'; }
  catch { return 'dark'; }
}

function systemPrefersLight() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

function effectiveTheme(theme) {
  return theme === 'system' ? (systemPrefersLight() ? 'light' : 'dark') : theme;
}

function applyTheme(theme) {
  const chosen = theme || getStoredTheme();
  const effective = effectiveTheme(chosen);

  document.body.classList.remove('theme-dark', 'theme-light');
  document.body.classList.add(effective === 'light' ? 'theme-light' : 'theme-dark');
  document.documentElement.setAttribute('data-theme', effective);
  document.documentElement.setAttribute('data-theme-choice', chosen);

  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.theme === chosen);
  });
}

function setTheme(theme) {
  if (!['dark','light','system'].includes(theme)) theme = 'dark';
  localStorage.setItem('vok_theme', theme);
  applyTheme(theme);
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
    if (getStoredTheme() === 'system') applyTheme('system');
  });
}


// ════════════════════════════════════════════════════════
//  UI LOCALIZATION — safe JSON-backed dictionary
// ════════════════════════════════════════════════════════
const UI_LANGS = ["English", "German", "French", "Spanish", "Italian", "Portuguese", "Arabic", "Persian", "Chinese", "Japanese", "Korean", "Thai"];
const UI = JSON.parse("{\"English\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"German\": {\"startSession\": \"▶ Sitzung starten\", \"weakWordsButton\": \"↺ Schwache Wörter\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Fortschritt\", \"library\": \"📚 Bibliothek\", \"advanced\": \"⚙ Erweitert\", \"export\": \"↓ Exportieren\", \"importFile\": \"↑ Datei importieren\", \"reloadChapters\": \"↻ Kapitel neu laden\", \"replaceFromFiles\": \"Aus Dateien ersetzen\", \"pasteJsonDirectly\": \"JSON direkt einfügen\", \"importPastedJson\": \"Eingefügtes JSON importieren\", \"back\": \"← Zurück\", \"menu\": \"← Menü\", \"skip\": \"Überspringen\", \"exit\": \"✕ Beenden\", \"themeDark\": \"Dunkel\", \"themeLight\": \"Hell\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quizsprache\", \"interfaceLanguage\": \"Sprache der Oberfläche\", \"chapter\": \"Kapitel\", \"yourName\": \"Dein Name\", \"mode\": \"Modus\", \"wordsPerSession\": \"Wörter pro Sitzung\", \"todaysRecommendation\": \"Empfehlung für heute\", \"wordList\": \"Wortliste\", \"accuracyLastSessions\": \"Trefferquote — letzte 14 Sitzungen\", \"weakestWords\": \"Schwächste Wörter\", \"recentSessions\": \"Letzte Sitzungen\", \"dueToday\": \"heute fällig\", \"mastered\": \"stabil\", \"accuracy\": \"Trefferquote\", \"readyWords\": \"bereite Wörter\", \"noWeakWords\": \"Im Moment keine schwachen Wörter. Weiter so.\", \"notEnoughWords\": \"Nicht genug Wörter bereit. Prüfe, ob die Kapiteldateien geladen sind.\", \"articlePhase\": \"Wähle den Artikel\", \"meaningPhase\": \"Wähle die Bedeutung\", \"pluralPhase\": \"Tippe den Plural oder Pluralhinweis\", \"patternPhase\": \"Tippe das Grammatikmuster\", \"activePhase\": \"Aktive Erinnerung\", \"explanation\": \"Erklärung\", \"grammarClarification\": \"Grammatikerklärung\", \"example\": \"Beispiel\", \"grammarMemory\": \"Grammatik\", \"externalLinks\": \"Externe Links\", \"moreGrammar\": \"Mehr Grammatik\", \"showExplanation\": \"Erklärung zeigen\", \"hideExplanation\": \"Erklärung ausblenden\", \"next\": \"Weiter\", \"correct\": \"Richtig\", \"expected\": \"Erwartet\", \"reviewNeeded\": \"Wiederholen\", \"strongAnswer\": \"Starke Antwort\"}, \"French\": {\"startSession\": \"▶ Commencer\", \"weakWordsButton\": \"↺ Mots faibles\", \"grammarDictionaries\": \"Grammaire & dictionnaires\", \"tracker\": \"📊 Suivi\", \"library\": \"📚 Bibliothèque\", \"advanced\": \"⚙ Avancé\", \"export\": \"↓ Exporter\", \"importFile\": \"↑ Importer un fichier\", \"reloadChapters\": \"↻ Recharger les chapitres\", \"replaceFromFiles\": \"Remplacer par les fichiers\", \"pasteJsonDirectly\": \"Coller JSON directement\", \"importPastedJson\": \"Importer le JSON collé\", \"back\": \"← Retour\", \"menu\": \"← Menu\", \"skip\": \"Passer\", \"exit\": \"✕ Quitter\", \"themeDark\": \"Sombre\", \"themeLight\": \"Clair\", \"themeSystem\": \"Système\", \"quizLanguage\": \"Langue du quiz\", \"interfaceLanguage\": \"Langue de l’interface\", \"chapter\": \"Chapitre\", \"yourName\": \"Ton nom\", \"mode\": \"Mode\", \"wordsPerSession\": \"Mots par session\", \"todaysRecommendation\": \"Recommandation du jour\", \"wordList\": \"Liste de mots\", \"accuracyLastSessions\": \"Précision — 14 dernières sessions\", \"weakestWords\": \"Mots les plus faibles\", \"recentSessions\": \"Sessions récentes\", \"dueToday\": \"à réviser aujourd’hui\", \"mastered\": \"stables\", \"accuracy\": \"précision\", \"readyWords\": \"mots prêts\", \"noWeakWords\": \"Aucun mot faible pour le moment. Continue.\", \"notEnoughWords\": \"Pas assez de mots prêts. Vérifie que les fichiers de chapitre sont chargés.\", \"articlePhase\": \"Choisis l’article\", \"meaningPhase\": \"Choisis le sens\", \"pluralPhase\": \"Tape le pluriel ou l’indication du pluriel\", \"patternPhase\": \"Tape le modèle grammatical\", \"activePhase\": \"Rappel actif\", \"explanation\": \"Explication\", \"grammarClarification\": \"Clarification grammaticale\", \"example\": \"Exemple\", \"grammarMemory\": \"Grammaire\", \"externalLinks\": \"Liens externes\", \"moreGrammar\": \"Plus de grammaire\", \"showExplanation\": \"Afficher l’explication\", \"hideExplanation\": \"Masquer l’explication\", \"next\": \"Suivant\", \"correct\": \"Correct\", \"expected\": \"Attendu\", \"reviewNeeded\": \"À revoir\", \"strongAnswer\": \"Réponse solide\"}, \"Spanish\": {\"startSession\": \"▶ Empezar\", \"weakWordsButton\": \"↺ Palabras débiles\", \"grammarDictionaries\": \"Gramática y diccionarios\", \"tracker\": \"📊 Progreso\", \"library\": \"📚 Biblioteca\", \"advanced\": \"⚙ Avanzado\", \"export\": \"↓ Exportar\", \"importFile\": \"↑ Importar archivo\", \"reloadChapters\": \"↻ Recargar capítulos\", \"replaceFromFiles\": \"Reemplazar desde archivos\", \"pasteJsonDirectly\": \"Pegar JSON directamente\", \"importPastedJson\": \"Importar JSON pegado\", \"back\": \"← Atrás\", \"menu\": \"← Menú\", \"skip\": \"Saltar\", \"exit\": \"✕ Salir\", \"themeDark\": \"Oscuro\", \"themeLight\": \"Claro\", \"themeSystem\": \"Sistema\", \"quizLanguage\": \"Idioma del quiz\", \"interfaceLanguage\": \"Idioma de la interfaz\", \"chapter\": \"Capítulo\", \"yourName\": \"Tu nombre\", \"mode\": \"Modo\", \"wordsPerSession\": \"Palabras por sesión\", \"todaysRecommendation\": \"Recomendación de hoy\", \"wordList\": \"Lista de palabras\", \"accuracyLastSessions\": \"Precisión — últimas 14 sesiones\", \"weakestWords\": \"Palabras más débiles\", \"recentSessions\": \"Sesiones recientes\", \"dueToday\": \"para repasar hoy\", \"mastered\": \"estables\", \"accuracy\": \"precisión\", \"readyWords\": \"palabras listas\", \"noWeakWords\": \"No hay palabras débiles ahora. Sigue estudiando.\", \"notEnoughWords\": \"No hay suficientes palabras listas. Verifica que los archivos estén cargados.\", \"articlePhase\": \"Elige el artículo\", \"meaningPhase\": \"Elige el significado\", \"pluralPhase\": \"Escribe el plural o la pista del plural\", \"patternPhase\": \"Escribe el patrón gramatical\", \"activePhase\": \"Recuerdo activo\", \"explanation\": \"Explicación\", \"grammarClarification\": \"Aclaración gramatical\", \"example\": \"Ejemplo\", \"grammarMemory\": \"Gramática\", \"externalLinks\": \"Enlaces externos\", \"moreGrammar\": \"Más gramática\", \"showExplanation\": \"Mostrar explicación\", \"hideExplanation\": \"Ocultar explicación\", \"next\": \"Siguiente\", \"correct\": \"Correcto\", \"expected\": \"Esperado\", \"reviewNeeded\": \"Revisar\", \"strongAnswer\": \"Respuesta fuerte\"}, \"Italian\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Portuguese\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Arabic\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Persian\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Chinese\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Japanese\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Korean\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}, \"Thai\": {\"startSession\": \"▶ Start session\", \"weakWordsButton\": \"↺ Weak words\", \"grammarDictionaries\": \"Grammatik & Wörterbücher\", \"tracker\": \"📊 Tracker\", \"library\": \"📚 Library\", \"advanced\": \"⚙ Advanced\", \"export\": \"↓ Export\", \"importFile\": \"↑ Import file\", \"reloadChapters\": \"↻ Reload chapters\", \"replaceFromFiles\": \"Replace from files\", \"pasteJsonDirectly\": \"Paste JSON directly\", \"importPastedJson\": \"Import pasted JSON\", \"back\": \"← Back\", \"menu\": \"← Menu\", \"skip\": \"Skip\", \"exit\": \"✕ Exit\", \"themeDark\": \"Dark\", \"themeLight\": \"Light\", \"themeSystem\": \"System\", \"quizLanguage\": \"Quiz language\", \"interfaceLanguage\": \"Interface language\", \"chapter\": \"Chapter\", \"yourName\": \"Your name\", \"mode\": \"Mode\", \"wordsPerSession\": \"Words per session\", \"todaysRecommendation\": \"Today's recommendation\", \"wordList\": \"Word List\", \"accuracyLastSessions\": \"Accuracy — last 14 sessions\", \"weakestWords\": \"Weakest words\", \"recentSessions\": \"Recent sessions\", \"dueToday\": \"due today\", \"mastered\": \"mastered\", \"accuracy\": \"accuracy\", \"readyWords\": \"ready words\", \"noWeakWords\": \"No weak words right now. Keep studying!\", \"notEnoughWords\": \"Not enough words ready. Make sure your chapter files are loaded.\", \"articlePhase\": \"Choose the article\", \"meaningPhase\": \"Choose the meaning\", \"pluralPhase\": \"Type the plural or plural hint\", \"patternPhase\": \"Type the grammar pattern\", \"activePhase\": \"Active recall\", \"explanation\": \"Explanation\", \"grammarClarification\": \"Grammar clarification\", \"example\": \"Example\", \"grammarMemory\": \"Grammar memory\", \"externalLinks\": \"External links\", \"moreGrammar\": \"More grammar explanation\", \"showExplanation\": \"Show explanation\", \"hideExplanation\": \"Hide explanation\", \"next\": \"Next\", \"correct\": \"Correct\", \"expected\": \"Expected\", \"reviewNeeded\": \"Review needed\", \"strongAnswer\": \"Strong answer\"}}");

function ui(key) {
  const lang = USER.uiLang || 'English';
  return (UI[lang] && UI[lang][key]) || UI.English[key] || key;
}

function fillUiLanguageSelector() {
  const sel = document.getElementById('sel-ui-lang');
  if (!sel) return;
  if (!USER.uiLang) USER.uiLang = 'English';
  sel.innerHTML = UI_LANGS.map(l => `<option value="${h(l)}" ${l===USER.uiLang?'selected':''}>${h(l)}</option>`).join('');
}

function applyI18n() {
  fillUiLanguageSelector();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.textContent = ui(key);
  });
  document.documentElement.lang = (USER.uiLang || 'English').toLowerCase().slice(0,2);
  document.body.dir = ['Arabic','Persian'].includes(USER.uiLang) ? 'rtl' : 'ltr';
}


// ════════════════════════════════════════════════════════
//  CONSTANTS
// ════════════════════════════════════════════════════════
const LANGS = ['English','Spanish','French','Japanese','German','Korean','Italian','Chinese','Portuguese','Persian','Arabic','Thai'];
const RTL   = new Set(['Arabic','Persian']);
const ART   = ['der','die','das','—'];
const SRS_I = [0, 1, 3, 7, 14, 30, 60, 120]; // Leitner box → days until due
const DAY   = 86400000;

// ════════════════════════════════════════════════════════
//  STATE — persistent
// ════════════════════════════════════════════════════════
let DB   = load('vok_db3',   { words: [] });
let USER = load('vok_u3', { name:'', lang:'English', chapter:'all', mode:'full', size:'10', autoSpeak:'off', uiLang:'English'});
let SRS  = load('vok_srs3',  {});
let HIST = load('vok_h3',    []);

// ════════════════════════════════════════════════════════
//  STATE — session (not persisted)
// ════════════════════════════════════════════════════════
let Q = emptySession();
function emptySession() {
  return { queue:[], orig:[], idx:0, ok:0, weak:0, pts:0, streak:0, best:0,
           weakItems:[], cur:null, phase:null, opts:[], showExpl:false,
           artOk:null, meanOk:null, pluralOk:null, patternOk:null, activeOk:null };
}

// ════════════════════════════════════════════════════════
//  PERSISTENCE
// ════════════════════════════════════════════════════════
function load(k, fallback) {
  try { return JSON.parse(localStorage.getItem(k)) || structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}
function save() {
  localStorage.setItem('vok_db3',  JSON.stringify(DB));
  localStorage.setItem('vok_u3',   JSON.stringify(USER));
  localStorage.setItem('vok_srs3', JSON.stringify(SRS));
  localStorage.setItem('vok_h3',   JSON.stringify(HIST.slice(-200)));
}

// ════════════════════════════════════════════════════════
//  HTML ESCAPE
// ════════════════════════════════════════════════════════
function h(s) {
  return String(s ?? '').replace(/[&<>"']/g,
    c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ════════════════════════════════════════════════════════
//  WORD HELPERS
// ════════════════════════════════════════════════════════
const uid  = () => Math.random().toString(36).slice(2,10);

function artOf(word) {
  const m = String(word||'').match(/^(der|die|das)\s+/i);
  return m ? m[1].toLowerCase() : null;
}
function baseOf(word) {
  return String(word||'').replace(/^(der|die|das)\s+/i,'').split(',')[0].split('(')[0].trim();
}
function chapOf(w) {
  const s = String(w.chapter_id || w.chapter || w.notes || w.id || '');
  const m = s.match(/(?:kapitel|k)\s*(\d+)/i);
  return m ? m[1] : '?';
}
function trOf(w) {
  const t = w.data?.translations || {};
  return t[USER.lang] || t.English || Object.values(t).find(v => String(v||'').trim()) || '—';
}
function explOf(w) {
  const e = w.data?.explanation;
  if (!e) return '';
  if (typeof e === 'string') return e;
  return e[USER.lang] || e.English || e.German || Object.values(e)[0] || '';
}
function gramClarOf(w) {
  const e = w.data?.grammar_clarification;
  if (!e) return '';
  if (typeof e === 'string') return e;
  return e[USER.lang] || e.English || '';
}
function exTrOf(w) {
  const e = w.data?.example_translated;
  if (!e) return '';
  if (typeof e === 'string') return e;
  return e[USER.lang] || e.English || '';
}

function readyWords() {
  return DB.words.filter(w =>
    w.status === 'done' &&
    w.data &&
    w.data.translations &&
    Object.values(w.data.translations).some(v => String(v || '').trim())
  );
}

function poolFor(chapter, mode) {
  let p = readyWords();
  if (chapter !== 'all') p = p.filter(w => chapOf(w) === chapter);
  if (mode === 'due')    p = p.filter(w => srsOf(w.id).due <= Date.now());
  if (mode === 'weak')   p = p.filter(w => isWeak(w.id));
  return p;
}

function shuffle(a) {
  const b = [...a];
  for (let i = b.length-1; i > 0; i--) { const j = ~~(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; }
  return b;
}

// ════════════════════════════════════════════════════════
//  SRS — SPACED REPETITION (LEITNER BOXES)
// ════════════════════════════════════════════════════════
function srsOf(id) {
  if (!SRS[id]) SRS[id] = { box:0, correct:0, wrong:0, due:0, seen:0,
    tracks: { art:{c:0,w:0}, mean:{c:0,w:0}, plural:{c:0,w:0}, pattern:{c:0,w:0}, active:{c:0,w:0} } };
  const r = SRS[id];
  ['art','mean','plural','pattern','active'].forEach(t => { if (!r.tracks[t]) r.tracks[t]={c:0,w:0}; });
  return r;
}
function isDue(id)  { return srsOf(id).due <= Date.now(); }
function isWeak(id) { const r = srsOf(id); return r.wrong > r.correct || (r.box===0 && r.seen>0); }

function recordResult(word, allOk, tracks) {
  const r = srsOf(word.id);
  r.seen++;
  if (allOk) { r.correct++; r.box = Math.min(7, r.box+1); }
  else        { r.wrong++;   r.box = 0; }
  Object.entries(tracks).forEach(([k,v]) => {
    if (v === true)  r.tracks[k].c++;
    if (v === false) r.tracks[k].w++;
  });
  r.due = Date.now() + SRS_I[r.box] * DAY;
  save();
}

function masteryHTML(id) {
  const r = srsOf(id);
  return ['art','mean','plural','pattern','active'].map(k => {
    const t = r.tracks[k], n = t.c + t.w;
    const pct = n ? ~~(t.c/n*100) : -1;
    const cls = pct < 0 ? 'grey' : pct >= 70 ? 'hot' : pct >= 40 ? 'warm' : 'cold';
    const label = {art:'Art',mean:'Mean',plural:'Plur',pattern:'Patt',active:'Active'}[k];
    return `<span class="mt ${cls}">${label}${pct>=0?` ${pct}%`:''}</span>`;
  }).join('');
}

function leitnerHTML(id) {
  const box = srsOf(id).box;
  const clrs = ['#f06060','#f0a030','#f0a030','#c9a84c','#c9a84c','#3dd68c','#3dd68c','#3dd68c'];
  return `<div class="leitner" title="Leitner box ${box}/7 · due ${box<1?'now':'in '+SRS_I[box]+'d'}">` +
    Array.from({length:8},(_,i) =>
      `<div class="lb" style="height:${14+i*8}px;background:${i<=box?clrs[i]:'var(--b1)'}"></div>`
    ).join('') + '</div>';
}

// ════════════════════════════════════════════════════════
//  QUIZ PHASE HELPERS
// ════════════════════════════════════════════════════════
function norm(s) {
  return String(s||'').toLowerCase()
    // German umlauts: accept ae/oe/ue spellings for keyboard issues.
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\b(der|die|das)\b/g,' ')
    .replace(/[^a-z0-9\u0600-\u06ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\u0e00-\u0e7f]+/g,' ')
    .trim();
}
function fuzzyMatch(input, expected, alts=[]) {
  const ni = norm(input);
  return ni === norm(expected) || alts.some(a => ni === norm(a));
}

function hasPlural(w) {
  const g = w.data?.grammar || {};
  return !!(g.plural_hint || g.plural) && String(g.type||'').includes('noun');
}
function pluralHint(w) {
  const g = w.data?.grammar || {};
  return String(g.plural_hint || g.plural || '').trim();
}
function umlautLastVowel(str) {
  return String(str || '').replace(/([aouAOU])(?!.*[aouAOU])/u, ch =>
    ({a:'ä',o:'ö',u:'ü',A:'Ä',O:'Ö',U:'Ü'}[ch] || ch)
  );
}
function pluralFromHint(base, hint) {
  const h = String(hint || '').trim();
  if (!h) return '';
  if (h === '-' || h === '—') return base;
  if (h.includes('¨') || h.includes('̈')) {
    const suffix = h.replace(/^[-–—]/,'').replace(/[¨̈]/g,'');
    return umlautLastVowel(base) + suffix;
  }
  if (/^[-–—]/.test(h)) return base + h.replace(/^[-–—]/,'');
  return h;
}
function pluralAnswers(w) {
  const g = w.data?.grammar || {};
  const base = g.base || baseOf(w.word);
  const hint = pluralHint(w);
  const generated = pluralFromHint(base, hint);
  const values = [g.plural, hint, generated, generated ? `die ${generated}` : '', base].filter(Boolean);
  return [...new Set(values.map(String))];
}
function activeAnswers(w) {
  const base = baseOf(w.word);
  const art = artOf(w.word);
  const full = art ? `${art} ${base}` : base;
  return [...new Set([full, base, w.word].filter(Boolean).map(String))];
}
function preferredActiveAnswer(w) {
  return activeAnswers(w)[0] || baseOf(w.word);
}
function hasPattern(w) {
  const g = w.data?.grammar || {};
  if (g.pattern && String(g.pattern).trim()) return true;
  return /\([^)]*\+[^)]*\)/.test(w.word||'');
}
function patternHint(w) {
  const g = w.data?.grammar || {};
  if (g.pattern) return String(g.pattern).trim();
  const m = (w.word||'').match(/\(([^)]*\+[^)]*)\)/);
  return m ? m[1].trim() : '';
}
function firstPhaseAfterMean(w) {
  if (hasPlural(w))  return 'plural';
  if (hasPattern(w)) return 'pattern';
  return 'active';
}

// ════════════════════════════════════════════════════════
//  IMPORT / EXPORT
// ════════════════════════════════════════════════════════
function normalizeEntry(raw, chapMeta={}) {
  const word = raw.word || raw.display || raw.german || raw.de || '';
  const translations = raw.data?.translations || raw.translations || {};
  if (raw.translation_en) translations.English = raw.translation_en;
  if (raw.translation)    translations.English = raw.translation;
  return {
    id:         raw.id || uid(),
    word,
    notes:      raw.notes || chapMeta.title || '',
    chapter_id: raw.chapter_id || chapMeta.id || raw.chapter || '',
    status:     raw.status === 'pending' ? 'pending' : 'done',
    data: {
      translations,
      explanation:           raw.data?.explanation           || raw.explanation           || '',
      grammar_clarification: raw.data?.grammar_clarification || raw.grammar_clarification || '',
      example_de:            raw.data?.example_de            || raw.example_de            || '',
      example_translated:    raw.data?.example_translated    || raw.example_translated    || '',
      grammar:               raw.data?.grammar               || raw.grammar               || {},
    }
  };
}

function importData(raw, append=false) {
  const words = Array.isArray(raw) ? raw : (raw.words || []);
  if (!Array.isArray(words)) throw new Error('Expected an array of words');
  const converted = words
    .map(w => normalizeEntry(w))
    .filter(w => w.word);

  DB.words = append ? mergeWords(DB.words, converted) : converted;
  save(); buildMenu(); renderLibrary(); renderLibraryChapters();
  return converted.length;
}

function mergeWords(existing, incoming) {
  const map = new Map(existing.map(w => [w.id, w]));
  incoming.forEach(w => map.set(w.id, w));
  return Array.from(map.values());
}

function importFile(e) {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = ev => {
    try {
      const n = importData(JSON.parse(ev.target.result), true);
      showScreen('menu-screen');
      alert(`✓ Imported ${n} words. Total: ${DB.words.length}`);
    } catch(err) { alert('Import failed: ' + err.message); }
  };
  r.readAsText(file); e.target.value = '';
}

function importFromPaste() {
  const txt = document.getElementById('paste-box').value.trim();
  if (!txt) return;
  try {
    const n = importData(JSON.parse(txt), true);
    document.getElementById('paste-box').value = '';
    alert(`✓ Imported ${n} words.`);
  } catch(err) { alert('Parse failed: ' + err.message); }
}

function exportData() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify({
    meta: { targetLanguages: LANGS, explanationLanguage: USER.lang, exported: new Date().toISOString() },
    words: DB.words
  }, null, 2)], { type: 'application/json' }));
  a.download = 'vocab.json'; a.click(); URL.revokeObjectURL(a.href);
}

// Drag-and-drop
const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('click', () => document.getElementById('file-input').click());
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault(); dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = ev => {
    try { const n = importData(JSON.parse(ev.target.result), true); alert(`✓ Imported ${n} words.`); }
    catch(err) { alert('Failed: ' + err.message); }
  };
  r.readAsText(file);
});

// ════════════════════════════════════════════════════════
//  MENU
// ════════════════════════════════════════════════════════
function availableLangs() {
  const rw = readyWords();
  const langs = LANGS.filter(l => rw.some(w => String(w.data?.translations?.[l]||'').trim()));
  return langs.length ? langs : ['English'];
}

function buildMenu() {
  fillUiLanguageSelector();
  const rw = readyWords();
  const att = Object.values(SRS).reduce((a,r)=>a+r.correct+r.wrong,0);
  const cor = Object.values(SRS).reduce((a,r)=>a+r.correct,0);

  document.getElementById('s-total').textContent    = rw.length;
  document.getElementById('s-due').textContent      = rw.filter(w=>isDue(w.id)).length;
  document.getElementById('s-mastered').textContent = rw.filter(w=>srsOf(w.id).box>=4).length;
  document.getElementById('s-acc').textContent      = att ? ~~(cor/att*100)+'%' : '—';

  // Language selector
  const langs = availableLangs();
  if (!langs.includes(USER.lang)) USER.lang = langs[0];
  document.getElementById('sel-lang').innerHTML =
    langs.map(l=>`<option value="${h(l)}" ${l===USER.lang?'selected':''}>${l}</option>`).join('');

  // Chapter selector
  const chapters = [...new Set(rw.map(chapOf))].filter(c=>c!=='?').sort((a,b)=>+a-+b);
  document.getElementById('sel-chapter').innerHTML =
    `<option value="all">All chapters (${rw.length})</option>` +
    chapters.map(c => {
      const n = rw.filter(w=>chapOf(w)===c).length;
      return `<option value="${c}" ${USER.chapter===c?'selected':''}>Kapitel ${c} (${n})</option>`;
    }).join('');

  document.getElementById('sel-mode').value = USER.mode;
  document.getElementById('inp-name').value = USER.name;
  document.getElementById('start-btn').disabled = rw.length < 2;

  // Recommendation
  const dueN = rw.filter(w=>isDue(w.id)).length;
  const weakN = rw.filter(w=>isWeak(w.id)).length;
  const artW = rw.filter(w=>{const t=srsOf(w.id).tracks.art;return t.w>t.c}).length;
  if (rw.length === 0) {
    document.getElementById('daily-rec').innerHTML =
      'Loading chapter files from <code>data/</code>… If nothing appears, click ↻ Reload chapters.';
  } else {
    const n = Math.min(10, weakN || dueN || rw.length);
    document.getElementById('daily-rec').innerHTML =
      `Study <b>${n}</b> words today — <b style="color:var(--info)">${dueN}</b> due · ` +
      `<b style="color:var(--err)">${weakN}</b> weak · ` +
      `Articles to fix: <b style="color:var(--der)">${artW}</b>`;
  }

  // Size pills
  document.querySelectorAll('#size-pills .pill').forEach(p =>
    p.classList.toggle('on', p.dataset.n === USER.size));
  applyI18n();
}


const uiLangSelector = document.getElementById('sel-ui-lang');
if (uiLangSelector) {
  uiLangSelector.addEventListener('change', e => {
    USER.uiLang = e.target.value;
    save();
    applyI18n();
    buildMenu();
  });
}

// ════════════════════════════════════════════════════════
//  SESSION MANAGEMENT
// ════════════════════════════════════════════════════════
function startSession() {
  USER.name    = document.getElementById('inp-name').value.trim() || 'Learner';
  USER.lang    = document.getElementById('sel-lang').value;
  USER.chapter = document.getElementById('sel-chapter').value;
  USER.mode    = document.getElementById('sel-mode').value;
  save();

  const pool = poolFor(USER.chapter, USER.mode);
  if (pool.length < 2) {
    alert(`Not enough words ready (${pool.length}). Make sure your data/kapitelN.json files are in the repo and click ↻ Reload chapters.`);
    return;
  }

  const n = USER.size === 'all' ? pool.length : Math.min(+USER.size||10, pool.length);
  const q = shuffle(pool).slice(0, n);
  Q = { ...emptySession(), queue: q, orig: [...q] };
  showScreen('quiz-screen');
  nextWord();
}

function restartSession() {
  Q = { ...emptySession(), queue: [...Q.orig], orig: [...Q.orig] };
  showScreen('quiz-screen');
  nextWord();
}

function exitQuiz() { showScreen('menu-screen'); buildMenu(); }
function skipWord()  { Q.idx++; nextWord(); }

function reviewWeak() {
  const pool = poolFor(USER.chapter, 'weak');
  if (!pool.length) { alert('No weak words right now. Keep studying!'); return; }
  const q = shuffle(pool).slice(0, Math.min(20, pool.length));
  Q = { ...emptySession(), queue: q, orig: [...q] };
  showScreen('quiz-screen'); nextWord();
}
function doReviewWeak() {
  const uniq = [...new Map(Q.weakItems.map(w=>[w.id,w])).values()];
  if (!uniq.length) { showScreen('menu-screen'); buildMenu(); return; }
  Q = { ...emptySession(), queue: uniq, orig: uniq };
  showScreen('quiz-screen'); nextWord();
}

// ════════════════════════════════════════════════════════
//  WORD LOADING & OPTION BUILDING
// ════════════════════════════════════════════════════════
function nextWord() {
  if (Q.idx >= Q.queue.length) { endSession(); return; }
  const w = Q.queue[Q.idx];
  Q.cur      = w;
  Q.phase    = artOf(w.word) ? 'art' : 'mean';
  Q.opts     = [];
  Q.artOk    = null; Q.meanOk   = null;
  Q.pluralOk = null; Q.patternOk= null; Q.activeOk = null;
  Q.showExpl = false;
  if (USER.autoSpeak === 'on') speakWord(w.word);
  render();
}

function buildOpts(w) {
  const correct = trOf(w);
  const seen = new Set([correct]);
  const others = [];
  for (const x of shuffle(readyWords())) {
    const t = trOf(x);
    if (x.id !== w.id && t && t !== '—' && !seen.has(t)) {
      seen.add(t);
      others.push(t);
    }
    if (others.length >= 3) break;
  }
  while (others.length < 3) others.push('—');
  return shuffle([{ txt: correct, ok: true }, ...others.map(t => ({ txt: t, ok: false }))]);
}

// ════════════════════════════════════════════════════════
//  ANSWER HANDLERS
// ════════════════════════════════════════════════════════
function answerArt(a) {
  if (Q.phase !== 'art') return;
  const correct = artOf(Q.cur.word) || '—';
  Q.artOk  = a === correct;
  Q.pts   += Q.artOk ? 1 : 0;
  Q.phase  = 'mean';
  render();
  flashMsg(Q.artOk, Q.artOk ? '✓ Correct article' : `✗ Correct: ${correct}`);
}

function answerMean(i) {
  if (Q.phase !== 'mean') return;
  if (!Q.opts.length) Q.opts = buildOpts(Q.cur);
  Q.meanOk = Q.opts[i].ok;
  Q.pts   += Q.meanOk ? 2 : 0;
  Q.phase  = firstPhaseAfterMean(Q.cur);
  render();
  flashMsg(Q.meanOk, Q.meanOk ? '✓ Correct' : `✗ Correct: ${trOf(Q.cur)}`);
}

function answerPlural() {
  const input = document.getElementById('typed')?.value || '';
  const answers = pluralAnswers(Q.cur);
  const expected = answers[0] || pluralHint(Q.cur);
  Q.pluralOk = answers.some(a => fuzzyMatch(input, a));
  Q.pts += Q.pluralOk ? 2 : 0;
  Q.phase = hasPattern(Q.cur) ? 'pattern' : 'active';
  render();
  flashMsg(Q.pluralOk, Q.pluralOk ? '✓ Correct' : `✗ Expected: ${expected}`);
}

function answerPattern() {
  const input  = document.getElementById('typed')?.value || '';
  const exp    = patternHint(Q.cur);
  Q.patternOk  = fuzzyMatch(input, exp);
  Q.pts       += Q.patternOk ? 2 : 0;
  Q.phase      = 'active';
  render();
  flashMsg(Q.patternOk, Q.patternOk ? '✓ Correct' : `✗ Expected: ${exp}`);
}

function answerActive() {
  const input = document.getElementById('typed')?.value || '';
  const answers = activeAnswers(Q.cur);
  const exp = preferredActiveAnswer(Q.cur);
  Q.activeOk = answers.some(a => fuzzyMatch(input, a));
  Q.pts += Q.activeOk ? 3 : 0;

  const hasArt = !!artOf(Q.cur.word);
  const hasPlu = hasPlural(Q.cur);
  const hasPat = hasPattern(Q.cur);
  const allOk  = (!hasArt || Q.artOk) && Q.meanOk
               && (!hasPlu || Q.pluralOk)
               && (!hasPat || Q.patternOk)
               && Q.activeOk;

  if (allOk) { Q.ok++; Q.streak++; Q.best = Math.max(Q.best, Q.streak); }
  else        { Q.weak++; Q.streak = 0; Q.weakItems.push(Q.cur); }

  recordResult(Q.cur, allOk, {
    art:     hasArt ? Q.artOk     : null,
    mean:    Q.meanOk,
    plural:  hasPlu ? Q.pluralOk  : null,
    pattern: hasPat ? Q.patternOk : null,
    active:  Q.activeOk,
  });

  Q.phase = 'done';
  render();
}

// ════════════════════════════════════════════════════════
//  RENDER
// ════════════════════════════════════════════════════════
function render() {
  const w     = Q.cur; if (!w) return;
  const qcard = document.getElementById('qcard');
  const art   = artOf(w.word);

  // ── Header badges ──
  document.getElementById('prog-bar').style.width = `${~~(Q.idx/Q.queue.length*100)}%`;
  document.getElementById('b-ok').textContent    = `${Q.ok} ✓`;
  document.getElementById('b-err').textContent   = `${Q.weak} ✗`;
  document.getElementById('b-pts').textContent   = `${Q.pts} pts`;
  const sb = document.getElementById('b-streak');
  sb.textContent = Q.streak >= 3 ? `${Q.streak} 🔥` : `${Q.streak} streak`;
  sb.className   = 'badge ' + (Q.streak >= 5 ? 'gold' : Q.streak >= 3 ? 'warn' : '');
  document.getElementById('b-left').textContent  = `${Q.queue.length - Q.idx} left`;

  // ── Article display (above word) ──
  let artDisplay = '';
  if (Q.artOk !== null && art) {
    artDisplay = Q.artOk
      ? `<span style="color:var(--${art})">✓ ${art}</span>`
      : `<span style="color:var(--err)">✗ picked wrong</span>
         <span style="color:var(--${art});margin-left:8px;font-size:15px">(correct: ${art})</span>`;
  }

  // ── During ACTIVE RECALL: hide word, show meaning ──
  const isRecalling = Q.phase === 'active';
  const wordBlur    = isRecalling ? ' blur' : '';
  const recallBox   = isRecalling ? `
    <div class="recall-box">
      <div class="recall-meaning">${h(trOf(w))}</div>
      <div class="recall-hint">Type the German word from memory</div>
    </div>` : '';

  // ── Step indicators ──
  const stepDefs = [];
  if (art) stepDefs.push(['art','Article',Q.artOk]);
  stepDefs.push(['mean','Meaning',Q.meanOk]);
  if (hasPlural(w))  stepDefs.push(['plural','Plural',Q.pluralOk]);
  if (hasPattern(w)) stepDefs.push(['pattern','Pattern',Q.patternOk]);
  stepDefs.push(['active','Active',Q.activeOk]);
  const stepsHTML = stepDefs.map(([id,label,val]) => {
    const cls = Q.phase===id ? 'active' : val===true ? 'pass' : val===false ? 'fail' : '';
    return `<span class="step ${cls}">${label}</span>`;
  }).join('');

  // ── Phase content ──
  let phaseHTML = '';

  if (Q.phase === 'art') {
    phaseHTML = `
      <p class="phase-lbl">${ui('articlePhase')} — blue=der · red=die · green=das</p>
      <div class="art-grid">
        ${ART.map(a => {
          const cls = a==='—' ? 'noart' : a;
          return `<button class="art-btn ${cls}" onclick="answerArt('${a}')">${a}</button>`;
        }).join('')}
      </div>
      <p style="font-family:var(--mono);font-size:11px;color:var(--muted);text-align:center;margin-top:10px">
        Keys: 1=der · 2=die · 3=das · 4=—
      </p>`;
  }
  else if (Q.phase === 'mean') {
    if (!Q.opts.length) Q.opts = buildOpts(w);
    const keys = ['A','B','C','D'];
    phaseHTML = `
      <p class="phase-lbl">${ui('meaningPhase')} in ${h(USER.lang)}</p>
      <div class="opts">
        ${Q.opts.map((o,i) => `
          <button class="opt" onclick="answerMean(${i})">
            <span class="opt-key">${keys[i]}</span>
            <span class="opt-txt ${RTL.has(USER.lang)?'rtl':''}">${h(o.txt)}</span>
          </button>`).join('')}
      </div>`;
  }
  else if (Q.phase === 'plural') {
    phaseHTML = `
      <p class="phase-lbl">Type plural form or hint — e.g. -n, -e, -¨er, die Verträge, Vertraege</p>
      <input class="type-input" id="typed" autocomplete="off" placeholder="-n / -e / -¨e / die Verträge / Vertraege …"
             autofocus onkeydown="if(event.key==='Enter')answerPlural()">
      <div class="row g12" style="margin-top:14px;justify-content:center">
        <button class="btn btn-gold" onclick="answerPlural()">Check plural</button>
        <button class="btn btn-ghost" onclick="Q.showExpl=!Q.showExpl;render()">📖 Explanation</button>
      </div>`;
  }
  else if (Q.phase === 'pattern') {
    phaseHTML = `
      <p class="phase-lbl">Type the case/preposition pattern</p>
      <input class="type-input" id="typed" autocomplete="off" placeholder="bei + D. / über + A. …"
             autofocus onkeydown="if(event.key==='Enter')answerPattern()">
      <div class="row g12" style="margin-top:14px;justify-content:center">
        <button class="btn btn-gold" onclick="answerPattern()">Check pattern</button>
        <button class="btn btn-ghost" onclick="Q.showExpl=!Q.showExpl;render()">📖 Explanation</button>
      </div>`;
  }
  else if (Q.phase === 'active') {
    // Word is blurred above. Only meaning visible. User types German from memory.
    phaseHTML = `
      <input class="type-input" id="typed" autocomplete="off" placeholder="Type the German word…"
             autofocus onkeydown="if(event.key==='Enter')answerActive()" style="margin-top:14px">
      <div class="row g12" style="margin-top:14px;justify-content:center">
        <button class="btn btn-gold" onclick="answerActive()">Check</button>
        <button class="btn btn-ghost" onclick="Q.showExpl=!Q.showExpl;render()">📖 Hint</button>
      </div>`;
  }
  else if (Q.phase === 'done') {
    const hasArt = !!art;
    const hasPlu = hasPlural(w);
    const hasPat = hasPattern(w);
    const allOk  = (!hasArt||Q.artOk) && Q.meanOk && (!hasPlu||Q.pluralOk) && (!hasPat||Q.patternOk) && Q.activeOk;
    const parts  = [
      hasArt ? `Art ${Q.artOk?'✓':'✗'}` : null,
      `Meaning ${Q.meanOk?'✓':'✗'}`,
      hasPlu ? `Plural ${Q.pluralOk?'✓':'✗'} (${h(pluralHint(w))})` : null,
      hasPat ? `Pattern ${Q.patternOk?'✓':'✗'} (${h(patternHint(w))})` : null,
      `Active ${Q.activeOk?'✓':'✗'} → ${h(preferredActiveAnswer(w))}`,
    ].filter(Boolean);

    const showExpl = Q.showExpl || USER.mode === 'learn';

    phaseHTML = `
      <div class="feedback ${allOk?'ok':'err'}">
        ${allOk?'✓ Strong — all phases correct':'✗ Review needed'}
        &nbsp;·&nbsp; ${parts.join(' &nbsp;·&nbsp; ')}
      </div>
      ${leitnerHTML(w.id)}
      ${showExpl ? buildExplPanel(w) : ''}
      <div class="row g10" style="margin-top:14px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="Q.idx++;nextWord()">Next word →</button>
        ${USER.mode !== 'exam' ? `<button class="btn btn-ghost" onclick="Q.showExpl=!Q.showExpl;render()">${Q.showExpl?'Hide explanation':'📖 Explanation'}</button>` : ''}
        <button class="btn btn-ghost" onclick="speakCurrent()">🔊 Speak</button>
      </div>`;
  }

  const earlyExpl = (Q.phase !== 'done' && (USER.mode === 'learn' || Q.showExpl)) ? buildExplPanel(w) : '';

  qcard.innerHTML = `
    <div class="word-area">
      <div class="w-article ${art||'none'}">${artDisplay}</div>
      <div class="w-main${wordBlur}">${h(baseOf(w.word))}</div>
      <div class="w-sub">${h(w.notes || 'Kapitel ' + chapOf(w))}</div>
      <div class="mastery-row">${masteryHTML(w.id)}</div>
      ${recallBox}
    </div>
    <div class="steps">${stepsHTML}</div>
    ${phaseHTML}
    ${earlyExpl}
  `;

  // Focus typed input
  const typed = document.getElementById('typed');
  if (typed) setTimeout(() => typed.focus(), 40);
}

// ════════════════════════════════════════════════════════
//  EXPLANATION PANEL
// ════════════════════════════════════════════════════════
function buildExplPanel(w) {
  const d = w.data; if (!d) return '';
  const explanation = explOf(w);
  const clarif      = gramClarOf(w);
  const exTr        = exTrOf(w);
  const g           = d.grammar || {};
  const gramRows    = Object.entries(g)
    .filter(([,v]) => v && v !== 'null' && v !== null)
    .map(([k,v]) => `<div class="grow"><span>${h(k)}</span><b>${h(Array.isArray(v)?v.join(', '):v)}</b></div>`)
    .join('');
  const transHTML   = Object.entries(d.translations||{})
    .filter(([,v]) => v && v!=='null')
    .map(([lang,val]) =>
      `<div class="tr-row">
        <span class="tr-lang">${h(lang)}</span>
        <span class="tr-val ${RTL.has(lang)?'rtl':''}">${h(val)}</span>
      </div>`).join('');
  const q = encodeURIComponent(baseOf(w.word));
  const links = [
    ['Duden',       `https://www.duden.de/suchen/dudenonline/${q}`],
    ['DWDS',        `https://www.dwds.de/wb/${q}`],
    ['LEO',         `https://dict.leo.org/german-english/${q}`],
    ['Verbformen',  `https://www.verbformen.de/?w=${q}`],
    ['Wiktionary',  `https://de.wiktionary.org/wiki/${q}`],
    ['Linguee',     `https://www.linguee.de/deutsch-englisch/search?query=${q}`],
  ].map(([n,u]) => `<a class="dlink" href="${u}" target="_blank" rel="noopener">${n}</a>`).join('');

  return `<div class="expl">
    ${explanation?`<div class="expl-sec"><span class="lbl">Explanation</span><p class="expl-txt">${h(explanation)}</p></div>`:''}
    ${clarif?`<div class="expl-sec"><span class="lbl">Grammar clarification</span><p class="expl-txt">${h(clarif)}</p></div>`:''}
    ${d.example_de?`<div class="expl-sec"><span class="lbl">Example</span>
      <p class="expl-de">${h(d.example_de)}</p>
      <p class="expl-tr">${h(exTr)}</p></div>`:''}
    ${gramRows?`<div class="expl-sec"><span class="lbl">Grammar data</span><div class="gram-grid">${gramRows}</div></div>`:''}
    ${transHTML?`<div class="expl-sec"><span class="lbl">All translations</span><div class="trans-grid">${transHTML}</div></div>`:''}
    <div class="expl-sec"><span class="lbl">Further reading</span><div class="link-row">${links}</div></div>
  </div>`;
}

function flashMsg(ok, msg) {
  const qc = document.getElementById('qcard'); if (!qc) return;
  qc.querySelectorAll('[data-flash]').forEach(e => e.remove());
  const el = document.createElement('div');
  el.setAttribute('data-flash','');
  el.className = `feedback ${ok?'ok':'err'}`;
  el.textContent = msg;
  qc.appendChild(el);
  setTimeout(() => el?.remove(), 2400);
}

// ════════════════════════════════════════════════════════
//  END SESSION
// ════════════════════════════════════════════════════════
function endSession() {
  const total = Q.ok + Q.weak;
  const pct   = total ? ~~(Q.ok/total*100) : 0;
  const grade = pct>=90?'Ausgezeichnet! 🏆':pct>=75?'Sehr gut! 🌟':pct>=60?'Gut gemacht! 👍':pct>=40?'Weiter üben! 💪':'Noch mehr Übung';

  HIST.push({ date:new Date().toLocaleString(), chapter:USER.chapter,
              words:Q.queue.length, ok:Q.ok, weak:Q.weak, pts:Q.pts, streak:Q.best, score:pct });
  save();

  document.getElementById('sum-pct').textContent    = pct + '%';
  document.getElementById('sum-grade').textContent  = grade;
  document.getElementById('sum-sub').textContent    =
    `${USER.name} · ${USER.chapter==='all'?'All chapters':'Kapitel '+USER.chapter} · ${Q.queue.length} words`;
  document.getElementById('sum-ok').textContent     = Q.ok;
  document.getElementById('sum-err').textContent    = Q.weak;
  document.getElementById('sum-pts').textContent    = Q.pts;
  document.getElementById('sum-streak').textContent = Q.best;

  const wb    = document.getElementById('sum-weak-box');
  const uniq  = [...new Map(Q.weakItems.map(w=>[w.id,w])).values()];
  if (uniq.length) {
    wb.style.display = '';
    document.getElementById('sum-weak-rows').innerHTML = uniq.map(w => {
      const q2 = encodeURIComponent(baseOf(w.word));
      return `<tr>
        <td style="font-family:var(--serif);font-style:italic">${h(w.word)}</td>
        <td>${h(trOf(w))}</td>
        <td>${h(w.notes||'Kap. '+chapOf(w))}</td>
        <td><a class="dlink" href="https://www.duden.de/suchen/dudenonline/${q2}" target="_blank">Duden</a>
            <a class="dlink" href="https://www.dwds.de/wb/${q2}" target="_blank">DWDS</a></td>
      </tr>`;
    }).join('');
  } else wb.style.display = 'none';

  showScreen('summary-screen');
  buildMenu();
}

// ════════════════════════════════════════════════════════
//  TRACKER
// ════════════════════════════════════════════════════════
function renderTracker() {
  const entries = Object.values(SRS);
  const att = entries.reduce((a,r)=>a+r.correct+r.wrong,0);
  const cor = entries.reduce((a,r)=>a+r.correct,0);
  const best= HIST.reduce((m,s)=>Math.max(m,s.streak||0),0);

  document.getElementById('tr-sessions').textContent = HIST.length;
  document.getElementById('tr-acc').textContent      = att ? ~~(cor/att*100)+'%' : '—';
  document.getElementById('tr-wrong').textContent    = entries.reduce((a,r)=>a+r.wrong,0);
  document.getElementById('tr-streak').textContent   = best;

  const recent = HIST.slice(-14);
  document.getElementById('trend-chart').innerHTML = recent.length
    ? recent.map(s=>`<div class="tbar" title="${h(s.date)}: ${s.score}%" style="height:${Math.max(4,s.score)}%"></div>`).join('')
    : '<span class="tiny">No sessions yet.</span>';

  const wmap   = Object.fromEntries(readyWords().map(w=>[w.id,w]));
  const sorted = Object.entries(SRS).map(([id,r])=>({id,r,w:wmap[id]})).filter(x=>x.w)
    .sort((a,b)=>b.r.wrong-a.r.wrong).slice(0,15);

  document.getElementById('tr-weak-rows').innerHTML = sorted.length
    ? sorted.map(x=>`<tr><td style="font-family:var(--serif);font-style:italic">${h(x.w.word)}</td>
        <td style="color:var(--err)">${x.r.wrong}</td>
        <td style="color:var(--ok)">${x.r.correct}</td>
        <td>${x.r.box}</td></tr>`).join('')
    : '<tr><td colspan="4" style="color:var(--muted)">No data yet.</td></tr>';

  document.getElementById('tr-session-rows').innerHTML = HIST.slice(-12).reverse()
    .map(s=>`<tr><td>${h(s.date)}</td><td>${s.chapter==='all'?'All':'Kap.'+s.chapter}</td>
             <td>${s.score}%</td><td>${s.words}</td></tr>`).join('')
    || '<tr><td colspan="4" style="color:var(--muted)">No sessions yet.</td></tr>';
}

function resetSRS() {
  if (!confirm('Reset all SRS progress? Word data is kept, only review history is deleted.')) return;
  SRS = {}; HIST = []; save(); renderTracker(); buildMenu();
}

// ════════════════════════════════════════════════════════
//  LIBRARY
// ════════════════════════════════════════════════════════
function renderLibrary() {
  const q   = (document.getElementById('lib-search')?.value||'').toLowerCase();
  const ch  = document.getElementById('lib-chapter')?.value || 'all';
  let words = readyWords();
  if (ch !== 'all') words = words.filter(w=>chapOf(w)===ch);
  if (q) words = words.filter(w => w.word.toLowerCase().includes(q) || trOf(w).toLowerCase().includes(q));

  document.getElementById('lib-rows').innerHTML = words.map(w => {
    const r = srsOf(w.id);
    return `<tr>
      <td style="font-family:var(--serif);font-style:italic">${h(w.word)}</td>
      <td>${h(trOf(w))}</td>
      <td>${h(w.notes||'Kap. '+chapOf(w))}</td>
      <td>${r.box}</td>
      <td><div style="display:flex;gap:4px;flex-wrap:wrap">${masteryHTML(w.id)}</div></td>
      <td><button onclick="deleteWord('${w.id}')"
            style="background:none;border:none;color:var(--err);cursor:pointer;font-family:var(--mono);font-size:11px">del</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" style="color:var(--muted)">No words match.</td></tr>';
}

function renderLibraryChapters() {
  const sel  = document.getElementById('lib-chapter'); if (!sel) return;
  const rw   = readyWords();
  const chs  = [...new Set(rw.map(chapOf))].filter(c=>c!=='?').sort((a,b)=>+a-+b);
  sel.innerHTML = `<option value="all">All chapters</option>` +
    chs.map(c=>`<option value="${c}">Kapitel ${c}</option>`).join('');
}

function addManualWord() {
  const word = document.getElementById('ed-word').value.trim();
  const tr_  = document.getElementById('ed-tr').value.trim();
  if (!word||!tr_) { alert('German word and translation are required.'); return; }
  DB.words.push({
    id: uid(), word, notes: document.getElementById('ed-notes').value.trim(),
    chapter_id: document.getElementById('ed-notes').value.trim(),
    status: 'done',
    data: {
      translations: Object.fromEntries(LANGS.map(l => [l, l === 'German' ? word : (l === USER.lang || l === 'English' ? tr_ : '')])),
      explanation: Object.fromEntries(LANGS.map(l => [l, l === 'German' ? `Manuell hinzugefügtes Lernwort: ${word}.` : (l === USER.lang || l === 'English' ? document.getElementById('ed-grammar').value.trim() : '')])),
      grammar_clarification: Object.fromEntries(LANGS.map(l => [l, l === USER.lang || l === 'English' ? document.getElementById('ed-grammar').value.trim() : ''])),
      example_de: document.getElementById('ed-example').value.trim(),
      example_translated: Object.fromEntries(LANGS.map(l => [l, l === 'German' ? document.getElementById('ed-example').value.trim() : ''])),
      grammar: {},
    }
  });
  ['ed-word','ed-notes','ed-tr','ed-grammar','ed-example'].forEach(id => document.getElementById(id).value='');
  save(); renderLibrary(); buildMenu();
}

function deleteWord(id) {
  if (!confirm('Delete this word from this browser only? If it still exists in data/kapitelN.json, it will return after a file reload.')) return;
  DB.words = DB.words.filter(w=>w.id!==id);
  delete SRS[id]; save(); renderLibrary(); buildMenu();
}

// ════════════════════════════════════════════════════════
//  SPEECH
// ════════════════════════════════════════════════════════
function speakWord(word) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(baseOf(word));
  u.lang = 'de-DE'; u.rate = 0.85; u.pitch = 1;
  speechSynthesis.speak(u);
}
function speakCurrent() { if (Q.cur) speakWord(Q.cur.word); }

// ════════════════════════════════════════════════════════
//  SCREEN & MODAL ROUTING
// ════════════════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
}
function showTab(name) {
  if (name==='tracker') { showScreen('tracker-screen'); renderTracker(); }
  if (name==='library') { showScreen('library-screen'); renderLibrary(); renderLibraryChapters(); }
}
function openModal(id)  { document.getElementById(id).classList.add('on'); }
function closeModal(id) { document.getElementById(id).classList.remove('on'); }

// ════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ════════════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (document.querySelector('.modal-bg.on')) {
    if (e.key === 'Escape') document.querySelectorAll('.modal-bg.on').forEach(m=>m.classList.remove('on'));
    return;
  }
  if (!Q.cur) return;

  if (e.key === '?') { openModal('keys-modal'); return; }

  if (Q.phase === 'art') {
    const m = {'1':'der','2':'die','3':'das','4':'—'};
    if (m[e.key]) answerArt(m[e.key]);
  }
  if (Q.phase === 'mean') {
    const m = {a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3};
    const i = m[e.key.toLowerCase()];
    if (i !== undefined) { e.preventDefault(); answerMean(i); }
  }
  if (Q.phase === 'plural'  && e.key==='Enter') { e.preventDefault(); answerPlural(); }
  if (Q.phase === 'pattern' && e.key==='Enter') { e.preventDefault(); answerPattern(); }
  if (Q.phase === 'active'  && e.key==='Enter') { e.preventDefault(); answerActive(); }
  if (Q.phase === 'done') {
    if (e.key==='Enter'||e.key===' ') { e.preventDefault(); Q.idx++; nextWord(); }
    if (e.key.toLowerCase()==='e')    { Q.showExpl=!Q.showExpl; render(); }
  }
  if (e.key.toLowerCase()==='s') speakCurrent();
  if (e.key==='Tab') { e.preventDefault(); skipWord(); }
});

// Menu pill listener
document.getElementById('size-pills').addEventListener('click', e => {
  const p = e.target.closest('.pill'); if (!p) return;
  document.querySelectorAll('#size-pills .pill').forEach(x=>x.classList.remove('on'));
  p.classList.add('on'); USER.size = p.dataset.n; save();
});

// Settings sync
['sel-lang','sel-chapter','sel-mode'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', e => {
    USER[{lang:'lang',chapter:'chapter',mode:'mode'}[id.split('-')[1]]] = e.target.value; save();
  });
});

// ════════════════════════════════════════════════════════
//  CHAPTER FILE LOADER
//  Reads  data/kapitel1.json … data/kapitel20.json
//  Each file: { meta:{}, words:[{id, word, notes, status, data}] }
//  Only re-imports if the word ID is not yet in DB (safe to call repeatedly).
// ════════════════════════════════════════════════════════

async function loadChapterFiles(manual = false, replace = false) {
  const btn = document.getElementById('reload-btn');
  const status = document.getElementById('load-status');
  if (btn) btn.disabled = true;
  if (status) status.textContent = replace ? 'Replacing library from chapter files…' : 'Loading chapter files…';

  let loaded = 0;
  let found = 0;
  const failed = [];
  const collected = [];

  for (let i = 1; i <= 20; i++) {
    const url = `./data/kapitel${i}.json`;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const chapMeta = { id: `kapitel${i}`, title: `Kapitel ${i}` };
      const words = (json.words || [])
        .map(w => normalizeEntry(w, chapMeta))
        .filter(w => w.word);

      if (words.length) {
        collected.push(...words);
        loaded += words.length;
        found++;
      }
    } catch (err) {
      failed.push(`kapitel${i}.json`);
      console.warn(`Could not load ${url}`, err);
    }
  }

  if (replace) DB.words = collected;
  else DB.words = mergeWords(DB.words, collected);

  save();
  buildMenu();
  renderLibraryChapters();

  if (btn) btn.disabled = false;
  if (status) {
    if (found > 0) {
      const failText = failed.length ? ` Failed: ${failed.join(', ')}.` : '';
      status.textContent = `✓ ${replace ? 'Replaced library with' : 'Loaded'} ${loaded} words from ${found} chapter file${found>1?'s':''}.${failText}`;
      setTimeout(() => { if (status) status.textContent = ''; }, failed.length ? 9000 : 4500);
    } else if (manual) {
      status.textContent = failed.length
        ? `No chapter files loaded. Failed: ${failed.join(', ')}. Check JSON syntax.`
        : 'No chapter files found in data/. Check the folder on GitHub.';
    } else {
      status.textContent = failed.length ? `Some chapter files failed: ${failed.join(', ')}.` : '';
    }
  }
}

async function replaceFromChapterFiles() {
  if (!confirm('Replace the browser library with the JSON files in data/? SRS progress is kept, but locally imported/deleted words may change.')) return;
  await loadChapterFiles(true, true);
}

// ════════════════════════════════════════════════════════
//  BOOT
//  1. Render menu with whatever is in localStorage
//  2. Auto-load chapter files if DB is empty (first visit)
//     or always refresh from files in background
// ════════════════════════════════════════════════════════
buildMenu();
showScreen('menu-screen');

// Always reload from data/ on boot — files on GitHub are the source of truth.
// mergeWords() is safe: existing SRS progress is never touched,
// words already in DB by ID are simply overwritten with the latest version.
loadChapterFiles(false);

// ─── UX patch: learner-safe Advanced panel and Grammar Hub ───
function toggleAdvanced() {
  const el = document.getElementById('import-card');
  if (!el) return;
  el.classList.toggle('on');
}

function openGrammarHub() {
  renderCurrentWordLinks();
  openModal('grammar-modal');
}

function renderCurrentWordLinks() {
  const box = document.getElementById('current-word-links');
  if (!box) return;

  const word = (typeof Q !== 'undefined' && Q && Q.cur) ? baseOf(Q.cur.word) : '';
  if (!word) {
    box.innerHTML = '<span class="tiny">Start a quiz or open a word first to see word-specific links.</span>';
    return;
  }

  const q = encodeURIComponent(word);
  box.innerHTML = `
    <a class="dlink" target="_blank" href="https://www.duden.de/suchen/dudenonline/${q}">Duden: ${h(word)}</a>
    <a class="dlink" target="_blank" href="https://www.dwds.de/wb/${q}">DWDS</a>
    <a class="dlink" target="_blank" href="https://www.verbformen.de/?w=${q}">Verbformen</a>
    <a class="dlink" target="_blank" href="https://dict.leo.org/german-english/${q}">LEO</a>
    <a class="dlink" target="_blank" href="https://www.linguee.de/deutsch-englisch/search?query=${q}">Linguee</a>
    <a class="dlink" target="_blank" href="https://de.wiktionary.org/wiki/${q}">Wiktionary</a>
  `;
}

async function replaceFromChapterFiles() {
  if (!confirm('Replace the local vocabulary library with files from data/kapitel*.json? Progress/SRS will stay, but local manual words may disappear.')) return;
  DB.words = [];
  save();
  await loadChapterFiles(true);
}

if (typeof openModal !== 'function') {
  window.openModal = function(id){ const el=document.getElementById(id); if(el) el.classList.add('on'); };
}
if (typeof closeModal !== 'function') {
  window.closeModal = function(id){ const el=document.getElementById(id); if(el) el.classList.remove('on'); };
}


applyTheme(getStoredTheme());
applyI18n();
