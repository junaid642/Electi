"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Building2, UtensilsCrossed, LayoutGrid, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import NeonButton from "@/components/ui/NeonButton";

const ease = [0.22, 1, 0.36, 1] as const;

/* ═══ DATA ════════════════════════════════════════════════════════════════ */
const SLUG_TO_PAGE: Record<string, string> = {
  "luxury":      "/virtual-tours/luxury-private",
  "real-estate": "/virtual-tours/real-estate",
  "hospitality": "/virtual-tours/hospitality",
  "others":      "/virtual-tours/others",
};

const TABS = [
  {
    slug: "luxury",
    icon: Crown,
    color: "#C9A84C",
    label: "Private Luxury",      labelAr: "الفاخرة والخاصة",
    tags:  ["Aircraft", "Yacht", "Motorsport", "Luxury Villas"],
    tagsAr: ["الطيران الخاص", "اليخوت", "سيارات السباق", "الفلل الفاخرة"],
    heading:  "Luxury Tours",
    headingAr: "حضور فاخر\nعالمي",
    problem:  "Showcase luxury assets globally without requiring physical visits.",
    problemAr: "اعرض أصولك الفاخرة عالمياً دون الحاجة لزيارات ميدانية.",
    metrics:  ["Higher Buyer Engagement", "Faster Premium Inquiry Conversion"],
    metricsAr: ["تفاعل أعلى من المشترين", "تحويل أسرع للاستفسارات الفاخرة"],
  },
  {
    slug: "real-estate",
    icon: Building2,
    color: "#6BA3D6",
    label: "Real Estate",         labelAr: "العقارات",
    tags:  ["Developers", "Agents", "Co-working", "Commercial"],
    tagsAr: ["المطورون", "الوكلاء", "مشاركة المكاتب", "التجاري"],
    heading:  "Villa Tours",
    headingAr: "جولات عقارية\nعن بُعد",
    problem:  "Help buyers experience properties remotely before site visits.",
    problemAr: "ساعد المشترين على تجربة العقارات عن بُعد قبل الزيارة الميدانية.",
    metrics:  ["Faster Buyer Decisions", "Reduced Physical Showings", "Better International Reach"],
    metricsAr: ["قرارات شراء أسرع", "تقليل المعارض الميدانية", "وصول دولي أفضل"],
  },
  {
    slug: "hospitality",
    icon: UtensilsCrossed,
    color: "#D4916A",
    label: "Hospitality",         labelAr: "الضيافة",
    tags:  ["Hotels", "Resorts", "Cafes", "Restaurants"],
    tagsAr: ["الفنادق", "المنتجعات", "المقاهي", "المطاعم"],
    heading:  "Digital Booking",
    headingAr: "استمتع بالتجربة\nقبل الحجز",
    problem:  "Allow guests to experience spaces before booking.",
    problemAr: "امنح ضيوفك تجربة المكان قبل الحجز.",
    metrics:  ["Increased Booking Confidence", "Stronger Online Presence", "Higher Guest Engagement"],
    metricsAr: ["ثقة حجز أعلى", "حضور رقمي أقوى", "تفاعل ضيوف أكبر"],
  },
  {
    slug: "others",
    icon: LayoutGrid,
    color: "#9B8FC4",
    label: "Others",              labelAr: "قطاعات أخرى",
    tags:  ["Retail", "Showrooms", "Schools", "Hospitals", "Gyms"],
    tagsAr: ["التجزئة", "صالات العرض", "المدارس", "المستشفيات", "الصالات الرياضية"],
    heading:  "Digital Spaces",
    headingAr: "فضاءات رقمية\nغامرة",
    problem:  "Digitally present physical spaces with immersive accessibility.",
    problemAr: "قدّم فضاءاتك الفيزيائية رقمياً بتجربة غامرة وسهلة الوصول.",
    metrics:  ["Better Customer Engagement", "Stronger Digital Visibility"],
    metricsAr: ["تفاعل أفضل مع العملاء", "ظهور رقمي أقوى"],
  },
] as const;

type Tab = typeof TABS[number];

