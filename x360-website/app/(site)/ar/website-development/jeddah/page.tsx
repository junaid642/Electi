import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "تطوير مواقع إلكترونية في جدة | تصميم وبرمجة مواقع احترافية",
  description: "تطوير مواقع إلكترونية احترافية في جدة للشركات والفنادق والتجارة الإلكترونية. تصميم UI/UX عصري، تحسين SEO عربي وإنجليزي، ودعم شامل.",
  keywords: "تطوير مواقع إلكترونية جدة، تصميم مواقع جدة، برمجة مواقع جدة، تجارة إلكترونية جدة، X360 جدة",
  openGraph: {
    title: "تطوير مواقع إلكترونية في جدة | تصميم وبرمجة مواقع احترافية",
    description: "تطوير مواقع إلكترونية احترافية في جدة للشركات والفنادق والتجارة الإلكترونية. تصميم UI/UX عصري، تحسين SEO عربي وإنجليزي، ودعم شامل.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/website-development/jeddah",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "تطوير مواقع إلكترونية في جدة | تصميم وبرمجة مواقع احترافية | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تطوير مواقع إلكترونية في جدة | تصميم وبرمجة مواقع احترافية",
    description: "تطوير مواقع إلكترونية احترافية في جدة للشركات والفنادق والتجارة الإلكترونية. تصميم UI/UX عصري، تحسين SEO عربي وإنجليزي، ودعم شامل.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/website-development/jeddah",
    languages: {
      "en-SA": "https://www.x-360.ai/website-development/jeddah",
      "ar-SA": "https://www.x-360.ai/ar/website-development/jeddah",
      "x-default": "https://www.x-360.ai/website-development/jeddah",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — تطوير مواقع إلكترونية جدة",
  "description": "تطوير مواقع إلكترونية احترافية في جدة للشركات والفنادق والتجارة الإلكترونية. تصميم UI/UX عصري، تحسين SEO عربي وإنجليزي، ودعم شامل.",
  "url": "https://www.x-360.ai/ar/website-development/jeddah",
  "telephone": "+966502547274",
  "email": "info@x-360.ai",
  "address": {"@type":"PostalAddress","addressLocality":"جدة","addressCountry":"SA"},
  "serviceArea": {"@type":"City","name":"جدة"},
  "priceRange": "$$",
  "image": "https://www.x-360.ai/opengraph.jpg",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "تطوير مواقع إلكترونية جدة",
  "description": "تطوير مواقع إلكترونية احترافية في جدة للشركات والفنادق والتجارة الإلكترونية. تصميم UI/UX عصري، تحسين SEO عربي وإنجليزي، ودعم شامل.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"جدة","containedIn":"Saudi Arabia"},
  "serviceType": "تطوير مواقع إلكترونية",
  "url": "https://www.x-360.ai/ar/website-development/jeddah",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل تخدمون شركات الضيافة والفنادق في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. متخصصون في بناء مواقع الفنادق والمنتجعات والمطاعم في جدة مع أنظمة حجز متكاملة ومعارض صور وجولات افتراضية مدمجة."}},{"@type":"Question","name":"هل تدعمون التجارة الإلكترونية للسوق السعودي؟","acceptedAnswer":{"@type":"Answer","text":"نبني منصات تجارة إلكترونية مُحسَّنة للسوق السعودي مع بوابات دفع محلية (مدى، STC Pay، Apple Pay) وشحن محلي ودعم عربي كامل."}},{"@type":"Question","name":"كم تكلفة الموقع الإلكتروني لمطعم في جدة؟","acceptedAnswer":{"@type":"Answer","text":"مواقع المطاعم تبدأ من 5,000 ريال وترتفع حسب المتطلبات كنظام الحجز وقائمة الطعام الرقمية والتكامل مع منصات التوصيل."}},{"@type":"Question","name":"هل تقدمون استضافة وصيانة مستمرة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نوفر حزم استضافة سحابية موثوقة مع شهادات SSL وحماية وصيانة دورية وتحديثات شهرية لضمان استمرارية الأداء."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"تطوير المواقع الإلكترونية","item":"https://www.x-360.ai/ar/website-development"},
    {"@type":"ListItem","position":3,"name":"جدة","item":"https://www.x-360.ai/ar/website-development/jeddah"},
  ],
};

