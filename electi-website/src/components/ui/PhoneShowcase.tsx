import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { Link } from "wouter";
import {
  motion, AnimatePresence,
} from "framer-motion";
import {
  MessageCircle, Receipt, Scale, BarChart3,
  Phone, Video, MoreVertical,
  Paperclip, Mic, Smile, ArrowLeft, Users, Bell,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import NeonButton from "@/components/ui/NeonButton";

const ease = [0.22, 1, 0.36, 1] as const;
const ACCENT = ["#25D366", "#60a5fa", "#f59e0b", "#8b5cf6"] as const;

/* ═══ WA-INSPIRED CHAT WALLPAPER ════════════════════════════════════════ */
const WA_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 40 L40 0 L80 40 L40 80 Z' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='0.6'/%3E%3Ccircle cx='40' cy='40' r='1.2' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E")`;

/* ═══ SHARED CHAT PRIMITIVES ════════════════════════════════════════════ */

function ChatBg({ dark = "#0b141a" }: { dark?: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: dark, backgroundImage: WA_PATTERN }}
    />
  );
}

type AttachmentProp = { label: string; ext: string };
type BubbleProps = {
  me: boolean;
  text: string;
  time: string;
  accent: string;
  attachment?: AttachmentProp;
  delay?: number;
};
function Bubble({ me, text, time, accent, attachment, delay = 0 }: BubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.26, delay }}
      className={`flex ${me ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[83%] rounded-2xl px-2.5 py-1.5 text-[8px] leading-relaxed ${me ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        style={{
          background: me ? "rgba(0,92,75,0.95)" : "rgba(31,44,51,0.96)",
          color: "rgba(255,255,255,0.88)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.45)",
        }}
      >
        {attachment && (
          <div
            className="flex items-center gap-1.5 rounded-xl mb-1.5 px-2 py-1.5"
            style={{ background: me ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px]"
              style={{ background: `${accent}28` }}
            >
              📄
            </div>
            <div className="min-w-0">
              <div className="text-[7.5px] font-600 truncate" style={{ color: "rgba(255,255,255,0.75)" }}>{attachment.label}</div>
              <div className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.3)" }}>{attachment.ext}</div>
            </div>
          </div>
        )}
        <div style={{ whiteSpace: "pre-line" }}>{text}</div>
        <div className="flex items-center gap-1 justify-end mt-0.5">
          <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>{time}</span>
          {me && <span className="text-[7px]" style={{ color: "#53bdeb" }}>✓✓</span>}
        </div>
      </div>
    </motion.div>
  );
}

function TypingDots({ accent }: { accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
      <div
        className="rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center"
        style={{ background: "rgba(31,44,51,0.96)", boxShadow: "0 1px 3px rgba(0,0,0,0.45)" }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-[4px] h-[4px] rounded-full"
            style={{ background: "rgba(255,255,255,0.42)" }}
            animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.16 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-0.5">
      <div
        className="text-[6.5px] px-2.5 py-0.5 rounded-full"
        style={{ background: "rgba(11,20,26,0.72)", color: "rgba(255,255,255,0.32)" }}
      >
        {label}
      </div>
    </div>
  );
}

function WAChatHeader({
  avatar, name, status, accent,
}: { avatar: ReactNode; name: string; status: string; accent: string }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 py-2 flex-shrink-0"
      style={{ background: "rgba(22,33,40,0.98)", borderBottom: "1px solid rgba(255,255,255,0.045)" }}
    >
      <ArrowLeft className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px]"
        style={{ background: `${accent}28`, border: `1.5px solid ${accent}45` }}
      >
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9.5px] font-600 text-white leading-tight">{name}</div>
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#25D366" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-[7px]" style={{ color: "rgba(255,255,255,0.32)" }}>{status}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Phone className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.28)" }} />
        <Video className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.28)" }} />
        <MoreVertical className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.28)" }} />
      </div>
    </div>
  );
}

function WAChatInput({ placeholder, accent }: { placeholder: string; accent: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1.5 flex-shrink-0"
      style={{ background: "rgba(11,20,26,0.9)", borderTop: "1px solid rgba(255,255,255,0.03)" }}
    >
      <div
        className="flex-1 flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
        style={{ background: "rgba(31,44,51,0.95)" }}
      >
        <Smile className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
        <span className="flex-1 text-[7.5px]" style={{ color: "rgba(255,255,255,0.18)" }}>{placeholder}</span>
        <Paperclip className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
      </div>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: accent }}
      >
        <Mic className="w-3 h-3 text-white" />
      </div>
    </div>
  );
}

/* ═══ SCREEN COMPONENTS ════════════════════════════════════════════════ */

/* ─── Personal / WhatsApp ─── */
function PersonalScreen({ active }: { active: boolean }) {
  const accent = "#25D366";
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const t = window.setTimeout(() => {
      const iv = window.setInterval(() => setCount(n => (n < 6 ? n + 1 : n)), 720);
      return () => clearInterval(iv);
    }, 350);
    return () => clearTimeout(t);
  }, [active]);

  const msgs: Array<{ me: boolean; text: string; time: string }> = [
    { me: true,  text: "Remind me about the board meeting tomorrow 📅", time: "9:32" },
    { me: false, text: "✅ Set for 8:30 AM. I've added the full agenda and all 8 attendees.", time: "9:32" },
    { me: true,  text: "Summarise my morning emails", time: "9:35" },
    { me: false, text: "📧 12 emails · 3 need action:\n• NovaTech proposal (urgent)\n• Q3 report review\n• Sara's meeting invite", time: "9:35" },
    { me: true,  text: "Accept Sara's invite", time: "9:36" },
    { me: false, text: "✅ Done! Thursday 2 PM confirmed. Invite sent & calendar updated.", time: "9:36" },
  ];

  const showTyping = count > 0 && count < msgs.length && msgs[count - 1].me;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <ChatBg />
      <div className="relative z-10 flex flex-col h-full">
        <WAChatHeader avatar="🤖" name="Personal Agent" status="online · AI active" accent={accent} />
        <div className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden">
          <DateDivider label="Today" />
          {msgs.slice(0, count).map((m, i) => (
            <Bubble key={i} me={m.me} text={m.text} time={m.time} accent={accent} delay={0} />
          ))}
          <AnimatePresence>{showTyping && <TypingDots accent={accent} />}</AnimatePresence>
        </div>
        <WAChatInput placeholder="Message Personal Agent…" accent={accent} />
      </div>
    </div>
  );
}

/* ─── Billing ─── */
function BillingScreen({ active }: { active: boolean }) {
  const accent = "#60a5fa";
  const [step, setStep] = useState(0);
  const [scan, setScan] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); setScan(0); return; }
    const ids: number[] = [];
    ids.push(window.setTimeout(() => setStep(1), 300));
    ids.push(window.setTimeout(() => setStep(2), 1050));
    ids.push(window.setTimeout(() => setStep(3), 4200));
    ids.push(window.setTimeout(() => setStep(4), 5600));
    ids.push(window.setTimeout(() => setStep(5), 6900));
    return () => ids.forEach(id => window.clearTimeout(id));
  }, [active]);

  useEffect(() => {
    if (step < 2) { setScan(0); return; }
    const iv = window.setInterval(() => setScan(n => {
      if (n >= 100) { clearInterval(iv); return 100; }
      return n + 3.2;
    }), 28);
    return () => clearInterval(iv);
  }, [step]);

  const showTyping = step >= 1 && step < 3;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <ChatBg dark="#0a1318" />
      <div className="relative z-10 flex flex-col h-full">
        <WAChatHeader avatar="💰" name="Billing Agent" status="online · processing" accent={accent} />
        <div className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden">
          <DateDivider label="Today" />

          {step >= 1 && (
            <Bubble
              me={true} text="Process this invoice" time="10:15" accent={accent}
              attachment={{ label: "NovaTech_Invoice_1047.pdf", ext: "PDF Document · 284 KB" }}
            />
          )}

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div
                className="max-w-[83%] rounded-2xl rounded-tl-sm px-2.5 py-1.5"
                style={{ background: "rgba(31,44,51,0.96)", boxShadow: "0 1px 3px rgba(0,0,0,0.45)" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[9px]">🔍</span>
                  <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {scan < 100 ? "Scanning invoice…" : "Scan complete"}
                  </span>
                </div>
                {/* OCR progress bar */}
                <div className="space-y-0.5 mb-1.5">
                  {[["Vendor", "NovaTech Arabia LLC"], ["Invoice", "#INV-2024-1047"], ["Amount", "SAR 8,400.00"], ["Due", "15 December 2024"]].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      className="flex gap-2 text-[7px] font-sans"
                      animate={{ opacity: scan > (i + 1) * 22 ? 1 : 0.1 }}
                    >
                      <span className="w-10 flex-shrink-0" style={{ color: "rgba(255,255,255,0.28)" }}>{k}</span>
                      <span style={{ color: "rgba(255,255,255,0.72)" }}>{v}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ width: `${scan}%`, background: `linear-gradient(90deg, ${accent}80, ${accent})` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>OCR Recognition</span>
                  <span className="text-[6.5px]" style={{ color: accent }}>{Math.min(100, Math.round(scan))}%</span>
                </div>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>10:15</span>
                </div>
              </div>
            </motion.div>
          )}

          {step >= 3 && (
            <Bubble
              me={false}
              text={"✅ Invoice processed\n• Category: Professional Services\n• VAT 15%: SAR 1,260.00\n• Status: Approved ✓"}
              time="10:15" accent={accent}
            />
          )}
          {step >= 4 && (
            <Bubble me={true} text="Set payment reminder for Dec 10" time="10:16" accent={accent} />
          )}
          {step >= 5 && (
            <Bubble me={false} text="📅 Reminder set for Dec 10. Finance team notified." time="10:16" accent={accent} />
          )}

          <AnimatePresence>{showTyping && <TypingDots accent={accent} />}</AnimatePresence>
        </div>
        <WAChatInput placeholder="Message Billing Agent…" accent={accent} />
      </div>
    </div>
  );
}

/* ─── Legal ─── */
function LegalScreen({ active }: { active: boolean }) {
  const accent = "#f59e0b";
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const t = window.setTimeout(() => {
      const iv = window.setInterval(() => setCount(n => (n < 5 ? n + 1 : n)), 840);
      return () => clearInterval(iv);
    }, 400);
    return () => clearTimeout(t);
  }, [active]);

  const msgs: Array<{ me: boolean; text: string; time: string }> = [
    { me: true,  text: "Iqama renewal — what documents do I need?", time: "2:14" },
    { me: false, text: "📋 Required:\n• Valid passport (6+ months)\n• Medical insurance\n• GOSI registration\n• Employer letter\n⏱ Process: 3–7 business days", time: "2:14" },
    { me: true,  text: "Prepare a checklist for me please", time: "2:15" },
    { me: false, text: "✅ Checklist ready & emailed. Reminders set 30 days before your deadline.", time: "2:15" },
    { me: true,  text: "Any updates on the new labour law?", time: "2:16" },
  ];

  const showTyping = count > 0 && count < msgs.length && msgs[count - 1].me;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <ChatBg dark="#100e07" />
      <div className="relative z-10 flex flex-col h-full">
        <WAChatHeader avatar="⚖️" name="Legal Agent" status="PDPL Compliant · online" accent={accent} />
        <div className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden">
          <DateDivider label="Today" />
          {msgs.slice(0, count).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
              className={`flex ${m.me ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[83%] rounded-2xl px-2.5 py-1.5 text-[8px] leading-relaxed ${m.me ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                style={{
                  background: m.me ? "rgba(255,255,255,0.08)" : "rgba(245,158,11,0.1)",
                  border: m.me ? "none" : "1px solid rgba(245,158,11,0.18)",
                  color: "rgba(255,255,255,0.85)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.45)",
                  whiteSpace: "pre-line",
                }}
              >
                {m.text}
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>{m.time}</span>
                  {m.me && <span className="text-[7px]" style={{ color: "#53bdeb" }}>✓✓</span>}
                </div>
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {showTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                <div
                  className="rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.15)", boxShadow: "0 1px 3px rgba(0,0,0,0.45)" }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-[4px] h-[4px] rounded-full" style={{ background: "rgba(245,158,11,0.55)" }}
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.16 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="flex items-center gap-1.5 px-2 py-1.5 flex-shrink-0"
          style={{ background: "rgba(11,20,26,0.9)", borderTop: "1px solid rgba(255,255,255,0.03)" }}
        >
          <div className="flex-1 flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ background: "rgba(31,44,51,0.95)" }}>
            <Smile className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
            <span className="flex-1 text-[7.5px]" style={{ color: "rgba(255,255,255,0.18)" }}>Ask about Saudi law…</span>
            <Paperclip className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.22)" }} />
          </div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: accent }}>
            <Mic className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sales ─── */
