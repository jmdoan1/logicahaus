/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/accessibility.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axe, { run } from "axe-core";
import { JSDOM } from "jsdom";
import { Violation } from "@/app/playground/_components/accessibility-auditor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  try {
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Fetch HTML content
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AccessibilityAuditor/1.0)",
      },
      timeout: 10000,
    });

    // Create JSDOM instance with proper config
    const dom = new JSDOM(response.data, {
      runScripts: "dangerously",
      resources: "usable",
    });

    // Extract the window and document from JSDOM
    const { window } = dom;
    const { document } = window;

    // Run axe-core in the JSDOM context
    const results = await new Promise<axe.AxeResults>((resolve, reject) => {
      // Use the JSDOM document's root element
      run(
        document.documentElement,
        {
          //   context: window,
        },
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });

    // Transform results
    const violations: Violation[] = results.violations.map((violation) => ({
      id: violation.id,
      help: violation.help,
      description: violation.description,
      impact: violation.impact as Violation["impact"],
      tags: violation.tags,
      nodes: violation.nodes.map((node) => ({
        target: node.target.map((t) => t.toString()),
        failureSummary: node.failureSummary || "No failure summary available",
      })),
    }));

    res.status(200).json({ violations });
  } catch (error: any) {
    console.error("Scan error:", error);
    res.status(500).json({
      error: "Failed to scan website",
      message: error.message,
      ...(error.response && { response: error.response.data }),
    });
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
