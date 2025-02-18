import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import IPChecker from "../_components/ip";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/playground/my-ip-address";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "My IP Address",
  description: "Get your public IP information",
  openGraph: {
    title: "My IP Address",
    description: "Get your public IP information",
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
  keywords: ["check", "my", "ip", "address", "what", "is", "host"],
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <IPChecker />
      </ProjectContent>
    </ProjectContainer>
  );
}
