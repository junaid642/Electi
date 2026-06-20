"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Filter, Download, LayoutGrid, List, Inbox, Trash2, Edit3, Building2, Mail, Phone, Globe, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { STAGE_COLOR } from "@/lib/utils";
import KanbanBoard from "@/components/crm/KanbanBoard";
import LeadModal from "@/components/crm/LeadModal";
import AddLeadModal from "@/components/crm/AddLeadModal";
import type { Lead, LeadStage } from "@/lib/types";

const STAGES: LeadStage[] = ["Incoming Lead","Initial Contact","Qualified","Discovery Meeting","Demo Scheduled","Proposal Preparation","Proposal Sent","Client Review","Negotiation","Waiting for Approval","Legal / Procurement","Won","Lost","Follow-Up Later","Strategic Opportunity","Partnership Potential"];

// ── Website Leads (API) ────────────────────────────────────────────────────────
interface ApiLead {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  source?: string | null;
  message: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

const LEAD_STATUSES = ["new", "read", "contacted", "qualified", "converted", "dismissed"] as const;

const LEAD_STATUS_COLOR: Record<string, string> = {
  new:       "bg-blue-500/15 text-blue-300 border-blue-500/20",
  read:      "bg-white/8 text-white/50 border-white/10",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  qualified: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  converted: "bg-green-500/15 text-green-300 border-green-500/20",
  dismissed: "bg-red-500/10 text-red-400/70 border-red-500/15",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CRMPage() {
  const { leads, deleteLead } = useStore();
  const { toast } = useToast();

  const [view, setView] = useState<"kanban" | "table" | "inbox">("kanban");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");

  // Pipeline modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [defaultStage, setDefaultStage] = useState<LeadStage>("Incoming Lead");

  // API / website leads state
  const [apiLeads, setApiLeads] = useState<ApiLead[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const fetchApiLeads = useCallback(async () => {
    setApiLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());
      if (sourceFilter.trim()) params.set("source", sourceFilter.trim());
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);
      const qs = params.toString();
      const res = await fetch(`/api/admin/leads${qs ? `?${qs}` : ""}`, { credentials: "include" });
      if (res.ok) {
        const data: ApiLead[] = await res.json();
        setApiLeads(data);
      }
    } finally {
      setApiLoading(false);
    }
  }, [statusFilter, search, sourceFilter, dateFrom, dateTo]);

  useEffect(() => {
    if (view === "inbox") fetchApiLeads();
  }, [view, fetchApiLeads]);

