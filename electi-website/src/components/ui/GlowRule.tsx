import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export default function GlowRule({ className = "" }: { className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`h-px mx-auto ${className}`}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        width: "clamp(80px, 16vw, 220px)",
      }}
    />
  );
}
