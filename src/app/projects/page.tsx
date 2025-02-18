import { Metadata } from "next";
import PortfolioGrid from "../_components/portfoliogrid";
import { baseUrl } from "../sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Projects",
  description: "The LogicaFolio",
  openGraph: {
    title: "LogicaHaus Projects",
    description: "The LogicaFolio",
    url: baseUrl,
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
};

export default function Projects() {
  return <PortfolioGrid />;
}
