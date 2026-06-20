import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Orbital Ring ──────────────────────────────────────────────────────── */
function OrbitalRing({
  size, tiltX, startZ, color, glowColor, duration, satSize = 5, opacity = 1,
}: {
  size: number; tiltX: number; startZ: number;
  color: string; glowColor: string; duration: number;
  satSize?: number; opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          transformPerspective: 900,
          rotateX: tiltX,
          opacity,
        }}
        animate={{ rotateZ: [startZ, startZ + 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* Primary satellite */}
        <div style={{
          position: "absolute",
          top: -(satSize / 2),
          left: "50%",
          transform: "translateX(-50%)",
          width: satSize,
          height: satSize,
          borderRadius: "50%",
          background: glowColor,
          boxShadow: `0 0 ${satSize * 2}px ${glowColor}, 0 0 ${satSize * 5}px ${glowColor}80, 0 0 ${satSize * 10}px ${glowColor}30`,
        }} />
        {/* Comet tail */}
        <div style={{
          position: "absolute",
          top: satSize / 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: satSize * 0.5,
          height: satSize * 7,
          background: `linear-gradient(to bottom, ${glowColor}50, transparent)`,
          filter: "blur(1.5px)",
        }} />
        {/* Dim counter point */}
        <div style={{
          position: "absolute",
          bottom: -(satSize * 0.35),
          left: "50%",
          transform: "translateX(-50%)",
          width: satSize * 0.65,
          height: satSize * 0.65,
          borderRadius: "50%",
          background: glowColor,
          opacity: 0.22,
          boxShadow: `0 0 ${satSize * 2}px ${glowColor}`,
        }} />
      </motion.div>
    </div>
  );
}

/* ── Main Orb ──────────────────────────────────────────────────────────── */
export default function AIOrb({ size = 320 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 55 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 55 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  /* Canvas particle mesh — all white */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const S = 420;
    canvas.width = canvas.height = S;
    const cx = S / 2, cy = S / 2;
    const r = size * 0.56;
    const N = 110;

    /* Fibonacci sphere points */
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      pts.push({ x: Math.cos(theta) * rad, y, z: Math.sin(theta) * rad });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      t += 0.004;
      const cosT = Math.cos(t), sinT = Math.sin(t);

      /* Rotate Y-axis, project orthographically */
      const proj = pts.map(p => {
        const x = p.x * cosT - p.z * sinT;
        const z = p.x * sinT + p.z * cosT;
        const depth = (z + 1) / 2;
        return { px: cx + x * r, py: cy + p.y * r, depth };
      });
      proj.sort((a, b) => a.depth - b.depth);

      /* Edges — white */
      const CONN = 72;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].px - proj[j].px;
          const dy = proj[i].py - proj[j].py;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            const a = (1 - d / CONN) * 0.22 * Math.min(proj[i].depth, proj[j].depth);
            ctx.beginPath();
            ctx.moveTo(proj[i].px, proj[i].py);
            ctx.lineTo(proj[j].px, proj[j].py);
            ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* Nodes — white */
      for (const p of proj) {
        const alpha = 0.12 + p.depth * 0.65;
        const nr = 0.8 + p.depth * 1.6;
        ctx.beginPath();
        ctx.arc(p.px, p.py, nr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.85).toFixed(3)})`;
        ctx.fill();
        if (p.depth > 0.75) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, nr * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${((p.depth - 0.75) * 2).toFixed(3)})`;
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, [size]);

  useEffect(() => {
    initCanvas();
    return () => cancelAnimationFrame(frameRef.current);
  }, [initCanvas]);

  const half = size / 2;

  return (
    <motion.div
      className="relative"
      style={{
        width: size + 120,
        height: size + 120,
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer atmospheric bloom — white */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size + 120, height: size + 120,
          top: 0, left: 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 68%)",
          filter: "blur(24px)",
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital rings — white */}
      <OrbitalRing
        size={size + 100} tiltX={72} startZ={0}
        color="rgba(255,255,255,0.16)" glowColor="#ffffff"
        duration={14} satSize={5.5}
      />
      <OrbitalRing
        size={size + 58} tiltX={55} startZ={120}
        color="rgba(255,255,255,0.12)" glowColor="#ffffff"
        duration={10} satSize={4} opacity={0.75}
      />
      <OrbitalRing
        size={size + 22} tiltX={14} startZ={240}
        color="rgba(255,255,255,0.07)" glowColor="#ffffff"
        duration={7} satSize={3} opacity={0.45}
      />

      {/* Sphere body — dark with white glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size, height: size,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at 35% 28%,
            rgba(255,255,255,0.06) 0%,
            rgba(18,18,22,0.96) 38%,
            rgba(6,6,8,0.99) 65%,
            rgba(3,3,5,1) 100%)`,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            0 0 ${half * 0.65}px rgba(255,255,255,0.10),
            0 0 ${half * 1.4}px rgba(255,255,255,0.04),
            inset 0 0 ${half * 0.4}px rgba(255,255,255,0.04)
          `,
        }}
      />

      {/* Particle mesh overlay */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.72,
          mixBlendMode: "screen",
        }}
      />

      {/* Specular highlight (top-left) — white */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size, height: size,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 44%)",
        }}
      />

      {/* Inner rim light — white */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size, height: size,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 -1px 0 0 rgba(255,255,255,0.10)",
        }}
      />

      {/* Pulsing core — white */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 0.26, height: size * 0.26,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
