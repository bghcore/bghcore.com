import { education } from "@/lib/content/experience";
import type { Project } from "@/lib/content/projects";
import { absoluteUrl, pageUpdated, site } from "@/lib/site";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

/** Points at the Person by id, so pages that only mention the person don't redefine it. */
const personRef = { "@id": personId };

/** The full Person. The home page and the About page's ProfilePage emit it, with the same values. */
function person() {
  return {
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
      "PostGIS",
    ],
  };
}

/** Home page: the site and the person it is about. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-US",
        publisher: personRef,
      },
      person(),
    ],
  };
}

/** About page: a ProfilePage whose main entity is the same Person. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/about/")}#profile`,
    url: absoluteUrl("/about/"),
    name: `About ${site.name}`,
    dateModified: pageUpdated["/about/"],
    isPartOf: { "@id": websiteId },
    mainEntity: person(),
  };
}

/** Pages about the person that are not the profile itself (the résumé, the work index). */
export function webPageJsonLd(path: keyof typeof pageUpdated, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    dateModified: pageUpdated[path],
    isPartOf: { "@id": websiteId },
    about: personRef,
  };
}

/** Project and case study pages: the work, its author by reference, and a breadcrumb trail. */
export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}/`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.format === "case-study" ? "Article" : "CreativeWork",
        "@id": `${url}#work`,
        headline: project.title,
        name: project.name,
        description: project.summary,
        url,
        image: absoluteUrl(`/work/${project.slug}/og.png`),
        dateModified: project.updated,
        author: personRef,
        isPartOf: { "@id": websiteId },
        keywords: project.technologies.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work/") },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}
