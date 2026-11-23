import { skillGroups } from "@/lib/content/skills";

export function SkillsOverview() {
  return (
    <dl className="max-w-[42rem] space-y-5">
      {skillGroups.map((group) => (
        <div key={group.name}>
          <dt className="font-semibold">{group.name}</dt>
          {group.atWork.length > 0 && <dd className="text-pretty">At work: {group.atWork.join(", ")}.</dd>}
          {group.onOwnProjects.length > 0 && (
            <dd className="text-pretty text-muted">Mainly on my own projects: {group.onOwnProjects.join(", ")}.</dd>
          )}
        </div>
      ))}
    </dl>
  );
}
