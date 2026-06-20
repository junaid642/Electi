"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Code2, Bot, ShoppingCart, Smartphone, Shield, Cpu, Globe,
  Layers, Activity, BarChart3, Database, Settings, Zap,
  MousePointer, ArrowRight, FileText, Bell, Building2,
  Briefcase, Calendar, Star, Users, TrendingUp, MessageSquare,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { WebAICategoryData } from "@/data/webai-categories";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";

const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

const SLUG_ICONS: Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
  // Website Development
  "real-estate":             Building2,
  "hospitality":             Star,
  "corporate":               Briefcase,
  "commerce":                ShoppingCart,
  "others":                  Layers,
  // Mobile Applications
  "business-apps":           Briefcase,
  "ecommerce-apps":          ShoppingCart,
  "service-booking-apps":    Calendar,
  "ai-powered-apps":         Bot,
  // AI Solutions
  "ai-automation":           Zap,
  "ai-chatbots":             Bot,
  "ai-analytics":            BarChart3,
  "custom-ai-systems":       Cpu,
  // ERP & SAP
  "erp-solutions":           Database,
  "sap-integration":         Settings,
  "workflow-automation":     Activity,
  "enterprise-systems":      Layers,
};

interface Props { data: WebAICategoryData; }

export default function WebAICategoryClient({ data }: Props) {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const cols = data.services.length <= 3 ? data.services.length
    : data.services.length === 4 ? 4
    : data.services.length === 5 ? 5
    : 4;

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "100dvh", background: "#000" }}
      >

        {/* grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* accent glow */}
        <div className="absolute pointer-events-none"
          style={{ top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "50vh", background: `radial-gradient(ellipse, ${data.gradientColor}, transparent 65%)` }} />

        <div className="relative z-10 flex flex-col items-center gap-5 w-full px-6" style={{ maxWidth: 1200 }}>

          {/* header */}
          <div className="flex flex-col items-center text-center gap-3">
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                {isAr ? data.nameAr : data.name}
              </span>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {t("Choose Your Service", "اختر خدمتك")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.24}>
              <motion.div style={{ width: "clamp(100px, 20vw, 220px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }} />
            </FadeUp>
          </div>

          {/* service cards */}
          <div className="webai-grid grid w-full gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {data.services.map((svc, i) => {
              const Icon = SLUG_ICONS[svc.slug] ?? Code2;
              return (
                <FadeUp key={svc.slug} delay={0.32 + i * 0.07}>
                  <Link href={`/development/${data.slug}/${svc.slug}`}>
                    <motion.div
                      className="relative rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", height: 180 }}
                      whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.2)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* icon */}
                      <div className="flex items-center justify-center rounded-xl"
                        style={{ width: 44, height: 44, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon className="w-5 h-5" style={{ color: "rgba(255,255,255,0.7)" }} />
                      </div>

                      {/* title */}
                      <div className="flex flex-col items-center px-4 text-center">
                        <h2 className="font-medium leading-snug" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.82)", letterSpacing: "0.02em" }}>
                          {isAr ? svc.nameAr : svc.name}
                        </h2>
                      </div>

                      {/* click here */}
                      <div className="flex items-center gap-1" style={{ color: "#e53935" }}>
                        <span style={{ fontSize: "0.68rem", letterSpacing: "0.06em" }}>{t("Click Here", "انقر هنا")}</span>
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
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Not Sure? Talk to an Expert", "غير متأكد؟ تحدث مع خبير")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>

            {/* Also available */}
            <div className="flex items-center gap-2 flex-wrap justify-center" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
              <span className="tracking-wide">{t("Also available:", "متاح أيضاً:")}</span>
              <Link href="/development/ai-solutions">
                <motion.span
                  className="cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ color: "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.16 }}
                >
                  {t("AI Development", "تطوير الذكاء الاصطناعي")}
                </motion.span>
              </Link>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
              <Link href="/virtual-tours">
                <motion.span
                  className="cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  whileHover={{ color: "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.16 }}
                >
                  {t("360 / 3D Virtual Tours", "جولات 360 / ثلاثية الأبعاد")}
                </motion.span>
              </Link>
            </div>
          </FadeUp>

        </div>
      </div>

      <BackButton />
      <WhatsAppButton />

      <style>{`
        @media (max-width: 640px) { .webai-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 641px) and (max-width: 900px) { .webai-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </>
  );
}
