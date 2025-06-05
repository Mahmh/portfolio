import AIEcomApp from '@img/projects/ai-ecom-app.png'
import SemanticCourseSearch from '@img/projects/semantic-course-search.png'

export const STATS = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Tech Stack Mastery', value: 'Full-Stack AI' }
]

export const PROJECTS = [
    {
        title: 'AI-Personalized E-Commerce',
        description: 'An intelligent storefront that recommends products in real-time and includes a built-in AI shopping assistant powered by a language model.',
        stack: ['Next.js', 'FastAPI', 'MySQL', 'SCSS'],
        link: '/projects/ai-ecom',
        img: AIEcomApp
    },
    {
        title: 'Semantic Course Search',
        description: 'A smarter search engine for 100+ tech courses that understands meaning — not just keywords.',
        stack: ['Vite', 'FastAPI', 'SQLite', 'ChromaDB'],
        link: '/projects/semantic-search',
        img: SemanticCourseSearch
    },
    {
        title: 'Resume Screener',
        description: 'Instantly matches resumes to job descriptions using AI-powered similarity analysis.',
        stack: ['Vite', 'FastAPI', 'Pandas'],
        link: '/projects/resume-matcher',
        img: undefined
    }
]

export const SERVICES = [
    {
        title: 'Full-Stack Web Development',
        description: 'I build scalable, responsive web apps from UI to backend using modern tools like Next.js and FastAPI.'
    },
    {
        title: 'AI Integration',
        description: 'I add AI to products — from smart search to recommendations — using open-source models and APIs.'
    },
    {
        title: 'Lean MVP Development',
        description: 'I quickly turn ideas into working demos, ideal for validation or pitching.'
    },
    {
        title: 'Tech Strategy & Architecture',
        description: 'I help pick the right stack and design scalable systems that won’t break later.'
    }
]