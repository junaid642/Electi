import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, FileCheck, UserCheck, Globe, Shield, Database, Lock, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const rights = [
  { icon: UserCheck, title: "Right of Access", titleAr: "حق الوصول", desc: "Request a copy of all personal data Electi holds about you.", descAr: "طلب نسخة من جميع البيانات الشخصية التي تحتفظ بها Electi عنك." },
  { icon: FileCheck, title: "Right to Correction", titleAr: "حق التصحيح", desc: "Request correction of any inaccurate or incomplete personal data.", descAr: "طلب تصحيح أي بيانات شخصية غير دقيقة أو غير مكتملة." },
  { icon: Database, title: "Right to Deletion", titleAr: "حق الحذف", desc: "Request deletion of your personal data, subject to legal retention requirements.", descAr: "طلب حذف بياناتك الشخصية، مع مراعاة متطلبات الاحتفاظ القانوني." },
  { icon: Globe, title: "Right to Portability", titleAr: "حق النقل", desc: "Receive your personal data in a structured, machine-readable format.", descAr: "استلام بياناتك الشخصية بتنسيق منظَّم وقابل للقراءة آلياً." },
  { icon: Lock, title: "Right to Restrict Processing", titleAr: "حق تقييد المعالجة", desc: "Request restriction of how Electi processes your personal data.", descAr: "طلب تقييد طريقة معالجة Electi لبياناتك الشخصية." },
  { icon: AlertCircle, title: "Right to Object", titleAr: "حق الاعتراض", desc: "Object to processing of your personal data for specific purposes.", descAr: "الاعتراض على معالجة بياناتك الشخصية لأغراض محددة." },
];

const frameworks = [
  { name: "PDPL", nameAr: "نظام حماية البيانات الشخصية", full: "Personal Data Protection Law", fullAr: "نظام حماية البيانات الشخصية", status: "Compliant", statusAr: "متوافق", desc: "Saudi Arabia's primary data protection legislation — Electi's data practices are designed to satisfy all PDPL obligations including consent, purpose limitation, data subject rights, and breach notification.", descAr: "التشريع السعودي الرئيسي لحماية البيانات — مُصمَّمة ممارسات بيانات Electi لتلبية جميع التزامات PDPL." },
  { name: "NDMO", nameAr: "مكتب إدارة البيانات الوطني", full: "National Data Management Office Standards", fullAr: "معايير مكتب إدارة البيانات الوطني", status: "Aligned", statusAr: "متوافق", desc: "Electi's data management practices align with NDMO's National Data Management Standards for data quality, governance, and cross-sector data sharing.", descAr: "تتوافق ممارسات إدارة البيانات في Electi مع معايير إدارة البيانات الوطنية الصادرة عن NDMO." },
  { name: "SDAIA", nameAr: "هيئة البيانات والذكاء الاصطناعي", full: "Saudi Data & Artificial Intelligence Authority", fullAr: "هيئة البيانات والذكاء الاصطناعي", status: "Aligned", statusAr: "متوافق", desc: "Electi's AI deployment practices align with SDAIA's published AI ethics principles and the National AI Strategy's guidance on responsible AI deployment.", descAr: "تتوافق ممارسات نشر الذكاء الاصطناعي في Electi مع مبادئ أخلاقيات الذكاء الاصطناعي الصادرة عن SDAIA." },
  { name: "MCIT", nameAr: "وزارة الاتصالات وتقنية المعلومات", full: "Ministry of Communications & IT", fullAr: "وزارة الاتصالات وتقنية المعلومات", status: "Aligned", statusAr: "متوافق", desc: "Electi's technical infrastructure and digital services comply with MCIT's digital economy regulations and cybersecurity requirements for technology service providers.", descAr: "تمتثل البنية التحتية التقنية وخدمات Electi الرقمية للوائح الاقتصاد الرقمي ومتطلبات الأمن السيبراني الصادرة عن MCIT." },
];

