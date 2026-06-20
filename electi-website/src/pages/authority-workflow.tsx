import { Workflow, Zap, BarChart, Globe, Clock, Shield, Bot, MessageCircle, Building, Users, FileText, Calendar } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "AI Workflow Automation",
    nameAr: "أتمتة سير العمل بالذكاء الاصطناعي",
    description: "Electi's AI Workflow Automation connects every department with intelligent automation pipelines that eliminate manual work and accelerate business operations for Saudi enterprises.",
    descriptionAr: "تربط أتمتة سير العمل بالذكاء الاصطناعي من إليكتي كل الأقسام بخطوط أتمتة ذكية تُلغي العمل اليدوي وتُسرّع العمليات التجارية للمؤسسات السعودية.",
    url: "/ai-workflow-automation",
    keywords: ["AI workflow automation Saudi Arabia", "business process automation", "AI automation Riyadh", "الأتمتة بالذكاء الاصطناعي", "أتمتة سير العمل", "أتمتة العمليات التجارية"],
  }),
  makeFaqSchema([
    { q: "What is AI Workflow Automation?", a: "AI Workflow Automation uses artificial intelligence to design, execute, and optimize multi-step business processes — from lead-to-invoice pipelines to HR onboarding and operational approvals — without manual intervention." },
    { q: "What business processes can be automated with AI?", a: "Sales and lead management, customer onboarding, invoice processing, HR workflows, approval chains, inventory management, reporting, customer communications, and cross-department coordination can all be automated." },
    { q: "How does AI Workflow Automation differ from traditional RPA?", a: "Traditional RPA automates rigid, rule-based tasks. AI Workflow Automation handles unstructured inputs (like customer messages in Arabic), makes contextual decisions, adapts to exceptions, and learns from patterns over time." },
    { q: "Is AI Workflow Automation available in Arabic?", a: "Yes. Electi's AI Workflow Automation handles Arabic inputs, processes Arabic documents, communicates in Arabic, and manages workflows for bilingual Saudi business environments." },
    { q: "How quickly can workflows be deployed?", a: "Simple automation workflows go live within 24-48 hours. Complex multi-system integrations typically take 1-2 weeks including testing and refinement." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "AI Workflow Automation", url: "/ai-workflow-automation" }]),
];

