export interface LocaleStrings {
  lang: string;
  title: string;
  heading: string;
  serifTest: string;
  notWorking: string;
  fontRequests: string;
  fontCount: string;
  viewAllFonts: string;
  installFromStore: string;
  features: string[];
}

export interface IndexStrings {
  lang: string;
  title: string;
  heading: string;
  description: string;
  detail: string;
  comfort: string;
  looking: string;
  fontRequests: string;
  fontCount: string;
  supportedLanguages: string;
  viewAllFonts: string;
  installFromStore: string;
  features: string[];
  heroTagline: string;
}

export interface FontsPageStrings {
  lang: string;
  title: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  totalFonts: string;
  backToHome: string;
}

export const fontsPageStrings: Record<string, FontsPageStrings> = {
  en: {
    lang: "en",
    title: "Font Manager - All Fonts",
    heading: "All Fonts",
    description: "Browse all fonts available in Font Manager.",
    searchPlaceholder: "Search fonts...",
    totalFonts: "Total Fonts:",
    backToHome: "← Back",
  },
  ja: {
    lang: "ja",
    title: "フォントマネージャー - 全フォント一覧",
    heading: "全フォント一覧",
    description: "Font Manager で使用できるすべてのフォントを閲覧できます。",
    searchPlaceholder: "フォントを検索...",
    totalFonts: "フォント数:",
    backToHome: "← 戻る",
  },
  ca: {
    lang: "ca",
    title: "Gestor de Tipografies - Totes les Tipografies",
    heading: "Totes les Tipografies",
    description:
      "Exploreu totes les tipografies disponibles al Gestor de Tipografies.",
    searchPlaceholder: "Cercar tipografies...",
    totalFonts: "Total de tipografies:",
    backToHome: "← Tornar",
  },
  de: {
    lang: "de",
    title: "Schriftarten-Manager - Alle Schriftarten",
    heading: "Alle Schriftarten",
    description:
      "Alle verfügbaren Schriftarten im Schriftarten-Manager durchsuchen.",
    searchPlaceholder: "Schriftarten suchen...",
    totalFonts: "Gesamte Schriftarten:",
    backToHome: "← Zurück",
  },
  es: {
    lang: "es",
    title: "Gestor de Fuentes - Todas las Fuentes",
    heading: "Todas las Fuentes",
    description:
      "Explora todas las fuentes disponibles en el Gestor de Fuentes.",
    searchPlaceholder: "Buscar fuentes...",
    totalFonts: "Total de fuentes:",
    backToHome: "← Volver",
  },
  fr: {
    lang: "fr",
    title: "Gestionnaire de polices - Toutes les polices",
    heading: "Toutes les polices",
    description:
      "Parcourez toutes les polices disponibles dans le Gestionnaire de polices.",
    searchPlaceholder: "Rechercher des polices...",
    totalFonts: "Total des polices :",
    backToHome: "← Retour",
  },
  it: {
    lang: "it",
    title: "Gestore dei caratteri - Tutti i caratteri",
    heading: "Tutti i caratteri",
    description:
      "Esplora tutti i caratteri disponibili nel Gestore dei caratteri.",
    searchPlaceholder: "Cerca caratteri...",
    totalFonts: "Totale caratteri:",
    backToHome: "← Indietro",
  },
  ko: {
    lang: "ko",
    title: "폰트 관리자 - 전체 글꼴",
    heading: "전체 글꼴",
    description: "폰트 관리자에서 사용 가능한 모든 글꼴을 찾아보세요.",
    searchPlaceholder: "글꼴 검색...",
    totalFonts: "전체 글꼴 수:",
    backToHome: "← 돌아가기",
  },
  pt_BR: {
    lang: "pt-BR",
    title: "Gerenciador de Fontes - Todas as Fontes",
    heading: "Todas as Fontes",
    description:
      "Navegue por todas as fontes disponíveis no Gerenciador de Fontes.",
    searchPlaceholder: "Pesquisar fontes...",
    totalFonts: "Total de fontes:",
    backToHome: "← Voltar",
  },
  pt_PT: {
    lang: "pt-PT",
    title: "Gestor de Fontes - Todas as Fontes",
    heading: "Todas as Fontes",
    description: "Navegue por todas as fontes disponíveis no Gestor de Fontes.",
    searchPlaceholder: "Pesquisar fontes...",
    totalFonts: "Total de fontes:",
    backToHome: "← Voltar",
  },
  ru: {
    lang: "ru",
    title: "Менеджер шрифтов - Все шрифты",
    heading: "Все шрифты",
    description: "Просмотрите все шрифты, доступные в Менеджере шрифтов.",
    searchPlaceholder: "Поиск шрифтов...",
    totalFonts: "Всего шрифтов:",
    backToHome: "← Назад",
  },
  zh_CN: {
    lang: "zh-CN",
    title: "字体管理器 - 所有字体",
    heading: "所有字体",
    description: "浏览字体管理器中可用的所有字体。",
    searchPlaceholder: "搜索字体...",
    totalFonts: "字体总数：",
    backToHome: "← 返回",
  },
  zh_TW: {
    lang: "zh-TW",
    title: "字體管理器 - 所有字體",
    heading: "所有字體",
    description: "瀏覽字體管理器中可用的所有字體。",
    searchPlaceholder: "搜尋字體...",
    totalFonts: "字體總數：",
    backToHome: "← 返回",
  },
};

