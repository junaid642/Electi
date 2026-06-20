import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "ar";

const en: Record<string, string> = {
  /* ── Splash ── */
  welcomeSeq1:   "Welcome",
  welcomeFuture: "Welcome to the Future",
  welcomeElecti: "Welcome to Electi",

  /* ── Navbar ── */
  menu:    "Menu",
  close:   "Close",
  home:    "Home",
  agents:  "Agents",
  industries: "Industries",
  enterprise: "Enterprise",
  about:   "About",
  careers: "Careers",
  blog:    "Blog",
  contact: "Contact",
  signin:  "Sign In",
  startFree: "Start Free",

  navSectionNav:        "Navigation",
  navSectionAgents:     "AI Agents",
  navSectionIndustries: "Industries",
  navReadyToStart:      "Ready to start?",
  navDeployFirst:       "Deploy your first AI agent in under 2 minutes.",

  navSubHome:       "The future of AI",
  navSubAgents:     "4 specialised AI agents",
  navSubIndustries: "Every sector covered",
  navSubEnterprise: "Enterprise-grade AI",
  navSubAbout:      "Our mission & team",
  navSubCareers:    "Join the AI revolution",
  navSubBlog:       "Insights & updates",
  navSubContact:    "Let's talk",

  /* ── Agent quick-links ── */
  agentPersonal: "Personal Agent",
  agentBilling:  "Billing Agent",
  agentLegal:    "Legal Agent",
  agentSales:    "Sales & Reservations",

  /* ── Industry quick-links ── */
  indHealthcare:   "Healthcare",
  indHospitality:  "Hospitality",
  indConstruction: "Construction",
  indRetail:       "Retail",
  indCorporate:    "Corporate",
  indRealEstate:   "Real Estate",

  /* ── Hero ── */
  heroBadge:        "Powered by Advanced AI · Saudi Arabia",
  heroH1a:          "Your AI Workforce.",
  heroH1b:          "Connected",
  heroH1c:          "to Your Life.",
  heroSub:          "Four intelligent AI agents that handle personal scheduling, billing, legal guidance, and sales — 24/7, via WhatsApp.",
  heroStartFree:    "Start Free",
  heroExploreAgents:"Explore Agents",

  /* ── Hero (cinematic redesign) ── */
  heroNewLine1: "WE HELP YOUR BUSINESS",
  heroNewLine2: "GROW WITH AI",
  heroNewSub:   "YOUR VISION × AI = LIMITLESS POSSIBILITIES",
  heroCta1:     "Explore Electi",
  heroCta2:     "Start Your AI Journey",

  /* ── Phone Showcase ── */
  phoneShowcaseBadge: "WhatsApp-First AI",
  phoneShowcaseTitle: "Your AI Workforce\nLives in Your Phone",
  phoneShowcaseSub:   "From personal tasks to enterprise operations — Electi works where you already work. No new apps. Just WhatsApp.",
  scrollToExplore:    "Scroll to explore",

  /* ── Homepage sections ── */
  howMagicWorks:     "How the Magic Works",
  speakThinkAct:     "Speak. Think. Act.",
  speakThinkActSub:  "The most powerful AI workforce, disguised as a simple conversation.",
  stepSpeak:         "Speak. It Listens.",
  stepThink:         "It Thinks. Deeply.",
  stepAct:           "It Acts. Instantly.",
  stepSpeakBody:     "Tell the AI what you need in plain language via WhatsApp. It understands context, intent, and nuance — in Arabic and English.",
  stepThinkBody:     "Your agents analyse patterns, cross-reference data sources, and build intelligent action plans — all in milliseconds.",
  stepActBody:       "Calendar blocked. Invoice processed. Contract reviewed. Lead followed up. Done before you put your phone down.",

  enterpriseTrustBadge: "Enterprise Trust",
  builtForSerious:      "Built for the Serious",
  builtForSeriousSub:   "Enterprise-grade security, compliance, and infrastructure — trusted by Saudi Arabia's most demanding organisations.",
  integratesWithStack:  "Integrates with your existing stack",

  meetTeam:    "Meet Your AI Team",
  meetTeamSub: "Four specialised agents, one unified platform. Each trained for a specific domain.",

  intelligentAgentsBadge: "Intelligent Agents",

  processBadge:  "Process",
  upRunning:     "Get Started in Minutes",
  upRunningSub:  "Five steps to deploy your AI workforce and start saving hours every day.",

  industriesBadge:  "Industries",
  builtEvery:       "Built for Every Sector",
  weBuildAIFor:     "We Build AI for",

  testimonialsBadge: "Testimonials",
  trustedBy:         "Trusted by Leaders",

  startTodayBadge:   "Start Today",
  buildWorkforce:    "Build Your AI Workforce Today",
  buildWorkforceSub: "Start with one agent or the full team. No setup fees. No credit card required.",
  talkToSales:       "Talk to Sales",

  trustNoCC:      "No credit card",
  trustDeploy:    "Deploy in 2 minutes",
  trustCancel:    "Cancel anytime",
  trustBilingual: "Arabic + English",

  startFreeForever: "Start Free — Free Forever",

  /* ── Enterprise section ── */
  enterpriseTitle: "Enterprise-Grade Infrastructure",
  enterpriseSub:   "Built for scale, security, and compliance — trusted by enterprises across Saudi Arabia.",

  /* ── CTA buttons shared ── */
  deployNow:        "Deploy Now",
  bookDemo:         "Book Demo",
  getStartedFree:   "Get Started Free",
  requestDemo:      "Request Demo",
  startFreeNoCard:  "Start Free — No Credit Card",
  startFreeToday:   "Start Free Today",
  talkToExpert:     "Talk to an Expert",
  learnMore:        "Learn more",
  exploreAgent:     "Explore agent",

  /* ── Agent/Industry template chrome ── */
  agentsBreadcrumb:      "Agents",
  industriesBreadcrumb:  "Industries",
  everythingYouNeed:     "Everything You Need",
  everythingYouNeedSub:  "A complete AI system — not a simple chatbot.",
  howItWorks:            "How It Works",
  howItWorksSub:         "A fully automated workflow from input to outcome.",
  builtForYou:           "Built for You",
  builtForYouSub:        "Industry professionals who rely on Electi daily.",
  integratesWithTools:   "Integrates with the tools you already use",
  theChallenge:          "The Challenge",
  theElectiSolution:     "The Electi Solution",
  aiPoweredFor:          "AI-Powered for",
  aiPoweredForSub:       "Every workflow automated, every interaction enhanced.",
  recommendedAgents:     "Recommended Agents",
  yourAutomatedWorkflow: "Your Automated Workflow",
  yourAutomatedWorkflowSub: "From setup to full automation in minutes.",

  /* ── Footer ── */
  footerDesc:         "Building the future of AI-powered operations through intelligent agents.",
  footerProduct:      "Product",
  footerCompany:      "Company",
  footerLegal:        "Legal",
  footerAgents:       "Agents",
  footerIndustries:   "Industries",
  footerHowItWorks:   "How It Works",
  footerPricing:      "Pricing",
  footerAbout:        "About",
  footerBlog:         "Blog",
  footerCareers:      "Careers",
  footerContact:      "Contact",
  footerPrivacy:      "Privacy Policy",
  footerTerms:        "Terms of Service",
  rightsReserved:     "All rights reserved.",
  allSystemsOp:       "All systems operational",

  /* ── Navbar extras ── */
  navPricing:         "Pricing",
  navGoogle:          "Google",
  navOthers:          "Others",
  navSignInUp:        "Sign In / Up",
  navCopyright:       "© 2026 Electi AI",

  /* ── Footer extras ── */
  footerTagline:      "Building the future of AI-powered operations through intelligent agents.",
  footerTryFree:      "Try for free",
  footerCopyright:    "© 2025 ELECTI AI. All Rights Reserved.",
  footerCraftedIn:    "Crafted in Saudi Arabia",
};

