"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Building2, UtensilsCrossed, LayoutGrid, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import NeonButton from "@/components/ui/NeonButton";

const ease = [0.22, 1, 0.36, 1] as const;

/* ═══ DATA ════════════════════════════════════════════════════════════════ */
const TABS = [
  {
    slug: "luxury",
    icon: Crown,
    color: "#C9A84C",
    label: "Private Luxury",      labelAr: "الفاخرة والخاصة",
    tags:  ["Aircraft", "Yacht", "Motorsport", "Luxury Villas"],
    tagsAr: ["الطيران الخاص", "اليخوت", "سيارات السباق", "الفلل الفاخرة"],
    heading:  "Global Luxury\nPresence",
    headingAr: "حضور فاخر\nعالمي",
    problem:  "Present luxury assets globally without requiring physical visits.",
    problemAr: "اعرض أصولك الفاخرة عالمياً دون الحاجة لزيارات ميدانية.",
    metrics:  ["Global Buyer Reach", "Faster Premium Inquiries", "Immersive Luxury Presentation"],
    metricsAr: ["وصول عالمي للمشترين", "استفسارات فاخرة أسرع", "تجربة فاخرة غامرة"],
  },
  {
    slug: "real-estate",
    icon: Building2,
    color: "#6BA3D6",
    label: "Real Estate",         labelAr: "العقارات",
    tags:  ["Developers", "Agents", "Co-working", "Commercial"],
    tagsAr: ["المطورون", "الوكلاء", "مشاركة المكاتب", "التجاري"],
    heading:  "Remote\nProperty Tours",
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
    heading:  "Experience\nBefore Booking",
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
    heading:  "Immersive\nDigital Spaces",
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
    el.play().catch(() => {});
  }, [tab.slug]);

  return (
    <div className="relative flex justify-center">
      {/* Deep ambient glow */}
      <motion.div
        className="absolute -inset-10 rounded-3xl pointer-events-none"
        animate={{ opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${tab.color}28 0%, transparent 65%)` }}
      />

      {/* Floating device — width-capped so portrait ratio never exceeds viewport height */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ maxWidth: 264, width: "100%", margin: "0 auto" }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "100%",
            aspectRatio: "16/21.36",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={tab.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <video
                ref={videoRef}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.70) contrast(1.08) saturate(0.88)" }}
              >
                <source src={("videoSrc" in tab && tab.videoSrc ? tab.videoSrc : `/x360/industries/${tab.slug}.mp4`) as string} type="video/mp4" />
                <source src="/x360/360-bg.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </AnimatePresence>

          {/* Vignette layers */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 30%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${tab.color}08 0%, transparent 50%, rgba(0,0,0,0.15) 100%)` }} />
        </div>

        {/* Reflection glow beneath */}
        <div
          className="absolute -bottom-6 left-[10%] right-[10%] h-8 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${tab.color}18 0%, transparent 70%)`, filter: "blur(8px)" }}
        />
      </motion.div>
    </div>
  );
}

