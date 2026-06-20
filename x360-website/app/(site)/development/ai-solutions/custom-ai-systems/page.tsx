import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import CustomAIClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-ai-custom");
  return buildMetadata(seo, {
    title: "Custom AI Systems | Tailored Intelligence Systems | X360",
    description: "X360 engineers fully bespoke AI systems — proprietary LLMs, computer vision, intelligent document processing, and on-premise enterprise AI infrastructure.",
    keywords: "custom AI systems Saudi Arabia, proprietary LLM, computer vision, intelligent document processing, on-premise AI",
    url: "https://www.x-360.ai/development/ai-solutions/custom-ai-systems",
    ogTitle: "Custom AI Systems | X360",
    ogDescription: "Fully bespoke AI — proprietary models, computer vision, intelligent documents, on-premise deployment.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.x-360.ai/development/ai-solutions" },
    { "@type": "ListItem", position: 4, name: "Custom AI Systems", item: "https://www.x-360.ai/development/ai-solutions/custom-ai-systems" },
  ],
};

export default function CustomAIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CustomAIClient />
    </>
  );
}
