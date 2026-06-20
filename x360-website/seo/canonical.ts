import { SEO_CONFIG } from "@/config/seo";

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
}

export function getAlternateUrls(path: string) {
  return {
    canonical: getCanonicalUrl(path),
    "x-default": getCanonicalUrl(path),
  };
}
