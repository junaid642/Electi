"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Star, Briefcase, ShoppingCart, Layers, Activity, Plane, Building2,
  ArrowRight, Code2,
} from "lucide-react";
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


const SLUG_ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  hospitality: Star,
  corporate:   Briefcase,
  commerce:    ShoppingCart,
  others:      Layers,
};

const NAME_ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  "Real Estate":           Building2,
  "Healthcare":            Activity,
  "Retail":                ShoppingCart,
  "E-Commerce":            ShoppingCart,
  "Enterprise":            Briefcase,
  "Private Jets & Yachts": Plane,
  "Hospitality":           Star,
};

interface Props { data: WebAICategoryData; }

export default function WebsiteDevelopmentClient({ data }: Props) {
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

  const cols =
    data.services.length <= 3 ? data.services.length
    : data.services.length === 4 ? 4
    : data.services.length === 5 ? 5
    : data.services.length === 6 ? 6
    : data.services.length === 7 ? 4
    : 4;

  return (
    <>
      {/* ══ SECTION 1 — SERVICE PICKER ══════════════════════════════ */}
      <section
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100dvh", background: "#000" }}
        className="relative flex flex-col items-center justify-center overflow-hidden"
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
                {t(data.name, data.nameAr)}
              </span>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="font-thin leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("Choose Your Industry", "اختر قطاعك")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.24}>
              <motion.div style={{ width: "clamp(100px, 20vw, 220px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }} />
            </FadeUp>
          </div>

          {/* service cards */}
          <div
            className="grid w-full gap-3 grid-cols-2 sm:grid-cols-3 lg:[grid-template-columns:var(--col-tpl)]"
            style={{ "--col-tpl": `repeat(${cols}, 1fr)` } as React.CSSProperties}
          >
            {data.services.map((svc, i) => {
              const Icon = NAME_ICONS[svc.name] ?? SLUG_ICONS[svc.slug] ?? Code2;
              return (
                <FadeUp key={svc.name} delay={0.32 + i * 0.07}>
                  <Link href={`/development/${data.slug}/${svc.slug}`}>
                    <motion.div
                      className="relative rounded-xl flex flex-col items-center justify-center gap-2.5 cursor-pointer overflow-hidden h-[110px] sm:h-[150px]"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                      whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.2)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-center rounded-xl w-9 h-9 sm:w-12 sm:h-12"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon className="w-[18px] h-[18px] sm:w-6 sm:h-6 text-white/70" />
                      </div>
                      <h2 className="font-light leading-snug text-[0.62rem] sm:text-xs px-2 text-center"
                        style={{ color: "rgba(255,255,255,0.70)", letterSpacing: "0.03em" }}>
                        {isAr ? svc.nameAr : svc.name}
                      </h2>
                      <div className="hidden sm:flex items-center gap-1" style={{ color: "#e53935" }}>
                        <span className="text-[0.58rem] sm:text-[0.65rem] font-medium" style={{ letterSpacing: "0.06em", color: "#e53935" }}>
                          {t("Explore", "استكشف")}
                        </span>
                        <motion.span style={{ color: "#e53935" }} animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                          <ArrowRight className="w-2.5 h-2.5" style={{ color: "#e53935" }} />
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          {/* CTA */}
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
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Not Sure? Talk to an Expert", "غير متأكد؟ تحدث مع خبير")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
            <div className="flex items-center gap-2 flex-wrap justify-center" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
              <span className="tracking-wide">{t("Also available:", "متاح أيضاً:")}</span>
              <Link href="/development/ai-solutions">
                <motion.span className="cursor-pointer" style={{ color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.16 }}>
                  {t("AI Development", "تطوير الذكاء الاصطناعي")}
                </motion.span>
              </Link>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
              <Link href="/virtual-tours">
                <motion.span className="cursor-pointer" style={{ color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.16 }}>
                  {t("360 / 3D Virtual Tours", "جولات 360 / ثلاثية الأبعاد")}
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <BackButton />
      <WhatsAppButton />
      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
