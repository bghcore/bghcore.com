// Site-wide identity and contact details. Everything here is public.

export const site = {
  url: "https://bghcore.com",
  name: "Bradley Hanson",
  firstName: "Bradley",
  lastName: "Hanson",
  jobTitle: "Software Engineer II",
  employer: "Microsoft",
  team: "Dynamics 365 Contact Center",
  location: "Greater Seattle Area",
  region: "Washington",
  focus: "React, TypeScript, full stack",
  email: "b.g.h@outlook.com",
  linkedin: "https://www.linkedin.com/in/bradleyghanson/",
  github: "https://github.com/bghcore",
  headline: "Building complex software into intuitive experiences.",
  /** Headshot in /public, cropped from a 2026 photo (eyes about 40% from the top), lightly color-graded, saved without camera metadata. */
  portrait: {
    src: "/bradley-hanson.jpg",
    width: 1000,
    height: 1250,
    alt: "Bradley Hanson, smiling, in a green suit outdoors",
  },
  intro:
    "I'm a software engineer at Microsoft with 8+ years building products across Azure and Dynamics 365. I work mostly in React and TypeScript, and when a feature needs it I follow it down into SDKs and C# services.",
  description:
    "Bradley Hanson is a software engineer at Microsoft in the Greater Seattle Area. He builds React and TypeScript products across Azure and Dynamics 365, plus open-source SDKs and independent projects like Civic Maps.",
  /**
   * Optional public path to a résumé PDF placed in /public, for example "/bradley-hanson-resume.pdf".
   * The web résumé at /resume/ always exists. When this is set, that page also offers the PDF.
   * Keep it null until a reviewed PDF without a phone number exists.
   */
  resumePath: null as string | null,
};

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
