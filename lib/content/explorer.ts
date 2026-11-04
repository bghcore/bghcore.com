// Engineering Explorer: what each technical domain looks like in my actual work.
// Each contribution links to the project it came from.

import type { EngineeringDomainId } from "./projects";

export type DomainContribution = {
  text: string;
  projectSlug: string;
};

export type EngineeringDomain = {
  id: EngineeringDomainId;
  label: string;
  summary: string;
  contributions: DomainContribution[];
  technologies: string[];
};

export const engineeringDomains: EngineeringDomain[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    summary:
      "Most of my work starts here: React and TypeScript apps with a lot of state, used by customers and by the people supporting them.",
    contributions: [
      {
        text: "Moved two products onto one shared React chat renderer, with CI checks that stop either from reimplementing shared behavior.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Migrated a new agent desktop to Fluent UI v9 in one 243-file PR and unified two state systems into one store.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Led the Knockout to React and TypeScript rewrite of a customer-facing Azure portal extension, taking unit test coverage from 0 to 77%+.",
        projectSlug: "azure-engineering",
      },
      {
        text: "Built a config-driven forms engine with business rules that became a platform's main data-entry experience.",
        projectSlug: "azure-engineering",
      },
      {
        text: "As a vendor, rebuilt an internal Azure app's frontend in React to retire AngularJS. Parts of that UI are still in production, and the work got me hired full time.",
        projectSlug: "azure-engineering",
      },
      {
        text: "Wrote a JSON-driven React forms library with a rules engine and adapters for 11 UI libraries.",
        projectSlug: "formosaic",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Fluent UI",
      "Redux-Saga",
      "Zustand",
      "TanStack Query",
      "React Hook Form",
      "Accessibility (WCAG 2.1)",
    ],
  },
  {
    id: "full-stack",
    label: "Full-Stack Applications",
    summary: "When a feature needs it, I follow it below the UI into the protocol or service underneath.",
    contributions: [
      {
        text: "Wrote a TypeScript transport SDK for a WebSocket and SSE protocol, reverse-engineered with a local simulator.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Shipped 10+ C#/.NET fixes to the live chat messaging and orchestration services.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Built a Next.js site and a PostGIS-backed HTTP API for officeholders and boundaries.",
        projectSlug: "civic-maps",
      },
      {
        text: "Run a Next.js app backed by an Azure Functions scan pipeline.",
        projectSlug: "the-sub-delta",
      },
      {
        text: "Published React hooks that call Next.js route handlers, so API secrets stay on the server.",
        projectSlug: "soundcloud-libraries",
      },
    ],
    technologies: ["Node.js", "C# / .NET", "Next.js", "REST", "WebSocket and SSE", "OAuth 2.0 and PKCE", "Cosmos DB"],
  },
  {
    id: "cloud-enterprise",
    label: "Cloud & Enterprise Platforms",
    summary:
      "Delivery at Microsoft scale, where a release reaches several clouds or regions and customers are already in production.",
    contributions: [
      {
        text: "Built an independent release pipeline that routes to 13 production regions.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Embedded an agent desktop inside Salesforce with a host-bridge protocol and a manual PKCE token exchange.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Moved a portal extension to resource-provider deployment across the Azure Public, US Government, and China clouds.",
        projectSlug: "azure-engineering",
      },
      {
        text: "Delivered Services Hub 2.0 support case creation, piloted to about 4,000 users.",
        projectSlug: "azure-engineering",
      },
      {
        text: "Cut a platform's Azure subscription costs by $142.7K a year (36%).",
        projectSlug: "azure-engineering",
      },
    ],
    technologies: ["Azure", "Azure DevOps", "Azure portal extensions", "MSAL", "Salesforce Lightning Web Components", "Microsoft Dataverse", "KQL"],
  },
  {
    id: "developer-tooling",
    label: "AI & Developer Tooling",
    summary:
      "I build with AI coding agents every day, and I build the guardrails that let a whole team use them without losing quality.",
    contributions: [
      {
        text: "Built a team's AI-assisted development guardrails: 13 architecture rule files, 3 agent skills, repository instructions across 5 codebases, and a weekly architecture-drift audit.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Wrote a read-only on-call workbench in Python that pulls an incident's history, past fixes, and telemetry into one command, then ran two agent sessions on it in parallel through an on-call week.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Ran an agentic development workshop for about 11 engineers and fixed two bugs in unfamiliar code live, one in the UI and one in a backend service.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Added hotfix release workflows and OIDC trusted publishing to 4 public npm SDK repositories.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Took over the unowned release pipelines for the iOS, Android, and React Native chat SDKs, so releases publish only from green builds and fail loudly.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Rebuilt the publishing pipeline for my org's troubleshooting guides after a repository move left them stale, fixed 486 broken links, and added a PR check that blocks new ones.",
        projectSlug: "dynamics-365-contact-center",
      },
      {
        text: "Published a zero-dependency API client with retries, request deduplication, and a CLI.",
        projectSlug: "soundcloud-libraries",
      },
    ],
    technologies: [
      "Claude Code",
      "Cursor",
      "Grok Build",
      "GitHub Copilot CLI and coding agent",
      "MCP",
      "Agent skills and rule files",
      "GitHub Actions",
      "Playwright",
      "npm publishing",
    ],
  },
  {
    id: "data-geospatial",
    label: "Data & Geospatial Systems",
    summary:
      "Mostly from my own projects: modeling messy public data so an interface can answer a simple question.",
    contributions: [
      {
        text: "Designed a PostGIS schema with versioned MultiPolygon boundaries and relation-based containment.",
        projectSlug: "civic-maps",
      },
      {
        text: "Ingest Census TIGERweb geography for all 50 states, plus officeholders from Congress.gov, Open States, and the FJC, with provenance on every record.",
        projectSlug: "civic-maps",
      },
      {
        text: "Model SoundCloud's social graph as partitioned SQL queries in Cosmos DB, and score tracks with a time-decay half-life.",
        projectSlug: "the-sub-delta",
      },
      {
        text: "Cut search indexing over millions of documents from weeks to hours with Azure Search indexers.",
        projectSlug: "azure-engineering",
      },
      {
        text: "Retuned alerting monitors in KQL and backtested them against past incidents before shipping, which cut firing on the noisiest alert family sharply.",
        projectSlug: "dynamics-365-contact-center",
      },
    ],
    technologies: ["PostgreSQL", "PostGIS", "Docker", "CesiumJS", "Azure Search", "Cosmos DB", "KQL"],
  },
];
