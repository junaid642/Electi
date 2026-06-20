"use client";
import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Camera, Globe, Box, Layers, Code, Monitor, Smartphone, Laptop,
  Brain, Cpu, Zap, BarChart2, Database, Settings, Shield, RefreshCw,
  ChevronDown, ArrowRight, Eye, TrendingUp, Lock, Users, Award, Clock,
  CheckCircle, MapPin, Star, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

/* ─── icon registry ─────────────────────────────────────────────────────────── */
export type IconKey =
  | "camera" | "globe" | "box" | "layers" | "eye" | "sparkles"
  | "code" | "monitor" | "smartphone" | "laptop"
  | "brain" | "cpu" | "zap" | "barchart"
  | "database" | "settings" | "shield" | "refresh"
  | "award" | "clock" | "users" | "trending" | "lock" | "check" | "pin" | "star";

type IconComp = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const ICONS: Record<IconKey, IconComp> = {
  camera: Camera, globe: Globe, box: Box, layers: Layers, eye: Eye, sparkles: Sparkles,
  code: Code, monitor: Monitor, smartphone: Smartphone, laptop: Laptop,
  brain: Brain, cpu: Cpu, zap: Zap, barchart: BarChart2,
  database: Database, settings: Settings, shield: Shield, refresh: RefreshCw,
  award: Award, clock: Clock, users: Users, trending: TrendingUp,
  lock: Lock, check: CheckCircle, pin: MapPin, star: Star,
};

/* ─── data types ─────────────────────────────────────────────────────────────── */
export interface CityFact {
  valEn: string; valAr: string;
  labelEn: string; labelAr: string;
}
export interface CityServiceItem {
  icon: IconKey;
  titleEn: string; titleAr: string;
  descEn: string; descAr: string;
}
export interface CityIndustry { en: string; ar: string; }
export interface CityProcessStep {
  titleEn: string; titleAr: string;
  descEn: string; descAr: string;
}
export interface CityWhyPoint {
  icon: IconKey;
  titleEn: string; titleAr: string;
  descEn: string; descAr: string;
}
export interface CityFaqItem {
  qEn: string; qAr: string;
  aEn: string; aAr: string;
}
export interface CityRelatedLink {
  labelEn: string; labelAr: string; href: string;
}

export interface CityPageData {
  cityEn: string; cityAr: string;
  serviceEn: string; serviceAr: string;
  heroTitleEn: string; heroTitleAr: string;
  heroSubEn: string; heroSubAr: string;
  introHeadingEn: string; introHeadingAr: string;
  introParasEn: string[]; introParasAr: string[];
  facts: CityFact[];
  servicesHeadingEn: string; servicesHeadingAr: string;
  services: CityServiceItem[];
  cityContextEn: string; cityContextAr: string;
  industries: CityIndustry[];
  processSteps: CityProcessStep[];
  whyPoints: CityWhyPoint[];
  faqItems: CityFaqItem[];
  relatedLinks: CityRelatedLink[];
}

/* ─── helpers ────────────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children, delay = 0, className = "",
}: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.18em] uppercase"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      {children}
    </span>
  );
}

function GlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden my-0" style={{ background: "rgba(255,255,255,0.05)" }}>
      <motion.div
        className="absolute inset-y-0 w-48"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)",
        }}
        animate={{ x: ["-100%", "calc(100vw + 100%)"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────────────── */