function SalesScreen({ active }: { active: boolean }) {
  const accent = "#8b5cf6";
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); setTick(0); return; }
    const ids: number[] = [];
    ids.push(window.setTimeout(() => setStep(1), 300));
    ids.push(window.setTimeout(() => setStep(2), 1200));
    ids.push(window.setTimeout(() => setStep(3), 2500));
    ids.push(window.setTimeout(() => setStep(4), 4000));
    ids.push(window.setTimeout(() => setStep(5), 5200));
    const iv = window.setInterval(() => setTick(n => n + 1), 2800);
    return () => { ids.forEach(id => window.clearTimeout(id)); clearInterval(iv); };
  }, [active]);

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <ChatBg dark="#0d0c14" />
      <div className="relative z-10 flex flex-col h-full">
        <WAChatHeader avatar="📊" name="Sales Agent" status="live · 24/7 active" accent={accent} />

        {/* Live stats strip */}
        <div
          className="flex items-center gap-3 px-3 py-1.5 flex-shrink-0"
          style={{ background: "rgba(20,16,35,0.92)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}
        >
          {[
            { label: "Leads", val: tick > 0 ? "48" : "47", hi: tick > 0 },
            { label: "Bookings", val: "23", hi: false },
            { label: "Revenue", val: "12k", hi: false },
          ].map(m => (
            <motion.div
              key={m.label}
              animate={{ color: m.hi ? accent : "rgba(255,255,255,0.55)" }}
              className="flex items-center gap-1"
            >
              <span className="text-[9px] font-700">{m.val}</span>
              <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.28)" }}>{m.label}</span>
              {m.hi && (
                <motion.span
                  className="text-[6px] font-600"
                  style={{ color: "#4ade80" }}
                  initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}
                >
                  +1
                </motion.span>
              )}
            </motion.div>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>Live</span>
          </div>
        </div>

        <div className="flex-1 px-2 py-2 space-y-1.5 overflow-hidden">
          <DateDivider label="Today · 19:30" />

          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="max-w-[83%] rounded-2xl rounded-tl-sm px-2.5 py-1.5 text-[8px] leading-relaxed"
                style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "rgba(255,255,255,0.82)", boxShadow: "0 1px 3px rgba(0,0,0,0.45)" }}>
                <div className="flex items-center gap-1 mb-0.5">
                  <Bell className="w-2 h-2" style={{ color: accent }} />
                  <span className="text-[7px] font-600" style={{ color: accent }}>New Inquiry</span>
                </div>
                <div>Ahmad Al-Rashidi — table for 4, tomorrow 8 PM</div>
                <div className="flex justify-end mt-0.5">
                  <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>19:30</span>
                </div>
              </div>
            </motion.div>
          )}

          {step >= 2 && (
            <Bubble me={false} text="🤖 Auto-replying with availability & pricing…" time="19:30" accent={accent} />
          )}

          {step >= 3 && (
            <Bubble
              me={false}
              text={"✅ Reservation confirmed\n• Name: Ahmad Al-Rashidi\n• Table #7 · 4 guests\n• Tomorrow 8:00 PM\n• Deposit: SAR 250 collected"}
              time="19:31" accent={accent}
            />
          )}

          {step >= 4 && (
            <Bubble me={true} text="Send him the confirmation message" time="19:31" accent={accent} />
          )}

          {step >= 5 && (
            <Bubble me={false} text="💬 Confirmation sent to Ahmad. CRM updated. Lead marked as converted." time="19:31" accent={accent} />
          )}

          <AnimatePresence>
            {tick > 0 && (
              <motion.div
                key={tick}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex justify-start"
              >
                <div
                  className="max-w-[83%] rounded-2xl rounded-tl-sm px-2.5 py-1.5 text-[8px]"
                  style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "rgba(255,255,255,0.8)", boxShadow: "0 1px 3px rgba(0,0,0,0.45)" }}
                >
                  <div className="flex items-center gap-1">
                    <Users className="w-2 h-2 flex-shrink-0" style={{ color: accent }} />
                    <span>New inquiry — Al-Rashidi Group · table for 8</span>
                  </div>
                  <div className="flex justify-end mt-0.5">
                    <span className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>19:{32 + tick}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <WAChatInput placeholder="Message Sales Agent…" accent={accent} />
      </div>
    </div>
  );
}

