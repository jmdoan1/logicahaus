import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import {
  ProjectContainer,
  ProjectContent,
} from "../_components/project-templates";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ProjectContainer>
        <ProjectContent className="flex justify-center w-[100%]">
          {children}
        </ProjectContent>
      </ProjectContainer>
    </ClerkProvider>
  );
}
