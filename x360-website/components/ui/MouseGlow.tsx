"use client";
import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const half = 160;
    const target = { x: -800, y: -800 };
    const current = { x: -800, y: -800 };
    let animId: number | undefined;
    let running = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.10);
      current.y = lerp(current.y, target.y, 0.10);

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.x - half}px, ${current.y - half}px)`;
      }

      // Stop the loop once settled — restart on next mousemove
      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx < 0.3 && dy < 0.3) {
        running = false;
        return;
      }
      animId = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!running) {
        running = true;
        animId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animId !== undefined) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none"
      style={{
        top: 0,
        left: 0,
        zIndex: 9,
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
