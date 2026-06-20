import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "حلول الذكاء الاصطناعي في الرياض | روبوتات محادثة وأتمتة أعمال",
  description: "حلول الذكاء الاصطناعي المتكاملة في الرياض — روبوتات محادثة ذكية بالعربية، أتمتة العمليات، تحليل البيانات، وأنظمة AI مخصصة للشركات السعودية.",
  keywords: "حلول الذكاء الاصطناعي الرياض، روبوتات محادثة ذكية الرياض، أتمتة أعمال الرياض، الذكاء الاصطناعي للشركات السعودية، X360 الذكاء الاصطناعي",
  openGraph: {
    title: "حلول الذكاء الاصطناعي في الرياض | روبوتات محادثة وأتمتة أعمال",
    description: "حلول الذكاء الاصطناعي المتكاملة في الرياض — روبوتات محادثة ذكية بالعربية، أتمتة العمليات، تحليل البيانات، وأنظمة AI مخصصة للشركات السعودية.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/ai-solutions/riyadh",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "حلول الذكاء الاصطناعي في الرياض | روبوتات محادثة وأتمتة أعمال | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "حلول الذكاء الاصطناعي في الرياض | روبوتات محادثة وأتمتة أعمال",
    description: "حلول الذكاء الاصطناعي المتكاملة في الرياض — روبوتات محادثة ذكية بالعربية، أتمتة العمليات، تحليل البيانات، وأنظمة AI مخصصة للشركات السعودية.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/ai-solutions/riyadh",
    languages: {
      "en-SA": "https://www.x-360.ai/ai-solutions/riyadh",
      "ar-SA": "https://www.x-360.ai/ar/ai-solutions/riyadh",
      "x-default": "https://www.x-360.ai/ai-solutions/riyadh",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — حلول الذكاء الاصطناعي الرياض",
  "description": "حلول الذكاء الاصطناعي المتكاملة في الرياض — روبوتات محادثة ذكية بالعربية، أتمتة العمليات، تحليل البيانات، وأنظمة AI مخصصة للشركات السعودية.",
  "url": "https://www.x-360.ai/ar/ai-solutions/riyadh",
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
  "name": "حلول الذكاء الاصطناعي الرياض",
  "description": "حلول الذكاء الاصطناعي المتكاملة في الرياض — روبوتات محادثة ذكية بالعربية، أتمتة العمليات، تحليل البيانات، وأنظمة AI مخصصة للشركات السعودية.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"الرياض","containedIn":"Saudi Arabia"},
  "serviceType": "حلول الذكاء الاصطناعي",
  "url": "https://www.x-360.ai/ar/ai-solutions/riyadh",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"كيف يمكن للذكاء الاصطناعي أن يساعد شركتي في الرياض؟","acceptedAnswer":{"@type":"Answer","text":"يمكن للذكاء الاصطناعي أتمتة خدمة العملاء، وتحليل البيانات التجارية، وتحسين سلاسل الإمداد، وتخصيص تجربة العميل — مما يُخفّض التكاليف ويرفع الكفاءة بشكل ملموس."}},{"@type":"Question","name":"هل روبوتاتكم تفهم اللهجة السعودية؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نُدرّب نماذجنا على اللهجة السعودية والفصحى الحديثة لفهم استفسارات عملاءك بدقة عالية والرد عليها بشكل طبيعي وملائم."}},{"@type":"Question","name":"كم يستغرق تطبيق حل الذكاء الاصطناعي؟","acceptedAnswer":{"@type":"Answer","text":"روبوت المحادثة الأساسي يُطلق خلال 3-4 أسابيع. الحلول الأكثر تعقيداً كنماذج تحليل البيانات المخصصة تستغرق 8-16 أسبوعاً حسب النطاق."}},{"@type":"Question","name":"هل تتكامل حلولكم مع أنظمة SAP أو ERP الموجودة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نتخصص في تكامل حلول الذكاء الاصطناعي مع أنظمة ERP وSAP وCRM الموجودة دون الحاجة لاستبدال منظومتك التقنية الحالية."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"حلول الذكاء الاصطناعي","item":"https://www.x-360.ai/ar/ai-solutions"},
    {"@type":"ListItem","position":3,"name":"الرياض","item":"https://www.x-360.ai/ar/ai-solutions/riyadh"},
  ],
};

