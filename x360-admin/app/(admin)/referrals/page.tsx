"use client";
import { useState, useMemo } from "react";
import { Star, DollarSign, Users, TrendingUp, Medal, Plus, Search, X, Pencil, Trash2, Save } from "lucide-react";

type Tier   = "Gold" | "Silver" | "Bronze";
type Status = "Active" | "Inactive";

interface Partner {
  id: number;
  name: string;
  contact: string;
  tier: Tier;
  leads: number;
  converted: number;
  commission: number;
  pending: number;
  status: Status;
  since: string;
}

interface Payout {
  id: number;
  partner: string;
  amount: number;
  deal: string;
  date: string;
  status: "Paid" | "Pending";
}

const INITIAL_PARTNERS: Partner[] = [
  { id: 1, name: "Al-Faisal Real Estate",  contact: "Faisal Al-Fahad",   tier: "Gold",   leads: 28, converted: 14, commission: 184000, pending: 42000, status: "Active",   since: "2024-01-15" },
  { id: 2, name: "Salam Properties",       contact: "Nora Al-Salam",     tier: "Gold",   leads: 22, converted: 11, commission: 156000, pending: 28000, status: "Active",   since: "2024-03-10" },
  { id: 3, name: "Gulf Business Link",     contact: "Omar Al-Tariq",     tier: "Silver", leads: 16, converted: 7,  commission: 94000,  pending: 18000, status: "Active",   since: "2024-06-20" },
  { id: 4, name: "Vision Brokers",         contact: "Huda Al-Vision",    tier: "Silver", leads: 12, converted: 5,  commission: 72000,  pending: 8000,  status: "Active",   since: "2024-08-05" },
  { id: 5, name: "Al-Baraka Consulting",   contact: "Saad Al-Baraka",    tier: "Bronze", leads: 8,  converted: 3,  commission: 38000,  pending: 12000, status: "Active",   since: "2025-01-20" },
  { id: 6, name: "Riyadh Biz Dev",         contact: "Maha Al-Riyadh",    tier: "Bronze", leads: 5,  converted: 1,  commission: 14000,  pending: 0,     status: "Inactive", since: "2025-03-01" },
];

const INITIAL_PAYOUTS: Payout[] = [
  { id: 1, partner: "Al-Faisal Real Estate", amount: 38000, deal: "Saudi Aramco Q2",    date: "2025-06-01", status: "Paid"    },
  { id: 2, partner: "Salam Properties",      amount: 28000, deal: "Al-Marai Expansion", date: "2025-05-25", status: "Paid"    },
  { id: 3, partner: "Gulf Business Link",    amount: 18000, deal: "Olayan Group CRM",   date: "2025-05-20", status: "Pending" },
  { id: 4, partner: "Al-Faisal Real Estate", amount: 42000, deal: "NEOM Virtual Tours", date: "2025-06-10", status: "Pending" },
  { id: 5, partner: "Vision Brokers",        amount: 8000,  deal: "Misk Foundation",    date: "2025-04-30", status: "Paid"    },
];

const TIER_STYLE: Record<string, { badge: string; icon: string; border: string }> = {
  Gold:   { badge: "badge-amber", icon: "text-amber-400",  border: "border-amber-500/20"  },
  Silver: { badge: "badge-white", icon: "text-white/60",   border: "border-white/10"      },
  Bronze: { badge: "badge-red",   icon: "text-orange-400", border: "border-orange-500/20" },
};

const TIERS    = ["All", "Gold", "Silver", "Bronze"] as const;
const STATUSES = ["All", "Active", "Inactive"] as const;

const BLANK_PARTNER: Omit<Partner, "id"> = {
  name: "", contact: "", tier: "Silver", leads: 0, converted: 0,
  commission: 0, pending: 0, status: "Active", since: new Date().toISOString().slice(0, 10),
};

const BLANK_PAYOUT: Omit<Payout, "id"> = {
  partner: "", amount: 0, deal: "", date: new Date().toISOString().slice(0, 10), status: "Pending",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] font-600 uppercase tracking-[0.14em] text-white/35">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "glass-sm px-2.5 py-1.5 rounded-lg text-[11px] text-white/80 bg-transparent outline-none border border-white/[0.07] focus:border-white/20 placeholder-white/20 w-full";
const selectCls = "glass-sm px-2.5 py-1.5 rounded-lg text-[11px] text-white/80 bg-[#111] outline-none border border-white/[0.07] focus:border-white/20 w-full";

