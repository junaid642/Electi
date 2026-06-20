import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours Riyadh | X360",
  description: "Professional 360 virtual tours for Riyadh real estate, hotels, and commercial spaces.",
  path: "/riyadh-virtual-tours",
  keywords: ["virtual tours Riyadh", "360 tour Riyadh", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Riyadh", ar: "الرياض" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours Riyadh",
        titleAr: "جولات افتراضية 360 في الرياض",
        descEn: "Professional 360 virtual tours for Riyadh real estate, hotels, and commercial spaces.",
        descAr: "جولات افتراضية 360 احترافية لعقارات وفنادق والمساحات التجارية في الرياض.",
      }}
      bullets={[
        { en: "HDR panoramic photography at 8K resolution", ar: "تصوير بانورامي HDR بدقة 8K" },
        { en: "Interactive hotspots and floor plans", ar: "نقاط تفاعلية ومخططات الطوابق" },
        { en: "Google Street View and MLS embed ready", ar: "جاهز للتضمين في Google Street View" },
        { en: "Bilingual Arabic and English interface", ar: "واجهة ثنائية اللغة عربية وإنجليزية" },
        { en: "Delivered within 5 business days", ar: "التسليم خلال 5 أيام عمل" },
      ]}
    />
  );
}
