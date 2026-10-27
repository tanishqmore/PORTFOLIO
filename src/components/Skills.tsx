import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="section border-t border-line/60" aria-labelledby="skills-title">
      <div className="container-x">
        <p className="eyebrow">Skills</p>
        <h2 id="skills-title" className="h2">
          Technical toolkit
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Technologies I have worked with across coursework and projects.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s.name} className="chip">
                    {s.name}
                    {s.note && <span className="ml-2 text-[11px] text-muted">{s.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
