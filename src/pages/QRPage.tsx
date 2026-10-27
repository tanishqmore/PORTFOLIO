import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { AlertTriangle, Check, Copy, Download } from 'lucide-react'
import { isValidPublicUrl, site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function QRPage() {
  useSeo({ title: 'Share my portfolio', path: '/qr', noindex: true })
  const url = site.siteUrl.replace(/\/$/, '')
  const valid = isValidPublicUrl(url)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!valid || !canvas.current) return
    QRCode.toCanvas(canvas.current, url, {
      width: 280,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#000000', light: '#ffffff' },
    }).catch(() => setError('Could not generate the QR code. Please reload the page.'))
  }, [valid, url])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Copy failed. Please select and copy the link manually.')
    }
  }, [url])

  // 2400px PNG: sharp at print sizes (about 8 cm at 750 dpi, or an A5 poster).
  const downloadPng = useCallback(async () => {
    try {
      const data = await QRCode.toDataURL(url, { width: 2400, margin: 4, errorCorrectionLevel: 'H' })
      const a = document.createElement('a')
      a.href = data
      a.download = 'tanishq-more-portfolio-qr.png'
      a.click()
    } catch {
      setError('Could not create the download. Please try again.')
    }
  }, [url])

  // SVG is vector: scales infinitely, ideal for print shops.
  const downloadSvg = useCallback(async () => {
    try {
      const svg = await QRCode.toString(url, { type: 'svg', margin: 4, errorCorrectionLevel: 'H' })
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const href = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = href
      a.download = 'tanishq-more-portfolio-qr.svg'
      a.click()
      URL.revokeObjectURL(href)
    } catch {
      setError('Could not create the download. Please try again.')
    }
  }, [url])

  return (
    <>
      <Navbar />
      <main id="main" className="container-x pb-20 pt-28">
        <p className="eyebrow">Share</p>
        <h1 className="h2 !mt-2">Share my portfolio</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Scan the code with a phone camera to open my portfolio directly. No login or app required.
        </p>

        {!valid ? (
          <div className="card mt-10 max-w-2xl border-amber-400/40 p-6" role="alert">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber-400" size={20} aria-hidden="true" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium">The public website URL has not been configured yet.</p>
                <p className="mt-2 text-muted">
                  To avoid a misleading QR code, none is shown until a real HTTPS address is set. After deploying:
                </p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-muted">
                  <li>
                    Open <code className="font-mono text-fg">src/config/site.ts</code>
                  </li>
                  <li>
                    Set <code className="font-mono text-fg">siteUrl: 'https://your-site.vercel.app'</code>
                  </li>
                  <li>Rebuild and redeploy, then reload this page.</li>
                </ol>
                {typeof window !== 'undefined' && !isValidPublicUrl(window.location.origin) && (
                  <p className="mt-3 text-xs text-muted">
                    You are viewing this from <span className="font-mono">{window.location.origin}</span>, which is
                    not a public address, so a QR code from it would not work on other phones.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-10 md:grid-cols-[auto_1fr]">
            <div className="card mx-auto p-5 md:mx-0">
              <canvas
                ref={canvas}
                width={280}
                height={280}
                className="h-auto max-w-full rounded-lg bg-white"
                role="img"
                aria-label={`QR code linking to ${url}`}
              />
              <p className="mt-3 text-center font-mono text-xs text-muted">{url.replace('https://', '')}</p>
            </div>

            <div className="space-y-5">
              <div className="card p-4">
                <p className="text-xs uppercase tracking-wider text-muted">Portfolio link</p>
                <p className="mt-1 break-all font-mono text-sm">{url}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={copy} className="btn-primary">
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy link'}
                </button>
                <button type="button" onClick={downloadPng} className="btn-ghost">
                  <Download size={16} aria-hidden="true" /> PNG (print quality)
                </button>
                <button type="button" onClick={downloadSvg} className="btn-ghost">
                  <Download size={16} aria-hidden="true" /> SVG (vector)
                </button>
              </div>
              <div className="text-sm leading-relaxed text-muted">
                <p className="font-medium text-fg">Where to use it</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Resume or CV header (keep it at least 2 cm wide)</li>
                  <li>Visiting cards, posters and presentation slides</li>
                  <li>Keep a white border around the code and print it dark on light</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-6 text-sm text-red-400">
            {error}
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
