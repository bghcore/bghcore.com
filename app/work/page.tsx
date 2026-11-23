import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { EngineeringExplorer } from "@/components/EngineeringExplorer";
import { JsonLd } from "@/components/JsonLd";
import { ProjectList } from "@/components/ProjectList";
import { projectGroupLabels, projects, type ProjectGroup } from "@/lib/content/projects";
import { webPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Work and case studies",
  description:
    "Case studies from Bradley Hanson's work at Microsoft on Dynamics 365 Contact Center and Azure, plus independent projects: Civic Maps, The Sub Delta, Formosaic, and open-source SoundCloud libraries.",
  alternates: { canonical: "/work/" },
  openGraph: { url: "/work/" },
};

const groupOrder: ProjectGroup[] = ["microsoft", "independent", "open-source"];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd("/work/", "Work and case studies")} />
      <div className="mx-auto max-w-[68rem] px-5 sm:px-8">
        <div className="pt-8 pb-10 sm:pt-14">
          <h1 className="text-[clamp(2.15rem,5vw,3.25rem)] tracking-[-0.018em]">Work</h1>
          <p className="mt-4 max-w-[40rem] text-lg text-pretty text-muted">
            Work at Microsoft on Dynamics 365 Contact Center and Azure, the products I build and run on my own, and
            the libraries I publish on npm.
          </p>
        </div>
        {groupOrder.map((group) => {
          const groupProjects = projects.filter((project) => project.group === group);
          if (groupProjects.length === 0) return null;
          const headingId = `group-${group}`;
          return (
            <section
              key={group}
              aria-labelledby={headingId}
              className="grid gap-4 border-t border-line py-10 md:grid-cols-[10rem_1fr] md:gap-10"
            >
              <h2 id={headingId} className="text-2xl">
                {projectGroupLabels[group]}
              </h2>
              <ProjectList projects={groupProjects} />
            </section>
          );
        })}
        <section id="explorer" aria-labelledby="explorer-heading" className="border-t border-line py-14">
          <h2 id="explorer-heading" className="text-2xl">
            By discipline
          </h2>
          <p className="mt-2 max-w-[40rem] text-pretty text-muted">
            Pick an area to see the contributions behind it and the project each one came from.
          </p>
          <div className="mt-8">
            <EngineeringExplorer />
          </div>
        </section>
      </div>
      <ContactSection />
    </>
  );
}
