// "New codebases in 2026" on the About page.
// Every claim also appears, with more detail, in a case study or on the résumé. No internal names.

export type WorkflowItem = {
  title: string;
  detail: string;
};

/** Throughput, kept off the impact figures on purpose. The scope is in the sentence itself. */
export const throughputNote =
  "In 10 months on Dynamics 365 Contact Center I merged 500+ pull requests across three product organizations' codebases.";

/** Code I hadn't worked in before and shipped in anyway, mostly within weeks. */
export const newTerritory: WorkflowItem[] = [
  {
    title: "Copilot Studio's builder UX repository",
    detail:
      "Another organization's repository. I shipped the host side of the widget's credential boundary there.",
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
