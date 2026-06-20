import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import SystemIntegrationClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-integration");
  return buildMetadata(seo, {
    title: "System Integration Saudi Arabia | Enterprise APIs | X360",
    description: "X360 connects your ERP, CRM, cloud platforms, and third-party APIs into a single unified enterprise data fabric.",
    keywords: "system integration Saudi Arabia, ERP integration, CRM integration, API integration, enterprise data fabric",
    url: "https://www.x-360.ai/development/erp-sap/system-integration",
    ogTitle: "System Integration | X360",
    ogDescription: "Connect your ERP, CRM, cloud platforms, and APIs into one unified enterprise fabric.",
  });
}

export default function SystemIntegrationPage() {
  return <SystemIntegrationClient />;
}
