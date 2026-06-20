import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Receipt, Scale, BarChart3, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

const ease   = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const agents = [
  { icon: MessageCircle, phoneIndex: 0 as 0|1|2|3, title: "Personal Agent",       href: "/agents/personal", tagline: "Your intelligent daily companion",         description: "Available 24/7 via WhatsApp. Manages communications, automates your calendar, and ensures nothing falls through.",       features: ["WhatsApp assistant integration","Email access and management","Calendar automation & scheduling","Smart context-aware reminders","Meeting summaries & follow-ups","Priority inbox filtering"],          useCases: ["Executive assistants","Business owners","Freelancers","Remote teams"] },
  { icon: Receipt,        phoneIndex: 1 as 0|1|2|3, title: "Invoice Agent",        href: "/agents/billing",  tagline: "Zero-touch invoice management",             description: "Eliminates manual invoice processing. Scans bills with OCR, converts them digitally, tracks expenses.",               features: ["AI-powered OCR bill scanning","Digital invoice conversion","Automated expense tracking","Payment reminder system","Financial report generation","Multi-currency support"],                         useCases: ["Finance teams","Accounting firms","SMBs","Freelancers"] },
  { icon: Scale,          phoneIndex: 2 as 0|1|2|3, title: "Legal Agent",          href: "/agents/legal",    tagline: "Expert legal guidance on demand",           description: "Instant access to legal information tailored for Saudi Arabia. From visa applications to labor law.",                   features: ["Saudi labor law guidance","Visa & iqama assistance","Contract review support","Document template generation","Regulatory compliance checks","HR policy assistance"],                               useCases: ["HR departments","Law firms","Expat workers","Startups"] },
  { icon: BarChart3,      phoneIndex: 3 as 0|1|2|3, title: "Sales & Reservation",  href: "/agents/sales",    tagline: "Close deals while you sleep",               description: "Handles customer inquiries, manages reservations, and nurtures leads through WhatsApp — 24/7.",                     features: ["Automated reservation handling","CRM workflow integration","WhatsApp customer support","Lead capture & nurturing","Sales pipeline reporting","Follow-up automation"],                              useCases: ["Restaurants","Hotels","Real estate agencies","Clinics"] },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

function AgentSection({ agent }: { agent: typeof agents[0] }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon  = agent.icon;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease }}
      className="rounded-2xl border border-white/8 hover:border-white/13 transition-all w-full" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                <Icon className="w-6 h-6 text-white/65" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-700 text-white mb-2">{agent.title}</h2>
            <p className="text-white/42 text-sm font-500 mb-3">{agent.tagline}</p>
            <p className="text-white/32 text-sm leading-relaxed mb-7">{agent.description}</p>
            <div className="mb-7">
              <h4 className="text-white/25 text-[10px] font-600 uppercase tracking-widest mb-3">Capabilities</h4>
              <ul className="grid grid-cols-2 gap-2">
                {agent.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/55">
                    <CheckCircle className="w-3 h-3 text-white/28 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-7">
              <h4 className="text-white/25 text-[10px] font-600 uppercase tracking-widest mb-3">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {agent.useCases.map(uc => <span key={uc} className="px-3 py-1 rounded-lg border border-white/8 text-white/45 text-xs" style={{ background: "rgba(255,255,255,0.03)" }}>{uc}</span>)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={agent.href}>
                <motion.button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 bg-white text-black transition-all" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} data-testid={`agent-cta-${agent.title.split(" ")[0].toLowerCase()}`}>
                  Explore Agent <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 border border-white/12 text-white/60 hover:text-white hover:border-white/22 transition-all" style={{ background: "rgba(255,255,255,0.03)" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  Talk to an Expert
                </motion.button>
              </Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease }} className="flex items-center justify-center">
            <AgentPhone index={agent.phoneIndex} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Agents() {
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
      <SEOHead title="AI Agents | Electi" titleAr="وكلاء الذكاء الاصطناعي | إليكتي" description="Discover AI-powered agents for operations, billing, legal workflows, and sales automation — all accessible via WhatsApp for modern businesses." descriptionAr="اكتشف وكلاء مدعومين بالذكاء الاصطناعي للعمليات والفواتير وسير العمل القانوني وأتمتة المبيعات عبر واتساب." path="/agents" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(66,133,244,0.08) 0%,transparent 65%)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
              <Zap className="w-3 h-3" /> Specialized AI Agents
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-700 mb-5 leading-tight" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
              Your AI{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Workforce</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Four specialized agents. One unified platform. Each trained for a specific domain — always on, always learning.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · AGENTS 1 + 2 ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          {agents.slice(0, 2).map(agent => <AgentSection key={agent.title} agent={agent} />)}
        </div>
      </SnapSection>

      {/* ══ 3 · AGENTS 3 + 4 ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          {agents.slice(2, 4).map(agent => <AgentSection key={agent.title} agent={agent} />)}
        </div>
      </SnapSection>

      {/* ══ 4 · CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 py-20 text-center border-t border-white/5">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-700 mb-4">Deploy Your AI Workforce</h2>
            <p className="text-white/38 mb-8 leading-relaxed text-sm">Start with one agent or all four. No setup fees. No credit card.</p>
            <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
              <motion.button className="px-9 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all" style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} data-testid="agents-page-cta">
                Start Free Today <ArrowRight className="inline w-4 h-4 ml-1.5" />
              </motion.button>
            </a>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
