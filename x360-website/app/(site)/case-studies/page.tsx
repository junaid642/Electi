import type { Metadata } from "next";
import CaseStudiesClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("case-studies");
  return buildMetadata(seo, {
    title: "Case Studies | X360 — Virtual Tours & Web Development Saudi Arabia",
    description: "Real projects, real results. Explore X360 case studies showcasing 360° virtual tours and Web & AI solutions delivered for businesses across Saudi Arabia, Riyadh, Jeddah, and the GCC.",
    keywords: "X360 case studies, virtual tour portfolio Saudi Arabia, web development projects KSA, AI solutions Saudi examples, digital transformation Saudi Arabia portfolio",
    url: "https://www.x-360.ai/case-studies",
    ogTitle: "Case Studies | X360",
    ogDescription: "360° virtual tours and Web & AI projects across Saudi Arabia and GCC.",
  });
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
