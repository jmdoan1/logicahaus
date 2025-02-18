import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import QRCodeGenerator from "../qr";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/playground/qr-code-generator";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "QR Code Generator",
  description: "Create and download QR codes for any text or URL",
  openGraph: {
    title: "QR Code Generator",
    description: "Create and download QR codes for any text or URL",
    url: baseAssetUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
  keywords: ["qr", "code", "generator", "maker", "easy"],
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <QRCodeGenerator />
      </ProjectContent>
    </ProjectContainer>
  );
}
