import type { Metadata } from "next";
import WebAIClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("web-ai");
  return buildMetadata(seo, {
    title: "Website Development Saudi Arabia | AI, ERP & SAP Solutions | X360",
    description: "تقدم X360 خدمات تطوير المواقع الإلكترونية والمتاجر الرقمية وحلول الذكاء الاصطناعي وأنظمة ERP وSAP للشركات في المملكة العربية السعودية مع تصميمات احترافية وتقنيات متقدمة.",
    keywords: "Website Development Saudi Arabia, Web Design Riyadh, AI Solutions Saudi Arabia, ERP Solutions Saudi Arabia, SAP Implementation Saudi Arabia, Business Automation Saudi Arabia",
    url: "https://www.x-360.ai/development",
    ogTitle: "Website Development Saudi Arabia | AI, ERP & SAP Solutions",
    ogDescription: "تطوير مواقع احترافية وحلول ذكاء اصطناعي وأنظمة ERP وSAP للشركات السعودية.",
  });
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Design & AI Development Saudi Arabia",
  provider: {
    "@type": "Organization",
    name: "X360",
    url: "https://www.x-360.ai",
  },
  description: "Custom websites, AI chatbots, mobile apps, e-commerce, SAP/ERP, cybersecurity and cloud solutions for Saudi businesses.",
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  serviceType: ["Web Development", "AI Development", "Mobile App Development", "ERP Implementation"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbot Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SAP / ERP Implementation" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Web & AI Development", item: "https://www.x-360.ai/development" },
  ],
};

export default function WebAIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WebAIClient />
    </>
  );
}