const faqs = [
  {
    q: "What is PDPL and does Electi comply with it?",
    qAr: "ما هو PDPL وهل Electi متوافقة معه؟",
    a: "PDPL (Personal Data Protection Law) is Saudi Arabia's primary data protection legislation, enacted in 2021. Electi is designed to operate in compliance with PDPL — including lawful basis for processing, purpose limitation, data subject rights, privacy by design, and breach notification obligations.",
    aAr: "نظام حماية البيانات الشخصية (PDPL) هو التشريع السعودي الرئيسي لحماية البيانات الصادر عام 2021. صُمِّمت Electi للعمل وفق PDPL — بما في ذلك الأساس القانوني للمعالجة وتقييد الغرض وحقوق الأشخاص المعنيين.",
  },
  {
    q: "How do I exercise my PDPL data rights with Electi?",
    qAr: "كيف أُمارس حقوقي في البيانات وفق PDPL مع Electi؟",
    a: "Submit a data subject request by emailing mohammed@electi.sa with 'Data Subject Request' in the subject line. Include your name, contact details, and the specific right you wish to exercise. Electi will respond within 30 days.",
    aAr: "أرسل طلب صاحب البيانات عبر البريد الإلكتروني إلى mohammed@electi.sa مع 'طلب صاحب البيانات' في سطر الموضوع. سترد Electi في غضون 30 يوماً.",
  },
  {
    q: "Does Electi use AI-generated data for model training?",
    qAr: "هل تستخدم Electi البيانات المُولَّدة من الذكاء الاصطناعي لتدريب النماذج؟",
    a: "Electi does not use your business's customer conversation data to train general AI models. Conversation data is used solely to generate responses within your system. Any model fine-tuning for enterprise clients is performed on isolated compute environments using only that client's data.",
    aAr: "لا تستخدم Electi بيانات محادثات عملاء شركتك لتدريب نماذج الذكاء الاصطناعي العامة. تُستخدم بيانات المحادثة فقط لتوليد الردود داخل نظامك.",
  },
  {
    q: "How long does Electi retain customer data?",
    qAr: "كم من الوقت تحتفظ Electi ببيانات العملاء؟",
    a: "Standard data retention is 90 days for conversation logs, 3 years for billing records (required by Saudi tax law), and for the duration of the service relationship for account data. Enterprise clients may request custom retention policies. You may request deletion of any data not subject to legal retention requirements at any time.",
    aAr: "الاحتفاظ القياسي بالبيانات هو 90 يوماً لسجلات المحادثة، و3 سنوات لسجلات الفوترة (مطلوب بموجب نظام الضرائب السعودي)، ومدة علاقة الخدمة لبيانات الحساب.",
  },
  {
    q: "Is Electi suitable for government sector use?",
    qAr: "هل Electi مناسبة للاستخدام في القطاع الحكومي؟",
    a: "Electi offers private deployment and dedicated infrastructure options designed for government sector requirements. These include complete data isolation within government infrastructure, no shared compute environments, and customisable data governance aligned with government sector compliance frameworks.",
    aAr: "تقدم Electi خيارات النشر الخاص والبنية التحتية المخصصة المصممة لمتطلبات القطاع الحكومي. تشمل هذه الخيارات عزلاً كاملاً للبيانات داخل البنية التحتية الحكومية.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://electi.sa/compliance",
      "name": "Compliance | Electi",
      "description": "Electi compliance with PDPL, NDMO, SDAIA and Saudi regulatory frameworks. Data subject rights, data localisation, and AI governance.",
      "url": "https://electi.sa/compliance",
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ],
};

