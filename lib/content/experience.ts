// Career history and impact figures, from my résumé.
// Titles are the real HR titles. Don't add a level or a title that wasn't held.

export type CareerRole = {
  title: string;
  period: string;
};

export type CareerPosition = {
  id: string;
  organization: string;
  team: string;
  period: string;
  roles: CareerRole[];
  summary: string;
  highlights: string[];
  caseStudySlug?: string;
};

export const careerPositions: CareerPosition[] = [
  {
    id: "d365-contact-center",
    organization: "Microsoft",
    team: "Dynamics 365 Contact Center",
    period: "2026 to present",
    roles: [{ title: "Software Engineer II", period: "January 2026 to present" }],
    summary:
      "Customer chat and agent experiences that span three product organizations, from React UI and SDKs to C# services and on-call. I work AI-first here, with coding agents running inside guardrails I built for the team.",
    highlights: [
      "Merged 500+ pull requests in my first 10 months, in codebases owned by three product organizations.",
      "Built the production Live Chat Widget into Copilot Studio's agent test chat, from an empty repository to CDN deployment in six weeks.",
      "Designed the embed's security boundary on both sides of two repositories, so no credential enters the widget's iframe.",
      "Moved two products onto one shared React chat renderer, and replaced three configuration models with one versioned TypeScript contract.",
      "Took the live chat service's on-call rotation and shipped 10+ C#/.NET fixes to its messaging and orchestration services.",
      "Earlier in 2026, led frontend architecture for a new agent desktop and embedded it inside Salesforce.",
    ],
    caseStudySlug: "dynamics-365-contact-center",
  },
  {
    id: "azure-cxp",
    organization: "Microsoft",
    team: "Azure CXP Engineering (now Azure Engineering Operations)",
    period: "2018 to 2026",
    roles: [
      { title: "Software Engineer II", period: "September 2022 to January 2026" },
      { title: "Software Engineer", period: "October 2018 to September 2022" },
    ],
    summary:
      "Customer-facing Azure experiences and the internal tools Microsoft uses to support Azure customers.",
    highlights: [
      "Led the Knockout to React and TypeScript rewrite of a customer-facing Azure portal extension as its frontend owner.",
      "Delivered support case creation for Services Hub 2.0 in about three months, piloted to about 4,000 users.",
      "Built a config-driven forms engine with business rules that became a platform's main data-entry experience.",
      "Cut a platform's Azure subscription costs by about $142.7K a year (36%) by removing redundant infrastructure.",
      "Added about 100 Playwright end-to-end tests as a release gate.",
      "Onboarded and mentored new teammates, and helped raise the team's frontend standards.",
    ],
    caseStudySlug: "azure-engineering",
  },
  {
    id: "mindtree",
    organization: "Mindtree",
    team: "Vendor engineer for Microsoft Azure CXP",
    period: "2016 to 2018",
    roles: [{ title: "Software Engineer", period: "December 2016 to October 2018" }],
    summary:
      "I joined Azure CXP as a vendor engineer and took ownership of the frontend of an internal app that tells Microsoft's Azure field teams when an outage affects their customers. That work is what got me hired at Microsoft full time in October 2018.",
    highlights: [
      "Took the app from a pilot to a preview release, working through feedback from its first users.",
      "Rebuilt it in React and retired the AngularJS version, then set it up on a new web platform with routing, telemetry, an error boundary, and token refresh.",
      "Started its move to TypeScript and Redux, and added alerts, impacted-customer views, and SMS phone verification.",
      "Parts of the UI I built are still in production today, years after I moved on to other projects.",
    ],
  },
];

export type ImpactFigure = {
  value: string;
  label: string;
  context: string;
  /** Only verified figures are rendered. Set this to false to hold a figure back while it's checked. */
  verified: boolean;
};

export const impactFigures: ImpactFigure[] = [
  {
    value: "$142.7K",
    label: "a year in Azure costs removed",
    context: "36% of one CXP platform's Azure subscription spend, by removing redundant infrastructure.",
    verified: true,
  },
  {
    value: "~4,000",
    label: "users in a support pilot",
    context: "Services Hub 2.0 support case creation, which I delivered in about three months.",
    verified: true,
  },
  {
    value: "0 → 77%+",
    label: "unit test coverage",
    context: "On the Azure portal extension rewrite, which also cut local dev startup by 65%.",
    verified: true,
  },
  {
    value: "6 weeks",
    label: "from empty repo to CDN",
    context: "For the Live Chat Widget inside Copilot Studio's agent test chat.",
    verified: true,
  },
];

export const education = {
  school: "University of Wisconsin–Eau Claire",
  degree: "Bachelor of Science, Software Engineering",
  minor: "Minor in Economics",
  graduated: "December 2016",
};
