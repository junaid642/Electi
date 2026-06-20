import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/api/admin/",
          "/_next/",
          "/ceo",
          "/cto",
        ],
      },
    ],
    sitemap: "https://www.x-360.ai/sitemap.xml",
    host: "https://www.x-360.ai",
  };
}
