import type { MetadataRoute } from "next";
import { SEED_POSTS } from "./(site)/blog/_data";
import { getAllIndustrySlugs } from "@/data/tour-industries";
import { getAllCategorySlugs, getAllServiceParams } from "@/data/webai-categories";
import { CASE_STUDIES } from "@/lib/caseStudiesData";
import INTERNAL_API_BASE from "@/lib/apiBase";

// ─── Arabic / English paired city-service pages ───────────────────────────────
const AR_EN_PAIRS: Array<{ en: string; ar: string; priority: number }> = [
  { en: "/virtual-tours/riyadh",       ar: "/ar/virtual-tours/riyadh",       priority: 0.90 },
  { en: "/virtual-tours/jeddah",       ar: "/ar/virtual-tours/jeddah",       priority: 0.88 },
  { en: "/virtual-tours/dammam",       ar: "/ar/virtual-tours/dammam",       priority: 0.86 },
  { en: "/virtual-tours/mecca",        ar: "/ar/virtual-tours/mecca",        priority: 0.86 },
  { en: "/website-development/riyadh", ar: "/ar/website-development/riyadh", priority: 0.90 },
  { en: "/website-development/jeddah", ar: "/ar/website-development/jeddah", priority: 0.88 },
  { en: "/ai-solutions/riyadh",        ar: "/ar/ai-solutions/riyadh",        priority: 0.90 },
  { en: "/ai-solutions/jeddah",        ar: "/ar/ai-solutions/jeddah",        priority: 0.88 },
  { en: "/erp-sap/riyadh",             ar: "/ar/erp-sap/riyadh",             priority: 0.90 },
  { en: "/erp-sap/jeddah",             ar: "/ar/erp-sap/jeddah",             priority: 0.88 },
];

function makeAlternates(en: string, ar: string) {
  const BASE = "https://www.x-360.ai";
  return {
    languages: {
      "en-SA": `${BASE}${en}`,
      "ar-SA": `${BASE}${ar}`,
      "x-default": `${BASE}${en}`,
    } as Record<string, string>,
  };
}

