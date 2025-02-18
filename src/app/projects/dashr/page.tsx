import NewTabLink from "@/app/_components/new-tab-link";
import List from "@/app/_components/list";
import "./page.css";
import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
  ProjectSectionHeader,
} from "@/app/_components/project-templates";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

const baseAssetUrl = "/assets/projects/dashr";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Dashr: The Dashcam App",
  description: "Free Dashcam App!",
  openGraph: {
    title: "Dashr: The Dashcam App",
    description: "Free Dashcam App!",
    url: baseAssetUrl + baseAssetUrl.replace("/assets", ""),
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
    <ProjectContainer className="px-5">
      <ProjectHeader>Dashr: The Dashcam App</ProjectHeader>
      <div className="flex flex-row mb-5">
        <img
          alt="App Icon"
          src={`${baseAssetUrl}/icon.svg`}
          className="min-w-0"
        />
        <img
          alt="App Store screenshots"
          src={`${baseAssetUrl}/Screenshots.png`}
          className="min-w-0"
        />
      </div>
      <br />
      <iframe
        width={"100%"}
        style={{
          width: "100%",
          maxWidth: 1000,
          aspectRatio: 650 / 365.625,
          justifySelf: "center",
        }}
        src="https://www.youtube.com/embed/cfClw8Sk9do?si=_3bxDuYKlJ4WknXL"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <br />
      <ProjectSectionHeader>
        They say the best camera is the one you have with you. Now you can say
        the same for your dashcam!
      </ProjectSectionHeader>
      <br />
      <ProjectContent>
        <p className="text-center">
          <i>
            <b className="text-xl">
              Introducing Dashr: Your Ultimate Driving Companion
            </b>
          </i>
          <br />
          <br />
          Turn your smartphone into a reliable dashcam with Dashr, designed to
          keep you safe and capture every moment on the road. Whether
          you&apos;re recording beautiful road trips, tracking incidents, or
          simply ensuring peace of mind while driving, Dashr has you covered.
          <br />
          <br />
        </p>
        <ProjectSectionHeader>Key Features:</ProjectSectionHeader>
        <List style={{ textAlign: "left" }}>
          <li>
            {" "}
            <b>Easy Recording:</b> Start recording your journey effortlessly
            with a single tap.
          </li>
          <li>
            <b>High-Quality Video:</b> Capture your drives in crisp HD video,
            ensuring every detail is documented.
          </li>
          <li>
            <b>Keep the Party Going:</b> Dashr records videos with audio without
            interfering with your music, whether you&apos;re listening with the
            device, over bluetooth, or through CarPlay
          </li>
          <li>
            <b>GPS Integration:</b> Track your route with speed and location
            overlays, adding crucial context to your videos.
          </li>
          <li>
            <b>Emergency Save:</b> Quickly lock important video clips to prevent
            them from being overwritten with a double tap.
          </li>
          <li>
            <b>Incident Detection:</b> Detect sudden braking or impacts, and
            automatically save the video for later review.
          </li>
          <li>
            <b>Easy Sharing:</b> Quickly share your recorded clips with family,
            first responders, or your insurance provider directly from the app.
          </li>
        </List>
        <br />
        Dashr is perfect for commuters, road trippers, professional drivers, and
        anyone who wants added safety and security while on the road.
        <br />
        <br />
        Download Dashr today and take control of your driving experience!
        <br />
        <br />
        <NewTabLink
          href="https://apps.apple.com/us/app/dashr-the-dashcam-app/id6727001876"
          className="link"
        >
          <h3 className="h3">View on the App Store</h3>
        </NewTabLink>
        <br />
        <p style={{ flex: 2, margin: 10 }}>
          <NewTabLink className="link" href="/projects/dashr-og">
            The original Dashr app
          </NewTabLink>{" "}
          was built in 2017 using screen recording logic to include overlays in
          the video, which is can no longer be feasibly maintained.
          <i>
            <b> This version</b> (built in 2024)
          </i>{" "}
          uses Apple&apos;s CoreAnimation library add the overlays from stored
          location data after recording is finished
        </p>
      </ProjectContent>
    </ProjectContainer>
  );
}
