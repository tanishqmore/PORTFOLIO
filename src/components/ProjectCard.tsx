import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, ExternalLink, FolderGit2 } from 'lucide-react'
import type { Project } from '@/data/types'
import { validUrl } from '@/lib/utils'
import { GithubIcon } from './Icons'

const statusStyle: Record<Project['status'], string> = {
  Live: 'text-emerald-400 border-emerald-400/30',
  'In Development': 'text-amber-400 border-amber-400/30',
  Completed: 'text-sky-400 border-sky-400/30',
}

export function Thumbnail({ project, className = '' }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (project.thumbnail && !failed) {
    return (
      <img
        src={project.thumbnail}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  // Graceful fallback: generated tile, no broken image.
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-elevated text-muted ${className}`}
      role="img"
      aria-label={`${project.title} (screenshot coming soon)`}
    >
      <FolderGit2 size={28} aria-hidden="true" />
      <span className="font-mono text-xs">{project.title}</span>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const live = validUrl(project.liveDemoUrl)
  const repo = validUrl(project.githubUrl)
  const docs = validUrl(project.documentationUrl)

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition hover:border-accent/50">
      <div className="aspect-[16/9] overflow-hidden border-b border-line">
        <Thumbnail project={project} className="transition duration-500 group-hover:scale-[1.03]" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full border px-2.5 py-0.5 ${statusStyle[project.status]}`}>{project.status}</span>
          {project.category.slice(0, 2).map((c) => (
            <span key={c} className="text-muted">
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
          {project.technologies.slice(0, 6).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {project.technologies.length > 6 && (
            <li className="chip text-muted">+{project.technologies.length - 6}</li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Link to={`/projects/${project.slug}`} className="btn-primary !px-4 !py-2">
            Case Study <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2">
              <ExternalLink size={15} aria-hidden="true" /> Live Demo
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-2"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIcon width={15} height={15} /> Code
            </a>
          )}
          {docs && (
            <a
              href={docs}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-2"
              aria-label={`${project.title} documentation`}
            >
              <BookOpen size={15} aria-hidden="true" /> Docs
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
