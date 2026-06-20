"use client";
import { useState } from "react";
import { Bell, CheckCheck, Filter, MessageCircle, Calendar, AlertCircle, Users, Briefcase, CheckCircle } from "lucide-react";

const ALL_NOTIFS = [
  { id: 1,  icon: MessageCircle, color: "text-green-400",  bg: "bg-green-500/10",  title: "New WhatsApp message",       text: "Mohammed Al-Rashid (Saudi Aramco) replied to your proposal follow-up",    time: "2 minutes ago",   read: false, category: "Messages",  group: "Today"     },
  { id: 3,  icon: CheckCircle,   color: "text-blue-400",   bg: "bg-blue-500/10",   title: "Proposal accepted",          text: "Aldar Properties accepted Proposal P-1047 — Virtual Tour Premium Package", time: "1 hour ago",      read: false, category: "CRM",       group: "Today"     },
  { id: 4,  icon: AlertCircle,   color: "text-amber-400",  bg: "bg-amber-500/10",  title: "Follow-up overdue",          text: "5 leads haven't been contacted in 7+ days. AI recommends immediate action", time: "2 hours ago",     read: false, category: "CRM",       group: "Today"     },
  { id: 5,  icon: Calendar,      color: "text-purple-400", bg: "bg-purple-500/10", title: "Meeting in 30 minutes",      text: "Demo call with Emirates NBD at 3:00 PM — 4 attendees confirmed",           time: "3 hours ago",     read: true,  category: "Meetings",  group: "Today"     },
  { id: 6,  icon: Briefcase,     color: "text-blue-400",   bg: "bg-blue-500/10",   title: "Project milestone reached",  text: "Al-Marai CRM Implementation is 85% complete — review required",           time: "5 hours ago",     read: true,  category: "Projects",  group: "Today"     },
  { id: 8,  icon: Users,         color: "text-cyan-400",   bg: "bg-cyan-500/10",   title: "New referral lead submitted",text: "Al-Faisal Real Estate submitted a new lead: Gulf Petrochem",              time: "Yesterday 2:30",  read: true,  category: "Partners",  group: "Yesterday" },
  { id: 9,  icon: MessageCircle, color: "text-green-400",  bg: "bg-green-500/10",  title: "WhatsApp broadcast sent",    text: "Your follow-up campaign reached 34 contacts — 12 responses so far",       time: "Yesterday 11:00", read: true,  category: "Messages",  group: "Yesterday" },
  { id: 10, icon: CheckCircle,   color: "text-blue-400",   bg: "bg-blue-500/10",   title: "Virtual tour launched",      text: "Al-Nakheel Compound virtual tour is now live — share link ready",          time: "2 days ago",      read: true,  category: "Projects",  group: "This Week" },
  { id: 12, icon: Users,         color: "text-purple-400", bg: "bg-purple-500/10", title: "New partner registered",     text: "Al-Baraka Consulting joined the X360 Partner Network — Bronze tier",       time: "3 days ago",      read: true,  category: "Partners",  group: "This Week" },
];

const CATEGORIES = ["All", "CRM", "Messages", "Projects", "Meetings", "Partners"];

export default function NotificationsPage() {
  const [cat, setCat] = useState("All");
  const [showUnread, setShowUnread] = useState(false);

  const filtered = ALL_NOTIFS.filter(n =>
    (cat === "All" || n.category === cat) &&
    (!showUnread || !n.read)
  );

  const unread = ALL_NOTIFS.filter(n => !n.read).length;
  const grouped = ["Today", "Yesterday", "This Week"].map(g => ({
    group: g, items: filtered.filter(n => n.group === g)
  })).filter(g => g.items.length > 0);

  return (
    <div className="space-y-4 max-w-[800px]">
      {/* Header */}
      <div className="glass p-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-white/45" />
          <span className="text-[11px] font-600 text-white/65 uppercase tracking-wide">{unread} Unread</span>
        </div>
        <div className="flex gap-1.5 flex-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-2.5 py-1 rounded-md text-[10px] font-500 transition-colors ${cat === c ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}>{c}</button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={() => setShowUnread(!showUnread)} className={`flex items-center gap-1.5 glass-sm px-2.5 py-1.5 text-[10px] transition-colors ${showUnread ? "text-white/75 bg-white/[0.06]" : "text-white/40 hover:text-white/65"}`}>
            <Filter className="w-3 h-3" /> Unread only
          </button>
          <button className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 text-[10px] text-white/40 hover:text-white/65 transition-colors">
            <CheckCheck className="w-3 h-3" /> Mark all read
          </button>
        </div>
      </div>

      {grouped.map(({ group, items }) => (
        <div key={group}>
          <p className="text-[9px] font-600 tracking-[0.16em] uppercase text-white/22 mb-2 px-1">{group}</p>
          <div className="space-y-1.5">
            {items.map(n => (
              <div key={n.id} className={`glass flex items-start gap-3 p-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer ${!n.read ? "border-l-2 border-white/25" : ""}`}>
                <div className={`w-8 h-8 rounded-xl ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <n.icon className={`w-4 h-4 ${n.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-[12px] font-600 leading-tight ${n.read ? "text-white/65" : "text-white/88"}`}>{n.title}</p>
                    <span className="text-[9px] text-white/22 font-mono shrink-0">{n.time}</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed mt-0.5 ${n.read ? "text-white/38" : "text-white/55"}`}>{n.text}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="badge badge-white text-[8px]">{n.category}</span>
                    {!n.read && <span className="badge badge-blue text-[8px]">New</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="glass p-12 text-center">
          <Bell className="w-8 h-8 text-white/15 mx-auto mb-3" />
          <p className="text-[12px] text-white/30">No notifications match your filters</p>
        </div>
      )}
    </div>
  );
}
