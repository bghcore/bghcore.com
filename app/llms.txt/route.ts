import { buildLlmsTxt } from "@/lib/llms";

// Exported as a real out/llms.txt file, so any static host serves it as text/plain.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
