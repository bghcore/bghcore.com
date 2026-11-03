import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { aboutParagraphs } from "./lib/content/about";
import { throughputNote, workflowIntro } from "./lib/content/ai-workflow";
import { careerPositions, impactFigures, impactNote } from "./lib/content/experience";
import { getFeaturedProjects, getProject, projects } from "./lib/content/projects";
import { resumeSummary } from "./lib/content/resume";
import { navigation, site } from "./lib/site";

const publicCopy = JSON.stringify({
  site,
  navigation,
  resumeSummary,
  workflowIntro,
  throughputNote,
  impactFigures,
  impactNote,
  careerPositions,
  projects,
  aboutParagraphs,
});

test("official title stays Software Engineer II", () => {
  assert.equal(site.jobTitle, "Software Engineer II");
  assert.deepEqual(
    careerPositions.flatMap((position) => position.roles.map((role) => role.title)),
    ["Software Engineer II", "Software Engineer II", "Software Engineer", "Software Engineer"],
  );
});

test("homepage and résumé lead with product engineering", () => {
  assert.match(site.headline, /end-to-end/);
  assert.match(site.headline, /React/);
  assert.doesNotMatch(site.headline, /pull request|500\+|coding agents/i);
  assert.match(site.intro, /I own the architecture|own the architecture|architecture, the tests/i);
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
  assert.match(regions.context, /pipeline/i);
  assert.match(regions.context, /not a company-wide footprint/);
  assert.match(impactNote, /4,000/);
  assert.match(impactNote, /six weeks/);
});

test("AI throughput is secondary and not treated as impact", () => {
  assert.match(workflowIntro, /own the architecture/i);
  assert.match(throughputNote, /500\+/);
  assert.match(throughputNote, /not a measure of impact/);
});

test("hiring managers can open the Contact Center case study in one click", () => {
  assert.equal(navigation[0]?.href, "/work/dynamics-365-contact-center/");
  assert.equal(navigation[0]?.mobile, true);
  assert.equal(navigation.some((link) => link.href === "/resume/" && link.mobile), true);
  assert.equal(getFeaturedProjects()[0]?.slug, "dynamics-365-contact-center");

  const project = getProject("dynamics-365-contact-center");
  assert.ok(project?.snapshot);
  assert.equal(project.role, "Software Engineer II");
  assert.match(project.note ?? "", /code are Microsoft's/);
  assert.deepEqual(project.diagrams, ["shared-renderer", "credential-boundary"]);
  assert.ok(project.snapshot.decisions.length >= 4);
  assert.ok(project.snapshot.outcomes.length >= 3);
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
