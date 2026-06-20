"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Database, Cpu, BarChart3, Zap, Layers, Activity,
  Globe, Shield, TrendingUp, Settings, CheckCircle, Building2,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT   = "#ffffff";
const GLOW_RGB = "255,255,255";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.82, delay, ease }} className={className}>{children}</motion.div>
  );
}
function FadeIn({ children, delay = 0, className = "", style }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay }} className={className} style={style}>{children}</motion.div>
  );
}
function Snap({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100dvh", flexShrink: 0, background: "#000" }}>
      {children}
    </section>
  );
}
function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase"
      style={{ background: `rgba(${GLOW_RGB},0.08)`, border: `1px solid rgba(${GLOW_RGB},0.22)`, color: `rgba(${GLOW_RGB},0.85)` }}>
      {children}
    </span>
  );
}
function Glow({ x = "50%", y = "45%", size = "80vw", intensity = 0.10 }: { x?: string; y?: string; size?: string; intensity?: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
        background: `radial-gradient(ellipse, rgba(${GLOW_RGB},${intensity}) 0%, transparent 65%)` }} />
  );
}
function Grid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
  );
}
function GlowRule() {
  return <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)", margin: "0 auto" }} />;
}

function AnimatedTextCycle({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: false });
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, inView]);
  return (
    <span ref={containerRef} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
          className="inline shimmer-text">
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TRUST_LOGOS = [
  { src: "/x360/clients/ekal.webp",          name: "Ekal"              },
  { src: "/x360/clients/sireus.webp",         name: "Sireus"            },
  { src: "/x360/clients/sobha.webp",          name: "Sobha Realty"      },
  { src: "/x360/clients/kw.webp",             name: "Keller Williams",  scale: 1.2 },
  { src: "/x360/clients/balcona99.webp",      name: "Balcona'99",       scale: 1.3 },
  { src: "/x360/clients/rania-hotels.webp",   name: "Rania Hotels"      },
  { src: "/x360/clients/prestige.webp",       name: "Prestige"          },
  { src: "/x360/clients/ekal-catering.webp",  name: "Ekal Catering",    scale: 2.0 },
  { src: "/x360/clients/joori.webp",          name: "Joori min Beirut", scale: 1.3 },
  { src: "/x360/clients/zonoza.webp",         name: "Zonoza Group",     scale: 2.0 },
];

const PANELS = [
  { label: "SAP S/4HANA", sub: "Core ERP layer active", x: "8%",  y: "18%", delay: 0   },
  { label: "Analytics Cloud", sub: "Live KPI stream",    x: "66%", y: "14%", delay: 0.7 },
  { label: "Workflow Engine", sub: "340 tasks running",  x: "5%",  y: "60%", delay: 1.3 },
  { label: "AI Intelligence", sub: "Predictive active",  x: "70%", y: "58%", delay: 1.9 },
  { label: "ZATCA Compliant", sub: "Phase 2 certified",  x: "36%", y: "80%", delay: 2.5 },
];

function HeroPanel({ label, sub, x, y, delay }: { label: string; sub: string; x: string; y: string; delay: number }) {
  return (
    <motion.div className="absolute pointer-events-none rounded-2xl px-4 py-3 hidden md:block"
      style={{ left: x, top: y, minWidth: 180, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: [0,1,1,0.7], y: [12,0,0,-5] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 6px rgba(${GLOW_RGB},0.8)` }} />
        <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>{label}</span>
      </div>
      <span className="text-[9px] block" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</span>
    </motion.div>
  );
}

const SAP_NODES = [
  { id: "core",      label: "S/4HANA",         x: 260, y: 200, r: 44, core: true },
  { id: "analytics", label: "Analytics\nCloud", x: 100, y: 80,  r: 32 },
  { id: "btp",       label: "BTP",              x: 420, y: 75,  r: 32 },
  { id: "sf",        label: "SuccessFactors",   x: 50,  y: 225, r: 32 },
  { id: "ariba",     label: "Ariba",            x: 460, y: 220, r: 32 },
  { id: "b1",        label: "Business One",     x: 130, y: 340, r: 32 },
  { id: "fiori",     label: "Fiori UX",         x: 390, y: 340, r: 32 },
];
const SAP_EDGES = [
  ["core","analytics"],["core","btp"],["core","sf"],
  ["core","ariba"],["core","b1"],["core","fiori"],
];

function SAPDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });
  return (
    <svg ref={ref} viewBox="0 0 520 420" className="w-full" style={{ maxWidth: 520, maxHeight: 420 }}>
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${GLOW_RGB},0.25)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {SAP_EDGES.map(([a, b], i) => {
        const na = SAP_NODES.find(n => n.id === a)!;
        const nb = SAP_NODES.find(n => n.id === b)!;
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        return (
          <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={`rgba(${GLOW_RGB},0.18)`} strokeWidth="1"
            strokeDasharray={`${len}`}
            initial={{ strokeDashoffset: len, opacity: 0 }}
            animate={inView ? { strokeDashoffset: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }} />
        );
      })}
      {SAP_EDGES.map(([a, b], i) => {
        const na = SAP_NODES.find(n => n.id === a)!;
        const nb = SAP_NODES.find(n => n.id === b)!;
        return (
          <motion.circle key={`dot-${i}`} r="3" fill={ACCENT}
            style={{ filter: `drop-shadow(0 0 4px rgba(${GLOW_RGB},0.9))` }}
            initial={{ opacity: 0 }}
            animate={inView ? { cx: [na.x,nb.x,na.x], cy: [na.y,nb.y,na.y], opacity: [0,1,0] } : {}}
            transition={{ duration: 2.4, delay: 1 + i * 0.25, repeat: Infinity, ease: "easeInOut" }} />
        );
      })}
      {SAP_NODES.map((node) => (
        <g key={node.id}>
          {node.core && (
            <motion.circle cx={node.x} cy={node.y} r={node.r + 20} fill="url(#nodeGlow)"
              animate={{ scale: [1,1.15,1], opacity: [0.4,0.8,0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          )}
          <motion.circle cx={node.x} cy={node.y} r={node.r}
            fill={node.core ? `rgba(${GLOW_RGB},0.12)` : "rgba(255,255,255,0.04)"}
            stroke={node.core ? `rgba(${GLOW_RGB},0.55)` : `rgba(${GLOW_RGB},0.22)`}
            strokeWidth={node.core ? 1.5 : 1}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: node.core ? 0.1 : 0.5, ease }} />
          {node.label.split("\n").map((line, li) => (
            <motion.text key={li}
              x={node.x} y={node.y + (node.label.includes("\n") ? li * 11 - 5 : 0) + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill={node.core ? ACCENT : "rgba(255,255,255,0.6)"}
              fontSize={node.core ? 9 : 7.5} fontWeight={node.core ? "700" : "500"} letterSpacing="0.04em"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}>
              {line}
            </motion.text>
          ))}
        </g>
      ))}
    </svg>
  );
}

const WORKFLOW_STEPS = [
  { label: "Trigger",  icon: Zap       },
  { label: "Route",    icon: Activity  },
  { label: "Approve",  icon: CheckCircle },
  { label: "Execute",  icon: Settings  },
  { label: "Report",   icon: BarChart3 },
];

const BARS = [
  { label: "Q1", height: 48 },
  { label: "Q2", height: 62 },
  { label: "Q3", height: 54 },
  { label: "Q4", height: 80 },
  { label: "Now", height: 95 },
];

function BarItem({ bar, i }: { bar: { label: string; height: number }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex flex-col items-center gap-2" style={{ width: 56 }}>
      <motion.div className="w-full rounded-t-lg rounded-b-sm relative overflow-hidden"
        style={{ height: 200, display: "flex", alignItems: "flex-end" }}>
        <motion.div className="w-full rounded-t-lg"
          style={{ background: i === 4 ? `rgba(${GLOW_RGB},0.7)` : `rgba(${GLOW_RGB},${0.18 + i * 0.06})`, boxShadow: i === 4 ? `0 0 20px rgba(${GLOW_RGB},0.4)` : undefined }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${bar.height}%` } : { height: 0 }}
          transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease }} />
      </motion.div>
      <span className="text-[9px] tracking-wide" style={{ color: i === 4 ? ACCENT : "rgba(255,255,255,0.3)" }}>{bar.label}</span>
    </div>
  );
}

