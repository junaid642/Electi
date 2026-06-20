import type { Metadata } from "next";
import HospitalsVTClient from "./_client";

export const metadata: Metadata = {
  title: "Hospital Virtual Tours Saudi Arabia — 360° Healthcare Facility Tours | X360",
  description: "X360 creates professional 360° virtual tours for hospitals, medical cities, and healthcare facilities across Saudi Arabia. Patient wayfinding, staff recruitment, JCI accreditation, and investor presentations — bilingual Arabic/English.",
  keywords: "hospital virtual tours Saudi Arabia, healthcare virtual tour Riyadh, medical facility 360 tour, hospital 360 tour Saudi, جولات افتراضية للمستشفيات السعودية, King Fahad Medical City virtual tour, patient virtual tour hospital, JCI accreditation virtual tour",
  alternates: { canonical: "https://www.x-360.ai/virtual-tours/hospitals" },
  openGraph: {
    title: "Hospital Virtual Tours Saudi Arabia | X360 — 360° Healthcare Tours",
    description: "Saudi Arabia's leading healthcare virtual tour provider. 360° tours for hospitals, clinics, and medical cities — for patient orientation, staff recruitment, and JCI accreditation presentations.",
    url: "https://www.x-360.ai/virtual-tours/hospitals",
    type: "website",
    images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
    siteName: "X360",
    locale: "en_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Virtual Tours Saudi Arabia | X360",
    description: "360° virtual tours for hospitals and healthcare facilities in Saudi Arabia — patient orientation, recruitment, and accreditation.",
    images: ["https://www.x-360.ai/opengraph.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
    { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/virtual-tours" },
    { "@type": "ListItem", position: 3, name: "Hospital Virtual Tours", item: "https://www.x-360.ai/virtual-tours/hospitals" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.x-360.ai/virtual-tours/hospitals#service",
  name: "Hospital Virtual Tours Saudi Arabia",
  alternateName: ["جولات افتراضية للمستشفيات", "healthcare virtual tour", "medical facility 360 tour"],
  description: "X360 delivers 360° virtual tours for hospitals, medical cities, clinics, and healthcare facilities across Saudi Arabia — used for patient orientation, specialist recruitment, JCI and CBAHI accreditation presentations, and international investor reviews.",
  provider: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai", "@id": "https://www.x-360.ai/#organization" },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Riyadh" },
    { "@type": "City", name: "Jeddah" },
    { "@type": "City", name: "Dammam" },
  ],
  serviceType: "Healthcare Virtual Tour",
  url: "https://www.x-360.ai/virtual-tours/hospitals",
  availableLanguage: ["en", "ar"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a hospital virtual tour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hospital virtual tour is a 360° digital walkthrough of a healthcare facility — covering patient reception areas, wards, operating theatres (where permitted), specialist clinics, ICU, diagnostic imaging centres, pharmacies, and waiting areas. Hospital virtual tours are used for patient orientation before admission, staff and specialist recruitment, JCI and CBAHI accreditation presentations, and international investor reviews.",
      },
    },
    {
      "@type": "Question",
      name: "Who provides hospital virtual tours in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X360 is Saudi Arabia's leading healthcare virtual tour provider, working with major hospital networks including King Fahad Medical City, Saudi German Hospital Group, National Guard Health Affairs, and private clinic chains. X360 delivers bilingual Arabic/English hospital tours compliant with Saudi MOH photography guidelines.",
      },
    },
    {
      "@type": "Question",
      name: "How do hospitals use 360° virtual tours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saudi hospitals and healthcare facilities use 360° virtual tours in five main ways: (1) Patient orientation — reducing anxiety by letting patients virtually visit the facility before their appointment; (2) Specialist recruitment — showing international doctors the facility and accommodation before relocation; (3) JCI/CBAHI accreditation — providing accreditation surveyors with remote facility documentation; (4) Investor presentations — for private hospital groups seeking capital investment; (5) MOH and government licensing — demonstrating facility standards digitally.",
      },
    },
    {
      "@type": "Question",
      name: "Are hospital virtual tours MOH compliant in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. X360 produces all healthcare facility virtual tours in compliance with Saudi Ministry of Health (MOH) photography guidelines — excluding any patient-identifiable areas and following strict protocols for operating theatre, ICU, and clinical area documentation. All photography sessions require and receive prior facility management approval.",
      },
    },
    {
      "@type": "Question",
      name: "Can virtual tours help recruit international doctors to Saudi hospitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Saudi hospitals lose significant time and cost when international specialists travel for site visits that lead to declined offers. A comprehensive virtual tour of the hospital, accommodation, and surrounding city allows candidates to make informed decisions before the first interview — dramatically reducing the cost-per-hire and improving recruitment conversion rates.",
      },
    },
    {
      "@type": "Question",
      name: "Do hospital virtual tours support Arabic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All X360 healthcare virtual tours are fully bilingual Arabic/English. Arabic patient orientation tours include accessible navigation for non-English-speaking patients across all Saudi regions. Medical staff tours are available in both languages with clinical terminology correctly used.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a hospital virtual tour cost in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hospital virtual tour pricing in Saudi Arabia depends on facility size, the number of panoramic nodes required, and whether the tour requires clinical area compliance protocols. A specialist clinic or day surgery centre starts from SAR 4,000. A large medical city or multi-building hospital complex is quoted on a per-project basis. Contact X360 for a facility-specific proposal within 24 hours.",
      },
    },
  ],
};

export default function HospitalsVTPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HospitalsVTClient />
    </>
  );
}
