"use client";

import type React from "react";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Badge } from "@/app/_components/ui/badge";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { useState } from "react";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "../../global";
import axios from "axios";
import { cn } from "@/app/_lib/utils";

export interface Violation {
  id: string;
  help: string;
  description: string;
  impact: "minor" | "moderate" | "serious" | "critical" | undefined;
  tags: string[];
  nodes: {
    target: string[];
    failureSummary: string;
  }[];
}

export default function AccessibilityAuditor({ inline }: { inline?: boolean }) {
  const [url, setUrl] = useState<string>("");
  const [localResults, setLocalResults] = useState<Violation[]>([]);

  const { mutate, isPending, isError, error } = useMutation<
    Violation[],
    Error,
    string
  >({
    mutationKey: ["accessibility-scan"],
    mutationFn: async (scanUrl: string) => {
      const response = await axios.post("/api/accessibility", { url: scanUrl });
      return response.data.violations;
    },
    onSuccess: (data) => {
      setLocalResults(data);
    },
    onError: (error) => {
      console.error("Scan failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) mutate(url);
  };

  const getImpactStyles = (impact: string | undefined) => {
    switch (impact) {
      case "critical":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:text-destructive-foreground dark:hover:bg-destructive/30";
      case "serious":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "minor":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section id="accessibility-auditor">
      <PlayGroundCard
        title="Accessibility Auditor"
        description="Scan any website for accessibility issues"
        footerText="WCAG Compliance"
        codeUrl={`${codeLinkBase}/pages/api/scan.ts`}
        navUrl={`/playground${inline ? "/" : "#"}accessibility-auditor`}
        inline={inline}
      >
        <div className="space-y-4">
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1"
                aria-label="Website URL to scan"
                required
              />
              <Button type="submit" disabled={isPending} className="px-4">
                {isPending ? (
                  <>
                    <span className="animate-pulse">Scanning...</span>
                  </>
                ) : (
                  "Scan"
                )}
              </Button>
            </form>

            {isError && (
              <Alert
                variant="destructive"
                className="animate-in slide-in-from-top-2"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error?.message || "Failed to scan website"}
                </AlertDescription>
              </Alert>
            )}

            {localResults.length > 0 && (
              <div className="space-y-4 animate-in fade-in-50 duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Results</h3>
                  <Badge variant="outline" className="font-normal">
                    {localResults.length} issue
                    {localResults.length > 1 ? "s" : ""} found
                  </Badge>
                </div>

                <div className="space-y-4">
                  {localResults.map((violation) => (
                    <div
                      key={violation.id}
                      className="p-4 border rounded-lg shadow-sm bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h4 className="font-medium text-card-foreground">
                          {violation.help}
                        </h4>
                        <Badge
                          className={cn(
                            "font-normal",
                            getImpactStyles(violation.impact)
                          )}
                        >
                          {violation.impact || "unknown"}
                        </Badge>
                      </div>

                      <p className="mb-4 text-sm text-muted-foreground">
                        {violation.description}
                      </p>

                      <div className="space-y-3">
                        {violation.nodes.map((node, index) => (
                          <div key={index} className="p-3 bg-muted rounded-md">
                            <code className="block mb-2 font-mono text-sm break-words text-foreground">
                              {node.target.join(" ")}
                            </code>
                            <p className="text-xs text-muted-foreground">
                              {node.failureSummary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </PlayGroundCard>
    </section>
  );
}
