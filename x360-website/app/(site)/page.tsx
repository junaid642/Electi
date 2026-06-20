import type { Metadata } from "next";
import HomeClient from "./_client";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("home");
  return buildMetadata(seo, {
    title: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions | X360",
    description: "شركة X360 الرائدة في السعودية تقدم خدمات الجولات الافتراضية 360 درجة، التوأم الرقمي، تطوير المواقع الإلكترونية، حلول الذكاء الاصطناعي وأنظمة ERP وSAP للشركات والمؤسسات في الرياض وجدة وجميع أنحاء المملكة.",
    keywords: "360 Virtual Tours Saudi Arabia, Virtual Tour Company Saudi Arabia, Website Development Saudi Arabia, AI Solutions Saudi Arabia, ERP Solutions Saudi Arabia, SAP Solutions Saudi Arabia, Digital Twin Saudi Arabia",
    url: "https://www.x-360.ai/",
    ogTitle: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions",
    ogDescription: "شركة X360 الرائدة في السعودية: جولات افتراضية 360، توأم رقمي، تطوير مواقع، ذكاء اصطناعي، ERP وSAP.",
  });
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "X360",
  url: "https://www.x-360.ai/",
  logo: "https://www.x-360.ai/x360/logo.png",
  description:
    "X360 is Saudi Arabia's leading provider of 360 Virtual Tours, Web Development, AI Solutions, and ERP/SAP systems for businesses across the Kingdom.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "Riyadh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    "https://www.linkedin.com/company/x360-sa",
    "https://twitter.com/x360_sa",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "X360",
  url: "https://www.x-360.ai/",
  description:
    "360 Virtual Tours, Web Development, AI Solutions and ERP/SAP for Saudi Arabian businesses.",
  inLanguage: ["en", "ar"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.x-360.ai/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <HomeClient />
    </>
  );
}
