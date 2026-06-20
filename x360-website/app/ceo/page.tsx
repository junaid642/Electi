import type { Metadata } from "next";
import CeoClient from "./_client";

export const metadata: Metadata = {
  title: "Abdulrhman Alyemeeni — Founder & CEO | X360",
  description: "Executive Digital Identity — Abdulrhman Alyemeeni, Founder & CEO at X360. Visionary leader building Saudi Arabia's digital future through AI, immersive experiences, and enterprise innovation.",
  keywords: "X360 CEO, Abdulrhman Alyemeeni, Founder, Executive Digital Identity, AI Saudi Arabia, Digital Business Card",
  openGraph: {
    title: "Abdulrhman Alyemeeni — Founder & CEO | X360",
    description: "Visionary leader building Saudi Arabia's digital future through AI, immersive experiences, and enterprise innovation.",
    url: "https://www.x-360.ai/ceo",
    siteName: "X360",
  },
  robots: { index: false, follow: false },
};

export default function CeoPage() {
  return <CeoClient />;
}
