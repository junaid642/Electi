import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Handshake, Code, Building2, Briefcase, Globe, ArrowRight, Mail } from "lucide-react";
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

const partnerTypes = [
  {
    icon: Code,
    title: "Technology Partners",
    titleAr: "شركاء التقنية",
    desc: "Software vendors, SaaS platforms, and technology providers who integrate with Electi's platform to deliver enhanced AI capabilities to their customers.",
    descAr: "بائعو البرمجيات ومنصات SaaS ومزودو التقنية الذين يتكاملون مع منصة Electi لتقديم قدرات ذكاء اصطناعي محسّنة لعملائهم.",
    benefits: [
      { en: "Co-branded integration listing", ar: "قائمة تكامل بعلامة تجارية مشتركة" },
      { en: "Technical integration support", ar: "دعم التكامل التقني" },
      { en: "Joint solution development", ar: "تطوير حلول مشتركة" },
      { en: "Partner API access", ar: "وصول API للشركاء" },
    ],
    ideal: "ERP vendors, CRM platforms, communication tools, vertical SaaS",
    idealAr: "بائعو ERP ومنصات CRM وأدوات التواصل وبرمجيات القطاع الرأسي",
  },
  {
    icon: Globe,
    title: "Integration Partners",
    titleAr: "شركاء التكامل",
    desc: "System integrators and implementation specialists who help Saudi enterprises deploy and configure Electi within their existing technology ecosystem.",
    descAr: "متكاملو الأنظمة وخبراء التنفيذ الذين يساعدون المؤسسات السعودية على نشر Electi وتكوينها داخل نظامها البيئي التكنولوجي الحالي.",
    benefits: [
      { en: "Implementation training & certification", ar: "تدريب وشهادات التنفيذ" },
      { en: "Partner portal access", ar: "الوصول إلى بوابة الشركاء" },
      { en: "Referral revenue share", ar: "مشاركة عائدات الإحالة" },
      { en: "Joint customer support", ar: "دعم عملاء مشترك" },
    ],
    ideal: "IT consulting firms, system integrators, SAP/Oracle/Odoo implementation partners",
    idealAr: "شركات استشارات تقنية المعلومات ومتكاملو الأنظمة وشركاء تنفيذ SAP/Oracle/Odoo",
  },
  {
    icon: Briefcase,
    title: "Consulting Partners",
    titleAr: "شركاء الاستشارات",
    desc: "Business consultants and digital transformation advisors who recommend and position Electi AI solutions as part of their Saudi client transformation programmes.",
    descAr: "مستشارو الأعمال ومستشارو التحول الرقمي الذين يوصون بحلول Electi الذكية ويضعونها كجزء من برامج تحول عملائهم السعوديين.",
    benefits: [
      { en: "Co-selling support & deal registration", ar: "دعم البيع المشترك وتسجيل الصفقات" },
      { en: "Sales enablement materials (Arabic + English)", ar: "مواد تمكين المبيعات (عربي + إنجليزي)" },
      { en: "Partner discount on client deployments", ar: "خصم الشريك على عمليات نشر العملاء" },
      { en: "Executive briefings & roadmap access", ar: "إحاطات تنفيذية والوصول إلى خارطة الطريق" },
    ],
    ideal: "Big-4 affiliates, Big-4 Saudi offices, digital transformation boutiques",
    idealAr: "شركاء مرتبطون بالمكاتب السعودية للشركات الكبرى ومحلات التحول الرقمي",
  },
  {
    icon: Building2,
    title: "Channel Partners",
    titleAr: "شركاء القنوات",
    desc: "Resellers and value-added resellers (VARs) who sell Electi to their existing customer base across Saudi Arabia and the wider GCC.",
    descAr: "موزعون وموزعون ذوو قيمة مضافة (VARs) يبيعون Electi لقاعدة عملائهم الحالية في جميع أنحاء المملكة العربية السعودية ودول الخليج.",
    benefits: [
      { en: "Reseller margin on all sales", ar: "هامش الموزع على جميع المبيعات" },
      { en: "Sales training & product certification", ar: "تدريب المبيعات وشهادات المنتج" },
      { en: "Marketing development funds (MDF)", ar: "أموال تطوير التسويق (MDF)" },
      { en: "Territory protection", ar: "حماية المنطقة" },
    ],
    ideal: "IT resellers, telecom partners, cloud distributors in KSA, UAE, Kuwait",
    idealAr: "موزعو تقنية المعلومات وشركاء الاتصالات وموزعو السحابة في المملكة العربية السعودية والإمارات والكويت",
  },
  {
    icon: Handshake,
    title: "Enterprise Partners",
    titleAr: "شركاء المؤسسات",
    desc: "Large organisations who co-develop, co-deploy, or co-brand AI solutions with Electi for specific verticals or geographic markets within Saudi Arabia.",
    descAr: "المنظمات الكبيرة التي تطوّر أو تنشر أو تضع علامتها التجارية على حلول الذكاء الاصطناعي مع Electi للقطاعات الرأسية المحددة أو الأسواق الجغرافية داخل المملكة العربية السعودية.",
    benefits: [
      { en: "Co-development agreement", ar: "اتفاقية التطوير المشترك" },
      { en: "White-label deployment options", ar: "خيارات النشر بالعلامة التجارية الخاصة" },
      { en: "Joint go-to-market strategy", ar: "استراتيجية طرح مشتركة في السوق" },
      { en: "Executive sponsorship", ar: "رعاية تنفيذية" },
    ],
    ideal: "Telecoms, banks, hospital groups, government-related entities, Vision 2030 giga-projects",
    idealAr: "شركات الاتصالات والبنوك ومجموعات المستشفيات والكيانات الحكومية والمشاريع العملاقة لرؤية 2030",
  },
];

