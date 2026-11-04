import type { Metadata } from "next";
import Link from "next/link";
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

const groupOrder: ProjectGroup[] = ["microsoft", "independent", "open-source"];

const groupIntros: Record<ProjectGroup, string> = {
  microsoft: "From my public résumé and Microsoft's public repositories.",
  independent: "Products I build and run on my own.",
  "open-source": "Libraries on npm that anyone can use.",
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
          Start with the{" "}
          <Link href="/work/dynamics-365-contact-center/" className="text-accent hover:underline">
            Dynamics 365 Contact Center case study
          </Link>
          . It is the fullest public view of product ownership: React and TypeScript architecture, a shared chat
          platform, and the services behind it. Azure work and the products I run myself follow.
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
