import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import RetailClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-retail");
  return buildMetadata(seo, {
    title: "Retail Digital Ecosystem | Website Development | X360",
    description: "X360 builds premium retail digital platforms — branded in-store and online experiences, smart inventory management, Saudi payment gateways, and AI-powered analytics for Saudi retail brands.",
    keywords: "retail website Saudi Arabia, smart inventory, Saudi payment gateway, retail AI analytics",
    url: "https://www.x-360.ai/development/website/retail",
    ogTitle: "Retail Digital Ecosystem | X360",
    ogDescription: "Complete retail technology ecosystem — branded experiences, smart inventory, Saudi payment gateways, and retail automation.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Retail", item: "https://www.x-360.ai/development/website/retail" },
  ],
};

export default function RetailPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <RetailClient />
    </>
  );
}
