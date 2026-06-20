import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "حلول الذكاء الاصطناعي في جدة | أتمتة وروبوتات محادثة ذكية",
  description: "حلول الذكاء الاصطناعي المتكاملة في جدة — روبوتات محادثة عربية، أتمتة العمليات التجارية، تحليل البيانات، وأنظمة AI مخصصة لشركات جدة.",
  keywords: "حلول الذكاء الاصطناعي جدة، روبوتات محادثة جدة، أتمتة أعمال جدة، الذكاء الاصطناعي للشركات جدة، X360 جدة",
  openGraph: {
    title: "حلول الذكاء الاصطناعي في جدة | أتمتة وروبوتات محادثة ذكية",
    description: "حلول الذكاء الاصطناعي المتكاملة في جدة — روبوتات محادثة عربية، أتمتة العمليات التجارية، تحليل البيانات، وأنظمة AI مخصصة لشركات جدة.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/ai-solutions/jeddah",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "حلول الذكاء الاصطناعي في جدة | أتمتة وروبوتات محادثة ذكية | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "حلول الذكاء الاصطناعي في جدة | أتمتة وروبوتات محادثة ذكية",
    description: "حلول الذكاء الاصطناعي المتكاملة في جدة — روبوتات محادثة عربية، أتمتة العمليات التجارية، تحليل البيانات، وأنظمة AI مخصصة لشركات جدة.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/ai-solutions/jeddah",
    languages: {
      "en-SA": "https://www.x-360.ai/ai-solutions/jeddah",
      "ar-SA": "https://www.x-360.ai/ar/ai-solutions/jeddah",
      "x-default": "https://www.x-360.ai/ai-solutions/jeddah",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — حلول الذكاء الاصطناعي جدة",
  "description": "حلول الذكاء الاصطناعي المتكاملة في جدة — روبوتات محادثة عربية، أتمتة العمليات التجارية، تحليل البيانات، وأنظمة AI مخصصة لشركات جدة.",
  "url": "https://www.x-360.ai/ar/ai-solutions/jeddah",
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
  "name": "حلول الذكاء الاصطناعي جدة",
  "description": "حلول الذكاء الاصطناعي المتكاملة في جدة — روبوتات محادثة عربية، أتمتة العمليات التجارية، تحليل البيانات، وأنظمة AI مخصصة لشركات جدة.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"جدة","containedIn":"Saudi Arabia"},
  "serviceType": "حلول الذكاء الاصطناعي",
  "url": "https://www.x-360.ai/ar/ai-solutions/jeddah",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"كيف يُحسّن الذكاء الاصطناعي تجربة ضيوف الفنادق في جدة؟","acceptedAnswer":{"@type":"Answer","text":"روبوتات المحادثة الذكية تُجيب على استفسارات الضيوف بالعربية والإنجليزية على مدار الساعة، مع التوصية بالخدمات ومعالجة الطلبات الخاصة دون انتظار."}},{"@type":"Question","name":"هل يمكن تطبيق الذكاء الاصطناعي في قطاع اللوجستيات بجدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نبني حلول تحسين مسارات الشحن والتنبؤ بالطلب وأتمتة المستودعات لشركات اللوجستيات العاملة في ميناء جدة الإسلامي وما حوله."}},{"@type":"Question","name":"ما الفرق بين روبوت المحادثة العادي وحلول X360 AI؟","acceptedAnswer":{"@type":"Answer","text":"حلولنا مُدرَّبة على البيانات السعودية واللهجة المحلية وتتكامل مع أنظمتك الحالية، بدلاً من نماذج جاهزة عامة لا تفهم خصوصية السوق."}},{"@type":"Question","name":"هل تقدمون حلول AI لقطاع الترفيه والتسلية في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نبني تجارب شخصية ذكية لقطاع الترفيه والفعاليات — من توصية المحتوى إلى التحكم بالحضور وتحليل سلوك الجمهور."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"حلول الذكاء الاصطناعي","item":"https://www.x-360.ai/ar/ai-solutions"},
    {"@type":"ListItem","position":3,"name":"جدة","item":"https://www.x-360.ai/ar/ai-solutions/jeddah"},
  ],
};

