import Link from "next/link";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import type { Project } from "@/lib/content/projects";

/** A plain list of projects: title, where and when, one or two lines, and a screenshot if there is one. */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="divide-y divide-line">
      {projects.map((project) => {
        const image = project.images?.[0];
        return (
          <li key={project.slug} className="group relative py-7 first:pt-0">
            <div className={image ? "grid gap-5 sm:grid-cols-[1fr_15rem] sm:gap-10" : ""}>
              <div className="max-w-[40rem]">
                <h3 className="text-2xl text-balance">
                  <Link
                    href={`/work/${project.slug}/`}
                    className="decoration-1 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:text-accent group-hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm text-subtle">
                  {project.eyebrow}, {project.period}
                </p>
                <p className="mt-3 text-pretty text-muted">{project.summary}</p>
              </div>
              {image && (
                <div className="max-w-sm sm:pt-1">
                  <ProjectScreenshot image={image} sizes="(min-width: 640px) 15rem, 90vw" />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
