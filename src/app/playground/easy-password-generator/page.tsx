import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import PasswordGenerator from "../password-generator";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <PasswordGenerator />
      </ProjectContent>
    </ProjectContainer>
  );
}
