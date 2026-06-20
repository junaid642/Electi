import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./_client";
import { CASE_STUDIES, getCaseStudy } from "@/lib/caseStudiesData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case Study | X360" };

  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    keywords: cs.keywords,
    alternates: { canonical: `https://www.x-360.ai/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.ogTitle,
      description: cs.ogDescription,
      url: `https://www.x-360.ai/case-studies/${cs.slug}`,
      type: "article",
      images: [{ url: "https://www.x-360.ai/opengraph.jpg", width: 1200, height: 630 }],
      siteName: "X360",
      locale: "en_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: cs.ogTitle,
      description: cs.ogDescription,
      images: ["https://www.x-360.ai/opengraph.jpg"],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x-360.ai/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://www.x-360.ai/case-studies" },
      { "@type": "ListItem", position: 3, name: cs.title, item: `https://www.x-360.ai/case-studies/${cs.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.metaDescription,
    author: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai" },
    publisher: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai", logo: { "@type": "ImageObject", url: "https://www.x-360.ai/x360-logo.png" } },
    url: `https://www.x-360.ai/case-studies/${cs.slug}`,
    image: "https://www.x-360.ai/opengraph.jpg",
    datePublished: `${cs.year}-01-01`,
    keywords: cs.tags.join(", "),
    about: cs.services.map((s) => ({ "@type": "Thing", name: s })),
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: cs.testimonial.quote,
    author: { "@type": "Person", name: cs.testimonial.author, jobTitle: cs.testimonial.role },
    itemReviewed: { "@type": "Organization", name: "X360", url: "https://www.x-360.ai" },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <CaseStudyClient cs={cs} />
    </>
  );
}
