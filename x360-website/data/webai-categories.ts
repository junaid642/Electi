// ─── Types ────────────────────────────────────────────────────────────────────

export interface WebAIServiceData {
  slug: string;
  categorySlug: string;
  name: string;
  nameAr: string;
  accentColor: string;
  hero: {
    label: string;
    labelAr: string;
    headline: string;
    headlineAr: string;
    sub: string;
    subAr: string;
  };
  features: Array<{
    iconKey: string;
    title: string;
    titleAr: string;
    desc: string;
    descAr: string;
  }>;
  painPoints?: Array<{
    iconKey: string;
    title: string;
    titleAr: string;
    desc: string;
    descAr: string;
  }>;
  useCases?: Array<{
    sector: string;
    sectorAr: string;
    desc: string;
    descAr: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
    labelAr: string;
  }>;
}

export interface WebAICategoryData {
  slug: string;
  name: string;
  nameAr: string;
  headline: string;
  headlineAr: string;
  sub: string;
  subAr: string;
  accentColor: string;
  gradientColor: string;
  services: WebAIServiceData[];
}

// ─── Website Development ──────────────────────────────────────────────────────

const websiteDevServices: WebAIServiceData[] = [
  {
    slug: "real-estate",
    categorySlug: "website-development",
    name: "Real Estate",
    nameAr: "العقارات",
    accentColor: "rgba(234,179,8,0.12)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "REAL ESTATE.\nREIMAGINED.",
      headlineAr: "العقارات.\nأُعيد تصوّرها.",
      sub: "Complete real estate technology — luxury websites, AI, 360° virtual tours, digital twins, and intelligent automation under one ecosystem.",
      subAr: "تقنية عقارية متكاملة — مواقع فاخرة وذكاء اصطناعي وجولات 360° وتوائم رقمية وأتمتة ذكية تحت منظومة واحدة.",
    },
    features: [
      { iconKey: "Globe",       title: "Property Portals",        titleAr: "بوابات العقارات",              desc: "Luxury listing websites with advanced search, map integration, and virtual tour embeds.", descAr: "مواقع قوائم فاخرة مع بحث متقدم وتكامل خرائط وتضمين جولات افتراضية." },
      { iconKey: "Star",        title: "360° Virtual Tours",      titleAr: "جولات 360° الافتراضية",        desc: "Immersive property walkthroughs that convert remote buyers and reduce site visits.",      descAr: "جولات عقارية غامرة تحوّل المشترين عن بُعد وتقلل الزيارات الميدانية." },
      { iconKey: "BarChart3",   title: "AI Lead Qualification",   titleAr: "تأهيل العملاء بالذكاء",       desc: "Auto-qualify leads, sync CRM records, and trigger follow-up sequences automatically.",    descAr: "تأهيل العملاء آلياً ومزامنة سجلات CRM وتشغيل تسلسلات المتابعة تلقائياً." },
      { iconKey: "Zap",         title: "Digital Twin & 3D",       titleAr: "التوأم الرقمي وثلاثي الأبعاد", desc: "3D digital twin models and floor-plan visualisations for off-plan and luxury developments.", descAr: "نماذج التوأم الرقمي ثلاثية الأبعاد ومرئيات المخطط للتطويرات الفاخرة وقيد الإنشاء." },
    ],
  },
  {
    slug: "hospitality",
    categorySlug: "website-development",
    name: "Hospitality",
    nameAr: "الضيافة",
    accentColor: "rgba(251,191,36,0.12)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "EXPERIENCES THAT\nARE UNFORGETTABLE.",
      headlineAr: "تجارب\nلا تُنسى.",
      sub: "Luxury hospitality websites for hotels, resorts, and restaurants — with online booking, menu showcases, and event management built in.",
      subAr: "مواقع ضيافة فاخرة للفنادق والمنتجعات والمطاعم — مع الحجز عبر الإنترنت وعروض القوائم وإدارة الفعاليات.",
    },
    features: [
      { iconKey: "Star",        title: "Online Booking Engine",   titleAr: "محرك الحجز عبر الإنترنت",   desc: "Integrated room and table booking with real-time availability and instant confirmation.",  descAr: "حجز الغرف والطاولات مدمج مع التوفر الفوري والتأكيد الفوري." },
      { iconKey: "Globe",       title: "Bilingual Experience",    titleAr: "تجربة ثنائية اللغة",         desc: "Seamless Arabic/English switching with culturally tailored content for Saudi guests.",  descAr: "تبديل سلس بين العربية والإنجليزية مع محتوى مُصمَّم ثقافياً للضيوف السعوديين." },
      { iconKey: "ShoppingCart", title: "F&B & Events",           titleAr: "الأغذية والفعاليات",         desc: "Menu galleries, event booking, and catering enquiry forms for full-service venues.",   descAr: "معارض القوائم وحجز الفعاليات ونماذج استفسار تقديم الطعام للأماكن متكاملة الخدمات." },
      { iconKey: "BarChart3",   title: "Occupancy Analytics",     titleAr: "تحليلات الإشغال",            desc: "Revenue-per-room dashboards, booking source tracking, and seasonal trend reports.",   descAr: "لوحات الإيرادات لكل غرفة وتتبع مصدر الحجوزات وتقارير الاتجاهات الموسمية." },
    ],
  },
  {
    slug: "healthcare",
    categorySlug: "website-development",
    name: "Healthcare",
    nameAr: "الرعاية الصحية",
    accentColor: "rgba(52,211,153,0.12)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "HEALTHCARE DIGITAL\nEXPERIENCES.",
      headlineAr: "تجارب رقمية\nلقطاع الصحة.",
      sub: "Modern healthcare websites for clinics, hospitals, and medical centres — with appointment booking, patient portals, and HIPAA-compliant infrastructure.",
      subAr: "مواقع رعاية صحية حديثة للعيادات والمستشفيات والمراكز الطبية — مع حجز المواعيد وبوابات المرضى وبنية تحتية متوافقة مع HIPAA.",
    },
    features: [
      { iconKey: "Globe",       title: "Appointment Booking",     titleAr: "حجز المواعيد",               desc: "Integrated online booking with real-time availability, SMS reminders, and auto-confirm.", descAr: "حجز إلكتروني مدمج مع التوفر الفوري وتذكيرات SMS والتأكيد التلقائي." },
      { iconKey: "Shield",      title: "Compliance Ready",        titleAr: "جاهز للامتثال",               desc: "HIPAA, NCA, and SAMA-aligned implementations for regulated healthcare sectors.",        descAr: "تطبيقات متوافقة مع HIPAA وNCA وSAMA للقطاعات الصحية الخاضعة للتنظيم." },
      { iconKey: "BarChart3",   title: "Patient Analytics",       titleAr: "تحليلات المرضى",              desc: "Appointment conversion tracking, patient retention dashboards, and growth reports.",    descAr: "تتبع تحويل المواعيد ولوحات الاحتفاظ بالمرضى وتقارير النمو." },
      { iconKey: "Zap",         title: "Fast Delivery",           titleAr: "تسليم سريع",                  desc: "Streamlined delivery with clear milestones and a dedicated healthcare project manager.", descAr: "تسليم مبسّط مع معالم واضحة ومدير مشروع صحي مخصص." },
    ],
  },
  {
    slug: "retail",
    categorySlug: "website-development",
    name: "Retail",
    nameAr: "البيع بالتجزئة",
    accentColor: "rgba(52,211,153,0.12)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "RETAIL EXPERIENCES\nBUILT TO SELL.",
      headlineAr: "تجارب تجزئة\nمبنية للبيع.",
      sub: "Premium retail digital platforms with seamless in-store and online experiences, smart inventory management, and Saudi payment gateways.",
      subAr: "منصات تجزئة رقمية متميزة مع تجارب سلسة داخل المتجر وعبر الإنترنت وإدارة مخزون ذكية وبوابات دفع سعودية.",
    },
    features: [
      { iconKey: "ShoppingCart", title: "Saudi Payment Gateways", titleAr: "بوابات الدفع السعودية",      desc: "Mada, Apple Pay, STC Pay, and Tabby BNPL integrated out of the box.",                descAr: "مدى وApple Pay وSTC Pay وTabby BNPL مدمجة جاهزة للاستخدام." },
      { iconKey: "BarChart3",   title: "Inventory & Analytics",   titleAr: "المخزون والتحليلات",         desc: "Real-time stock management, sales dashboards, and conversion tracking.",              descAr: "إدارة مخزون في الوقت الفعلي ولوحات مبيعات وتتبع التحويل." },
      { iconKey: "Globe",       title: "Arabic-First UX",         titleAr: "تجربة عربية أولاً",          desc: "Fully bilingual storefronts with RTL product layouts and Arabic SEO.",               descAr: "واجهات متاجر ثنائية اللغة مع تخطيطات منتجات RTL وSEO عربي." },
      { iconKey: "Zap",         title: "High Performance",        titleAr: "أداء عالي",                  desc: "Sub-2s page loads, CDN-optimized images, and caching for peak traffic.",            descAr: "تحميل الصفحة في أقل من ثانيتين وصور CDN محسّنة وتخزين مؤقت لحركة المرور." },
    ],
  },
  {
    slug: "corporate",
    categorySlug: "website-development",
    name: "Enterprise",
    nameAr: "المؤسسات",
    accentColor: "rgba(167,139,250,0.14)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "YOUR BRAND.\nCOMMANDS THE ROOM.",
      headlineAr: "علامتك التجارية.\nتسيطر على المشهد.",
      sub: "High-authority corporate websites that build trust, attract enterprise clients, and communicate your brand story with precision and impact.",
      subAr: "مواقع مؤسسية عالية السلطة تبني الثقة وتجذب عملاء المؤسسات وتوصل قصة علامتك التجارية بدقة وتأثير.",
    },
    features: [
      { iconKey: "Briefcase",   title: "Brand-Led Design",        titleAr: "تصميم يقوده العلامة",        desc: "Cinematic, premium design systems built around your brand identity and values.",       descAr: "أنظمة تصميم سينمائية متميزة مبنية حول هوية علامتك التجارية وقيمها." },
      { iconKey: "Globe",       title: "Bilingual & SEO",         titleAr: "ثنائي اللغة وSEO",           desc: "Full Arabic/English content with technical SEO to rank and be found.",                descAr: "محتوى عربي/إنجليزي كامل مع SEO تقني للترتيب والظهور." },
      { iconKey: "Shield",      title: "Enterprise Security",     titleAr: "أمان المؤسسات",              desc: "SSL, DDoS protection, SAMA-compliant hosting, and continuous security monitoring.",   descAr: "SSL وحماية DDoS واستضافة متوافقة مع SAMA ومراقبة أمنية مستمرة." },
      { iconKey: "Activity",    title: "CMS & Team Control",      titleAr: "CMS وتحكم الفريق",           desc: "Easy-edit CMS so your team publishes news, reports, and updates without developers.", descAr: "نظام CMS سهل التحرير حتى ينشر فريقك الأخبار والتقارير والتحديثات بدون مطورين." },
    ],
  },
  {
    slug: "commerce",
    categorySlug: "website-development",
    name: "E-Commerce",
    nameAr: "التجارة الإلكترونية",
    accentColor: "rgba(52,211,153,0.12)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "STORES BUILT\nTO CONVERT.",
      headlineAr: "متاجر مبنية\nللتحويل.",
      sub: "Custom e-commerce platforms handling high volumes, complex catalogs, and seamless Saudi payment gateway integrations — built to grow.",
      subAr: "منصات تجارة إلكترونية مخصصة تعالج أحجاماً كبيرة وكتالوجات معقدة وتكاملات بوابات الدفع السعودية — مبنية للنمو.",
    },
    features: [
      { iconKey: "ShoppingCart", title: "Saudi Payment Gateways", titleAr: "بوابات الدفع السعودية",      desc: "Mada, Apple Pay, STC Pay, and Tabby BNPL integrated out of the box.",                descAr: "مدى وApple Pay وSTC Pay وTabby BNPL مدمجة جاهزة للاستخدام." },
      { iconKey: "BarChart3",   title: "Inventory & Analytics",   titleAr: "المخزون والتحليلات",         desc: "Real-time stock management, sales dashboards, and conversion tracking.",              descAr: "إدارة مخزون في الوقت الفعلي ولوحات مبيعات وتتبع التحويل." },
      { iconKey: "Globe",       title: "Arabic-First UX",         titleAr: "تجربة عربية أولاً",          desc: "Fully bilingual storefronts with RTL product layouts and Arabic SEO.",               descAr: "واجهات متاجر ثنائية اللغة مع تخطيطات منتجات RTL وSEO عربي." },
      { iconKey: "Zap",         title: "High Performance",        titleAr: "أداء عالي",                  desc: "Sub-2s page loads, CDN-optimized images, and caching for peak traffic.",            descAr: "تحميل الصفحة في أقل من ثانيتين وصور CDN محسّنة وتخزين مؤقت لحركة المرور." },
    ],
  },
  {
    slug: "private-jet",
    categorySlug: "website-development",
    name: "Private Jets & Yachts",
    nameAr: "الطيران الخاص واليخوت",
    accentColor: "rgba(167,139,250,0.14)",
    hero: {
      label: "Website Development",
      labelAr: "تطوير المواقع",
      headline: "LUXURY TRAVEL.\nDIGITAL PRESENCE.",
      headlineAr: "السفر الفاخر.\nالحضور الرقمي.",
      sub: "Bespoke digital platforms for private aviation and yacht charter companies — premium design, charter enquiry systems, and fleet showcases.",
      subAr: "منصات رقمية مخصصة لشركات الطيران الخاص وتأجير اليخوت — تصميم متميز وأنظمة استفسار التأجير وعروض الأسطول.",
    },
    features: [
      { iconKey: "Globe",       title: "Fleet Showcase",          titleAr: "عرض الأسطول",                desc: "Immersive aircraft and yacht galleries with 360° media, specs, and availability.",    descAr: "معارض غامرة للطائرات واليخوت مع وسائط 360° والمواصفات والتوفر." },
      { iconKey: "Star",        title: "Charter Enquiry System",  titleAr: "نظام استفسار التأجير",        desc: "Smart enquiry forms with itinerary builder, instant quote, and WhatsApp integration.", descAr: "نماذج استفسار ذكية مع منشئ المسار والعرض الفوري وتكامل واتساب." },
      { iconKey: "BarChart3",   title: "Booking Analytics",       titleAr: "تحليلات الحجوزات",            desc: "Conversion tracking, seasonal demand reports, and lead source dashboards.",           descAr: "تتبع التحويل وتقارير الطلب الموسمية ولوحات مصدر العملاء المحتملين." },
      { iconKey: "Zap",         title: "Ultra-Premium Design",    titleAr: "تصميم فاخر للغاية",           desc: "Cinematic, ultra-premium UX crafted for high-net-worth clientele and global brands.",  descAr: "تجربة مستخدم سينمائية فاخرة للغاية مصممة لعملاء الثروة العالية والعلامات العالمية." },
    ],
  },
];

