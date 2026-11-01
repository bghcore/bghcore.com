import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { CredentialBoundaryDiagram } from "@/components/diagrams/CredentialBoundaryDiagram";
import { JsonLd } from "@/components/JsonLd";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import {
  getProject,
  projects,
  type Project,
  type ProjectDiagramId,
  type ProjectSection,
} from "@/lib/content/projects";
import { projectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = project.format === "case-study" ? `Case study: ${project.title}` : project.title;
  const path = `/work/${project.slug}/`;
  const image = { url: `${path}og.png`, width: 1200, height: 630, alt: project.title };

  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title, description: project.summary, images: [image] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [image.url] },
  };
}

function sectionAnchor(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((candidate) => candidate.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const sections = withTechnologiesSection(project);
  const images = project.images ?? [];

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <article>
        <header className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16">
          <Link href="/work/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
            All work
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs text-accent">
                {project.format === "case-study" ? "Case study · " : ""}
                {project.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{project.summary}</p>
            </div>
            <dl className="self-end border-t border-line text-sm lg:col-span-4">
              <MetaRow label="Role" value={project.role} />
              <MetaRow label="Period" value={project.period} />
              <MetaRow label="Status" value={project.status} />
            </dl>
          </div>
          {project.links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        {images.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
            <div className={`grid gap-8 ${images.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {images.map((image, imageIndex) => (
                <figure key={image.file}>
                  <ProjectScreenshot
                    image={image}
                    sizes={images.length > 1 ? "(min-width: 1024px) 34rem, 100vw" : "(min-width: 1152px) 72rem, 100vw"}
                    priority={imageIndex === 0}
                  />
                  {image.caption && (
                    <figcaption className="mt-3 text-sm text-pretty text-muted">{image.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ol className="sticky top-24 space-y-2 text-sm">
                {sections.map((section, sectionIndex) => (
                  <li key={section.heading}>
                    <a
                      href={`#${sectionAnchor(section.heading)}`}
                      className="flex gap-3 text-muted hover:text-ink"
                    >
                      <span aria-hidden="true" className="font-mono text-xs leading-5 text-subtle">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              {project.note && (
                <p className="mb-12 border-l-2 border-accent bg-accent-wash px-4 py-3 text-sm text-pretty text-muted">
                  {project.note}
                </p>
              )}
              <div className="space-y-14">
                {sections.map((section, sectionIndex) => (
                  <BodySection
                    key={section.heading}
                    section={section}
                    number={sectionIndex + 1}
                    technologies={section.heading === "Technologies" ? project.technologies : undefined}
                    diagram={section.heading === "Architecture and technical decisions" ? project.diagram : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="Next project" className="border-t border-line">
          <Link
            href={`/work/${nextProject.slug}/`}
            className="group mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-10 sm:px-6"
          >
            <span>
              <span className="block font-mono text-xs text-subtle">Next</span>
              <span className="mt-1 block text-xl font-semibold tracking-tight group-hover:text-accent">
                {nextProject.title}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-5 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent"
              strokeWidth={1.75}
            />
          </Link>
        </nav>
      </article>
      <ContactSection />
    </>
  );
}

/** Every page ends with a Technologies section, filled from the project's technology list. */
function withTechnologiesSection(project: Project): ProjectSection[] {
  const hasTechnologies = project.sections.some((section) => section.heading === "Technologies");
  return hasTechnologies ? project.sections : [...project.sections, { heading: "Technologies" }];
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-line py-3">
      <dt className="font-mono text-xs leading-5 text-subtle">{label}</dt>
      <dd className="text-pretty">{value}</dd>
    </div>
  );
}

/** Bullets written as "Short label: detail" (three words or fewer) get a bold label. */
function BulletText({ text }: { text: string }) {
  const match = /^([^:.\s]+(?: [^:.\s]+){0,2}): (.+)$/.exec(text);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-semibold">{match[1]}.</strong> {match[2].charAt(0).toUpperCase() + match[2].slice(1)}
    </>
  );
}

type BodySectionProps = {
  section: ProjectSection;
  number: number;
  technologies?: string[];
  diagram?: ProjectDiagramId;
};

const diagrams: Record<ProjectDiagramId, () => React.JSX.Element> = {
  "credential-boundary": CredentialBoundaryDiagram,
};

function BodySection({ section, number, technologies, diagram }: BodySectionProps) {
  const Diagram = diagram ? diagrams[diagram] : undefined;
  const anchor = sectionAnchor(section.heading);
  return (
    <section id={anchor} aria-labelledby={`${anchor}-heading`}>
      <h2 id={`${anchor}-heading`} className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
        <span aria-hidden="true" className="font-mono text-xs font-normal text-accent">
          {String(number).padStart(2, "0")}
        </span>
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-pretty">
        {Diagram && (
          <div className="pb-4">
            <Diagram />
          </div>
        )}
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets && (
          <ul className="space-y-3">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="relative pl-5">
                <span aria-hidden="true" className="absolute top-[0.75em] left-0 h-px w-2.5 bg-accent" />
                <BulletText text={bullet} />
              </li>
            ))}
          </ul>
        )}
        {technologies && (
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
                {technology}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
