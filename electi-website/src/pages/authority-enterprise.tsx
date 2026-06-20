import { Building, Globe, Shield, BarChart, Zap, Users, Bot, FileText, Clock, MessageCircle, HardHat, HeartPulse } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Enterprise AI Solutions",
    nameAr: "حلول الذكاء الاصطناعي للمؤسسات",
    description: "Electi provides end-to-end enterprise AI infrastructure for Saudi organizations — AI agents, voice automation, workflow automation, analytics, and agentic AI at scale.",
    descriptionAr: "تقدم إليكتي بنية تحتية متكاملة للذكاء الاصطناعي للمؤسسات السعودية — وكلاء ذكاء اصطناعي وأتمتة صوتية وأتمتة سير العمل وتحليلات وذكاء اصطناعي وكيل على نطاق واسع.",
    url: "/enterprise-ai-solutions",
    keywords: ["enterprise AI solutions Saudi Arabia", "enterprise AI Riyadh", "AI infrastructure KSA", "agentic AI enterprise", "حلول الذكاء الاصطناعي للمؤسسات", "ذكاء اصطناعي مؤسسي"],
  }),
  makeFaqSchema([
    { q: "What are Enterprise AI Solutions?", a: "Enterprise AI Solutions are comprehensive AI deployments that span multiple departments and systems — combining AI agents, voice automation, workflow automation, analytics, and agentic AI into a unified intelligent infrastructure for large organizations." },
    { q: "What is Agentic AI?", a: "Agentic AI refers to AI systems that operate autonomously — perceiving their environment, setting goals, planning actions, and executing multi-step tasks without human instruction at each step. Electi's enterprise platform is built on agentic AI principles." },
    { q: "Does Electi offer custom enterprise AI development?", a: "Yes. Electi builds fully customized AI agent systems for enterprise clients — tailored to your industry, existing technology stack, Arabic/English language requirements, and specific business processes." },
    { q: "How does enterprise AI integrate with existing Saudi business systems?", a: "Electi integrates with SAP, Oracle, Microsoft Dynamics, and other enterprise systems common in Saudi organizations, as well as WhatsApp Business API, government portals, and proprietary systems." },
    { q: "What is the minimum company size for enterprise AI?", a: "Electi's enterprise solutions are designed for organizations with 50+ employees or high-volume operations. Smaller companies use Electi's standard plans." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "Enterprise AI Solutions", url: "/enterprise-ai-solutions" }]),
];

