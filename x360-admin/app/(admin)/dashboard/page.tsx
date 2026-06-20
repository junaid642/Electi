"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { TrendingUp, Users, Briefcase, CheckCircle, ArrowUp, ArrowDown, FolderKanban, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store";

const KPI = ({ icon: Icon, label, value, sub, color, up, onClick }: any) => (
  <div onClick={onClick} className={`glass p-4 flex items-start gap-3 relative overflow-hidden ${onClick ? "cursor-pointer hover:bg-white/[0.04] transition-colors" : ""}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-4 h-4 text-white/80" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-white/40 font-500 tracking-wide uppercase">{label}</p>
      <p className="text-[22px] font-700 text-white/90 font-display leading-tight">{value}</p>
      <div className="flex items-center gap-1 mt-0.5">
        {up ? <ArrowUp className="w-2.5 h-2.5 text-green-500" /> : <ArrowDown className="w-2.5 h-2.5 text-red-400" />}
        <span className={`text-[10px] font-500 ${up ? "text-green-400" : "text-red-400"}`}>{sub}</span>
      </div>
    </div>
  </div>
);

const HEALTH_META: Record<string, { dot: string; text: string; bg: string }> = {
  "Healthy":   { dot: "bg-green-400",  text: "text-green-300",  bg: "bg-green-500/10"  },
  "At Risk":   { dot: "bg-amber-400",  text: "text-amber-300",  bg: "bg-amber-500/10"  },
  "Delayed":   { dot: "bg-orange-500", text: "text-orange-300", bg: "bg-orange-500/10" },
  "Critical":  { dot: "bg-red-500",    text: "text-red-300",    bg: "bg-red-500/10"    },
  "Completed": { dot: "bg-blue-400",   text: "text-blue-300",   bg: "bg-blue-500/10"   },
};

export default function DashboardPage() {
  const { leads, projects } = useStore();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const axisColor    = isLight ? "rgba(12,13,18,0.45)" : "rgba(255,255,255,0.28)";
  const axisColorDim = isLight ? "rgba(12,13,18,0.38)" : "rgba(255,255,255,0.22)";
  const gridColor    = isLight ? "rgba(0,0,0,0.07)"    : "rgba(255,255,255,0.04)";
  const barFill      = isLight ? "rgba(12,13,18,0.13)" : "rgba(255,255,255,0.15)";

  // ── CRM / Leads metrics ───────────────────────────────────────────────────
  const wonLeads    = leads.filter((l) => l.stage === "Won");
  const activeLeads = leads.filter((l) => !["Won", "Lost", "Follow-Up Later"].includes(l.stage));
  const avgScore    = leads.length ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0;
  const conversion  = leads.length ? ((wonLeads.length / leads.length) * 100).toFixed(1) : "0.0";
  const followUps   = leads.filter((l) => l.stage === "Follow-Up Later" || l.stage === "Waiting for Approval").length;

  // ── Projects metrics ──────────────────────────────────────────────────────
  const liveProjects      = projects.filter((p) => !["Completed", "On Hold"].includes(p.stage));
  const portfolioValueRaw = projects.reduce((s, p) => s + p.value, 0);
  const portfolioValue    = portfolioValueRaw >= 1_000_000
    ? `SAR ${(portfolioValueRaw / 1_000_000).toFixed(1)}M`
    : `SAR ${(portfolioValueRaw / 1_000).toFixed(0)}K`;

  const healthCounts = (["Healthy", "At Risk", "Delayed", "Critical", "Completed"] as const).map(h => ({
    label: h,
    count: projects.filter(p => p.health === h).length,
    meta: HEALTH_META[h],
  }));

  const atRiskProjects = projects
    .filter(p => p.health === "Critical" || p.health === "At Risk" || p.health === "Delayed")
    .sort((a, b) => {
      const order: Record<string, number> = { Critical: 0, "At Risk": 1, Delayed: 2 };
      return (order[a.health] ?? 3) - (order[b.health] ?? 3);
    })
    .slice(0, 4);

  // ── Lead Pipeline chart data ──────────────────────────────────────────────
  const pipeline = [
    { stage: "Incoming",    count: leads.filter(l => l.stage === "Incoming Lead").length },
    { stage: "Contacted",   count: leads.filter(l => l.stage === "Initial Contact").length },
    { stage: "Qualified",   count: leads.filter(l => l.stage === "Qualified").length },
    { stage: "Discovery",   count: leads.filter(l => l.stage === "Discovery Meeting").length },
    { stage: "Proposal",    count: leads.filter(l => l.stage === "Proposal Sent").length },
    { stage: "Negotiation", count: leads.filter(l => l.stage === "Negotiation").length },
    { stage: "Follow-Up",   count: followUps },
    { stage: "Won",         count: wonLeads.length },
  ];

  const scoreTrend = [
    { m: "Jan", score: 58 }, { m: "Feb", score: 62 }, { m: "Mar", score: 64 },
    { m: "Apr", score: 68 }, { m: "May", score: 71 }, { m: "Jun", score: avgScore },
  ];

  // ── CRM pipeline value by stage ───────────────────────────────────────────
  const pipelineValueStages = [
    "Incoming Lead", "Initial Contact", "Qualified", "Discovery Meeting",
    "Proposal Sent", "Negotiation", "Won",
  ];
  const pipelineValue = pipelineValueStages.map(stage => ({
    stage: stage.replace("Incoming Lead", "Incoming").replace("Initial Contact", "Contacted")
               .replace("Discovery Meeting", "Discovery").replace("Proposal Sent", "Proposal"),
    value: Math.round(leads.filter(l => l.stage === stage).reduce((s, l) => s + l.value, 0) / 1000),
  })).filter(d => d.value > 0);

  // ── Team performance (from leads) ─────────────────────────────────────────
  const team = [
    { name: "Ahmad Al-Sayed",   initials: "AS", role: "Sales Manager", key: "Ahmad S." },
    { name: "Sarah Al-Mutairi", initials: "SM", role: "BDM",           key: "Sarah M." },
    { name: "Khalid Omar",      initials: "KO", role: "Account Exec",  key: "Khalid O." },
    { name: "Fatima Al-Ghamdi", initials: "FG", role: "Sales Exec",    key: "Fatima G." },
  ].map(t => {
    const myLeads = leads.filter(l => l.assigned === t.key);
    const won     = myLeads.filter(l => l.stage === "Won").length;
    const conv    = myLeads.length ? Math.round((won / myLeads.length) * 100) : 0;
    return { ...t, deals: won, conv, total: myLeads.length };
  });

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI icon={CheckCircle} label="Won This Quarter"
          value={wonLeads.length}
          sub={`${conversion}% conversion rate`} color="bg-white/[0.06]" up
          onClick={() => router.push("/crm")} />
        <KPI icon={Users} label="Active Leads"
          value={activeLeads.length}
          sub={`${leads.length} total in pipeline`} color="bg-white/[0.06]" up
          onClick={() => router.push("/crm")} />
        <KPI icon={FolderKanban} label="Live Projects"
          value={liveProjects.length}
          sub={`${projects.length} total tracked`} color="bg-white/[0.06]" up
          onClick={() => router.push("/projects")} />
        <KPI icon={DollarSign} label="Portfolio Value"
          value={portfolioValue}
          sub={`${projects.filter(p => p.health === "Critical").length} critical`}
          color="bg-white/[0.06]"
          up={projects.filter(p => p.health === "Critical").length === 0}
          onClick={() => router.push("/projects")} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Pipeline */}
        <div className="glass p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-600 text-white/75 font-display uppercase tracking-wide">Lead Pipeline</p>
              <p className="text-[10px] text-white/30">By stage · live data</p>
            </div>
            <span className="badge badge-blue text-[10px]">{leads.length} total</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={pipeline} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="stage" tick={{ fill: axisColor, fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColorDim, fontSize: 8 }} axisLine={false} tickLine={false} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="glass-sm px-2 py-1.5 text-[10px]">
                  <p className="text-white/50">{label}</p>
                  <p className="text-white/85 font-600">{payload[0].value} leads</p>
                </div>
              ) : null} />
              <Bar dataKey="count" fill={barFill} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score trend */}
        <div className="glass p-4">
          <p className="text-[11px] font-600 text-white/75 font-display uppercase tracking-wide mb-1">Avg. Lead Score</p>
          <p className="text-[10px] text-white/30 mb-4">H1 2025 · out of 100</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={scoreTrend} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="m" tick={{ fill: axisColor, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColorDim, fontSize: 9 }} axisLine={false} tickLine={false} domain={[50, 85]} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="glass-sm px-2.5 py-1.5 text-[10px]">
                  <p className="text-white/45">{label}</p>
                  <p className="text-white/80">{payload[0].value} / 100</p>
                </div>
              ) : null} />
              <Line type="monotone" dataKey="score" stroke="rgba(96,165,250,0.7)" strokeWidth={2} dot={{ fill: "rgba(96,165,250,0.8)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project Health */}
        <div className="glass p-4 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => router.push("/projects")}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-600 text-white/75 font-display uppercase tracking-wide">Project Health</p>
            <span className="badge badge-white text-[9px]">{projects.length} total</span>
          </div>
          <div className="space-y-2 mb-4">
            {healthCounts.map(({ label, count, meta }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`} />
                <span className="text-[11px] text-white/60 flex-1">{label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 rounded-full bg-white/[0.06]">
                    <div className={`h-full rounded-full ${meta.dot}`}
                      style={{ width: projects.length ? `${(count / projects.length) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-[10px] font-600 text-white/55 w-4 text-right font-mono">{count}</span>
                </div>
              </div>
            ))}
          </div>
          {atRiskProjects.length > 0 && (
            <div className="border-t border-white/[0.05] pt-3 space-y-2">
              <p className="text-[9px] text-white/25 uppercase tracking-wide mb-1">Needs Attention</p>
              {atRiskProjects.map(p => {
                const m = HEALTH_META[p.health];
                return (
                  <div key={p.id} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.dot}`} />
                    <p className="text-[10px] text-white/60 flex-1 truncate">{p.name}</p>
                    <span className={`text-[8px] font-600 ${m.text}`}>{p.health}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CRM Pipeline Value */}
        <div className="glass p-4 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => router.push("/crm")}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-600 text-white/75 font-display uppercase tracking-wide">CRM Pipeline Value</p>
            <span className="badge badge-green text-[9px]">
              SAR {(leads.reduce((s, l) => s + l.value, 0) / 1_000_000).toFixed(1)}M
            </span>
          </div>
          <div className="space-y-2.5">
            {pipelineValue.map(({ stage, value }) => {
              const maxVal = Math.max(...pipelineValue.map(d => d.value));
              return (
                <div key={stage} className="flex items-center gap-2.5">
                  <p className="text-[10px] text-white/50 w-20 shrink-0 truncate">{stage}</p>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-white/30 transition-all"
                      style={{ width: maxVal ? `${(value / maxVal) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-[10px] font-600 text-white/55 font-mono shrink-0">
                    {value >= 1000 ? `${(value / 1000).toFixed(1)}M` : `${value}K`}
                  </span>
                </div>
              );
            })}
            {pipelineValue.length === 0 && (
              <p className="text-[11px] text-white/25 text-center py-4">No active pipeline data</p>
            )}
          </div>
          <div className="border-t border-white/[0.05] mt-3 pt-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] text-white/25 uppercase tracking-wide">Won Value</p>
              <p className="text-[13px] font-700 text-green-400 mt-0.5 font-display">
                SAR {(wonLeads.reduce((s, l) => s + l.value, 0) / 1_000_000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-[9px] text-white/25 uppercase tracking-wide">Avg. Deal</p>
              <p className="text-[13px] font-700 text-white/65 mt-0.5 font-display">
                {leads.length ? `SAR ${Math.round(leads.reduce((s, l) => s + l.value, 0) / leads.length / 1000)}K` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="glass p-4">
          <p className="text-[11px] font-600 text-white/75 font-display uppercase tracking-wide mb-4">Team Performance</p>
          <div className="space-y-2.5">
            {team.map((t) => (
              <div key={t.initials} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-[9px] font-700 text-white/60 shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-500 text-white/75 truncate">{t.name}</p>
                  <p className="text-[9px] text-white/30">{t.role} · {t.deals} won of {t.total}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-600 text-white/65">{t.conv}%</p>
                  <p className="text-[8px] text-white/25 font-mono">conv.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
