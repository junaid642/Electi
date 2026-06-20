import type { IndustryData } from "./tour-industries";

const SIBLINGS = [
  { slug: "palaces",        label: "Palaces",         labelAr: "القصور" },
  { slug: "aircrafts",      label: "Aircrafts",       labelAr: "الطائرات" },
  { slug: "yachts",         label: "Yachts",          labelAr: "اليخوت" },
  { slug: "private-estate", label: "Private Estates", labelAr: "المجمعات الخاصة" },
  { slug: "showrooms",      label: "Showrooms",       labelAr: "المعارض" },
];
const PARENT = "/virtual-tours/luxury-private";

const LUXURY_CATEGORIES: Record<string, IndustryData> = {
  palaces: {
    slug: "palaces",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Palaces",
    nameAr: "القصور",
    accentColor: "rgba(210,175,110,0.16)",
    hero: {
      label: "Luxury & Private",        labelAr: "الفئة الفاخرة والخاصة",
      headline: "ROYAL SPACES PRESENTED WITH\nIMMERSIVE GRANDEUR.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      headlineAr: "اعرض الفخامة\nالملكية رقمياً.",
      sub: "Digitally showcase palaces and iconic luxury residences through cinematic virtual experiences crafted for prestige and exclusivity.",
      subAr: "ادعُ المشترين المؤهلين والدبلوماسيين إلى قصرك — افتراضياً — بجولات 360° سينمائية تحترم الخصوصية وتُعبّر عن المكانة.",
      videoSrc: "/x360/palace.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Lock", title: "Strict Privacy Requirements", titleAr: "متطلبات خصوصية صارمة", desc: "Royal and ultra-luxury properties cannot be shown openly — yet buyers still need to experience the space before committing.", descAr: "العقارات الملكية والفاخرة جداً لا يمكن عرضها بشكل مفتوح — ومع ذلك يحتاج المشترون لتجربة المكان قبل الالتزام." },
      { iconKey: "Globe", title: "Buyers Are Globally Dispersed", titleAr: "المشترون منتشرون عالمياً", desc: "UHNW clients in Riyadh, London, Abu Dhabi and Geneva rarely travel for first viewings — your palace must come to them.", descAr: "العملاء ذوو الثروات الضخمة في الرياض ولندن وأبوظبي وجنيف نادراً ما يسافرون للمشاهدة الأولى — يجب أن يصل قصرك إليهم." },
      { iconKey: "ImageOff", title: "Standard Media Fails to Impress", titleAr: "الوسائط المعتادة لا تُبهر", desc: "Photographs cannot capture the scale, materials, and ambiance of a palace — leaving buyers under-impressed.", descAr: "الصور لا تستطيع التقاط حجم القصر ومواده وأجوائه — مما يترك المشترين دون الانطباع الكافي." },
      { iconKey: "Briefcase", title: "Long Sales Cycles", titleAr: "دورات مبيعات طويلة", desc: "Without spatial confidence, even the most motivated buyers delay decisions on ultra-high-value acquisitions.", descAr: "بدون يقين مكاني، يُؤجل حتى أكثر المشترين حماساً قراراتهم بشأن الاستحواذات ذات القيمة العالية جداً." },
    ],
    solutions: [
      { step: 1, headline: "Private, Password-Protected Palace Tours", headlineAr: "جولات قصور خاصة ومحمية بكلمة مرور", body: "Invitation-only virtual tours allow pre-qualified UHNW clients to explore every wing, courtyard, and suite — with full discretion.", bodyAr: "تتيح الجولات الافتراضية بالدعوة فقط للعملاء المؤهلين مسبقاً استكشاف كل جناح وفناء وجناح — بتكتم تام." },
      { step: 2, headline: "Ultra-High-Resolution Cinematic Capture", headlineAr: "التقاط سينمائي فائق الدقة", body: "Every marble finish, chandelier, and garden vista is captured in breathtaking resolution — communicating scale and craftsmanship that photographs cannot.", bodyAr: "يُلتقط كل تشطيب رخامي وثريا ومشهد حديقة بدقة مذهلة — توصل الحجم والحرفية التي لا تستطيع الصور توصيلها." },
      { step: 3, headline: "Global Access, Zero Logistics", headlineAr: "وصول عالمي، لا تعقيدات لوجستية", body: "A single secure link delivers your palace to any private residence or estate office worldwide — on any device, at any hour.", bodyAr: "رابط آمن واحد يُوصل قصرك لأي مقر خاص أو مكتب عقاري في العالم — على أي جهاز، في أي وقت." },
    ],
    showcase: {
      title: "An Experience Worthy of Royalty.",
      titleAr: "تجربة جديرة بالملوك.",
      body: "See how X360 presents Saudi Arabia's most exclusive palaces to international UHNW buyers — with the cinematic precision and privacy they demand.",
      bodyAr: "شاهد كيف تعرض X360 أكثر قصور المملكة العربية السعودية حصرية للمشترين الدوليين ذوي الثروات الضخمة — بالدقة السينمائية والخصوصية التي يطلبونها.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "Absolute Discretion", titleAr: "تكتم مطلق", body: "Password-protected access ensures only invited, pre-qualified clients view the property.", bodyAr: "يضمن الوصول المحمي بكلمة المرور أن العملاء المدعوين والمؤهلين فقط هم من يشاهدون العقار." },
      { title: "Global Buyer Reach", titleAr: "الوصول لمشترين عالميين", body: "Reach UHNW clients across GCC, Europe, and Asia without physical logistics.", bodyAr: "الوصول للعملاء ذوي الثروات الضخمة في الخليج وأوروبا وآسيا دون تعقيدات لوجستية." },
      { title: "Elevated Brand Prestige", titleAr: "مكانة علامة تجارية رفيعة", body: "Cinematic virtual experiences signal world-class quality and exclusivity before a word is spoken.", bodyAr: "التجارب الافتراضية السينمائية توصل الجودة العالمية والحصرية قبل أن تُنطق كلمة." },
      { title: "Faster Acquisition Decisions", titleAr: "قرارات استحواذ أسرع", body: "Spatial immersion builds the certainty that shortens hesitation on ultra-high-value decisions.", bodyAr: "الانغماس المكاني يبني اليقين الذي يقلص التردد في القرارات ذات القيمة العالية جداً." },
    ],
    useCases: [
      { title: "Royal Palaces", titleAr: "القصور الملكية", desc: "Present grand palaces to international royal families and heads of state.", descAr: "قدّم القصور الكبرى للعائلات المالكة الدولية ورؤساء الدول." },
      { title: "Heritage Estates", titleAr: "العقارات التراثية", desc: "Showcase historic palaces and estates with cultural significance.", descAr: "اعرض القصور والعقارات التاريخية ذات الأهمية الثقافية." },
      { title: "New-Build Ultra-Luxury", titleAr: "البناء الجديد الفاخر جداً", desc: "Pre-sell bespoke palace developments to qualified international buyers.", descAr: "بِع قصور مخصصة قيد الإنشاء للمشترين الدوليين المؤهلين." },
      { title: "Investment Portfolios", titleAr: "المحافظ الاستثمارية", desc: "Present palace collections to sovereign wealth funds and family offices.", descAr: "قدّم مجموعات القصور لصناديق الثروة السيادية ومكاتب العائلات." },
    ],
    aiSection: {
      headline: "Digital Twin Integration for Heritage Palaces",
      headlineAr: "التوأم الرقمي للقصور التراثية",
      body: "X360 overlays architectural data, material specifications, and restoration histories directly into palace virtual tours — giving sophisticated buyers and heritage consultants full spatial and historical intelligence in a single immersive experience.",
      bodyAr: "تدمج X360 البيانات المعمارية ومواصفات المواد وتواريخ الترميم مباشرة في جولات القصور الافتراضية — مانحةً المشترين المتطورين ومستشاري التراث ذكاءً مكانياً وتاريخياً كاملاً في تجربة غامرة واحدة.",
    },
    finalCta: {
      headline: "Present Your Palace to the World's Most Discerning Buyers.",
      headlineAr: "قدّم قصرك لأكثر المشترين تمييزاً في العالم.",
      sub: "Partner with X360 to deliver the most exclusive virtual palace experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة افتراضية حصرية للقصور في سوق الخليج.",
    },
  },

  aircrafts: {
    slug: "aircrafts",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Aircrafts",
    nameAr: "الطائرات الخاصة",
    accentColor: "rgba(150,190,230,0.14)",
    hero: {
      label: "Private Luxury",    labelAr: "الفئة الفاخرة الخاصة",
      headline: "LUXURY AVIATION DIGITALLY.",
      headlineAr: "الطيران الفاخر رقمياً.",
      sub: "Immersive private jet experiences designed to showcase exclusivity, comfort, and elite travel before takeoff.",
      subAr: "تجارب غامرة للطائرات الخاصة مصمّمة لإبراز الحصرية والراحة والسفر الرفيع قبل الإقلاع.",
      imageSrc: "/x360/jet-hero.jpg",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe", title: "Aircraft Are Rarely in One Place", titleAr: "الطائرات نادراً ما تكون في مكان واحد", desc: "Private jets are constantly in transit — scheduling physical viewings across time zones is costly and inefficient.", descAr: "الطائرات الخاصة في حركة مستمرة — جدولة المشاهدات الفعلية عبر المناطق الزمنية مكلف وغير فعّال." },
      { iconKey: "ImageOff", title: "Photos Miss the Cabin Experience", titleAr: "الصور تفوّت تجربة الكابينة", desc: "Flat photography fails to communicate the spatial luxury, finishes, and flow of a bespoke aircraft interior.", descAr: "التصوير المسطح يفشل في نقل الفخامة المكانية والتشطيبات وتدفق التصميم الداخلي المخصص." },
      { iconKey: "Briefcase", title: "High-Stakes Decisions Need Certainty", titleAr: "القرارات ذات المخاطر العالية تحتاج يقيناً", desc: "Aircraft acquisitions involve multi-million dollar commitments — buyers need spatial confidence before proceeding.", descAr: "صفقات الطائرات تنطوي على التزامات بملايين الدولارات — يحتاج المشترون ليقين مكاني قبل المضي قدماً." },
      { iconKey: "Clock", title: "Slow Brokerage Cycles", titleAr: "دورات وساطة بطيئة", desc: "Without immersive previews, the back-and-forth of aircraft brokerage extends sales cycles unnecessarily.", descAr: "بدون معاينات غامرة، يطيل التراسل المتبادل في وساطة الطائرات دورات المبيعات بلا داعٍ." },
    ],
    solutions: [
      { step: 1, headline: "Full Cabin Virtual Walkthroughs", headlineAr: "جولات افتراضية كاملة داخل الكابينة", body: "360° capture of every cabin section — seating, galley, bedroom, lavatory, and cockpit — giving buyers complete spatial confidence from anywhere.", bodyAr: "التقاط 360° لكل قسم من الكابينة — المقاعد والمطبخ وغرفة النوم والحمام وقمرة القيادة — مانحاً المشترين ثقة مكانية كاملة من أي مكان." },
      { step: 2, headline: "On-Demand, Secure Access", headlineAr: "وصول آمن عند الطلب", body: "Share a private link with qualified buyers worldwide — no scheduling, no logistics, no site visits required until the deal is near closure.", bodyAr: "شارك رابطاً خاصاً مع المشترين المؤهلين في جميع أنحاء العالم — لا جدولة ولا لوجستيات ولا زيارات ميدانية حتى يقترب إتمام الصفقة." },
      { step: 3, headline: "Configuration & Livery Showcasing", headlineAr: "عرض التكوينات والألوان الخارجية", body: "Showcase multiple interior configurations and exterior liveries in the same virtual experience — helping buyers visualise customisation options.", bodyAr: "اعرض تكوينات داخلية متعددة وألواناً خارجية في نفس التجربة الافتراضية — مساعداً المشترين على تصور خيارات التخصيص." },
      { step: 4, headline: "Accelerated Brokerage Cycles", headlineAr: "تسريع دورات الوساطة", body: "Immersive virtual access replaces weeks of back-and-forth scheduling — buyers arrive at decisions faster, and deals close in days, not months.", bodyAr: "الوصول الافتراضي الغامر يحل محل أسابيع من الجدولة المتبادلة — يصل المشترون إلى قراراتهم بشكل أسرع، وتُغلق الصفقات في أيام لا أشهر." },
    ],
    showcase: {
      title: "Every Cabin Detail. Every Luxury Finish.",
      titleAr: "كل تفاصيل الكابينة. كل تشطيب فاخر.",
      body: "See how X360 presents private jets to international UHNW buyers — with the spatial clarity that moves deals from interest to commitment.",
      bodyAr: "شاهد كيف تقدم X360 الطائرات الخاصة للمشترين الدوليين ذوي الثروات الضخمة — بالوضوح المكاني الذي يحرّك الصفقات من الاهتمام إلى الالتزام.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "Location-Independent Viewings", titleAr: "مشاهدات بغض النظر عن الموقع", body: "Present your aircraft to buyers worldwide regardless of where the jet is parked.", bodyAr: "قدّم طائرتك للمشترين في جميع أنحاء العالم بغض النظر عن مكان وقوف الطائرة." },
      { title: "Faster Brokerage Cycles", titleAr: "دورات وساطة أسرع", body: "Virtual tours accelerate the decision timeline by giving buyers certainty earlier in the process.", bodyAr: "الجولات الافتراضية تُسرّع الجدول الزمني للقرار من خلال منح المشترين اليقين في وقت أبكر من العملية." },
      { title: "Premium Brand Positioning", titleAr: "تموضع علامة تجارية متميزة", body: "Cinematic aircraft presentations signal world-class quality to ultra-discerning buyers.", bodyAr: "تقديم الطائرات السينمائي يوصل الجودة العالمية للمشترين المتميزين جداً." },
      { title: "Higher Qualified Engagement", titleAr: "تفاعل أعلى من المؤهلين", body: "Share virtual tours only with pre-qualified prospects — ensuring every viewer is a serious buyer.", bodyAr: "شارك الجولات الافتراضية مع المحتملين المؤهلين فقط — مضموناً أن كل مشاهد مشترٍ جاد." },
    ],
    useCases: [
      { title: "Private Jets for Sale", titleAr: "طائرات خاصة للبيع", desc: "Present bespoke cabins and exterior liveries to global buyers and brokers.", descAr: "قدّم الكابينات المخصصة والألوان الخارجية للمشترين والوسطاء العالميين." },
      { title: "Charter Fleet Marketing", titleAr: "تسويق أسطول الطائرات المؤجرة", desc: "Showcase your charter fleet to corporate clients and VIP travellers.", descAr: "اعرض أسطولك المؤجر للعملاء المؤسسيين والمسافرين VIP." },
      { title: "Refurbishment Presentations", titleAr: "عروض إعادة التجهيز", desc: "Show before-and-after cabin refurbishments to convince owners to commission upgrades.", descAr: "اعرض تجديدات الكابينة قبل وبعد لإقناع الملاك بتفويض الترقيات." },
      { title: "New Delivery Handovers", titleAr: "تسليم الطائرات الجديدة", desc: "Give new owners a virtual walkthrough before physical delivery.", descAr: "أعطِ الملاك الجدد جولة افتراضية قبل التسليم الفعلي." },
    ],
    aiSection: {
      headline: "AI-Powered Configuration Visualisation",
      headlineAr: "تصوّر التكوينات بالذكاء الاصطناعي",
      body: "X360 integrates AI rendering to overlay multiple cabin configurations, material options, and bespoke finishes within the same virtual tour — allowing buyers to experience their exact custom specification before the aircraft is completed.",
      bodyAr: "تدمج X360 التصيير بالذكاء الاصطناعي لعرض تكوينات كابينة متعددة وخيارات مواد وتشطيبات مخصصة داخل نفس الجولة الافتراضية — مما يتيح للمشترين تجربة مواصفاتهم المخصصة تماماً قبل اكتمال الطائرة.",
    },
    finalCta: {
      headline: "Close Aircraft Deals From Any Corner of the Globe.",
      headlineAr: "أتمم صفقات الطائرات من أي زاوية في العالم.",
      sub: "Partner with X360 to deliver the most immersive private aviation presentation experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة عرض للطيران الخاص غامرة في سوق الخليج.",
    },
  },

  yachts: {
    slug: "yachts",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Yachts",
    nameAr: "اليخوت",
    accentColor: "rgba(80,160,200,0.14)",
    hero: {
      label: "Private Luxury",    labelAr: "الفئة الفاخرة الخاصة",
      headline: "LUXURY YACHTING EXPERIENCES,\nVIRTUALLY ELEVATED.",
      headlineAr: "دع المشترين يبحرون\nعبر يختك.",
      headlineSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
      sub: "Showcase elite marine lifestyles through immersive cinematic experiences designed for high-end clientele.",
      subAr: "جولات افتراضية 360° كاملة لكل طابق وكابينة وصالون — مانحةً مشتري السوبر يخت الثقة المكانية للالتزام، من أي مكان في العالم.",
      videoSrc: "/x360/yacht.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe", title: "Yachts Are Always in Transit", titleAr: "اليخوت دائماً في تنقل", desc: "Superyachts move between marinas globally — arranging physical viewings is expensive, time-consuming and often impossible.", descAr: "السوبر يخوت تتنقل بين الموانئ عالمياً — ترتيب المشاهدات الفعلية مكلف ومستهلك للوقت وكثيراً ما يكون مستحيلاً." },
      { iconKey: "ImageOff", title: "Photos Miss the Onboard Experience", titleAr: "الصور تفوّت التجربة على متن اليخت", desc: "Static images fail to convey the flow, scale, and luxury of a superyacht — leaving buyers with an incomplete picture.", descAr: "الصور الثابتة تفشل في نقل تدفق السوبر يخت وحجمه وفخامته — تاركةً المشترين بصورة غير مكتملة." },
      { iconKey: "Briefcase", title: "Multi-Million Dollar Decisions Need Certainty", titleAr: "القرارات متعددة الملايين تحتاج يقيناً", desc: "Yacht acquisitions involve enormous financial commitment — buyers demand spatial confidence before proceeding.", descAr: "صفقات اليخوت تنطوي على التزام مالي هائل — يتطلب المشترون يقيناً مكانياً قبل المضي قدماً." },
      { iconKey: "Clock", title: "Long Negotiation Cycles", titleAr: "دورات تفاوض طويلة", desc: "Without immersive previews, brokerage cycles stretch as buyers request repeated viewings and additional media.", descAr: "بدون معاينات غامرة، تمتد دورات الوساطة بينما يطلب المشترون مشاهدات متكررة ووسائط إضافية." },
    ],
    solutions: [
      { step: 1, headline: "Deck-by-Deck Virtual Exploration", headlineAr: "استكشاف افتراضي طابقاً بطابق", body: "360° captures of every deck — sundeck, bridge, main salon, cabins, engine room access, and tender garage — giving buyers a complete spatial walkthrough.", bodyAr: "التقاطات 360° لكل طابق — طابق الشمس والجسر والصالون الرئيسي والكابينات ومدخل غرفة المحرك ومرآب القوارب الصغيرة — مانحاً المشترين جولة مكانية كاملة." },
      { step: 2, headline: "Secure Global Access", headlineAr: "وصول عالمي آمن", body: "Share a password-protected link with qualified buyers, charter clients, and brokers — no marina visit required until the deal is near.", bodyAr: "شارك رابطاً محمياً بكلمة مرور مع المشترين المؤهلين وعملاء الاستئجار والوسطاء — لا حاجة لزيارة الميناء حتى يقترب إتمام الصفقة." },
      { step: 3, headline: "Charter & Sales in One Experience", headlineAr: "التأجير والمبيعات في تجربة واحدة", body: "Use the same virtual tour for both charter marketing and outright sale — maximising the ROI of a single professional production.", bodyAr: "استخدم نفس الجولة الافتراضية لتسويق التأجير والبيع المباشر — مُعظّماً عائد الاستثمار من إنتاج احترافي واحد." },
    ],
    showcase: {
      title: "Every Deck. Every Suite. Every Detail.",
      titleAr: "كل طابق. كل جناح. كل تفاصيل.",
      body: "See how X360 presents superyachts to international buyers and charter clients — with the cinematic immersion that turns interest into offers.",
      bodyAr: "شاهد كيف تقدم X360 السوبر يخوت للمشترين الدوليين وعملاء التأجير — بالانغماس السينمائي الذي يحوّل الاهتمام إلى عروض.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "Marina-Independent Viewings", titleAr: "مشاهدات مستقلة عن الميناء", body: "Show your yacht to buyers worldwide regardless of its current location.", bodyAr: "اعرض يختك للمشترين في جميع أنحاء العالم بغض النظر عن موقعه الحالي." },
      { title: "Dual Charter & Sales Value", titleAr: "قيمة مزدوجة للتأجير والمبيعات", body: "One virtual production serves both charter marketing and outright acquisition campaigns.", bodyAr: "إنتاج افتراضي واحد يخدم حملات تسويق التأجير والاستحواذ الكامل معاً." },
      { title: "Accelerated Decision-Making", titleAr: "تسريع اتخاذ القرار", body: "Buyers who experience a yacht virtually are significantly more prepared to commit on first physical visit.", bodyAr: "المشترون الذين يختبرون اليخت افتراضياً أكثر استعداداً للالتزام في أول زيارة فعلية." },
      { title: "Premium Brand Positioning", titleAr: "تموضع علامة تجارية متميزة", body: "Cinematic superyacht presentations command respect and credibility in the ultra-luxury market.", bodyAr: "تقديم السوبر يخوت السينمائي يستحوذ على الاحترام والمصداقية في سوق الفخامة القصوى." },
    ],
    useCases: [
      { title: "Superyachts for Sale", titleAr: "سوبر يخوت للبيع", desc: "Present bespoke superyachts to UHNW buyers and brokers globally.", descAr: "قدّم السوبر يخوت المخصصة للمشترين ذوي الثروات الضخمة والوسطاء عالمياً." },
      { title: "Charter Fleet Marketing", titleAr: "تسويق أسطول التأجير", desc: "Showcase your charter fleet to corporate clients and VIP guests.", descAr: "اعرض أسطولك المؤجر للعملاء المؤسسيين والضيوف VIP." },
      { title: "Refit & Refurbishment", titleAr: "إعادة التجهيز والتجديد", desc: "Show before-and-after refits to new ownership prospects.", descAr: "اعرض إعادة التجهيز قبل وبعد لمحتملي الملكية الجديدة." },
      { title: "Shipyard New Builds", titleAr: "بناء جديد في دور الصناعة", desc: "Pre-sell bespoke yacht builds with AI-rendered virtual tours before launch.", descAr: "بِع مسبقاً بناء يخوت مخصصة بجولات افتراضية مُصيَّرة بالذكاء الاصطناعي قبل الإطلاق." },
    ],
    aiSection: {
      headline: "AI Rendering for New Build & Refit Previews",
      headlineAr: "التصيير بالذكاء الاصطناعي لمعاينات البناء الجديد وإعادة التجهيز",
      body: "For yachts under construction or refit, X360 layers AI-rendered 3D visualisations into the virtual tour — allowing buyers to experience their exact specification and interior design before the vessel is completed.",
      bodyAr: "لليخوت قيد الإنشاء أو إعادة التجهيز، تدمج X360 التصورات ثلاثية الأبعاد المُولّدة بالذكاء الاصطناعي في الجولة الافتراضية — مما يتيح للمشترين تجربة مواصفاتهم الدقيقة وتصميمهم الداخلي قبل اكتمال السفينة.",
    },
    finalCta: {
      headline: "Close Yacht Deals From Any Port in the World.",
      headlineAr: "أتمم صفقات اليخوت من أي ميناء في العالم.",
      sub: "Partner with X360 to deliver the most immersive superyacht presentation experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة عرض سوبر يخوت غامرة في سوق الخليج.",
    },
  },

  "private-estate": {
    slug: "private-estate",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Private Estate",
    nameAr: "المنتجعات والمزارع الخاصة",
    accentColor: "rgba(120,180,100,0.12)",
    hero: {
      label: "Private Luxury",    labelAr: "الفئة الفاخرة الخاصة",
      headline: "LUXURY ESTATES PRESENTED\nBEYOND BOUNDARIES.",
      headlineAr: "اعرض المنتجعات الشاسعة\nللمشترين العالميين.",
      sub: "Transform premium properties into immersive digital experiences tailored for global buyers and elite investors.",
      subAr: "المنتجعات والمزارع الخاصة شاسعة جداً لزيارة واحدة — دع المشترين يستكشفون كل متر افتراضياً قبل أن يسافروا.",
      videoSrc: "/x360/luxury-estate.mp4",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe", title: "Vast Footprint Is Hard to Show", titleAr: "المساحة الشاسعة يصعب عرضها", desc: "Estates spanning hundreds of acres cannot be conveyed through standard photography — buyers need a spatial journey to understand the scale.", descAr: "العقارات التي تمتد لمئات الأفدنة لا يمكن نقلها عبر التصوير القياسي — يحتاج المشترون لرحلة مكانية لفهم الحجم." },
      { iconKey: "Lock", title: "Privacy Prevents Open Viewings", titleAr: "الخصوصية تمنع المشاهدات المفتوحة", desc: "Occupied estates and farms require complete discretion — open-access viewings are inappropriate for UHNW owners.", descAr: "المنتجعات والمزارع المأهولة تتطلب تكتماً كاملاً — المشاهدات المفتوحة غير مناسبة لأصحاب الثروات الضخمة." },
      { iconKey: "ImageOff", title: "Amenities Go Unseen", titleAr: "المرافق لا تُرى", desc: "Stables, lakes, guest houses, helipads, and farming infrastructure are rarely shown in standard property media.", descAr: "الإسطبلات والبحيرات وبيوت الضيوف وهبوط الطائرات والبنية التحتية الزراعية نادراً ما تُعرض في وسائل العقارات المعتادة." },
      { iconKey: "Clock", title: "Buyers Travel Long Distances", titleAr: "المشترون يسافرون مسافات طويلة", desc: "International buyers must cross continents just for a first viewing — virtual tours remove this barrier entirely.", descAr: "المشترون الدوليون يجب أن يعبروا القارات لمجرد مشاهدة أولى — الجولات الافتراضية تزيل هذا الحاجز كلياً." },
    ],
    solutions: [
      { step: 1, headline: "Comprehensive Estate Walkthroughs", headlineAr: "جولات شاملة للمنتجعات", body: "360° capture of the main residence, guest houses, grounds, stables, lakes, and outbuildings — giving buyers a complete picture of the entire estate.", bodyAr: "التقاط 360° للمقر الرئيسي وبيوت الضيوف والأراضي والإسطبلات والبحيرات والمباني الخارجية — مانحاً المشترين صورة كاملة عن المنتجع بأكمله." },
      { step: 2, headline: "Drone Integration for Aerial Context", headlineAr: "دمج الطائرات المسيّرة للسياق الجوي", body: "Aerial drone footage integrated with ground-level 360° tours gives buyers a true understanding of location, grounds, and surrounding landscape.", bodyAr: "لقطات الطائرات المسيّرة الجوية المدمجة مع جولات 360° على مستوى الأرض تمنح المشترين فهماً حقيقياً للموقع والأراضي والمناظر الطبيعية المحيطة." },
      { step: 3, headline: "Private Access for Qualified Buyers", headlineAr: "وصول خاص للمشترين المؤهلين", body: "Password-protected tours shared directly with pre-qualified UHNW buyers — ensuring full discretion for the current owner.", bodyAr: "جولات محمية بكلمة مرور مشتركة مباشرة مع المشترين المؤهلين ذوي الثروات الضخمة — ضامنةً تكتماً كاملاً للمالك الحالي." },
    ],
    showcase: {
      title: "Every Acre. Every Amenity. Every Detail.",
      titleAr: "كل فدّان. كل مرفق. كل تفاصيل.",
      body: "See how X360 presents Saudi Arabia's most exclusive private estates and farms to international UHNW buyers — comprehensively, privately, and cinematically.",
      bodyAr: "شاهد كيف تقدم X360 أكثر المنتجعات والمزارع الخاصة حصرية في المملكة للمشترين الدوليين ذوي الثروات الضخمة — بشكل شامل وخاص وسينمائي.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "Full Estate Coverage", titleAr: "تغطية كاملة للمنتجع", body: "Every structure, amenity, and landscape feature captured in a single seamless experience.", bodyAr: "كل هيكل ومرفق ومعلم طبيعي مُلتقط في تجربة سلسة واحدة." },
      { title: "International Buyer Access", titleAr: "وصول المشترين الدوليين", body: "Remove the travel barrier — qualified buyers explore your estate from any continent.", bodyAr: "أزل حاجز السفر — يستكشف المشترون المؤهلون منتجعك من أي قارة." },
      { title: "Complete Discretion", titleAr: "تكتم كامل", body: "Private, invitation-only access protects the owner's privacy throughout the sales process.", bodyAr: "الوصول الخاص بالدعوة فقط يحمي خصوصية المالك طوال عملية البيع." },
      { title: "Higher Perceived Value", titleAr: "قيمة مُدرَكة أعلى", body: "Cinematic presentation of the full estate communicates scale and exclusivity that justify premium pricing.", bodyAr: "العرض السينمائي للمنتجع الكامل يوصل الحجم والحصرية اللذين يبرران التسعير المتميز." },
    ],
    useCases: [
      { title: "Private Farms & Ranches", titleAr: "المزارع والمراعي الخاصة", desc: "Showcase working farms and agricultural estates to international investors.", descAr: "اعرض المزارع والعقارات الزراعية للمستثمرين الدوليين." },
      { title: "Luxury Retreats", titleAr: "المنتجعات الفاخرة الخاصة", desc: "Present exclusive wellness and leisure retreats to discerning UHNW buyers.", descAr: "قدّم منتجعات العافية والترفيه الحصرية للمشترين المتميزين ذوي الثروات الضخمة." },
      { title: "Equestrian Estates", titleAr: "العقارات الفروسية", desc: "Show stables, paddocks, arenas, and riding trails to equestrian buyers.", descAr: "اعرض الإسطبلات والحظائر والمضامير ومسالك الفروسية لمشتري الفروسية." },
      { title: "Investment Land Parcels", titleAr: "قطع الأراضي الاستثمارية", desc: "Present large land parcels to sovereign wealth funds and family offices.", descAr: "قدّم قطع الأراضي الكبيرة لصناديق الثروة السيادية ومكاتب العائلات." },
    ],
    aiSection: {
      headline: "Drone + 360° Integration for Vast Estates",
      headlineAr: "تكامل الطائرات المسيّرة و360° للعقارات الشاسعة",
      body: "X360 combines aerial drone capture with ground-level 360° immersion and GIS land mapping data — giving buyers a comprehensive spatial understanding of large estates that no other media format can deliver.",
      bodyAr: "تجمع X360 التقاط الطائرات المسيّرة الجوية مع انغماس 360° على مستوى الأرض وبيانات رسم خرائط الأراضي GIS — مانحةً المشترين فهماً مكانياً شاملاً للعقارات الكبيرة لا يستطيع أي تنسيق وسائط آخر توصيله.",
    },
    finalCta: {
      headline: "Present Your Estate to Buyers Around the World.",
      headlineAr: "قدّم منتجعك للمشترين حول العالم.",
      sub: "Partner with X360 to deliver the most comprehensive and private estate presentation experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة عرض شاملة وخاصة للمنتجعات في سوق الخليج.",
    },
  },

  showrooms: {
    slug: "showrooms",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Showrooms",
    nameAr: "صالات العرض",
    accentColor: "rgba(180,140,200,0.13)",
    hero: {
      label: "Private Luxury",    labelAr: "الفئة الفاخرة الخاصة",
      headline: "IMMERSIVE SHOWROOM EXPERIENCES\nTHAT INSPIRE.",
      headlineAr: "دع العملاء يتصفحون\nصالة عرضك افتراضياً.",
      sub: "Digitally showcase luxury products and premium spaces through cinematic virtual experiences built for modern customer engagement.",
      subAr: "جولات افتراضية 360° لصالات العرض تزيد الزوار المؤهلين وتمدّ وصولك عالمياً وترتقي بتجربة علامتك التجارية قبل الزيارة الأولى.",
      videoSrc: "/x360/showroom.mp4",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe", title: "Geographic Limitations", titleAr: "القيود الجغرافية", desc: "Clients outside your city or country cannot visit your showroom — limiting your potential customer base significantly.", descAr: "العملاء خارج مدينتك أو بلدك لا يستطيعون زيارة صالة عرضك — مما يحدّ من قاعدة عملائك المحتملين بشكل ملحوظ." },
      { iconKey: "ImageOff", title: "Online Listings Miss the Experience", titleAr: "القوائم الإلكترونية تفوّت التجربة", desc: "Product pages and flat photography fail to convey the atmosphere, curation, and spatial luxury of a premium showroom.", descAr: "صفحات المنتجات والتصوير المسطح يفشلان في نقل جو التنسيق والفخامة المكانية لصالة عرض متميزة." },
      { iconKey: "Clock", title: "Low Walk-In Conversion", titleAr: "تحويل منخفض للزوار الفعليين", desc: "Clients who visit without prior familiarity often leave without purchasing — a virtual preview builds intent before arrival.", descAr: "العملاء الذين يزورون دون معرفة مسبقة غالباً ما يغادرون دون شراء — معاينة افتراضية تبني النية قبل الوصول." },
      { iconKey: "Briefcase", title: "B2B Buyers Need Remote Access", titleAr: "المشترون B2B يحتاجون وصولاً عن بعد", desc: "Corporate procurement teams and international buyers cannot always visit — a virtual showroom bridges that gap.", descAr: "فرق المشتريات المؤسسية والمشترون الدوليون لا يستطيعون دائماً الزيارة — صالة العرض الافتراضية تسدّ هذه الفجوة." },
    ],
    solutions: [
      { step: 1, headline: "Full Showroom Virtual Experience", headlineAr: "تجربة افتراضية كاملة لصالة العرض", body: "360° capture of every display area, product zone, and private consultation room — giving clients a complete spatial preview before they visit.", bodyAr: "التقاط 360° لكل منطقة عرض وقسم منتجات وغرفة استشارة خاصة — مانحاً العملاء معاينة مكانية كاملة قبل زيارتهم." },
      { step: 2, headline: "Product Hotspot Integration", headlineAr: "دمج نقاط التفاعل بالمنتجات", body: "Embed product details, specifications, and pricing as interactive hotspots within the virtual tour — turning browsers into informed buyers.", bodyAr: "ادمج تفاصيل المنتجات والمواصفات والأسعار كنقاط تفاعلية داخل الجولة الافتراضية — محوّلاً المتصفحين إلى مشترين متعلمين." },
      { step: 3, headline: "Always-Open Global Showroom", headlineAr: "صالة عرض عالمية مفتوحة دائماً", body: "Your showroom is accessible 24/7 to clients worldwide — driving qualified enquiries around the clock, without staff present.", bodyAr: "صالة عرضك متاحة على مدار الساعة للعملاء في جميع أنحاء العالم — تدفع الاستفسارات المؤهلة على مدار الساعة، دون حضور موظفين." },
    ],
    showcase: {
      title: "Your Showroom, Open to the World.",
      titleAr: "صالة عرضك، مفتوحة للعالم.",
      body: "See how X360 transforms premium showrooms into always-available global experiences — driving footfall, qualified leads, and brand elevation simultaneously.",
      bodyAr: "شاهد كيف تحوّل X360 صالات العرض المتميزة إلى تجارب عالمية متاحة دائماً — تزيد الزوار والعملاء المحتملين المؤهلين والارتقاء بالعلامة التجارية في آنٍ واحد.",
      videoSrc: "/x360/industries/luxury.mp4",
    },
    benefits: [
      { title: "24/7 Global Accessibility", titleAr: "إمكانية الوصول العالمية على مدار الساعة", body: "Your showroom never closes — qualified clients browse from any location, at any time.", bodyAr: "صالة عرضك لا تُغلق أبداً — يتصفح العملاء المؤهلون من أي مكان، في أي وقت." },
      { title: "Higher Walk-In Conversion", titleAr: "تحويل أعلى للزوار الفعليين", body: "Clients who preview virtually arrive with purchase intent — converting faster and with less staff effort.", bodyAr: "العملاء الذين يشاهدون مسبقاً يصلون بنية الشراء — يتحولون أسرع وبجهد أقل من الموظفين." },
      { title: "Qualified International Leads", titleAr: "عملاء محتملون دوليون مؤهلون", body: "Reach B2B buyers and international clients who can never physically visit your location.", bodyAr: "الوصول إلى المشترين B2B والعملاء الدوليين الذين لا يستطيعون زيارة موقعك فعلياً." },
      { title: "Premium Brand Elevation", titleAr: "ارتقاء العلامة التجارية المتميزة", body: "Cinematic virtual showrooms position your brand as world-class and innovative.", bodyAr: "صالات العرض الافتراضية السينمائية تضع علامتك التجارية في مستوى عالمي ومبتكر." },
    ],
    useCases: [
      { title: "Luxury Automotive", titleAr: "السيارات الفاخرة", desc: "Showcase luxury and exotic vehicles in a cinematic virtual showroom.", descAr: "اعرض السيارات الفاخرة والغريبة في صالة عرض افتراضية سينمائية." },
      { title: "High-End Furniture & Interior", titleAr: "الأثاث الراقي والتصميم الداخلي", desc: "Let interior designers and property owners explore your collections virtually.", descAr: "دع المصممين الداخليين وملاك العقارات يستكشفون مجموعاتك افتراضياً." },
      { title: "Jewellery & Watches", titleAr: "المجوهرات والساعات", desc: "Present fine jewellery and watch collections in an immersive boutique experience.", descAr: "قدّم مجموعات المجوهرات الفاخرة والساعات في تجربة بوتيك غامرة." },
      { title: "Art Galleries", titleAr: "صالات الفنون", desc: "Allow collectors and buyers worldwide to explore your gallery and available works.", descAr: "اسمح للهواة والمشترين في جميع أنحاء العالم باستكشاف صالتك والأعمال المتاحة." },
    ],
    aiSection: {
      headline: "AI-Powered Product Discovery Inside Your Showroom",
      headlineAr: "اكتشاف المنتجات بالذكاء الاصطناعي داخل صالة عرضك",
      body: "X360 integrates AI-powered product hotspots, inventory availability, and smart recommendation overlays directly within the virtual showroom — turning passive viewers into active buyers before they even set foot inside.",
      bodyAr: "تدمج X360 نقاط التفاعل بالمنتجات المدعومة بالذكاء الاصطناعي وتوافر المخزون وتراكبات التوصيات الذكية مباشرة داخل صالة العرض الافتراضية — محوّلةً المشاهدين السلبيين إلى مشترين نشطين قبل أن يدخلوا المكان.",
    },
    finalCta: {
      headline: "Open Your Showroom to the Entire World.",
      headlineAr: "افتح صالة عرضك للعالم بأسره.",
      sub: "Partner with X360 to deliver the most immersive and always-available showroom experience in the GCC market.",
      subAr: "تشارك مع X360 لتقديم أكثر تجربة صالة عرض غامرة ومتاحة دائماً في سوق الخليج.",
    },
  },
};

export function getLuxuryCategory(slug: string): IndustryData | undefined {
  return LUXURY_CATEGORIES[slug];
}

export function getAllLuxurySlugs(): string[] {
  return Object.keys(LUXURY_CATEGORIES);
}
