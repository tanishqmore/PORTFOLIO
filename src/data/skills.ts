import type { SkillGroup } from './types'

/**
 * Skills are displayed as honest chips without percentages.
 * Remove skills you do not use, and use notes to identify learning areas.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'Kotlin', note: 'Learning' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'SQL' },
    ],
  },
  {
    title: 'Mobile App Development',
    skills: [
      { name: 'React Native', note: 'Learning' },
      { name: 'Expo', note: 'Learning' },
      { name: 'Android Development', note: 'Learning' },
      { name: 'Flutter', note: 'Learning' },
      { name: 'Cross-Platform App Development', note: 'Learning' },
      { name: 'Firebase', note: 'Learning' },
      { name: 'Mobile UI Development', note: 'Learning' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'React' },
      { name: 'Tailwind CSS', note: 'Learning' },
      { name: 'Vite' },
      { name: 'Responsive Web Design' },
    ],
  },
  {
    title: 'AI, Machine Learning & Data Science',
    skills: [
      { name: 'Machine Learning' },
      { name: 'Supervised Learning' },
      { name: 'Unsupervised Learning' },
      { name: 'Natural Language Processing' },
      { name: 'Computer Vision' },
      { name: 'Recommendation Systems' },
      { name: 'Sentiment Analysis' },
      { name: 'NumPy' },
      { name: 'Pandas' },
      { name: 'Matplotlib' },
      { name: 'Scikit-learn' },
      { name: 'TensorFlow', note: 'Learning' },
    ],
  },
  {
    title: 'Backend & API Development',
    skills: [
      { name: 'FastAPI' },
      { name: 'REST APIs' },
      { name: 'Streamlit' },
      { name: 'API Integration', note: 'Learning' },
      { name: 'Node.js', note: 'Learning' },
    ],
  },
  {
    title: 'Databases, Tools & Version Control',
    skills: [
      { name: 'SQL Databases' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Postman', note: 'Learning' },
      { name: 'Docker', note: 'Learning' },
    ],
  },
  {
    title: 'Cloud, Big Data & Telecom',
    skills: [
      { name: 'Cloud Computing', note: 'Learning' },
      { name: 'Hadoop', note: 'Academic project' },
      { name: '5G Technology', note: 'Fundamentals' },
      { name: 'Telecom Technology', note: 'Fundamentals' },
      { name: 'App Deployment', note: 'Learning' },
    ],
  },
]