const pageData: ArCityData = {
  cityAr: "جدة",
  serviceAr: "حلول الذكاء الاصطناعي",
  heroTitleAr: "حلول الذكاء الاصطناعي في جدة — أتمتة أذكى لنمو أسرع",
  heroSubAr: "من الضيافة الفاخرة إلى اللوجستيات الميناوية — تُطوّر X360 حلول AI باللغة العربية لشركات جدة الطامحة للتحول الرقمي.",
  introHeadingAr: "الذكاء الاصطناعي المُصمَّم لسوق جدة",
  introParasAr: ["جدة مدينة تجارية مفتوحة على العالم — ميناؤها من أكبر موانئ المنطقة، وقطاعها السياحي يستقطب ملايين الزوار سنوياً، وتجارتها تمتد عبر القارات. هذا التنوع يخلق فرصاً استثنائية لتطبيقات الذكاء الاصطناعي في قطاعات متعددة.", "تُقدم X360 حلول AI مُخصَّصة للشركات الجدية — مع التركيز على فهم اللغة العربية والبيانات السعودية وسرعة التطبيق وقابلية القياس مع نمو أعمالك."],
  facts: [
    {val:"+80", label:"حل AI في جدة"},
    {val:"40%", label:"تخفيض متوسط في التكاليف"},
    {val:"24/7", label:"خدمة عملاء آلية"},
    {val:"100%", label:"دعم اللغة العربية"}
  ],
  servicesHeadingAr: "حلول الذكاء الاصطناعي لشركات جدة",
  services: [
    {icon:"brain" as ArIconKey, title:"روبوتات المحادثة الذكية بالعربية", desc:"بناء روبوتات محادثة تفهم اللهجات العربية وتتحدث بطلاقة مع عملاءك على مدار الساعة."},
    {icon:"zap" as ArIconKey, title:"أتمتة العمليات التجارية", desc:"أتمتة المهام المتكررة وتبسيط سير العمل باستخدام الذكاء الاصطناعي لرفع الكفاءة وخفض التكاليف."},
    {icon:"barchart" as ArIconKey, title:"تحليل البيانات والتقارير الذكية", desc:"لوحات تحكم تحليلية تحوّل بياناتك إلى رؤى قابلة للتنفيذ تدعم اتخاذ القرارات الاستراتيجية."},
    {icon:"cpu" as ArIconKey, title:"أنظمة ذكاء اصطناعي مخصصة", desc:"تطوير نماذج AI مخصصة لاحتياجات صناعتك تُدمج مع منظومتك التقنية الحالية بسلاسة."}
  ],
  cityContextAr: "جدة مركز للتجارة الدولية والسياحة الدينية والضيافة على البحر الأحمر. شركات الشحن واللوجستيات والفنادق والمطاعم والمتاجر تجد في الذكاء الاصطناعي أداةً قوية لتحسين الكفاءة وتخصيص تجربة العملاء في سوق تنافسي متنامٍ.",
  industries: ["الضيافة والفنادق", "اللوجستيات والشحن", "التجزئة والتجارة الإلكترونية", "الرعاية الصحية", "الترفيه والأحداث", "التعليم", "الخدمات المالية", "البناء والعقارات"],
  processSteps: [
    {title:"تقييم الاحتياجات والفرص", desc:"نحلل عملياتك الحالية ونحدد أكثر المجالات استفادةً من الذكاء الاصطناعي لتحقيق أعلى عائد استثمار."},
    {title:"تصميم الحل وتطوير النموذج", desc:"نطور نماذج AI مخصصة ونختبرها في بيئة محاكاة قبل التطبيق الفعلي لضمان الدقة والموثوقية."},
    {title:"التكامل والاختبار", desc:"ندمج الحل مع منظومتك التقنية ونُجري اختبارات مكثفة لضمان الأداء الأمثل في بيئة الإنتاج."},
    {title:"الإطلاق والتحسين المستمر", desc:"نُطلق الحل ونرصد أداءه ونحسّنه باستمرار مع تطور احتياجات أعمالك وتوافر بيانات جديدة."}
  ],
  whyPoints: [
    {icon:"brain" as ArIconKey, title:"خبرة في اللغة العربية", desc:"فريقنا متخصص في معالجة اللغة الطبيعية العربية بما يشمل الفصحى والعامية السعودية للحصول على أفضل النتائج."},
    {icon:"shield" as ArIconKey, title:"خصوصية وأمان البيانات", desc:"نلتزم باشتراطات حوكمة البيانات السعودية ونضمن خصوصية بياناتك وعملاءك بأعلى معايير الأمان."},
    {icon:"trending" as ArIconKey, title:"عائد استثمار مُثبَت", desc:"عملاؤنا يحققون في المتوسط انخفاضاً بنسبة 40% في التكاليف التشغيلية خلال الأشهر الستة الأولى."}
  ],
  faqItems: [
    {q:"كيف يُحسّن الذكاء الاصطناعي تجربة ضيوف الفنادق في جدة؟", a:"روبوتات المحادثة الذكية تُجيب على استفسارات الضيوف بالعربية والإنجليزية على مدار الساعة، مع التوصية بالخدمات ومعالجة الطلبات الخاصة دون انتظار."},
    {q:"هل يمكن تطبيق الذكاء الاصطناعي في قطاع اللوجستيات بجدة؟", a:"نعم. نبني حلول تحسين مسارات الشحن والتنبؤ بالطلب وأتمتة المستودعات لشركات اللوجستيات العاملة في ميناء جدة الإسلامي وما حوله."},
    {q:"ما الفرق بين روبوت المحادثة العادي وحلول X360 AI؟", a:"حلولنا مُدرَّبة على البيانات السعودية واللهجة المحلية وتتكامل مع أنظمتك الحالية، بدلاً من نماذج جاهزة عامة لا تفهم خصوصية السوق."},
    {q:"هل تقدمون حلول AI لقطاع الترفيه والتسلية في جدة؟", a:"نعم. نبني تجارب شخصية ذكية لقطاع الترفيه والفعاليات — من توصية المحتوى إلى التحكم بالحضور وتحليل سلوك الجمهور."}
  ],
  relatedLinks: [
    {label:"حلول الذكاء الاصطناعي الرياض", href:"/ar/ai-solutions/riyadh"},
    {label:"تطوير مواقع جدة", href:"/ar/website-development/jeddah"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"},
    {label:"حلول ERP جدة", href:"/ar/erp-sap/jeddah"}
  ],
  canonicalEnUrl: "/ai-solutions/jeddah",
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