export default function EnterpriseAIPage() {
  return (
    <AuthorityPage
      seoTitle="Enterprise AI Solutions Saudi Arabia | Electi — AI Infrastructure for KSA"
      seoTitleAr="حلول الذكاء الاصطناعي للمؤسسات في المملكة | إليكتي — بنية تحتية ذكية للمؤسسات السعودية"
      seoDescription="End-to-end enterprise AI infrastructure for Saudi organizations — AI agents, voice automation, workflow automation, and agentic AI at enterprise scale."
      seoDescriptionAr="بنية تحتية متكاملة للذكاء الاصطناعي للمؤسسات السعودية — وكلاء ذكاء اصطناعي وأتمتة صوتية وأتمتة سير العمل وذكاء اصطناعي وكيل على نطاق مؤسسي."
      seoPath="/enterprise-ai-solutions"
      seoKeywords="enterprise AI solutions Saudi Arabia, enterprise AI Riyadh, AI infrastructure KSA, agentic AI, Saudi Vision 2030 AI, حلول الذكاء الاصطناعي للمؤسسات, ذكاء اصطناعي مؤسسي"
      seoKeywordsAr="حلول الذكاء الاصطناعي للمؤسسات، ذكاء اصطناعي مؤسسي، بنية تحتية للذكاء الاصطناعي، ذكاء اصطناعي وكيل، رؤية 2030 والذكاء الاصطناعي"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "Enterprise AI Solutions", labelAr: "حلول المؤسسات", href: "/enterprise-ai-solutions" },
      ]}
      badge="Enterprise AI Solutions"
      badgeAr="حلول الذكاء الاصطناعي للمؤسسات"
      h1="Enterprise AI"
      h1Ar="حلول الذكاء الاصطناعي"
      h1Accent="For Saudi Organizations"
      h1AccentAr="للمؤسسات السعودية"
      tagline="End-to-end AI infrastructure — agents, voice, automation, and agentic AI at enterprise scale."
      taglineAr="بنية تحتية متكاملة للذكاء الاصطناعي — وكلاء وصوت وأتمتة وذكاء اصطناعي وكيل على نطاق مؤسسي."
      intro="Electi builds enterprise-grade AI systems for Saudi organizations — deeply integrated with existing infrastructure, bilingual Arabic/English, and aligned with Saudi Vision 2030 digital transformation goals."
      introAr="تبني إليكتي أنظمة ذكاء اصطناعي على مستوى مؤسسي للمنظمات السعودية — متكاملة بعمق مع البنية التحتية الحالية وثنائية اللغة عربي/إنجليزي ومتوافقة مع أهداف التحول الرقمي لرؤية السعودية 2030."
      stats={[
        { value: "50+",   label: "Employees served",        labelAr: "موظف يُخدم" },
        { value: "10+",   label: "System integrations",     labelAr: "تكامل نظام" },
        { value: "99.9%", label: "Uptime SLA",              labelAr: "اتفاقية مستوى الخدمة" },
        { value: "2030",  label: "Vision 2030 aligned",     labelAr: "متوافق مع رؤية 2030" },
      ]}
      whatTitle="What Are Enterprise AI Solutions?"
      whatTitleAr="ما هي حلول الذكاء الاصطناعي للمؤسسات؟"
      whatBody="Enterprise AI Solutions are comprehensive, organization-wide AI deployments that go beyond individual agents or point solutions — combining AI agents (customer service, sales, HR, legal), AI voice systems (intelligent phone handling at scale), workflow automation (connecting every department), advanced analytics, and agentic AI capabilities into a unified intelligent infrastructure. Electi's enterprise solutions are designed specifically for Saudi organizations — compliant with Saudi regulations, bilingual Arabic/English, and aligned with Vision 2030 digital transformation priorities."
      whatBodyAr="حلول الذكاء الاصطناعي للمؤسسات هي عمليات نشر شاملة للذكاء الاصطناعي على مستوى المنظمة تتجاوز الوكلاء الفرديين أو الحلول النقطية — تجمع وكلاء الذكاء الاصطناعي وأنظمة الصوت الذكي وأتمتة سير العمل والتحليلات المتقدمة وقدرات الذكاء الاصطناعي الوكيل في بنية تحتية ذكية موحدة. مصممة خصيصاً للمنظمات السعودية — متوافقة مع اللوائح السعودية وثنائية اللغة ومنسجمة مع أولويات التحول الرقمي لرؤية 2030."
      steps={[
        { n: "01", title: "Discovery & Assessment",  titleAr: "الاكتشاف والتقييم",    desc: "We map your organization's AI readiness, existing systems, and transformation opportunities.",           descAr: "نرسم خريطة استعداد مؤسستك للذكاء الاصطناعي والأنظمة الحالية وفرص التحول." },
        { n: "02", title: "Architecture Design",     titleAr: "تصميم البنية",          desc: "Custom AI architecture designed for your industry, regulations, and integration requirements.",           descAr: "بنية ذكاء اصطناعي مخصصة مصممة لصناعتك ولوائحك ومتطلبات التكامل الخاصة بك." },
        { n: "03", title: "Phased Deployment",       titleAr: "النشر المرحلي",         desc: "Iterative rollout across departments — starting with highest-impact use cases, scaling systematically.",  descAr: "طرح تدريجي عبر الأقسام — بدءاً بأعلى حالات الاستخدام تأثيراً والتوسع بشكل منهجي." },
        { n: "04", title: "Ongoing Optimization",    titleAr: "التحسين المستمر",       desc: "Dedicated success team monitors performance, refines models, and expands AI capabilities over time.",    descAr: "فريق نجاح مخصص يراقب الأداء ويُحسّن النماذج ويوسّع قدرات الذكاء الاصطناعي بمرور الوقت." },
      ]}
      benefits={[
        { icon: Bot,          title: "Agentic AI at Scale",     titleAr: "ذكاء اصطناعي وكيل على نطاق واسع", desc: "AI agents that autonomously plan and execute complex multi-step workflows across your entire organization.",  descAr: "وكلاء ذكاء اصطناعي يخططون وينفذون سير العمل المعقد متعدد الخطوات عبر مؤسستك بالكامل." },
        { icon: Shield,       title: "Saudi Compliance",        titleAr: "الامتثال السعودي",                desc: "PDPL-compliant, Saudi data residency, NCA cybersecurity standards, and Vision 2030 aligned.",              descAr: "متوافق مع PDPL وإقامة البيانات السعودية ومعايير الأمن السيبراني للهيئة الوطنية ورؤية 2030." },
        { icon: Globe,        title: "Arabic-First Architecture", titleAr: "بنية تُعطي العربية الأولوية",   desc: "Built for Arabic from the ground up — not retrofitted translation. Saudi dialect understanding included.", descAr: "مبني للعربية من الأساس — وليس ترجمة مضافة لاحقاً. فهم اللهجة السعودية مُدمج." },
        { icon: Building,     title: "Enterprise Integration",  titleAr: "تكامل مؤسسي",                   desc: "Connects to SAP, Oracle, Microsoft Dynamics, WhatsApp Business API, and Saudi government portals.",       descAr: "يتصل بـ SAP وOracle وMicrosoft Dynamics وواجهة برمجة واتساب وبوابات حكومية سعودية." },
        { icon: BarChart,     title: "Executive Analytics",     titleAr: "تحليلات تنفيذية",               desc: "C-suite AI dashboards showing organizational performance, efficiency gains, and AI ROI in real time.",      descAr: "لوحات معلومات ذكاء اصطناعي للقيادة العليا تُظهر أداء المنظمة والكفاءة وعائد الاستثمار." },
        { icon: Users,        title: "Change Management",       titleAr: "إدارة التغيير",                 desc: "Dedicated implementation team, training programs, and ongoing support for enterprise AI adoption.",        descAr: "فريق تنفيذ مخصص وبرامج تدريبية ودعم مستمر لاعتماد الذكاء الاصطناعي المؤسسي." },
      ]}
      industries={[
        { name: "Government & Public Sector",  nameAr: "القطاع الحكومي والعام" },
        { name: "Banking & Financial Services", nameAr: "البنوك والخدمات المالية" },
        { name: "Healthcare & Hospitals",      nameAr: "الرعاية الصحية والمستشفيات" },
        { name: "Real Estate & Development",   nameAr: "العقارات والتطوير" },
        { name: "Construction & Engineering",  nameAr: "البناء والهندسة" },
        { name: "Retail & Consumer",           nameAr: "التجزئة والمستهلك" },
        { name: "Telecoms & Technology",       nameAr: "الاتصالات والتقنية" },
        { name: "Logistics & Supply Chain",    nameAr: "اللوجستيات وسلسلة التوريد" },
      ]}
      useCases={[
        { icon: Building,     label: "Organization-Wide AI Transformation", labelAr: "تحول ذكاء اصطناعي على مستوى المنظمة", desc: "Comprehensive AI deployment spanning customer service, sales, HR, finance, and operations simultaneously.",  descAr: "نشر شامل للذكاء الاصطناعي يمتد عبر خدمة العملاء والمبيعات والموارد البشرية والمالية والعمليات." },
        { icon: FileText,     label: "Enterprise Document Intelligence",    labelAr: "ذكاء الوثائق المؤسسية",              desc: "AI reads, extracts, and processes Arabic and English documents — contracts, reports, applications — at scale.",  descAr: "يقرأ الذكاء الاصطناعي ويستخرج ويعالج المستندات العربية والإنجليزية على نطاق واسع." },
        { icon: MessageCircle, label: "Multi-Channel Customer Intelligence", labelAr: "ذكاء العملاء متعدد القنوات",        desc: "Unified AI across WhatsApp, phone, email, and web — with cross-channel customer journey intelligence.",       descAr: "ذكاء اصطناعي موحد عبر واتساب والهاتف والبريد الإلكتروني والويب مع ذكاء رحلة العميل." },
        { icon: HardHat,      label: "Operations Command Center",          labelAr: "مركز قيادة العمليات",                desc: "AI command center monitoring all operations, flagging exceptions, and auto-resolving issues in real time.",    descAr: "مركز قيادة ذكاء اصطناعي يراقب جميع العمليات ويحدد الاستثناءات ويحلها تلقائياً." },
        { icon: HeartPulse,   label: "Vision 2030 AI Readiness",           labelAr: "الاستعداد للذكاء الاصطناعي لرؤية 2030", desc: "AI transformation roadmap aligned with Saudi Vision 2030 digital economy and innovation priorities.",       descAr: "خارطة طريق تحول الذكاء الاصطناعي المتوافقة مع أولويات الاقتصاد الرقمي والابتكار لرؤية 2030." },
        { icon: Globe,        label: "Arabic NLP at Enterprise Scale",     labelAr: "معالجة اللغة الطبيعية العربية مؤسسياً", desc: "Enterprise-grade Arabic natural language processing across all customer and operational touchpoints.",      descAr: "معالجة اللغة الطبيعية العربية على مستوى مؤسسي عبر جميع نقاط تواصل العملاء والعمليات." },
      ]}
      faqs={[
        { q: "What are Enterprise AI Solutions?",                         qAr: "ما هي حلول الذكاء الاصطناعي للمؤسسات؟",                   a: "Enterprise AI Solutions are comprehensive AI deployments spanning multiple departments — combining AI agents, voice automation, workflow automation, analytics, and agentic AI into unified intelligent infrastructure for large organizations.",              aAr: "حلول الذكاء الاصطناعي للمؤسسات هي عمليات نشر شاملة للذكاء الاصطناعي تمتد عبر أقسام متعددة — تجمع وكلاء الذكاء الاصطناعي وأتمتة الصوت وأتمتة سير العمل والتحليلات في بنية ذكية موحدة." },
        { q: "What is Agentic AI?",                                        qAr: "ما هو الذكاء الاصطناعي الوكيل؟",                           a: "Agentic AI refers to AI systems that operate autonomously — perceiving their environment, setting goals, planning actions, and executing multi-step tasks without human instruction at each step. Electi's enterprise platform is built on agentic AI principles.",  aAr: "الذكاء الاصطناعي الوكيل يشير إلى أنظمة الذكاء الاصطناعي التي تعمل باستقلالية — تدرك بيئتها وتضع أهدافاً وتخطط للإجراءات وتنفذ مهاماً متعددة الخطوات دون تعليمات بشرية في كل خطوة." },
        { q: "Does Electi build custom enterprise AI?",                    qAr: "هل تبني إليكتي ذكاءً اصطناعياً مؤسسياً مخصصاً؟",           a: "Yes. Electi builds fully customized AI agent systems for enterprise clients — tailored to your industry, existing technology stack, Arabic/English requirements, and specific business processes.",                                                          aAr: "نعم. تبني إليكتي أنظمة وكلاء ذكاء اصطناعي مخصصة بالكامل للعملاء من المؤسسات — مصممة لصناعتك وتكنولوجيتك الحالية ومتطلبات اللغة وعملياتك التجارية المحددة." },
        { q: "How does Electi ensure Saudi data compliance?",              qAr: "كيف تضمن إليكتي الامتثال لبيانات المملكة؟",                a: "Electi uses Saudi data residency, PDPL compliance architecture, NCA cybersecurity framework alignment, role-based access controls, and comprehensive audit logging for all enterprise deployments.",                                                      aAr: "تستخدم إليكتي إقامة البيانات السعودية وبنية الامتثال لـ PDPL والتوافق مع إطار الأمن السيبراني لـ NCA وضوابط الوصول القائمة على الأدوار وتسجيل التدقيق الشامل." },
        { q: "What systems does Electi integrate with?",                   qAr: "ما الأنظمة التي تتكامل معها إليكتي؟",                      a: "Electi integrates with SAP, Oracle, Microsoft Dynamics, Salesforce, WhatsApp Business API, Google Workspace, Microsoft 365, and Saudi government portals — plus custom APIs for proprietary systems.",                                                     aAr: "تتكامل إليكتي مع SAP وOracle وMicrosoft Dynamics وSalesforce وواجهة برمجة واتساب وGoogle Workspace وMicrosoft 365 والبوابات الحكومية السعودية." },
      ]}
      ctaTitle="Build Your Enterprise AI Foundation"
      ctaTitleAr="بناء أساس الذكاء الاصطناعي المؤسسي"
      ctaSub="Transform your Saudi organization with enterprise-grade AI infrastructure aligned with Vision 2030."
      ctaSubAr="حوّل مؤسستك السعودية ببنية تحتية للذكاء الاصطناعي على مستوى مؤسسي ومتوافقة مع رؤية 2030."
    />
  );
}
