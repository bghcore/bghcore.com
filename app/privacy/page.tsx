import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What bghcore.com collects about visitors: anonymous page views and nothing else.",
  alternates: { canonical: "/privacy/" },
  openGraph: { url: "/privacy/" },
};

// Keep this page in step with the site. If tracking, forms, or cookies change, update it first.
export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
      <p className="font-mono text-xs text-accent">Privacy</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">What this site collects</h1>
      <p className="mt-2 text-sm text-subtle">Last updated November 1, 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-pretty">
        <section>
          <h2 className="text-lg font-semibold">No accounts, forms, or cookies</h2>
          <p className="mt-2 text-muted">
            This is a static personal site. It has no sign-in, no forms, and no advertising, and it sets no cookies.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Page-view analytics</h2>
          <p className="mt-2 text-muted">
            The site uses Vercel Web Analytics to count page views. It records which page was viewed, the referring
            site, and general details like country, browser, and device type, so I can see which pages people read. It
            uses no cookies and doesn&apos;t identify you across sites or over time. Details are in{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy" className="text-link text-ink">
              Vercel&apos;s analytics privacy documentation
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Your theme choice</h2>
          <p className="mt-2 text-muted">
            If you switch to the light theme, your browser saves that choice in its own local storage so the site
            remembers it. It stays on your device and is never sent anywhere.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Hosting</h2>
          <p className="mt-2 text-muted">
            The site is hosted on Vercel. Like any web host, Vercel processes standard request data, such as IP
            addresses and browser details, to serve pages and protect against abuse. Its handling is covered by{" "}
            <a href="https://vercel.com/legal/privacy-policy" className="text-link text-ink">
              Vercel&apos;s privacy policy
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Links to other sites</h2>
          <p className="mt-2 text-muted">
            Project pages link to other sites, such as GitHub, npm, and my own projects. Those sites have their own
            policies.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Questions</h2>
          <p className="mt-2 text-muted">
            Email me at{" "}
            <a href={`mailto:${site.email}`} className="text-link text-ink">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
