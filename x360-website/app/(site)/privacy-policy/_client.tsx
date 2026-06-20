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

type Section =
  | { kind: "section"; title: string; titleAr?: string; body: string; bodyAr?: string }
  | { kind: "companies" }
  | { kind: "divider" };

const sections: Section[] = [
  {
    kind: "section",
    title: "Introduction",
    titleAr: "مقدمة",
    body: `Welcome to X360 and its associated companies. Your privacy is important to us, and we are committed to protecting your personal information with transparency, integrity, and security.\n\nThis Privacy Policy explains how we collect, use, process, store, and protect your information when you access our websites, services, digital platforms, applications, immersive technologies, AI systems, virtual tour experiences, enterprise systems, and related digital ecosystems.\n\nBy using our websites or services, you agree to the practices described in this Privacy Policy.`,
    bodyAr: `مرحباً بكم في X360 وشركاتها المرتبطة. خصوصيتك تهمنا، ونحن ملتزمون بحماية معلوماتك الشخصية بشفافية ونزاهة وأمان.\n\nتوضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها ومعالجتها وتخزينها وحمايتها عند وصولك إلى مواقعنا وخدماتنا ومنصاتنا الرقمية وتطبيقاتنا وتقنياتنا الغامرة وأنظمة الذكاء الاصطناعي وتجارب الجولات الافتراضية والأنظمة المؤسسية.\n\nباستخدامك لمواقعنا أو خدماتنا، فإنك توافق على الممارسات الموضحة في هذه السياسة.`,
  },
  {
    kind: "companies",
  },
  {
    kind: "section",
    title: "Information We Collect",
    titleAr: "المعلومات التي نجمعها",
    body: "",
    bodyAr: "",
  },
  {
    kind: "section",
    title: "How We Use Your Information",
    titleAr: "كيف نستخدم معلوماتك",
    body: `We use collected information to:\n\n• Respond to inquiries and consultation requests\n• Deliver our services and digital ecosystems\n• Improve user experience and platform performance\n• Provide customer support\n• Personalize communication and recommendations\n• Analyze website traffic and performance\n• Enhance cybersecurity and fraud prevention\n• Manage enterprise systems and operations\n• Send updates, newsletters, and marketing communications\n• Comply with legal and regulatory obligations`,
    bodyAr: `نستخدم المعلومات المجمعة من أجل:\n\n• الرد على الاستفسارات وطلبات الاستشارة\n• تقديم خدماتنا والأنظمة البيئية الرقمية\n• تحسين تجربة المستخدم وأداء المنصة\n• تقديم دعم العملاء\n• تخصيص التواصل والتوصيات\n• تحليل حركة الموقع والأداء\n• تعزيز الأمن السيبراني ومنع الاحتيال\n• إدارة الأنظمة والعمليات المؤسسية\n• إرسال التحديثات والنشرات الإخبارية والرسائل التسويقية\n• الامتثال للالتزامات القانونية والتنظيمية`,
  },
  {
    kind: "section",
    title: "AI, Automation & Digital Systems",
    titleAr: "الذكاء الاصطناعي والأتمتة والأنظمة الرقمية",
    body: `As part of our services, we may use AI systems, automation tools, analytics platforms, smart recommendation systems, CRM systems, and enterprise integrations.\n\nThese systems may process data to improve customer experience, automation workflows, operational intelligence, and platform performance.\n\nWe do not sell personal information to third parties.`,
    bodyAr: `ضمن خدماتنا، قد نستخدم أنظمة الذكاء الاصطناعي وأدوات الأتمتة ومنصات التحليلات وأنظمة التوصيات الذكية وأنظمة إدارة علاقات العملاء والتكاملات المؤسسية.\n\nقد تعالج هذه الأنظمة البيانات لتحسين تجربة العملاء وسير العمل الآلي والذكاء التشغيلي وأداء المنصة.\n\nنحن لا نبيع المعلومات الشخصية لأطراف ثالثة.`,
  },
  {
    kind: "section",
    title: "Cookies & Tracking Technologies",
    titleAr: "ملفات تعريف الارتباط وتقنيات التتبع",
    body: `Our websites may use cookies, analytics tools, session tracking, performance monitoring, and marketing integrations.\n\nThese technologies help us improve website functionality, understand user behavior, optimize performance, and personalize digital experiences.\n\nUsers may disable cookies through browser settings; however, some features may not function properly.`,
    bodyAr: `قد تستخدم مواقعنا ملفات تعريف الارتباط وأدوات التحليلات وتتبع الجلسات ومراقبة الأداء وتكاملات التسويق.\n\nتساعدنا هذه التقنيات على تحسين وظائف الموقع وفهم سلوك المستخدم وتحسين الأداء وتخصيص التجارب الرقمية.\n\nيمكن للمستخدمين تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح؛ ومع ذلك، قد لا تعمل بعض الميزات بشكل صحيح.`,
  },
  {
    kind: "section",
    title: "Data Security",
    titleAr: "أمان البيانات",
    body: `We implement commercially reasonable technical and organizational security measures to protect your information, including:\n\n• Secure hosting infrastructure\n• Encrypted communications\n• Restricted system access\n• Cybersecurity monitoring\n• Firewall and server protections\n• Secure enterprise systems\n\nWhile we strive to protect all information, no digital transmission or storage system can be guaranteed as 100% secure.`,
    bodyAr: `نطبق تدابير أمنية تقنية وتنظيمية معقولة لحماية معلوماتك، بما في ذلك:\n\n• بنية تحتية للاستضافة الآمنة\n• اتصالات مشفرة\n• وصول محدود للنظام\n• مراقبة الأمن السيبراني\n• حماية جدار الحماية والخادم\n• أنظمة مؤسسية آمنة\n\nبينما نسعى جاهدين لحماية جميع المعلومات، لا يمكن ضمان أن أي نظام نقل أو تخزين رقمي يكون آمناً بنسبة 100٪.`,
  },
  {
    kind: "section",
    title: "Third-Party Services",
    titleAr: "خدمات الجهات الخارجية",
    body: `We may integrate or work with trusted third-party platforms including hosting providers, analytics services, cloud infrastructure, payment systems, CRM platforms, and communication tools.\n\nThese providers may process information only as necessary to deliver related services.`,
    bodyAr: `قد نتكامل مع أو نتعاون مع منصات خارجية موثوقة تشمل مزودي الاستضافة وخدمات التحليلات والبنية التحتية السحابية وأنظمة الدفع ومنصات إدارة علاقات العملاء وأدوات التواصل.\n\nيجوز لهؤلاء المزودين معالجة المعلومات فقط بالقدر اللازم لتقديم الخدمات ذات الصلة.`,
  },
  {
    kind: "section",
    title: "International Data Processing",
    titleAr: "معالجة البيانات الدولية",
    body: `Because our operations and clients may span multiple countries, your information may be processed or stored outside your country of residence, including in regions with different data protection laws.\n\nBy using our services, you consent to such transfers where legally permitted.`,
    bodyAr: `نظراً لأن عملياتنا وعملاءنا قد تمتد عبر دول متعددة، فقد تتم معالجة معلوماتك أو تخزينها خارج بلد إقامتك، بما في ذلك في مناطق تخضع لقوانين حماية بيانات مختلفة.\n\nباستخدام خدماتنا، فإنك توافق على مثل هذه التحويلات حيثما يُسمح بذلك قانوناً.`,
  },
  {
    kind: "section",
    title: "Marketing Communications",
    titleAr: "الاتصالات التسويقية",
    body: `We may occasionally send service announcements, newsletters, promotional communications, project updates, and marketing materials.\n\nIf you wish to unsubscribe from marketing emails, promotional calls, or communication campaigns, you may request removal at any time by contacting:\n\nEmail: mohammed@x-360.ai\nPhone: +966 532087436\n\nWe will make reasonable efforts to process unsubscribe requests promptly.`,
    bodyAr: `قد نرسل أحياناً إعلانات الخدمة والنشرات الإخبارية والاتصالات الترويجية وتحديثات المشاريع والمواد التسويقية.\n\nإذا كنت ترغب في إلغاء الاشتراك من رسائل البريد الإلكتروني التسويقية أو المكالمات الترويجية أو حملات التواصل، يمكنك طلب الإزالة في أي وقت عبر التواصل:\n\nالبريد الإلكتروني: mohammed@x-360.ai\nالهاتف: +966 532087436\n\nسنبذل جهوداً معقولة لمعالجة طلبات إلغاء الاشتراك بسرعة.`,
  },
  {
    kind: "section",
    title: "Your Rights",
    titleAr: "حقوقك",
    body: `Depending on applicable laws, you may have the right to:\n\n• Request access to your data\n• Request correction of inaccurate information\n• Request deletion of personal information\n• Object to certain processing activities\n• Withdraw consent where applicable\n• Request changes to communication preferences\n\nRequests may be submitted through our official contact channels.`,
    bodyAr: `اعتماداً على القوانين المعمول بها، قد يكون لك الحق في:\n\n• طلب الوصول إلى بياناتك\n• طلب تصحيح المعلومات غير الدقيقة\n• طلب حذف المعلومات الشخصية\n• الاعتراض على أنشطة معالجة معينة\n• سحب الموافقة حيثما ينطبق ذلك\n• طلب تغييرات في تفضيلات التواصل\n\nيمكن تقديم الطلبات عبر قنوات التواصل الرسمية.`,
  },
  {
    kind: "section",
    title: "Children's Privacy",
    titleAr: "خصوصية الأطفال",
    body: `Our services are not intended for children under the age required by applicable laws. We do not knowingly collect personal information from minors without appropriate consent.`,
    bodyAr: `خدماتنا غير مخصصة للأطفال دون السن المطلوبة وفقاً للقوانين المعمول بها. نحن لا نجمع عن علم معلومات شخصية من القاصرين دون الحصول على الموافقة المناسبة.`,
  },
  {
    kind: "section",
    title: "Changes to This Privacy Policy",
    titleAr: "التغييرات على هذه السياسة",
    body: `We reserve the right to update or modify this Privacy Policy at any time without prior notice. Updated versions will be published on our websites with the revised effective date.`,
    bodyAr: `نحتفظ بالحق في تحديث أو تعديل سياسة الخصوصية هذه في أي وقت دون إشعار مسبق. ستُنشر النسخ المحدّثة على مواقعنا مع تاريخ السريان المعدّل.`,
  },
  {
    kind: "section",
    title: "Contact Information",
    titleAr: "معلومات التواصل",
    body: `For privacy-related inquiries, requests, or concerns, please contact:\n\nEmail: mohammed@x-360.ai\nPhone: +966 532087436`,
    bodyAr: `للاستفسارات أو الطلبات أو المخاوف المتعلقة بالخصوصية، يرجى التواصل:\n\nالبريد الإلكتروني: mohammed@x-360.ai\nالهاتف: +966 532087436`,
  },
];

