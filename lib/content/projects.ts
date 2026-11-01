// Projects and case studies. Microsoft content comes only from my public résumé. Independent
// projects come from their own repositories and live sites.

export type EngineeringDomainId =
  | "frontend"
  | "full-stack"
  | "cloud-enterprise"
  | "developer-tooling"
  | "data-geospatial";

export type ProjectGroup = "microsoft" | "independent" | "open-source" | "experiment";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectFormat = "case-study" | "project";

export type Project = {
  slug: string;
  /** Short name used in lists. */
  name: string;
  /** Page heading. */
  title: string;
  group: ProjectGroup;
  eyebrow: string;
  summary: string;
  period: string;
  role: string;
  status: string;
  format: ProjectFormat;
  featured: boolean;
  domains: EngineeringDomainId[];
  technologies: string[];
  links: ProjectLink[];
  /** Shown above the body, for confidentiality or attribution notes. */
  note?: string;
  sections: ProjectSection[];
};

export const projectGroupLabels: Record<ProjectGroup, string> = {
  microsoft: "Microsoft",
  independent: "Independent",
  "open-source": "Open source",
  experiment: "Experiment",
};

/** Case studies use these eight headings, in this order. */
export const caseStudyHeadings = [
  "Overview",
  "Problem",
  "Constraints",
  "Architecture and technical decisions",
  "My contributions",
  "Challenges and tradeoffs",
  "Outcomes",
  "Technologies",
] as const;

