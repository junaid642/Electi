import type { Metadata } from "next";
import ContactClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("contact");
  return buildMetadata(seo, {
    title: "Contact X360 | Get a Quote — Virtual Tours & Web Development Saudi Arabia",
    description: "Get in touch with X360 for 360° virtual tours, websites, AI solutions, mobile apps & more. Based in Riyadh, serving businesses across Saudi Arabia and the GCC. Response within 24 hours.",
    keywords: "contact X360 Saudi, get quote virtual tours Saudi Arabia, digital agency contact Riyadh, web development quote KSA",
    url: "https://www.x-360.ai/contact",
    ogTitle: "Contact X360 | Virtual Tours & Web Development Saudi Arabia",
    ogDescription: "Reach out to X360 for a free consultation on virtual tours, AI, web & mobile solutions.",
  });
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.x-360.ai/#organization",
  name: "X360",
  description: "X360 is a Saudi digital transformation agency specialising in 360° virtual tours, AI-powered web development, ERP implementation, and immersive digital experiences.",
  url: "https://www.x-360.ai",
  logo: "https://www.x-360.ai/x360-logo.png",
  image: "https://www.x-360.ai/opengraph.jpg",
  telephone: "+966532087436",
  email: "info@x-360.ai",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2413 Ad Damman Road, Ghirnath Dist., Unit No 2414",
    addressLocality: "Riyadh",
    postalCode: "13242-7933",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.7136,
    longitude: 46.6753,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Kuwait" },
  ],
  sameAs: [],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.x-360.ai/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactClient />
    </>
  );
}
