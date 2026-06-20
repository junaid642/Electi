import { BarChart3, MessageCircle, Globe, Zap, Users, Target, CheckCircle, HeartPulse, Hotel, ShoppingBag, Building2, HardHat } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Arabic AI Sales Agents for Saudi Businesses",
    nameAr: "وكلاء المبيعات العربيون بالذكاء الاصطناعي للشركات السعودية",
    description: "Electi's Arabic AI sales agents qualify inbound leads in Saudi Arabic dialects via WhatsApp — capturing buyer intent, scoring prospects, updating CRM, and booking sales meetings 24/7.",
    descriptionAr: "وكلاء مبيعات إليكتي العربيون بالذكاء الاصطناعي يؤهّلون العملاء المحتملين الواردين باللهجات العربية السعودية عبر واتساب — التقاط نية المشتري وتقييم الآفاق وتحديث CRM وحجز اجتماعات المبيعات على مدار الساعة.",
    url: "/arabic-ai-sales-agents",
    keywords: ["Arabic AI sales agents", "وكيل مبيعات عربي", "Arabic sales automation Saudi Arabia", "Arabic lead qualification WhatsApp", "AI sales agent Arabic", "Arabic CRM automation", "Saudi Arabic sales AI"],
  }),
  makeFaqSchema([
    { q: "Can AI agents qualify sales leads in Arabic?", a: "Yes. Electi's Arabic AI sales agents engage inbound leads on WhatsApp in Arabic (Najdi or Hijazi dialect), qualify their requirements, budget, and timeline through a natural conversation, score the lead, and either book a sales meeting or route to a human sales rep — all automatically." },
    { q: "Do Arabic AI sales agents understand Saudi business communication norms?", a: "Yes. Saudi business communication has specific cultural norms — appropriate formality, relationship-building questions, and indirect communication styles. Electi's Arabic sales agents are calibrated for Saudi business communication, not just translated Western sales scripts." },
    { q: "Can Arabic AI sales agents update CRM in Arabic?", a: "Yes. Electi's Arabic sales agents connect to Salesforce, HubSpot, Zoho, and other CRM systems. When a lead provides information in Arabic, the agent captures it and creates or updates the CRM record — translating and logging the data in your configured CRM language." },
    { q: "What is an Arabic AI sales agent?", a: "An Arabic AI sales agent is an AI-powered system that engages inbound sales leads on WhatsApp in Arabic, qualifies their intent and requirements through natural conversation, and takes sales actions — booking meetings, sending product information, creating CRM records — without human involvement for initial qualification." },
    { q: "Can Arabic AI sales agents handle real estate inquiries in Saudi Arabia?", a: "Yes. Arabic AI sales agents from Electi are particularly effective for Saudi real estate — qualifying buyer/renter intent, property preferences, budget range, and location preference in Arabic, then routing warm leads to sales agents with a full qualification summary." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Sales Agents", url: "/ai-sales-agents" },
    { name: "Arabic AI Sales Agents", url: "/arabic-ai-sales-agents" },
  ]),
];

