import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "../_components/project-templates";
import IPChecker from "./ip";
import PasswordGenerator from "./password-generator";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectHeader className="mb-2">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-14">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <ProjectContent className="flex flex-col gap-10">
        <PasswordGenerator />
        <IPChecker />
      </ProjectContent>
    </ProjectContainer>
  );
}
