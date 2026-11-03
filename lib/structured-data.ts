import { education } from "@/lib/content/experience";
import type { Project } from "@/lib/content/projects";
import { absoluteUrl, site } from "@/lib/site";

const personId = `${site.url}/#person`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    url: site.url,
    image: absoluteUrl(site.portrait.src),
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.employer, url: "https://www.microsoft.com" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    homeLocation: {
      "@type": "Place",
      name: site.location,
      address: { "@type": "PostalAddress", addressRegion: "WA", addressCountry: "US" },
    },
    description: site.description,
    sameAs: [site.linkedin, site.github],
    knowsAbout: [
      "React",
      "TypeScript",
      "Full-stack web development",
      "Frontend architecture",
      "Enterprise SaaS",
      "SDK design",
      "Accessibility",
      "Microsoft Azure",
      "Dynamics 365",
      "AI-assisted software engineering",
      "PostGIS",
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": project.format === "case-study" ? "Article" : "CreativeWork",
    headline: project.title,
    name: project.name,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}/`),
    image: absoluteUrl(`/work/${project.slug}/og.png`),
    author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
    keywords: project.technologies.join(", "),
  };
}
