import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import RealEstateCategoriesClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("vt-real-estate");
  return buildMetadata(seo, {
    title: "Real Estate Virtual Tours Saudi Arabia",
    description: "360° virtual tours for villas, apartments, co-working spaces, industrial warehouses, empty land, and construction sites in Saudi Arabia and GCC.",
    keywords: "real estate virtual tours Saudi Arabia, 360 property tours, virtual property viewing, Riyadh virtual tours",
    url: "https://www.x-360.ai/virtual-tours/real-estate",
    ogTitle: "Real Estate Virtual Tours | X360",
    ogDescription: "Immersive 360° virtual tours for every real estate category — residential, commercial, industrial, and land.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/360" },
    { "@type": "ListItem", position: 3, name: "Real Estate", item: "https://www.x-360.ai/virtual-tours/real-estate" },
  ],
};

export default function RealEstatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <RealEstateCategoriesClient />
    </>
  );
}
