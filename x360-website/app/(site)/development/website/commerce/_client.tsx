"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Globe, Smartphone, Bot, BarChart3,
  Eye, Zap, MessageSquare, Settings, TrendingUp,
  Shield, Layers, Wifi, ShoppingCart, CreditCard,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaConfig } from "@/lib/useMediaConfig";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import OtherIndustriesStrip from "@/components/ui/OtherIndustriesStrip";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT   = "#52D39B";
const GLOW_RGB = "82,211,155";

/* ── helpers ─────────────────────────────────────────────────────────── */
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
function Badge({ children, color = "rgba(255,255,255,0.35)", bg = "rgba(255,255,255,0.05)", border = "rgba(255,255,255,0.10)" }: { children: ReactNode; color?: string; bg?: string; border?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase"
      style={{ background: bg, border: `1px solid ${border}`, color }}>
      {children}
    </span>
  );
}
function Grid({ opacity = 0.018 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ opacity, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
  );
}
function Glow({ color = GLOW_RGB, x = "50%", y = "45%", size = "80vw", intensity = 0.12 }: { color?: string; x?: string; y?: string; size?: string; intensity?: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
        background: `radial-gradient(ellipse, rgba(${color},${intensity}) 0%, transparent 65%)` }} />
  );
}
function GlowRuleCenter() {
  return (
    <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)", margin: "0 auto" }} />
  );
}

