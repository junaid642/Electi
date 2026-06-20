import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, Clock, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

function InViewSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
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

export interface ArticleSection {
  id:        string;
  heading:   string; headingAr: string;
  paras:     string[]; parasAr: string[];
  stats?:    { value: string; label: string; labelAr: string }[];
  bullets?:  { en: string; ar: string }[];
  quote?:    { text: string; textAr: string; source: string };
}

export interface PillarArticlePageProps {
  category:    string; categoryAr:  string; categorySlug: string;
  title:       string; titleAr:     string;
  subtitle:    string; subtitleAr:  string;
  lead:        string; leadAr:      string;
  readTime:    string;
  publishDate: string;
  wordCount:   number;
  tags:        string[];
  sections:    ArticleSection[];
  faqs:        { q: string; qAr: string; a: string; aAr: string }[];
  relatedAgent?: string;
  relatedAgentLabel?: string; relatedAgentLabelAr?: string;
  seoTitle:       string;
  seoDescription: string;
  seoDescriptionAr?: string;
  seoPath:        string;
}

export default function PillarArticlePage({
  category, categoryAr, categorySlug,
  title, titleAr, subtitle, subtitleAr, lead, leadAr,
  readTime, publishDate, wordCount, tags,
  sections, faqs,
  relatedAgent, relatedAgentLabel, relatedAgentLabelAr,
  seoTitle, seoDescription, seoDescriptionAr, seoPath,
}: PillarArticlePageProps) {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      setNavHidden(st > lastScrollRef.current && st > 80);
      lastScrollRef.current = st;

      if (articleRef.current) {
        const { offsetTop, offsetHeight } = articleRef.current;
        const progress = Math.min(100, Math.max(0, ((st - offsetTop) / offsetHeight) * 100));
        setReadProgress(progress);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type":    "Article",
    "headline": isAr && titleAr ? titleAr : title,
    "description": isAr && seoDescriptionAr ? seoDescriptionAr : seoDescription,
    "datePublished": publishDate,
    "dateModified":  publishDate,
    "author": {
      "@type": "Organization",
      "name":  "Electi Research Center",
      "url":   "https://electi.sa",
    },
    "publisher": {
      "@type": "Organization",
      "name":  "Electi",
      "url":   "https://electi.sa",
      "logo":  { "@type": "ImageObject", "url": "https://electi.sa/electi-logo-new.png" },
    },
    "articleSection": isAr ? categoryAr : category,
    "keywords": tags.join(", "),
    "wordCount": wordCount,
    "inLanguage": isAr ? "ar-SA" : "en-SA",
    "about": { "@type": "Thing", "name": "Artificial Intelligence in Saudi Arabia" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",            "item": "https://electi.sa" },
      { "@type": "ListItem", "position": 2, "name": isAr ? "مركز الموارد" : "Research Center", "item": "https://electi.sa/resources" },
      { "@type": "ListItem", "position": 3, "name": isAr ? categoryAr : category, "item": `https://electi.sa/resources?cat=${categorySlug}` },
      { "@type": "ListItem", "position": 4, "name": isAr ? titleAr : title, "item": `https://electi.sa${seoPath}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type":          "Question",
      "name":           isAr && f.qAr ? f.qAr : f.q,
      "acceptedAnswer": { "@type": "Answer", "text": isAr && f.aAr ? f.aAr : f.a },
    })),
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SEOHead
        title={seoTitle}
        description={isAr && seoDescriptionAr ? seoDescriptionAr : seoDescription}
        path={seoPath}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* Read progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div className="h-full" style={{ width: `${readProgress}%`, background: "rgba(255,255,255,0.4)" }} />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col justify-end overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,6vw,5rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)" }} />
        </div>

        <div className="relative max-w-4xl">
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-white/28 text-xs font-500 mb-6">
              <Link href="/resources" className="hover:text-white/55 transition-colors">
                {isAr ? "مركز الموارد" : "Research Center"}
              </Link>
              <span className="text-white/15">/</span>
              <Link href={`/resources?cat=${categorySlug}`} className="hover:text-white/55 transition-colors">
                {isAr ? categoryAr : category}
              </Link>
              <span className="text-white/15">/</span>
              <span className="text-white/40">{isAr ? titleAr : title}</span>
            </motion.nav>

            {/* Category badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-700 text-white/45 mb-5 uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <BookOpen className="w-3 h-3" />
              {isAr ? categoryAr : category}
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-700 text-white leading-[1.06] mb-4"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              {isAr ? titleAr : title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/48 text-lg leading-relaxed mb-3 max-w-2xl">
              {isAr ? subtitleAr : subtitle}
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/28 text-sm leading-relaxed mb-8 max-w-xl">
              {isAr ? leadAr : lead}
            </motion.p>

            {/* Meta strip */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-white/28 text-xs">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span>{wordCount.toLocaleString()} {isAr ? "كلمة" : "words"}</span>
              <span className="w-px h-3 bg-white/15" />
              <span>{isAr ? "Electi" : "Electi Research Center"}</span>
              <span className="w-px h-3 bg-white/15" />
              <span>{new Date(publishDate).toLocaleDateString(isAr ? "ar-SA" : "en-GB", { year: "numeric", month: "long", day: "numeric" })}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="relative flex flex-wrap gap-2 mt-10">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-600 text-white/30 border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ ARTICLE BODY ══ */}
      <div ref={articleRef}>
        {sections.map((sec, idx) => (
          <section key={sec.id} id={sec.id}
            className="px-4 sm:px-6 lg:px-8 py-20 border-b border-white/5"
            style={{ scrollSnapAlign: "start" }}>
            <div className="max-w-4xl mx-auto">
              <InViewSection>
                <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-700 text-white mb-6">
                  {isAr ? sec.headingAr : sec.heading}
                </motion.h2>

                {/* Paragraphs */}
                <div className="space-y-4 mb-8">
                  {(isAr ? sec.parasAr : sec.paras).map((p, i) => (
                    <motion.p key={i} variants={fadeUp} className="text-white/55 text-base leading-[1.85]">{p}</motion.p>
                  ))}
                </div>

                {/* Stats grid */}
                {sec.stats && sec.stats.length > 0 && (
                  <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
                    {sec.stats.map((s) => (
                      <div key={s.label} className="p-5 rounded-2xl border border-white/8 text-center"
                        style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-2xl font-700 text-white mb-1">{s.value}</div>
                        <div className="text-white/35 text-xs">{isAr ? s.labelAr : s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Bullets */}
                {sec.bullets && sec.bullets.length > 0 && (
                  <motion.ul variants={stagger} className="space-y-3 my-8">
                    {sec.bullets.map((b, i) => (
                      <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-white/55 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0 mt-2" />
                        {isAr ? b.ar : b.en}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* Pull quote */}
                {sec.quote && (
                  <motion.blockquote variants={fadeUp} className="my-10 ps-6 border-s-2 border-white/20">
                    <p className="text-white/60 text-base italic leading-relaxed mb-2">
                      "{isAr ? sec.quote.textAr : sec.quote.text}"
                    </p>
                    <cite className="text-white/28 text-xs not-italic">— {sec.quote.source}</cite>
                  </motion.blockquote>
                )}
              </InViewSection>
            </div>
          </section>
        ))}
      </div>

      {/* ══ FAQ ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-3xl mx-auto">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-700 mb-3">
                {isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <FaqItem q={isAr && f.qAr ? f.qAr : f.q} a={isAr && f.aAr ? f.aAr : f.a} />
                </motion.div>
              ))}
            </div>
          </InViewSection>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="text-3xl font-700 mb-4">
                {isAr ? "هل أنت مستعد لتطبيق الذكاء الاصطناعي في عملك؟" : "Ready to Deploy AI in Your Business?"}
              </h2>
              <p className="text-white/38 mb-8 leading-relaxed">
                {isAr
                  ? "انضم إلى مئات الشركات السعودية التي تُحوّل عملياتها مع Electi."
                  : "Join hundreds of Saudi businesses transforming their operations with Electi AI Agents."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                {relatedAgent ? (
                  <Link href={`/marketplace/${relatedAgent}`}>
                    <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                      style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                      whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                      {isAr && relatedAgentLabelAr ? relatedAgentLabelAr : (relatedAgentLabel ?? "Explore AI Agent")}
                      <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                    </motion.button>
                  </Link>
                ) : (
                  <Link href="/marketplace">
                    <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                      style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                      whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                      {isAr ? "استكشف الوكلاء الذكيين" : "Explore AI Agents"}
                      <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                    </motion.button>
                  </Link>
                )}
                <Link href="/contact">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "تحدث مع خبير" : "Talk to an Expert"}
                  </motion.button>
                </Link>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-white/28 text-xs hover:text-white/55 transition-colors">
                <ExternalLink className="w-3 h-3" />
                {isAr ? "استكشف المزيد من موارد البحث" : "Explore More Research Resources"}
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
