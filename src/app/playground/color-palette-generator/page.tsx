import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";
import ColorPaletteGenerator from "../_components/color-palette-generator";

const baseAssetUrl = "/assets/playground/my-ip-address";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Color Palette Generator",
  description: "Get your public IP information",
  openGraph: {
    title: "My IP Address",
    description: "Generate harmonious color palettes for your designs",
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
    "color",
    "palette",
    "maker",
    "generator",
    "make",
    "generate",
    "palettes",
    "web",
    "design",
    "theory",
    "analogous",
    "monochromatic",
    "triadic",
    "random",
  ],
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <ColorPaletteGenerator />
      </ProjectContent>
    </ProjectContainer>
  );
}
