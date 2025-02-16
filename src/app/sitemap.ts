import { projects } from "./global";
import { getBlogPosts } from "@/app/blog/utils";
import { playgroundSlugs } from "./playground/util";

export const baseUrl = "https://www.logica.haus";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const playgroundUrls = playgroundSlugs.map((slug) => ({
    url: `${baseUrl}/playground${slug.link}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/blog", "/contact", "/projects", "/playground"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes, ...blogs, ...projectUrls, ...playgroundUrls];
}
