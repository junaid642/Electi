import type { Metadata } from "next";
import ResourcesClient from "./_client";

export const metadata: Metadata = {
  title: "Industry Resources & Guides — X360 Saudi Arabia",
  description: "Free industry guides, statistics, and insights on 360° virtual tours, AI solutions, web development, and digital transformation in Saudi Arabia. Essential reading for businesses pursuing Vision 2030.",
  keywords: "virtual tour guide Saudi Arabia, AI solutions guide KSA, web development resources Riyadh, digital transformation Saudi Arabia, Vision 2030 digital guide, X360 resources",
  alternates: { canonical: "https://www.x-360.ai/resources" },
  openGraph: {
    title: "Industry Resources & Guides | X360 Saudi Arabia",
    description: "Free guides on virtual tours, AI, web development, and digital transformation in Saudi Arabia — for businesses pursuing Vision 2030.",
    url: "https://www.x-360.ai/resources",
    type: "website",
    images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
    siteName: "X360",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Resources & Guides | X360 Saudi Arabia",
    description: "Free guides on virtual tours, AI, and digital transformation for Saudi businesses.",
    images: ["https://www.x-360.ai/opengraph.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.x-360.ai/resources" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "X360 Industry Resources",
  description: "Industry guides, statistics, and insights on digital transformation in Saudi Arabia",
  url: "https://www.x-360.ai/resources",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Complete Guide to 360° Virtual Tours in Saudi Arabia", url: "https://www.x-360.ai/resources" },
    { "@type": "ListItem", position: 2, name: "Saudi Real Estate Digital Marketing Playbook 2025", url: "https://www.x-360.ai/resources" },
    { "@type": "ListItem", position: 3, name: "AI in Saudi Hospitality: ROI & Implementation Guide", url: "https://www.x-360.ai/resources" },
    { "@type": "ListItem", position: 4, name: "Vision 2030 Technology Readiness Checklist", url: "https://www.x-360.ai/resources" },
    { "@type": "ListItem", position: 5, name: "Healthcare Digital Transformation in KSA", url: "https://www.x-360.ai/resources" },
    { "@type": "ListItem", position: 6, name: "ERP Selection Guide for Saudi SMEs", url: "https://www.x-360.ai/resources" },
  ],
};

export default function ResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <ResourcesClient />
    </>
  );
}
