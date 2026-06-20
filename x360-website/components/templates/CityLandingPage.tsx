"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

interface ServiceBullet {
  en: string;
  ar: string;
}

interface CityLandingPageProps {
  city: { en: string; ar: string };
  service: { en: string; ar: string };
  hero: { titleEn: string; titleAr: string; descEn: string; descAr: string };
  bullets: ServiceBullet[];
  ctaHref?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function CityLandingPage({
  city,
  service,
  hero,
  bullets,
  ctaHref = "/contact",
}: CityLandingPageProps) {
  const { isAr } = useLang();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505]" dir={isAr ? "rtl" : "ltr"}>
        {/* Hero */}
        <section className="relative pt-36 pb-24 px-4 sm:px-6 text-center overflow-hidden">
          {/* Location hero background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/x360/location-hero.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ zIndex: 0, opacity: 0.38 }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(5,5,5,0.60) 0%, rgba(5,5,5,0.25) 50%, rgba(5,5,5,0.80) 100%)" }} />
          <div className="relative max-w-4xl mx-auto" style={{ zIndex: 2 }}>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-xs tracking-[0.3em] text-white/35 uppercase mb-5"
          >
            {isAr ? `${city.ar} · ${service.ar}` : `${city.en} · ${service.en}`}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-thin text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            {isAr ? hero.titleAr : hero.titleEn}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {isAr ? hero.descAr : hero.descEn}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full text-sm tracking-wide hover:bg-white/90 transition-colors"
            >
              {isAr ? "ابدأ مشروعك" : "Start Your Project"}
            </Link>
          </motion.div>
          </div>
        </section>

        {/* Bullets */}
        <section className="pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="grid gap-4">
            {bullets.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.025]"
              >
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs">
                  ✓
                </span>
                <p className="text-white/70 text-sm leading-relaxed">
                  {isAr ? b.ar : b.en}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-28 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto border border-white/10 rounded-3xl p-10 bg-white/[0.02]"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isAr
                ? `هل أنت في ${city.ar}؟ لنبدأ`
                : `Based in ${city.en}? Let's Talk`}
            </h2>
            <p className="text-white/50 mb-8 text-sm">
              {isAr
                ? "تواصل مع فريقنا للحصول على عرض مجاني."
                : "Get a free consultation and proposal within 48 hours."}
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              {isAr ? "تواصل معنا" : "Contact Us"}
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
