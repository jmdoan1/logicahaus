import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import PasswordGenerator from "../password-generator";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <PasswordGenerator cute navUrl="/playground#cute-password-maker" />
        <div className="text-center text-muted-foreground underline mt-5">
          <a href="/playground/easy-password-generator">
            Looking for something a little more robust?
          </a>
        </div>
      </ProjectContent>
    </ProjectContainer>
  );
}
