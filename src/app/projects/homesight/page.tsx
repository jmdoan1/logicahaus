"use client";

import { SBSProject } from "@/app/_components/project-templates";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/homesight";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "HomeSight Mobile",
  description: "The HomeSight app",
  openGraph: {
    title: "HomeSight Mobile",
    description: "The HomeSight app",
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
};

export default function Page() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const imageNumber = useCallback(() => (count % 11) + 1, [count]);

  const features = [
    "Client portal for database management",
    "iOS and Android compatibility",
    "Push notifications",
    "Light and Dark color schemes",
    "Animated onboarding screen",
    "PDF displays and downloads",
    "Forms with input validation",
    "Form data sent to custom email lists",
    "Custom web views with persisted logins",
    "Signature capture",
    "App rating prompt",
    "Social sharing",
  ];

  const timeline = ["~ 3 weeks"];

  return (
    <SBSProject
      title="HomeSight Mobile"
      description={`
HomeSight is a non-profit organization that aims to provide a path to homeownership for underprivileged communities in the Seattle, Washington area.
        
Built with Expo and React Native, this app serves to increase access to information and boost community engagement.
      `}
      features={features}
      timeline={timeline}
      imageLeft={`${baseAssetUrl}/${imageNumber()}-light.PNG`}
      imageRight={`${baseAssetUrl}/${imageNumber()}-dark.PNG`}
      altLeft="Preview of homesight app in light mode"
      altRight="Preview of homesight app in right mode"
      imageRatio={100 / 41}
      videos={[`${baseAssetUrl}/onboarding.mp4`, `${baseAssetUrl}/other.mp4`]}
    />
  );
}
