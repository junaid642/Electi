import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MessageCircle, Calendar, FileText, Scale, BarChart3, Receipt,
  ArrowRight, Check, Zap, Shield, Clock,
  Building2, Heart, Hotel, ShoppingBag, Briefcase, Home,
  X,
} from "lucide-react";

const WA_LINK     = "https://wa.me/966502547274?text=Hi%20Electi%2C%20I'd%20like%20to%20book%20a%20free%20demo";
const DEMO_MAILTO = "mailto:a@electi.sa?subject=Demo%20Request&body=";
const ease        = [0.22, 1, 0.36, 1] as const;
const GRID_BG     = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const fadeUp  = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function InView({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function SnapSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative flex flex-col items-center justify-center px-5 sm:px-8 lg:px-16 py-20 sm:py-28 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-500 text-white/42 mb-4"
      style={{ background: "rgba(255,255,255,0.04)" }}>
      <Zap className="w-3 h-3" /> {label}
    </motion.div>
  );
}

function GlowLine() {
  return <div className="h-px w-16 mx-auto mt-3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)" }} />;
}

function PrimaryBtn({ label, href }: { label: string; href?: string }) {
  return (
    <motion.a href={href ?? DEMO_MAILTO} target={href ? "_blank" : "_blank"} rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-700 text-black cursor-pointer"
      style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
      whileHover={{ scale: 1.04, y: -2, background: "rgba(255,255,255,1)" } as Parameters<typeof motion.a>[0]["whileHover"]}
      whileTap={{ scale: 0.97 }}>
      {label}
    </motion.a>
  );
}

function WABtn({ label }: { label: string }) {
  return (
    <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-600 cursor-pointer border border-white/10 text-white/65 hover:text-white hover:border-white/20 transition-all"
      style={{ background: "rgba(255,255,255,0.04)" }}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      <MessageCircle className="w-4 h-4 text-[#25D366]" /> {label}
    </motion.a>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 1 — HERO
────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <SnapSection>
      <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 700, height: 350, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,255,255,0.04) 0%,transparent 70%)" }} />
      <InView className="text-center max-w-5xl mx-auto relative z-10">
        <Badge label="Electi AI Workforce" />
        <motion.h1 variants={fadeUp} className="font-700 leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.4rem,6vw,4.8rem)" }}>
          Your AI Workforce,<br />
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Built for Saudi Arabia.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-white/45 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Deploy intelligent AI agents that handle customer communication, automate workflows, and drive business growth — natively on WhatsApp, in Arabic and English.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryBtn label="Book Free Demo" href={DEMO_MAILTO} />
          <WABtn label="Talk on WhatsApp" />
        </motion.div>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-8 mt-14 text-center">
          {[["4", "AI Agents"], ["6+", "Industries"], ["24/7", "Operations"], ["EN + AR", "Bilingual"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div className="text-2xl font-700 text-white">{val}</div>
              <div className="text-white/30 text-xs mt-0.5">{lbl}</div>
            </div>
          ))}
        </motion.div>
      </InView>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 2 — PAIN POINTS
────────────────────────────────────────────────────────────────── */
const PAINS = [
  { icon: Clock,          title: "Slow Response Times",     desc: "Customers expect instant answers. Manual teams can't keep up around the clock." },
  { icon: MessageCircle,  title: "WhatsApp Overwhelm",      desc: "Hundreds of messages daily with no system to track, route, or resolve them at scale." },
  { icon: Calendar,       title: "Missed Bookings",         desc: "Manual reservation handling leads to double bookings, no-shows, and lost revenue." },
  { icon: FileText,       title: "Drowning in Paperwork",   desc: "Contracts, invoices, and compliance documents take hours of manual processing." },
  { icon: BarChart3,      title: "No Business Intelligence", desc: "Scattered data, no real-time insights, and no visibility into what's working." },
  { icon: Shield,         title: "Compliance Complexity",   desc: "Saudi regulatory requirements demand consistent, documented business processes." },
];

