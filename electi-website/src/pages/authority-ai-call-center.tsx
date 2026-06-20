import { PhoneCall, PhoneIncoming, Globe, Zap, BarChart3, Clock, Users, Shield, HeartPulse, Hotel, Building2, ShoppingBag } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Call Center Saudi Arabia",
    nameAr: "مركز الاتصال بالذكاء الاصطناعي في المملكة العربية السعودية",
    description: "Electi's AI Call Center replaces traditional IVR and first-line agents with intelligent AI that handles unlimited simultaneous Arabic and English calls — qualifying, routing, booking, and resolving 24/7.",
    descriptionAr: "يستبدل مركز الاتصال بالذكاء الاصطناعي من إليكتي نظام IVR التقليدي ووكلاء الخط الأول بذكاء اصطناعي يتعامل مع مكالمات عربية وإنجليزية متزامنة غير محدودة — التأهيل والتوجيه والحجز والحل على مدار الساعة.",
    url: "/ai-call-center",
    keywords: ["AI call center Saudi Arabia", "AI call center Arabic", "مركز اتصال بالذكاء الاصطناعي", "AI phone agent Saudi", "AI IVR replacement Saudi Arabia", "Arabic AI call center", "AI customer service call Saudi", "automated call center Saudi Arabia"],
  }),
  makeFaqSchema([
    { q: "What is an AI Call Center?", a: "An AI Call Center is an AI-powered telephony system that replaces traditional IVR systems and first-line human agents. It answers inbound calls in Arabic and English, understands natural speech, processes customer requests, takes action (booking appointments, retrieving information, creating tickets), and routes complex cases to human agents — handling unlimited simultaneous calls 24/7." },
    { q: "Can an AI Call Center speak Arabic?", a: "Yes. Electi's AI Call Center is fully bilingual — handling calls in Arabic (Najdi and Hijazi dialects, plus Modern Standard Arabic) and English. The system detects the caller's language from their first words and responds in that language throughout the call." },
    { q: "What is the cost of an AI Call Center vs traditional call center?", a: "Traditional call centers require staffing, training, management, facilities, and shift coverage — costs that scale linearly with call volume. An AI Call Center handles unlimited calls simultaneously at a fixed platform cost. For businesses handling 500+ calls/month, AI call centers typically deliver significant cost reduction while improving response times and consistency." },
    { q: "Can an AI Call Center replace human agents?", a: "AI Call Centers replace human agents for tier-1 calls — standard inquiries, booking, FAQs, order status, and routing (typically 60–80% of call volume). Complex negotiations, sensitive complaints, and non-standard situations are escalated to human agents with full call context. The result is fewer human agents needed for higher call volumes." },
    { q: "How does an AI Call Center handle Arabic calls?", a: "Electi's AI Call Center uses Arabic Automatic Speech Recognition (ASR) trained on Saudi dialects to understand callers, a large language model to determine intent and response, and Arabic Text-to-Speech (TTS) to respond in natural-sounding Arabic. The entire call — from greeting to resolution or handoff — happens in real time in Arabic." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Voice Agents", url: "/ai-voice-agents" },
    { name: "AI Call Center", url: "/ai-call-center" },
  ]),
];

