import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, MessageSquare, Zap, GitBranch, Globe, Shield, Layers, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const layers = [
  {
    icon: Cpu,
    title: "AI Foundation Layer",
    titleAr: "طبقة الأساس للذكاء الاصطناعي",
    desc: "Electi operates on a multi-model AI foundation — routing each task to the most appropriate large language model (LLM) based on task type, latency requirements, and language. Our Arabic-first architecture ensures native Arabic comprehension, not translation-based approximation.",
    descAr: "تعمل Electi على أساس ذكاء اصطناعي متعدد النماذج — يوجّه كل مهمة إلى نموذج اللغة الكبير (LLM) الأنسب بناءً على نوع المهمة ومتطلبات الكمون واللغة. تضمن بنيتنا ذات الأولوية العربية الفهم العربي الأصيل.",
    tags: ["Multi-model routing", "Arabic NLP", "Low-latency inference"],
    tagsAr: ["توجيه متعدد النماذج", "معالجة اللغة الطبيعية العربية", "استدلال منخفض الكمون"],
  },
  {
    icon: GitBranch,
    title: "Agent Architecture",
    titleAr: "بنية الوكيل",
    desc: "Each Electi AI Agent is a purpose-built system: a reasoning engine, a domain knowledge base, a tool-use layer (for API calls, data retrieval, calendar access), and a response generation layer calibrated for the specific agent's persona and communication style.",
    descAr: "كل وكيل Electi الذكي نظام مبني لغرض محدد: محرك استدلال وقاعدة معرفة مجالية وطبقة استخدام أدوات (لمكالمات API واسترداد البيانات والوصول إلى التقويم) وطبقة توليد استجابة معايرة لشخصية الوكيل وأسلوب التواصل.",
    tags: ["Purpose-built agents", "Tool-use layer", "Domain knowledge"],
    tagsAr: ["وكلاء ذوو غرض محدد", "طبقة استخدام الأدوات", "المعرفة المجالية"],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp-Native Integration",
    titleAr: "التكامل الأصلي مع واتساب",
    desc: "Electi integrates with the official WhatsApp Business API, enabling AI agents to operate within the communication channel Saudi businesses and customers already use. No new apps to install. No friction. Real business conversations, automated by AI.",
    descAr: "تتكامل Electi مع واجهة برمجة تطبيقات WhatsApp Business الرسمية، مما يُمكِّن وكلاء الذكاء الاصطناعي من العمل داخل قناة الاتصال التي تستخدمها الشركات السعودية والعملاء بالفعل.",
    tags: ["Official WhatsApp Business API", "No new apps", "24/7 availability"],
    tagsAr: ["واجهة برمجة تطبيقات WhatsApp Business الرسمية", "لا تطبيقات جديدة", "متاح 24/7"],
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    titleAr: "سير عمل الأتمتة",
    desc: "Beyond conversation, Electi agents execute multi-step workflows: booking appointments in calendar systems, creating CRM records, triggering follow-up sequences, generating reports, and routing escalations to human team members. AI that acts, not just responds.",
    descAr: "تتجاوز وكلاء Electi المحادثة لتنفّذ سير عمل متعددة الخطوات: حجز المواعيد في أنظمة التقويم وإنشاء سجلات CRM وتشغيل تسلسلات المتابعة وتوليد التقارير وتوجيه التصعيد إلى أعضاء الفريق البشري.",
    tags: ["Calendar integration", "CRM automation", "Escalation routing"],
    tagsAr: ["تكامل التقويم", "أتمتة CRM", "توجيه التصعيد"],
  },
  {
    icon: Globe,
    title: "Integration Capabilities",
    titleAr: "قدرات التكامل",
    desc: "Electi connects with the tools Saudi businesses already use: CRM systems (Salesforce, HubSpot, Zoho), ERP systems, calendar platforms (Google Calendar, Microsoft 365), payment systems, and custom internal APIs via webhook and REST integrations.",
    descAr: "تتصل Electi بالأدوات التي تستخدمها الشركات السعودية بالفعل: أنظمة CRM (Salesforce وHubSpot وZoho) وأنظمة ERP ومنصات التقويم (Google Calendar وMicrosoft 365) وأنظمة الدفع وواجهات API الداخلية المخصصة.",
    tags: ["CRM connectors", "ERP integration", "Custom API via webhook"],
    tagsAr: ["موصلات CRM", "تكامل ERP", "API مخصص عبر Webhook"],
  },
  {
    icon: Shield,
    title: "Security Architecture",
    titleAr: "بنية الأمان",
    desc: "Security is built into every layer: encrypted data pipelines, tenant-isolated compute environments, role-based access for all system components, and immutable audit logs for every agent action. Zero-trust architecture across all internal service communications.",
    descAr: "الأمان مدمج في كل طبقة: خطوط أنابيب بيانات مشفرة وبيئات حوسبة معزولة للمستأجرين ووصول قائم على الأدوار لجميع مكونات النظام وسجلات تدقيق غير قابلة للتعديل لكل إجراء يتخذه الوكيل.",
    tags: ["Zero-trust architecture", "Tenant isolation", "Immutable audit logs"],
    tagsAr: ["بنية الثقة الصفرية", "عزل المستأجر", "سجلات تدقيق غير قابلة للتعديل"],
  },
];

