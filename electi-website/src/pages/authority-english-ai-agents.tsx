import { Globe, Briefcase, Zap, Users, Shield, CheckCircle, Building2, HeartPulse, ShoppingBag, GraduationCap, Plane, BarChart3 } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "English AI Agents for Saudi Businesses",
    nameAr: "وكلاء الذكاء الاصطناعي الإنجليزي للشركات السعودية",
    description: "Electi deploys English-language AI agents for international companies, expat workforces, and English-first operations in Saudi Arabia — fully bilingual with Arabic support built in.",
    descriptionAr: "تنشر إليكتي وكلاء ذكاء اصطناعي باللغة الإنجليزية للشركات الدولية والقوى العاملة الوافدة والعمليات الإنجليزية الأولى في المملكة العربية السعودية.",
    url: "/english-ai-agents",
    keywords: ["English AI agents Saudi Arabia", "English AI agent Riyadh", "English AI customer support KSA", "bilingual AI agent Saudi", "English WhatsApp AI Saudi Arabia", "international company AI Saudi", "expat AI agent Saudi Arabia"],
  }),
  makeFaqSchema([
    { q: "Can AI agents operate in English for Saudi businesses?", a: "Yes. Electi's AI agents are fully bilingual — operating in English as a primary language for international companies and English-first operations in Saudi Arabia. Arabic is always available as a secondary language, with automatic switching based on the customer's message." },
    { q: "What Saudi businesses need English AI agents?", a: "International companies operating in Saudi Arabia (NEOM contractors, oil & gas firms, financial services), multinational retail brands serving English-speaking expats, educational institutions with international students, and corporate operations requiring English-language internal communication all benefit from English AI agents." },
    { q: "Can English AI agents also speak Arabic?", a: "Yes. All Electi AI agents are bilingual. An English AI agent can switch to Arabic mid-conversation when a customer changes language — without any commands or separate configuration. This is essential in Saudi Arabia's mixed English/Arabic business environment." },
    { q: "Do English AI agents work for NEOM and Vision 2030 projects?", a: "Yes. Many NEOM contractors, Vision 2030 project teams, and international joint ventures in Saudi Arabia operate primarily in English. Electi's English AI agents handle project inquiries, supply chain queries, and HR questions in English while maintaining Arabic capability for Saudi national team members." },
    { q: "Can English AI agents serve Saudi expat communities?", a: "Yes. Saudi Arabia's 13+ million expatriate population — primarily from South Asia, Southeast Asia, Western countries, and the Arab world — often communicates in English as a common language. Electi's English AI agents serve this population while remaining bilingual with Arabic." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Agents", url: "/agents" },
    { name: "English AI Agents", url: "/english-ai-agents" },
  ]),
];

