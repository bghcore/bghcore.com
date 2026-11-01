import { skillGroups } from "@/lib/content/skills";

export function SkillsOverview() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {skillGroups.map((group) => (
        <div key={group.name} className="grid gap-4 py-6 sm:grid-cols-12 sm:gap-6">
          <h3 className="font-medium sm:col-span-4">{group.name}</h3>
          <dl className="space-y-3 text-sm sm:col-span-8">
            {group.atWork.length > 0 && (
              <div>
                <dt className="font-mono text-xs text-subtle">At work</dt>
                <dd className="mt-1 leading-relaxed">{group.atWork.join(", ")}</dd>
              </div>
            )}
            {group.onOwnProjects.length > 0 && (
              <div>
                <dt className="font-mono text-xs text-subtle">Mainly on my own projects</dt>
                <dd className="mt-1 leading-relaxed text-muted">{group.onOwnProjects.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}
