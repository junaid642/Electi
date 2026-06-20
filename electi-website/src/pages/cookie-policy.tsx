import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, Settings, BarChart3, Shield } from "lucide-react";
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

const cookieTypes = [
  {
    icon: Shield,
    name: "Strictly Necessary Cookies",
    nameAr: "ملفات تعريف الارتباط الضرورية للغاية",
    canDisable: false,
    desc: "These cookies are essential for the Electi platform to function. They enable core features such as authentication (keeping you logged in), security (CSRF protection), and session management. These cookies cannot be disabled.",
    descAr: "ملفات تعريف الارتباط هذه ضرورية لعمل منصة Electi. تُتيح الميزات الأساسية كالمصادقة والأمان وإدارة الجلسة. لا يمكن تعطيل هذه الملفات.",
    examples: [
      { name: "session_id", purpose: "Maintains your login session", purposeAr: "يحافظ على جلسة تسجيل الدخول", duration: "Session" },
      { name: "csrf_token", purpose: "Protects against cross-site request forgery", purposeAr: "يحمي من هجمات CSRF", duration: "Session" },
    ],
  },
  {
    icon: Settings,
    name: "Preference Cookies",
    nameAr: "ملفات تعريف الارتباط الخاصة بالتفضيلات",
    canDisable: true,
    desc: "These cookies store your preferences, including language selection (Arabic/English) and UI settings. Disabling them means your preferences will not be remembered between visits.",
    descAr: "تحفظ هذه الملفات تفضيلاتك، بما في ذلك اختيار اللغة (عربي/إنجليزي) وإعدادات واجهة المستخدم. يعني تعطيلها أن تفضيلاتك لن تُحفَظ بين الزيارات.",
    examples: [
      { name: "electi_lang", purpose: "Stores your language preference (en/ar)", purposeAr: "يخزّن تفضيل اللغة (ar/en)", duration: "1 year" },
      { name: "electi_splash", purpose: "Controls splash screen display", purposeAr: "يتحكم في عرض شاشة البداية", duration: "Session" },
    ],
  },
  {
    icon: BarChart3,
    name: "Analytics Cookies",
    nameAr: "ملفات تعريف الارتباط التحليلية",
    canDisable: true,
    desc: "These cookies help us understand how visitors interact with the Electi website — which pages are most visited, where visitors come from, and how long they spend on each page. All analytics data is aggregated and anonymised. No personal data is shared with analytics providers.",
    descAr: "تساعدنا هذه الملفات على فهم كيفية تفاعل الزوار مع موقع Electi — الصفحات الأكثر زيارةً ومصدر الزوار ومدة بقائهم في كل صفحة. جميع بيانات التحليلات مجمَّعة ومجهولة الهوية.",
    examples: [
      { name: "_ga", purpose: "Distinguishes unique users (Google Analytics)", purposeAr: "يُميّز المستخدمين الفريدين (Google Analytics)", duration: "2 years" },
      { name: "_ga_*", purpose: "Session state (Google Analytics)", purposeAr: "حالة الجلسة (Google Analytics)", duration: "2 years" },
    ],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://electi.sa/cookie-policy",
  "name": "Cookie Policy | Electi",
  "description": "Electi cookie policy — what cookies we use, why, and how to manage your cookie preferences.",
  "url": "https://electi.sa/cookie-policy",
};

export default function CookiePolicyPage() {
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
        title="Cookie Policy | Electi"
        titleAr="سياسة ملفات تعريف الارتباط | Electi"
        description="Electi's cookie policy: what cookies we use, why, how long we keep them, and how to manage your preferences. PDPL-compliant."
        descriptionAr="سياسة ملفات تعريف الارتباط الخاصة بـ Electi: الملفات التي نستخدمها ولماذا وكم مدة الاحتفاظ بها وكيفية إدارة تفضيلاتك. متوافقة مع PDPL."
        path="/cookie-policy"
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
            <Cookie className="w-3 h-3" />
            {isAr ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
            {isAr ? "سياسة ملفات" : "Cookie Policy"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "تعريف الارتباط" : "Last updated: June 2025"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "شفافية كاملة حول ملفات تعريف الارتباط التي نستخدمها على موقع Electi ولوحة تحكم التطبيق، ولماذا، وكيفية إدارة تفضيلاتك."
              : "Full transparency on the cookies we use on the Electi website and app dashboard, why we use them, and how to manage your preferences."}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ WHAT ARE COOKIES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-white/7 p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-xl font-700 text-white/80 mb-4">{isAr ? "ما هي ملفات تعريف الارتباط؟" : "What Are Cookies?"}</h2>
            <p className="text-white/38 text-sm leading-relaxed">
              {isAr
                ? "ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقع الويب. تُستخدَم لأغراض مختلفة مثل تذكّر تفضيلاتك والحفاظ على جلسة تسجيل الدخول وفهم كيفية استخدام الأشخاص للموقع. لا تحتوي ملفات تعريف الارتباط في حد ذاتها على بيانات شخصية حساسة."
                : "Cookies are small text files stored on your device when you visit a website. They are used for various purposes such as remembering your preferences, maintaining your login session, and understanding how people use the site. Cookies do not themselves contain sensitive personal data."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ COOKIE TYPES ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-2xl font-700 mb-2">{isAr ? "الملفات التي نستخدمها" : "Cookies We Use"}</h2>
            </motion.div>
            <div className="space-y-5">
              {cookieTypes.map((ct) => {
                const Icon = ct.icon;
                return (
                  <motion.div key={ct.name} variants={fadeUp} className="rounded-2xl border border-white/7 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <Icon className="w-4 h-4 text-white/45" />
                        </div>
                        <h3 className="font-700 text-white/80 text-sm">{isAr ? ct.nameAr : ct.name}</h3>
                      </div>
                      <span className={`text-[9px] font-700 px-2.5 py-1 rounded-full border ${ct.canDisable ? "border-white/10 text-white/35" : "border-white/12 text-white/50"}`}
                        style={{ background: "rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                        {ct.canDisable ? (isAr ? "اختياري" : "Optional") : (isAr ? "مطلوب" : "Required")}
                      </span>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed mb-5">{isAr ? ct.descAr : ct.desc}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-start py-2 pe-4 text-white/25 font-600">{isAr ? "الاسم" : "Name"}</th>
                            <th className="text-start py-2 pe-4 text-white/25 font-600">{isAr ? "الغرض" : "Purpose"}</th>
                            <th className="text-start py-2 text-white/25 font-600">{isAr ? "المدة" : "Duration"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ct.examples.map((ex) => (
                            <tr key={ex.name} className="border-b border-white/4 last:border-0">
                              <td className="py-2 pe-4 text-white/40 font-mono">{ex.name}</td>
                              <td className="py-2 pe-4 text-white/28">{isAr ? ex.purposeAr : ex.purpose}</td>
                              <td className="py-2 text-white/28">{ex.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MANAGE COOKIES ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/7 p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="text-xl font-700 text-white/80 mb-4">{isAr ? "كيفية إدارة ملفات تعريف الارتباط" : "How to Manage Cookies"}</h2>
              <p className="text-white/35 text-sm leading-relaxed mb-6">
                {isAr
                  ? "يمكنك إدارة ملفات تعريف الارتباط عبر إعدادات متصفحك. توفر جميع المتصفحات الرئيسية (Chrome وFirefox وSafari وEdge) خيارات لعرض ملفات تعريف الارتباط وحذفها وتقييد استخدامها. لاحظ أن تعطيل ملفات تعريف الارتباط الضرورية قد يؤثر على وظائف منصة Electi."
                  : "You can manage cookies through your browser settings. All major browsers (Chrome, Firefox, Safari, Edge) provide options to view, delete, and restrict cookies. Note that disabling necessary cookies may affect the functionality of the Electi platform."}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Chrome", "Firefox", "Safari", "Edge"].map((browser) => (
                  <div key={browser} className="rounded-xl border border-white/7 py-3 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="text-white/50 font-700 text-xs">{browser}</div>
                    <div className="text-white/20 text-[9px] mt-0.5">{isAr ? "إعدادات الخصوصية" : "Privacy Settings"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-white/25 text-xs text-center">
                  {isAr ? "لأسئلة حول استخدامنا لملفات تعريف الارتباط، تواصل معنا على" : "For questions about our cookie use, contact us at "}
                  <a href="mailto:mohammed@electi.sa" className="text-white/40 hover:text-white/60 underline underline-offset-2">mohammed@electi.sa</a>
                  {" | "}
                  <Link href="/privacy"><span className="text-white/40 hover:text-white/60 underline underline-offset-2 cursor-pointer">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span></Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
