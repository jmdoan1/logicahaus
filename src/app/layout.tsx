import type { Metadata } from "next";
import { WebVitals } from "@/app/_components/web-vitals";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/_components/theme-provider";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WebVitals />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
