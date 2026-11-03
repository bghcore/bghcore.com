# bghcore.com

Personal site for Bradley Hanson. Next.js 16 (App Router), React 19, TypeScript in strict mode, and Tailwind CSS v4, built as a fully static export.

## Run it locally

Requires Node 24+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in out/
pnpm lint
pnpm typecheck
```

To check the production build, serve `out/` with any static file server (for example `npx serve out`).

## How it's organized

| Path | What it is |
|---|---|
| `lib/site.ts` | Name, contact links, domain, and the résumé path |
| `lib/content/projects.ts` | Projects and case studies (eight-section structure for case studies) |
| `lib/content/experience.ts` | Career timeline, impact figures (with a `verified` flag), education |
| `lib/content/explorer.ts` | Engineering Explorer domains and the contributions behind each |
| `lib/content/skills.ts` | Technical expertise, split into work and personal-project use |
| `lib/content/about.ts` | About page copy |
| `lib/content/resume.ts` | Web résumé bullets, summary, and skills (titles and periods come from `experience.ts`) |
| `app/` | Routes: `/`, `/work/`, `/work/[slug]/`, `/about/`, `/resume/`, plus `sitemap.xml`, `robots.txt`, and Open Graph images |
| `components/` | Server components, except `ThemeToggle` and `PrintButton` (the only client components) |

Content and presentation are separate. To change what the site says, edit `lib/content/*`.

A few implementation notes:

- **Engineering Explorer.** It's a native radio group. CSS `:has()` shows the matching panel, so it ships no JavaScript, works with scripts off, and is keyboard accessible by default.
- **Themes.** A saved choice in `localStorage` wins, then the system preference, then dark. A small inline script applies it before first paint.
- **Project rows.** A project with an `images` entry shows its first screenshot as a thumbnail. One without (the Microsoft case studies, the libraries) shows its `keyFact` instead, so every row has a visual anchor.
- **Images.** The static export can't optimize images on request, so they're prebuilt. Project screenshots live in `public/projects/` as `<name>-640` and `<name>-1280` in AVIF and WebP, plus a 1280×720 `<name>.jpg` fallback, and a project lists them in its `images` field. The portrait follows the same pattern at 360, 640, and 960px.
- **Analytics.** `@vercel/analytics` adds cookie-free page-view tracking in `app/layout.tsx`. It only reports once Web Analytics is enabled for the Vercel project (project → Analytics → Enable). If you change what's tracked, update `app/privacy/page.tsx` to match.
- **Impact figures.** A figure with `verified: false` stays in the data but never renders, so a number can be held back while it's checked.
- **Résumé.** `/resume/` is a web version of the résumé with no phone number or town. It prints cleanly on its own (the header and footer are hidden and colors switch to light). `public/bradley-hanson-resume.pdf` is a print of that page, linked from the homepage and from `/resume/`. After résumé copy changes, regenerate it with `pnpm resume:pdf` (needs Chrome) while the static site is served at `http://127.0.0.1:4173`, or run `pnpm build && pnpm resume:pdf`.

## Deploy to Vercel with Namecheap DNS

The site URL is `https://bghcore.com` (set in `lib/site.ts`). Canonical URLs, the sitemap, robots, Open Graph tags, and the Person structured data all use it.

### 1. Create the Vercel project

1. In Vercel, choose **Add New → Project** and import `bghcore/bghcore.com`.
2. Vercel detects Next.js and pnpm on its own. The site is at the repository root, so leave **Root Directory** as is.
3. Under **Settings → Build and Deployment**, set the Node.js version to 24.
4. Deploy. With `output: "export"`, Vercel serves the static build.

No `vercel.json` is needed.

The Vercel project (`bghcore-com`) is connected to this repository. Pushes to `main` deploy to production, and other branches get preview URLs.

### 2. Add the domain in Vercel

1. In the project, open **Settings → Domains** and add `bghcore.com`, then `www.bghcore.com`.
2. Set `www.bghcore.com` to redirect to `bghcore.com`, because the canonical URLs use the apex domain.
3. Vercel then shows the DNS records each domain needs: an **A record** for the apex and a **CNAME** for `www`. Copy the exact values from that screen. Don't use values from older guides, because Vercel can show project-specific targets.

### 3. Point Namecheap DNS at Vercel

1. In Namecheap, go to **Domain List → bghcore.com → Manage**.
2. Under **Nameservers**, make sure **Namecheap BasicDNS** is selected. Custom records only apply with Namecheap's own DNS.
3. Open **Advanced DNS**. Delete the default parking records if they're there (usually a `CNAME` for `www` pointing to `parkingpage.namecheap.com` and a URL redirect record for `@`).
4. Add these records, using the values Vercel showed you:

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | A Record | `@` | the apex IP from Vercel's domain screen | Automatic |
   | CNAME Record | `www` | the CNAME target from Vercel's domain screen | Automatic |

5. Save. DNS changes usually show up within minutes and can take up to a day or two. Vercel marks each domain as valid once it sees the records, then issues HTTPS certificates automatically.

### After the first deploy

- Open `https://bghcore.com/sitemap.xml` and `https://bghcore.com/robots.txt` to confirm they're served.
- Paste a page URL into a social card validator (for example LinkedIn's Post Inspector) to check the Open Graph image.
- Optionally add the site in Google Search Console and submit the sitemap.
