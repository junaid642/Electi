import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import PrivateJetClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-private-jet");
  return buildMetadata(seo, {
    title: "Private Jets & Yachts Website Development | X360",
    description: "X360 builds ultra-luxury digital ecosystems for private aviation and yacht charter companies — AI concierge, 360° fleet tours, cinematic booking platforms, and VIP portals for Saudi Arabia and GCC.",
    keywords: "private jet website Saudi Arabia, yacht charter website, aviation AI concierge, luxury booking platform",
    url: "https://www.x-360.ai/development/website/private-jet",
    ogTitle: "Private Jets & Yachts Website Development | X360",
    ogDescription: "Ultra-luxury digital ecosystems for private aviation and yacht charter — AI concierge, 360° fleet tours, cinematic booking.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Private Jets & Yachts", item: "https://www.x-360.ai/development/website/private-jet" },
  ],
};

export default function PrivateJetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PrivateJetClient />
    </>
  );
}
