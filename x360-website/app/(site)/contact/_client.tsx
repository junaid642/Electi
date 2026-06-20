"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail, Phone, MessageCircle, Loader2,
  ArrowRight, Globe, Cpu, Building2, Smartphone, Layers, Camera, Zap, MapPin, Volume2, VolumeX,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaConfig } from "@/lib/useMediaConfig";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function uid() { return Math.random().toString(36).slice(2, 10); }

function injectLeadIntoAdminStore(form: {
  name: string; email: string; phone: string; company: string;
  service: string; budget: string; industry: string; message: string;
}) {
  try {
    const raw = localStorage.getItem("x360-store-v2");
    const store = raw ? JSON.parse(raw) : { state: {}, version: 0 };
    const state = store.state ?? {};
    const now = new Date().toISOString();
    const twoDaysLater = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const id = `web-${uid()}`;
    const newLead = {
      id, company: form.company || form.name, contact: form.name,
      designation: "Decision Maker", phone: form.phone || "", whatsapp: form.phone || "",
      email: form.email, website: "", linkedin: "", industry: form.industry || "Other",
      city: "KSA", country: "KSA", value: 0, stage: "Incoming Lead", score: 55,
      assigned: "Unassigned", source: "Website", priority: "High",
      lastContact: now.slice(0, 10), nextFollowUp: twoDaysLater,
      notes: [form.service && `Service Interest: ${form.service}`, form.budget && `Budget: ${form.budget}`, form.message && `\nMessage:\n${form.message}`].filter(Boolean).join("\n"),
      createdAt: now, temperature: "Warm", urgency: "Medium",
      decisionMakerIdentified: false, vip: false, expansionPotential: false,
      services: form.service ? [form.service] : [],
      activities: [{ id: `a-${uid()}`, type: "note", text: "Lead submitted via X360 website contact form", author: "System", timestamp: now }],
      tasks: [{ id: `t-${uid()}`, title: `Initial contact — respond to website inquiry from ${form.name}`, assignee: "Unassigned", dueDate: twoDaysLater, done: false, priority: "High" }],
      communications: [{ id: `c-${uid()}`, type: "email", content: form.message || "Website inquiry submitted", author: "System", timestamp: now, direction: "in" }],
    };
    const newNotification = {
      id: `notif-${uid()}`, type: "lead", title: "New Website Inquiry",
      body: `${form.name}${form.company ? ` from ${form.company}` : ""} submitted a contact form`,
      timestamp: now, read: false, leadId: id,
    };
    store.state = { ...state, leads: [newLead, ...(state.leads ?? [])], notifications: [newNotification, ...(state.notifications ?? [])] };
    localStorage.setItem("x360-store-v2", JSON.stringify(store));
  } catch { /* silently fail */ }
}

/* ─── FLOATING LABEL INPUT ───────────────────────────────────────────────── */
function FloatInput({
  label, required, value, onChange, type = "text", placeholder = "", name,
}: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; type?: string; placeholder?: string; name?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || !!value;
  return (
    <div className="relative group">
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 z-10"
        style={{
          top: floating ? "8px" : "50%",
          transform: floating ? "none" : "translateY(-50%)",
          fontSize: floating ? "10px" : "13px",
          color: focused ? "rgba(255,255,255,0.85)" : floating ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.70)",
          letterSpacing: floating ? "0.07em" : "0.02em",
        }}
      >
        {label}{required && <span className="text-white/30 ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={focused ? placeholder : ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-2.5 rounded-xl text-sm text-white transition-all duration-200 focus:outline-none placeholder-white/15 bg-transparent"
        style={{
          background: focused ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.028)",
          border: focused ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 28px rgba(255,255,255,0.04)" : "none",
        }}
      />
    </div>
  );
}

