import { MessageCircle, Globe, Zap, Users, Shield, CheckCircle, Clock, HeartPulse, Hotel, ShoppingBag, Building2, Scale } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Arabic AI Customer Support for Saudi Businesses",
    nameAr: "دعم العملاء العربي بالذكاء الاصطناعي للشركات السعودية",
    description: "Electi provides 24/7 Arabic AI customer support via WhatsApp — handling inquiries, complaints, order status, and FAQ responses in Saudi Arabic dialects (Najdi and Hijazi) and English.",
    descriptionAr: "تقدم إليكتي دعم عملاء عربي بالذكاء الاصطناعي على مدار الساعة عبر واتساب — التعامل مع الاستفسارات والشكاوى وحالة الطلب واستجابات الأسئلة الشائعة باللهجات العربية السعودية.",
    url: "/arabic-ai-customer-support",
    keywords: ["Arabic AI customer support", "وكيل خدمة العملاء العربي", "Arabic customer service AI", "Arabic WhatsApp support", "AI customer support Saudi Arabia", "Arabic chatbot customer service", "Saudi customer support AI"],
  }),
  makeFaqSchema([
    { q: "Can AI agents handle customer support in Arabic?", a: "Yes. Electi's Arabic AI customer support agents handle inbound WhatsApp inquiries in Arabic and English 24/7. They answer product and service questions, process complaints, check order status, explain policies, and escalate unresolvable cases to human agents with full conversation context." },
    { q: "What Arabic dialects does the AI customer support agent understand?", a: "Electi's customer support agents understand Najdi Arabic (Riyadh and central Saudi Arabia), Hijazi Arabic (Jeddah, Mecca, Medina), and Modern Standard Arabic. They also handle English. The agent responds in the same dialect the customer uses." },
    { q: "Can the AI customer support agent handle complaints?", a: "Yes. The Arabic AI customer support agent identifies complaint intent from the customer's Arabic or English message, acknowledges the complaint appropriately (using culturally appropriate language), attempts resolution within its configured scope, and escalates to a human agent when needed — with the full conversation transcript preserved." },
    { q: "How does Arabic AI customer support integrate with CRM?", a: "Electi's Arabic AI customer support agents connect to Salesforce, HubSpot, Zoho, and other CRM systems via API. When a customer sends an Arabic WhatsApp message, the agent can retrieve their account history, update CRM records, create support tickets, and log interactions — all automatically." },
    { q: "Is Arabic AI customer support better than a human support team?", a: "Arabic AI customer support handles high-volume repetitive inquiries (FAQs, order status, policy questions) faster and at lower cost than human agents. Human agents excel at complex negotiations, emotional situations, and non-standard cases. The optimal setup is AI handling tier-1 (80% of volume) with humans handling tier-2 escalations." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Customer Support", url: "/ai-customer-support-agents" },
    { name: "Arabic AI Customer Support", url: "/arabic-ai-customer-support" },
  ]),
];