const process = [
  { step: "01", title: "Apply", titleAr: "التقدّم", desc: "Complete the partner application form with information about your organisation, capabilities, and target customer base.", descAr: "أكمل نموذج طلب الشراكة مع معلومات حول مؤسستك وقدراتك وقاعدة العملاء المستهدفة." },
  { step: "02", title: "Discovery", titleAr: "الاستكشاف", desc: "Electi's partnership team schedules a discovery call to understand your business, customers, and how a partnership adds mutual value.", descAr: "يحدد فريق شراكة Electi موعد اتصال استكشافي لفهم عملك وعملائك وكيف تضيف الشراكة قيمة متبادلة." },
  { step: "03", title: "Agreement", titleAr: "الاتفاقية", desc: "Finalise partnership type, commercial terms, and the partner agreement — governed by Saudi law and bilingual in Arabic and English.", descAr: "أنهِ نوع الشراكة والشروط التجارية واتفاقية الشراكة — محكومة بالنظام السعودي وثنائية اللغة بالعربية والإنجليزية." },
  { step: "04", title: "Onboarding", titleAr: "الإعداد", desc: "Technical integration, sales training, and co-marketing setup — Electi's partner success team supports you through your first joint customers.", descAr: "التكامل التقني وتدريب المبيعات وإعداد التسويق المشترك — يدعمك فريق نجاح شركاء Electi خلال عملائك المشتركين الأوائل." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://electi.sa/partners",
  "name": "Partners | Electi — AI Partner Ecosystem",
  "description": "Join Electi's partner ecosystem as a technology, integration, consulting, channel, or enterprise partner for AI solutions in Saudi Arabia.",
  "url": "https://electi.sa/partners",
};

export default function PartnersPage() {
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
        title="Partners | Electi — AI Partner Ecosystem Saudi Arabia"
        titleAr="الشركاء | Electi — نظام شركاء الذكاء الاصطناعي في المملكة العربية السعودية"
        description="Join Electi's partner ecosystem in Saudi Arabia. Technology partners, integration partners, consulting partners, channel partners, and enterprise co-development opportunities."
        descriptionAr="انضم إلى نظام شركاء Electi في المملكة العربية السعودية. شركاء التقنية والتكامل والاستشارات والقنوات وفرص التطوير المشترك للمؤسسات."
        path="/partners"
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
            <Handshake className="w-3 h-3" />
            {isAr ? "نظام الشركاء" : "Partner Ecosystem"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "بنِ مستقبل الذكاء" : "Build the Future of AI"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "الاصطناعي معنا" : "Alongside Electi"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {isAr
              ? "سواء كنت موزعاً أو شريك تنفيذ أو مستشاراً أو مورد تقنية — يمتلك نظام شركاء Electi مساراً لك في المملكة العربية السعودية."
              : "Whether you're a reseller, implementation partner, consultant, or technology vendor — Electi's partner ecosystem has a path for you in Saudi Arabia."}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <a href="mailto:mohammed@electi.sa?subject=Partnership Inquiry">
              <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "التقدّم للشراكة" : "Apply to Partner"}
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ PARTNER TYPES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "أنواع الشراكة" : "Partnership Types"}</h2>
              <p className="text-white/28 text-sm">{isAr ? "خمسة مسارات شراكة مصمَّمة لسوق AI السعودي" : "Five partnership tracks designed for the Saudi AI market"}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {partnerTypes.map((pt) => {
                const Icon = pt.icon;
                return (
                  <motion.div key={pt.title} variants={fadeUp}
                    className="rounded-2xl border border-white/7 p-7 hover:border-white/12 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-5"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      <Icon className="w-4 h-4 text-white/45" />
                    </div>
                    <h3 className="font-700 text-white/80 mb-2">{isAr ? pt.titleAr : pt.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed mb-5">{isAr ? pt.descAr : pt.desc}</p>
                    <div className="space-y-1.5 mb-5">
                      {pt.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/28">
                          <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                          {isAr ? b.ar : b.en}
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-[9px] font-700 text-white/18 uppercase tracking-wider mb-1">{isAr ? "مثالي لـ" : "Ideal for"}</div>
                      <p className="text-white/22 text-[10px] leading-relaxed">{isAr ? pt.idealAr : pt.ideal}</p>
                    </div>
                  </motion.div>
                );
              })}
              {/* Become a partner CTA card */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-dashed border-white/10 p-7 flex flex-col items-center justify-center text-center"
                style={{ background: "rgba(255,255,255,0.01)" }}>
                <Mail className="w-8 h-8 text-white/15 mb-4" />
                <h3 className="font-700 text-white/50 mb-2">{isAr ? "نوع آخر؟" : "Something Else?"}</h3>
                <p className="text-white/22 text-xs leading-relaxed mb-5">{isAr ? "تواصل معنا إذا لم يتطابق نموذجك مع أي من الأنواع أعلاه." : "Reach out if your model doesn't fit any of the above."}</p>
                <a href="mailto:mohammed@electi.sa?subject=Partnership Inquiry">
                  <span className="flex items-center gap-1.5 text-white/30 hover:text-white/50 text-xs transition-colors">
                    {isAr ? "تواصل معنا" : "Get in touch"}
                    <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-700 mb-3">{isAr ? "كيف تصبح شريكاً" : "How to Become a Partner"}</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((step) => (
                <motion.div key={step.step} variants={fadeUp} className="rounded-xl border border-white/7 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="text-white/15 font-700 text-3xl mb-3">{step.step}</div>
                  <h3 className="font-700 text-white/70 mb-2 text-sm">{isAr ? step.titleAr : step.title}</h3>
                  <p className="text-white/28 text-xs leading-relaxed">{isAr ? step.descAr : step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-700 mb-4">{isAr ? "مستعد لبدء الشراكة؟" : "Ready to Partner?"}</h2>
            <p className="text-white/28 text-sm mb-6 max-w-md mx-auto">
              {isAr ? "ابدأ محادثة الشراكة. فريقنا سيرد خلال 2 أيام عمل." : "Start the partnership conversation. Our team responds within 2 business days."}
            </p>
            <a href="mailto:mohammed@electi.sa?subject=Partnership Application">
              <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "التقدّم الآن" : "Apply Now"}
              </motion.button>
            </a>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
