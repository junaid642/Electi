import { Users, FileText, Calendar, CheckCircle, MessageCircle, Globe, Clock, BarChart, Shield, Bot, Briefcase, HardHat } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI HR Agents",
    nameAr: "وكلاء الموارد البشرية الذكي",
    description: "Electi's AI HR Agents automate recruitment, onboarding, leave management, and HR operations for Saudi businesses — bilingual Arabic & English via WhatsApp.",
    descriptionAr: "يؤتمت وكلاء الموارد البشرية الذكيون من إليكتي التوظيف والتوجيه وإدارة الإجازات وعمليات الموارد البشرية للشركات السعودية.",
    url: "/ai-hr-agents",
    keywords: ["AI HR agents Saudi Arabia", "HR automation", "AI recruitment", "AI onboarding", "وكيل الموارد البشرية الذكي", "أتمتة الموارد البشرية", "توظيف ذكي"],
  }),
  makeFaqSchema([
    { q: "What is an AI HR Agent?", a: "An AI HR Agent is an autonomous AI system that handles human resources tasks — screening CVs, scheduling interviews, managing onboarding, processing leave requests, and answering employee HR queries — via WhatsApp or voice." },
    { q: "Can AI HR Agents screen Arabic CVs?", a: "Yes. Electi's AI HR Agents process CVs in Arabic and English, extracting relevant qualifications, experience, and skills to rank candidates against job requirements." },
    { q: "What HR tasks can be automated with AI?", a: "Recruitment screening, interview scheduling, offer letter generation, onboarding documentation, leave management, policy FAQs, payroll queries, and employee satisfaction surveys can all be automated." },
    { q: "Is employee HR data secure with AI HR Agents?", a: "Yes. All employee data is encrypted with AES-256, stored in Saudi-compliant infrastructure, access-controlled by role, and handled in compliance with Saudi labor law and PDPL regulations." },
    { q: "How does AI HR handle onboarding?", a: "The AI HR Agent sends onboarding documents, collects required information, schedules orientation sessions, answers new hire questions, and tracks completion — entirely via WhatsApp without HR staff involvement." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "AI HR Agents", url: "/ai-hr-agents" }]),
];

