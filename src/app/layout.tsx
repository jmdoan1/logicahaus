import type { Metadata } from "next";
import { WebVitals } from "@/app/_components/web-vitals";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { Providers } from "./providers";
import { Toaster } from "./_components/ui/toaster";
import { baseUrl } from "./sitemap";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LogicaHaus",
    template: "%s | LogicaHaus",
  },
  description: "Custom Software Engineering Solutions",
  openGraph: {
    title: "LogicaHaus",
    description: "Custom Software Engineering Solutions",
    url: baseUrl,
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
  keywords: [
    "LogicaHaus",
    "logic",
    "software development",
    "bespoke software",
    "bespoke",
    "Tulsa",
    "Oklahoma",
    "Florida",
    "Jacksonville",
    "custom",
    "US",
    "USA",
    "U.S.",
    "U.S.A",
    "America",
    "American",
    "software",
    "frontend",
    "backend",
    "API",
    "database",
    "sql",
    "mongodb",
    "app developer",
    "web developer",
    "development",
    "agency",
    "developer",
    "freelance",
    "custom",
    "custom software",
    "bots",
    "scripts",
    "Slack",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo/logo-1-light-w-bg.svg" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-[100vh]">
            <WebVitals />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
