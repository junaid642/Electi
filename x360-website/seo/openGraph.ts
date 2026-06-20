import { SEO_CONFIG } from "@/config/seo";

interface OgOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function buildOpenGraph(opts: OgOptions) {
  return {
    title: opts.title,
    description: opts.description,
    url: `${SEO_CONFIG.siteUrl}${opts.path}`,
    siteName: SEO_CONFIG.siteName,
    type: opts.type ?? "website",
    locale: "en_SA",
    images: [
      {
        url: opts.image ?? SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: opts.title,
      },
    ],
  };
}

export function buildTwitterCard(opts: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? SEO_CONFIG.defaultOgImage],
  };
}