export const indexStrings: IndexStrings = {
  lang: "en",
  title: "Font Manager",
  heading: "Font Manager",
  description: "Change the font for all pages.",
  detail:
    "By selecting and enabling the font included in the extension, you can use that font on all pages.",
  comfort:
    "Using familiar fonts will make surfing the internet even more comfortable.",
  looking:
    "We are currently looking for fonts to be used in the extension. Suggestions are accepted on GitHub.",
  fontRequests:
    'Any other font requests? Let us know on <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
  fontCount: "Current number of registered fonts:",
  supportedLanguages: "Supported Languages",
  viewAllFonts: "View All Fonts →",
  installFromStore: "Install from Chrome Web Store",
  heroTagline: "Transform your browsing experience with beautiful fonts",
  features: [
    "Built-in fonts",
    "Custom fonts",
    "Auto updates",
  ],
};

export const locales: Record<string, LocaleStrings> = {
  en: {
    lang: "en",
    title: "Font Manager",
    heading: "Thank you for installing!",
    serifTest:
      "The original font for this page is 'serif'. If it is displayed in a different font, the extension is working fine!",
    notWorking: "If it's not working, check 'Enable Extension'.",
    fontRequests:
      'Any other font requests? Let us know on <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Current number of registered fonts:",
    viewAllFonts: "View All Fonts →",
    installFromStore: "Install from Chrome Web Store",
    features: [
      "Built-in fonts",
      "Custom fonts",
      "Auto updates",
    ],
  },
  ja: {
    lang: "ja",
    title: "フォントマネージャー",
    heading:
      "インストールしていただきありがとうございます！",
    serifTest:
      "このページの元のフォントは 'serif' です。異なるフォントで表示されていれば、拡張機能は正常に動作しています！",
    notWorking:
      "動作していない場合は、「拡張機能を有効化」をチェックしてください。",
    fontRequests:
      '他に追加してほしいフォントはありますか？ <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a> でリクエストを受け付けています！',
    fontCount: "現在登録されているフォント数:",
    viewAllFonts: "全フォント一覧を見る →",
    installFromStore: "Chrome ウェブストアからインストール",
    features: [
      "内蔵フォント",
      "カスタムフォント",
      "自動アップデート",
    ],
  },
  ca: {
    lang: "ca",
    title: "Gestor de Tipografies",
    heading: "Gràcies per instal·lar-lo!",
    serifTest:
      "La tipografia original d'aquesta pàgina és 'serif'. Si es mostra d'una manera diferent, vol dir que l'extensió funciona correctament!",
    notWorking: "Si no funciona, comproveu si l'extensió està activada.",
    fontRequests:
      'Voleu afegir altres tipografies? Feu una sol·licitud a <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Nombre actual de tipografies registrades:",
    viewAllFonts: "Veure totes les tipografies →",
    installFromStore: "Instal·la des de Chrome Web Store",
    features: [
      "Tipografies integrades",
      "Tipografies personalitzades",
      "Actualitzacions automàtiques",
    ],
  },
  de: {
    lang: "de",
    title: "Schriftarten-Manager",
    heading: "Vielen Dank für die Installation!",
    serifTest:
      "Die ursprüngliche Schriftart dieser Seite ist 'serif'. Wenn sie anders angezeigt wird, funktioniert die Erweiterung einwandfrei!",
    notWorking:
      "Falls sie nicht funktioniert, überprüfen Sie bitte, ob die Erweiterung aktiviert ist.",
    fontRequests:
      'Möchten Sie weitere Schriftarten hinzufügen? Erstellen Sie eine Anfrage auf <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Aktuelle Anzahl registrierter Schriftarten:",
    viewAllFonts: "Alle Schriftarten anzeigen →",
    installFromStore: "Im Chrome Web Store installieren",
    features: [
      "Integrierte Schriftarten",
      "Eigene Schriftarten",
      "Automatische Updates",
    ],
  },
  es: {
    lang: "es",
    title: "Gestor de Fuentes",
    heading: "¡Gracias por instalar!",
    serifTest:
      "La fuente original de esta página es 'serif'. Si se muestra de manera diferente, ¡la extensión está funcionando correctamente!",
    notWorking: "Si no funciona, verifica que la extensión esté activada.",
    fontRequests:
      '¿Quieres agregar otras fuentes? Haz una solicitud en <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Número actual de fuentes registradas:",
    viewAllFonts: "Ver todas las fuentes →",
    installFromStore: "Instalar desde Chrome Web Store",
    features: [
      "Fuentes integradas",
      "Fuentes personalizadas",
      "Actualizaciones automáticas",
    ],
  },
  fr: {
    lang: "fr",
    title: "Gestionnaire de polices",
    heading: "Merci pour l’installation !",
    serifTest:
      "La police d'origine de cette page est 'serif'. Si elle s'affiche différemment, cela signifie que l'extension fonctionne correctement !",
    notWorking:
      "Si cela ne fonctionne pas, vérifiez que l'extension est activée.",
    fontRequests:
      'Vous souhaitez ajouter d\'autres polices ? Faites une demande sur <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a> !',
    fontCount: "Nombre actuel de polices enregistrées :",
    viewAllFonts: "Voir toutes les polices →",
    installFromStore: "Installer depuis le Chrome Web Store",
    features: [
      "Polices intégrées",
      "Polices personnalisées",
      "Mises à jour automatiques",
    ],
  },
  it: {
    lang: "it",
    title: "Gestore dei caratteri",
    heading: "Grazie per l'installazione!",
    serifTest:
      "Il carattere originale di questa pagina è 'serif'. Se viene visualizzato in modo diverso, significa che l'estensione funziona correttamente!",
    notWorking: "Se non funziona, verifica che l'estensione sia attivata.",
    fontRequests:
      'Vuoi aggiungere altri caratteri? Fai una richiesta su <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Numero attuale di caratteri registrati:",
    viewAllFonts: "Vedi tutti i caratteri →",
    installFromStore: "Installa dal Chrome Web Store",
    features: [
      "Caratteri integrati",
      "Caratteri personalizzati",
      "Aggiornamenti automatici",
    ],
  },
  ko: {
    lang: "ko",
    title: "폰트 관리자",
    heading: "설치해 주셔서 감사합니다!",
    serifTest:
      "이 페이지의 기본 글꼴은 'serif'입니다. 다른 글꼴로 표시되면 확장 프로그램이 정상적으로 작동하는 것입니다!",
    notWorking: "작동하지 않는 경우 '확장 프로그램 활성화'를 확인하세요.",
    fontRequests:
      '추가하고 싶은 글꼴이 있나요? <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>에서 요청하세요!',
    fontCount: "현재 등록된 글꼴 수:",
    viewAllFonts: "전체 글꼴 보기 →",
    installFromStore: "Chrome 웹 스토어에서 설치",
    features: [
      "기본 글꼴",
      "맞춤 글꼴",
      "자동 업데이트",
    ],
  },
  pt_BR: {
    lang: "pt-BR",
    title: "Gerenciador de Fontes",
    heading: "Obrigado por instalar!",
    serifTest:
      "A fonte original desta página é 'serif'. Se estiver sendo exibida de forma diferente, significa que a extensão está funcionando corretamente!",
    notWorking:
      "Se não estiver funcionando, verifique se a extensão está ativada.",
    fontRequests:
      'Quer adicionar outras fontes? Faça uma solicitação no <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Número atual de fontes registradas:",
    viewAllFonts: "Ver todas as fontes →",
    installFromStore: "Instalar da Chrome Web Store",
    features: [
      "Fontes integradas",
      "Fontes personalizadas",
      "Atualizações automáticas",
    ],
  },
  pt_PT: {
    lang: "pt-PT",
    title: "Gestor de Fontes",
    heading: "Obrigado por instalar!",
    serifTest:
      "A fonte original desta página é 'serif'. Se for exibida de forma diferente, significa que a extensão está a funcionar corretamente!",
    notWorking:
      "Se não estiver a funcionar, verifique se a extensão está ativada.",
    fontRequests:
      'Quer adicionar outras fontes? Faça um pedido no <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Número atual de fontes registadas:",
    viewAllFonts: "Ver todas as fontes →",
    installFromStore: "Instalar da Chrome Web Store",
    features: [
      "Fontes integradas",
      "Fontes personalizadas",
      "Atualizações automáticas",
    ],
  },
  ru: {
    lang: "ru",
    title: "Менеджер шрифтов",
    heading: "Спасибо за установку!",
    serifTest:
      "Оригинальный шрифт на этой странице — 'serif'. Если он отображается по-другому, значит расширение работает правильно!",
    notWorking: "Если не работает, проверьте, включено ли расширение.",
    fontRequests:
      'Хотите добавить другие шрифты? Оставьте запрос на <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a>!',
    fontCount: "Текущее количество зарегистрированных шрифтов:",
    viewAllFonts: "Все шрифты →",
    installFromStore: "Установить из Chrome Web Store",
    features: [
      "Встроенные шрифты",
      "Свои шрифты",
      "Автоматические обновления",
    ],
  },
  zh_CN: {
    lang: "zh-CN",
    title: "字体管理器",
    heading: "感谢您的安装！",
    serifTest:
      "此页面的原始字体为 'serif'。如果显示为不同的字体，说明扩展程序运行正常！",
    notWorking: '如果未生效，请检查"启用扩展程序"。',
    fontRequests:
      '有其他字体需求吗？请在 <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a> 进行反馈！',
    fontCount: "当前已注册的字体数量：",
    viewAllFonts: "查看所有字体 →",
    installFromStore: "从 Chrome 网上应用店安装",
    features: ["内置字体", "自定义字体", "自动更新"],
  },
  zh_TW: {
    lang: "zh-TW",
    title: "字體管理器",
    heading: "感謝您的安裝！",
    serifTest:
      "此頁面的原始字體為 'serif'。如果顯示為不同的字體，表示擴充功能運行正常！",
    notWorking: "如果無法生效，請檢查「啟用擴充功能」。",
    fontRequests:
      '有其他字體需求嗎？請在 <a href="https://github.com/otoneko1102/font-manager/issues" target="_blank">GitHub</a> 進行回饋！',
    fontCount: "目前已註冊的字體數量：",
    viewAllFonts: "查看所有字體 →",
    installFromStore: "從 Chrome 線上應用程式商店安裝",
    features: ["內建字體", "自訂字體", "自動更新"],
  },
};

export const languageLinks = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ca", label: "Català" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "ko", label: "한국어" },
  { code: "pt_BR", label: "Português (BR)" },
  { code: "pt_PT", label: "Português (PT)" },
  { code: "ru", label: "Русский" },
  { code: "zh_CN", label: "简体中文" },
  { code: "zh_TW", label: "繁體中文" },
];
