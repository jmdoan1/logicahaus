import { AspectRatio } from "@/app/_components/aspect-ratio";
import Image from "next/image";
import { githubUrl } from "../global";
// import PageInPage from "./page-in-page";
import "./portfolio-grid.css";

interface Project {
  name: string;
  slug: string;
  scale: number;
  rotate?: number;
  marginTop?: string;
}

export const projects: Project[] = [
  {
    name: "Dashr (v2)",
    slug: "dashr",
    scale: 1.65,
    marginTop: "5%",
  },
  {
    name: "ScenePin",
    slug: "scenepin",
    scale: 1.45,
  },
  // {
  //   name: "KeepAwayk",
  //   slug: "keepawayk",
  //   scale: 1,
  // },
  {
    name: "Spirated",
    slug: "spirated",
    scale: 1.45,
    rotate: 10,
  },
  {
    name: "Mileage Quest",
    slug: "mileage-quest",
    scale: 1.65,
  },
  {
    name: "iOS SDK",
    slug: "ios-sdk",
    scale: 1.55,
  },
  {
    name: "Trivia Pal",
    slug: "trivia-pal",
    scale: 1.75,
    rotate: 10,
  },
  {
    name: "Basket Counter",
    slug: "basket-counter",
    scale: 1.7,
  },
  {
    name: "Dashr (v1)",
    slug: "dashr-og",
    scale: 1.7,
  },
  {
    name: "HiLo",
    slug: "hilo",
    scale: 1.7,
  },
  {
    name: "Memboard",
    slug: "memboard",
    scale: 1.7,
  },
  {
    name: "WatchFlippers",
    slug: "watchflippers",
    scale: 1.7,
  },
  {
    name: "Pharmacy Quotes",
    slug: "pharmacy-quotes",
    scale: 1.7,
  },
  {
    name: "MPG Tracker",
    slug: "mpg-tracker",
    scale: 1.7,
  },
  {
    name: "QwickWeights",
    slug: "qwickweights",
    scale: 1.7,
  },
  {
    name: "Swipper",
    slug: "swipper",
    scale: 1.7,
  },
];

interface Props {
  ignoreProject?: string;
}

export default function PortfolioGrid({ ignoreProject }: Props) {
  return (
    <section className="bg-gradient-to-br from-background via-muted to-background py-12 md:py-24 lg:py-32">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        PORTFOLIO
      </h2>
      <div className="grid container mx-auto px-4 sm:px-6 lg:px-8 ">
        <ProjectCard
          key={"LH"}
          name="THIS WEBSITE"
          slug={githubUrl}
          scale={1}
        />
        {projects
          .filter((x) => x.slug !== ignoreProject)
          .map((proj, index) => (
            <ProjectCard key={`project-${proj.slug}-${index}`} {...proj} />
          ))}
      </div>
    </section>
  );
}

function ProjectCard({ name, slug, scale, rotate, marginTop }: Project) {
  return (
    <a
      href={slug === githubUrl ? slug : `/projects/${slug}`}
      className="item"
      key={slug}
      target={slug === githubUrl ? "_blank" : undefined}
      rel={slug === githubUrl ? "noopener noreferrer" : undefined}
    >
      <AspectRatio ratio={1} key={slug}>
        <Image
          alt={slug}
          src={
            slug === githubUrl
              ? "/assets/logo/logo-1-light-w-bg.svg"
              : `/assets/projects/${slug}/preview.png`
          }
          style={{
            transform: `scale(${scale}) ${
              rotate ? `rotate(${rotate}deg)` : ""
            }`,
            marginTop,
          }}
          fill
          className="image"
        />
        <p>{name.toUpperCase()}</p>
      </AspectRatio>
    </a>
  );
}
