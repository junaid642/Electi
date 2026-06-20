"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, Code2, Zap, Globe, Shield, Layers, Activity,
  ShoppingCart, BarChart3, Bot, MessageSquare, Bell, Cpu, Database,
  Users, Eye, Lock, Cloud, TrendingUp, Settings, AlertCircle, Clock,
  Network, CheckCircle, Star, FileText, Briefcase, Building2, Calendar,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { WebAIServiceData } from "@/data/webai-categories";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  Code2, Zap, Globe, Shield, Layers, Activity, ShoppingCart, BarChart3,
  Bot, MessageSquare, Bell, Cpu, Database, Users, Eye, Lock, Cloud,
  TrendingUp, Settings, AlertCircle, Clock, Network, CheckCircle,
  Star, FileText, Briefcase, Building2, Calendar,
};

/* ─── shared helpers ──────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SnapSection({ children, accent, className = "" }: { children: ReactNode; accent?: string; className?: string }) {
  return (
    <section
      className={`relative flex flex-col items-center overflow-hidden pt-16 pb-4 sm:py-20 ${className}`}
      style={{ height: "100dvh", scrollSnapAlign: "start", paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}
    >
      {accent && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 45%, ${accent} 0%, transparent 65%)` }}
        />
      )}
      {children}
    </section>
  );
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }}
    >
      {children}
    </span>
  );
}

function GlowRule({ color = "rgba(255,255,255,0.22)" }: { color?: string }) {
  return (
    <div
      className="h-px mx-auto"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        width: "clamp(80px, 14vw, 180px)",
      }}
    />
  );
}

/* ─── hero orb ────────────────────────────────────────────────────────────── */
function ServiceOrb({ accentMid, features }: { accentMid: string; features: WebAIServiceData["features"] }) {
  const chips = features.slice(0, 4);
  const SIZE = 280;
  const R = 115;
  const angles = [270, 0, 90, 180]; // top, right, bottom, left
  return (
    <div className="relative hidden lg:block flex-shrink-0" style={{ width: SIZE, height: SIZE, overflow: "visible" }}>
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-white/5"
        style={{ inset: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border border-white/8"
        style={{ inset: SIZE * 0.14, }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: SIZE * 0.3,
          background: accentMid,
          filter: "blur(20px)",
          opacity: 0.9,
        }}
      />
      {/* Center icon circle */}
      <div
        className="absolute flex items-center justify-center rounded-full border border-white/12"
        style={{
          width: SIZE * 0.28,
          height: SIZE * 0.28,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(8,8,12,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <Cpu size={22} style={{ color: "rgba(255,255,255,0.72)" }} />
        </motion.div>
      </div>
      {/* Feature chips */}
      {chips.map((chip, i) => {
        const Icon = ICON_MAP[chip.iconKey] ?? Code2;
        const rad = (angles[i] ?? 0) * (Math.PI / 180);
        const cx = SIZE / 2 + R * Math.cos(rad);
        const cy = SIZE / 2 + R * Math.sin(rad);
        return (
          <motion.div
            key={i}
            className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 text-[10px]"
            style={{
              left: cx,
              top: cy,
              transform: "translate(-50%, -50%)",
              background: "rgba(8,8,12,0.9)",
              backdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.60)",
              whiteSpace: "nowrap",
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * 0.15, duration: 0.6, ease }}
          >
            <Icon size={11} />
            <span>{chip.title.split(" ").slice(0, 2).join(" ")}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── solution panel ──────────────────────────────────────────────────────── */
function SolutionPanel({ features, accentMid }: { features: WebAIServiceData["features"]; accentMid: string }) {
  return (
    <div
      className="w-full max-w-[400px] rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: "rgba(6,6,10,0.90)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6">
        <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,70,70,0.7)" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,190,30,0.7)" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "rgba(40,210,80,0.7)" }} />
        <span className="text-[9px] tracking-[0.18em] ml-2" style={{ color: "rgba(255,255,255,0.22)" }}>CAPABILITIES</span>
        <motion.div
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ background: "rgba(40,210,80,0.85)" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
      {/* Feature rows */}
      {features.map((f, i) => {
        const Icon = ICON_MAP[f.iconKey] ?? Code2;
        return (
          <motion.div
            key={i}
            className="flex items-center gap-4 px-5 py-4 border-b border-white/4 last:border-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.55, ease }}
            whileHover={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ width: 34, height: 34, background: accentMid }}
            >
              <Icon size={15} style={{ color: "rgba(255,255,255,0.82)" }} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[12px] font-medium truncate" style={{ color: "rgba(255,255,255,0.80)" }}>
                {f.title}
              </span>
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-0.5 rounded-full flex-shrink-0"
                  style={{ background: accentMid }}
                  animate={{ width: ["20px", "55px", "35px"] }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>active</span>
              </div>
            </div>
            <motion.div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "rgba(40,210,80,0.6)" }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8 + i * 0.2, repeat: Infinity }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────────────── */
interface Props {
  data: WebAIServiceData;
  categoryName: string;
  categoryNameAr: string;
  categorySlug: string;
}

export default function AIServiceSubpage({ data, categoryName, categoryNameAr, categorySlug }: Props) {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const accentRaw = data.accentColor;
  const accentStrong = accentRaw.replace(/[\d.]+\)$/, "0.70)");
  const accentMid = accentRaw.replace(/[\d.]+\)$/, "0.22)");
  const accentFaint = accentRaw.replace(/[\d.]+\)$/, "0.05)");

  return (
    <div
      className="relative bg-[#050505] text-white"
      style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      <style>{`::-webkit-scrollbar{display:none}`}</style>

      {/* ══ 1 · HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col lg:flex-row items-center justify-between overflow-hidden gap-12"
        style={{ height: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem, 6vw, 5rem) 64px" }}
      >
        {/* bg grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 22% 42%, ${accentFaint} 0%, transparent 55%)` }}
        />

        {/* Left: text */}
        <div className="relative z-10 flex-1 flex flex-col gap-5 max-w-2xl">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.5, ease }}>
            <Link href={`/development/${categorySlug}`}>
              <motion.span
                className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer"
                style={{ color: "rgba(255,255,255,0.30)" }}
                whileHover={{ color: "rgba(255,255,255,0.72)" }}
              >
                <ChevronLeft size={11} />
                {isAr ? categoryNameAr : categoryName}
              </motion.span>
            </Link>
          </motion.div>

          {/* Live badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-medium"
              style={{ color: "rgba(255,255,255,0.38)", background: "rgba(255,255,255,0.04)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentStrong }} />
              {isAr ? data.hero.labelAr : data.hero.label}
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease }}
            className="font-thin leading-tight"
            style={{ fontSize: "clamp(2rem, 4.8vw, 3.8rem)", letterSpacing: "0.08em" }}
          >
            {(isAr ? data.hero.headlineAr : data.hero.headline).split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span style={{ color: "rgba(255,255,255,0.38)" }}>{line}</span> : line}
              </span>
            ))}
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
            className="h-px self-start"
            style={{ width: "clamp(60px, 10vw, 110px)", background: `linear-gradient(90deg, ${accentStrong}, transparent)` }}
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.72, ease }}
            className="leading-relaxed text-sm"
            style={{ color: "rgba(255,255,255,0.46)", maxWidth: 480 }}
          >
            {isAr ? data.hero.subAr : data.hero.sub}
          </motion.p>

          {/* Stat pills (first 3) */}
          {data.stats && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6, ease }}
              className="flex flex-wrap gap-2"
            >
              {data.stats.slice(0, 3).map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 text-[11px]"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="font-semibold text-white/82">{s.value}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>{isAr ? s.labelAr : s.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65, ease }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/contact">
              <motion.button
                className="px-7 py-3.5 rounded-xl font-semibold text-[13px] bg-white text-black"
                style={{ boxShadow: "0 0 28px rgba(255,255,255,0.14)" }}
                whileHover={{ scale: 1.03, y: -1, boxShadow: "0 0 40px rgba(255,255,255,0.22)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("Get Started", "ابدأ الآن")}
              </motion.button>
            </Link>
            <Link href={`/development/${categorySlug}`}>
              <motion.button
                className="px-7 py-3.5 rounded-xl font-medium text-[13px] border border-white/12 text-white/55 hover:text-white hover:border-white/24 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("All Services", "جميع الخدمات")}
                <ArrowRight size={13} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right: service orb */}
        <div className="hidden lg:flex relative z-10 flex-1 items-center justify-center">
          <ServiceOrb accentMid={accentMid} features={data.features} />
        </div>
      </section>

      {/* ══ 2 · THE CHALLENGE ════════════════════════════════════════════════ */}
      <SnapSection accent={accentFaint}>
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col gap-4 sm:gap-10">
          <FadeUp className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>{t("The Challenge", "التحديات")}</SectionBadge>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
              {t("PROBLEMS WE SOLVE.", "المشكلات التي نحلّها.")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.36)" }}>{t("FASTER THAN YOU THINK.", "أسرع مما تظن.")}</span>
            </h2>
            <GlowRule color={accentStrong} />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
            {(data.painPoints ?? []).map((p, i) => {
              const Icon = ICON_MAP[p.iconKey] ?? AlertCircle;
              return (
                <FadeUp key={i} delay={0.08 * i}>
                  <motion.div
                    className="rounded-xl sm:rounded-2xl border border-white/6 p-4 sm:p-7 flex flex-col gap-3 sm:gap-5 h-full"
                    style={{ background: "rgba(255,255,255,0.024)" }}
                    whileHover={{ background: "rgba(255,255,255,0.042)", y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ width: 36, height: 36, background: accentMid, border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Icon size={16} style={{ color: "rgba(255,255,255,0.80)" }} />
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1.5 sm:mb-2.5 text-[11px] sm:text-[inherit]"
                        style={{ lineHeight: 1.35 }}
                      >
                        {isAr ? p.titleAr : p.title}
                      </h3>
                      <p className="leading-relaxed text-[10px] sm:text-[inherit]" style={{ color: "rgba(255,255,255,0.42)" }}>
                        {isAr ? p.descAr : p.desc}
                      </p>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ══ 3 · SOLUTION SHOWCASE ════════════════════════════════════════════ */}
      <SnapSection>
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col lg:flex-row items-center gap-14">
          {/* Left: text */}
          <div className="flex-1 flex flex-col gap-6">
            <FadeUp><SectionBadge>{t("Our Solution", "حلّنا")}</SectionBadge></FadeUp>
            <FadeUp delay={0.06}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
                {t("BUILT SPECIFICALLY", "مبني خصيصاً")}
                <br />
                <span style={{ color: "rgba(255,255,255,0.36)" }}>{t("FOR YOUR BUSINESS.", "لعملك.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div
                className="h-px self-start"
                style={{ width: "clamp(60px, 8vw, 100px)", background: `linear-gradient(90deg, ${accentStrong}, transparent)` }}
              />
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.44)", maxWidth: 440 }}>
                {isAr ? data.hero.subAr : data.hero.sub}
              </p>
            </FadeUp>
            <div className="flex flex-col gap-3 mt-1">
              {data.features.slice(0, 4).map((f, i) => (
                <FadeUp key={i} delay={0.18 + i * 0.07}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: accentMid, border: `1px solid ${accentStrong}` }}
                    >
                      <CheckCircle size={10} style={{ color: "rgba(255,255,255,0.92)" }} />
                    </div>
                    <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {isAr ? f.titleAr : f.title}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.5}>
              <Link href="/contact">
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[13px] bg-white text-black mt-2"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {t("Discuss Your Project", "ناقش مشروعك")}
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          {/* Right: solution panel */}
          <div className="hidden lg:flex flex-1 items-center justify-end">
            <SolutionPanel features={data.features} accentMid={accentMid} />
          </div>
        </div>
      </SnapSection>

      {/* ══ 4 · CORE CAPABILITIES ════════════════════════════════════════════ */}
      <SnapSection accent={accentFaint}>
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col gap-4 sm:gap-10">
          <FadeUp className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>{t("Core Capabilities", "القدرات الأساسية")}</SectionBadge>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
              {t("WHAT WE DELIVER.", "ما نقدّمه.")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.36)" }}>{t("END TO END.", "من البداية للنهاية.")}</span>
            </h2>
            <GlowRule color={accentStrong} />
          </FadeUp>

          {/* 2-col on mobile so capabilities fit one screen */}
          <div className="grid grid-cols-2 gap-2 sm:gap-5">
            {data.features.map((f, i) => {
              const Icon = ICON_MAP[f.iconKey] ?? Code2;
              return (
                <FadeUp key={i} delay={0.07 * i}>
                  <motion.div
                    className="rounded-xl sm:rounded-2xl border border-white/6 p-3 sm:p-7 flex flex-col gap-2 sm:gap-4 h-full"
                    style={{ background: "rgba(255,255,255,0.026)" }}
                    whileHover={{ background: "rgba(255,255,255,0.046)", y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                      style={{ width: 30, height: 30, background: accentMid, border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Icon size={13} style={{ color: "rgba(255,255,255,0.80)" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 sm:mb-2 text-[10px] sm:text-[inherit] leading-snug">
                        {isAr ? f.titleAr : f.title}
                      </h3>
                      <p className="leading-relaxed text-[9px] sm:text-[inherit]" style={{ color: "rgba(255,255,255,0.44)" }}>
                        {isAr ? f.descAr : f.desc}
                      </p>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ══ 5 · INDUSTRY USE CASES ═══════════════════════════════════════════ */}
      <SnapSection>
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col gap-4 sm:gap-10">
          <FadeUp className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>{t("Who Benefits", "من يستفيد")}</SectionBadge>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
              {t("ACROSS EVERY INDUSTRY.", "عبر كل القطاعات.")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.36)" }}>{t("BUILT FOR SAUDI BUSINESS.", "مبني للأعمال السعودية.")}</span>
            </h2>
            <GlowRule color={accentStrong} />
          </FadeUp>

          {/* 2-col on mobile so use-cases fit one screen */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {(data.useCases ?? []).map((uc, i) => (
              <FadeUp key={i} delay={0.07 * i}>
                <motion.div
                  className="rounded-xl sm:rounded-2xl border border-white/6 p-3 sm:p-6 flex flex-col gap-2 sm:gap-3 h-full"
                  style={{ background: "rgba(255,255,255,0.024)" }}
                  whileHover={{ background: "rgba(255,255,255,0.042)", y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentStrong }} />
                    <span className="font-semibold text-[10px] sm:text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
                      {isAr ? uc.sectorAr : uc.sector}
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                    {isAr ? uc.descAr : uc.desc}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ══ 6 · STATS + CTA ══════════════════════════════════════════════════ */}
      <SnapSection accent={accentFaint}>
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col items-center gap-14">
          {/* Stats row */}
          {data.stats && (
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
              {data.stats.map((s, i) => (
                <FadeUp key={i} delay={0.08 * i} className="flex flex-col items-center gap-2 text-center">
                  <motion.span
                    className="font-extrabold leading-none"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.92)" }}
                    initial={{ opacity: 0, scale: 0.72 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease }}
                  >
                    {s.value}
                  </motion.span>
                  <span className="text-[10px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.36)" }}>
                    {isAr ? s.labelAr : s.label}
                  </span>
                </FadeUp>
              ))}
            </div>
          )}

          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* CTA */}
          <FadeUp delay={0.1} className="flex flex-col items-center gap-6 text-center">
            <SectionBadge>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentStrong }} />
              {t("Start Your Project", "ابدأ مشروعك")}
            </SectionBadge>
            <h2
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", maxWidth: 600 }}
            >
              {t("Ready to Build", "هل أنت مستعد")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.40)" }}>{t("Something Exceptional?", "لبناء شيء استثنائي؟")}</span>
            </h2>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.46)", maxWidth: 460 }}>
              {t(
                "Let's discuss your project and build a tailored solution for your business.",
                "لنناقش مشروعك ونبني حلاً مخصصاً لعملك.",
              )}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 rounded-xl font-semibold text-[14px] bg-white text-black"
                  style={{ boxShadow: "0 0 32px rgba(255,255,255,0.15)" }}
                  whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 48px rgba(255,255,255,0.22)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {t("Contact Us Now", "تواصل معنا الآن")}
                </motion.button>
              </Link>
              <Link href={`/development/${categorySlug}`}>
                <motion.button
                  className="px-8 py-4 rounded-xl font-medium text-[14px] border border-white/14 text-white/60 hover:text-white hover:border-white/26 transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {t("Browse Services", "تصفح الخدمات")}
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </SnapSection>

      {/* ══ 7 · FOOTER ═══════════════════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
        <BackButton />
        <WhatsAppButton />
      </section>
    </div>
  );
}
