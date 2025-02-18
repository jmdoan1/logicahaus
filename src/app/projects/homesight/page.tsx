import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";
import HomeSight from "./homesight";

const baseAssetUrl = "/assets/projects/homesight";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "HomeSight Mobile",
  description: "The HomeSight app",
  openGraph: {
    title: "HomeSight Mobile",
    description: "The HomeSight app",
    url: baseUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: `${baseAssetUrl}/preview.png`,
  },
  twitter: {
    card: "summary_large_image",
    images: `${baseAssetUrl}/preview.png`,
  },
};

export default function Page() {
  return <HomeSight />;
}
