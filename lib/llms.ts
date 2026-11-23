// Plain-Markdown summaries of the site for language models, served at /llms.txt and /llms-full.txt.
// Both are built from the same content files as the pages, so they can't drift from the site.
// Imports are relative so the test build can load this file without the "@/" alias.

import { aboutFacts, aboutParagraphs, lessons, originStory } from "./content/about";
import { careerPositions, education } from "./content/experience";
import { projects, type Project } from "./content/projects";
import { absoluteUrl, site } from "./site";

const staticPages = [
  { path: "/", title: "Home", line: "A short introduction, selected work, and how to get in touch." },
  { path: "/work/", title: "Work", line: "Every case study and project, grouped by Microsoft, independent, and open source." },
  { path: "/about/", title: "About", line: "Background, experience by role, skills, and lessons learned." },
  { path: "/resume/", title: "Résumé", line: "Roles, dates, and skills on one page." },
];

function projectLine(project: Project) {
  return `- [${project.title}](${absoluteUrl(`/work/${project.slug}/`)}): ${project.summary}`;
}

function contactSection() {
  return [
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.linkedin}`,
    `- GitHub: ${site.github}`,
  ];
}

/** The index: a summary, the key pages with one line each, and contact links. */
export function buildLlmsTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${aboutFacts}`,
    "",
    "## Pages",
    "",
    ...staticPages.map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.line}`),
    ...(site.resumePath ? [`- [Résumé (PDF)](${absoluteUrl(site.resumePath)}): The same résumé as a PDF.`] : []),
    "",
    "## Work",
    "",
    ...projects.map(projectLine),
    "",
    ...contactSection(),
    "",
    "## More",
    "",
    `- [Full text of the site](${absoluteUrl("/llms-full.txt")}): The About page, experience, and every project page as Markdown.`,
  ];
  return `${lines.join("\n")}\n`;
}

function projectFullText(project: Project) {
  const lines = [
    `## ${project.title}`,
    "",
    `${absoluteUrl(`/work/${project.slug}/`)}`,
    "",
    `${project.eyebrow}. ${project.role}, ${project.period}. ${project.status}.`,
    "",
    project.summary,
    "",
  ];
  for (const section of project.sections) {
    if (!section.paragraphs && !section.bullets && !section.code) continue;
    lines.push(`### ${section.heading}`, "");
    for (const paragraph of section.paragraphs ?? []) lines.push(paragraph, "");
    if (section.code) lines.push("```ts", section.code.source, "```", "");
    if (section.bullets) lines.push(...section.bullets.map((bullet) => `- ${bullet}`), "");
  }
  lines.push(`Technologies: ${project.technologies.join(", ")}.`, "");
  if (project.note) lines.push(project.note, "");
  return lines;
}

/** The long version: the About page, experience, and every project page. */
export function buildLlmsFullTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${aboutFacts}`,
    "",
    "## About",
    "",
    ...aboutParagraphs.flatMap((paragraph) => [paragraph, ""]),
    "### How I got here",
    "",
    ...originStory.flatMap((paragraph) => [paragraph, ""]),
    "### Lessons I've kept",
    "",
    ...lessons.flatMap((lesson) => [`- ${lesson.title}. ${lesson.story} ${lesson.change}`]),
    "",
    "## Experience",
    "",
    ...careerPositions.flatMap((position) => [
      `### ${position.organization}, ${position.team}`,
      "",
      ...position.roles.map((role) => `- ${role.title}, ${role.period}`),
      "",
      position.summary,
      "",
      ...position.highlights.map((highlight) => `- ${highlight}`),
      "",
    ]),
    `Education: ${education.degree}, ${education.school}. ${education.minor}. ${education.graduated}.`,
    "",
    ...projects.flatMap(projectFullText),
    ...contactSection(),
  ];
  return `${lines.join("\n")}\n`;
}
