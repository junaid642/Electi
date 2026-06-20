"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock, CheckCircle, Quote } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudiesData";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const INDUSTRY_COLORS: Record<string, string> = {
  "Real Estate & Development": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "Hospitality": "from-amber-500/20 to-amber-600/10 border-amber-500/30",
  "Corporate & Government": "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "Energy & Industrial": "from-green-500/20 to-green-600/10 border-green-500/30",
  "Tourism & Heritage": "from-rose-500/20 to-rose-600/10 border-rose-500/30",
  "Healthcare": "from-teal-500/20 to-teal-600/10 border-teal-500/30",
};

export default function CaseStudyClient({ cs }: { cs: CaseStudy }) {
  const grad = INDUSTRY_COLORS[cs.industry] ?? "from-white/10 to-white/5 border-white/20";

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* ── Back Nav ── */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-4">
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
          <ArrowLeft size={15} /> Back to Case Studies
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <FadeUp>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">{cs.heroTag}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{cs.title}</h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8">{cs.subtitle}</p>
        </FadeUp>

        {/* Meta row */}
        <FadeUp delay={0.08}>
          <div className="flex flex-wrap gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><MapPin size={13} />{cs.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{cs.year}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} />{cs.duration} delivery</span>
          </div>
        </FadeUp>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-12 mb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {cs.results.map((r, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div
                  className="group flex flex-col items-center text-center rounded-2xl border border-white/10 px-4 py-6 transition-all duration-300 hover:border-white/22"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                >
                  <div className="text-sm lg:text-base font-light text-white mb-2 leading-none whitespace-nowrap">{r.metric}</div>
                  <div className="text-white/42 text-[11px] leading-snug">{r.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">

        {/* Client + Services sidebar card */}
        <FadeUp>
          <div className={`bg-gradient-to-br ${grad} border rounded-2xl p-8 grid md:grid-cols-2 gap-8`}>
            <div>
              <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Client</div>
              <div className="text-white font-bold text-lg">{cs.client}</div>
              <div className="text-white/40 text-sm mt-1">{cs.industry}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">Services Delivered</div>
              <div className="flex flex-wrap gap-2">
                {cs.services.map((s, i) => (
                  <span key={i} className="bg-white/8 border border-white/12 rounded-full px-3 py-1 text-xs text-white/70">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Challenge */}
        <FadeUp>
          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">The Challenge</div>
            <p className="text-white/65 leading-relaxed text-base">{cs.challenge}</p>
          </div>
        </FadeUp>

        {/* Solution */}
        <FadeUp>
          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">Our Solution</div>
            <p className="text-white/65 leading-relaxed text-base">{cs.solution}</p>
          </div>
        </FadeUp>

        {/* Results grid */}
        <FadeUp>
          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-6">Results Achieved</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3 glass border border-white/8 rounded-xl p-4">
                  <CheckCircle size={16} className="text-white/40 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-white font-bold text-xl">{r.metric}</span>
                    <span className="text-white/50 text-sm ml-2">{r.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Testimonial */}
        <FadeUp>
          <div className="glass border border-white/10 rounded-2xl p-8 relative">
            <Quote size={32} className="text-white/10 absolute top-6 left-6" />
            <blockquote className="text-white/70 text-base leading-relaxed italic pl-4 mb-6">
              "{cs.testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 font-bold text-sm">
                {cs.testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="text-white text-sm font-bold">{cs.testimonial.author}</div>
                <div className="text-white/40 text-xs">{cs.testimonial.role}</div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Tags */}
        <FadeUp>
          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {cs.tags.map((tag, i) => (
                <span key={i} className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white/50">{tag}</span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Related links */}
        <FadeUp>
          <div className="border-t border-white/8 pt-10">
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-5">Related Services</div>
            <div className="flex flex-wrap gap-3">
              {cs.relatedLinks.map((l, i) => (
                <Link key={i} href={l.href} className="inline-flex items-center gap-2 glass border border-white/12 rounded-xl px-5 py-3 text-sm text-white/70 hover:text-white hover:border-white/25 transition-all">
                  {l.label} <ArrowRight size={13} />
                </Link>
              ))}
              <Link href="/case-studies" className="inline-flex items-center gap-2 glass border border-white/12 rounded-xl px-5 py-3 text-sm text-white/70 hover:text-white hover:border-white/25 transition-all">
                All Case Studies <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black rounded-xl px-5 py-3 text-sm font-bold hover:opacity-90 transition-all">
                Start Your Project <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
