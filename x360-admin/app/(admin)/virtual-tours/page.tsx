"use client";
import { useState } from "react";
import {
  Eye, QrCode, TrendingUp, Link2, MapPin, Calendar, Activity,
  Plus, Trash2, StickyNote, Tag, Building2, Clock, Search,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import AddVirtualTourModal from "@/components/virtual-tours/AddVirtualTourModal";
import type { VirtualTour, TourStatus } from "@/lib/types";

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<TourStatus, string> = {
  Live:    "bg-green-500/[0.15] text-green-400 border-green-500/20",
  Pending: "bg-amber-500/[0.15] text-amber-400 border-amber-500/20",
  Paused:  "bg-white/[0.06]    text-white/45   border-white/10",
  Expired: "bg-red-500/[0.15]  text-red-400    border-red-500/20",
};

const STATUSES: (TourStatus | "All")[] = ["All", "Live", "Pending", "Paused", "Expired"];

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function TourDrawer({ tour, onClose }: { tour: VirtualTour; onClose: () => void }) {
  const { updateVirtualTour, deleteVirtualTour } = useStore();
  const { toast } = useToast();
  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes]         = useState(tour.notes);
  const [confirmDel, setConfirmDel] = useState(false);

  function changeStatus(s: TourStatus) {
    updateVirtualTour(tour.id, { status: s });
    toast(`Status → ${s}`);
  }
  function saveNotes() { updateVirtualTour(tour.id, { notes }); setEditNotes(false); toast("Notes saved"); }
  function handleDelete() {
    if (!confirmDel) { setConfirmDel(true); return; }
    deleteVirtualTour(tour.id);
    toast(`"${tour.name}" deleted`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/50 backdrop-blur-sm" />
      <div
        className="w-[420px] bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col h-full overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/[0.05]">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-[14px] font-700 text-white/90 leading-tight">{tour.name}</h2>
              <p className="text-[11px] text-white/42 mt-0.5">{tour.client}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 shrink-0">✕</button>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-600 border ${STATUS_STYLE[tour.status]}`}>
              {tour.status}
            </span>
            <span className="badge badge-white text-[9px]">{tour.type}</span>
            <div className="flex items-center gap-1 text-[10px] text-white/35">
              <MapPin className="w-2.5 h-2.5" />{tour.location}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Views",    value: tour.views.toLocaleString(),    icon: Eye      },
              { label: "Sessions", value: tour.sessions.toLocaleString(), icon: Activity },
              { label: "Last View",value: tour.lastView,                  icon: Clock    },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-sm rounded-lg p-3 text-center">
                <Icon className="w-3 h-3 text-white/28 mx-auto mb-1" />
                <p className="text-[13px] font-700 font-mono text-white/80">{value}</p>
                <p className="text-[8px] text-white/28 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Created",  value: tour.created,  icon: Calendar },
              { label: "Expires",  value: tour.expiry,   icon: Calendar },
              { label: "QR Code",  value: tour.qr ? "Enabled" : "Disabled", icon: QrCode   },
              { label: "Type",     value: tour.type,     icon: Tag      },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-sm rounded-lg p-3">
                <p className="text-[9px] text-white/28 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                  <Icon className="w-2.5 h-2.5" />{label}
                </p>
                <p className="text-[11px] font-600 text-white/70">{value}</p>
              </div>
            ))}
          </div>

          {/* URL */}
          {tour.url && (
            <div className="glass-sm rounded-lg p-3">
              <p className="text-[9px] text-white/28 uppercase tracking-wide mb-1 flex items-center gap-1">
                <Link2 className="w-2.5 h-2.5" /> Tour URL
              </p>
              <a href={tour.url} target="_blank" rel="noreferrer"
                className="text-[11px] text-blue-400/80 hover:text-blue-400 truncate block transition-colors">
                {tour.url}
              </a>
            </div>
          )}

          {/* Status change */}
          <div>
            <p className="text-[9px] text-white/28 uppercase tracking-wide mb-2">Change Status</p>
            <div className="flex flex-wrap gap-1.5">
              {(["Live","Pending","Paused","Expired"] as TourStatus[]).map(s => (
                <button key={s} onClick={() => changeStatus(s)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-500 border transition-all ${
                    tour.status === s
                      ? `${STATUS_STYLE[s]} opacity-100`
                      : "border-white/[0.06] text-white/35 hover:border-white/15 hover:text-white/60"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] text-white/28 uppercase tracking-wide flex items-center gap-1">
                <StickyNote className="w-2.5 h-2.5" /> Notes
              </p>
              {!editNotes && (
                <button onClick={() => setEditNotes(true)} className="text-[9px] text-white/35 hover:text-white/60 transition-colors">Edit</button>
              )}
            </div>
            {editNotes ? (
              <div className="space-y-2">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2 text-[12px] text-white/75 resize-none outline-none focus:border-white/20 transition-colors" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditNotes(false)} className="text-[10px] text-white/35 hover:text-white/60 px-3 py-1.5 rounded-lg glass-sm">Cancel</button>
                  <button onClick={saveNotes} className="text-[10px] text-white/80 px-3 py-1.5 rounded-lg glass-sm border border-white/[0.1] hover:border-white/20">Save</button>
                </div>
              </div>
            ) : (
              <div className="glass-sm rounded-xl p-3 min-h-[56px]">
                <p className="text-[11px] text-white/50 leading-relaxed whitespace-pre-wrap">
                  {notes || <span className="italic text-white/22">No notes yet.</span>}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.05] flex gap-2">
          <button onClick={handleDelete}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] transition-colors ${
              confirmDel
                ? "bg-red-500/20 border border-red-500/40 text-red-400"
                : "glass-sm text-white/35 hover:text-red-400/70 border border-transparent hover:border-red-500/20"
            }`}>
            <Trash2 className="w-3 h-3" />{confirmDel ? "Confirm delete?" : "Delete"}
          </button>
          {confirmDel && (
            <button onClick={() => setConfirmDel(false)} className="text-[10px] text-white/35 hover:text-white/60 px-3 py-2 glass-sm rounded-lg">Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tour Card ─────────────────────────────────────────────────────────────────
function TourCard({ tour, onClick }: { tour: VirtualTour; onClick: () => void }) {
  return (
    <div onClick={onClick}
      className="glass p-4 space-y-3 hover:bg-white/[0.03] transition-colors cursor-pointer rounded-xl">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[12px] font-600 text-white/85 leading-tight truncate">{tour.name}</p>
          <p className="text-[10px] text-white/38 mt-0.5">{tour.client}</p>
        </div>
        <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-600 border ${STATUS_STYLE[tour.status]}`}>
          {tour.status}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[10px] text-white/38 flex-wrap">
        <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{tour.location}</div>
        <span className="badge badge-white text-[9px]">{tour.type}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Views",    value: tour.views.toLocaleString()    },
          { label: "Sessions", value: tour.sessions.toLocaleString() },
          { label: "Last View",value: tour.lastView                  },
        ].map(s => (
          <div key={s.label} className="glass-sm p-2 text-center rounded-lg">
            <p className="text-[12px] font-700 text-white/75 font-mono">{s.value}</p>
            <p className="text-[8px] text-white/28 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
        <div className="flex items-center gap-1 text-[9px] text-white/28">
          <Calendar className="w-2.5 h-2.5" /> Expires {tour.expiry}
        </div>
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          {tour.url && (
            <a href={tour.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-[9px] text-white/38 hover:text-white/65 glass-sm px-2 py-1 rounded transition-colors">
              <Link2 className="w-2.5 h-2.5" /> Link
            </a>
          )}
          {tour.qr && (
            <span className="flex items-center gap-1 text-[9px] text-white/38 glass-sm px-2 py-1 rounded">
              <QrCode className="w-2.5 h-2.5" /> QR
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function VirtualToursPage() {
  const { virtualTours } = useStore();
  const [addOpen, setAddOpen]   = useState(false);
  const [selected, setSelected] = useState<VirtualTour | null>(null);
  const [filter, setFilter]     = useState<TourStatus | "All">("All");
  const [search, setSearch]     = useState("");

  const filtered = virtualTours.filter(t => {
    const matchStatus = filter === "All" || t.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.client.toLowerCase().includes(q) || t.location.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const live     = virtualTours.filter(t => t.status === "Live").length;
  const totalV   = virtualTours.reduce((s, t) => s + t.views, 0);
  const avgSess  = virtualTours.length > 0 ? Math.round(virtualTours.reduce((s, t) => s + t.sessions, 0) / virtualTours.length) : 0;
  const expiring = virtualTours.filter(t => {
    if (t.status !== "Live") return false;
    const diff = (new Date(t.expiry).getTime() - Date.now()) / 86400000;
    return diff >= 0 && diff <= 60;
  }).length;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Tours",  value: live,                      icon: Eye,        color: "text-blue-400"   },
          { label: "Total Views",   value: totalV >= 1000 ? `${(totalV/1000).toFixed(0)}K` : String(totalV), icon: TrendingUp, color: "text-green-400"  },
          { label: "Avg. Sessions", value: avgSess >= 1000 ? `${(avgSess/1000).toFixed(1)}K` : String(avgSess), icon: Activity, color: "text-purple-400" },
          { label: "Expiring Soon", value: String(expiring),          icon: Calendar,   color: "text-amber-400"  },
        ].map(s => (
          <div key={s.label} className="glass p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-[22px] font-700 font-display text-white/85">{s.value}</p>
              <p className="text-[10px] text-white/35">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass p-3 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {STATUSES.map(s => {
            const count = s === "All" ? virtualTours.length : virtualTours.filter(t => t.status === s).length;
            return (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-500 transition-colors flex items-center gap-1 ${
                  filter === s ? "bg-white/[0.1] text-white/85" : "text-white/38 hover:text-white/65 hover:bg-white/[0.04]"
                }`}>
                {s}
                <span className="text-[8px] font-mono text-white/25 ml-0.5">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 rounded-lg">
          <Search className="w-3 h-3 text-white/28 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tours…"
            className="bg-transparent text-[11px] text-white/60 outline-none w-28 placeholder-white/20" />
        </div>
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.13] border border-white/[0.1] text-white/80 text-[11px] px-3 py-1.5 rounded-lg transition-colors ml-auto shrink-0">
          <Plus className="w-3 h-3" /> New Tour
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass rounded-xl text-center py-16">
          <Eye className="w-8 h-8 mx-auto text-white/15 mb-3" />
          <p className="text-[12px] text-white/28">No tours found</p>
          <button onClick={() => setAddOpen(true)} className="mt-4 text-[10px] text-white/40 hover:text-white/65 underline transition-colors">
            Add first virtual tour
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(tour => (
            <TourCard key={tour.id} tour={tour} onClick={() => setSelected(tour)} />
          ))}
        </div>
      )}

      {/* Modals */}
      <AddVirtualTourModal open={addOpen} onClose={() => setAddOpen(false)} />
      {selected && (
        <TourDrawer
          key={selected.id}
          tour={virtualTours.find(t => t.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
