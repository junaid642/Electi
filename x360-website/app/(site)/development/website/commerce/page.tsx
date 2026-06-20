import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import CommerceClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-commerce");
  return buildMetadata(seo, {
    title: "Retail & E-Commerce Digital Ecosystem | Website Development | X360",
    description: "X360 builds high-converting e-commerce platforms — branded online stores, mobile shopping apps, AI product recommendations, and smart automation for Saudi retail brands.",
    keywords: "e-commerce Saudi Arabia, online store development, shopping app, AI product recommendations, retail platform",
    url: "https://www.x-360.ai/development/website/commerce",
    ogTitle: "Retail & E-Commerce Digital Ecosystem | X360",
    ogDescription: "Complete retail technology ecosystem — online stores, mobile apps, AI recommendations, and smart commerce automation.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Retail & E-Commerce", item: "https://www.x-360.ai/development/website/commerce" },
  ],
};

export default function CommercePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CommerceClient />
    </>
  );
}
