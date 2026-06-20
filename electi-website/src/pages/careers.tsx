import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Upload, Briefcase, Globe, Zap, TrendingUp, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const jobs = [
  { title: "Senior Frontend Engineer",   team: "Engineering",     location: "Remote",           type: "Full-time", desc: "Build the future of AI interfaces. Work on our core dashboard and agent UX with React, TypeScript, and Framer Motion.",          tags: ["React", "TypeScript", "Framer Motion"] },
  { title: "AI Product Designer",         team: "Design",          location: "Remote / Riyadh",  type: "Full-time", desc: "Design intuitive experiences for AI-powered workflows. Shape how thousands of users interact with their AI agents daily.",   tags: ["Figma", "Motion Design", "Research"] },
  { title: "Backend Engineer — Python/Node", team: "Engineering", location: "Remote",           type: "Full-time", desc: "Design and build the infrastructure that powers millions of AI agent tasks. Work on our real-time event processing pipeline.", tags: ["Python", "Node.js", "PostgreSQL"] },
  { title: "DevOps Engineer",             team: "Infrastructure",  location: "Remote",           type: "Full-time", desc: "Keep our AI workforce running at 99.9% uptime. Own our cloud infrastructure, CI/CD pipelines, and observability stack.",      tags: ["AWS", "Kubernetes", "Terraform"] },
  { title: "AI Researcher",               team: "AI & Research",   location: "Remote / Riyadh",  type: "Full-time", desc: "Push the boundaries of what AI agents can do. Research and implement cutting-edge models for legal, billing, and sales.",     tags: ["LLMs", "Fine-tuning", "RAG"] },
];

const perks = [
  { icon: Globe,      title: "Remote-first",   desc: "Work from anywhere. Async-first, results-driven culture." },
  { icon: TrendingUp, title: "Equity",          desc: "Meaningful equity. When Electi wins, you win." },
  { icon: Zap,        title: "AI Tools Budget", desc: "Full access to every AI tool at the frontier." },
  { icon: Heart,      title: "Learning Budget", desc: "$2,000/year for courses, conferences, books." },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export default function Careers() {
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      setNavHidden(st > lastScrollRef.current && st > 80);
      lastScrollRef.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead title="Careers at Electi | Join the AI Revolution" titleAr="وظائف في إليكتي | انضم إلى ثورة الذكاء الاصطناعي" description="Join Electi and help build the future of AI workforce infrastructure. Open positions in AI engineering, product, and business development." descriptionAr="انضم إلى إليكتي وساهم في بناء مستقبل بنية تحتية قوى العمل بالذكاء الاصطناعي." path="/careers" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(52,168,83,0.06) 0%,transparent 65%)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
              <Briefcase className="w-3 h-3" /> We're Hiring
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-700 leading-tight mb-5" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
              Shape the{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Future of AI</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Join a small, ambitious team building the AI infrastructure for the next generation of businesses in Saudi Arabia and beyond.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · PERKS ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4"><Zap className="w-3 h-3" /> Why Electi</div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">Life at <span style={{ color: "rgba(255,255,255,0.55)" }}>Electi</span></h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <motion.div key={perk.title} variants={fadeUp} className="rounded-xl border border-white/8 p-5 text-center hover:border-white/14 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-5 h-5 text-white/45" />
                    </div>
                    <h4 className="font-600 text-white text-sm mb-1.5">{perk.title}</h4>
                    <p className="text-white/32 text-xs leading-relaxed">{perk.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 3 · OPEN POSITIONS ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-3xl font-700 mb-3">Open <span style={{ color: "rgba(255,255,255,0.55)" }}>Positions</span></h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="space-y-3">
              {jobs.map((job) => (
                <motion.div key={job.title} variants={fadeUp} className="rounded-xl border border-white/8 hover:border-white/14 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-700 text-white">{job.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-600 border border-white/8 text-white/38" style={{ background: "rgba(255,255,255,0.03)" }}>{job.team}</span>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-white/28 text-xs"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-1 text-white/28 text-xs"><Clock className="w-3 h-3" />{job.type}</span>
                        <div className="flex gap-1.5">{job.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded text-[10px] border border-white/6 text-white/35" style={{ background: "rgba(255,255,255,0.04)" }}>{tag}</span>)}</div>
                      </div>
                    </div>
                    <motion.a href={`mailto:mohammed@electi.sa?subject=Application for ${encodeURIComponent(job.title)}&body=Hi,%0A%0AI'd like to apply for the ${encodeURIComponent(job.title)} role at Electi.%0A%0A`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-600 text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all whitespace-nowrap flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      data-testid={`job-apply-${job.title.replace(/\s+/g, "-").toLowerCase()}`}>
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 4 · RESUME DROP + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-20 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="rounded-2xl border border-white/8 p-8 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
              <Upload className="w-7 h-7 text-white/45" />
            </div>
            <h3 className="text-xl font-700 mb-2">Don't see your role?</h3>
            <p className="text-white/38 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              We're always looking for exceptional people. Drop your resume and we'll reach out when the right opportunity comes.
            </p>
            <div className="border-2 border-dashed border-white/8 rounded-xl p-8 mb-5 hover:border-white/16 transition-all cursor-pointer group" data-testid="resume-upload-area">
              <Upload className="w-6 h-6 text-white/18 mx-auto mb-2 group-hover:text-white/38 transition-colors" />
              <p className="text-white/28 text-sm">Drag & drop your resume here</p>
              <p className="text-white/14 text-xs mt-1">PDF, DOCX up to 10MB</p>
            </div>
            <motion.a href="mailto:mohammed@electi.sa?subject=Open%20Application%20%E2%80%94%20Resume%20Submission&body=Hi%2C%0A%0AI'd%20like%20to%20submit%20my%20resume%20for%20any%20suitable%20openings%20at%20Electi.%0A%0A"
              className="inline-block px-7 py-2.5 rounded-xl font-600 bg-white text-black text-sm hover:bg-white/90 transition-all" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              data-testid="resume-submit">
              Submit Application
            </motion.a>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