function FloatSelect({
  label, required, value, onChange, options, placeholder,
}: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const floating = !!value;
  return (
    <div className="relative group">
      {floating && (
        <label
          className="absolute left-4 pointer-events-none z-10 transition-all duration-200"
          style={{ top: "8px", fontSize: "10px", color: "rgba(255,255,255,0.60)", letterSpacing: "0.07em" }}
        >
          {label}{required && <span className="text-white/30 ml-0.5">*</span>}
        </label>
      )}
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 rounded-xl text-sm text-white transition-all duration-200 focus:outline-none appearance-none"
        style={{
          paddingTop: floating ? "24px" : "14px",
          paddingBottom: "10px",
          background: focused ? "rgba(12,12,12,0.98)" : "rgba(8,8,8,0.98)",
          border: focused ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.08)",
          color: value ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
          colorScheme: "dark",
        }}
      >
        <option value="" disabled style={{ background: "#0a0a0a" }}>{placeholder}</option>
        {options.map((o) => (<option key={o} value={o} style={{ background: "#0a0a0a" }}>{o}</option>))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}

function FloatTextarea({
  label, required, value, onChange, placeholder, rows = 3,
}: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || !!value;
  return (
    <div className="relative group">
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 z-10"
        style={{
          top: floating ? "10px" : "18px",
          fontSize: floating ? "10px" : "13px",
          color: focused ? "rgba(255,255,255,0.55)" : floating ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.30)",
          letterSpacing: floating ? "0.07em" : "0.02em",
        }}
      >
        {label}{required && <span className="text-white/30 ml-0.5">*</span>}
      </label>
      <textarea
        required={required}
        value={value}
        rows={rows}
        placeholder={focused ? placeholder : ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-8 pb-3 rounded-xl text-sm text-white resize-none transition-all duration-200 focus:outline-none placeholder-white/15 bg-transparent"
        style={{
          background: focused ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.028)",
          border: focused ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 1px rgba(255,255,255,0.06) inset" : "none",
        }}
      />
    </div>
  );
}

/* ─── CINEMATIC BG ───────────────────────────────────────────────────────── */
function CinematicBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.03]" />
    </div>
  );
}

/* ─── FADE IN WRAPPER ────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── CLIENT LOGOS ───────────────────────────────────────────────────────── */
const TRUST_LOGOS = [
  { src: "/x360/clients/ekal.webp",          name: "Ekal"              },
  { src: "/x360/clients/sireus.webp",         name: "Sireus"            },
  { src: "/x360/clients/client3.webp",        name: "Client"            },
  { src: "/x360/clients/sobha.webp",          name: "Sobha Realty"      },
  { src: "/x360/clients/kw.webp",             name: "Keller Williams"   },
  { src: "/x360/clients/balcona99.webp",      name: "Balcona'99",       scale: 1.3 },
  { src: "/x360/clients/rania-hotels.webp",   name: "Rania Hotels"      },
  { src: "/x360/clients/villa-fayrouz.webp",  name: "Villa Fayrouz",    scale: 2.0 },
  { src: "/x360/clients/riyadh-cables.webp",  name: "Riyadh Cables",    scale: 2.0 },
  { src: "/x360/clients/prestige.webp",       name: "Prestige"          },
  { src: "/x360/clients/ekal-catering.webp",  name: "Ekal Catering",    scale: 2.0 },
  { src: "/x360/clients/joori.webp",          name: "Joori min Beirut", scale: 1.3 },
  { src: "/x360/clients/zonoza.webp",         name: "Zonoza Group",     scale: 2.0 },
  { src: "/x360/clients/limonaia.webp",       name: "Limonaia"          },
];
const TRUST_DOUBLED = [...TRUST_LOGOS, ...TRUST_LOGOS];

