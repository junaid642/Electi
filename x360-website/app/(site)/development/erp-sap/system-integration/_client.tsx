"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Shield, Database, Cpu, Layers, Activity, CheckCircle, TrendingUp } from "lucide-react";
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

const INTEGRATIONS = [
  { icon: Database,   en: "ERP ↔ CRM",               ar: "ERP ↔ CRM",               descEn: "Bidirectional sync between SAP, Oracle, Dynamics and Salesforce.",       descAr: "مزامنة ثنائية الاتجاه بين SAP وOracle وDynamics وSalesforce." },
  { icon: Globe,      en: "Cloud Connectors",          ar: "موصلات السحابة",           descEn: "Native connectors to AWS, Azure, GCP, and major SaaS platforms.",         descAr: "موصلات أصلية لـ AWS وAzure وGCP ومنصات SaaS الكبرى." },
  { icon: Zap,        en: "Real-Time Event Streaming", ar: "بث الأحداث الفوري",        descEn: "Kafka / event-driven integration for live operational data flows.",        descAr: "تكامل قائم على الأحداث لتدفقات البيانات التشغيلية الفورية." },
  { icon: Cpu,        en: "API Management",            ar: "إدارة واجهات API",          descEn: "Unified API gateway for governed, versioned, and monitored integrations.", descAr: "بوابة API موحدة لتكاملات مُحكمة ومُصدَّرة ومُراقَبة." },
  { icon: Shield,     en: "Legacy System Bridging",    ar: "ربط الأنظمة القديمة",      descEn: "Middleware layers that bring on-premise and legacy systems into your modern stack.", descAr: "طبقات وسيطة تجلب الأنظمة القديمة والمحلية إلى بنيتك الحديثة." },
  { icon: Activity,   en: "Integration Monitoring",    ar: "مراقبة التكامل",            descEn: "24/7 observability, alerting, and self-healing for all your data pipelines.", descAr: "مراقبة ذاتية وتنبيهات وإصلاح ذاتي لجميع خطوط بياناتك." },
];

const PLATFORMS = [
  "SAP S/4HANA","Oracle ERP","Microsoft Dynamics","Salesforce","HubSpot","Odoo",
  "Shopify","WooCommerce","ZATCA / FATOORA","Qiwa / HRSD","Muqeem","Custom Databases",
];
const PLATFORMS_AR = [
  "SAP S/4HANA","Oracle ERP","Microsoft Dynamics","Salesforce","HubSpot","Odoo",
  "Shopify","WooCommerce","ZATCA / FATOORA","قوى / وزارة العمل","مقيم","قواعد بيانات مخصصة",
];

const HOW_IT_WORKS = [
  { step: "01", en: "Audit & Map",        ar: "التدقيق والرسم",       descEn: "We inventory all systems, APIs, and data flows in your enterprise.", descAr: "نجرد جميع الأنظمة وواجهات API وتدفقات البيانات في مؤسستك." },
  { step: "02", en: "Design the Fabric",  ar: "تصميم نسيج التكامل",  descEn: "Architecture for your integration layer — event-driven or API-based.", descAr: "بنية طبقة التكامل الخاصة بك — قائمة على الأحداث أو API." },
  { step: "03", en: "Build & Connect",    ar: "البناء والتوصيل",      descEn: "Develop connectors, transformations, and middleware components.",    descAr: "تطوير الموصلات والتحويلات ومكونات الوسيط." },
  { step: "04", en: "Test & Harden",      ar: "الاختبار والتعزيز",    descEn: "Load testing, failure simulation, and security hardening.",           descAr: "اختبار التحميل ومحاكاة الفشل وتعزيز الأمان." },
  { step: "05", en: "Monitor Forever",    ar: "المراقبة المستمرة",    descEn: "24/7 observability dashboards and SLA-backed alerting.",              descAr: "لوحات مراقبة 24/7 وتنبيهات مدعومة باتفاقية مستوى الخدمة." },
];

