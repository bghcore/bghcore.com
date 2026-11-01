import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { engineeringDomains } from "@/lib/content/explorer";
import { getProject, projects } from "@/lib/content/projects";

// The selection state lives in a native radio group. CSS :has() reads it to show one panel and
// highlight matching projects, so the explorer ships no JavaScript and works with scripts off.
function buildExplorerStyles() {
  const rules = engineeringDomains.map((domain) => {
    const selected = `.explorer:has(#domain-${domain.id}:checked)`;
    return [
      `${selected} #panel-${domain.id}{display:block}`,
      `${selected} .explorer-project:not([data-domains~="${domain.id}"]){opacity:.38}`,
      `${selected} .explorer-project[data-domains~="${domain.id}"]{border-color:var(--accent);color:var(--ink)}`,
    ].join("");
  });
  return `@supports selector(:has(a)){${rules.join("")}}`;
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
          <ul aria-label="Projects" className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}/`}
                  data-domains={project.domains.join(" ")}
                  className="explorer-project inline-block rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted hover:text-ink"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>

          {engineeringDomains.map((domain) => (
            <div key={domain.id} id={`panel-${domain.id}`} className="explorer-panel mt-8">
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
                          className="group inline-flex items-start gap-1.5 font-mono text-xs leading-5 text-subtle hover:text-accent sm:justify-self-end sm:text-right"
                        >
                          {project.name}
                          <ArrowRight aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 font-mono text-xs leading-6 text-subtle">
                <span className="text-muted">Tools: </span>
                {domain.technologies.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
