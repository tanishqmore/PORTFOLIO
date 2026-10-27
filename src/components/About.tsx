import { GraduationCap } from 'lucide-react'
import { site } from '@/config/site'

export function About() {
  const { education } = site
  return (
    <section id="about" tabIndex={-1} className="section" aria-labelledby="about-title">
      <div className="container-x">
        <p className="eyebrow">About</p>
        <h2 id="about-title" className="h2">
          Engineering student, builder, learner
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 leading-relaxed text-muted">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Interests">
              {site.interests.map((i) => (
                <li key={i} className="chip">
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-elevated text-accent">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <h3 className="font-semibold">Education</h3>
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Degree</dt>
                <dd className="mt-1 font-medium">{education.degree}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">Institution</dt>
                <dd className="mt-1 font-medium">
                  {education.institution || (
                    <span className="text-muted">Institution name coming soon</span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Graduation</dt>
                  <dd className="mt-1 font-medium">{education.graduation}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">CGPA</dt>
                  <dd className="mt-1 font-medium">{education.cgpa}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
