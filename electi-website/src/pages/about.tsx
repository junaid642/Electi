import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Globe, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";
import NeonButton from "@/components/ui/NeonButton";

const ease   = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };

const timeline = [
  { year: "2023", title: "Founded",           desc: "Electi was founded in Riyadh with a vision to make AI agents accessible to every business in Saudi Arabia." },
  { year: "2024", title: "First 1,000 Users", desc: "Reached our first major milestone with 1,000 active users across Saudi Arabia and the wider GCC." },
  { year: "2025", title: "Funding Raised",    desc: "Secured investment to accelerate product development and expand across the Gulf Cooperation Council." },
  { year: "2026", title: "Global Expansion",  desc: "Expanding to 4 countries with localized AI agents trained for each major market and legal jurisdiction." },
];

const founders = [
  { name: "Abdulrhman Saeed Omar", role: "Founder & CEO",      initials: "AS", photo: "/abdulrahman.webp", tagline: "Architect of Intelligent Ecosystems", bio: "Leads Electi with a vision to redefine how businesses operate through intelligent AI ecosystems, conversational automation, and future-ready digital infrastructure. A builder at heart — turning ambitious ideas into category-defining products." },
  { name: "Junaid Ahamed Khan",    role: "Co-Founder & CTO",   initials: "JK", photo: "/junaid-khan.webp",    tagline: "Engineer of the Future",              bio: "Drives all technological innovation at Electi, combining deep expertise in AI systems, immersive technologies, automation workflows, and enterprise digital transformation. Together, they are building Electi into a next-generation AI company." },
];

