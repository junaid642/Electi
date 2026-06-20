import type { Metadata } from "next";
import HotelsVTClient from "./_client";

export const metadata: Metadata = {
  title: "Hotel Virtual Tours Saudi Arabia — 360° Tours for Hotels & Resorts | X360",
  description: "X360 creates professional 360° virtual tours for hotels, resorts, and luxury hospitality venues across Saudi Arabia. Pre-opening virtual staging, F&B tours, suite showcases — all bilingual Arabic/English with 48-hour delivery.",
  keywords: "hotel virtual tours Saudi Arabia, hotel 360 tour Riyadh, resort virtual tour Jeddah, hotel virtual tour company Saudi, جولات افتراضية للفنادق السعودية, pre-opening hotel virtual tour, luxury hotel virtual tour Saudi Arabia, hospitality 360 tour",
  alternates: { canonical: "https://www.x-360.ai/virtual-tours/hotels" },
  openGraph: {
    title: "Hotel Virtual Tours Saudi Arabia | X360 — 360° Hospitality Tours",
    description: "Saudi Arabia's leading hotel virtual tour company. 360° tours for Hilton, Marriott, IHG, and independent luxury hotels — from pre-opening staging to live booking integration.",
    url: "https://www.x-360.ai/virtual-tours/hotels",
    type: "website",
    images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
    siteName: "X360",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Virtual Tours Saudi Arabia | X360",
    description: "360° virtual tours for hotels and resorts across Saudi Arabia — pre-opening staging, suite showcases, and F&B tours.",
    images: ["https://www.x-360.ai/opengraph.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/virtual-tours" },
    { "@type": "ListItem", position: 3, name: "Hotel Virtual Tours", item: "https://www.x-360.ai/virtual-tours/hotels" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.x-360.ai/virtual-tours/hotels#service",
  name: "Hotel Virtual Tours Saudi Arabia",
  alternateName: ["جولات افتراضية للفنادق", "hotel 360 tour", "resort virtual tour"],
  description: "X360 delivers professional 360° virtual tours for hotels, resorts, and luxury hospitality venues across Saudi Arabia — enabling guests to explore rooms, suites, pools, restaurants, meeting rooms, and event spaces before booking. Used by Hilton, Marriott, IHG, and independent Saudi luxury properties.",
  provider: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai", "@id": "https://www.x-360.ai/#organization" },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Riyadh" },
    { "@type": "City", name: "Jeddah" },
    { "@type": "City", name: "Mecca" },
  ],
  serviceType: "Hospitality Virtual Tour",
  url: "https://www.x-360.ai/virtual-tours/hotels",
  availableLanguage: ["en", "ar"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a hotel virtual tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hotel virtual tour is an immersive 360° digital experience that lets prospective guests, corporate travel managers, and event planners explore a hotel's rooms, suites, F&B outlets, pool areas, meeting rooms, and event spaces online — as if walking through in person. Hotel virtual tours increase direct bookings, reduce pre-arrival inquiries, and help corporate clients make accommodation decisions without visiting.",
      },
    },
    {
      "@type": "Question",
      name: "Who provides hotel virtual tours in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X360 is Saudi Arabia's leading hotel virtual tour provider, working with Hilton, Marriott, IHG, Accor, and independent luxury hotels across Riyadh, Jeddah, Mecca, Medina, and the Eastern Province. X360 delivers bilingual Arabic/English hotel tours with 48-hour turnaround.",
      },
    },
    {
      "@type": "Question",
      name: "Can you create a hotel virtual tour before the hotel opens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. X360 specialises in pre-opening hotel virtual tours using digital virtual staging — where unfurnished or under-construction rooms are digitally styled to match the hotel's brand standards. This allows hotels to take advance bookings, present to corporate travel managers, and run pre-opening marketing campaigns months before the physical opening.",
      },
    },
    {
      "@type": "Question",
      name: "How do hotel virtual tours increase bookings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hotels with virtual tours see an average 35–67% increase in direct booking conversion rates. Guests who engage with a virtual tour are 5× more likely to book than those who only view photos. Virtual tours also reduce pre-arrival inquiries, lower cancellation rates, and help corporate clients sign multi-year accommodation agreements without an in-person visit.",
      },
    },
    {
      "@type": "Question",
      name: "Which hotel spaces should be included in a virtual tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A comprehensive hotel virtual tour should cover: all room and suite categories, the lobby and reception, all-day dining and specialty restaurants, pool and spa areas, fitness centre, meeting rooms and event ballrooms, and any signature experience spaces. X360 creates a navigable journey through all public and bookable areas with a chapter-based interface.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a hotel virtual tour take to produce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X360 delivers standard hotel virtual tours within 48 hours of the photography session. A boutique hotel (40–80 rooms) typically takes one photography day. A large resort or city hotel with multiple F&B outlets and meeting venues may require two sessions. The final tour is delivered as an embeddable link, iframe, and QR code.",
      },
    },
    {
      "@type": "Question",
      name: "Are hotel virtual tours available in Arabic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All X360 hotel virtual tours are fully bilingual — the viewer interface, all room descriptions, amenity information, and navigation are available in both Arabic and English. This is essential for Saudi and GCC hotel properties serving both Arabic-speaking guests and international visitors.",
      },
    },
  ],
};

export default function HotelsVTPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HotelsVTClient />
    </>
  );
}
