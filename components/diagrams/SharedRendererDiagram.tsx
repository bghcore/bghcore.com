import { Icon } from "@/components/Icon";

// HTML boxes, same approach as the credential diagram, so the labels stay readable on a phone
// and in both themes. Nothing here goes beyond the case study text.
export function SharedRendererDiagram() {
  return (
    <figure>
      <div className="grid gap-4 lg:grid-cols-2">
        <Convergence
          kicker="Chat UI"
          sources={["Shipping Live Chat Widget", "Copilot Studio test chat"]}
          result="One shared React renderer"
          detail="CI fails if either product reimplements shared behavior."
        />
        <Convergence
          kicker="Widget settings"
          sources={["Admin center", "Copilot Studio", "Runtime widget"]}
          result="One versioned TypeScript contract"
          detail="Keeps unknown fields. Rejects unsafe CSS and URLs."
        />
      </div>
      <figcaption className="mt-4 text-sm text-pretty text-muted">
        Two products share rendering, and three configuration models share one contract, so a partial save in one
        product no longer erases settings another product wrote.
      </figcaption>
    </figure>
  );
}

function Convergence({
  kicker,
  sources,
  result,
  detail,
}: {
  kicker: string;
  sources: string[];
  result: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-line-strong p-4">
      <p className="font-mono text-xs text-subtle">{kicker}</p>
      <ul className="mt-3 space-y-2">
        {sources.map((source) => (
          <li key={source} className="rounded-md border border-line-strong bg-surface px-3 py-2 text-sm">
            {source}
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center py-2 text-center">
        <Icon name="arrow-down" className="size-4 text-accent" />
        <span className="mt-1 font-mono text-xs text-subtle">converges to</span>
      </div>
      <div className="rounded-md border border-accent bg-surface px-4 py-3">
        <p className="text-sm font-semibold">{result}</p>
        <p className="mt-1 text-sm text-pretty text-muted">{detail}</p>
      </div>
    </div>
  );
}
