"use client";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Download } from "lucide-react";

const monthly = [
  { m: "Jan", revenue: 1480000, expenses: 620000 }, { m: "Feb", revenue: 1290000, expenses: 540000 },
  { m: "Mar", revenue: 1650000, expenses: 680000 }, { m: "Apr", revenue: 1820000, expenses: 710000 },
  { m: "May", revenue: 2100000, expenses: 820000 }, { m: "Jun", revenue: 2400000, expenses: 890000 },
];

const INVOICES = [
  { id: "INV-2094", client: "Saudi Aramco",     amount: 840000, due: "2025-06-20", status: "Pending",  issued: "2025-06-01" },
  { id: "INV-2093", client: "Al-Marai Group",   amount: 462000, due: "2025-06-15", status: "Paid",     issued: "2025-05-15" },
  { id: "INV-2092", client: "NEOM Corp",        amount: 320000, due: "2025-05-30", status: "Overdue",  issued: "2025-04-30" },
  { id: "INV-2091", client: "Olayan Group",     amount: 180000, due: "2025-06-25", status: "Pending",  issued: "2025-06-05" },
  { id: "INV-2090", client: "Aldar Properties", amount: 245000, due: "2025-05-15", status: "Paid",     issued: "2025-04-15" },
  { id: "INV-2089", client: "Emirates NBD",     amount: 125000, due: "2025-05-01", status: "Paid",     issued: "2025-04-01" },
];

const STATUS_ICON: Record<string, React.ReactNode> = {
  Paid:    <CheckCircle className="w-3 h-3 text-green-400" />,
  Pending: <Clock className="w-3 h-3 text-amber-400" />,
  Overdue: <AlertCircle className="w-3 h-3 text-red-400" />,
};
const STATUS_BADGE: Record<string, string> = { Paid: "badge-green", Pending: "badge-amber", Overdue: "badge-red" };

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-sm px-3 py-2 text-[10px] space-y-1">
      <p className="text-white/45">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: SAR {(p.value/1e6).toFixed(2)}M</p>
      ))}
    </div>
  );
};

export default function FinancePage() {
  const totalRev = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalExp = monthly.reduce((s, m) => s + m.expenses, 0);
  const netProfit = totalRev - totalExp;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "H1 Revenue",   value: `SAR ${(totalRev/1e6).toFixed(1)}M`,    icon: DollarSign,   color: "text-green-400",  sub: "+18% YoY"           },
          { label: "H1 Expenses",  value: `SAR ${(totalExp/1e6).toFixed(1)}M`,    icon: TrendingDown, color: "text-red-400",    sub: "+8% YoY"            },
          { label: "Net Profit",   value: `SAR ${(netProfit/1e6).toFixed(1)}M`,   icon: TrendingUp,   color: "text-white/80",   sub: `${Math.round(netProfit/totalRev*100)}% margin` },
          { label: "Overdue",      value: `SAR ${INVOICES.filter(i=>i.status==="Overdue").reduce((s,i)=>s+i.amount,0).toLocaleString()}`, icon: AlertCircle, color: "text-amber-400", sub: "1 invoice" },
        ].map(s => (
          <div key={s.label} className="glass p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
            </div>
            <p className={`text-[20px] font-700 font-display ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/28 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="glass p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] font-600 text-white/70 font-display uppercase tracking-wide">Revenue vs Expenses</p>
            <p className="text-[10px] text-white/28">H1 2025 · SAR</p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white/40" /><span className="text-white/45">Revenue</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/50" /><span className="text-white/45">Expenses</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" /><stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
              </linearGradient>
              <linearGradient id="expG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(239,68,68,0.18)" /><stop offset="100%" stopColor="rgba(239,68,68,0.01)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.22)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1e6).toFixed(1)}M`} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} fill="url(#revG)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="rgba(239,68,68,0.5)" strokeWidth={1.5} fill="url(#expG)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Invoice table */}
      <div className="glass overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
          <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide font-display">Invoices</p>
          <button className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 text-[10px] text-white/45 hover:text-white/70 transition-colors">
            <Download className="w-3 h-3" /> Export PDF
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {["Invoice", "Client", "Amount", "Issued", "Due Date", "Status", ""].map(h => (
                <th key={h} className="text-left px-3 py-2 text-[9px] font-600 tracking-[0.14em] uppercase text-white/28">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors">
                <td className="px-3 py-2.5 text-[11px] font-600 text-white/75 font-mono">{inv.id}</td>
                <td className="px-3 py-2.5 text-[11px] text-white/65">{inv.client}</td>
                <td className="px-3 py-2.5 text-[12px] font-700 text-white/80 font-mono">SAR {inv.amount.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-[10px] text-white/35 font-mono">{inv.issued}</td>
                <td className="px-3 py-2.5 text-[10px] text-white/38 font-mono">{inv.due}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    {STATUS_ICON[inv.status]}
                    <span className={`badge ${STATUS_BADGE[inv.status]}`}>{inv.status}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <button className="glass-sm px-2 py-1 text-[9px] text-white/40 hover:text-white/65 transition-colors">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