/* ═══ VIDEO FRAME ═════════════════════════════════════════════════════════ */
function VideoFrame({ tab }: { tab: Tab }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play();
  }, [tab.slug]);

  return (
    <div className="relative w-full">
      {/* Soft ambient glow */}
      <motion.div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${tab.color}20 0%, transparent 70%)` }}
      />

      {/* Video — fixed width+height container so all tabs render identically */}
      <div className="relative overflow-hidden mx-auto" style={{ width: 400, height: 524, borderRadius: "4%" }}>
        <AnimatePresence>
          <motion.div
            key={tab.slug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <video
              ref={videoRef}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover block"
              style={{ filter: "brightness(0.88) contrast(1.05)" }}
            >
              <source src={`/x360/industries/${tab.slug}.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>
      </div>
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
            {/* Active indicator line */}
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
              <span
                className="text-[11px] font-semibold leading-tight"
                style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)" }}
              >
                {isAr ? tab.labelAr : tab.label}
              </span>
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
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: tab.color }}
          >
            {isAr ? tab.labelAr : tab.label}
          </span>
        </div>

        {/* Heading */}
        <h3
          className="font-thin leading-[1.08]"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)", letterSpacing: "0.1em" }}
        >
          {isAr ? tab.headingAr : tab.heading}
        </h3>

        {/* Category tags — below heading */}
        <div
          className={`flex flex-nowrap gap-1.5 ${isAr ? "justify-end" : ""}`}
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
        >
          {(isAr ? tab.tagsAr : tab.tags).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide flex-shrink-0 whitespace-nowrap"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.72)",
              }}
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

        {/* Problem statement */}
        <p
          className="text-sm leading-relaxed max-w-[300px]"
          style={{ color: "rgba(255,255,255,0.38)", fontStyle: "italic" }}
        >
          {isAr ? tab.problemAr : tab.problem}
        </p>

        {/* Metrics — minimal dot list */}
        <ul className={`flex flex-col gap-2 ${isAr ? "items-end" : ""}`}>
          {(isAr ? tab.metricsAr : tab.metrics).map((m: string) => (
            <li
              key={m}
              className={`flex items-center gap-2 text-[11px] font-medium ${isAr ? "flex-row-reverse" : ""}`}
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: tab.color }}
              />
              {m}
            </li>
          ))}
        </ul>

        {/* Single CTA */}
        <div className="mt-1">
          <Link href={SLUG_TO_PAGE[tab.slug] ?? "/contact"}>
            <motion.button
              className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
              style={{ background: "#ffffff" }}
              animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.15)", "0 0 22px 6px rgba(255,255,255,0.35)", "0 0 10px 2px rgba(255,255,255,0.15)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 36px 10px rgba(255,255,255,0.45)" }}
              whileTap={{ scale: 0.96 }}
            >
              {/* shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)" }}
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {isAr ? "تعلّم المزيد" : "Learn More"}
                {/* bouncing arrow */}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
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

