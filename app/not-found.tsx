import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-muted">
        Try the{" "}
        <Link href="/" className="text-link text-ink">
          home page
        </Link>{" "}
        or the{" "}
        <Link href="/work/" className="text-link text-ink">
          list of work
        </Link>
        .
      </p>
    </div>
  );
}
