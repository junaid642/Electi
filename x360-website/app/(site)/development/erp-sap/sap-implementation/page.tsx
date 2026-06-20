import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import SAPImplementationClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-erp-sap-impl");
  return buildMetadata(seo, {
    title: "SAP Implementation Saudi Arabia | S/4HANA | X360",
    description: "X360 delivers future-ready SAP ecosystems — S/4HANA migration, SAP BTP, ZATCA Phase 2, Analytics Cloud, and full enterprise transformation.",
    keywords: "SAP implementation Saudi Arabia, S/4HANA migration, SAP BTP, ZATCA Phase 2, SAP Analytics Cloud",
    url: "https://www.x-360.ai/development/erp-sap/sap-implementation",
    ogTitle: "SAP Implementation | X360",
    ogDescription: "Future-ready SAP ecosystems — S/4HANA, BTP, ZATCA compliance, and Analytics Cloud.",
  });
}

export default function SAPImplementationPage() {
  return <SAPImplementationClient />;
}
