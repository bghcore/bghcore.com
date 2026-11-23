import { newTerritory } from "@/lib/content/new-territory";

/** The codebases that were new to me in 2026, shown on the About page. */
export function NewTerritory() {
  return (
    <dl className="max-w-[42rem] space-y-4">
      {newTerritory.map((item) => (
        <div key={item.title}>
          <dt className="font-semibold">{item.title}</dt>
          <dd className="text-pretty text-muted">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
