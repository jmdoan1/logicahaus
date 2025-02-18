import {
  FeatureList,
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "@/app/_components/project-templates";
import { baseUrl } from "@/app/sitemap";
import { Metadata } from "next";

const baseAssetUrl = "/assets/projects/spirated";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Spirated",
  description:
    "Rate, review, and share your favorite distilleries and spirits!",
  openGraph: {
    title: "Spirated",
    description:
      "Rate, review, and share your favorite distilleries and spirits!",
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
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectHeader>Spirated</ProjectHeader>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`${baseAssetUrl}/preview.png`}
          style={{ width: "100%", maxWidth: 800 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxWidth: "100%",
          maxHeight: 400,
          margin: 30,
        }}
      >
        <img
          src={`${baseAssetUrl}/Screenshot2.png`}
          style={{ flex: 2, objectFit: "contain" }}
        />
      </div>
      <br />
      <ProjectContent>
        <h2 className="h2">Built in Expo</h2>
        <br />
        <p className="text-center">
          Rate, review, and share your favorite distilleries and spirits!
        </p>
        <FeatureList
          features={[
            "Mobile and web functionality",
            "Responsive design for all screen sizes",
            "Personal bios",
            "Ratings and reviews",
            "Comments and likes",
            "Recent activity feeds",
            "Location based search",
            "Interactive map views",
            "Interactive list views",
            "Image upload and editing",
          ]}
        />
        <br />
        <h3 className="h3">Status: Alpha</h3>
      </ProjectContent>
    </ProjectContainer>
  );
}
