import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import AIAutomationClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-ai-automation");
  return buildMetadata(seo, {
    title: "Workflow Automation | Intelligent Business Automation | X360",
    description: "X360 automates your business workflows — CRM automation, WhatsApp automation, approval systems, and intelligent pipelines connecting every system you use.",
    keywords: "workflow automation Saudi Arabia, CRM automation, WhatsApp automation, business process automation, AI pipelines",
    url: "https://www.x-360.ai/development/ai-solutions/ai-automation",
    ogTitle: "Workflow Automation | X360",
    ogDescription: "End-to-end AI workflow automation connecting your CRM, ERP, email, and communication tools.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "AI Solutions", item: "https://www.x-360.ai/development/ai-solutions" },
    { "@type": "ListItem", position: 4, name: "Workflow Automation", item: "https://www.x-360.ai/development/ai-solutions/ai-automation" },
  ],
};

export default function AIAutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AIAutomationClient />
    </>
  );
}
