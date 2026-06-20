import { HeartPulse, MessageCircle, PhoneCall, Clock, Globe, Zap, BarChart, Shield, Users, Building, ShoppingBag, Hotel, HardHat, Bot } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Customer Support Agents",
    nameAr: "وكلاء خدمة العملاء الذكي",
    description: "Electi's AI Customer Support Agents resolve queries, handle complaints, and escalate intelligently — 24/7 in Arabic and English via WhatsApp and voice for Saudi businesses.",
    descriptionAr: "يحل وكلاء خدمة العملاء الذكيون من إليكتي الاستفسارات ويتعاملون مع الشكاوى ويصعّدون بذكاء — على مدار الساعة بالعربية والإنجليزية عبر واتساب والصوت.",
    url: "/ai-customer-support-agents",
    keywords: ["AI customer support Saudi Arabia", "AI customer service agent", "AI support automation", "وكيل خدمة العملاء الذكي", "خدمة عملاء بالذكاء الاصطناعي", "دعم عملاء ذكي"],
  }),
  makeFaqSchema([
    { q: "What is an AI Customer Support Agent?", a: "An AI Customer Support Agent is an autonomous AI system that handles inbound customer queries, complaints, and service requests via WhatsApp, voice, or chat — resolving issues instantly or escalating to human agents when needed." },
    { q: "Can AI Customer Support Agents respond in Arabic?", a: "Yes. Electi's AI Customer Support Agents are fully bilingual — responding in Arabic (including Saudi dialect) and English, matching the customer's language preference automatically." },
    { q: "What types of support queries can AI handle?", a: "AI handles Tier-1 queries: product FAQs, order status, appointment booking, complaint intake, account information, and service information. Complex cases are escalated to human agents with full context." },
    { q: "How does the AI handle customer complaints?", a: "The AI empathizes with the customer, captures complaint details, initiates resolution workflows (refunds, replacements, escalations), and follows up — all automatically and consistently." },
    { q: "Will customers know they're talking to an AI?", a: "You choose the disclosure policy. Electi recommends transparent disclosure that builds trust. Many clients use AI for initial triage and human agents for complex resolutions." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "AI Customer Support Agents", url: "/ai-customer-support-agents" }]),
];

