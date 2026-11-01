import { getProject, projects } from "@/lib/content/projects";
import { renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  return renderOgImage({
    eyebrow: project.format === "case-study" ? "Case study" : "Project",
    title: project.title,
    footer: project.eyebrow,
  });
}
