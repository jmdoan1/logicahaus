import { projects } from "./_components/portfoliogrid";
import { getBlogPosts } from "./blog/utils";

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

  const routes = ["", "/blog", "/contact", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projectUrls];
}
