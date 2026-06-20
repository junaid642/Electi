import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CheckCircle, Building2, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { getCityPage } from "@/data/cityPages";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

export default function CityAuthorityPage({ slug }: { slug: string }) {
  const { isAr } = useLang();
  const data = getCityPage(slug);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);

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
          <p className="text-white/40 mb-4">Page not found</p>
          <Link href="/"><span className="text-white/60 underline cursor-pointer">← Home</span></Link>
        </div>
      </div>
    );
  }

  const city    = isAr ? data.cityAr    : data.city;
  const service = isAr ? data.serviceAr : data.service;
  const hero    = isAr ? data.heroTitleAr   : data.heroTitle;
  const heroSub = isAr ? data.heroSubAr     : data.heroSub;
  const overview       = isAr ? data.overviewAr      : data.overview;
  const localContext   = isAr ? data.localContextAr  : data.localContext;

  /* ── JSON-LD Schemas ── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://electi.sa/${data.slug}`,
    "name": "Electi",
    "description": data.metaDesc,
    "url": `https://electi.sa/${data.slug}`,
    "telephone": "+966502547274",
    "email": "mohammed@electi.sa",
    "image": "https://electi.sa/og-image.jpg",
    "address": data.citySlug === "riyadh" ? {
      "@type": "PostalAddress",
      "streetAddress": "2413 Ad Damman Road, Ghirnath District, Unit No 2414",
      "addressLocality": "Riyadh",
      "postalCode": "13242-7933",
      "addressCountry": "SA",
    } : {
      "@type": "PostalAddress",
      "streetAddress": "2413 Ad Damman Road, Ghirnath District, Unit No 2414",
      "addressLocality": "Riyadh",
      "postalCode": "13242-7933",
      "addressCountry": "SA",
    },
    "geo": data.citySlug === "riyadh" ? {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753,
    } : {
      "@type": "GeoCoordinates",
      "latitude": 21.5433,
      "longitude": 39.1728,
    },
    "areaServed": [
      { "@type": "City", "name": data.city, "addressCountry": "SA" },
      { "@type": "Country", "name": "Saudi Arabia" },
    ],
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "knowsLanguage": ["ar", "en"],
    "sameAs": ["https://electi.sa"],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${data.service} in ${data.city}`,
    "description": data.metaDesc,
    "provider": {
      "@type": "Organization",
      "name": "Electi",
      "url": "https://electi.sa",
    },
    "areaServed": { "@type": "City", "name": data.city, "addressCountry": "SA" },
    "serviceType": data.service,
    "url": `https://electi.sa/${data.slug}`,
    "availableLanguage": [
      { "@type": "Language", "name": "Arabic" },
      { "@type": "Language", "name": "English" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://electi.sa/" },
      { "@type": "ListItem", "position": 2, "name": data.service, "item": `https://electi.sa/${data.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
    "inLanguage": ["ar", "en"],
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title={isAr ? data.metaTitleAr : data.metaTitle}
        titleAr={data.metaTitleAr}
        description={isAr ? data.metaDescAr : data.metaDesc}
        descriptionAr={data.metaDescAr}
        path={`/${data.slug}`}
        keywords={`${data.keywords}, ${data.keywordsAr}`}
        schemas={[localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.035), transparent)" }} />

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Location badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-600 text-white/40 mb-6"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <MapPin className="w-3 h-3" />
            {city} · {isAr ? "المملكة العربية السعودية" : "Saudi Arabia"}
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              {hero}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/40 text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl">
              {heroSub}
            </motion.p>

            {/* Keyword pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {(isAr ? [
                `${service} ${city}`,
                `واتساب ${city}`,
                `ذكاء اصطناعي ${city}`,
                `أتمتة الأعمال ${city}`,
              ] : [
                `${data.service} ${data.city}`,
                `WhatsApp AI ${data.city}`,
                `AI Automation ${data.city}`,
                `${data.city} Business AI`,
              ]).map((kw) => (
                <span key={kw} className="px-3 py-1 rounded-full border border-white/7 text-[10px] text-white/28 font-500"
                  style={{ background: "rgba(255,255,255,0.025)" }}>
                  {kw}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="mailto:mohammed@electi.sa?subject=City Inquiry — Jeddah">
                <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "تحدّث مع فريقنا" : "Talk to Our Team"}
                </motion.button>
              </a>
              <Link href="/agents">
                <motion.button className="px-8 py-3.5 rounded-xl border border-white/10 text-white/45 text-sm font-600 hover:border-white/18 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "عرض الوكلاء" : "View Agents"}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/18" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ OVERVIEW ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-700 mb-6">
                  {isAr ? `${service} في ${city}` : `${data.service} in ${data.city}`}
                </h2>
                {overview.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/38 text-sm leading-relaxed mb-4">{para}</p>
                ))}
              </motion.div>
            </div>
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-white/7 p-6 h-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-white/28" />
                  <h3 className="font-700 text-white/60 text-sm">{isAr ? `لماذا ${city}؟` : `The ${data.city} Context`}</h3>
                </div>
                <p className="text-white/32 text-xs leading-relaxed mb-5">{localContext}</p>
                {/* LocalBusiness trust signals */}
                <div className="space-y-2">
                  {[
                    isAr ? "✓ WhatsApp Business API الرسمي" : "✓ Official WhatsApp Business API",
                    isAr ? "✓ ثنائي اللغة عربي + إنجليزي"  : "✓ Bilingual Arabic + English",
                    isAr ? "✓ إقامة البيانات في المملكة"    : "✓ Saudi data residency",
                    isAr ? "✓ نشر في 2–4 أسابيع"            : "✓ Deployed in 2–4 weeks",
                    isAr ? "✓ دعم تكامل ERP"                : "✓ ERP integration support",
                  ].map((item) => (
                    <div key={item} className="text-[11px] text-white/32 font-500">{item}</div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/6">
                  <div className="text-[10px] text-white/20 mb-1">{isAr ? "العنوان المسجَّل" : "Registered Address"}</div>
                  <div className="text-[11px] text-white/32 leading-relaxed">
                    2413 Ad Damman Road<br />Ghirnath Dist., Unit 2414<br />Riyadh 13242-7933, KSA
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOCAL BENEFITS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-700 mb-2">
              {isAr ? `لماذا ${service} لشركات ${city}؟` : `Why ${data.service} for ${data.city} Businesses?`}
            </h2>
            <p className="text-white/25 text-sm">
              {isAr ? `المزايا الرئيسية لنشر وكلاء Electي الذكيون في ${city}` : `Key advantages of deploying Electi AI agents in ${data.city}`}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/7 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <CheckCircle className="w-4 h-4 text-white/22 mb-3" />
                <h3 className="font-700 text-white/70 text-sm mb-1.5">{isAr ? b.titleAr : b.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{isAr ? b.descAr : b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-700 mb-2">
              {isAr ? `القطاعات التي نخدمها في ${city}` : `Industries Served in ${data.city}`}
            </h2>
            <p className="text-white/25 text-sm">
              {isAr ? `كيف يستفيد كل قطاع من ${service} في ${city}` : `How each sector benefits from ${data.service} in ${data.city}`}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-white/7 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="font-700 text-white/70 text-sm mb-2">{isAr ? ind.nameAr : ind.name}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{isAr ? ind.descAr : ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl font-700 mb-2">{isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
            <p className="text-white/22 text-xs">{isAr ? `${service} في ${city} — إجابات لأكثر الأسئلة شيوعاً` : `${data.service} in ${data.city} — answers to common questions`}</p>
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

      {/* ══ INTERNAL LINKS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-white/35 text-xs font-700 uppercase tracking-widest mb-5">{isAr ? "صفحات ذات صلة" : "Related Pages"}</h3>
            <div className="flex flex-wrap gap-3">
              {data.relatedPages.map((rp) => (
                <Link key={rp.href} href={rp.href}>
                  <motion.div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/8 text-xs text-white/35 hover:text-white/55 hover:border-white/14 transition-all cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.025)" }} whileHover={{ scale: 1.02 }}>
                    {isAr ? rp.labelAr : rp.label}
                    <ArrowLeft className={`w-3 h-3 ${isAr ? "" : "rotate-180"}`} />
                  </motion.div>
                </Link>
              ))}
              <Link href="/case-studies">
                <motion.div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/8 text-xs text-white/35 hover:text-white/55 hover:border-white/14 transition-all cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.025)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "حالات الاستخدام" : "Case Studies"}
                  <ArrowLeft className={`w-3 h-3 ${isAr ? "" : "rotate-180"}`} />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-600 text-white/35 mb-6"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <MapPin className="w-3 h-3" />
              {city} · {isAr ? "المملكة العربية السعودية" : "Saudi Arabia"}
            </div>
            <h2 className="text-2xl font-700 mb-4">
              {isAr ? `هل تريد نشر ${service} في ${city}؟` : `Ready to Deploy ${data.service} in ${data.city}?`}
            </h2>
            <p className="text-white/28 text-sm mb-8 max-w-md mx-auto">
              {isAr
                ? `تواصل مع فريق Electي لمناقشة احتياجات شركتك في ${city} والحصول على اقتراح مخصص.`
                : `Contact Electi to discuss your ${data.city} business needs and receive a tailored proposal.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`mailto:mohammed@electi.sa?subject=${encodeURIComponent(data.service + " — " + data.city + " Inquiry")}`}>
                <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "تواصل معنا" : "Get in Touch"}
                </motion.button>
              </a>
              <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
                <motion.button className="px-8 py-3.5 rounded-xl border border-white/10 text-white/45 text-sm font-600 hover:border-white/18 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }}>
                  {isAr ? "جرّب المنصة" : "Try the Platform"}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
