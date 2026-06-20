import { UserCircle, MessageCircle, Calendar, Mail, Bell, Mic, LayoutDashboard, Briefcase, Building, Users } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeServiceSchema({
    name: "Personal AI Agents",
    nameAr: "وكلاء الذكاء الاصطناعي الشخصيون",
    description: "Electi's Personal AI Agent is your always-on AI executive assistant — managing communications, calendar, and daily workflows via WhatsApp for business leaders in Saudi Arabia.",
    descriptionAr: "وكيل الذكاء الاصطناعي الشخصي من إليكتي هو مساعدك التنفيذي الذكي المتاح دائماً — يدير اتصالاتك وتقويمك ومهامك اليومية عبر واتساب.",
    url: "/personal-ai-agents",
    keywords: ["personal AI agent", "AI executive assistant", "AI assistant Saudi Arabia", "المساعد الذكي الشخصي", "مساعد ذكاء اصطناعي شخصي", "WhatsApp AI assistant"],
  }),
  makeFaqSchema([
    { q: "What is a Personal AI Agent?", a: "A Personal AI Agent is your AI-powered executive assistant that operates via WhatsApp 24/7. It manages your emails, calendar, reminders, and daily tasks through natural language conversation — no manual input required." },
    { q: "How does the Personal AI Agent manage my calendar?", a: "The agent connects to Google Calendar or Outlook, reads your existing schedule, and autonomously books meetings, resolves conflicts, sends invites, and sets reminders — all via WhatsApp commands." },
    { q: "Can the Personal AI Agent handle Arabic communication?", a: "Yes. The Personal AI Agent is fully bilingual — communicating in Arabic and English, including Saudi dialect. You can command it in Arabic and it responds, schedules, and manages tasks accordingly." },
    { q: "What tasks can I delegate to my Personal AI Agent?", a: "You can delegate: email management, calendar scheduling, meeting reminders, follow-up messages, task tracking, voice note transcription, and daily briefings — all via WhatsApp." },
    { q: "Is my data secure with the Personal AI Agent?", a: "Yes. All data is encrypted with AES-256, stored in Saudi-compliant infrastructure, and never shared or sold. You can revoke all permissions at any time." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents", url: "/ai-agents" }, { name: "Personal AI Agents", url: "/personal-ai-agents" }]),
];

export default function PersonalAIAgentsPage() {
  return (
    <AuthorityPage
      seoTitle="Personal AI Agents | Electi — Your AI Executive Assistant in Saudi Arabia"
      seoTitleAr="وكلاء الذكاء الاصطناعي الشخصيون | إليكتي — مساعدك التنفيذي الذكي في المملكة"
      seoDescription="Personal AI agent for Saudi business leaders — manages emails, calendar, reminders, and daily workflows via WhatsApp. 24/7. Bilingual Arabic & English."
      seoDescriptionAr="وكيل ذكاء اصطناعي شخصي لقادة الأعمال السعوديين — يدير البريد الإلكتروني والتقويم والتذكيرات والمهام اليومية عبر واتساب. على مدار الساعة. ثنائي اللغة."
      seoPath="/personal-ai-agents"
      seoKeywords="personal AI agent Saudi Arabia, AI executive assistant, AI personal assistant Arabic, WhatsApp AI assistant, مساعد ذكاء اصطناعي شخصي, المساعد الذكي الشخصي, مساعد إلكتروني ذكي"
      seoKeywordsAr="المساعد الذكي الشخصي، وكيل ذكاء اصطناعي شخصي، مساعد تنفيذي ذكي، مساعد واتساب ذكي، إدارة الوقت بالذكاء الاصطناعي"
      schemas={schemas}
      breadcrumb={[
        { label: "Home", labelAr: "الرئيسية", href: "/" },
        { label: "AI Agents", labelAr: "وكلاء الذكاء الاصطناعي", href: "/ai-agents" },
        { label: "Personal AI Agents", labelAr: "وكلاء شخصيون", href: "/personal-ai-agents" },
      ]}
      badge="Personal AI Agents"
      badgeAr="وكلاء الذكاء الاصطناعي الشخصيون"
      h1="Your Personal"
      h1Ar="مساعدك الذكي"
      h1Accent="AI Executive Assistant"
      h1AccentAr="الشخصي دائماً جاهز"
      tagline="Available 24/7 via WhatsApp — manages communications, calendar, and daily tasks without you lifting a finger."
      taglineAr="متاح على مدار الساعة عبر واتساب — يدير اتصالاتك وتقويمك ومهامك اليومية دون أن تحرك ساكناً."
      intro="The Personal AI Agent acts as your intelligent executive assistant. It reads your emails, manages your calendar, sends reminders, and handles your daily workflow through a simple WhatsApp conversation."
      introAr="يعمل وكيل الذكاء الاصطناعي الشخصي كمساعدك التنفيذي الذكي. يقرأ رسائلك الإلكترونية ويدير تقويمك ويرسل التذكيرات ويتعامل مع سير عملك اليومي من خلال محادثة واتساب بسيطة."
      stats={[
        { value: "24/7", label: "Always available", labelAr: "متاح دائماً" },
        { value: "40h",  label: "Saved per month",   labelAr: "موفَّرة شهرياً" },
        { value: "99%",  label: "Task accuracy",      labelAr: "دقة المهام" },
        { value: "2min", label: "Setup time",          labelAr: "وقت الإعداد" },
      ]}
      whatTitle="What Is a Personal AI Agent?"
      whatTitleAr="ما هو وكيل الذكاء الاصطناعي الشخصي؟"
      whatBody="A Personal AI Agent is an autonomous AI system that acts as your executive assistant — available 24/7, operating through WhatsApp, and capable of managing every aspect of your professional daily life. Unlike a human assistant, it never sleeps, never makes scheduling errors, and processes requests in seconds. It connects to your Gmail, Outlook, Google Calendar, and other tools, executing complex tasks through simple natural language commands in Arabic or English."
      whatBodyAr="وكيل الذكاء الاصطناعي الشخصي هو نظام ذكاء اصطناعي مستقل يعمل كمساعدك التنفيذي — متاح على مدار الساعة ويعمل عبر واتساب وقادر على إدارة كل جانب من جوانب حياتك المهنية اليومية. على عكس المساعد البشري، لا ينام أبداً ولا يرتكب أخطاء في الجدولة ويعالج الطلبات في ثوانٍ. يتصل ببريدك الإلكتروني وتقويمك وأدواتك الأخرى، وينفذ المهام المعقدة من خلال أوامر لغة طبيعية بسيطة بالعربية أو الإنجليزية."
      steps={[
        { n: "01", title: "Connect WhatsApp",   titleAr: "ربط واتساب",          desc: "Link your number in 60 seconds. The agent starts learning your communication style immediately.",   descAr: "اربط رقمك في 60 ثانية. يبدأ الوكيل فوراً في تعلم أسلوب تواصلك." },
        { n: "02", title: "Authorize Tools",    titleAr: "التصريح بالأدوات",    desc: "Grant access to email and calendar. AES-256 encryption. Revoke anytime with a single message.",   descAr: "أعطِ الوصول للبريد الإلكتروني والتقويم. تشفير AES-256. إلغاء في أي وقت برسالة واحدة." },
        { n: "03", title: "Delegate Tasks",     titleAr: "تفويض المهام",        desc: "Message naturally: 'Schedule a call with Ahmed tomorrow at 3pm.' Done instantly.",                descAr: "أرسل بشكل طبيعي: 'حدد مكالمة مع أحمد غداً الساعة 3'. يتم ذلك فوراً." },
        { n: "04", title: "Review & Refine",    titleAr: "المراجعة والتحسين",    desc: "Monitor every action via dashboard. Adjust agent preferences to refine behavior over time.",      descAr: "راقب كل إجراء عبر لوحة التحكم. اضبط تفضيلات الوكيل لتحسين سلوكه بمرور الوقت." },
      ]}
      benefits={[
        { icon: Mail,           title: "Email Management",          titleAr: "إدارة البريد الإلكتروني",    desc: "Reads, categorizes, summarizes, drafts replies, and flags priorities from Gmail or Outlook.",                descAr: "يقرأ ويصنف ويلخص البريد الإلكتروني ويصيغ الردود ويحدد الأولويات من Gmail أو Outlook." },
        { icon: Calendar,       title: "Smart Calendar",            titleAr: "تقويم ذكي",                  desc: "Books meetings, resolves conflicts, sends invites, and syncs across Google Calendar and iCal.",             descAr: "يحجز الاجتماعات ويحل التعارضات ويرسل الدعوات ويزامن مع Google Calendar." },
        { icon: Bell,           title: "Context-Aware Reminders",   titleAr: "تذكيرات سياقية",             desc: "Sets reminders based on conversation context. Pre-meeting prep reminders generated automatically.",         descAr: "يضع تذكيرات بناءً على سياق المحادثة. تذكيرات تحضير الاجتماعات تُولَّد تلقائياً." },
        { icon: Mic,            title: "Voice Command Workflows",   titleAr: "سير عمل بالأوامر الصوتية",   desc: "Send voice notes via WhatsApp. Agent transcribes, interprets, and executes instantly.",                     descAr: "أرسل ملاحظات صوتية عبر واتساب. يحول الوكيل الصوت إلى نص ويفسره وينفذه فوراً." },
        { icon: LayoutDashboard, title: "Productivity Dashboard",   titleAr: "لوحة الإنتاجية",             desc: "Real-time command center showing every action taken, task completed, and hour saved.",                     descAr: "مركز أوامر فوري يُظهر كل إجراء وكل مهمة مكتملة وكل ساعة موفَّرة." },
        { icon: MessageCircle,  title: "Natural Language Control",  titleAr: "تحكم باللغة الطبيعية",       desc: "Command in Arabic or English via WhatsApp text or voice — no apps, no logins, no learning curve.",         descAr: "أصدر الأوامر بالعربية أو الإنجليزية عبر واتساب — بدون تطبيقات أو تسجيل دخول أو منحنى تعليمي." },
      ]}
      industries={[
        { name: "Business Executives",    nameAr: "المديرون التنفيذيون" },
        { name: "Entrepreneurs",          nameAr: "رواد الأعمال" },
        { name: "Sales Professionals",    nameAr: "محترفو المبيعات" },
        { name: "Consultants",            nameAr: "الاستشاريون" },
        { name: "Lawyers",                nameAr: "المحامون" },
        { name: "Remote Teams",           nameAr: "الفرق عن بُعد" },
        { name: "Freelancers",            nameAr: "المستقلون" },
        { name: "Medical Professionals",  nameAr: "المهنيون الطبيون" },
      ]}
      useCases={[
        { icon: Briefcase,     label: "Business Executives",    labelAr: "المديرون التنفيذيون",   desc: "C-level professionals who need instant task delegation without onboarding a human assistant.",        descAr: "كبار المديرين التنفيذيين الذين يحتاجون إلى تفويض المهام فوراً دون الحاجة لمساعد بشري." },
        { icon: Building,      label: "Entrepreneurs",          labelAr: "رواد الأعمال",           desc: "Founders managing multiple workstreams who can't afford to miss meetings or important emails.",       descAr: "المؤسسون الذين يديرون مسارات عمل متعددة ولا يمكنهم تفويت الاجتماعات أو الرسائل المهمة." },
        { icon: Users,         label: "Remote Teams",           labelAr: "الفرق عن بُعد",          desc: "Distributed professionals needing async task tracking and calendar coordination across time zones.",   descAr: "المهنيون الموزعون الذين يحتاجون إلى تتبع المهام وتنسيق التقويم عبر المناطق الزمنية." },
        { icon: MessageCircle, label: "Sales Professionals",    labelAr: "محترفو المبيعات",        desc: "Account managers who need rapid email responses and automated follow-up scheduling.",               descAr: "مديرو الحسابات الذين يحتاجون إلى ردود سريعة على البريد الإلكتروني وجدولة متابعة تلقائية." },
        { icon: UserCircle,    label: "Freelancers",            labelAr: "المستقلون",              desc: "Independent professionals managing client communications, invoices, and deadlines simultaneously.",    descAr: "المهنيون المستقلون الذين يديرون تواصل العملاء والفواتير والمواعيد النهائية في آن واحد." },
        { icon: Calendar,      label: "Personal Productivity",  labelAr: "الإنتاجية الشخصية",      desc: "Anyone who wants their daily life better organized through a simple WhatsApp conversation.",         descAr: "أي شخص يريد تنظيم حياته اليومية بشكل أفضل من خلال محادثة واتساب بسيطة." },
      ]}
      faqs={[
        { q: "What is a Personal AI Agent?",                           qAr: "ما هو وكيل الذكاء الاصطناعي الشخصي؟",                      a: "A Personal AI Agent is your AI-powered executive assistant that operates via WhatsApp 24/7. It manages your emails, calendar, reminders, and daily tasks through natural language conversation.",                                               aAr: "وكيل الذكاء الاصطناعي الشخصي هو مساعدك التنفيذي المدعوم بالذكاء الاصطناعي والذي يعمل عبر واتساب على مدار الساعة. يدير بريدك الإلكتروني وتقويمك وتذكيراتك ومهامك اليومية من خلال محادثة باللغة الطبيعية." },
        { q: "Can the Personal AI Agent handle Arabic commands?",       qAr: "هل يمكن للوكيل الشخصي فهم الأوامر بالعربية؟",              a: "Yes. You can command the agent in Arabic — including Saudi dialect — and it will respond, schedule, and manage tasks entirely in Arabic if preferred.",                                                                                              aAr: "نعم. يمكنك توجيه الأوامر للوكيل بالعربية — بما في ذلك اللهجة السعودية — وسيستجيب ويجدول ويدير المهام بالعربية بالكامل إذا كنت تفضل ذلك." },
        { q: "What productivity tasks can I automate?",                qAr: "ما مهام الإنتاجية التي يمكنني أتمتتها؟",                    a: "Email management, calendar scheduling, meeting reminders, follow-up drafting, task tracking, voice note transcription, appointment booking, and weekly briefings — all via WhatsApp.",                                                          aAr: "إدارة البريد الإلكتروني وجدولة التقويم وتذكيرات الاجتماعات وصياغة المتابعات وتتبع المهام ونسخ الملاحظات الصوتية وحجز المواعيد والإحاطات الأسبوعية — جميعها عبر واتساب." },
        { q: "How does it connect to my email and calendar?",          qAr: "كيف يتصل بالبريد الإلكتروني والتقويم الخاصين بي؟",          a: "Using secure OAuth authentication, the agent connects to Gmail, Outlook, Google Calendar, or iCal. All connections use read/write permissions you explicitly grant, and can be revoked at any time.",                                          aAr: "باستخدام مصادقة OAuth الآمنة، يتصل الوكيل بـ Gmail وOutlook وGoogle Calendar أو iCal. جميع الاتصالات تستخدم الأذونات التي تمنحها صراحةً ويمكن إلغاؤها في أي وقت." },
        { q: "Is my personal data private and secure?",                qAr: "هل بياناتي الشخصية خاصة وآمنة؟",                           a: "Yes. All data is encrypted with AES-256, stored in Saudi-compliant data centers, and never sold or shared. You maintain full control and can revoke all permissions instantly.",                                                               aAr: "نعم. جميع البيانات مشفرة بـ AES-256 ومخزنة في مراكز بيانات متوافقة مع المعايير السعودية ولا تُباع أو تُشارك أبداً. تحتفظ بالتحكم الكامل ويمكنك إلغاء جميع الأذونات فوراً." },
      ]}
      ctaTitle="Get Your Personal AI Agent"
      ctaTitleAr="احصل على وكيل الذكاء الاصطناعي الشخصي"
      ctaSub="Stop drowning in tasks. Let AI handle the routine so you can focus on what matters most."
      ctaSubAr="توقف عن الغرق في المهام. دع الذكاء الاصطناعي يتعامل مع الروتين حتى تتمكن من التركيز على ما يهم."
    />
  );
}