// ─── AI Solutions ─────────────────────────────────────────────────────────────

const aiSolutionsServices: WebAIServiceData[] = [
  {
    slug: "ai-automation",
    categorySlug: "ai-solutions",
    name: "AI Automation",
    nameAr: "أتمتة الذكاء الاصطناعي",
    accentColor: "rgba(251,191,36,0.12)",
    hero: {
      label: "AI Solutions",
      labelAr: "حلول الذكاء الاصطناعي",
      headline: "AUTOMATE THE ROUTINE.\nFREE YOUR TEAM.",
      headlineAr: "أتمت الروتين.\nحرّر فريقك.",
      sub: "End-to-end AI workflow automation connecting your CRM, ERP, email, and communication tools into intelligent, self-running pipelines.",
      subAr: "أتمتة شاملة لسير العمل بالذكاء الاصطناعي تربط CRM وERP والبريد الإلكتروني وأدوات التواصل في خطوط عمل ذكية تعمل ذاتياً.",
    },
    features: [
      { iconKey: "Zap",         title: "Process Automation",      titleAr: "أتمتة العمليات",            desc: "Identify and automate repetitive tasks across every department.",                     descAr: "تحديد وأتمتة المهام المتكررة في كل قسم." },
      { iconKey: "Activity",    title: "CRM & ERP Sync",          titleAr: "مزامنة CRM وERP",           desc: "Salesforce, HubSpot, SAP, and Oracle connectors with real-time data sync.",          descAr: "موصلات Salesforce وHubSpot وSAP وOracle مع مزامنة البيانات في الوقت الفعلي." },
      { iconKey: "Cpu",         title: "Intelligent Pipelines",   titleAr: "خطوط عمل ذكية",            desc: "n8n, Zapier, and Make integrations built and maintained by our team.",               descAr: "تكاملات n8n وZapier وMake مبنية ومُدارة من فريقنا." },
      { iconKey: "BarChart3",   title: "ROI Reporting",           titleAr: "تقارير العائد على الاستثمار", desc: "Time-saved and cost-reduction dashboards updated in real time.",                    descAr: "لوحات الوقت الموفَّر وتخفيض التكاليف محدَّثة في الوقت الفعلي." },
    ],
    painPoints: [
      { iconKey: "Activity",    title: "Hours Lost to Manual Tasks",          titleAr: "ساعات ضائعة في المهام اليدوية",        desc: "Data entry, report generation, and cross-system copy-paste eat hours your team should spend on growth.",           descAr: "إدخال البيانات وإنشاء التقارير ونسخ البيانات بين الأنظمة يأكل ساعات يجب أن يقضيها فريقك في النمو." },
      { iconKey: "Database",    title: "Siloed Systems Don't Communicate",    titleAr: "الأنظمة المعزولة لا تتواصل",          desc: "Your CRM, ERP, and email tools operate in isolation — creating gaps, duplicates, and costly decision delays.",     descAr: "CRM وERP وأدوات البريد تعمل بمعزل — مما يخلق ثغرات ومكررات وتأخيرات مكلفة في القرارات." },
      { iconKey: "AlertCircle", title: "Human Error in Critical Processes",   titleAr: "الخطأ البشري في العمليات الحرجة",     desc: "Manual steps introduce errors in invoices, contracts, and reporting that cost time and money to fix.",              descAr: "الخطوات اليدوية تُدخل أخطاء في الفواتير والعقود والتقارير تكلف وقتاً ومالاً لإصلاحها." },
    ],
    useCases: [
      { sector: "Finance & Accounting",  sectorAr: "المالية والمحاسبة",         desc: "Automate invoice processing, reconciliations, and financial reporting.",              descAr: "أتمتة معالجة الفواتير والمطابقات والتقارير المالية." },
      { sector: "Real Estate",           sectorAr: "العقارات",                   desc: "Auto-qualify leads, sync CRM records, and trigger follow-up sequences.",             descAr: "تأهيل العملاء آلياً ومزامنة سجلات CRM وتشغيل تسلسلات المتابعة." },
      { sector: "HR & Operations",       sectorAr: "الموارد البشرية والعمليات", desc: "Onboarding workflows, leave approvals, and payroll sync fully automated.",           descAr: "سير عمل الإعداد وموافقات الإجازات ومزامنة الرواتب مؤتمتة بالكامل." },
      { sector: "Hospitality",           sectorAr: "الضيافة",                    desc: "Booking confirmations, inventory updates, and guest communications on autopilot.",    descAr: "تأكيدات الحجز وتحديثات المخزون والتواصل مع الضيوف في وضع تلقائي." },
      { sector: "Retail",                sectorAr: "التجزئة",                    desc: "Order routing, stock alerts, and supplier comms automated end-to-end.",              descAr: "توجيه الطلبات وتنبيهات المخزون والتواصل مع الموردين مؤتمتة من البداية للنهاية." },
    ],
    stats: [
      { value: "70%",   label: "Time saved per process",        labelAr: "وقت موفَّر لكل عملية" },
      { value: "3×",    label: "Faster workflow throughput",     labelAr: "إنتاجية أسرع في سير العمل" },
      { value: "99.9%", label: "Process accuracy",              labelAr: "دقة العملية" },
      { value: "50+",   label: "Integrations available",        labelAr: "تكامل متاح" },
    ],
  },
  {
    slug: "ai-chatbots",
    categorySlug: "ai-solutions",
    name: "AI Chatbots",
    nameAr: "روبوتات المحادثة الذكية",
    accentColor: "rgba(74,222,128,0.12)",
    hero: {
      label: "AI Solutions",
      labelAr: "حلول الذكاء الاصطناعي",
      headline: "INTELLIGENT AGENTS.\nAVAILABLE 24/7.",
      headlineAr: "وكلاء ذكيون.\nمتاحون على مدار الساعة.",
      sub: "Custom AI chatbots and virtual assistants trained on your business data — deployed on your website, WhatsApp, and internal tools.",
      subAr: "روبوتات محادثة ذكية ومساعدون افتراضيون مدرّبون على بيانات عملك — منتشرون على موقعك وواتساب والأدوات الداخلية.",
    },
    features: [
      { iconKey: "Bot",         title: "Custom AI Training",      titleAr: "تدريب ذكاء اصطناعي مخصص",  desc: "GPT-4 and Claude models fine-tuned on your product knowledge and tone.",             descAr: "نماذج GPT-4 وClaude مُعدَّلة على معرفة منتجك وأسلوبك." },
      { iconKey: "MessageSquare", title: "Omnichannel Deploy",    titleAr: "نشر متعدد القنوات",         desc: "Web chat, WhatsApp Business, Telegram, and internal helpdesks in one.",            descAr: "دردشة الويب وواتساب بيزنس وتيليغرام ومكاتب المساعدة الداخلية في واحد." },
      { iconKey: "Globe",       title: "Arabic NLP",              titleAr: "معالجة اللغة العربية",       desc: "Native Arabic language understanding with dialect and formal support.",              descAr: "فهم اللغة العربية الأصيل مع دعم اللهجات والفصحى." },
      { iconKey: "BarChart3",   title: "Analytics Dashboard",     titleAr: "لوحة تحليلات",              desc: "Conversation insights, resolution rates, and escalation triggers at a glance.",     descAr: "رؤى المحادثات ومعدلات الحل ومشغلات التصعيد في لمحة." },
    ],
    painPoints: [
      { iconKey: "Clock",       title: "24/7 Demand Is Unsustainable",        titleAr: "الطلب المستمر 24/7 لا يمكن الاستدامة فيه",  desc: "Customers expect instant responses at 2 AM, weekends, and holidays — human teams simply can't deliver.",   descAr: "يتوقع العملاء استجابات فورية في أي وقت — الفرق البشرية لا تستطيع الوفاء بذلك." },
      { iconKey: "TrendingUp",  title: "Missed Leads Cost Revenue",           titleAr: "العملاء الفائتون يكلّفون إيرادات",          desc: "Every unanswered enquiry is a lead handed to your competitor. Slow follow-ups kill conversion.",           descAr: "كل استفسار دون رد يذهب إلى منافسك. الاستجابة البطيئة تقتل معدل التحويل." },
      { iconKey: "Globe",       title: "Arabic Language Gaps",                titleAr: "ثغرات اللغة العربية",                      desc: "Generic chatbots fail at Arabic dialects, formal business Arabic, and right-to-left conversations.",       descAr: "روبوتات المحادثة العامة تفشل في اللهجات العربية والعربية الرسمية ومحادثات RTL." },
    ],
    useCases: [
      { sector: "Real Estate",           sectorAr: "العقارات",                  desc: "Qualify buyers, schedule viewings, and answer property queries 24/7 automatically.",   descAr: "تأهيل المشترين وجدولة المعاينات والرد على استفسارات العقارات 24/7 آلياً." },
      { sector: "Hospitality",           sectorAr: "الضيافة",                   desc: "Handle booking queries, F&B reservations, and guest services instantly.",             descAr: "معالجة استفسارات الحجز وحجوزات الطعام وخدمات الضيوف فورياً." },
      { sector: "Healthcare",            sectorAr: "الرعاية الصحية",            desc: "Book appointments, answer FAQs, and triage patient enquiries automatically.",         descAr: "حجز المواعيد والرد على الأسئلة الشائعة وفرز استفسارات المرضى آلياً." },
      { sector: "Retail & E-Commerce",   sectorAr: "التجزئة والتجارة الإلكترونية", desc: "Product recommendations, order tracking, and returns all handled automatically.",  descAr: "توصيات المنتجات وتتبع الطلبات وإدارة المرتجعات آلياً." },
      { sector: "Legal & Corporate",     sectorAr: "القانوني والمؤسسي",         desc: "Intake queries, pre-qualify clients, and schedule consultations effortlessly.",       descAr: "استقبال الاستفسارات وتأهيل العملاء مسبقاً وجدولة الاستشارات بسهولة." },
    ],
    stats: [
      { value: "80%",  label: "Queries resolved automatically",  labelAr: "استفسارات تُحل آلياً" },
      { value: "<3s",  label: "Average response time",           labelAr: "متوسط وقت الاستجابة" },
      { value: "24/7", label: "Availability",                    labelAr: "التوفر" },
      { value: "40%",  label: "Support cost reduction",          labelAr: "تخفيض تكلفة الدعم" },
    ],
  },
  {
    slug: "ai-analytics",
    categorySlug: "ai-solutions",
    name: "AI Analytics",
    nameAr: "تحليلات الذكاء الاصطناعي",
    accentColor: "rgba(96,165,250,0.14)",
    hero: {
      label: "AI Solutions",
      labelAr: "حلول الذكاء الاصطناعي",
      headline: "SEE TOMORROW.\nACT TODAY.",
      headlineAr: "انظر للغد.\nتصرّف اليوم.",
      sub: "AI-powered analytics and predictive models that turn your business data into forward-looking forecasts for sales, demand, and growth.",
      subAr: "تحليلات ونماذج تنبؤية مدعومة بالذكاء الاصطناعي تحول بيانات أعمالك إلى توقعات مستقبلية للمبيعات والطلب والنمو.",
    },
    features: [
      { iconKey: "TrendingUp",  title: "Sales Forecasting",       titleAr: "توقعات المبيعات",           desc: "ML models trained on your sales history to predict future revenue accurately.",      descAr: "نماذج ML مدرّبة على تاريخ مبيعاتك للتنبؤ بالإيرادات المستقبلية بدقة." },
      { iconKey: "BarChart3",   title: "Executive Dashboards",    titleAr: "لوحات تنفيذية",             desc: "Real-time KPI dashboards connecting data from every system in your organisation.",   descAr: "لوحات KPI في الوقت الفعلي تربط البيانات من كل نظام في مؤسستك." },
      { iconKey: "Users",       title: "Customer Intelligence",   titleAr: "ذكاء العملاء",              desc: "Churn prediction, segmentation, and lifetime value models for retention.",           descAr: "التنبؤ بالتسرب والتجزئة ونماذج القيمة مدى الحياة للاحتفاظ بالعملاء." },
      { iconKey: "Database",    title: "Data Warehouse",          titleAr: "مستودع البيانات",            desc: "Cloud-native data lakes on Azure, BigQuery, or Snowflake — query-ready in days.",   descAr: "بحيرات بيانات سحابية على Azure وBigQuery وSnowflake — جاهزة للاستعلام في أيام." },
    ],
    painPoints: [
      { iconKey: "Database",    title: "Data Without Direction",           titleAr: "بيانات بدون اتجاه",               desc: "Your business generates gigabytes of data daily, but reports show the past — not what to do next.",          descAr: "عملك يولّد غيغابايتات من البيانات يومياً، لكن التقارير تظهر الماضي — لا ما يجب فعله بعد ذلك." },
      { iconKey: "Clock",       title: "Reactive Instead of Predictive",   titleAr: "رد فعل بدلاً من التنبؤ",          desc: "Acting on last month's data means you're always behind the market — missing trends and opportunities.",       descAr: "التصرف بناءً على بيانات الشهر الماضي يعني أنك دائماً خلف السوق — تفوتك الاتجاهات والفرص." },
      { iconKey: "Users",       title: "No Early Warning on Churn",        titleAr: "لا إنذار مبكر عن فقدان العملاء",  desc: "Customers churn silently. Without predictive models, you only know they've left after they're gone.",          descAr: "العملاء يغادرون بصمت. بدون نماذج تنبؤية، لا تعلم برحيلهم إلا بعد أن يغادروا." },
    ],
    useCases: [
      { sector: "Retail & E-Commerce",  sectorAr: "التجزئة والتجارة الإلكترونية",  desc: "Demand forecasting, product recommendations, and customer lifetime value models.",     descAr: "توقعات الطلب وتوصيات المنتجات ونماذج قيمة عمر العميل." },
      { sector: "Real Estate",          sectorAr: "العقارات",                        desc: "Market trend analysis, pricing intelligence, and buyer propensity scoring.",           descAr: "تحليل اتجاهات السوق وذكاء التسعير وتسجيل ميل المشترين." },
      { sector: "Finance",              sectorAr: "المالية",                          desc: "Risk scoring, fraud detection, and predictive revenue forecasting models.",            descAr: "تسجيل المخاطر واكتشاف الاحتيال ونماذج توقع الإيرادات." },
      { sector: "Healthcare",           sectorAr: "الرعاية الصحية",                  desc: "Patient flow optimization, resource planning, and outcome prediction models.",         descAr: "تحسين تدفق المرضى وتخطيط الموارد ونماذج التنبؤ بالنتائج." },
      { sector: "Manufacturing",        sectorAr: "التصنيع",                          desc: "Predictive maintenance, supply chain optimization, and quality control analytics.",    descAr: "الصيانة التنبؤية وتحسين سلسلة التوريد وتحليلات ضبط الجودة." },
    ],
    stats: [
      { value: "3×",        label: "Faster decision making",     labelAr: "قرارات أسرع" },
      { value: "92%",       label: "Forecast accuracy",          labelAr: "دقة التوقعات" },
      { value: "Real-time", label: "Dashboard updates",          labelAr: "تحديثات لوحة التحكم" },
      { value: "360°",      label: "Customer view",              labelAr: "رؤية شاملة للعميل" },
    ],
  },
  {
    slug: "custom-ai-systems",
    categorySlug: "ai-solutions",
    name: "Custom AI Systems",
    nameAr: "أنظمة الذكاء الاصطناعي المخصصة",
    accentColor: "rgba(52,211,153,0.12)",
    hero: {
      label: "AI Solutions",
      labelAr: "حلول الذكاء الاصطناعي",
      headline: "BUILT FROM SCRATCH.\nBUILT FOR YOU.",
      headlineAr: "مبني من الصفر.\nمبني لك.",
      sub: "Fully bespoke AI systems — from intelligent document processors and computer vision to proprietary LLMs trained exclusively on your data.",
      subAr: "أنظمة ذكاء اصطناعي مخصصة بالكامل — من معالجات المستندات الذكية ورؤية الحاسوب إلى نماذج اللغة الخاصة المدرّبة حصرياً على بياناتك.",
    },
    features: [
      { iconKey: "Cpu",         title: "Proprietary Model Training", titleAr: "تدريب نماذج خاصة",        desc: "Train and fine-tune models exclusively on your data for maximum relevance.",         descAr: "تدريب وضبط النماذج حصرياً على بياناتك لأقصى ملاءمة." },
      { iconKey: "Eye",         title: "Computer Vision",         titleAr: "رؤية الحاسوب",               desc: "Object detection, OCR, facial analysis, and visual inspection systems.",           descAr: "اكتشاف الكائنات والتعرف الضوئي على الحروف وتحليل الوجه وأنظمة الفحص البصري." },
      { iconKey: "FileText",    title: "Intelligent Document Processing", titleAr: "معالجة المستندات الذكية", desc: "Automated extraction, classification, and routing of unstructured documents.",      descAr: "استخراج وتصنيف وتوجيه المستندات غير المنظمة بشكل آلي." },
      { iconKey: "Shield",      title: "Secure & Compliant",      titleAr: "آمن ومتوافق",               desc: "On-premise deployment with full data sovereignty and NCA compliance.",              descAr: "نشر محلي مع سيادة كاملة على البيانات وامتثال NCA." },
    ],
    painPoints: [
      { iconKey: "Layers",      title: "Off-the-Shelf AI Misses Context",     titleAr: "الذكاء الاصطناعي الجاهز يفتقر السياق",       desc: "Generic AI models don't know your business, terminology, or data — producing irrelevant and unreliable results.",     descAr: "نماذج الذكاء الاصطناعي العامة لا تعرف عملك ومصطلحاتك وبياناتك — تنتج نتائج غير ملائمة وغير موثوقة." },
      { iconKey: "Shield",      title: "Data Privacy Is Non-Negotiable",      titleAr: "خصوصية البيانات غير قابلة للتفاوض",           desc: "Sending sensitive business data to third-party AI APIs creates serious regulatory and security risks.",                descAr: "إرسال بيانات الأعمال الحساسة إلى واجهات برمجة الذكاء الاصطناعي الخارجية يخلق مخاطر تنظيمية وأمنية جدية." },
      { iconKey: "Activity",    title: "Integration with Existing Systems",   titleAr: "التكامل مع الأنظمة الموجودة",                desc: "AI tools that can't plug into your ERP, CRM, and databases deliver zero real-world business value.",                 descAr: "أدوات الذكاء الاصطناعي التي لا تتصل بـERP وCRM وقواعد البيانات لا تقدم قيمة حقيقية للأعمال." },
    ],
    useCases: [
      { sector: "Banking & Finance",          sectorAr: "البنوك والمالية",          desc: "Fraud detection, KYC automation, and credit risk models trained on private financial data.",          descAr: "اكتشاف الاحتيال وأتمتة KYC ونماذج مخاطر الائتمان المدرّبة على البيانات المالية الخاصة." },
      { sector: "Healthcare",                 sectorAr: "الرعاية الصحية",           desc: "Medical imaging AI, clinical NLP, and patient risk stratification systems.",                         descAr: "ذكاء اصطناعي للتصوير الطبي ومعالجة اللغة الطبية وأنظمة تصنيف مخاطر المرضى." },
      { sector: "Government & Public Sector", sectorAr: "الحكومة والقطاع العام",    desc: "Document processing, citizen services AI, and fully secure on-premise deployment.",               descAr: "معالجة الوثائق وذكاء اصطناعي لخدمات المواطنين والنشر المحلي الآمن." },
      { sector: "Manufacturing & Industry",   sectorAr: "التصنيع والصناعة",         desc: "Visual quality inspection, predictive maintenance, and process optimisation AI.",                  descAr: "فحص جودة بصري وصيانة تنبؤية وذكاء اصطناعي لتحسين العمليات." },
      { sector: "Legal & Compliance",         sectorAr: "القانوني والامتثال",        desc: "Contract review AI, regulatory document analysis, and compliance automation systems.",             descAr: "ذكاء اصطناعي لمراجعة العقود وتحليل الوثائق التنظيمية وأتمتة الامتثال." },
    ],
    stats: [
      { value: "100%",    label: "Custom-built, no off-shelf",   labelAr: "مبني مخصص، لا جاهز" },
      { value: "On-Prem", label: "Deployment available",         labelAr: "النشر المحلي متاح" },
      { value: "NCA",     label: "Compliant architecture",       labelAr: "بنية متوافقة" },
      { value: "30+",     label: "Custom AI deployments",        labelAr: "نشر ذكاء اصطناعي مخصص" },
    ],
  },
];


