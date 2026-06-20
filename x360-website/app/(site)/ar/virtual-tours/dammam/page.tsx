import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "جولات افتراضية 360 درجة في الدمام | الصناعة والعقارات والضيافة",
  description: "جولات افتراضية احترافية 360 درجة في الدمام والمنطقة الشرقية. خدمة قطاعات النفط والغاز والتصنيع والعقارات والفنادق بتصوير 8K HDR.",
  keywords: "جولات افتراضية الدمام، جولة افتراضية 360 درجة الدمام، جولات افتراضية المنطقة الشرقية، X360 الدمام، جولات افتراضية الخبر",
  openGraph: {
    title: "جولات افتراضية 360 درجة في الدمام | الصناعة والعقارات والضيافة",
    description: "جولات افتراضية احترافية 360 درجة في الدمام والمنطقة الشرقية. خدمة قطاعات النفط والغاز والتصنيع والعقارات والفنادق بتصوير 8K HDR.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/virtual-tours/dammam",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "جولات افتراضية 360 درجة في الدمام | الصناعة والعقارات والضيافة | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات افتراضية 360 درجة في الدمام | الصناعة والعقارات والضيافة",
    description: "جولات افتراضية احترافية 360 درجة في الدمام والمنطقة الشرقية. خدمة قطاعات النفط والغاز والتصنيع والعقارات والفنادق بتصوير 8K HDR.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/virtual-tours/dammam",
    languages: {
      "en-SA": "https://www.x-360.ai/virtual-tours/dammam",
      "ar-SA": "https://www.x-360.ai/ar/virtual-tours/dammam",
      "x-default": "https://www.x-360.ai/virtual-tours/dammam",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — جولات افتراضية 360° الدمام",
  "description": "جولات افتراضية احترافية 360 درجة في الدمام والمنطقة الشرقية. خدمة قطاعات النفط والغاز والتصنيع والعقارات والفنادق بتصوير 8K HDR.",
  "url": "https://www.x-360.ai/ar/virtual-tours/dammam",
  "telephone": "+966502547274",
  "email": "info@x-360.ai",
  "address": {"@type":"PostalAddress","addressLocality":"الدمام","addressCountry":"SA"},
  "serviceArea": {"@type":"City","name":"الدمام"},
  "priceRange": "$$",
  "image": "https://www.x-360.ai/opengraph.jpg",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "جولات افتراضية 360° الدمام",
  "description": "جولات افتراضية احترافية 360 درجة في الدمام والمنطقة الشرقية. خدمة قطاعات النفط والغاز والتصنيع والعقارات والفنادق بتصوير 8K HDR.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"الدمام","containedIn":"Saudi Arabia"},
  "serviceType": "تصوير جولات افتراضية",
  "url": "https://www.x-360.ai/ar/virtual-tours/dammam",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل تخدمون العملاء في الخبر والقطيف أيضاً؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نغطي المنطقة الشرقية بالكامل — الدمام والخبر والقطيف والجبيل والظهران وجميع المناطق الصناعية — دون رسوم تنقل إضافية."}},{"@type":"Question","name":"هل لديكم خبرة في تصوير المنشآت الصناعية؟","acceptedAnswer":{"@type":"Answer","text":"نعم. لدينا خبرة واسعة في تصوير المنشآت الصناعية والمستودعات والمصانع وفق اشتراطات الأمان المحلية، مع تنسيق مسبق للحصول على التصاريح اللازمة."}},{"@type":"Question","name":"كم تكلفة جولة افتراضية لمجمع تجاري في الدمام؟","acceptedAnswer":{"@type":"Answer","text":"يبدأ السعر من 1,800 ريال للمجمعات التجارية متوسطة الحجم. تواصل معنا لمعرفة التكلفة الدقيقة حسب مساحة موقعك."}},{"@type":"Question","name":"هل تقدمون خدمات التوأم الرقمي للمنشآت الصناعية؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نتخصص في توأمات رقمية دقيقة للمنشآت الصناعية تُستخدم في الصيانة التنبؤية والتدريب الافتراضي وجولات الاستثمار عن بُعد."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"الجولات الافتراضية 360°","item":"https://www.x-360.ai/ar/virtual-tours"},
    {"@type":"ListItem","position":3,"name":"الدمام","item":"https://www.x-360.ai/ar/virtual-tours/dammam"},
  ],
};

