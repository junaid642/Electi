import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Zap, CheckCircle, ArrowRight, ChevronDown,
  MessageCircle, Receipt, Scale, BarChart3,
  Globe, Activity, Shield, Building, Star,
  MessageSquare, Database, LayoutDashboard, Lock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";
import GlowRule from "@/components/ui/GlowRule";
import AnimatedTextCycle from "@/components/ui/AnimatedTextCycle";
import { useLang } from "@/contexts/LanguageContext";

const ease  = [0.22, 1, 0.36, 1] as const;
const slideEase = [0.76, 0, 0.24, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

function InViewSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/42 mb-5">
      <Icon className="w-3 h-3" /> {label}
    </div>
  );
}

/* ── Plans ─────────────────────────────────────────────────────────── */
const plans = [
  {
    name: "Starter",
    nameAr: "المبتدئ",
    tag: null,
    tagAr: null,
    for: "Startups & solo operations",
    forAr: "الشركات الناشئة والعمليات الفردية",
    price: "SAR 499",
    priceNote: "/ month",
    priceNoteAr: "/ شهرياً",
    features: [
      "1 AI Agent",
      "WhatsApp integration",
      "Basic automations",
      "Reminders & task handling",
      "Multilingual support",
      "Standard dashboard",
    ],
    featuresAr: [
      "وكيل ذكاء اصطناعي واحد",
      "تكامل واتساب",
      "أتمتة أساسية",
      "تذكيرات ومعالجة المهام",
      "دعم متعدد اللغات",
      "لوحة تحكم قياسية",
    ],
    cta: "Deploy Now",
    ctaAr: "ابدأ الآن",
    href: "https://app.electi.sa/login",
    accent: null,
    popular: false,
  },
  {
    name: "Professional",
    nameAr: "الاحترافي",
    tag: "Most Popular",
    tagAr: "الأكثر شيوعاً",
    for: "Growing businesses & agencies",
    forAr: "الأعمال النامية والوكالات",
    price: "SAR 2,499",
    priceNote: "/ month",
    priceNoteAr: "/ شهرياً",
    features: [
      "Up to 3 AI Agents",
      "CRM integration",
      "Invoice workflows",
      "Reservation automation",
      "AI lead qualification",
      "Advanced dashboards",
      "Analytics & reporting",
      "Arabic + English support",
    ],
    featuresAr: [
      "حتى 3 وكلاء ذكاء اصطناعي",
      "تكامل نظام CRM",
      "سير عمل الفواتير",
      "أتمتة الحجوزات",
      "تأهيل العملاء المحتملين بالذكاء الاصطناعي",
      "لوحات تحكم متقدمة",
      "تحليلات وتقارير",
      "دعم عربي وإنجليزي",
    ],
    cta: "Scale Now",
    ctaAr: "توسع الآن",
    href: "https://app.electi.sa/login",
    accent: "rgba(255,255,255,0.22)",
    popular: true,
  },
  {
    name: "Enterprise",
    nameAr: "المؤسسي",
    tag: null,
    tagAr: null,
    for: "Enterprises & government",
    forAr: "المؤسسات والجهات الحكومية",
    price: "Custom",
    priceNote: "pricing",
    priceNoteAr: "تسعير مخصص",
    features: [
      "Unlimited AI Agents",
      "Full AI workforce ecosystem",
      "Enterprise API integrations",
      "Legal AI workflows",
      "Custom infrastructure",
      "Dedicated deployment",
      "Enterprise security & SLA",
      "Dedicated account manager",
    ],
    featuresAr: [
      "وكلاء ذكاء اصطناعي غير محدودين",
      "منظومة قوى عاملة AI كاملة",
      "تكاملات API المؤسسية",
      "سير عمل قانوني AI",
      "بنية تحتية مخصصة",
      "نشر مخصص",
      "أمان مؤسسي واتفاقية مستوى الخدمة",
      "مدير حساب مخصص",
    ],
    cta: "Contact Enterprise Team",
    ctaAr: "تواصل مع فريق المؤسسات",
    href: "/contact",
    accent: null,
    popular: false,
  },
];

