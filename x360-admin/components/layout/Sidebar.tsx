"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  LayoutDashboard, LineChart, Target, MessageCircle,
  FolderKanban, Network, Rocket, Sparkles, Bell,
  Users2, SlidersHorizontal, LogOut, ChevronLeft, ChevronRight, X,
  Newspaper, Briefcase, Search, Tag, Languages, Film,
  Eye, FolderOpen, DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";

const NAV = [
  {
    group: "OVERVIEW",
    items: [
      { label: "Dashboard",       href: "/dashboard",      icon: LayoutDashboard,  cmd: "COMMAND CENTER"    },
      { label: "Analytics",       href: "/analytics",      icon: LineChart,         cmd: "ANALYTICS COMMAND" },
    ],
  },
  {
    group: "SALES & OPERATIONS",
    items: [
      { label: "CRM / Leads",     href: "/crm",            icon: Target,            cmd: "LEAD INTELLIGENCE" },
      { label: "WhatsApp Hub",    href: "/whatsapp",       icon: MessageCircle,     cmd: "COMMS CENTER"      },
      { label: "Projects",        href: "/projects",       icon: FolderKanban,      cmd: "PROJECT OPS"       },
      { label: "Documents",       href: "/documents",      icon: FolderOpen,        cmd: "DOCUMENTS"         },
      { label: "Virtual Tours",   href: "/virtual-tours",  icon: Eye,               cmd: "TOUR MANAGER"      },
      { label: "Referrals",       href: "/referrals",      icon: Network,           cmd: "PARTNER NETWORK"   },
      { label: "Growth Strategy", href: "/strategy",       icon: Rocket,            cmd: "STRATEGY & GROWTH" },
    ],
  },
  {
    group: "CONTENT & MARKETING",
    items: [
      { label: "Blog",            href: "/blog",           icon: Newspaper,         cmd: "CONTENT HUB"       },
      { label: "Jobs",            href: "/jobs",           icon: Briefcase,         cmd: "TALENT PIPELINE"   },
      { label: "SEO",             href: "/seo",            icon: Search,            cmd: "SEO COMMAND"        },
      { label: "Tracking",        href: "/tracking",       icon: Tag,               cmd: "TAG MANAGER"        },
      { label: "Translations",    href: "/translations",   icon: Languages,         cmd: "LANGUAGE MATRIX"    },
      { label: "Media",           href: "/media",          icon: Film,              cmd: "MEDIA MANAGER"      },
    ],
  },
  {
    group: "AI & SYSTEM",
    items: [
      { label: "AI Assistant",    href: "/ai-assistant",   icon: Sparkles,          cmd: "AI NEURAL HUB"     },
      { label: "Notifications",   href: "/notifications",  icon: Bell,              cmd: "ALERT CENTER"      },
    ],
  },
  {
    group: "TEAM & ADMIN",
    items: [
      { label: "Teams",           href: "/hr",             icon: Users2,            cmd: "TEAM OPS"          },
      { label: "Finance",         href: "/finance",        icon: DollarSign,        cmd: "FINANCE"           },
      { label: "Settings",        href: "/settings",       icon: SlidersHorizontal, cmd: "SYSTEM CONFIG"     },
    ],
  },
];

export const ROUTE_TITLES: Record<string, string> = {};
NAV.forEach(g => g.items.forEach(i => { ROUTE_TITLES[i.href] = i.cmd; }));

