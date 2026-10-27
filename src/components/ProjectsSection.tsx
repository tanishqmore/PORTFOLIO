import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { projectCategories, projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>('All')
  const [query, setQuery] = useState('')

  // Only show filter chips that actually have projects (plus "All").
  const available = useMemo(
    () => projectCategories.filter((c) => c === 'All' || projects.some((p) => p.category.includes(c))),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const inCat = category === 'All' || p.category.includes(category)
      if (!inCat) return false
      if (!q) return true
      return [p.title, p.summary, ...p.technologies, ...p.category].join(' ').toLowerCase().includes(q)
    })
  }, [category, query])

  return (
    <section id="projects" tabIndex={-1} className="section border-t border-line/60" aria-labelledby="projects-title">
      <div className="container-x">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-title" className="h2">
          Things I've built
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Each project has a case study with the problem, approach and honest status of every feature.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {available.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                  category === c
                    ? 'border-accent bg-accent/15 text-fg'
                    : 'border-line bg-surface text-muted hover:text-fg'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech"
              className="input !pl-10"
            />
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown
        </p>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="card mt-8 flex flex-col items-center gap-3 px-6 py-14 text-center">
            <SearchX size={28} className="text-muted" aria-hidden="true" />
            <p className="font-medium">No projects match your search</p>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