export default function AICallCenterPage() {
  return (
    <AuthorityPage
      seoTitle="AI Call Center Saudi Arabia | Arabic & English | Replace IVR | Electi"
      seoTitleAr="مركز الاتصال بالذكاء الاصطناعي في المملكة | عربي وإنجليزي | إليكتي"
      seoDescription="AI Call Center for Saudi businesses — handles unlimited simultaneous Arabic and English calls 24/7. Replaces IVR and first-line agents. Books, routes, and resolves without hold time."
      seoDescriptionAr="مركز اتصال بالذكاء الاصطناعي للشركات السعودية — يتعامل مع مكالمات عربية وإنجليزية متزامنة غير محدودة على مدار الساعة. يستبدل IVR ووكلاء الخط الأول. يحجز ويوجّه ويحل بدون وقت انتظار."
      seoPath="/ai-call-center"
      seoKeywords="AI call center Saudi Arabia, AI call center Arabic, مركز اتصال بالذكاء الاصطناعي, AI phone agent Saudi, AI IVR replacement Saudi Arabia, Arabic AI call center, automated call center KSA"
      seoKeywordsAr="مركز اتصال بالذكاء الاصطناعي، مركز اتصال ذكي عربي، استبدال IVR بالذكاء الاصطناعي، مركز خدمة عملاء ذكي، وكيل مكالمات ذكي عربي"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Voice Agents", labelAr: "وكلاء الصوت الذكي", href: "/ai-voice-agents" },
        { label: "AI Call Center", labelAr: "مركز الاتصال الذكي", href: "/ai-call-center" },
      ]}
      badge="AI Call Center"
      badgeAr="مركز الاتصال بالذكاء الاصطناعي"
      h1="AI Call Center"
      h1Ar="مركز الاتصال"
      h1Accent="Saudi Arabia"
      h1AccentAr="بالذكاء الاصطناعي"
      tagline="Replace your IVR and first-line agents with AI that handles unlimited simultaneous Arabic and English calls — 24/7, with zero hold time and instant resolution."
      taglineAr="استبدل نظام IVR ووكلاء الخط الأول بذكاء اصطناعي يتعامل مع مكالمات عربية وإنجليزية متزامنة غير محدودة — على مدار الساعة، بلا وقت انتظار وحل فوري."
      intro="Traditional call centers are expensive, slow, and never truly available. Electi's AI Call Center answers every call instantly — in Arabic or English — handling booking, inquiries, and routing without hold times or staffing gaps. Your human agents focus on complex cases while the AI manages the volume."
      introAr="مراكز الاتصال التقليدية مكلفة وبطيئة وليست متاحة حقاً. يرد مركز الاتصال بالذكاء الاصطناعي من إليكتي على كل مكالمة فوراً — بالعربية أو الإنجليزية — ويتعامل مع الحجز والاستفسارات والتوجيه بدون أوقات انتظار أو فجوات في التوظيف. يركز وكلاؤك البشريون على الحالات المعقدة بينما يدير الذكاء الاصطناعي الحجم."
      stats={[
        { value: "∞",    label: "Simultaneous calls handled",      labelAr: "مكالمات متزامنة تُعالَج" },
        { value: "0s",   label: "Hold time",                       labelAr: "وقت الانتظار" },
        { value: "24/7", label: "Arabic + English coverage",       labelAr: "تغطية عربية + إنجليزية" },
        { value: "80%",  label: "Tier-1 calls resolved by AI",     labelAr: "مكالمات الطبقة الأولى يحلها الذكاء الاصطناعي" },
      ]}
      whatTitle="What Is an AI Call Center?"
      whatTitleAr="ما هو مركز الاتصال بالذكاء الاصطناعي؟"
      whatBody="An AI Call Center is an intelligent telephony system that replaces the traditional combination of IVR menus and first-line human agents. It answers every inbound call immediately — in Arabic (Najdi, Hijazi, or Modern Standard Arabic) or English — conducts a natural conversation to understand the caller's need, takes action (booking an appointment, retrieving an order, creating a support ticket, routing to the right department), and either resolves the call or performs a warm handoff to a human agent with full call context. Unlike basic IVR systems with pre-recorded menu trees, Electi's AI Call Center understands natural speech, handles follow-up questions, manages unexpected inputs, and maintains conversation continuity throughout the call."
      whatBodyAr="مركز الاتصال بالذكاء الاصطناعي هو نظام هاتفي ذكي يحل محل المزيج التقليدي من قوائم IVR والوكلاء البشريين من الخط الأول. يرد على كل مكالمة واردة فوراً — بالعربية (النجدية أو الحجازية أو الفصحى) أو الإنجليزية — ويُجري محادثة طبيعية لفهم حاجة المتصل ويتخذ إجراءً (حجز موعد أو استرداد طلب أو إنشاء تذكرة دعم أو التوجيه إلى القسم المناسب)، ثم إما يحل المكالمة أو يُنفّذ تسليماً دافئاً لوكيل بشري مع السياق الكامل للمكالمة."
      steps={[
        { n: "01", title: "Call Flow Mapping",        titleAr: "رسم مخطط تدفق المكالمات",    desc: "Define your call scenarios — inquiry types, booking flows, escalation triggers, and routing logic in Arabic/English.", descAr: "تحديد سيناريوهات مكالماتك — أنواع الاستفسارات وتدفقات الحجز ومحفزات التصعيد ومنطق التوجيه." },
        { n: "02", title: "Systems Integration",      titleAr: "تكامل الأنظمة",               desc: "Connect your CRM, appointment calendar, order management, and ticketing systems to the AI call center.", descAr: "ربط CRM وتقويم المواعيد وإدارة الطلبات وأنظمة التذاكر بمركز الاتصال الذكي." },
        { n: "03", title: "Language & Dialect Setup", titleAr: "إعداد اللغة واللهجة",          desc: "Configure primary language (Arabic dialect or English) and set escalation routing to human agents.", descAr: "تكوين اللغة الأساسية (اللهجة العربية أو الإنجليزية) وتعيين توجيه التصعيد إلى الوكلاء البشريين." },
        { n: "04", title: "Live AI Call Center",      titleAr: "مركز اتصال ذكي مباشر",        desc: "Every call answered instantly — AI handles volume 24/7, human agents handle complex cases.", descAr: "كل مكالمة يُرد عليها فوراً — يتعامل الذكاء الاصطناعي مع الحجم على مدار الساعة، والوكلاء البشريون مع الحالات المعقدة." },
      ]}
      benefits={[
        { icon: PhoneCall,    title: "Zero Hold Time",                titleAr: "صفر وقت انتظار",              desc: "Every call answered within seconds — callers never wait on hold in Arabic or English.", descAr: "كل مكالمة يُرد عليها في ثوانٍ — المتصلون لا ينتظرون أبداً بالعربية أو الإنجليزية." },
        { icon: Globe,        title: "Bilingual Arabic + English",    titleAr: "ثنائي اللغة عربي + إنجليزي", desc: "Handles calls in Arabic (Najdi, Hijazi, MSA) and English — switching per caller with no configuration.", descAr: "يتعامل مع المكالمات بالعربية (النجدية والحجازية والفصحى) والإنجليزية — يبدّل لكل متصل بدون تكوين." },
        { icon: PhoneIncoming, title: "Unlimited Simultaneous Calls", titleAr: "مكالمات متزامنة غير محدودة", desc: "No capacity ceiling — handles peak Arabic call volumes during product launches, Ramadan, or Hajj.", descAr: "لا سقف للطاقة — يتعامل مع ذروة حجم المكالمات العربية خلال إطلاق المنتجات ورمضان والحج." },
        { icon: BarChart3,    title: "Full Call Analytics in Arabic", titleAr: "تحليلات مكالمات كاملة بالعربية", desc: "Dashboard shows call volumes, resolution rates, common intents, and escalation patterns in Arabic and English.", descAr: "تُظهر لوحة التحكم أحجام المكالمات ومعدلات الحل والنوايا الشائعة وأنماط التصعيد بالعربية والإنجليزية." },
        { icon: Zap,          title: "Real-Time Action",              titleAr: "إجراء في الوقت الفعلي",       desc: "Books appointments, retrieves data, creates tickets, and processes requests during the live call.", descAr: "يحجز المواعيد ويسترد البيانات ويُنشئ التذاكر ويعالج الطلبات أثناء المكالمة الحية." },
        { icon: Shield,       title: "SAMA & PDPL Compliant",        titleAr: "متوافق مع ساما وPDPL",        desc: "All call recordings and data stored within Saudi Arabia — compliant with PDPL and SAMA requirements.", descAr: "جميع تسجيلات المكالمات والبيانات مُخزَّنة داخل المملكة — متوافق مع PDPL ومتطلبات ساما." },
      ]}
      industries={[
        { name: "Healthcare & Hospital Networks",  nameAr: "الرعاية الصحية وشبكات المستشفيات" },
        { name: "Hospitality & Hotel Chains",      nameAr: "الضيافة وسلاسل الفنادق" },
        { name: "Financial Services & Banks",      nameAr: "الخدمات المالية والبنوك" },
        { name: "Retail & E-commerce",             nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Government Services",             nameAr: "الخدمات الحكومية" },
        { name: "Telecommunications",              nameAr: "الاتصالات" },
        { name: "Real Estate",                     nameAr: "العقارات" },
        { name: "Logistics & Delivery",            nameAr: "الخدمات اللوجستية والتوصيل" },
      ]}
      useCases={[
        { icon: HeartPulse,  label: "Hospital Arabic Call Volume",    labelAr: "حجم مكالمات المستشفى العربية",    desc: "Large Saudi hospitals receive hundreds of Arabic appointment calls daily — AI Call Center handles all instantly.", descAr: "تستقبل المستشفيات السعودية الكبيرة مئات مكالمات المواعيد العربية يومياً — يتعامل مركز الاتصال الذكي معها كلها فوراً." },
        { icon: Hotel,       label: "Hotel Reservation Line",         labelAr: "خط حجوزات الفندق",               desc: "Arabic and English hotel calls handled simultaneously — reservations, check-in info, special requests.", descAr: "مكالمات الفنادق العربية والإنجليزية تُعالَج في آنٍ واحد — الحجوزات ومعلومات تسجيل الوصول والطلبات الخاصة." },
        { icon: Building2,   label: "Bank Customer Service Line",     labelAr: "خط خدمة عملاء البنك",            desc: "Arabic banking inquiries — account balance, branch locations, product info — handled by AI Call Center.", descAr: "الاستفسارات المصرفية العربية — رصيد الحساب ومواقع الفروع ومعلومات المنتجات — يتعامل معها مركز الاتصال الذكي." },
        { icon: ShoppingBag, label: "Retail Order & Returns Hotline", labelAr: "خط طلبات وإرجاع التجزئة",        desc: "E-commerce Arabic customer calls for order status, returns, and delivery — zero wait time.", descAr: "مكالمات عملاء التجارة الإلكترونية العربية لحالة الطلب والمرتجعات والتسليم — صفر وقت انتظار." },
        { icon: Users,       label: "Government Information Lines",   labelAr: "خطوط المعلومات الحكومية",         desc: "Citizens call government departments in Arabic — AI provides service information and routes to departments.", descAr: "يتصل المواطنون بالأقسام الحكومية بالعربية — يوفر الذكاء الاصطناعي معلومات الخدمة ويوجّه إلى الأقسام." },
        { icon: Clock,       label: "24/7 Arabic Emergency Routing",  labelAr: "توجيه طوارئ عربي على مدار الساعة", desc: "After-hours Arabic calls routed based on urgency — critical cases escalated to on-call staff instantly.", descAr: "المكالمات العربية خارج ساعات العمل تُوجَّه بناءً على الإلحاح — الحالات الحرجة تُصعَّد فوراً للموظفين المناوبين." },
      ]}
      faqs={[
        { q: "What is an AI Call Center?",                          qAr: "ما هو مركز الاتصال بالذكاء الاصطناعي؟",                    a: "An AI Call Center answers every inbound call immediately in Arabic or English, understands natural speech, takes action (booking, information retrieval, ticket creation), and routes complex cases to human agents — handling unlimited simultaneous calls 24/7.", aAr: "يرد مركز الاتصال بالذكاء الاصطناعي على كل مكالمة واردة فوراً بالعربية أو الإنجليزية، ويفهم الكلام الطبيعي، ويتخذ الإجراء (الحجز واسترداد المعلومات وإنشاء التذاكر)، ويوجّه الحالات المعقدة إلى الوكلاء البشريين." },
        { q: "Can an AI Call Center speak Arabic?",                 qAr: "هل يمكن لمركز الاتصال بالذكاء الاصطناعي التحدث بالعربية؟", a: "Yes. Electi's AI Call Center is fully bilingual — handling calls in Arabic (Najdi dialect, Hijazi dialect, and Modern Standard Arabic) and English. The system detects the caller's language and responds in that language.", aAr: "نعم. مركز الاتصال بالذكاء الاصطناعي من إليكتي ثنائي اللغة بالكامل — يتعامل مع المكالمات بالعربية (النجدية والحجازية والفصحى) والإنجليزية." },
        { q: "How many calls can an AI Call Center handle at once?", qAr: "كم مكالمة يمكن لمركز الاتصال الذكي التعامل معها في وقت واحد؟", a: "Electi's AI Call Center handles unlimited simultaneous calls — there is no capacity ceiling. During peak periods (Ramadan, Hajj, product launches), the AI scales instantly without additional staffing.", aAr: "يتعامل مركز الاتصال بالذكاء الاصطناعي من إليكتي مع مكالمات متزامنة غير محدودة — لا سقف للطاقة. خلال فترات الذروة (رمضان والحج وإطلاق المنتجات)، يتوسع الذكاء الاصطناعي فوراً دون توظيف إضافي." },
        { q: "Can an AI Call Center replace my human call center?",  qAr: "هل يمكن لمركز الاتصال الذكي استبدال مركز الاتصال البشري؟",  a: "AI Call Centers replace human agents for tier-1 calls (standard inquiries, booking, FAQs, routing — typically 60–80% of call volume). Complex situations are escalated to human agents. Most businesses need significantly fewer human agents after deploying AI.", aAr: "يحل مركز الاتصال بالذكاء الاصطناعي محل الوكلاء البشريين لمكالمات الطبقة الأولى (الاستفسارات القياسية والحجز والأسئلة الشائعة والتوجيه — عادةً 60-80٪ من حجم المكالمات)." },
        { q: "Does the AI Call Center comply with Saudi regulations?", qAr: "هل يمتثل مركز الاتصال الذكي للوائح السعودية؟",             a: "Yes. Electi's AI Call Center stores all call data and recordings within Saudi Arabia — compliant with the PDPL (Personal Data Protection Law) and the requirements of SAMA-regulated businesses.", aAr: "نعم. يُخزِّن مركز الاتصال بالذكاء الاصطناعي من إليكتي جميع بيانات المكالمات والتسجيلات داخل المملكة — متوافق مع PDPL ومتطلبات الشركات الخاضعة لتنظيم ساما." },
      ]}
      ctaTitle="Replace Your Call Center with AI Today"
      ctaTitleAr="استبدل مركز اتصالك بالذكاء الاصطناعي اليوم"
      ctaSub="Unlimited simultaneous Arabic and English calls. Zero hold time. 24/7 coverage. No staffing gaps."
      ctaSubAr="مكالمات عربية وإنجليزية متزامنة غير محدودة. صفر وقت انتظار. تغطية على مدار الساعة. لا فجوات في التوظيف."
    />
  );
}
