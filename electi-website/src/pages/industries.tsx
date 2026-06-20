import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, Users, Shield, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type AgentKey = "Personal" | "Invoice" | "Legal" | "Sales";

const agentPillBg: Record<AgentKey, string> = {
  Personal: "rgba(74,222,128,0.18)",
  Invoice:  "rgba(96,165,250,0.18)",
  Legal:    "rgba(245,158,11,0.18)",
  Sales:    "rgba(167,139,250,0.18)",
};
const agentPillFg: Record<AgentKey, string> = {
  Personal: "#4ade80",
  Invoice:  "#60a5fa",
  Legal:    "#f59e0b",
  Sales:    "#a78bfa",
};

const industries = [
  { icon: Activity,   label: "Healthcare",  href: "/industries/healthcare",  description: "Patient scheduling, billing & communications — fully automated.", metric: "60% FEWER NO-SHOWS",       agents: ["Personal", "Invoice", "Legal"] as AgentKey[] },
  { icon: Globe,      label: "Real Estate", href: "/industries/real-estate", description: "Lead qualification, viewings & contracts — all via WhatsApp.",    metric: "3× FASTER DEAL CLOSE",     agents: ["Personal", "Sales", "Invoice"] as AgentKey[] },
  { icon: Users,      label: "Hospitality", href: "/industries/hospitality", description: "AI concierge handling reservations, guests & reviews at scale.",   metric: "35% MORE 5-STAR REVIEWS",  agents: ["Personal", "Sales", "Invoice"] as AgentKey[] },
  { icon: TrendingUp, label: "Luxury",      href: "/industries/luxury",      description: "VIP coordination, elite concierge & private client management.",  metric: "24/7 ELITE SERVICE",       agents: ["Personal", "Sales"] as AgentKey[] },
  { icon: Shield,     label: "Construction",href: "/industries/construction", description: "Contractor coordination, compliance docs & project billing.",      metric: "40H SAVED PER PROJECT",    agents: ["Legal", "Invoice", "Personal"] as AgentKey[] },
  { icon: BarChart3,  label: "Enterprise",  href: "/industries/corporate",   description: "Operational AI workflows across HR, Legal, Finance & Sales.",      metric: "COMPANY-WIDE AUTOMATION",  agents: ["Legal", "Personal", "Invoice"] as AgentKey[] },
];

const agentsData = [
  { color: "#4ade80", label: "Personal Agent",     desc: "Scheduling · Email · Reminders",   href: "/agents/personal" },
  { color: "#60a5fa", label: "Invoice Agent",       desc: "Billing · OCR · Expense tracking", href: "/agents/billing"  },
  { color: "#f59e0b", label: "Legal Agent",         desc: "Compliance · Visas · Labor law",   href: "/agents/legal"    },
  { color: "#a78bfa", label: "Sales & Reservation", desc: "CRM · Bookings · Lead ops",        href: "/agents/sales"    },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export default function Industries() {
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
      <SEOHead title="AI Solutions for Real Estate, Hospitality & Enterprise | Electi" titleAr="حلول الذكاء الاصطناعي للعقارات والضيافة والمؤسسات | إليكتي" description="Electi transforms industries through conversational AI, WhatsApp automation, operational intelligence, and enterprise AI workflows across GCC markets." descriptionAr="تحوّل إليكتي الصناعات من خلال الذكاء الاصطناعي المحادثاتي وأتمتة واتساب والذكاء التشغيلي وسير عمل الذكاء الاصطناعي للمؤسسات." path="/industries" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(66,133,244,0.07) 0%,transparent 65%)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
              <Globe className="w-3 h-3" /> Industry Solutions
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-700 leading-tight mb-5" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
              AI Built for{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Your World</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Every industry has unique workflows. Electi adapts to them — not the other way around.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · INDUSTRY CARDS ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.label} variants={fadeUp}>
                  <Link href={ind.href}>
                    <motion.div className="rounded-2xl border p-5 flex flex-col gap-4 cursor-pointer h-full"
                      style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.08)" }}
                      whileHover={{ borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 0 32px rgba(255,255,255,0.04)" }}
                      transition={{ duration: 0.25 }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <Icon style={{ width: 18, height: 18 }} className="text-white/60" />
                        </div>
                        <span className="font-700 text-base text-white">{ind.label}</span>
                      </div>
                      <p className="text-white/42 text-sm leading-relaxed">{ind.description}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
                        <span className="text-[10px] font-600 uppercase tracking-wider text-white/25">{ind.metric}</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {ind.agents.map(a => (
                            <span key={a} className="text-[10px] font-600 px-2 py-0.5 rounded-full" style={{ background: agentPillBg[a], color: agentPillFg[a] }}>{a}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 3 · AGENT STRIP + CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-10 max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-600 uppercase tracking-[0.3em] text-white/22 mb-7">Powered by 4 Intelligent Agents</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {agentsData.map((agent) => (
              <Link key={agent.label} href={agent.href}>
                <motion.div className="rounded-2xl border p-5 cursor-pointer flex flex-col h-full"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.15)", y: -2, boxShadow: `0 0 22px ${agent.color}18` }}
                  transition={{ duration: 0.22 }}>
                  <div className="w-2.5 h-2.5 rounded-full mb-4" style={{ background: agent.color, boxShadow: `0 0 8px ${agent.color}90` }} />
                  <p className="text-sm font-700 text-white leading-tight mb-2">{agent.label}</p>
                  <p className="text-[11px] text-white/32 leading-relaxed">{agent.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-16 text-center border-t border-white/5">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-700 mb-4">Don't see your industry?</h2>
            <p className="text-white/38 mb-8 leading-relaxed text-sm">Electi can be customized for any workflow. Talk to our team to build a tailored solution.</p>
            <Link href="/contact">
              <motion.button className="px-9 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all" style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                Contact Us
              </motion.button>
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
