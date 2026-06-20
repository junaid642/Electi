import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { ArrowUpRight, Users, Briefcase, FileSearch, TrendingUp } from "lucide-react";
import { useCrm } from "@/lib/crm-store";
import { useProjects } from "@/lib/project-store";
import { useGetDashboardStats } from "@workspace/api-client-react";

// Stable color palette
const COLORS = ["#ffffff", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#22d3ee", "#f87171", "#fb923c"];

const HEALTH_COLORS: Record<string, string> = {
  Healthy:   "#4ade80",
  "At Risk": "#fbbf24",
  Delayed:   "#fb923c",
  Critical:  "#f87171",
  Completed: "#60a5fa",
  "On Hold": "rgba(255,255,255,0.2)",
};

function KpiCard({
  label, value, sub, icon: Icon, highlight, i,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; highlight?: boolean; i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className={`glass-card p-6 flex flex-col justify-between h-36 hover:bg-white/[0.05] transition-colors ${highlight ? "glow-cyan border-primary/20 bg-primary/[0.02]" : ""}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
          <Icon className="w-3 h-3" />
          {label}
        </span>
        <ArrowUpRight className="w-3 h-3 text-white/15" />
      </div>
      <div>
        <div className="text-3xl stat-value text-white">{value}</div>
        <p className="text-[10px] text-white/30 mt-1.5 font-mono">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const { leads } = useCrm();
  const { projects } = useProjects();
  const { data: stats } = useGetDashboardStats();

  // ── CRM Metrics ────────────────────────────────────────────────────────────
  const activeLeads = useMemo(
    () => leads.filter(l => !["Won", "Lost", "Follow-Up Later"].includes(l.stage)),
    [leads],
  );
  const wonLeads  = useMemo(() => leads.filter(l => l.stage === "Won"),  [leads]);
  const lostLeads = useMemo(() => leads.filter(l => l.stage === "Lost"), [leads]);

  const pipelineValue = useMemo(
    () => activeLeads.reduce((s, l) => s + l.value, 0),
    [activeLeads],
  );
  const pipelineLabel = pipelineValue >= 1_000_000
    ? `SAR ${(pipelineValue / 1_000_000).toFixed(1)}M`
    : `SAR ${(pipelineValue / 1_000).toFixed(0)}K`;

  const avgScore = useMemo(
    () => (leads.length ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0),
    [leads],
  );

  // CRM pipeline by stage (ordered, non-zero only)
  const STAGE_ORDER = [
    "Incoming Lead", "Initial Contact", "Qualified", "Discovery Meeting",
    "Demo Scheduled", "Proposal Preparation", "Proposal Sent", "Client Review",
    "Negotiation", "Waiting for Approval", "Legal / Procurement",
    "Won", "Lost",
  ] as const;

  const pipelineData = useMemo(() =>
    STAGE_ORDER
      .map(stage => ({ stage: stage.replace(" / Procurement", "").replace("Waiting for Approval", "Awaiting"), count: leads.filter(l => l.stage === stage).length }))
      .filter(d => d.count > 0),
    [leads],
  );

  // Lead source mix
  const sourceData = useMemo(() => {
    const m: Record<string, number> = {};
    leads.forEach(l => { m[l.source] = (m[l.source] ?? 0) + 1; });
    const total = leads.length || 1;
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], i) => ({ name, value: Math.round((count / total) * 100), color: COLORS[i % COLORS.length] }));
  }, [leads]);

  // CRM by industry
  const industryData = useMemo(() => {
    const m: Record<string, { count: number; value: number; score: number }> = {};
    leads.forEach(l => {
      if (!m[l.industry]) m[l.industry] = { count: 0, value: 0, score: 0 };
      m[l.industry].count++;
      m[l.industry].value += l.value;
      m[l.industry].score += l.score;
    });
    return Object.entries(m)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([industry, d]) => ({
        industry,
        count: d.count,
        value: Math.round(d.value / 1_000),
        avgScore: Math.round(d.score / d.count),
      }));
  }, [leads]);

  // Project health breakdown
  const healthData = useMemo(() => {
    const HEALTH_ORDER = ["Healthy", "At Risk", "Delayed", "Critical", "Completed", "On Hold"];
    return HEALTH_ORDER
      .map(h => ({ health: h, count: projects.filter(p => p.health === h).length, color: HEALTH_COLORS[h] }))
      .filter(d => d.count > 0);
  }, [projects]);

  const portfolioValue = useMemo(() => {
    const v = projects.reduce((s, p) => s + p.value, 0);
    return v >= 1_000_000 ? `SAR ${(v / 1_000_000).toFixed(1)}M` : `SAR ${(v / 1_000).toFixed(0)}K`;
  }, [projects]);

  const avgProgress = useMemo(
    () => (projects.length ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length) : 0),
    [projects],
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">ANALYTICS DASHBOARD</h1>
          <p className="text-white/40 mt-2 text-sm">
            Live metrics from CRM, Projects, Jobs &amp; Applications — updates automatically.
          </p>
        </div>
      </div>

      {/* KPI Row — all live */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard i={0} icon={Users}      label="CRM Leads"     value={leads.length}                          sub={`${wonLeads.length} won · ${lostLeads.length} lost`} />
        <KpiCard i={1} icon={TrendingUp} label="Pipeline Value" value={pipelineLabel}                        sub={`${activeLeads.length} active deals`} highlight />
        <KpiCard i={2} icon={Briefcase}  label="Open Jobs"      value={stats?.openJobs ?? "—"}               sub={`${stats?.totalJobs ?? 0} total posted`} />
        <KpiCard i={3} icon={FileSearch} label="Applications"   value={stats?.totalApplications ?? "—"}      sub={`+${stats?.newApplicationsThisWeek ?? 0} this week`} />
      </div>

      {/* CRM Pipeline + Source Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <motion.div
          className="lg:col-span-7 glass-card p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30">CRM Pipeline by Stage</h3>
            <span className="text-[10px] font-mono text-white/25">{leads.length} total leads · live</span>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ left: -20, right: 8, top: 4, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="stage"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={8}
                  tickLine={false}
                  axisLine={false}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}
                  formatter={(v: number) => [v, "leads"]}
                />
                <Bar dataKey="count" name="Leads" fill="rgba(255,255,255,0.15)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-3 glass-card p-6 flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h3 className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Lead Sources</h3>
          <p className="text-[9px] text-white/20 mb-4">% of total CRM leads · live</p>
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(v: number) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {sourceData.slice(0, 6).map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-white/55 truncate max-w-[120px]">{entry.name}</span>
                </div>
                <span className="text-white/70 font-mono">{entry.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Industry breakdown + Project health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CRM by Industry */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30">CRM by Industry</h3>
            <span className="text-[10px] font-mono text-white/25">live · {industryData.length} sectors</span>
          </div>
          {industryData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Industry", "Leads", "Pipeline Value", "Avg Score"].map(h => (
                      <th key={h} className="text-[9px] uppercase tracking-[0.18em] text-white/25 font-normal pb-3 text-left first:pl-0 pl-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {industryData.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 text-white/80 font-medium">{row.industry}</td>
                      <td className="py-3 pl-4 text-white/55 font-mono">{row.count}</td>
                      <td className="py-3 pl-4 text-white/55 font-mono">
                        {row.value >= 1000 ? `SAR ${(row.value / 1000).toFixed(1)}M` : `SAR ${row.value}K`}
                      </td>
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-12 bg-white/[0.08] rounded-full overflow-hidden">
                            <div className="h-full bg-white/40 rounded-full" style={{ width: `${row.avgScore}%` }} />
                          </div>
                          <span className="text-white/55 font-mono text-xs">{row.avgScore}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-white/25 text-sm py-8">No CRM data yet.</p>
          )}
        </motion.div>

        {/* Project Health */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30">Project Portfolio</h3>
            <span className="text-[10px] font-mono text-white/25">{projects.length} projects · live</span>
          </div>
          <p className="text-[9px] text-white/20 mb-6">Health status &amp; portfolio value · updates from Kanban</p>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total Value",   value: portfolioValue },
              { label: "Avg Progress",  value: `${avgProgress}%` },
              { label: "Avg Score",     value: `${avgScore}/100` },
            ].map(s => (
              <div key={s.label} className="p-3 border border-white/[0.05] bg-white/[0.02] rounded-lg">
                <p className="text-[9px] uppercase tracking-widest text-white/25 mb-1">{s.label}</p>
                <p className="text-base stat-value text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Health breakdown */}
          <div className="space-y-2.5">
            {healthData.map(d => (
              <div key={d.health} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-sm text-white/60 flex-1">{d.health}</span>
                <div className="w-32 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(d.count / projects.length) * 100}%`, background: d.color }}
                  />
                </div>
                <span className="text-sm font-mono text-white/50 w-5 text-right">{d.count}</span>
              </div>
            ))}
            {healthData.length === 0 && (
              <p className="text-center text-white/25 text-sm py-4">No projects yet.</p>
            )}
          </div>

          {/* Per-project progress list */}
          {projects.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/[0.05] space-y-2.5">
              <p className="text-[9px] uppercase tracking-widest text-white/20 mb-3">Active Projects</p>
              {projects
                .filter(p => !["Completed"].includes(p.health))
                .sort((a, b) => {
                  const order: Record<string, number> = { Critical: 0, "At Risk": 1, Delayed: 2, Healthy: 3, "On Hold": 4 };
                  return (order[a.health] ?? 5) - (order[b.health] ?? 5);
                })
                .slice(0, 5)
                .map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: HEALTH_COLORS[p.health] }} />
                    <span className="text-xs text-white/60 flex-1 truncate">{p.name}</span>
                    <div className="w-20 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 w-8 text-right">{p.progress}%</span>
                  </div>
                ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
