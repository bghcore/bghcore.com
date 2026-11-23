import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { JsonLd } from "@/components/JsonLd";
import { LessonList } from "@/components/LessonList";
import { NewTerritory } from "@/components/NewTerritory";
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
      <div className="mx-auto grid max-w-[68rem] gap-10 px-5 pt-8 pb-16 sm:px-8 sm:pt-14 md:grid-cols-[15rem_1fr] md:gap-14">
        <aside className="md:sticky md:top-8 md:self-start">
          <Portrait sizes="(min-width: 768px) 15rem, 10rem" priority className="max-w-40 md:max-w-none" />
          <ul className="mt-5 space-y-1 text-sm text-muted">
            <li>
              {site.jobTitle}, {site.employer}
            </li>
            <li>{site.team}</li>
            <li>{site.location}</li>
            <li>
              {education.degree}, {education.school}. {education.minor}.
            </li>
          </ul>
        </aside>

        <div className="min-w-0">
          <h1 className="text-[clamp(2.15rem,5vw,3.25rem)] tracking-[-0.018em]">About</h1>
          <div className="mt-6 max-w-[42rem] space-y-5 text-lg text-pretty">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <AboutHeading id="story">How I got here</AboutHeading>
          <div className="mt-4 max-w-[42rem] space-y-4 text-pretty">
            {originStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <AboutHeading id="lessons">Lessons I&apos;ve kept</AboutHeading>
          <p className="mt-2 text-muted">Each of these started as something I got wrong.</p>
          <div className="mt-6">
            <LessonList lessons={lessons} />
          </div>

          <AboutHeading id="experience">Nine years on Microsoft products</AboutHeading>
          <p className="mt-3 max-w-[42rem] text-pretty text-muted">
            Mindtree hired me in December 2016 and placed me on Azure CXP as a vendor engineer in 2017. Microsoft
            hired me full time in October 2018, and since January 2026 I&apos;ve been on Dynamics 365 Contact Center.
          </p>
          <div className="mt-8">
            <ExperienceTimeline />
          </div>

          <AboutHeading id="new-territory">Codebases that were new to me this year</AboutHeading>
          <p className="mt-3 max-w-[42rem] text-pretty text-muted">{throughputNote}</p>
          <div className="mt-6">
            <NewTerritory />
          </div>

          <AboutHeading id="skills">What I work in</AboutHeading>
          <p className="mt-3 max-w-[42rem] text-pretty text-muted">
            Grouped by area, and split between what I use at work and what I&apos;ve mainly used on my own projects.
          </p>
          <div className="mt-6">
            <SkillsOverview />
          </div>

          <AboutHeading id="interests">What I keep coming back to</AboutHeading>
          <dl className="mt-5 max-w-[42rem] space-y-3">
            {interests.map((interest) => (
              <div key={interest.name}>
                <dt className="inline font-semibold">{interest.name}. </dt>
                <dd className="inline text-pretty text-muted">{interest.detail}</dd>
              </div>
            ))}
          </dl>

          <AboutHeading id="in-brief">In brief</AboutHeading>
          <p className="mt-3 max-w-[42rem] text-pretty text-muted">{aboutFacts}</p>

          <p className="mt-12 max-w-[42rem]">
            The work behind all of this is on the{" "}
            <Link href="/work/" className="link">
              work page
            </Link>
            .
          </p>
        </div>
      </div>
      <ContactSection />
    </>
  );
}

function AboutHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 border-t border-line pt-8 text-2xl">
      {children}
    </h2>
  );
}
