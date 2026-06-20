"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

type Star = { x: number; y: number; r: number; opacity: number; twinkle: boolean };

export default function HomeClient() {
  const { t, isAr } = useLang();

  const rawTorchX = useMotionValue(-9999);
  const rawTorchY = useMotionValue(-9999);
  const torchX = useSpring(rawTorchX, { stiffness: 110, damping: 22 });
  const torchY = useSpring(rawTorchY, { stiffness: 110, damping: 22 });
  const torchBg = useMotionTemplate`radial-gradient(circle 130px at ${torchX}px ${torchY}px, transparent 0%, transparent 16%, rgba(0,0,0,0.88) 48%, rgba(0,0,0,0.90) 100%)`;

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    rawTorchX.set(e.clientX);
    rawTorchY.set(e.clientY);
  };
  const handleMouseLeave = () => {
    rawTorchX.set(-9999);
    rawTorchY.set(-9999);
  };

  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 260 }, () => {
        const r = Math.random();
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: r < 0.65 ? 0.9 : r < 0.88 ? 1.6 : 2.8,
          opacity: 0.55 + Math.random() * 0.45,
          twinkle: Math.random() < 0.4,
        };
      })
    );
  }, []);

  const ChevronIcon = isAr ? ChevronsLeft : ChevronsRight;

  return (
    <div
      className="home-snap-container relative bg-black text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--tw-op);transform:translate(-50%,-50%) scale(1)}50%{opacity:calc(var(--tw-op)*0.3);transform:translate(-50%,-50%) scale(0.6)}}
        @keyframes ctaPulse{0%,100%{opacity:1;text-shadow:0 0 8px rgba(192,57,43,0.9),0 0 18px rgba(192,57,43,0.5)}50%{opacity:0.45;text-shadow:none}}
        @media(min-width:1024px){.cta-pulse-desktop{animation:ctaPulse 1.6s ease-in-out infinite}}
        .star-dot{transition:transform 0.15s ease,filter 0.15s ease,opacity 0.15s ease;}
        .star-dot:hover{transform:translate(-50%,-50%) scale(5) !important;filter:drop-shadow(0 0 5px rgba(255,255,255,1)) drop-shadow(0 0 12px rgba(200,220,255,0.8));opacity:1 !important;animation:none !important;}
        .home-snap-container::-webkit-scrollbar{display:none}
      `}</style>

      {/* ── FIRST SCREEN ── */}
      <div className="relative flex flex-col overflow-hidden" style={{ height: "100dvh", scrollSnapAlign: "start", scrollSnapStop: "always" }}>


      {/* Stars — desktop only */}
      <div className="absolute inset-0 hidden lg:block" style={{ zIndex: 3 }}>
        {stars.map((s, i) => (
          <div
            key={i}
            className="star-dot"
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: s.r > 1.8
                ? `radial-gradient(circle, rgba(255,255,255,${s.opacity}) 0%, rgba(200,220,255,${s.opacity * 0.4}) 60%, transparent 100%)`
                : `rgba(255,255,255,${s.opacity})`,
              boxShadow: s.r > 1.8 ? `0 0 ${s.r * 4}px rgba(255,255,255,${s.opacity * 0.6})` : "none",
              transform: "translate(-50%, -50%)",
              ["--tw-op" as string]: s.opacity,
              animation: s.twinkle
                ? `twinkle ${2.2 + (i % 7) * 0.4}s ease-in-out ${(i % 5) * 0.6}s infinite`
                : "none",
            }}
          />
        ))}
      </div>

      {/* Torch overlay — desktop/mouse only */}
      {!isTouch && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: torchBg, zIndex: 5 }}
        />
      )}

      {/* Main content */}
      <div className="relative flex flex-1 flex-col sm:flex-row" style={{ zIndex: 10 }}>

        {/* Desktop: vertical divider line */}
        <div className="absolute top-24 bottom-10 left-1/2 w-px bg-white/[0.10] pointer-events-none hidden sm:block" />

        {/* LEFT — Web / AI */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative flex-1 flex flex-col items-center justify-center px-8 md:px-14 lg:px-20 sm:pe-10"
          style={{ paddingTop: "clamp(0px, 12vw, 120px)" }}
        >
          <Link href="/development" className="absolute inset-0 cursor-pointer" aria-label="Web / AI Development" />
          <p
            className="text-white/35 text-[12px] sm:text-[14px] mb-3 tracking-wide text-center"
            style={{ fontFamily: isAr ? "Cairo, sans-serif" : "inherit" }}
          >
            {t.home.webAI}
          </p>
          <div className="w-2/3 h-px mb-4 sm:mb-6" style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent 100%)"
          }} />
          <h1 className="text-[15px] sm:text-[17px] md:text-[22px] font-light text-white leading-tight mb-1 text-center"
            style={{ letterSpacing: "0.14em" }}>
            {isAr ? t.home.heroTitleWeb : "Web / AI Development"}
          </h1>
          <p className="text-white/50 text-[11px] font-light mb-6 sm:mb-8 text-center"
            style={{ letterSpacing: "0.22em" }}>
            {isAr ? "الخدمات" : "Services"}
          </p>
          <Link href="/development"
            className="cta-pulse-desktop flex items-center gap-2 text-[11px] sm:text-[13px] font-semibold uppercase"
            style={{ color: "#c0392b", letterSpacing: "0.18em" }}
          >
            {isAr ? <><ChevronIcon className="w-4 h-4" />{t.home.exploreWeb}</> : <>{t.home.exploreWeb}<ChevronIcon className="w-4 h-4" /></>}
          </Link>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden lg:block pointer-events-none"
            style={{
              width: "70%", height: 1,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 70%)",
              filter: "blur(6px)", marginBottom: 8,
            }}
          />
        </motion.div>

        {/* Mobile: logo separator between the two panels */}
        <div className="sm:hidden relative flex items-center justify-center flex-shrink-0 py-1" style={{ zIndex: 20 }}>
          <Image src="/x360/x360-logo.png" alt="X360" width={67} height={52} priority style={{ height: 52, width: "auto", opacity: 0.60 }} />
        </div>

        {/* RIGHT — 360 Virtual Tour */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative flex-1 flex flex-col items-center justify-center px-8 md:px-14 lg:px-20 sm:ps-10"
          style={{ paddingTop: "clamp(0px, 8vw, 120px)" }}
        >
          <Link href="/virtual-tours" className="absolute inset-0 cursor-pointer" aria-label="360 Virtual Tour" />
          <p
            className="text-white/35 text-[12px] sm:text-[14px] mb-3 tracking-wide text-center"
            style={{ fontFamily: isAr ? "Cairo, sans-serif" : "inherit" }}
          >
            {t.home.virtualTours}
          </p>
          <div className="w-2/3 h-px mb-4 sm:mb-6" style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent 100%)"
          }} />
          <h2 className="text-[15px] sm:text-[17px] md:text-[22px] font-light text-white leading-tight mb-1 text-center"
            style={{ letterSpacing: "0.14em" }}>
            {isAr ? t.home.heroTitle360 : "360 Virtual Tour"}
          </h2>
          <p className="text-white/50 text-[11px] font-light mb-6 sm:mb-8 text-center"
            style={{ letterSpacing: "0.22em" }}>
            {isAr ? "الخدمات" : "Services"}
          </p>
          <Link href="/virtual-tours"
            className="cta-pulse-desktop flex items-center gap-2 text-[11px] sm:text-[13px] font-semibold uppercase"
            style={{ color: "#c0392b", letterSpacing: "0.18em" }}
          >
            {isAr ? <><ChevronIcon className="w-4 h-4" />{t.home.explore360}</> : <>{t.home.explore360}<ChevronIcon className="w-4 h-4" /></>}
          </Link>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden lg:block pointer-events-none"
            style={{
              width: "70%", height: 1,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 70%)",
              filter: "blur(6px)", marginBottom: 8,
            }}
          />
        </motion.div>
      </div>

      {/* Bottom section — Vision 2030 + industry search (desktop only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease }}
        className="relative hidden sm:flex flex-col items-center pb-4 pt-3"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col items-center mb-2">
          <Image src="/x360/vision2030.png" alt="Vision 2030 — Kingdom of Saudi Arabia"
            width={120} height={36} priority style={{ width: "auto", height: "clamp(22px, 2.8vw, 36px)", opacity: 0.55 }} />
        </div>
        <p className="text-white/35 text-[10px] mb-1 text-center"
          style={{ fontFamily: isAr ? "Cairo, sans-serif" : "inherit", letterSpacing: isAr ? "0.05em" : "0.14em" }}>
          {isAr ? "دعونا نبني مستقبلك" : "Let's Build Your Future"}
        </p>
        <p className="text-white text-[13px] md:text-[15px] font-light mb-1 text-center"
          style={{ letterSpacing: "0.22em" }}>
          {isAr ? "ابحث حسب الحل" : "Explore Our Ecosystems"}
        </p>
        <div className="w-80 h-px mb-3" style={{
          background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent 100%)"
        }} />
        <div className="flex items-center gap-6 md:gap-10 mb-2">
          {[
            { labelEn: "Real Estate Ecosystem", labelAr: "منظومة العقارات",           href: "https://realestate.x-360.ai/" },
            { labelEn: "AI Agents Platform",    labelAr: "منصة وكلاء الذكاء الاصطناعي", href: "https://www.electi.sa" },
          ].map((link, i, arr) => (
            <div key={link.labelEn} className="flex items-center gap-6 md:gap-10">
              {link.href.startsWith("http") ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-white/60 hover:text-white transition-colors tracking-widest">
                  {isAr ? link.labelAr : link.labelEn}
                </a>
              ) : (
                <Link href={link.href}
                  className="text-[11px] text-white/60 hover:text-white transition-colors tracking-widest">
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              )}
              {i < arr.length - 1 && <span className="text-white/15 text-xs select-none">·</span>}
            </div>
          ))}
        </div>
      </motion.div>
      </div>{/* end first screen */}

      {/* ── SECOND SCREEN — mobile only ── */}
      <section
        className="sm:hidden flex flex-col items-center justify-center px-6 bg-black text-white"
        style={{ height: "100dvh", scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        {/* Vision 2030 logo */}
        <Image
          src="/x360/vision2030.png"
          alt="Vision 2030 — Kingdom of Saudi Arabia"
          width={100} height={30} loading="lazy"
          style={{ width: "auto", height: 30, opacity: 0.55 }}
          className="mb-4"
        />

        {/* "Let's Build Your Future" */}
        <p className="text-white/35 text-[11px] mb-1 text-center"
          style={{ fontFamily: isAr ? "Cairo, sans-serif" : "inherit", letterSpacing: isAr ? "0.05em" : "0.14em" }}>
          {isAr ? "دعونا نبني مستقبلك" : "Let's Build Your Future"}
        </p>

        {/* "Explore Our Ecosystems" */}
        <p className="text-white text-[15px] font-light mb-4 text-center" style={{ letterSpacing: "0.22em" }}>
          {isAr ? "ابحث حسب الحل" : "Explore Our Ecosystems"}
        </p>

        {/* Thin divider */}
        <div className="mb-6" style={{
          width: 280, height: 1,
          background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent 100%)",
        }} />

        {/* Ecosystem links */}
        <div className="flex items-center gap-6">
          {[
            { labelEn: "Real Estate Ecosystem", labelAr: "منظومة العقارات",           href: "https://realestate.x-360.ai/" },
            { labelEn: "AI Agents Platform",    labelAr: "منصة وكلاء الذكاء الاصطناعي", href: "https://www.electi.sa" },
          ].map((link, i, arr) => (
            <div key={link.labelEn} className="flex items-center gap-6">
              {link.href.startsWith("http") ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] text-white/60 hover:text-white transition-colors tracking-widest">
                  {isAr ? link.labelAr : link.labelEn}
                </a>
              ) : (
                <Link href={link.href}
                  className="text-[12px] text-white/60 hover:text-white transition-colors tracking-widest">
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              )}
              {i < arr.length - 1 && <span className="text-white/15 text-xs select-none">·</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
