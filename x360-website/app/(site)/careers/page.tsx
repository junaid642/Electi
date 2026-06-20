import type { Metadata } from "next";
import CareersClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("careers");
  return buildMetadata(seo, {
    title: "Careers at X360 — Join Our Team in Saudi Arabia",
    description: "Explore open positions at X360 and help us build the future of digital experiences in Saudi Arabia. We're hiring talented professionals in Riyadh and beyond.",
    keywords: "X360 careers, jobs Saudi Arabia, digital agency hiring Riyadh, tech jobs KSA",
    url: "https://www.x-360.ai/careers",
    ogTitle: "Careers at X360 — Join Our Team",
    ogDescription: "Join X360 and help build the future of digital experiences in Saudi Arabia.",
  });
}

export default function CareersPage() {
  return <CareersClient />;
}
