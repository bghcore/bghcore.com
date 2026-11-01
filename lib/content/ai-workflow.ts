// "How I work" on the home page: building with AI agents across the stack. Every claim here also
// appears, with more detail, in a case study or on the résumé. No internal names or metrics.

export type WorkflowFigure = {
  value: string;
  label: string;
};

export type WorkflowItem = {
  title: string;
  detail: string;
};

export const workflowIntro =
  "Frontend taught me to like change. A new framework or build tool every year was part of the job, and AI has brought that pace to the whole industry. Because I work across the stack, I can take it anywhere in the product.";

export const workflowFigures: WorkflowFigure[] = [
  { value: "10 months", label: "on Dynamics 365 Contact Center" },
  { value: "500+", label: "pull requests merged in that time" },
  { value: "3", label: "product organizations' codebases" },
];

/** Code I hadn't worked in before and shipped in anyway, mostly within weeks. */
export const newTerritory: WorkflowItem[] = [
  {
    title: "Copilot Studio's monorepo",
    detail:
      "Another organization's toolchain, build system, and release gates. I shipped the host side of the widget's credential boundary there.",
  },
  {
    title: "The admin center",
    detail: "An older React and Fluent UI stack, where I built the widget's appearance and dark-mode authoring.",
  },
  {
    title: "C# services",
    detail:
      "New to me this year. My first fix was for chats that went silent after an AI failure. By the end of an on-call week I had merged 10+ more, including the one that removed an outage's failure mode.",
  },
  {
    title: "Salesforce",
    detail: "A Lightning Web Component container and a host SDK for embedding the agent desktop inside Salesforce.",
  },
  {
    title: "Python and KQL",
    detail: "An on-call workbench for agents, and alert monitors I backtested against past incidents before shipping.",
  },
];

/** What keeps agent-written code trustworthy. */
export const guardrails: WorkflowItem[] = [
  {
    title: "Rules the agents read",
    detail: "Architecture rule files and agent skills, so agents follow each codebase's conventions.",
  },
  {
    title: "Tests as the gate",
    detail: "Unit tests and a three-tier Playwright suite that a change has to pass before it ships.",
  },
  {
    title: "Small, reviewable changes",
    detail: "Large refactors land as planned stacks of PRs that each change one thing.",
  },
  {
    title: "A weekly drift audit",
    detail: "An automated check that the code still matches its architecture rules.",
  },
  {
    title: "Checking it for real",
    detail: "I verify by hand where it matters, like testing a post-call survey on a live phone call.",
  },
];

export const workflowTools = [
  "Claude Code",
  "Cursor",
  "Grok Build",
  "GitHub Copilot CLI",
  "Copilot coding agent",
  "MCP servers",
  "Agent skills",
];
