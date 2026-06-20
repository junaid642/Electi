"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Building2, UtensilsCrossed, Hotel, ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface Project {
  name: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  url: string;
  icon: React.ReactNode;
  year: string;
}

const PROJECTS: Project[] = [
  {
    name: "KW Saudi Arabia",
    category: "REAL ESTATE • ENTERPRISE PLATFORM",
    categoryAr: "عقارات • منصة مؤسسية",
    description: "Enterprise real estate ecosystem designed for modern property showcasing, intelligent engagement, and immersive digital experiences.",
    descriptionAr: "منظومة عقارية مؤسسية مصممة لعرض العقارات بأسلوب حديث وتجارب رقمية غامرة.",
    image: "/x360/projects/kw-saudi.jpg",
    url: "https://kwsaudiarabia.com/",
    icon: <Building2 className="w-4 h-4 text-white/80" />,
    year: "2024",
  },
  {
    name: "EKAL",
    category: "HOSPITALITY • DIGITAL EXPERIENCE",
    categoryAr: "ضيافة • تجربة رقمية",
    description: "Modern hospitality platform combining immersive brand storytelling, elegant user experience, and intelligent digital engagement.",
    descriptionAr: "منصة ضيافة حديثة تجمع بين سرد العلامة التجارية الغامر وتجربة مستخدم أنيقة.",
    image: "/x360/projects/ekal.jpg",
    url: "http://www.ekal.co/",
    icon: <Hotel className="w-4 h-4 text-white/80" />,
    year: "2025",
  },
  {
    name: "Balcona'99",
    category: "RESTAURANT • BRAND EXPERIENCE",
    categoryAr: "مطعم • تجربة علامة تجارية",
    description: "Premium dining experience platform designed to elevate customer engagement through immersive visuals and seamless digital interaction.",
    descriptionAr: "منصة مطعم فاخرة مصممة لتعزيز تفاعل العملاء عبر صور غامرة وتجربة رقمية سلسة.",
    image: "/x360/projects/balcona99.jpg",
    url: "https://www.balcona99.sa/",
    icon: <UtensilsCrossed className="w-4 h-4 text-white/80" />,
    year: "2025",
  },
  {
    name: "Villa Fayrouz",
    category: "LUXURY HOSPITALITY • DIGITAL PLATFORM",
    categoryAr: "ضيافة فاخرة • منصة رقمية",
    description: "Luxury hospitality ecosystem crafted to deliver immersive guest experiences and refined digital storytelling.",
    descriptionAr: "منظومة ضيافة فاخرة مصممة لتقديم تجارب ضيوف غامرة وسرد رقمي راقٍ.",
    image: "/x360/projects/villa-fayrouz.jpg",
    url: "https://www.villafayrouz.sa/",
    icon: <Hotel className="w-4 h-4 text-white/80" />,
    year: "2025",
  },
  {
    name: "Joori Min Beirut",
    category: "RESTAURANT • DIGITAL EXPERIENCE",
    categoryAr: "مطعم • تجربة رقمية",
    description: "Elegant restaurant platform blending modern presentation, immersive visuals, and customer-focused digital experiences.",
    descriptionAr: "منصة مطعم أنيقة تمزج بين العرض الحديث والصور الغامرة والتجارب الرقمية الموجّهة للعملاء.",
    image: "/x360/projects/joori.jpg",
    url: "https://www.jooriminbeirut.com/",
    icon: <UtensilsCrossed className="w-4 h-4 text-white/80" />,
    year: "2024",
  },
];

function GlowRuleCenter() {
  return (
    <div
      style={{
        width: "clamp(70px,14vw,160px)",
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.32), transparent)",
        margin: "0 auto",
      }}
    />
  );
}

