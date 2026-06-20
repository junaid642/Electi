import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Plus, Minus, CheckCircle, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowRule from "@/components/ui/GlowRule";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

/* ── Animation constants — identical to home page ─────────────────────── */
const ease   = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };

/* ── InViewSection — triggers stagger when element enters viewport ─────── */
function InViewSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── SnapSection — full-viewport snap section, same as home page ───────── */
function SnapSection({ children, className = "", id = "" }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </section>
  );
}

/* ── Section badge (same pill style as home page) ─────────────────────── */
function Badge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4">
      <Zap className="w-3 h-3" />
      {label}
    </div>
  );
}

/* ── FAQ accordion item ───────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-start hover:text-white transition-colors"
        aria-expanded={open}
      >
        <span className="font-600 text-white/80 text-sm leading-relaxed">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/12 flex items-center justify-center text-white/40">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
            className="overflow-hidden"
          >
            <p className="text-white/45 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Type definitions ──────────────────────────────────────────────────── */
export interface AuthBenefit   { icon: LucideIcon; title: string; titleAr: string; desc: string; descAr: string; }
export interface AuthStep      { n: string; title: string; titleAr: string; desc: string; descAr: string; }
export interface AuthUseCase   { icon: LucideIcon; label: string; labelAr: string; desc: string; descAr: string; }
export interface AuthFaq       { q: string; qAr: string; a: string; aAr: string; }
export interface AuthIndustry  { name: string; nameAr: string; }
export interface AuthBreadcrumb { label: string; labelAr: string; href: string; }

export interface AuthorityPageProps {
  seoTitle: string;
  seoTitleAr: string;
  seoDescription: string;
  seoDescriptionAr: string;
  seoPath: string;
  seoKeywords?: string;
  seoKeywordsAr?: string;
  schemas?: object[];

  badge: string;
  badgeAr: string;
  h1: string;
  h1Ar: string;
  h1Accent?: string;
  h1AccentAr?: string;
  tagline: string;
  taglineAr: string;
  intro: string;
  introAr: string;

  stats: { value: string; label: string; labelAr: string }[];

  whatTitle: string;
  whatTitleAr: string;
  whatBody: string;
  whatBodyAr: string;

  benefits: AuthBenefit[];
  steps: AuthStep[];
  industries: AuthIndustry[];
  useCases: AuthUseCase[];
  faqs: AuthFaq[];

  breadcrumb?: AuthBreadcrumb[];