/* ── Agents ─────────────────────────────────────────────────────────── */
const agentPlans = [
  {
    icon: MessageCircle,
    color: "#25D366",
    name: "Personal Agent",
    nameAr: "الوكيل الشخصي",
    price: "SAR 299",
    priceAr: "٢٩٩ ريال",
    features: ["WhatsApp Information AI assistant", "Reminders & scheduling", "Email summaries", "Smart workflows"],
    featuresAr: ["مساعد واتساب AI", "التذكيرات والجدولة", "ملخصات البريد الإلكتروني", "سير عمل ذكي"],
    href: "/agents/personal",
  },
  {
    icon: Receipt,
    color: "#60a5fa",
    name: "Invoice Agent",
    nameAr: "وكيل الفواتير",
    price: "SAR 399",
    priceAr: "٣٩٩ ريال",
    features: ["OCR bill scanning", "Invoice automation", "Expense tracking", "Payment workflows"],
    featuresAr: ["مسح الفواتير بـ OCR", "أتمتة الفواتير", "تتبع النفقات", "سير عمل المدفوعات"],
    href: "/agents/billing",
  },
  {
    icon: Scale,
    color: "#f59e0b",
    name: "Legal Agent",
    nameAr: "الوكيل القانوني",
    price: "SAR 599",
    priceAr: "٥٩٩ ريال",
    features: ["Saudi legal assistance", "Visa workflows", "Labor law support", "Compliance automation"],
    featuresAr: ["المساعدة القانونية السعودية", "إجراءات التأشيرة", "دعم قانون العمل", "أتمتة الامتثال"],
    href: "/agents/legal",
  },
  {
    icon: BarChart3,
    color: "#a78bfa",
    name: "Sales Agent",
    nameAr: "وكيل المبيعات",
    price: "SAR 699",
    priceAr: "٦٩٩ ريال",
    features: ["Reservations & CRM", "Lead generation", "WhatsApp customer handling", "Automated follow-ups"],
    featuresAr: ["الحجوزات ونظام CRM", "توليد العملاء المحتملين", "معالجة عملاء واتساب", "المتابعة الآلية"],
    href: "/agents/sales",
  },
];

/* ── Industry packages ───────────────────────────────────────────────── */
const industryPackages = [
  {
    icon: Building,
    label: "Real Estate",
    labelAr: "العقارات",
    headline: "Real Estate Intelligence Ecosystem",
    headlineAr: "منظومة الذكاء العقاري",
    desc: "AI sales agents, WhatsApp automation, lead generation, property management, and CRM systems.",
    descAr: "وكلاء مبيعات AI، أتمتة واتساب، توليد العملاء، إدارة العقارات، وأنظمة CRM.",
    agents: ["Personal", "Sales", "Invoice"],
    color: "#60a5fa",
    href: "/industries/real-estate",
  },
  {
    icon: Activity,
    label: "Hospitality",
    labelAr: "الضيافة",
    headline: "AI-Powered Hospitality Operations",
    headlineAr: "عمليات الضيافة بالذكاء الاصطناعي",
    desc: "Reservation AI, guest communication, concierge automation, and WhatsApp guest workflows.",
    descAr: "AI الحجوزات، تواصل الضيوف، أتمتة الكونسيرج، وسير عمل الضيوف عبر واتساب.",
    agents: ["Personal", "Sales", "Invoice"],
    color: "#a78bfa",
    href: "/industries/hospitality",
  },
  {
    icon: Globe,
    label: "Healthcare",
    labelAr: "الرعاية الصحية",
    headline: "Healthcare Automation Intelligence",
    headlineAr: "ذكاء أتمتة الرعاية الصحية",
    desc: "Patient scheduling, billing automation, compliance workflows, and multilingual communication.",
    descAr: "جدولة المرضى، أتمتة الفواتير، سير عمل الامتثال، والتواصل متعدد اللغات.",
    agents: ["Personal", "Invoice", "Legal"],
    color: "#4ade80",
    href: "/industries/healthcare",
  },
  {
    icon: Shield,
    label: "Enterprise",
    labelAr: "المؤسسات",
    headline: "Enterprise Operational Intelligence",
    headlineAr: "ذكاء العمليات المؤسسية",
    desc: "Operational AI systems, enterprise workflows, multilingual operations, and ministry-grade deployment.",
    descAr: "أنظمة AI التشغيلية، سير عمل المؤسسات، العمليات متعددة اللغات، والنشر على مستوى الوزارات.",
    agents: ["Personal", "Sales", "Legal", "Invoice"],
    color: "#f59e0b",
    href: "/industries/corporate",
  },
];

