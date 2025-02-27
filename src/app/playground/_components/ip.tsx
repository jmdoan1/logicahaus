"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "../../global";

export default function IPChecker({ inline }: { inline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!inline);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const res = await fetch("/api/ip");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  return (
    <section id="my-ip-address">
      <PlayGroundCard
        title="My IP Address"
        description="Get your public IP information"
        footerText="🤫"
        codeUrl={`${codeLinkBase}/pages/api/ip.ts`}
        navUrl={`/playground${inline ? "/" : "#"}my-ip-address`}
        inline={inline}
      >
        {isLoading ? (
          <div>Loading IP info...</div>
        ) : error ? (
          <div>Failed to fetch IP info</div>
        ) : (
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-center">{data.ip}</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            {isExpanded && (
              <div className="mt-4 space-y-2">
                {Object.entries(data.geoData).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </PlayGroundCard>
    </section>
  );
}
