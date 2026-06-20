import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "AI Solutions Jeddah | X360",
  description: "Custom AI solutions for Jeddah hospitality, retail, logistics, and healthcare sectors.",
  path: "/jeddah-ai-solutions",
  keywords: ["AI solutions Jeddah", "automation Jeddah", "AI Solutions Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Jeddah", ar: "جدة" }}
      service={{ en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" }}
      hero={{
        titleEn: "AI Solutions Jeddah",
        titleAr: "حلول الذكاء الاصطناعي في جدة",
        descEn: "Custom AI solutions for Jeddah hospitality, retail, logistics, and healthcare sectors.",
        descAr: "حلول ذكاء اصطناعي مخصصة لقطاعات الضيافة والتجزئة واللوجستيات والرعاية الصحية في جدة.",
      }}
      bullets={[
        { en: "Hotel and hospitality AI concierge bots", ar: "روبوتات كونسيرج ذكية للفنادق والضيافة" },
        { en: "Retail customer service automation", ar: "أتمتة خدمة عملاء التجزئة" },
        { en: "Healthcare appointment and triage AI", ar: "الذكاء الاصطناعي للمواعيد والفرز الطبي" },
        { en: "Multilingual Arabic and English interfaces", ar: "واجهات متعددة اللغات عربية وإنجليزية" },
      ]}
    />
  );
}