export default function ArabicSalesAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="Arabic AI Sales Agents Saudi Arabia | WhatsApp Lead Qualification | Electi"
      seoTitleAr="وكلاء المبيعات العربيون بالذكاء الاصطناعي في المملكة | تأهيل عملاء واتساب | إليكتي"
      seoDescription="Arabic AI sales agents that qualify inbound leads in Saudi Arabic dialects via WhatsApp. Capture buyer intent, update CRM, and book sales meetings — 24/7 in Arabic and English."
      seoDescriptionAr="وكلاء مبيعات عربيون بالذكاء الاصطناعي يؤهّلون العملاء المحتملين الواردين باللهجات العربية السعودية عبر واتساب. التقاط نية المشتري وتحديث CRM وحجز اجتماعات المبيعات على مدار الساعة."
      seoPath="/arabic-ai-sales-agents"
      seoKeywords="Arabic AI sales agents, وكيل مبيعات عربي, Arabic sales automation Saudi Arabia, Arabic lead qualification, AI sales agent Arabic, Arabic CRM automation, Saudi Arabic sales AI"
      seoKeywordsAr="وكيل مبيعات عربي، وكلاء مبيعات ذكاء اصطناعي عربي، أتمتة المبيعات بالعربية، تأهيل عملاء محتملين عربي، مبيعات واتساب عربي"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Sales Agents", labelAr: "وكلاء المبيعات الذكيون", href: "/ai-sales-agents" },
        { label: "Arabic AI Sales Agents", labelAr: "وكلاء المبيعات العربيون", href: "/arabic-ai-sales-agents" },
      ]}
      badge="Arabic AI Sales Agents"
      badgeAr="وكلاء المبيعات العربيون بالذكاء الاصطناعي"
      h1="Arabic AI Sales Agents"
      h1Ar="وكلاء المبيعات العربيون"
      h1Accent="Qualify Leads in Arabic"
      h1AccentAr="بالذكاء الاصطناعي"
      tagline="AI sales agents that engage, qualify, and close Saudi leads in Arabic — Najdi, Hijazi, or English — 24/7 via WhatsApp without a human sales rep."
      taglineAr="وكلاء مبيعات ذكيون يتفاعلون ويؤهّلون ويغلقون العملاء السعوديين المحتملين بالعربية — نجدية أو حجازية أو إنجليزية — على مدار الساعة عبر واتساب."
      intro="Inbound sales leads in Saudi Arabia arrive via WhatsApp — and they expect immediate, natural Arabic responses. Electi's Arabic AI sales agents engage every lead the moment they message, qualify their requirements through natural Arabic conversation, and route warm leads to your human sales team with a full qualification summary."
      introAr="تصل العملاء المحتملون في المبيعات في المملكة العربية السعودية عبر واتساب — ويتوقعون ردوداً فورية وطبيعية بالعربية. وكلاء المبيعات العربيون من إليكتي يتفاعلون مع كل عميل محتمل في اللحظة التي يُرسل فيها رسالة، ويؤهّلون متطلباته من خلال محادثة عربية طبيعية، ويوجّهون العملاء المهتمين إلى فريق المبيعات البشري مع ملخص تأهيل كامل."
      stats={[
        { value: "24/7", label: "Arabic lead response",         labelAr: "استجابة العملاء المحتملين العرب" },
        { value: "0s",   label: "Response to Arabic WhatsApp",  labelAr: "وقت الرد على واتساب العربي" },
        { value: "100%", label: "Leads captured and logged",    labelAr: "العملاء المحتملون المُلتقطون والمسجَّلون" },
        { value: "2x",   label: "Sales team capacity increase", labelAr: "زيادة طاقة فريق المبيعات" },
      ]}
      whatTitle="What Is an Arabic AI Sales Agent?"
      whatTitleAr="ما هو وكيل المبيعات العربي بالذكاء الاصطناعي؟"
      whatBody="An Arabic AI sales agent is an AI-powered system that engages inbound sales leads via WhatsApp in Arabic, conducts a natural qualification conversation in Saudi dialects (Najdi or Hijazi), captures lead details, scores the lead, and takes next-step actions — booking a meeting, sending a product brochure, or routing to a human sales rep. Unlike traditional lead forms that capture basic information, an Arabic AI sales agent builds rapport in the customer's dialect, follows up naturally, and surfaces the high-intent leads your sales team needs. For Saudi businesses, this means every WhatsApp lead is engaged instantly, qualified in Arabic, and logged to your CRM — even at 3am during a property launch or a Ramadan campaign."
      whatBodyAr="وكيل المبيعات العربي بالذكاء الاصطناعي هو نظام مدعوم بالذكاء الاصطناعي يتفاعل مع العملاء المحتملين في المبيعات الواردين عبر واتساب بالعربية، ويجري محادثة تأهيل طبيعية باللهجات السعودية (النجدية أو الحجازية)، ويلتقط تفاصيل العميل المحتمل، ويقيّمه، ويتخذ إجراءات الخطوة التالية — حجز اجتماع أو إرسال كتيب منتج أو التوجيه إلى مندوب مبيعات بشري."
      steps={[
        { n: "01", title: "Sales Script in Arabic",    titleAr: "نص مبيعات بالعربية",   desc: "Define your qualification questions and sales flow in Arabic — the agent adapts to Saudi conversational norms.", descAr: "حدد أسئلة التأهيل وتدفق المبيعات بالعربية — يتكيف الوكيل مع الأعراف المحادثية السعودية." },
        { n: "02", title: "CRM Integration",          titleAr: "تكامل CRM",             desc: "Connect Salesforce, HubSpot, Zoho, or your CRM — leads are automatically created and scored.", descAr: "ربط Salesforce أو HubSpot أو Zoho أو CRM الخاص بك — يتم إنشاء العملاء المحتملين وتقييمهم تلقائياً." },
        { n: "03", title: "Calendar Connection",      titleAr: "ربط التقويم",           desc: "Connect your sales team's calendar — the agent books qualified leads directly into available slots.", descAr: "ربط تقويم فريق المبيعات — يحجز الوكيل العملاء المؤهَّلين مباشرةً في الخانات المتاحة." },
        { n: "04", title: "Launch Arabic Sales",      titleAr: "إطلاق المبيعات العربية", desc: "Every WhatsApp lead in Arabic is engaged, qualified, and logged — your sales team focuses on closing.", descAr: "كل عميل محتمل على واتساب بالعربية يتم التفاعل معه وتأهيله وتسجيله — يركز فريق المبيعات على الإغلاق." },
      ]}
      benefits={[
        { icon: MessageCircle, title: "Arabic WhatsApp Engagement",  titleAr: "تفاعل عربي عبر واتساب",     desc: "Every inbound WhatsApp lead in Arabic is engaged instantly — no lead left unanswered.", descAr: "كل عميل محتمل وارد على واتساب بالعربية يتم التفاعل معه فوراً — لا يُترك أي عميل دون إجابة." },
        { icon: Target,        title: "Saudi Dialect Qualification", titleAr: "تأهيل باللهجة السعودية",   desc: "Qualifies leads in Najdi or Hijazi Arabic naturally — not generic formal language.", descAr: "يؤهّل العملاء باللهجة النجدية أو الحجازية بشكل طبيعي — لا لغة رسمية عامة." },
        { icon: BarChart3,     title: "CRM Auto-Update",             titleAr: "تحديث تلقائي لـ CRM",      desc: "Lead details captured in Arabic are automatically logged to your CRM in the configured language.", descAr: "تفاصيل العميل المحتمل المُلتقطة بالعربية تُسجَّل تلقائياً في CRM بالإعداد المكوَّن." },
        { icon: Globe,         title: "Arabic ↔ English Switching",  titleAr: "تبديل عربي ↔ إنجليزي",    desc: "Switches languages mid-conversation based on the lead's preference — no awkward language locks.", descAr: "يبدّل اللغات في منتصف المحادثة بناءً على تفضيل العميل المحتمل." },
        { icon: Zap,           title: "Instant Meeting Booking",     titleAr: "حجز اجتماع فوري",           desc: "Qualifies the lead and books a meeting in your sales team's calendar — all within one WhatsApp conversation.", descAr: "يؤهّل العميل المحتمل ويحجز اجتماعاً في تقويم فريق المبيعات — كل ذلك في محادثة واتساب واحدة." },
        { icon: CheckCircle,   title: "Saudi Business Etiquette",    titleAr: "آداب الأعمال السعودية",     desc: "Trained on Saudi business communication norms — appropriate formality, trust-building, and follow-up.", descAr: "مدرَّب على أعراف التواصل التجاري السعودي — رسمية مناسبة وبناء ثقة ومتابعة." },
      ]}
      industries={[
        { name: "Real Estate",            nameAr: "العقارات" },
        { name: "Healthcare & Clinics",   nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality & Hotels",   nameAr: "الضيافة والفنادق" },
        { name: "Financial Services",     nameAr: "الخدمات المالية" },
        { name: "Retail & E-commerce",   nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Construction",           nameAr: "الإنشاء" },
        { name: "Education & Training",   nameAr: "التعليم والتدريب" },
        { name: "Professional Services",  nameAr: "الخدمات المهنية" },
      ]}
      useCases={[
        { icon: Building2,   label: "Real Estate Lead Qualification", labelAr: "تأهيل عملاء العقارات",       desc: "Buyer inquires in Arabic about a property — AI captures budget, location, type, timeline, routes to agent.", descAr: "يستفسر المشتري بالعربية عن عقار — يلتقط الذكاء الاصطناعي الميزانية والموقع والنوع ويوجّه إلى الوكيل." },
        { icon: HeartPulse,  label: "Medical Procedure Inquiries",    labelAr: "استفسارات الإجراءات الطبية", desc: "Patient inquires about cosmetic, dental, or elective procedure in Arabic — AI qualifies and books consultation.", descAr: "يستفسر المريض عن إجراء تجميلي أو أسنان بالعربية — يؤهّل الذكاء الاصطناعي ويحجز الاستشارة." },
        { icon: Hotel,       label: "Event & Venue Sales",            labelAr: "مبيعات الفعاليات والقاعات",  desc: "Groups inquire about wedding halls, event venues, corporate bookings in Arabic — AI qualifies, sales team closes.", descAr: "تستفسر المجموعات عن قاعات الأفراح وقاعات الفعاليات بالعربية — يؤهّل الذكاء الاصطناعي، فريق المبيعات يُغلق." },
        { icon: ShoppingBag, label: "Retail Product Consultation",    labelAr: "استشارة منتجات التجزئة",     desc: "Customer asks about product features, bulk pricing, or custom orders in Arabic — AI recommends, qualifies, and books.", descAr: "يسأل العميل عن مميزات المنتج أو الأسعار الجملة بالعربية — يوصي الذكاء الاصطناعي ويؤهّل ويحجز." },
        { icon: HardHat,     label: "Construction Project Leads",     labelAr: "عملاء محتملون لمشاريع إنشائية", desc: "Contractors inquire about project specifications in Arabic — AI captures requirements and routes to sales.", descAr: "يستفسر المقاولون عن مواصفات المشروع بالعربية — يلتقط الذكاء الاصطناعي المتطلبات ويوجّه إلى المبيعات." },
        { icon: Users,       label: "B2B Corporate Sales",            labelAr: "مبيعات B2B المؤسسية",         desc: "Procurement managers inquire in Arabic about enterprise AI solutions — qualified and routed to account managers.", descAr: "يستفسر مديرو المشتريات بالعربية عن حلول الذكاء الاصطناعي المؤسسية — يتم تأهيلهم وتوجيههم لمديري الحسابات." },
      ]}
      faqs={[
        { q: "Can AI agents qualify sales leads in Arabic?",                     qAr: "هل يمكن لوكلاء الذكاء الاصطناعي تأهيل عملاء مبيعات محتملين بالعربية؟",    a: "Yes. Electi's Arabic AI sales agents engage inbound WhatsApp leads in Arabic — qualifying requirements, budget, timeline, and intent through natural conversation, then routing warm leads to your human sales team.", aAr: "نعم. وكلاء مبيعات إليكتي العربيون يتفاعلون مع العملاء المحتملين الواردين على واتساب بالعربية — تأهيل المتطلبات والميزانية والجدول الزمني والنية." },
        { q: "What is an Arabic AI sales agent?",                               qAr: "ما هو وكيل المبيعات العربي بالذكاء الاصطناعي؟",                            a: "An Arabic AI sales agent engages inbound leads via WhatsApp in Arabic, conducts natural qualification conversations in Saudi dialects (Najdi or Hijazi), and takes sales actions — booking meetings, creating CRM records, or routing to human reps.", aAr: "وكيل المبيعات العربي يتفاعل مع العملاء المحتملين الواردين عبر واتساب بالعربية، ويجري محادثات تأهيل طبيعية باللهجات السعودية." },
        { q: "Do Arabic sales AI agents work with Saudi real estate?",           qAr: "هل تعمل وكلاء مبيعات الذكاء الاصطناعي العربية مع العقارات السعودية؟",     a: "Yes. Arabic AI sales agents from Electi are particularly effective for Saudi real estate — qualifying buyer intent, budget range, property preferences, and location in Arabic, then routing to human agents with full lead summaries.", aAr: "نعم. وكلاء مبيعات الذكاء الاصطناعي العربيون من إليكتي فعّالون بشكل خاص في العقارات السعودية — تأهيل نية المشتري والميزانية وتفضيلات العقار والموقع بالعربية." },
        { q: "Can Arabic AI sales agents book meetings?",                        qAr: "هل يمكن لوكلاء المبيعات العربيين بالذكاء الاصطناعي حجز الاجتماعات؟",      a: "Yes. Once a lead is qualified, the AI sales agent checks your sales team's calendar availability and books the meeting directly — sending a confirmation in Arabic or English based on the customer's preference.", aAr: "نعم. بعد تأهيل العميل المحتمل، يفحص وكيل المبيعات الذكي توفر تقويم فريق المبيعات ويحجز الاجتماع مباشرةً." },
        { q: "Can Arabic AI sales agents integrate with our CRM?",              qAr: "هل يمكن لوكلاء مبيعات الذكاء الاصطناعي العربيين التكامل مع CRM؟",         a: "Yes. Electi's Arabic sales agents integrate with Salesforce, HubSpot, Zoho, Pipedrive, and other major CRM platforms. Lead data captured in Arabic is automatically logged to your CRM.", aAr: "نعم. يتكامل وكلاء مبيعات إليكتي العربيون مع Salesforce وHubSpot وZoho وPipedrive وغيرها. تُسجَّل بيانات العميل المحتمل المُلتقطة بالعربية تلقائياً في CRM." },
      ]}
      ctaTitle="Deploy Arabic Sales Agents Across Your Pipeline"
      ctaTitleAr="انشر وكلاء المبيعات العربيين في مسار مبيعاتك"
      ctaSub="Every Arabic WhatsApp lead qualified, logged, and booked — 24/7 without a human sales rep needed for first contact."
      ctaSubAr="كل عميل محتمل عربي على واتساب يتم تأهيله وتسجيله وحجزه — على مدار الساعة دون الحاجة لمندوب مبيعات بشري للتواصل الأول."
    />
  );
}