export default function SystemIntegrationClient() {
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
          <FadeUp delay={0.05}><Badge>{t("System Integration", "تكامل الأنظمة")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin tracking-[0.08em] leading-tight" style={{ fontSize: "clamp(1.3rem,2.8vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("ALL YOUR SYSTEMS.", "جميع أنظمتك.")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ONE DATA FABRIC.", "نسيج بيانات واحد.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.32),transparent)", margin: "0 auto" }} />
          </FadeUp>
          <FadeUp delay={0.30}>
            <p className="text-white/45 max-w-lg" style={{ fontSize: "clamp(0.82rem,1.2vw,1rem)", letterSpacing: "0.04em", lineHeight: 1.7 }}>
              {t(
                "Connect your ERP, CRM, cloud platforms, APIs, and legacy systems into a unified, real-time enterprise data fabric.",
                "اربط ERP وCRM ومنصات السحابة وواجهات API والأنظمة القديمة في نسيج بيانات مؤسسي موحد وفوري."
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

      {/* ══ 2. INTEGRATION TYPES ═════════════════════════════════════════ */}
      <Snap id="integrations">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Integration Types", "أنواع التكامل")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("EVERY CONNECTION", "كل اتصال")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("HANDLED.", "تمت معالجته.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {INTEGRATIONS.map((int, i) => {
              const Icon = int.icon;
              return (
                <FadeUp key={int.en} delay={0.28 + i * 0.07}>
                  <div className="flex flex-col gap-3 rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)" }}>
                        <Icon className="w-4 h-4" style={{ color: "rgba(255,255,255,0.65)" }} />
                      </div>
                      <span className="font-medium text-white/80 text-[0.82rem] tracking-wide">{t(int.en, int.ar)}</span>
                    </div>
                    <p className="text-white/35 text-[0.72rem] leading-relaxed">{t(int.descEn, int.descAr)}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 3. PLATFORMS ═════════════════════════════════════════════════ */}
      <Snap id="platforms">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.07} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Supported Platforms", "المنصات المدعومة")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("CONNECT TO", "تواصل مع")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("ANYTHING.", "أي شيء.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <FadeUp delay={0.28}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {PLATFORMS.map((p, i) => (
                <motion.span key={p}
                  className="px-4 py-2 rounded-full text-[10px] font-medium tracking-[0.06em]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  {...{ transition: { duration: 0.5, delay: 0.32 + i * 0.05, ease } }}>
                  {t(p, PLATFORMS_AR[i])}
                </motion.span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.55}>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {[
                { v: "50+",  l: t("Pre-built connectors", "موصلات جاهزة")    },
                { v: "Any",  l: t("Custom API endpoint",  "نقطة API مخصصة")  },
                { v: "99.9%",l: t("Uptime SLA",           "ضمان التوفر")      },
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

      {/* ══ 4. HOW IT WORKS ══════════════════════════════════════════════ */}
      <Snap id="process">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Integration Process", "عملية التكامل")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("FROM AUDIT", "من التدقيق")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("TO LIVE FABRIC.", "إلى نسيج حي.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeUp key={step.step} delay={0.28 + i * 0.08}>
                <motion.div
                  className="flex items-start gap-4 rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ background: "rgba(255,255,255,0.05)" }} transition={{ duration: 0.2 }}>
                  <span className="font-thin shrink-0 mt-0.5" style={{ fontSize: "1.4rem", color: "rgba(255,255,255,0.18)", fontFamily: "Quicksand,sans-serif", lineHeight: 1 }}>{step.step}</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white/75 text-[0.82rem] tracking-wide">{t(step.en, step.ar)}</span>
                    <p className="text-white/35 text-[0.72rem] leading-relaxed">{t(step.descEn, step.descAr)}</p>
                  </div>
                </motion.div>
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
          <FadeUp delay={0.1}><Badge>{t("Get Connected", "ابدأ التكامل")}</Badge></FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("STOP MANAGING", "توقف عن إدارة")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("DISCONNECTED SYSTEMS.", "الأنظمة المنفصلة.")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.28}><GlowRule /></FadeUp>
          <FadeUp delay={0.34}>
            <p className="text-white/38 max-w-md" style={{ fontSize: "0.83rem", lineHeight: 1.75 }}>
              {t("One unified data fabric across every system, platform, and API in your enterprise.","نسيج بيانات موحد واحد عبر كل نظام ومنصة وAPI في مؤسستك.")}
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