const ar: Record<string, string> = {
  /* ── Splash ── */
  welcomeSeq1:   "مرحباً",
  welcomeFuture: "مرحباً بك في المستقبل",
  welcomeElecti: "مرحباً بك في إليكتي",

  /* ── Navbar ── */
  menu:    "القائمة",
  close:   "إغلاق",
  home:    "الرئيسية",
  agents:  "الوكلاء",
  industries: "الصناعات",
  enterprise: "المؤسسات",
  about:   "من نحن",
  careers: "الوظائف",
  blog:    "المدونة",
  contact: "تواصل معنا",
  signin:  "تسجيل الدخول",
  startFree: "ابدأ مجاناً",

  navSectionNav:        "التنقل",
  navSectionAgents:     "وكلاء الذكاء الاصطناعي",
  navSectionIndustries: "الصناعات",
  navReadyToStart:      "هل أنت مستعد؟",
  navDeployFirst:       "انشر أول وكيل ذكاء اصطناعي خلال دقيقتين.",

  navSubHome:       "مستقبل الذكاء الاصطناعي",
  navSubAgents:     "٤ وكلاء ذكاء اصطناعي متخصصون",
  navSubIndustries: "تغطية لكل القطاعات",
  navSubEnterprise: "ذكاء اصطناعي على مستوى المؤسسات",
  navSubAbout:      "مهمتنا وفريقنا",
  navSubCareers:    "انضم إلى ثورة الذكاء الاصطناعي",
  navSubBlog:       "رؤى وتحديثات",
  navSubContact:    "لنتحدث",

  /* ── Agent quick-links ── */
  agentPersonal: "الوكيل الشخصي",
  agentBilling:  "وكيل الفواتير",
  agentLegal:    "الوكيل القانوني",
  agentSales:    "المبيعات والحجوزات",

  /* ── Industry quick-links ── */
  indHealthcare:   "الرعاية الصحية",
  indHospitality:  "الضيافة",
  indConstruction: "البناء",
  indRetail:       "البيع بالتجزئة",
  indCorporate:    "الشركات",
  indRealEstate:   "العقارات",

  /* ── Hero ── */
  heroBadge:        "مدعوم بالذكاء الاصطناعي · المملكة العربية السعودية",
  heroH1a:          "قوة عمل الذكاء الاصطناعي الخاصة بك.",
  heroH1b:          "متصلة",
  heroH1c:          "بحياتك.",
  heroSub:          "أربعة وكلاء ذكاء اصطناعي متخصصون يديرون جدولك الشخصي والفواتير والإرشادات القانونية والمبيعات — على مدار الساعة عبر واتساب.",
  heroStartFree:    "ابدأ مجاناً",
  heroExploreAgents:"استكشف الوكلاء",

  /* ── Hero (cinematic redesign) ── */
  heroNewLine1: "نساعد أعمالك على النمو",
  heroNewLine2: "بالذكاء الاصطناعي",
  heroNewSub:   "رؤيتك × الذكاء الاصطناعي = إمكانيات لا حدود لها",
  heroCta1:     "استكشف Electi",
  heroCta2:     "ابدأ رحلتك مع الذكاء الاصطناعي",

  /* ── Phone Showcase ── */
  phoneShowcaseBadge: "الذكاء الاصطناعي عبر واتساب",
  phoneShowcaseTitle: "قوة عمل الذكاء الاصطناعي\nتعيش في هاتفك",
  phoneShowcaseSub:   "من المهام الشخصية إلى العمليات المؤسسية — إليكتي يعمل حيث تعمل أنت. لا تطبيقات جديدة. فقط واتساب.",
  scrollToExplore:    "مرر للاستكشاف",

  howMagicWorks:    "كيف تعمل السحرة",
  speakThinkAct:    "تحدّث. فكّر. تصرّف.",
  speakThinkActSub: "أقوى قوى عمل الذكاء الاصطناعي، في هيئة محادثة بسيطة.",
  stepSpeak:        "تحدّث. يسمع.",
  stepThink:        "يفكّر. بعمق.",
  stepAct:          "يتصرّف. فوراً.",
  stepSpeakBody:    "أخبر الذكاء الاصطناعي بما تحتاجه بلغة بسيطة عبر واتساب. يفهم السياق والنية والفروق الدقيقة — بالعربية والإنجليزية.",
  stepThinkBody:    "يحلّل وكلاؤك الأنماط، ويقارن مصادر البيانات، ويبني خطط عمل ذكية — كل ذلك في جزء من الثانية.",
  stepActBody:      "التقويم محجوز. الفاتورة معالجة. العقد مُراجَع. العميل المحتمل تابعه الوكيل. كل هذا قبل أن تضع هاتفك.",

  enterpriseTrustBadge: "ثقة المؤسسات",
  builtForSerious:      "مصمم للجادين",
  builtForSeriousSub:   "أمان وامتثال وبنية تحتية على مستوى المؤسسات — موثوق به من أكثر المؤسسات صرامةً في المملكة العربية السعودية.",
  integratesWithStack:  "يتكامل مع بنيتك التقنية الحالية",

  meetTeam:    "تعرف على فريق الذكاء الاصطناعي",
  meetTeamSub: "أربعة وكلاء متخصصون، منصة موحدة. كل منهم مدرّب لمجال محدد.",

  intelligentAgentsBadge: "وكلاء أذكياء",

  processBadge:  "العملية",
  upRunning:     "جاهز للعمل في دقائق",
  upRunningSub:  "خمس خطوات لنشر قوة عمل الذكاء الاصطناعي الخاصة بك وتوفير ساعات يومياً.",

  industriesBadge:  "القطاعات",
  builtEvery:       "مصمم لكل قطاع",
  weBuildAIFor:     "نبني الذكاء الاصطناعي لـ",

  testimonialsBadge: "آراء العملاء",
  trustedBy:         "موثوق به من القادة",

  startTodayBadge:   "ابدأ اليوم",
  buildWorkforce:    "ابنِ قوة عملك من الذكاء الاصطناعي اليوم",
  buildWorkforceSub: "ابدأ بوكيل واحد أو الفريق الكامل. بدون رسوم إعداد. بدون بطاقة ائتمان.",
  talkToSales:       "تحدث مع فريق المبيعات",

  trustNoCC:      "بدون بطاقة ائتمان",
  trustDeploy:    "انشر في دقيقتين",
  trustCancel:    "إلغاء في أي وقت",
  trustBilingual: "العربية + الإنجليزية",

  startFreeForever: "ابدأ مجاناً — مجاناً للأبد",

  /* ── Enterprise section ── */
  enterpriseTitle: "بنية تحتية على مستوى المؤسسات",
  enterpriseSub:   "مصممة للتوسع والأمان والامتثال — موثوق بها من المؤسسات في المملكة العربية السعودية.",

  /* ── CTA buttons shared ── */
  deployNow:        "انشر الآن",
  bookDemo:         "احجز عرضاً",
  getStartedFree:   "ابدأ مجاناً",
  requestDemo:      "طلب عرض توضيحي",
  startFreeNoCard:  "ابدأ مجاناً — بدون بطاقة ائتمان",
  startFreeToday:   "ابدأ مجاناً اليوم",
  talkToExpert:     "تحدث مع خبير",
  learnMore:        "اعرف المزيد",
  exploreAgent:     "استكشف الوكيل",

  /* ── Agent/Industry template chrome ── */
  agentsBreadcrumb:      "الوكلاء",
  industriesBreadcrumb:  "الصناعات",
  everythingYouNeed:     "كل ما تحتاجه",
  everythingYouNeedSub:  "نظام ذكاء اصطناعي متكامل — وليس مجرد روبوت محادثة.",
  howItWorks:            "كيف يعمل",
  howItWorksSub:         "سير عمل آلي بالكامل من المدخل إلى النتيجة.",
  builtForYou:           "مصمم لك",
  builtForYouSub:        "محترفو الصناعة الذين يعتمدون على إليكتي يومياً.",
  integratesWithTools:   "يتكامل مع الأدوات التي تستخدمها بالفعل",
  theChallenge:          "التحدي",
  theElectiSolution:     "حل إليكتي",
  aiPoweredFor:          "مدعوم بالذكاء الاصطناعي لـ",
  aiPoweredForSub:       "كل سير عمل آلي، كل تفاعل محسّن.",
  recommendedAgents:     "الوكلاء الموصى بهم",
  yourAutomatedWorkflow: "سير عملك الآلي",
  yourAutomatedWorkflowSub: "من الإعداد إلى الأتمتة الكاملة في دقائق.",

  /* ── Footer ── */
  footerDesc:         "وكلاء ذكاء اصطناعي للمساعدة الشخصية والإرشاد القانوني وأتمتة الفواتير وعمليات الأعمال. قوة عملك، بصورة مبتكرة.",
  footerProduct:      "المنتج",
  footerCompany:      "الشركة",
  footerLegal:        "القانونية",
  footerAgents:       "الوكلاء",
  footerIndustries:   "الصناعات",
  footerHowItWorks:   "كيف يعمل",
  footerPricing:      "التسعير",
  footerAbout:        "من نحن",
  footerBlog:         "المدونة",
  footerCareers:      "الوظائف",
  footerContact:      "تواصل معنا",
  footerPrivacy:      "سياسة الخصوصية",
  footerTerms:        "شروط الخدمة",
  rightsReserved:     "جميع الحقوق محفوظة.",
  allSystemsOp:       "جميع الأنظمة تعمل",

  /* ── Navbar extras ── */
  navPricing:         "الأسعار",
  navGoogle:          "Google",
  navOthers:          "أخرى",
  navSignInUp:        "دخول / تسجيل",
  navCopyright:       "© 2026 Electi AI",

  /* ── Footer extras ── */
  footerTagline:      "نبني مستقبل العمليات المدعومة بالذكاء الاصطناعي من خلال وكلاء أذكياء.",
  footerTryFree:      "جرّب مجاناً",
  footerCopyright:    "© 2025 ELECTI AI. جميع الحقوق محفوظة.",
  footerCraftedIn:    "صُنع في المملكة العربية السعودية",
};

