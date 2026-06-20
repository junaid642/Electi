import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Riyadh | X360",
  description: "X360 builds fast, bilingual, SEO-optimised websites and apps for Riyadh businesses.",
  path: "/riyadh-web-development",
  keywords: ["web development Riyadh", "website design Riyadh", "Web Development Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Riyadh", ar: "الرياض" }}
      service={{ en: "Web Development", ar: "تطوير المواقع" }}
      hero={{
        titleEn: "Web Development Riyadh",
        titleAr: "تطوير المواقع في الرياض",
        descEn: "X360 builds fast, bilingual, SEO-optimised websites and apps for Riyadh businesses.",
        descAr: "X360 تبني مواقع سريعة ومحسّنة لمحركات البحث وتطبيقات لشركات الرياض.",
      }}
      bullets={[
        { en: "Next.js and React for blazing-fast performance", ar: "Next.js وReact لأداء فائق السرعة" },
        { en: "Full Arabic RTL support by default", ar: "دعم كامل للعربية وRTL افتراضياً" },
        { en: "E-commerce with secure Saudi payment gateways", ar: "متاجر إلكترونية مع بوابات دفع سعودية آمنة" },
        { en: "ZATCA phase 2 e-invoicing integration", ar: "تكامل الفوترة الإلكترونية لزاتكا المرحلة الثانية" },
        { en: "Full SEO and Core Web Vitals optimisation", ar: "تحسين SEO ومعايير أداء الويب الأساسية" },
      ]}
    />
  );
}
