import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "جولات افتراضية 360 درجة في جدة | فنادق وعقارات والبلد الاريخي",
  description: "جولات افتراضية احترافية 360 درجة في جدة لقطاع الضيافة والعقارات ومراكز التسوق والبلد التاريخي. تصوير 8K HDR مع دعم عربي وإنجليزي كامل.",
  keywords: "جولات افتراضية جدة، جولة افتراضية 360 درجة جدة، جولات افتراضية فنادق جدة، جولات افتراضية عقارات جدة، X360 جدة",
  openGraph: {
    title: "جولات افتراضية 360 درجة في جدة | فنادق وعقارات والبلد الاريخي",
    description: "جولات افتراضية احترافية 360 درجة في جدة لقطاع الضيافة والعقارات ومراكز التسوق والبلد التاريخي. تصوير 8K HDR مع دعم عربي وإنجليزي كامل.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/virtual-tours/jeddah",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "جولات افتراضية 360 درجة في جدة | فنادق وعقارات والبلد الاريخي | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات افتراضية 360 درجة في جدة | فنادق وعقارات والبلد الاريخي",
    description: "جولات افتراضية احترافية 360 درجة في جدة لقطاع الضيافة والعقارات ومراكز التسوق والبلد التاريخي. تصوير 8K HDR مع دعم عربي وإنجليزي كامل.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/virtual-tours/jeddah",
    languages: {
      "en-SA": "https://www.x-360.ai/virtual-tours/jeddah",
      "ar-SA": "https://www.x-360.ai/ar/virtual-tours/jeddah",
      "x-default": "https://www.x-360.ai/virtual-tours/jeddah",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — جولات افتراضية 360° جدة",
  "description": "جولات افتراضية احترافية 360 درجة في جدة لقطاع الضيافة والعقارات ومراكز التسوق والبلد التاريخي. تصوير 8K HDR مع دعم عربي وإنجليزي كامل.",
  "url": "https://www.x-360.ai/ar/virtual-tours/jeddah",
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
  "name": "جولات افتراضية 360° جدة",
  "description": "جولات افتراضية احترافية 360 درجة في جدة لقطاع الضيافة والعقارات ومراكز التسوق والبلد التاريخي. تصوير 8K HDR مع دعم عربي وإنجليزي كامل.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"جدة","containedIn":"Saudi Arabia"},
  "serviceType": "تصوير جولات افتراضية",
  "url": "https://www.x-360.ai/ar/virtual-tours/jeddah",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل تغطون البلد التاريخي في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نتخصص في تصوير البلد التاريخي بجدة بحساسية عالية تحترم الطابع التراثي الفريد، مع دقة 8K تُظهر تفاصيل الرواشين والمباني الأثرية."}},{"@type":"Question","name":"ما تكلفة الجولة الافتراضية للفندق في جدة؟","acceptedAnswer":{"@type":"Answer","text":"تبدأ الأسعار من 2,000 ريال للفنادق الصغيرة وترتفع حسب عدد الغرف والمرافق. نقدم حزماً خاصة لفنادق كورنيش جدة وسواحل البحر الأحمر."}},{"@type":"Question","name":"هل تقدمون جولات افتراضية للمشاريع البحرية في جدة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. لدينا خبرة واسعة في تصوير مشاريع كورنيش جدة والمنتجعات البحرية وأحياء الواجهة المائية بتقنيات خاصة للبيئات الساحلية."}},{"@type":"Question","name":"كم المدة اللازمة لتصوير منتجع على كورنيش جدة؟","acceptedAnswer":{"@type":"Answer","text":"المنتجع الشامل يستغرق عادةً يوماً إلى يومين حسب عدد المرافق. نوصي بجلستين: الأولى مع الغروب للإضاءة الذهبية والثانية للداخل."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"الجولات الافتراضية 360°","item":"https://www.x-360.ai/ar/virtual-tours"},
    {"@type":"ListItem","position":3,"name":"جدة","item":"https://www.x-360.ai/ar/virtual-tours/jeddah"},
  ],
};

