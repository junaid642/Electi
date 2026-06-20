"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    new Image().src = "/x360/cursor-x.png";

    el.style.display = "block";

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: 22,
        height: 22,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        transform: "translate(-100px, -100px)",
      }}
    >
      <img
        src="/x360/cursor-x.png"
        alt=""
        width={22}
        height={22}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          imageRendering: "pixelated",
        }}
        draggable={false}
      />
    </div>
  );
}
