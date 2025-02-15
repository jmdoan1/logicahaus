"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  features?: string[];
  timeline?: string[];
  imageLeft: string;
  imageRight: string;
  altLeft: string;
  altRight: string;
  imageRatio: number;
  videos?: string[];
}
export default function SBSProject({
  title,
  description,
  features = [],
  timeline = [],
  imageLeft,
  imageRight,
  imageRatio,
  altLeft,
  altRight,
  videos = [],
}: Props) {
  const [viewWidth, setViewWidth] = useState<number>(300);

  useEffect(() => {
    const updateImgWidth = () => {
      setViewWidth(Math.floor(window.innerWidth));
    };

    updateImgWidth();
    window.addEventListener("resize", updateImgWidth);
    return () => window.removeEventListener("resize", updateImgWidth);
  }, []);

  return (
    <section
      className="
      bg-gradient-to-br 
      from-background 
      via-muted 
      to-background 
      py-24 
      lg:py-32 
      after:content-[''] 
      after:block 
      after:clear-both
      "
    >
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 block lg:hidden">
          {title}
        </h2>

        {/* Images for large screens (floated) */}
        <Image
          src={imageLeft}
          alt={altLeft}
          width={viewWidth * 0.3}
          height={viewWidth * 0.3 * imageRatio}
          className="object-contain float-left hidden lg:block"
        />
        <Image
          src={imageRight}
          alt={altRight}
          width={viewWidth * 0.3}
          height={viewWidth * 0.3 * imageRatio}
          className="object-contain float-right hidden lg:block"
        />

        {/* Images for smaller screens (stacked or side-by-side on top) */}
        <div className="block lg:hidden">
          <div className="flex flex-wrap justify-center">
            <Image
              src={imageLeft}
              alt={altLeft}
              width={viewWidth * 0.45}
              height={viewWidth * 0.45 * imageRatio}
              className="object-contain"
            />
            <Image
              src={imageRight}
              alt={altRight}
              width={viewWidth * 0.45}
              height={viewWidth * 0.45 * imageRatio}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-6 hidden lg:block">
          {title}
        </h2>
        {videos.length > 0 ? (
          <div className="flex flex-row gap-3 w-[60%] max-w-[375px] justify-center justify-self-center my-5 mx-auto">
            {videos.map((video, index) => (
              <video
                key={`video-${index}`}
                src={video}
                className="flex-1 min-w-0 max-w-[200px] rounded-xl md:rounded-3xl "
                autoPlay
                loop
                muted
                playsInline
              />
            ))}
          </div>
        ) : null}
        <p className="whitespace-pre-wrap">{description}</p>
        {features.length > 0 ? <FeatureList features={features} /> : null}
        {timeline.length > 0 ? <Timeline items={timeline} /> : null}
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

const Timeline = ({ items }: { items: string[] }) => {
  return (
    <>
      <h3 className="text-2xl font-bold my-5 text-center">Timeline</h3>
      {items.map((item, index) => (
        <ListItem key={`feature-${index}`} text={item} />
      ))}
    </>
  );
};
