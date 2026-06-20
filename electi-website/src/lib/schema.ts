const SITE = "https://electi.sa";

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Electi",
  "alternateName": "إليكتي",
  "url": SITE,
  "logo": { "@type": "ImageObject", "url": `${SITE}/electi-logo.png`, "width": 200, "height": 200 },
  "description": "AI Workforce Infrastructure for Saudi businesses — AI agents, voice agents, sales automation, and enterprise AI solutions.",
  "foundingLocation": { "@type": "Place", "name": "Riyadh, Saudi Arabia" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2413 Ad Damman Road, Ghirnath Dist., Unit No 2414",
    "addressLocality": "Riyadh",
    "postalCode": "13242-7933",
    "addressCountry": "SA",
  },
  "areaServed": ["SA", "AE", "QA", "KW", "BH", "OM"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966502547274",
    "email": "mohammed@electi.sa",
    "contactType": "customer service",
    "availableLanguage": ["English", "Arabic"],
    "areaServed": "SA",
  },
  "sameAs": [
    "https://twitter.com/electi_sa",
    "https://linkedin.com/company/electi",
    "https://instagram.com/electi.sa",
  ],
};

export function makeServiceSchema(opts: {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  url: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": opts.name,
    "alternateName": opts.nameAr,
    "description": opts.description,
    "url": `${SITE}${opts.url}`,
    "provider": { "@type": "Organization", "name": "Electi", "url": SITE },
    "areaServed": [
      { "@type": "City", "name": "Riyadh", "sameAs": "https://www.wikidata.org/wiki/Q3822" },
      { "@type": "City", "name": "Jeddah",  "sameAs": "https://www.wikidata.org/wiki/Q79592" },
      { "@type": "Country", "name": "Saudi Arabia", "sameAs": "https://www.wikidata.org/wiki/Q851" },
    ],
    "availableLanguage": ["English", "Arabic"],
    "inLanguage": ["en", "ar"],
    "keywords": opts.keywords.join(", "),
    "termsOfService": `${SITE}/terms-of-use`,
  };
}

export function makeFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };
}

export function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${SITE}${item.url}`,
    })),
  };
}

export function makeLocalBusinessSchema(city: "riyadh" | "jeddah") {
  const isR = city === "riyadh";
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/${city}`,
    "name": isR ? "Electi — AI Agents Riyadh" : "Electi — AI Agents Jeddah",
    "alternateName": isR ? "إليكتي — وكلاء الذكاء الاصطناعي الرياض" : "إليكتي — وكلاء الذكاء الاصطناعي جدة",
    "description": isR
      ? "Electi provides AI agents, AI voice agents, AI sales agents, and enterprise AI automation to businesses in Riyadh, Saudi Arabia."
      : "Electi provides AI agents, AI voice agents, AI sales agents, and enterprise AI automation to businesses in Jeddah, Saudi Arabia.",
    "url": `${SITE}/${city}`,
    "telephone": "+966502547274",
    "email": "mohammed@electi.sa",
    "priceRange": "$$",
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Bank Transfer, Credit Card, MADA",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isR ? "2413 Ad Damman Road, Ghirnath Dist., Unit No 2414" : "Jeddah",
      "addressLocality": isR ? "Riyadh" : "Jeddah",
      "postalCode": isR ? "13242-7933" : "",
      "addressCountry": "SA",
      "addressRegion": isR ? "Riyadh Region" : "Makkah Region",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": isR ? 24.6748 : 21.5433,
      "longitude": isR ? 46.6929 : 39.1728,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "serviceArea": { "@type": "City", "name": isR ? "Riyadh" : "Jeddah" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Agent Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Agents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Voice Agents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Sales Agents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Customer Support Agents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Workflow Automation" } },
      ],
    },
  };
}

export function makeHowToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": opts.name,
    "description": opts.description,
    "step": opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.name,
      "text": s.text,
    })),
  };
}
