import type { Metadata } from "next";
import INTERNAL_API_BASE from "./apiBase";

interface SeoData {
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
}

export async function fetchPageSeo(page: string): Promise<SeoData | null> {
  try {
    const res = await fetch(
      `${INTERNAL_API_BASE}/api/seo/${encodeURIComponent(page)}`,
      { next: { revalidate: 300 } },
    );
    if (res.ok) return res.json() as Promise<SeoData>;
  } catch {}
  return null;
}

interface PageDefaults {
  title: string;
  description: string;
  keywords: string;
  url: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function buildMetadata(seo: SeoData | null, defaults: PageDefaults): Metadata {
  const title       = seo?.metaTitle       ?? defaults.title;
  const description = seo?.metaDescription ?? defaults.description;
  const keywords    = seo?.keywords        ?? defaults.keywords;
  const ogTitle     = seo?.ogTitle         ?? defaults.ogTitle ?? title;
  const ogDesc      = seo?.ogDescription   ?? defaults.ogDescription ?? description;
  const canonical   = seo?.canonicalUrl    ?? defaults.url;
  const ogImage     = seo?.ogImage         ?? "https://www.x-360.ai/opengraph.jpg";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: { "ar-SA": canonical, "en-SA": canonical },
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "website",
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_SA",
      siteName: "X360",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
  };
}
