import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "حلول ERP وSAP في جدة | أنظمة إدارة أعمال متكاملة",
  description: "تطبيق وتهيئة حلول ERP وSAP للشركات في جدة — اللوجستيات، التجارة، الضيافة، والتصنيع. امتثال هيئة الزكاة وتكامل أنظمة شامل.",
  keywords: "حلول ERP جدة، حلول SAP جدة، تطبيق SAP جدة، نظام ERP جدة، أتمتة أعمال جدة، X360 ERP جدة",
  openGraph: {
    title: "حلول ERP وSAP في جدة | أنظمة إدارة أعمال متكاملة",
    description: "تطبيق وتهيئة حلول ERP وSAP للشركات في جدة — اللوجستيات، التجارة، الضيافة، والتصنيع. امتثال هيئة الزكاة وتكامل أنظمة شامل.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/erp-sap/jeddah",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "حلول ERP وSAP في جدة | أنظمة إدارة أعمال متكاملة | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "حلول ERP وSAP في جدة | أنظمة إدارة أعمال متكاملة",
    description: "تطبيق وتهيئة حلول ERP وSAP للشركات في جدة — اللوجستيات، التجارة، الضيافة، والتصنيع. امتثال هيئة الزكاة وتكامل أنظمة شامل.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/erp-sap/jeddah",
    languages: {
      "en-SA": "https://www.x-360.ai/erp-sap/jeddah",
      "ar-SA": "https://www.x-360.ai/ar/erp-sap/jeddah",
      "x-default": "https://www.x-360.ai/erp-sap/jeddah",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — حلول ERP وSAP جدة",
  "description": "تطبيق وتهيئة حلول ERP وSAP للشركات في جدة — اللوجستيات، التجارة، الضيافة، والتصنيع. امتثال هيئة الزكاة وتكامل أنظمة شامل.",
  "url": "https://www.x-360.ai/ar/erp-sap/jeddah",
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
  "name": "حلول ERP وSAP جدة",
  "description": "تطبيق وتهيئة حلول ERP وSAP للشركات في جدة — اللوجستيات، التجارة، الضيافة، والتصنيع. امتثال هيئة الزكاة وتكامل أنظمة شامل.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"جدة","containedIn":"Saudi Arabia"},
  "serviceType": "تطبيق ERP وSAP",
  "url": "https://www.x-360.ai/ar/erp-sap/jeddah",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل تقدمون ERP لشركات اللوجستيات في ميناء جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. لدينا خبرة متخصصة في ERP للشركات اللوجستية وشركات الشحن والتوزيع العاملة في ميناء جدة الإسلامي وما حوله."}},{"@type":"Question","name":"هل يمكن ربط ERP مع منصات التجارة الإلكترونية في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نتخصص في تكامل ERP مع منصات التجارة الإلكترونية السعودية (Salla, Zid, Shopify) وبوابات الدفع المحلية لتوحيد إدارة المخزون والمبيعات."}},{"@type":"Question","name":"كيف يُساعد ERP شركات الضيافة في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نظام ERP المخصص للضيافة يُوحّد إدارة الغرف والمخزون والموارد البشرية والمحاسبة في منصة واحدة، مما يرفع الكفاءة ويُحسّن تجربة الضيف."}},{"@type":"Question","name":"ما التكلفة التقريبية لتطبيق ERP لشركة متوسطة في جدة؟","acceptedAnswer":{"@type":"Answer","text":"يبدأ ERP للشركات المتوسطة من 50,000 ريال ويرتفع حسب عدد المستخدمين والوحدات والتخصيصات المطلوبة. نُقدّم عرض سعر مفصلاً بعد التقييم."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"حلول ERP وSAP","item":"https://www.x-360.ai/ar/erp-sap"},
    {"@type":"ListItem","position":3,"name":"جدة","item":"https://www.x-360.ai/ar/erp-sap/jeddah"},
  ],
};

