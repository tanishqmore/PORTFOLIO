import { ArrowRight, Download, MapPin, Mail } from 'lucide-react'
import { site } from '@/config/site'
import { projects } from '@/data/projects'
import { validResume, validUrl } from '@/lib/utils'
import { useSectionNav } from '@/hooks/useSectionNav'
import { GithubIcon, LinkedinIcon } from './Icons'
import { Monogram } from './Monogram'

export function Hero() {
  const go = useSectionNav()
  const resume = validResume(site.resumeUrl)
  const github = validUrl(site.github)
  const linkedin = validUrl(site.linkedin)
  const showProjects = site.sections.projects && projects.length > 0
  const stack = Array.from(new Set(projects.flatMap((p) => p.technologies))).slice(0, 8)

  return (
    <section id="home" tabIndex={-1} className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-3">
            <Monogram size={44} />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} aria-hidden="true" /> {site.location}
            </span>
          </div>

          {site.openToWork.enabled && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs">
              <span className="status-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              {site.openToWork.label}
            </p>
          )}

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="block text-lg font-normal text-muted sm:text-xl">Hi, I'm {site.name}</span>
            <span className="gradient-text">{site.headline}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{site.heroSubtext}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {showProjects && (
              <a href="/#projects" onClick={(e) => go('projects', e)} className="btn-primary">
                Explore My Projects <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
            {resume ? (
              <a href={resume} download className="btn-ghost">
                <Download size={16} aria-hidden="true" /> Download Resume
              </a>
            ) : (
              <a href="/#resume" onClick={(e) => go('resume', e)} className="btn-ghost">
                <Download size={16} aria-hidden="true" /> Resume
              </a>
            )}
            {site.sections.contact && (
              <a href="/#contact" onClick={(e) => go('contact', e)} className="btn-ghost">
                <Mail size={16} aria-hidden="true" /> Contact Me
              </a>
            )}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface transition hover:border-accent/60 hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <GithubIcon width={20} height={20} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface transition hover:border-accent/60 hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <LinkedinIcon width={20} height={20} />
              </a>
            )}
          </div>
        </div>

        {/* Developer profile card (no photo needed) */}
        <aside
          aria-label="Profile summary"
          className="animate-float card relative mx-auto w-full max-w-sm overflow-hidden p-6 shadow-xl shadow-black/10"
        >
          <div className="flex items-center justify-between font-mono text-[11px] text-muted">
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="h-2.5 w-2.5 rounded-full bg-line" />
              <i className="h-2.5 w-2.5 rounded-full bg-line" />
              <i className="h-2.5 w-2.5 rounded-full bg-line" />
            </span>
            <span>profile.json</span>
          </div>

          {site.photoUrl ? (
            <img
              src={site.photoUrl}
              alt={`Portrait of ${site.name}`}
              width={96}
              height={96}
              className="mt-5 h-24 w-24 rounded-2xl object-cover"
            />
          ) : (
            <div className="mt-5">
              <Monogram size={64} />
            </div>
          )}

          <p className="mt-4 text-lg font-semibold">{site.name}</p>
          <p className="text-sm text-muted">B.Tech AI &amp; Machine Learning</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-line bg-elevated p-3">
              <dt className="text-xs text-muted">Graduation</dt>
              <dd className="mt-0.5 font-medium">{site.education.graduation.replace(' (Expected)', '')}</dd>
            </div>
            <div className="rounded-xl border border-line bg-elevated p-3">
              <dt className="text-xs text-muted">CGPA</dt>
              <dd className="mt-0.5 font-medium">{site.education.cgpa}</dd>
            </div>
          </dl>

          {stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used in projects">
              {stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  )
}
