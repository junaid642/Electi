"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Bot, Send, Loader2, X } from "lucide-react";

const WA_NUMBER = "966532087436";
const BUBBLE_KEY = "x360-wa-bubble-v1";

type ChatMsg = { role: "user" | "assistant"; content: string; streaming?: boolean };

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ display: "block" }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function WhatsAppButton() {
  const { isAr } = useLang();

  /* ── Visibility / idle ── */
  const [visible,    setVisible]    = useState(false);
  const [hovered,    setHovered]    = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [idleShake,  setIdleShake]  = useState(false);
  const idleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Menu / chat state ── */
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  /* ── AI chat state ── */
  const [msgs,       setMsgs]       = useState<ChatMsg[]>([]);
  const [input,      setInput]      = useState("");
  const [convId,     setConvId]     = useState<number | null>(null);
  const [convToken,  setConvToken]  = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const waMsg  = encodeURIComponent(
    isAr
      ? "مرحباً فريق X360، أود الاستفسار عن خدماتكم."
      : "Hello X360 Team, I would like to learn more about your services."
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  /* ── Appear after 5 s ── */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 5000);
    if (typeof sessionStorage !== "undefined" && !sessionStorage.getItem(BUBBLE_KEY)) {
      const tb = setTimeout(() => {
        setShowBubble(true);
        sessionStorage.setItem(BUBBLE_KEY, "1");
        setTimeout(() => setShowBubble(false), 5000);
      }, 7000);
      return () => { clearTimeout(t); clearTimeout(tb); };
    }
    return () => clearTimeout(t);
  }, []);

  /* ── Idle shake ── */
  useEffect(() => {
    if (!visible) return;
    idleRef.current = setInterval(() => {
      if (!hovered && !menuOpen && !chatOpen) {
        setIdleShake(true);
        setTimeout(() => setIdleShake(false), 700);
      }
    }, 12000);
    return () => { if (idleRef.current) clearInterval(idleRef.current); };
  }, [visible, hovered, menuOpen, chatOpen]);

  /* ── Chat: scroll to bottom ── */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  /* ── Chat: greet on first open ── */
  useEffect(() => {
    if (chatOpen && msgs.length === 0) {
      setMsgs([{
        role: "assistant",
        content: isAr
          ? "مرحباً! أنا مساعد X360. يمكنني مساعدتك في معرفة خدماتنا وحلولنا. كيف يمكنني مساعدتك اليوم؟"
          : "Hi! I'm X360's assistant. I can help you learn about our services and solutions. How can I help you today?",
      }]);
    }
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const quickReplies = isAr
    ? ["ما هي خدماتكم؟", "احجز عرضاً", "تطوير الويب", "الذكاء الاصطناعي"]
    : ["What services do you offer?", "Book a demo", "Web development", "AI solutions"];

  /* ── Send message ── */
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setLoading(true);
    setMsgs(prev => [...prev, { role: "user", content: text }]);
    try {
      let cId = convId;
      let cTok = convToken;
      if (!cId) {
        const r = await fetch("/api/anthropic/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: text.slice(0, 60) }) });
        const d = await r.json() as { id: number; token: string };
        cId = d.id; cTok = d.token;
        setConvId(d.id); setConvToken(d.token);
      }
      setMsgs(prev => [...prev, { role: "assistant", content: "", streaming: true }]);
      const sr = await fetch(`/api/anthropic/conversations/${cId}/messages`, { method: "POST", headers: { "Content-Type": "application/json", "x-chat-token": cTok ?? "" }, body: JSON.stringify({ content: text }) });
      if (!sr.ok || !sr.body) throw new Error("Stream failed");
      const reader = sr.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const ln of lines) {
          if (!ln.startsWith("data: ")) continue;
          try {
            const p = JSON.parse(ln.slice(6)) as { content?: string; done?: boolean; error?: string };
            if (p.error)   setMsgs(prev => { const n=[...prev]; const l=n[n.length-1]; if (l?.streaming) n[n.length-1]={role:"assistant",content:isAr?"عذراً، حدث خطأ.":"Sorry, something went wrong."}; return n; });
            else if (p.content) setMsgs(prev => { const n=[...prev]; const l=n[n.length-1]; if (l?.streaming) n[n.length-1]={...l,content:l.content+p.content}; return n; });
            else if (p.done)    setMsgs(prev => { const n=[...prev]; const l=n[n.length-1]; if (l?.streaming) n[n.length-1]={...l,streaming:false}; return n; });
          } catch { /* ignore */ }
        }
      }
    } catch {
      setMsgs(prev => { const n=[...prev]; const l=n[n.length-1]; if (l?.streaming) n[n.length-1]={role:"assistant",content:isAr?"عذراً، حدث خطأ.":"Sorry, something went wrong."}; return n; });
    } finally { setLoading(false); }
  }, [convId, convToken, loading, isAr]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void sendMessage(input); }
  };

  /* ── Main button click ── */
  const handleMainClick = () => {
    if (chatOpen) { setChatOpen(false); return; }
    if (menuOpen) { setMenuOpen(false); return; }
    setMenuOpen(true);
    setShowBubble(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 end-6 z-[9999] flex flex-col items-end gap-2"
      dir="ltr"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Speech bubble (idle prompt) ── */}
      <AnimatePresence>
        {showBubble && !menuOpen && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="px-4 py-2.5 rounded-2xl rounded-br-sm"
            style={{ background: "rgba(8,8,8,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          >
            <p className="text-[11px] font-semibold text-white/80 whitespace-nowrap">
              {isAr ? "هل تريد جولة افتراضية 360°؟" : "Interested in a 360° virtual tour?"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AI chat panel ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
            className="w-80 rounded-2xl border border-white/[0.12] shadow-[0_8px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            style={{ height: 420, background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06] flex-shrink-0" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-none mb-0.5">X360 Assistant</p>
                  <p className="text-[10px] text-white/35 leading-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {isAr ? "متصل" : "Online"}
                  </p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/30 hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
              {msgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === "user" ? "text-black font-medium" : "text-white/80 border border-white/[0.08]"}`}
                    style={msg.role === "user" ? { background: "#ffffff" } : { background: "rgba(255,255,255,0.04)" }}
                  >
                    {msg.content || (msg.streaming && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {msgs.filter(m => m.role === "user").length === 0 && (
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
                {quickReplies.map(q => (
                  <button key={q} onClick={() => void sendMessage(q)}
                    className="px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/45 text-[10px] hover:text-white/80 hover:border-white/[0.18] transition-all"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 flex gap-2 flex-shrink-0 border-t border-white/[0.06] pt-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isAr ? "اكتب رسالتك..." : "Type a message…"}
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-lg border border-white/[0.08] focus:border-white/20 focus:outline-none text-white placeholder-white/20 text-xs transition-all disabled:opacity-50 bg-transparent"
              />
              <button
                onClick={() => void sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-all shadow-[0_0_12px_rgba(255,255,255,0.18)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 text-black animate-spin" /> : <Send className="w-3.5 h-3.5 text-black" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Two-option menu ── */}
      <AnimatePresence>
        {menuOpen && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="flex flex-col gap-2 items-end"
          >
            {/* AI Assistant option */}
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: 0.06, duration: 0.2 }}
              onClick={() => { setMenuOpen(false); setChatOpen(true); }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer"
              style={{
                background: "rgba(6,6,6,0.94)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.2)]">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                {isAr ? "المساعد الذكي" : "AI Assistant"}
              </span>
            </motion.button>

            {/* WhatsApp option */}
            <motion.a
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: 0.03, duration: 0.2 }}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer"
              style={{
                background: "rgba(6,6,6,0.94)",
                border: "1px solid rgba(37,211,102,0.22)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.22)", color: "rgba(37,211,102,0.95)" }}>
                {WA_ICON}
              </div>
              <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                {isAr ? "واتساب" : "WhatsApp"}
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main button ── */}
      <motion.div
        animate={idleShake ? { y: [0, -5, 1, -3, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.button
          onClick={handleMainClick}
          aria-label={isAr ? "تواصل مع X360" : "Contact X360"}
          initial={{ scale: 0, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center rounded-2xl cursor-pointer select-none overflow-hidden"
          style={{
            background: "rgba(6,6,6,0.94)",
            border: `1px solid ${(menuOpen || chatOpen || hovered) ? "rgba(37,211,102,0.38)" : "rgba(37,211,102,0.22)"}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(37,211,102,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
            transition: "border-color 0.2s",
          }}
        >
          <div className="p-3.5">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", color: "rgba(37,211,102,0.95)" }}
              animate={{ boxShadow: ["0 0 0px rgba(37,211,102,0.3)", "0 0 14px rgba(37,211,102,0.22)", "0 0 0px rgba(37,211,102,0.3)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {(menuOpen || chatOpen)
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  : <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      {WA_ICON}
                    </motion.div>
                }
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.18)", "0 0 0 10px rgba(37,211,102,0)"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
