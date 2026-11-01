import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { Portrait } from "@/components/Portrait";
import { aboutParagraphs, interests } from "@/lib/content/about";
import { education } from "@/lib/content/experience";
import { site } from "@/lib/site";

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
          <h2 className="mt-16 text-xl font-semibold tracking-tight">What I keep coming back to</h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {interests.map((interest) => (
              <div key={interest.name} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-medium">{interest.name}</dt>
                <dd className="text-pretty text-muted">{interest.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-muted">
            The work behind all of this is on the{" "}
            <Link href="/work/" className="text-link text-ink">
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
