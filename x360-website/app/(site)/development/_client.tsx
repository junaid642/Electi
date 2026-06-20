"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe, Plane,
  ArrowRight, CheckCircle, Code2, Bot, Database, Smartphone, Cpu, Layers, TrendingUp, Award, Settings,
  ChevronDown, Activity, Users, ShoppingCart, BarChart3,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { SplineScene } from "@/components/ui/SplineScene";
import AiServicesCarousel from "@/components/ui/AiServicesCarousel";
import PastProjectsSelector from "@/components/ui/PastProjectsSelector";
import NeonButton from "@/components/ui/NeonButton";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── tiny helpers ───────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ children, noUppercase }: { children: ReactNode; noUppercase?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.18em] ${noUppercase ? "normal-case" : "uppercase"}`}
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}
    >
      {children}
    </span>
  );
}


/* ─── SECTION 4 · TRUSTED BY ─────────────────────────────────────────────── */
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

function TrustedBySection() {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />

      <div className="flex flex-col items-center text-center gap-8 w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionBadge noUppercase>{isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}</SectionBadge>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-thin leading-tight px-6"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em" }}
        >
          {isAr ? "موثوق به من القادة" : "Trusted by Leaders"}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px"
          style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full overflow-hidden py-6 marquee-outer"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />
          <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
            {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center flex-shrink-0 mx-6 sm:mx-8 px-6 py-3 rounded-xl overflow-hidden"
                style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <img
                  src={src}
                  alt={name}
                  className="h-24 w-auto object-contain"
                  style={{
                    filter: "brightness(0) invert(1)",
                    opacity: 0.55,
                    transform: `scale(${scale ?? 1})`,
                    transformOrigin: "center",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 600, height: 80, background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── SECTION 5 · GET IN TOUCH ───────────────────────────────────────────── */
const TRUST_PILLS = [
  { en: "End-to-end delivery",         ar: "تسليم متكامل من البداية للنهاية" },
  { en: "Arabic + English support",    ar: "دعم عربي + إنجليزي"             },
  { en: "Vision 2030 aligned",         ar: "متوافق مع رؤية 2030"            },
];

function ContactSection() {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const openConsultation = () => {
    window.location.href = `mailto:info@x-360.ai?subject=${encodeURIComponent("Schedule Consultation — X360 Web & AI")}&body=${encodeURIComponent("Hello X360 team,\n\nI'd like to schedule a consultation.\n\nName:\nCompany:\nPhone:\n")}`;
  };
  const openDemo = () => {
    window.location.href = `mailto:info@x-360.ai?subject=${encodeURIComponent("Request Demo — X360 Web & AI")}&body=${encodeURIComponent("Hello X360 team,\n\nI'd like to request a demo.\n\nName:\nCompany:\nPhone:\n")}`;
  };

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center px-6 pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.025) 0%, transparent 65%)" }} />

      <div className="w-full text-center flex flex-col items-center gap-6">
        {/* Pulsing badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-white/40"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse flex-shrink-0" />
          {isAr ? "تواصل معنا" : "Get In Touch"}
        </motion.div>

        {/* Big heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="font-thin leading-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em" }}
        >
          {isAr ? "لنبنِ معاً" : "Let's Build Together"}
        </motion.h2>

        {/* Glow rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px"
          style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="text-base leading-relaxed mx-auto"
          style={{ color: "rgba(255,255,255,0.38)", maxWidth: 520 }}
        >
          {isAr
            ? "شارك مع X360 لبناء منظومتك الرقمية الكاملة — من الموقع إلى الذكاء الاصطناعي إلى الأنظمة المؤسسية."
            : "Partner with X360 to build your complete digital ecosystem — from website to AI to enterprise systems."}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="flex justify-center"
        >
          <Link href="/contact">
            <NeonButton size="xl"
              className="!px-10 !py-3.5 !text-sm !rounded-xl sm:!px-12 sm:!py-4 sm:!text-base sm:!rounded-2xl">
              {isAr ? "تواصل معنا" : "Contact Us"}
            </NeonButton>
          </Link>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex flex-wrap items-center justify-center gap-5 text-xs"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {TRUST_PILLS.map(({ en, ar }) => (
            <span key={en} className="flex items-center gap-1.5">
              <CheckCircle size={12} style={{ color: "rgba(255,255,255,0.45)" }} />
              {isAr ? ar : en}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── SNAP SECTION WRAPPER ───────────────────────────────────────────────── */
function SnapSection({ children, style, id, className }: { children: ReactNode; style?: React.CSSProperties; id?: string; className?: string }) {
  return (
    <section id={id} className={className} style={{ height: "100dvh", scrollSnapAlign: "start", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </section>
  );
}

/* ─── HERO TECH ORBIT VISUAL ─────────────────────────────────────────────── */
const ORBIT_ICONS = [Globe, Bot, Smartphone, Database, Code2, Cpu, Layers, TrendingUp];
const ORBIT_COLORS = ["#6BA3D6", "#9B8FC4", "#52D39B", "#D4916A", "#6BA3D6", "#9B8FC4", "#52D39B", "#D4916A"];

function TechOrbit() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: "min(78vmin, 620px)", height: "min(78vmin, 620px)" }}>
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{ inset: 0, borderColor: "rgba(255,255,255,0.04)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner ring */}
      <div
        className="absolute rounded-full border"
        style={{ inset: "20%", borderColor: "rgba(255,255,255,0.055)" }}
      />

      {/* Outer orbit icons */}
      {ORBIT_ICONS.map((Icon, i) => {
        const angle = (i / ORBIT_ICONS.length) * Math.PI * 2;
        const r = 42; // % of container
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-xl"
            style={{
              left: `${x}%`, top: `${y}%`,
              transform: "translate(-50%, -50%)",
              width: 40, height: 40,
              background: `${ORBIT_COLORS[i]}16`,
              border: `1px solid ${ORBIT_COLORS[i]}28`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.07, duration: 0.5, ease }}
          >
            <Icon size={15} style={{ color: `${ORBIT_COLORS[i]}CC` }} />
          </motion.div>
        );
      })}

      {/* Center glow orb */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: "24%", height: "24%", top: "38%", left: "38%" }}
        animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 60px rgba(255,255,255,0.22)", "0 0 0px rgba(255,255,255,0)"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)" }}
        />
      </motion.div>
    </div>
  );
}

/* ─── ANIMATED TEXT CYCLE ────────────────────────────────────────────────── */
function AnimatedTextCycle({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center shimmer-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── INDUSTRIES GRID DATA ───────────────────────────────────────────────── */
const industriesGrid = [
  { icon: Layers,       en: "Real Estate",           ar: "العقارات",              href: "/development/website/real-estate"  },
  { icon: Users,        en: "Hospitality",          ar: "الضيافة",               href: "/development/website/hospitality"  },
  { icon: Activity,     en: "Healthcare",            ar: "الرعاية الصحية",       href: "/development/website/healthcare"   },
  { icon: BarChart3,    en: "Retail",                ar: "البيع بالتجزئة",       href: "/development/website/retail"       },
  { icon: ShoppingCart, en: "E-Commerce",            ar: "التجارة الإلكترونية",  href: "/development/website/commerce"     },
  { icon: TrendingUp,   en: "Enterprise",            ar: "المؤسسات",             href: "/development/website/corporate"    },
  { icon: Plane,        en: "Private Jets & Yachts", ar: "الطيران الخاص واليخوت", href: "/development/website/private-jet" },
];


function GlowRuleCenter() {
  return (
    <div style={{ width: "clamp(80px, 16vw, 180px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)", margin: "0 auto" }} />
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function WebAIMainClient() {
  const { isAr } = useLang();

  const splineContainerRef = useRef<HTMLDivElement>(null);
  const splineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lastSplineDispatch = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      // Throttle Spline to ~30 fps — it runs heavy 3D calculations on every event
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

  // Layout breakpoint (768px) — controls text alignment, padding, GIF visibility
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Spline breakpoint (1024px) — WebGL 3D scene only on true desktop; landscape
  // mobile (768-1023px) excluded because async WebGL/fetch errors escape ErrorBoundary
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Stars
  type Star = { x: number; y: number; r: number; opacity: number; twinkle: boolean };
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, () => {
        const r = Math.random();
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: r < 0.72 ? 0.8 : r < 0.92 ? 1.4 : 2.2,
          opacity: 0.35 + Math.random() * 0.55,
          twinkle: Math.random() < 0.2,
        };
      })
    );
  }, []);

  // Section / showcase tab tracking
  // Sections in DOM order — must match the SnapSection ids below exactly
  const SECTION_IDS = [
    "sec-hero",              // 0
    "sec-webbuild",          // 1
    "sec-our-services",      // 2
    "sec-sector",            // 3
    "sec-projects",          // 4
    "sec-ai-services",       // 5
    "sec-trusted",           // 6
    "sec-contact",           // 7
    "sec-footer",            // 8
  ] as const;
  const SECTION_COUNT = SECTION_IDS.length;

  const currentSectionRef = useRef(0);
  const lastWheelRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const body = document.body;
    body.style.scrollbarWidth = "none";

    // IntersectionObserver keeps currentSectionRef in sync with what's actually
    // on screen — prevents drift when smooth-scroll takes longer than the throttle.
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) currentSectionRef.current = idx; },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      const now = Date.now();
      if (now - lastWheelRef.current < 700) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextSec = currentSectionRef.current + dir;
      if (nextSec < 0 || nextSec >= SECTION_COUNT) return;
      lastWheelRef.current = now;
      isScrollingRef.current = true;
      document.getElementById(SECTION_IDS[nextSec])?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      body.style.scrollbarWidth = "";
      window.removeEventListener("wheel", onWheel);
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <div style={{ background: "#000" }}>
      <style>{`
        ::-webkit-scrollbar{display:none}
        @keyframes twinkle{0%,100%{opacity:var(--tw-op);transform:translate(-50%,-50%) scale(1)}50%{opacity:calc(var(--tw-op)*0.3);transform:translate(-50%,-50%) scale(0.6)}}
      `}</style>

      {/* ══ 1 · HERO ══ */}
      <SnapSection id="sec-hero">
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
              src="/x360/dev-hero.gif"
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
              style={{ fontSize: "clamp(1.6rem, 5.5vmin, 3.2rem)", textAlign: isDesktop ? "start" : "center", textShadow: "0 2px 32px rgba(0,0,0,0.95)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: isAr ? "0.05em" : "0.2em" }}
            >
              {isAr ? "تطوير الويب والذكاء الاصطناعي" : "Web & AI Development"}
            </motion.h1>
            <div className="flex w-full" style={{ margin: "18px 0", justifyContent: isDesktop ? "flex-start" : "center" }}>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.7, ease }}
                style={{ transformOrigin: isDesktop ? "left" : "center", width: "clamp(80px, 20vw, 240px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="font-thin text-white/55 leading-snug"
              style={{ fontSize: "clamp(0.62rem, 2.0vw, 0.82rem)", textAlign: isDesktop ? "start" : "center", textShadow: "0 1px 16px rgba(0,0,0,0.95)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: isAr ? "0.05em" : "0.12em", whiteSpace: isAr ? undefined : "nowrap" }}
            >
              {isAr ? "شريك التحول الرقمي — مرحباً بك في X360" : "Your Digital Transformation Partner — Welcome to X360"}
            </motion.p>
          </div>

          {/* Robot — right half, large desktop only (≥1024px) — landscape mobile excluded to prevent WebGL errors */}
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
      </SnapSection>

      {/* ══ 2 · WE BUILD FOR ══ */}
      <SnapSection id="sec-webbuild">
        <div className="relative flex flex-col items-center justify-center overflow-hidden pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
          <div className="max-w-5xl w-full mx-auto text-center px-6">
            <FadeUp delay={0.08}>
              <p className="text-white/30 font-medium mb-4" style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                {isAr ? "نبني من أجل" : "We Build For"}
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <h2 className="font-thin leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
                <AnimatedTextCycle
                  words={isAr
                    ? ["العقارات.", "المقاولات.", "العيادات.", "الفنادق.", "المطاعم.", "المنتجعات.", "التجزئة.", "المؤسسات.", "صالات العرض.", "الرعاية الصحية.", "الضيافة.", "البنية التحتية.", "العمارة.", "المدن الذكية.", "المجمعات الفاخرة."]
                    : ["Real Estate.", "Construction.", "Clinics.", "Hotels.", "Restaurants.", "Resorts.", "Retail.", "Enterprises.", "Showrooms.", "Healthcare.", "Hospitality.", "Infrastructure.", "Architecture.", "Smart Cities.", "Luxury Estates."]}
                  interval={2000}
                />
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}>
              <GlowRuleCenter />
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/30 max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                {isAr ? "كل قطاع. كل سير عمل. منصة ذكية واحدة." : "Every industry. Every workflow. One intelligent platform."}
              </p>
            </FadeUp>
          </div>
        </div>
      </SnapSection>

      {/* ══ 2 · OUR SERVICES ══ */}
      <SnapSection id="sec-our-services">
        <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
          <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
          <div className="max-w-5xl w-full mx-auto">
            <FadeUp delay={0.05} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-5"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Code2 className="w-3 h-3" /> {isAr ? "خدماتنا" : "Our Services"}
              </div>
              <h2 className="text-4xl sm:text-5xl font-thin mb-4">
                {isAr ? <>ما <span className="shimmer-text">نبنيه</span></> : <>What We <span className="shimmer-text">Build</span></>}
              </h2>
              <GlowRuleCenter />
              <p className="text-white/35 text-sm mt-4 mx-auto max-w-lg text-center">
                {isAr
                  ? "حلول رقمية متكاملة — من البرمجة المخصصة إلى منصات الذكاء الاصطناعي، مصممة للأعمال السعودية."
                  : "End-to-end digital solutions — from custom code to AI-powered platforms, built for Saudi businesses."}
              </p>
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: Code2,      en: "Custom Code",           ar: "تطوير مخصص",               href: "/development/website" },
                { icon: Globe,      en: "Website Development",   ar: "تطوير المواقع",             href: "/development/website" },
                { icon: Smartphone, en: "App Development",       ar: "تطوير التطبيقات",           href: "/development/website" },
                { icon: Database,   en: "ERP & SAP Development", ar: "أنظمة ERP وSAP",           href: "/development/erp-sap" },
                { icon: Bot,        en: "AI Development",        ar: "تطوير الذكاء الاصطناعي",   href: "/development/ai-solutions" },
              ].map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <FadeUp key={svc.en} delay={0.12 + i * 0.08}>
                    <Link href={svc.href}>
                      <motion.div
                        className="rounded-2xl p-5 text-center border cursor-pointer group flex flex-col items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", height: 120 }}
                        whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <Icon className="w-[18px] h-[18px] text-white/45 group-hover:text-white/75 transition-colors" />
                        </div>
                        <span className="text-white/48 group-hover:text-white text-xs font-semibold transition-colors leading-tight">
                          {isAr ? svc.ar : svc.en}
                        </span>
                      </motion.div>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </SnapSection>

      {/* ══ 3 · BUILT FOR EVERY SECTOR ══ */}
      <SnapSection id="sec-sector">
        <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-[88px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
          <div className="max-w-7xl w-full mx-auto">
            <FadeUp delay={0.05} className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-5"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Globe className="w-3 h-3" /> {isAr ? "القطاعات" : "Industry"}
              </div>
              <h2 className="text-4xl sm:text-5xl font-thin mb-4">
                {isAr ? <>ابحث <span className="shimmer-text">حسب القطاع</span></> : <>Search <span className="shimmer-text">by Industry</span></>}
              </h2>
              <GlowRuleCenter />
              <p className="hidden sm:block text-white/35 text-sm mt-4 mx-auto max-w-lg text-center">
                {isAr
                  ? "X360 تُكيِّف التقنية الذكية لأعمالك — وليس العكس."
                  : "X360 adapts intelligent technology to your business — not the other way around."}
              </p>
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {industriesGrid.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <FadeUp key={ind.en} delay={0.12 + i * 0.07}>
                    <Link href={ind.href}>
                      <motion.div className="rounded-2xl p-3 sm:p-5 text-center border cursor-pointer group flex flex-col items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", height: 120 }}
                        whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <Icon className="w-[18px] h-[18px] text-white/45 group-hover:text-white/75 transition-colors" />
                        </div>
                        <span className="text-white/48 group-hover:text-white text-xs font-semibold transition-colors leading-tight">
                          {isAr ? ind.ar : ind.en}
                        </span>
                      </motion.div>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>

            <FadeUp delay={0.7} className="text-center mt-7 sm:mt-10">
              <p className="text-white/30 text-sm">
                {isAr ? "غير متأكد؟" : "Not sure?"}{" "}
                <Link href="/contact" className="text-white/60 underline underline-offset-4 hover:text-white transition-colors">
                  {isAr ? "تحدث مع خبير" : "Talk to an expert"}
                </Link>
              </p>
            </FadeUp>
          </div>
        </div>
      </SnapSection>

      {/* ══ 5 · PAST PROJECTS ══ */}
      <SnapSection id="sec-projects">
        {/* Desktop: full past-projects selector */}
        <div className="hidden sm:block h-full">
          <PastProjectsSelector />
        </div>
        {/* Mobile: show Trusted By section instead */}
        <div className="sm:hidden h-full">
          <TrustedBySection />
        </div>
      </SnapSection>

      {/* ══ 5 · AI SERVICES CAROUSEL ══ */}
      <SnapSection id="sec-ai-services">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden px-0 pt-[88px] sm:pt-0"
          style={{ height: "100dvh", background: "#000" }}
        >
          <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3">
            <FadeUp delay={0.05} className="text-center mb-2 sm:mb-4">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-2 sm:mb-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <Bot className="w-3 h-3" /> {isAr ? "خدمات الذكاء الاصطناعي" : "AI Services"}
              </div>
              <h2 className="hidden sm:block text-2xl sm:text-5xl font-thin mb-2 sm:mb-3">
                {isAr ? <>حلول <span className="shimmer-text">ذكاء اصطناعي</span> متقدمة</> : <>Intelligent <span className="shimmer-text">AI Solutions</span></>}
              </h2>
              <GlowRuleCenter />
            </FadeUp>
          </div>
          <AiServicesCarousel />
        </div>
      </SnapSection>

      {/* ══ 7 · TRUSTED BY ══ (desktop only — mobile sees it in sec-projects) */}
      <SnapSection id="sec-trusted" className="hidden sm:block">
        <TrustedBySection />
      </SnapSection>

      {/* ══ 5 · GET IN TOUCH ══ */}
      <SnapSection id="sec-contact">
        <ContactSection />
      </SnapSection>

      {/* ══ 7 · FOOTER ══ */}
      <section id="sec-footer" style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
        <Footer />
      </section>

      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
