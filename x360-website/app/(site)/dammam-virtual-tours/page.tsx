import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours Dammam | X360",
  description: "Immersive 360 virtual tours for Dammam and the Eastern Province.",
  path: "/dammam-virtual-tours",
  keywords: ["virtual tours Dammam", "360 tour Dammam", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Dammam", ar: "الدمام" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours Dammam",
        titleAr: "جولات افتراضية 360 في الدمام",
        descEn: "Immersive 360 virtual tours for Dammam and the Eastern Province.",
        descAr: "جولات افتراضية غامرة للدمام والمنطقة الشرقية.",
      }}
      bullets={[
        { en: "Industrial facility and plant walkthroughs", ar: "جولات للمنشآت والمصانع الصناعية" },
        { en: "Residential complex showcase", ar: "عرض المجمعات السكنية" },
        { en: "Commercial mall and retail tours", ar: "جولات المراكز التجارية والمتاجر" },
        { en: "Delivered in 5 business days", ar: "التسليم خلال 5 أيام عمل" },
      ]}
    />
  );
}
