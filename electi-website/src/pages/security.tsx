import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye, RefreshCw, AlertTriangle, Key, Database, CheckCircle } from "lucide-react";
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

const pillars = [
  {
    icon: Lock,
    title: "Encryption at Rest & In Transit",
    titleAr: "التشفير في حالة السكون وأثناء النقل",
    desc: "All customer data is encrypted using AES-256 at rest. All data in transit uses TLS 1.3. No unencrypted data paths exist in the Electi infrastructure.",
    descAr: "يتم تشفير جميع بيانات العملاء باستخدام AES-256 في حالة السكون. تستخدم جميع البيانات أثناء النقل TLS 1.3. لا توجد مسارات بيانات غير مشفرة في بنية Electi التحتية.",
  },
  {
    icon: Key,
    title: "Access Controls & Authentication",
    titleAr: "ضوابط الوصول والمصادقة",
    desc: "Role-based access control (RBAC) restricts data access to authorised personnel only. Multi-factor authentication (MFA) is enforced for all Electi internal systems.",
    descAr: "يقيّد التحكم في الوصول القائم على الأدوار (RBAC) الوصول إلى البيانات للموظفين المصرَّح لهم فقط. تُطبَّق المصادقة متعددة العوامل (MFA) على جميع الأنظمة الداخلية لـ Electi.",
  },
  {
    icon: Server,
    title: "Saudi Data Residency",
    titleAr: "إقامة البيانات السعودية",
    desc: "Customer data is stored within Saudi Arabia by default, satisfying PDPL and National Data Management Office (NDMO) data localisation requirements for Saudi enterprises.",
    descAr: "تُخزَّن بيانات العملاء في المملكة العربية السعودية بشكل افتراضي، وهو ما يلبّي متطلبات توطين البيانات وفق نظام حماية البيانات الشخصية (PDPL) والمكتب الوطني لإدارة البيانات للمؤسسات السعودية.",
  },
  {
    icon: Database,
    title: "Backup & Recovery",
    titleAr: "النسخ الاحتياطي والاستعادة",
    desc: "Automated encrypted backups run every 24 hours with 30-day retention. Point-in-time recovery is available. Recovery Time Objective (RTO) is under 4 hours for critical systems.",
    descAr: "تعمل النسخ الاحتياطية المشفرة تلقائياً كل 24 ساعة مع الاحتفاظ بها لمدة 30 يوماً. يتوفر الاستعادة لنقطة زمنية محددة. هدف وقت الاستعادة (RTO) أقل من 4 ساعات للأنظمة الحيوية.",
  },
  {
    icon: Eye,
    title: "Monitoring & Threat Detection",
    titleAr: "المراقبة واكتشاف التهديدات",
    desc: "24/7 infrastructure monitoring with automated anomaly detection. All access events are logged with immutable audit trails. Suspicious activity triggers immediate alerts.",
    descAr: "مراقبة البنية التحتية على مدار الساعة مع اكتشاف التشوهات تلقائياً. تُسجَّل جميع أحداث الوصول بمسارات تدقيق غير قابلة للتعديل. يُطلق النشاط المشبوه تنبيهات فورية.",
  },
  {
    icon: RefreshCw,
    title: "Vulnerability Management",
    titleAr: "إدارة الثغرات الأمنية",
    desc: "Regular security assessments and penetration testing of all Electi systems. Security patches are applied within 72 hours of critical vulnerability disclosure.",
    descAr: "تقييمات أمنية منتظمة واختبارات الاختراق لجميع أنظمة Electi. تُطبَّق تصحيحات الأمان في غضون 72 ساعة من الإفصاح عن الثغرات الحرجة.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    titleAr: "الاستجابة للحوادث",
    desc: "Documented incident response procedure with designated security response team. Data breach notification to affected Saudi customers within 72 hours as required by PDPL.",
    descAr: "إجراء موثَّق للاستجابة للحوادث مع فريق استجابة أمنية مخصص. إشعار العملاء السعوديين المتضررين من خرق البيانات في غضون 72 ساعة وفق متطلبات PDPL.",
  },
  {
    icon: Shield,
    title: "Enterprise Isolation",
    titleAr: "العزل المؤسسي",
    desc: "Enterprise plans include logically isolated data environments. Each enterprise tenant's data is segregated at the database and storage layer — no cross-tenant data access.",
    descAr: "تشمل خطط المؤسسات بيئات بيانات معزولة منطقياً. يُفصَل بيانات كل مستأجر مؤسسي على طبقة قاعدة البيانات والتخزين — لا وصول عبر المستأجرين.",
  },
];

