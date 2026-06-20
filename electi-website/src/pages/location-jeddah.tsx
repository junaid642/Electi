import { MapPin, Phone, Globe, Bot, Zap, Clock, Building, HeartPulse, Hotel, ShoppingBag, MessageCircle, Shield, Users } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeLocalBusinessSchema, makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeLocalBusinessSchema("jeddah"),
  makeServiceSchema({
    name: "AI Agents Jeddah",
    nameAr: "وكلاء الذكاء الاصطناعي جدة",
    description: "Electi delivers AI agents, AI voice agents, AI sales agents, and enterprise AI automation to Jeddah's fastest-growing businesses — bilingual Arabic & English.",
    descriptionAr: "تقدم إليكتي وكلاء ذكاء اصطناعي ووكلاء صوتيين ووكلاء مبيعات وأتمتة مؤسسية لأسرع الشركات نمواً في جدة — ثنائي اللغة عربي وإنجليزي.",
    url: "/jeddah",
    keywords: ["AI agents Jeddah", "AI automation Jeddah", "AI company Jeddah", "ذكاء اصطناعي جدة", "وكلاء ذكاء اصطناعي جدة", "شركة ذكاء اصطناعي جدة"],
  }),
  makeFaqSchema([
    { q: "Does Electi serve businesses in Jeddah?", a: "Yes. Electi serves Jeddah businesses with AI agents, AI voice agents, AI sales agents, AI workflow automation, and enterprise AI solutions — all bilingual Arabic and English — via remote deployment and on-site support." },
    { q: "What AI services does Electi offer in Jeddah?", a: "For Jeddah businesses, Electi offers: AI customer service agents, AI sales agents, AI voice agents (AI receptionists), AI HR automation, AI workflow automation, and enterprise AI solutions — all in Arabic and English." },
    { q: "How quickly can Jeddah businesses deploy AI agents?", a: "Jeddah businesses can go live with Electi AI agents within 24-48 hours — the same fast deployment timeline as our Riyadh deployments." },
    { q: "What Jeddah industries does Electi serve?", a: "Electi serves Jeddah's leading industries: retail and e-commerce, hospitality and hotels, real estate, healthcare, financial services, and corporate businesses across the Jeddah business district and surrounding areas." },
    { q: "How do I contact Electi for Jeddah?", a: "Contact Electi at +966 502547274 or mohammed@electi.sa. We serve Jeddah businesses remotely and via on-site visits." },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents Jeddah", url: "/jeddah" }]),
];

export default function JeddahPage() {
  return (
    <AuthorityPage
      seoTitle="AI Agents Jeddah | Electi — AI Automation for Jeddah Businesses"
      seoTitleAr="وكلاء الذكاء الاصطناعي جدة | إليكتي — أتمتة ذكية لشركات جدة"
      seoDescription="Electi delivers AI agents, AI voice agents, AI sales automation, and enterprise AI to Jeddah businesses. Fast deployment. Bilingual Arabic & English. Contact us today."
      seoDescriptionAr="تقدم إليكتي وكلاء ذكاء اصطناعي وأتمتة مبيعات وذكاء اصطناعي مؤسسي لشركات جدة. نشر سريع. ثنائي اللغة عربي وإنجليزي. تواصل معنا اليوم."
      seoPath="/jeddah"
      seoKeywords="AI agents Jeddah, AI automation Jeddah Saudi Arabia, AI company Jeddah, WhatsApp AI Jeddah, AI receptionist Jeddah, ذكاء اصطناعي جدة, وكلاء ذكاء اصطناعي جدة"
      seoKeywordsAr="ذكاء اصطناعي جدة، وكلاء ذكاء اصطناعي جدة، شركة ذكاء اصطناعي جدة، أتمتة ذكية جدة، موظف استقبال ذكي جدة"
      schemas={schemas}
      badge="Jeddah, Saudi Arabia"
      badgeAr="جدة، المملكة العربية السعودية"
      h1="AI Agents in"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="Jeddah"
      h1AccentAr="في جدة"
      tagline="Electi delivers intelligent AI agents and business automation to Jeddah's fastest-growing companies."
      taglineAr="تقدم إليكتي وكلاء ذكاء اصطناعي وأتمتة أعمال لأسرع الشركات نمواً في جدة."
      intro="Electi serves Jeddah businesses with the same enterprise-grade AI agents that power Saudi Arabia's leading companies — bilingual Arabic/English, WhatsApp-native, and deployable within 48 hours."
      introAr="تخدم إليكتي شركات جدة بنفس وكلاء الذكاء الاصطناعي على مستوى المؤسسات الذين يُشغّلون الشركات الرائدة في المملكة العربية السعودية — ثنائيو اللغة عربي/إنجليزي وأصيلو واتساب وقابلون للنشر خلال 48 ساعة."
      stats={[
        { value: "JED",  label: "Serving Jeddah market",  labelAr: "يخدم سوق جدة" },
        { value: "<48h", label: "Deployment time",         labelAr: "وقت النشر" },
        { value: "24/7", label: "AI service coverage",     labelAr: "تغطية ذكية" },
        { value: "2",    label: "Languages (AR/EN)",        labelAr: "لغة (عربي/إنجليزي)" },
      ]}
      whatTitle="AI Agents for Jeddah Businesses"
      whatTitleAr="وكلاء الذكاء الاصطناعي لشركات جدة"
      whatBody="Jeddah is Saudi Arabia's commercial capital and one of the Arab world's most dynamic business hubs — home to major retail, hospitality, healthcare, and real estate enterprises. Electi brings enterprise AI agent capabilities to Jeddah businesses of all sizes — from boutique retailers in the historic Al-Balad district to large hospitality groups and healthcare networks. Our AI agents are deployed remotely within 24-48 hours, bilingual in Arabic and English, WhatsApp-native, and fully PDPL-compliant — no on-site IT infrastructure required."
      whatBodyAr="جدة هي العاصمة التجارية للمملكة العربية السعودية وأحد أكثر مراكز الأعمال ديناميكية في العالم العربي — تضم مؤسسات كبرى في التجزئة والضيافة والرعاية الصحية والعقارات. تجلب إليكتي قدرات وكلاء الذكاء الاصطناعي المؤسسية لشركات جدة بجميع أحجامها — من تجار التجزئة في الحي التاريخي البلد إلى مجموعات الضيافة الكبرى وشبكات الرعاية الصحية. يتم نشر وكلائنا الذكيين عن بُعد خلال 24-48 ساعة."
      steps={[
        { n: "01", title: "Contact Electi",           titleAr: "تواصل مع إليكتي",       desc: "+966 502547274 or mohammed@electi.sa — we respond within 2 hours.",                       descAr: "+966 502547274 أو mohammed@electi.sa — نرد خلال ساعتين." },
        { n: "02", title: "Virtual Discovery",        titleAr: "استكشاف افتراضي",        desc: "60-minute video call to understand your Jeddah business needs and design the AI solution.", descAr: "مكالمة فيديو مدتها 60 دقيقة لفهم احتياجات عملك في جدة وتصميم الحل الذكي." },
        { n: "03", title: "Custom AI Proposal",       titleAr: "عرض ذكاء اصطناعي مخصص", desc: "Tailored AI automation proposal for your Jeddah business within 48 hours.",               descAr: "عرض أتمتة ذكية مخصص لعملك في جدة خلال 48 ساعة." },
        { n: "04", title: "Remote Deployment",        titleAr: "النشر عن بُعد",          desc: "AI agents deployed remotely within 24-48 hours — fully operational from day one.",         descAr: "وكلاء الذكاء الاصطناعي منتشرون عن بُعد خلال 24-48 ساعة — يعمل بالكامل من اليوم الأول." },
      ]}
      benefits={[
        { icon: Globe,        title: "Jeddah-Ready AI",         titleAr: "ذكاء اصطناعي جاهز لجدة",    desc: "AI solutions designed for Jeddah's commercial landscape — retail, hospitality, healthcare, real estate.", descAr: "حلول ذكاء اصطناعي مصممة للمشهد التجاري لجدة — التجزئة والضيافة والرعاية الصحية والعقارات." },
        { icon: Bot,          title: "Remote Deployment",       titleAr: "نشر عن بُعد",               desc: "Full AI deployment without requiring on-site infrastructure — operational within 48 hours.",              descAr: "نشر كامل للذكاء الاصطناعي دون الحاجة لبنية تحتية في الموقع — يعمل خلال 48 ساعة." },
        { icon: MessageCircle, title: "WhatsApp-Native",        titleAr: "أصيل واتساب",               desc: "Operates in WhatsApp Business — the dominant customer communication channel in Jeddah.",                  descAr: "يعمل في واتساب للأعمال — القناة الرئيسية للتواصل مع العملاء في جدة." },
        { icon: Shield,       title: "PDPL Compliant",          titleAr: "متوافق مع PDPL",             desc: "Saudi data protection law compliance for all Jeddah deployments — full data residency in KSA.",           descAr: "امتثال لنظام حماية البيانات الشخصية السعودي لجميع عمليات النشر في جدة." },
        { icon: Zap,          title: "Fast Go-Live",            titleAr: "إطلاق سريع",                desc: "Jeddah businesses live with AI agents in 24-48 hours — no lengthy projects.",                            descAr: "تنطلق شركات جدة مع وكلاء الذكاء الاصطناعي في 24-48 ساعة — بدون مشاريع طويلة." },
        { icon: Clock,        title: "24/7 AI Operations",      titleAr: "عمليات ذكية على مدار الساعة", desc: "AI agents serving your Jeddah customers around the clock — including weekends and holidays.",          descAr: "وكلاء ذكاء اصطناعي يخدمون عملاءك في جدة على مدار الساعة — بما في ذلك عطل نهاية الأسبوع والإجازات." },
      ]}
      industries={[
        { name: "Retail & Fashion",          nameAr: "التجزئة والأزياء" },
        { name: "Hospitality & Hotels",      nameAr: "الضيافة والفنادق" },
        { name: "Healthcare & Clinics",      nameAr: "الرعاية الصحية والعيادات" },
        { name: "Real Estate",               nameAr: "العقارات" },
        { name: "Food & Beverage",           nameAr: "الأغذية والمشروبات" },
        { name: "E-commerce",                nameAr: "التجارة الإلكترونية" },
        { name: "Financial Services",        nameAr: "الخدمات المالية" },
        { name: "Tourism & Events",          nameAr: "السياحة والفعاليات" },
      ]}
      useCases={[
        { icon: Hotel,        label: "Jeddah Hospitality AI",     labelAr: "ذكاء اصطناعي الضيافة — جدة",    desc: "AI reservation agents for Jeddah's hotels, resorts, restaurants, and wedding venues.",            descAr: "وكلاء حجز ذكيون لفنادق ومنتجعات ومطاعم وقاعات أفراح جدة." },
        { icon: ShoppingBag,  label: "Jeddah Retail AI",          labelAr: "ذكاء اصطناعي التجزئة — جدة",    desc: "AI customer support and order management for Jeddah's retail and fashion brands.",                 descAr: "دعم عملاء ذكي وإدارة طلبات لشركات التجزئة والأزياء في جدة." },
        { icon: HeartPulse,   label: "Jeddah Healthcare AI",      labelAr: "ذكاء اصطناعي الرعاية الصحية — جدة", desc: "AI appointment booking and patient support for Jeddah medical centers and clinics.",          descAr: "حجز مواعيد ذكي ودعم مرضى للمراكز الطبية والعيادات في جدة." },
        { icon: Building,     label: "Jeddah Real Estate AI",     labelAr: "ذكاء اصطناعي العقارات — جدة",    desc: "AI lead qualification and site visit booking for Jeddah real estate developers and brokers.",      descAr: "تأهيل عملاء ذكي وحجز زيارات موقع لمطوري وسماسرة العقارات في جدة." },
        { icon: MessageCircle, label: "WhatsApp AI — Jeddah",     labelAr: "واتساب ذكي — جدة",              desc: "WhatsApp Business AI automation for Jeddah businesses — responding in Arabic instantly 24/7.",    descAr: "أتمتة واتساب للأعمال لشركات جدة — الرد بالعربية فوراً على مدار الساعة." },
        { icon: Users,        label: "Jeddah Sales Automation",   labelAr: "أتمتة المبيعات — جدة",          desc: "AI sales agents qualifying Jeddah leads and booking sales appointments automatically.",             descAr: "وكلاء مبيعات ذكيون يؤهّلون عملاء جدة المحتملين ويحجزون مواعيد المبيعات تلقائياً." },
      ]}
      faqs={[
        { q: "Does Electi serve businesses in Jeddah?",               qAr: "هل تخدم إليكتي الشركات في جدة؟",                            a: "Yes. Electi serves Jeddah businesses with AI agents, AI voice agents, AI sales agents, workflow automation, and enterprise AI solutions — all bilingual Arabic and English.",                                                                           aAr: "نعم. تخدم إليكتي شركات جدة بوكلاء ذكاء اصطناعي ووكلاء صوتيين ووكلاء مبيعات وأتمتة سير عمل وحلول مؤسسية — جميعها ثنائية اللغة عربي وإنجليزي." },
        { q: "What AI services are available in Jeddah?",              qAr: "ما خدمات الذكاء الاصطناعي المتاحة في جدة؟",               a: "Electi offers in Jeddah: AI customer service agents, AI sales agents, AI voice agents (AI receptionists), AI HR automation, AI workflow automation, and enterprise AI — all in Arabic and English.",                                                  aAr: "تقدم إليكتي في جدة: وكلاء خدمة عملاء ذكيون ووكلاء مبيعات ووكلاء صوتيون (موظف استقبال ذكي) وأتمتة موارد بشرية وأتمتة سير عمل وذكاء اصطناعي مؤسسي." },
        { q: "How quickly can Jeddah businesses go live with AI agents?", qAr: "كم سرعة إطلاق الشركات في جدة مع وكلاء الذكاء الاصطناعي؟", a: "Jeddah businesses can go live within 24-48 hours — same fast deployment timeline as Riyadh. All deployment is done remotely; no on-site infrastructure required.",                                                                               aAr: "يمكن لشركات جدة الإطلاق خلال 24-48 ساعة — نفس جدول النشر السريع كالرياض. يتم جميع النشر عن بُعد؛ لا بنية تحتية في الموقع مطلوبة." },
        { q: "What industries in Jeddah does Electi specialize in?",  qAr: "ما الصناعات في جدة التي تتخصص فيها إليكتي؟",              a: "Electi serves Jeddah's key industries: retail and fashion, hospitality and hotels, healthcare and clinics, real estate, food and beverage, e-commerce, financial services, and tourism.",                                                            aAr: "تخدم إليكتي الصناعات الرئيسية في جدة: التجزئة والأزياء والضيافة والفنادق والرعاية الصحية والعقارات والأغذية والتجارة الإلكترونية والخدمات المالية والسياحة." },
        { q: "How do I contact Electi for Jeddah service?",            qAr: "كيف أتواصل مع إليكتي لخدمة جدة؟",                         a: "Contact us at +966 502547274 or mohammed@electi.sa. We typically respond within 2 hours and can arrange virtual discovery meetings or on-site visits to Jeddah.",                                                                                      aAr: "تواصل معنا على +966 502547274 أو mohammed@electi.sa. نرد عادةً خلال ساعتين ويمكننا ترتيب اجتماعات استكشافية افتراضية أو زيارات حضورية لجدة." },
      ]}
      ctaTitle="Deploy AI Agents for Your Jeddah Business"
      ctaTitleAr="انشر وكلاء الذكاء الاصطناعي لعملك في جدة"
      ctaSub="Jeddah's fastest-growing businesses are automating with Electi. Get started in under 48 hours."
      ctaSubAr="أسرع الشركات نمواً في جدة تؤتمت مع إليكتي. ابدأ في أقل من 48 ساعة."
    />
  );
}
