type PageSectionProps = {
  id: string;
  label: string;
  title: string;
  intro?: string;
  /** "split" puts the heading in a narrow left column; "stacked" puts it above full-width content. */
  layout?: "split" | "stacked";
  children: React.ReactNode;
};

export function PageSection({ id, label, title, intro, layout = "split", children }: PageSectionProps) {
  const headingId = `${id}-heading`;
  const isSplit = layout === "split";

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line">
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 ${isSplit ? "lg:grid-cols-12 lg:gap-8" : ""}`}
      >
        <div className={isSplit ? "lg:col-span-4" : "max-w-2xl"}>
          <div className={isSplit ? "lg:sticky lg:top-24" : ""}>
            <p className="font-mono text-xs text-accent">{label}</p>
            <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-md text-pretty text-muted">{intro}</p>}
          </div>
        </div>
        <div className={isSplit ? "min-w-0 lg:col-span-8" : "min-w-0"}>{children}</div>
      </div>
    </section>
  );
}