  async function updateLeadStatus(id: number, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApiLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
        toast("Lead status updated", "success");
      }
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteApiLead(id: number, name: string) {
    if (!confirm(`Delete lead from ${name}?`)) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setApiLeads((prev) => prev.filter((l) => l.id !== id));
      toast(`Lead deleted`, "error");
    }
  }

  function exportCsv() {
    const rows = [["ID","Name","Email","Phone","Company","Source","Status","Date","Message"].join(",")];
    apiLeads.forEach((l) => {
      rows.push([l.id, l.name, l.email, l.phone ?? "", l.company ?? "", l.source ?? "", l.status, fmtDate(l.createdAt), `"${(l.message ?? "").replace(/"/g, '""')}"`].join(","));
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "website-leads.csv"; a.click();
  }

  // Pipeline filtered list
  const filtered = leads.filter((l) =>
    (stageFilter === "All" || l.stage === stageFilter) &&
    (l.company.toLowerCase().includes(search.toLowerCase()) ||
     l.contact.toLowerCase().includes(search.toLowerCase()) ||
     l.industry.toLowerCase().includes(search.toLowerCase()))
  );

  const totals = {
    all:      leads.length,
    won:      leads.filter((l) => l.stage === "Won").length,
    active:   leads.filter((l) => !["Won","Lost","Follow-Up Later"].includes(l.stage)).length,
    avg:      leads.length ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0,
    followUp: leads.filter((l) => l.stage === "Follow-Up Later" || l.stage === "Waiting for Approval").length,
    incoming: apiLeads.filter((l) => l.status === "new").length,
  };

  function openAddLead(stage?: LeadStage) {
    setEditingLead(null);
    setDefaultStage(stage ?? "Incoming Lead");
    setAddOpen(true);
  }

  function openEditLead(lead: Lead) {
    setSelectedLead(null);
    setEditingLead(lead);
    setAddOpen(true);
  }

  function handleDelete(lead: Lead) {
    if (confirm(`Delete ${lead.company}?`)) {
      deleteLead(lead.id);
      toast(`${lead.company} deleted`, "error");
    }
  }

  return (
    <div className="space-y-4 max-w-[1600px]">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Pipeline",      value: totals.all,      sub: `+12 this week`,                                                                 color: "text-white/85"  },
          { label: "Won This Quarter",    value: totals.won,      sub: `${totals.all ? ((totals.won/totals.all)*100).toFixed(0) : 0}% conversion rate`, color: "text-white/85"  },
          { label: "Active in Pipeline",  value: totals.active,   sub: "Excluding won & lost",                                                          color: "text-white/85"  },
          { label: "Avg Lead Score",      value: totals.avg,      sub: "Out of 100",                                                                    color: "text-white/85"  },
        ].map((s) => (
          <div key={s.label} className="glass p-4">
            <p className="text-[10px] text-white/35 uppercase tracking-wide font-500">{s.label}</p>
            <p className={`text-[24px] font-700 font-display mt-0.5 ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/28 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass p-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 glass-sm px-3 py-1.5 flex-1 min-w-40 rounded-lg">
          <Search className="w-3 h-3 text-white/30 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={view === "inbox" ? "Search name, email, company…" : "Search leads, companies, industries…"}
            className="bg-transparent text-[11px] text-white/65 placeholder-white/22 outline-none flex-1"
          />
        </div>

        {/* Status + source + date filters for inbox */}
        {view === "inbox" && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status pills */}
            <div className="flex items-center gap-1 flex-wrap">
              {["All", ...LEAD_STATUSES].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-500 capitalize transition-colors ${statusFilter === s ? "bg-white/[0.1] text-white/90" : "text-white/38 hover:text-white/65 hover:bg-white/[0.04]"}`}>
                  {s}
                </button>
              ))}
            </div>
            {/* Source filter */}
            <input
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              placeholder="Source…"
              className="bg-transparent border border-white/[0.07] rounded-md px-2 py-1 text-[10px] text-white/55 placeholder-white/20 outline-none focus:border-white/20 w-28"
            />
            {/* Date range */}
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="bg-transparent border border-white/[0.07] rounded-md px-2 py-1 text-[10px] text-white/45 outline-none focus:border-white/20 w-32 [color-scheme:dark]" />
            <span className="text-white/20 text-[10px]">→</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="bg-transparent border border-white/[0.07] rounded-md px-2 py-1 text-[10px] text-white/45 outline-none focus:border-white/20 w-32 [color-scheme:dark]" />
            {(sourceFilter || dateFrom || dateTo) && (
              <button onClick={() => { setSourceFilter(""); setDateFrom(""); setDateTo(""); }}
                className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
                Clear
              </button>
            )}
          </div>
        )}

        {/* Stage filter for table view */}
        {view === "table" && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {["All", ...STAGES.slice(0, 8)].map((s) => (
              <button key={s} onClick={() => setStageFilter(s)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-500 transition-colors ${stageFilter === s ? "bg-white/[0.1] text-white/90" : "text-white/38 hover:text-white/65 hover:bg-white/[0.04]"}`}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* View toggle */}
          <div className="flex items-center glass-sm rounded-lg overflow-hidden border border-white/[0.06]">
            <button onClick={() => setView("kanban")} title="Kanban" className={`p-2 transition-colors ${view === "kanban" ? "bg-white/[0.08] text-white/80" : "text-white/30 hover:text-white/55"}`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setView("table")} title="Table" className={`p-2 transition-colors ${view === "table" ? "bg-white/[0.08] text-white/80" : "text-white/30 hover:text-white/55"}`}>
              <List className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setView("inbox")} title="Website Leads" className={`p-2 transition-colors relative ${view === "inbox" ? "bg-white/[0.08] text-white/80" : "text-white/30 hover:text-white/55"}`}>
              <Inbox className="w-3.5 h-3.5" />
              {totals.incoming > 0 && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </button>
          </div>

          {view !== "inbox" && (
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white/65 text-[11px] px-2.5 py-1.5 glass-sm rounded-lg transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          )}
          {view === "inbox" && (
            <button onClick={exportCsv} className="flex items-center gap-1.5 text-white/40 hover:text-white/65 text-[11px] px-2.5 py-1.5 glass-sm rounded-lg transition-colors">
              <Download className="w-3 h-3" /> Export
            </button>
          )}
          {view !== "inbox" && (
            <button onClick={() => openAddLead()} className="flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white/80 text-[11px] px-3 py-1.5 rounded-lg transition-colors font-500">
              <Plus className="w-3 h-3" /> New Lead
            </button>
          )}
          {view === "inbox" && (
            <button onClick={fetchApiLeads} className="flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white/80 text-[11px] px-3 py-1.5 rounded-lg transition-colors font-500">
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Kanban View */}
      {view === "kanban" && (
        <KanbanBoard onLeadClick={(lead) => setSelectedLead(lead)} onAddLead={openAddLead} />
      )}

      {/* Table View (pipeline) */}
      {view === "table" && (
        <div className="glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Company","Contact","Industry","City","Stage","Score","Assigned","Date",""].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[9px] font-600 tracking-[0.14em] uppercase text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center text-[12px] text-white/25">No leads match your search</td>
                </tr>
              )}
              {filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Building2 className="w-3 h-3 text-white/40" />
                      </div>
                      <span className="text-[11px] font-500 text-white/80">{lead.company}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="text-[11px] text-white/65">{lead.contact}</p>
                    <p className="text-[9px] text-white/28">{lead.designation}</p>
                  </td>
                  <td className="px-3 py-2.5"><span className="badge badge-white">{lead.industry}</span></td>
                  <td className="px-3 py-2.5 text-[11px] text-white/50">{lead.city}</td>
                  <td className="px-3 py-2.5"><span className={`badge ${STAGE_COLOR[lead.stage] ?? "badge-white"}`}>{lead.stage}</span></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 bg-white/[0.06] rounded-full w-12 overflow-hidden">
                        <div className={`h-full rounded-full ${lead.score >= 80 ? "bg-green-500/60" : lead.score >= 60 ? "bg-amber-500/60" : "bg-red-500/60"}`} style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-[10px] font-600 text-white/55 font-mono w-6">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] text-white/45">{lead.assigned}</td>
                  <td className="px-3 py-2.5 text-[10px] text-white/28 font-mono">{lead.lastContact}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openEditLead(lead)} className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-white/65 hover:bg-white/[0.06] transition-colors">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDelete(lead)} className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-[10px] text-white/28">Showing {filtered.length} of {leads.length} leads</p>
          </div>
        </div>
      )}

      {/* Website Leads Inbox (API-backed) */}
      {view === "inbox" && (
        <div className="glass overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
            <div>
              <p className="text-[12px] font-600 text-white/80">Website Contact Submissions</p>
              <p className="text-[10px] text-white/30 mt-0.5">Leads submitted through the X360 website contact form</p>
            </div>
            {apiLeads.filter((l) => l.status === "new").length > 0 && (
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-600 px-2 py-0.5 rounded-full border border-blue-500/25">
                {apiLeads.filter((l) => l.status === "new").length} new
              </span>
            )}
          </div>

          {apiLoading ? (
            <div className="py-16 text-center text-[12px] text-white/25">Loading…</div>
          ) : apiLeads.length === 0 ? (
            <div className="py-16 text-center">
              <Inbox className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-[12px] text-white/25">No submissions yet</p>
              <p className="text-[10px] text-white/15 mt-1">Leads submitted via the website will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {apiLeads.map((lead) => (
                <div key={lead.id} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                  {/* Row header */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-white/35" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[12px] font-600 text-white/85">{lead.name}</span>
                        {lead.company && (
                          <span className="text-[10px] text-white/35 flex items-center gap-1">
                            <Building2 className="w-2.5 h-2.5" />{lead.company}
                          </span>
                        )}
                        {lead.source && (
                          <span className="badge badge-white capitalize">{lead.source}</span>
                        )}
                        <span className={`badge border capitalize ${LEAD_STATUS_COLOR[lead.status] ?? "badge-white"}`}>
                          {lead.status}
                        </span>
                        <span className="text-[9px] text-white/22 font-mono ml-auto">{fmtDate(lead.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <a href={`mailto:${lead.email}`} className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" />{lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" />{lead.phone}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Status dropdown */}
                      <div className="relative group">
                        <button
                          disabled={updatingId === lead.id}
                          className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 px-2 py-1 glass-sm rounded-md transition-colors"
                        >
                          {updatingId === lead.id ? "…" : "Status"} <ChevronDown className="w-2.5 h-2.5" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 z-20 bg-[#111] border border-white/10 rounded-lg overflow-hidden shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity w-32">
                          {LEAD_STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateLeadStatus(lead.id, s)}
                              className={`w-full text-left px-3 py-1.5 text-[10px] capitalize transition-colors hover:bg-white/[0.06] ${lead.status === s ? "text-white/80 font-600" : "text-white/45"}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Expand message */}
                      <button
                        onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                        className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-white/65 hover:bg-white/[0.06] transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => deleteApiLead(lead.id, lead.name)}
                        className="w-6 h-6 rounded flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded message */}
                  {expandedId === lead.id && (
                    <div className="mt-2.5 ml-10 p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                      <p className="text-[10px] text-white/35 uppercase tracking-wide font-500 mb-1.5">Message</p>
                      <p className="text-[11px] text-white/60 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                      {lead.notes && (
                        <>
                          <p className="text-[10px] text-white/35 uppercase tracking-wide font-500 mt-2.5 mb-1.5">Notes</p>
                          <p className="text-[11px] text-white/50 leading-relaxed">{lead.notes}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-[10px] text-white/28">Showing {apiLeads.length} submissions</p>
            {apiLeads.length > 0 && (
              <button onClick={exportCsv} className="text-[10px] text-white/35 hover:text-white/60 transition-colors flex items-center gap-1">
                <Download className="w-2.5 h-2.5" /> Export CSV
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      <LeadModal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
        onEdit={() => { if (selectedLead) openEditLead(selectedLead); }}
      />

      {/* Add / Edit Lead Modal */}
      <AddLeadModal
        open={addOpen}
        onClose={() => { setAddOpen(false); setEditingLead(null); }}
        lead={editingLead}
        defaultStage={defaultStage}
      />
    </div>
  );
}
