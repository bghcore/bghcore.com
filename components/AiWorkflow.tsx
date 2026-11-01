import { guardrails, newTerritory, workflowFigures, workflowTools, type WorkflowItem } from "@/lib/content/ai-workflow";

export function AiWorkflow() {
  return (
    <div>
      <dl className="flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5">
        {workflowFigures.map((figure) => (
          <div key={figure.label} className="flex items-baseline gap-2.5">
            {/* The label is the term; it sits after the value visually. */}
            <dt className="order-2 text-sm text-muted">{figure.label}</dt>
            <dd className="order-1 text-2xl font-semibold tracking-tight">{figure.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
        <WorkflowList
          heading="Code I hadn't worked in, shipped anyway"
          note="Agents shorten the time it takes to get productive in an unfamiliar codebase. These were all new to me this year."
          items={newTerritory}
        />
        <WorkflowList
          heading="What keeps it trustworthy"
          note="Speed only matters if the code holds up, so the agents work inside guardrails."
          items={guardrails}
        />
      </div>

      <div className="mt-12">
        <h3 className="font-mono text-xs text-subtle">Tools I use and keep testing</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {workflowTools.map((tool) => (
            <li key={tool} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
              {tool}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-pretty text-muted">
          I pick the agent and the model for the job, follow how they change, and keep adjusting the workflow. This
          site was built the same way.
        </p>
      </div>
    </div>
  );
}

function WorkflowList({ heading, note, items }: { heading: string; note: string; items: WorkflowItem[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight">{heading}</h3>
      <p className="mt-2 text-sm text-pretty text-muted">{note}</p>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.title} className="py-3.5">
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-pretty text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
