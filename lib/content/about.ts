// About page copy, in my own voice.

export const aboutParagraphs = [
  "I'm a full-stack software engineer in the Seattle area. I've worked on Microsoft products since 2016, first as a vendor engineer through Mindtree and then at Microsoft from October 2018. Today I'm on Dynamics 365 Contact Center, working on the Live Chat Widget that businesses put on their websites and its integration into Copilot Studio.",
  "Frontend taught me to like change. Before AI, frontend developers complained all the time about how fast the ground moved: a new framework, a new major version, a new build tool every year. I enjoyed it. Learning the new thing was part of the job. AI has brought that pace to the whole industry, and backend engineers can't wait it out either. I already worked across the stack, so the same habit now lets me take on work anywhere in the product.",
  "I build with AI coding agents every day. I've worked with Claude Code, Cursor, Grok Build, and GitHub Copilot's CLI and coding agent, and I pick the tool and the model for each job. I follow how these tools change and keep adjusting my workflow. That's how I joined Dynamics 365 Contact Center in January 2026 and was soon shipping in code I'd never seen: Copilot Studio's monorepo, the admin center's older React stack, and C# services I hadn't worked in before.",
  "Speed only counts if the code holds up. At work I've put real time into the guardrails that make agents useful on a team: architecture rule files, agent skills, tests that gate releases, and a weekly check for architectural drift. When I moved on from the agent desktop, the larger team that took it over kept building on that foundation.",
  "I also build a lot outside of work. The Sub Delta is a music-discovery app for SoundCloud that I've been rebuilding since 2015, and the latest version produced three open-source TypeScript packages. Civic Maps is about a question that should be easy to answer: who governs a given place? When I got married in 2026, I built our wedding website and its RSVP system myself. This site was built the same way, with AI coding agents.",
];

export type Lesson = {
  title: string;
  story: string;
  change: string;
};

// Each lesson is a real mistake or miss, and what I do differently because of it.
export const lessons: Lesson[] = [
  {
    title: "Unit tests aren't the release gate",
    story:
      "My first big customer-facing release, a rewrite of an Azure portal extension, went out with a few bugs that unit tests had no way to catch. They lived in how the pieces fit together.",
    change:
      "I made end-to-end tests a release gate there, and on my next greenfield project I set up a three-tier Playwright suite before launch.",
  },
  {
    title: "Split security fixes along package lines",
    story:
      "A security fix that touched several packages at once had to be reverted, and work stacked on top of it came out with it.",
    change:
      "I now split fixes like that by package so each one ships and rolls back on its own. The security fixes I shipped after that went out without a revert.",
  },
  {
    title: "Don't lazy-load anything that listens",
    story:
      "I lazy-loaded a voice module to shrink a bundle. It subscribes to call events the moment a call arrives, so loading it late meant missing events. I reverted it two days later.",
    change:
      "I wrote the rule into the team's coding guidelines, where both people and AI agents read it: no dynamic imports on real-time event paths.",
  },
  {
    title: "A fix gets the same flag as its sibling",
    story:
      "I shipped a fix for customer-visible text without a feature flag, while the matching change it belonged with was behind one.",
    change:
      "I reverted it on three release branches before any customer reported it, then shipped it again behind the same per-customer flag. Now a fix to shared, visible behavior goes behind whatever flag its sibling uses.",
  },
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
    name: "AI and how coding is changing",
    detail:
      "I try new agents and models as they ship and keep what works. Most of my side projects, this site included, are built with AI coding agents.",
  },
];
