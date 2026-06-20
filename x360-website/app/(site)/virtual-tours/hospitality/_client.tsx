"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  BedDouble, Utensils, Waves, Sparkles, LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";

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

const CATEGORIES = [
  { icon: BedDouble,   title: "Hotels",          titleAr: "الفنادق",         href: "/virtual-tours/hospitality/hotels" },
  { icon: Waves,       title: "Resorts",         titleAr: "المنتجعات",       href: "/virtual-tours/hospitality/resorts" },
  { icon: Utensils,    title: "Restaurants",     titleAr: "المطاعم",         href: "/virtual-tours/hospitality/restaurants" },
  { icon: Sparkles,    title: "Spa & Wellness",  titleAr: "السبا والعافية",  href: "/virtual-tours/hospitality/spa-wellness" },
];

export default function HotelsResortsCategoriesClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden pt-[60px] sm:pt-0"
        style={{ height: "100dvh", background: "#000" }}
      >
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(80,140,180,0.10) 0%, transparent 65%)" }} />
        {/* grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-5 w-full px-6 py-6 sm:py-10" style={{ maxWidth: 1200 }}>

          {/* header */}
          <div className="flex flex-col items-center text-center gap-1.5 sm:gap-3">
            <FadeUp delay={0.1}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                {t("Hospitality", "قطاع الضيافة")}
              </span>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="font-thin tracking-[0.12em] uppercase" style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.8rem)", fontFamily: "Quicksand, sans-serif" }}>
                {t("Choose Your Type", "اختر النوع")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.24}>
              <motion.div style={{ width: "clamp(80px, 20vw, 220px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }} />
            </FadeUp>
            <FadeUp delay={0.26}>
              <p style={{ fontSize: "clamp(0.72rem, 1.3vw, 0.92rem)", color: "rgba(255,255,255,0.42)" }} className="text-center max-w-xs sm:max-w-none hidden sm:block">
                {t("Immersive 360° virtual tours tailored for every hospitality venue.", "جولات افتراضية 360° مصمّمة لكل منشأة ضيافة.")}
              </p>
            </FadeUp>
          </div>

          {/* cards row */}
          <div className="grid w-full gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <FadeUp key={i} delay={0.32 + i * 0.07}>
                  <Link href={cat.href}>
                    <motion.div
                      className="relative rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer overflow-hidden h-[130px] sm:h-[200px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                      whileHover={{
                        background: "rgba(255,255,255,0.09)",
                        borderColor: "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* icon */}
                      <div className="flex items-center justify-center rounded-lg sm:rounded-xl w-[34px] h-[34px] sm:w-[48px] sm:h-[48px]" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: "rgba(255,255,255,0.7)" }} />
                      </div>

                      {/* title */}
                      <div className="flex flex-col items-center px-2 sm:px-4 text-center">
                        <h2 className="font-medium leading-snug" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.82)", letterSpacing: "0.02em" }}>
                          {t(cat.title, cat.titleAr)}
                        </h2>
                      </div>

                      {/* click here — hidden on mobile */}
                      <div className="hidden sm:flex items-center gap-1" style={{ color: "#e53935" }}>
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

          {/* bottom CTA button */}
          <FadeUp delay={0.72} className="mt-1 sm:mt-4 flex flex-col items-center gap-2 sm:gap-3">
            <Link href="/contact">
              <motion.button
                className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.12)", "0 0 22px 6px rgba(255,255,255,0.3)", "0 0 10px 2px rgba(255,255,255,0.12)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }} animate={{ x: ["-100%", "220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("Not sure? Talk to an Expert", "غير متأكد؟ تحدث مع خبير")}
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>

            {/* ecosystem mention */}
            <Link href="/services">
              <motion.div
                className="relative inline-flex items-center gap-2 flex-wrap justify-center cursor-pointer group/eco"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.48)", letterSpacing: "0.04em" }}>
                  {t("Also available:", "متوفر أيضاً:")}
                </span>
                {[
                  t("AI Property Management", "إدارة العقارات بالذكاء الاصطناعي"),
                  t("Smart Chatbots", "روبوتات الدردشة الذكية"),
                  t("Website Development", "تطوير المواقع"),
                  t("3D Sales Brochures", "الكتيبات التسويقية ثلاثية الأبعاد"),
                ].map((label, i, arr) => (
                  <span key={i} className="flex items-center gap-2">
                    <span
                      className="transition-colors duration-200 group-hover/eco:text-white/80"
                      style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.52)", letterSpacing: "0.04em" }}
                    >
                      {label}
                    </span>
                    {i < arr.length - 1 && (
                      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}>•</span>
                    )}
                  </span>
                ))}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/25 transition-all duration-300 group-hover/eco:w-full" />
              </motion.div>
            </Link>
          </FadeUp>

        </div>
      </div>

      <WhatsAppButton />
    </>
  );
}
