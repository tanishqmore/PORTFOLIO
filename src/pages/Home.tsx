import { site } from '@/config/site'
import { projects } from '@/data/projects'
import {
  academicAchievements,
  certifications,
  experience,
  hackathons,
  openSource,
  workshops,
} from '@/data/records'
import { hasAchievements, hasExperience } from '@/lib/sections'
import { useSeo } from '@/hooks/useSeo'
import { About } from '@/components/About'
import { AchievementsSection, ExperienceSection } from '@/components/RecordSection'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { ProjectsSection } from '@/components/ProjectsSection'
import { Resume } from '@/components/Resume'
import { Skills } from '@/components/Skills'

export default function Home() {
  useSeo({ path: '/' })
  const groups = [
    { title: 'Academic achievements', items: academicAchievements },
    { title: 'Certifications', items: certifications },
    { title: 'Hackathons & competitions', items: hackathons },
    { title: 'Workshops', items: workshops },
    { title: 'Open-source contributions', items: openSource },
  ].filter((g) => g.items.length > 0)

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {site.sections.about && <About />}
        {site.sections.skills && <Skills />}
        {site.sections.projects && projects.length > 0 && <ProjectsSection />}
        {site.sections.experience && hasExperience && <ExperienceSection items={experience} />}
        {site.sections.achievements && hasAchievements && <AchievementsSection groups={groups} />}
        <Resume />
        {site.sections.contact && <Contact />}
      </main>
      <Footer />
    </>
  )
}
