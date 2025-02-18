"use client";

import Link from "next/link";
import { RiBlueskyLine, RiGithubLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { links } from "../global";
import { useMemo } from "react";

const Footer = () => {
  const pathname = usePathname();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <footer className="w-full py-6 bg-muted">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center mx-auto">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          {links(isHome).map((link, index) =>
            link === undefined ? null : (
              <Link
                key={index}
                href={link.link}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {link.title}
              </Link>
            )
          )}
          <Link
            href="/clients"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Clients
          </Link>
          <Link
            href="/rss"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            rss
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
      <div className="container px-4 md:px-6 mt-4 text-center text-sm text-muted-foreground mx-auto">
        © {new Date().getFullYear()} LogicaHaus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
