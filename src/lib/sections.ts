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

export const hasExperience = experience.length > 0
export const hasAchievements =
  academicAchievements.length +
    certifications.length +
    hackathons.length +
    workshops.length +
    openSource.length >
  0

export interface NavItem {
  id: string
  label: string
}

/** Sections that are enabled AND have content. Drives navbar and page. */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  ...(site.sections.about ? [{ id: 'about', label: 'About' }] : []),
  ...(site.sections.skills ? [{ id: 'skills', label: 'Skills' }] : []),
  ...(site.sections.projects && projects.length ? [{ id: 'projects', label: 'Projects' }] : []),
  ...(site.sections.experience && hasExperience ? [{ id: 'experience', label: 'Experience' }] : []),
  ...(site.sections.achievements && hasAchievements
    ? [{ id: 'achievements', label: 'Achievements' }]
    : []),
  ...(site.sections.contact ? [{ id: 'contact', label: 'Contact' }] : []),
]
