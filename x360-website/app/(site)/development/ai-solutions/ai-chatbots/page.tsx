import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import AIChatbotsClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-ai-chatbots");
  return buildMetadata(seo, {
    title: "AI Chatbots | Intelligent Customer Interaction Systems | X360",
    description: "X360 builds custom AI chatbots and virtual assistants — WhatsApp agents, multilingual AI, sales bots, and 24/7 intelligent customer support for Saudi businesses.",
    keywords: "AI chatbots Saudi Arabia, WhatsApp AI agent, multilingual chatbot, sales bot, customer support AI",
    url: "https://www.x-360.ai/development/ai-solutions/ai-chatbots",
    ogTitle: "AI Chatbots | X360",
    ogDescription: "Custom AI chatbots trained on your business — deployed on your website, WhatsApp, and internal tools.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.x-360.ai/development/ai-solutions" },
    { "@type": "ListItem", position: 4, name: "AI Chatbots", item: "https://www.x-360.ai/development/ai-solutions/ai-chatbots" },
  ],
};

export default function AIChatbotsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AIChatbotsClient />
    </>
  );
}
