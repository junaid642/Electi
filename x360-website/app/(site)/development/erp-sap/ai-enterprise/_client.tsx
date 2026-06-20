"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, TrendingUp, Activity, Shield, Zap, Database, Layers, Globe, CheckCircle } from "lucide-react";
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

const AI_CAPABILITIES = [
  { icon: TrendingUp,  en: "Demand Forecasting",        ar: "التنبؤ بالطلب",          descEn: "Predict inventory needs, staffing levels, and revenue cycles before they happen.",       descAr: "توقع احتياجات المخزون ومستويات التوظيف ودورات الإيرادات قبل حدوثها." },
  { icon: Activity,    en: "Anomaly Detection",          ar: "اكتشاف الشذوذات",         descEn: "Automatically flag financial irregularities, fraud signals, and process deviations.",    descAr: "إشارة تلقائية للمخالفات المالية وإشارات الاحتيال والانحرافات في العمليات." },
  { icon: Zap,         en: "Intelligent Automation",     ar: "الأتمتة الذكية",          descEn: "AI-driven approval routing, document classification, and exception handling.",          descAr: "توجيه الموافقات وتصنيف المستندات ومعالجة الاستثناءات بالذكاء الاصطناعي." },
  { icon: Database,    en: "Document Intelligence",      ar: "ذكاء المستندات",          descEn: "Automated extraction from invoices, POs, and contracts into your ERP layer.",          descAr: "الاستخراج التلقائي من الفواتير وأوامر الشراء والعقود إلى طبقة ERP." },
  { icon: Cpu,         en: "Predictive Maintenance",     ar: "الصيانة التنبؤية",        descEn: "Asset health monitoring and failure prediction before downtime occurs.",                descAr: "مراقبة صحة الأصول والتنبؤ بالأعطال قبل حدوث التوقف." },
  { icon: Shield,      en: "Compliance Automation",      ar: "أتمتة الامتثال",           descEn: "Automated ZATCA, VAT, and regulatory reporting across all entities.",                  descAr: "تقارير ZATCA وضريبة القيمة المضافة والتقارير التنظيمية التلقائية عبر جميع الكيانات." },
];

const AI_LAYERS = [
  { label: "Data Layer",        labelAr: "طبقة البيانات",        sub: "ERP + CRM + IoT",                subAr: "ERP + CRM + IoT",               y: "75%" },
  { label: "Intelligence Layer",labelAr: "طبقة الذكاء",          sub: "SAP BTP AI + ML Models",         subAr: "SAP BTP AI + نماذج ML",         y: "50%" },
  { label: "Action Layer",      labelAr: "طبقة الإجراءات",       sub: "Automation + Alerts + Reports",  subAr: "الأتمتة + التنبيهات + التقارير", y: "25%" },
];

