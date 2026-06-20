import { Mic, Phone, Globe, Zap, Clock, Shield, MessageSquare, HeartPulse, Hotel, Building2, ShoppingBag, Users } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Arabic Voice AI for Saudi Businesses",
    nameAr: "الذكاء الاصطناعي الصوتي العربي للشركات السعودية",
    description: "Electi's Arabic Voice AI answers calls in Saudi Arabic dialects (Najdi and Hijazi), handles inquiries, books appointments, and routes callers 24/7 — purpose-built Arabic speech recognition and synthesis for Saudi businesses.",
    descriptionAr: "يرد الذكاء الاصطناعي الصوتي العربي من إليكتي على المكالمات باللهجات العربية السعودية (النجدية والحجازية)، ويتعامل مع الاستفسارات ويحجز المواعيد ويوجّه المتصلين على مدار الساعة.",
    url: "/arabic-voice-ai",
    keywords: ["Arabic Voice AI", "Arabic voice agent Saudi Arabia", "Arabic speech recognition Saudi", "Arabic AI phone agent", "وكيل صوتي عربي", "ذكاء اصطناعي صوتي عربي", "Arabic TTS Saudi", "Saudi dialect voice AI", "Arabic AI call handling"],
  }),
  makeFaqSchema([
    { q: "Can AI answer phone calls in Arabic?", a: "Yes. Electi's Arabic Voice AI answers inbound phone calls in Arabic — using advanced Arabic speech recognition to understand what callers say in Najdi or Hijazi dialect, processing the request, and responding in natural-sounding Arabic speech. It handles appointment booking, FAQs, order status queries, and call routing without human involvement." },
    { q: "Does the Arabic Voice AI understand Saudi dialects?", a: "Yes. Electi's Arabic Voice AI is specifically trained on Saudi Arabic dialects — Najdi (Riyadh area) and Hijazi (Jeddah/Mecca/Medina area) — as well as Modern Standard Arabic. This dialect-level training is essential for natural-sounding voice interactions with Saudi callers." },
    { q: "What is Arabic Voice AI?", a: "Arabic Voice AI is an AI-powered telephony system that handles phone calls in Arabic — understanding spoken Arabic (including Saudi dialects), processing the caller's request, and responding in synthesized Arabic speech in real time. Unlike basic IVR systems with pre-recorded menus, Arabic Voice AI conducts natural conversations and takes actions." },
    { q: "Can Arabic Voice AI replace a receptionist?", a: "For high-volume, repetitive call types — appointment booking, FAQ responses, order status, department routing — Arabic Voice AI handles these calls more efficiently than human receptionists, at unlimited volume, 24/7. Complex situations requiring judgment or relationship management are escalated with full call context to human staff." },
    { q: "What is the difference between Arabic Voice AI and a basic IVR system?", a: "Traditional IVR systems use pre-recorded menus (press 1 for Arabic, press 2 for English). Arabic Voice AI conducts actual conversations — the caller speaks naturally in Arabic, the AI understands the intent, takes action, and responds. No menus, no button pressing, no frustration." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Voice Agents", url: "/ai-voice-agents" },
    { name: "Arabic Voice AI", url: "/arabic-voice-ai" },
  ]),
];

