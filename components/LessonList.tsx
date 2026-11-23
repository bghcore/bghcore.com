import type { Lesson } from "@/lib/content/about";

/** Lessons from the About page. The home page shows the first few. */
export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <ol className="space-y-8">
      {lessons.map((lesson, lessonIndex) => (
        <li key={lesson.title} className="grid gap-2 sm:grid-cols-[2.5rem_1fr]">
          <span aria-hidden="true" className="font-mono text-xs leading-7 text-accent">
            {String(lessonIndex + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-medium">{lesson.title}</h3>
            <p className="mt-2 text-pretty text-muted">{lesson.story}</p>
            <p className="mt-2 text-pretty">{lesson.change}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
