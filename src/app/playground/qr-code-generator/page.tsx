import {
  ProjectContainer,
  ProjectContent,
} from "@/app/_components/project-templates";
import QRCodeGenerator from "../qr";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <QRCodeGenerator />
      </ProjectContent>
    </ProjectContainer>
  );
}
