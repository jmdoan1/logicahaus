import {
  ProjectContainer,
  ProjectContent,
  ProjectHeader,
} from "../_components/project-templates";
import { ScrollToTopButton } from "@/app/_components/scroll-to-top-button";
import IPChecker from "./ip";
import PasswordGenerator from "./password-generator";
import QRCodeGenerator from "./qr";
import Link from "next/link";
import { playgroundSlugs } from "./util";

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectHeader className="mb-3">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-6">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <nav className="mb-8 justify-self-center">
        <ul className="flex flex-wrap justify-center space-x-2 pb-2 px-2 ">
          {playgroundSlugs
            .filter((slug) => slug.hash !== undefined)
            .map((slug) => (
              <li key={slug.name}>
                <Link
                  href={slug.hash}
                  className={`underline px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap inline-block text-muted-foreground hover:text-primary hover:bg-primary/10"`}
                >
                  {slug.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <ProjectContent className="flex flex-col gap-10 columns-2">
        <PasswordGenerator
          inline
          navUrl="/playground/easy-password-generator"
        />
        <PasswordGenerator
          cute
          inline
          navUrl="/playground/cute-password-maker"
        />
        <IPChecker inline />
        <QRCodeGenerator inline />
      </ProjectContent>
      <ScrollToTopButton />
    </ProjectContainer>
  );
}
