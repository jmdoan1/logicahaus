import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import PasswordGenerator from "../_components/password-generator";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/playground/cute-password-maker";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Cute Password Maker",
  description: "Easy to remember passwords for kids!",
  openGraph: {
    title: "Cute Password Maker",
    description: "Easy to remember passwords for kids!",
    url: baseUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: `${baseAssetUrl}/preview.png`,
  },
  twitter: {
    card: "summary_large_image",
    images: `${baseAssetUrl}/preview.png`,
  },
  keywords: [
    "password",
    "maker",
    "easy",
    "cute",
    "for",
    "kids",
    "children",
    "safe",
    "online",
    "safety",
    "generator",
    "strong",
  ],
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <PasswordGenerator
          cute
          navUrl="/playground/utils#cute-password-maker"
        />
        <div className="text-center text-muted-foreground underline mt-5">
          <a href="/playground/easy-password-generator">
            Looking for something a little more robust?
          </a>
        </div>
      </ProjectContent>
    </ProjectContainer>
  );
}
