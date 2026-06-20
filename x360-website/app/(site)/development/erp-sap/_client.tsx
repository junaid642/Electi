"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Database, Layers, BarChart3, Cpu, Globe, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
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

const CATEGORIES = [
  {
    icon: Database,
    title: "SAP Implementation",
    titleAr: "تطبيق SAP",
    desc: "S/4HANA, BTP, ZATCA Phase 2",
    descAr: "S/4HANA وBTP ومتطلبات ZATCA",
    href: "/development/erp-sap/sap-implementation",
  },
  {
    icon: Layers,
    title: "Custom ERP",
    titleAr: "نظام ERP مخصص",
    desc: "Tailored enterprise platforms",
    descAr: "منصات مؤسسية مخصصة",
    href: "/development/erp-sap/custom-erp",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    titleAr: "ذكاء الأعمال",
    desc: "Analytics, dashboards & reporting",
    descAr: "التحليلات ولوحات البيانات والتقارير",
    href: "/development/erp-sap/business-intelligence",
  },
  {
    icon: Cpu,
    title: "AI for Enterprise",
    titleAr: "الذكاء الاصطناعي للمؤسسات",
    desc: "AI agents embedded in ERP",
    descAr: "وكلاء الذكاء الاصطناعي مدمجون في ERP",
    href: "/development/erp-sap/ai-enterprise",
  },
  {
    icon: Globe,
    title: "System Integration",
    titleAr: "تكامل الأنظمة",
    desc: "APIs, CRM & cloud connectors",
    descAr: "واجهات API وCRM وموصلات السحابة",
    href: "/development/erp-sap/system-integration",
  },
];

export default function ERPSAPOverviewClient() {
  const { isAr } = useLang();
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "100dvh", background: "#000" }}
      >
        {/* grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "70vw", height: "70vw",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 w-full px-6" style={{ maxWidth: 1200 }}>

          {/* header */}
          <div className="flex flex-col items-center text-center gap-3">
            <FadeUp delay={0.08}>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}
              >
                {t("Enterprise Technology", "التكنولوجيا المؤسسية")}
              </span>
            </FadeUp>
            <FadeUp delay={0.16}>
              <h1
                className="font-thin tracking-[0.12em] uppercase"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)", fontFamily: "Quicksand, sans-serif" }}
              >
                {t("SAP & ERP Solutions", "حلول SAP وERP")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.22}>
              <motion.div
                style={{ width: "clamp(100px, 20vw, 220px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)" }}
              />
            </FadeUp>
          </div>

          {/* cards */}
          <div className="grid w-full gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <FadeUp key={i} delay={0.32 + i * 0.07}>
                  <Link href={cat.href}>
                    <motion.div
                      className="relative rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden h-[150px] sm:h-[220px]"
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
                      <div
                        className="flex items-center justify-center rounded-xl w-10 h-10 sm:w-12 sm:h-12"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <Icon className="w-[18px] h-[18px] sm:w-6 sm:h-6" style={{ color: "rgba(255,255,255,0.7)" }} />
                      </div>

                      <h2 className="font-medium leading-snug text-[0.72rem] sm:text-sm px-4 text-center"
                        style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "0.02em" }}>
                        {t(cat.title, cat.titleAr)}
                      </h2>

                      <div className="flex items-center gap-1">
                        <span className="text-[0.6rem] sm:text-[0.68rem] font-medium" style={{ letterSpacing: "0.06em", color: "#e53935" }}>{t("Explore", "استكشف")}</span>
                        <motion.span
                          style={{ color: "#e53935" }}
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        >
                          <ArrowRight className="w-3 h-3" style={{ color: "#e53935" }} />
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          {/* bottom CTA */}
          <FadeUp delay={0.72} className="mt-2 flex flex-col items-center gap-3">
            <Link href="/contact">
              <motion.button
                className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }}
                animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.12)", "0 0 22px 6px rgba(255,255,255,0.3)", "0 0 10px 2px rgba(255,255,255,0.12)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)" }}
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                />
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
    </>
  );
}
