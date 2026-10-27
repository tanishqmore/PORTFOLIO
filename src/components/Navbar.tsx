import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site } from '@/config/site'
import { navItems } from '@/lib/sections'
import { useSectionNav } from '@/hooks/useSectionNav'
import { useTheme } from '@/hooks/useTheme'
import { Monogram } from './Monogram'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const go = useSectionNav()
  const { theme, toggle } = useTheme()
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Close on Escape and lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const onNav = (id: string) => (e: React.MouseEvent) => {
    setOpen(false)
    go(id, e)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <Link
          to="/"
          onClick={onNav('home')}
          className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          aria-label={`${site.name} home`}
        >
          <Monogram />
          <span className="hidden text-sm font-medium sm:inline">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={n.id === 'home' ? '/' : `/#${n.id}`}
                onClick={onNav(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                  active === n.id ? 'text-fg' : 'text-muted'
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-fg transition hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="container-x flex flex-col py-3">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={n.id === 'home' ? '/' : `/#${n.id}`}
                  onClick={onNav(n.id)}
                  className="block rounded-lg px-2 py-3 text-base text-fg hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
