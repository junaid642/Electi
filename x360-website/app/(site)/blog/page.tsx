import type { Metadata } from "next";
import BlogClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("blog");
  return buildMetadata(seo, {
    title: "X360 Blog — Insights on Digital Experiences & AI in Saudi Arabia",
    description: "Expert articles on 360° virtual tours, AI web development, and digital transformation in Saudi Arabia. Stay ahead with X360's industry insights.",
    keywords: "X360 blog, virtual tour insights Saudi Arabia, AI development articles KSA, digital transformation Saudi Arabia, web development blog Riyadh",
    url: "https://www.x-360.ai/blog",
    ogTitle: "X360 Blog — Insights on Digital Experiences & AI",
    ogDescription: "Expert articles on 360° virtual tours, AI web development, and digital transformation in Saudi Arabia.",
  });
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.x-360.ai/blog" },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogClient />
    </>
  );
}
