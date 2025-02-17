import type { Metadata } from "next";
import { WebVitals } from "@/app/_components/web-vitals";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { Providers } from "./providers";
import { Toaster } from "./_components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogicaHaus - Innovative Software Solutions",
  description:
    "One-man software development agency delivering cutting-edge digital solutions",
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
