"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

interface SBSProps {
  title: string;
  description: string;
  features?: string[];
  contributions?: string[];
  timeline?: string[];
  lists?: { title: string; items: string[] }[];
  imageLeft: string;
  imageRight: string;
  altLeft: string;
  altRight: string;
  imageRatio: number;
  videos?: string[];
}

export function SBSProject({
  title,
  description,
  features = [],
  contributions = [],
  timeline = [],
  lists = [],
  imageLeft,
  imageRight,
  imageRatio,
  altLeft,
  altRight,
  videos = [],
}: SBSProps) {
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
    <ProjectContainer>
      <ProjectHeader className="block lg:hidden">{title}</ProjectHeader>

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
            width={viewWidth * 0.3}
            height={viewWidth * 0.3 * imageRatio}
            className="object-contain"
          />
          <Image
            src={imageRight}
            alt={altRight}
            width={viewWidth * 0.3}
            height={viewWidth * 0.3 * imageRatio}
            className="object-contain"
          />
        </div>
      </div>

      <ProjectHeader className="hidden lg:block">{title}</ProjectHeader>
      <ProjectContent>
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
        {contributions.length > 0 ? (
          <Contributions items={contributions} />
        ) : null}
        {timeline.length > 0 ? <Timeline items={timeline} /> : null}
        {lists.length > 0
          ? lists.map((list, index) =>
              list.items.length > 0 ? (
                <ProjectList key={`list-${index}`} {...list} />
              ) : null
            )
          : null}
      </ProjectContent>
    </ProjectContainer>
  );
}

export interface ElementProps {
  children: ReactNode;
  className?: string;
}

export const ProjectContainer = ({
  children,
  className = "",
}: ElementProps) => {
  return (
    <section
      className={`
        flex-1
        bg-gradient-to-br 
        from-background 
        via-muted 
        to-background 
        py-24 
        lg:py-32 
        after:content-[''] 
        after:block 
        after:clear-both
        ${className}
        `}
    >
      <div className="max-w-screen-2xl mx-auto px-4">{children}</div>
    </section>
  );
};

export const ProjectHeader = ({ children, className = "" }: ElementProps) => {
  return (
    <h2
      className={`
        text-3xl 
        font-bold 
        tracking-tighter 
        sm:text-5xl 
        text-center 
        mb-12 
        ${className}
        `}
    >
      {children}
    </h2>
  );
};

export const ProjectSectionHeader = ({
  children,
  className = "",
}: ElementProps) => {
  return (
    <h3
      className={`
      text-2xl
      font-bold
      tracking-tighter
      sm:text-3xl
      my-5
      text-center
      ${className}
      `}
    >
      {children}
    </h3>
  );
};

export const ProjectContent = ({ children, className = "" }: ElementProps) => {
  return (
    <div
      className={`
        max-w-[1000px]
        mx-auto
        ${className}
        `}
    >
      {children}
    </div>
  );
};

export const ListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex flex-row gap-2 justify-center text-center">
      ↣<p className="text-muted-foreground">{text}</p>↢
    </li>
  );
};

export const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <>
      <ProjectSectionHeader>Features</ProjectSectionHeader>
      {features.map((feat, index) => (
        <ListItem key={`feature-${index}`} text={feat} />
      ))}
    </>
  );
};

export const Timeline = ({ items }: { items: string[] }) => {
  return (
    <>
      <ProjectSectionHeader>Timeline</ProjectSectionHeader>
      {items.map((item, index) => (
        <ListItem key={`feature-${index}`} text={item} />
      ))}
    </>
  );
};

export const Contributions = ({
  items,
  significant,
}: {
  items: string[];
  significant?: boolean;
}) => {
  return (
    <>
      <ProjectSectionHeader>{`${
        significant ? "Significant " : ""
      }Contributions`}</ProjectSectionHeader>
      {items.map((item, index) => (
        <ListItem key={`feature-${index}`} text={item} />
      ))}
    </>
  );
};

export const ProjectList = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <>
      <ProjectSectionHeader>{title}</ProjectSectionHeader>
      {items.map((item, index) => (
        <ListItem key={`feature-${index}`} text={item} />
      ))}
    </>
  );
};
