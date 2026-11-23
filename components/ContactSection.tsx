import Link from "next/link";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-[68rem] px-5 sm:px-8">
      <div className="border-t border-line py-14 sm:py-16">
        <h2 id="contact-heading" className="text-3xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-[38rem] text-lg text-pretty">
          I&apos;m interested in senior full-stack roles where the product UI and the systems behind it are one job.
          Email is the fastest way to reach me:{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          <a href={site.linkedin} className="link">
            LinkedIn
          </a>
          <a href={site.github} className="link">
            GitHub
          </a>
          <Link href="/resume/" className="link">
            Résumé
          </Link>
        </p>
      </div>
    </section>
  );
}
