"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PHONE_SPLIT_RE = /(\+\d[\d\s]{6,})/g;
const PHONE_TEST_RE  = /^\+\d[\d\s]{6,}$/;
function renderWithPhones(text: string) {
  const parts = text.split(PHONE_SPLIT_RE);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    PHONE_TEST_RE.test(p) ? <span key={i} dir="ltr" style={{ unicodeBidi: "embed" }}>{p}</span> : p
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.05 },
  }),
};

const companies = [
  {
    name: "Electi AI",
    country: "Saudi Arabia",
    brand: null,
    services: [],
    address:
      "2413 Ad Damman Road, Ghirnath Dist.\nUnit No 2414, Riyadh 13242-7933\nKingdom of Saudi Arabia",
  },
  {
    name: "MODERN Dimension Energy Company — X360",
    country: "India",
    brand: null,
    services: [],
    address: "Al Munisiyah, Riyadh ,Kingdom of Saudi Arabia",
  },
  {
    name: "ZONOZA GROUP FOR TRADING AND CONTRACTING",
    country: "Qatar",
    brand: null,
    services: [],
    address:
      "Number 79, Unit 1\nAl-Azizia Othman Street\nPO Box 10455\nDoha, State of Qatar",
  },
];

const servicesList = [
  "360 Virtual Tours",
  "3D Digital Twins",
  "VR / AR Experiences",
  "Website Development",
  "Mobile Application Development",
  "AI Solutions & AI Agents",
  "ERP / SAP Systems",
  "Enterprise Infrastructure",
  "Automation Systems",
  "Hosting Services",
  "Digital Branding",
  "Analytics Systems",
  "Dashboard Development",
  "CRM Integrations",
  "Cloud Infrastructure",
  "Content Creation",
  "Immersive Experiences",
  "Marketing Technology Solutions",
];

const servicesListAr = [
  "جولات 360° افتراضية",
  "التوائم الرقمية ثلاثية الأبعاد",
  "تجارب الواقع الافتراضي والمعزز",
  "تطوير المواقع الإلكترونية",
  "تطوير تطبيقات الجوال",
  "حلول الذكاء الاصطناعي ووكلاؤه",
  "أنظمة ERP وSAP",
  "البنية التحتية المؤسسية",
  "أنظمة الأتمتة",
  "خدمات الاستضافة",
  "الهوية الرقمية",
  "أنظمة التحليلات",
  "تطوير لوحات التحكم",
  "تكاملات CRM",
  "البنية التحتية السحابية",
  "إنشاء المحتوى",
  "التجارب الغامرة",
  "حلول تكنولوجيا التسويق",
];

type TermSection = {
  title: string;
  titleAr?: string;
  content: string | string[] | { label: string; items: string[] }[];
  contentAr?: string | string[] | { label: string; items: string[] }[];
  type?: "text" | "bullets" | "grid-bullets";
};

