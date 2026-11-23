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
      <fieldset>
        <legend className="sr-only">Choose an area</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-3">
          {engineeringDomains.map((domain, index) => (
            <label
              key={domain.id}
              htmlFor={`domain-${domain.id}`}
              className="cursor-pointer text-muted underline-offset-[0.45em] hover:text-ink has-checked:text-ink has-checked:underline has-checked:decoration-accent has-checked:decoration-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-accent"
            >
              <input
                type="radio"
                name="engineering-domain"
                id={`domain-${domain.id}`}
                value={domain.id}
                defaultChecked={index === 0}
                className="sr-only"
              />
              {domain.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 max-w-[46rem]">
        {engineeringDomains.map((domain) => {
          const relatedProjects = domainProjects(domain);
          return (
            <div key={domain.id} id={`panel-${domain.id}`} className="explorer-panel">
              <h3 className="text-xl">{domain.label}</h3>
              <p className="mt-2 text-pretty text-muted">{domain.summary}</p>
              <ul className="prose-list mt-5 text-pretty">
                {domain.contributions.map((contribution) => {
                  const project = getProject(contribution.projectSlug);
                  return (
                    <li key={contribution.text}>
                      {contribution.text}
                      {project && (
                        <>
                          {" "}
                          <Link href={`/work/${project.slug}/`} className="text-sm whitespace-nowrap text-subtle underline-offset-4 hover:text-accent hover:underline">
                            ({project.name})
                          </Link>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-sm text-pretty text-muted">
                Tools: {domain.technologies.join(", ")}. Projects:{" "}
                {relatedProjects.map((project, index) => (
                  <span key={project.slug}>
                    {index > 0 && ", "}
                    <Link href={`/work/${project.slug}/`} className="link">
                      {project.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