export default function ArabicVoiceAIPage() {
  return (
    <AuthorityPage
      seoTitle="Arabic Voice AI Saudi Arabia | Saudi Dialect Phone Agent | Electi"
      seoTitleAr="الذكاء الاصطناعي الصوتي العربي في المملكة | وكيل هاتفي باللهجة السعودية | إليكتي"
      seoDescription="Arabic Voice AI that answers calls in Saudi dialects (Najdi + Hijazi) — books appointments, handles inquiries, and routes callers 24/7. Purpose-built Arabic speech AI for Saudi businesses."
      seoDescriptionAr="ذكاء اصطناعي صوتي عربي يرد على المكالمات باللهجات السعودية (نجدية + حجازية) — يحجز المواعيد ويتعامل مع الاستفسارات ويوجّه المتصلين على مدار الساعة."
      seoPath="/arabic-voice-ai"
      seoKeywords="Arabic Voice AI, Arabic voice agent Saudi Arabia, Arabic speech recognition Saudi, Arabic AI phone agent, وكيل صوتي عربي, ذكاء اصطناعي صوتي عربي, Saudi dialect voice AI, Arabic AI call handling"
      seoKeywordsAr="ذكاء اصطناعي صوتي عربي، وكيل صوتي عربي، معالجة صوت عربي، وكيل هاتفي عربي ذكي، ذكاء اصطناعي لإجابة المكالمات بالعربية"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Voice Agents", labelAr: "وكلاء الصوت الذكي", href: "/ai-voice-agents" },
        { label: "Arabic Voice AI", labelAr: "الذكاء الاصطناعي الصوتي العربي", href: "/arabic-voice-ai" },
      ]}
      badge="Arabic Voice AI"
      badgeAr="الذكاء الاصطناعي الصوتي العربي"
      h1="Arabic Voice AI"
      h1Ar="الذكاء الاصطناعي الصوتي"
      h1Accent="Saudi Dialect Recognition"
      h1AccentAr="العربي — اللهجة السعودية"
      tagline="AI that answers phone calls in Najdi and Hijazi Arabic — understanding natural Saudi speech, taking action, and responding in natural Arabic. No menus. No waiting."
      taglineAr="ذكاء اصطناعي يرد على المكالمات الهاتفية بالعربية النجدية والحجازية — يفهم الكلام السعودي الطبيعي ويتخذ الإجراء ويستجيب بالعربية الطبيعية. لا قوائم. لا انتظار."
      intro="Saudi callers speak in dialect — Najdi in Riyadh, Hijazi in Jeddah. Generic Arabic speech AI built on formal Modern Standard Arabic fails with these callers. Electi's Arabic Voice AI is specifically trained on Saudi dialects, delivering natural-sounding voice interactions that Saudi customers experience as genuinely helpful — not robotic."
      introAr="يتحدث المتصلون السعوديون باللهجة — النجدية في الرياض، والحجازية في جدة. يفشل الذكاء الاصطناعي الصوتي العربي العام المبني على العربية الفصحى الرسمية مع هؤلاء المتصلين. الذكاء الاصطناعي الصوتي العربي من إليكتي مدرَّب تحديداً على اللهجات السعودية، يقدم تفاعلات صوتية طبيعية يختبرها العملاء السعوديون كمفيدة فعلاً — ليست روبوتية."
      stats={[
        { value: "2",    label: "Saudi dialects (Najdi + Hijazi)",    labelAr: "لهجتان سعوديتان" },
        { value: "24/7", label: "Arabic call coverage",               labelAr: "تغطية مكالمات عربية" },
        { value: "0s",   label: "Call answering time",                labelAr: "وقت الرد على المكالمات" },
        { value: "∞",    label: "Simultaneous Arabic calls",          labelAr: "مكالمات عربية متزامنة" },
      ]}
      whatTitle="What Is Arabic Voice AI?"
      whatTitleAr="ما هو الذكاء الاصطناعي الصوتي العربي؟"
      whatBody="Arabic Voice AI is an AI-powered telephony system that handles phone calls in Arabic — using advanced Arabic Automatic Speech Recognition (ASR) to understand what the caller says in Najdi or Hijazi dialect, a large language model to process the intent and determine the response, and Arabic Text-to-Speech (TTS) synthesis to respond in natural-sounding Arabic speech. Unlike basic IVR systems that play pre-recorded menus (اضغط 1 للعربية), Electi's Arabic Voice AI conducts genuine conversations — the caller speaks naturally, the AI understands, takes action, and responds. For Saudi businesses, this means every Arabic phone call is answered instantly, in the caller's dialect, by an AI that sounds and responds like a natural Arabic speaker."
      whatBodyAr="الذكاء الاصطناعي الصوتي العربي هو نظام هاتفي مدعوم بالذكاء الاصطناعي يتعامل مع المكالمات الهاتفية بالعربية — باستخدام التعرف التلقائي على الكلام العربي المتقدم (ASR) لفهم ما يقوله المتصل باللهجة النجدية أو الحجازية، ونموذج لغوي كبير لمعالجة النية وتحديد الاستجابة، وتوليف العربية إلى نص (TTS) للاستجابة بكلام عربي طبيعي. على عكس أنظمة IVR الأساسية، يُجري الذكاء الاصطناعي الصوتي العربي من إليكتي محادثات حقيقية."
      steps={[
        { n: "01", title: "Call Flow Design in Arabic", titleAr: "تصميم تدفق المكالمة بالعربية", desc: "Map your call handling scenarios — appointment booking, FAQ responses, routing, and escalation — all in Arabic.", descAr: "رسم مخطط سيناريوهات التعامل مع المكالمات — حجز المواعيد والأسئلة الشائعة والتوجيه والتصعيد — كلها بالعربية." },
        { n: "02", title: "Dialect Configuration",     titleAr: "تكوين اللهجة",              desc: "Set primary dialect (Najdi or Hijazi) — the AI calibrates pronunciation, comprehension, and tone accordingly.", descAr: "تعيين اللهجة الأساسية (النجدية أو الحجازية) — يعاير الذكاء الاصطناعي النطق والفهم والنبرة وفقاً لذلك." },
        { n: "03", title: "Phone Number Connection",   titleAr: "ربط رقم الهاتف",            desc: "Connect your existing phone number or provision a new dedicated AI number within 24 hours.", descAr: "ربط رقم هاتفك الحالي أو توفير رقم ذكاء اصطناعي مخصص جديد خلال 24 ساعة." },
        { n: "04", title: "Live Arabic Call Handling", titleAr: "إجابة مكالمات عربية مباشرة", desc: "Every Arabic call answered instantly — 24/7 in Saudi dialect — with handoff to human staff when needed.", descAr: "كل مكالمة عربية يُرد عليها فوراً — على مدار الساعة باللهجة السعودية — مع التسليم لموظفين بشريين عند الحاجة." },
      ]}
      benefits={[
        { icon: Mic,          title: "Najdi + Hijazi ASR",            titleAr: "تعرف على الكلام النجدي + الحجازي",  desc: "Arabic speech recognition trained specifically on Saudi dialects — not just formal Modern Standard Arabic.", descAr: "التعرف على الكلام العربي مدرَّب تحديداً على اللهجات السعودية — لا مجرد العربية الفصحى الرسمية." },
        { icon: Globe,        title: "Natural Arabic TTS",            titleAr: "تحويل نص عربي طبيعي إلى كلام",     desc: "Responds in natural-sounding Arabic speech — not robotic synthesized voice that callers reject.", descAr: "يستجيب بكلام عربي طبيعي الصوت — لا صوت آلي مُولَّد يرفضه المتصلون." },
        { icon: Phone,        title: "Zero Missed Calls",             titleAr: "لا مكالمات فائتة",                  desc: "Every Arabic phone call answered immediately — no hold times, no voicemail, no missed opportunity.", descAr: "كل مكالمة هاتفية عربية يُرد عليها فوراً — لا أوقات انتظار، لا بريد صوتي، لا فرص فائتة." },
        { icon: Clock,        title: "24/7 Arabic Call Center",       titleAr: "مركز مكالمات عربي على مدار الساعة", desc: "Handles Arabic calls nights, weekends, Eid, and Hajj season — unlimited simultaneous calls.", descAr: "يتعامل مع المكالمات العربية ليلاً وعطل نهاية الأسبوع والعيد وموسم الحج — مكالمات متزامنة غير محدودة." },
        { icon: Zap,          title: "Real-Time Action",              titleAr: "إجراء في الوقت الفعلي",             desc: "Books appointments, retrieves order status, routes callers — all within the Arabic voice call.", descAr: "يحجز المواعيد ويسترد حالة الطلب ويوجّه المتصلين — كل ذلك خلال المكالمة الصوتية العربية." },
        { icon: MessageSquare, title: "Warm Human Handoff",           titleAr: "تسليم بشري دافئ",                   desc: "Complex calls transferred to human staff with full Arabic conversation transcript — caller never repeats.", descAr: "المكالمات المعقدة تُنقَل لموظفين مع نسخة المحادثة العربية الكاملة — المتصل لا يُكرر نفسه أبداً." },
      ]}
      industries={[
        { name: "Healthcare & Clinics",    nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality & Hotels",    nameAr: "الضيافة والفنادق" },
        { name: "Real Estate",             nameAr: "العقارات" },
        { name: "Legal Firms",             nameAr: "المكاتب القانونية" },
        { name: "Retail & E-commerce",     nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Government Services",     nameAr: "الخدمات الحكومية" },
        { name: "Education",               nameAr: "التعليم" },
        { name: "Financial Services",      nameAr: "الخدمات المالية" },
      ]}
      useCases={[
        { icon: HeartPulse,  label: "Arabic Clinic Call Answering",  labelAr: "إجابة مكالمات العيادات بالعربية",    desc: "Patient calls in Riyadh or Jeddah answered in their dialect — appointments booked in the same call.",     descAr: "مكالمات المرضى في الرياض أو جدة يُرد عليها بلهجتهم — المواعيد محجوزة في نفس المكالمة." },
        { icon: Hotel,       label: "Hotel Arabic Call Handling",    labelAr: "معالجة مكالمات الفندق بالعربية",    desc: "Arabic-speaking guests call for reservations, room service, or checkout — AI handles all in dialect.",    descAr: "يتصل الضيوف الناطقون بالعربية للحجوزات وخدمة الغرف أو المغادرة — يتعامل الذكاء الاصطناعي بكل شيء." },
        { icon: Building2,   label: "Corporate Arabic Switchboard",  labelAr: "بدالة الشركات العربية",             desc: "Arabic callers routed to the right department via natural voice — no IVR trees or button presses.",       descAr: "توجيه المتصلين العرب إلى القسم الصحيح عبر الصوت الطبيعي — بلا قوائم IVR أو ضغط أزرار." },
        { icon: ShoppingBag, label: "Retail Arabic Order Status",    labelAr: "حالة طلب التجزئة بالعربية",         desc: "Customer calls to check order status in Arabic — AI retrieves from OMS and responds in their dialect.",  descAr: "يتصل العميل للتحقق من حالة الطلب بالعربية — يسترد الذكاء الاصطناعي من نظام إدارة الطلبات ويستجيب." },
        { icon: Users,       label: "Government Arabic Info Lines",  labelAr: "خطوط معلومات حكومية عربية",         desc: "Citizens call government agencies in Arabic — AI provides information, forms guidance, and routing.",     descAr: "يتصل المواطنون بالجهات الحكومية بالعربية — يقدم الذكاء الاصطناعي المعلومات وإرشادات النماذج والتوجيه." },
        { icon: Phone,       label: "Arabic Emergency Triage",       labelAr: "فرز طوارئ عربي",                    desc: "High-priority Arabic call routing based on urgency — critical calls escalated to human staff instantly.", descAr: "توجيه المكالمات العربية ذات الأولوية العالية بناءً على الإلحاح — المكالمات الحرجة تُصعَّد فوراً." },
      ]}
      faqs={[
        { q: "Can AI answer phone calls in Arabic?",                          qAr: "هل يمكن للذكاء الاصطناعي الرد على المكالمات الهاتفية بالعربية؟",                   a: "Yes. Electi's Arabic Voice AI answers inbound phone calls in Arabic — understanding Najdi and Hijazi dialects, processing the caller's request, and responding in natural-sounding Arabic speech in real time.", aAr: "نعم. يرد الذكاء الاصطناعي الصوتي العربي من إليكتي على المكالمات الواردة بالعربية — يفهم اللهجتين النجدية والحجازية ويعالج طلب المتصل ويستجيب بكلام عربي طبيعي." },
        { q: "Does the Arabic Voice AI understand Saudi dialects?",           qAr: "هل يفهم الذكاء الاصطناعي الصوتي العربي اللهجات السعودية؟",                       a: "Yes. Electi's Arabic Voice AI is trained on Najdi Arabic (Riyadh dialect) and Hijazi Arabic (Jeddah/Mecca/Medina dialect) — delivering accurate understanding of how Saudi nationals actually speak, not just formal Modern Standard Arabic.", aAr: "نعم. الذكاء الاصطناعي الصوتي العربي من إليكتي مدرَّب على العربية النجدية (لهجة الرياض) والحجازية (لهجة جدة/مكة/المدينة)." },
        { q: "What is the difference between Arabic Voice AI and basic IVR?", qAr: "ما الفرق بين الذكاء الاصطناعي الصوتي العربي ونظام IVR الأساسي؟",                a: "Traditional IVR plays pre-recorded menus (press 1 for Arabic). Arabic Voice AI conducts actual conversations — the caller speaks naturally in Arabic, the AI understands the intent, takes action, and responds without menus or button pressing.", aAr: "تُشغِّل IVR التقليدية قوائم مسجَّلة مسبقاً. يُجري الذكاء الاصطناعي الصوتي العربي محادثات حقيقية — يتكلم المتصل بالعربية الطبيعية، يفهم الذكاء الاصطناعي النية ويتخذ الإجراء." },
        { q: "Can Arabic Voice AI book appointments during a call?",          qAr: "هل يمكن للذكاء الاصطناعي الصوتي العربي حجز المواعيد أثناء المكالمة؟",          a: "Yes. While the caller speaks in Arabic, Electi's Voice AI simultaneously accesses your calendar, checks availability, books the appointment, and confirms it verbally — all within the same call. No callbacks or follow-up required.", aAr: "نعم. أثناء تحدث المتصل بالعربية، يصل الذكاء الاصطناعي الصوتي في نفس الوقت إلى تقويمك ويتحقق من التوفر ويحجز الموعد ويؤكده شفهياً — كل ذلك في نفس المكالمة." },
        { q: "Can Arabic Voice AI handle calls in both Arabic and English?",  qAr: "هل يمكن للذكاء الاصطناعي الصوتي العربي التعامل مع المكالمات بالعربية والإنجليزية؟", a: "Yes. Electi's Arabic Voice AI is bilingual — answering in Arabic when called in Arabic, and in English when called in English. It can also switch mid-call if the caller changes language.", aAr: "نعم. الذكاء الاصطناعي الصوتي العربي من إليكتي ثنائي اللغة — يرد بالعربية عند الاتصال بالعربية وبالإنجليزية عند الاتصال بالإنجليزية. يمكنه أيضاً التبديل في منتصف المكالمة." },
      ]}
      ctaTitle="Deploy Arabic Voice AI for Your Business"
      ctaTitleAr="انشر الذكاء الاصطناعي الصوتي العربي لشركتك"
      ctaSub="Arabic Voice AI that answers calls in Najdi and Hijazi dialect — 24/7, with zero hold time and natural-sounding speech."
      ctaSubAr="ذكاء اصطناعي صوتي عربي يرد على المكالمات باللهجة النجدية والحجازية — على مدار الساعة، بلا وقت انتظار وكلام طبيعي الصوت."
    />
  );
}
