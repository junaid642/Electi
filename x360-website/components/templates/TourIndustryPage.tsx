"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Globe, Clock, Building2, Eye, TrendingDown,
  MessageSquare, Users, Lock, Briefcase, ImageOff,
  CheckCircle, Layers, Cpu, Zap, Star, BarChart3,
  Landmark, ShoppingBag, Activity, Home, Coffee, Shield,
  MousePointer, Move, Headphones, VolumeX, Volume2, Box,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaConfig } from "@/lib/useMediaConfig";
import type { IndustryData } from "@/data/tour-industries";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as const;

const AIRCRAFT_TRUST_LOGOS = [
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
const AIRCRAFT_TRUST_DOUBLED = [...AIRCRAFT_TRUST_LOGOS, ...AIRCRAFT_TRUST_LOGOS];

function TrustedByMobileSection() {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="sm:hidden relative flex flex-col items-center justify-center" style={{ height: "100dvh", background: "#000", scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
      <div className="flex flex-col items-center text-center gap-8 w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block px-3 py-1 rounded-full text-[9px] tracking-[0.18em] uppercase" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.7)" }}>
            {isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
          </span>
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
          <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />
          <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
            {AIRCRAFT_TRUST_DOUBLED.map(({ src, name, scale }, i) => (
              <div key={i} className="inline-flex items-center justify-center flex-shrink-0 mx-6 px-6 py-3 rounded-xl overflow-hidden"
                style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src={src} alt={name} className="h-24 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const TOUR_URL = "https://ww.x-360.in/virtualtour/b4f09392/2336103";
const INSTRUCTIONS = [
  { icon: MousePointer, label: "Click To Navigate",  labelAr: "انقر للتنقل"       },
  { icon: Move,         label: "Drag To Explore",    labelAr: "اسحب للاستكشاف"    },
  { icon: Headphones,   label: "Immersive Audio",    labelAr: "صوت غامر"           },
  { icon: Box,          label: "View In VR",         labelAr: "عرض في VR"          },
];

function TryItSection() {
  const { isAr } = useLang();
  const get = useMediaConfig();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [audioChoice, setAudioChoice] = useState<"pending" | "on" | "off">("off");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeActive, setIframeActive] = useState(false);
  const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildSrc = () => {
    const url = get("virtual-tours.tour-url", TOUR_URL);
    return audioChoice === "off" ? `${url}&ts=0` : url;
  };

  const handleOverlayClick = () => {
    setIframeActive(true);
    if (activeTimer.current) clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => setIframeActive(false), 5000);
  };

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center px-4 sm:px-6 pt-[60px]" style={{ height: "100dvh", background: "#000", scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(96,165,250,0.04) 0%, transparent 65%)" }} />
      <div className="w-full max-w-[860px] flex flex-col items-center gap-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <h2 className="font-thin leading-tight text-center" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em" }}>
            {isAr ? "جرِّبها بنفسك!" : "Try it for Yourself !"}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px"
            style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
          />
        </motion.div>
        {/* Instruction bar — hidden on mobile to keep iframe as tall as possible */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 px-4"
        >
          {INSTRUCTIONS.map(({ icon: Icon, label, labelAr }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={11} style={{ color: "rgba(255,255,255,0.45)" }} />
              <span className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
                {isAr ? labelAr : label}
              </span>
            </div>
          ))}
        </motion.div>
        {/* Viewer frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="tip-try-frame relative w-full overflow-hidden rounded-2xl h-[min(calc(100dvh-180px),520px)] sm:h-auto sm:aspect-[16/9]"
          style={{
            background: "#000",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 48px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {inView && audioChoice !== "pending" && (
            <iframe
              ref={iframeRef}
              src={buildSrc()}
              className="absolute inset-0 w-full h-full"
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
              allowFullScreen
              style={{ border: "none" }}
            />
          )}
          {audioChoice !== "pending" && !iframeActive && (
            <div
              onClick={handleOverlayClick}
              className="absolute inset-0 flex items-end justify-center pb-4"
              style={{ zIndex: 6, cursor: "pointer" }}
            >
              <span
                className="text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.35)",
                  pointerEvents: "none",
                }}
              >
                {isAr ? "انقر للتفاعل مع الجولة" : "Click to interact with tour"}
              </span>
            </div>
          )}
          <AnimatePresence>
            {audioChoice === "pending" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                style={{ background: "rgba(2,2,4,0.92)", backdropFilter: "blur(12px)", zIndex: 10 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.06)", "0 0 0 24px rgba(255,255,255,0)", "0 0 0 0 rgba(255,255,255,0)"] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  <Headphones size={44} style={{ color: "rgba(255,255,255,0.6)" }} />
                </motion.div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {isAr ? "تمكين تجربة الصوت الغامر؟" : "Enable Immersive Audio Experience?"}
                  </p>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.32)" }}>
                    {isAr ? "يُنصح بسماعات الأذن للتجربة الكاملة" : "Headphones recommended for the full experience"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAudioChoice("on")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-semibold"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.9)" }}
                  >
                    <Volume2 size={13} /> {isAr ? "تمكين الصوت" : "Enable Audio"}
                  </button>
                  <button
                    onClick={() => setAudioChoice("off")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-semibold"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)" }}
                  >
                    <VolumeX size={13} /> {isAr ? "متابعة بصامت" : "Continue Silent"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Clock, Building2, Eye, TrendingDown, MessageSquare, Users,
  Lock, Briefcase, ImageOff, CheckCircle, Layers, Cpu, Zap, Star,
  BarChart3, Landmark, ShoppingBag, Activity, Home, Coffee, Shield,
};

/* ─── helpers ──────────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "", root }: { children: ReactNode; delay?: number; className?: string; root?: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px", root });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "", style, root }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties; root?: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px", root });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}
    >
      {children}
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
  { src: "/x360/clients/zonoza.webp",          name: "Zonoza Group",    scale: 2.0 },
  { src: "/x360/clients/limonaia.webp",       name: "Limonaia"          },
  { src: "/x360/clients/client15.webp",       name: "Client 15"         },
  { src: "/x360/clients/client16.webp",       name: "Client 16"         },
  { src: "/x360/clients/client17.webp",       name: "Client 17"         },
  { src: "/x360/clients/client18.webp",       name: "Client 18"         },
  { src: "/x360/clients/client19.webp",       name: "Client 19"         },
  { src: "/x360/clients/client20.webp",       name: "Client 20"         },
  { src: "/x360/clients/client21.webp",       name: "Client 21"         },
];
const TRUST_DOUBLED = [...TRUST_LOGOS, ...TRUST_LOGOS];

/* ═══ MAIN COMPONENT ════════════════════════════════════════════════════════ */
export default function TourIndustryPage({ data }: { data: IndustryData }) {
  const { isAr } = useLang();
  const get = useMediaConfig();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Don't throttle when near the bottom — lets footer scroll freely
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - el.clientHeight * 0.5;
      if (atBottom) return;
      const now = Date.now();
      if (now - lastWheelRef.current < 800) { e.preventDefault(); return; }
      lastWheelRef.current = now;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);


  return (
    <>
    <div
      ref={containerRef}
      className="bg-black text-white"
      style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      onScroll={(e) => {
        const el = e.currentTarget;
        const scrollTop = el.scrollTop;
        const goingDown = scrollTop > lastScrollTopRef.current;
        lastScrollTopRef.current = scrollTop;
        window.dispatchEvent(new CustomEvent("x360:snapscroll", { detail: { down: goingDown, scrollTop } }));
      }}
    >
      {/* ══ 1 · HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem, 6vw, 5rem) 64px" }}
      >
        {/* video background — full color, no dimming overlay */}
        {(get(`vt-${data.slug}.desktop-video`, data.hero.videoSrc ?? "") || data.hero.videoSrc) && (
          <video
            className="tip-hero-vid absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={get(`vt-${data.slug}.desktop-video`, data.hero.videoSrc ?? "")}
            autoPlay muted loop playsInline
            style={{ zIndex: 0, opacity: 1 }}
          />
        )}
        {/* static image background (used when imageSrc is set instead of videoSrc) */}
        {data.hero.imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.hero.imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ zIndex: 0, opacity: 1 }}
          />
        )}
        {/* very subtle bottom vignette so scroll cue stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.45) 100%)", zIndex: 1 }} />
        {/* ambient accent glow */}
        {!data.hero.imageSrc && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 42%, ${data.accentColor} 0%, transparent 65%)`, zIndex: 2 }} />
        )}

        {/* content box — glass blur when video, plain when image */}
        <div
          className="relative z-10 flex flex-col items-center gap-5 px-8 py-8 sm:px-10 sm:py-10 rounded-2xl text-center mx-auto"
          style={{
            maxWidth: 620,
            ...(data.hero.imageSrc
              ? {}
              : { background: "rgba(0,0,0,0.22)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }),
          }}
        >
          {/* Live badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-medium"
              style={{ color: "rgba(255,255,255,0.38)", background: "rgba(255,255,255,0.04)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: data.accentColor.replace(/[\d.]+\)$/, "0.8)") }} />
              {t(data.hero.label, data.hero.labelAr)}
            </div>
          </motion.div>

          {/* Heading */}
          <FadeUp delay={0.18}>
            <h1
              className="font-thin leading-tight tracking-[0.12em] uppercase"
              style={{ fontSize: data.hero.headlineSize ?? "clamp(1.5rem, 3.6vw, 3rem)", fontFamily: "Quicksand, sans-serif", whiteSpace: "pre-line" }}
            >
              {t(data.hero.headline, data.hero.headlineAr)}
            </h1>
          </FadeUp>

          {/* Accent line — centred */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
            style={{ height: 1, width: "clamp(60px, 12vw, 140px)", background: `linear-gradient(90deg, transparent, ${data.accentColor.replace(/[\d.]+\)$/, "0.75)")}, transparent)`, transformOrigin: "center", alignSelf: "center" }}
          />

          {/* Sub */}
          <FadeUp delay={0.3}>
            <p className="font-light leading-relaxed" style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.82rem)", color: "rgba(255,255,255,0.55)", maxWidth: 480 }}>
              {t(data.hero.sub, data.hero.subAr)}
            </p>
          </FadeUp>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 10 }}>
          <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{t("SCROLL TO EXPLORE", "مرر للاستكشاف")}</p>
          <div style={{ height: 28, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <motion.div className="w-px" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} animate={{ height: ["10px", "26px", "10px"] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      </section>

      {/* ══ MOBILE ONLY · Full-screen showcase video (section 2 on mobile) ══ */}
      {get(`vt-${data.slug}.mobile-video`, data.showcase.videoSrc) && (
        <section className="sm:hidden relative" style={{ height: "100dvh", scrollSnapAlign: "start", background: "#000" }}>
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              src={get(`vt-${data.slug}.mobile-video`, data.showcase.videoSrc)}
            />
            {/* subtle corner vignette so it feels cinematic */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
          </div>
        </section>
      )}

      {data.combineChallengeSolutions ? (
        <>
          {/* ══ COMBINED — two-column, one-screen (mobile + desktop) */}
          <section className="flex flex-col justify-center sm:flex-row relative pt-[60px] pb-4 sm:py-16 px-4 sm:px-6 overflow-hidden" style={{ background: "linear-gradient(to bottom, #000, #040404, #000)", minHeight: "100dvh", alignItems: "center", scrollSnapAlign: "start" }}>
            {data.combineSectionVideo && (
              <>
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} src={data.combineSectionVideo} />
                <div className="absolute inset-0" style={{ zIndex: 1, background: "rgba(0,0,0,0.45)" }} />
              </>
            )}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.02) 0%, transparent 55%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: `radial-gradient(ellipse at 80% 50%, ${data.accentColor} 0%, transparent 55%)` }} />

            <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-10" style={{ zIndex: 3 }}>
              <FadeUp>
                <div className="flex flex-col items-center text-center gap-2">
                  <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
                    {t("The Problem. Our Answer.", "المشكلة. إجابتنا.")}
                  </h2>
                </div>
              </FadeUp>

              <div className="grid grid-cols-2 gap-3 lg:gap-8 items-start">
                {/* LEFT — Problems */}
                <div className="flex flex-col gap-2 lg:gap-3">
                  <FadeUp>
                    <p className="text-[9px] lg:text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{t("Challenges", "التحديات")}</p>
                  </FadeUp>
                  {data.problems.map((p, i) => {
                    const Icon = ICON_MAP[p.iconKey] ?? Globe;
                    return (
                      <FadeUp key={i} delay={i * 0.07}>
                        <motion.div
                          className="flex items-start gap-2 lg:gap-4 rounded-xl px-3 py-3 lg:px-5 lg:py-4"
                          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                          whileHover={{ background: "rgba(255,255,255,0.045)", borderColor: "rgba(255,255,255,0.13)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5" style={{ width: 26, height: 26, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                            <Icon className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: "rgba(255,255,255,0.5)" }} />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-[10px] lg:text-sm font-medium text-white/80 leading-snug">{t(p.title, p.titleAr)}</p>
                            <p className="hidden lg:block text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{t(p.desc, p.descAr)}</p>
                          </div>
                        </motion.div>
                      </FadeUp>
                    );
                  })}
                </div>

                {/* RIGHT — Solutions */}
                <div className="flex flex-col gap-2 lg:gap-3">
                  <FadeUp>
                    <p className="text-[9px] lg:text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{t("How X360 Solves It", "كيف تحلّه X360")}</p>
                  </FadeUp>
                  {data.solutions.map((s, i) => (
                    <FadeUp key={i} delay={i * 0.07 + 0.1}>
                      <motion.div
                        className="flex items-start gap-2 lg:gap-4 rounded-xl px-3 py-3 lg:px-5 lg:py-4"
                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                        whileHover={{ background: "rgba(255,255,255,0.045)", borderColor: "rgba(255,255,255,0.13)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex-shrink-0 font-thin text-white/15 select-none hidden lg:block" style={{ fontSize: "1.6rem", fontFamily: "Quicksand, sans-serif", lineHeight: 1, minWidth: 36 }}>
                          {String(s.step).padStart(2, "0")}
                        </div>
                        <div className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5 lg:hidden" style={{ width: 26, height: 26, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                          <span className="text-[10px] font-thin text-white/30">{String(s.step).padStart(2, "0")}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] lg:text-sm font-medium text-white/80 leading-snug">{t(s.headline, s.headlineAr)}</p>
                          <p className="hidden lg:block text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{t(s.body, s.bodyAr)}</p>
                        </div>
                      </motion.div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ══ 2 · INDUSTRY PROBLEMS ════════════════════════════════════════ */}
          <section className="relative flex flex-col justify-center sm:justify-start px-4 sm:px-6 pt-[60px] pb-4 sm:py-28" style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 60%)" }} />
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-3 sm:gap-16 w-full">
              <div className="flex flex-col items-center text-center gap-1 sm:gap-5">
                <FadeUp><SectionLabel>{t("The Challenge", "التحدي")}</SectionLabel></FadeUp>
                <FadeUp delay={0.1}>
                  <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(0.9rem, 3.5vw, 2.8rem)", fontFamily: "Quicksand, sans-serif" }}>
                    {t("The Industry Problem", "مشكلة القطاع")}
                  </h2>
                </FadeUp>
              </div>
              {/* 2×2 grid on mobile so all 4 cards fit in one screen */}
              <div className="grid grid-cols-2 gap-2 sm:gap-5 w-full">
                {data.problems.map((p, i) => {
                  const Icon = ICON_MAP[p.iconKey] ?? Globe;
                  return (
                    <FadeUp key={i} delay={i * 0.08}>
                      <motion.div
                        className="relative rounded-xl p-3 sm:rounded-2xl sm:p-7 flex flex-col gap-1.5 sm:gap-4 h-full"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                        whileHover={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)" }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex items-center justify-center rounded-lg flex-shrink-0 sm:rounded-xl" style={{ width: 28, height: 28, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
                          </div>
                          <h3 className="font-medium text-white/85 text-[10px] sm:text-sm tracking-wide leading-snug">{t(p.title, p.titleAr)}</h3>
                        </div>
                        <p className="text-[9px] sm:text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{t(p.desc, p.descAr)}</p>
                      </motion.div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══ 3 · HOW X360 SOLVES IT ══════════════════════════════════════ */}
          <section className="relative flex flex-col justify-center sm:justify-start px-4 sm:px-6 pt-[60px] pb-4 sm:py-28" style={{ background: "linear-gradient(to bottom, #000, #040404, #000)", minHeight: "100dvh", scrollSnapAlign: "start" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${data.accentColor} 0%, transparent 55%)` }} />
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-3 sm:gap-16 w-full">
              <div className="flex flex-col items-center text-center gap-1 sm:gap-5">
                <FadeUp><SectionLabel>X360 Solution</SectionLabel></FadeUp>
                <FadeUp delay={0.1}>
                  <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(0.9rem, 3.5vw, 2.8rem)", fontFamily: "Quicksand, sans-serif" }}>
                    {t("How X360 Solves It", "كيف تحلّه X360")}
                  </h2>
                </FadeUp>
              </div>
              <div className="flex flex-col gap-0 w-full max-w-4xl">
                {data.solutions.map((s, i) => (
                  <FadeUp key={i} delay={i * 0.12}>
                    <div className="flex gap-4 sm:gap-8 py-3 sm:py-10 items-start" style={{ borderBottom: i < data.solutions.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                      <div className="flex-shrink-0 font-thin text-white/20 select-none" style={{ fontSize: "clamp(1.6rem, 5vw, 4rem)", fontFamily: "Quicksand, sans-serif", lineHeight: 1, width: 52, textAlign: "right" }}>
                        {String(s.step).padStart(2, "0")}
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3 pt-1">
                        <h3 className="font-medium text-white tracking-wide" style={{ fontSize: "clamp(0.85rem, 2vw, 1.25rem)" }}>
                          {t(s.headline, s.headlineAr)}
                        </h3>
                        <p className="leading-relaxed text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.48)", maxWidth: 560 }}>
                          {t(s.body, s.bodyAr)}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ 4 · SHOWCASE (text left + video right) — hidden on mobile, full section on desktop */}
      <section className="hidden sm:flex items-center relative py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(to bottom, #000, #020202, #000)", minHeight: "100dvh", scrollSnapAlign: "start" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 0% 50%, ${data.accentColor} 0%, transparent 55%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT — copy */}
          <div className="flex flex-col gap-4 sm:gap-8">
            <FadeUp>
              <SectionLabel>{t("In Action", "في التطبيق")}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight tracking-[0.06em] uppercase"
                style={{ fontSize: "clamp(1.1rem, 2.8vw, 2.4rem)", fontFamily: "Quicksand, sans-serif", whiteSpace: "pre-line" }}>
                {t(data.showcase.title, data.showcase.titleAr)}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <motion.div style={{ width: "clamp(80px, 18vw, 180px)", height: 1, background: `linear-gradient(to right, rgba(255,255,255,0.4), transparent)` }} />
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="hidden sm:block leading-relaxed font-light" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.5)", maxWidth: 460 }}>
                {t(data.showcase.body, data.showcase.bodyAr)}
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <Link href="/contact">
                <motion.button
                  className="relative overflow-hidden rounded-xl px-6 sm:px-7 py-2.5 sm:py-3 text-sm font-semibold tracking-wide text-black flex items-center gap-2 w-fit"
                  style={{ background: "#ffffff" }}
                  animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.10)", "0 0 22px 6px rgba(255,255,255,0.22)", "0 0 10px 2px rgba(255,255,255,0.10)"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                >
                  <motion.span className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                    animate={{ x: ["-100%", "220%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }} />
                  <span className="relative z-10 flex items-center gap-2">
                    {t("Request a Demo", "طلب عرض تجريبي")}
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          {/* RIGHT — looping video (hidden on mobile — already shown as full-screen section above) */}
          <FadeIn delay={0.2} className="hidden sm:block">
            {/* desktop: floats right */}
            <div className="lg:block">
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/21.36", width: "clamp(54%, 64%, 72%)", marginLeft: "auto", marginRight: "auto", background: "#000", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* video */}
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={get(`vt-${data.slug}.desktop-video`, data.showcase.videoSrc)}
                />
                {/* subtle vignette overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
              </motion.div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ══ 5 · TRY IT ══════════════════════════════════════════════════════ */}
      {data.slug !== "government" && <TryItSection />}

      {/* ══ 3D VISUAL MAPPING — Real Estate only ════════════════════════════ */}
      {data.parentPath === "/virtual-tours/real-estate" && (
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ minHeight: "100dvh", scrollSnapAlign: "start", background: "#050505" }}
        >
          {/* ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 65% 50%, rgba(80,160,255,0.07) 0%, transparent 70%)" }} />

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20 min-h-[80dvh]">

            {/* LEFT — text */}
            <div className="flex flex-col gap-7 flex-1 min-w-0">
              <FadeUp>
                <div className="flex items-center gap-3">
                  <motion.div style={{ width: "clamp(28px,5vw,44px)", height: 1, background: "rgba(255,255,255,0.35)" }} />
                  <span className="text-xs font-medium tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Quicksand, sans-serif" }}>
                    {isAr ? "خدمات متقدمة" : "Advanced Services"}
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2
                  className="font-thin tracking-[0.06em] uppercase leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)", fontFamily: "Quicksand, sans-serif" }}
                >
                  {isAr
                    ? "تجارب رسم الخرائط\nالمرئية ثلاثية الأبعاد"
                    : "Immersive 3D Visual\nMapping Experiences"}
                </h2>
              </FadeUp>

              <FadeUp delay={0.15}>
                <motion.div style={{ width: "clamp(60px, 12vw, 120px)", height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.35), transparent)" }} />
              </FadeUp>

              <FadeUp delay={0.2}>
                <p
                  className="leading-relaxed font-light"
                  style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.52)", maxWidth: 480, lineHeight: 1.8 }}
                >
                  {isAr
                    ? "نطور خرائط مرئية ثلاثية الأبعاد متقدمة مدمجة مع تقديم ثلاثي الأبعاد عالي الجودة وتجارب 360 غامرة، لإنشاء بيئات رقمية تفاعلية مصممة لعروض العقارات الحديثة والتطورات الفاخرة وتصور العقارات من الجيل التالي."
                    : "We develop advanced 3D visual maps combined with high-quality 3D rendering and immersive 360 experiences, creating interactive digital environments designed for modern real estate presentations, luxury developments, and next-generation property visualization."}
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <Link href="/contact">
                  <motion.button
                    className="relative overflow-hidden rounded-xl px-7 py-3 text-sm font-semibold tracking-wide text-black flex items-center gap-2 w-fit"
                    style={{ background: "#ffffff" }}
                    animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.10)", "0 0 22px 6px rgba(255,255,255,0.22)", "0 0 10px 2px rgba(255,255,255,0.10)"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  >
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                      animate={{ x: ["-100%", "220%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {isAr ? "تواصل معنا" : "Contact Us"}
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
              </FadeUp>
            </div>

            {/* RIGHT — video */}
            <FadeIn delay={0.2} className="flex-1 flex justify-center lg:justify-end w-full">
              <motion.div
                className="relative rounded-2xl overflow-hidden w-full"
                style={{
                  maxWidth: 560,
                  aspectRatio: "16/10",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset",
                  backdropFilter: "blur(2px)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.18)" }}
              >
                <video
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={get("virtual-tours.3d-mapping-video", "/x360/3d-mapping.mp4")}
                />
                {/* vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
                {/* top gloss */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)" }} />
              </motion.div>
            </FadeIn>

          </div>
        </section>
      )}

      {/* ══ 5 · USE CASES ══════════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-center pt-[60px] pb-4 sm:py-28 px-5 sm:px-6" style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-6 sm:gap-16 w-full">
          <div className="flex flex-col items-center text-center gap-2 sm:gap-5">
            <FadeUp><SectionLabel>{t("Industry Applications", "تطبيقات القطاع")}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("AI-Powered Experiences", "تجارب مدعومة بالذكاء الاصطناعي")}
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full">
            {data.useCases.map((uc, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div
                  className="relative rounded-2xl p-3 sm:p-6 flex flex-col gap-2 sm:gap-3 h-full"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.045)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-6 sm:w-8 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
                  <h3 className="font-medium text-white/85 tracking-wide text-xs sm:text-sm leading-snug">{t(uc.title, uc.titleAr)}</h3>
                  <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{t(uc.desc, uc.descAr)}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · DIGITAL EXPERIENCE ECOSYSTEM ══════════════════════════════ */}
      <section className="relative overflow-hidden flex flex-col justify-center py-[80px] sm:py-32 px-6" style={{ background: "#010101", minHeight: "100dvh", scrollSnapAlign: "start" }}>
        {/* ambient layers */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 60%, rgba(120,160,255,0.05) 0%, transparent 55%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 100% 40%, ${data.accentColor} 0%, transparent 50%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — copy (z-10 so it sits above mobile background panels) */}
          <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 relative z-10 text-center lg:text-start">
            <FadeUp>
              <SectionLabel>{t("Digital Experience Ecosystem", "منظومة التجارب الرقمية")}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight tracking-[0.06em] uppercase"
                style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Beyond\nVirtual Tours.", "أبعد من\nالجولات الافتراضية.")}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.48)", fontSize: "clamp(0.85rem, 1.4vw, 1rem)", maxWidth: 440 }}>
                {t(
                  "We build complete immersive digital ecosystems — cinematic websites, interactive 3D brochures, and luxury digital experiences crafted for modern brands.",
                  "نبني منظومات رقمية غامرة متكاملة — مواقع سينمائية وكتيبات ثلاثية الأبعاد وتجارب عرض فاخرة مصممة للعلامات التجارية الحديثة."
                )}
              </p>
            </FadeUp>

            {/* service pills */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {[
                  { en: "Luxury Websites",         ar: "مواقع فاخرة"              },
                  { en: "3D Brochures",             ar: "كتيبات ثلاثية الأبعاد"   },
                  { en: "AI-Powered Systems",       ar: "أنظمة مدعومة بالذكاء"    },
                ].map((s, i) => (
                  <span key={i} className="text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>
                    {t(s.en, s.ar)}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link href="/contact">
                  <motion.button
                    className="relative overflow-hidden rounded-xl px-7 py-3 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                    style={{ background: "#ffffff" }}
                    animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.10)", "0 0 22px 6px rgba(255,255,255,0.22)", "0 0 10px 2px rgba(255,255,255,0.10)"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  >
                    <motion.span className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                      animate={{ x: ["-100%", "220%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }} />
                    <span className="relative z-10 flex items-center gap-2">
                      {t("Explore Digital Experiences", "استكشف التجارب الرقمية")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="rounded-xl px-7 py-3 text-sm font-light tracking-wide"
                    style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)" }}
                    whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.38)", color: "rgba(255,255,255,1)" } as never}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t("Contact Us", "تواصل معنا")}
                  </motion.button>
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Mobile: panels float as background behind the copy (absolute, right-aligned) */}
          <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* browser-chrome mockup — right half of screen */}
            <motion.div
              className="absolute rounded-xl overflow-hidden"
              style={{ top: "12%", right: 0, left: "28%",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: 0.45 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />)}
                <div className="flex-1 mx-2 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.05)", maxWidth: 120 }} />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="h-2.5 rounded-full w-2/3" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(255,255,255,0.04)" }} />
                <div className="mt-2 h-16 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />
              </div>
            </motion.div>
            {/* brochure card — bottom right */}
            <motion.div
              className="absolute rounded-xl p-3 flex flex-col gap-2"
              style={{ bottom: "18%", right: "4%", width: 120,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
                opacity: 0.40 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
              <div className="h-2 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="h-10 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }} />
              <span className="text-[8px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>3D Brochure</span>
            </motion.div>
          </div>

          {/* Desktop: panels in right column */}
          <FadeIn delay={0.2} className="hidden lg:block">
            <div className="relative h-[480px] w-full">

              {/* main browser mockup */}
              <motion.div
                className="absolute rounded-2xl overflow-hidden"
                style={{ top: 0, left: "8%", right: 0, height: 280,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.6)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* browser bar */}
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />)}
                  </div>
                  <div className="flex-1 mx-3 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.06)", maxWidth: 200 }} />
                </div>
                {/* hero content mockup */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="h-3 rounded-full w-2/3" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(255,255,255,0.04)" }} />
                  <div className="mt-3 h-24 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.06)" }} />
                  <div className="flex gap-2 mt-1">
                    <div className="h-7 w-20 rounded-lg" style={{ background: "rgba(255,255,255,0.10)" }} />
                    <div className="h-7 w-16 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }} />
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 70% 30%, ${data.accentColor} 0%, transparent 60%)` }} />
              </motion.div>

              {/* floating brochure card */}
              <motion.div
                className="absolute rounded-xl p-5 flex flex-col gap-3"
                style={{ bottom: 40, left: 0, width: 200,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
                <div className="h-2.5 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="h-2 rounded-full w-1/2" style={{ background: "rgba(255,255,255,0.05)" }} />
                <div className="h-16 rounded-lg mt-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.07)" }} />
                <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>3D Brochure</span>
              </motion.div>

              {/* floating AI badge */}
              <motion.div
                className="absolute rounded-full px-4 py-2 flex items-center gap-2"
                style={{ bottom: 60, right: "5%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              >
                <Cpu className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>AI-Powered</span>
              </motion.div>

              {/* subtle glow beneath */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: 340, height: 80, background: `radial-gradient(ellipse, ${data.accentColor} 0%, transparent 70%)`, filter: "blur(20px)" }} />
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ══ 8 · TRUST ══════════════════════════════════════════════════════ */}
      <section className="relative hidden sm:flex flex-col justify-center pt-[60px] pb-16 sm:py-24 px-6 overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-6 sm:gap-12">

          {/* heading — whileInView is more reliable than useInView in snap-scroll containers */}
          <motion.div
            className="flex flex-col items-center text-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: containerRef, amount: 0.01 }}
            transition={{ duration: 0.75, ease }}
          >
            <SectionLabel>{t("Trusted By", "موثوق به من قِبل")}</SectionLabel>
            <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
              {t("Industry Leaders Trust X360", "رواد القطاع يثقون بـ X360")}
            </h2>
          </motion.div>

          {/* logo ticker */}
          <FadeIn root={containerRef} delay={0.1} className="w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
            <motion.div
              className="flex gap-10 w-max"
              animate={{ x: [0, -(240 * TRUST_LOGOS.length)] }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              {TRUST_DOUBLED.map((l, i) => (
                <div key={i} className="flex items-center justify-center flex-shrink-0 px-6 py-3 rounded-xl overflow-hidden"
                  style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <img
                    src={l.src}
                    alt={l.name}
                    className="h-14 sm:h-24 w-auto object-contain"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${l.scale ?? 1})`, transformOrigin: "center" }}
                  />
                </div>
              ))}
            </motion.div>
          </FadeIn>

          {/* stats */}
          <FadeUp root={containerRef} delay={0.15}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-12">
              {[
                { num: "500+", label: t("Projects Delivered", "مشروع مُنجز") },
                { num: "12+",  label: t("Industries Served", "قطاع مخدوم") },
                { num: "5",    label: t("Countries in GCC", "دول في الخليج") },
                { num: "98%",  label: t("Client Satisfaction", "رضا العملاء") },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="font-thin text-white" style={{ fontSize: "clamp(1.2rem, 3.5vw, 2.6rem)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.06em" }}>{s.num}</span>
                  <span className="text-[9px] tracking-[0.14em] uppercase text-center" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══ 9 · TRUSTED BY LEADERS — mobile only, all pages ════════════════ */}
      <TrustedByMobileSection />

      {/* ══ 10 · FINAL CTA — own snap section, always exactly one screen */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden pt-[60px] pb-8 sm:py-36 px-6 text-center gap-8" style={{ height: "100dvh", scrollSnapAlign: "start" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 60%, ${data.accentColor} 0%, transparent 60%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl">
          <FadeUp>
            <SectionLabel>{t("Get Started", "ابدأ الآن")}</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-thin tracking-[0.1em] uppercase leading-tight" style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
              {t(data.finalCta.headline, data.finalCta.headlineAr)}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.95rem", maxWidth: 520 }}>
              {t(data.finalCta.sub, data.finalCta.subAr)}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link href="/contact">
              <motion.button
                className="relative overflow-hidden rounded-xl px-8 py-3.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 12px 3px rgba(255,255,255,0.15)", "0 0 26px 8px rgba(255,255,255,0.32)", "0 0 12px 3px rgba(255,255,255,0.15)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }} animate={{ x: ["-100%", "220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Contact Us Today", "تواصل معنا اليوم")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}><ArrowRight className="w-4 h-4" /></motion.span>
                </span>
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══ 10 · SIBLING NAV + FOOTER — own snap section, reachable on all browsers */}
      <section className="flex flex-col" style={{ scrollSnapAlign: "start" }}>
        {data.siblings && data.siblings.length > 0 && (
          <div className="py-6 px-6 overflow-x-auto w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="inline-flex items-center justify-start gap-1 whitespace-nowrap" style={{ display: "flex", width: "max-content", margin: "0 auto" }}>
              {data.siblings.map((cat, i, arr) => {
                const isCurrent = cat.slug === data.slug;
                const label = isAr ? cat.labelAr : cat.label;
                return (
                  <span key={cat.slug} className="flex items-center gap-1">
                    {isCurrent ? (
                      <span className="text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {label}
                      </span>
                    ) : (
                      <Link href={`${data.parentPath}/${cat.slug}`}>
                        <span className="text-[11px] tracking-[0.16em] uppercase font-light cursor-pointer transition-colors duration-200"
                          style={{ color: "rgba(255,255,255,0.32)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}>
                          {label}
                        </span>
                      </Link>
                    )}
                    {i < arr.length - 1 && (
                      <span className="mx-2 text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        <Footer />
      </section>

    </div>
    <BackButton />
    <WhatsAppButton />
    </>
  );
}