// ─── ERP & SAP Solutions ──────────────────────────────────────────────────────

const erpSapServices: WebAIServiceData[] = [
  {
    slug: "erp-solutions",
    categorySlug: "erp-sap",
    name: "ERP Solutions",
    nameAr: "حلول ERP",
    accentColor: "rgba(251,146,60,0.12)",
    hero: {
      label: "ERP & SAP Systems",
      labelAr: "أنظمة ERP وSAP",
      headline: "ONE SYSTEM.\nYOUR ENTIRE BUSINESS.",
      headlineAr: "نظام واحد.\nعملك بالكامل.",
      sub: "End-to-end ERP implementation that unifies finance, HR, inventory, procurement, and operations into a single source of truth.",
      subAr: "تطبيق شامل لنظام ERP يوحّد المالية والموارد البشرية والمخزون والمشتريات والعمليات في مصدر واحد للحقيقة.",
    },
    features: [
      { iconKey: "Layers",      title: "Business Analysis",       titleAr: "تحليل الأعمال",             desc: "Deep process mapping and requirements gathering before any implementation.",          descAr: "رسم عمليات معمّق وجمع متطلبات قبل أي تطبيق." },
      { iconKey: "Database",    title: "Data Migration",          titleAr: "ترحيل البيانات",             desc: "Clean, validated data migration from legacy systems with zero data loss.",           descAr: "ترحيل بيانات نظيف وموثّق من الأنظمة القديمة بدون فقدان بيانات." },
      { iconKey: "Users",       title: "Training & Adoption",     titleAr: "التدريب والتبني",            desc: "Role-specific training programs and change management to ensure adoption.",           descAr: "برامج تدريب حسب الدور وإدارة التغيير لضمان التبني." },
      { iconKey: "Activity",    title: "Ongoing Support",         titleAr: "الدعم المستمر",              desc: "Post-go-live monitoring, optimization, and 24/7 support SLAs.",                     descAr: "مراقبة وتحسين بعد الإطلاق واتفاقيات مستوى خدمة 24/7." },
    ],
    painPoints: [
      { iconKey: "Database",    title: "Disconnected Departments",         titleAr: "أقسام غير متصلة",               desc: "Finance, operations, HR, and procurement run on separate systems — creating gaps, duplicates, and blind spots.",     descAr: "المالية والعمليات والموارد البشرية والمشتريات تعمل على أنظمة منفصلة — تخلق ثغرات ومكررات وبقع عمياء." },
      { iconKey: "Clock",       title: "Month-End Reporting Takes Weeks",  titleAr: "إعداد التقارير الشهرية يأخذ أسابيع", desc: "Manual consolidation of data from multiple systems turns a one-day job into a multi-week ordeal.",                  descAr: "دمج البيانات يدوياً من أنظمة متعددة يحوّل عمل يوم واحد إلى معاناة متعددة الأسابيع." },
      { iconKey: "TrendingUp",  title: "Growth Breaks Manual Processes",   titleAr: "النمو يكسر العمليات اليدوية",    desc: "Processes that worked at 50 employees collapse at 200. You need systems that scale with you.",                       descAr: "العمليات التي نجحت مع 50 موظفاً تنهار مع 200. تحتاج أنظمة تتوسع معك." },
    ],
    useCases: [
      { sector: "Manufacturing",             sectorAr: "التصنيع",                   desc: "Production planning, inventory control, and supply chain management unified in one platform.",     descAr: "تخطيط الإنتاج والتحكم في المخزون وإدارة سلسلة التوريد موحّدة في منصة واحدة." },
      { sector: "Real Estate & Construction", sectorAr: "العقارات والبناء",          desc: "Project costing, contractor management, and asset tracking in a single system.",                  descAr: "تكلفة المشاريع وإدارة المقاولين وتتبع الأصول في نظام واحد." },
      { sector: "Hospitality",               sectorAr: "الضيافة",                    desc: "Property management, F&B inventory, payroll, and finance fully consolidated.",                    descAr: "إدارة الممتلكات ومخزون الأغذية والرواتب والمالية موحّدة بالكامل." },
      { sector: "Healthcare",                sectorAr: "الرعاية الصحية",             desc: "Patient billing, inventory, HR, and facility management fully integrated.",                       descAr: "فواتير المرضى والمخزون والموارد البشرية وإدارة المنشآت مدمجة بالكامل." },
      { sector: "Retail & Distribution",     sectorAr: "التجزئة والتوزيع",          desc: "Omnichannel inventory, POS integration, and demand forecasting in a unified ERP.",               descAr: "مخزون متعدد القنوات وتكامل نقاط البيع وتوقعات الطلب في نظام ERP موحّد." },
    ],
    stats: [
      { value: "60%",  label: "Faster reporting cycles",     labelAr: "دورات تقارير أسرع" },
      { value: "1",    label: "Unified platform",            labelAr: "منصة موحدة" },
      { value: "6mo",  label: "Average ROI payback",         labelAr: "متوسط استرداد العائد" },
      { value: "100%", label: "Data accuracy achieved",      labelAr: "دقة البيانات المحققة" },
    ],
  },
  {
    slug: "sap-integration",
    categorySlug: "erp-sap",
    name: "SAP Integration",
    nameAr: "تكامل SAP",
    accentColor: "rgba(34,197,94,0.12)",
    hero: {
      label: "ERP & SAP Systems",
      labelAr: "أنظمة ERP وSAP",
      headline: "SAP EXPERTISE.\nSAUDI FIRST.",
      headlineAr: "خبرة SAP.\nالمملكة أولاً.",
      sub: "Certified SAP consulting and implementation — from S/4HANA migrations to SuccessFactors HR and SAP Business One for growing enterprises.",
      subAr: "استشارات وتطبيق SAP معتمد — من ترحيل S/4HANA إلى SuccessFactors HR وSAP Business One للمؤسسات المتنامية.",
    },
    features: [
      { iconKey: "Settings",    title: "SAP Certified Partners",  titleAr: "شركاء SAP معتمدون",         desc: "Certified consultants across SAP S/4HANA, BTP, SuccessFactors, and Ariba.",          descAr: "مستشارون معتمدون في SAP S/4HANA وBTP وSuccessFactors وAriba." },
      { iconKey: "Globe",       title: "ZATCA Compliance",        titleAr: "امتثال هيئة الزكاة والضريبة", desc: "E-invoicing (FATOORA) and ZATCA Phase 2 compliance built into every SAP project.",  descAr: "الفوترة الإلكترونية (فاتورة) وامتثال مرحلة ZATCA 2 مدمجان في كل مشروع SAP." },
      { iconKey: "Database",    title: "S/4HANA Migration",       titleAr: "ترحيل S/4HANA",              desc: "Brownfield and greenfield migration paths with minimal business disruption.",        descAr: "مسارات ترحيل Brownfield وGreenfield مع أدنى تعطيل للأعمال." },
      { iconKey: "Cpu",         title: "AI & Analytics Add-ons",  titleAr: "إضافات الذكاء الاصطناعي",   desc: "SAP Analytics Cloud and BTP AI services embedded for next-gen insights.",           descAr: "SAP Analytics Cloud وخدمات BTP AI مدمجة لرؤى الجيل التالي." },
    ],
    painPoints: [
      { iconKey: "Layers",      title: "Legacy Systems Blocking Growth",    titleAr: "الأنظمة القديمة تعيق النمو",      desc: "Ageing on-premise systems can't support modern analytics, mobile access, or real-time data needs.",          descAr: "الأنظمة القديمة المحلية لا تستطيع دعم التحليلات الحديثة والوصول عبر الموبايل أو احتياجات البيانات الفورية." },
      { iconKey: "Shield",      title: "ZATCA Phase 2 Compliance Gap",      titleAr: "ثغرة امتثال ZATCA المرحلة 2",    desc: "E-invoicing FATOORA requirements are mandatory — non-compliant SAP systems face penalties and disruption.",    descAr: "متطلبات الفوترة الإلكترونية FATOORA إلزامية — أنظمة SAP غير المتوافقة تواجه عقوبات واضطرابات." },
      { iconKey: "Database",    title: "Data Silos Across Divisions",       titleAr: "صوامع البيانات عبر الأقسام",      desc: "Business units using separate SAP instances or legacy tools can't get a unified view of performance.",        descAr: "وحدات الأعمال التي تستخدم نسخ SAP منفصلة لا تستطيع الحصول على رؤية موحدة للأداء." },
    ],
    useCases: [
      { sector: "Oil & Gas",                sectorAr: "النفط والغاز",              desc: "SAP S/4HANA for plant maintenance, procurement, and project systems.",                   descAr: "SAP S/4HANA لصيانة المصانع والمشتريات وأنظمة المشاريع." },
      { sector: "Government & Entities",    sectorAr: "الحكومة والهيئات",          desc: "ZATCA-compliant SAP deployments for public sector financial management.",               descAr: "نشر SAP المتوافق مع ZATCA لإدارة مالية القطاع العام." },
      { sector: "Banking & Finance",        sectorAr: "البنوك والمالية",            desc: "SAP for banking, treasury management, and regulatory compliance automation.",          descAr: "SAP للبنوك وإدارة الخزينة وأتمتة الامتثال التنظيمي." },
      { sector: "Real Estate & Construction", sectorAr: "العقارات والبناء",        desc: "SAP RE-FX, PS, and PM modules for large-scale real estate and construction operations.", descAr: "وحدات SAP RE-FX وPS وPM للعمليات العقارية والإنشائية الكبيرة." },
      { sector: "Retail & FMCG",            sectorAr: "التجزئة والسلع الاستهلاكية", desc: "SAP Retail, supply chain, and demand planning for high-volume operations.",          descAr: "تجزئة SAP وسلسلة التوريد وتخطيط الطلب للعمليات عالية الحجم." },
    ],
    stats: [
      { value: "ZATCA",   label: "Phase 2 certified",           labelAr: "المرحلة 2 معتمدة" },
      { value: "S/4HANA", label: "Certified migration",         labelAr: "ترحيل معتمد" },
      { value: "200+",    label: "SAP projects delivered",      labelAr: "مشروع SAP تم تسليمه" },
      { value: "24/7",    label: "Post-live support",           labelAr: "دعم ما بعد الإطلاق" },
    ],
  },
  {
    slug: "workflow-automation",
    categorySlug: "erp-sap",
    name: "Workflow Automation",
    nameAr: "أتمتة سير العمل",
    accentColor: "rgba(96,165,250,0.14)",
    hero: {
      label: "ERP & SAP Systems",
      labelAr: "أنظمة ERP وSAP",
      headline: "AUTOMATE OPERATIONS.\nSCALE WITH EASE.",
      headlineAr: "أتمت العمليات.\nتوسّع بسهولة.",
      sub: "Enterprise workflow automation connecting your ERP, CRM, and communication tools into intelligent, self-running operational pipelines.",
      subAr: "أتمتة سير العمل المؤسسي تربط ERP وCRM وأدوات التواصل في خطوط عمل تشغيلية ذكية تعمل ذاتياً.",
    },
    features: [
      { iconKey: "Zap",         title: "Process Automation",      titleAr: "أتمتة العمليات",            desc: "Identify and automate repetitive tasks across every department.",                     descAr: "تحديد وأتمتة المهام المتكررة في كل قسم." },
      { iconKey: "Activity",    title: "ERP & CRM Sync",          titleAr: "مزامنة ERP وCRM",           desc: "Salesforce, HubSpot, SAP, and Oracle connectors with real-time data sync.",          descAr: "موصلات Salesforce وHubSpot وSAP وOracle مع مزامنة البيانات في الوقت الفعلي." },
      { iconKey: "BarChart3",   title: "ROI Dashboards",          titleAr: "لوحات العائد على الاستثمار", desc: "Time-saved and cost-reduction metrics updated in real time.",                       descAr: "مقاييس الوقت الموفَّر وتخفيض التكاليف محدَّثة في الوقت الفعلي." },
      { iconKey: "Shield",      title: "Compliance Automation",   titleAr: "أتمتة الامتثال",            desc: "Automated audit trails, approvals, and regulatory reporting for full compliance.",    descAr: "مسارات تدقيق آلية وموافقات وتقارير تنظيمية للامتثال الكامل." },
    ],
    painPoints: [
      { iconKey: "Clock",       title: "Approval Bottlenecks Stall Work",        titleAr: "عقبات الموافقة توقف العمل",             desc: "Purchase orders, contracts, and HR requests sit in email inboxes for days waiting for sign-off.",               descAr: "أوامر الشراء والعقود وطلبات الموارد البشرية تجلس في صناديق البريد لأيام في انتظار الموافقة." },
      { iconKey: "Shield",      title: "Compliance Gaps in Manual Processes",    titleAr: "ثغرات الامتثال في العمليات اليدوية",    desc: "Manual approval chains lack audit trails, creating compliance risks during audits and regulatory reviews.",       descAr: "سلاسل الموافقة اليدوية تفتقر إلى مسارات التدقيق، مما يخلق مخاطر امتثال أثناء عمليات التدقيق." },
      { iconKey: "Eye",         title: "No Visibility on Task Progress",         titleAr: "لا رؤية على تقدم المهام",               desc: "You can't see where work is stuck, who's blocking it, or how long each step really takes.",                     descAr: "لا تستطيع رؤية أين يتعثر العمل أو من يعيقه أو كم يستغرق كل خطوة فعلياً." },
    ],
    useCases: [
      { sector: "Finance & Procurement",  sectorAr: "المالية والمشتريات",  desc: "Automated PO approvals, invoice matching, and vendor payment workflows.",                   descAr: "موافقات أوامر الشراء الآلية ومطابقة الفواتير وسير عمل دفع الموردين." },
      { sector: "HR & People Ops",        sectorAr: "الموارد البشرية",     desc: "Onboarding, leave management, and performance review workflows on autopilot.",             descAr: "التأهيل وإدارة الإجازات وسير عمل مراجعة الأداء في وضع تلقائي." },
      { sector: "Legal & Contracts",      sectorAr: "القانوني والعقود",    desc: "Contract routing, redlining, and multi-party approval workflows automated.",             descAr: "توجيه العقود والتعديلات وسير عمل الموافقة متعدد الأطراف مؤتمت." },
      { sector: "Operations",             sectorAr: "العمليات",            desc: "Incident management, maintenance requests, and SLA tracking fully automated.",             descAr: "إدارة الحوادث وطلبات الصيانة وتتبع اتفاقيات مستوى الخدمة مؤتمتة بالكامل." },
      { sector: "IT & Security",          sectorAr: "تكنولوجيا المعلومات", desc: "Access provisioning, change management, and incident response all automated.",          descAr: "توفير الوصول وإدارة التغيير والاستجابة للحوادث مؤتمتة." },
    ],
    stats: [
      { value: "80%",  label: "Faster approval cycles",    labelAr: "دورات موافقة أسرع" },
      { value: "100%", label: "Audit trail coverage",      labelAr: "تغطية مسار التدقيق" },
      { value: "24/7", label: "Automated execution",       labelAr: "تنفيذ آلي" },
      { value: "Zero", label: "Manual bottlenecks",        labelAr: "عقبات يدوية" },
    ],
  },
  {
    slug: "enterprise-systems",
    categorySlug: "erp-sap",
    name: "Enterprise Systems",
    nameAr: "أنظمة المؤسسات",
    accentColor: "rgba(167,139,250,0.14)",
    hero: {
      label: "ERP & SAP Systems",
      labelAr: "أنظمة ERP وSAP",
      headline: "ENTERPRISE POWER.\nUNLIMITED SCALE.",
      headlineAr: "قوة المؤسسات.\nتوسع لا محدود.",
      sub: "Custom enterprise technology solutions — from legacy modernization and cloud migration to bespoke integrations and digital transformation.",
      subAr: "حلول تقنية مؤسسية مخصصة — من تحديث الأنظمة القديمة والترحيل السحابي إلى التكاملات المخصصة والتحول الرقمي.",
    },
    features: [
      { iconKey: "Layers",      title: "Legacy Modernization",    titleAr: "تحديث الأنظمة القديمة",      desc: "Strangler fig and re-platform approaches to modernize aging enterprise systems.",    descAr: "نهج Strangler Fig وإعادة المنصة لتحديث أنظمة المؤسسات القديمة." },
      { iconKey: "Database",    title: "Cloud Migration",         titleAr: "الترحيل السحابي",            desc: "AWS, Azure, and Google Cloud migrations with zero-downtime strategies.",             descAr: "ترحيلات AWS وAzure وGoogle Cloud باستراتيجيات صفر توقف." },
      { iconKey: "Code2",       title: "Custom Integrations",     titleAr: "تكاملات مخصصة",             desc: "API and middleware development connecting any legacy or cloud system.",              descAr: "تطوير API والوسيط يربط أي نظام قديم أو سحابي." },
      { iconKey: "Shield",      title: "Technology Advisory",     titleAr: "الاستشارات التقنية",         desc: "CTO-level advisory for architecture decisions, vendor selection, and roadmapping.",  descAr: "استشارات على مستوى CTO لقرارات البنية التحتية واختيار الموردين ووضع الخارطة." },
    ],
    painPoints: [
      { iconKey: "Layers",      title: "Legacy Systems Are a Risk",          titleAr: "الأنظمة القديمة مخاطرة",        desc: "Aging on-premise systems fail during critical operations, and vendor support has long expired.",                      descAr: "الأنظمة القديمة تفشل خلال العمليات الحرجة، ودعم الموردين انتهى منذ زمن." },
      { iconKey: "Database",    title: "Cloud Migration Is Complex",         titleAr: "الترحيل السحابي معقد",          desc: "Moving critical enterprise data and apps to cloud without downtime or data loss seems impossible.",                   descAr: "نقل البيانات والتطبيقات المؤسسية الحرجة إلى السحابة دون توقف أو فقدان بيانات يبدو مستحيلاً." },
      { iconKey: "Activity",    title: "Vendor Lock-In Is Expensive",        titleAr: "الارتباط بالموردين مكلف",       desc: "Being trapped in a single vendor ecosystem drives up costs and limits your ability to innovate and scale.",            descAr: "الارتباط بنظام بيئي لمورد واحد يرفع التكاليف ويحد من قدرتك على الابتكار والتوسع." },
    ],
    useCases: [
      { sector: "Telecom & Technology",     sectorAr: "الاتصالات والتقنية",    desc: "Cloud-native migration, microservices architecture, and API ecosystem development.",                descAr: "الترحيل السحابي الأصيل وبنية الخدمات الدقيقة وتطوير نظام API البيئي." },
      { sector: "Energy & Utilities",       sectorAr: "الطاقة والمرافق",       desc: "Legacy modernization for SCADA, ERP, and operational technology systems.",                          descAr: "تحديث الأنظمة القديمة لـSCADA وERP وتقنية التشغيل." },
      { sector: "Government & Public Sector", sectorAr: "الحكومة والقطاع العام", desc: "Secure cloud infrastructure, citizen-facing systems, and inter-agency integration.",             descAr: "بنية سحابية آمنة وأنظمة موجهة للمواطنين وتكامل بين الجهات." },
      { sector: "Banking & Finance",        sectorAr: "البنوك والمالية",        desc: "Core banking modernization, API banking layers, and regulatory system integration.",               descAr: "تحديث البنوك الأساسية وطبقات API المصرفية وتكامل الأنظمة التنظيمية." },
      { sector: "Healthcare Networks",      sectorAr: "شبكات الرعاية الصحية",  desc: "Hospital information system integration, data warehouse, and analytics platform modernization.",    descAr: "تكامل نظام معلومات المستشفيات ومستودع البيانات وتحديث منصة التحليلات." },
    ],
    stats: [
      { value: "99.9%",     label: "Uptime SLA delivered",          labelAr: "اتفاقية مستوى الخدمة محققة" },
      { value: "3×",        label: "Faster delivery vs in-house",   labelAr: "تسليم أسرع من الداخلي" },
      { value: "AWS/Azure", label: "GCP certified",                 labelAr: "معتمد" },
      { value: "10+",       label: "Years enterprise experience",   labelAr: "سنوات خبرة مؤسسية" },
    ],
  },
];

