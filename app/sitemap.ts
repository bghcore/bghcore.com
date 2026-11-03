import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work/", "/about/", "/resume/", "/privacy/"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}/`),
    changeFrequency: "monthly" as const,
    priority: project.slug === "dynamics-365-contact-center" ? 0.9 : project.format === "case-study" ? 0.8 : 0.6,
  }));
  return [...pages, ...projectPages];
}
