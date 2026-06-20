import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "ERP Solutions Riyadh | X360",
  description: "SAP, Odoo, and Dynamics ERP with ZATCA e-invoicing compliance for Riyadh enterprises.",
  path: "/riyadh-erp-solutions",
  keywords: ["ERP solutions Riyadh", "SAP Riyadh", "ERP Solutions Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "Riyadh", ar: "الرياض" }}
      service={{ en: "ERP Solutions", ar: "حلول ERP" }}
      hero={{
        titleEn: "ERP Solutions Riyadh",
        titleAr: "حلول ERP في الرياض",
        descEn: "SAP, Odoo, and Dynamics ERP with ZATCA e-invoicing compliance for Riyadh enterprises.",
        descAr: "أنظمة ERP من SAP وOdoo وDynamics مع امتثال زاتكا للفوترة الإلكترونية لمؤسسات الرياض.",
      }}
      bullets={[
        { en: "SAP S/4HANA and SAP Business One implementation", ar: "تطبيق SAP S/4HANA وSAP Business One" },
        { en: "Odoo ERP customisation for Saudi businesses", ar: "تخصيص Odoo ERP للشركات السعودية" },
        { en: "ZATCA phase 2 e-invoicing integration", ar: "تكامل الفوترة الإلكترونية لزاتكا المرحلة الثانية" },
        { en: "GOSI, Muqeem, and Qiwa HR integrations", ar: "تكاملات GOSI وموقيم وقوى للموارد البشرية" },
        { en: "Post go-live support and training", ar: "دعم وتدريب ما بعد الإطلاق" },
      ]}
    />
  );
}
