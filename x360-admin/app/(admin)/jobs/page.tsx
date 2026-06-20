"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Check, MapPin, Clock, Loader2, User, Mail, Phone, Linkedin, FileText, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: "open" | "closed" | "paused";
  description: string | null;
  requirements: string | null;
  createdAt: string;
}

interface Application {
  id: number;
  jobId: number | null;
  jobTitle: string | null;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  cvUrl: string | null;
  message: string | null;
  status: "new" | "reviewed" | "shortlisted" | "rejected" | "hired";
  notes: string | null;
  createdAt: string;
}

const DEPTS = ["Engineering", "Design", "Sales", "Marketing", "Operations", "Finance", "HR"];
const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
type FormState = { title: string; department: string; location: string; type: string; status: "open" | "closed" | "paused"; description: string; requirements: string };
const BLANK: FormState = { title: "", department: DEPTS[0]!, location: "Riyadh, KSA", type: "Full-time", status: "open", description: "", requirements: "" };

const JOB_STATUS_STYLES: Record<"open" | "closed" | "paused", string> = {
  open:   "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  paused: "bg-amber-500/10 text-amber-400/80 border border-amber-500/20",
  closed: "bg-white/[0.06] text-white/30 border border-white/[0.08]",
};

const APP_STATUS_STYLES: Record<Application["status"], string> = {
  new:         "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  reviewed:    "bg-white/[0.06] text-white/40 border border-white/[0.08]",
  shortlisted: "bg-amber-500/10 text-amber-400/80 border border-amber-500/20",
  rejected:    "bg-red-500/10 text-red-400/60 border border-red-500/15",
  hired:       "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
};

