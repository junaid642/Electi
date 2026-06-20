import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({ words, interval = 2600, className = "" }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      {/* Invisible longest word locks the container width */}
      <span aria-hidden className="invisible">{longest}</span>

      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          exit={{   opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center shimmer-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
