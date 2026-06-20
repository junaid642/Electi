import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Download, FileText, BarChart3, Brain, Globe, Shield, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const RESOURCES = [
  {
    icon: BarChart3,
    type: "Whitepaper", typeAr: "ورقة بحثية",
    title: "State of AI Adoption in Saudi Arabia 2025",
    titleAr: "حالة تبني الذكاء الاصطناعي في المملكة العربية السعودية 2025",
    desc: "36-page comprehensive analysis of AI investment, sector adoption rates, regulatory landscape, and Vision 2030 alignment. Includes original Electi research data from 150+ Saudi enterprise deployments.",
    descAr: "تحليل شامل من 36 صفحة لاستثمار الذكاء الاصطناعي ومعدلات تبني القطاعات والمشهد التنظيمي والتوافق مع رؤية 2030. يشمل بيانات بحث Electi الأصلية من 150+ عملية نشر مؤسسية سعودية.",
    pages: "36", readTime: "45 min",
    slug: "state-of-ai-saudi-2025",
    tags: ["Research", "Vision 2030", "Enterprise"],
  },
  {
    icon: Brain,
    type: "Industry Report", typeAr: "تقرير صناعي",
    title: "Saudi AI Agent ROI Report: 2025 Benchmarks",
    titleAr: "تقرير عائد استثمار وكيل الذكاء الاصطناعي السعودي: معايير 2025",
    desc: "ROI benchmarks for AI Agent deployments across 6 Saudi industries. Includes cost-per-interaction data, payback periods, CSAT scores, and deployment case studies from real Saudi businesses.",
    descAr: "معايير عائد الاستثمار لنشر وكيل الذكاء الاصطناعي عبر 6 صناعات سعودية. يتضمن بيانات التكلفة لكل تفاعل وفترات الاسترداد ودرجات CSAT.",
    pages: "28", readTime: "35 min",
    slug: "ai-agent-roi-benchmarks-2025",
    tags: ["ROI", "Benchmarks", "Case Studies"],
  },
  {
    icon: Globe,
    type: "Readiness Guide", typeAr: "دليل الاستعداد",
    title: "Saudi AI Readiness Assessment: Is Your Business AI-Ready?",
    titleAr: "تقييم الاستعداد للذكاء الاصطناعي السعودي: هل عملك مستعد للذكاء الاصطناعي؟",
    desc: "Self-assessment framework to evaluate your organisation's AI readiness across 5 dimensions: data maturity, technical infrastructure, team capability, process documentation, and leadership buy-in.",
    descAr: "إطار التقييم الذاتي لتقييم جاهزية مؤسستك للذكاء الاصطناعي عبر 5 أبعاد: نضج البيانات والبنية التحتية التقنية وقدرات الفريق وتوثيق العمليات ودعم القيادة.",
    pages: "22", readTime: "25 min",
    slug: "saudi-ai-readiness-assessment",
    tags: ["Self-Assessment", "Framework", "SME"],
  },
  {
    icon: FileText,
    type: "Strategy Guide", typeAr: "دليل الاستراتيجية",
    title: "Business Automation Framework for Saudi Enterprises",
    titleAr: "إطار أتمتة الأعمال للمؤسسات السعودية",
    desc: "Step-by-step framework for identifying, prioritising, and implementing automation opportunities in your Saudi business. Covers process mapping, ROI calculation, PDPL compliance, and change management.",
    descAr: "إطار خطوة بخطوة لتحديد فرص الأتمتة وإعطاء أولويات لها وتنفيذها في عملك السعودي. يشمل رسم خرائط العمليات وحساب عائد الاستثمار والامتثال لـ PDPL وإدارة التغيير.",
    pages: "31", readTime: "40 min",
    slug: "business-automation-framework-saudi",
    tags: ["Automation", "Framework", "Enterprise"],
  },
  {
    icon: Shield,
    type: "Compliance Guide", typeAr: "دليل الامتثال",
    title: "PDPL Compliance Guide for AI Deployments in Saudi Arabia",
    titleAr: "دليل الامتثال لنظام حماية البيانات الشخصية لعمليات نشر الذكاء الاصطناعي في المملكة",
    desc: "Practical compliance guide for Saudi businesses deploying AI systems that process customer data. Covers consent requirements, data localisation, retention policies, and NDMO reporting obligations.",
    descAr: "دليل امتثال عملي للشركات السعودية التي تنشر أنظمة الذكاء الاصطناعي التي تعالج بيانات العملاء. يغطي متطلبات الموافقة وتوطين البيانات وسياسات الاحتفاظ والتزامات الإبلاغ لـ NDMO.",
    pages: "18", readTime: "20 min",
    slug: "pdpl-compliance-ai-guide",
    tags: ["PDPL", "Compliance", "Legal"],
  },
  {
    icon: BarChart3,
    type: "Executive Guide", typeAr: "دليل تنفيذي",
    title: "Vision 2030 AI Alignment Guide for Saudi Business Leaders",
    titleAr: "دليل التوافق مع رؤية 2030 للذكاء الاصطناعي لقادة الأعمال السعوديين",
    desc: "How to align your AI strategy with Vision 2030 national priorities — including Saudisation (Nitaqat), digital economy targets, and partnership opportunities with government AI programmes.",
    descAr: "كيفية توافق استراتيجية الذكاء الاصطناعي مع أولويات رؤية 2030 الوطنية — بما في ذلك التوطين ونطاقات وأهداف الاقتصاد الرقمي وفرص الشراكة مع برامج الذكاء الاصطناعي الحكومية.",
    pages: "24", readTime: "30 min",
    slug: "vision-2030-ai-alignment",
    tags: ["Vision 2030", "Strategy", "Leadership"],
  },
];

