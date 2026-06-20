import type { Metadata } from "next";
import DigitalTwinsClient from "./_client";

export const metadata: Metadata = {
  title: "Digital Twins Saudi Arabia — 3D Digital Twin Solutions | X360",
  description: "X360 delivers precision digital twin solutions for Saudi Arabia's mega-projects, real estate developments, hospitals, and corporate campuses. Dimensionally accurate 3D models with embedded measurements, facility data, and bilingual AR/EN interface.",
  keywords: "digital twins Saudi Arabia, digital twin Riyadh, digital twin company Saudi, التوأم الرقمي السعودية, 3D digital twin, digital twin real estate Saudi Arabia, NEOM digital twin, Vision 2030 digital twin, digital twin hospital Saudi, digital twin construction Saudi Arabia",
  alternates: { canonical: "https://www.x-360.ai/virtual-tours/digital-twins" },
  openGraph: {
    title: "Digital Twins Saudi Arabia | X360 — Precision 3D Digital Twin Solutions",
    description: "Saudi Arabia's leading digital twin company. Dimensionally accurate 3D models for real estate, hospitals, hotels, and mega-projects — enabling remote due diligence from anywhere in the world.",
    url: "https://www.x-360.ai/virtual-tours/digital-twins",
    type: "website",
    images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
    siteName: "X360",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Twins Saudi Arabia | X360",
    description: "Precision 3D digital twin solutions for Saudi mega-projects, real estate, hospitals, and corporate campuses.",
    images: ["https://www.x-360.ai/opengraph.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/virtual-tours" },
    { "@type": "ListItem", position: 3, name: "Digital Twins", item: "https://www.x-360.ai/virtual-tours/digital-twins" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.x-360.ai/virtual-tours/digital-twins#service",
  name: "Digital Twins Saudi Arabia",
  alternateName: ["التوأم الرقمي", "3D Digital Twin", "Digital Twin Modeling"],
  description: "X360 creates precision digital twins for Saudi Arabia's real estate developments, hospitals, hotels, corporate campuses, and mega-projects. Our digital twins are dimensionally accurate to ±2cm, with embedded measurements, floor plans, and facility data.",
  provider: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai", "@id": "https://www.x-360.ai/#organization" },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Riyadh" },
    { "@type": "City", name: "Jeddah" },
    { "@type": "City", name: "NEOM" },
  ],
  serviceType: "Digital Twin Modeling",
  url: "https://www.x-360.ai/virtual-tours/digital-twins",
  availableLanguage: ["en", "ar"],
  offers: {
    "@type": "Offer",
    description: "Digital twin solutions for real estate, hospitality, healthcare, construction, and government sectors in Saudi Arabia",
    areaServed: "SA",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Digital Twin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A digital twin is a precise, dimensionally accurate 3D virtual replica of a physical space, building, or infrastructure asset. Unlike a standard 360° virtual tour, a digital twin includes embedded measurements accurate to ±2cm, 3D floor plans, facility data layers, and the ability to query specific dimensions — enabling architects, facility managers, and investors to conduct remote due diligence without visiting the physical site.",
      },
    },
    {
      "@type": "Question",
      name: "Who provides Digital Twin solutions in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X360 is Saudi Arabia's leading digital twin provider, delivering precision digital twin models for real estate developers, hospitals, hotels, corporate campuses, and mega-projects across Riyadh, Jeddah, Dammam, NEOM, and all Saudi regions. X360 has completed digital twins for KAFD towers, residential communities, and heritage sites with ±2cm dimensional accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a Digital Twin and a 360° Virtual Tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 360° virtual tour is a photorealistic navigable experience for marketing and presentation purposes. A digital twin is a precision engineering asset — it captures the exact geometry of a space with dimensional accuracy, includes measurable floor plans, facility data layers, and is used for facility management, construction verification, remote due diligence, and BIM integration. X360 provides both, and many projects combine an immersive virtual tour with an underlying digital twin.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries use Digital Twins in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real estate developers use digital twins for off-plan sales and investor presentations. Hotels and hospitality groups use them for pre-opening leasing. Hospitals and healthcare facilities use them for facility management and JCI accreditation. Construction companies use them for progress monitoring and handover verification. Government and Vision 2030 project authorities — including NEOM, Qiddiya, and Diriyah Gate — use digital twins for infrastructure planning and public engagement.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are X360 digital twins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X360 digital twins achieve dimensional accuracy of ±2cm — sufficient for architectural verification, fit-out planning, and MEP coordination. Every measurement in the digital twin is queryable, and 3D floor plans are generated automatically from the scan data.",
      },
    },
    {
      "@type": "Question",
      name: "Can Digital Twins be used for NEOM and Vision 2030 projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. X360 has delivered digital twins for multiple Vision 2030 projects, including heritage sites, corporate campuses, and mixed-use developments. Our bilingual Arabic/English digital twin platform is designed for international investor presentations and government regulatory submissions.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a Digital Twin project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Digital twin timelines depend on facility size and complexity. A single floor of an office building takes 1–2 days to scan and 3–5 days to process. A multi-tower development or hospital complex typically takes 2–4 weeks from scan to delivery. X360 can provide phased delivery for large projects.",
      },
    },
    {
      "@type": "Question",
      name: "Do X360 digital twins support Arabic language?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All X360 digital twin platforms are bilingual Arabic/English — including the viewer interface, measurement labels, hotspot annotations, and all documentation. This is essential for Saudi government submissions, investor materials, and local stakeholder presentations.",
      },
    },
  ],
};

export default function DigitalTwinsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DigitalTwinsClient />
    </>
  );
}
