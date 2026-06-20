"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUp, MapPin, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const OFFICES = [
  {
    name: "Electi AI",
    addrLines: ["Al Tamam Road, Riyadh,"],
    country: "Kingdom of Saudi Arabia",
  },
  {
    name: "Zonoza Group",
    addrLines: ["Al Aziziyah, Othaim Street, Doha,"],
    country: "State of Qatar",
  },
  {
    name: "Stoned Tailor",
    addrLines: ["Jayanagar, Bangalore,"],
    country: "Republic of India",
  },
];

function ScanRule() {
  return (
    <div
      className="relative h-px w-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        className="absolute inset-y-0 w-48"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        }}
        animate={{ x: ["-100%", "calc(100vw + 100%)"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 4,
        }}
      />
    </div>
  );
}

const MOBILE_ACCORDIONS = [
  {
    id: "tours",
    label: "360 Virtual Tours",
    labelAr: "جولات 360 الافتراضية",
    links: [
      { label: "Home", labelAr: "الرئيسية", href: "/virtual-tours" },
      {
        label: "Private Luxury",
        labelAr: "الفئة الفاخرة الخاصة",
        href: "/virtual-tours/luxury-private",
      },
      {
        label: "Hospitality",
        labelAr: "الضيافة",
        href: "/virtual-tours/hospitality",
      },
      {
        label: "Real Estate",
        labelAr: "العقارات",
        href: "/virtual-tours/real-estate",
      },
      { label: "Others", labelAr: "أخرى", href: "/virtual-tours/others" },
    ],
  },
  {
    id: "dev",
    label: "Website Development",
    labelAr: "تطوير المواقع",
    links: [
      { label: "Home", labelAr: "الرئيسية", href: "/development" },
      {
        label: "Website & App Development",
        labelAr: "تطوير المواقع والتطبيقات",
        href: "/development/website",
      },
      {
        label: "AI Applications",
        labelAr: "تطبيقات الذكاء الاصطناعي",
        href: "/development/ai-solutions",
      },
      {
        label: "ERP / SAP Solutions",
        labelAr: "حلول ERP / SAP",
        href: "/development/erp-sap",
      },
    ],
  },
  {
    id: "others",
    label: "Others",
    labelAr: "أخرى",
    links: [
      { label: "About Us", labelAr: "من نحن", href: "/about" },
      { label: "Contact Us", labelAr: "اتصل بنا", href: "/contact" },
      { label: "FAQ", labelAr: "الأسئلة الشائعة", href: "/faq" },
      { label: "Blog", labelAr: "المدونة", href: "/blog" },
      { label: "Careers", labelAr: "الوظائف", href: "/careers" },
      {
        label: "Privacy Policy",
        labelAr: "سياسة الخصوصية",
        href: "/privacy-policy",
      },
      {
        label: "Terms of Use",
        labelAr: "شروط الاستخدام",
        href: "/terms-and-conditions",
      },
    ],
  },
];

export default function Footer() {
  const { t, isAr } = useLang();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const toggleAccordion = (id: string) =>
    setOpenAccordion((prev) => (prev === id ? null : id));

  const cols = [
    {
      heading: t.footer.toursHeader,
      links: [
        { label: isAr ? "الرئيسية" : "Home", href: "/virtual-tours" },
        {
          label: isAr ? "الفئة الفاخرة الخاصة" : "Private Luxury",
          href: "/virtual-tours/luxury-private",
        },
        {
          label: isAr ? "الضيافة" : "Hospitality",
          href: "/virtual-tours/hospitality",
        },
        {
          label: isAr ? "العقارات" : "Real Estate",
          href: "/virtual-tours/real-estate",
        },
        { label: isAr ? "أخرى" : "Others", href: "/virtual-tours/others" },
      ],
    },
    {
      heading: t.footer.webHeader,
      links: [
        { label: isAr ? "الرئيسية" : "Home", href: "/development" },
        {
          label: isAr
            ? "تطوير المواقع والتطبيقات"
            : "Website & App Development",
          href: "/development/website",
        },
        {
          label: isAr ? "تطبيقات الذكاء الاصطناعي" : "AI Applications",
          href: "/development/ai-solutions",
        },
        {
          label: isAr ? "حلول ERP / SAP" : "ERP / SAP Solutions",
          href: "/development/erp-sap",
        },
      ],
    },
    {
      heading: t.footer.company,
      links: [
        { label: isAr ? "من نحن" : "About Us", href: "/about" },
        { label: isAr ? "اتصل بنا" : "Contact Us", href: "/contact" },
        { label: isAr ? "الأسئلة الشائعة" : "FAQ", href: "/faq" },
        {
          label: isAr ? "سياسة الخصوصية" : "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: isAr ? "شروط الاستخدام" : "Terms of Use",
          href: "/terms-and-conditions",
        },
        { label: isAr ? "المدونة" : "Blogs", href: "/blog" },
        { label: isAr ? "الوظائف" : "Careers", href: "/careers" },
      ],
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#060606" }}
    >
      <ScanRule />

      {/* ══════════════════════════════════════════════
          MOBILE FOOTER  (hidden on sm+)
      ══════════════════════════════════════════════ */}
      <div className="block sm:hidden relative">
        {/* Back to top button */}
        <motion.button
          className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full"
          style={{
            width: 34,
            height: 34,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
          }}
          whileHover={{
            borderColor: "rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.10)",
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.18 }}
          onClick={() => {
            const container = document.getElementById("site-container");
            if (container) container.scrollTo({ top: 0, behavior: "smooth" });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={14} style={{ color: "rgba(255,255,255,0.70)" }} />
        </motion.button>

        {/* Logo + tagline + inline contact */}
        <div className="flex flex-col items-center text-center pt-10 pb-8 px-6 gap-3">
          <Link href="/">
            <div className="cursor-pointer" style={{ height: 48, width: 120 }}>
              <Image
                src="/x360/x360-logo.png"
                alt="X360"
                width={120}
                height={48}
                style={{ height: 48, width: 120, objectFit: "contain" }}
              />
            </div>
          </Link>
          <p
            className="text-[11px] font-400 mt-2 leading-relaxed max-w-[260px]"
            style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.04em" }}
          >
            {isAr ? (
              <>
                نبني تجارب رقمية غامرة وحلول ذكاء اصطناعي للشركات السعودية
                الحديثة. راسلنا على{" "}
                <motion.a
                  href={`mailto:${t.footer.email}`}
                  style={{ color: "rgba(255,255,255,0.90)" }}
                  whileHover={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.18 }}
                >
                  {t.footer.email}
                </motion.a>{" "}
                أو تواصل معنا على{" "}
                <motion.a
                  href={`tel:${t.footer.phone}`}
                  dir="ltr"
                  style={{ color: "rgba(255,255,255,0.90)", unicodeBidi: "embed" }}
                  whileHover={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.18 }}
                >
                  {t.footer.phone}
                </motion.a>
                ، {t.footer.address}
              </>
            ) : (
              <>
                Building immersive digital experiences and AI solutions for
                modern Saudi businesses. You can mail us at{" "}
                <motion.a
                  href={`mailto:${t.footer.email}`}
                  style={{ color: "rgba(255,255,255,0.90)" }}
                  whileHover={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.18 }}
                >
                  {t.footer.email}
                </motion.a>{" "}
                or get in touch with us on{" "}
                <motion.a
                  href={`tel:${t.footer.phone}`}
                  style={{ color: "rgba(255,255,255,0.90)" }}
                  whileHover={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.18 }}
                >
                  {t.footer.phone}
                </motion.a>
                ,{" "}
                <span style={{ whiteSpace: "nowrap" }}>{t.footer.address}</span>
              </>
            )}
          </p>
        </div>

        <ScanRule />

        {/* Get Started strip */}
        <Link href="/contact">
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
                style={{
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.28em",
                }}
              >
                {t.common.contactUs}
              </span>
              <motion.div
                style={{ color: "rgba(255,255,255,0.65)" }}
                variants={{ hovered: { color: "rgba(255,255,255,1)" } }}
              >
                <ArrowRight style={{ width: 13, height: 13 }} />
              </motion.div>
            </motion.div>
          </motion.div>
        </Link>

        <ScanRule />

        {/* Nav: accordion dropdowns */}
        <div className="flex flex-col px-0">
          {MOBILE_ACCORDIONS.map((section, idx) => {
            const isOpen = openAccordion === section.id;
            return (
              <div
                key={section.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4"
                  onClick={() => toggleAccordion(section.id)}
                >
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                  >
                    {isAr ? section.labelAr : section.label}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex flex-col gap-3 px-6 pb-5 pt-1">
                        {section.links.map(({ label, labelAr, href }) => (
                          <Link href={href} key={href}>
                            <motion.span
                              className="block text-[12px] cursor-pointer"
                              style={{
                                color: "rgba(255,255,255,0.65)",
                                letterSpacing: "0.03em",
                              }}
                              whileHover={{ color: "rgba(255,255,255,1)" }}
                              transition={{ duration: 0.15 }}
                            >
                              {isAr ? labelAr : label}
                            </motion.span>
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

        {/* Offices — below accordions */}
        <div
          className="flex flex-col gap-3 px-6 py-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {OFFICES.map((o) => (
            <div key={o.name} className="flex items-start gap-2">
              <MapPin
                className="w-3 h-3 mt-0.5 shrink-0"
                style={{ color: "rgba(255,255,255,0.45)" }}
              />
              <p
                className="text-[10px] leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.02em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.80)" }}>
                  {o.name}
                </span>
                {" — "}
                {o.addrLines.join(" ")}{" "}
                <span style={{ color: "rgba(255,255,255,0.72)" }}>
                  {o.country}
                </span>
              </p>
            </div>
          ))}
        </div>

        <ScanRule />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-1.5 py-5 px-4 text-center">
          <p
            className="text-[9.5px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}
          >
            © {new Date().getFullYear()}{" "}
            <Link href="/">
              <motion.span
                className="cursor-pointer"
                style={{ color: "rgba(255,255,255,0.72)" }}
                whileHover={{ color: "rgba(255,255,255,1)" }}
                transition={{ duration: 0.15 }}
              >
                X360
              </motion.span>
            </Link>
            {isAr ? ". جميع الحقوق محفوظة. " : ". All rights reserved. Our "}
            <Link href="/terms-and-conditions">
              <motion.span
                className="cursor-pointer"
                style={{ color: "rgba(255,255,255,0.60)" }}
                whileHover={{ color: "rgba(255,255,255,0.90)" }}
                transition={{ duration: 0.15 }}
              >
                {isAr ? "شروط الاستخدام" : "Terms & Conditions"}
              </motion.span>
            </Link>
            {isAr ? " و" : ", "}
            <Link href="/privacy-policy">
              <motion.span
                className="cursor-pointer"
                style={{ color: "rgba(255,255,255,0.60)" }}
                whileHover={{ color: "rgba(255,255,255,0.90)" }}
                transition={{ duration: 0.15 }}
              >
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </motion.span>
            </Link>
            {isAr ? "." : "."}
          </p>
          <p
            className="text-[9px]"
            style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em" }}
          >
            {isAr
              ? "صُمم في المملكة العربية السعودية"
              : "Crafted in Saudi Arabia"}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP FOOTER  (hidden on mobile)
      ══════════════════════════════════════════════ */}
      <div className="hidden sm:block">
        <div className="relative max-w-7xl mx-auto px-10 lg:px-16">
          {/* Back to top — desktop */}
          <motion.button
            className="absolute top-5 right-10 lg:right-16 z-10 flex items-center justify-center rounded-full"
            style={{
              width: 34,
              height: 34,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
            }}
            whileHover={{
              borderColor: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.10)",
            }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18 }}
            onClick={() => {
              const container = document.getElementById("site-container");
              if (container) container.scrollTo({ top: 0, behavior: "smooth" });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={14} style={{ color: "rgba(255,255,255,0.70)" }} />
          </motion.button>

          {/* Upper block: logo + columns */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 pt-14 pb-12">
            {/* Brand */}
            <div className="flex flex-col items-start text-start gap-5">
              <Link href="/">
                <div
                  className="cursor-pointer"
                  style={{ height: 48, width: 120 }}
                >
                  <Image
                    src="/x360/x360-logo.png"
                    alt="X360"
                    width={120}
                    height={48}
                    style={{
                      height: 48,
                      width: 120,
                      objectFit: "contain",
                      objectPosition: "left center",
                    }}
                  />
                </div>
              </Link>
              <p
                className="text-[11.5px] font-400 mt-1 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.68)",
                  letterSpacing: "0.04em",
                  maxWidth: 290,
                }}
              >
                {isAr ? (
                  <>
                    نبني تجارب رقمية غامرة وحلول ذكاء اصطناعي للشركات السعودية
                    الحديثة. راسلنا على{" "}
                    <motion.a
                      href={`mailto:${t.footer.email}`}
                      style={{ color: "rgba(255,255,255,0.90)" }}
                      whileHover={{ color: "rgba(255,255,255,1)" }}
                      transition={{ duration: 0.18 }}
                    >
                      {t.footer.email}
                    </motion.a>{" "}
                    أو تواصل معنا على{" "}
                    <motion.a
                      href={`tel:${t.footer.phone}`}
                      dir="ltr"
                      style={{ color: "rgba(255,255,255,0.90)", unicodeBidi: "embed" }}
                      whileHover={{ color: "rgba(255,255,255,1)" }}
                      transition={{ duration: 0.18 }}
                    >
                      {t.footer.phone}
                    </motion.a>
                    ، {t.footer.address}
                  </>
                ) : (
                  <>
                    Building immersive digital experiences and AI solutions for
                    modern Saudi businesses. You can mail us at{" "}
                    <motion.a
                      href={`mailto:${t.footer.email}`}
                      style={{ color: "rgba(255,255,255,0.90)" }}
                      whileHover={{ color: "rgba(255,255,255,1)" }}
                      transition={{ duration: 0.18 }}
                    >
                      {t.footer.email}
                    </motion.a>{" "}
                    or get in touch with us on{" "}
                    <motion.a
                      href={`tel:${t.footer.phone}`}
                      style={{ color: "rgba(255,255,255,0.90)" }}
                      whileHover={{ color: "rgba(255,255,255,1)" }}
                      transition={{ duration: 0.18 }}
                    >
                      {t.footer.phone}
                    </motion.a>
                    ,{" "}
                    <span style={{ whiteSpace: "nowrap" }}>
                      {t.footer.address}
                    </span>
                  </>
                )}
              </p>
              {/* Offices — desktop */}
              <div className="flex flex-col gap-2 mt-1">
                {OFFICES.map((o) => (
                  <div key={o.name} className="flex items-start gap-1.5">
                    <MapPin
                      className="w-3 h-3 mt-0.5 shrink-0"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    />
                    <p
                      className="text-[10.5px] leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.70)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.85)" }}>
                        {o.name}
                      </span>
                      {" — "}
                      {o.addrLines.map((line, i) => (
                        <span key={i}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                      <br />
                      <span
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 700,
                        }}
                      >
                        {o.country}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {cols.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col items-start">
                <div className="mb-6 w-full">
                  <p
                    className="text-[9px] font-600 uppercase pb-3 text-start"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      letterSpacing: "0.32em",
                    }}
                  >
                    {heading}
                  </p>
                  <div
                    className="h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                </div>
                <ul className="flex flex-col items-start gap-3.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}>
                        <motion.span
                          className="text-xs font-400 cursor-pointer block"
                          style={{
                            color: "rgba(255,255,255,0.82)",
                            letterSpacing: "0.04em",
                          }}
                          whileHover={{ color: "rgba(255,255,255,1)" }}
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

          <ScanRule />

          {/* Get Started strip */}
          <Link href="/contact">
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
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    letterSpacing: "0.28em",
                  }}
                >
                  {t.common.contactUs}
                </span>
                <motion.div
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  variants={{ hovered: { color: "rgba(255,255,255,1)" } }}
                >
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>

          <ScanRule />

          {/* Bottom bar */}
          <div className="flex flex-row items-center justify-between gap-3 py-6">
            <p
              className="text-[10px] font-400"
              style={{
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.08em",
              }}
            >
              © {new Date().getFullYear()} X360.{" "}
              {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <div className="flex items-center gap-2">
              <motion.span
                className="block rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: "rgba(255,255,255,0.55)",
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span
                className="text-[9px] font-500 uppercase"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.24em",
                }}
              >
                {isAr ? "جميع الأنظمة تعمل" : "ALL SYSTEMS OPERATIONAL"}
              </span>
            </div>
            <p
              className="text-[10px] font-400"
              style={{
                color: "rgba(255,255,255,0.70)",
                letterSpacing: "0.08em",
              }}
            >
              {isAr
                ? "صُمم في المملكة العربية السعودية"
                : "Crafted in Saudi Arabia"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