const BASE = "https://www.x-360.ai";
const NOW = new Date().toISOString().split("T")[0];
const monthly = "monthly" as const;
const weekly = "weekly" as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    // ── Core ──────────────────────────────────────────────────────────────────
    { url: `${BASE}/`,                    lastModified: NOW, changeFrequency: monthly, priority: 1.0 },
    { url: `${BASE}/virtual-tours`,       lastModified: NOW, changeFrequency: monthly, priority: 0.95 },
    { url: `${BASE}/development`,         lastModified: NOW, changeFrequency: monthly, priority: 0.95 },
    { url: `${BASE}/contact`,             lastModified: NOW, changeFrequency: monthly, priority: 0.85 },
    { url: `${BASE}/about`,               lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/faq`,                 lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/blog`,                lastModified: NOW, changeFrequency: weekly,  priority: 0.80 },
    { url: `${BASE}/portfolio`,           lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/case-studies`,        lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/resources`,           lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/careers`,             lastModified: NOW, changeFrequency: monthly, priority: 0.65 },
    { url: `${BASE}/privacy-policy`,      lastModified: NOW, changeFrequency: monthly, priority: 0.40 },
    { url: `${BASE}/terms-and-conditions`,lastModified: NOW, changeFrequency: monthly, priority: 0.40 },
    // ── Virtual tour specialty pages ──────────────────────────────────────────
    // Note: luxury-private, hospitality, real-estate, others + all development
    // category/service pages are emitted by the dynamic data functions below —
    // do NOT repeat them here to avoid sitemap duplicates.
    { url: `${BASE}/virtual-tours/digital-twins`,     lastModified: NOW, changeFrequency: monthly, priority: 0.85 },
    { url: `${BASE}/virtual-tours/hospitals`,         lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/virtual-tours/hotels`,            lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = getAllIndustrySlugs().map((slug) => ({
    url: `${BASE}/virtual-tours/${slug}`,
    lastModified: NOW,
    changeFrequency: monthly,
    priority: 0.7,
  }));


  const devCategoryRoutes: MetadataRoute.Sitemap = getAllCategorySlugs().map((category) => ({
    url: `${BASE}/development/${category}`,
    lastModified: NOW,
    changeFrequency: monthly,
    priority: 0.75,
  }));

  const devServiceRoutes: MetadataRoute.Sitemap = getAllServiceParams().map(({ category, slug }) => ({
    url: `${BASE}/development/${category}/${slug}`,
    lastModified: NOW,
    changeFrequency: monthly,
    priority: 0.65,
  }));

  const seedBlogSlugs = new Set(
    SEED_POSTS
      .filter((p) => p.status === "published")
      .map((p) => p.slug)
  );

  const seedBlogRoutes: MetadataRoute.Sitemap = SEED_POSTS
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: monthly,
      priority: 0.7,
    }));

  let dbBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/blog?limit=200`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = (await res.json()) as { posts?: { slug: string; date?: string }[] };
      dbBlogRoutes = (data.posts ?? [])
        .filter((p) => !seedBlogSlugs.has(p.slug))
        .map((p) => ({
          url: `${BASE}/blog/${p.slug}`,
          lastModified: p.date ?? NOW,
          changeFrequency: monthly,
          priority: 0.7,
        }));
    }
  } catch {
    // silently skip DB blog posts if API unreachable during static build
  }

  // ── Legacy flat city pages ──────────────────────────────────────────────────
  const legacyCityRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/riyadh-virtual-tours`,   lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/jeddah-virtual-tours`,   lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/dammam-virtual-tours`,   lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/khobar-virtual-tours`,   lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/tabuk-virtual-tours`,    lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/alula-virtual-tours`,    lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/neom-virtual-tours`,     lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/riyadh-web-development`, lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/jeddah-web-development`, lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/dammam-web-development`, lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/riyadh-ai-solutions`,    lastModified: NOW, changeFrequency: monthly, priority: 0.75 },
    { url: `${BASE}/jeddah-ai-solutions`,    lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/neom-ai-solutions`,      lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/riyadh-erp-solutions`,   lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
    { url: `${BASE}/jeddah-sap-solutions`,   lastModified: NOW, changeFrequency: monthly, priority: 0.70 },
  ];

  // ── EN-only structured city pages (no Arabic counterpart yet) ───────────────
  const enOnlyCityRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/virtual-tours/khobar`,       lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/virtual-tours/tabuk`,        lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/virtual-tours/alula`,        lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/virtual-tours/neom`,         lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/virtual-tours/medina`,       lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/website-development/dammam`, lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/website-development/khobar`, lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/website-development/neom`,   lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/ai-solutions/dammam`,        lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/ai-solutions/khobar`,        lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/ai-solutions/neom`,          lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
    { url: `${BASE}/erp-sap/dammam`,             lastModified: NOW, changeFrequency: monthly, priority: 0.82 },
    { url: `${BASE}/erp-sap/khobar`,             lastModified: NOW, changeFrequency: monthly, priority: 0.80 },
  ];

  // ── Individual case study pages ──────────────────────────────────────────────
  const backlinkAssetRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  // ── EN+AR paired pages — with hreflang alternates in sitemap ────────────────
  const pairedEnRoutes: MetadataRoute.Sitemap = AR_EN_PAIRS.map(({ en, ar, priority }) => ({
    url: `${BASE}${en}`,
    lastModified: NOW,
    changeFrequency: monthly,
    priority,
    alternates: makeAlternates(en, ar),
  }));

  // ── Arabic city-service pages — with hreflang alternates in sitemap ─────────
  const arRoutes: MetadataRoute.Sitemap = AR_EN_PAIRS.map(({ en, ar, priority }) => ({
    url: `${BASE}${ar}`,
    lastModified: NOW,
    changeFrequency: monthly,
    priority: +(priority + 0.02).toFixed(2),
    alternates: makeAlternates(en, ar),
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...devCategoryRoutes,
    ...devServiceRoutes,
    ...seedBlogRoutes,
    ...dbBlogRoutes,
    ...legacyCityRoutes,
    ...enOnlyCityRoutes,
    ...backlinkAssetRoutes,
    ...pairedEnRoutes,
    ...arRoutes,
  ];
}
