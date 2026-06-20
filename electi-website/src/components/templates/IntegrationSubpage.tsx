import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Shield, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { getIntegration } from "@/data/integrations";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const CAT_COLORS: Record<string, string> = {
  "ai-model":      "rgba(66,133,244,0.12)",
  "communication": "rgba(52,168,83,0.10)",
  "crm":           "rgba(251,188,4,0.10)",
  "erp":           "rgba(234,67,53,0.10)",
  "ecommerce":     "rgba(156,39,176,0.10)",
  "productivity":  "rgba(0,172,193,0.10)",
};

export default function IntegrationSubpage({ slug }: { slug: string }) {
  const { isAr } = useLang();
  const data = getIntegration(slug);

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

  if (!data) {
    return (
      <div className="bg-[#050505] text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Integration not found</p>
          <Link href="/integrations"><span className="text-white/60 underline cursor-pointer">← Back to Integrations</span></Link>
        </div>
      </div>
    );
  }

  const name    = isAr ? data.nameAr    : data.name;
  const tagline = isAr ? data.taglineAr : data.tagline;
  const desc    = isAr ? data.descAr    : data.desc;
  const catLabel = isAr ? data.categoryLabelAr : data.categoryLabel;
  const accentBg = CAT_COLORS[data.category] || "rgba(255,255,255,0.04)";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Electi Integration with ${data.name}`,
    "description": data.desc,
    "provider": {
      "@type": "Organization",
      "name": "Electi",
      "url": "https://electi.sa",
    },
    "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
    "url": `https://electi.sa/integrations/${data.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://electi.sa/" },
      { "@type": "ListItem", "position": 2, "name": "Integrations", "item": "https://electi.sa/integrations" },
      { "@type": "ListItem", "position": 3, "name": data.name, "item": `https://electi.sa/integrations/${data.slug}` },
    ],
  };

  const faqSchema = data.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  } : null;

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title={`${data.name} Integration | Electi — AI Agents for Saudi Businesses`}
        titleAr={`تكامل ${data.nameAr} | Electi — وكلاء الذكاء الاصطناعي للشركات السعودية`}
        description={data.desc}
        descriptionAr={data.descAr}
        path={`/integrations/${data.slug}`}
        schemas={[serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
        keywords={`Electi ${data.name} integration, AI agent ${data.name} Saudi Arabia, ${data.name} AI automation`}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accentBg}, transparent)` }} />

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}
            className="flex items-center gap-2 mb-8">
            <Link href="/integrations">
              <span className="flex items-center gap-1.5 text-white/30 hover:text-white/55 text-xs cursor-pointer transition-colors">
                <ArrowLeft className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                {isAr ? "جميع التكاملات" : "All Integrations"}
              </span>
            </Link>
            <span className="text-white/15">/</span>
            <span className="text-[10px] font-600 text-white/25 px-2 py-0.5 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              {catLabel}
            </span>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Logo circle */}
            <motion.div variants={fadeUp} className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center flex-shrink-0 font-700 text-white/60 text-lg"
                style={{ background: `rgba(255,255,255,0.05)`, letterSpacing: "0.01em" }}>
                {data.logoLetter}
              </div>
              <div>
                <h1 className="font-700 text-2xl sm:text-3xl text-white leading-tight">{name}</h1>
                <div className="text-white/30 text-xs mt-0.5">{isAr ? "تكامل Electi مع" : "Electi Integration"}</div>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/55 text-xl sm:text-2xl font-500 leading-snug mb-4 max-w-3xl">
              {tagline}
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/35 text-base leading-relaxed mb-10 max-w-2xl">
              {desc}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="mailto:mohammed@electi.sa?subject=Integration Inquiry">
                <motion.button className="px-7 py-3 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "ابدأ التكامل" : "Get Started"}
                </motion.button>
              </a>
              <Link href="/contact">
                <motion.button className="px-7 py-3 rounded-xl border border-white/10 text-white/45 text-sm font-600 hover:text-white/60 hover:border-white/18 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "تحدّث مع فريقنا" : "Talk to Our Team"}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ USE CASES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">
                {isAr ? `حالات استخدام ${data.nameAr}` : `${data.name} Use Cases`}
              </h2>
              <p className="text-white/28 text-sm">{isAr ? "كيف تستخدم الشركات السعودية هذا التكامل" : "How Saudi businesses use this integration"}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.useCases.map((uc, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="rounded-2xl border border-white/7 p-7 hover:border-white/12 transition-all"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center mb-4"
                    style={{ background: "rgba(255,255,255,0.04)", fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <h3 className="font-700 text-white/80 mb-2">{isAr ? uc.titleAr : uc.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{isAr ? uc.descAr : uc.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES + SECURITY ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/7 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="font-700 text-white/80 mb-6">{isAr ? "الميزات المدعومة" : "Supported Features"}</h2>
              <ul className="space-y-3">
                {data.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                    <span className="text-white/45 text-sm">{isAr ? f.ar : f.en}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/7 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-white/35" />
                <h2 className="font-700 text-white/80">{isAr ? "الاعتبارات الأمنية" : "Security Considerations"}</h2>
              </div>
              <p className="text-white/38 text-sm leading-relaxed mb-5">{isAr ? data.securityAr : data.security}</p>
              <Link href="/security">
                <span className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/50 text-xs cursor-pointer transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  {isAr ? "عرض سياسة الأمان الكاملة" : "View full security policy"}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      {data.faqs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl font-700 mb-2">{isAr ? `الأسئلة الشائعة — ${data.nameAr}` : `${data.name} FAQ`}</h2>
            </motion.div>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/7 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-600 text-white/75 text-sm">{isAr ? faq.qAr : faq.q}</span>
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
      )}

      {/* ══ CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-700 mb-4">
              {isAr ? `ابدأ تكامل ${data.nameAr}` : `Start Your ${data.name} Integration`}
            </h2>
            <p className="text-white/30 text-sm mb-6 max-w-lg mx-auto">
              {isAr
                ? "تواصل مع فريق Electi لمناقشة متطلبات التكامل والجداول الزمنية وخيارات المؤسسات."
                : "Contact Electi to discuss integration requirements, timelines, and enterprise options."}
            </p>
            <a href={`mailto:mohammed@electi.sa?subject=${encodeURIComponent(data.name + " Integration Inquiry")}`}>
              <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "تواصل مع فريق التكامل" : "Contact Integration Team"}
              </motion.button>
            </a>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