export default function CompliancePage() {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      setNavHidden(st > lastScrollRef.current && st > 80);
      lastScrollRef.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title="Compliance | Electi — PDPL, NDMO & Saudi Regulatory Alignment"
        titleAr="الامتثال | Electi — PDPL وNDMO والتوافق التنظيمي السعودي"
        description="Electi compliance with PDPL, NDMO, SDAIA and Saudi regulatory frameworks. Exercise your data subject rights, understand data localisation and AI governance."
        descriptionAr="امتثال Electi لـ PDPL وNDMO وSDIA والأطر التنظيمية السعودية. مارس حقوق صاحب البيانات وافهم توطين البيانات وحوكمة الذكاء الاصطناعي."
        path="/compliance"
        schemas={[schema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Scale className="w-3 h-3" />
            {isAr ? "الامتثال والحوكمة" : "Compliance & Governance"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "امتثال PDPL" : "PDPL Compliance"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "والإطار التنظيمي السعودي" : "& Saudi Regulatory Framework"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "Electi مُصمَّمة لتلبية أعلى معايير الامتثال التنظيمي في المملكة العربية السعودية — من PDPL إلى توطين البيانات وحوكمة الذكاء الاصطناعي."
              : "Electi is designed to meet Saudi Arabia's highest regulatory compliance standards — from PDPL to data localisation and AI governance."}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ FRAMEWORKS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "الأطر التنظيمية" : "Regulatory Frameworks"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "Electi متوافقة مع التنظيمات التالية" : "Electi aligns with the following Saudi regulatory frameworks"}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {frameworks.map((f) => (
                <motion.div key={f.name} variants={fadeUp} className="rounded-2xl border border-white/7 p-7 hover:border-white/12 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-700 text-white text-lg">{f.name}</div>
                      <div className="text-white/35 text-xs mt-0.5">{isAr ? f.fullAr : f.full}</div>
                    </div>
                    <span className="text-[10px] font-700 px-2.5 py-1 rounded-full border border-white/10 text-white/50"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      {isAr ? f.statusAr : f.status}
                    </span>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed">{isAr ? f.descAr : f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ DATA SUBJECT RIGHTS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-600 text-white/45 mb-4"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <UserCheck className="w-3 h-3" />
                {isAr ? "حقوق صاحب البيانات" : "Data Subject Rights"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "حقوقك وفق PDPL" : "Your Rights Under PDPL"}</h2>
              <p className="text-white/30 text-sm max-w-xl mx-auto">
                {isAr
                  ? "يمنحك نظام حماية البيانات الشخصية السعودي حقوقاً واضحة فيما يخص بياناتك الشخصية. إليكم كيفية ممارسة هذه الحقوق مع Electi."
                  : "Saudi Arabia's PDPL gives you clear rights over your personal data. Here is how to exercise them with Electi."}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {rights.map((r) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.title} variants={fadeUp} className="rounded-xl border border-white/7 p-5 hover:border-white/12 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-4 h-4 text-white/45" />
                    </div>
                    <h3 className="font-700 text-white/80 text-sm mb-1.5">{isAr ? r.titleAr : r.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed">{isAr ? r.descAr : r.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/8 p-7 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
              <Shield className="w-6 h-6 text-white/30 mx-auto mb-3" />
              <h3 className="font-700 text-white/80 mb-2">{isAr ? "ممارسة حقوقك" : "Exercising Your Rights"}</h3>
              <p className="text-white/30 text-sm leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? "أرسل طلب صاحب البيانات إلى mohammed@electi.sa مع ذكر الحق المحدد الذي تريد ممارسته. سترد Electi في غضون 30 يوماً وفق متطلبات PDPL."
                  : "Submit a data subject request to mohammed@electi.sa stating the specific right you wish to exercise. Electi will respond within 30 days as required by PDPL."}
              </p>
              <a href="mailto:mohammed@electi.sa?subject=PDPL Data Subject Request" className="inline-block mt-5">
                <motion.button className="px-6 py-3 rounded-xl border border-white/10 text-white/50 text-sm font-600 hover:text-white/70 hover:border-white/18 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "إرسال طلب بيانات" : "Submit Data Request"}
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-700 mb-2">{isAr ? "أسئلة الامتثال الشائعة" : "Compliance FAQ"}</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/7 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-600 text-white/80 text-sm">{isAr ? faq.qAr : faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="text-white/30 flex-shrink-0 text-lg leading-none">+</motion.span>
                </button>
                <motion.div initial={false} animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease }} style={{ overflow: "hidden" }}>
                  <p className="px-6 pb-5 text-white/38 text-sm leading-relaxed">{isAr ? faq.aAr : faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/25 text-xs">{isAr ? "اطلع أيضاً على" : "See also:"}{" "}
              <Link href="/privacy"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span></Link>
              {" · "}
              <Link href="/data-protection"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "حماية البيانات" : "Data Protection"}</span></Link>
              {" · "}
              <Link href="/security"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "الأمان" : "Security"}</span></Link>
            </p>
          </div>
        </div>
      </section>

      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </section>
    </div>
  );
}
