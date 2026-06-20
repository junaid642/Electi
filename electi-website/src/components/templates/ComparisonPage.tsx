import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, XCircle, ArrowRight, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

function InViewDiv({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start">
        <span className="font-600 text-white/80 text-sm leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-white/35" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.27 }}>
            <div className="px-6 pb-5 text-white/45 text-sm leading-relaxed border-t border-white/6 pt-4">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface CompareRow {
  feature: string; featureAr?: string;
  ai: boolean | string; aiAr?: string;
  traditional: boolean | string; traditionalAr?: string;
}

export interface ComparisonPageProps {
  badge: string; badgeAr?: string;
  icon: LucideIcon;
  title: string; titleAr?: string;
  subtitle: string; subtitleAr?: string;
  description: string; descriptionAr?: string;
  aiLabel: string; aiLabelAr?: string;
  traditionalLabel: string; traditionalLabelAr?: string;
  heroStats: { value: string; label: string; labelAr?: string }[];
  rows: CompareRow[];
  benefits: { title: string; titleAr?: string; desc: string; descAr?: string }[];
  faqs: { q: string; qAr?: string; a: string; aAr?: string }[];
  ctaTitle: string; ctaTitleAr?: string;
  ctaSub: string; ctaSubAr?: string;
  relatedAgent?: string;
  seoTitle?: string; seoDescription?: string; seoPath?: string;
}

function CellValue({ val, valAr, isAr }: { val: boolean | string; valAr?: string; isAr: boolean }) {
  if (typeof val === "boolean") {
    return val
      ? <CheckCircle className="w-5 h-5 text-white/50 mx-auto" />
      : <XCircle    className="w-5 h-5 text-white/18 mx-auto" />;
  }
  return <span className="text-white/55 text-xs text-center block">{isAr && valAr ? valAr : val}</span>;
}

export default function ComparisonPage({
  badge, badgeAr, icon: BadgeIcon,
  title, titleAr, subtitle, subtitleAr, description, descriptionAr,
  aiLabel, aiLabelAr, traditionalLabel, traditionalLabelAr,
  heroStats, rows, benefits, faqs,
  ctaTitle, ctaTitleAr, ctaSub, ctaSubAr,
  relatedAgent, seoTitle, seoDescription, seoPath,
}: ComparisonPageProps) {
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoTitle ?? title,
    "description": seoDescription ?? description,
    "publisher": { "@type": "Organization", "name": "Electi", "url": "https://electi.sa" },
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SEOHead title={seoTitle} description={seoDescription} path={seoPath} />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(66,133,244,0.06) 0%,transparent 65%)" }} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <BadgeIcon className="w-3 h-3" />{isAr && badgeAr ? badgeAr : badge}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.04] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
            {isAr && titleAr ? titleAr : title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/42 text-base leading-relaxed mb-3 max-w-2xl mx-auto">
            {isAr && subtitleAr ? subtitleAr : subtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/25 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            {isAr && descriptionAr ? descriptionAr : description}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-10">
            {relatedAgent ? (
              <Link href={`/marketplace/${relatedAgent}`}>
                <motion.button className="px-7 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                  style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "استكشف الوكيل الذكي" : "Explore AI Agent"} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </Link>
            ) : (
              <Link href="/marketplace">
                <motion.button className="px-7 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                  style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "استكشف الوكلاء" : "Explore AI Agents"} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </Link>
            )}
            <Link href="/contact">
              <motion.button className="px-7 py-3.5 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "تحدث مع خبير" : "Talk to an Expert"}
              </motion.button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-700 text-white">{s.value}</div>
                <div className="text-white/28 text-xs mt-0.5">{isAr && s.labelAr ? s.labelAr : s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ 2 · COMPARISON TABLE ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex flex-col items-center justify-center" style={{ scrollSnapAlign: "start" }}>
        <div className="w-full max-w-4xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {isAr ? "مقارنة تفصيلية" : "Detailed"} <span style={{ color: "rgba(255,255,255,0.45)" }}>{isAr ? "" : "Comparison"}</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/8 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="p-4 text-white/35 text-xs font-600">{isAr ? "الميزة" : "Feature"}</div>
                <div className="p-4 text-center border-s border-white/8">
                  <span className="text-white/75 text-xs font-700">{isAr && aiLabelAr ? aiLabelAr : aiLabel}</span>
                  <div className="text-white/30 text-[10px] mt-0.5">Electi AI</div>
                </div>
                <div className="p-4 text-center border-s border-white/8">
                  <span className="text-white/40 text-xs font-600">{isAr && traditionalLabelAr ? traditionalLabelAr : traditionalLabel}</span>
                </div>
              </div>
              {rows.map((row, i) => (
                <motion.div key={i} variants={fadeUp} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/[0.015] transition-colors">
                  <div className="p-4 text-white/50 text-xs font-500">{isAr && row.featureAr ? row.featureAr : row.feature}</div>
                  <div className="p-4 border-s border-white/5 flex items-center justify-center">
                    <CellValue val={row.ai} valAr={row.aiAr} isAr={isAr} />
                  </div>
                  <div className="p-4 border-s border-white/5 flex items-center justify-center">
                    <CellValue val={row.traditional} valAr={row.traditionalAr} isAr={isAr} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ 3 · BENEFITS + FAQ ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex flex-col items-center justify-center" style={{ scrollSnapAlign: "start" }}>
        <div className="w-full max-w-5xl mx-auto space-y-16">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-3xl font-700 mb-3">
                {isAr ? "مزايا الذكاء الاصطناعي" : "Why AI Wins"} <span style={{ color: "rgba(255,255,255,0.45)" }}>{isAr ? "" : "Every Time"}</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4 p-5 rounded-2xl border border-white/7"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <CheckCircle className="w-5 h-5 text-white/35 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-700 text-white mb-1">{isAr && b.titleAr ? b.titleAr : b.title}</h4>
                    <p className="text-white/35 text-xs leading-relaxed">{isAr && b.descAr ? b.descAr : b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </InViewDiv>

          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-2xl font-700">{isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}</h2>
            </motion.div>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqs.map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <FaqItem q={isAr && f.qAr ? f.qAr : f.q} a={isAr && f.aAr ? f.aAr : f.a} />
                </motion.div>
              ))}
            </div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ 4 · CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="text-3xl sm:text-4xl font-700 mb-4">{isAr && ctaTitleAr ? ctaTitleAr : ctaTitle}</h2>
              <p className="text-white/38 mb-8 leading-relaxed">{isAr && ctaSubAr ? ctaSubAr : ctaSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://app.electi.sa/login">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all"
                    style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "ابدأ مجاناً" : "Start Free Trial"}
                  </motion.button>
                </a>
                <Link href="/contact">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 border border-white/12 text-white/58 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "تحدث مع المبيعات" : "Talk to Sales"}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
