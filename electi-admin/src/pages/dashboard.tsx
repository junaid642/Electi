import { useGetDashboardStats, useGetDashboardActivity } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, FileSearch, FileText, ArrowUpRight, Activity, Server, Database, Lock, Globe } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = value / (duration / 16);
    
    if (value === 0) return;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useGetDashboardActivity();

  if (statsLoading || activitiesLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-32 animate-pulse flex flex-col justify-between">
              <div className="h-3 w-20 bg-white/[0.04] rounded" />
              <div className="h-8 w-16 bg-white/[0.04] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Leads", value: stats?.totalLeads || 0, icon: Users, trend: `+${stats?.newLeadsThisWeek || 0} this week` },
    { title: "New Leads (Wk)", value: stats?.newLeadsThisWeek || 0, icon: ArrowUpRight, isHighlight: true },
    { title: "Total Jobs", value: stats?.totalJobs || 0, icon: Briefcase },
    { title: "Open Jobs", value: stats?.openJobs || 0, icon: Briefcase, isHighlight: true },
    { title: "Applications", value: stats?.totalApplications || 0, icon: FileSearch },
    { title: "New Apps (Wk)", value: stats?.newApplicationsThisWeek || 0, icon: ArrowUpRight, isHighlight: true },
    { title: "Blog Posts", value: stats?.totalBlogPosts || 0, icon: FileText },
    { title: "Published", value: stats?.publishedBlogPosts || 0, icon: FileText, isHighlight: true },
  ];

  const systemStatus = [
    { name: "API Server", icon: Server },
    { name: "Database", icon: Database },
    { name: "Auth Layer", icon: Lock },
    { name: "CDN", icon: Globe },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">COMMAND CENTER</h1>
        </div>
        <div className="text-[11px] tracking-widest uppercase text-white/30">
          {format(new Date(), "MMMM dd, yyyy")}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className={`glass-card border-none bg-white/[0.03] backdrop-blur-xl border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] h-full flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 ${stat.isHighlight ? 'glow-cyan border-primary/20 bg-primary/[0.02]' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                  {stat.title}
                </span>
                <stat.icon className="h-3.5 w-3.5 text-white/15" />
              </div>
              <div>
                <div className="text-4xl stat-value text-white">
                  <AnimatedCounter value={stat.value} />
                </div>
                {stat.trend && (
                  <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-mono tracking-tight">
                    <ArrowUpRight className="h-3 w-3" /> {stat.trend}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="mb-4">
            <h2 className="text-[11px] uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              SYSTEM FEED
            </h2>
          </div>
          <div className="glass-card p-6 min-h-[400px]">
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/10">
              {activities?.map((activity, i) => (
                <motion.div 
                  key={activity.id} 
                  className="relative flex items-start gap-6 pl-10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                >
                  <div className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-white/90">{activity.title}</p>
                      <span className="text-[10px] text-white/25 font-mono">
                        {format(new Date(activity.createdAt), 'HH:mm:ss')}
                      </span>
                    </div>
                    <p className="text-sm text-white/50">{activity.description}</p>
                  </div>
                </motion.div>
              ))}
              {!activities?.length && (
                <div className="text-center py-12 text-white/30 text-sm italic">
                  No system events recorded.
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="mb-4">
            <h2 className="text-[11px] uppercase tracking-widest text-white/40">
              SYSTEM STATUS
            </h2>
          </div>
          <div className="glass-card p-6 space-y-6">
            {systemStatus.map((sys, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                    <sys.icon className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-sm text-white/80">{sys.name}</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest text-green-400">NOMINAL</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
