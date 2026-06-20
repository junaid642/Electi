"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MouseGlow from "@/components/ui/MouseGlow";
import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PageTransition } from "@/components/PageTransition";
import { useLang } from "@/contexts/LanguageContext";

function SiteInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAr } = useLang();
  const isHome = pathname === "/" || pathname === "";
  const isFullPage = pathname === "/virtual-tours" || pathname.startsWith("/virtual-tours/") || pathname === "/development" || pathname.startsWith("/development/") || pathname === "/about"; // snap-scroll full-page — has its own footer section
  const [splashDone, setSplashDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const apply = (mobile: boolean) => {
      if (mobile) {
        el.style.height = "100dvh";
        el.style.overflowY = "scroll";
        // Full-page snap experiences need mandatory; regular pages use proximity
        // so the footer is reachable without fighting the snap.
        el.style.scrollSnapType = isFullPage ? "y mandatory" : "y proximity";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el.style as any).scrollbarWidth = "none";
      } else {
        el.style.height = "";
        el.style.overflowY = "";
        el.style.scrollSnapType = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el.style as any).scrollbarWidth = "auto";
      }
    };
    const mq = window.matchMedia("(max-width: 1023px)");
    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isFullPage]);

  return (
    <div
      id="site-container"
      ref={containerRef}
      className="relative min-h-screen bg-black text-white flex flex-col overflow-x-hidden"
      style={{
        cursor: "none",
        fontFamily: isAr ? "Cairo, sans-serif" : "Quicksand, sans-serif",
      }}
    >
      <style>{`@media(max-width:1023px){.snap-layout::-webkit-scrollbar{display:none}}`}</style>
      <CustomCursor />
      <SplashScreen onDone={() => setSplashDone(true)} />
      <MouseGlow />
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      {!isHome && !isFullPage && <Footer />}
      {!isHome && !isFullPage && <WhatsAppButton />}
    </div>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SiteInner>{children}</SiteInner>
    </LanguageProvider>
  );
}
