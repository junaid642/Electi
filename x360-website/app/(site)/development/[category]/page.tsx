import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getAllCategorySlugs } from "@/data/webai-categories";
import WebAICategoryClient from "./_client";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const data = getCategory(category);
  if (!data) return {};
  const url = `https://www.x-360.ai/development/${category}`;
  return {
    title: `${data.name} | Web & AI Solutions Saudi Arabia | X360`,
    description: data.sub,
    alternates: { canonical: url, languages: { "ar-SA": url, "en-SA": url } },
    openGraph: {
      title: `${data.name} | X360`,
      description: data.sub,
      type: "website",
      url,
      images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630, alt: `${data.name} | X360` }],
      locale: "en_SA",
      siteName: "X360",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | X360`,
      description: data.sub,
      images: ["https://www.x-360.ai/opengraph.jpg"],
    },
  };
}

export default async function WebAICategoryPage({ params }: Props) {
  const { category } = await params;
  const data = getCategory(category);
  if (!data) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
      { "@type": "ListItem", position: 2, name: "Web & AI", item: "https://www.x-360.ai/web-ai" },
      { "@type": "ListItem", position: 3, name: data.name, item: `https://www.x-360.ai/development/${category}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <WebAICategoryClient data={data} />
    </>
  );
}
