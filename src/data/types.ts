export type ProjectCategory =
  | 'AI/ML'
  | 'Data Science'
  | 'Web Development'
  | 'Computer Vision'
  | 'Big Data'

export type ProjectStatus = 'Live' | 'In Development' | 'Completed'

export interface FeatureItem {
  text: string
  /** 'implemented' | 'planned' | 'unverified' keeps claims honest. */
  state: 'implemented' | 'planned' | 'unverified'
}

export interface Screenshot {
  src: string
  alt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  detailedDescription: string
  problemStatement: string
  solution: string
  features: FeatureItem[]
  technologies: string[]
  category: ProjectCategory[]
  status: ProjectStatus
  thumbnail: string
  screenshots: Screenshot[]
  githubUrl: string
  liveDemoUrl: string
  documentationUrl: string
  startDate: string
  completionDate: string
  role: string
  challenges: string[]
  learnings: string[]
  futureImprovements: string[]
  featured: boolean
  /** Optional extra facts (methodology, dataset, evaluation...). Empty values are hidden. */
  extra?: { label: string; value: string }[]
}

export interface RecordItem {
  title: string
  organization: string
  date: string
  description: string
  skills: string[]
  url?: string
}

export interface SkillGroup {
  title: string
  skills: { name: string; note?: string }[]
}
