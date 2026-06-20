import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Building2, Headphones, Users, Globe, Layers, BarChart3, Phone, TrendingUp, Target, MessageSquare, BookOpen, Star, Heart, GraduationCap, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

type Step = {
  key: string; keyAr: string;
  title: string; titleAr: string;
  subtitle: string; subtitleAr: string;
  multi?: boolean;
  options: { label: string; labelAr: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
};

const STEPS: Step[] = [
  {
    key: "industry", keyAr: "القطاع",
    title: "What industry are you in?", titleAr: "ما قطاعك؟",
    subtitle: "We'll recommend agents optimised for your sector.", subtitleAr: "سنوصي بوكلاء محسّنين لقطاعك.",
    options: [
      { label: "Hospitality", labelAr: "الضيافة", value: "hospitality", icon: Star },
      { label: "Healthcare", labelAr: "الرعاية الصحية", value: "healthcare", icon: Heart },
      { label: "Real Estate", labelAr: "العقارات", value: "real-estate", icon: Building2 },
      { label: "Government", labelAr: "الحكومي", value: "government", icon: Layers },
      { label: "Education", labelAr: "التعليم", value: "education", icon: GraduationCap },
      { label: "Retail", labelAr: "التجزئة", value: "retail", icon: ShoppingCart },
      { label: "Corporate / Enterprise", labelAr: "الشركات", value: "enterprise", icon: Building2 },
      { label: "Other", labelAr: "أخرى", value: "other", icon: Sparkles },
    ],
  },
  {
    key: "department", keyAr: "القسم",
    title: "Which department needs AI?", titleAr: "أي قسم يحتاج الذكاء الاصطناعي؟",
    subtitle: "Select all that apply.", subtitleAr: "اختر كل ما ينطبق.",
    multi: true,
    options: [
      { label: "Sales", labelAr: "المبيعات", value: "sales", icon: TrendingUp },
      { label: "Customer Support", labelAr: "خدمة العملاء", value: "support", icon: Headphones },
      { label: "HR & Recruitment", labelAr: "الموارد البشرية والتوظيف", value: "hr", icon: Users },
      { label: "Operations", labelAr: "العمليات", value: "operations", icon: Layers },
      { label: "Marketing", labelAr: "التسويق", value: "marketing", icon: BarChart3 },
      { label: "Reception / Front Desk", labelAr: "الاستقبال", value: "reception", icon: Phone },
    ],
  },
  {
    key: "languages", keyAr: "اللغات",
    title: "Which languages do your customers speak?", titleAr: "ما اللغات التي يتحدث بها عملاؤك؟",
    subtitle: "Select all that apply.", subtitleAr: "اختر كل ما ينطبق.",
    multi: true,
    options: [
      { label: "Arabic", labelAr: "العربية", value: "arabic", icon: Globe },
      { label: "English", labelAr: "الإنجليزية", value: "english", icon: Globe },
      { label: "Urdu", labelAr: "الأردية", value: "urdu", icon: Globe },
      { label: "Hindi", labelAr: "الهندية", value: "hindi", icon: Globe },
    ],
  },
  {
    key: "integrations", keyAr: "التكاملات",
    title: "What systems do you use?", titleAr: "ما الأنظمة التي تستخدمها؟",
    subtitle: "We'll tailor integrations to your stack.", subtitleAr: "سنخصص التكاملات وفق بيئتك التقنية.",
    multi: true,
    options: [
      { label: "WhatsApp Business", labelAr: "واتساب للأعمال", value: "whatsapp", icon: MessageSquare },
      { label: "CRM (Salesforce / HubSpot)", labelAr: "إدارة علاقات العملاء", value: "crm", icon: BarChart3 },
      { label: "Website / Live Chat", labelAr: "الموقع والدردشة المباشرة", value: "website", icon: Globe },
      { label: "ERP (SAP / Oracle)", labelAr: "تخطيط موارد المؤسسة", value: "erp", icon: Layers },
      { label: "Odoo", labelAr: "أودو", value: "odoo", icon: Layers },
      { label: "None / Not Sure", labelAr: "لا يوجد / غير متأكد", value: "none", icon: Sparkles },
    ],
  },
  {
    key: "size", keyAr: "حجم الأعمال",
    title: "What is your business size?", titleAr: "ما حجم عملك؟",
    subtitle: "This helps us recommend the right deployment model.", subtitleAr: "يساعدنا هذا في توصية نموذج النشر المناسب.",
    options: [
      { label: "Startup (< 50 employees)", labelAr: "ناشئة (أقل من 50 موظف)", value: "startup" },
      { label: "SME (50 – 500 employees)", labelAr: "متوسطة (50-500 موظف)", value: "sme" },
      { label: "Enterprise (500+ employees)", labelAr: "مؤسسة (أكثر من 500 موظف)", value: "enterprise" },
    ],
  },
  {
    key: "contact", keyAr: "معلومات التواصل",
    title: "Where should we send your recommendation?", titleAr: "أين نرسل توصيتك؟",
    subtitle: "We'll build a personalised AI Agent recommendation and send it to you within 24 hours.", subtitleAr: "سنبني توصية وكيل ذكاء اصطناعي مخصصة ونرسلها إليك خلال 24 ساعة.",
    options: [],
  },
];

const AGENT_RECOMMENDATIONS: Record<string, { slug: string; title: string; titleAr: string }[]> = {
  "sales+hospitality":   [{ slug: "ai-sales-agent", title: "AI Sales Agent", titleAr: "وكيل المبيعات الذكي" }, { slug: "ai-hospitality", title: "AI Hospitality Agent", titleAr: "وكيل الضيافة الذكي" }],
  "support+healthcare":  [{ slug: "ai-healthcare", title: "AI Healthcare Agent", titleAr: "وكيل الرعاية الصحية الذكي" }, { slug: "ai-customer-support", title: "AI Customer Support", titleAr: "دعم العملاء الذكي" }],
  "hr+enterprise":       [{ slug: "ai-hr-agent", title: "AI HR Agent", titleAr: "وكيل الموارد البشرية الذكي" }, { slug: "ai-recruitment", title: "AI Recruitment Agent", titleAr: "وكيل التوظيف الذكي" }],
  "reception+real-estate": [{ slug: "ai-receptionist", title: "AI Receptionist", titleAr: "المستقبل الذكي" }, { slug: "ai-property", title: "AI Property Agent", titleAr: "وكيل العقارات الذكي" }],
  default: [{ slug: "ai-receptionist", title: "AI Receptionist", titleAr: "المستقبل الذكي" }, { slug: "ai-customer-support", title: "AI Customer Support", titleAr: "دعم العملاء الذكي" }],
};

function getRecommendations(answers: Record<string, string | string[]>) {
  const dept = (answers.department as string[] | undefined) ?? [];
  const ind  = (answers.industry as string) ?? "";
  const key  = `${dept[0] ?? ""}+${ind}`;
  return AGENT_RECOMMENDATIONS[key] ?? AGENT_RECOMMENDATIONS[dept[0] ?? ""] ?? AGENT_RECOMMENDATIONS.default;
}

export default function BuildYourAgentPage() {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "" });

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

  const current = STEPS[step];
  const isContact = step === STEPS.length - 1;
  const isLast    = step === STEPS.length - 1;

  function toggleOption(value: string) {
    if (current.multi) {
      const prev = (answers[current.key] as string[]) ?? [];
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      setAnswers({ ...answers, [current.key]: next });
    } else {
      setAnswers({ ...answers, [current.key]: value });
      if (step < STEPS.length - 1) setTimeout(() => setStep(step + 1), 220);
    }
  }

  function isSelected(value: string) {
    const v = answers[current.key];
    if (Array.isArray(v)) return v.includes(value);
    return v === value;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `AI Agent Wizard — ${formData.name} (${formData.company})`;
    const body = [
      `Name: ${formData.name}`,
      `Company: ${formData.company}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Industry: ${answers.industry}`,
      `Departments: ${(answers.department as string[] ?? []).join(", ")}`,
      `Languages: ${(answers.languages as string[] ?? []).join(", ")}`,
      `Integrations: ${(answers.integrations as string[] ?? []).join(", ")}`,
      `Business size: ${answers.size}`,
    ].join("\n");
    window.location.href = `mailto:mohammed@electi.sa?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  const recommendations = getRecommendations(answers);
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title={isAr ? "ابنِ وكيلك الذكي | Electi" : "Build Your AI Agent | Electi"}
        description={isAr ? "معالج مخصص لبناء وكيل الذكاء الاصطناعي المثالي لعملك في 6 خطوات." : "6-step wizard to find the perfect AI Agent for your Saudi business. Get a personalised recommendation in minutes."}
        path="/build-your-agent"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6"
        style={{ scrollSnapAlign: "start", paddingTop: "96px", paddingBottom: "48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          {!submitted ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/30 text-xs font-600">
                    {isAr ? `الخطوة ${step + 1} من ${STEPS.length}` : `Step ${step + 1} of ${STEPS.length}`}
                  </span>
                  <span className="text-white/20 text-xs">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/8">
                  <motion.div className="h-full rounded-full bg-white/40" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease }} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: isAr ? -30 : 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? 30 : -30 }} transition={{ duration: 0.35, ease }}>

                  <div className="mb-8">
                    <h2 className="font-700 text-white mb-2" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
                      {isAr ? current.titleAr : current.title}
                    </h2>
                    <p className="text-white/38 text-sm">{isAr ? current.subtitleAr : current.subtitle}</p>
                  </div>

                  {!isContact ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {current.options.map((opt) => {
                        const Icon = opt.icon;
                        const sel  = isSelected(opt.value);
                        return (
                          <button key={opt.value} onClick={() => toggleOption(opt.value)}
                            className="flex flex-col items-start gap-3 p-4 rounded-2xl border text-start transition-all"
                            style={{
                              background: sel ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                              borderColor: sel ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                            }}>
                            {Icon && <Icon className={`w-5 h-5 ${sel ? "text-white/80" : "text-white/35"}`} />}
                            <span className={`text-sm font-600 ${sel ? "text-white/90" : "text-white/45"}`}>
                              {isAr ? opt.labelAr : opt.label}
                            </span>
                            {sel && current.multi && (
                              <CheckCircle className="w-3.5 h-3.5 text-white/60 absolute top-3 end-3" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        { name: "name", label: isAr ? "الاسم الكامل" : "Full Name", placeholder: isAr ? "محمد العمر" : "Mohammed Al-Omar", type: "text" },
                        { name: "company", label: isAr ? "اسم الشركة" : "Company Name", placeholder: isAr ? "اسم شركتك" : "Your company name", type: "text" },
                        { name: "email", label: isAr ? "البريد الإلكتروني" : "Email Address", placeholder: "you@company.sa", type: "email" },
                        { name: "phone", label: isAr ? "رقم الهاتف (واتساب)" : "Phone (WhatsApp)", placeholder: "+966 5xxxxxxxx", type: "tel" },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-white/50 text-xs font-600 mb-1.5">{field.label}</label>
                          <input type={field.type} required placeholder={field.placeholder}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/22 transition-colors" />
                        </div>
                      ))}
                      <motion.button type="submit" className="w-full py-3.5 rounded-xl font-600 bg-white text-black flex items-center justify-center gap-2 mt-2"
                        style={{ boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                        <Sparkles className="w-4 h-4" />
                        {isAr ? "احصل على توصيتك المخصصة" : "Get My Personalised Recommendation"}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                  className="flex items-center gap-2 text-white/30 text-sm font-600 hover:text-white/55 transition-colors disabled:opacity-0">
                  <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                  {isAr ? "السابق" : "Back"}
                </button>

                {current.multi && !isLast && (
                  <motion.button onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/12 text-white/55 text-sm font-600 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }}>
                    {isAr ? "التالي" : "Next"}
                    <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                  </motion.button>
                )}
              </div>
            </>
          ) : (
            /* Success state */
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="text-center">
              <div className="w-16 h-16 rounded-2xl border border-white/12 flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <CheckCircle className="w-8 h-8 text-white/55" />
              </div>
              <h2 className="text-3xl font-700 mb-3">{isAr ? "شكراً لك!" : "Thank You!"}</h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                {isAr
                  ? "سيتواصل معك فريقنا خلال 24 ساعة بتوصية وكيل ذكاء اصطناعي مخصصة لعملك."
                  : "Our team will reach out within 24 hours with a personalised AI Agent recommendation for your business."}
              </p>

              <div className="mb-8">
                <p className="text-white/30 text-xs font-600 mb-4 uppercase tracking-widest">
                  {isAr ? "بناءً على إجاباتك، نوصي بـ:" : "Based on your answers, we recommend:"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {recommendations.map((rec) => (
                    <Link key={rec.slug} href={`/marketplace/${rec.slug}`}>
                      <motion.div className="px-5 py-3 rounded-xl border border-white/10 text-white/55 text-sm font-600 hover:border-white/20 hover:text-white/80 transition-all cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        whileHover={{ scale: 1.02 }}>
                        {isAr ? rec.titleAr : rec.title}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/marketplace">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 bg-white text-black"
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    {isAr ? "استكشف جميع الوكلاء" : "Explore All Agents"}
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button className="px-8 py-3.5 rounded-xl font-600 border border-white/12 text-white/55 hover:text-white hover:border-white/22 transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    whileHover={{ scale: 1.02 }}>
                    {isAr ? "تحدث مع خبير" : "Talk to an Expert"}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </section>
    </div>
  );
}
