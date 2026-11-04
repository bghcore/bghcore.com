import Link from "next/link";
import { AiWorkflow } from "@/components/AiWorkflow";
import { ContactSection } from "@/components/ContactSection";
import { EngineeringExplorer } from "@/components/EngineeringExplorer";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Icon } from "@/components/Icon";
import { ImpactFigures } from "@/components/ImpactFigures";
import { JsonLd } from "@/components/JsonLd";
import { PageSection } from "@/components/PageSection";
import { Portrait } from "@/components/Portrait";
import { ProjectList } from "@/components/ProjectList";
import { SkillsOverview } from "@/components/SkillsOverview";
import { aboutParagraphs } from "@/lib/content/about";
import { workflowIntro } from "@/lib/content/ai-workflow";
import { education } from "@/lib/content/experience";
import { getFeaturedProjects } from "@/lib/content/projects";
import { personJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />

      <PageSection
        id="impact"
        label="Impact"
        title="Outcomes from production work"
        intro="Architecture, production reach, cost, and test coverage. Each number is one project and one period."
      >
        <ImpactFigures />
      </PageSection>

      <PageSection
        id="work"
        label="Selected work"
        title="Contact Center, then the rest of the work"
        intro="The Dynamics 365 case study is the fullest picture of product ownership. Azure, a React forms library, and the products I run myself follow."
      >
        <ProjectList projects={featuredProjects} numbered />
        <p className="mt-6 text-sm text-pretty text-muted">
          <a href="https://www.formosaic.com" className="font-medium text-accent hover:underline">
            Formosaic playground
          </a>
          {" "}
          for config-driven React forms, conditional fields, and validation.{" "}
          <a href="https://www.civicmapshq.com" className="font-medium text-accent hover:underline">
            Civic Maps
          </a>{" "}
          is the live geographic product.
        </p>
        <Link
          href="/work/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          All seven projects
          <Icon name="arrow-right" className="size-3.5" />
        </Link>
      </PageSection>

      <PageSection
        id="explorer"
        label="By area"
        title="The same work, sorted by discipline"
        intro="Pick an area to see the contributions behind it and the project each one came from."
        layout="stacked"
      >
        <EngineeringExplorer />
      </PageSection>

      <PageSection
        id="experience"
        label="Experience"
        title="Ten years on Microsoft products"
        intro="I joined Azure CXP as a vendor engineer in 2016 and was hired full time in October 2018. Since January 2026 I've been on Dynamics 365 Contact Center."
      >
        <ExperienceTimeline />
      </PageSection>

      <PageSection
        id="how-i-work"
        label="AI-native engineering"
        title="Agents speed up the work. I own the outcome."
        intro={workflowIntro}
      >
        <AiWorkflow />
      </PageSection>

      <PageSection
        id="skills"
        label="Skills"
        title="What I work in"
        intro="Grouped by area, and split between what I use at work and what I've mainly used on my own projects."
      >
        <SkillsOverview />
        <div className="mt-10 text-sm">
          <p className="font-mono text-xs text-subtle">Education</p>
          <p className="mt-2 font-medium">{education.school}</p>
          <p className="text-muted">
            {education.degree}, {education.minor}. {education.graduated}.
          </p>
        </div>
      </PageSection>

      <PageSection id="about" label="About" title="Outside of work">
        <p className="max-w-2xl text-lg leading-relaxed text-pretty">{aboutParagraphs[4]}</p>
        <Link href="/about/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          More about me
        </Link>
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
    { label: "Since", value: "Microsoft products since 2016, full time since 2018" },
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
