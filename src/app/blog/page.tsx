import { BlogPosts } from "@/app/_components/posts";
import {
  ProjectContainer,
  ProjectContent,
} from "../_components/project-templates";
import { baseUrl } from "../sitemap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "The LogicaBlog",
  openGraph: {
    title: "LogicaHaus Blog",
    description: "The LogicaBlog",
    url: `${baseUrl}/blog`,
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
};

export default function Page() {
  return (
    <ProjectContainer>
      <ProjectContent>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          Blog Posts
        </h1>
        <BlogPosts />
      </ProjectContent>
    </ProjectContainer>
  );
}
