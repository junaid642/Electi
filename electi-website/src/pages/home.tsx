import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  ArrowRight, CheckCircle, Zap,
  Shield, Globe, Activity, MessageCircle, Receipt, Scale, BarChart3,
  TrendingUp, Users, ChevronLeft, ChevronRight, Mail, Calendar,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";
import NeonButton from "@/components/ui/NeonButton";
import AnimatedTextCycle from "@/components/ui/AnimatedTextCycle";
import TypewriterCycle from "@/components/ui/TypewriterCycle";
import PhoneShowcase from "@/components/ui/PhoneShowcase";
import TrustedMarquee from "@/components/ui/TrustedMarquee";
import { SplineScene } from "@/components/ui/SplineScene";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://electi.sa/#organization",
  "name": "Electi",
  "alternateName": ["إليكتي", "Electi AI", "Electi Saudi Arabia"],
  "description": "Electi is an AI Agent and Business Automation company headquartered in Riyadh, Saudi Arabia. Electi deploys bilingual Arabic and English AI agents for Saudi and GCC businesses via WhatsApp Business API.",
  "url": "https://electi.sa",
  "logo": "https://electi.sa/electi-logo.png",
  "image": "https://electi.sa/og-image.jpg",
  "telephone": "+966502547274",
  "email": "mohammed@electi.sa",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2413 Ad Damman Road, Ghirnath District, Unit No 2414",
    "addressLocality": "Riyadh",
    "postalCode": "13242-7933",
    "addressCountry": "SA",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.7136,
    "longitude": 46.6753,
  },
  "areaServed": [
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "City",    "name": "Riyadh",  "addressCountry": "SA" },
    { "@type": "City",    "name": "Jeddah",  "addressCountry": "SA" },
    { "@type": "Place",   "name": "GCC" },
  ],
  "knowsLanguage": [
    { "@type": "Language", "name": "Arabic",  "alternateName": "ar" },
    { "@type": "Language", "name": "English", "alternateName": "en" },
  ],
  "founder": [
    { "@type": "Person", "name": "Abdulrhman Saeed Omar", "jobTitle": "Co-founder" },
    { "@type": "Person", "name": "Junaid Ahamed Khan",    "jobTitle": "Co-founder" },
  ],
  "sameAs": ["https://electi.sa"],
  "keywords": "AI agents, AI automation, business automation, WhatsApp AI, Arabic AI, Saudi Arabia AI, Riyadh AI agents",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://electi.sa/#website",
  "url": "https://electi.sa",
  "name": "Electi — AI Agent Platform for Saudi Businesses",
  "publisher": { "@id": "https://electi.sa/#organization" },
  "inLanguage": ["ar", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://electi.sa/faq?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function InViewSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const agentsRaw = [
  {
    icon: MessageCircle, color: "#25D366",
    en: { title: "Personal Agent",      tagline: "Your intelligent daily companion",            features: ["WhatsApp assistant", "Email & calendar", "Smart reminders", "Meeting summaries"],                   ctaLabel: "Try for Free"     },
    ar: { title: "الوكيل الشخصي",       tagline: "رفيقك اليومي الذكي",                          features: ["مساعد واتساب", "البريد والتقويم", "تذكيرات ذكية", "ملخصات الاجتماعات"],                            ctaLabel: "جرّب مجاناً"  },
    href: "/agents/personal", ctaHref: "https://app.electi.sa/login",
  },
  {
    icon: Receipt,       color: "#60a5fa",
    en: { title: "Invoice Agent",       tagline: "Turn invoices into organised data instantly",  features: ["PDF & image intake", "Converts to editable form", "Expense tracking", "Organised billing"],         ctaLabel: "Try for Free"     },
    ar: { title: "وكيل الفواتير",       tagline: "حوّل الفواتير إلى بيانات منظّمة فوراً",       features: ["استيراد PDF والصور", "تحويل إلى نماذج قابلة للتعديل", "تتبع النفقات", "نظام فوترة منظّم"],         ctaLabel: "جرّب مجاناً"  },
    href: "/agents/billing", ctaHref: "https://app.electi.sa/login",
  },
  {
    icon: Scale,         color: "#f59e0b",
    en: { title: "Legal Agent",         tagline: "Expert legal guidance on demand",              features: ["Saudi labor law", "Visa guidance", "Document analysis", "Compliance checks"],                        ctaLabel: "Try for Free"     },
    ar: { title: "الوكيل القانوني",     tagline: "إرشادات قانونية خبيرة عند الطلب",             features: ["نظام العمل السعودي", "إرشادات التأشيرة", "تحليل الوثائق", "فحوصات الامتثال"],                       ctaLabel: "جرّب مجاناً"  },
    href: "/agents/legal", ctaHref: "https://app.electi.sa/login",
  },
  {
    icon: BarChart3,     color: "#a78bfa",
    en: { title: "Sales & Reservation", tagline: "Close deals while you sleep",                 features: ["WhatsApp CRM", "Reservation handling", "Lead automation", "Pipeline reports"],                       ctaLabel: "Request Demo" },
    ar: { title: "المبيعات والحجوزات", tagline: "أغلق الصفقات وأنت نائم",                       features: ["CRM واتساب", "معالجة الحجوزات", "أتمتة العملاء المحتملين", "تقارير المسار"],                       ctaLabel: "طلب عرض"      },
    href: "/agents/sales", ctaHref: "/contact",
  },
];