const values = [
  { icon: Globe,      title: "Local Intelligence",   desc: "Built from day one for the Saudi market — legally, culturally, linguistically." },
  { icon: Target,     title: "Precision Over Fluff",  desc: "Every agent does one job exceptionally well. No bloated features. Pure utility." },
  { icon: Users,      title: "Human + AI",            desc: "AI frees people to do work only humans can do. Augmentation, not replacement." },
  { icon: TrendingUp, title: "Relentless Growth",     desc: "We ship fast, learn faster, and never stop improving what we build." },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

function FounderCard({ founder, i }: { founder: typeof founders[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.15, ease }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} className="relative">
      <motion.div className="absolute -inset-4 rounded-[2rem] pointer-events-none" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.5 }}
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
      <motion.div animate={{ y: hovered ? -6 : 0 }} transition={{ duration: 0.4, ease }}
        className="relative rounded-3xl border border-white/8 hover:border-white/18 transition-all duration-500 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.025)" }}>
        <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)" }} />
        <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-10" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }}
          initial={{ top: "0%" }} animate={hovered ? { top: ["0%", "100%"] } : { top: "0%" }} transition={{ duration: 1.2, ease: "linear" }} />

        {/* ── Portrait photo ── */}
        <div className="relative w-full overflow-hidden" style={{ height: "420px" }}>
          <img
            src={founder.photo}
            alt={founder.name}
            className="w-full h-full object-cover object-top"
            style={{ filter: "grayscale(100%) contrast(1.08) brightness(0.88)" }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.55) 75%, #050505 100%)" }} />
          <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.5 }}
            style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        </div>

        {/* ── Info ── */}
        <div className="px-8 pb-8 pt-0 -mt-6 relative z-10">
          <div className="text-center mb-5">
            <motion.h3 className="font-700 text-white text-xl sm:text-2xl mb-1" animate={{ opacity: hovered ? 1 : 0.92 }}>{founder.name}</motion.h3>
            <p className="text-white/50 text-sm font-600 tracking-widest uppercase mb-3">{founder.role}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-[10px] font-600 text-white/45 tracking-wider">{founder.tagline}</span>
            </div>
          </div>
          <div className="h-px mb-5" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />
          <p className="text-white/45 text-sm leading-relaxed text-center">{founder.bio}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({ item, i }: { item: typeof timeline[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isEven = i % 2 === 0;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: isEven ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease, delay: i * 0.1 }}
      className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${isEven ? "" : "sm:flex-row-reverse"}`}>
      <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex-shrink-0 z-10">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", boxShadow: "0 0 20px rgba(255,255,255,0.08)" }}>
          <span className="text-white text-xs font-700">{item.year.slice(2)}</span>
        </div>
      </div>
      <div className={`sm:w-[calc(50%-2.5rem)] rounded-xl p-5 border border-white/8 hover:border-white/14 transition-all ${isEven ? "" : "sm:text-end"}`} style={{ background: "rgba(255,255,255,0.025)" }}>
        <span className="text-white/50 font-700 text-xs tracking-widest uppercase">{item.year}</span>
        <h4 className="font-700 text-white mt-1.5 mb-1.5">{item.title}</h4>
        <p className="text-white/38 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
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
      <SEOHead
        title="About Electi | The Future of AI Workforce Infrastructure"
        titleAr="عن إليكتي | مستقبل بنية تحتية قوى العمل بالذكاء الاصطناعي"
        description="Learn how Electi is building the future of operational AI through intelligent agents, automation systems, and conversational workflows for modern businesses."
        descriptionAr="تعرّف على كيفية بناء إليكتي لمستقبل الذكاء الاصطناعي التشغيلي من خلال وكلاء ذكيين وأنظمة أتمتة وسير عمل محادثة."
        path="/about"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://electi.sa/#organization",
            "name": "Electi",
            "alternateName": ["إليكتي", "Electi AI"],
            "url": "https://electi.sa",
            "logo": "https://electi.sa/electi-logo-new.png",
            "description": "Electi builds AI agents for Saudi businesses — personal, billing, legal, and sales AI agents delivered via WhatsApp. Founded in Riyadh, Saudi Arabia.",
            "foundingDate": "2023",
            "foundingLocation": { "@type": "Place", "name": "Riyadh, Saudi Arabia" },
            "areaServed": [
              { "@type": "Country", "name": "Saudi Arabia" },
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "Country", "name": "Kuwait" },
              { "@type": "Country", "name": "Bahrain" },
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2413 Ad Damman Road, Ghirnath Dist., Unit No 2414",
              "addressLocality": "Riyadh",
              "postalCode": "13242-7933",
              "addressCountry": "SA",
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+966502547274",
              "email": "mohammed@electi.sa",
              "contactType": "customer service",
              "availableLanguage": ["English", "Arabic"],
            },
            "knowsAbout": [
              "AI Agents", "Conversational AI", "Business Automation",
              "WhatsApp AI", "Arabic NLP", "Saudi AI",
            ],
            "sameAs": [
              "https://www.linkedin.com/company/electi",
              "https://twitter.com/electi_sa",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://electi.sa/about",
            "name": "About Electi",
            "url": "https://electi.sa/about",
            "description": "About Electi — vision, mission, values, leadership team, and company timeline.",
            "mainEntity": { "@id": "https://electi.sa/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://electi.sa/about#abdulrhman-saeed-omar",
            "name": "Abdulrhman Saeed Omar",
            "jobTitle": "Founder & CEO",
            "worksFor": { "@id": "https://electi.sa/#organization" },
            "description": "Founder & CEO of Electi. Architect of intelligent AI ecosystems for Saudi businesses. Leads Electi's vision to make AI workforce infrastructure accessible to every business in Saudi Arabia.",
            "knowsAbout": ["AI Agents", "Business Automation", "Conversational AI", "Saudi Digital Transformation"],
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://electi.sa/about#junaid-ahamed-khan",
            "name": "Junaid Ahamed Khan",
            "jobTitle": "Co-Founder & CTO",
            "worksFor": { "@id": "https://electi.sa/#organization" },
            "description": "Co-Founder & CTO of Electi. Drives all technological innovation including AI systems, immersive technologies, automation workflows, and enterprise digital transformation.",
            "knowsAbout": ["AI Systems", "Enterprise Technology", "Automation", "Digital Transformation"],
          },
        ]}
      />
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
              <Zap className="w-3 h-3" /> Our Story
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-700 leading-tight mb-6" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
              We Build the{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Future of Work</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/42 text-xl leading-relaxed max-w-2xl mx-auto">
              Electi started with a simple question: why do brilliant people spend their days on tasks a machine could handle better, faster, and cheaper?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · VISION + MISSION + STATS ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4"><Zap className="w-3 h-3" /> Foundation</div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">Our <span style={{ color: "rgba(255,255,255,0.55)" }}>Purpose</span></h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
              {[
                { label: "Vision",  text: "Every business — from a solo founder in Riyadh to a 10,000-person enterprise — running on AI workforce infrastructure that thinks, acts, and delivers." },
                { label: "Mission", text: "Build AI agents so embedded in daily operations that running without them feels unimaginable. Indispensable. Accessible. Trusted." },
              ].map((item, i) => (
                <motion.div key={item.label} variants={fadeUp} custom={i} className="rounded-2xl border border-white/8 p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-[10px] font-600 uppercase tracking-widest text-white/28 mb-4 block">{item.label}</span>
                  <p className="text-white/60 text-lg leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-white/5">
                {[{ val: "2023", label: "Founded" }, { val: "1,200+", label: "Active users" }, { val: "4", label: "Markets" }, { val: "24/7", label: "Support" }].map(s => (
                  <div key={s.label} className="text-center px-4">
                    <div className="text-2xl sm:text-3xl font-700 text-white mb-1">{s.val}</div>
                    <div className="text-white/30 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 3 · VALUES ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-4"><Target className="w-3 h-3" /> Principles</div>
              <h2 className="text-3xl sm:text-4xl font-700 mb-3">What We <span style={{ color: "rgba(255,255,255,0.55)" }}>Believe</span></h2>
              <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} variants={fadeUp} className="rounded-xl border border-white/8 p-5 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }} whileHover={{ y: -4 }}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-5 h-5 text-white/45" />
                    </div>
                    <h4 className="font-700 text-white mb-2">{v.title}</h4>
                    <p className="text-white/38 text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 4 · FOUNDERS ══ */}
      <SnapSection>
        <div className="w-full max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-5">
              <Users className="w-3 h-3" /> Leadership
            </div>
            <h2 className="text-4xl sm:text-5xl font-700 mb-4">
              The Vision{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Behind Electi</span>
            </h2>
            <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
            <p className="text-white/38 max-w-lg mx-auto mt-5 text-sm leading-relaxed">
              Two founders. One mission. Building the intelligence layer that powers tomorrow's enterprises.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {founders.map((founder, i) => <FounderCard key={founder.name} founder={founder} i={i} />)}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }} className="mt-12 text-center">
            <p className="text-white/30 text-sm mb-4">Want to build alongside them?</p>
            <Link href="/careers">
              <NeonButton variant="ghost" size="md">See Open Roles →</NeonButton>
            </Link>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 5 · TIMELINE + FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-700 mb-3">
              Our <span style={{ color: "rgba(255,255,255,0.55)" }}>Journey</span>
            </motion.h2>
            <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px hidden sm:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)" }} />
            <div className="space-y-12">
              {timeline.map((item, i) => <TimelineItem key={item.year} item={item} i={i} />)}
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
