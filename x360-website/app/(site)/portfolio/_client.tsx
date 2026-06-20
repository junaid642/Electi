"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CASE_STUDIES } from "@/lib/caseStudiesData";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const FILTERS = ["All", "Virtual Tours", "Web Development", "AI Solutions", "ERP & SAP", "Heritage"];

const INDUSTRY_ACCENT: Record<string, string> = {
  "Real Estate & Development": "border-blue-500/40 hover:border-blue-400/60",
  "Hospitality": "border-amber-500/40 hover:border-amber-400/60",
  "Corporate & Government": "border-purple-500/40 hover:border-purple-400/60",
  "Energy & Industrial": "border-green-500/40 hover:border-green-400/60",
  "Tourism & Heritage": "border-rose-500/40 hover:border-rose-400/60",
  "Healthcare": "border-teal-500/40 hover:border-teal-400/60",
};

const STATS = [
  { val: "500+", label: "Projects Delivered" },
  { val: "6+", label: "Industries Served" },
  { val: "SAR 3B+", label: "Client Revenue Supported" },
  { val: "48hr", label: "Average Delivery" },
];

export default function PortfolioClient() {
  const [active, setActive] = useState("All");

  const filtered = CASE_STUDIES.filter((cs) => {
    if (active === "All") return true;
    if (active === "Virtual Tours") return cs.services.some(s => s.includes("Virtual") || s.includes("Digital Twin"));
    if (active === "Web Development") return cs.services.some(s => s.includes("Web"));
    if (active === "AI Solutions") return cs.services.some(s => s.includes("AI"));
    if (active === "ERP & SAP") return cs.services.some(s => s.includes("ERP") || s.includes("SAP"));
    if (active === "Heritage") return cs.industry === "Tourism & Heritage";
    return true;
  });

  return (
    <div className="bg-[#050505] text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ── */}
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Our Work</span>
          </div>
          <h1
            className="font-thin leading-tight mb-6 text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em" }}
          >
            Projects That<br />Define Possibility
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            From luxury hospitality and real estate to corporate enterprises — X360 delivers immersive 360° virtual tours, professional websites, and AI-powered solutions across Saudi Arabia.
          </p>
        </FadeUp>

        {/* ── Stats ── */}
        <FadeUp delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s, i) => (
            <div key={i} className="glass border border-white/8 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-white mb-1">{s.val}</div>
              <div className="text-white/40 text-sm">{s.label}</div>
            </div>
          ))}
        </FadeUp>

        {/* ── Filters ── */}
        <FadeUp delay={0.12} className="flex flex-wrap gap-2 justify-center mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                active === f
                  ? "bg-white text-black"
                  : "glass border border-white/12 text-white/50 hover:text-white hover:border-white/25"
              }`}
            >
              {f}
            </button>
          ))}
        </FadeUp>

        {/* ── Project grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => {
              const accent = INDUSTRY_ACCENT[cs.industry] ?? "border-white/20 hover:border-white/35";
              return (
                <motion.div key={cs.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: EASE }}>
                  <Link href={`/case-studies/${cs.slug}`} className={`group flex flex-col h-full glass border ${accent} rounded-2xl p-7 transition-all duration-300 hover:bg-white/3`}>
                    <div className="flex items-start justify-between mb-5">
                      <span className="bg-white/8 border border-white/10 rounded-full px-3 py-1 text-xs text-white/50 font-bold">{cs.heroTag}</span>
                      <ArrowRight size={15} className="text-white/20 group-hover:text-white/60 transition-colors" />
                    </div>
                    <h2 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-white transition-colors">{cs.title}</h2>
                    <p className="text-white/40 text-sm leading-relaxed flex-1 mb-5">{cs.subtitle}</p>
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <MapPin size={11} /> {cs.location}
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <FadeUp className="text-center glass border border-white/8 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">Ready to Build Something Remarkable?</h2>
          <p className="text-white/40 mb-8 relative z-10">From virtual tours to AI platforms — tell us your project and get a proposal within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold glass border border-white/15 text-white hover:border-white/30 transition-all">
              Read Case Studies <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
