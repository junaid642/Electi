import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, MessageSquare, TrendingUp, Users, Briefcase, Zap, Mic } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { CASE_STUDIES } from "@/data/casestudies";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-customer-support":   MessageSquare,
  "ai-sales-agent":        TrendingUp,
  "ai-receptionist":       Users,
  "ai-hr-agent":           Briefcase,
  "ai-workflow-automation":Zap,
  "ai-voice-agents":       Mic,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://electi.sa/case-studies",
  "name": "Case Studies & Use Cases | Electi — AI Agents Saudi Arabia",
  "description": "Example use cases showing how Electi AI agents work for customer support, sales qualification, reception, HR, workflow automation, and voice handling for Saudi businesses.",
  "url": "https://electi.sa/case-studies",
  "hasPart": CASE_STUDIES.map((c) => ({
    "@type": "Article",
    "name": c.title,
    "url": `https://electi.sa/case-studies/${c.slug}`,
  })),
};

const TRUST_SIGNALS = [
  { icon: "🔒", title: "Official WhatsApp Business API",  titleAr: "WhatsApp Business API الرسمي",  desc: "Meta-approved — not unofficial bots",              descAr: "معتمد من Meta — وليس بوتات غير رسمية" },
  { icon: "🇸🇦", title: "Saudi Data Residency",           titleAr: "إقامة البيانات في المملكة",       desc: "Customer data stored within Saudi Arabia",         descAr: "بيانات العملاء مُخزَّنة داخل المملكة العربية السعودية" },
  { icon: "🌐", title: "Bilingual Arabic + English",      titleAr: "ثنائي اللغة عربي + إنجليزي",    desc: "Every agent speaks both languages fluently",       descAr: "كل وكيل يتحدث اللغتين بطلاقة" },
  { icon: "🔗", title: "ERP & CRM Integrations",         titleAr: "تكاملات ERP وCRM",               desc: "Odoo, SAP, Salesforce, HubSpot, and more",         descAr: "Odoo وSAP وSalesforce وHubSpot والمزيد" },
  { icon: "⚡", title: "Rapid Deployment",               titleAr: "نشر سريع",                       desc: "Standard agents live in 2–4 weeks",                descAr: "الوكلاء القياسيون يُطلَقون في 2–4 أسابيع" },
  { icon: "🤝", title: "Human Handoff Protocol",         titleAr: "بروتوكول التسليم البشري",         desc: "AI handles routine; humans handle sensitive cases", descAr: "الذكاء الاصطناعي للروتيني؛ البشر للحالات الحساسة" },
];

