"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Bot, Zap, BarChart3, Cpu, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { WebAICategoryData } from "@/data/webai-categories";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

const DIVISION_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "ai-chatbots":       Bot,
  "ai-automation":     Zap,
  "ai-analytics":      BarChart3,
  "custom-ai-systems": Cpu,
};

interface Props { data: WebAICategoryData; }

export default function AISolutionsClient({ data }: Props) {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollBehavior = "smooth";
    body.style.scrollbarWidth = "none";
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
      body.style.scrollbarWidth = "";
    };
  }, []);

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "100dvh", background: "#000" }}
      >
        {/* grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 flex flex-col items-center gap-5 w-full px-6" style={{ maxWidth: 1200 }}>

          {/* header */}
          <div className="flex flex-col items-center text-center gap-3">
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                {t("AI Solutions", "حلول الذكاء الاصطناعي")}
              </span>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="font-thin tracking-[0.12em] uppercase" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Choose Your AI Division", "اختر قسم الذكاء الاصطناعي")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.24}>
              <motion.div style={{ width: "clamp(100px, 20vw, 220px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }} />
            </FadeUp>
            <FadeUp delay={0.26}>
              <p style={{ fontSize: "clamp(0.78rem, 1.3vw, 0.92rem)", color: "rgba(255,255,255,0.42)" }} className="text-center max-w-xs sm:max-w-none">
                {t("Four intelligent divisions. One connected AI ecosystem.", "أربعة أقسام ذكية. منظومة ذكاء اصطناعي متصلة واحدة.")}
              </p>
            </FadeUp>
          </div>

          {/* cards */}
          <div className="grid w-full gap-4 grid-cols-2 sm:grid-cols-4">
            {data.services.map((svc, i) => {
              const Icon = DIVISION_ICONS[svc.slug] ?? Bot;
              return (
                <FadeUp key={svc.slug} delay={0.32 + i * 0.07}>
                  <Link href={`/development/ai-solutions/${svc.slug}`}>
                    <motion.div
                      className="relative rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden h-[150px] sm:h-[220px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                      whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.2)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* icon */}
                      <div className="flex items-center justify-center rounded-xl w-10 h-10 sm:w-12 sm:h-12"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon className="w-[18px] h-[18px] sm:w-6 sm:h-6" style={{ color: "rgba(255,255,255,0.7)" }} />
                      </div>

                      {/* title */}
                      <div className="flex flex-col items-center px-4 text-center">
                        <h2 className="font-medium leading-snug text-[0.72rem] sm:text-sm"
                          style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "0.02em" }}>
                          {isAr ? svc.nameAr : svc.name}
                        </h2>
                      </div>

                      {/* click here */}
                      <div className="hidden sm:flex items-center gap-1" style={{ color: "#e53935" }}>
                        <span className="text-[0.6rem] sm:text-[0.68rem]" style={{ letterSpacing: "0.06em" }}>{t("Click Here", "انقر هنا")}</span>
                        <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                          <ArrowRight className="w-3 h-3" />
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          {/* bottom CTA */}
          <FadeUp delay={0.72} className="mt-4 flex flex-col items-center gap-3">
            <Link href="/contact">
              <motion.button
                className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.12)", "0 0 22px 6px rgba(255,255,255,0.3)", "0 0 10px 2px rgba(255,255,255,0.12)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                  animate={{ x: ["-100%", "220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Not sure? Talk to an Expert", "غير متأكد؟ تحدث مع خبير")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </FadeUp>

        </div>
      </div>

      <BackButton />
      <WhatsAppButton />
      <style>{`::-webkit-scrollbar{display:none}`}</style>
    </>
  );
}
