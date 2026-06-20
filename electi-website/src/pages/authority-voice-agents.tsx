import { Mic, PhoneCall, PhoneIncoming, Calendar, MessageSquare, Globe, Zap, Clock, Users, Building, HeartPulse, Hotel, ShoppingBag, HardHat } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Voice Agents & AI Receptionists",
    nameAr: "وكلاء الصوت الذكي والموظف الاستقبال الذكي",
    description: "Electi's AI Voice Agents answer calls, qualify leads, book appointments, and route inquiries 24/7 in Arabic and English — replacing traditional receptionists with intelligent AI.",
    descriptionAr: "يرد وكلاء الصوت الذكي من إليكتي على المكالمات ويؤهّلون العملاء ويحجزون المواعيد ويوجّهون الاستفسارات على مدار الساعة بالعربية والإنجليزية.",
    url: "/ai-voice-agents",
    keywords: ["AI voice agents Saudi Arabia", "AI receptionist", "AI phone agent", "voice automation Arabic", "موظف استقبال ذكي", "وكيل صوتي ذكي", "رد تلقائي ذكي"],
  }),
  makeFaqSchema([
    { q: "What is an AI Voice Agent?", a: "An AI Voice Agent is an intelligent system that answers phone calls, understands natural speech (including Arabic and English), and takes action — booking appointments, answering FAQs, qualifying leads, and routing calls — without human intervention." },
    { q: "Can the AI Voice Agent speak Arabic?", a: "Yes. Electi's AI Voice Agents are fully bilingual — speaking and understanding Modern Standard Arabic, Saudi dialect, and English. They switch languages naturally based on the caller's preference." },
    { q: "What is an AI Receptionist?", a: "An AI Receptionist is an AI Voice Agent configured specifically for front-desk tasks — greeting callers, answering questions about your business, booking appointments, and transferring to the right department." },
    { q: "Can AI Voice Agents replace my receptionist?", a: "For high-volume, repetitive calls, yes. Electi AI Voice Agents handle unlimited simultaneous calls 24/7. Complex situations are escalated to human staff with full context preserved." },
    { q: "What industries use AI Voice Agents?", a: "Healthcare (appointment booking), hospitality (reservations), real estate (property inquiries), retail (order status), legal (intake), and corporate (switchboard replacement) across Saudi Arabia." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "AI Voice Agents", url: "/ai-voice-agents" }]),
];

