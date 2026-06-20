import type { IndustryData } from "./tour-industries";

const SIBLINGS = [
  { slug: "hotels",       label: "Hotels",       labelAr: "الفنادق" },
  { slug: "resorts",      label: "Resorts",      labelAr: "المنتجعات" },
  { slug: "restaurants",  label: "Restaurants",  labelAr: "المطاعم" },
  { slug: "spa-wellness", label: "Spa & Wellness", labelAr: "السبا والعافية" },
];
const PARENT = "/virtual-tours/hospitality";
const ACCENT  = "rgba(200,160,80,0.16)";

const HOSPITALITY_CATEGORIES: Record<string, IndustryData> = {

  "hotels": {
    slug: "hotels",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Hotels",
    nameAr: "الفنادق",
    accentColor: ACCENT,
    hero: {
      label: "Hospitality",    labelAr: "الضيافة",
      headline: "LET GUESTS EXPERIENCE\nLUXURY BEFORE BOOKING.",
      headlineAr: "دع ضيوفك يختبرون\nالفخامة قبل الحجز.",
      sub: "Immersive hotel virtual tours that convert browsers into bookers — and bookers into loyal returning guests.",
      subAr: "جولات افتراضية فندقية غامرة تُحوّل المتصفحين إلى حاجزين — والحاجزين إلى ضيوف عائدين أوفياء.",
      videoSrc: "/x360/hotels.mp4",
      headlineSize: "clamp(1rem, 1.8vw, 1.75rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Eye",          title: "Guests Can't See What They're Booking", titleAr: "الضيوف لا يرون ما يحجزونه",          desc: "Static photos fail to convey the true scale, ambiance, and luxury of your property — resulting in mismatched expectations.", descAr: "الصور الثابتة لا تنقل الحجم الحقيقي والأجواء والفخامة لمنشأتك — مما يؤدي لتوقعات غير متطابقة." },
      { iconKey: "TrendingDown", title: "Low Direct Booking Rates",             titleAr: "معدلات الحجز المباشر منخفضة",        desc: "Without immersive previews guests default to OTA platforms — costing 15–25% commission on every booking.", descAr: "بدون معاينات غامرة يلجأ الضيوف لمنصات الحجز الخارجية — مما يكلفك 15-25% عمولة على كل حجز." },
      { iconKey: "MessageSquare",title: "Competitors Outperform Online",        titleAr: "المنافسون يتفوقون إلكترونياً",       desc: "Hotels with cinematic virtual experiences consistently outperform standard listings in visibility and booking conversion.", descAr: "الفنادق ذات التجارب الافتراضية السينمائية تتفوق باستمرار في الظهور وتحويل الحجز." },
      { iconKey: "Users",        title: "Corporate Accounts Are Hard to Win",   titleAr: "صعوبة كسب الحسابات المؤسسية",       desc: "Corporate travel managers need to virtually assess rooms and meeting facilities before recommending a property.", descAr: "مدراء السفر المؤسسي يحتاجون لتقييم الغرف ومرافق الاجتماعات افتراضياً قبل التوصية بالمنشأة." },
    ],
    solutions: [
      { step: 1, headline: "Virtual Pre-Stay Experience",      headlineAr: "تجربة ما قبل الإقامة الافتراضية",     body: "Walk guests through lobby, suites, spa, pool, and dining before they book — building excitement and certainty simultaneously.", bodyAr: "أجِّل الضيوف عبر البهو والأجنحة والسبا والمسبح وأماكن تناول الطعام قبل الحجز." },
      { step: 2, headline: "Full Property Digital Showcase",   headlineAr: "عرض رقمي شامل للمنشأة",               body: "One seamless tour covers every touchpoint — arrival driveway to penthouse — giving corporate bookers and travel agents the full picture.", bodyAr: "جولة واحدة سلسة تغطي كل نقطة تواصل — من ممر الوصول إلى البنتهاوس." },
      { step: 3, headline: "Suite Upsell Engine",              headlineAr: "محرك البيع الإضافي للأجنحة",           body: "Embed virtual tours in booking flows to let guests upgrade rooms and packages after experiencing them virtually — before arrival.", bodyAr: "ادمج الجولات الافتراضية في تدفقات الحجز للسماح للضيوف بترقية الغرف بعد تجربتها — قبل الوصول." },
    ],
    showcase: { title: "The Digital Front Door of Your Hotel.", titleAr: "البوابة الرقمية لفندقك.", body: "See how X360 transforms a standard hotel website into a fully immersive booking journey — from lobby to rooftop.", bodyAr: "شاهد كيف تحوّل X360 موقع فندق عادي إلى رحلة حجز غامرة بالكامل.", videoSrc: "/x360/industries/hospitality.mp4" },
    benefits: [
      { title: "Higher Direct Bookings",  titleAr: "حجوزات مباشرة أعلى",    body: "Hotels with virtual tours see up to 67% increase in direct booking conversions.", bodyAr: "تشهد الفنادق ذات الجولات الافتراضية زيادة تصل إلى 67% في تحويلات الحجز المباشر." },
      { title: "Reduced Cancellations",   titleAr: "تقليل الإلغاءات",       body: "Guests who preview virtually arrive with accurate expectations — reducing post-arrival cancellations.", bodyAr: "الضيوف الذين يشاهدون مسبقاً يصلون بتوقعات دقيقة — مما يقلل الإلغاءات." },
      { title: "Room Upgrade Revenue",    titleAr: "إيرادات ترقية الغرف",   body: "Virtual suite previews in booking flows drive measurable upgrade revenue.", bodyAr: "معاينات الأجنحة الافتراضية في تدفقات الحجز تدفع إيرادات ترقيات قابلة للقياس." },
      { title: "Corporate Account Wins",  titleAr: "كسب الحسابات المؤسسية", body: "Allow travel managers to virtually assess your property — closing corporate RFPs faster.", bodyAr: "اسمح لمدراء السفر بتقييم منشأتك افتراضياً — مما يُغلق طلبات العروض المؤسسية بشكل أسرع." },
    ],
    useCases: [
      { title: "Guest Room Showcase",        titleAr: "عرض غرف الضيوف",            desc: "Present every room category from standard to presidential suite.", descAr: "اعرض كل فئة غرفة من القياسية إلى الجناح الرئاسي." },
      { title: "Lobby & Common Areas",       titleAr: "البهو والمناطق المشتركة",    desc: "Showcase arrival experience and public spaces to drive first impressions.", descAr: "اعرض تجربة الوصول والمساحات العامة لتعزيز الانطباعات الأولى." },
      { title: "Dining & Bar Spaces",        titleAr: "مناطق تناول الطعام والبار", desc: "Drive F&B revenue with atmospheric previews of restaurants and bars.", descAr: "زِد إيرادات الطعام والشراب بمعاينات الأجواء للمطاعم والبارات." },
      { title: "Corporate Meeting Rooms",    titleAr: "غرف الاجتماعات المؤسسية",   desc: "Help corporate clients assess rooms and AV setups before committing.", descAr: "ساعد العملاء المؤسسيين على تقييم الغرف وإعدادات الصوت والصورة قبل الالتزام." },
    ],
    aiSection: { headline: "Spatial Intelligence for Hotel Operations", headlineAr: "الذكاء المكاني لعمليات الفندق", body: "X360 integrates with PMS systems to overlay real-time room availability, dynamic pricing, and AI-powered room recommendations directly inside the virtual tour — creating a fully interactive booking experience.", bodyAr: "تتكامل X360 مع أنظمة إدارة العقارات لعرض توفر الغرف الفعلي والأسعار الديناميكية مباشرة داخل الجولة الافتراضية." },
    finalCta: { headline: "Turn Your Hotel Into a Destination — Before Guests Arrive.", headlineAr: "اجعل فندقك وجهة — قبل وصول الضيوف.", sub: "Partner with X360 to deliver the most immersive hotel experience in the GCC market.", subAr: "تشارك مع X360 لتقديم أكثر تجربة فندقية غامرة في سوق الخليج." },
  },

  "resorts": {
    slug: "resorts",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Resorts",
    nameAr: "المنتجعات",
    accentColor: "rgba(80,180,160,0.14)",
    hero: {
      label: "Hospitality",    labelAr: "الضيافة",
      headline: "BRING THE RESORT\nTO EVERY GUEST.",
      headlineAr: "أحضر المنتجع\nإلى كل ضيف.",
      sub: "Cinematic resort virtual tours that transport guests into your world — driving bookings, premium upgrades, and unforgettable anticipation.",
      subAr: "جولات افتراضية سينمائية للمنتجعات تنقل الضيوف إلى عالمك — مما يدفع الحجوزات والترقيات المتميزة.",
      videoSrc: "/x360/resorts.mp4",
      headlineSize: "clamp(1rem, 1.8vw, 1.75rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Eye",      title: "Guests Can't Feel the Resort Ambiance Online", titleAr: "الضيوف لا يشعرون بأجواء المنتجع أونلاين", desc: "The scale of pools, private beaches, and tropical gardens is impossible to convey through standard photography.", descAr: "حجم المسابح والشواطئ الخاصة والحدائق استحال توصيله عبر التصوير القياسي." },
      { iconKey: "TrendingDown", title: "High Dependence on OTA Platforms",      titleAr: "اعتماد عالٍ على منصات الحجز الخارجية",  desc: "Without compelling digital content, resort bookings flow through OTAs — eroding margins on every reservation.", descAr: "بدون محتوى رقمي مقنع، تتدفق حجوزات المنتجعات عبر منصات الحجز الخارجية — مما يٍقلل الهامش على كل حجز." },
      { iconKey: "Globe",    title: "International Leisure Buyers Decide Remotely", titleAr: "المشترون الترفيهيون الدوليون يقررون عن بُعد", desc: "Destination resort guests in Europe, GCC, and Asia compare properties purely on digital quality — without visiting.", descAr: "ضيوف المنتجعات الدولية يقارنون الخصائص بناءً على الجودة الرقمية تماماً — دون زيارة." },
      { iconKey: "Users",    title: "Premium Experiences Go Unseen",              titleAr: "التجارب المتميزة لا تُرى",                desc: "Signature experiences — overwater villas, private dining, spa journeys — are your most profitable offerings but rarely showcased effectively.", descAr: "التجارب المميزة — فيلات فوق الماء والعشاء الخاص ورحلات السبا — هي عروضك الأكثر ربحية ونادراً ما تُعرض بفعالية." },
    ],
    solutions: [
      { step: 1, headline: "Cinematic Resort Walkthroughs",  headlineAr: "جولات منتجع سينمائية",               body: "Capture beach, pool, villas, spa, and dining in a single seamless 360° journey — recreating the resort atmosphere digitally.", bodyAr: "التقط الشاطئ والمسبح والفيلات والسبا وتناول الطعام في رحلة 360° واحدة سلسة." },
      { step: 2, headline: "Premium Experience Spotlights",  headlineAr: "تسليط الضوء على التجارب المتميزة",  body: "Dedicate virtual tour chapters to signature experiences — overwater dining, sunset pools, and private villas — driving high-margin upgrades.", bodyAr: "خصص فصولاً في الجولة الافتراضية للتجارب المميزة — العشاء فوق الماء ومسابح غروب الشمس." },
      { step: 3, headline: "Direct Booking Drive",           headlineAr: "دفع الحجز المباشر",                  body: "Embed virtual tours in your booking funnel — giving guests immersive reasons to book direct and upgrade packages.", bodyAr: "ادمج الجولات الافتراضية في مسار الحجز — مما يمنح الضيوف أسباباً غامرة للحجز المباشر وترقية الباقات." },
    ],
    showcase: { title: "Feel the Resort. Book the Experience.", titleAr: "اشعر بالمنتجع. احجز التجربة.", body: "See how GCC resort operators use X360 to drive direct bookings and premium suite upgrades with cinematic virtual tours.", bodyAr: "شاهد كيف يستخدم مشغلو المنتجعات X360 لدفع الحجوزات المباشرة وترقيات الأجنحة المتميزة.", videoSrc: "/x360/industries/hospitality.mp4" },
    benefits: [
      { title: "Direct Booking Uplift",    titleAr: "رفع الحجز المباشر",          body: "Resorts with immersive virtual tours see significant increases in direct booking rates.", bodyAr: "تشهد المنتجعات ذات الجولات الافتراضية الغامرة زيادات كبيرة في معدلات الحجز المباشر." },
      { title: "Premium Upgrade Revenue",  titleAr: "إيرادات الترقيات المتميزة",  body: "Virtual previews of overwater villas and private pools drive high-margin upgrade selections.", bodyAr: "المعاينات الافتراضية للفيلات فوق الماء تدفع اختيارات الترقيات ذات الهامش المرتفع." },
      { title: "Emotional Pre-Connection", titleAr: "ارتباط عاطفي مسبق",          body: "Guests who preview immersively arrive with heightened anticipation — improving satisfaction scores.", bodyAr: "الضيوف الذين يشاهدون مسبقاً يصلون بترقب مرتفع — مما يحسن درجات الرضا." },
      { title: "International Reach",      titleAr: "وصول دولي",                  body: "Reach leisure guests in Europe, Asia, and GCC through superior digital content.", bodyAr: "الوصول إلى ضيوف الترفيه في أوروبا وآسيا والخليج من خلال محتوى رقمي متفوق." },
    ],
    useCases: [
      { title: "Beachfront & Overwater Villas", titleAr: "فيلات الشاطئ وما فوق الماء", desc: "Showcase signature resort villas and unique accommodation experiences.", descAr: "اعرض فيلات المنتجع المميزة وتجارب الإقامة الفريدة." },
      { title: "Pool & Outdoor Areas",          titleAr: "المسبح والمناطق الخارجية",   desc: "Capture the leisure atmosphere of pools, gardens, and beachfront areas.", descAr: "التقط أجواء الترفيه لأحواض السباحة والحدائق ومناطق الشاطئ." },
      { title: "Spa & Wellness Retreats",       titleAr: "منتجعات السبا والعافية",     desc: "Pre-sell spa journeys and wellness packages with atmospheric previews.", descAr: "بِع مسبقاً رحلات السبا وباقات العافية بمعاينات الأجواء." },
      { title: "Fine Dining Experiences",       titleAr: "تجارب تناول الطعام الراقي",  desc: "Drive private dining and F&B bookings through immersive atmosphere tours.", descAr: "زِد حجوزات العشاء الخاص وإيرادات الطعام من خلال جولات الأجواء الغامرة." },
    ],
    aiSection: { headline: "AI-Powered Resort Experience Personalisation", headlineAr: "تخصيص تجربة المنتجع بالذكاء الاصطناعي", body: "X360 can layer AI guest profile matching into resort virtual tours — recommending villa types, dining experiences, and spa packages personalised to each visitor's preferences, converting browsing into bookings.", bodyAr: "يمكن لـ X360 إضافة مطابقة ملف الضيف بالذكاء الاصطناعي في الجولات الافتراضية للمنتجعات." },
    finalCta: { headline: "Transport Your Guests to the Resort — Before They Arrive.", headlineAr: "أوصل ضيوفك إلى المنتجع — قبل وصولهم.", sub: "Partner with X360 to deliver cinematic resort experiences that drive direct bookings and premium upgrades.", subAr: "تشارك مع X360 لتقديم تجارب منتجع سينمائية تدفع الحجوزات المباشرة والترقيات المتميزة." },
  },

  "restaurants": {
    slug: "restaurants",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Restaurants & Dining",
    nameAr: "المطاعم وتناول الطعام",
    accentColor: "rgba(220,120,60,0.14)",
    hero: {
      label: "Hospitality",    labelAr: "الضيافة",
      headline: "FILL TABLES BEFORE\nGUESTS DECIDE.",
      headlineAr: "املأ طاولاتك\nقبل أن يقرر الضيوف.",
      sub: "Immersive restaurant virtual tours that showcase atmosphere, private dining, and ambiance — converting online browsers into confirmed reservations.",
      subAr: "جولات افتراضية غامرة للمطاعم تعرض الأجواء والعشاء الخاص — تُحوّل المتصفحين أونلاين إلى حجوزات مؤكدة.",
      videoSrc: "/x360/restaurant.mp4",
      headlineSize: "clamp(1rem, 1.8vw, 1.75rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Eye",      title: "Atmosphere Is the Product — Photos Can't Sell It", titleAr: "الأجواء هي المنتج — الصور لا تبيعها",     desc: "Restaurant guests choose based on atmosphere, intimacy, and ambiance — none of which standard photography effectively communicates.", descAr: "ضيوف المطاعم يختارون بناءً على الأجواء والحميمية — لا يتم توصيل أي منها بالتصوير القياسي." },
      { iconKey: "TrendingDown", title: "High No-Show and Cancellation Rates",         titleAr: "معدلات عدم الحضور والإلغاء مرتفعة",    desc: "Guests who book based on photos alone have misaligned expectations — driving higher cancellation and no-show rates.", descAr: "الضيوف الذين يحجزون بناءً على الصور فقط لديهم توقعات غير متوافقة — مما يرفع معدلات الإلغاء." },
      { iconKey: "Users",    title: "Private Dining Rooms Go Unfilled",               titleAr: "غرف العشاء الخاص تبقى فارغة",            desc: "Private dining and event spaces are your most profitable bookings — yet they rarely get the visual showcase they deserve.", descAr: "العشاء الخاص ومساحات الفعاليات هي حجوزاتك الأكثر ربحية — ومع ذلك نادراً ما تحظى بالعرض البصري الذي تستحقه." },
      { iconKey: "Globe",    title: "Tourists and Visitors Decide Remotely",          titleAr: "السياح والزوار يقررون عن بُعد",           desc: "International diners researching restaurants online choose based entirely on digital content quality.", descAr: "الزبائن الدوليون الذين يبحثون عن المطاعم أونلاين يختارون بناءً كلياً على جودة المحتوى الرقمي." },
    ],
    solutions: [
      { step: 1, headline: "Atmospheric Virtual Tours",   headlineAr: "جولات افتراضية للأجواء",              body: "Capture the intimate lighting, table arrangements, bar design, and unique interiors of your restaurant — letting diners fall in love before they arrive.", bodyAr: "التقط الإضاءة الحميمة وترتيبات الطاولات وتصميم البار والمقاعد الداخلية الفريدة لمطعمك." },
      { step: 2, headline: "Private Dining Room Spotlight", headlineAr: "إبراز غرفة العشاء الخاص",          body: "Dedicate virtual tour sections to private dining rooms and event spaces — helping corporate clients visualise before they commit.", bodyAr: "خصص أقساماً في الجولة الافتراضية لغرف العشاء الخاص ومساحات الفعاليات." },
      { step: 3, headline: "Drive Direct Reservations",   headlineAr: "تعزيز الحجوزات المباشرة",             body: "Embed virtual tours on your reservations page — reducing bounce rates and driving confident, committed bookings.", bodyAr: "ادمج الجولات الافتراضية في صفحة حجوزاتك — مما يقلل معدلات الارتداد ويدفع حجوزات واثقة وملتزمة." },
    ],
    showcase: { title: "The Atmosphere That Fills Tables.", titleAr: "الأجواء التي تملأ الطاولات.", body: "See how X360 helps Saudi Arabia's leading restaurants and F&B operators increase reservations and fill private dining rooms with cinematic virtual tours.", bodyAr: "شاهد كيف تساعد X360 مطاعم المملكة الرائدة على زيادة الحجوزات وملء غرف العشاء الخاص.", videoSrc: "/x360/industries/hospitality.mp4" },
    benefits: [
      { title: "Higher Reservation Rates",      titleAr: "معدلات حجز أعلى",               body: "Restaurants with virtual tours convert 40% more online browsers into reservations.", bodyAr: "المطاعم ذات الجولات الافتراضية تُحوّل 40% أكثر من المتصفحين أونلاين إلى حجوزات." },
      { title: "Reduced No-Shows",              titleAr: "تقليل عدم الحضور",              body: "Guests who preview atmosphere arrive with aligned expectations — cutting no-show rates.", bodyAr: "الضيوف الذين يشاهدون الأجواء مسبقاً يصلون بتوقعات متوافقة — مما يخفض معدلات عدم الحضور." },
      { title: "Private Dining Revenue Uplift", titleAr: "رفع إيرادات العشاء الخاص",      body: "Immersive private room previews drive more corporate and celebration bookings.", bodyAr: "المعاينات الافتراضية للغرف الخاصة تدفع المزيد من حجوزات الشركات والاحتفالات." },
      { title: "International Diner Reach",     titleAr: "الوصول إلى الزبائن الدوليين",  body: "Attract international tourists and hotel guests through superior digital food and beverage presence.", bodyAr: "استقطب السياح الدوليين وضيوف الفنادق من خلال حضور رقمي متميز للطعام والشراب." },
    ],
    useCases: [
      { title: "Fine Dining Restaurants", titleAr: "مطاعم تناول الطعام الراقي",   desc: "Showcase ambient interiors and premium table settings to drive elite diners.", descAr: "اعرض الديكورات الداخلية والإعدادات المتميزة للاستقطاب." },
      { title: "Private Dining Rooms",    titleAr: "غرف العشاء الخاص",            desc: "Help corporate clients and celebration groups visualise exclusive spaces.", descAr: "ساعد العملاء المؤسسيين ومجموعات الاحتفالات على تصور المساحات الحصرية." },
      { title: "Rooftop Venues",          titleAr: "أماكن الأسطح",               desc: "Capture skyline views and outdoor dining areas for premium experience positioning.", descAr: "التقط مناظر الأفق ومناطق تناول الطعام الخارجية لتموضع التجربة المتميزة." },
      { title: "Casual & Café Concepts",  titleAr: "مفاهيم المقاهي الغير رسمية", desc: "Drive foot traffic and community following with welcoming virtual previews.", descAr: "زِد حركة المرور وتتابع المجتمع بمعاينات افتراضية ترحيبية." },
    ],
    aiSection: { headline: "Smart Reservation Intelligence", headlineAr: "ذكاء الحجز الذكي", body: "X360 can integrate live table availability and AI-powered seating preference matching directly inside the virtual tour — letting online browsers select their preferred table and view before confirming their reservation.", bodyAr: "يمكن لـ X360 دمج توفر الطاولات الحي ومطابقة تفضيلات الجلوس بالذكاء الاصطناعي مباشرة داخل الجولة الافتراضية." },
    finalCta: { headline: "Turn Online Browsers Into Confirmed Reservations.", headlineAr: "حوّل المتصفحين أونلاين إلى حجوزات مؤكدة.", sub: "Partner with X360 to deliver atmospheric restaurant previews that fill tables and drive private dining revenue.", subAr: "تشارك مع X360 لتقديم معاينات مطعم تملأ الطاولات وتدفع إيرادات العشاء الخاص." },
  },

  "spa-wellness": {
    slug: "spa-wellness",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Spa & Wellness",
    nameAr: "السبا والعافية",
    accentColor: "rgba(160,200,180,0.14)",
    hero: {
      label: "Hospitality",   labelAr: "الضيافة",
      headline: "SELL THE SERENITY\nBEFORE THEY ARRIVE.",
      headlineAr: "بِع الهدوء\nقبل وصولهم.",
      sub: "Immersive spa and wellness virtual tours that communicate atmosphere, luxury, and tranquillity — converting curious browsers into committed guests.",
      subAr: "جولات افتراضية غامرة للسبا والعافية توصل الأجواء والفخامة والهدوء — تُحوّل المتصفحين الفضوليين إلى ضيوف ملتزمين.",
      videoSrc: "/x360/spa.mp4",
      headlineSize: "clamp(1rem, 1.8vw, 1.75rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Eye",          title: "Serenity Can't Be Photographed",        titleAr: "الهدوء لا يمكن تصويره",              desc: "The atmosphere, lighting, and spatial calm of a luxury spa cannot be communicated through standard flat photography.", descAr: "لا يمكن توصيل الأجواء والإضاءة والهدوء المكاني لسبا فاخر عبر تصوير مسطح قياسي." },
      { iconKey: "TrendingDown", title: "Low Spa Booking Conversion Rates",      titleAr: "معدلات تحويل حجوزات السبا منخفضة",  desc: "Guests often omit spa packages from bookings without seeing the facilities first — leaving significant revenue on the table.", descAr: "الضيوف كثيراً ما يتجاهلون باقات السبا دون رؤية المرافق أولاً — تاركين إيرادات كبيرة على الطاولة." },
      { iconKey: "MessageSquare", title: "Competitors Win on Digital Presence",  titleAr: "المنافسون يكسبون بحضورهم الرقمي",   desc: "Wellness centres with superior digital content consistently attract more bookings — regardless of actual facility quality.", descAr: "مراكز العافية ذات المحتوى الرقمي المتفوق تستقطب باستمرار حجوزات أكثر — بصرف النظر عن جودة المرافق الفعلية." },
      { iconKey: "Users",        title: "Retreat Packages Are Hard to Pre-Sell", titleAr: "يصعب بيع باقات المنتجع مسبقاً",     desc: "Multi-day wellness retreats require guests to commit significant spend — without being able to fully experience the environment first.", descAr: "تتطلب منتجعات العافية متعددة الأيام من الضيوف الالتزام بإنفاق كبير دون تجربة البيئة أولاً." },
    ],
    solutions: [
      { step: 1, headline: "Atmospheric Spa Immersion",        headlineAr: "انغماس في أجواء السبا",            body: "360° tours of treatment rooms, relaxation lounges, thermal pools, and meditation spaces — letting guests feel tranquillity before they book.", bodyAr: "جولات 360° لغرف العلاج وصالات الاسترخاء وأحواض الحرارة ومساحات التأمل." },
      { step: 2, headline: "Retreat & Package Visualisation",  headlineAr: "تصور المنتجع والباقات",             body: "Show the full journey of your signature wellness retreats — from arrival ritual to treatment and relaxation — driving package pre-sales.", bodyAr: "أظهر الرحلة الكاملة لمنتجعات العافية المميزة لديك — من طقوس الوصول إلى العلاج والاسترخاء." },
      { step: 3, headline: "Online Upsell Integration",        headlineAr: "دمج البيع الإضافي أونلاين",         body: "Embed spa virtual tours in hotel booking flows — giving guests immersive reasons to add wellness packages before arriving.", bodyAr: "ادمج جولات السبا الافتراضية في تدفقات الحجز الفندقي — مما يمنح الضيوف أسباباً غامرة لإضافة باقات العافية." },
    ],
    showcase: { title: "The Calm That Converts.", titleAr: "الهدوء الذي يُحوّل.", body: "See how X360 helps luxury spas and wellness centres across the GCC increase package bookings and retreat pre-sales with immersive virtual tours.", bodyAr: "شاهد كيف تساعد X360 السباهات الفاخرة ومراكز العافية على زيادة حجوزات الباقات.", videoSrc: "/x360/industries/hospitality.mp4" },
    benefits: [
      { title: "Spa Package Pre-Sales",   titleAr: "مبيعات مسبقة لباقات السبا",  body: "Guests who preview spa facilities are significantly more likely to pre-book wellness packages.", bodyAr: "الضيوف الذين يشاهدون مرافق السبا أكثر احتمالاً لحجز باقات العافية مسبقاً." },
      { title: "Higher Spend Per Guest",  titleAr: "إنفاق أعلى لكل ضيف",         body: "Immersive wellness previews drive add-on treatments and upgrade selections.", bodyAr: "معاينات العافية الغامرة تدفع علاجات إضافية واختيارات الترقيات." },
      { title: "Retreat Pre-Commitment",  titleAr: "الالتزام المسبق بالمنتجع",   body: "Video-quality virtual tours build the emotional connection needed for multi-day retreat bookings.", bodyAr: "الجولات الافتراضية بجودة الفيديو تبني الارتباط العاطفي اللازم لحجوزات المنتجع متعددة الأيام." },
      { title: "Premium Brand Signal",    titleAr: "إشارة العلامة التجارية المتميزة", body: "Cinematic spa presentations communicate world-class wellness standards to discerning guests.", bodyAr: "تقديمات السبا السينمائية توصل معايير العافية العالمية للضيوف المتميزين." },
    ],
    useCases: [
      { title: "Treatment Rooms",         titleAr: "غرف العلاج",                 desc: "Showcase individual treatment rooms with bespoke lighting and ambiance.",     descAr: "اعرض غرف العلاج الفردية بالإضاءة والأجواء المخصصة." },
      { title: "Thermal Pools & Hydro",   titleAr: "أحواض الحرارة والهيدروثيرابي", desc: "Capture aquatic wellness areas that drive premium facility perception.",      descAr: "التقط مناطق العافية المائية التي تدفع تصور المرافق المتميزة." },
      { title: "Relaxation Lounges",      titleAr: "صالات الاسترخاء",            desc: "Communicate calm and exclusivity through atmospheric lounge previews.",       descAr: "أوصل الهدوء والحصرية من خلال معاينات صالات الأجواء." },
      { title: "Wellness Retreats",       titleAr: "منتجعات العافية",             desc: "Pre-sell multi-day retreat packages with immersive full-journey previews.",   descAr: "بِع مسبقاً باقات المنتجع متعددة الأيام بمعاينات رحلة كاملة غامرة." },
    ],
    aiSection: { headline: "Personalised Wellness Journey Mapping", headlineAr: "رسم خريطة رحلة العافية المخصصة", body: "X360 can overlay AI-powered wellness journey personalisation inside your spa virtual tour — recommending treatments, retreat packages, and booking paths tailored to each visitor's profile and preferences.", bodyAr: "يمكن لـ X360 إضافة تخصيص رحلة العافية بالذكاء الاصطناعي داخل جولة سباك الافتراضية." },
    finalCta: { headline: "Communicate Your Serenity. Fill Your Treatment Rooms.", headlineAr: "أوصل هدوءك. املأ غرف علاجك.", sub: "Partner with X360 to deliver immersive spa experiences that pre-sell packages and drive premium wellness bookings.", subAr: "تشارك مع X360 لتقديم تجارب سبا غامرة تبيع الباقات مسبقاً وتدفع حجوزات العافية المتميزة." },
  },

};

export function getHospitalityCategory(slug: string): IndustryData | undefined {
  return HOSPITALITY_CATEGORIES[slug];
}

export function getAllHospitalitySlugs(): string[] {
  return Object.keys(HOSPITALITY_CATEGORIES);
}
