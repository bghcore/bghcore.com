// Projects and case studies. Microsoft content comes only from my public résumé. Independent
// projects come from their own repositories and live sites.

export type EngineeringDomainId =
  | "frontend"
  | "full-stack"
  | "cloud-enterprise"
  | "developer-tooling"
  | "data-geospatial";

export type ProjectGroup = "microsoft" | "independent" | "open-source";

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

/**
 * A 16:9 screenshot in /public/projects. `file` is the base name: the folder holds
 * <file>-640 and <file>-1280 in AVIF and WebP, plus a 1280px <file>.jpg fallback.
 */
export type ProjectImage = {
  file: string;
  alt: string;
  caption?: string;
};

/** Hand-drawn diagrams, rendered inside the "Architecture and technical decisions" section. */
export type ProjectDiagramId = "shared-renderer" | "credential-boundary";

/** Scannable case-study opening. Copy must stay within what the long sections already say. */
export type ProjectSnapshot = {
  problem: string;
  role: string;
  decisions: string[];
  tradeoff: string;
  outcomes: string[];
};

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
  /** The first image also appears as the thumbnail in project lists. */
  images?: ProjectImage[];
  /** One figure from the work. Project lists show it in place of a thumbnail when there is no image. */
  keyFact?: { value: string; label: string };
  /** Lower numbers appear first on the homepage. Unset featured projects keep source order after ranked ones. */
  featuredRank?: number;
  diagrams?: ProjectDiagramId[];
  /** Shown under the title on case-study pages so a reader can judge the work without scrolling the essay. */
  snapshot?: ProjectSnapshot;
  sections: ProjectSection[];
};

