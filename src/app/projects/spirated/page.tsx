import {
  FeatureList,
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "@/app/_components/project-templates";

export default function Page() {
  const baseAssetUrl = "/assets/projects/spirated";

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
        <h3 className="h3">Status: Alpha</h3>
        <br />
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
      </ProjectContent>
    </ProjectContainer>
  );
}