export default function CityServicePage({ data }: { data: CityPageData }) {
  const { isAr } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="relative flex flex-col bg-[#050505] overflow-hidden"
      >
        {/* Location hero background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/x360/location-hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ zIndex: 0, opacity: 0.45 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.30) 50%, rgba(5,5,5,0.75) 100%)" }} />
        <div className="relative" style={{ zIndex: 2 }}><Navbar /></div>
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 sm:px-10 text-center py-12" style={{ zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[10px] tracking-[0.35em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {t(data.cityEn, data.cityAr)} &nbsp;·&nbsp; {t(data.serviceEn, data.serviceAr)}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
            className="font-thin text-white leading-tight mb-5 max-w-3xl"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}
          >
            {t(data.heroTitleEn, data.heroTitleAr)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
            style={{ color: "rgba(255,255,255,0.48)" }}
          >
            {t(data.heroSubEn, data.heroSubAr)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="flex flex-col sm:flex-row gap-3 items-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm tracking-wide hover:bg-white/90 transition-colors"
            >
              {t("Get a Free Quote", "احصل على عرض مجاني")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-wide transition-all"
              style={{
                color: "rgba(255,255,255,0.60)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              {t("Common Questions", "الأسئلة الشائعة")}
            </Link>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          <span className="text-[9px] tracking-[0.28em] uppercase">scroll</span>
          <ChevronDown size={11} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — INTRO / ABOUT
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* left: text */}
            <div>
              <FadeUp>
                <SectionBadge>{t("ABOUT", "حول")}</SectionBadge>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-6 leading-tight">
                  {t(data.introHeadingEn, data.introHeadingAr)}
                </h2>
              </FadeUp>
              {data.introParasEn.map((para, i) => (
                <FadeUp key={i} delay={0.12 + i * 0.07}>
                  <p
                    className="text-sm sm:text-[15px] leading-relaxed mb-4"
                    style={{ color: "rgba(255,255,255,0.54)" }}
                  >
                    {t(para, data.introParasAr[i] ?? para)}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* right: facts grid */}
            <div className="grid grid-cols-2 gap-4">
              {data.facts.map((fact, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="rounded-2xl p-5 sm:p-6 border"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
                      {t(fact.valEn, fact.valAr)}
                    </p>
                    <p
                      className="text-[11px] leading-snug"
                      style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.03em" }}
                    >
                      {t(fact.labelEn, fact.labelAr)}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — SERVICES
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-24">
          <FadeUp>
            <SectionBadge>{t("SERVICES", "الخدمات")}</SectionBadge>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-10 leading-tight max-w-lg">
              {t(data.servicesHeadingEn, data.servicesHeadingAr)}
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {data.services.map((svc, i) => {
              const Icon = ICONS[svc.icon] ?? Camera;
              return (
                <FadeUp key={i} delay={0.08 + i * 0.07}>
                  <div
                    className="flex gap-4 p-5 sm:p-6 rounded-2xl border h-full"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <Icon size={16} style={{ color: "rgba(255,255,255,0.62)" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1.5">
                        {t(svc.titleEn, svc.titleAr)}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.48)" }}
                      >
                        {t(svc.descEn, svc.descAr)}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — CITY INDUSTRIES / MARKET
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-24">
          <FadeUp>
            <SectionBadge>
              {t(`${data.cityEn.toUpperCase()} MARKET`, `سوق ${data.cityAr}`)}
            </SectionBadge>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-6 leading-tight max-w-xl">
              {t(
                `Serving ${data.cityEn}'s Key Industries`,
                `نخدم القطاعات الرئيسية في ${data.cityAr}`,
              )}
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p
              className="text-sm sm:text-[15px] leading-relaxed max-w-2xl mb-10"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              {t(data.cityContextEn, data.cityContextAr)}
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="flex flex-wrap gap-2.5">
              {data.industries.map((ind, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.045)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.68)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(255,255,255,0.30)" }}
                  />
                  {t(ind.en, ind.ar)}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — PROCESS
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-24">
          <FadeUp>
            <SectionBadge>{t("HOW IT WORKS", "كيف يعمل")}</SectionBadge>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-10 leading-tight max-w-lg">
              {t("Our Simple 4‑Step Process", "عمليتنا المبسطة في 4 خطوات")}
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.processSteps.map((step, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.07}>
                <div
                  className="flex gap-4 p-5 sm:p-6 rounded-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1.5">
                      {t(step.titleEn, step.titleAr)}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.48)" }}
                    >
                      {t(step.descEn, step.descAr)}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — WHY X360
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-24">
          <FadeUp>
            <SectionBadge>{t("WHY X360", "لماذا X360")}</SectionBadge>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-10 leading-tight max-w-xl">
              {t(
                `The Leading ${data.serviceEn} Company in ${data.cityEn}`,
                `شركة ${data.serviceAr} الرائدة في ${data.cityAr}`,
              )}
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {data.whyPoints.map((pt, i) => {
              const Icon = ICONS[pt.icon] ?? Award;
              return (
                <FadeUp key={i} delay={0.1 + i * 0.09}>
                  <div
                    className="p-6 rounded-2xl border h-full"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <Icon size={16} style={{ color: "rgba(255,255,255,0.62)" }} />
                    </div>
                    <p className="font-semibold text-white text-sm mb-2">
                      {t(pt.titleEn, pt.titleAr)}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.48)" }}
                    >
                      {t(pt.descEn, pt.descAr)}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — FAQ
      ══════════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="bg-[#050505]"
      >
        <div className="min-h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 sm:px-10 py-24">
          <FadeUp>
            <SectionBadge>{t("FAQ", "الأسئلة")}</SectionBadge>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-10 leading-tight">
              {t(
                `Questions About ${data.serviceEn} in ${data.cityEn}`,
                `أسئلة حول ${data.serviceAr} في ${data.cityAr}`,
              )}
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-3 mb-8">
            {data.faqItems.map((faq, i) => (
              <FadeUp key={i} delay={0.08 + i * 0.06}>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-start gap-4"
                    style={{
                      background:
                        openFaq === i
                          ? "rgba(255,255,255,0.035)"
                          : "rgba(255,255,255,0.015)",
                    }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-white">
                      {t(faq.qEn, faq.qAr)}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="shrink-0"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="ans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="px-5 pb-4 pt-1 text-xs sm:text-[13px] leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                          {t(faq.aEn, faq.aAr)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.36}>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {t("View all FAQs", "عرض جميع الأسئلة")}
              <ArrowRight size={13} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8 — CTA + FOOTER
      ══════════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start" }} className="bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-24 pb-16">
          <FadeUp>
            <div
              className="rounded-3xl p-8 sm:p-12 text-center border mb-10"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10px] tracking-[0.32em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.30)" }}
              >
                {t("READY TO START?", "هل أنت مستعد؟")}
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {t(
                  `Start Your ${data.serviceEn} Project in ${data.cityEn}`,
                  `ابدأ مشروع ${data.serviceAr} في ${data.cityAr}`,
                )}
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                {t(
                  "Get a free consultation and custom proposal within 48 hours. Our team is ready to bring your vision to life.",
                  "احصل على استشارة مجانية وعرض مخصص خلال 48 ساعة. فريقنا مستعد لتحويل رؤيتك إلى واقع.",
                )}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-white/90 transition-colors mb-8"
              >
                {t("Contact Us Today", "تواصل معنا اليوم")}
                <ArrowRight size={14} />
              </Link>

              {data.relatedLinks.length > 0 && (
                <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                  <p
                    className="text-[9px] tracking-[0.24em] uppercase w-full mb-1.5"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {t("Related Services", "خدمات ذات صلة")}
                  </p>
                  {data.relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border transition-colors"
                      style={{
                        color: "rgba(255,255,255,0.50)",
                        borderColor: "rgba(255,255,255,0.09)",
                      }}
                    >
                      {t(link.labelEn, link.labelAr)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>
        </div>
        <GlowDivider />
        <Footer />
      </section>
    </div>
  );
}
