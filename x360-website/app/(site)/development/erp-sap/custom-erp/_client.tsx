"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, Settings, Cpu, Shield, TrendingUp, CheckCircle, Building2, Database, Globe } from "lucide-react";
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

const MODULES = [
  { icon: Database,   en: "Financial Management",    ar: "الإدارة المالية",        descEn: "GL, AP/AR, multi-currency, ZATCA-compliant e-invoicing.",       descAr: "الحسابات العامة والمدينة والدائنة ومتعددة العملات وفاتورة ZATCA." },
  { icon: Layers,     en: "Supply Chain",            ar: "سلسلة التوريد",          descEn: "Procurement, inventory, logistics, and vendor management.",     descAr: "المشتريات والمخزون واللوجستيات وإدارة الموردين." },
  { icon: Building2,  en: "HR & Payroll",            ar: "الموارد البشرية والرواتب",descEn: "Attendance, leave, payroll, and GOSI/Qiwa compliance.",        descAr: "الحضور والإجازات والرواتب وامتثال GOSI وقوى." },
  { icon: Settings,   en: "Operations & Projects",   ar: "العمليات والمشاريع",     descEn: "Project costing, resource planning, and milestone tracking.",   descAr: "تكلفة المشاريع وتخطيط الموارد وتتبع المعالم." },
  { icon: TrendingUp, en: "Sales & CRM",             ar: "المبيعات وCRM",          descEn: "Pipeline management, quotations, customer 360° view.",          descAr: "إدارة قنوات المبيعات والعروض ورؤية 360° للعملاء." },
  { icon: Globe,      en: "Multi-Branch / Multi-Co.", ar: "متعدد الفروع والشركات", descEn: "Consolidated reporting across subsidiaries and countries.",      descAr: "تقارير موحدة عبر الشركات التابعة والدول." },
];

const PROCESS = [
  { step: "01", en: "Discovery & Blueprint",   ar: "الاكتشاف والمخطط",     descEn: "Map your processes, data flows, and compliance needs.",   descAr: "رسم عملياتك وتدفقات البيانات ومتطلبات الامتثال." },
  { step: "02", en: "System Design",           ar: "تصميم النظام",          descEn: "Architecture, module selection, and integration planning.", descAr: "الهندسة المعمارية واختيار الوحدات وتخطيط التكامل." },
  { step: "03", en: "Agile Build & Configure", ar: "البناء والتهيئة",       descEn: "Sprint-based delivery with continuous client feedback.",    descAr: "تسليم قائم على السباقات مع تغذية راجعة مستمرة." },
  { step: "04", en: "UAT & Go-Live",           ar: "الاختبار والإطلاق",     descEn: "User acceptance testing, data migration, and launch.",     descAr: "اختبار القبول وهجرة البيانات والإطلاق." },
  { step: "05", en: "Post-Live Support",        ar: "الدعم بعد الإطلاق",    descEn: "Dedicated SLA support, monitoring, and enhancements.",     descAr: "دعم مخصص ومراقبة وتحسينات مستمرة." },
];

