import type { IndustryData } from "./tour-industries";

const SIBLINGS = [
  { slug: "schools",     label: "Schools & Universities", labelAr: "المدارس والجامعات" },
  { slug: "government",  label: "Government Buildings",   labelAr: "المباني الحكومية" },
  { slug: "event-halls", label: "Event Spaces",           labelAr: "قاعات الفعاليات" },
  { slug: "medical",     label: "Medical Centers",        labelAr: "المراكز الطبية" },
  { slug: "museums",     label: "Museums",                labelAr: "المتاحف" },
];
const PARENT = "/virtual-tours/others";
const ACCENT  = "rgba(100,200,180,0.14)";

const OTHERS_CATEGORIES: Record<string, IndustryData> = {

  "schools": {
    slug: "schools",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Schools & Universities",
    nameAr: "المدارس والجامعات",
    accentColor: ACCENT,
    hero: {
      label: "Education",      labelAr: "التعليم",
      headline: "LET FAMILIES CHOOSE\nBEFORE ENROLMENT DAY.",
      headlineAr: "دع الأسر تختار\nقبل يوم التسجيل.",
      sub: "Immersive school and university virtual tours that give parents, students, and international applicants a complete campus experience — from anywhere in the world.",
      subAr: "جولات افتراضية غامرة للمدارس والجامعات تمنح الآباء والطلاب والمتقدمين الدوليين تجربة حرم كاملة — من أي مكان في العالم.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/schools.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe",        title: "International Applicants Can't Visit",    titleAr: "المتقدمون الدوليون لا يستطيعون الزيارة",   desc: "Families relocating to Saudi Arabia or applying internationally need to assess schools without the ability to visit in person.", descAr: "العائلات المنتقلة إلى المملكة أو التي تتقدم دولياً تحتاج لتقييم المدارس دون إمكانية الزيارة الشخصية." },
      { iconKey: "ImageOff",     title: "Brochures Can't Communicate Campus Life", titleAr: "الكتيبات لا توصل الحياة الجامعية",         desc: "The energy of classrooms, sports facilities, labs, and common areas cannot be captured in printed materials or photo galleries.", descAr: "طاقة الفصول الدراسية والمرافق الرياضية والمختبرات والمناطق المشتركة لا يمكن التقاطها في المواد المطبوعة." },
      { iconKey: "Users",        title: "High Competition for Top Students",       titleAr: "منافسة عالية على أفضل الطلاب",              desc: "Educational institutions competing for premium enrolment need superior digital presence to stand out.", descAr: "المؤسسات التعليمية التي تتنافس على التسجيل المتميز تحتاج حضوراً رقمياً متفوقاً لتتميز." },
      { iconKey: "Clock",        title: "Open Day Attendance Is Declining",        titleAr: "انخفاض حضور أيام الأبواب المفتوحة",        desc: "Families expect to evaluate schools digitally before investing time in physical open day visits.", descAr: "تتوقع الأسر تقييم المدارس رقمياً قبل استثمار الوقت في زيارات أيام الأبواب المفتوحة الفعلية." },
    ],
    solutions: [
      { step: 1, headline: "Full Campus Immersion",          headlineAr: "انغماس كامل في الحرم",              body: "360° tours of classrooms, science labs, libraries, sports facilities, and common areas — giving families a complete campus experience remotely.", bodyAr: "جولات 360° للفصول الدراسية ومختبرات العلوم والمكتبات والمرافق الرياضية." },
      { step: 2, headline: "Always-On Open Day",             headlineAr: "يوم أبواب مفتوحة دائم",             body: "Replace limited open day slots with a permanent virtual open day — accessible by prospective families worldwide, at any time.", bodyAr: "استبدل فتحات يوم الأبواب المفتوحة المحدودة بيوم أبواب مفتوحة افتراضي دائم — متاح للأسر المحتملة حول العالم." },
      { step: 3, headline: "International Recruitment Drive", headlineAr: "حملة توظيف دولية",                  body: "Give international applicants and relocating families immersive access to your campus — converting remote interest into committed enrolment.", bodyAr: "أعطِ المتقدمين الدوليين والأسر المنتقلة وصولاً غامراً لحرمك — تُحوّل الاهتمام البعيد إلى تسجيل ملتزم." },
    ],
    showcase: { title: "Let Every Family Experience Your Campus — Everywhere.", titleAr: "دع كل أسرة تختبر حرمك — في كل مكان.", body: "See how X360 helps Saudi Arabia's leading educational institutions increase applications and enrolment with immersive campus virtual tours.", bodyAr: "شاهد كيف تساعد X360 المؤسسات التعليمية الرائدة على زيادة الطلبات والتسجيل.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Higher Application Rates",       titleAr: "معدلات طلب أعلى",              body: "Schools with virtual tours attract significantly more applications from qualified families.", bodyAr: "تستقطب المدارس ذات الجولات الافتراضية طلبات أكثر بشكل ملحوظ من الأسر المؤهلة." },
      { title: "International Student Reach",    titleAr: "الوصول للطلاب الدوليين",       body: "Reach applicant families globally without relying on physical open day attendance.", bodyAr: "الوصول لأسر المتقدمين عالمياً دون الاعتماد على حضور أيام الأبواب المفتوحة الفعلية." },
      { title: "Competitive Digital Advantage",  titleAr: "ميزة رقمية تنافسية",           body: "Position your institution as modern, transparent, and globally accessible.", bodyAr: "ضع مؤسستك في مكانة حديثة وشفافة وذات وصول عالمي." },
      { title: "Parent Confidence",              titleAr: "ثقة الوالدين",                  body: "Immersive campus previews build the parental confidence that drives final enrolment decisions.", bodyAr: "معاينات الحرم الغامرة تبني ثقة الوالدين التي تدفع قرارات التسجيل النهائية." },
    ],
    useCases: [
      { title: "Classrooms & Learning Spaces",  titleAr: "الفصول ومساحات التعلم",     desc: "Showcase modern classroom environments and interactive learning setups.",     descAr: "اعرض بيئات الفصول الدراسية الحديثة وإعدادات التعلم التفاعلي." },
      { title: "Science Labs & Facilities",     titleAr: "المختبرات العلمية والمرافق", desc: "Demonstrate state-of-the-art laboratory and STEM facility investments.",       descAr: "أظهر استثمارات المختبرات ومرافق STEM الحديثة." },
      { title: "Sports & Outdoor Areas",        titleAr: "الملاعب والمناطق الخارجية", desc: "Capture sports fields, gymnasiums, and recreational areas.",                  descAr: "التقط الملاعب الرياضية والصالات الرياضية والمناطق الترفيهية." },
      { title: "University Campuses",           titleAr: "الحرم الجامعية",             desc: "Give prospective students a complete walkthrough of the full campus experience.", descAr: "أعطِ الطلاب المحتملين جولة كاملة لتجربة الحرم الجامعي الكاملة." },
    ],
    aiSection: { headline: "AI-Powered Campus Experience Personalisation", headlineAr: "تخصيص تجربة الحرم بالذكاء الاصطناعي", body: "X360 can personalise the campus virtual tour experience by programme interest — showing prospective students and parents the facilities most relevant to their chosen field of study, increasing engagement and conversion.", bodyAr: "يمكن لـ X360 تخصيص تجربة الجولة الافتراضية للحرم حسب الاهتمام البرامجي — عرض المرافق الأكثر صلة بالمجال الدراسي المختار." },
    finalCta: { headline: "Open Your Campus to the World — Permanently.", headlineAr: "افتح حرمك للعالم — بشكل دائم.", sub: "Partner with X360 to create a permanent virtual open day that attracts applicants from across the GCC and beyond.", subAr: "تشارك مع X360 لإنشاء يوم أبواب مفتوحة افتراضي دائم يستقطب المتقدمين من جميع أنحاء الخليج." },
  },

  "government": {
    slug: "government",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Government Buildings",
    nameAr: "المباني الحكومية",
    accentColor: "rgba(100,140,220,0.14)",
    hero: {
      label: "Government",    labelAr: "الحكومة",
      headline: "DOCUMENT PUBLIC SPACES\nFOR THE DIGITAL AGE.",
      headlineAr: "وثّق الفضاءات العامة\nللعصر الرقمي.",
      sub: "360° virtual documentation of government facilities that improves public access, transparency, and operational efficiency across Saudi Arabia.",
      subAr: "توثيق 360° افتراضي للمرافق الحكومية يحسن وصول الجمهور والشفافية والكفاءة التشغيلية في جميع أنحاء المملكة.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/government.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Users",        title: "Citizens Struggle to Navigate Facilities", titleAr: "المواطنون يكافحون للتنقل في المرافق",   desc: "Government buildings with multiple departments and floors create confusion — wasting citizen and staff time.", descAr: "المباني الحكومية ذات الأقسام والطوابق المتعددة تخلق ارتباكاً — مما يضيع وقت المواطنين والموظفين." },
      { iconKey: "Globe",        title: "Remote Communities Lack Physical Access",  titleAr: "المجتمعات البعيدة تفتقر للوصول الفعلي",  desc: "Citizens in remote regions must travel long distances to assess and interact with government facilities.", descAr: "يضطر المواطنون في المناطق النائية للسفر لمسافات طويلة للتعامل مع المرافق الحكومية." },
      { iconKey: "Building2",    title: "Facility Management Is Inefficient",      titleAr: "إدارة المرافق غير فعّالة",               desc: "Without accurate spatial documentation, government facility management teams face ongoing maintenance and planning inefficiencies.", descAr: "بدون توثيق مكاني دقيق، تواجه فرق إدارة المرافق الحكومية كفاءة محدودة في الصيانة والتخطيط." },
      { iconKey: "Clock",        title: "Inspection and Audit Processes Are Slow",  titleAr: "عمليات التفتيش والتدقيق بطيئة",          desc: "Physical inspections of government facilities require significant coordination, travel, and time investment.", descAr: "الفحوصات الفعلية للمرافق الحكومية تتطلب تنسيقاً وسفراً واستثماراً كبيراً في الوقت." },
    ],
    solutions: [
      { step: 1, headline: "Complete Facility Documentation",  headlineAr: "توثيق شامل للمرافق",              body: "Capture every department, floor, service counter, and facility zone in accurate 360° — creating a permanent digital record of the facility.", bodyAr: "التقط كل قسم وطابق ومنضدة خدمة ومنطقة مرافق بـ 360° دقيق — إنشاء سجل رقمي دائم للمرفق." },
      { step: 2, headline: "Public Wayfinding & Access",      headlineAr: "التوجيه والوصول العام",             body: "Publish virtual building guides online — helping citizens navigate departments, find services, and prepare before physical visits.", bodyAr: "انشر أدلة البناء الافتراضية أونلاين — مما يساعد المواطنين على التنقل بين الأقسام والعثور على الخدمات." },
      { step: 3, headline: "Remote Facility Management",      headlineAr: "إدارة المرافق عن بُعد",             body: "Give facility managers accurate spatial documentation for maintenance planning, compliance audits, and renovation scoping — without repeated site visits.", bodyAr: "أعطِ مديري المرافق توثيقاً مكانياً دقيقاً لتخطيط الصيانة وعمليات تدقيق الامتثال." },
    ],
    showcase: { title: "Transparent. Accessible. Digitally Documented.", titleAr: "شفاف. متاح. موثق رقمياً.", body: "See how X360 supports Saudi government entities in improving public access and operational efficiency with comprehensive virtual facility documentation.", bodyAr: "شاهد كيف تدعم X360 الجهات الحكومية السعودية في تحسين وصول الجمهور والكفاءة التشغيلية.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Improved Citizen Experience", titleAr: "تحسين تجربة المواطن",      body: "Online virtual guides reduce confusion and preparation time before facility visits.", bodyAr: "الأدلة الافتراضية أونلاين تقلل الارتباك ووقت الاستعداد قبل زيارات المرافق." },
      { title: "Efficient Facility Management", titleAr: "إدارة مرافق فعّالة",     body: "Accurate spatial documentation supports maintenance, planning, and compliance teams.", bodyAr: "يدعم التوثيق المكاني الدقيق فرق الصيانة والتخطيط والامتثال." },
      { title: "Remote Inspection Capability",  titleAr: "قدرة الفحص عن بُعد",    body: "Virtual facility tours reduce the need for costly physical inspections and audits.", bodyAr: "جولات المرافق الافتراضية تقلل الحاجة للفحوصات الفعلية المكلفة." },
      { title: "Digital Transformation Signal", titleAr: "إشارة التحول الرقمي",   body: "Virtual documentation demonstrates public sector leadership in digital services.", bodyAr: "التوثيق الافتراضي يُظهر ريادة القطاع العام في الخدمات الرقمية." },
    ],
    useCases: [
      { title: "Ministry Buildings",     titleAr: "مباني الوزارات",          desc: "Document ministry headquarters for public access and inter-department navigation.", descAr: "وثّق مقرات الوزارات للوصول العام والتنقل بين الأقسام." },
      { title: "Municipal Offices",      titleAr: "المكاتب البلدية",          desc: "Create public wayfinding guides for citizen services centres.",                    descAr: "أنشئ أدلة توجيه عام لمراكز خدمات المواطنين." },
      { title: "Public Courts",          titleAr: "المحاكم العامة",           desc: "Help legal professionals and citizens navigate court facilities remotely.",        descAr: "ساعد المهنيين القانونيين والمواطنين على التنقل في مرافق المحاكم عن بُعد." },
      { title: "Immigration Centers",    titleAr: "مراكز الهجرة",             desc: "Reduce visitor anxiety with comprehensive virtual facility previews.",             descAr: "قلل قلق الزوار بمعاينات مرافق افتراضية شاملة." },
    ],
    aiSection: { headline: "Smart Government Facility Intelligence", headlineAr: "ذكاء المرافق الحكومية الذكية", body: "X360 can integrate digital twin data — including department directories, queue management, and real-time service availability — directly inside government virtual tours, creating a fully interactive citizen navigation platform.", bodyAr: "يمكن لـ X360 دمج بيانات التوأم الرقمي — بما فيها أدلة الأقسام وإدارة الطوابير وتوفر الخدمات في الوقت الفعلي — مباشرة داخل الجولات الافتراضية الحكومية." },
    finalCta: { headline: "Make Your Government Facilities Accessible — Digitally.", headlineAr: "اجعل مرافقك الحكومية متاحة — رقمياً.", sub: "Partner with X360 to deliver comprehensive virtual documentation that improves citizen access and operational efficiency.", subAr: "تشارك مع X360 لتقديم توثيق افتراضي شامل يحسن وصول المواطنين والكفاءة التشغيلية." },
  },

  "event-halls": {
    slug: "event-halls",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Event Spaces",
    nameAr: "قاعات الفعاليات",
    accentColor: "rgba(220,160,80,0.14)",
    hero: {
      label: "Events",          labelAr: "الفعاليات",
      headline: "FILL YOUR HALL\nBEFORE SITE VISITS.",
      headlineAr: "املأ قاعتك\nقبل الزيارات الميدانية.",
      sub: "Immersive event hall virtual tours that help planners visualise, commit, and sign contracts — from anywhere in the world.",
      subAr: "جولات افتراضية غامرة لقاعات الفعاليات تساعد المخططين على التصور والالتزام وتوقيع العقود — من أي مكان في العالم.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/event-spaces.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Users",        title: "Planners Need Full Visualisation Before Committing", titleAr: "المخططون يحتاجون تصوراً كاملاً قبل الالتزام", desc: "Event planners cannot commit to high-value bookings without a thorough understanding of the hall's capacity, layout, and potential.", descAr: "لا يستطيع مخططو الفعاليات الالتزام بحجوزات عالية القيمة بدون فهم شامل لسعة القاعة وتخطيطها وإمكاناتها." },
      { iconKey: "Globe",        title: "Destination Clients Book Remotely",         titleAr: "يحجز العملاء الوجهة عن بُعد",            desc: "Wedding, gala, and corporate clients from other cities or countries need immersive remote access before committing.", descAr: "يحتاج عملاء الأعراس والحفلات والشركات من المدن أو الدول الأخرى وصولاً غامراً عن بُعد قبل الالتزام." },
      { iconKey: "Clock",        title: "Multiple Visits Slow the Sales Cycle",      titleAr: "الزيارات المتعددة تُبطئ دورة المبيعات",  desc: "Multi-stakeholder event decisions require multiple separate site visits — adding weeks to the booking timeline.", descAr: "قرارات الفعاليات متعددة أصحاب المصلحة تتطلب زيارات ميدانية منفصلة متعددة — مما يُضيف أسابيع للجدول الزمني للحجز." },
      { iconKey: "MessageSquare", title: "Empty Hall Photos Don't Inspire",          titleAr: "صور القاعة الفارغة لا تُلهم",             desc: "An empty event hall in a photo is hard to visualise as a grand gala — causing hesitation and delayed decisions.", descAr: "يصعب تخيّل قاعة فعاليات فارغة في صورة كحفل كبير — مما يسبب التردد وتأخير القرارات." },
    ],
    solutions: [
      { step: 1, headline: "Dressed & Empty Configuration Tours", headlineAr: "جولات الإعداد المُزيَّن والفارغ",       body: "Present halls in multiple dressed configurations — gala, wedding, conference, and theatre — as well as empty layout views.", bodyAr: "قدّم القاعات في إعدادات مُزيَّنة متعددة — حفل كبير وعرس ومؤتمر ومسرح — وكذلك عروض التخطيط الفارغة." },
      { step: 2, headline: "Remote Multi-Stakeholder Access",     headlineAr: "وصول متعدد الأطراف عن بُعد",           body: "Share a single virtual tour link with all decision-makers — enabling simultaneous evaluation and faster contract sign-off.", bodyAr: "شارك رابطاً واحداً للجولة الافتراضية مع جميع صانعي القرار — مما يتيح التقييم الفوري وتوقيع العقد الأسرع." },
      { step: 3, headline: "Expand Your Geographic Catchment",   headlineAr: "وسّع نطاقك الجغرافي",                  body: "Attract bookings from corporate clients and destination event planners across the GCC — without requiring physical visits.", bodyAr: "استقطب حجوزات من العملاء المؤسسيين ومخططي الفعاليات عبر الخليج — دون زيارات فعلية." },
    ],
    showcase: { title: "Visualise the Event. Fill the Calendar.", titleAr: "تصور الفعالية. املأ التقويم.", body: "See how X360 helps Saudi Arabia's leading event halls reduce booking timelines and attract destination clients with immersive virtual tours.", bodyAr: "شاهد كيف تساعد X360 قاعات الفعاليات الرائدة على تقليص جداول الحجوزات وجذب عملاء الوجهة.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Faster Contract Sign-Off",     titleAr: "توقيع عقد أسرع",         body: "Remote virtual tours reduce required physical visits — shortening the contract timeline significantly.", bodyAr: "الجولات الافتراضية عن بُعد تقلص الزيارات الفعلية المطلوبة — مما يقصر الجدول الزمني للعقد بشكل كبير." },
      { title: "Destination Event Revenue",    titleAr: "إيرادات فعاليات الوجهة", body: "Attract high-value bookings from corporate and wedding clients across the region.", bodyAr: "استقطب حجوزات عالية القيمة من العملاء المؤسسيين وعملاء الأعراس عبر المنطقة." },
      { title: "Higher Booking Conversion",    titleAr: "تحويل حجوزات أعلى",      body: "Planners who fully visualise the space convert at significantly higher rates.", bodyAr: "المخططون الذين يصوّرون المساحة بالكامل يتحولون بمعدلات أعلى بكثير." },
      { title: "Portfolio Showcase",           titleAr: "عرض المحفظة",             body: "Show all hall configurations and sizes in one seamless digital portfolio.", bodyAr: "اعرض جميع إعدادات القاعات وأحجامها في محفظة رقمية واحدة سلسة." },
    ],
    useCases: [
      { title: "Wedding & Celebration Halls", titleAr: "قاعات الأعراس والاحتفالات",  desc: "Present dressed configurations to help couples visualise their perfect event.", descAr: "قدّم الإعدادات المُزيَّنة لمساعدة الأزواج على تصور فعاليتهم المثالية." },
      { title: "Corporate Gala Dinners",      titleAr: "حفلات عشاء الشركات الكبرى", desc: "Help event planners evaluate capacity, AV, and dining layout options.",         descAr: "ساعد مخططي الفعاليات على تقييم السعة وإعدادات الصوت والصورة وخيارات تخطيط تناول الطعام." },
      { title: "Conference & Seminar Halls",  titleAr: "قاعات المؤتمرات والندوات",   desc: "Showcase theatre and conference configurations for corporate bookings.",         descAr: "اعرض إعدادات المسرح والمؤتمرات للحجوزات المؤسسية." },
      { title: "Exhibition Spaces",           titleAr: "مساحات المعارض",              desc: "Demonstrate hall floor plans and access routes for exhibition operators.",      descAr: "أظهر مخططات أرضية القاعات ومسارات الوصول لمشغلي المعارض." },
    ],
    aiSection: { headline: "AI Event Layout Visualiser", headlineAr: "مُصوِّر تخطيط الفعالية بالذكاء الاصطناعي", body: "X360 can overlay AI-powered event configuration previews inside your hall virtual tour — showing planners exactly how their layout, lighting, and décor vision will look inside your space before they commit.", bodyAr: "يمكن لـ X360 إضافة معاينات تكوين الفعالية بالذكاء الاصطناعي داخل جولة قاعتك الافتراضية." },
    finalCta: { headline: "Fill Your Calendar With Confident, Committed Bookings.", headlineAr: "املأ تقويمك بحجوزات واثقة وملتزمة.", sub: "Partner with X360 to give event planners the immersive access they need to commit — without requiring site visits.", subAr: "تشارك مع X360 لمنح مخططي الفعاليات الوصول الغامر الذي يحتاجونه للالتزام." },
  },

  "medical": {
    slug: "medical",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Medical Centers",
    nameAr: "المراكز الطبية",
    accentColor: "rgba(100,180,220,0.14)",
    hero: {
      label: "Healthcare",     labelAr: "الرعاية الصحية",
      headline: "BUILD PATIENT TRUST\nBEFORE THE FIRST VISIT.",
      headlineAr: "ابنِ ثقة المريض\nقبل الزيارة الأولى.",
      sub: "Immersive medical facility virtual tours that reduce patient anxiety, build institutional trust, and attract patients from across the region.",
      subAr: "جولات افتراضية غامرة للمرافق الطبية تقلل قلق المريض وتبني ثقة مؤسسية وتستقطب المرضى من جميع أنحاء المنطقة.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/medical.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Users",    title: "Patient Anxiety Begins Before Arrival",    titleAr: "قلق المريض يبدأ قبل الوصول",            desc: "Patients experiencing anxiety about medical procedures suffer heightened distress without knowing what to expect from the facility.", descAr: "المرضى القلقون بشأن الإجراءات الطبية يعانون من ضائقة متصاعدة دون معرفة ما يتوقعونه من المرفق." },
      { iconKey: "Globe",    title: "Medical Tourism Patients Decide Remotely", titleAr: "مرضى السياحة الطبية يقررون عن بُعد",    desc: "International medical tourism patients in GCC, Europe, and Asia choose facilities based entirely on digital content quality.", descAr: "المرضى الدوليون للسياحة الطبية يختارون المرافق بناءً كلياً على جودة المحتوى الرقمي." },
      { iconKey: "Building2", title: "New Facilities Lack Patient Trust",       titleAr: "المرافق الجديدة تفتقر لثقة المرضى",   desc: "New and expanding medical facilities struggle to build patient trust and market awareness without established reputation.", descAr: "المرافق الطبية الجديدة والمتوسعة تكافح لبناء ثقة المرضى والوعي السوقي بدون سمعة راسخة." },
      { iconKey: "Eye",      title: "Premium Facilities Are Underrepresented",  titleAr: "المرافق المتميزة ممثلة بشكل ناقص",    desc: "Premium private hospitals with world-class equipment and facilities rarely showcase them effectively online.", descAr: "المستشفيات الخاصة المتميزة ذات المعدات والمرافق العالمية نادراً ما تعرضها بفعالية أونلاين." },
    ],
    solutions: [
      { step: 1, headline: "Facility Trust-Building Tours",       headlineAr: "جولات بناء ثقة المرافق",            body: "360° walkthroughs of reception, consultation rooms, treatment areas, and recovery suites — reducing patient anxiety before the first appointment.", bodyAr: "جولات 360° للاستقبال وغرف الاستشارة ومناطق العلاج وأجنحة التعافي — تقليل قلق المريض قبل الموعد الأول." },
      { step: 2, headline: "Medical Tourism Digital Showcase",    headlineAr: "عرض رقمي للسياحة الطبية",           body: "Present your facility's equipment, technology, and care environments to international patients remotely — converting medical tourism interest into confirmed appointments.", bodyAr: "قدّم معدات مرفقك وتقنيته وبيئات الرعاية للمرضى الدوليين عن بُعد." },
      { step: 3, headline: "Institutional Credibility Positioning", headlineAr: "تموضع المصداقية المؤسسية",        body: "Cinematic facility tours communicate investment in patient care — positioning your centre as a premium, trustworthy healthcare provider.", bodyAr: "جولات المرافق السينمائية توصل الاستثمار في رعاية المريض — تضع مركزك كمزود رعاية صحية موثوق ومتميز." },
    ],
    showcase: { title: "Build Trust Before the First Appointment.", titleAr: "ابنِ الثقة قبل الموعد الأول.", body: "See how X360 helps Saudi Arabia's leading private medical centres attract patients, reduce anxiety, and build institutional trust with immersive facility tours.", bodyAr: "شاهد كيف تساعد X360 المراكز الطبية الخاصة الرائدة على استقطاب المرضى وتقليل القلق.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Reduced Patient Anxiety",        titleAr: "تقليل قلق المريض",         body: "Virtual facility previews significantly reduce pre-appointment patient anxiety.", bodyAr: "المعاينات الافتراضية للمرافق تقلل بشكل كبير من قلق المريض قبل الموعد." },
      { title: "Medical Tourism Patient Reach",  titleAr: "الوصول لمرضى السياحة الطبية", body: "Attract international patients across GCC, Europe, and Asia with superior digital content.", bodyAr: "استقطب المرضى الدوليين عبر الخليج وأوروبا وآسيا بمحتوى رقمي متفوق." },
      { title: "New Facility Market Entry",      titleAr: "دخول السوق لمرافق جديدة",  body: "Accelerate patient trust-building for new and expanding medical facilities.", bodyAr: "عجّل بناء ثقة المريض للمرافق الطبية الجديدة والمتوسعة." },
      { title: "Premium Care Positioning",       titleAr: "تموضع الرعاية المتميزة",   body: "World-class equipment and care environments showcase through cinematic facility tours.", bodyAr: "المعدات والبيئات الرعائية العالمية تُعرض من خلال جولات المرافق السينمائية." },
    ],
    useCases: [
      { title: "Private Hospitals",           titleAr: "المستشفيات الخاصة",        desc: "Showcase clinical excellence and patient care environments to build institutional trust.", descAr: "اعرض التميز السريري وبيئات رعاية المريض لبناء الثقة المؤسسية." },
      { title: "Specialist Medical Centers",  titleAr: "المراكز الطبية المتخصصة",  desc: "Present specialist consultation areas and treatment technologies to medical tourism patients.", descAr: "قدّم مناطق الاستشارة المتخصصة وتقنيات العلاج للمرضى الدوليين." },
      { title: "Dental & Cosmetic Clinics",   titleAr: "عيادات الأسنان والتجميل",  desc: "Build patient confidence with immersive clinic environment previews.", descAr: "ابنِ ثقة المريض بمعاينات بيئة العيادة الغامرة." },
      { title: "Rehabilitation Centers",      titleAr: "مراكز إعادة التأهيل",      desc: "Show recovery suites, therapy areas, and wellness facilities to patients and families.", descAr: "أظهر أجنحة التعافي ومناطق العلاج ومرافق العافية للمرضى والأسر." },
    ],
    aiSection: { headline: "Patient Journey Intelligence", headlineAr: "ذكاء رحلة المريض", body: "X360 can personalise medical facility virtual tours by patient journey — guiding cardiac patients to cardiology areas, orthopaedic patients to physiotherapy suites, and international patients to concierge services — reducing anxiety through relevant spatial familiarity.", bodyAr: "يمكن لـ X360 تخصيص الجولات الافتراضية للمرافق الطبية حسب رحلة المريض — توجيه مرضى القلب لمناطق أمراض القلب." },
    finalCta: { headline: "Build Patient Trust Before They Walk Through the Door.", headlineAr: "ابنِ ثقة المريض قبل أن يمروا بالباب.", sub: "Partner with X360 to create immersive facility tours that reduce patient anxiety, attract medical tourism, and build institutional credibility.", subAr: "تشارك مع X360 لإنشاء جولات مرافق غامرة تقلل قلق المريض وتستقطب السياحة الطبية." },
  },

  "museums": {
    slug: "museums",
    parentPath: PARENT,
    siblings: SIBLINGS,
    name: "Museums",
    nameAr: "المتاحف",
    accentColor: "rgba(180,140,220,0.14)",
    hero: {
      label: "Culture",         labelAr: "الثقافة",
      headline: "OPEN YOUR COLLECTION\nTO THE WORLD.",
      headlineAr: "افتح مجموعتك\nللعالم.",
      sub: "360° museum virtual tours that extend your cultural reach globally — attracting international visitors, donors, and educational partners.",
      subAr: "جولات افتراضية 360° للمتاحف تمدد وصولك الثقافي عالمياً — استقطاب الزوار الدوليين والمانحين والشركاء التعليميين.",
      headlineSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
      videoSrc: "/x360/museums.mp4",
    },
    combineChallengeSolutions: true,
    problems: [
      { iconKey: "Globe",    title: "Global Audiences Can't Access Physical Museums", titleAr: "الجماهير العالمية لا تستطيع الوصول للمتاحف الفعلية", desc: "Museum collections of cultural and historical significance deserve global audiences — yet physical access limits reach severely.", descAr: "مجموعات المتاحف ذات الأهمية الثقافية والتاريخية تستحق جمهوراً عالمياً — لكن الوصول الفعلي يحدّ من المدى بشدة." },
      { iconKey: "Users",    title: "Low Visitor Conversion From Online Research",    titleAr: "تحويل زيارة منخفض من البحث أونلاين",        desc: "Potential visitors researching museums online need more than static photos to commit to a physical visit.", descAr: "الزوار المحتملون الذين يبحثون عن المتاحف أونلاين يحتاجون أكثر من صور ثابتة للالتزام بزيارة فعلية." },
      { iconKey: "Building2", title: "Educational Partnerships Are Hard to Scale",  titleAr: "يصعب توسيع الشراكات التعليمية",               desc: "Schools and universities that want to integrate museum collections into curricula are limited by physical access constraints.", descAr: "المدارس والجامعات التي تريد دمج مجموعات المتاحف في المناهج محدودة بقيود الوصول الفعلي." },
      { iconKey: "Eye",      title: "Special Exhibitions Are Undermarketed",        titleAr: "المعارض الخاصة غير مسوّقة بشكل كافٍ",      desc: "Temporary and special exhibitions rarely receive the digital attention they need to drive maximum visitor attendance.", descAr: "المعارض المؤقتة والخاصة نادراً ما تحظى بالاهتمام الرقمي الذي تحتاجه لزيادة حضور الزوار." },
    ],
    solutions: [
      { step: 1, headline: "Immersive Gallery Walkthroughs",  headlineAr: "جولات غاليري غامرة",                 body: "360° documentation of every gallery, exhibition hall, and artefact display — giving global audiences a genuine museum experience remotely.", bodyAr: "توثيق 360° لكل غاليري وقاعة معرض وعرض قطع أثرية — منح الجماهير العالمية تجربة متحف حقيقية عن بُعد." },
      { step: 2, headline: "Digital Exhibition Marketing",    headlineAr: "تسويق المعارض الرقمية",               body: "Create immersive virtual previews of special exhibitions — driving pre-visit excitement and increasing physical attendance.", bodyAr: "أنشئ معاينات افتراضية غامرة للمعارض الخاصة — مما يثير الحماس قبل الزيارة ويزيد الحضور الفعلي." },
      { step: 3, headline: "Global Educational Access",      headlineAr: "وصول تعليمي عالمي",                   body: "Make your collection accessible to schools and universities worldwide — driving educational partnerships and new visitor pipelines.", bodyAr: "اجعل مجموعتك متاحة للمدارس والجامعات حول العالم — مما يدفع الشراكات التعليمية وقنوات الزوار الجديدة." },
    ],
    showcase: { title: "Every Artefact. Every Gallery. Globally Accessible.", titleAr: "كل قطعة أثرية. كل غاليري. متاح عالمياً.", body: "See how X360 helps Saudi Arabia's museums extend their cultural reach, drive visitor attendance, and build educational partnerships with immersive virtual tours.", bodyAr: "شاهد كيف تساعد X360 متاحف المملكة على مدّ وصولها الثقافي وزيادة حضور الزوار.", videoSrc: "/x360/industries/real-estate.mp4" },
    benefits: [
      { title: "Global Cultural Reach",       titleAr: "وصول ثقافي عالمي",           body: "Extend your collection's reach to global audiences regardless of physical location.", bodyAr: "مدّ وصول مجموعتك إلى الجماهير العالمية بغض النظر عن الموقع الفعلي." },
      { title: "Higher Visitor Conversion",   titleAr: "تحويل زوار أعلى",            body: "Virtual previews of exhibitions drive significantly higher physical visit intent.", bodyAr: "المعاينات الافتراضية للمعارض تدفع نية زيارة فعلية أعلى بشكل ملحوظ." },
      { title: "Educational Partnerships",    titleAr: "الشراكات التعليمية",         body: "Make collections accessible to schools and universities — building sustainable visitor pipelines.", bodyAr: "اجعل المجموعات متاحة للمدارس والجامعات — مما يبني قنوات زوار مستدامة." },
      { title: "Special Exhibition Marketing", titleAr: "تسويق المعارض الخاصة",      body: "Virtual exhibition previews drive awareness and pre-visit ticket sales.", bodyAr: "المعاينات الافتراضية للمعارض تدفع الوعي ومبيعات التذاكر قبل الزيارة." },
    ],
    useCases: [
      { title: "Art & Culture Museums",       titleAr: "متاحف الفن والثقافة",         desc: "Showcase permanent collections and rotating gallery exhibitions globally.",     descAr: "اعرض المجموعات الدائمة ومعارض الغاليري المتداولة عالمياً." },
      { title: "History & Heritage Centres",  titleAr: "مراكز التاريخ والتراث",        desc: "Preserve and share historical artefacts and cultural heritage digitally.",      descAr: "احفظ وشارك القطع الأثرية التاريخية والتراث الثقافي رقمياً." },
      { title: "Science & Technology Museums", titleAr: "متاحف العلوم والتكنولوجيا",  desc: "Give students and researchers immersive access to interactive science exhibits.", descAr: "أعطِ الطلاب والباحثين وصولاً غامراً للمعارض العلمية التفاعلية." },
      { title: "Temporary Exhibitions",       titleAr: "المعارض المؤقتة",              desc: "Market special exhibitions with virtual previews that drive physical attendance.", descAr: "سوّق للمعارض الخاصة بمعاينات افتراضية تدفع الحضور الفعلي." },
    ],
    aiSection: { headline: "AI-Powered Collection Discovery", headlineAr: "اكتشاف المجموعة بالذكاء الاصطناعي", body: "X360 can integrate AI-powered artefact recognition and contextual storytelling directly inside museum virtual tours — giving visitors personalised narratives, related collection items, and educational content as they explore each gallery.", bodyAr: "يمكن لـ X360 دمج التعرف على القطع الأثرية بالذكاء الاصطناعي والسرد السياقي مباشرة داخل الجولات الافتراضية للمتاحف." },
    finalCta: { headline: "Share Your Collection With the Entire World.", headlineAr: "شارك مجموعتك مع العالم بأسره.", sub: "Partner with X360 to create immersive museum virtual tours that extend cultural reach, drive visitor attendance, and build global educational partnerships.", subAr: "تشارك مع X360 لإنشاء جولات افتراضية غامرة للمتاحف تمدد الوصول الثقافي وتدفع حضور الزوار." },
  },
};

export function getOthersCategory(slug: string): IndustryData | undefined {
  return OTHERS_CATEGORIES[slug];
}

export function getAllOthersSlugs(): string[] {
  return Object.keys(OTHERS_CATEGORIES);
}
