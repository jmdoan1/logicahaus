import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import ChartsAndData from "../_components/charts-and-data";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <ChartsAndData />
      </ProjectContent>
    </ProjectContainer>
  );
}
