# Tanishq More: Portfolio Website

React + TypeScript + Vite + Tailwind CSS static site with a built-in QR code page.
No backend or database, so it hosts for free.

## Project structure

```
src/
  config/site.ts        <- YOUR DETAILS, links, resume path, public URL, section on/off
  data/projects.ts      <- all projects (add/edit here)
  data/skills.ts        <- skill chips
  data/records.ts       <- experience, certifications, achievements (empty = hidden)
  components/           <- Navbar, Hero, About, Skills, ProjectCard, Contact, Resume, Footer...
  pages/                <- Home, ProjectDetail (case study), QRPage (/qr), NotFound (404)
  hooks/ lib/           <- theme, SEO, navigation helpers
public/                 <- favicon, og-image.png, manifest, robots.txt, resume.pdf (you add)
scripts/generate-seo.mjs <- builds sitemap.xml + canonical tags from siteUrl
```

## 1. Install and run locally (Windows PowerShell)

Install Node.js LTS from https://nodejs.org first, then:

```powershell
cd path\to\portfolio
npm install
npm run dev
```

Open the address shown (usually http://localhost:5173).

## 2. Test the production build

```powershell
npm run build
npm run preview
```

`npm run build` type-checks and builds into `dist/`.

## 3. Add your own content

- **Details, links, institution name, location, email:** `src/config/site.ts`
- **Resume:** copy your PDF to `public\resume.pdf`, then set `resumeUrl: '/resume.pdf'`. To replace it later, overwrite the same file.
- **Projects:** edit `src/data/projects.ts`. Fill in `githubUrl`, `liveDemoUrl`, `documentationUrl`; empty values hide the button. Screenshots go in `public\projects\<slug>\`, then list them in `screenshots` and set `thumbnail: '/projects/<slug>/cover.png'`.
- **Feature honesty:** each feature has a state: `implemented`, `planned` or `unverified`. Update them as you verify each one. Only add `Hadoop` to Digital Divider Explorer if you really used it. Fill the `extra` rows (dataset, methodology, evaluation) only with real values.
- **Skills:** `src/data/skills.ts`. **Certifications, achievements, internships:** `src/data/records.ts` (sections appear automatically once a list has an entry).
- **Profile photo (optional):** put it in `public\images\` and set `photoUrl`.

## 4. Contact form

By default the form validates input and opens the visitor's email app with the message pre-filled (a properly encoded `mailto:`), and says so on screen.

To receive messages directly: create a free form at https://formspree.io, copy its endpoint (`https://formspree.io/f/xxxx`) into `contact.formEndpoint` in `site.ts`. No secret is stored in the code. A hidden honeypot field blocks simple bots; Formspree adds its own spam filtering (turn on reCAPTCHA there for more).

## 5. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/tanishqmore/portfolio.git
git push -u origin main
```

Create the empty `portfolio` repository on github.com first (do not add a README there).

## 6. Deploy (Vercel, free)

1. Go to https://vercel.com and sign in with GitHub.
2. Add New, then Project, and import your `portfolio` repo.
3. Keep the detected settings (Framework: Vite, build `npm run build`, output `dist`) and click Deploy.
4. You get a URL like `https://portfolio-xxxx.vercel.app`. (Netlify works too: `netlify.toml` and `public/_redirects` are included.)

## 7. Set the public URL and generate the QR code

1. Open `src/config/site.ts` and set `siteUrl: 'https://portfolio-xxxx.vercel.app'` (https, no trailing slash).
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Set public site URL"
   git push
   ```
   Vercel redeploys automatically. The build now also writes `sitemap.xml`, `robots.txt` and canonical/Open Graph tags.
3. Visit `https://your-site/qr`. The page shows the QR code, a **Copy link** button, and downloads as **PNG** (2400 px, print quality) or **SVG** (vector).
4. Until `siteUrl` is set, `/qr` shows a setup message instead of a QR code, so you never share a wrong one.

## 8. Custom domain later (optional)

Buy a domain from any registrar, then in Vercel go to Project, Settings, Domains, add it and follow the DNS instructions. Update `siteUrl` to the new domain, push, and regenerate the QR code (old codes keep working only if the old URL does).

## 9. Verify on a phone

1. Scan the QR code from the PNG/printout with the camera app.
2. Confirm it opens the homepage directly with HTTPS and no login.
3. Tap every nav item, project button, GitHub/LinkedIn/email link and the resume.
4. Optional: check the share preview at https://www.opengraph.xyz and submit `sitemap.xml` in Google Search Console.

## Pre-publish checklist

- [ ] `site.ts`: institution, email, location, `resumeUrl` and `siteUrl` are correct
- [ ] `public/resume.pdf` exists and opens
- [ ] Every project has real `githubUrl` (and `liveDemoUrl` only if it works)
- [ ] Feature states in each project are accurate; no unverified claims or invented metrics
- [ ] Screenshots added, or the placeholder tile is acceptable
- [ ] `npm run build` finishes without errors
- [ ] Dark and light mode both look right; no horizontal scroll at 360 px width
- [ ] Menu works by touch and keyboard (Tab, Enter, Esc)
- [ ] Contact form tested (mailto opens, or Formspree delivers)
- [ ] `/qr` shows the real URL and the downloaded QR scans correctly
- [ ] `/some-wrong-url` shows the 404 page
- [ ] Social preview and sitemap checked after deploy
