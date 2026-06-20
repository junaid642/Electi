import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  KanbanSquare, List, Inbox, Plus, Search, Download, Filter,
  TrendingUp, Users, DollarSign, Target, ChevronDown,
  Building2, Mail, Phone, Star, Trash2, Eye, ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCrm, CrmProvider } from "@/lib/crm-store";
import { STAGE_COLOR, STAGES } from "@/lib/crm-types";
import KanbanBoard from "@/components/crm/KanbanBoard";
import LeadModal from "@/components/crm/LeadModal";
import AddLeadModal from "@/components/crm/AddLeadModal";
import type { CrmLead, LeadStage } from "@/lib/crm-types";
import { useListLeads } from "@workspace/api-client-react";
import { format } from "date-fns";

type View = "kanban" | "table" | "inbox";

function CrmInner() {
  const { leads, deleteLead } = useCrm();
  const [view, setView] = useState<View>("kanban");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<LeadStage | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | "High" | "Medium" | "Low">("All");
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [editLead, setEditLead] = useState<CrmLead | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addDefaultStage, setAddDefaultStage] = useState<LeadStage>("Incoming Lead");
  const [modalOpen, setModalOpen] = useState(false);
  const [sortField, setSortField] = useState<"company" | "score" | "value" | "lastContact">("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const { data: inboxLeads, isLoading: inboxLoading } = useListLeads({
    status: undefined, search: view === "inbox" ? (search || undefined) : undefined,
  });

  const kpis = useMemo(() => {
    const total = leads.length;
    const won = leads.filter((l) => l.stage === "Won").length;
    const totalValue = leads.reduce((acc, l) => acc + (l.value ?? 0), 0);
    const avgScore = leads.length ? Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length) : 0;
    return { total, won, totalValue, avgScore };
  }, [leads]);

  const filtered = useMemo(() => {
    let list = [...leads];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((l) => l.company.toLowerCase().includes(q) || l.contact.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
    }
    if (stageFilter !== "All") list = list.filter((l) => l.stage === stageFilter);
    if (priorityFilter !== "All") list = list.filter((l) => l.priority === priorityFilter);
    list.sort((a, b) => {
      let va: number | string = a[sortField] ?? "";
      let vb: number | string = b[sortField] ?? "";
      if (sortDir === "asc") return va < vb ? -1 : va > vb ? 1 : 0;
      return va > vb ? -1 : va < vb ? 1 : 0;
    });
    return list;
  }, [leads, search, stageFilter, priorityFilter, sortField, sortDir]);

  function openLead(lead: CrmLead) { setSelectedLead(lead); setModalOpen(true); }
  function openAdd(stage: LeadStage = "Incoming Lead") { setAddDefaultStage(stage); setEditLead(null); setAddOpen(true); }
  function openEdit() { if (selectedLead) { setEditLead(selectedLead); setModalOpen(false); setAddOpen(true); } }

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  }

  function exportCSV() {
    const headers = ["Company", "Contact", "Email", "Phone", "Industry", "Stage", "Priority", "Score", "Value (SAR)", "Assigned", "Last Contact", "Next Follow-up"];
    const rows = filtered.map((l) => [l.company, l.contact, l.email, l.phone, l.industry, l.stage, l.priority, l.score, l.value, l.assigned, l.lastContact, l.nextFollowUp]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })), download: "electi-crm.csv" });
    a.click();
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">CLIENT PIPELINE</h1>
          <p className="text-white/40 mt-1 text-sm">AI agent sales intelligence and CRM</p>
        </div>
        <Button onClick={() => openAdd()} className="bg-white text-black hover:bg-white/90 font-semibold text-[11px] h-10 px-5 gap-2">
          <Plus className="w-4 h-4" /> New Lead
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Pipeline",   value: kpis.total,                                            icon: Users,      color: "text-blue-400"   },
          { label: "Won Deals",        value: kpis.won,                                              icon: Target,     color: "text-green-400"  },
          { label: "Pipeline Value",   value: `SAR ${(kpis.totalValue / 1000000).toFixed(1)}M`,      icon: DollarSign, color: "text-amber-400"  },
          { label: "Avg Lead Score",   value: `${kpis.avgScore}/100`,                                icon: TrendingUp, color: "text-purple-400" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] text-white/35 uppercase tracking-wide">{k.label}</p>
                <Icon className={`w-4 h-4 ${k.color} opacity-70`} />
              </div>
              <p className={`text-[20px] font-bold font-display ${k.color}`}>{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* View toggle + filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          {(["kanban", "table", "inbox"] as View[]).map((v) => {
            const icons = { kanban: KanbanSquare, table: List, inbox: Inbox };
            const labels = { kanban: "Kanban", table: "Table", inbox: "Inbox" };
            const Icon = icons[v];
            return (
              <button key={v} onClick={() => setView(v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-medium transition-all ${view === v ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/65"}`}>
                <Icon className="w-3.5 h-3.5" />{labels[v]}
              </button>
            );
          })}
        </div>

        {view !== "kanban" && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads…"
              className="pl-9 h-10 bg-white/[0.03] border-white/[0.07] text-sm placeholder:text-white/20 focus:border-white/20" />
          </div>
        )}

        {view === "table" && (
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 bg-white/[0.03] border-white/[0.07] text-white/55 hover:text-white/80 gap-2 text-[11px]">
                  <Filter className="w-3 h-3" /> {stageFilter === "All" ? "All Stages" : stageFilter} <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0a0a0a] border-white/[0.08] max-h-64 overflow-y-auto">
                <DropdownMenuItem onClick={() => setStageFilter("All")} className="text-[11px] text-white/65 hover:text-white focus:bg-white/[0.05]">All Stages</DropdownMenuItem>
                {STAGES.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => setStageFilter(s)} className="text-[11px] text-white/65 hover:text-white focus:bg-white/[0.05]">{s}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 bg-white/[0.03] border-white/[0.07] text-white/55 hover:text-white/80 gap-2 text-[11px]">
                  <Filter className="w-3 h-3" /> {priorityFilter} <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0a0a0a] border-white/[0.08]">
                {["All", "High", "Medium", "Low"].map((p) => (
                  <DropdownMenuItem key={p} onClick={() => setPriorityFilter(p as typeof priorityFilter)} className="text-[11px] text-white/65 hover:text-white focus:bg-white/[0.05]">{p}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={exportCSV} className="h-10 text-white/40 hover:text-white/70 border border-white/[0.07] text-[11px] gap-2">
              <Download className="w-3 h-3" /> CSV
            </Button>
          </div>
        )}
      </div>

      {/* Views */}
      <AnimatePresence mode="wait">
        {view === "kanban" && (
          <motion.div key="kanban" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <KanbanBoard onLeadClick={openLead} onAddLead={openAdd} />
          </motion.div>
        )}

        {view === "table" && (
          <motion.div key="table" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11">Company</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11">Stage</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11">Industry</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11 cursor-pointer select-none" onClick={() => toggleSort("score")}>
                    <span className="flex items-center gap-1">Score <ArrowUpDown className="w-2.5 h-2.5" /></span>
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11 cursor-pointer select-none" onClick={() => toggleSort("value")}>
                    <span className="flex items-center gap-1">Value <ArrowUpDown className="w-2.5 h-2.5" /></span>
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11">Assigned</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11">Next Follow-up</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-normal h-11 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-3 text-white/25">
                        <Users className="w-10 h-10 opacity-20" />
                        <span className="text-[11px] uppercase tracking-widest">No leads found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filtered.map((lead) => (
                  <TableRow key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => openLead(lead)}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-white/35" />
                        </div>
                        <div>
                          <div className="text-[12px] font-semibold text-white/85">{lead.company}</div>
                          <div className="text-[10px] text-white/38 mt-0.5">{lead.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] border ${STAGE_COLOR[lead.stage] ?? "bg-white/5 text-white/40 border-white/10"}`}>{lead.stage}</span>
                    </TableCell>
                    <TableCell className="text-[11px] text-white/50">{lead.industry}</TableCell>
                    <TableCell>
                      <span className={`font-bold font-mono text-[12px] ${lead.score >= 80 ? "text-green-400" : lead.score >= 60 ? "text-amber-400" : "text-red-400"}`}>{lead.score}</span>
                    </TableCell>
                    <TableCell className="text-[11px] text-white/55 font-mono">SAR {(lead.value / 1000).toFixed(0)}K</TableCell>
                    <TableCell className="text-[11px] text-white/45">{lead.assigned}</TableCell>
                    <TableCell className="font-mono text-[10px] text-white/35">{lead.nextFollowUp || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/35 hover:text-primary hover:bg-primary/10" onClick={() => openLead(lead)}>
                          <Eye className="h-3 h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/35 hover:text-red-400 hover:bg-red-400/10" onClick={() => { if (confirm(`Delete ${lead.company}?`)) deleteLead(lead.id); }}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}

        {view === "inbox" && (
          <motion.div key="inbox" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-4">
              <p className="text-[11px] text-white/40">Website contact form submissions from Electi platform.</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inbox…"
                  className="pl-9 h-10 w-64 bg-white/[0.03] border-white/[0.07] text-sm placeholder:text-white/20 focus:border-white/20" />
              </div>
            </div>
            {inboxLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : !inboxLeads?.length ? (
              <div className="flex flex-col items-center justify-center h-32 text-white/25 gap-3">
                <Inbox className="w-10 h-10 opacity-20" />
                <span className="text-[11px] uppercase tracking-widest">No inbox submissions</span>
              </div>
            ) : (
              <div className="space-y-2">
                {inboxLeads.filter((l) => {
                  if (!search) return true;
                  const q = search.toLowerCase();
                  return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? "").toLowerCase().includes(q);
                }).map((lead) => (
                  <div key={lead.id} className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl flex items-center gap-4 hover:bg-white/[0.03] transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <span className="text-[14px] font-bold text-white/50">{lead.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[12px] font-semibold text-white/80">{lead.name}</span>
                        {lead.company && <span className="text-[10px] text-white/40">· {lead.company}</span>}
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] border ${lead.status === "new" ? "bg-blue-500/15 text-blue-300 border-blue-500/20" : "bg-white/5 text-white/40 border-white/8"}`}>{lead.status}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-[10px] text-blue-400/80 hover:text-blue-300 transition-colors">
                          <Mail className="w-2.5 h-2.5" />{lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-[10px] text-green-400/80 hover:text-green-300 transition-colors">
                            <Phone className="w-2.5 h-2.5" />{lead.phone}
                          </a>
                        )}
                      </div>
                      {lead.message && (
                        <p className="text-[11px] text-white/38 mt-1.5 line-clamp-2 leading-relaxed">{lead.message}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-white/25 font-mono">{format(new Date(lead.createdAt), "MMM dd, yyyy")}</div>
                      <Button variant="ghost" size="sm" className="mt-2 h-7 px-2.5 text-[10px] text-white/40 hover:text-white/70 opacity-0 group-hover:opacity-100 transition-all bg-white/[0.04] border border-white/[0.06]">
                        + Add to Pipeline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} lead={selectedLead} onEdit={openEdit} />
      <AddLeadModal open={addOpen} onClose={() => setAddOpen(false)} lead={editLead} defaultStage={addDefaultStage} />
    </div>
  );
}

export default function CrmPage() {
  return <CrmInner />;
}
