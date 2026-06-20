import type { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { buildOpenGraph, buildTwitterCard } from "./openGraph";
import { getCanonicalUrl } from "./canonical";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function buildMetadata(input: PageMetaInput): Metadata {
  const canonical = getCanonicalUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords?.join(", "),
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: buildOpenGraph({
      title: input.title,
      description: input.description,
      path: input.path,
      image: input.image,
      type: input.type,
    }),
    twitter: buildTwitterCard({
      title: input.title,
      description: input.description,
      image: input.image,
    }),
  };
}

export const PAGE_META = {
  home: buildMetadata({
    title: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions | X360",
    description: "شركة X360 الرائدة في السعودية تقدم خدمات الجولات الافتراضية 360 درجة، التوأم الرقمي، تطوير المواقع الإلكترونية، حلول الذكاء الاصطناعي وأنظمة ERP وSAP للشركات والمؤسسات في الرياض وجدة وجميع أنحاء المملكة.",
    path: "/",
    keywords: ["360 Virtual Tours Saudi Arabia", "Virtual Tour Company Saudi Arabia", "Website Development Saudi Arabia", "AI Solutions Saudi Arabia", "ERP Solutions Saudi Arabia", "SAP Solutions Saudi Arabia", "Digital Twin Saudi Arabia"],
  }),
  about: buildMetadata({
    title: "About X360 — Leading Virtual Tour & AI Company Saudi Arabia",
    description: "تعرّف على X360، الشركة الرائدة في مجال الجولات الافتراضية والذكاء الاصطناعي وتطوير المواقع في المملكة العربية السعودية. فريقنا ملتزم بتحويل الأعمال رقمياً.",
    path: "/about",
    keywords: ["X360 company Saudi Arabia", "about X360 Riyadh", "virtual tour company Saudi Arabia"],
  }),
  contact: buildMetadata({
    title: "Contact X360 — Virtual Tours & AI Solutions Saudi Arabia",
    description: "تواصل مع X360 للحصول على جولات افتراضية وحلول ذكاء اصطناعي وتطوير مواقع في الرياض وجدة والدمام والمملكة العربية السعودية.",
    path: "/contact",
    keywords: ["contact X360 Saudi Arabia", "X360 Riyadh office", "virtual tour quote Saudi Arabia"],
  }),
  faq: buildMetadata({
    title: "FAQ — X360 Virtual Tours, AI & Web Development Saudi Arabia",
    description: "إجابات على الأسئلة الشائعة حول خدمات الجولات الافتراضية وتطوير المواقع والذكاء الاصطناعي وأنظمة ERP وSAP من شركة X360 في المملكة العربية السعودية.",
    path: "/faq",
    keywords: ["X360 FAQ", "virtual tour questions Saudi Arabia", "AI solutions FAQ Riyadh", "ERP SAP FAQ Saudi Arabia"],
  }),
  virtualTours: buildMetadata({
    title: "360 Virtual Tours Saudi Arabia | Real Estate, Hotels & Digital Twins | X360",
    description: "شركة X360 من أبرز مزودي خدمات الجولات الافتراضية 360 درجة والتوأم الرقمي في السعودية للعقارات والفنادق والمطاعم والمشاريع الحكومية والإنشائية، مع تغطية شاملة لجميع مناطق المملكة.",
    path: "/virtual-tours",
    keywords: ["360 Virtual Tours Saudi Arabia", "Virtual Tour Company Riyadh", "Real Estate Virtual Tours Saudi Arabia", "Hotel Virtual Tours Saudi Arabia", "Construction Virtual Tours Saudi Arabia", "Digital Twin Saudi Arabia", "Google Street View Saudi Arabia"],
  }),
  development: buildMetadata({
    title: "Website Development Saudi Arabia | AI, ERP & SAP Solutions | X360",
    description: "تقدم X360 خدمات تطوير المواقع الإلكترونية والمتاجر الرقمية وحلول الذكاء الاصطناعي وأنظمة ERP وSAP للشركات في المملكة العربية السعودية مع تصميمات احترافية وتقنيات متقدمة.",
    path: "/development",
    keywords: ["Website Development Saudi Arabia", "Web Design Riyadh", "AI Solutions Saudi Arabia", "ERP Solutions Saudi Arabia", "SAP Implementation Saudi Arabia", "Business Automation Saudi Arabia"],
  }),
  blog: buildMetadata({
    title: "Blog — Digital Transformation & Virtual Tours Saudi Arabia | X360",
    description: "اقرأ أحدث مقالات X360 حول الجولات الافتراضية والذكاء الاصطناعي وتطوير المواقع والتحول الرقمي في المملكة العربية السعودية.",
    path: "/blog",
    keywords: ["virtual tours blog Saudi Arabia", "AI blog Riyadh", "digital transformation KSA"],
  }),
  careers: buildMetadata({
    title: "Careers at X360 — Join Saudi Arabia's Leading AI & Virtual Tour Company",
    description: "انضم إلى فريق X360 وكن جزءاً من شركة الجولات الافتراضية والذكاء الاصطناعي الرائدة في المملكة العربية السعودية. وظائف شاغرة في الرياض وما حولها.",
    path: "/careers",
    keywords: ["X360 careers Saudi Arabia", "jobs Riyadh AI company", "virtual tour jobs KSA"],
  }),
};
