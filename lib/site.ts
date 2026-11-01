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
  focus: "Full stack, built with AI agents",
  email: "b.g.h@outlook.com",
  linkedin: "https://www.linkedin.com/in/bradleyghanson/",
  github: "https://github.com/bghcore",
  headline: "Building complex software into intuitive experiences.",
  /**
   * Headshot in /public, cropped from a 2026 photo (eyes about 40% from the top), lightly
   * color-graded, saved without camera metadata. `src` is the JPEG fallback (also used in
   * structured data); AVIF and WebP copies exist at each of `widths` as bradley-hanson-<w>.<ext>.
   */
  portrait: {
    src: "/bradley-hanson.jpg",
    width: 800,
    height: 1000,
    widths: [360, 640, 960],
    alt: "Bradley Hanson, smiling, in a green suit outdoors",
  },
  intro:
    "I'm a full-stack engineer at Microsoft, and I build with AI coding agents every day. In my first 10 months on Dynamics 365 Contact Center I've merged 500+ pull requests, from React UI and SDKs down to C# services, pipelines, and monitors, in codebases owned by three product organizations.",
  description:
    "Bradley Hanson is a full-stack software engineer at Microsoft in the Greater Seattle Area. He builds with AI coding agents across React, TypeScript, SDKs, and C# services, and runs independent projects like Civic Maps and The Sub Delta.",
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
