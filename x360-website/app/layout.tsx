import type { Metadata } from "next";
import { headers } from "next/headers";
import { Quicksand, Cairo } from "next/font/google";
import "./globals.css";
import { GLOBAL_SCHEMAS } from "@/seo/schema";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.x-360.ai"),
  title: {
    default: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions | X360",
    template: "%s | X360",
  },
  description:
    "شركة X360 الرائدة في السعودية تقدم خدمات الجولات الافتراضية 360 درجة، التوأم الرقمي، تطوير المواقع الإلكترونية، حلول الذكاء الاصطناعي وأنظمة ERP وSAP.",
  keywords: "X360 Saudi Arabia, 360 virtual tours, AI web development, digital transformation Saudi Arabia, جولات افتراضية, الذكاء الاصطناعي السعودية",
  authors: [{ name: "X360", url: "https://www.x-360.ai" }],
  creator: "X360",
  publisher: "X360",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions | X360",
    description: "شركة X360 الرائدة: جولات افتراضية 360 درجة، توأم رقمي، تطوير مواقع، ذكاء اصطناعي، ERP وSAP في المملكة.",
    type: "website",
    locale: "en_SA",
    siteName: "X360",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "X360 — 360° Virtual Tours & AI Web Development" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@x360sa",
    creator: "@x360sa",
    title: "360 Virtual Tours Saudi Arabia | Web Development, AI & ERP Solutions",
    description: "شركة X360 الرائدة: جولات افتراضية 360 درجة، توأم رقمي، تطوير مواقع، ذكاء اصطناعي، ERP وSAP.",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "360 Virtual Tours Saudi Arabia | X360" }],
  },
  icons: {
    icon: [
      { url: "/x360/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [
      { url: "/x360/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/x360/favicon.png",
  },
  verification: {
    google: undefined,
  },
};

interface TrackingConfig {
  gtmEnabled: boolean; gtmId: string;
  ga4Enabled: boolean; ga4Id: string;
  metaEnabled: boolean; metaId: string;
  tiktokEnabled: boolean; tiktokId: string;
  linkedinEnabled: boolean; linkedinId: string;
  customHead: string;
  customBody: string;
}

async function getTrackingConfig(): Promise<TrackingConfig | null> {
  try {
    const res = await fetch("http://localhost:80/api/tracking", {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const lang = headersList.get("x-lang") ?? "en";
  const dir  = headersList.get("x-dir")  ?? "ltr";

  const tracking = await getTrackingConfig();
  const gtm     = tracking?.gtmEnabled     && tracking.gtmId.trim()     ? tracking.gtmId.trim()     : null;
  const ga4     = tracking?.ga4Enabled     && tracking.ga4Id.trim()     ? tracking.ga4Id.trim()     : null;
  const meta    = tracking?.metaEnabled    && tracking.metaId.trim()    ? tracking.metaId.trim()    : null;
  const tiktok  = tracking?.tiktokEnabled  && tracking.tiktokId.trim()  ? tracking.tiktokId.trim()  : null;
  const linkedin = tracking?.linkedinEnabled && tracking.linkedinId.trim() ? tracking.linkedinId.trim() : null;

  return (
    <html lang={lang} dir={dir} className={`${quicksand.variable} ${cairo.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/x360/apple-icon.png" />
        <link rel="icon" href="/x360/favicon.png" type="image/png" sizes="256x256" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />

        {/* Google Tag Manager */}
        {gtm && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
            }}
          />
        )}

        {/* Google Analytics 4 (standalone, bypasses GTM) */}
        {ga4 && !gtm && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`,
              }}
            />
          </>
        )}

        {/* Meta Pixel */}
        {meta && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`,
            }}
          />
        )}

        {/* TikTok Pixel */}
        {tiktok && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok}');ttq.page();}(window,document,'ttq');`,
            }}
          />
        )}

        {/* LinkedIn Insight Tag */}
        {linkedin && (
          <script
            dangerouslySetInnerHTML={{
              __html: `_linkedin_partner_id="${linkedin}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`,
            }}
          />
        )}

        {/* Custom <head> scripts */}
        {tracking?.customHead && (
          <div dangerouslySetInnerHTML={{ __html: tracking.customHead }} />
        )}
      </head>
      <body>
        {/* GTM noscript fallback */}
        {gtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {children}

        {GLOBAL_SCHEMAS.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}

        {/* Custom <body> scripts */}
        {tracking?.customBody && (
          <div dangerouslySetInnerHTML={{ __html: tracking.customBody }} />
        )}
      </body>
    </html>
  );
}
