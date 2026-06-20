import type { IndustryData } from "./tour-industries";

const SIBLINGS = [
  { slug: "villa-apartment", label: "Villas & Apartments", labelAr: "الفيلات والشقق" },
  { slug: "coworking",       label: "Co-Working",          labelAr: "مساحات العمل المشترك" },
  { slug: "industrial",      label: "Industrial",          labelAr: "المنشآت الصناعية" },
  { slug: "construction",    label: "Construction",        labelAr: "مواقع البناء" },
  { slug: "compound",        label: "Compounds",           labelAr: "المجمعات السكنية" },
];
const PARENT = "/virtual-tours/real-estate";
const ACCENT = "rgba(100,160,255,0.16)";

const REAL_ESTATE_CATEGORIES: Record<string, IndustryData> = {

  "villa-apartment": {
    slug: "villa-apartment",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Villas & Apartments",
    nameAr: "الفيلات والشقق",
    accentColor: ACCENT,
    hero: {
      label: "Real Estate",        labelAr: "العقارات",
      headline: "SELL HOMES BEFORE\nBUYERS EVER VISIT.",
      headlineAr: "بِع المنازل\nقبل أن يزورها المشترون.",
      sub: "Transform residential listings into immersive walkthroughs that drive faster decisions and higher offers — from anywhere in the world.",
      subAr: "حوّل قوائمك السكنية إلى جولات غامرة تدفع قرارات أسرع وعروضاً أعلى — من أي مكان في العالم.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/videos/real-estate-villa.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe",     title: "International Buyers Can't Visit",  titleAr: "المشترون الدوليون لا يستطيعون الزيارة", desc: "High-value residential clients across GCC and Europe cannot always make physical visits — meaning deals fall apart before they start.", descAr: "لا يستطيع العملاء السكنيون في الخليج وأوروبا دائماً إجراء زيارات فعلية — مما يُفضي إلى انهيار الصفقات قبل أن تبدأ." },
      { iconKey: "ImageOff",  title: "Photos Miss the Real Feel",        titleAr: "الصور لا توصل الإحساس الحقيقي",    desc: "2D photos fail to convey scale, natural light, and premium finishes — losing buyers before they commit.",                              descAr: "تفشل الصور ثنائية الأبعاد في نقل الحجم والإضاءة الطبيعية والتشطيبات — مما يُفقد المشترين قبل التزامهم." },
      { iconKey: "Clock",     title: "Multiple Visits Slow Sales",       titleAr: "الزيارات المتعددة تُبطئ المبيعات", desc: "Without spatial confidence buyers schedule visit after visit — dragging the sales cycle and raising your cost per deal.",              descAr: "بدون يقين مكاني يجدول المشترون زيارة تلو الأخرى — مما يُطيل دورة المبيعات ويرفع تكلفة كل صفقة." },
      { iconKey: "Building2", title: "Off-Plan Units Are Invisible",     titleAr: "الوحدات على الخريطة غير مرئية",    desc: "Buyers struggle to visualise uncompleted villas and apartments — causing hesitation that kills pre-sales revenue.",                  descAr: "يجد المشترون صعوبة في تصور الفيلات غير المكتملة — مما يسبب تردداً يُميت إيرادات ما قبل البيع." },
    ],
    solutions: [
      { step: 1, headline: "Photorealistic 360° Walkthroughs", headlineAr: "جولات استكشافية 360° فائقة الواقعية", body: "Every room, outdoor space, and finishing detail is captured in stunning 360° — letting buyers feel presence and ownership before setting foot on-site.", bodyAr: "كل غرفة ومساحة خارجية وتفصيلة تشطيب تُلتقط بـ 360° رائع — مما يمنح المشترين إحساس الحضور والملكية قبل الزيارة." },
      { step: 2, headline: "24/7 Accessible Listings",         headlineAr: "قوائم متاحة على مدار الساعة",        body: "Share a single link and your property reaches qualified buyers worldwide — on any device, at any time.",                                                     bodyAr: "شارك رابطاً واحداً وسيصل عقارك إلى مشترين مؤهلين حول العالم — على أي جهاز، في أي وقت." },
      { step: 3, headline: "Spatial Confidence That Closes",   headlineAr: "يقين مكاني يُغلق الصفقات",          body: "Buyers who complete a full virtual walkthrough arrive at physical visits already decided — dramatically shortening your sales cycle.",                     bodyAr: "المشترون الذين يكملون جولة افتراضية كاملة يصلون للزيارة الفعلية وقد اتخذوا قرارهم — مما يقلص دورة المبيعات بشكل كبير." },
    ],
    showcase: { title: "From Listing to Closing — Faster.", titleAr: "من القائمة إلى الإغلاق — بشكل أسرع.", body: "See how Saudi Arabia's top residential developers use X360 to pre-sell luxury villas and apartment towers months ahead of completion.", bodyAr: "شاهد كيف يستخدم كبار مطوري السكن X360 لبيع الفيلات والأبراج مسبقاً قبل أشهر من الاكتمال.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Faster Purchase Decisions", titleAr: "قرارات شراء أسرع",        body: "Virtual tour listings convert 74% faster than standard photo listings.",             bodyAr: "قوائم الجولات الافتراضية تُحوّل بنسبة 74% أسرع من قوائم الصور." },
      { title: "Global Buyer Reach",        titleAr: "وصول لمشترين عالميين",    body: "Reach GCC, European, and Asian buyers without physical site visits.",                bodyAr: "الوصول إلى مشترين من دول الخليج وأوروبا وآسيا دون زيارات ميدانية." },
      { title: "Higher Listing Value",      titleAr: "قيمة قائمة أعلى",         body: "Properties with immersive tours command premium pricing and faster offers.",          bodyAr: "العقارات ذات الجولات الغامرة تستدعي أسعاراً أعلى وعروضاً أسرع." },
      { title: "Off-Plan Pre-Sales",        titleAr: "مبيعات مسبقة على الخريطة", body: "AI-rendered 3D previews convert off-plan sceptics into committed buyers.",           bodyAr: "المعاينات المُولّدة بالذكاء الاصطناعي تُحوّل المشككين إلى مشترين ملتزمين." },
    ],
    useCases: [
      { title: "Luxury Villas",        titleAr: "الفيلات الفاخرة",          desc: "Showcase premium residential properties to elite buyers globally.",            descAr: "اعرض العقارات السكنية الراقية على المشترين المتميزين عالمياً." },
      { title: "Apartment Towers",     titleAr: "أبراج الشقق",               desc: "Present every floor plan and unit type with immersive walkthroughs.",         descAr: "قدّم كل مخطط طابق ونوع وحدة بجولات غامرة." },
      { title: "Off-Plan Projects",    titleAr: "المشاريع على الخريطة",      desc: "Pre-sell units with AI-rendered tours before construction completes.",        descAr: "بِع الوحدات مسبقاً قبل اكتمال البناء." },
      { title: "Serviced Apartments",  titleAr: "الشقق المفروشة",            desc: "Maximise occupancy with immersive previews that reduce vacancy time.",        descAr: "زِد معدل الإشغال بمعاينات غامرة تقلل وقت الشغور." },
    ],
    aiSection: { headline: "AI-Rendered Off-Plan Walkthroughs", headlineAr: "جولات على الخريطة بالذكاء الاصطناعي", body: "For unbuilt or under-construction properties, X360 creates fully immersive AI-rendered walkthroughs from architectural drawings — letting buyers experience completed spaces before a single wall is built.", bodyAr: "للعقارات غير المبنية أو قيد الإنشاء، تُنشئ X360 جولات غامرة بالكامل من الرسومات المعمارية — مما يتيح للمشترين تجربة المساحات قبل بناء جدار واحد." },
    finalCta: { headline: "Transform Your Residential Listings Into Immersive Experiences.", headlineAr: "حوّل قوائمك السكنية إلى تجارب غامرة.", sub: "Join Saudi Arabia's leading developers using X360 to close faster, reach further, and sell smarter.", subAr: "انضم إلى كبار المطورين الذين يستخدمون X360 للإغلاق بشكل أسرع والوصول لآفاق أبعد." },
  },

  "coworking": {
    slug: "coworking",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Co-Working Spaces",
    nameAr: "مساحات العمل المشترك",
    accentColor: "rgba(120,200,220,0.14)",
    hero: {
      label: "Real Estate",     labelAr: "العقارات",
      headline: "FILL YOUR DESKS\nBEFORE THEY VISIT.",
      headlineAr: "املأ مقاعدك\nقبل أن يزوروا المكان.",
      sub: "Give remote teams and entrepreneurs a complete virtual preview of your co-working space — driving faster sign-ups and higher occupancy.",
      subAr: "أعطِ الفرق البعيدة ورواد الأعمال معاينة افتراضية كاملة لمساحة عملك — لتسريع التسجيل وزيادة الإشغال.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/coworking.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe",        title: "Remote Teams Can't Evaluate On-Site", titleAr: "الفرق البعيدة لا تستطيع التقييم الميداني", desc: "Decision-makers in distributed companies need to assess facilities before committing — without the ability to visit every city.", descAr: "صانعو القرار في الشركات الموزعة يحتاجون لتقييم المرافق قبل الالتزام — دون إمكانية زيارة كل مدينة." },
      { iconKey: "ImageOff",     title: "Static Photos Undersell the Atmosphere", titleAr: "الصور الثابتة لا تبيع الأجواء",            desc: "The energy, layout, and community feel of a co-working space cannot be captured in flat photography.", descAr: "لا يمكن التقاط طاقة مساحة العمل وتخطيطها وروحها المجتمعية بالتصوير المسطح." },
      { iconKey: "Users",        title: "High Tenant Churn Rate",               titleAr: "معدل دوران عالٍ للمستأجرين",               desc: "Without experiencing the space first, members sign up with misaligned expectations — leading to cancellations.", descAr: "بدون تجربة المساحة أولاً، يسجل الأعضاء بتوقعات غير متوافقة — مما يؤدي إلى الإلغاءات." },
      { iconKey: "Clock",        title: "Long Sales Cycles for Private Offices", titleAr: "دورات مبيعات طويلة للمكاتب الخاصة",       desc: "Corporate clients renting private floors require multiple site visits before committing — slowing your revenue pipeline.", descAr: "العملاء المؤسسيون يتطلبون زيارات ميدانية متعددة قبل الالتزام — مما يُبطئ مسار إيراداتك." },
    ],
    solutions: [
      { step: 1, headline: "Immersive Space Previews",      headlineAr: "معاينات مكانية غامرة",            body: "Tour every hot-desk zone, private office, meeting room, and lounge in full 360° — giving prospects the real feel of your space.", bodyAr: "جولة في كل منطقة عمل مفتوحة ومكتب خاص وغرفة اجتماعات وصالة بـ 360° كامل." },
      { step: 2, headline: "Always-On Virtual Showroom",    headlineAr: "معرض افتراضي دائم التشغيل",       body: "Your space is available for preview 24/7 — enabling remote decision-makers to evaluate and commit on their own schedule.", bodyAr: "مساحتك متاحة للمعاينة على مدار الساعة — مما يمكّن صانعي القرار عن بُعد من التقييم والالتزام وفق جدولهم." },
      { step: 3, headline: "Reduce Churn Through Clarity",  headlineAr: "قلل الدوران من خلال الوضوح",      body: "When members truly know what they're joining, they arrive with aligned expectations — significantly cutting early cancellation rates.", bodyAr: "عندما يعرف الأعضاء حقاً ما ينضمون إليه، يصلون بتوقعات متوافقة — مما يقلص معدلات الإلغاء المبكرة بشكل كبير." },
    ],
    showcase: { title: "Experience the Space. Then Sign the Lease.", titleAr: "عِش تجربة المساحة. ثم وقّع العقد.", body: "See how X360 helps co-working operators across Saudi Arabia fill private offices and flex desks faster with immersive virtual previews.", bodyAr: "شاهد كيف تساعد X360 مشغلي مساحات العمل في ملء المكاتب والمقاعد المرنة بشكل أسرع.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Higher Conversion Rate",  titleAr: "معدل تحويل أعلى",         body: "Prospects who tour virtually are 3× more likely to convert to paid memberships.",    bodyAr: "المحتملون الذين يزورون افتراضياً أكثر عرضة بـ 3 أضعاف للتحويل إلى عضويات مدفوعة." },
      { title: "Reduced Cancellations",   titleAr: "تقليل الإلغاءات",         body: "Members who preview spaces arrive with accurate expectations — reducing early churn.", bodyAr: "الأعضاء الذين يشاهدون مسبقاً يصلون بتوقعات دقيقة — مما يقلل الدوران المبكر." },
      { title: "Remote-First Signups",    titleAr: "تسجيلات عن بُعد أولاً",   body: "Sign up corporate clients across cities and time zones without a single site visit.", bodyAr: "سجّل عملاء مؤسسيين عبر المدن والمناطق الزمنية دون زيارة ميدانية واحدة." },
      { title: "Premium Brand Signal",    titleAr: "إشارة علامة تجارية مميزة", body: "A cinematic virtual tour positions your co-working brand as premium and modern.",     bodyAr: "جولة افتراضية سينمائية تضع علامتك التجارية كمساحة عمل متميزة وحديثة." },
    ],
    useCases: [
      { title: "Hot-Desk & Flex Zones",  titleAr: "مناطق العمل المرن",       desc: "Show the energy and layout of open-plan work areas to individual members.", descAr: "أظهر طاقة وتخطيط مناطق العمل المفتوحة للأعضاء الفرديين." },
      { title: "Private Offices",        titleAr: "المكاتب الخاصة",           desc: "Present dedicated office suites to corporate clients remotely.",           descAr: "قدّم أجنحة المكاتب المخصصة للعملاء المؤسسيين عن بُعد." },
      { title: "Meeting Rooms",          titleAr: "غرف الاجتماعات",           desc: "Help teams book confidently by showing room capacity and setups.",         descAr: "ساعد الفرق على الحجز بثقة من خلال عرض السعة والإعدادات." },
      { title: "Lounge & Amenities",     titleAr: "الصالات والمرافق",         desc: "Drive membership upgrades by showcasing premium lifestyle features.",      descAr: "زِد ترقيات العضوية من خلال عرض ميزات أسلوب الحياة المتميزة." },
    ],
    aiSection: { headline: "Occupancy Intelligence Dashboard", headlineAr: "لوحة تحكم ذكاء الإشغال", body: "X360 can overlay live desk availability, pricing tiers, and AI-powered layout recommendations directly inside the virtual tour — turning every preview into a conversion-ready interactive experience.", bodyAr: "يمكن لـ X360 عرض توفر المقاعد الحية ومستويات الأسعار وتوصيات التخطيط بالذكاء الاصطناعي مباشرة داخل الجولة الافتراضية." },
    finalCta: { headline: "Fill Your Co-Working Space Faster Than Ever.", headlineAr: "املأ مساحة عملك بشكل أسرع من أي وقت مضى.", sub: "Partner with X360 to deliver immersive space previews that convert browsers into members.", subAr: "تشارك مع X360 لتقديم معاينات مكانية غامرة تُحوّل المتصفحين إلى أعضاء." },
  },

  "industrial": {
    slug: "industrial",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Industrial Facilities",
    nameAr: "المنشآت الصناعية",
    accentColor: "rgba(180,140,80,0.14)",
    hero: {
      label: "Real Estate",        labelAr: "العقارات",
      headline: "SHOWCASE INDUSTRIAL\nSPACES GLOBALLY.",
      headlineAr: "اعرض المنشآت الصناعية\nعلى مستوى عالمي.",
      sub: "Virtual tours that let manufacturers, logistics firms, and investors evaluate industrial facilities — without the cost of site travel.",
      subAr: "جولات افتراضية تتيح للمصنّعين وشركات الخدمات اللوجستية والمستثمرين تقييم المنشآت الصناعية دون تكاليف السفر.",
      videoSrc: "/x360/industrial.mp4",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe",    title: "Investors Are Globally Dispersed",      titleAr: "المستثمرون منتشرون عالمياً",            desc: "Industrial property buyers in GCC, Asia, and Europe cannot afford to fly in for every preliminary inspection.", descAr: "مشترو العقارات الصناعية في الخليج وآسيا وأوروبا لا يستطيعون تحمّل تكاليف السفر لكل معاينة أولية." },
      { iconKey: "Building2", title: "Scale & Capacity Are Hard to Convey",  titleAr: "يصعب نقل الحجم والطاقة الاستيعابية",   desc: "Photos cannot communicate the true scale of warehouse bays, production lines, or loading dock configurations.", descAr: "لا تستطيع الصور نقل الحجم الحقيقي لمناطق المستودعات وخطوط الإنتاج وتكوينات رصيف التحميل." },
      { iconKey: "Clock",    title: "Site Inspections Are Expensive",        titleAr: "الفحص الميداني مكلف",                  desc: "Each physical site visit for large industrial properties requires coordination, travel, and lost productivity time.", descAr: "كل زيارة ميدانية للمنشآت الصناعية الكبيرة تتطلب تنسيقاً وسفراً ووقتاً ضائعاً." },
      { iconKey: "Briefcase", title: "Leasing Decisions Are Slow",           titleAr: "قرارات الإيجار بطيئة",                 desc: "Industrial tenants need deep spatial confidence before committing to multi-year, high-value leases.", descAr: "يحتاج المستأجرون الصناعيون لثقة مكانية عميقة قبل الالتزام بعقود إيجار متعددة السنوات وعالية القيمة." },
    ],
    solutions: [
      { step: 1, headline: "Full-Facility 360° Documentation", headlineAr: "توثيق 360° كامل للمنشأة",   body: "Capture every warehouse bay, production floor, office area, and external yard in photorealistic 360° — giving remote evaluators the full picture.", bodyAr: "التقط كل منطقة مستودع وأرضية إنتاج ومنطقة مكتبية وفناء خارجي بـ 360° فوتوغرافي الواقعية." },
      { step: 2, headline: "Remote Due Diligence Ready",        headlineAr: "جاهز للعناية الواجبة عن بُعد", body: "Allow investors, operators, and lenders to complete preliminary due diligence virtually — cutting time-to-decision significantly.", bodyAr: "اسمح للمستثمرين والمشغلين والمقرضين بإتمام العناية الواجبة الأولية افتراضياً — مما يقلص الوقت اللازم للقرار." },
      { step: 3, headline: "Lease Faster, Negotiate Smarter",  headlineAr: "أجّر بشكل أسرع، تفاوض بذكاء", body: "Tenants who explore facilities virtually arrive at lease negotiations with full spatial context — shortening negotiation cycles.", bodyAr: "المستأجرون الذين يستكشفون افتراضياً يصلون إلى مفاوضات الإيجار بسياق مكاني كامل — مما يقصّر دورات التفاوض." },
    ],
    showcase: { title: "Every Square Metre. Every Detail. Globally Accessible.", titleAr: "كل متر مربع. كل تفصيلة. متاح عالمياً.", body: "See how X360 helps industrial property owners across Saudi Arabia and the GCC lease faster by giving global tenants full remote access.", bodyAr: "شاهد كيف تساعد X360 أصحاب العقارات الصناعية على التأجير بشكل أسرع.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Remote Investor Access",   titleAr: "وصول المستثمر عن بُعد",    body: "Global investors evaluate facilities without travel — accelerating acquisition decisions.",            bodyAr: "يقيّم المستثمرون العالميون المنشآت دون سفر — مما يُسرّع قرارات الاستحواذ." },
      { title: "Shorter Lease Cycles",     titleAr: "دورات إيجار أقصر",          body: "Tenants with full spatial context need fewer negotiation rounds before committing.",                   bodyAr: "المستأجرون ذوو السياق المكاني الكامل يحتاجون جولات تفاوض أقل قبل الالتزام." },
      { title: "Premium Facility Branding", titleAr: "تأهيل المنشأة بشكل احترافي", body: "Cinematic virtual tours signal modern, investment-grade industrial assets to the market.",          bodyAr: "الجولات الافتراضية السينمائية توصل أصول صناعية حديثة واستثمارية للسوق." },
      { title: "Lower Inspection Costs",   titleAr: "تكاليف فحص أقل",            body: "Reduce the number of physical site visits required before shortlisting — saving time and money.",    bodyAr: "قلل عدد الزيارات الميدانية المطلوبة قبل الاختيار — توفيراً للوقت والمال." },
    ],
    useCases: [
      { title: "Warehouses & Logistics",  titleAr: "المستودعات والخدمات اللوجستية", desc: "Present storage bay dimensions, loading configurations, and access routes.", descAr: "قدّم أبعاد مناطق التخزين وتكوينات التحميل وطرق الوصول." },
      { title: "Manufacturing Plants",    titleAr: "المصانع",                        desc: "Showcase production line layouts and facility capacity to operators.",       descAr: "اعرض تخطيطات خط الإنتاج وطاقة المنشأة للمشغلين." },
      { title: "Showroom Warehouses",     titleAr: "مستودعات المعارض",               desc: "Help distributors and retailers assess combined storage and display space.",  descAr: "ساعد الموزعين وتجار التجزئة على تقييم مساحة التخزين والعرض المشتركة." },
      { title: "Industrial Compounds",    titleAr: "المجمعات الصناعية",              desc: "Give investors a complete overview of multi-unit industrial estates.",        descAr: "أعطِ المستثمرين نظرة كاملة على عقارات صناعية متعددة الوحدات." },
    ],
    aiSection: { headline: "Digital Twin for Industrial Assets", headlineAr: "التوأم الرقمي للأصول الصناعية", body: "X360 can layer digital twin data — including MEP systems, structural layouts, and capacity metrics — directly inside your industrial virtual tour, creating an interactive asset intelligence platform for investors and operators.", bodyAr: "يمكن لـ X360 إضافة بيانات التوأم الرقمي — بما فيها أنظمة MEP والتخطيطات الهيكلية — مباشرة داخل جولتك الافتراضية الصناعية." },
    finalCta: { headline: "Put Your Industrial Facility in Front of the World.", headlineAr: "ضع منشأتك الصناعية أمام العالم.", sub: "Partner with X360 to make your industrial assets globally accessible and inspection-ready — without travel.", subAr: "تشارك مع X360 لجعل أصولك الصناعية متاحة عالمياً وجاهزة للفحص — دون سفر." },
  },

  "construction": {
    slug: "construction",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Construction Sites",
    nameAr: "مواقع البناء",
    accentColor: "rgba(220,160,60,0.14)",
    hero: {
      label: "Real Estate",      labelAr: "العقارات",
      headline: "DOCUMENT PROGRESS.\nCLOSE DEALS EARLY.",
      headlineAr: "وثّق التقدم.\nأغلق الصفقات مبكراً.",
      sub: "360° construction site documentation that builds investor confidence, accelerates pre-sales, and keeps all stakeholders aligned in real time.",
      subAr: "توثيق 360° لمواقع البناء يبني ثقة المستثمرين ويُسرّع ما قبل البيع ويُبقي جميع أصحاب المصلحة متوافقين في الوقت الفعلي.",
      videoSrc: "/x360/videos/real-estate-construction.mp4",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Eye",      title: "Investors Can't See Progress",      titleAr: "المستثمرون لا يستطيعون رؤية التقدم",   desc: "Off-site stakeholders have no reliable way to monitor construction progress — creating anxiety and communication gaps.", descAr: "لا يملك أصحاب المصلحة خارج الموقع وسيلة موثوقة لمراقبة تقدم البناء — مما يخلق قلقاً وفجوات تواصل." },
      { iconKey: "Building2", title: "Pre-Sales Are Difficult Without Visuals", titleAr: "يصعب البيع المسبق بدون مرئيات", desc: "Selling off-plan units is significantly harder without compelling visual evidence of progress and quality.", descAr: "بيع الوحدات على الخريطة أصعب بكثير بدون دليل بصري مقنع على التقدم والجودة." },
      { iconKey: "Users",    title: "Remote Team Coordination Breaks Down", titleAr: "تنسيق الفريق عن بُعد ينهار",       desc: "Architects, engineers, and clients in different locations struggle to maintain shared spatial awareness of site conditions.", descAr: "يعاني المعماريون والمهندسون والعملاء في مواقع مختلفة من الحفاظ على وعي مكاني مشترك بأحوال الموقع." },
      { iconKey: "Clock",    title: "Documentation Is Incomplete",        titleAr: "التوثيق غير مكتمل",                 desc: "Traditional site photography misses hidden areas, service routes, and structural details critical for compliance and handover.", descAr: "يفوّت التصوير الموقعي التقليدي المناطق المخفية والمسارات الخدمية والتفاصيل الهيكلية الحيوية للامتثال والتسليم." },
    ],
    solutions: [
      { step: 1, headline: "Immersive Progress Documentation", headlineAr: "توثيق تقدم غامر",                    body: "Regular 360° site captures create a time-stamped visual record of every stage — keeping investors and clients informed and confident.", bodyAr: "التقاطات 360° الموقعية الدورية تُنشئ سجلاً بصرياً مُختوماً بالوقت لكل مرحلة — مما يبقي المستثمرين والعملاء على اطلاع وثقة." },
      { step: 2, headline: "Pre-Sales Visual Evidence",        headlineAr: "دليل بصري لما قبل البيع",             body: "Share live construction progress tours with prospective buyers — converting sceptics into committed purchasers with visual certainty.", bodyAr: "شارك جولات تقدم البناء الحية مع المشترين المحتملين — مما يُحوّل المشككين إلى مشترين ملتزمين بيقين بصري." },
      { step: 3, headline: "Remote Stakeholder Alignment",    headlineAr: "توافق أصحاب المصلحة عن بُعد",         body: "Give architects, contractors, and clients a shared visual workspace — eliminating miscommunication and reducing costly rework.", bodyAr: "أعطِ المعماريين والمقاولين والعملاء مساحة عمل بصرية مشتركة — مما يزيل سوء التواصل ويقلل إعادة العمل المكلفة." },
    ],
    showcase: { title: "Every Stage. Every Detail. Every Stakeholder.", titleAr: "كل مرحلة. كل تفصيلة. كل صاحب مصلحة.", body: "See how X360 helps Saudi Arabia's leading construction groups maintain investor confidence and accelerate pre-sales with live site documentation.", bodyAr: "شاهد كيف تساعد X360 مجموعات البناء الرائدة على الحفاظ على ثقة المستثمرين وتسريع المبيعات المسبقة.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Investor Confidence",    titleAr: "ثقة المستثمر",              body: "Real-time progress documentation keeps investors confident and reduces disputes.", bodyAr: "توثيق التقدم الفعلي يبقي المستثمرين واثقين ويقلل النزاعات." },
      { title: "Faster Pre-Sales",       titleAr: "مبيعات مسبقة أسرع",         body: "Visual progress evidence converts off-plan sceptics into committed buyers.",     bodyAr: "دليل التقدم البصري يُحوّل المشككين في الخريطة إلى مشترين ملتزمين." },
      { title: "Remote Collaboration",   titleAr: "تعاون عن بُعد",             body: "Architects, engineers, and clients stay aligned without repeated site visits.",  bodyAr: "يبقى المعماريون والمهندسون والعملاء متوافقين دون زيارات موقعية متكررة." },
      { title: "Compliance Documentation", titleAr: "توثيق الامتثال",          body: "Complete photographic records support handover, snag lists, and compliance.",    bodyAr: "سجلات التصوير الكاملة تدعم التسليم وقوائم العيوب والامتثال." },
    ],
    useCases: [
      { title: "Residential Developments", titleAr: "المشاريع السكنية",     desc: "Document villa and apartment construction progress for off-plan buyers.",   descAr: "وثّق تقدم بناء الفيلات والشقق للمشترين على الخريطة." },
      { title: "Commercial Projects",      titleAr: "المشاريع التجارية",    desc: "Keep corporate tenants and investors updated on commercial build progress.", descAr: "أبقِ المستأجرين المؤسسيين والمستثمرين على اطلاع بتقدم البناء التجاري." },
      { title: "Infrastructure Works",     titleAr: "أعمال البنية التحتية", desc: "Provide government and utility clients with immersive site documentation.", descAr: "زوّد الجهات الحكومية وعملاء الخدمات بتوثيق موقعي غامر." },
      { title: "Mixed-Use Developments",   titleAr: "المشاريع متعددة الاستخدام", desc: "Capture the complexity of large-scale mixed-use projects for all stakeholders.", descAr: "التقط تعقيد المشاريع الكبيرة متعددة الاستخدام لجميع أصحاب المصلحة." },
    ],
    aiSection: { headline: "AI-Powered Construction Progress Analytics", headlineAr: "تحليلات تقدم البناء بالذكاء الاصطناعي", body: "X360's construction documentation platform can layer AI progress comparison — showing changes between visits, flagging deviations from plans, and generating automated progress reports for investors and compliance teams.", bodyAr: "يمكن لمنصة توثيق البناء في X360 إضافة مقارنة تقدم بالذكاء الاصطناعي — تُظهر التغييرات بين الزيارات وتُبرز الانحرافات عن الخطط." },
    finalCta: { headline: "Keep Every Stakeholder Confident. Close Pre-Sales Faster.", headlineAr: "أبقِ كل صاحب مصلحة واثقاً. أغلق المبيعات المسبقة بشكل أسرع.", sub: "Partner with X360 to deliver immersive construction documentation that builds confidence and accelerates decisions.", subAr: "تشارك مع X360 لتقديم توثيق بناء غامر يبني الثقة ويُسرّع القرارات." },
  },

  "compound": {
    slug: "compound",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Residential Compounds",
    nameAr: "المجمعات السكنية",
    accentColor: "rgba(100,200,150,0.14)",
    hero: {
      label: "Real Estate",        labelAr: "العقارات",
      headline: "SHOW THE FULL LIFE.\nNOT JUST THE UNIT.",
      headlineAr: "أظهر الحياة الكاملة.\nليس الوحدة فحسب.",
      sub: "Immersive compound tours that showcase amenities, community spaces, and unit interiors — converting browsers into long-term residents.",
      subAr: "جولات مجمع غامرة تعرض المرافق والمساحات المجتمعية وداخل الوحدات — تُحوّل المتصفحين إلى سكان طويلي الأمد.",
      videoSrc: "/x360/compound.mp4",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Home",     title: "Amenities Are the Selling Point — Not the Flat", titleAr: "المرافق هي نقطة البيع — ليس الشقة",  desc: "Buyers choosing compounds prioritise community amenities, security, and lifestyle — yet these are rarely showcased effectively.", descAr: "المشترون الذين يختارون المجمعات يُعطون الأولوية لمرافق المجتمع والأمن وأسلوب الحياة — ومع ذلك نادراً ما تُعرض هذه الجوانب بفعالية." },
      { iconKey: "Globe",    title: "Relocating Families Can't Visit Before Deciding", titleAr: "العائلات المنتقلة لا تستطيع الزيارة قبل القرار", desc: "Corporate relocations and international families need to choose a compound without being physically present in the country.", descAr: "الانتقالات المؤسسية والعائلات الدولية تحتاج لاختيار مجمع دون التواجد الجسدي في البلد." },
      { iconKey: "ImageOff", title: "Photos Can't Capture Community Scale",           titleAr: "الصور لا تستطيع التقاط حجم المجتمع",        desc: "The swimming pool, gymnasium, parks, and security infrastructure cannot be communicated in a brochure or photo gallery.", descAr: "لا يمكن توصيل حمام السباحة والصالة الرياضية والحدائق والبنية التحتية الأمنية في كتيب أو معرض صور." },
      { iconKey: "Users",    title: "High Vacancy Rates in Premium Compounds",       titleAr: "معدلات شغور عالية في المجمعات المتميزة",     desc: "Premium compounds lose prospective residents to competitors with better online presence despite having superior facilities.", descAr: "تخسر المجمعات المتميزة السكان المحتملين للمنافسين ذوي الحضور الإلكتروني الأفضل رغم امتلاكهم مرافق متفوقة." },
    ],
    solutions: [
      { step: 1, headline: "Full Compound Walkthrough",   headlineAr: "جولة استكشافية كاملة للمجمع", body: "Capture every amenity — pool, gym, gardens, retail, and security perimeter — in one seamless 360° experience that showcases compound life in full.", bodyAr: "التقط كل مرفق — مسبح وصالة رياضية وحدائق وتجزئة ومحيط أمني — في تجربة 360° سلسة واحدة تعرض حياة المجمع بالكامل." },
      { step: 2, headline: "Unit Interiors on Demand",    headlineAr: "داخل الوحدات عند الطلب",      body: "Link every unit type — villa, townhouse, apartment — to its own 360° walkthrough, allowing remote families to self-serve their evaluation.", bodyAr: "اربط كل نوع وحدة — فيلا وتاونهاوس وشقة — بجولته الاستكشافية الخاصة بـ 360°، مما يتيح للعائلات البعيدة تقييماً ذاتياً." },
      { step: 3, headline: "Remote Leasing for Relocating Families", headlineAr: "تأجير عن بُعد للعائلات المنتقلة", body: "Share a compound tour link with incoming corporate relocations — enabling families to choose their unit before they arrive in the country.", bodyAr: "شارك رابط جولة المجمع مع الانتقالات المؤسسية القادمة — مما يمكّن العائلات من اختيار وحداتهم قبل وصولهم." },
    ],
    showcase: { title: "Show the Life. Fill the Compound.", titleAr: "أظهر الحياة. املأ المجمع.", body: "See how X360 helps compound operators across Saudi Arabia and the GCC achieve higher occupancy by giving relocating families immersive remote access.", bodyAr: "شاهد كيف تساعد X360 مشغلي المجمعات على تحقيق إشغال أعلى من خلال منح العائلات المنتقلة وصولاً غامراً عن بُعد.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Remote Resident Acquisition", titleAr: "اكتساب سكان عن بُعد",     body: "Secure leases from relocating families before they arrive in-country.",        bodyAr: "أحكم عقود الإيجار من العائلات المنتقلة قبل وصولهم." },
      { title: "Higher Occupancy Rates",      titleAr: "معدلات إشغال أعلى",        body: "Immersive compound showcases dramatically reduce vacancy periods.",             bodyAr: "عروض المجمع الغامرة تقلص فترات الشغور بشكل كبير." },
      { title: "Lifestyle Brand Positioning", titleAr: "تموضع علامة تجارية لأسلوب الحياة", body: "Cinematic amenity showcases position your compound as a premium lifestyle destination.", bodyAr: "عروض المرافق السينمائية تضع مجمعك كوجهة متميزة لأسلوب الحياة." },
      { title: "Corporate Relocation Wins",   titleAr: "كسب عقود الانتقال المؤسسي", body: "HR teams at multinationals choose compounds sight-unseen based on virtual tour quality.", bodyAr: "فرق الموارد البشرية في الشركات متعددة الجنسيات تختار المجمعات دون رؤية بناءً على جودة الجولات الافتراضية." },
    ],
    useCases: [
      { title: "Villa & Townhouse Compounds", titleAr: "مجمعات الفيلات والتاونهاوس", desc: "Showcase premium unit interiors alongside full amenity tours.",              descAr: "اعرض مقاطع الوحدات المتميزة إلى جانب جولات المرافق الكاملة." },
      { title: "Apartment Compounds",         titleAr: "مجمعات الشقق",               desc: "Help families evaluate layout, storage, and living standards remotely.",    descAr: "ساعد العائلات على تقييم التخطيط والتخزين ومعايير المعيشة عن بُعد." },
      { title: "Serviced Compounds",          titleAr: "المجمعات المخدومة",          desc: "Drive premium occupancy by showcasing F&B, concierge, and lifestyle offers.", descAr: "زِد الإشغال المتميز من خلال عرض خدمات الطعام والكونسيرج وعروض أسلوب الحياة." },
      { title: "Corporate Housing",           titleAr: "الإسكان المؤسسي",            desc: "Win corporate relocation contracts with immersive facility presentations.",   descAr: "اكسب عقود الانتقال المؤسسي بعروض منشأة غامرة." },
    ],
    aiSection: { headline: "Smart Compound Intelligence Platform", headlineAr: "منصة ذكاء المجمع الذكي", body: "X360 can integrate live unit availability, lease pricing, and AI-powered unit matching directly inside your compound virtual tour — creating a fully self-service leasing experience for remote families and corporate HR teams.", bodyAr: "يمكن لـ X360 دمج توفر الوحدات الحي وأسعار الإيجار ومطابقة الوحدات بالذكاء الاصطناعي مباشرة داخل جولة مجمعك الافتراضية." },
    finalCta: { headline: "Fill Your Compound With the Right Residents — Remotely.", headlineAr: "املأ مجمعك بالسكان المناسبين — عن بُعد.", sub: "Partner with X360 to deliver immersive compound experiences that drive occupancy and attract long-term residents.", subAr: "تشارك مع X360 لتقديم تجارب مجمع غامرة تدفع الإشغال وتجذب السكان على المدى البعيد." },
  },
};

export function getRealEstateCategory(slug: string): IndustryData | undefined {
  return REAL_ESTATE_CATEGORIES[slug];
}

export function getAllRealEstateSlugs(): string[] {
  return Object.keys(REAL_ESTATE_CATEGORIES);
}
