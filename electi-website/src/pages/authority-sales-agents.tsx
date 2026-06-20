import { TrendingUp, Target, MessageCircle, BarChart, Zap, Globe, Clock, Users, Building, ShoppingBag, HeartPulse, Hotel } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Sales Agents",
    nameAr: "وكلاء المبيعات الذكي",
    description: "Electi's AI Sales Agents qualify leads, follow up, send proposals, and close deals automatically — 24/7 in Arabic and English for Saudi businesses.",
    descriptionAr: "يؤهّل وكلاء مبيعات إليكتي العملاء المحتملين ويتابعون ويرسلون العروض ويُغلقون الصفقات تلقائياً — على مدار الساعة بالعربية والإنجليزية للشركات السعودية.",
    url: "/ai-sales-agents",
    keywords: ["AI sales agents Saudi Arabia", "sales automation", "AI lead qualification", "وكيل المبيعات الذكي", "أتمتة المبيعات", "تأهيل العملاء بالذكاء الاصطناعي"],
  }),
  makeFaqSchema([
    { q: "What is an AI Sales Agent?", a: "An AI Sales Agent is an autonomous AI system that manages your entire sales pipeline — qualifying inbound leads, sending personalized proposals, following up with prospects, and booking sales calls — without human intervention." },
    { q: "How do AI Sales Agents qualify leads?", a: "AI Sales Agents engage every inbound inquiry instantly via WhatsApp, asking qualifying questions about budget, timeline, and requirements — then score leads and route hot prospects to your human sales team." },
    { q: "Can AI Sales Agents communicate in Arabic?", a: "Yes. Electi's AI Sales Agents are bilingual — conducting sales conversations fluently in Arabic (including Saudi dialect) and English, building rapport naturally with Saudi customers." },
    { q: "Can AI Sales Agents replace my sales team?", a: "AI Sales Agents handle top-of-funnel tasks — lead qualification, follow-up, and proposal sending. Your human salespeople focus on closing deals and relationship management where human connection matters most." },
    { q: "What is the typical impact on sales performance?", a: "Electi clients typically see 3x faster lead response times, 60% increase in qualified lead volume, and 40% reduction in sales cycle length within 90 days of deployment." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "AI Sales Agents", url: "/ai-sales-agents" }]),
];