export default function ReferralsPage() {
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [payouts,  setPayouts]  = useState<Payout[]>(INITIAL_PAYOUTS);
  const [search, setSearch]           = useState("");
  const [tierFilter, setTierFilter]   = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [partnerModal, setPartnerModal] = useState<{ open: boolean; editing: Partner | null }>({ open: false, editing: null });
  const [payoutModal,  setPayoutModal]  = useState<{ open: boolean; editing: Payout | null }>({ open: false, editing: null });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [pForm, setPForm] = useState<Omit<Partner, "id">>(BLANK_PARTNER);
  const [oForm, setOForm] = useState<Omit<Payout, "id">>(BLANK_PAYOUT);

  const nextId = (arr: { id: number }[]) => Math.max(0, ...arr.map(a => a.id)) + 1;

  function openAddPartner() {
    setPForm(BLANK_PARTNER);
    setPartnerModal({ open: true, editing: null });
  }
  function openEditPartner(p: Partner) {
    const { id: _id, ...rest } = p;
    setPForm(rest);
    setPartnerModal({ open: true, editing: p });
  }
  function savePartner() {
    if (!pForm.name.trim() || !pForm.contact.trim()) return;
    if (partnerModal.editing) {
      setPartners(ps => ps.map(p => p.id === partnerModal.editing!.id ? { id: p.id, ...pForm } : p));
    } else {
      setPartners(ps => [...ps, { id: nextId(ps), ...pForm }]);
    }
    setPartnerModal({ open: false, editing: null });
  }
  function deletePartner(id: number) {
    setPartners(ps => ps.filter(p => p.id !== id));
    setDeleteConfirm(null);
  }

  function openAddPayout(partnerName?: string) {
    setOForm({ ...BLANK_PAYOUT, partner: partnerName ?? "" });
    setPayoutModal({ open: true, editing: null });
  }
  function openEditPayout(pay: Payout) {
    const { id: _id, ...rest } = pay;
    setOForm(rest);
    setPayoutModal({ open: true, editing: pay });
  }
  function savePayout() {
    if (!oForm.partner || !oForm.deal.trim() || oForm.amount <= 0) return;
    if (payoutModal.editing) {
      setPayouts(ps => ps.map(p => p.id === payoutModal.editing!.id ? { id: p.id, ...oForm } : p));
    } else {
      setPayouts(ps => [...ps, { id: nextId(ps), ...oForm }]);
    }
    setPayoutModal({ open: false, editing: null });
  }

  const totalComm    = partners.reduce((s, p) => s + p.commission, 0);
  const totalLeads   = partners.reduce((s, p) => s + p.leads, 0);
  const totalPending = partners.reduce((s, p) => s + p.pending, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter(p => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.contact.toLowerCase().includes(q);
      const matchesTier   = tierFilter   === "All" || p.tier   === tierFilter;
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [partners, search, tierFilter, statusFilter]);

  const clearFilters = () => { setSearch(""); setTierFilter("All"); setStatusFilter("All"); };
  const hasFilters = search || tierFilter !== "All" || statusFilter !== "All";

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Partners",  value: partners.filter(p => p.status === "Active").length, icon: Users },
          { label: "Total Leads Gen.", value: totalLeads,                                           icon: TrendingUp },
          { label: "Commissions Paid", value: `SAR ${(totalComm/1000).toFixed(0)}K`,               icon: DollarSign },
          { label: "Pending Payouts",  value: `SAR ${(totalPending/1000).toFixed(0)}K`,            icon: Star },
        ].map(s => (
          <div key={s.label} className="glass p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-white/80" />
            </div>
            <div>
              <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
              <p className="text-[20px] font-700 font-display mt-0.5 text-white/80">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Partner table */}
        <div className="glass overflow-hidden lg:col-span-2">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-white/[0.04] space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide font-display shrink-0">Partner Leaderboard</p>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="flex items-center gap-2 glass-sm px-2.5 py-1.5 min-w-0 flex-1 max-w-[200px]">
                  <Search className="w-3 h-3 text-white/30 shrink-0" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search partners…"
                    className="bg-transparent text-[11px] text-white/60 placeholder-white/20 outline-none flex-1 min-w-0"
                  />
                  {search && (
                    <button onClick={() => setSearch("")}><X className="w-3 h-3 text-white/25 hover:text-white/50" /></button>
                  )}
                </div>
                <button
                  onClick={openAddPartner}
                  className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 text-[10px] text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors shrink-0 rounded-lg border border-white/[0.07]"
                >
                  <Plus className="w-3 h-3" /> Add Partner
                </button>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-white/28 uppercase tracking-wide mr-1">Tier</span>
                {TIERS.map(t => (
                  <button key={t} onClick={() => setTierFilter(t)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-500 transition-colors ${tierFilter === t ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-white/28 uppercase tracking-wide mr-1">Status</span>
                {STATUSES.map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-500 transition-colors ${statusFilter === s ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}>
                    {s}
                  </button>
                ))}
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="ml-auto text-[9px] text-white/30 hover:text-white/55 transition-colors flex items-center gap-1">
                  <X className="w-2.5 h-2.5" /> Clear
                </button>
              )}
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["#", "Partner", "Tier", "Leads", "Conv.", "Commission", "Pending", "Status", ""].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-[9px] font-600 tracking-[0.14em] uppercase text-white/28">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-[11px] text-white/25">No partners match your filters</td>
                </tr>
              ) : (
                filtered.map((p, i) => {
                  const t = TIER_STYLE[p.tier];
                  return (
                    <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-center w-5">
                          {i < 3 ? <Medal className={`w-3.5 h-3.5 ${t.icon}`} /> : <span className="text-[10px] text-white/25 font-mono">{i+1}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-[11px] font-500 text-white/78">{p.name}</p>
                        <p className="text-[9px] text-white/32">{p.contact}</p>
                      </td>
                      <td className="px-3 py-2.5"><span className={`badge ${t.badge}`}>{p.tier}</span></td>
                      <td className="px-3 py-2.5 text-[11px] text-white/60 font-mono">{p.leads}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-[11px] font-600 text-green-400/80">
                          {p.leads > 0 ? Math.round(p.converted / p.leads * 100) : 0}%
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[11px] font-600 text-white/65 font-mono">SAR {(p.commission/1000).toFixed(0)}K</td>
                      <td className="px-3 py-2.5 text-[11px] font-600 text-amber-400/70 font-mono">
                        {p.pending > 0 ? `SAR ${(p.pending/1000).toFixed(0)}K` : "—"}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`badge ${p.status === "Active" ? "badge-green" : "badge-white"}`}>{p.status}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditPartner(p)}
                            className="w-6 h-6 rounded-md flex items-center justify-center glass-sm hover:bg-white/[0.08] transition-colors"
                            title="Edit partner"
                          >
                            <Pencil className="w-3 h-3 text-white/45 hover:text-white/75" />
                          </button>
                          {deleteConfirm === p.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => deletePartner(p.id)}
                                className="px-1.5 py-0.5 text-[9px] rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-1.5 py-0.5 text-[9px] rounded glass-sm text-white/35 hover:text-white/60 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="w-6 h-6 rounded-md flex items-center justify-center glass-sm hover:bg-red-500/10 transition-colors"
                              title="Delete partner"
                            >
                              <Trash2 className="w-3 h-3 text-white/35 hover:text-red-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Payout history */}
        <div className="glass p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide font-display">Payout History</p>
            <button
              onClick={() => openAddPayout()}
              className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 glass-sm px-2 py-1 rounded-lg border border-white/[0.07] hover:bg-white/[0.05] transition-colors"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-2.5">
            {payouts.map((pay) => (
              <div key={pay.id} className="glass-sm p-2.5 rounded-lg space-y-1 group relative">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-500 text-white/72 truncate">{pay.partner}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`badge shrink-0 ${pay.status === "Paid" ? "badge-green" : "badge-amber"}`}>{pay.status}</span>
                    <button
                      onClick={() => openEditPayout(pay)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded flex items-center justify-center hover:bg-white/[0.08]"
                    >
                      <Pencil className="w-3 h-3 text-white/40" />
                    </button>
                  </div>
                </div>
                <p className="text-[9px] text-white/35 truncate">{pay.deal}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-700 text-white/70 font-mono">SAR {pay.amount.toLocaleString()}</span>
                  <span className="text-[9px] text-white/25 font-mono">{pay.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add / Edit Partner Modal ── */}
      {partnerModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPartnerModal({ open: false, editing: null })} />
          <div className="relative glass rounded-2xl p-5 w-full max-w-md space-y-4 border border-white/[0.08] shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-600 text-white/85">
                {partnerModal.editing ? "Edit Partner" : "Add New Partner"}
              </p>
              <button onClick={() => setPartnerModal({ open: false, editing: null })}>
                <X className="w-4 h-4 text-white/35 hover:text-white/70" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Field label="Company Name *">
                  <input className={inputCls} value={pForm.name} onChange={e => setPForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Al-Faisal Real Estate" />
                </Field>
              </div>
              <div className="col-span-2">
                <Field label="Contact Person *">
                  <input className={inputCls} value={pForm.contact} onChange={e => setPForm(f => ({ ...f, contact: e.target.value }))} placeholder="e.g. Faisal Al-Fahad" />
                </Field>
              </div>
              <Field label="Tier">
                <select className={selectCls} value={pForm.tier} onChange={e => setPForm(f => ({ ...f, tier: e.target.value as Tier }))}>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Bronze">Bronze</option>
                </select>
              </Field>
              <Field label="Status">
                <select className={selectCls} value={pForm.status} onChange={e => setPForm(f => ({ ...f, status: e.target.value as Status }))}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </Field>
              <Field label="Leads Generated">
                <input type="number" min={0} className={inputCls} value={pForm.leads} onChange={e => setPForm(f => ({ ...f, leads: +e.target.value }))} />
              </Field>
              <Field label="Leads Converted">
                <input type="number" min={0} className={inputCls} value={pForm.converted} onChange={e => setPForm(f => ({ ...f, converted: +e.target.value }))} />
              </Field>
              <Field label="Commission (SAR)">
                <input type="number" min={0} className={inputCls} value={pForm.commission} onChange={e => setPForm(f => ({ ...f, commission: +e.target.value }))} />
              </Field>
              <Field label="Pending (SAR)">
                <input type="number" min={0} className={inputCls} value={pForm.pending} onChange={e => setPForm(f => ({ ...f, pending: +e.target.value }))} />
              </Field>
              <div className="col-span-2">
                <Field label="Partner Since">
                  <input type="date" className={inputCls} value={pForm.since} onChange={e => setPForm(f => ({ ...f, since: e.target.value }))} />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button onClick={() => setPartnerModal({ open: false, editing: null })} className="px-3.5 py-1.5 text-[11px] text-white/45 glass-sm rounded-lg hover:text-white/70 transition-colors">
                Cancel
              </button>
              <button
                onClick={savePartner}
                disabled={!pForm.name.trim() || !pForm.contact.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-600 bg-white/90 text-black rounded-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-3 h-3" />
                {partnerModal.editing ? "Save Changes" : "Add Partner"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Payout Modal ── */}
      {payoutModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPayoutModal({ open: false, editing: null })} />
          <div className="relative glass rounded-2xl p-5 w-full max-w-sm space-y-4 border border-white/[0.08] shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-600 text-white/85">
                {payoutModal.editing ? "Edit Payout" : "Add Payout"}
              </p>
              <button onClick={() => setPayoutModal({ open: false, editing: null })}>
                <X className="w-4 h-4 text-white/35 hover:text-white/70" />
              </button>
            </div>

            <div className="space-y-3">
              <Field label="Partner *">
                <select className={selectCls} value={oForm.partner} onChange={e => setOForm(f => ({ ...f, partner: e.target.value }))}>
                  <option value="">Select partner…</option>
                  {partners.filter(p => p.status === "Active").map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Deal / Project Name *">
                <input className={inputCls} value={oForm.deal} onChange={e => setOForm(f => ({ ...f, deal: e.target.value }))} placeholder="e.g. Saudi Aramco Q2" />
              </Field>
              <Field label="Amount (SAR) *">
                <input type="number" min={0} className={inputCls} value={oForm.amount} onChange={e => setOForm(f => ({ ...f, amount: +e.target.value }))} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input type="date" className={inputCls} value={oForm.date} onChange={e => setOForm(f => ({ ...f, date: e.target.value }))} />
                </Field>
                <Field label="Status">
                  <select className={selectCls} value={oForm.status} onChange={e => setOForm(f => ({ ...f, status: e.target.value as "Paid" | "Pending" }))}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button onClick={() => setPayoutModal({ open: false, editing: null })} className="px-3.5 py-1.5 text-[11px] text-white/45 glass-sm rounded-lg hover:text-white/70 transition-colors">
                Cancel
              </button>
              <button
                onClick={savePayout}
                disabled={!oForm.partner || !oForm.deal.trim() || oForm.amount <= 0}
                className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-600 bg-white/90 text-black rounded-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-3 h-3" />
                {payoutModal.editing ? "Save Changes" : "Add Payout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
