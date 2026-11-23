// About page copy, in my own voice.

/**
 * The first About paragraph. To rewrite it, replace the text between the quotes. Nothing else
 * needs to change.
 */
export const aboutLead =
  "I'm a full-stack software engineer in the Seattle area. I've worked on Microsoft products since 2017. I started as a vendor engineer through Mindtree, took ownership of an internal app's frontend, and that work got me hired at Microsoft full time in October 2018. Today I'm on Dynamics 365 Contact Center, working on the Live Chat Widget that businesses put on their websites and its integration into Copilot Studio.";

/**
 * The same facts in the third person, so the paragraph can be quoted as it stands. It is also the
 * summary at the top of /llms.txt. Keep it to what the rest of the site says.
 */
export const aboutFacts =
  "Bradley Hanson is a Software Engineer II at Microsoft, on the Dynamics 365 Contact Center team, and lives in the Greater Seattle Area. He works mainly in React and TypeScript, on customer-facing interfaces, SDKs, and the C#/.NET services behind them. On his own he builds The Sub Delta, Civic Maps, and Formosaic, and publishes three open-source TypeScript libraries for SoundCloud.";

export const aboutParagraphs = [
  aboutLead,
  "I've always liked how fast frontend moves, and I work across the stack. I joined Dynamics 365 Contact Center in January 2026 and was soon shipping in code I'd never seen: Copilot Studio's monorepo, the admin center's older React stack, and C# services I hadn't worked in before. I build with AI coding agents every day, and I've put real time into the rule files, tests, and release gates that keep that work reviewable. When I moved on from the agent desktop, the larger team that took it over kept building on that foundation.",
  "I also build a lot outside of work. The Sub Delta is a music-discovery app for SoundCloud that I've been rebuilding since 2015, and the latest version produced three open-source TypeScript packages. Civic Maps is about a question that should be easy to answer: who governs a given place? When I got married in 2026, I built our wedding website and its RSVP system myself.",
];

/** The short version of "How I got here", for the home page. Same facts as originStory below. */
export const originStoryShort = [
  "My first paid software work came from fixing a computer. In college I rented from a small, family-run property company near campus. They called about a problem with their office computer, I fixed it in about ten minutes, and they offered me a job.",
  "My first engineering job came from a detour. At a hiring event, the recruiters from the company I'd come to see were busy, so I started talking to the next table over. That conversation turned into an offer from Mindtree. After three months at its training campus in Bhubaneswar, India, I moved to the Pacific Northwest and started on-site at Microsoft in Redmond as a vendor.",
];

/** "How I got here", adapted from my LinkedIn profile into first person. */
export const originStory = [
  "My first paid software work came from fixing a computer. In college I rented from a small, family-run property company near campus. They called about a problem with their office computer, I fixed it in about ten minutes, and they offered me a job. For the rest of school I built their mobile-first listings website and the spreadsheets that ran their office, along with leasing, showings, and the books.",
  "My first engineering job came from a detour. At a hiring event, the recruiters from the company I'd come to see were busy, so I started talking to the next table over. That conversation turned into an offer from Mindtree, which sent new graduates to its training campus in Bhubaneswar, India, for three months of self-directed study. I focused on full-stack .NET, worked through real culture shock, and came back better at adapting than when I left.",
  "Then I moved to the Pacific Northwest and started on-site at Microsoft in Redmond as a vendor. I've worked on Microsoft products ever since.",
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
      "I try new agents and models as they ship and keep what works, at work and on every side project here.",
  },
];
