import { SBSProject } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/pharmacy-quotes";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Costco Prescription Pricing",
  description: "Costco Prescription Pricing",
  openGraph: {
    title: "Costco Prescription Pricing",
    description: "Costco Prescription Pricing",
    url: baseAssetUrl + baseAssetUrl.replace("/assets", ""),
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: `${baseAssetUrl}/preview.png`,
  },
  twitter: {
    card: "summary_large_image",
    images: `${baseAssetUrl}/preview.png`,
  },
};

export default function Page() {
  const features = [
    "Anonymous user accounts",
    "Push notifications",
    "Live database updates",
    "Admin accounts",
  ];

  return (
    <SBSProject
      title="Kirkland Washington Costco Prescription Pricing"
      description={`In the state of Washington, pharmacies are required to charge the same price for prescription drugs to all customers, regardless of whether they have insurance or not. In this pharmacy pricing app, users can anonymously submit pricing requests for their prescriptions by providing the medicine's name, strength, and quantity. Employees can then log in and edit the request for spelling errors, add price info, provide additional comments, and mark it as a hot deal. This data then becomes available for all users of the app.`}
      imageLeft={`${baseAssetUrl}/1.png`}
      imageRight={`${baseAssetUrl}/IMG_1801.png`}
      altLeft="Preview of pricing list"
      altRight="Preview of detail screen"
      imageRatio={100 / 41}
      features={features}
    />
  );
}