/* ═══ RIGHT TAB NAV ══════════════════════════════════════════════════════ */
function SideNav({ active, isAr, onSelect }: { active: number; isAr: boolean; onSelect: (i: number) => void }) {
  return (
    <div className="hidden lg:flex flex-col justify-center gap-0.5">
      {TABS.map((tab, i) => {
        const Icon = tab.icon;
        const isActive = i === active;
        return (
          <motion.button
            key={tab.slug}
            onClick={() => onSelect(i)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-start w-full"
            animate={{ background: isActive ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0)" }}
            whileHover={{ background: isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.015)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex-shrink-0 rounded-full"
              animate={{
                width: isActive ? 2 : 1,
                height: isActive ? 28 : 10,
                opacity: isActive ? 1 : 0.18,
                background: isActive ? tab.color : "rgba(255,255,255,0.5)",
              }}
              transition={{ duration: 0.4, ease }}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <motion.div animate={{ opacity: isActive ? 0.9 : 0 }} transition={{ duration: 0.3 }}>
                  <Icon style={{ width: 9, height: 9, color: tab.color }} />
                </motion.div>
                <motion.span
                  className="text-[10px] font-light tracking-[0.12em]"
                  animate={{
                    color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.18)",
                    letterSpacing: isActive ? "0.14em" : "0.08em",
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {isAr ? tab.labelAr : tab.label}
                </motion.span>
              </div>
              <motion.div
                className="h-px rounded-full"
                initial={false}
                animate={{ width: isActive ? 20 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.45, ease }}
                style={{ background: tab.color }}
              />
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

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col gap-6 ${isAr ? "items-end text-right" : "items-start text-left"}`}
      >
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-2">
          <Icon style={{ width: 11, height: 11, color: tab.color, flexShrink: 0 }} />
          <span className="text-[8px] font-light tracking-[0.26em] uppercase" style={{ color: tab.color, opacity: 0.85 }}>
            {isAr ? tab.labelAr : tab.label}
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.10)} className={`flex flex-wrap gap-1.5 ${isAr ? "justify-end" : ""}`}>
          {(isAr ? tab.tagsAr : tab.tags).map((tag: string) => (
            <span
              key={tag}
              className="text-[8px] px-2.5 py-1 rounded-full font-light tracking-wide"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.h3
          {...fadeUp(0.15)}
          className="font-thin leading-[1.1] whitespace-pre-line"
          style={{ fontSize: "clamp(1.9rem, 3vw, 2.85rem)", letterSpacing: "0.08em" }}
        >
          {isAr ? tab.headingAr : tab.heading}
        </motion.h3>

        {/* Animated divider */}
        <motion.div
          key={`divider-${tab.slug}`}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "clamp(40px, 7vw, 100px)", opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
          className="h-px"
          style={{ background: `linear-gradient(${isAr ? "270deg" : "90deg"}, ${tab.color}, transparent)` }}
        />

        <motion.p
          {...fadeUp(0.28)}
          className="text-[13px] leading-[1.8] max-w-[280px] font-light"
          style={{ color: "rgba(255,255,255,0.32)", fontStyle: "italic", letterSpacing: "0.02em" }}
        >
          &ldquo;{isAr ? tab.problemAr : tab.problem}&rdquo;
        </motion.p>

        <motion.ul {...fadeUp(0.35)} className={`flex flex-col gap-2.5 ${isAr ? "items-end" : ""}`}>
          {(isAr ? tab.metricsAr : tab.metrics).map((m: string, idx: number) => (
            <motion.li
              key={m}
              initial={{ opacity: 0, x: isAr ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.38 + idx * 0.07, ease }}
              className={`flex items-center gap-2 text-[10px] font-light tracking-wide ${isAr ? "flex-row-reverse" : ""}`}
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <motion.div
                className="w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ background: tab.color, boxShadow: `0 0 4px ${tab.color}80` }}
              />
              {m}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp(0.50)} className="mt-2">
          <Link href="/contact">
            <NeonButton size="sm">
              {isAr ? "اكتشف التجربة" : "Explore Experience"}
              <ArrowRight className="w-3 h-3" />
            </NeonButton>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══ MOBILE VERSION ══════════════════════════════════════════════════════ */
function IndustryShowcaseLuxuryMobile() {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 50% 20%, ${tab.color}0C 0%, transparent 60%)` }}
          transition={{ duration: 1.0 }}
        />
      </div>

      <div className="flex gap-1.5 px-4 pt-6 pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const isActive = i === active;
          return (
            <motion.button
              key={t.slug}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0 text-[10px] font-light tracking-wide"
              animate={{
                background: isActive ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0)",
                borderColor: isActive ? `${t.color}35` : "rgba(255,255,255,0.06)",
                color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.22)",
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

      <div className="px-4">
        <div
          className="overflow-hidden"
          style={{ aspectRatio: "16/9", background: "#02020a", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)" }}
        >
          <AnimatePresence mode="sync">
            <motion.video
              key={tab.slug}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              style={{ filter: "brightness(0.72) contrast(1.06) saturate(0.88)" }}
            >
              <source src={("videoSrc" in tab && tab.videoSrc ? tab.videoSrc : `/x360/industries/${tab.slug}.mp4`) as string} type="video/mp4" />
              <source src="/x360/360-bg.mp4" type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>
      </div>

      <div className="px-5 pt-6 pb-12">
        <TextPanel tab={tab} isAr={isAr} />
      </div>
    </div>
  );
}

/* ═══ DESKTOP MAIN ════════════════════════════════════════════════════════ */
export default function IndustryShowcaseLuxury({ desktop = true }: { desktop?: boolean }) {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const lastEventTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    if (!desktop) return;
    const container = containerRef.current;
    if (!container) return;

    let isVisible = false;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.4 }
    );
    obs.observe(container);

    const onWheel = (e: WheelEvent) => {
      if (!isVisible) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = activeRef.current + dir;
      if (next < 0 || next >= TABS.length) return;
      const now = Date.now();
      if (now - lastEventTime.current < 750) return;
      e.preventDefault();
      lastEventTime.current = now;
      activeRef.current = next;
      setActive(next);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      obs.disconnect();
    };
  }, [desktop]);

  if (!desktop) return <IndustryShowcaseLuxuryMobile />;

  const tab = TABS[active];

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ paddingBlock: "2rem" }}>
      {/* Background — two-layer cinematic depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 65% 50%, ${tab.color}0C 0%, transparent 55%)` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 20% 70%, ${tab.color}06 0%, transparent 45%)` }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <div style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 25%)", position: "absolute", inset: 0 }} />
        <div style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 25%)", position: "absolute", inset: 0 }} />
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-8 lg:px-12">
        <div className="grid grid-cols-[1fr_2.2fr_auto] gap-10 lg:gap-14 items-center">
          <TextPanel tab={tab} isAr={isAr} />

          <motion.div
            key={tab.slug}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease }}
            className="flex justify-center"
          >
            <VideoFrame tab={tab} />
          </motion.div>

          <SideNav
            active={active}
            isAr={isAr}
            onSelect={(i) => {
              lastEventTime.current = Date.now();
              activeRef.current = i;
              setActive(i);
            }}
          />
        </div>
      </div>
    </div>
  );
}