/* ─── ANIMATED TEXT CYCLE ────────────────────────────────────────────────── */
function AnimatedTextCycle({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="relative inline-block" aria-live="polite">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="absolute inset-0 flex items-center justify-center shimmer-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function GlowRuleCenter() {
  return (
    <div style={{ width: "clamp(80px, 16vw, 180px)", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)", margin: "0 auto" }} />
  );
}

/* ─── FADE UP WRAPPER ────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── SHOWREEL VIDEO SECTION ─────────────────────────────────────────────── */
function ShowreelSection() {
  const { isAr } = useLang();
  const get = useMediaConfig();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleAudio = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="relative overflow-hidden flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={get("contact.hero-video", "/x360/contact-showreel.mp4")} type="video/mp4" />
      </video>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

      {/* Audio toggle — centred */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          onClick={toggleAudio}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="flex flex-col items-center gap-3 cursor-pointer"
          style={{ background: "none", border: "none" }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}>
            {muted ? (
              /* Volume off */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              /* Volume on */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </div>
          <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
            {muted ? (isAr ? "تفعيل الصوت" : "Enable Audio") : (isAr ? "كتم الصوت" : "Mute Audio")}
          </span>
        </motion.button>
      </div>
    </section>
  );
}

/* ─── WHAT WE BUILD DATA ─────────────────────────────────────────────────── */
const BUILD_ITEMS = [
  { icon: Camera,    titleEn: "360° Virtual Tours",        titleAr: "جولات افتراضية 360°",        descEn: "Immersive spatial experiences for real estate, hospitality & enterprise", descAr: "تجارب مكانية غامرة للعقارات والضيافة والمؤسسات" },
  { icon: Cpu,       titleEn: "AI Ecosystems",             titleAr: "منظومات الذكاء الاصطناعي",   descEn: "Intelligent automation, machine learning & AI-powered business platforms", descAr: "أتمتة ذكية وتعلم آلي ومنصات أعمال مدعومة بالذكاء الاصطناعي" },
  { icon: Globe,     titleEn: "Website & App Platforms",   titleAr: "منصات المواقع والتطبيقات",   descEn: "Premium digital products built for conversion, growth & enterprise scale", descAr: "منتجات رقمية متميزة مبنية للتحويل والنمو وتوسع المؤسسات" },
  { icon: Layers,    titleEn: "ERP / SAP Systems",         titleAr: "أنظمة ERP / SAP",             descEn: "Enterprise resource planning, integration & operational transformation", descAr: "تخطيط موارد المؤسسة والتكامل والتحول التشغيلي" },
  { icon: Building2, titleEn: "Enterprise Infrastructure", titleAr: "البنية التحتية للمؤسسات",    descEn: "End-to-end digital ecosystems for complex organisational environments", descAr: "منظومات رقمية شاملة للبيئات التنظيمية المعقدة" },
  { icon: Zap,       titleEn: "Immersive Experiences",     titleAr: "التجارب الغامرة",             descEn: "VR / AR, 3D spatial mapping & next-generation interactive environments", descAr: "الواقع الافتراضي/المعزز ورسم الخرائط المكانية ثلاثية الأبعاد" },
];

/* ─── TRUST STATEMENTS ───────────────────────────────────────────────────── */
const TRUST = [
  { en: "End-to-End Digital Ecosystems",      ar: "منظومات رقمية شاملة من البداية إلى النهاية" },
  { en: "Enterprise-Grade Infrastructure",    ar: "بنية تحتية على مستوى المؤسسات" },
  { en: "AI-Powered Experiences",             ar: "تجارب مدعومة بالذكاء الاصطناعي" },
  { en: "Immersive Technology Specialists",   ar: "متخصصون في التقنيات الغامرة" },
  { en: "Luxury Digital Experiences",         ar: "تجارب رقمية فاخرة" },
  { en: "Future-Ready Platforms",             ar: "منصات جاهزة للمستقبل" },
];

/* ─── CONTACT PAGE ───────────────────────────────────────────────────────── */
export default function ContactClient() {
  const { isAr } = useLang();
  const get = useMediaConfig();

  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left  = leftPanelRef.current;
    const right = rightPanelRef.current;
    if (!left || !right) return;

    const handler = (e: WheelEvent) => {
      const atBottom = right.scrollTop + right.clientHeight >= right.scrollHeight - 4;
      const atTop    = right.scrollTop <= 0;

      if (e.deltaY > 0 && !atBottom) {
        e.preventDefault();
        right.scrollTop += e.deltaY;
      } else if (e.deltaY < 0 && !atTop) {
        e.preventDefault();
        right.scrollTop += e.deltaY;
      }
      // otherwise let native page scroll take over (reveals footer / scrolls back up)
    };

    left.addEventListener("wheel", handler, { passive: false });
    return () => left.removeEventListener("wheel", handler);
  }, []);

  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [mobileAudioMuted, setMobileAudioMuted] = useState(true);
  const toggleMobileAudio = () => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !mobileVideoRef.current.muted;
      setMobileAudioMuted(prev => !prev);
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    company: "", service: "", source: "", message: "",
  });

  const f = (key: keyof typeof form) => form[key];
  const set = (key: keyof typeof form) => (v: string) => setForm((prev) => ({ ...prev, [key]: v }));

  const serviceOptions = isAr
    ? ["جولات افتراضية 360°", "تطوير المواقع الإلكترونية", "تطبيقات الجوال", "حلول الذكاء الاصطناعي", "أنظمة ERP / SAP", "المنظومات الرقمية", "تجارب VR / AR", "أخرى"]
    : ["360 Virtual Tours", "Website Development", "Mobile Applications", "AI Solutions", "ERP / SAP Systems", "Digital Ecosystems", "VR / AR Experiences", "Other"];

  const sourceOptions = isAr
    ? ["بحث Google", "وسائل التواصل الاجتماعي", "إحالة", "واتساب", "عميل حالي", "فعالية / معرض", "إعلان", "أخرى"]
    : ["Google Search", "Social Media", "Referral", "WhatsApp", "Existing Client", "Event / Exhibition", "Advertisement", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const fullMessage = [
      form.message && `Project Vision:\n${form.message}`,
      form.source && `How they found us: ${form.source}`,
    ].filter(Boolean).join("\n\n");

    injectLeadIntoAdminStore({
      name: form.name, email: form.email, phone: form.phone,
      company: form.company, service: form.service, budget: "",
      industry: "", message: fullMessage,
    });

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: form.phone || undefined,
          source: "website-contact",
          message: [form.company && `Company: ${form.company}`, form.service && `Service: ${form.service}`, fullMessage].filter(Boolean).join("\n"),
          status: "new",
        }),
      });
    } catch { /* silently fallthrough */ }

    setSubmitted(true);
    setSubmitting(false);
  };

  /* ── FORM PANEL ──────────────────────────────────────────────────────── */
  const FormPanel = (
    <div
      className="rounded-3xl p-5 sm:p-6 flex flex-col gap-3"
      style={{
        background: "#000000",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
      }}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="py-14 text-center flex flex-col items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)" }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </motion.div>
            <div>
              <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-black text-2xl mb-2">
                {isAr ? "تم استلام رسالتك!" : "Inquiry Received."}
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/42 text-sm leading-relaxed max-w-xs mx-auto">
                {isAr ? "سيتواصل معك أحد متخصصينا خلال ساعتين." : "A specialist will reach out within 2 hours on business days."}
              </motion.p>
            </div>
            <motion.a
              href="https://wa.me/966532087436" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: "#25D366" }} />
              {isAr ? "تحدث على واتساب" : "Chat on WhatsApp"}
            </motion.a>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Form heading */}
            <div className="mb-1">
              <h2 className="font-black leading-snug tracking-widest text-center" style={{ fontFamily: "Quicksand, sans-serif" }}>
                <span style={{ color: "#e53e3e", fontSize: "16px" }}>GET  IN  TOUCH  TODAY !</span><br />
                <span style={{ fontFamily: "Cairo, sans-serif", letterSpacing: "0.05em", fontSize: "11px", color: "#c0392b", opacity: 0.75 }}>احصل على  اللمسة  اليوم !</span>
              </h2>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />

            {/* Required fields */}
            <FloatInput label="Full Name  /  الاسم الكامل" required value={f("name")} onChange={set("name")} placeholder="John Smith" name="name" />
            <FloatInput label="Email Address  /  البريد الإلكتروني" required type="email" value={f("email")} onChange={set("email")} placeholder="you@company.com" name="email" />
            <FloatInput label="Phone Number  /  رقم الهاتف" required type="tel" value={f("phone")} onChange={set("phone")} placeholder="+966 5XX XXX XXXX" name="phone" />
            <FloatInput label="Company Name  /  اسم الشركة" value={f("company")} onChange={set("company")} placeholder="X360 / شركتك" name="company" />

            {/* Optional fields */}
            <FloatSelect
              label="How Did You Hear About Us?  /  كيف سمعت عنا؟"
              value={f("source")} onChange={set("source")}
              options={sourceOptions}
              placeholder="How did you know about us?  /  كيف عرفت عنا؟"
            />
            <FloatTextarea
              label="Message  /  رؤيتك / مشروعك"
              value={f("message")} onChange={set("message")}
              placeholder="Tell us about your project…  /  أخبرنا عن مشروعك"
              rows={2}
            />

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.015, y: submitting ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-black text-sm tracking-wide bg-white text-black flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{ boxShadow: "0 0 35px rgba(255,255,255,0.18)" }}
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" />{isAr ? "جارٍ الإرسال…" : "Sending…"}</>
                : <>{isAr ? "إرسال الاستفسار" : "Send Inquiry"}<ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} /></>
              }
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-clip lg:pt-16" dir={isAr ? "rtl" : "ltr"}>
      <CinematicBg />

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT: sticky left form + scrolling right content
          MOBILE LAYOUT: stacked vertically
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-[1400px] mx-auto">

        {/* ── MOBILE: snap-scroll layout (3 sections) ──────────────── */}
        <div
          className="lg:hidden"
          style={{ height: "calc(100dvh - 64px)", marginTop: "64px", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {/* ── MOBILE SECTION 1: Full-screen video hero ── */}
          <section className="relative flex-shrink-0 overflow-hidden" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={get("contact.mobile-video", "/x360/contact-mobile.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)" }} />

            {/* Audio toggle */}
            <button
              onClick={toggleMobileAudio}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              aria-label={mobileAudioMuted ? "Enable audio" : "Mute audio"}
            >
              {mobileAudioMuted
                ? <VolumeX className="w-4 h-4 text-white/70" />
                : <Volume2 className="w-4 h-4 text-white" />}
            </button>

            {/* Bottom frosted panel — edge to edge */}
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-4 pb-8 pt-6"
              style={{
                height: "30%",
                background: "rgba(0,0,0,0.38)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="font-bold tracking-[0.2em] uppercase text-center"
                style={{
                  fontSize: "clamp(0.9rem, 4vw, 1.15rem)",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#ffffff",
                }}>
                GET IN TOUCH WITH US
              </p>
              <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)" }} />
              <p className="font-light text-white/65" style={{ fontFamily: "Cairo, sans-serif", fontSize: "1rem" }}>
                تواصل معنا
              </p>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-2 mt-auto">
                <span className="text-[9px] tracking-[0.22em] uppercase text-white/50">
                  {isAr ? "مرر للأسفل" : "Scroll Down"}
                </span>
                <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <motion.div
                    className="w-full h-1/2 bg-white/65"
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── MOBILE SECTION 2: Form ── */}
          <section className="flex-shrink-0 overflow-y-auto px-5 py-6" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
            {FormPanel}
          </section>

          {/* ── MOBILE SECTION 3: Why X360 ── */}
          <section className="relative flex-shrink-0 flex flex-col items-center justify-center px-5 py-8" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start", background: "#000" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
            <div className="w-full text-center flex flex-col items-center gap-6 relative z-10">
              <FadeUp>
                <p className="text-white/30 font-medium" style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                  {isAr ? "لماذا X360" : "Why X360"}
                </p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="font-thin leading-none px-4" style={{ fontSize: "clamp(1.1rem, 5vw, 1.7rem)" }}>
                  <AnimatedTextCycle
                    words={isAr ? TRUST.map(item => item.ar) : TRUST.map(item => item.en)}
                    interval={2200}
                  />
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}><GlowRuleCenter /></FadeUp>
              <FadeUp delay={0.20}>
                <p className="text-white/30 max-w-xs mx-auto" style={{ letterSpacing: "0.08em", fontSize: "0.75rem", lineHeight: 1.7 }}>
                  {isAr ? "كل صناعة. كل سير عمل. منصة ذكية واحدة." : "Every industry. Every workflow. One intelligent platform."}
                </p>
              </FadeUp>
            </div>
          </section>

          {/* ── MOBILE SECTION 5: Trusted by Leaders ── */}
          <section className="relative flex-shrink-0 flex flex-col items-center justify-center px-5 py-8 gap-8" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start", background: "#000" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
            <div className="flex flex-col items-center text-center gap-6 w-full relative z-10">
              <FadeUp>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.18em] uppercase"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                  {isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-thin leading-tight px-4"
                  style={{ fontSize: "clamp(1.4rem, 6vw, 2rem)", letterSpacing: "0.1em", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif" }}>
                  {isAr ? "موثوق به من القادة" : "Trusted by Leaders"}
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div style={{ width: "clamp(60px, 12vw, 140px)", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }} />
              </FadeUp>
              {/* Marquee */}
              <FadeUp delay={0.2} className="relative w-full overflow-hidden py-4 marquee-outer">
                <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
                <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />
                <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 46s linear infinite" }}>
                  {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
                    <div key={i} className="inline-flex items-center justify-center flex-shrink-0 mx-4 px-4 py-2 rounded-xl overflow-hidden"
                      style={{ width: 140, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={name} loading="lazy" decoding="async" className="h-16 w-auto object-contain"
                        style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
                    </div>
                  ))}
                </div>
              </FadeUp>
              {/* Stats */}
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                  {[
                    { num: "50+",     label: isAr ? "مشروع مُنجز"  : "Projects Delivered" },
                    { num: "SAR 2B+", label: isAr ? "محفظة مُدارة" : "Portfolio Managed"  },
                    { num: "99.9%",   label: isAr ? "وقت تشغيل"    : "Uptime SLA"         },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="font-thin text-white"
                        style={{ fontSize: "clamp(0.9rem, 4vw, 1.3rem)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: "0.06em" }}>
                        {s.num}
                      </span>
                      <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ── MOBILE SECTION 5: Direct Contact ── */}
          <section className="flex-shrink-0 flex flex-col items-center justify-center px-5 py-8" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
            <p className="text-[9px] tracking-[0.28em] uppercase text-white/25 mb-2 text-center">
              {isAr ? "تواصل مباشر" : "Direct Contact"}
            </p>
            <h2 className="font-thin text-center mb-8"
              style={{ fontSize: "clamp(1.2rem, 6vw, 1.8rem)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: "0.1em" }}>
              {isAr ? "نحن هنا. دائماً." : "WE'RE HERE. ALWAYS."}
            </h2>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {[
                { icon: MessageCircle, label: isAr ? "واتساب" : "WhatsApp", value: "+966 532 087 436", sub: isAr ? "أسرع طريقة للتواصل" : "Fastest way to reach us", href: "https://wa.me/966532087436", color: "#25D366", isLink: true, ltr: true },
                { icon: Mail, label: isAr ? "البريد" : "Email", value: "mohammed@x-360.ai", sub: isAr ? "للاستفسارات الرسمية" : "Formal inquiries", href: "mailto:mohammed@x-360.ai", color: "rgba(255,255,255,0.7)", isLink: true, ltr: true },
                { icon: Phone, label: isAr ? "الهاتف" : "Phone", value: "+966 532 087 436", sub: isAr ? "سبت – خميس" : "Sat – Thu", href: "tel:+966532087436", color: "rgba(255,255,255,0.7)", isLink: true, ltr: true },
                { icon: MapPin, label: isAr ? "الموقع" : "Location", value: isAr ? "الرياض" : "Riyadh", sub: isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia", href: null, color: "rgba(255,255,255,0.7)", isLink: false, ltr: false },
              ].map((ch, i) => {
                const Icon = ch.icon;
                const cardInner = (
                  <>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Icon className="w-4 h-4" style={{ color: ch.color }} />
                    </div>
                    <p className="text-[9px] tracking-widest uppercase text-white/28 mb-1">{ch.label}</p>
                    <p className="font-bold text-[11px] text-white/80 mb-0.5 break-all" dir={ch.ltr ? "ltr" : undefined}>{ch.value}</p>
                    <p className="text-[10px] text-white/28 leading-tight">{ch.sub}</p>
                  </>
                );
                return ch.isLink ? (
                  <a key={i} href={ch.href!}
                    target={ch.href!.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href!.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {cardInner}
                  </a>
                ) : (
                  <div key={i} className="rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── MOBILE SECTION 6: Footer ── */}
          <section className="flex-shrink-0" style={{ scrollSnapAlign: "start", minHeight: "calc(100dvh - 64px)" }}>
            <Footer />
          </section>

        </div>

        {/* ── DESKTOP SPLIT ────────────────────────────────────────────── */}
        <div className="hidden lg:flex overflow-hidden" style={{ height: "calc(100dvh - 64px)" }}>

          {/* LEFT: Fixed form panel — wheel forwarded to right snap panel */}
          <div ref={leftPanelRef} className="w-[440px] flex-shrink-0 flex flex-col justify-start overflow-y-auto px-8 py-6 pt-4" style={{ scrollbarWidth: "none" }}>
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease }}>
              {FormPanel}
            </motion.div>

          </div>

          {/* Vertical divider */}
          <div className="w-px flex-shrink-0 self-stretch" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }} />

          {/* RIGHT: Snap-scrolling cinematic content */}
          <div ref={rightPanelRef} className="flex-1 overflow-y-scroll" style={{ scrollbarWidth: "none", scrollSnapType: "y mandatory" }}>

            {/* ── RIGHT SECTION 1: HERO ─────────────────────────────── */}
            <section className="relative flex flex-col justify-center px-14 py-24 overflow-hidden flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
              <img src="/x360/contact-bg.jpg" alt="" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.78 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)" }} />


              <div className="relative z-10 max-w-xl">
                <FadeUp delay={0.05}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-10 bg-white/20" />
                    <span className="text-[10px] font-semibold tracking-[0.30em] uppercase text-white/35">
                      {isAr ? "مستقبل رقمي" : "Digital Future"}
                    </span>
                  </div>
                </FadeUp>
                <FadeUp delay={0.12}>
                  <h1 className="font-thin leading-tight mb-6"
                    style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: "0.1em" }}>
                    {isAr ? (
                      <>المستقبل يبدأ<br /><span className="shimmer-text">بمحادثة.</span></>
                    ) : (
                      <>THE FUTURE<br />STARTS WITH<br /><span className="shimmer-text">A CONVERSATION.</span></>
                    )}
                  </h1>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="text-white/35 leading-relaxed max-w-md" style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                    {isAr
                      ? "منظومات غامرة مصممة للأعمال الحديثة والمؤسسات والعلامات التجارية الرائدة."
                      : "Immersive ecosystems designed for modern businesses, enterprises, and visionary brands."}
                  </p>
                </FadeUp>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-10 left-14 flex flex-col items-start gap-2">
                <span className="text-[9px] tracking-[0.22em] uppercase text-white/70">{isAr ? "مرر للأسفل" : "Scroll Down"}</span>
                <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <motion.div className="w-full h-1/2 bg-white/65"
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                </div>
              </div>
            </section>

            {/* ── RIGHT SECTION 2: SHOWREEL VIDEO ──────────────────── */}
            <ShowreelSection />

            {/* ── RIGHT SECTION 3: WHAT WE BUILD ───────────────────── */}
            <section className="px-10 py-10 flex flex-col justify-center flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
              <FadeUp className="mb-6">
                <p className="text-[9px] tracking-[0.30em] uppercase text-white/25 mb-2">
                  {isAr ? "ما نبنيه" : "What We Build"}
                </p>
                <h2 className="font-thin leading-tight" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.9rem)", letterSpacing: "0.1em" }}>
                  {isAr
                    ? <>منظومة كاملة <span className="shimmer-text" style={{ whiteSpace: "nowrap" }}>لنجاحك الرقمي</span></>
                    : <>A COMPLETE ECOSYSTEM FOR YOUR <span className="shimmer-text" style={{ whiteSpace: "nowrap" }}>DIGITAL SUCCESS.</span></>
                  }
                </h2>
              </FadeUp>

              <div className="grid grid-cols-2 gap-2.5">
                {BUILD_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <FadeUp key={i} delay={i * 0.06}>
                      <motion.div
                        whileHover={{ y: -3, scale: 1.012 }}
                        className="group relative rounded-xl p-4 overflow-hidden cursor-default"
                        style={{
                          background: "rgba(255,255,255,0.024)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                          style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                          <Icon className="w-4 h-4 text-white/60" />
                        </div>
                        <h3 className="font-bold text-xs text-white/85 mb-1.5 leading-tight">
                          {isAr ? item.titleAr : item.titleEn}
                        </h3>
                        <p className="text-[10px] text-white/32 leading-relaxed">
                          {isAr ? item.descAr : item.descEn}
                        </p>
                      </motion.div>
                    </FadeUp>
                  );
                })}
              </div>
            </section>

            {/* ── RIGHT SECTION 4: WHY X360 ────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center overflow-hidden flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start", background: "#000" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
              <div className="max-w-4xl w-full mx-auto text-center px-6 flex flex-col items-center gap-6">
                <FadeUp>
                  <p className="text-white/30 font-medium" style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                    {isAr ? "لماذا X360" : "Why X360"}
                  </p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="font-thin leading-none" style={{ fontSize: "clamp(1.3rem, 2.4vw, 2rem)" }}>
                    <AnimatedTextCycle
                      words={isAr
                        ? TRUST.map(t => t.ar)
                        : TRUST.map(t => t.en)}
                      interval={2200}
                    />
                  </h2>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <GlowRuleCenter />
                </FadeUp>
                <FadeUp delay={0.20}>
                  <p className="text-white/30 max-w-lg mx-auto" style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                    {isAr ? "كل صناعة. كل سير عمل. منصة ذكية واحدة." : "Every industry. Every workflow. One intelligent platform."}
                  </p>
                </FadeUp>
              </div>
            </section>

            {/* ── RIGHT SECTION 5: TRUSTED BY LEADERS ─────────────── */}
            <section className="relative flex flex-col items-center justify-center overflow-hidden flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start", background: "#000" }}>
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />

              <div className="flex flex-col items-center text-center gap-8 w-full relative z-10">
                {/* Badge */}
                <FadeUp delay={0}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.18em] uppercase"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}>
                    {isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
                  </span>
                </FadeUp>

                {/* Heading */}
                <FadeUp delay={0.1}>
                  <h2 className="font-thin leading-tight px-6"
                    style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "0.1em", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif" }}>
                    {isAr ? "موثوق به من القادة" : "Trusted by Leaders"}
                  </h2>
                </FadeUp>

                {/* Glow rule */}
                <FadeIn delay={0.2}>
                  <motion.div className="h-px"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ width: "clamp(60px, 12vw, 140px)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }} />
                </FadeIn>

                {/* Marquee */}
                <FadeIn delay={0.3} className="relative w-full overflow-hidden py-6 marquee-outer">
                  {/* Left fade */}
                  <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
                  {/* Right fade */}
                  <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />

                  <div dir="ltr" className="inline-flex items-center" style={{ animation: "marquee-scroll 56s linear infinite" }}>
                    {TRUST_DOUBLED.map(({ src, name, scale }, i) => (
                      <div key={i}
                        className="inline-flex items-center justify-center flex-shrink-0 mx-6 sm:mx-8 px-6 py-3 rounded-xl overflow-hidden"
                        style={{ width: 200, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={name} loading="lazy" decoding="async" className="h-24 w-auto object-contain"
                          style={{ filter: "brightness(0) invert(1)", opacity: 0.55, transform: `scale(${scale ?? 1})`, transformOrigin: "center" }} />
                      </div>
                    ))}
                  </div>

                  {/* Ambient glow beneath marquee */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ width: 600, height: 80, background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
                </FadeIn>

                {/* Stats row */}
                <FadeUp delay={0.4}>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-12">
                    {[
                      { num: "50+",     label: isAr ? "مشروع مُنجز"  : "Projects Delivered" },
                      { num: "SAR 2B+", label: isAr ? "محفظة مُدارة" : "Portfolio Managed"  },
                      { num: "99.9%",   label: isAr ? "وقت تشغيل"    : "Uptime SLA"         },
                      { num: "3+",      label: isAr ? "دول"           : "Countries"          },
                    ].map((s, i) => (
                      <div key={i} className={s.num === "3+" ? "hidden sm:flex flex-col items-center gap-1" : "flex flex-col items-center gap-1"}>
                        <span className="font-thin text-white"
                          style={{ fontSize: "clamp(0.78rem, 1.8vw, 1.4rem)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: "0.06em" }}>
                          {s.num}
                        </span>
                        <span className="text-[10px] tracking-[0.18em] uppercase"
                          style={{ color: "rgba(255,255,255,0.38)" }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </section>

            {/* ── RIGHT SECTION 6: CONTACT CHANNELS ────────────────── */}
            <section className="relative flex flex-col items-center justify-center px-14 overflow-hidden flex-shrink-0" style={{ height: "calc(100dvh - 64px)", scrollSnapAlign: "start" }}>
              <div className="w-full max-w-3xl">
              <FadeUp className="mb-10">
                <p className="text-[10px] tracking-[0.30em] uppercase text-white/25 mb-3">
                  {isAr ? "تواصل مباشر" : "Direct Contact"}
                </p>
                <h2 className="font-thin"
                  style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif", letterSpacing: "0.1em" }}>
                  {isAr ? "نحن هنا. دائماً." : "WE'RE HERE. ALWAYS."}
                </h2>
              </FadeUp>

              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    icon: MessageCircle, label: isAr ? "واتساب" : "WhatsApp", value: "+966 532 087 436",
                    sub: isAr ? "أسرع طريقة للتواصل" : "Fastest way to reach us",
                    href: "https://wa.me/966532087436", color: "#25D366", isLink: true, ltr: true,
                  },
                  {
                    icon: Mail, label: isAr ? "البريد الإلكتروني" : "Email", value: "mohammed@x-360.ai",
                    sub: isAr ? "للاستفسارات الرسمية" : "For formal inquiries",
                    href: "mailto:mohammed@x-360.ai", color: "rgba(255,255,255,0.7)", isLink: true, ltr: true,
                  },
                  {
                    icon: Phone, label: isAr ? "الهاتف" : "Phone", value: "+966 532 087 436",
                    sub: isAr ? "السبت – الخميس، ٩ص – ٦م" : "Sat – Thu, 9am – 6pm",
                    href: "tel:+966532087436", color: "rgba(255,255,255,0.7)", isLink: true, ltr: true,
                  },
                  {
                    icon: MapPin, label: isAr ? "الموقع" : "Location", value: isAr ? "الرياض" : "Riyadh",
                    sub: isAr ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia",
                    href: null, color: "rgba(255,255,255,0.7)", isLink: false, ltr: false,
                  },
                ].map((ch, i) => {
                  const Icon = ch.icon;
                  const cardContent = (
                    <>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon className="w-4 h-4" style={{ color: ch.color }} />
                      </div>
                      <p className="text-[9px] tracking-widest uppercase text-white/28 mb-1">{ch.label}</p>
                      <p className="font-bold text-xs text-white/80 group-hover:text-white transition-colors mb-1 break-all" dir={ch.ltr ? "ltr" : undefined}>{ch.value}</p>
                      <p className="text-[10px] text-white/28">{ch.sub}</p>
                    </>
                  );
                  return (
                    <FadeUp key={i} delay={i * 0.08}>
                      {ch.isLink ? (
                        <motion.a
                          href={ch.href!}
                          target={ch.href!.startsWith("http") ? "_blank" : undefined}
                          rel={ch.href!.startsWith("http") ? "noopener noreferrer" : undefined}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="block rounded-2xl p-4 transition-all duration-300 group"
                          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {cardContent}
                        </motion.a>
                      ) : (
                        <motion.div
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="block rounded-2xl p-4 transition-all duration-300 group"
                          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {cardContent}
                        </motion.div>
                      )}
                    </FadeUp>
                  );
                })}
              </div>
              </div>
            </section>

          </div>
        </div>


      </div>

    </div>
  );
}
