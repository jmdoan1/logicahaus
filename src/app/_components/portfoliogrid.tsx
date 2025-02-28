"use client";

import { AspectRatio } from "@/app/_components/aspect-ratio";
import Image from "next/image";
import { githubUrl, Project, projects } from "../global";
import "./portfolio-grid.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { ProjectContainer } from "./project-templates";

interface Props {
  ignoreProject?: string;
}

export default function PortfolioGrid({ ignoreProject }: Props) {
  return (
    <section id="projects">
      <ProjectContainer>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          PORTFOLIO
        </h2>
        <div className="grid container mx-auto px-4 sm:px-6 lg:px-8 ">
          <ProjectCard
            index={0}
            key={"project-0"}
            name="THIS WEBSITE"
            slug={githubUrl}
            scale={1}
          />
          {projects
            .filter((x) => x.slug !== ignoreProject)
            .map((proj, index) => (
              <ProjectCard
                index={index + 1}
                key={`project-${index + 1}`}
                {...proj}
              />
            ))}
        </div>
      </ProjectContainer>
    </section>
  );
}

function ProjectCard({
  name,
  slug,
  scale,
  rotate,
  marginTop,
  index,
}: Project & { index: number }) {
  const [columns, setColumns] = useState(4);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: (index % columns) * 0.2,
        },
      });
    }
  }, [controls, inView, index, columns]);

  useEffect(() => {
    const determineColumns = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setColumns(1);
        console.log("1 column");
      } else if (width < 768) {
        setColumns(2);
        console.log("2 columns");
      } else if (width < 1024) {
        setColumns(3);
        console.log("3 columns");
      } else {
        setColumns(4);
        console.log("4 columns");
      }
    };

    determineColumns();
    window.addEventListener("resize", determineColumns);
    return () => window.removeEventListener("resize", determineColumns);
  }, []);

  return (
    <motion.a
      href={slug === githubUrl ? slug : `/projects/${slug}`}
      className="item"
      key={slug}
      target={slug === githubUrl ? "_blank" : undefined}
      rel={slug === githubUrl ? "noopener noreferrer" : undefined}
      ref={ref}
      initial={{ x: 50, opacity: 0 }}
      animate={controls}
    >
      <AspectRatio ratio={1} key={slug}>
        <Image
          alt={slug + " screenshots"}
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
        <p className="bg-gradient-to-r from-muted to-muted-foreground ">
          {name.toUpperCase()}
        </p>
      </AspectRatio>
    </motion.a>
  );
}
