import { motion } from "framer-motion";
import { Link } from "wouter";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden" style={{ minHeight: "100dvh" }}>
      <SEOHead noindex path="/login" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

      <motion.div initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease }} className="relative w-full max-w-md z-10">
        <div className="relative rounded-2xl p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}>
          <div className="flex flex-col items-center mb-8">
            <motion.div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-3"
              style={{ boxShadow: "0 0 25px rgba(255,255,255,0.25)" }}
              whileHover={{ scale: 1.05, rotate: 5 }}>
              <Zap className="w-6 h-6 text-black fill-black" />
            </motion.div>
            <h1 className="text-xl font-700 text-white">Welcome back</h1>
            <p className="text-white/32 text-sm mt-1">Sign in to your Electi account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-500 text-white/45 mb-1.5">Email</label>
              <input type="email" placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-white/8 focus:border-white/22 focus:outline-none text-white placeholder-white/18 text-sm transition-all hover:border-white/12"
                style={{ background: "rgba(255,255,255,0.04)" }}
                data-testid="login-email" />
            </div>

            <div>
              <label className="block text-sm font-500 text-white/45 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-white/8 focus:border-white/22 focus:outline-none text-white placeholder-white/18 text-sm transition-all hover:border-white/12"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                  data-testid="login-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/22 hover:text-white/55 transition-colors"
                  data-testid="login-toggle-password">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded accent-white" data-testid="login-remember" />
                <span className="text-sm text-white/32">Remember me</span>
              </label>
              <button className="text-sm text-white/45 hover:text-white transition-colors" data-testid="login-forgot">
                Forgot password?
              </button>
            </div>

            <motion.button className="w-full py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/92 transition-all mt-1"
              style={{ boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
              whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
              data-testid="login-submit">
              Sign In
            </motion.button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-white/20 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Microsoft"].map((provider) => (
              <motion.button key={provider}
                className="py-2.5 rounded-xl border border-white/8 text-white/45 hover:text-white hover:border-white/15 text-sm font-500 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                data-testid={`login-${provider.toLowerCase()}`}>
                {provider}
              </motion.button>
            ))}
          </div>

          <p className="text-center text-sm text-white/30 mt-6">
            Don't have an account?{" "}
            <Link href="/signup">
              <span className="text-white hover:text-white/75 cursor-pointer transition-colors font-600 underline underline-offset-2 decoration-white/25">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