function PainPoints() {
  return (
    <SnapSection>
      <div className="w-full max-w-6xl mx-auto">
        <InView className="text-center mb-12">
          <Badge label="The Problem" />
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-700 mb-3">
            Manual Work is Holding<br />Your Business Back.
          </motion.h2>
          <GlowLine />
        </InView>
        <InView className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAINS.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp}
              className="rounded-2xl border p-5"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              whileHover={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.035)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon className="w-4 h-4 text-white/55" />
              </div>
              <h3 className="font-700 text-sm text-white mb-1.5">{title}</h3>
              <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </InView>
      </div>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 3 — AGENTS
────────────────────────────────────────────────────────────────── */
const AGENTS = [
  {
    icon: MessageCircle, title: "Personal Agent",
    desc: "Your executive AI: manages emails, calendar, drafts, and communication across all channels — so you focus on strategy.",
    bullets: ["Email & calendar management", "Meeting scheduling", "Document drafting", "Smart follow-ups"],
    href: "/agent-personal",
  },
  {
    icon: Receipt, title: "Billing Agent",
    desc: "Automates your entire revenue cycle: invoices, payment tracking, reminders, and financial reporting.",
    bullets: ["Invoice generation", "Payment follow-ups", "Financial reporting", "Reconciliation workflows"],
    href: "/agent-billing",
  },
  {
    icon: Scale, title: "Legal Agent",
    desc: "AI-powered contract handling, compliance monitoring, and regulatory document management for Saudi businesses.",
    bullets: ["Contract drafting", "Compliance tracking", "Document management", "Risk flagging"],
    href: "/agent-legal",
  },
  {
    icon: BarChart3, title: "Sales & Reservations Agent",
    desc: "Handles lead qualification, booking flows, confirmations, and CRM sync — all through WhatsApp automatically.",
    bullets: ["Lead qualification", "Booking automation", "CRM sync", "Follow-up workflows"],
    href: "/agent-sales",
  },
];

function Agents() {
  return (
    <SnapSection>
      <div className="w-full max-w-6xl mx-auto">
        <InView className="text-center mb-12">
          <Badge label="AI Agents" />
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-700 mb-3">
            Four Agents.<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Unlimited Capability.</span>
          </motion.h2>
          <GlowLine />
        </InView>
        <InView className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map(({ icon: Icon, title, desc, bullets, href }) => (
            <motion.div key={title} variants={fadeUp}
              className="rounded-2xl border p-5 flex flex-col cursor-pointer"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
              whileHover={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.035)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Icon className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="font-700 text-sm text-white mb-2">{title}</h3>
              <p className="text-white/38 text-xs leading-relaxed mb-4 flex-1">{desc}</p>
              <ul className="space-y-1.5 mb-4">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[11px] text-white/42">
                    <Check className="w-3 h-3 text-white/30 flex-shrink-0" />{b}
                  </li>
                ))}
              </ul>
              <a href={href} className="flex items-center gap-1 text-[11px] font-600 text-white/35 hover:text-white transition-colors mt-auto">
                Learn more <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </InView>
      </div>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 4 — INDUSTRIES + WORKFLOW
────────────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  { icon: Home,        title: "Real Estate",  desc: "AI-powered lead qualification, viewing scheduling, and contract workflows." },
  { icon: Hotel,       title: "Hospitality",  desc: "Reservation automation, guest communication, and upselling via WhatsApp." },
  { icon: Heart,       title: "Healthcare",   desc: "Appointment management, patient reminders, and compliance workflows." },
  { icon: ShoppingBag, title: "Retail",       desc: "Order tracking, inventory alerts, and customer service automation." },
  { icon: Briefcase,   title: "Enterprise",   desc: "Large-scale operational AI, team coordination, and strategic intelligence." },
  { icon: Building2,   title: "Corporate",    desc: "Legal compliance, HR workflows, and executive reporting automation." },
];

const FLOW = [
  { n: "01", label: "Customer Message",  sub: "WhatsApp inquiry received" },
  { n: "02", label: "AI Processing",     sub: "Intent & context analysis" },
  { n: "03", label: "Task Execution",    sub: "Automated workflow triggered" },
  { n: "04", label: "CRM Sync",          sub: "Data pushed to your system" },
  { n: "05", label: "Business Outcome",  sub: "Confirmation delivered" },
];

function IndustriesAndFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-80px" });

  return (
    <SnapSection>
      <div className="w-full max-w-6xl mx-auto space-y-16">
        <InView className="w-full">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <Badge label="Industries" />
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-700 mb-3">Built for Every Sector.</motion.h2>
            <GlowLine />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                whileHover={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.035)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon className="w-4 h-4 text-white/55" />
                </div>
                <h3 className="font-700 text-sm text-white mb-1.5">{title}</h3>
                <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </InView>

        <div ref={flowRef} className="w-full">
          <div className="text-center mb-8">
            <Badge label="How It Works" />
            <h2 className="text-2xl font-700 text-white mb-3">From Message to Outcome.</h2>
            <GlowLine />
          </div>
          {/* Mobile */}
          <div className="flex flex-col gap-2 sm:hidden">
            {FLOW.map((step, i) => (
              <div key={step.label} className="flex flex-col gap-2">
                <motion.div initial={{ opacity: 0, x: -16 }} animate={flowInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.1, ease }}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-white/8"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-700 flex-shrink-0 text-white/45"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    {step.n}
                  </div>
                  <div>
                    <p className="font-700 text-xs text-white leading-tight">{step.label}</p>
                    <p className="text-white/35 text-[9px] mt-0.5 leading-snug">{step.sub}</p>
                  </div>
                </motion.div>
                {i < FLOW.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-white/20 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-center gap-0">
            {FLOW.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={flowInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15, ease }}
                  className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl border border-white/8 w-36 h-32"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-700 text-white/45"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    {step.n}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-700 text-xs text-white leading-tight">{step.label}</p>
                    <p className="text-white/35 text-[9px] mt-1 leading-snug">{step.sub}</p>
                  </div>
                </motion.div>
                {i < FLOW.length - 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={flowInView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                    className="flex items-center justify-center w-8 flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-white/20" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 5 — TRUST + METRICS
────────────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Shield,         label: "Enterprise Security",   desc: "Bank-grade encryption, role-based access, full audit trails." },
  { icon: Clock,          label: "24/7 Operations",       desc: "Your AI workforce never sleeps. Always available, always responsive." },
  { icon: MessageCircle,  label: "WhatsApp Native",       desc: "No new apps. Fully native WhatsApp integration for every workflow." },
  { icon: Building2,      label: "Arabic & English",      desc: "Bilingual AI with full RTL support and Saudi context understanding." },
];

const METRICS = [
  { value: 67, suffix: "%", label: "Faster Response Times" },
  { value: 3,  suffix: "×", label: "Operational Efficiency" },
  { value: 24, suffix: "/7", label: "AI Availability" },
  { value: 90, suffix: "%", label: "Manual Tasks Reduced" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function TrustAndMetrics() {
  return (
    <SnapSection>
      <div className="w-full max-w-6xl mx-auto space-y-16">
        <InView className="w-full">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <Badge label="Why Electi" />
            <motion.h2 variants={fadeUp} className="text-3xl font-700 mb-3">
              Built for Modern<br />Business Operations.
            </motion.h2>
            <GlowLine />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, label, desc }) => (
              <motion.div key={label} variants={fadeUp}
                className="rounded-2xl border p-5 text-center"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Icon className="w-5 h-5 text-white/55" />
                </div>
                <h4 className="font-700 text-sm text-white mb-1.5">{label}</h4>
                <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </InView>

        <InView className="w-full">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <Badge label="Results" />
            <motion.h2 variants={fadeUp} className="text-3xl font-700 mb-3">The Numbers Speak.</motion.h2>
            <GlowLine />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {METRICS.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={fadeUp}
                className="rounded-2xl border p-6 text-center"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <p className="font-700 mb-2 text-white" style={{ fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1 }}>
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="text-white/45 text-xs font-500 leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </div>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 6 — LEAD CAPTURE + FAQ
────────────────────────────────────────────────────────────────── */
const AGENT_OPTIONS    = ["Personal Agent", "Billing Agent", "Legal Agent", "Sales Agent", "All Agents"];
const INDUSTRY_OPTIONS = ["Real Estate", "Hospitality", "Healthcare", "Retail", "Corporate", "Other"];

const FAQS = [
  { q: "How does Electi work?",       a: "Electi deploys AI agents that connect to your WhatsApp business account. Customers message as normal — the AI handles responses, workflows, and task execution automatically, escalating to humans only when needed." },
  { q: "Does it support Arabic?",     a: "Yes. Electi is built natively for Saudi businesses with full Arabic language support, RTL interfaces, and deep understanding of local business context and culture." },
  { q: "Can it integrate with my CRM?", a: "Yes. Electi integrates with major CRM platforms and can sync data, update records, and trigger workflows automatically. Custom integrations are available for enterprise clients." },
  { q: "Is WhatsApp required?",       a: "WhatsApp is our primary interface because it's where Saudi customers already are. However, Electi also supports web chat, email workflows, and custom API integrations." },
  { q: "Can it automate reservations?", a: "Absolutely. The Sales & Reservations Agent handles end-to-end booking flows — availability checks, confirmations, reminders, and follow-ups — all via WhatsApp automatically." },
  { q: "Is Electi enterprise-ready?", a: "Yes. Electi is built on enterprise-grade infrastructure with bank-level security, full audit trails, role-based access control, and SLA guarantees for large-scale deployments." },
];

function LeadAndFAQ() {
  const [form, setForm]         = useState({ name: "", company: "", phone: "", email: "", industry: "", agent: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen]         = useState<number | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, company: form.company,
          source: "letsconnect",
          message: `Industry: ${form.industry || "N/A"} | Agent Interest: ${form.agent || "N/A"}`,
          status: "new",
        }),
      });
      if (res.ok) { setSubmitted(true); return; }
    } catch { /* falls through to mailto */ }
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nIndustry: ${form.industry}\nInterested Agent: ${form.agent}`
    );
    window.open(`mailto:a@electi.sa?subject=Demo%20Request%20from%20${encodeURIComponent(form.name)}&body=${body}`, "_blank");
    setSubmitting(false);
  };

  const inputCls   = "w-full rounded-xl px-4 py-3 text-sm text-white bg-transparent outline-none transition-colors placeholder:text-white/25";
  const inputStyle = { border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" };

  return (
    <SnapSection id="demo">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Lead form */}
        <div>
          <InView className="mb-8">
            <Badge label="Get Started" />
            <motion.h2 variants={fadeUp} className="text-3xl font-700 mb-3">Build Your AI Workforce.</motion.h2>
            <GlowLine />
            <motion.p variants={fadeUp} className="text-white/42 text-sm mt-4 max-w-md">
              Tell us about your business and we'll show you exactly how Electi can transform your operations.
            </motion.p>
          </InView>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease }} className="rounded-2xl border p-10 text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-700 text-white mb-2">Request Received!</h3>
              <p className="text-white/45 text-sm max-w-xs mx-auto leading-relaxed mb-6">
                Our team will reach out within 24 hours to schedule your free demo.
              </p>
              <WABtn label="Connect on WhatsApp Now" />
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }} viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="rounded-2xl border p-6 sm:p-8"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input required placeholder="Your Name"      value={form.name}     onChange={set("name")}     className={inputCls} style={inputStyle} />
                <input required placeholder="Company Name"   value={form.company}  onChange={set("company")}  className={inputCls} style={inputStyle} />
                <input required placeholder="Phone Number"   value={form.phone}    onChange={set("phone")}    className={inputCls} style={inputStyle} />
                <input required placeholder="Email Address" type="email" value={form.email} onChange={set("email")} className={inputCls} style={inputStyle} />
                <select value={form.industry} onChange={set("industry")} className={inputCls} style={{ ...inputStyle, color: form.industry ? "white" : "rgba(255,255,255,0.25)" }}>
                  <option value="" disabled>Select Industry</option>
                  {INDUSTRY_OPTIONS.map(o => <option key={o} value={o} style={{ background: "#111", color: "white" }}>{o}</option>)}
                </select>
                <select value={form.agent} onChange={set("agent")} className={inputCls} style={{ ...inputStyle, color: form.agent ? "white" : "rgba(255,255,255,0.25)" }}>
                  <option value="" disabled>Interested AI Agent</option>
                  {AGENT_OPTIONS.map(o => <option key={o} value={o} style={{ background: "#111", color: "white" }}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <motion.button type="submit" disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl text-sm font-700 text-black disabled:opacity-60 disabled:cursor-not-allowed bg-white hover:bg-white/90 transition-all">
                  {submitting ? "Sending…" : "Book Free Demo"}
                </motion.button>
                <WABtn label="Talk on WhatsApp" />
              </div>
            </motion.form>
          )}
        </div>

        {/* FAQ */}
        <div>
          <InView className="mb-8">
            <Badge label="FAQ" />
            <motion.h2 variants={fadeUp} className="text-3xl font-700 mb-3">Common Questions.</motion.h2>
            <GlowLine />
          </InView>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease }}
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ borderColor: open === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", background: open === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)" }}
                onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-600 text-sm text-white pr-4">{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
                    <X className="w-4 h-4 text-white/35" />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }}>
                      <p className="px-5 pb-4 text-white/45 text-sm leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SnapSection>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION 7 — FINAL CTA + FOOTER
────────────────────────────────────────────────────────────────── */
function FinalSection() {
  return (
    <section style={{ scrollSnapAlign: "start" }}>
      <div className="relative flex flex-col items-center justify-center text-center px-5 sm:px-8 py-24 sm:py-32 min-h-[60dvh]">
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%,rgba(255,255,255,0.03) 0%,transparent 70%)" }} />
        <InView className="relative z-10 max-w-3xl mx-auto">
          <Badge label="Get Started Today" />
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-700 mb-5 leading-tight">
            The Future of Operations<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Starts Here.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Transform communication, workflows, and business operations through intelligent AI systems — built for Saudi Arabia.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryBtn label="Book Free Demo" href={DEMO_MAILTO} />
            <WABtn label="Activate AI Workforce" />
          </motion.div>
        </InView>
      </div>
      <Footer />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING WHATSAPP BUTTON
────────────────────────────────────────────────────────────────── */
const LC_BUBBLE_KEY = "electi-lc-bubble-v2";
const LC_WA_LINK    = `https://wa.me/966502547274?text=${encodeURIComponent("Hello Electi Team,\n\nI visited your landing page and would like to learn more about your AI solutions.")}`;

function FloatingWA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => !!sessionStorage.getItem(LC_BUBBLE_KEY));

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {!dismissed && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.35, ease }}
            className="relative rounded-xl border border-white/10 px-4 py-3 text-sm font-500 text-white/80 max-w-[220px] text-center"
            style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)" }}>
            <button onClick={() => { setDismissed(true); sessionStorage.setItem(LC_BUBBLE_KEY, "1"); }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white/50 hover:text-white"
              style={{ background: "rgba(255,255,255,0.1)" }}>✕</button>
            Chat with us on WhatsApp ↓
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a href={LC_WA_LINK} target="_blank" rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "#25D366" }}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </motion.a>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PAGE EXPORT
────────────────────────────────────────────────────────────────── */
export default function LetsConnect() {
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
    <div ref={scrollRef} className="bg-[#050505] text-white"
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <Navbar hidden={navHidden} scrolled={navScrolled} />
      <Hero />
      <PainPoints />
      <Agents />
      <IndustriesAndFlow />
      <TrustAndMetrics />
      <LeadAndFAQ />
      <FinalSection />
      <FloatingWA />
    </div>
  );
}
