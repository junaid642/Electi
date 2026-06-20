import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

const SITE_URL = "https://electi.sa";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  schemas?: object[];
  keywords?: string;
  keywordsAr?: string;
}

interface SeoOverride {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
}

const EN_TITLE    = "Electi | AI Agents for Saudi Businesses";
const AR_TITLE    = "إليكتي | وكلاء الذكاء الاصطناعي للشركات السعودية";
const EN_DESC     = "Electi delivers AI agents, AI voice agents, AI sales agents, and enterprise AI automation for Saudi businesses. Bilingual Arabic & English. Based in Riyadh, KSA.";
const AR_DESC     = "تقدم إليكتي وكلاء ذكاء اصطناعي ووكلاء صوتيين ووكلاء مبيعات وأتمتة مؤسسية للشركات السعودية. ثنائي اللغة عربي وإنجليزي. مقرها الرياض، المملكة العربية السعودية.";
const EN_KEYWORDS = "AI agents Saudi Arabia, AI voice agents Riyadh, AI sales agents, AI customer support, AI workflow automation, WhatsApp AI agents, enterprise AI solutions Saudi Arabia, Electi, وكلاء الذكاء الاصطناعي";
const AR_KEYWORDS = "وكلاء الذكاء الاصطناعي، الموظف الذكي، المساعد الذكي الشخصي، وكيل خدمة العملاء الذكي، وكيل المبيعات الذكي، الأتمتة بالذكاء الاصطناعي، ذكاء اصطناعي الرياض، ذكاء اصطناعي جدة، إليكتي";

function pathToSlug(path: string): string {
  if (!path || path === "/") return "home";
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
}

export default function SEOHead({
  title,
  titleAr,
  description,
  descriptionAr,
  path = "/",
  ogImage = OG_IMAGE,
  noindex = false,
  schemas = [],
  keywords,
  keywordsAr,
}: SEOHeadProps) {
  const { isAr } = useLang();
  const [apiOverride, setApiOverride] = useState<SeoOverride | null>(null);

  useEffect(() => {
    const slug = pathToSlug(path);
    let cancelled = false;
    fetch(`/api/seo/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SeoOverride | null) => {
        if (!cancelled && data) setApiOverride(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [path]);

  const baseTitle    = isAr ? (titleAr    ?? AR_TITLE)    : (title    ?? EN_TITLE);
  const baseDesc     = isAr ? (descriptionAr ?? AR_DESC)  : (description ?? EN_DESC);
  const baseKeywords = isAr ? (keywordsAr ?? AR_KEYWORDS) : (keywords    ?? EN_KEYWORDS);

  const resolvedTitle    = (apiOverride?.metaTitle    ?? "") || baseTitle;
  const resolvedDesc     = (apiOverride?.metaDescription ?? "") || baseDesc;
  const resolvedKeywords = (apiOverride?.keywords     ?? "") || baseKeywords;
  const resolvedOgTitle  = (apiOverride?.ogTitle      ?? "") || resolvedTitle;
  const resolvedOgDesc   = (apiOverride?.ogDescription ?? "") || resolvedDesc;
  const resolvedOgImage  = (apiOverride?.ogImage      ?? "") || ogImage;
  const canonicalUrl     = (apiOverride?.canonicalUrl ?? "") || `${SITE_URL}${path}`;
  const lang             = isAr ? "ar" : "en";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description"  content={resolvedDesc} />
      <meta name="keywords"     content={resolvedKeywords} />
      <meta name="robots"       content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="author"       content="Electi" />
      <meta name="copyright"    content="Electi" />
      <link rel="canonical"     href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"            content={resolvedOgTitle} />
      <meta property="og:description"      content={resolvedOgDesc} />
      <meta property="og:image"            content={resolvedOgImage} />
      <meta property="og:image:width"      content="1200" />
      <meta property="og:image:height"     content="630" />
      <meta property="og:image:alt"        content="Electi — AI Agents Saudi Arabia" />
      <meta property="og:url"              content={canonicalUrl} />
      <meta property="og:type"             content="website" />
      <meta property="og:site_name"        content="Electi" />
      <meta property="og:locale"           content={isAr ? "ar_SA" : "en_SA"} />
      <meta property="og:locale:alternate" content={isAr ? "en_SA" : "ar_SA"} />

      {/* Twitter / X */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image"       content={resolvedOgImage} />
      <meta name="twitter:image:alt"   content="Electi — AI Agents Saudi Arabia" />
      <meta name="twitter:site"        content="@electi_sa" />

      {/* Geo */}
      <meta name="geo.region"    content="SA-01" />
      <meta name="geo.placename" content="Riyadh, Saudi Arabia" />
      <meta name="geo.position"  content="24.6748;46.6929" />
      <meta name="ICBM"          content="24.6748, 46.6929" />

      {/* hreflang — en-SA + ar-SA (Saudi-specific) + generic */}
      <link rel="alternate" hrefLang="en-SA"     href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar-SA"     href={canonicalUrl} />
      <link rel="alternate" hrefLang="en"        href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar"        href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Injected JSON-LD schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
