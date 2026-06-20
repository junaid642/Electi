import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  Phone, TrendingUp, Headphones, Users, Search,
  MessageSquare, BookOpen, Building2, Star, Heart,
  GraduationCap, ShoppingCart, Target, ArrowRight, Zap,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const AGENTS = [
  {
    slug: "ai-receptionist",
    icon: Phone,
    title: "AI Receptionist",
    titleAr: "المستقبل الذكي",
    desc: "Never miss a call. Books appointments and qualifies leads 24/7.",
    descAr: "لا تفوّت مكالمة. يحجز المواعيد ويؤهل العملاء على مدار الساعة.",
    badge: "Most Popular",
    badgeAr: "الأكثر طلباً",
  },
  {
    slug: "ai-sales-agent",
    icon: TrendingUp,
    title: "AI Sales Agent",
    titleAr: "وكيل المبيعات الذكي",
    desc: "Prospects, qualifies, and closes deals — around the clock.",
    descAr: "يبحث ويؤهل ويُغلق الصفقات — على مدار الساعة.",
    badge: "High ROI",
    badgeAr: "عائد استثمار عالٍ",
  },
  {
    slug: "ai-customer-support",
    icon: Headphones,
    title: "AI Customer Support",
    titleAr: "دعم العملاء الذكي",
    desc: "Resolves 80% of tickets instantly across WhatsApp, chat, and voice.",
    descAr: "يحل 80% من التذاكر فوراً عبر واتساب والدردشة والصوت.",
  },
  {
    slug: "ai-hr-agent",
    icon: Users,
    title: "AI HR Agent",
    titleAr: "وكيل الموارد البشرية الذكي",
    desc: "Automates leave, onboarding, and policy queries — Saudi Labor Law compliant.",
    descAr: "يؤتمت الإجازات والتأهيل واستفسارات السياسات — متوافق مع نظام العمل السعودي.",
  },
  {
    slug: "ai-recruitment",
    icon: Search,
    title: "AI Recruitment Agent",
    titleAr: "وكيل التوظيف الذكي",
    desc: "Screens hundreds of CVs, conducts first interviews, schedules automatically.",
    descAr: "يفرز مئات السير الذاتية ويجري مقابلات أولى ويجدول تلقائياً.",
  },
  {
    slug: "ai-whatsapp",
    icon: MessageSquare,
    title: "AI WhatsApp Agent",
    titleAr: "وكيل واتساب الذكي",
    desc: "Automates sales, support, and bookings on Saudi Arabia's #1 channel.",
    descAr: "يؤتمت المبيعات والدعم والحجوزات على القناة الأولى في السعودية.",
    badge: "Saudi Favourite",
    badgeAr: "المفضل السعودي",
  },
  {
    slug: "ai-knowledge-base",
    icon: BookOpen,
    title: "AI Knowledge Base",
    titleAr: "وكيل قاعدة المعرفة الذكي",
    desc: "Makes all your documents, manuals and policies instantly searchable.",
    descAr: "يجعل جميع وثائقك وأدلتك وسياساتك قابلة للبحث فوراً.",
  },
  {
    slug: "ai-property",
    icon: Building2,
    title: "AI Property Agent",
    titleAr: "وكيل العقارات الذكي",
    desc: "Qualifies buyers, matches listings, and books viewings automatically.",
    descAr: "يؤهل المشترين ويطابق القوائم ويحجز جولات الاطلاع تلقائياً.",
  },
  {
    slug: "ai-hospitality",
    icon: Star,
    title: "AI Hospitality Agent",
    titleAr: "وكيل الضيافة الذكي",
    desc: "Reservations, concierge, and in-stay requests for hotels and resorts.",
    descAr: "الحجوزات والكونسيرج والطلبات أثناء الإقامة للفنادق والمنتجعات.",
  },
  {
    slug: "ai-healthcare",
    icon: Heart,
    title: "AI Healthcare Agent",
    titleAr: "وكيل الرعاية الصحية الذكي",
    desc: "Appointments, insurance queries, and patient follow-up — PDPL compliant.",
    descAr: "المواعيد واستفسارات التأمين ومتابعة المرضى — متوافق مع PDPL.",
  },
  {
    slug: "ai-education",
    icon: GraduationCap,
    title: "AI Education Agent",
    titleAr: "وكيل التعليم الذكي",
    desc: "Converts enquiries into enrolments and supports students 24/7.",
    descAr: "يحوّل الاستفسارات إلى تسجيلات ويدعم الطلاب على مدار الساعة.",
  },
  {
    slug: "ai-retail",
    icon: ShoppingCart,
    title: "AI Retail Agent",
    titleAr: "وكيل التجزئة الذكي",
    desc: "Product discovery, orders, returns, and loyalty — across every channel.",
    descAr: "اكتشاف المنتجات والطلبات والإرجاعات والولاء — عبر كل القنوات.",
  },
  {
    slug: "ai-lead-qualification",
    icon: Target,
    title: "AI Lead Qualification",
    titleAr: "وكيل تأهيل العملاء الذكي",
    desc: "Scores and routes every lead so your team only talks to buyers.",
    descAr: "يقيّم ويوجّه كل عميل محتمل حتى يتحدث فريقك فقط مع المشترين.",
  },
];

