"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import PlayGroundCard from "../playground-card";
import { codeLinkBase } from "../../../global";
import CryptoTradingInterface from "./crypto-trading-interface";

export default function Fintech({ inline }: { inline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!inline);

  return (
    <section id="fintech">
      <PlayGroundCard
        title="Fintech"
        description="For the fiscally savvy"
        footerText="Jay also holds a degree and many years of experience in accounting"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/fintech/crypto-trading-interface.tsx`}
        navUrl={`/playground${inline ? "/" : "#"}fintech`}
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
                You Had Me At Goodbye <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show Me the Money! <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isExpanded && <CryptoTradingInterface />}
        </div>
      </PlayGroundCard>
    </section>
  );
}