/* ═══ PHONE FRAME ═══════════════════════════════════════════════════════ */
const SCREEN_COMPS = [PersonalScreen, BillingScreen, LegalScreen, SalesScreen];

function PhoneFrame({ active }: { active: number }) {
  const Screen = SCREEN_COMPS[active];
  const color = ACCENT[active];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-10 rounded-[56px] pointer-events-none"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        style={{ background: `radial-gradient(ellipse at 50% 55%, ${color}20 0%, transparent 68%)` }}
      />

      {/* Phone body */}
      <motion.div
        className="relative"
        style={{ width: 252, height: 504 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Side buttons */}
        <div style={{ position: "absolute", right: -3, top: 110, width: 3, height: 64, background: "rgba(255,255,255,0.07)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 96,  width: 3, height: 40, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0" }} />
        <div style={{ position: "absolute", left: -3, top: 144, width: 3, height: 40, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0" }} />

        {/* Outer shell */}
        <div
          className="absolute inset-0 rounded-[44px] overflow-hidden"
          style={{ background: "#0d0d0d", border: "1.5px solid rgba(255,255,255,0.13)", boxShadow: "0 0 80px rgba(0,0,0,0.9), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          {/* Inner screen */}
          <div className="absolute inset-[3px] rounded-[42px] overflow-hidden" style={{ background: "#000000" }}>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-1" style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
              <span className="text-[9px] font-700" style={{ color: "rgba(255,255,255,0.55)" }}>9:41</span>
              <div className="flex items-center justify-center rounded-full" style={{ width: 80, height: 20, background: "#000", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="rounded-full" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.1)" }} />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-end gap-[2px]" style={{ height: 12 }}>
                  {[6, 9, 11, 11].map((h, i) => (
                    <div key={i} className="rounded-sm" style={{ width: 2, height: h, background: "rgba(255,255,255,0.38)" }} />
                  ))}
                </div>
                <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>100%</span>
              </div>
            </div>

            {/* App content */}
            <div className="overflow-hidden" style={{ position: "absolute", inset: 0, top: 52 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.97 }}
                  transition={{ duration: 0.55, ease }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Screen active={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Glass highlight */}
            <div className="absolute inset-0 pointer-events-none rounded-[42px] overflow-hidden" style={{ zIndex: 5 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 100%)" }} />
              <motion.div
                style={{ position: "absolute", top: 0, left: "-55%", width: "55%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)", transform: "skewX(-18deg)" }}
                animate={{ left: ["-55%", "155%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 7 }}
              />
            </div>

            {/* Screen edge highlight */}
            <div className="absolute inset-0 rounded-[42px] pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${color}18`, zIndex: 6 }} />

            {/* Home indicator */}
            <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 4, background: "rgba(255,255,255,0.22)", borderRadius: 4, zIndex: 7 }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══ STANDALONE AGENT PHONE (for hero sections) ════════════════════════ */
export function AgentPhone({ index }: { index: 0 | 1 | 2 | 3 }) {
  const Screen = SCREEN_COMPS[index];
  const color = ACCENT[index];

  return (
    <div className="flex justify-center items-start">
      <div className="relative" style={{ width: 252, height: 504 }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", right: -3, top: 110, width: 3, height: 64, background: "rgba(255,255,255,0.07)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 96,  width: 3, height: 40, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0" }} />
        <div style={{ position: "absolute", left: -3, top: 144, width: 3, height: 40, background: "rgba(255,255,255,0.07)", borderRadius: "0 2px 2px 0" }} />

        {/* Outer shell */}
        <div
          className="absolute inset-0 rounded-[44px] overflow-hidden"
          style={{ background: "#0d0d0d", border: "1.5px solid rgba(255,255,255,0.13)", boxShadow: "0 0 80px rgba(0,0,0,0.9), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          {/* Inner screen */}
          <div className="absolute inset-[3px] rounded-[42px] overflow-hidden" style={{ background: "#000000" }}>
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-1" style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
              <span className="text-[9px] font-700" style={{ color: "rgba(255,255,255,0.55)" }}>9:41</span>
              <div className="flex items-center justify-center rounded-full" style={{ width: 80, height: 20, background: "#000", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="rounded-full" style={{ width: 8, height: 8, background: "rgba(255,255,255,0.1)" }} />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-end gap-[2px]" style={{ height: 12 }}>
                  {[6, 9, 11, 11].map((h, i) => (
                    <div key={i} className="rounded-sm" style={{ width: 2, height: h, background: "rgba(255,255,255,0.38)" }} />
                  ))}
                </div>
                <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.38)" }}>100%</span>
              </div>
            </div>

            {/* Chat content */}
            <div className="overflow-hidden" style={{ position: "absolute", inset: 0, top: 52 }}>
              <Screen active={true} />
            </div>

            {/* Glass highlight */}
            <div className="absolute inset-0 pointer-events-none rounded-[42px] overflow-hidden" style={{ zIndex: 5 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 100%)" }} />
              <motion.div
                style={{ position: "absolute", top: 0, left: "-55%", width: "55%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)", transform: "skewX(-18deg)" }}
                animate={{ left: ["-55%", "155%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 7 }}
              />
            </div>

            {/* Accent ring */}
            <div className="absolute inset-0 rounded-[42px] pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${color}18`, zIndex: 6 }} />

            {/* Home indicator */}
            <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 80, height: 4, background: "rgba(255,255,255,0.22)", borderRadius: 4, zIndex: 7 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ FLOATING CARD ═════════════════════════════════════════════════════ */
type FloatPos = "TR" | "TL" | "BR" | "BL";

function FloatCard({ text, icon, pos, color }: { text: string; icon: string; pos: FloatPos; color: string }) {
  const offsets: Record<FloatPos, { top?: number; bottom?: number; left?: number; right?: number; x: number }> = {
    TR: { top: 60,  right: -116, x: 16 },
    TL: { top: 60,  left:  -116, x: -16 },
    BR: { bottom: 90, right: -116, x: 16 },
    BL: { bottom: 90, left:  -116, x: -16 },
  };
  const o = offsets[pos];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, x: o.x }}
      animate={{ opacity: 1, scale: 1, x: 0, y: [0, -5, 0] }}
      transition={{ duration: 0.55, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
      className="absolute hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl z-20"
      style={{ ...o, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}
    >
      <span className="text-sm leading-none">{icon}</span>
      <span className="text-[8.5px] font-500" style={{ color: "rgba(255,255,255,0.58)" }}>{text}</span>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
    </motion.div>
  );
}

/* ═══ PROGRESS PILL ════════════════════════════════════════════════════ */
function ProgressPill({ active, total, color }: { active: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i} className="rounded-full"
          animate={{ width: i === active ? 24 : 6, height: 6, background: i === active ? color : "rgba(255,255,255,0.14)" }}
          transition={{ duration: 0.4, ease }} />
      ))}
    </div>
  );
}

/* ═══ SECTION DATA ══════════════════════════════════════════════════════ */
type SectionData = {
  icon:   typeof MessageCircle;
  badge:  string;
  badgeAr: string;
  title:  string;
  titleAr: string;
  sub:    string;
  subAr:  string;
  href:   string;
  ctaHref?:    string;
  ctaLabel?:   string;
  ctaLabelAr?: string;
  cards:  Array<{ text: string; textAr: string; icon: string; pos: FloatPos }>;
  color:  string;
};

const SECTIONS: SectionData[] = [
  {
    icon: MessageCircle, color: "#25D366",
    badge: "Personal Agent", badgeAr: "الوكيل الشخصي",
    title: "Your AI Lives\nInside Your Phone", titleAr: "ذكاؤك الاصطناعي\nيعيش في هاتفك",
    sub: "Speak naturally via WhatsApp. Your personal AI handles reminders, emails, schedules, and tasks — before you even ask.", subAr: "تحدّث بشكل طبيعي عبر واتساب. يتولى وكيلك الشخصي التذكيرات والجدولة والمهام — قبل أن تطلب.",
    href: "/agents/personal",
    cards: [
      { text: "Meeting reminder sent", textAr: "تم إرسال تذكير الاجتماع", icon: "🔔", pos: "TR" },
      { text: "WhatsApp connected",    textAr: "واتساب متصل",              icon: "💬", pos: "BL" },
    ],
  },
  {
    icon: Receipt, color: "#60a5fa",
    badge: "Billing Agent", badgeAr: "وكيل الفواتير",
    title: "Zero-Touch\nFinance Automation", titleAr: "أتمتة مالية\nبدون تدخل",
    sub: "Snap a photo, send a message. Your billing agent scans, categorises, and processes invoices with surgical precision.", subAr: "التقط صورة أو أرسل رسالة. يقوم وكيل الفواتير بالمسح والتصنيف والمعالجة بدقة متناهية.",
    href: "/agents/billing",
    cards: [
      { text: "Invoice processed",  textAr: "تمت معالجة الفاتورة", icon: "✅", pos: "TL" },
      { text: "SAR 8,400 logged",   textAr: "تم تسجيل ٨٤٠٠ ريال", icon: "💰", pos: "BR" },
    ],
  },
  {
    icon: Scale, color: "#f59e0b",
    badge: "Legal Agent", badgeAr: "الوكيل القانوني",
    title: "Your Saudi\nLegal Expert", titleAr: "خبيرك القانوني\nالسعودي",
    sub: "From Iqama renewals to labour law — ask in Arabic or English. Get expert, compliant answers instantly.", subAr: "من تجديد الإقامة إلى نظام العمل — اسأل بالعربية أو الإنجليزية واحصل على إجابات فورية وملتزمة.",
    href: "/agents/legal",
    cards: [
      { text: "Checklist prepared", textAr: "تم تجهيز القائمة", icon: "📋", pos: "TR" },
      { text: "PDPL Compliant",     textAr: "متوافق مع نظام PDPL", icon: "🛡️", pos: "BL" },
    ],
  },
  {
    icon: BarChart3, color: "#8b5cf6",
    badge: "Sales Agent", badgeAr: "وكيل المبيعات",
    title: "AI-Powered\nBusiness Operations", titleAr: "عمليات تجارية\nبقوة الذكاء الاصطناعي",
    sub: "Automate reservations, capture leads, and follow up on deals — all through WhatsApp. While you sleep.", subAr: "أتمتة الحجوزات وجذب العملاء ومتابعة الصفقات — كل ذلك عبر واتساب. حتى وأنت نائم.",
    href: "/agents/sales",
    ctaHref: "/contact", ctaLabel: "Request a Demo", ctaLabelAr: "طلب عرض تجريبي",
    cards: [
      { text: "New lead captured",      textAr: "تم اكتشاف عميل جديد", icon: "🎯", pos: "TL" },
      { text: "Reservation confirmed",  textAr: "تم تأكيد الحجز",      icon: "📅", pos: "BR" },
    ],
  },
];

/* ═══ SIDE NAV ══════════════════════════════════════════════════════════ */
function SideNav({ active, isAr, onSelect }: { active: number; isAr: boolean; onSelect: (i: number) => void }) {
  return (
    <div className="hidden lg:flex flex-col gap-1.5">
      {SECTIONS.map((s, i) => {
        const SIcon = s.icon;
        const isActive = i === active;
        return (
          <motion.div
            key={i}
            onClick={() => onSelect(i)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer select-none"
            animate={{ background: isActive ? "rgba(255,255,255,0.04)" : "transparent" }}
            whileHover={{ background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              animate={{ background: isActive ? `${s.color}22` : "rgba(255,255,255,0.04)" }}>
              <SIcon className="w-4 h-4" style={{ color: isActive ? s.color : "rgba(255,255,255,0.25)" }} />
            </motion.div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-600 whitespace-nowrap" style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)" }}>
                {isAr ? s.badgeAr : s.badge}
              </div>
              {isActive && (
                <motion.div className="h-0.5 mt-1 rounded-full" initial={{ width: 0 }} animate={{ width: 36 }} transition={{ duration: 0.5 }}
                  style={{ background: s.color }} />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══ MOBILE VERSION ════════════════════════════════════════════════════ */
function PhoneShowcaseMobile() {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const activeRef      = useRef(0);
  const touchStartY    = useRef(0);
  const lastEventTime  = useRef(0);
  const containerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  /* Swipe up/down to cycle agents; only release to page snap at boundaries.
     IMPORTANT: preventDefault must be called on touchmove (not touchend) to
     actually block the browser's CSS scroll-snap gesture. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };

    const onMove = (e: TouchEvent) => {
      const delta = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(delta) < 5) return;
      const dir = delta > 0 ? 1 : -1;
      const cur = activeRef.current;
      /* Block page snap whenever there are more agents to show in this direction */
      if ((dir > 0 && cur < SECTIONS.length - 1) || (dir < 0 && cur > 0)) {
        e.preventDefault();
      }
    };

    const onEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 35) return;
      const dir  = delta > 0 ? 1 : -1;
      const next = activeRef.current + dir;
      if (next < 0 || next >= SECTIONS.length) return; // boundary → let page snap
      const now = Date.now();
      if (now - lastEventTime.current < 500) return;
      lastEventTime.current = now;
      activeRef.current = next;
      setActive(next);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false }); // must be non-passive
    el.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, []);

  const s = SECTIONS[active];
  const SectionIcon = s.icon;
  const color = s.color;

  /* Phone is 252×504 native; scale to 0.78 → visual 197×393, layout wrapper matches */
  const SCALE = 0.78;
  const PW = Math.round(252 * SCALE);
  const PH = Math.round(504 * SCALE);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
      {/* Background atmosphere */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse at 50% 40%, ${color}0F 0%, transparent 65%)` }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />

      {/* ── Vertical tab strip — absolutely positioned on the left edge, pinned from top ── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex flex-col items-center justify-start gap-3"
        style={{ width: 48, paddingTop: 72 }}
      >
        {SECTIONS.map((sec, i) => {
          const TabIcon = sec.icon;
          const isActive = i === active;
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center justify-center rounded-xl"
              style={{ width: 36, height: 36, flexShrink: 0, border: "1px solid" }}
              animate={{
                background: isActive ? `${sec.color}20` : "rgba(255,255,255,0.04)",
                borderColor: isActive ? `${sec.color}50` : "rgba(255,255,255,0.08)",
              }}
              whileTap={{ scale: 0.92 }}
              title={isAr ? sec.badgeAr : sec.badge}
            >
              <TabIcon style={{ width: 14, height: 14, color: isActive ? sec.color : "rgba(255,255,255,0.35)" }} />
            </motion.button>
          );
        })}
      </div>

      {/* ── Main content — centered in full width ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-start"
        style={{ paddingTop: 64, paddingBottom: 20, gap: 0 }}>

        {/* Phone wrapper with exact scaled footprint */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            style={{
              width: PW, height: PH, flexShrink: 0, position: "relative", overflow: "visible",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, transformOrigin: "top left", transform: `scale(${SCALE})` }}>
              <PhoneFrame active={active} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Text content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="flex flex-col items-center text-center px-8"
            style={{ gap: 10, marginTop: 16 }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-600"
              style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}
            >
              <SectionIcon className="w-3 h-3 flex-shrink-0" />
              {isAr ? s.badgeAr : s.badge}
            </div>

            <h3 className="text-xl font-700 leading-tight whitespace-pre-line">
              {isAr ? s.titleAr : s.title}
            </h3>

            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)" }} />

            <p className="text-white/40 text-[13px] leading-relaxed">
              {isAr ? s.subAr : s.sub}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href={s.ctaHref ?? "https://app.electi.sa/login"} target="_self" rel="noreferrer">
                <NeonButton size="md">{isAr ? (s.ctaLabelAr ?? "جرّب مجاناً") : (s.ctaLabel ?? "Try for Free")}</NeonButton>
              </a>
              <Link href={s.href}>
                <NeonButton variant="ghost" size="md">Know More</NeonButton>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══ MAIN EXPORT ═══════════════════════════════════════════════════════ */
export default function PhoneShowcase({ desktop = true }: { desktop?: boolean }) {
  const { isAr } = useLang();
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lastEventTime = useRef(0);
  const touchStartY = useRef(0);
  const setActiveRef = useRef<(n: number) => void>(null!);

  /* Keep refs in sync */
  useEffect(() => { activeRef.current = active; }, [active]);

  /* Desktop-only: scroll-hijack wheel + touch to cycle agents */
  useEffect(() => {
    if (!desktop) return;
    const el = containerRef.current;
    if (!el) return;

    /* advance is defined inside the effect so it always reads fresh refs */
    const advance = (dir: 1 | -1): boolean => {
      const now = Date.now();
      if (now - lastEventTime.current < 700) return false;
      const next = activeRef.current + dir;
      if (next < 0 || next >= SECTIONS.length) return false;
      lastEventTime.current = now;
      activeRef.current = next;
      setActiveRef.current(next);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = activeRef.current + dir;
      /* At a boundary in the scroll direction → release to page snap */
      if (next < 0 || next >= SECTIONS.length) return;
      /* Mid-showcase: always block page scroll, advance if debounce allows */
      e.preventDefault();
      e.stopPropagation();
      advance(dir);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      const dir = delta > 0 ? 1 : -1;
      const next = activeRef.current + dir;
      /* At boundary → release to page scroll */
      if (next < 0 || next >= SECTIONS.length) return;
      e.preventDefault();
      advance(dir);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [desktop]);

  /* Keep a stable setActive ref so advance (inside the effect) can call it */
  setActiveRef.current = setActive;

  if (!desktop) return <PhoneShowcaseMobile />;

  const s = SECTIONS[active];
  const SectionIcon = s.icon;
  const color = s.color;

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-center justify-center">

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{ background: `radial-gradient(ellipse at 58% 52%, ${color}0F 0%, transparent 65%)` }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-[1fr_300px_1fr] gap-10 items-center">

          {/* ── Text / Left ── */}
          <div className={`flex flex-col ${isAr ? "items-end text-right" : "items-start text-left"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: isAr ? 28 : -28, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isAr ? -18 : 18, y: -8 }}
                transition={{ duration: 0.52, ease }}
                className="flex flex-col gap-4 items-start"
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-600"
                  style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}
                >
                  <SectionIcon className="w-3 h-3 flex-shrink-0" />
                  {isAr ? s.badgeAr : s.badge}
                </div>

                <h3 className="text-[2.6rem] font-700 leading-tight whitespace-pre-line">
                  {isAr ? s.titleAr : s.title}
                </h3>

                <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)", width: "clamp(80px, 16vw, 220px)" }} />

                <p className="text-white/40 text-base leading-relaxed max-w-sm">
                  {isAr ? s.subAr : s.sub}
                </p>

                <div className="flex items-center gap-3 mt-1">
                  <a href={s.ctaHref ?? "https://app.electi.sa/login"} target="_self" rel="noreferrer">
                    <NeonButton size="md">{isAr ? (s.ctaLabelAr ?? "جرّب مجاناً") : (s.ctaLabel ?? "Try for Free")}</NeonButton>
                  </a>
                  <Link href={s.href}>
                    <NeonButton variant="ghost" size="md">Know More</NeonButton>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Center: Phone ── */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{ height: i === active ? 24 : 6, width: 6, background: i === active ? color : "rgba(255,255,255,0.13)" }}
                  transition={{ duration: 0.4, ease }}
                />
              ))}
            </div>

            <div className="relative">
              <AnimatePresence>
                {s.cards.map(c => (
                  <FloatCard key={c.pos} text={isAr ? c.textAr : c.text} icon={c.icon} pos={c.pos} color={color} />
                ))}
              </AnimatePresence>
              <PhoneFrame active={active} />
            </div>
          </div>

          {/* ── Right: Side nav ── */}
          <div>
            <SideNav
              active={active}
              isAr={isAr}
              onSelect={(i) => {
                activeRef.current = i;
                lastEventTime.current = Date.now();
                setActive(i);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
