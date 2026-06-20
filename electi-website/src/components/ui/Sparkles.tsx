import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  phase: number;
  speed: number;
}

export default function Sparkles({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let sparks: Spark[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeSpark = (canvas: HTMLCanvasElement): Spark => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: 0,
      maxOpacity: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.004,
    });

    const init = () => {
      resize();
      sparks = Array.from({ length: count }, () => makeSpark(canvas));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach((s, i) => {
        s.phase += s.speed;
        s.opacity = Math.max(0, Math.sin(s.phase) * s.maxOpacity);

        if (s.phase > Math.PI * 2) {
          sparks[i] = makeSpark(canvas);
          sparks[i].phase = 0;
          return;
        }

        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        grd.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grd.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * 2})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