export default function AIEnterpriseClient() {
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
          <FadeUp delay={0.05}><Badge>{t("AI for Enterprise", "الذكاء الاصطناعي للمؤسسات")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin tracking-[0.08em] leading-tight" style={{ fontSize: "clamp(1.3rem,2.8vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("YOUR ERP.", "نظامك.")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("NOW INTELLIGENT.", "أصبح ذكياً.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.32),transparent)", margin: "0 auto" }} />
          </FadeUp>
          <FadeUp delay={0.30}>
            <p className="text-white/45 max-w-lg" style={{ fontSize: "clamp(0.82rem,1.2vw,1rem)", letterSpacing: "0.04em", lineHeight: 1.7 }}>
              {t(
                "AI agents and machine learning models embedded directly into your enterprise layer — automating decisions, detecting anomalies, and predicting outcomes.",
                "وكلاء الذكاء الاصطناعي ونماذج التعلم الآلي مدمجة مباشرة في طبقتك المؤسسية — لأتمتة القرارات واكتشاف الشذوذات والتنبؤ بالنتائج."
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
            <FadeUp delay={0.05}><Badge>{t("AI Use Cases", "حالات استخدام الذكاء الاصطناعي")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("PREDICT. AUTOMATE.", "تنبأ. أتمت.")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("OPTIMISE.", "حسّن.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {AI_CAPABILITIES.map((cap, i) => {
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

      {/* ══ 3. ARCHITECTURE LAYERS ═══════════════════════════════════════ */}
      <Snap id="architecture">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col gap-5 lg:w-[380px] shrink-0">
            <FadeUp delay={0.05}><Badge>{t("AI Architecture", "بنية الذكاء الاصطناعي")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("THREE LAYERS.", "ثلاث طبقات.")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ONE BRAIN.", "عقل واحد.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.22}><GlowRule /></FadeUp>
            <FadeUp delay={0.28}>
              <p className="text-white/40" style={{ fontSize: "0.85rem", lineHeight: 1.75 }}>
                {t(
                  "Data is captured at the source, processed through AI models, then surfaced as automated actions, alerts, and insights — all within your existing enterprise stack.",
                  "يتم التقاط البيانات في المصدر ومعالجتها عبر نماذج الذكاء الاصطناعي ثم تظهر كإجراءات تلقائية وتنبيهات ورؤى — كلها ضمن بنيتك المؤسسية الحالية."
                )}
              </p>
            </FadeUp>
          </div>
          <FadeIn delay={0.2} className="flex-1 flex items-center justify-center w-full" style={{ maxWidth: 480 }}>
            <div className="w-full flex flex-col gap-4">
              {AI_LAYERS.map((layer, i) => (
                <motion.div key={layer.label}
                  className="rounded-2xl p-5 flex flex-col gap-1.5"
                  style={{ background: i === 1 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)", border: i === 1 ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease }}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white/75 text-[0.82rem] tracking-wide">{t(layer.label, layer.labelAr)}</span>
                    {i === 1 && (
                      <motion.span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.6)" }}
                        animate={{ opacity: [0.6,1,0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                        ACTIVE
                      </motion.span>
                    )}
                  </div>
                  <span className="text-white/35 text-[0.72rem]">{t(layer.sub, layer.subAr)}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Snap>

      {/* ══ 4. STATS ═════════════════════════════════════════════════════ */}
      <Snap id="impact">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.07} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-10" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Measured Impact", "تأثير قابل للقياس")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("AI THAT DELIVERS", "ذكاء اصطناعي يحقق")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("MEASURABLE ROI.", "عائد استثمار قابل للقياس.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
            {[
              { v: "60%",  l: t("Reduction in manual work",    "تقليل العمل اليدوي")     },
              { v: "3×",   l: t("Faster decision-making",      "قرارات أسرع بـ 3 أضعاف") },
              { v: "99%",  l: t("Forecast accuracy",           "دقة التوقعات")            },
              { v: "24/7", l: t("AI monitoring & alerts",      "مراقبة وتنبيهات مستمرة") },
            ].map((s, i) => (
              <FadeUp key={s.v} delay={0.28 + i * 0.08}>
                <div className="flex flex-col items-center gap-2 rounded-2xl py-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-thin" style={{ fontSize: "2.2rem", color: "#fff", fontFamily: "Quicksand,sans-serif" }}>{s.v}</span>
                  <span className="text-white/35 text-[10px] tracking-wide text-center px-2">{s.l}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Snap>

      {/* ══ 5. CTA ═══════════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center justify-center">
        <Grid />
        <Glow x="50%" y="50%" size="80vw" intensity={0.07} />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 gap-8 text-center" style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeUp delay={0.1}><Badge>{t("Start Your AI Journey", "ابدأ رحلتك مع الذكاء الاصطناعي")}</Badge></FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("MAKE YOUR ERP", "اجعل نظامك")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("SELF-AWARE.", "يفكر بنفسه.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.28}><GlowRule /></FadeUp>
          <FadeUp delay={0.34}>
            <p className="text-white/38 max-w-md" style={{ fontSize: "0.83rem", lineHeight: 1.75 }}>
              {t("Embed AI directly into your enterprise operations and let intelligence run your business.","ادمج الذكاء الاصطناعي مباشرة في عملياتك المؤسسية ودع الذكاء يشغّل أعمالك.")}
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
