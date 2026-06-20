"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, type ReactNode } from "react";
import { Zap, Globe, Users, Target, TrendingUp, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { GlobalPresenceGlobe } from "@/components/ui/GlobalPresenceGlobe";
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GlowRule from "@/components/ui/GlowRule";
import { useLang } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const GLOW_RGB = "255,255,255";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }} className={className}>{children}</motion.div>
  );
}
function FadeIn({ children, delay = 0, className = "", style }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay }} className={className} style={style}>{children}</motion.div>
  );
}
function Snap({ children, id, className = "", style = {} }: { children: ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100dvh", flexShrink: 0, background: "#000", paddingTop: "clamp(64px,9dvh,80px)", paddingBottom: "clamp(16px,3dvh,28px)", ...style }}>
      {children}
    </section>
  );
}
function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase"
      style={{ background: `rgba(${GLOW_RGB},0.07)`, border: `1px solid rgba(${GLOW_RGB},0.18)`, color: `rgba(${GLOW_RGB},0.75)` }}>
      {children}
    </span>
  );
}
function Glow({ x = "50%", y = "45%", size = "80vw", intensity = 0.10 }: { x?: string; y?: string; size?: string; intensity?: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ top: y, left: x, transform: "translate(-50%,-50%)", width: size, height: size,
        background: `radial-gradient(ellipse, rgba(${GLOW_RGB},${intensity}) 0%, transparent 65%)` }} />
  );
}
function Grid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
  );
}

const founders = [
  {
    name: "Abdulrhman Alyemeeni",
    initials: "AS",
    photo: "/x360/abdulrahman.webp",
    roleEn: "Founder & CEO",
    roleAr: "المؤسس والرئيس التنفيذي",
    taglineEn: "Architect of Digital Experiences",
    taglineAr: "مهندس التجارب الرقمية",
    bioEn: "Leads X360 with a vision to transform how businesses present themselves in the digital world — through immersive 360° virtual tours, intelligent web solutions, and next-generation digital infrastructure.",
    bioAr: "يقود X360 برؤية لتحويل طريقة تقديم الشركات لنفسها في العالم الرقمي — عبر جولات افتراضية 360° غامرة وحلول ويب ذكية وبنية تحتية رقمية من الجيل التالي.",
  },
  {
    name: "Junaid Ahamed Khan",
    initials: "JK",
    photo: "/x360/junaid-khan.webp",
    roleEn: "Co-Founder & CTO",
    roleAr: "المؤسس المشارك والمدير التقني",
    taglineEn: "Engineer of the Future",
    taglineAr: "مهندس المستقبل",
    bioEn: "Drives all technological innovation at X360, combining deep expertise in immersive technologies, AI systems, web development, and enterprise digital transformation.",
    bioAr: "يقود جميع الابتكارات التقنية في X360، جامعاً خبرة عميقة في التقنيات الغامرة وأنظمة الذكاء الاصطناعي وتطوير الويب والتحول الرقمي للمؤسسات.",
  },
];

const values = [
  { icon: Globe,      titleEn: "Local Intelligence",    titleAr: "ذكاء محلي",         descEn: "Built from day one for the Saudi market — culturally aware, locally trusted, regionally connected.",  descAr: "مبني منذ اليوم الأول للسوق السعودية — واعٍ ثقافياً، موثوق محلياً، متصل إقليمياً." },
  { icon: Target,     titleEn: "Precision Craft",       titleAr: "صناعة بدقة",         descEn: "Every project is executed to the highest standard. No shortcuts. Pure quality.",                      descAr: "كل مشروع يُنفَّذ وفق أعلى المعايير. لا اختصارات. جودة خالصة." },
  { icon: Users,      titleEn: "Client-Centric",        titleAr: "مركزية العميل",       descEn: "We measure success by our clients' results. Outcomes matter more than outputs.",                      descAr: "نقيس النجاح بنتائج عملائنا. المخرجات الحقيقية أهم من الأعمال المُسلَّمة." },
  { icon: TrendingUp, titleEn: "Relentless Innovation", titleAr: "ابتكار لا يتوقف",    descEn: "We ship fast, learn faster, and never stop pushing the boundaries of what's possible.",             descAr: "نُسلّم بسرعة، ونتعلم بشكل أسرع، ولا نتوقف عن توسيع حدود الممكن." },
];

