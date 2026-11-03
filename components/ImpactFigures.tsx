import { impactFigures, impactNote } from "@/lib/content/experience";

export function ImpactFigures() {
  const verifiedFigures = impactFigures.filter((figure) => figure.verified);

  return (
    <div>
      <dl className="grid border-t border-line sm:grid-cols-2">
        {verifiedFigures.map((figure) => (
          <div
            key={figure.label}
            className="flex flex-col border-b border-line py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
          >
            <dt className="order-2 mt-1 text-sm font-medium">{figure.label}</dt>
            <dd className="order-1 font-mono text-3xl tracking-tight text-ink">{figure.value}</dd>
            <dd className="order-3 mt-2 text-sm text-pretty text-muted">{figure.context}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 max-w-3xl text-sm text-pretty text-muted">{impactNote}</p>
      <p className="mt-3 text-xs text-subtle">
        Each figure comes from one project and period. They aren&apos;t lifetime totals, and they aren&apos;t added
        together.
      </p>
    </div>
  );
}
