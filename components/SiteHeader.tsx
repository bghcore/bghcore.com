import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="print:hidden">
      <div className="mx-auto flex max-w-[68rem] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 pt-5 pb-3 sm:px-8 sm:pt-7">
        <Link href="/" className="font-serif text-xl font-medium tracking-tight whitespace-nowrap">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.95rem]">
            {navigation.map((link) => (
              <li key={link.href} className={link.mobile ? "" : "hidden sm:list-item"}>
                <Link href={link.href} className="text-muted underline-offset-4 hover:text-ink hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
