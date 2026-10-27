import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/** Smooth-scrolls to a section on the home page, or navigates home first. */
export function useSectionNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (id: string, e?: { preventDefault: () => void }) => {
      e?.preventDefault()
      if (pathname === '/') {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`)
          el.focus?.({ preventScroll: true })
        }
      } else {
        navigate(id === 'home' ? '/' : `/#${id}`)
      }
    },
    [pathname, navigate],
  )
}

/** On route change: scroll to the hash target, or to top. */
export function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      }, 50)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}
