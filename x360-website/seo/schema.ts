import { SEO_CONFIG } from "@/config/seo";

const BASE = SEO_CONFIG.siteUrl;

// ─── KNOWLEDGE GRAPH ENTITY — X360 ───────────────────────────────────────────
// Core entity schema for AI Overview / LLM extraction.
// Explicitly links Company → Services → Locations → Industries.

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${BASE}/#organization`,
  name: "X360",
  alternateName: ["إكس 360", "X360 Saudi Arabia", "X360 KSA", "إكس 360 السعودية"],
  legalName: "X360 Technology Company",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/x360-logo.png`,
    width: 256,
    height: 256,
  },
  image: `${BASE}/opengraph.jpg`,
  description:
    "X360 is Saudi Arabia's leading provider of 360° virtual tours, digital twins, hotel virtual tours, hospital virtual tours, real estate virtual tours, AI solutions, website development, ERP and SAP services — serving hospitality, real estate, healthcare, construction, government and education sectors across Riyadh, Jeddah, Dammam and all Saudi regions.",
  foundingDate: "2020",
  slogan: "Saudi Arabia's Digital Experience Company",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Riyadh",
    addressLocality: "Riyadh",
    addressRegion: "Riyadh Province",
    postalCode: "11564",
    addressCountry: "SA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SEO_CONFIG.contact.phone,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["en", "ar"],
    },
    {
      "@type": "ContactPoint",
      email: SEO_CONFIG.contact.email,
      contactType: "sales",
      areaServed: "SA",
      availableLanguage: ["en", "ar"],
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Riyadh", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Jeddah", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Dammam", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Khobar", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "NEOM", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "AlUla", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Mecca", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Medina", containedIn: "Saudi Arabia" },
    { "@type": "City", name: "Tabuk", containedIn: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Bahrain" },
  ],
  // ── OfferCatalog: all services as structured entities ──────────────────────
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "X360 Digital Services — Saudi Arabia",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/virtual-tours#service`,
          name: "360° Virtual Tours",
          alternateName: ["جولات افتراضية 360 درجة", "360 virtual tours Saudi Arabia", "immersive virtual tours"],
          description: "Professional 360° virtual tours using 8K HDR panoramic photography for real estate developers, hotels, hospitals, retail spaces, and corporate offices across Saudi Arabia. Bilingual Arabic/English, delivered within 48 hours.",
          serviceType: "Virtual Tour Photography",
          url: `${BASE}/virtual-tours`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          availableLanguage: ["en", "ar"],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/virtual-tours/digital-twins#service`,
          name: "Digital Twins",
          alternateName: ["التوأم الرقمي", "digital twin Saudi Arabia", "3D digital twin"],
          description: "Dimensionally accurate digital twin models (±2cm) with embedded measurements, 3D floor plans, and facility data — enabling remote due diligence, facility management, and investor presentations for Saudi properties.",
          serviceType: "Digital Twin Modeling",
          url: `${BASE}/virtual-tours/digital-twins`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/virtual-tours/hotels#service`,
          name: "Hotel Virtual Tours",
          alternateName: ["جولات افتراضية للفنادق", "hotel 360 tour Saudi Arabia"],
          description: "360° virtual tours for hotels, resorts, and luxury hospitality venues in Saudi Arabia — pre-opening staging, F&B tours, suite showcases, meeting room presentations. Used by Hilton, Marriott, IHG, and independent Saudi luxury properties.",
          serviceType: "Hospitality Virtual Tour",
          url: `${BASE}/virtual-tours/hotels`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          availableLanguage: ["en", "ar"],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/virtual-tours/hospitals#service`,
          name: "Hospital & Healthcare Virtual Tours",
          alternateName: ["جولات افتراضية للمستشفيات", "hospital virtual tour Saudi Arabia", "medical facility 360 tour"],
          description: "360° virtual tours for hospitals, medical cities, clinics, and healthcare facilities in Saudi Arabia — for patient orientation, specialist recruitment, JCI/CBAHI accreditation presentations, and international investor review.",
          serviceType: "Healthcare Virtual Tour",
          url: `${BASE}/virtual-tours/hospitals`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/virtual-tours/real-estate#service`,
          name: "Real Estate Virtual Tours",
          alternateName: ["جولات افتراضية للعقارات", "real estate 360 tour Saudi Arabia", "property virtual tour"],
          description: "Immersive 360° virtual tours for Saudi real estate developers — villas, apartments, off-plan projects, commercial towers, and mixed-use developments. Integrates with Bayut, PropertyFinder, and Aqar portals.",
          serviceType: "Real Estate Virtual Tour",
          url: `${BASE}/virtual-tours/real-estate`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/website-development/riyadh#service`,
          name: "Website Development",
          alternateName: ["تطوير المواقع الإلكترونية", "web development Saudi Arabia", "تطوير مواقع الرياض"],
          description: "Full-stack bilingual Arabic/English website development for Saudi businesses — corporate sites, e-commerce, patient portals, real estate portals, booking platforms, and government systems with ZATCA compliance.",
          serviceType: "Web Development",
          url: `${BASE}/website-development/riyadh`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          availableLanguage: ["en", "ar"],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/ai-solutions/riyadh#service`,
          name: "AI Solutions",
          alternateName: ["حلول الذكاء الاصطناعي", "AI Saudi Arabia", "artificial intelligence Saudi Arabia"],
          description: "Arabic and English AI chatbots, workflow automation, computer vision, predictive analytics, and custom LLM integrations for Saudi businesses — trained on Gulf Arabic and Modern Standard Arabic.",
          serviceType: "Artificial Intelligence Solutions",
          url: `${BASE}/ai-solutions/riyadh`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          availableLanguage: ["en", "ar"],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE}/erp-sap/riyadh#service`,
          name: "ERP & SAP Solutions",
          alternateName: ["أنظمة ERP وSAP", "SAP Saudi Arabia", "ERP implementation Saudi"],
          description: "SAP S/4HANA, SAP Business One, and custom ERP implementation with ZATCA e-invoicing Phase 2 compliance, GOSI/Qiwa integration, and full Arabic localisation for Saudi enterprises.",
          serviceType: "ERP Implementation",
          url: `${BASE}/erp-sap/riyadh`,
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
    ],
  },
  // ── Industries served — explicit for AI entity extraction ──────────────────
  audience: [
    { "@type": "BusinessAudience", audienceType: "Real Estate Developers", name: "Real Estate & Property Development" },
    { "@type": "BusinessAudience", audienceType: "Hospitality", name: "Hotels, Resorts & Hospitality" },
    { "@type": "BusinessAudience", audienceType: "Healthcare", name: "Hospitals, Clinics & Medical Cities" },
    { "@type": "BusinessAudience", audienceType: "Construction", name: "Construction & Engineering Firms" },
    { "@type": "BusinessAudience", audienceType: "Government", name: "Government & Vision 2030 Projects" },
    { "@type": "BusinessAudience", audienceType: "Education", name: "Universities & Educational Institutions" },
    { "@type": "BusinessAudience", audienceType: "Retail", name: "Retail, F&B & Entertainment" },
    { "@type": "BusinessAudience", audienceType: "Corporate", name: "Corporate & Financial Services" },
  ],
  // ── Topical expertise — comprehensive for AI systems ──────────────────────
  knowsAbout: [
    "360 Virtual Tours Saudi Arabia",
    "Virtual Tours Riyadh",
    "Virtual Tours Jeddah",
    "Hotel Virtual Tours Saudi Arabia",
    "Hospital Virtual Tours Saudi Arabia",
    "Real Estate Virtual Tours Saudi Arabia",
    "Digital Twins Saudi Arabia",
    "Website Development Saudi Arabia",
    "AI Solutions Saudi Arabia",
    "ERP SAP Saudi Arabia",
    "جولات افتراضية 360 درجة",
    "جولات افتراضية الرياض",
    "جولات افتراضية جدة",
    "جولات افتراضية للفنادق السعودية",
    "جولات افتراضية للمستشفيات",
    "التوأم الرقمي السعودية",
    "تطوير مواقع إلكترونية السعودية",
    "حلول الذكاء الاصطناعي السعودية",
    "Virtual Staging Saudi Arabia",
    "Google Street View Saudi Arabia",
    "Vision 2030 Digital Transformation",
    "8K HDR Panoramic Photography",
    "ZATCA ERP Compliance",
    "Arabic AI Chatbots",
    "Bilingual Web Development Saudi Arabia",
    "NEOM Digital Twin",
    "KAFD Virtual Tour",
    "Diriyah Digital Experience",
    "Saudi Real Estate Digital Marketing",
    "Pre-opening Hotel Virtual Tour",
    "JCI Accreditation Virtual Tour",
  ],
  sameAs: [
    SEO_CONFIG.social.twitter,
    SEO_CONFIG.social.instagram,
    SEO_CONFIG.social.linkedin,
    SEO_CONFIG.social.youtube,
  ],
};

