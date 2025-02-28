import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import AccessibilityAuditor from "../_components/accessibility-auditor";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <AccessibilityAuditor />
      </ProjectContent>
    </ProjectContainer>
  );
}
