import { SBSProject } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/hilo";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "HiLo",
  description: "The HiLo app",
  openGraph: {
    title: "HiLo",
    description: "The HiLo app",
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
  const contributions = [
    "User mentions",
    "Username suggestion bar while typing @...",
    "Mentions recognized in text",
    "Tapped mentions navigate to user profiles",
    "Improvements to commenting",
    "Improved push notification logic from server",
    "Push notifications navigate to relevant content",
    "UI development and modification",
    "Bug fixes",
  ];

  return (
    <SBSProject
      title="HiLo"
      description={`"HiLo" is a platform that aims to be 'more social and less media' by asking users to share both the highs and lows of their day.`}
      contributions={contributions}
      imageLeft={`${baseAssetUrl}/IMG_3324.png`}
      imageRight={`${baseAssetUrl}/IMG_3311.png`}
      altLeft="Preview of content feed"
      altRight="Preview of post creation view"
      imageRatio={100 / 41}
    />
  );
}
