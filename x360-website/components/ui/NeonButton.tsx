"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline" | "gold" | "cyan";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  glow?: boolean;
}

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
  xl: "px-10 py-4 text-lg rounded-2xl",
};

export default function NeonButton({
  children,
  variant = "primary",
  size = "lg",
  glow = true,
  className = "",
  ...props
}: NeonButtonProps) {
  const base = `relative inline-flex items-center justify-center gap-2.5 font-bold cursor-pointer overflow-hidden transition-all duration-300 select-none ${sizes[size]} ${className}`;

  if (variant === "gold") {
    return (
      <motion.button
        className={`${base} text-black`}
        style={{ background: "linear-gradient(135deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)" }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {/* Glow: animate opacity on a static box-shadow div — GPU composited, zero paint */}
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.15)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.span className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 60%, transparent 80%)" }}
          initial={{ x: "-100%" }} whileHover={{ x: "200%" }}
          transition={{ duration: 0.5, ease: "easeOut" }} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  if (variant === "cyan") {
    return (
      <motion.button
        className={`${base} text-black`}
        style={{ background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #06b6d4 100%)" }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ boxShadow: "0 0 40px rgba(6,182,212,0.5), 0 0 80px rgba(6,182,212,0.15)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.span className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 60%, transparent 80%)" }}
          initial={{ x: "-100%" }} whileHover={{ x: "200%" }}
          transition={{ duration: 0.5, ease: "easeOut" }} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  if (variant === "primary") {
    return (
      <motion.button
        className={`${base} bg-white text-black`}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ boxShadow: "0 0 40px rgba(255,255,255,0.32), 0 0 80px rgba(255,255,255,0.08)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.span className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.06) 60%, transparent 80%)" }}
          initial={{ x: "-100%" }} whileHover={{ x: "200%" }}
          transition={{ duration: 0.5, ease: "easeOut" }} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  if (variant === "ghost") {
    return (
      <motion.button
        className={`${base} bg-white/[0.04] text-white/65 hover:text-white`}
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.06)" }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {/* Replace backgroundPosition animation (paint) with translateX (compositor) */}
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      className={`${base} bg-transparent text-white/55 hover:text-white`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Outline border: opacity animation on static inset shadow — GPU composited */}
      {glow ? (
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }} />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