export default function AISalesAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="AI Sales Agents Saudi Arabia | Electi — Sales Automation & Lead Qualification"
      seoTitleAr="وكلاء المبيعات الذكي في المملكة | إليكتي — أتمتة المبيعات وتأهيل العملاء"
      seoDescription="AI sales agents that qualify leads, send proposals, follow up, and book sales calls — 24/7 in Arabic and English. Automate your Saudi business sales pipeline."
      seoDescriptionAr="وكلاء مبيعات ذكيون يؤهّلون العملاء ويرسلون العروض ويتابعون ويحجزون مكالمات المبيعات — على مدار الساعة بالعربية والإنجليزية. أتمتة خط أنابيب المبيعات."
      seoPath="/ai-sales-agents"
      seoKeywords="AI sales agents Saudi Arabia, sales automation Riyadh, AI lead qualification, AI CRM automation, وكيل المبيعات الذكي, أتمتة المبيعات, تأهيل العملاء بالذكاء الاصطناعي"
      seoKeywordsAr="وكيل المبيعات الذكي، أتمتة المبيعات، تأهيل العملاء المحتملين بالذكاء الاصطناعي، إدارة علاقات العملاء الذكية، مبيعات واتساب"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "AI Sales Agents", labelAr: "وكلاء المبيعات الذكي", href: "/ai-sales-agents" },
      ]}
      badge="AI Sales Agents"
      badgeAr="وكلاء المبيعات الذكي"
      h1="AI Sales Agents That"
      h1Ar="وكلاء مبيعات ذكيون"
      h1Accent="Never Miss a Lead"
      h1AccentAr="لا يفوّتون عميلاً"
      tagline="Qualify leads, send proposals, follow up, and close deals automatically — without human intervention."
      taglineAr="يؤهّلون العملاء ويرسلون العروض ويتابعون ويُغلقون الصفقات تلقائياً — دون تدخل بشري."
      intro="Electi's AI Sales Agents respond to every lead instantly, qualify prospects through natural WhatsApp conversations, and hand off sales-ready buyers to your team — all in Arabic or English."
      introAr="يستجيب وكلاء المبيعات الذكيون من إليكتي لكل عميل محتمل فوراً ويؤهّلون المستهدفين من خلال محادثات واتساب طبيعية ويسلّمون المشترين الجاهزين لفريقك — بالعربية أو الإنجليزية."
      stats={[
        { value: "3×",  label: "Faster lead response",   labelAr: "أسرع في الاستجابة للعملاء" },
        { value: "60%", label: "More qualified leads",    labelAr: "عملاء مؤهَّلون أكثر" },
        { value: "40%", label: "Shorter sales cycle",     labelAr: "دورة مبيعات أقصر" },
        { value: "24/7", label: "Lead coverage",          labelAr: "تغطية العملاء المحتملين" },
      ]}
      whatTitle="What Is an AI Sales Agent?"
      whatTitleAr="ما هو وكيل المبيعات الذكي؟"
      whatBody="An AI Sales Agent is an autonomous AI system that manages your top-of-funnel and mid-funnel sales activities — engaging every inbound lead instantly, qualifying them through natural conversation, sending tailored proposals, scheduling follow-ups, and routing sales-ready prospects to your human team. Electi's AI Sales Agents operate 24/7 via WhatsApp, speak Arabic and English, and never let a lead go cold. They integrate with your CRM and provide real-time pipeline visibility."
      whatBodyAr="وكيل المبيعات الذكي هو نظام ذكاء اصطناعي مستقل يدير أنشطة المبيعات في أعلى ووسط القمع — يشرك كل عميل محتمل وارد فوراً ويؤهّله من خلال محادثة طبيعية ويرسل عروضاً مخصصة ويجدول المتابعات ويوجّه المستهدفين الجاهزين للمبيعات إلى فريقك البشري. يعمل وكلاء المبيعات الذكيون من إليكتي على مدار الساعة عبر واتساب ويتحدثون العربية والإنجليزية ولا يتركون أي عميل محتمل يبرد."
      steps={[
        { n: "01", title: "Connect Lead Sources",   titleAr: "ربط مصادر العملاء",    desc: "Link WhatsApp, website forms, social media, and CRM to funnel all leads to the AI agent.",          descAr: "اربط واتساب ونماذج الموقع ووسائل التواصل الاجتماعي وإدارة علاقات العملاء لتوجيه جميع العملاء للوكيل." },
        { n: "02", title: "Define Qualification",   titleAr: "تحديد معايير التأهيل", desc: "Set your lead scoring criteria — budget, timeline, intent, industry — and train the agent on your sales playbook.", descAr: "حدد معايير تقييم العملاء — الميزانية والجدول الزمني والنية والصناعة — ودرّب الوكيل على خطة مبيعاتك." },
        { n: "03", title: "AI Engages Every Lead",  titleAr: "الذكاء الاصطناعي يشرك كل عميل", desc: "Agent responds to every inbound lead within seconds — qualifying, nurturing, and scheduling in Arabic or English.", descAr: "يستجيب الوكيل لكل عميل وارد خلال ثوانٍ — يؤهّل ويرعى ويجدول بالعربية أو الإنجليزية." },
        { n: "04", title: "Hot Leads to Your Team", titleAr: "العملاء الجاهزون لفريقك", desc: "Qualified, sales-ready prospects are handed off to your human team with full conversation context.", descAr: "يُسلَّم العملاء المؤهَّلون الجاهزون لفريقك البشري مع سياق المحادثة الكامل." },
      ]}
      benefits={[
        { icon: Zap,          title: "Instant Lead Response",    titleAr: "استجابة فورية للعملاء",  desc: "Responds to every inquiry within seconds — while human agents are asleep, in meetings, or off-hours.",        descAr: "يستجيب لكل استفسار خلال ثوانٍ — بينما يكون الوكلاء البشريون نائمين أو في اجتماعات أو خارج أوقات العمل." },
        { icon: Target,       title: "AI Lead Scoring",          titleAr: "تقييم العملاء بالذكاء الاصطناعي", desc: "Qualifies leads on budget, timeline, and intent — routing only sales-ready prospects to your human team.",  descAr: "يؤهّل العملاء على أساس الميزانية والجدول الزمني والنية — يوجّه فقط العملاء الجاهزين لفريقك." },
        { icon: MessageCircle, title: "Personalized Follow-Up",  titleAr: "متابعة شخصية",            desc: "Sends tailored follow-up messages based on each prospect's profile, industry, and conversation history.",     descAr: "يرسل رسائل متابعة مخصصة بناءً على ملف كل مستهدف وصناعته وتاريخ محادثته." },
        { icon: Globe,        title: "Bilingual Sales Conversations", titleAr: "محادثات مبيعات ثنائية اللغة", desc: "Conducts full sales conversations in Arabic and English — building natural rapport with Saudi customers.",  descAr: "يجري محادثات مبيعات كاملة بالعربية والإنجليزية — يبني علاقة طبيعية مع العملاء السعوديين." },
        { icon: BarChart,     title: "Pipeline Analytics",       titleAr: "تحليلات خط الأنابيب",     desc: "Real-time CRM sync and pipeline visibility — see lead status, conversion rates, and agent performance.",      descAr: "مزامنة فورية مع إدارة علاقات العملاء ورؤية خط الأنابيب — شاهد حالة العملاء ومعدلات التحويل." },
        { icon: Clock,        title: "24/7 Sales Coverage",      titleAr: "تغطية مبيعات على مدار الساعة", desc: "Never lose a lead to a competitor because you responded 2 hours later. AI responds in seconds.",           descAr: "لا تخسر عميلاً لصالح منافس بسبب تأخر الرد بساعتين. يستجيب الذكاء الاصطناعي في ثوانٍ." },
      ]}
      industries={[
        { name: "Real Estate",           nameAr: "العقارات" },
        { name: "Healthcare",            nameAr: "الرعاية الصحية" },
        { name: "Financial Services",    nameAr: "الخدمات المالية" },
        { name: "Hospitality",           nameAr: "الضيافة" },
        { name: "Retail & E-commerce",   nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Technology & SaaS",     nameAr: "التقنية والبرمجيات" },
        { name: "Education",             nameAr: "التعليم" },
        { name: "Professional Services", nameAr: "الخدمات المهنية" },
      ]}
      useCases={[
        { icon: Building,    label: "Real Estate Lead Nurturing", labelAr: "رعاية عملاء العقارات",    desc: "Qualifies property buyers, captures requirements, and books site visits automatically via WhatsApp.",       descAr: "يؤهّل مشتري العقارات ويجمع المتطلبات ويحجز زيارات الموقع تلقائياً عبر واتساب." },
        { icon: TrendingUp,  label: "Sales Pipeline Management", labelAr: "إدارة خط أنابيب المبيعات", desc: "Tracks every lead through the funnel — from first contact to deal closure — with automated touchpoints.",    descAr: "يتتبع كل عميل خلال القمع — من الاتصال الأول إلى إغلاق الصفقة — مع نقاط تواصل تلقائية." },
        { icon: Users,       label: "B2B Lead Qualification",    labelAr: "تأهيل العملاء التجاريين",  desc: "Engages business prospects, identifies decision-makers, and books sales demos automatically.",              descAr: "يشرك الشركات المستهدفة ويحدد صانعي القرار ويحجز عروض المبيعات تلقائياً." },
        { icon: ShoppingBag, label: "E-commerce Upselling",      labelAr: "البيع الإضافي للتجارة الإلكترونية", desc: "Identifies upsell opportunities and sends personalized product recommendations to existing customers.",   descAr: "يحدد فرص البيع الإضافي ويرسل توصيات منتجات مخصصة للعملاء الحاليين." },
        { icon: HeartPulse,  label: "Healthcare Patient Acquisition", labelAr: "اكتساب مرضى الرعاية الصحية", desc: "Qualifies patients, explains services, and books consultations for clinics and medical centers.",     descAr: "يؤهّل المرضى ويشرح الخدمات ويحجز الاستشارات للعيادات والمراكز الطبية." },
        { icon: Hotel,       label: "Hospitality & Events Sales", labelAr: "مبيعات الضيافة والفعاليات", desc: "Handles venue inquiries, package quotations, and event bookings automatically for hotels and venues.",     descAr: "يتعامل مع استفسارات الأماكن وعروض الأسعار وحجوزات الفعاليات تلقائياً." },
      ]}
      faqs={[
        { q: "What is an AI Sales Agent?",                      qAr: "ما هو وكيل المبيعات الذكي؟",                                   a: "An AI Sales Agent is an autonomous AI system that manages your sales pipeline — qualifying leads, sending proposals, following up with prospects, and booking sales calls — without human intervention.",                                                     aAr: "وكيل المبيعات الذكي هو نظام ذكاء اصطناعي مستقل يدير خط أنابيب مبيعاتك — يؤهّل العملاء ويرسل العروض ويتابع المستهدفين ويحجز مكالمات المبيعات دون تدخل بشري." },
        { q: "How quickly does the AI respond to new leads?",    qAr: "كم سرعة استجابة الذكاء الاصطناعي للعملاء الجدد؟",           a: "Within seconds. Electi AI Sales Agents respond to every new lead the moment they submit an inquiry — 24/7, including nights, weekends, and Saudi public holidays.",                                                                                           aAr: "خلال ثوانٍ. يستجيب وكلاء مبيعات إليكتي لكل عميل جديد في اللحظة التي يقدم فيها استفساراً — على مدار الساعة، بما في ذلك الليل وعطل نهاية الأسبوع والإجازات." },
        { q: "Will it integrate with my existing CRM?",          qAr: "هل سيتكامل مع إدارة علاقات العملاء الحالية؟",               a: "Yes. Electi AI Sales Agents integrate with popular CRM platforms — logging every lead interaction, updating pipeline stages, and syncing contact data automatically.",                                                                                       aAr: "نعم. يتكامل وكلاء مبيعات إليكتي مع منصات إدارة علاقات العملاء الشائعة — بتسجيل كل تفاعل مع العملاء وتحديث مراحل خط الأنابيب ومزامنة بيانات الاتصال تلقائياً." },
        { q: "Can AI Sales Agents send proposals in Arabic?",    qAr: "هل يمكن لوكلاء المبيعات الذكيين إرسال عروض بالعربية؟",     a: "Yes. AI Sales Agents craft and send personalized proposals in Arabic or English based on the prospect's language preference and business requirements.",                                                                                                  aAr: "نعم. يصيغ وكلاء المبيعات الذكيون ويرسلون عروضاً مخصصة بالعربية أو الإنجليزية بناءً على تفضيل اللغة لدى المستهدف ومتطلبات عمله." },
        { q: "What results can I expect in the first 90 days?",  qAr: "ما النتائج التي يمكن توقعها في أول 90 يوماً؟",              a: "Electi clients typically see 3x faster lead response, 60% more qualified leads processed, and 40% shorter sales cycles within the first 90 days of AI sales agent deployment.",                                                                          aAr: "يرى عملاء إليكتي عادةً استجابة أسرع 3 مرات للعملاء و60٪ مزيداً من العملاء المؤهَّلين ودورات مبيعات أقصر بنسبة 40٪ خلال أول 90 يوماً من النشر." },
      ]}
      ctaTitle="Activate Your AI Sales Team Today"
      ctaTitleAr="فعّل فريق المبيعات الذكي اليوم"
      ctaSub="Never lose a lead again. AI Sales Agents respond in seconds — qualifying, following up, and booking sales calls 24/7."
      ctaSubAr="لا تخسر عميلاً أبداً. يستجيب وكلاء المبيعات الذكيون في ثوانٍ — يؤهّلون ويتابعون ويحجزون مكالمات المبيعات على مدار الساعة."
    />
  );
}
