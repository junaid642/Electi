"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, BookOpen, BarChart2, Layers, Brain, Building2, Heart } from "lucide-react";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const GUIDES = [
  {
    icon: BookOpen,
    tag: "Virtual Tours",
    title: "Complete Guide to 360° Virtual Tours in Saudi Arabia",
    desc: "Everything Saudi businesses need to know about virtual tour production — pricing, technology, ROI, sector applications, and how to brief an agency. Covers Vision 2030 mega-project requirements.",
    stats: ["8K HDR explained", "ROI benchmarks by sector", "Agency briefing template"],
    href: "/contact",
    cta: "Request Guide",
  },
  {
    icon: Building2,
    tag: "Real Estate",
    title: "Saudi Real Estate Digital Marketing Playbook 2025",
    desc: "How Riyadh and Jeddah developers are using virtual tours, digital twins, and AI-powered property portals to sell off-plan inventory faster. Includes ROSHN and NEOM case references.",
    stats: ["Off-plan sales acceleration data", "Portal integration checklist", "Bilingual marketing guide"],
    href: "/contact",
    cta: "Request Playbook",
  },
  {
    icon: Heart,
    tag: "Healthcare",
    title: "Healthcare Digital Transformation in KSA — 2025 Guide",
    desc: "A practical guide to digital transformation for Saudi hospitals and clinics — covering patient portals, AI triage, Arabic UX, MOH compliance, and JCI accreditation digital requirements.",
    stats: ["MOH digital guidelines", "Patient portal ROI data", "AI chatbot Arabic benchmarks"],
    href: "/contact",
    cta: "Request Guide",
  },
  {
    icon: Brain,
    tag: "AI Solutions",
    title: "AI in Saudi Hospitality: ROI & Implementation Guide",
    desc: "For Saudi hotel operators and F&B brands: how AI-powered booking systems, virtual tours, and personalisation engines increase RevPAR and reduce operational cost. GCC benchmarks included.",
    stats: ["RevPAR impact data", "AI chatbot implementation steps", "Arabic NLP guidance"],
    href: "/contact",
    cta: "Request Guide",
  },
  {
    icon: Layers,
    tag: "ERP & SAP",
    title: "ERP Selection Guide for Saudi SMEs & Mid-Market",
    desc: "How to choose between SAP, Oracle, and custom ERP for your Saudi business — covering ZATCA e-invoicing compliance, Arabic language requirements, and Vision 2030 Saudisation reporting.",
    stats: ["ZATCA compliance checklist", "SAP vs Oracle comparison", "Cost & timeline benchmarks"],
    href: "/contact",
    cta: "Request Guide",
  },
  {
    icon: BarChart2,
    tag: "Vision 2030",
    title: "Vision 2030 Technology Readiness Checklist",
    desc: "A structured checklist for Saudi businesses to assess their digital readiness for Vision 2030 — covering web presence, AI adoption, data localisation, cybersecurity, and bilingual operations.",
    stats: ["50-point readiness checklist", "Sector-by-sector priorities", "Government compliance map"],
    href: "/contact",
    cta: "Request Checklist",
  },
];

const STATS = [
  { val: "500+", label: "Projects Referenced" },
  { val: "6", label: "Industry Guides" },
  { val: "Free", label: "All Resources" },
  { val: "AR + EN", label: "Bilingual Content" },
];

const BACKLINK_SECTORS = [
  {
    title: "Hospitality & Tourism",
    items: ["Saudi Tourism Authority partner networks", "IHG / Hilton / Marriott GCC digital teams", "CATC and Saudi hospitality associations", "Luxury travel media (Condé Nast, Travel+Leisure Arabia)"],
    href: "/virtual-tours/hospitality",
  },
  {
    title: "Real Estate & Development",
    items: ["Saudi Real Estate Federation (SRFA)", "Roshn, Dar Al Arkan, EMAAR SA directories", "PropertyFinder & Bayut partner program", "MENA CRE industry publications"],
    href: "/virtual-tours/real-estate",
  },
  {
    title: "Healthcare",
    items: ["Saudi Commission for Health Specialties (SCFHS)", "MOH digital health initiative partners", "Arab Health exhibitor network", "GCC hospital management associations"],
    href: "/ai-solutions/riyadh",
  },
  {
    title: "Construction & Engineering",
    items: ["Saudi Council of Engineers", "BREEAM / LEED Saudi project directories", "Neom and Qiddiya supplier network", "Middle East Contractor Magazine"],
    href: "/website-development/riyadh",
  },
];

export default function ResourcesClient() {
  return (
    <div className="bg-[#050505] text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ── */}
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Free Resources</span>
          </div>
          <h1
            className="font-thin leading-tight mb-6 text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em" }}
          >
            Industry Guides<br /><span className="text-white/30">for Saudi Businesses</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Practical, data-backed guides on virtual tours, AI, web development, and digital transformation — written for Saudi businesses pursuing Vision 2030 readiness.
          </p>
        </FadeUp>

        {/* ── Stats ── */}
        <FadeUp delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s, i) => (
            <div key={i} className="glass border border-white/8 rounded-2xl p-5 text-center">
              <div className="text-2xl font-black text-white mb-1">{s.val}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </FadeUp>

        {/* ── Guide cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {GUIDES.map((g, i) => {
            const Icon = g.icon;
            return (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="group flex flex-col h-full glass border border-white/8 hover:border-white/18 rounded-2xl p-7 transition-all duration-300 hover:bg-white/2">
                  <div className="flex items-start justify-between mb-5">
                    <span className="bg-white/8 border border-white/10 rounded-full px-3 py-1 text-xs text-white/50 font-bold">{g.tag}</span>
                    <Icon size={18} className="text-white/25" />
                  </div>
                  <h2 className="text-white font-bold text-base leading-snug mb-3">{g.title}</h2>
                  <p className="text-white/40 text-sm leading-relaxed flex-1 mb-5">{g.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {g.stats.map((s, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link href={g.href} className="inline-flex items-center gap-2 glass border border-white/15 rounded-xl px-5 py-3 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all font-bold">
                    <Download size={13} /> {g.cta}
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* ── Industry backlink opportunities ── */}
        <FadeUp className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Industry Partnership Directories</h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Key associations and directories where X360 services are relevant — for referral and partnership enquiries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BACKLINK_SECTORS.map((sector, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="glass border border-white/8 rounded-2xl p-7">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/40" /> {sector.title}
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {sector.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/45">
                        <ArrowRight size={12} className="mt-0.5 shrink-0 text-white/25" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={sector.href} className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                    View related service <ArrowRight size={11} />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        {/* ── CTA ── */}
        <FadeUp className="text-center glass border border-white/8 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">Need a Custom Consultation?</h2>
          <p className="text-white/40 mb-8 relative z-10 max-w-lg mx-auto">Our team provides tailored digital readiness assessments for Saudi businesses — covering every guide topic above, specific to your industry and size.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Request a Consultation <ArrowRight size={16} />
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold glass border border-white/15 text-white hover:border-white/30 transition-all">
              View Case Studies <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