function NavItem({
  item, active, collapsed, isLight,
}: {
  item: typeof NAV[0]["items"][0];
  active: boolean;
  collapsed: boolean;
  isLight: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        "relative flex items-center gap-2.5 rounded-md text-[12px] font-500 transition-all duration-150 border-l-2 group overflow-hidden",
        collapsed ? "justify-center px-0 py-2 w-full" : "px-2.5 py-1.5",
        active
          ? isLight
            ? "bg-black/[0.06] border-black/60 text-black shadow-none"
            : "bg-white/[0.07] border-white/50 text-white shadow-[0_0_12px_rgba(255,255,255,0.04)]"
          : isLight
            ? "border-transparent text-black/45 hover:text-black/75 hover:bg-black/[0.04]"
            : "border-transparent text-white/42 hover:text-white/75 hover:bg-white/[0.04]"
      )}
    >
      <Icon className={cn(
        "shrink-0 transition-colors duration-150",
        collapsed ? "w-4 h-4" : "w-3.5 h-3.5",
        active
          ? isLight ? "text-black" : "text-white"
          : isLight ? "text-black/38 group-hover:text-black/65" : "text-white/38 group-hover:text-white/65"
      )} />
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {active && (
            <ChevronRight className={cn(
              "w-2.5 h-2.5 ml-auto shrink-0",
              isLight ? "text-black/35" : "text-white/35"
            )} />
          )}
        </>
      )}
      {collapsed && (
        <span className={cn(
          "pointer-events-none absolute left-full ms-2 px-2 py-1 rounded-md text-[10px] font-600 whitespace-nowrap border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50",
          isLight
            ? "bg-white border-black/[0.10] text-black/80"
            : "bg-[#1a1a1a] border-white/[0.08] text-white/80"
        )}>
          {item.label}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname    = usePathname();
  const router      = useRouter();
  const current     = "/" + (pathname.split("/")[1] || "");
  const { resolvedTheme } = useTheme();
  const isLight     = resolvedTheme === "light";
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("x360-auth");
    router.push("/login");
  };

  const sidebarContent = (isMobile = false) => (
    <aside
      className={cn(
        "flex flex-col h-screen border-r z-30 transition-all duration-300 ease-in-out",
        isLight
          ? "bg-[#f8f8f8] border-black/[0.07] shadow-[1px_0_20px_rgba(0,0,0,0.06)]"
          : "bg-[#010101] border-white/[0.04] shadow-[1px_0_20px_rgba(255,255,255,0.025)]",
        isMobile ? "w-60" : collapsed ? "w-14" : "w-56"
      )}
    >
      {/* Header / Logo */}
      <div className={cn(
        "h-14 flex items-center justify-center border-b shrink-0 transition-all duration-300 relative",
        isLight ? "border-black/[0.06]" : "border-white/[0.04]",
        collapsed && !isMobile ? "px-2" : "px-4"
      )}>
        {(!collapsed || isMobile) && (
          <Image
            src={isLight ? "/x360-admin/logo-dark.png" : "/x360-admin/logo-white.png"}
            alt="X360"
            width={110}
            height={36}
            style={{ width: "auto", height: "32px" }}
            className="object-contain"
            priority
          />
        )}
        {collapsed && !isMobile && (
          <span className={cn(
            "text-[13px] font-800 tracking-widest",
            isLight ? "text-black/50" : "text-white/50"
          )}>X</span>
        )}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className={cn(
              "absolute right-3 transition-colors p-1 rounded-md",
              isLight
                ? "text-black/40 hover:text-black/70 hover:bg-black/[0.04]"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-3 space-y-3.5 transition-all duration-300 scrollbar-none",
        collapsed && !isMobile ? "px-1" : "px-2"
      )}>
        {NAV.map((group) => (
          <div key={group.group}>
            {(!collapsed || isMobile) && (
              <p className={cn(
                "text-[8px] font-600 tracking-[0.18em] uppercase px-2 mb-1",
                isLight ? "text-black/30" : "text-white/20"
              )}>{group.group}</p>
            )}
            {collapsed && !isMobile && (
              <div className={cn(
                "w-5 h-px mx-auto mb-2",
                isLight ? "bg-black/[0.08]" : "bg-white/[0.05]"
              )} />
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = current === item.href || pathname.startsWith(item.href + "/");
                return (
                  <NavItem
                    key={item.href}
                    item={item}
                    active={active}
                    collapsed={collapsed && !isMobile}
                    isLight={isLight}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn(
        "shrink-0 border-t",
        isLight ? "border-black/[0.06]" : "border-white/[0.04]"
      )}>
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 transition-all duration-150",
              collapsed ? "justify-center" : "justify-end",
              isLight
                ? "text-black/30 hover:text-black/55 hover:bg-black/[0.03]"
                : "text-white/22 hover:text-white/50 hover:bg-white/[0.025]"
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed
              ? <ChevronRight className="w-3 h-3" />
              : <><span className="text-[9px] tracking-wider">COLLAPSE</span><ChevronLeft className="w-3 h-3" /></>
            }
          </button>
        )}

        <div className={cn("p-3", collapsed && !isMobile ? "px-1" : "")}>
          <div className={cn(
            "flex items-center gap-2.5 rounded-lg transition-colors",
            collapsed && !isMobile ? "justify-center px-1 py-1.5" : "px-1.5 py-1.5"
          )}>
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-700 shrink-0",
              isLight
                ? "bg-black/[0.07] border border-black/[0.12] text-black/60"
                : "bg-white/[0.07] border border-white/[0.12] text-white/60"
            )}>
              SA
            </div>
            {(!collapsed || isMobile) && (
              <>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-[11px] font-600 truncate",
                    isLight ? "text-black/80" : "text-white/80"
                  )}>Super Admin</p>
                  <p className={cn(
                    "text-[9px] truncate",
                    isLight ? "text-black/35" : "text-white/28"
                  )}>admin@x360.sa</p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="text-red-500/50 hover:text-red-500/80 transition-colors p-1 rounded-md hover:bg-red-500/[0.06] shrink-0"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          {collapsed && !isMobile && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-full flex justify-center py-1.5 text-red-500/40 hover:text-red-500/70 transition-colors rounded-md hover:bg-red-500/[0.05] mt-0.5"
            >
              <LogOut className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{sidebarContent(false)}</div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