const companies = [
  {
    name: "Electi AI",
    country: "Saudi Arabia",
    services: [],
    address:
      "2413 Ad Damman Road, Ghirnath Dist.\nUnit No 2414, Riyadh 13242-7933\nKingdom of Saudi Arabia",
  },
  {
    name: "Stoned Tailor — X360",
    country: "India",
    services: [],
    address:
      "5/12 Roshan Colony, Jayanagar\n4th T Block, Bangalore 560041\nRepublic of India",
  },
  {
    name: "ZONOZA GROUP FOR TRADING AND CONTRACTING",
    country: "Qatar",
    services: [],
    address:
      "Number 79, Unit 1\nAl-Azizia Othman Street\nPO Box 10455\nDoha, State of Qatar",
  },
];

const companyContact = {
  email: "mohammed@x-360.ai",
  phone: "+966 532087436",
};

const infoCollect = [
  {
    title: "Personal Information",
    titleAr: "المعلومات الشخصية",
    items: [
      "Full name",
      "Company name",
      "Email address",
      "Phone number",
      "Country or location",
      "Job title or designation",
    ],
    itemsAr: [
      "الاسم الكامل",
      "اسم الشركة",
      "عنوان البريد الإلكتروني",
      "رقم الهاتف",
      "الدولة أو الموقع",
      "المسمى الوظيفي",
    ],
  },
  {
    title: "Business Information",
    titleAr: "معلومات الأعمال",
    items: [
      "Project requirements",
      "Inquiry details",
      "Budget information",
      "Service interests",
      "Business communication",
    ],
    itemsAr: [
      "متطلبات المشروع",
      "تفاصيل الاستفسار",
      "معلومات الميزانية",
      "الاهتمامات بالخدمات",
      "التواصل التجاري",
    ],
  },
  {
    title: "Technical Information",
    titleAr: "المعلومات التقنية",
    items: [
      "IP address",
      "Browser type",
      "Device information",
      "Operating system",
      "Usage analytics",
      "Website interaction behavior",
    ],
    itemsAr: [
      "عنوان IP",
      "نوع المتصفح",
      "معلومات الجهاز",
      "نظام التشغيل",
      "تحليلات الاستخدام",
      "سلوك تفاعل الموقع",
    ],
  },
  {
    title: "Marketing & Communication",
    titleAr: "التسويق والتواصل",
    items: [
      "Newsletter subscriptions",
      "Marketing preferences",
      "Event registrations",
      "Contact requests",
    ],
    itemsAr: [
      "الاشتراكات في النشرات الإخبارية",
      "تفضيلات التسويق",
      "تسجيلات الفعاليات",
      "طلبات التواصل",
    ],
  },
];

