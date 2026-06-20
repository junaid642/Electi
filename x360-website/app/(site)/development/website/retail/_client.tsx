"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useMediaConfig } from "@/lib/useMediaConfig";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Globe, Smartphone, Bot, BarChart3,
  Zap, Settings, TrendingUp, Shield, ShoppingCart,
  CreditCard, Store, Tag, Layers,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import OtherIndustriesStrip from "@/components/ui/OtherIndustriesStrip";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT   = "#52D39B";
const GLOW_RGB = "82,211,155";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}
function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay }} className={className}>
      {children}
    </motion.div>
  );
}
function Snap({ children, id, className = "", style }: { children: ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100dvh", flexShrink: 0, background: "#000", ...style }}>
      {children}
    </section>
  );
}
function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.35)" }}>
      {children}
    </span>
  );
}
function Glow({ x = "50%", y = "45%", size = "80vw", intensity = 0.12 }: { x?: string; y?: string; size?: string; intensity?: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
        background: `radial-gradient(ellipse, rgba(${GLOW_RGB},${intensity}) 0%, transparent 65%)` }} />
  );
}
function GlowRuleCenter() {
  return (
    <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)", margin: "0 auto" }} />
  );
}

function AnimatedTextCycle({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const cycleRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(cycleRef, { once: false });
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [inView, words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span ref={cycleRef} className="relative inline-block" aria-live="polite">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span key={words[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
          className="absolute inset-0 flex items-center justify-center">
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TRUST_LOGOS = [
  { src: "/x360/clients/ekal.webp",          name: "Ekal"              },
  { src: "/x360/clients/sireus.webp",         name: "Sireus"            },
  { src: "/x360/clients/client3.webp",        name: "Client"            },
  { src: "/x360/clients/sobha.webp",          name: "Sobha Realty"      },
  { src: "/x360/clients/kw.webp",             name: "Keller Williams"   },
  { src: "/x360/clients/balcona99.webp",      name: "Balcona'99",       scale: 1.3 },
  { src: "/x360/clients/rania-hotels.webp",   name: "Rania Hotels"      },
  { src: "/x360/clients/villa-fayrouz.webp",  name: "Villa Fayrouz",    scale: 2.0 },
  { src: "/x360/clients/riyadh-cables.webp",  name: "Riyadh Cables",    scale: 2.0 },
  { src: "/x360/clients/prestige.webp",       name: "Prestige"          },
  { src: "/x360/clients/ekal-catering.webp",  name: "Ekal Catering",    scale: 2.0 },
  { src: "/x360/clients/joori.webp",          name: "Joori min Beirut", scale: 1.3 },
  { src: "/x360/clients/zonoza.webp",         name: "Zonoza Group",     scale: 2.0 },
  { src: "/x360/clients/limonaia.webp",       name: "Limonaia"          },
];
const TRUST_DOUBLED = [...TRUST_LOGOS, ...TRUST_LOGOS];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.025)" }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start">
        <span className="text-sm font-medium leading-snug" style={{ fontFamily: "Quicksand, sans-serif", color: "rgba(255,255,255,0.85)" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 text-xl leading-none" style={{ color: "rgba(255,255,255,0.4)" }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
            <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CASE_FAQS = [
  { q: "What retail digital solutions does X360 build for Saudi brands?", qAr: "ما الحلول الرقمية للتجزئة التي تبنيها X360 للعلامات السعودية؟", a: "X360 builds retail brand websites, e-commerce platforms, loyalty program portals, and in-store digital experience solutions — all bilingual Arabic/English with Saudi payment gateway and ZATCA VAT compliance built in from day one.", aAr: "تبني X360 مواقع علامات التجزئة ومنصات التجارة الإلكترونية وبوابات برامج الولاء وحلول التجربة الرقمية داخل المتجر — جميعها ثنائية اللغة عربي/إنجليزي مع تكامل بوابات الدفع السعودية وامتثال ضريبة القيمة المضافة لزاتكا من اليوم الأول." },
  { q: "Can X360 build an Arabic-first e-commerce store for a Saudi retail brand?", qAr: "هل تستطيع X360 إنشاء متجر إلكتروني أولي العربية لعلامة تجزئة سعودية؟", a: "Yes. X360 builds Arabic-first e-commerce platforms with RTL layout, localised checkout flows, SADAD and Mada payment integration, Saudi shipping carrier connectivity, and Arabic SEO — designed for Saudi shoppers first.", aAr: "نعم. تبني X360 منصات تجارة إلكترونية عربية أولاً بتخطيط RTL وتدفقات دفع محلية وتكامل SADAD ومدى وربط ناقلات الشحن السعودية وSEO العربي — مصممة للمتسوقين السعوديين في المقام الأول." },
  { q: "How does X360 handle VAT compliance for Saudi e-commerce?", qAr: "كيف تتعامل X360 مع امتثال ضريبة القيمة المضافة للتجارة الإلكترونية السعودية؟", a: "All X360 e-commerce platforms include ZATCA-compliant VAT calculation and invoice generation — including e-invoicing (FATOORAH phase 1 and 2) requirements for Saudi businesses.", aAr: "جميع منصات التجارة الإلكترونية من X360 تتضمن حساب ضريبة القيمة المضافة المتوافق مع زاتكا وإنشاء الفواتير — بما فيها متطلبات الفوترة الإلكترونية (FATOORAH المرحلة 1 و2) للشركات السعودية." },
  { q: "How quickly can X360 launch a retail e-commerce platform?", qAr: "ما مدى سرعة إطلاق X360 لمنصة تجزئة إلكترونية؟", a: "A standard retail brand website with e-commerce is delivered in 4–6 weeks. A full loyalty program and omnichannel retail platform is 8–14 weeks. X360 offers phased launch so the brand site goes live before the full commerce platform is complete.", aAr: "يُسلَّم موقع علامة التجزئة القياسي مع التجارة الإلكترونية في 4-6 أسابيع. منصة الولاء والتجزئة متعددة القنوات الكاملة تستغرق 8-14 أسبوعاً. تقدم X360 إطلاقاً مرحلياً حتى يعمل موقع العلامة قبل اكتمال منصة التجارة الكاملة." },
  { q: "Which Saudi retail brands has X360 worked with?", qAr: "مع أي علامات تجزئة سعودية عملت X360؟", a: "X360 has worked with retail brands across fashion, home, food, and specialty sectors in Saudi Arabia. Client references are available upon request under NDA.", aAr: "عملت X360 مع علامات تجزئة في قطاعات الأزياء والمنزل والأغذية والمتخصصة في المملكة العربية السعودية. مراجع العملاء متاحة عند الطلب بموجب اتفاقية سرية." },
];

export default function RetailClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const get = useMediaConfig();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    let lastTop = 0;
    const onScroll = () => {
      const down = el.scrollTop > lastTop;
      lastTop = el.scrollTop;
      window.dispatchEvent(new CustomEvent("x360:snapscroll", { detail: { down, scrollTop: el.scrollTop } }));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <BackButton />
      <WhatsAppButton />

      {/* ══ 1 · HERO ═════════════════════════════════════════════════ */}
      <Snap id="hero" className="flex flex-col items-center justify-center" style={{ height: "100dvh" }}>
        <video
          className="hidden sm:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("dev.retail.desktop-video", "/x360/showroom.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0 }}
        />
        <video
          className="sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("dev.retail.mobile-video", "/x360/showroom.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0 }}
        />
        {/* bottom vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)", zIndex: 1 }} />
        {/* accent glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(82,211,155,0.10) 0%, transparent 65%)", zIndex: 2 }} />

        {/* glass content box */}
        <div className="relative z-10 flex flex-col items-center gap-5 px-8 py-8 sm:px-10 sm:py-10 rounded-2xl text-center mx-auto"
          style={{ maxWidth: 620, background: "rgba(0,0,0,0.22)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-medium"
              style={{ color: "rgba(255,255,255,0.38)", background: "rgba(255,255,255,0.04)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(82,211,155,0.8)" }} />
              {t("Web Development · Retail", "تطوير المواقع · التجزئة")}
            </div>
          </motion.div>

          {/* heading */}
          <FadeUp delay={0.18}>
            <h1 className="font-thin leading-tight tracking-[0.12em] uppercase"
              style={{ fontSize: "clamp(1.1rem, 2.6vw, 2.2rem)", fontFamily: "Quicksand, sans-serif", whiteSpace: "pre-line" }}>
              {t("RETAIL EXPERIENCES\nBUILT TO SELL.", "تجارب التجزئة\nمبنية للبيع.")}
            </h1>
          </FadeUp>

          {/* accent line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.35, duration: 0.6, ease }}
            style={{ height: 1, width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(82,211,155,0.75), transparent)", transformOrigin: "center", alignSelf: "center" }}
          />

          {/* sub */}
          <FadeUp delay={0.3}>
            <p className="font-light leading-relaxed" style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.82rem)", color: "rgba(255,255,255,0.55)", maxWidth: 480 }}>
              {t(
                "Premium retail digital platforms with seamless in-store and online experiences, smart inventory management, and Saudi payment gateways.",
                "منصات تجزئة رقمية متميزة مع تجارب سلسة داخل المتجر وعبر الإنترنت وإدارة مخزون ذكية وبوابات دفع سعودية."
              )}
            </p>
          </FadeUp>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 10 }}>
          <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{t("SCROLL TO EXPLORE", "مرر للاستكشاف")}</p>
          <div style={{ height: 28, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <motion.div className="w-px" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
              animate={{ height: ["10px", "26px", "10px"] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      </Snap>

      {/* ══ 2 · WE BUILD FOR ═════════════════════════════════════════ */}
      <Snap id="audience" className="flex flex-col items-center justify-center overflow-hidden">
        <Glow intensity={0.06} />
        <div className="max-w-5xl w-full mx-auto text-center px-6 relative z-10">
          <FadeUp delay={0.08}>
            <p className="text-white/30 font-medium mb-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>{t("We Build For", "نبني لـ")}</p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <h2 className="font-thin leading-tight mb-4" style={{ fontSize: "clamp(1.2rem,2.64vw,2.16rem)" }}>
              <AnimatedTextCycle
                words={isAr
                  ? ["العلامات التجارية للأزياء", "غرف العرض", "المتاجر الكبرى", "البوتيكات", "التجزئة الفاخرة", "العلامات السعودية", "المتاجر المتعددة الفروع"]
                  : ["Fashion Brands", "Showrooms", "Supermarkets", "Boutiques", "Luxury Retail", "Saudi Brands", "Multi-Branch Stores"]}
                interval={2000} />
            </h2>
          </FadeUp>
          <FadeUp delay={0.22}><GlowRuleCenter /></FadeUp>
          <FadeUp delay={0.28}>
            <p className="text-white/30 max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>
              {t("Every product. Every store. One complete retail platform.", "كل منتج. كل متجر. منصة تجزئة متكاملة واحدة.")}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 3 · OUR SERVICES ════════════════════════════════════════ */}
      <Snap id="services" className="flex items-center">
        <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8" style={{ height: "100vh", background: "#000", width: "100%" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.6 }} />
          <div className="max-w-7xl w-full mx-auto relative z-10">
            <FadeUp delay={0.05} className="text-center mb-3 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-2 sm:mb-5"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Zap className="w-3 h-3" /> {t("What We Offer", "ما نقدمه")}
              </div>
              <h2 className="text-2xl sm:text-5xl font-thin mb-2 sm:mb-4">
                {t("Our ", "خدماتنا ")}
                <span style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.45))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {t("Services", "")}
                </span>
              </h2>
              <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)", margin: "16px auto" }} />
              <p className="hidden sm:block text-white/35 text-sm mt-4 mx-auto text-center">
                {t("End-to-end retail digital solutions built for Saudi brands.", "حلول رقمية متكاملة للتجزئة مصممة للعلامات التجارية السعودية.")}
              </p>
            </FadeUp>
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: Store,        en: "Retail Websites",         ar: "مواقع التجزئة"                  },
                { icon: Smartphone,   en: "Mobile Shopping Apps",    ar: "تطبيقات التسوق للجوال"           },
                { icon: CreditCard,   en: "Saudi Payment Gateways",  ar: "بوابات الدفع السعودية"           },
                { icon: BarChart3,    en: "Inventory & Analytics",   ar: "المخزون والتحليلات"              },
                { icon: Tag,          en: "Promotions & Loyalty",    ar: "العروض والولاء"                  },
                { icon: Globe,        en: "Arabic-First UX",         ar: "تجربة عربية أولاً"               },
                { icon: Bot,          en: "AI Product Discovery",    ar: "اكتشاف المنتجات بالذكاء الاصطناعي" },
                { icon: Settings,     en: "Admin Dashboards",        ar: "لوحات التحكم"                    },
                { icon: Shield,       en: "Cybersecurity",           ar: "الأمن السيبراني"                 },
                { icon: TrendingUp,   en: "SEO & Growth",            ar: "تحسين محركات البحث والنمو"       },
              ].map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <FadeUp key={svc.en} delay={0.10 + i * 0.05}>
                    <motion.div className="rounded-xl p-2 sm:p-5 text-center border cursor-default group flex flex-col items-center justify-center h-[82px] sm:h-auto"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                      whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.25 }}>
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-3"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon className="w-[12px] h-[12px] sm:w-[18px] sm:h-[18px] text-white/65 group-hover:text-white/90 transition-colors" />
                      </div>
                      <span className="text-white/72 group-hover:text-white text-[8px] sm:text-xs font-semibold transition-colors leading-[1.1]">
                        {isAr ? svc.ar : svc.en}
                      </span>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
            <FadeUp delay={0.7} className="text-center mt-2 sm:mt-8">
              <p className="text-white/30 text-sm">
                {t("Want more? ", "تريد المزيد؟ ")}
                <Link href="/contact" className="text-white/60 underline underline-offset-4 hover:text-white transition-colors">
                  {t("Talk to an expert", "تحدث مع خبير")}
                </Link>
              </p>
            </FadeUp>
          </div>
        </div>
      </Snap>

      {/* ══ 4 · KEY FEATURES ════════════════════════════════════════ */}
      <Snap id="features" className="flex items-center justify-center">
        <Glow intensity={0.05} />
        <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
          <FadeUp delay={0.05} className="text-center mb-3 sm:mb-10">
            <Badge>{t("Platform Capabilities", "قدرات المنصة")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-thin mt-4 mb-4">
              {t("Built for ", "مبني لـ")}
              <span style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.45))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Saudi Retail", "التجزئة السعودية")}
              </span>
            </h2>
            <GlowRuleCenter />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CreditCard,
                en: "Saudi Payment Gateways",
                ar: "بوابات الدفع السعودية",
                desc: "Mada, Apple Pay, STC Pay, and Tabby BNPL integrated out of the box.",
                descAr: "مدى وApple Pay وSTC Pay وTabby BNPL مدمجة جاهزة للاستخدام.",
              },
              {
                icon: BarChart3,
                en: "Inventory & Analytics",
                ar: "المخزون والتحليلات",
                desc: "Real-time stock management, sales dashboards, and conversion tracking.",
                descAr: "إدارة مخزون في الوقت الفعلي ولوحات مبيعات وتتبع التحويل.",
              },
              {
                icon: Globe,
                en: "Arabic-First UX",
                ar: "تجربة عربية أولاً",
                desc: "Fully bilingual storefronts with RTL product layouts and Arabic SEO.",
                descAr: "واجهات متاجر ثنائية اللغة مع تخطيطات منتجات RTL وSEO عربي.",
              },
              {
                icon: Zap,
                en: "High Performance",
                ar: "أداء عالي",
                desc: "Sub-2s page loads, CDN-optimized images, and caching for peak traffic.",
                descAr: "تحميل الصفحة في أقل من ثانيتين وصور CDN محسّنة وتخزين مؤقت لحركة المرور.",
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeUp key={feat.en} delay={0.1 + i * 0.1}>
                  <div className="rounded-2xl p-6 flex flex-col gap-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(${GLOW_RGB},0.08)`, border: `1px solid rgba(${GLOW_RGB},0.15)` }}>
                      <Icon style={{ width: 20, height: 20, color: ACCENT }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white/85 mb-1">{isAr ? feat.ar : feat.en}</p>
                      <p className="text-xs leading-relaxed text-white/38">{isAr ? feat.descAr : feat.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 5 · TRUSTED CLIENTS ═════════════════════════════════════ */}
      <Snap id="clients" className="flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
          <div className="flex flex-col items-center text-center gap-8 w-full relative z-10">
            <FadeUp delay={0}><Badge>{t("Kingdom of Saudi Arabia", "المملكة العربية السعودية")}</Badge></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight px-6"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em" }}>
                {t("Trusted by Leaders", "موثوق به من القادة")}
              </h2>
            </FadeUp>
            <FadeIn delay={0.2}>
              <div className="h-px" style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)" }} />
            </FadeIn>
            <FadeIn delay={0.3} className="relative w-full overflow-hidden py-6 marquee-outer">
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to right,#000 0%,transparent 100%)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to left,#000 0%,transparent 100%)" }} />
              <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
                {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
                  <div key={i} className="inline-flex items-center justify-center flex-shrink-0 mx-6 sm:mx-8 px-6 py-3 rounded-xl overflow-hidden"
                    style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <img src={src} alt={name} loading="lazy" decoding="async" className="h-24 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Snap>

      {/* ══ 5.5 · SHOWCASE IFRAME ═══════════════════════════════════ */}
      <Snap id="showcase-iframe" className="flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden" style={{ background: "#000" }}>
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to top,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${GLOW_RGB},0.06) 0%, transparent 70%)` }} />
          <FadeUp delay={0.04} className="relative z-20 text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-4"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <Globe className="w-3 h-3" /> {t("Live Platform Demo", "عرض المنصة المباشر")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-thin">
              {t("Retail, ", "التجزئة، ")}
              <span style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Digitised.", "رقمية.")}
              </span>
            </h2>
          </FadeUp>
          <FadeIn delay={0.14} className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 0 80px rgba(${GLOW_RGB},0.08), 0 32px 64px rgba(0,0,0,0.6)` }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="flex-1 mx-4 px-3 py-0.5 rounded-md text-[10px] font-mono text-white/20 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  x-360.ai · retail
                </div>
              </div>
              <div className="relative" style={{ height: "55vh", background: "#050505" }}>
                <iframe src={get("dev.retail.iframe", "")} title="Retail Platform Demo" className="w-full h-full block border-0" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `rgba(${GLOW_RGB},0.08)`, border: `1px solid rgba(${GLOW_RGB},0.22)` }}
                    animate={{ boxShadow: [`0 0 0 rgba(${GLOW_RGB},0)`,`0 0 28px rgba(${GLOW_RGB},0.28)`,`0 0 0 rgba(${GLOW_RGB},0)`] }}
                    transition={{ duration: 2.5, repeat: Infinity }}>
                    <Globe style={{ width: 22, height: 22, color: ACCENT }} />
                  </motion.div>
                  <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
                    {t("Retail Demo — Coming Soon", "عرض التجزئة — قريباً")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* ══ CASE STUDY FAQS ══════════════════════════════════════════ */}
      <Snap id="casestudy" className="flex flex-col items-center justify-center">
        <Glow x="50%" y="45%" size="70vw" intensity={0.07} />
        <div className="relative z-10 flex flex-col items-center gap-5 w-full px-6 lg:px-16" style={{ maxWidth: 860, margin: "0 auto" }}>
          <FadeUp delay={0}><Badge>{t("Case Studies", "دراسات الحالة")}</Badge></FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-thin text-center leading-tight" style={{ fontSize: "clamp(1.3rem,2.6vw,2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
              {t("Frequently Asked Questions", "أسئلة شائعة")}
            </h2>
          </FadeUp>
          <div style={{ width: "clamp(80px,14vw,140px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.3),transparent)" }} />
          <FadeIn delay={0.12} className="w-full flex flex-col gap-3">
            {CASE_FAQS.map((item, i) => <FaqItem key={i} q={isAr ? item.qAr : item.q} a={isAr ? item.aAr : item.a} />)}
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 6 · CTA ══════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex flex-col items-center justify-center">
        <Glow intensity={0.06} y="50%" />
        <div className="max-w-3xl w-full mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-8">
          <FadeUp delay={0}>
            <Badge>{t("Get Started", "ابدأ الآن")}</Badge>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.6rem)", letterSpacing: "0.08em" }}>
              {t("Ready to Build\nYour Retail Platform?", "جاهز لبناء\nمنصة التجزئة؟")}
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="h-px" style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)" }} />
          </FadeIn>
          <FadeUp delay={0.28}>
            <p className="text-white/40 leading-relaxed" style={{ fontSize: "clamp(0.8rem,1.2vw,1rem)", maxWidth: 460 }}>
              {t(
                "Partner with X360 to build your complete retail digital ecosystem — from branded website to AI-powered inventory management.",
                "تشارك مع X360 لبناء منظومتك الرقمية للتجزئة — من الموقع إلى إدارة المخزون بالذكاء الاصطناعي."
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.36} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide"
                style={{ background: "rgba(255,255,255,0.9)", color: "#000" }}
                whileHover={{ background: "rgba(255,255,255,1)", scale: 1.02 }}
                transition={{ duration: 0.2 }}>
                {t("Start Your Project", "ابدأ مشروعك")}
              </motion.button>
            </Link>
            <Link href="/development/website">
              <motion.button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                whileHover={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,1)" }}
                transition={{ duration: 0.2 }}>
                {t("View All Industries", "عرض جميع القطاعات")} <ArrowRight size={14} />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 7 · OTHER INDUSTRIES ════════════════════════════════════ */}
      <Snap id="others" className="flex flex-col items-center justify-center">
        <OtherIndustriesStrip currentSlug="retail" />
      </Snap>

      {/* ══ 8 · FOOTER ══════════════════════════════════════════════ */}
      <Snap id="footer">
        <Footer />
      </Snap>
    </div>
  );
}
