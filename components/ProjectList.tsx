import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/content/projects";

type ProjectListProps = {
  projects: Project[];
  /** Number the rows (used for the featured list on the home page). */
  numbered?: boolean;
};

export function ProjectList({ projects, numbered = false }: ProjectListProps) {
  return (
    <ol className="border-t border-line">
      {projects.map((project, index) => (
        <li key={project.slug} className="group relative border-b border-line">
          <div className="grid gap-3 py-8 sm:grid-cols-12 sm:gap-6">
            <div className="flex gap-4 sm:col-span-4 sm:flex-col sm:gap-1.5">
              {numbered && (
                <span aria-hidden="true" className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <p className="font-mono text-xs text-subtle">{project.eyebrow}</p>
              <p className="hidden font-mono text-xs text-subtle sm:block">{project.period}</p>
            </div>
            <div className="sm:col-span-8">
              <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                <Link
                  href={`/work/${project.slug}/`}
                  className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-2xl text-pretty text-muted">{project.summary}</p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-ink">
                {project.format === "case-study" ? "Read the case study" : "Project details"}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