const sections: TermSection[] = [
  {
    title: "Services Provided",
    titleAr: "الخدمات المقدمة",
    type: "text",
    content: `X360 and its associated companies provide services including but not limited to the list below.\n\nThe detailed scope of work, deliverables, pricing, and timelines shall be defined in the respective Proposal, Work Order, Purchase Order, Quotation, or Service Agreement.`,
    contentAr: `تقدم X360 وشركاتها المرتبطة خدمات تشمل على سبيل المثال لا الحصر القائمة أدناه.\n\nتُحدَّد النطاق التفصيلي للعمل والمخرجات والأسعار والجداول الزمنية في العروض أو أوامر العمل أو أوامر الشراء أو عروض الأسعار أو اتفاقيات الخدمة المعنية.`,
  },
  {
    title: "Payment Terms",
    titleAr: "شروط الدفع",
    type: "grid-bullets",
    content: [
      {
        label: "Payment Schedules",
        items: [
          "Advance deposits",
          "Milestone payments",
          "Recurring subscription fees",
          "Hosting renewals",
          "Support retainers",
          "Annual maintenance agreements",
        ],
      },
      {
        label: "Accepted Methods",
        items: [
          "Bank transfer",
          "Online payment gateways",
          "Corporate payments",
          "Other mutually agreed methods",
        ],
      },
      {
        label: "Late Payments May Result In",
        items: [
          "Service suspension",
          "Delayed delivery",
          "Additional administrative charges",
          "Restricted access to hosted systems",
        ],
      },
    ],
    contentAr: [
      {
        label: "جداول الدفع",
        items: [
          "دفعات مقدمة",
          "دفعات المراحل",
          "رسوم الاشتراك المتكررة",
          "تجديدات الاستضافة",
          "عقود الدعم",
          "اتفاقيات الصيانة السنوية",
        ],
      },
      {
        label: "الطرق المقبولة",
        items: [
          "التحويل المصرفي",
          "بوابات الدفع الإلكتروني",
          "المدفوعات المؤسسية",
          "طرق أخرى متفق عليها",
        ],
      },
      {
        label: "قد يترتب على التأخر في الدفع",
        items: [
          "تعليق الخدمة",
          "تأخر التسليم",
          "رسوم إدارية إضافية",
          "تقييد الوصول للأنظمة المستضافة",
        ],
      },
    ],
  },
  {
    title: "Project Delivery & Review",
    titleAr: "تسليم المشروع ومراجعته",
    type: "text",
    content: `Project timelines will be communicated based on the agreed scope of work.\n\nClients are responsible for reviewing deliverables promptly, providing approvals, sharing feedback within reasonable timelines, and supplying required materials and information.\n\nDelays in client communication, approvals, or resource submission may affect delivery schedules.`,
    contentAr: `ستُحدَّد الجداول الزمنية للمشروع بناءً على النطاق المتفق عليه.\n\nيتحمل العملاء مسؤولية مراجعة المخرجات بسرعة وتقديم الموافقات ومشاركة الملاحظات ضمن جداول زمنية معقولة وتوفير المواد والمعلومات المطلوبة.\n\nقد يؤثر التأخر في التواصل أو الموافقات أو تقديم الموارد على جداول التسليم.`,
  },
  {
    title: "Client Responsibilities",
    titleAr: "مسؤوليات العميل",
    type: "bullets",
    content: [
      "Provide accurate information",
      "Provide necessary project materials",
      "Provide timely approvals",
      "Provide access to required systems or locations",
      "Comply with legal and regulatory obligations related to their business",
      "For physical services (360 virtual tours, photography, scanning, on-site production) ensure proper access and permissions",
    ],
    contentAr: [
      "تقديم معلومات دقيقة",
      "توفير مواد المشروع اللازمة",
      "تقديم الموافقات في الوقت المناسب",
      "توفير الوصول للأنظمة أو المواقع المطلوبة",
      "الامتثال للالتزامات القانونية والتنظيمية المتعلقة بأعمالهم",
      "للخدمات الميدانية (جولات 360° والتصوير والمسح والإنتاج) ضمان الوصول والتصاريح المناسبة",
    ],
  },
  {
    title: "Changes & Revisions",
    titleAr: "التغييرات والمراجعات",
    type: "text",
    content: `Any changes to the agreed project scope must be requested in writing.\n\nAdditional requests outside the original scope may result in revised timelines, additional charges, or updated agreements.\n\nX360 reserves the right to assess and approve all requested revisions.`,
    contentAr: `يجب تقديم أي تغييرات على نطاق المشروع المتفق عليه كتابياً.\n\nقد تؤدي الطلبات الإضافية خارج النطاق الأصلي إلى تعديل الجداول الزمنية أو رسوم إضافية أو اتفاقيات محدّثة.\n\nتحتفظ X360 بالحق في تقييم جميع المراجعات المطلوبة والموافقة عليها.`,
  },
  {
    title: "Hosting, Maintenance & Third-Party Services",
    titleAr: "الاستضافة والصيانة وخدمات الجهات الخارجية",
    type: "text",
    content: `Where applicable, X360 may provide hosting services, maintenance, cloud systems, integrations, and third-party platform connections.\n\nThird-party services may include cloud providers, AI systems, analytics tools, payment gateways, hosting infrastructure, and communication platforms.\n\nX360 is not liable for interruptions caused by third-party providers beyond reasonable control.`,
    contentAr: `حيثما ينطبق ذلك، قد تقدم X360 خدمات الاستضافة والصيانة والأنظمة السحابية والتكاملات واتصالات المنصات الخارجية.\n\nقد تشمل الخدمات الخارجية مزودي الخدمات السحابية وأنظمة الذكاء الاصطناعي وأدوات التحليلات وبوابات الدفع والبنية التحتية للاستضافة ومنصات التواصل.\n\nلا تتحمل X360 مسؤولية الانقطاعات الناجمة عن مزودي الخدمات الخارجية خارج نطاق السيطرة المعقولة.`,
  },
  {
    title: "AI & Automation Systems",
    titleAr: "الذكاء الاصطناعي وأنظمة الأتمتة",
    type: "text",
    content: `Clients acknowledge that AI-based systems, automation tools, and predictive technologies may produce variable outputs.\n\nWhile X360 strives for high-quality implementation and optimization, we do not guarantee uninterrupted AI behavior, fully autonomous accuracy, prediction certainty, or uninterrupted automation operations.\n\nClients remain responsible for reviewing and approving operational outputs where applicable.`,
    contentAr: `يُقر العملاء بأن الأنظمة القائمة على الذكاء الاصطناعي وأدوات الأتمتة والتقنيات التنبؤية قد تنتج مخرجات متغيرة.\n\nبينما تسعى X360 جاهدةً إلى تحقيق تنفيذ وتحسين عالي الجودة، لا نضمن سلوكاً آلياً متواصلاً أو دقة مستقلة كاملة أو يقيناً في التنبؤات أو عمليات أتمتة متواصلة.\n\nيظل العملاء مسؤولين عن مراجعة المخرجات التشغيلية والموافقة عليها حيثما ينطبق ذلك.`,
  },
  {
    title: "Intellectual Property",
    titleAr: "الملكية الفكرية",
    type: "text",
    content: `Unless otherwise agreed in writing:\n\n• X360 retains ownership of all intellectual property, source files, concepts, frameworks, designs, systems, and technologies until full payment is received.\n• Upon full payment, the client receives usage rights for the agreed deliverables.\n• Proprietary frameworks, reusable systems, AI architectures, and internal technologies remain the property of X360 unless explicitly transferred.\n\nX360 reserves the right to showcase completed projects for portfolio purposes, demonstrations, presentations, and marketing activities unless restricted through a signed confidentiality agreement.`,
    contentAr: `ما لم يُتفق على خلاف ذلك كتابياً:\n\n• تحتفظ X360 بملكية جميع الملكية الفكرية والملفات المصدرية والمفاهيم والأطر والتصاميم والأنظمة والتقنيات حتى استلام الدفع الكامل.\n• عند الدفع الكامل، يحصل العميل على حقوق استخدام المخرجات المتفق عليها.\n• تبقى الأطر الخاصة والأنظمة القابلة لإعادة الاستخدام وبنى الذكاء الاصطناعي والتقنيات الداخلية ملكاً لـ X360 ما لم يتم نقلها صراحةً.\n\nتحتفظ X360 بالحق في عرض المشاريع المكتملة لأغراض محفظة الأعمال والعروض التوضيحية والتسويق ما لم يُقيَّد ذلك باتفاقية سرية موقعة.`,
  },
  {
    title: "Confidentiality",
    titleAr: "السرية",
    type: "text",
    content: `X360 agrees to maintain confidentiality regarding sensitive client information and business data.\n\nConfidential information will not be disclosed except with client authorization, where legally required, or where operationally necessary with trusted partners or providers.`,
    contentAr: `توافق X360 على الحفاظ على سرية المعلومات الحساسة للعميل والبيانات التجارية.\n\nلن تُفصح المعلومات السرية إلا بإذن العميل أو عند الاقتضاء القانوني أو عند الضرورة التشغيلية مع الشركاء أو المزودين الموثوقين.`,
  },
  {
    title: "Warranties & Limitation of Liability",
    titleAr: "الضمانات وحدود المسؤولية",
    type: "text",
    content: `X360 warrants that services will be delivered professionally and in good faith.\n\nHowever, X360 does not guarantee uninterrupted service availability, error-free systems, compatibility with all third-party systems, guaranteed ranking or marketing outcomes, or uninterrupted hosting infrastructure.\n\nTo the maximum extent permitted by law, X360 shall not be liable for indirect damages, consequential losses, data loss, business interruption, revenue loss, operational downtime, or third-party failures.\n\nTotal liability shall not exceed the amount paid for the specific service giving rise to the claim.`,
    contentAr: `تضمن X360 تقديم الخدمات باحترافية وبحسن نية.\n\nومع ذلك، لا تضمن X360 توافر الخدمة بلا انقطاع أو أنظمة خالية من الأخطاء أو التوافق مع جميع الأنظمة الخارجية أو نتائج تسويقية أو ترتيب محدد.\n\nإلى أقصى حد مسموح به قانوناً، لن تكون X360 مسؤولة عن الأضرار غير المباشرة أو الخسائر التبعية أو فقدان البيانات أو انقطاع الأعمال أو خسارة الإيرادات أو التوقف التشغيلي أو إخفاقات الجهات الخارجية.\n\nلا تتجاوز إجمالي المسؤولية المبلغ المدفوع مقابل الخدمة المحددة التي أدت إلى المطالبة.`,
  },
  {
    title: "Cancellation & Refunds",
    titleAr: "الإلغاء والاسترداد",
    type: "text",
    content: `Clients may request project cancellation in writing.\n\nNo refunds shall be issued for completed work, partially completed work, deployed systems, consumed service hours, custom development, or production activities already executed.\n\nAny refund considerations remain solely at the discretion of X360.`,
    contentAr: `يجوز للعملاء طلب إلغاء المشروع كتابياً.\n\nلن تُصدر أي مبالغ مستردة عن العمل المكتمل أو العمل المنجز جزئياً أو الأنظمة المنشورة أو ساعات الخدمة المستهلكة أو التطوير المخصص أو الأنشطة الإنتاجية المنفذة بالفعل.\n\nتبقى أي اعتبارات للاسترداد وفق تقدير X360 حصراً.`,
  },
  {
    title: "Force Majeure",
    titleAr: "القوة القاهرة",
    type: "bullets",
    content: [
      "Natural disasters",
      "Government restrictions",
      "Internet outages",
      "Pandemics",
      "War",
      "Labor disruptions",
      "Infrastructure failures",
      "Cyber incidents",
      "Third-party service interruptions",
    ],
    contentAr: [
      "الكوارث الطبيعية",
      "القيود الحكومية",
      "انقطاعات الإنترنت",
      "الأوبئة",
      "الحروب",
      "اضطرابات العمل",
      "أعطال البنية التحتية",
      "الحوادث الإلكترونية",
      "انقطاعات خدمات الجهات الخارجية",
    ],
  },
  {
    title: "Jurisdiction & Dispute Resolution",
    titleAr: "الاختصاص القضائي وتسوية النزاعات",
    type: "text",
    content: `These Terms shall be governed by applicable laws of the Kingdom of Saudi Arabia, India, and Qatar, depending on the project jurisdiction and operating entity.\n\nAny disputes shall first attempt resolution through mutual negotiation, mediation, or arbitration before formal legal proceedings.`,
    contentAr: `تخضع هذه الشروط للقوانين المعمول بها في المملكة العربية السعودية والهند وقطر، اعتماداً على اختصاص المشروع والكيان المشغّل.\n\nتحاول أي نزاعات الحل أولاً عبر التفاوض المتبادل أو الوساطة أو التحكيم قبل اتخاذ إجراءات قانونية رسمية.`,
  },
  {
    title: "Communication & Marketing",
    titleAr: "التواصل والتسويق",
    type: "text",
    content: `X360 may communicate with clients regarding projects, updates, maintenance, service notifications, marketing campaigns, and announcements.\n\nClients may unsubscribe from marketing emails, calls, or promotional communication at any time by contacting:\n\nEmail: mohammed@x-360.ai\nPhone: +966 532087436`,
    contentAr: `قد تتواصل X360 مع العملاء بشأن المشاريع والتحديثات والصيانة وإشعارات الخدمة والحملات التسويقية والإعلانات.\n\nيجوز للعملاء إلغاء الاشتراك من رسائل البريد الإلكتروني التسويقية أو المكالمات أو التواصل الترويجي في أي وقت عبر التواصل:\n\nالبريد الإلكتروني: mohammed@x-360.ai\nالهاتف: +966 532087436`,
  },
  {
    title: "Amendments",
    titleAr: "التعديلات",
    type: "text",
    content: `These Terms & Conditions may be updated or modified at any time without prior notice. Updated versions will become effective upon publication on official platforms or communication channels.`,
    contentAr: `يجوز تحديث أو تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. تصبح النسخ المحدّثة سارية عند نشرها على المنصات أو قنوات التواصل الرسمية.`,
  },
  {
    title: "Severability",
    titleAr: "قابلية الفصل",
    type: "text",
    content: `If any provision of these Terms is found unenforceable, the remaining provisions shall continue in full effect.`,
    contentAr: `إذا وُجد أن أي حكم من هذه الشروط غير قابل للتنفيذ، تستمر الأحكام المتبقية بكامل نفاذها.`,
  },
  {
    title: "Entire Agreement",
    titleAr: "الاتفاقية الكاملة",
    type: "text",
    content: `These Terms, together with proposals, quotations, work orders, invoices, purchase orders, and project agreements constitute the complete agreement between the client and X360.`,
    contentAr: `تشكّل هذه الشروط مع العروض والعروض المسعّرة وأوامر العمل والفواتير وأوامر الشراء واتفاقيات المشاريع الاتفاقية الكاملة بين العميل وX360.`,
  },
  {
    title: "Contact Information",
    titleAr: "معلومات التواصل",
    type: "text",
    content: `For legal, operational, or contractual inquiries, please contact:\n\nEmail: mohammed@x-360.ai\nPhone: +966 532087436`,
    contentAr: `للاستفسارات القانونية أو التشغيلية أو التعاقدية، يرجى التواصل:\n\nالبريد الإلكتروني: mohammed@x-360.ai\nالهاتف: +966 532087436`,
  },
  {
    title: "Regional Applicability",
    titleAr: "النطاق الإقليمي",
    type: "text",
    content: `These Terms are primarily applicable to Saudi Arabia, GCC countries, India, and Qatar.\n\nFor projects executed in additional jurisdictions, supplementary terms may apply depending on regional legal requirements.`,
    contentAr: `تنطبق هذه الشروط بشكل رئيسي على المملكة العربية السعودية ودول مجلس التعاون الخليجي والهند وقطر.\n\nبالنسبة للمشاريع المنجزة في دول أخرى، قد تنطبق شروط تكميلية وفقاً للمتطلبات القانونية الإقليمية.`,
  },
];

