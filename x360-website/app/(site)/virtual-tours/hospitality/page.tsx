import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import HotelsResortsCategoriesClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("vt-hospitality");
  return buildMetadata(seo, {
    title: "Hospitality Virtual Tours Saudi Arabia",
    description: "360° virtual tours for hotels, resorts, restaurants, event halls, and spa & wellness venues in Saudi Arabia and GCC.",
    keywords: "hospitality virtual tours Saudi Arabia, hotel virtual tour, resort 360 tour, restaurant virtual experience",
    url: "https://www.x-360.ai/virtual-tours/hospitality",
    ogTitle: "Hospitality Virtual Tours | X360",
    ogDescription: "Immersive 360° virtual tours for every hospitality venue — hotels, resorts, restaurants, event halls, and spas.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/360" },
    { "@type": "ListItem", position: 3, name: "Hotels & Resorts", item: "https://www.x-360.ai/virtual-tours/hospitality" },
  ],
};

export default function HotelsResortsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HotelsResortsCategoriesClient />
    </>
  );
}
