import { Phone, MessageCircle, Globe, Calendar, Clock, Zap, Users, Building2, HeartPulse, Hotel, Scale, GraduationCap } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Arabic AI Receptionists for Saudi Businesses",
    nameAr: "موظفو الاستقبال العربيون بالذكاء الاصطناعي للشركات السعودية",
    description: "Electi's Arabic AI receptionists greet customers, answer inquiries, and book appointments via WhatsApp in Saudi Arabic dialects — available 24/7, never missing an Arabic customer message.",
    descriptionAr: "يرحّب موظفو الاستقبال العربيون من إليكتي بالعملاء ويجيبون على الاستفسارات ويحجزون المواعيد عبر واتساب باللهجات العربية السعودية — متاحون على مدار الساعة، لا يفوّتون أي رسالة عميل عربي.",
    url: "/arabic-ai-receptionists",
    keywords: ["Arabic AI receptionist", "موظف استقبال ذكي عربي", "Arabic WhatsApp receptionist", "AI receptionist Saudi Arabia", "Arabic appointment booking AI", "Arabic front desk AI", "موظف استقبال واتساب عربي"],
  }),
  makeFaqSchema([
    { q: "What is an Arabic AI receptionist?", a: "An Arabic AI receptionist is an AI-powered system that handles front-desk functions via WhatsApp in Arabic — greeting customers in their dialect (Najdi or Hijazi), answering business questions, booking appointments in your calendar, and routing inquiries to the appropriate team member — available 24/7 without human intervention." },
    { q: "Can an Arabic AI receptionist book appointments?", a: "Yes. Electi's Arabic AI receptionists connect to your calendar system in real time — checking availability, booking appointments, sending Arabic confirmation messages, and setting reminders via WhatsApp — all in Arabic and English, based on the customer's language preference." },
    { q: "Can an Arabic AI receptionist handle multiple inquiries simultaneously?", a: "Yes. Unlike a human receptionist who handles one conversation at a time, Electi's Arabic AI receptionist handles unlimited simultaneous WhatsApp conversations — every Arabic customer gets an immediate response regardless of volume or time of day." },
    { q: "Does the Arabic AI receptionist sound natural in Saudi dialect?", a: "Yes. Electi's Arabic receptionists are specifically calibrated for Saudi dialects — Najdi and Hijazi — and use culturally appropriate greetings, responses, and professional formality that matches Saudi business communication norms." },
    { q: "Can an Arabic AI receptionist work for clinics in Saudi Arabia?", a: "Yes. Arabic AI receptionists from Electi are widely used by Saudi clinics and hospitals — handling patient WhatsApp inquiries in Arabic, booking appointments, sending reminders, and providing pre-visit instructions, significantly reducing front-desk workload and no-show rates." },
  ]),
  makeBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Voice Agents", url: "/ai-voice-agents" },
    { name: "Arabic AI Receptionists", url: "/arabic-ai-receptionists" },
  ]),
];

