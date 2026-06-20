"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, TrendingUp, Activity, Cpu, Globe, Eye, Database, Layers } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const GLOW_RGB = "255,255,255";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }} className={className}>{children}</motion.div>
  );
}
function FadeIn({ children, delay = 0, className = "", style }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay }} className={className} style={style}>{children}</motion.div>
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
      style={{ background: `rgba(${GLOW_RGB},0.07)`, border: `1px solid rgba(${GLOW_RGB},0.18)`, color: `rgba(${GLOW_RGB},0.75)` }}>
      {children}
    </span>
  );
}
function Grid() {
  return <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />;
}
function Glow({ x = "50%", y = "50%", size = "75vw", intensity = 0.09 }: { x?: string; y?: string; size?: string; intensity?: number }) {
  return <div className="absolute pointer-events-none"
    style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
      background: `radial-gradient(ellipse, rgba(${GLOW_RGB},${intensity}) 0%, transparent 65%)` }} />;
}
function GlowRule() {
  return <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.32),transparent)", margin: "0 auto" }} />;
}

const BARS = [
  { label: "Q1", h: 45 }, { label: "Q2", h: 60 }, { label: "Q3", h: 52 }, { label: "Q4", h: 78 }, { label: "NOW", h: 94 },
];

function AnimBar({ bar, i }: { bar: { label: string; h: number }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex flex-col items-center gap-2" style={{ width: 52 }}>
      <div style={{ height: 180, display: "flex", alignItems: "flex-end", width: "100%" }}>
        <motion.div className="w-full rounded-t-lg"
          style={{ background: i === 4 ? "rgba(255,255,255,0.7)" : `rgba(255,255,255,${0.15 + i * 0.06})`, boxShadow: i === 4 ? "0 0 20px rgba(255,255,255,0.35)" : undefined }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${bar.h}%` } : { height: 0 }}
          transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease }} />
      </div>
      <span className="text-[9px] tracking-wide" style={{ color: i === 4 ? "#fff" : "rgba(255,255,255,0.3)" }}>{bar.label}</span>
    </div>
  );
}

const CAPABILITIES = [
  { icon: BarChart3,   en: "Live KPI Dashboards",     ar: "لوحات KPI الحية",        descEn: "Real-time business metrics streamed from your ERP core.",           descAr: "مقاييس الأعمال الفورية من قلب ERP الخاص بك." },
  { icon: TrendingUp,  en: "Predictive Forecasting",   ar: "التوقعات التنبؤية",      descEn: "AI-powered demand, revenue, and capacity forecasts.",               descAr: "توقعات الطلب والإيرادات والطاقة بالذكاء الاصطناعي." },
  { icon: Eye,         en: "Executive Reporting",      ar: "التقارير التنفيذية",     descEn: "Board-ready reports with drill-down capabilities.",                 descAr: "تقارير جاهزة لمجلس الإدارة مع إمكانية التعمق." },
  { icon: Activity,    en: "Operational Monitoring",   ar: "مراقبة العمليات",         descEn: "Live process health, alerts, and SLA compliance tracking.",         descAr: "صحة العمليات الفورية والتنبيهات وتتبع الامتثال لـ SLA." },
  { icon: Cpu,         en: "AI Anomaly Detection",     ar: "اكتشاف الشذوذات بالذكاء",descEn: "Automated identification of cost overruns, fraud, and data gaps.",  descAr: "تحديد تلقائي لتجاوزات التكلفة والاحتيال وثغرات البيانات." },
  { icon: Globe,       en: "Multi-Entity Consolidation",ar: "دمج متعدد الكيانات",   descEn: "Unified view across subsidiaries, regions, and currencies.",        descAr: "رؤية موحدة عبر الشركات التابعة والمناطق والعملات." },
];

const DATA_SOURCES = ["SAP S/4HANA","SAP Analytics Cloud","Microsoft Excel","Power BI","SQL Databases","REST APIs","Salesforce CRM","Oracle ERP","Third-Party Tools"];
const DATA_SOURCES_AR = ["SAP S/4HANA","SAP Analytics Cloud","Microsoft Excel","Power BI","قواعد بيانات SQL","واجهات REST API","Salesforce CRM","Oracle ERP","أدوات الطرف الثالث"];

export default function BusinessIntelligenceClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}>
      <style>{`::-webkit-scrollbar{display:none}`}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <Snap id="hero">
        <Grid />
        <Glow x="50%" y="44%" size="90vw" intensity={0.12} />
        <motion.div className="absolute rounded-full pointer-events-none border"
          style={{ width: 600, height: 600, top: "50%", left: "50%", x: "-50%", y: "-50%", borderColor: "rgba(255,255,255,0.05)" }}
          animate={{ scale: [1,1.12,1], opacity: [0.3,0.07,0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-7">
          <FadeUp delay={0.05}><Badge>{t("Business Intelligence", "ذكاء الأعمال")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin tracking-[0.08em] leading-tight" style={{ fontSize: "clamp(1.3rem,2.8vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("TURN DATA INTO", "حوّل البيانات إلى")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("DECISIONS.", "قرارات.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.32),transparent)", margin: "0 auto" }} />
          </FadeUp>
          <FadeUp delay={0.30}>
            <p className="text-white/45 max-w-lg" style={{ fontSize: "clamp(0.82rem,1.2vw,1rem)", letterSpacing: "0.04em", lineHeight: 1.7 }}>
              {t(
                "Real-time analytics, predictive intelligence, and live dashboards that turn raw enterprise data into strategic decisions.",
                "تحليلات فورية وذكاء تنبؤي ولوحات بيانات حية تحوّل البيانات المؤسسية الخام إلى قرارات استراتيجية."
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.38} className="flex justify-center">
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

      {/* ══ 2. CAPABILITIES ══════════════════════════════════════════════ */}
      <Snap id="capabilities">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("BI Capabilities", "قدرات ذكاء الأعمال")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("INTELLIGENCE AT", "الذكاء في")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("EVERY LEVEL.", "كل مستوى.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <FadeUp key={cap.en} delay={0.28 + i * 0.07}>
                  <div className="flex flex-col gap-3 rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)" }}>
                        <Icon className="w-4 h-4" style={{ color: "rgba(255,255,255,0.65)" }} />
                      </div>
                      <span className="font-medium text-white/80 text-[0.82rem] tracking-wide">{t(cap.en, cap.ar)}</span>
                    </div>
                    <p className="text-white/35 text-[0.72rem] leading-relaxed">{t(cap.descEn, cap.descAr)}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 3. LIVE DATA VISUAL ═══════════════════════════════════════════ */}
      <Snap id="analytics-demo">
        <Grid />
        <Glow x="60%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col gap-5 lg:w-[400px] shrink-0">
            <FadeUp delay={0.05}><Badge>{t("Live Analytics", "التحليلات الفورية")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("REAL-TIME.", "فوري.")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ALWAYS CURRENT.", "دائماً محدّث.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}><GlowRule /></FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/40" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
                {t(
                  "Every metric refreshed as your operations run — no manual exports, no stale reports, no waiting for month-end.",
                  "كل مقياس يتجدد مع استمرار عملياتك — لا تصديرات يدوية ولا تقارير قديمة ولا انتظار لنهاية الشهر."
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div className="flex flex-wrap gap-2">
                {[t("Revenue Tracking","تتبع الإيرادات"),t("Cost Centers","مراكز التكلفة"),t("Headcount","قوى العمل"),t("Inventory Levels","مستويات المخزون")].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[9px] tracking-wide" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>{tag}</span>
                ))}
              </div>
            </FadeUp>
          </div>
          <FadeIn delay={0.2} className="flex-1 flex items-end justify-center gap-3" style={{ maxWidth: 380 }}>
            {BARS.map((bar, i) => <AnimBar key={bar.label} bar={bar} i={i} />)}
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 4. DATA SOURCES ══════════════════════════════════════════════ */}
      <Snap id="sources">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.07} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Unified Data Sources", "مصادر البيانات الموحدة")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("ALL YOUR DATA.", "جميع بياناتك.")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ONE PLATFORM.", "منصة واحدة.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
            <FadeUp delay={0.26}>
              <p className="text-white/40 max-w-lg" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
                {t("Connect any data source — from SAP cores to spreadsheets — into a single unified intelligence layer.","اربط أي مصدر بيانات — من أنظمة SAP إلى جداول البيانات — في طبقة ذكاء موحدة واحدة.")}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.32}>
            <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", maxWidth: "90vw" }}>
              {DATA_SOURCES.map((src, i) => (
                <motion.span key={src}
                  className="px-4 py-2 rounded-full text-[10px] font-medium tracking-[0.06em]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  {...{ transition: { duration: 0.5, delay: 0.35 + i * 0.06, ease } }}>
                  {t(src, DATA_SOURCES_AR[i])}
                </motion.span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.55}>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {[
                { v: "<1s",  l: t("Refresh rate",   "معدل التحديث") },
                { v: "100%", l: t("Data accuracy",  "دقة البيانات") },
                { v: "Any",  l: t("Source type",    "نوع المصدر")   },
              ].map(s => (
                <div key={s.v} className="flex flex-col items-center gap-1">
                  <span className="font-thin" style={{ fontSize: "2rem", color: "#fff", fontFamily: "Quicksand,sans-serif" }}>{s.v}</span>
                  <span className="text-white/35 text-[10px] tracking-wide">{s.l}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 5. CTA ═══════════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center justify-center">
        <Grid />
        <Glow x="50%" y="50%" size="80vw" intensity={0.07} />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 gap-8 text-center" style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeUp delay={0.1}><Badge>{t("Unlock Your Data", "أطلق العنان لبياناتك")}</Badge></FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("SEE YOUR BUSINESS", "انظر إلى أعمالك")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("IN REAL TIME.", "في الوقت الفعلي.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.28}><GlowRule /></FadeUp>
          <FadeUp delay={0.34}>
            <p className="text-white/38 max-w-md" style={{ fontSize: "0.83rem", lineHeight: 1.75 }}>
              {t("Stop guessing. Start knowing. Live BI that answers your questions before you ask them.","توقف عن التخمين. ابدأ بالمعرفة. ذكاء أعمال حي يجيب على أسئلتك قبل أن تطرحها.")}
            </p>
          </FadeUp>
          <FadeUp delay={0.42}>
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