export const projectGroupLabels: Record<ProjectGroup, string> = {
  microsoft: "Microsoft",
  independent: "Independent",
  "open-source": "Open source",
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
    featuredRank: 1,
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
    links: [
      { label: "Live Chat Widget on GitHub", href: "https://github.com/microsoft/omnichannel-chat-widget" },
      { label: "Chat SDK on GitHub", href: "https://github.com/microsoft/omnichannel-chat-sdk" },
      {
        label: "My merged PRs in Microsoft's public repos",
        href: "https://github.com/search?q=org%3Amicrosoft+author%3Abghcore+is%3Apr+is%3Amerged&type=pullrequests",
      },
    ],
    note: "This case study uses only what's on my public résumé and in Microsoft's public repositories. The products and the code are Microsoft's. Internal endpoints, infrastructure identifiers, and nonpublic incident detail stay inside Microsoft.",
    keyFact: { value: "2 → 1", label: "products on one shared React chat renderer" },
    diagrams: ["shared-renderer", "credential-boundary"],
    snapshot: {
      problem:
        "Makers tested agents in a chat surface that was not the one customers use. The admin center, Copilot Studio, and the runtime widget also each stored widget settings in their own model, so a partial save in one product could erase settings another product had written.",
      role: "Software Engineer II. I took the Copilot Studio integration from an empty repository to CDN deployment, implemented the embed protocol on both sides of two repositories, and shipped the shared renderer and the configuration contract. The products and the code are Microsoft's.",
      decisions: [
        "The Copilot Studio host keeps the auth token and the WebSocket. The widget iframe receives only a transferred MessagePort.",
        "Both products render chat through one shared React package, with CI checks that stop either from reimplementing shared behavior.",
        "One versioned TypeScript contract replaces the three configuration models, keeps v1 and v2 compatibility, and preserves fields it does not recognize.",
        "The integration has its own release pipeline, routing to 13 production regions.",
      ],
      tradeoff:
        "Preserving unrecognized fields is less strict than rejecting them. It is what lets three products on different release schedules share one configuration without erasing each other's settings. Converging the renderers started with a behavior-preserving rename, then a stack of reviewable pull requests, because customers were already running the shipping widget.",
      outcomes: [
        "Makers test agents in the same chat UI their customers see.",
        "A partial save in one product no longer erases another product's settings.",
        "Two products share one renderer, and CI stops either one from reimplementing shared behavior.",
        "A failed background write in the messaging service no longer stops a chat from starting.",
      ],
    },
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
          "Shipped the configuration contract into all three products, then built dark mode on top of it end to end: authored in the admin center, carried by the contract, and rendered at runtime, including theme-aware Adaptive Cards.",
          "Owned quality on the shipping widget. I debugged its opening animation frame by frame (it painted one frame at the size of the chat button), fixed attachments and transcript ordering, and shipped the fixes to the release branches customers run.",
          "Fixed accessibility gaps: screen readers now announce new messages and sent files across minimize and restore, and citation numbers sit inside the control so voice-control users can target them.",
          "Took the live chat service's on-call rotation. I root-caused a high-severity outage within about an hour, wrote the RCA, and changed the C# messaging service so a failed background write no longer stops a chat from starting. The alert I built would have fired 11 minutes before existing monitoring.",
          "Shipped 10+ C#/.NET fixes to the messaging and orchestration services. One covered failed AI dialogs: the customer's next message used to get no reply, and now the failure becomes a plain message and the session re-arms so a retry gets an answer.",
          "Worked in Microsoft's public chat SDK repositories on GitHub: official releases including the chat widget's 2.0.0, security fixes across five packages, and hotfix workflows with OIDC trusted publishing to npm.",
          "Earlier in 2026, led frontend architecture for a new agent desktop: a Fluent UI v9 migration in one 243-file PR, a single state store, a three-tier Playwright test architecture, and a localization check that fails the build if hardcoded text comes back.",
          "Embedded that desktop inside Salesforce with a host-bridge postMessage protocol and a manual PKCE token exchange through Salesforce's iframe sandbox.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "Converging the renderers meant changing code that customers were running. I started with a 391-file rename that changed no runtime behavior. Then I split the rest of the work into a planned stack of four PRs, so each step could be reviewed and checked against the shipping widget on its own.",
          "Preserving fields the contract doesn't recognize is less strict than rejecting them. It's what lets three products on different release schedules share one configuration without erasing each other's settings.",
          "A fix isn't done when it merges. Customers run release branches, so many of these fixes also went out as cherry-picks, and that only works if each change is small and safe on its own.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Makers test agents in the same chat UI their customers see.",
          "A partial save in one product no longer erases another product's settings.",
          "Two products share one renderer, and CI stops either one from reimplementing shared behavior.",
          "After an AI failure, a customer's retry gets a reply.",
          "Months after I moved on from the agent desktop, the larger team that inherited it was still building on that foundation.",
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
      "Nine years on Azure customer experience tools, first as a vendor: a portal extension rewrite, Services Hub support case creation, and a forms engine other apps reused.",
    period: "2016 to 2026",
    role: "Vendor, then Software Engineer and Software Engineer II",
    status: "Shipped to production",
    format: "case-study",
    featured: true,
    featuredRank: 2,
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
    note: "Internal tools are described by what they do. Everything here is from my public résumé.",
    keyFact: { value: "0 → 77%", label: "unit test coverage on the portal extension rewrite" },
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Azure Customer Experience (CXP) Engineering builds the tools Microsoft uses to support Azure customers, along with customer-facing experiences in the Azure portal and Services Hub.",
          "I worked there from 2016 to January 2026. I started as a vendor engineer through Mindtree, took ownership of an internal app's frontend, and that work got me hired at Microsoft full time in October 2018. After that, most of my work was frontend ownership of React and TypeScript apps, with .NET and Azure work underneath.",
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
          "Replaced Knockout with React and TypeScript until the legacy framework was gone.",
          "Moved the extension to resource-provider deployment across all three clouds, which halved its core Assessments component from 3,000 to 1,500 lines.",
          "Built data entry on a config-driven forms engine with business rules, using React Hook Form, so new forms are defined as configuration.",
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
          "As a vendor, owned the frontend of the Azure field's outage-visibility app: took it from pilot to preview, rebuilt it in React to retire AngularJS, and started its move to TypeScript and Redux. That's the work that got me hired full time.",
          "After joining Microsoft, stayed its sole frontend developer. I finished the TypeScript migration and extended its coverage from Azure to Microsoft 365 and Dynamics 365.",
          "Took an internal tool from a hackathon prototype to production, replacing a legacy ASP.NET MVC app. Later led two AI hackathon teams that added RAG-based recommendations to assessments.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "As a vendor, I had to earn ownership. I took on the outage-visibility app's frontend while it was still in pilot and rebuilt it in React while people were using it. That work turned the contract into a full-time offer.",
          "The rewrite landed as 100+ PRs, so the customer-facing extension stayed in service while Knockout came out.",
          "Case creation was on a stack I hadn't used before, with about three months to deliver. It shipped in 56 PRs and went to a pilot of about 4,000 users.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Knockout fully removed from the portal extension. Unit test coverage went from 0 to 77%+ and local dev startup from 4:32 to 1:34.",
          "Services Hub 2.0 case creation was piloted to about 4,000 users.",
          "A CXP platform's Azure subscription costs dropped by $142.7K a year (36%) after I removed redundant infrastructure.",
          "Search indexing over millions of documents went from weeks to hours. Daily users of the outage-visibility app grew from about 100 to about 173.",
          "Parts of the outage-visibility UI I built as a vendor are still in production today.",
          "The forms engine became the platform's primary data-entry UX.",
        ],
      },
    ],
  },
  {
    slug: "the-sub-delta",
    name: "The Sub Delta",
    title: "The Sub Delta: a music discovery engine I've rebuilt for a decade",
    group: "independent",
    eyebrow: "Independent · Music",
    summary:
      "My main side project since 2015 and the place I experiment freely. It crawls SoundCloud's social graph from artists you already like and surfaces tracks that are catching early.",
    period: "2015 to present",
    role: "Sole developer",
    status: "Live at thesubdelta.com",
    format: "case-study",
    featured: true,
    domains: ["full-stack", "cloud-enterprise", "data-geospatial", "developer-tooling"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Azure Functions",
      "Azure Cosmos DB",
      "Azure Storage queues and tables",
      "Redis",
      "NextAuth",
      "pnpm workspaces",
      "esbuild",
      "Vitest",
      "Vercel",
    ],
    links: [{ label: "Live site", href: "https://www.thesubdelta.com" }],
    images: [
      {
        file: "the-sub-delta",
        alt: "The Sub Delta home page with the headline Find music early and a button to build your first channel",
        caption: "thesubdelta.com. Seed artists you know, set a depth, and a daily scan does the digging.",
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Sub Delta is the project I come back to when I want to try something new with nobody's permission needed. I started it in 2015 to answer one question: given artists I already like, what should I listen to next? It crawls SoundCloud's social graph from those artists, scores what it finds, and gives each user a discovery channel that updates every day.",
          "Because it's mine, it's where I learn. Each rebuild taught me something I later used at work: queues and retries, cost-aware data modeling, monorepos, and now building with AI agents.",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "SoundCloud has more underground music than anywhere else online and few good ways to find it. Its own recommendations lean toward what's already popular. I wanted something that starts from my taste and looks a few steps further out.",
        ],
      },
      {
        heading: "Constraints",
        bullets: [
          "SoundCloud's API is rate-limited and only partly documented.",
          "A graph crawl fans out fast. Each artist leads to likes, reposts, follows, and related artists, several levels deep.",
          "It's a side project, so it has to be cheap to run and hard to break while I'm not watching it.",
          "One developer, fitting it around a full-time job.",
        ],
      },
      {
        heading: "Architecture and technical decisions",
        bullets: [
          "Channels and springs: a channel is a taste profile, and springs are the seed artists and tracks it starts from. The rest of the system hangs off that model.",
          "Queue-driven crawl: the scan runs as queue-triggered Azure Functions, one hop per message, so each step can fail and retry on its own. Handlers rethrow on failure, so nothing fails silently.",
          "Hourly scan slots: channels are spread across the hours of the day, which keeps pipeline load and SoundCloud's rate limits even.",
          "Scoring with decay: a track's score combines engagement, tag matches, follower counts, and trend, and persistent scores fade on a half-life so one good day doesn't keep a track on top.",
          "Graph in Cosmos: the graph moved from a dedicated graph database to partitioned SQL queries in Cosmos DB. It kept the traversal model and cut the database bill.",
          "A pnpm monorepo: shared packages for models, services, and pipeline logic feed the Next.js site, the admin app, and the Functions, so a type changes in one place.",
        ],
      },
      {
        heading: "My contributions",
        bullets: [
          "All of it. I designed the data model and the scoring, and built the pipeline, the site, the admin app, and the operations tooling.",
          "Wrote the SoundCloud packages it runs on and published them as open source.",
          "Added accounts, public channels with a Discover page, and a taste loop that uses what you like to re-rank your For You feed.",
          "Set the repo up for AI agents: rule files, a system map, and agent skills that check production health, query the database, and read logs.",
          "Ran a full engineering audit of the codebase in 2026 and closed its findings over a series of PRs.",
        ],
      },
      {
        heading: "Challenges and tradeoffs",
        paragraphs: [
          "The hard part has always been the fan-out. The earliest version tried to crawl the whole graph in one function call, which can't survive a fan-out that size. Putting each hop on a queue made the crawl harder to follow but possible to retry, and every version since has kept that shape.",
          "Cost shapes the design. A dedicated graph database was the natural fit, and it was expensive. Rebuilding the graph as partitioned SQL queries in one shared throughput pool kept the model I wanted for much less money.",
        ],
      },
      {
        heading: "Outcomes",
        bullets: [
          "Live at thesubdelta.com, with a free tier and a Pro tier.",
          "Rebuilt from a C#/.NET prototype into TypeScript, then from a single Next.js app into a monorepo with the pipeline on Azure Functions.",
          "Three open-source SoundCloud packages came out of it.",
          "More than 1,000 commits in the current monorepo since 2023, with most recent work done through AI coding agents and the same guardrails I use at work.",
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
      { label: "Live site", href: "https://www.civicmapshq.com" },
      { label: "Live globe", href: "https://map.civicmapshq.com" },
      { label: "God's Eye View (upstream)", href: "https://github.com/bilawalsidhu/gods-eye-view" },
    ],
    note: "Civic Maps is built on a fork of God's Eye View, an open-source 3D globe by Bilawal Sidhu. The globe and its rendering are God's Eye View. The political data model, database, API, ingest, and website are mine.",
    images: [
      {
        file: "civic-maps",
        alt: "Civic Maps showing congressional districts over a satellite map of the United States, with a panel explaining who governs a place",
        caption: "The congressional layer on civicmapshq.com. Click anywhere to see who represents it.",
      },
    ],
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
          "Public offices only. No private-person tracking.",
          "The globe is a fork I want to keep merging from upstream, so my code can't spread through it.",
          "Mobile gets its own layout built around a bottom sheet.",
        ],
      },
      {
        heading: "Architecture and technical decisions",
        bullets: [
          "The political core is isolated. The domain model, API, ingest, and backend never import the globe or Cesium, and a check script fails the build if they do.",
          "PostGIS is the system of record. Records use canonical text IDs such as cm:jurisdiction:us.wa. Source identifiers like Census GEOIDs live on provenance records.",
          "Containment is a relations table, because a place sits inside several overlapping jurisdictions at once.",
          "Geometry belongs to a versioned Boundary, so a district keeps its identity when it's redrawn.",
          "The website is Next.js. It embeds the globe in an iframe and talks to it over a postMessage protocol, and it calls the Civic Maps HTTP API for officeholders.",
          "Coverage grows by adding ingest adapters and jurisdiction rows, with no changes to the globe.",
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
    keyFact: { value: "0", label: "runtime dependencies in the API client and the widget wrapper" },
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
    featured: true,
    featuredRank: 3,
    domains: ["frontend", "developer-tooling"],
    technologies: ["React 19", "TypeScript", "React Hook Form", "Vitest", "Storybook", "Next.js", "Clerk", "Stripe"],
    links: [
      { label: "Live playground", href: "https://www.formosaic.com" },
      { label: "GitHub", href: "https://github.com/bghcore/formosaic" },
      { label: "npm", href: "https://www.npmjs.com/package/@formosaic/core" },
    ],
    images: [
      {
        file: "formosaic",
        alt: "The formosaic.com home page: a headline about building forms with any UI library and a live JSON editor next to the rendered form",
        caption: "formosaic.com. The playground re-renders the form as you edit its JSON, in whichever UI library you pick.",
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Formosaic is a React form library where a form is one configuration object: fields, validation, ordering, and declarative rules. When field A changes to a value, rules can make field B required, hide field C, or change field D's options, without code in your components.",
          "The library is MIT licensed. Around it I built formosaic.com: documentation, a live playground, and a visual form designer, with accounts and billing for the hosted product.",
        ],
      },
      {
        heading: "Design decisions",
        bullets: [
          "A UI-agnostic core built on React Hook Form, with adapters for 11 UI libraries including Fluent UI, MUI, Ant Design, Chakra, Mantine, Radix, and React Aria.",
          "Rules declared as data, with 20 condition operators.",
          "Multi-step wizards with conditional step visibility and rules that reach across steps.",
          "Auto-save with debounce, retry, and abort.",
          "Open core: the library and its adapters stay public, and the designer and hosted product live in a separate private repository that pulls the public docs in as a submodule.",
        ],
      },
      {
        heading: "Technologies",
      },
    ],
  },
  {
    slug: "wedding-website",
    name: "Wedding website and RSVP",
    title: "A wedding website with its own RSVP system",
    group: "independent",
    eyebrow: "Independent · Personal",
    summary:
      "The website for my wedding in July 2026: our story, the schedule, travel, and an RSVP flow built around invitation codes, plus a separate admin app to track who was coming. It's an archive now, with demo data in place of real guests.",
    period: "2025 to 2026",
    role: "Sole developer",
    status: "Archived, with a working demo",
    format: "project",
    featured: false,
    domains: ["frontend", "full-stack"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX", "Azure Cosmos DB", "Open-Meteo API", "Python", "Vercel"],
    links: [
      { label: "bradleyandmakinna.com", href: "https://www.bradleyandmakinna.com" },
      { label: "RSVP admin demo", href: "https://brad-makinna-wedding-rsvp.vercel.app/rsvps" },
    ],
    images: [
      {
        file: "wedding",
        alt: "The wedding website home page with the names Bradley and MaKinna Hanson over a photo by the water",
        caption: "bradleyandmakinna.com, now kept as an archive of the day.",
      },
      {
        file: "wedding-rsvp",
        alt: "The RSVP admin dashboard showing guest lists, RSVP counts, and attending and pending parties, filled with fictional demo guests",
        caption: "The RSVP admin app. Every guest shown here is fictional demo data.",
      },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "MaKinna and I got married on July 11, 2026. I built our wedding website myself, mostly because I wanted RSVPs to match how our guest list actually worked: households, plus-ones, and more than one guest list.",
        ],
      },
      {
        heading: "What guests could do",
        bullets: [
          "Find their invitation with a six-character code and answer for everyone in their party at once.",
          "Add dietary notes and song requests with the RSVP.",
          "Read our story, the schedule, travel details, and an FAQ, with a countdown and an hourly forecast for the afternoon of the wedding.",
        ],
      },
      {
        heading: "How it's built",
        bullets: [
          "Guest site: Next.js App Router with Tailwind CSS and MDX content. RSVPs went through API routes into Azure Cosmos DB.",
          "Admin app: a separate Next.js app that grouped parties by guest list, split who had answered from who hadn't, and summarized dietary restrictions.",
          "Song requests: they fed a songs page, and after RSVPs closed a small Python script matched each request to a Spotify track.",
        ],
      },
      {
        heading: "Archiving it",
        paragraphs: [
          "After the wedding I didn't want guests' names and answers sitting online. A one-off script exported the RSVP data to a private local backup and then emptied the database. Both apps now run on fictional demo data with no database at all, so the RSVP flow still works for anyone who tries it and no real guest appears anywhere.",
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
  return projects
    .filter((project) => project.featured)
    .slice()
    .sort((a, b) => (a.featuredRank ?? 50) - (b.featuredRank ?? 50));
}