const industriesGrid = [
  { icon: Activity,   en: "Healthcare",   ar: "الرعاية الصحية",  href: "/industries/healthcare"   },
  { icon: Globe,      en: "Real Estate",  ar: "العقارات",         href: "/industries/real-estate"  },
  { icon: Users,      en: "Hospitality",  ar: "الضيافة",          href: "/industries/hospitality"  },
  { icon: Shield,     en: "Construction", ar: "البناء",           href: "/industries/construction" },
  { icon: BarChart3,  en: "Retail",       ar: "البيع بالتجزئة",  href: "/industries/retail"       },
  { icon: TrendingUp, en: "Enterprise",   ar: "المؤسسات",         href: "/industries/corporate"    },
];

const agentPillBg: Record<string, string> = {
  Personal: "rgba(74,222,128,0.14)",
  Invoice:  "rgba(96,165,250,0.14)",
  Legal:    "rgba(245,158,11,0.14)",
  Sales:    "rgba(167,139,250,0.14)",
};
const agentPillFg: Record<string, string> = {
  Personal: "rgba(74,222,128,0.85)",
  Invoice:  "rgba(96,165,250,0.85)",
  Legal:    "rgba(245,158,11,0.85)",
  Sales:    "rgba(167,139,250,0.85)",
};

const stepsRaw = [
  { n: "01", icon: null,         en: { title: "Connect WhatsApp",      desc: "Link your number in under 60 seconds — no code, no waiting."                      }, ar: { title: "ربط واتساب",                   desc: "اربط رقمك في أقل من 60 ثانية — بدون كود، بدون انتظار."                    } },
  { n: "02", icon: null,         en: { title: "Choose Agents",         desc: "Pick from 4 specialized agents. Deploy one or all."                               }, ar: { title: "اختر الوكلاء",                  desc: "اختر من 4 وكلاء متخصصين. انشر واحداً أو الكل."                             } },
  { n: "03", icon: null,         en: { title: "Grant Secure Access",   desc: "Connect your Google or any system you want the AI to handle."                     }, ar: { title: "منح وصول آمن",                  desc: "اربط Google أو أي نظام تريد من الذكاء الاصطناعي إدارته."                   } },
  { n: "04", icon: CheckCircle,  en: { title: "Your AI Agent is Ready",desc: "Your agent works as an assistant 24/7 — everything on WhatsApp."                  }, ar: { title: "وكيل الذكاء الاصطناعي جاهز",   desc: "يعمل وكيلك مساعداً 24/7 — كل شيء عبر واتساب."                             } },
  { n: "05", icon: Activity,     en: { title: "Monitor Everything",    desc: "Real-time dashboard for every action, outcome, and hour saved."                   }, ar: { title: "راقب كل شيء",                   desc: "لوحة تحكم لحظية لكل إجراء ونتيجة وساعة توفير."                            } },
];

/* Thin gradient rule — same glow line as the hero */
function GlowRule() {
  return (
    <motion.div
      variants={fadeUp}
      className="h-px mx-auto"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        width: "clamp(80px, 16vw, 220px)",
      }}
    />
  );
}