function FounderCard({ founder, i, isAr, compact }: { founder: typeof founders[0]; i: number; isAr: boolean; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const role    = isAr ? founder.roleAr    : founder.roleEn;
  const tagline = isAr ? founder.taglineAr : founder.taglineEn;
  const bio     = isAr ? founder.bioAr     : founder.bioEn;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.14, ease }}
      className={compact ? undefined : "h-full"}>
      <SpotlightCard glowColor="rgba(255,255,255,0.08)" className={`rounded-2xl overflow-hidden ${compact ? "" : "h-full"}`}>
        <div className={`flex flex-col rounded-2xl overflow-hidden ${compact ? "" : "h-full"}`} style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.025)" }}>

          {/* ── Large portrait photo ── */}
          <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: "clamp(200px, 26vh, 280px)" }}>
            {"photo" in founder && founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top"
                style={{ filter: "grayscale(18%) contrast(1.04)" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-white/30 text-4xl font-thin" style={{ fontFamily: "Quicksand,sans-serif" }}>{founder.initials}</span>
              </div>
            )}
            {/* bottom gradient fade into card body */}
            <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,5,0.92))" }} />
            {/* tagline badge — floated over image bottom */}
            <div className="absolute bottom-3 start-4">
              <span className="px-2.5 py-1 rounded-full text-[8px] tracking-[0.18em] uppercase"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)" }}>
                {tagline}
              </span>
            </div>
          </div>

          {/* ── Card body ── */}
          <div className="flex flex-col gap-3 p-5 flex-1">
            <div>
              <h3 className="font-thin text-white leading-snug" style={{ fontSize: "clamp(0.98rem, 1.3vw, 1.12rem)", letterSpacing: "0.06em", fontFamily: "Quicksand,sans-serif" }}>
                {founder.name}
              </h3>
              <p className="text-[9.5px] font-semibold tracking-[0.20em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>{role}</p>
            </div>
            <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <p className="text-white/36 leading-relaxed flex-1" style={{ fontSize: "0.77rem", lineHeight: 1.75 }}>{bio}</p>
          </div>

        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function AboutClient() {
  const { t, isAr } = useLang();
  const ta = t.about;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => window.dispatchEvent(new CustomEvent("x360:snapscroll", { detail: { scrollTop: el.scrollTop } }));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollRef} style={{ height: "100dvh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}>
      <style>{`::-webkit-scrollbar{display:none}`}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════ */}
      <Snap id="hero">
        <Grid />
        <Glow x="50%" y="44%" size="90vw" intensity={0.12} />
        <motion.div className="absolute rounded-full pointer-events-none border"
          style={{ width: 600, height: 600, top: "50%", left: "50%", x: "-50%", y: "-50%", borderColor: `rgba(${GLOW_RGB},0.05)` }}
          animate={{ scale: [1,1.12,1], opacity: [0.3,0.07,0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-7">
          <FadeUp delay={0.05}>
            <Badge><Zap className="w-3 h-3 inline me-1" />{ta.badge}</Badge>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-thin leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
              {isAr ? ta.heroTitle : <>We Build the <span className="shimmer-text">Future of Vision</span></>}
            </h1>
          </FadeUp>
          <FadeUp delay={0.22}><GlowRule /></FadeUp>
          <FadeUp delay={0.28}>
            <p className="text-white/42 max-w-xl" style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.96rem)", letterSpacing: "0.04em", lineHeight: 1.75, fontFamily: "Quicksand, sans-serif" }}>
              {ta.heroSub}
            </p>
          </FadeUp>
          <FadeUp delay={0.36}>
            <Link href="/contact">
              <motion.button className="relative overflow-hidden rounded-xl px-7 py-2.5 text-sm font-semibold tracking-wide text-black flex items-center gap-2"
                style={{ background: "#ffffff" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 10px rgba(255,255,255,0.10)","0 0 28px rgba(255,255,255,0.28)","0 0 10px rgba(255,255,255,0.10)"] }}
                transition={{ duration: 2.8, repeat: Infinity }}>
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%)" }}
                  animate={{ x: ["-100%","220%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }} />
                <span className="relative z-10">{isAr ? "تواصل معنا" : "Contact Us"}</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 2. VISION + MISSION + STATS ══════════════════════════════════ */}
      <Snap id="story">
        <Grid />
        <Glow x="30%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Left — Vision & Mission */}
          <div className="flex flex-col gap-6 lg:w-[55%]">
            <FadeUp delay={0.05}><Badge>{isAr ? "قصتنا" : "Our Story"}</Badge></FadeUp>
            <FadeUp delay={0.12}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {isAr ? "رؤيتنا ومهمتنا" : "Our Vision & Mission"}
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}><div style={{ width: "clamp(80px,14vw,160px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)" }} /></FadeUp>
            <div className="flex flex-col gap-4">
              {[
                { label: isAr ? "رؤيتنا" : "Vision",  text: isAr ? "كل عمل تجاري يعمل بأدوات التحول الرقمي التي تجعله يتميز ويتصدر." : "Every business — from a solo founder in Riyadh to a 10,000-person enterprise — running on digital transformation tools that set them apart and put them ahead." },
                { label: isAr ? "مهمتنا" : "Mission", text: ta.missionP1 },
              ].map((item, i) => (
                <FadeUp key={item.label} delay={0.24 + i * 0.08}>
                  <div className="rounded-xl px-5 py-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</span>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <FadeIn delay={0.2} className="lg:w-[40%] w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "2019",  label: isAr ? "تأسست" : "Founded"          },
                { val: "200+",  label: ta.statProjects                       },
                { val: "50+",   label: ta.statClients                        },
                { val: "15+",   label: isAr ? "قطاعاً" : "Industries Served" },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease }}
                  className="flex flex-col items-center justify-center rounded-2xl py-7"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-thin text-white" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontFamily: "Quicksand,sans-serif" }}>{s.val}</span>
                  <span className="text-[10px] tracking-wide mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

        </div>
      </Snap>

      {/* ══ 3a. TEAM INTRO — mobile only ════════════════════════════════ */}
      <Snap id="team-intro" className="lg:hidden">
        <Grid />
        <Glow x="65%" y="50%" size="70vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5 px-6">
          <FadeUp delay={0.05}><Badge><Users className="w-3 h-3 inline me-1" />{isAr ? "القيادة" : "Leadership"}</Badge></FadeUp>
          <FadeUp delay={0.13}>
            <h2 className="font-thin leading-tight text-center" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
              {isAr ? <>الرؤية <span className="shimmer-text">خلف X360</span></> : <>The Vision <span className="shimmer-text">Behind X360</span></>}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}><div style={{ width: "clamp(80px,14vw,160px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)" }} /></FadeUp>
          <FadeUp delay={0.26}>
            <p className="text-center" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>
              {isAr ? "مؤسسان. مهمة واحدة. بناء طبقة التجارب الرقمية التي تقود مؤسسات الغد." : "Two founders. One mission. Building the digital experience layer that powers tomorrow's enterprises."}
            </p>
          </FadeUp>
        </div>
      </Snap>

      {/* ══ 3b. FOUNDER 1 — mobile only ══════════════════════════════════ */}
      <Snap id="team-founder-0" className="lg:hidden">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col items-stretch justify-center px-4 py-14">
          <FounderCard founder={founders[0]} i={0} isAr={isAr} compact />
        </div>
      </Snap>

      {/* ══ 3c. FOUNDER 2 — mobile only ══════════════════════════════════ */}
      <Snap id="team-founder-1" className="lg:hidden">
        <Grid />
        <Glow x="50%" y="50%" size="70vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col items-stretch justify-center px-4 py-14">
          <FounderCard founder={founders[1]} i={0} isAr={isAr} compact />
        </div>
      </Snap>

      {/* ══ 3. TEAM — desktop only ════════════════════════════════════════ */}
      <Snap id="team" className="hidden lg:block">
        <Grid />
        <Glow x="65%" y="50%" size="70vw" intensity={0.09} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-16" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Left — heading */}
          <div className="flex flex-col gap-5 lg:w-[32%] shrink-0">
            <FadeUp delay={0.05}><Badge><Users className="w-3 h-3 inline me-1" />{isAr ? "القيادة" : "Leadership"}</Badge></FadeUp>
            <FadeUp delay={0.13}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {isAr ? <>الرؤية <span className="shimmer-text">خلف X360</span></> : <>The Vision <span className="shimmer-text">Behind X360</span></>}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}><div style={{ width: "clamp(80px,14vw,160px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)" }} /></FadeUp>
            <FadeUp delay={0.26}>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>
                {isAr ? "مؤسسان. مهمة واحدة. بناء طبقة التجارب الرقمية التي تقود مؤسسات الغد." : "Two founders. One mission. Building the digital experience layer that powers tomorrow's enterprises."}
              </p>
            </FadeUp>
          </div>

          {/* Right — founder cards side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:w-[65%] w-full">
            {founders.map((founder, i) => (
              <FounderCard key={founder.name} founder={founder} i={i} isAr={isAr} />
            ))}
          </div>

        </div>
      </Snap>

      {/* ══ 4. VALUES ════════════════════════════════════════════════════ */}
      <Snap id="values">
        <Grid />
        <Glow x="50%" y="45%" size="75vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-6 lg:gap-10 overflow-y-auto" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex flex-col items-center text-center gap-4">
            <FadeUp delay={0.05}><Badge>{isAr ? "ما نؤمن به" : "What We Stand For"}</Badge></FadeUp>
            <FadeUp delay={0.12}>
              <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {isAr ? "ما نؤمن به" : "What We Believe"}
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}><GlowRule /></FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeUp key={v.titleEn} delay={0.24 + i * 0.08}>
                  <div className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: "rgba(255,255,255,0.55)" }} />
                    </div>
                    <h4 className="font-thin leading-snug" style={{ fontSize: "0.9rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)", fontFamily: "Quicksand,sans-serif" }}>
                      {isAr ? v.titleAr : v.titleEn}
                    </h4>
                    <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
                      {isAr ? v.descAr : v.descEn}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Snap>

      {/* ══ 5. GLOBAL PRESENCE ═══════════════════════════════════════════ */}
      <Snap id="global">
        <Grid />
        <Glow x="60%" y="50%" size="70vw" intensity={0.08} />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-6 lg:gap-10 px-6 lg:px-16 overflow-y-auto lg:overflow-visible" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Left — heading + country cards */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 w-full lg:w-[45%]">
            <FadeUp delay={0.05}><Badge><MapPin className="w-3 h-3 inline me-1" />{isAr ? "الانتشار العالمي" : "Global Presence"}</Badge></FadeUp>
            <FadeUp delay={0.12}>
              <h2 className="font-thin leading-tight text-center lg:text-start" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                {isAr ? <>حضورنا <span className="shimmer-text">العالمي</span></> : <>Our <span className="shimmer-text">Global Presence</span></>}
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}><div style={{ width: "clamp(80px,14vw,160px)", height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.35),transparent)" }} /></FadeUp>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-xs sm:max-w-sm lg:max-w-none mx-auto lg:mx-0">
              {[
                { code: "sa", name: isAr ? "السعودية"       : "Saudi Arabia", sub: isAr ? "المقر الرئيسي" : "Headquarters" },
                { code: "ae", name: isAr ? "دبي"             : "Dubai",        sub: isAr ? "فرع"           : "Branch"       },
                { code: "qa", name: isAr ? "قطر"             : "Qatar",        sub: isAr ? "فرع"           : "Branch"       },
                { code: "kw", name: isAr ? "الكويت"          : "Kuwait",       sub: isAr ? "فرع"           : "Branch"       },
                { code: "gb", name: isAr ? "المملكة المتحدة" : "UK",           sub: isAr ? "فرع"           : "Branch"       },
                { code: "in", name: isAr ? "الهند"           : "India",        sub: isAr ? "مركز التطوير"  : "Dev Centre"   },
                { code: "th", name: isAr ? "تايلاند"         : "Thailand",     sub: isAr ? "فرع"           : "Branch"       },
              ].map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.24 + i * 0.05, duration: 0.5, ease }}
                  className="rounded-xl p-3 flex flex-col gap-1.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/x360/flags/${c.code}.png`}
                    alt={c.name}
                    width={28}
                    height={20}
                    className="rounded-sm object-cover"
                    style={{ width: 28, height: 20 }}
                  />
                  <span className="text-white/70 leading-tight" style={{ fontSize: "0.7rem", fontWeight: 500 }}>{c.name}</span>
                  <span className="uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>{c.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Globe (desktop only) */}
          <FadeIn delay={0.25} className="hidden lg:flex w-full lg:w-[52%] max-w-[420px] mx-auto flex-col items-center gap-3">
            <GlobalPresenceGlobe />
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}
              >←</motion.span>
              <span className="tracking-[0.28em] uppercase" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.38)" }}>
                {isAr ? "اسحب" : "DRAG"}
              </span>
              <motion.span
                animate={{ x: [3, 0, 3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}
              >→</motion.span>
            </motion.div>
          </FadeIn>

        </div>
      </Snap>

      {/* ══ 6. JOURNEY ══════════════════════════════════════════════════ */}
      <Snap id="journey">
        <Grid />
        <Glow x="50%" y="30%" size="70vw" intensity={0.07} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center px-6 py-12 gap-8" style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
            <div className="flex flex-col items-center text-center gap-4">
              <FadeUp delay={0.05}><Badge>{isAr ? "رحلتنا" : "Our Journey"}</Badge></FadeUp>
              <FadeUp delay={0.12}>
                <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
                  {ta.journeyTitle}
                </h2>
              </FadeUp>
              <FadeUp delay={0.18}><GlowRule /></FadeUp>
            </div>
            <div className="relative w-full">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px hidden sm:block"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)" }} />
              <div className="flex flex-col gap-6">
                {ta.timeline.map((item, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <FadeUp key={item.year} delay={0.22 + i * 0.07}>
                      <div className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${!isEven ? "sm:flex-row-reverse" : ""}`}>
                        <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10 shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)" }}>
                            <span className="text-white/60 text-[9px] font-semibold">{item.year.slice(2)}</span>
                          </div>
                        </div>
                        <div className={`sm:w-[calc(50%-2rem)] rounded-xl p-4 ${!isEven ? "sm:text-end" : ""}`}
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <span className="text-[9px] font-semibold tracking-widest uppercase block mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.year}</span>
                          <h4 className="font-thin mb-1" style={{ fontSize: "0.85rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.8)", fontFamily: "Quicksand,sans-serif" }}>{item.title}</h4>
                          <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{item.desc}</p>
                        </div>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Snap>

      {/* ══ 7. FOOTER ════════════════════════════════════════════════════ */}
      <Snap id="footer" style={{ height: "auto", paddingTop: "60px" }}>
        <Footer />
      </Snap>

      <BackButton />
      <WhatsAppButton />
    </div>
  );
}
