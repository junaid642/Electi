"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-7 h-7" />;

  const isLight = resolvedTheme === "light";

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={[
        "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
        isLight
          ? "bg-black/[0.06] hover:bg-black/[0.10] border border-black/[0.08]"
          : "glass-sm hover:bg-white/[0.08]",
      ].join(" ")}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight
        ? <Moon className="w-3.5 h-3.5 text-zinc-600 hover:text-zinc-800 transition-colors" />
        : <Sun  className="w-3.5 h-3.5 text-white/50 hover:text-amber-400 transition-colors" />
      }
    </button>
  );
}
