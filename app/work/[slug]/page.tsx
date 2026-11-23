import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { CredentialBoundaryDiagram } from "@/components/diagrams/CredentialBoundaryDiagram";
import { PortalRewriteDiagram } from "@/components/diagrams/PortalRewriteDiagram";
import { SharedRendererDiagram } from "@/components/diagrams/SharedRendererDiagram";
import { JsonLd } from "@/components/JsonLd";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import {
  getProject,
  projects,
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

/** "React, TypeScript, and Playwright" from a list of names. */
function joinAsSentence(items: string[]) {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((candidate) => candidate.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  // The stack is one sentence at the end of the page, so an empty "Technologies" section is dropped.
  const sections = project.sections.filter((section) => section.heading !== "Technologies");
  const images = project.images ?? [];

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <article className="mx-auto max-w-[68rem] px-5 sm:px-8">
        <header className="max-w-[46rem] pt-6 pb-10 sm:pt-10">
          <p className="text-sm">
            <Link href="/work/" className="text-muted underline-offset-4 hover:text-ink hover:underline">
              All work
            </Link>
          </p>
          <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
            {project.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-pretty">{project.summary}</p>
          <p className="mt-4 text-pretty text-muted">
            {project.eyebrow}. {project.role}, {project.period}. {project.status}.
          </p>
          {project.links.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        {images.length > 0 && (
          <div className={`grid gap-8 pb-12 ${images.length > 1 ? "lg:grid-cols-2" : "max-w-[56rem]"}`}>
            {images.map((image, imageIndex) => (
              <figure key={image.file}>
                <ProjectScreenshot
                  image={image}
                  sizes={images.length > 1 ? "(min-width: 1024px) 32rem, 100vw" : "(min-width: 960px) 56rem, 100vw"}
                  priority={imageIndex === 0}
                />
                {image.caption && <figcaption className="mt-2 text-sm text-pretty text-muted">{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <div className="grid gap-10 border-t border-line pt-10 pb-14 lg:grid-cols-[minmax(0,44rem)_12rem] lg:justify-between">
          <div className="min-w-0">
            <div className="space-y-11">
              {sections.map((section) => (
                <BodySection key={section.heading} section={section} />
              ))}
            </div>
            <p className="mt-11 text-pretty text-muted">Built with {joinAsSentence(project.technologies)}.</p>
            {project.note && <p className="mt-4 text-sm text-pretty text-subtle">{project.note}</p>}
          </div>

          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-8 space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${sectionAnchor(section.heading)}`}
                    className="text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav aria-label="Next project" className="border-t border-line py-8">
          <p className="text-sm text-subtle">Next</p>
          <p className="mt-1 font-serif text-2xl font-medium tracking-tight">
            <Link href={`/work/${nextProject.slug}/`} className="underline-offset-4 hover:text-accent hover:underline">
              {nextProject.title}
            </Link>
          </p>
        </nav>
      </article>
      <ContactSection />
    </>
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

const diagramComponents: Record<ProjectDiagramId, () => React.JSX.Element> = {
  "shared-renderer": SharedRendererDiagram,
  "credential-boundary": CredentialBoundaryDiagram,
  "portal-rewrite": PortalRewriteDiagram,
};

function BodySection({ section }: { section: ProjectSection }) {
  const anchor = sectionAnchor(section.heading);
  const Diagram = section.diagram ? diagramComponents[section.diagram] : undefined;
  return (
    <section id={anchor} aria-labelledby={`${anchor}-heading`}>
      <h2 id={`${anchor}-heading`} className="text-2xl text-balance">
        {section.heading}
      </h2>
      <div className="mt-3 space-y-4 text-pretty">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {Diagram && (
          <div className="py-3">
            <Diagram />
          </div>
        )}
        {section.code && (
          <figure>
            <pre
              tabIndex={0}
              className="overflow-x-auto rounded-sm border border-line bg-surface px-4 py-3 font-mono text-[0.8125rem] leading-relaxed"
            >
              <code>{section.code.source}</code>
            </pre>
            <figcaption className="mt-2 text-sm text-pretty text-muted">{section.code.caption}</figcaption>
          </figure>
        )}
        {section.bullets && (
          <ul className="prose-list">
            {section.bullets.map((bullet) => (
              <li key={bullet}>
                <BulletText text={bullet} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
