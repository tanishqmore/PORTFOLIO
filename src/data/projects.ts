import type { Project } from './types'

/**
 * PROJECT DATA
 * ---------------------------------------------------------------
 * Add a new project by copying one object below.
 * - Leave a URL as '' and its button is hidden automatically.
 * - Mark each feature 'implemented', 'planned' or 'unverified' so the
 *   site never over-claims. Change the state as your work progresses.
 * - Screenshots: place files in public/projects/<slug>/ and list them.
 * - Dates: free text such as 'Jan 2026'. Empty values are hidden.
 */
export const projects: Project[] = [
  {
    id: 'plotai',
    title: 'PlotAI',
    slug: 'plotai',
    summary:
      'AI-assisted real-estate planning app that analyses land plots, estimates buildable area and costs, and visualises building concepts in 3D.',
    detailedDescription:
      'PlotAI is an AI-assisted real-estate planning application designed to analyse land plots, estimate buildable area, recommend suitable building types, estimate construction materials and costs, and visualise proposed building concepts in 3D.',
    problemStatement:
      'Early-stage land and building planning usually needs several separate tools and manual calculations to understand what can be built on a plot and roughly what it would cost.',
    solution:
      'PlotAI brings plot analysis, buildable-area calculation, recommendations, cost estimation and 3D visualisation into one web application with a React front end and a Python/FastAPI back end.',
    features: [
      // EDIT ME: set each state to what is truly working today.
      { text: 'Manual plot dimension entry', state: 'unverified' },
      { text: 'Plot image upload and analysis', state: 'unverified' },
      { text: 'Land area and buildable-area calculations', state: 'unverified' },
      { text: 'Setback-aware planning', state: 'unverified' },
      { text: 'Building-type recommendations', state: 'unverified' },
      { text: 'Material and cost estimation', state: 'unverified' },
      { text: 'Interactive 3D visualisation', state: 'unverified' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Three.js',
      'React Three Fiber',
      'Python',
      'FastAPI',
    ],
    category: ['AI/ML', 'Web Development', 'Computer Vision'],
    status: 'In Development',
    thumbnail: '',
    screenshots: [],
    githubUrl: '',
    liveDemoUrl: '',
    documentationUrl: '',
    startDate: '',
    completionDate: '',
    role: '',
    challenges: [],
    learnings: [],
    futureImprovements: [],
    featured: true,
    extra: [
      {
        label: 'Note',
        value:
          'Machine-learning and computer-vision components are described only where they are implemented. Feature states above show what is verified versus planned.',
      },
    ],
  },
  {
    id: 'digital-divider-explorer',
    title: 'Digital Divider Explorer',
    slug: 'digital-divider-explorer',
    summary:
      'Interactive data exploration of the digital divide across selected countries using internet access, connectivity and socioeconomic indicators.',
    detailedDescription:
      'An interactive data exploration project examining the digital divide across selected countries using indicators such as internet access, digital connectivity and other available socioeconomic data.',
    problemStatement:
      'Access to digital infrastructure varies widely between countries and income groups, and raw indicator tables make these gaps hard to see.',
    solution:
      'The project analyses the available indicators and presents visualisations, comparisons and filters so patterns across countries can be explored directly.',
    features: [
      { text: 'Visualisations of digital-access indicators', state: 'unverified' },
      { text: 'Country comparisons and filters', state: 'unverified' },
      { text: 'Analytical insights drawn from the actual dataset', state: 'unverified' },
    ],
    technologies: ['Python', 'Data Analysis', 'Data Visualisation', 'Big Data Analytics concepts'],
    // Add 'Hadoop' above ONLY if it is genuinely implemented.
    category: ['Data Science', 'Big Data'],
    status: 'Completed',
    thumbnail: '',
    screenshots: [],
    githubUrl: '',
    liveDemoUrl: '',
    documentationUrl: '',
    startDate: '',
    completionDate: '',
    role: '',
    challenges: [],
    learnings: [],
    futureImprovements: [],
    featured: true,
    extra: [
      { label: 'Dataset', value: '' }, // EDIT ME: name and source of the dataset
    ],
  },
  {
    id: 'newscrawler',
    title: 'NewsCrawler',
    slug: 'newscrawler',
    summary:
      'News-focused application that presents news content alongside sentiment analysis built with natural language processing.',
    detailedDescription:
      'A news-focused application that presents news content and sentiment analysis using natural language processing, where implemented.',
    problemStatement:
      'Following news across many sources makes it hard to see the overall tone of coverage at a glance.',
    solution:
      'NewsCrawler gathers news content and applies sentiment analysis so the tone of articles can be seen alongside the articles themselves.',
    features: [
      { text: 'News content presentation', state: 'unverified' },
      { text: 'NLP-based sentiment analysis', state: 'unverified' },
      { text: 'Streamlit interface', state: 'unverified' },
    ],
    technologies: ['Python', 'NLP', 'Sentiment Analysis', 'Streamlit', 'Data Processing'],
    category: ['AI/ML', 'Data Science'],
    status: 'Completed',
    thumbnail: '',
    screenshots: [],
    githubUrl: '',
    liveDemoUrl: '',
    documentationUrl: '',
    startDate: '',
    completionDate: '',
    role: '',
    challenges: [],
    learnings: [],
    futureImprovements: [],
    featured: false,
  },
  {
    id: 'hybrid-movie-recommender',
    title: 'Hybrid Movie Recommendation System',
    slug: 'hybrid-movie-recommender',
    summary:
      'Recommendation engine that suggests movies by combining recommendation approaches.',
    detailedDescription:
      'A recommendation engine designed to suggest movies by combining recommendation approaches, depending on the actual implemented methodology.',
    problemStatement:
      'A single recommendation technique often struggles with sparse data or limited item information.',
    solution:
      'A hybrid approach combines multiple recommendation methods to produce more balanced suggestions.',
    features: [
      { text: 'Movie recommendations from combined approaches', state: 'unverified' },
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Recommendation Systems'],
    category: ['AI/ML', 'Data Science'],
    status: 'Completed',
    thumbnail: '',
    screenshots: [],
    githubUrl: '',
    liveDemoUrl: '',
    documentationUrl: '',
    startDate: '',
    completionDate: '',
    role: '',
    challenges: [],
    learnings: [],
    futureImprovements: [],
    featured: false,
    extra: [
      // EDIT ME: fill in real values only. Empty rows are hidden.
      { label: 'Methodology', value: '' },
      { label: 'Dataset', value: '' },
      { label: 'Evaluation results', value: '' },
    ],
  },
]

export const projectCategories = [
  'All',
  'AI/ML',
  'Data Science',
  'Web Development',
  'Computer Vision',
  'Big Data',
] as const
