"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft,
  Globe, Smartphone, Bot, Users, Eye,
  Layers, BarChart3, Database, Zap, MessageSquare,
  Building2, Star, Cloud, Activity, Map, Settings,
  TrendingUp, Cpu, Shield, Network, MapPin, BedDouble, CheckCircle,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── helpers ──────────────────────────────────────────────────────────────── */
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
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, width: "clamp(80px, 14vw, 180px)" }}
    />
  );
}

function SnapSection({ children, id, accent }: { children: ReactNode; id?: string; accent?: string }) {
  return (
    <section
      id={id}
      className="relative flex flex-col items-center overflow-hidden pt-16 pb-4 sm:py-20"
      style={{
        height: "100dvh",
        scrollSnapAlign: "start",
        paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
        paddingRight: "clamp(1.5rem, 6vw, 5rem)",
      }}
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

/* ─── HERO PROPERTY CARDS MOCKUP ────────────────────────────────────────────── */
const PROPERTY_CARDS = [
  {
    label: "Luxury Villa",
    location: "Al Nakheel, Riyadh",
    beds: "5 BR",
    price: "SAR 4.2M",
    color: "rgba(96,165,250,0.22)",
    tag: "Featured",
  },
  {
    label: "Premium Apartment",
    location: "King Abdullah Financial District",
    beds: "3 BR",
    price: "SAR 1.8M",
    color: "rgba(167,139,250,0.20)",
    tag: "New Launch",
  },
  {
    label: "Commercial Tower",
    location: "Eastern Province, Dammam",
    beds: "Office Space",
    price: "SAR 12.5M",
    color: "rgba(52,211,153,0.18)",
    tag: "Exclusive",
  },
];

function PropertyCardsMockup() {
  return (
    <div className="relative flex flex-col gap-3 w-full max-w-[360px]">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-40px",
          background: "radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.12) 0%, transparent 70%)",
        }}
      />

      {PROPERTY_CARDS.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20, y: 10 * i }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.5 + i * 0.14, duration: 0.7, ease }}
          className="relative rounded-2xl border border-white/8 overflow-hidden"
          style={{
            background: "rgba(8,8,12,0.88)",
            backdropFilter: "blur(16px)",
            marginLeft: i * 10,
          }}
          whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.14)" }}
        >
          {/* Simulated property image */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ height: 80, background: `linear-gradient(135deg, ${card.color}, rgba(255,255,255,0.04))` }}
          >
            <Building2 size={28} style={{ color: "rgba(255,255,255,0.18)" }} />
            {/* Tag */}
            <span
              className="absolute top-2.5 left-3 text-[8px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {card.tag}
            </span>
            {/* 360 badge */}
            <span
              className="absolute top-2.5 right-3 text-[8px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: card.color, color: "rgba(255,255,255,0.9)" }}
            >
              360°
            </span>
          </div>

          {/* Card body */}
          <div className="flex items-center justify-between px-4 py-3 gap-3">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[12px] font-semibold leading-tight text-white/85 truncate">{card.label}</span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                <MapPin size={8} />
                {card.location}
              </span>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-[11px] font-semibold text-white/80">{card.price}</span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                <BedDouble size={8} />
                {card.beds}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Bottom "view all" pill */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/6 mt-1"
        style={{ background: "rgba(255,255,255,0.025)", cursor: "default" }}
      >
        <span className="text-[10px] tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.32)" }}>ALL SYSTEMS CONNECTED</span>
        <motion.span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "rgba(96,165,250,0.8)" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const SERVICE_PILLARS = [
  {
    icon: Globe, color: "rgba(96,165,250,0.18)", borderColor: "rgba(96,165,250,0.22)",
    titleEn: "Digital Presence",    titleAr: "الحضور الرقمي",
    descEn: "Luxury websites, listing platforms, investor portals, and interactive property maps built for the Saudi market.",
    descAr: "مواقع فاخرة ومنصات قوائم وبوابات مستثمرين وخرائط عقارية تفاعلية مبنية للسوق السعودي.",
    items: [["Luxury Real Estate Websites","مواقع فاخرة"], ["Listing Platforms","منصات القوائم"], ["Agent & Broker Portals","بوابات الوكلاء"], ["Interactive Maps","خرائط تفاعلية"]],
  },
  {
    icon: Eye, color: "rgba(167,139,250,0.18)", borderColor: "rgba(167,139,250,0.22)",
    titleEn: "Immersive & Mobile",  titleAr: "تجارب غامرة وموبايل",
    descEn: "360° virtual tours, 3D digital twins, mobile apps, and smart booking systems that convert buyers before site visits.",
    descAr: "جولات افتراضية 360° وتوائم رقمية ثلاثية الأبعاد وتطبيقات موبايل وأنظمة حجز ذكية تحول المشترين قبل الزيارة.",
    items: [["360° Virtual Tours","جولات 360°"], ["3D Digital Twins","توائم رقمية ثلاثية الأبعاد"], ["Mobile Applications","تطبيقات الموبايل"], ["Smart Booking","الحجز الذكي"]],
  },
  {
    icon: Bot, color: "rgba(52,211,153,0.18)", borderColor: "rgba(52,211,153,0.22)",
    titleEn: "AI & Intelligence",   titleAr: "الذكاء الاصطناعي",
    descEn: "AI chatbots, automated lead qualification, WhatsApp automation, and predictive analytics for modern real estate teams.",
    descAr: "روبوتات محادثة ذكية وتأهيل عملاء آلي وأتمتة واتساب وتحليلات تنبؤية لفرق العقارات الحديثة.",
    items: [["AI Chatbots","روبوتات المحادثة"], ["Lead Qualification","تأهيل العملاء"], ["WhatsApp Automation","أتمتة واتساب"], ["Smart Analytics","تحليلات ذكية"]],
  },
  {
    icon: Database, color: "rgba(251,146,60,0.18)", borderColor: "rgba(251,146,60,0.22)",
    titleEn: "Enterprise Systems",  titleAr: "الأنظمة المؤسسية",
    descEn: "CRM, ERP, admin dashboards, property management systems, and cloud infrastructure for enterprise real estate operations.",
    descAr: "CRM وERP ولوحات تحكم إدارية وأنظمة إدارة العقارات وبنية تحتية سحابية للعمليات المؤسسية.",
    items: [["CRM Integration","تكامل CRM"], ["ERP Systems","أنظمة ERP"], ["Admin Dashboards","لوحات التحكم"], ["Cloud Infrastructure","بنية سحابية"]],
  },
];

