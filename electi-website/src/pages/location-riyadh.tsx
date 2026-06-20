import { MapPin, Phone, Mail, Clock, Globe, Bot, Zap, Users, Building, HeartPulse, Hotel, ShoppingBag, HardHat, MessageCircle, Shield } from "lucide-react";
import AuthorityPage from "@/components/templates/AuthorityPage";
import { makeLocalBusinessSchema, makeServiceSchema, makeFaqSchema, makeBreadcrumbSchema } from "@/lib/schema";

const schemas = [
  makeLocalBusinessSchema("riyadh"),
  makeServiceSchema({
    name: "AI Agents Riyadh",
    nameAr: "وكلاء الذكاء الاصطناعي الرياض",
    description: "Electi provides AI agents, AI voice agents, AI sales agents, and enterprise AI automation to businesses in Riyadh, Saudi Arabia — bilingual Arabic & English.",
    descriptionAr: "تقدم إليكتي وكلاء ذكاء اصطناعي ووكلاء صوتيين ووكلاء مبيعات وأتمتة مؤسسية للشركات في الرياض، المملكة العربية السعودية.",
    url: "/riyadh",
    keywords: ["AI agents Riyadh", "AI automation Riyadh", "AI company Riyadh", "ذكاء اصطناعي الرياض", "وكلاء ذكاء اصطناعي الرياض", "شركة ذكاء اصطناعي الرياض"],
  }),
  makeFaqSchema([
    { q: "Does Electi serve businesses in Riyadh?", a: "Yes. Electi is headquartered in Riyadh (2413 Ad Damman Road, Ghirnath Dist., Unit No 2414, Riyadh 13242-7933) and serves businesses across the Riyadh region with AI agents, AI voice agents, and enterprise automation." },
    { q: "What AI services does Electi offer in Riyadh?", a: "In Riyadh, Electi offers: AI customer service agents, AI sales agents, AI voice agents (AI receptionists), AI HR agents, AI workflow automation, and enterprise AI solutions — all bilingual Arabic and English." },
    { q: "Can Electi provide on-site support in Riyadh?", a: "Yes. Electi's Riyadh team provides on-site meetings, implementation support, and enterprise consulting directly at your Riyadh office." },
    { q: "How does Electi's AI support Riyadh's Vision 2030 goals?", a: "Electi's AI automation reduces operational costs, improves service quality, and accelerates digital transformation — directly supporting Riyadh's and Saudi Arabia's Vision 2030 digital economy objectives." },
    { q: "What is the contact for Electi in Riyadh?", a: "Electi Riyadh: +966 502547274 | mohammed@electi.sa | 2413 Ad Damman Road, Ghirnath Dist., Unit No 2414, Riyadh 13242-7933, KSA" },
  ]),
  makeBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "AI Agents Riyadh", url: "/riyadh" }]),
];

