import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, Lightbulb, Cpu } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { getCaseStudy } from "@/data/casestudies";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

export default function CaseStudySubpage({ slug }: { slug: string }) {
  const { isAr } = useLang();
  const data = getCaseStudy(slug);
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
          <p className="text-white/40 mb-4">Case study not found</p>
          <Link href="/case-studies"><span className="text-white/60 underline cursor-pointer">← Back</span></Link>
        </div>
      </div>
    );
  }

  const title     = isAr ? data.titleAr     : data.title;
  const tagline   = isAr ? data.taglineAr   : data.tagline;
  const category  = isAr ? data.categoryAr  : data.category;
  const bizType   = isAr ? data.businessTypeAr : data.businessType;
  const industry  = isAr ? data.industryTypeAr : data.industryType;

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.tagline,
    "author": { "@type": "Organization", "name": "Electi", "url": "https://electi.sa" },
    "publisher": { "@type": "Organization", "name": "Electi", "url": "https://electi.sa" },
    "url": `https://electi.sa/case-studies/${data.slug}`,
    "about": { "@type": "Service", "name": data.category, "provider": { "@type": "Organization", "name": "Electi" } },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://electi.sa/" },
      { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://electi.sa/case-studies" },
      { "@type": "ListItem", "position": 3, "name": data.title,     "item": `https://electi.sa/case-studies/${data.slug}` },
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
        title={`${data.title} | Electi — AI Use Case`}
        titleAr={`${data.titleAr} | Electi — حالة استخدام الذكاء الاصطناعي`}
        description={data.tagline}
        descriptionAr={data.taglineAr}
        path={`/case-studies/${data.slug}`}
        schemas={[caseStudySchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
        keywords={`${data.category} Saudi Arabia, Electi ${data.category}, AI agent ${data.industryType}, WhatsApp AI Saudi Arabia`}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(255,255,255,0.04), transparent)" }} />

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}
            className="flex items-center gap-2 mb-8">
            <Link href="/case-studies">
              <span className="flex items-center gap-1.5 text-white/30 hover:text-white/55 text-xs cursor-pointer transition-colors">
                <ArrowLeft className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                {isAr ? "حالات الاستخدام" : "Case Studies"}
              </span>
            </Link>
            <span className="text-white/15">/</span>
            <span className="text-[10px] font-600 text-white/25 px-2 py-0.5 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}>{category}</span>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* "Example Use Case" badge — clearly labelled, as required */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 text-[11px] font-600 text-amber-400/70 mb-6"
              style={{ background: "rgba(245,158,11,0.06)" }}>
              <Lightbulb className="w-3 h-3" />
              {isAr ? "حالة استخدام مثالية — ليست مشروعاً حقيقياً لعميل" : "Example Use Case — Not a Real Client Project"}
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              {title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/45 text-lg sm:text-xl leading-relaxed mb-6 max-w-3xl">
              {tagline}
            </motion.p>

            {/* Meta row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {[
                { label: isAr ? "القطاع" : "Industry",       value: industry },
                { label: isAr ? "نوع الأعمال" : "Business",  value: bizType },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/7 px-4 py-2.5"
                  style={{ background: "rgba(255,255,255,0.025)" }}>
                  <div className="text-[9px] font-700 text-white/20 uppercase tracking-wider mb-0.5">{item.label}</div>
                  <div className="text-white/50 text-xs">{item.value}</div>
                </div>
              ))}
              <div className="rounded-xl border border-white/7 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.025)" }}>
                <div className="text-[9px] font-700 text-white/20 uppercase tracking-wider mb-0.5">
                  {isAr ? "الوكلاء المستخدَمون" : "Agents Used"}
                </div>
                <div className="text-white/50 text-xs">
                  {(isAr ? data.agentsAr : data.agents).join(", ")}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="mailto:mohammed@electi.sa?subject=Implementation Inquiry">
                <motion.button className="px-7 py-3 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "ناقش هذا الحل" : "Discuss This Solution"}
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ CHALLENGE + SOLUTION ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenge */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/7 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-4 h-4 text-white/30" />
                <h2 className="font-700 text-white/75">{isAr ? "التحدي التجاري" : "Business Challenge"}</h2>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5">{isAr ? data.challengeAr : data.challenge}</p>
              <ul className="space-y-2.5">
                {data.challengePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/32">
                    <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 mt-1.5" />
                    {isAr ? pt.ar : pt.en}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/7 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-4 h-4 text-white/30" />
                <h2 className="font-700 text-white/75">{isAr ? "حل Electi" : "Electi Solution"}</h2>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5">{isAr ? data.solutionAr : data.solution}</p>
              <ul className="space-y-2.5">
                {data.solutionPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/32">
                    <CheckCircle className="w-3 h-3 text-white/25 flex-shrink-0 mt-0.5" />
                    {isAr ? pt.ar : pt.en}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGIES USED ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-white/30" />
              <h2 className="text-xl font-700">{isAr ? "التقنيات المستخدَمة" : "Technologies Used"}</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.technologies.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/7 p-5 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="font-700 text-white/65 text-sm mb-1.5">{isAr ? tech.nameAr : tech.name}</div>
                <p className="text-white/28 text-xs leading-relaxed">{isAr ? tech.descAr : tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMPLEMENTATION PROCESS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl font-700">{isAr ? "عملية التنفيذ" : "Implementation Process"}</h2>
            <p className="text-white/25 text-xs mt-2">{isAr ? "الخطوات النموذجية من الإعداد إلى الإطلاق" : "Typical steps from onboarding to go-live"}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.implementation.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/7 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="text-white/15 font-700 text-2xl mb-3">{step.step}</div>
                <h3 className="font-700 text-white/70 mb-2 text-sm">{isAr ? step.titleAr : step.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{isAr ? step.descAr : step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPECTED OUTCOMES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl font-700 mb-2">{isAr ? "النتائج المتوقعة" : "Expected Outcomes"}</h2>
            <p className="text-white/22 text-xs">
              {isAr ? "النتائج النموذجية للشركات في هذه الفئة — ليست نتائج عميل مُتحقَّق منها" : "Typical outcomes for businesses in this category — not verified client results"}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {data.outcomes.map((outcome, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/7 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,0.04)", fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>
                  {i + 1}
                </div>
                <h3 className="font-700 text-white/70 mb-2 text-sm">{isAr ? outcome.titleAr : outcome.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{isAr ? outcome.descAr : outcome.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      {data.faqs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-xl font-700">{isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
            </motion.div>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-xl border border-white/7 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-600 text-white/70 text-sm">{isAr ? faq.qAr : faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="text-white/30 flex-shrink-0 text-lg leading-none">+</motion.span>
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease }} style={{ overflow: "hidden" }}>
                    <p className="px-6 pb-5 text-white/35 text-sm leading-relaxed">{isAr ? faq.aAr : faq.a}</p>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 text-[11px] font-600 text-amber-400/55 mb-6"
              style={{ background: "rgba(245,158,11,0.04)" }}>
              <Lightbulb className="w-3 h-3" />
              {isAr ? "هذا سيناريو استخدام مثالي" : "This is an example use-case scenario"}
            </div>
            <h2 className="text-2xl font-700 mb-4">
              {isAr ? "هل يناسب هذا عملك؟" : "Does This Fit Your Business?"}
            </h2>
            <p className="text-white/28 text-sm mb-6 max-w-lg mx-auto">
              {isAr
                ? "تواصل مع فريق Electi لمناقشة كيف يمكن لسيناريو مشابه تصميمه لاحتياجات عملك المحددة في المملكة العربية السعودية."
                : "Contact Electi to discuss how a similar scenario could be designed for your specific business needs in Saudi Arabia."}
            </p>
            <a href={`mailto:mohammed@electi.sa?subject=${encodeURIComponent(data.category + " Implementation Inquiry")}`}>
              <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "تحدّث مع فريقنا" : "Talk to Our Team"}
              </motion.button>
            </a>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
