import type { Metadata } from "next";
import { buildMetadata } from "@/seo/metadata";
import CityLandingPage from "@/components/templates/CityLandingPage";

export const metadata: Metadata = buildMetadata({
  title: "360 Virtual Tours AlUla | X360",
  description: "Bring AlUla UNESCO heritage, luxury desert resorts, and Nabataean sites to global audiences.",
  path: "/alula-virtual-tours",
  keywords: ["virtual tours AlUla", "AlUla heritage virtual tour", "360 Virtual Tours Saudi Arabia"],
});

export default function Page() {
  return (
    <CityLandingPage
      city={{ en: "AlUla", ar: "العلا" }}
      service={{ en: "360 Virtual Tours", ar: "الجولات الافتراضية 360" }}
      hero={{
        titleEn: "360 Virtual Tours AlUla",
        titleAr: "جولات افتراضية 360 في العلا",
        descEn: "Bring AlUla UNESCO heritage, luxury desert resorts, and Nabataean sites to global audiences.",
        descAr: "قدّم تراث العلا اليونسكو ومنتجعاتها الصحراوية والمواقع النبطية للجمهور العالمي.",
      }}
      bullets={[
        { en: "UNESCO heritage site tour experiences", ar: "تجارب جولات مواقع التراث اليونسكو" },
        { en: "Luxury desert resort immersive walkthroughs", ar: "جولات غامرة للمنتجعات الصحراوية" },
        { en: "Tourism authority compatible formats", ar: "صيغ متوافقة مع هيئات السياحة" },
        { en: "Multi-language tour interfaces", ar: "واجهات جولة متعددة اللغات" },
      ]}
    />
  );
}
