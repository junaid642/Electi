import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import LuxuryPrivateCategoriesClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("vt-luxury");
  return buildMetadata(seo, {
    title: "Private Luxury Virtual Tours Saudi Arabia",
    description: "360° virtual tours for palaces, private villas, penthouses, private estates, and luxury showrooms in Saudi Arabia and GCC.",
    keywords: "luxury virtual tours Saudi Arabia, palace 360 tour, private villa virtual tour, luxury property viewing",
    url: "https://www.x-360.ai/virtual-tours/luxury-private",
    ogTitle: "Private Luxury Virtual Tours | X360",
    ogDescription: "Immersive 360° virtual tours for every luxury property — palaces, villas, penthouses, estates, and more.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/360" },
    { "@type": "ListItem", position: 3, name: "Luxury & Private", item: "https://www.x-360.ai/virtual-tours/luxury-private" },
  ],
};

export default function LuxuryPrivatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <LuxuryPrivateCategoriesClient />
    </>
  );
}