/* ── Feature comparison ─────────────────────────────────────────────── */
const features = [
  { label: "WhatsApp Integration",   labelAr: "تكامل واتساب",          starter: true,  pro: true,  ent: true  },
  { label: "AI Agents",              labelAr: "وكلاء AI",               starter: "1",   pro: "3",   ent: "∞"   },
  { label: "CRM Integration",        labelAr: "تكامل CRM",              starter: false, pro: true,  ent: true  },
  { label: "Analytics Dashboard",    labelAr: "لوحة تحليلات",           starter: false, pro: true,  ent: true  },
  { label: "Arabic + English",       labelAr: "عربي وإنجليزي",          starter: true,  pro: true,  ent: true  },
  { label: "Enterprise API",         labelAr: "API المؤسسية",            starter: false, pro: false, ent: true  },
  { label: "Custom Infrastructure",  labelAr: "بنية تحتية مخصصة",       starter: false, pro: false, ent: true  },
  { label: "Dedicated SLA",          labelAr: "اتفاقية مستوى خدمة",     starter: false, pro: false, ent: true  },
];

/* ── FAQ ────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How does Electi integrate with WhatsApp?",
    qAr: "كيف يتكامل Electi مع واتساب؟",
    a: "Electi connects directly to your WhatsApp Business number via the official API. Setup takes under 60 seconds — no technical knowledge required.",
    aAr: "يتصل Electi مباشرةً بحساب واتساب للأعمال عبر API الرسمي. الإعداد يستغرق أقل من 60 ثانية دون الحاجة لأي خبرة تقنية.",
  },
  {
    q: "Can I customize AI agents for my business?",
    qAr: "هل يمكنني تخصيص وكلاء الذكاء الاصطناعي لأعمالي؟",
    a: "Yes. Every agent is fully configurable — tone, language, workflows, integrations, and automation rules are all adjustable to your exact requirements.",
    aAr: "نعم. كل وكيل قابل للتخصيص الكامل — النبرة واللغة وسير العمل والتكاملات وقواعد الأتمتة كلها قابلة للضبط وفق احتياجاتك.",
  },
  {
    q: "Does Electi fully support Arabic?",
    qAr: "هل يدعم Electi اللغة العربية بالكامل؟",
    a: "Electi is built Arabic-first. All agents are trained on Saudi Arabic dialects, legal frameworks, and cultural context — not just translated interfaces.",
    aAr: "تم تصميم Electi بحيث تكون العربية أولاً. جميع الوكلاء مدربون على اللهجات السعودية والأطر القانونية والسياق الثقافي — وليس مجرد واجهات مترجمة.",
  },
  {
    q: "Is enterprise deployment available?",
    qAr: "هل النشر المؤسسي متاح؟",
    a: "Yes. Enterprise deployments include dedicated infrastructure, custom SLA agreements, compliance documentation, and a dedicated account team.",
    aAr: "نعم. تتضمن عمليات النشر المؤسسية بنية تحتية مخصصة واتفاقيات مستوى خدمة ووثائق امتثال وفريق حساب مخصص.",
  },
  {
    q: "Can I integrate my existing CRM?",
    qAr: "هل يمكنني تكامل نظام CRM الحالي؟",
    a: "Professional and Enterprise plans support integrations with major CRM platforms including Salesforce, HubSpot, Zoho, and custom API connections.",
    aAr: "تدعم خطط Professional وEnterprise التكامل مع منصات CRM الرئيسية بما في ذلك Salesforce وHubSpot وZoho والاتصالات عبر API المخصصة.",
  },
  {
    q: "Is my data secure?",
    qAr: "هل بياناتي آمنة؟",
    a: "All data is encrypted in transit and at rest. Enterprise deployments meet Saudi PDPL requirements with optional on-premise infrastructure for sensitive operations.",
    aAr: "جميع البيانات مشفرة أثناء النقل وفي حالة التخزين. تستوفي عمليات النشر المؤسسية متطلبات نظام حماية البيانات الشخصية السعودي مع خيار البنية التحتية المحلية.",
  },
];

const agentPillBg: Record<string, string> = {
  Personal: "rgba(37,211,102,0.14)", Invoice: "rgba(96,165,250,0.14)",
  Legal: "rgba(245,158,11,0.14)", Sales: "rgba(167,139,250,0.14)",
};
const agentPillFg: Record<string, string> = {
  Personal: "#25D366", Invoice: "#60a5fa", Legal: "#f59e0b", Sales: "#a78bfa",
};

/* ── Workflow step ──────────────────────────────────────────────────── */
const workflowSteps = [
  { icon: MessageSquare, label: "Customer Message",  labelAr: "رسالة العميل",     color: "#25D366" },
  { icon: Zap,           label: "AI Processing",     labelAr: "معالجة AI",         color: "#60a5fa" },
  { icon: CheckCircle,   label: "Reservation Made",  labelAr: "الحجز مكتمل",      color: "#a78bfa" },
  { icon: Receipt,       label: "Invoice Sent",      labelAr: "إرسال الفاتورة",    color: "#f59e0b" },
  { icon: LayoutDashboard, label: "Dashboard Update", labelAr: "تحديث اللوحة",    color: "#4ade80" },
  { icon: Database,      label: "CRM Sync",          labelAr: "مزامنة CRM",        color: "#f472b6" },
];

