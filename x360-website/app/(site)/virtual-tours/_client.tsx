"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import {
  Camera, Globe, Box,
  Award, Clock, MousePointer, Move, Headphones, VolumeX, Volume2,
  ArrowRight, ChevronDown,
  CheckCircle,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaConfig } from "@/lib/useMediaConfig";
import IndustryShowcase, { IndustryShowcaseMobileSnap } from "@/components/ui/IndustryShowcase";
import NeonButton from "@/components/ui/NeonButton";
import Footer from "@/components/Footer";

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

/* ─── SECTION 2 · INTRO VIDEO ────────────────────────────────────────────── */
function IntroVideoSection() {
  const { isAr } = useLang();
  const get = useMediaConfig();
  // Two refs — one per breakpoint so each layout has its own autoplay observer
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef  = useRef<HTMLVideoElement>(null);

  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCtrl, setShowCtrl] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shared observer setup — returns cleanup
  const attachObserver = (el: HTMLVideoElement) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.muted = false;
        el.play().then(() => { setPlaying(true); setMuted(false); }).catch(() => {
          el.muted = true; setMuted(true); el.play().then(() => setPlaying(true));
        });
      } else { el.pause(); setPlaying(false); el.muted = true; setMuted(true); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return obs;
  };

  useEffect(() => {
    const obs1 = desktopRef.current ? attachObserver(desktopRef.current) : null;
    const obs2 = mobileRef.current  ? attachObserver(mobileRef.current)  : null;
    return () => { obs1?.disconnect(); obs2?.disconnect(); };
  }, []);

  // Progress tracking — sync from whichever video is actively playing
  useEffect(() => {
    const attach = (el: HTMLVideoElement | null) => {
      if (!el) return () => {};
      const onTime = () => setProgress(el.currentTime);
      const onMeta = () => setDuration(el.duration);
      el.addEventListener("timeupdate", onTime);
      el.addEventListener("loadedmetadata", onMeta);
      return () => { el.removeEventListener("timeupdate", onTime); el.removeEventListener("loadedmetadata", onMeta); };
    };
    const d1 = attach(desktopRef.current);
    const d2 = attach(mobileRef.current);
    return () => { d1(); d2(); };
  }, []);

  // Helpers — operate on the visible video (checked by screen width at call time)
  const activeEl = () =>
    typeof window !== "undefined" && window.innerWidth < 640
      ? mobileRef.current
      : desktopRef.current;

  const togglePlay = () => {
    const el = activeEl(); if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); }
  };
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    // Sync mute state across both so switching breakpoints keeps the choice
    const next = !(desktopRef.current?.muted ?? true);
    [desktopRef.current, mobileRef.current].forEach(el => { if (el) el.muted = next; });
    setMuted(next);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = activeEl(); if (!el || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };
  const revealCtrl = () => {
    setShowCtrl(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowCtrl(false), 3000);
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="relative bg-black" style={{ height: "100dvh" }}>

      {/* ── MOBILE layout ── full-bleed video, overlaid controls ── */}
      <div
        className="sm:hidden absolute inset-0 cursor-pointer"
        onClick={() => { togglePlay(); revealCtrl(); }}
        onTouchStart={revealCtrl}
      >
        <video ref={mobileRef} loop playsInline className="w-full h-full object-cover">
          <source src={get("virtual-tours.mobile-intro-video", "/x360/x360-mobile-tour.mp4")} type="video/mp4" />
        </video>

        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 100%)" }} />

        {/* Label — top start */}
        <div className="absolute top-6 left-5 pointer-events-none">
          <p className="text-[10px] uppercase tracking-widest text-white/35">X360</p>
          <p className="text-[13px] font-light text-white/65 tracking-wide mt-0.5">Saudi Arabia</p>
        </div>

        {/* Audio button — centred, always visible */}
        <button
          className="absolute inset-0 m-auto flex flex-col items-center justify-center gap-2"
          style={{ width: 72, height: 72, zIndex: 10, pointerEvents: "auto" }}
          onClick={e => { e.stopPropagation(); toggleMute(e); }}
        >
          <motion.span
            animate={{ background: muted ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.40)" }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center rounded-full"
            style={{ width: 56, height: 56, border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(10px)" }}
          >
            {muted
              ? <VolumeX size={22} className="text-white/70" />
              : <Volume2 size={22} className="text-white" />}
          </motion.span>
          <span className="text-[9px] uppercase tracking-widest text-white/50 leading-none">
            {muted ? (isAr ? "انقر للصوت" : "Tap for audio") : (isAr ? "الصوت شغّال" : "Audio on")}
          </span>
        </button>

        {/* Bottom controls */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-16 flex flex-col gap-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)" }}
          animate={{ opacity: showCtrl ? 1 : 0 }} transition={{ duration: 0.25 }}
        >
          <div className="w-full h-[3px] rounded-full bg-white/20 relative" onClick={seek}>
            <div className="absolute left-0 top-0 h-full rounded-full bg-white"
              style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
          </div>
          <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
            <button className="text-white/80 active:text-white" onClick={togglePlay}>
              {playing
                ? <span className="flex gap-[4px]"><span className="w-[3px] h-4 bg-current rounded-full"/><span className="w-[3px] h-4 bg-current rounded-full"/></span>
                : <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-current ms-0.5 block"/>}
            </button>
            <span className="text-[11px] text-white/40 font-mono">{fmt(progress)} / {fmt(duration)}</span>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP layout ── framed 16/9 + side mute ── */}
      <div className="hidden sm:flex items-center justify-center h-full">
        <div className="flex items-center gap-4" style={{ width: "min(92vw, 1140px)" }}>
          <div
            className="relative overflow-hidden shadow-2xl cursor-pointer flex-1"
            style={{ aspectRatio: "16/9", borderRadius: "2%" }}
            onClick={() => { togglePlay(); revealCtrl(); }}
            onMouseMove={revealCtrl}
            onMouseLeave={() => { if (hideTimer.current) clearTimeout(hideTimer.current); hideTimer.current = setTimeout(() => setShowCtrl(false), 800); }}
          >
            <video ref={desktopRef} loop playsInline className="w-full h-full object-cover">
              <source src={get("virtual-tours.desktop-intro-video", "/x360/saudi-x360.mp4")} type="video/mp4" />
            </video>

            <motion.div
              className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 flex flex-col gap-2"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)", zIndex: 10 }}
              animate={{ opacity: showCtrl ? 1 : 0 }} transition={{ duration: 0.25 }}
            >
              <div className="w-full h-1 rounded-full bg-white/20 cursor-pointer relative" onClick={seek}>
                <div className="absolute left-0 top-0 h-full rounded-full bg-white" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
              </div>
              <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
                <button className="text-white/80 hover:text-white" onClick={togglePlay}>
                  {playing
                    ? <span className="flex gap-[4px]"><span className="w-[3px] h-4 bg-current rounded-full"/><span className="w-[3px] h-4 bg-current rounded-full"/></span>
                    : <span className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[13px] border-t-transparent border-b-transparent border-l-current ms-0.5 block"/>}
                </button>
                <span className="text-[11px] text-white/50 font-mono">{fmt(progress)} / {fmt(duration)}</span>
                <div className="flex-1" />
                <button className="text-white/80 hover:text-white" onClick={() => toggleMute()}>
                  {muted ? <VolumeX size={14}/> : <Volume2 size={14}/>}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.button
            onClick={() => toggleMute()}
            whileTap={{ scale: 0.93 }}
            className="flex flex-col items-center gap-2 group cursor-pointer flex-shrink-0"
            style={{ width: 64 }}
          >
            <motion.span
              animate={{ background: muted ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-white/20"
              style={{ width: 48, height: 48, border: "1px solid rgba(255,255,255,0.22)" }}
            >
              {muted
                ? <VolumeX size={18} className="text-white/60 group-hover:text-white transition-colors" />
                : <Volume2 size={18} className="text-white group-hover:text-white/80 transition-colors" />}
            </motion.span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/45 group-hover:text-white/75 transition-colors text-center leading-tight">
              {muted
                ? (isAr ? <>تفعيل<br />الصوت</> : <>Enable<br />Audio</>)
                : (isAr ? <>كتم<br />الصوت</> : <>Mute<br />Audio</>)}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
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
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />

      <div className="flex flex-col items-center text-center gap-8 w-full">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionBadge noUppercase>{isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}</SectionBadge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-thin leading-tight px-6"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em" }}
        >
          {isAr ? "موثوق به من القادة" : "Trusted by Leaders"}
        </motion.h2>

        {/* Glow rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px"
          style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
        />

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full overflow-hidden py-6 marquee-outer"
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
          {/* Right fade */}
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
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }}
                />
              </div>
            ))}
          </div>

          {/* Ambient glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 600, height: 80, background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── SECTION 5 · TRY IT ─────────────────────────────────────────────────── */
/* Replace TOUR_URL with your actual Matterport / Kuula embed link */
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
    <div ref={ref} className="relative flex flex-col items-center justify-center px-3 sm:px-6 pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(96,165,250,0.04) 0%, transparent 65%)" }} />

      <div className="w-full max-w-[860px] flex flex-col items-center gap-3 sm:gap-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 sm:gap-3 text-center"
        >
          <h2 className="font-thin leading-tight text-center" style={{ fontSize: "clamp(1.1rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em" }}>
            {isAr ? "جرِّبها بنفسك!" : "Try it for Yourself !"}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px"
            style={{ width: "clamp(40px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
          />
        </motion.div>

        {/* Instruction bar — hidden on mobile to save space */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden sm:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4"
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

        {/* Viewer frame — tall portrait on mobile, 16:9 on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-2xl"
          style={{
            background: "#000",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 48px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Mobile: tall portrait frame; Desktop: 16:9 sizer */}
          <div className="block sm:hidden" style={{ paddingTop: "0", height: "calc(100dvh - 160px)", position: "relative" }} />
          <div className="hidden sm:block" style={{ paddingTop: "56.25%", position: "relative" }} />
          {/* Iframe — only mounted when section is in view AND audio choice is made */}
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

          {/* Scroll intercept overlay — sits above the iframe so wheel events bubble to
              the master snap-scroll controller. Click once to pass control to the tour
              for 5 s; it then reactivates automatically so scrolling works again. */}
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

          {/* Custom audio modal */}
          <AnimatePresence>
            {audioChoice === "pending" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                style={{ background: "rgba(2,2,4,0.92)", backdropFilter: "blur(12px)", zIndex: 10 }}
              >
                {/* Pulsing dot */}
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

/* ─── SECTION 6 · GET IN TOUCH ───────────────────────────────────────────── */
const SERVICE_OPTIONS = [
  "360° Virtual Tours", "Private Luxury Showcase", "Real Estate Tours",
  "Hospitality Experience", "Construction Documentation", "Smart City / Digital Twin", "Other",
];
const SERVICE_OPTIONS_AR = [
  "جولات افتراضية 360°", "عرض الفاخرة الخاصة", "جولات عقارية",
  "تجربة الضيافة", "توثيق البناء", "المدن الذكية / التوأم الرقمي", "أخرى",
];

const TRUST_PILLS = [
  { en: "Host it in your server",  ar: "استضافة على خادمك"      },
  { en: "Custom landing page",     ar: "صفحة هبوط مخصصة"        },
  { en: "Arabic + English Audio",  ar: "صوت عربي + إنجليزي"      },
];

function ContactSection() {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const openConsultation = () => {
    window.location.href = `mailto:info@x-360.ai?subject=${encodeURIComponent("Schedule Consultation — X360 Virtual Tours")}&body=${encodeURIComponent("Hello X360 team,\n\nI'd like to schedule a consultation.\n\nName:\nCompany:\nPhone:\n")}`;
  };
  const openDemo = () => {
    window.location.href = `mailto:info@x-360.ai?subject=${encodeURIComponent("Request Live Demo — X360 Virtual Tours")}&body=${encodeURIComponent("Hello X360 team,\n\nI'd like to request a live demo.\n\nName:\nCompany:\nPhone:\n")}`;
  };

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center px-6 pt-[60px] sm:pt-0" style={{ height: "100dvh", background: "#000" }}>
      {/* Ambient */}
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
          {isAr ? "لنعمل معًا" : "Let's Work Together"}
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
          className="text-base leading-relaxed mx-auto text-center"
          style={{ color: "rgba(255,255,255,0.38)", maxWidth: 520 }}
        >
          {isAr
            ? "تشارك مع X360 لإنشاء تجارب غامرة مدعومة بتقنية الجولات الافتراضية."
            : "Create immersive virtual experiences that elevate your brand."}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="flex justify-center"
        >
          <NeonButton size="xl" onClick={openConsultation}
            className="!px-10 !py-4 !text-base !rounded-2xl">
            {isAr ? "تواصل معنا" : "Contact Us"}
          </NeonButton>
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

/* ─── SECTION 7 · FOOTER ─────────────────────────────────────────────────── */

/* ─── SNAP SECTION WRAPPER ───────────────────────────────────────────────── */
/* ─── SECTION 5b · IMMERSIVE 3D MAP ─────────────────────────────────────── */
function ImmersiveMapSection() {
  const { isAr } = useLang();
  const get = useMediaConfig();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex items-end justify-start overflow-hidden" style={{ height: "100dvh" }}>
      {/* Full-bleed background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.80) saturate(1.05)" }}
        src={get("virtual-tours.3d-mapping-video", "/x360/3d-mapping.mp4")}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.50) 100%)" }} />

      {/* Bottom-left frosted-glass content box */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 flex flex-col items-start text-start gap-4 px-7 py-8 sm:py-9 rounded-2xl m-6 sm:m-10 mb-14 sm:mb-16"
        style={{
          maxWidth: 480,
          width: "calc(100% - 48px)",
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex items-center gap-2"
        >
          <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.35)" }} />
          <span className="text-[9px] font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Quicksand, sans-serif" }}>
            {isAr ? "خدمات متقدمة" : "Advanced Services"}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="font-thin tracking-[0.04em] uppercase leading-tight"
          style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)", fontFamily: "Quicksand, sans-serif" }}
        >
          {isAr ? "تجارب مرئية ثلاثية الأبعاد" : "3D Visual Experiences"}
        </motion.h2>

        {/* Glow rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="h-px"
          style={{ width: "clamp(60px, 12vw, 120px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="leading-relaxed font-light"
          style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.82rem)", color: "rgba(255,255,255,0.52)", maxWidth: 480, lineHeight: 1.8 }}
        >
          {isAr
            ? "نطور خرائط مرئية ثلاثية الأبعاد متقدمة مدمجة مع تقديم ثلاثي الأبعاد عالي الجودة وتجارب 360 غامرة، لإنشاء بيئات رقمية تفاعلية مصممة لعروض العقارات الحديثة والتطورات الفاخرة وتصور العقارات من الجيل التالي."
            : "We develop advanced 3D visual maps combined with high-quality 3D rendering and immersive 360 experiences, creating interactive digital environments designed for modern real estate presentations, luxury developments, and next-generation property visualization."}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4, ease }}
        >
          <Link href="/x360/contact">
            <motion.button
              className="relative overflow-hidden rounded-xl px-7 py-3 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
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
        </motion.div>
      </motion.div>
    </div>
  );
}

function SnapSection({ children, style, id }: { children: ReactNode; style?: React.CSSProperties; id?: string }) {
  return (
    <section id={id} style={{ height: "100dvh", scrollSnapAlign: "start", overflow: "hidden", flexShrink: 0, ...style }}>
      {children}
    </section>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function ToursClient() {
  const { isAr } = useLang();
  const get = useMediaConfig();

  // Video parallax springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Torch / spotlight position (raw px within hero div)
  const rawTorchX = useMotionValue(-9999);
  const rawTorchY = useMotionValue(-9999);
  const torchX = useSpring(rawTorchX, { stiffness: 110, damping: 22 });
  const torchY = useSpring(rawTorchY, { stiffness: 110, damping: 22 });
  const torchBg = useMotionTemplate`radial-gradient(circle 340px at ${torchX}px ${torchY}px, rgba(255,255,255,0.04) 0%, transparent 28%, rgba(0,0,0,0.86) 58%, rgba(0,0,0,0.97) 100%)`;

  const handleHeroMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Parallax for video
    mouseX.set(((e.clientX - cx) / rect.width) * 42);
    mouseY.set(((e.clientY - cy) / rect.height) * 42);
    // Torch follows raw cursor position
    rawTorchX.set(e.clientX - rect.left);
    rawTorchY.set(e.clientY - rect.top);
  };
  const resetHeroMouse = () => {
    mouseX.set(0); mouseY.set(0);
    rawTorchX.set(-9999); rawTorchY.set(-9999);
  };

  const SECTION_IDS = ["sec-hero", "sec-intro", "industry-showcase", "sec-trusted", "sec-tryit", "sec-3dmap", "sec-contact", "sec-footer"] as const;
  const SECTION_COUNT = SECTION_IDS.length;
  const INDUSTRY_TAB_COUNT = 4;

  const currentSectionRef = useRef(0); // page opens on hero (index 0)
  const industryTabRef = useRef(0);
  const [industryActive, setIndustryActive] = useState(0);
  const lastWheelRef = useRef(0);

  type Star = { x: number; y: number; r: number; opacity: number; twinkle: boolean };
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 140 }, () => {
        const r = Math.random();
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: r < 0.72 ? 0.8 : r < 0.92 ? 1.4 : 2.2,
          opacity: 0.35 + Math.random() * 0.55,
          twinkle: Math.random() < 0.3,
        };
      })
    );
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    // proximity: sections still snap when near them, but the footer
    // (no fixed-height snap point after Contact) remains reachable.
    html.style.scrollSnapType = "y proximity";
    html.style.scrollBehavior = "smooth";
    body.style.scrollbarWidth = "none";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < 900) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const sec = currentSectionRef.current;

      // Section 2 (IndustryShowcase): exhaust all 4 tabs before leaving
      if (sec === 2) {
        const nextTab = industryTabRef.current + dir;
        if (nextTab >= 0 && nextTab < INDUSTRY_TAB_COUNT) {
          lastWheelRef.current = now;
          industryTabRef.current = nextTab;
          setIndustryActive(nextTab);
          return;
        }
      }

      // Navigate to next/prev section
      const nextSec = sec + dir;
      if (nextSec < 0 || nextSec >= SECTION_COUNT) return;
      lastWheelRef.current = now;

      // Reset tab to the near edge when re-entering section 2
      if (nextSec === 2) {
        const reset = dir > 0 ? 0 : INDUSTRY_TAB_COUNT - 1;
        industryTabRef.current = reset;
        setIndustryActive(reset);
      }

      currentSectionRef.current = nextSec;
      document.getElementById(SECTION_IDS[nextSec])?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
      body.style.scrollbarWidth = "";
      window.removeEventListener("wheel", onWheel);
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
          className="relative flex flex-col items-center overflow-hidden"
          style={{ height: "100dvh", background: "#000" }}
          onMouseMove={handleHeroMouse}
          onMouseLeave={resetHeroMouse}
        >
          {/* Stars / dots — revealed as torch sweeps over them */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
            {stars.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.r * 2,
                  height: s.r * 2,
                  borderRadius: "50%",
                  background: s.r > 1.8
                    ? `radial-gradient(circle, rgba(255,255,255,${s.opacity}) 0%, rgba(200,220,255,${s.opacity * 0.4}) 60%, transparent 100%)`
                    : `rgba(255,255,255,${s.opacity})`,
                  boxShadow: s.r > 1.8 ? `0 0 ${s.r * 4}px rgba(255,255,255,${s.opacity * 0.6})` : "none",
                  transform: "translate(-50%, -50%)",
                  ["--tw-op" as string]: s.opacity,
                  animation: s.twinkle
                    ? `twinkle ${2.2 + (i % 7) * 0.4}s ease-in-out ${(i % 5) * 0.6}s infinite`
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Torch / spotlight overlay — covers whole hero, dark except around cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: torchBg, zIndex: 5 }}
          />

          {/* Video circle — z-6 keeps it ABOVE the torch so it's always visible */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 6, paddingTop: 40 }}
          >
            <motion.div
              style={{
                width: "min(82vmin, 660px)",
                height: "min(82vmin, 660px)",
                flexShrink: 0,
                x: springX,
                y: springY,
                WebkitMaskImage: "radial-gradient(circle, black 42%, rgba(0,0,0,0.6) 58%, transparent 72%)",
                maskImage: "radial-gradient(circle, black 42%, rgba(0,0,0,0.6) 58%, transparent 72%)",
              }}
            >
              <video autoPlay muted loop playsInline className="w-full h-full object-cover rounded-full">
                <source src={get("virtual-tours.bg-video", "/x360/360-bg.mp4")} type="video/mp4" />
              </video>
            </motion.div>
          </div>

          {/* Text — z-7, above video and torch, always readable */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ zIndex: 7, paddingTop: 40 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9, ease }}
              className="font-thin text-white leading-tight text-center px-4"
              style={{ fontSize: "clamp(1.4rem, 5vmin, 3.6rem)", textShadow: "0 2px 32px rgba(0,0,0,0.95)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.2em" }}
            >
              {isAr ? "360° خبراء الجولات الافتراضية" : "360 Virtual Tour Expert"}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.7, ease }}
              style={{ width: "clamp(180px, 32vw, 340px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)", margin: "18px 0" }}
            />
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="font-thin text-white/55 leading-snug text-center px-6"
              style={{ fontSize: "clamp(0.72rem, 1.8vmin, 0.92rem)", textShadow: "0 1px 16px rgba(0,0,0,0.95)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.2em" }}
            >
              {isAr ? "مرحباً بك في المستقبل، مرحباً بك في X360" : "Welcome to the Future, Welcome to X360"}
            </motion.p>
          </div>

          {/* Scroll indicator — pinned to section bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-3 pointer-events-none"
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

      {/* ══ 2 · INTRO VIDEO ══ */}
      <SnapSection id="sec-intro">
        <IntroVideoSection />
      </SnapSection>

      {/* ══ 3 · INDUSTRY SHOWCASE ══ */}
      {/* Desktop: single snap section with controlled tab switching */}
      <section
        id="industry-showcase"
        className="hidden lg:flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ height: "100dvh", scrollSnapAlign: "start" }}
      >
        <IndustryShowcase desktop controlledActive={industryActive} />
      </section>
      {/* Mobile: 4 full-screen snap sections, one per industry */}
      <IndustryShowcaseMobileSnap />

      {/* ══ 4 · TRUSTED BY ══ */}
      <SnapSection id="sec-trusted">
        <TrustedBySection />
      </SnapSection>

      {/* ══ 5 · TRY IT ══ */}
      <SnapSection id="sec-tryit">
        <TryItSection />
      </SnapSection>

      {/* ══ 6 · IMMERSIVE 3D MAPPING ══ */}
      <SnapSection id="sec-3dmap">
        <ImmersiveMapSection />
      </SnapSection>

      {/* ══ 7 · GET IN TOUCH ══ */}
      <SnapSection id="sec-contact">
        <ContactSection />
      </SnapSection>

      {/* ══ 7 · FOOTER ══ */}
      <section
        id="sec-footer"
        style={{ scrollSnapAlign: "start", flexShrink: 0 }}
      >
        <Footer />
      </section>

    </div>
  );
}
