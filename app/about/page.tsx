import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { JsonLd } from "@/components/JsonLd";
import { LessonList } from "@/components/LessonList";
import { NewTerritory } from "@/components/NewTerritory";
import { PageSection } from "@/components/PageSection";
import { Portrait } from "@/components/Portrait";
import { SkillsOverview } from "@/components/SkillsOverview";
import { aboutFacts, aboutParagraphs, interests, lessons, originStory } from "@/lib/content/about";
import { education } from "@/lib/content/experience";
import { throughputNote } from "@/lib/content/new-territory";
import { site } from "@/lib/site";
import { profilePageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bradley Hanson is a Seattle-area software engineer on Dynamics 365 Contact Center at Microsoft. He builds React and TypeScript products at work and music, civic, and developer tools on his own.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Portrait sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 60vw" priority className="mb-10 max-w-64 lg:max-w-none" />
          <p className="font-mono text-xs text-accent">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{site.name}</h1>
          <dl className="mt-8 border-t border-line text-sm">
            <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="font-mono text-xs leading-5 text-subtle">Role</dt>
              <dd>
                {site.jobTitle}, {site.employer}
              </dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="font-mono text-xs leading-5 text-subtle">Team</dt>
              <dd>{site.team}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="font-mono text-xs leading-5 text-subtle">Based</dt>
              <dd>{site.location}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3">
              <dt className="font-mono text-xs leading-5 text-subtle">Education</dt>
              <dd>
                {education.degree}, {education.school}. {education.minor}.
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-6 text-lg leading-relaxed text-pretty">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h2 id="story" className="mt-16 text-xl font-semibold tracking-tight">
            How I got here
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-pretty text-muted">
            {originStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h2 className="mt-16 text-xl font-semibold tracking-tight">What I keep coming back to</h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {interests.map((interest) => (
              <div key={interest.name} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-medium">{interest.name}</dt>
                <dd className="text-pretty text-muted">{interest.detail}</dd>
              </div>
            ))}
          </dl>
          <h2 id="lessons" className="mt-16 text-xl font-semibold tracking-tight">
            Lessons I&apos;ve kept
          </h2>
          <p className="mt-2 text-pretty text-muted">Each of these started as something I got wrong.</p>
          <div className="mt-6">
            <LessonList lessons={lessons} />
          </div>
          <h2 id="in-brief" className="mt-16 text-xl font-semibold tracking-tight">
            In brief
          </h2>
          <p className="mt-4 text-pretty text-muted">{aboutFacts}</p>
          <p className="mt-10 text-muted">
            The work behind all of this is on the{" "}
            <Link href="/work/" className="text-link text-ink">
              work page
            </Link>
            .
          </p>
        </div>
      </div>

      <PageSection
        id="experience"
        label="Experience"
        title="Nine years on Microsoft products"
        intro="Mindtree hired me in December 2016 and placed me on Azure CXP as a vendor engineer in 2017. Microsoft hired me full time in October 2018, and since January 2026 I've been on Dynamics 365 Contact Center."
      >
        <ExperienceTimeline />
      </PageSection>

      <PageSection
        id="new-territory"
        label="2026"
        title="Codebases that were new to me this year"
        intro={throughputNote}
      >
        <NewTerritory />
      </PageSection>

      <PageSection
        id="skills"
        label="Skills"
        title="What I work in"
        intro="Grouped by area, and split between what I use at work and what I've mainly used on my own projects."
      >
        <SkillsOverview />
      </PageSection>

      <ContactSection />
    </>
  );
}
