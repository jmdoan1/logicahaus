import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import PasswordGenerator from "../_components/password-generator";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/playground/easy-password-generator";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Easy Password Generator",
  description: "Generate strong passwords that are easy to remember!",
  openGraph: {
    title: "Easy Password Generator",
    description: "Generate strong passwords that are easy to remember!",
    url: baseUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: `${baseAssetUrl}/preview.png`,
    // images: new URL(`${baseAssetUrl}/preview.png`, baseUrl).toString(),
  },
  twitter: {
    card: "summary_large_image",
    images: `${baseAssetUrl}/preview.png`,
  },
  keywords: [
    "password",
    "passwords",
    "maker",
    "easy",
    "safe",
    "online",
    "safety",
    "generator",
    "strong",
    "secure",
  ],
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <PasswordGenerator navUrl="/playground#easy-password-generator" />
        <div className="text-center text-muted-foreground underline mt-5">
          <a href="/playground/cute-password-maker">
            Looking for something a little easier to remember?
          </a>
        </div>
      </ProjectContent>
    </ProjectContainer>
  );
}
