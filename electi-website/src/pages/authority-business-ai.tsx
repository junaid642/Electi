import { Bot, Users, Zap, Globe, BarChart, Shield, PhoneCall, HeartPulse, Building, ShoppingBag, HardHat, Hotel } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Business AI Agents",
    nameAr: "وكلاء الذكاء الاصطناعي للأعمال",
    description: "Electi's Business AI Agents act as AI employees — handling customer service, sales, HR, and operations for Saudi businesses 24/7 in Arabic and English via WhatsApp.",
    descriptionAr: "وكلاء أعمال إليكتي يعملون كموظفين ذكاء اصطناعي — يتولون خدمة العملاء والمبيعات والموارد البشرية والعمليات للشركات السعودية على مدار الساعة بالعربية والإنجليزية.",
    url: "/business-ai-agents",
    keywords: ["business AI agents", "AI employees Saudi Arabia", "AI workforce automation", "الموظف الذكي", "وكلاء أعمال ذكاء اصطناعي", "أتمتة الأعمال بالذكاء الاصطناعي"],
  }),
  makeFaqSchema([
    { q: "What are Business AI Agents?", a: "Business AI Agents are autonomous AI systems that function as digital employees — handling customer service, sales automation, HR processes, and operational tasks for your business 24/7, without human intervention." },
    { q: "How do Business AI Agents differ from Personal AI Agents?", a: "Personal AI Agents manage an individual's tasks (email, calendar). Business AI Agents manage company-wide functions — customer queues, sales pipelines, HR workflows, and operational automation at scale." },
    { q: "Can Business AI Agents operate in Arabic?", a: "Yes. Electi's Business AI Agents are fully bilingual — fluent in Arabic (including Saudi dialect) and English, enabling seamless customer service for all Saudi customers." },
    { q: "How many customers can a Business AI Agent handle at once?", a: "Electi's AI agents handle thousands of simultaneous conversations with no degradation in quality or response time — far exceeding human capacity." },
    { q: "What ROI can I expect from Business AI Agents?", a: "Most Electi clients report 60-80% reduction in repetitive support tasks, 3x faster lead response times, and 40+ hours saved per employee per month within the first 90 days." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "Business AI Agents", url: "/business-ai-agents" }]),
];

