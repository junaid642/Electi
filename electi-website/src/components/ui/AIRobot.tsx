import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AIRobot({ size = 220 }: { size?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 32, damping: 18 });
  const sy = useSpring(my, { stiffness: 32, damping: 18 });

  const rotY   = useTransform(sx, [-1, 1], [-12,  12]);
  const rotX   = useTransform(sy, [-1, 1], [  8,  -8]);
  const headX  = useTransform(sx, [-1, 1], [ -7,   7]);
  const headY  = useTransform(sy, [-1, 1], [ -5,   5]);
  const pupilX = useTransform(sx, [-1, 1], [-3.8, 3.8]);
  const pupilY = useTransform(sy, [-1, 1], [-2.8, 2.8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const aspect = 220 / 160;

  return (
    <motion.div
      style={{ width: size, height: size * aspect, position: "relative" }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient glow beneath robot */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.5, height: size * 1.5,
          left: "50%", top: "40%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.038) 0%, transparent 62%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D perspective body */}
      <motion.div
        style={{
          rotateY: rotY,
          rotateX: rotX,
          transformPerspective: 700,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 160 220"
          width={size}
          height={size * aspect}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Outer ambient rings */}
          <circle cx="80" cy="118" r="76" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
          <circle cx="80" cy="118" r="90" stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />

          {/* ── Antenna ── */}
          <line x1="80" y1="20" x2="80" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="80" cy="14" r="5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          <motion.circle
            cx="80" cy="14" r="3"
            fill="rgba(255,255,255,0.95)"
            animate={{ opacity: [0.4, 1, 0.4], r: [2.5, 3.5, 2.5] } as never}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Antenna glow pulse */}
          <motion.circle
            cx="80" cy="14" r="8"
            fill="rgba(255,255,255,0.1)"
            animate={{ r: [6, 11, 6], opacity: [0.18, 0, 0.18] } as never}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />

          {/* ── Head (parallax layer) ── */}
          <motion.g style={{ x: headX, y: headY } as never}>
            {/* Head shell */}
            <rect x="42" y="38" width="76" height="60" rx="11"
              stroke="rgba(255,255,255,0.60)" strokeWidth="1.4" />
            {/* Inner head detail line */}
            <line x1="42" y1="56" x2="118" y2="56" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />

            {/* Eye sockets */}
            <circle cx="65" cy="66" r="13" stroke="rgba(255,255,255,0.32)" strokeWidth="0.8" />
            <circle cx="95" cy="66" r="13" stroke="rgba(255,255,255,0.32)" strokeWidth="0.8" />
            <circle cx="65" cy="66" r="8"  stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" />
            <circle cx="95" cy="66" r="8"  stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" />

            {/* Eye glow rings */}
            <motion.circle cx="65" cy="66" r="9" fill="rgba(255,255,255,0.08)"
              animate={{ r: [7, 11, 7], opacity: [0.14, 0.28, 0.14] } as never}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle cx="95" cy="66" r="9" fill="rgba(255,255,255,0.08)"
              animate={{ r: [7, 11, 7], opacity: [0.14, 0.28, 0.14] } as never}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Eye pupils — follow cursor */}
            <motion.circle cx="65" cy="66" r="5" fill="rgba(255,255,255,0.92)"
              style={{ x: pupilX, y: pupilY } as never} />
            <motion.circle cx="95" cy="66" r="5" fill="rgba(255,255,255,0.92)"
              style={{ x: pupilX, y: pupilY } as never} />
            {/* Pupil specular dot */}
            <motion.circle cx="67" cy="64" r="1.5" fill="rgba(255,255,255,0.6)"
              style={{ x: pupilX, y: pupilY } as never} />
            <motion.circle cx="97" cy="64" r="1.5" fill="rgba(255,255,255,0.6)"
              style={{ x: pupilX, y: pupilY } as never} />

            {/* Mouth */}
            <path d="M64 84 Q80 90 96 84"
              stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" strokeLinecap="round" />

            {/* Cheek vents */}
            <line x1="44" y1="70" x2="52" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
            <line x1="44" y1="74" x2="52" y2="74" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeLinecap="round" />
            <line x1="108" y1="70" x2="116" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
            <line x1="108" y1="74" x2="116" y2="74" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeLinecap="round" />
          </motion.g>

          {/* ── Neck ── */}
          <rect x="70" y="98" width="20" height="12" rx="3"
            stroke="rgba(255,255,255,0.38)" strokeWidth="1" />
          <line x1="75" y1="102" x2="85" y2="102" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
          <line x1="75" y1="106" x2="85" y2="106" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />

          {/* ── Torso ── */}
          <rect x="28" y="110" width="104" height="72" rx="9"
            stroke="rgba(255,255,255,0.50)" strokeWidth="1.3" />

          {/* Torso shoulder ridges */}
          <path d="M28 122 Q28 110 40 110" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />
          <path d="M132 122 Q132 110 120 110" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />

          {/* Chest panel */}
          <rect x="42" y="120" width="76" height="50" rx="5"
            stroke="rgba(255,255,255,0.30)" strokeWidth="0.9" />

          {/* Chest scan lines */}
          <motion.g
            animate={{ opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {[130, 138, 146, 154].map((y, i) => (
              <line key={y} x1="50" y1={y} x2={108 - i * 8} y2={y}
                stroke="rgba(255,255,255,0.45)" strokeWidth={0.7 - i * 0.1} />
            ))}
          </motion.g>

          {/* Moving scan beam */}
          <motion.line
            x1="42" y1="120" x2="118" y2="120"
            stroke="rgba(255,255,255,0.35)" strokeWidth="1"
            animate={{ y1: [120, 170, 120], y2: [120, 170, 120] } as never}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />

          {/* Status indicator dots */}
          <motion.circle cx="96" cy="158" r="3.5" fill="rgba(255,255,255,0.7)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.0, repeat: Infinity }} />
          <motion.circle cx="105" cy="158" r="3.5" fill="rgba(255,255,255,0.5)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.0, repeat: Infinity, delay: 0.33 }} />
          <motion.circle cx="114" cy="158" r="3.5" fill="rgba(255,255,255,0.3)"
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 1.0, repeat: Infinity, delay: 0.66 }} />

          {/* ── Left Arm ── */}
          <rect x="8" y="114" width="18" height="54" rx="6"
            stroke="rgba(255,255,255,0.40)" strokeWidth="1.1" />
          <motion.rect x="10" y="150" width="14" height="2.5" rx="1"
            fill="rgba(255,255,255,0.35)"
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 1.6, repeat: Infinity }} />
          {/* Left hand */}
          <rect x="7" y="168" width="20" height="14" rx="5"
            stroke="rgba(255,255,255,0.30)" strokeWidth="0.9" />

          {/* ── Right Arm ── */}
          <rect x="134" y="114" width="18" height="54" rx="6"
            stroke="rgba(255,255,255,0.40)" strokeWidth="1.1" />
          <motion.rect x="136" y="150" width="14" height="2.5" rx="1"
            fill="rgba(255,255,255,0.35)"
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.55 }} />
          {/* Right hand */}
          <rect x="133" y="168" width="20" height="14" rx="5"
            stroke="rgba(255,255,255,0.30)" strokeWidth="0.9" />

          {/* ── Legs ── */}
          <rect x="38" y="182" width="32" height="30" rx="7"
            stroke="rgba(255,255,255,0.36)" strokeWidth="1.1" />
          <rect x="90" y="182" width="32" height="30" rx="7"
            stroke="rgba(255,255,255,0.36)" strokeWidth="1.1" />

          {/* Feet */}
          <rect x="33" y="210" width="40" height="10" rx="5"
            stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" />
          <rect x="87" y="210" width="40" height="10" rx="5"
            stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" />

          {/* Knee joints */}
          <circle cx="54" cy="182" r="4" stroke="rgba(255,255,255,0.20)" strokeWidth="0.7" />
          <circle cx="106" cy="182" r="4" stroke="rgba(255,255,255,0.20)" strokeWidth="0.7" />

          {/* ── Connection lines from torso ── */}
          <motion.line x1="80" y1="182" x2="54" y2="182"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"
            animate={{ opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="80" y1="182" x2="106" y2="182"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"
            animate={{ opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
        </svg>
      </motion.div>
    </motion.div>
  );
}
