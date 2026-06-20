"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Download,
  MessageCircle,
  Globe,
  Check,
  MapPin,
} from "lucide-react";
import CustomCursor from "@/components/ui/CustomCursor";

const ease = [0.22, 1, 0.36, 1] as const;

const PHONE = "+966502547274";
const EMAIL = "ahamed@x-360.ai";
const WEBSITE = "https://x-360.ai";

const COUNTRIES = [
  "Kingdom of Saudi Arabia",
  "State of Qatar",
  "Republic of India",
  "United Arab Emirates",
  "Thailand",
  "United Kingdom",
];

function saveContact() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Mr. Junaid Ahamed Khan",
    "ORG:X360",
    "TITLE:CTO & Director",
    `TEL;TYPE=CELL:${PHONE}`,
    `EMAIL:${EMAIL}`,
    "URL:https://x-360.ai",
    "END:VCARD",
  ].join("\r\n");
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Junaid_Ahamed_Khan_X360.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── SUBTLE PARTICLES ──────────────────────────────────────────────── */
type Particle = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  dur: number;
  delay: number;
  dy: number;
};

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() < 0.7 ? 0.7 : 1.3,
        opacity: 0.15 + Math.random() * 0.22,
        dur: 9 + Math.random() * 9,
        delay: Math.random() * 12,
        dy: 35 + Math.random() * 55,
      })),
    );
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.r * 2,
            height: p.r * 2,
          }}
          animate={{ y: [0, -p.dy, 0], opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── CONTACT ACTION BUTTON ─────────────────────────────────────────── */
function ActionBtn({
  icon: Icon,
  label,
  onClick,
  primary = false,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  primary?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <motion.div
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center"
        style={{
          background: primary
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.05)",
          border: `1px solid ${primary ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)"}`,
          backdropFilter: "blur(20px)",
        }}
        whileHover={{
          background: "rgba(255,255,255,0.14)",
          borderColor: "rgba(255,255,255,0.28)",
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          size={17}
          style={{
            color: highlight
              ? "rgba(255,255,255,0.95)"
              : primary
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.55)",
          }}
        />
      </motion.div>
      <span
        className="text-[9px] font-semibold tracking-[0.18em] uppercase"
        style={{
          color: primary ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.32)",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────── */
export default function CtoClient() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveContact();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "#000000",
        height: "100dvh",
        fontFamily: "'Quicksand', sans-serif",
        cursor: "none",
      }}
    >
      <CustomCursor />
      {/* ── Background ambience ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 75% 65% at 72% 50%, rgba(255,255,255,0.025) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 70% at 10% 55%, rgba(255,255,255,0.012) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.018) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Subtle grid ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.016,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Particles />

      <div className="relative z-10 flex flex-col lg:flex-row lg:h-screen">
        {/* ── LEFT: Editorial typography ─────────────────────────────── */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-start px-8 sm:px-12 lg:px-16 xl:px-20 py-10 lg:min-h-screen text-start">
          {/* Top ornament */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            className="hidden lg:flex items-center gap-3 absolute top-10 left-16 xl:left-20"
          >
            <div className="w-6 h-px" style={{ background: "#6b6b6b" }} />
            <span
              className="text-[8.5px] font-bold tracking-[0.35em] uppercase"
              style={{ color: "#888888" }}
            >
              X360 · Executive Identity
            </span>
          </motion.div>

          {/* Mobile badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="lg:hidden flex items-center justify-center gap-2.5 mb-4"
          >
            <div className="h-px w-6" style={{ background: "#6b6b6b" }} />
            <span
              className="text-[8px] font-bold tracking-[0.32em] uppercase"
              style={{ color: "#888888" }}
            >
              X360 · Executive Identity
            </span>
            <div className="h-px w-6" style={{ background: "#6b6b6b" }} />
          </motion.div>

          {/* ── NAME ── */}
          <div className="mb-1 overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.08, duration: 1.0, ease }}
              className="font-thin leading-none text-white"
              style={{
                fontSize: "clamp(1.8rem, 4.8vw, 3.8rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Mr. Junaid
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.16, duration: 1.0, ease }}
              className="font-thin leading-none"
              style={{
                fontSize: "clamp(1.8rem, 4.8vw, 3.8rem)",
                letterSpacing: "-0.015em",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              Ahamed Khan
            </motion.h1>
          </div>

          {/* Glow rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.38, duration: 0.75, ease }}
            className="mb-6 mx-auto lg:mx-0"
            style={{
              transformOrigin: "center",
              width: "clamp(70px, 12vw, 150px)",
              height: 1,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.55), transparent)",
            }}
          />

          {/* ── DESIGNATION ── */}
          <div className="overflow-hidden mb-0.5">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.28, duration: 0.8, ease }}
              className="font-semibold tracking-[0.26em] uppercase"
              style={{
                fontSize: "clamp(0.68rem, 1.1vw, 0.82rem)",
                color: "rgba(255,255,255,0.68)",
              }}
            >
              CTO & Director
            </motion.p>
          </div>
          <div className="overflow-hidden mb-2 lg:mb-8">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.34, duration: 0.75, ease }}
              className="font-medium tracking-[0.35em] uppercase"
              style={{
                fontSize: "clamp(0.62rem, 0.9vw, 0.75rem)",
                color: "rgba(255,255,255,0.26)",
              }}
            >
              X360 &amp; Electi
            </motion.p>
          </div>

          {/* ── COUNTRIES (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52, duration: 0.8 }}
            className="hidden lg:flex flex-col gap-3 items-start"
            style={{ maxWidth: "clamp(300px, 40vw, 460px)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={11} style={{ color: "rgba(255,255,255,0.60)" }} />
              <span
                className="text-[9px] font-bold tracking-[0.28em] uppercase"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                Present In
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {COUNTRIES.map((country, i) => (
                <motion.span
                  key={country}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56 + i * 0.07, duration: 0.5, ease }}
                  className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    color: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {country}
                </motion.span>
              ))}
            </div>

            {/* ── BIO (3 lines, under Present In) ── */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.7, ease }}
              className="text-xs leading-relaxed mt-2 text-center lg:text-start"
              style={{
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.02em",
              }}
            >
              Building immersive digital ecosystems
              <br />
              through AI, enterprise systems, automation,
              <br />
              and futuristic experiences.
            </motion.p>
          </motion.div>

          {/* Bottom corner label — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="hidden lg:flex items-center gap-2.5 absolute bottom-10 left-16 xl:left-20"
          >
            <div className="h-px w-5" style={{ background: "#6b6b6b" }} />
            <a
              href="https://x-360.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] font-bold tracking-[0.28em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: "#888888" }}
            >
              x-360.ai
            </a>
            <span className="text-[8px]" style={{ color: "#555555" }}>
              |
            </span>
            <a
              href="https://electi.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] font-bold tracking-[0.28em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: "#888888" }}
            >
              electi.sa
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Portrait ─────────────────────────────────────────── */}
        {/* Mobile portrait — full screen, no crop, content overlay */}
        <div
          className="lg:hidden relative w-full overflow-hidden"
          style={{ height: "72dvh" }}
        >
          {/* Flag stack */}
          <div className="absolute top-3 right-3 z-20 flex flex-col items-center gap-1">
            {[
              { flag: "🇸🇦", label: "KSA" },
              { flag: "🇶🇦", label: "QAT" },
              { flag: "🇮🇳", label: "IND" },
              { flag: "🇦🇪", label: "UAE" },
              { flag: "🇹🇭", label: "THA" },
              { flag: "🇬🇧", label: "GBR" },
            ].map(({ flag, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{flag}</span>
              </div>
            ))}
          </div>

          {/* Full image — cover fills screen, face pinned near top */}
          <img
            src="/x360/junaid-khan.webp"
            alt="Junaid Ahamed Khan — CTO & Director, X360"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 15%",
              filter: "grayscale(100%) contrast(1.10) brightness(0.85)",
            }}
          />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 18%, transparent 52%, rgba(0,0,0,0.22) 100%)",
            }}
          />

          {/* Glassmorphism content overlay — sits above the contact panel */}
          <motion.div
            className="absolute left-0 right-0 z-30"
            style={{ bottom: 0 }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.85, ease }}
          >
            <div
              style={{
                background: "rgba(4,4,4,0.60)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                borderTop: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "20px 20px 0 0",
                padding: "20px 22px 28px",
              }}
            >
              {/* Badge */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-px w-4" style={{ background: "#6b6b6b" }} />
                <span
                  className="text-[8px] font-bold tracking-[0.32em] uppercase"
                  style={{ color: "#888888" }}
                >
                  X360 · Executive Identity
                </span>
                <div className="h-px w-4" style={{ background: "#6b6b6b" }} />
              </div>

              {/* Name */}
              <div className="overflow-hidden mb-0.5">
                <motion.h1
                  initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.58, duration: 1.0, ease }}
                  className="font-thin leading-none text-white text-center"
                  style={{ fontSize: "clamp(1.65rem, 7vw, 2.2rem)", letterSpacing: "-0.015em" }}
                >
                  Mr. Junaid
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: "105%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.66, duration: 1.0, ease }}
                  className="font-thin leading-none text-center"
                  style={{ fontSize: "clamp(1.65rem, 7vw, 2.2rem)", letterSpacing: "-0.015em", color: "rgba(255,255,255,0.38)" }}
                >
                  Ahamed Khan
                </motion.h1>
              </div>

              {/* Rule */}
              <div className="flex justify-center mb-3">
                <motion.div
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.82, duration: 0.7, ease }}
                  style={{ transformOrigin: "center", width: 52, height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)" }}
                />
              </div>

              {/* Title */}
              <p
                className="font-semibold tracking-[0.26em] uppercase text-center mb-0.5"
                style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.68)" }}
              >
                CTO &amp; Director
              </p>
              <p
                className="font-medium tracking-[0.35em] uppercase text-center"
                style={{ fontSize: "0.60rem", color: "rgba(255,255,255,0.26)" }}
              >
                X360 &amp; Electi
              </p>
            </div>
          </motion.div>
        </div>

        {/* Desktop portrait column */}
        <div className="hidden lg:block relative w-[46%] xl:w-[44%] flex-shrink-0 lg:h-screen overflow-hidden">
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #000000 0%, rgba(0,0,0,0.0) 22%)",
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, #000000 0%, transparent 18%)",
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, #000000 0%, transparent 10%)",
            }}
          />

          {/* Static portrait — no cursor parallax */}
          <div style={{ position: "absolute", inset: "-5%", zIndex: 1 }}>
            <img
              src="/x360/junaid-khan.webp"
              alt="Junaid Ahamed Khan — CTO & Director, X360"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 12%",
                filter: "grayscale(100%) contrast(1.10) brightness(0.85)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, transparent 30%, rgba(0,0,0,0.28) 100%)",
            }}
          />
        </div>
      </div>

      {/* ══ FLOATING CONTACT PANEL ═══════════════════════════════════════ */}
      <div
        className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        style={{ width: "min(calc(100vw - 2rem), 520px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease }}
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.06) 0%, transparent 70%)",
              transform: "scaleY(1.3) translateY(10%)",
            }}
          />

          <motion.div
            className="relative rounded-3xl"
            style={{
              background: "rgba(10,10,10,0.80)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 36px 90px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          >
            <div className="px-5 sm:px-8 py-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span
                    className="text-[9px] font-bold tracking-[0.28em] uppercase"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    Connect
                  </span>
                </div>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.16)" }}
                >
                  Mr. Junaid Ahamed Khan
                </span>
              </div>

              <div
                className="h-px mb-5"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <div className="flex items-start justify-around gap-2">
                <ActionBtn
                  icon={Phone}
                  label="Call"
                  primary
                  onClick={() => {
                    window.location.href = `tel:${PHONE}`;
                  }}
                />
                <ActionBtn
                  icon={MessageCircle}
                  label="WhatsApp"
                  primary
                  onClick={() =>
                    window.open(
                      `https://wa.me/${PHONE.replace(/\D/g, "")}`,
                      "_blank",
                    )
                  }
                />
                <ActionBtn
                  icon={Mail}
                  label="Email"
                  onClick={() => {
                    window.location.href = `mailto:${EMAIL}`;
                  }}
                />
                <ActionBtn
                  icon={saved ? Check : Download}
                  label={saved ? "Saved!" : "Save"}
                  highlight={saved}
                  onClick={handleSave}
                />
                <ActionBtn
                  icon={Globe}
                  label="Website"
                  onClick={() => window.open(WEBSITE, "_blank")}
                />
              </div>
            </div>
          </motion.div>

          <p
            className="text-center mt-2.5 text-[8.5px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "#888888" }}
          >
            X360 · Digital Identity System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