// ─── LOCAL BUSINESS ───────────────────────────────────────────────────────────
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/#localbusiness`,
  name: "X360 Saudi Arabia",
  url: BASE,
  image: `${BASE}/opengraph.jpg`,
  description:
    "X360 provides 360° virtual tours, digital twins, hotel virtual tours, hospital virtual tours, real estate virtual tours, AI solutions, website development, ERP and SAP services across Saudi Arabia.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Riyadh",
    addressLocality: "Riyadh",
    addressRegion: "Riyadh Province",
    postalCode: "11564",
    addressCountry: "SA",
  },
  telephone: SEO_CONFIG.contact.phone,
  email: SEO_CONFIG.contact.email,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Riyadh", "Jeddah", "Dammam", "Khobar", "Tabuk", "AlUla", "NEOM",
    "Yanbu", "Abha", "Medina", "Mecca", "Jubail", "Dhahran", "Khamis Mushait",
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
  },
};

// ─── WEBSITE ──────────────────────────────────────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: "X360",
  url: BASE,
  inLanguage: ["en", "ar"],
  description: "Saudi Arabia's leading digital experience company — 360° virtual tours, digital twins, hotel & hospital virtual tours, AI solutions, website development, ERP and SAP.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── SCHEMA HELPERS ───────────────────────────────────────────────────────────
export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "X360",
      url: BASE,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    url: `${BASE}${url}`,
    availableLanguage: ["en", "ar"],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.url}`,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${BASE}${opts.url}`,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Person", name: opts.authorName },
    publisher: {
      "@type": "Organization",
      name: "X360",
      logo: { "@type": "ImageObject", url: `${BASE}/x360-logo.png` },
    },
  };
}

export function videoSchema(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    publisher: { "@type": "Organization", name: "X360", url: BASE },
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.embedUrl ? { embedUrl: opts.embedUrl } : {}),
  };
}

export const GLOBAL_SCHEMAS = [organizationSchema, localBusinessSchema, websiteSchema];