/* ─── Feature cell ─────────────────────────────────────────────────── */
function Cell({ value }: { value: boolean | string }) {
  if (value === true)  return <CheckCircle className="w-4 h-4 mx-auto" style={{ color: "#4ade80" }} />;
  if (value === false) return <span className="block mx-auto w-4 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />;
  return <span className="text-white/70 font-600 text-sm">{value}</span>;
}

/* ─── FAQ Item ─────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-500 text-white/75 leading-snug">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm text-white/40 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  const { isAr } = useLang();

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
      <SEOHead title="Electi Pricing | AI Workforce Plans" titleAr="أسعار إليكتي | خطط قوى العمل بالذكاء الاصطناعي" description="Explore flexible AI workforce pricing for startups, enterprises, hospitality, healthcare, and real estate operations — plans starting from SAR 1,499/month." descriptionAr="استكشف أسعار قوى العمل بالذكاء الاصطناعي المرنة للشركات الناشئة والمؤسسات والضيافة والرعاية الصحية والعقارات." path="/pricing" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-40 pb-28" style={{ scrollSnapAlign: "start", minHeight: "100dvh" }}>
        {/* Ambient orb */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          animate={{ opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/42 mb-6"
        >
          <Zap className="w-3 h-3" />
          {isAr ? "تسعير قوى العمل AI" : "AI Workforce Pricing"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          className="font-700 leading-[1.08] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 4.2rem)", letterSpacing: "-0.01em" }}
        >
          {isAr ? (
            <>منظومة <span style={{ color: "rgba(255,255,255,0.55)" }}>AI</span> الكاملة</>
          ) : (
            <>Configure Your <span style={{ color: "rgba(255,255,255,0.55)" }}>AI Workforce</span></>
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/38 text-base sm:text-lg mb-3"
          style={{ letterSpacing: "0.02em" }}
        >
          {isAr ? "مرن لـ" : "Intelligent systems for"}{" "}
          <AnimatedTextCycle
            className="text-white/65 font-500"
            words={isAr
              ? ["الشركات الناشئة", "قطاع الضيافة", "العقارات", "القطاع الصحي", "المؤسسات الكبرى"]
              : ["Startups", "Hospitality", "Real Estate", "Healthcare", "Enterprises"]
            }
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="text-white/30 text-sm max-w-xl mx-auto"
        >
          {isAr
            ? "بنية تحتية لذكاء اصطناعي تشغيلي — وليست مجرد برنامج SaaS عادي."
            : "Operational AI infrastructure — not just another SaaS product."}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: slideEase }}
          className="h-px w-24 mx-auto mt-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
        />
      </section>

      {/* ══ PLANS ═════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={Star} label={isAr ? "خطط القوى العاملة AI" : "AI Workforce Plans"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "اختر مستوى التشغيل" : "Choose Your Operating Level"}
            </h2>
            <GlowRule />
          </motion.div>
        </InViewSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="relative rounded-2xl flex flex-col p-7"
              style={{
                background: plan.popular ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.018)",
                border: plan.popular ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.popular ? "0 0 60px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 rounded-full text-[10px] font-700 text-black tracking-widest uppercase"
                    style={{ background: "rgba(255,255,255,0.95)" }}>
                    {isAr ? plan.tagAr : plan.tag}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-700 text-white mb-1">{isAr ? plan.nameAr : plan.name}</h3>
                <p className="text-white/32 text-xs">{isAr ? plan.forAr : plan.for}</p>
              </div>

              <div className="mb-7">
                <span className="text-4xl font-700 text-white">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-white/32 text-sm ml-1">{isAr ? plan.priceNoteAr : plan.priceNote}</span>
                )}
                {plan.price === "Custom" && (
                  <span className="text-white/32 text-sm ml-1">{isAr ? plan.priceNoteAr : plan.priceNote}</span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {(isAr ? plan.featuresAr : plan.features).map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-white/30" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <motion.div
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-700 cursor-pointer"
                  style={{
                    background: plan.popular ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)",
                    color: plan.popular ? "#000" : "rgba(255,255,255,0.75)",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.10)",
                  }}
                  whileHover={plan.popular
                    ? { background: "rgba(255,255,255,1)" }
                    : { background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.95)" }
                  }
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {isAr ? plan.ctaAr : plan.cta}
                  <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ AGENT PRICING ═════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={Zap} label={isAr ? "تسعير الوكلاء" : "Agent-Based Pricing"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "قوّي عملياتك بوكيل واحد أو الكل" : "One Agent. Or Deploy Them All."}
            </h2>
            <GlowRule />
            <motion.p variants={fadeUp} className="text-white/32 text-sm mt-4 max-w-lg mx-auto">
              {isAr
                ? "اختر الوكيل المناسب لاحتياجاتك أو ادمجهم معاً لمنظومة متكاملة."
                : "Pick the agent that fits your need, or combine them for a full AI ecosystem."}
            </motion.p>
          </motion.div>
        </InViewSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentPlans.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease }}
              >
                <Link href={agent.href}>
                  <motion.div
                    className="rounded-2xl border p-5 flex flex-col h-full cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.018)",
                      borderColor: "rgba(255,255,255,0.07)",
                      borderTopWidth: 2,
                      borderTopColor: agent.color,
                    }}
                    whileHover={{ borderColor: `${agent.color}55`, boxShadow: `0 0 40px ${agent.color}0C` }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}30` }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: agent.color, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <h3 className="font-700 text-sm text-white leading-tight">{isAr ? agent.nameAr : agent.name}</h3>
                        <p className="font-600 text-xs mt-0.5" style={{ color: agent.color }}>
                          {isAr ? `${agent.priceAr} / شهر` : `${agent.price} / mo`}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 flex-1 mb-5">
                      {(isAr ? agent.featuresAr : agent.features).map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-white/42">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: agent.color + "99" }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1.5 text-xs font-600 text-white/30 hover:text-white/65 transition-colors">
                      {isAr ? "تعرف على المزيد" : "Learn more"}
                      <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══ INDUSTRY PACKAGES ═════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={Globe} label={isAr ? "حزم القطاعات" : "Industry Packages"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "مُصمَّم لكل قطاع" : "Tailored for Every Sector"}
            </h2>
            <GlowRule />
          </motion.div>
        </InViewSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {industryPackages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease }}
              >
                <Link href={pkg.href}>
                  <motion.div
                    className="rounded-2xl border p-6 cursor-pointer h-full"
                    style={{ background: "rgba(255,255,255,0.018)", borderColor: "rgba(255,255,255,0.07)" }}
                    whileHover={{ borderColor: `${pkg.color}40`, boxShadow: `0 0 50px ${pkg.color}08` }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${pkg.color}14`, border: `1px solid ${pkg.color}25` }}>
                          <Icon style={{ width: 18, height: 18, color: pkg.color }} />
                        </div>
                        <div>
                          <div className="text-[10px] font-600 uppercase tracking-widest text-white/30 mb-0.5">
                            {isAr ? pkg.labelAr : pkg.label}
                          </div>
                          <h3 className="font-700 text-sm text-white leading-tight">
                            {isAr ? pkg.headlineAr : pkg.headline}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/35 text-xs leading-relaxed mb-4">
                      {isAr ? pkg.descAr : pkg.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {pkg.agents.map(a => (
                        <span key={a} className="px-2 py-0.5 rounded-full text-[10px] font-600"
                          style={{ background: agentPillBg[a], color: agentPillFg[a], border: `1px solid ${agentPillFg[a]}25` }}>
                          {a}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══ FEATURE COMPARISON ════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-5xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={Shield} label={isAr ? "مقارنة الميزات" : "Feature Comparison"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "ما الذي يتضمنه كل مستوى؟" : "What's in Each Plan?"}
            </h2>
            <GlowRule />
          </motion.div>
        </InViewSection>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl overflow-hidden border border-white/7"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-white/7">
            <div className="p-4 text-xs font-500 text-white/30 uppercase tracking-widest">
              {isAr ? "الميزة" : "Feature"}
            </div>
            {[
              { name: "Starter",      nameAr: "المبتدئ",   popular: false },
              { name: "Professional", nameAr: "الاحترافي", popular: true  },
              { name: "Enterprise",   nameAr: "المؤسسي",   popular: false },
            ].map(p => (
              <div key={p.name} className={`p-4 text-center text-sm font-700 ${p.popular ? "text-white" : "text-white/45"}`}>
                {isAr ? p.nameAr : p.name}
                {p.popular && <span className="block text-[9px] font-500 text-white/38 mt-0.5 uppercase tracking-widest">Popular</span>}
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`grid grid-cols-4 border-b border-white/5 last:border-0 ${i % 2 === 0 ? "" : ""}`}
            >
              <div className="p-4 text-xs text-white/45">{isAr ? f.labelAr : f.label}</div>
              <div className="p-4 flex items-center justify-center"><Cell value={f.starter} /></div>
              <div className="p-4 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.015)" }}>
                <Cell value={f.pro} />
              </div>
              <div className="p-4 flex items-center justify-center"><Cell value={f.ent} /></div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══ WORKFLOW SHOWCASE ═════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={Activity} label={isAr ? "كيف يعمل Electi" : "How Electi Works"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "من رسالة واحدة إلى منظومة كاملة" : "One Message. End-to-End Operations."}
            </h2>
            <GlowRule />
          </motion.div>
        </InViewSection>

        {/* Flow — horizontal on desktop, vertical on mobile */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-0">
          {workflowSteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === workflowSteps.length - 1;
            return (
              <div key={i} className="flex flex-col sm:flex-row items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease }}
                  className="flex flex-col items-center gap-3 px-1"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${step.color}14`,
                      border: `1px solid ${step.color}30`,
                    }}>
                    <Icon style={{ width: 20, height: 20, color: step.color }} />
                  </div>
                  <span className="text-[10px] font-600 uppercase text-white/40 text-center max-w-[80px] leading-snug tracking-wide">
                    {isAr ? step.labelAr : step.label}
                  </span>
                </motion.div>

                {/* Connector */}
                {!isLast && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.25, ease }}
                    className="hidden sm:block h-px w-8 mx-1 flex-shrink-0"
                    style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.18), rgba(255,255,255,0.08))", transformOrigin: isAr ? "right" : "left" }}
                  />
                )}
                {!isLast && (
                  <div className="block sm:hidden w-px h-6 my-1"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.18))" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="text-center text-white/22 text-xs mt-8 tracking-widest uppercase"
        >
          {isAr ? "كل خطوة مؤتمتة. كل نقطة بيانات متزامنة." : "Every step automated. Every data point in sync."}
        </motion.p>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-3xl mx-auto">
        <InViewSection className="text-center mb-12">
          <motion.div variants={fadeUp}>
            <SectionBadge icon={MessageCircle} label={isAr ? "الأسئلة الشائعة" : "FAQ"} />
            <h2 className="text-3xl sm:text-4xl font-700 mb-3">
              {isAr ? "أسئلة وأجوبة" : "Common Questions"}
            </h2>
            <GlowRule />
          </motion.div>
        </InViewSection>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="rounded-2xl border border-white/7 overflow-hidden px-6"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={isAr ? faq.qAr : faq.q} a={isAr ? faq.aAr : faq.a} />
          ))}
        </motion.div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-3xl p-12 sm:p-16 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.024)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {/* Ambient pulse */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: [0, 0.06, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
              <Zap className="w-3 h-3" />
              {isAr ? "ابدأ الآن" : "Get Started"}
            </div>
            <h2 className="text-4xl sm:text-5xl font-700 leading-[1.06] mb-4">
              {isAr ? (
                <>ابنِ قوتك<br /><span style={{ color: "rgba(255,255,255,0.55)" }}>العاملة AI</span></>
              ) : (
                <>Build Your<br /><span style={{ color: "rgba(255,255,255,0.55)" }}>AI Workforce.</span></>
              )}
            </h2>
            <p className="text-white/35 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              {isAr
                ? "حوِّل عملياتك من خلال أتمتة ذكية، وذكاء اصطناعي محادثاتي، وسير عمل مؤسسية."
                : "Transform operations through intelligent automation, conversational AI, and enterprise workflows."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
                <motion.div
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-700 text-black cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                  whileHover={{ background: "rgba(255,255,255,1)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {isAr ? "ابدأ تجربة مجانية" : "Start Free Trial"}
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.div>
              </a>
              <Link href="/contact">
                <motion.div
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-600 text-white/60 cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.9)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  {isAr ? "تواصل مع فريق المؤسسات" : "Contact Enterprise Team"}
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
