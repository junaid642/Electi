import type { Metadata } from "next";
import AboutClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("about");
  return buildMetadata(seo, {
    title: "About X360 | Digital Solutions Saudi Arabia",
    description: "X360 is a leading Saudi digital company specializing in 360° virtual tours and Web & AI development solutions. Serving businesses across Saudi Arabia, Riyadh, Jeddah, and the GCC since 2019.",
    keywords: "X360 Saudi Arabia, digital agency Riyadh, virtual tours company Saudi, web development agency KSA, AI company Saudi Arabia",
    url: "https://www.x-360.ai/about",
    ogTitle: "About X360",
    ogDescription: "Learn about X360 — Saudi Arabia's specialist in 360° virtual tours and Web & AI development.",
  });
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.x-360.ai/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutClient />
    </>
  );
}