export default function ArabicCustomerSupportPage() {
  return (
    <AuthorityPage
      seoTitle="Arabic AI Customer Support Saudi Arabia | 24/7 WhatsApp | Electi"
      seoTitleAr="دعم العملاء العربي بالذكاء الاصطناعي في المملكة | واتساب 24/7 | إليكتي"
      seoDescription="24/7 Arabic AI customer support via WhatsApp — handles inquiries, complaints, and order status in Najdi and Hijazi Arabic for Saudi businesses. Instant responses, zero wait time."
      seoDescriptionAr="دعم عملاء عربي بالذكاء الاصطناعي على مدار الساعة عبر واتساب — يتعامل مع الاستفسارات والشكاوى وحالة الطلب باللهجات العربية السعودية للشركات السعودية."
      seoPath="/arabic-ai-customer-support"
      seoKeywords="Arabic AI customer support, وكيل خدمة العملاء العربي, Arabic customer service AI, Arabic WhatsApp support, AI customer support Saudi Arabia, Arabic chatbot customer service"
      seoKeywordsAr="وكيل خدمة العملاء العربي، دعم عملاء ذكاء اصطناعي عربي، خدمة عملاء واتساب عربي، ذكاء اصطناعي لدعم العملاء السعوديين"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Customer Support", labelAr: "دعم العملاء الذكي", href: "/ai-customer-support-agents" },
        { label: "Arabic AI Customer Support", labelAr: "دعم العملاء العربي", href: "/arabic-ai-customer-support" },
      ]}
      badge="Arabic AI Customer Support"
      badgeAr="دعم العملاء العربي بالذكاء الاصطناعي"
      h1="Arabic AI Customer Support"
      h1Ar="دعم العملاء العربي"
      h1Accent="24/7 in Saudi Dialect"
      h1AccentAr="بالذكاء الاصطناعي على مدار الساعة"
      tagline="Arabic customer support that never sleeps — handling inquiries, complaints, and order tracking in Najdi and Hijazi Arabic instantly via WhatsApp."
      taglineAr="دعم عملاء عربي لا ينام — يتعامل مع الاستفسارات والشكاوى وتتبع الطلبات باللهجة النجدية والحجازية فوراً عبر واتساب."
      intro="Saudi customers expect immediate, culturally appropriate responses in their language. Electi's Arabic AI customer support agents deliver exactly that — answering WhatsApp inquiries in Najdi or Hijazi Arabic around the clock, handling the full tier-1 support load so your human team focuses on complex cases."
      introAr="يتوقع العملاء السعوديون ردوداً فورية ومناسبة ثقافياً بلغتهم. يقدم وكلاء دعم العملاء العربيون من إليكتي ذلك بالضبط — الإجابة على استفسارات واتساب باللهجة النجدية أو الحجازية على مدار الساعة، والتعامل مع العبء الكامل لدعم الطبقة الأولى حتى يتمكن فريقك من التركيز على الحالات المعقدة."
      stats={[
        { value: "24/7", label: "Arabic support coverage",          labelAr: "تغطية دعم عربي" },
        { value: "0s",   label: "Response time in Arabic",          labelAr: "وقت الاستجابة بالعربية" },
        { value: "80%",  label: "Tier-1 queries resolved by AI",    labelAr: "استفسارات الطبقة الأولى يحلها الذكاء الاصطناعي" },
        { value: "2",    label: "Saudi dialects (Najdi + Hijazi)",  labelAr: "لهجتان سعوديتان (نجدية + حجازية)" },
      ]}
      whatTitle="What Is Arabic AI Customer Support?"
      whatTitleAr="ما هو دعم العملاء العربي بالذكاء الاصطناعي؟"
      whatBody="Arabic AI customer support is an AI-powered system that handles inbound customer inquiries in Arabic — understanding Saudi dialects, responding naturally, and resolving issues without human involvement for standard requests. Electi's Arabic customer support agents operate via WhatsApp Business API, the dominant customer service channel for Saudi businesses. They handle: product and service questions in Arabic, complaint acknowledgment and routing, order status queries from connected ERP/CRM systems, policy and returns questions, and appointment rescheduling — all in real time, in the customer's dialect."
      whatBodyAr="دعم العملاء العربي بالذكاء الاصطناعي هو نظام مدعوم بالذكاء الاصطناعي يتعامل مع استفسارات العملاء الواردة بالعربية — يفهم اللهجات السعودية، ويستجيب بشكل طبيعي، ويحل المشكلات دون تدخل بشري للطلبات القياسية. يعمل وكلاء دعم العملاء العربيون من إليكتي عبر WhatsApp Business API، القناة السائدة لخدمة العملاء للشركات السعودية."
      steps={[
        { n: "01", title: "Arabic Knowledge Base",   titleAr: "قاعدة المعرفة العربية", desc: "Configure your product/service information, FAQs, and policies in Arabic and English.", descAr: "كوّن معلومات منتجك/خدمتك والأسئلة الشائعة والسياسات بالعربية والإنجليزية." },
        { n: "02", title: "CRM/ERP Connection",      titleAr: "ربط CRM/ERP",            desc: "Connect your customer data systems so the agent can retrieve order status, account info, and history.", descAr: "ربط أنظمة بيانات عملائك حتى يتمكن الوكيل من استرداد حالة الطلب ومعلومات الحساب والتاريخ." },
        { n: "03", title: "Escalation Workflows",   titleAr: "سير عمل التصعيد",        desc: "Define which situations trigger human escalation and which team member receives each type of case.", descAr: "حدد المواقف التي تؤدي إلى التصعيد البشري وعضو الفريق الذي يستقبل كل نوع من الحالات." },
        { n: "04", title: "Launch Arabic Support",  titleAr: "إطلاق الدعم العربي",     desc: "Go live on WhatsApp — your AI handles Arabic customer inquiries 24/7 from day one.", descAr: "الإطلاق على واتساب — يتعامل وكيلك الذكي مع استفسارات العملاء العربية على مدار الساعة منذ اليوم الأول." },
      ]}
      benefits={[
        { icon: MessageCircle, title: "WhatsApp Arabic Support",     titleAr: "دعم عربي عبر واتساب",        desc: "Operates on the official WhatsApp Business API — the preferred customer channel for Saudi consumers.", descAr: "يعمل على WhatsApp Business API الرسمي — قناة العملاء المفضلة للمستهلكين السعوديين." },
        { icon: Globe,         title: "Najdi + Hijazi Dialects",     titleAr: "اللهجة النجدية + الحجازية",  desc: "Understands and responds in the actual dialects Saudi customers use — not generic formal Arabic.", descAr: "يفهم ويستجيب باللهجات الفعلية التي يستخدمها العملاء السعوديون — لا عربية رسمية عامة." },
        { icon: Clock,         title: "Zero Wait Time",              titleAr: "صفر وقت انتظار",             desc: "Every Arabic WhatsApp message receives an instant response — no hold times, no queue delays.", descAr: "كل رسالة واتساب عربية تتلقى ردًا فورياً — لا أوقات انتظار، لا تأخيرات طابور." },
        { icon: Zap,           title: "CRM Live Data Access",        titleAr: "وصول حي لبيانات CRM",       desc: "Retrieves order status, account history, and policy information from your CRM in real time.", descAr: "يسترد حالة الطلب وتاريخ الحساب ومعلومات السياسة من CRM في الوقت الفعلي." },
        { icon: CheckCircle,   title: "Culturally Appropriate Tone", titleAr: "نبرة مناسبة ثقافياً",       desc: "Responds with Saudi business communication norms — appropriate formality, greetings, and expressions.", descAr: "يستجيب وفق أعراف التواصل التجاري السعودي — رسمية مناسبة وتحيات وتعبيرات." },
        { icon: Shield,        title: "PDPL Customer Data Safety",   titleAr: "أمان بيانات العملاء PDPL",   desc: "All customer interactions stored within Saudi Arabia — fully PDPL compliant.", descAr: "جميع تفاعلات العملاء مُخزَّنة داخل المملكة العربية السعودية — متوافق تماماً مع PDPL." },
      ]}
      industries={[
        { name: "Retail & E-commerce",   nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Healthcare & Clinics",  nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality",           nameAr: "الضيافة" },
        { name: "Financial Services",    nameAr: "الخدمات المالية" },
        { name: "Real Estate",           nameAr: "العقارات" },
        { name: "Telecommunications",    nameAr: "الاتصالات" },
        { name: "Construction",          nameAr: "الإنشاء" },
        { name: "Education",             nameAr: "التعليم" },
      ]}
      useCases={[
        { icon: ShoppingBag,  label: "E-commerce Order Support",   labelAr: "دعم طلبات التجارة الإلكترونية", desc: "Arabic order status, returns, delivery tracking — handled automatically in the customer's dialect.", descAr: "حالة الطلب العربية والمرتجعات وتتبع التسليم — معالجتها تلقائياً بلهجة العميل." },
        { icon: HeartPulse,   label: "Clinic Patient Inquiries",   labelAr: "استفسارات مرضى العيادات",        desc: "Patients ask in Najdi Arabic — AI responds with appointment info, doctor availability, and policies.", descAr: "يسأل المرضى بالعربية النجدية — يستجيب الذكاء الاصطناعي بمعلومات المواعيد وتوفر الأطباء والسياسات." },
        { icon: Hotel,        label: "Hotel Guest Services",       labelAr: "خدمات ضيوف الفندق",             desc: "Room service requests, checkout queries, facility information — in Arabic via WhatsApp instantly.", descAr: "طلبات خدمة الغرف واستفسارات المغادرة ومعلومات المرافق — بالعربية عبر واتساب فوراً." },
        { icon: Building2,    label: "Corporate Internal Support", labelAr: "دعم داخلي للشركات",             desc: "Employee HR queries, policy questions, and IT helpdesk in Arabic — routed to the right team.", descAr: "استفسارات الموارد البشرية للموظفين وأسئلة السياسات ومكتب المساعدة التقني بالعربية." },
        { icon: Scale,        label: "Legal Firm Client Intake",   labelAr: "استقبال عملاء المكاتب القانونية", desc: "Clients describe cases in Arabic — AI captures details, checks conflicts, and books consultation.", descAr: "يصف العملاء القضايا بالعربية — يجمع الذكاء الاصطناعي التفاصيل ويفحص التعارضات ويحجز الاستشارة." },
        { icon: Users,        label: "Telecom Customer Support",   labelAr: "دعم عملاء الاتصالات",           desc: "Plan inquiries, billing questions, and technical support in Arabic — zero call center wait time.", descAr: "استفسارات الخطط وأسئلة الفواتير والدعم التقني بالعربية — صفر وقت انتظار مراكز الاتصال." },
      ]}
      faqs={[
        { q: "Can AI agents handle customer support in Arabic?",           qAr: "هل يمكن لوكلاء الذكاء الاصطناعي التعامل مع دعم العملاء بالعربية؟",   a: "Yes. Electi's Arabic AI customer support agents handle WhatsApp inquiries in Arabic and English 24/7 — answering questions, processing complaints, checking order status, and routing escalations to human agents.", aAr: "نعم. وكلاء دعم العملاء العربيون من إليكتي يتعاملون مع استفسارات واتساب بالعربية والإنجليزية على مدار الساعة." },
        { q: "What dialects does the customer support AI understand?",     qAr: "ما اللهجات التي يفهمها الذكاء الاصطناعي لدعم العملاء؟",               a: "The agent understands Najdi Arabic (Riyadh dialect), Hijazi Arabic (Jeddah/Mecca dialect), Modern Standard Arabic, and English. It responds in the same dialect the customer uses.", aAr: "يفهم الوكيل العربية النجدية (لهجة الرياض) والحجازية (لهجة جدة/مكة) والفصحى والإنجليزية. يستجيب بنفس لهجة العميل." },
        { q: "Can the AI handle complaints in Arabic?",                   qAr: "هل يمكن للذكاء الاصطناعي التعامل مع الشكاوى بالعربية؟",               a: "Yes. The agent identifies complaint intent, responds with culturally appropriate acknowledgment in Arabic, attempts resolution within its configured scope, and escalates with full context when resolution is beyond its scope.", aAr: "نعم. يحدد الوكيل نية الشكوى ويستجيب بإقرار مناسب ثقافياً بالعربية ويحاول الحل ويصعّد مع السياق الكامل." },
        { q: "Does Arabic AI customer support connect to order management?", qAr: "هل يتصل دعم العملاء العربي بنظام إدارة الطلبات؟",                   a: "Yes. The agent connects to your order management system, CRM, or ERP via API — retrieving live order status, delivery tracking, and account information in response to customer Arabic WhatsApp messages.", aAr: "نعم. يتصل الوكيل بنظام إدارة الطلبات أو CRM أو ERP عبر API — استرداد حالة الطلب الحية وتتبع التسليم ومعلومات الحساب." },
        { q: "How does Arabic AI support escalate to human agents?",      qAr: "كيف يصعّد دعم الذكاء الاصطناعي العربي إلى الوكلاء البشريين؟",       a: "When a customer issue exceeds the AI's configured scope — or the customer explicitly requests a human — the agent performs a warm handoff, routing the conversation to the right team member with the full Arabic conversation transcript preserved.", aAr: "عندما تتجاوز مشكلة العميل النطاق المكوَّن للذكاء الاصطناعي، يقوم الوكيل بتسليم دافئ ويوجّه المحادثة إلى عضو الفريق المناسب مع نسخة المحادثة العربية الكاملة." },
      ]}
      ctaTitle="Launch Arabic Customer Support Today"
      ctaTitleAr="أطلق دعم العملاء العربي اليوم"
      ctaSub="24/7 Arabic customer support via WhatsApp — Najdi, Hijazi, and English. Zero wait time. Zero missed inquiries."
      ctaSubAr="دعم عملاء عربي على مدار الساعة عبر واتساب — نجدية وحجازية وإنجليزية. صفر وقت انتظار. صفر استفسارات فائتة."
    />
  );
}