const pageData: ArCityData = {
  cityAr: "الرياض",
  serviceAr: "حلول الذكاء الاصطناعي",
  heroTitleAr: "حلول الذكاء الاصطناعي في الرياض — تحوّل أعمالك بقوة التقنية",
  heroSubAr: "روبوتات محادثة ذكية بالعربية، أتمتة عمليات محكمة، وتحليل بيانات عميق — حلول AI مُصمَّمة خصيصاً للشركات السعودية الطامحة للتميز في سوق رقمي متسارع.",
  introHeadingAr: "شريكك في الذكاء الاصطناعي بالرياض",
  introParasAr: ["رؤية 2030 تضع الذكاء الاصطناعي في قلب مسيرة التحول الاقتصادي للمملكة. الشركات الرياضية الرائدة — من شركات التكنولوجيا إلى البنوك والمستشفيات والمجموعات العقارية — تتسابق لتبني حلول AI تُميّزها وترفع كفاءتها التشغيلية.", "تُقدم X360 حلول ذكاء اصطناعي مُصمَّمة للسياق السعودي — تفهم العربية بلهجاتها، وتتوافق مع اللوائح التنظيمية المحلية، وتتكامل مع البنية التقنية الحالية بسلاسة. من روبوتات المحادثة الذكية إلى أنظمة التوصية والتحليل التنبؤي."],
  facts: [
    {val:"+100", label:"حل AI مُطبَّق في الرياض"},
    {val:"40%", label:"تخفيض متوسط في التكاليف"},
    {val:"24/7", label:"خدمة عملاء آلية"},
    {val:"100%", label:"دعم العربية والإنجليزية"}
  ],
  servicesHeadingAr: "حلول الذكاء الاصطناعي للشركات الرياضية",
  services: [
    {icon:"brain" as ArIconKey, title:"روبوتات المحادثة الذكية بالعربية", desc:"بناء روبوتات محادثة تفهم اللهجات العربية وتتحدث بطلاقة مع عملاءك على مدار الساعة."},
    {icon:"zap" as ArIconKey, title:"أتمتة العمليات التجارية", desc:"أتمتة المهام المتكررة وتبسيط سير العمل باستخدام الذكاء الاصطناعي لرفع الكفاءة وخفض التكاليف."},
    {icon:"barchart" as ArIconKey, title:"تحليل البيانات والتقارير الذكية", desc:"لوحات تحكم تحليلية تحوّل بياناتك إلى رؤى قابلة للتنفيذ تدعم اتخاذ القرارات الاستراتيجية."},
    {icon:"cpu" as ArIconKey, title:"أنظمة ذكاء اصطناعي مخصصة", desc:"تطوير نماذج AI مخصصة لاحتياجات صناعتك تُدمج مع منظومتك التقنية الحالية بسلاسة."}
  ],
  cityContextAr: "الرياض موطن كبرى الشركات السعودية والمبادرات الحكومية لتطوير الذكاء الاصطناعي. مبادرات رؤية 2030 كبرنامج تطوير الكفاءات وصندوق الاستثمارات العامة تستثمر بكثافة في الذكاء الاصطناعي، مما يخلق بيئة مواتية للشركات التي تتبنى هذه التقنيات مبكراً.",
  industries: ["الخدمات المالية والبنوك", "الرعاية الصحية والمستشفيات", "العقارات والتطوير", "التجزئة وتجربة العميل", "الحكومة والخدمات العامة", "الضيافة والسياحة", "التعليم والتدريب", "اللوجستيات وسلاسل الإمداد"],
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
    {q:"كيف يمكن للذكاء الاصطناعي أن يساعد شركتي في الرياض؟", a:"يمكن للذكاء الاصطناعي أتمتة خدمة العملاء، وتحليل البيانات التجارية، وتحسين سلاسل الإمداد، وتخصيص تجربة العميل — مما يُخفّض التكاليف ويرفع الكفاءة بشكل ملموس."},
    {q:"هل روبوتاتكم تفهم اللهجة السعودية؟", a:"نعم. نُدرّب نماذجنا على اللهجة السعودية والفصحى الحديثة لفهم استفسارات عملاءك بدقة عالية والرد عليها بشكل طبيعي وملائم."},
    {q:"كم يستغرق تطبيق حل الذكاء الاصطناعي؟", a:"روبوت المحادثة الأساسي يُطلق خلال 3-4 أسابيع. الحلول الأكثر تعقيداً كنماذج تحليل البيانات المخصصة تستغرق 8-16 أسبوعاً حسب النطاق."},
    {q:"هل تتكامل حلولكم مع أنظمة SAP أو ERP الموجودة؟", a:"نعم. نتخصص في تكامل حلول الذكاء الاصطناعي مع أنظمة ERP وSAP وCRM الموجودة دون الحاجة لاستبدال منظومتك التقنية الحالية."}
  ],
  relatedLinks: [
    {label:"تطوير مواقع الرياض", href:"/ar/website-development/riyadh"},
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"حلول ERP وSAP الرياض", href:"/ar/erp-sap/riyadh"},
    {label:"حلول الذكاء الاصطناعي جدة", href:"/ar/ai-solutions/jeddah"}
  ],
  canonicalEnUrl: "/ai-solutions/riyadh",
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