  ctaTitle: string;
  ctaTitleAr: string;
  ctaSub: string;
  ctaSubAr: string;
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function AuthorityPage({
  seoTitle, seoTitleAr, seoDescription, seoDescriptionAr, seoPath,
  seoKeywords, seoKeywordsAr, schemas = [],
  badge, badgeAr, h1, h1Ar, h1Accent, h1AccentAr,
  tagline, taglineAr, intro, introAr,
  stats,
  whatTitle, whatTitleAr, whatBody, whatBodyAr,
  benefits, steps, industries, useCases, faqs,
  breadcrumb,
  ctaTitle, ctaTitleAr, ctaSub, ctaSubAr,
}: AuthorityPageProps) {
  const { isAr } = useLang();
  const tr = <E extends string, A extends string>(en: E, ar: A) => isAr ? ar : en;

  /* ── Snap-scroll container + navbar state (mirrors home page) ─────── */
  const scrollRef      = useRef<HTMLDivElement>(null);
  const lastScrollRef  = useRef(0);
  const [navHidden,    setNavHidden]    = useState(false);
  const [navScrolled,  setNavScrolled]  = useState(false);

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

  const crumbs = breadcrumb ?? [
    { label: "Home",  labelAr: "الرئيسية", href: "/" },
    { label: badge,   labelAr: badgeAr,     href: seoPath },
  ];

  return (
    /* ── Snap scroll container — exact same config as home.tsx ──────── */
    <div
      ref={scrollRef}
      className="bg-[#050505] text-white"
      style={{
        height: "100dvh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
      }}
    >
      <style>{`div::-webkit-scrollbar{display:none}`}</style>

      <SEOHead
        title={seoTitle} titleAr={seoTitleAr}
        description={seoDescription} descriptionAr={seoDescriptionAr}
        path={seoPath} schemas={schemas}
        keywords={seoKeywords} keywordsAr={seoKeywordsAr}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: "100dvh",
          scrollSnapAlign: "start",
          paddingTop: 96,
          paddingBottom: 64,
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
        }}
        aria-labelledby="authority-h1"
      >
        {/* Background: grid + radial glows (same as home hero) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(66,133,244,0.07) 0%,transparent 65%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 65%)" }} />
        </div>

        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="relative max-w-3xl"
        >
          {/* Breadcrumb */}
          <motion.nav variants={fadeUp} aria-label="breadcrumb" className="flex items-center gap-2 mb-6 flex-wrap">
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className={`w-3 h-3 text-white/15 ${isAr ? "rotate-180" : ""}`} />}
                {i < crumbs.length - 1 ? (
                  <Link href={crumb.href}>
                    <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">
                      {tr(crumb.label, crumb.labelAr)}
                    </span>
                  </Link>
                ) : (
                  <span className="text-white/40 text-xs" aria-current="page">
                    {tr(crumb.label, crumb.labelAr)}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Badge */}
          <motion.div variants={fadeUp}>
            <Badge label={tr(badge, badgeAr)} />
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="authority-h1"
            variants={fadeUp}
            className="font-700 leading-[1.07] tracking-[-0.025em] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
          >
            {tr(h1, h1Ar)}
            {(h1Accent || h1AccentAr) && (
              <>
                {" "}
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  {tr(h1Accent ?? "", h1AccentAr ?? "")}
                </span>
              </>
            )}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className={`text-white/50 text-lg leading-relaxed mb-3 max-w-2xl font-500 ${!isAr ? "lg:whitespace-nowrap" : ""}`}
          >
            {tr(tagline, taglineAr)}
          </motion.p>

          {/* Intro */}
          <motion.p variants={fadeUp} className="text-white/30 text-sm leading-relaxed mb-10 max-w-xl">
            {tr(intro, introAr)}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
            <a href="https://app.electi.sa/login">
              <motion.button
                className="px-6 py-3 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                style={{ boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              >
                {tr("Get Started Free", "ابدأ مجاناً")}
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </motion.button>
            </a>
            <Link href="/contact">
              <motion.button
                className="px-6 py-3 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                {tr("Book a Demo", "احجز عرضاً")}
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-700 text-white">{s.value}</div>
                <div className="text-white/28 text-xs mt-0.5">{tr(s.label, s.labelAr)}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }} />
      </section>

      {/* ══ 2 · WHAT IS IT + HOW IT WORKS ════════════════════════════════ */}
      <SnapSection>
        <div className="w-full max-w-6xl mx-auto">
          <InViewSection>
            {/* What is it */}
            <motion.div variants={fadeUp} className="text-center mb-12">
              <Badge label={tr("Overview", "نظرة عامة")} />
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">{tr(whatTitle, whatTitleAr)}</h2>
              <GlowRule />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/8 p-6 sm:p-10 mb-14"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                {tr(whatBody, whatBodyAr)}
              </p>
            </motion.div>

            {/* How it works steps */}
            <motion.div variants={fadeUp} className="text-center mb-8">
              <Badge label={tr("How It Works", "كيف يعمل")} />
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">
                {tr("Up & Running in ", "جاهز في ")}
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Minutes", "دقائق")}</span>
              </h2>
              <GlowRule />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <motion.div key={step.n} variants={fadeUp} custom={i}>
                  <div
                    className="rounded-2xl p-5 border border-white/7 hover:border-white/14 transition-colors h-full"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <span className="text-white/50 font-700 text-xs">{step.n}</span>
                    </div>
                    <h3 className="font-700 text-white text-sm mb-2">{tr(step.title, step.titleAr)}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{tr(step.desc, step.descAr)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 3 · KEY BENEFITS ════════════════════════════════════════════════ */}
      <SnapSection>
        <div className="w-full max-w-6xl mx-auto">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <Badge label={tr("Why Electi", "لماذا إليكتي")} />
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {tr("Key ", "الفوائد ")}
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Benefits", "الرئيسية")}</span>
              </h2>
              <GlowRule />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title} variants={fadeUp} custom={i}
                    className="rounded-2xl border border-white/8 p-6 hover:border-white/14 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                    whileHover={{ y: -4 }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <Icon className="w-5 h-5 text-white/55" />
                    </div>
                    <h3 className="font-700 text-white mb-2 text-sm">{tr(b.title, b.titleAr)}</h3>
                    <p className="text-white/38 text-xs leading-relaxed">{tr(b.desc, b.descAr)}</p>
                  </motion.div>
                );
              })}
            </div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 4 · USE CASES + INDUSTRIES ══════════════════════════════════════ */}
      <SnapSection>
        <div className="w-full max-w-6xl mx-auto">
          <InViewSection>
            {/* Use Cases */}
            <motion.div variants={fadeUp} className="text-center mb-10">
              <Badge label={tr("Applications", "التطبيقات")} />
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {tr("Use ", "حالات ")}
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Cases", "الاستخدام")}</span>
              </h2>
              <GlowRule />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {useCases.map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <motion.div
                    key={uc.label} variants={fadeUp} custom={i}
                    className="rounded-2xl border border-white/7 p-5 flex items-start gap-4 hover:border-white/14 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <Icon className="w-4.5 h-4.5 text-white/45" />
                    </div>
                    <div>
                      <h4 className="font-700 text-white text-sm mb-1.5">{tr(uc.label, uc.labelAr)}</h4>
                      <p className="text-white/35 text-xs leading-relaxed">{tr(uc.desc, uc.descAr)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Industries */}
            {industries.length > 0 && (
              <>
                <motion.div variants={fadeUp} className="text-center mb-6">
                  <h3 className="text-xl font-700 text-white/80 mb-3">{tr("Industries We Serve", "الصناعات التي نخدمها")}</h3>
                  <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5">
                  {industries.map((ind) => (
                    <span
                      key={ind.name}
                      className="px-4 py-2 rounded-xl border border-white/8 text-white/45 text-xs font-500 hover:border-white/16 hover:text-white/70 transition-all cursor-default"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      {tr(ind.name, ind.nameAr)}
                    </span>
                  ))}
                </motion.div>
              </>
            )}
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 5 · FAQs ════════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <SnapSection>
          <div className="w-full max-w-3xl mx-auto">
            <InViewSection>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <Badge label="FAQ" />
                <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                  {tr("Frequently Asked ", "الأسئلة ")}
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{tr("Questions", "الشائعة")}</span>
                </h2>
                <GlowRule />
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-white/8 px-6 sm:px-8"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {faqs.map((faq) => (
                  <FaqItem
                    key={faq.q}
                    q={tr(faq.q, faq.qAr)}
                    a={tr(faq.a, faq.aAr)}
                  />
                ))}
              </motion.div>
            </InViewSection>
          </div>
        </SnapSection>
      )}

      {/* ══ 6 · TRUST + CTA + FOOTER ════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start" }}>
        {/* Trust strip */}
        <div className="py-10 px-4 border-t border-white/5 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <InViewSection className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { en: "Bilingual AI — Arabic & English", ar: "ذكاء اصطناعي ثنائي اللغة — عربي وإنجليزي" },
                { en: "WhatsApp-Native Integration",     ar: "تكامل أصلي مع واتساب" },
                { en: "Based in Riyadh, KSA",            ar: "مقرها الرياض، المملكة العربية السعودية" },
                { en: "ISO-grade Data Security",         ar: "أمان بيانات على مستوى ISO" },
                { en: "24/7 AI Operations",              ar: "عمليات ذكاء اصطناعي على مدار الساعة" },
              ].map((item) => (
                <motion.div key={item.en} variants={fadeUp} className="flex items-center gap-2 text-white/32 text-sm">
                  <CheckCircle className="w-4 h-4 text-white/22 flex-shrink-0" />
                  {tr(item.en, item.ar)}
                </motion.div>
              ))}
            </InViewSection>
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
          </div>
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="text-3xl sm:text-4xl font-700 mb-4">{tr(ctaTitle, ctaTitleAr)}</h2>
              <p className="text-white/38 mb-8 leading-relaxed text-sm">{tr(ctaSub, ctaSubAr)}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://app.electi.sa/login">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all"
                    style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  >
                    {tr("Start Free — No Credit Card", "ابدأ مجاناً — بدون بطاقة ائتمان")}
                  </motion.button>
                </a>
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  >
                    {tr("Talk to Sales", "تحدث مع فريق المبيعات")}
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
