import Link from "next/link";
import { AiWorkflow } from "@/components/AiWorkflow";
import { ContactSection } from "@/components/ContactSection";
import { Icon } from "@/components/Icon";
import { ImpactFigures } from "@/components/ImpactFigures";
import { JsonLd } from "@/components/JsonLd";
import { PageSection } from "@/components/PageSection";
import { Portrait } from "@/components/Portrait";
import { ProjectList } from "@/components/ProjectList";
import { workflowIntro } from "@/lib/content/ai-workflow";
import { getFeaturedProjects } from "@/lib/content/projects";
import { personJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

export default function HomePage() {
  // The top three by featuredRank. The rest are on /work/.
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />

      <PageSection
        id="impact"
        label="Impact"
        title="Outcomes from production work"
        intro="Architecture, production reach, cost, and test coverage."
      >
        <ImpactFigures />
      </PageSection>

      <PageSection
        id="work"
        label="Selected work"
        title="Contact Center, then Azure and open source"
        intro="The Dynamics 365 case study is the fullest picture of product ownership. Azure and a React forms library I maintain follow."
      >
        <ProjectList projects={featuredProjects} numbered />
        <Link
          href="/work/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          All seven projects
          <Icon name="arrow-right" className="size-3.5" />
        </Link>
        <p className="mt-3 text-sm text-pretty text-muted">
          My experience timeline and skills are on the{" "}
          <Link href="/about/#experience" className="font-medium text-accent hover:underline">
            About page
          </Link>
          . The{" "}
          <Link href="/resume/" className="font-medium text-accent hover:underline">
            résumé
          </Link>{" "}
          has the role-by-role detail.
        </p>
      </PageSection>

      <PageSection
        id="how-i-work"
        label="AI-native engineering"
        title="Agents speed up the work. I own the outcome."
        intro={workflowIntro}
      >
        <AiWorkflow />
      </PageSection>

      <ContactSection />
    </>
  );
}

function Hero() {
  const facts = [
    { label: "Title", value: `${site.jobTitle}, ${site.employer}` },
    { label: "Focus", value: "React, TypeScript, full-stack architecture" },
    { label: "Now", value: site.team },
    { label: "Since", value: "Microsoft products since 2017, full time since 2018" },
    { label: "Based", value: site.location },
  ];
  const resumeHref = site.resumePath ?? "/resume/";

  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8">
        {/* First in the DOM so phones see the photo before the headline; on desktop it tops the right column. */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <Portrait
            shape="square"
            priority
            sizes="(min-width: 1024px) 22rem, 9rem"
            className="max-w-36 lg:max-w-none"
          />
        </div>
        <div className="lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <p className="font-mono text-sm text-muted">{site.name}</p>
          <h1
            id="hero-heading"
            className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.35rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
          >
            {site.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              View my work
            </Link>
            <a
              href={resumeHref}
              download={site.resumePath ? "" : undefined}
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              <Icon name="download" className="size-4" />
              Download résumé
            </a>
            <a
              href={site.github}
              className="inline-flex items-center rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              className="inline-flex items-center rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/work/dynamics-365-contact-center/" className="font-medium text-accent hover:underline">
              Dynamics 365 Contact Center case study
            </Link>
          </p>
        </div>
        <dl className="border-t border-line text-sm lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-start">
          {facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="font-mono text-xs leading-5 text-subtle">{fact.label}</dt>
              <dd className="text-pretty">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