const WHY_ITEMS = [
  { icon: Database,   en: "SAP-First Architecture",    ar: "بنية SAP أولاً",         descEn: "Every solution is built on SAP infrastructure as the intelligent core.",             descAr: "كل حل مبني على بنية SAP كطبقة ذكية أساسية." },
  { icon: Globe,      en: "ZATCA Phase 2 Certified",   ar: "معتمد ZATCA المرحلة 2",  descEn: "Full FATOORA e-invoicing compliance baked into every SAP deployment from day one.", descAr: "امتثال FATOORA الكامل مدمج في كل نشر SAP من اليوم الأول." },
  { icon: Cpu,        en: "AI-Embedded Intelligence",  ar: "ذكاء اصطناعي مدمج",     descEn: "SAP BTP AI services and predictive analytics embedded in your enterprise layer.",   descAr: "خدمات SAP BTP AI مدمجة مباشرة في طبقتك المؤسسية." },
  { icon: TrendingUp, en: "Enterprise-Grade Scale",    ar: "توسع على مستوى المؤسسات",descEn: "Architectures that grow with you — from 50 to 50,000 users without re-platforming.", descAr: "بنى تنمو معك — من 50 إلى 50,000 مستخدم." },
  { icon: Shield,     en: "24/7 Post-Live Support",    ar: "دعم 24/7 بعد الإطلاق",  descEn: "Dedicated SLA-backed support from the same team that built your system.",           descAr: "دعم مخصص من نفس الفريق الذي بنى نظامك." },
];

