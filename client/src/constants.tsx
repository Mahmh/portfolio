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
        description: 'A dynamic storefront that recommends products using real-time user embeddings.',
        stack: ['Next.js', 'FastAPI', 'MySQL', 'SCSS'],
        link: '/projects/ai-ecom',
        img: AIEcomApp
    },
    {
        title: 'Semantic Course Search',
        description: 'Search engine for 100+ tech courses using sentence-transformer embeddings.',
        stack: ['Vite', 'FastAPI', 'SQLite', 'ChromaDB'],
        link: '/projects/semantic-search',
        img: SemanticCourseSearch
    },
    {
        title: 'Resume Screener',
        description: 'Matches resumes with job descriptions using vector similarity.',
        stack: ['Vite', 'FastAPI', 'Pandas'],
        link: '/projects/resume-matcher',
        img: undefined
    }
]