import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "../_components/project-templates";
import IPChecker from "./ip";
import PasswordGenerator from "./password-generator";
import QRCodeGenerator from "./qr";

export const playgroundSlugs = [
  "cute-password-maker",
  "easy-password-generator",
  "my-ip-address",
  "qr-code-generator",
];

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
        <QRCodeGenerator />
      </ProjectContent>
    </ProjectContainer>
  );
}