const faqs = [
  {
    q: "Where is Electi customer data stored?",
    qAr: "أين تُخزَّن بيانات عملاء Electi؟",
    a: "All Electi customer data is stored within Saudi Arabia by default, in compliance with PDPL and NDMO data localisation requirements. Enterprise customers can request dedicated infrastructure with additional isolation.",
    aAr: "تُخزَّن جميع بيانات عملاء Electi في المملكة العربية السعودية بشكل افتراضي، وفق متطلبات PDPL وتوطين البيانات الخاص بـ NDMO. يمكن لعملاء المؤسسات طلب بنية تحتية مخصصة مع عزل إضافي.",
  },
  {
    q: "Does Electi share customer data with third parties?",
    qAr: "هل تشارك Electi بيانات العملاء مع أطراف ثالثة؟",
    a: "Electi does not sell customer data. Third-party sub-processors (AI model providers, infrastructure providers) are contractually bound to strict data handling requirements, operate under data processing agreements, and may not use customer data for their own model training.",
    aAr: "لا تبيع Electi بيانات العملاء. المعالجون الثانويون من جهات خارجية (مزودو نماذج الذكاء الاصطناعي ومزودو البنية التحتية) ملزمون تعاقدياً بمتطلبات صارمة للتعامل مع البيانات.",
  },
  {
    q: "How does Electi handle a data breach?",
    qAr: "كيف تتعامل Electi مع خرق البيانات؟",
    a: "In the event of a confirmed data breach affecting Saudi customer data, Electi will notify affected customers within 72 hours as required by PDPL. Notification includes the nature of the breach, categories of data affected, likely consequences, and measures taken.",
    aAr: "في حالة حدوث خرق مؤكد للبيانات يؤثر على بيانات العملاء السعوديين، ستُخطر Electi العملاء المتضررين في غضون 72 ساعة وفق متطلبات PDPL.",
  },
  {
    q: "Can enterprise clients request a private deployment?",
    qAr: "هل يمكن لعملاء المؤسسات طلب نشر خاص؟",
    a: "Yes. Enterprise and government clients may request on-premises or private cloud deployments, where the Electi platform runs entirely within the client's own infrastructure. Contact our enterprise team to discuss private deployment options.",
    aAr: "نعم. يمكن لعملاء المؤسسات والحكومات طلب عمليات نشر محلية أو سحابة خاصة، حيث تعمل منصة Electi بالكامل داخل البنية التحتية الخاصة بالعميل.",
  },
  {
    q: "How does Electi secure WhatsApp communications?",
    qAr: "كيف تُؤمِّن Electi اتصالات واتساب؟",
    a: "Electi integrates via the official WhatsApp Business API (Meta). All WhatsApp messages are end-to-end encrypted by WhatsApp's native protocol. Electi processes message content to generate AI responses; message content is not stored beyond the session window defined in your data retention settings.",
    aAr: "تتكامل Electi عبر واجهة برمجة تطبيقات WhatsApp Business الرسمية (Meta). تُشفَّر جميع رسائل واتساب من طرف إلى طرف بواسطة بروتوكول واتساب الأصلي.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://electi.sa/security",
      "name": "Security | Electi",
      "description": "Electi security architecture: encryption, access controls, Saudi data residency, backup, incident response and enterprise isolation.",
      "url": "https://electi.sa/security",
      "inLanguage": ["en-SA", "ar-SA"],
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://electi.sa/" },
          { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://electi.sa/security" },
        ],
      },
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

export default function SecurityPage() {
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
        title="Security | Electi — Enterprise-Grade AI Security for Saudi Businesses"
        titleAr="الأمان | Electi — أمان الذكاء الاصطناعي على مستوى المؤسسات للشركات السعودية"
        description="Electi security architecture: AES-256 encryption, Saudi data residency, PDPL compliance, 24/7 monitoring, and enterprise isolation. Built for Saudi enterprise security requirements."
        descriptionAr="بنية أمان Electi: تشفير AES-256 وإقامة البيانات السعودية وامتثال PDPL ومراقبة على مدار الساعة وعزل مؤسسي. مبنية لمتطلبات أمن المؤسسات السعودية."
        path="/security"
        schemas={[schema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(66,133,244,0.05) 0%,transparent 65%)" }} />
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Shield className="w-3 h-3" />
            {isAr ? "الأمان والبنية التحتية" : "Security & Infrastructure"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "أمان على مستوى" : "Enterprise-Grade"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "المؤسسات" : "Security"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {isAr
              ? "مبنية لمتطلبات المؤسسات السعودية — إقامة البيانات في المملكة، والامتثال لـ PDPL، والتشفير الكامل، والمراقبة على مدار الساعة."
              : "Built for Saudi enterprise requirements — in-Kingdom data residency, PDPL compliance, full encryption, and 24/7 monitoring."}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { v: "AES-256", l: isAr ? "تشفير البيانات" : "Data Encryption" },
              { v: "TLS 1.3", l: isAr ? "تشفير النقل" : "In-Transit Encryption" },
              { v: "KSA", l: isAr ? "إقامة البيانات" : "Data Residency" },
              { v: "72 hr", l: isAr ? "إشعار الخرق" : "Breach Notification" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-xl font-700 text-white">{s.v}</div>
                <div className="text-white/28 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ PILLARS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {isAr ? "طبقات الأمان" : "Security Architecture"}
              </h2>
              <p className="text-white/30 text-sm max-w-xl mx-auto">
                {isAr ? "كل طبقة مُصمَّمة للوفاء بأعلى معايير الأمان المؤسسي السعودي" : "Every layer designed to meet Saudi enterprise security standards"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={fadeUp}
                    className="rounded-2xl border border-white/7 p-6 hover:border-white/14 transition-all"
                    style={{ background: "rgba(255,255,255,0.025)" }}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <h3 className="font-700 text-white/85 text-sm mb-2">{isAr ? p.titleAr : p.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed">{isAr ? p.descAr : p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ DATA RESIDENCY CALLOUT ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border border-white/8 p-10 text-center"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-600 text-white/45 mb-6"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <Server className="w-3 h-3" />
              {isAr ? "الامتثال التنظيمي السعودي" : "Saudi Regulatory Compliance"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-700 mb-5">
              {isAr ? "مُصمَّم من الأساس للمملكة العربية السعودية" : "Built from the Ground Up for Saudi Arabia"}
            </h2>
            <p className="text-white/38 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              {isAr
                ? "تُخزَّن بيانات عملاء Electi في المملكة العربية السعودية، مما يلبّي متطلبات توطين البيانات وفق PDPL و NDMO. تتوافق منصتنا مع الأطر التنظيمية الصادرة عن وزارة الاتصالات وتقنية المعلومات، و SDAIA، و NDMO."
                : "Electi customer data is stored within Saudi Arabia, satisfying PDPL and NDMO data localisation requirements. Our platform aligns with regulatory frameworks from MCIT, SDAIA, and NDMO."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {["PDPL", "NDMO", "SDAIA", "MCIT"].map((org) => (
                <div key={org} className="rounded-xl border border-white/8 py-4 text-center"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="text-white/80 font-700 text-sm">{org}</div>
                  <div className="text-white/25 text-[10px] mt-1">{isAr ? "متوافق" : "Aligned"}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-700 mb-2">{isAr ? "أسئلة الأمان الشائعة" : "Security FAQ"}</h2>
            <p className="text-white/30 text-sm">{isAr ? "أسئلة شائعة من المؤسسات السعودية" : "Common questions from Saudi enterprise customers"}</p>
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
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-white/40" />
              <span className="text-white/40 text-sm">{isAr ? "لديك أسئلة أمنية إضافية؟" : "Have additional security questions?"}</span>
            </div>
            <h2 className="text-2xl font-700 mb-4">{isAr ? "تواصل مع فريق المؤسسات" : "Contact Our Enterprise Team"}</h2>
            <p className="text-white/30 text-sm mb-6 max-w-lg mx-auto">
              {isAr
                ? "يمكن لفريق المؤسسات لدينا تقديم وثائق الأمان الإضافية، وتقارير اختبار الاختراق، ومناقشة متطلبات النشر الخاص."
                : "Our enterprise team can provide additional security documentation, penetration testing reports, and discuss private deployment requirements."}
            </p>
            <a href="mailto:mohammed@electi.sa?subject=Enterprise Security Inquiry">
              <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "تواصل مع فريق المؤسسات" : "Contact Enterprise Team"}
              </motion.button>
            </a>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