const pageData: ArCityData = {
  cityAr: "جدة",
  serviceAr: "الجولات الافتراضية 360°",
  heroTitleAr: "جولات افتراضية 360° في جدة — التقط سحر عروس البحر الأحمر",
  heroSubAr: "من رواشين البلد التاريخي إلى فنادق كورنيش جدة الخمس نجوم — تصوير 8K يُبرز كل تفصيلة بمهارة سينمائية لعملاء محليين وعالميين.",
  introHeadingAr: "شريكك الأول للجولات الافتراضية في جدة",
  introParasAr: ["جدة بوابة المملكة ومنارة السياحة والضيافة على البحر الأحمر. البلد التاريخي المدرج على قائمة التراث العالمي لليونسكو وكورنيش جدة بامتداده الساحلي الأخاذ ومشاريع الفنادق الخمس نجوم الجديدة تجعل المدينة وجهة استثمارية بالغة الأهمية.", "تلتقط X360 روح جدة بتصوير 8K HDR يُبرز دفء الرواشين الخشبية والبياض الساحلي لمنتجعات الكورنيش والمساحات الداخلية الفاخرة للمرافق السياحية الجديدة. جولاتنا ثنائية اللغة تصل للمستثمرين والضيوف من العالمين العربي والغربي."],
  facts: [
    {val:"+300", label:"جولة افتراضية في جدة"},
    {val:"48h", label:"ضمان التسليم"},
    {val:"8K HDR", label:"دقة بانورامية"},
    {val:"100%", label:"تغطية ساحلية وتراثية"}
  ],
  servicesHeadingAr: "خدمات جولات افتراضية مُصمَّمة لجدة",
  services: [
    {icon:"camera" as ArIconKey, title:"تصوير بانورامي 8K HDR", desc:"تصوير بانورامي كروي بجودة سينمائية 8K HDR يلتقط كل تفصيلة معمارية بدقة ألوان مثالية وإضاءة احترافية."},
    {icon:"globe" as ArIconKey, title:"تكامل Google Street View", desc:"نشر البانورامات مباشرةً على Google Maps لتعزيز ظهورك الرقمي وزيادة ثقة العملاء بموقعك."},
    {icon:"eye" as ArIconKey, title:"التجهيز الافتراضي والتصميم الرقمي", desc:"تأثيث المساحات الفارغة رقمياً لإبراز إمكاناتها الكاملة — مثالي للمشاريع على الخارطة وما قبل الافتتاح."},
    {icon:"layers" as ArIconKey, title:"التوأم الرقمي ومخططات ثلاثية الأبعاد", desc:"توأمات رقمية دقيقة القياسات مع مخططات 3D وقياسات مدمجة — أساسية لإدارة المنشآت وتقييم المستثمرين."}
  ],
  cityContextAr: "جدة وجهة سياحية وتجارية من الطراز الأول، مع مشاريع طموحة كجدة الجديدة ومرسى البحر الأحمر ومنتجعات الواجهة البحرية. الفنادق الفاخرة ومطوري العقارات يحتاجون جولات افتراضية تُقنع المسافر الدولي والمستثمر الخليجي بالحجز والشراء قبل الوصول.",
  industries: ["الضيافة الفاخرة والمنتجعات", "العقارات السياحية", "البلد التاريخي والسياحة التراثية", "مراكز التسوق والتجزئة", "المطاعم والترفيه", "الرعاية الصحية", "المؤسسات التعليمية", "البناء والتطوير"],
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
    {q:"هل تغطون البلد التاريخي في جدة؟", a:"نعم. نتخصص في تصوير البلد التاريخي بجدة بحساسية عالية تحترم الطابع التراثي الفريد، مع دقة 8K تُظهر تفاصيل الرواشين والمباني الأثرية."},
    {q:"ما تكلفة الجولة الافتراضية للفندق في جدة؟", a:"تبدأ الأسعار من 2,000 ريال للفنادق الصغيرة وترتفع حسب عدد الغرف والمرافق. نقدم حزماً خاصة لفنادق كورنيش جدة وسواحل البحر الأحمر."},
    {q:"هل تقدمون جولات افتراضية للمشاريع البحرية في جدة؟", a:"نعم. لدينا خبرة واسعة في تصوير مشاريع كورنيش جدة والمنتجعات البحرية وأحياء الواجهة المائية بتقنيات خاصة للبيئات الساحلية."},
    {q:"كم المدة اللازمة لتصوير منتجع على كورنيش جدة؟", a:"المنتجع الشامل يستغرق عادةً يوماً إلى يومين حسب عدد المرافق. نوصي بجلستين: الأولى مع الغروب للإضاءة الذهبية والثانية للداخل."}
  ],
  relatedLinks: [
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"جولات افتراضية الدمام", href:"/ar/virtual-tours/dammam"},
    {label:"تطوير المواقع جدة", href:"/ar/website-development/jeddah"},
    {label:"حلول الذكاء الاصطناعي جدة", href:"/ar/ai-solutions/jeddah"}
  ],
  canonicalEnUrl: "/virtual-tours/jeddah",
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