export default function AIWorkflowPage() {
  return (
    <AuthorityPage
      seoTitle="AI Workflow Automation Saudi Arabia | Electi — Business Process AI"
      seoTitleAr="أتمتة سير العمل بالذكاء الاصطناعي في المملكة | إليكتي — ذكاء اصطناعي للعمليات"
      seoDescription="AI workflow automation that connects every department with intelligent pipelines — eliminating manual work and accelerating operations for Saudi businesses."
      seoDescriptionAr="أتمتة سير العمل بالذكاء الاصطناعي تربط كل الأقسام بخطوط ذكية — تُلغي العمل اليدوي وتُسرّع العمليات للشركات السعودية."
      seoPath="/ai-workflow-automation"
      seoKeywords="AI workflow automation Saudi Arabia, business process automation Riyadh, AI operations, intelligent automation Arabic, الأتمتة بالذكاء الاصطناعي, أتمتة سير العمل, أتمتة العمليات"
      seoKeywordsAr="الأتمتة بالذكاء الاصطناعي، أتمتة سير العمل، أتمتة العمليات التجارية، سير عمل ذكي، تحسين العمليات بالذكاء الاصطناعي"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "AI Workflow Automation", labelAr: "أتمتة سير العمل", href: "/ai-workflow-automation" },
      ]}
      badge="AI Workflow Automation"
      badgeAr="أتمتة سير العمل بالذكاء الاصطناعي"
      h1="AI Workflow"
      h1Ar="أتمتة سير العمل"
      h1Accent="Automation"
      h1AccentAr="بالذكاء الاصطناعي"
      tagline="Connect every department with intelligent automation pipelines that eliminate manual work and accelerate operations."
      taglineAr="ربط كل الأقسام بخطوط أتمتة ذكية تُلغي العمل اليدوي وتُسرّع العمليات."
      intro="Electi's AI Workflow Automation replaces manual, error-prone processes with intelligent pipelines — from lead intake to invoice payment, HR onboarding to operational approvals — in Arabic and English."
      introAr="تستبدل أتمتة سير العمل بالذكاء الاصطناعي من إليكتي العمليات اليدوية المعرضة للأخطاء بخطوط ذكية — من استقبال العملاء إلى دفع الفواتير، ومن التأهيل إلى الموافقات التشغيلية — بالعربية والإنجليزية."
      stats={[
        { value: "85%",  label: "Manual task reduction",   labelAr: "تقليل المهام اليدوية" },
        { value: "10×",  label: "Faster process execution", labelAr: "تنفيذ عمليات أسرع" },
        { value: "0",    label: "Process errors",           labelAr: "أخطاء في العمليات" },
        { value: "<48h", label: "Workflow deployment",      labelAr: "نشر سير العمل" },
      ]}
      whatTitle="What Is AI Workflow Automation?"
      whatTitleAr="ما هي أتمتة سير العمل بالذكاء الاصطناعي؟"
      whatBody="AI Workflow Automation uses artificial intelligence to design, execute, monitor, and continuously optimize multi-step business processes — without human intervention at each step. Unlike traditional RPA (Robotic Process Automation) that only handles rigid rule-based tasks, AI workflow automation handles unstructured inputs (like customer messages in Arabic or English), makes contextual decisions, adapts to exceptions, and learns from patterns over time. Electi builds custom AI automation pipelines that connect your CRM, WhatsApp, email, HR systems, and operational tools into seamless end-to-end workflows."
      whatBodyAr="تستخدم أتمتة سير العمل بالذكاء الاصطناعي الذكاء الاصطناعي لتصميم وتنفيذ ومراقبة وتحسين مستمر لعمليات الأعمال متعددة الخطوات — دون تدخل بشري في كل خطوة. على عكس RPA التقليدية التي تتعامل فقط مع المهام الصارمة القائمة على القواعد، تتعامل أتمتة سير العمل بالذكاء الاصطناعي مع المدخلات غير المنظمة (مثل رسائل العملاء بالعربية أو الإنجليزية) وتتخذ قرارات سياقية وتتكيف مع الاستثناءات وتتعلم من الأنماط بمرور الوقت."
      steps={[
        { n: "01", title: "Map Your Processes",    titleAr: "رسم خريطة عملياتك",     desc: "Document current manual workflows — where handoffs happen, where errors occur, where time is lost.",        descAr: "وثّق سير العمل اليدوي الحالي — أين تحدث عمليات التسليم وأين تقع الأخطاء وأين يُهدر الوقت." },
        { n: "02", title: "Design Automation",     titleAr: "تصميم الأتمتة",          desc: "Build AI-powered workflow logic with triggers, conditions, actions, and smart decision branches.",          descAr: "بناء منطق سير العمل المدعوم بالذكاء الاصطناعي بالمحفزات والشروط والإجراءات وفروع القرار الذكية." },
        { n: "03", title: "Connect Your Systems",  titleAr: "ربط أنظمتك",            desc: "Integrate WhatsApp, CRM, ERP, email, calendar, and operational systems into one unified pipeline.",         descAr: "اتكامل مع واتساب وإدارة علاقات العملاء وتخطيط الموارد والبريد الإلكتروني والتقويم والأنظمة التشغيلية." },
        { n: "04", title: "Deploy & Optimize",     titleAr: "النشر والتحسين",         desc: "Launch workflows and monitor performance. AI continuously optimizes based on outcomes and feedback.",        descAr: "أطلق سير العمل وراقب الأداء. يحسّن الذكاء الاصطناعي باستمرار بناءً على النتائج والتغذية الراجعة." },
      ]}
      benefits={[
        { icon: Zap,          title: "Eliminate Manual Steps",    titleAr: "إلغاء الخطوات اليدوية",     desc: "Replace every manual handoff, data entry, and approval step with intelligent automated actions.",          descAr: "استبدل كل تسليم يدوي وإدخال بيانات وخطوة موافقة بإجراءات ذكية تلقائية." },
        { icon: Globe,        title: "Arabic Process Handling",   titleAr: "معالجة العمليات بالعربية",   desc: "AI processes Arabic documents, messages, and data inputs natively — no translation layer needed.",          descAr: "يعالج الذكاء الاصطناعي المستندات والرسائل وبيانات المدخلات بالعربية الأصلية — لا حاجة لطبقة ترجمة." },
        { icon: Bot,          title: "Intelligent Decision-Making", titleAr: "صنع قرار ذكي",             desc: "AI handles exceptions, routes approvals, and makes contextual decisions — not just rule-based branching.",  descAr: "يتعامل الذكاء الاصطناعي مع الاستثناءات ويوجّه الموافقات ويتخذ قرارات سياقية — لا مجرد تفرع قائم على القواعد." },
        { icon: BarChart,     title: "Process Analytics",         titleAr: "تحليلات العمليات",           desc: "Real-time dashboards showing process completion rates, bottlenecks, SLA adherence, and efficiency gains.",  descAr: "لوحات معلومات فورية تُظهر معدلات اكتمال العمليات والاختناقات والالتزام بمستويات الخدمة." },
        { icon: Shield,       title: "Error-Free Execution",       titleAr: "تنفيذ خالٍ من الأخطاء",    desc: "AI workflows execute the same way every time — no human error, missed steps, or inconsistent quality.",     descAr: "تُنفَّذ سير عمل الذكاء الاصطناعي بنفس الطريقة في كل مرة — لا أخطاء بشرية أو خطوات مفقودة." },
        { icon: Clock,        title: "24/7 Process Execution",     titleAr: "تنفيذ عمليات على مدار الساعة", desc: "Workflows run continuously — processing requests at 2am just as reliably as at 2pm.",                    descAr: "تعمل سير العمل باستمرار — تعالج الطلبات في الساعة 2 صباحاً بنفس موثوقية الساعة 2 مساءً." },
      ]}
      industries={[
        { name: "Corporate & Enterprise",   nameAr: "الشركات والمؤسسات" },
        { name: "Financial Services",       nameAr: "الخدمات المالية" },
        { name: "Healthcare",               nameAr: "الرعاية الصحية" },
        { name: "Real Estate",              nameAr: "العقارات" },
        { name: "Construction",             nameAr: "البناء" },
        { name: "Retail & E-commerce",      nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Logistics",                nameAr: "اللوجستيات" },
        { name: "Government & Public Sector", nameAr: "القطاع الحكومي والعام" },
      ]}
      useCases={[
        { icon: MessageCircle, label: "Lead-to-Deal Pipeline",    labelAr: "خط أنابيب من العميل إلى الصفقة", desc: "Automated lead intake, qualification, proposal, follow-up, contract, and invoice — end to end.",          descAr: "استقبال العملاء وتأهيلهم والعروض والمتابعة والعقد والفاتورة — من البداية إلى النهاية تلقائياً." },
        { icon: FileText,      label: "Invoice & Payment Workflow", labelAr: "سير عمل الفواتير والدفع",        desc: "Auto-generates invoices, sends reminders, processes payments, and updates accounting systems.",            descAr: "يولّد الفواتير تلقائياً ويرسل التذكيرات ويعالج المدفوعات ويحدث أنظمة المحاسبة." },
        { icon: Users,         label: "Employee Onboarding Flow", labelAr: "سير عمل تأهيل الموظفين",          desc: "Complete onboarding automation from offer acceptance to first-day readiness — zero HR manual steps.",       descAr: "أتمتة كاملة للتأهيل من قبول العرض إلى الاستعداد لليوم الأول — صفر خطوات يدوية للموارد البشرية." },
        { icon: Building,      label: "Approval & Compliance",    labelAr: "سير عمل الموافقات والامتثال",     desc: "Routes multi-step approvals with deadlines, escalations, and audit trails automatically.",                 descAr: "يوجّه الموافقات متعددة الخطوات بمواعيد نهائية وتصعيدات وسجلات تدقيق تلقائياً." },
        { icon: Calendar,      label: "Appointment & Booking",    labelAr: "المواعيد والحجز",                 desc: "End-to-end booking automation — from customer inquiry to confirmed appointment with reminders.",           descAr: "أتمتة الحجز من البداية إلى النهاية — من استفسار العميل إلى الموعد المؤكد مع التذكيرات." },
        { icon: BarChart,      label: "Reporting Automation",     labelAr: "أتمتة التقارير",                  desc: "Auto-generates daily, weekly, and monthly business reports from connected data sources.",                 descAr: "يولّد التقارير اليومية والأسبوعية والشهرية تلقائياً من مصادر البيانات المتصلة." },
      ]}
      faqs={[
        { q: "What is AI Workflow Automation?",                          qAr: "ما هي أتمتة سير العمل بالذكاء الاصطناعي؟",                  a: "AI Workflow Automation uses AI to design, execute, and optimize multi-step business processes without manual intervention — handling unstructured inputs, making contextual decisions, and adapting to exceptions.",                                         aAr: "تستخدم أتمتة سير العمل بالذكاء الاصطناعي الذكاء الاصطناعي لتصميم وتنفيذ وتحسين عمليات الأعمال متعددة الخطوات دون تدخل يدوي — تتعامل مع المدخلات غير المنظمة وتتخذ قرارات سياقية." },
        { q: "What business processes can be automated?",                qAr: "ما عمليات الأعمال التي يمكن أتمتتها؟",                      a: "Sales pipelines, customer onboarding, invoice processing, HR workflows, approval chains, inventory management, reporting, and cross-department coordination can all be automated with AI.",                                                              aAr: "يمكن أتمتة خطوط أنابيب المبيعات وتأهيل العملاء ومعالجة الفواتير وسير عمل الموارد البشرية وسلاسل الموافقات وإدارة المخزون والتقارير والتنسيق بين الأقسام." },
        { q: "How does AI automation differ from traditional automation?", qAr: "كيف تختلف أتمتة الذكاء الاصطناعي عن الأتمتة التقليدية؟",  a: "Traditional RPA automates rigid, rule-based tasks and breaks when inputs change. AI Workflow Automation handles variable inputs (like Arabic customer messages), makes intelligent decisions, and adapts to new situations.", aAr: "تؤتمت RPA التقليدية المهام الصارمة وتتعطل عند تغيير المدخلات. تتعامل أتمتة سير العمل بالذكاء الاصطناعي مع المدخلات المتغيرة وتتخذ قرارات ذكية وتتكيف مع المواقف الجديدة." },
        { q: "Can AI workflows handle Arabic inputs?",                    qAr: "هل يمكن لسير العمل الذكي التعامل مع المدخلات بالعربية؟",   a: "Yes. Electi's AI Workflow Automation processes Arabic documents, messages, and data natively — no translation layer needed — making it ideal for bilingual Saudi business environments.",                                                                  aAr: "نعم. تعالج أتمتة سير العمل بالذكاء الاصطناعي من إليكتي المستندات والرسائل والبيانات بالعربية الأصلية — لا حاجة لطبقة ترجمة — مما يجعلها مثالية للبيئات التجارية السعودية ثنائية اللغة." },
        { q: "How quickly can automation workflows be deployed?",         qAr: "كم سرعة نشر سير عمل الأتمتة؟",                             a: "Simple automation workflows go live within 24-48 hours. Complex multi-system integrations typically take 1-2 weeks including configuration, testing, and refinement.",                                                                                  aAr: "تنطلق سير عمل الأتمتة البسيطة خلال 24-48 ساعة. تستغرق عمليات التكامل متعددة الأنظمة المعقدة عادةً 1-2 أسبوع بما في ذلك التكوين والاختبار والضبط." },
      ]}
      ctaTitle="Automate Your Business Operations with AI"
      ctaTitleAr="أتمتة عمليات عملك بالذكاء الاصطناعي"
      ctaSub="Eliminate manual work, prevent errors, and accelerate every business process with intelligent AI automation."
      ctaSubAr="أَلغِ العمل اليدوي وامنع الأخطاء وسرّع كل عملية تجارية بالأتمتة الذكية للذكاء الاصطناعي."
    />
  );
}
