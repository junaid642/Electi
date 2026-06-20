import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import HealthcareClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("dev-website-healthcare");
  return buildMetadata(seo, {
    title: "Healthcare Digital Ecosystem | Website Development | X360",
    description: "X360 builds modern healthcare platforms — clinic & hospital websites, AI health assistants, patient portals, appointment booking systems, and HIPAA-compliant infrastructure for Saudi healthcare leaders.",
    keywords: "healthcare website Saudi Arabia, clinic website, patient portal, hospital AI, appointment booking",
    url: "https://www.x-360.ai/development/website/healthcare",
    ogTitle: "Healthcare Digital Ecosystem | X360",
    ogDescription: "Complete healthcare technology ecosystem — clinic websites, AI assistants, patient portals, and smart automation.",
  });
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
    { "@type": "ListItem", position: 3, name: "Website Development", item: "https://www.x-360.ai/development/website" },
    { "@type": "ListItem", position: 4, name: "Healthcare", item: "https://www.x-360.ai/development/website/healthcare" },
  ],
};

export default function HealthcarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HealthcareClient />
    </>
  );
}