export default function PastProjectsSelector() {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    const timers = PROJECTS.map((_, i) => {
      return setTimeout(() => setRevealed((p) => [...p, i]), 120 * i + 300);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleVisit = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100dvh", background: "#000" }}
    >
      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.018) 0%, transparent 60%)" }}
      />

      {/* heading */}
      <motion.div
        className="text-center mb-5 relative z-10 px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          <ArrowUpRight className="w-3 h-3" /> {isAr ? "أعمالنا" : "Our Work"}
        </div>
        <h2 className="text-4xl sm:text-5xl font-thin text-white mb-4 tracking-tight">
          {isAr ? <>المشاريع <span className="shimmer-text">المُنجزة</span></> : <>Delivered <span className="shimmer-text">Projects</span></>}
        </h2>
        <GlowRuleCenter />
        <p className="text-white/30 text-sm mt-4 max-w-lg mx-auto" style={{ letterSpacing: "0.07em" }}>
          {isAr
            ? "منصات رقمية تساعد الأعمال على النمو من خلال تصميم غامر وتقنية ذكية."
            : "Digital platforms helping businesses grow through immersive design and intelligent technology."}
        </p>
      </motion.div>

      {/* accordion — desktop */}
      <div
        className="hidden sm:flex w-full max-w-[1040px] mx-auto px-4 relative z-10 gap-[6px]"
        style={{ height: "min(430px, 46dvh)" }}
      >
        {PROJECTS.map((project, i) => {
          const isActive = active === i;
          const isRevealed = revealed.includes(i);

          return (
            <div
              key={project.name}
              onClick={() => setActive(i)}
              className="relative overflow-hidden cursor-pointer select-none"
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundSize: isActive ? "110% auto" : "auto 130%",
                backgroundPosition: "center",
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.97)",
                transition:
                  "opacity 0.55s ease, transform 0.55s ease, flex 0.42s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.3s ease, background-size 0.9s ease",
                flex: isActive ? "7 1 0%" : "1 1 0%",
                borderWidth: isActive ? 1 : 0,
                borderStyle: "solid",
                borderColor: isActive ? "rgba(255,255,255,0.22)" : "transparent",
                boxShadow: isActive
                  ? "0 24px 70px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(255,255,255,0.05)"
                  : "0 4px 20px rgba(0,0,0,0.45)",
                borderRadius: 14,
                minWidth: 52,
              }}
            >
              {/* luxury gradient veil */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.10) 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 100%)",
                }}
              />

              {/* subtle top shimmer on active */}
              {isActive && (
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none"
                  style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)" }}
                />
              )}

              {/* bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3 z-10">
                {/* icon bubble */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.10)" : "rgba(20,20,20,0.85)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {project.icon}
                </div>

                {/* text */}
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-white text-base leading-tight transition-all duration-600"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    className="text-white/50 text-[11px] mt-1 leading-relaxed transition-all duration-600"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(10px)",
                      transitionDelay: isActive ? "60ms" : "0ms",
                      maxWidth: "62ch",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {isAr ? project.descriptionAr : project.description}
                  </div>
                </div>
              </div>

              {/* top-right meta */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute top-4 right-4 flex flex-col items-end gap-2.5 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {isAr ? project.categoryAr : project.category}
                    </span>
                    <button
                      onClick={(e) => handleVisit(e, project.url)}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-white px-3.5 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.13)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        backdropFilter: "blur(12px)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {isAr ? "زيارة الموقع" : "View Client Website"} <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* collapsed: vertical label */}
              <div
                className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-500"
                style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
              >
                <span
                  className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/40"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  {project.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* mobile: vertical stack */}
      <div
        className="sm:hidden w-full px-4 flex flex-col gap-2 overflow-y-auto relative z-10"
        style={{ maxHeight: "calc(100dvh - 260px)" }}
      >
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl flex items-end"
            style={{
              height: 82,
              backgroundImage: `url('${project.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid rgba(255,255,255,0.09)",
              textDecoration: "none",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.20) 100%)" }}
            />
            <div className="relative z-10 p-4 flex items-center gap-3 w-full">
              <div
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(20,20,20,0.8)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
              >
                {project.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-tight">{project.name}</p>
                <p className="text-white/40 text-[10px] mt-0.5 tracking-wider">{isAr ? project.categoryAr : project.category}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1 text-white/50 text-[10px] font-semibold tracking-wide">
                {isAr ? "استكشف" : "Explore"} <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