const pageData: ArCityData = {
  cityAr: "الدمام",
  serviceAr: "الجولات الافتراضية 360°",
  heroTitleAr: "جولات افتراضية 360° في الدمام — التقط عظمة المنطقة الشرقية",
  heroSubAr: "من المنشآت الصناعية في الجبيل إلى مجمعات الخبر التجارية — تصوير 8K HDR يُبرز قيمة عقاراتك ومنشآتك للمستثمرين والعملاء حول العالم.",
  introHeadingAr: "شريكك الأول للجولات الافتراضية في المنطقة الشرقية",
  introParasAr: ["الدمام والمنطقة الشرقية المحرك الاقتصادي للمملكة العربية السعودية، تستضيف عمالقة قطاع النفط والغاز والتصنيع وسلاسل الإمداد الدولية. تنمو العقارات التجارية والسكنية والسياحية بسرعة، مدعومةً بمشاريع الترفيه والبنية التحتية.", "تقدم X360 جولات افتراضية مُصمَّمة لخصوصية المنطقة الشرقية — سواء كانت منشأة صناعية تحتاج توأماً رقمياً، أو فندقاً جديداً على الواجهة البحرية، أو مجمعاً تجارياً يسعى لجذب المستأجرين من قطاعات الشركات الكبرى."],
  facts: [
    {val:"+200", label:"جولة افتراضية في المنطقة الشرقية"},
    {val:"48h", label:"ضمان التسليم"},
    {val:"8K HDR", label:"دقة بانورامية"},
    {val:"100%", label:"تغطية المنطقة الشرقية"}
  ],
  servicesHeadingAr: "خدمات جولات افتراضية للمنطقة الشرقية",
  services: [
    {icon:"camera" as ArIconKey, title:"تصوير بانورامي 8K HDR", desc:"تصوير بانورامي كروي بجودة سينمائية 8K HDR يلتقط كل تفصيلة معمارية بدقة ألوان مثالية وإضاءة احترافية."},
    {icon:"globe" as ArIconKey, title:"تكامل Google Street View", desc:"نشر البانورامات مباشرةً على Google Maps لتعزيز ظهورك الرقمي وزيادة ثقة العملاء بموقعك."},
    {icon:"eye" as ArIconKey, title:"التجهيز الافتراضي والتصميم الرقمي", desc:"تأثيث المساحات الفارغة رقمياً لإبراز إمكاناتها الكاملة — مثالي للمشاريع على الخارطة وما قبل الافتتاح."},
    {icon:"layers" as ArIconKey, title:"التوأم الرقمي ومخططات ثلاثية الأبعاد", desc:"توأمات رقمية دقيقة القياسات مع مخططات 3D وقياسات مدمجة — أساسية لإدارة المنشآت وتقييم المستثمرين."}
  ],
  cityContextAr: "الدمام مدينة عقود ضخمة ومشاريع بنية تحتية وتوسع عمراني. شركات النفط والغاز العالمية والشركات السعودية الكبرى تحتاج جولات افتراضية لمرافقها لأغراض الاستثمار والتدريب والتوثيق، فيما يبحث مطورو العقارات عن طرق مبتكرة للتسويق لقطاعات الأعمال المتنامية.",
  industries: ["النفط والغاز والصناعة", "العقارات التجارية", "الضيافة والفنادق", "البنية التحتية والموانئ", "التجزئة والمجمعات التجارية", "التعليم والجامعات", "الرعاية الصحية", "التصنيع والمستودعات"],
  processSteps: [
    {title:"استشارة وجلسة التخطيط", desc:"نناقش أهداف عقارك والجمهور المستهدف ونقاط الرؤية المطلوبة، ونُجري تقييماً ميدانياً مسبقاً للعقارات الكبيرة."},
    {title:"يوم التصوير الاحترافي", desc:"يصل مصوّرونا المعتمدون بمعدات 8K HDR. معظم العقارات تُنجز في زيارة واحدة بأدنى تأثير على العمليات."},
    {title:"المعالجة والتجميع الدقيق", desc:"تُجمَّع البانورامات وتُعالَج وتُدرَّج ألوانها وتُنشر على منصتنا التفاعلية مع المخططات ونقاط الاهتمام خلال 48 ساعة."},
    {title:"التسليم والتضمين والإطلاق", desc:"تحصل على رابط مشاركة وكود تضمين ورفع على Google Street View — جاهز لموقعك وبوابات العقارات ومواد المستثمرين."}
  ],
  whyPoints: [
    {icon:"award" as ArIconKey, title:"خبرة راسخة في السوق السعودي", desc:"500+ عقار موثَّق — فريقنا السعودي يفهم الجماليات المحلية ولوائح التصوير البلدي وتوقعات السوق."},
    {icon:"clock" as ArIconKey, title:"تسليم خلال 48 ساعة", desc:"تسليم معياري خلال 48 ساعة من جلسة التصوير. خدمة الاستعجال خلال 24 ساعة متاحة للإطلاقات العاجلة."},
    {icon:"users" as ArIconKey, title:"دعم كامل ثنائي اللغة عربي/إنجليزي", desc:"مدراء مشاريع بالعربية والإنجليزية، وواجهة مشاهدة ثنائية اللغة، وبيانات وصفية عربية لمنصات العقارات السعودية."}
  ],
  faqItems: [
    {q:"هل تخدمون العملاء في الخبر والقطيف أيضاً؟", a:"نعم. نغطي المنطقة الشرقية بالكامل — الدمام والخبر والقطيف والجبيل والظهران وجميع المناطق الصناعية — دون رسوم تنقل إضافية."},
    {q:"هل لديكم خبرة في تصوير المنشآت الصناعية؟", a:"نعم. لدينا خبرة واسعة في تصوير المنشآت الصناعية والمستودعات والمصانع وفق اشتراطات الأمان المحلية، مع تنسيق مسبق للحصول على التصاريح اللازمة."},
    {q:"كم تكلفة جولة افتراضية لمجمع تجاري في الدمام؟", a:"يبدأ السعر من 1,800 ريال للمجمعات التجارية متوسطة الحجم. تواصل معنا لمعرفة التكلفة الدقيقة حسب مساحة موقعك."},
    {q:"هل تقدمون خدمات التوأم الرقمي للمنشآت الصناعية؟", a:"نعم. نتخصص في توأمات رقمية دقيقة للمنشآت الصناعية تُستخدم في الصيانة التنبؤية والتدريب الافتراضي وجولات الاستثمار عن بُعد."}
  ],
  relatedLinks: [
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"},
    {label:"حلول ERP وSAP الدمام", href:"/ar/erp-sap/jeddah"},
    {label:"حلول الذكاء الاصطناعي", href:"/ar/ai-solutions/riyadh"}
  ],
  canonicalEnUrl: "/virtual-tours/dammam",
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
