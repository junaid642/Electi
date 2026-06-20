import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "SAP Solutions Jeddah | X360",
  description: "Certified SAP partner in Jeddah — S/4HANA, Business One, SuccessFactors, ZATCA compliance.",
  path: "/jeddah-sap-solutions",
  keywords: ["SAP solutions Jeddah", "SAP implementation Jeddah", "SAP Solutions Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Jeddah", ar: "جدة" }}
      service={{ en: "SAP Solutions", ar: "حلول SAP" }}
      hero={{
        titleEn: "SAP Solutions Jeddah",
        titleAr: "حلول SAP في جدة",
        descEn: "Certified SAP partner in Jeddah — S/4HANA, Business One, SuccessFactors, ZATCA compliance.",
        descAr: "شريك SAP معتمد في جدة يقدم S/4HANA وBusiness One وSuccessFactors مع امتثال زاتكا.",
      }}
      bullets={[
        { en: "SAP S/4HANA full-cycle implementation", ar: "تطبيق دورة كاملة لـ SAP S/4HANA" },
        { en: "SAP SuccessFactors HR and payroll", ar: "SAP SuccessFactors للموارد البشرية والرواتب" },
        { en: "ZATCA phase 2 e-invoicing compliance", ar: "الامتثال للفوترة الإلكترونية لزاتكا المرحلة الثانية" },
        { en: "Legacy system migration and data cleansing", ar: "هجرة الأنظمة القديمة وتنقية البيانات" },
        { en: "24/7 Arabic post-go-live support", ar: "دعم عربي على مدار الساعة بعد الإطلاق" },
      ]}
    />
  );
}
