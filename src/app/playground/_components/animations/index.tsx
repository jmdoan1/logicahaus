"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import PlayGroundCard from "../playground-card";
import { codeLinkBase } from "../../../global";
import HalftoneWave from "./halftone-wave";
import Isometric from "./isometric";
import Link from "next/link";

export default function Animations({ inline }: { inline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!inline);

  return (
    <section id="animations">
      <PlayGroundCard
        title="Animations"
        description="A little pizzazz never hurt anyone"
        footerText="Why don't you ani-make your way to the contact page?"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/animations/index.tsx`}
        navUrl={`/playground${inline ? "/" : "/showcase#"}animations`}
        inline={inline}
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                I&apos;m getting dizzy... <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Wow me <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isExpanded && (
            <div className="text-center space-y-3">
              <div className="flex w-full gap-4">
                <div className="w-1/2 aspect-square relative">
                  <HalftoneWave />
                </div>
                <div className="w-1/2 aspect-square relative">
                  <Isometric />
                </div>
              </div>
              <Link
                prefetch
                href={"/#about"}
                className={`underline px-4 pt-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap inline-block text-muted-foreground hover:text-primary hover:bg-primary/10"`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Maybe something a little more practical?
              </Link>
            </div>
          )}
        </div>
      </PlayGroundCard>
    </section>
  );
}
