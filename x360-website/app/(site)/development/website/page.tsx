import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import { getCategory } from "@/data/webai-categories";
import WebsiteDevelopmentClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website");
  return buildMetadata(seo, {
    title: "Website Development Saudi Arabia | Web & AI | X360",
    description: "Custom website development for modern businesses in Saudi Arabia — corporate, e-commerce, healthcare, hospitality, real estate and more.",
    keywords: "website development Saudi Arabia, custom websites, corporate web development, Next.js Saudi",
    url: "https://www.x-360.ai/development/website",
    ogTitle: "Website Development | X360",
    ogDescription: "Premium website development for modern Saudi businesses.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
  ],
};

export default function WebsiteDevelopmentPage() {
  const data = getCategory("website");
  if (!data) throw new Error("website category not found");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WebsiteDevelopmentClient data={data} />
    </>
  );
}