const deploymentOptions = [
  {
    title: "Cloud (Standard)",
    titleAr: "السحابة (القياسي)",
    desc: "Fully managed platform hosted within Saudi Arabia. Shared infrastructure with complete tenant isolation. Fastest deployment — operational within 48 hours.",
    descAr: "منصة مُدارة بالكامل مستضافة داخل المملكة العربية السعودية. بنية تحتية مشتركة مع عزل كامل للمستأجرين. أسرع نشر — تشغيلية في غضون 48 ساعة.",
    best: "SME & Mid-Market",
    bestAr: "الشركات الصغيرة والمتوسطة والأسواق المتوسطة",
  },
  {
    title: "Dedicated Cloud",
    titleAr: "السحابة المخصصة",
    desc: "Dedicated infrastructure within Saudi Arabia for enterprise clients. Physically isolated compute and storage. Custom SLA and enhanced security controls.",
    descAr: "بنية تحتية مخصصة داخل المملكة العربية السعودية لعملاء المؤسسات. حوسبة وتخزين معزولان فعلياً. اتفاقية مستوى خدمة مخصصة وضوابط أمان محسّنة.",
    best: "Enterprise",
    bestAr: "المؤسسات",
  },
  {
    title: "Private Deployment",
    titleAr: "النشر الخاص",
    desc: "Full on-premises or private cloud deployment within the client's own infrastructure. Complete data sovereignty. No Electi infrastructure dependency.",
    descAr: "نشر محلي كامل أو سحابة خاصة داخل البنية التحتية الخاصة بالعميل. سيادة كاملة على البيانات. لا اعتماد على البنية التحتية لـ Electi.",
    best: "Government & Critical Infrastructure",
    bestAr: "الحكومة والبنية التحتية الحيوية",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://electi.sa/technology",
  "name": "Technology | Electi — AI Agent Architecture & Integration Capabilities",
  "description": "Electi's AI technology: multi-model AI foundation, agent architecture, WhatsApp integration, automation workflows, and enterprise deployment options.",
  "url": "https://electi.sa/technology",
};

export default function TechnologyPage() {
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
      <SEOHead
        title="Technology | Electi — AI Agent Architecture, Integration & Security"
        titleAr="التقنية | Electi — بنية وكيل الذكاء الاصطناعي والتكامل والأمان"
        description="Electi's AI platform: multi-model foundation, purpose-built agent architecture, WhatsApp-native integration, automation workflows, and 3 enterprise deployment options."
        descriptionAr="منصة الذكاء الاصطناعي من Electi: أساس متعدد النماذج وبنية وكيل ذو غرض محدد وتكامل أصلي مع واتساب وسير عمل أتمتة و3 خيارات نشر مؤسسي."
        path="/technology"
        schemas={[schema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Layers className="w-3 h-3" />
            {isAr ? "التقنية والبنية التحتية" : "Technology & Infrastructure"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "التقنية التي" : "The Technology"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "تُشغِّل Electi" : "Behind Electi"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "مُصمَّمة للشركات السعودية — قدرات ذكاء اصطناعي أصيلة بالعربية ومتعددة النماذج وآمنة على مستوى المؤسسات ومرنة تماماً في كيفية نشرها."
              : "Built for Saudi business — Arabic-native, multi-model AI capabilities, enterprise-grade security, and full flexibility in how it's deployed."}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ ARCHITECTURE LAYERS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "طبقات المنصة" : "Platform Layers"}</h2>
              <p className="text-white/30 text-sm">{isAr ? "كيف تعمل منصة Electi — مُشرَحة للمديرين التنفيذيين" : "How the Electi platform works — explained for business leaders"}</p>
            </motion.div>
            <div className="space-y-5">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <motion.div key={layer.title} variants={fadeUp}
                    className="rounded-2xl border border-white/7 p-7 hover:border-white/12 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        <Icon className="w-4 h-4 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-700 text-white/85">{isAr ? layer.titleAr : layer.title}</h3>
                          <span className="text-[9px] text-white/25 border border-white/8 px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.02)" }}>
                            Layer {i + 1}
                          </span>
                        </div>
                        <p className="text-white/38 text-sm leading-relaxed mb-4">{isAr ? layer.descAr : layer.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {(isAr ? layer.tagsAr : layer.tags).map((tag) => (
                            <span key={tag} className="text-[10px] font-600 text-white/30 px-2.5 py-1 rounded-full border border-white/7"
                              style={{ background: "rgba(255,255,255,0.02)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ DEPLOYMENT OPTIONS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "خيارات النشر" : "Deployment Options"}</h2>
              <p className="text-white/30 text-sm max-w-lg mx-auto">
                {isAr ? "Electi مرنة تماماً في كيفية نشرها — من السحابة المشتركة إلى البنية التحتية الخاصة الكاملة" : "Electi is fully flexible in how it's deployed — from shared cloud to fully private infrastructure"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {deploymentOptions.map((opt, i) => (
                <motion.div key={opt.title} variants={fadeUp} custom={i}
                  className="rounded-2xl border border-white/7 p-7 hover:border-white/14 transition-all"
                  style={{ background: i === 2 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)" }}>
                  <div className="text-[9px] font-700 text-white/25 uppercase tracking-wider mb-3">
                    {isAr ? "الأنسب لـ" : "Best for"}: {isAr ? opt.bestAr : opt.best}
                  </div>
                  <h3 className="font-700 text-white/80 mb-3">{isAr ? opt.titleAr : opt.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{isAr ? opt.descAr : opt.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <p className="text-white/25 text-sm mb-4">{isAr ? "استفسر عن متطلبات نشر المؤسسات" : "Inquire about enterprise deployment requirements"}</p>
              <a href="mailto:mohammed@electi.sa?subject=Technology Inquiry">
                <motion.button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "تحدّث مع فريق التقنية" : "Talk to Our Technology Team"}
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ scrollSnapAlign: "start" }}>
        <div className="border-t border-white/5 py-10 px-4 text-center">
          <p className="text-white/25 text-xs">
            {isAr ? "اطلع أيضاً على" : "See also: "}
            <Link href="/security"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "الأمان" : "Security"}</span></Link>
            {" · "}
            <Link href="/compliance"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "الامتثال" : "Compliance"}</span></Link>
            {" · "}
            <Link href="/marketplace"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "سوق الوكلاء" : "Agent Marketplace"}</span></Link>
          </p>
        </div>
        <Footer />
      </section>
    </div>
  );
}
