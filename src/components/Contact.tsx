import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { site } from '@/config/site'
import { isEmail, mailto, validUrl } from '@/lib/utils'
import { GithubIcon, LinkedinIcon } from './Icons'

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error'
interface Fields {
  name: string
  email: string
  subject: string
  message: string
  /** honeypot: real users never fill this */
  company: string
}
const empty: Fields = { name: '', email: '', subject: '', message: '', company: '' }

export function Contact() {
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = validUrl(site.contact.formEndpoint)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  function validate(): boolean {
    const e: typeof errors = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!isEmail(f.email.trim())) e.email = 'Please enter a valid email address.'
    if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.'
    if (f.message.trim().length < 10) e.message = 'Please write at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    if (f.company) return // honeypot tripped: silently drop bots

    if (!endpoint) {
      // No provider configured: open the visitor's email app with everything pre-filled.
      const body = `${f.message.trim()}\n\n${f.name.trim()}\n${f.email.trim()}`
      window.location.href = mailto(site.email, f.subject.trim(), body)
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: f.name.trim(),
          email: f.email.trim(),
          subject: f.subject.trim(),
          message: f.message.trim(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setF(empty)
    } catch {
      setStatus('error')
    }
  }

  const field = (id: keyof Fields, label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={`c-${id}`} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={`c-${id}`}
        type={type}
        value={f[id]}
        onChange={set(id)}
        autoComplete={autoComplete}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `c-${id}-err` : undefined}
        className="input"
      />
      {errors[id] && (
        <p id={`c-${id}-err`} className="mt-1.5 text-xs text-red-400">
          {errors[id]}
        </p>
      )}
    </div>
  )

  const github = validUrl(site.github)
  const linkedin = validUrl(site.linkedin)

  return (
    <section id="contact" tabIndex={-1} className="section border-t border-line/60" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="h2">
          Let's talk
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Recruiters, interviewers and fellow developers are welcome to reach out about internships, projects or
          collaboration.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <ul className="space-y-3">
            <li>
              <a
                href={mailto(site.email)}
                className="card flex items-center gap-4 p-4 transition hover:border-accent/50"
              >
                <Mail size={20} className="text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Email</span>
                  <span className="block truncate text-sm font-medium">{site.email}</span>
                </span>
              </a>
            </li>
            {linkedin && (
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 p-4 transition hover:border-accent/50"
                >
                  <LinkedinIcon width={20} height={20} className="text-accent" />
                  <span>
                    <span className="block text-xs text-muted">LinkedIn</span>
                    <span className="block text-sm font-medium">linkedin.com/in/tanishq-more</span>
                  </span>
                </a>
              </li>
            )}
            {github && (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 p-4 transition hover:border-accent/50"
                >
                  <GithubIcon width={20} height={20} className="text-accent" />
                  <span>
                    <span className="block text-xs text-muted">GitHub</span>
                    <span className="block text-sm font-medium">github.com/tanishqmore</span>
                  </span>
                </a>
              </li>
            )}
            <li className="card flex items-center gap-4 p-4">
              <MapPin size={20} className="text-accent" aria-hidden="true" />
              <span>
                <span className="block text-xs text-muted">Location</span>
                <span className="block text-sm font-medium">{site.location}</span>
              </span>
            </li>
          </ul>

          <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              {field('name', 'Name', 'text', 'name')}
              {field('email', 'Email', 'email', 'email')}
            </div>
            {field('subject', 'Subject')}
            <div>
              <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="c-message"
                rows={5}
                value={f.message}
                onChange={set('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'c-message-err' : undefined}
                className="input resize-y"
              />
              {errors.message && (
                <p id="c-message-err" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot field: hidden from people and assistive tech */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="c-company">Company</label>
              <input id="c-company" tabIndex={-1} autoComplete="off" value={f.company} onChange={set('company')} />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" /> {endpoint ? 'Send message' : 'Open in email app'}
                </>
              )}
            </button>

            <div role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <p className="flex items-start gap-2 text-emerald-400">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Thanks! Your message was
                  sent. I'll reply as soon as I can.
                </p>
              )}
              {status === 'mailto' && (
                <p className="flex items-start gap-2 text-sky-400">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Your email app should
                  have opened with the message ready to send. If it did not, email me directly at {site.email}.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-2 text-red-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Something went wrong
                  sending your message. Please email me directly at {site.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
