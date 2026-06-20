import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOthersCategory, getAllOthersSlugs } from "@/data/others-categories";
import OthersCategoryClient from "./_client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllOthersSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getOthersCategory(slug);
  if (!data) return {};
  const url = `https://www.x-360.ai/virtual-tours/others/${slug}`;
  return {
    title: `${data.name} Virtual Tours Saudi Arabia | X360`,
    description: `Premium immersive 360° virtual tours for ${data.name} in Saudi Arabia and GCC. ${data.hero.sub}`,
    alternates: { canonical: url, languages: { "ar-SA": url, "en-SA": url } },
    openGraph: {
      title: `${data.name} Virtual Tours | X360`,
      description: data.hero.sub,
      type: "website",
      url,
      images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630, alt: `${data.name} Virtual Tours` }],
      locale: "en_SA",
      siteName: "X360",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} Virtual Tours | X360`,
      description: data.hero.sub,
      images: ["https://www.x-360.ai/opengraph.jpg"],
    },
  };
}

export default async function OthersCategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = getOthersCategory(slug);
  if (!data) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
      { "@type": "ListItem", position: 2, name: "360° Virtual Tours", item: "https://www.x-360.ai/360" },
      { "@type": "ListItem", position: 3, name: "Other Sectors", item: "https://www.x-360.ai/virtual-tours/others" },
      { "@type": "ListItem", position: 4, name: data.name, item: `https://www.x-360.ai/virtual-tours/others/${slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <OthersCategoryClient data={data} />
    </>
  );
}
