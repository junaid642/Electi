import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.2] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-sm">
        <div className="font-mono">
          <p className="text-[9px] text-white/25 tracking-[0.3em] uppercase mb-2">Error Code</p>
          <p className="text-[80px] font-900 text-white/[0.06] leading-none select-none">404</p>
        </div>
        <div>
          <h1 className="text-xl font-700 text-white/80 mb-2">Page Not Found</h1>
          <p className="text-[13px] text-white/35">This route does not exist in the X360 Command Center.</p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[12px] font-700 tracking-wide hover:opacity-90 transition-opacity"
        >
          Return to Command Center →
        </Link>
      </div>
    </div>
  );
}
