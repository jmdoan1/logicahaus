import NewTabLink from "@/app/_components/new-tab-link";
import "./page.css";
import { ProjectContainer } from "@/app/_components/project-templates";

export default function Page() {
  const baseAssetUrl = "/assets/projects/dashr-og";
  return (
    <ProjectContainer>
      <h1 className="h1">Dashr: The Dashcam App</h1>
      <div className="sbs">
        <img src={`${baseAssetUrl}/IMG_4173.png`} className="left" />
        <img src={`${baseAssetUrl}/download.png`} className="right" />
      </div>
      <div className="max-w-[1000px] mx-auto">
        Dashr is a beautiful dashcam app with map, speed, and music control
        overlays. Once the recording is finished, the overlays are also included
        in the exported video!
        <br />
        <br />
        Pro users will be able to choose which overlays to include in both the
        app and the exported videos.
        <br />
        <br />
        <h2 className="h2">STATUS</h2>
        <NewTabLink href="/projects/dashr">
          <h3 className="h3 link">Replaced with new project</h3>
        </NewTabLink>
      </div>
    </ProjectContainer>
  );
}
