import { impactFigures, impactNote } from "@/lib/content/experience";

/** The figures read as sentences, each led by its number. */
export function ImpactFigures() {
  const verifiedFigures = impactFigures.filter((figure) => figure.verified);

  return (
    <div className="max-w-[42rem]">
      <ul className="space-y-5">
        {verifiedFigures.map((figure) => (
          <li key={figure.label} className="text-pretty">
            <span className="font-serif text-xl font-medium">
              {figure.value} {figure.label}.
            </span>{" "}
            <span className="text-muted">{figure.context}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-pretty text-muted">{impactNote}</p>
    </div>
  );
}
