import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Search, 
  LogOut,
  Menu,
  FileSearch,
  BarChart2,
  Tag,
  Languages,
  KanbanSquare,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm", label: "CRM", icon: KanbanSquare },
  { href: "/leads", label: "Projects", icon: FolderKanban },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/applications", label: "Applications", icon: FileSearch },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/seo", label: "SEO", icon: Search },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/tracking", label: "Tracking", icon: Tag },
  { href: "/translations", label: "Translations", icon: Languages },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
      {format(time, "HH:mm:ss 'UTC'X")}
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const typedUser = user as { name?: string; email?: string } | undefined;

  const handleLogout = () => {
    logout.mutate();
  };

  const getPageTitle = () => {
    const route = location.split('/')[1] || 'dashboard';
    const names: Record<string, string> = {
      dashboard: "COMMAND CENTER",
      crm: "CLIENT PIPELINE",
      leads: "PROJECT PIPELINE",
      jobs: "TALENT PIPELINE",
      applications: "CANDIDATE PIPELINE",
      blog: "CONTENT SYSTEM",
      seo: "SEO COMMAND",
      analytics: "ANALYTICS",
      tracking: "TRACKING & ANALYTICS TAGS",
      translations: "LANGUAGE MATRIX"
    };
    return names[route] || route.toUpperCase();
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-[#020202] border-r border-white/[0.05] shadow-[1px_0_20px_rgba(255,255,255,0.04)] z-50 relative">
      <div className="p-6">
        <img src="/electi-logo.png" alt="Electi" style={{ width: "100%", height: 96, objectFit: "contain", objectPosition: "center" }} />
      </div>
      <div className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-[9px] uppercase tracking-[0.2em] text-white/20">Navigation</div>
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.href || location.startsWith(`${item.href}/`);
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-150 ${isActive ? 'bg-primary/[0.08] text-white border-l-2 border-primary glow-white' : 'text-white/50 border-l-2 border-transparent hover:bg-white/[0.04] hover:text-white'}`}>
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-white/40 group-hover:text-white/70'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium text-white/70">
              {typedUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col max-w-[100px]">
              <span className="text-xs font-medium truncate text-white/90">{typedUser?.name || 'Admin'}</span>
              <span className="text-[10px] text-white/40 truncate">{typedUser?.email}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white/30 hover:text-red-400 hover:bg-red-400/10">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[100dvh] bg-[#050505] text-white relative">
      <div className="ambient-bg" />
      
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-4 z-50 text-white hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56 border-none bg-transparent">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-56 fixed inset-y-0 z-40">
        <NavContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-[100dvh] relative">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 lg:px-8">
          <div className="flex-1">
            <span className="hidden md:inline-block font-display font-medium tracking-wide text-white/80">
              {getPageTitle()}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/40">All Systems Operational</span>
            </div>
            <LiveClock />
          </div>
        </header>

        <main className="flex-1 p-6 md:px-8 md:py-8 w-full max-w-7xl mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
