import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "AI Solutions for NEOM | X360",
  description: "Next-generation AI engineering for NEOM smart city infrastructure.",
  path: "/neom-ai-solutions",
  keywords: ["AI solutions NEOM", "smart city AI NEOM", "AI Solutions Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "NEOM", ar: "نيوم" }}
      service={{ en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" }}
      hero={{
        titleEn: "AI Solutions for NEOM",
        titleAr: "حلول الذكاء الاصطناعي لنيوم",
        descEn: "Next-generation AI engineering for NEOM smart city infrastructure.",
        descAr: "هندسة الذكاء الاصطناعي من الجيل القادم للبنية التحتية لمدينة نيوم الذكية.",
      }}
      bullets={[
        { en: "Smart city AI orchestration and automation", ar: "تنسيق وأتمتة الذكاء الاصطناعي للمدينة الذكية" },
        { en: "Digital twin AI integration", ar: "تكامل الذكاء الاصطناعي مع التوائم الرقمية" },
        { en: "Autonomous operations and monitoring", ar: "العمليات المستقلة والمراقبة الذكية" },
        { en: "Predictive infrastructure maintenance", ar: "الصيانة التنبؤية للبنية التحتية" },
      ]}
    />
  );
}
