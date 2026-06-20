import type { Metadata } from "next";
import ArCityPage, { type ArCityData, type ArIconKey } from "@/components/templates/ArCityPage";

export const metadata: Metadata = {
  title: "جولات افتراضية 360 درجة في مكة المكرمة | فنادق وعقارات وتجزئة",
  description: "جولات افتراضية احترافية 360 درجة في مكة المكرمة لفنادق الضيافة الدينية والعقارات القريبة من الحرم ومراكز التسوق. تصوير 8K HDR باحترافية عالية.",
  keywords: "جولات افتراضية مكة، جولة افتراضية 360 درجة مكة المكرمة، جولات افتراضية فنادق مكة، جولات افتراضية قرب الحرم، X360 مكة",
  openGraph: {
    title: "جولات افتراضية 360 درجة في مكة المكرمة | فنادق وعقارات وتجزئة",
    description: "جولات افتراضية احترافية 360 درجة في مكة المكرمة لفنادق الضيافة الدينية والعقارات القريبة من الحرم ومراكز التسوق. تصوير 8K HDR باحترافية عالية.",
    locale: "ar_SA",
    url: "https://www.x-360.ai/ar/virtual-tours/mecca",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "جولات افتراضية 360 درجة في مكة المكرمة | فنادق وعقارات وتجزئة | X360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "جولات افتراضية 360 درجة في مكة المكرمة | فنادق وعقارات وتجزئة",
    description: "جولات افتراضية احترافية 360 درجة في مكة المكرمة لفنادق الضيافة الدينية والعقارات القريبة من الحرم ومراكز التسوق. تصوير 8K HDR باحترافية عالية.",
  },
  alternates: {
    canonical: "https://www.x-360.ai/ar/virtual-tours/mecca",
    languages: {
      "en-SA": "https://www.x-360.ai/virtual-tours/mecca",
      "ar-SA": "https://www.x-360.ai/ar/virtual-tours/mecca",
      "x-default": "https://www.x-360.ai/virtual-tours/mecca",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "X360 — جولات افتراضية 360° مكة المكرمة",
  "description": "جولات افتراضية احترافية 360 درجة في مكة المكرمة لفنادق الضيافة الدينية والعقارات القريبة من الحرم ومراكز التسوق. تصوير 8K HDR باحترافية عالية.",
  "url": "https://www.x-360.ai/ar/virtual-tours/mecca",
  "telephone": "+966502547274",
  "email": "info@x-360.ai",
  "address": {"@type":"PostalAddress","addressLocality":"مكة المكرمة","addressCountry":"SA"},
  "serviceArea": {"@type":"City","name":"مكة المكرمة"},
  "priceRange": "$$",
  "image": "https://www.x-360.ai/opengraph.jpg",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "جولات افتراضية 360° مكة المكرمة",
  "description": "جولات افتراضية احترافية 360 درجة في مكة المكرمة لفنادق الضيافة الدينية والعقارات القريبة من الحرم ومراكز التسوق. تصوير 8K HDR باحترافية عالية.",
  "provider": {"@type":"Organization","name":"X360","url":"https://www.x-360.ai"},
  "areaServed": {"@type":"City","name":"مكة المكرمة","containedIn":"Saudi Arabia"},
  "serviceType": "تصوير جولات افتراضية",
  "url": "https://www.x-360.ai/ar/virtual-tours/mecca",
  "availableLanguage": ["ar", "en"],
  "inLanguage": "ar",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "ar",
  "mainEntity": [{"@type":"Question","name":"هل تقدمون جولات افتراضية لفنادق قريبة من المسجد الحرام؟","acceptedAnswer":{"@type":"Answer","text":"نعم. لدينا خبرة في تصوير فنادق الضيافة الدينية في مكة المكرمة، مع احترام تام للوائح المحلية وإجراءات التصوير الخاصة بالمنطقة المقدسة."}},{"@type":"Question","name":"ما أنواع العقارات التي تصورونها في مكة؟","acceptedAnswer":{"@type":"Answer","text":"نتخصص في الفنادق والشقق المفروشة ومراكز التسوق والمجمعات التجارية القريبة من الحرم، مع الالتزام الكامل بالاشتراطات الدينية والتنظيمية."}},{"@type":"Question","name":"كيف يمكن للجولة الافتراضية أن تساعد فندقي في مكة؟","acceptedAnswer":{"@type":"Answer","text":"الجولة الافتراضية تُمكّن الحجاج والمعتمرين من استكشاف غرف فندقك ومرافقه قبل الحجز، مما يرفع معدلات التحويل ويُقلّل الاستفسارات ما قبل الوصول."}},{"@type":"Question","name":"هل تعملون خلال موسم الحج والعمرة؟","acceptedAnswer":{"@type":"Answer","text":"نعمل على مدار العام ونُنسّق مع إدارات الفنادق لجدولة التصوير في أوقات الهدوء النسبي لتجنب التأثير على العمليات اليومية."}}],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"X360","item":"https://www.x-360.ai"},
    {"@type":"ListItem","position":2,"name":"الجولات الافتراضية 360°","item":"https://www.x-360.ai/ar/virtual-tours"},
    {"@type":"ListItem","position":3,"name":"مكة المكرمة","item":"https://www.x-360.ai/ar/virtual-tours/mecca"},
  ],
};

