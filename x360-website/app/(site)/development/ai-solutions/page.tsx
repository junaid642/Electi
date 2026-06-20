import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import { getCategory } from "@/data/webai-categories";
import AISolutionsClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-ai-solutions");
  return buildMetadata(seo, {
    title: "AI Solutions | Intelligent Automation & Custom AI | X360",
    description: "X360 delivers enterprise AI solutions — chatbots, workflow automation, predictive analytics, and custom AI systems tailored for Saudi businesses.",
    keywords: "AI solutions Saudi Arabia, AI chatbots, workflow automation, predictive analytics, custom AI",
    url: "https://www.x-360.ai/development/ai-solutions",
    ogTitle: "AI Solutions | X360",
    ogDescription: "Enterprise AI — chatbots, automation, analytics, and custom models for modern businesses.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.x-360.ai/development/ai-solutions" },
  ],
};

export default function AISolutionsPage() {
  const data = getCategory("ai-solutions");
  if (!data) throw new Error("ai-solutions category not found");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AISolutionsClient data={data} />
    </>
  );
}