interface FormState { name: string; company: string; email: string; phone: string; role: string }

function DownloadForm({ resource, onClose }: { resource: typeof RESOURCES[0]; onClose: () => void }) {
  const { isAr } = useLang();
  const [form, setForm] = useState<FormState>({ name: "", company: "", email: "", phone: "", role: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Resource Download Request: ${resource.title}`);
    const body = encodeURIComponent(
      `Resource: ${resource.title}\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nRole: ${form.role}`
    );
    window.location.href = `mailto:mohammed@electi.sa?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className="w-full max-w-lg rounded-3xl border border-white/10 p-8"
        style={{ background: "#0a0a0a" }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-white/60 mx-auto mb-4" />
            <h3 className="text-xl font-700 text-white mb-2">
              {isAr ? "شكراً! جاري إرسال طلبك" : "Thank you! Your request is being sent."}
            </h3>
            <p className="text-white/35 text-sm mb-6">
              {isAr ? "سيتواصل معك فريق Electi قريباً بالمورد." : "An Electi team member will follow up with your resource shortly."}
            </p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-600">
              {isAr ? "إغلاق" : "Close"}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-white/30 text-xs font-700 uppercase tracking-wider mb-1">
                {isAr ? resource.typeAr : resource.type}
              </p>
              <h3 className="text-lg font-700 text-white leading-snug">
                {isAr ? resource.titleAr : resource.title}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "name", label: "Full Name", labelAr: "الاسم الكامل", type: "text" },
                { key: "company", label: "Company", labelAr: "الشركة", type: "text" },
                { key: "email", label: "Work Email", labelAr: "البريد الإلكتروني للعمل", type: "email" },
                { key: "phone", label: "Phone (WhatsApp)", labelAr: "الهاتف (واتساب)", type: "tel" },
                { key: "role", label: "Your Role", labelAr: "دورك الوظيفي", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-white/45 text-xs font-600 mb-1.5">
                    {isAr ? f.labelAr : f.label}
                  </label>
                  <input
                    type={f.type}
                    required
                    value={form[f.key as keyof FormState]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/4 text-white text-sm placeholder-white/20 outline-none focus:border-white/22 transition-colors"
                    placeholder={isAr ? f.labelAr : f.label}
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <motion.button type="submit"
                  className="flex-1 py-3.5 rounded-xl font-600 bg-white text-black text-sm flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Download className="w-4 h-4" />
                  {isAr ? "تحميل المورد" : "Download Resource"}
                </motion.button>
                <button type="button" onClick={onClose}
                  className="px-4 py-3.5 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white/60 transition-colors">
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
              </div>
              <p className="text-white/20 text-[10px] text-center">
                {isAr ? "بيانات متوافقة مع PDPL. لن نشارك معلوماتك مع أطراف ثالثة." : "PDPL-compliant data handling. We will never share your information."}
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function DownloadsPage() {
  const { isAr }  = useLang();
  const [active, setActive] = useState<typeof RESOURCES[0] | null>(null);

  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": isAr ? "موارد قابلة للتحميل | مركز Electi للأبحاث" : "Downloadable AI Resources | Electi Research Center",
    "description": "Whitepapers, industry reports, and strategy guides on AI for Saudi businesses.",
    "url": "https://electi.sa/resources/downloads",
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SEOHead
        title={isAr ? "موارد قابلة للتحميل — أوراق بحثية وأدلة الذكاء الاصطناعي | Electi" : "Downloadable AI Resources — Whitepapers & Guides | Electi Research Center"}
        description={isAr ? "حمّل أوراقاً بحثية وتقارير صناعية وأدلة استراتيجية حول الذكاء الاصطناعي للشركات السعودية من مركز Electi للأبحاث." : "Download whitepapers, industry reports, and strategy guides on AI for Saudi businesses. PDPL-compliant data handling by Electi Research Center."}
        path="/resources/downloads"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Download className="w-3 h-3" />
            {isAr ? "مكتبة الموارد" : "Resource Library"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "أوراق بحثية وأدلة" : "Whitepapers & Guides"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "للشركات السعودية" : "for Saudi Businesses"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {isAr
              ? "موارد بحثية متعمقة حول الذكاء الاصطناعي — تقارير صناعية وأدلة الاستعداد وأطر الاستراتيجية لقادة الأعمال السعوديين."
              : "In-depth AI research resources — industry reports, readiness guides, and strategy frameworks for Saudi business leaders."}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { v: "6", l: isAr ? "موارد قابلة للتحميل" : "Downloadable Resources" },
              { v: "PDPL", l: isAr ? "بيانات متوافقة" : "Compliant Data" },
              { v: "Free", l: isAr ? "وصول مجاني" : "Free Access" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-700 text-white">{s.v}</div>
                <div className="text-white/28 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ RESOURCE GRID ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="mb-8">
              <h2 className="text-2xl font-700 mb-1">{isAr ? "جميع الموارد" : "All Resources"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "اختر مورداً وأدخل بياناتك للوصول الفوري" : "Select a resource and enter your details for instant access"}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RESOURCES.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.slug} variants={fadeUp} custom={i}>
                    <div onClick={() => setActive(r)} className="h-full">
                    <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="border border-white/7 rounded-2xl hover:border-white/14 transition-all bg-[#050505] cursor-pointer group h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <Icon className="w-4 h-4 text-white/50" />
                          </div>
                          <span className="text-[9px] font-700 text-white/25 uppercase tracking-wider border border-white/8 px-2 py-1 rounded-full"
                            style={{ background: "rgba(255,255,255,0.02)" }}>
                            {isAr ? r.typeAr : r.type}
                          </span>
                        </div>
                        <h3 className="font-700 text-white/85 text-sm leading-snug mb-3 flex-1 group-hover:text-white transition-colors">
                          {isAr ? r.titleAr : r.title}
                        </h3>
                        <p className="text-white/28 text-xs leading-relaxed mb-5">
                          {isAr ? r.descAr : r.desc}
                        </p>
                        <div className="flex items-center gap-3 text-white/20 text-[10px] mt-auto">
                          <span>{r.pages} {isAr ? "صفحة" : "pages"}</span>
                          <span className="w-px h-3 bg-white/12" />
                          <span>{r.readTime}</span>
                          <button className="ms-auto flex items-center gap-1 font-700 text-white/30 group-hover:text-white/60 transition-colors text-[10px] border border-white/8 px-3 py-1.5 rounded-lg hover:border-white/18"
                            style={{ background: "rgba(255,255,255,0.03)" }}>
                            <Download className="w-3 h-3" /> {isAr ? "تحميل" : "Download"}
                          </button>
                        </div>
                      </div>
                    </SpotlightCard>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ BACK TO RESOURCES ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-white/5">
          <p className="text-white/30 text-sm mb-4">{isAr ? "استكشف مزيداً من الأدلة البحثية" : "Explore more research guides"}</p>
          <Link href="/resources">
            <motion.button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/45 hover:text-white/70 hover:border-white/18 transition-all text-sm font-600"
              style={{ background: "rgba(255,255,255,0.03)" }}
              whileHover={{ scale: 1.03 }}>
              {isAr ? "عودة إلى مركز الموارد" : "Back to Research Center"}
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </motion.button>
          </Link>
        </div>
        <Footer />
      </section>

      {/* Modal */}
      {active && (
        <DownloadForm resource={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
