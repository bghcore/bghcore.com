import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { careerPositions } from "@/lib/content/experience";

export function ExperienceTimeline() {
  return (
    <ol className="border-l border-line">
      {careerPositions.map((position) => (
        <li key={position.id} className="relative pb-14 pl-6 last:pb-0 sm:pl-8">
          <span aria-hidden="true" className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-line-strong" />
          <p className="font-mono text-xs text-subtle">
            {position.organization} · {position.period}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{position.team}</h3>
          <ul className="mt-2 space-y-0.5 text-sm">
            {position.roles.map((role) => (
              <li key={role.title} className="flex flex-wrap gap-x-2">
                <span className="font-medium">{role.title}</span>
                <span className="text-subtle">{role.period}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-pretty text-muted">{position.summary}</p>
          <ul className="mt-4 max-w-2xl space-y-2.5">
            {position.highlights.map((highlight) => (
              <li key={highlight} className="relative pl-4 text-pretty">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
          {position.caseStudySlug && (
            <Link
              href={`/work/${position.caseStudySlug}/`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Read the case study
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
