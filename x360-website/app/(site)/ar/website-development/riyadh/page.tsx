import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "تطوير مواقع إلكترونية في الرياض | تصميم وبرمجة احترافية",
  description: "تطوير مواقع إلكترونية احترافية في الرياض للشركات والمؤسسات والتجارة الإلكترونية. تصميم UI/UX متميز، SEO عربي وإنجليزي، وتطوير تطبيقات جوال.",
  keywords: "تطوير مواقع إلكترونية الرياض، تصميم مواقع الرياض، برمجة مواقع الرياض، تجارة إلكترونية الرياض، X360 تطوير مواقع",
  openGraph: {
    title: "تطوير مواقع إلكترونية في الرياض | تصميم وبرمجة احترافية",
    description: "تطوير مواقع إلكترونية احترافية في الرياض للشركات والمؤسسات والتجارة الإلكترونية. تصميم UI/UX متميز، SEO عربي وإنجليزي، وتطوير تطبيقات جوال.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/website-development/riyadh",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "تطوير مواقع إلكترونية في الرياض | تصميم وبرمجة احترافية | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تطوير مواقع إلكترونية في الرياض | تصميم وبرمجة احترافية",
    description: "تطوير مواقع إلكترونية احترافية في الرياض للشركات والمؤسسات والتجارة الإلكترونية. تصميم UI/UX متميز، SEO عربي وإنجليزي، وتطوير تطبيقات جوال.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/website-development/riyadh",
    languages: {
      "en-SA": "https://www.x-360.ai/website-development/riyadh",
      "ar-SA": "https://www.x-360.ai/ar/website-development/riyadh",
      "x-default": "https://www.x-360.ai/website-development/riyadh",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — تطوير مواقع إلكترونية الرياض",
  "description": "تطوير مواقع إلكترونية احترافية في الرياض للشركات والمؤسسات والتجارة الإلكترونية. تصميم UI/UX متميز، SEO عربي وإنجليزي، وتطوير تطبيقات جوال.",
  "url": "https://www.x-360.ai/ar/website-development/riyadh",
  "telephone": "+966502547274",
  "email": "info@x-360.ai",
  "address": {"@type":"PostalAddress","addressLocality":"الرياض","addressCountry":"SA"},
  "serviceArea": {"@type":"City","name":"الرياض"},
  "priceRange": "$$",
  "image": "https://www.x-360.ai/opengraph.jpg",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "تطوير مواقع إلكترونية الرياض",
  "description": "تطوير مواقع إلكترونية احترافية في الرياض للشركات والمؤسسات والتجارة الإلكترونية. تصميم UI/UX متميز، SEO عربي وإنجليزي، وتطوير تطبيقات جوال.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"الرياض","containedIn":"Saudi Arabia"},
  "serviceType": "تطوير مواقع إلكترونية",
  "url": "https://www.x-360.ai/ar/website-development/riyadh",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"كم تكلفة تطوير موقع إلكتروني احترافي في الرياض؟","acceptedAnswer":{"@type":"Answer","text":"تبدأ مواقع الشركات من 8,000 ريال ومتاجر التجارة الإلكترونية من 15,000 ريال، وترتفع حسب التعقيد والمتطلبات. نقدم عرض سعر مفصلاً خلال 48 ساعة."}},{"@type":"Question","name":"هل تقدمون دعماً للغة العربية وتخطيط RTL؟","acceptedAnswer":{"@type":"Answer","text":"نعم. جميع مواقعنا تدعم العربية والإنجليزية بشكل كامل مع تخطيط RTL/LTR صحيح وتجربة مستخدم محسّنة لكل لغة."}},{"@type":"Question","name":"كم المدة اللازمة لبناء موقع شركة في الرياض؟","acceptedAnswer":{"@type":"Answer","text":"موقع الشركة المعياري يستغرق 4-6 أسابيع. المنصات الأكثر تعقيداً كالتجارة الإلكترونية والبوابات المخصصة تستغرق 8-14 أسبوعاً."}},{"@type":"Question","name":"هل تشمل الخدمة تحسين محركات البحث SEO؟","acceptedAnswer":{"@type":"Answer","text":"نعم. جميع مواقعنا تُبنى بأساس SEO قوي للعربية والإنجليزية مع تحسين الأداء وسرعة التحميل وملاءمة الجوال منذ البداية."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"تطوير المواقع الإلكترونية","item":"https://www.x-360.ai/ar/website-development"},
    {"@type":"ListItem","position":3,"name":"الرياض","item":"https://www.x-360.ai/ar/website-development/riyadh"},
  ],
};

