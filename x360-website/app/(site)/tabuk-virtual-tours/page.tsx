import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours Tabuk | X360",
  description: "Showcase Tabuk Red Sea resorts, mountain retreats, and NEOM-adjacent real estate.",
  path: "/tabuk-virtual-tours",
  keywords: ["virtual tours Tabuk", "360 tour Tabuk", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Tabuk", ar: "تبوك" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours Tabuk",
        titleAr: "جولات افتراضية 360 في تبوك",
        descEn: "Showcase Tabuk Red Sea resorts, mountain retreats, and NEOM-adjacent real estate.",
        descAr: "اعرض منتجعات البحر الأحمر والملاجئ الجبلية والعقارات القريبة من نيوم في تبوك.",
      }}
      bullets={[
        { en: "Red Sea beach resort virtual tours", ar: "جولات منتجعات شاطئ البحر الأحمر" },
        { en: "Mountain and desert eco-lodge showcases", ar: "عرض المخيمات الجبلية والصحراوية" },
        { en: "Tourism site digital twins", ar: "التوائم الرقمية لمواقع السياحة" },
        { en: "International buyer-ready presentations", ar: "عروض جاهزة للمشترين الدوليين" },
      ]}
    />
  );
}
