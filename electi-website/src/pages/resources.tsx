import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useSearch } from "wouter";
import {
  BookOpen, BarChart3, Globe, Users, Headphones, TrendingUp, Building2, Heart, Star, GraduationCap,
  ArrowRight, Download, Search as SearchIcon, Brain,
} from "lucide-react";
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

function InViewDiv({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const CATEGORIES = [
  { slug: "ai-agents",            icon: Brain,       label: "AI Agents",            labelAr: "وكلاء الذكاء الاصطناعي" },
  { slug: "business-automation",  icon: BarChart3,   label: "Business Automation",   labelAr: "أتمتة الأعمال" },
  { slug: "ai-saudi-arabia",      icon: Globe,       label: "AI in Saudi Arabia",    labelAr: "الذكاء الاصطناعي في السعودية" },
  { slug: "ai-enterprises",       icon: Building2,   label: "AI for Enterprises",    labelAr: "الذكاء الاصطناعي للمؤسسات" },
  { slug: "ai-customer-service",  icon: Headphones,  label: "AI Customer Service",   labelAr: "خدمة العملاء الذكية" },
  { slug: "ai-sales-automation",  icon: TrendingUp,  label: "AI Sales Automation",   labelAr: "أتمتة المبيعات الذكية" },
  { slug: "ai-voice-agents",      icon: Brain,       label: "AI Voice Agents",       labelAr: "وكلاء الصوت الذكي" },
  { slug: "ai-workforce",         icon: Users,       label: "AI Workforce",          labelAr: "القوى العاملة الذكية" },
  { slug: "ai-governance",        icon: BookOpen,    label: "AI Governance",         labelAr: "حوكمة الذكاء الاصطناعي" },
  { slug: "digital-transformation", icon: Star,      label: "Digital Transformation", labelAr: "التحول الرقمي" },
];

const PILLARS = [
  { slug: "state-of-ai-in-saudi-arabia",           cat: "ai-saudi-arabia",     icon: Globe,      title: "State of AI Adoption in Saudi Arabia", titleAr: "حالة تبني الذكاء الاصطناعي في المملكة العربية السعودية", read: "15 min",  featured: true },
  { slug: "future-of-ai-agents-saudi-arabia",       cat: "ai-agents",           icon: Brain,      title: "Future of AI Agents in Saudi Arabia",   titleAr: "مستقبل وكلاء الذكاء الاصطناعي في المملكة العربية السعودية", read: "12 min",  featured: true },
  { slug: "ai-agents-for-saudi-businesses",         cat: "ai-agents",           icon: Building2,  title: "AI Agents for Saudi Businesses",         titleAr: "وكلاء الذكاء الاصطناعي للشركات السعودية", read: "14 min" },
  { slug: "ai-agents-vs-traditional-employees",     cat: "ai-workforce",        icon: Users,      title: "AI Agents vs Traditional Employees",      titleAr: "وكلاء الذكاء الاصطناعي مقابل الموظفين التقليديين", read: "11 min" },
  { slug: "ai-customer-service-trends-saudi-arabia",cat: "ai-customer-service", icon: Headphones, title: "AI Customer Service Trends in Saudi Arabia", titleAr: "اتجاهات خدمة العملاء الذكية في المملكة العربية السعودية", read: "13 min" },
  { slug: "ai-in-hospitality",                      cat: "digital-transformation", icon: Star,    title: "AI in Hospitality",                       titleAr: "الذكاء الاصطناعي في قطاع الضيافة", read: "10 min" },
  { slug: "ai-in-healthcare",                       cat: "digital-transformation", icon: Heart,   title: "AI in Healthcare",                        titleAr: "الذكاء الاصطناعي في قطاع الرعاية الصحية", read: "12 min" },
  { slug: "ai-in-real-estate",                      cat: "digital-transformation", icon: Building2, title: "AI in Real Estate",                     titleAr: "الذكاء الاصطناعي في قطاع العقارات", read: "10 min" },
  { slug: "ai-in-government",                       cat: "ai-governance",       icon: Globe,      title: "AI in Government",                        titleAr: "الذكاء الاصطناعي في القطاع الحكومي", read: "11 min" },
  { slug: "ai-in-education",                        cat: "digital-transformation", icon: GraduationCap, title: "AI in Education",                  titleAr: "الذكاء الاصطناعي في قطاع التعليم", read: "10 min" },
];

const DOWNLOADS = [
  { icon: Download, title: "Saudi AI Readiness Assessment",         titleAr: "تقييم الاستعداد للذكاء الاصطناعي في السعودية",      type: "Whitepaper",        typeAr: "ورقة بحثية" },
  { icon: BarChart3, title: "AI ROI Report: Saudi SMEs",            titleAr: "تقرير العائد على الاستثمار: الشركات الصغيرة السعودية",  type: "Industry Report",   typeAr: "تقرير صناعي" },
  { icon: Brain,     title: "Business Automation Framework 2025",   titleAr: "إطار أتمتة الأعمال 2025",                              type: "Strategy Guide",    typeAr: "دليل الاستراتيجية" },
  { icon: Globe,     title: "Vision 2030 AI Alignment Guide",       titleAr: "دليل التوافق مع رؤية 2030 للذكاء الاصطناعي",          type: "Executive Guide",   typeAr: "دليل تنفيذي" },
];

const AUTHORITY_SCORES = [
  { label: "Thought Leadership Score",    labelAr: "نقاط قيادة الفكر",        value: 94 },
  { label: "Content Authority Score",     labelAr: "نقاط سلطة المحتوى",       value: 97 },
  { label: "AI Search Visibility Score",  labelAr: "نقاط ظهور البحث الذكي",   value: 91 },
  { label: "Backlink Readiness Score",    labelAr: "نقاط جاهزية الروابط",      value: 89 },
];

export default function ResourcesPage() {
  const { isAr }  = useLang();
  const search    = useSearch();
  const params    = new URLSearchParams(search);
  const activeCat = params.get("cat") ?? "all";

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

  const visible = activeCat === "all" ? PILLARS : PILLARS.filter((p) => p.cat === activeCat);
  const featured = PILLARS.filter((p) => p.featured);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Electi AI Research Center — Saudi Arabia",
    "description": "Saudi Arabia's leading AI research and authority content hub. Long-form pillar guides, industry reports, and AI whitepapers.",
    "url": "https://electi.sa/resources",
    "publisher": { "@type": "Organization", "name": "Electi", "url": "https://electi.sa" },
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SEOHead
        title={isAr ? "مركز البحث والموارد | Electi" : "Saudi AI Research Center | Electi"}
        description={isAr ? "مركز Electi للبحث — المصدر الرائد للمحتوى التعليمي والسلطوي حول الذكاء الاصطناعي للشركات السعودية." : "Electi Research Center — Saudi Arabia's leading source for AI thought leadership, industry reports, and long-form guides on AI Agents and digital transformation."}
        path="/resources"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(66,133,244,0.05) 0%,transparent 65%)" }} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <BookOpen className="w-3 h-3" />
            {isAr ? "مركز الأبحاث والموارد" : "Saudi AI Research Center"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.6rem,6vw,4.8rem)" }}>
            {isAr ? (
              <><span style={{ color: "rgba(255,255,255,0.45)" }}>المعرفة</span> التي تقود<br />التحول الرقمي</>
            ) : (
              <>The Knowledge That<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Powers Saudi AI</span></>
            )}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/40 text-lg leading-relaxed mb-3 max-w-2xl mx-auto">
            {isAr
              ? "أعمق محتوى بحثي حول الذكاء الاصطناعي للشركات السعودية — أدلة معمّقة وتقارير صناعية وأطر استراتيجية."
              : "Saudi Arabia's deepest AI research hub — long-form pillar guides, industry reports, and strategic frameworks for business leaders."}
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/22 text-sm mb-10 max-w-xl mx-auto">
            {isAr
              ? "مُحسَّن لـ Google · ChatGPT · Gemini · Claude · Perplexity · AI Overviews"
              : "Optimised for Google · ChatGPT · Gemini · Claude · Perplexity · AI Overviews"}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { v: "10", l: isAr ? "أدلة تفصيلية" : "Pillar Guides" },
              { v: "10+", l: isAr ? "تصنيفات المحتوى" : "Content Categories" },
              { v: "95+", l: isAr ? "نقاط السلطة" : "Authority Score" },
              { v: "3000+", l: isAr ? "كلمة لكل دليل" : "Words per Guide" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-700 text-white">{s.v}</div>
                <div className="text-white/28 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link href="#pillars">
              <motion.button className="px-7 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "استكشف الأدلة" : "Explore Guides"} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </motion.button>
            </Link>
            <Link href="/resources/downloads">
              <motion.button className="px-7 py-3.5 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Download className="w-4 h-4 inline me-2" />
                {isAr ? "تحميل الموارد" : "Download Resources"}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ FEATURED ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-b border-white/5" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-700">{isAr ? "الأدلة المميزة" : "Featured Guides"}</h2>
              <span className="text-white/28 text-xs">{isAr ? "أعمق محتوى بحثي" : "Deepest research content"}</span>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.slug} variants={fadeUp} custom={i}>
                    <Link href={`/resources/${p.slug}`}>
                      <SpotlightCard glowColor="rgba(255,255,255,0.06)" className="border border-white/8 rounded-3xl hover:border-white/16 transition-all bg-[#050505] cursor-pointer group h-full">
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center"
                              style={{ background: "rgba(255,255,255,0.04)" }}>
                              <Icon className="w-5 h-5 text-white/55" />
                            </div>
                            <span className="text-[10px] font-700 px-2 py-1 rounded-full border border-white/12 text-white/40 uppercase tracking-wider"
                              style={{ background: "rgba(255,255,255,0.03)" }}>
                              {isAr ? "مميز" : "Featured"}
                            </span>
                          </div>
                          <h3 className="text-xl font-700 text-white mb-3 group-hover:text-white/90 transition-colors leading-snug">
                            {isAr ? p.titleAr : p.title}
                          </h3>
                          <div className="flex items-center gap-2 text-white/28 text-xs mt-6">
                            <span>{p.read}</span>
                            <span className="w-px h-3 bg-white/15" />
                            <span>{isAr ? "Electi" : "Electi Research Center"}</span>
                            <span className="ms-auto flex items-center gap-1 text-white/30 group-hover:text-white/55 transition-colors font-600">
                              {isAr ? "اقرأ الدليل" : "Read guide"} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ CATEGORIES + PILLARS ══ */}
      <section id="pillars" className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-700 mb-2">{isAr ? "جميع الأدلة البحثية" : "All Research Guides"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "محتوى معمّق مُحسَّن للبحث الذكي" : "Long-form content optimised for AI-powered search"}</p>
            </motion.div>

            {/* Category filters */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-10">
              {[{ slug: "all", label: "All Topics", labelAr: "كل المواضيع" }, ...CATEGORIES].map((cat) => (
                <Link key={cat.slug} href={`/resources${cat.slug === "all" ? "" : `?cat=${cat.slug}`}`}>
                  <button className="px-4 py-2 rounded-xl text-xs font-600 border transition-all"
                    style={{
                      background: activeCat === cat.slug ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      borderColor: activeCat === cat.slug ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                      color: activeCat === cat.slug ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.38)",
                    }}>
                    {isAr ? (cat as { slug: string; labelAr: string }).labelAr : cat.label}
                  </button>
                </Link>
              ))}
            </motion.div>

            {/* Pillar grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((p, i) => {
                const Icon = p.icon;
                const catInfo = CATEGORIES.find((c) => c.slug === p.cat);
                return (
                  <motion.div key={p.slug} variants={fadeUp} custom={i} layout>
                    <Link href={`/resources/${p.slug}`}>
                      <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="border border-white/7 rounded-2xl hover:border-white/14 transition-all bg-[#050505] cursor-pointer group h-full">
                        <div className="p-6 flex flex-col h-full">
                          <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            <Icon className="w-4 h-4 text-white/50" />
                          </div>
                          <div className="text-[10px] font-700 text-white/28 uppercase tracking-wider mb-2">
                            {isAr ? catInfo?.labelAr : catInfo?.label}
                          </div>
                          <h3 className="font-700 text-white/85 text-base mb-3 group-hover:text-white transition-colors leading-snug flex-1">
                            {isAr ? p.titleAr : p.title}
                          </h3>
                          <div className="flex items-center gap-2 text-white/25 text-xs mt-auto">
                            <span>{p.read}</span>
                            <span className="ms-auto flex items-center gap-1 group-hover:text-white/45 transition-colors font-600">
                              {isAr ? "اقرأ" : "Read"} <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ DOWNLOADS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-700 mb-1">{isAr ? "موارد قابلة للتحميل" : "Downloadable Resources"}</h2>
                <p className="text-white/30 text-sm">{isAr ? "أوراق بحثية وتقارير وأدلة استراتيجية" : "Whitepapers, reports and strategic guides"}</p>
              </div>
              <Link href="/resources/downloads">
                <span className="text-white/38 text-xs font-600 hover:text-white/65 transition-colors flex items-center gap-1">
                  {isAr ? "عرض الكل" : "View all"} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DOWNLOADS.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div key={d.title} variants={fadeUp} custom={i}>
                    <Link href="/resources/downloads">
                      <div className="p-6 rounded-2xl border border-white/7 hover:border-white/14 transition-all cursor-pointer group"
                        style={{ background: "rgba(255,255,255,0.02)" }}>
                        <Icon className="w-5 h-5 text-white/35 mb-4" />
                        <div className="text-[10px] font-700 text-white/28 uppercase tracking-wider mb-2">
                          {isAr ? d.typeAr : d.type}
                        </div>
                        <h3 className="font-600 text-white/75 text-sm leading-snug group-hover:text-white/90 transition-colors">
                          {isAr ? d.titleAr : d.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-4 text-white/25 text-xs group-hover:text-white/45 transition-colors font-600">
                          <Download className="w-3 h-3" /> {isAr ? "تحميل" : "Download"}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ AUTHORITY SCORES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-4xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-2xl font-700 mb-2">{isAr ? "نقاط سلطة المحتوى" : "Content Authority Scores"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "مؤشرات قيادة الفكر في الذكاء الاصطناعي" : "Electi's AI thought leadership indicators"}</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {AUTHORITY_SCORES.map((s, i) => (
                <motion.div key={s.label} variants={fadeUp} custom={i} className="p-5 rounded-2xl border border-white/8 text-center"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="relative inline-block mb-3">
                    <svg className="w-16 h-16" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="4"
                        strokeDasharray={`${(s.value / 100) * 163.4} 163.4`} strokeLinecap="round"
                        transform="rotate(-90 32 32)" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-700 text-white">{s.value}</span>
                    </div>
                  </div>
                  <p className="text-white/35 text-[10px] leading-snug">{isAr ? s.labelAr : s.label}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-center text-white/20 text-xs mt-6">
              {isAr ? "استناداً إلى العمق والسلطة وجاهزية الروابط الخلفية" : "Based on depth, authority, and backlink-readiness metrics"}
            </motion.p>
          </InViewDiv>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </section>
    </div>
  );
}
