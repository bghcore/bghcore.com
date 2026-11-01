import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { EngineeringExplorer } from "@/components/EngineeringExplorer";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ImpactFigures } from "@/components/ImpactFigures";
import { JsonLd } from "@/components/JsonLd";
import { PageSection } from "@/components/PageSection";
import { Portrait } from "@/components/Portrait";
import { ProjectList } from "@/components/ProjectList";
import { SkillsOverview } from "@/components/SkillsOverview";
import { aboutParagraphs } from "@/lib/content/about";
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
        id="work"
        label="Selected work"
        title="Products at Microsoft, and things I build on my own"
        intro="Two case studies from my work at Microsoft, written from what I can share publicly, and the independent projects I spend the most time on."
      >
        <ProjectList projects={featuredProjects} numbered />
        <Link
          href="/work/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          All projects, including The Sub Delta, Formosaic, and my wedding website
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </PageSection>

      <PageSection
        id="explorer"
        label="Engineering explorer"
        title="Where each kind of work shows up"
        intro="Pick an area to see the specific contributions behind it and the projects they came from."
        layout="stacked"
      >
        <EngineeringExplorer />
      </PageSection>

      <PageSection
        id="experience"
        label="Experience"
        title="Ten years on Microsoft products"
        intro="Two years as a vendor engineer, then Microsoft from October 2018. My title is Software Engineer II."
      >
        <ExperienceTimeline />
        <div className="mt-16">
          <h3 className="font-mono text-xs text-subtle">Measured results</h3>
          <div className="mt-4">
            <ImpactFigures />
          </div>
        </div>
      </PageSection>

      <PageSection
        id="skills"
        label="Technical expertise"
        title="What I use, and where"
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

      <PageSection id="about" label="About" title="I build outside of work, too">
        <div className="grid max-w-3xl gap-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
          <Portrait sizes="(min-width: 640px) 11rem, 50vw" className="max-w-44" />
          <div className="space-y-5 text-lg leading-relaxed text-pretty">
            <p>{aboutParagraphs[1]}</p>
            <p className="text-muted">{aboutParagraphs[2]}</p>
          </div>
        </div>
        <Link href="/about/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          More about me
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </PageSection>

      <ContactSection />
    </>
  );
}

function Hero() {
  const facts = [
    { label: "Now", value: `${site.team}: the Live Chat Widget and its Copilot Studio integration` },
    { label: "Before", value: "Azure Customer Experience Engineering, 2018 to 2026" },
    { label: "Role", value: `${site.jobTitle}, ${site.employer}` },
    { label: "Focus", value: site.focus },
    { label: "Based", value: site.location },
  ];

  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h1 id="hero-heading" className="font-mono text-sm text-muted">
            {site.name}
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-balance">
            {site.headline}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              View my work
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <dl className="self-end border-t border-line text-sm lg:col-span-4">
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
