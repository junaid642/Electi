import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Coffee, HardHat, ShoppingBag,
  MessageCircle, Receipt, Scale, BarChart3, Building,
  AlignJustify,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const SLIDE = [0.76, 0, 0.24, 1] as const;
const SOFT  = [0.22, 1, 0.36, 1] as const;

type SubMenu = "agents" | "industries" | "languages" | "others" | null;
type SubItem = { label: string; href: string; isGroup?: boolean; indent?: boolean; hasSub?: boolean; subKey?: string };

interface NavLink {
  key:    "home" | "agents" | "industries" | "languages" | "about" | "contact" | "signin" | "others" | "pricing";
  label:  string;
  href:   string;
  sub?:   SubMenu;
}

export default function Navbar({ hidden: hiddenProp, scrolled: scrolledProp }: { hidden?: boolean; scrolled?: boolean }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [sub, setSub]             = useState<SubMenu>(null);
  const [sub2, setSub2]           = useState<string | null>(null);
  const [location]                = useLocation();
  const { lang, setLang, t, isAr } = useLang();

  const [internalScrolled, setInternalScrolled] = useState(false);
  const [internalHidden,   setInternalHidden]   = useState(false);

  /* When props are passed (home page custom scroll container), use them directly.
     Otherwise fall back to the window scroll listener. */
  const scrolled = scrolledProp !== undefined ? scrolledProp : internalScrolled;
  const hidden   = hiddenProp   !== undefined ? hiddenProp   : internalHidden;

  useEffect(() => {
    if (hiddenProp !== undefined || scrolledProp !== undefined) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setInternalScrolled(y > 30);
      setInternalHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hiddenProp, scrolledProp]);

  useEffect(() => { setMenuOpen(false); setSub(null); setSub2(null); }, [location]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => { setSub2(null); }, [sub]);

  const close = () => { setMenuOpen(false); setSub(null); setSub2(null); };

  const menuLinks: NavLink[] = [
    { key: "home",       label: t("home"),        href: "/" },
    { key: "agents",     label: t("agents"),      href: "/agents",     sub: "agents" },
    { key: "industries", label: t("industries"),  href: "/industries", sub: "industries" },
    { key: "about",      label: t("about"),       href: "/about" },
    { key: "contact",    label: t("contact"),     href: "/contact" },
    { key: "pricing",    label: t("navPricing"),  href: "/pricing" },
    { key: "others",     label: t("navOthers"),   href: "#",           sub: "others" },
    { key: "signin",     label: t("navSignInUp"), href: "https://app.electi.sa/login" },
  ];

  // ── Agents panel ──────────────────────────────────────────────────────────
  const agentLinks: SubItem[] = [
    { label: t("agentPersonal"), href: "/agents/personal" },
    { label: t("agentBilling"),  href: "/agents/billing" },
    { label: t("agentLegal"),    href: "/agents/legal" },
    { label: t("agentSales"),    href: "/agents/sales", hasSub: true, subKey: "sales" },
  ];

  const salesLinks: SubItem[] = [
    { label: isAr ? "دليل وكلاء الذكاء الاصطناعي" : "AI Agents Guide",        href: "/ai-agents" },
    { label: isAr ? "وكلاء صوتيون"                 : "AI Voice Agents",        href: "/ai-voice-agents" },
    { label: isAr ? "وكلاء المبيعات"               : "AI Sales Agents",        href: "/ai-sales-agents" },
    { label: isAr ? "دعم العملاء"                  : "AI Customer Support",    href: "/ai-customer-support-agents" },
    { label: isAr ? "الموارد البشرية الذكية"        : "AI HR Agents",           href: "/ai-hr-agents" },
    { label: isAr ? "أتمتة العمليات"               : "AI Workflow Automation", href: "/ai-workflow-automation" },
    { label: isAr ? "حلول المؤسسات"                : "Enterprise Solutions",   href: "/enterprise-ai-solutions" },
    { label: isAr ? "وكلاء الأعمال"                : "Business AI Agents",     href: "/business-ai-agents" },
    { label: isAr ? "الذكاء الاصطناعي الشخصي"      : "Personal AI Agents",     href: "/personal-ai-agents" },
    { label: isAr ? "ابنِ وكيلك"                   : "Build Your Agent",       href: "/build-your-agent" },
  ];

  // ── Industries panel ──────────────────────────────────────────────────────
  const industryLinks: SubItem[] = [
    { label: t("indHealthcare"),                         href: "/industries/healthcare" },
    { label: t("indHospitality"),                        href: "/industries/hospitality" },
    { label: t("indConstruction"),                       href: "/industries/construction" },
    { label: t("indRetail"),                             href: "/industries/retail" },
    { label: t("enterprise"),                            href: "/industries/corporate" },
    { label: isAr ? "العقارات"     : "Real Estate",     href: "/industries/real-estate" },
  ];

  // ── Others panel ─────────────────────────────────────────────────────────
  const othersLinks: SubItem[] = [
    { label: isAr ? "الأسئلة الشائعة"     : "FAQ",                  href: "/faq" },
    { label: isAr ? "المدونة"             : "Blog",                 href: "/blog" },
    { label: isAr ? "وظائف"               : "Careers",              href: "/careers" },
    { label: isAr ? "مركز الأبحاث"        : "Research Center",      href: "#", hasSub: true, subKey: "research" },
    { label: isAr ? "التكاملات"           : "Integrations",         href: "#", hasSub: true, subKey: "integrations" },
    { label: isAr ? "السوق"               : "Marketplace",          href: "#", hasSub: true, subKey: "marketplace" },
    { label: isAr ? "مقارنة"              : "Compare",              href: "#", hasSub: true, subKey: "compare" },
    { label: isAr ? "اللغات والصوت"       : "Languages & Voice",    href: "#", hasSub: true, subKey: "others-lang" },
    { label: isAr ? "المواقع"             : "Locations",            href: "#", hasSub: true, subKey: "others-loc" },
    { label: isAr ? "القانون والامتثال"   : "Legal & Compliance",   href: "#", hasSub: true, subKey: "legal" },
    { label: isAr ? "المزيد"              : "More",                 href: "#", hasSub: true, subKey: "more" },
  ];

  // ── Sub2 panels ───────────────────────────────────────────────────────────
  const researchLinks: SubItem[] = [
    { label: isAr ? "مركز الأبحاث"                    : "Research Center",                href: "/resources" },
    { label: isAr ? "التنزيلات"                        : "Downloads",                      href: "/resources/downloads" },
    { label: isAr ? "حالات الاستخدام"                 : "Case Studies",                   href: "/case-studies" },
    { label: isAr ? "دراسة: دعم العملاء"              : "Case Study: Customer Support",   href: "/case-studies/ai-customer-support" },
    { label: isAr ? "دراسة: وكيل المبيعات"            : "Case Study: Sales Agent",        href: "/case-studies/ai-sales-agent" },
    { label: isAr ? "دراسة: موظف الاستقبال"           : "Case Study: Receptionist",       href: "/case-studies/ai-receptionist" },
    { label: isAr ? "دراسة: وكيل الموارد البشرية"    : "Case Study: HR Agent",           href: "/case-studies/ai-hr-agent" },
    { label: isAr ? "دراسة: أتمتة العمليات"           : "Case Study: Workflow",           href: "/case-studies/ai-workflow-automation" },
    { label: isAr ? "دراسة: الوكلاء الصوتيون"        : "Case Study: Voice Agents",       href: "/case-studies/ai-voice-agents" },
    { label: isAr ? "كيف يعمل"                        : "How It Works",                   href: "/how-it-works" },
    { label: isAr ? "حالة الذكاء الاصطناعي في السعودية" : "State of AI in KSA",          href: "/resources/state-of-ai-in-saudi-arabia" },
    { label: isAr ? "مستقبل وكلاء الذكاء الاصطناعي"  : "Future of AI Agents",            href: "/resources/future-of-ai-agents-saudi-arabia" },
    { label: isAr ? "الذكاء الاصطناعي للأعمال السعودية" : "AI for Saudi Businesses",     href: "/resources/ai-agents-for-saudi-businesses" },
    { label: isAr ? "الذكاء الاصطناعي مقابل الموظفين" : "AI vs Traditional Employees",   href: "/resources/ai-agents-vs-traditional-employees" },
    { label: isAr ? "اتجاهات خدمة العملاء"           : "Customer Service Trends",        href: "/resources/ai-customer-service-trends-saudi-arabia" },
    { label: isAr ? "الذكاء الاصطناعي في الضيافة"    : "AI in Hospitality",              href: "/resources/ai-in-hospitality" },
    { label: isAr ? "الذكاء الاصطناعي في الرعاية الصحية" : "AI in Healthcare",          href: "/resources/ai-in-healthcare" },
    { label: isAr ? "الذكاء الاصطناعي في العقارات"   : "AI in Real Estate",              href: "/resources/ai-in-real-estate" },
    { label: isAr ? "الذكاء الاصطناعي في الحكومة"    : "AI in Government",               href: "/resources/ai-in-government" },
    { label: isAr ? "الذكاء الاصطناعي في التعليم"    : "AI in Education",                href: "/resources/ai-in-education" },
  ];

  const integrationsLinks: SubItem[] = [
    { label: isAr ? "مركز التكاملات"  : "Integrations Hub",     href: "/integrations" },
    { label: isAr ? "الشركاء"          : "Partners",              href: "/partners" },
    { label: "Gmail",                                              href: "/integrations/gmail" },
    { label: "Google Workspace",                                   href: "/integrations/google-workspace" },
    { label: "Google Gemini",                                      href: "/integrations/google-gemini" },
    { label: "OpenAI",                                             href: "/integrations/openai" },
    { label: "Anthropic",                                          href: "/integrations/anthropic" },
    { label: "Microsoft 365",                                      href: "/integrations/microsoft-365" },
    { label: "Microsoft Teams",                                    href: "/integrations/microsoft-teams" },
    { label: "Microsoft Copilot",                                  href: "/integrations/microsoft-copilot" },
    { label: "Outlook",                                            href: "/integrations/outlook" },
    { label: "HubSpot",                                            href: "/integrations/hubspot" },
    { label: "Salesforce",                                         href: "/integrations/salesforce" },
    { label: "Slack",                                              href: "/integrations/slack" },
    { label: "WhatsApp Business",                                  href: "/integrations/whatsapp-business" },
    { label: "SAP",                                                href: "/integrations/sap" },
    { label: "Oracle",                                             href: "/integrations/oracle" },
    { label: "Odoo",                                               href: "/integrations/odoo" },
    { label: "Shopify",                                            href: "/integrations/shopify" },
    { label: "WooCommerce",                                        href: "/integrations/woocommerce" },
    { label: "Zoho",                                               href: "/integrations/zoho" },
  ];

  const marketplaceLinks: SubItem[] = [
    { label: isAr ? "السوق"                    : "Marketplace Hub",          href: "/marketplace" },
    { label: isAr ? "وكيل المبيعات"            : "Sales Agent",               href: "/marketplace/ai-sales-agent" },
    { label: isAr ? "دعم العملاء"              : "Customer Support",          href: "/marketplace/ai-customer-support" },
    { label: isAr ? "موظف الاستقبال"           : "Receptionist",              href: "/marketplace/ai-receptionist" },
    { label: isAr ? "وكيل الموارد البشرية"    : "HR Agent",                  href: "/marketplace/ai-hr-agent" },
    { label: isAr ? "تأهيل العملاء المحتملين" : "Lead Qualification",        href: "/marketplace/ai-lead-qualification" },
    { label: isAr ? "وكيل واتساب"             : "WhatsApp Agent",             href: "/marketplace/ai-whatsapp" },
    { label: isAr ? "الرعاية الصحية"          : "Healthcare",                href: "/marketplace/ai-healthcare" },
    { label: isAr ? "الضيافة"                 : "Hospitality",               href: "/marketplace/ai-hospitality" },
    { label: isAr ? "البيع بالتجزئة"          : "Retail",                    href: "/marketplace/ai-retail" },
    { label: isAr ? "التعليم"                 : "Education",                 href: "/marketplace/ai-education" },
    { label: isAr ? "العقارات"                : "Property",                  href: "/marketplace/ai-property" },
    { label: isAr ? "التوظيف"                 : "Recruitment",               href: "/marketplace/ai-recruitment" },
    { label: isAr ? "قاعدة المعرفة"           : "Knowledge Base",            href: "/marketplace/ai-knowledge-base" },
  ];

  const compareLinks: SubItem[] = [
    { label: isAr ? "وكيل ذكاء اصطناعي مقابل روبوت دردشة" : "AI Agent vs Chatbot",          href: "/compare/ai-agent-vs-chatbot" },
    { label: isAr ? "موظف استقبال ذكي مقابل بشري"          : "AI Receptionist vs Human",     href: "/compare/ai-receptionist-vs-human" },
    { label: isAr ? "مبيعات ذكية مقابل مركز اتصال"         : "AI Sales vs Call Center",      href: "/compare/ai-sales-vs-call-center" },
    { label: isAr ? "دعم ذكي مقابل التقليدي"               : "AI Support vs Traditional",    href: "/compare/ai-support-vs-traditional" },
    { label: isAr ? "ذكاء اصطناعي مقابل يدوي"              : "AI vs Manual",                 href: "/compare/ai-vs-manual" },
  ];

  const legalLinks: SubItem[] = [
    { label: isAr ? "سياسة الخصوصية"    : "Privacy Policy",    href: "/privacy" },
    { label: isAr ? "شروط الخدمة"       : "Terms of Service",  href: "/terms-of-use" },
    { label: isAr ? "سياسة Google"      : "Google Policy",     href: "/google" },
    { label: isAr ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy", href: "/cookie-policy" },
    { label: isAr ? "حماية البيانات"    : "Data Protection",   href: "/data-protection" },
    { label: isAr ? "الامتثال"          : "Compliance",        href: "/compliance" },
    { label: isAr ? "الأمان"            : "Security",          href: "/security" },
  ];

  const languageLinks: SubItem[] = [
    { label: isAr ? "وكلاء الذكاء الاصطناعي العربي"    : "Arabic AI Agents",       href: "/arabic-ai-agents" },
    { label: isAr ? "وكلاء الذكاء الاصطناعي الإنجليزي" : "English AI Agents",      href: "/english-ai-agents" },
    { label: isAr ? "وكلاء متعددو اللغات"               : "Multilingual AI Agents", href: "/multilingual-ai-agents" },
    { label: isAr ? "دعم العملاء العربي"                : "Arabic Customer Support", href: "/arabic-ai-customer-support" },
    { label: isAr ? "وكلاء المبيعات العربيون"           : "Arabic Sales Agents",    href: "/arabic-ai-sales-agents" },
    { label: isAr ? "موظفو الاستقبال العربيون"          : "Arabic AI Receptionists", href: "/arabic-ai-receptionists" },
    { label: isAr ? "الذكاء الاصطناعي الصوتي العربي"   : "Arabic Voice AI",         href: "/arabic-voice-ai" },
    { label: isAr ? "مركز الاتصال الذكي"                : "AI Call Center",          href: "/ai-call-center" },
  ];

  const locationLinks: SubItem[] = [
    { label: isAr ? "الرياض"                        : "Riyadh",                  href: "/riyadh" },
    { label: isAr ? "جدة"                           : "Jeddah",                  href: "/jeddah" },
    { label: isAr ? "وكلاء الذكاء الاصطناعي الرياض" : "AI Agents Riyadh",        href: "/ai-agents-riyadh" },
    { label: isAr ? "وكلاء الذكاء الاصطناعي جدة"    : "AI Agents Jeddah",        href: "/ai-agents-jeddah" },
    { label: isAr ? "وكلاء الأعمال الرياض"          : "Business AI Riyadh",      href: "/business-ai-agents-riyadh" },
    { label: isAr ? "وكلاء الأعمال جدة"             : "Business AI Jeddah",      href: "/business-ai-agents-jeddah" },
    { label: isAr ? "موظف استقبال الرياض"           : "Receptionist Riyadh",     href: "/ai-receptionist-riyadh" },
    { label: isAr ? "موظف استقبال جدة"              : "Receptionist Jeddah",     href: "/ai-receptionist-jeddah" },
    { label: isAr ? "دعم العملاء الرياض"             : "Customer Support Riyadh", href: "/ai-customer-support-riyadh" },
    { label: isAr ? "دعم العملاء جدة"               : "Customer Support Jeddah", href: "/ai-customer-support-jeddah" },
    { label: isAr ? "وكلاء المبيعات الرياض"          : "Sales Agents Riyadh",     href: "/ai-sales-agents-riyadh" },
    { label: isAr ? "وكلاء المبيعات جدة"            : "Sales Agents Jeddah",     href: "/ai-sales-agents-jeddah" },
  ];

  const moreLinks: SubItem[] = [
    { label: isAr ? "التكنولوجيا"          : "Technology",          href: "/technology" },
    { label: isAr ? "حلول المؤسسات"        : "Enterprise AI",       href: "/enterprise-ai-solutions" },
    { label: isAr ? "اكتشاف الذكاء الاصطناعي" : "AI Discovery",    href: "/ai-discovery" },
    { label: isAr ? "حاسبة العائد"          : "ROI Calculator",      href: "/roi-calculator" },
    { label: isAr ? "لنتواصل"               : "Let's Connect",       href: "/letsconnect" },
    { label: isAr ? "إنشاء حساب"            : "Sign Up",             href: "/signup" },
    { label: isAr ? "تسجيل الدخول"          : "Login",               href: "/login" },
  ];

  const subItems: SubItem[] = sub === "agents"     ? agentLinks
                 : sub === "industries" ? industryLinks
                 : sub === "others"     ? othersLinks
                 : [];
  const subTitle = sub === "agents"     ? t("agents")
                 : sub === "industries" ? t("industries")
                 : t("navOthers");

  const sub2Items: SubItem[] =
      sub2 === "sales"         ? salesLinks
    : sub2 === "research"      ? researchLinks
    : sub2 === "integrations"  ? integrationsLinks
    : sub2 === "marketplace"   ? marketplaceLinks
    : sub2 === "compare"       ? compareLinks
    : sub2 === "legal"         ? legalLinks
    : sub2 === "others-lang"   ? languageLinks
    : sub2 === "others-loc"    ? locationLinks
    : sub2 === "more"          ? moreLinks
    : [];
  const sub2Title =
      sub2 === "sales"         ? (isAr ? "المبيعات والحجوزات" : "Sales & Reservations")
    : sub2 === "research"      ? (isAr ? "مركز الأبحاث"       : "Research Center")
    : sub2 === "integrations"  ? (isAr ? "التكاملات"           : "Integrations")
    : sub2 === "marketplace"   ? (isAr ? "السوق"               : "Marketplace")
    : sub2 === "compare"       ? (isAr ? "مقارنة"              : "Compare")
    : sub2 === "legal"         ? (isAr ? "القانون والامتثال"   : "Legal & Compliance")
    : sub2 === "others-lang"   ? (isAr ? "اللغات والصوت"       : "Languages & Voice")
    : sub2 === "others-loc"    ? (isAr ? "المواقع"             : "Locations")
    : sub2 === "more"          ? (isAr ? "المزيد"              : "More")
    : "";

  return (
    <>
      {/* ── Top bar ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05, ease: SOFT }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled || menuOpen ? "border-white/8" : "border-white/4"
        }`}
        style={{
          background: scrolled || menuOpen
            ? "rgba(5,5,5,0.72)"
            : "rgba(5,5,5,0.40)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <div className="relative flex items-center justify-between h-16" dir="ltr">

            {/* MENU button — hamburger icon on mobile, icon+text on sm+ */}
            <motion.button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-2 cursor-pointer"
              whileHover="hover" whileTap={{ scale: 0.96 }}
              data-testid="nav-mobile-menu" aria-label="Open menu"
            >
              <AlignJustify size={22} className="text-white/75 group-hover:text-white transition-colors" strokeWidth={1.6} />
              <span className="hidden sm:inline text-[11px] font-600 uppercase text-white/75 group-hover:text-white transition-colors"
                style={{ letterSpacing: "0.22em" }}>
                {t("menu")}
              </span>
            </motion.button>

            {/* Logo — absolutely centered, visible on all sizes */}
            <Link href="/" data-testid="nav-logo" className="absolute left-1/2 -translate-x-1/2">
              <motion.div className="flex items-center cursor-pointer" whileHover={{ scale: 1.04 }}>
                {/* Desktop */}
                <div className="hidden sm:block" style={{ height: 48, width: 120, flexShrink: 0 }}>
                  <img src="/electi-logo-new.png" alt="Electi"
                    style={{ height: 48, width: 120, objectFit: "contain" }} />
                </div>
                {/* Mobile */}
                <div className="sm:hidden" style={{ height: 40, width: 100, flexShrink: 0 }}>
                  <img src="/electi-logo-new.png" alt="Electi"
                    style={{ height: 40, width: 100, objectFit: "contain" }} />
                </div>
              </motion.div>
            </Link>

            {/* Lang switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {(["en", "ar"] as const).map((l, i) => (
                <div key={l} className="flex items-center gap-1.5 sm:gap-2.5">
                  {i > 0 && <span className="text-white/20 text-[10px] sm:text-xs select-none">|</span>}
                  <button onClick={() => setLang(l)}
                    className={`text-[10px] sm:text-[13px] font-600 tracking-[0.10em] sm:tracking-[0.14em] uppercase transition-colors duration-200 ${
                      lang === l ? "text-white" : "text-white/55 hover:text-white/80"
                    }`}
                    data-testid={`lang-toggle-${l}`}>
                    {l.toUpperCase()}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* ════════════════════════════════════════════════════
                MOBILE MENU  (< sm)  — full-screen accordion
            ════════════════════════════════════════════════════ */}
            <motion.div
              key="mobile-menu"
              className="sm:hidden fixed inset-0 z-[100] flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{ background: "rgba(5,5,5,0.98)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 flex-shrink-0 border-b border-white/6">
                <motion.button
                  onClick={close}
                  className="flex items-center gap-2.5 group cursor-pointer"
                  whileTap={{ scale: 0.94 }}
                  data-testid="nav-menu-close"
                >
                  <span className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <span className="absolute block w-4 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full rotate-45" />
                    <span className="absolute block w-4 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full -rotate-45" />
                  </span>
                  <span className="text-[11px] font-600 uppercase text-white/35 group-hover:text-white transition-colors"
                    style={{ letterSpacing: "0.22em" }}>{t("close")}</span>
                </motion.button>

                {/* Lang */}
                <div className="flex items-center gap-3">
                  {(["en", "ar"] as const).map((l, i) => (
                    <div key={l} className="flex items-center gap-3">
                      {i > 0 && <span className="text-white/18 text-xs">|</span>}
                      <button onClick={() => setLang(l)}
                        className={`text-[12px] font-600 uppercase tracking-[0.14em] transition-colors ${
                          lang === l ? "text-white" : "text-white/28 hover:text-white/55"
                        }`}>
                        {l.toUpperCase()}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav list — scrollable */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                {menuLinks.map((link, i) => {
                  const isActive   = location === link.href;
                  const isExpanded = link.sub === sub && sub !== null;
                  const subList: SubItem[]    = link.sub === "agents" ? agentLinks : link.sub === "industries" ? industryLinks : link.sub === "others" ? othersLinks : [];

                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.38, ease: SOFT }}
                    >
                      {/* Row */}
                      <div className="border-b border-white/6">
                        {link.sub ? (
                          <button
                            className="w-full flex items-center justify-between py-4 cursor-pointer"
                            onClick={() => setSub(isExpanded ? null : link.sub!)}
                            data-testid={`menu-link-${link.key}`}
                          >
                            <span className="text-[18px] font-300 uppercase transition-colors duration-150"
                              style={{ letterSpacing: "0.16em", color: isExpanded ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.52)" }}>
                              {link.label}
                            </span>
                            <motion.span
                              className="text-[18px] font-300 flex-shrink-0"
                              animate={{ rotate: isExpanded ? 90 : 0, color: isExpanded ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)" }}
                              transition={{ duration: 0.22 }}
                            >
                              ›
                            </motion.span>
                          </button>
                        ) : link.href.startsWith("http") ? (
                          <a href={link.href} target="_self" rel="noreferrer" onClick={close} data-testid={`menu-link-${link.key}`}>
                            <div className="flex items-center justify-between py-4 cursor-pointer">
                              <span className="text-[18px] font-300 uppercase transition-colors duration-150"
                                style={{ letterSpacing: "0.16em", color: "rgba(255,255,255,0.52)" }}>
                                {link.label}
                              </span>
                            </div>
                          </a>
                        ) : (
                          <Link href={link.href} onClick={close} data-testid={`menu-link-${link.key}`}>
                            <div className="flex items-center justify-between py-4 cursor-pointer">
                              <span className="text-[18px] font-300 uppercase transition-colors duration-150"
                                style={{ letterSpacing: "0.16em", color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.52)" }}>
                                {link.label}
                              </span>
                            </div>
                          </Link>
                        )}

                        {/* Inline accordion sub-items */}
                        <AnimatePresence initial={false}>
                          {isExpanded && subList.length > 0 && (
                            <motion.div
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: SOFT }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="pb-3 pt-1 flex flex-col gap-0">
                                {subList.map((item, j) => (
                                  <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: isAr ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.04, duration: 0.24, ease: SOFT }}
                                  >
                                    {item.isGroup ? (
                                      <div className="flex items-center gap-2 pt-3 pb-1 px-3">
                                        <span className="text-[9px] font-600 uppercase" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.26em" }}>{item.label}</span>
                                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                                      </div>
                                    ) : item.hasSub ? (
                                      <>
                                        <button
                                          className="w-full"
                                          onClick={() => setSub2(sub2 === item.subKey ? null : item.subKey!)}
                                        >
                                          <div className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg cursor-pointer group"
                                            style={{ background: sub2 === item.subKey ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.00)" }}
                                          >
                                            <div className="flex items-center gap-3">
                                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                              <span className="text-[13px] font-400 uppercase transition-colors duration-150"
                                                style={{ letterSpacing: "0.14em", color: sub2 === item.subKey ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.52)" }}>
                                                {item.label}
                                              </span>
                                            </div>
                                            <motion.span
                                              className="text-[14px] font-300 flex-shrink-0"
                                              animate={{ rotate: sub2 === item.subKey ? 90 : 0, color: sub2 === item.subKey ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                              transition={{ duration: 0.2 }}
                                            >›</motion.span>
                                          </div>
                                        </button>
                                        <AnimatePresence initial={false}>
                                          {sub2 === item.subKey && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25, ease: SOFT }}
                                              style={{ overflow: "hidden" }}
                                            >
                                              <div className="pb-1 pt-0.5 flex flex-col gap-0 ps-4">
                                                {sub2Items.map((s, k) => (
                                                  <Link key={s.href} href={s.href} onClick={close}>
                                                    <div className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer group"
                                                      style={{ background: "rgba(255,255,255,0.00)" }}
                                                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                                    >
                                                      <motion.span
                                                        className="w-0.5 h-3 rounded-full flex-shrink-0"
                                                        style={{ background: "rgba(255,255,255,0.14)" }}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        transition={{ delay: k * 0.04 }}
                                                      />
                                                      <span className="text-[11px] font-400 uppercase text-white/36 group-hover:text-white/75 transition-colors duration-150"
                                                        style={{ letterSpacing: "0.13em" }}>
                                                        {s.label}
                                                      </span>
                                                    </div>
                                                  </Link>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </>
                                    ) : (
                                      <Link href={item.href} onClick={close}>
                                        <div className={`flex items-center gap-3 py-2 rounded-lg cursor-pointer group ${item.indent ? "px-5" : "px-3"}`}
                                          style={{ background: "rgba(255,255,255,0.00)" }}
                                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                        >
                                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: item.indent ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)" }} />
                                          <span className={`${item.indent ? "text-[11px]" : "text-[13px]"} font-400 uppercase text-white/42 group-hover:text-white/80 transition-colors duration-150`}
                                            style={{ letterSpacing: "0.14em" }}>
                                            {item.label}
                                          </span>
                                        </div>
                                      </Link>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="flex-shrink-0 border-t border-white/5 px-6 py-4"
              >
                <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.14)", letterSpacing: "0.1em" }}>
                  {t("navCopyright")}
                </p>
              </motion.div>
            </motion.div>

            {/* ════════════════════════════════════════════════════
                DESKTOP MENU  (sm+)  — side-panel design (unchanged)
            ════════════════════════════════════════════════════ */}
            <motion.div
              key="desktop-menu"
              className="hidden sm:block fixed inset-0 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(0,0,0,0.55)" }}
                onClick={close}
              />

              <div className={`absolute top-0 bottom-0 ${isAr ? "right-0" : "left-0"} flex ${isAr ? "flex-row-reverse" : "flex-row"} h-full`}>
                {/* Main panel */}
                <motion.div
                  initial={{ x: isAr ? "100%" : "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: isAr ? "100%" : "-100%" }}
                  transition={{ duration: 0.65, ease: SLIDE }}
                  className="relative flex flex-col w-[440px] h-full border-r border-white/6"
                  style={{ background: "rgba(5,5,5,0.96)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)" }}
                >
                  <div className="flex items-center justify-between px-7 h-16 flex-shrink-0 border-b border-white/6">
                    <motion.button
                      onClick={close}
                      className="flex items-center gap-2 group cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                      data-testid="nav-menu-close"
                    >
                      <span className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
                        <span className="absolute block w-3.5 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full rotate-45" />
                        <span className="absolute block w-3.5 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full -rotate-45" />
                      </span>
                      <span className="text-[10px] font-600 uppercase text-white/38 group-hover:text-white transition-colors"
                        style={{ letterSpacing: "0.22em" }}>{t("close")}</span>
                    </motion.button>
                    <div className="flex items-center gap-3">
                      {(["en", "ar"] as const).map((l) => (
                        <button key={l} onClick={() => setLang(l)}
                          className={`text-[10px] font-600 uppercase tracking-[0.14em] transition-colors ${
                            lang === l ? "text-white/65" : "text-white/20 hover:text-white/42"
                          }`}>
                          {l === "en" ? "EN" : "AR"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <nav className="flex-1 flex flex-col justify-center px-7 py-6 overflow-y-auto">
                    {menuLinks.map((link, i) => {
                      const isActive   = location === link.href;
                      const isExpanded = link.sub === sub && sub !== null;
                      const delay      = 0.18 + i * 0.07;
                      return (
                        <div key={link.key + i} className="overflow-hidden py-2.5">
                          {link.sub ? (
                            <button
                              onClick={() => setSub(isExpanded ? null : link.sub!)}
                              className="w-full flex items-center justify-between group cursor-pointer"
                              data-testid={`menu-link-${link.key}`}
                            >
                              <motion.div
                                className="flex items-center justify-between w-full"
                                initial={{ y: "110%" }} animate={{ y: 0 }}
                                transition={{ delay, duration: 0.62, ease: SLIDE }}
                              >
                                <motion.span
                                  className="text-[17px] font-300 uppercase"
                                  style={{ letterSpacing: "0.16em", color: isExpanded ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)" }}
                                  whileHover={{ color: "rgba(255,255,255,1)" }}
                                  transition={{ duration: 0.18 }}
                                >
                                  {link.label}
                                </motion.span>
                                <motion.span
                                  className="text-[14px] font-300 flex-shrink-0 ml-2"
                                  style={{ color: "rgba(255,255,255,0.22)" }}
                                  animate={{ rotate: isExpanded ? 90 : 0, color: isExpanded ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                  transition={{ duration: 0.25 }}
                                >›</motion.span>
                              </motion.div>
                            </button>
                          ) : link.href.startsWith("http") ? (
                            <a href={link.href} target="_self" rel="noreferrer" onClick={close} className="block">
                              <div className="w-full group cursor-pointer" data-testid={`menu-link-${link.key}`}>
                                <motion.span
                                  className="block text-[17px] font-300 uppercase"
                                  style={{ letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)" }}
                                  initial={{ y: "110%" }} animate={{ y: 0 }}
                                  transition={{ delay, duration: 0.62, ease: SLIDE }}
                                  whileHover={{ color: "rgba(255,255,255,1)" }}
                                >
                                  {link.label}
                                </motion.span>
                              </div>
                            </a>
                          ) : (
                            <Link href={link.href} onClick={close}>
                              <div className="w-full group cursor-pointer" data-testid={`menu-link-${link.key}`}>
                                <motion.span
                                  className="block text-[17px] font-300 uppercase"
                                  style={{ letterSpacing: "0.16em", color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}
                                  initial={{ y: "110%" }} animate={{ y: 0 }}
                                  transition={{ delay, duration: 0.62, ease: SLIDE }}
                                  whileHover={{ color: "rgba(255,255,255,1)" }}
                                >
                                  {link.label}
                                </motion.span>
                              </div>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="flex-shrink-0 border-t border-white/5 px-7 py-4"
                  >
                    <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>
                      {t("navCopyright")}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Sub-panel */}
                <AnimatePresence>
                  {sub !== null && (
                    <motion.div
                      key="sub-panel"
                      initial={{ x: "-60px", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-30px", opacity: 0 }}
                      transition={{ duration: 0.42, ease: SLIDE }}
                      className="relative flex flex-col w-[340px] h-full border-r border-white/5 overflow-hidden"
                      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[1px]"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)" }} />
                      <motion.div
                        className="absolute left-0 w-[1px] h-24 pointer-events-none"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)" }}
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
                      />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={sub}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="flex flex-col h-full"
                        >
                          <div className="flex items-center px-6 h-16 flex-shrink-0 border-b border-white/5">
                            <span className="text-[9px] font-600 uppercase"
                              style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.28em" }}>
                              {subTitle}
                            </span>
                          </div>
                          <div className="flex-1 flex flex-col px-6 py-4 overflow-y-auto">
                            {subItems.map((item, i) => (
                              <motion.div
                                key={item.label}
                                initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.04 + i * 0.035, duration: 0.3, ease: SOFT }}
                              >
                                {item.isGroup ? (
                                  <div className="flex items-center gap-2 pt-4 pb-1">
                                    <span className="text-[9px] font-600 uppercase" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.28em" }}>{item.label}</span>
                                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                                  </div>
                                ) : item.hasSub ? (
                                  <button
                                    className="w-full text-start"
                                    onClick={() => setSub2(sub2 === item.subKey ? null : item.subKey!)}
                                  >
                                    <motion.div
                                      className="flex items-center justify-between cursor-pointer py-1.5"
                                      whileHover="hov"
                                    >
                                      <motion.span
                                        className="text-[15px] font-300 uppercase"
                                        style={{ color: sub2 === item.subKey ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.42)", letterSpacing: "0.16em" }}
                                        variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                        transition={{ duration: 0.14 }}
                                      >
                                        {item.label}
                                      </motion.span>
                                      <motion.span
                                        className="text-[14px] font-300 ms-2 flex-shrink-0"
                                        style={{ color: "rgba(255,255,255,0.22)" }}
                                        animate={{ rotate: sub2 === item.subKey ? 90 : 0, color: sub2 === item.subKey ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                        transition={{ duration: 0.22 }}
                                      >›</motion.span>
                                    </motion.div>
                                  </button>
                                ) : (
                                  <Link href={item.href} onClick={close}>
                                    <motion.div className={`cursor-pointer py-1.5 ${item.indent ? "ps-3" : ""}`} whileHover="hov">
                                      <motion.span
                                        className={`${item.indent ? "text-[12px]" : "text-[15px]"} font-300 uppercase`}
                                        style={{ color: item.indent ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.42)", letterSpacing: "0.16em" }}
                                        variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                        transition={{ duration: 0.14 }}
                                      >
                                        {item.label}
                                      </motion.span>
                                    </motion.div>
                                  </Link>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── 3rd panel: unified sub2 ── */}
                <AnimatePresence>
                  {sub2 !== null && (
                    <motion.div
                      key={sub2}
                      initial={{ x: "-60px", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-30px", opacity: 0 }}
                      transition={{ duration: 0.38, ease: SLIDE }}
                      className="relative flex flex-col w-[300px] h-full border-r border-white/5 overflow-hidden"
                      style={{ background: "rgba(12,12,12,0.94)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[1px]"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }} />
                      <motion.div
                        className="absolute left-0 w-[1px] h-24 pointer-events-none"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)" }}
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.8 }}
                      />
                      <div className="flex items-center px-6 h-16 flex-shrink-0 border-b border-white/5">
                        <span className="text-[9px] font-600 uppercase"
                          style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.28em" }}>
                          {sub2Title}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center px-6 py-6 overflow-y-auto">
                        <AnimatePresence mode="wait">
                          <motion.div key={sub2} className="flex flex-col">
                            {sub2Items.map((item, i) => (
                              <motion.div
                                key={item.href}
                                initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: SOFT }}
                              >
                                <Link href={item.href} onClick={close}>
                                  <motion.div className="cursor-pointer py-2.5" whileHover="hov">
                                    <motion.span
                                      className="text-[14px] font-300 uppercase"
                                      style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.16em" }}
                                      variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                      transition={{ duration: 0.14 }}
                                    >
                                      {item.label}
                                    </motion.span>
                                  </motion.div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
