import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import FAQClient from "./_client";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — X360 Virtual Tours, AI & Web Development Saudi Arabia",
  description: "إجابات على الأسئلة الشائعة حول خدمات X360: الجولات الافتراضية 360 درجة، تطوير المواقع، حلول الذكاء الاصطناعي، وأنظمة ERP وSAP في المملكة العربية السعودية.",
  path: "/faq",
  keywords: [
    "X360 FAQ",
    "virtual tour questions Saudi Arabia",
    "AI solutions FAQ Riyadh",
    "web development FAQ Saudi Arabia",
    "ERP SAP FAQ Saudi Arabia",
  ],
});

export default function FAQPage() {
  return <FAQClient />;
}