const ADMIN_FEATURES = [
  { icon: BarChart3,  en: "Real-Time Analytics",   ar: "تحليلات فورية" },
  { icon: TrendingUp, en: "Lead Tracking",          ar: "تتبع العملاء" },
  { icon: Users,      en: "CRM & Contacts",         ar: "CRM وجهات الاتصال" },
  { icon: Shield,     en: "Role Permissions",       ar: "صلاحيات الأدوار" },
  { icon: Zap,        en: "Automation Rules",       ar: "قواعد الأتمتة" },
  { icon: Cpu,        en: "AI Insights",            ar: "رؤى الذكاء الاصطناعي" },
  { icon: Activity,   en: "Sales Pipeline",         ar: "خط المبيعات" },
  { icon: Settings,   en: "System Config",          ar: "إعداد النظام" },
  { icon: Map,        en: "Property Mapping",       ar: "خرائط العقارات" },
  { icon: Cloud,      en: "Cloud Storage",          ar: "التخزين السحابي" },
  { icon: Network,    en: "API Integrations",       ar: "تكاملات API" },
  { icon: Star,       en: "Luxury UI Control",      ar: "التحكم بالتصميم" },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
export default function RealEstateEcosystemPage() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div
      className="relative bg-[#050505] text-white"
      style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      <style>{`::-webkit-scrollbar{display:none}`}</style>

      {/* ══ 1 · HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col lg:flex-row items-center justify-between overflow-hidden gap-12 lg:gap-20"
        style={{
          height: "100dvh",
          scrollSnapAlign: "start",
          padding: "96px clamp(1.5rem, 6vw, 5rem) 64px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 40%, rgba(96,165,250,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(167,139,250,0.06) 0%, transparent 55%)" }}
        />

        {/* Left */}
        <div className="relative z-10 flex-1 flex flex-col gap-6 max-w-2xl">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.5, ease }}>
            <Link href="/development/website">
              <motion.span
                className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer"
                style={{ color: "rgba(255,255,255,0.30)" }}
                whileHover={{ color: "rgba(255,255,255,0.72)" }}
              >
                <ChevronLeft size={11} />
                {t("Website Development", "تطوير المواقع")}
              </motion.span>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.38)", background: "rgba(255,255,255,0.04)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(96,165,250,0.8)" }} />
              {t("Real Estate Digital Ecosystem", "النظام البيئي الرقمي للعقارات")}
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease }}
            className="font-thin leading-tight"
            style={{ fontSize: "clamp(2rem, 4.8vw, 3.8rem)", letterSpacing: "0.1em" }}
          >
            {t("BUILD YOUR ENTIRE", "ابنِ نظامك الرقمي")}
            <br />
            <span style={{ color: "rgba(255,255,255,0.45)" }}>
              {t("REAL ESTATE ECOSYSTEM.", "العقاري الكامل.")}
            </span>
          </motion.h1>

          {/* Glow rule */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease }}
            className="h-px self-start"
            style={{ width: "clamp(60px, 10vw, 120px)", background: "linear-gradient(90deg, rgba(96,165,250,0.7), transparent)" }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.72, ease }}
            className="leading-relaxed text-sm"
            style={{ color: "rgba(255,255,255,0.46)", maxWidth: 500 }}
          >
            {t(
              "X360 is your complete real estate technology partner — luxury websites, mobile apps, AI, 360° virtual tours, 3D digital twins, and enterprise systems. All under one ecosystem.",
              "X360 هو شريكك التقني العقاري الكامل — مواقع فاخرة وتطبيقات موبايل وذكاء اصطناعي وجولات 360° وتوائم رقمية وأنظمة مؤسسية. كل ذلك تحت نظام بيئي واحد.",
            )}
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.6, ease }}
            className="flex flex-wrap gap-2"
          >
            {[
              { num: "30+", labelEn: "Services",       labelAr: "خدمة" },
              { num: "4",   labelEn: "Verticals",      labelAr: "قطاع" },
              { num: "360°",labelEn: "Virtual Tours",  labelAr: "جولات افتراضية" },
              { num: "1",   labelEn: "Ecosystem",      labelAr: "نظام بيئي" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 text-[11px]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <span className="font-semibold text-white/80">{s.num}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>{isAr ? s.labelAr : s.labelEn}</span>
              </div>
            ))}
          </motion.div>

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
                {t("Build Your Ecosystem", "ابنِ نظامك البيئي")}
              </motion.button>
            </Link>
            <Link href="/development/website">
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

        {/* Right: property cards mockup */}
        <div className="hidden lg:flex relative z-10 flex-1 items-center justify-center">
          <PropertyCardsMockup />
        </div>
      </section>

      {/* ══ 2 · SERVICE PILLARS ══════════════════════════════════════════════ */}
      <SnapSection accent="rgba(96,165,250,0.05)">
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col gap-4 sm:gap-10">
          <FadeUp className="flex flex-col items-center gap-2 sm:gap-4 text-center">
            <SectionBadge>{t("Complete Infrastructure", "بنية تحتية متكاملة")}</SectionBadge>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(0.9rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
              {t("EVERYTHING YOU NEED.", "كل ما تحتاجه.")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.40)" }}>{t("BUILT AS ONE SYSTEM.", "مبني كنظام واحد.")}</span>
            </h2>
            <GlowRule color="rgba(96,165,250,0.45)" />
          </FadeUp>

          {/* 2-col on mobile so all 4 pillars fit in one screen */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {SERVICE_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeUp key={i} delay={0.08 * i}>
                  <motion.div
                    className="rounded-xl sm:rounded-2xl border p-3 sm:p-6 flex flex-col gap-2 sm:gap-4 h-full"
                    style={{ background: "rgba(255,255,255,0.025)", borderColor: p.borderColor }}
                    whileHover={{ background: "rgba(255,255,255,0.042)", y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0" style={{ width: 30, height: 30, background: p.color, border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon size={13} style={{ color: "rgba(255,255,255,0.80)" }} />
                      </div>
                      <h3 className="font-semibold text-[10px] sm:text-[inherit] leading-snug">
                        {isAr ? p.titleAr : p.titleEn}
                      </h3>
                    </div>
                    <p className="hidden sm:block text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                      {isAr ? p.descAr : p.descEn}
                    </p>
                    <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 sm:gap-x-3 sm:gap-y-2">
                      {p.items.map(([en, ar], j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${p.borderColor}` }} />
                          <span className="text-[8px] sm:text-[11px]" style={{ color: "rgba(255,255,255,0.50)" }}>{isAr ? ar : en}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ══ 3 · IMMERSIVE EXPERIENCES ════════════════════════════════════════ */}
      <SnapSection accent="rgba(167,139,250,0.05)">
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col gap-4 sm:gap-10">
          <FadeUp className="flex flex-col items-center gap-2 sm:gap-4 text-center">
            <SectionBadge>{t("Immersive Technology", "التقنية الغامرة")}</SectionBadge>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(0.9rem, 3vw, 2.6rem)", letterSpacing: "0.1em" }}>
              {t("EXPERIENCE BEFORE", "جرّب العقار")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.40)" }}>{t("YOU VISIT.", "قبل الزيارة.")}</span>
            </h2>
            <GlowRule color="rgba(167,139,250,0.45)" />
          </FadeUp>

          {/* Featured card + two secondary */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Large featured: 360° Tours */}
            <FadeUp delay={0.06}>
              <motion.div
                className="rounded-xl sm:rounded-2xl border border-white/8 p-4 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
                style={{ background: "rgba(167,139,250,0.06)" }}
                whileHover={{ background: "rgba(167,139,250,0.10)", y: -2 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center justify-center rounded-xl sm:rounded-2xl flex-shrink-0" style={{ width: 44, height: 44, background: "rgba(167,139,250,0.22)", border: "1px solid rgba(167,139,250,0.30)" }}>
                  <Eye size={20} style={{ color: "rgba(255,255,255,0.82)" }} />
                </div>
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white/90" style={{ fontSize: "clamp(1rem, 1.6vw, 1.18rem)" }}>
                      {t("360° Virtual Tours", "جولات افتراضية 360°")}
                    </h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider" style={{ background: "rgba(167,139,250,0.25)", color: "rgba(255,255,255,0.72)" }}>FLAGSHIP</span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.44)" }}>
                    {t(
                      "Photorealistic virtual property tours that let buyers explore every corner remotely. Interactive, HD-rendered, and enterprise-ready for luxury developments.",
                      "جولات عقارية افتراضية فائقة الواقعية تتيح للمشترين استكشاف كل زاوية عن بُعد. تفاعلية وعالية الدقة وجاهزة للمؤسسات.",
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[t("Interactive Navigation","تنقل تفاعلي"), t("HD Rendering","عرض عالي الدقة"), t("Mobile Compatible","متوافق موبايل"), t("Branded Experience","تجربة مخصصة")].map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-[9.5px]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.40)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Two secondary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Layers, color: "rgba(45,212,191,0.20)",
                  titleEn: "3D Digital Twins",       titleAr: "توائم رقمية ثلاثية الأبعاد",
                  descEn: "Precise digital replicas — track construction progress, visualise floor plans, and deliver luxury investor presentations at scale.",
                  descAr: "نسخ رقمية دقيقة — تتبع البناء وتصور المخططات وقدم عروض مستثمرين فاخرة.",
                  tags: [t("BIM Integration","تكامل BIM"), t("Construction Monitoring","مراقبة البناء"), t("Investor Presentations","عروض المستثمرين")],
                },
                {
                  icon: Bot,    color: "rgba(96,165,250,0.20)",
                  titleEn: "AI Property Discovery",  titleAr: "اكتشاف العقارات بالذكاء الاصطناعي",
                  descEn: "Intelligent search, AI lead qualification, and smart recommendation engines that match buyers to their perfect property automatically.",
                  descAr: "بحث ذكي وتأهيل عملاء ومحركات توصيات تطابق المشترين مع عقاراتهم المثالية تلقائياً.",
                  tags: [t("Smart Search","بحث ذكي"), t("Lead Scoring","تقييم العملاء"), t("AI Recommendations","توصيات ذكية")],
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <FadeUp key={i} delay={0.12 + i * 0.08}>
                    <motion.div
                      className="rounded-2xl border border-white/8 p-6 flex flex-col gap-4 h-full"
                      style={{ background: "rgba(255,255,255,0.028)" }}
                      whileHover={{ background: "rgba(255,255,255,0.045)", y: -2 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="flex items-center justify-center rounded-2xl self-start" style={{ width: 52, height: 52, background: card.color, border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon size={21} style={{ color: "rgba(255,255,255,0.80)" }} />
                      </div>
                      <h3 className="font-semibold" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>
                        {isAr ? card.titleAr : card.titleEn}
                      </h3>
                      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.44)" }}>
                        {isAr ? card.descAr : card.descEn}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {card.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-full text-[9.5px]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.38)" }}>{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </SnapSection>

      {/* ══ 4 · ENTERPRISE BACKEND ═══════════════════════════════════════════ */}
      <SnapSection accent="rgba(251,146,60,0.05)">
        <div className="relative z-10 w-full max-w-[1060px] flex flex-col lg:flex-row items-start gap-6 sm:gap-14 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-6 lg:max-w-[380px] flex-shrink-0">
            <FadeUp>
              <SectionBadge>{t("Enterprise Backend", "الواجهة الخلفية المؤسسية")}</SectionBadge>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", letterSpacing: "0.1em" }}>
                {t("POWERFUL SYSTEMS", "أنظمة قوية")}
                <br />
                <span style={{ color: "rgba(255,255,255,0.40)" }}>{t("BEHIND EVERY SCREEN.", "خلف كل شاشة.")}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div className="h-px" style={{ width: "clamp(60px, 10vw, 100px)", background: "linear-gradient(90deg, rgba(251,146,60,0.7), transparent)" }} />
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.44)" }}>
                {t(
                  "Every solution includes a powerful enterprise backend — real-time analytics, full CRM, AI insights, automation rules, and role-based access control. Built for real estate enterprises, not just websites.",
                  "كل حل يتضمن خلفية مؤسسية قوية — تحليلات فورية وCRM كامل ورؤى ذكاء اصطناعي وقواعد أتمتة والتحكم القائم على الأدوار.",
                )}
              </p>
            </FadeUp>

            {/* Key highlights */}
            <FadeUp delay={0.22}>
              <div className="flex flex-col gap-3">
                {[
                  t("End-to-end ownership of your data",           "ملكية كاملة لبياناتك"),
                  t("SAMA & NCA compliance built in",              "امتثال SAMA وNCA مدمج"),
                  t("Arabic-first UI with full RTL support",       "واجهة عربية أولاً مع دعم RTL كامل"),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12px]" style={{ color: "rgba(255,255,255,0.60)" }}>
                    <CheckCircle size={13} style={{ color: "rgba(251,146,60,0.8)", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.28}>
              <Link href="/contact">
                <motion.button
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[13px] bg-white text-black mt-1"
                  style={{ boxShadow: "0 0 22px rgba(255,255,255,0.12)" }}
                  whileHover={{ scale: 1.03, y: -1, boxShadow: "0 0 36px rgba(255,255,255,0.20)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {t("Start Your Project", "ابدأ مشروعك")}
                  <ArrowRight size={13} />
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          {/* Right: feature grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ADMIN_FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeUp key={i} delay={0.06 + i * 0.04}>
                  <motion.div
                    className="rounded-xl border border-white/6 p-4 flex items-center gap-3"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                    whileHover={{ borderColor: "rgba(251,146,60,0.28)", background: "rgba(255,255,255,0.042)" }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 32, height: 32, background: "rgba(251,146,60,0.14)" }}>
                      <Icon size={14} style={{ color: "rgba(255,255,255,0.68)" }} />
                    </div>
                    <span className="text-[11px] font-medium leading-tight" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {isAr ? feat.ar : feat.en}
                    </span>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ══ 5 · CTA ══════════════════════════════════════════════════════════ */}
      <SnapSection accent="rgba(96,165,250,0.06)">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-[680px]">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-white/38">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(96,165,250,0.8)" }} />
              {t("Your Transformation Starts Here", "تحولك يبدأ هنا")}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", letterSpacing: "0.1em" }}>
              {t("READY TO BUILD YOUR", "هل أنت مستعد")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.42)" }}>
                {t("REAL ESTATE ECOSYSTEM?", "لبناء نظامك العقاري؟")}
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="h-px" style={{ width: "clamp(80px, 14vw, 180px)", background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.55), transparent)" }} />
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", maxWidth: 520 }}>
              {t(
                "From a single luxury website to a complete digital real estate empire — X360 builds the full ecosystem your business deserves.",
                "من موقع فاخر واحد إلى إمبراطورية عقارية رقمية كاملة — X360 يبني النظام البيئي الكامل الذي يستحقه عملك.",
              )}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-9 py-4 rounded-xl font-semibold text-[14px] bg-white text-black"
                  style={{ boxShadow: "0 0 36px rgba(255,255,255,0.16)" }}
                  whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 52px rgba(255,255,255,0.24)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {t("Start Your Ecosystem", "ابدأ نظامك البيئي")}
                </motion.button>
              </Link>
              <Link href="/development/website">
                <motion.button
                  className="px-9 py-4 rounded-xl font-medium text-[14px] border border-white/14 text-white/55 hover:text-white hover:border-white/25 transition-all flex items-center gap-2"
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

      {/* ══ Footer ════════════════════════════════════════════════════════════ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
        <WhatsAppButton />
      </section>
    </div>
  );
}
