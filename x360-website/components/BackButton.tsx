"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function BackButton() {
  const router = useRouter();
  const { isAr } = useLang();

  return (
    <motion.button
      onClick={() => router.back()}
      className="fixed top-6 left-6 z-50 hidden lg:flex items-center gap-1.5 group"
      style={{ color: "rgba(255,255,255,0.3)" }}
      whileHover={{ color: "rgba(255,255,255,0.75)" }}
      transition={{ duration: 0.18 }}
      aria-label={isAr ? "رجوع" : "Go back"}
    >
      <motion.span
        className="flex items-center"
        whileHover={{ x: -2 }}
        transition={{ duration: 0.18 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
      </motion.span>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
        {isAr ? "رجوع" : "Back"}
      </span>
    </motion.button>
  );
}
