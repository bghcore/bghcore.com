import { renderOgImage } from "@/lib/og-image";
import { site } from "@/lib/site";

// Exported as a real out/og.png file so any static host serves it as image/png.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage({
    eyebrow: "bghcore.com",
    title: site.cardTitle,
    footer: `${site.jobTitle}, ${site.employer} · React and TypeScript`,
  });
}
