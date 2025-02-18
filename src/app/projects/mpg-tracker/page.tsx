import { SBSProject } from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/mpg-tracker";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "MPG Pro",
  description: "Multi-Vehicle Fuel Efficiency Tracker",
  openGraph: {
    title: "MPG Pro",
    description: "Multi-Vehicle Fuel Efficiency Tracker",
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
  const iaps = [
    "Ad Free: $0.99 (Tier 1)",
    "Pro: $1.99 (Tier 2) - allows multiple users per account + CSV exports",
  ];

  return (
    <SBSProject
      title="MPG: Multi-Vehicle Fuel Efficiency Tracker"
      description={`"MPG: Multi-Vehicle Fuel Efficiency Tracker" is a simple app for users to track their historical fuel economy (miles per gallon) every time they fill up their tank. The user can create a list of multiple vehicles and track them individually. At each fill-up, the user will enter A) date, B) mileage, C) gallons, D) total cost. Every time the view is loaded, the app orders fill-ups by date, calculates MPG for each 'trip', and calculates average MPG, average cost per mile, and total cost.`}
      lists={[{ title: "In-App Purchases", items: iaps }]}
      imageLeft={`${baseAssetUrl}/mpg-1.png`}
      imageRight={`${baseAssetUrl}/mpg-2.png`}
      altLeft="Preview of vehicle list"
      altRight="Preview of fillup screen"
      imageRatio={100 / 41}
    />
  );
}
