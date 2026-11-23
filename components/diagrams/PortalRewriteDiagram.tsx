import { Icon } from "@/components/Icon";

// HTML boxes, same approach as the other diagrams, so the labels stay readable on a phone and in
// both themes. Every value here is already stated in the case study text.
const rows = [
  { label: "Framework", before: "Knockout", after: "React and TypeScript" },
  { label: "Unit test coverage", before: "0", after: "77%+" },
  { label: "Local dev startup", before: "4:32", after: "1:34" },
];

export function PortalRewriteDiagram() {
  return (
    <figure>
      <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_8rem_1fr] sm:gap-3">
        <RewriteBox title="Before" values={rows.map((row) => ({ label: row.label, value: row.before }))} />
        <div className="flex flex-col items-center justify-center py-1 text-center">
          <Icon name="arrow-down" className="size-4 text-accent sm:hidden" />
          <Icon name="arrow-right" className="hidden size-4 text-accent sm:block" />
          <span className="mt-1 font-mono text-xs">100+ PRs</span>
          <span className="text-xs text-subtle">extension stayed in service</span>
        </div>
        <RewriteBox
          title="After"
          highlighted
          values={rows.map((row) => ({ label: row.label, value: row.after }))}
        />
      </div>
      <figcaption className="mt-4 text-sm text-pretty text-muted">
        The customer-facing Azure portal extension, before and after the rewrite. Knockout came out in small PRs
        while the extension stayed in use.
      </figcaption>
    </figure>
  );
}

function RewriteBox({
  title,
  values,
  highlighted = false,
}: {
  title: string;
  values: { label: string; value: string }[];
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-md border bg-surface px-4 py-3 ${highlighted ? "border-accent" : "border-line-strong"}`}>
      <p className="font-mono text-xs text-subtle">{title}</p>
      <dl className="mt-2 space-y-2">
        {values.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="text-sm font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
