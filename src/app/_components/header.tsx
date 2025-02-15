"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">LogicaHaus</span>
          </Link>
          <nav className={`hidden md:flex space-x-8`}>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button className="hidden md:inline-flex">Get Started</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
