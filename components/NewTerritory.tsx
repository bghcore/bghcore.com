import { newTerritory } from "@/lib/content/new-territory";

/** The codebases that were new to me in 2026, shown on the About page. */
export function NewTerritory() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {newTerritory.map((item) => (
        <li key={item.title} className="py-3.5">
          <p className="font-medium">{item.title}</p>
          <p className="mt-1 text-sm text-pretty text-muted">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}
