export interface CaseStudy {
  slug: string;
  category: string;
  categoryAr: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  industryType: string;
  industryTypeAr: string;
  businessType: string;       // generic, no real client name
  businessTypeAr: string;
  challenge: string;
  challengeAr: string;
  challengePoints: { en: string; ar: string }[];
  solution: string;
  solutionAr: string;
  solutionPoints: { en: string; ar: string }[];
  technologies: { name: string; nameAr: string; desc: string; descAr: string }[];
  implementation: { step: string; title: string; titleAr: string; desc: string; descAr: string }[];
  outcomes: { title: string; titleAr: string; desc: string; descAr: string }[];
  agents: string[];
  agentsAr: string[];
  faqs: { q: string; qAr: string; a: string; aAr: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ai-customer-support",
    category: "AI Customer Support",
    categoryAr: "دعم العملاء بالذكاء الاصطناعي",
    title: "24/7 AI Customer Support Agent",
    titleAr: "وكيل دعم عملاء بالذكاء الاصطناعي على مدار الساعة",
    tagline: "How a WhatsApp-first customer support agent resolves inquiries at any hour",
    taglineAr: "كيف يحل وكيل الدعم القائم على واتساب الاستفسارات في أي وقت",
    industryType: "Retail & Services",
    industryTypeAr: "التجزئة والخدمات",
    businessType: "Example: A mid-size retail business in Saudi Arabia",
    businessTypeAr: "مثال: شركة تجزئة متوسطة الحجم في المملكة العربية السعودية",
    challenge: "Many Saudi businesses receive the majority of customer inquiries via WhatsApp — often outside office hours. Staff cannot cover evenings, weekends, and Eid holidays. Unanswered messages lead to customer frustration and lost sales.",
    challengeAr: "تتلقى كثير من الشركات السعودية غالبية استفسارات العملاء عبر واتساب — وكثيراً خارج ساعات العمل. لا يمكن للموظفين تغطية المساء والعطلات الأسبوعية وإجازات عيد. تؤدي الرسائل غير المُجاب عليها إلى إحباط العملاء وضياع المبيعات.",
    challengePoints: [
      { en: "High volume of repetitive WhatsApp inquiries consuming staff time", ar: "حجم كبير من استفسارات واتساب المتكررة تستهلك وقت الموظفين" },
      { en: "No coverage outside 9am–5pm, resulting in missed evening inquiries", ar: "لا تغطية خارج 9 صباحاً–5 مساءً، مما يؤدي إلى تفويت استفسارات المساء" },
      { en: "Inconsistent response quality across different staff members", ar: "جودة استجابة غير متسقة عبر أعضاء الفريق المختلفين" },
      { en: "Customer wait times averaging several hours during peak periods", ar: "متوسط أوقات انتظار العملاء عدة ساعات خلال فترات الذروة" },
    ],
    solution: "An Electi AI Customer Support Agent deployed on WhatsApp Business API. The agent handles FAQs, product inquiries, order status, and basic complaints — and routes complex cases to human staff with full conversation context.",
    solutionAr: "تم نشر وكيل Electi لدعم العملاء بالذكاء الاصطناعي على WhatsApp Business API. يتعامل الوكيل مع الأسئلة الشائعة واستفسارات المنتجات وحالة الطلب والشكاوى الأساسية — ويُحيل الحالات المعقدة إلى الموظفين البشريين مع كامل سياق المحادثة.",
    solutionPoints: [
      { en: "Trained on the business's product catalogue, FAQs, and policies", ar: "مُدرَّب على كتالوج منتجات الشركة والأسئلة الشائعة والسياسات" },
      { en: "Bilingual Arabic/English responses matching customer's language preference", ar: "ردود ثنائية اللغة عربي/إنجليزي تطابق تفضيل لغة العميل" },
      { en: "Automatic human handoff with conversation summary for complex cases", ar: "تسليم تلقائي إلى بشري مع ملخص المحادثة للحالات المعقدة" },
      { en: "CRM integration to log all interactions and capture new leads", ar: "تكامل CRM لتسجيل جميع التفاعلات والتقاط عملاء محتملين جدد" },
    ],
    technologies: [
      { name: "WhatsApp Business API", nameAr: "WhatsApp Business API", desc: "Official Meta WhatsApp Business API — not an unofficial bot", descAr: "WhatsApp Business API الرسمي من Meta — وليس بوتاً غير رسمي" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Core language model for natural conversation in Arabic and English", descAr: "نموذج اللغة الأساسي للمحادثة الطبيعية بالعربية والإنجليزية" },
      { name: "Electi Agent Platform", nameAr: "منصة وكيل Electi", desc: "Workflow routing, human handoff, and conversation management", descAr: "توجيه سير العمل والتسليم البشري وإدارة المحادثة" },
    ],
    implementation: [
      { step: "01", title: "Onboarding & Knowledge Setup", titleAr: "الإعداد والمعرفة", desc: "The business provides its FAQ document, product catalogue, return policy, and any common questions. Electi's team configures the agent's knowledge base.", descAr: "تُقدّم الشركة وثيقة الأسئلة الشائعة وكتالوج المنتجات وسياسة الإرجاع وأي أسئلة شائعة. يُكوّن فريق Electi قاعدة معرفة الوكيل." },
      { step: "02", title: "WhatsApp API Connection", titleAr: "ربط WhatsApp API", desc: "The business's WhatsApp Business number is connected to the Electi platform via the official Meta Business API. Existing customers are not affected.", descAr: "يُوصَّل رقم WhatsApp Business الخاص بالشركة بمنصة Electi عبر Meta Business API الرسمي. لا يتأثر العملاء الحاليون." },
      { step: "03", title: "Testing & Refinement", titleAr: "الاختبار والتحسين", desc: "A testing period (typically 1–2 weeks) where the Electi team runs test conversations, identifies gaps in the knowledge base, and refines agent responses.", descAr: "فترة اختبار (عادةً 1–2 أسبوع) يُجري فيها فريق Electi محادثات اختبارية ويُحدّد الفجوات في قاعدة المعرفة ويُحسّن استجابات الوكيل." },
      { step: "04", title: "Go Live", titleAr: "الإطلاق", desc: "The agent goes live on the business's WhatsApp number. Human staff receive training on the handoff workflow. Electi monitors agent performance for the first 30 days.", descAr: "يُطلَق الوكيل على رقم واتساب الخاص بالشركة. يتلقى الموظفون البشريون تدريباً على سير عمل التسليم. تُراقب Electi أداء الوكيل خلال أول 30 يوماً." },
    ],
    outcomes: [
      { title: "Consistent Response Coverage", titleAr: "تغطية استجابة متسقة", desc: "Customer messages are answered at any hour — evenings, weekends, public holidays — without additional staffing costs. Businesses typically see a significant reduction in unanswered messages.", descAr: "تُجاب رسائل العملاء في أي وقت — مساءً وعطلات أسبوعية وأعياد — دون تكاليف توظيف إضافية. تشهد الشركات عادةً انخفاضاً ملحوظاً في الرسائل غير المُجاب عليها." },
      { title: "Staff Time Freed for Complex Work", titleAr: "تحرير وقت الموظفين للعمل المعقد", desc: "With repetitive inquiries handled automatically, customer service staff focus on cases that genuinely require human judgment — escalations, complaints, and relationship-sensitive interactions.", descAr: "مع معالجة الاستفسارات المتكررة تلقائياً، يُركّز موظفو خدمة العملاء على الحالات التي تتطلب حقاً حكماً بشرياً." },
      { title: "Consistent Brand Voice", titleAr: "صوت علامة تجارية متسق", desc: "Every customer receives the same quality of response — in their preferred language — regardless of which staff member might otherwise have handled the query.", descAr: "يتلقى كل عميل نفس جودة الاستجابة — بلغته المفضلة — بصرف النظر عن الموظف الذي كان سيتعامل مع الاستفسار." },
    ],
    agents: ["AI Personal Agent", "AI Billing Agent"],
    agentsAr: ["الوكيل الشخصي الذكي", "وكيل الفوترة الذكي"],
    faqs: [
      { q: "How long does it take to deploy an AI Customer Support Agent?", qAr: "كم يستغرق نشر وكيل دعم العملاء بالذكاء الاصطناعي؟", a: "A standard AI Customer Support Agent deployment takes 2–4 weeks from initial onboarding to go-live. This includes knowledge base setup, WhatsApp API connection, testing, and team training. Complex integrations (CRM, ERP) may extend the timeline.", aAr: "يستغرق نشر وكيل دعم العملاء القياسي بالذكاء الاصطناعي 2–4 أسابيع من الإعداد الأولي حتى الإطلاق. يشمل هذا إعداد قاعدة المعرفة وربط WhatsApp API والاختبار وتدريب الفريق." },
      { q: "Can the agent handle Arabic dialects?", qAr: "هل يمكن للوكيل التعامل مع اللهجات العربية؟", a: "Yes. Electi's agents support Modern Standard Arabic (Fus-ha) and common Gulf Arabic dialects including Saudi, Emirati, and Kuwaiti. The agent can respond in formal or conversational Arabic depending on how the customer writes.", aAr: "نعم. تدعم وكلاء Electi العربية الفصحى واللهجات الخليجية الشائعة بما فيها السعودية والإماراتية والكويتية. يمكن للوكيل الرد بالعربية الرسمية أو العامية حسب طريقة كتابة العميل." },
      { q: "What happens if the AI cannot answer a question?", qAr: "ماذا يحدث إذا لم يستطع الذكاء الاصطناعي الإجابة على سؤال؟", a: "The agent has a configurable escalation protocol. When it cannot confidently answer, it informs the customer that a human team member will follow up, then sends a notification (via Teams, Slack, or email) to your staff with the full conversation context.", aAr: "للوكيل بروتوكول تصعيد قابل للتكوين. عندما لا يستطيع الإجابة بثقة، يُعلم العميل بأن أحد أعضاء الفريق البشري سيتابع، ثم يُرسل إشعاراً لموظفيك مع كامل سياق المحادثة." },
    ],
  },
  {
    slug: "ai-sales-agent",
    category: "AI Sales Agent",
    categoryAr: "وكيل المبيعات بالذكاء الاصطناعي",
    title: "AI Sales Agent for Lead Qualification",
    titleAr: "وكيل مبيعات ذكي لتأهيل العملاء المحتملين",
    tagline: "Qualifying inbound WhatsApp leads 24/7 and routing warm prospects to your sales team",
    taglineAr: "تأهيل العملاء المحتملين الواردين عبر واتساب على مدار الساعة وتوجيه المحتملين الدافئين إلى فريق مبيعاتك",
    industryType: "B2B Services",
    industryTypeAr: "خدمات الشركات للشركات",
    businessType: "Example: A B2B services company in Saudi Arabia",
    businessTypeAr: "مثال: شركة خدمات B2B في المملكة العربية السعودية",
    challenge: "Sales teams in Saudi Arabia receive a high volume of WhatsApp inquiries from prospects who found the business via social media or word of mouth. Many inquiries are early-stage or unqualified. Sales staff spend significant time on conversations that don't progress — at the cost of following up with serious prospects.",
    challengeAr: "تتلقى فرق المبيعات في المملكة العربية السعودية حجماً كبيراً من استفسارات واتساب من العملاء المحتملين. يقضي موظفو المبيعات وقتاً كبيراً في محادثات لا تتقدم — على حساب المتابعة مع العملاء الجادين.",
    challengePoints: [
      { en: "No structured qualification process — staff handle each inquiry ad hoc", ar: "لا توجد عملية تأهيل منظَّمة — يتعامل الموظفون مع كل استفسار بشكل مخصص" },
      { en: "Sales staff spending time on prospects who are not yet ready to buy", ar: "موظفو المبيعات يقضون وقتاً مع عملاء محتملين غير مستعدين بعد للشراء" },
      { en: "Leads arriving outside business hours with no immediate response", ar: "وصول عملاء محتملين خارج ساعات العمل دون استجابة فورية" },
      { en: "No CRM record of conversations unless manually logged", ar: "لا يوجد سجل CRM للمحادثات ما لم يتم تسجيلها يدوياً" },
    ],
    solution: "An Electi AI Sales Agent that engages every inbound WhatsApp inquiry with a structured qualification conversation — capturing requirements, timeline, budget range, and decision-maker status — then routes qualified leads to the sales team with a full summary.",
    solutionAr: "وكيل مبيعات Electi الذكي الذي يتعامل مع كل استفسار واتساب وارد بمحادثة تأهيل منظَّمة — التقاط المتطلبات والجدول الزمني ونطاق الميزانية وحالة صانع القرار — ثم يُحيل العملاء المؤهلين إلى فريق المبيعات مع ملخص كامل.",
    solutionPoints: [
      { en: "Structured qualification flow: need, timeline, budget, authority", ar: "تدفق تأهيل منظَّم: الاحتياج والجدول الزمني والميزانية والسلطة" },
      { en: "Qualification summary sent to CRM and sales team the moment a lead qualifies", ar: "ملخص التأهيل يُرسَل إلى CRM وفريق المبيعات في اللحظة التي يتأهل فيها العميل" },
      { en: "Nurturing flow for unqualified leads with follow-up scheduling", ar: "تدفق رعاية للعملاء غير المؤهلين مع جدولة المتابعة" },
      { en: "All conversations logged automatically in Salesforce, HubSpot, or Zoho", ar: "جميع المحادثات مسجَّلة تلقائياً في Salesforce أو HubSpot أو Zoho" },
    ],
    technologies: [
      { name: "WhatsApp Business API", nameAr: "WhatsApp Business API", desc: "Primary customer communication channel", descAr: "قناة التواصل الأساسية مع العملاء" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Conversational AI for natural qualification conversations", descAr: "الذكاء الاصطناعي للحوار لمحادثات تأهيل طبيعية" },
      { name: "CRM Integration", nameAr: "تكامل CRM", desc: "Salesforce / HubSpot / Zoho for lead and deal management", descAr: "Salesforce / HubSpot / Zoho لإدارة العملاء المحتملين والصفقات" },
      { name: "Slack / Teams Notifications", nameAr: "إشعارات Slack / Teams", desc: "Real-time alert to sales rep when a lead qualifies", descAr: "تنبيه فوري لمندوب المبيعات عند تأهيل عميل محتمل" },
    ],
    implementation: [
      { step: "01", title: "Qualification Framework Design", titleAr: "تصميم إطار التأهيل", desc: "Electi works with your sales team to define what a 'qualified lead' looks like for your business — budget thresholds, timeline requirements, and decision-maker criteria.", descAr: "تعمل Electi مع فريق مبيعاتك لتحديد ما يُعدّ 'عميلاً محتملاً مؤهلاً' لشركتك — عتبات الميزانية ومتطلبات الجدول الزمني ومعايير صانع القرار." },
      { step: "02", title: "Agent Training", titleAr: "تدريب الوكيل", desc: "The AI Sales Agent is trained on your products/services, pricing structure, and common objections. Test qualification conversations are run before go-live.", descAr: "يُدرَّب وكيل المبيعات الذكي على منتجاتك/خدماتك وهيكل التسعير والاعتراضات الشائعة. يتم تشغيل محادثات تأهيل اختبارية قبل الإطلاق." },
      { step: "03", title: "CRM & Notification Wiring", titleAr: "ربط CRM والإشعارات", desc: "The agent is connected to your CRM and notification channel (Teams/Slack). Lead routing rules are configured based on lead score, territory, or product line.", descAr: "يُوصَّل الوكيل بنظام CRM الخاص بك وقناة الإشعارات. يتم تكوين قواعد توجيه العملاء المحتملين بناءً على نقاط العميل أو المنطقة أو خط المنتج." },
      { step: "04", title: "Go Live & Optimisation", titleAr: "الإطلاق والتحسين", desc: "The agent goes live. Electi monitors qualification conversation quality and refines the flow based on sales team feedback during the first 30 days.", descAr: "يُطلَق الوكيل. تراقب Electi جودة محادثات التأهيل وتُحسّن التدفق بناءً على ملاحظات فريق المبيعات خلال أول 30 يوماً." },
    ],
    outcomes: [
      { title: "Every Lead Gets an Immediate Response", titleAr: "كل عميل محتمل يحصل على استجابة فورية", desc: "Inbound WhatsApp inquiries receive an immediate, professional response at any hour — eliminating the 'slow lead response' problem that costs deals in competitive markets.", descAr: "تتلقى استفسارات واتساب الواردة استجابةً فوريةً ومهنيةً في أي وقت — مما يُلغي مشكلة 'الاستجابة البطيئة للعملاء المحتملين' التي تُكلّف الصفقات في الأسواق التنافسية." },
      { title: "Sales Team Focuses on Qualified Opportunities", titleAr: "يُركّز فريق المبيعات على الفرص المؤهلة", desc: "By filtering out early-stage and unqualified contacts, your sales team spends more time on conversations most likely to close — improving both morale and pipeline quality.", descAr: "من خلال تصفية الاتصالات المبكرة وغير المؤهلة، يقضي فريق مبيعاتك المزيد من الوقت في محادثات أكثر احتمالاً للإغلاق." },
      { title: "Structured CRM Pipeline", titleAr: "خط أنابيب CRM منظَّم", desc: "All leads are captured with structured data in your CRM — no more manual entry, no missing contacts. Your pipeline reflects actual activity.", descAr: "يتم التقاط جميع العملاء المحتملين ببيانات منظَّمة في نظام CRM الخاص بك — لا إدخال يدوي، لا اتصالات مفقودة. يعكس خط أنابيبك النشاط الفعلي." },
    ],
    agents: ["AI Sales & Reservations Agent"],
    agentsAr: ["وكيل المبيعات والحجوزات الذكي"],
    faqs: [
      { q: "Can the AI Sales Agent close deals?", qAr: "هل يمكن لوكيل المبيعات الذكي إغلاق الصفقات؟", a: "Electi's AI Sales Agent specialises in qualification and nurturing — not closing. Its goal is to identify high-potential leads and hand them to your human sales team at the right moment with full context. Closing remains a human activity, especially in B2B relationship-driven markets like Saudi Arabia.", aAr: "يتخصص وكيل مبيعات Electi الذكي في التأهيل والرعاية — وليس الإغلاق. هدفه تحديد العملاء المحتملين ذوي الإمكانات العالية وتسليمهم لفريق مبيعاتك البشري في اللحظة المناسبة مع كامل السياق." },
      { q: "How does the agent handle price questions?", qAr: "كيف يتعامل الوكيل مع أسئلة الأسعار؟", a: "The agent can provide pricing ranges or indicate that a detailed quote requires a conversation with the sales team — depending on how your business prefers to handle pricing enquiries. The agent can collect enough information to give the sales team context for pricing discussions.", aAr: "يمكن للوكيل تقديم نطاقات أسعار أو الإشارة إلى أن عرض الأسعار التفصيلي يتطلب محادثة مع فريق المبيعات — اعتماداً على طريقة تعامل شركتك مع استفسارات التسعير." },
    ],
  },
  {
    slug: "ai-receptionist",
    category: "AI Receptionist",
    categoryAr: "موظف الاستقبال الذكي",
    title: "AI Receptionist for Appointment Management",
    titleAr: "موظف استقبال ذكي لإدارة المواعيد",
    tagline: "Booking, rescheduling, and reminding — without a human receptionist on call",
    taglineAr: "الحجز وإعادة الجدولة والتذكير — دون موظف استقبال بشري في انتظار المكالمات",
    industryType: "Healthcare & Professional Services",
    industryTypeAr: "الرعاية الصحية والخدمات المهنية",
    businessType: "Example: A clinic or professional services firm in Saudi Arabia",
    businessTypeAr: "مثال: عيادة أو شركة خدمات مهنية في المملكة العربية السعودية",
    challenge: "Clinics, law firms, consultancies, and similar professional service businesses in Saudi Arabia rely on phone calls and WhatsApp to book appointments. Receptionist capacity is often a bottleneck — especially for international patients or clients who message outside business hours.",
    challengeAr: "تعتمد العيادات وشركات المحاماة والاستشارات وشركات الخدمات المهنية المماثلة في المملكة العربية السعودية على المكالمات الهاتفية وواتساب لحجز المواعيد. غالباً ما تُشكّل طاقة موظف الاستقبال عنق الزجاجة.",
    challengePoints: [
      { en: "Receptionist cannot handle appointment requests outside working hours", ar: "لا يستطيع موظف الاستقبال معالجة طلبات المواعيد خارج ساعات العمل" },
      { en: "Patients/clients often prefer WhatsApp over phone calls", ar: "يُفضّل المرضى/العملاء في الغالب واتساب على المكالمات الهاتفية" },
      { en: "Double bookings and scheduling errors when managed manually", ar: "حجوزات مزدوجة وأخطاء في الجدولة عند الإدارة يدوياً" },
      { en: "No automated reminders, leading to high no-show rates", ar: "لا تذكيرات آلية، مما يؤدي إلى معدلات غياب مرتفعة" },
    ],
    solution: "An Electi AI Receptionist connected to your booking system via WhatsApp — checking real-time availability, booking appointments, sending confirmations, and delivering automated reminders 24 and 2 hours before each appointment.",
    solutionAr: "موظف استقبال Electi الذكي متصل بنظام حجزك عبر واتساب — فحص التوفر في الوقت الفعلي وحجز المواعيد وإرسال التأكيدات وتقديم التذكيرات الآلية.",
    solutionPoints: [
      { en: "Real-time calendar availability checking before confirming any slot", ar: "فحص توفر التقويم في الوقت الفعلي قبل تأكيد أي موعد" },
      { en: "Appointment confirmation sent immediately via WhatsApp", ar: "تأكيد الموعد يُرسَل فوراً عبر واتساب" },
      { en: "Automated reminder at 24 hours and 2 hours before appointment", ar: "تذكير تلقائي قبل 24 ساعة و2 ساعة من الموعد" },
      { en: "Simple rescheduling and cancellation via WhatsApp conversation", ar: "إعادة جدولة وإلغاء بسيطان عبر محادثة واتساب" },
    ],
    technologies: [
      { name: "WhatsApp Business API", nameAr: "WhatsApp Business API", desc: "Appointment booking conversation channel", descAr: "قناة محادثة حجز المواعيد" },
      { name: "Google Calendar / Outlook", nameAr: "Google Calendar / Outlook", desc: "Calendar integration for real-time availability", descAr: "تكامل التقويم للتوفر في الوقت الفعلي" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Natural conversation handling in Arabic and English", descAr: "معالجة المحادثة الطبيعية بالعربية والإنجليزية" },
      { name: "Electi Scheduling Engine", nameAr: "محرك جدولة Electi", desc: "Availability management and booking logic", descAr: "إدارة التوفر ومنطق الحجز" },
    ],
    implementation: [
      { step: "01", title: "Calendar & Booking System Integration", titleAr: "تكامل التقويم ونظام الحجز", desc: "Electi connects to your existing calendar (Google Calendar, Outlook, or a booking platform). Availability rules, service types, and booking restrictions are configured.", descAr: "تتصل Electi بتقويمك الحالي. يتم تكوين قواعد التوفر وأنواع الخدمات وقيود الحجز." },
      { step: "02", title: "Conversation Flow Design", titleAr: "تصميم تدفق المحادثة", desc: "The booking conversation is designed to match your business — service type selection, practitioner/staff preference, duration, and patient/client information capture.", descAr: "يُصمَّم تدفق محادثة الحجز ليتناسب مع شركتك — اختيار نوع الخدمة وتفضيل الموظف ومدته والتقاط معلومات العميل." },
      { step: "03", title: "Reminder Sequence Setup", titleAr: "إعداد تسلسل التذكير", desc: "Automated reminder messages are configured — timing, message content, and what happens if a client cancels via the reminder (optional rebooking flow).", descAr: "يتم تكوين رسائل التذكير الآلية — التوقيت ومحتوى الرسالة وما يحدث إذا ألغى العميل عبر التذكير." },
      { step: "04", title: "Staff Training & Go Live", titleAr: "تدريب الموظفين والإطلاق", desc: "Staff learn the override procedures (how to manually block calendar slots, how to view the AI's booked appointments, and how to use the handoff when needed).", descAr: "يتعلم الموظفون إجراءات التجاوز (كيفية حظر فترات التقويم يدوياً وكيفية عرض مواعيد الذكاء الاصطناعي المحجوزة وكيفية استخدام التسليم عند الحاجة)." },
    ],
    outcomes: [
      { title: "Appointments Booked Round-the-Clock", titleAr: "مواعيد محجوزة على مدار الساعة", desc: "Patients and clients can book at 10pm on a Thursday or during Eid — without requiring any staff availability. This is especially valuable for businesses serving international clients in different time zones.", descAr: "يمكن للمرضى والعملاء الحجز في الساعة 10 مساءً يوم الخميس أو خلال العيد — دون الحاجة إلى توفر أي موظفين. هذا ذو قيمة خاصة للشركات التي تخدم العملاء الدوليين في مناطق زمنية مختلفة." },
      { title: "Reduced No-Shows", titleAr: "انخفاض معدلات الغياب", desc: "Automated 24-hour and 2-hour reminders with an easy rescheduling option typically lead to a meaningful reduction in no-show rates — one of the most costly issues for appointment-based businesses.", descAr: "تذكيرات 24 ساعة و2 ساعة الآلية مع خيار إعادة جدولة سهل تؤدي عادةً إلى انخفاض ملحوظ في معدلات الغياب." },
      { title: "Receptionist Time for Higher-Value Tasks", titleAr: "وقت موظف الاستقبال للمهام ذات القيمة الأعلى", desc: "With routine booking handled by the AI, reception staff focus on the in-person patient/client experience, complex queries, and tasks that require human presence.", descAr: "مع معالجة الحجز الروتيني بواسطة الذكاء الاصطناعي، يُركّز موظفو الاستقبال على تجربة العميل الشخصية والاستفسارات المعقدة والمهام التي تتطلب حضوراً بشرياً." },
    ],
    agents: ["AI Personal Agent"],
    agentsAr: ["الوكيل الشخصي الذكي"],
    faqs: [
      { q: "Can the AI Receptionist handle appointment changes?", qAr: "هل يمكن لموظف الاستقبال الذكي التعامل مع تغييرات المواعيد؟", a: "Yes. Customers can message the WhatsApp number to reschedule or cancel. The agent checks availability and confirms the new slot, or processes the cancellation — all without staff involvement. A notification is sent to your team when a cancellation creates an open slot.", aAr: "نعم. يمكن للعملاء مراسلة رقم واتساب لإعادة الجدولة أو الإلغاء. يفحص الوكيل التوفر ويؤكد الموعد الجديد أو يعالج الإلغاء — كل ذلك دون تدخل الموظفين." },
      { q: "Does it work with our existing booking software?", qAr: "هل يعمل مع برنامج الحجز الحالي لدينا؟", a: "Electi integrates with Google Calendar, Outlook Calendar, and major booking platforms. For specialist clinic software, integration feasibility is assessed during the technical onboarding. Electi also has its own scheduling engine for businesses without an existing booking system.", aAr: "تتكامل Electi مع Google Calendar وOutlook Calendar ومنصات الحجز الرئيسية. لبرامج العيادات المتخصصة، يتم تقييم جدوى التكامل خلال الإعداد التقني." },
    ],
  },
  {
    slug: "ai-hr-agent",
    category: "AI HR Agent",
    categoryAr: "وكيل الموارد البشرية الذكي",
    title: "AI HR Agent for Employee Self-Service",
    titleAr: "وكيل الموارد البشرية الذكي لخدمة الموظفين الذاتية",
    tagline: "HR inquiries, leave requests, and policy questions — handled automatically via WhatsApp",
    taglineAr: "استفسارات الموارد البشرية وطلبات الإجازات وأسئلة السياسات — تُعالَج تلقائياً عبر واتساب",
    industryType: "Enterprise & Corporate",
    industryTypeAr: "المؤسسات والشركات",
    businessType: "Example: A company with 100+ employees in Saudi Arabia",
    businessTypeAr: "مثال: شركة تضم 100+ موظف في المملكة العربية السعودية",
    challenge: "HR teams in growing Saudi companies spend a significant portion of their time answering repetitive employee questions — leave balances, policy clarifications, payroll queries, and onboarding information. This reduces HR capacity for strategic work.",
    challengeAr: "تقضي فرق الموارد البشرية في الشركات السعودية النامية جزءاً كبيراً من وقتها في الإجابة على أسئلة الموظفين المتكررة — أرصدة الإجازات وتوضيحات السياسات واستفسارات الرواتب ومعلومات التأهيل.",
    challengePoints: [
      { en: "HR team overwhelmed with routine employee queries via WhatsApp and email", ar: "فريق الموارد البشرية مُثقَل باستفسارات الموظفين الروتينية عبر واتساب والبريد الإلكتروني" },
      { en: "Inconsistent answers when different HR staff respond to the same policy question", ar: "إجابات غير متسقة عندما يرد موظفو الموارد البشرية المختلفون على نفس سؤال السياسة" },
      { en: "No self-service capability — employees must wait for HR to be available", ar: "لا توجد قدرة خدمة ذاتية — يجب على الموظفين الانتظار حتى يتوفر فريق الموارد البشرية" },
      { en: "Leave requests tracked manually in spreadsheets", ar: "طلبات الإجازة تُتتبَّع يدوياً في جداول البيانات" },
    ],
    solution: "An Electi AI HR Agent deployed on a dedicated internal WhatsApp number — answering policy questions from the company handbook, checking leave balances from the HR system, and routing leave requests through the approval workflow.",
    solutionAr: "وكيل Electi للموارد البشرية منشور على رقم واتساب داخلي مخصص — يُجيب على أسئلة السياسات من دليل الشركة ويتحقق من أرصدة الإجازات من نظام الموارد البشرية ويُوجّه طلبات الإجازة عبر سير عمل الموافقة.",
    solutionPoints: [
      { en: "HR policy Q&A trained on the company handbook (Arabic and English)", ar: "أسئلة وأجوبة سياسة الموارد البشرية مُدرَّبة على دليل الشركة (عربي وإنجليزي)" },
      { en: "Leave balance lookup integrated with HR system (Odoo, SAP, Oracle HR)", ar: "البحث عن رصيد الإجازة مدمج مع نظام الموارد البشرية (Odoo وSAP وOracle HR)" },
      { en: "Leave request initiation with manager notification and approval routing", ar: "بدء طلب الإجازة مع إشعار المدير وتوجيه الموافقة" },
      { en: "Onboarding information delivery for new joiners via WhatsApp", ar: "تسليم معلومات التأهيل للموظفين الجدد عبر واتساب" },
    ],
    technologies: [
      { name: "WhatsApp Business API", nameAr: "WhatsApp Business API", desc: "Internal employee communication channel", descAr: "قناة التواصل الداخلية مع الموظفين" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Policy interpretation and natural conversation", descAr: "تفسير السياسات والمحادثة الطبيعية" },
      { name: "HR System Integration", nameAr: "تكامل نظام الموارد البشرية", desc: "Odoo, SAP HR, Oracle HCM, or custom HRMS", descAr: "Odoo وSAP HR وOracle HCM أو HRMS مخصص" },
      { name: "Approval Workflow Engine", nameAr: "محرك سير عمل الموافقة", desc: "Leave and expense request routing to managers", descAr: "توجيه طلبات الإجازة والمصروفات إلى المديرين" },
    ],
    implementation: [
      { step: "01", title: "HR Knowledge Base Build", titleAr: "بناء قاعدة معرفة الموارد البشرية", desc: "The company provides its HR policy handbook, onboarding documents, and FAQ list. Electi builds the agent's knowledge base — ensuring accurate, policy-compliant answers.", descAr: "تُقدّم الشركة دليل سياسة الموارد البشرية ووثائق التأهيل وقائمة الأسئلة الشائعة. تبني Electi قاعدة معرفة الوكيل." },
      { step: "02", title: "HR System Integration", titleAr: "تكامل نظام الموارد البشرية", desc: "The agent is connected to the HR system for leave balance data and leave request submission. Integration scope is defined by available API access.", descAr: "يُوصَّل الوكيل بنظام الموارد البشرية لبيانات رصيد الإجازة وتقديم طلبات الإجازة." },
      { step: "03", title: "Approval Workflow Configuration", titleAr: "تكوين سير عمل الموافقة", desc: "Leave approval routing is configured — manager notification via Teams/Slack, approval action, and employee confirmation via WhatsApp.", descAr: "يتم تكوين توجيه موافقة الإجازة — إشعار المدير عبر Teams/Slack وإجراء الموافقة وتأكيد الموظف عبر واتساب." },
      { step: "04", title: "Pilot with HR Team", titleAr: "تجريب مع فريق الموارد البشرية", desc: "HR team tests the agent with real employee questions. The knowledge base is refined before company-wide rollout.", descAr: "يختبر فريق الموارد البشرية الوكيل بأسئلة الموظفين الحقيقية. يُحسَّن قاعدة المعرفة قبل الطرح على مستوى الشركة." },
    ],
    outcomes: [
      { title: "HR Team Capacity Freed", titleAr: "تحرير طاقة فريق الموارد البشرية", desc: "Routine inquiries handled by the AI agent free HR staff to focus on recruitment, performance management, employee relations, and strategic initiatives — the work that requires human expertise.", descAr: "الاستفسارات الروتينية التي يعالجها وكيل الذكاء الاصطناعي تُحرّر موظفي الموارد البشرية للتركيز على التوظيف وإدارة الأداء والعلاقات مع الموظفين والمبادرات الاستراتيجية." },
      { title: "Consistent Policy Answers", titleAr: "إجابات سياسة متسقة", desc: "Every employee receives the same accurate, policy-compliant answer to the same question — eliminating the inconsistency that occurs when different HR staff members respond differently.", descAr: "يتلقى كل موظف نفس الإجابة الدقيقة المتوافقة مع السياسة على نفس السؤال — مما يُلغي عدم الاتساق الذي يحدث عندما يرد موظفو الموارد البشرية المختلفون بشكل مختلف." },
      { title: "Employee Self-Service 24/7", titleAr: "خدمة ذاتية للموظفين على مدار الساعة", desc: "Employees can check leave balances, submit leave requests, or find HR policies at any time — not just during HR team working hours.", descAr: "يمكن للموظفين التحقق من أرصدة الإجازات وتقديم طلبات الإجازة أو إيجاد سياسات الموارد البشرية في أي وقت." },
    ],
    agents: ["AI HR Agent"],
    agentsAr: ["وكيل الموارد البشرية الذكي"],
    faqs: [
      { q: "Is an AI HR Agent appropriate for sensitive HR matters?", qAr: "هل وكيل الموارد البشرية الذكي مناسب للمسائل الحساسة للموارد البشرية؟", a: "No. Electi's AI HR Agent handles routine, policy-based queries and administrative processes. Sensitive matters — grievances, performance concerns, disciplinary actions, medical situations — are always routed to a human HR team member. The agent is configured with clear escalation rules for sensitive topics.", aAr: "لا. يتعامل وكيل Electi للموارد البشرية الذكي مع الاستفسارات الروتينية القائمة على السياسة والعمليات الإدارية. تُحال المسائل الحساسة دائماً إلى أحد أعضاء فريق الموارد البشرية البشري." },
    ],
  },
  {
    slug: "ai-workflow-automation",
    category: "AI Workflow Automation",
    categoryAr: "أتمتة سير العمل بالذكاء الاصطناعي",
    title: "AI-Powered Business Workflow Automation",
    titleAr: "أتمتة سير العمل التجاري بالذكاء الاصطناعي",
    tagline: "Connecting WhatsApp conversations to your ERP, CRM, and operational systems",
    taglineAr: "ربط محادثات واتساب بنظام ERP وCRM والأنظمة التشغيلية",
    industryType: "Manufacturing & Distribution",
    industryTypeAr: "التصنيع والتوزيع",
    businessType: "Example: A distributor or manufacturer in Saudi Arabia",
    businessTypeAr: "مثال: موزع أو مُصنِّع في المملكة العربية السعودية",
    challenge: "Distributors and manufacturers receive orders, stock inquiries, and delivery queries from customers and field teams via WhatsApp. These messages require manual data entry into ERP systems — creating bottlenecks, errors, and delays in fulfillment.",
    challengeAr: "يتلقى الموزعون والمصنّعون طلبات واستفسارات المخزون وتساؤلات التسليم من العملاء وفرق الميدان عبر واتساب. تتطلب هذه الرسائل إدخال بيانات يدوي في أنظمة ERP — مما يخلق اختناقات وأخطاء وتأخيرات في التنفيذ.",
    challengePoints: [
      { en: "Field teams submitting orders via WhatsApp that must be re-entered into ERP", ar: "فرق الميدان تُقدّم الطلبات عبر واتساب يجب إعادة إدخالها في ERP" },
      { en: "Customers calling to check delivery status — avoidable with automated lookup", ar: "العملاء يتصلون للتحقق من حالة التسليم — يمكن تجنبه بالبحث الآلي" },
      { en: "Supplier payment status queries consuming accounts team time", ar: "استفسارات حالة دفع الموردين تستهلك وقت فريق الحسابات" },
      { en: "No audit trail for orders placed via WhatsApp", ar: "لا يوجد مسار تدقيق للطلبات المقدَّمة عبر واتساب" },
    ],
    solution: "An Electi AI Workflow Agent connected to the company's ERP (Odoo, SAP, or Oracle) — allowing field teams and customers to check stock, submit orders, and query delivery status via WhatsApp, with all actions logged in the ERP automatically.",
    solutionAr: "وكيل سير عمل Electi الذكي متصل بنظام ERP الخاص بالشركة (Odoo أو SAP أو Oracle) — مما يُتيح لفرق الميدان والعملاء التحقق من المخزون وتقديم الطلبات والاستعلام عن حالة التسليم عبر واتساب، مع تسجيل جميع الإجراءات تلقائياً في ERP.",
    solutionPoints: [
      { en: "Real-time stock availability queries from WhatsApp → ERP inventory module", ar: "استفسارات توفر المخزون في الوقت الفعلي من واتساب ← وحدة مخزون ERP" },
      { en: "Order submission via WhatsApp conversation → ERP sales order creation", ar: "تقديم الطلب عبر محادثة واتساب ← إنشاء أمر مبيعات ERP" },
      { en: "Delivery status lookup directly from ERP logistics module", ar: "البحث عن حالة التسليم مباشرةً من وحدة لوجستيات ERP" },
      { en: "Invoice and payment status queries answered from ERP accounts module", ar: "استفسارات الفاتورة وحالة الدفع مُجاب عليها من وحدة حسابات ERP" },
    ],
    technologies: [
      { name: "WhatsApp Business API", nameAr: "WhatsApp Business API", desc: "Field team and customer communication channel", descAr: "قناة تواصل فريق الميدان والعملاء" },
      { name: "ERP Integration (Odoo / SAP / Oracle)", nameAr: "تكامل ERP (Odoo / SAP / Oracle)", desc: "Bi-directional data read/write for orders, stock, and finance", descAr: "قراءة/كتابة بيانات ثنائية الاتجاه للطلبات والمخزون والمالية" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Natural language understanding for order and query processing", descAr: "فهم اللغة الطبيعية لمعالجة الطلبات والاستفسارات" },
      { name: "Electi Workflow Engine", nameAr: "محرك سير عمل Electi", desc: "Multi-step action orchestration and ERP write-back", descAr: "تنسيق إجراءات متعددة الخطوات والكتابة العكسية في ERP" },
    ],
    implementation: [
      { step: "01", title: "ERP Integration Scoping", titleAr: "تحديد نطاق تكامل ERP", desc: "Electi's technical team reviews your ERP version, available API access, and defines which modules will be integrated (inventory, sales, finance, logistics).", descAr: "يراجع الفريق التقني في Electi إصدار ERP الخاص بك والوصول المتاح لـ API ويحدد الوحدات التي ستُدمَج (المخزون والمبيعات والمالية واللوجستيات)." },
      { step: "02", title: "Workflow Design", titleAr: "تصميم سير العمل", desc: "Each workflow (stock query, order submission, delivery lookup) is designed with the business team — defining what information the agent needs to collect, validation rules, and error handling.", descAr: "يُصمَّم كل سير عمل (استعلام المخزون وتقديم الطلب والبحث عن التسليم) مع فريق الأعمال." },
      { step: "03", title: "ERP Connection & Testing", titleAr: "ربط ERP والاختبار", desc: "The agent is connected to ERP API endpoints. Each workflow is tested against live ERP data (in a staging environment) before go-live.", descAr: "يُوصَّل الوكيل بنقاط نهاية ERP API. يُختبَر كل سير عمل مقابل بيانات ERP الحية (في بيئة مرحلية) قبل الإطلاق." },
      { step: "04", title: "Field Team Training & Rollout", titleAr: "تدريب فريق الميدان والطرح", desc: "Field teams receive a brief on how to interact with the agent — what commands are available, how to correct errors, and who to contact for issues.", descAr: "يتلقى أفراد فريق الميدان إحاطة حول كيفية التفاعل مع الوكيل — الأوامر المتاحة وكيفية تصحيح الأخطاء والجهة التي يتصلون بها في حالة المشكلات." },
    ],
    outcomes: [
      { title: "ERP Always Up to Date", titleAr: "ERP دائماً محدَّث", desc: "Orders submitted via WhatsApp are written directly into the ERP — no manual re-entry, no discrepancy between WhatsApp conversations and the ERP record.", descAr: "الطلبات المقدَّمة عبر واتساب تُكتَب مباشرةً في ERP — لا إعادة إدخال يدوي، لا تناقض بين محادثات واتساب وسجل ERP." },
      { title: "Field Team Efficiency", titleAr: "كفاءة فريق الميدان", desc: "Field sales and delivery teams can check stock, confirm order status, and submit requests from their WhatsApp — without logging into the ERP directly. This is especially valuable for staff with limited ERP training.", descAr: "يمكن لفرق مبيعات الميدان والتسليم التحقق من المخزون وتأكيد حالة الطلب وتقديم الطلبات من واتساب — دون تسجيل الدخول إلى ERP مباشرةً." },
      { title: "Customer Self-Service for Common Queries", titleAr: "خدمة ذاتية للعملاء للاستفسارات الشائعة", desc: "Delivery status and invoice queries — which previously required an accounts or logistics team member to look up and respond — are handled automatically via WhatsApp.", descAr: "استفسارات حالة التسليم والفاتورة — التي كانت سابقاً تتطلب من عضو في فريق الحسابات أو اللوجستيات البحث والرد — تُعالَج تلقائياً عبر واتساب." },
    ],
    agents: ["AI Billing Agent", "AI Sales & Reservations Agent"],
    agentsAr: ["وكيل الفوترة الذكي", "وكيل المبيعات والحجوزات الذكي"],
    faqs: [
      { q: "Can the agent submit ERP orders without human confirmation?", qAr: "هل يمكن للوكيل تقديم طلبات ERP دون تأكيد بشري؟", a: "This is configurable. For low-value or pre-approved order types, the agent can submit directly to ERP. For orders above a defined threshold or with unusual items, a confirmation step is added — requiring the user or a supervisor to confirm before the ERP order is created.", aAr: "هذا قابل للتكوين. للأنواع ذات القيمة المنخفضة أو الطلبات المعتمدة مسبقاً، يمكن للوكيل التقديم مباشرةً إلى ERP. للطلبات فوق حد محدد، تُضاف خطوة تأكيد." },
    ],
  },
  {
    slug: "ai-voice-agents",
    category: "AI Voice Agents",
    categoryAr: "وكلاء الصوت الذكيون",
    title: "AI Voice Agent for Phone Handling",
    titleAr: "وكيل صوتي ذكي لمعالجة المكالمات الهاتفية",
    tagline: "Handling inbound calls, capturing information, and routing to the right team",
    taglineAr: "معالجة المكالمات الواردة والتقاط المعلومات وتوجيهها إلى الفريق المناسب",
    industryType: "Any Business with Inbound Phone Volume",
    industryTypeAr: "أي شركة لديها حجم مكالمات هاتفية واردة",
    businessType: "Example: A business receiving 50+ inbound calls per day in Saudi Arabia",
    businessTypeAr: "مثال: شركة تتلقى 50+ مكالمة واردة يومياً في المملكة العربية السعودية",
    challenge: "Businesses with high inbound call volume in Saudi Arabia face a staffing challenge: phone lines are occupied, calls go unanswered during peak periods, and a significant portion of calls are for routine inquiries that don't require a human agent.",
    challengeAr: "تواجه الشركات ذات حجم المكالمات الواردة الكبير في المملكة العربية السعودية تحدياً في التوظيف: خطوط الهاتف مشغولة، وتظل المكالمات دون إجابة خلال فترات الذروة، وجزء كبير من المكالمات لاستفسارات روتينية لا تتطلب وكيلاً بشرياً.",
    challengePoints: [
      { en: "Long hold times during peak periods frustrating callers", ar: "أوقات انتظار طويلة خلال فترات الذروة تُحبط المتصلين" },
      { en: "After-hours calls going to voicemail with no immediate resolution", ar: "مكالمات ما بعد الساعات تذهب إلى البريد الصوتي دون حل فوري" },
      { en: "Routine inquiries (hours, directions, pricing) consuming agent time", ar: "الاستفسارات الروتينية (الساعات والاتجاهات والتسعير) تستهلك وقت الوكيل" },
      { en: "No call data capture — no record of what callers needed", ar: "لا التقاط لبيانات المكالمة — لا سجل لما احتاجه المتصلون" },
    ],
    solution: "An Electi AI Voice Agent that answers inbound calls in Arabic and English — handling FAQs, capturing caller information, and routing complex calls to the appropriate human team with a pre-captured summary.",
    solutionAr: "وكيل Electi الصوتي الذكي الذي يُجيب على المكالمات الواردة بالعربية والإنجليزية — معالجة الأسئلة الشائعة والتقاط معلومات المتصل وتوجيه المكالمات المعقدة إلى الفريق البشري المناسب مع ملخص ملتقط مسبقاً.",
    solutionPoints: [
      { en: "Answers in Arabic or English based on caller's language", ar: "الرد بالعربية أو الإنجليزية بناءً على لغة المتصل" },
      { en: "Handles FAQs: hours, location, pricing, availability", ar: "يتعامل مع الأسئلة الشائعة: الساعات والموقع والتسعير والتوفر" },
      { en: "Captures caller name, number, reason for call before routing", ar: "يلتقط اسم المتصل ورقمه وسبب المكالمة قبل التوجيه" },
      { en: "Routes complex calls to the right team (sales, support, billing)", ar: "يُوجّه المكالمات المعقدة إلى الفريق المناسب (المبيعات والدعم والفوترة)" },
    ],
    technologies: [
      { name: "Telephony Integration", nameAr: "تكامل الاتصالات الهاتفية", desc: "Compatible with SIP trunking and major Saudi telephony providers", descAr: "متوافق مع SIP trunking ومزودي الاتصالات السعوديين الرئيسيين" },
      { name: "Gemini / Whisper", nameAr: "Gemini / Whisper", desc: "Arabic + English speech-to-text and voice synthesis", descAr: "تحويل الكلام إلى نص وتوليف الصوت بالعربية والإنجليزية" },
      { name: "GPT-4o", nameAr: "GPT-4o", desc: "Conversation handling and FAQ response generation", descAr: "معالجة المحادثة وتوليد استجابات الأسئلة الشائعة" },
      { name: "CRM / Ticketing Integration", nameAr: "تكامل CRM / التذاكر", desc: "Automatic call logging and lead/ticket creation", descAr: "تسجيل المكالمات الآلي وإنشاء العملاء المحتملين/التذاكر" },
    ],
    implementation: [
      { step: "01", title: "Call Flow Design", titleAr: "تصميم تدفق المكالمة", desc: "Electi maps your inbound call journey — greeting language, FAQ categories, routing rules (which calls go to which team), and escalation conditions.", descAr: "ترسم Electi خريطة رحلة مكالمتك الواردة — لغة الترحيب وفئات الأسئلة الشائعة وقواعد التوجيه وشروط التصعيد." },
      { step: "02", title: "Telephony Integration", titleAr: "تكامل الاتصالات الهاتفية", desc: "The AI voice agent is connected to your phone number via SIP or a cloud telephony provider. Your existing number is retained.", descAr: "يُوصَّل وكيل الصوت الذكي برقم هاتفك عبر SIP أو مزود اتصالات سحابي. يُحتفَظ برقمك الحالي." },
      { step: "03", title: "Voice & Language Testing", titleAr: "اختبار الصوت واللغة", desc: "Call quality, Arabic speech recognition accuracy, and routing logic are tested thoroughly before go-live with real callers.", descAr: "يُختبَر جودة المكالمة ودقة التعرف على الكلام العربي ومنطق التوجيه بدقة قبل الإطلاق مع المتصلين الحقيقيين." },
      { step: "04", title: "Go Live & Monitoring", titleAr: "الإطلاق والمراقبة", desc: "The agent goes live. Call transcripts and routing outcomes are reviewed in the first weeks to refine accuracy and improve the FAQ knowledge base.", descAr: "يُطلَق الوكيل. تُراجَع نصوص المكالمات ونتائج التوجيه في الأسابيع الأولى لتحسين الدقة وتطوير قاعدة معرفة الأسئلة الشائعة." },
    ],
    outcomes: [
      { title: "No Missed Calls During Peak or After Hours", titleAr: "لا مكالمات فائتة خلال الذروة أو ما بعد الساعات", desc: "Every inbound call receives an immediate response — even during peak periods when all human agents are occupied, and during evenings and weekends when no staff are available.", descAr: "كل مكالمة واردة تتلقى استجابةً فوريةً — حتى خلال فترات الذروة عندما تكون جميع الوكلاء البشريين مشغولين، وفي المساء وعطلات نهاية الأسبوع." },
      { title: "Routine Inquiries Resolved Without Agent Involvement", titleAr: "الاستفسارات الروتينية تُحَل دون تدخل الوكيل", desc: "A significant proportion of inbound calls — for hours, directions, pricing, and basic information — are resolved by the AI without a human agent. This frees your team for complex, high-value calls.", descAr: "نسبة كبيرة من المكالمات الواردة — للساعات والاتجاهات والتسعير والمعلومات الأساسية — تُحَل بواسطة الذكاء الاصطناعي دون وكيل بشري." },
      { title: "Structured Call Data Captured", titleAr: "التقاط بيانات المكالمة المنظَّمة", desc: "Every call generates a structured record — caller details, reason for call, and resolution — feeding your CRM and giving your team full visibility into call volume and call categories.", descAr: "تُنشئ كل مكالمة سجلاً منظَّماً — بيانات المتصل وسبب المكالمة والحل — مما يُغذّي نظام CRM الخاص بك ويمنح فريقك رؤية كاملة لحجم المكالمات وفئاتها." },
    ],
    agents: ["AI Personal Agent", "AI Sales & Reservations Agent"],
    agentsAr: ["الوكيل الشخصي الذكي", "وكيل المبيعات والحجوزات الذكي"],
    faqs: [
      { q: "Does the AI Voice Agent support Saudi Arabic specifically?", qAr: "هل يدعم وكيل الصوت الذكي العربية السعودية تحديداً؟", a: "Yes. The voice agent uses speech recognition models trained on Gulf Arabic dialects including Saudi Arabic. Electi's prompt engineering includes dialect-specific optimisations. The agent handles both Fus-ha (Modern Standard Arabic) and Saudi colloquial Arabic.", aAr: "نعم. يستخدم وكيل الصوت نماذج التعرف على الكلام المُدرَّبة على اللهجات العربية الخليجية بما فيها العربية السعودية." },
      { q: "Can it handle calls in both Arabic and English within one call?", qAr: "هل يمكنه معالجة مكالمات بالعربية والإنجليزية في مكالمة واحدة؟", a: "The voice agent detects the caller's language in the first few seconds and responds in kind. Language switching mid-call is handled — if a caller switches from Arabic to English, the agent follows. This is common in Saudi business contexts.", aAr: "يكتشف وكيل الصوت لغة المتصل في الثواني الأولى ويرد بالمثل. يُعالَج تبديل اللغة في منتصف المكالمة — إذا تحوّل المتصل من العربية إلى الإنجليزية، يتبعه الوكيل." },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
