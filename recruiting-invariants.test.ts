import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { aboutFacts, aboutParagraphs } from "./lib/content/about";
import { newTerritory, throughputNote } from "./lib/content/new-territory";
import { careerPositions, impactFigures, impactNote } from "./lib/content/experience";
import { getFeaturedProjects, getProject, projects } from "./lib/content/projects";
import { resumeSummary } from "./lib/content/resume";
import { buildLlmsFullTxt, buildLlmsTxt } from "./lib/llms";
import { navigation, site } from "./lib/site";

const publicCopy = JSON.stringify({
  site,
  navigation,
  resumeSummary,
  throughputNote,
  newTerritory,
  impactFigures,
  impactNote,
  careerPositions,
  projects,
  aboutParagraphs,
  aboutFacts,
});

test("official title stays Software Engineer II", () => {
  assert.equal(site.jobTitle, "Software Engineer II");
  assert.match(aboutFacts, /Software Engineer II at Microsoft/);
  assert.match(aboutFacts, /Greater Seattle Area/);
  assert.doesNotMatch(publicCopy, /\bSenior\b/);
  assert.deepEqual(
    careerPositions.flatMap((position) => position.roles.map((role) => role.title)),
    ["Software Engineer II", "Software Engineer II", "Software Engineer", "Software Engineer"],
  );
});

test("homepage and résumé lead with product engineering", () => {
  assert.match(site.headline, /end-to-end/);
  assert.match(site.headline, /React/);
  assert.doesNotMatch(site.headline, /pull request|500\+|coding agents/i);
  assert.doesNotMatch(`${site.headline} ${site.intro} ${site.description}`, /AI-native|coding agents/i);
  assert.match(resumeSummary, /React, TypeScript, enterprise SaaS/);
  assert.match(resumeSummary, /Software Engineer II/);
  assert.doesNotMatch(resumeSummary, /500\+/);
  assert.equal(site.specialization, "Full-Stack Software Engineer");
});

test("impact figures stay scoped to one project each", () => {
  assert.deepEqual(
    impactFigures.filter((figure) => figure.verified).map((figure) => figure.value),
    ["2 → 1", "13", "$142.7K", "0 → 77%+"],
  );
  const regions = impactFigures.find((figure) => figure.value === "13");
  assert.ok(regions);
  assert.match(regions.context, /integration's own release pipeline/);
  assert.match(impactNote, /4,000/);
  assert.match(impactNote, /six weeks/);
});

test("AI throughput is secondary and scoped to one team and period", () => {
  assert.match(throughputNote, /500\+/);
  assert.match(throughputNote, /In 10 months on Dynamics 365 Contact Center/);
  assert.equal(impactFigures.some((figure) => /500\+|pull request/i.test(JSON.stringify(figure))), false);
});

test("hiring managers can open the Contact Center case study in one click", () => {
  assert.equal(navigation[0]?.href, "/work/dynamics-365-contact-center/");
  assert.equal(navigation[0]?.mobile, true);
  assert.equal(navigation.some((link) => link.href === "/resume/" && link.mobile), true);
  assert.equal(getFeaturedProjects()[0]?.slug, "dynamics-365-contact-center");

  const project = getProject("dynamics-365-contact-center");
  assert.ok(project);
  assert.equal(project.role, "Software Engineer II");
  assert.equal(project.note, "The products and the code are Microsoft's.");
  assert.deepEqual(
    project.sections.flatMap((section) => section.diagram ?? []),
    ["credential-boundary", "shared-renderer"],
  );
  // The attribution line appears once on the page.
  assert.equal(JSON.stringify(project).split("code are Microsoft's").length - 1, 1);
});

test("public copy does not advertise compensation or unsupported multipliers", () => {
  assert.doesNotMatch(publicCopy, /\$300|\$450|450K|compensation|10x|10×/i);
});

test("résumé download points at a real PDF", () => {
  assert.equal(site.resumePath, "/bradley-hanson-resume.pdf");
  assert.equal(existsSync("public/bradley-hanson-resume.pdf"), true);
  const bytes = readFileSync("public/bradley-hanson-resume.pdf");
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  assert.ok(bytes.length > 20_000);
});

test("llms.txt follows the same content rules as the site", () => {
  const index = buildLlmsTxt();
  const full = buildLlmsFullTxt();
  assert.ok(index.startsWith("# Bradley Hanson\n\n> Bradley Hanson is a Software Engineer II at Microsoft"));
  assert.match(index, /\]\(https:\/\/bghcore\.com\/work\/dynamics-365-contact-center\/\)/);
  assert.match(index, /## Contact/);
  for (const text of [index, full]) {
    assert.doesNotMatch(text, /\bSenior\b/);
    assert.doesNotMatch(text, /\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/);
    assert.doesNotMatch(text, /\$300|\$450|compensation/i);
  }
});
