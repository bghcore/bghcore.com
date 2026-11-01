import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site";

const navigationLinks = [
  { href: "/work/", label: "Work" },
  { href: "/#how-i-work", label: "How I work" },
  { href: "/#experience", label: "Experience" },
  { href: "/about/", label: "About" },
  { href: "/resume/", label: "Résumé" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2.5 text-sm">
          <span className="font-semibold tracking-tight whitespace-nowrap">{site.name}</span>
          <span className="hidden font-mono text-xs text-subtle sm:inline">Software Engineer</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <ul className="hidden items-center md:flex">
            {navigationLinks.map((link) => (
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
            <li>
              <Link href="/work/" className="rounded-md px-2 py-1.5 text-sm text-muted hover:text-ink">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about/" className="rounded-md px-2 py-1.5 text-sm text-muted hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="rounded-md px-2 py-1.5 text-sm text-muted hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
          <span className="ml-1 sm:ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
