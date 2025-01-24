import Link from "next/link";
import { RiBlueskyLine, RiGithubLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-muted">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/logicahaus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <RiGithubLine className="h-8 w-8" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://bsky.app/profile/logicahaus.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <RiBlueskyLine className="h-8 w-8" />
            <span className="sr-only">Bluesky</span>
          </Link>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LogicaHaus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
