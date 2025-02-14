"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const baseAssetUrl = "/assets/projects/homesight";
  const [count, setCount] = useState(0);
  const [viewWidth, setViewWidth] = useState<number>(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateImgWidth = () => {
      setViewWidth(Math.floor(window.innerWidth));
    };

    updateImgWidth();
    window.addEventListener("resize", updateImgWidth);
    return () => window.removeEventListener("resize", updateImgWidth);
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

  return (
    <section className="bg-gradient-to-br from-background via-muted to-background py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 block lg:hidden">
          HomeSight Mobile
        </h2>

        {/* Images for large screens (floated) */}
        <Image
          src={`${baseAssetUrl}/${imageNumber()}-light.PNG`}
          alt="Preview of homesight app in light mode"
          width={viewWidth * 0.3}
          height={(viewWidth * 0.3 * 100) / 41}
          className="object-contain float-left hidden lg:block"
        />
        <Image
          src={`${baseAssetUrl}/${imageNumber()}-dark.PNG`}
          alt="Preview of homesight app in dark mode"
          width={viewWidth * 0.3}
          height={(viewWidth * 0.3 * 100) / 41}
          className="object-contain float-right hidden lg:block"
        />

        {/* Images for smaller screens (stacked or side-by-side at 50% each) */}
        <div className="block lg:hidden">
          <div className="flex flex-wrap justify-center">
            <Image
              src={`${baseAssetUrl}/${imageNumber()}-light.PNG`}
              alt="Preview of homesight app in light mode"
              width={viewWidth * 0.45}
              height={(viewWidth * 0.45 * 100) / 41}
              className="object-contain"
            />
            <Image
              src={`${baseAssetUrl}/${imageNumber()}-dark.PNG`}
              alt="Preview of homesight app in dark mode"
              width={viewWidth * 0.45}
              height={(viewWidth * 0.45 * 100) / 41}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-6 hidden lg:block">
          HomeSight Mobile
        </h2>
        <div className="flex flex-row gap-3 w-[60%] max-w-[375px] justify-center justify-self-center my-5 mx-auto">
          <video
            src={`${baseAssetUrl}/onboarding.mp4`}
            className="flex-1 min-w-0 rounded-xl md:rounded-3xl "
            autoPlay
            loop
            muted
            playsInline
          />
          <video
            src={`${baseAssetUrl}/other.mp4`}
            className="flex-1 min-w-0 rounded-3xl"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <p>
          HomeSight is a non-profit organization that aims to provide a path to
          homeownership for underprivelidged communities in the Seattle,
          Washington area.
          <br />
          <br />
          Built with Expo and React Native, this app serves to increase access
          to information and boost community engagement.
        </p>
        <FeatureList features={features} />
        <h3 className="text-2xl font-bold my-5 text-center">Timeline</h3>
        <p className="text-center text-muted-foreground">&lt; 1 month</p>
      </div>
    </section>
  );
}

const ListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex flex-row gap-2 justify-center text-center">
      ↣<p className="text-muted-foreground">{text}</p>↢
    </li>
  );
};

const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <>
      <h3 className="text-2xl font-bold my-5 text-center">Features</h3>
      {features.map((feat, index) => (
        <ListItem key={`feature-${index}`} text={feat} />
      ))}
    </>
  );
};
