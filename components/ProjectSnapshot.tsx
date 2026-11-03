import type { ProjectSnapshot as ProjectSnapshotContent } from "@/lib/content/projects";

type ProjectSnapshotProps = {
  snapshot: ProjectSnapshotContent;
  technologies: string[];
};

export function ProjectSnapshot({ snapshot, technologies }: ProjectSnapshotProps) {
  return (
    <section aria-labelledby="snapshot-heading" className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
      <h2 id="snapshot-heading" className="font-mono text-xs text-accent">
        At a glance
      </h2>
      <dl className="mt-4 grid border-t border-line lg:grid-cols-2">
        <SnapshotItem label="Problem" className="lg:border-r lg:pr-8">
          <p>{snapshot.problem}</p>
        </SnapshotItem>
        <SnapshotItem label="My role" className="lg:pl-8">
          <p>{snapshot.role}</p>
        </SnapshotItem>
        <SnapshotItem label="Decisions" className="lg:border-r lg:pr-8">
          <ul className="space-y-2">
            {snapshot.decisions.map((decision) => (
              <li key={decision} className="relative pl-4">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-accent" />
                {decision}
              </li>
            ))}
          </ul>
        </SnapshotItem>
        <SnapshotItem label="Tradeoff" className="lg:pl-8">
          <p>{snapshot.tradeoff}</p>
        </SnapshotItem>
        <SnapshotItem label="Outcomes" className="lg:col-span-2">
          <ul className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2 sm:space-y-0">
            {snapshot.outcomes.map((outcome) => (
              <li key={outcome} className="relative pl-4">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-accent" />
                {outcome}
              </li>
            ))}
          </ul>
        </SnapshotItem>
      </dl>
      <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <li key={technology} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
            {technology}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SnapshotItem({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-b border-line py-5 ${className}`}>
      <dt className="font-mono text-xs text-subtle">{label}</dt>
      <dd className="mt-2 text-pretty leading-relaxed">{children}</dd>
    </div>
  );
}