function InViewDiv({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

export default function MarketplacePage() {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [filter, setFilter] = useState<string>("All");

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

  const categories = isAr
    ? ["الكل", "المبيعات", "الدعم", "الموارد البشرية", "القطاعات"]
    : ["All", "Sales", "Support", "HR", "Industry"];

  const catMap: Record<string, string[]> = {
    All: AGENTS.map((a) => a.slug),
    Sales: ["ai-sales-agent", "ai-lead-qualification", "ai-whatsapp"],
    Support: ["ai-customer-support", "ai-knowledge-base", "ai-receptionist"],
    HR: ["ai-hr-agent", "ai-recruitment"],
    Industry: ["ai-property", "ai-hospitality", "ai-healthcare", "ai-education", "ai-retail"],
    "الكل": AGENTS.map((a) => a.slug),
    "المبيعات": ["ai-sales-agent", "ai-lead-qualification", "ai-whatsapp"],
    "الدعم": ["ai-customer-support", "ai-knowledge-base", "ai-receptionist"],
    "الموارد البشرية": ["ai-hr-agent", "ai-recruitment"],
    "القطاعات": ["ai-property", "ai-hospitality", "ai-healthcare", "ai-education", "ai-retail"],
  };

  const visible = AGENTS.filter((a) => catMap[filter]?.includes(a.slug));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Electi AI Agent Marketplace",
    "description": "Saudi Arabia's AI Agent Marketplace — 13 intelligent AI Agents for every business function",
    "url": "https://electi.sa/marketplace",
    "numberOfItems": AGENTS.length,
    "itemListElement": AGENTS.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": a.title,
      "url": `https://electi.sa/marketplace/${a.slug}`,
    })),
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SEOHead
        title={isAr ? "سوق وكلاء الذكاء الاصطناعي | Electi" : "AI Agent Marketplace Saudi Arabia | Electi"}
        description={isAr ? "سوق Electi لوكلاء الذكاء الاصطناعي — 13 وكيلاً ذكياً لكل وظيفة تجارية في المملكة العربية السعودية." : "Saudi Arabia's AI Agent Marketplace. Explore 13 intelligent AI Agents for sales, support, HR, and industry-specific needs. Deploy in 48 hours."}
        path="/marketplace"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(66,133,244,0.06) 0%,transparent 65%)" }} />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Zap className="w-3 h-3" />
            {isAr ? "سوق الذكاء الاصطناعي" : "AI Agent Marketplace"}
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-700 leading-[1.04] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}>
            {isAr ? (
              <>سوق وكلاء<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>الذكاء الاصطناعي</span></>
            ) : (
              <>The AI Agent<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Marketplace</span></>
            )}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/40 text-lg leading-relaxed mb-3 max-w-2xl mx-auto">
            {isAr
              ? "13 وكيلاً ذكياً لكل وظيفة تجارية. جاهز للنشر في المملكة العربية السعودية."
              : "13 intelligent AI Agents for every business function. Deploy-ready for Saudi Arabia."}
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/25 text-sm mb-10 max-w-xl mx-auto">
            {isAr
              ? "دعم كامل للغة العربية · امتثال PDPL · نشر في 48 ساعة · بلا برمجة"
              : "Full Arabic support · PDPL compliant · Live in 48 hours · No code required"}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/build-your-agent">
              <motion.button className="px-7 py-3.5 rounded-xl font-600 bg-white text-black flex items-center gap-2"
                style={{ boxShadow: "0 0 28px rgba(255,255,255,0.2)" }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "ابنِ وكيلك الآن" : "Build Your Agent"} <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button className="px-7 py-3.5 rounded-xl font-600 border border-white/12 text-white/58 hover:text-white hover:border-white/22 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "تحدث مع المبيعات" : "Talk to Sales"}
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6">
            {[
              { v: "13", l: isAr ? "وكيل ذكي" : "AI Agents" },
              { v: "48h", l: isAr ? "وقت النشر" : "Deploy Time" },
              { v: "100%", l: isAr ? "دعم عربي" : "Arabic Support" },
              { v: "24/7", l: isAr ? "متاح دائماً" : "Always On" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-700 text-white">{s.v}</div>
                <div className="text-white/28 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ AGENT GRID ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 min-h-screen" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-7xl mx-auto">
          <InViewDiv>
            {/* Category filter */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className="px-4 py-2 rounded-xl text-sm font-600 border transition-all"
                  style={{
                    background: filter === cat ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                    borderColor: filter === cat ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                    color: filter === cat ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.38)",
                  }}>
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Agent cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visible.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div key={agent.slug} variants={fadeUp} custom={i} layout>
                    <Link href={`/marketplace/${agent.slug}`}>
                      <SpotlightCard glowColor="rgba(255,255,255,0.06)" className="border border-white/8 rounded-2xl h-full hover:border-white/16 transition-all bg-[#050505] cursor-pointer group">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center"
                              style={{ background: "rgba(255,255,255,0.04)" }}>
                              <Icon className="w-5 h-5 text-white/55" />
                            </div>
                            {agent.badge && (
                              <span className="text-[10px] font-700 px-2 py-1 rounded-full border border-white/12 text-white/45"
                                style={{ background: "rgba(255,255,255,0.04)" }}>
                                {isAr && agent.badgeAr ? agent.badgeAr : agent.badge}
                              </span>
                            )}
                          </div>

                          <h3 className="font-700 text-white mb-2 group-hover:text-white/90 transition-colors">
                            {isAr ? agent.titleAr : agent.title}
                          </h3>
                          <p className="text-white/35 text-xs leading-relaxed flex-1">
                            {isAr ? agent.descAr : agent.desc}
                          </p>

                          <div className="flex items-center gap-1.5 mt-5 text-white/30 text-xs font-600 group-hover:text-white/55 transition-colors">
                            {isAr ? "استكشف الوكيل" : "Explore Agent"}
                            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </InViewDiv>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
          <div className="max-w-2xl mx-auto text-center relative">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="text-3xl sm:text-4xl font-700 mb-4">
                {isAr ? "لا تعرف من أين تبدأ؟" : "Not Sure Where to Start?"}
              </h2>
              <p className="text-white/38 mb-8 leading-relaxed">
                {isAr
                  ? "استخدم معالج بناء الوكيل الخاص بنا للحصول على توصية مخصصة بناءً على صناعتك واحتياجاتك."
                  : "Use our Build Your Agent wizard to get a personalised AI Agent recommendation based on your industry and needs."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/build-your-agent">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/90 transition-all"
                    style={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "ابنِ وكيلك" : "Build Your Agent"}
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 border border-white/12 text-white/58 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "تحدث مع خبير" : "Talk to an Expert"}
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