export default function TermsClient() {
  const { isAr } = useLang();

  return (
    <main
      className="min-h-screen bg-[#050505] text-white"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-xs tracking-[0.25em] uppercase text-white/40 mb-4"
        >
          {isAr ? "الوثائق القانونية" : "Legal Documents"}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-thin leading-tight mb-4 text-white"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            letterSpacing: "0.1em",
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-white/35 text-xs tracking-widest uppercase mb-6"
        >
          Last Updated: June 2026
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="text-white/45 text-sm max-w-2xl mx-auto leading-relaxed"
        >
          {isAr
            ? "تسري هذه الشروط والأحكام على جميع الخدمات والمنصات والحلول والتقنيات الغامرة والتطبيقات والأنظمة المؤسسية ومواقع الويب وأنظمة الذكاء الاصطناعي والتجارب الافتراضية والبنية التحتية الرقمية التي تقدمها الكيانات التالية."
            : "These Terms & Conditions apply to all services, platforms, solutions, immersive technologies, applications, enterprise systems, websites, AI ecosystems, virtual experiences, hosting services, and digital infrastructure provided by the following entities operating under the X360 ecosystem."}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 mx-auto w-16 h-px bg-white/10"
        />
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-28 space-y-12">
        {/* Companies Covered */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0.1}
          className="border-t border-white/[0.07] pt-8"
        >
          <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
            01
          </h2>
          <h3 className="text-xl font-semibold text-white mb-6">
            {isAr
              ? "الشركات المشمولة بهذه الشروط"
              : "Companies Covered Under These Terms"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {companies.map((co) => (
              <div
                key={co.name}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    {co.name}
                  </p>
                  <p className="text-white/40 text-[11px] tracking-widest uppercase mt-0.5">
                    {co.country}
                  </p>
                  {co.brand && (
                    <p className="text-white/30 text-[11px] mt-1 italic">
                      {co.brand}
                    </p>
                  )}
                </div>
                {co.services.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {co.services.map((s) => (
                      <li
                        key={s}
                        className="text-white/50 text-[13px] flex items-start gap-1.5"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {co.address && (
                  <p className="text-white/40 text-[12px] leading-relaxed whitespace-pre-line">
                    {co.address}
                  </p>
                )}
                <div className="mt-auto pt-2 border-t border-white/[0.07] flex flex-col gap-1">
                  <a
                    href="mailto:mohammed@x-360.ai"
                    className="text-white/45 text-[12px] hover:text-white/70 transition-colors"
                  >
                    mohammed@x-360.ai
                  </a>
                  <a
                    href="tel:+966532087436"
                    dir="ltr"
                    className="text-white/45 text-[12px] hover:text-white/70 transition-colors"
                  >
                    +966 532087436
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services list */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0.15}
          className="border-t border-white/[0.07] pt-8"
        >
          <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
            02
          </h2>
          <h3 className="text-xl font-semibold text-white mb-5">
            {isAr ? "الخدمات المقدمة" : "Services Provided"}
          </h3>
          <p className="text-white/50 text-[15px] leading-relaxed mb-5">
            {isAr
              ? "تقدم X360 وشركاتها المرتبطة خدمات تشمل على سبيل المثال لا الحصر ما يلي. تُحدَّد النطاق التفصيلي للعمل والمخرجات والأسعار والجداول الزمنية في العروض أو أوامر العمل أو أوامر الشراء أو عروض الأسعار أو اتفاقيات الخدمة المعنية."
              : "X360 and its associated companies provide services including but not limited to the following. The detailed scope of work, deliverables, pricing, and timelines shall be defined in the respective Proposal, Work Order, Purchase Order, Quotation, or Service Agreement."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(isAr ? servicesListAr : servicesList).map((s) => (
              <div
                key={s}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/55 text-[13px]"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic sections */}
        {sections.slice(1).map((sec, idx) => {
          const num = String(idx + 3).padStart(2, "0");
          return (
            <motion.div
              key={sec.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={idx * 0.1}
              className="border-t border-white/[0.07] pt-8"
            >
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
                {num}
              </h2>
              <h3 className="text-xl font-semibold text-white mb-4">
                {isAr ? (sec.titleAr ?? sec.title) : sec.title}
              </h3>

              {sec.type === "bullets" && (
                <ul className="flex flex-col gap-2">
                  {(
                    (isAr && sec.contentAr
                      ? sec.contentAr
                      : sec.content) as string[]
                  ).map((item) => (
                    <li
                      key={item}
                      className="text-white/55 text-[15px] flex items-start gap-2.5"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {sec.type === "grid-bullets" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(
                    (isAr && sec.contentAr ? sec.contentAr : sec.content) as {
                      label: string;
                      items: string[];
                    }[]
                  ).map((cat) => (
                    <div
                      key={cat.label}
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-white/55 text-[11px] font-semibold tracking-[0.16em] uppercase mb-3">
                        {cat.label}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {cat.items.map((item) => (
                          <li
                            key={item}
                            className="text-white/50 text-[13px] flex items-start gap-1.5"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {sec.type === "text" && (
                <div className="space-y-3">
                  {(
                    (isAr && sec.contentAr
                      ? sec.contentAr
                      : sec.content) as string
                  )
                    .split("\n\n")
                    .map((para, pi) => (
                      <p
                        key={pi}
                        className="text-white/55 leading-relaxed text-[15px] whitespace-pre-line"
                      >
                        {renderWithPhones(para)}
                      </p>
                    ))}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Acceptance */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="border-t border-white/[0.07] pt-8"
        >
          <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
            {String(sections.length + 1).padStart(2, "0")}
          </h2>
          <h3 className="text-xl font-semibold text-white mb-4">
            {isAr ? "القبول" : "Acceptance"}
          </h3>
          <p className="text-white/55 leading-relaxed text-[15px]">
            {isAr
              ? "بالتعامل مع خدمات X360 أو توقيع العروض أو الموافقة على عروض الأسعار أو إصدار أوامر الشراء أو استخدام منصاتنا الرقمية، يُقر العميل بقبول هذه الشروط والأحكام."
              : "By engaging X360 services, signing proposals, approving quotations, issuing purchase orders, or using our digital platforms, the client acknowledges acceptance of these Terms & Conditions."}
          </p>
        </motion.div>

        {/* Footer note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="border-t border-white/[0.07] pt-8"
        >
          <p className="text-white/30 text-sm leading-relaxed italic">
            {isAr
              ? "تنطبق هذه الشروط والأحكام بشكل رئيسي على المملكة العربية السعودية ودول مجلس التعاون الخليجي والهند وقطر. بالنسبة للمشاريع المنجزة في دول أخرى، قد تنطبق شروط تكميلية وفقاً للمتطلبات القانونية الإقليمية."
              : "These Terms are primarily applicable to Saudi Arabia, GCC countries, India, and Qatar. For projects executed in additional jurisdictions, supplementary terms may apply depending on regional legal requirements."}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
