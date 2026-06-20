import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata } from "@/lib/fetchSeoMeta";
import PrivacyClient from "./_client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("privacy-policy");
  return buildMetadata(seo, {
    title: "Privacy Policy | X360",
    description: "Read X360's Privacy Policy to understand how we collect, use, and protect your personal data when you engage our 360 virtual tour and web development services.",
    keywords: "X360 privacy policy, data protection, PDPL Saudi Arabia, personal data X360",
    url: "https://www.x-360.ai/privacy-policy",
    ogTitle: "Privacy Policy | X360",
    ogDescription: "X360 is committed to protecting your privacy. Learn how we handle your data responsibly.",
  });
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}