const pageData: ArCityData = {
  cityAr: "جدة",
  serviceAr: "حلول ERP وSAP",
  heroTitleAr: "حلول ERP وSAP في جدة — أنظمة إدارة تواكب نمو أعمالك",
  heroSubAr: "من اللوجستيات الميناوية إلى التجارة الدولية والضيافة الفاخرة — X360 تُطبّق ERP وSAP المُخصَّص لخصوصية سوق جدة.",
  introHeadingAr: "شريكك في ERP وSAP بجدة",
  introParasAr: ["جدة مدينة تجارة وأعمال بامتياز — ميناؤها من أكبر موانئ الشرق الأوسط، وقطاعها التجاري يضم آلاف الشركات من الصغيرة إلى الكبرى. إدارة هذه الأعمال تستدعي أنظمة ERP قوية تتعامل مع تعقيد التجارة الدولية واشتراطات هيئة الزكاة السعودية.", "تُقدم X360 حلول ERP وSAP مُصمَّمة لقطاعات جدة المتنوعة — اللوجستيات والشحن، والتجارة والتوزيع، والضيافة والفنادق، والتجزئة والتجارة الإلكترونية. نضمن التوافق الكامل مع اللوائح السعودية منذ اليوم الأول."],
  facts: [
    {val:"+60", label:"تطبيق ERP/SAP في جدة"},
    {val:"100%", label:"امتثال هيئة الزكاة"},
    {val:"3-6", label:"أشهر حتى الإطلاق"},
    {val:"24/7", label:"دعم فني مستمر"}
  ],
  servicesHeadingAr: "خدمات ERP وSAP لشركات جدة",
  services: [
    {icon:"database" as ArIconKey, title:"تطبيق SAP الشامل", desc:"تطبيق وتهيئة حلول SAP S/4HANA وSAP Business One للشركات السعودية وفق متطلبات هيئة الزكاة والضريبة."},
    {icon:"settings" as ArIconKey, title:"نظام ERP مخصص", desc:"تطوير أنظمة ERP مخصصة تناسب تماماً عمليات وسير عمل شركتك في السوق السعودي."},
    {icon:"refresh" as ArIconKey, title:"تكامل الأنظمة والترحيل", desc:"ربط أنظمتك الحالية مع ERP الجديد وترحيل البيانات التاريخية بدقة عالية وصفر توقف للأعمال."},
    {icon:"barchart" as ArIconKey, title:"تحليل الأعمال وذكاء المعلومات", desc:"لوحات تحكم تحليلية في الوقت الفعلي تمنحك رؤية شاملة لأداء أعمالك ومرفوعاتك المالية."}
  ],
  cityContextAr: "جدة مركز تجاري دولي يستقطب شركات عالمية تحتاج أنظمة ERP متوافقة مع المعايير العالمية والمحلية في آن. قطاع اللوجستيات المرتبط بميناء جدة والقطاع الفندقي المتنامي مجالان يشهدان طلباً متصاعداً على حلول ERP متطورة.",
  industries: ["اللوجستيات والشحن", "التجارة والتوزيع", "الضيافة والفنادق", "التجزئة والتجارة الإلكترونية", "البناء والمقاولات", "التصنيع والصناعة", "الخدمات المهنية", "الرعاية الصحية"],
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
    {q:"هل تقدمون ERP لشركات اللوجستيات في ميناء جدة؟", a:"نعم. لدينا خبرة متخصصة في ERP للشركات اللوجستية وشركات الشحن والتوزيع العاملة في ميناء جدة الإسلامي وما حوله."},
    {q:"هل يمكن ربط ERP مع منصات التجارة الإلكترونية في جدة؟", a:"نعم. نتخصص في تكامل ERP مع منصات التجارة الإلكترونية السعودية (Salla, Zid, Shopify) وبوابات الدفع المحلية لتوحيد إدارة المخزون والمبيعات."},
    {q:"كيف يُساعد ERP شركات الضيافة في جدة؟", a:"نظام ERP المخصص للضيافة يُوحّد إدارة الغرف والمخزون والموارد البشرية والمحاسبة في منصة واحدة، مما يرفع الكفاءة ويُحسّن تجربة الضيف."},
    {q:"ما التكلفة التقريبية لتطبيق ERP لشركة متوسطة في جدة؟", a:"يبدأ ERP للشركات المتوسطة من 50,000 ريال ويرتفع حسب عدد المستخدمين والوحدات والتخصيصات المطلوبة. نُقدّم عرض سعر مفصلاً بعد التقييم."}
  ],
  relatedLinks: [
    {label:"حلول ERP الرياض", href:"/ar/erp-sap/riyadh"},
    {label:"تطوير مواقع جدة", href:"/ar/website-development/jeddah"},
    {label:"حلول الذكاء الاصطناعي جدة", href:"/ar/ai-solutions/jeddah"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"}
  ],
  canonicalEnUrl: "/erp-sap/jeddah",
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
