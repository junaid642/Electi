import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import AIAnalyticsClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-ai-analytics");
  return buildMetadata(seo, {
    title: "Predictive Analytics | Business Intelligence & AI Analytics | X360",
    description: "X360 builds AI-powered predictive analytics — sales forecasting, customer intelligence, real-time executive dashboards, and data warehouse infrastructure.",
    keywords: "predictive analytics Saudi Arabia, business intelligence, AI analytics, sales forecasting, executive dashboard",
    url: "https://www.x-360.ai/development/ai-solutions/ai-analytics",
    ogTitle: "Predictive Analytics | X360",
    ogDescription: "AI-powered analytics and predictive models — turn business data into forward-looking forecasts.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.x-360.ai/development/ai-solutions" },
    { "@type": "ListItem", position: 4, name: "Predictive Analytics", item: "https://www.x-360.ai/development/ai-solutions/ai-analytics" },
  ],
};

export default function AIAnalyticsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AIAnalyticsClient />
    </>
  );
}
