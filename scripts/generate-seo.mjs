// Runs automatically before `npm run build`.
// Reads siteUrl from src/config/site.ts and writes sitemap.xml + the Sitemap line in robots.txt.
import { readFileSync, writeFileSync } from 'node:fs'

const cfg = readFileSync('src/config/site.ts', 'utf8')
const siteUrl = (cfg.match(/siteUrl:\s*'([^']*)'/)?.[1] ?? '').replace(/\/$/, '')
const slugs = [...readFileSync('src/data/projects.ts', 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

if (!/^https:\/\/[^/]+\.[^/]+/.test(siteUrl)) {
  console.warn('\n[seo] siteUrl is not set in src/config/site.ts: sitemap and canonical URLs are skipped.\n')
  process.exit(0)
}

const today = new Date().toISOString().slice(0, 10)
const urls = ['/', ...slugs.map((s) => `/projects/${s}`)]
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`
writeFileSync('public/sitemap.xml', xml)

const robots = `User-agent: *\nAllow: /\nDisallow: /qr\n\nSitemap: ${siteUrl}/sitemap.xml\n`
writeFileSync('public/robots.txt', robots)

// Inject canonical + Open Graph image URLs into the static HTML so crawlers that skip JS still see them.
let html = readFileSync('index.html', 'utf8')
html = html.replace(/\n\s*<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, '')
const block = `
    <!-- seo:start -->
    <link rel="canonical" href="${siteUrl}/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:title" content="Tanishq More | AI & Machine Learning Student Portfolio" />
    <meta property="og:description" content="Final-year B.Tech AI & Machine Learning student building practical applications with machine learning, data science and modern software technologies." />
    <meta property="og:image" content="${siteUrl}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${siteUrl}/og-image.png" />
    <!-- seo:end -->`
html = html.replace('<!-- Canonical, Open Graph', `${block}\n    <!-- Canonical, Open Graph`)
writeFileSync('index.html', html)
console.log(`[seo] wrote sitemap.xml, robots.txt and canonical tags for ${siteUrl}`)
