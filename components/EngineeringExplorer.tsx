import Link from "next/link";
import { engineeringDomains, type EngineeringDomain } from "@/lib/content/explorer";
import { getProject } from "@/lib/content/projects";

// The selection state lives in a native radio group. CSS :has() reads it to show one panel, so the
// explorer ships no JavaScript and works with scripts off.
function buildExplorerStyles() {
  const rules = engineeringDomains.map(
    (domain) => `.explorer:has(#domain-${domain.id}:checked) #panel-${domain.id}{display:block}`,
  );
  return `@supports selector(:has(a)){${rules.join("")}}`;
}

/** The projects a domain's contributions come from, in first-appearance order. */
function domainProjects(domain: EngineeringDomain) {
  const slugs = [...new Set(domain.contributions.map((contribution) => contribution.projectSlug))];
  return slugs.flatMap((slug) => getProject(slug) ?? []);
}

export function EngineeringExplorer() {
  return (
    <div className="explorer">
      <style href="engineering-explorer" precedence="default">
        {buildExplorerStyles()}
      </style>
      <div className="grid gap-8 lg:grid-cols-12">
        <fieldset className="lg:col-span-4">
          <legend className="mb-3 font-mono text-xs text-subtle">Choose an area</legend>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-y lg:border-line">
            {engineeringDomains.map((domain, index) => (
              <label
                key={domain.id}
                htmlFor={`domain-${domain.id}`}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-line px-3 py-2 text-sm text-muted transition-colors hover:text-ink has-checked:border-accent has-checked:bg-accent-wash has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-1 lg:py-3.5 lg:text-base lg:last:border-b-0 lg:has-checked:border-line lg:has-checked:bg-transparent"
              >
                <input
                  type="radio"
                  name="engineering-domain"
                  id={`domain-${domain.id}`}
                  value={domain.id}
                  defaultChecked={index === 0}
                  className="sr-only"
                />
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-4 bg-line-strong transition-all group-has-checked:w-6 group-has-checked:bg-accent lg:block"
                  />
                  {domain.label}
                </span>
                <span className="hidden font-mono text-xs text-subtle lg:inline" aria-hidden="true">
                  {domain.contributions.length}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="min-w-0 lg:col-span-8">
          {engineeringDomains.map((domain) => {
            const relatedProjects = domainProjects(domain);
            return (
              <div key={domain.id} id={`panel-${domain.id}`} className="explorer-panel">
                <h3 className="text-xl font-semibold tracking-tight">{domain.label}</h3>
                <p className="mt-2 max-w-xl text-pretty text-muted">{domain.summary}</p>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {domain.contributions.map((contribution) => {
                    const project = getProject(contribution.projectSlug);
                    return (
                      <li key={contribution.text} className="grid gap-1.5 py-4 sm:grid-cols-[1fr_11rem] sm:gap-6">
                        <p className="text-pretty">{contribution.text}</p>
                        {project && (
                          <Link
                            href={`/work/${project.slug}/`}
                            className="inline-flex items-start gap-1.5 font-mono text-xs leading-5 text-subtle hover:text-accent sm:justify-self-end sm:text-right"
                          >
                            {project.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <dl className="mt-5 grid gap-x-6 gap-y-2 font-mono text-xs leading-6 sm:grid-cols-[4.5rem_1fr]">
                  <dt className="text-muted">Projects</dt>
                  <dd className="flex flex-wrap gap-2">
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/work/${project.slug}/`}
                        className="rounded-md border border-line px-2.5 py-0.5 text-muted transition-colors hover:border-accent hover:text-ink"
                      >
                        {project.name}
                      </Link>
                    ))}
                  </dd>
                  <dt className="text-muted">Tools</dt>
                  <dd className="text-subtle">{domain.technologies.join(" · ")}</dd>
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
