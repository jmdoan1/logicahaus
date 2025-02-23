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
import { playgroundSlugs } from "./util";
import { useState } from "react";
import { Button } from "../_components/ui/button";

export default function Page() {
  const [mode, setMode] = useState<"utils" | "showcase">("utils");

  const activeTab =
    "border-2 border-b-0 p-2 pt-0 bg-gradient-to-b from-input to-transparent border-r-b rounded-b-none text-lg";

  const inactiveTab = "border-b-2 p-2 rounded-b-none text-lg";

  return (
    <ProjectContainer>
      <ProjectHeader className="mb-3">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-6">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <ProjectContent className="flex flex-col gap-10 columns-2">
        <div>
          <div className="flex flex-row">
            <div className="w-3 border-b-2" />
            <Button
              variant="ghost"
              className={mode === "utils" ? activeTab : inactiveTab}
              onClick={() => setMode("utils")}
            >
              Utils
            </Button>
            <Button
              variant="ghost"
              className={mode === "showcase" ? activeTab : inactiveTab}
              onClick={() => setMode("showcase")}
            >
              Showcase
            </Button>
            <div className="flex-1 border-b-2" />
          </div>
          <nav className="mb-8 justify-self-center">
            <ul className="flex flex-wrap justify-center space-x-2 pb-2 px-2 ">
              {playgroundSlugs
                .filter((slug) => slug.hash !== undefined)
                .map((slug) => (
                  <li key={slug.name}>
                    <Link
                      href={slug.hash}
                      className={`underline px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap inline-block text-muted-foreground hover:text-primary hover:bg-primary/10"`}
                    >
                      {slug.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
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
      </ProjectContent>
      <ScrollToTopButton />
    </ProjectContainer>
  );
}
