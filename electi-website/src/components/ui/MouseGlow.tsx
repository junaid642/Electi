import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -500, y: -500 });
  const current = useRef({ x: -500, y: -500 });
  const animId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.05);
      current.current.y = lerp(current.current.y, pos.current.y, 0.05);
      if (glowRef.current) {
        glowRef.current.style.left = `${current.current.x}px`;
        glowRef.current.style.top = `${current.current.y}px`;
      }
      animId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="absolute pointer-events-none z-0"
      style={{
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
