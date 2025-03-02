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
import { useState, useEffect } from "react";
import { Button } from "../_components/ui/button";
import ChartsAndData from "./_components/ecommerce";
import Fintech from "./_components/fintech";
import Animations from "./_components/animations";
import ColorPaletteGenerator from "./_components/color-palette-generator";
import TypescriptPlayground from "./_components/typescript-playground";
import AccessibilityAuditor from "./_components/accessibility-auditor";

export default function Page() {
  const [mode, setMode] = useState<"utils" | "showcase" | "loading">("loading");
  const [utilsHovered, setUtilsHovered] = useState(false);
  const [showcaseHovered, setShowcaseHovered] = useState(false);

  const inactiveTab =
    "flex-1 p-4 hover:bg-input rounded-2xl rounded-b-none text-xl text-center";

  const activeTab = inactiveTab + " bg-input";

  // Set the mode based on the hash (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMode(
        showcaseSlugs.map((s) => s.hash).includes(window.location.hash)
          ? "showcase"
          : "utils"
      );
    }
  }, []);

  // Handle scrolling to the correct element based on the hash (only on first load)
  useEffect(() => {
    if (typeof window !== "undefined" && mode !== "loading") {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [mode]);

  function clearHash() {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  // Show a loading state while determining the mode
  if (mode === "loading") {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <ProjectContainer>
      <ProjectHeader className="mb-3">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-6">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <ProjectContent className="flex flex-col gap-10 columns-2">
        <div>
          <div className="flex flex-row">
            <Button
              variant="ghost"
              className={mode === "utils" ? activeTab : inactiveTab}
              onClick={() => {
                if (mode !== "utils") clearHash();
                setMode("utils");
              }}
              onMouseEnter={() => setUtilsHovered(true)}
              onMouseLeave={() => setUtilsHovered(false)}
            >
              Utils
            </Button>
            <Button
              variant="ghost"
              className={mode === "showcase" ? activeTab : inactiveTab}
              onClick={() => {
                if (mode !== "showcase") clearHash();
                setMode("showcase");
              }}
              onMouseEnter={() => setShowcaseHovered(true)}
              onMouseLeave={() => setShowcaseHovered(false)}
            >
              Showcase
            </Button>
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
            <TypescriptPlayground inline />
            <AccessibilityAuditor inline />
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
