"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Activity, Cpu, BarChart3, Database, MessageSquare, AlertCircle } from "lucide-react";
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
function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay }} className={className}>{children}</motion.div>
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

/* ── animated pipeline hero ──────────────────────────────────────────── */
const PIPELINE_NODES = [
  { x: "8%",  y: "38%", label: "CRM" },
  { x: "30%", y: "20%", label: "Email" },
  { x: "52%", y: "40%", label: "AI Engine" },
  { x: "72%", y: "22%", label: "ERP" },
  { x: "88%", y: "42%", label: "Reports" },
  { x: "18%", y: "68%", label: "WhatsApp" },
  { x: "65%", y: "70%", label: "Slack" },
];

function PipelineNode({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) {
  return (
    <motion.div className="absolute pointer-events-none flex flex-col items-center gap-1"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 0.8, 0.6], scale: [0.5, 1, 0.95] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3, ease: "easeOut" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `rgba(${GLOW_RGB},0.10)`, border: `1px solid rgba(${GLOW_RGB},0.28)`, backdropFilter: "blur(4px)" }}>
        <Zap className="w-4 h-4" style={{ color: ACCENT }} />
      </div>
      <span className="text-[9px] tracking-widest uppercase" style={{ color: `rgba(${GLOW_RGB},0.55)` }}>{label}</span>
    </motion.div>
  );
}

function AnimatedTextCycle({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="relative inline-block" aria-live="polite">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
          className="absolute inset-0 flex items-center justify-center">{words[index]}</motion.span>
      </AnimatePresence>
    </span>
  );
}

const TRUST_LOGOS = [
  { src: "/x360/clients/ekal.webp", name: "Ekal" }, { src: "/x360/clients/sireus.webp", name: "Sireus" },
  { src: "/x360/clients/sobha.webp", name: "Sobha" }, { src: "/x360/clients/kw.webp", name: "KW", scale: 1.2 },
  { src: "/x360/clients/balcona99.webp", name: "Balcona", scale: 1.3 }, { src: "/x360/clients/prestige.webp", name: "Prestige" },
  { src: "/x360/clients/ekal-catering.webp", name: "Ekal Catering", scale: 2.0 }, { src: "/x360/clients/zonoza.webp", name: "Zonoza", scale: 2.0 },
];
const TRUST_DOUBLED = [...TRUST_LOGOS, ...TRUST_LOGOS];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Zap, Activity, Cpu, BarChart3, Database, MessageSquare, AlertCircle,
};

