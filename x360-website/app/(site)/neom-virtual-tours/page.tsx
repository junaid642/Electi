import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours NEOM | X360",
  description: "Future-ready virtual tours and digital twins for NEOM developments and investor previews.",
  path: "/neom-virtual-tours",
  keywords: ["virtual tours NEOM", "NEOM digital twin", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "NEOM", ar: "نيوم" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours NEOM",
        titleAr: "جولات افتراضية 360 لنيوم",
        descEn: "Future-ready virtual tours and digital twins for NEOM developments and investor previews.",
        descAr: "جولات افتراضية وتوائم رقمية جاهزة للمستقبل لمشاريع نيوم وعروض المستثمرين.",
      }}
      bullets={[
        { en: "Investor-grade 3D virtual walkthroughs", ar: "جولات ثلاثية الأبعاد بمستوى المستثمرين" },
        { en: "Digital twin integration for smart cities", ar: "تكامل التوائم الرقمية للمدن الذكية" },
        { en: "VR-compatible 360 degree experiences", ar: "تجارب 360 درجة للواقع الافتراضي" },
        { en: "International presentation formats", ar: "صيغ عروض تقديمية دولية" },
      ]}
    />
  );
}
