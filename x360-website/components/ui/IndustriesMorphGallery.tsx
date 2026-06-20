"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type AnimationPhase = "scatter" | "line" | "circle";

interface FlipCardProps {
  src: string;
  label: string;
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 64;
const IMG_HEIGHT = 90;

function FlipCard({ src, label, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 38, damping: 14 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={src} alt={label} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-300" />
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(10,10,10,0.96)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <p className="text-[7px] font-bold text-white/35 uppercase tracking-widest mb-1.5">Sector</p>
          <p className="text-[10px] font-semibold text-white text-center leading-tight">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

const INDUSTRY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80",  label: "Real Estate"  },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80",  label: "Hospitality"  },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&q=80",  label: "Healthcare"   },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",  label: "Construction" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",  label: "Corporate"    },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80",  label: "Retail"       },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",  label: "Real Estate"  },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",  label: "Hospitality"  },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&q=80",  label: "Healthcare"   },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=80",     label: "Construction" },
  { src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&q=80",     label: "Retail"       },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",     label: "Corporate"    },
  { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&q=80",  label: "Real Estate"  },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&q=80",  label: "Hospitality"  },
  { src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80",     label: "Construction" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",  label: "Retail"       },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80",  label: "Corporate"    },
  { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80",  label: "Real Estate"  },
  { src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=300&q=80",  label: "Healthcare"   },
  { src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&q=80",  label: "Hospitality"  },
];

const TOTAL_IMAGES = INDUSTRY_IMAGES.length;

export default function IndustriesMorphGallery() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const morphProgress = useMotionValue(0);
  const [morphValue, setMorphValue] = useState(0);

  /* ── container size ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerSize({ width: e.contentRect.width, height: e.contentRect.height });
      }
    });
    obs.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  /* ── intro → morph sequence (auto-plays, no scroll needed) ── */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"),   400);
    const t2 = setTimeout(() => setIntroPhase("circle"), 1800);
    const t3 = setTimeout(() => {
      animate(morphProgress, 1, { duration: 2.4, ease: [0.22, 1, 0.36, 1] });
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [morphProgress]);

  /* ── track morphValue for card calculations ── */
  useEffect(() => morphProgress.on("change", setMorphValue), [morphProgress]);

  /* ── stable scatter positions ── */
  const scatterPositions = useMemo(() =>
    INDUSTRY_IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.5,
      opacity: 0,
    })),
  []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* ── radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.018) 0%, transparent 60%)" }}
      />

      {/* ── heading — fades in when arc is almost formed ── */}
      <motion.div
        className="absolute top-[7%] left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
        animate={{ opacity: morphValue > 0.55 ? 1 : 0, y: morphValue > 0.55 ? 0 : 14 }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)" }}
        >
          Industries
        </span>
        <h2
          className="font-thin text-white text-center"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", letterSpacing: "0.12em" }}
        >
          Search Services by Industry
        </h2>
        <div
          className="mt-4 h-px"
          style={{ width: "clamp(70px, 14vw, 160px)", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.32), transparent)" }}
        />
        <p
          className="mt-3 text-center"
          style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.30)", letterSpacing: "0.1em" }}
        >
          Hover a card to explore · {TOTAL_IMAGES} industry photos
        </p>
      </motion.div>

      {/* ── image arc ── */}
      <div className="relative flex items-center justify-center w-full h-full">
        {INDUSTRY_IMAGES.map(({ src, label }, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

          if (introPhase === "scatter") {
            target = scatterPositions[i];
          } else if (introPhase === "line") {
            const spacing = 72;
            const totalW = TOTAL_IMAGES * spacing;
            target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
          } else {
            const isMobile = containerSize.width < 768;
            const minDim = Math.min(containerSize.width, containerSize.height);

            /* circle */
            const cRadius = Math.min(minDim * 0.34, 300);
            const cAngle = (i / TOTAL_IMAGES) * 360;
            const cRad = (cAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(cRad) * cRadius,
              y: Math.sin(cRad) * cRadius,
              rotation: cAngle + 90,
            };

            /* arc (rainbow arch — convex upward) */
            const baseR = Math.min(containerSize.width, containerSize.height * 1.5);
            const arcR = baseR * (isMobile ? 1.4 : 1.1);
            const apexY = containerSize.height * (isMobile ? 0.38 : 0.3);
            const arcCenterY = apexY + arcR;
            const spread = isMobile ? 110 : 140;
            const startA = -90 - spread / 2;
            const step = spread / (TOTAL_IMAGES - 1);
            const aAngle = startA + i * step;
            const aRad = (aAngle * Math.PI) / 180;
            const arcPos = {
              x: Math.cos(aRad) * arcR,
              y: Math.sin(aRad) * arcR + arcCenterY,
              rotation: aAngle + 90,
              scale: isMobile ? 1.5 : 1.9,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, morphValue),
              y: lerp(circlePos.y, arcPos.y, morphValue),
              rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
              scale: lerp(1, arcPos.scale, morphValue),
              opacity: 1,
            };
          }

          return (
            <FlipCard key={i} src={src} label={label} index={i} target={target} />
          );
        })}
      </div>
    </div>
  );
}