/* ═══ MOBILE SNAP VERSION — one full-screen section per industry ══════════ */
export function IndustryShowcaseMobileSnap() {
  const { isAr } = useLang();

  return (
    <>
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <section
            key={tab.slug}
            className="lg:hidden relative overflow-hidden flex-shrink-0"
            style={{ height: "100dvh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
          >
            {/* Full-bleed background video */}
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.92) contrast(1.02)" }}
            >
              <source src={`/x360/industries/${tab.slug}.mp4`} type="video/mp4" />
            </video>

            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.42) 40%, rgba(0,0,0,0.88) 100%)" }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 100%, ${tab.color}12 0%, transparent 65%)` }} />

            {/* Bottom content */}
            <div className={`absolute bottom-20 left-0 right-0 px-6 pb-0 flex flex-col ${isAr ? "items-end text-right" : "items-start text-left"}`}>

              {/* Category label — above heading, white */}
              <div className={`flex items-center gap-2 mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <Icon style={{ width: 11, height: 11, color: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {isAr ? tab.labelAr : tab.label}
                </span>
              </div>

              {/* Heading */}
              <h3
                className="font-thin leading-tight mb-4 text-white"
                style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", letterSpacing: "0.08em" }}
              >
                {isAr ? tab.headingAr : tab.heading}
              </h3>

              {/* Thin colored line */}
              <div className="mb-4" style={{
                width: 52, height: 1,
                background: `linear-gradient(${isAr ? "270deg" : "90deg"}, ${tab.color}, transparent)`,
              }} />

              {/* Tags */}
              <div className={`flex flex-wrap gap-1.5 mb-4 ${isAr ? "justify-end" : ""}`}>
                {(isAr ? tab.tagsAr : tab.tags).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.72)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[12px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.42)", fontStyle: "italic", maxWidth: 300 }}>
                {isAr ? tab.problemAr : tab.problem}
              </p>

              {/* Metrics */}
              <ul className={`flex flex-col gap-1.5 mb-6 ${isAr ? "items-end" : ""}`}>
                {(isAr ? tab.metricsAr : tab.metrics).map((m: string) => (
                  <li key={m} className={`flex items-center gap-2 text-[11px] ${isAr ? "flex-row-reverse" : ""}`} style={{ color: "rgba(255,255,255,0.62)" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tab.color }} />
                    {m}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={SLUG_TO_PAGE[tab.slug] ?? "/virtual-tours"}>
                <motion.button
                  className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                  style={{ background: "#ffffff" }}
                  animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.15)", "0 0 22px 6px rgba(255,255,255,0.35)", "0 0 10px 2px rgba(255,255,255,0.15)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)" }}
                    animate={{ x: ["-100%", "220%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isAr ? "تعلّم المزيد" : "Learn More"}
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ═══ MOBILE VERSION (legacy tab UI — kept for reference) ════════════════ */
function IndustryShowcaseMobile() {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 50% 20%, ${tab.color}0A 0%, transparent 60%)` }}
          transition={{ duration: 0.9 }}
        />
      </div>

      {/* Horizontal tab strip */}
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

      {/* Video */}
      <div className="px-4">
        <div className="overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.video
              key={tab.slug}
              autoPlay muted loop playsInline
              className="w-full h-auto block"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ filter: "brightness(0.88)" }}
            >
              <source src={`/x360/industries/${tab.slug}.mp4`} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>
      </div>

      {/* Text */}
      <div className="px-5 pt-5 pb-10">
        <TextPanel tab={tab} isAr={isAr} />
      </div>
    </div>
  );
}

/* ═══ DESKTOP MAIN ════════════════════════════════════════════════════════ */
export default function IndustryShowcase({
  desktop = true,
  controlledActive,
}: {
  desktop?: boolean;
  controlledActive?: number;
}) {
  const { isAr } = useLang();
  const [active, setActive] = useState(controlledActive ?? 0);
  const activeRef = useRef(controlledActive ?? 0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync when parent controls active tab
  useEffect(() => {
    if (controlledActive === undefined) return;
    activeRef.current = controlledActive;
    setActive(controlledActive);
  }, [controlledActive]);

  useEffect(() => { activeRef.current = active; }, [active]);

  if (!desktop) return <IndustryShowcaseMobile />;

  const tab = TABS[active];

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background — image for luxury tab, gradient for others */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {tab.slug === "luxury" && (
            <motion.img
              key="luxury-bg"
              src="/x360/luxury-bg.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.13 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
          {tab.slug === "real-estate" && (
            <motion.img
              key="real-estate-bg"
              src="/x360/real-estate-bg.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.13 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
          {tab.slug === "hospitality" && (
            <motion.img
              key="hospitality-bg"
              src="/x360/hospitality-bg.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.13 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
          {tab.slug === "others" && (
            <motion.img
              key="others-bg"
              src="/x360/others-bg.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.13 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 60% 50%, ${tab.color}09 0%, transparent 60%)` }}
          transition={{ duration: 1.0 }}
        />
      </div>

      <div className="max-w-[1300px] mx-auto w-full px-8 lg:px-12">
        <div className="grid grid-cols-[1fr_2.2fr_auto] gap-5 lg:gap-7 items-center">

          {/* LEFT — Text */}
          <TextPanel tab={tab} isAr={isAr} />

          {/* CENTER — Video frame */}
          <VideoFrame tab={tab} />

          {/* RIGHT — Tab nav */}
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
