import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "AI Solutions Riyadh | X360",
  description: "Arabic chatbots, workflow automation, and predictive analytics for Riyadh businesses.",
  path: "/riyadh-ai-solutions",
  keywords: ["AI solutions Riyadh", "Arabic chatbot Riyadh", "AI Solutions Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Riyadh", ar: "الرياض" }}
      service={{ en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" }}
      hero={{
        titleEn: "AI Solutions Riyadh",
        titleAr: "حلول الذكاء الاصطناعي في الرياض",
        descEn: "Arabic chatbots, workflow automation, and predictive analytics for Riyadh businesses.",
        descAr: "روبوتات محادثة عربية وأتمتة سير العمل وتحليلات تنبؤية لشركات الرياض.",
      }}
      bullets={[
        { en: "Arabic and Gulf-dialect AI chatbots for WhatsApp and web", ar: "روبوتات محادثة عربية وخليجية لواتساب والويب" },
        { en: "GPT-4 workflow and document automation", ar: "أتمتة سير العمل والوثائق بـ GPT-4" },
        { en: "Predictive analytics for sales and inventory", ar: "تحليلات تنبؤية للمبيعات والمخزون" },
        { en: "Vision 2030 aligned digital transformation", ar: "تحول رقمي متوافق مع رؤية 2030" },
      ]}
    />
  );
}
