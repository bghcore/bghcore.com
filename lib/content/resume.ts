// Web résumé, written for a public page: no phone number and no internal tool names.
// Titles and periods come from careerPositions so the two never drift apart.

import type { CareerPosition } from "./experience";

export type ResumeBullet = {
  /** Bolded opening phrase, including its trailing punctuation when a detail follows. */
  lead: string;
  detail?: string;
};

export type ResumeBulletGroup = {
  /** Optional subheading for a position with distinct stretches of work. */
  heading?: string;
  period?: string;
  bullets: ResumeBullet[];
};

export type ResumePosition = {
  positionId: CareerPosition["id"];
  groups: ResumeBulletGroup[];
};

export type ResumeSkillLine = {
  area: string;
  skills: string;
};

export const resumeSummary =
  "Full-stack engineer with ten years on Microsoft products, the first two as a vendor. In 10 months on Dynamics 365 Contact Center I merged 500+ pull requests across codebases owned by three product organizations, from React UI and SDKs to C#/.NET services, pipelines, and on-call. I build with AI coding agents every day and own the guardrails that let a team do the same safely.";

export const resumeSkills: ResumeSkillLine[] = [
  {
    area: "Frontend",
    skills:
      "React, TypeScript, JavaScript, Redux and Redux-Saga, Zustand, TanStack Query, React Hook Form, Fluent UI, Vite, Next.js, accessibility (WCAG 2.1), internationalization, design systems",
  },
  {
    area: "Backend and APIs",
    skills:
      "Node.js, C# / .NET, REST, WebSocket and SSE transports, OAuth 2.0, MSAL, PKCE, SQL Server, Cosmos DB, Azure Search, Azure Service Fabric",
  },
  {
    area: "SDKs and integration",
    skills:
      "npm SDK publishing, cross-origin iframe and postMessage protocols, Salesforce Lightning Web Components, Microsoft Dataverse, Azure portal extensions",
  },
  {
    area: "Quality and delivery",
    skills:
      "Playwright, Vitest, Jest, GitHub Actions, Azure DevOps pipelines, feature flags, staged multi-region releases, telemetry, alerting, KQL, incident response",
  },
  {
    area: "AI-assisted engineering",
    skills: "Claude Code, Cursor, Grok Build, GitHub Copilot CLI and coding agent, MCP, agent skills and rule libraries, RAG",
  },
];

