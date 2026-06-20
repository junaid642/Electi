import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Lock, User, FileText, Trash2, Download, Eye, Clock } from "lucide-react";
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

const dataCategories = [
  {
    icon: User,
    title: "Account Data",
    titleAr: "بيانات الحساب",
    what: "Name, email address, phone number, company name, billing address.",
    whatAr: "الاسم وعنوان البريد الإلكتروني ورقم الهاتف واسم الشركة وعنوان الفوترة.",
    why: "To create and manage your Electi account, provide services, and send billing-related communications.",
    whyAr: "لإنشاء حسابك في Electi وإدارته وتقديم الخدمات وإرسال الاتصالات المتعلقة بالفوترة.",
    retention: "Duration of service relationship + 3 years (billing records, per Saudi tax law).",
    retentionAr: "مدة علاقة الخدمة + 3 سنوات (سجلات الفوترة، وفق نظام الضرائب السعودي).",
  },
  {
    icon: FileText,
    title: "Configuration Data",
    titleAr: "بيانات الإعداد",
    what: "Agent configuration, workflow settings, integration credentials (encrypted), and system prompts.",
    whatAr: "إعداد الوكيل وإعدادات سير العمل وبيانات اعتماد التكامل (مشفرة) والموجّهات النظامية.",
    why: "To operate the AI agents and automation workflows you have configured.",
    whyAr: "لتشغيل وكلاء الذكاء الاصطناعي وسير عمل الأتمتة التي قمت بإعدادها.",
    retention: "Duration of service relationship. Deleted within 30 days of account closure.",
    retentionAr: "مدة علاقة الخدمة. يُحذف في غضون 30 يوماً من إغلاق الحساب.",
  },
  {
    icon: Eye,
    title: "Conversation Logs",
    titleAr: "سجلات المحادثة",
    what: "Message content and metadata from AI agent interactions on your behalf.",
    whatAr: "محتوى الرسائل والبيانات الوصفية من تفاعلات وكيل الذكاء الاصطناعي نيابةً عنك.",
    why: "To deliver AI responses, maintain conversation context, support quality review, and fulfil enterprise audit requirements.",
    whyAr: "لتقديم ردود الذكاء الاصطناعي والحفاظ على سياق المحادثة ودعم مراجعة الجودة والوفاء بمتطلبات تدقيق المؤسسات.",
    retention: "90 days by default. Enterprise clients may configure custom retention policies.",
    retentionAr: "90 يوماً بشكل افتراضي. يمكن لعملاء المؤسسات تكوين سياسات احتفاظ مخصصة.",
  },
  {
    icon: Database,
    title: "Usage & Analytics Data",
    titleAr: "بيانات الاستخدام والتحليلات",
    what: "Interaction counts, response times, error rates, and feature usage aggregated at account level.",
    whatAr: "أعداد التفاعلات وأوقات الاستجابة ومعدلات الأخطاء واستخدام الميزات مجمّعةً على مستوى الحساب.",
    why: "To provide your usage dashboard, generate billing, improve platform performance, and identify service issues.",
    whyAr: "لتوفير لوحة استخدامك وتوليد الفوترة وتحسين أداء المنصة وتحديد مشكلات الخدمة.",
    retention: "2 years in aggregated, anonymised form.",
    retentionAr: "سنتان بشكل مجمَّع ومجهول الهوية.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://electi.sa/data-protection",
  "name": "Data Protection | Electi",
  "description": "How Electi collects, uses, stores, and protects your data. PDPL-compliant data handling for Saudi businesses.",
  "url": "https://electi.sa/data-protection",
};

export default function DataProtectionPage() {
  const { isAr } = useLang();
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

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title="Data Protection | Electi — How We Handle Your Data"
        titleAr="حماية البيانات | Electi — كيف نتعامل مع بياناتك"
        description="How Electi collects, uses, stores, and protects customer data. PDPL-compliant. Saudi data residency. Clear retention policies and data subject rights."
        descriptionAr="كيف تجمع Electi بيانات العملاء وتستخدمها وتخزنها وتحميها. متوافق مع PDPL. إقامة البيانات السعودية. سياسات احتفاظ واضحة وحقوق أصحاب البيانات."
        path="/data-protection"
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
            <Lock className="w-3 h-3" />
            {isAr ? "حماية البيانات" : "Data Protection"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "كيف نتعامل" : "How We Handle"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "مع بياناتك" : "Your Data"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "شفافية كاملة حول البيانات التي نجمعها ولماذا وكيف نحميها وكم من الوقت نحتفظ بها — وكيف تطلب الوصول إليها أو حذفها."
              : "Full transparency on what data we collect, why, how we protect it, how long we keep it — and how to request access or deletion."}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ PRINCIPLES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "مبادئ حماية البيانات" : "Data Protection Principles"}</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Lock, title: "Purpose Limitation", titleAr: "تقييد الغرض", desc: "Data collected for a specific purpose is used only for that purpose — never shared, sold, or repurposed without consent.", descAr: "البيانات المجمَّعة لغرض محدد تُستخدَم لذلك الغرض فقط — ولا تُشارَك أو تُباع أو تُعاد استخدامها دون موافقة." },
                { icon: Database, title: "Data Minimisation", titleAr: "تقليل البيانات", desc: "We collect only the data necessary to provide the service. We do not collect data speculatively.", descAr: "نجمع فقط البيانات الضرورية لتقديم الخدمة. لا نجمع بيانات بصفة استكشافية." },
                { icon: Clock, title: "Storage Limitation", titleAr: "تقييد التخزين", desc: "Data is retained only as long as necessary for the purpose it was collected, or as required by Saudi law.", descAr: "يُحتفَظ بالبيانات فقط طالما كان ذلك ضرورياً للغرض الذي جُمعت من أجله، أو حسبما يشترطه النظام السعودي." },
                { icon: Eye, title: "Transparency", titleAr: "الشفافية", desc: "Clear communication about what data we hold, why, and how you can access, correct, or delete it.", descAr: "تواصل واضح حول البيانات التي نحتفظ بها ولماذا وكيف يمكنك الوصول إليها أو تصحيحها أو حذفها." },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={fadeUp} className="rounded-xl border border-white/7 p-5 hover:border-white/12 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-4 h-4 text-white/45" />
                    </div>
                    <h3 className="font-700 text-white/80 text-sm mb-1.5">{isAr ? p.titleAr : p.title}</h3>
                    <p className="text-white/28 text-xs leading-relaxed">{isAr ? p.descAr : p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ DATA CATEGORIES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "ما البيانات التي نجمعها" : "What Data We Collect"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "فئات البيانات والغرض وسياسة الاحتفاظ" : "Data categories, purpose, and retention policy"}</p>
            </motion.div>
            <div className="space-y-4">
              {dataCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.title} variants={fadeUp} className="rounded-2xl border border-white/7 p-7 hover:border-white/12 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <Icon className="w-4 h-4 text-white/45" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-700 text-white/80 mb-4">{isAr ? cat.titleAr : cat.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-[9px] font-700 text-white/25 uppercase tracking-wider mb-1">{isAr ? "ما نجمعه" : "What"}</div>
                            <p className="text-white/38 text-xs leading-relaxed">{isAr ? cat.whatAr : cat.what}</p>
                          </div>
                          <div>
                            <div className="text-[9px] font-700 text-white/25 uppercase tracking-wider mb-1">{isAr ? "لماذا" : "Why"}</div>
                            <p className="text-white/38 text-xs leading-relaxed">{isAr ? cat.whyAr : cat.why}</p>
                          </div>
                          <div>
                            <div className="text-[9px] font-700 text-white/25 uppercase tracking-wider mb-1">{isAr ? "فترة الاحتفاظ" : "Retention"}</div>
                            <p className="text-white/38 text-xs leading-relaxed">{isAr ? cat.retentionAr : cat.retention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ REQUEST DATA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-3xl border border-white/8 p-10 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex justify-center gap-4 mb-6">
                {[Download, Trash2, Eye].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <Icon className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-700 mb-4">{isAr ? "طلب بياناتك أو حذفها" : "Request or Delete Your Data"}</h2>
              <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                {isAr
                  ? "لطلب نسخة من بياناتك، تصحيح أي أخطاء، أو طلب الحذف، أرسل بريداً إلكترونياً إلى فريقنا. سنرد في غضون 30 يوماً وفق متطلبات PDPL."
                  : "To request a copy of your data, correct any inaccuracies, or request deletion, email our team. We respond within 30 days as required by PDPL."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:mohammed@electi.sa?subject=Data Protection Request">
                  <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "إرسال طلب بيانات" : "Submit Data Request"}
                  </motion.button>
                </a>
                <Link href="/compliance">
                  <motion.button className="px-8 py-3.5 rounded-xl border border-white/10 text-white/45 text-sm font-600 hover:text-white/60 hover:border-white/18 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }} whileHover={{ scale: 1.02 }}>
                    {isAr ? "صفحة الامتثال" : "View Compliance Page"}
                  </motion.button>
                </Link>
              </div>
              <p className="text-white/18 text-[10px] mt-6">
                {isAr ? "هيئة حماية البيانات الشخصية (نظام PDPL) | المملكة العربية السعودية" : "Personal Data Protection Authority (PDPL) | Kingdom of Saudi Arabia"}
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
