import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import IPChecker from "../ip";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <IPChecker />
      </ProjectContent>
    </ProjectContainer>
  );
}
