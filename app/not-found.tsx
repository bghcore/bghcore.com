import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-24 sm:px-8">
      <h1 className="text-4xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-muted">
        Try the{" "}
        <Link href="/" className="link">
          home page
        </Link>{" "}
        or the{" "}
        <Link href="/work/" className="link">
          list of work
        </Link>
        .
      </p>
    </div>
  );
}
