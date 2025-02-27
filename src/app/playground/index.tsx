"use client";
import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "../_components/project-templates";
import { ScrollToTopButton } from "@/app/_components/scroll-to-top-button";
import IPChecker from "./_components/ip";
import PasswordGenerator from "./_components/password-generator";
import QRCodeGenerator from "./_components/qr";
import Link from "next/link";
import { playgroundSlugs, showcaseSlugs } from "./util";
import { useState } from "react";
import { Button } from "../_components/ui/button";
import ChartsAndData from "./_components/charts-and-data";
import Fintech from "./_components/fintech";
import Animations from "./_components/animations";
import ColorPaletteGenerator from "./_components/color-palette-generator";

export default function Playground({ mode }: { mode: "utils" | "showcase" }) {
  const [utilsHovered, setUtilsHovered] = useState(false);
  const [showcaseHovered, setShowcaseHovered] = useState(false);

  const inactiveTab =
    "flex-1 p-4 hover:bg-input rounded-2xl rounded-b-none text-center";

  const activeTab = inactiveTab + " bg-input";

  return (
    <ProjectContainer>
      <ProjectHeader className="mb-3">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-6">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <ProjectContent className="flex flex-col gap-10 columns-2">
        <div>
          <div className="flex flex-row">
            <Link
              prefetch
              href="/playground/utils"
              className={mode === "utils" ? activeTab : inactiveTab}
              // onClick={() => setMode("utils")}
              onMouseEnter={() => setUtilsHovered(true)}
              onMouseLeave={() => setUtilsHovered(false)}
            >
              <Button variant="ghost" className="text-xl align-self-center">
                Utils
              </Button>
            </Link>
            <Link
              prefetch
              href="/playground/showcase"
              className={mode === "showcase" ? activeTab : inactiveTab}
              // onClick={() => setMode("showcase")}
              onMouseEnter={() => setShowcaseHovered(true)}
              onMouseLeave={() => setShowcaseHovered(false)}
            >
              <Button variant="ghost" className="text-xl">
                Showcase
              </Button>
            </Link>
          </div>
          <nav
            className={
              "pb-4 w-full bg-gradient-to-b from-input to-transparent " +
              (mode === "utils" && !showcaseHovered
                ? "rounded-tr-3xl"
                : mode === "showcase" && !utilsHovered
                ? "rounded-tl-3xl"
                : "")
            }
          >
            <ul
              className={
                "flex flex-wrap space-x-2 pb-2 px-2 " +
                (mode === "showcase" ? "justify-end" : "")
              }
            >
              {(mode === "utils" ? playgroundSlugs : showcaseSlugs)
                .filter((slug) => slug.hash !== undefined)
                .map((slug) => (
                  <li key={slug.name}>
                    <Link
                      href={slug.hash}
                      className={`underline px-4 pt-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap inline-block text-muted-foreground hover:text-primary hover:bg-primary/10"`}
                    >
                      {slug.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        {mode === "utils" ? (
          <>
            <ColorPaletteGenerator inline />
            <PasswordGenerator
              inline
              navUrl="/playground/easy-password-generator"
            />
            <PasswordGenerator
              cute
              inline
              navUrl="/playground/cute-password-maker"
            />
            <IPChecker inline />
            <QRCodeGenerator inline />
          </>
        ) : (
          <>
            <ChartsAndData inline />
            <Fintech inline />
            <Animations inline />
          </>
        )}
      </ProjectContent>
      <ScrollToTopButton />
    </ProjectContainer>
  );
}
