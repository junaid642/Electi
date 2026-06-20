"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Bot, Database, ArrowRight, Zap, Users, BarChart3, Shield, Code2, Cpu, ShoppingCart, Settings, Activity, MessageSquare, Layers } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

/* ═══ DATA ════════════════════════════════════════════════════════════════ */
const SLUG_TO_PAGE: Record<string, string> = {
  "website-development": "/development/website",
  "mobile-applications":  "/development/website",
  "ai-solutions":         "/development/ai-solutions",
  "erp-sap":              "/development/erp-sap",
};

const TABS = [
  {
    slug: "website-development",
    icon: Globe,
    color: "#6BA3D6",
    label:    "Website Development",  labelAr: "تطوير المواقع",
    tags:     ["Real Estate", "Hospitality", "Corporate", "Commerce"],
    tagsAr:   ["العقارات", "الضيافة", "المؤسسات", "التجارة"],
    heading:  "Digital Presence",
    headingAr:"الحضور\nالرقمي",
    problem:  "Build immersive, conversion-optimised websites crafted for luxury brands and enterprise growth.",
    problemAr:"أنشئ مواقع غامرة محسّنة للتحويل مصممة للعلامات التجارية الفاخرة والنمو المؤسسي.",
    metrics:  ["Luxury UI/UX Design", "SEO-Optimised Architecture", "Enterprise Performance"],
    metricsAr:["تصميم UI/UX فاخر", "بنية محسّنة لـ SEO", "أداء مؤسسي"],
    vizIcons: [Code2, Globe, ShoppingCart, Shield],
  },
  {
    slug: "mobile-applications",
    icon: Smartphone,
    color: "#52D39B",
    label:    "Mobile Applications",  labelAr: "تطبيقات الموبايل",
    tags:     ["Business Apps", "E-Commerce", "Booking", "AI-Powered"],
    tagsAr:   ["تطبيقات الأعمال", "التجارة الإلكترونية", "الحجوزات", "مدعوم بالذكاء"],
    heading:  "Mobile Ecosystems",
    headingAr:"أنظمة\nالموبايل",
    problem:  "Cross-platform mobile applications built for engagement, scalability, and business intelligence.",
    problemAr:"تطبيقات موبايل متعددة المنصات مبنية للمشاركة والتوسع وذكاء الأعمال.",
    metrics:  ["iOS & Android Native", "Real-Time Synchronisation", "AI-Powered Features"],
    metricsAr:["iOS وAndroid أصلي", "مزامنة في الوقت الفعلي", "مميزات مدعومة بالذكاء الاصطناعي"],
    vizIcons: [Smartphone, ShoppingCart, Users, Bot],
  },
  {
    slug: "ai-solutions",
    icon: Bot,
    color: "#9B8FC4",
    label:    "AI Solutions",         labelAr: "حلول الذكاء الاصطناعي",
    tags:     ["Automation", "Chatbots", "Analytics", "Custom AI"],
    tagsAr:   ["الأتمتة", "روبوتات المحادثة", "التحليلات", "ذكاء اصطناعي مخصص"],
    heading:  "Intelligent Systems",
    headingAr:"الأنظمة\nالذكية",
    problem:  "Custom AI agents, workflow automation, and predictive analytics — transforming how Saudi businesses operate.",
    problemAr:"وكلاء ذكاء اصطناعي مخصصون وأتمتة سير العمل والتحليلات التنبؤية — لتحويل عمليات الشركات السعودية.",
    metrics:  ["Custom AI Agents", "Workflow Automation", "Predictive Analytics"],
    metricsAr:["وكلاء ذكاء اصطناعي مخصصون", "أتمتة سير العمل", "تحليلات تنبؤية"],
    vizIcons: [Bot, Zap, MessageSquare, BarChart3],
  },
  {
    slug: "erp-sap",
    icon: Database,
    color: "#D4916A",
    label:    "ERP & SAP Systems",    labelAr: "أنظمة ERP وSAP",
    tags:     ["ERP Solutions", "SAP Integration", "Workflow", "Enterprise"],
    tagsAr:   ["حلول ERP", "تكامل SAP", "سير العمل", "المؤسسات"],
    heading:  "Enterprise Systems",
    headingAr:"الأنظمة\nالمؤسسية",
    problem:  "ERP implementation, SAP consulting, and enterprise automation — built for Saudi Vision 2030 compliance.",
    problemAr:"تطبيق ERP واستشارات SAP وأتمتة المؤسسات — مبنية لتوافق رؤية السعودية 2030.",
    metrics:  ["SAP Certified Integration", "Vision 2030 Compliance", "Full ERP Lifecycle"],
    metricsAr:["تكامل SAP معتمد", "توافق رؤية 2030", "دورة حياة ERP كاملة"],
    vizIcons: [Database, Settings, Activity, Layers],
  },
] as const;

