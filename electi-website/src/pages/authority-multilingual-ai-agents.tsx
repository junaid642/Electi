import { Globe, Languages, MessageCircle, Zap, Users, Shield, HeartPulse, Hotel, ShoppingBag, GraduationCap, Building2, Plane } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Multilingual AI Agents for Saudi Businesses",
    nameAr: "وكلاء الذكاء الاصطناعي متعددو اللغات للشركات السعودية",
    description: "Electi deploys multilingual AI agents speaking Arabic, English, Urdu, Hindi, Tagalog, and Bahasa — serving Saudi Arabia's diverse workforce and international pilgrims via WhatsApp Business API.",
    descriptionAr: "تنشر إليكتي وكلاء ذكاء اصطناعي متعددي اللغات يتحدثون العربية والإنجليزية والأردية والهندية والتغالوغية والبهاسا — لخدمة القوى العاملة المتنوعة في المملكة والحجاج الدوليين.",
    url: "/multilingual-ai-agents",
    keywords: ["multilingual AI agents Saudi Arabia", "Arabic English Urdu AI agent", "AI agent multiple languages", "Hajj multilingual AI", "وكيل ذكاء اصطناعي متعدد اللغات", "AI hospitality Saudi Arabia", "multilingual WhatsApp AI", "Urdu AI agent Saudi"],
  }),
  makeFaqSchema([
    { q: "What languages can Electi's AI agents speak?", a: "Electi's AI agents communicate in Arabic (Najdi, Hijazi, MSA), English, Urdu, Hindi, Tagalog (Filipino), and Bahasa Indonesia/Malay. Additional languages are available for enterprise deployments. Arabic and English are natively supported at dialect level; other languages are supported at conversational level." },
    { q: "Why do Saudi businesses need multilingual AI agents?", a: "Saudi Arabia's population includes over 13 million expatriates from South Asia, Southeast Asia, and beyond — speaking Urdu, Hindi, Tagalog, Bahasa, and other languages. Additionally, Saudi Arabia hosts 20+ million Hajj and Umrah pilgrims annually from 180+ countries. Multilingual AI agents allow Saudi businesses to serve this full population without multilingual human staff." },
    { q: "Can AI agents handle Hajj and Umrah guests in multiple languages?", a: "Yes. Electi's multilingual agents are specifically useful for the Saudi hospitality and religious tourism sector — handling pilgrim inquiries in Arabic, English, Urdu (for Pakistani and Indian pilgrims), and Bahasa (for Indonesian and Malaysian pilgrims) via WhatsApp around the clock during peak seasons." },
    { q: "Can the multilingual AI agent switch languages mid-conversation?", a: "Yes. Electi agents detect the language from the first message and switch automatically if the customer changes language — even within a single conversation. This is common in Saudi Arabia where customers may start in Arabic and switch to English, or vice versa." },
    { q: "How does a multilingual AI agent differ from translation software?", a: "Translation software converts text after the fact — creating awkward, mechanical responses. Electi's multilingual agents are trained to understand intent in each language natively, respond naturally in that language's communication style, and handle cultural nuances — not just word-for-word translation." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Agents", url: "/agents" },
    { name: "Multilingual AI Agents", url: "/multilingual-ai-agents" },
  ]),
];

