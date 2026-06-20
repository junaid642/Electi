import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  glow?: boolean;
}

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
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
  const base = `relative inline-flex items-center justify-center gap-2.5 font-600 cursor-pointer overflow-hidden transition-all duration-300 select-none ${sizes[size]} ${className}`;

  if (variant === "primary") {
    return (
      <motion.button
        className={`${base} bg-white text-black`}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        animate={glow ? {
          boxShadow: [
            "0 0 20px rgba(255,255,255,0.15), 0 0 0px rgba(255,255,255,0)",
            "0 0 40px rgba(255,255,255,0.32), 0 0 80px rgba(255,255,255,0.08)",
            "0 0 20px rgba(255,255,255,0.15), 0 0 0px rgba(255,255,255,0)",
          ],
        } : undefined}
        transition={glow ? { boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 } } : { duration: 0.2 }}
        {...props}
      >
        {/* Hover shimmer sweep */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.06) 60%, transparent 80%)" }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  if (variant === "ghost") {
    return (
      <motion.button
        className={`${base} bg-white/4 text-white/65 hover:text-white`}
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.06)" }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {/* Animated border shimmer */}
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  /* outline variant */
  return (
    <motion.button
      className={`${base} bg-transparent text-white/55 hover:text-white`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Neon animated border */}
      <motion.span
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={glow ? {
          boxShadow: [
            "inset 0 0 0 1px rgba(255,255,255,0.1)",
            "inset 0 0 0 1px rgba(255,255,255,0.28)",
            "inset 0 0 0 1px rgba(255,255,255,0.1)",
          ],
        } : { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
