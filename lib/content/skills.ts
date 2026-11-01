// Technical expertise, split by where it was used. "atWork" means real professional use at
// Microsoft; "onOwnProjects" means mainly personal projects. No proficiency levels or years.

export type SkillGroup = {
  name: string;
  atWork: string[];
  onOwnProjects: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend and product engineering",
    atWork: [
      "TypeScript",
      "JavaScript",
      "React",
      "Component architecture",
      "Complex UI state (Redux-Saga, Zustand, TanStack Query)",
      "React Hook Form",
      "Fluent UI",
      "Griffel",
      "Accessibility (WCAG 2.1)",
      "Internationalization",
      "Design systems",
    ],
    onOwnProjects: ["Next.js App Router", "Tailwind CSS"],
  },
  {
    name: "Backend and platform",
    atWork: [
      "Node.js",
      "C# / .NET",
      "REST APIs",
      "WebSocket and SSE transports",
      "OAuth 2.0, MSAL, and PKCE",
      "SDK design and npm publishing",
      "Microsoft Azure",
      "Cosmos DB",
      "Azure Search",
    ],
    onOwnProjects: ["Azure Functions", "Redis"],
  },
  {
    name: "Data and infrastructure",
    atWork: ["Telemetry and alerting", "KQL"],
    onOwnProjects: ["PostgreSQL", "PostGIS", "Docker", "Geospatial data modeling", "Data ingestion pipelines"],
  },
  {
    name: "Developer experience",
    atWork: [
      "Git and GitHub",
      "GitHub Actions",
      "Azure DevOps pipelines",
      "Feature flags and staged releases",
      "Playwright, Vitest, Jest",
      "Claude Code",
      "Cursor",
      "Grok Build",
      "GitHub Copilot CLI and coding agent",
      "MCP and agent skills",
    ],
    onOwnProjects: [],
  },
];