export default function MultilingualAIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="Multilingual AI Agents Saudi Arabia | Arabic, English, Urdu, Hindi | Electi"
      seoTitleAr="وكلاء الذكاء الاصطناعي متعددو اللغات في المملكة | عربي، إنجليزي، أردي، هندي | إليكتي"
      seoDescription="Multilingual AI agents for Saudi businesses — Arabic, English, Urdu, Hindi, Tagalog, and Bahasa. Serve Saudi Arabia's diverse workforce and international pilgrims 24/7 via WhatsApp."
      seoDescriptionAr="وكلاء ذكاء اصطناعي متعددو اللغات للشركات السعودية — عربي وإنجليزي وأردي وهندي. اخدم القوى العاملة المتنوعة في المملكة والحجاج الدوليين على مدار الساعة عبر واتساب."
      seoPath="/multilingual-ai-agents"
      seoKeywords="multilingual AI agents Saudi Arabia, Arabic English Urdu AI agent, multilingual WhatsApp AI, Hajj pilgrimage AI agent, وكيل ذكاء اصطناعي متعدد اللغات, AI agent multiple languages Saudi"
      seoKeywordsAr="وكيل ذكاء اصطناعي متعدد اللغات، وكيل عربي إنجليزي أردي، ذكاء اصطناعي للحج والعمرة، خدمة عملاء متعددة اللغات"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/agents" },
        { label: "Multilingual AI Agents", labelAr: "وكلاء متعددو اللغات", href: "/multilingual-ai-agents" },
      ]}
      badge="Multilingual AI Agents"
      badgeAr="وكلاء ذكاء اصطناعي متعددو اللغات"
      h1="Multilingual AI Agents"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="Arabic, English, Urdu & More"
      h1AccentAr="متعددو اللغات"
      tagline="AI agents that speak your customers' languages — Arabic, English, Urdu, Hindi, Tagalog, and Bahasa — across Saudi Arabia's diverse population."
      taglineAr="وكلاء ذكاء اصطناعي يتحدثون لغات عملائك — العربية والإنجليزية والأردية والهندية والتغالوغية والبهاسا — عبر السكان المتنوعين في المملكة."
      intro="Saudi Arabia's population is one of the most linguistically diverse in the world — over 13 million expatriates from South Asia and Southeast Asia, international businesses requiring English operations, and 20+ million annual pilgrims speaking 50+ languages. Electi's multilingual AI agents serve this full spectrum, giving Saudi businesses one AI platform that covers every customer interaction without multilingual human staff."
      introAr="سكان المملكة العربية السعودية من أكثر الفئات تنوعاً لغوياً في العالم — أكثر من 13 مليون مغترب من جنوب آسيا وجنوب شرق آسيا وعمالدوليون يتطلبون عمليات إنجليزية وأكثر من 20 مليون حاج سنوي يتحدثون أكثر من 50 لغة. وكلاء إليكتي متعددو اللغات يخدمون هذا الطيف الكامل."
      stats={[
        { value: "6+",   label: "Languages supported",               labelAr: "لغات مدعومة" },
        { value: "180+", label: "Nationalities served (Hajj/Umrah)", labelAr: "جنسية تُخدَم (الحج/العمرة)" },
        { value: "13M+", label: "Expats in Saudi Arabia",            labelAr: "مغترب في المملكة" },
        { value: "24/7", label: "Multilingual coverage",             labelAr: "تغطية متعددة اللغات" },
      ]}
      whatTitle="What Is a Multilingual AI Agent?"
      whatTitleAr="ما هو وكيل الذكاء الاصطناعي متعدد اللغات؟"
      whatBody="A multilingual AI agent is an AI-powered business automation system that can communicate, understand, and respond in multiple languages within a single conversation. Unlike translation tools that convert text mechanically, Electi's multilingual agents understand intent, idiom, and cultural context in each language. For Saudi businesses, this means a single AI agent deployment can serve Arabic-speaking Saudi nationals, English-speaking international staff, Urdu-speaking South Asian workers, and Bahasa-speaking pilgrims — all from one WhatsApp number, without separate systems or human translators."
      whatBodyAr="وكيل الذكاء الاصطناعي متعدد اللغات هو نظام أتمتة أعمال مدعوم بالذكاء الاصطناعي يمكنه التواصل والفهم والاستجابة بلغات متعددة في محادثة واحدة. على عكس أدوات الترجمة التي تحوّل النص بشكل ميكانيكي، يفهم وكلاء إليكتي متعددو اللغات النية والتعبير والسياق الثقافي في كل لغة. للشركات السعودية، هذا يعني نشر وكيل ذكاء اصطناعي واحد يمكنه خدمة المواطنين السعوديين والموظفين الدوليين والعمال الجنوب آسيويين والحجاج — كل ذلك من رقم واتساب واحد."
      steps={[
        { n: "01", title: "Language Configuration",  titleAr: "تكوين اللغة",         desc: "Select which languages your agent needs — Arabic, English, Urdu, Hindi, Tagalog, Bahasa, or a custom set.", descAr: "حدد اللغات التي يحتاجها وكيلك — عربي وإنجليزي وأردي وهندي وتغالوغي وبهاسا أو مجموعة مخصصة." },
        { n: "02", title: "Domain Knowledge Setup", titleAr: "إعداد قاعدة المعرفة", desc: "Load your business knowledge in Arabic and English — the AI handles translation and adaptation for other languages.", descAr: "حمّل معرفة عملك بالعربية والإنجليزية — يتولى الذكاء الاصطناعي الترجمة والتكيف للغات الأخرى." },
        { n: "03", title: "WhatsApp Connection",     titleAr: "ربط واتساب",           desc: "Connect your WhatsApp Business number — one number serves customers in all configured languages.", descAr: "ربط رقم واتساب للأعمال — رقم واحد يخدم العملاء بجميع اللغات المكوَّنة." },
        { n: "04", title: "Multilingual Launch",     titleAr: "إطلاق متعدد اللغات",   desc: "Your agent goes live, detecting each customer's language and responding in their native tongue instantly.", descAr: "ينطلق وكيلك مباشرةً، يكتشف لغة كل عميل ويستجيب بلغته الأم فوراً." },
      ]}
      benefits={[
        { icon: Globe,         title: "Arabic-First Foundation",        titleAr: "أساس عربي أولاً",           desc: "Full Najdi + Hijazi dialect Arabic as the primary language — English and other languages built on top.", descAr: "عربية نجدية + حجازية كاملة كلغة أساسية — الإنجليزية واللغات الأخرى مبنية فوقها." },
        { icon: Languages,     title: "6+ Language Coverage",           titleAr: "تغطية 6+ لغات",             desc: "Arabic, English, Urdu, Hindi, Tagalog, Bahasa — covering Saudi Arabia's major expatriate communities.", descAr: "عربي وإنجليزي وأردي وهندي وتغالوغي وبهاسا — تغطي كبرى مجتمعات المغتربين في المملكة." },
        { icon: MessageCircle, title: "One WhatsApp Number",            titleAr: "رقم واتساب واحد",           desc: "All languages served from your existing WhatsApp number — no separate bots or phone trees.", descAr: "جميع اللغات تُخدَم من رقم واتساب الحالي — لا روبوتات أو قوائم هاتفية منفصلة." },
        { icon: Plane,         title: "Hajj & Umrah Season Ready",      titleAr: "جاهز لموسم الحج والعمرة",   desc: "Scale to handle pilgrim volumes in Arabic, Urdu, Bahasa, and English during Hajj/Umrah peaks.", descAr: "توسُّع للتعامل مع أحجام الحجاج بالعربية والأردية والبهاسا والإنجليزية خلال ذروة الحج والعمرة." },
        { icon: Zap,           title: "Instant Language Detection",     titleAr: "اكتشاف لغة فوري",           desc: "Detects the customer's language from the first message — no language selection menu required.", descAr: "يكتشف لغة العميل من الرسالة الأولى — لا قائمة اختيار لغة مطلوبة." },
        { icon: Shield,        title: "Saudi Data Compliance",          titleAr: "الامتثال لبيانات سعودية",   desc: "All multilingual conversations stored within Saudi Arabia — PDPL compliant regardless of language.", descAr: "جميع المحادثات متعددة اللغات مُخزَّنة داخل المملكة — متوافق مع PDPL بغض النظر عن اللغة." },
      ]}
      industries={[
        { name: "Hospitality & Religious Tourism",  nameAr: "الضيافة والسياحة الدينية" },
        { name: "Healthcare & Clinics",             nameAr: "الرعاية الصحية والعيادات" },
        { name: "Construction & Labour",            nameAr: "الإنشاء والعمالة" },
        { name: "Retail & Malls",                   nameAr: "التجزئة والمراكز التجارية" },
        { name: "Corporate HR",                     nameAr: "الموارد البشرية المؤسسية" },
        { name: "Education",                        nameAr: "التعليم" },
        { name: "Government Services",              nameAr: "الخدمات الحكومية" },
        { name: "Logistics & Ports",                nameAr: "الخدمات اللوجستية والموانئ" },
      ]}
      useCases={[
        { icon: Hotel,        label: "Pilgrim Hotel Support",        labelAr: "دعم فنادق الحجاج",        desc: "Mecca/Medina hotels serve pilgrims in Arabic, Urdu, Bahasa, and English — one AI agent handles all.",          descAr: "تخدم فنادق مكة والمدينة الحجاج بالعربية والأردية والبهاسا والإنجليزية — وكيل ذكاء اصطناعي واحد يتعامل مع الكل." },
        { icon: HeartPulse,   label: "Multilingual Clinic Booking", labelAr: "حجز عيادات متعدد اللغات", desc: "Expat patients book appointments in their native language — clinic system updated in Arabic.",                 descAr: "يحجز المرضى المغتربون المواعيد بلغتهم الأم — يتم تحديث نظام العيادة بالعربية." },
        { icon: Building2,    label: "Expat HR Self-Service",       labelAr: "خدمات الموارد البشرية",    desc: "South Asian expat workers access leave requests, payroll queries in Urdu or Hindi via WhatsApp.",              descAr: "يتاح للعمال المغتربين الجنوب آسيويين الوصول إلى طلبات الإجازة واستفسارات الرواتب بالأردية أو الهندية." },
        { icon: ShoppingBag,  label: "Tourist Retail Assistance",   labelAr: "مساعدة تجارة السياح",      desc: "Mall and retail AI agents assist tourists in their language — Arabic, English, or Bahasa.",                   descAr: "وكلاء التجزئة يساعدون السياح بلغتهم — عربي وإنجليزي وبهاسا." },
        { icon: GraduationCap, label: "University Admissions",      labelAr: "قبول الجامعات",            desc: "International student inquiries answered in English, Arabic, or their native language instantly.",            descAr: "استفسارات الطلاب الدوليين تُجاب فوراً بالإنجليزية أو العربية أو لغتهم الأم." },
        { icon: Users,        label: "Multilingual Corporate HR",   labelAr: "موارد بشرية مؤسسية",      desc: "Corporations with mixed Saudi and expat workforces serve all employees in their preferred language.",          descAr: "تخدم الشركات ذات القوى العاملة السعودية والوافدة المختلطة جميع الموظفين بلغتهم المفضلة." },
      ]}
      faqs={[
        { q: "What languages can Electi's AI agents speak?",                qAr: "ما اللغات التي يمكن لوكلاء إليكتي التحدث بها؟",                    a: "Electi's AI agents support Arabic (Najdi, Hijazi, MSA), English, Urdu, Hindi, Tagalog, and Bahasa Indonesia/Malay. Additional languages are available for enterprise deployments.",      aAr: "يدعم وكلاء إليكتي العربية (النجدية والحجازية والفصحى) والإنجليزية والأردية والهندية والتغالوغية والبهاسا الإندونيسية/الملايوية. لغات إضافية متاحة للنشر المؤسسي." },
        { q: "Why do Saudi businesses need multilingual AI?",               qAr: "لماذا تحتاج الشركات السعودية إلى ذكاء اصطناعي متعدد اللغات؟",      a: "Saudi Arabia has 13+ million expatriates from South Asia and Southeast Asia, plus 20+ million annual pilgrims from 180+ countries. Multilingual AI agents allow businesses to serve this diverse population without hiring multilingual staff for every language.",                           aAr: "لدى المملكة أكثر من 13 مليون مغترب من جنوب آسيا وجنوب شرق آسيا، بالإضافة إلى أكثر من 20 مليون حاج سنوي من أكثر من 180 دولة." },
        { q: "Can AI agents handle Hajj pilgrims in multiple languages?",   qAr: "هل يمكن لوكلاء الذكاء الاصطناعي خدمة الحجاج بلغات متعددة؟",       a: "Yes. Electi's multilingual agents are specifically valuable for Saudi hospitality businesses during Hajj and Umrah seasons — handling pilgrim inquiries in Arabic, Urdu, Bahasa, and English simultaneously via WhatsApp.",                                                              aAr: "نعم. وكلاء إليكتي متعددو اللغات ذو قيمة خاصة لشركات الضيافة السعودية خلال مواسم الحج والعمرة — التعامل مع استفسارات الحجاج بالعربية والأردية والبهاسا والإنجليزية في آنٍ واحد." },
        { q: "Does the multilingual agent need separate WhatsApp numbers?", qAr: "هل يحتاج الوكيل متعدد اللغات أرقام واتساب منفصلة؟",               a: "No. All languages are served from your single existing WhatsApp Business number. The AI detects the customer's language automatically from their first message and responds in that language.",                                                                                           aAr: "لا. جميع اللغات تُخدَم من رقم واتساب للأعمال الواحد الحالي. يكتشف الذكاء الاصطناعي لغة العميل تلقائياً من رسالته الأولى." },
        { q: "Can multilingual AI agents integrate with Arabic ERP?",       qAr: "هل يمكن للوكلاء متعددي اللغات التكامل مع ERP العربي؟",             a: "Yes. Electi's multilingual agents integrate with Odoo, SAP, Oracle, and other ERP systems. A customer may query in Urdu, but the data retrieved and updated in the ERP system is in Arabic — the agent handles the language bridge automatically.",                                      aAr: "نعم. يتكامل وكلاء إليكتي متعددو اللغات مع Odoo وSAP وOracle وأنظمة ERP أخرى. قد يستعلم عميل بالأردية، لكن البيانات المسترجعة والمحدَّثة في ERP تكون بالعربية." },
      ]}
      ctaTitle="Deploy Multilingual AI Across Your Saudi Business"
      ctaTitleAr="انشر الذكاء الاصطناعي متعدد اللغات في شركتك السعودية"
      ctaSub="One AI agent. Six languages. Arabic, English, Urdu, Hindi, Tagalog, and Bahasa — serving every customer via WhatsApp."
      ctaSubAr="وكيل ذكاء اصطناعي واحد. ست لغات. عربي وإنجليزي وأردي وهندي وتغالوغي وبهاسا — يخدم كل عميل عبر واتساب."
    />
  );
}
