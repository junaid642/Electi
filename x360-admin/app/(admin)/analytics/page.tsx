"use client";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store";
import { useMemo } from "react";

// Stable color palette for industries
const INDUSTRY_PALETTE = [
  "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
  "#22d3ee", "#f87171", "#fb923c", "#4ade80",
  "#818cf8", "#e879f9", "#2dd4bf",
];

export default function AnalyticsPage() {
  const { leads, projects } = useStore();
  const { resolvedTheme } = useTheme();
  const isLight      = resolvedTheme === "light";
  const axisColor    = isLight ? "rgba(12,13,18,0.45)" : "rgba(255,255,255,0.35)";
  const axisColorDim = isLight ? "rgba(12,13,18,0.38)" : "rgba(255,255,255,0.22)";
  const axisColorY   = isLight ? "rgba(12,13,18,0.45)" : "rgba(255,255,255,0.45)";
  const gridColor    = isLight ? "rgba(0,0,0,0.07)"    : "rgba(255,255,255,0.04)";
  const barFill      = isLight ? "rgba(12,13,18,0.12)" : "rgba(255,255,255,0.15)";
  const barFill2     = isLight ? "rgba(12,13,18,0.20)" : "rgba(255,255,255,0.2)";

  // ── Derived metrics ────────────────────────────────────────────────────────
  const avgScore = useMemo(() =>
    leads.length ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0,
    [leads]);

  const portfolioValue = useMemo(() => {
    const v = projects.reduce((s, p) => s + p.value, 0);
    return v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${(v / 1_000).toFixed(0)}K`;
  }, [projects]);

  const activePipelineValue = useMemo(() => {
    const v = leads
      .filter(l => !["Won", "Lost"].includes(l.stage))
      .reduce((s, l) => s + l.value, 0);
    return v >= 1_000_000 ? `SAR ${(v / 1_000_000).toFixed(1)}M` : `SAR ${(v / 1_000).toFixed(0)}K`;
  }, [leads]);

  // Top city by lead count
  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    leads.forEach(l => { m[l.city] = (m[l.city] ?? 0) + 1; });
    return m;
  }, [leads]);

  const topCity = useMemo(() => {
    const entries = Object.entries(cityMap);
    if (!entries.length) return { name: "—", count: 0 };
    const [name, count] = entries.sort((a, b) => b[1] - a[1])[0];
    return { name, count };
  }, [cityMap]);

  // Leads by City — sorted descending
  const cityData = useMemo(() =>
    Object.entries(cityMap)
      .map(([city, leads]) => ({ city, leads }))
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 8),
    [cityMap]);

  // Industry mix from leads
  const industryData = useMemo(() => {
    const m: Record<string, number> = {};
    leads.forEach(l => { m[l.industry] = (m[l.industry] ?? 0) + 1; });
    const total = leads.length || 1;
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], i) => ({
        name,
        value: Math.round((count / total) * 100),
        color: INDUSTRY_PALETTE[i % INDUSTRY_PALETTE.length],
      }));
  }, [leads]);

  // Salesperson performance: won deals + total leads assigned
  const TEAM = [
    { key: "Ahmad S.",  label: "Ahmad S.",  full: "Ahmad Al-Sayed"   },
    { key: "Sarah M.",  label: "Sarah M.",  full: "Sarah Al-Mutairi" },
    { key: "Khalid O.", label: "Khalid O.", full: "Khalid Omar"      },
    { key: "Fatima G.", label: "Fatima G.", full: "Fatima Al-Ghamdi" },
  ];

  const salespeople = useMemo(() =>
    TEAM.map(t => {
      const myLeads = leads.filter(l => l.assigned === t.key);
      const won     = myLeads.filter(l => l.stage === "Won").length;
      const active  = myLeads.filter(l => !["Won", "Lost"].includes(l.stage)).length;
      const pipeline = myLeads.filter(l => ["Proposal Sent", "Negotiation"].includes(l.stage)).length;
      return { name: t.label, won, active, pipeline };
    }),
    [leads]);

  // Project health by category
  const projectHealthData = useMemo(() => {
    const HEALTH_ORDER = ["Healthy", "At Risk", "Delayed", "Critical", "Completed", "On Hold"] as const;
    const HEALTH_COLORS: Record<string, string> = {
      "Healthy":   "#4ade80",
      "At Risk":   "#fbbf24",
      "Delayed":   "#fb923c",
      "Critical":  "#f87171",
      "Completed": "#60a5fa",
      "On Hold":   "rgba(255,255,255,0.25)",
    };
    return HEALTH_ORDER
      .map(h => ({ health: h, count: projects.filter(p => p.health === h).length, color: HEALTH_COLORS[h] }))
      .filter(d => d.count > 0);
  }, [projects]);

  // Project stage pipeline — group into macro-stages
  const projectStagePipeline = useMemo(() => {
    const stageGroups = [
      { label: "Pre-Production", stages: ["Planning", "Discovery", "Client Approval", "Resource Allocation"] },
      { label: "In Progress",    stages: ["Production", "Development", "QA Testing"] },
      { label: "Review Phase",   stages: ["Internal Review", "Client Review", "Revision"] },
      { label: "Delivery",       stages: ["Deployment", "Support & Maintenance"] },
      { label: "Closed",         stages: ["Completed", "Delayed", "On Hold", "Critical"] },
    ];
    return stageGroups.map(g => ({
      stage: g.label,
      count: projects.filter(p => g.stages.includes(p.stage)).length,
      value: Math.round(projects.filter(p => g.stages.includes(p.stage)).reduce((s, p) => s + p.value, 0) / 1_000),
    }));
  }, [projects]);

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Summary row — all live */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Leads",        value: leads.length,         sub: `${leads.filter(l => l.stage === "Won").length} won deals`   },
          { label: "Active Pipeline",    value: activePipelineValue,  sub: `${leads.filter(l => !["Won","Lost"].includes(l.stage)).length} open deals` },
          { label: "Avg. Lead Score",    value: avgScore,             sub: "out of 100"                                                 },
          { label: "Portfolio Value",    value: `SAR ${portfolioValue}`, sub: `${projects.length} projects tracked`                    },
        ].map(s => (
          <div key={s.label} className="glass p-4">
            <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
            <p className="text-[22px] font-700 font-display mt-0.5 text-white/85">{s.value}</p>
            <p className="text-[10px] text-white/28 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leads by City — live from leads.city */}
        <div className="glass p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-600 text-white/70 font-display uppercase tracking-wide">Leads by City</p>
            <span className="badge badge-blue text-[9px]">Top city: {topCity.name} ({topCity.count})</span>
          </div>
          <p className="text-[10px] text-white/28 mb-4">Active opportunities by location · live data</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cityData} layout="vertical" margin={{ left: 20, right: 10, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" tick={{ fill: axisColorDim, fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="city" tick={{ fill: axisColorY, fontSize: 10 }} axisLine={false} tickLine={false} width={65} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="glass-sm px-2.5 py-1.5 text-[10px]">
                  <p className="text-white/45">{label}</p>
                  <p className="text-white/80 font-600">{payload[0].value} leads</p>
                </div>
              ) : null} />
              <Bar dataKey="leads" name="Leads" fill={barFill} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Industry mix — live from leads.industry */}
        <div className="glass p-4">
          <p className="text-[11px] font-600 text-white/70 font-display uppercase tracking-wide mb-1">Industry Mix</p>
          <p className="text-[10px] text-white/28 mb-3">% of leads by industry · live</p>
          {industryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={industryData} dataKey="value" cx="50%" cy="50%" outerRadius={55} innerRadius={30} paddingAngle={2}>
                    {industryData.map((d, i) => <Cell key={i} fill={d.color} opacity={0.75} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => active && payload?.length ? (
                    <div className="glass-sm px-2.5 py-1.5 text-[10px]">
                      <p style={{ color: payload[0].payload.color }}>{payload[0].name}: {payload[0].value}%</p>
                    </div>
                  ) : null} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2 max-h-[120px] overflow-y-auto">
                {industryData.slice(0, 7).map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="flex-1 text-white/50 truncate">{d.name}</span>
                    <span className="text-white/65 font-mono">{d.value}%</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[11px] text-white/25 text-center py-8">No data</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson performance — live from leads */}
        <div className="glass p-4">
          <p className="text-[11px] font-600 text-white/70 font-display uppercase tracking-wide mb-1">Salesperson Performance</p>
          <p className="text-[10px] text-white/28 mb-4">Won · Active · In Proposal/Negotiation · live data</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salespeople}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColorDim, fontSize: 8 }} axisLine={false} tickLine={false} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="glass-sm px-3 py-2 text-[10px] space-y-0.5">
                  <p className="text-white/40 mb-1">{label}</p>
                  {payload.map((p: any) => (
                    <p key={p.name} style={{ color: "rgba(255,255,255,0.7)" }}>{p.name}: {p.value}</p>
                  ))}
                </div>
              ) : null} />
              <Bar dataKey="won"      name="Won"              fill="rgba(74,222,128,0.4)"   radius={[2, 2, 0, 0]} />
              <Bar dataKey="pipeline" name="In Pipeline"      fill={barFill2}               radius={[2, 2, 0, 0]} />
              <Bar dataKey="active"   name="Active Leads"     fill={barFill}                radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Portfolio by Stage — live from projects */}
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-600 text-white/70 font-display uppercase tracking-wide">Project Portfolio</p>
            <span className="badge badge-blue text-[9px]">{projects.length} projects</span>
          </div>
          <p className="text-[10px] text-white/28 mb-4">Count by phase · value in SAR K · live data</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={projectStagePipeline}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="stage" tick={{ fill: axisColor, fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="count" tick={{ fill: axisColorDim, fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="value" orientation="right" tick={{ fill: axisColorDim, fontSize: 8 }} axisLine={false} tickLine={false} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div className="glass-sm px-3 py-2 text-[10px] space-y-0.5">
                  <p className="text-white/40 mb-1">{label}</p>
                  {payload.map((p: any) => (
                    <p key={p.name} style={{ color: "rgba(255,255,255,0.7)" }}>
                      {p.name}: {p.name === "Value (K)" ? `SAR ${p.value}K` : p.value}
                    </p>
                  ))}
                </div>
              ) : null} />
              <Bar yAxisId="count" dataKey="count" name="Projects"  fill={barFill}              radius={[2, 2, 0, 0]} />
              <Bar yAxisId="value" dataKey="value" name="Value (K)" fill="rgba(96,165,250,0.25)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Health mini-legend */}
          <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/[0.04]">
            {projectHealthData.map(d => (
              <div key={d.health} className="flex items-center gap-1.5 text-[9px]">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-white/45">{d.health}: {d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
