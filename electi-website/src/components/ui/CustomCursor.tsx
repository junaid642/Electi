import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 11}px, ${e.clientY - 11}px, 0)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 22,
        height: 22,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <img
        src="/cursor-x.png"
        alt=""
        style={{ width: "100%", height: "100%", display: "block", userSelect: "none" }}
        draggable={false}
      />
    </div>
  );
}
