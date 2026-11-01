import { Icon } from "@/components/Icon";

// Built from HTML boxes rather than SVG so the text stays readable at phone widths.
// From sm up it reads left to right. On phones it stacks as iframe, MessagePort, host code, so
// the WebSocket arrow below the frame always sits under the host code that owns the connection.
export function CredentialBoundaryDiagram() {
  return (
    <figure>
      <div className="rounded-md border border-dashed border-line-strong p-4 sm:p-5">
        <p className="font-mono text-xs text-subtle">Copilot Studio page</p>
        <div className="mt-3 grid items-stretch gap-2 sm:grid-cols-[1fr_8rem_1fr] sm:gap-3">
          <DiagramBox title="Host code" className="order-3 sm:order-none">
            <li>Owns the auth token</li>
            <li>Opens the WebSocket</li>
          </DiagramBox>
          <div className="order-2 flex flex-col items-center justify-center py-1 text-center sm:order-none">
            <Icon name="arrow-up" className="size-4 text-accent sm:hidden" />
            <Icon name="arrow-right" className="hidden size-4 text-accent sm:block" />
            <span className="mt-1 font-mono text-xs">MessagePort</span>
            <span className="text-xs text-subtle">versioned, origin-checked</span>
          </div>
          <DiagramBox title="Live Chat Widget iframe" highlighted className="order-1 sm:order-none">
            <li>Renders the chat</li>
            <li>Never holds a credential</li>
          </DiagramBox>
        </div>
      </div>
      <div className="grid sm:grid-cols-[1fr_8rem_1fr] sm:gap-3">
        <div className="flex flex-col items-center py-2 text-center sm:px-5">
          <Icon name="arrow-up-down" className="size-4 text-subtle" />
          <span className="mt-1 font-mono text-xs text-subtle">WebSocket and SSE</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-[1fr_8rem_1fr] sm:gap-3">
        <div className="sm:px-5">
          <DiagramBox title="Orchestration service">
            <li>Runs the agent conversation</li>
          </DiagramBox>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-pretty text-muted">
        The host keeps the credential and the connection. The widget gets only a message channel, so nothing in the
        iframe can leak a token.
      </figcaption>
    </figure>
  );
}

function DiagramBox({
  title,
  highlighted = false,
  className = "",
  children,
}: {
  title: string;
  highlighted?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-md border bg-surface px-4 py-3 ${highlighted ? "border-accent" : "border-line-strong"} ${className}`}
    >
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-1.5 space-y-0.5 text-sm text-muted">{children}</ul>
    </div>
  );
}