type Tab = typeof TABS[number];

/* ═══ CATEGORY VISUAL FRAME ══════════════════════════════════════════════ */
function CategoryFrame({ tab }: { tab: Tab }) {
  const icons = tab.vizIcons;
  const positions = [
    { top: "18%",  left: "22%"  },
    { top: "18%",  right: "22%" },
    { bottom: "18%", left: "22%" },
    { bottom: "18%", right: "22%" },
  ];

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Soft ambient glow */}
      <motion.div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        animate={{ opacity: [0.25, 0.48, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${tab.color}25 0%, transparent 70%)` }}
      />

      {/* Main frame — fixed height, same as VideoFrame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.slug}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease }}
          className="relative flex items-center justify-center"
          style={{ height: 560, width: "100%" }}
        >
          {/* Outer ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 420, height: 420,
              border: `1px solid ${tab.color}22`,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 260, height: 260,
              border: `1px solid ${tab.color}18`,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Center icon */}
          <motion.div
            className="absolute flex items-center justify-center rounded-full z-10"
            style={{
              width: 100, height: 100,
              background: `${tab.color}16`,
              border: `1.5px solid ${tab.color}44`,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ boxShadow: [`0 0 0px ${tab.color}00`, `0 0 40px ${tab.color}40`, `0 0 0px ${tab.color}00`] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {(() => { const Icon = tab.icon; return <Icon size={38} style={{ color: tab.color }} />; })()}
          </motion.div>

          {/* Corner icons */}
          {icons.map((IconEl, i) => {
            const pos = positions[i];
            return (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center rounded-2xl z-10"
                style={{
                  width: 54, height: 54,
                  background: "rgba(255,255,255,0.035)",
                  border: `1px solid ${tab.color}28`,
                  ...pos,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 * i, duration: 0.45, ease }}
              >
                <IconEl size={20} style={{ color: `${tab.color}CC` }} />
              </motion.div>
            );
          })}

          {/* Connecting lines (from center to each corner icon) */}
          {[0, 1, 2, 3].map(i => {
            const lineAngles = [-45, 45, -135, 135];
            return (
              <motion.div
                key={`line-${i}`}
                className="absolute pointer-events-none"
                style={{
                  width: 130,
                  height: 1,
                  background: `linear-gradient(90deg, ${tab.color}40, ${tab.color}10)`,
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 50%",
                  transform: `rotate(${lineAngles[i]}deg)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + 0.06 * i, duration: 0.5, ease }}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══ RIGHT TAB NAV ══════════════════════════════════════════════════════ */
