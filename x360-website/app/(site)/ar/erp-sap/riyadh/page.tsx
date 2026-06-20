import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "حلول ERP وSAP في الرياض | تحويل رقمي للشركات السعودية",
  description: "تطبيق وتهيئة حلول ERP وSAP للشركات في الرياض — امتثال هيئة الزكاة والضريبة، فاتورة إلكترونية، تحليل أعمال، وتكامل أنظمة متكامل.",
  keywords: "حلول ERP الرياض، حلول SAP الرياض، تطبيق SAP الرياض، نظام ERP الرياض، أتمتة أعمال الرياض، X360 ERP SAP",
  openGraph: {
    title: "حلول ERP وSAP في الرياض | تحويل رقمي للشركات السعودية",
    description: "تطبيق وتهيئة حلول ERP وSAP للشركات في الرياض — امتثال هيئة الزكاة والضريبة، فاتورة إلكترونية، تحليل أعمال، وتكامل أنظمة متكامل.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/erp-sap/riyadh",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "حلول ERP وSAP في الرياض | تحويل رقمي للشركات السعودية | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "حلول ERP وSAP في الرياض | تحويل رقمي للشركات السعودية",
    description: "تطبيق وتهيئة حلول ERP وSAP للشركات في الرياض — امتثال هيئة الزكاة والضريبة، فاتورة إلكترونية، تحليل أعمال، وتكامل أنظمة متكامل.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/erp-sap/riyadh",
    languages: {
      "en-SA": "https://www.x-360.ai/erp-sap/riyadh",
      "ar-SA": "https://www.x-360.ai/ar/erp-sap/riyadh",
      "x-default": "https://www.x-360.ai/erp-sap/riyadh",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — حلول ERP وSAP الرياض",
  "description": "تطبيق وتهيئة حلول ERP وSAP للشركات في الرياض — امتثال هيئة الزكاة والضريبة، فاتورة إلكترونية، تحليل أعمال، وتكامل أنظمة متكامل.",
  "url": "https://www.x-360.ai/ar/erp-sap/riyadh",
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
  "name": "حلول ERP وSAP الرياض",
  "description": "تطبيق وتهيئة حلول ERP وSAP للشركات في الرياض — امتثال هيئة الزكاة والضريبة، فاتورة إلكترونية، تحليل أعمال، وتكامل أنظمة متكامل.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"الرياض","containedIn":"Saudi Arabia"},
  "serviceType": "تطبيق ERP وSAP",
  "url": "https://www.x-360.ai/ar/erp-sap/riyadh",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل حلولكم متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نضمن التوافق الكامل مع اشتراطات هيئة الزكاة — بما يشمل الفاتورة الإلكترونية (فاتورة) وتقارير ضريبة القيمة المضافة والربط مع منصة هيئة الزكاة."}},{"@type":"Question","name":"ما الفرق بين SAP وERP المخصص؟ أيهما يناسب شركتي؟","acceptedAnswer":{"@type":"Answer","text":"SAP مناسب للشركات الكبرى التي تحتاج حلاً موحداً ومُثبَتاً عالمياً. ERP المخصص أفضل للشركات المتوسطة التي تحتاج مرونة وتخصيصاً بميزانية أقل. نُساعدك على الاختيار الصحيح."}},{"@type":"Question","name":"كم يستغرق تطبيق SAP في شركة متوسطة الحجم بالرياض؟","acceptedAnswer":{"@type":"Answer","text":"تطبيق SAP Business One يستغرق عادةً 3-6 أشهر. SAP S/4HANA للشركات الكبرى يستغرق 6-18 شهراً حسب التعقيد والبيانات التاريخية."}},{"@type":"Question","name":"هل تقدمون تدريباً للموظفين على النظام الجديد؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نُقدّم برامج تدريب شاملة باللغة العربية والإنجليزية، مع دليل مستخدم عربي ودعم فني متواصل بعد الإطلاق."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"حلول ERP وSAP","item":"https://www.x-360.ai/ar/erp-sap"},
    {"@type":"ListItem","position":3,"name":"الرياض","item":"https://www.x-360.ai/ar/erp-sap/riyadh"},
  ],
};

