"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Camera, Globe, Box, Layers, Code, Monitor, Smartphone,
  Brain, Cpu, Zap, BarChart2, Database, Settings, Shield, RefreshCw,
  ChevronDown, ArrowLeft, Eye, TrendingUp, Award, Clock, Users, Star, Sparkles,
  CheckCircle, MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type ArIconKey =
  | "camera" | "globe" | "box" | "layers" | "eye" | "sparkles"
  | "code" | "monitor" | "smartphone"
  | "brain" | "cpu" | "zap" | "barchart"
  | "database" | "settings" | "shield" | "refresh"
  | "award" | "clock" | "users" | "trending" | "check" | "pin" | "star";

type IconComp = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const ICONS: Record<ArIconKey, IconComp> = {
  camera: Camera, globe: Globe, box: Box, layers: Layers, eye: Eye, sparkles: Sparkles,
  code: Code, monitor: Monitor, smartphone: Smartphone,
  brain: Brain, cpu: Cpu, zap: Zap, barchart: BarChart2,
  database: Database, settings: Settings, shield: Shield, refresh: RefreshCw,
  award: Award, clock: Clock, users: Users, trending: TrendingUp,
  check: CheckCircle, pin: MapPin, star: Star,
};

export interface ArCityData {
  cityAr: string;
  serviceAr: string;
  heroTitleAr: string;
  heroSubAr: string;
  introHeadingAr: string;
  introParasAr: string[];
  facts: { val: string; label: string }[];
  servicesHeadingAr: string;
  services: { icon: ArIconKey; title: string; desc: string }[];
  cityContextAr: string;
  industries: string[];
  processSteps: { title: string; desc: string }[];
  whyPoints: { icon: ArIconKey; title: string; desc: string }[];
  faqItems: { q: string; a: string }[];
  relatedLinks: { label: string; href: string }[];
  canonicalEnUrl: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
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

function GlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
      <motion.div
        className="absolute inset-y-0 w-48"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)" }}
        animate={{ x: ["-100%", "calc(100vw + 100%)"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  );
}

export default function ArCityPage({ data }: { data: ArCityData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.documentElement.lang;
    const prevDir = document.documentElement.getAttribute("dir");
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    return () => {
      document.documentElement.lang = prev;
      if (prevDir) document.documentElement.dir = prevDir;
      else document.documentElement.removeAttribute("dir");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dir="rtl"
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="relative flex flex-col bg-[#050505]"
      >
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 text-center py-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {data.cityAr} &nbsp;·&nbsp; {data.serviceAr}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-5 max-w-3xl"
          >
            {data.heroTitleAr}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
            style={{ color: "rgba(255,255,255,0.48)" }}
          >
            {data.heroSubAr}
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
              <ArrowLeft size={14} />
              احصل على عرض مجاني
            </Link>
            <Link
              href={data.canonicalEnUrl}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              View in English
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-center pb-8">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — FACTS + INTRO
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#050505] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">
          <FadeUp className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {data.facts.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{f.val}</div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>{f.label}</div>
              </div>
            ))}
          </FadeUp>

          <GlowDivider />

          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-6">
                {data.introHeadingAr}
              </h2>
              <div className="space-y-4">
                {data.introParasAr.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                    {p}
                  </p>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="grid grid-cols-2 gap-3">
              {data.industries.slice(0, 4).map((ind, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                >
                  {ind}
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — SERVICES
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#070707] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{data.servicesHeadingAr}</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
              {data.cityAr} · المملكة العربية السعودية
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.services.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <FadeUp key={i} delay={i * 0.07}>
                  <div
                    className="rounded-2xl p-6 h-full transition-all hover:border-white/20"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — CITY CONTEXT + INDUSTRIES
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#050505] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">
          <FadeUp className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
              {data.serviceAr} في {data.cityAr}
            </h2>
            <p
              className="text-base leading-relaxed max-w-3xl"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              {data.cityContextAr}
            </p>
          </FadeUp>

          <GlowDivider />

          <FadeUp delay={0.1} className="mt-10">
            <h3 className="text-lg font-semibold text-white mb-5">القطاعات التي نخدمها</h3>
            <div className="flex flex-wrap gap-2">
              {data.industries.map((ind, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — PROCESS
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#070707] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">كيف نعمل</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>عملية بسيطة — نتائج استثنائية</p>
          </FadeUp>
          <div className="space-y-4">
            {data.processSteps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.09}>
                <div
                  className="flex gap-5 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — WHY X360
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#050505] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto w-full">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">لماذا X360؟</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>الشريك الأمثل لنجاح أعمالك في السعودية</p>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-4">
            {data.whyPoints.map((w, i) => {
              const Icon = ICONS[w.icon];
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div
                    className="rounded-2xl p-6 h-full"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{w.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{w.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — FAQ
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col justify-center bg-[#070707] px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="max-w-3xl mx-auto w-full">
          <FadeUp className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">الأسئلة الشائعة</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>إجابات على أكثر الأسئلة شيوعاً</p>
          </FadeUp>
          <div className="space-y-3">
            {data.faqItems.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 p-5 text-right"
                    style={{ background: openFaq === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-sm font-medium text-white text-right flex-1">{item.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          className="px-5 pb-5 text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — CTA + RELATED + FOOTER
      ═══════════════════════════════════════════ */}
      <section
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
        className="flex flex-col bg-[#050505]"
      >
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <FadeUp className="text-center mb-14">
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                ابدأ الآن
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ابدأ مشروعك في {data.cityAr} اليوم
              </h2>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.48)" }}>
                تواصل مع فريقنا للحصول على استشارة مجانية وعرض سعر مفصّل خلال 24 ساعة
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-white/90 transition-colors"
                >
                  <ArrowLeft size={14} />
                  تواصل معنا الآن
                </Link>
                <a
                  href="https://wa.me/966502547274"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                >
                  واتساب
                </a>
              </div>
            </FadeUp>

            {data.relatedLinks.length > 0 && (
              <FadeUp delay={0.12}>
                <GlowDivider />
                <div className="mt-8 text-center">
                  <h3 className="text-sm font-semibold text-white mb-4">خدمات ذات صلة</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {data.relatedLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="px-4 py-2 rounded-full text-xs transition-colors hover:border-white/25"
                        style={{ border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
