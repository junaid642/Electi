import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours Al Khobar | X360",
  description: "Professional virtual tours for Al Khobar properties, corporate offices, and hotels.",
  path: "/khobar-virtual-tours",
  keywords: ["virtual tours Al Khobar", "360 tour Khobar", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Al-Khobar", ar: "الخبر" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours Al Khobar",
        titleAr: "جولات افتراضية 360 في الخبر",
        descEn: "Professional virtual tours for Al Khobar properties, corporate offices, and hotels.",
        descAr: "جولات افتراضية احترافية لعقارات ومكاتب وفنادق الخبر.",
      }}
      bullets={[
        { en: "Waterfront and marina property tours", ar: "جولات عقارات الواجهة البحرية والمرسى" },
        { en: "Corporate office walkthroughs", ar: "جولات المكاتب والمقرات" },
        { en: "Hotel and resort showcase", ar: "عرض الفنادق والمنتجعات" },
        { en: "Full bilingual AR/EN interface", ar: "واجهة ثنائية اللغة عربية وإنجليزية" },
      ]}
    />
  );
}
