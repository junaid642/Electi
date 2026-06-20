"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu as HamburgerIcon } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const SLIDE = [0.76, 0, 0.24, 1] as const;
const SOFT  = [0.22, 1, 0.36, 1] as const;

type SubMenu = "tours" | "web" | "others" | null;

export default function Navbar() {
  const { lang, setLang, t, isAr } = useLang();
  const pathname = usePathname();

  const isHome     = pathname === "/" || pathname === "";
  const isHeroOnly = isHome;

  // These category-picker pages always keep the navbar pinned (never auto-hide)
  const PIN_NAV_PATHS = [
    "/virtual-tours/luxury-private",
    "/virtual-tours/real-estate",
    "/virtual-tours/hospitality",
    "/virtual-tours/others",
    "/development/website",
    "/development/ai-solutions",
    "/development/erp-sap",
  ];
  const pinNav = PIN_NAV_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [sub,       setSub]       = useState<SubMenu>(null);
  const [subSub,    setSubSub]    = useState<string | null>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    // Regular pages — window scrolls normally
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY && y > 80);
      lastY = y;
    };

    // Snap-scroll pages — scroll happens inside a div so window.scrollY stays 0;
    // use wheel direction as a fallback
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY > 0) return; // regular page scroll taking over, ignore
      if (e.deltaY > 8) {
        setScrolled(true);
        setHidden(true);
      } else if (e.deltaY < -8) {
        setHidden(false);
      }
    };

    // Snap-scroll container fires this reliable scroll event
    const onSnapScroll = (e: Event) => {
      const { down, scrollTop } = (e as CustomEvent<{ down: boolean; scrollTop: number }>).detail;
      setScrolled(scrollTop > 30);
      if (down && scrollTop > 80) setHidden(true);
      else if (!down) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("x360:snapscroll", onSnapScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("x360:snapscroll", onSnapScroll);
    };
  }, []);

  useEffect(() => { setMenuOpen(false); setSub(null); setSubSub(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => { setMenuOpen(false); setSub(null); setSubSub(null); };

  const navLinks = [
    { key: "tours",   label: isAr ? "جولات 360 الافتراضية" : "360 Virtual Tours", href: "/virtual-tours", sub: "tours" as SubMenu },
    { key: "web",     label: t.nav.webDev,                              href: "/development",  sub: "web"     as SubMenu },
    { key: "contact", label: t.nav.contact,                             href: "/contact", sub: null },
    { key: "about",   label: isAr ? "من نحن" : "About Us",             href: "/about",   sub: null },
    { key: "others",  label: isAr ? "أخرى" : "Others",                 href: "#",        sub: "others"  as SubMenu },
  ];

  const othersLinks = [
    { label: isAr ? "سياسة الخصوصية" : "Privacy Policy",  href: "/privacy-policy" },
    { label: isAr ? "شروط الاستخدام" : "Terms of Use",    href: "/terms-and-conditions" },
    { label: isAr ? "المدونة"         : "Blogs",           href: "/blog" },
    { label: isAr ? "الأسئلة الشائعة" : "FAQ",             href: "/faq" },
    { label: isAr ? "المحفظة"         : "Portfolio",       href: "/portfolio" },
    { label: isAr ? "الموارد"         : "Resources",       href: "/resources" },
  ];

  const locationsCategory = {
    key: "locations",
    label: isAr ? "المواقع" : "Locations",
    items: [
      { label: isAr ? "جولات 360° الافتراضية" : "360° Virtual Tours", href: "",                            type: "heading" as const },
      { label: isAr ? "الرياض"                : "Riyadh",             href: "/virtual-tours/riyadh"        },
      { label: isAr ? "جدة"                   : "Jeddah",             href: "/virtual-tours/jeddah"        },
      { label: isAr ? "الدمام"                : "Dammam",             href: "/virtual-tours/dammam"        },
      { label: isAr ? "الخبر"                 : "Khobar",             href: "/virtual-tours/khobar"        },
      { label: isAr ? "تبوك"                  : "Tabuk",              href: "/virtual-tours/tabuk"         },
      { label: isAr ? "العُلا"                : "AlUla",              href: "/virtual-tours/alula"         },
      { label: isAr ? "نيوم"                  : "NEOM",               href: "/virtual-tours/neom"          },
      { label: isAr ? "مكة المكرمة"           : "Mecca",              href: "/virtual-tours/mecca"         },
      { label: isAr ? "المدينة المنورة"       : "Medina",             href: "/virtual-tours/medina"        },
      { label: isAr ? "تطوير المواقع"         : "Website Development",href: "",                            type: "heading" as const },
      { label: isAr ? "الرياض"                : "Riyadh",             href: "/website-development/riyadh"  },
      { label: isAr ? "جدة"                   : "Jeddah",             href: "/website-development/jeddah"  },
      { label: isAr ? "الدمام"                : "Dammam",             href: "/website-development/dammam"  },
      { label: isAr ? "الخبر"                 : "Khobar",             href: "/website-development/khobar"  },
      { label: isAr ? "نيوم"                  : "NEOM",               href: "/website-development/neom"    },
      { label: isAr ? "حلول الذكاء الاصطناعي": "AI Solutions",        href: "",                            type: "heading" as const },
      { label: isAr ? "الرياض"                : "Riyadh",             href: "/ai-solutions/riyadh"         },
      { label: isAr ? "جدة"                   : "Jeddah",             href: "/ai-solutions/jeddah"         },
      { label: isAr ? "الدمام"                : "Dammam",             href: "/ai-solutions/dammam"         },
      { label: isAr ? "الخبر"                 : "Khobar",             href: "/ai-solutions/khobar"         },
      { label: isAr ? "نيوم"                  : "NEOM",               href: "/ai-solutions/neom"           },
      { label: isAr ? "ERP وSAP"              : "ERP & SAP",          href: "",                            type: "heading" as const },
      { label: isAr ? "الرياض"                : "Riyadh",             href: "/erp-sap/riyadh"              },
      { label: isAr ? "جدة"                   : "Jeddah",             href: "/erp-sap/jeddah"              },
      { label: isAr ? "الدمام"                : "Dammam",             href: "/erp-sap/dammam"              },
      { label: isAr ? "الخبر"                 : "Khobar",             href: "/erp-sap/khobar"              },
    ],
  };

  const tourCategories = [
    {
      key: "luxury-private",
      label: isAr ? "الفئة الفاخرة الخاصة" : "Private Luxury",
      href: "/virtual-tours/luxury-private",
      items: [
        { label: isAr ? "القصور"          : "Palaces",         href: "/virtual-tours/luxury-private/palaces" },
        { label: isAr ? "الطائرات"        : "Aircrafts",       href: "/virtual-tours/luxury-private/aircrafts" },
        { label: isAr ? "اليخوت"          : "Yachts",          href: "/virtual-tours/luxury-private/yachts" },
        { label: isAr ? "المجمعات الخاصة" : "Private Estates", href: "/virtual-tours/luxury-private/private-estate" },
        { label: isAr ? "المعارض"         : "Showrooms",       href: "/virtual-tours/luxury-private/showrooms" },
      ],
    },
    {
      key: "hospitality",
      label: isAr ? "الضيافة" : "Hospitality",
      href: "/virtual-tours/hospitality",
      items: [
        { label: isAr ? "الفنادق"         : "Hotels",        href: "/virtual-tours/hospitality/hotels" },
        { label: isAr ? "المنتجعات"       : "Resorts",       href: "/virtual-tours/hospitality/resorts" },
        { label: isAr ? "المطاعم"         : "Restaurants",   href: "/virtual-tours/hospitality/restaurants" },
        { label: isAr ? "السبا والعافية"  : "Spa & Wellness", href: "/virtual-tours/hospitality/spa-wellness" },
      ],
    },
    {
      key: "real-estate",
      label: isAr ? "العقارات" : "Real Estate",
      href: "/virtual-tours/real-estate",
      items: [
        { label: isAr ? "الفيلات والشقق"       : "Villas & Apartments", href: "/virtual-tours/real-estate/villa-apartment" },
        { label: isAr ? "مساحات العمل المشترك" : "Co-Working",          href: "/virtual-tours/real-estate/coworking" },
        { label: isAr ? "المنشآت الصناعية"     : "Industrial",          href: "/virtual-tours/real-estate/industrial" },
        { label: isAr ? "مواقع البناء"         : "Construction",        href: "/virtual-tours/real-estate/construction" },
        { label: isAr ? "المجمعات السكنية"     : "Compounds",           href: "/virtual-tours/real-estate/compound" },
      ],
    },
    {
      key: "others",
      label: isAr ? "أخرى" : "Others",
      href: "/virtual-tours/others",
      items: [
        { label: isAr ? "المدارس والجامعات" : "Schools & Universities", href: "/virtual-tours/others/schools" },
        { label: isAr ? "المباني الحكومية"  : "Government Buildings",   href: "/virtual-tours/others/government" },
        { label: isAr ? "قاعات الفعاليات"  : "Event Spaces",           href: "/virtual-tours/others/event-halls" },
        { label: isAr ? "المراكز الطبية"   : "Medical Centers",        href: "/virtual-tours/others/medical" },
        { label: isAr ? "المتاحف"          : "Museums",                href: "/virtual-tours/others/museums" },
      ],
    },
  ];

  const webCategories = [
    {
      key: "website-development",
      label: isAr ? "تطوير الويب والتطبيقات" : "Website Development",
      href: "/development/website",
      items: [
        { label: isAr ? "العقارات"               : "Real Estate",           href: "/development/website/real-estate" },
        { label: isAr ? "الضيافة"                : "Hospitality",           href: "/development/website/hospitality" },
        { label: isAr ? "الرعاية الصحية"        : "Healthcare",            href: "/development/website/healthcare"  },
        { label: isAr ? "التجارة الإلكترونية"   : "E-Commerce",            href: "/development/website/commerce"    },
        { label: isAr ? "المؤسسات"              : "Enterprise",            href: "/development/website/corporate"   },
        { label: isAr ? "الطيران الخاص واليخوت" : "Private Jets & Yachts", href: "/development/website/private-jet"      },
      ],
    },
    {
      key: "ai-solutions",
      label: isAr ? "تطبيقات الذكاء الاصطناعي" : "AI Applications",
      href: "/development/ai-solutions",
      items: [
        { label: isAr ? "روبوتات المحادثة"           : "AI Chatbots",        href: "/development/ai-solutions/ai-chatbots"       },
        { label: isAr ? "أتمتة سير العمل"            : "AI Automation",      href: "/development/ai-solutions/ai-automation"     },
        { label: isAr ? "التحليلات بالذكاء الاصطناعي": "AI Analytics",       href: "/development/ai-solutions/ai-analytics"      },
        { label: isAr ? "أنظمة ذكاء اصطناعي مخصصة"  : "Custom AI Systems",  href: "/development/ai-solutions/custom-ai-systems"  },
      ],
    },
    {
      key: "erp-sap",
      label: isAr ? "حلول ERP / SAP" : "ERP / SAP Solutions",
      href: "/development/erp-sap",
      items: [
        { label: isAr ? "تنفيذ ERP"            : "ERP Implementation",   href: "/development/erp-sap" },
        { label: isAr ? "استشارات SAP"          : "SAP Consulting",       href: "/development/erp-sap" },
        { label: isAr ? "تكامل الأنظمة"         : "System Integration",   href: "/development/erp-sap" },
        { label: isAr ? "ذكاء الأعمال"          : "Business Intelligence", href: "/development/erp-sap" },
      ],
    },
  ];

  const webLinks = webCategories.map(c => ({ label: c.label, href: c.href }));

  const industryLinks = [
    { label: t.nav.indHospitality, href: "/virtual-tours" },
    { label: t.nav.indRealEstate,  href: "/virtual-tours" },
    { label: t.nav.indHealthcare,  href: "/development" },
    { label: t.nav.indEducation,   href: "/virtual-tours" },
    { label: t.nav.indRetail,      href: "/virtual-tours" },
    { label: t.nav.indGovernment,  href: "/virtual-tours" },
    { label: t.nav.indAutomotive,  href: "/virtual-tours" },
    { label: t.nav.indConstruction,href: "/development" },
  ];

  const subItems = sub === "others" ? othersLinks : [];
  const subLabel = sub === "tours" ? (isAr ? "جولات 360 الافتراضية" : "360 Virtual Tours") : sub === "web" ? t.nav.webDev : (isAr ? "أخرى" : "Others");
  const caseStudiesCategory = {
    key: "case-studies",
    label: isAr ? "دراسات الحالة" : "Case Studies",
    items: [
      { label: isAr ? "جميع دراسات الحالة"  : "All Case Studies",     href: "/case-studies" },
      { label: isAr ? "فندق كريم الرياض"    : "Karim Hotel Riyadh",   href: "/case-studies/karim-hotel-riyadh-virtual-tour" },
      { label: "EKAL",                                                   href: "/case-studies/ekal-website-development" },
      { label: isAr ? "فيلا فيروز"          : "Villa Fayrouz",         href: "/case-studies/villa-fayrouz-website-development" },
      { label: "Balcona99",                                              href: "/case-studies/balcona99-website-development" },
      { label: isAr ? "جوري من بيروت"       : "Joori Min Beirut",      href: "/case-studies/joori-min-beirut-website-development" },
    ],
  };

  const allCategories = [...tourCategories, ...webCategories, locationsCategory, caseStudiesCategory];
  const activeCategory = subSub ? allCategories.find(c => c.key === subSub) : null;
  const subSubItems = activeCategory?.items ?? [];
  const subSubLabel = activeCategory?.label ?? "";

  return (
    <>
      {/* ── Top bar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden && !menuOpen && !pinNav ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: SOFT }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isHeroOnly ? "hidden sm:block border-transparent" : scrolled || menuOpen ? "border-white/8" : "border-white/4"
        }`}
        style={{
          background: isHeroOnly
            ? "transparent"
            : scrolled || menuOpen
              ? "rgba(5,5,5,0.72)"
              : "rgba(5,5,5,0.40)",
          backdropFilter: isHeroOnly ? "none" : "blur(20px) saturate(160%)",
          WebkitBackdropFilter: isHeroOnly ? "none" : "blur(20px) saturate(160%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className={`flex items-center justify-between ${isHeroOnly ? "h-28" : "h-16"}`} dir="ltr">

            {/* MENU button — hidden on hero-only screens */}
            {!isHeroOnly && (
              <motion.button
                onClick={() => setMenuOpen(true)}
                className="group flex items-center cursor-pointer"
                whileHover="hover" whileTap={{ scale: 0.96 }}
                aria-label="Open menu"
              >
                <HamburgerIcon className="w-6 h-6 text-white/75 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span className="hidden sm:inline ms-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/75 group-hover:text-white transition-colors">{isAr ? "القائمة" : "Menu"}</span>
              </motion.button>
            )}
            {isHeroOnly && <div className="w-16" />}

            {/* Logo — always centred (absolute on all breakpoints) */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.div whileHover={{ scale: 1.04 }} className="flex items-center cursor-pointer">
                {/* Desktop logo */}
                <div className="hidden sm:block" style={{ height: 68, width: 170, flexShrink: 0 }}>
                  <Image
                    src="/x360/x360-logo.png"
                    alt="X360"
                    width={170}
                    height={68}
                    style={{ height: 68, width: 170, objectFit: "contain" }}
                    priority
                  />
                </div>
                {/* Mobile logo — prominent, centred between hamburger and lang switcher */}
                <div className="sm:hidden" style={{ height: 56, width: 142, flexShrink: 0 }}>
                  <Image
                    src="/x360/x360-logo.png"
                    alt="X360"
                    width={142}
                    height={56}
                    style={{ height: 56, width: 142, objectFit: "contain" }}
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Language switcher — hidden on hero-only screens */}
            {!isHeroOnly ? (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {(["en", "ar"] as const).map((l, i) => (
                  <div key={l} className="flex items-center gap-1.5 sm:gap-2.5">
                    {i > 0 && <span className="text-white/20 text-[10px] sm:text-xs select-none">|</span>}
                    <button
                      onClick={() => setLang(l)}
                      className={`text-[10px] sm:text-[13px] font-semibold tracking-[0.10em] sm:tracking-[0.14em] uppercase transition-colors duration-200 ${
                        lang === l ? "text-white" : "text-white/55 hover:text-white/80"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-16" />
            )}

          </div>
        </div>
      </motion.nav>

      {/* ── Menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* ══ MOBILE MENU (< sm) — full-screen accordion ══ */}
            <motion.div
              key="mobile-menu"
              className="sm:hidden fixed inset-0 z-[100] flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{ background: "rgba(5,5,5,0.98)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 flex-shrink-0 border-b border-white/6">
                <motion.button
                  onClick={close}
                  className="flex items-center gap-2.5 group cursor-pointer"
                  whileTap={{ scale: 0.94 }}
                >
                  <span className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <span className="absolute block w-4 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full rotate-45" />
                    <span className="absolute block w-4 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full -rotate-45" />
                  </span>
                  <span
                    className="text-[11px] font-semibold uppercase text-white/35 group-hover:text-white transition-colors"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {t.nav.close}
                  </span>
                </motion.button>
                <div className="flex items-center gap-3">
                  {(["en", "ar"] as const).map((l, i) => (
                    <div key={l} className="flex items-center gap-3">
                      {i > 0 && <span className="text-white/18 text-xs">|</span>}
                      <button
                        onClick={() => setLang(l)}
                        className={`text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                          lang === l ? "text-white" : "text-white/28 hover:text-white/55"
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav list */}
              <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col justify-center">
                {navLinks.map((link, i) => {
                  const isActive   = pathname === link.href;
                  const isExpanded = link.sub === sub;
                  const isTours    = link.sub === "tours";
                  const isWeb      = link.sub === "web";
                  const subList    = link.sub === "others" ? othersLinks : [];

                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.38, ease: SOFT }}
                    >
                      <div className="border-b border-white/6">
                        {link.sub ? (
                          <button
                            className="w-full flex items-center justify-center gap-3 py-4 cursor-pointer"
                            onClick={() => { setSub(isExpanded ? null : link.sub!); setSubSub(null); }}
                          >
                            <span
                              className="text-[14px] font-light uppercase text-center transition-colors duration-150"
                              style={{ letterSpacing: "0.16em", color: isExpanded ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.72)" }}
                            >
                              {link.label}
                            </span>
                            <motion.span
                              className="text-[14px] font-light flex-shrink-0"
                              animate={{ rotate: isExpanded ? 90 : 0, color: isExpanded ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)" }}
                              transition={{ duration: 0.22 }}
                            >
                              ›
                            </motion.span>
                          </button>
                        ) : (
                          <Link href={link.href} onClick={close}>
                            <div className="flex items-center justify-center py-4 cursor-pointer">
                              <span
                                className="text-[14px] font-light uppercase text-center transition-colors duration-150"
                                style={{ letterSpacing: "0.16em", color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.72)" }}
                              >
                                {link.label}
                              </span>
                            </div>
                          </Link>
                        )}

                        <AnimatePresence initial={false}>
                          {isExpanded && (isTours || isWeb || subList.length > 0) && (
                            <motion.div
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: SOFT }}
                              style={{ overflow: "hidden" }}
                            >
                              {(isTours || isWeb) ? (() => {
                                const cats = isTours ? tourCategories : webCategories;
                                return (
                                  <div className="pb-3 pt-1 flex flex-col gap-0">
                                    {/* Home link — goes to each section's own landing page */}
                                    <Link href={isTours ? "/virtual-tours" : "/development"} onClick={close}>
                                      <div className="flex items-center gap-3 py-2.5 px-3 cursor-pointer">
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                        <span
                                          className="text-[13px] font-normal uppercase transition-colors duration-150"
                                          style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,0.72)" }}
                                        >
                                          {isAr ? "الرئيسية" : "Home"}
                                        </span>
                                      </div>
                                    </Link>
                                    {cats.map((cat) => {
                                      const isCatOpen = subSub === cat.key;
                                      return (
                                        <div key={cat.key}>
                                          <button
                                            className="w-full flex items-center justify-between py-2.5 px-3 cursor-pointer"
                                            onClick={() => setSubSub(isCatOpen ? null : cat.key)}
                                          >
                                            <div className="flex items-center gap-3">
                                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                              <span
                                                className="text-[13px] font-normal uppercase transition-colors duration-150"
                                                style={{ letterSpacing: "0.14em", color: isCatOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)" }}
                                              >
                                                {cat.label}
                                              </span>
                                            </div>
                                            <motion.span
                                              className="text-[16px] font-light flex-shrink-0"
                                              animate={{ rotate: isCatOpen ? 90 : 0, color: isCatOpen ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              ›
                                            </motion.span>
                                          </button>
                                          <AnimatePresence initial={false}>
                                            {isCatOpen && (
                                              <motion.div
                                                key="cat-items"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: SOFT }}
                                                style={{ overflow: "hidden" }}
                                              >
                                                <div className="pb-2 ps-6 flex flex-col gap-0">
                                                  {cat.items.map((item) => (
                                                    <Link key={item.label} href={item.href} onClick={close}>
                                                      <div
                                                        className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer group"
                                                        style={{ background: "rgba(255,255,255,0.00)" }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                                      >
                                                        <span className="w-px h-3 flex-shrink-0" style={{ background: "rgba(255,255,255,0.14)" }} />
                                                        <span
                                                          className="text-[11px] font-normal uppercase text-white/55 group-hover:text-white/85 transition-colors duration-150"
                                                          style={{ letterSpacing: "0.12em" }}
                                                        >
                                                          {item.label}
                                                        </span>
                                                      </div>
                                                    </Link>
                                                  ))}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })() : (
                                <div className="pb-3 pt-1 flex flex-col gap-0">
                                  {/* Flat links (About, Privacy, etc.) */}
                                  {subList.map((item, j) => (
                                    <motion.div
                                      key={item.href + j}
                                      initial={{ opacity: 0, x: isAr ? 10 : -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.04, duration: 0.22, ease: SOFT }}
                                    >
                                      <Link href={item.href} onClick={close}>
                                        <div
                                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer group"
                                          style={{ background: "rgba(255,255,255,0.00)" }}
                                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                        >
                                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                          <span
                                            className="text-[13px] font-normal uppercase text-white/42 group-hover:text-white/80 transition-colors duration-150"
                                            style={{ letterSpacing: "0.14em" }}
                                          >
                                            {item.label}
                                          </span>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                  {/* Case Studies expandable */}
                                  <div>
                                    <button
                                      className="w-full flex items-center justify-between py-2.5 px-3 cursor-pointer"
                                      onClick={() => setSubSub(subSub === "case-studies" ? null : "case-studies")}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                        <span
                                          className="text-[13px] font-normal uppercase transition-colors duration-150"
                                          style={{ letterSpacing: "0.14em", color: subSub === "case-studies" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)" }}
                                        >
                                          {isAr ? "دراسات الحالة" : "Case Studies"}
                                        </span>
                                      </div>
                                      <motion.span
                                        className="text-[16px] font-light flex-shrink-0"
                                        animate={{ rotate: subSub === "case-studies" ? 90 : 0, color: subSub === "case-studies" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        ›
                                      </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                      {subSub === "case-studies" && (
                                        <motion.div
                                          key="cs-items"
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.25, ease: SOFT }}
                                          style={{ overflow: "hidden" }}
                                        >
                                          <div className="pb-2 ps-6 flex flex-col gap-0">
                                            {caseStudiesCategory.items.map((item) => (
                                              <Link key={item.href} href={item.href} onClick={close}>
                                                <div
                                                  className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer group"
                                                  style={{ background: "rgba(255,255,255,0.00)" }}
                                                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                                >
                                                  <span className="w-px h-3 flex-shrink-0" style={{ background: "rgba(255,255,255,0.14)" }} />
                                                  <span
                                                    className="text-[11px] font-normal uppercase text-white/55 group-hover:text-white/85 transition-colors duration-150"
                                                    style={{ letterSpacing: "0.12em" }}
                                                  >
                                                    {item.label}
                                                  </span>
                                                </div>
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  {/* Locations expandable — last */}
                                  <div>
                                    <button
                                      className="w-full flex items-center justify-between py-2.5 px-3 cursor-pointer"
                                      onClick={() => setSubSub(subSub === "locations" ? null : "locations")}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.22)" }} />
                                        <span
                                          className="text-[13px] font-normal uppercase transition-colors duration-150"
                                          style={{ letterSpacing: "0.14em", color: subSub === "locations" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)" }}
                                        >
                                          {isAr ? "المواقع" : "Locations"}
                                        </span>
                                      </div>
                                      <motion.span
                                        className="text-[16px] font-light flex-shrink-0"
                                        animate={{ rotate: subSub === "locations" ? 90 : 0, color: subSub === "locations" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        ›
                                      </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                      {subSub === "locations" && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.25, ease: SOFT }}
                                          style={{ overflow: "hidden" }}
                                        >
                                          <div className="pb-2 ps-6 flex flex-col gap-0" style={{ maxHeight: "220px", overflowY: "auto" }}>
                                            {locationsCategory.items.map((item, idx) =>
                                              item.type === "heading" ? (
                                                <div key={idx} className="pt-3 pb-0.5 px-3">
                                                  <span className="text-[9px] font-semibold uppercase" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}>
                                                    {item.label}
                                                  </span>
                                                </div>
                                              ) : (
                                                <Link key={item.href} href={item.href} onClick={close}>
                                                  <div
                                                    className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer group"
                                                    style={{ background: "rgba(255,255,255,0.00)" }}
                                                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                                                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.00)")}
                                                  >
                                                    <span className="w-px h-3 flex-shrink-0" style={{ background: "rgba(255,255,255,0.14)" }} />
                                                    <span
                                                      className="text-[11px] font-normal uppercase text-white/55 group-hover:text-white/85 transition-colors duration-150"
                                                      style={{ letterSpacing: "0.12em" }}
                                                    >
                                                      {item.label}
                                                    </span>
                                                  </div>
                                                </Link>
                                              )
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="flex-shrink-0 border-t border-white/5 px-6 py-4"
              >
                <p className="text-[10px] font-normal" style={{ color: "rgba(255,255,255,0.30)", letterSpacing: "0.1em" }}>
                  © {new Date().getFullYear()} X360. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
                </p>
              </motion.div>
            </motion.div>

            {/* ══ DESKTOP MENU (sm+) — side-panel ══ */}
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
                style={{ background: "rgba(0,0,0,0.65)" }}
                onClick={close}
              />

              <div className="absolute top-0 bottom-0 left-0 flex flex-row h-full">
                {/* Main panel */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.65, ease: SLIDE }}
                  className="relative flex flex-col h-full border-r border-white/6"
                  style={{ background: "rgba(5,5,5,0.98)", willChange: "transform", width: "clamp(260px, 42vw, 440px)" }}
                >
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-5 h-16 flex-shrink-0 border-b border-white/6">
                    <motion.button
                      onClick={close}
                      className="flex items-center gap-2 group cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
                        <span className="absolute block w-3.5 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full rotate-45" />
                        <span className="absolute block w-3.5 h-[1.5px] bg-white/45 group-hover:bg-white transition-colors rounded-full -rotate-45" />
                      </span>
                      <span
                        className="text-[10px] font-semibold uppercase text-white/55 group-hover:text-white transition-colors"
                        style={{ letterSpacing: "0.22em" }}
                      >
                        {t.nav.close}
                      </span>
                    </motion.button>
                    <div className="flex items-center gap-3">
                      {(["en", "ar"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                            lang === l ? "text-white/65" : "text-white/20 hover:text-white/42"
                          }`}
                        >
                          {l === "en" ? "EN" : "AR"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 flex flex-col justify-center px-5 py-6 overflow-y-auto">
                    {navLinks.map((link, i) => {
                      const isActive   = pathname === link.href;
                      const isExpanded = link.sub === sub;
                      const delay      = 0.18 + i * 0.065;

                      return (
                        <div key={link.key} className="overflow-hidden py-2.5">
                          {link.sub ? (
                            <button
                              onClick={() => { setSub(isExpanded ? null : link.sub!); setSubSub(null); }}
                              className="w-full flex items-center justify-between group cursor-pointer"
                            >
                              <motion.div
                                className="flex items-center justify-between w-full"
                                initial={{ y: "110%" }} animate={{ y: 0 }}
                                transition={{ delay, duration: 0.62, ease: SLIDE }}
                              >
                                <motion.span
                                  className="text-[17px] font-light uppercase"
                                  style={{ letterSpacing: "0.16em", color: isExpanded ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)" }}
                                  whileHover={{ color: "rgba(255,255,255,1)" }}
                                  transition={{ duration: 0.18 }}
                                >
                                  {link.label}
                                </motion.span>
                                <motion.span
                                  className="text-[14px] font-light flex-shrink-0 ml-2"
                                  style={{ color: "rgba(255,255,255,0.22)" }}
                                  animate={{ rotate: isExpanded ? 90 : 0, color: isExpanded ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                  transition={{ duration: 0.25 }}
                                >
                                  ›
                                </motion.span>
                              </motion.div>
                            </button>
                          ) : (
                            <Link href={link.href} onClick={close} className="block">
                              <div className="w-full group cursor-pointer">
                                <motion.span
                                  className="block text-[17px] font-light uppercase"
                                  style={{ letterSpacing: "0.16em", color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)" }}
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
                    className="flex-shrink-0 border-t border-white/5 px-5 py-4"
                  >
                    <p className="text-[10px] font-normal" style={{ color: "rgba(255,255,255,0.30)", letterSpacing: "0.1em" }}>
                      © {new Date().getFullYear()} X360. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Sub-panel */}
                <AnimatePresence>
                  {sub !== null && (
                    <motion.div
                      key="sub-panel"
                      initial={{ x: isAr ? "60px" : "-60px", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: isAr ? "30px" : "-30px", opacity: 0 }}
                      transition={{ duration: 0.42, ease: SOFT }}
                      className="relative flex flex-col h-full border-r border-white/5 overflow-hidden"
                      style={{ background: "rgba(10,10,10,0.97)", willChange: "transform", width: "clamp(200px, 32vw, 340px)" }}
                    >
                      {/* Static gradient edge line */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[1px]"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)" }}
                      />
                      {/* Moving scan light */}
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
                          <div className="flex items-center px-4 h-16 flex-shrink-0 border-b border-white/5">
                            <span
                              className="text-[9px] font-semibold uppercase"
                              style={{ color: "rgba(255,255,255,0.48)", letterSpacing: "0.28em" }}
                            >
                              {subLabel}
                            </span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center px-4 py-6 overflow-y-auto">
                            {(sub === "tours" || sub === "web") ? (() => {
                              const cats = sub === "tours" ? tourCategories : webCategories;
                              return cats.map((cat, j) => {
                                const isCatActive = subSub === cat.key;
                                return (
                                  <motion.div
                                    key={cat.key}
                                    initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 + j * 0.05, duration: 0.3, ease: SOFT }}
                                  >
                                    <motion.button
                                      className="w-full flex items-center justify-between py-2.5 cursor-pointer"
                                      onClick={() => setSubSub(isCatActive ? null : cat.key)}
                                      whileHover="hov"
                                    >
                                      <motion.span
                                        className="text-[15px] font-light uppercase"
                                        style={{ color: isCatActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)", letterSpacing: "0.16em" }}
                                        variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                        transition={{ duration: 0.14 }}
                                      >
                                        {cat.label}
                                      </motion.span>
                                      <motion.span
                                        className="text-[14px] font-light flex-shrink-0 ms-2"
                                        animate={{ rotate: isCatActive ? 90 : 0, color: isCatActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                        transition={{ duration: 0.22 }}
                                      >
                                        ›
                                      </motion.span>
                                    </motion.button>
                                  </motion.div>
                                );
                              });
                            })() : (
                              <>
                                {/* Flat links */}
                                {subItems.map((item, j) => (
                              <motion.div
                                key={item.href + j}
                                initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.05 + j * 0.05, duration: 0.3, ease: SOFT }}
                              >
                                <Link href={item.href} onClick={close}>
                                  <motion.div className="py-2.5 cursor-pointer" whileHover="hov">
                                    <motion.span
                                      className="text-[15px] font-light uppercase"
                                      style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.16em" }}
                                      variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                      transition={{ duration: 0.14 }}
                                    >
                                      {item.label}
                                    </motion.span>
                                  </motion.div>
                                </Link>
                              </motion.div>
                            ))}
                                {/* Case Studies expandable category */}
                                <motion.div
                                  initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.06, duration: 0.3, ease: SOFT }}
                                >
                                  <motion.button
                                    className="w-full flex items-center justify-between py-2.5 cursor-pointer"
                                    onClick={() => setSubSub(subSub === "case-studies" ? null : "case-studies")}
                                    whileHover="hov"
                                  >
                                    <motion.span
                                      className="text-[15px] font-light uppercase"
                                      style={{ color: subSub === "case-studies" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)", letterSpacing: "0.16em" }}
                                      variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                      transition={{ duration: 0.14 }}
                                    >
                                      {isAr ? "دراسات الحالة" : "Case Studies"}
                                    </motion.span>
                                    <motion.span
                                      className="text-[14px] font-light flex-shrink-0 ms-2"
                                      animate={{ rotate: subSub === "case-studies" ? 90 : 0, color: subSub === "case-studies" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                      transition={{ duration: 0.22 }}
                                    >
                                      ›
                                    </motion.span>
                                  </motion.button>
                                </motion.div>
                                {/* Locations expandable category — last */}
                                <motion.div
                                  initial={{ x: isAr ? 20 : -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.02, duration: 0.3, ease: SOFT }}
                                >
                                  <motion.button
                                    className="w-full flex items-center justify-between py-2.5 cursor-pointer"
                                    onClick={() => setSubSub(subSub === "locations" ? null : "locations")}
                                    whileHover="hov"
                                  >
                                    <motion.span
                                      className="text-[15px] font-light uppercase"
                                      style={{ color: subSub === "locations" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)", letterSpacing: "0.16em" }}
                                      variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                      transition={{ duration: 0.14 }}
                                    >
                                      {isAr ? "المواقع" : "Locations"}
                                    </motion.span>
                                    <motion.span
                                      className="text-[14px] font-light flex-shrink-0 ms-2"
                                      animate={{ rotate: subSub === "locations" ? 90 : 0, color: subSub === "locations" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}
                                      transition={{ duration: 0.22 }}
                                    >
                                      ›
                                    </motion.span>
                                  </motion.button>
                                </motion.div>
                          </>
                          )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub-sub panel — tour / web / locations category items */}
                <AnimatePresence>
                  {(sub === "tours" || sub === "web" || (sub === "others" && (subSub === "locations" || subSub === "case-studies"))) && subSub !== null && (
                    <motion.div
                      key="subsub-panel"
                      initial={{ x: isAr ? "60px" : "-60px", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: isAr ? "30px" : "-30px", opacity: 0 }}
                      transition={{ duration: 0.38, ease: SOFT }}
                      className="relative flex flex-col h-full border-r border-white/5 overflow-hidden"
                      style={{ background: "rgba(12,12,12,0.97)", willChange: "transform", width: "clamp(160px, 24vw, 260px)" }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[1px]"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }}
                      />
                      <div className="flex items-center px-4 h-16 flex-shrink-0 border-b border-white/5">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={subSub + "-label"}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-[9px] font-semibold uppercase"
                            style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.28em" }}
                          >
                            {subSubLabel}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <div className={`flex-1 flex flex-col ${subSub === "locations" ? "justify-start" : "justify-center"} px-4 py-6 overflow-y-auto`}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={subSub}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            {subSubItems.map((item, j) =>
                              "type" in item && item.type === "heading" ? (
                                <div key={j} className="pt-4 pb-1">
                                  <span
                                    className="text-[9px] font-semibold uppercase"
                                    style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.24em" }}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                              ) : (
                                <motion.div
                                  key={item.href}
                                  initial={{ x: isAr ? 16 : -16, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.04 + j * 0.05, duration: 0.28, ease: SOFT }}
                                >
                                  <Link href={item.href} onClick={close}>
                                    <motion.div className="py-2.5 cursor-pointer" whileHover="hov">
                                      <motion.span
                                        className="text-[13px] font-light uppercase"
                                        style={{ color: "rgba(255,255,255,0.60)", letterSpacing: "0.16em" }}
                                        variants={{ hov: { color: "rgba(255,255,255,1)" } }}
                                        transition={{ duration: 0.14 }}
                                      >
                                        {item.label}
                                      </motion.span>
                                    </motion.div>
                                  </Link>
                                </motion.div>
                              )
                            )}
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