type TranslationKey = keyof typeof en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  isAr: boolean;
}

const LangCtx = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => en[k] ?? String(k),
  isAr: false,
});

const CACHE_KEY = "electi-translations-v1";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function loadCached(): { en: Record<string, string>; ar: Record<string, string> } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function saveCache(data: { en: Record<string, string>; ar: Record<string, string> }) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("electi-lang") as Lang) || "en"; } catch { return "en"; }
  });

  // Live overrides fetched from the admin panel
  const [overrides, setOverrides] = useState<{ en: Record<string, string>; ar: Record<string, string> }>(() => {
    return loadCached() ?? { en: {}, ar: {} };
  });

  useEffect(() => {
    const cached = loadCached();
    if (cached) {
      setOverrides(cached);
      return;
    }
    // Fetch fresh translations from the API
    const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    fetch(`${base}/api/translations`)
      .then(r => r.ok ? r.json() : null)
      .then((data: { en: Record<string, string>; ar: Record<string, string> } | null) => {
        if (data?.en && data?.ar) {
          setOverrides(data);
          saveCache(data);
        }
      })
      .catch(() => {});
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("electi-lang", l); } catch {}
  };

  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => {
    const dict = lang === "ar" ? ar : en;
    const live  = lang === "ar" ? overrides.ar : overrides.en;
    return live[key] ?? dict[key] ?? en[key] ?? String(key);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t, isAr: lang === "ar" }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() { return useContext(LangCtx); }
