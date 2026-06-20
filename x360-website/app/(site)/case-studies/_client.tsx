"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CASE_STUDIES } from "@/lib/caseStudiesData";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const INDUSTRY_BORDER: Record<string, string> = {
  "Real Estate & Development": "hover:border-blue-500/40",
  "Hospitality": "hover:border-amber-500/40",
  "Corporate & Government": "hover:border-purple-500/40",
  "Energy & Industrial": "hover:border-green-500/40",
  "Tourism & Heritage": "hover:border-rose-500/40",
  "Healthcare": "hover:border-teal-500/40",
};

const STATS = [
  { val: "500+", label: "Projects Delivered" },
  { val: "6+", label: "Industries" },
  { val: "SAR 3B+", label: "Client Revenue Supported" },
  { val: "24hr", label: "Quote Turnaround" },
];

export default function CaseStudiesClient() {
  const { t } = useLang();
  const tc = t.caseStudies;

  return (
    <div className="bg-[#050505] text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ── */}
        <FadeUp className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">{tc.badge}</span>
          </div>
          <h1
            className="font-thin leading-tight mb-6 text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em" }}
          >
            {tc.heroTitle}
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">{tc.heroSub}</p>
        </FadeUp>

        {/* ── Stats ── */}
        <FadeUp delay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s, i) => (
            <div key={i} className="glass border border-white/8 rounded-2xl p-5 text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.val}</div>
              <div className="text-white/40 text-sm">{s.label}</div>
            </div>
          ))}
        </FadeUp>

        {/* ── Case study cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {CASE_STUDIES.map((cs, i) => {
            const accent = INDUSTRY_BORDER[cs.industry] ?? "hover:border-white/30";
            return (
              <FadeUp key={cs.slug} delay={i * 0.07}>
                <Link href={`/case-studies/${cs.slug}`} className={`group flex flex-col h-full glass border border-white/8 ${accent} rounded-2xl p-7 transition-all duration-300 hover:bg-white/2`}>
                  <div className="flex items-start justify-between mb-5">
                    <span className="bg-white/8 border border-white/10 rounded-full px-3 py-1 text-xs text-white/50 font-bold">{cs.heroTag}</span>
                    <ArrowRight size={15} className="text-white/20 group-hover:text-white/60 transition-colors mt-0.5" />
                  </div>
                  <h2 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2">{cs.title}</h2>
                  <p className="text-white/40 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">{cs.subtitle}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <MapPin size={11} /> {cs.location}
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <Clock size={11} /> {cs.duration} · {cs.year}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {cs.results.slice(0, 2).map((r, j) => (
                      <div key={j} className="bg-white/4 rounded-lg p-2.5 text-center">
                        <div className="text-white font-black text-sm">{r.metric}</div>
                        <div className="text-white/30 text-xs leading-tight">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <FadeUp className="text-center">
          <div className="glass rounded-3xl border border-white/8 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">{tc.ctaTitle}</h2>
            <p className="text-white/40 mb-8 relative z-10 max-w-md mx-auto">Every project starts with a 24-hour proposal. Tell us your vision and we&apos;ll show you exactly how X360 can deliver it.</p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-black shadow-xl shadow-white/12 hover:opacity-90 transition-all">
                {tc.ctaBtn} <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold glass border border-white/15 text-white hover:border-white/30 transition-all">
                View Full Portfolio <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
