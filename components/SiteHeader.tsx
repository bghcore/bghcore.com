import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2 sm:h-14 sm:flex-nowrap sm:px-6 sm:py-0">
        <Link href="/" className="flex items-baseline gap-2.5 text-sm">
          <span className="font-semibold tracking-tight whitespace-nowrap">{site.name}</span>
          <span className="hidden font-mono text-xs text-subtle lg:inline">{site.jobTitle}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <ul className="hidden items-center md:flex">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center md:hidden">
            {navigation
              .filter((link) => link.mobile)
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-md px-2 py-1.5 text-sm text-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
          <span className="ml-1 sm:ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
