import type { Lesson } from "@/lib/content/about";

type LessonListProps = {
  lessons: Lesson[];
  /** "columns" sets the lessons side by side on wide screens (home page); "stacked" keeps one column. */
  layout?: "columns" | "stacked";
};

/** Lessons from the About page. The home page shows the first few. */
export function LessonList({ lessons, layout = "stacked" }: LessonListProps) {
  return (
    <ul className={layout === "columns" ? "grid gap-x-10 gap-y-8 md:grid-cols-3" : "max-w-[42rem] space-y-8"}>
      {lessons.map((lesson) => (
        <li key={lesson.title}>
          <h3 className="text-xl italic">{lesson.title}</h3>
          <p className="mt-2 text-pretty text-muted">{lesson.story}</p>
          <p className="mt-2 text-pretty">{lesson.change}</p>
        </li>
      ))}
    </ul>
  );
}
