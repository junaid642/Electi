import type { Metadata } from "next";
import CtoClient from "./_client";

export const metadata: Metadata = {
  title: "Junaid Ahamed Khan — CTO & Director | X360",
  description: "Executive Digital Identity — Junaid Ahamed Khan, CTO & Director at X360. Building immersive digital ecosystems through AI, automation, and enterprise technology.",
  keywords: "X360 CTO, Junaid Ahamed Khan, Executive Digital Identity, AI Enterprise Technology, Digital Business Card",
  openGraph: {
    title: "Junaid Ahamed Khan — CTO & Director | X360",
    description: "Building immersive digital ecosystems through AI, automation, enterprise technology, and futuristic experiences.",
    url: "https://www.x-360.ai/cto",
    siteName: "X360",
  },
  robots: { index: false, follow: false },
};

export default function CtoPage() {
  return <CtoClient />;
}
