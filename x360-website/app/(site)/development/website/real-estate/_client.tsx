"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useMediaConfig } from "@/lib/useMediaConfig";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Globe, Smartphone, Bot, BarChart3, Database,
  Eye, Zap, MessageSquare, Activity, Settings, TrendingUp,
  Cpu, Network, MapPin, Building2, Users, Shield,
  Layers, Map, Star, BedDouble, CheckCircle2, Wifi, ShoppingCart,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import OtherIndustriesStrip from "@/components/ui/OtherIndustriesStrip";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

/* ── AMBIENT GRID ────────────────────────────────────────────────────── */
function Grid({ opacity = 0.018 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ opacity, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
  );
}

/* ── CINEMATIC GLOW ──────────────────────────────────────────────────── */
function Glow({ color = "107,163,214", x = "50%", y = "45%", size = "80vw", intensity = 0.12 }: { color?: string; x?: string; y?: string; size?: string; intensity?: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
        background: `radial-gradient(ellipse, rgba(${color},${intensity}) 0%, transparent 65%)` }} />
  );
}

/* ── ANIMATED TEXT CYCLE ──────────────────────────────────────────── */
function AnimatedTextCycle({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);
  const cycleRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(cycleRef, { once: false });
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [inView, words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span ref={cycleRef} className={`relative inline-block ${className}`} aria-live="polite">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function GlowRuleCenter() {
  return (
    <div style={{ width: "clamp(80px, 16vw, 180px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)", margin: "0 auto" }} />
  );
}

/* ══ WHO WE BUILD FOR data (kept for reference but no longer used) ══ */
const AUDIENCES = [
  { en: "Real Estate Developers",      ar: "مطورو العقارات"      },
  { en: "Property Brokers",            ar: "وسطاء العقارات"       },
  { en: "Real Estate Agencies",        ar: "وكالات العقارات"      },
  { en: "Luxury Estates",              ar: "المنازل الفاخرة"      },
  { en: "Commercial Estate",            ar: "العقارات التجارية"    },
  { en: "Smart Communities",           ar: "المجتمعات الذكية"     },
  { en: "Property Enterprises",        ar: "المؤسسات العقارية"    },
];

/* Wave-in letter animation */
function WaveWord({ text }: { text: string }) {
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span key={`${text}-${i}`}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: i * 0.035, ease }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}>
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function AudienceCycler({ isAr }: { isAr: boolean }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setIdx(i => (i + 1) % AUDIENCES.length), 2600);
    return () => clearInterval(id);
  }, [inView]);

  const word = isAr ? AUDIENCES[idx].ar : AUDIENCES[idx].en;

  return (
    <div ref={ref} className="flex flex-col items-center gap-0 w-full">
      {/* Large cycling word */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 110 }}>
        <AnimatePresence mode="wait">
          <motion.h2 key={`${idx}-${isAr}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ duration: 0.25 }}
            className="font-thin leading-none text-center absolute"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)", color: "rgba(255,255,255,0.82)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.01em" }}>
            <WaveWord text={word} />
            <span style={{ color: "rgba(255,255,255,0.82)" }}>.</span>
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══ TRUST LOGOS ═════════════════════════════════════════════════════ */
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

/* ══ ECOSYSTEM VIZ — Enhanced ═══════════════════════════════════════ */
const ECO_NODES = [
  { icon: Globe,        label: "Website",        angle: -90,  r: 170, color: "#6BA3D6", sub: "Luxury & Custom" },
  { icon: Smartphone,   label: "Mobile App",     angle: -38,  r: 170, color: "#52D39B", sub: "iOS & Android" },
  { icon: Eye,          label: "360° Tours",     angle: 14,   r: 170, color: "#38BDF8", sub: "Virtual Reality" },
  { icon: Bot,          label: "AI Systems",     angle: 66,   r: 170, color: "#A78BFA", sub: "Smart Agents" },
  { icon: BarChart3,    label: "Analytics",      angle: 118,  r: 170, color: "#F4A261", sub: "Real-Time Data" },
  { icon: Database,     label: "CRM / ERP",      angle: 170,  r: 170, color: "#F87171", sub: "Enterprise" },
  { icon: Layers,       label: "Digital Twins",  angle: -142, r: 170, color: "#E2B96F", sub: "3D Models" },
  { icon: Shield,       label: "Cybersecurity",  angle: -165 + 360 / 8, r: 170, color: "#34D399", sub: "Enterprise Grade" },
];

function EcosystemViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [pulse, setPulse] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const SIZE = 420;
  const CX = SIZE / 2, CY = SIZE / 2;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setPulse(p => (p + 1) % ECO_NODES.length), 600);
    return () => clearInterval(id);
  }, [inView]);

  const active = hovered !== null ? hovered : pulse;

  return (
    <div ref={ref} className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: SIZE, height: SIZE }}>
      {/* Outer orbit ring */}
      <motion.div className="absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease }}
        style={{ width: 360, height: 360, border: "1px solid rgba(255,255,255,0.05)", left: (SIZE - 360) / 2, top: (SIZE - 360) / 2 }} />
      <motion.div className="absolute rounded-full pointer-events-none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{ width: 280, height: 280, border: "1px dashed rgba(255,255,255,0.04)", left: (SIZE - 280) / 2, top: (SIZE - 280) / 2 }} />

      {/* SVG connection lines */}
      <svg className="absolute inset-0 pointer-events-none" width={SIZE} height={SIZE}>
        {ECO_NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const nx = CX + n.r * Math.cos(rad);
          const ny = CY + n.r * Math.sin(rad);
          const isActive = active === i;
          return (
            <motion.line key={i} x1={CX} y1={CY} x2={nx} y2={ny}
              stroke={isActive ? n.color : "rgba(255,255,255,0.06)"}
              strokeWidth={isActive ? 1.5 : 0.7}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }} />
          );
        })}
      </svg>

      {/* Center hub */}
      <motion.div className="absolute flex flex-col items-center justify-center rounded-full z-20"
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        style={{ width: 90, height: 90, left: CX - 45, top: CY - 45,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 0 40px rgba(255,255,255,0.08)" }}>
        <span className="text-[10px] font-bold tracking-[0.22em] text-white/80">X360</span>
        <span className="text-[8px] tracking-widest text-white/35 uppercase">Core</span>
        <motion.div className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0.0)","0 0 30px rgba(255,255,255,0.12)","0 0 0px rgba(255,255,255,0.0)"] }}
          transition={{ duration: 2.8, repeat: Infinity }} />
      </motion.div>

      {/* Nodes */}
      {ECO_NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const nodeSize = 52;
        const nx = CX + n.r * Math.cos(rad) - nodeSize / 2;
        const ny = CY + n.r * Math.sin(rad) - nodeSize / 2;
        const Icon = n.icon;
        const isActive = active === i;
        return (
          <motion.div key={i} className="absolute flex flex-col items-center gap-1 z-10 cursor-pointer"
            style={{ left: nx - 6, top: ny - 6, width: nodeSize + 12 }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 + i * 0.07, ease }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <motion.div className="rounded-xl flex items-center justify-center"
              animate={isActive
                ? { boxShadow: `0 0 22px ${n.color}60`, borderColor: `${n.color}70`, background: `${n.color}14` }
                : { boxShadow: "none", borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
              transition={{ duration: 0.3 }}
              style={{ width: nodeSize, height: nodeSize, border: "1px solid rgba(255,255,255,0.08)" }}>
              <Icon style={{ width: 18, height: 18, color: isActive ? n.color : "rgba(255,255,255,0.28)" }} />
            </motion.div>
            <span className="text-center leading-tight"
              style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                color: isActive ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.25)", width: 68, marginLeft: -8 }}>
              {n.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══ 360 SPHERE VISUAL ═══════════════════════════════════════════════ */
function SphereViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="relative flex items-center justify-center flex-shrink-0" style={{ width: 340, height: 340 }}>
      {/* Rings */}
      {[340, 260, 180].map((s, i) => (
        <motion.div key={s} className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: i * 0.18, ease }}
          style={{
            width: s, height: s,
            border: `1px solid rgba(56,189,248,${0.08 - i * 0.015})`,
            left: (340 - s) / 2, top: (340 - s) / 2,
          }} />
      ))}
      {/* Rotating orbit */}
      <motion.div className="absolute rounded-full" style={{ width: 300, height: 300, left: 20, top: 20, border: "1px dashed rgba(56,189,248,0.15)" }}
        animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
      {/* Orbit dots */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 150;
        const cx = 170 + r * Math.cos(rad);
        const cy = 170 + r * Math.sin(rad);
        return (
          <motion.div key={i} className="absolute rounded-full"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{ width: 8, height: 8, background: "#38BDF8", left: cx - 4, top: cy - 4,
              boxShadow: "0 0 12px rgba(56,189,248,0.7)" }} />
        );
      })}
      {/* Center glow */}
      <motion.div className="absolute rounded-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        style={{ width: 100, height: 100, left: 120, top: 120,
          background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
          border: "1px solid rgba(56,189,248,0.25)" }}>
        <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-center leading-tight"
          style={{ color: "rgba(56,189,248,0.85)" }}>360°<br />TOURS</span>
        <motion.div className="absolute inset-0 rounded-full"
          animate={{ boxShadow: ["0 0 0px rgba(56,189,248,0)","0 0 30px rgba(56,189,248,0.25)","0 0 0px rgba(56,189,248,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }} />
      </motion.div>
    </div>
  );
}

/* ══ AI ORBIT ════════════════════════════════════════════════════════ */
const AI_FEATURES = [
  { icon: MessageSquare, label: "AI Chatbots",           angle: -90,  r: 130, color: "#A78BFA" },
  { icon: Zap,           label: "Lead Qualification",    angle: -30,  r: 130, color: "#38BDF8" },
  { icon: Bot,           label: "Smart Discovery",       angle: 30,   r: 130, color: "#52D39B" },
  { icon: Activity,      label: "WhatsApp Automation",   angle: 90,   r: 130, color: "#F4A261" },
  { icon: TrendingUp,    label: "AI Recommendations",    angle: 150,  r: 130, color: "#F87171" },
  { icon: BarChart3,     label: "Smart Analytics",       angle: -150, r: 130, color: "#E2B96F" },
];

function AIOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [pulse, setPulse] = useState(0);
  const SIZE = 320;
  const CX = SIZE / 2, CY = SIZE / 2;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setPulse(p => (p + 1) % AI_FEATURES.length), 800);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg className="absolute inset-0 pointer-events-none" width={SIZE} height={SIZE}>
        <circle cx={CX} cy={CY} r={130} fill="none" stroke="rgba(167,139,250,0.08)" strokeWidth={1} strokeDasharray="4 6" />
        {AI_FEATURES.map((f, i) => {
          const rad = (f.angle * Math.PI) / 180;
          const nx = CX + f.r * Math.cos(rad);
          const ny = CY + f.r * Math.sin(rad);
          return (
            <motion.line key={i} x1={CX} y1={CY} x2={nx} y2={ny}
              stroke={pulse === i ? f.color : "rgba(255,255,255,0.04)"}
              strokeWidth={pulse === i ? 1.2 : 0.5}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }} />
          );
        })}
      </svg>
      {/* Center */}
      <motion.div className="absolute rounded-full flex items-center justify-center"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        style={{ width: 80, height: 80, left: CX - 40, top: CY - 40,
          background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.25)" }}>
        <span className="text-[9px] font-bold tracking-[0.2em] text-purple-300/80">AI</span>
        <motion.div className="absolute inset-0 rounded-full"
          animate={{ boxShadow: ["0 0 0 rgba(167,139,250,0)","0 0 28px rgba(167,139,250,0.25)","0 0 0 rgba(167,139,250,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity }} />
      </motion.div>
      {/* Nodes */}
      {AI_FEATURES.map((f, i) => {
        const rad = (f.angle * Math.PI) / 180;
        const nx = CX + f.r * Math.cos(rad) - 24;
        const ny = CY + f.r * Math.sin(rad) - 24;
        const Icon = f.icon;
        return (
          <motion.div key={i} className="absolute flex flex-col items-center gap-1"
            style={{ left: nx - 8, top: ny - 8, width: 64 }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 + i * 0.08, ease }}>
            <motion.div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center"
              animate={pulse === i
                ? { boxShadow: `0 0 18px ${f.color}55`, borderColor: `${f.color}60`, background: `${f.color}14` }
                : { boxShadow: "none", borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <Icon style={{ width: 16, height: 16, color: pulse === i ? f.color : "rgba(255,255,255,0.25)" }} />
            </motion.div>
            <span className="text-center leading-tight"
              style={{ fontSize: 7.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                color: pulse === i ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.22)" }}>
              {f.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══ DASHBOARD MOCKUP ════════════════════════════════════════════════ */
function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bars = [65, 82, 47, 91, 73, 58, 88];
  return (
    <motion.div ref={ref} className="relative rounded-2xl overflow-hidden w-full max-w-[460px]"
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex gap-1.5">
          {["#F87171","#F4A261","#52D39B"].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
        </div>
        <span className="text-[9px] tracking-[0.2em] uppercase ms-2" style={{ color: "rgba(255,255,255,0.25)" }}>X360 Property Dashboard</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[["142","Listings"],["SAR 2.1B","Portfolio"],["98%","Uptime"]].map(([val, label]) => (
            <div key={label} className="rounded-xl p-3 flex flex-col gap-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-[13px] font-semibold text-white/80">{val}</span>
              <span className="text-[8px] tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-end gap-1.5 h-16">
            {bars.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-sm"
                style={{ background: "linear-gradient(to top, rgba(107,163,214,0.6), rgba(107,163,214,0.2))" }}
                initial={{ height: 0 }} animate={inView ? { height: `${h}%` } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease }} />
            ))}
          </div>
        </div>
        {[["Al Nakheel Villa","SAR 4.2M"],["KAFD Tower","SAR 12.5M"],["Panorama Heights","SAR 2.8M"]].map(([n,p],i) => (
          <motion.div key={n} className="flex items-center justify-between px-3 py-2 rounded-lg"
            initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.65 + i * 0.07, ease }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.52)" }}>{n}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.78)" }}>{p}</span>
              <span className="text-[8px]" style={{ color: "#52D39B" }}>●</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══ REAL-ESTATE SERVICES CAROUSEL ═══════════════════════════════════ */
const RE_SERVICES = [
  { id: "websites",       label: "Websites",                    labelAr: "المواقع الإلكترونية",              icon: Globe,         image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1200", description: "Stunning luxury real-estate websites — custom-coded, SEO-ready, and built to convert high-intent buyers.",              descAr: "مواقع عقارية فاخرة مذهلة — مُبرمجة مخصصة وجاهزة لـ SEO ومصممة لتحويل المشترين ذوي النية الجادة." },
  { id: "mobile",         label: "Mobile Applications",         labelAr: "تطبيقات الجوال",                   icon: Smartphone,    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200", description: "Native iOS & Android apps — property search, virtual tours, and direct agent contact in one tap.",                      descAr: "تطبيقات iOS وAndroid أصيلة — بحث عن العقارات وجولات افتراضية وتواصل مباشر مع الوكيل بنقرة واحدة." },
  { id: "admin",          label: "Admin Dashboards",            labelAr: "لوحات التحكم الإدارية",            icon: Settings,      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200", description: "Powerful back-office dashboards: manage listings, documents, teams, and analytics in one place.",                      descAr: "لوحات تحكم مكتبية قوية: إدارة الإدراجات والوثائق والفرق والتحليلات من مكان واحد." },
  { id: "ai-agents",      label: "AI Agents / AI Chatbots",     labelAr: "وكلاء الذكاء الاصطناعي",          icon: Bot,           image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200", description: "AI that qualifies leads 24/7, answers property queries, and books viewings — automatically.",                          descAr: "ذكاء اصطناعي يؤهّل العملاء المحتملين على مدار الساعة ويجيب على استفسارات العقارات ويحجز المشاهدات تلقائياً." },
  { id: "tours360",       label: "360° Virtual Tours",          labelAr: "جولات افتراضية 360°",              icon: Eye,           image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200", description: "Let buyers walk every room remotely — cinematic 360° tours that sell properties before the first visit.",              descAr: "دع المشترين يتجولون في كل غرفة عن بُعد — جولات 360° سينمائية تبيع العقارات قبل الزيارة الأولى." },
  { id: "twins3d",        label: "3D Digital Twins",            labelAr: "التوائم الرقمية ثلاثية الأبعاد",  icon: Layers,        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200", description: "Exact digital replicas of your properties — enabling remote inspections, renovations, and planning.",                  descAr: "نسخ رقمية دقيقة من عقاراتك تُمكّن من الفحص عن بُعد والتجديدات والتخطيط." },
  { id: "vrar",           label: "VR / AR Experiences",         labelAr: "تجارب الواقع الافتراضي والمعزز",  icon: Cpu,           image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1200", description: "Immersive virtual reality and augmented reality experiences that let buyers explore before they visit.",                descAr: "تجارب غامرة في الواقع الافتراضي والمعزز تتيح للمشترين استكشاف العقارات قبل الزيارة." },
  { id: "seo",            label: "SEO Optimization",            labelAr: "تحسين محركات البحث",               icon: TrendingUp,    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200", description: "Data-driven SEO strategies that put your listings at the top of every search result.",                                 descAr: "استراتيجيات SEO مبنية على البيانات تضع إدراجاتك في صدارة نتائج البحث." },
  { id: "hosting",        label: "Hosting",                     labelAr: "الاستضافة",                        icon: Wifi,          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200", description: "Enterprise-grade cloud hosting with 99.9% uptime SLA, global CDN, and auto-scaling.",                                 descAr: "استضافة سحابية بمستوى المؤسسات مع ضمان 99.9% وقت تشغيل وشبكة CDN عالمية وتوسع تلقائي." },
  { id: "cyber",          label: "Cybersecurity",               labelAr: "الأمن السيبراني",                  icon: Shield,        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200", description: "Bank-grade security protocols protecting your client data, transactions, and digital infrastructure.",                 descAr: "بروتوكولات أمان بمستوى البنوك تحمي بيانات عملائك ومعاملاتك وبنيتك الرقمية." },
  { id: "crm",            label: "CRM Integrations",            labelAr: "تكاملات CRM",                      icon: Users,         image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200", description: "Seamless CRM integrations that centralise leads, automate follow-ups, and close deals faster.",                       descAr: "تكاملات CRM سلسة تمركز العملاء المحتملين وتؤتمت المتابعات وتُسرّع إغلاق الصفقات." },
  { id: "erp",            label: "ERP / SAP Integrations",      labelAr: "تكاملات ERP / SAP",                icon: Database,      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200", description: "Enterprise ERP and SAP integrations that unify finance, operations, and project management.",                         descAr: "تكاملات ERP وSAP المؤسسية التي توحّد المالية والعمليات وإدارة المشاريع." },
  { id: "analytics",      label: "Analytics Dashboards",        labelAr: "لوحات التحليل",                    icon: BarChart3,     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200", description: "Real-time dashboards turning property data into actionable sales and marketing intelligence.",                         descAr: "لوحات تحكم في الوقت الفعلي تحوّل بيانات العقارات إلى استخبارات مبيعات وتسويق قابلة للتنفيذ." },
  { id: "leads",          label: "Lead Management Systems",     labelAr: "أنظمة إدارة العملاء المحتملين",   icon: MapPin,        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200", description: "End-to-end lead pipelines — capture, qualify, nurture, and convert with intelligent automation.",                      descAr: "مسارات عملاء محتملين شاملة — استقطب وأهّل وارعَ وحوّل بأتمتة ذكية." },
  { id: "whatsapp",       label: "WhatsApp Automation",         labelAr: "أتمتة واتساب",                     icon: MessageSquare, image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200", description: "Automated WhatsApp journeys that follow up on leads, send listings, and book viewings 24/7.",                         descAr: "رحلات واتساب مؤتمتة تتابع العملاء المحتملين وترسل الإدراجات وتحجز المشاهدات على مدار الساعة." },
  { id: "enterprise",     label: "Enterprise Infrastructure",   labelAr: "البنية التحتية المؤسسية",          icon: Building2,     image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200", description: "Scalable enterprise-grade infrastructure designed for high-volume property portals and agencies.",                     descAr: "بنية تحتية مؤسسية قابلة للتوسع مصممة لبوابات العقارات ذات الحجم الكبير والوكالات." },
  { id: "cloud",          label: "Cloud Systems",               labelAr: "الأنظمة السحابية",                 icon: Network,       image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200", description: "Fully managed cloud ecosystems — microservices, serverless, and containerised workloads.",                             descAr: "منظومات سحابية مُدارة بالكامل — خدمات دقيقة وبدون خادم وأعباء عمل محوسبة." },
  { id: "content",        label: "Content Creation",            labelAr: "إنشاء المحتوى",                    icon: Star,          image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200", description: "Professional photography, video, copywriting, and social content tailored for real estate.",                           descAr: "تصوير احترافي وفيديو وكتابة إبداعية ومحتوى اجتماعي مصمم خصيصاً للعقارات." },
  { id: "uiux",           label: "UI/UX Design",                labelAr: "تصميم UI/UX",                      icon: Map,           image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200", description: "Luxury-grade UI/UX design that makes every digital touchpoint feel premium and effortless.",                          descAr: "تصميم واجهات بمستوى فاخر يجعل كل نقطة تواصل رقمية تبدو راقية وسلسة." },
  { id: "smart-cx",       label: "Smart Customer Experiences",  labelAr: "تجارب عملاء ذكية",                 icon: Zap,           image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200", description: "Personalised buyer journeys powered by AI — from first click to signed contract.",                                   descAr: "رحلات مشترين شخصية مدعومة بالذكاء الاصطناعي — من النقرة الأولى إلى العقد الموقّع." },
  { id: "automation",     label: "Automation Systems",          labelAr: "أنظمة الأتمتة",                    icon: Activity,      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200", description: "Eliminate manual work with intelligent automation pipelines connecting every system you use.",                          descAr: "تخلص من العمل اليدوي بخطوط أتمتة ذكية تربط كل نظام تستخدمه." },
];

const RE_ITEM_HEIGHT = 54;
const RE_AUTO_PLAY = 3800;
const reWrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function RealEstateServicesCarousel() {
  const { isAr } = useLang();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const cur = ((step % RE_SERVICES.length) + RE_SERVICES.length) % RE_SERVICES.length;
  const next = () => setStep(p => p + 1);
  const goTo = (i: number) => {
    const diff = (i - cur + RE_SERVICES.length) % RE_SERVICES.length;
    if (diff > 0) setStep(s => s + diff);
  };
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, RE_AUTO_PLAY);
    return () => clearInterval(id);
  }, [paused, step]);

  const status = (i: number) => {
    let d = i - cur;
    const len = RE_SERVICES.length;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  const current = RE_SERVICES[cur]!;
  const CurIcon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] flex flex-col lg:flex-row"
        style={{ minHeight: "min(340px, calc(100vh - 320px))", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>

        {/* LEFT · scrolling label list */}
        <div className="w-full lg:w-[42%] relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "min(220px, calc(50vh - 90px))", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />
          <div className="relative w-full flex items-center justify-start ps-8 sm:ps-12 lg:ps-14"
            style={{ height: RE_ITEM_HEIGHT * 5 }}>
            {RE_SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isActive = i === cur;
              const d = reWrap(-(RE_SERVICES.length / 2), RE_SERVICES.length / 2, i - cur);
              return (
                <motion.div key={svc.id} style={{ height: RE_ITEM_HEIGHT, width: "fit-content" }}
                  animate={{ y: d * RE_ITEM_HEIGHT, opacity: 1 - Math.abs(d) * 0.22 }}
                  transition={{ type: "tween", duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex items-center">
                  <button onClick={() => goTo(i)}
                    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
                    className="flex items-center gap-3.5 px-5 py-3 rounded-full transition-all duration-500 text-start"
                    style={{
                      background: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.03)",
                      border: isActive ? "1px solid rgba(255,255,255,1)" : "1px solid rgba(255,255,255,0.10)",
                      color: isActive ? "#000" : "rgba(255,255,255,0.45)",
                    }}>
                    <Icon className="flex-shrink-0 transition-colors duration-500"
                      style={{ width: 16, height: 16, color: isActive ? "#000" : "rgba(255,255,255,0.35)" }} />
                    <span className={`text-[13px] font-medium tracking-wide ${!isAr ? "whitespace-nowrap" : ""}`}>{isAr ? svc.labelAr : svc.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT · card fan */}
        <div className="flex-1 relative flex items-center justify-center py-8 px-4 lg:px-8 overflow-hidden"
          style={{ minHeight: 280, background: "rgba(255,255,255,0.01)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle 380px at 55% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
          <div className="relative w-full max-w-[240px] aspect-[4/5]">
            {RE_SERVICES.map((svc, i) => {
              const s = status(i);
              const isActive = s === "active";
              const isPrev = s === "prev";
              const isNext = s === "next";
              const CardIcon = svc.icon;
              return (
                <motion.div key={svc.id} initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                    scale: isActive ? 1 : (isPrev || isNext) ? 0.87 : 0.72,
                    opacity: isActive ? 1 : (isPrev || isNext) ? 0.35 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : (isPrev || isNext) ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-[1.8rem] overflow-hidden origin-center"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", background: "#0a0a0a" }}>
                  <img src={svc.image} alt={svc.label} className="w-full h-full object-cover"
                    style={{ filter: isActive ? "grayscale(20%) brightness(0.75)" : "grayscale(100%) brightness(0.45) blur(2px)" }} />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}
                        className="absolute inset-x-0 bottom-0 p-6 pt-24 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)" }}>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full w-fit mb-2"
                          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                          <CardIcon style={{ width: 11, height: 11, color: "rgba(255,255,255,0.7)" }} />
                          <span className="text-white/70 text-[9px] font-semibold uppercase tracking-[0.22em]">{isAr ? svc.labelAr : svc.label}</span>
                        </div>
                        <p className="text-white text-base sm:text-lg font-light leading-snug drop-shadow-md">{isAr ? svc.descAr : svc.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="absolute top-5 left-5 flex items-center gap-2 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }} />
                    <span className="text-white/60 text-[9px] font-mono uppercase tracking-[0.3em]">X360</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {RE_SERVICES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === cur ? 18 : 5, height: 5, background: i === cur ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  { q: "What real estate digital solutions does X360 build for Saudi developers?", qAr: "ما الحلول الرقمية العقارية التي تبنيها X360 للمطورين السعوديين؟", a: "X360 builds off-plan property platforms, master development microsites, investor portals, interactive floor-plan configurators, and agent management platforms — all with 360° virtual tour integration for immersive property presentations.", aAr: "تبني X360 منصات العقارات على الخريطة ومواقع المشاريع الكبرى وبوابات المستثمرين ومهيئات مخططات الأرضيات التفاعلية ومنصات إدارة الوكلاء — جميعها مع تكامل الجولات الافتراضية 360° لعروض العقارات الغامرة." },
  { q: "Can X360 integrate 360° virtual tours into real estate listing websites?", qAr: "هل تستطيع X360 دمج جولات افتراضية 360° في مواقع قوائم العقارات؟", a: "Yes. X360 embeds interactive 360° property tours and digital twins directly into real estate websites — enabling buyers and investors to explore properties remotely before visiting in person, especially valuable for off-plan and international investment.", aAr: "نعم. تُدمج X360 جولات العقارات الافتراضية التفاعلية 360° والتوائم الرقمية مباشرةً في مواقع العقارات — تُمكِّن المشترين والمستثمرين من استكشاف العقارات عن بُعد قبل الزيارة الشخصية، وهو أمر ذو قيمة خاصة للعقارات على الخريطة والاستثمار الدولي." },
  { q: "How does X360 handle Arabic/English bilingual real estate platforms?", qAr: "كيف تتعامل X360 مع منصات العقارات ثنائية اللغة العربية/الإنجليزية؟", a: "All X360 real estate platforms are fully bilingual — Arabic (RTL) and English (LTR) — a critical requirement for Saudi developers targeting both local and international GCC and global investors.", aAr: "جميع منصات X360 العقارية ثنائية اللغة بالكامل — عربي (RTL) وإنجليزي (LTR) — وهو متطلب أساسي للمطورين السعوديين الذين يستهدفون المستثمرين المحليين والدوليين من دول الخليج والعالم." },
  { q: "Can X360 build real estate portals that integrate with CRM systems?", qAr: "هل تستطيع X360 بناء بوابات عقارية تتكامل مع أنظمة CRM؟", a: "Yes. X360 builds real estate platforms that integrate with Salesforce, HubSpot, and custom CRM systems — enabling automated lead capture from property websites, virtual tour enquiries, and floor-plan configurator sessions.", aAr: "نعم. تبني X360 منصات عقارية تتكامل مع Salesforce وHubSpot وأنظمة CRM المخصصة — مما يتيح التقاط العملاء المحتملين تلقائياً من مواقع العقارات واستفسارات الجولات الافتراضية وجلسات مهيئ مخططات الأرضيات." },
  { q: "Which real estate developers in Saudi Arabia has X360 worked with?", qAr: "مع أي مطورين عقاريين في المملكة العربية السعودية عملت X360؟", a: "X360 has worked with residential developers, master developers, and property investment groups across Riyadh, Jeddah, Dammam, and NEOM. Client references are available upon request under NDA.", aAr: "عملت X360 مع مطورين سكنيين ومطورين رئيسيين ومجموعات استثمار عقاري في الرياض وجدة والدمام ونيوم. مراجع العملاء متاحة عند الطلب بموجب اتفاقية سرية." },
];

export default function RealEstateClient() {
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
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 · HERO — fullscreen cinematic video
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="hero" className="flex flex-col items-center justify-center">
        <video className="hidden sm:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("real-estate.hero-video", "/x360/real-estate-web.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0, opacity: 1 }} />
        <video className="sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={get("real-estate.mobile-video", "/x360/real-estate-web.mp4")}
          autoPlay muted loop playsInline
          style={{ zIndex: 0, opacity: 1 }} />

        <div className="relative flex flex-col items-center text-center gap-7 px-10 py-10 rounded-2xl"
          style={{ zIndex: 10, maxWidth: 1100, background: "rgba(0,0,0,0.20)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <FadeUp delay={0.15}>
            <Badge>{t("Web Development · Real Estate", "تطوير المواقع · العقارات")}</Badge>
          </FadeUp>

          <FadeUp delay={0.28}>
            <h1 className="font-thin leading-tight tracking-[0.06em] uppercase"
              style={{ fontSize: "clamp(1.1rem, 2.4vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
              {t("Real Estate.", "العقارات.")} <span style={{ color: "#b0b0b0" }}>{t("Reimagined", "أُعيد تصوّرها")}</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.42}>
            <motion.div style={{ width: "clamp(120px, 28vw, 280px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)" }} />
          </FadeUp>

          <FadeUp delay={0.52}>
            <p className="font-light leading-relaxed"
              style={{ fontSize: "clamp(0.65rem, 1vw, 0.78rem)", color: "rgba(255,255,255,1)", maxWidth: 560 }}>
              {t(
                "Immersive property ecosystems powered by AI, 360° experiences, digital twins, automation, and luxury technology design.",
                "منظومات عقارية غامرة مدعومة بالذكاء الاصطناعي وتجارب 360° والتوائم الرقمية وتصميم التقنية الفاخرة."
              )}
            </p>
          </FadeUp>

        </div>

        {/* Scroll indicator */}
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

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 · WE BUILD FOR — exact replica of web-ai page
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="audience" className="flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-5xl w-full mx-auto text-center px-6">
          <FadeUp delay={0.08}>
            <p className="text-white/30 font-medium mb-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>
              {t("We Build For", "نبني لـ")}
            </p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <h2 className={`font-thin leading-tight mb-4 ${!isAr ? "lg:whitespace-nowrap" : ""}`} style={{ fontSize: "clamp(1.2rem, 2.64vw, 2.16rem)" }}>
              <AnimatedTextCycle
                words={isAr
                  ? ["مطورو العقارات", "وسطاء العقارات", "الوكالات العقارية", "العقارات الفاخرة", "العقارات التجارية", "المجتمعات الذكية", "مؤسسات العقارات"]
                  : ["Real Estate Developers", "Property Brokers", "Real Estate Agencies", "Luxury Estates", "Commercial Estate", "Smart Communities", "Property Enterprises"]}
                interval={2000}
              />
            </h2>
          </FadeUp>
          <FadeUp delay={0.22}>
            <GlowRuleCenter />
          </FadeUp>
          <FadeUp delay={0.28}>
            <p className="text-white/30 max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>
              {t("Every property. Every scale. One complete digital ecosystem.", "كل عقار. كل نطاق. منظومة رقمية متكاملة واحدة.")}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2B · PROPERTY SHOWCASE — 16:9 IMAGE SCROLL
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="showcase" className="flex flex-col items-center justify-center" style={{ height: "100vh", minHeight: "unset" }}>
        <Glow color="107,163,214" x="50%" y="50%" size="70vw" intensity={0.06} />

        <div className="relative z-10 flex flex-col items-center w-full gap-10">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <FadeUp delay={0}>
              <Badge>{t("Website Development", "تطوير المواقع")}</Badge>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("This Is What We Can Do", "هذا ما نستطيع فعله")}
              </h2>
            </FadeUp>
            <FadeIn delay={0.2}>
              <div className="h-px" style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)" }} />
            </FadeIn>
          </div>

          {/* 16:9 scrolling strip */}
          <FadeIn delay={0.3} className="relative w-full overflow-hidden marquee-outer">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
              style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />

            <div dir="ltr" className="inline-flex items-center gap-5 py-2" style={{ animation: "marquee-scroll 44s linear infinite" }}>
              {[
                "/x360/showcase/1.gif",
                "/x360/showcase/2.jpg",
                "/x360/showcase/3.gif",
                "/x360/showcase/5.gif",
                "/x360/showcase/6.jpg",
                "/x360/showcase/7.jpg",
                // duplicated for seamless loop
                "/x360/showcase/1.gif",
                "/x360/showcase/2.jpg",
                "/x360/showcase/3.gif",
                "/x360/showcase/5.gif",
                "/x360/showcase/6.jpg",
                "/x360/showcase/7.jpg",
              ].map((src, i) => (
                <div key={i} className="flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ width: "clamp(280px, 36vw, 480px)", aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transform: "translateZ(0)", isolation: "isolate" }}>
                  <img src={src} alt={`Property ${(i % 6) + 1}`} loading="eager" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ opacity: 0.88, transform: "translateZ(0)" }} />
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Subtle tagline */}
          <FadeUp delay={0.5}>
            <p className="text-[10px] tracking-[0.26em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
              {t("Luxury · Residential · Commercial · Smart", "فاخر · سكني · تجاري · ذكي")}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3B · OUR SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="sector" className="flex items-center">
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
              <div style={{ width: "clamp(80px, 16vw, 180px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)", margin: "16px auto" }} />
              <p className="text-white/35 text-sm mt-4 mx-auto text-center lg:whitespace-nowrap">
                {t("End-to-end digital solutions built specifically for the real estate industry.", "حلول رقمية متكاملة مصممة خصيصاً لقطاع العقارات.")}
              </p>
            </FadeUp>
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: Globe,        en: "Websites",              ar: "المواقع الإلكترونية" },
                { icon: Smartphone,   en: "Mobile Applications",   ar: "تطبيقات الجوال" },
                { icon: Settings,     en: "Admin Dashboards",      ar: "لوحات التحكم" },
                { icon: Bot,          en: "AI Agents / Chatbots",  ar: "وكلاء الذكاء الاصطناعي" },
                { icon: Eye,          en: "360° Virtual Tours",    ar: "جولات افتراضية 360°" },
                { icon: Layers,       en: "3D Digital Twins",      ar: "التوائم الرقمية ثلاثية الأبعاد" },
                { icon: Cpu,          en: "VR / AR Experiences",   ar: "تجارب الواقع الافتراضي والمعزز" },
                { icon: TrendingUp,   en: "SEO Optimization",      ar: "تحسين محركات البحث" },
                { icon: Wifi,         en: "Hosting",               ar: "الاستضافة" },
                { icon: Shield,       en: "Cybersecurity",         ar: "الأمن السيبراني" },
              ].map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <FadeUp key={svc.en} delay={0.10 + i * 0.05}>
                    <motion.div
                      className="rounded-xl p-2 sm:p-5 text-center border cursor-default group flex flex-col items-center justify-center h-[82px] sm:h-auto"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                      whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.25 }}
                    >
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
                <Link href="/x360/contact" className="text-white/60 underline underline-offset-4 hover:text-white transition-colors">
                  {t("Talk to an expert", "تحدث مع خبير")}
                </Link>
              </p>
            </FadeUp>
          </div>
        </div>
      </Snap>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 · SHOWCASE VIDEO
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="showcase-video" className="flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden" style={{ background: "#000" }}>
          {/* Subtle top/bottom vignette */}
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

          {/* Ambient glow behind video */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107,163,214,0.06) 0%, transparent 70%)" }} />

          {/* Header */}
          <FadeUp delay={0.04} className="relative z-20 text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-4"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <Eye className="w-3 h-3" /> {t("360° Virtual Tours", "جولات افتراضية 360°")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-thin">
              {t("Real Estate, ", "العقارات، ")}
              <span style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Reimagined.", "معاد تصورها.")}
              </span>
            </h2>
          </FadeUp>

          {/* Video */}
          <FadeIn delay={0.14} className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 80px rgba(107,163,214,0.08), 0 32px 64px rgba(0,0,0,0.6)" }}>
              {/* Browser chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="flex-1 mx-4 px-3 py-0.5 rounded-md text-[10px] font-mono text-white/20 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  x-360.ai · real estate
                </div>
              </div>
              <video
                src={get("real-estate.section-video", "/x360/real-estate-video.mp4")}
                autoPlay
                muted
                loop
                playsInline
                className="w-full block"
                style={{ maxHeight: "55vh", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 5 · SHOWCASE IFRAME ══════════════════════════════════════ */}
      <Snap id="showcase-iframe" className="flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden" style={{ background: "#000" }}>
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to top,#000 0%,transparent 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107,163,214,0.06) 0%, transparent 70%)" }} />
          <FadeUp delay={0.04} className="relative z-20 text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-semibold text-white/45 mb-4"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <Eye className="w-3 h-3" /> {t("360° Platform Demo", "عرض المنصة 360°")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-thin">
              {t("Real Estate, ", "العقارات، ")}
              <span style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Interactive.", "تفاعلية.")}
              </span>
            </h2>
          </FadeUp>
          <FadeIn delay={0.14} className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 80px rgba(107,163,214,0.08), 0 32px 64px rgba(0,0,0,0.6)" }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="flex-1 mx-4 px-3 py-0.5 rounded-md text-[10px] font-mono text-white/20 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  x-360.ai · real estate
                </div>
              </div>
              <div className="relative" style={{ height: "55vh", background: "#050505" }}>
                <iframe src={get("dev.real-estate.iframe", "")} title="Real Estate 360° Demo" className="w-full h-full block border-0" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(107,163,214,0.08)", border: "1px solid rgba(107,163,214,0.22)" }}
                    animate={{ boxShadow: ["0 0 0 rgba(107,163,214,0)","0 0 28px rgba(107,163,214,0.28)","0 0 0 rgba(107,163,214,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}>
                    <Eye style={{ width: 22, height: 22, color: "#6BA3D6" }} />
                  </motion.div>
                  <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
                    {t("360° Demo — Coming Soon", "عرض 360° — قريباً")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* REMOVED: immersive, ai, why sections */}
      {false && <><Snap id="immersive" className="flex items-center">
        <Glow color="56,189,248" x="50%" y="45%" size="80vw" intensity={0.08} />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full h-full px-8 pt-20 pb-8">
          <div className="flex flex-col gap-6 lg:max-w-[40%]">
            <FadeUp delay={0.06}>
              <Badge color="rgba(56,189,248,0.80)" bg="rgba(56,189,248,0.08)" border="rgba(56,189,248,0.22)">
                {t("Immersive Technology", "التقنية الغامرة")}
              </Badge>
            </FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Beyond", "ما وراء")}<br />
                <span style={{ color: "rgba(56,189,248,0.70)" }}>{t("the Screen.", "الشاشة.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}>
              <p className="font-light leading-relaxed" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.38)", maxWidth: 400 }}>
                {t(
                  "Walk every property remotely. Our 360° virtual tours, 3D digital twins, VR/AR experiences, and interactive walkthroughs let buyers explore before they visit.",
                  "تجول في كل عقار عن بُعد. جولاتنا الافتراضية 360° والتوائم الرقمية ثلاثية الأبعاد وتجارب الواقع الافتراضي والجولات التفاعلية تتيح للمشترين الاستكشاف قبل الزيارة."
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.30} className="flex flex-col gap-3">
              {[
                { label: t("360° Virtual Tours","جولات 360° الافتراضية"),      color: "#38BDF8" },
                { label: t("3D Digital Twins","التوائم الرقمية ثلاثية الأبعاد"), color: "#A78BFA" },
                { label: t("VR / AR Experiences","تجارب الواقع الافتراضي"),    color: "#52D39B" },
                { label: t("Interactive Walkthroughs","الجولات التفاعلية"),     color: "#F4A261" },
                { label: t("3D Brochures","الكتيبات ثلاثية الأبعاد"),          color: "#F87171" },
              ].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07, ease }}>
                  <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                    animate={{ boxShadow: [`0 0 0px ${item.color}00`, `0 0 8px ${item.color}80`, `0 0 0px ${item.color}00`] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }} />
                  <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.60)" }}>{item.label}</span>
                </motion.div>
              ))}
            </FadeUp>
          </div>
          <FadeIn delay={0.3} className="flex-shrink-0">
            <SphereViz />
          </FadeIn>
        </div>
      </Snap>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 · AI INTELLIGENCE
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="ai" className="flex items-center">
        <Glow color="167,139,250" x="50%" y="50%" size="80vw" intensity={0.08} />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full h-full px-8 pt-20 pb-8">
          <FadeIn delay={0.25} className="flex-shrink-0 hidden lg:block">
            <AIOrbit />
          </FadeIn>
          <div className="flex flex-col gap-6 lg:max-w-[42%]">
            <FadeUp delay={0.06}>
              <Badge color="rgba(167,139,250,0.80)" bg="rgba(167,139,250,0.08)" border="rgba(167,139,250,0.22)">
                {t("AI Intelligence", "الذكاء الاصطناعي")}
              </Badge>
            </FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Properties", "عقارات")}<br />
                <span style={{ color: "rgba(167,139,250,0.70)" }}>{t("That Think.", "تفكر.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}>
              <p className="font-light leading-relaxed" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.38)", maxWidth: 400 }}>
                {t(
                  "AI that qualifies leads, recommends properties, automates WhatsApp follow-ups, and turns behavioral data into sales intelligence.",
                  "ذكاء اصطناعي يؤهل العملاء ويوصي بالعقارات ويؤتمت متابعة واتساب ويحوّل البيانات السلوكية إلى ذكاء مبيعات."
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.30} className="grid grid-cols-2 gap-2 max-w-[380px]">
              {[
                [MessageSquare, t("AI Chatbots","روبوتات محادثة"),          "#A78BFA"],
                [Zap,           t("Lead Qualification","تأهيل العملاء"),     "#38BDF8"],
                [Activity,      t("WhatsApp Automation","أتمتة واتساب"),     "#52D39B"],
                [TrendingUp,    t("AI Recommendations","توصيات ذكية"),       "#F4A261"],
                [BarChart3,     t("Smart Analytics","تحليلات ذكية"),         "#E2B96F"],
                [Bot,           t("Smart Discovery","اكتشاف ذكي"),          "#F87171"],
              ].map(([Icon, label, color], i) => {
                const I = Icon as React.ElementType;
                const l = label as string;
                const c = color as string;
                return (
                  <motion.div key={l} className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ background: `${c}10`, borderColor: `${c}30` }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.06 }}>
                    <I style={{ width: 12, height: 12, color: c, flexShrink: 0 }} />
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.58)" }}>{l}</span>
                  </motion.div>
                );
              })}
            </FadeUp>
            {/* AI orbit — mobile only */}
            <FadeIn delay={0.4} className="flex justify-center lg:hidden">
              <AIOrbit />
            </FadeIn>
          </div>
        </div>
      </Snap>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7 · WHY X360
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="why" className="flex items-center">
        <Grid opacity={0.013} />
        <Glow color="255,255,255" x="50%" y="50%" size="60vw" intensity={0.03} />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-10 px-8 pt-20 pb-8 text-center">
          <FadeUp delay={0.05}>
            <Badge>{t("Why X360", "لماذا X360")}</Badge>
          </FadeUp>
          <FadeUp delay={0.13}>
            <h2 className="font-thin leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "Quicksand, sans-serif", maxWidth: 700 }}>
              {t(
                "Enterprise-grade technology for the next generation of real estate.",
                "تقنية بمستوى المؤسسات للجيل القادم من العقارات."
              )}
            </h2>
          </FadeUp>

          {/* Manifesto statements */}
          <div className="flex flex-col gap-0 w-full max-w-[820px]">
            {[
              {
                title: t("Complete Digital Ecosystem", "منظومة رقمية متكاملة"),
                body: t("We don't build pieces. We build your entire digital presence under one intelligent roof.", "لا نبني أجزاءً. نبني حضورك الرقمي الكامل تحت سقف ذكي واحد."),
                color: "#6BA3D6",
              },
              {
                title: t("Immersive Technology", "تقنية غامرة"),
                body: t("360° tours, digital twins, VR/AR — capabilities most agencies can't even offer.", "جولات 360° وتوائم رقمية وواقع افتراضي — إمكانيات لا تستطيع معظم الوكالات تقديمها."),
                color: "#A78BFA",
              },
              {
                title: t("AI-Driven Intelligence", "ذكاء مدفوع بالذكاء الاصطناعي"),
                body: t("Not just automation. Intelligent systems that learn, adapt, and convert.", "ليس مجرد أتمتة. أنظمة ذكية تتعلم وتتكيف وتحوّل العملاء."),
                color: "#52D39B",
              },
              {
                title: t("Future-Ready Infrastructure", "بنية تحتية جاهزة للمستقبل"),
                body: t("Enterprise cloud, cybersecurity, uptime SLAs. Built to scale with your growth.", "سحابة مؤسسية وأمن سيبراني واتفاقيات وقت تشغيل. مبنية للتوسع مع نموك."),
                color: "#F4A261",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.22 + i * 0.08}>
                <motion.div className="flex items-start gap-5 py-6 border-b text-start"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.015)" }}>
                  <motion.div className="w-px flex-shrink-0 self-stretch mt-1"
                    style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
                    initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-sm font-semibold tracking-wide" style={{ color: item.color }}>{item.title}</span>
                    <span className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.body}</span>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Snap></>}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8 · TRUSTED CLIENTS — exact 360 replica
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="clients" className="flex flex-col items-center justify-center" style={{ height: "100vh", minHeight: "unset" }}>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Subtle ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />

          <div className="flex flex-col items-center text-center gap-8 w-full relative z-10">
            {/* Badge */}
            <FadeUp delay={0}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.18em] uppercase"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                {t("Kingdom of Saudi Arabia", "المملكة العربية السعودية")}
              </span>
            </FadeUp>

            {/* Heading */}
            <FadeUp delay={0.1}>
              <h2 className="font-thin leading-tight px-6"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("Trusted by Leaders", "موثوق به من القادة")}
              </h2>
            </FadeUp>

            {/* Glow rule */}
            <FadeIn delay={0.2}>
              <motion.div className="h-px"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }} />
            </FadeIn>

            {/* Marquee — identical to 360 page */}
            <FadeIn delay={0.3} className="relative w-full overflow-hidden py-6 marquee-outer">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
                style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
                style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />

              <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
                {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
                  <div key={i}
                    className="inline-flex items-center justify-center flex-shrink-0 mx-6 sm:mx-8 px-6 py-3 rounded-xl overflow-hidden"
                    style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <img src={src} alt={name} loading="lazy" decoding="async" className="h-24 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
                  </div>
                ))}
              </div>

              {/* Ambient glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 600, height: 80, background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
            </FadeIn>

            {/* Stats row */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-12">
                {[
                  { num: "50+",     label: t("Projects Delivered", "مشروع مُنجز") },
                  { num: "SAR 2B+", label: t("Portfolio Managed",  "محفظة مُدارة") },
                  { num: "99.9%",   label: t("Uptime SLA",         "وقت تشغيل") },
                  { num: "3+",      label: t("Countries",           "دول") },
                ].map((s, i) => (
                  <div key={i} className={s.num === "3+" ? "hidden sm:flex flex-col items-center gap-1" : "flex flex-col items-center gap-1"}>
                    <span className="font-thin text-white"
                      style={{ fontSize: "clamp(0.78rem, 1.8vw, 1.4rem)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.06em" }}>
                      {s.num}
                    </span>
                    <span className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: "rgba(255,255,255,0.38)" }}>
                      {s.label}
                    </span>
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
        <Glow color="107,163,214" x="50%" y="45%" size="70vw" intensity={0.07} />
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

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9 · FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center" style={{ height: "100vh", minHeight: "unset" }}>
        <Grid opacity={0.018} />
        <Glow color="107,163,214" x="50%" y="60%" size="90vw" intensity={0.12} />
        <Glow color="167,139,250" x="30%" y="30%" size="50vw" intensity={0.06} />

        {/* Cinematic ambient orbs */}
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width: 400, height: 400, top: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(107,163,214,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width: 300, height: 300, bottom: "-5%", left: "-5%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 w-full h-full px-8">
          <FadeUp delay={0.06}>
            <Badge>{t("Start Your Transformation", "ابدأ تحولك الرقمي")}</Badge>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-thin uppercase leading-[0.92] tracking-[0.04em]"
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 3.2rem)", fontFamily: "Quicksand, sans-serif", maxWidth: 900 }}>
              {t("Build the Future", "ابنِ مستقبل")}<br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{t("of Real Estate", "العقارات")}</span><br />
              {t("Digitally.", "رقمياً.")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.24}>
            <p style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.38)", maxWidth: 540 }}>
              {t(
                "Luxury digital ecosystems designed for the next generation of property experiences.",
                "منظومات رقمية فاخرة مصممة للجيل القادم من تجارب العقارات."
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.33} className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact">
              <motion.button
                className="relative overflow-hidden flex items-center gap-2.5 px-10 py-4 rounded-2xl text-base font-semibold text-black"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 12px 2px rgba(255,255,255,0.10)","0 0 32px 10px rgba(255,255,255,0.26)","0 0 12px 2px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Contact Us Today", "تواصل معنا اليوم")}
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
                {t("Chat on WhatsApp", "تواصل عبر واتساب")}
              </motion.button>
            </a>
          </FadeUp>
        </div>
      </Snap>

      <section style={{ scrollSnapAlign: "start", background: "#000" }}>
        <OtherIndustriesStrip currentSlug="real-estate" />
        <Footer />
      </section>
      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