export default function AIVoiceAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="AI Voice Agents & AI Receptionists Saudi Arabia | Electi"
      seoTitleAr="وكلاء الصوت الذكي والموظف الاستقبال الذكي في المملكة | إليكتي"
      seoDescription="AI voice agents that answer calls, qualify leads, and book appointments 24/7 in Arabic and English — intelligent AI receptionists for Saudi businesses."
      seoDescriptionAr="وكلاء صوتيون ذكيون يردون على المكالمات ويؤهّلون العملاء ويحجزون المواعيد على مدار الساعة بالعربية والإنجليزية — موظف استقبال ذكي للشركات السعودية."
      seoPath="/ai-voice-agents"
      seoKeywords="AI voice agents Saudi Arabia, AI receptionist Riyadh, AI phone agent Arabic, AI call handling, voice automation Arabic English, موظف استقبال ذكي, وكيل صوتي ذكي"
      seoKeywordsAr="موظف استقبال ذكي، وكيل صوتي ذكي، رد ذكي على المكالمات، أتمتة المكالمات، مساعد صوتي ذكي بالعربية"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "AI Voice Agents", labelAr: "وكلاء الصوت الذكي", href: "/ai-voice-agents" },
      ]}
      badge="AI Voice Agents"
      badgeAr="وكلاء الصوت الذكي"
      h1="AI Voice Agents &"
      h1Ar="وكلاء الصوت الذكي"
      h1Accent="AI Receptionists"
      h1AccentAr="والموظف الاستقبال الذكي"
      tagline="Intelligent voice agents that answer calls, qualify leads, and book appointments — 24/7 in Arabic and English."
      taglineAr="وكلاء صوتيون ذكيون يردون على المكالمات ويؤهّلون العملاء ويحجزون المواعيد — على مدار الساعة بالعربية والإنجليزية."
      intro="Electi AI Voice Agents replace traditional receptionists with intelligent, bilingual AI that handles unlimited simultaneous calls — never missing a customer, never putting them on hold."
      introAr="يستبدل وكلاء الصوت الذكي من إليكتي موظفي الاستقبال التقليديين بذكاء اصطناعي ثنائي اللغة ذكي يتعامل مع مكالمات متزامنة غير محدودة — لا يفوّت أبداً عميلاً ولا يضع أحداً قيد الانتظار."
      stats={[
        { value: "24/7",  label: "Call coverage",          labelAr: "تغطية المكالمات" },
        { value: "0s",    label: "Wait time",              labelAr: "وقت الانتظار" },
        { value: "∞",     label: "Simultaneous calls",     labelAr: "مكالمات متزامنة" },
        { value: "2",     label: "Languages (AR/EN)",      labelAr: "لغة (عربي/إنجليزي)" },
      ]}
      whatTitle="What Is an AI Voice Agent?"
      whatTitleAr="ما هو وكيل الصوت الذكي؟"
      whatBody="An AI Voice Agent is an intelligent telephony system powered by conversational AI that can answer incoming calls, understand natural spoken language (in Arabic and English), process the caller's request, take action, and respond — all in real time without human involvement. Electi's AI Voice Agents are configured for specific business roles: as AI receptionists that greet and direct callers, as appointment booking agents that access your calendar, or as lead qualification agents that capture and score inbound inquiries."
      whatBodyAr="وكيل الصوت الذكي هو نظام هاتفي ذكي مدعوم بذكاء اصطناعي محادثي يمكنه الرد على المكالمات الواردة وفهم اللغة المنطوقة الطبيعية (بالعربية والإنجليزية) ومعالجة طلب المتصل واتخاذ الإجراء والاستجابة — كل ذلك في الوقت الفعلي دون تدخل بشري. تم تكوين وكلاء الصوت الذكي من إليكتي لأدوار عمل محددة: كموظفي استقبال ذكيين يرحبون بالمتصلين ويوجهونهم، أو كوكلاء حجز مواعيد يصلون إلى تقويمك، أو كوكلاء تأهيل عملاء محتملين."
      steps={[
        { n: "01", title: "Define Call Flows",      titleAr: "تحديد تدفقات المكالمات", desc: "Map out how you want calls handled — greetings, FAQ responses, appointment booking, or escalation.",  descAr: "رسم مخطط كيفية التعامل مع المكالمات — التحيات والأسئلة الشائعة وحجز المواعيد أو التصعيد." },
        { n: "02", title: "Configure Voice & Tone", titleAr: "تكوين الصوت والنبرة",   desc: "Choose the agent's voice, language preference, personality, and business-specific knowledge.",        descAr: "اختر صوت الوكيل وتفضيل اللغة والشخصية والمعرفة الخاصة بعملك." },
        { n: "03", title: "Connect Your Phone",     titleAr: "ربط هاتفك",             desc: "Integrate with your existing phone system or get a new dedicated AI number in 24 hours.",              descAr: "اتكامل مع نظام هاتفك الحالي أو احصل على رقم ذكاء اصطناعي مخصص جديد خلال 24 ساعة." },
        { n: "04", title: "Go Live & Scale",        titleAr: "الإطلاق والتوسع",       desc: "Your AI receptionist goes live immediately — handling unlimited calls with consistent quality.",       descAr: "ينطلق موظف الاستقبال الذكي فوراً — يتعامل مع مكالمات غير محدودة بجودة متسقة." },
      ]}
      benefits={[
        { icon: PhoneCall,    title: "Zero Missed Calls",      titleAr: "لا مكالمات فائتة",    desc: "Every call answered instantly — no hold times, no voicemail, no missed customer opportunities.",               descAr: "كل مكالمة يُرد عليها فوراً — لا أوقات انتظار، لا بريد صوتي، لا فرص عملاء فائتة." },
        { icon: Globe,        title: "Bilingual Fluency",      titleAr: "طلاقة ثنائية اللغة", desc: "Speaks and understands Arabic (Saudi dialect) and English — switching mid-call if needed.",                    descAr: "يتحدث ويفهم العربية (اللهجة السعودية) والإنجليزية — مع تبديل في منتصف المكالمة إذا لزم." },
        { icon: Calendar,     title: "Live Appointment Booking", titleAr: "حجز مباشر للمواعيد", desc: "Connects to your calendar in real-time to book, reschedule, and confirm appointments during the call.",       descAr: "يتصل بتقويمك في الوقت الفعلي لحجز المواعيد وإعادة جدولتها وتأكيدها أثناء المكالمة." },
        { icon: Zap,          title: "Instant Responses",      titleAr: "ردود فورية",         desc: "AI responds in real-time with zero processing delay — callers get immediate, accurate answers.",               descAr: "يستجيب الذكاء الاصطناعي في الوقت الفعلي دون تأخير — يحصل المتصلون على إجابات فورية ودقيقة." },
        { icon: PhoneIncoming, title: "Smart Call Routing",    titleAr: "توجيه مكالمات ذكي", desc: "Routes callers to the right department or human agent based on intent, language, and priority.",              descAr: "يوجّه المتصلين إلى القسم المناسب أو الوكيل البشري بناءً على النية واللغة والأولوية." },
        { icon: Clock,        title: "24/7 Availability",      titleAr: "متاح على مدار الساعة", desc: "AI receptionists work nights, weekends, and public holidays — Saudi customers never get voicemail.",         descAr: "موظفو الاستقبال الذكيون يعملون ليلاً وعطل نهاية الأسبوع والإجازات الرسمية." },
      ]}
      industries={[
        { name: "Healthcare & Clinics",  nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality & Hotels",  nameAr: "الضيافة والفنادق" },
        { name: "Real Estate",           nameAr: "العقارات" },
        { name: "Legal Firms",           nameAr: "المكاتب القانونية" },
        { name: "Retail",                nameAr: "التجزئة" },
        { name: "Corporate Switchboard", nameAr: "بدالة الشركات" },
        { name: "Education",             nameAr: "التعليم" },
        { name: "Financial Services",    nameAr: "الخدمات المالية" },
      ]}
      useCases={[
        { icon: HeartPulse,   label: "Clinic Appointment Booking",  labelAr: "حجز مواعيد العيادات",   desc: "Patients call in Arabic or English. AI books appointments in your clinic calendar instantly.",               descAr: "يتصل المرضى بالعربية أو الإنجليزية. يحجز الذكاء الاصطناعي المواعيد في تقويم عيادتك فوراً." },
        { icon: Hotel,        label: "Hotel Reservations",          labelAr: "حجوزات الفنادق",        desc: "AI handles check-in inquiries, availability checks, and room bookings via voice in real-time.",             descAr: "يتعامل الذكاء الاصطناعي مع استفسارات تسجيل الوصول وفحوصات التوفر وحجوزات الغرف صوتياً." },
        { icon: Building,     label: "Real Estate Inquiry Intake",  labelAr: "استقبال استفسارات العقارات", desc: "Captures property buyer or renter details, qualifies budget, and books site visits automatically.",       descAr: "يجمع تفاصيل المشتري أو المستأجر ويؤهّل الميزانية ويحجز زيارات الموقع تلقائياً." },
        { icon: Users,        label: "Corporate Switchboard",       labelAr: "بدالة الشركات",          desc: "Routes callers to the right department based on spoken intent — no phone trees, no frustration.",          descAr: "يوجّه المتصلين إلى القسم الصحيح بناءً على النية المنطوقة — بدون قوائم هاتفية معقدة." },
        { icon: MessageSquare, label: "Legal Firm Intake",          labelAr: "استقبال المكاتب القانونية", desc: "Gathers case details, conflict checks, and books consultations for law firms and legal departments.",     descAr: "يجمع تفاصيل القضية وفحوصات التعارض ويحجز الاستشارات للمكاتب القانونية." },
        { icon: ShoppingBag,  label: "Retail Order Queries",        labelAr: "استفسارات طلبات التجزئة", desc: "Answers product questions, checks order status, and handles returns via voice — zero wait time.",          descAr: "يجيب على أسئلة المنتج ويفحص حالة الطلب ويتعامل مع المرتجعات صوتياً — صفر وقت انتظار." },
      ]}
      faqs={[
        { q: "What is an AI Voice Agent?",                  qAr: "ما هو وكيل الصوت الذكي؟",                           a: "An AI Voice Agent is an intelligent telephony system that answers calls, understands natural speech in Arabic and English, processes the caller's request, and takes action in real time without human involvement.",                                           aAr: "وكيل الصوت الذكي هو نظام هاتفي ذكي يرد على المكالمات ويفهم الكلام الطبيعي بالعربية والإنجليزية ويعالج طلب المتصل ويتخذ الإجراء في الوقت الفعلي." },
        { q: "Can the AI Voice Agent speak Arabic?",         qAr: "هل يمكن لوكيل الصوت الذكي التحدث بالعربية؟",       a: "Yes. Electi's AI Voice Agents are fully bilingual — speaking and understanding Modern Standard Arabic, Saudi dialect, and English, switching naturally based on the caller's preference.",                                                                      aAr: "نعم. وكلاء الصوت الذكي من إليكتي ثنائيو اللغة بالكامل — يتحدثون ويفهمون العربية الفصحى واللهجة السعودية والإنجليزية." },
        { q: "What is an AI Receptionist?",                  qAr: "ما هو موظف الاستقبال الذكي؟",                       a: "An AI Receptionist is an AI Voice Agent configured specifically for front-desk tasks — greeting callers, answering business questions, booking appointments, and routing calls to the right person.",                                                          aAr: "موظف الاستقبال الذكي هو وكيل صوتي ذكي مكوَّن خصيصاً لمهام الاستقبال — الترحيب بالمتصلين والإجابة على أسئلة الأعمال وحجز المواعيد وتوجيه المكالمات." },
        { q: "Can AI Voice Agents book appointments?",        qAr: "هل يمكن للوكلاء الصوتيين حجز المواعيد؟",            a: "Yes. AI Voice Agents connect to your calendar system in real time — checking availability, booking slots, sending confirmations, and setting reminders during the call.",                                                                                        aAr: "نعم. يتصل الوكلاء الصوتيون بنظام التقويم الخاص بك في الوقت الفعلي — فحص التوفر وحجز المواعيد وإرسال التأكيدات وتحديد التذكيرات أثناء المكالمة." },
        { q: "What happens when the AI can't handle a call?", qAr: "ماذا يحدث عندما لا يستطيع الذكاء الاصطناعي التعامل مع مكالمة؟", a: "When a call exceeds the AI's configured scope, it performs a warm handoff — transferring the caller to a human agent with full conversation context, so the customer never has to repeat themselves.",                                                aAr: "عندما تتجاوز مكالمة النطاق المكوَّن للذكاء الاصطناعي، يقوم بتسليم دافئ — ينقل المتصل إلى وكيل بشري مع سياق المحادثة الكامل." },
      ]}
      ctaTitle="Deploy Your AI Receptionist Today"
      ctaTitleAr="انشر موظف الاستقبال الذكي اليوم"
      ctaSub="Never miss a call again. AI voice agents answer every call instantly — 24/7, in Arabic and English."
      ctaSubAr="لا تفوّت مكالمة أبداً. يرد وكلاء الصوت الذكي على كل مكالمة فوراً — على مدار الساعة، بالعربية والإنجليزية."
    />
  );
}
