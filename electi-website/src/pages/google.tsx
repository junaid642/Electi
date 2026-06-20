import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail, Calendar, HardDrive, FileText, Table2,
  Shield, CheckCircle, ArrowRight, Lock,
  Users, Zap, Eye, Database, Globe, ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowRule from "@/components/ui/GlowRule";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

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
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
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

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative rounded-2xl border border-white/8 p-6 overflow-hidden group ${className}`}
      style={{ background: "rgba(255,255,255,0.025)" }}
      whileHover={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.038)" }}
      transition={{ duration: 0.22 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease }}
      className="border-b border-white/6 py-5"
    >
      <div className="flex items-start gap-3">
        <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[14px] font-600 text-white/88 mb-1.5">{q}</p>
          <p className="text-[13px] font-400 text-white/48 leading-relaxed">{a}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GooglePage() {
  const { isAr } = useLang();

  /* ─── Google Services ─── */
  const GOOGLE_SERVICES = [
    {
      icon: Mail,
      name: isAr ? "تكامل Gmail" : "Gmail Integration",
      purposes: isAr
        ? ["قراءة رسائل البريد المعتمدة", "صياغة ردود البريد الإلكتروني", "إرسال رسائل بالنيابة عن المستخدم", "تنظيم المحادثات", "إدارة المتابعات", "دعم سير عمل التواصل"]
        : ["Read authorized email messages", "Draft email responses", "Send emails on behalf of the user", "Organize conversations", "Manage follow-ups", "Support communication workflows"],
      permissions: isAr
        ? ["وصول Gmail للقراءة", "وصول Gmail للإرسال", "وصول Gmail للإنشاء"]
        : ["Gmail Read Access", "Gmail Send Access", "Gmail Compose Access"],
      color: "rgba(234,67,53,0.18)",
      borderColor: "rgba(234,67,53,0.22)",
    },
    {
      icon: Calendar,
      name: isAr ? "تقويم Google" : "Google Calendar",
      purposes: isAr
        ? ["إنشاء اجتماعات", "إدارة الجداول الزمنية", "تحديث الأحداث", "تعيين التذكيرات", "تنسيق المواعيد"]
        : ["Create meetings", "Manage schedules", "Update events", "Set reminders", "Coordinate appointments"],
      permissions: isAr ? ["وصول التقويم"] : ["Calendar Access"],
      color: "rgba(66,133,244,0.18)",
      borderColor: "rgba(66,133,244,0.22)",
    },
    {
      icon: HardDrive,
      name: "Google Drive",
      purposes: isAr
        ? ["الوصول إلى الملفات المعتمدة", "تنظيم مجلدات المشاريع", "تخزين الملفات التي ينشئها الذكاء الاصطناعي", "إدارة الموارد التجارية"]
        : ["Access authorized files", "Organize project folders", "Store AI-generated files", "Manage business resources"],
      permissions: isAr ? ["وصول Drive"] : ["Drive Access"],
      color: "rgba(52,168,83,0.18)",
      borderColor: "rgba(52,168,83,0.22)",
    },
    {
      icon: FileText,
      name: "Google Docs",
      purposes: isAr
        ? ["إنشاء مقترحات", "إنشاء تقارير", "صياغة عقود", "إنتاج مستندات تجارية"]
        : ["Create proposals", "Generate reports", "Draft contracts", "Produce business documents"],
      permissions: isAr ? ["وصول Docs"] : ["Docs Access"],
      color: "rgba(66,133,244,0.18)",
      borderColor: "rgba(66,133,244,0.22)",
    },
    {
      icon: Table2,
      name: "Google Sheets",
      purposes: isAr
        ? ["صيانة سجلات CRM", "تتبع العملاء المحتملين", "إدارة بيانات الأعمال", "إنشاء تقارير", "تحديث جداول البيانات"]
        : ["Maintain CRM records", "Track leads", "Manage business data", "Generate reports", "Update spreadsheets"],
      permissions: isAr ? ["وصول Sheets"] : ["Sheets Access"],
      color: "rgba(52,168,83,0.18)",
      borderColor: "rgba(52,168,83,0.22)",
    },
  ];

  /* ─── Use Cases ─── */
  const USE_CASES = [
    {
      icon: Users,
      title: isAr ? "وكيل المساعد التنفيذي" : "Executive Assistant Agent",
      desc: isAr ? "إدارة رسائل البريد الإلكتروني والاجتماعات والجداول الزمنية والتواصل." : "Manage emails, meetings, schedules, and communication.",
    },
    {
      icon: Zap,
      title: isAr ? "وكيل المبيعات" : "Sales Agent",
      desc: isAr ? "تتبع العملاء المحتملين وأتمتة المتابعات وإدارة خطوط الأنابيب." : "Track leads, automate follow-ups, and manage pipelines.",
    },
    {
      icon: HardDrive,
      title: isAr ? "وكيل العمليات" : "Operations Agent",
      desc: isAr ? "تنسيق المشاريع والملفات والوثائق." : "Coordinate projects, files, and documentation.",
    },
    {
      icon: Database,
      title: isAr ? "وكيل CRM" : "CRM Agent",
      desc: isAr ? "صيانة سجلات العملاء وإعداد التقارير." : "Maintain customer records and reporting.",
    },
    {
      icon: ArrowRight,
      title: isAr ? "وكيل تطوير الأعمال" : "Business Development Agent",
      desc: isAr ? "دعم التواصل والمقترحات ومشاركة العملاء." : "Support outreach, proposals, and client engagement.",
    },
    {
      icon: Calendar,
      title: isAr ? "وكيل الإنتاجية الشخصية" : "Personal Productivity Agent",
      desc: isAr ? "إدارة التقاويم والتذكيرات وسير العمل اليومي." : "Manage calendars, reminders, and daily workflows.",
    },
  ];

  /* ─── Privacy items ─── */
  const PRIVACY_ITEMS = [
    {
      icon: Lock,
      title: isAr ? "تفويض صريح" : "Explicit Authorization",
      desc: isAr
        ? "لا يصل ELECTI إلى بيانات مستخدمي Google إلا بعد التفويض الصريح من المستخدم عبر Google OAuth."
        : "ELECTI only accesses Google user data after explicit user authorization through Google OAuth.",
    },
    {
      icon: Eye,
      title: isAr ? "عدم بيع البيانات" : "No Data Selling",
      desc: isAr
        ? "لا يبيع ELECTI بيانات مستخدمي Google. لا تُشارك معلوماتك مع أطراف ثالثة أبداً."
        : "ELECTI does not sell Google user data. Your information is never shared with third parties.",
    },
    {
      icon: Zap,
      title: isAr ? "استخدام محدود بالغرض" : "Purpose-Limited Use",
      desc: isAr
        ? "تُستخدم بيانات مستخدمي Google فقط لتوفير الوظائف التي طلبها المستخدم ضمن وكيله الشخصي."
        : "Google user data is used solely to provide the functionality requested by the user within their personal AI agent.",
    },
    {
      icon: Shield,
      title: isAr ? "وصول قابل للإلغاء" : "Revocable Access",
      desc: isAr
        ? "يمكن للمستخدمين إلغاء الوصول في أي وقت من خلال إعدادات حساب Google الخاص بهم."
        : "Users can revoke access at any time through their Google Account settings.",
    },
    {
      icon: CheckCircle,
      title: isAr ? "أذونات محدودة" : "Minimal Permissions",
      desc: isAr
        ? "يقتصر الوصول على الأذونات التي منحها المستخدم — لا أكثر."
        : "Access is limited to the permissions granted by the user — nothing more.",
    },
    {
      icon: Database,
      title: isAr ? "أمان بمعايير الصناعة" : "Industry Security",
      desc: isAr
        ? "تُطبَّق ممارسات أمنية وفق معايير الصناعة لحماية معلومات المستخدم."
        : "Industry-standard security practices are implemented to protect user information.",
    },
  ];

  /* ─── FAQs ─── */
  const FAQS = [
    {
      q: isAr ? "هل يمكن لـ ELECTI قراءة رسائلي الإلكترونية؟" : "Can ELECTI read my emails?",
      a: isAr
        ? "فقط بعد أن تمنح صراحةً أذونات Gmail من خلال عملية تفويض OAuth من Google."
        : "Only after you explicitly authorize Gmail permissions through Google's OAuth authorization process.",
    },
    {
      q: isAr ? "هل يمكنني إلغاء الوصول لاحقاً؟" : "Can I remove access later?",
      a: isAr
        ? "نعم. يمكن إلغاء الوصول في أي وقت من خلال أذونات حساب Google الخاص بك."
        : "Yes. Access can be revoked at any time through your Google Account permissions.",
    },
    {
      q: isAr ? "هل يبيع ELECTI بياناتي؟" : "Does ELECTI sell my data?",
      a: isAr ? "لا. ELECTI لا يبيع بيانات المستخدمين." : "No. ELECTI does not sell user data.",
    },
    {
      q: isAr ? "هل أتحكم في ما يمكن لوكيلي الوصول إليه؟" : "Do I control what my agent can access?",
      a: isAr
        ? "نعم. يقرر المستخدمون الأذونات الممنوحة لوكيلهم الشخصي."
        : "Yes. Users decide which permissions are granted to their personal agent.",
    },
  ];

  /* ─── What-Is use-case tags ─── */
  const WHAT_IS_TAGS = isAr
    ? ["المساعدة التنفيذية", "عمليات المبيعات", "تطوير الأعمال", "دعم العملاء", "إدارة علاقات العملاء", "تنسيق المشاريع", "الإنتاجية الشخصية", "أتمتة سير العمل"]
    : ["Executive Assistance", "Sales Operations", "Business Development", "Customer Support", "CRM Management", "Project Coordination", "Personal Productivity", "Workflow Automation"];

  /* ─── How-It-Works steps ─── */
  const HOW_STEPS = [
    {
      step: "01",
      title: isAr ? "ربط حساب Google" : "Connect Google Account",
      desc: isAr ? "اربط حساب Google الخاص بك بشكل آمن باستخدام Google OAuth." : "Connect your Google Account securely using Google OAuth.",
      icon: Globe,
    },
    {
      step: "02",
      title: isAr ? "اختر الخدمات" : "Choose Services",
      desc: isAr ? "اختر خدمات Google التي يمكن لوكيلك الوصول إليها." : "Choose which Google services your agent can access.",
      icon: CheckCircle,
    },
    {
      step: "03",
      title: isAr ? "تكوين الوكيل" : "Configure Agent",
      desc: isAr ? "قم بتكوين تعليمات الوكيل وأهدافه ودوره وسير عمله." : "Configure your agent's instructions, goals, role, and workflows.",
      icon: Zap,
    },
    {
      step: "04",
      title: isAr ? "الأتمتة والمساعدة" : "Automate & Assist",
      desc: isAr ? "اسمح للوكيل بأتمتة المهام والمساعدة في العمليات اليومية." : "Allow the agent to automate tasks and assist with daily operations.",
      icon: ArrowRight,
    },
  ];

  /* ─── Screenshots ─── */
  const SCREENSHOTS = isAr
    ? ["لوحة تحكم الوكيل", "تكامل Gmail", "مدير التقويم", "مستكشف Drive", "مساحة عمل Docs"]
    : ["Agent Dashboard", "Gmail Integration", "Calendar Manager", "Drive Explorer", "Docs Workspace"];

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
      <SEOHead
        title="How Electi Uses Your Google Account | ELECTI"
        titleAr="كيف يستخدم ELECTI حساب Google الخاص بك"
        description="Electi requests access to your Google Account only when authorized by you. Learn exactly how Gmail, Calendar, Drive, Docs, and Sheets are used by your AI agent."
        descriptionAr="يطلب ELECTI الوصول إلى حساب Google الخاص بك فقط عند تفويضك. تعرّف على كيفية استخدام Gmail والتقويم وDrive وDocs وSheets من قبل وكيل الذكاء الاصطناعي."
        path="/google"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24 pb-16" style={{ minHeight: "100dvh", scrollSnapAlign: "start" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(66,133,244,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(52,168,83,0.07) 0%, transparent 60%)",
          }}
        />

        {/* Google colour dots */}
        <motion.div
          className="flex items-center gap-2 mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
        >
          {["#4285F4", "#EA4335", "#FBBC04", "#34A853"].map((c, i) => (
            <motion.span
              key={i}
              className="rounded-full"
              style={{ width: 8, height: 8, background: c, opacity: 0.8 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/42 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
        >
          <Globe className="w-3 h-3" />
          {isAr ? "تكامل Google Workspace" : "Google Workspace Integration"}
        </motion.div>

        <motion.h1
          className="text-[clamp(2rem,6vw,4.2rem)] font-800 uppercase leading-[1.05] tracking-[-0.02em] mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.75, ease }}
        >
          {isAr ? (
            <>
              المساعد الشخصي من ELECTI<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>لـ Google Workspace</span>
            </>
          ) : (
            <>
              ELECTI Personal Agent<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>for Google Workspace</span>
            </>
          )}
        </motion.h1>

        <motion.p
          className="text-[clamp(0.9rem,2vw,1.1rem)] font-400 text-white/48 max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.65, ease }}
        >
          {isAr
            ? "أنشئ مساعدين ذكاء اصطناعي شخصيين يتصلون بشكل آمن بـ Gmail وتقويم Google وGoogle Drive وGoogle Docs وGoogle Sheets لأتمتة التواصل والجدولة وإنشاء المستندات وسير العمل التجاري والإنتاجية."
            : "Create intelligent AI-powered personal agents that securely connect with Gmail, Google Calendar, Google Drive, Google Docs, and Google Sheets to automate communication, scheduling, document creation, business workflows, and productivity."}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6, ease }}
        >
          <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
            <motion.button
              className="px-7 py-3.5 rounded-xl font-600 text-[14px] bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:shadow-[0_0_40px_rgba(255,255,255,0.28)] hover:bg-white/92 transition-all"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {isAr ? "أنشئ وكيلك" : "Create Your Agent"}
            </motion.button>
          </a>
          <motion.a
            href="#how-it-works"
            className="px-7 py-3.5 rounded-xl font-500 text-[14px] border border-white/12 text-white/65 hover:text-white hover:border-white/22 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isAr ? "اكتشف المزيد" : "Learn More"}
          </motion.a>
        </motion.div>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — WHAT IS
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionBadge icon={Zap} label={isAr ? "ما هو المساعد الشخصي من ELECTI" : "What Is ELECTI Personal Agent"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em] mb-5">
              {isAr ? (
                <>ابنِ مساعدك<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>الذكي الخاص</span></>
              ) : (
                <>Build Your Own<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>AI Assistant</span></>
              )}
            </h2>
            <p className="text-white/48 text-[15px] font-400 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? "يتيح المساعد الشخصي من ELECTI للأفراد ورواد الأعمال والمتخصصين والفرق والشركات إنشاء مساعدين ذكاء اصطناعي مخصصين يتفاعلون بشكل آمن مع خدمات Google Workspace المعتمدة."
                : "ELECTI Personal Agent enables individuals, entrepreneurs, professionals, teams, and businesses to create customized AI-powered assistants that securely interact with authorized Google Workspace services."}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {WHAT_IS_TAGS.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/7"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <CheckCircle className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                <span className="text-[12px] font-500 text-white/62">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-center text-white/32 text-[12px] mt-6 font-400">
            {isAr
              ? "يحتفظ المستخدمون بالتحكم الكامل في الأذونات والوصول إلى البيانات."
              : "Users maintain full control over permissions and data access."}
          </motion.p>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionBadge icon={ArrowRight} label={isAr ? "كيف يعمل" : "How It Works"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>أربع خطوات<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>لوكيلك الذكي</span></>
              ) : (
                <>Four Steps to Your<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>AI Agent</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_STEPS.map(({ step, title, desc, icon: Icon }) => (
              <PremiumCard key={step}>
                <div className="text-[11px] font-700 tracking-[0.3em] text-white/20 mb-4">{step}</div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.18)" }}
                >
                  <Icon className="w-[18px] h-[18px] text-white/55" />
                </div>
                <h3 className="text-[14px] font-700 text-white mb-2">{title}</h3>
                <p className="text-[12.5px] font-400 text-white/42 leading-relaxed">{desc}</p>
              </PremiumCard>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — GOOGLE WORKSPACE INTEGRATIONS
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionBadge icon={Globe} label={isAr ? "تكاملات Google Workspace" : "Google Workspace Integrations"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>لماذا نطلب<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>أذونات Google</span></>
              ) : (
                <>Why We Request<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Google Permissions</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOOGLE_SERVICES.map(({ icon: Icon, name, purposes, permissions, color, borderColor }) => (
              <PremiumCard key={name}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color, border: `1px solid ${borderColor}` }}
                >
                  <Icon className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="text-[15px] font-700 text-white mb-3">{name}</h3>

                <p className="text-[10px] font-600 uppercase tracking-[0.2em] text-white/28 mb-2">
                  {isAr ? "الغرض" : "Purpose"}
                </p>
                <ul className="mb-4 space-y-1">
                  {purposes.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12px] text-white/48">
                      <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0 mt-1.5" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] font-600 uppercase tracking-[0.2em] text-white/28 mb-2">
                  {isAr ? "أذونات Google المستخدمة" : "Google Permissions Used"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {permissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-2.5 py-1 rounded-full text-[10px] font-500 border"
                      style={{ background: color, borderColor, color: "rgba(255,255,255,0.65)" }}
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </PremiumCard>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — USE CASES
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionBadge icon={Users} label={isAr ? "أمثلة على حالات الاستخدام" : "Example Use Cases"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>وكلاء مبنيون<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>لكل دور</span></>
              ) : (
                <>Agents Built<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>for Every Role</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map(({ icon: Icon, title, desc }) => (
              <PremiumCard key={title}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-[18px] h-[18px] text-white/55" />
                </div>
                <h3 className="text-[14px] font-700 text-white mb-2">{title}</h3>
                <p className="text-[13px] font-400 text-white/45 leading-relaxed">{desc}</p>
              </PremiumCard>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — DATA PRIVACY
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionBadge icon={Shield} label={isAr ? "خصوصية البيانات والأمان" : "Data Privacy & Security"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>بياناتك تبقى<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>تحت سيطرتك</span></>
              ) : (
                <>Your Data Stays<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Under Your Control</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIVACY_ITEMS.map(({ icon: Icon, title, desc }) => (
              <PremiumCard key={title}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(52,168,83,0.1)", border: "1px solid rgba(52,168,83,0.18)" }}
                >
                  <Icon className="w-[18px] h-[18px]" style={{ color: "rgba(52,168,83,0.8)" }} />
                </div>
                <h3 className="text-[14px] font-700 text-white mb-2">{title}</h3>
                <p className="text-[13px] font-400 text-white/45 leading-relaxed">{desc}</p>
              </PremiumCard>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION — WHAT WE DO NOT DO
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Shield} label={isAr ? "ما لا نفعله" : "What We Do NOT Do"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>التزاماتنا<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>تجاه بياناتك</span></>
              ) : (
                <>Our Commitments<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>to Your Data</span></>
              )}
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                en: "We never sell your data to third parties.",
                ar: "لا نبيع بياناتك أبداً لأطراف ثالثة.",
              },
              {
                en: "We never access data beyond what is required for the features you enable.",
                ar: "لا نصل أبداً إلى بيانات تتجاوز ما هو مطلوب للميزات التي تفعّلها.",
              },
              {
                en: "We do not use your Google data to serve advertising.",
                ar: "لا نستخدم بيانات Google الخاصة بك لعرض الإعلانات.",
              },
              {
                en: "We do not share your Google data with any unauthorized third parties.",
                ar: "لا نشارك بيانات Google الخاصة بك مع أي أطراف ثالثة غير مصرح بها.",
              },
            ].map(({ en, ar }) => (
              <motion.div
                key={en}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-white/7 px-5 py-4"
                style={{ background: "rgba(255,255,255,0.018)" }}
              >
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(234,67,53,0.12)", border: "1px solid rgba(234,67,53,0.22)" }}>
                  <span className="text-[10px] font-700" style={{ color: "rgba(234,67,53,0.8)" }}>✕</span>
                </div>
                <p className="text-[14px] font-400 text-white/62 leading-relaxed">{isAr ? ar : en}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-xl border border-white/10 px-6 py-5 text-center"
            style={{ background: "rgba(66,133,244,0.04)" }}
          >
            <p className="text-white/52 text-[13px] leading-relaxed mb-3">
              {isAr
                ? "يمكنك إلغاء وصول ELECTI إلى حساب Google الخاص بك في أي وقت من:"
                : "You can revoke Electi's access to your Google account at any time from:"}
            </p>
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-600 text-white/75 hover:text-white transition-colors underline underline-offset-4"
            >
              myaccount.google.com/permissions <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION — DATA RETENTION
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Database} label={isAr ? "الاحتفاظ بالبيانات" : "Data Retention"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>كيف نتعامل<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>مع بياناتك</span></>
              ) : (
                <>How We Handle<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Your Data</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            <PremiumCard>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.18)" }}>
                <Zap className="w-[18px] h-[18px] text-white/55" />
              </div>
              <h3 className="text-[14px] font-700 text-white mb-2">
                {isAr ? "معالجة فورية" : "Real-Time Processing"}
              </h3>
              <p className="text-[13px] font-400 text-white/45 leading-relaxed">
                {isAr
                  ? "البيانات التي يتم الوصول إليها من خلال حساب Google الخاص بك تُعالَج في الوقت الفعلي لإتمام الإجراءات التي طلبتها."
                  : "Data accessed through your Google account is processed in real-time to complete your requested actions."}
              </p>
            </PremiumCard>
            <PremiumCard>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(52,168,83,0.1)", border: "1px solid rgba(52,168,83,0.18)" }}>
                <Shield className="w-[18px] h-[18px] text-white/55" />
              </div>
              <h3 className="text-[14px] font-700 text-white mb-2">
                {isAr ? "لا تخزين للمحتوى الخام" : "No Raw Content Storage"}
              </h3>
              <p className="text-[13px] font-400 text-white/45 leading-relaxed">
                {isAr
                  ? "لا يخزن ELECTI محتوى البريد الإلكتروني أو التقويم الخام بما يتجاوز ما هو ضروري لإتمام كل مهمة."
                  : "Electi does not store raw email or calendar content beyond what is necessary to complete each task."}
              </p>
            </PremiumCard>
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — GOOGLE API COMPLIANCE
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl border border-white/8 p-8 sm:p-12 text-center overflow-hidden"
            style={{ background: "rgba(66,133,244,0.04)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(66,133,244,0.08) 0%, transparent 70%)" }}
            />
            <SectionBadge icon={Globe} label={isAr ? "الامتثال لـ Google API" : "Google API Compliance"} />
            <h2 className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-700 uppercase tracking-[-0.01em] mb-5">
              {isAr ? <>خدمات Google API<br />الامتثال</> : <>Google API Services<br />Compliance</>}
            </h2>
            <p className="text-white/52 text-[14px] font-400 leading-relaxed mb-4 max-w-2xl mx-auto">
              {isAr ? (
                <>
                  يلتزم استخدام ELECTI ونقل المعلومات المستلمة من Google APIs بـ{" "}
                  <strong className="text-white/75 font-600">سياسة بيانات مستخدم خدمات Google API</strong>،
                  {" "}بما في ذلك متطلبات الاستخدام المحدود.
                </>
              ) : (
                <>
                  ELECTI's use and transfer of information received from Google APIs adheres to the{" "}
                  <strong className="text-white/75 font-600">Google API Services User Data Policy</strong>,
                  including Limited Use requirements.
                </>
              )}
            </p>
            <p className="text-white/40 text-[13px] font-400 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? "تُطلب أذونات Google Workspace فقط عند الضرورة لتوفير الوظائف التي اختارها المستخدم ووافق عليها."
                : "Google Workspace permissions are requested only when necessary to provide functionality selected and authorized by the user."}
            </p>
          </motion.div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <SectionBadge icon={ChevronDown} label={isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"} />
          <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
            {isAr ? (
              <>الأسئلة<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>الشائعة</span></>
            ) : (
              <>Common<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Questions</span></>
            )}
          </h2>
        </div>
        {FAQS.map(({ q, a }) => (
          <FAQItem key={q} q={q} a={a} />
        ))}
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 8 — PRODUCT SCREENSHOTS (placeholder)
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Eye} label={isAr ? "عرض المنتج" : "Product Showcase"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>منصة ELECTI<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>الشخصية</span></>
              ) : (
                <>ELECTI Personal<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Platform</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SCREENSHOTS.map((label, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="aspect-[4/3] rounded-2xl border border-white/7 flex flex-col items-center justify-center gap-2 overflow-hidden relative group"
                style={{ background: "rgba(255,255,255,0.02)" }}
                whileHover={{ borderColor: "rgba(255,255,255,0.14)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${i % 2 === 0 ? "66,133,244" : "52,168,83"},0.06) 0%, transparent 70%)` }}
                />
                <Eye className="w-5 h-5 text-white/18" />
                <span className="text-[10px] font-500 text-white/28 text-center px-2">{label}</span>
              </motion.div>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 9 — LEGAL & COMPLIANCE
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Lock} label={isAr ? "القانوني والامتثال" : "Legal & Compliance"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>الخصوصية والشروط<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>المرتبطة بـ Google</span></>
              ) : (
                <>Privacy & Terms<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>Related to Google</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
                desc: isAr
                  ? "سياسة خصوصية ELECTI الشاملة تغطي كيفية جمع البيانات المرتبطة بـ Google وتخزينها وحمايتها."
                  : "ELECTI's comprehensive privacy policy covering how Google-related data is collected, stored, and protected.",
                href: "/privacy",
                linkLabel: isAr ? "اقرأ سياسة الخصوصية" : "Read Privacy Policy",
              },
              {
                icon: FileText,
                title: isAr ? "شروط الخدمة" : "Terms of Service",
                desc: isAr
                  ? "شروط استخدام ELECTI المرتبطة بتكاملات Google Workspace."
                  : "ELECTI's terms of use related to Google Workspace integrations.",
                href: "/terms-of-use",
                linkLabel: isAr ? "اقرأ شروط الخدمة" : "Read Terms of Service",
              },
            ].map(({ icon: Icon, title, desc, href, linkLabel }) => (
              <PremiumCard key={title}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-[18px] h-[18px] text-white/55" />
                </div>
                <h3 className="text-[14px] font-700 text-white mb-2">{title}</h3>
                <p className="text-[13px] font-400 text-white/42 leading-relaxed mb-4">{desc}</p>
                <a
                  href={href}
                  className="inline-flex items-center gap-1.5 text-[12px] font-500 text-white/52 hover:text-white/80 transition-colors"
                >
                  {linkLabel} <ArrowRight className="w-3 h-3" />
                </a>
              </PremiumCard>
            ))}
          </div>
        </InViewSection>
      </section>

      <GlowRule />

      {/* ═══════════════════════════════════════════════════
          SECTION 10 — CONTACT
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <InViewSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Mail} label={isAr ? "التواصل" : "Contact"} />
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-700 uppercase tracking-[-0.01em]">
              {isAr ? (
                <>تواصل معنا<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>بشأن Google Workspace</span></>
              ) : (
                <>Get In Touch<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>About Google Workspace</span></>
              )}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-start">
            {[
              { label: isAr ? "الشركة" : "Company", value: "ELECTI", href: null },
              { label: isAr ? "الموقع" : "Website", value: "electi.sa", href: "https://www.electi.sa" },
              { label: isAr ? "بريد الدعم" : "Support Email", value: "a@electi.sa", href: "mailto:a@electi.sa" },
              { label: isAr ? "جهة الاتصال" : "Business Contact", value: "a@electi.sa", href: "mailto:a@electi.sa" },
            ].map(({ label, value, href }) => (
              <div key={label} className="rounded-xl border border-white/7 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-[10px] font-600 uppercase tracking-[0.22em] text-white/28 mb-2">{label}</p>
                {href ? (
                  <a href={href} className="text-[13px] font-500 text-white/65 hover:text-white transition-colors break-all">
                    {value}
                  </a>
                ) : (
                  <p className="text-[13px] font-500 text-white/65">{value}</p>
                )}
              </div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-center text-white/30 text-[12px] mt-8 font-400">
            {isAr
              ? "لأي استفسارات تتعلق بـ Google Workspace أو استخدام بيانات API، تواصل معنا مباشرةً."
              : "For any questions about Google Workspace integration or API data usage, contact us directly."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center mt-6">
            <a href="/contact">
              <motion.button
                className="px-8 py-3.5 rounded-xl font-600 text-[14px] border border-white/14 text-white/70 hover:text-white hover:border-white/26 transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {isAr ? "اتصل بنا" : "Contact Us"}
              </motion.button>
            </a>
          </motion.div>
        </InViewSection>
      </section>

      <Footer />
    </div>
  );
}
