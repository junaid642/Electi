"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface Marker {
  location: [number, number];
  size: number;
}

export function GlobalPresenceGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 280, theta: deltaY / 900 };
      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const max = 0.12;
        velocity.current = {
          phi: Math.max(-max, Math.min(max, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-max, Math.min(max, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        };
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // X360 presence markers
    const markers: Marker[] = [
      { location: [24.6877, 46.7219], size: 0.06 }, // Saudi Arabia (Riyadh)
      { location: [28.6139, 77.2090], size: 0.05 }, // India (Delhi)
      { location: [13.7563, 100.5018], size: 0.05 }, // Thailand (Bangkok)
      { location: [25.2854, 51.5310], size: 0.05 }, // Qatar (Doha)
      { location: [29.3759, 47.9774], size: 0.05 }, // Kuwait
      { location: [51.5074, -0.1278], size: 0.05 }, // UK (London)
      { location: [25.2048, 55.2708], size: 0.06 }, // Dubai
    ];

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId: number;
    let phi = 0.8; // start roughly centred on Middle East

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi,
        theta: 0.15,
        dark: 1,
        diffuse: 1.8,
        mapSamples: 18000,
        mapBrightness: 4.5,
        baseColor: [0.08, 0.08, 0.08],
        markerColor: [1, 1, 1],
        glowColor: [0.7, 0.7, 0.7],
        markers,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) {
          phi += 0.0022;
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi;
            thetaOffsetRef.current += velocity.current.theta;
            velocity.current.phi *= 0.95;
            velocity.current.theta *= 0.95;
          }
          const tMin = -0.35, tMax = 0.35;
          if (thetaOffsetRef.current < tMin) thetaOffsetRef.current += (tMin - thetaOffsetRef.current) * 0.12;
          else if (thetaOffsetRef.current > tMax) thetaOffsetRef.current += (tMax - thetaOffsetRef.current) * 0.12;
        }

        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.15 + thetaOffsetRef.current + dragOffset.current.theta,
          dark: 1,
          mapBrightness: 4.5,
          markerColor: [1, 1, 1],
          baseColor: [0.08, 0.08, 0.08],
          markers,
        });

        animId = requestAnimationFrame(animate);
      }

      animate();
      setTimeout(() => { if (canvas) canvas.style.opacity = "1"; });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div className="relative aspect-square w-full select-none">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.4s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {/* radial glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.012) 80%, transparent 100%)",
          boxShadow: "0 0 80px 20px rgba(255,255,255,0.04)",
        }}
      />
    </div>
  );
}
