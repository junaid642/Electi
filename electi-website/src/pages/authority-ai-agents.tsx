import { Bot, Zap, Globe, Clock, MessageCircle, BarChart, Shield, Users, HeartPulse, Building, HardHat, Hotel } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Agents for Saudi Businesses",
    nameAr: "وكلاء الذكاء الاصطناعي للشركات السعودية",
    description: "Electi provides AI agents that automate customer service, sales, HR, and business operations for Saudi businesses via WhatsApp and voice — bilingual Arabic & English.",
    descriptionAr: "تقدم إليكتي وكلاء ذكاء اصطناعي لأتمتة خدمة العملاء والمبيعات والموارد البشرية والعمليات التجارية للشركات السعودية عبر واتساب والصوت.",
    url: "/ai-agents",
    keywords: ["AI agents Saudi Arabia", "AI workforce", "WhatsApp AI agents", "conversational AI", "وكلاء الذكاء الاصطناعي", "الموظف الذكي", "ذكاء اصطناعي الرياض"],
  }),
  makeFaqSchema([
    { q: "What is an AI Agent?", a: "An AI Agent is an autonomous software system that performs business tasks intelligently — answering queries, qualifying leads, managing schedules, and automating workflows — without constant human intervention. Electi's AI agents operate 24/7 via WhatsApp and voice." },
    { q: "Are Electi AI Agents available in Arabic?", a: "Yes. All Electi AI agents are fully bilingual — Arabic and English. They understand Saudi Arabic dialects and respond naturally in the user's preferred language, with seamless mid-conversation language switching." },
    { q: "How quickly can I deploy an AI Agent?", a: "Most Electi AI agent deployments go live within 24-48 hours. The process involves connecting your WhatsApp Business account, configuring workflows, and training the agent on your business knowledge base." },
    { q: "What is the difference between an AI Agent and a chatbot?", a: "Traditional chatbots follow rigid decision trees. AI agents reason, adapt, and take actions across multiple steps and systems. An Electi AI agent can qualify a lead, check your calendar, book an appointment, and send a confirmation invoice — all in one conversation." },
    { q: "Is Electi compliant with Saudi Arabia's data protection laws?", a: "Yes. Electi is built with PDPL (Personal Data Protection Law) compliance, using AES-256 encryption, Saudi data residency, and a strict zero-data-selling policy." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }]),
];

