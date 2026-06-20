import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ChevronRight, ChevronDown, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLang } from "@/contexts/LanguageContext";
import SEOHead from "@/components/seo/SEOHead";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };

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

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export interface MPFeature  { icon: LucideIcon; title: string; desc: string; }
export interface MPUseCase  { label: string; desc: string; icon: LucideIcon; }
export interface MPBenefit  { title: string; desc: string; }
export interface MPFaq      { q: string; a: string; }

export interface MarketplacePageProps {
  badge:        string;
  badgeAr?:     string;
  icon:         LucideIcon;
  title:        string;
  titleAr?:     string;
  titleAccent?: string;
  tagline:      string;
  taglineAr?:   string;
  description:  string;
  descriptionAr?: string;
  heroStats:    { value: string; label: string; labelAr?: string }[];
  features:     MPFeature[];
  featuresAr?:  MPFeature[];
  useCases:     MPUseCase[];
  useCasesAr?:  MPUseCase[];
  industries:   string[];
  industriesAr?: string[];
  benefits:     MPBenefit[];
  benefitsAr?:  MPBenefit[];
  faqs:         MPFaq[];
  faqsAr?:      MPFaq[];
  ctaTitle:     string;
  ctaTitleAr?:  string;
  ctaSub:       string;
  ctaSubAr?:    string;
  seoTitle?:    string;
  seoDescription?: string;
  seoPath?:     string;
  schemaType?:  string;
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
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
            <div className="px-6 pb-5 text-white/45 text-sm leading-relaxed border-t border-white/6 pt-4">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MarketplacePage({
  badge, badgeAr, icon: BadgeIcon, title, titleAr, titleAccent,
  tagline, taglineAr, description, descriptionAr,
  heroStats, features, featuresAr, useCases, useCasesAr,
  industries, industriesAr, benefits, benefitsAr,
  faqs, faqsAr, ctaTitle, ctaTitleAr, ctaSub, ctaSubAr,
  seoTitle, seoDescription, seoPath, schemaType = "Service",
}: MarketplacePageProps) {
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

  const activeFeatures  = (isAr && featuresAr)  ? featuresAr  : features;
  const activeUseCases  = (isAr && useCasesAr)  ? useCasesAr  : useCases;
  const activeIndustries = (isAr && industriesAr) ? industriesAr : industries;
  const activeBenefits  = (isAr && benefitsAr)  ? benefitsAr  : benefits;
  const activeFaqs      = (isAr && faqsAr)      ? faqsAr      : faqs;

  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": seoTitle ?? title,
    "description": seoDescription ?? description,
    "provider": {
      "@type": "Organization",
      "name": "Electi",
      "url": "https://electi.sa",
    },
    "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
    "availableLanguage": ["Arabic", "English"],
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SEOHead title={seoTitle} description={seoDescription} path={seoPath} />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex items-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 40px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(66,133,244,0.07) 0%,transparent 65%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
              <Link href="/marketplace">
                <span className="text-white/25 text-sm hover:text-white/50 transition-colors cursor-pointer">
                  {isAr ? "السوق" : "Marketplace"}
                </span>
              </Link>
              <ChevronRight className={`w-3.5 h-3.5 text-white/15 ${isAr ? "rotate-180" : ""}`} />
              <span className="text-white/45 text-sm">{isAr && badgeAr ? badgeAr : badge}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <BadgeIcon className="w-3 h-3" />{isAr && badgeAr ? badgeAr : badge}
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-700 leading-[1.04] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}>
              {isAr && titleAr ? titleAr : title}
              {titleAccent && (<><br /><span style={{ color: "rgba(255,255,255,0.55)" }}>{titleAccent}</span></>)}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/42 text-base leading-relaxed mb-3 max-w-md font-500">
              {isAr && taglineAr ? taglineAr : tagline}
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/32 text-sm leading-relaxed mb-8 max-w-md">
              {isAr && descriptionAr ? descriptionAr : description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-9">
              <a href="https://app.electi.sa/login">
                <motion.button className="px-6 py-3 rounded-xl font-600 bg-white text-black transition-all flex items-center gap-2"
                  style={{ boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "ابدأ الآن" : "Get Started"} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </a>
              <Link href="/contact">
                <motion.button className="px-6 py-3 rounded-xl font-600 border border-white/12 text-white/58 hover:text-white hover:border-white/22 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "احجز عرضاً" : "Book a Demo"}
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-7">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-700 text-white">{s.value}</div>
                  <div className="text-white/28 text-xs mt-0.5">{isAr && s.labelAr ? s.labelAr : s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: stats panel */}
          <motion.div initial={{ opacity: 0, x: isAr ? -50 : 50, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease }} className="relative hidden lg:block">
            <div className="rounded-3xl border border-white/8 p-8" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  <BadgeIcon className="w-5 h-5 text-white/55" />
                </div>
                <div>
                  <div className="font-700 text-white text-sm">{isAr && badgeAr ? badgeAr : badge}</div>
                  <div className="text-white/30 text-xs">{isAr ? "مدعوم بالذكاء الاصطناعي" : "AI-Powered"}</div>
                </div>
                <div className="ms-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/35 text-xs">{isAr ? "نشط" : "Active"}</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {activeBenefits.slice(0, 4).map((b) => (
                  <div key={b.title} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <CheckCircle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white/70 text-xs font-600">{b.title}</div>
                      <div className="text-white/30 text-[11px] mt-0.5 leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {heroStats.slice(0, 4).map((s) => (
                  <div key={s.label} className="p-3 rounded-xl border border-white/5 text-center"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="text-xl font-700 text-white">{s.value}</div>
                    <div className="text-white/30 text-[10px] mt-0.5">{isAr && s.labelAr ? s.labelAr : s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ 2 · FEATURES ══ */}
      <SnapSection>
        <div className="w-full max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {isAr ? "كل ما تحتاجه" : "Everything You"} <span style={{ color: "rgba(255,255,255,0.55)" }}>{isAr ? "" : "Need"}</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
              <p className="text-white/35 max-w-sm mx-auto text-sm leading-relaxed mt-3">
                {isAr ? "قدرات ذكاء اصطناعي متكاملة مصممة لتحويل أعمالك" : "Comprehensive AI capabilities designed to transform your business operations."}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={i} variants={fadeUp} custom={i}>
                    <SpotlightCard glowColor="rgba(255,255,255,0.06)" className="border border-white/8 rounded-2xl h-full hover:border-white/14 transition-all bg-[#050505]">
                      <div className="p-6 h-full flex flex-col">
                        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center mb-4 flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.04)" }}>
                          <Icon className="w-5 h-5 text-white/60" />
                        </div>
                        <h3 className="font-700 text-white mb-2">{f.title}</h3>
                        <p className="text-white/38 text-sm leading-relaxed flex-1">{f.desc}</p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </SnapSection>

      {/* ══ 3 · USE CASES + INDUSTRIES ══ */}
      <SnapSection>
        <div className="w-full max-w-7xl mx-auto space-y-16">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {isAr ? "حالات الاستخدام" : "Use Cases"}
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeUseCases.map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <motion.div key={i} variants={fadeUp} custom={i}>
                    <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="rounded-xl border border-white/7 hover:border-white/13 transition-all h-full bg-[#050505]">
                      <div className="p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.04)" }}>
                          <Icon className="w-5 h-5 text-white/45" />
                        </div>
                        <div>
                          <h4 className="font-700 text-white mb-1.5">{uc.label}</h4>
                          <p className="text-white/35 text-xs leading-relaxed">{uc.desc}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>

          {/* Industries */}
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-6">
              <h3 className="text-xl font-700 text-white/70">
                {isAr ? "القطاعات المدعومة" : "Industries Served"}
              </h3>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5">
              {activeIndustries.map((ind) => (
                <span key={ind} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/8 text-white/42 text-sm font-500 hover:border-white/16 hover:text-white/65 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <Building2 className="w-3.5 h-3.5" />{ind}
                </span>
              ))}
            </motion.div>
          </InViewDiv>
        </div>
      </SnapSection>

      {/* ══ 4 · FAQ ══ */}
      <SnapSection>
        <div className="w-full max-w-3xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                {isAr ? "الأسئلة الشائعة" : "Frequently Asked"} <span style={{ color: "rgba(255,255,255,0.55)" }}>{isAr ? "" : "Questions"}</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="space-y-3">
              {activeFaqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <FaqItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </InViewDiv>
        </div>
      </SnapSection>

      {/* ══ 5 · CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="text-3xl sm:text-4xl font-700 mb-4">
                {isAr && ctaTitleAr ? ctaTitleAr : ctaTitle}
              </h2>
              <p className="text-white/38 mb-8 leading-relaxed">
                {isAr && ctaSubAr ? ctaSubAr : ctaSub}
              </p>
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
