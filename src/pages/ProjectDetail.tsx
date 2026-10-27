import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle2, CircleDashed, ExternalLink, HelpCircle } from 'lucide-react'
import { projects } from '@/data/projects'
import type { FeatureItem, Project } from '@/data/types'
import { validUrl } from '@/lib/utils'
import { useSeo } from '@/hooks/useSeo'
import { GithubIcon } from '@/components/Icons'
import { Thumbnail } from '@/components/ProjectCard'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import NotFound from './NotFound'

const stateMeta: Record<FeatureItem['state'], { label: string; icon: typeof CheckCircle2; cls: string }> = {
  implemented: { label: 'Implemented', icon: CheckCircle2, cls: 'text-emerald-400' },
  planned: { label: 'Planned', icon: CircleDashed, cls: 'text-amber-400' },
  unverified: { label: 'Status to be confirmed', icon: HelpCircle, cls: 'text-muted' },
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  )
}

function Screenshot({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="w-full rounded-xl border border-line object-cover"
    />
  )
}

function Detail({ project }: { project: Project }) {
  useSeo({ title: project.title, description: project.summary, path: `/projects/${project.slug}` })
  const live = validUrl(project.liveDemoUrl)
  const repo = validUrl(project.githubUrl)
  const docs = validUrl(project.documentationUrl)
  const extras = (project.extra ?? []).filter((e) => e.value.trim())
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Started', value: project.startDate },
    { label: 'Completed', value: project.completionDate },
  ].filter((m) => m.value)

  return (
    <>
      <Navbar />
      <main id="main" className="container-x pb-20 pt-28">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-line px-2.5 py-0.5">{project.status}</span>
            {project.category.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{project.detailedDescription}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={16} aria-hidden="true" /> Live Demo
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <GithubIcon width={16} height={16} /> GitHub Repository
              </a>
            )}
            {docs && (
              <a href={docs} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <BookOpen size={16} aria-hidden="true" /> Documentation
              </a>
            )}
            {!live && !repo && !docs && (
              <p className="text-sm text-muted">Links will be added soon.</p>
            )}
          </div>
        </header>

        <div className="mt-10 aspect-[16/8] overflow-hidden rounded-2xl border border-line">
          <Thumbnail project={project} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {project.problemStatement && <Block title="Problem">{project.problemStatement}</Block>}
            {project.solution && <Block title="Solution">{project.solution}</Block>}

            {project.features.length > 0 && (
              <Block title="Features">
                <ul className="space-y-2.5">
                  {project.features.map((f) => {
                    const m = stateMeta[f.state]
                    const Icon = m.icon
                    return (
                      <li key={f.text} className="flex items-start gap-3">
                        <Icon size={18} className={`mt-0.5 shrink-0 ${m.cls}`} aria-hidden="true" />
                        <span>
                          <span className="text-fg">{f.text}</span>{' '}
                          <span className={`text-xs ${m.cls}`}>({m.label})</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Block>
            )}

            {project.challenges.length > 0 && (
              <Block title="Challenges">
                <List items={project.challenges} />
              </Block>
            )}
            {project.learnings.length > 0 && (
              <Block title="What I learned">
                <List items={project.learnings} />
              </Block>
            )}
            {project.futureImprovements.length > 0 && (
              <Block title="Future improvements">
                <List items={project.futureImprovements} />
              </Block>
            )}

            {project.screenshots.length > 0 && (
              <section aria-label="Screenshots" className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((s) => (
                  <Screenshot key={s.src} src={s.src} alt={s.alt} />
                ))}
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <Block title="Tech stack">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            {(meta.length > 0 || extras.length > 0) && (
              <Block title="Details">
                <dl className="space-y-3">
                  {[...meta, ...extras].map((m) => (
                    <div key={m.label}>
                      <dt className="text-xs uppercase tracking-wider">{m.label}</dt>
                      <dd className="mt-0.5 text-fg">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <NotFound />
  return <Detail project={project} />
}