export default function AIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="AI Agents Saudi Arabia | Electi — AI Workforce for Businesses"
      seoTitleAr="وكلاء الذكاء الاصطناعي في المملكة العربية السعودية | إليكتي — قوى العمل الذكية"
      seoDescription="Deploy AI agents for your Saudi business — customer support, sales, HR, and operations automation via WhatsApp. Bilingual Arabic & English. Based in Riyadh."
      seoDescriptionAr="انشر وكلاء الذكاء الاصطناعي لعملك السعودي — أتمتة خدمة العملاء والمبيعات والموارد البشرية والعمليات عبر واتساب. ثنائي اللغة عربي وإنجليزي. مقرها الرياض."
      seoPath="/ai-agents"
      seoKeywords="AI agents Saudi Arabia, AI agents Riyadh, AI agents Jeddah, WhatsApp AI agents, bilingual AI Arabic English, Electi AI agents, وكلاء الذكاء الاصطناعي, الموظف الذكي"
      seoKeywordsAr="وكلاء الذكاء الاصطناعي، الموظف الذكي، وكيل ذكاء اصطناعي، ذكاء اصطناعي الرياض، ذكاء اصطناعي جدة، الأتمتة بالذكاء الاصطناعي"
      schemas={schemas}
      badge="AI Agents"
      badgeAr="وكلاء الذكاء الاصطناعي"
      h1="AI Agents for"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="Saudi Businesses"
      h1AccentAr="للشركات السعودية"
      tagline="Replace repetitive work with intelligent AI agents that operate 24/7 — via WhatsApp, voice, and your existing systems."
      taglineAr="استبدل العمل المتكرر بوكلاء ذكاء اصطناعي يعملون على مدار الساعة — عبر واتساب والصوت وأنظمتك الحالية."
      intro="Electi's AI agents are autonomous AI employees that handle customer service, sales, HR, billing, and operations — in Arabic and English — without human intervention."
      introAr="وكلاء إليكتي موظفون ذكاء اصطناعي مستقلون يتولون خدمة العملاء والمبيعات والموارد البشرية والفوترة والعمليات — بالعربية والإنجليزية — دون تدخل بشري."
      stats={[
        { value: "24/7", label: "Always operating",  labelAr: "يعمل دائماً" },
        { value: "<48h", label: "Deployment time",    labelAr: "وقت النشر" },
        { value: "2",    label: "Languages (AR/EN)",  labelAr: "لغة (عربي/إنجليزي)" },
        { value: "6+",   label: "Industries served",  labelAr: "قطاع يُخدم" },
      ]}
      whatTitle="What Is an AI Agent?"
      whatTitleAr="ما هو وكيل الذكاء الاصطناعي؟"
      whatBody="An AI Agent is an autonomous software system powered by large language models (LLMs) that can perceive its environment, reason about tasks, and take actions to achieve specific business goals. Unlike simple chatbots, AI agents handle multi-step workflows, integrate with external systems (CRM, email, WhatsApp), and operate continuously without human oversight. Electi's AI agents are purpose-built for Saudi businesses — bilingual in Arabic and English, WhatsApp-native, and trained on your specific business knowledge."
      whatBodyAr="وكيل الذكاء الاصطناعي هو نظام برمجي مستقل مدعوم بنماذج لغوية كبيرة (LLMs) يمكنه إدراك بيئته والتفكير في المهام واتخاذ الإجراءات لتحقيق أهداف عمل محددة. على عكس روبوتات الدردشة البسيطة، يتعامل وكلاء الذكاء الاصطناعي مع مسارات عمل متعددة الخطوات ويتكاملون مع الأنظمة الخارجية ويعملون باستمرار دون إشراف بشري. وكلاء إليكتي مصممون خصيصاً للشركات السعودية — ثنائيو اللغة بالعربية والإنجليزية وأصيلو التكامل مع واتساب ومدرَّبون على معرفة عملك المحدد."
      steps={[
        { n: "01", title: "Connect WhatsApp",     titleAr: "ربط واتساب",      desc: "Link your WhatsApp Business number in 60 seconds. The agent immediately starts learning your patterns.",                                                 descAr: "اربط رقم واتساب للأعمال في 60 ثانية. يبدأ الوكيل فوراً في تعلم أنماط عملك." },
        { n: "02", title: "Configure Your Agent", titleAr: "تكوين وكيلك",     desc: "Define your business rules, FAQs, escalation paths, and workflows through our simple dashboard.",                                                       descAr: "حدد قواعد عملك والأسئلة الشائعة ومسارات التصعيد وسير العمل من خلال لوحة التحكم البسيطة." },
        { n: "03", title: "Deploy & Go Live",     titleAr: "النشر والإطلاق",  desc: "Your AI agent goes live within 24-48 hours, handling customer queries, appointments, and workflows automatically.",                                     descAr: "ينطلق وكيل الذكاء الاصطناعي خلال 24-48 ساعة، يتعامل مع استفسارات العملاء والمواعيد وسير العمل تلقائياً." },
        { n: "04", title: "Monitor & Optimize",   titleAr: "المراقبة والتحسين", desc: "Track performance via your real-time dashboard. Refine agent behavior based on analytics and customer feedback.",                                      descAr: "تتبع الأداء عبر لوحة المعلومات الفورية. حسّن سلوك الوكيل بناءً على التحليلات وتغذية العملاء الراجعة." },
      ]}
      benefits={[
        { icon: Clock,         title: "24/7 Operations",         titleAr: "عمليات على مدار الساعة",      desc: "AI agents never sleep. They handle customer queries, bookings, and support at 3am just as effectively as 3pm.",                                   descAr: "وكلاء الذكاء الاصطناعي لا ينامون. يتعاملون مع الاستفسارات والحجوزات والدعم في أي وقت بنفس الكفاءة." },
        { icon: Globe,         title: "Bilingual Arabic & English", titleAr: "ثنائي اللغة عربي وإنجليزي", desc: "Fluent in Modern Standard Arabic, Saudi dialect, and English — switching seamlessly mid-conversation.",                                            descAr: "يتقن العربية الفصحى واللهجة السعودية والإنجليزية — مع تبديل سلس في منتصف المحادثة." },
        { icon: MessageCircle, title: "WhatsApp-Native",          titleAr: "أصيل واتساب",                 desc: "Operates directly in WhatsApp Business — where your customers already are. No new app to install.",                                               descAr: "يعمل مباشرة في واتساب للأعمال — حيث يتواجد عملاؤك. لا حاجة لتثبيت تطبيق جديد." },
        { icon: Zap,           title: "Fast Deployment",          titleAr: "نشر سريع",                   desc: "Go from sign-up to live AI agent in under 48 hours. No lengthy integrations or IT projects required.",                                          descAr: "انتقل من التسجيل إلى وكيل ذكاء اصطناعي حي في أقل من 48 ساعة. لا تكاملات طويلة مطلوبة." },
        { icon: BarChart,      title: "Real-Time Analytics",      titleAr: "تحليلات فورية",               desc: "Full visibility into every conversation, task completed, and hour saved. Weekly automated reports.",                                              descAr: "رؤية كاملة لكل محادثة ومهمة مكتملة وساعة موفَّرة. تقارير أسبوعية تلقائية." },
        { icon: Shield,        title: "Enterprise Security",      titleAr: "أمان مؤسسي",                 desc: "AES-256 encryption, Saudi data residency, PDPL-compliant architecture, and zero data selling policy.",                                          descAr: "تشفير AES-256 وإقامة البيانات السعودية وبنية متوافقة مع PDPL وسياسة عدم بيع البيانات." },
      ]}
      industries={[
        { name: "Healthcare",         nameAr: "الرعاية الصحية" },
        { name: "Real Estate",        nameAr: "العقارات" },
        { name: "Hospitality",        nameAr: "الضيافة" },
        { name: "Retail",             nameAr: "التجزئة" },
        { name: "Construction",       nameAr: "البناء" },
        { name: "Corporate",          nameAr: "الشركات" },
        { name: "Financial Services", nameAr: "الخدمات المالية" },
        { name: "Education",          nameAr: "التعليم" },
        { name: "Legal",              nameAr: "القانوني" },
        { name: "Logistics",          nameAr: "اللوجستيات" },
      ]}
      useCases={[
        { icon: Users,        label: "Lead Qualification",   labelAr: "تأهيل العملاء المحتملين",  desc: "AI agents instantly qualify inbound leads 24/7, collecting contact details, budget, and requirements via WhatsApp.",                                   descAr: "يؤهّل الوكلاء العملاء المحتملين فوراً على مدار الساعة عبر واتساب." },
        { icon: HeartPulse,   label: "Appointment Booking",  labelAr: "حجز المواعيد",              desc: "Automated appointment scheduling, reminders, and rescheduling — zero human involvement needed.",                                                      descAr: "جدولة المواعيد والتذكيرات وإعادة الجدولة تلقائياً دون تدخل بشري." },
        { icon: MessageCircle, label: "Customer Support",    labelAr: "خدمة العملاء",             desc: "Resolves FAQs, product queries, and complaints instantly. Escalates complex issues to the right human team.",                                          descAr: "يحل الأسئلة الشائعة واستفسارات المنتجات والشكاوى فوراً ويصعّد القضايا المعقدة." },
        { icon: Building,     label: "Invoice & Billing",    labelAr: "الفواتير والفوترة",         desc: "Sends invoices, tracks payments, follows up on overdue accounts, and processes payment confirmations automatically.",                                   descAr: "يرسل الفواتير ويتتبع المدفوعات ويتابع الحسابات المتأخرة تلقائياً." },
        { icon: HardHat,      label: "HR & Onboarding",      labelAr: "الموارد البشرية والتوجيه", desc: "Screens applicants, schedules interviews, sends offer letters, and manages employee onboarding workflows.",                                            descAr: "يفحص المتقدمين ويجدول المقابلات ويرسل عروض العمل ويدير سير عمل التوجيه." },
        { icon: Hotel,        label: "Reservations",         labelAr: "الحجوزات",                 desc: "Handles hotel, clinic, restaurant, and venue reservations end-to-end via WhatsApp — in Arabic and English.",                                          descAr: "يتعامل مع حجوزات الفنادق والعيادات والمطاعم والمرافق بالكامل عبر واتساب." },
      ]}
      faqs={[
        { q: "What is an AI Agent?",                              qAr: "ما هو وكيل الذكاء الاصطناعي؟",                                             a: "An AI Agent is an autonomous software system that performs business tasks intelligently — answering queries, qualifying leads, managing schedules, and automating workflows — without constant human intervention.",                                                                                  aAr: "وكيل الذكاء الاصطناعي هو نظام برمجي مستقل يؤدي المهام التجارية بذكاء — الإجابة على الاستفسارات وتأهيل العملاء وإدارة الجداول وأتمتة سير العمل — دون تدخل بشري مستمر." },
        { q: "Are Electi AI Agents available in Arabic?",         qAr: "هل وكلاء إليكتي متاحون باللغة العربية؟",                                    a: "Yes. All Electi AI agents are fully bilingual — Arabic and English. They understand Saudi Arabic dialects and respond naturally in the user's preferred language, with seamless mid-conversation language switching.",                                                                                aAr: "نعم. جميع وكلاء إليكتي ثنائيو اللغة بالكامل — عربي وإنجليزي. يفهمون اللهجات العربية السعودية ويستجيبون بشكل طبيعي بلغة المستخدم المفضلة." },
        { q: "How quickly can I deploy an AI Agent?",             qAr: "كم من الوقت يستغرق نشر وكيل الذكاء الاصطناعي؟",                           a: "Most Electi AI agent deployments go live within 24-48 hours. The process involves connecting your WhatsApp Business account, configuring workflows, and training the agent on your business knowledge base.",                                                                                        aAr: "تنطلق معظم عمليات نشر وكلاء إليكتي خلال 24-48 ساعة. تتضمن العملية ربط حساب واتساب للأعمال وتكوين سير العمل وتدريب الوكيل." },
        { q: "What is the difference between an AI Agent and a chatbot?", qAr: "ما الفرق بين وكيل الذكاء الاصطناعي وروبوت الدردشة؟",            a: "Traditional chatbots follow rigid decision trees. AI agents reason, adapt, and take actions across multiple steps. An Electi AI agent can qualify a lead, check your calendar, book an appointment, and send a confirmation — all in one conversation.",                                          aAr: "تتبع روبوتات الدردشة التقليدية أشجار قرار صارمة. يمكن لوكلاء الذكاء الاصطناعي التفكير والتكيف واتخاذ الإجراءات عبر خطوات متعددة في محادثة واحدة." },
        { q: "Is Electi compliant with Saudi Arabia's PDPL?",     qAr: "هل إليكتي متوافقة مع نظام حماية البيانات الشخصية السعودي؟",               a: "Yes. Electi is built with PDPL compliance in mind, using AES-256 encryption, Saudi data residency, and a strict zero-data-selling policy.",                                                                                                                                                      aAr: "نعم. تم بناء إليكتي مع مراعاة الامتثال لنظام PDPL، باستخدام تشفير AES-256 وإقامة البيانات السعودية وسياسة صارمة لعدم بيع البيانات." },
      ]}
      ctaTitle="Deploy Your AI Agent Today"
      ctaTitleAr="انشر وكيل الذكاء الاصطناعي الخاص بك اليوم"
      ctaSub="Join Saudi businesses already automating operations with Electi AI agents. Setup in under 48 hours."
      ctaSubAr="انضم إلى الشركات السعودية التي تعمل بالفعل على أتمتة عملياتها مع وكلاء إليكتي. الإعداد في أقل من 48 ساعة."
    />
  );
}