export default function CaseStudiesHub() {
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
        title="Case Studies & Use Cases | Electi — AI Agents for Saudi Businesses"
        titleAr="حالات الاستخدام | Electi — وكلاء الذكاء الاصطناعي للشركات السعودية"
        description="Example AI agent use cases for Saudi businesses: customer support, sales qualification, AI receptionist, HR self-service, ERP workflow automation, and voice agent handling."
        descriptionAr="حالات استخدام مثالية لوكلاء الذكاء الاصطناعي للشركات السعودية: دعم العملاء وتأهيل المبيعات وموظف الاستقبال الذكي والخدمة الذاتية للموارد البشرية وأتمتة سير عمل ERP."
        path="/case-studies"
        keywords="AI agent case study Saudi Arabia, AI customer support Saudi Arabia, AI sales agent Saudi Arabia, AI receptionist Saudi Arabia, WhatsApp AI automation"
        schemas={[schema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          {/* Transparency badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 text-[11px] font-600 text-amber-400/70 mb-6"
            style={{ background: "rgba(245,158,11,0.06)" }}>
            <Lightbulb className="w-3 h-3" />
            {isAr ? "حالات استخدام مثالية — ليست مشاريع عملاء حقيقية" : "Example Use Cases — Not Real Client Projects"}
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "كيف تعمل وكلاء" : "How Electi AI"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "Electi الذكيون" : "Agents Work"}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            {isAr
              ? "استكشف سيناريوهات استخدام مفصَّلة تُظهر كيف يمكن نشر وكلاء Electi الذكيين للشركات السعودية في قطاعات مختلفة. جميع السيناريوهات مُصنَّفة بوضوح كحالات استخدام مثالية."
              : "Explore detailed use-case scenarios showing how Electi AI agents can be deployed for Saudi businesses across different sectors. All scenarios are clearly labelled as example use cases."}
          </motion.p>

          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 text-xs text-white/32"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            {isAr
              ? "لا إحصائيات مُلفَّقة • لا أسماء عملاء مزيَّفة • لا نتائج مُبالَغ فيها"
              : "No fabricated statistics • No fake client names • No exaggerated results"}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ USE CASE CARDS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">
                {isAr ? "سيناريوهات الاستخدام" : "Use Case Scenarios"}
              </h2>
              <p className="text-white/25 text-sm">
                {isAr ? "6 سيناريوهات مفصَّلة — تحديات الأعمال والحلول وعمليات التنفيذ والنتائج المتوقعة" : "6 detailed scenarios — business challenges, solutions, implementation process, and expected outcomes"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASE_STUDIES.map((cs, i) => {
                const Icon = ICONS[cs.slug] || Lightbulb;
                return (
                  <motion.div key={cs.slug} variants={fadeUp}>
                    <Link href={`/case-studies/${cs.slug}`}>
                      <motion.div className="h-full rounded-2xl border border-white/7 p-6 cursor-pointer hover:border-white/14 transition-all group"
                        style={{ background: "rgba(255,255,255,0.02)" }} whileHover={{ y: -3 }}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <Icon className="w-4 h-4 text-white/40" />
                          </div>
                          <span className="text-[9px] font-700 text-amber-400/40 uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/20"
                            style={{ background: "rgba(245,158,11,0.05)" }}>
                            {isAr ? "مثال" : "Example"}
                          </span>
                        </div>
                        <h3 className="font-700 text-white/80 mb-1">{isAr ? cs.titleAr : cs.title}</h3>
                        <p className="text-white/25 text-xs mb-2">{isAr ? cs.industryTypeAr : cs.industryType}</p>
                        <p className="text-white/28 text-xs leading-relaxed mb-5">{isAr ? cs.taglineAr : cs.tagline}</p>
                        <div className="flex items-center gap-1.5 text-white/22 group-hover:text-white/45 transition-colors text-xs">
                          <span>{isAr ? "عرض السيناريو" : "View scenario"}</span>
                          <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ TRUST SIGNALS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl font-700 mb-3">{isAr ? "ما يمكنك التحقق منه" : "What You Can Verify"}</h2>
              <p className="text-white/25 text-sm max-w-xl mx-auto">
                {isAr ? "عوامل الثقة هذه قابلة للتحقق منها — وليست ادعاءات تسويقية." : "These trust factors are verifiable — not marketing claims."}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRUST_SIGNALS.map((ts, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="rounded-2xl border border-white/7 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="text-2xl mb-3">{ts.icon}</div>
                  <h3 className="font-700 text-white/70 text-sm mb-1">{isAr ? ts.titleAr : ts.title}</h3>
                  <p className="text-white/30 text-xs">{isAr ? ts.descAr : ts.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ TECHNOLOGY STACK ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl font-700 mb-3">{isAr ? "المكدس التقني" : "Technology Stack"}</h2>
            <p className="text-white/22 text-xs">{isAr ? "التقنيات التي تعمل عليها منصة Electi" : "The technologies Electi's platform runs on"}</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {["OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "WhatsApp Business API",
              "Meta Business Platform", "Microsoft Graph API", "Google Workspace API",
              "Odoo API", "SAP OData", "Salesforce REST API", "HubSpot API", "Zoho API",
              "AES-256 Encryption", "SOC 2 Practices", "PDPL Compliant"].map((tech) => (
              <div key={tech} className="px-3.5 py-1.5 rounded-full border border-white/8 text-[11px] text-white/35"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-700 mb-4">
              {isAr ? "هل تريد نشر حل مشابه؟" : "Want to Deploy a Similar Solution?"}
            </h2>
            <p className="text-white/28 text-sm mb-6 max-w-md mx-auto">
              {isAr
                ? "تواصل مع فريق Electi لمناقشة متطلباتك المحددة وكيف يمكن تكييف أحد هذه السيناريوهات مع أعمالك في المملكة العربية السعودية."
                : "Contact Electi to discuss your specific requirements and how one of these scenarios could be tailored for your Saudi business."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="mailto:mohammed@electi.sa?subject=AI Agent Implementation Inquiry">
                <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "تواصل معنا" : "Get in Touch"}
                </motion.button>
              </a>
              <Link href="/integrations">
                <motion.button className="px-8 py-3.5 rounded-xl border border-white/10 text-white/45 text-sm font-600 hover:border-white/18 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "عرض التكاملات" : "View Integrations"}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
