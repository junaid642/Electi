"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Briefcase,
  Upload, Check, Loader2, X, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import GlowRule from "@/components/ui/GlowRule";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export type InitialJob = {
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

type FormData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
};

const BLANK: FormData = { name: "", email: "", phone: "", linkedin: "", message: "" };

function parseRequirements(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(/\n|,/).map(s => s.trim()).filter(Boolean);
}

export default function JobDetailClient({ job }: { job: InitialJob }) {
  const { isAr } = useLang();
  const [form, setForm] = useState<FormData>(BLANK);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const requirements = parseRequirements(job.requirements);

  const uploadCv = async (file: File): Promise<string | null> => {
    try {
      setCvUploading(true);
      const urlRes = await fetch("/api/storage/cv-uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type || "application/octet-stream" }),
      });
      if (!urlRes.ok) return null;
      const { uploadURL, objectPath } = await urlRes.json() as { uploadURL: string; objectPath: string };
      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      if (!uploadRes.ok) return null;
      return objectPath as string;
    } catch {
      return null;
    } finally {
      setCvUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      let cvUrl: string | undefined;
      if (cvFile) {
        const uploaded = await uploadCv(cvFile);
        if (!uploaded) throw new Error("CV upload failed");
        cvUrl = uploaded;
      }
      const body: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        message: form.message,
        jobId: job.id,
      };
      if (form.phone) body.phone = form.phone;
      if (form.linkedin) body.linkedin = form.linkedin;
      if (cvUrl) body.cvUrl = cvUrl;

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setSubmitError(isAr ? "فشل الإرسال. يرجى المحاولة مرة أخرى." : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/22 transition-colors";

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* ── Back nav ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link
            href="/careers"
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors text-[13px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isAr ? "الوظائف" : "Careers"}
          </Link>
          <ChevronRight className="w-3 h-3 text-white/15" />
          <span className="text-white/55 text-[13px] truncate">{job.title}</span>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-[10px] font-semibold text-white/40 mb-5">
              <Briefcase className="w-3 h-3" /> {job.department}
            </div>

            <h1
              className="font-thin leading-tight mb-4 text-white"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "0.1em",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              {job.title}
            </h1>

            <GlowRule className="mb-6 !mx-0" />

            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <MapPin className="w-3.5 h-3.5" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <Clock className="w-3.5 h-3.5" /> {job.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold glass border border-emerald-500/20 text-emerald-400/80">
                {isAr ? "مفتوح" : "Open"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

            {/* Left — Job detail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="space-y-10"
            >
              {job.description && (
                <div>
                  <h2 className="text-[11px] font-semibold tracking-widest text-white/28 uppercase mb-4">
                    {isAr ? "عن الدور" : "About the Role"}
                  </h2>
                  <p className="text-white/55 leading-relaxed" style={{ fontSize: "clamp(0.88rem, 1.1vw, 0.98rem)" }}>
                    {job.description}
                  </p>
                </div>
              )}

              {requirements.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-semibold tracking-widest text-white/28 uppercase mb-4">
                    {isAr ? "المتطلبات" : "What We're Looking For"}
                  </h2>
                  <ul className="space-y-3">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                        <span className="text-white/50 text-[14px] leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="glass rounded-xl border border-white/[0.06] p-6">
                <h3 className="text-[11px] font-semibold tracking-widest text-white/28 uppercase mb-3">
                  {isAr ? "لماذا X360؟" : "Why X360?"}
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed">
                  {isAr
                    ? "نحن نبني شركة التجارب الرقمية الرائدة في المملكة العربية السعودية. من جولات الـ 360° الافتراضية إلى تطوير الويب بالذكاء الاصطناعي، عملك يُحدث أثراً حقيقياً لعملاء حقيقيين."
                    : "We're building Saudi Arabia's leading digital experience company. From 360° virtual tours to AI-powered web development, your work makes a real impact for real clients across the Kingdom."}
                </p>
              </div>
            </motion.div>

            {/* Right — Apply form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="px-6 py-5 border-b border-white/[0.06]">
                  <h2 className="text-[15px] font-bold text-white/90">
                    {isAr ? "تقديم الطلب" : "Apply for this Role"}
                  </h2>
                  <p className="text-[11px] text-white/30 mt-0.5">{job.title}</p>
                </div>

                {submitted ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease }}
                      className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                    <p className="text-[15px] font-semibold text-white/85 mb-2">
                      {isAr ? "تم إرسال طلبك!" : "Application submitted!"}
                    </p>
                    <p className="text-[12px] text-white/38 mb-6 leading-relaxed">
                      {isAr ? "سنراجع طلبك ونتواصل معك قريباً." : "We'll review your application and be in touch soon."}
                    </p>
                    <Link
                      href="/careers"
                      className="inline-block px-5 py-2 rounded-lg text-[12px] font-semibold bg-white text-black hover:bg-white/90 transition-colors"
                    >
                      {isAr ? "عودة للوظائف" : "Back to Careers"}
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputCls}
                        placeholder={isAr ? "اسمك الكامل" : "Your full name"}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputCls}
                        placeholder="you@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "رقم الجوال" : "Phone Number"}
                      </label>
                      <input
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputCls}
                        placeholder="+966 5x xxx xxxx"
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "رابط لينكدإن" : "LinkedIn Profile"}
                      </label>
                      <input
                        value={form.linkedin}
                        onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                        className={inputCls}
                        placeholder="linkedin.com/in/…"
                      />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "السيرة الذاتية (PDF)" : "CV / Resume (PDF)"}
                      </label>
                      <label
                        className={`flex items-center gap-2.5 w-full border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                          cvFile
                            ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                            : "border-white/[0.08] bg-white/[0.04] hover:border-white/15"
                        }`}
                      >
                        {cvFile
                          ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          : <Upload className="w-3.5 h-3.5 text-white/30 shrink-0" />
                        }
                        <span className={`text-[12px] truncate ${cvFile ? "text-emerald-400/80" : "text-white/28"}`}>
                          {cvFile ? cvFile.name : (isAr ? "اختر ملف PDF…" : "Choose PDF file…")}
                        </span>
                        {cvFile && (
                          <button
                            type="button"
                            onClick={e => { e.preventDefault(); setCvFile(null); }}
                            className="ms-auto text-white/25 hover:text-white/60 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={e => setCvFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>

                    {/* Cover note */}
                    <div>
                      <label className="block text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">
                        {isAr ? "رسالة التغطية" : "Cover Note"}
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        rows={3}
                        className={`${inputCls} resize-none`}
                        placeholder={isAr ? "اخبرنا قليلاً عن نفسك…" : "Tell us a bit about yourself and why you're excited about this role…"}
                      />
                    </div>

                    {submitError && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1.5">
                        <X className="w-3 h-3" /> {submitError}
                      </p>
                    )}

                    <button
                      onClick={() => void handleSubmit()}
                      disabled={submitting || cvUploading || !form.name.trim() || !form.email.trim()}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors disabled:opacity-45 mt-2"
                    >
                      {(submitting || cvUploading) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      {cvUploading
                        ? (isAr ? "جارٍ رفع الملف…" : "Uploading CV…")
                        : submitting
                          ? (isAr ? "جارٍ الإرسال…" : "Submitting…")
                          : (isAr ? "إرسال الطلب" : "Submit Application")}
                    </button>

                    <p className="text-[10px] text-white/22 text-center leading-relaxed">
                      {isAr
                        ? "بإرسال طلبك، أنت توافق على تخزين بياناتك لأغراض التوظيف."
                        : "By submitting, you agree to your data being stored for recruitment purposes."}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
