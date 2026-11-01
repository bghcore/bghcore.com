// About page copy, in my own voice.

export const aboutParagraphs = [
  "I'm a software engineer in the Seattle area. I've worked on Microsoft products since 2016, first as a vendor engineer through Mindtree and then at Microsoft from October 2018. Today I'm on Dynamics 365 Contact Center, working on the Live Chat Widget that businesses put on their websites and its integration into Copilot Studio.",
  "Most of what I build is React and TypeScript. I like the frontend problems that look simple from the outside: a chat window that has to keep a conversation going across an iframe boundary, or a form whose fields change based on business rules. When a bug starts in the UI and ends in a C# service, I'd rather follow it down than hand it off.",
  "I also build a lot outside of work. The Sub Delta is a music-discovery app for SoundCloud, and building it produced three open-source TypeScript packages. Civic Maps is about a question that should be easy to answer: who governs a given place? My TagPro tools came from wanting to understand the replay files of a browser game I play.",
  "I use AI coding agents every day, at work and on my own projects. At work I've spent real time on the guardrails that make them useful on a team: architecture rule files, agent skills, and a weekly check for architectural drift.",
];

export type Interest = {
  name: string;
  detail: string;
};

export const interests: Interest[] = [
  {
    name: "Music and audio technology",
    detail: "The Sub Delta and the SoundCloud libraries it runs on.",
  },
  {
    name: "Civic technology",
    detail: "Civic Maps, and the public data behind it: Census geography, Congress.gov, Open States.",
  },
  {
    name: "Developer tooling",
    detail: "SDKs, test architecture, release workflows, and rules that help AI agents follow a codebase's conventions.",
  },
  {
    name: "Product design",
    detail: "The details that decide whether something feels finished, like dark-mode authoring for a chat widget or a rating dialog that works with a screen reader.",
  },
  {
    name: "Automation",
    detail: "On-call tooling at work, and scheduled ingest jobs that keep Civic Maps current.",
  },
  {
    name: "New technology",
    detail: "I try new tools on my own projects first. Civic Maps runs on a CesiumJS globe, and most of my side projects are built with AI coding agents.",
  },
];
