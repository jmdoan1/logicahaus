import { ProjectContainer } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";
import TypescriptPlayground from "../_components/typescript-playground";

const baseAssetUrl = "/assets/playground/typescript-playground";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Typescript Playground",
  description:
    "Write, compile, and run TypeScript code directly in your browser",
  openGraph: {
    title: "Typescript Playground",
    description:
      "Write, compile, and run TypeScript code directly in your browser",
    url: baseUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
  keywords: [
    "typescript",
    "javascript",
    "playground",
    "editor",
    "edit",
    "run",
    "compile",
    "compiler",
    "code",
    "online",
    "browser",
    "copy",
    "paste",
    "download",
    "json",
  ],
};

export default function Page() {
  return (
    <ProjectContainer>
      <TypescriptPlayground />
    </ProjectContainer>
  );
}
