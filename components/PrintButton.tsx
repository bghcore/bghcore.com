"use client";

import { Icon } from "@/components/Icon";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
    >
      <Icon name="printer" className="size-4" />
      Print or save as PDF
    </button>
  );
}