const pageData: ArCityData = {
  cityAr: "مكة المكرمة",
  serviceAr: "الجولات الافتراضية 360°",
  heroTitleAr: "جولات افتراضية 360° في مكة المكرمة — أبرز ضيافتك لملايين الزوار",
  heroSubAr: "ساعد الحجاج والمعتمرين على اختيار فندقك بثقة قبل وصولهم — جولات افتراضية احترافية تُظهر غرفك ومرافقك بأبهى صورة.",
  introHeadingAr: "جولات افتراضية مُصمَّمة لخصوصية مكة المكرمة",
  introParasAr: ["مكة المكرمة تستقبل ملايين الحجاج والمعتمرين سنوياً، والتنافس بين الفنادق على استقطابهم شديد. الحاج الذي يبحث عن مكان إقامته عن بُعد يحتاج صورة واضحة وشاملة للفندق ومرافقه وقربه من الحرم.", "تقدم X360 جولات افتراضية 360° مُصمَّمة لفنادق ومرافق الضيافة في مكة المكرمة، مع احترام كامل للوائح التنظيمية المحلية. جولاتنا باللغتين العربية والإنجليزية تصل لزوار العالم الإسلامي وما وراءه."],
  facts: [
    {val:"+150", label:"جولة افتراضية في مكة"},
    {val:"48h", label:"ضمان التسليم"},
    {val:"8K HDR", label:"دقة بانورامية"},
    {val:"100%", label:"التزام باللوائح المحلية"}
  ],
  servicesHeadingAr: "خدمات الجولات الافتراضية في مكة المكرمة",
  services: [
    {icon:"camera" as ArIconKey, title:"تصوير بانورامي 8K HDR", desc:"تصوير بانورامي كروي بجودة سينمائية 8K HDR يلتقط كل تفصيلة معمارية بدقة ألوان مثالية وإضاءة احترافية."},
    {icon:"globe" as ArIconKey, title:"تكامل Google Street View", desc:"نشر البانورامات مباشرةً على Google Maps لتعزيز ظهورك الرقمي وزيادة ثقة العملاء بموقعك."},
    {icon:"eye" as ArIconKey, title:"التجهيز الافتراضي والتصميم الرقمي", desc:"تأثيث المساحات الفارغة رقمياً لإبراز إمكاناتها الكاملة — مثالي للمشاريع على الخارطة وما قبل الافتتاح."},
    {icon:"layers" as ArIconKey, title:"التوأم الرقمي ومخططات ثلاثية الأبعاد", desc:"توأمات رقمية دقيقة القياسات مع مخططات 3D وقياسات مدمجة — أساسية لإدارة المنشآت وتقييم المستثمرين."}
  ],
  cityContextAr: "مكة المكرمة تستضيف أكبر تجمع بشري سنوي في العالم. الفنادق المحيطة بالمسجد الحرام تحتاج تسويقاً رقمياً استثنائياً لتبرز أمام ملايين الحجاج الباحثين عن أفضل إقامة. الجولة الافتراضية تُجيب عن تساؤلاتهم مقدماً وتحول المتصفح إلى حاجز.",
  industries: ["فنادق الضيافة الدينية", "الشقق المفروشة والسكن الموسمي", "مراكز التسوق والتجزئة", "المطاعم وأماكن الطعام", "خدمات الحج والعمرة", "العقارات السكنية", "البنية التحتية الدينية", "السياحة الداخلية"],
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
    {q:"هل تقدمون جولات افتراضية لفنادق قريبة من المسجد الحرام؟", a:"نعم. لدينا خبرة في تصوير فنادق الضيافة الدينية في مكة المكرمة، مع احترام تام للوائح المحلية وإجراءات التصوير الخاصة بالمنطقة المقدسة."},
    {q:"ما أنواع العقارات التي تصورونها في مكة؟", a:"نتخصص في الفنادق والشقق المفروشة ومراكز التسوق والمجمعات التجارية القريبة من الحرم، مع الالتزام الكامل بالاشتراطات الدينية والتنظيمية."},
    {q:"كيف يمكن للجولة الافتراضية أن تساعد فندقي في مكة؟", a:"الجولة الافتراضية تُمكّن الحجاج والمعتمرين من استكشاف غرف فندقك ومرافقه قبل الحجز، مما يرفع معدلات التحويل ويُقلّل الاستفسارات ما قبل الوصول."},
    {q:"هل تعملون خلال موسم الحج والعمرة؟", a:"نعمل على مدار العام ونُنسّق مع إدارات الفنادق لجدولة التصوير في أوقات الهدوء النسبي لتجنب التأثير على العمليات اليومية."}
  ],
  relatedLinks: [
    {label:"جولات افتراضية الرياض", href:"/ar/virtual-tours/riyadh"},
    {label:"جولات افتراضية جدة", href:"/ar/virtual-tours/jeddah"},
    {label:"تطوير مواقع الرياض", href:"/ar/website-development/riyadh"},
    {label:"حلول الذكاء الاصطناعي", href:"/ar/ai-solutions/riyadh"}
  ],
  canonicalEnUrl: "/virtual-tours/mecca",
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
