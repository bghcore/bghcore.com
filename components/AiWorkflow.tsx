import { guardrails, newTerritory, throughputNote, workflowTools, type WorkflowItem } from "@/lib/content/ai-workflow";

/** The short version on the home page: the throughput line, the guardrails, and one line of tools. */
export function AiWorkflow() {
  return (
    <div>
      <p className="max-w-3xl border-y border-line py-5 text-sm text-pretty text-muted">{throughputNote}</p>

      <div className="mt-10">
        <h3 className="text-lg font-semibold tracking-tight">What keeps it trustworthy</h3>
        <p className="mt-2 max-w-2xl text-sm text-pretty text-muted">
          I decide the architecture and review the change. Agent output uses the same tests, review, and release
          gates as code I write myself.
        </p>
        <WorkflowItems items={guardrails} />
      </div>

      <p className="mt-8 max-w-3xl text-sm text-pretty text-muted">
        <span className="font-mono text-xs text-subtle">Tools</span> {workflowTools.join(", ")}.
      </p>
    </div>
  );
}

/** The codebase-by-codebase list, shown on the About page. */
export function NewTerritory() {
  return <WorkflowItems items={newTerritory} className="" />;
}

function WorkflowItems({ items, className = "mt-5" }: { items: WorkflowItem[]; className?: string }) {
  return (
    <ul className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="py-3.5">
          <p className="font-medium">{item.title}</p>
          <p className="mt-1 text-sm text-pretty text-muted">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}
