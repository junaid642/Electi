import { Globe, MessageCircle, Mic, Zap, Shield, CheckCircle, Users, Building2, HeartPulse, Hotel, ShoppingBag, HardHat, Scale, GraduationCap } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Arabic AI Agents for Saudi Businesses",
    nameAr: "وكلاء الذكاء الاصطناعي العربي للشركات السعودية",
    description: "Electi deploys Arabic AI agents natively trained on Gulf Arabic dialects — Najdi and Hijazi — for Saudi businesses. Full bilingual Arabic and English automation via WhatsApp Business API.",
    descriptionAr: "تنشر إليكتي وكلاء ذكاء اصطناعي عربيين مدرَّبين أصلاً على اللهجات العربية الخليجية — النجدية والحجازية — للشركات السعودية.",
    url: "/arabic-ai-agents",
    keywords: ["Arabic AI agents", "Arabic AI Saudi Arabia", "وكيل ذكاء اصطناعي عربي", "Arabic NLP Saudi", "Arabic WhatsApp AI", "AI agents Arabic language", "Saudi Arabic AI", "Najdi Arabic AI", "Hijazi Arabic AI", "Arabic business automation"],
  }),
  makeFaqSchema([
    { q: "Can AI agents speak Arabic?", a: "Yes. Electi's AI agents are natively bilingual in Arabic and English. They speak, read, and understand Modern Standard Arabic (Fusha), Najdi Arabic (Riyadh dialect), and Hijazi Arabic (Jeddah/Mecca dialect). The agents switch languages automatically based on the customer's message." },
    { q: "Can AI agents understand Saudi Arabic dialects?", a: "Yes. Electi's AI agents are specifically trained on Gulf Arabic including Najdi (the dominant dialect in Riyadh and central Saudi Arabia) and Hijazi (dominant in Jeddah, Mecca, and Medina). This dialect-level training means agents respond naturally to how Saudi customers actually speak, not just formal Arabic." },
    { q: "What is the best Arabic AI agent for Saudi businesses?", a: "Electi is the Arabic-first AI agent platform for Saudi businesses. Unlike generic international AI tools that treat Arabic as an afterthought, Electi is built from the ground up for Arabic — Saudi dialect understanding, RTL dashboard interfaces, Saudi regulatory compliance, and WhatsApp Business API integration." },
    { q: "Can Arabic AI agents handle customer support?", a: "Yes. Electi's Arabic AI customer support agents handle inbound WhatsApp inquiries in Arabic and English 24/7 — answering product questions, processing complaints, checking order status, and escalating complex cases to human agents with full conversation context preserved." },
    { q: "Do Arabic AI agents support Arabic NLP?", a: "Yes. Electi's agents use enterprise-grade Arabic NLP (Natural Language Processing) models built on GPT-4o and Claude — the most advanced Arabic language understanding available. This enables nuanced understanding of Arabic business communication, not just keyword matching." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Agents", url: "/agents" },
    { name: "Arabic AI Agents", url: "/arabic-ai-agents" },
  ]),
];

