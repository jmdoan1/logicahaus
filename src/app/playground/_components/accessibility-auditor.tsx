"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Badge } from "@/app/_components/ui/badge";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "../../global";
import axios from "axios";
import { cn } from "@/app/_lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

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
  const [protocol, setProtocol] = useState<string>("https://");
  const [url, setUrl] = useState<string>("");
  const [localResults, setLocalResults] = useState<Violation[]>([]);
  const [clientError, setClientError] = useState<Error | null>(null);
  const [isClientPending, setIsClientPending] = useState(false);

  const runClientSideScan = async (scanUrl: string): Promise<void> => {
    try {
      // Load axe-core if not available
      if (!(window as any).axe) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js";
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error("Failed to load axe-core"));
          document.body.appendChild(script);
        });
      }

      // Create and load iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      iframe.src = scanUrl;

      await new Promise<void>((resolve, reject) => {
        iframe.onload = () => resolve();
        iframe.onerror = () => reject(new Error("Failed to load iframe"));
      });

      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) throw new Error("Couldn't access iframe content");

      // Run axe-core
      const results = await (window as any).axe.run(iframeDoc.documentElement);

      // Transform results
      const violations: Violation[] = results.violations.map((v: any) => ({
        id: v.id,
        help: v.help,
        description: v.description,
        impact: v.impact,
        tags: v.tags,
        nodes: v.nodes.map((node: any) => ({
          target: node.target,
          failureSummary: node.failureSummary || "No summary available",
        })),
      }));

      setLocalResults(violations);
      setClientError(null);
    } finally {
      // Clean up iframe
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => iframe.remove());
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let fullUrl = "";

    try {
      if (protocol === "localhost") {
        fullUrl =
          url.startsWith("/") || url.startsWith(":")
            ? `http://localhost${url}`
            : `http://localhost/${url}`;

        // Validate same-origin
        if (new URL(fullUrl).origin !== window.location.origin) {
          throw new Error("Client-side scan requires same-origin URL");
        }

        setIsClientPending(true);
        await runClientSideScan(fullUrl);
      } else {
        fullUrl = protocol + url;
        mutate(fullUrl);
      }
    } catch (error) {
      setClientError(error as Error);
    } finally {
      setIsClientPending(false);
    }
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
              {/* Protocol select */}
              <Select
                value={protocol}
                onValueChange={(value) => setProtocol(value)}
                // className="w-28"
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="https://">https://</SelectItem>
                  <SelectItem value="http://">http://</SelectItem>
                  <SelectItem value="localhost">localhost</SelectItem>
                </SelectContent>
              </Select>

              {/* URL input (without protocol) */}
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  protocol === "localhost" ? "/path (optional)" : "example.com"
                }
                className="flex-1"
                aria-label="Website URL to scan"
                required
              />
              <Button type="submit" disabled={isPending} className="px-4">
                {isPending || isClientPending ? (
                  <span className="animate-pulse">Scanning...</span>
                ) : (
                  "Scan"
                )}
              </Button>
            </form>

            {isError ||
              (clientError && (
                <Alert
                  variant="destructive"
                  className="animate-in slide-in-from-top-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error?.message || "Failed to scan website"}
                  </AlertDescription>
                </Alert>
              ))}

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
