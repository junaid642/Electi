import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Users, ShieldCheck, CheckCircle, BarChart2, ArrowRight, Activity, Zap } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";

const ease   = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const steps = [
  {
    step: "01", icon: MessageCircle, title: "Connect WhatsApp",    highlight: "< 60 seconds",       desc: "Link your WhatsApp Business number in a single tap. No code, no complexity. Live in under 60 seconds.",             detail: "One-tap OAuth. No developer required. Works with personal and business numbers.",
    visual: (
      <div className="rounded-xl p-4 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}><MessageCircle className="w-3.5 h-3.5 text-white/55" /></div>
          <div><div className="text-white text-[11px] font-600">WhatsApp Connected</div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse inline-block" /><span className="text-white/30 text-[9px]">Active · +966 5X XXX XXXX</span></div></div>
        </div>
        <div className="rounded-lg p-2 border border-white/5 text-[10px] text-white/45" style={{ background: "rgba(255,255,255,0.03)" }}>✓ Authorization complete. Electi is now listening.</div>
      </div>
    ),
  },
  {
    step: "02", icon: Users, title: "Choose Your Agents",   highlight: "4 agents, 1 platform",  desc: "Choose from four specialized AI agents — Personal, Billing, Legal, or Sales. Deploy one or all. Each configures independently to your exact workflow.", detail: "Mix and match. Scale at any time. Each agent runs independently.",
    visual: (
      <div className="space-y-2">
        {[{ label: "Personal Agent", active: true }, { label: "Billing Agent", active: true }, { label: "Legal Agent", active: false }, { label: "Sales Agent", active: true }].map(a => (
          <div key={a.label} className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${a.active ? "border-white/14" : "border-white/5"}`} style={{ background: a.active ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.01)" }}>
            <span className={`text-[11px] font-500 ${a.active ? "text-white/70" : "text-white/25"}`}>{a.label}</span>
            <div className={`w-2 h-2 rounded-full ${a.active ? "bg-white/60 animate-pulse" : "bg-white/15"}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "03", icon: ShieldCheck, title: "Grant Secure Access",  highlight: "AES-256 encrypted",     desc: "Connect your tools — Google, calendar, billing systems. AES-256 encrypted. Your data stays yours. We never train on your content.",               detail: "SOC 2 Type II compliant. Zero data retention policy. Revoke access instantly.",
    visual: (
      <div className="rounded-xl p-4 border border-white/10 space-y-2" style={{ background: "rgba(255,255,255,0.04)" }}>
        {["Email (Gmail/Outlook)", "Calendar (Google/iCal)", "Billing (QuickBooks/SAP)"].map(tool => (
          <div key={tool} className="flex items-center gap-2.5 rounded-lg px-3 py-2 border border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <ShieldCheck className="w-3 h-3 text-white/40 flex-shrink-0" />
            <span className="text-white/55 text-[10px]">{tool}</span>
            <span className="ml-auto text-[9px] text-white/30 border border-white/8 rounded px-1.5 py-0.5">Secure</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "04", icon: CheckCircle, title: "Your AI Agent is Ready", highlight: "24/7 autonomous",     desc: "Your agent works 24/7 — processing requests, answering legal questions, managing reservations, sending invoices. All on WhatsApp.",                detail: "Processes thousands of tasks simultaneously. Learns your preferences over time.",
    visual: (
      <div className="rounded-2xl p-6 border border-white/10 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center" style={{ background: "rgba(74,222,128,0.08)" }}><CheckCircle className="w-5 h-5" style={{ color: "#4ade80" }} /></div>
        <div><h3 className="text-white font-700 text-base mb-1.5">Your AI Agent is Ready</h3><p className="text-white/40 text-sm leading-relaxed">Your agent works as an assistant 24/7 — everything on WhatsApp.</p></div>
        <div className="flex flex-wrap gap-2 pt-1">{["Personal", "Invoice", "Legal", "Sales"].map(a => <span key={a} className="px-2.5 py-1 rounded-lg text-[10px] font-600 border border-white/8 text-white/40" style={{ background: "rgba(255,255,255,0.03)" }}>{a}</span>)}</div>
      </div>
    ),
  },
  {
    step: "05", icon: BarChart2, title: "Monitor Everything",   highlight: "Real-time dashboard",  desc: "Track every action, outcome, and hour saved across all agents. One dashboard for preferences, logs, and ROI — updated in real time.",              detail: "Weekly reports, usage analytics, ROI calculator. Export data anytime.",
    visual: (
      <div className="rounded-xl p-4 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="grid grid-cols-3 gap-2 mb-3">{[{ val: "1,247", label: "Tasks" }, { val: "86h", label: "Saved" }, { val: "99.9%", label: "Uptime" }].map(s => (
          <div key={s.label} className="rounded-lg p-2 text-center border border-white/5" style={{ background: "rgba(255,255,255,0.04)" }}><div className="text-white text-xs font-700">{s.val}</div><div className="text-white/25 text-[9px]">{s.label}</div></div>
        ))}</div>
        <div className="flex items-end gap-1 h-8">{[60,80,50,90,70,95,75,88,65,92].map((h, i) => (
          <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 + 0.5 }} style={{ height: `${h}%`, originY: 1 }} className="flex-1 rounded-t bg-white/14" />
        ))}</div>
      </div>
    ),
  },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={isEven ? "" : "md:order-2"}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Icon className="w-5 h-5 text-white/60" />
            </div>
            <div className="text-white/22 text-4xl font-700 leading-none tabular-nums">{step.step}</div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-700 text-white mb-3">{step.title}</h2>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-600 border border-white/10 text-white/45 mb-4" style={{ background: "rgba(255,255,255,0.03)" }}>{step.highlight}</span>
          <p className="text-white/45 text-sm leading-relaxed mb-4">{step.desc}</p>
          <p className="text-white/28 text-xs leading-relaxed">{step.detail}</p>
          {index < steps.length - 1 && (
            <div className="flex items-center gap-2 mt-5 text-xs text-white/22">
              <ArrowRight className="w-3.5 h-3.5" /> Next: Step {String(index + 2).padStart(2, "0")}
            </div>
          )}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease }} className={`relative ${isEven ? "" : "md:order-1"}`}>
          <div className="relative rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.025)" }}>
            <div className="absolute top-4 right-5 text-6xl font-700 text-white/3 select-none leading-none">{step.step}</div>
            {step.visual}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse flex-shrink-0" /><span className="text-white/25 text-[10px]">Step {step.step} — {step.title}</span></div>
              <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} initial={{ width: "0%" }} animate={inView ? { width: `${(index + 1) * 20}%` } : {}} transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
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
      <SEOHead title="How Electi Works | AI Workforce Platform" titleAr="كيف تعمل إليكتي | منصة قوى العمل بالذكاء الاصطناعي" description="See how Electi deploys AI agents and conversational workflows to automate business operations in minutes — no code required, full WhatsApp integration." descriptionAr="اكتشف كيف تنشر إليكتي وكلاء الذكاء الاصطناعي وسير العمل المحادثاتي لأتمتة عمليات الأعمال في دقائق بدون برمجة." path="/how-it-works" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(66,133,244,0.07) 0%,transparent 65%)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
              <Activity className="w-3 h-3" /> The Process
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-700 leading-tight mb-5" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
              Up & Running in{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Minutes</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Five steps to a fully operational AI workforce.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · STEPS 01–02 ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-5xl mx-auto space-y-16">
          {steps.slice(0, 2).map((step, i) => <StepCard key={step.step} step={step} index={i} />)}
        </div>
      </SnapSection>

      {/* ══ 3 · STEPS 03–04 ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-5xl mx-auto space-y-16">
          {steps.slice(2, 4).map((step, i) => <StepCard key={step.step} step={step} index={i + 2} />)}
        </div>
      </SnapSection>

      {/* ══ 4 · STEP 05 + CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 pt-20 pb-10 max-w-5xl mx-auto">
          <StepCard step={steps[4]} index={4} />
        </div>

        <div className="px-4 py-16 text-center border-t border-white/5">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-700 mb-4">Deploy Your AI Workforce</h2>
            <p className="text-white/38 mb-8 text-sm">Join 1,200+ businesses already running on Electi.</p>
            <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
              <motion.button className="px-9 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all" style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} data-testid="hiw-cta">
                Start Free — No Credit Card
              </motion.button>
            </a>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
