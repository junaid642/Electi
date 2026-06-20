import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeUnit { value: number; label: string; }

const TARGET_DAYS = 7;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: TARGET_DAYS, label: "Days" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
    { value: 0, label: "Seconds" },
  ]);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + TARGET_DAYS);

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft([
        { value: Math.floor(diff / 86400000), label: "Days" },
        { value: Math.floor((diff / 3600000) % 24), label: "Hours" },
        { value: Math.floor((diff / 60000) % 60), label: "Minutes" },
        { value: Math.floor((diff / 1000) % 60), label: "Seconds" },
      ]);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 sm:gap-5" data-testid="countdown-timer">
      {timeLeft.map((unit, idx) => (
        <div key={unit.label} className="flex items-start gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <motion.div
              key={unit.value}
              initial={{ rotateX: -45, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-white/10"
            >
              <span className="text-2xl sm:text-3xl font-700 text-white tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
            </motion.div>
            <span className="text-white/35 text-xs mt-2 font-500">{unit.label}</span>
          </div>
          {idx < timeLeft.length - 1 && (
            <span className="text-white/25 text-2xl font-300 mt-4 animate-pulse-glow">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