export default function ArabicReceptionistsPage() {
  return (
    <AuthorityPage
      seoTitle="Arabic AI Receptionists Saudi Arabia | WhatsApp Appointment Booking | Electi"
      seoTitleAr="موظف الاستقبال الذكي العربي في المملكة | حجز مواعيد واتساب | إليكتي"
      seoDescription="Arabic AI receptionists that greet customers, answer inquiries, and book appointments via WhatsApp in Saudi dialects — 24/7. Never miss another Arabic customer message."
      seoDescriptionAr="موظفو استقبال ذكيون عربيون يرحّبون بالعملاء ويجيبون على الاستفسارات ويحجزون المواعيد عبر واتساب باللهجات السعودية — على مدار الساعة."
      seoPath="/arabic-ai-receptionists"
      seoKeywords="Arabic AI receptionist, موظف استقبال ذكي عربي, Arabic WhatsApp receptionist, AI receptionist Saudi Arabia, Arabic appointment booking AI, Arabic front desk AI"
      seoKeywordsAr="موظف استقبال ذكي عربي، استقبال ذكاء اصطناعي عربي، حجز مواعيد عربي تلقائي، واتساب استقبال عربي ذكي، موظف استقبال واتساب"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Voice Agents", labelAr: "وكلاء الصوت الذكي", href: "/ai-voice-agents" },
        { label: "Arabic AI Receptionists", labelAr: "موظفو الاستقبال العرب", href: "/arabic-ai-receptionists" },
      ]}
      badge="Arabic AI Receptionists"
      badgeAr="موظفو الاستقبال العربيون بالذكاء الاصطناعي"
      h1="Arabic AI Receptionists"
      h1Ar="موظف الاستقبال الذكي"
      h1Accent="Never Miss an Arabic Message"
      h1AccentAr="العربي — لا تفوّت رسالة"
      tagline="AI receptionists that greet, answer, and book in Saudi Arabic dialects via WhatsApp — 24/7, with zero hold time and unlimited simultaneous conversations."
      taglineAr="موظفو استقبال ذكيون يرحّبون ويجيبون ويحجزون باللهجات العربية السعودية عبر واتساب — على مدار الساعة، بلا وقت انتظار ومحادثات متزامنة غير محدودة."
      intro="Every missed Arabic WhatsApp message is a lost customer. Electi's Arabic AI receptionists ensure every customer is greeted instantly, in their dialect, at any hour — booking appointments, answering questions, and routing inquiries without human involvement. Your human front desk focuses on in-person guests while the AI handles the WhatsApp flow."
      introAr="كل رسالة واتساب عربية فائتة هي عميل ضائع. يضمن موظفو الاستقبال العربيون من إليكتي ترحيب كل عميل فوراً، بلهجته، في أي وقت — حجز المواعيد والإجابة على الأسئلة وتوجيه الاستفسارات دون تدخل بشري."
      stats={[
        { value: "24/7", label: "Arabic WhatsApp coverage",          labelAr: "تغطية واتساب عربية" },
        { value: "0s",   label: "Greeting response time",            labelAr: "وقت استجابة الترحيب" },
        { value: "∞",    label: "Simultaneous Arabic conversations", labelAr: "محادثات عربية متزامنة" },
        { value: "2",    label: "Saudi dialects (Najdi + Hijazi)",   labelAr: "لهجتان سعوديتان" },
      ]}
      whatTitle="What Is an Arabic AI Receptionist?"
      whatTitleAr="ما هو موظف الاستقبال الذكي العربي؟"
      whatBody="An Arabic AI receptionist is an AI-powered front-desk system operating via WhatsApp Business API that handles the reception function in Arabic — greeting customers in their Saudi dialect, answering standard business questions, checking calendar availability, booking appointments, sending confirmations, and routing complex inquiries to the relevant team member. Electi's Arabic AI receptionists are calibrated for Saudi business communication norms: the appropriate level of formality, Islamic greeting conventions (السلام عليكم), and the professional warmth expected in Saudi customer service. They handle Najdi Arabic, Hijazi Arabic, and English — switching automatically based on the customer's language."
      whatBodyAr="موظف الاستقبال الذكي العربي هو نظام استقبال مدعوم بالذكاء الاصطناعي يعمل عبر WhatsApp Business API ويتعامل مع وظيفة الاستقبال بالعربية — الترحيب بالعملاء بلهجتهم السعودية والإجابة على الأسئلة التجارية القياسية وفحص توفر التقويم وحجز المواعيد وإرسال التأكيدات وتوجيه الاستفسارات المعقدة إلى عضو الفريق المعني."
      steps={[
        { n: "01", title: "Business Knowledge in Arabic", titleAr: "معرفة الأعمال بالعربية", desc: "Configure your services, policies, working hours, and FAQs in Arabic and English.",                   descAr: "كوّن خدماتك وسياساتك وساعات العمل وأسئلتك الشائعة بالعربية والإنجليزية." },
        { n: "02", title: "Calendar Integration",         titleAr: "تكامل التقويم",           desc: "Connect your appointment calendar — Google Calendar, Outlook, or clinic management system.",          descAr: "ربط تقويم المواعيد — Google Calendar أو Outlook أو نظام إدارة العيادة." },
        { n: "03", title: "Arabic Greeting Setup",        titleAr: "إعداد الترحيب العربي",    desc: "Set the greeting tone, formality, and dialect that matches your brand's voice in Arabic.",           descAr: "تعيين نبرة الترحيب والرسمية واللهجة التي تتوافق مع صوت علامتك التجارية بالعربية." },
        { n: "04", title: "Launch 24/7 Arabic Reception", titleAr: "إطلاق الاستقبال العربي",  desc: "Your Arabic AI receptionist goes live — greeting and serving every Arabic WhatsApp customer.", descAr: "ينطلق موظف الاستقبال الذكي العربي — يرحّب بكل عميل واتساب عربي ويخدمه." },
      ]}
      benefits={[
        { icon: MessageCircle, title: "WhatsApp Arabic First",          titleAr: "واتساب عربي أولاً",            desc: "Operates on official WhatsApp Business API — the primary customer communication channel in Saudi Arabia.", descAr: "يعمل على WhatsApp Business API الرسمي — قناة التواصل الأساسية مع العملاء في المملكة." },
        { icon: Calendar,      title: "Real-Time Appointment Booking",  titleAr: "حجز مواعيد في الوقت الفعلي", desc: "Books appointments directly in your calendar during the Arabic WhatsApp conversation — no manual handoff.", descAr: "يحجز المواعيد مباشرةً في تقويمك أثناء محادثة واتساب العربية — لا تسليم يدوي." },
        { icon: Globe,         title: "Najdi + Hijazi Dialects",        titleAr: "اللهجة النجدية + الحجازية",   desc: "Greets and responds in the customer's actual Saudi dialect — not generic formal Arabic.", descAr: "يرحّب ويستجيب بلهجة العميل السعودية الفعلية — لا عربية رسمية عامة." },
        { icon: Clock,         title: "After-Hours Arabic Coverage",    titleAr: "تغطية عربية خارج ساعات العمل", desc: "Answers Arabic WhatsApp messages at 2am, on weekends, and during Eid — never missing a customer.", descAr: "يجيب على رسائل واتساب العربية في الساعة 2 صباحاً وعطل نهاية الأسبوع والعيد — لا يفوّت عميلاً." },
        { icon: Zap,           title: "Instant Confirmation Messages",  titleAr: "رسائل تأكيد فورية",           desc: "Sends Arabic appointment confirmations and reminders automatically — reducing no-shows.", descAr: "يرسل تأكيدات وتذكيرات المواعيد العربية تلقائياً — يقلل من حالات عدم الحضور." },
        { icon: Users,         title: "Team Routing in Arabic",         titleAr: "توجيه الفريق بالعربية",       desc: "Routes Arabic customer requests to the right team member or department based on inquiry type.", descAr: "يوجّه طلبات العملاء العربية إلى عضو الفريق أو القسم المناسب بناءً على نوع الاستفسار." },
      ]}
      industries={[
        { name: "Healthcare & Private Clinics",  nameAr: "الرعاية الصحية والعيادات الخاصة" },
        { name: "Legal & Law Firms",             nameAr: "المكاتب القانونية" },
        { name: "Hospitality & Hotels",          nameAr: "الضيافة والفنادق" },
        { name: "Real Estate Agencies",          nameAr: "وكالات العقارات" },
        { name: "Education & Training Centers",  nameAr: "التعليم ومراكز التدريب" },
        { name: "Financial Advisors",            nameAr: "المستشارون الماليون" },
        { name: "Beauty & Wellness",             nameAr: "الجمال والعافية" },
        { name: "Corporate Offices",             nameAr: "المكاتب المؤسسية" },
      ]}
      useCases={[
        { icon: HeartPulse,  label: "Clinic Patient Booking",        labelAr: "حجز مرضى العيادات",           desc: "Patients message in Najdi or Hijazi Arabic — AI books the appointment, sends confirmation, sets reminder.", descAr: "يُرسل المرضى رسائل بالعربية النجدية أو الحجازية — يحجز الذكاء الاصطناعي الموعد ويرسل التأكيد ويضبط التذكير." },
        { icon: Scale,       label: "Law Firm Client Intake",        labelAr: "استقبال عملاء المكاتب القانونية", desc: "Clients describe their legal matter in Arabic — AI gathers case details and books consultation.", descAr: "يصف العملاء قضيتهم القانونية بالعربية — يجمع الذكاء الاصطناعي تفاصيل القضية ويحجز الاستشارة." },
        { icon: Hotel,       label: "Hotel Guest Inquiries",         labelAr: "استفسارات ضيوف الفندق",        desc: "Arabic-speaking guests ask about check-in, facilities, and services — AI responds instantly in their dialect.", descAr: "يسأل الضيوف الناطقون بالعربية عن تسجيل الوصول والمرافق والخدمات — يستجيب الذكاء الاصطناعي فوراً بلهجتهم." },
        { icon: Building2,   label: "Real Estate Viewing Booking",  labelAr: "حجز مشاهدة عقار",              desc: "Property buyers inquire in Arabic — AI books property viewings directly into agent calendars.", descAr: "يستفسر مشترو العقارات بالعربية — يحجز الذكاء الاصطناعي مشاهدات العقارات مباشرةً في تقاويم الوكلاء." },
        { icon: GraduationCap, label: "Education Enrollment",       labelAr: "التسجيل التعليمي",             desc: "Prospective students inquire about programs in Arabic — AI captures details and books enrollment appointments.", descAr: "يستفسر الطلاب المحتملون عن البرامج بالعربية — يلتقط الذكاء الاصطناعي التفاصيل ويحجز مواعيد التسجيل." },
        { icon: Phone,       label: "Corporate Switchboard",        labelAr: "بدالة الشركات",                desc: "Arabic callers reach the right department via WhatsApp — no long IVR trees or hold times.", descAr: "يصل المتصلون العرب إلى القسم الصحيح عبر واتساب — بلا قوائم IVR طويلة أو أوقات انتظار." },
      ]}
      faqs={[
        { q: "What is an Arabic AI receptionist?",                          qAr: "ما هو موظف الاستقبال الذكي العربي؟",                            a: "An Arabic AI receptionist handles front-desk functions via WhatsApp in Arabic — greeting customers in their Saudi dialect, answering business questions, booking appointments, and routing inquiries — available 24/7 without human intervention.", aAr: "موظف الاستقبال الذكي العربي يتعامل مع وظائف الاستقبال عبر واتساب بالعربية — الترحيب بالعملاء بلهجتهم السعودية وحجز المواعيد وتوجيه الاستفسارات — متاح على مدار الساعة." },
        { q: "Can an Arabic AI receptionist book appointments?",             qAr: "هل يمكن لموظف الاستقبال الذكي العربي حجز المواعيد؟",            a: "Yes. Electi's Arabic AI receptionists connect to your calendar system in real time — checking availability, booking appointments, and sending Arabic confirmation messages and reminders via WhatsApp.", aAr: "نعم. يتصل موظفو الاستقبال الذكيون العرب من إليكتي بنظام التقويم في الوقت الفعلي — فحص التوفر وحجز المواعيد وإرسال رسائل التأكيد العربية والتذكيرات." },
        { q: "Does the Arabic AI receptionist sound natural?",              qAr: "هل يبدو موظف الاستقبال الذكي العربي طبيعياً؟",                  a: "Yes. Electi's Arabic receptionists are calibrated for Saudi dialects (Najdi and Hijazi) and use culturally appropriate greetings, formality, and professional language that matches Saudi business communication norms.", aAr: "نعم. وكلاء الاستقبال العربيون من إليكتي معايَرون للهجات السعودية (النجدية والحجازية) ويستخدمون التحيات والرسمية المناسبة ثقافياً." },
        { q: "Can it handle multiple Arabic customers at once?",            qAr: "هل يمكنه التعامل مع عدة عملاء عرب في وقت واحد؟",               a: "Yes. Unlike a human receptionist who handles one conversation at a time, Electi's Arabic AI receptionist handles unlimited simultaneous WhatsApp conversations — every customer gets an immediate response.", aAr: "نعم. على عكس موظف الاستقبال البشري الذي يتعامل مع محادثة واحدة في كلٍّ مرة، يتعامل موظف الاستقبال الذكي مع محادثات واتساب متزامنة غير محدودة." },
        { q: "Can the Arabic AI receptionist work for clinics?",            qAr: "هل يمكن لموظف الاستقبال الذكي العربي العمل في العيادات؟",       a: "Yes. Electi's Arabic AI receptionists are widely used by Saudi clinics — handling patient WhatsApp inquiries in Arabic, booking appointments, sending reminders, and providing pre-visit instructions, significantly reducing front-desk workload.", aAr: "نعم. يستخدم وكلاء الاستقبال الذكيون العرب من إليكتي على نطاق واسع في العيادات السعودية — التعامل مع استفسارات المرضى عبر واتساب بالعربية وحجز المواعيد وإرسال التذكيرات." },
      ]}
      ctaTitle="Deploy Your Arabic AI Receptionist Today"
      ctaTitleAr="انشر موظف الاستقبال الذكي العربي اليوم"
      ctaSub="Every Arabic WhatsApp message answered instantly — appointments booked, customers served, no call left behind."
      ctaSubAr="كل رسالة واتساب عربية يُرد عليها فوراً — مواعيد محجوزة، عملاء مخدومون، لا مكالمات مهجورة."
    />
  );
}
