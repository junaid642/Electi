"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Bot, Database, Smartphone, BarChart3,
  Zap, Brain, Cloud, Code2, Shield,
} from "lucide-react";

const SERVICES = [
  {
    id: "websites",
    label: "Website Development",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1200",
    description: "Stunning, AI-powered websites built to convert — fast, responsive, and tailored to Saudi markets.",
  },
  {
    id: "chatbots",
    label: "AI Chatbots & Agents",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200",
    description: "24/7 intelligent assistants that handle leads, answer queries, and drive revenue while you sleep.",
  },
  {
    id: "erp",
    label: "ERP & CRM Systems",
    icon: Database,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200",
    description: "End-to-end enterprise platforms that unify operations, finance, HR, and customer relationships.",
  },
  {
    id: "mobile",
    label: "Mobile App Development",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200",
    description: "Native iOS and Android apps with seamless UX — built for performance and scalability.",
  },
  {
    id: "seo",
    label: "SEO & Digital Marketing",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200",
    description: "Data-driven SEO and paid campaigns that put your brand at the top of every search.",
  },
  {
    id: "automation",
    label: "Custom Automations",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    description: "Eliminate repetitive work with intelligent pipelines — integrate any tool, any workflow.",
  },
  {
    id: "analytics",
    label: "Data Intelligence",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    description: "Real-time dashboards and predictive analytics that turn raw data into actionable strategy.",
  },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200",
    description: "Scalable, secure cloud architecture that grows with your business — zero downtime, full control.",
  },
  {
    id: "global",
    label: "Global Deployment",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200",
    description: "Launch across Saudi Arabia, GCC, and international markets with localised, multilingual solutions.",
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200",
    description: "Bank-grade security protocols — protecting your data, customers, and digital assets.",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 54;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function AiServicesCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentIndex = ((step % SERVICES.length) + SERVICES.length) % SERVICES.length;

  const nextStep = useCallback(() => { setStep((p) => p + 1); }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + SERVICES.length) % SERVICES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = SERVICES.length;
    let d = diff;
    if (diff > len / 2) d -= len;
    if (diff < -len / 2) d += len;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  const current = SERVICES[currentIndex]!;
  const CurrentIcon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* overflow-hidden keeps the card fan inside */}
      <div
        className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] flex flex-col lg:flex-row"
        style={{
          minHeight: isMobile ? "min(200px, calc(100dvh - 500px))" : "min(380px, calc(100dvh - 290px))",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* ── LEFT · scrolling label list ─────────────────────────────── */}
        <div
          className="w-full lg:w-[42%] relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: isMobile ? "min(130px, calc(50dvh - 110px))" : "min(240px, calc(50dvh - 90px))", borderRight: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* top/bottom fade masks */}
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

          <div className="relative w-full flex items-center justify-start sm:ps-12 lg:ps-14" style={{ height: ITEM_HEIGHT * 5 }}>
            {SERVICES.map((svc, index) => {
              const Icon = svc.icon;
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const d = wrap(-(SERVICES.length / 2), SERVICES.length / 2, distance);

              return (
                <motion.div
                  key={svc.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                    ...(isMobile ? { left: "50%", x: "-50%" } : {}),
                  }}
                  animate={{
                    y: d * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(d) * 0.22,
                  }}
                  transition={{ type: "tween", duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex items-center"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex items-center gap-3.5 px-5 py-3 rounded-full transition-all duration-500 text-left"
                    style={{
                      background: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.03)",
                      border: isActive ? "1px solid rgba(255,255,255,1)" : "1px solid rgba(255,255,255,0.10)",
                      color: isActive ? "#000" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <Icon
                      className="flex-shrink-0 transition-colors duration-500"
                      style={{ width: 16, height: 16, color: isActive ? "#000" : "rgba(255,255,255,0.35)" }}
                    />
                    <span className="text-[13px] font-medium tracking-wide whitespace-nowrap">
                      {svc.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT · card fan ─────────────────────────────────────────── */}
        <div
          className="flex-1 relative flex items-center justify-center py-8 lg:py-8 px-4 lg:px-8 overflow-hidden"
          style={{ minHeight: 320, background: "rgba(255,255,255,0.01)" }}
        >
          {/* subtle radial glow behind active card */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{ background: "radial-gradient(circle 380px at 55% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)" }}
          />

          <div className="relative w-full max-w-[260px] aspect-[4/5]">
            {SERVICES.map((svc, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              const CardIcon = svc.icon;

              return (
                <motion.div
                  key={svc.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : (isPrev || isNext) ? 0.87 : 0.72,
                    opacity: isActive ? 1 : (isPrev || isNext) ? 0.35 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : (isPrev || isNext) ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-[1.8rem] overflow-hidden origin-center"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", background: "#0a0a0a" }}
                >
                  <img
                    src={svc.image}
                    alt={svc.label}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{
                      filter: isActive ? "grayscale(20%) brightness(0.75)" : "grayscale(100%) brightness(0.45) blur(2px)",
                    }}
                  />

                  {/* bottom caption */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-x-0 bottom-0 p-7 pt-28 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)" }}
                      >
                        <div
                          className="flex items-center gap-2 px-3 py-1 rounded-full w-fit mb-3"
                          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <CardIcon style={{ width: 12, height: 12, color: "rgba(255,255,255,0.7)" }} />
                          <span className="text-white/70 text-[10px] font-semibold uppercase tracking-[0.22em]">
                            {svc.label}
                          </span>
                        </div>
                        <p className="text-white text-lg sm:text-xl font-light leading-snug drop-shadow-md">
                          {svc.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* top live dot */}
                  <div
                    className="absolute top-6 left-6 flex items-center gap-2 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }} />
                    <span className="text-white/60 text-[9px] font-mono uppercase tracking-[0.3em]">X360 AI</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* progress dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleChipClick(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? 18 : 5,
                  height: 5,
                  background: i === currentIndex ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
