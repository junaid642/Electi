import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("Admin@electi.ai");
  const [password, setPassword] = useState("Admin1234");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { data: { email: email.toLowerCase().trim(), password } },
      {
        onError: (_error: unknown) => {
          toast({
            title: "Authentication Failed",
            description: "Invalid credentials provided for command center access.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Pitch-black overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "1.5rem",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-0">
            <img
              src="/electi-logo.png"
              alt="Electi"
              style={{ width: 416, height: 166, objectFit: "contain" }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-center text-[11px] tracking-[0.3em] text-white/30 uppercase mb-8">
            Command Center
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] uppercase tracking-widest text-white/40">
                Operator ID
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@electi.ai"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.05] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-mono h-12 text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[11px] uppercase tracking-widest text-white/40">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/[0.05] border-white/[0.10] focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-mono h-12 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white hover:bg-white/90 text-black font-semibold h-12 transition-all uppercase tracking-wider text-sm mt-2"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  AUTHENTICATING...
                </span>
              ) : "INITIALIZE SESSION"}
            </Button>
          </form>

          <p className="mt-8 text-center text-[9px] uppercase tracking-[0.3em] text-white/20">
            SECURE CHANNEL · AES-256 ENCRYPTED
          </p>
        </div>
      </motion.div>
    </div>
  );
}
