import type { Metadata } from "next";
import ToursClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("360");
  return buildMetadata(seo, {
    title: "360 Virtual Tours Saudi Arabia | Real Estate, Hotels & Digital Twins | X360",
    description: "شركة X360 من أبرز مزودي خدمات الجولات الافتراضية 360 درجة والتوأم الرقمي في السعودية للعقارات والفنادق والمطاعم والمشاريع الحكومية والإنشائية، مع تغطية شاملة لجميع مناطق المملكة.",
    keywords: "360 Virtual Tours Saudi Arabia, Virtual Tour Company Riyadh, Real Estate Virtual Tours Saudi Arabia, Hotel Virtual Tours Saudi Arabia, Construction Virtual Tours Saudi Arabia, Digital Twin Saudi Arabia, Google Street View Saudi Arabia",
    url: "https://www.x-360.ai/virtual-tours",
    ogTitle: "360 Virtual Tours Saudi Arabia | Real Estate, Hotels & Digital Twins",
    ogDescription: "جولات افتراضية 360 درجة للعقارات والفنادق والمشاريع الإنشائية في المملكة العربية السعودية.",
  });
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "360° Virtual Tours Saudi Arabia",
  provider: {
    "@type": "Organization",
    name: "X360",
    url: "https://www.x-360.ai",
  },
  description: "Premium immersive 360° virtual tours for hotels, real estate, retail, healthcare, and hospitality across Saudi Arabia and the GCC. Photorealistic 3D, AR & VR experiences.",
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  serviceType: "Virtual Tour Photography",
  offers: {
    "@type": "Offer",
    description: "360° virtual tour packages for hospitality, real estate, retail and corporate sectors",
    areaServed: "SA",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/virtual-tours" },
  ],
};

export default function ToursPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToursClient />
    </>
  );
}