export default function ArabicAIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="Arabic AI Agents for Saudi Businesses | Electi — وكيل ذكاء اصطناعي عربي"
      seoTitleAr="وكلاء الذكاء الاصطناعي العربي للشركات السعودية | إليكتي"
      seoDescription="Arabic AI agents natively trained on Saudi dialects (Najdi + Hijazi) for Saudi businesses. Full bilingual Arabic and English automation via WhatsApp. The Arabic-first AI agent platform."
      seoDescriptionAr="وكلاء ذكاء اصطناعي عربيون مدرَّبون على اللهجات السعودية (النجدية + الحجازية) للشركات السعودية. أتمتة ثنائية اللغة عربية وإنجليزية عبر واتساب."
      seoPath="/arabic-ai-agents"
      seoKeywords="Arabic AI agents, Arabic AI Saudi Arabia, وكيل ذكاء اصطناعي عربي, Arabic NLP, Arabic WhatsApp AI, Najdi Arabic AI, Hijazi Arabic AI, Arabic business automation, AI agents Arabic language"
      seoKeywordsAr="وكيل ذكاء اصطناعي عربي، وكلاء ذكاء اصطناعي بالعربية، ذكاء اصطناعي عربي للشركات، وكيل واتساب عربي، ذكاء اصطناعي اللهجة السعودية"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/agents" },
        { label: "Arabic AI Agents", labelAr: "وكلاء الذكاء الاصطناعي العربي", href: "/arabic-ai-agents" },
      ]}
      badge="Arabic AI Agents"
      badgeAr="وكلاء الذكاء الاصطناعي العربي"
      h1="Arabic AI Agents"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="for Saudi Business"
      h1AccentAr="العربي للشركات السعودية"
      tagline="AI agents that speak Arabic the way your customers speak it — Najdi, Hijazi, and Modern Standard — not just translated English."
      taglineAr="وكلاء ذكاء اصطناعي يتحدثون العربية بالطريقة التي يتحدث بها عملاؤك — نجدية وحجازية وعربية فصحى — لا مجرد إنجليزية مترجمة."
      intro="Electi is the Arabic-first AI agent platform for Saudi businesses. Every agent is natively bilingual — Arabic is a primary language, not a translation layer. Our agents are trained on Gulf Arabic dialects, understand Saudi business communication norms, and operate within Saudi Arabia's regulatory framework."
      introAr="إليكتي منصة وكلاء الذكاء الاصطناعي العربية الأولى للشركات السعودية. كل وكيل ثنائي اللغة بشكل أصلي — العربية لغة أساسية وليست طبقة ترجمة. وكلاؤنا مدرَّبون على اللهجات العربية الخليجية ويفهمون أعراف التواصل التجاري السعودي."
      stats={[
        { value: "3",    label: "Arabic dialects (Najdi, Hijazi, MSA)", labelAr: "لهجات عربية (نجدية، حجازية، فصحى)" },
        { value: "24/7", label: "Arabic customer coverage",              labelAr: "تغطية عملاء عربية على مدار الساعة" },
        { value: "0s",   label: "Response time in Arabic",               labelAr: "وقت الاستجابة بالعربية" },
        { value: "100%", label: "RTL Arabic dashboard support",          labelAr: "دعم لوحة التحكم العربية RTL" },
      ]}
      whatTitle="What Is an Arabic AI Agent?"
      whatTitleAr="ما هو وكيل الذكاء الاصطناعي العربي؟"
      whatBody="An Arabic AI agent is an intelligent software system that communicates naturally in Arabic — understanding Saudi dialects, responding in culturally appropriate formal or informal Arabic, and taking business actions (booking appointments, answering queries, qualifying leads, routing escalations) — all in real time via WhatsApp or other channels. Electi's Arabic AI agents are trained on Gulf Arabic specifically: Najdi Arabic (dominant in Riyadh and central Saudi Arabia) and Hijazi Arabic (dominant in Jeddah, Mecca, and Medina). They also handle Modern Standard Arabic (Fusha) for formal business contexts. Crucially, they switch between Arabic and English mid-conversation when a customer changes language — no commands required."
      whatBodyAr="وكيل الذكاء الاصطناعي العربي هو نظام برمجي ذكي يتواصل بشكل طبيعي بالعربية — يفهم اللهجات السعودية، ويستجيب بعربية رسمية أو غير رسمية مناسبة ثقافياً، ويتخذ إجراءات تجارية (حجز المواعيد والإجابة على الاستفسارات وتأهيل العملاء المحتملين وتوجيه التصعيدات) — كل ذلك في الوقت الفعلي عبر واتساب أو قنوات أخرى. وكلاء إليكتي العربيون مدرَّبون على العربية الخليجية تحديداً: العربية النجدية (السائدة في الرياض) والحجازية (السائدة في جدة ومكة والمدينة). كما يتعاملون مع العربية الفصحى الحديثة للسياقات التجارية الرسمية."
      steps={[
        { n: "01", title: "Arabic Knowledge Setup",     titleAr: "إعداد قاعدة المعرفة العربية",  desc: "Configure your agent with your business knowledge, policies, and FAQs in Arabic and English.",                descAr: "كوّن وكيلك بمعرفة عملك وسياساته وأسئلته الشائعة بالعربية والإنجليزية." },
        { n: "02", title: "Dialect Calibration",        titleAr: "معايرة اللهجة",                 desc: "Specify your primary customer dialect (Najdi, Hijazi, or general Gulf Arabic) for optimal naturalness.",     descAr: "حدد اللهجة الأساسية لعملائك (نجدية أو حجازية أو عربية خليجية عامة) لتحقيق الطبيعية المثلى." },
        { n: "03", title: "WhatsApp Integration",       titleAr: "تكامل واتساب",                  desc: "Connect your existing WhatsApp Business number — your customers see no change.",                               descAr: "ربط رقم واتساب للأعمال الحالي — لا يلاحظ عملاؤك أي تغيير." },
        { n: "04", title: "Live Arabic Service",        titleAr: "خدمة عربية مباشرة",             desc: "Your AI agent goes live — answering customers in their Arabic dialect around the clock.",                     descAr: "ينطلق وكيل الذكاء الاصطناعي مباشرةً — يجيب العملاء بلهجتهم العربية على مدار الساعة." },
      ]}
      benefits={[
        { icon: Globe,          title: "Najdi + Hijazi Dialects",     titleAr: "اللهجة النجدية + الحجازية",      desc: "Natively trained on the two dominant Saudi Arabic dialects — not generic MSA that sounds foreign to Saudi customers.", descAr: "مدرَّب أصلاً على اللهجتين السعوديتين السائدتين — لا عربية فصحى عامة تبدو غريبة على العملاء السعوديين." },
        { icon: MessageCircle,  title: "Arabic WhatsApp First",       titleAr: "واتساب عربي أولاً",              desc: "Every agent operates on WhatsApp Business API — the primary business channel for Saudi customers — in Arabic.", descAr: "كل وكيل يعمل على WhatsApp Business API — القناة التجارية الأساسية للعملاء السعوديين — بالعربية." },
        { icon: Zap,            title: "Real-Time Arabic NLP",        titleAr: "معالجة اللغة الطبيعية العربية",  desc: "Powered by GPT-4o and Claude with advanced Arabic NLP — understanding context, idioms, and intent.", descAr: "مدعوم بـ GPT-4o وClaude مع معالجة لغة طبيعية عربية متقدمة — يفهم السياق والتعابير والنية." },
        { icon: CheckCircle,    title: "Arabic ↔ English Auto-Switch", titleAr: "تبديل تلقائي عربي ↔ إنجليزي", desc: "Agents detect language from the first message and switch mid-conversation when the customer changes language.", descAr: "يكتشف الوكلاء اللغة من الرسالة الأولى ويتحولون في منتصف المحادثة عند تغيير العميل للغة." },
        { icon: Shield,         title: "Saudi Data Compliance",        titleAr: "الامتثال لبيانات سعودية",        desc: "All Arabic conversation data stored within Saudi Arabia — PDPL compliant, never exported.", descAr: "جميع بيانات المحادثات العربية مُخزَّنة داخل المملكة العربية السعودية — متوافق مع PDPL." },
        { icon: Users,          title: "RTL Arabic Dashboard",         titleAr: "لوحة تحكم عربية RTL",            desc: "Manage your Arabic AI agents from a full RTL Arabic interface — no English required.", descAr: "أدر وكلاءك من واجهة عربية RTL كاملة — لا حاجة للإنجليزية." },
      ]}
      industries={[
        { name: "Healthcare & Clinics",     nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality & Hotels",     nameAr: "الضيافة والفنادق" },
        { name: "Real Estate",              nameAr: "العقارات" },
        { name: "Financial Services",       nameAr: "الخدمات المالية" },
        { name: "Retail & E-commerce",      nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Construction",             nameAr: "الإنشاء والمقاولات" },
        { name: "Legal & Professional",     nameAr: "القانونية والمهنية" },
        { name: "Education",               nameAr: "التعليم" },
      ]}
      useCases={[
        { icon: HeartPulse,  label: "Arabic Clinic Receptionists",  labelAr: "استقبال العيادات بالعربية",   desc: "Patients in Riyadh and Jeddah book appointments in Najdi or Hijazi Arabic naturally.",          descAr: "يحجز المرضى في الرياض وجدة المواعيد بالعربية النجدية أو الحجازية بشكل طبيعي." },
        { icon: Hotel,       label: "Arabic Hotel Guest Support",    labelAr: "دعم ضيوف الفنادق بالعربية", desc: "Guest inquiries, room service, checkout requests — handled in the guest's preferred dialect.",    descAr: "استفسارات الضيوف وخدمة الغرف وطلبات المغادرة — يتم التعامل معها بالعربية المفضلة للضيف." },
        { icon: Building2,   label: "Arabic Corporate Queries",      labelAr: "استفسارات شركات بالعربية",   desc: "Internal HR queries, policy questions, and procurement routing — all in Arabic for Saudi teams.", descAr: "استفسارات الموارد البشرية الداخلية وأسئلة السياسات وتوجيه المشتريات — كلها بالعربية." },
        { icon: ShoppingBag, label: "Arabic E-commerce Support",     labelAr: "دعم التجارة الإلكترونية",    desc: "Arabic order status, return processing, and product inquiries for Saudi online shoppers.",        descAr: "حالة الطلب وإجراءات الإرجاع واستفسارات المنتجات بالعربية للمتسوقين السعوديين." },
        { icon: Scale,       label: "Arabic Legal Intake",           labelAr: "استقبال قانوني بالعربية",    desc: "Captures client case details in Arabic for law firms — with formal Saudi legal vocabulary.",      descAr: "يجمع تفاصيل قضايا العملاء بالعربية للمكاتب القانونية — بمفردات قانونية سعودية رسمية." },
        { icon: HardHat,     label: "Arabic Construction Ops",       labelAr: "عمليات إنشائية بالعربية",    desc: "Field team WhatsApp queries in Arabic routed to ERP and project management systems.",            descAr: "استفسارات واتساب لفرق الميدان بالعربية مُوجَّهة إلى ERP وأنظمة إدارة المشاريع." },
      ]}
      faqs={[
        { q: "Can AI agents speak Arabic?",                        qAr: "هل يمكن لوكلاء الذكاء الاصطناعي التحدث بالعربية؟",                  a: "Yes. Electi's AI agents are natively bilingual — Arabic is a primary language, not a translation. They speak and understand Najdi Arabic, Hijazi Arabic, and Modern Standard Arabic, switching automatically when customers change language.", aAr: "نعم. وكلاء إليكتي ثنائيو اللغة بشكل أصلي — العربية لغة أساسية وليست ترجمة. يتحدثون ويفهمون العربية النجدية والحجازية والفصحى الحديثة." },
        { q: "Can AI agents understand Saudi dialects?",           qAr: "هل يمكن لوكلاء الذكاء الاصطناعي فهم اللهجات السعودية؟",             a: "Yes. Electi's agents are specifically trained on Najdi Arabic (Riyadh dialect) and Hijazi Arabic (Jeddah/Mecca dialect) — the two dominant Saudi dialects — as well as Modern Standard Arabic for formal contexts.", aAr: "نعم. وكلاء إليكتي مدرَّبون تحديداً على العربية النجدية (لهجة الرياض) والحجازية (لهجة جدة/مكة) — اللهجتان السعوديتان السائدتان." },
        { q: "What is the best Arabic AI agent in Saudi Arabia?",  qAr: "ما هو أفضل وكيل ذكاء اصطناعي عربي في المملكة؟",                    a: "Electi is the Arabic-first AI agent platform for Saudi businesses — built for Gulf Arabic dialects, Saudi regulatory compliance, official WhatsApp Business API, and the Saudi business environment.", aAr: "إليكتي منصة وكلاء الذكاء الاصطناعي العربية الأولى للشركات السعودية — مبنية للهجات العربية الخليجية والامتثال التنظيمي السعودي." },
        { q: "Can Arabic AI agents handle customer support?",      qAr: "هل يمكن لوكلاء الذكاء الاصطناعي العربيين التعامل مع دعم العملاء؟", a: "Yes. Arabic AI customer support agents from Electi handle WhatsApp inquiries in Arabic and English 24/7 — answering questions, processing complaints, checking order status, and routing escalations.", aAr: "نعم. وكلاء دعم العملاء العربيون من إليكتي يتعاملون مع استفسارات واتساب بالعربية والإنجليزية على مدار الساعة." },
        { q: "Do Electi's Arabic agents work on WhatsApp?",        qAr: "هل تعمل وكلاء إليكتي العربيون على واتساب؟",                        a: "Yes. Electi operates on the official WhatsApp Business API — not grey-market bots. Your existing WhatsApp number is connected; customers interact normally in Arabic or English without knowing they're speaking to an AI.", aAr: "نعم. تعمل إليكتي على WhatsApp Business API الرسمي — لا روبوتات غير رسمية. يتصل رقم واتساب الحالي؛ يتفاعل العملاء بشكل طبيعي بالعربية أو الإنجليزية." },
      ]}
      ctaTitle="Deploy Your Arabic AI Agent Today"
      ctaTitleAr="انشر وكيل الذكاء الاصطناعي العربي اليوم"
      ctaSub="The Arabic-first AI agent for Saudi businesses. Serving customers in Najdi, Hijazi, and English — 24/7 via WhatsApp."
      ctaSubAr="وكيل الذكاء الاصطناعي العربي الأول للشركات السعودية. يخدم العملاء بالنجدية والحجازية والإنجليزية — على مدار الساعة عبر واتساب."
    />
  );
}