export const projects: Project[] = [
  {
    slug: "dynamics-365-contact-center",
    name: "Dynamics 365 Contact Center",
    title: "Bringing a production chat widget into Copilot Studio",
    group: "microsoft",
    eyebrow: "Microsoft · Dynamics 365 Contact Center",
    summary:
      "I built the customer-facing Live Chat Widget into Copilot Studio's agent test chat, then moved two products onto one chat renderer and one configuration contract.",
    period: "2026 to present",
    role: "Software Engineer II",
    status: "Current work",
    format: "case-study",
    featured: true,
    domains: ["frontend", "full-stack", "cloud-enterprise", "developer-tooling"],
    technologies: [
      "React",
      "TypeScript",
      "WebSocket and SSE",
      "postMessage and MessagePort",
      "C# / .NET",
      "Fluent UI",
      "Playwright",
      "Azure DevOps pipelines",
    ],
    links: [],
    note: "This case study uses only what's on my public résumé. Internal code, architecture detail, and metrics stay inside Microsoft.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Live Chat Widget is the chat window businesses put on their websites to talk with customers through Dynamics 365 Contact Center. Copilot Studio is where makers build the AI agents that answer in that window.",
          "In 2026 I built the production widget into Copilot Studio's agent test chat, so a maker tests an agent in the same chat UI their customers will see.",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "Before this, makers tested agents in a chat surface that wasn't the one their customers would use.",
          "Underneath that was a configuration problem. The admin center, Copilot Studio, and the runtime widget each had their own model of the widget's settings. A partial save in one product could erase settings another product had written.",
        ],
      },
      {
        heading: "Constraints",
        bullets: [
          "The widget runs in an iframe inside Copilot Studio, and no credential was allowed to enter it.",
          "The work crossed two repositories owned by different product organizations.",
          "Customers were already running the shipping widget, so changes to shared code had to leave its runtime behavior alone.",
          "The integration needed its own release pipeline, routing to 13 production regions.",
        ],
      },
      {
        heading: "Architecture and technical decisions",
        bullets: [
          "Credential boundary: the Copilot Studio host owns the auth token and the WebSocket. The widget iframe receives only a transferred MessagePort, over a versioned protocol that validates origins. No credential enters the iframe.",
          "Transport SDK: a TypeScript SDK for the orchestration service's WebSocket and SSE protocol. There was no client to build on, so I reverse-engineered the protocol with a local simulator.",
          "One renderer: both products render chat through one shared React package. Build checks fail CI if either product reimplements shared behavior.",
          "One configuration contract: a versioned TypeScript package replaces the three configuration models. It handles v1 and v2 compatibility, preserves fields it doesn't recognize, and rejects unsafe CSS and URLs.",
        ],
      },
      {
        heading: "My contributions",
        bullets: [
          "Took the integration from an empty repository to CDN deployment in six weeks: new React packages, the transport SDK, and the release pipeline.",
          "Implemented the embed protocol on both sides, in the Copilot Studio host and in the widget.",
          "Shipped the configuration contract into all three products, then built admin-side appearance and dark-mode authoring end to end.",
          "Took the live chat service's on-call rotation. I root-caused a high-severity outage within about an hour, wrote the RCA, removed the failure mode in the C# messaging service, and built an alert that would have fired 11 minutes before existing monitoring.",
          "Shipped 10+ C#/.NET fixes to the messaging and orchestration services, including recovery from a failed AI dialog that had left customers' chats silent.",
          "Earlier in 2026, led frontend architecture for a new agent desktop: a Fluent UI v9 migration in one 243-file PR, a single state store, and a three-tier Playwright test architecture. I also embedded it inside Salesforce with a host-bridge postMessage protocol and a manual PKCE token exchange through Salesforce's iframe sandbox.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "Converging the renderers meant changing code that customers were running. I started with a 391-file rename that changed no runtime behavior. Then I split the rest of the work into a planned stack of four PRs instead of one large change, so each step could be reviewed and checked against the shipping widget on its own.",
          "Preserving fields the contract doesn't recognize is less strict than rejecting them. It's what lets three products on different release schedules share one configuration without erasing each other's settings.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Makers test agents in the same chat UI their customers see.",
          "A partial save in one product no longer erases another product's settings.",
          "Two products share one renderer, and CI stops either one from reimplementing shared behavior.",
          "Usage figures for the Copilot Studio integration aren't public, so they aren't included here.",
        ],
      },
    ],
  },
  {
    slug: "azure-engineering",
    name: "Azure engineering experiences",
    title: "Rebuilding Azure support and engineering experiences",
    group: "microsoft",
    eyebrow: "Microsoft · Azure CXP Engineering",
    summary:
      "Eight years on Azure customer experience tools: a portal extension rewrite, Services Hub support case creation, and a forms engine other apps reused.",
    period: "2018 to 2026",
    role: "Software Engineer, then Software Engineer II",
    status: "Shipped to production",
    format: "case-study",
    featured: true,
    domains: ["frontend", "full-stack", "cloud-enterprise", "developer-tooling", "data-geospatial"],
    technologies: [
      "React",
      "TypeScript",
      "Knockout (legacy)",
      "Redux-Saga",
      "React Hook Form",
      "Jest",
      "Playwright",
      ".NET",
      "Azure portal extensions",
      "Azure Search",
    ],
    links: [],
    note: "Internal tools are described by what they do rather than by name. Everything here is from my public résumé.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Azure Customer Experience (CXP) Engineering builds the tools Microsoft uses to support Azure customers, along with customer-facing experiences in the Azure portal and Services Hub.",
          "I worked there from 2016 to January 2026, as a vendor engineer through Mindtree and then at Microsoft from October 2018. Most of my work was frontend ownership of React and TypeScript apps, with .NET and Azure work underneath.",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "The projects differed, but most started from code that had become hard to change. A customer-facing Azure portal extension was still written in Knockout and had no unit tests. Support case creation for Services Hub 2.0 had to be built on a stack I hadn't used before. Data entry on a customer-engagement platform needed forms whose fields depended on business rules.",
        ],
      },
      {
        heading: "Constraints",
        bullets: [
          "The portal extension is customer-facing and deploys to the Azure Public, US Government, and China clouds.",
          "Services Hub 2.0 case creation had a window of about three months.",
          "The rewrite needed coordination across the UX, portal-platform, and deployment teams.",
        ],
      },
      {
        heading: "Architecture and technical decisions",
        bullets: [
          "Replaced Knockout with React and TypeScript until the legacy framework was gone, rather than running both indefinitely.",
          "Moved the extension to resource-provider deployment across all three clouds, which halved its core Assessments component from 3,000 to 1,500 lines.",
          "Built data entry on a config-driven forms engine with business rules, using React Hook Form, so new forms are defined as configuration instead of new components.",
          "Made about 100 Playwright end-to-end tests a release gate.",
          "Used Azure Search indexers for search over millions of documents in an outage-visibility app.",
        ],
      },
      {
        heading: "My contributions",
        bullets: [
          "Frontend owner of the Knockout to React rewrite: 100+ PRs, the legacy framework fully removed, unit test coverage from 0 to 77%+, and local dev startup cut 65% (4:32 to 1:34).",
          "Migrated the extension to resource-provider deployment, closed a Secure Future Initiative compliance item, and remediated 10+ .NET and npm CVEs.",
          "Delivered Services Hub 2.0 support case creation in about three months (56 PRs), covering product and problem selection, validation, and additional contacts.",
          "Built the forms engine, plus tree-view navigation and shared controls that other CXP apps reused.",
          "Sole frontend developer of the outage-visibility app for the Azure field. I extended its coverage from Azure to Microsoft 365 and Dynamics 365.",
          "Took an internal tool from a hackathon prototype to production, replacing a legacy ASP.NET MVC app. Later led two AI hackathon teams that added RAG-based recommendations to assessments.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "The rewrite landed as 100+ PRs rather than one cutover, so the customer-facing extension stayed in service while Knockout came out.",
          "Case creation was on a stack I hadn't used before, with about three months to deliver. It shipped in 56 PRs and went to a pilot of about 4,000 users.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Knockout fully removed from the portal extension. Unit test coverage went from 0 to 77%+ and local dev startup from 4:32 to 1:34.",
          "Services Hub 2.0 case creation was piloted to about 4,000 users.",
          "A CXP platform's Azure subscription costs dropped by about $142.7K a year (36%) after I removed redundant infrastructure.",
          "Search indexing over millions of documents went from weeks to hours. Daily users of the outage-visibility app grew from about 100 to about 173.",
          "The forms engine became the platform's primary data-entry UX.",
        ],
      },
    ],
  },
  {
    slug: "civic-maps",
    name: "Civic Maps",
    title: "Modeling government and geography in Civic Maps",
    group: "independent",
    eyebrow: "Independent · Civic technology",
    summary:
      "A map-first way to answer \"who governs this place?\" PostGIS boundaries for all 50 states, current federal and state officeholders, and a Next.js site over a 3D globe.",
    period: "2026 to present",
    role: "Sole developer",
    status: "Live at civicmapshq.com, in active development",
    format: "case-study",
    featured: true,
    domains: ["full-stack", "data-geospatial", "frontend"],
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "PostgreSQL 16",
      "PostGIS",
      "Docker Compose",
      "CesiumJS",
      "Vite",
      "Node.js",
    ],
    links: [
      { label: "civicmapshq.com", href: "https://www.civicmapshq.com" },
      { label: "God's Eye View (upstream)", href: "https://github.com/bilawalsidhu/gods-eye-view" },
    ],
    note: "Civic Maps is built on a fork of God's Eye View, an open-source 3D globe by Bilawal Sidhu. The globe and its rendering are God's Eye View. The political data model, database, API, ingest, and website are mine.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Click a point on the map or search an address, and Civic Maps lists the federal and state offices that cover that place. State pages list the governor, both legislative chambers, and each U.S. House district. Each official's page names the office, the party on the record, and the public source.",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "Government data is public but scattered. District boundaries come from the Census Bureau, legislators from Congress.gov and Open States, and federal judges from the Federal Judicial Center. Each source uses its own identifiers, and none of them answers the question for a point on a map.",
        ],
      },
      {
        heading: "Constraints",
        bullets: [
          "Official sources only, with provenance on every record.",
          "Public offices, not people as a search target. No private-person tracking.",
          "The globe is a fork I want to keep merging from upstream, so my code can't spread through it.",
          "Mobile gets its own layout, a bottom sheet, instead of a shrunken desktop panel.",
        ],
      },
      {
        heading: "Architecture and technical decisions",
        bullets: [
          "The political core is isolated. The domain model, API, ingest, and backend never import the globe or Cesium, and a check script fails the build if they do.",
          "PostGIS is the system of record. Records use canonical text IDs such as cm:jurisdiction:us.wa. Source identifiers like Census GEOIDs live on provenance records, not as primary keys.",
          "Containment is a relations table, not a parent pointer, because a place sits inside several overlapping jurisdictions at once.",
          "Geometry belongs to a versioned Boundary rather than to the District, so a district keeps its identity when it's redrawn.",
          "The website is Next.js. It embeds the globe in an iframe and talks to it over a postMessage protocol, and it calls the Civic Maps HTTP API for officeholders.",
          "Coverage grows by adding ingest adapters and jurisdiction rows, not by changing the globe.",
        ],
      },
      {
        heading: "My contributions",
        bullets: [
          "Designed the domain model: jurisdictions, districts, versioned boundaries, offices, people, terms, legislative bodies, bills, votes, and elections.",
          "Wrote the PostGIS schema and the HTTP API for point lookup, boundaries, geography, people, roster, and search.",
          "Built ingest for Census TIGERweb geography in all 50 states, current Congress members, governors, and state legislators from Congress.gov and Open States, and federal district and circuit judges from the FJC directory.",
          "Added the government layer to the globe and built the Next.js site, including state pages and search by name or district code.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "Keeping a fork mergeable means accepting limits. Civic Maps touches only five upstream files, on purpose, and everything else lives in its own directory. That constrains how far it can change the globe, which is the point.",
          "Some state chambers have fewer stored seats than the Census lists. The site shows who is stored and doesn't invent the missing seats.",
          "The globe is a static build and PostGIS isn't, so the globe and the API are deployed separately.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Live at www.civicmapshq.com, with the globe at map.civicmapshq.com.",
          "Census geography for all 50 states, plus current federal and state officeholders and federal judges.",
          "Search opens an official by name or a district by code, such as WA-7.",
          "Elections, bills, and state high courts are modeled in the domain but not yet in the API or site. They're the next milestones.",
        ],
      },
    ],
  },
  {
    slug: "soundcloud-libraries",
    name: "SoundCloud developer libraries",
    title: "TypeScript libraries for SoundCloud",
    group: "open-source",
    eyebrow: "Open source · npm",
    summary:
      "Three TypeScript packages for SoundCloud's official API and embeddable player. They power my music-discovery app, The Sub Delta.",
    period: "2026 to present",
    role: "Author and maintainer",
    status: "Published on npm",
    format: "project",
    featured: true,
    domains: ["frontend", "full-stack", "developer-tooling"],
    technologies: ["TypeScript", "React", "Next.js", "OAuth 2.1 and PKCE", "tsup", "Vitest", "TypeDoc"],
    links: [
      { label: "soundcloud-api-ts on npm", href: "https://www.npmjs.com/package/soundcloud-api-ts" },
      { label: "soundcloud-api-ts-next on npm", href: "https://www.npmjs.com/package/soundcloud-api-ts-next" },
      { label: "soundcloud-widget-react on npm", href: "https://www.npmjs.com/package/soundcloud-widget-react" },
      { label: "GitHub: twin-paws", href: "https://github.com/twin-paws" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Most TypeScript SoundCloud clients are either unmaintained wrappers from before OAuth 2.1 or scrapers that pull undocumented client IDs from the website and break when SoundCloud ships a frontend update. I wrote these packages against the official, documented API instead.",
        ],
      },
      {
        heading: "The packages",
        bullets: [
          "soundcloud-api-ts: the API client. Zero runtime dependencies and native fetch, with OAuth 2.1 and PKCE, automatic token refresh, and an interactive CLI.",
          "soundcloud-api-ts-next: React hooks and Next.js route handlers for the App Router and Pages Router. Hooks fetch through your own API routes, so client secrets stay on the server.",
          "soundcloud-widget-react: a React wrapper for the SoundCloud HTML5 Widget API, with Promise-based getters, a useSCWidget hook for playback state, and SSR-safe script loading.",
        ],
      },
      {
        heading: "Design decisions",
        bullets: [
          "Official API only, so the packages don't break when SoundCloud changes its website.",
          "No runtime dependencies in the client or the widget. You can pass in your own fetch for Cloudflare Workers, Bun, or Deno.",
          "Retries with exponential backoff on 429 and 5xx responses, honoring Retry-After, with in-flight GET requests deduplicated.",
          "A raw escape hatch that calls any endpoint in the spec, so a missing wrapper never blocks anyone.",
          "The widget turns callback getters into Promises and prevents duplicate script injection under server rendering.",
        ],
      },
      {
        heading: "Technologies",
      },
    ],
  },
  {
    slug: "formosaic",
    name: "Formosaic",
    title: "Formosaic: config-driven React forms",
    group: "open-source",
    eyebrow: "Open source · React library",
    summary:
      "Define a form once as JSON, and a rules engine handles conditional logic, validation, wizards, and auto-save. It renders through 11 UI library adapters.",
    period: "2026 to present",
    role: "Author and maintainer",
    status: "Published on npm",
    format: "project",
    featured: false,
    domains: ["frontend", "developer-tooling"],
    technologies: ["React 19", "TypeScript", "React Hook Form", "Vitest", "Storybook"],
    links: [
      { label: "formosaic.com", href: "https://formosaic.com" },
      { label: "GitHub", href: "https://github.com/bghcore/formosaic" },
      { label: "npm", href: "https://www.npmjs.com/package/@formosaic/core" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Formosaic is a React form library where a form is one configuration object: fields, validation, ordering, and declarative rules. When field A changes to a value, rules can make field B required, hide field C, or change field D's options, without code in your components.",
        ],
      },
      {
        heading: "Design decisions",
        bullets: [
          "A UI-agnostic core built on React Hook Form, with adapters for 11 UI libraries including Fluent UI, MUI, Ant Design, Chakra, Mantine, Radix, and React Aria.",
          "Rules declared as data with 20 condition operators, rather than imperative effects.",
          "Multi-step wizards with conditional step visibility and rules that reach across steps.",
          "Auto-save with debounce, retry, and abort, not only submit-on-click.",
        ],
      },
      {
        heading: "Technologies",
      },
    ],
  },
  {
    slug: "the-sub-delta",
    name: "The Sub Delta",
    title: "The Sub Delta: music discovery on SoundCloud",
    group: "independent",
    eyebrow: "Independent · Music",
    summary:
      "A discovery engine for underground music on SoundCloud. You seed artists you already know, set a depth, and daily scans surface tracks that are catching early.",
    period: "Ongoing",
    role: "Sole developer",
    status: "Live at thesubdelta.com",
    format: "project",
    featured: false,
    domains: ["full-stack", "cloud-enterprise"],
    technologies: ["Next.js", "TypeScript", "Azure Functions", "Cosmos DB", "Redis", "pnpm workspaces", "Vitest"],
    links: [{ label: "thesubdelta.com", href: "https://www.thesubdelta.com" }],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Sub Delta builds a personal discovery channel from your taste. You seed artists, choose how far out to look, and a daily scan walks SoundCloud's graph to find tracks you haven't heard.",
        ],
      },
      {
        heading: "How it's built",
        bullets: [
          "A pnpm monorepo with a Next.js product site, an admin app, and shared TypeScript packages.",
          "An Azure Functions pipeline that runs the graph scans.",
          "Runs on my open-source SoundCloud packages for API access and playback.",
        ],
      },
      {
        heading: "Technologies",
      },
    ],
  },
  {
    slug: "tagpro-tools",
    name: "TagPro tools",
    title: "TagPro replay mining and a local game extension",
    group: "experiment",
    eyebrow: "Experiment · Game tooling",
    summary:
      "A replay parser and CLI for the multiplayer browser game TagPro, plus a local Chromium extension that shows power-up respawn timers.",
    period: "2026",
    role: "Sole developer",
    status: "Local tool, not published",
    format: "project",
    featured: false,
    domains: ["developer-tooling", "data-geospatial"],
    technologies: ["TypeScript", "pnpm workspaces", "Vitest", "Chrome Manifest V3", "NDJSON"],
    links: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "TagPro is a multiplayer capture-the-flag game played in the browser. Its official replay files are NDJSON, one [timeMs, eventName, payload] entry per line. I wanted to understand them well enough to rebuild game state from a replay, then use the same model during a live game.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "A parser turns raw replay lines into one normalized event model shared by every package.",
          "A reducer rebuilds game state from those events and derives power-up and flag facts.",
          "A CLI inspects a replay's events, map, power-ups, flags, and players, and can download public replays.",
          "A Manifest V3 extension uses the same model in the page to show a countdown above each power-up pad.",
        ],
      },
      {
        heading: "Ground rules",
        paragraphs: [
          "Local only. No telemetry, no input automation, no packet tampering, and nothing beyond what the normal game client already receives.",
        ],
      },
      {
        heading: "Technologies",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
