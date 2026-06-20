export interface IndustrySibling {
  slug: string;
  label: string;
  labelAr: string;
}

export interface IndustryData {
  slug: string;
  parentPath?: string;
  siblings?: IndustrySibling[];
  name: string;
  nameAr: string;
  accentColor: string;
  hero: {
    label: string; labelAr: string;
    headline: string; headlineAr: string;
    headlineSize?: string;
    sub: string; subAr: string;
    videoSrc?: string;
    imageSrc?: string;
  };
  combineChallengeSolutions?: boolean;
  combineSectionVideo?: string;
  problems: Array<{ iconKey: string; title: string; titleAr: string; desc: string; descAr: string }>;
  solutions: Array<{ step: number; headline: string; headlineAr: string; body: string; bodyAr: string }>;
  showcase: { title: string; titleAr: string; body: string; bodyAr: string; videoSrc: string };
  benefits: Array<{ title: string; titleAr: string; body: string; bodyAr: string }>;
  useCases: Array<{ title: string; titleAr: string; desc: string; descAr: string }>;
  aiSection: { headline: string; headlineAr: string; body: string; bodyAr: string };
  finalCta: { headline: string; headlineAr: string; sub: string; subAr: string };
}

const INDUSTRIES: Record<string, IndustryData> = {
  "real-estate": {
    slug: "real-estate",
    name: "Real Estate",
    nameAr: "العقارات",
    accentColor: "rgba(120,180,255,0.18)",
    hero: {
      label: "Real Estate",
      labelAr: "القطاع العقاري",
      headline: "SELL PROPERTIES\nBEFORE BUYERS VISIT.",
      headlineAr: "بِع العقارات\nقبل أن يزورها المشترون.",
      sub: "Turn every listing into an immersive spatial experience that closes deals faster — from anywhere in the world.",
      subAr: "حوّل كل عقار إلى تجربة مكانية غامرة تُسرّع إتمام الصفقات من أي مكان في العالم.",
    },
    problems: [
      {
        iconKey: "Globe",
        title: "International Buyers Can't Visit",
        titleAr: "المشترون الدوليون لا يستطيعون الزيارة",
        desc: "High-value clients in Dubai, London, or Riyadh lose deals because physical visits aren't always feasible.",
        descAr: "يفوت المشترون في دبي ولندن والرياض صفقات مهمة لأن الزيارات الفعلية ليست دائماً ممكنة.",
      },
      {
        iconKey: "ImageOff",
        title: "Static Listings Lose Engagement",
        titleAr: "القوائم الثابتة لا تجذب الانتباه",
        desc: "2D photos fail to communicate scale, flow, and premium finishes — leading to low conversion on high-ticket properties.",
        descAr: "الصور ثنائية الأبعاد لا توصل الإحساس بالمساحة والتشطيبات الفاخرة مما يخفض معدلات التحويل.",
      },
      {
        iconKey: "Clock",
        title: "Slow Decision-Making",
        titleAr: "بطء اتخاذ القرار",
        desc: "Without spatial confidence, buyers hesitate — requiring multiple visits and prolonged sales cycles.",
        descAr: "دون يقين مكاني، يتردد المشترون ويحتاجون لزيارات متعددة ودورات مبيعات طويلة.",
      },
      {
        iconKey: "Building2",
        title: "Off-Plan Properties Are Hard to Sell",
        titleAr: "صعوبة بيع العقارات على الخريطة",
        desc: "Buyers struggle to visualise uncompleted units — leading to hesitation and lost pre-sales revenue.",
        descAr: "يجد المشترون صعوبة في تصور الوحدات غير المكتملة مما يؤدي إلى خسارة إيرادات ما قبل البيع.",
      },
    ],
    solutions: [
      {
        step: 1,
        headline: "Immersive Property Walkthroughs",
        headlineAr: "جولات عقارية غامرة",
        body: "Every room, corridor, and outdoor space is captured in photorealistic 360° — allowing buyers to feel presence before setting foot on-site.",
        bodyAr: "يُلتقط كل غرفة وممر ومساحة خارجية بدقة 360° فوتوغرافية — مما يمنح المشترين إحساساً حقيقياً قبل زيارة الموقع.",
      },
      {
        step: 2,
        headline: "24/7 Remote Accessibility",
        headlineAr: "إمكانية الوصول عن بُعد على مدار الساعة",
        body: "Share a link — and your property is available to qualified buyers anywhere in the world, at any time, on any device.",
        bodyAr: "شارك رابطاً واحداً — وعقارك متاح للمشترين المؤهلين في أي مكان بالعالم، في أي وقت، على أي جهاز.",
      },
      {
        step: 3,
        headline: "Spatial Confidence That Closes",
        headlineAr: "يقين مكاني يُسرّع الإغلاق",
        body: "When buyers can explore a property end-to-end virtually, they arrive at physical visits already decided — dramatically shortening the sales cycle.",
        bodyAr: "عندما يستكشف المشترون العقار افتراضياً من البداية للنهاية، يصلون للزيارة الفعلية وقد اتخذوا قرارهم — مما يقلص دورة المبيعات بشكل ملحوظ.",
      },
    ],
    showcase: {
      title: "Experience the Property. Close the Deal.",
      titleAr: "عِش تجربة العقار. أتمم الصفقة.",
      body: "See how Saudi Arabia's leading developers use X360 virtual tours to pre-sell luxury villas and commercial units months before completion.",
      bodyAr: "اكتشف كيف يستخدم كبار المطورين في المملكة جولات X360 الافتراضية لبيع الفيلات الفاخرة والوحدات التجارية قبل اكتمالها بأشهر.",
      videoSrc: "/x360/industries/real-estate.mp4",
    },
    benefits: [
      { title: "Faster Purchase Decisions", titleAr: "قرارات شراء أسرع", body: "Buyers exploring virtual tours are 74% more likely to make faster offers.", bodyAr: "المشترون الذين يستكشفون الجولات الافتراضية أسرع بنسبة 74% في تقديم العروض." },
      { title: "Global Buyer Reach", titleAr: "الوصول لمشترين عالميين", body: "Reach qualified international buyers in GCC, Europe, and Asia without physical logistics.", bodyAr: "الوصول إلى مشترين دوليين في الخليج وأوروبا وآسيا دون تعقيدات لوجستية." },
      { title: "Premium Brand Positioning", titleAr: "تموضع علامة تجارية متميزة", body: "Cinematic virtual tours elevate your listings above the market noise.", bodyAr: "الجولات الافتراضية السينمائية ترفع قوائمك فوق ضجيج السوق." },
      { title: "Higher Engagement Rate", titleAr: "معدل تفاعل أعلى", body: "Listings with 360° tours receive 87% more views than standard photo listings.", bodyAr: "القوائم ذات الجولات 360° تحصل على 87% مشاهدات أكثر من القوائم الفوتوغرافية." },
    ],
    useCases: [
      { title: "Luxury Villas & Mansions", titleAr: "الفيلات الفاخرة والقصور", desc: "Showcase premium residential properties to elite buyers globally.", descAr: "اعرض العقارات السكنية الراقية على المشترين المتميزين عالمياً." },
      { title: "Off-Plan Developments", titleAr: "المشاريع على الخريطة", desc: "Pre-sell units with AI-rendered 3D virtual tours before construction completes.", descAr: "بِع الوحدات مسبقاً بجولات 360° ثلاثية الأبعاد قبل اكتمال البناء." },
      { title: "Commercial Spaces", titleAr: "المساحات التجارية", desc: "Retail units, office floors, and warehouses — fully navigable online.", descAr: "وحدات البيع بالتجزئة والطوابق المكتبية والمستودعات — قابلة للتنقل بالكامل عبر الإنترنت." },
      { title: "Co-Working & Serviced Offices", titleAr: "مساحات العمل المشترك", desc: "Give remote businesses a compelling reason to commit before visiting.", descAr: "أعط الشركات البعيدة سبباً مقنعاً للالتزام قبل الزيارة." },
    ],
    aiSection: {
      headline: "3D Rendering + Digital Twin Integration",
      headlineAr: "التصيير ثلاثي الأبعاد + التوأم الرقمي",
      body: "For off-plan or under-construction properties, X360 layers AI-rendered 3D visualisations into the virtual tour — creating a fully immersive pre-completion walkthrough. Combine with digital twin technology to showcase building systems, MEP layouts, and spatial data to investors and architects.",
      bodyAr: "للعقارات غير المكتملة أو قيد الإنشاء، تدمج X360 التصورات ثلاثية الأبعاد المُولّدة بالذكاء الاصطناعي في الجولة الافتراضية — مما يخلق جولة استكشافية غامرة قبل الاكتمال. ادمجها مع تقنية التوأم الرقمي لعرض أنظمة البناء وتخطيطات MEP والبيانات المكانية للمستثمرين والمعماريين.",
    },
    finalCta: {
      headline: "Transform Your Listings Into Immersive Experiences.",
      headlineAr: "حوّل قوائمك إلى تجارب غامرة.",
      sub: "Join the leading real estate developers in Saudi Arabia using X360 to close faster, reach further, and sell smarter.",
      subAr: "انضم إلى كبار المطورين العقاريين في المملكة العربية السعودية الذين يستخدمون X360 للإغلاق بشكل أسرع والوصول لآفاق أبعد والبيع بذكاء.",
    },
  },

  "hospitality": {
    slug: "hospitality",
    name: "Hotels & Resorts",
    nameAr: "الفنادق والمنتجعات",
    accentColor: "rgba(200,160,80,0.16)",
    hero: {
      label: "Hotels & Resorts",
      labelAr: "الفنادق والمنتجعات",
      headline: "LET GUESTS EXPERIENCE\nLUXURY BEFORE BOOKING.",
      headlineAr: "دع ضيوفك يختبرون\nالفخامة قبل الحجز.",
      sub: "Immersive virtual tours that convert browsers into bookers — and bookers into loyal guests.",
      subAr: "جولات افتراضية غامرة تحوّل المتصفحين إلى حاجزين — والحاجزين إلى ضيوف أوفياء.",
    },
    problems: [
      {
        iconKey: "Eye",
        title: "Guests Can't See What They're Booking",
        titleAr: "الضيوف لا يرون ما يحجزونه",
        desc: "Static photos fail to convey the true scale, ambiance, and luxury of your property — resulting in unmet expectations and negative reviews.",
        descAr: "الصور الثابتة لا تنقل الحجم الحقيقي والأجواء والفخامة لمنشأتك — مما يؤدي لتوقعات غير مُلباة وتقييمات سلبية.",
      },
      {
        iconKey: "TrendingDown",
        title: "Low Direct Booking Rates",
        titleAr: "معدلات الحجز المباشر منخفضة",
        desc: "Without immersive previews, guests default to OTA platforms — costing you 15–25% in commission on every booking.",
        descAr: "بدون معاينات غامرة، يلجأ الضيوف لمنصات الحجز الخارجية — مما يكلفك 15-25% عمولة على كل حجز.",
      },
      {
        iconKey: "MessageSquare",
        title: "Poor Online Representation",
        titleAr: "تمثيل إلكتروني ضعيف",
        desc: "Competitors with cinematic virtual experiences outperform standard listings in both visibility and conversion.",
        descAr: "المنافسون الذين يتميزون بتجارب افتراضية سينمائية يتفوقون في الظهور والتحويل على القوائم العادية.",
      },
      {
        iconKey: "Users",
        title: "Event & Conference Spaces Go Unseen",
        titleAr: "قاعات الفعاليات والمؤتمرات لا تُرى",
        desc: "Corporate clients need to visualise ballrooms and conference facilities before committing — static images rarely seal the deal.",
        descAr: "يحتاج العملاء المؤسسيون لتصور قاعات الاحتفالات ومرافق المؤتمرات قبل الالتزام — والصور الثابتة نادراً ما تُتم الصفقة.",
      },
    ],
    solutions: [
      {
        step: 1,
        headline: "Virtual Pre-Stay Experience",
        headlineAr: "تجربة ما قبل الإقامة الافتراضية",
        body: "Allow guests to walk through your lobby, suites, spa, pool, and dining areas before booking — building excitement and certainty simultaneously.",
        bodyAr: "اسمح للضيوف بالمشي عبر بهوك والأجنحة والسبا والمسبح وأماكن تناول الطعام قبل الحجز — مما يبني الحماس واليقين معاً.",
      },
      {
        step: 2,
        headline: "Full-Property Digital Showcase",
        headlineAr: "عرض رقمي شامل للمنشأة",
        body: "One seamless tour covers every touchpoint — from arrival driveway to penthouse suite — giving corporate bookers and travel agents the full picture.",
        bodyAr: "جولة واحدة سلسة تغطي كل نقطة تواصل — من ممر الوصول إلى الجناح البنتهاوس — مما يمنح حجاز الشركات ووكلاء السفر الصورة الكاملة.",
      },
      {
        step: 3,
        headline: "Suite & Amenity Upsell Engine",
        headlineAr: "محرك بيع إضافي للأجنحة والمرافق",
        body: "Embed virtual tours in booking flows to let guests upgrade rooms and packages after experiencing them first-hand — before they arrive.",
        bodyAr: "ادمج الجولات الافتراضية في تدفقات الحجز للسماح للضيوف بترقية الغرف والباقات بعد تجربتها — قبل وصولهم.",
      },
    ],
    showcase: {
      title: "The Digital Front Door of Your Property.",
      titleAr: "البوابة الرقمية لمنشأتك.",
      body: "Watch how X360 transforms a standard hotel website into a fully immersive booking journey — from lobby to rooftop.",
      bodyAr: "شاهد كيف تحوّل X360 موقع فندق عادي إلى رحلة حجز غامرة بالكامل — من البهو إلى السطح.",
      videoSrc: "/x360/industries/hospitality.mp4",
    },
    benefits: [
      { title: "Higher Direct Bookings", titleAr: "حجوزات مباشرة أعلى", body: "Properties with virtual tours see up to 67% increase in direct booking conversions.", bodyAr: "تشهد المنشآت ذات الجولات الافتراضية زيادة تصل إلى 67% في تحويلات الحجز المباشر." },
      { title: "Reduced Cancellations", titleAr: "تقليل الإلغاءات", body: "Guests who preview virtually arrive with accurate expectations — cutting post-arrival cancellations significantly.", bodyAr: "الضيوف الذين يشاهدون مسبقاً يصلون بتوقعات دقيقة — مما يقلل الإلغاءات بعد الوصول بشكل ملحوظ." },
      { title: "Room Upgrade Revenue", titleAr: "إيرادات ترقية الغرف", body: "Virtual suite previews in booking flows drive measurable suite and upgrade upsell revenue.", bodyAr: "معاينات الأجنحة الافتراضية في تدفقات الحجز تدفع إيرادات ملموسة من ترقيات الأجنحة." },
      { title: "Corporate Event Wins", titleAr: "كسب عقود الفعاليات المؤسسية", body: "Allow event planners to tour ballrooms, A/V setups, and catering areas — remotely, on their schedule.", bodyAr: "اسمح لمخططي الفعاليات بجولة في القاعات وإعدادات الصوت والصورة ومناطق تقديم الطعام — عن بعد، وفق جدولهم." },
    ],
    useCases: [
      { title: "Hotel Suites & Rooms", titleAr: "أجنحة وغرف الفندق", desc: "Showcase every room category — from standard to presidential suite.", descAr: "اعرض كل فئة غرفة — من القياسية إلى الجناح الرئاسي." },
      { title: "Resort Pools & Spa", titleAr: "المسابح والسبا في المنتجع", desc: "Let leisure guests preview outdoor spaces, pools, and wellness facilities.", descAr: "دع ضيوف الترفيه يشاهدون مسبقاً المساحات الخارجية والمسابح ومرافق العافية." },
      { title: "Ballrooms & Conference Halls", titleAr: "قاعات الاحتفال والمؤتمرات", desc: "Close corporate event contracts with immersive walkthroughs for remote planners.", descAr: "أتمم عقود الفعاليات المؤسسية بجولات استكشافية غامرة للمخططين عن بُعد." },
      { title: "Restaurants & Rooftops", titleAr: "المطاعم والأسطح", desc: "Drive F&B bookings and private dining reservations with atmospheric previews.", descAr: "زد حجوزات المطاعم وحجوزات العشاء الخاص من خلال معاينات الأجواء." },
    ],
    aiSection: {
      headline: "Spatial Intelligence for Hospitality",
      headlineAr: "الذكاء المكاني للضيافة",
      body: "X360 integrates with property management systems to overlay real-time room availability, dynamic pricing, and AI-powered room recommendations directly inside the virtual tour — creating a fully interactive booking experience powered by spatial data.",
      bodyAr: "تتكامل X360 مع أنظمة إدارة العقارات لعرض توفر الغرف الفعلي والأسعار الديناميكية وتوصيات الغرف المدعومة بالذكاء الاصطناعي مباشرة داخل الجولة الافتراضية — مما يخلق تجربة حجز تفاعلية بالكامل مدعومة بالبيانات المكانية.",
    },
    finalCta: {
      headline: "Turn Your Property Into a Destination — Before Guests Arrive.",
      headlineAr: "اجعل منشأتك وجهة — قبل وصول الضيوف.",
      sub: "Partner with X360 to deliver the most immersive hospitality experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة ضيافة غامرة في سوق الخليج العربي.",
    },
  },

  "luxury-private": {
    slug: "luxury-private",
    name: "Luxury & Private",
    nameAr: "الفئة الفاخرة والخاصة",
    accentColor: "rgba(210,175,110,0.16)",
    hero: {
      label: "Luxury & Private",
      labelAr: "الفئة الفاخرة والخاصة",
      headline: "BRING EXCLUSIVITY\nTO DISCERNING CLIENTS.",
      headlineAr: "أوصل الحصرية\nإلى العملاء المتميزين.",
      sub: "Ultra-premium virtual experiences that respect client privacy, elevate brand perception, and open doors without physical access.",
      subAr: "تجارب افتراضية فائقة التميز تحترم خصوصية العميل، وترتقي بتصور العلامة التجارية، وتفتح الأبواب دون وصول جسدي.",
    },
    problems: [
      {
        iconKey: "Lock",
        title: "Privacy Limits Access",
        titleAr: "الخصوصية تحدّ من الوصول",
        desc: "High-net-worth clients require discretion — open showings and site visits are not always appropriate for ultra-luxury properties.",
        descAr: "يتطلب العملاء ذوو الثروات العالية تكتماً — العروض المفتوحة والزيارات الميدانية ليست دائماً مناسبة للعقارات الفاخرة جداً.",
      },
      {
        iconKey: "Globe",
        title: "Global VIP Clients Are Unreachable",
        titleAr: "العملاء VIP العالميون بعيدو المنال",
        desc: "Clients in Monaco, Geneva, Hong Kong, or Riyadh can't always fly in for a viewing — limiting your global sales potential.",
        descAr: "العملاء في موناكو وجنيف وهونغ كونغ والرياض لا يستطيعون دائماً السفر للمشاهدة — مما يحدّ من إمكاناتك البيعية العالمية.",
      },
      {
        iconKey: "ImageOff",
        title: "Generic Media Doesn't Impress",
        titleAr: "الوسائط العادية لا تُبهر",
        desc: "Standard photography and video fall short of conveying the true luxury, craftsmanship, and prestige of ultra-premium offerings.",
        descAr: "التصوير الفوتوغرافي والفيديو القياسيان لا يُوصلان الفخامة الحقيقية والحرفية والمكانة للعروض الفاخرة جداً.",
      },
      {
        iconKey: "Briefcase",
        title: "Sales Cycles Are Too Long",
        titleAr: "دورات المبيعات طويلة جداً",
        desc: "Without immersive spatial confidence, even qualified buyers require extensive back-and-forth before committing to ultra-high-value decisions.",
        descAr: "بدون يقين مكاني غامر، يتطلب حتى المشترون المؤهلون مراسلات مكثفة قبل الالتزام بقرارات ذات قيمة عالية جداً.",
      },
    ],
    solutions: [
      {
        step: 1,
        headline: "Private Digital Showcases",
        headlineAr: "عروض رقمية خاصة",
        body: "Password-protected, invitation-only virtual tours deliver an exclusive first impression — accessible only to your pre-qualified audience.",
        bodyAr: "الجولات الافتراضية المحمية بكلمة مرور والمتاحة بالدعوة فقط تمنح انطباعاً أولياً حصرياً — متاحاً فقط لجمهورك المؤهل مسبقاً.",
      },
      {
        step: 2,
        headline: "VIP-Level Cinematic Presentation",
        headlineAr: "عرض سينمائي بمستوى VIP",
        body: "Ultra-high-resolution 360° captures with bespoke cinematic overlays communicate craftsmanship and prestige that standard media cannot.",
        bodyAr: "التقاطات 360° فائقة الدقة مع تراكبات سينمائية مخصصة تنقل الحرفية والمكانة التي لا تستطيع الوسائط القياسية توصيلها.",
      },
      {
        step: 3,
        headline: "Global Access, Zero Compromise",
        headlineAr: "وصول عالمي، لا تنازلات",
        body: "A secure link is all a VIP client needs — enabling your most exclusive offering to be experienced from any private residence or office, worldwide.",
        bodyAr: "رابط آمن هو كل ما يحتاجه عميل VIP — مما يتيح تجربة أكثر عروضك حصرية من أي منزل أو مكتب خاص، في أي مكان بالعالم.",
      },
    ],
    showcase: {
      title: "An Experience Worthy of Your Brand.",
      titleAr: "تجربة تليق بعلامتك التجارية.",
      body: "See how Saudi Arabia's most exclusive luxury brands use X360 to present their rarest offerings to global clients — with the discretion and polish they demand.",
      bodyAr: "شاهد كيف تستخدم أكثر العلامات التجارية الفاخرة حصرية في المملكة X360 لتقديم عروضها النادرة للعملاء العالميين — بالتكتم واللمسة الاحترافية التي يطلبونها.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "Discreet Client Engagement", titleAr: "تفاعل متكتم مع العملاء", body: "Private, password-protected tours that match the discretion your clientele expects.", bodyAr: "جولات خاصة محمية بكلمة مرور تتناسب مع التكتم الذي يتوقعه عملاؤك." },
      { title: "Elevated Brand Perception", titleAr: "تصور متعالي للعلامة التجارية", body: "Cinematic virtual experiences signal world-class quality before a word is spoken.", bodyAr: "التجارب الافتراضية السينمائية توصل الجودة العالمية قبل أن تُنطق كلمة." },
      { title: "Global VIP Reach", titleAr: "وصول VIP عالمي", body: "Connect qualified ultra-high-net-worth clients across continents without logistics barriers.", bodyAr: "تواصل مع العملاء المؤهلين ذوي الثروات الضخمة عبر القارات دون حواجز لوجستية." },
      { title: "Higher Close Rates", titleAr: "معدلات إغلاق أعلى", body: "Spatial immersion builds the confidence that shortens hesitation and accelerates commitment.", bodyAr: "الانغماس المكاني يبني الثقة التي تقلص التردد وتُسرّع الالتزام." },
    ],
    useCases: [
      { title: "Ultra-Luxury Private Estates", titleAr: "العقارات الخاصة الفاخرة جداً", desc: "Showcase private compounds, villas, and palace residences to invitation-only clientele.", descAr: "اعرض المجمعات الخاصة والفيلات والمساكن الفاخرة للعملاء المدعوين فقط." },
      { title: "Exclusive Showrooms", titleAr: "صالات العرض الحصرية", desc: "Automotive, jewellery, fashion, and bespoke furniture — virtually showcased in full-luxury detail.", descAr: "السيارات والمجوهرات والأزياء والأثاث المخصص — معروضة افتراضياً بكامل التفاصيل الفاخرة." },
      { title: "Members Clubs & Lounges", titleAr: "نوادي الأعضاء والصالات الراقية", desc: "Give prospective members an immersive preview of facilities, culture, and exclusivity.", descAr: "أعط الأعضاء المحتملين معاينة غامرة للمرافق والثقافة والحصرية." },
      { title: "Yacht & Private Aviation", titleAr: "اليخوت والطيران الخاص", desc: "Showcase high-value assets to global buyers with photorealistic spatial walkthroughs.", descAr: "اعرض الأصول عالية القيمة للمشترين العالميين من خلال جولات مكانية فوتوغرافية الواقعية." },
    ],
    aiSection: {
      headline: "Digital Twin Technology for Ultra-Premium Assets",
      headlineAr: "تقنية التوأم الرقمي للأصول الفاخرة جداً",
      body: "For the most exclusive properties and assets, X360 builds full digital twins — spatially accurate 3D models that can be enhanced with AI material renders, custom lighting simulations, and exclusive content layers accessible only to authenticated VIP clients.",
      bodyAr: "للعقارات والأصول الأكثر حصرية، تبني X360 توائم رقمية كاملة — نماذج ثلاثية الأبعاد دقيقة مكانياً يمكن تحسينها بتصيير مواد الذكاء الاصطناعي ومحاكاة الإضاءة المخصصة وطبقات المحتوى الحصرية المتاحة فقط لعملاء VIP الموثّقين.",
    },
    finalCta: {
      headline: "Present the Extraordinary. Close the Exceptional.",
      headlineAr: "قدّم الاستثنائي. أتمم الفريد.",
      sub: "X360 builds the most immersive, private, and cinematic virtual experiences for Saudi Arabia's ultra-luxury sector.",
      subAr: "تبني X360 أكثر التجارب الافتراضية غموضاً وخصوصية وسينمائية لقطاع الفخامة الفاخر في المملكة العربية السعودية.",
    },
  },
};

export function getIndustry(slug: string): IndustryData | null {
  return INDUSTRIES[slug] ?? null;
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRIES);
}
