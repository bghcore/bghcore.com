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
  /** A hand-drawn diagram, shown after the section's paragraphs. */
  diagram?: ProjectDiagramId;
  /** A short code sample, copied from the project's own README so it runs as written. */
  code?: { caption: string; source: string };
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

/** Hand-drawn diagrams. A section names the one it shows. */
export type ProjectDiagramId = "shared-renderer" | "credential-boundary" | "portal-rewrite";

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
  /** ISO date this page's copy last changed. Feeds the sitemap and structured data. */
  updated: string;
  role: string;
  status: string;
  format: ProjectFormat;
  featured: boolean;
  domains: EngineeringDomainId[];
  technologies: string[];
  links: ProjectLink[];
  /** One short attribution line, shown small at the end of the page. */
  note?: string;
  /** The first image also appears as the thumbnail in project lists. */
  images?: ProjectImage[];
  /** One figure from the work. Project lists show it in place of a thumbnail when there is no image. */
  keyFact?: { value: string; label: string };
  /** Lower numbers appear first on the homepage. Unset featured projects keep source order after ranked ones. */
  featuredRank?: number;
  sections: ProjectSection[];
};

export const projectGroupLabels: Record<ProjectGroup, string> = {
  microsoft: "Microsoft",
  independent: "Independent",
  "open-source": "Open source",
};

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
    updated: "2026-11-22",
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
        label: "Ignite 2026 session: Microsoft Contact Center Intelligence",
        href: "https://ignite.microsoft.com/en-US/sessions/BRK381",
      },
      {
        label: "My merged PRs in Microsoft's public repos",
        href: "https://github.com/search?q=org%3Amicrosoft+author%3Abghcore+is%3Apr+is%3Amerged&type=pullrequests",
      },
    ],
    note: "The products and the code are Microsoft's.",
    keyFact: { value: "2 → 1", label: "products on one shared React chat renderer" },
    sections: [
      {
        heading: "The widget and the test chat",
        paragraphs: [
          "The Live Chat Widget is the chat window businesses put on their websites to talk with customers through Dynamics 365 Contact Center. Copilot Studio is where makers build the AI agents that answer in that window.",
          "Makers used to test those agents in a chat surface that wasn't the one their customers would use. In 2026 I built the production widget into Copilot Studio's agent test chat, so a maker now tests an agent in the same chat UI their customers will see.",
        ],
      },
      {
        heading: "First, a new agent desktop",
        paragraphs: [
          "I joined Dynamics 365 Contact Center in January 2026 and started on a new agent desktop, where I led frontend architecture. I migrated it to Fluent UI v9 in one 243-file PR, moved it to a single state store, built a three-tier Playwright test architecture, and added a localization check that fails the build if hardcoded text comes back.",
          "I also embedded that desktop inside Salesforce, with a host-bridge postMessage protocol and a manual PKCE token exchange through Salesforce's iframe sandbox.",
          "Then I handed the desktop off to a much larger team. Four months later, none of the files I created had been rewritten, and about two-thirds of the new team's commits built on them.",
        ],
      },
      {
        heading: "Six weeks from an empty repository",
        paragraphs: [
          "The Copilot Studio integration started as an empty repository. Six weeks later it was deploying to a CDN: new React packages, a TypeScript SDK for the orchestration service's WebSocket and SSE protocol, and its own release pipeline, routing to 13 production regions.",
          "There was no client to build the SDK on, so I reverse-engineered the protocol with a local simulator.",
          "The work crossed two repositories owned by different product organizations. I implemented the embed protocol on both sides, in the Copilot Studio host and in the widget.",
        ],
      },
      {
        heading: "The credential boundary",
        paragraphs: [
          "The widget runs in an iframe inside Copilot Studio, and no credential was allowed to enter it. The Copilot Studio host owns the auth token and the WebSocket. The iframe receives only a transferred MessagePort, over a versioned protocol that validates origins.",
        ],
        diagram: "credential-boundary",
      },
      {
        heading: "One renderer for two products",
        paragraphs: [
          "The test chat and the shipping widget now render chat through one shared React package, and build checks fail CI if either product reimplements shared behavior.",
          "Getting there meant changing code that customers were running. I started with a 391-file rename that changed no runtime behavior. Then I split the rest of the work into a planned stack of four PRs, so each step could be reviewed and checked against the shipping widget on its own.",
        ],
      },
      {
        heading: "One configuration contract",
        paragraphs: [
          "Underneath the chat UI was a configuration problem. The admin center, Copilot Studio, and the runtime widget each had their own model of the widget's settings, so a partial save in one product could erase settings another product had written.",
          "I replaced the three models with one versioned TypeScript package. It handles v1 and v2 compatibility, rejects unsafe CSS and URLs, and preserves fields it doesn't recognize. Preserving them is less strict than rejecting them, and it's what lets three products on different release schedules share one configuration.",
          "I shipped the contract into all three products, and a partial save in one no longer erases another's settings. Then I built dark mode on top of it end to end: authored in the admin center, carried by the contract, and rendered at runtime, including theme-aware Adaptive Cards.",
        ],
        diagram: "shared-renderer",
      },
      {
        heading: "Public preview and general availability",
        paragraphs: [
          "The integration reached public preview in October 2026 and is now generally available.",
          "I followed it through the preview. When the first weeks of real traffic showed what the telemetry couldn't explain, I added session telemetry on both sides of the iframe: why a session ended, turns that got no answer, and why a send failed.",
          "I also owned quality on the shipping widget. I debugged its opening animation frame by frame (it painted one frame at the size of the chat button) and fixed attachments and transcript ordering. Customers run release branches, so many of these fixes also went out as cherry-picks, and that only works if each change is small and safe on its own.",
          "Some of the fixes were for accessibility. Screen readers now announce new messages and sent files across minimize and restore, read Adaptive Cards that carry no speech text, and ignore the host page while the widget is fullscreen. Citation numbers sit inside the control so voice-control users can target them.",
        ],
      },
      {
        heading: "On call, and the services behind the widget",
        paragraphs: [
          "I took the live chat service's on-call rotation. I root-caused a high-severity outage within about an hour, wrote the RCA, and changed the C# messaging service so a failed background write no longer stops a chat from starting. The alert I built would have fired 11 minutes before existing monitoring.",
          "In all I shipped 10+ C#/.NET fixes to the messaging and orchestration services. One covered failed AI dialogs: the customer's next message used to get no reply, and now the failure becomes a plain message and the session re-arms so a retry gets an answer.",
        ],
      },
      {
        heading: "The public SDK repositories",
        paragraphs: [
          "Some of this work is public. In Microsoft's chat SDK repositories on GitHub I shipped official releases, including the chat widget's 2.0.0, security fixes across five packages, and hotfix workflows with OIDC trusted publishing to npm.",
          "I also took over the official release pipelines for the iOS, Android, and React Native chat SDKs, which had no owner. Releases now publish only after a green build from the main or release branch, versions come from a checked-in source of truth, and a failed Maven Central publish stops the release.",
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
      "Nearly nine years on Azure customer experience tools, first as a vendor: a portal extension rewrite, Services Hub support case creation, and a forms engine other apps reused.",
    period: "2017 to 2026",
    updated: "2026-11-22",
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
    keyFact: { value: "0 → 77%", label: "unit test coverage on the portal extension rewrite" },
    sections: [
      {
        heading: "Azure CXP",
        paragraphs: [
          "Azure Customer Experience (CXP) Engineering builds the tools Microsoft uses to support Azure customers, along with customer-facing experiences in the Azure portal and Services Hub.",
          "I worked there from 2017 to January 2026. I started as a vendor engineer through Mindtree and was hired at Microsoft full time in October 2018. Most of my work was frontend ownership of React and TypeScript apps, with .NET and Azure work underneath.",
        ],
      },
      {
        heading: "The outage-visibility app",
        paragraphs: [
          "As a vendor I owned the frontend of an internal app that tells Microsoft's Azure field teams when an outage affects their customers. I took it from pilot to preview, rebuilt it in React to retire AngularJS while people were using it, and started its move to TypeScript and Redux. That work turned the contract into a full-time offer.",
          "After joining Microsoft I stayed its sole frontend developer. I finished the TypeScript migration and extended its coverage from Azure to Microsoft 365 and Dynamics 365. Daily users grew from about 100 to about 173, and Azure Search indexers cut search indexing over millions of documents from weeks to hours.",
          "Parts of the UI I built as a vendor are still in production today.",
        ],
      },
      {
        heading: "A forms engine other apps reused",
        paragraphs: [
          "Data entry on a customer-engagement platform needed forms whose fields depended on business rules. I built a config-driven forms engine on React Hook Form, so new forms are defined as configuration. It became the platform's primary data-entry UX.",
          "Alongside it I built tree-view navigation and shared controls that other CXP apps reused. I also removed redundant infrastructure, which cut the platform's Azure subscription costs by $142.7K a year (36%).",
        ],
      },
      {
        heading: "Services Hub case creation",
        paragraphs: [
          "Support case creation for Services Hub 2.0 was on a stack I hadn't used before, with a window of about three months. I delivered it in 56 PRs, covering product and problem selection, validation, and additional contacts. It went to a pilot of about 4,000 users.",
        ],
      },
      {
        heading: "The portal extension rewrite",
        paragraphs: [
          "A customer-facing Azure portal extension was still written in Knockout and had no unit tests. It deploys to the Azure Public, US Government, and China clouds, and it had to stay in service while it changed.",
          "I was the frontend owner of its rewrite to React and TypeScript, coordinating across the UX, portal-platform, and deployment teams. It landed as 100+ PRs, until the legacy framework was gone. Unit test coverage went from 0 to 77%+, and local dev startup dropped 65%, from 4:32 to 1:34.",
          "I then moved the extension to resource-provider deployment across all three clouds, which halved its core Assessments component from 3,000 to 1,500 lines and closed a Secure Future Initiative compliance item. I also remediated 10+ .NET and npm CVEs.",
        ],
        diagram: "portal-rewrite",
      },
      {
        heading: "Smaller projects",
        bullets: [
          "Made about 100 Playwright end-to-end tests a release gate.",
          "Took an internal tool from a hackathon prototype to production, replacing a legacy ASP.NET MVC app.",
          "Led two AI hackathon teams that added RAG-based recommendations to assessments.",
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
    updated: "2026-11-22",
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
        heading: "Why I keep rebuilding it",
        paragraphs: [
          "The Sub Delta is the project I come back to when I want to try something new with nobody's permission needed. I started it in 2015 to answer one question: given artists I already like, what should I listen to next? It crawls SoundCloud's social graph from those artists, scores what it finds, and gives each user a discovery channel that updates every day.",
          "SoundCloud has more underground music than anywhere else online and few good ways to find it. Its own recommendations lean toward what's already popular. I wanted something that starts from my taste and looks a few steps further out.",
          "Each rebuild taught me something I later used at work: queues and retries, cost-aware data modeling, monorepos, and now building with AI agents.",
        ],
      },
      {
        heading: "The crawl",
        paragraphs: [
          "SoundCloud's API is rate-limited and only partly documented, and a graph crawl fans out fast. Each artist leads to likes, reposts, follows, and related artists, several levels deep. The earliest version tried to crawl the whole graph in one function call, which can't survive a fan-out that size.",
          "Now the scan runs as queue-triggered Azure Functions, one hop per message, so each step can fail and retry on its own. Handlers rethrow on failure, so nothing fails silently. Putting each hop on a queue made the crawl harder to follow but possible to retry, and every version since has kept that shape.",
          "Channels are spread across the hours of the day, which keeps pipeline load and SoundCloud's rate limits even.",
        ],
      },
      {
        heading: "Channels, springs, and scoring",
        bullets: [
          "Channels and springs: a channel is a taste profile, and springs are the seed artists and tracks it starts from. The rest of the system hangs off that model.",
          "Scoring with decay: a track's score combines engagement, tag matches, follower counts, and trend, and persistent scores fade on a half-life so one good day doesn't keep a track on top.",
        ],
      },
      {
        heading: "Keeping it cheap",
        paragraphs: [
          "It's a side project built by one developer around a full-time job, so it has to be cheap to run and hard to break while I'm not watching it.",
          "A dedicated graph database was the natural fit for the data, and it was expensive. I moved the graph to partitioned SQL queries in Cosmos DB, in one shared throughput pool. That kept the traversal model and cut the database bill.",
        ],
      },
      {
        heading: "Where it is now",
        paragraphs: [
          "It's live at thesubdelta.com, with a free tier and a Pro tier. It has accounts, public channels with a Discover page, and a taste loop that uses what you like to re-rank your For You feed.",
          "It began as a C#/.NET prototype, became a single Next.js app in TypeScript, and is now a pnpm monorepo with the pipeline on Azure Functions. Shared packages for models, services, and pipeline logic feed the site, the admin app, and the Functions, so a type changes in one place. The current monorepo has more than 1,000 commits since 2023.",
          "I wrote the SoundCloud packages it runs on and published them as open source. In 2026 I ran a full engineering audit of the codebase and closed its findings over a series of PRs. The repo is also set up for AI coding agents, with rule files, a system map, and skills that check production health, query the database, and read logs.",
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
    updated: "2026-11-22",
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
        heading: "What it does",
        paragraphs: [
          "Click a point on the map or search an address, and Civic Maps lists the federal and state offices that cover that place. State pages list the governor, both legislative chambers, and each U.S. House district. Each official's page names the office, the party on the record, and the public source.",
          "Search opens an official by name or a district by code, such as WA-7.",
        ],
      },
      {
        heading: "Where the data comes from",
        paragraphs: [
          "Government data is public but scattered. District boundaries come from the Census Bureau, legislators from Congress.gov and Open States, and federal judges from the Federal Judicial Center. Each source uses its own identifiers, and none of them answers the question for a point on a map.",
          "I built ingest for Census TIGERweb geography in all 50 states, current Congress members, governors, and state legislators from Congress.gov and Open States, and federal district and circuit judges from the FJC directory. It uses official sources only, with provenance on every record, and covers public offices only. No private-person tracking.",
        ],
      },
      {
        heading: "The data model",
        bullets: [
          "PostGIS is the system of record. Records use canonical text IDs such as cm:jurisdiction:us.wa. Source identifiers like Census GEOIDs live on provenance records.",
          "Containment is a relations table, because a place sits inside several overlapping jurisdictions at once.",
          "Geometry belongs to a versioned Boundary, so a district keeps its identity when it's redrawn.",
          "The domain covers jurisdictions, districts, versioned boundaries, offices, people, terms, legislative bodies, bills, votes, and elections.",
          "An HTTP API serves point lookup, boundaries, geography, people, roster, and search.",
        ],
      },
      {
        heading: "Working on a fork",
        paragraphs: [
          "The globe is a fork I want to keep merging from upstream, so my code can't spread through it. The domain model, API, ingest, and backend never import the globe or Cesium, and a check script fails the build if they do. Civic Maps touches only five upstream files, and everything else lives in its own directory.",
          "The website is Next.js. It embeds the globe in an iframe, talks to it over a postMessage protocol, and calls the API for officeholders. The globe is a static build and PostGIS isn't, so the two are deployed separately. Mobile gets its own layout built around a bottom sheet.",
          "Coverage grows by adding ingest adapters and jurisdiction rows, with no changes to the globe.",
        ],
      },
      {
        heading: "What's missing",
        paragraphs: [
          "Some state chambers have fewer stored seats than the Census lists. The site shows who is stored and doesn't invent the missing seats.",
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
    updated: "2026-11-22",
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
        heading: "Usage",
        paragraphs: ["The quick start from the soundcloud-api-ts README:"],
        code: {
          caption: "Client credentials flow: get a token once, store it, and every later call uses it.",
          source: `import { SoundCloudClient } from "soundcloud-api-ts";

const sc = new SoundCloudClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "https://yourapp.com/callback",
});

// Get a client token and store it
const token = await sc.auth.getClientToken();
sc.setToken(token.access_token, token.refresh_token);

// Now all calls use the stored token automatically
const results = await sc.search.tracks("electronic");
const track = await sc.tracks.getTrack(123456);
const streams = await sc.tracks.getStreams(123456);`,
        },
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
    updated: "2026-11-01",
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
    updated: "2026-11-01",
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
