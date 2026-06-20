import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import AIEnterpriseClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-ai");
  return buildMetadata(seo, {
    title: "AI for Enterprise | ERP AI Integration | X360",
    description: "X360 embeds AI agents directly into your ERP layer — predictive automation, intelligent approvals, and generative AI for enterprise operations.",
    keywords: "AI enterprise Saudi Arabia, ERP AI integration, predictive automation, intelligent approvals, generative AI ERP",
    url: "https://www.x-360.ai/development/erp-sap/ai-enterprise",
    ogTitle: "AI for Enterprise | X360",
    ogDescription: "AI agents embedded in your ERP — predictive automation and intelligent enterprise operations.",
  });
}

export default function AIEnterprisePage() {
  return <AIEnterpriseClient />;
}
