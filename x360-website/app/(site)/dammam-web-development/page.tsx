import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Dammam | X360",
  description: "Industrial portals, logistics platforms, and corporate websites for Dammam enterprises.",
  path: "/dammam-web-development",
  keywords: ["web development Dammam", "website Dammam", "Web Development Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Dammam", ar: "الدمام" }}
      service={{ en: "Web Development", ar: "تطوير المواقع" }}
      hero={{
        titleEn: "Web Development Dammam",
        titleAr: "تطوير المواقع في الدمام",
        descEn: "Industrial portals, logistics platforms, and corporate websites for Dammam enterprises.",
        descAr: "بوابات صناعية ومنصات لوجستية ومواقع شركات لمؤسسات الدمام.",
      }}
      bullets={[
        { en: "Industrial and logistics web portals", ar: "بوابات الويب الصناعية واللوجستية" },
        { en: "B2B e-commerce and procurement platforms", ar: "منصات B2B للتجارة والمشتريات" },
        { en: "Arabic-first corporate identity websites", ar: "مواقع هوية الشركة بالعربية أولاً" },
        { en: "ERP-integrated web dashboards", ar: "لوحات تحكم ويب متكاملة مع ERP" },
      ]}
    />
  );
}
