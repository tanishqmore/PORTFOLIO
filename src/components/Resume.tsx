import { Download, ExternalLink, FileText } from 'lucide-react'
import { site } from '@/config/site'
import { validResume } from '@/lib/utils'

export function Resume() {
  const url = validResume(site.resumeUrl)
  return (
    <section id="resume" tabIndex={-1} className="section border-t border-line/60" aria-labelledby="resume-title">
      <div className="container-x">
        <div className="card flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-accent">
            <FileText size={30} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 id="resume-title" className="text-xl font-semibold">
              Resume
            </h2>
            <p className="mt-1 text-sm text-muted">
              A one-page summary of my education, projects and skills.
            </p>
            {!url && (
              <p className="mt-2 text-sm text-amber-400" role="status">
                Resume will be available soon. Please use the contact section in the meantime.
              </p>
            )}
          </div>
          {url ? (
            <div className="flex flex-wrap gap-3">
              <a href={url} download className="btn-primary">
                <Download size={16} aria-hidden="true" /> Download Resume
              </a>
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink size={16} aria-hidden="true" /> Open Resume
              </a>
            </div>
          ) : (
            <span className="btn-ghost cursor-not-allowed opacity-60" aria-disabled="true">
              <Download size={16} aria-hidden="true" /> Download unavailable
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