export default function EnglishAIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="English AI Agents Saudi Arabia | International & Expat Business | Electi"
      seoTitleAr="وكلاء الذكاء الاصطناعي الإنجليزي في المملكة | أعمال دولية ووافدون | إليكتي"
      seoDescription="English AI agents for international companies, expat workforces, and English-first operations in Saudi Arabia. Fully bilingual English and Arabic — via WhatsApp Business API."
      seoDescriptionAr="وكلاء ذكاء اصطناعي إنجليزيون للشركات الدولية والقوى العاملة الوافدة والعمليات الإنجليزية الأولى في المملكة العربية السعودية. ثنائيو اللغة بالكامل إنجليزي وعربي."
      seoPath="/english-ai-agents"
      seoKeywords="English AI agents Saudi Arabia, English AI agent Riyadh, bilingual AI agent Saudi, English WhatsApp AI Saudi, international company AI Saudi Arabia, expat workforce AI KSA, NEOM AI agents"
      seoKeywordsAr="وكلاء ذكاء اصطناعي إنجليزي في المملكة، وكيل ذكاء اصطناعي إنجليزي عربي، ذكاء اصطناعي للشركات الدولية في السعودية، وكيل ذكاء اصطناعي للمغتربين"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/agents" },
        { label: "English AI Agents", labelAr: "وكلاء الذكاء الاصطناعي الإنجليزي", href: "/english-ai-agents" },
      ]}
      badge="English AI Agents"
      badgeAr="وكلاء الذكاء الاصطناعي الإنجليزي"
      h1="English AI Agents"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="for Global Saudi Teams"
      h1AccentAr="الإنجليزي للفرق الدولية"
      tagline="AI agents operating in English for international companies, NEOM contractors, and expat-facing Saudi businesses — fully bilingual with Arabic always available."
      taglineAr="وكلاء ذكاء اصطناعي يعملون بالإنجليزية للشركات الدولية ومقاولي نيوم والشركات السعودية التي تواجه المغتربين — ثنائيو اللغة بالكامل مع العربية دائماً متاحة."
      intro="Saudi Arabia's economy operates across two languages. Arabic for Saudi nationals, and English for the international workforce — 13+ million expats, multinational corporations, NEOM contractors, and global joint ventures. Electi's English AI agents serve this English-first population while maintaining full Arabic bilingual capability for seamless mixed-language operations."
      introAr="يعمل اقتصاد المملكة العربية السعودية عبر لغتين. العربية للمواطنين السعوديين، والإنجليزية للقوى العاملة الدولية — أكثر من 13 مليون مغترب وشركات متعددة الجنسيات ومقاولو نيوم والمشاريع المشتركة العالمية. وكلاء الذكاء الاصطناعي الإنجليزيون من إليكتي يخدمون هذا السكان الإنجليزي الأول مع الحفاظ على القدرة الكاملة ثنائية اللغة."
      stats={[
        { value: "13M+", label: "Expats in Saudi Arabia",            labelAr: "مغترب في المملكة" },
        { value: "24/7", label: "English customer coverage",         labelAr: "تغطية عملاء إنجليزية" },
        { value: "2",    label: "Languages (English + Arabic)",      labelAr: "لغتان (إنجليزي + عربي)" },
        { value: "0s",   label: "Response time in English",          labelAr: "وقت الاستجابة بالإنجليزية" },
      ]}
      whatTitle="What Is an English AI Agent for Saudi Arabia?"
      whatTitleAr="ما هو وكيل الذكاء الاصطناعي الإنجليزي للمملكة العربية السعودية؟"
      whatBody="An English AI agent for Saudi Arabia is an AI-powered business automation system that operates primarily in English — serving international employees, English-speaking customers, and global business partners — while maintaining full Arabic capability for Saudi national team members and Arabic-speaking customers. In Saudi Arabia's mixed-language business environment, English AI agents are essential for international companies (oil & gas, financial services, construction, hospitality), educational institutions with international students, and any Saudi business serving a significant expat or tourist population."
      whatBodyAr="وكيل الذكاء الاصطناعي الإنجليزي للمملكة هو نظام أتمتة أعمال مدعوم بالذكاء الاصطناعي يعمل أساساً بالإنجليزية — لخدمة الموظفين الدوليين والعملاء الناطقين بالإنجليزية وشركاء الأعمال العالميين — مع الحفاظ على القدرة العربية الكاملة لأعضاء الفريق السعوديين والعملاء الناطقين بالعربية."
      steps={[
        { n: "01", title: "English Knowledge Base",    titleAr: "قاعدة معرفة إنجليزية",   desc: "Configure your business knowledge, policies, and FAQs in English — with Arabic as a secondary language.", descAr: "كوّن معرفة عملك وسياساتك وأسئلتك الشائعة بالإنجليزية — مع العربية كلغة ثانوية." },
        { n: "02", title: "Bilingual Calibration",    titleAr: "معايرة ثنائية اللغة",     desc: "Set English as primary language — Arabic auto-enabled for customers who message in Arabic.", descAr: "تعيين الإنجليزية كلغة أساسية — العربية تُفعَّل تلقائياً للعملاء الذين يُرسلون رسائل بالعربية." },
        { n: "03", title: "WhatsApp/API Integration", titleAr: "تكامل واتساب/API",        desc: "Connect your WhatsApp Business number and any existing CRM or business systems.", descAr: "ربط رقم واتساب للأعمال وأي أنظمة CRM أو أعمال حالية." },
        { n: "04", title: "Live English Service",     titleAr: "خدمة إنجليزية مباشرة",   desc: "Your English AI agent serves international customers 24/7 — with Arabic ready when needed.", descAr: "وكيلك الذكي الإنجليزي يخدم العملاء الدوليين على مدار الساعة — مع العربية جاهزة عند الحاجة." },
      ]}
      benefits={[
        { icon: Globe,      title: "English-First Operation",       titleAr: "عملية إنجليزية أولاً",       desc: "Configured as an English-primary agent — Arabic always available as a seamless secondary language.", descAr: "مكوَّن كوكيل إنجليزي أولاً — العربية متاحة دائماً كلغة ثانوية سلسة." },
        { icon: Briefcase,  title: "International Business Ready",  titleAr: "جاهز للأعمال الدولية",       desc: "Familiar with international business communication norms — formal English used in global corporate contexts.", descAr: "يعرف أعراف التواصل التجاري الدولي — الإنجليزية الرسمية المستخدمة في السياقات المؤسسية العالمية." },
        { icon: Zap,        title: "Bilingual Auto-Switch",         titleAr: "تبديل تلقائي ثنائي اللغة",   desc: "When a customer messages in Arabic, the agent switches automatically — no commands needed.", descAr: "عندما يُرسل عميل رسالة بالعربية، يتحول الوكيل تلقائياً — لا أوامر مطلوبة." },
        { icon: Building2,  title: "CRM & ERP Integration",        titleAr: "تكامل CRM وERP",              desc: "Connects to Salesforce, SAP, Oracle, and other enterprise systems used by international companies in KSA.", descAr: "يتصل بـ Salesforce وSAP وOracle وأنظمة مؤسسية أخرى تستخدمها الشركات الدولية في المملكة." },
        { icon: Shield,     title: "Saudi Regulatory Compliance",   titleAr: "الامتثال التنظيمي السعودي", desc: "Operates within Saudi Arabia's data residency requirements — PDPL compliant in both English and Arabic.", descAr: "يعمل ضمن متطلبات إقامة البيانات السعودية — متوافق مع PDPL بالإنجليزية والعربية." },
        { icon: CheckCircle, title: "NEOM & Vision 2030 Projects",  titleAr: "مشاريع نيوم ورؤية 2030",    desc: "Deployed for international contractors, joint ventures, and project teams operating in English across Vision 2030.", descAr: "منشور للمقاولين الدوليين والمشاريع المشتركة وفرق المشاريع العاملة بالإنجليزية في إطار رؤية 2030." },
      ]}
      industries={[
        { name: "Oil & Gas (International Ops)", nameAr: "النفط والغاز (العمليات الدولية)" },
        { name: "Construction & NEOM Projects",  nameAr: "الإنشاء ومشاريع نيوم" },
        { name: "Financial Services",            nameAr: "الخدمات المالية" },
        { name: "International Retail & Malls",  nameAr: "التجزئة والمراكز التجارية الدولية" },
        { name: "Education & Universities",      nameAr: "التعليم والجامعات" },
        { name: "Hospitality (International)",   nameAr: "الضيافة الدولية" },
        { name: "Healthcare (Expat-Facing)",     nameAr: "الرعاية الصحية (مواجهة المغتربين)" },
        { name: "Logistics & Shipping",          nameAr: "الخدمات اللوجستية والشحن" },
      ]}
      useCases={[
        { icon: Building2,    label: "International Corporate Ops",  labelAr: "عمليات مؤسسية دولية",        desc: "English HR queries, IT support, procurement — all handled in English for international teams in Saudi Arabia.", descAr: "استفسارات الموارد البشرية الإنجليزية ودعم تقنية المعلومات والمشتريات — كلها تُعالَج بالإنجليزية للفرق الدولية." },
        { icon: HeartPulse,   label: "Expat Patient Services",       labelAr: "خدمات مرضى المغتربين",      desc: "International patients book appointments and get medical info in English at Saudi hospitals and clinics.", descAr: "يحجز المرضى الدوليون المواعيد ويحصلون على معلومات طبية بالإنجليزية في المستشفيات والعيادات السعودية." },
        { icon: Plane,        label: "Tourist & Visitor Support",    labelAr: "دعم السياح والزوار",         desc: "International tourists and business visitors get English support for hotels, transport, and services.", descAr: "يحصل السياح الدوليون وزوار الأعمال على دعم إنجليزي للفنادق والمواصلات والخدمات." },
        { icon: GraduationCap, label: "University International Students", labelAr: "طلاب جامعيون دوليون", desc: "Admissions, registration, and student services in English for international students across Saudi Arabia.", descAr: "القبول والتسجيل وخدمات الطلاب بالإنجليزية للطلاب الدوليين في مختلف أنحاء المملكة." },
        { icon: ShoppingBag,  label: "International Brand Retail",   labelAr: "تجزئة العلامات الدولية",     desc: "International retail brands serving English-speaking customers in Saudi malls and online.", descAr: "العلامات التجارية الدولية تخدم العملاء الناطقين بالإنجليزية في مراكز التسوق السعودية وعبر الإنترنت." },
        { icon: BarChart3,    label: "B2B Supply Chain English Ops", labelAr: "عمليات سلسلة التوريد B2B",  desc: "International suppliers and contractors managing orders, queries, and escalations in English.", descAr: "يدير الموردون والمقاولون الدوليون الطلبات والاستفسارات والتصعيدات بالإنجليزية." },
      ]}
      faqs={[
        { q: "Can AI agents operate in English for Saudi businesses?",     qAr: "هل يمكن لوكلاء الذكاء الاصطناعي العمل بالإنجليزية للشركات السعودية؟", a: "Yes. Electi's AI agents are fully bilingual — configured for English-primary operations for international companies and expat-facing Saudi businesses, with Arabic always available as a seamless secondary language.", aAr: "نعم. وكلاء إليكتي ثنائيو اللغة بالكامل — مكوَّنون للعمليات الإنجليزية الأولى للشركات الدولية والشركات السعودية التي تواجه المغتربين، مع العربية متاحة دائماً." },
        { q: "Can English AI agents switch to Arabic?",                    qAr: "هل يمكن لوكلاء الذكاء الاصطناعي الإنجليزيين التبديل إلى العربية؟",     a: "Yes. When a customer sends a message in Arabic, the English AI agent switches automatically to Arabic — responding in the appropriate Saudi dialect (Najdi or Hijazi) without any commands or configuration changes.", aAr: "نعم. عندما يُرسل عميل رسالة بالعربية، يتحول الوكيل الإنجليزي تلقائياً إلى العربية — الاستجابة باللهجة السعودية المناسبة." },
        { q: "What Saudi businesses need English AI agents?",              qAr: "ما الشركات السعودية التي تحتاج وكلاء ذكاء اصطناعي إنجليزيين؟",       a: "International companies in oil & gas, NEOM contractors, multinational financial services, international retail brands, educational institutions with international students, and hospitality businesses serving international guests.", aAr: "الشركات الدولية في النفط والغاز ومقاولو نيوم والخدمات المالية متعددة الجنسيات والعلامات التجارية الدولية والمؤسسات التعليمية والضيافة الدولية." },
        { q: "Can English AI agents work with Saudi CRM and ERP systems?", qAr: "هل يمكن لوكلاء الذكاء الاصطناعي الإنجليزيين العمل مع أنظمة CRM وERP السعودية؟", a: "Yes. Electi's English AI agents integrate with all major CRM and ERP systems — Salesforce, SAP, Oracle, Odoo, and others — regardless of the language configuration of those systems.", aAr: "نعم. يتكامل وكلاء إليكتي الإنجليزيون مع جميع أنظمة CRM وERP الرئيسية — Salesforce وSAP وOracle وOdoo وغيرها." },
        { q: "Do English AI agents comply with Saudi data regulations?",   qAr: "هل تمتثل وكلاء الذكاء الاصطناعي الإنجليزيون للوائح البيانات السعودية؟", a: "Yes. Electi operates within Saudi Arabia's data residency requirements under the PDPL (Personal Data Protection Law). All customer interaction data — in English or Arabic — is stored within Saudi Arabia.", aAr: "نعم. تعمل إليكتي ضمن متطلبات إقامة البيانات في المملكة بموجب نظام حماية البيانات الشخصية (PDPL). جميع بيانات تفاعل العملاء مُخزَّنة داخل المملكة." },
      ]}
      ctaTitle="Deploy English AI Agents for Your Saudi Operation"
      ctaTitleAr="انشر وكلاء الذكاء الاصطناعي الإنجليزيين لعملياتك السعودية"
      ctaSub="English-first AI agents for international teams in Saudi Arabia. Bilingual with Arabic — 24/7 via WhatsApp."
      ctaSubAr="وكلاء ذكاء اصطناعي إنجليزيون أولاً للفرق الدولية في المملكة العربية السعودية. ثنائيو اللغة مع العربية — على مدار الساعة عبر واتساب."
    />
  );
}
