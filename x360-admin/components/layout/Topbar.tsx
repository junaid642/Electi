"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, X, CheckCheck, Menu } from "lucide-react";
import { ROUTE_TITLES } from "./Sidebar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useStore } from "@/lib/store";
import { useSidebar } from "@/contexts/SidebarContext";

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function Topbar() {
  const pathname = usePathname();
  const seg = "/" + (pathname.split("/")[1] || "");
  const title = ROUTE_TITLES[seg] ?? "X360 ADMIN";

  const { notifications, markNotificationRead, markAllRead, clearNotification } = useStore();
  const unread = notifications.filter((n) => !n.read).length;
  const { setMobileOpen } = useSidebar();

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  useOutsideClick(notifRef, () => setNotifOpen(false));

  const NOTIF_ICONS: Record<string, string> = {
    lead: "💬", proposal: "📄", task: "✅", payment: "💰", meeting: "📅", system: "⚡",
  };

  return (
    <header className="h-14 shrink-0 flex items-center px-5 border-b border-white/[0.04] backdrop-blur-xl bg-[#010101]/80 sticky top-0 z-20 gap-4">

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden w-7 h-7 rounded-lg glass-sm flex items-center justify-center hover:bg-white/[0.06] transition-colors text-white/50 hover:text-white/80"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center gap-1.5">
          <div className="pulse-dot bg-green-500" />
          <span className="text-[9px] font-600 tracking-[0.22em] uppercase text-white/30 font-mono">LIVE</span>
        </div>
        <span className="w-px h-3 bg-white/[0.08]" />
        <h1 className="text-[11px] font-700 tracking-[0.2em] uppercase text-white/70 font-display truncate">
          {title}
        </h1>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 glass-sm px-3 py-1.5 w-52 rounded-lg">
        <Search className="w-3 h-3 text-white/25 shrink-0" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-[11px] text-white/60 placeholder-white/20 outline-none flex-1 min-w-0"
        />
        <kbd className="text-[8px] text-white/18 bg-white/[0.04] rounded px-1">⌘K</kbd>
      </div>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="relative w-7 h-7 rounded-lg glass-sm flex items-center justify-center hover:bg-white/[0.06] transition-colors"
        >
          <Bell className="w-3.5 h-3.5 text-white/50" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] font-700 text-black">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-9 w-80 glass border border-white/[0.08] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <p className="text-[12px] font-700 text-white/80 font-display">Notifications</p>
              <button onClick={() => { markAllRead(); }} className="flex items-center gap-1 text-[10px] text-white/38 hover:text-white/65 transition-colors">
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 && (
                <p className="text-center text-[12px] text-white/25 py-8">No notifications</p>
              )}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.03] transition-colors group ${!n.read ? "bg-white/[0.02]" : ""}`}
                >
                  <span className="text-base shrink-0 mt-0.5">{NOTIF_ICONS[n.type] ?? "🔔"}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-600 ${n.read ? "text-white/50" : "text-white/80"}`}>{n.title}</p>
                    <p className="text-[10px] text-white/35 mt-0.5 truncate">{n.body}</p>
                    <p className="text-[9px] text-white/22 mt-0.5">{new Date(n.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-white/50" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); clearNotification(n.id); }}
                      className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-white/55 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-white/[0.04]">
              <button className="w-full text-[11px] text-white/38 hover:text-white/60 transition-colors text-center">
                View all notifications →
              </button>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}