export default function CustomERPClient() {
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
          <FadeUp delay={0.05}><Badge>{t("Custom ERP", "نظام ERP مخصص")}</Badge></FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin tracking-[0.08em] leading-tight" style={{ fontSize: "clamp(1.3rem,2.8vw,2.6rem)", fontFamily: "Quicksand,sans-serif" }}>
              {t("YOUR BUSINESS.", "أعمالك.")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("YOUR ERP.", "نظامك الخاص.")}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div style={{ width: "clamp(80px,16vw,180px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.32),transparent)", margin: "0 auto" }} />
          </FadeUp>
          <FadeUp delay={0.30}>
            <p className="text-white/45 max-w-lg" style={{ fontSize: "clamp(0.82rem,1.2vw,1rem)", letterSpacing: "0.04em", lineHeight: 1.7 }}>
              {t(
                "Purpose-built ERP platforms designed exactly around your workflows — not the other way around.",
                "منصات ERP مصممة حول سير عملك بالضبط — لا العكس."
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

      {/* ══ 2. MODULES ═══════════════════════════════════════════════════ */}
      <Snap id="modules">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Core Modules", "الوحدات الأساسية")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("EVERY MODULE YOU NEED.", "كل وحدة تحتاجها.")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("NOTHING YOU DON'T.", "لا شيء زائد.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {MODULES.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <FadeUp key={mod.en} delay={0.28 + i * 0.07}>
                  <div className="flex flex-col gap-3 rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)" }}>
                        <Icon className="w-4 h-4" style={{ color: "rgba(255,255,255,0.65)" }} />
                      </div>
                      <span className="font-medium text-white/80 text-[0.82rem] tracking-wide">{t(mod.en, mod.ar)}</span>
                    </div>
                    <p className="text-white/35 text-[0.72rem] leading-relaxed">{t(mod.descEn, mod.descAr)}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 3. IMPLEMENTATION PROCESS ════════════════════════════════════ */}
      <Snap id="process">
        <Grid />
        <Glow x="50%" y="50%" size="75vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("How We Build", "كيف نبني")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("FROM BLUEPRINT", "من المخطط")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("TO LIVE SYSTEM.", "إلى النظام الحي.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 700 }}>
            {PROCESS.map((step, i) => (
              <FadeUp key={step.step} delay={0.28 + i * 0.09}>
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

      {/* ══ 4. WHY CUSTOM OVER OFF-THE-SHELF ═════════════════════════════ */}
      <Snap id="why">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{t("Custom vs. Off-the-Shelf", "مخصص مقابل جاهز")}</Badge></FadeUp>
            <FadeUp delay={0.14}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem,1.9vw,1.8rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {t("BUILT FOR YOU,", "مبني لك،")}<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("NOT THE AVERAGE BUSINESS.", "لا للمتوسط.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.20}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" style={{ maxWidth: 900 }}>
            <FadeIn delay={0.28} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-semibold">{t("Off-the-Shelf ERP","نظام ERP جاهز")}</span>
              {[
                t("Designed for the average business","مصمم للأعمال المتوسطة"),
                t("Rigid workflows you must adapt to","سير عمل صارم يجب التكيف معه"),
                t("Unused modules you still pay for","وحدات غير مستخدمة لكنك تدفع ثمنها"),
                t("Limited Saudi compliance options","خيارات امتثال سعودي محدودة"),
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>✕</span>
                  <span className="text-white/35 text-[0.78rem]">{item}</span>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.36} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-semibold">{t("X360 Custom ERP","X360 ERP مخصص")}</span>
              {[
                t("Designed exactly for your processes","مصمم بدقة لعملياتك"),
                t("Workflows that match how you operate","سير عمل يطابق طريقة عملك"),
                t("Only the modules your team needs","فقط الوحدات التي يحتاجها فريقك"),
                t("Full ZATCA & Saudi compliance built-in","امتثال ZATCA السعودي الكامل مدمج"),
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
                  <span className="text-white/70 text-[0.78rem]">{item}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </Snap>

      {/* ══ 5. CTA ═══════════════════════════════════════════════════════ */}
      <Snap id="cta" className="flex items-center justify-center">
        <Grid />
        <Glow x="50%" y="50%" size="80vw" intensity={0.07} />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 gap-8 text-center" style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeUp delay={0.1}><Badge>{t("Get Started", "ابدأ الآن")}</Badge></FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.2rem,2.5vw,2.2rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
              {t("READY TO BUILD YOUR", "هل أنت مستعد لبناء")}<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("PERFECT ERP?", "ERP المثالي؟")}</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.28}><GlowRule /></FadeUp>
          <FadeUp delay={0.34}>
            <p className="text-white/38 max-w-md" style={{ fontSize: "0.83rem", lineHeight: 1.75 }}>
              {t("Let's design a system that fits your business — not a system you fit into.","لنصمم نظاماً يناسب أعمالك — وليس نظاماً تتكيف أنت معه.")}
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
