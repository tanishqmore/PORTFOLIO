import { Route, Routes } from 'react-router-dom'
import { useScrollOnNavigate } from '@/hooks/useSectionNav'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ProjectDetail from '@/pages/ProjectDetail'
import QRPage from '@/pages/QRPage'

export default function App() {
  useScrollOnNavigate()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
