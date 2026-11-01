"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
    >
      <Printer aria-hidden="true" className="size-4" strokeWidth={2} />
      Print or save as PDF
    </button>
  );
}
