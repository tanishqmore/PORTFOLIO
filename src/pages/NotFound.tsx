import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function NotFound() {
  useSeo({ title: 'Page not found', noindex: true, path: '/404' })
  return (
    <>
      <Navbar />
      <main id="main" className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn't exist</h1>
        <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have moved.</p>
        <Link to="/" className="btn-primary mt-8">
          <Home size={16} aria-hidden="true" /> Back to home
        </Link>
      </main>
      <Footer />
    </>
  )
}