/* ── Mobile: swipeable agent carousel ─────────────────────────────── */
function MobileAgentsCarousel({
  active,
  setActive,
}: {
  active: number;
  setActive: (fn: (p: number) => number) => void;
}) {
  const { t, isAr } = useLang();
  const [, setLocation] = useLocation();
  const agents = agentsRaw.map(a => ({ ...a, ...(isAr ? a.ar : a.en) }));
  const agent = agents[active];
  const Icon  = agent.icon;

  return (
    <div className="w-full px-5">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-3">
          <Zap className="w-3 h-3" /> {t("intelligentAgentsBadge")}
        </div>
        <h2 className="text-2xl font-700 mb-2">{t("meetTeam")}</h2>
        <div className="h-px mx-auto w-24" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
      </div>

      {/* Swipeable card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: isAr ? -28 : 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isAr ? 28 : -28 }}
          transition={{ duration: 0.26, ease }}
          className="rounded-2xl border p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.08)",
            borderTopWidth: 2,
            borderTopColor: agent.color,
          }}
        >
          {/* Agent identity */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}30` }}>
              <Icon className="w-5 h-5" style={{ color: agent.color }} />
            </div>
            <div>
              <h3 className="font-700 text-sm text-white leading-tight">{agent.title}</h3>
              <p className="text-white/38 text-xs mt-0.5">{agent.tagline}</p>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {agent.features.map(f => (
              <span key={f}
                className="px-2.5 py-1 rounded-full text-[10px] font-500 text-white/65"
                style={{ background: `${agent.color}10`, border: `1px solid ${agent.color}20` }}>
                {f}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-2">
            <div className="flex-1 cursor-pointer" onClick={() => window.open(agent.ctaHref ?? "https://app.electi.sa/login", "_self")}>
              <div className="flex items-center justify-center py-2.5 rounded-xl text-xs font-700 text-black"
                style={{ background: "rgba(255,255,255,0.92)" }}>
                {agent.ctaLabel}
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setLocation(agent.href)}>
              <div className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-600 text-white/45"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
                {t("exploreAgent")}
                <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isAr ? "rotate-180" : ""}`} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {agents.map((_, i) => (
          <button key={i} onClick={() => setActive(() => i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6, height: 6,
              background: i === active ? agents[active].color : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <motion.div
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
        <p className="text-white/55 text-[10px] tracking-[0.22em] uppercase">
          {isAr ? "اسحب للتصفح" : "swipe to explore"}
        </p>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Mobile: steps timeline ────────────────────────────────────────── */
function MobileStepsTimeline() {
  const { t, isAr } = useLang();
  const steps = stepsRaw.map(s => ({ ...s, ...(isAr ? s.ar : s.en) }));
  return (
    <div className="w-full px-5">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-3">
          <Activity className="w-3 h-3" /> {t("processBadge")}
        </div>
        <h2 className="text-2xl font-700 mb-2">{t("upRunning")}</h2>
        <div className="h-px mx-auto w-24" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
      </div>

      {/* Timeline */}
      <div className={`relative ${isAr ? "pr-10" : "pl-10"}`}>
        {/* Connecting line */}
        <div
          className="absolute top-3 bottom-3 w-px"
          style={{
            [isAr ? "right" : "left"]: "15px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
          }}
        />

        {steps.map((step, i) => {
          const isReady = step.icon === CheckCircle;
          const StepIcon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease }}
              className={`relative flex gap-4 ${i < steps.length - 1 ? "mb-6" : ""}`}
            >
              {/* Node */}
              <div className={`absolute w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 ${isAr ? "-right-10" : "-left-10"}`}
                style={{
                  background: isReady ? "rgba(74,222,128,0.14)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isReady ? "rgba(74,222,128,0.32)" : "rgba(255,255,255,0.10)"}`,
                }}>
                {StepIcon
                  ? <StepIcon className="w-3 h-3" style={{ color: isReady ? "#4ade80" : "rgba(255,255,255,0.4)" }} />
                  : <span className="text-[9px] font-700 text-white/40">{step.n}</span>
                }
              </div>

              {/* Content */}
              <div>
                <h3 className="font-700 text-sm text-white mb-0.5">{step.title}</h3>
                <p className="text-white/32 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* Shared snap-section wrapper */
function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </section>
  );
}


export default function Home() {
  const { t, isAr } = useLang();
  const [, setLocation] = useLocation();
  const agents = agentsRaw.map(a => ({ ...a, ...(isAr ? a.ar : a.en) }));
  const steps  = stepsRaw.map(s => ({ ...s, ...(isAr ? s.ar : s.en) }));
  const [showScroll, setShowScroll] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  /* ── Hero: Spline mouse tracking ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const splineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastSplineDispatch = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const now = e.timeStamp;
      if (now - lastSplineDispatch.current < 33) return;
      lastSplineDispatch.current = now;
      if (!splineCanvasRef.current && splineContainerRef.current) {
        splineCanvasRef.current = splineContainerRef.current.querySelector("canvas");
      }
      if (splineCanvasRef.current) {
        splineCanvasRef.current.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: false, cancelable: false,
            clientX: e.clientX, clientY: e.clientY,
            screenX: e.screenX, screenY: e.screenY,
            movementX: e.movementX, movementY: e.movementY,
          })
        );
      }
    };
    hero.addEventListener("mousemove", onMove, { passive: true });
    return () => hero.removeEventListener("mousemove", onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Hero: layout breakpoints ── */
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    const checkLarge   = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkDesktop(); checkLarge();
    window.addEventListener("resize", checkDesktop);
    window.addEventListener("resize", checkLarge);
    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("resize", checkLarge);
    };
  }, []);

  /* ── Mobile agent carousel state ── */
  const [agentIdx, setAgentIdx] = useState(0);
  const agentIdxRef = useRef(0);
  const agentsSectionRef = useRef<HTMLElement>(null);
  useEffect(() => { agentIdxRef.current = agentIdx; }, [agentIdx]);

  /* ── Full-section horizontal swipe for agents (mobile) ── */
  useEffect(() => {
    const el = agentsSectionRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    // Non-passive so we can preventDefault to block the parent snap-scroll
    const onMove = (e: TouchEvent) => {
      if (window.innerWidth >= 640) return; // mobile only
      const dy = e.touches[0].clientY - startY; // negative = finger moved up = scroll-down intent
      const dx = Math.abs(e.touches[0].clientX - startX);
      const absDy = Math.abs(dy);
      // Finger moving up (dy < 0) while not on last agent → block parent scroll
      if (absDy > dx && dy < -8 && agentIdxRef.current < agentsRaw.length - 1) {
        e.preventDefault();
      }
    };

    const onEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX; // positive = swipe left
      const dy = startY - e.changedTouches[0].clientY; // positive = finger moved up = scroll-down intent
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (window.innerWidth >= 640) return; // mobile only

      // Horizontal swipe → change agent card
      if (absDx >= 35 && absDx > absDy) {
        const dir = dx > 0 ? 1 : -1;
        const next = agentIdxRef.current + dir;
        if (next >= 0 && next < agentsRaw.length) setAgentIdx(next);
        return;
      }

      // Downward scroll intent (dy > 0) while not at last agent → advance to next card
      if (absDy > absDx && dy > 40 && agentIdxRef.current < agentsRaw.length - 1) {
        setAgentIdx(agentIdxRef.current + 1);
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false });
    el.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setShowScroll(true), 1600);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      if (st > lastScrollTop.current && st > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollTop.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <div
      ref={scrollContainerRef}
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
      {/* Hide webkit scrollbar */}
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      <SEOHead path="/" schemas={[organizationSchema, websiteSchema]} />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section style={{ height: "100dvh", scrollSnapAlign: "start", overflow: "hidden", flexShrink: 0 }}>
        <div
          ref={heroRef}
          className="relative flex flex-col items-center overflow-hidden"
          style={{ height: "100dvh", background: "#000" }}
        >
          {/* GIF — centered, behind text — mobile only (< 768px) */}
          <div
            className="md:hidden absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ zIndex: 2 }}
          >
            <img
              src="/dev-hero.gif"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              style={{
                width: "clamp(302px, 76vw, 470px)",
                height: "clamp(302px, 76vw, 470px)",
                objectFit: "contain",
                opacity: 0.90,
              }}
            />
          </div>

          {/* Text — z-7 */}
          <div
            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            style={{
              zIndex: 7,
              paddingTop: 40,
              alignItems: isDesktop ? (isAr ? "center" : "flex-start") : "center",
              paddingLeft: isDesktop ? (isAr ? "clamp(2rem, 6vw, 6rem)" : "clamp(2rem, 6vw, 9rem)") : "clamp(1.5rem, 6vw, 3rem)",
              paddingRight: isDesktop ? "52%" : "clamp(1.5rem, 6vw, 3rem)",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9, ease }}
              className="font-thin text-white leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 5.5vmin, 3.2rem)",
                textAlign: isDesktop ? "start" : "center",
                textShadow: "0 2px 32px rgba(0,0,0,0.95)",
                fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif",
                letterSpacing: isAr ? "0.05em" : "0.2em",
              }}
            >
              {isAr
                ? "وكلاء الذكاء الاصطناعي لأعمالك"
                : "AI Agents For Your Business"}
            </motion.h1>

            <div className="flex w-full" style={{ margin: "18px 0", justifyContent: isDesktop ? "flex-start" : "center" }}>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.7, ease }}
                style={{
                  transformOrigin: isDesktop ? "left" : "center",
                  width: "clamp(80px, 20vw, 240px)",
                  height: 1,
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="font-thin text-white/55 leading-snug"
              style={{
                fontSize: "clamp(0.62rem, 2.0vw, 0.82rem)",
                textAlign: isDesktop ? "start" : "center",
                textShadow: "0 1px 16px rgba(0,0,0,0.95)",
                fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif",
                letterSpacing: isAr ? "0.05em" : "0.12em",
                whiteSpace: isAr ? undefined : "nowrap",
              }}
            >
              {isAr
                ? "منصة ذكاء اصطناعي للشركات السعودية — مرحباً بك في إليكتي"
                : "AI Agent Platform for Saudi Businesses — Welcome to Electi"}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.65, ease }}
              className="flex flex-wrap gap-3 mt-8"
              style={{ justifyContent: isDesktop ? "flex-start" : "center", pointerEvents: "all" }}
            >
              <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
                <motion.button
                  className="px-7 py-3 rounded-xl font-600 text-[13px] bg-white text-black"
                  style={{ boxShadow: "0 0 24px rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {isAr ? "ابدأ الآن" : "Get Started"}
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button
                  className="px-7 py-3 rounded-xl font-500 text-[13px] border border-white/20 text-white/65 hover:text-white hover:border-white/35 transition-all"
                  style={{ letterSpacing: "0.06em" }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {isAr ? "احجز عرضاً" : "Book a Demo"}
                </motion.button>
              </a>
            </motion.div>
          </div>

          {/* Robot — right half, large desktop only (≥1024px) */}
          {isLargeScreen && (
            <div
              ref={splineContainerRef}
              className="absolute pointer-events-none"
              style={{ right: 0, top: 0, bottom: 0, width: "50%", zIndex: 6 }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          )}

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pb-3 pointer-events-none"
            style={{ zIndex: 7 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.0 }}
          >
            <p className="text-[9px] tracking-[0.34em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
              {isAr ? "مرر للاستكشاف" : "SCROLL TO EXPLORE"}
            </p>
            <div style={{ height: 28, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <motion.div
                className="w-px"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.65), transparent)" }}
                animate={{ height: ["12px", "28px", "12px"] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · WE BUILD AI FOR ══ */}
      <SnapSection>
        <div className="max-w-5xl w-full mx-auto text-center">
          <InViewSection>
            <motion.p variants={fadeUp} className="text-white/30 text-xs font-500 mb-4" style={{ letterSpacing: "0.1em" }}>
              {t("weBuildAIFor")}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-700 leading-tight mb-4">
              <AnimatedTextCycle
                words={isAr
                  ? ["المؤسسات.", "العيادات.", "الضيافة.", "العقارات.", "البناء.", "العمليات."]
                  : ["Enterprises.", "Clinics.", "Hospitality.", "Real Estate.", "Construction.", "Operations."]}
                interval={2200}
              />
            </motion.h2>
            <GlowRule />
            <motion.p variants={fadeUp} className="text-white/32 text-xs max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.1em" }}>
              {isAr ? "كل صناعة. كل سير عمل. منصة واحدة ذكية." : "Every industry. Every workflow. One intelligent platform."}
            </motion.p>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 3 · PHONE SHOWCASE ══ */}
      <section
        className="relative lg:overflow-hidden"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <div className="hidden lg:block" style={{ height: "100vh" }}>
          <PhoneShowcase desktop />
        </div>
        <div className="block lg:hidden">
          <PhoneShowcase desktop={false} />
        </div>
      </section>

      {/* ══ 4 · AGENTS ══ */}
      <section
        ref={agentsSectionRef}
        className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[100dvh] py-0"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        {/* Mobile: swipeable one-card carousel */}
        <div className="block sm:hidden w-full max-w-sm mx-auto py-16">
          <MobileAgentsCarousel active={agentIdx} setActive={setAgentIdx} />
        </div>
        {/* Tablet / Desktop: grid */}
        <div className="hidden sm:block max-w-7xl w-full mx-auto">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4">
                <Zap className="w-3 h-3" /> {t("intelligentAgentsBadge")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">{t("meetTeam")}</h2>
              <GlowRule />
              <p className={`text-white/38 ${isAr ? "max-w-lg" : "max-w-md lg:max-w-none lg:whitespace-nowrap"} mx-auto text-sm mt-3`}>{t("meetTeamSub")}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <motion.div key={agent.title} variants={fadeUp}>
                    <motion.div
                      className="rounded-2xl border cursor-pointer p-5 flex flex-col h-full"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
                      whileHover={{ borderColor: "rgba(255,255,255,0.22)", boxShadow: "0 0 32px rgba(255,255,255,0.06)" }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setLocation(agent.href)}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon className="w-4 h-4 text-white/60" />
                      </div>
                      <h3 className="font-700 text-sm text-white mb-1">{agent.title}</h3>
                      <p className="text-white/32 text-xs mb-3 leading-relaxed">{agent.tagline}</p>
                      <ul className="space-y-1.5 mb-4">
                        {agent.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-white/45">
                            <span className="w-1 h-1 rounded-full flex-shrink-0 bg-white/30" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-4">
                        <motion.div
                          className="flex items-stretch rounded-xl overflow-hidden text-xs font-600"
                          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                          whileHover={{ boxShadow: "0 4px 24px rgba(255,255,255,0.08)" }}
                          transition={{ duration: 0.22 }}
                        >
                          <motion.div
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 cursor-pointer flex-1 font-700 text-black"
                            style={{ background: "rgba(255,255,255,0.88)" }}
                            whileHover={{ background: "rgba(255,255,255,1)" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.16 }}
                            onClick={e => { e.stopPropagation(); window.open(agent.ctaHref ?? "https://app.electi.sa/login", "_self"); }}
                          >
                            {agent.ctaLabel}
                          </motion.div>
                          <div className="w-px flex-shrink-0 bg-white/12" />
                          <motion.div
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-white/35 cursor-pointer flex-1"
                            whileHover={{ color: "rgba(255,255,255,0.9)" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.16 }}
                          >
                            {t("exploreAgent")}
                            <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isAr ? "rotate-180" : ""}`} />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </InViewSection>
        </div>
      </section>

      {/* ══ 5 · HOW IT WORKS ══ */}
      <SnapSection>
        {/* Mobile: connected timeline */}
        <div className="block sm:hidden w-full max-w-sm mx-auto">
          <MobileStepsTimeline />
        </div>
        {/* Tablet / Desktop: original grid */}
        <div className="hidden sm:block max-w-7xl w-full mx-auto">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4">
                <Activity className="w-3 h-3" /> {t("processBadge")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">{t("upRunning")}</h2>
              <GlowRule />
              <p className={`text-white/38 ${isAr ? "max-w-lg" : "max-w-md lg:max-w-none lg:whitespace-nowrap"} mx-auto text-sm mt-3`}>{t("upRunningSub")}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="rounded-2xl p-5 border border-white/7 hover:border-white/14 transition-colors h-full"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      {step.icon
                        ? <step.icon className="w-4 h-4" style={{ color: step.icon === CheckCircle ? "#4ade80" : undefined, opacity: step.icon === CheckCircle ? 1 : 0.5 }} />
                        : <span className="text-white/50 font-700 text-xs">{step.n}</span>
                      }
                    </div>
                    <h3 className="font-700 text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 6 · INDUSTRY ECOSYSTEM ══ */}
      <SnapSection>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-[11px] font-600 text-white/45 mb-5">
                <Globe className="w-3 h-3" /> {t("industriesBadge")}
              </div>
              <h2 className="text-4xl sm:text-5xl font-700 mb-4">
                {isAr ? (
                  <>{t("builtEvery")}</>
                ) : (
                  <>Built for <span style={{ color: "rgba(255,255,255,0.55)" }}>Every Sector</span></>
                )}
              </h2>
              <GlowRule />
              <p className="text-white/35 text-sm mt-4 mx-auto max-w-lg text-center">
                {isAr
                  ? "يتكيف Electi مع سير عملك — وليس العكس."
                  : "Electi adapts intelligent agents to your workflows — not the other way around."}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {industriesGrid.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <Link href={ind.href} key={ind.en}>
                    <motion.div
                      variants={fadeUp}
                      custom={i}
                      className="glass rounded-2xl p-5 text-center border border-white/7 hover:border-white/15 group hover:bg-white/3 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 border border-white/8 group-hover:bg-white/10 transition-all">
                        <Icon className="text-white/45 group-hover:text-white/75 transition-colors" style={{ width: 18, height: 18 }} />
                      </div>
                      <span className="text-white/48 group-hover:text-white text-xs font-600 transition-colors">
                        {isAr ? ind.ar : ind.en}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 7 · TRUSTED BY ══ */}
      <SnapSection>
        <div className="max-w-7xl w-full mx-auto">
          <InViewSection>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4">
                <CheckCircle className="w-3 h-3" /> {t("testimonialsBadge")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">{t("trustedBy")}</h2>
              <GlowRule />
            </motion.div>
            <motion.div variants={fadeUp} className="-mx-4 sm:-mx-6 lg:-mx-8">
              <TrustedMarquee />
            </motion.div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 8 · FINAL CTA ══ */}
      <SnapSection>
        <div className="w-full text-center">
          <InViewSection>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse flex-shrink-0" />
              {t("startTodayBadge")}
            </motion.div>
            <motion.h2 variants={fadeUp} className={`text-4xl sm:text-5xl lg:text-6xl font-700 leading-tight mb-4${isAr ? "" : " lg:whitespace-nowrap"}`}>
              {isAr ? t("buildWorkforce") : (
                <>Build Your AI{" "}
                  <AnimatedTextCycle
                    words={["Workforce", "Assistant", "Employee"]}
                    interval={2200}
                  />
                  {" "}Today</>
              )}
            </motion.h2>
            <GlowRule />
            <motion.p variants={fadeUp} className={`text-white/42 text-base leading-relaxed mb-8 ${isAr ? "max-w-xl" : "max-w-xl lg:max-w-none lg:whitespace-nowrap"} mx-auto mt-4`}>
              {t("buildWorkforceSub")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-8 px-6 sm:px-0">
              <a href="https://app.electi.sa/login" target="_self" rel="noreferrer" className="w-full sm:w-auto">
                <NeonButton size="xl" className="!w-full sm:!w-auto !px-6 !py-3 !text-sm !rounded-xl sm:!px-10 sm:!py-4 sm:!text-lg sm:!rounded-2xl" data-testid="final-cta-start">
                  {t("footerTryFree")}
                </NeonButton>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <NeonButton variant="ghost" size="xl" className="!w-full sm:!w-auto !px-6 !py-3 !text-sm !rounded-xl sm:!px-10 sm:!py-4 sm:!text-lg sm:!rounded-2xl">{t("talkToSales")}</NeonButton>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/28">
              {[t("trustNoCC"), t("trustDeploy"), t("trustCancel"), t("trustBilingual")].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-white/22" /> {item}
                </span>
              ))}
            </motion.div>
          </InViewSection>
        </div>
      </SnapSection>

      {/* ══ 9 · FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Footer />
      </section>
    </div>
  );
}
