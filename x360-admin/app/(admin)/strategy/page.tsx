"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import Modal from "@/components/ui/Modal";
import {
  TrendingUp, Target, BarChart3, Megaphone, Map, Plus,
  Trash2, CheckCircle2, Clock, AlertCircle,
  Building2, Users, Globe,
} from "lucide-react";

const TABS = [
  { label: "Target Industries",   icon: Target    },
  { label: "Monthly Goals",       icon: BarChart3  },
  { label: "Quarterly Board",     icon: TrendingUp },
  { label: "Marketing Campaigns", icon: Megaphone  },
  { label: "Expansion Roadmap",   icon: Map        },
];

const IMPORTANCE_COLOR: Record<string, string> = {
  Critical: "badge-red", High: "badge-amber", Medium: "badge-cyan",
};
const STATUS_COLOR: Record<string, string> = {
  Active: "badge-green", Planning: "badge-amber", "On Hold": "badge-white",
};
const Q_COLOR: Record<string, { bg: string; border: string; dot: string }> = {
  Q1: { bg: "bg-blue-500/[0.03]",   border: "border-blue-500/20",   dot: "bg-blue-400"   },
  Q2: { bg: "bg-purple-500/[0.03]", border: "border-purple-500/20", dot: "bg-purple-400" },
  Q3: { bg: "bg-amber-500/[0.03]",  border: "border-amber-500/20",  dot: "bg-amber-400"  },
  Q4: { bg: "bg-green-500/[0.03]",  border: "border-green-500/20",  dot: "bg-green-400"  },
};
const CARD_STATUS: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  Done:          { icon: CheckCircle2, color: "text-green-400" },
  "In Progress": { icon: Clock,        color: "text-amber-400" },
  Planned:       { icon: AlertCircle,  color: "text-white/35"  },
};

/* ── shared field styles ── */
const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors";
const sel = `${inp} appearance-none`;
const lbl = "block text-[9px] font-600 uppercase tracking-wide text-white/35 mb-1";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={lbl}>{label}</label>{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

/* ── sub-components ── */
function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="glass p-4">
      <p className="text-[9px] font-600 text-white/35 uppercase tracking-wide">{label}</p>
      <p className={`text-[24px] font-700 font-display mt-1 ${color ?? "text-white/80"}`}>{value}</p>
      {sub && <p className="text-[10px] text-white/30 mt-0.5">{sub}</p>}
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const bar = pct >= 100 ? "bg-green-400" : pct >= 75 ? "bg-amber-400" : pct >= 50 ? "bg-blue-400" : "bg-white/30";
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[9px] text-white/40">{value} / {max}</span>
        <span className={`text-[9px] font-700 ${pct >= 100 ? "text-green-400" : pct >= 75 ? "text-amber-400" : "text-white/55"}`}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06]">
        <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ADD MODALS
═══════════════════════════════════════════════════════════════════════════ */

/* ── Add Target Industry ── */
const BLANK_IND = { name:"", city:"", marketSize:"", opportunityScore:75, competition:"Medium" as const, projectedRevenue:"", importance:"High" as const, manager:"", budget:"", roi:"", status:"Planning" as const };

function AddIndustryModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (v: typeof BLANK_IND) => void }) {
  const [f, setF] = useState(BLANK_IND);
  const set = (k: keyof typeof BLANK_IND, v: string | number) => setF(p => ({ ...p, [k]: v }));
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim() || !f.city.trim()) return;
    onSave(f);
    setF(BLANK_IND);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Target Industry" subtitle="Define a new industry to pursue" size="md">
      <form onSubmit={submit} className="p-5 space-y-3">
        <Row>
          <Field label="Industry Name *"><input className={inp} value={f.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Healthcare AI" required /></Field>
          <Field label="City *"><input className={inp} value={f.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Riyadh" required /></Field>
        </Row>
        <Row>
          <Field label="Market Size"><input className={inp} value={f.marketSize} onChange={e => set("marketSize", e.target.value)} placeholder="e.g. SAR 55B" /></Field>
          <Field label="Opportunity Score (0–100)"><input className={inp} type="number" min={0} max={100} value={f.opportunityScore} onChange={e => set("opportunityScore", +e.target.value)} /></Field>
        </Row>
        <Row>
          <Field label="Projected Revenue"><input className={inp} value={f.projectedRevenue} onChange={e => set("projectedRevenue", e.target.value)} placeholder="e.g. SAR 9.4M" /></Field>
          <Field label="Budget"><input className={inp} value={f.budget} onChange={e => set("budget", e.target.value)} placeholder="e.g. SAR 160K" /></Field>
        </Row>
        <Row>
          <Field label="Expected ROI"><input className={inp} value={f.roi} onChange={e => set("roi", e.target.value)} placeholder="e.g. 5,775%" /></Field>
          <Field label="Manager"><input className={inp} value={f.manager} onChange={e => set("manager", e.target.value)} placeholder="e.g. Ahmad S." /></Field>
        </Row>
        <Row>
          <Field label="Competition">
            <select className={sel} value={f.competition} onChange={e => set("competition", e.target.value as typeof f.competition)}>
              {["Low","Medium","High"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Importance">
            <select className={sel} value={f.importance} onChange={e => set("importance", e.target.value as typeof f.importance)}>
              {["Critical","High","Medium"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        </Row>
        <Field label="Status">
          <select className={sel} value={f.status} onChange={e => set("status", e.target.value as typeof f.status)}>
            {["Active","Planning","On Hold"].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.05]">
          <button type="button" onClick={onClose} className="glass px-4 py-2 text-[11px] text-white/45 hover:text-white/70 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="glass px-4 py-2 text-[11px] text-white/80 hover:text-white font-600 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all">Add Industry</button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Add Monthly Goal ── */
const BLANK_GOAL = { month:"", leadTarget:0, leadActual:0, proposalTarget:0, proposalActual:0, clientTarget:0, clientActual:0 };

function AddGoalModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (v: typeof BLANK_GOAL) => void }) {
  const [f, setF] = useState(BLANK_GOAL);
  const set = (k: keyof typeof BLANK_GOAL, v: string | number) => setF(p => ({ ...p, [k]: v }));
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.month.trim()) return;
    onSave(f);
    setF(BLANK_GOAL);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Monthly Goal" subtitle="Set targets and actuals for a month" size="md">
      <form onSubmit={submit} className="p-5 space-y-3">
        <Field label="Month *"><input className={inp} value={f.month} onChange={e => set("month", e.target.value)} placeholder="e.g. July 2025" required /></Field>
        <Row>
          <Field label="Lead Target"><input className={inp} type="number" min={0} value={f.leadTarget} onChange={e => set("leadTarget", +e.target.value)} /></Field>
          <Field label="Lead Actual"><input className={inp} type="number" min={0} value={f.leadActual} onChange={e => set("leadActual", +e.target.value)} /></Field>
        </Row>
        <Row>
          <Field label="Proposal Target"><input className={inp} type="number" min={0} value={f.proposalTarget} onChange={e => set("proposalTarget", +e.target.value)} /></Field>
          <Field label="Proposal Actual"><input className={inp} type="number" min={0} value={f.proposalActual} onChange={e => set("proposalActual", +e.target.value)} /></Field>
        </Row>
        <Row>
          <Field label="Client Target"><input className={inp} type="number" min={0} value={f.clientTarget} onChange={e => set("clientTarget", +e.target.value)} /></Field>
          <Field label="Client Actual"><input className={inp} type="number" min={0} value={f.clientActual} onChange={e => set("clientActual", +e.target.value)} /></Field>
        </Row>
        <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.05]">
          <button type="button" onClick={onClose} className="glass px-4 py-2 text-[11px] text-white/45 hover:text-white/70 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="glass px-4 py-2 text-[11px] text-white/80 hover:text-white font-600 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all">Add Goal</button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Add Strategy Card ── */
const BLANK_CARD = { title:"", quarter:"Q1" as const, category:"Marketing" as const, description:"", owner:"", status:"Planned" as const };

function AddCardModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (v: typeof BLANK_CARD) => void }) {
  const [f, setF] = useState(BLANK_CARD);
  const set = (k: keyof typeof BLANK_CARD, v: string) => setF(p => ({ ...p, [k]: v }));
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.title.trim()) return;
    onSave(f);
    setF(BLANK_CARD);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Strategy Card" subtitle="Add an initiative to the quarterly board" size="md">
      <form onSubmit={submit} className="p-5 space-y-3">
        <Field label="Title *"><input className={inp} value={f.title} onChange={e => set("title", e.target.value)} placeholder="e.g. UAE Market Entry" required /></Field>
        <Field label="Description"><textarea className={`${inp} resize-none`} rows={3} value={f.description} onChange={e => set("description", e.target.value)} placeholder="Describe the initiative..." /></Field>
        <Row>
          <Field label="Quarter">
            <select className={sel} value={f.quarter} onChange={e => set("quarter", e.target.value as typeof f.quarter)}>
              {["Q1","Q2","Q3","Q4"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Category">
            <select className={sel} value={f.category} onChange={e => set("category", e.target.value as typeof f.category)}>
              {["Industry","Marketing","Tech","HR","Partnership","Government","Expansion"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        </Row>
        <Row>
          <Field label="Owner"><input className={inp} value={f.owner} onChange={e => set("owner", e.target.value)} placeholder="e.g. Ahmad S." /></Field>
          <Field label="Status">
            <select className={sel} value={f.status} onChange={e => set("status", e.target.value as typeof f.status)}>
              {["Planned","In Progress","Done"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        </Row>
        <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.05]">
          <button type="button" onClick={onClose} className="glass px-4 py-2 text-[11px] text-white/45 hover:text-white/70 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="glass px-4 py-2 text-[11px] text-white/80 hover:text-white font-600 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all">Add Card</button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Add Campaign ── */
const BLANK_CAM = { name:"", platform:"", budget:"", audience:"", expectedLeads:0, conversionRate:"", roi:"", manager:"", status:"Planned" as const };

function AddCampaignModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (v: typeof BLANK_CAM) => void }) {
  const [f, setF] = useState(BLANK_CAM);
  const set = (k: keyof typeof BLANK_CAM, v: string | number) => setF(p => ({ ...p, [k]: v }));
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return;
    onSave(f);
    setF(BLANK_CAM);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Campaign" subtitle="Create a new marketing campaign" size="md">
      <form onSubmit={submit} className="p-5 space-y-3">
        <Field label="Campaign Name *"><input className={inp} value={f.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Riyadh Real Estate Q3" required /></Field>
        <Row>
          <Field label="Platform"><input className={inp} value={f.platform} onChange={e => set("platform", e.target.value)} placeholder="e.g. LinkedIn, Google Ads" /></Field>
          <Field label="Manager"><input className={inp} value={f.manager} onChange={e => set("manager", e.target.value)} placeholder="e.g. Sarah M." /></Field>
        </Row>
        <Row>
          <Field label="Budget"><input className={inp} value={f.budget} onChange={e => set("budget", e.target.value)} placeholder="e.g. SAR 45K" /></Field>
          <Field label="Expected Leads"><input className={inp} type="number" min={0} value={f.expectedLeads} onChange={e => set("expectedLeads", +e.target.value)} /></Field>
        </Row>
        <Field label="Target Audience"><input className={inp} value={f.audience} onChange={e => set("audience", e.target.value)} placeholder="e.g. Real Estate Directors — KSA" /></Field>
        <Row>
          <Field label="Conversion Rate"><input className={inp} value={f.conversionRate} onChange={e => set("conversionRate", e.target.value)} placeholder="e.g. 12%" /></Field>
          <Field label="Expected ROI"><input className={inp} value={f.roi} onChange={e => set("roi", e.target.value)} placeholder="e.g. 680%" /></Field>
        </Row>
        <Field label="Status">
          <select className={sel} value={f.status} onChange={e => set("status", e.target.value as typeof f.status)}>
            {["Active","Planned","Ended"].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.05]">
          <button type="button" onClick={onClose} className="glass px-4 py-2 text-[11px] text-white/45 hover:text-white/70 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="glass px-4 py-2 text-[11px] text-white/80 hover:text-white font-600 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all">Add Campaign</button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Add Expansion Target ── */
const BLANK_EXP = { city:"", country:"", launchDate:"", investment:"", readiness:20, status:"Research" as const };

function AddExpansionModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (v: typeof BLANK_EXP) => void }) {
  const [f, setF] = useState(BLANK_EXP);
  const set = (k: keyof typeof BLANK_EXP, v: string | number) => setF(p => ({ ...p, [k]: v }));
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.city.trim()) return;
    onSave(f);
    setF(BLANK_EXP);
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Expansion Target" subtitle="Add a new city or market to the roadmap" size="sm">
      <form onSubmit={submit} className="p-5 space-y-3">
        <Row>
          <Field label="City *"><input className={inp} value={f.city} onChange={e => set("city", e.target.value)} placeholder="e.g. Dubai" required /></Field>
          <Field label="Country"><input className={inp} value={f.country} onChange={e => set("country", e.target.value)} placeholder="e.g. UAE" /></Field>
        </Row>
        <Row>
          <Field label="Investment"><input className={inp} value={f.investment} onChange={e => set("investment", e.target.value)} placeholder="e.g. SAR 3M" /></Field>
          <Field label="Launch Date"><input className={inp} value={f.launchDate} onChange={e => set("launchDate", e.target.value)} placeholder="e.g. Q4 2025" /></Field>
        </Row>
        <Field label={`Market Readiness: ${f.readiness}%`}>
          <input type="range" min={0} max={100} value={f.readiness} onChange={e => set("readiness", +e.target.value)}
            className="w-full h-1.5 accent-white/60 cursor-pointer mt-1" />
        </Field>
        <Field label="Status">
          <select className={sel} value={f.status} onChange={e => set("status", e.target.value as typeof f.status)}>
            {["Research","Planning","Active"].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.05]">
          <button type="button" onClick={onClose} className="glass px-4 py-2 text-[11px] text-white/45 hover:text-white/70 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="glass px-4 py-2 text-[11px] text-white/80 hover:text-white font-600 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all">Add Target</button>
        </div>
      </form>
    </Modal>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function StrategyPage() {
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);

  const {
    targetIndustries, monthlyGoals, strategyCards, campaigns, expansionTargets,
    deleteTargetIndustry, updateStrategyCard,
    addTargetIndustry, addMonthlyGoal, addStrategyCard, addCampaign, addExpansionTarget,
  } = useStore();

  const quarters = ["Q1","Q2","Q3","Q4"] as const;

  const totalLeadTarget   = monthlyGoals.reduce((s, m) => s + m.leadTarget, 0);
  const totalLeadActual   = monthlyGoals.reduce((s, m) => s + m.leadActual, 0);
  const totalClientTarget = monthlyGoals.reduce((s, m) => s + m.clientTarget, 0);
  const totalClientActual = monthlyGoals.reduce((s, m) => s + m.clientActual, 0);

  const TAB_LABEL = ["Industry", "Goal", "Card", "Campaign", "Location"];

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/85">Growth Strategy & Market Planning</h1>
          <p className="text-[11px] text-white/35 mt-0.5">CEO strategic board — growth planning, market targeting & expansion roadmap</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="glass px-3 py-1.5 text-[11px] text-white/55 hover:text-white/80 flex items-center gap-1.5 transition-colors rounded-xl border border-white/[0.08] hover:border-white/20"
        >
          <Plus className="w-3.5 h-3.5" /> Add {TAB_LABEL[tab]}
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Target Industries"  value={targetIndustries.length} sub={`${targetIndustries.filter(i => i.status === "Active").length} active`} />
        <StatCard label="YTD Lead Progress"  value={`${totalLeadActual}/${totalLeadTarget}`} sub="total leads this year" />
        <StatCard label="Client Acquisition" value={`${totalClientActual}/${totalClientTarget}`} sub="clients acquired" />
        <StatCard label="Active Campaigns"   value={campaigns.filter(c => c.status === "Active").length} sub="live right now" />
        <StatCard label="Expansion Cities"   value={expansionTargets.filter(e => e.status !== "Research").length} sub="in planning / active" />
      </div>

      {/* ── Tabs ── */}
      <div className="glass overflow-hidden">
        <div className="flex border-b border-white/[0.05] overflow-x-auto">
          {TABS.map((t, i) => {
            const Icon = t.icon;
            return (
              <button key={i} onClick={() => setTab(i)}
                className={`flex items-center gap-2 px-4 py-3 text-[10px] font-600 uppercase tracking-wide border-b-2 transition-all -mb-px whitespace-nowrap ${tab === i ? "border-white/60 text-white/80" : "border-transparent text-white/28 hover:text-white/55"}`}>
                <Icon className="w-3.5 h-3.5" />{t.label}
              </button>
            );
          })}
        </div>

        <div className="p-5">

          {/* ── Tab 0: Target Industries ── */}
          {tab === 0 && (
            <div className="space-y-4">
              {targetIndustries.length === 0 && (
                <div className="text-center py-16 text-white/25 text-[12px]">No industries yet — click <strong className="text-white/40">Add Industry</strong> to get started.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {targetIndustries.map(ind => (
                  <div key={ind.id} className="glass rounded-xl p-4 space-y-3 border border-white/[0.06] hover:border-white/[0.1] transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[13px] font-700 text-white/85 leading-tight">{ind.name}</p>
                          <span className={`badge text-[8px] py-0 ${IMPORTANCE_COLOR[ind.importance]}`}>{ind.importance}</span>
                        </div>
                        <p className="text-[11px] text-white/40 mt-0.5 flex items-center gap-1"><Building2 className="w-3 h-3" />{ind.city}</p>
                      </div>
                      <button onClick={() => deleteTargetIndustry(ind.id)}
                        className="p-1 rounded hover:bg-red-500/10 text-white/25 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-white/35 uppercase tracking-wide">Opportunity Score</span>
                        <span className={`text-[12px] font-700 ${ind.opportunityScore >= 90 ? "text-green-400" : ind.opportunityScore >= 75 ? "text-amber-400" : "text-white/55"}`}>{ind.opportunityScore}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06]">
                        <div className={`h-full rounded-full ${ind.opportunityScore >= 90 ? "bg-green-400" : ind.opportunityScore >= 75 ? "bg-amber-400" : "bg-blue-400"}`} style={{ width: `${ind.opportunityScore}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="glass-sm rounded-lg p-2"><p className="text-white/30 text-[9px] uppercase tracking-wide">Proj. Revenue</p><p className="text-white/80 font-600 mt-0.5">{ind.projectedRevenue}</p></div>
                      <div className="glass-sm rounded-lg p-2"><p className="text-white/30 text-[9px] uppercase tracking-wide">Expected ROI</p><p className="text-green-300 font-600 mt-0.5">{ind.roi}</p></div>
                      <div className="glass-sm rounded-lg p-2"><p className="text-white/30 text-[9px] uppercase tracking-wide">Budget</p><p className="text-white/70 font-600 mt-0.5">{ind.budget}</p></div>
                      <div className="glass-sm rounded-lg p-2"><p className="text-white/30 text-[9px] uppercase tracking-wide">Competition</p><p className={`font-600 mt-0.5 ${ind.competition === "Low" ? "text-green-400" : ind.competition === "Medium" ? "text-amber-400" : "text-red-400"}`}>{ind.competition}</p></div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/40 flex items-center gap-1"><Users className="w-3 h-3" />{ind.manager}</span>
                      <span className={`badge text-[8px] py-0 ${STATUS_COLOR[ind.status]}`}>{ind.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab 1: Monthly Goals ── */}
          {tab === 1 && (
            <div className="space-y-4">
              {monthlyGoals.length === 0 && (
                <div className="text-center py-16 text-white/25 text-[12px]">No goals yet — click <strong className="text-white/40">Add Goal</strong> to get started.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {monthlyGoals.map(goal => (
                  <div key={goal.id} className="glass rounded-xl p-4 space-y-3 border border-white/[0.06]">
                    <p className="text-[12px] font-700 text-white/80">{goal.month}</p>
                    <div className="space-y-2.5">
                      <div><p className="text-[9px] text-white/35 uppercase tracking-wide mb-1">Leads</p><ProgressBar value={goal.leadActual} max={goal.leadTarget} /></div>
                      <div><p className="text-[9px] text-white/35 uppercase tracking-wide mb-1">Proposals</p><ProgressBar value={goal.proposalActual} max={goal.proposalTarget} /></div>
                      <div><p className="text-[9px] text-white/35 uppercase tracking-wide mb-1">Clients Acquired</p><ProgressBar value={goal.clientActual} max={goal.clientTarget} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab 2: Quarterly Strategy Board ── */}
          {tab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {quarters.map(q => {
                const qCards = strategyCards.filter(c => c.quarter === q);
                const meta = Q_COLOR[q];
                return (
                  <div key={q} className={`rounded-xl border ${meta.border} ${meta.bg} p-3 space-y-2 min-h-[320px]`}>
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
                        <p className="text-[11px] font-700 text-white/70 uppercase tracking-wide font-display">{q} — 2025</p>
                      </div>
                      <span className="text-[9px] text-white/30">{qCards.length} items</span>
                    </div>
                    <div className="space-y-2">
                      {qCards.map(card => {
                        const StatusIcon = CARD_STATUS[card.status]?.icon ?? AlertCircle;
                        const statusColor = CARD_STATUS[card.status]?.color ?? "text-white/35";
                        return (
                          <div key={card.id} className="glass rounded-lg p-3 space-y-2 border border-white/[0.05] hover:border-white/[0.1] transition-all group">
                            <div className="flex items-start justify-between gap-1">
                              <p className="text-[11px] font-600 text-white/80 leading-tight flex-1">{card.title}</p>
                              <button onClick={() => updateStrategyCard(card.id, { status: card.status === "Planned" ? "In Progress" : card.status === "In Progress" ? "Done" : "Planned" })}
                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <StatusIcon className={`w-3.5 h-3.5 ${statusColor}`} />
                              </button>
                            </div>
                            <p className="text-[10px] text-white/40 leading-relaxed">{card.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/45">{card.category}</span>
                              <span className={`text-[9px] font-600 ${statusColor}`}>{card.status}</span>
                            </div>
                            <p className="text-[9px] text-white/30">{card.owner}</p>
                          </div>
                        );
                      })}
                      {qCards.length === 0 && <p className="text-[10px] text-white/20 text-center py-4">No cards yet</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Tab 3: Marketing Campaigns ── */}
          {tab === 3 && (
            <div className="glass overflow-hidden rounded-xl">
              {campaigns.length === 0 && (
                <div className="text-center py-16 text-white/25 text-[12px]">No campaigns yet — click <strong className="text-white/40">Add Campaign</strong> to get started.</div>
              )}
              {campaigns.length > 0 && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      {["Campaign","Platform","Budget","Audience","Exp. Leads","Conv.","ROI","Manager","Status"].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-[9px] font-600 tracking-[0.14em] uppercase text-white/28">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map(c => (
                      <tr key={c.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-3 py-3"><p className="text-[11px] font-600 text-white/80">{c.name}</p></td>
                        <td className="px-3 py-3"><span className="text-[10px] text-white/55 glass-sm px-2 py-0.5 rounded">{c.platform}</span></td>
                        <td className="px-3 py-3 text-[11px] text-white/65 font-600">{c.budget}</td>
                        <td className="px-3 py-3 text-[10px] text-white/45 max-w-[140px] truncate">{c.audience}</td>
                        <td className="px-3 py-3 text-[11px] text-white/65">{c.expectedLeads}</td>
                        <td className="px-3 py-3 text-[11px] text-amber-400 font-600">{c.conversionRate}</td>
                        <td className="px-3 py-3 text-[11px] text-green-400 font-600">{c.roi}</td>
                        <td className="px-3 py-3 text-[10px] text-white/45">{c.manager}</td>
                        <td className="px-3 py-3">
                          <span className={`badge text-[8px] py-0 ${c.status === "Active" ? "badge-green" : c.status === "Planned" ? "badge-amber" : "badge-white"}`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ── Tab 4: Expansion Roadmap ── */}
          {tab === 4 && (
            <div className="space-y-4">
              {expansionTargets.length === 0 && (
                <div className="text-center py-16 text-white/25 text-[12px]">No targets yet — click <strong className="text-white/40">Add Location</strong> to get started.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {expansionTargets.map(exp => (
                  <div key={exp.id} className={`glass rounded-xl p-4 space-y-3 border ${exp.status === "Active" ? "border-green-500/20" : "border-white/[0.06]"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[14px] font-700 text-white/85 flex items-center gap-2"><Globe className="w-4 h-4 text-white/35" />{exp.city}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{exp.country}</p>
                      </div>
                      <span className={`badge text-[8px] py-0 ${exp.status === "Active" ? "badge-green" : exp.status === "Planning" ? "badge-amber" : "badge-white"}`}>{exp.status}</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-white/35 uppercase tracking-wide">Market Readiness</span>
                        <span className={`text-[12px] font-700 ${exp.readiness >= 80 ? "text-green-400" : exp.readiness >= 50 ? "text-amber-400" : "text-white/45"}`}>{exp.readiness}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06]">
                        <div className={`h-full rounded-full transition-all ${exp.readiness >= 80 ? "bg-green-400" : exp.readiness >= 50 ? "bg-amber-400" : "bg-blue-400"}`} style={{ width: `${exp.readiness}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="glass-sm rounded-lg p-2"><p className="text-[9px] text-white/30 uppercase tracking-wide">Investment</p><p className="text-[11px] font-600 text-white/70 mt-0.5">{exp.investment}</p></div>
                      <div className="glass-sm rounded-lg p-2"><p className="text-[9px] text-white/30 uppercase tracking-wide">Launch</p><p className="text-[11px] font-600 text-white/70 mt-0.5">{exp.launchDate}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Modals ── */}
      <AddIndustryModal  open={modal && tab === 0} onClose={() => setModal(false)} onSave={addTargetIndustry} />
      <AddGoalModal      open={modal && tab === 1} onClose={() => setModal(false)} onSave={addMonthlyGoal} />
      <AddCardModal      open={modal && tab === 2} onClose={() => setModal(false)} onSave={addStrategyCard} />
      <AddCampaignModal  open={modal && tab === 3} onClose={() => setModal(false)} onSave={addCampaign} />
      <AddExpansionModal open={modal && tab === 4} onClose={() => setModal(false)} onSave={addExpansionTarget} />
    </div>
  );
}
