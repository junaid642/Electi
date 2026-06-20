import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

/* ─── constants ──────────────────────────────────────────────────────── */
const SPLASH_KEY = "electi-splash-v8";
const ease        = [0.16, 1, 0.3, 1]  as const;
const easeOut     = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────────────
   BACKGROUND: animated dot-matrix grid
───────────────────────────────────────────────────────────────────── */
function MatrixGrid() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        inset: "-40px",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.085) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
      animate={{ backgroundPositionY: ["0px", "38px"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SCAN LINE — single horizontal beam sweeping top→bottom
───────────────────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <>
      {/* Primary beam */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 75%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      />
      {/* Soft glow trail */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          height: 80,
          background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   BLINKING CURSOR  (I-beam style)
───────────────────────────────────────────────────────────────────── */
function Cursor({ show }: { show: boolean }) {
  return (
    <motion.span
      style={{
        display: "inline-block",
        width: 2,
        background: "rgba(255,255,255,0.8)",
        verticalAlign: "middle",
        marginLeft: 4,
        borderRadius: 1,
        height: "0.85em",
      }}
      animate={show ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
      transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.44, 0.5, 1] }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────────────────────────────────── */
function useTypewriter(text: string, charDelay: number, active: boolean) {
  const [count, setCount] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (ref.current) clearInterval(ref.current);
    if (!active) { setCount(0); return; }
    setCount(0);
    let i = 0;
    ref.current = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length && ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    }, charDelay);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [text, charDelay, active]);

  return { displayed: text.slice(0, count), done: count >= text.length };
}

/* ─────────────────────────────────────────────────────────────────────
   PHASE TYPES
───────────────────────────────────────────────────────────────────── */
type Phase =
  | "pre"
  | "type2" | "pause2"
  | "glow"
  | "exit"  | "done";

/* ─────────────────────────────────────────────────────────────────────
   SEQUENCE TEXT BLOCK
───────────────────────────────────────────────────────────────────── */
interface SeqProps {
  text:       string;
  showCursor: boolean;
  size:       "sm" | "md" | "lg";
  tracking:   string;
  opacity:    number;
  glow?:      boolean;
  sub?:       string;
}

function SeqText({ text, showCursor, size, tracking, opacity, sub }: SeqProps) {
  const sizeMap = {
    sm: "text-[13px] sm:text-[15px]",
    md: "text-[15px] sm:text-[18px]",
    lg: "text-[13px] sm:text-[22px] lg:text-[28px]",
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className={`font-300 text-white uppercase ${sizeMap[size]}`}
        style={{ letterSpacing: tracking, opacity }}
      >
        {text}
        <Cursor show={showCursor} />
      </p>

      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[9px] tracking-[0.35em] uppercase font-400"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AMBIENT ORBS
───────────────────────────────────────────────────────────────────── */
function Orbs() {
  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        animate={{ opacity: [0.22, 0.38, 0.22], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 68%)" }}
      />
      <motion.div
        className="absolute top-[22%] left-[15%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.008)", filter: "blur(80px)" }}
        animate={{ x: [0, 35, 0], y: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[12%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.007)", filter: "blur(64px)" }}
        animate={{ x: [0, -28, 0], y: [0, 18, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   WORDMARK
───────────────────────────────────────────────────────────────────── */
function Wordmark({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="wordmark"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.48, times: [0, 0.15, 0.32, 0.5, 0.66, 1], ease: "linear" }}
          className="flex flex-col items-center gap-2.5"
        >
          {/* Logo image — smaller on mobile */}
          <div className="w-[160px] h-[64px] sm:w-[250px] sm:h-[100px]" style={{ flexShrink: 0 }}>
            <img
              src="/electi-logo-new.png"
              alt="Electi"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────── */
interface Props { onDone: () => void; }

export default function SplashScreen({ onDone }: Props) {
  const { t } = useLang();

  const [seen] = useState(() => {
    try { return !!sessionStorage.getItem(SPLASH_KEY); } catch { return false; }
  });
  const [show, setShow]   = useState(!seen);
  const [phase, setPhase] = useState<Phase>("pre");

  const seq2 = t("welcomeFuture").toUpperCase();

  const goto = useCallback((p: Phase) => setPhase(p), []);

  /* ── Phase scheduling ─────────────────────────────────────────────── */
  useEffect(() => {
    if (seen) { onDone(); return; }

    const ids: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => ids.push(setTimeout(fn, ms));

    // Timings — faster
    const logoIn   = 280;
    const s2Start  = logoIn + 160;
    const s2Dur    = seq2.length * 40;
    const s2Pause  = 520;

    const glowAt   = s2Start + s2Dur + s2Pause;
    const exitAt   = glowAt + 650;
    const doneAt   = exitAt + 750;

    at(logoIn,          () => goto("pre"));
    at(s2Start,         () => goto("type2"));
    at(s2Start + s2Dur, () => goto("pause2"));
    at(glowAt,          () => goto("glow"));
    at(exitAt,          () => goto("exit"));
    at(doneAt,          () => {
      setShow(false);
      try { sessionStorage.setItem(SPLASH_KEY, "1"); } catch {}
      onDone();
    });

    return () => ids.forEach(clearTimeout);
  }, [seen, onDone, seq2, goto]);

  /* ── Typewriter instance ──────────────────────────────────────────── */
  const tw2 = useTypewriter(seq2, 40, ["type2", "pause2"].includes(phase));

  /* ── Derived flags ────────────────────────────────────────────────── */
  const showSeq2 = ["type2","pause2"].includes(phase);
  const cursorOn = ["type2","pause2"].includes(phase);
  const glowing  = phase === "glow" || phase === "exit";

  const activeText    = showSeq2 ? tw2.displayed : "";
  const anythingShown = showSeq2 || glowing;
  const wordmarkVis   = phase === "glow" || phase === "exit";

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.02 }}
          transition={{ duration: 0.75, ease: easeOut }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* ── Background layers ── */}
          <MatrixGrid />
          <ScanLine />
          <Orbs />

          {/* Exit bloom */}
          <AnimatePresence>
            {phase === "exit" && (
              <motion.div
                key="bloom"
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.18, 0] }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 65%)" }}
              />
            )}
          </AnimatePresence>

          {/* Wordmark — absolutely centred, independent of text flow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
            <Wordmark visible={wordmarkVis} />
          </div>

          {/* ── Content ── */}
          <div className="relative flex flex-col items-center gap-10 text-center px-8 select-none" style={{ zIndex: 20 }}>

            {/* Text sequences — Wordmark handled separately above */}
            <div className="min-h-[6rem] flex flex-col items-center justify-center gap-4">
              <AnimatePresence mode="wait">
                {anythingShown && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease }}
                    className="flex flex-col items-center gap-3"
                  >
                    <SeqText
                      text={activeText}
                      showCursor={cursorOn}
                      size="lg"
                      tracking="0.28em"
                      opacity={1}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