const INDUSTRIES    = ["Construction","Manufacturing","Infrastructure","Real Estate","Healthcare","Hospitality","Logistics","Retail","Industrial Operations","Smart Cities","Enterprise Corporations"];
const INDUSTRIES_AR = ["البناء","التصنيع","البنية التحتية","العقارات","الرعاية الصحية","الضيافة","اللوجستيات","التجزئة","العمليات الصناعية","المدن الذكية","الشركات المؤسسية"];

export default function SAPImplementationClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => window.dispatchEvent(new CustomEvent("x360:snapscroll", { detail: { scrollTop: el.scrollTop } }));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollRef} style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}>
      <style>{`::-webkit-scrollbar{display:none}`}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <Snap id="hero">
        <Grid />
        <Glow x="50%" y="44%" size="90vw" intensity={0.13} />
        <motion.div className="absolute rounded-full pointer-events-none border"
          style={{ width: 700, height: 700, top: "50%", left: "50%", x: "-50%", y: "-50%", borderColor: `rgba(${GLOW_RGB},0.05)` }}
          animate={{ scale: [1,1.14,1], opacity: [0.3,0.07,0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none border"
          style={{ width: 440, height: 440, top: "50%", left: "50%", x: "-50%", y: "-50%", borderColor: `rgba(${GLOW_RGB},0.08)` }}
          animate={{ scale: [1,1.08,1], opacity: [0.5,0.12,0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        {PANELS.map(p => <HeroPanel key={p.label} {...p} />)}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-7">
          <FadeUp delay={0.05}><Badge>{t("SAP Implementation", "تطبيق SAP")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin tracking-[0.08em] leading-tight" style={{ fontSize: "clamp(1.3rem,2.8vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("ENTERPRISE INTELLIGENCE.", "ذكاء مؤسسي.")}<br />
              <span style={{ color: `rgba(${GLOW_RGB},0.45)` }}>{t("REIMAGINED.", "أُعيد تصوّره.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}><GlowRule /></FadeUp>
          <FadeUp delay={0.32}>
            <p className="text-white/45 max-w-lg" style={{ fontSize: "clamp(0.82rem,1.2vw,1rem)", letterSpacing: "0.04em", lineHeight: 1.7 }}>
              {t(
                "Future-ready SAP ecosystems — S/4HANA migration, BTP, ZATCA Phase 2, and full enterprise transformation.",
                "أنظمة SAP جاهزة للمستقبل — ترحيل S/4HANA وBTP وامتثال ZATCA المرحلة الثانية والتحول المؤسسي الكامل."
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.40} className="flex justify-center">
            <Link href="/contact">
              <motion.button className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 10px rgba(255,255,255,0.10)","0 0 28px rgba(255,255,255,0.28)","0 0 10px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }} />
                <span className="relative z-10">{t("Contact Us","تواصل معنا")}</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 2. SAP ECOSYSTEM ═════════════════════════════════════════════ */}
      <Snap id="sap-ecosystem">
        <Grid />
        <Glow x="55%" y="48%" size="70vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col gap-5 lg:w-[420px] shrink-0">
            <FadeUp delay={0.05}><Badge>{t("SAP Ecosystem", "نظام SAP البيئي")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("THE CORE ENTERPRISE", "الطبقة المؤسسية")}<br />
                <span style={{ color: `rgba(${GLOW_RGB},0.45)` }}>{t("INTELLIGENCE LAYER.", "الأساسية.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}><GlowRule /></FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/40" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
                {t(
                  "X360 builds connected SAP ecosystems — S/4HANA at the core, surrounded by Analytics Cloud, BTP, SuccessFactors, Ariba, and Fiori. One intelligent infrastructure layer.",
                  "X360 تبني أنظمة SAP متصلة — S/4HANA في القلب، محاطاً بـ Analytics Cloud وBTP وSuccessFactors وAriba وFiori."
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["S/4HANA Migration","ZATCA Phase 2","SAP Analytics Cloud","BTP AI Services"].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <CheckCircle className="w-3 h-3 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
                    <span className="text-white/55" style={{ fontSize: "0.7rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
          <FadeIn delay={0.2} className="flex-1 flex items-center justify-center w-full" style={{ maxWidth: 520 }}>
            <SAPDiagram />
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 3. WORKFLOW ══════════════════════════════════════════════════ */}
      <Snap id="workflow">
        <Grid />
        <Glow x="50%" y="40%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Operations & Workflow", "العمليات وسير العمل")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("INTELLIGENT WORKFLOWS.", "سير عمل ذكي.")}<br />
                <span style={{ color: `rgba(${GLOW_RGB},0.4)` }}>{t("ZERO BOTTLENECKS.", "صفر عقبات.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}><GlowRule /></FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/40 max-w-xl" style={{ fontSize: "0.83rem", lineHeight: 1.7 }}>
                {t(
                  "Enterprise workflow automation connecting ERP, CRM, and communication tools into intelligent, self-running operational pipelines.",
                  "أتمتة سير العمل المؤسسي تربط ERP وCRM وأدوات التواصل في خطوط عمل تشغيلية ذكية تعمل ذاتياً."
                )}
              </p>
            </FadeUp>
          </div>
          <div className="w-full flex items-center justify-center gap-0 relative" style={{ maxWidth: 900 }}>
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <FadeIn delay={0.3 + i * 0.15}>
                    <div className="flex flex-col items-center gap-3">
                      <motion.div className="flex items-center justify-center rounded-2xl"
                        style={{ width: 64, height: 64,
                          background: i === WORKFLOW_STEPS.length - 1 ? `rgba(${GLOW_RGB},0.12)` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${i === WORKFLOW_STEPS.length - 1 ? `rgba(${GLOW_RGB},0.4)` : "rgba(255,255,255,0.09)"}` }}
                        animate={{ boxShadow: i === WORKFLOW_STEPS.length - 1 ? [`0 0 0px rgba(${GLOW_RGB},0)`,`0 0 20px rgba(${GLOW_RGB},0.28)`,`0 0 0px rgba(${GLOW_RGB},0)`] : undefined }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
                        <Icon className="w-6 h-6" style={{ color: i === WORKFLOW_STEPS.length - 1 ? ACCENT : "rgba(255,255,255,0.45)" }} />
                      </motion.div>
                      <span className="text-[10px] font-medium tracking-[0.12em] uppercase"
                        style={{ color: i === WORKFLOW_STEPS.length - 1 ? ACCENT : "rgba(255,255,255,0.4)" }}>
                        {step.label}
                      </span>
                    </div>
                  </FadeIn>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="relative mx-3 hidden sm:block" style={{ width: 80, height: 2 }}>
                      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                      <motion.div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: `linear-gradient(to right, rgba(${GLOW_RGB},0.5), rgba(${GLOW_RGB},0.15))` }}
                        initial={{ width: 0 }}
                        animate={{ width: ["0%","100%","0%"] }}
                        transition={{ duration: 2, delay: 1.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" style={{ maxWidth: 900 }}>
            {[
              { v: "80%",  l: t("Faster approvals",  "موافقات أسرع") },
              { v: "100%", l: t("Audit trail",        "مسار التدقيق") },
              { v: "24/7", l: t("Auto-execution",     "تنفيذ تلقائي") },
              { v: "Zero", l: t("Manual bottlenecks", "عقبات يدوية")  },
            ].map(s => (
              <FadeUp key={s.v} delay={0.55}>
                <div className="flex flex-col items-center gap-1 rounded-2xl py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-thin" style={{ fontSize: "1.7rem", color: ACCENT, fontFamily: "Quicksand,sans-serif" }}>{s.v}</span>
                  <span className="text-white/35 text-[10px] tracking-wide">{s.l}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Snap>

      {/* ══ 4. ANALYTICS & BI ════════════════════════════════════════════ */}
      <Snap id="analytics">
        <Grid />
        <Glow x="60%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col gap-5 lg:w-[400px] shrink-0">
            <FadeUp delay={0.05}><Badge>{t("Analytics & BI", "التحليلات والذكاء التجاري")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("REAL-TIME INSIGHTS.", "رؤى فورية.")}<br />
                <span style={{ color: `rgba(${GLOW_RGB},0.4)` }}>{t("LIVE INTELLIGENCE.", "ذكاء حي.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}><GlowRule /></FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/40" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
                {t(
                  "SAP Analytics Cloud delivers live KPI dashboards, predictive forecasting, and self-service BI — all unified with your S/4HANA core.",
                  "SAP Analytics Cloud يوفر لوحات KPI حية وتوقعات تنبؤية وذكاء أعمال ذاتي الخدمة — مدمج مع قلب S/4HANA."
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div className="flex flex-wrap gap-2 mt-1">
                {[t("Live KPI Dashboards","لوحات KPI الحية"),t("Predictive Forecasting","التوقعات التنبؤية"),t("Executive Reports","تقارير تنفيذية"),t("Embedded Analytics","تحليلات مدمجة")].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[9px] tracking-wide" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>{tag}</span>
                ))}
              </div>
            </FadeUp>
          </div>
          <FadeIn delay={0.2} className="flex-1 flex items-end justify-center gap-3" style={{ maxWidth: 400 }}>
            {BARS.map((bar, i) => <BarItem key={bar.label} bar={bar} i={i} />)}
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 5. AI INTELLIGENCE ═══════════════════════════════════════════ */}
      <Snap id="ai-layer">
        <Grid />
        <Glow x="50%" y="50%" size="75vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8 text-center" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeUp delay={0.05}><Badge>{t("AI Intelligence Layer", "طبقة الذكاء الاصطناعي")}</Badge></FadeUp>
          <FadeUp delay={0.14}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("PREDICTIVE. AUTONOMOUS.", "تنبؤي. مستقل.")}<br />
              <span style={{ color: `rgba(${GLOW_RGB},0.4)` }}>{t("ALWAYS LEARNING.", "يتعلم دائماً.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.22}><GlowRule /></FadeUp>
          <FadeUp delay={0.28}>
            <p className="text-white/40 max-w-lg" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
              {t(
                "SAP BTP AI services embedded directly into your enterprise layer — demand forecasting, anomaly detection, intelligent document processing, and predictive maintenance.",
                "خدمات SAP BTP AI مدمجة مباشرة في طبقتك المؤسسية — التنبؤ بالطلب واكتشاف الشذوذات ومعالجة المستندات الذكية والصيانة التنبؤية."
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.36}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" style={{ maxWidth: 800 }}>
              {[
                { icon: Cpu,       en: "Demand Forecasting",   ar: "التنبؤ بالطلب"        },
                { icon: Activity,  en: "Anomaly Detection",    ar: "اكتشاف الشذوذات"       },
                { icon: Layers,    en: "Document Processing",  ar: "معالجة المستندات"      },
                { icon: TrendingUp,en: "Predictive Maintenance",ar: "الصيانة التنبؤية"     },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.en} className="flex flex-col items-center gap-3 rounded-2xl py-5 px-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)" }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: "rgba(255,255,255,0.65)" }} />
                    </div>
                    <span className="text-white/55 text-[10px] tracking-wide text-center">{t(item.en, item.ar)}</span>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 6. WHY X360 ══════════════════════════════════════════════════ */}
      <Snap id="why">
        <Grid />
        <Glow x="50%" y="45%" size="75vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Why X360", "لماذا X360")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("BUILT FOR ENTERPRISE.", "مبني للمؤسسات.")}<br />
                <span style={{ color: `rgba(${GLOW_RGB},0.4)` }}>{t("PROVEN IN THE FIELD.", "مُثبَت في الميدان.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.en} delay={0.28 + i * 0.08}>
                  <div className="flex flex-col gap-3 rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)" }}>
                      <Icon className="w-4 h-4" style={{ color: "rgba(255,255,255,0.65)" }} />
                    </div>
                    <span className="font-medium text-white/80 text-[0.78rem] tracking-wide">{t(item.en, item.ar)}</span>
                    <p className="text-white/35 text-[0.72rem] leading-relaxed">{t(item.descEn, item.descAr)}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 7. INDUSTRIES ════════════════════════════════════════════════ */}
      <Snap id="industries">
        <Grid />
        <Glow x="50%" y="45%" size="70vw" intensity={0.07} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-7" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Industries", "القطاعات")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("BUILT FOR", "مبني لـ")}{" "}
                <AnimatedTextCycle words={isAr ? INDUSTRIES_AR : INDUSTRIES} interval={1800} />
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
            <FadeUp delay={0.26}>
              <p className="text-white/40 leading-relaxed" style={{ fontSize: "clamp(0.72rem,1vw,0.82rem)", maxWidth: 480, letterSpacing: "0.04em" }}>
                {t(
                  "From Saudi construction giants to hospitality groups and healthcare networks — X360 enterprise ecosystems power every industry.",
                  "من عمالقة البناء السعودية إلى مجموعات الضيافة وشبكات الرعاية الصحية — منظومات X360 المؤسسية تُشغّل كل قطاع."
                )}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.34}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 w-full">
              {INDUSTRIES.map((ind, i) => {
                const ICONS = [Building2, Settings, Globe, TrendingUp, Activity, CheckCircle, BarChart3, Zap, Cpu, Shield, Database];
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.div key={ind}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    whileHover={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.18)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    {...{ transition: { duration: 0.4, delay: 0.38 + i * 0.04, ease } }}>
                    <div className="shrink-0 flex items-center justify-center rounded-lg"
                      style={{ width: 28, height: 28, background: "rgba(255,255,255,0.05)" }}>
                      <Icon className="w-3.5 h-3.5 text-white/50" />
                    </div>
                    <span className="text-white/65 font-medium tracking-wide" style={{ fontSize: "0.7rem" }}>
                      {t(ind, INDUSTRIES_AR[i])}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 8. CTA ═══════════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center justify-center">
        <Grid />
        <Glow x="50%" y="50%" size="80vw" intensity={0.07} />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 gap-8 text-center" style={{ maxWidth: 860, margin: "0 auto" }}>
          <FadeUp delay={0.15}><Badge>{t("Enterprise Transformation","التحول المؤسسي")}</Badge></FadeUp>
          <FadeUp delay={0.24}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("BUILD THE FUTURE OF","ابنِ مستقبل")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ENTERPRISE OPERATIONS.","عملياتك المؤسسية.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.32}><GlowRule /></FadeUp>
          <FadeUp delay={0.38}>
            <p className="text-white/38 max-w-md" style={{ fontSize: "0.83rem", lineHeight: 1.75 }}>
              {t("Intelligent SAP ecosystems designed for the next generation of enterprise infrastructure.","أنظمة SAP ذكية مصممة للجيل التالي من البنية التحتية المؤسسية.")}
            </p>
          </FadeUp>
          <FadeUp delay={0.44}>
            <Link href="/contact">
              <motion.button className="relative overflow-hidden rounded-xl px-8 py-3 font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff", fontSize: "0.85rem" }}
                animate={{ boxShadow: ["0 0 12px rgba(255,255,255,0.10)","0 0 32px rgba(255,255,255,0.28)","0 0 12px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }} />
                <span className="relative z-10">{t("Contact Us","تواصل معنا")}</span>
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", flexShrink: 0, background: "#000" }}>
        <Footer />
      </section>

      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
