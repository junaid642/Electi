import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import HospitalityClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-hospitality");
  return buildMetadata(seo, {
    title: "Hospitality Digital Ecosystem | Website Development | X360",
    description: "X360 builds luxury hospitality platforms — hotel & restaurant websites, AI concierge, online reservation systems, guest apps, and intelligent automation for Saudi hospitality leaders.",
    keywords: "hotel website Saudi Arabia, restaurant website, hospitality AI, online reservation system, guest app",
    url: "https://www.x-360.ai/development/website/hospitality",
    ogTitle: "Hospitality Digital Ecosystem | X360",
    ogDescription: "Complete hospitality technology ecosystem — luxury websites, AI concierge, reservation systems, and smart automation.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Hospitality", item: "https://www.x-360.ai/development/website/hospitality" },
  ],
};

export default function HospitalityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HospitalityClient />
    </>
  );
}
