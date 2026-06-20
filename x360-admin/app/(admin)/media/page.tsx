"use client";
import { useState, useEffect, useCallback } from "react";
import { Film, Link2, Pencil, Check, X, Loader2, AlertCircle, Copy, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaEntry {
  key: string;
  value: string;
  label: string;
  pageName: string;
  type: "iframe" | "video";
  updatedAt: string;
}

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

function TypeBadge({ type }: { type: string }) {
  const isIframe = type === "iframe";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold tracking-widest uppercase ${
        isIframe
          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      }`}
    >
      {isIframe ? <Link2 className="w-2.5 h-2.5" /> : <Film className="w-2.5 h-2.5" />}
      {type}
    </span>
  );
}

function ValueDisplay({ value, type }: { value: string; type: string }) {
  const [copied, setCopied] = useState(false);
  const isEmpty = !value;

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isEmpty) {
    return <span className="text-[11px] italic text-white/20">— empty —</span>;
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-[11px] text-white/55 font-mono truncate max-w-[320px]">{value}</span>
      <button onClick={copy} className="text-white/25 hover:text-white/60 flex-shrink-0 transition-colors">
        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      </button>
      {type === "iframe" && value.startsWith("http") && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-blue-400 flex-shrink-0 transition-colors">
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

function EditRow({ entry, onSave }: { entry: MediaEntry; onSave: (key: string, value: string) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(entry.key, draft);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(entry.value);
    setEditing(false);
  };

  return (
    <motion.div
      layout
      className="rounded-xl border border-white/[0.06] overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="flex items-start gap-4 px-4 py-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-medium text-white/80">{entry.label}</span>
            <TypeBadge type={entry.type} />
            {saved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-emerald-400 flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Saved
              </motion.span>
            )}
          </div>
          <code className="text-[9px] text-white/20 font-mono">{entry.key}</code>

          {editing ? (
            <div className="mt-2 flex flex-col gap-2">
              {entry.type === "iframe" ? (
                <input
                  autoFocus
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/80 font-mono outline-none focus:border-blue-400/40 placeholder:text-white/20"
                />
              ) : (
                <input
                  autoFocus
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder="/x360/your-video.mp4"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/80 font-mono outline-none focus:border-amber-400/40 placeholder:text-white/20"
                />
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white text-black hover:bg-white/90 disabled:opacity-50 transition-all"
                >
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/10 text-white/50 hover:text-white/80 transition-all"
                >
                  <X className="w-3 h-3" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-1.5">
              <ValueDisplay value={entry.value} type={entry.type} />
            </div>
          )}
        </div>

        {!editing && (
          <button
            onClick={() => { setDraft(entry.value); setEditing(true); }}
            className="flex-shrink-0 p-1.5 rounded-lg border border-white/[0.06] text-white/30 hover:text-white/70 hover:border-white/20 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MediaPage() {
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/api/admin/media");
      setEntries(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (key: string, value: string) => {
    await apiFetch(`/api/admin/media/${encodeURIComponent(key)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    setEntries(prev => prev.map(e => e.key === key ? { ...e, value, updatedAt: new Date().toISOString() } : e));
  };

  const grouped = entries.reduce<Record<string, MediaEntry[]>>((acc, e) => {
    if (!acc[e.pageName]) acc[e.pageName] = [];
    acc[e.pageName].push(e);
    return acc;
  }, {});

  const iframeCount = entries.filter(e => e.type === "iframe").length;
  const videoCount = entries.filter(e => e.type === "video").length;
  const filledCount = entries.filter(e => e.value).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <Film className="w-4 h-4 text-white/60" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-white/90 tracking-wide">MEDIA MANAGER</h1>
            <p className="text-[11px] text-white/35 tracking-widest uppercase">Iframes & Videos</p>
          </div>
        </div>
        <p className="text-[12px] text-white/40 mt-3 leading-relaxed max-w-xl">
          Edit iframe embed URLs and video sources used across the X360 website. Changes take effect immediately on the live site.
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-4">
          {[
            { label: "Total", value: entries.length },
            { label: "Iframes", value: iframeCount, color: "text-blue-400" },
            { label: "Videos", value: videoCount, color: "text-amber-400" },
            { label: "Filled", value: filledCount, color: "text-emerald-400" },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className={`text-[18px] font-thin tabular-nums ${s.color ?? "text-white/80"}`}>{s.value}</span>
              <span className="text-[9px] uppercase tracking-widest text-white/30">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-24 text-white/30">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-[12px]">Loading media config…</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[12px] mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([page, items]) => (
            <div key={page}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/35">{page}</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                <span className="text-[9px] text-white/20">{items.length} item{items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {items.map(entry => (
                    <EditRow key={entry.key} entry={entry} onSave={handleSave} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
