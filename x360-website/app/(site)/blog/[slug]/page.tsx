import type { Metadata } from "next";
import BlogPostClient, { type InitialPost } from "./_client";
import INTERNAL_API_BASE from "@/lib/apiBase";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

interface ApiPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  category: string | null;
  status: string;
  publishedAt: string | null;
  scheduledAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  createdAt: string;
}

async function fetchPost(slug: string): Promise<ApiPost | null> {
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) return res.json() as Promise<ApiPost>;
  } catch {}
  return null;
}

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
  catch { return iso.slice(0, 10); }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/blog?limit=200`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json() as ApiPost[];
      return data.filter((p) => p.status === "published").map((p) => ({ slug: p.slug }));
    }
  } catch {}
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await fetchPost(slug);

  const title       = apiPost?.metaTitle ?? apiPost?.title ?? "X360 Blog";
  const description = apiPost?.metaDescription ?? apiPost?.excerpt ?? "Read the latest insights from the X360 team.";
  const pubDate     = apiPost?.publishedAt ?? "";
  const category    = (apiPost?.category ?? "Industry Insights").split(",")[0]!.trim();
  const canonical   = apiPost?.canonicalUrl ?? `https://www.x-360.ai/blog/${slug}`;

  return {
    title: `${title} | X360 Blog`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | X360 Blog`,
      description,
      type: "article",
      url: canonical,
      images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
      publishedTime: pubDate,
      authors: ["X360 Team"],
      tags: [category, "X360", "Saudi Arabia"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | X360 Blog`,
      description,
      images: ["https://www.x-360.ai/opengraph.jpg"],
    },
  };
}

const blogPostingSchema = (title: string, excerpt: string, date: string, slug: string, category: string, canonical: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description: excerpt,
  author: { "@type": "Organization", name: "X360 Team" },
  publisher: {
    "@type": "Organization",
    name: "X360",
    logo: { "@type": "ImageObject", url: "https://www.x-360.ai/x360-logo.png" },
  },
  datePublished: date,
  url: canonical,
  mainEntityOfPage: canonical,
  articleSection: category,
  inLanguage: "en",
});

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const apiPost = await fetchPost(slug);

  // 404 when the post is not found in the CMS — no hardcoded fallback
  if (!apiPost) notFound();

  const title    = apiPost.title;
  const excerpt  = apiPost.excerpt ?? "";
  const pubDate  = apiPost.publishedAt ?? apiPost.createdAt;
  const category = (apiPost.category ?? "Industry Insights").split(",")[0]!.trim();
  const canonical = apiPost.canonicalUrl ?? `https://www.x-360.ai/blog/${slug}`;

  const post: InitialPost = {
    title,
    slug:       apiPost.slug,
    excerpt,
    content:    apiPost.content ?? "",
    category:   apiPost.category ?? "Industry Insights",
    status:     apiPost.status,
    author:     "X360 Team",
    date:       formatDate(pubDate),
    coverImage: apiPost.coverImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(title, excerpt, pubDate, slug, category, canonical)) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
