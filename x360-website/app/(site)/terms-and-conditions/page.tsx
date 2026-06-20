import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import TermsClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("terms");
  return buildMetadata(seo, {
    title: "Terms & Conditions | X360 — Virtual Tours & Digital Solutions Saudi Arabia",
    description: "Terms and Conditions for clients engaging X360 (Stoned Tailor) services in Saudi Arabia and GCC countries. Covers payment, delivery, intellectual property, and dispute resolution.",
    keywords: "X360 terms and conditions, service agreement, Saudi Arabia digital services, intellectual property",
    url: "https://www.x-360.ai/terms-and-conditions",
    ogTitle: "Terms & Conditions | X360",
    ogDescription: "Terms and Conditions for clients engaging X360 services across Saudi Arabia and GCC.",
  });
}

export default function TermsPage() {
  return <TermsClient />;
}
