import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import PasswordGenerator from "../password-generator";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <PasswordGenerator navUrl="/playground#easy-password-generator" />
        <div className="text-center text-muted-foreground underline mt-5">
          <a href="/playground/cute-password-maker">
            Looking for something a little easier to remember?
          </a>
        </div>
      </ProjectContent>
    </ProjectContainer>
  );
}
