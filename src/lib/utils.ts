/** Returns the URL only if it is a real http(s) link, otherwise ''. */
export function validUrl(url: string | undefined | null): string {
  if (!url) return ''
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:' ? url : ''
  } catch {
    return ''
  }
}

/** Resume may be a path in /public or an absolute URL. */
export function validResume(url: string): string {
  if (!url) return ''
  if (url.startsWith('/')) return url
  return validUrl(url)
}

export function mailto(email: string, subject = '', body = ''): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${email}${q ? `?${q}` : ''}`
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
