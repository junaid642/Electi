import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import RealEstateClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-real-estate");
  return buildMetadata(seo, {
    title: "Real Estate Digital Ecosystem | Website Development | X360",
    description: "X360 is your complete real estate technology partner — luxury websites, mobile apps, AI, 360° virtual tours, 3D digital twins, enterprise systems, and intelligent automation under one ecosystem.",
    keywords: "real estate website Saudi Arabia, property portal, 360 virtual tours, real estate AI, digital twin",
    url: "https://www.x-360.ai/development/website/real-estate",
    ogTitle: "Real Estate Digital Ecosystem | X360",
    ogDescription: "Complete real estate technology — luxury websites, AI, 360° tours, digital twins, and intelligent automation.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Real Estate", item: "https://www.x-360.ai/development/website/real-estate" },
  ],
};

export default function RealEstatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <RealEstateClient />
    </>
  );
}
