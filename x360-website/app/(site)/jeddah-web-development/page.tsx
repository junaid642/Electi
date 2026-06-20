import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Jeddah | X360",
  description: "Custom websites, portals, and mobile apps for Jeddah businesses with full Arabic support.",
  path: "/jeddah-web-development",
  keywords: ["web development Jeddah", "website design Jeddah", "Web Development Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Jeddah", ar: "جدة" }}
      service={{ en: "Web Development", ar: "تطوير المواقع" }}
      hero={{
        titleEn: "Web Development Jeddah",
        titleAr: "تطوير المواقع في جدة",
        descEn: "Custom websites, portals, and mobile apps for Jeddah businesses with full Arabic support.",
        descAr: "مواقع وبوابات وتطبيقات مخصصة لشركات جدة بدعم كامل للعربية.",
      }}
      bullets={[
        { en: "Tourism and hospitality web solutions", ar: "حلول ويب للسياحة والضيافة" },
        { en: "Booking and reservation platform development", ar: "تطوير منصات الحجز والاستئجار" },
        { en: "Bilingual corporate websites", ar: "مواقع شركات ثنائية اللغة" },
        { en: "Mobile-first responsive design", ar: "تصميم متجاوب يقدّم الجوال أولاً" },
      ]}
    />
  );
}