export default function BusinessAIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="Business AI Agents | Electi — AI Employees for Saudi Businesses"
      seoTitleAr="وكلاء الذكاء الاصطناعي للأعمال | إليكتي — موظفون ذكاء اصطناعي للشركات السعودية"
      seoDescription="AI-powered employees that handle customer service, sales, HR, and operations for your Saudi business — 24/7, in Arabic and English, via WhatsApp."
      seoDescriptionAr="موظفون مدعومون بالذكاء الاصطناعي يتولون خدمة العملاء والمبيعات والموارد البشرية والعمليات لعملك السعودي — على مدار الساعة، بالعربية والإنجليزية، عبر واتساب."
      seoPath="/business-ai-agents"
      seoKeywords="business AI agents Saudi Arabia, AI employees, AI workforce Saudi, AI operations automation, الموظف الذكي, وكلاء أعمال ذكاء اصطناعي, أتمتة الأعمال"
      seoKeywordsAr="الموظف الذكي، وكلاء الأعمال الذكية، أتمتة الأعمال بالذكاء الاصطناعي، موظف ذكاء اصطناعي، خدمة عملاء ذكية"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "Business AI Agents", labelAr: "وكلاء الأعمال", href: "/business-ai-agents" },
      ]}
      badge="Business AI Agents"
      badgeAr="وكلاء الذكاء الاصطناعي للأعمال"
      h1="AI Employees for"
      h1Ar="موظفون ذكاء اصطناعي"
      h1Accent="Your Saudi Business"
      h1AccentAr="لعملك السعودي"
      tagline="AI-powered employees that handle customer service, sales, HR, and operations — 24/7, in Arabic and English."
      taglineAr="موظفون مدعومون بالذكاء الاصطناعي يتولون خدمة العملاء والمبيعات والموارد البشرية والعمليات — على مدار الساعة، بالعربية والإنجليزية."
      intro="Deploy Electi Business AI Agents as digital employees that scale instantly, never take sick days, and handle thousands of simultaneous interactions at a fraction of the cost of human staff."
      introAr="انشر وكلاء أعمال إليكتي كموظفين رقميين يتوسعون فوراً ولا يأخذون إجازات مرضية ويتعاملون مع آلاف التفاعلات المتزامنة بجزء من تكلفة الموظفين البشريين."
      stats={[
        { value: "24/7",  label: "Non-stop operations",  labelAr: "عمليات متواصلة" },
        { value: "∞",     label: "Simultaneous chats",   labelAr: "محادثات متزامنة" },
        { value: "80%",   label: "Task automation rate", labelAr: "معدل أتمتة المهام" },
        { value: "3×",    label: "Faster response time", labelAr: "أسرع في الاستجابة" },
      ]}
      whatTitle="What Are Business AI Agents?"
      whatTitleAr="ما هم وكلاء الذكاء الاصطناعي للأعمال؟"
      whatBody="Business AI Agents are autonomous AI systems that function as digital employees for your company. They handle the high-volume, repetitive, and time-sensitive business functions that your human team currently manages — customer service queues, sales follow-up, HR intake, operational workflows — but at unlimited scale, with zero downtime, and in both Arabic and English. Unlike simple automation tools, Electi Business AI Agents reason about context, handle complex conversations, and escalate to humans only when truly necessary."
      whatBodyAr="وكلاء الأعمال بالذكاء الاصطناعي هم أنظمة ذكاء اصطناعي مستقلة تعمل كموظفين رقميين لشركتك. يتولون الوظائف التجارية ذات الحجم الكبير والمتكررة والحساسة للوقت التي يديرها فريقك البشري حالياً — طوابير خدمة العملاء ومتابعة المبيعات وإدخال الموارد البشرية وسير العمل التشغيلي — ولكن بمقياس غير محدود ودون توقف وبالعربية والإنجليزية."
      steps={[
        { n: "01", title: "Define Business Roles",  titleAr: "تحديد أدوار الأعمال",  desc: "Map the business functions you want to automate — support, sales, HR, or operations.",       descAr: "حدد وظائف الأعمال التي تريد أتمتتها — الدعم أو المبيعات أو الموارد البشرية أو العمليات." },
        { n: "02", title: "Configure & Train",      titleAr: "التكوين والتدريب",      desc: "We train your agents on your product knowledge, FAQs, scripts, and escalation rules.",         descAr: "ندرب وكلاءك على معرفة منتجك والأسئلة الشائعة والنصوص وقواعد التصعيد." },
        { n: "03", title: "Deploy Across Channels", titleAr: "النشر عبر القنوات",     desc: "Agents go live on WhatsApp, voice, and your existing systems within 48 hours.",               descAr: "ينطلق الوكلاء على واتساب والصوت وأنظمتك الحالية خلال 48 ساعة." },
        { n: "04", title: "Scale & Optimize",       titleAr: "التوسع والتحسين",       desc: "Monitor performance, adjust behavior, and scale to handle growing demand instantly.",          descAr: "راقب الأداء واضبط السلوك وتوسّع للتعامل مع الطلب المتزايد فوراً." },
      ]}
      benefits={[
        { icon: Globe,     title: "Bilingual at Scale",     titleAr: "ثنائي اللغة على نطاق واسع", desc: "Handle thousands of Arabic and English conversations simultaneously with consistent quality.",              descAr: "تعامل مع آلاف المحادثات العربية والإنجليزية في آن واحد بجودة متسقة." },
        { icon: Zap,       title: "Instant Scalability",    titleAr: "قابلية توسع فورية",          desc: "Scale from 10 to 10,000 simultaneous interactions without adding headcount.",                             descAr: "توسّع من 10 إلى 10,000 تفاعل متزامن دون زيادة عدد الموظفين." },
        { icon: BarChart,  title: "Operational Analytics",  titleAr: "تحليلات تشغيلية",            desc: "Full visibility into agent performance, resolution rates, customer satisfaction, and cost savings.",        descAr: "رؤية كاملة لأداء الوكيل ومعدلات الحل ورضا العملاء ووفورات التكاليف." },
        { icon: Bot,       title: "Always-On Workforce",    titleAr: "قوى عمل متاحة دائماً",      desc: "AI employees never sleep, take leave, or call in sick — your business runs 24/7/365.",                    descAr: "موظفو الذكاء الاصطناعي لا ينامون ولا يأخذون إجازات — عملك يعمل على مدار الساعة طوال العام." },
        { icon: Shield,    title: "Human Escalation",       titleAr: "تصعيد للبشر",               desc: "Smart handoff to human agents when complexity requires it — with full conversation context preserved.",    descAr: "تسليم ذكي للوكلاء البشريين عند الحاجة — مع الحفاظ على سياق المحادثة الكامل." },
        { icon: Users,     title: "Cross-Department Reach", titleAr: "تغطية متعددة الأقسام",       desc: "One platform covers customer service, sales, HR, finance, and operations — no siloed tools.",             descAr: "منصة واحدة تغطي خدمة العملاء والمبيعات والموارد البشرية والمالية والعمليات." },
      ]}
      industries={[
        { name: "Healthcare",         nameAr: "الرعاية الصحية" },
        { name: "Real Estate",        nameAr: "العقارات" },
        { name: "Hospitality",        nameAr: "الضيافة" },
        { name: "Retail & E-commerce", nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Construction",       nameAr: "البناء" },
        { name: "Corporate",          nameAr: "الشركات" },
        { name: "Financial Services", nameAr: "الخدمات المالية" },
        { name: "Logistics",          nameAr: "اللوجستيات" },
      ]}
      useCases={[
        { icon: PhoneCall,   label: "Customer Service Automation",  labelAr: "أتمتة خدمة العملاء",      desc: "AI handles Tier-1 support queries, FAQs, and complaints instantly — escalating complex issues to human agents.", descAr: "يتعامل الذكاء الاصطناعي مع استفسارات الدعم من المستوى الأول والأسئلة الشائعة والشكاوى فوراً." },
        { icon: Bot,         label: "Sales Pipeline Automation",    labelAr: "أتمتة خط أنابيب المبيعات", desc: "Qualifies leads, sends proposals, follows up, and nurtures prospects through the entire sales funnel.",            descAr: "يؤهّل العملاء المحتملين ويرسل العروض ويتابع ويرعى المحتملين خلال قمع المبيعات بالكامل." },
        { icon: Users,       label: "HR Process Automation",        labelAr: "أتمتة عمليات الموارد البشرية", desc: "Screens CVs, schedules interviews, sends offers, onboards employees, and manages leave requests.",             descAr: "يفحص السير الذاتية ويجدول المقابلات ويرسل العروض ويُعِد الموظفين ويدير طلبات الإجازة." },
        { icon: Building,    label: "Operations Management",        labelAr: "إدارة العمليات",             desc: "Coordinates internal workflows, approvals, task assignments, and status updates automatically.",                 descAr: "ينسق سير العمل الداخلي والموافقات وتعيينات المهام وتحديثات الحالة تلقائياً." },
        { icon: HeartPulse,  label: "Appointment Scheduling",       labelAr: "جدولة المواعيد",            desc: "Manages end-to-end appointment booking, reminders, and rescheduling for clinics, salons, and services.",         descAr: "يدير حجز المواعيد والتذكيرات وإعادة الجدولة للعيادات والصالونات والخدمات." },
        { icon: ShoppingBag, label: "Order & Inventory Queries",    labelAr: "استفسارات الطلبات والمخزون", desc: "Handles order status, product queries, stock checks, and return requests automatically.",                        descAr: "يتعامل مع حالة الطلب واستفسارات المنتج وفحوصات المخزون وطلبات الإرجاع تلقائياً." },
      ]}
      faqs={[
        { q: "What are Business AI Agents?",                              qAr: "ما هم وكلاء الذكاء الاصطناعي للأعمال؟",                         a: "Business AI Agents are autonomous AI systems that function as digital employees — handling customer service, sales, HR, and operations for your business 24/7 without human intervention.",                                                             aAr: "وكلاء الأعمال بالذكاء الاصطناعي هم أنظمة ذكاء اصطناعي مستقلة تعمل كموظفين رقميين — تتولى خدمة العملاء والمبيعات والموارد البشرية والعمليات على مدار الساعة." },
        { q: "How many conversations can they handle simultaneously?",    qAr: "كم محادثة يمكنهم التعامل معها في آن واحد؟",                      a: "Electi's AI agents handle thousands of simultaneous conversations with no degradation in quality or response time — far exceeding human capacity.",                                                                                                       aAr: "يتعامل وكلاء إليكتي مع آلاف المحادثات المتزامنة دون أي تدهور في الجودة أو وقت الاستجابة." },
        { q: "Can they communicate with customers in Arabic?",            qAr: "هل يمكنهم التواصل مع العملاء بالعربية؟",                         a: "Yes. All Electi Business AI Agents are fully bilingual — fluent in Arabic (including Saudi dialect) and English, enabling seamless service for all Saudi customers.",                                                                               aAr: "نعم. جميع وكلاء أعمال إليكتي ثنائيو اللغة بالكامل — يتقنون العربية (بما في ذلك اللهجة السعودية) والإنجليزية." },
        { q: "Will AI agents replace my human team?",                     qAr: "هل سيستبدل وكلاء الذكاء الاصطناعي فريقي البشري؟",               a: "No. AI agents handle repetitive, high-volume tasks so your human team can focus on complex decisions, relationship building, and strategic work. Think of them as your best employees who handle the routine.",                                       aAr: "لا. يتعامل وكلاء الذكاء الاصطناعي مع المهام المتكررة ذات الحجم الكبير حتى يتمكن فريقك البشري من التركيز على القرارات المعقدة وبناء العلاقات والعمل الاستراتيجي." },
        { q: "What ROI can I expect?",                                    qAr: "ما عائد الاستثمار الذي يمكنني توقعه؟",                           a: "Most Electi clients report 60-80% reduction in repetitive support tasks, 3x faster lead response times, and 40+ hours saved per employee per month within the first 90 days.",                                                                     aAr: "يُفيد معظم عملاء إليكتي بانخفاض 60-80٪ في مهام الدعم المتكررة وأوقات استجابة أسرع 3 مرات وتوفير أكثر من 40 ساعة لكل موظف شهرياً." },
      ]}
      ctaTitle="Build Your AI Workforce Today"
      ctaTitleAr="بناء قوى العمل الذكية اليوم"
      ctaSub="Deploy AI employees that work 24/7, never miss a lead, and scale with your business instantly."
      ctaSubAr="انشر موظفين ذكاء اصطناعي يعملون على مدار الساعة ولا يفوّتون عميلاً محتملاً ويتوسعون مع عملك فوراً."
    />
  );
}
