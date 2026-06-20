"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/admin/auth/me", { credentials: "include" })
      .then(r => { if (r.ok) router.replace("/dashboard"); })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid credentials. Please check your email and password.");
        setLoading(false);
        return;
      }
      const user = await res.json();
      localStorage.setItem("x360-user", JSON.stringify({
        name: user.name, email: user.email, role: user.role,
      }));
      router.push("/dashboard");
    } catch {
      setError("Unable to connect to the server. Please try again.");
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center p-6 overflow-hidden relative">

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-anim absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* Corner marks */}
      {[
        "top-6 left-6 border-l border-t",
        "top-6 right-6 border-r border-t",
        "bottom-6 left-6 border-l border-b",
        "bottom-6 right-6 border-r border-b",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-6 h-6 ${cls} border-white/[0.07] pointer-events-none`} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[380px] relative z-10"
      >
        {/* Logo block */}
        <div className="flex flex-col items-center mb-9">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/x360-admin/x360-logo.png"
              alt="X360"
              width={140}
              height={56}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Main card */}
        <div className="relative">
          {/* Top gradient border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />

          <div
            className="relative rounded-2xl p-8 space-y-6 border border-white/[0.055]"
            style={{ backdropFilter: "blur(28px)", background: "rgba(255,255,255,0.022)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[9px] font-600 tracking-[0.14em] uppercase text-white/28 block">
                  Operator ID
                </label>
                <div
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-white/20 transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-white/22 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="operator@x-360.ai"
                    required
                    autoComplete="username"
                    className="flex-1 bg-transparent text-[12px] text-white/82 placeholder-white/18 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[9px] font-600 tracking-[0.14em] uppercase text-white/28 block">
                  Access Code
                </label>
                <div
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-white/20 transition-colors duration-200"
                >
                  <Lock className="w-3.5 h-3.5 text-white/22 shrink-0" />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    required
                    autoComplete="current-password"
                    className="flex-1 bg-transparent text-[12px] text-white/82 placeholder-white/18 outline-none"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="text-white/22 hover:text-white/55 transition-colors">
                    {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setRemember(!remember)} className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors group">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${remember ? "bg-white/80 border-white" : "border-white/20"}`}>
                    {remember && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                  </div>
                  <span className="text-[10px]">Remember me</span>
                </button>
                <button type="button" className="text-[10px] text-white/28 hover:text-white/55 transition-colors">
                  Forgot access?
                </button>
              </div>

              {/* Error message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.06]">
                      <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                      <p className="text-[10px] text-red-400/80">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
                className="w-full py-3 rounded-xl text-[12px] font-700 tracking-[0.1em] text-black bg-white disabled:opacity-50 transition-opacity duration-200 shadow-lg shadow-white/10 mt-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border-[1.5px] border-black/20 border-t-black/70 rounded-full animate-spin" />
                    Authenticating…
                  </span>
                ) : "ENTER SYSTEM →"}
              </motion.button>
            </form>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
