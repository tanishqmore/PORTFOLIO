import { Link } from 'react-router-dom'
import { ArrowUp, Mail } from 'lucide-react'
import { site } from '@/config/site'
import { mailto, validUrl } from '@/lib/utils'
import { GithubIcon, LinkedinIcon } from './Icons'
import { Monogram } from './Monogram'

export function Footer() {
  const github = validUrl(site.github)
  const linkedin = validUrl(site.linkedin)
  const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface transition hover:border-accent/60 hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent'

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <Monogram />
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/qr" className="mr-2 text-sm text-muted hover:text-fg">
            Share via QR
          </Link>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
              <GithubIcon width={18} height={18} />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
              <LinkedinIcon width={18} height={18} />
            </a>
          )}
          <a href={mailto(site.email)} aria-label="Email" className={iconBtn}>
            <Mail size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={iconBtn}
          >
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