const pageData: ArCityData = {
  cityAr: "الرياض",
  serviceAr: "تطوير المواقع الإلكترونية",
  heroTitleAr: "تطوير مواقع إلكترونية احترافية في الرياض — حضور رقمي يليق بطموحاتك",
  heroSubAr: "من مواقع الشركات الكبرى إلى منصات التجارة الإلكترونية المتكاملة — تبني X360 مواقع سريعة وآمنة ومُحسَّنة لمحركات البحث العربية والدولية.",
  introHeadingAr: "شريكك الرقمي لتطوير المواقع في الرياض",
  introParasAr: ["الرياض سوق رقمي متسارع النمو، حيث تتنافس آلاف الشركات على الحضور الإلكتروني المتميز. الموقع الإلكتروني لم يعد مجرد بطاقة تعريفية — بل هو عنصر مبيعات يعمل على مدار الساعة ويصل لعملاء في الرياض والسعودية والعالم.", "تقدم X360 حلول تطوير مواقع شاملة للشركات الرياضية — من مواقع الشركات الاحترافية إلى منصات التجارة الإلكترونية المتكاملة وبوابات المحتوى والتطبيقات المخصصة. كل موقع نبنيه مُحسَّن لمحركات البحث العربية والإنجليزية ومُصمَّم لتحويل الزائر إلى عميل."],
  facts: [
    {val:"+250", label:"موقع إلكتروني في الرياض"},
    {val:"4-6", label:"أسابيع حتى الإطلاق"},
    {val:"100%", label:"دعم عربي وإنجليزي"},
    {val:"A+", label:"أداء ودرجة أمان"}
  ],
  servicesHeadingAr: "خدمات تطوير المواقع في الرياض",
  services: [
    {icon:"monitor" as ArIconKey, title:"مواقع الشركات والمؤسسات", desc:"تصميم وتطوير مواقع إلكترونية احترافية للشركات والمؤسسات الكبرى بأداء عالٍ وهوية بصرية متميزة."},
    {icon:"code" as ArIconKey, title:"التجارة الإلكترونية والمتاجر الرقمية", desc:"بناء منصات تجارة إلكترونية متكاملة بتجربة مستخدم سلسة وبوابات دفع محلية وعربية."},
    {icon:"smartphone" as ArIconKey, title:"تطوير تطبيقات الجوال", desc:"تطبيقات iOS وAndroid بتصميم عصري وأداء متميز، مُحسَّنة لمستخدمي الجوال في السعودية."},
    {icon:"brain" as ArIconKey, title:"تحسين SEO العربي وتجربة المستخدم", desc:"تحسين محركات البحث للعربية والإنجليزية مع تجربة مستخدم مدروسة تحقق أعلى معدلات تحويل."}
  ],
  cityContextAr: "الرياض مركز الأعمال والتجارة في المملكة، مع إيكوسيستم ناشئ يضم آلاف الشركات الناشئة والمتوسطة والكبرى. رؤية 2030 تدفع نحو التحول الرقمي في القطاعين الخاص والعام، مما يخلق طلباً متصاعداً على مواقع احترافية وتطبيقات رقمية تواكب هذا التحول.",
  industries: ["الشركات والمؤسسات الكبرى", "التجارة الإلكترونية والتجزئة", "العقارات والتطوير", "الضيافة والسياحة", "الرعاية الصحية", "التعليم والتدريب", "الحكومة والقطاع العام", "الخدمات المالية والبنوك"],
  processSteps: [
    {title:"اكتشاف الأهداف والتخطيط", desc:"نفهم أهداف أعمالك وجمهورك المستهدف ونضع استراتيجية رقمية شاملة قبل أي سطر كود."},
    {title:"التصميم وإنشاء النماذج", desc:"تصميم واجهات UI/UX جاذبة بإشراكك في كل مرحلة لضمان أن الموقع يعكس هوية علامتك التجارية."},
    {title:"التطوير والاختبار الشامل", desc:"بناء الموقع بأحدث التقنيات مع اختبار شامل على جميع الأجهزة والمتصفحات والشبكات."},
    {title:"الإطلاق والدعم المستمر", desc:"إطلاق الموقع مع التدريب على إدارة المحتوى وخدمة الدعم والصيانة لضمان الأداء المستمر."}
  ],
  whyPoints: [
    {icon:"code" as ArIconKey, title:"تقنيات متقدمة ومحلية", desc:"نستخدم أحدث أطر العمل مع دعم كامل للغة العربية وRTL والمتطلبات التقنية للسوق السعودي."},
    {icon:"trending" as ArIconKey, title:"نتائج قابلة للقياس", desc:"كل موقع نبنيه مُحسَّن لمحركات البحث وسرعة التحميل ومعدلات التحويل منذ اليوم الأول."},
    {icon:"shield" as ArIconKey, title:"أمان وموثوقية عالية", desc:"شهادات SSL وبنية تحتية سحابية آمنة وتشفير شامل لحماية بيانات عملاءك وموقعك."}
  ],
  faqItems: [
    {q:"كم تكلفة تطوير موقع إلكتروني احترافي في الرياض؟", a:"تبدأ مواقع الشركات من 8,000 ريال ومتاجر التجارة الإلكترونية من 15,000 ريال، وترتفع حسب التعقيد والمتطلبات. نقدم عرض سعر مفصلاً خلال 48 ساعة."},
    {q:"هل تقدمون دعماً للغة العربية وتخطيط RTL؟", a:"نعم. جميع مواقعنا تدعم العربية والإنجليزية بشكل كامل مع تخطيط RTL/LTR صحيح وتجربة مستخدم محسّنة لكل لغة."},
    {q:"كم المدة اللازمة لبناء موقع شركة في الرياض؟", a:"موقع الشركة المعياري يستغرق 4-6 أسابيع. المنصات الأكثر تعقيداً كالتجارة الإلكترونية والبوابات المخصصة تستغرق 8-14 أسبوعاً."},
    {q:"هل تشمل الخدمة تحسين محركات البحث SEO؟", a:"نعم. جميع مواقعنا تُبنى بأساس SEO قوي للعربية والإنجليزية مع تحسين الأداء وسرعة التحميل وملاءمة الجوال منذ البداية."}
  ],
  relatedLinks: [
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"حلول الذكاء الاصطناعي الرياض", href:"/ar/ai-solutions/riyadh"},
    {label:"حلول ERP وSAP الرياض", href:"/ar/erp-sap/riyadh"},
    {label:"تطوير مواقع جدة", href:"/ar/website-development/jeddah"}
  ],
  canonicalEnUrl: "/website-development/riyadh",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArCityPage data={pageData} />
    </>
  );
}
