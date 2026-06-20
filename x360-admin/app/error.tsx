"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[X360 Admin Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <span className="text-red-400 text-2xl">⚠</span>
        </div>
        <div>
          <h1 className="text-xl font-700 text-white/80 mb-2">System Error</h1>
          <p className="text-[13px] text-white/35 mb-1">An unexpected error occurred in the X360 Admin.</p>
          {error?.digest && (
            <p className="text-[10px] font-mono text-white/20">Error ID: {error.digest}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-white text-black text-[12px] font-700 tracking-wide hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <a
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl glass border border-white/[0.08] text-white/60 text-[12px] font-600 hover:text-white/80 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
