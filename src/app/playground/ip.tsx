"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";

export default function IPChecker() {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <Card className="w-full  mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My IP Address</CardTitle>
          <CardDescription>Get your public IP information</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          🤫
        </CardFooter>
      </Card>
    </section>
  );
}
