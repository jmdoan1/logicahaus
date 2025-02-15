import { BlogPosts } from "@/app/_components/posts";
import {
  ProjectContainer,
  ProjectContent,
} from "../_components/project-templates";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
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
