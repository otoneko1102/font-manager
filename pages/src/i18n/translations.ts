export interface LocaleStrings {
  lang: string;
  title: string;
  heading: string;
  serifTest: string;
  notWorking: string;
  fontRequests: string;
  fontCount: string;
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
}

export const indexStrings: IndexStrings = {
  lang: "en",
  title: "Font Manager",
  heading: "Font Manager",
  description: "Change the font for all pages.",
  detail: "By selecting and enabling the font included in the extension, you can use that font on all pages.",
  comfort: "Using familiar fonts will make surfing the internet even more comfortable.",
  looking: "We are currently looking for fonts to be used in the extension. Suggestions are accepted on Github or Discord. If you don't have a font you like, please contact us! We'll respond!",
  fontRequests: "Any other font requests? Support on <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> or <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
  fontCount: "Current number of registered fonts:",
  supportedLanguages: "Supported Languages",
};

export const locales: Record<string, LocaleStrings> = {
  en: {
    lang: "en",
    title: "Font Manager",
    heading: "Thank you for installing Font Manager!",
    serifTest: "The original font for this page is 'serif'. If it is displayed in a different font, the extension is working fine!",
    notWorking: "If it's not working, check 'Enable Extension'.",
    fontRequests: "Any other font requests? Support on <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> or <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Current number of registered fonts:",
  },
  ja: {
    lang: "ja",
    title: "フォントマネージャー",
    heading: "フォントマネージャーをインストールしていただきありがとうございます！",
    serifTest: "このページの元のフォントは 'serif' です。異なるフォントで表示されていれば、拡張機能は正常に動作しています！",
    notWorking: "動作していない場合は、「拡張機能を有効化」をチェックしてください。",
    fontRequests: "他に追加してほしいフォントはありますか？ <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> または <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a> でサポートを受け付けています！",
    fontCount: "現在登録されているフォント数:",
  },
  ca: {
    lang: "ca",
    title: "Gestor de Tipografies",
    heading: "Gràcies per instal·lar el Gestor de Tipografies!",
    serifTest: "La tipografia original d'aquesta pàgina és 'serif'. Si es mostra d'una manera diferent, vol dir que l'extensió funciona correctament!",
    notWorking: "Si no funciona, comproveu si l'extensió està activada.",
    fontRequests: "Voleu afegir altres tipografies? Feu una sol·licitud a <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> o a <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Nombre actual de tipografies registrades:",
  },
  de: {
    lang: "de",
    title: "Schriftarten-Manager",
    heading: "Vielen Dank für die Installation des Schriftarten-Manager!",
    serifTest: "Die ursprüngliche Schriftart dieser Seite ist 'serif'. Wenn sie anders angezeigt wird, funktioniert die Erweiterung einwandfrei!",
    notWorking: "Falls sie nicht funktioniert, überprüfen Sie bitte, ob die Erweiterung aktiviert ist.",
    fontRequests: "Möchten Sie weitere Schriftarten hinzufügen? Erstellen Sie eine Anfrage auf <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> oder treten Sie unserem <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a> bei!",
    fontCount: "Aktuelle Anzahl registrierter Schriftarten:",
  },
  es: {
    lang: "es",
    title: "Gestor de Fuentes",
    heading: "¡Gracias por instalar el Gestor de Fuentes!",
    serifTest: "La fuente original de esta página es 'serif'. Si se muestra de manera diferente, ¡la extensión está funcionando correctamente!",
    notWorking: "Si no funciona, verifica que la extensión esté activada.",
    fontRequests: "¿Quieres agregar otras fuentes? Haz una solicitud en <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> o únete a nuestro <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Número actual de fuentes registradas:",
  },
  fr: {
    lang: "fr",
    title: "Gestionnaire de polices",
    heading: "Merci d'avoir installé le Gestionnaire de polices !",
    serifTest: "La police d'origine de cette page est 'serif'. Si elle s'affiche différemment, cela signifie que l'extension fonctionne correctement !",
    notWorking: "Si cela ne fonctionne pas, vérifiez que l'extension est activée.",
    fontRequests: "Vous souhaitez ajouter d'autres polices ? Faites une demande sur <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> ou rejoignez notre <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a> !",
    fontCount: "Nombre actuel de polices enregistrées :",
  },
  it: {
    lang: "it",
    title: "Gestore dei caratteri",
    heading: "Grazie per aver installato il Gestore dei caratteri!",
    serifTest: "Il carattere originale di questa pagina è 'serif'. Se viene visualizzato in modo diverso, significa che l'estensione funziona correttamente!",
    notWorking: "Se non funziona, verifica che l'estensione sia attivata.",
    fontRequests: "Vuoi aggiungere altri caratteri? Fai una richiesta su <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> oppure unisciti al nostro <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Numero attuale di caratteri registrati:",
  },
  ko: {
    lang: "ko",
    title: "폰트 관리자",
    heading: "폰트 관리자를 설치해 주셔서 감사합니다!",
    serifTest: "이 페이지의 기본 글꼴은 'serif'입니다. 다른 글꼴로 표시되면 확장 프로그램이 정상적으로 작동하는 것입니다!",
    notWorking: "작동하지 않는 경우 '확장 프로그램 활성화'를 확인하세요.",
    fontRequests: "추가하고 싶은 글꼴이 있나요? <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> 또는 <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>에서 지원을 요청하세요!",
    fontCount: "현재 등록된 글꼴 수:",
  },
  pt_BR: {
    lang: "pt-BR",
    title: "Gerenciador de Fontes",
    heading: "Obrigado por instalar o Gerenciador de Fontes!",
    serifTest: "A fonte original desta página é 'serif'. Se estiver sendo exibida de forma diferente, significa que a extensão está funcionando corretamente!",
    notWorking: "Se não estiver funcionando, verifique se a extensão está ativada.",
    fontRequests: "Quer adicionar outras fontes? Faça uma solicitação no <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> ou entre no nosso <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Número atual de fontes registradas:",
  },
  pt_PT: {
    lang: "pt-PT",
    title: "Gestor de Fontes",
    heading: "Obrigado por instalar o Gestor de Fontes!",
    serifTest: "A fonte original desta página é 'serif'. Se for exibida de forma diferente, significa que a extensão está a funcionar corretamente!",
    notWorking: "Se não estiver a funcionar, verifique se a extensão está ativada.",
    fontRequests: "Quer adicionar outras fontes? Faça um pedido no <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> ou junte-se ao nosso <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Número atual de fontes registadas:",
  },
  ru: {
    lang: "ru",
    title: "Менеджер шрифтов",
    heading: "Спасибо за установку Менеджера шрифтов!",
    serifTest: "Оригинальный шрифт на этой странице — 'serif'. Если он отображается по-другому, значит расширение работает правильно!",
    notWorking: "Если не работает, проверьте, включено ли расширение.",
    fontRequests: "Хотите добавить другие шрифты? Оставьте запрос на <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> или <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a>!",
    fontCount: "Текущее количество зарегистрированных шрифтов:",
  },
  zh_CN: {
    lang: "zh-CN",
    title: "字体管理器",
    heading: "感谢您安装字体管理器！",
    serifTest: "此页面的原始字体为 'serif'。如果显示为不同的字体，说明扩展程序运行正常！",
    notWorking: "如果未生效，请检查\"启用扩展程序\"。",
    fontRequests: "有其他字体需求吗？请在 <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> 或 <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a> 进行反馈！",
    fontCount: "当前已注册的字体数量：",
  },
  zh_TW: {
    lang: "zh-TW",
    title: "字體管理器",
    heading: "感謝您安裝字體管理器！",
    serifTest: "此頁面的原始字體為 'serif'。如果顯示為不同的字體，表示擴充功能運行正常！",
    notWorking: "如果無法生效，請檢查「啟用擴充功能」。",
    fontRequests: "有其他字體需求嗎？請在 <a href=\"https://github.com/otoneko1102/font-manager/issues\" target=\"_blank\">GitHub</a> 或 <a href=\"https://discord.gg/yKW8wWKCnS\" target=\"_blank\">Discord</a> 進行回饋！",
    fontCount: "目前已註冊的字體數量：",
  },
};

export const languageLinks = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
  { code: "ca", label: "CA" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "ko", label: "KO" },
  { code: "pt_BR", label: "PT_BR" },
  { code: "pt_PT", label: "PT_PT" },
  { code: "ru", label: "RU" },
  { code: "zh_CN", label: "ZH_CN" },
  { code: "zh_TW", label: "ZH_TW" },
];
