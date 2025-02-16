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
      <body className={inter.className}>
        <Providers>
          <WebVitals />
          <Header />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
