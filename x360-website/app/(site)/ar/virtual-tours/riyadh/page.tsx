import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "جولات افتراضية 360 درجة في الرياض | عقارات وفنادق ومشاريع KAFD",
  description: "جولات افتراضية احترافية 360 درجة في الرياض لمطوري العقارات والفنادق الفاخرة ومكاتب KAFD ومشاريع رؤية 2030. تصوير 8K HDR مع تسليم خلال 48 ساعة.",
  keywords: "جولات افتراضية الرياض، جولة افتراضية 360 درجة، جولة افتراضية عقارات الرياض، جولات افتراضية فنادق الرياض، X360 الرياض",
  openGraph: {
    title: "جولات افتراضية 360 درجة في الرياض | عقارات وفنادق ومشاريع KAFD",
    description: "جولات افتراضية احترافية 360 درجة في الرياض لمطوري العقارات والفنادق الفاخرة ومكاتب KAFD ومشاريع رؤية 2030. تصوير 8K HDR مع تسليم خلال 48 ساعة.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/virtual-tours/riyadh",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "جولات افتراضية 360 درجة في الرياض | عقارات وفنادق ومشاريع KAFD | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات افتراضية 360 درجة في الرياض | عقارات وفنادق ومشاريع KAFD",
    description: "جولات افتراضية احترافية 360 درجة في الرياض لمطوري العقارات والفنادق الفاخرة ومكاتب KAFD ومشاريع رؤية 2030. تصوير 8K HDR مع تسليم خلال 48 ساعة.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/virtual-tours/riyadh",
    languages: {
      "en-SA": "https://www.x-360.ai/virtual-tours/riyadh",
      "ar-SA": "https://www.x-360.ai/ar/virtual-tours/riyadh",
      "x-default": "https://www.x-360.ai/virtual-tours/riyadh",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — جولات افتراضية 360° الرياض",
  "description": "جولات افتراضية احترافية 360 درجة في الرياض لمطوري العقارات والفنادق الفاخرة ومكاتب KAFD ومشاريع رؤية 2030. تصوير 8K HDR مع تسليم خلال 48 ساعة.",
  "url": "https://www.x-360.ai/ar/virtual-tours/riyadh",
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
  "name": "جولات افتراضية 360° الرياض",
  "description": "جولات افتراضية احترافية 360 درجة في الرياض لمطوري العقارات والفنادق الفاخرة ومكاتب KAFD ومشاريع رؤية 2030. تصوير 8K HDR مع تسليم خلال 48 ساعة.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"الرياض","containedIn":"Saudi Arabia"},
  "serviceType": "تصوير جولات افتراضية",
  "url": "https://www.x-360.ai/ar/virtual-tours/riyadh",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"كم تكلفة الجولة الافتراضية 360 درجة في الرياض؟","acceptedAnswer":{"@type":"Answer","text":"تبدأ الأسعار من 1,500 ريال للمساحات الصغيرة وترتفع حسب حجم العقار وعدد نقاط البانوراما. تواصل معنا للحصول على عرض سعر خلال 24 ساعة."}},{"@type":"Question","name":"هل تعملون على مشاريع الرياض على الخارطة؟","acceptedAnswer":{"@type":"Answer","text":"نعم. نتعاون مع مطوري الرياض لإنشاء جولات فوتوواقعية للمشاريع على الخارطة تُمكّن المستثمرين من استكشاف المساحات المستقبلية قبل اكتمال البناء."}},{"@type":"Question","name":"هل تغطون جميع أحياء الرياض بما فيها KAFD وشمال الرياض؟","acceptedAnswer":{"@type":"Answer","text":"بالتأكيد. نغطي جميع أحياء الرياض — KAFD والحي الدبلوماسي والعليا والدرعية وشمال الرياض — دون رسوم تنقل إضافية."}},{"@type":"Question","name":"كم يستغرق تصوير عقار تجاري في الرياض؟","acceptedAnswer":{"@type":"Answer","text":"الأجمال المعياري يستغرق 2-4 ساعات في الموقع. الفندق الكبير في KAFD قد يحتاج يوماً كاملاً أو جلستين للإضاءة المثلى."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"الجولات الافتراضية 360°","item":"https://www.x-360.ai/ar/virtual-tours"},
    {"@type":"ListItem","position":3,"name":"الرياض","item":"https://www.x-360.ai/ar/virtual-tours/riyadh"},
  ],
};

