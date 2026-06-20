import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLang } from "@/contexts/LanguageContext";
import SEOHead from "@/components/seo/SEOHead";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };

const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

function InViewDiv({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export interface IndustryFeature  { icon: LucideIcon; title: string; desc: string; }
export interface AgentSpotlight   { title: string; href: string; icon: LucideIcon; tagline: string; bullets: string[]; ctaLabel?: string; ctaHref?: string; }
export interface WorkflowStep     { n: string; title: string; desc: string; }
export interface IndustryStat     { value: string; label: string; }

export interface IndustrySubpageProps {
  badge: string;
  industryIcon: LucideIcon;
  title: string;
  titleAccent?: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  stats: IndustryStat[];
  features: IndustryFeature[];
  agents: AgentSpotlight[];
  workflow: WorkflowStep[];
  DashboardVisual: React.ComponentType;
  ctaTitle: string;
  ctaSub: string;
  seoTitle?: string;
  seoDescription?: string;
  seoPath?: string;
}

export default function IndustrySubpage({
  badge, industryIcon: IndustryIcon, title, titleAccent, tagline, description,
  challenge, solution, stats, features, agents, workflow,
  DashboardVisual, ctaTitle, ctaSub,
  seoTitle, seoDescription, seoPath,
}: IndustrySubpageProps) {
  const { t, isAr } = useLang();
  const dir           = isAr ? -1 : 1;
  const [, navigate]  = useLocation();

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
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead title={seoTitle} description={seoDescription} path={seoPath} />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 40px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle,rgba(52,168,83,0.06) 0%,transparent 65%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
              <Link href="/industries">
                <span className="text-white/25 text-sm hover:text-white/50 transition-colors cursor-pointer">{t("industriesBreadcrumb")}</span>
              </Link>
              <ChevronRight className={`w-3.5 h-3.5 text-white/15 ${isAr ? "rotate-180" : ""}`} />
              <span className="text-white/45 text-sm">{badge}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <IndustryIcon className="w-3 h-3" />{badge}
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-700 leading-[1.05] tracking-tight mb-5" style={{ fontSize: "clamp(2.6rem,5.5vw,4.2rem)" }}>
              {title}{titleAccent && (<><br /><span style={{ color: "rgba(255,255,255,0.55)" }}>{titleAccent}</span></>)}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/42 text-base leading-relaxed mb-3 max-w-md font-500">{tagline}</motion.p>
            <motion.p variants={fadeUp} className="text-white/30 text-sm leading-relaxed mb-8 max-w-md">{description}</motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-9">
              <Link href="/contact">
                <motion.button className="px-6 py-3 rounded-xl font-600 bg-white text-black transition-all flex items-center gap-2"
                  style={{ boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  {t("requestDemo")} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-7">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-700 text-white">{s.value}</div>
                  <div className="text-white/28 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 * dir, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease }} className="relative">
            <div className="animate-float-slow"><DashboardVisual /></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ 2 · CHALLENGE / SOLUTION + FEATURES ══ */}
      <SnapSection>
        <div className="w-full max-w-7xl mx-auto space-y-14">
          <InViewDiv>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
              {[{ key: "challenge", label: t("theChallenge"), text: challenge }, { key: "solution", label: t("theElectiSolution"), text: solution }].map((item) => (
                <motion.div key={item.key} variants={fadeUp}>
                  <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="rounded-2xl border border-white/8 h-full bg-[#050505]">
                    <div className="p-7">
                      <span className="text-[10px] uppercase tracking-widest font-600 text-white/28 mb-4 block">{item.label}</span>
                      <p className="text-white/55 text-base leading-relaxed">{item.text}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </InViewDiv>

          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-3xl font-700 mb-3">
                AI-Powered for <span style={{ color: "rgba(255,255,255,0.55)" }}>{badge}</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} variants={fadeUp} custom={i}>
                    <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="rounded-2xl border border-white/8 hover:border-white/14 transition-all h-full bg-[#050505]">
                      <div className="p-6 h-full flex flex-col">
                        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <Icon className="w-5 h-5 text-white/55" />
                        </div>
                        <h3 className="font-700 text-white mb-2">{f.title}</h3>
                        <p className="text-white/35 text-sm leading-relaxed flex-1">{f.desc}</p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </SnapSection>

      {/* ══ 3 · AGENTS ══ */}
      <SnapSection>
        <div className="w-full max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                Recommended <span style={{ color: "rgba(255,255,255,0.55)" }}>Agents</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div key={agent.title} variants={fadeUp} custom={i}>
                    <div onClick={() => navigate(agent.href)} style={{ cursor: "pointer" }}>
                      <motion.div className="rounded-2xl border cursor-pointer p-5 flex flex-col h-full"
                        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
                        whileHover={{ borderColor: "rgba(255,255,255,0.22)", boxShadow: "0 0 32px rgba(255,255,255,0.06)" }}
                        transition={{ duration: 0.3 }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                          <Icon className="w-4 h-4 text-white/60" />
                        </div>
                        <h3 className="font-700 text-sm text-white mb-1">{agent.title}</h3>
                        <p className="text-white/32 text-xs mb-3 leading-relaxed">{agent.tagline}</p>
                        <ul className="space-y-1.5 mb-4 flex-1">
                          {agent.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-xs text-white/45">
                              <span className="w-1 h-1 rounded-full flex-shrink-0 bg-white/30" />{b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-4">
                          <motion.div className="flex items-stretch rounded-xl overflow-hidden text-xs font-600" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                            <a href={agent.ctaHref ?? "https://app.electi.sa/login"} target="_self" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1">
                              <motion.div className="flex items-center justify-center gap-1.5 py-2.5 px-3 cursor-pointer h-full font-700 text-black"
                                style={{ background: "rgba(255,255,255,0.88)" }}
                                whileHover={{ background: "rgba(255,255,255,1)" }} whileTap={{ scale: 0.97 }}>
                                {agent.ctaLabel ?? t("getStartedFree")}
                              </motion.div>
                            </a>
                            <div className="w-px flex-shrink-0 bg-white/12" />
                            <motion.div className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-white/35 cursor-pointer flex-1"
                              whileHover={{ color: "rgba(255,255,255,0.9)" }} whileTap={{ scale: 0.97 }}>
                              {t("learnMore")} <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isAr ? "rotate-180" : ""}`} />
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </SnapSection>

      {/* ══ 4 · WORKFLOW + CTA + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <InViewDiv>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">
                Your Automated <span style={{ color: "rgba(255,255,255,0.55)" }}>Workflow</span>
              </h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="relative">
              <div className="absolute top-8 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent hidden lg:block" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {workflow.map((step, i) => (
                  <motion.div key={step.n} variants={fadeUp} custom={i}>
                    <div className="rounded-2xl p-5 border border-white/7 hover:border-white/13 transition-all h-full relative overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="absolute -top-4 -right-3 text-7xl font-700 text-white/[0.025] select-none leading-none pointer-events-none">{step.n}</div>
                      <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        <span className="text-white/55 font-700 text-xs">{step.n}</span>
                      </div>
                      <h3 className="font-700 text-white text-sm mb-1.5">{step.title}</h3>
                      <p className="text-white/32 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InViewDiv>
        </div>

        <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="text-3xl sm:text-4xl font-700 mb-4">{ctaTitle}</h2>
              <p className="text-white/38 mb-8 leading-relaxed">{ctaSub}</p>
              <div className="flex justify-center">
                <Link href="/contact">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all"
                    style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    {t("talkToExpert")}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
