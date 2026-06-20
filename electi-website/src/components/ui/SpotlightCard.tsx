import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(255,255,255,0.07)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      whileHover={{ y: -3, scale: 1.005 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Spotlight radial glow */}
      <div
        className="absolute pointer-events-none z-10 transition-opacity duration-400"
        style={{
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 65%)`,
          inset: 0,
          opacity: hovered ? 1 : 0,
        }}
      />
      {/* Border brightening on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-400"
        style={{
          boxShadow: hovered
            ? `inset 0 0 0 1px rgba(255,255,255,0.14), 0 0 30px rgba(255,255,255,0.04)`
            : `inset 0 0 0 0px transparent`,
        }}
      />
      {children}
    </motion.div>
  );
}
