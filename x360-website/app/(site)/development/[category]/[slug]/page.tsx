import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, getCategory, getAllServiceParams } from "@/data/webai-categories";
import WebAIServiceClient from "./_client";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const data = getService(category, slug);
  const cat = getCategory(category);
  if (!data || !cat) return {};
  const url = `https://www.x-360.ai/development/${category}/${slug}`;
  return {
    title: `${data.name} | ${cat.name} | X360`,
    description: data.hero.sub,
    alternates: { canonical: url, languages: { "ar-SA": url, "en-SA": url } },
    openGraph: {
      title: `${data.name} | X360`,
      description: data.hero.sub,
      type: "website",
      url,
      images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630, alt: `${data.name} | X360` }],
      locale: "en_SA",
      siteName: "X360",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | X360`,
      description: data.hero.sub,
      images: ["https://www.x-360.ai/opengraph.jpg"],
    },
  };
}

export default async function WebAIServicePage({ params }: Props) {
  const { category, slug } = await params;
  const data = getService(category, slug);
  const cat = getCategory(category);
  if (!data || !cat) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
      { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
      { "@type": "ListItem", position: 3, name: cat.name, item: `https://www.x-360.ai/development/${category}` },
      { "@type": "ListItem", position: 4, name: data.name, item: `https://www.x-360.ai/development/${category}/${slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WebAIServiceClient data={data} category={cat} />
    </>
  );
}