/* ── ANIMATED TEXT CYCLE ─────────────────────────────────────────────── */
function AnimatedTextCycle({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
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
    <span ref={cycleRef} className={`relative inline-block ${className}`} aria-live="polite">
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

/* ── TRUST LOGOS ──────────────────────────────────────────────────────── */
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

/* ══ MAIN PAGE ════════════════════════════════════════════════════════ */
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
  { q: "What e-commerce platforms does X360 build for Saudi businesses?", qAr: "ما منصات التجارة الإلكترونية التي تبنيها X360 للشركات السعودية؟", a: "X360 builds custom e-commerce platforms, marketplace solutions, B2B procurement portals, and digital storefronts — all with Arabic (RTL) interfaces, SADAD/Mada payment integration, ZATCA VAT compliance, and Saudi logistics carrier connectivity.", aAr: "تبني X360 منصات تجارة إلكترونية مخصصة وحلول أسواق وبوابات شراء B2B وواجهات متاجر رقمية — جميعها مع واجهات عربية (RTL) وتكامل SADAD/مدى وامتثال ضريبة القيمة المضافة لزاتكا واتصال بناقلات الشحن السعودية." },
  { q: "Can X360 build a B2B procurement portal for a Saudi enterprise?", qAr: "هل تستطيع X360 إنشاء بوابة شراء B2B لمؤسسة سعودية؟", a: "Yes. X360 builds B2B e-commerce and procurement platforms for Saudi distributors, manufacturers, and enterprise groups — including multi-user accounts, purchase order workflows, approval chains, and ERP integration.", aAr: "نعم. تبني X360 منصات تجارة B2B وشراء للموزعين والمصنعين والمجموعات المؤسسية السعودية — تشمل حسابات متعددة المستخدمين وسير عمل أوامر الشراء وسلاسل الموافقة وتكامل ERP." },
  { q: "What payment gateways does X360 integrate for Saudi e-commerce?", qAr: "ما بوابات الدفع التي تدمجها X360 للتجارة الإلكترونية السعودية؟", a: "X360 integrates all major Saudi payment gateways — including Moyasar, Hyperpay, PayTabs, SADAD, Mada, Apple Pay, and international Visa/Mastercard — depending on the business model and customer profile.", aAr: "تدمج X360 جميع بوابات الدفع السعودية الرئيسية — بما فيها موياسر وهايبر باي وبيتابس وSADAD ومدى وApple Pay وVisa/Mastercard الدولية — حسب نموذج العمل وملف العملاء." },
  { q: "How does X360 handle e-commerce SEO for the Saudi market?", qAr: "كيف تتعامل X360 مع SEO للتجارة الإلكترونية في السوق السعودية؟", a: "X360 builds Arabic SEO into every e-commerce platform from the start — Arabic keyword architecture, bilingual meta structure, product schema structured data, and site speed optimisation for Saudi mobile shoppers.", aAr: "تبني X360 SEO العربي في كل منصة تجارة إلكترونية من البداية — بنية الكلمات المفتاحية العربية وهيكل ميتا ثنائي اللغة والبيانات المنظمة لمخطط المنتج وتحسين سرعة الموقع للمتسوقين السعوديين عبر الجوال." },
  { q: "How long does it take to launch a custom e-commerce platform?", qAr: "كم يستغرق إطلاق منصة تجارة إلكترونية مخصصة؟", a: "A standard e-commerce store is delivered in 5–8 weeks. A full marketplace or B2B procurement platform is 10–16 weeks. X360 uses phased delivery so the storefront launches first while advanced features are completed.", aAr: "يُسلَّم متجر التجارة الإلكترونية القياسي في 5-8 أسابيع. منصة السوق الكاملة أو الشراء B2B تستغرق 10-16 أسبوعاً. تستخدم X360 التسليم المرحلي حتى تُطلق الواجهة أولاً بينما تكتمل الميزات المتقدمة." },
];

export default function CommerceClient() {
  const { isAr } = useLang();
  const get = useMediaConfig();
  const t = (en: string, ar: string) => (isAr ? ar : en);

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

      {/* ══ 1 · HERO ═════════════════════════════════════════════════ */}
      <Snap id="hero" className="flex flex-col items-center justify-center">
        <video className="hidden sm:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("commerce.hero-video", "/x360/ecommerce-hero.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0, opacity: 1 }} />
        <video className="sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("commerce.mobile-video", "/x360/ecommerce-hero.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0, opacity: 1 }} />
        <div className="relative flex flex-col items-center text-center gap-7 px-10 py-10 rounded-2xl"
          style={{ zIndex: 10, maxWidth: 1100, background: "rgba(0,0,0,0.20)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <FadeUp delay={0.15}>
            <Badge>{t("Web Development · E-Commerce", "تطوير المواقع · التجارة الإلكترونية")}</Badge>
          </FadeUp>
          <FadeUp delay={0.28}>
            <h1 className="font-thin leading-tight tracking-[0.06em] uppercase"
              style={{ fontSize: "clamp(1.1rem, 2.4vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
              {t("Commerce.", "التجارة.")} <span style={{ color: "#b0b0b0" }}>{t("Redefined.", "أُعيد تعريفها.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.42}>
            <motion.div style={{ width: "clamp(120px,28vw,280px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.85),transparent)" }} />
          </FadeUp>
          <FadeUp delay={0.52}>
            <p className="font-light leading-relaxed" style={{ fontSize: "clamp(0.65rem,1vw,0.78rem)", color: "rgba(255,255,255,1)", maxWidth: 560 }}>
              {t(
                "Intelligent e-commerce ecosystems powered by AI recommendations, Saudi payment gateways, smart analytics, and luxury digital shopping experiences.",
                "منظومات تجارة إلكترونية ذكية مدعومة بتوصيات الذكاء الاصطناعي وبوابات الدفع السعودية والتحليلات الذكية وتجارب التسوق الرقمي الفاخرة."
              )}
            </p>
          </FadeUp>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 10 }}>
          <p className="text-[8px] tracking-[0.34em] uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>
            {t("SCROLL TO EXPLORE", "مرر للاستكشاف")}
          </p>
          <div style={{ height: 28, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <motion.div className="w-px" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
              animate={{ height: ["10px","26px","10px"] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
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
                  ? ["المتاجر الإلكترونية", "منصات السوق", "التجارة الفاخرة", "العلامات التجارية", "تجار التجزئة الرقميون", "العلامات السعودية", "الأزياء ونمط الحياة"]
                  : ["Online Stores", "Marketplace Platforms", "Luxury Commerce", "Product Brands", "Digital Retailers", "Saudi Brands", "Fashion & Lifestyle"]}
                interval={2000} />
            </h2>
          </FadeUp>
          <FadeUp delay={0.22}><GlowRuleCenter /></FadeUp>
          <FadeUp delay={0.28}>
            <p className="text-white/30 max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>
              {t("Every product. Every brand. One complete digital storefront.", "كل منتج. كل علامة تجارية. واجهة رقمية متكاملة واحدة.")}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 3 · SHOWCASE IMAGE STRIP ════════════════════════════════ */}
      <Snap id="showcase" className="flex flex-col items-center justify-center">
        <Glow intensity={0.05} />
        <div className="relative z-10 flex flex-col items-center w-full gap-10">
          <div className="text-center flex flex-col items-center gap-4">
            <FadeUp delay={0}><Badge>{t("Website Development", "تطوير المواقع")}</Badge></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.4rem,2.8vw,2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("This Is What We Can Do", "هذا ما نستطيع فعله")}
              </h2>
            </FadeUp>
            <FadeIn delay={0.2}>
              <div className="h-px" style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)" }} />
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="relative w-full overflow-hidden marquee-outer">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to right,#000 0%,transparent 100%)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to left,#000 0%,transparent 100%)" }} />
            <div dir="ltr" className="inline-flex items-center gap-5 py-2" style={{ animation: "marquee-scroll 44s linear infinite" }}>
              {[
                "/x360/retail-showcase/1.jpg", "/x360/retail-showcase/2.jpg", "/x360/retail-showcase/3.jpg",
                "/x360/retail-showcase/4.jpg", "/x360/retail-showcase/5.jpg", "/x360/retail-showcase/6.jpg",
                "/x360/retail-showcase/7.jpg",
                "/x360/retail-showcase/1.jpg", "/x360/retail-showcase/2.jpg", "/x360/retail-showcase/3.jpg",
                "/x360/retail-showcase/4.jpg", "/x360/retail-showcase/5.jpg", "/x360/retail-showcase/6.jpg",
                "/x360/retail-showcase/7.jpg",
              ].map((src, i) => (
                <div key={i} className="flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ width: "clamp(280px,36vw,480px)", aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={src} alt="" loading="eager" className="w-full h-full object-cover" style={{ opacity: 0.88 }} />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeUp delay={0.5}>
            <p className="text-[10px] tracking-[0.26em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
              {t("Fast · Intelligent · Scalable · Luxury", "سريع · ذكي · قابل للتوسع · فاخر")}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 4 · OUR SERVICES ════════════════════════════════════════ */}
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
                {t("End-to-end digital solutions built specifically for e-commerce and retail brands.", "حلول رقمية متكاملة مصممة خصيصاً لعلامات التجارة الإلكترونية والتجزئة.")}
              </p>
            </FadeUp>
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: Globe,        en: "E-Commerce Websites",   ar: "مواقع التجارة الإلكترونية"     },
                { icon: Smartphone,   en: "Mobile Shopping Apps",  ar: "تطبيقات التسوق للجوال"          },
                { icon: ShoppingCart, en: "Marketplace Platforms", ar: "منصات السوق الإلكتروني"         },
                { icon: Bot,          en: "AI Recommendations",    ar: "توصيات الذكاء الاصطناعي"        },
                { icon: CreditCard,   en: "Payment Gateways",      ar: "بوابات الدفع"                   },
                { icon: BarChart3,    en: "Analytics Dashboards",  ar: "لوحات التحليلات"                },
                { icon: Settings,     en: "Admin Dashboards",      ar: "لوحات التحكم"                   },
                { icon: Shield,       en: "Cybersecurity",         ar: "الأمن السيبراني"                },
                { icon: Wifi,         en: "Hosting",               ar: "الاستضافة"                      },
                { icon: TrendingUp,   en: "SEO Optimization",      ar: "تحسين محركات البحث"             },
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

      {/* ══ 5 · SHOWCASE IFRAME ═════════════════════════════════════ */}
      <Snap id="showcase-iframe" className="flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden" style={{ background: "#000" }}>
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to top,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${GLOW_RGB},0.06) 0%, transparent 70%)` }} />

          <FadeUp delay={0.04} className="relative z-20 text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-4"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <ShoppingCart className="w-3 h-3" /> {t("Smart Commerce Platforms", "منصات التجارة الذكية")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-thin">
              {t("Commerce, ", "التجارة، ")}
              <span style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Elevated.", "مُرتقية.")}
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
                  x-360.ai · e-commerce
                </div>
              </div>
              <div className="relative" style={{ height: "55vh", background: "#050505" }}>
                {/* iframe — update src when e-commerce platform demo URL is available */}
                <iframe src={get("dev.commerce.iframe", "")} title="E-Commerce Platform" className="w-full h-full block border-0" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `rgba(${GLOW_RGB},0.08)`, border: `1px solid rgba(${GLOW_RGB},0.22)` }}
                    animate={{ boxShadow: [`0 0 0 rgba(${GLOW_RGB},0)`,`0 0 28px rgba(${GLOW_RGB},0.28)`,`0 0 0 rgba(${GLOW_RGB},0)`] }}
                    transition={{ duration: 2.5, repeat: Infinity }}>
                    <ShoppingCart style={{ width: 22, height: 22, color: ACCENT }} />
                  </motion.div>
                  <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
                    {t("Commerce Platform — Coming Soon", "منصة التجارة — قريباً")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 6 · TRUSTED CLIENTS ═════════════════════════════════════ */}
      <Snap id="clients" className="flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
          <div className="flex flex-col items-center text-center gap-8 w-full relative z-10">
            <FadeUp delay={0}><Badge>{t("Kingdom of Saudi Arabia", "المملكة العربية السعودية")}</Badge></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight px-6" style={{ fontSize: "clamp(1.4rem,2.8vw,2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("Trusted by Leaders", "موثوق به من القادة")}
              </h2>
            </FadeUp>
            <FadeIn delay={0.2}>
              <motion.div className="h-px" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)" }} />
            </FadeIn>
            <FadeIn delay={0.3} className="relative w-full overflow-hidden py-6 marquee-outer">
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to right,#000000 0%,transparent 100%)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10" style={{ background: "linear-gradient(to left,#000000 0%,transparent 100%)" }} />
              <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
                {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
                  <div key={i} className="inline-flex items-center justify-center flex-shrink-0 mx-6 sm:mx-8 px-6 py-3 rounded-xl overflow-hidden"
                    style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <img src={src} alt={name} loading="lazy" decoding="async" className="h-24 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
                  </div>
                ))}
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 600, height: 80, background: "radial-gradient(ellipse,rgba(255,255,255,0.025) 0%,transparent 70%)" }} />
            </FadeIn>
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-12">
                {[
                  { num: "50+",    label: t("Projects Delivered","مشروع مُنجز") },
                  { num: "SAR 2B+",label: t("Portfolio Managed","محفظة مُدارة") },
                  { num: "99.9%",  label: t("Uptime SLA","وقت تشغيل")           },
                  { num: "3+",     label: t("Countries","دول")                   },
                ].map((s, i) => (
                  <div key={i} className={s.num === "3+" ? "hidden sm:flex flex-col items-center gap-1" : "flex flex-col items-center gap-1"}>
                    <span className="font-thin text-white" style={{ fontSize: "clamp(0.78rem,1.8vw,1.4rem)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.06em" }}>{s.num}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </Snap>

      {/* ══ CASE STUDY FAQS ══════════════════════════════════════════ */}
      <Snap id="casestudy" className="flex flex-col items-center justify-center">
        <Grid opacity={0.018} />
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

      {/* ══ 7 · FINAL CTA ════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center">
        <Grid opacity={0.018} />
        <Glow x="50%" y="60%" size="90vw" intensity={0.12} />
        <Glow color="167,139,250" x="30%" y="30%" size="50vw" intensity={0.06} />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width: 400, height: 400, top: "-10%", right: "-10%", background: `radial-gradient(circle, rgba(${GLOW_RGB},0.06) 0%, transparent 70%)` }}
          animate={{ scale: [1,1.12,1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width: 300, height: 300, bottom: "-5%", left: "-5%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1,1.1,1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 w-full h-full px-8">
          <FadeUp delay={0.06}><Badge>{t("Start Your Transformation","ابدأ تحولك الرقمي")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-thin uppercase leading-[0.92] tracking-[0.04em]"
              style={{ fontSize: "clamp(1.6rem,3.8vw,3.2rem)", fontFamily: "Quicksand, sans-serif", maxWidth: 900 }}>
              {t("Build the Future","ابنِ مستقبل")}<br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{t("of Commerce","التجارة")}</span><br />
              {t("Digitally.","رقمياً.")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.24}>
            <p style={{ fontSize: "clamp(0.88rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.38)", maxWidth: 540 }}>
              {t("Intelligent digital storefronts designed for the next generation of commerce experiences.",
                 "واجهات متاجر رقمية ذكية مصممة للجيل القادم من تجارب التجارة.")}
            </p>
          </FadeUp>
          <FadeUp delay={0.33} className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact">
              <motion.button className="relative overflow-hidden flex items-center gap-2.5 px-10 py-4 rounded-2xl text-base font-semibold text-black"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 12px 2px rgba(255,255,255,0.10)","0 0 32px 10px rgba(255,255,255,0.26)","0 0 12px 2px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Contact Us Today","تواصل معنا اليوم")}
                  <motion.span animate={{ x: [0,4,0] }} transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
            <a href="https://wa.me/966532087436" target="_blank" rel="noopener noreferrer">
              <motion.button className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.70)" }}
                whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}>
                <MessageSquare className="w-4 h-4" style={{ color: "#25D366" }} />
                {t("Chat on WhatsApp","تواصل عبر واتساب")}
              </motion.button>
            </a>
          </FadeUp>
        </div>
      </Snap>

      <section style={{ scrollSnapAlign: "start", background: "#000" }}>
        <OtherIndustriesStrip currentSlug="commerce" />
        <Footer />
      </section>
      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
