"use client";
import { useState, useMemo } from "react";
import { Search, Send, Mic, Paperclip, Bot, Phone, MoreVertical, CheckCheck, X } from "lucide-react";

const CONVERSATIONS = [
  { id: 1, name: "Mohammed Al-Rashid", company: "Saudi Aramco",   last: "Can we schedule a demo next week?",          time: "2m",  unread: 3, status: "active"   },
  { id: 2, name: "Fatima Al-Marei",    company: "Al-Marai Group", last: "The proposal looks great, proceeding",        time: "15m", unread: 0, status: "active"   },
  { id: 3, name: "Abdullah Al-Ghamdi", company: "NEOM Corp",      last: "I need the full scope document",              time: "1h",  unread: 1, status: "active"   },
  { id: 4, name: "Khalid Al-Fahad",    company: "Aldar Prop.",    last: "Payment has been processed ✅",               time: "2h",  unread: 0, status: "closed"   },
  { id: 5, name: "Sara Al-Olayan",     company: "Olayan Group",   last: "Please send the contract asap",               time: "4h",  unread: 2, status: "active"   },
  { id: 6, name: "Ahmed Al-Futtaim",   company: "Al-Futtaim",    last: "Let me check with the board",                 time: "1d",  unread: 0, status: "pending"  },
  { id: 7, name: "Omar Al-Harbi",      company: "Retal Urban",    last: "We are very interested in the package",       time: "2d",  unread: 0, status: "archived" },
];

const MESSAGES = [
  { from: "them", text: "Hello! I saw your presentation at the Real Estate expo yesterday. Very impressive.", time: "09:14", read: true },
  { from: "me",   text: "Thank you Mohammed! Great to connect. X360 has helped 80+ companies in the GCC automate their operations.", time: "09:16", read: true },
  { from: "them", text: "We are currently looking for a solution to manage our vendor communications and project documentation. Do you cover construction monitoring?", time: "09:18", read: true },
  { from: "me",   text: "Absolutely! Our Construction Monitoring module is built specifically for projects like yours. It includes real-time site logging, AI issue detection, drone report integration, and milestone tracking.", time: "09:20", read: true },
  { from: "them", text: "That sounds exactly what we need. Can we schedule a demo next week? Preferably Monday or Tuesday.", time: "10:03", read: true },
  { from: "them", text: "Also, can you send me a pricing overview?", time: "10:04", read: false },
];

const AI_SUGGESTIONS = [
  "Sure! I'm available Monday at 10 AM or Tuesday at 2 PM Riyadh time. Which works best for you?",
  "I'll send you our enterprise pricing deck — tailored to companies of your scale. What's the best email?",
  "Would you like me to send a quick 2-minute video of the Construction Monitoring module?",
];

const STATUS_FILTERS = ["All", "active", "pending", "closed", "archived"] as const;

export default function WhatsAppPage() {
  const [active, setActive] = useState(CONVERSATIONS[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredConversations = useMemo(() => {
    const q = search.toLowerCase();
    return CONVERSATIONS.filter(c => {
      const matchesSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.last.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "me", text: input, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), read: false }]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 max-w-[1400px]">
      {/* Conversations */}
      <div className="w-64 shrink-0 glass flex flex-col overflow-hidden">
        <div className="p-3 border-b border-white/[0.04] space-y-2">
          {/* Search */}
          <div className="flex items-center gap-2 glass-sm px-2.5 py-1.5">
            <Search className="w-3 h-3 text-white/30 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search chats…"
              className="bg-transparent text-[11px] text-white/60 placeholder-white/20 outline-none flex-1"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="w-3 h-3 text-white/25 hover:text-white/50" />
              </button>
            )}
          </div>
          {/* Status filter pills */}
          <div className="flex gap-1 flex-wrap">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2 py-0.5 rounded-md text-[9px] font-500 capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-white/[0.1] text-white/85"
                    : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <p className="text-center text-[10px] text-white/25 py-6">No chats found</p>
          ) : (
            filteredConversations.map(c => (
              <button key={c.id} onClick={() => setActive(c)} className={`w-full text-left px-3 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors ${active.id === c.id ? "bg-white/[0.05]" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-[9px] font-700 text-white/60 shrink-0 mt-0.5">
                    {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[11px] font-600 text-white/80 truncate">{c.name}</p>
                      <span className="text-[8px] text-white/25 font-mono shrink-0">{c.time}</span>
                    </div>
                    <p className="text-[9px] text-white/35 truncate">{c.company}</p>
                    <p className="text-[10px] text-white/45 truncate mt-0.5">{c.last}</p>
                  </div>
                  {c.unread > 0 && (
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] font-700 text-black shrink-0 mt-1">{c.unread}</div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 glass flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-[10px] font-700 text-white/70">
              {active.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div>
              <p className="text-[12px] font-600 text-white/80">{active.name}</p>
              <p className="text-[9px] text-white/35">{active.company} · <span className="text-green-400/70">Online</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="glass-sm p-1.5 hover:bg-white/[0.06] transition-colors rounded-lg"><Phone className="w-3.5 h-3.5 text-white/40" /></button>
            <button className="glass-sm p-1.5 hover:bg-white/[0.06] transition-colors rounded-lg"><MoreVertical className="w-3.5 h-3.5 text-white/40" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[72%] px-3 py-2 rounded-xl text-[12px] leading-relaxed ${m.from === "me" ? "bg-white/[0.1] text-white/85 rounded-br-sm" : "bg-white/[0.05] text-white/70 rounded-bl-sm"}`}>
                <p>{m.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <span className="text-[8px] text-white/25 font-mono">{m.time}</span>
                  {m.from === "me" && <CheckCheck className={`w-3 h-3 ${m.read ? "text-blue-400/60" : "text-white/25"}`} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI suggestions */}
        <div className="px-4 py-2 border-t border-white/[0.03]">
          <div className="flex items-center gap-1.5 mb-2">
            <Bot className="w-3 h-3 text-purple-400/60" />
            <span className="text-[9px] font-600 text-purple-400/60 tracking-wide uppercase">AI Suggested Replies</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {AI_SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => setInput(s)} className="text-[10px] glass-sm px-2.5 py-1.5 text-white/55 hover:text-white/80 hover:bg-white/[0.06] transition-colors rounded-lg text-left max-w-[280px] truncate">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-white/[0.04] flex items-center gap-2 shrink-0">
          <button className="glass-sm p-2 hover:bg-white/[0.06] transition-colors rounded-lg"><Paperclip className="w-3.5 h-3.5 text-white/35" /></button>
          <div className="flex-1 glass-sm px-3 py-2 flex items-center gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" className="flex-1 bg-transparent text-[12px] text-white/70 placeholder-white/25 outline-none" />
            <button className="glass-sm p-1.5 hover:bg-white/[0.06] transition-colors rounded-md"><Mic className="w-3 h-3 text-white/35" /></button>
          </div>
          <button onClick={send} className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg p-2 transition-colors">
            <Send className="w-3.5 h-3.5 text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
