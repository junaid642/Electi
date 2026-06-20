"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Code2, Zap, Globe, Shield, Layers, Activity,
  ShoppingCart, BarChart3, Bot, MessageSquare, Smartphone,
  Bell, Cpu, Database, Users, Eye, Lock, Cloud,
  TrendingUp, Award, ChevronLeft,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { WebAIServiceData } from "@/data/webai-categories";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Code2, Zap, Globe, Shield, Layers, Activity, ShoppingCart, BarChart3,
  Bot, MessageSquare, Smartphone, Bell, Cpu, Database, Users, Eye,
  Lock, Cloud, TrendingUp, Award,
};

function InViewSection({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

function GlowRule() {
  return (
    <motion.div
      variants={fadeUp}
      className="h-px mx-auto"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        width: "clamp(80px, 16vw, 200px)",
      }}
    />
  );
}

interface Props {
  data: WebAIServiceData;
  categoryName: string;
  categoryNameAr: string;
  categorySlug: string;
}

export default function WebAIServicePage({ data, categoryName, categoryNameAr, categorySlug }: Props) {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div
      className="relative bg-[#050505] text-white"
      style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>

      {/* ══ 1 · HERO ══ */}
      <section
        className="relative flex flex-col lg:flex-row items-center justify-between overflow-hidden gap-10 lg:gap-16"
        style={{
          minHeight: "100dvh",
          scrollSnapAlign: "start",
          paddingTop: 96,
          paddingBottom: 64,
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(ellipse at 30% 40%, ${data.accentColor}, transparent 60%)`,
          }}
        />

        {/* Left: text */}
        <div className="relative z-10 flex-1 flex flex-col items-start text-start max-w-2xl">
          {/* Breadcrumb back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease }}
            className="mb-5"
          >
            <Link href={`/development/${categorySlug}`}>
              <motion.span
                className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer"
                style={{ color: "rgba(255,255,255,0.32)" }}
                whileHover={{ color: "rgba(255,255,255,0.75)" }}
                transition={{ duration: 0.16 }}
              >
                <ChevronLeft size={11} />
                {isAr ? categoryNameAr : categoryName}
              </motion.span>
            </Link>
          </motion.div>

          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-medium mb-6"
              style={{ color: "rgba(255,255,255,0.40)", background: "rgba(255,255,255,0.04)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/45 animate-pulse" />
              {isAr ? data.hero.labelAr : data.hero.label}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.8, ease }}
            className="font-extrabold leading-[1.07] mb-6"
            style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            {(isAr ? data.hero.headlineAr : data.hero.headline).split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span style={{ color: "rgba(255,255,255,0.48)" }}>{line}</span> : line}
              </span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.72, ease }}
            className="leading-[1.74] mb-9"
            style={{ fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)", color: "rgba(255,255,255,0.50)", maxWidth: 500 }}
          >
            {isAr ? data.hero.subAr : data.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.65, ease }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/contact">
              <motion.button
                className="px-7 py-3.5 rounded-xl font-semibold text-[13px] bg-white text-black"
                style={{ boxShadow: "0 0 26px rgba(255,255,255,0.13)" }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("Get Started", "ابدأ الآن")}
              </motion.button>
            </Link>
            <Link href={`/development/${categorySlug}`}>
              <motion.button
                className="px-7 py-3.5 rounded-xl font-medium text-[13px] border border-white/12 text-white/65 hover:text-white hover:border-white/24 transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("View All Services", "عرض جميع الخدمات")}
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right: decorative card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.48, duration: 1.0, ease }}
          className="relative z-10 w-full lg:flex-1 max-w-[400px] hidden lg:flex items-center justify-center"
        >
          <div
            className="w-full rounded-2xl border border-white/10 p-8 flex flex-col items-center gap-5"
            style={{ background: "rgba(6,6,10,0.92)" }}
          >
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{ width: 72, height: 72, background: data.accentColor, border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <Code2 size={30} style={{ color: "rgba(255,255,255,0.70)" }} />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.32)" }}>
                {isAr ? categoryNameAr : categoryName}
              </p>
              <p className="text-[16px] font-semibold leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
                {isAr ? data.nameAr : data.name}
              </p>
            </div>
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="flex flex-col gap-2.5 w-full">
              {data.features.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.35)" }} />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {isAr ? f.titleAr : f.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ 2 · FEATURES ══ */}
      {/* pt-16 clears fixed navbar on mobile; no justify-center so heading starts below nav */}
      <section
        className="relative flex flex-col items-center px-4 sm:px-12 lg:px-20 pt-16 pb-4 sm:py-20"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.018) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 w-full" style={{ maxWidth: 1060 }}>
          <InViewSection className="flex flex-col items-center gap-2 sm:gap-3 text-center mb-5 sm:mb-14">
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.40)" }}
              >
                {t("Core Capabilities", "القدرات الأساسية")}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-thin tracking-[0.1em] uppercase"
              style={{ fontSize: "clamp(0.9rem, 2.6vw, 2rem)" }}
            >
              {t("What We Deliver", "ما نقدمه")}
            </motion.h2>
            <GlowRule />
          </InViewSection>

          {/* 2-col on mobile so all feature cards fit in one screen */}
          <InViewSection className="grid grid-cols-2 gap-2.5 sm:gap-5">
            {data.features.map((feature, i) => {
              const Icon = ICON_MAP[feature.iconKey] ?? Code2;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-xl sm:rounded-2xl p-3 sm:p-7 flex flex-col gap-2 sm:gap-4 border border-white/6"
                  style={{ background: "rgba(255,255,255,0.032)" }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.055)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                    style={{ width: 32, height: 32, background: data.accentColor, border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon size={14} style={{ color: "rgba(255,255,255,0.70)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-[10px] sm:text-[inherit] leading-snug" style={{ fontSize: undefined }}>
                      {isAr ? feature.titleAr : feature.title}
                    </h3>
                    <p className="leading-relaxed text-[9px] sm:text-[inherit]" style={{ fontSize: undefined, color: "rgba(255,255,255,0.46)" }}>
                      {isAr ? feature.descAr : feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </InViewSection>
        </div>
      </section>

      {/* ══ 3 · CTA ══ */}
      <section
        className="relative flex flex-col items-center justify-center px-6"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }}
        />
        <InViewSection className="relative z-10 flex flex-col items-center gap-6 text-center" style={{ maxWidth: 680 }}>
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.38)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              {t("Start Your Project", "ابدأ مشروعك")}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-extrabold leading-[1.08]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
          >
            {t("Ready to Build\n", "هل أنت مستعد\n")}
            <span style={{ color: "rgba(255,255,255,0.45)" }}>{t("Something Exceptional?", "لبناء شيء استثنائي؟")}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="leading-[1.75]" style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "rgba(255,255,255,0.48)" }}>
            {t(
              "Let's discuss your project and build a tailored solution for your business.",
              "لنناقش مشروعك ونبني حلاً مخصصاً لعملك.",
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-xl font-semibold text-[14px] bg-white text-black"
                style={{ boxShadow: "0 0 32px rgba(255,255,255,0.15)" }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("Contact Us Now", "تواصل معنا الآن")}
              </motion.button>
            </Link>
            <Link href={`/development/${categorySlug}`}>
              <motion.button
                className="px-8 py-4 rounded-xl font-medium text-[14px] border border-white/14 text-white/65 hover:text-white hover:border-white/25 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t("Browse Services", "تصفح الخدمات")}
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </InViewSection>
      </section>

      {/* ══ Footer ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
        <BackButton />
        <WhatsAppButton />
      </section>
    </div>
  );
}
