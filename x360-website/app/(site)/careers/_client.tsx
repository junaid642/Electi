"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Upload, Briefcase, Globe, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GlowRule from "@/components/ui/GlowRule";
import { useLang } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const CONTACT_EMAIL = "mohammed@x-360.ai";

type ApiJob = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  requirements: string | null;
  status: string;
  createdAt: string;
};

const perks = [
  {
    icon: Globe,
    titleEn: "Remote-friendly",
    titleAr: "صديق للعمل عن بُعد",
    descEn: "Flexible working arrangements. Async-first, results-driven culture.",
    descAr: "ترتيبات عمل مرنة. ثقافة موجهة نحو النتائج.",
  },
  {
    icon: TrendingUp,
    titleEn: "Growth Path",
    titleAr: "مسار النمو",
    descEn: "Early team members lead the next chapter as X360 scales.",
    descAr: "أعضاء الفريق المبكرون يقودون الفصل التالي مع توسع X360.",
  },
  {
    icon: Zap,
    titleEn: "Latest Tools",
    titleAr: "أحدث الأدوات",
    descEn: "Full access to the best AI and creative tools available.",
    descAr: "وصول كامل إلى أفضل أدوات الذكاء الاصطناعي والإبداع المتاحة.",
  },
  {
    icon: Briefcase,
    titleEn: "Real Ownership",
    titleAr: "ملكية حقيقية",
    descEn: "No bureaucracy. Your work ships fast and makes a direct impact.",
    descAr: "لا بيروقراطية. عملك يُشحن بسرعة ويُحدث تأثيراً مباشراً.",
  },
];

export default function CareersClient() {
  const { isAr } = useLang();
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    setJobsLoading(true);
    fetch("/api/jobs")
      .then(r => r.ok ? r.json() : [])
      .then((data: unknown) => {
        if (Array.isArray(data)) setJobs(data as ApiJob[]);
      })
      .catch(() => {})
      .finally(() => setJobsLoading(false));
  }, []);

  const tags = (job: ApiJob) =>
    (job.requirements ?? "").split(/\n|,/).map(s => s.trim()).filter(Boolean).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-clip">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-[11px] font-semibold text-white/45 mb-6">
              <Briefcase className="w-3 h-3" /> {isAr ? "نحن نوظّف" : "We're Hiring"}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
              className="font-thin leading-tight mb-5 text-white"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "0.1em",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              {isAr ? (
                <>ابنِ <span className="shimmer-text">مستقبل التحول الرقمي</span></>
              ) : (
                <>Build the{" "}<span className="shimmer-text">Future of Digital</span></>
              )}
            </motion.h1>

            <GlowRule className="mb-6" />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.18 }}
              className="text-white/40 max-w-xl mx-auto"
              style={{
                fontSize: "clamp(0.82rem, 1.2vw, 0.96rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.75,
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              {isAr
                ? "انضم إلى فريق طموح صغير يبني شركة التجارب الرقمية الرائدة في المملكة العربية السعودية."
                : "Join a small, ambitious team building Saudi Arabia's leading digital experience company — 360° virtual tours, AI web development, and beyond."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
              >
                <SpotlightCard
                  glowColor="rgba(255,255,255,0.05)"
                  className="glass rounded-xl border border-white/8 text-center h-full"
                >
                  <div className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-white/45" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1.5">
                      {isAr ? perk.titleAr : perk.titleEn}
                    </h4>
                    <p className="text-white/32 text-xs leading-relaxed">
                      {isAr ? perk.descAr : perk.descEn}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* ── Open Positions ───────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6 text-start"
        >
          {isAr ? "الوظائف المتاحة" : "Open Positions"}
        </motion.h2>

        <div className="space-y-3.5">
          {jobsLoading && (
            <div className="text-center py-16 text-white/22">
              <div className="w-6 h-6 border-2 border-white/15 border-t-white/50 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">{isAr ? "جارٍ التحميل…" : "Loading positions…"}</p>
            </div>
          )}
          {!jobsLoading && jobs.length === 0 && (
            <div className="text-center py-16 text-white/22">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>{isAr ? "لا توجد وظائف مفتوحة حالياً. تحقق لاحقاً." : "No open positions right now. Check back soon."}</p>
            </div>
          )}
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: isAr ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease }}
            >
              <Link href={`/careers/${job.id}`} className="block group">
                <SpotlightCard
                  glowColor="rgba(255,255,255,0.04)"
                  className="glass border border-white/8 rounded-xl hover:border-white/18 transition-all group-hover:bg-white/[0.02]"
                >
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-white group-hover:text-white/90 transition-colors">{job.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold glass border border-white/8 text-white/38">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed mb-3">{job.description ?? ""}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-white/28 text-xs">
                          <MapPin className="w-3 h-3 flex-shrink-0" />{job.location}
                        </span>
                        <span className="flex items-center gap-1 text-white/28 text-xs">
                          <Clock className="w-3 h-3 flex-shrink-0" />{job.type}
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {tags(job).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/4 text-white/35 border border-white/6">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white/50 group-hover:text-white glass border border-white/10 group-hover:border-white/22 transition-all flex-shrink-0">
                      {isAr ? (
                        <><ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />{" "}تقدّم الآن</>
                      ) : (
                        <>View Role <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Open Application CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <SpotlightCard glowColor="rgba(255,255,255,0.05)" className="glass rounded-2xl border border-white/8">
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/6 flex items-center justify-center mx-auto mb-4 border border-white/10 animate-float">
                <Upload className="w-7 h-7 text-white/45" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {isAr ? "لم تجد وظيفتك؟" : "Don't see your role?"}
              </h3>
              <p className="text-white/38 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? "نبحث دائماً عن أشخاص استثنائيين. أرسل سيرتك الذاتية وسنتواصل معك عندما تظهر الفرصة المناسبة."
                  : "We're always looking for exceptional people. Drop your resume and we'll reach out when the right opportunity comes."}
              </p>
              <motion.a
                href={`mailto:${CONTACT_EMAIL}?subject=Open%20Application%20%E2%80%94%20X360&body=Hi%2C%0A%0AI'd%20like%20to%20submit%20my%20resume%20for%20any%20suitable%20openings%20at%20X360.%0A%0A`}
                className="inline-block px-7 py-2.5 rounded-xl font-semibold bg-white text-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isAr ? "إرسال الطلب" : "Submit Application"}
              </motion.a>
            </div>
          </SpotlightCard>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
