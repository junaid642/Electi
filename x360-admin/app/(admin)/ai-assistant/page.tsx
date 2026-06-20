"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Zap, FileText, BarChart3, Users, Sparkles, RefreshCw } from "lucide-react";

const QUICK_ACTIONS = [
  { icon: FileText, label: "Generate Proposal",   prompt: "Write a short proposal for a real estate developer in Riyadh interested in 360° virtual tours and AI solutions." },
  { icon: Users,    label: "Lead Qualification",  prompt: "What questions should I ask to qualify a hospitality lead for X360 virtual tour services?" },
  { icon: BarChart3,label: "Our Services",        prompt: "Give me a concise summary of all X360 services." },
  { icon: Zap,      label: "Contact Info",        prompt: "What is X360's contact information and how can clients reach us?" },
];

type Message = { role: "user" | "assistant"; text: string; time: string };

const INITIAL_MSGS: Message[] = [
  {
    role: "assistant",
    text: "Hi! I'm the X360 AI Assistant.\n\nI can help with questions about X360's services, team, clients, and how to help your leads. Keep questions focused on X360.",
    time: "Just now",
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MSGS);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [convId, setConvId]     = useState<number | null>(null);
  const [convToken, setConvToken] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const createConversation = async () => {
    try {
      const res = await fetch("/api/anthropic/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Admin Chat" }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setConvId(data.id);
      setConvToken(data.token);
    } catch { /* server not ready — show fallback */ }
  };

  useEffect(() => { createConversation(); }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { role: "user", text, time }]);
    setInput("");
    setLoading(true);

    if (!convId || !convToken) {
      setMessages(m => [...m, { role: "assistant", text: "Connection unavailable. Please refresh and try again.", time }]);
      setLoading(false);
      return;
    }

    const replyTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { role: "assistant", text: "", time: replyTime }]);

    try {
      const res = await fetch(`/api/anthropic/conversations/${convId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-chat-token": convToken,
        },
        body: JSON.stringify({ content: text }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setMessages(m => {
                const updated = [...m];
                const last = updated[updated.length - 1];
                if (last?.role === "assistant") {
                  updated[updated.length - 1] = { ...last, text: last.text + data.content };
                }
                return updated;
              });
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }
    } catch {
      setMessages(m => {
        const updated = [...m];
        const last = updated[updated.length - 1];
        if (last?.role === "assistant" && last.text === "") {
          updated[updated.length - 1] = { ...last, text: "Something went wrong. Please try again." };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setMessages(INITIAL_MSGS);
    setConvId(null);
    setConvToken(null);
    createConversation();
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong style="color:rgba(255,255,255,0.88);font-weight:600">${t}</strong>`);
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />;
    });

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 max-w-[1400px]">

      {/* ── Sidebar ────────────────────────────────────────────── */}
      <div className="w-56 shrink-0 space-y-3">
        <div className="glass p-3">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-purple-400" />
            <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide">Quick Actions</p>
          </div>
          <div className="space-y-1.5">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => sendMessage(a.prompt)}
                disabled={loading}
                className="w-full text-left glass-sm px-2.5 py-2 rounded-lg hover:bg-white/[0.05] transition-colors flex items-center gap-2 group disabled:opacity-40"
              >
                <a.icon className="w-3 h-3 text-white/30 group-hover:text-purple-400/70 transition-colors shrink-0" />
                <span className="text-[10px] text-white/50 group-hover:text-white/75 transition-colors">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass p-3">
          <p className="text-[10px] font-600 text-white/40 uppercase tracking-wide mb-2">AI Status</p>
          <div className="space-y-1.5 text-[10px] text-white/45">
            <div className="flex items-center gap-2">
              <div className="pulse-dot bg-green-500 w-1.5 h-1.5" />
              <span>Model: Claude Sonnet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Context: X360 Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${convId ? "bg-green-500" : "bg-yellow-500"}`} />
              <span>{convId ? "Connected" : "Connecting…"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chat ──────────────────────────────────────────────── */}
      <div className="flex-1 glass flex flex-col min-h-0 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div>
              <p className="text-[12px] font-600 text-white/80">X360 AI Assistant</p>
              <p className="text-[9px] text-purple-400/60">X360 Knowledge · Short &amp; Clear Answers</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="glass-sm p-1.5 hover:bg-white/[0.06] transition-colors rounded-lg"
            title="New conversation"
          >
            <RefreshCw className="w-3 h-3 text-white/30" />
          </button>
        </div>

        {/* Messages — min-h-0 is required so overflow-y-auto actually scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border ${
                msg.role === "assistant"
                  ? "bg-purple-500/15 border-purple-500/25"
                  : "bg-white/[0.08] border-white/[0.1]"
              }`}>
                {msg.role === "assistant"
                  ? <Sparkles className="w-3 h-3 text-purple-400" />
                  : <span className="text-[9px] font-700 text-white/60">SA</span>}
              </div>
              <div className={`max-w-[78%] space-y-1 ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
                <div className={`px-3.5 py-2.5 rounded-xl text-[12px] text-white/72 space-y-0.5 ${
                  msg.role === "assistant"
                    ? "bg-white/[0.04] rounded-tl-sm"
                    : "bg-white/[0.08] rounded-tr-sm"
                }`}>
                  {msg.text
                    ? renderText(msg.text)
                    : (
                      <div className="flex items-center gap-1.5 py-0.5">
                        {[0, 1, 2].map(j => (
                          <div key={j} className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                            style={{ animationDelay: `${j * 0.15}s` }} />
                        ))}
                      </div>
                    )
                  }
                </div>
                <p className="text-[8px] text-white/22 font-mono px-1">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-white/[0.04] flex items-center gap-2 shrink-0">
          <div className="flex-1 glass-sm flex items-center gap-2 px-3 py-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask about X360 services, team, or clients…"
              className="flex-1 bg-transparent text-[12px] text-white/70 placeholder-white/22 outline-none"
              disabled={loading}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg p-2 transition-colors disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
