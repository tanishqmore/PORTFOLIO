/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------
 * Edit this file to update your personal details, links, resume,
 * section visibility and the public URL used by the QR page.
 * Values marked "EDIT ME" are placeholders until you provide real ones.
 */

export interface SiteConfig {
  /** Full public HTTPS URL after deployment, e.g. "https://tanishq-more.vercel.app". Leave '' until deployed. */
  siteUrl: string
  name: string
  initials: string
  title: string
  headline: string
  heroSubtext: string
  location: string
  email: string
  github: string
  linkedin: string
  /** Path inside /public (e.g. "/resume.pdf") or a full URL. Leave '' to show a graceful fallback. */
  resumeUrl: string
  /** Optional profile photo in /public/images. Leave '' to use the monogram card. */
  photoUrl: string
  openToWork: { enabled: boolean; label: string }
  education: {
    degree: string
    institution: string
    graduation: string
    cgpa: string
  }
  interests: string[]
  about: string[]
  /** Turn sections on or off. Empty record sections are also hidden automatically. */
  sections: {
    about: boolean
    skills: boolean
    projects: boolean
    experience: boolean
    achievements: boolean
    contact: boolean
  }
  contact: {
    /**
     * Optional Formspree endpoint, e.g. "https://formspree.io/f/xxxxxxx".
     * If empty, the form falls back to opening the visitor's email app (mailto).
     */
    formEndpoint: string
  }
  seo: {
    description: string
    /** Path in /public, used for Open Graph / Twitter cards. */
    ogImage: string
    keywords: string[]
  }
}

export const site: SiteConfig = {
  // EDIT ME after deployment (must start with https://, no trailing slash)
  siteUrl: 'https://portfolio-ten-theta-jo1m730bzy.vercel.app',

  name: 'Tanishq More',
  initials: 'TM',
  title: 'Final-Year B.Tech Artificial Intelligence & Machine Learning Student',
  headline: 'Building Intelligent Solutions Through AI & Software Engineering.',
  heroSubtext:
    'I am a final-year AIML engineering student who builds practical applications using machine learning, data science, and modern software technologies.',
  // NOTE: your brief mentioned both Mumbai and Palghar. Change this one value to update everywhere.
  location: 'Mumbai, Maharashtra, India',
  email: 'tanishqmore369@email.com', // EDIT ME if this address is not exactly right
  github: 'https://github.com/tanishqmore',
  linkedin: 'https://www.linkedin.com/in/tanishq-more-863606344/',

  // Put your PDF at public/resume.pdf and set this to '/resume.pdf'
  resumeUrl: '',
  photoUrl: '',

  openToWork: { enabled: true, label: 'Open to Internship Opportunities' },

  education: {
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    institution: '', // EDIT ME: your college / university name
    graduation: '2027 (Expected)',
    cgpa: '8.22 / 10',
  },

  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Python Development',
    'Backend Development',
    'Computer Vision',
    'Software Engineering',
  ],

  about: [
    "I'm a final-year B.Tech student specialising in Artificial Intelligence and Machine Learning, with a CGPA of 8.22/10. My interest sits where data, models and software meet: turning ideas into applications that people can actually use.",
    'I learn best by building. My projects span real-estate planning, data exploration, natural-language processing and recommendation systems, and each one has pushed me to work across the stack, from data handling and modelling to APIs and interfaces.',
    "I enjoy picking up new tools and frameworks, and I care about writing clear, maintainable code. I'm looking for opportunities in AI/ML engineering, data science, Python development and software engineering where I can keep learning and contribute to useful products.",
  ],

  sections: {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    achievements: true,
    contact: true,
  },

  contact: { formEndpoint: '' },

  seo: {
    description:
      'Portfolio of Tanishq More, a final-year B.Tech AI & Machine Learning student building practical applications with machine learning, data science and modern software technologies.',
    ogImage: '/og-image.png',
    keywords: [
      'Tanishq More',
      'AI ML student',
      'machine learning',
      'data science',
      'Python developer',
      'portfolio',
    ],
  },
}

/** True when siteUrl is a usable public HTTPS URL (not localhost). */
export function isValidPublicUrl(url: string): boolean {
  try {
    const u = new URL(url)
    const local = ['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(u.hostname)
    return u.protocol === 'https:' && !local && u.hostname.includes('.')
  } catch {
    return false
  }
}



