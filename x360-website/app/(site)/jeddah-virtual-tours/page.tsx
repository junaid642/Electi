import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours Jeddah | X360",
  description: "Showcase Jeddah hotels, residences, and venues with X360 immersive virtual tours.",
  path: "/jeddah-virtual-tours",
  keywords: ["virtual tours Jeddah", "360 tour Jeddah", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Jeddah", ar: "جدة" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours Jeddah",
        titleAr: "جولات افتراضية 360 في جدة",
        descEn: "Showcase Jeddah hotels, residences, and venues with X360 immersive virtual tours.",
        descAr: "اعرض فنادق وعقارات ومواقع جدة بجولات X360 الافتراضية الغامرة.",
      }}
      bullets={[
        { en: "Luxury resort and hotel virtual tours", ar: "جولات افتراضية للمنتجعات والفنادق الفاخرة" },
        { en: "Seaside property showcase for international buyers", ar: "عرض العقارات الساحلية للمشترين الدوليين" },
        { en: "Commercial showroom walkthroughs", ar: "جولات استعراضية للمعارض التجارية" },
        { en: "Embed-ready for Airbnb and Booking.com", ar: "جاهز للتضمين في Airbnb وBooking.com" },
      ]}
    />
  );
}
