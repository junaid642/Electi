"use client";
import { useState, useEffect, useCallback } from "react";
import { Languages, Check, RotateCcw, Loader2, X, Search } from "lucide-react";

interface TranslationString {
  key: string;
  label: string;
  en: string;
  ar: string;
}

interface TranslationSection {
  section: string;
  strings: TranslationString[];
}

const DEFAULT_STRINGS: TranslationSection[] = [
  {
    section: "Navigation",
    strings: [
      { key: "nav.virtualTours",  label: "Virtual Tours",   en: "Virtual Tours",    ar: "جولات افتراضية" },
      { key: "nav.webAI",         label: "Web & AI",         en: "Web & AI",          ar: "الويب والذكاء الاصطناعي" },
      { key: "nav.about",         label: "About",            en: "About",             ar: "عن الشركة" },
      { key: "nav.contact",       label: "Contact",          en: "Contact",           ar: "تواصل معنا" },
      { key: "nav.getStarted",    label: "Get Started CTA",  en: "Get Started",       ar: "ابدأ الآن" },
      { key: "nav.caseStudies",   label: "Case Studies",     en: "Case Studies",      ar: "دراسات الحالة" },
    ],
  },
  {
    section: "Home Hero",
    strings: [
      { key: "home.hero360",      label: "360 Hero Title",   en: "360° Virtual Tour Expert", ar: "خبير الجولات الافتراضية 360°" },
      { key: "home.heroWeb",      label: "Web Hero Title",   en: "Web & AI Solutions",        ar: "حلول الويب والذكاء الاصطناعي" },
      { key: "home.explore360",   label: "Explore 360",      en: "Explore Tours",             ar: "استكشف الجولات" },
      { key: "home.exploreWeb",   label: "Explore Web",      en: "Explore Web & AI",          ar: "استكشف الويب والذكاء الاصطناعي" },
    ],
  },
  {
    section: "Common UI",
    strings: [
      { key: "common.learnMore",  label: "Learn More",       en: "Learn More",        ar: "اعرف المزيد" },
      { key: "common.getStarted", label: "Get Started",      en: "Get Started",       ar: "ابدأ الآن" },
      { key: "common.contactUs",  label: "Contact Us",       en: "Contact Us",        ar: "تواصل معنا" },
      { key: "common.viewAll",    label: "View All",         en: "View All",          ar: "عرض الكل" },
      { key: "common.readMore",   label: "Read More",        en: "Read More",         ar: "اقرأ المزيد" },
      { key: "common.applyNow",   label: "Apply Now",        en: "Apply Now",         ar: "تقدم الآن" },
    ],
  },
  {
    section: "Footer",
    strings: [
      { key: "footer.tagline",    label: "Tagline",          en: "Building the digital future of Saudi Arabia", ar: "نبني المستقبل الرقمي للمملكة العربية السعودية" },
      { key: "footer.rights",     label: "Copyright",        en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
      { key: "footer.privacy",    label: "Privacy Policy",   en: "Privacy Policy",    ar: "سياسة الخصوصية" },
      { key: "footer.terms",      label: "Terms",            en: "Terms of Service",  ar: "شروط الخدمة" },
    ],
  },
  {
    section: "Contact Page",
    strings: [
      { key: "contact.hero",      label: "Hero Title",       en: "Let's Talk",        ar: "لنتحدث" },
      { key: "contact.heroSub",   label: "Hero Subtitle",    en: "Tell us about your project and we'll get back to you within 24 hours.", ar: "أخبرنا عن مشروعك وسنرد عليك خلال 24 ساعة." },
      { key: "contact.send",      label: "Send Button",      en: "Send Message",      ar: "إرسال الرسالة" },
      { key: "contact.success",   label: "Success Message",  en: "Message sent! We'll be in touch soon.", ar: "تم الإرسال! سنتواصل معك قريباً." },
    ],
  },
];

const DEFAULT_MAP: Record<string, { en: string; ar: string }> = {};
for (const sec of DEFAULT_STRINGS) {
  for (const str of sec.strings) {
    DEFAULT_MAP[str.key] = { en: str.en, ar: str.ar };
  }
}

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export default function TranslationsPage() {
  const [sections, setSections] = useState<TranslationSection[]>(DEFAULT_STRINGS);
  const [activeSection, setActiveSection] = useState(DEFAULT_STRINGS[0]!.section);
  const [search, setSearch] = useState("");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/translations");
      if (Array.isArray(data) && data.length > 0) {
        const bySection: Record<string, TranslationSection> = {};
        for (const row of data as { page: string; section: string; key: string; enContent: string | null; arContent: string | null }[]) {
          const sectionName = row.section || row.page;
          if (!bySection[sectionName]) bySection[sectionName] = { section: sectionName, strings: [] };
          bySection[sectionName]!.strings.push({
            key: row.key,
            label: row.key.split(".").pop()?.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()) ?? row.key,
            en: row.enContent ?? "",
            ar: row.arContent ?? "",
          });
        }
        const loaded = Object.values(bySection);
        if (loaded.length > 0) {
          setSections(loaded);
          setActiveSection(loaded[0]!.section);
        }
      }
    } catch {
      setError("Could not load translations from server — showing defaults");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const updateString = (sectionName: string, key: string, lang: "en" | "ar", value: string) => {
    setSections(prev => prev.map(s => s.section === sectionName
      ? { ...s, strings: s.strings.map(str => str.key === key ? { ...str, [lang]: value } : str) }
      : s
    ));
    setDirty(true);
  };

  const resetKey = (sectionName: string, key: string) => {
    const def = DEFAULT_MAP[key];
    if (!def) return;
    setSections(prev => prev.map(s => s.section === sectionName
      ? { ...s, strings: s.strings.map(str => str.key === key ? { ...str, en: def.en, ar: def.ar } : str) }
      : s
    ));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const items = sections.flatMap(s => s.strings.map(str => ({
        page: "x360-website", section: s.section, key: str.key,
        enContent: str.en, arContent: str.ar, status: "published" as const,
      })));
      await apiFetch("/api/admin/translations/bulk", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save translations");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSections(DEFAULT_STRINGS);
    setActiveSection(DEFAULT_STRINGS[0]!.section);
    setDirty(false);
  };

  const current = sections.find(s => s.section === activeSection) ?? sections[0];
  const filteredStrings = search.trim()
    ? current?.strings.filter(str =>
        str.label.toLowerCase().includes(search.toLowerCase()) ||
        str.key.toLowerCase().includes(search.toLowerCase()) ||
        str.en.toLowerCase().includes(search.toLowerCase()) ||
        str.ar.includes(search)
      )
    : current?.strings;
  const totalStrings = sections.reduce((a, s) => a + s.strings.length, 0);

  return (
    <div className="space-y-4 max-w-[1100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/90 tracking-tight">Language Matrix</h1>
          <p className="text-[11px] text-white/35 mt-0.5">
            {loading ? "Loading…" : `${totalStrings} strings across ${sections.length} sections · EN / AR`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/40 hover:text-white/70 text-[12px] hover:bg-white/[0.05] transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset All
            </button>
          )}
          <button onClick={() => void handleSave()} disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 text-emerald-600" />}
            {saved ? "Saved!" : dirty ? "Save Changes" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="glass border border-amber-500/20 rounded-lg px-4 py-2.5 text-[11px] text-amber-400 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-white/30 hover:text-white/60"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-white/25 text-[12px]">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading translations…
        </div>
      ) : (
        <div className="flex gap-4 min-h-[500px]">
          <div className="w-44 shrink-0 space-y-1">
            {sections.map(s => (
              <button key={s.section} onClick={() => { setActiveSection(s.section); setSearch(""); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-all ${activeSection === s.section ? "bg-white/[0.08] text-white/85 font-600" : "text-white/40 hover:text-white/65 hover:bg-white/[0.04]"}`}>
                {s.section}
                <span className="ml-1.5 text-[10px] text-white/25">{s.strings.length}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 glass overflow-hidden">
            {/* Search bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
              <Search className="w-3 h-3 text-white/28 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search in ${activeSection}…`}
                className="flex-1 bg-transparent text-[11px] text-white/60 placeholder:text-white/20 outline-none"
              />
              {search && <button onClick={() => setSearch("")} className="text-white/25 hover:text-white/50"><X className="w-3 h-3" /></button>}
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr_auto] border-b border-white/[0.06]">
              <div className="px-4 py-2 text-[10px] font-600 tracking-widest text-white/30 uppercase">String Key</div>
              <div className="px-4 py-2 text-[10px] font-600 tracking-widest text-white/30 uppercase flex items-center gap-1.5">
                <span className="text-[8px]">🇬🇧</span> English
              </div>
              <div className="px-4 py-2 text-[10px] font-600 tracking-widests text-white/30 uppercase flex items-center gap-1.5">
                <span className="text-[8px]">🇸🇦</span> Arabic (RTL)
              </div>
              <div className="px-4 py-2 text-[10px] font-600 tracking-widest text-white/30 uppercase">Reset</div>
            </div>

            {filteredStrings && filteredStrings.length > 0 ? filteredStrings.map((str, i) => (
              <div key={str.key} className={`grid grid-cols-[1fr_1fr_1fr_auto] border-b border-white/[0.04] ${i === filteredStrings.length - 1 ? "border-b-0" : ""}`}>
                <div className="px-4 py-3 border-r border-white/[0.04]">
                  <p className="text-[12px] font-600 text-white/65">{str.label}</p>
                  <p className="text-[10px] text-white/25 font-mono mt-0.5">{str.key}</p>
                </div>
                <div className="px-3 py-2.5 border-r border-white/[0.04]">
                  <textarea value={str.en} onChange={e => updateString(activeSection, str.key, "en", e.target.value)}
                    rows={2} className="w-full bg-transparent text-[12px] text-white/80 placeholder:text-white/20 outline-none resize-none leading-relaxed" />
                </div>
                <div className="px-3 py-2.5 border-r border-white/[0.04]">
                  <textarea value={str.ar} onChange={e => updateString(activeSection, str.key, "ar", e.target.value)}
                    rows={2} dir="rtl" className="w-full bg-transparent text-[12px] text-white/80 placeholder:text-white/20 outline-none resize-none leading-relaxed text-right" />
                </div>
                <div className="px-3 py-3 flex items-center justify-center">
                  <button
                    onClick={() => resetKey(activeSection, str.key)}
                    title="Reset to default"
                    className="p-1.5 rounded text-white/20 hover:text-white/55 hover:bg-white/[0.05] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="px-4 py-8 text-center text-white/25 text-[12px]">
                {search ? `No strings match "${search}"` : "No strings in this section."}
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-[10px] text-white/20 flex items-center gap-1.5">
        <Languages className="w-3 h-3" />
        Changes saved here are reflected across the X360 website immediately via the API.
      </p>
    </div>
  );
}
