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
  focus: "React, TypeScript, and full-stack product architecture",
  email: "b.g.h@outlook.com",
  linkedin: "https://www.linkedin.com/in/bradleyghanson/",
  github: "https://github.com/bghcore",
  /** Positioning line. Official HR title stays in `jobTitle`. */
  headline: "I build products end-to-end, from React interfaces to the systems behind them.",
  /** Shorter line for the social card, where the full headline would wrap too far. */
  cardTitle: "I build products end to end.",
  specialization: "Full-Stack Software Engineer",
  specialties: ["React", "TypeScript", "Enterprise SaaS", "AI-Native Engineering"] as const,
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
    "I'm a software engineer at Microsoft specializing in React, TypeScript, and full-stack architecture for enterprise SaaS. I build customer-facing products and the platforms behind them, and I use AI-native workflows to move faster without giving up the architecture, the tests, or what ships to production.",
  description:
    "Bradley Hanson is a Software Engineer II at Microsoft in the Greater Seattle Area. He builds enterprise products end to end in React and TypeScript, from customer-facing interfaces and SDKs to the services behind them.",
  /**
   * Public résumé PDF in /public, generated from /resume/ with no phone number.
   * Regenerate it with `pnpm resume:pdf` after résumé copy changes.
   */
  resumePath: "/bradley-hanson-resume.pdf",
};

/** One click from any page to the strongest case study, the résumé, and contact. */
export const navigation = [
  { href: "/work/dynamics-365-contact-center/", label: "Case study", mobile: true },
  { href: "/work/", label: "Work", mobile: false },
  { href: "/resume/", label: "Résumé", mobile: true },
  { href: "/about/", label: "About", mobile: false },
  { href: "/#contact", label: "Contact", mobile: true },
] as const;

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
