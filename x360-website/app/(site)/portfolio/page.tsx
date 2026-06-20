import type { Metadata } from "next";
import PortfolioClient from "./_client";

export const metadata: Metadata = {
  title: "Portfolio — X360 Projects Across Saudi Arabia",
  description: "Explore X360's portfolio of 360° virtual tours, digital twins, web development, AI solutions, and ERP projects delivered for clients across Saudi Arabia, Riyadh, Jeddah, and the GCC.",
  keywords: "X360 portfolio, virtual tour portfolio Saudi Arabia, web development projects KSA, AI solutions portfolio, ERP projects Saudi Arabia, digital transformation portfolio",
  alternates: { canonical: "https://www.x-360.ai/portfolio" },
  openGraph: {
    title: "Portfolio | X360 — Projects Across Saudi Arabia",
    description: "360° virtual tours, AI platforms, ERP systems, and web development delivered for leading Saudi developers, hospitals, hospitality brands, and government authorities.",
    url: "https://www.x-360.ai/portfolio",
    type: "website",
    images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
    siteName: "X360",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | X360 — Projects Across Saudi Arabia",
    description: "360° virtual tours, AI platforms, ERP systems, and web development for leading Saudi clients.",
    images: ["https://www.x-360.ai/opengraph.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://www.x-360.ai/portfolio" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "X360 Project Portfolio",
  description: "360° virtual tours, digital twins, web development, AI solutions and ERP projects by X360 Saudi Arabia",
  url: "https://www.x-360.ai/portfolio",
  numberOfItems: 6,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Roshn Residential Virtual Tours", url: "https://www.x-360.ai/case-studies/roshn-residential-virtual-tours-riyadh" },
    { "@type": "ListItem", position: 2, name: "Hilton Jeddah Pre-Opening Tour", url: "https://www.x-360.ai/case-studies/hilton-jeddah-pre-opening-virtual-tour" },
    { "@type": "ListItem", position: 3, name: "KAFD Corporate Digital Twin", url: "https://www.x-360.ai/case-studies/kafd-corporate-headquarters-digital-twin" },
    { "@type": "ListItem", position: 4, name: "Saudi Aramco IKTVA Portal", url: "https://www.x-360.ai/case-studies/saudi-aramco-iktva-supplier-portal" },
    { "@type": "ListItem", position: 5, name: "Diriyah Gate Heritage Experience", url: "https://www.x-360.ai/case-studies/diriyah-gate-heritage-virtual-experience" },
    { "@type": "ListItem", position: 6, name: "King Fahad Medical City Platform", url: "https://www.x-360.ai/case-studies/king-fahad-medical-city-web-ai-platform" },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PortfolioClient />
    </>
  );
}
