"use client";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const SIZES = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  full: "max-w-7xl",
};

export default function Modal({ open, onClose, title, subtitle, children, size = "md", className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full glass border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)] flex flex-col max-h-[92vh]",
          SIZES[size],
          className
        )}
        style={{ animation: "modal-in 0.18s ease" }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
            <div>
              {title && <h2 className="text-[13px] font-700 text-white/90 font-display tracking-wide">{title}</h2>}
              {subtitle && <p className="text-[11px] text-white/38 mt-0.5">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg glass-sm flex items-center justify-center hover:bg-white/[0.08] transition-colors ml-4 shrink-0">
              <X className="w-3.5 h-3.5 text-white/50" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
