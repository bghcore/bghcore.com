import { guardrails, newTerritory, throughputNote, workflowTools, type WorkflowItem } from "@/lib/content/ai-workflow";

export function AiWorkflow() {
  return (
    <div>
      <p className="max-w-3xl border-y border-line py-5 text-sm text-pretty text-muted">{throughputNote}</p>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
        <WorkflowList
          heading="Code I hadn't worked in, shipped anyway"
          note="Agents shorten the time it takes to get productive in an unfamiliar codebase. The design and the review stay mine. These were all new to me this year."
          items={newTerritory}
        />
        <WorkflowList
          heading="What keeps it trustworthy"
          note="I decide the architecture and review the change. Agent output uses the same tests, review, and release gates as code I write myself."
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
          No single tool stays best for long. I keep two or three in rotation and switch when one gets better at
          the job in front of me.
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