// ─── Category Definitions ─────────────────────────────────────────────────────

const CATEGORIES: WebAICategoryData[] = [
  {
    slug: "website",
    name: "Website Development",
    nameAr: "تطوير المواقع",
    headline: "CHOOSE YOUR\nDIGITAL EXPERIENCE.",
    headlineAr: "اختر\nتجربتك الرقمية.",
    sub: "",
    subAr: "منصات رقمية غامرة مصممة للشركات الحديثة والعلامات التجارية الفاخرة والنمو المؤسسي.",
    accentColor: "rgba(96,165,250,0.14)",
    gradientColor: "rgba(66,133,244,0.12)",
    services: websiteDevServices,
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    nameAr: "حلول الذكاء الاصطناعي",
    headline: "INTELLIGENT SYSTEMS\nFOR MODERN BUSINESSES.",
    headlineAr: "أنظمة ذكية\nللشركات الحديثة.",
    sub: "AI-powered automation, intelligence, and smart digital experiences.",
    subAr: "أتمتة وذكاء وتجارب رقمية ذكية مدعومة بالذكاء الاصطناعي مصممة للشركات الجاهزة للمستقبل.",
    accentColor: "rgba(74,222,128,0.12)",
    gradientColor: "rgba(52,168,83,0.10)",
    services: aiSolutionsServices,
  },
  {
    slug: "erp-sap",
    name: "ERP & SAP Systems",
    nameAr: "أنظمة ERP وSAP",
    headline: "ENTERPRISE SYSTEMS\n& AUTOMATION.",
    headlineAr: "أنظمة المؤسسات\nوالأتمتة.",
    sub: "Advanced enterprise management solutions designed to streamline operations and scale organizations.",
    subAr: "حلول إدارة مؤسسية متقدمة مصممة لتبسيط العمليات وتوسيع نطاق المؤسسات.",
    accentColor: "rgba(251,146,60,0.12)",
    gradientColor: "rgba(251,146,60,0.10)",
    services: erpSapServices,
  },
];

// ─── Accessor Helpers ─────────────────────────────────────────────────────────

export function getAllCategories(): WebAICategoryData[] {
  return CATEGORIES;
}

export function getCategory(slug: string): WebAICategoryData | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getService(categorySlug: string, slug: string): WebAIServiceData | undefined {
  const cat = getCategory(categorySlug);
  return cat?.services.find((s) => s.slug === slug);
}

export function getAllServiceParams(): Array<{ category: string; slug: string }> {
  return CATEGORIES.flatMap((cat) =>
    cat.services.map((s) => ({ category: cat.slug, slug: s.slug }))
  );
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}
