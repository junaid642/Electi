import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import OthersCategoriesClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("vt-others");
  return buildMetadata(seo, {
    title: "Virtual Tours for Schools, Mosques & More",
    description: "360° virtual tours for schools, universities, government buildings, showrooms, medical centers, and mosques in Saudi Arabia and GCC.",
    keywords: "school virtual tour Saudi Arabia, government building 360, mosque virtual tour, medical center 360",
    url: "https://www.x-360.ai/virtual-tours/others",
    ogTitle: "Other Sectors Virtual Tours | X360",
    ogDescription: "Immersive 360° virtual tours for every type of venue — schools, government, showrooms, medical, and mosques.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/360" },
    { "@type": "ListItem", position: 3, name: "Other Sectors", item: "https://www.x-360.ai/virtual-tours/others" },
  ],
};

export default function OthersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <OthersCategoriesClient />
    </>
  );
}
