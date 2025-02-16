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

export const playgroundSlugs = [
  { name: "Cute Password Maker", link: "/cute-password-maker" },
  {
    name: "Easy Password Generator",
    hash: "#easy-password-generator",
    link: "/easy-password-generator",
  },
  { name: "My Ip Address", hash: "#my-ip-address", link: "/my-ip-address" },
  {
    name: "Qr Code Generator",
    hash: "#qr-code-generator",
    link: "/qr-code-generator",
  },
];

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectHeader className="mb-2">Playground</ProjectHeader>
      <p className="text-center text-muted-foreground mb-6">
        A collection of tools, utilities, and fun things to play around with
      </p>
      <SlugNavigation
        slugs={playgroundSlugs.filter((slug) => slug.hash !== undefined)}
      />
      <ProjectContent className="flex flex-col gap-10">
        <PasswordGenerator />
        <IPChecker />
        <QRCodeGenerator />
      </ProjectContent>
      <ScrollToTopButton />
    </ProjectContainer>
  );
}

interface SlugNavigationProps {
  slugs: { name: string; hash: string }[];
}

export function SlugNavigation({ slugs }: SlugNavigationProps) {
  return (
    <nav className="mb-8 justify-self-center">
      <ul className="flex flex-wrap justify-center space-x-2 pb-2 px-2 ">
        {slugs.map((slug) => (
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
  );
}
