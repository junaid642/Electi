import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import CustomERPClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-custom");
  return buildMetadata(seo, {
    title: "Custom ERP Development Saudi Arabia | X360",
    description: "X360 builds tailored ERP platforms purpose-built for your business — from manufacturing floors to retail chains and real estate portfolios.",
    keywords: "custom ERP Saudi Arabia, tailored ERP development, manufacturing ERP, retail ERP, real estate ERP",
    url: "https://www.x-360.ai/development/erp-sap/custom-erp",
    ogTitle: "Custom ERP Development | X360",
    ogDescription: "Tailored ERP platforms purpose-built for your business operations.",
  });
}

export default function CustomERPPage() {
  return <CustomERPClient />;
}
