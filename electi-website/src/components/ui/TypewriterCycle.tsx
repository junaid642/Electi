import { useState, useEffect, useRef } from "react";

interface Props {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
}

export default function TypewriterCycle({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 28,
  pauseAfterType = 2200,
  pauseAfterDelete = 400,
  className = "",
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        timeout.current = setTimeout(() => setPhase("pausing"), pauseAfterType);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => {
          setDisplayed(d => d.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeout.current = setTimeout(() => {
          setPhraseIndex(i => (i + 1) % phrases.length);
          setPhase("typing");
        }, pauseAfterDelete);
      }
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, phase, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span className={className} style={{ display: "block", textAlign: "center", width: "100%" }} aria-live="polite">
      {displayed}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "1px",
          height: "0.85em",
          background: "rgba(255,255,255,0.7)",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
