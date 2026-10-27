import { ExternalLink } from 'lucide-react'
import type { RecordItem } from '@/data/types'
import { validUrl } from '@/lib/utils'

export function RecordList({ title, items }: { title: string; items: RecordItem[] }) {
  if (!items.length) return null
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((r) => {
          const proof = validUrl(r.url)
          return (
            <li key={`${r.title}-${r.date}`} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{r.title}</p>
                {r.date && <p className="font-mono text-xs text-muted">{r.date}</p>}
              </div>
              {r.organization && <p className="text-sm text-accent">{r.organization}</p>}
              {r.description && <p className="mt-2 text-sm leading-relaxed text-muted">{r.description}</p>}
              {r.skills.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {r.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {proof && (
                <a
                  href={proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  View credential <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ExperienceSection({ items }: { items: RecordItem[] }) {
  return (
    <section id="experience" tabIndex={-1} className="section border-t border-line/60" aria-labelledby="exp-title">
      <div className="container-x">
        <p className="eyebrow">Experience</p>
        <h2 id="exp-title" className="h2">
          Internships &amp; work experience
        </h2>
        <div className="mt-8 max-w-3xl">
          <RecordList title="" items={items} />
        </div>
      </div>
    </section>
  )
}

export function AchievementsSection({
  groups,
}: {
  groups: { title: string; items: RecordItem[] }[]
}) {
  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="section border-t border-line/60"
      aria-labelledby="ach-title"
    >
      <div className="container-x">
        <p className="eyebrow">Achievements</p>
        <h2 id="ach-title" className="h2">
          Achievements &amp; certifications
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {groups.map((g) => (
            <RecordList key={g.title} title={g.title} items={g.items} />
          ))}
        </div>
      </div>
    </section>
  )
}
