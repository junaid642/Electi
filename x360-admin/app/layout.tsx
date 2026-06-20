import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "X360 Admin — Enterprise Business Operating System",
  description: "Enterprise CRM & Business OS for GCC B2B operations",
  openGraph: {
    title: "X360 Admin — Enterprise Business Operating System",
    description: "Enterprise CRM & Business OS for GCC B2B operations",
    type: "website",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/x360-admin/favicon.png?v=5" type="image/png" />
        <link rel="shortcut icon" href="/x360-admin/favicon.png?v=5" type="image/png" />
      </head>
      <body className="font-sans antialiased bg-bg text-text min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