const pageData: ArCityData = {
  cityAr: "الرياض",
  serviceAr: "حلول ERP وSAP",
  heroTitleAr: "حلول ERP وSAP في الرياض — أدِر أعمالك بكفاءة استثنائية",
  heroSubAr: "تطبيق SAP مُتوافق مع هيئة الزكاة، وأنظمة ERP مخصصة، وتكامل شامل للأنظمة — لرفع كفاءة شركتك الرياضية وتسريع قراراتها.",
  introHeadingAr: "شريكك الاستراتيجي لحلول ERP وSAP في الرياض",
  introParasAr: ["الرياض موطن كبرى الشركات السعودية والمجموعات العائلية والشركات الحكومية التي تحتاج أنظمة ERP قوية لإدارة عملياتها المعقدة. مع تصاعد متطلبات التحول الرقمي ولوائح هيئة الزكاة والفاتورة الإلكترونية، أصبح نظام ERP موثوق ضرورة لا خياراً.", "تُقدم X360 خدمات تطبيق وتخصيص ودعم حلول ERP وSAP للشركات الرياضية في جميع القطاعات. خبرتنا تشمل SAP S/4HANA وSAP Business One وحلول ERP مفتوحة المصدر المُخصَّصة — كلها مُهيَّأة للسوق السعودي."],
  facts: [
    {val:"+80", label:"تطبيق ERP/SAP في الرياض"},
    {val:"100%", label:"امتثال هيئة الزكاة"},
    {val:"3-6", label:"أشهر حتى الإطلاق"},
    {val:"24/7", label:"دعم فني مستمر"}
  ],
  servicesHeadingAr: "خدمات ERP وSAP للشركات الرياضية",
  services: [
    {icon:"database" as ArIconKey, title:"تطبيق SAP الشامل", desc:"تطبيق وتهيئة حلول SAP S/4HANA وSAP Business One للشركات السعودية وفق متطلبات هيئة الزكاة والضريبة."},
    {icon:"settings" as ArIconKey, title:"نظام ERP مخصص", desc:"تطوير أنظمة ERP مخصصة تناسب تماماً عمليات وسير عمل شركتك في السوق السعودي."},
    {icon:"refresh" as ArIconKey, title:"تكامل الأنظمة والترحيل", desc:"ربط أنظمتك الحالية مع ERP الجديد وترحيل البيانات التاريخية بدقة عالية وصفر توقف للأعمال."},
    {icon:"barchart" as ArIconKey, title:"تحليل الأعمال وذكاء المعلومات", desc:"لوحات تحكم تحليلية في الوقت الفعلي تمنحك رؤية شاملة لأداء أعمالك ومرفوعاتك المالية."}
  ],
  cityContextAr: "الرياض قاعدة لكبرى الشركات السعودية التي تحتاج أنظمة ERP متطورة لإدارة سلاسل إمداد معقدة وعمليات مالية واسعة وقوى عاملة كبيرة. مع تطبيق الفاتورة الإلكترونية (فاتورة) إلزامياً، أصبح نظام ERP المتوافق مع هيئة الزكاة ضرورة قانونية لكل شركة.",
  industries: ["التصنيع والبتروكيماويات", "التجزئة وسلاسل الإمداد", "الرعاية الصحية", "العقارات والبناء", "الخدمات المالية", "الضيافة والفنادق", "الشركات الحكومية", "التعليم والجامعات"],
  processSteps: [
    {title:"التقييم الشامل للعمليات", desc:"ندرس عملياتك الحالية ونحدد الفجوات ونقاط الضعف ونضع خارطة طريق مفصّلة لتطبيق ERP."},
    {title:"التخصيص والتهيئة", desc:"نهيئ النظام وفق متطلباتك المحددة مع التكيف مع اللوائح التنظيمية السعودية ومتطلبات الفوترة الإلكترونية."},
    {title:"التدريب والتغيير التنظيمي", desc:"نُدرّب فريقك على استخدام النظام الجديد ونُدير عملية التغيير لضمان تبني سلس وسريع."},
    {title:"الدعم والصيانة المستمرة", desc:"دعم فني متواصل بالعربية والإنجليزية، وتحديثات دورية، ومراقبة أداء النظام على مدار الساعة."}
  ],
  whyPoints: [
    {icon:"award" as ArIconKey, title:"شريك معتمد وذو خبرة", desc:"خبرة واسعة في تطبيق ERP وSAP للشركات السعودية في قطاعات التصنيع والضيافة والرعاية الصحية والتجزئة."},
    {icon:"shield" as ArIconKey, title:"امتثال تام للوائح السعودية", desc:"نضمن التوافق الكامل مع متطلبات هيئة الزكاة والضريبة والجمارك، بما يشمل الفاتورة الإلكترونية وعمود ضريبة القيمة المضافة."},
    {icon:"clock" as ArIconKey, title:"تطبيق في الوقت المحدد", desc:"نلتزم بجداول التطبيق المتفق عليها ونُقدّم النظام في الموعد المحدد مع ضمان جودة المخرجات."}
  ],
  faqItems: [
    {q:"هل حلولكم متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك؟", a:"نعم. نضمن التوافق الكامل مع اشتراطات هيئة الزكاة — بما يشمل الفاتورة الإلكترونية (فاتورة) وتقارير ضريبة القيمة المضافة والربط مع منصة هيئة الزكاة."},
    {q:"ما الفرق بين SAP وERP المخصص؟ أيهما يناسب شركتي؟", a:"SAP مناسب للشركات الكبرى التي تحتاج حلاً موحداً ومُثبَتاً عالمياً. ERP المخصص أفضل للشركات المتوسطة التي تحتاج مرونة وتخصيصاً بميزانية أقل. نُساعدك على الاختيار الصحيح."},
    {q:"كم يستغرق تطبيق SAP في شركة متوسطة الحجم بالرياض؟", a:"تطبيق SAP Business One يستغرق عادةً 3-6 أشهر. SAP S/4HANA للشركات الكبرى يستغرق 6-18 شهراً حسب التعقيد والبيانات التاريخية."},
    {q:"هل تقدمون تدريباً للموظفين على النظام الجديد؟", a:"نعم. نُقدّم برامج تدريب شاملة باللغة العربية والإنجليزية، مع دليل مستخدم عربي ودعم فني متواصل بعد الإطلاق."}
  ],
  relatedLinks: [
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"تطوير مواقع الرياض", href:"/ar/website-development/riyadh"},
    {label:"حلول الذكاء الاصطناعي الرياض", href:"/ar/ai-solutions/riyadh"},
    {label:"حلول ERP جدة", href:"/ar/erp-sap/jeddah"}
  ],
  canonicalEnUrl: "/erp-sap/riyadh",
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
