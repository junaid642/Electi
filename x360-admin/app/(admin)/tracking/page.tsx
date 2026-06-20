"use client";
import { useState, useEffect, useCallback } from "react";
import { Tag, Check, AlertCircle, Activity, Code, Loader2 } from "lucide-react";

interface TrackingConfig {
  gtmEnabled: boolean; gtmId: string;
  ga4Enabled: boolean; ga4Id: string;
  metaEnabled: boolean; metaId: string;
  tiktokEnabled: boolean; tiktokId: string;
  linkedinEnabled: boolean; linkedinId: string;
  customHead: string;
  customBody: string;
}

const DEFAULT: TrackingConfig = {
  gtmEnabled: false, gtmId: "",
  ga4Enabled: false, ga4Id: "",
  metaEnabled: false, metaId: "",
  tiktokEnabled: false, tiktokId: "",
  linkedinEnabled: false, linkedinId: "",
  customHead: "",
  customBody: "",
};

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 ${on ? "bg-white/80" : "bg-white/[0.08] border border-white/[0.12]"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow ${on ? "left-[22px] bg-black" : "left-0.5 bg-white/30"}`} />
    </button>
  );
}

const SERVICES = [
  { key: "gtm",      label: "Google Tag Manager",  idLabel: "GTM Container ID",  placeholder: "GTM-XXXXXXX",          desc: "Manage all your tags in one place. Inject GTM into every X360 page." },
  { key: "ga4",      label: "Google Analytics 4",  idLabel: "Measurement ID",    placeholder: "G-XXXXXXXXXX",         desc: "Track website traffic and user behaviour." },
  { key: "meta",     label: "Meta Pixel",           idLabel: "Pixel ID",          placeholder: "XXXXXXXXXXXXXXXXXX",   desc: "Track conversions from Facebook & Instagram ads." },
  { key: "tiktok",   label: "TikTok Pixel",         idLabel: "Pixel ID",          placeholder: "CXXXXXXXXXXXXXXXXX",   desc: "Track TikTok ad performance." },
  { key: "linkedin", label: "LinkedIn Insight Tag", idLabel: "Partner ID",        placeholder: "XXXXXXX",              desc: "Enable LinkedIn conversion tracking and retargeting." },
];

export default function TrackingPage() {
  const [config, setConfig]   = useState<TrackingConfig>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/api/admin/tracking");
      setConfig({ ...DEFAULT, ...data });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tracking config");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const update = (patch: Partial<TrackingConfig>) => setConfig(c => ({ ...c, ...patch }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await apiFetch("/api/admin/tracking", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const activeCount = SERVICES.filter(s => config[`${s.key}Enabled` as keyof TrackingConfig]).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-white/30">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-[12px]">Loading tracking config…</span>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-[900px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/90 tracking-tight">Tag Manager</h1>
          <p className="text-[11px] text-white/35 mt-0.5">{activeCount} active tag{activeCount !== 1 ? "s" : ""} · changes take effect live on the website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Check className="w-3.5 h-3.5" />}
          {saved ? "Saved!" : "Save Config"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[12px]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Status bar */}
      <div className="glass p-4 flex items-center gap-4 flex-wrap">
        {SERVICES.map(s => {
          const on = config[`${s.key}Enabled` as keyof TrackingConfig] as boolean;
          return (
            <div key={s.key} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${on ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-white/[0.12]"}`} />
              <span className={`text-[10px] font-600 tracking-wide ${on ? "text-white/70" : "text-white/25"}`}>{s.label.split(" ")[0].toUpperCase()}</span>
            </div>
          );
        })}
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30">
          <Activity className="w-3 h-3" />
          <span>Live Injection</span>
        </div>
      </div>

      {/* Tag toggles */}
      <div className="space-y-3">
        {SERVICES.map(s => {
          const enabledKey = `${s.key}Enabled` as keyof TrackingConfig;
          const idKey      = `${s.key}Id`      as keyof TrackingConfig;
          const on = config[enabledKey] as boolean;
          const id = config[idKey]      as string;
          return (
            <div key={s.key} className={`glass p-4 transition-all duration-200 ${on ? "border-white/[0.10]" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${on ? "bg-white/10" : "bg-white/[0.04]"} transition-colors`}>
                    <Tag className={`w-4 h-4 ${on ? "text-white/70" : "text-white/25"}`} />
                  </div>
                  <div>
                    <p className={`text-[13px] font-600 ${on ? "text-white/80" : "text-white/40"}`}>{s.label}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <Toggle on={on} onChange={v => update({ [enabledKey]: v })} />
              </div>
              {on && (
                <div>
                  <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">{s.idLabel}</label>
                  <input
                    value={id}
                    onChange={e => update({ [idKey]: e.target.value })}
                    placeholder={s.placeholder}
                    className="w-full max-w-sm bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors font-mono"
                  />
                  {on && !id.trim() && (
                    <p className="text-[10px] text-amber-400/70 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Enter your {s.idLabel} to activate tracking
                    </p>
                  )}
                  {on && id.trim() && (
                    <p className="text-[10px] text-emerald-400/70 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active — will be injected on every page of the website
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom scripts */}
      <div className="glass p-5 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Code className="w-4 h-4 text-white/40" />
          <h2 className="text-[13px] font-600 text-white/70">Custom Scripts</h2>
          <span className="text-[10px] text-white/25 ml-auto">Injected verbatim into every page</span>
        </div>
        <div>
          <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Custom {"<head>"} Scripts</label>
          <textarea
            value={config.customHead}
            onChange={e => update({ customHead: e.target.value })}
            rows={5}
            placeholder={"<!-- Paste scripts to inject into <head> -->"}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/70 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors resize-none font-mono"
          />
        </div>
        <div>
          <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Custom {"<body>"} Scripts</label>
          <textarea
            value={config.customBody}
            onChange={e => update({ customBody: e.target.value })}
            rows={5}
            placeholder={"<!-- Paste scripts to inject before </body> -->"}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/70 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors resize-none font-mono"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Check className="w-3.5 h-3.5" />}
        {saved ? "Saved to database!" : "Save Configuration"}
      </button>
    </div>
  );
}