const APP_STATUS_OPTIONS: Application["status"][] = ["new", "reviewed", "shortlisted", "rejected", "hired"];

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function JobsPage() {
  const [tab, setTab] = useState<"listings" | "applications">("listings");

  /* ── Jobs state ── */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: Job | null }>({ open: false, editing: null });
  const [form, setForm] = useState(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* ── Applications state ── */
  const [apps, setApps] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appFilter, setAppFilter] = useState<Application["status"] | "all">("all");
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  /* ── Load jobs ── */
  const loadJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const data = await apiFetch("/api/admin/jobs");
      setJobs(data);
    } catch {
      setError("Failed to load jobs");
    } finally {
      setJobsLoading(false);
    }
  }, []);

  /* ── Load applications ── */
  const loadApps = useCallback(async () => {
    setAppsLoading(true);
    try {
      const data = await apiFetch("/api/admin/applications");
      setApps(data);
    } catch {
      setError("Failed to load applications");
    } finally {
      setAppsLoading(false);
    }
  }, []);

  useEffect(() => { void loadJobs(); }, [loadJobs]);
  useEffect(() => {
    if (tab === "applications" && apps.length === 0 && !appsLoading) void loadApps();
  }, [tab, apps.length, appsLoading, loadApps]);

  /* ── Job CRUD ── */
  const openCreate = () => { setForm(BLANK); setModal({ open: true, editing: null }); };
  const openEdit = (j: Job) => {
    setForm({ title: j.title, department: j.department, location: j.location, type: j.type, status: j.status, description: j.description ?? "", requirements: j.requirements ?? "" });
    setModal({ open: true, editing: j });
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (modal.editing) {
        const updated = await apiFetch(`/api/admin/jobs/${modal.editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        setJobs(js => js.map(j => j.id === modal.editing!.id ? updated : j));
      } else {
        const created = await apiFetch("/api/admin/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        setJobs(js => [created, ...js]);
      }
      setModal({ open: false, editing: null });
    } catch {
      setError("Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiFetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      setJobs(js => js.filter(j => j.id !== id));
      setDeleteId(null);
    } catch {
      setError("Failed to delete job");
    }
  };

  /* ── Application status update ── */
  const updateAppStatus = async (id: number, status: Application["status"]) => {
    setUpdatingStatus(id);
    try {
      const updated: Application = await apiFetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setApps(a => a.map(x => x.id === id ? updated : x));
    } catch {
      setError("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteApp = async (id: number) => {
    try {
      await apiFetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      setApps(a => a.filter(x => x.id !== id));
      if (expandedApp === id) setExpandedApp(null);
    } catch {
      setError("Failed to delete application");
    }
  };

  const openCount = jobs.filter(j => j.status === "open").length;
  const filteredApps = appFilter === "all" ? apps : apps.filter(a => a.status === appFilter);
  const newAppsCount = apps.filter(a => a.status === "new").length;

  return (
    <div className="space-y-4 max-w-[1200px]">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/90 tracking-tight">Talent Pipeline</h1>
          <p className="text-[11px] text-white/35 mt-0.5">
            {tab === "listings"
              ? (jobsLoading ? "Loading…" : `${openCount} open position${openCount !== 1 ? "s" : ""} · ${jobs.length} total`)
              : (appsLoading ? "Loading…" : `${apps.length} application${apps.length !== 1 ? "s" : ""} received`)}
          </p>
        </div>
        {tab === "listings" && (
          <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Job
          </button>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
        <button
          onClick={() => setTab("listings")}
          className={`px-4 py-1.5 rounded-lg text-[12px] font-600 transition-all ${tab === "listings" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/70"}`}
        >
          Job Listings
        </button>
        <button
          onClick={() => setTab("applications")}
          className={`relative px-4 py-1.5 rounded-lg text-[12px] font-600 transition-all ${tab === "applications" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/70"}`}
        >
          Applications
          {newAppsCount > 0 && tab !== "applications" && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-700 flex items-center justify-center">
              {newAppsCount > 9 ? "9+" : newAppsCount}
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className="glass border border-red-500/20 rounded-lg px-4 py-2.5 text-[11px] text-red-400 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-white/30 hover:text-white/60"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* ══════════════════════════════ JOB LISTINGS TAB ══════════════════════════════ */}
      {tab === "listings" && (
        <div className="glass overflow-hidden">
          {jobsLoading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-white/25 text-[12px]">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading jobs…
            </div>
          ) : (
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Position", "Department", "Location", "Type", "Status", "Posted", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-600 tracking-widest text-white/30 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((j, i) => (
                  <tr key={j.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i === jobs.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-4 py-3 font-600 text-white/80 max-w-[200px]"><p className="truncate">{j.title}</p></td>
                    <td className="px-4 py-3 text-white/45">{j.department}</td>
                    <td className="px-4 py-3 text-white/35"><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{j.location}</span></td>
                    <td className="px-4 py-3 text-white/35"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{j.type}</span></td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-600 tracking-wide ${JOB_STATUS_STYLES[j.status]}`}>
                        {j.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/30 font-mono text-[10px]">{j.createdAt.slice(0, 10)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(j)} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors"><Pencil className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteId(j.id)} className="p-1.5 rounded-md text-white/30 hover:text-red-400/70 hover:bg-red-500/[0.06] transition-colors"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!jobsLoading && jobs.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-white/25 text-[12px]">No job listings yet.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ══════════════════════════════ APPLICATIONS TAB ══════════════════════════════ */}
      {tab === "applications" && (
        <div className="space-y-3">
          {/* Filter row */}
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", ...APP_STATUS_OPTIONS] as const).map(s => (
              <button
                key={s}
                onClick={() => setAppFilter(s)}
                className={`px-3 py-1 rounded-full text-[11px] font-600 transition-all border ${
                  appFilter === s
                    ? "bg-white text-black border-white"
                    : "border-white/[0.08] text-white/35 hover:text-white/60 hover:border-white/[0.15]"
                }`}
              >
                {s === "all" ? `All (${apps.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${apps.filter(a => a.status === s).length})`}
              </button>
            ))}
            <button onClick={() => void loadApps()} className="ml-auto p-1.5 rounded-lg text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-colors" title="Refresh">
              <Loader2 className={`w-3.5 h-3.5 ${appsLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {appsLoading ? (
            <div className="glass flex items-center justify-center py-16 gap-2 text-white/25 text-[12px]">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading applications…
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="glass flex flex-col items-center justify-center py-16 gap-2">
              <User className="w-8 h-8 text-white/10" />
              <p className="text-[12px] text-white/25">No applications {appFilter !== "all" ? `with status "${appFilter}"` : "yet"}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredApps.map(app => (
                <div key={app.id} className="glass overflow-hidden">
                  {/* Row summary */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                  >
                    <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-600 text-white/85 truncate">{app.name}</p>
                      <p className="text-[11px] text-white/35 truncate">{app.email}{app.jobTitle ? ` · ${app.jobTitle}` : ""}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-600 tracking-wide shrink-0 ${APP_STATUS_STYLES[app.status]}`}>
                      {app.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-white/25 font-mono shrink-0">{app.createdAt.slice(0, 10)}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/25 shrink-0 transition-transform ${expandedApp === app.id ? "rotate-180" : ""}`} />
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence initial={false}>
                    {expandedApp === app.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-white/[0.06]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {/* Contact info */}
                            <div className="space-y-2">
                              <p className="text-[10px] font-600 tracking-widest text-white/25 uppercase">Contact</p>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-[12px] text-white/55">
                                  <Mail className="w-3 h-3 text-white/25 shrink-0" />
                                  <a href={`mailto:${app.email}`} className="hover:text-white/85 transition-colors truncate">{app.email}</a>
                                </div>
                                {app.phone && (
                                  <div className="flex items-center gap-2 text-[12px] text-white/55">
                                    <Phone className="w-3 h-3 text-white/25 shrink-0" />
                                    <a href={`tel:${app.phone}`} className="hover:text-white/85 transition-colors">{app.phone}</a>
                                  </div>
                                )}
                                {app.linkedin && (
                                  <div className="flex items-center gap-2 text-[12px] text-white/55">
                                    <Linkedin className="w-3 h-3 text-white/25 shrink-0" />
                                    <a href={app.linkedin.startsWith("http") ? app.linkedin : `https://${app.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/85 transition-colors truncate">
                                      {app.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                                    </a>
                                  </div>
                                )}
                                {app.cvUrl && (
                                  <div className="flex items-center gap-2 text-[12px] text-white/55">
                                    <FileText className="w-3 h-3 text-white/25 shrink-0" />
                                    <a href={`/api/storage/cv-uploads/${app.cvUrl.replace(/^\/objects\//, "")}`} target="_blank" rel="noopener noreferrer"
                                      className="hover:text-white/85 transition-colors text-blue-400/70 hover:text-blue-400">
                                      Download CV
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Cover message */}
                            {app.message && (
                              <div className="space-y-2">
                                <p className="text-[10px] font-600 tracking-widest text-white/25 uppercase">Message</p>
                                <p className="text-[12px] text-white/50 leading-relaxed whitespace-pre-wrap">{app.message}</p>
                              </div>
                            )}
                          </div>

                          {/* Status + actions */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[10px] font-600 tracking-widest text-white/25 uppercase mr-1">Update Status:</p>
                            {APP_STATUS_OPTIONS.map(s => (
                              <button
                                key={s}
                                disabled={app.status === s || updatingStatus === app.id}
                                onClick={() => void updateAppStatus(app.id, s)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-600 border transition-all disabled:opacity-40 ${
                                  app.status === s
                                    ? APP_STATUS_STYLES[s]
                                    : "border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/[0.15]"
                                }`}
                              >
                                {updatingStatus === app.id && app.status !== s ? <Loader2 className="w-2.5 h-2.5 animate-spin inline" /> : s}
                              </button>
                            ))}
                            <button
                              onClick={() => void deleteApp(app.id)}
                              className="ml-auto p-1.5 rounded-md text-white/20 hover:text-red-400/70 hover:bg-red-500/[0.06] transition-colors"
                              title="Delete application"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Job edit modal ── */}
      <AnimatePresence>
        {modal.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} className="glass w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[15px] font-700 text-white/90">{modal.editing ? "Edit Job" : "New Job"}</h2>
                <button onClick={() => setModal({ open: false, editing: null })} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Job Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                    placeholder="e.g. Senior Developer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Department</label>
                    <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 outline-none focus:border-white/20 transition-colors">
                      {DEPTS.map(d => <option key={d} value={d} className="bg-[#1a1a1a]">{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Type</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 outline-none focus:border-white/20 transition-colors">
                      {TYPES.map(t => <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                      placeholder="Riyadh, KSA" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Job["status"] }))}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 outline-none focus:border-white/20 transition-colors">
                      <option value="open" className="bg-[#1a1a1a]">Open</option>
                      <option value="paused" className="bg-[#1a1a1a]">Paused</option>
                      <option value="closed" className="bg-[#1a1a1a]">Closed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors resize-none"
                    placeholder="Role summary…" />
                </div>
                <div>
                  <label className="block text-[10px] font-600 tracking-widest text-white/35 uppercase mb-1.5">Requirements (one per line)</label>
                  <textarea value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} rows={4}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors resize-none"
                    placeholder={`3+ years experience\nStrong communication skills…`} />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => void handleSave()} disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    {modal.editing ? "Save Changes" : "Post Job"}
                  </button>
                  <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete job confirm ── */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="glass w-full max-w-sm p-6 rounded-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-[14px] font-600 text-white/80 mb-1.5">Remove this listing?</p>
              <p className="text-[12px] text-white/35 mb-5">This cannot be undone.</p>
              <div className="flex items-center gap-3 justify-center">
                <button onClick={() => void handleDelete(deleteId)} className="px-4 py-2 rounded-lg bg-red-500/80 text-white text-[12px] font-600 hover:bg-red-500 transition-colors">Remove</button>
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
