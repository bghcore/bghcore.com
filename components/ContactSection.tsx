import { Icon } from "@/components/Icon";
import Link from "next/link";
import { site } from "@/lib/site";

export function ContactSection() {
  const contactRows = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/bradleyghanson", href: site.linkedin },
    { label: "GitHub", value: "github.com/bghcore", href: site.github },
    { label: "Résumé", value: "bghcore.com/resume", href: "/resume/" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs text-accent">Contact</p>
          <h2 id="contact-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted">
            I&apos;m open to senior product engineering roles where React and TypeScript are central and the work
            reaches across the stack. Email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            <Link
              href="/resume/"
              className="inline-flex items-center rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              View my résumé
            </Link>
          </div>
        </div>
        <ul className="divide-y divide-line border-y border-line lg:col-span-6 lg:self-end">
          {contactRows.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                className="group grid grid-cols-[6rem_1fr_auto] items-baseline gap-4 py-4 transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs text-subtle">{row.label}</span>
                <span className="min-w-0 truncate text-sm sm:text-base">{row.value}</span>
                <Icon name="arrow-up-right" className="size-4 text-subtle transition-colors group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
