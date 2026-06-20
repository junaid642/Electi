"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("/api/admin/auth/me", { credentials: "include" });
        if (res.ok) {
          const user = await res.json();
          localStorage.setItem("x360-user", JSON.stringify({
            name: user.name, email: user.email, role: user.role,
          }));
          setOk(true);
        } else {
          localStorage.removeItem("x360-user");
          router.replace("/login");
        }
      } catch {
        localStorage.removeItem("x360-user");
        router.replace("/login");
      }
    }
    verify();
  }, [pathname, router]);

  if (!ok) return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-5 h-5 border border-white/15 border-t-white/50 rounded-full animate-spin" />
        <p className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase">Verifying access…</p>
      </div>
    </div>
  );

  return <>{children}</>;
}
