"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INDUSTRIES = [
  { label: "Real Estate",           labelAr: "العقارات",                 slug: "real-estate", href: "/development/website/real-estate" },
  { label: "Hospitality",           labelAr: "الضيافة",                  slug: "hospitality", href: "/development/website/hospitality" },
  { label: "Healthcare",            labelAr: "الرعاية الصحية",           slug: "healthcare",  href: "/development/website/healthcare"  },
  { label: "Retail",                labelAr: "التجزئة",                  slug: "retail",      href: "/development/website/retail"      },
  { label: "E-Commerce",            labelAr: "التجارة الإلكترونية",      slug: "commerce",    href: "/development/website/commerce"    },
  { label: "Enterprise",            labelAr: "المؤسسات",                 slug: "corporate",   href: "/development/website/corporate"   },
  { label: "Private Jets & Yachts", labelAr: "الطيران الخاص واليخوت",  slug: "private-jet", href: "/development/website/private-jet"  },
];

interface Props {
  currentSlug: string;
}

export default function OtherIndustriesStrip({ currentSlug }: Props) {
  const { isAr } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      className="relative w-full py-10 px-4 overflow-hidden"
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-[9px] font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            {isAr ? "استكشف القطاعات الأخرى" : "Explore Other Industries"}
          </span>
        </motion.div>

        {/* industry links */}
        <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3">
          {INDUSTRIES.map((ind, i) => {
            const isCurrent = ind.slug === currentSlug;
            return (
              <motion.div
                key={`${ind.label}-${i}`}
                className="flex items-center"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease }}
              >
                {i > 0 && (
                  <span className="mx-4 select-none" style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.7rem" }}>
                    |
                  </span>
                )}
                <Link href={ind.href}>
                  <motion.span
                    className="cursor-pointer text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
                    style={{
                      color: isCurrent ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.32)",
                      borderBottom: isCurrent ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
                      paddingBottom: "1px",
                    }}
                    whileHover={
                      isCurrent
                        ? {}
                        : { color: "rgba(255,255,255,0.75)" }
                    }
                    transition={{ duration: 0.18 }}
                  >
                    {isAr ? ind.labelAr : ind.label}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