export default function AIHRAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="AI HR Agents Saudi Arabia | Electi — HR Automation & Recruitment AI"
      seoTitleAr="وكلاء الموارد البشرية الذكي في المملكة | إليكتي — أتمتة الموارد البشرية والتوظيف الذكي"
      seoDescription="AI HR agents that automate recruitment, onboarding, leave management, and HR operations for Saudi businesses — bilingual Arabic & English via WhatsApp."
      seoDescriptionAr="وكلاء موارد بشرية ذكيون يؤتمتون التوظيف والتوجيه وإدارة الإجازات وعمليات الموارد البشرية للشركات السعودية — ثنائي اللغة عبر واتساب."
      seoPath="/ai-hr-agents"
      seoKeywords="AI HR agents Saudi Arabia, HR automation Riyadh, AI recruitment, AI onboarding Arabic, وكيل الموارد البشرية الذكي, أتمتة الموارد البشرية, توظيف ذكي"
      seoKeywordsAr="وكيل الموارد البشرية الذكي، أتمتة الموارد البشرية، توظيف بالذكاء الاصطناعي، إدارة الإجازات الذكية، إعداد الموظفين الجدد"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "AI HR Agents", labelAr: "وكلاء الموارد البشرية", href: "/ai-hr-agents" },
      ]}
      badge="AI HR Agents"
      badgeAr="وكلاء الموارد البشرية الذكي"
      h1="AI Agents for"
      h1Ar="وكلاء ذكاء اصطناعي"
      h1Accent="Human Resources"
      h1AccentAr="للموارد البشرية"
      tagline="Automate recruitment, onboarding, leave management, and HR operations with intelligent AI agents."
      taglineAr="أتمتة التوظيف والتوجيه وإدارة الإجازات وعمليات الموارد البشرية بوكلاء ذكاء اصطناعي."
      intro="Electi AI HR Agents reduce HR workload by 60-80% — handling recruitment screening, onboarding, leave requests, and employee queries automatically in Arabic and English."
      introAr="يقلل وكلاء الموارد البشرية الذكيون من إليكتي عبء العمل بنسبة 60-80٪ — يتعاملون مع فرز التوظيف والتوجيه وطلبات الإجازة واستفسارات الموظفين تلقائياً بالعربية والإنجليزية."
      stats={[
        { value: "80%",  label: "HR task automation",      labelAr: "أتمتة مهام الموارد البشرية" },
        { value: "70%",  label: "Faster recruitment cycle", labelAr: "دورة توظيف أسرع" },
        { value: "24/7", label: "Employee query support",   labelAr: "دعم استفسارات الموظفين" },
        { value: "0",    label: "Paperwork backlogs",       labelAr: "تراكم الأوراق" },
      ]}
      whatTitle="What Is an AI HR Agent?"
      whatTitleAr="ما هو وكيل الموارد البشرية الذكي؟"
      whatBody="An AI HR Agent is an autonomous AI system that manages the administrative and process-driven functions of your HR department. From receiving and screening job applications (in Arabic and English) to scheduling interviews, sending offer letters, managing employee onboarding, processing leave requests, answering HR policy questions, and conducting satisfaction surveys — all via WhatsApp. Electi AI HR Agents free your HR team to focus on people strategy and culture while AI handles the paperwork."
      whatBodyAr="وكيل الموارد البشرية الذكي هو نظام ذكاء اصطناعي مستقل يدير الوظائف الإدارية والإجرائية لقسم الموارد البشرية. من استقبال طلبات التوظيف وفرزها (بالعربية والإنجليزية) إلى جدولة المقابلات وإرسال خطابات العروض وإدارة تأهيل الموظفين الجدد ومعالجة طلبات الإجازة والإجابة على أسئلة السياسات وإجراء استطلاعات الرضا — كل ذلك عبر واتساب."
      steps={[
        { n: "01", title: "Define HR Workflows",   titleAr: "تحديد سير عمل الموارد البشرية", desc: "Map recruitment, onboarding, leave, and policy workflows for the AI to automate.",                         descAr: "حدد سير عمل التوظيف والتأهيل والإجازات والسياسات التي سيؤتمتها الذكاء الاصطناعي." },
        { n: "02", title: "Upload HR Knowledge",   titleAr: "رفع معرفة الموارد البشرية",    desc: "Load your HR policies, job descriptions, onboarding docs, and company handbook into the agent.",           descAr: "حمّل سياسات الموارد البشرية والتوصيفات الوظيفية ووثائق التأهيل ودليل الشركة." },
        { n: "03", title: "Connect Systems",       titleAr: "ربط الأنظمة",                  desc: "Integrate with your HRIS, calendar, email, and WhatsApp for seamless automated workflows.",                 descAr: "اتكامل مع نظام المعلومات البشرية وتقويمك وبريدك الإلكتروني وواتساب لسير عمل تلقائي سلس." },
        { n: "04", title: "Deploy & Automate",     titleAr: "النشر والأتمتة",               desc: "HR agent goes live — handling recruitment, onboarding, and queries automatically from day one.",            descAr: "ينطلق وكيل الموارد البشرية — يتعامل مع التوظيف والتأهيل والاستفسارات تلقائياً من اليوم الأول." },
      ]}
      benefits={[
        { icon: Users,        title: "Automated Recruitment",    titleAr: "توظيف آلي",                   desc: "Screens CVs, scores candidates, schedules interviews, and sends rejections/acceptances automatically.",        descAr: "يفرز السير الذاتية ويقيّم المرشحين ويجدول المقابلات ويرسل قرارات القبول والرفض تلقائياً." },
        { icon: FileText,     title: "Onboarding Automation",    titleAr: "أتمتة التأهيل",               desc: "Sends welcome packages, collects documents, schedules orientation, and answers new-hire questions.",          descAr: "يرسل حزم الترحيب ويجمع المستندات ويجدول التوجيه ويجيب على أسئلة الموظفين الجدد." },
        { icon: Calendar,     title: "Leave Management",         titleAr: "إدارة الإجازات",              desc: "Processes leave requests, checks eligibility, updates balances, and notifies managers automatically.",        descAr: "يعالج طلبات الإجازة ويفحص الأهلية ويحدث الأرصدة وينبّه المديرين تلقائياً." },
        { icon: MessageCircle, title: "Employee Query Bot",      titleAr: "روبوت استفسارات الموظفين",    desc: "Answers HR policy questions, payroll queries, and benefits information 24/7 via WhatsApp.",                  descAr: "يجيب على أسئلة سياسة الموارد البشرية واستفسارات الرواتب ومعلومات المزايا على مدار الساعة." },
        { icon: Globe,        title: "Arabic-English HR",        titleAr: "موارد بشرية عربية-إنجليزية",  desc: "Processes Arabic CVs, conducts interviews in Saudi dialect, and communicates policies bilingually.",         descAr: "يعالج السير الذاتية بالعربية ويجري المقابلات باللهجة السعودية ويوصل السياسات ثنائي اللغة." },
        { icon: BarChart,     title: "HR Analytics",             titleAr: "تحليلات الموارد البشرية",     desc: "Tracks recruitment metrics, onboarding completion, leave trends, and employee satisfaction in real time.",    descAr: "يتتبع مقاييس التوظيف واكتمال التأهيل واتجاهات الإجازات ورضا الموظفين في الوقت الفعلي." },
      ]}
      industries={[
        { name: "Corporate & Enterprise",  nameAr: "الشركات والمؤسسات" },
        { name: "Healthcare",              nameAr: "الرعاية الصحية" },
        { name: "Hospitality",             nameAr: "الضيافة" },
        { name: "Construction",            nameAr: "البناء" },
        { name: "Retail",                  nameAr: "التجزئة" },
        { name: "Education",               nameAr: "التعليم" },
        { name: "Financial Services",      nameAr: "الخدمات المالية" },
        { name: "Government",              nameAr: "القطاع الحكومي" },
      ]}
      useCases={[
        { icon: Briefcase,    label: "Recruitment Screening",     labelAr: "فرز المتقدمين",             desc: "AI screens hundreds of CVs in minutes, scoring candidates against job requirements automatically.",          descAr: "يفرز الذكاء الاصطناعي مئات السير الذاتية في دقائق ويقيّم المرشحين مقابل المتطلبات تلقائياً." },
        { icon: Users,        label: "Interview Scheduling",      labelAr: "جدولة المقابلات",           desc: "Coordinates interview times between candidates and hiring managers — zero scheduling back-and-forth.",       descAr: "ينسق أوقات المقابلات بين المرشحين ومديري التوظيف — صفر ذهاب وإياب في الجدولة." },
        { icon: FileText,     label: "Digital Onboarding",        labelAr: "التأهيل الرقمي",            desc: "Guides new hires through paperwork, IT setup, policy acknowledgment, and first-week orientation.",         descAr: "يرشد الموظفين الجدد خلال الأوراق وإعداد تقنية المعلومات والاعتراف بالسياسات وتوجيه الأسبوع الأول." },
        { icon: Calendar,     label: "Leave & Absence Management", labelAr: "إدارة الإجازات والغياب",   desc: "Handles all leave request types — annual, sick, maternity — with automatic approval routing.",               descAr: "يتعامل مع جميع أنواع طلبات الإجازة — سنوية ومرضية وأمومة — مع توجيه الموافقة التلقائي." },
        { icon: MessageCircle, label: "HR Policy Q&A",            labelAr: "أسئلة وأجوبة السياسات",    desc: "Employees ask HR questions via WhatsApp; AI answers instantly from your policy knowledge base.",            descAr: "يطرح الموظفون أسئلة الموارد البشرية عبر واتساب؛ يجيب الذكاء الاصطناعي فوراً من قاعدة المعرفة." },
        { icon: HardHat,      label: "Performance Review Coordination", labelAr: "تنسيق مراجعات الأداء", desc: "Schedules review cycles, collects self-assessments, and tracks completion across departments.",             descAr: "يجدول دورات المراجعة ويجمع التقييمات الذاتية ويتتبع الاكتمال عبر الأقسام." },
      ]}
      faqs={[
        { q: "What is an AI HR Agent?",                         qAr: "ما هو وكيل الموارد البشرية الذكي؟",                      a: "An AI HR Agent is an autonomous AI system that handles HR tasks — recruitment screening, interview scheduling, onboarding, leave management, and employee query responses — via WhatsApp without human intervention.",                                      aAr: "وكيل الموارد البشرية الذكي هو نظام ذكاء اصطناعي مستقل يتعامل مع مهام الموارد البشرية — فرز التوظيف وجدولة المقابلات والتأهيل وإدارة الإجازات والإجابة على استفسارات الموظفين عبر واتساب." },
        { q: "Can AI HR Agents process Arabic job applications?", qAr: "هل يمكن للوكلاء معالجة طلبات التوظيف بالعربية؟",       a: "Yes. Electi's AI HR Agents process CVs in Arabic and English, extracting qualifications, experience, and skills to rank candidates against your job requirements automatically.",                                                                          aAr: "نعم. يعالج وكلاء الموارد البشرية الذكيون من إليكتي السير الذاتية بالعربية والإنجليزية، ويستخرجون المؤهلات والخبرة والمهارات لترتيب المرشحين." },
        { q: "What HR processes can be fully automated?",        qAr: "ما عمليات الموارد البشرية التي يمكن أتمتتها بالكامل؟", a: "Recruitment screening, interview scheduling, offer letter generation, digital onboarding, leave request processing, policy FAQ responses, and employee satisfaction surveys can all be fully automated.",                                              aAr: "يمكن أتمتة فرز التوظيف وجدولة المقابلات وإنشاء خطابات العروض والتأهيل الرقمي ومعالجة طلبات الإجازة وردود الأسئلة الشائعة واستطلاعات الرضا بالكامل." },
        { q: "Is employee data secure?",                         qAr: "هل بيانات الموظفين آمنة؟",                              a: "Yes. Employee data is encrypted with AES-256, stored in Saudi-compliant infrastructure, access-controlled by role, and handled in compliance with PDPL and Saudi labor law.",                                                                              aAr: "نعم. بيانات الموظفين مشفرة بـ AES-256 ومخزنة في بنية تحتية متوافقة مع المعايير السعودية والتحكم في الوصول حسب الدور والامتثال لنظام PDPL وقانون العمل السعودي." },
        { q: "Does AI HR integrate with existing HRIS systems?", qAr: "هل يتكامل الذكاء الاصطناعي مع أنظمة الموارد البشرية الحالية؟", a: "Yes. Electi AI HR Agents integrate with popular HRIS platforms, ATS systems, and calendar tools — syncing data bidirectionally to ensure your systems of record stay current.", aAr: "نعم. يتكامل وكلاء الموارد البشرية الذكيون من إليكتي مع منصات HRIS الشائعة وأنظمة تتبع المتقدمين وأدوات التقويم." },
      ]}
      ctaTitle="Automate Your HR Operations with AI"
      ctaTitleAr="أتمتة عمليات الموارد البشرية بالذكاء الاصطناعي"
      ctaSub="Free your HR team from paperwork. Let AI handle recruitment, onboarding, and employee queries automatically."
      ctaSubAr="حرّر فريق الموارد البشرية من الأوراق. دع الذكاء الاصطناعي يتعامل مع التوظيف والتأهيل واستفسارات الموظفين تلقائياً."
    />
  );
}
