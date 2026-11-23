import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { ImpactFigures } from "@/components/ImpactFigures";
import { JsonLd } from "@/components/JsonLd";
import { LessonList } from "@/components/LessonList";
import { Portrait } from "@/components/Portrait";
import { ProjectList } from "@/components/ProjectList";
import { lessons, originStoryShort } from "@/lib/content/about";
import { getFeaturedProjects } from "@/lib/content/projects";
import { personJsonLd } from "@/lib/structured-data";
import { site } from "@/lib/site";

export default function HomePage() {
  // The top three by featuredRank. The rest are on /work/.
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <div className="mx-auto max-w-[68rem] px-5 sm:px-8">
        <Intro />

        <section id="work" aria-labelledby="work-heading" className="border-t border-line py-14 sm:py-16">
          <h2 id="work-heading" className="text-3xl">
            Work
          </h2>
          <div className="mt-8">
            <ProjectList projects={featuredProjects} />
          </div>
          <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-6">
            <Link href="/work/" className="link">
              All seven projects
            </Link>
            <Link href="/about/#experience" className="link">
              Experience and skills
            </Link>
            <Link href="/resume/" className="link">
              Résumé
            </Link>
          </p>
        </section>

        {/* Side headings from here down, so the page doesn't repeat one section layout. */}
        <section
          id="impact"
          aria-labelledby="impact-heading"
          className="grid gap-6 border-t border-line py-14 sm:py-16 md:grid-cols-[14rem_1fr] md:gap-10"
        >
          <h2 id="impact-heading" className="text-2xl text-balance">
            Outcomes from production work
          </h2>
          <ImpactFigures />
        </section>

        <section
          id="story"
          aria-labelledby="story-heading"
          className="grid gap-6 border-t border-line py-14 sm:py-16 md:grid-cols-[14rem_1fr] md:gap-10"
        >
          <h2 id="story-heading" className="text-2xl">
            How I got here
          </h2>
          <div className="max-w-[42rem]">
            <div className="space-y-4 text-lg text-pretty">
              {originStoryShort.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-5">
              <Link href="/about/#story" className="link">
                The longer version
              </Link>
            </p>
          </div>
        </section>

        <section aria-labelledby="lessons-heading" className="border-t border-line py-14 sm:py-16">
          <h2 id="lessons-heading" className="text-2xl">
            Lessons I&apos;ve kept
          </h2>
          <p className="mt-2 text-muted">Each of these started as something I got wrong.</p>
          <div className="mt-8">
            <LessonList lessons={lessons.slice(0, 3)} layout="columns" />
          </div>
          <p className="mt-8">
            <Link href="/about/#lessons" className="link">
              The rest of the lessons
            </Link>
          </p>
        </section>
      </div>

      <ContactSection />
    </>
  );
}

function Intro() {
  const resumeHref = site.resumePath ?? "/resume/";

  return (
    <section
      aria-labelledby="intro-heading"
      className="grid items-start gap-8 pt-8 pb-14 sm:pt-14 sm:pb-20 md:grid-cols-[1fr_15rem] md:gap-14"
    >
      {/* First in the DOM so phones see the photo before the headline; on desktop it sits to the right. */}
      <div className="md:col-start-2 md:row-start-1 md:pt-2">
        <Portrait priority sizes="(min-width: 768px) 15rem, 8rem" className="max-w-32 md:max-w-none" />
      </div>
      <div className="md:col-start-1 md:row-start-1">
        <h1
          id="intro-heading"
          className="text-[clamp(2.15rem,5vw,3.4rem)] leading-[1.06] tracking-[-0.018em] text-pretty"
        >
          {site.headline}
        </h1>
        <p className="mt-6 max-w-[38rem] text-xl leading-relaxed text-pretty">{site.intro}</p>
        <p className="mt-4 max-w-[38rem] text-pretty text-muted">
          {site.jobTitle} at {site.employer}, on {site.team}. Microsoft products since 2017, full time since 2018.{" "}
          {site.location}.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
          <a href={resumeHref} download={site.resumePath ? "" : undefined} className="link">
            Résumé (PDF)
          </a>
          <a href={site.github} className="link">
            GitHub
          </a>
          <a href={site.linkedin} className="link">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="link">
            Email
          </a>
        </p>
      </div>
    </section>
  );
}
