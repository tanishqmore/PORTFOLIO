import { useEffect } from 'react'
import { isValidPublicUrl, site } from '@/config/site'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Updates title, canonical, Open Graph, Twitter and JSON-LD for the current page. */
export function useSeo(opts: { title?: string; description?: string; path?: string; noindex?: boolean } = {}) {
  const { title, description = site.seo.description, path = '/', noindex = false } = opts

  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | AI & Machine Learning Student Portfolio`
    document.title = fullTitle

    const base = isValidPublicUrl(site.siteUrl) ? site.siteUrl.replace(/\/$/, '') : ''
    const url = base ? base + path : ''
    const image = base ? base + site.seo.ogImage : ''

    setMeta('name', 'description', description)
    setMeta('name', 'keywords', site.seo.keywords.join(', '))
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:site_name', site.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    if (url) {
      setLink('canonical', url)
      setMeta('property', 'og:url', url)
    }
    if (image) {
      setMeta('property', 'og:image', image)
      setMeta('name', 'twitter:image', image)
    }

    // Structured data: only facts the owner supplied. No employment history.
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: 'B.Tech Artificial Intelligence & Machine Learning Student',
      url: url || undefined,
      address: { '@type': 'PostalAddress', addressLocality: site.location },
      sameAs: [site.github, site.linkedin],
      knowsAbout: site.interests,
    }
    let script = document.getElementById('ld-json') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'ld-json'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ld)
  }, [title, description, path, noindex])
}