export const resumePositions: ResumePosition[] = [
  {
    positionId: "d365-contact-center",
    groups: [
      {
        heading: "Live Chat Widget and Copilot Studio integration",
        period: "June 2026 to present",
        bullets: [
          {
            lead: "Built the production chat widget into Microsoft Copilot Studio's agent test chat,",
            detail:
              "taking it from an empty repository to CDN deployment in six weeks: new React packages, a TypeScript transport SDK for the orchestration service's WebSocket and SSE protocol (reverse-engineered with a local simulator), and an independent release pipeline routing to 13 production regions. Makers now test agents in the same chat UI their customers see.",
          },
          {
            lead: "Designed the embed's security boundary on both sides of two repositories.",
            detail:
              "The Copilot Studio host owns the auth token and the WebSocket. The widget iframe receives only a transferred MessagePort over a versioned, origin-validated protocol, so no credential enters the iframe.",
          },
          {
            lead: "Converged two products onto one shared React chat renderer,",
            detail:
              "starting with a 391-file rename that changed no runtime behavior, then a planned stack of four PRs verified to have no runtime impact on the shipping widget. Added build checks that fail CI if either product reimplements shared behavior.",
          },
          {
            lead: "Replaced three widget-configuration models with one versioned TypeScript contract",
            detail:
              "(admin center, Copilot Studio, and the runtime widget). It handles v1 and v2 compatibility, preserves unknown fields, and rejects unsafe CSS and URLs. I shipped it into all three products so a partial save in one can no longer erase another's settings, then delivered admin-side appearance and dark-mode authoring end to end.",
          },
          {
            lead: "Took the live chat service's on-call rotation.",
            detail:
              "Root-caused a high-severity outage within about an hour, wrote the RCA, removed the failure mode in the C# messaging service, and built an alert that would have fired 11 minutes before existing monitoring.",
          },
          {
            lead: "Shipped 10+ C#/.NET fixes to the messaging and orchestration services,",
            detail: "including recovery from a failed AI dialog that had left customers' chat sessions silent.",
          },
        ],
      },
      {
        heading: "New agent desktop",
        period: "January to June 2026",
        bullets: [
          {
            lead: "Led frontend architecture for a new agent desktop on a mostly backend team.",
            detail:
              "Migrated the design system to Fluent UI v9 in a single 243-file PR, unified two state systems into one store, and built the three-tier Playwright test architecture.",
          },
          {
            lead: "Embedded the desktop inside Salesforce end to end.",
            detail:
              "Designed a host-bridge postMessage protocol, upgraded MSAL with a manual PKCE token exchange through Salesforce's iframe sandbox, and built a Lightning Web Component container plus an installable host SDK that kept existing embedded customers compatible.",
          },
          {
            lead: "Owned a customer-requested post-call quality survey end to end,",
            detail:
              "from the voice SDK transport to admin eligibility settings and an accessible rating dialog, and verified it on a live phone call.",
          },
          {
            lead: "Owned security for the public Live Chat Widget SDKs on npm.",
            detail:
              "Shipped 9 CVE remediations across 5 packages with none reverted, and added hotfix release workflows and OIDC trusted publishing to all 4 repositories.",
          },
          {
            lead: "Built the team's AI-assisted development guardrails:",
            detail:
              "13 architecture rule files, 3 agent skills, and repository instructions across 5 codebases, plus a weekly automated architecture-drift audit. Ran an agentic development workshop for about 11 engineers and built an on-call workbench that pulls incident history, past mitigations, and telemetry into one command.",
          },
        ],
      },
    ],
  },
  {
    positionId: "azure-cxp",
    groups: [
      {
        bullets: [
          {
            lead: "Led the Knockout to React and TypeScript rewrite of a customer-facing Azure portal extension",
            detail:
              "as its frontend owner: 100+ PRs, the legacy framework fully removed, unit test coverage from 0 to 77%+, and local dev startup cut 65% (4:32 to 1:34), coordinating across the UX, portal-platform, and deployment teams.",
          },
          {
            lead: "Migrated the extension to resource-provider deployment across the Azure Public, US Government, and China clouds,",
            detail:
              "which halved its core Assessments component (3,000 to 1,500 lines), closed a Secure Future Initiative compliance item, and remediated 10+ .NET and npm CVEs.",
          },
          {
            lead: "Delivered support case creation for Services Hub 2.0 in about three months (56 PRs)",
            detail:
              "on a stack I hadn't used before, covering product and problem selection, validation, and additional contacts. It was piloted to about 4,000 users.",
          },
          {
            lead: "Frontend owner of a customer-engagement management platform.",
            detail:
              "Built its config-driven forms engine with business rules (React Hook Form), which became the product's main data-entry experience, plus tree-view navigation and shared controls that other CXP apps reused.",
          },
          {
            lead: "Cut that platform's Azure subscription costs by $142.7K a year (36%)",
            detail: "by removing redundant infrastructure.",
          },
          { lead: "Introduced about 100 Playwright end-to-end tests as a release gate." },
          { lead: "Onboarded and mentored new teammates, and helped raise the team's frontend standards." },
          {
            lead: "Sole frontend developer of the Azure field's outage-visibility app.",
            detail:
              "Extended its coverage from Azure to Microsoft 365 and Dynamics 365, grew daily users from about 100 to about 173, and cut search indexing over millions of documents from weeks to hours with Azure Search indexers.",
          },
          {
            lead: "Took an internal tool from a hackathon prototype to production,",
            detail:
              "replacing a legacy ASP.NET MVC app on the shared CXP UX platform. Later led two AI hackathon teams that added RAG-based recommendations to assessments.",
          },
        ],
      },
    ],
  },
  {
    positionId: "mindtree",
    groups: [
      {
        bullets: [
          {
            lead: "Owned the frontend of an internal outage-alerting app for the Azure field,",
            detail:
              "taking it from pilot to preview release, then rebuilding it in React to retire AngularJS, with routing, telemetry, an error boundary, and token refresh.",
          },
          {
            lead: "Started its migration to TypeScript and Redux",
            detail:
              "and added alerts, impacted-customer views, and SMS phone verification. Parts of that UI are still in production today.",
          },
          {
            lead: "Hired by Microsoft as a full-time engineer in October 2018",
            detail: "on the strength of that work.",
          },
        ],
      },
    ],
  },
];

/** Projects listed on the résumé, in order. Their summaries come from projects.ts. */
export const resumeProjectSlugs = ["soundcloud-libraries", "formosaic", "civic-maps", "the-sub-delta"];