const pageData: ArCityData = {
  cityAr: "جدة",
  serviceAr: "تطوير المواقع الإلكترونية",
  heroTitleAr: "تطوير مواقع إلكترونية في جدة — ابنِ حضوراً رقمياً يليق بعروس البحر الأحمر",
  heroSubAr: "مواقع سريعة وآمنة ومُحسَّنة لمحركات البحث للشركات والفنادق والمطاعم والمتاجر في جدة — تُحوِّل الزائر إلى عميل.",
  introHeadingAr: "شريكك الرقمي لتطوير المواقع في جدة",
  introParasAr: ["جدة مدينة متعددة الأبعاد — تجارة وسياحة وضيافة وصناعة. كل قطاع يحتاج حضوراً رقمياً مختلفاً: فندق يحتاج نظام حجز فعّال، ومتجر يحتاج منصة تجارة إلكترونية، وشركة خدمات تحتاج موقعاً يُبرز خبرتها ويجذب العملاء.", "تفهم X360 خصوصية سوق جدة وتقدم حلول تطوير مواقع مُصمَّمة لتحقيق أهداف أعمالك المحددة — سواء كنت تستهدف السائح الأجنبي أو رجل الأعمال السعودي أو المستهلك المحلي."],
  facts: [
    {val:"+180", label:"موقع إلكتروني في جدة"},
    {val:"4-6", label:"أسابيع حتى الإطلاق"},
    {val:"100%", label:"دعم عربي وإنجليزي"},
    {val:"A+", label:"أداء ودرجة أمان"}
  ],
  servicesHeadingAr: "خدمات تطوير المواقع في جدة",
  services: [
    {icon:"monitor" as ArIconKey, title:"مواقع الشركات والمؤسسات", desc:"تصميم وتطوير مواقع إلكترونية احترافية للشركات والمؤسسات الكبرى بأداء عالٍ وهوية بصرية متميزة."},
    {icon:"code" as ArIconKey, title:"التجارة الإلكترونية والمتاجر الرقمية", desc:"بناء منصات تجارة إلكترونية متكاملة بتجربة مستخدم سلسة وبوابات دفع محلية وعربية."},
    {icon:"smartphone" as ArIconKey, title:"تطوير تطبيقات الجوال", desc:"تطبيقات iOS وAndroid بتصميم عصري وأداء متميز، مُحسَّنة لمستخدمي الجوال في السعودية."},
    {icon:"brain" as ArIconKey, title:"تحسين SEO العربي وتجربة المستخدم", desc:"تحسين محركات البحث للعربية والإنجليزية مع تجربة مستخدم مدروسة تحقق أعلى معدلات تحويل."}
  ],
  cityContextAr: "جدة مدينة السياحة والأعمال على البحر الأحمر، تستضيف مهرجانات واسعة وفعاليات ترفيهية وقطاعاً فندقياً متنامياً. الشركات والمؤسسات تحتاج مواقع تعكس الديناميكية المحلية وتصل للعملاء الخليجيين والدوليين في آن واحد.",
  industries: ["الضيافة والفنادق والمنتجعات", "المطاعم والترفيه", "التجارة الإلكترونية", "الخدمات المهنية", "السياحة والرحلات", "الرعاية الصحية", "التعليم", "البناء والعقارات"],
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
    {q:"هل تخدمون شركات الضيافة والفنادق في جدة؟", a:"نعم. متخصصون في بناء مواقع الفنادق والمنتجعات والمطاعم في جدة مع أنظمة حجز متكاملة ومعارض صور وجولات افتراضية مدمجة."},
    {q:"هل تدعمون التجارة الإلكترونية للسوق السعودي؟", a:"نبني منصات تجارة إلكترونية مُحسَّنة للسوق السعودي مع بوابات دفع محلية (مدى، STC Pay، Apple Pay) وشحن محلي ودعم عربي كامل."},
    {q:"كم تكلفة الموقع الإلكتروني لمطعم في جدة؟", a:"مواقع المطاعم تبدأ من 5,000 ريال وترتفع حسب المتطلبات كنظام الحجز وقائمة الطعام الرقمية والتكامل مع منصات التوصيل."},
    {q:"هل تقدمون استضافة وصيانة مستمرة؟", a:"نعم. نوفر حزم استضافة سحابية موثوقة مع شهادات SSL وحماية وصيانة دورية وتحديثات شهرية لضمان استمرارية الأداء."}
  ],
  relatedLinks: [
    {label:"تطوير مواقع الرياض", href:"/ar/website-development/riyadh"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"},
    {label:"حلول الذكاء الاصطناعي جدة", href:"/ar/ai-solutions/jeddah"},
    {label:"حلول ERP جدة", href:"/ar/erp-sap/jeddah"}
  ],
  canonicalEnUrl: "/website-development/jeddah",
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