export default function AICustomerSupportPage() {
  return (
    <AuthorityPage
      seoTitle="AI Customer Support Agents Saudi Arabia | Electi — 24/7 AI Service"
      seoTitleAr="وكلاء خدمة العملاء الذكي في المملكة | إليكتي — خدمة ذكية على مدار الساعة"
      seoDescription="24/7 AI customer support agents that resolve queries, handle complaints, and escalate intelligently — in Arabic and English via WhatsApp and voice for Saudi businesses."
      seoDescriptionAr="وكلاء خدمة عملاء ذكيون على مدار الساعة يحلون الاستفسارات ويتعاملون مع الشكاوى — بالعربية والإنجليزية عبر واتساب والصوت للشركات السعودية."
      seoPath="/ai-customer-support-agents"
      seoKeywords="AI customer support Saudi Arabia, AI customer service agent, 24/7 support automation Arabic, AI support Riyadh, وكيل خدمة العملاء الذكي, خدمة عملاء بالذكاء الاصطناعي"
      seoKeywordsAr="وكيل خدمة العملاء الذكي، خدمة عملاء بالذكاء الاصطناعي، دعم عملاء ذكي، خدمة عملاء 24 ساعة، أتمتة دعم العملاء"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "AI Customer Support", labelAr: "خدمة العملاء الذكية", href: "/ai-customer-support-agents" },
      ]}
      badge="AI Customer Support"
      badgeAr="وكلاء خدمة العملاء الذكي"
      h1="AI Customer Support"
      h1Ar="خدمة عملاء ذكية"
      h1Accent="That Never Sleeps"
      h1AccentAr="لا تنام أبداً"
      tagline="24/7 AI-powered customer support via WhatsApp and voice — resolves queries instantly, escalates intelligently."
      taglineAr="دعم عملاء مدعوم بالذكاء الاصطناعي على مدار الساعة عبر واتساب والصوت — يحل الاستفسارات فوراً ويصعّد بذكاء."
      intro="Electi AI Customer Support Agents handle every inbound query instantly — in Arabic or English — resolving issues, processing requests, and escalating to humans only when truly necessary."
      introAr="يتعامل وكلاء خدمة العملاء الذكيون من إليكتي مع كل استفسار وارد فوراً — بالعربية أو الإنجليزية — يحلون المشكلات ويعالجون الطلبات ويصعّدون للبشر فقط عند الضرورة الحقيقية."
      stats={[
        { value: "24/7", label: "Support coverage",       labelAr: "تغطية الدعم" },
        { value: "<5s",  label: "First response time",    labelAr: "وقت الاستجابة الأولى" },
        { value: "80%",  label: "Tier-1 resolution rate", labelAr: "معدل حل المستوى الأول" },
        { value: "∞",    label: "Simultaneous tickets",   labelAr: "تذاكر متزامنة" },
      ]}
      whatTitle="What Is an AI Customer Support Agent?"
      whatTitleAr="ما هو وكيل خدمة العملاء الذكي؟"
      whatBody="An AI Customer Support Agent is an autonomous AI system that manages inbound customer service requests across WhatsApp, voice, and chat channels. It understands customer intent, retrieves relevant information from your knowledge base, resolves Tier-1 queries instantly, and escalates complex or sensitive issues to the appropriate human agent — with full conversation context intact. Electi's AI Customer Support Agents are bilingual (Arabic and English), trained on your product knowledge, and compliant with Saudi data protection regulations."
      whatBodyAr="وكيل خدمة العملاء الذكي هو نظام ذكاء اصطناعي مستقل يدير طلبات خدمة العملاء الواردة عبر قنوات واتساب والصوت والدردشة. يفهم نية العميل ويسترجع المعلومات ذات الصلة من قاعدة معرفتك ويحل استفسارات المستوى الأول فوراً ويصعّد القضايا المعقدة أو الحساسة إلى الوكيل البشري المناسب — مع الحفاظ على سياق المحادثة الكامل."
      steps={[
        { n: "01", title: "Build Knowledge Base",    titleAr: "بناء قاعدة المعرفة",     desc: "Upload your FAQs, product docs, policies, and procedures. AI learns your business instantly.",            descAr: "حمّل أسئلتك الشائعة ووثائق المنتجات والسياسات والإجراءات. يتعلم الذكاء الاصطناعي عملك فوراً." },
        { n: "02", title: "Configure Escalation",    titleAr: "تكوين التصعيد",          desc: "Define when and how to escalate — which cases go to human agents, with what priority and context.",       descAr: "حدد متى وكيفية التصعيد — أي القضايا تذهب لوكلاء بشريين وبأي أولوية وسياق." },
        { n: "03", title: "Deploy Across Channels",  titleAr: "النشر عبر القنوات",      desc: "Launch on WhatsApp, voice, and web chat simultaneously — single agent, all channels.",                    descAr: "أطلق على واتساب والصوت والدردشة على الويب في آن واحد — وكيل واحد، جميع القنوات." },
        { n: "04", title: "Monitor & Improve",       titleAr: "المراقبة والتحسين",      desc: "Review CSAT scores, resolution rates, and escalation patterns. Continuously improve agent accuracy.",      descAr: "راجع نقاط رضا العملاء ومعدلات الحل وأنماط التصعيد. حسّن دقة الوكيل باستمرار." },
      ]}
      benefits={[
        { icon: Zap,          title: "Instant First Response",  titleAr: "استجابة أولى فورية",      desc: "Every customer query answered within seconds — no queues, no hold music, no wait time.",                   descAr: "كل استفسار عميل يُجاب عليه في ثوانٍ — لا طوابير، لا موسيقى انتظار، لا وقت انتظار." },
        { icon: Globe,        title: "Arabic-First Support",    titleAr: "دعم يُعطي العربية الأولوية", desc: "Responds natively in Arabic — Saudi dialect understood — with automatic English fallback.",              descAr: "يستجيب باللغة العربية الأصلية — اللهجة السعودية مفهومة — مع الإنجليزية كخيار احتياطي تلقائي." },
        { icon: Bot,          title: "Smart Escalation",        titleAr: "تصعيد ذكي",                desc: "Detects when human judgment is needed and hands off with complete conversation context.",                   descAr: "يكتشف متى تكون الحاجة للحكم البشري وينقل مع سياق المحادثة الكاملة." },
        { icon: MessageCircle, title: "Multi-Channel Coverage", titleAr: "تغطية متعددة القنوات",    desc: "Single AI handles WhatsApp, voice calls, and web chat — consistent responses across all touchpoints.",     descAr: "ذكاء اصطناعي واحد يتعامل مع واتساب والمكالمات الصوتية ودردشة الويب — ردود متسقة عبر جميع نقاط التواصل." },
        { icon: BarChart,     title: "CSAT Analytics",          titleAr: "تحليلات رضا العملاء",     desc: "Track customer satisfaction, resolution rates, and agent performance in real time.",                       descAr: "تتبع رضا العملاء ومعدلات الحل وأداء الوكيل في الوقت الفعلي." },
        { icon: Shield,       title: "Consistent Quality",      titleAr: "جودة متسقة",              desc: "Every customer gets the same high-quality response — no bad days, no lapses in professionalism.",          descAr: "كل عميل يحصل على نفس الاستجابة عالية الجودة — لا أيام سيئة، لا ثغرات في الاحترافية." },
      ]}
      industries={[
        { name: "Healthcare & Clinics",     nameAr: "الرعاية الصحية والعيادات" },
        { name: "Retail & E-commerce",      nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Hospitality & Hotels",     nameAr: "الضيافة والفنادق" },
        { name: "Real Estate",              nameAr: "العقارات" },
        { name: "Financial Services",       nameAr: "الخدمات المالية" },
        { name: "Telecommunications",       nameAr: "الاتصالات" },
        { name: "Government Services",      nameAr: "الخدمات الحكومية" },
        { name: "Education",                nameAr: "التعليم" },
      ]}
      useCases={[
        { icon: ShoppingBag,  label: "E-commerce Support",         labelAr: "دعم التجارة الإلكترونية",  desc: "Handles order status, returns, exchanges, and product queries — zero human involvement for Tier-1.",     descAr: "يتعامل مع حالة الطلب والمرتجعات والتبادلات واستفسارات المنتج — صفر تدخل بشري للمستوى الأول." },
        { icon: HeartPulse,   label: "Healthcare Patient Support",  labelAr: "دعم مرضى الرعاية الصحية", desc: "Answers medical FAQs, directs patients to appropriate services, and manages appointment queries.",         descAr: "يجيب على الأسئلة الطبية الشائعة ويوجّه المرضى للخدمات المناسبة ويدير استفسارات المواعيد." },
        { icon: Hotel,        label: "Hospitality Guest Services",  labelAr: "خدمات ضيوف الضيافة",      desc: "Handles check-in/out queries, amenity requests, complaint intake, and room service via WhatsApp.",        descAr: "يتعامل مع استفسارات تسجيل الوصول والمغادرة وطلبات المرافق واستقبال الشكاوى عبر واتساب." },
        { icon: Building,     label: "Real Estate Tenant Support",  labelAr: "دعم مستأجري العقارات",    desc: "Manages maintenance requests, lease queries, payment reminders, and community updates.",                  descAr: "يدير طلبات الصيانة واستفسارات الإيجار وتذكيرات الدفع وتحديثات المجتمع." },
        { icon: Users,        label: "Complaint Resolution",        labelAr: "حل الشكاوى",              desc: "Captures, categorizes, and initiates resolution workflows for customer complaints automatically.",         descAr: "يلتقط الشكاوى ويصنفها ويبدأ سير عمل الحل تلقائياً." },
        { icon: HardHat,      label: "After-Sales Support",         labelAr: "دعم ما بعد البيع",        desc: "Guides customers through product setup, warranty claims, and service scheduling post-purchase.",          descAr: "يرشد العملاء خلال إعداد المنتج ومطالبات الضمان وجدولة الخدمة بعد الشراء." },
      ]}
      faqs={[
        { q: "What is an AI Customer Support Agent?",               qAr: "ما هو وكيل خدمة العملاء الذكي؟",                           a: "An AI Customer Support Agent is an autonomous AI system that handles inbound customer queries via WhatsApp, voice, and chat — resolving issues instantly or escalating to human agents when needed.",                                                      aAr: "وكيل خدمة العملاء الذكي هو نظام ذكاء اصطناعي مستقل يتعامل مع استفسارات العملاء الواردة عبر واتساب والصوت والدردشة — يحل المشكلات فوراً أو يصعّد للوكلاء البشريين عند الحاجة." },
        { q: "What types of queries can AI handle?",                 qAr: "ما أنواع الاستفسارات التي يمكن للذكاء الاصطناعي التعامل معها؟", a: "AI handles: product FAQs, order status, appointment booking, complaint intake, account information, and service inquiries. Complex or sensitive cases are escalated to human agents with full context.", aAr: "يتعامل الذكاء الاصطناعي مع: الأسئلة الشائعة حول المنتجات وحالة الطلب وحجز المواعيد واستقبال الشكاوى ومعلومات الحساب واستفسارات الخدمة. الحالات المعقدة تُصعَّد مع سياق كامل." },
        { q: "Can the AI support agents respond in Arabic?",         qAr: "هل يمكن لوكلاء الدعم الرد بالعربية؟",                     a: "Yes. Electi's AI Customer Support Agents respond natively in Arabic — including Saudi dialect — and English, automatically matching the customer's language preference.",                                                                                    aAr: "نعم. يستجيب وكلاء خدمة العملاء الذكيون من إليكتي باللغة العربية الأصلية — بما في ذلك اللهجة السعودية — والإنجليزية، مطابقةً تلقائيةً لتفضيل لغة العميل." },
        { q: "How does the AI handle customer complaints?",          qAr: "كيف يتعامل الذكاء الاصطناعي مع شكاوى العملاء؟",          a: "The AI empathizes with the customer, captures complaint details, initiates resolution workflows (refunds, replacements, escalations), sends status updates, and follows up — all automatically and consistently.",                                          aAr: "يُبدي الذكاء الاصطناعي التعاطف مع العميل ويلتقط تفاصيل الشكوى ويبدأ سير عمل الحل ويرسل تحديثات الحالة ويتابع — كل ذلك تلقائياً ومتسقاً." },
        { q: "What is the resolution rate for AI support?",          qAr: "ما معدل حل الدعم بالذكاء الاصطناعي؟",                    a: "Electi AI Customer Support Agents typically resolve 75-85% of Tier-1 support queries without human escalation, while maintaining high customer satisfaction scores.",                                                                                       aAr: "يحل وكلاء خدمة العملاء الذكيون من إليكتي عادةً 75-85٪ من استفسارات دعم المستوى الأول دون تصعيد بشري مع الحفاظ على نقاط رضا عالية." },
      ]}
      ctaTitle="Transform Your Customer Support with AI"
      ctaTitleAr="حوّل خدمة عملائك بالذكاء الاصطناعي"
      ctaSub="Resolve 80% of customer queries instantly — 24/7 in Arabic and English — without adding headcount."
      ctaSubAr="حل 80٪ من استفسارات العملاء فوراً — على مدار الساعة بالعربية والإنجليزية — دون إضافة موظفين."
    />
  );
}