export default function AIAutomationClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    let last = 0;
    const onScroll = () => {
      const down = el.scrollTop > last; last = el.scrollTop;
      window.dispatchEvent(new CustomEvent("x360:snapscroll", { detail: { down, scrollTop: el.scrollTop } }));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { iconKey: "Zap",      title: t("Process Automation","أتمتة العمليات"),       desc: t("Identify and automate repetitive tasks across every department.","تحديد وأتمتة المهام المتكررة في كل قسم.") },
    { iconKey: "Activity", title: t("CRM & ERP Sync","مزامنة CRM وERP"),          desc: t("Salesforce, HubSpot, SAP, and Oracle connectors with real-time data sync.","موصلات Salesforce وHubSpot وSAP وOracle مع مزامنة فورية.") },
    { iconKey: "Cpu",      title: t("Intelligent Pipelines","خطوط عمل ذكية"),    desc: t("n8n, Zapier, and Make integrations built and maintained by our team.","تكاملات n8n وZapier وMake مبنية ومُدارة من فريقنا.") },
    { iconKey: "BarChart3",title: t("ROI Reporting","تقارير العائد"),              desc: t("Time-saved and cost-reduction dashboards updated in real time.","لوحات الوقت الموفَّر وتخفيض التكاليف في الوقت الفعلي.") },
  ];

  const painPoints = [
    { iconKey: "Activity",    title: t("Hours Lost to Manual Tasks","ساعات ضائعة في المهام اليدوية"),      desc: t("Data entry, report generation, and cross-system copy-paste eat hours that should go toward growth.","إدخال البيانات وإنشاء التقارير يأكل ساعات يجب أن تُقضى في النمو.") },
    { iconKey: "Database",    title: t("Siloed Systems Don't Communicate","الأنظمة المعزولة لا تتواصل"), desc: t("Your CRM, ERP, and email tools operate in isolation — creating costly decision delays.","CRM وERP والبريد تعمل بمعزل — مما يخلق تأخيرات مكلفة في القرارات.") },
    { iconKey: "AlertCircle", title: t("Human Error in Critical Processes","الخطأ البشري في العمليات"),   desc: t("Manual steps introduce errors in invoices, contracts, and reporting that cost time to fix.","الخطوات اليدوية تُدخل أخطاء في الفواتير والعقود تكلف وقتاً لإصلاحها.") },
  ];

  const stats = [
    { value: "70%",  label: t("Time saved per process","وقت موفَّر لكل عملية") },
    { value: "3×",   label: t("Faster workflow throughput","إنتاجية أسرع") },
    { value: "99.9%",label: t("Process accuracy","دقة العملية") },
    { value: "50+",  label: t("Integrations available","تكامل متاح") },
  ];

  const useCases = [
    { sector: t("Finance & Accounting","المالية والمحاسبة"), desc: t("Automate invoice processing, reconciliations, and financial reporting.","أتمتة معالجة الفواتير والمطابقات والتقارير المالية.") },
    { sector: t("Real Estate","العقارات"),                   desc: t("Auto-qualify leads, sync CRM records, and trigger follow-up sequences.","تأهيل العملاء آلياً ومزامنة سجلات CRM وتشغيل متابعات تلقائية.") },
    { sector: t("HR & Operations","الموارد البشرية"),        desc: t("Onboarding, leave approvals, and payroll sync fully automated.","سير عمل الإعداد وموافقات الإجازات ومزامنة الرواتب مؤتمتة.") },
    { sector: t("Hospitality","الضيافة"),                    desc: t("Booking confirmations, inventory updates, and guest communications on autopilot.","تأكيدات الحجز وتحديثات المخزون والتواصل مع الضيوف تلقائياً.") },
    { sector: t("Retail","التجزئة"),                         desc: t("Order routing, stock alerts, and supplier comms automated end-to-end.","توجيه الطلبات وتنبيهات المخزون والتواصل مع الموردين مؤتمتة.") },
  ];

  return (
    <div ref={scrollRef} style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>

      {/* ══ 1 · HERO ═══════════════════════════════════════════════ */}
      <Snap id="hero" className="flex flex-col items-center justify-center">
        <Glow x="50%" y="50%" size="90vw" intensity={0.08} />
        <Grid />
        {PIPELINE_NODES.map((n, i) => <PipelineNode key={i} {...n} delay={i * 0.5} />)}
        {[1, 1.5, 2].map((s, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: 300, height: 300, top: "50%", left: "50%", x: "-50%", y: "-50%", border: `1px solid rgba(${GLOW_RGB},0.10)` }}
            animate={{ scale: [s, s*1.22, s], opacity: [0.4, 0.06, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i*1.2 }} />
        ))}
        <div className="relative z-10 flex flex-col items-center text-center gap-7 px-10 py-10" style={{ maxWidth: 900 }}>
          <FadeUp delay={0.1}><Badge>{t("AI Solutions · Automation","حلول الذكاء الاصطناعي · الأتمتة")}</Badge></FadeUp>
          <FadeUp delay={0.22}>
            <h1 className="font-thin leading-tight tracking-[0.06em] uppercase" style={{ fontSize: "clamp(1.4rem,3vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("AUTOMATE THE ROUTINE.","أتمت الروتين.")}<br />
              <span style={{ color: ACCENT }}>{t("FREE YOUR TEAM.","حرّر فريقك.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.34}>
            <motion.div style={{ width: "clamp(120px,28vw,280px)", height: 1, background: `linear-gradient(to right,transparent,rgba(${GLOW_RGB},0.7),transparent)` }} />
          </FadeUp>
          <FadeUp delay={0.44}>
            <p className="font-light leading-relaxed" style={{ fontSize: "clamp(0.78rem,1.1vw,0.92rem)", color: "rgba(255,255,255,0.65)", maxWidth: 520 }}>
              {t("End-to-end AI workflow automation connecting your CRM, ERP, email, and communication tools into intelligent, self-running pipelines.",
                 "أتمتة شاملة لسير العمل بالذكاء الاصطناعي تربط CRM وERP والبريد وأدوات التواصل في خطوط عمل ذكية تعمل ذاتياً.")}
            </p>
          </FadeUp>
          <FadeUp delay={0.54} className="flex items-center gap-3">
            <Link href="/contact">
              <motion.button className="relative overflow-hidden flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-black"
                style={{ background: "#fff" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 10px rgba(255,255,255,0.10)","0 0 28px rgba(255,255,255,0.28)","0 0 10px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }} />
                <span className="relative z-10 flex items-center gap-2">{t("Contact Us","تواصل معنا")} <ArrowRight className="w-4 h-4" /></span>
              </motion.button>
            </Link>
          </FadeUp>
        </div>
        <div className="absolute bottom-6 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 10 }}>
          <p className="text-[8px] tracking-[0.34em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{t("SCROLL TO EXPLORE","مرر للاستكشاف")}</p>
          <motion.div className="w-px h-5" style={{ background: `linear-gradient(to bottom,rgba(${GLOW_RGB},0.5),transparent)` }}
            animate={{ scaleY: [1,1.6,1] }} transition={{ duration: 1.9, repeat: Infinity }} />
        </div>
      </Snap>

      {/* ══ 2 · WE BUILD FOR ═══════════════════════════════════════ */}
      <Snap id="for" className="flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center px-6 relative z-10">
          <FadeUp delay={0.08}><p className="text-white/30 font-medium mb-4" style={{ letterSpacing: "0.1em", fontSize: "0.9rem" }}>{t("We Automate For","نؤتمت لـ")}</p></FadeUp>
          <FadeUp delay={0.16}>
            <h2 className="font-thin leading-tight mb-4" style={{ fontSize: "clamp(1.2rem,2.6vw,2.2rem)" }}>
              <AnimatedTextCycle words={isAr
                ? ["فرق المالية","أقسام الموارد البشرية","شركات العقارات","مجموعات الضيافة","سلاسل التجزئة","الفرق القانونية"]
                : ["Finance Teams","HR Departments","Real Estate Firms","Hospitality Groups","Retail Chains","Legal Teams"]} />
            </h2>
          </FadeUp>
          <FadeUp delay={0.22}><GlowRule /></FadeUp>
          <FadeUp delay={0.28}><p className="text-white/30 max-w-lg mx-auto mt-4" style={{ letterSpacing: "0.08em", fontSize: "0.88rem" }}>
            {t("Every workflow. Every department. Zero manual effort.","كل سير عمل. كل قسم. بدون جهد يدوي.")}
          </p></FadeUp>
        </div>
      </Snap>

      {/* ══ 3 · FEATURES ═══════════════════════════════════════════ */}
      <Snap id="features" className="flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "32px 32px", opacity: 0.7 }} />
        <div className="relative z-10 max-w-5xl w-full mx-auto px-6">
          <FadeUp delay={0.04} className="text-center mb-10">
            <Badge>{t("What We Deliver","ما نقدمه")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-thin mt-4 mb-3">{t("Automation Capabilities","قدرات الأتمتة")}</h2>
            <GlowRule />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = ICON_MAP[f.iconKey] ?? Zap;
              return (
                <FadeUp key={i} delay={0.10 + i*0.08}>
                  <motion.div className="rounded-2xl p-5 flex flex-col gap-3 group cursor-default"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", minHeight: 180 }}
                    whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: `rgba(${GLOW_RGB},0.25)` }} transition={{ duration: 0.22 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `rgba(${GLOW_RGB},0.08)`, border: `1px solid rgba(${GLOW_RGB},0.18)` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: ACCENT } as React.CSSProperties} />
                    </div>
                    <h3 className="font-semibold text-sm text-white/85 group-hover:text-white transition-colors">{f.title}</h3>
                    <p className="text-white/38 text-xs leading-relaxed group-hover:text-white/55 transition-colors">{f.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 4 · STATS ══════════════════════════════════════════════ */}
      <Snap id="stats" className="flex items-center justify-center">
        <Glow x="50%" y="50%" size="70vw" intensity={0.07} />
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 text-center">
          <FadeUp delay={0.06}><Badge>{t("By The Numbers","بالأرقام")}</Badge></FadeUp>
          <FadeUp delay={0.14}><h2 className="text-3xl sm:text-4xl font-thin mt-5 mb-2">{t("Automation Results","نتائج الأتمتة")}</h2></FadeUp>
          <FadeUp delay={0.2}><GlowRule /></FadeUp>
          <FadeIn delay={0.28} className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-14">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.span className="font-thin" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "Quicksand,sans-serif", color: ACCENT, letterSpacing: "0.04em" }}
                  initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i*0.1, ease: [0.22,1,0.36,1] as [number,number,number,number] }}>
                  {s.value}
                </motion.span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/38">{s.label}</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 5 · PAIN POINTS ════════════════════════════════════════ */}
      <Snap id="pain" className="flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp><Badge>{t("The Challenge","التحدي")}</Badge></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontFamily: "Quicksand,sans-serif" }}>
                {t("Why Businesses Automate","لماذا تؤتمت الشركات")}
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {painPoints.map((p, i) => {
              const Icon = ICON_MAP[p.iconKey] ?? Zap;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <motion.div className="relative rounded-2xl p-6 flex flex-col gap-4 h-full"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)" }}
                    transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-xl" style={{ width: 42, height: 42, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        <Icon className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
                      </div>
                      <h3 className="font-medium text-white/85 text-sm tracking-wide">{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 6 · USE CASES ══════════════════════════════════════════ */}
      <Snap id="cases" className="flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom,#000,#040404,#000)" }} />
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp><Badge>{t("Industries We Serve","القطاعات التي نخدمها")}</Badge></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontFamily: "Quicksand,sans-serif" }}>
                {t("Automation Across Industries","الأتمتة عبر القطاعات")}
              </h2>
            </FadeUp>
          </div>
          <div className="flex flex-col gap-0 w-full">
            {useCases.map((uc, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex gap-8 py-6 items-start" style={{ borderBottom: i < useCases.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div className="flex-shrink-0 font-thin text-white/15 select-none" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontFamily: "Quicksand,sans-serif", lineHeight: 1, width: 56, textAlign: "right" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h3 className="font-medium text-white/85 tracking-wide" style={{ fontSize: "clamp(0.88rem,1.5vw,1.05rem)" }}>{uc.sector}</h3>
                    <p className="leading-relaxed text-xs" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 520 }}>{uc.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Snap>

      {/* ══ 7 · TRUSTED ════════════════════════════════════════════ */}
      <Snap id="trusted" className="flex flex-col items-center justify-center">
        <Grid />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-12 px-8">
          <FadeUp>
            <div className="flex flex-col items-center text-center gap-4">
              <Badge>{t("Trusted By","موثوق به من قِبل")}</Badge>
              <h2 className="font-thin tracking-[0.08em] uppercase" style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Industry Leaders Trust X360","رواد القطاع يثقون بـ X360")}
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-12">
              {[
                { num: "500+", label: t("Projects Delivered","مشروع مُنجز") },
                { num: "12+",  label: t("Industries Served","قطاع مخدوم") },
                { num: "5",    label: t("Countries in GCC","دول في الخليج") },
                { num: "98%",  label: t("Client Satisfaction","رضا العملاء") },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="font-thin text-white" style={{ fontSize: "clamp(1.3rem,3.5vw,2.6rem)", fontFamily: "Quicksand, sans-serif", letterSpacing: "0.06em" }}>{s.num}</span>
                  <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeIn className="w-full overflow-hidden">
            <div style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
              <motion.div
                className="flex gap-10 w-max"
                animate={{ x: [0, -(170 * TRUST_LOGOS.length)] }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              >
                {TRUST_DOUBLED.map((l, i) => (
                  <div key={i} className="flex items-center justify-center flex-shrink-0 px-5 py-2.5 rounded-xl"
                    style={{ width: 160, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <img src={l.src} alt={l.name} loading="lazy" decoding="async" className="h-16 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.5, transform: `scale(${l.scale ?? 1})` }} />
                  </div>
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 8 · CTA ════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center justify-center">
        <Glow x="50%" y="40%" size="80vw" intensity={0.08} />
        <Grid />
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 w-full px-8">
          <FadeUp delay={0.1}><Badge>{t("Start Automating Today","ابدأ الأتمتة اليوم")}</Badge></FadeUp>
          <FadeUp delay={0.18}>
            <h2 className="font-thin uppercase leading-[0.92] tracking-[0.04em]" style={{ fontSize: "clamp(1.6rem,3.8vw,3.2rem)", fontFamily: "Quicksand,sans-serif", maxWidth: 800 }}>
              {t("STOP DOING THE WORK","توقف عن القيام بالعمل")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("AI SHOULD BE DOING.","الذي يجب أن يقوم به الذكاء الاصطناعي.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.27} className="flex items-center gap-4">
            <Link href="/contact">
              <motion.button className="relative overflow-hidden flex items-center gap-2.5 px-10 py-4 rounded-2xl text-base font-semibold text-black"
                style={{ background: "#fff" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 12px 2px rgba(255,255,255,0.10)","0 0 32px 10px rgba(255,255,255,0.26)","0 0 12px 2px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }} />
                <span className="relative z-10 flex items-center gap-2">{t("Contact Us","تواصل معنا")} <ArrowRight className="w-4 h-4" /></span>
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 9 · FOOTER ══════════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", flexShrink: 0, background: "#000" }}>
        <Footer />
      </section>

      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