const pageData: ArCityData = {
  cityAr: "الرياض",
  serviceAr: "الجولات الافتراضية 360°",
  heroTitleAr: "جولات افتراضية 360° احترافية في الرياض — نُبرز العاصمة في أبهى صورة",
  heroSubAr: "من أبراج KAFD الزجاجية إلى أسوار الدرعية التراثية — تلتقط X360 كل مساحة في الرياض بدقة 8K فوتوواقعية، وتمنح المستثمرين والمشترين تجربة غامرة من أي مكان في العالم.",
  introHeadingAr: "الشريك الأول للجولات الافتراضية 360° في الرياض",
  introParasAr: ["الرياض قلب تحول رؤية 2030 — مدينة مشاريع عملاقة كمركز الملك عبدالله المالي والقدية وبوابة الدرعية. لم يعد التصوير الثابت كافياً لنقل القصة الكاملة للمساحات عند المنافسة على هذا المستوى. المشترون يتخذون قراراتهم عن بُعد، والتجارب الغامرة 360° أصبحت ضرورة تجارية لا رفاهية.", "تقدم X360 جولات افتراضية 360° ثنائية اللغة تتيح للمستثمرين والمستأجرين والضيوف استكشاف عقارك في الرياض من أي مكان في العالم. يلتقط تصويرنا 8K HDR فخامة أبراج شمال الرياض ودفء مباني الدرعية التراثية وخطوط مخيمات KAFD الأنيقة وداخليات فنادق العليا الراقية — بدقة بكسل مثالية."],
  facts: [
    {val:"+500", label:"جولة افتراضية في الرياض"},
    {val:"48h", label:"ضمان التسليم"},
    {val:"8K HDR", label:"دقة بانورامية"},
    {val:"100%", label:"ثنائي اللغة عربي/إنجليزي"}
  ],
  servicesHeadingAr: "خدمات جولات افتراضية تكسب العملاء",
  services: [
    {icon:"camera" as ArIconKey, title:"تصوير بانورامي 8K HDR", desc:"تصوير بانورامي كروي بجودة سينمائية 8K HDR يلتقط كل تفصيلة معمارية بدقة ألوان مثالية وإضاءة احترافية."},
    {icon:"globe" as ArIconKey, title:"تكامل Google Street View", desc:"نشر البانورامات مباشرةً على Google Maps لتعزيز ظهورك الرقمي وزيادة ثقة العملاء بموقعك."},
    {icon:"eye" as ArIconKey, title:"التجهيز الافتراضي والتصميم الرقمي", desc:"تأثيث المساحات الفارغة رقمياً لإبراز إمكاناتها الكاملة — مثالي للمشاريع على الخارطة وما قبل الافتتاح."},
    {icon:"layers" as ArIconKey, title:"التوأم الرقمي ومخططات ثلاثية الأبعاد", desc:"توأمات رقمية دقيقة القياسات مع مخططات 3D وقياسات مدمجة — أساسية لإدارة المنشآت وتقييم المستثمرين."}
  ],
  cityContextAr: "تستضيف الرياض المقرات الإقليمية لكبرى الشركات السعودية ووكالات تطوير رؤية 2030 وأكثر المشاريع العمرانية طموحاً في العالم. تجاوزت صفقات العقارات في المدينة 100 مليار ريال عام 2024، مع مطورين كرشن ودار الأركان وإعمار السعودية يحتاجون عروضاً رقمية مقنعة لجذب الاستثمار المحلي والدولي.",
  industries: ["العقارات والتطوير", "الضيافة الفاخرة", "المكاتب المؤسسية", "الحكومة ورؤية 2030", "التجزئة والمطاعم", "الرعاية الصحية", "التعليم", "البناء والإنشاء"],
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
    {q:"كم تكلفة الجولة الافتراضية 360 درجة في الرياض؟", a:"تبدأ الأسعار من 1,500 ريال للمساحات الصغيرة وترتفع حسب حجم العقار وعدد نقاط البانوراما. تواصل معنا للحصول على عرض سعر خلال 24 ساعة."},
    {q:"هل تعملون على مشاريع الرياض على الخارطة؟", a:"نعم. نتعاون مع مطوري الرياض لإنشاء جولات فوتوواقعية للمشاريع على الخارطة تُمكّن المستثمرين من استكشاف المساحات المستقبلية قبل اكتمال البناء."},
    {q:"هل تغطون جميع أحياء الرياض بما فيها KAFD وشمال الرياض؟", a:"بالتأكيد. نغطي جميع أحياء الرياض — KAFD والحي الدبلوماسي والعليا والدرعية وشمال الرياض — دون رسوم تنقل إضافية."},
    {q:"كم يستغرق تصوير عقار تجاري في الرياض؟", a:"الأجمال المعياري يستغرق 2-4 ساعات في الموقع. الفندق الكبير في KAFD قد يحتاج يوماً كاملاً أو جلستين للإضاءة المثلى."}
  ],
  relatedLinks: [
    {label:"تطوير المواقع الرياض", href:"/ar/website-development/riyadh"},
    {label:"حلول الذكاء الاصطناعي الرياض", href:"/ar/ai-solutions/riyadh"},
    {label:"حلول ERP وSAP الرياض", href:"/ar/erp-sap/riyadh"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"}
  ],
  canonicalEnUrl: "/virtual-tours/riyadh",
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
