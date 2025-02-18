import { SBSProject } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/memboard";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Memboard",
  description: "The Keyboard That Remembers For You",
  openGraph: {
    title: "Memboard",
    description: "The Keyboard That Remembers For You",
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
  const timeline = [
    "04/09/2017 - Began Work",
    "04/09/2017 - Functional Prototype (1 hour)",
    "04/16/2017 - Finish keyboard and accompanying app (8.5 hours)",
    "04/17/2017 - App Store submission and web page creation",
  ];

  return (
    <SBSProject
      title="MemBoard: The Keyboard That Remembers For You"
      description={`MemBoard is a custom iOS Keyboard that lets you save text for later use. Memboard presents itself as a table view and a bottom row consisting of 5 buttons: next keyboard, add to list, space bar, delete, return. Users can use any keyboard to type the text they want to add, then switch to MemBoard, press the "+" button, and the text will be added to their list. To circumvent certain limitations to the amount of text a keyboard can read, the app includes a feature to add any text, regardless of the keyboard's capabilities.`}
      timeline={timeline}
      imageLeft={`${baseAssetUrl}/mem-1.png`}
      imageRight={`${baseAssetUrl}/mem-2.png`}
      altLeft="Preview of keyboard"
      altRight="Preview of companion app"
      imageRatio={100 / 41}
    />
  );
}
