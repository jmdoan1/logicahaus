import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import Animations from "../_components/animations";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <Animations />
      </ProjectContent>
    </ProjectContainer>
  );
}
