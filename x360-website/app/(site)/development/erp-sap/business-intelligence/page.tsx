import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import BusinessIntelligenceClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-bi");
  return buildMetadata(seo, {
    title: "Business Intelligence & Analytics Saudi Arabia | X360",
    description: "X360 turns raw enterprise data into live intelligence — real-time dashboards, predictive KPIs, and SAP Analytics Cloud powered reporting.",
    keywords: "business intelligence Saudi Arabia, real-time dashboards, predictive KPIs, SAP Analytics Cloud, data reporting",
    url: "https://www.x-360.ai/development/erp-sap/business-intelligence",
    ogTitle: "Business Intelligence & Analytics | X360",
    ogDescription: "Live business intelligence — real-time dashboards, predictive KPIs, and enterprise reporting.",
  });
}

export default function BusinessIntelligencePage() {
  return <BusinessIntelligenceClient />;
}
