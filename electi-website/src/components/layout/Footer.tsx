import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

function ScanRule() {
  return (
    <div className="relative h-px w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="absolute inset-y-0 w-48"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)" }}
        animate={{ x: ["-100%", "calc(100vw + 100%)"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />
    </div>
  );
}

export default function Footer() {
  const { t, isAr } = useLang();

  const cols = [
    {
      heading: t("footerProduct"),
      links: [
        { label: t("footerAgents"),      href: "/agents"        },
        { label: t("footerIndustries"), href: "/industries"   },
        { label: isAr ? "حالات الاستخدام" : "Case Studies",  href: "/case-studies"  },
        { label: t("footerHowItWorks"), href: "/how-it-works" },
        { label: t("footerPricing"),    href: "/pricing"      },
      ],
    },
    {
      heading: t("footerCompany"),
      links: [
        { label: t("footerAbout"),   href: "/about"   },
        { label: t("footerBlog"),    href: "/blog"    },
        { label: t("footerCareers"), href: "/careers" },
        { label: t("footerContact"), href: "/contact" },
      ],
    },
    {
      heading: t("footerLegal"),
      links: [
        { label: t("footerPrivacy"),  href: "/privacy" },
        { label: t("footerTerms"),    href: "/terms-of-use"  },
        { label: isAr ? "سياسة ملفات الارتباط" : "Cookie Policy",  href: "/cookie-policy" },
        { label: isAr ? "حماية البيانات" : "Data Protection",       href: "/data-protection" },
        { label: isAr ? "الأمان" : "Security",                      href: "/security" },
        { label: isAr ? "الامتثال" : "Compliance",                  href: "/compliance" },
        { label: t("navGoogle"),      href: "/google"  },
      ],
    },
    {
      heading: isAr ? "المنصة" : "Platform",
      links: [
        { label: isAr ? "الأسئلة الشائعة" : "FAQ",                 href: "/faq" },
        { label: isAr ? "اكتشاف الذكاء الاصطناعي" : "AI Discovery", href: "/ai-discovery" },
        { label: isAr ? "التقنية" : "Technology",                   href: "/technology" },
        { label: isAr ? "مركز الأبحاث" : "Research Center",         href: "/resources" },
        { label: isAr ? "سوق الوكلاء" : "Marketplace",              href: "/marketplace" },
        { label: isAr ? "ابنِ وكيلك" : "Build Your Agent",          href: "/build-your-agent" },
        { label: isAr ? "حاسبة العائد" : "ROI Calculator",          href: "/roi-calculator" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "#060606" }}>
      <ScanRule />

      {/* ══════════════════════════════════════════════
          MOBILE FOOTER  (hidden on sm+)
      ══════════════════════════════════════════════ */}
      <div className="block sm:hidden">

        {/* Logo + tagline + contact */}
        <div className="flex flex-col items-center text-center pt-10 pb-8 px-6 gap-3">
          <Link href="/">
            <div className="cursor-pointer" style={{ height: 52, width: 130 }}>
              <img
                src="/electi-logo-new.png"
                alt="Electi"
                style={{ height: 52, width: 130, objectFit: "contain" }}
              />
            </div>
          </Link>

          <p className="text-[11px] font-400 mt-2 leading-relaxed max-w-[260px]" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em" }}>
            {isAr ? (
              <>نبني مستقبل العمليات المدعومة بالذكاء الاصطناعي للمؤسسات الحديثة. راسلنا على{" "}
                <motion.a href="mailto:a@electi.sa" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>a@electi.sa</motion.a>
                {" "}أو تواصل معنا على{" "}
                <motion.a href="tel:+966502547274" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>+966 502547274</motion.a>
                ، طريق الخاتم الشمالي الفرعي، المصيف، الرياض، المملكة العربية السعودية.
              </>
            ) : (
              <>Building the future of AI-powered operations for modern businesses. You can mail us at{" "}
                <motion.a href="mailto:a@electi.sa" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>a@electi.sa</motion.a>
                {" "}or get in touch with us on{" "}
                <motion.a href="tel:+966502547274" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>+966 502547274</motion.a>
                , Northern Ring Br Rd, Almasiaf, Riyadh, Kingdom of Saudi Arabia.
              </>
            )}
          </p>
        </div>

        <ScanRule />

        {/* Nav: Product + Company in 2 columns */}
        <div className="grid grid-cols-2 gap-6 px-8 py-8">
          {cols.slice(0, 2).map(({ heading, links }) => (
            <div key={heading} className="flex flex-col items-center gap-3.5">
              <p
                className="text-[9px] font-600 uppercase mb-1"
                style={{ color: "rgba(255,255,255,0.36)", letterSpacing: "0.3em" }}
              >
                {heading}
              </p>
              {links.map(({ label, href }) => (
                <Link href={href} key={label}>
                  <motion.span
                    className="block text-[12px] font-400 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.52)", letterSpacing: "0.03em" }}
                    whileHover={{ color: "rgba(255,255,255,0.9)" }}
                    transition={{ duration: 0.16 }}
                  >
                    {label}
                  </motion.span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Legal links: Privacy · Terms · Google */}
        <div className="flex items-center justify-center gap-6 pb-8 flex-wrap px-6">
          {[
            { label: t("footerPrivacy"), href: "/privacy" },
            { label: t("footerTerms"),  href: "/terms-of-use"  },
            { label: t("navGoogle"),    href: "/google"  },
          ].map(({ label, href }) => (
            <Link href={href} key={label}>
              <motion.span
                className="text-[11px] font-400 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.36)", letterSpacing: "0.04em" }}
                whileHover={{ color: "rgba(255,255,255,0.8)" }}
                transition={{ duration: 0.16 }}
              >
                {label}
              </motion.span>
            </Link>
          ))}
        </div>

        <ScanRule />

        {/* Sign In / Up */}
        <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
          <motion.div
            className="flex items-center justify-center py-5 cursor-pointer"
            whileHover="hovered"
          >
            <motion.div
              className="flex items-center gap-2.5"
              variants={{ hovered: { x: 5 } }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="text-[11px] font-500 uppercase"
                style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.28em" }}
              >
                {t("navSignInUp")}
              </span>
              <motion.div
                style={{ color: "rgba(255,255,255,0.38)" }}
                variants={{ hovered: { color: "rgba(255,255,255,0.85)" } }}
              >
                <ArrowRight style={{ width: 13, height: 13 }} />
              </motion.div>
            </motion.div>
          </motion.div>
        </a>

        <ScanRule />

        {/* Compliance notice */}
        <p className="text-[9.5px] font-400 text-center leading-relaxed px-6 py-4" style={{ color: "rgba(255,255,255,0.2)" }}>
          {isAr
            ? "يستخدم ELECTI مصادقة OAuth آمنة ويمتثل لسياسة بيانات مستخدم خدمات Google API. يحتفظ المستخدمون بالتحكم الكامل في الحسابات والأذونات المتصلة."
            : "Electi uses secure OAuth authentication and complies with Google API Services User Data Policy. Users maintain full control over connected accounts and permissions."}
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 py-5 px-6 text-center">
          <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.07em" }}>
            {t("footerCopyright")}
          </p>
          <div className="flex items-center gap-2">
            <motion.span
              className="block rounded-full"
              style={{ width: 4, height: 4, background: "rgba(255,255,255,0.45)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[9px] font-500 uppercase" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.22em" }}>
              {t("allSystemsOp")}
            </span>
          </div>
          <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.07em" }}>
            {t("footerCraftedIn")}
          </p>
        </div>

      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP FOOTER  (hidden on mobile)
      ══════════════════════════════════════════════ */}
      <div className="hidden sm:block">
        <div className="relative max-w-7xl mx-auto px-10 lg:px-16">

          {/* Upper block: logo + columns */}
          <div className="flex items-start gap-12 pt-14 pb-12 justify-between">

            {/* Brand */}
            <div className="flex flex-col items-start text-start gap-5 flex-shrink-0" style={{ maxWidth: 300 }}>
              <Link href="/">
                <div className="cursor-pointer" style={{ height: 52, width: 130 }}>
                  <img
                    src="/electi-logo-new.png"
                    alt="Electi"
                    style={{ height: 52, width: 130, objectFit: "contain", objectPosition: "left center" }}
                  />
                </div>
              </Link>

              <p className="text-[11.5px] font-400 leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em", maxWidth: 290 }}>
                {isAr ? (
                  <>نبني مستقبل العمليات المدعومة بالذكاء الاصطناعي للمؤسسات الحديثة. راسلنا على{" "}
                    <motion.a href="mailto:a@electi.sa" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>a@electi.sa</motion.a>
                    {" "}أو تواصل معنا على{" "}
                    <motion.a href="tel:+966502547274" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>+966 502547274</motion.a>
                    ، طريق الخاتم الشمالي الفرعي، المصيف، الرياض، المملكة العربية السعودية.
                  </>
                ) : (
                  <>Building the future of AI-powered operations for modern businesses. You can mail us at{" "}
                    <motion.a href="mailto:a@electi.sa" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>a@electi.sa</motion.a>
                    {" "}or get in touch with us on{" "}
                    <motion.a href="tel:+966502547274" style={{ color: "rgba(255,255,255,0.62)" }} whileHover={{ color: "rgba(255,255,255,0.9)" }} transition={{ duration: 0.18 }}>+966 502547274</motion.a>
                    , Northern Ring Br Rd, Almasiaf, Riyadh, Kingdom of Saudi Arabia.
                  </>
                )}
              </p>
            </div>

            {/* Nav columns — pushed to the right */}
            <div className="flex gap-10 lg:gap-14 justify-end flex-wrap">
              {cols.map(({ heading, links }) => (
                <div key={heading} className="flex flex-col items-start">
                  <div className="mb-6 w-full">
                    <p
                      className="text-[9px] font-600 uppercase pb-3 text-start"
                      style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.32em" }}
                    >
                      {heading}
                    </p>
                    <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  </div>
                  <ul className="flex flex-col items-start gap-3.5">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href}>
                          <motion.span
                            className="text-xs font-400 cursor-pointer block"
                            style={{ color: "rgba(255,255,255,0.52)", letterSpacing: "0.04em" }}
                            whileHover={{ color: "rgba(255,255,255,0.9)" }}
                            transition={{ duration: 0.16 }}
                          >
                            {label}
                          </motion.span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ScanRule />

          {/* Sign in strip */}
          <a href="https://app.electi.sa/login" target="_self" rel="noreferrer">
            <motion.div
              className="flex items-center justify-center py-6 cursor-pointer"
              whileHover="hovered"
            >
              <motion.div
                className="flex items-center gap-3"
                variants={{ hovered: { x: 6 } }}
                transition={{ duration: 0.22 }}
              >
                <span
                  className="text-xs font-400 uppercase"
                  style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.28em" }}
                >
                  {t("navSignInUp")}
                </span>
                <motion.div
                  style={{ color: "rgba(255,255,255,0.42)" }}
                  variants={{ hovered: { color: "rgba(255,255,255,0.85)" } }}
                >
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </a>

          <ScanRule />

          {/* Compliance notice */}
          <p className="text-[9.5px] font-400 text-center leading-relaxed py-3" style={{ color: "rgba(255,255,255,0.2)" }}>
            {isAr
              ? "يستخدم ELECTI مصادقة OAuth آمنة ويمتثل لسياسة بيانات مستخدم خدمات Google API. يحتفظ المستخدمون بالتحكم الكامل في الحسابات والأذونات المتصلة."
              : "Electi uses secure OAuth authentication and complies with Google API Services User Data Policy. Users maintain full control over connected accounts and permissions."}
          </p>

          {/* Bottom bar */}
          <div className="flex flex-row items-center justify-between gap-3 py-6">
            <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em" }}>
              {t("footerCopyright")}
            </p>
            <div className="flex items-center gap-2">
              <motion.span
                className="block rounded-full"
                style={{ width: 4, height: 4, background: "rgba(255,255,255,0.45)" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[9px] font-500 uppercase" style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.24em" }}>
                {t("allSystemsOp")}
              </span>
            </div>
            <p className="text-[10px] font-400" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em" }}>
              {t("footerCraftedIn")}
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
