import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import ERPSAPOverviewClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-sap");
  return buildMetadata(seo, {
    title: "SAP & ERP Solutions Saudi Arabia | X360",
    description: "X360 delivers intelligent enterprise systems — SAP implementation, custom ERP, business intelligence, AI-embedded enterprise platforms, and system integration.",
    keywords: "SAP implementation Saudi Arabia, custom ERP, business intelligence, ZATCA, enterprise systems",
    url: "https://www.x-360.ai/development/erp-sap",
    ogTitle: "SAP & ERP Solutions | X360",
    ogDescription: "Intelligent enterprise systems — SAP, ERP, BI, and AI for Saudi corporations.",
  });
}

export default function ERPSAPPage() {
  return <ERPSAPOverviewClient />;
}
