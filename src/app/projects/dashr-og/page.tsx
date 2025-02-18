import NewTabLink from "@/app/_components/new-tab-link";
import "./page.css";
import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

const baseAssetUrl = "/assets/projects/dashr-og";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Dashr: The Dashcam App",
  description: "Free Dashcam App!",
  openGraph: {
    title: "Dashr: The Dashcam App",
    description: "Free Dashcam App!",
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
  keywords: [
    "LogicaHaus",
    "free",
    "dashcam",
    "dash",
    "cam",
    "camera",
    "car",
    "ios",
    "app",
    "speed",
    "mpg",
    "kmh",
    "music",
    "controls",
    "video",
    "videos",
    "accident",
    "detection",
    "live",
    "map",
    "view",
  ],
};

export default function Page() {
  return (
    <ProjectContainer>
      <h1 className="h1">Dashr: The Dashcam App</h1>
      <div className="sbs">
        <img src={`${baseAssetUrl}/IMG_4173.png`} className="left" />
        <img src={`${baseAssetUrl}/download.png`} className="right" />
      </div>
      <ProjectContent>
        Dashr is a beautiful dashcam app with map, speed, and music control
        overlays. Once the recording is finished, the overlays are also included
        in the exported video!
        <br />
        <br />
        Pro users will be able to choose which overlays to include in both the
        app and the exported videos.
        <br />
        <br />
        <h2 className="h2">STATUS</h2>
        <NewTabLink href="/projects/dashr">
          <h3 className="h3 link">Replaced with new project</h3>
        </NewTabLink>
      </ProjectContent>
    </ProjectContainer>
  );
}
