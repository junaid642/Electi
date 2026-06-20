import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import CorporateClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-corporate");
  return buildMetadata(seo, {
    title: "Corporate Identity Digital Ecosystem | Website Development | X360",
    description: "X360 builds premium corporate digital platforms — brand websites, investor relations portals, AI analytics, and enterprise systems for Saudi corporations and Vision 2030 aligned businesses.",
    keywords: "corporate website Saudi Arabia, investor relations portal, brand website, Vision 2030 digital",
    url: "https://www.x-360.ai/development/website/corporate",
    ogTitle: "Corporate Identity Digital Ecosystem | X360",
    ogDescription: "Complete corporate technology ecosystem — brand websites, investor portals, AI analytics, and enterprise systems.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Corporate", item: "https://www.x-360.ai/development/website/corporate" },
  ],
};

export default function CorporatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CorporateClient />
    </>
  );
}