function SideNav({ active, isAr, onSelect }: { active: number; isAr: boolean; onSelect: (i: number) => void }) {
  return (
    <div className="hidden lg:flex flex-col justify-center gap-1">
      {TABS.map((tab, i) => {
        const Icon = tab.icon;
        const isActive = i === active;
        return (
          <motion.button
            key={tab.slug}
            onClick={() => onSelect(i)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-start w-full"
            animate={{ background: isActive ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0)" }}
            whileHover={{ background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="flex-shrink-0 rounded-full"
              animate={{
                width: isActive ? 3 : 1,
                height: isActive ? 32 : 14,
                background: isActive ? tab.color : "rgba(255,255,255,0.12)",
              }}
              transition={{ duration: 0.35, ease }}
            />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <Icon size={10} style={{ color: isActive ? tab.color : "rgba(255,255,255,0.22)" }} />
                <span
                  className="text-[11px] font-semibold leading-tight"
                  style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)" }}
                >
                  {isAr ? tab.labelAr : tab.label}
                </span>
              </div>
              {isActive && (
                <motion.div
                  className="h-px rounded-full"
                  initial={{ width: 0 }} animate={{ width: 24 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: tab.color }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ═══ LEFT TEXT PANEL ════════════════════════════════════════════════════ */
function TextPanel({ tab, isAr }: { tab: Tab; isAr: boolean }) {
  const Icon = tab.icon;
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={tab.slug}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease }}
        className={`flex flex-col gap-5 ${isAr ? "items-end text-right" : "items-start text-left"}`}
      >
        {/* Icon + label */}
        <div className="flex items-center gap-2">
          <Icon style={{ width: 13, height: 13, color: tab.color, flexShrink: 0 }} />
          <span className="text-[9px] font-semibold tracking-[0.22em] uppercase" style={{ color: tab.color }}>
            {isAr ? tab.labelAr : tab.label}
          </span>
        </div>

        {/* Heading */}
        <h3
          className="font-thin leading-[1.08]"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)", letterSpacing: "0.1em" }}
        >
          {(isAr ? tab.headingAr : tab.heading).split("\n").map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </h3>

        {/* Tags */}
        <div
          className={`flex flex-nowrap gap-1.5 ${isAr ? "justify-end" : ""}`}
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
        >
          {(isAr ? tab.tagsAr : tab.tags).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide flex-shrink-0 whitespace-nowrap"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.72)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{
            width: "clamp(48px, 8vw, 120px)",
            background: `linear-gradient(${isAr ? "270deg" : "90deg"}, ${tab.color}, transparent)`,
          }}
        />

        {/* Problem */}
        <p className="text-sm leading-relaxed max-w-[300px]" style={{ color: "rgba(255,255,255,0.38)", fontStyle: "italic" }}>
          {isAr ? tab.problemAr : tab.problem}
        </p>

        {/* Metrics */}
        <ul className={`flex flex-col gap-2 ${isAr ? "items-end" : ""}`}>
          {(isAr ? tab.metricsAr : tab.metrics).map((m: string) => (
            <li
              key={m}
              className={`flex items-center gap-2 text-[11px] font-medium ${isAr ? "flex-row-reverse" : ""}`}
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: tab.color }} />
              {m}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-1">
          <Link href={SLUG_TO_PAGE[tab.slug] ?? "/development"}>
            <motion.button
              className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
              style={{ background: "#ffffff" }}
              animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.15)", "0 0 22px 6px rgba(255,255,255,0.35)", "0 0 10px 2px rgba(255,255,255,0.15)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 36px 10px rgba(255,255,255,0.45)" }}
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)" }}
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {isAr ? "استكشف" : "Explore"}
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══ MOBILE VERSION ══════════════════════════════════════════════════════ */
function WebAIShowcaseMobile() {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#000" }}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse at 50% 20%, ${tab.color}10 0%, transparent 60%)` }}
        transition={{ duration: 0.9 }}
      />

      {/* Tab strip */}
      <div className="flex gap-1.5 px-4 pt-6 pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const isActive = i === active;
          return (
            <motion.button
              key={t.slug}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0 text-[10px] font-semibold"
              animate={{
                background: isActive ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)",
                borderColor: isActive ? `${t.color}40` : "rgba(255,255,255,0.07)",
                color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
              }}
              style={{ border: "1px solid" }}
              whileTap={{ scale: 0.94 }}
            >
              <Icon style={{ width: 10, height: 10, color: isActive ? t.color : "inherit" }} />
              {isAr ? t.labelAr : t.label}
            </motion.button>
          );
        })}
      </div>

      {/* Visual */}
      <div className="px-4 py-4">
        <CategoryFrame tab={tab} />
      </div>

      {/* Text */}
      <div className="px-5 pt-2 pb-10">
        <TextPanel tab={tab} isAr={isAr} />
      </div>
    </div>
  );
}

/* ═══ DESKTOP MAIN ════════════════════════════════════════════════════════ */
export default function WebAIShowcase({
  desktop = true,
  controlledActive,
}: {
  desktop?: boolean;
  controlledActive?: number;
}) {
  const { isAr } = useLang();
  const [active, setActive] = useState(controlledActive ?? 0);
  const activeRef = useRef(controlledActive ?? 0);

  useEffect(() => {
    if (controlledActive === undefined) return;
    activeRef.current = controlledActive;
    setActive(controlledActive);
  }, [controlledActive]);

  useEffect(() => { activeRef.current = active; }, [active]);

  if (!desktop) return <WebAIShowcaseMobile />;

  const tab = TABS[active];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 60% 50%, ${tab.color}08 0%, transparent 60%)` }}
          transition={{ duration: 1.0 }}
        />
      </div>

      <div className="max-w-[1300px] mx-auto w-full px-8 lg:px-12">
        <div className="grid grid-cols-[1fr_2.2fr_auto] gap-5 lg:gap-7 items-center">
          <TextPanel tab={tab} isAr={isAr} />
          <CategoryFrame tab={tab} />
          <SideNav
            active={active}
            isAr={isAr}
            onSelect={(i) => {
              activeRef.current = i;
              setActive(i);
            }}
          />
        </div>
      </div>
    </div>
  );
}
