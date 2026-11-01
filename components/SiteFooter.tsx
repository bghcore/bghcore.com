import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a className="hover:text-ink" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href={site.linkedin}>
              LinkedIn
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href={site.github}>
              GitHub
            </a>
          </li>
          <li>
            <Link className="hover:text-ink" href="/work/">
              All work
            </Link>
          </li>
          <li>
            <Link className="hover:text-ink" href="/resume/">
              Résumé
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
