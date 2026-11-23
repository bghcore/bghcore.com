import Link from "next/link";
import { careerPositions } from "@/lib/content/experience";

export function ExperienceTimeline() {
  return (
    <ol className="max-w-[42rem] space-y-10">
      {careerPositions.map((position) => (
        <li key={position.id}>
          <h3 className="text-xl">
            {position.organization}, {position.team}
          </h3>
          <ul className="mt-1 text-sm text-subtle">
            {position.roles.map((role) => (
              <li key={role.title + role.period}>
                {role.title}, {role.period}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-pretty">{position.summary}</p>
          <ul className="prose-list mt-3 text-pretty text-muted">
            {position.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {position.caseStudySlug && (
            <p className="mt-3">
              <Link href={`/work/${position.caseStudySlug}/`} className="link">
                Read the case study
              </Link>
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
