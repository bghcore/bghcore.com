import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { ProjectList } from "@/components/ProjectList";
import { projectGroupLabels, projects, type ProjectGroup } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work and case studies",
  description:
    "Case studies from Bradley Hanson's work at Microsoft on Dynamics 365 Contact Center and Azure, plus independent projects: Civic Maps, The Sub Delta, Formosaic, and open-source SoundCloud libraries.",
  alternates: { canonical: "/work/" },
  openGraph: { url: "/work/" },
};

const groupOrder: ProjectGroup[] = ["microsoft", "independent", "open-source", "experiment"];

const groupIntros: Record<ProjectGroup, string> = {
  microsoft: "Written only from what I can share publicly. Internal code, architecture, and metrics stay inside Microsoft.",
  independent: "Products I build and run on my own.",
  "open-source": "Libraries on npm that anyone can use.",
  experiment: "Smaller tools I built to learn something.",
};

export default function WorkPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6 sm:pt-24">
        <p className="font-mono text-xs text-accent">Work</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Case studies and projects
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">
          Each Microsoft case study follows the same structure: the problem, the constraints, the decisions, what I
          did, and what changed.
        </p>
      </div>
      {groupOrder.map((group) => {
        const groupProjects = projects.filter((project) => project.group === group);
        if (groupProjects.length === 0) return null;
        const headingId = `group-${group}`;
        return (
          <section key={group} aria-labelledby={headingId} className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 id={headingId} className="text-lg font-semibold">
                {projectGroupLabels[group]}
              </h2>
              <p className="text-sm text-muted">{groupIntros[group]}</p>
            </div>
            <ProjectList projects={groupProjects} />
          </section>
        );
      })}
      <div className="h-12" />
      <ContactSection />
    </>
  );
}