export default function PrivacyClient() {
  const { isAr } = useLang();

  let sectionIndex = 0;

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
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}
        >
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-white/35 text-xs tracking-widest uppercase mb-6"
        >
          {isAr ? "آخر تحديث: يونيو 2026" : "Last Updated: June 2026"}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 mx-auto w-16 h-px bg-white/10"
        />
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-28 space-y-12">

        {sections.map((sec, idx) => {
          if (sec.kind === "divider") return null;

          if (sec.kind === "companies") {
            return (
              <motion.div
                key="companies"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={idx * 0.15}
                className="border-t border-white/[0.07] pt-8"
              >
                <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
                  {String((sectionIndex = sectionIndex + 1)).padStart(2, "0")}
                </h2>
                <h3 className="text-xl font-semibold text-white mb-6">
                  {isAr ? "الشركات المشمولة بهذه السياسة" : "Companies Covered Under This Policy"}
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
                        <p className="text-white/45 text-[13px] leading-relaxed whitespace-pre-line">
                          {co.address}
                        </p>
                      )}
                      <div className="mt-auto pt-2 border-t border-white/[0.07] flex flex-col gap-1">
                        <a
                          href={`mailto:${companyContact.email}`}
                          className="text-white/45 text-[12px] hover:text-white/70 transition-colors"
                        >
                          {companyContact.email}
                        </a>
                        <a
                          href={`tel:${companyContact.phone.replace(/\s/g, "")}`}
                          className="text-white/45 text-[12px] hover:text-white/70 transition-colors"
                          dir="ltr"
                        >
                          {companyContact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          }

          /* Normal section */
          const isInfoCollect = sec.title === "Information We Collect";
          sectionIndex = sectionIndex + 1;
          const num = String(sectionIndex).padStart(2, "0");

          return (
            <motion.div
              key={sec.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={idx * 0.15}
              className="border-t border-white/[0.07] pt-8"
            >
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
                {num}
              </h2>
              <h3 className="text-xl font-semibold text-white mb-4">
                {isAr ? (sec.titleAr ?? sec.title) : sec.title}
              </h3>

              {isInfoCollect ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infoCollect.map((cat) => {
                    const displayItems = isAr ? (cat.itemsAr ?? cat.items) : cat.items;
                    return (
                      <div
                        key={cat.title}
                        className="rounded-xl p-4"
                        style={{
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="text-white/60 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
                          {isAr ? (cat.titleAr ?? cat.title) : cat.title}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {displayItems.map((item) => (
                            <li
                              key={item}
                              className="text-white/55 text-[13px] flex items-start gap-2"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {(isAr ? (sec.bodyAr ?? sec.body) : sec.body).split("\n\n").map((para, pi) => (
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

        {/* Final note */}
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
              ? "بالوصول إلى منصاتنا ومواقعنا وأنظمتنا الغامرة وتطبيقاتنا وتجاربنا الافتراضية أو الأنظمة البيئية المؤسسية، فإنك تقر بأنك قد قرأت وفهمت سياسة الخصوصية هذه وتوافق على الممارسات الموضحة فيها."
              : "By accessing our platforms, websites, immersive systems, applications, virtual experiences, or enterprise ecosystems, you acknowledge that you have read and understood this Privacy Policy and agree to the practices described herein."}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