export default function RiyadhPage() {
  return (
    <AuthorityPage
      seoTitle="AI Agents Riyadh | Electi — AI Automation for Riyadh Businesses"
      seoTitleAr="وكلاء الذكاء الاصطناعي الرياض | إليكتي — أتمتة ذكية لشركات الرياض"
      seoDescription="Electi serves Riyadh businesses with AI agents, AI voice agents, AI sales agents, and enterprise AI automation. Headquartered in Riyadh. Bilingual Arabic & English."
      seoDescriptionAr="تخدم إليكتي شركات الرياض بوكلاء ذكاء اصطناعي ووكلاء صوتيين ووكلاء مبيعات وأتمتة مؤسسية. مقرها في الرياض. ثنائي اللغة عربي وإنجليزي."
      seoPath="/riyadh"
      seoKeywords="AI agents Riyadh, AI automation Riyadh Saudi Arabia, AI company Riyadh, WhatsApp AI Riyadh, AI receptionist Riyadh, ذكاء اصطناعي الرياض, وكلاء ذكاء اصطناعي الرياض"
      seoKeywordsAr="ذكاء اصطناعي الرياض، وكلاء ذكاء اصطناعي الرياض، شركة ذكاء اصطناعي الرياض، أتمتة ذكية الرياض، موظف استقبال ذكي الرياض"
      schemas={schemas}
      badge="Riyadh, Saudi Arabia"
      badgeAr="الرياض، المملكة العربية السعودية"
      h1="AI Agents in"
      h1Ar="وكلاء الذكاء الاصطناعي"
      h1Accent="Riyadh"
      h1AccentAr="في الرياض"
      tagline="Electi serves Riyadh businesses with enterprise AI agents, voice automation, and AI workforce infrastructure."
      taglineAr="تخدم إليكتي شركات الرياض بوكلاء ذكاء اصطناعي مؤسسيين وأتمتة صوتية وبنية تحتية لقوى العمل الذكية."
      intro="Headquartered in Riyadh, Electi is Saudi Arabia's leading AI agent company — delivering bilingual Arabic/English AI automation to businesses across the Riyadh region and beyond."
      introAr="تتخذ إليكتي من الرياض مقراً لها وهي الشركة الرائدة في مجال وكلاء الذكاء الاصطناعي في المملكة العربية السعودية — تقدم أتمتة ذكية ثنائية اللغة عربي/إنجليزي للشركات في منطقة الرياض وما بعدها."
      stats={[
        { value: "RUH",  label: "Headquartered in Riyadh",  labelAr: "مقرها في الرياض" },
        { value: "24/7", label: "AI service coverage",      labelAr: "تغطية خدمة ذكية" },
        { value: "2",    label: "Languages (AR/EN)",         labelAr: "لغة (عربي/إنجليزي)" },
        { value: "6+",   label: "Industries served",         labelAr: "قطاع يُخدم" },
      ]}
      whatTitle="AI Agents for Riyadh Businesses"
      whatTitleAr="وكلاء الذكاء الاصطناعي لشركات الرياض"
      whatBody="Electi is headquartered in Riyadh and serves businesses across the Saudi capital with a comprehensive suite of AI agent solutions. Riyadh businesses — from startups in King Abdullah Financial District to large enterprises in the industrial zones — use Electi's AI agents to automate customer service, sales, HR, and operational workflows. All solutions are bilingual (Arabic and English), WhatsApp-native, and compliant with Saudi PDPL data protection regulations. Electi supports Riyadh's Vision 2030 digital transformation goals by enabling Saudi businesses to compete at global AI standards."
      whatBodyAr="تتخذ إليكتي من الرياض مقراً لها وتخدم الشركات في العاصمة السعودية بمجموعة شاملة من حلول وكلاء الذكاء الاصطناعي. تستخدم شركات الرياض — من الشركات الناشئة في مركز الملك عبدالله المالي إلى المؤسسات الكبيرة في المناطق الصناعية — وكلاء إليكتي لأتمتة خدمة العملاء والمبيعات والموارد البشرية وسير العمل التشغيلي. جميع الحلول ثنائية اللغة (عربي وإنجليزي) وأصيلة واتساب ومتوافقة مع لوائح حماية البيانات PDPL السعودية."
      steps={[
        { n: "01", title: "Contact Our Riyadh Team",  titleAr: "تواصل مع فريق الرياض",  desc: "Reach us at +966 502547274 or mohammed@electi.sa. We respond within 2 hours.",              descAr: "تواصل معنا على +966 502547274 أو mohammed@electi.sa. نرد خلال ساعتين." },
        { n: "02", title: "Discovery Meeting",        titleAr: "اجتماع الاستكشاف",      desc: "Free 60-minute meeting (in person in Riyadh or virtual) to map your AI automation needs.",   descAr: "اجتماع مجاني لمدة 60 دقيقة (حضورياً في الرياض أو افتراضياً) لرسم احتياجاتك في الأتمتة." },
        { n: "03", title: "Custom AI Proposal",       titleAr: "عرض ذكاء اصطناعي مخصص", desc: "We design a tailored AI solution for your Riyadh business within 48 hours.",               descAr: "نصمم حل ذكاء اصطناعي مخصصاً لعملك في الرياض خلال 48 ساعة." },
        { n: "04", title: "Deploy & Go Live",         titleAr: "النشر والإطلاق",         desc: "AI agents deployed and live within 24-48 hours. Saudi-compliant, Arabic-first.",           descAr: "وكلاء الذكاء الاصطناعي منتشرون وحيّون خلال 24-48 ساعة. متوافق مع المعايير السعودية." },
      ]}
      benefits={[
        { icon: MapPin,       title: "Riyadh-Based Team",       titleAr: "فريق في الرياض",          desc: "Local team available for on-site meetings, Arabic-first support, and implementation.",              descAr: "فريق محلي متاح للاجتماعات الحضورية والدعم العربي أولاً والتنفيذ." },
        { icon: Globe,        title: "Arabic-First AI",          titleAr: "ذكاء اصطناعي يُعطي العربية الأولوية", desc: "AI solutions designed for Arabic speakers — Saudi dialect, bilingual documents, RTL interfaces.", descAr: "حلول ذكاء اصطناعي مصممة للناطقين بالعربية — لهجة سعودية ومستندات ثنائية اللغة وواجهات RTL." },
        { icon: Building,     title: "Vision 2030 Aligned",     titleAr: "متوافق مع رؤية 2030",     desc: "AI automation supporting Riyadh's digital transformation and Vision 2030 economy goals.",          descAr: "أتمتة ذكية تدعم التحول الرقمي للرياض وأهداف اقتصاد رؤية 2030." },
        { icon: Shield,       title: "PDPL Compliant",          titleAr: "متوافق مع PDPL",          desc: "Full Saudi data protection law compliance — Saudi data residency, AES-256 encryption.",            descAr: "امتثال كامل لنظام حماية البيانات الشخصية السعودي — إقامة البيانات السعودية وتشفير AES-256." },
        { icon: Clock,        title: "Fast Deployment",         titleAr: "نشر سريع",                desc: "AI agents live within 24-48 hours — fastest deployment in the Riyadh market.",                    descAr: "وكلاء ذكاء اصطناعي حيّون خلال 24-48 ساعة — أسرع نشر في سوق الرياض." },
        { icon: Phone,        title: "Direct Riyadh Contact",   titleAr: "تواصل مباشر بالرياض",    desc: "+966 502547274 | mohammed@electi.sa | 2413 Ad Damman Road, Riyadh.",                             descAr: "+966 502547274 | mohammed@electi.sa | طريق الدمام 2413، الرياض." },
      ]}
      industries={[
        { name: "Real Estate & Development",      nameAr: "العقارات والتطوير" },
        { name: "Healthcare & Clinics",           nameAr: "الرعاية الصحية والعيادات" },
        { name: "Hospitality & Hotels",           nameAr: "الضيافة والفنادق" },
        { name: "Corporate & Enterprise",         nameAr: "الشركات والمؤسسات" },
        { name: "Construction & Contracting",     nameAr: "البناء والمقاولات" },
        { name: "Retail & E-commerce",            nameAr: "التجزئة والتجارة الإلكترونية" },
        { name: "Financial Services & Banking",   nameAr: "الخدمات المالية والبنوك" },
        { name: "Government & Public Sector",     nameAr: "القطاع الحكومي والعام" },
      ]}
      useCases={[
        { icon: Bot,          label: "AI Customer Service",       labelAr: "خدمة عملاء ذكية",          desc: "24/7 AI customer support in Arabic and English — for Riyadh businesses of all sizes.",             descAr: "دعم عملاء ذكي على مدار الساعة بالعربية والإنجليزية — لشركات الرياض بجميع أحجامها." },
        { icon: MessageCircle, label: "WhatsApp AI Agents",       labelAr: "وكلاء واتساب الذكيون",     desc: "WhatsApp Business automation for Riyadh businesses — responding in Arabic instantly.",              descAr: "أتمتة واتساب للأعمال لشركات الرياض — الرد بالعربية فوراً." },
        { icon: Zap,          label: "Sales Automation",          labelAr: "أتمتة المبيعات",            desc: "AI sales agents qualifying Riyadh leads 24/7 — in Arabic and English.",                          descAr: "وكلاء مبيعات ذكيون يؤهّلون عملاء الرياض المحتملين على مدار الساعة." },
        { icon: HeartPulse,   label: "Healthcare AI — Riyadh",   labelAr: "ذكاء اصطناعي للرعاية الصحية — الرياض", desc: "AI appointment booking and patient support for Riyadh clinics, hospitals, and medical centers.", descAr: "حجز مواعيد ذكي ودعم مرضى لعيادات الرياض والمستشفيات والمراكز الطبية." },
        { icon: Hotel,        label: "Hospitality AI — Riyadh",  labelAr: "ذكاء اصطناعي للضيافة — الرياض", desc: "AI reservation agents for Riyadh hotels, resorts, restaurants, and event venues.",              descAr: "وكلاء حجز ذكيون لفنادق ومنتجعات ومطاعم وأماكن الفعاليات في الرياض." },
        { icon: Building,     label: "Real Estate AI — Riyadh",  labelAr: "ذكاء اصطناعي للعقارات — الرياض", desc: "AI lead qualification and site visit booking for Riyadh real estate developers and agents.",   descAr: "تأهيل عملاء ذكي وحجز زيارات موقع لمطوري العقارات ووكلاء الرياض." },
      ]}
      faqs={[
        { q: "Is Electi based in Riyadh?",                        qAr: "هل إليكتي مقرها في الرياض؟",                                a: "Yes. Electi is headquartered in Riyadh at 2413 Ad Damman Road, Ghirnath Dist., Unit No 2414, Riyadh 13242-7933, KSA.",                                                                                                                             aAr: "نعم. مقر إليكتي في الرياض في 2413 طريق الدمام، حي غرناطة، وحدة رقم 2414، الرياض 13242-7933، المملكة العربية السعودية." },
        { q: "What AI services does Electi offer in Riyadh?",     qAr: "ما خدمات الذكاء الاصطناعي التي تقدمها إليكتي في الرياض؟", a: "In Riyadh, Electi offers: AI customer service agents, AI sales agents, AI voice agents (AI receptionists), AI HR agents, AI workflow automation, and enterprise AI solutions — all bilingual Arabic and English.",                                  aAr: "في الرياض، تقدم إليكتي: وكلاء خدمة عملاء ذكيون ووكلاء مبيعات ذكيون ووكلاء صوتيون (موظف استقبال ذكي) ووكلاء موارد بشرية وأتمتة سير عمل وحلول مؤسسية — جميعها ثنائية اللغة." },
        { q: "Can I meet the Electi team in Riyadh?",             qAr: "هل يمكنني مقابلة فريق إليكتي في الرياض؟",                  a: "Yes. Electi's Riyadh team is available for in-person meetings at your office or at our Riyadh headquarters. Contact us at +966 502547274 to schedule.",                                                                                                aAr: "نعم. فريق إليكتي في الرياض متاح للاجتماعات الحضورية في مكتبك أو في مقرنا في الرياض. تواصل معنا على +966 502547274 للجدولة." },
        { q: "How does AI automation support Vision 2030 in Riyadh?", qAr: "كيف تدعم أتمتة الذكاء الاصطناعي رؤية 2030 في الرياض؟", a: "Electi's AI solutions help Riyadh businesses reduce operational costs, improve service quality, scale efficiently, and compete globally — directly supporting Saudi Vision 2030's digital economy and productivity goals.",                               aAr: "تساعد حلول إليكتي الذكية شركات الرياض على تقليل التكاليف وتحسين جودة الخدمة والتوسع بكفاءة والمنافسة عالمياً — مما يدعم مباشرةً أهداف الاقتصاد الرقمي والإنتاجية لرؤية 2030." },
        { q: "How do I contact Electi Riyadh?",                   qAr: "كيف أتواصل مع إليكتي الرياض؟",                            a: "Phone: +966 502547274 | Email: mohammed@electi.sa | Address: 2413 Ad Damman Road, Ghirnath Dist., Unit No 2414, Riyadh 13242-7933, KSA. Available Sunday–Thursday, 9am–6pm.",                                                                       aAr: "الهاتف: 502547274 966+ | البريد: mohammed@electi.sa | العنوان: 2413 طريق الدمام، حي غرناطة، وحدة 2414، الرياض 13242-7933. متاحون الأحد-الخميس، 9ص-6م." },
      ]}
      ctaTitle="Start Your AI Journey in Riyadh"
      ctaTitleAr="ابدأ رحلة الذكاء الاصطناعي في الرياض"
      ctaSub="Electi's Riyadh team is ready to deploy AI agents for your business. Contact us today for a free discovery meeting."
      ctaSubAr="فريق إليكتي في الرياض جاهز لنشر وكلاء الذكاء الاصطناعي لعملك. تواصل معنا اليوم للحصول على اجتماع استكشاف مجاني."
    />
  );
}
