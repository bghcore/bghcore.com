import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PrintButton } from "@/components/PrintButton";
import { careerPositions, education } from "@/lib/content/experience";
import { getProject, projectGroupLabels } from "@/lib/content/projects";
import type { ResumeBullet } from "@/lib/content/resume";
import { resumePositions, resumeProjectSlugs, resumeSkills, resumeSummary } from "@/lib/content/resume";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.jobTitle} at ${site.employer}: full-stack product engineering across Dynamics 365 and Azure, built with AI coding agents.`,
  alternates: { canonical: "/resume/" },
  openGraph: { url: "/resume/" },
};

export default function ResumePage() {
  const contactItems = [
    { label: site.location },
    { label: site.email, href: `mailto:${site.email}` },
    { label: "linkedin.com/in/bradleyghanson", href: site.linkedin },
    { label: "github.com/bghcore", href: site.github },
    { label: "bghcore.com", href: site.url },
  ];
  const resumeProjects = resumeProjectSlugs.flatMap((slug) => getProject(slug) ?? []);

  return (
    <article className="mx-auto max-w-4xl px-4 pt-16 pb-24 sm:px-6 sm:pt-20 print:max-w-none print:p-0 print:text-[9.5pt] print:leading-snug">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6 print:hidden">
        <p className="font-mono text-xs text-accent">Résumé</p>
        <div className="flex flex-wrap gap-3">
          {site.resumePath && (
            <a
              href={site.resumePath}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              <Icon name="download" className="size-4" />
              Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <header className="mt-10 print:mt-0">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl print:text-[22pt]">{site.name}</h1>
        <p className="mt-2 text-lg text-muted print:mt-1 print:text-[11pt]">
          {site.jobTitle}, {site.employer} · {site.team}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted print:mt-2 print:text-[9pt]">
          {contactItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <a href={item.href} className="text-link">
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </header>

      <ResumeSection title="Summary">
        <p className="max-w-3xl text-pretty">{resumeSummary}</p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <div className="space-y-10 print:space-y-4">
          {resumePositions.map((resumePosition) => {
            const position = careerPositions.find((candidate) => candidate.id === resumePosition.positionId);
            if (!position) {
              return null;
            }
            return (
              <section key={position.id} aria-labelledby={`resume-${position.id}`} className="break-inside-auto">
                <h3 id={`resume-${position.id}`} className="text-lg font-semibold tracking-tight print:text-[11pt]">
                  {position.organization}
                  <span className="font-normal text-muted"> · {position.team}</span>
                </h3>
                <ul className="mt-1 space-y-0.5 text-sm print:mt-0 print:flex print:flex-wrap print:gap-x-4 print:space-y-0 print:text-[9pt]">
                  {position.roles.map((role) => (
                    <li key={role.title} className="flex flex-wrap gap-x-2">
                      <span className="font-medium">{role.title}</span>
                      <span className="text-subtle">{role.period}</span>
                    </li>
                  ))}
                </ul>
                {resumePosition.groups.map((group) => (
                  <div key={group.heading ?? position.id} className="mt-4 print:mt-2">
                    {group.heading && (
                      <h4 className="text-sm font-medium print:text-[9pt]">
                        {group.heading}
                        {group.period && <span className="font-normal text-subtle"> · {group.period}</span>}
                      </h4>
                    )}
                    <ul className="mt-2 space-y-2 print:mt-1 print:space-y-0.5">
                      {group.bullets.map((bullet) => (
                        <li key={bullet.lead} className="relative pl-4 text-pretty print:break-inside-avoid">
                          <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-accent" />
                          <BulletContent bullet={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        <ul className="space-y-3 print:space-y-0.5">
          {resumeProjects.map((project) => (
            <li key={project.slug} className="text-pretty print:break-inside-avoid">
              <Link href={`/work/${project.slug}/`} className="font-semibold hover:text-accent">
                {project.name}
              </Link>
              <span className="text-muted"> · {projectGroupLabels[project.group]}.</span> {project.summary}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills">
        <dl className="space-y-2 print:space-y-0.5">
          {resumeSkills.map((line) => (
            <div key={line.area} className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[11rem_1fr] print:grid-cols-[9rem_1fr]">
              <dt className="font-medium">{line.area}</dt>
              <dd className="text-pretty text-muted">{line.skills}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>

      <ResumeSection title="Education">
        <p className="font-medium">{education.school}</p>
        <p className="text-muted">
          {education.degree}, {education.minor}. {education.graduated}.
        </p>
      </ResumeSection>
    </article>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-line pt-6 print:mt-3 print:pt-2">
      <h2 className="font-mono text-xs tracking-wide text-accent uppercase print:text-[8pt]">{title}</h2>
      <div className="mt-4 print:mt-1.5">{children}</div>
    </section>
  );
}

function BulletContent({ bullet }: { bullet: ResumeBullet }) {
  return (
    <>
      <strong className="font-semibold">{bullet.lead}</strong>
      {bullet.detail && <span className="text-muted"> {bullet.detail}</span>}
    </>
  );
}
