import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[68rem] px-5 sm:px-8 print:hidden">
      <div className="flex flex-col gap-2 border-t border-line py-8 text-sm text-subtle sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li>
            <Link className="hover:text-ink hover:underline" href="/work/">
              Work
            </Link>
          </li>
          <li>
            <Link className="hover:text-ink hover:underline" href="/resume/">
              Résumé
            </Link>
          </li>
          <li>
            <Link className="hover:text-ink hover:underline" href="/about/">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-ink hover:underline" href="/privacy/">
              Privacy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
